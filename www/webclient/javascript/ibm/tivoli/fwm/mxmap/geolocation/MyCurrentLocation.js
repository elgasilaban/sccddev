/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Provides access to current location data.<br>
 */

ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus = {
	UNASSIGNED: -1,
	HAS_LOCATION: 0,
	PERMISSION_DENIED: 1,
	POSITION_UNAVAILABLE: 2,
	GEOLOCATION_NOT_SUPPORTED: 4,
	TIMEOUT: 3
};

ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance = null;
/**
 * This implements the control of monitoring user current location. It always
 * uses the watchposition method. It demanded a small tweak for Firefox because
 * mozilla ALWAYS throws a timeout error after the timeout has been achieved
 * EVEN if a location was found before the timeout and stops watching the
 * location.
 * 
 * We have opened an issue for mozilla:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=732923
 * 
 * In order to avoid this, when we are in firefox we set a high timeout (10
 * minutes) so during 10 minutes FF keeps monitoring correctly the user
 * location. If the 10 minutes is achieved but we had a location found during
 * the timeout period, we just restart the watch position again. On the first
 * time though, we need to timeout after the regular timeout period. So we force
 * a check after the regular timeout to see if firefox has found a location. If
 * not we trigger the regular error, else we just keep monitoring.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation", ibm.tivoli.fwm.mxmap._Base, {
	_userLocation: null,
	_userLocationStatus: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.UNASSIGNED,
	// Time to wait for a response from the geolocation API
	_timeout: 5000,
	_watchPositionId: null,
	_waitingForTimeout: false,
	_callbackArray: null,
	_listenerArray: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		console.log("MyCurrentLocation created at ", new Date());
		this._callbackArray = [];
		this._listenerArray = [];
		this._h = 0;

		if (dojo.isMozilla)
		{
			console.log("Firefox");
			this._oldTimeout = this._timeout;
			this._timeout = 10 * 60000;
		}

	},
	/**
	 * Retrieves the current position data
	 */
	getPosition: function()
	{
		return this._userLocation;
	},
	/**
	 * Retrieves the current status (or error code)
	 */
	getStatus: function()
	{
		return this._userLocationStatus;
	},
	/**
	 * callback response for current user location
	 * 
	 * @param position
	 * @param callback
	 */
	_lastLocationTimestamp: 0,
	gotUserLocation: function(position)
	{
		this._userLocation = position;
		this._userLocationStatus = ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.HAS_LOCATION;
		this._lastLocationTimestamp = new Date().getTime();

		if (this._listenerArray)
		{
			for ( var handler in this._listenerArray)
			{
				var fct = this._listenerArray[handler];
				fct.success(position);
			}

		}
		if (this._callbackArray)
		{
			while (this._callbackArray.length > 0)
			{
				var fctErr = this._callbackArray.pop();
				fctErr.success(position);
			}
		}

		this._callbackArray = [];

	},
	/**
	 * If we failed to retrieve user location. The possible errors are:<br>
	 * code 1 - Permission denied, user did not allow to share his location<br>
	 * code 2 - Position unavailable, the position of the device could not be
	 * determined<br>
	 * code 3 - Timeout, device took too long (longer than the timeout
	 * specified) to return current location<br>
	 * code 4 - Geolocation not supported, this device does not support
	 * geolocation, this is a custom error code<br>
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html#permission_denied_error
	 * @param error:
	 *            {code,message}
	 * @param callback
	 *            error function
	 */
	failedToGetLocation: function(error)
	{
		console.warn("Error finding user location", error);
		this._userLocationStatus = error.code;
		if (this._listenerArray)
		{
			for ( var handler in this._listenerArray)
			{

				var fct = this._listenerArray[handler];
				fct.failure(error);
			}

		}
		// Execute all buffered error callbacks
		if (this._callbackArray)
		{
			while (this._callbackArray.length > 0)
			{
				var fctErr = this._callbackArray.pop();
				fctErr.failure(error);
			}
		}

		this._callbackArray = [];
	},
	_isWaitingForTimeout: function()
	{
		var now = new Date();
		if (now.getTime() < (this._lastGetLocCall + this._timeout))
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	_lastGetLocCall: 0,
	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4. If watchPosition is enabled, just return the
	 * last location.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 * @param callback
	 * @param errorCb
	 */
	getUserLocation: function(callback, errorCb)
	{
		if (this._watchPositionId != null && this.isStatusHasLocation())

		{
			// If Watch Position is enabled, return the current position, if it
			// exists
			// If it does not exist, it means that the watchPosition API was
			// unable to retrieve it
			callback(this._userLocation);
		}
		else
		{
			this._callbackArray.push({
				success: callback,
				failure: errorCb
			});
			this.watchUserLocation();
		}
	},
	/**
	 * Adds the success and error callback functions to a buffer and returns
	 * a handler so these callback functions can be removed later when
	 * the tool is no longer in used by the caller
	 * 
	 * @param callback
	 * @param errorCb
	 */
	// 12-13674. We need to create the listener prior to calling watchUserLocation on myCurrentLocationInstance
	// because some errors may happen synchronously. When an error happens during the listenToUserLocation() call,
	// the error callback is executed before the handler is returned, so the myCurrentLocationInstance.removeListeners
	// tries to remove the listener using a handler that does not exist yet.
	_h: null,
	createListener: function(callback, errorCb)
	{
		this._h++;
		var h = this._h;
		this._listenerArray[h] = {
			success: callback,
			failure: errorCb
		};
		return h;
	},

	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4. Once active, the callback function will fire
	 * whenever a location change is noticed by the browser.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 */
	listenToUserLocation: function(handler)
	{
		if(this._listenerArray[handler] != null)
		{
			this.watchUserLocation();
		}
		else
		{
			console.warn("No listener for handler ", handler);
		}
	},
	removeListeners: function(handler)
	{
		if(handler != null)
		{
			this._listenerArray[handler] = null;
			delete this._listenerArray[handler];
		}
	},
	watchUserLocation: function()
	{

		if (navigator.geolocation)
		{
			if (this._watchPositionId == null)
			{

				var fctSuccess = function(position)
				{
					console.log("got location", position);
					this.gotUserLocation(position);
					if (this._mozzilaTS)
					{
						clearTimeout(this._mozzilaTS);
					}
				};
				var fctErr = function(error)
				{
					this.clearWatchUserLocation();
					if (error.code == error.TIMEOUT && dojo.isMozilla && this.isStatusHasLocation() == true)
					{
						console.log("last timestamp", this._lastLocationTimestamp);
						var now = new Date();
						var elapsedTime = (now.getTime() - this._requestTimestamp.getTime());
						if (elapsedTime < (this._timeout + 5000) || elapsedTime > (this._timeout - 5000))
						{
							// probabily due mozilla accurate implementation
							console.log("skipping first timeout error due mozilla accurate implementation");
							
							this.watchUserLocation();
							return;
						}
					}					
					this.failedToGetLocation(error);
				};
				this._requestTimestamp = new Date();

				this._watchPositionId = navigator.geolocation.watchPosition(dojo.hitch(this, fctSuccess), dojo.hitch(this, fctErr), {
					timeout: this._timeout
				});
				if (dojo.isMozilla)
				{// we need to manually add the timeout for the first time.
					// Due firefox issue
					if (this.isStatusUnassigned() == true)
					{
						var ffMozilla = dojo.hitch(this, function()
						{
							console.log("first try in Mozilla to get location");
							this.clearWatchUserLocation();
							var error = {
								TIMEOUT: true,
								code: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT,
								message: "Browser FF timeout"
							};
							this.clearWatchUserLocation();
							this.failedToGetLocation(error);
						});
						this._mozzilaTS = setTimeout(ffMozilla, this._oldTimeout);
					}
				}
			}
			else
			{
				console.warn("Watch Position is already enabled");
				if (this.isStatusHasLocation() == true)
				{// show last postion
					this.gotUserLocation(this._userLocation);
				}
				else
				{
					if (this.isStatusUnassigned() != true)
					{
						var error = {
							code: this.getStatus(),
							message: "Failed"
						};
						this.clearWatchUserLocation();
						this.failedToGetLocation(error);
					}
				}
			}
		}
		else
		{
			console.warn("no geolocation support");
			this._userLocationStatus = ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED;
			var error = {
				code: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED,
				message: "Browser does not support geolocation"
			};			
			this.failedToGetLocation(error);
		}

	},
	/**
	 * Disables the watchPosition and sets _watchPositionId to null
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 */

	clearWatchUserLocation: function()
	{
		if (this._watchPositionId != null)
		{
			if (navigator.geolocation)
			{
				navigator.geolocation.clearWatch(this._watchPositionId);
				this._watchPositionId = null;
			}
		}
		else
		{
			console.log("Watch Position is already disabled.");
		}
	},

	/**
	 * Returns true if _userLocationStatus = UNASSIGNED
	 */
	isStatusUnassigned: function()
	{
		return this.isStatusEqual(ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.UNASSIGNED);
	},
	/**
	 * Returns true if _userLocationStatus = HAS_LOCATION
	 */
	isStatusHasLocation: function()
	{
		return this.isStatusEqual(ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.HAS_LOCATION);
	},
	/**
	 * Returns true if _userLocationStatus = locStatus
	 */
	isStatusEqual: function(locStatus)
	{
		return (this._userLocationStatus == locStatus);
	},
	convertPositionToMapPoint: function(map, callback, errorCb)
	{
		var position = this.getPosition();
		var latLng = new mxn.LatLonPoint(position.coords.latitude, position.coords.longitude);
		map.getMapstraction().getAllPointsFromWGS84([ latLng ], dojo.hitch(this, function(points)
		{
			callback(points[0]);
		}));
	}
});

/**
 * Retrieves the MyCurrentLocation singleton instance
 */
ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance = function()
{
	if (!ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance)
	{
		ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance = new ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation();
	}
	return ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance;
};
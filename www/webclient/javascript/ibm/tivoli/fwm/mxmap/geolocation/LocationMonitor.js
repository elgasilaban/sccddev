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
dojo.provide("ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor");
dojo.require("dojox.timing._base");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");

/**
 * Monitors the user's current location and send it to Maximo so that the data
 * can be stored in the LBSLOCATION table
 */
ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance = null;

dojo.declare("ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor", ibm.tivoli.fwm.mxmap._Base, {
	interval: 0, // seconds
	_timer: null,
	compId: null,
	_myCurrentLocation: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);

		// Get the instance of MyCurrentLocation
		this._myCurrentLocation = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();

	},
	/**
	 * Starts the timer to monitor the current location
	 */
	start: function()
	{
		if (this._timer == null)
		{
			if (this.interval > 0)
			{

				console.log("[LocationMonitor] Starting timer with interval " + this.interval);

				this._doStart();
			}
			else
			{

				console.log("[LocationMonitor] Interal must be greater than zero -- Start ignored.");

			}
		}
		else
		{

			console.log("[LocationMonitor] Timer already started. Ignoring start");

		}
	},
	/**
	 * Stops the timer
	 */
	stop: function()
	{
		if (this._timer == null)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[LocationMonitor] Timer not started. Ignoring stop");
			}
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[LocationMonitor] Stopping timer");
			}
			this._timer.stop();
			this._timer = null;
		}
	},
	/**
	 * Returns true if the timer is active
	 */
	started: function()
	{
		return (this._timer != null);
	},
	/**
	 * Creates the instance of dojox.timing.Timer and changes the onTick,
	 * onStart and onStop functions Calls myCurrentLocation.getUserLocation on
	 * onTick
	 */
	_doStart: function()
	{
		this._myCurrentLocation.getUserLocation(dojo.hitch(this, this._updateMaximoRecord), dojo.hitch(this, this._failedToGetCurrentLocation));
		this._timer = new dojox.timing.Timer(this.interval * 1000);
		this._timer.onTick = dojo.hitch(this, function()
		{
			if (this._myCurrentLocation)
			{
				this._myCurrentLocation.getUserLocation(dojo.hitch(this, this._updateMaximoRecord), dojo.hitch(this, this._failedToGetCurrentLocation));
			}
		});
		this._timer.onStart = dojo.hitch(this, function()
		{

			console.log("[LocationMonitor] Started timer to update current location");

		});
		this._timer.onStop = dojo.hitch(this, function()
		{

			console.log("[LocationMonitor] Stopped timer to update current location");

		});
		this._timer.start();
	},
	/**
	 * Sends the LBS location data to the server
	 */
	_updateMaximoRecord: function(position)
	{

		if (position && position.coords)
		{
			var positionData = position.coords;

			var myEvent = new Event("loadLaborLBS", this.compId, {
				lat: positionData.latitude,
				lng: positionData.longitude,
				locationAccuracy: positionData.accuracy,
				altitudeAccuracy: positionData.altitudeAccuracy,
				altitude: positionData.altitude,
				heading: positionData.heading,
				speed: positionData.speed
			}, REQUESTTYPE_HIGHASYNC);

			queueManager.queueEvent(myEvent, "text/html", "text", dojo.hitch(this, this._messageSuccessfullySentToMaximo), dojo.hitch(this, this._failedToSendMessageToMaximo));
		}
	},
	/**
	 * Handles the 4 possible errors when trying to retrieve LBS location data.
	 * If the errors are either PERMISSION_DENIED or GEOLOCATION_NOT_SUPPORTED,
	 * the server logs the error and the LBS data collection stops. If the
	 * errors are either TIMEOUT or POSITION_UNAVAILABLE, just log in the
	 * browser console.
	 */
	_failedToGetCurrentLocation: function()
	{
		if (this._myCurrentLocation)
		{
			switch (this._myCurrentLocation.getStatus())
			{
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
					this.stop();

					console.warn("[LocationMonitor] Could not retrieve current location (PERMISSION_DENIED). LBS data collection stopped.");

					this._logPermissionDenied();
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
					this.stop();

					console.warn("[LocationMonitor] Could not retrieve current location (GEOLOCATION_NOT_SUPPORTED). LBS data collection stopped.");

					this._logNotSupported();
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
					console.warn("[LocationMonitor] Could not retrieve current location (TIMEOUT).");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
					console.warn("[LocationMonitor] Could not retrieve current location (POSITION_UNAVAILABLE).");
					break;
				default:
					break;
			}
			;
		}
	},
	_failedToSendMessageToMaximo: function()
	{
		console.error("[LocationMonitor] Failed to send current location to Maximo");
	},
	_messageSuccessfullySentToMaximo: function()
	{
	},
	/**
	 * Send a message to the server so that it can log the PERMISSION_DENIED
	 * error.
	 */
	_logPermissionDenied: function()
	{
		sendEvent('logLBSCollectionPermissionDenied', this.compId, '');
	},
	/**
	 * Send a message to the server so that it can log the
	 * GEOLOCATION_NOT_SUPPORTED error.
	 */
	_logNotSupported: function()
	{
		sendEvent('logLBSCollectionNotSupported', this.compId, '');
	},
	destroyRecursive: function()
	{
		this.stop();
		this.inherited(arguments);
	}
});

/**
 * Retrieves the LocationMonitor singleton instance
 */
ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor.getLocationMonitorInstance = function(params)
{
	if (!ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance)
	{
		ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance = new ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor(params);
	}
	return ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance;
};

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/Router", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation,ibm/tivoli/fwm/mxmap/MXRecord"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");
dojo.require("ibm.tivoli.fwm.mxmap.MXRecord");
/**
 * Maximo router main helper class.<br>
 * Map providers must extend this class
 */
ibm.tivoli.fwm.mxmap.routing.CalculatedStops = {
	CONF_START_STOP: "ConfiguredStartLocation",
	CONF_END_STOP: "ConfiguredEndLocation",
	USER_LOCATION_STOP: "UserGeoLocation"
};
ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes = {
	ZERO_RESULTS: "ZERO_RESULTS",
	INVALID_REQUEST: "INVALID_REQUEST",
	REQUEST_DENIED: "REQUEST_DENIED",
	OVER_LIMIT: "OVER_LIMIT",
	MIN_STOPS_REQ: "MIN_STOPS_REQ",
	TIMEOUT: "TIMEOUT",
	UNKNOWN: "UNKNOWN"
};
ibm.tivoli.fwm.mxmap.routing.DistanceUnit = {
	KM: 0,
	MILES: 1,
	getLabel: function(unitType)
	{
		if (unitType == this.KM)
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancekm");
		}
		else
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancemi");
		}
	},
	getBy1000Label: function(unitType)
	{
		if (unitType == this.KM)
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancemeters");
		}
		else
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distanceft");
		}
	},
	formatDistance: function(valueInKilometers, unit)
	{
		var val = 0;
		var tokenStr = "";
		var strVal = "";

		if (unit == this.MILES)
		{
			valueInKilometers = valueInKilometers / 1.6;
		}
		if (valueInKilometers <= 0.1)
		{
			val = (valueInKilometers * 10000);
			tokenStr = this.getBy1000Label(unit);
		}
		else
		{
			val = valueInKilometers * 10;
			tokenStr = this.getLabel(unit);
		}
		val = Math.round(val);
		val = val / 10;
		
		strVal = tokenStr.replace("{0}", val.toString());
		
		return strVal;
	},
	formatTime: function(time)
	{
		var tokenStr = "";
		var strVal = "";
		var hr = Math.floor(time / 60), // Important to use math.floor with
		// hours
		min = Math.round(time % 60);

		if (hr < 1 && min < 1)
		{
			return strVal;
		}
		else if (hr < 1)
		{
			tokenStr = ibm.tivoli.fwm.i18n.getMaxMsg("map", "timemin");
			strVal = tokenStr.replace("{0}", min.toString());
		}
		else
		{
			tokenStr = ibm.tivoli.fwm.i18n.getMaxMsg("map", "timehmin");
			strVal = tokenStr.replace("{0}", hr.toString());
			strVal = strVal.replace("{1}", min.toString());
		}
		return strVal;

	}
};
dojo.declare("ibm.tivoli.fwm.mxmap.routing.Router", ibm.tivoli.fwm.mxmap._Base, {
	routecolor: null,
	endLocation: null,
	startLocation: null,
	optimizeroute: false,
	myCurrentLocationInstance: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.myCurrentLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
	},
	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 * @param callback
	 * @param errorCb
	 */
	getUserLocation: function(callback, errorCb)
	{
		if (this.myCurrentLocationInstance)
		{
			var errorCallback = function()
			{
				if (this.map)
				{
					this.map.failedToGetLocation();
				}
				errorCb();
			};
			
			this.myCurrentLocationInstance.getUserLocation(callback, dojo.hitch(this, errorCallback));
		}
	},
	/**
	 * Converts the current geolocation position into a standard stop.
	 * 
	 * @returns
	 */
	_getUserLocationStop: function()
	{
		var userLocStop = null;
		if (this.myCurrentLocationInstance)
		{
			var position = this.myCurrentLocationInstance.getPosition();
			userLocStop = {
				name: "currentLocation",
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		}
		return userLocStop;
	},
	isLocationStatusUnassigned: function()
	{
		var isLocStatUnassigned = false;
		if (this.myCurrentLocationInstance)
		{
			isLocStatUnassigned = this.myCurrentLocationInstance.isStatusUnassigned();
		}
		return isLocStatUnassigned;
	},
	isLocationStatusHasLocation: function()
	{
		var isLocStatHasLoc = false;
		if (this.myCurrentLocationInstance)
		{
			isLocStatHasLoc = this.myCurrentLocationInstance.isStatusHasLocation();
		}
		return isLocStatHasLoc;
	},
	_checkForCalculatedStops: function(stops)
	{
		
		if (stops && stops.length > 0)
		{
			console.log("Total stops " + stops.length);			
						
			if (stops[0].calculatedStop == true)
			{
				stops = stops.slice(1, stops.length );
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log(stops.length, stops);
			}
			var lastStopIndex = 0;
			if (stops.length == 0)
			{
				return stops;
			}
			if (stops.length > 0)
			{
				lastStopIndex = stops.length - 1;
			}
			if (stops[stops.length - 1].calculatedStop == true)
			{
				stops = stops.slice(0, stops.length - 1);
			}
		}
		// check if any missing GISDATA stop
		var i = 0;
		while (i < stops.length)
		{
			var stop = stops[i];
			var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});
			if (mxRec.hasAnyGISCoordinates() == false)
			{
				console.warn("Stop", stop, "Has no GIS info",stops.length);				
				stops=stops.slice(0,i).concat(stops.slice(i+1));
				console.warn("Stop", stops.length);
			}else{
				i++;
			}

		}

		return stops;
	},
	/**
	 * Draw the route based on a set of stops and the current route
	 * configuration.<br>
	 * If route starts with current location it retrieves the current location
	 * and inserts it into the 1st stop.<br>
	 * Else if there is a starting point set with lat/lng it inserts the
	 * starting point into the 1st stop.<br>
	 * If there is an ending point set with lat/lng it inserts the ending point
	 * into the 1st stop.<br>
	 * 
	 * @param stops []
	 * @param successcallback
	 * @param errorCallback
	 */
	drawRoute: function(stops, callback, errorCallback, instanceConf)
	{

		

		stops = this._checkForCalculatedStops(stops);
		console.log("conf instance ", instanceConf);
		if (this.isStartWithCurrentLocation(instanceConf) && this.isLocationStatusUnassigned())
		{
			var fct = function()
			{
				console.info("continuing to draw route WITH user start location");				
				this.drawRoute(stops, callback, errorCallback);
			};
			var fctError = function()
			{
				console.info("continuing to draw route without user start location");
				this.drawRoute(stops, callback, errorCallback);
			};
			console.log("getting user location");
			this.getUserLocation(dojo.hitch(this, fct), dojo.hitch(this, fctError));
		}
		else
		{
			var _stops = [];
			if (this.isStartWithCurrentLocation(instanceConf) && this.isLocationStatusHasLocation())
			{
				var ul = this._getUserLocationStop(instanceConf);
				ul.calculatedStop = true;
				ul.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.USER_LOCATION_STOP;
				_stops.push(ul);
			}
			else
			{
				var startLocation = this.startLocation;
				if (instanceConf && instanceConf.startLocation != null)
				{
					startLocation = instanceConf.startLocation;
				}
				if (startLocation && startLocation.hasOwnProperty("lat") && startLocation.lat != null)
				{
					startLocation.calculatedStop = true;
					startLocation.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.CONF_START_STOP;
					_stops.push(startLocation);
				}
			}

			_stops = _stops.concat(stops);
			var endLocation = this.endLocation;
			if (instanceConf && instanceConf.endLocation != null)
			{
				endLocation = instanceConf.endLocation;
			}
			if (endLocation && endLocation.hasOwnProperty("lat") && endLocation.lat != null)
			{
				endLocation.calculatedStop = true;
				endLocation.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.CONF_END_STOP;
				_stops.push(endLocation);
			}
			if (_stops.length < 2)
			{
				console.warn("at least 2 stops are needed");
				errorCallback(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ, "at least 2 stops are needed");
				return;
			}
			this.showRoute(_stops, callback, errorCallback, true, instanceConf);
		}

	},
	
	/**
	 * this is the extension point of routing. All implementations must override
	 * this method
	 * 
	 * @param stops
	 * @param cb
	 * @param errcb
	 */
	showRoute: function(stops, cb, errcb, zoomToRoute)
	{
		throw "No showRoute implementation";
	},
	isStartWithCurrentLocation: function(instanceConf)
	{
		if (instanceConf && instanceConf.startithcurrentlocation)
		{
			return instanceConf.startwithcurrentlocation == "true";
		}
		else
		{
			return this.startwithcurrentlocation == "true";
		}
	},
	isOptimizeRoute: function()
	{
		return this.optimizeroute == "true";
	},

	destroyRecursive: function()
	{
		this.inherited(arguments);
	},

	getCurrentDistanceUnit: function()
	{
		if (this.customConf)
		{
			return this.customConf.distanceUnit;
		}
		else
		{
			return ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM;
		}

	},
	getAvoidHighways: function()
	{
		if (this.customConf)
		{
			return this.customConf.avoidHighway;
		}
		return false;

	},
	getAvoidTolls: function()
	{
		if (this.customConf)
		{
			return this.customConf.avoidToll;
		}
		return false;

	},
	/**
	 * The code below is only for evaluating route performance.
	 */
	timers: null,
	_startTimer: function()
	{
		try
		{
			if (dojo.config.fwm.debug == true)
			{
				if (this.timers == null)
				{
					this.timers = [];
				}

				this.timers.push(new Date().getTime());
				return this.timers.length - 1;
			}
			return -1;
		}
		catch (e)
		{
			console.log("error starting timer", e);
		}
	},

	_stopTimer: function(h, total)
	{
		try
		{
			if (dojo.config.fwm.debug == true)
			{
				var endt = new Date().getTime();
				if (h == null)
				{
					console.info("Total routing time for " + total + " stops in (s) ", (endt - this.timers[0]) / 1000);
					this.timers = null;
				}
				else
				{
					console.log("Route step routing time for " + total + " stops in (s) ", (endt - this.timers[h]) / 1000);
				}
			}
		}
		catch (e)
		{
			console.log("error stopping timer", e);
		}
	}

});
});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/impl/bingmaps", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/routing/Router,ibm/tivoli/fwm/mxmap/routing/Route"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.bingmaps");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");

/**
 * Bing maps routing implementation.
 */
ibm.tivoli.fwm.mxmap.routing.impl.bcc = 0;
ibm.tivoli.fwm.mxmap.routing.impl.bingmapsId = function()
{
	return ibm.tivoli.fwm.mxmap.routing.impl.bcc++;
};

dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.bingmaps", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	map: null,
	conf: null,
	_isLoaded: false,
	_routeQueue: [],
	_msHandlers: [],
	_routeLimits: 10,
	/**
	 * Bing maps needs to load the Direction module
	 * 
	 */
	c: 0,
	constructor: function(params)
	{
		console.log("router bingmaps", params);
		this.id = ibm.tivoli.fwm.mxmap.routing.impl.bingmapsId();
		this._msHandlers = [];
		this._routeQueueParalel = [];
		this._isLoaded = false;
		dojo.mixin(this, params);
		this.c = 0;
		var loadedFct = dojo.hitch(this, this._loaded);
		if (Microsoft.Maps.Directions)
		{
			console.log("MsDirections loaded");
			this.directionsService = new Microsoft.Maps.Directions.DirectionsManager(this.map.getMapstraction().getProviderMap());

			this._isLoaded = true;
		}
		else
		{
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				callback: loadedFct
			});
		}
	},
	/**
	 * Until the bing directions module is not loaded we cannot perform any
	 * routing. After it loads we trigger the _executeQueue to execute any
	 * queued routing requests.
	 */
	_loaded: function()
	{
		console.log("loaded module Microsoft.Maps.Directions");
		this.directionsService = new Microsoft.Maps.Directions.DirectionsManager(this.map.getMapstraction().getProviderMap());

		this._isLoaded = true;

		this._executeQueue();
	},

	/**
	 * Handles final route callback when it's complete
	 * 
	 * @param arg
	 * @param callback
	 */
	_routedOk: function(routeSummary, callback)
	{
		console.log("routed ok", this.id, this.routecolor, routeSummary);
		
		routeSummary.totalDistance = routeSummary.distance;
		routeSummary.totalDuration = routeSummary.time;
		routeSummary.map = this.map;
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var initialStops = routeSummary.inputInfo.stops;
		if (routeSummary.itineraryLegInfo.length > 0)
		{
			var mustGeocode = false;
			if (initialStops[0].calculatedStop == true)
			{
				mustGeocode = true;
			}
			itinerary.setInitialLocation(routeSummary.itineraryLegInfo[0].startAddress, routeSummary.itineraryLegInfo[0].startLoc, null, null, mustGeocode);
		}

		itinerary.addAllLegs(routeSummary.itineraryLegInfo);
		
		//check if last stop was calculated we must force geocode
		if(initialStops[initialStops.length-1].calculatedStop==true){
			itinerary.legs[itinerary.legs.length-1].needsToGeocode=true;
		}
		routeSummary.itinerary = itinerary;
		routeSummary.distanceUnit = this.getCurrentDistanceUnit();

		if (callback)
		{
			var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routeSummary);
			callback(routeInfo);
		}
		this.isExecuting = false;
		this.executeQueuedParalel();
	},
	/**
	 * Handles routing error callback
	 * http://msdn.microsoft.com/en-us/library/hh312807.aspx
	 * 
	 * @param error
	 * @param erroCb
	 */
	_routeError: function(status, errCb)
	{
		console.error("route failed", status, errCb);
		if (errCb)
		{
			switch (status.responseCode)
			{
				case 2:
				case 3:
				case 4:
				case 5:
				case 8:
				case 15:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS, status);
					break;
				case 13:
				case 16:
				case 18:
				case 17:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED, status);
					break;
				case 11:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.TIMEOUT, status);
					break;
				default:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN_ERROR, status);
					break;

			}
		}
		this.executeQueuedParalel();
	},
	/**
	 * Executes all queued routing requests
	 */
	_executeQueue: function()
	{
		console.log("executing queued ", this._routeQueue.length);
		for ( var i = 0; i < this._routeQueue.length; i++)
		{
			console.log("fct ", this._routeQueue[i]);
			var obj = this._routeQueue[i];
			this.showRoute(obj.stops, obj.callback, obj.errCb, null, obj.instanceConf);

		}
	},
	executeQueuedParalel: function()
	{
		console.log("executing queued paralele", this._routeQueueParalel.length);
		if (this._routeQueueParalel.length > 0)
		{
			var obj = this._routeQueueParalel.pop();
			this.showRoute(obj.stops, obj.callback, obj.errCb, null, obj.instanceConf);
		}
		console.log("sent");
	},
	/**
	 * Get route data, route polyline, stop locations and last stop.
	 * 
	 * @param resp
	 * @param map
	 * @returns {lastWayPoint:lastWayPoint,locations:locations,polylineVertices:polylineVertices}
	 */
	_extractItinerarySteps: function(itineraryItems)
	{
		var steps = [];
		var lastDistance = 0.0;
		for ( var id in itineraryItems)
		{
			var item = itineraryItems[id];
			var loc = new mxn.LatLonPoint(item.coordinate.latitude,item.coordinate.longitude);
			var step = {
				distance: lastDistance,
				duration: item.durationInSeconds,
				info: item.formattedText,
				location:loc
			};
			steps.push(step);
			lastDistance = item.distance;

		}
		return steps;
	},
	_extractRouteInfo: function(resp, map)
	{
		var lastWayPoint = null;
		var locations = [];
		var polylineVertices = [];
		var itineraryLegInfo = [];

		for ( var j in resp.route)
		{
			var routeLegs = resp.route[j];
			for ( var k in routeLegs)
			{
				var leg = routeLegs[k];
				
				for ( var l in leg)
				{
					var st = leg[l];
				
					if (!st)
					{
						continue;
					}
					// st.startWaypointLocation
					var startpt = new mxn.LatLonPoint();
					startpt.fromProprietary(this.map.getMapstraction().api, st.startWaypointLocation);

					locations.push(startpt);

					var legEnd = new mxn.LatLonPoint();
					legEnd.fromProprietary(this.map.getMapstraction().api, st.endWaypointLocation);
					var legInfo = {
						location: legEnd,
						startLoc: startpt,
						distanceToLeg: st.summary.distance,
						durationToLeg: Math.round(st.summary.time / 6) / 10,
						info: null,
						startAddress: null,
						marker: null,
						steps: null,
						onclick: null
					};
					console.log(l, st.subLegs);
					for ( var m in st.subLegs)
					{
						var sleg = st.subLegs[m];

						if (legInfo.startAddress == null)
						{

							legInfo.startAddress = sleg.startDescription;
						}
						polylineVertices = polylineVertices.concat(this._getPolylineVertices(sleg, map));
						legInfo.info = sleg.endDescription;
					}

					legInfo.steps = this._extractItinerarySteps(st.itineraryItems);
					itineraryLegInfo.push(legInfo);
					lastWayPoint = new mxn.LatLonPoint();
					lastWayPoint.fromProprietary(this.map.getMapstraction().api, st.endWaypointLocation);

				}
			}
		}
		return {
			lastWayPoint: lastWayPoint,
			locations: locations,
			itineraryInfo: itineraryLegInfo,
			polylineVertices: polylineVertices
		};
	},
	/*
	 * iterate over a subleg and returns the vertices of the polyline
	 */
	_getPolylineVertices: function(subLeg)
	{
		var lineVertices = [];
		if (subLeg && subLeg.routePath)
		{
			var rpath = subLeg.routePath;

			for ( var i in rpath.decodedLatitudes)
			{
				var lat = rpath.decodedLatitudes[i];
				var lng = rpath.decodedLongitudes[i];
				// lineVertices.push(new Microsoft.Maps.Location(lat, lng));
				lineVertices.push(new mxn.LatLonPoint(lat, lng));
			}

		}
		return lineVertices;
	},
	/**
	 * Executes the routing on bing maps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	_routeQueueParalel: null,
	showRoute: function(stops, callback, errCb, a, instanceConf)
	{

		if (this.isExecuting == true)
		{
			console.warn("there's a execution going on");
			this._routeQueueParalel.push({
				stops: stops,
				callback: callback,
				errCb: errCb,
				instanceConf: instanceConf
			});
			return;
		}

		if (this._isLoaded == true)
		{
			this.isExecuting = true;
			var failFct = function(error)
			{
				this.isExecuting = false;
				this._routeError(error, errCb);
			};
			var map = this.map.getMapstraction().getProviderMap();

			var routeSummary = {
				distance: 0,
				time: 0
			};
			if (instanceConf != null && instanceConf.routecolor)
			{
				this.routecolor = instanceConf.routecolor;
			}
			var offset = 0;
			var vertices = [];
			var waypointsLocations = [];
			var itineraryInfo = [];
			var th = this._startTimer();
			var complFct = function(response)
			{
				console.log("response", response);

				for ( var j in response.routeSummary)
				{
					routeSummary.distance += response.routeSummary[j].distance;
					routeSummary.time += response.routeSummary[j].time;
					console.log(j, "summary", response.routeSummary[j]);
				}
				var routeInfo = this._extractRouteInfo(response, map);

				vertices = vertices.concat(routeInfo.polylineVertices);
				itineraryInfo = itineraryInfo.concat(routeInfo.itineraryInfo);
				waypointsLocations = waypointsLocations.concat(routeInfo.locations);
				this._stopTimer(th, waypointsLocations.length);
				var lastStop = routeInfo.lastWayPoint;

				if (offset < stops.length)
				{

					var start = offset;
					offset += this._routeLimits;

					if (offset >= stops.length)
					{
						offset = stops.length;
					}

					if (start > 0)
					{
						start = start - 1;
					}
					th = this._startTimer();
					console.log("offset2", start, offset, stops.slice(start, offset).length);
					this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), errCb);
				}
				else
				{
					// adding last stop
					waypointsLocations.push(lastStop);
					// reset bing maps direction service otherwise it throws an
					// exception if we request more than the max route stops
					// limit
					console.warn("final resetDirections");
					this.directionsService.resetDirections();
					this._renderRoute(waypointsLocations, vertices, routeSummary, map, callback, errCb, itineraryInfo, stops);

				}

			};
			if (offset < stops.length)
			{

				var start = offset;
				offset += this._routeLimits;

				if (offset >= stops.length)
				{
					offset = stops.length;
				}

				if (start > 0)
				{
					start = start - 1;
				}
				console.log("offset", start, offset, stops.slice(start, offset).length, " m ", this.map.getId());
				// console.trace();
				this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), dojo.hitch(this, failFct));

			}

			return;

		}
		else
		{
			// queueing a request until route module was not loaded
			console.warn("wait");
			this._routeQueue.push({
				stops: stops,
				callback: callback,
				errCb: errCb,
				instanceConf: instanceConf
			});
		}
	},
	/*
	 * Draw a list of stop locations,draw a polygon based on its vertices and
	 * execute the callback function with the route summary param.
	 */
	_renderRoute: function(waypointsLocations, vertices, routeSummary, map, callback, errCb, itineraryInfo, initialStops)
	{

		var poly = new mxn.Polyline();
		poly.points = vertices;
		poly.color = this.routecolor;
		poly.setOpacity(this.routeOpacity);
		poly.setWidth(this.routeLineWidth);
		
				
		routeSummary.stops = waypointsLocations;
		routeSummary.polyline = poly;
		console.log("rendering routes");
		var wp = this.directionsService.getRenderOptions().waypointPushpinOptions;
		wp.draggable = false;

		var customFct = function(opts)
		{
			this.wp = opts;
			this._counter = 0;
			this.getNext = function()
			{
				this.wp.text = this._generateMarkerText();
				return this.wp;
			};
			this._generateMarkerText = function()
			{

				var offset = (this._counter % 26);

				var dis = parseInt(this._counter / 26);
				var digit = String.fromCharCode(65 + offset);
				this._counter++;
				if (dis > 0)
				{
					digit += dis;
				}
				return digit;
			};
		};

		routeSummary.customMarkerOptions = new customFct(wp);

		routeSummary.itineraryLegInfo = itineraryInfo;
		console.log(itineraryInfo);
		this._stopTimer(null, routeSummary.stops.length);
		routeSummary.inputInfo = {
			stops: initialStops,
			successCb: callback,
			errorCb: errCb
		};
		routeSummary.originalRouter = this;
		this._routedOk(routeSummary, callback);
	},
	_convertMboToMSLocation: function(mboInfo)
	{
		var latLng;
		if (mboInfo.hasOwnProperty("gisdata"))
		{
			if (mboInfo.gisdata.lat != null && mboInfo.gisdata.lng != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.gisdata.lat, mboInfo.gisdata.lng);
			}
			else if (mboInfo.autolocate != null && mboInfo.autolocate.gisdata != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.autolocate.gisdata.lat, mboInfo.autolocate.gisdata.lng);
			}
			else if (mboInfo.hasOwnProperty("lat") && mboInfo != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.lat, mboInfo.lng);
			}
			else
			{
				console.warn("Stop doesn't have gis coords", mboInfo);
			}
		}
		else
		{
			latLng = new Microsoft.Maps.Location(mboInfo.lat, mboInfo.lng);
		}
		return latLng;

	},
	/*
	 * Execute one route request against bing maps.
	 */
	_calculateRoute: function(stops, callback, errCb)
	{
		var successHandler = null;
		var errorHandler = null;
		var success = function(arg)
		{
			if (successHandler)
			{
				Microsoft.Maps.Events.removeHandler(successHandler);
			}
			if (callback)
			{
				callback(arg);
			}

		};
		var errorFct = function(error)
		{
			if (errorHandler)
			{
				Microsoft.Maps.Events.removeHandler(errorHandler);
			}
			if (errCb)
			{
				errCb(error);
			}
		};
		errorHandler = Microsoft.Maps.Events.addHandler(this.directionsService, 'directionsError', dojo.hitch(this, errorFct));

		successHandler = Microsoft.Maps.Events.addHandler(this.directionsService, 'directionsUpdated', dojo.hitch(this, success));
		console.warn("resetDirections in _calculateRoute", this.c++);
		this.directionsService.resetDirections();

		
		var reqOpts = {
			routeMode: Microsoft.Maps.Directions.RouteMode.driving,
			distanceUnit: Microsoft.Maps.Directions.DistanceUnit.kilometers,// requests
																			// are
																			// always
																			// in
																			// km

			routeDraggable: false
		};
		if (this.getAvoidHighways() == true && this.getAvoidTolls() == true)
		{
			reqOpts.routeAvoidance = 12;
		}
		else if (this.getAvoidTolls() == true)
		{
			reqOpts.routeAvoidance = 8;
		}
		else if (this.getAvoidHighways() == true)
		{
			reqOpts.routeAvoidance = 4;
		}
		else
		{
			reqOpts.routeAvoidance = 0;
		}
		if (reqOpts.routeAvoidance && reqOpts.routeAvoidance == 0 && this.isOptimizeRoute())
		{
			reqOpts.routeOptimization = Microsoft.Maps.Directions.RouteOptimization.shortestDistance;
		}
		this.directionsService.setRequestOptions(reqOpts);
		console.log("request options", reqOpts);
		for ( var i = 0; i < stops.length; i++)
		{
			var stop = stops[i];
			// if(stop.hasOwnProperty("gisdata")){
			// stop=stop.gisdata;
			// }
			var loc = this._convertMboToMSLocation(stop);// new
															// Microsoft.Maps.Location(stop.lat,
															// stop.lng);
			var waypoint = new Microsoft.Maps.Directions.Waypoint({
				location: loc
			});
			this.directionsService.addWaypoint(waypoint);
		}
		
		var color = this.routecolor;
		var lineWidth = this.routeLineWidth;
		var opacity = this.routeOpacity;
		
		if (color.indexOf("#") != 0)
		{
			color = "#" + color;
		}
		
		var msColor = Microsoft.Maps.Color.fromHex(color);
				
		this.directionsService.setRenderOptions({
			waypointPushpinOptions: {
				draggable: false
			},
			drivingPolylineOptions: {
				strokeColor: new Microsoft.Maps.Color(opacity*255, msColor.r, msColor.g, msColor.b),
				strokeThickness: lineWidth
			},

			autoUpdateMapView: false
		});
		
		
		

		this.directionsService.calculateDirections();
	},

	/**
	 * remove MS handlers
	 */
	destroyRecursive: function()
	{
		this.inherited(arguments);// similar to
		// super.destroyRecursive().
		// arguments is mandatory
		// var
		for ( var hid in this._msHandlers)
		{
			var handler = this._msHandlers[hid];
			Microsoft.Maps.Events.removeHandler(handler);
		}
		this.directionsService.dispose();
	}

});
});

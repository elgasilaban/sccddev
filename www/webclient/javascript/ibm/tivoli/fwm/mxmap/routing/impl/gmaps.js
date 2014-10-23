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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.gmaps");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");
/**
 * Google maps routing implementation.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.gmaps", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	_routeLimits: 25,// how many stops the routing service allows
	// markers images url prefix
	_markerHost: "http://maps.gstatic.com/mapfiles/markers2/",

	constructor: function(params)
	{
		console.log("[Gmaps Router]", params);
		dojo.mixin(this, params);

		this.directionsService = new google.maps.DirectionsService();

		if (this.map.mapConf.key == null || this.map.mapConf.key.length == 0)
		{
			// no premier map
			this._routeLimits = 10;
		}
		console.log("[Gmaps Router] _routeLimits: ", this._routeLimits);

	},
	/*
	 * Return all the vertices coordinates of the route path
	 */
	_getPathCoords: function(r)
	{
		var coords = [];

		for ( var k in r.overview_path)
		{
			var p = r.overview_path[k];
			var mxnll = new mxn.LatLonPoint();
			mxnll.fromProprietary(this.map.getMapstraction().api, p);
			coords.push(mxnll);
		}

		return coords;
	},
	/**
	 * 
	 * @param route
	 * @param addmarkers
	 * @param map
	 * @returns { distance: total distance of this route duration: total
	 *          duration in seconds of this route marker: all the markers for
	 *          each stop of this route }
	 */
	_iterateOverLegs: function(route, addmarkers, map)
	{
		var routingData = {
			distance: 0,
			duration: 0,
			legData: [],
			markers: [],
			stops: [],
			polyline: []
		};
		var lastPoint = null;
		var lastAddress = "";

		for ( var k in route.legs)
		{
			var leg = route.legs[k];
			routingData.distance += leg.distance.value;
			routingData.duration += leg.duration.value;
			var stepsInfo = this._getStepsData(leg.steps);
			var steps = stepsInfo.stepData;
			var startpt = new mxn.LatLonPoint();
			startpt.fromProprietary(this.map.getMapstraction().api, leg.start_location);
			var ep = new mxn.LatLonPoint();
			ep.fromProprietary(this.map.getMapstraction().api, leg.end_location);
			routingData.legData.push({
				distance: leg.distance.value,
				duration: leg.duration.value,
				startAddress: leg.start_address,
				endAddress: leg.end_address,
				endLatLng: ep,
				startLatLng: startpt,
				steps: steps
			});
			routingData.polyline = routingData.polyline.concat(stepsInfo.polyStops);

			routingData.stops.push(startpt);

			lastPoint = leg.end_location;
			lastAddress = leg.end_address;

		}

		var lastpt = new mxn.LatLonPoint();
		lastpt.fromProprietary(this.map.getMapstraction().api, lastPoint);
		routingData.stops.push(lastpt);

		return routingData;
	},
	_getStepsData: function(steps)
	{
		var data = [];
		var polyStops = [];
		if (steps)
		{
			for ( var index in steps)
			{
				var step = steps[index];
				var distance = step.distance.value;

				var loc = new mxn.LatLonPoint();
				loc.fromProprietary(this.map.getMapstraction().api, step.start_location);
				distance /= 1000;// google returns in meters, we need in km

				data.push({
					distance: distance,
					duration: step.duration.value,
					info: step.instructions,
					location: loc
				});
				polyStops = polyStops.concat(step.path);
			}
		}
		return {
			stepData: data,
			polyStops: polyStops
		};
	},

	/**
	 * allows to create more than 25 stops route in gmaps. It handles the return
	 * of each 25 stops route requests and and merge them. And returns in teh
	 * call back the routing data:
	 * 
	 * distance: 0, duration: 0, polyline: null, waypoints: [], markers: [],
	 * copyrights:
	 * 
	 */
	ccs: [ "#ff0000", "#00ff00", "#ffffff" ],
	co: 0,
	_multipleRouteSuccess: function(routesResponses, callback, errCb, initialStops)
	{

		var map = this.map.getMapstraction().getProviderMap();
		var routingData = {
			totalDistance: 0,
			totalDuration: 0,
			legsData: [],
			polyline: null,
			stops: [],
			copyrights: null
		};

		var plineCoords = [];
		for ( var index = 0; index < routesResponses.length; index++)
		{
			var r = routesResponses[index].routes[0];

			// if (window.DEBUGLEVEL && window.DEBUGLEVEL > 1)
			// {
			// var polyDebug = new mxn.Polyline();
			// polyDebug.points = this._getPathCoords(r);
			// polyDebug.color = this.ccs[this.co++];
			// this.map.getMapstraction().addPolyline(polyDebug);
			// }

			// plineCoords = plineCoords.concat(this._getPathCoords(r));

			if (routingData.copyrights == null)
			{
				routingData.copyrights = r.copyrights;
			}
			else
			{
				routingData.copyrights += ", " + r.copyrights;
			}

			var rd = this._iterateOverLegs(r, true, map);

			for ( var k in rd.polyline)
			{
				var p = rd.polyline[k];
				var mxnll = new mxn.LatLonPoint();
				mxnll.fromProprietary(this.map.getMapstraction().api, p);
				plineCoords.push(mxnll);
			}

			routingData.totalDistance += rd.distance;
			routingData.totalDuration += rd.duration;

			routingData.legsData = routingData.legsData.concat(rd.legData);
			var rstops = rd.stops;
			if (routesResponses[index].overlapPrevious == true)
			{
				rstops = rstops.slice(1, rstops.length);
			}
			routingData.stops = routingData.stops.concat(rstops);
			// routingData.markers = routingData.markers.concat(rd.markers);
		}

		var poly = new mxn.Polyline();
		poly.points = plineCoords;
		poly.color = this.routecolor;
		poly.setOpacity(this.routeOpacity);
		poly.setWidth(this.routeLineWidth);

		if (dojo.config.fwm.debug == true)
		{
			console.log("points poly", plineCoords.length);
			console.log("poly color", poly.color);
		}

		routingData.polyline = poly;

		routingData.map = this.map;

		var customFct = function(_markerHost)
		{
			this._markerHost = _markerHost;
			this._counter = 0;
			this.getNext = function()
			{
				// this.wp.text=this._generateMarkerText();
				return {
					icon: this._generateMarkerImageUrl(),
					size: [ 20, 34 ],
					anchor: [ 10, 34 ]
				};
			};
			this._generateMarkerImageUrl = function()
			{

				var color = "_green";
				var offset = (this._counter % 26);

				var digit = String.fromCharCode(65 + offset);
				if (dojo.config.fwm.debug == true)
				{
					console.log("custommarker", this._counter, digit);
				}
				this._counter++;

				return this._markerHost + "marker" + color + digit + ".png";
			};
		};

		routingData.customMarkerOptions = new customFct(this._markerHost);

		// maybe moved to the route.
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var mustGeocode = false;
		if (initialStops[0].calculatedStop == true)
		{
			mustGeocode = true;
		}
		itinerary.setInitialLocation(routingData.legsData[0].startAddress, routingData.legsData[0].startLatLng, null, null, mustGeocode);
		if (routingData.legsData && routingData.legsData.length > 0)
		{

			for ( var index = 0; index < routingData.legsData.length; index++)
			{
				var loc = routingData.legsData[index].endLatLng;
				var info = routingData.legsData[index].endAddress;
				var distanceToLeg = routingData.legsData[index].distance;
				var durationToLeg = routingData.legsData[index].duration / 60;/*
																				 * supposed
																				 * to
																				 * be
																				 * in
																				 * minutes
																				 */
				var steps = routingData.legsData[index].steps;

				distanceToLeg /= 1000;/*
										 * google returns in meters, we need in
										 * km
										 */

				itinerary.addLeg(loc, info, distanceToLeg, durationToLeg, null, steps, null, null);
			}
		}
		// check if last stop was calculated we must force geocode
		if (initialStops[initialStops.length - 1].calculatedStop == true)
		{
			itinerary.legs[itinerary.legs.length - 1].needsToGeocode = true;
		}
		routingData.itinerary = itinerary;
		routingData.inputInfo = {
			stops: initialStops,
			successCb: callback,
			errorCb: errCb
		};
		routingData.originalRouter = this;
		routingData.distanceUnit = this.getCurrentDistanceUnit();
		var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routingData);

		if (callback)
		{
			callback(routeInfo);
		}
	},

	distanceUnit: null,
	/**
	 * Executes the routing on gmaps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	showRoute: function(stops, callback, errCb)
	{
		this._counter = 0;
		console.log("stops", {
			stops: stops
		});
		var offset = 0;
		var completedOnes = 0;
		var routes = [];
		var th = this._startTimer();
		this.distanceUnit = google.maps.UnitSystem.IMPERIAL;
		if (this.getCurrentDistanceUnit() == ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM)
		{
			this.distanceUnit = google.maps.UnitSystem.METRIC;
		}
		var start = 0;
		var overlap = false;
		var complFct = function(response)
		{

			response.overlapPrevious = overlap;
			overlap = false;
			routes.push(response);
			if (dojo.config.fwm.debug == true)
			{
				console.log("total", offset, stops.length);
			}
			if (offset < stops.length)
			{
				start = offset;
				offset += this._routeLimits;
				if (offset >= stops.length)
				{
					offset = stops.length;
				}
				/**
				 * we need to connect route n with route n-1. Suppose we have
				 * limit of 2 stops and we got 3 stops, then we route 1 to 2 and
				 * 2 to 3.
				 */
				if (start > 0)
				{
					console.log("Using last stop from previous request", start, offset, (offset - start));
					start--;
					if ((offset - start) >= this._routeLimits)
					{
						offset--;
					}
					overlap = true;

				}
				var subStopsSet = stops.slice(start, offset);
				if (dojo.config.fwm.debug == true)
				{
					console.log("start", start, "end", offset, subStopsSet.length, subStopsSet[0], subStopsSet[subStopsSet.length - 1]);
				}
				this._calculateRoute(subStopsSet, dojo.hitch(this, complFct), errCb);
			}
			else
			{
				this._multipleRouteSuccess(routes, callback, errCb, stops);
				this._stopTimer(null, stops.length);
			}
			// }
		};

		offset += this._routeLimits;

		if (offset >= stops.length)
		{
			offset = stops.length;
		}
		th = this._startTimer();
		if (dojo.config.fwm.debug == true)
		{
			console.log("start", start, "end", offset, stops.slice(start, offset).length);
		}
		this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), errCb);

	},
	__convertMboToGmapsLatLng: function(mboInfo)
	{
		var latLng = null;
		if (mboInfo.hasOwnProperty("gisdata"))
		{
			if (mboInfo.gisdata.lat != null && mboInfo.gisdata.lng != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.gisdata.lat), parseFloat(mboInfo.gisdata.lng));
			}
			else if (mboInfo.autolocate != null && mboInfo.autolocate.gisdata != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.autolocate.gisdata.lat), parseFloat(mboInfo.autolocate.gisdata.lng));
			}
			else if (mboInfo.hasOwnProperty("lat") && mboInfo != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.lat), parseFloat(mboInfo.lng));
			}
			else
			{
				console.warn("Stop doesn't have gis coords", mboInfo);
			}
		}
		else
		{
			latLng = new google.maps.LatLng(parseFloat(mboInfo.lat), parseFloat(mboInfo.lng));
		}
		return latLng;

	},
	/**
	 * calculates one route.
	 * 
	 * @param stops
	 * @param callback
	 * @param errCb
	 */
	_calculateRoute: function(stops, callback, errCb)
	{

		var start = this.__convertMboToGmapsLatLng(stops[0]);

		var end = this.__convertMboToGmapsLatLng(stops[stops.length - 1]);

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,// always in km (meters
			// here)
			waypoints: []
		};

		request.avoidHighways = this.getAvoidHighways();
		request.avoidTolls = this.getAvoidTolls();

		for ( var i = 1; i < stops.length - 1; i++)
		{
			var stop = stops[i];

			var ll = this.__convertMboToGmapsLatLng(stop);// new
			// google.maps.LatLng(parseFloat(stop.lat),
			// parseFloat(stop.lng));
			var wp = {
				location: ll,
				stopover: true
			};
			request.waypoints.push(wp);
		}
		if (this.isOptimizeRoute())
		{
			request.optimizeWaypoints = true;// NOT sure what
			// to do with
			// this since
			// gmaps only
			// suppot 10 orr
			// 25 stops
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("Route request", request);
		}
		var th = this._startTimer();
		var me = this;
		this.directionsService.route(request, function(response, status)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("status", status);
				console.log("response", response);
			}
			me._stopTimer(th, stops.length);

			/**
			 * Google's status codes (the ones with & are supported by our api): &
			 * OK indicates the response contains a valid result. NOT_FOUND
			 * indicates at least one of the locations specified in the
			 * requests's origin, destination, or waypoints could not be
			 * geocoded. & ZERO_RESULTS indicates no route could be found
			 * between the origin and destination. MAX_WAYPOINTS_EXCEEDED
			 * indicates that too many waypoints were provided in the request
			 * The maximum allowed waypoints is 8, plus the origin, and
			 * destination. ( Google Maps API for Business customers may contain
			 * requests with up to 23 waypoints.) INVALID_REQUEST indicates that
			 * the provided request was invalid. & OVER_QUERY_LIMIT indicates
			 * the service has received too many requests from your application
			 * within the allowed time period. & REQUEST_DENIED indicates that
			 * the service denied use of the directions service by your
			 * application. & UNKNOWN_ERROR indicates a directions request could
			 * not be processed due to a server error. The request may succeed
			 * if you try again.
			 */
			if (status == google.maps.DirectionsStatus.OK)
			{
				if (callback)
				{
					callback(response);
				}
			}
			else
			{
				if (errCb)
				{
					switch (status)
					{
						case google.maps.DirectionsStatus.ZERO_RESULTS:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS, status);
							break;
						case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.OVER_LIMIT, status);
							break;
						case google.maps.DirectionsStatus.REQUEST_DENIED:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED, status);
							break;
						default:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN_ERROR, status);
							break;
					}

				}
			}
		});
	}
});
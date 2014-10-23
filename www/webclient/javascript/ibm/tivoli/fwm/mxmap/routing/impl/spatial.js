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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.spatial");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");
/**
 * Maximo spatial maps routing implementation.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.spatial", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	map: null,
	_stopSymbol: null,
	_routeSymbol: null,
	_spatialReference: null,
	_esriMap: null,
	_spatialReference: null,
	conf: null,
	_lastStop: null,
	_routeParams: null,
	_successCallback: null,
	_failureCallback: null,
	_routeLimits: 10,
	_oldWGS84Point: null,
	constructor: function(params)
	{
		console.log("Router esri", params);
		dojo.mixin(this, params);// will set conf and map
		this.directionsService = new esri.tasks.RouteTask(this.routeUrl);

		// setting stop symbols
		this._stopSymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
		this._stopSymbol.outline.setWidth(4);
		// setting route line symbols

		if (this.routecolor.indexOf("#") != 0)
		{
			this.routecolor = "#" + this.routecolor;
		}
		this._routeSymbol = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color()).setWidth(this.routeLineWidth);
		this._esriMap = this.map.getMapstraction().getProviderMap();
		this._spatialReference = this._esriMap.spatialReference;

	},
	/*
	 * Final route step, calls callback function with routeSummary params
	 */
	_onSolveRoute: function(routeSummary, callback)
	{
		if (callback)
		{
			callback(routeSummary);
		}
	},
	_routeFailed: function(error, errCb, errorCode)
	{

		console.log("route failed", error);
		if (errCb)
		{
			if (!errorCode)
			{
				errorCode = ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN;
			}
			errCb(errorCode, error);
		}
	},
	/**
	 * Based on a lat/lng it creates an esri geometry point.
	 * 
	 * @param lat
	 * @param lng
	 * @returns
	 */
	_createStop: function(lat, lng, text)
	{
		var mappoint = new esri.geometry.Point(lng, lat, this._spatialReference);

		var ss = new esri.symbol.TextSymbol(text).setColor(new dojo.Color([ 256, 0, 0 ])).setAlign(esri.symbol.Font.ALIGN_START).setFont(
				new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));
		var stop = new esri.Graphic(mappoint, ss);
		if (window.DEBUGLEVEL && window.DEBUGLEVEL > 1)
		{
			this.map.getMapstraction().getProviderMap().graphics.add(stop);
		}

		return stop;

	},

	/*
	 * prepare params in order to avoid any esri route limit.
	 */
	_prepareParams: function(start, offset, stops)
	{
		this._routeParams.stops = new esri.tasks.FeatureSet();
		console.info("offset", start, offset, "/", stops.length);
		for ( var i = start; i < offset; i++)
		{
			var stop = stops[i];
			var stopEsri = null;
			if (stop.hasOwnProperty("gisdata") == true)
			{
				var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});

				console.log("mbo SPATIAL? AUTOSPATIAL? stop", mxrec.hasSPATIALCoordinates(), mxrec.hasAutolocateSpatialData(), stop);

				if (mxrec.hasSPATIALCoordinates())
				{
					var point = this.map.getPointFromMboInfo(mxrec.mboInfo);
					stopEsri = this._createStop(point.lat, point.lng, i);
				}
				else if (mxrec.hasGISCoordinates())
				{
					stopEsri = this._createStop(stop.gisdata.lat, stop.gisdata.lng, i);
				}
				else if (mxrec.hasAutolocateSpatialData())
				{
					var point = this.map.getPointFromMboInfo(mxrec.mboInfo.autolocate);
					stopEsri = this._createStop(point.lat, point.lng, i);
				}
				else if (mxrec.hasAutolocateGISCoordinates())
				{
					stopEsri = this._createStop(stop.autolocate.gisdata.lat, stop.autolocate.gisdata.lng, i);
				}
				else
				{
					console.warn("Stop doesn't have gis coords", stop);
				}
			}

			else
			{
				console.log("stop is calculated", stop);
				if (stop.lat == null)
				{
					console.error("stop does not have lat/lng", stop);
				}
				else
				{
					stopEsri = this._createStop(stop.lat, stop.lng, i);
				}
			}

			this._routeParams.stops.features.push(stopEsri);
		}

	},
	/**
	 * converst a si
	 */
	_getStops2LatLng: function(stops)
	{
		var lls = [];
		for ( var index = 0; index < stops.length; index++)
		{
			lls.push(new mxn.LatLonPoint(stops[index].lat, stops[index].lng));
		}
		return lls;
	},
	/**
	 * Executes the routing on esri maps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	showRoute: function(stops, successCb, failCb)
	{
		// first step, check if any stop is a FEATURE CLASS if so need to get
		// it's X/Y from server
		if (this._checkIfAnyFeaturedClass(stops) == true)
		{
			var fct = function()
			{
				this._showRouteAllPointsWithXY(stops, successCb, failCb);
			};
			this._convertAnyFeatureStop(stops, dojo.hitch(this, fct), failCb);
		}
		else
		{
			console.log("ALL Features have XY");
			this._showRouteAllPointsWithXY(stops, successCb, failCb);
		}

	},
	_convertAnyFeatureStop: function(stops, callback, errCallback)
	{
		

		var stopsToConvert = [];
		for ( var j = 0; j < stops.length; j++)
		{
			var stop = stops[j];
			if (stop.calculatedStop == null)
			{
				var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});
				if (mxrec.hasSPATIALCoordinates() == true)
				{
					stopsToConvert.push(stop);
				}
				else if (mxrec.hasAutolocateSpatialData())
				{
					stopsToConvert.push(stop.autolocate);
				}
				else
				{
					console.warn("no SPATIAL GIS info for stop ", stop);
				}

			}
		}
		var test = function(args)
		{
			callback();
		};
		this.map.queryMultipleRecordsAtOnce(stopsToConvert, test, errCallback);
		/*
		 * var stop = stops[i]; while (stop.calculatedStop == true ||
		 * stops.length == i) { i++; stop = stops[i]; }
		 * 
		 * var convertedFC = function(args) { if (args != null && stop != null) {
		 * 
		 * console.log("args", args);
		 * 
		 * if (!args.features || !args.features[0]) { var error = {
		 * errormessage: "Cannot find geomery for feature", stop: stop }; if
		 * (errCallback) { errCallback(error); } else {
		 * console.error(errCallback); } return; } // need this to update mbo
		 * data var point = this.map._updateMboInfo(stop, args);
		 * 
		 * var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({ mboInfo: stop, map:
		 * this.map });
		 * 
		 * i++; stop = stops[i]; }
		 * 
		 * while (i < stops.length && (stop.gisdata.PLUSSISGIS != true &&
		 * (stop.autolocate == null || stop.autolocate.gisdata.PLUSSISGIS ==
		 * false))) { i++; stop = stops[i]; }
		 * 
		 * console.log("stop", stop, i, stops.length);
		 * 
		 * if (stops.length <= i) { callback(); } else { var mxrec = new
		 * ibm.tivoli.fwm.mxmap.MXRecord({ mboInfo: stop, map: this.map }); if
		 * (mxrec.hasSPATIALCoordinates() == true) {
		 * this.map._queryMapsServiceForMboGeometry(stop, dojo.hitch(this,
		 * convertedFC), errCallback); } else { if
		 * (mxrec.hasAutolocateSpatialData()) {
		 * this.map._queryMapsServiceForMboGeometry(stop.autolocate,
		 * dojo.hitch(this, convertedFC), errCallback); } else {
		 * console.warn("no GIS info for stop ", stop); } }
		 *  }
		 *  };
		 * 
		 * var d = dojo.hitch(this, convertedFC); d();
		 */
	},// maybe merge it in maximospatial.js
	_checkIfAnyFeaturedClass: function(stops)
	{
		for ( var i in stops)
		{
			var stop = stops[i];
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});

			if (mxrec.hasSPATIALCoordinates() || (mxrec.hasGISCoordinates() == false && mxrec.hasAutolocateSpatialData() == true))
			{
				return true;
			}
		}
	},
	_retrieveStopInfo: function(pt, mboInfo, legIndex, itinerary, geocodeCache)
	{
		var txt = "";
		if (mboInfo.mxdata != null && mboInfo.mxdata.attributes != null && mboInfo.mxdata.attributes.formattedaddress != null && mboInfo.mxdata.attributes.formattedaddress.length > 0)
		{
			geocodeCache[pt] = mboInfo.mxdata.attributes.formattedaddress;
			txt = geocodeCache[pt];
		}
		else
		{
			// geocode it
			var legIndex = itinerary.legs.length;
			var fctSuccess = function(location)
			{
				var address = location[0].formattedAddress;
				if (legIndex >= 0)
				{
					itinerary.legs[legIndex].info = address;
				}
				else
				{
					itinerary.initialLocation.info = address;
				}
				geocodeCache[pt] = address;
			};
			var fctError = function(error)
			{
				console.error("could not find leg ", legIndex, "info");
			};
			this.map.geocoder.reverseGeocode(pt.lat, pt.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));

		}
		return txt;

	},
	_getLatLngFromStop: function(mboInfo)
	{
		var pt = {};
		if (mboInfo.calculatedStop == true)
		{
			pt.lat = mboInfo.lat;
			pt.lng = mboInfo.lng;
		}
		else
		{
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: mboInfo,
				map: this.map
			});
			console.log("mxrec", mxrec.hasGISCoordinates(), mxrec.hasAutolocateGISOnlyCoordinates());
			if (mxrec.hasAutolocateGISOnlyCoordinates())
			{
				pt.lat = mboInfo.autolocate.gisdata.lat;
				pt.lng = mboInfo.autolocate.gisdata.lng;
			}
			else
			{
				pt.lat = mboInfo.gisdata.lat;
				pt.lng = mboInfo.gisdata.lng;
			}
		}
		return pt;
	},

	_showRouteAllPointsWithXY: function(stops, successCb, failCb)
	{

		this._routeParams = new esri.tasks.RouteParameters();
		if (dojo.config.fwm.debug == true)
		{
			console.info("stops", stops.length, {
				stops: stops
			});
		}

		this._routeParams.outSpatialReference = new esri.SpatialReference({
			wkid: this._spatialReference
		});

		this._routeParams.returnDirections = true;
		if (this.isOptimizeRoute())
		{
			// makes optimization but does not change 1st and last stops
			this._routeParams.findBestSequence = true;
			this._routeParams.preserveFirstStop = true;
			this._routeParams.preserveLastStop = true;

		}
		this._routeParams.directionsLengthUnits = "esriKilometers";// Always in
		// km

		this._routeParams.returnRoutes = true;
		this._routeParams.returnStops = true;
		var offset = 0;
		var routeSummary = {
			totalDuration: 0,
			totalDistance: 0,
			stops: [],
			legsData: null,
			polyline: null,
			copyrights: "",
			map: this.map
		};
		var polylinePoints = [];
		var th = this._startTimer();
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var start = 0;
		var successFct = function(solveResult)
		{
			console.log("solveResult", solveResult);
			this._stopTimer(th, stops.length);
			if (solveResult.messages && solveResult.messages.length > 0)
			{
				// not sure what to do.. the routing task never fails, just add
				// messages to the solve result AND documentation is still TBA
				// :(
				// http://help.arcgis.com/en/webapi/javascript/arcgis/help/jsapi/routetask.htm#onSolveComplete
				console.warn("Route service returend the following messages :");
				for ( var i = 0; i < solveResult.messages.length; i++)
				{
					var msg = solveResult.messages[i];
					console.warn(msg.description, msg);
				}
				if (msg.type == 50)
				{
					this._routeFailed(msg, failCb, ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS);
					return;
				}
			}
			var directions = solveResult.routeResults[0].directions;

			var steps = [];
			var c = 1;
			var legDistance = 0.0;
			var legDuration = 0.0;
			var flagEndStart = false;

			console.log("total route stops", solveResult.routeResults[0].directions.features.length);
			for ( var i in solveResult.routeResults[0].directions.features)
			{
				var feature = solveResult.routeResults[0].directions.features[i];

				var step = {
					distance: feature.attributes.length,
					duration: feature.attributes.time,
					info: feature.attributes.text,
					location: this.map._getLatLngFromFeature(feature)
				};
				steps.push(step);
				legDistance += feature.attributes.length;
				legDuration += feature.attributes.time;
				// check if this i the last step of a leg
				if (flagEndStart == true && feature.attributes.length == 0)
				{
					console.log("Ok leg completed ", legDuration);
					var pt = this.map._getLatLngFromFeature(feature);

					var txt = feature.attributes.text;
					console.log("legs ", itinerary.legs.length, stops[itinerary.legs.length + 1]);

					var lpos = itinerary.addLeg(pt, txt, legDistance, legDuration, null, steps, null);
					var sInfo = stops[lpos + 1];
					var needsToGeocode = true;
					if (sInfo.mxdata)
					{
						var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
							mboInfo: sInfo,
							map: this.map
						});
						if (mxrec.hasGISCoordinates() == true || mxrec.hasSPATIALCoordinates() == true)
						{
							if (mxrec.hasAddress() == true)
							{
								needsToGeocode = false;
								itinerary.legs[lpos].info = mxrec.mboInfo.gisdata.address;
							}
						}
						else if (mxrec.hasAutolocateGISOnlyCoordinates() == true || mxrec.hasAutolocateSpatialData() == true)
						{
							var autolocateMboInfo = sInfo.autolocate;
							if (autolocateMboInfo.gisdata.address != null && autolocateMboInfo.gisdata.address.length > 0)
							{
								needsToGeocode = false;
								itinerary.legs[lpos].info = autolocateMboInfo.gisdata.address;
							}
						}
					}
					itinerary.legs[lpos].needsToGeocode = needsToGeocode;

					steps = [];
					legDistance = 0;
					legDuration = 0;
					c++;
					flagEndStart = false;

				}
				else if (flagEndStart == false && feature.attributes.length == 0)
				{
					flagEndStart = true;
				}
			}

			if (start == 0)
			{
				var geom = solveResult.routeResults[0].directions.features[0].geometry;
				var pt = this.map._getLatLngFromFeature(solveResult.routeResults[0].directions.features[0]);
				var txt = solveResult.routeResults[0].directions.features[0].attributes.text;
				itinerary.setInitialLocation(txt, pt, null, null, true);

			}
			// add this esriroute polyline to the main route polyline points
			// array;
			var pol = new mxn.Polyline();
			pol.fromProprietary(this.map.getMapstraction().api, directions.mergedGeometry);
			polylinePoints = polylinePoints.concat(pol.points);

			// sum total distance and time
			routeSummary.totalDistance += directions.totalLength;
			routeSummary.totalDuration += directions.totalTime;

			// if we still have stops to be added
			if (offset < stops.length)
			{
				start = offset - 1;
				offset = offset + this._routeLimits;
				if (offset > stops.length)
				{
					offset = stops.length;
				}
				if ((offset - start) >= this._routeLimits)
				{
					offset--;
				}
				this._prepareParams(start, offset, stops);
				th = this._startTimer(th, stops.length);
				var errorFctAux = function(error)
				{
					this._routeFailed(error, failCb);
				};
				this.directionsService.solve(this._routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));

			}
			else
			{
				routeSummary.itinerary = itinerary;
				routeSummary.inputInfo = {
					stops: stops,
					successCb: successCb,
					errorCb: failCb
				};
				routeSummary.originalRouter = this;
				routeSummary.distanceUnit = this.getCurrentDistanceUnit();
				// all route stops were calculated
				var poly = new mxn.Polyline(polylinePoints);
				poly.addData({
					color: this.routecolor,
					opacity: this.routeOpacity,
					width: this.routeLineWidth
				});
				routeSummary.polyline = poly;
				routeSummary.stops = this._getStops2LatLng(stops);

				var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routeSummary);
				routeInfo.setSupportAvoidToll(false);
				routeInfo.setSupportAvoidHighway(false);

				this._onSolveRoute(routeInfo, successCb);
				if (dojo.config.fwm.debug == true)
				{
					console.info("stopsEnd", {
						stops: stops
					});
				}
				this._stopTimer(null, stops.length);
			}

		};

		if (stops.length > this._routeLimits)
		{

			offset = offset + this._routeLimits;
		}
		else
		{
			offset = stops.length;
		}

		this._prepareParams(start, offset, stops);

		if (this._routeParams.stops.features.length >= 2)
		{
			var errorFctAux = function(error)
			{
				this._routeFailed(error, failCb);
			};
			this.directionsService.solve(this._routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));
			// this._lastStop = this._routeParams.stops.features.splice(0,
			// 1)[0];
		}

	},
	/**
	 * This intercepts the user location call and converts it to spatial
	 * coordinate system.
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
			var success = function()
			{
				this._convertToSpatialCoordSystem(callback);
			};

			this.myCurrentLocationInstance.getUserLocation(dojo.hitch(this, success), dojo.hitch(this, errorCallback));
		}
	},
	_convertToSpatialCoordSystem: function(callback)
	{
		var storeConvertedPoint = function(point)
		{
			this.myCurrentLocationInstance._esriSRLatLng = point;
			this.myCurrentLocationInstance._oldWGS84Point = this.myCurrentLocationInstance.getPosition();
			if (callback)
			{
				callback();
			}
		};
		this.myCurrentLocationInstance.convertPositionToMapPoint(this.map, dojo.hitch(this, storeConvertedPoint));
	},
	_isESRIUpToDate: function()
	{
		var currPosition = this.myCurrentLocationInstance.getPosition();
		var esriRefPoint = this.myCurrentLocationInstance._oldWGS84Point;
		if (esriRefPoint == null)
		{
			this._convertToSpatialCoordSystem();
			return false;
		}
		if (currPosition.coords != esriRefPoint.coords)
		{
			this._convertToSpatialCoordSystem();
			return false;
		}
		return true;
	},
	/**
	 * we must convert the w3c position into the same map spatial reference.
	 */
	_getUserLocationStop: function()
	{
		return this.myCurrentLocationInstance._esriSRLatLng;
	},
	isLocationStatusUnassigned: function()
	{
		if (this.myCurrentLocationInstance.isStatusHasLocation())
		{
			return !this.isLocationStatusHasLocation();
		}
		return this.inherited(arguments);
	},
	isLocationStatusHasLocation: function()
	{
		if (this.myCurrentLocationInstance.isStatusHasLocation())
		{
			return this._isESRIUpToDate();
		}
		return this.inherited(arguments);

	}

});
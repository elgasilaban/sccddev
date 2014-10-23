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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.RouterFactory");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
/**
 * Manage multiple routes.<br>
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager", ibm.tivoli.fwm.mxmap._Base, {
	routeConf: null,
	provider: null,
	map: null,
	routeUrl: null,
	routingData: null,
	routes: null,
	visible: true,

	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.factory = new ibm.tivoli.fwm.mxmap.routing.RouterFactory({
			map: this.map,
			provider: this.provider
		});
		this.routeConf.routeUrl = this.routeUrl;
		this.routes = [];
	},
	createRoute: function(stops, config, callback, errcallback, noZoom)
	{
		var routeConf = {
			routecolor: config.routecolor,
			routeOpacity: 0.5,
			routeLineWidth: 5,
			endLocation: config.end,
			startLocation: config.start,
			optimizeroute: config.optimizeroute,
			startwithcurrentlocation: config.startwithcurrentlocation,
			routeUrl: config.routeUrl,
			map: this.map
		};

		var router = this.factory.createRouter(routeConf);
		router.customConf = this.customConf;

		var fct = function(route)
		{
			route.id = this.routes.length;
			this.routes.push(route);
			route.setLineVisible(this.visible);
			route.show();
			if (noZoom != true)
			{
				route.zoomToRoute();
				console.log("zooming to single route!");
			}
			if (callback)
			{
				callback(route);
			}
		};

		if (!errcallback)
		{
			errcallback = dojo.hitch(this, this.routingError);
		}

		router.drawRoute(stops, dojo.hitch(this, fct), errcallback, routeConf);
	},
	customConf: null,
	reGenerate: function(route, customConf, callback, errorCallback)
	{
		this.customConf = customConf;
		if (dojo.config.fwm.debug == true)
		{
			console.log("route id " + route.id);
		}
		route.originalRouter.customConf = customConf;

		route.originalRouter.drawRoute(route.inputInfo.stops, callback, errorCallback);
		// this.createRoute(conf.stops,conf.successCb,conf.errorCb);
	},
	replaceRoute: function(route, id)
	{
		this.removeRoute(this.routes[id]);
		this.routes[id] = route;
		route.id = id;
	},
	removeRoute: function(route)
	{
		route.clear();
	},
	clearAll: function()
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Clearing all route information");
		}
		while (this.routes.length > 0)
		{
			this.routes.pop().clear();
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Done");
		}
	},
	redrawAll: function()
	{
		dojo.forEach(this.routes, function(route)
		{
			route.redraw();
		});
	},
	setLineVisible: function(visible)
	{
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(visible);
		});
	},
	hideRoutesAndCalculatedMarkers: function()
	{
		this.visible = false;
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(false);
			route.hideCalculatedMarkers();
		});
	},
	showRoutesAndCalculatedMarkers: function()
	{
		this.visible = true;
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(true);
			route.showCalculatedMarkers();
		});
	},
	// _addItinerary: function(route)
	// {},
	centerAndZoom: function()
	{
		this.zoomAndCenterOverAll();
	},
	zoomAndCenterOverAll: function()
	{
		if (this.routes.length > 0)
		{

			var bounds = this.routes[0].getBounds();
			for ( var i = 1; i < this.routes.length; i++)
			{
				var r = this.routes[i];

				bounds.merge(r.getBounds());
			}

			this.map.getMapstraction().setBounds(bounds);
		}
		else
		{
			console.warn("[MultipleRoutesManager] No routes to center on");
		}
	},
	routingError: function(statusCode, error)
	{

		var maximo = this.map.getMaximo();
		switch (statusCode)
		{

			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ:
				maximo.showMessage("mapserver", "route_min_stops_failure");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS:
				maximo.showMessage("mapserver", "route_zero_results");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.INVALID_REQUEST:
				maximo.showMessage("mapserver", "route_invalid_request");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED:
				maximo.showMessage("mapserver", "route_request_denied");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.OVER_LIMIT:
				maximo.showMessage("mapserver", "route_over_limit");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.TIMEOUT:
				maximo.showMessage("mapserver", "route_timeout");
				break;

			default:
				var msg = error;
				if (error && error.message)
				{
					msg = error.message;
				}
				maximo.showMessage("mapserver", "route_unknown_failure", [ msg ]);
				break;
		}

	},
	destroyRecursive: function()
	{
		if (this.router)
		{
			this.router.destroyRecursive();
		}
		this.inherited(arguments);
	},
	getItinerary: function()
	{
		return this.routes[0].itinerary;
	}

});
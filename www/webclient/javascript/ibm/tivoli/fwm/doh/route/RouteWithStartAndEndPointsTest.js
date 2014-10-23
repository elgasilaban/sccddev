dojo.provide("ibm.tivoli.fwm.doh.route.RouteWithStartAndEndPointsTest");

dojo.require("ibm.tivoli.fwm.doh.route._RouteTest");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.route.RouteWithStartAndEndPointsTest", [ ibm.tivoli.fwm.doh.route._RouteTest ], {

	constructor: function(params)
	{
		dojo.mixin(this, params);
		// The createRoute() call must not fail because the route is valid
		this.mustFail = false;
		this.name = "Testing the creation of a route when start and end points are set";
	},
	
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{
			// This variable contains the json of a valid 2-point route.
			var stops = ibm.tivoli.fwm.doh.ConfigHelper.validRoute.stops;
			// Try to create the route and wait for either the _successCallback() or the _failCallback() to fire.
			dojo.hitch(this, this._validateSuccessRoute(map, stops));
		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
		return this.deferredObj;
	},
	prepareConfData: function()
	{
		// routeConf with start and end points
		this.confHelper.conf.routeConf = this.confHelper.getRouteConfWithStartAndEnd();
	}

});


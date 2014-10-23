dojo.provide("ibm.tivoli.fwm.doh.route.RouteWithOnlyOneStopTest");

dojo.require("ibm.tivoli.fwm.doh.route._RouteTest");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.route.RouteWithOnlyOneStopTest", [ ibm.tivoli.fwm.doh.route._RouteTest ], {

	constructor: function(params)
	{
		dojo.mixin(this, params);
		// The createRoute() call must fail because the route is invalid
		this.mustFail = true;
		this.name = "Testing the creation of a route with only one stop";
	},
	
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{	
			// This variable contains the json of an invalid route with only 1 stop.
			var stops = ibm.tivoli.fwm.doh.ConfigHelper.routeWithOnlyOneStop.stops;
			// Try to create the route and wait for either the _successCallback() or the _failCallback() to fire
			dojo.hitch(this, this._validateSuccessRoute(map, stops));
		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
		return this.deferredObj;
	}
});


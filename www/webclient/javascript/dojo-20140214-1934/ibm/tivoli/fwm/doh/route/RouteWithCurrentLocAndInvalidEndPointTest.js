//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/route/RouteWithCurrentLocAndInvalidEndPointTest", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/route/_RouteTest,ibm/tivoli/fwm/mxmap/routing/Router,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.route.RouteWithCurrentLocAndInvalidEndPointTest");

dojo.require("ibm.tivoli.fwm.doh.route._RouteTest");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.route.RouteWithCurrentLocAndInvalidEndPointTest", [ ibm.tivoli.fwm.doh.route._RouteTest ], {

	constructor: function(params)
	{
		dojo.mixin(this, params);
		// The createRoute() call must fail because the end point is invalid.
		this.mustFail = true;
		this.name = "Testing the creation of a route using the current location and an invalid end point in the configuration";
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
	
	_successCallback: function(e){
		// The createRoute() call must fail in this test but we also need to make sure that it fails with
		// the correct error core, which is ZERO_RESULTS.
		if(e == ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS){
			this.deferredObj.callback(true);
		} else {
			this.deferredObj.errback(e);
		}
	},
	
	prepareConfData: function()
	{
		// routeConf with start and end points
		this.confHelper.conf.routeConf = this.confHelper.getRouteConfWithCurrLocAndInvalidEndPoint();
	}

});


});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/route/RouteWithInvalidStopTest", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/route/_RouteTest,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.route.RouteWithInvalidStopTest");

dojo.require("ibm.tivoli.fwm.doh.route._RouteTest");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.route.RouteWithInvalidStopTest", [ ibm.tivoli.fwm.doh.route._RouteTest ], {

	constructor: function(params)
	{
		dojo.mixin(this, params);
		// The createRoute() call must fail because the route is invalid.
		this.mustFail = true;
		this.name = "Testing the creation of a route with an invalid stop";
	},
	
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{	
			// This variable contains the json of a route with 2 valid stops and an invalid one.
			var stops = ibm.tivoli.fwm.doh.ConfigHelper.routeWithInvalidStop.stops;
			// Try to create the route and wait for either the _successCallback() or the _failCallback() to fire.
			dojo.hitch(this, this._validateSuccessRoute(map, stops));
		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
		return this.deferredObj;
	}
});




});

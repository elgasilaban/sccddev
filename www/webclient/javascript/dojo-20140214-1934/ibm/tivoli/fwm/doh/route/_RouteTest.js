//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/route/_RouteTest", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.route._RouteTest");

dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.route._RouteTest", [ ibm.tivoli.fwm.doh._MapTests ], {
	name: null,

	mainRecord: null,

	timeout: 60000,
	
	// This variable tells the test whether we expect it to fail or not.
	// It must be set to true if the purpose of the test is to, say, pass in invalid data and check if the proper error handling is being triggered.    
	mustFail: null,

	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	
	runMapTest: function(nativeMap, mapId, map /*map & mapstraction*/)
	{
		console.error("runMapTest must be implemented");
		this.deferredObj.errback("runMapTest must be implemented");
	},

	_validateSuccessRoute: function(map, stops){
		// Get the default route configuration
		var config = this.confHelper.conf.routeConf;

		// Assume that the createRoute() call must not fail by default.
		var successCallbackFunction = this._successCallback;
		var failCallbackFunction = this._failCallback;
		
		// If the createRoute() call is supposed to fail, invert the success and fail callback functions.
		if(this.mustFail == true){
			successCallbackFunction = this._failCallback;
			failCallbackFunction = this._successCallback;
		}
		// Try to create the route
		map.routeManager.createRoute(stops, config, dojo.hitch(this, successCallbackFunction), dojo.hitch(this, failCallbackFunction));
	},

	_successCallback: function(){
		this.deferredObj.callback(true);
	},

	_failCallback: function(e){
		this.deferredObj.errback(e);
	},
	
	prepareConfData: function()
	{
		// There are neither start nor end points by default.
		this.confHelper.conf.routeConf = this.confHelper.getDefaultRouteConf();
	}
});


});

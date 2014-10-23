//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/route/RouteUnitTests", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/route/_RouteTest,ibm/tivoli/fwm/doh/route/ValidRouteTest,ibm/tivoli/fwm/doh/route/RouteWithOnlyOneStopTest,ibm/tivoli/fwm/doh/route/RouteWithInvalidStopTest,ibm/tivoli/fwm/doh/route/RouteWithStartAndEndPointsTest,ibm/tivoli/fwm/doh/route/RouteWithCurrentLocAndInvalidEndPointTest,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.route.RouteUnitTests");

dojo.require("ibm.tivoli.fwm.doh.route._RouteTest");
dojo.require("ibm.tivoli.fwm.doh.route.ValidRouteTest");
dojo.require("ibm.tivoli.fwm.doh.route.RouteWithOnlyOneStopTest");
dojo.require("ibm.tivoli.fwm.doh.route.RouteWithInvalidStopTest");
dojo.require("ibm.tivoli.fwm.doh.route.RouteWithStartAndEndPointsTest");
dojo.require("ibm.tivoli.fwm.doh.route.RouteWithCurrentLocAndInvalidEndPointTest");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');
/**
 * Route unit test module
 */
var PROVIDERNAMES = ibm.tivoli.fwm.doh.ConfigData.maps;

for ( var mapProvId = 0; mapProvId < PROVIDERNAMES.length; mapProvId++)
{
	var mapProvider = PROVIDERNAMES[mapProvId];
	ibm.tivoli.fwm.doh.ConfigHelper.provider = mapProvider;
	var mapProviderConf = {
		mapProvider: mapProvider
	};
	doh.register("RouteUnitTests " + mapProvider, [ 
       new ibm.tivoli.fwm.doh.route.ValidRouteTest(mapProviderConf),
	   new ibm.tivoli.fwm.doh.route.RouteWithOnlyOneStopTest(mapProviderConf),
	   new ibm.tivoli.fwm.doh.route.RouteWithInvalidStopTest(mapProviderConf), 
	   new ibm.tivoli.fwm.doh.route.RouteWithStartAndEndPointsTest(mapProviderConf), 
	   new ibm.tivoli.fwm.doh.route.RouteWithCurrentLocAndInvalidEndPointTest(mapProviderConf) 
    ]);
}

});

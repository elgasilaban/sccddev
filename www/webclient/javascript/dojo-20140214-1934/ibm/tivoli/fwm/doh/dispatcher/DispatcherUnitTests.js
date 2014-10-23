//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/dispatcher/DispatcherUnitTests", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/dispatcher/DrawRoutes,ibm/tivoli/fwm/doh/dispatcher/DrawRoutesSaveTravelTime,ibm/tivoli/fwm/doh/dispatcher/SeveralRouteRequests,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.dispatcher.DispatcherUnitTests");
dojo.require("ibm.tivoli.fwm.doh.dispatcher.DrawRoutes"); 
dojo.require("ibm.tivoli.fwm.doh.dispatcher.DrawRoutesSaveTravelTime");
dojo.require("ibm.tivoli.fwm.doh.dispatcher.SeveralRouteRequests");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');
/**
 * Zoom to data input unit test module
 */
var PROVIDERNAMES = ibm.tivoli.fwm.doh.ConfigData.maps;

for ( var mapProvId = 0; mapProvId < PROVIDERNAMES.length; mapProvId++)
{
	var mapProvider = PROVIDERNAMES[mapProvId];
	ibm.tivoli.fwm.doh.ConfigHelper.provider = mapProvider;
	var mapProviderConf = {
		mapProvider: mapProvider
	};
	doh.register("DispatcherUnitTests " + mapProvider, [ 
			new ibm.tivoli.fwm.doh.dispatcher.DrawRoutes(mapProviderConf),
			new ibm.tivoli.fwm.doh.dispatcher.DrawRoutesSaveTravelTime(mapProviderConf),
			new ibm.tivoli.fwm.doh.dispatcher.SeveralRouteRequests(mapProviderConf)
	]);
}

});

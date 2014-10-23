//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/zoom/ZoomToDataInputUnitTests", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/zoom/Zooms,ibm/tivoli/fwm/doh/zoom/InitialLoc,ibm/tivoli/fwm/doh/zoom/CurrMbo,ibm/tivoli/fwm/doh/zoom/AutolocateCurrMbo,ibm/tivoli/fwm/doh/zoom/CurrMboSet,ibm/tivoli/fwm/doh/zoom/LinkedCurrMbo,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.zoom.ZoomToDataInputUnitTests");
dojo.require("ibm.tivoli.fwm.doh.zoom.Zooms");
dojo.require("ibm.tivoli.fwm.doh.zoom.InitialLoc");
dojo.require("ibm.tivoli.fwm.doh.zoom.CurrMbo");
dojo.require("ibm.tivoli.fwm.doh.zoom.AutolocateCurrMbo");
dojo.require("ibm.tivoli.fwm.doh.zoom.CurrMboSet");
dojo.require("ibm.tivoli.fwm.doh.zoom.LinkedCurrMbo"); 
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
	doh.register("ZoomToDataInputUnitTests " + mapProvider, [ 
			new ibm.tivoli.fwm.doh.zoom.Zooms(mapProviderConf),
			new ibm.tivoli.fwm.doh.zoom.InitialLoc(mapProviderConf),
			new ibm.tivoli.fwm.doh.zoom.CurrMbo(mapProviderConf),
			new ibm.tivoli.fwm.doh.zoom.AutolocateCurrMbo(mapProviderConf),
			new ibm.tivoli.fwm.doh.zoom.CurrMboSet(mapProviderConf),
			new ibm.tivoli.fwm.doh.zoom.LinkedCurrMbo(mapProviderConf)

	]);
}

});

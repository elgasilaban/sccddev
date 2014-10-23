//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/symbology/SymbologyUnitTests", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/symbology/Symbology,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.symbology.SymbologyUnitTests");

dojo.require("ibm.tivoli.fwm.doh.symbology.Symbology");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');
/**
 * Symbology unit test module
 */
var PROVIDERNAMES = ibm.tivoli.fwm.doh.ConfigData.maps;

for ( var mapProvId = 0; mapProvId < PROVIDERNAMES.length; mapProvId++)
{
	var mapProvider = PROVIDERNAMES[mapProvId];
	ibm.tivoli.fwm.doh.ConfigHelper.provider = mapProvider;
	var mapProviderConf = {
		mapProvider: mapProvider
	};
	doh.register("SymbologyUnitTests " + mapProvider, [ 
       new ibm.tivoli.fwm.doh.symbology.Symbology(mapProviderConf),
    ]);
}

});

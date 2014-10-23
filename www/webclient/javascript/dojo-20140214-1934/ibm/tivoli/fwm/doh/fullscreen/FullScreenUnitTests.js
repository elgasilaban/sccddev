//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/fullscreen/FullScreenUnitTests", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/fullscreen/FullScreen,ibm/tivoli/fwm/doh/fullscreen/StartedWithFullScreenOn,ibm/tivoli/fwm/doh/fullscreen/StartedWithFullScreenOffAndChanged,ibm/tivoli/fwm/doh/fullscreen/StartedWithFullScreenOffAndChangedTwice,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.fullscreen.FullScreenUnitTests");

dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOn");
dojo.require("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged");
dojo.require("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');

/**
 * Map Full Screen Unit Tests
 */
var PROVIDERNAMES = ibm.tivoli.fwm.doh.ConfigData.maps;

for (var providerIndex in PROVIDERNAMES)
{
	var mapProvider = PROVIDERNAMES[providerIndex];
	ibm.tivoli.fwm.doh.ConfigHelper.provider = mapProvider;
	var mapProviderConf = { mapProvider: mapProvider };
	doh.register(
					"FullScreenUnitTests " + mapProvider,
					[
							new ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOn(
									mapProviderConf),
							new ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged(
									mapProviderConf),
							new ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice(
									mapProviderConf)

					]);
}

});

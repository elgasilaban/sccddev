//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/zoom/InitialLoc", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/zoom/Zooms,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.require("ibm.tivoli.fwm.doh.zoom.Zooms");
dojo.provide("ibm.tivoli.fwm.doh.zoom.InitialLoc");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.InitialLoc", [ ibm.tivoli.fwm.doh.zoom.Zooms ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "Mbo with no GIS data, no previous extent so set configured initial location";
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation = this.confHelper.getDefaultLocation();
		this.confHelper.conf.mapConf.currentMbo =  this.confHelper.getDefaultCurrMbo();
	},
	_validate: function(map)
	{
		var actualExtent = map.getCenter();
		actualExtent.level = map.getZoom();
		ibm.tivoli.fwm.doh.gisdoh.assertLocation( this.confHelper.getDefaultLocation(), actualExtent);
		this.deferredObj.callback(true);
	}
});

});

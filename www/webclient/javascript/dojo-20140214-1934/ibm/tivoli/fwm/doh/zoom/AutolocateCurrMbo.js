//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/zoom/AutolocateCurrMbo", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/zoom/CurrMbo,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.zoom.AutolocateCurrMbo");
dojo.require("ibm.tivoli.fwm.doh.zoom.CurrMbo");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.AutolocateCurrMbo", [ ibm.tivoli.fwm.doh.zoom.CurrMbo ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "CurrMbo with Autolocated GIS data, taking precedence";
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation = this.confHelper.getDefaultLocation();
		this.mainRecord = this.confHelper.getAutolocatedCurrMbo();
		this.confHelper.conf.mapConf.currentMbo = this.mainRecord;
	},
	_validate: function(map)
	{
		var actualExtent = map.getCenter();
		actualExtent.level = map.getZoom();
		var expected = {
			lat: this.mainRecord.autolocate.gisdata.lat,
			lng: this.mainRecord.autolocate.gisdata.lng,
			level: map.getZoom()
		};

		ibm.tivoli.fwm.doh.gisdoh.assertLocation(expected, actualExtent);
		this.deferredObj.callback(true);
	}
	
});

});

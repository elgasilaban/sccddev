//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/zoom/CurrMbo", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/zoom/Zooms,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.require("ibm.tivoli.fwm.doh.zoom.Zooms");
dojo.provide("ibm.tivoli.fwm.doh.zoom.CurrMbo");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.CurrMbo", [ ibm.tivoli.fwm.doh.zoom.Zooms ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "CurrMbo with GIS data, taking precedence";
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation = this.confHelper.getDefaultLocation();
		this.mainRecord = this.confHelper.getDefaultCurrMbo();
		this.mainRecord.gisdata = this.confHelper.getDefautGisData();
		this.confHelper.conf.mapConf.currentMbo = this.mainRecord;
	},
	_validate: function(map)
	{
		
		var actualExtent = map.getCenter();
		actualExtent.level = map.getZoom();
		var expected = {
			lat: this.mainRecord.gisdata.lat,
			lng: this.mainRecord.gisdata.lng,
			level: map.getZoom()
		};

		ibm.tivoli.fwm.doh.gisdoh.assertLocation(expected, actualExtent);
		this.deferredObj.callback(true);
	}
});

});

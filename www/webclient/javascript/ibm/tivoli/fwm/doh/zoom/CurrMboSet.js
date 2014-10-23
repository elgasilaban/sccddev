dojo.require("ibm.tivoli.fwm.doh.zoom.Zooms");
dojo.provide("ibm.tivoli.fwm.doh.zoom.CurrMboSet");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.CurrMboSet", [ ibm.tivoli.fwm.doh.zoom.Zooms ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "MboSet with GIS data, taking precedence";
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation =  this.confHelper.getDefaultLocation();
		this.records =  this.confHelper.getDefaultMboSet();
		this.confHelper.conf.mapConf.records = this.records;
	},

	_validate: function(map)
	{

		var mapBounds = map.getBounds();
		
		for ( var index = 0; index < this.records.length; index++)
		{
			var rec = this.records[index];
			doh.assertTrue(mapBounds.sw.lat < rec.gisdata.lat, "Map's southwest latitude (" + mapBounds.sw.lat + ") is higher than record latitude " + rec.gisdata.lat);
			doh.assertTrue(mapBounds.ne.lat > rec.gisdata.lat, "Map's northeast latitude (" + mapBounds.ne.lat + ") is lower than record latitude " + rec.gisdata.lat);
			doh.assertTrue(mapBounds.sw.lng < rec.gisdata.lng, "Map's southwestlongitude (" + mapBounds.sw.lng + ") is higher than record longitude " + rec.gisdata.lng);
			doh.assertTrue(mapBounds.ne.lng > rec.gisdata.lng, "Map's northeast longitude (" + mapBounds.ne.lng + ") is lower than record longitude " + rec.gisdata.lng);
		}		
		this.deferredObj.callback(true);
	}

});

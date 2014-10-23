//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/zoom/LinkedCurrMbo", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/zoom/CurrMbo,ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.zoom.LinkedCurrMbo");
dojo.require("ibm.tivoli.fwm.doh.zoom.CurrMbo");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.LinkedCurrMbo", [ ibm.tivoli.fwm.doh.zoom.CurrMbo ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "CurrMbo with featureclass";
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation = this.confHelper.getDefaultLocation();
		this.mainRecord = this.confHelper.getLinkedCurrMbo();
		this.confHelper.conf.mapConf.currentMbo = this.mainRecord;
	},
	_validate: function(map)
	{
		if (map.api == 'maximospatial' && this.mapProvider=='Spatial dynamic map')
		{
			var actualExtent = map.getCenter();
			actualExtent.level = map.getZoom();
			var expected = {
				lat: 37.8056519620001,
				lng: -122.422040535,
				level: map.getZoom()
			};

			ibm.tivoli.fwm.doh.gisdoh.assertLocation(expected, actualExtent);
		}
		this.deferredObj.callback(true);
	}

});

});

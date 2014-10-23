//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/symbology/Symbology", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/gisdoh,ibm/tivoli/fwm/doh/_MapTests,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.symbology.Symbology");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.symbology.Symbology", [ ibm.tivoli.fwm.doh._MapTests ], {
	name: null,

	mainRecord: null,

	timeout: 60000,

	constructor: function(params)
	{
		dojo.mixin(this, params);

		this.name = "Symbology tests";
	},

	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{
			var mboInfo = ibm.tivoli.fwm.doh.ConfigHelper.symbologyMboSet[0];
			var woLayer = map.layersManager.getLayerById("workorder"); 
			//console.debug("[fwm.doh.symbology.Symbology.runMapTest] woLayer=", woLayer);
			
			var woChildLayers = woLayer.getChildren();
			var woStatusLayer = null;
			for (var index in woChildLayers)
			{
				if (woChildLayers[index].getLayerId() == "status")
				{
					woStatusLayer = woChildLayers[index];
					break;
				}
			}
			//console.debug("[fwm.doh.symbology.Symbology.runMapTest] woStatusLayer=", woStatusLayer);
			
			woStatusLayer.toggleState();

			var iconUrl = map.layersManager.getRecordSymbology(mboInfo, null).url;
			//console.debug("[fwm.doh.symbology.Symbology.runMapTest] icon=", iconUrl);
			
			doh.assertEqual("../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/symbology/workorder/map_WO_88aa47.png", iconUrl);
			this.deferredObj.callback(true);

		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
	},

	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.records =  ibm.tivoli.fwm.doh.ConfigHelper.symbologyMboSet;
	}
});


});

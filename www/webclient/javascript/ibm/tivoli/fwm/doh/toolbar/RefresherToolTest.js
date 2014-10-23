dojo.provide("ibm.tivoli.fwm.doh.toolbar.RefresherToolTest");

dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.toolbar.RefresherToolTest", [ ibm.tivoli.fwm.doh._MapTests ], {
	name: null,

	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "Testing the refresh tool";
	},
	mainRecord: null,

	timeout: 60000,
	
	testLng: -23.0,

	testLat: -43.0,
	
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{		
			var This = this;
			var deferredObject = This.deferredObj;
			
			map.maximo.refreshMap = function(){

				// Get a clone of the default main record and change its lng/lat to known values 
				var newMboPosition = dojo.clone(ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord);
				newMboPosition.gisdata.lng = This.testLng;
				newMboPosition.gisdata.lat = This.testLat;
				
				// Publish the new position to force a refresh in the coordinates of the Mbo on the map
				dojo.publish("onCurrentRecordUpdate_"+map.getId(), [newMboPosition]);

				// Check that the coordinates have been updated
				doh.assertTrue(map.currentRecordMgr.gisdata.lng == This.testLng);
				doh.assertTrue(map.currentRecordMgr.gisdata.lat == This.testLat);
				
				// Exit this test
				deferredObject.callback(true);
			};

			// Emulate the refresh button event
			var refreshButton = new ibm.tivoli.fwm.mxmap.toolbar.ext.RefresherTool({map: map});
			refreshButton.execute();

		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
		return deferredObject;
	},
	
	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.currentMbo =  this.confHelper.getDefaultCurrMbo();
	}
});


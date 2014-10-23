//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/toolbar/MyLocationToolTest", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/_MapTests"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.toolbar.MyLocationToolTest");

dojo.require('ibm.tivoli.fwm.doh._MapTests');

dojo.declare("ibm.tivoli.fwm.doh.toolbar.MyLocationToolTest", [ ibm.tivoli.fwm.doh._MapTests ], {
	name: null,

	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "Testing the My Location tool";
	},

	timeout: 10000,
	
	// Just test if a javascript error occurs when enabling and disabling the My Location feature
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{
			// Emulate the My Location button event
			var myLocationButton = new ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationTool({map: map});
			// Enable the My Location tool (start watching position)
			myLocationButton.execute();
			// Emulate the event of someone dragging the map
			myLocationButton.endPanHandler();
			// Recenter the map on the screen
			myLocationButton.execute();
			// Disable the My Location tool (stop watching position)
			myLocationButton.execute();
			// If no Javascript error occurred, return success.
			this.deferredObj.callback(true);
		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
		return this.deferredObj;
	},
	prepareConfData: function()
	{
	}
});


});

dojo.provide("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged");

dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');

dojo.declare("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged", [ibm.tivoli.fwm.doh.fullscreen.FullScreen], {		
	name: "Started with Full Screen off and not changed",
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},	
	_validate: function(map)
	{
		var baseParams = {width: map.getWidthInPixels() + "px", height: map.getHeightInPixels() + "px"};
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
	}
});

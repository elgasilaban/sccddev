//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/fullscreen/StartedWithFullScreenOffAndChangedTwice", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/fullscreen/FullScreen,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice");

dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');

dojo.declare("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice", [ibm.tivoli.fwm.doh.fullscreen.FullScreen], {
	name: "Started with Full Screen off and changed to on and back to off",
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},	
	_validate: function(map)
	{
		console.log("My Map: **********", map);
		var baseParams = {width: map.getWidthInPixels() + "px", height: map.getHeightInPixels() + "px"};
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
		map.fullScreenOn();
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithFullScreen(map);
		map.fullScreenOff();
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
	}
});


});

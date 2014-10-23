dojo.provide("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');


ibm.tivoli.fwm.doh.fullscreen.validateMapWithFullScreen = function(map)
{		
	var mapDivElement = dojo.byId(map.divId);
	doh.assertTrue(mapDivElement != null, "No Map Div Element");
	doh.assertEqual(mapDivElement.style.width, dijit.getViewport().w + "px", "Map Width is not viewport.w length");
	doh.assertEqual(mapDivElement.style.height, dijit.getViewport().h + "px", "Map Height is not viewport.h length");
	doh.assertEqual(mapDivElement.style.left, "0px", "Map left != 0px");
	doh.assertEqual(mapDivElement.style.position, "absolute", "Map position is not absolute");
	doh.assertEqual(mapDivElement.style.overflow, "hidden", "Map must not have scrolls");
	var toolbarDivElement = map.mapToolbar.getToolbarDivElement();
	var mapTop = "0px";
	if (toolbarDivElement)
	{
		doh.assertEqual(toolbarDivElement.style.width, dijit.getViewport().w + "px", "Toolbar Width is not viewport.w length");
		doh.assertEqual(toolbarDivElement.style.height, dijit.getViewport().h + "px", "Toolbar Height is not viewport.h length");
		doh.assertEqual(toolbarDivElement.style.left, "0px","Toolbar left != 0px");
		doh.assertEqual(toolbarDivElement.style.top, "0px","Toolbar top != 0px");
		doh.assertEqual(toolbarDivElement.style.position, "absolute","Toolbar position is not absolute");
		doh.assertEqual(toolbarDivElement.style.zIndex, "100000","Toolbar zIndex != 100000");
		mapTop = toolbarDivElement.style.top;
	}
	doh.assertEqual(mapDivElement.style.top, mapTop, "Map top != " + mapTop);
	doh.assertTrue(map.fullScreenHelper._keyHandler != null, "ESC Key must be listened in full screen mode");
};

ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen = function(map, baseValues)
{
	var mapDivElement = dojo.byId(map.divId);
	doh.assertTrue(mapDivElement != null, "No Map Div Element");
	doh.assertEqual(mapDivElement.style.width, baseValues.width, "Map Width is not with the " + baseValues.width);
	doh.assertEqual(mapDivElement.style.height, baseValues.height, "Map Height is not with" + baseValues.height);
	doh.assertEqual(mapDivElement.style.left, "0px", "Map left != 0px");
	doh.assertEqual(mapDivElement.style.top, "0px", "Map top != 0px");
	doh.assertEqual(mapDivElement.style.position, "relative", "Map position is not relative");
	doh.assertEqual(mapDivElement.style.overflow, "auto", "Map must have auto scrolls");
	var toolbarDivElement = map.mapToolbar.getToolbarDivElement();
	if (toolbarDivElement)
	{
		doh.assertEqual(toolbarDivElement.style.width, baseValues.width, "Toolbar Width is not with the " + baseValues.width);
		doh.assertEqual(toolbarDivElement.style.height, baseValues.height, "Toolbar Height is not with the " + baseValues.height);
		doh.assertEqual(toolbarDivElement.style.left, "0px","Toolbar left != 0px");
		doh.assertEqual(toolbarDivElement.style.top, "0px","Toolbar top != 0px");
		doh.assertEqual(toolbarDivElement.style.position, "relative","Toolbar position is not relative");
		doh.assertEqual(toolbarDivElement.style.zIndex, "","Toolbar zIndex != ''");
	}
	doh.assertTrue(map.fullScreenHelper._keyHandler == null, "No listeners added for full screen");
};


dojo.declare("ibm.tivoli.fwm.doh.fullscreen.FullScreen", [ibm.tivoli.fwm.doh._MapTests], {
	timeout: 60000,
	name: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},	
	prepareConfData: function()
	{

	},	
	_validate: function(map)
	{

	},
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{		
			this._validate(map);
			this.deferredObj.callback(true);
		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
	}
});


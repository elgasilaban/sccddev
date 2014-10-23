//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/FullScreen", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button,ibm/tivoli/fwm/i18n"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.FullScreen");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.i18n");

/**
 * Full Screen tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.FullScreen", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	_labelOn: "Set Full Screen On",
	_labelOff: "Set Full Screen Off",
	iconClass: "basicMapToolbarBtn fullScreenMapToolbarBtn",
	map: null,
	_isFullScreen: false,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._isFullScreen = false;
		this._handlers=[];
		var labelOn = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenon");
		var labelOff = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenoff");
		this._labelOn = labelOn || this._labelOn; 
		this._labelOff = labelOff || this._labelOff;
		
		// listen to these events to update the button label/image by external
		// full screen changes
		this.addSubscription(dojo.subscribe("mapFullScreenModeChanged_"+this.map.getId(), dojo.hitch(this, this._updateFullScreenState)));
		

		
	},
	createToolbarButton: function()
	{
		this._button = new dijit.form.Button({
			label: this._labelOn,
			showLabel: false,
			iconClass: this.iconClass,
			onClick: dojo.hitch(this, function()
			{
				this.execute();
			})

		});
		return this._button;

	},
	executeOn: function()
	{
		this._doFullScreen();
	},
	executeOff:function(){
		this._restoreOriginalSize();
	},

	disable: function()
	{
		// does nothing
	},

	_doFullScreen: function()
	{
		this._changeButtonState(true, this._labelOff);
		this.map.fullScreenOn();
	},
	_restoreOriginalSize: function(event)
	{
		this._changeButtonState(false, this._labelOn);
		this.map.fullScreenOff();
	},
	_updateFullScreenState: function(event)
	{
		if (event.modeOn == true)
		{
			this.setActive(true);
			this._changeButtonState(true, this._labelOff);			
		}
		else
		{
			this.setActive(false);
			this._changeButtonState(false, this._labelOn);
		}
	},
	_changeButtonState: function(fullScreenMode, newLabel)
	{
		this._button.set({
			label: newLabel
		});
		this._isFullScreen = fullScreenMode;
	}	
});
});

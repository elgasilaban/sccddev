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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.RefresherTool");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");

/**
 * Full Screen tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.RefresherTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
	label: "Refresh",
	iconClass: "basicMapToolbarBtn refreshMapToolbarBtn",
	map: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);

		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "refreshtoolbar");
		this.label = _label || this.label;
	},
	execute: function()
	{
		var refreshOptions = {
				zoom: true,
				disableMsgs: false,
				automatic: false
			};
		this.map.refreshMap(refreshOptions);
	},
	disable: function()
	{
		// does nothing
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
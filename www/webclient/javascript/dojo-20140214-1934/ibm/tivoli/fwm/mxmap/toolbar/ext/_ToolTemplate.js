//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/form/Button"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");

/**
 * Full Screen tool bar action.
 */
// TODO get translated messages or change the description to images
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	label: "",
	_button: null,
	iconClass: "basicMapToolbarBtn",
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._handlers=[];
		

	},
	createToolbarButton: function()
	{
		this._button = new dijit.form.Button({
			label: this.label,
			showLabel: false,
			iconClass: this.iconClass,
			onClick: dojo.hitch(this, function()
			{
				this.execute();
			})

		});
		return this._button;

	},
	execute: function()
	{
		console.error("to be implemented");
	},
	disable: function()
	{
		// does nothing
		console.error("to be implemented");
	},
	destroy: function()
	{
		this._button.destroyRecursive();
		// equivalent to super.destroyRecursive()
		// arguments is mandatory
		this.inherited(arguments);
		this.destroyRecursive();
	}
});
});

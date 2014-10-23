/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.MobileInfoPanel");

dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");

/**
 * Mobile Info Panel tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.MobileInfoPanel", ibm.tivoli.fwm.mxmap._Base, {
		label: "Info Panel",
		iconClass: "basicMapToolbarBtn",
		map: null,
		_dialog: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this._dialog = null;	
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "infopanel");
			this.label = _label || this.label;
		},
		createToolbarButton: function()
		{
			var button = new dijit.form.Button( {
				label: this.label,
				showLabel: true,
				iconClass: this.iconClass,
				onClick: dojo.hitch(this, function()
				{
					this.execute();
				})
			});
			return button;
		},
		execute: function()
		{
			if (this._dialog)
			{
				this._dialog.close();
				this._dialog = null;
			}	
			var me = this;
			this._dialog = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({map: me.map});
			this._dialog.show();
		},
		disable: function()
		{
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
});
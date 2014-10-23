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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("dijit.form.Button");

/**
 * Layers tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
		label: "Layers",
		iconClass: "basicMapToolbarBtn layersMapToolbarBtn",
		map: null,
		constructor: function(params)
		{			
			dojo.mixin(this, params); 
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
			this.label = _label || this.label;
		},
		execute: function()
		{	
			var _layerPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.map});		
			_layerPanelManager.updateLayers(this.map.getLayersManager().getLayers());
		},
		disable: function()
		{
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
});
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool");
dojo.require("dijit.form.Button");

/**
 * Work order symbology tool (this is just a shortcut to Layers -> Work Order)
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool", ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool, {
		iconClass: "basicMapToolbarBtn workOrderSymbologyMapToolbarBtn",
		constructor: function(params)
		{			
			dojo.mixin(this, params); 
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "workordersymbology");
			this.label = _label || this.label;
		},
		execute: function()
		{
			var layer = this.map.getLayersManager().getLayerById("workorder");
			if((layer != null) && (layer.hasChildren()))
			{
				var _layerPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.map, title: layer.getChildrenTitle()});		
				_layerPanelManager.updateLayers(layer.getChildren());
			}
		}
});
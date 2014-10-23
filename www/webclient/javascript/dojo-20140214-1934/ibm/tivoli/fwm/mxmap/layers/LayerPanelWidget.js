//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/LayerPanelWidget", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog,ibm/tivoli/fwm/mxmap/layers/LayerWidget"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");

dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerWidget");

dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerPanelWidget.html", "<div class=\"text\">\n\t<div data-dojo-attach-point=\"layers\"></div>\n</div>"),
	infoPanel: null,
	map: null,
	_layers: null,
	_title: null,
	_div: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._layers = [];
		this._title = params.title;
		// this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
	},
	postCreate: function()
	{
	},
	updateLayers: function(newLayers /* [] of Layer */)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[LayerPanelWidget] Update Layers: ", newLayers);
		}
		dojo.forEach(this._layers, function(layer)
		{
			layer.destroyRecursive(true);
		});
		var div = dojo.create("div");
		
		
		dojo.style(div, {
			borderBottom : '1px solid #E0E0E0'
		});
		
		this._layers = [];

		for ( var i = 0; i < newLayers.length; i++)
		{
			if (newLayers[i].isVisibleInUI()) // Don't show empty layers
			{
				var layerWidget = new ibm.tivoli.fwm.mxmap.layers.LayerWidget({
					layer: newLayers[i],
					layerPanel: this
				});
				dojo.place(layerWidget.domNode, div, 'last');
				this._layers.push(layerWidget);
			}
		}
		dojo.place(div, this.layers, 'only');

		if (!this._title)
		{
			// Change the title of the panel according to the type of symbology
			if (newLayers[0] instanceof ibm.tivoli.fwm.mxmap.layers.SymbologyLayer)
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "symbologydialogtitle");
			}
			else if (newLayers[0] instanceof ibm.tivoli.fwm.mxmap.layers.LegendLayer)
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "legenddialogtitle");
			}
			else
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
			}
		}

		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
		this.infoPanel = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({
			map: this.map,
			title: this._title
		});
		this.infoPanel.setContent(this.domNode);
		this.infoPanel.show(true);
	},
	close: function()
	{
		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
	}
});
});

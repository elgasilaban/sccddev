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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayerWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayerWidget", [dijit._Widget, dijit._Templated], {	
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerWidget.html"),
	layer: null,
	_layerLeftImageDom: null,
	_layerRightImageDom: null,
	layerPanel: null,
	_symbologyPanelManager: null,
	constructor:function(params){
		dojo.mixin(this, params);				
	},
	postCreate:function(){		
		this.layerInfo.innerHTML = this.layer.getLayerName();
		var leftIconURL = this.layer.getLeftIconURL();
		if(leftIconURL != null){
			this._layerLeftImageDom = dojo.create("img",{src: leftIconURL},this.activeOrHiddenImage, "only");
			dojo.style(this._layerLeftImageDom, {opacity: 1.0, visibility: "visible"});
		}
		var rightIconURL = this.layer.getRightIconURL();
		this._layerRightImageDom = dojo.create("img",{src: rightIconURL},this.submenu,"last");
		// If the layer has no right icon, make it invisible in order to avoid showing a broken image icon.
		if(rightIconURL == null){
			dojo.style(this._layerRightImageDom, {visibility: "hidden"});
		}
		dojo.style(this.layerInfo, "float", (document.body.dir == "rtl") ? "right" : "left");
	},
	_showChildrenLayerWidget: function(){
		if(this.layer.hasChildren() == true){
			var _childPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.layerPanel.map, title: this.layer.getChildrenTitle()});		
			_childPanelManager.updateLayers(this.layer.getChildren());
			this.layerPanel.close();
		}
	},
	_enableOrDisableLayer: function(){
		this.layer.toggleState();
		
		if(this.layerPanel){
			this.layerPanel.close();
		}	
	},
	destroyRecursive: function(){
		this.inherited(arguments);
		if(this._layerImageDom){
			dojo.destroy(this._layerImageDom);
		}
		if(this._layerRightImageDom){
			dojo.destroy(this._layerRightImageDom);
		}
	}
});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/VirtualLayer", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/layers/Layer,ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.VirtualLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.Layer");

dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Used only to display a subset of mbos on the markers resulting from a query
 * 
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.VirtualLayer", [ ibm.tivoli.fwm.mxmap.layers.Layer ], {
	constructor: function(options)
	{
		this._layerName = options.layerId;
		this._layerId = options.layerId;
		this.enable();
		this.layerConf = this.symbManager.getLayerConfigById(options.objectType);
	}
});
});

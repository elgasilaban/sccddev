//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/SymbologyLayer", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a map symbology
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Status",
 *  parentLayer: the layer that is creating this layer,
 * }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			symbologyType: null,
			/**
			 * Enables this symbology layer, executes the action that configures the markers for this symbology
			 * and disables all the other sibling symbologies
			 */
			toggleState: function()
			{
				var siblings = this.getSiblings();
				dojo.forEach(siblings, function(sibling){
					sibling.disable();
				});
				this.enable();
			},
			/**
			 * Enables this layer and configures the markers for the records according 
			 * to the legends (children of this symbology)
			 */
			enable: function()
			{
				var layerId = this.getParentLayer().getLayerId();
				this._map.getSymbologyManager().setActiveSymbology(layerId, this.layerConf);

				this.inherited(arguments);
				
				this._map.getLayersManager().redrawMarkers();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
			}
		});
});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/RouteLayer", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.RouteLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents the routes layer. Turning this layer on or off shows or hider the route paths.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.RouteLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			/**
			 * Starts the layer as enabled.
			 */
			init: function()
			{
				this.inherited(arguments);
				this.enable();
			},
			/**
			 * Enables this layer
			 */
			enable: function()
			{
				this.inherited(arguments);
				this._map.enableRoutes();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
				this._map.disableRoutes();
			}
		});
});

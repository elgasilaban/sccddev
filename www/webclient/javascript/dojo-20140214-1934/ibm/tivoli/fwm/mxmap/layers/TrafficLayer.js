//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/TrafficLayer", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.TrafficLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a traffic layer.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.TrafficLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			/**
			 * Enables this layer and consequently the traffic view.
			 */
			enable: function()
			{
				this.inherited(arguments);
				this._map.enableTraffic();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
				this._map.disableTraffic();
			}
		});
});

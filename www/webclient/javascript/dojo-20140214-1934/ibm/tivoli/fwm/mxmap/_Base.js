//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/_Base", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap._Base");
/**
 * Base dojo object to help for cleaning up subscribe/unsubscribe,
 * connect/disconnect and map handlers
 */
dojo.declare("ibm.tivoli.fwm.mxmap._Base", null, {
	_handlers : null,
	constructor : function(options) {
		this._handlers = [];
	},
	addSubscription : function(handler) {
		this._handlers.push(handler);
	},

	destroyRecursive : function() {
		var h;
		while ((h = this._handlers.pop())) {
			dojo.unsubscribe(h);
		}
	}

});
});

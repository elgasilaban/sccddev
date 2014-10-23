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
dojo.provide("ibm.tivoli.fwm.mxmap.actions.Actions");

dojo.require("dijit.Menu");
dojo.declare("ibm.tivoli.fwm.mxmap.actions.Actions", null, {
	divId : null,
	map : null,
	label : null,	
	constructor : function(params) {
		dojo.mixin(this, params);

	},
	execute : function(args) {
		console.info("not implemented");
	}

});
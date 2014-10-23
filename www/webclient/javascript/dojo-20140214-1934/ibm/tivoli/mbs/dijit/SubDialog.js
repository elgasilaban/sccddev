//>>built
// wrapped by build app
define("ibm/tivoli/mbs/dijit/SubDialog", ["dijit","dojo","dojox","dojo/require!dijit/Dialog"], function(dijit,dojo,dojox){
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.provide("ibm.tivoli.mbs.dijit.SubDialog");

dojo.require("dijit.Dialog");


dojo.declare("ibm.tivoli.mbs.dijit.SubDialog",dijit.Dialog,{

	//summary: disable the close button and escape event
	postCreate: function()
	{
		this.inherited(arguments);	
		dojo.style(this.closeButtonNode, "display", "none");
	},

	_onKey: function(evt)
	{
		if(evt.charOrCode == dojo.keys.ESCAPE) 
			return;
		this.inherited(arguments);
	},

	onClick: function(event)
	{
		stopBubble(event);
	}
});
});

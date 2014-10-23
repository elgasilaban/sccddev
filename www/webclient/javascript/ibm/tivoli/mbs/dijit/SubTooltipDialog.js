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

dojo.provide("ibm.tivoli.mbs.dijit.SubTooltipDialog");

dojo.require("dijit.TooltipDialog");


dojo.declare("ibm.tivoli.mbs.dijit.SubTooltipDialog", dijit.TooltipDialog,{
	fld:null,

	//summary: close the dialog when focus has shifted away from this popup
	_onBlur: function()
	{
		if(this != null)
		{
			dijit.popup.close(this);
		}
	},

	onClose: function()
	{
		this.inherited(arguments);
		if(this.fld)
		{
			if(this.fld.id == getHiddenForm().elements.namedItem("currentfocus").value)
			{
				this.fld.focus();
			}
		}
	},

	reFocus: function()
	{
		if(this.fld)
		{
			this.fld.focus();
		}
	},
	
	postCreate: function()
	{
		fixDateValues(this.containerNode);
		if(!this.closeX) {
			bindRecHoverEvents(this.containerNode);
		}
		this.inherited(arguments);
	}
});

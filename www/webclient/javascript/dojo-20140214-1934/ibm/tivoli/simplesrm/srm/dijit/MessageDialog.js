//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/MessageDialog", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dojo/i18n,ibm/tivoli/tip/dijit/TIPMessageDialog,ibm/tivoli/simplesrm/srm/dijit/OpenHelp,ibm/tivoli/simplesrm/srm/dijit/MultipleModal,dijit/DialogUnderlay"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.MessageDialog");
dojo.require("dojo.i18n");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

// include modules
dojo.require("ibm.tivoli.tip.dijit.TIPMessageDialog");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");
dojo.require("dijit.DialogUnderlay");

// the CreateCatalogRequest class is a widget that makes an
// XMLHttpRequest to a proxy servlet to reach an SRM object structure
// web service that can create service catalog requests
// Events:
//	onSrmRequestCreated(null)
//
// TODO: parameterize for the type of request.
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.MessageDialog",
	[ibm.tivoli.tip.dijit.TIPMessageDialog , ibm.tivoli.simplesrm.srm.dijit.OpenHelp, ibm.tivoli.simplesrm.srm.dijit.MultipleModal],
{
	_uiStringTable: null,

	constructor: function()
	{
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
	},
	postMixInProperties: function()
	{
		if (this.message==null)
		   this.message = this._uiStringTable[this.messageId];		
		this.url = null; // url is provided dynamically via openHelp handler 		
	},
	
	postCreate: function(){
		this.inherited(arguments);		
	
		var link = dojo.byId(this.id + "_" + this.messageId);
		this.connect(link , "onclick" , "openHelp");
		this.connect(dojo.doc.documentElement, "onkeypress", this._onKey);
	},
	
	show: function(){
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
		if (product==null || product.indexOf("srm")<0)
			this.patchCode();
		this.dialog_.supportsMultipleModal=true; //hack to support multiple modal panels
		this.inherited(arguments);
		if (product==null || product.indexOf("srm")<0)
			this.dialog_.domNode.style.zIndex = dijit._underlay.getDialogZIndex();
	},
	
	_onKey: function(event){		
		//changes original method to support multiple modal dialogs
		if(!this.preOnKeyTest(event)){
			return;// it's not your event
		}
		if(this.dialog_){
			this.dialog_._onKey(event);
		}
	},
	
	//handler
	openHelp: function(event){
		dojo.stopEvent(event);
		var params = [
		              {helpKey: "PMRDP_Messages.htm"},
		              {messageCode: this.messageId},
		              {messageType: this.type}
		             ];
		this.openHelpWindow(params);
		return false;
	},
	
	_dummy:null	
});
});

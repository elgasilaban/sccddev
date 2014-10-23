//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/ConfirmationDialog", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/simplesrm/srm/dijit/PopupDialog,dijit/Dialog"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.ConfirmationDialog");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.PopupDialog");
dojo.require("dijit.Dialog");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.ConfirmationDialog", null, {
	
	_uiStringTable: null,
	
	_messageMapping : {PMRDP_0253A : "CTJZH2352E",
					   PMRDP_0218A : "CTJZH2348E",
					   PMRDP_0221A : "CTJZH2349E",
					   PMRDP_0237A : "CTJZH2351E",
					   PMRDP_0233A : "CTJZH2350E"},
	
	constructor: function()
	{
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
	},
	show : function(title, reqType, content, callbackFn, e) {

		var confirmationDialog = new ibm.tivoli.simplesrm.srm.dijit.PopupDialog(
										{id: 'confirmationDialog', title: title});
		dojo.style(confirmationDialog.closeButtonNode, "visibility", "hidden");
		var onClickCallback = function(mouseEvent) {
			confirmationDialog.hide();
			confirmationDialog.destroyRecursive();
			if (window.event) {
				e = window.event;
			}
			var srcEl = mouseEvent.srcElement? mouseEvent.srcElement : mouseEvent.target; //IE or Firefox
			if (srcEl.id == 'yes') {
				callbackFn(true, e);
			} else {
				callbackFn(false, e);
			}
		};
		var customizedMessage = this._uiStringTable[this._messageMapping[reqType]];
		var customizedMessageWithContent =
						 customizedMessage.replace("\{0\}", "<b>"+content+"</b>");
		var message = customizedMessageWithContent + " " + this._uiStringTable["ConfirmationProceed"];
		var questionDiv = dojo.create('div', {innerHTML: message});
		dojo.addClass(questionDiv,"info");
		var footerDiv = dojo.create('div');

		confirmationDialog.containerNode.appendChild(questionDiv);
		confirmationDialog.containerNode.appendChild(footerDiv);

		var yesButton = new dijit.form.Button(
			{ label: this._uiStringTable.Yes, id: 'yes', onClick: onClickCallback });
		yesButton.placeAt(footerDiv);
	
		var noButton = new dijit.form.Button(
			{ label: this._uiStringTable.No, id: 'no', onClick: onClickCallback });
		noButton.placeAt(footerDiv);

		confirmationDialog.show();
	}
});

});

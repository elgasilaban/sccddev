//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/InlineMessage", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dijit/_Widget,dijit/_Templated,ibm/tivoli/simplesrm/srm/dijit/OpenHelp,dojo/i18n"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.InlineMessage");

// include modules
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");
dojo.require("dojo.i18n");

dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.InlineMessage",
	[dijit._Widget, dijit._Templated, ibm.tivoli.simplesrm.srm.dijit.OpenHelp],
{
	templateString:"<div>\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<table dojoAttachPoint=\"messageBox\" style=\"padding:3px !important\">\n\t\t<tr>\n\t\t\t<td><div dojoAttachPoint=\"messageIcon\"></div></td>\n\t\t\t<td><a dojoAttachPoint=\"messageIdBox\" class=\"message-id\" href=\"\">${messageId}:</a></td>\n\t\t\t<td class=\"message-description\" style=\"padding-left:5px; width:100%\">${messageText}</td>\n\t\t</tr>\n\t</table>\n</div>",	
	_uiStringTable: null,
	
	messageId: "",
	messageType: "",
	messageText: "",
	
	messageBox: null,
	messageIdBox: null,
	icon: null,
	
	constructor: function()
	{
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
	},
	postMixInProperties: function() {
		console.log("InlineMessage.postMixInProperties");
		if ((this.messageId !== null) && (this.messageId !== undefined) && (this.messageId !== "")) {
			this.messageType = this.messageId.substring(this.messageId.length -1);
			if ((this.messageType != 'I') && (this.messageType != 'W') && (this.messageType != 'E')) {
				console.debug("Invalid messageType: " + this.messageType + ".");
				this._setDefaultMessage();
			}
			else {
				//this.messageText = this._uiStringTable[this.messageId].substring(this._uiStringTable[this.messageId].indexOf(': '));
				this.messageText = this._uiStringTable[this.messageId];
				if(this.messageText){
					this.messageText = this.messageText.replace(this.messageId, "");
				}
				else{ 
					this.messageText = this.messageId;
				}
			}
		}
		else {
			console.debug("Null, undefined or empty messageId: " + this.messageId + ".");
			this._setDefaultMessage();
		}
	},
	
	postCreate: function() {
		console.log("InlineMessage.postCreate");
		this.inherited(arguments);
		
		this._applyStyle();
		
		var link = dojo.byId(this.messageIdBox);
		dojo.connect(link , "onclick" , this , "openHelp"); 
	},
	
	openHelp: function(event){
		dojo.stopEvent(event);
		
		var params = [{helpKey: "PMRDP_Messages.htm"}, {messageCode: this.messageId}, {messageType: this.messageType}];
		this.openHelpWindow(params);
	},
			
	_applyStyle: function() {
		switch(this.messageType) {
			case 'M':
				dojo.addClass(this.messageBox, 'info');
				dojo.addClass(this.messageIcon, 'infoicon');
				break;
			case 'W':
				dojo.addClass(this.messageBox, 'warning');
				dojo.addClass(this.messageIcon, 'wrnicon');
				break;
			case 'E':
				dojo.addClass(this.messageBox, 'critical');
				dojo.addClass(this.messageIcon, 'erricon');
				break;
			default:
				dojo.addClass(this.messageBox, 'info');
				dojo.addClass(this.messageIcon, 'infoicon');
				break;
		}
	},
	
	_setDefaultMessage: function() {
		this.messageId = 'CTJZH2316E';
		this.messageType = 'E';
		this.messageText = this._uiStringTable[this.messageId];
	},
	
	_dummy: null
});

});

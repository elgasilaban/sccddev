//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/PopupDialog", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dijit/Dialog,ibm/tivoli/simplesrm/srm/dijit/OpenHelp,ibm/tivoli/simplesrm/srm/dijit/MultipleModal,dijit/DialogUnderlay,dojox/html/metrics"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.PopupDialog");

dojo.require("dijit.Dialog");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");
dojo.require("dijit.DialogUnderlay");
dojo.require("dojox.html.metrics");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.PopupDialog", 
		[dijit.Dialog,ibm.tivoli.simplesrm.srm.dijit.OpenHelp,ibm.tivoli.simplesrm.srm.dijit.MultipleModal],
{
	//added to retrieve title attribute for help
	_uiStringTable: null,
	//context sensitive help - unique key that is mapped on server side to help topics
	cshKey: null ,
	
	constructor: function(params, domNode)
	{
		console.log("PopupDialog.ctor");
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
	},
	postCreate: function(){	
		console.log("PopupDialog.postCreate");
		this.inherited(arguments);
	},
	show: function()
	{
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
		//modify dijit.DialogUnderlay
		if (product==null || product.indexOf("srm")<0)
			this.patchCode();
		this.inherited(arguments);
		//set z-index above other modal widget
		if (product==null || product.indexOf("srm")<0)
			this.domNode.style.zIndex = dijit._underlay.getDialogZIndex();
		// dijit.Dialog connects window.onresize to dijit.Dialog.layout(), which only
		// repositions the popup, and doesn't resize.  
		// unshift (rather than push) gets _size called before layout
		this._modalconnects.unshift(dojo.connect(window, "onresize", this, "_size"));
	},
	_onKey: function(event){
		//changes original method to support multiple modal dialogs
		if(!this.preOnKeyTest(event)){
			return;// it's not your event
		}				
		this.inherited(arguments);			
	},
	_size: function()
	{	
		// this code is a modification of dijit.Dialog._size
		var mb = dojo.marginBox(this.domNode);
		var viewport = dijit.getViewport();
		var bShrink = false;
		if(mb.w >= viewport.w) {
			dojo.style(this.containerNode, "width", Math.floor(viewport.w * 0.9)+"px");
		}
		var container_w = dojo.style(this.containerNode, "width");
				
		var divlist = dojo.query(".banner", this.domNode);
		var banner = divlist.length > 0 ? divlist[0] : null; 
		if(banner) {
			var bsz = dojo.marginBox(this.containerNode);
			var pbx = dojo._getPadBorderExtents(banner); 
			dojo.style(banner, "width", (bsz.w-pbx.w) + "px");
		}
		if(mb.h >= viewport.h){
			bht = banner ? dojo.marginBox(banner).h : 0;
			tht = dojo.marginBox(this.titleBar).h;
			divlist = dojo.query(".footer", this.domNode);
			fht = divlist.length > 0 ? dojo.marginBox(divlist[0]).h : 0;
			var ht = Math.floor(viewport.h - bht - tht - fht - 10);
			if(ht < 0){
				ht = viewport.h * 0.75;	// what else can I do?
			}
			dojo.style(this.containerNode, {
				height: ht+"px",
				width: container_w + "px"	// in IE, width changes when I set height
			});
		}
		if(mb.w >= viewport.w || mb.h >= viewport.h)  {
			dojo.style(this.containerNode, {
				overflow: "auto",
				position: "relative"	// workaround IE bug moving scrollbar or dragging dialog
			});
		}
	
		this.resize();
	},
	resize: function()
	{
		this.inherited(arguments);
		this._position();	// re-center
		return;
	},
	_position: function() {
		this.inherited(arguments);		
		//wow this is a hack! I need to set the top to a fixed 40px for the solution search dialog
		if (this.domNode.id=="search-dialog") {
	       dojo.style(this.domNode, "top", "40px");  
	    }
	    
	},

	// prevent the user from interacting
	_screen: null,
	disableAll: function(bState)
	{
		if(bState) {
			// disable
			var box = dojo.marginBox(this.domNode);
			if(this._screen == null) {
				this._screen = document.createElement("div");
			}
			dojo.style(this._screen, {
				position: "absolute",
				left: box.l + "px",
				top: box.t + "px",
				width: box.w + "px",
				height: box.h + "px",
				cursor: "wait",
				zIndex: 1000,
				backgroundColor: "transparent"
			});
			dojo.place(this._screen, document.body, "first");
		}
		else {
			// enable
			try {
				document.body.removeChild(this._screen);
			}
			catch(ignore){
				console.info("ignore",ignore);
			}
		}
	},
	
	//handler:used when user clicks '?'
	openHelp: function(event){
		this.openHelpWindow(this.cshKey);		
	},
	
	//error handler: used when help url can't be retrieved from server
	_errorRetrievingUrl:function(){				
		(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({messageId: "CTJZH2302E"})).show();
	},
	
	//sets cshKey, adds '?' to title bar, connects help events 
	addHelp: function(cshKey){

		this.cshKey = cshKey;
		
		var helpNode = document.createElement("span");
		
		dojo.addClass(helpNode , "dijitDialogHelpIcon");			
		dojo.attr(helpNode , "id" , this.id + "_visual_" + cshKey);
		dojo.attr(helpNode , "title" , this._uiStringTable["Help"]);
		dojo.attr(helpNode , "tabindex" , 0);
		
		var res = dojo.place(helpNode, this.closeButtonNode ,"before");
		this.connect(helpNode , "onclick" , "openHelp");
		this.connect(helpNode , "onmouseenter","_onHelpEnter");		
		this.connect(helpNode , "onmouseleave","_onHelpLeave");
		this.connect(helpNode , "onkeypress" , "_onEnterPressed");
		
		var textHelpNode = document.createElement("span");
					
		dojo.addClass(textHelpNode , "closeText");
		dojo.attr(textHelpNode , "id" , this.id + "_text_" + cshKey);
		dojo.attr(textHelpNode , "title" , this._uiStringTable["Help"]);			
		
		var textNode = document.createTextNode("?");
		dojo.place(textNode , textHelpNode );
		
		dojo.place(textHelpNode, helpNode);
		
		this.connect(this.domNode,"keypress","_onHelpKey");
	} ,		
	_onHelpEnter: function(){						 
		var helpNode = dojo.query(".dijitDialogHelpIcon",this.titleBar);
		dojo.addClass(helpNode[0], "dijitDialogHelpIcon-hover");
	},
	_onHelpLeave: function(){
		var helpNode = dojo.query(".dijitDialogHelpIcon-hover",this.titleBar);
		dojo.removeClass(helpNode[0] , "dijitDialogHelpIcon-hover");
	},
	_onHelpKey: function(event){
		/*
		if ((dojo.isIE) && (event.keyChar == 'p'))
			return true;
		*/
		
		// help key accessible from whole panel
		if(event.keyCode == dojo.keys.F1){
			
			// on IE dojo.stopEvent() is not enough to cancel this event
			// "onhelp" attribute is valid for IE only
			if (dojo.isIE){
				//For IE, keyCode of 'p' char is misteriously equal to F1... 
				if (event.keyChar == 'p'){
					return true;
				}
				document.onhelp = function(){return false;};
				window.onhelp = function(){return false;};
			}
			
			if(this.cshKey && this.openHelp){				
				dojo.stopEvent(event);			
				this.openHelp(event);
				return false;
			}
		}
		return true;
	},
	_onEnterPressed: function(event){
		//open only if Enter was pressed on help icon
		if ((event.keyCode == dojo.keys.ENTER) && 
			(dojo.hasClass(event.target ,"dijitDialogHelpIcon"))){
			dojo.stopEvent(event);
			this.openHelp(event);
			return false;
		}
		return true;
	},
	
	_dummy:null

});	
});

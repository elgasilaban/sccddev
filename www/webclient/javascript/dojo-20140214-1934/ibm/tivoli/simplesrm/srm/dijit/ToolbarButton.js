//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/ToolbarButton", ["dijit","dojo","dojox","dojo/require!dijit/form/_FormWidget"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.ToolbarButton");

dojo.require("dijit.form._FormWidget");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.ToolbarButton", 
	dijit.form._FormWidget,
{	
	templateString : "<div title='${tooltip}' class='srm_button dijit dijitLeft dijitInline dijitButton'  dojoAttachPoint='focusNode' dojoAttachEvent='onclick:_onButtonClick,onmouseover:_onMouse,onmouseout:_onMouse,onmousedown:_onMouse,onkeypress:_onKeyPress'><div class='${iconClass}'></div></div>",
	iconClass: '',
	tooltip: '',
	
	constructor: function() 
	{
		console.log("Button.ctor");
	},
	postMixInProperties: function()
	{
		console.log("Buton.postMixInProperties");
		this.inherited(arguments);
	},
	buildRendering: function()
	{
		console.log("Button.buildRendering");
		this.inherited(arguments);
		console.log("domNode; ", this.domNode);
	},
	startup: function()
	{
		console.log("Button.startup");
		this.inherited(arguments);
	},
	_onButtonClick: function(evt)
	{
		dojo.stopEvent(evt);
		if(this.disabled){ return false; }
		if(typeof this.onClick == "function"){
			return this.onClick(evt); // user click actions
		}
		else{ 
			return false;
		}
	},
	_onKeyPress: function(/* Event */ evt)
	{
		if(evt.type == 'keypress' && evt.keyCode == dojo.keys.ENTER) {
			// TODO: is this really what I want to do?
			this.onClick(evt);
		}
	},
	onClick: function(/*Event*/ e){
		// summary: user callback for when button is clicked
		//      if type="submit", return value != false to perform submit
		return true;
	},
	_dummy:null
});
});

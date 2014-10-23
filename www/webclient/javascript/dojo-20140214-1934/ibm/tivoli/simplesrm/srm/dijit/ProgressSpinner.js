//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/ProgressSpinner", ["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated,dojo/parser"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.ProgressSpinner");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.parser");

// A class for displaying a progress spinner
//
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.ProgressSpinner", 
	[dijit._Widget, dijit._Templated],
{	
	templateString: "<div class='srmspinner' style='visibility: hidden;display:inline;'><img src='${spinnerImagePath}' alt='' style='width: 16px; height: 16px; vertical-align: middle;'><span dojoAttachPoint='label' class='srmspinnerlabel'>${text}</span></div>",
	spinnerImagePath: '',
	text: '',
	
	constructor: function(/*object*/params, /*domNode*/domNode)
	{
		console.log("ProgressSpinner.ctor");
		//this.spinnerImagePath = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit", "images/progress-anim.gif");
		this.spinnerImagePath = dojo.moduleUrl("ibm.tivoli.tip.dijit", "themes/images/processing-toolbar.gif");
	},
	show: function() 
	{
		console.log("showing spinner: ", this.id);
		dojo.style(this.domNode, "visibility", "visible");
	},
	hide: function() {
		dojo.style(this.domNode, "visibility", "hidden");
	}
	
});
});

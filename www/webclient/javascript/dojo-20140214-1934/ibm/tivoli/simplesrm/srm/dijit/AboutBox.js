//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/AboutBox", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dijit/form/Button,dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.AboutBox");

dojo.require("dijit.form.Button");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

/*
 *  
 */
dojo.declare(
		"ibm.tivoli.simplesrm.srm.dijit.AboutBox",
		[dijit._Widget,dijit._Templated],
{		
	widgetsInTemplate: true,
	_uiStringTable: null,
	templateString:"<div class=\"aboutbox\" style=\"position: absolute; width: ${imgWidth}px; height: ${imgHeight}px;\">\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<div class=\"alternativeText\" style=\"position: absolute; top: 100px; left: 23px;\">\n\t\t<h1>TIVOLI Service Automation Manager 7.2.0.1</h1>\t\t\n\t</div>\t\t\n\t<div style=\"position: absolute; top: 300px; left: 23px; font-size: 10pt;\">\n\t\t${_uiStringTable.AboutCopyright}\n\t</div>\n\t<div style=\"position: absolute; bottom: 10px; left: 10px;\"> \n\t\t<h4>${buildVersion}</h4>\n\t</div>\n\t<div dojoType=\"dijit.form.Button\" baseClass=\"hyperlink\" dojoattachpoint=\"close\" dojoAttachEvent=\"onClick:_onclick\" \t \n\tstyle=\"position: absolute; bottom: 10px; right: 10px;\"\n\tlabel=\"${_uiStringTable.Close}\">\t\n\t</div>\n</div>\n",
	imgHeight:460,
	imgWidth: 650,
	buildVersion: "BuildVersionTagForReplacement",
	
	constructor: function()
	{
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
	},
	_onclick: function(event){
		console.log("click!");
		dojo.style(this.domNode,"display","none");
		dojo.stopEvent(event);
	},
	
	show: function(){
		var vp = dijit.getViewport();
		var l = (vp.w - this.imgWidth) / 2;
		console.log("vp.w:" +vp.w + " l: " + l);
		var t = (vp.h - this.imgHeight) / 2;
		console.log("vp.h: " + vp.h + " t: " + t);
		dojo.style(this.domNode, {left: l + "px", top: t + "px", display: "block"});
		this.close.focus();
	}
});
});

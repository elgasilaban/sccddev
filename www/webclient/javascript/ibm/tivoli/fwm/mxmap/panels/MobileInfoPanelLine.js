/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine", [dijit._Widget, dijit._Templated], {
	templatePath: dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "templates/MobileInfoPanelLine.html"),	
	domNode:null,
	row: null,
	content: null,
	clickable: null,	
	constructor : function(options) {
		dojo.mixin(this,options);
	},
	postCreate:function(){
		dojo.parser.parse(this.domNode);		
	},	
	setCallbackFunction: function(callback)
	{
		this.clickable.onclick = callback;
	},
	setRowClass: function(newClass)
	{
		dojo.addClass(this.row, newClass);
	},
	setContent: function(content)
	{
		this.content.innerHTML = content;
	}
});
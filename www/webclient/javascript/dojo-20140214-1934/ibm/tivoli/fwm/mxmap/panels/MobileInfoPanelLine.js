//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelLine", ["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
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
	templateString:"<tr role=\"row\" style=\"display: ;\" dojoAttachPoint=\"row\">\n\t<th>\n\t\t<img src=\"../webclient/skins/tivoli09/images/blank.gif\" style=\"display: none\" class=\"tablerow_blank_icon\" title=\"\" alt=\"\">\n\t</th>\n\t<td role=\"gridcell\" control=\"true\" dojoAttachPoint=\"clickable\" onmouseover=\"appendClass(this.parentNode,'trh')\" onmouseout=\"removeClass(this.parentNode,'trh')\" style=\"padding-left: 5px;\" class=\"tc hl cursor_hand\">\n\t\t<table role=\"presentation\" style=\"display: inline;\">\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td nowrap=\"nowrap\" valign=\"top\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t<table role=\"presentation\" control=\"true\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\" \" summary=\"\" style=\"width: 100%; vertical-align: top\">\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr control=\"true\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t\t\t\t<td nowrap=\"nowrap\" align=\"left\" valign=\"top\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t\t\t\t\t<div aria-live=\"polite\" class=\"bc\">\n\t\t\t\t\t\t\t\t\t\t\t<span ctype=\"label\" tabindex=\"0\" \n\t\t\t\t\t\t\t\t\t\t\tclass=\"text txtplain  label  \" \n\t\t\t\t\t\t\t\t\t\t\tstyle=\"cursor: pointer;\"\n\t\t\t\t\t\t\t\t\t\t\ttitle=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"content\"></div>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</td>\n</tr>",	
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
});

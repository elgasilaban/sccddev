//>>built
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
define("ibm/tivoli/mbs/debug/DetailPane", ["dojo/_base/declare","dojo/dom-construct","dijit/layout/ContentPane"],
		function(declare, domConstruct, ContentPane)
{
	return declare("ibm.tivoli.mbs.debug.DetailPane", ContentPane, 
	{
		reset: function()
		{
			var initialXML = domConstruct.create("span", {style: "color: #666"});
			domConstruct.place(document.createTextNode("Select a row to see it's details"), initialXML);
			domConstruct.place(initialXML, this._detail, "only");
		},
		setValue: function(value)
		{
			domConstruct.place(document.createTextNode(value), this._detail, "only");
		},
		postCreate: function()
		{
			this.inherited(arguments);

			this._detail = domConstruct.create("pre");
			
			this.containerNode.appendChild(this._detail);
			this.reset();
		}
	});
});
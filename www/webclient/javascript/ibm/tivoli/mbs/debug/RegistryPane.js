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
define(["dojo/_base/lang","dojo/_base/declare","dojo/_base/xhr","dojo/dom-construct","dojo/on","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/Toolbar","dijit/form/TextBox","dijit/form/Button"], 
		function(lang, declare, xhr, domConstruct, on, BorderContainer, ContentPane, Toolbar, TextBox, Button)
{
	return declare("ibm.tivoli.mbs.debug.RegistryPane", BorderContainer, 
	{
		load: function()
		{
			var self = this;
			xhr.get({
				url: "debug/registry.jsp?name=" + self.name,
				load: function(response, ioArgs) {
					domConstruct.place(document.createTextNode(response), self.fileContent, "only");
					return response;
				},
				error: function(response, ioArgs) {
					domConstruct.place(document.createTextNode(ioArgs.xhr.responseText), self.fileContent, "only");
					return response;
				}
			});
		},
		
		postCreate: function()
		{
			this.inherited(arguments);

			var self = this;
			
			var content = new ContentPane({
				region: "center",
				splitter: false
			});
			this.fileContent = domConstruct.create("pre");
			content.set('content', this.fileContent);
			this.addChild(content);
			
			var toolbar = new Toolbar({region: "top", splitter:false});
			var reloadButton = this._reloadButton = new Button({
				label: "Refresh",
				showLabel: false,
				iconClass: "tpaeDebugRefresh",
				onClick: function() {
					self.load();
				}
			});
			toolbar.addChild(reloadButton);
			this.addChild(toolbar);

			this.load();
		}
	});
});
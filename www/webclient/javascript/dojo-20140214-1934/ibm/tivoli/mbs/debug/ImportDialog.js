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
define("ibm/tivoli/mbs/debug/ImportDialog", ["dojo/_base/declare","dojo/dom-construct","dojo/fx","dojo/dom-style","dijit/form/Button","dijit/Dialog","dojox/form/Uploader","dojox/form/uploader/plugins/IFrame"], 
		function(declare, domConstruct, fx, style, Button, Dialog)
{

	return declare("ibm.tivoli.mbs.debug.ImportDialog", Dialog, 
	{
		title: "Import Presentation",

		postCreate: function() {
			this.inherited(arguments);
			var self = this;
			myUploader = new dojox.form.Uploader({
				label: 'Browse',
				showInput: 'before',
				//uploadOnSelect: true,
				url:"debug/presentation.jsp?" + this.uiSessionIdParam + "&import=true",
				multiple: false,
				onComplete: function(dataArray) {
					domConstruct.empty(status);
					dojo.forEach(dataArray, function(file){
						if(file.error)
						{
							var span = domConstruct.create("span", {style:"color:red"});
							domConstruct.place(document.createTextNode("Error: " + file.error), span);
							domConstruct.place(span, status);
						}
						else
						{
							domConstruct.place(document.createTextNode("Succesfully imported " + file.name + "."), status);
							domConstruct.place(domConstruct.create("br"), status);
							
							var openApp = domConstruct.create("a", {href: "/maximo/ui/?event=loadapp&value=" + file.name + "&" + self.uiSessionIdParam, target: "_blank"});
							domConstruct.place(openApp, status);
							domConstruct.place(document.createTextNode("Open"), openApp);

							domConstruct.place(document.createTextNode(" - "), status);
							
							var downloadSql = domConstruct.create("a", {href: "debug/presentation.jsp?" + self.uiSessionIdParam + "&download=true&format=sql&appId=" + file.name});
							domConstruct.place(downloadSql, status);
							domConstruct.place(document.createTextNode("Download SQL"), downloadSql);
						}
					});
					fx.wipeIn({
						node: status
					}).play();
					b.set("disabled", false);
					myUploader.set("disabled", false);
				},
				onChange: function() {
					style.set(status, {display:"none"});
					b.set("disabled", false);
				}
			});
			var status = domConstruct.create("div", {display: "none"});
			this.containerNode.appendChild(status);

			this.containerNode.appendChild(myUploader.domNode);
			myUploader.startup();

			var b = new Button({
				label:"Upload",
				disabled: true,
				onClick: function(){
					style.set(status, {display:"none"});
					this.set("disabled", true);
					myUploader.set("disabled", true);
					myUploader.upload();
				}
			});
			this.containerNode.appendChild(b.domNode);
		}
	});
});
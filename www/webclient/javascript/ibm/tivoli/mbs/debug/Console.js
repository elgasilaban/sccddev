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
define(["dojo/_base/declare","dojo/dom-construct","dojo/topic","dijit/layout/BorderContainer","dijit/layout/ContentPane",
        "dijit/form/Select","dojo/store/Memory","dijit/layout/TabContainer","./Log","./Requests","./Widgets","./Databeans",
        "./Labels","./RegistryPane","./Applications","./ServerLogs","dojo/hash","dijit/_base/manager",
        "dojo/ready","dojo/_base/connect","dojo/aspect","dojo/_base/array"], 
		function(declare, domConstruct, topic, BorderContainer, ContentPane, Select, Memory, TabContainer, Log, 
				Requests, Widgets, Databeans, Labels, RegistryPane, Applications, ServerLogs, hash, dijitMgr,
				ready, connect, aspect, array)
{
	return declare("ibm.tivoli.mbs.debug.Console", BorderContainer, 
	{
		constructor: function() {
			this.inherited(arguments);
			connect.subscribe("/dojo/hashchange", this, this.loadState);
		},

		postCreate: function()
		{
			this.inherited(arguments);

			var self = this;
			
			var top = new ContentPane({
				region: "top"
			});
			this.addChild(top);

			var span = domConstruct.create("span", {id: "header", style: "vertical-align:middle;"});
			domConstruct.place(span, top.containerNode);
			domConstruct.place(document.createTextNode("Web Client Debug Console - uiSession: "), span);

			for(var i = 0; i < this.uiSessionIds.length; i++) {
				if(this.uiSessionIds[i].value === this.uiSessionId) {
					this.uiSessionIds[i].selected = true;
				}
			}
			
			var sessionCombo = new Select({
				style: "width:90px",
				identifier: "value",
				label: "label",
				options: this.uiSessionIds,
				onChange: function(value) {
					topic.publish("uiSessionId", value);
				}
			});
			domConstruct.place(sessionCombo.domNode, top.containerNode);
			
			if(!this.uiSessionId)
			{
				var invalidSession = new ContentPane({
					region:"center"
				});
				domConstruct.place(document.createTextNode("Invalid session, select another"), invalidSession.containerNode);
				this.addChild(invalidSession);
				return;
			}
			
			var tabs = this.tabs = new TabContainer({
				region:"center"
			});
			this.addChild(tabs);

			tabs.addChild(new Log({
				gutter: true,
				title: "Log",
				id: "Log",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName,
				levels: self.levels
			}));

			tabs.addChild(new Requests({
				gutter: true,
				title: "Requests",
				id: "Requests",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName
			}));

			var currentApp = new TabContainer({
				title: "Current App",
				id: "CurrentApp"
			});
			tabs.addChild(currentApp);
			currentApp.addChild(new Widgets({
				gutter: true,
				title: "Controls/Components",
				id: "ControlsComponents",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName
			}));
			currentApp.addChild(new Databeans({
				gutter: true,
				title: "Databeans",
				id: "Databeans",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName
			}));
			currentApp.addChild(new Labels({
				gutter: true,
				title: "Labels",
				id: "Labels",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName
			}));

			tabs.addChild(new Applications({
				gutter: true,
				title: "Applications",
				id: "Applications",
				uiSessionId: self.uiSessionId,
				uiSessionIdParamName: self.uiSessionIdParamName
			}));

			var registries = new TabContainer({
				title: "Registries",
				id: "Registries",
			});
			tabs.addChild(registries);
			registries.addChild(new RegistryPane({
				gutter: true,
				title: "Controls",
				id: "Controls",
				name: "control"
			}));
			registries.addChild(new RegistryPane({
				gutter: true,
				title: "Components",
				id: "Components",
				name: "component"
			}));
			
			tabs.addChild(new ServerLogs({
				gutter: true,
				title: "Server Logs",
				id: "ServerLogs"
			}));
		},
		saveState: function(path){
			hash(path);
		},
		loadState: function()
		{
			var hashString = hash();
			var parts = hashString.split('.');
			var path = parts[0].split('/');

			var child = null;
			array.forEach(path, function(item) {
				child = dijitMgr.byId(item);
				if(child)
				{
					var parent = child.getParent();
					if(parent)
					{
						parent.selectChild(child);
					}
				}
			});
			if(child && parts.length > 1)
			{
				var func = parts[1];
				if(typeof(child[func]) === "function")
				{
					child[func]();
				}
				else
				{
					alert(child + "." + func + " is not a function.");
				}
				hash(parts[0]);
			}
		},
		startup: function()
		{
			this.inherited(arguments);

			var _self = this;
			ready(function()
			{
				_self.loadState();
				aspect.after(_self.tabs.tablist, "onSelectChild", function(page) {
					_self.saveState(page.id);
				}, true);
				var children = _self.tabs.getChildren();
				array.forEach(children, function(child) {
					if(child.isInstanceOf(TabContainer)) {
						aspect.after(child.tablist, "onSelectChild", function(page) {
							_self.saveState(child.id + "/" + page.id);
						}, true);
					}
				});
			});
		}
	});
});
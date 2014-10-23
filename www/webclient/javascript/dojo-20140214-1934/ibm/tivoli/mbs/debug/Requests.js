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
define("ibm/tivoli/mbs/debug/Requests", ["dojo/_base/declare","dojo/_base/lang","dojo/_base/xhr","dojo/dom-construct","dojo/topic","dijit/layout/BorderContainer","dijit/layout/ContentPane",
        "dijit/Toolbar","dijit/ToolbarSeparator","./FilteringGrid","dojo/data/ItemFileReadStore","dojo/store/Memory","dijit/form/Button",
        "dijit/form/CheckBox","dijit/form/TextBox","./DetailPane","./UISessionIdMixin","dijit/tree/ForestStoreModel","dijit/Tree","dijit/Tooltip"],
		function(declare, lang, xhr, domConstruct, topic, BorderContainer, ContentPane, Toolbar, ToolbarSeparator, DataGrid,
				ItemFileReadStore, Memory, Button, CheckBox, TextBox, DetailPane, UISessionIdMixin, ForestStoreModel, Tree, Tooltip)
{
	return declare("ibm.tivoli.mbs.debug.Events", [BorderContainer, UISessionIdMixin], 
	{

		postCreate: function()
		{
			this.inherited(arguments);

			var self = this;

			var requestStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/requests.jsp?" + self.getUISessionIdParam()
			});

			var requestStoreModel = new ForestStoreModel({
				rootLabel: "Root",
				store: requestStore
			});

			var detailPane = new DetailPane({
				region: "bottom",
				splitter: true,
				style: "height: 20%;padding:0px;",
				title: "Details for selected node"
			});
			this.addChild(detailPane);
			
			var dateTime = {datePattern: 'yyyy-MM-dd', timePattern: 'HH:mm:ss.SSSZ'};
			
			var requests = new Tree({
				region: "center",
				splitter: true, 
				style: "overflow: auto;padding:0px;",
				showRoot: false,
				autoExpand: false,
				model: requestStoreModel,
				getLabel: function(item) {
					var label = this.model.store.getLabel(item);
					if(item.root) return label;
					var nodeType = this.model.store.getValue(item, "nodeType");
					switch(nodeType) {
						case "event":
							return this.model.store.getValue(item, "type");
						case "handledByEntry":
							var instanceId = this.model.store.getValue(item, "instanceId");
							return this.model.store.getValue(item, "className") + (instanceId ? " - " + instanceId : "");
						case "logEntry":
							return this.model.store.getValue(item, "message");
						case "handledByEntries":
							return "Handled by";
						case "logEntries":
							return "Log";
						case "request":
							return this.model.store.getValue(item, "url");
						case "events":
							return "Events";
						case "parameters":
							return "Parameters";
						case "parameter":
							return this.model.store.getValue(item, "name");
						case "attributes":
							return "Attributes";
						case "attribute":
							return this.model.store.getValue(item, "name");
						case "headers":
							return "Headers";
						case "header":
							return this.model.store.getValue(item, "name");
					}
					return label;
				},
				getIconClass: function(item, opened) {
					if(!item || item == this.model.root)
					{
						return "dijitFolderClosed";
					}
					var nodeType = this.model.store.getValue(item, "nodeType");
					switch(nodeType) {
						case "request":
							return "tpaeDebugRequest";
						case "events":
							return "tpaeDebugEvents";
						case "parameters":
							return "tpaeDebugParameters";
						case "attributes":
							return "tpaeDebugAttributes";
						case "headers":
							return "tpaeDebugHeaders";
						case "event":
							if(this.model.store.getValue(item, "requestEvent")) {
								return "tpaeDebugRequestEvent";
							} else {
								return "tpaeDebugEvent";
							}
						case "handledByEntry":
							return "tpaeDebugClass";
						case "parameter":
							return "tpaeDebugParameter";
						case "attribute":
							return "tpaeDebugAttribute";
						case "header":
							return "tpaeDebugHeader";
						case "handledByEntries":
							return "dijitIconFile";
						case "logEntries":
							return "tpaeDebugLog";
						case "logEntry":
							var level = this.model.store.getValue(item, "level");
							switch(level) {
								case "ERROR":
									return "tpaeDebugError";
								case "WARNING":
									return "tpaeDebugWarning";
								case "INFO":
									return "tpaeDebugInfo";
								case "OK":
									return "tpaeDebugOk";
							}
					}
					return "dijitFolderClosed";
				},
				_onNodeMouseEnter: function (node, evt) {
					var item = node.item;
					var nodeType = this.model.store.getValue(item, "nodeType");
					var label = "";
					switch(nodeType) {
						case "event":
							if(this.model.store.getValue(item, "requestEvent")) {
								label = "This event came from a browser request.<br/>";
							}
							var timestamp = this.model.store.getValue(item, "timestamp");
							label += "Time: " + dojo.date.locale.format(timestamp, dateTime);;
							var target = this.model.store.getValue(item, "target");
							if(target) {
								label += "<br/>Target: " + target;
							}
							var value = this.model.store.getValue(item, "value");
							if(value) {
								label += "<br/>Value: " + value;
							}
							break;
						case "handledByEntry":
							var timestamp = this.model.store.getValue(item, "timestamp");
							label = dojo.date.locale.format(timestamp, dateTime);;
							break;
						case "request":
							var timestamp = this.model.store.getValue(item, "timestamp");
							label = "Time: " + dojo.date.locale.format(timestamp, dateTime);;
							var contentLength = this.model.store.getValue(item, "contentLength");
							if(contentLength) {
								label += "<br/>contentLength: " + contentLength;
							}
							var contentType = this.model.store.getValue(item, "contentType");
							if(contentType) {
								label += "<br/>contentType: " + contentType;
							}
							break;
						case "logEntry":
							var timestamp = this.model.store.getValue(item, "timestamp");
							label = dojo.date.locale.format(timestamp, dateTime);
							break;
					}
					if(label) {
						Tooltip.show(label, node.labelNode, ['below','above','after','before']);
					}
				},
				_onNodeMouseLeave: function (node, evt) {
					Tooltip.hide(node.labelNode);
				},
				onClick: function(item,node) {
					this.inherited("onClick", arguments);
					var nodeType = this.model.store.getValue(item, "nodeType");
					if(nodeType == "logEntry") {
						var detail = this.model.store.getValue(item, "detail");
						var source = this.model.store.getValue(item, "source");
						detailPane.setValue("Logged At: " + source + "\n" + detail);
					} else if(nodeType == "parameter" || nodeType == "attribute" || nodeType == "header") {
						detailPane.setValue(this.model.store.getValue(item, "value"));
					} else {
						detailPane.reset();
					}
				}
			});
			this.addChild(requests);
		
			var reload = this.reload = function(result) {
				requestStore.close();
				requestStore.url = "debug/requests.jsp?tree=true&" + self.getUISessionIdParam();
				requests._itemNodesMap = {};
				requests.rootNode.state = "UNCHECKED";
				requests.model.root.children = null;
				requests.rootNode.destroyRecursive();
				requests.model.constructor(requests.model);
				requests.postMixInProperties();
				requests._load();
				detailPane.reset();
			};
			
			var toolbar = new Toolbar({region: "top"});

			var reloadButton = new Button({
				label: "Refresh",
				showLabel: false,
				iconClass: "tpaeDebugRefresh",
				onClick: reload
			});

			
			var clear = new Button({
				label: "Clear",
				showLabel: false,
				iconClass: "tpaeDebugClear",
				onClick: function(evt) {
					xhr.get({
						url: "debug/requests.jsp?" + self.getUISessionIdParam() + "&action=clear",
						load: reload
					});
				}
			});
			
			toolbar.addChild(reloadButton);
			toolbar.addChild(clear);
			toolbar.addChild(new ToolbarSeparator());

			this._enabled = new CheckBox({
				id: "enabled",
				onChange: function(evt) {
					if(self._refreshing) {
						return;
					}
					xhr.get({
						url: "debug/requests.jsp?" + self.getUISessionIdParam() + "&action=set&attr=enabled&value=" + evt,
					});
				}
			});
			toolbar.addChild(this._enabled);
			var label = domConstruct.create("label", {"for":"enabled",style:"vertical-align: middle;"});
			domConstruct.place(document.createTextNode("Enabled"), label);
			domConstruct.place(label, toolbar.containerNode);

			label = domConstruct.create("label", {"for":"eventLimit",style:"vertical-align: middle;"});
			domConstruct.place(document.createTextNode("Capture limit:"), label);
			domConstruct.place(label, toolbar.containerNode);
			this._eventLimitBox = new TextBox({
				id: "eventLimit",
				style: "width:35px",
			});
			toolbar.addChild(this._eventLimitBox);
			
			
			var applyLimit = new Button({
				label: "Apply",
				title: "Apply capture limit",
				onClick: function(evt) {
					xhr.get({
						url: "debug/requests.jsp?" + self.getUISessionIdParam() + "&action=set&attr=limit&value=" + self._eventLimitBox.get('value'),
						load: reload
					});
				}
			});
			toolbar.addChild(applyLimit);
			
			this.addChild(toolbar);
		},
		refreshSettings: function() {
			var self = this;
			xhr.get({
				url: "debug/requests.jsp?" + self.getUISessionIdParam() + "&action=getSettings",
				handleAs: "json",
				load: function(response, ioArgs) {
					self._refreshing = true;
					self._enabled.set('value', response.enabled);
					self._eventLimitBox.set('value', response.limit);
					self._refreshing = false;
					return response;
				},
				error: function(response, ioArgs) {
					return response;
				}
			});
		},
		startup: function() {
			this.inherited(arguments);

			this.refreshSettings();
			topic.subscribe("uiSessionId", lang.hitch(this, function(data) {
				this.refreshSettings();
			}));
		}
	});
});
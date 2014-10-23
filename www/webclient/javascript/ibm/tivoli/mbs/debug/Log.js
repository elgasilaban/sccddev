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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/xhr","dojo/dom-construct","dojo/topic","dijit/layout/BorderContainer",
        "dijit/Toolbar","dijit/ToolbarSeparator","./FilteringGrid","dojo/data/ItemFileReadStore","dijit/form/Button","./LogSettingsDialog",
        "dijit/form/TextBox","./DetailPane","./UISessionIdMixin"],
		function(declare, lang, xhr, domConstruct, topic, BorderContainer, Toolbar, ToolbarSeparator, DataGrid,
				ItemFileReadStore, Button, LogSettingsDialog, TextBox, DetailPane, UISessionIdMixin)
{
	return declare("ibm.tivoli.mbs.debug.Exceptions", [BorderContainer, UISessionIdMixin], 
	{
		postCreate: function()
		{
			this.inherited(arguments);
			
			var self = this;

			var store = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/log.jsp?" + this.getUISessionIdParam()
			});

			var toolbar = new Toolbar({region: "top"});
			this.addChild(toolbar);

			var grid = new DataGrid({
				structure: [
					{width:'30px',name:'Lvl',field:'level',formatter: function(val) {
						var icon = null;
						switch(val) {
							case "ERROR":
								icon = "tpaeDebugError";
								break;
							case "WARNING":
								icon = "tpaeDebugWarning";
								break;
							case "INFO":
								icon = "tpaeDebugInfo";
								break;
							case "OK":
								icon = "tpaeDebugOk";
								break;
						}
						if(icon) {
							return "<div class=\"" + icon + "\" style=\"overflow:hide;\"></div>";
						} else {
							return val;
						}
					}},
					{width:'auto',name:'Message',field:'message'},
					{width:'160px',name:'Category',field:'category'},
					{width:'190px',name:'Timestamp',field:'timestamp',formatter: function(date) {
					    return dojo.date.locale.format(date, {datePattern: 'yyyy-MM-dd', timePattern: 'HH:mm:ss.SSSZ'});
					}}
				],
				autoWidth:false,
				autoHeight:false,
				singleClickEdit:false,
				columnReordering:false,
				selectable:false,
				delayScroll:false,
				sortInfo:4,
				store:store,
				region: "center",
				splitter: true,
				onSelected: function(row) {
					this.inherited("onSelected", arguments);
					var item = this.getItem(row);
					var detail = this.store.getValue(item, "detail");
					var source = this.store.getValue(item, "source");
					detailPane.setValue("Logged At: " + source + "\n" + (detail || "No detail"));
				}
			});
			this.addChild(grid);

			var detailPane = new DetailPane({
				region: "bottom",
				splitter: true,
				style: "height: 50%;padding:0px;",
				title: "Stacktrace for selected row"
			});
			this.addChild(detailPane);

			var reload = this.reload = function() {
				store.close();
				store.url = "debug/log.jsp?" + self.getUISessionIdParam();
				grid.setStore(store);
				detailPane.reset();
			};
			
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
						url: "debug/log.jsp?" + self.getUISessionIdParam() + "&action=clear",
						load: reload
					});
				}
			});
			
			toolbar.addChild(reloadButton);
			toolbar.addChild(clear);
			toolbar.addChild(new ToolbarSeparator());

			var settings = new Button({
				label: "Settings",
				title: "Change log threshold settings",
				onClick: function(evt) {
					new LogSettingsDialog({
						levels: self.levels,
						uiSessionIdParam: self.getUISessionIdParam(),
						onHide: function() {
							this.destroyRecursive(); 
						}
					}).show();
				}
			});
			toolbar.addChild(settings);

			label = domConstruct.create("label", {"for":"execeptionLimit",style:"vertical-align: middle;"});
			domConstruct.place(document.createTextNode("Capture limit:"), label);
			domConstruct.place(label, toolbar.containerNode);
			this._exceptionLimitBox = new TextBox({
				id: "execeptionLimit",
				style: "width:35px",
			});
			toolbar.addChild(this._exceptionLimitBox);


			var applyLimit = new Button({
				label: "Apply",
				title: "Apply capture limit",
				onClick: function(evt) {
					xhr.get({
						url: "debug/log.jsp?" + self.getUISessionIdParam() + "&action=set&attr=limit&value=" + self._exceptionLimitBox.get('value'),
						load: reload
					});
				}
			});
			toolbar.addChild(applyLimit);
		},
		refreshSettings: function() {
			var self = this;
			xhr.get({
				url: "debug/log.jsp?" + self.getUISessionIdParam() + "&action=getSettings",
				handleAs: "json",
				load: function(response, ioArgs) {
					self._exceptionLimitBox.set('value', response.limit);
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
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
define("ibm/tivoli/mbs/debug/Widgets", ["dojo/_base/lang","dojo/_base/declare","dojo/_base/xhr","dojo/dom-construct","dijit/layout/BorderContainer",
        "dijit/layout/ContentPane","dijit/Toolbar","dijit/ToolbarSeparator","dijit/Tree","./FilteringGrid","dojo/data/ItemFileReadStore",
        "dijit/tree/ForestStoreModel","dijit/form/Button","./UISessionIdMixin"],
		function(lang, declare, xhr, domConstruct, BorderContainer, ContentPane, Toolbar, ToolbarSeparator, Tree, DataGrid, 
				ItemFileReadStore, ForestStoreModel, Button, UISessionIdMixin)
{
	return declare("ibm.tivoli.mbs.debug.Widgets", [BorderContainer, UISessionIdMixin], 
	{
		postCreate: function()
		{
			this.inherited(arguments);

			var widgetStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/widgets.jsp?" + this.getUISessionIdParam()
			});
			var widgetStoreModel = new ForestStoreModel({
				rootLabel: "Root",
				store: widgetStore
			});
			var widgetPropertiesStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/widgetProperties.jsp?" + this.getUISessionIdParam()
			});

			var self = this;

			var widgets = new Tree({
				splitter: true, 
				region: "leading",
				style: "overflow: auto;width: 50%;padding:0px;",
				showRoot: false,
				autoExpand: false,
				model: widgetStoreModel,
				getIconClass: function(item, opened) {
					var icon = "tpaeDebugComponent";
					if(!item || item == this.model.root)
					{
						icon = "dijitIconFolder";
					}
					else if(widgetStore.getValue(item, "currentPage"))
					{
						icon = "tpaeDebugPageCurrent";
					}
					else if(widgetStore.getValue(item, "type") == "app")
					{
						icon = "tpaeDebugApp";
					}
					else if(widgetStore.getValue(item, "type") == "page")
					{
						icon = "tpaeDebugPage";
					}
					else if(widgetStore.getValue(item, "type") == "control")
					{
						icon = "tpaeDebugControl";
					}
					return icon;
				},
				onClick: function(item,node) {
					this.inherited("onClick", arguments);
					widgetPropertiesStore.url = "debug/widgetProperties.jsp?" + self.getUISessionIdParam() + "&type="+ item.type + "&widgetId=" + item.widgetId;
					widgetPropertiesStore.close();
					widgetProperties.setStore(widgetPropertiesStore);
				}
			});
			this.addChild(widgets);
			
			var widgetProperties = new DataGrid({
				splitter: true,
				region: "center",
				structure: [
					{width:'200px',name:'Property',field:'property'},
					{width:'auto',name:'Value',field:'value'}
				],
				autoWidth:false,
				autoHeight:false,
				singleClickEdit:false,
				columnReordering:false,
				sortInfo:1,
				store:widgetPropertiesStore,
			});
			this.addChild(widgetProperties);

			var toolbar = new Toolbar({region: "top"});
			
			var reload = this.reload = function() {
				widgetPropertiesStore.close();
				widgetPropertiesStore.url = "debug/widgetProperties.jsp?" + self.getUISessionIdParam();
				widgetProperties.setStore(widgetPropertiesStore);

				widgetStore.close();
				widgetStore.url = "debug/widgets.jsp?" + self.getUISessionIdParam();
				widgets._itemNodesMap = {};
				widgets.rootNode.state = "UNCHECKED";
				widgets.model.root.children = null;
				widgets.rootNode.destroyRecursive();
				widgets.model.constructor(widgets.model);
				widgets.postMixInProperties();
				widgets._load();
			};
			
			var reloadButton = new Button({
				label: "Refresh",
				showLabel: false,
				iconClass: "tpaeDebugRefresh",
				onClick: reload
			});
			toolbar.addChild(reloadButton);

			toolbar.addChild(new ToolbarSeparator());
			
			var snapshot = new Button({
				label: "Take a snapshot",
				title: "Take a snapshot of the current controls and components and their properties and download it as a zip file",
				iconClass:"dijitEditorIcon dijitEditorIconSave",
				onClick: function() { window.location = "debug/widgets.jsp?" + self.getUISessionIdParam() + "&snapshot=true"; }
			});
			toolbar.addChild(snapshot);
			
			this.addChild(toolbar);
		}
	});
});
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
define(["dojo/_base/declare","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/Toolbar","dijit/ToolbarSeparator",
        "dojo/data/ItemFileReadStore","dijit/form/Button","./UISessionIdMixin","dijit/tree/ForestStoreModel","dijit/Tree","./FilteringGrid"], 
		function(declare, BorderContainer, ContentPane, Toolbar, ToolbarSeparator, ItemFileReadStore, Button,
				UISessionIdMixin, ForestStoreModel, Tree, DataGrid)
{
	return declare("ibm.tivoli.mbs.debug.Databeans", [BorderContainer, UISessionIdMixin], 
	{
		postCreate: function()
		{
			this.inherited(arguments);
			var self = this;

			var beanStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/databeans.jsp?" + this.getUISessionIdParam()
			});
			var beanStoreModel = new ForestStoreModel({
				rootLabel: "Root",
				store: beanStore
			});
			var beanPropertiesStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/databeans.jsp?" + this.getUISessionIdParam() + "&properties=true"
			});

			var beans = new Tree({
				region: "leading",
				splitter: true, 
				style: "overflow: auto;width: 50%;padding:0px;",
				showRoot: false,
				autoExpand: false,
				model: beanStoreModel,
				getIconClass: function(item, opened) {
					var icon = "tpaeDebugComponent";
					if(!item || item == this.model.root)
					{
						icon = "dijitIconFolder";
					}
					else if(beanStore.getValue(item, "mboset"))
					{
						icon = "tpaeDebugMboSet";
					}
					else if(beanStore.getValue(item, "loaded"))
					{
						icon = "tpaeDebugLoaded";
					}
					else
					{
						icon = "tpaeDebugNotLoaded";
					}
					return icon;
				},
				onClick: function(item,node) {
					this.inherited("onClick", arguments);
					if (beanStore.getValue(item, "mboset"))
					{
						// we're showing mboset data (it's a start, but right now it only shows one record's worth... and in the wrong format)

						/* 
						
						this whole block isn't quite right... we want to show all the mbo data, but right now we just show the first record as
						if it were a set of properties - we're using property, value as the column headers instead of redefining the DataGrid
						to have all the attributes as column headers, and filling the grid with an array of all the rows of data.
						
						couple problems:
						1. not sure if we can redefine the structure of the beanProperties datagrid at runtime... if we can we should probably not
							call it beanProperties anymore since it'll be used for mboset data and for properties.  we want the structure for the 
							mboset data to be based on the attributes[] for the bean
						2. i think we might want to use a different store for mboset data instead of trying to use the beanPropertiesStore... 
							and that new store would be built dynamically based on the attributes[] for the bean - as would the headers for the 
							grid structure
						*/

						beanPropertiesStore.url = "debug/databeans.jsp?" + self.getUISessionIdParam() + "&mboset=true&beanId=" + item.beanId;
						beanPropertiesStore.close();
						beanProperties.setStore(beanPropertiesStore);
					}
					else
					{
						// we're showing properties
						beanPropertiesStore.url = "debug/databeans.jsp?" + self.getUISessionIdParam() + "&properties=true&beanId=" + item.beanId;
						beanPropertiesStore.close();
						beanProperties.setStore(beanPropertiesStore);
					}
				}
			});
			this.addChild(beans);
				
			var beanProperties = new DataGrid({
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
				store:beanPropertiesStore,
			});
			this.addChild(beanProperties);
			
			var toolbar = new Toolbar({region: "top", splitter:false});

			var reload = this.reload = function() {
				beanPropertiesStore.close();
				beanPropertiesStore.url = "debug/databeans.jsp?" + self.getUISessionIdParam() + "&properties=true";
				beanProperties.setStore(beanPropertiesStore);

				beanStore.close();
				beanStore.url = "debug/databeans.jsp?" + self.getUISessionIdParam();
				beans._itemNodesMap = {};
				beans.rootNode.state = "UNCHECKED";
				beans.model.root.children = null;
				beans.rootNode.destroyRecursive();
				beans.model.constructor(beans.model);
				beans.postMixInProperties();
				beans._load();
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
				title: "Take a snapshot of the current databeans and their properties and download it as a zip file.",
				iconClass:"dijitEditorIcon dijitEditorIconSave",
				onClick: function() { window.location = "debug/databeans.jsp?" + self.getUISessionIdParam() + "&snapshot=true"; }
			});
			
			toolbar.addChild(snapshot);
			
			this.addChild(toolbar);
		}
	});
});
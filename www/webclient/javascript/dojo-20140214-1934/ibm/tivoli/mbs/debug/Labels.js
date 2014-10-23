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
define("ibm/tivoli/mbs/debug/Labels", ["dojo/_base/declare","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/Toolbar","./FilteringGrid",
        "dojo/data/ItemFileReadStore","dijit/form/Button","./UISessionIdMixin"], 
		function(declare, BorderContainer, ContentPane, Toolbar, DataGrid, ItemFileReadStore, Button, UISessionIdMixin)
{
	return declare("ibm.tivoli.mbs.debug.Labels", [BorderContainer, UISessionIdMixin], 
	{
		postCreate: function()
		{
			this.inherited(arguments);
			var self = this;
			
			var labelsStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/labels.jsp?" + this.getUISessionIdParam()
			});

			var labelsGrid = new DataGrid({
				structure: [
					{width:'40px', name:'#', field:'idx', datatype:'number'},
					{width:'350px', name:'ID', field:'id'},
					{width:'150px', name:'Property', field:'property'},
					{width:'auto', name:'Value', field:'value'}
				],
				autoWidth:false,
				autoHeight:false,
				singleClickEdit:false,
				columnReordering:false,
				sortInfo:1,
				store:labelsStore,
				region: "center"
			});
			this.addChild(labelsGrid);

			var toolbar = new Toolbar({region: "top"});
			
			var reload = new Button({
				label: "Refresh",
				showLabel: false,
				iconClass: "tpaeDebugRefresh",
				onClick: function(evt) {
					labelsGrid.selection.clear();
					labelsStore.close();
					labelsStore.url = "debug/labels.jsp?" + self.getUISessionIdParam();
					labelsGrid.setStore(labelsStore);
				}
			});
			
			toolbar.addChild(reload);
			
			this.addChild(toolbar);
		}
	});
});
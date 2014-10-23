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
define(["dojo/_base/lang","dojo/_base/declare","dojo/_base/xhr","dojo/dom-construct","dojo/_base/connect","dijit/layout/BorderContainer",
        "dijit/layout/TabContainer","dijit/layout/ContentPane","dijit/Toolbar","dijit/ToolbarSeparator",
        "dijit/DropDownMenu","dijit/MenuItem","dijit/form/DropDownButton",
        "./FilteringGrid","dojo/data/ItemFileReadStore","dijit/form/Button","dijit/Tooltip","./UISessionIdMixin",
        "./ImportDialog",], 
		function(lang, declare, xhr, domConstruct, connect, BorderContainer, TabContainer, ContentPane, Toolbar, ToolbarSeparator,
				DropDownMenu, MenuItem, DropDownButton, DataGrid, ItemFileReadStore, Button, Tooltip, UISessionIdMixin, ImportDialog)
{
	var selectLabel = "Select an application to see its details.";

	function resetLabel(node) {
		var initialXML = domConstruct.create("span", {style: "color: #666"});
		domConstruct.place(document.createTextNode(selectLabel), initialXML);
		domConstruct.place(initialXML, node, "only");
	}

	return declare("ibm.tivoli.mbs.debug.Applications", [BorderContainer, UISessionIdMixin], 
	{
		_currentAppId: null,

		postCreate: function()
		{
			this.inherited(arguments);

			var self = this;

			var presentationStore = new ItemFileReadStore({
				clearOnClose: true,
				url: "debug/presentations.jsp?" + this.getUISessionIdParam()
			});

			var load = function()
			{
				xhr.get({
					url: "debug/presentation.jsp?" + self.getUISessionIdParam() + "&appId=" + self._currentAppId,
					handleAs: "text",
					load: function(result) {
						domConstruct.place(document.createTextNode(result), presentationXML, "only");
					}
				});
				xhr.get({
					url: "debug/erm.jsp?" + self.getUISessionIdParam() + "&appId=" + self._currentAppId,
					handleAs: "text",
					load: function(result) {
						domConstruct.place(document.createTextNode(result), ermXML, "only");
					}
				});
			};
			
			var toolbar = new Toolbar({region: "top"});
			this.addChild(toolbar);
			
			var reset = function() {
				resetLabel(presentationXML);
				resetLabel(ermXML);
				openApp.set('disabled', true);
				download.set('disabled', true);
				unload.set('disabled', true);
			};

			var reload = this.reload = function() {
				presentationGrid.selection.clear();
				presentationStore.close();
				presentationStore.url = "debug/presentations.jsp?" + self.getUISessionIdParam();
				presentationGrid.setStore(presentationStore);
			};
			
			var reloadAppList = new Button({
				label: "Refresh",
				showLabel: false,
				iconClass: "tpaeDebugRefresh",
				onClick: reload
			});
			toolbar.addChild(reloadAppList);

			toolbar.addChild(new ToolbarSeparator());

			var showImportDialog = function(evt) { 
				new ImportDialog({
						style: "width: 300px",
						uiSessionIdParam: self.getUISessionIdParam(),
						onHide: function() {
							this.destroyRecursive(); 
						}
					}
				).show();
			};
			
			var importButton = new Button({
				label: "Import presentation",
				showLabel: false,
				iconClass: "tpaeDebugImport",
				onClick: lang.hitch(self, showImportDialog)
			});
			toolbar.addChild(importButton);
			
			this.importPresentation = function(evt) {
				importButton.focus();
				showImportDialog();
			};

			toolbar.addChild(new ToolbarSeparator());

			var downloadAllMenu = new DropDownMenu({ style: "display: none;"});
			var allXmls = new MenuItem({
				label: "Xmls",
				onClick: function() { window.location = "debug/presentations.jsp?" + self.getUISessionIdParam() + "&download=true"; }
			});
			downloadAllMenu.addChild(allXmls);

			var allSqls = new MenuItem({
				label: "Sqls/Oras",
				onClick: function() { window.location = "debug/presentations.jsp?" + self.getUISessionIdParam() + "&download=true&format=sql"; }
			});
			downloadAllMenu.addChild(allSqls);

			var downloadAll = new DropDownButton({
				label: "Download",
				showLabel: false,
				iconClass:"dijitEditorIcon dijitEditorIconSave",
				dropDown: downloadAllMenu
			});
			toolbar.addChild(downloadAll);
			
			var presentationXML = domConstruct.create("pre");
			var ermXML = domConstruct.create("pre");
			
			var presentationGrid = new DataGrid({
				structure: [
					{width:'auto', name:'App', field:'id'},
					{width:'35px', name:'C', tooltip:'XML is Cached', field:'cached', datatype: 'boolean' },
					{width:'35px', name:'E', tooltip:'Currently being edited in Application Designer', field:'editing', datatype: 'boolean' },
				],
				autoWidth:false,
				autoHeight:false,
				singleClickEdit:false,
				columnReordering:false,
				sortInfo:1,
				store:presentationStore,
				region: "leading",
				splitter: true,
				selectionMode: "single",
				style: "width:235px;",
				onSelected: function(row) {
					this.inherited("onSelected", arguments);
					self._currentAppId = this.store.getValue(this.getItem(row), "id");
					openApp.set('disabled', false);
					download.set('disabled', false);
					unload.set('disabled', false);
					load();
				},
				onDeselected: function(row) {
					this.inherited("onSelected", arguments);
					reset();
				},
				startup: function() {
					connect.connect(this, "onHeaderCellMouseOver", function(e) {
						if(e.cell.tooltip) {
							Tooltip.show(e.cell.tooltip, e.cellNode);
						}
					});
					connect.connect(this, "onHeaderCellMouseOut", function(e) {
						Tooltip.hide(e.cellNode);
					});
				}
			});
			this.addChild(presentationGrid);

			var content = new BorderContainer({
				region: "center",
				splitter: true
			});
			this.addChild(content);
			
			var appToolbar = new Toolbar({region: "top"});
			content.addChild(appToolbar);
			
			var openApp = new Button({
				label: "Open",
				disabled: true,
				showLabel: false,
				iconClass: "tpaeDebugOpen",
				onClick: function() { window.open("/maximo/ui/?event=loadapp&value=" + self._currentAppId + "&" + self.getUISessionIdParam(), "_blank"); }
			});
			appToolbar.addChild(openApp);

			appToolbar.addChild(new ToolbarSeparator());
			
			var downloadMenu = new DropDownMenu({ style: "display: none;"});
			var appXML = new MenuItem({
				label: "Xml",
				onClick: function() { window.location = "debug/presentation.jsp?" + self.getUISessionIdParam() + "&download=true&appId=" + self._currentAppId; }
			});
			downloadMenu.addChild(appXML);

			var appSQL = new MenuItem({
				label: "Sql/Ora",
				onClick: function() { window.location = "debug/presentation.jsp?" + self.getUISessionIdParam() + "&download=true&format=sql&appId=" + self._currentAppId; }
			});
			downloadMenu.addChild(appSQL);

			var download = new DropDownButton({
				label: "Download",
				showLabel: false,
				iconClass:"dijitEditorIcon dijitEditorIconSave",
				disabled: true,
				dropDown: downloadMenu
			});
			appToolbar.addChild(download);

			appToolbar.addChild(new ToolbarSeparator());
			
			var unloadMenu = new DropDownMenu({ style: "display: none;"});
			var unloadDescriptor = new MenuItem({
				label: "Descriptor",
				onClick: function(evt) {
					xhr.get({
						url: "debug/presentations.jsp?appId=" + self._currentAppId + "&unload=true",
						handleAs: "text",
					});
				}
			});
			unloadMenu.addChild(unloadDescriptor);

			var unloadDescriptor = new MenuItem({
				label: "Cached xml",
				onClick: function(evt) {
					xhr.get({
						url: "debug/presentations.jsp?appId=" + self._currentAppId + "&uncacheXML=true",
						handleAs: "text",
					});
				}
			});
			unloadMenu.addChild(unloadDescriptor);

			var unload = new DropDownButton({
				label: "Unload",
				disabled: true,
				dropDown: unloadMenu
			});
			appToolbar.addChild(unload);
			
			var tabs = new TabContainer({
				region: "center",
				splitter: true
			});
			content.addChild(tabs);
			
			var presentationTab = new ContentPane({
				title: "Presentation",
			});
			presentationTab.containerNode.appendChild(presentationXML);
			resetLabel(presentationXML);
			tabs.addChild(presentationTab);

			var ermTab = new ContentPane({
				title: "ERM",
			});
			ermTab.containerNode.appendChild(ermXML);
			resetLabel(ermXML);
			tabs.addChild(ermTab);
		}
	});
});
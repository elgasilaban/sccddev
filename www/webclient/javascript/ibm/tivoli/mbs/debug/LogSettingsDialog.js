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
define(["dojo/_base/declare","dojo/_base/xhr","dojo/dom-construct","dojo/dom-style","dijit/Toolbar","dijit/form/Button","dijit/Dialog",
        "dijit/layout/BorderContainer","dojo/data/ItemFileWriteStore","./FilteringGrid","dojox/grid/cells/dijit"], 
		function(declare, xhr, domConstruct, style, Toolbar, Button, Dialog, BorderContainer, ItemFileWriteStore, DataGrid)
{
	return declare("ibm.tivoli.mbs.debug.LogSettingsDialog", Dialog, 
	{
		title: "Log Settings",
		
		postCreate: function() {
			this.inherited(arguments);

			var self = this;
			
			var levelOptions = ["inherited"];
			for(var i = 0; i < this.levels.length; i++) {
				levelOptions.push(this.levels[i]);
			}
			var levelValues = [undefined];
			for(var i = 0; i < this.levels.length; i++) {
				levelValues.push(this.levels[i]);
			}
			
			var categoryStore = new ItemFileWriteStore({
				clearOnClose: true,
				url: "debug/log.jsp?action=getCategories&" + this.uiSessionIdParam,
			});
			categoryStore._saveCustom = function(saveComplete, saveFailed) {
				for(var i in this._pending._modifiedItems){
					var item = null;
					if(this._itemsByIdentity) {
						item = this._itemsByIdentity[i];
					} else {
						item = this._arrayOfAllItems[i];
					}
					xhr.get({
						url: "debug/log.jsp?" + self.uiSessionIdParam + "&action=set&attr=level&category=" + item.path + "&value=" + item.level,
					});
				}
				saveComplete();
			};

			var content = this._content = new BorderContainer({
				style: "width:400px;height:300px"
			});
			this.containerNode.appendChild(content.domNode);
			
			var categories = new DataGrid({
				region: 'center',
				structure: [
					{name:'Category', field:'path', width:'auto'},
					{name:'Level', field:'level', width:'100px', editable:true, type:dojox.grid.cells.ComboBox, options:levelOptions, values:levelValues}
				],
				singleClickEdit: true,
				sortInfo:1,
				store:categoryStore
			});

			content.addChild(categories);

			var save = new Button({
				region: "bottom",
				label: "Save",
				onClick: function() {
					categoryStore.save();
					self.hide();
				}
			});
			content.addChild(save);
		},
		startup: function() {
			this._content.startup();
		}
	});
});
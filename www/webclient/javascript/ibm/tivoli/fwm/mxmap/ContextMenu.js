/*
 * IBM Confidential
 * 
 * OCO Source Materials
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.ContextMenu");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.Menu");
/**
 * Implement the logic for showing and executing the context menu over the map.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.ContextMenu", ibm.tivoli.fwm.mxmap._Base, {
	divId: null,
	map: null,
	compId:null,
	_contextMenu: null,
	_emptyContextMenu: null,
	_currentCtxMenu:null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.map.click.addHandler(this._onClick,this);
		this.map.rightclick.addHandler(this._onRightClick,this);

		dojo.create("div", {
			id: "popUpCtx"
		}, dojo.byId(this.divId));
		dojo.create("div", {
			id: "popUpEmptyCtx"
		}, dojo.byId(this.divId));
		this._contextMenu = new dijit.Menu({
			targetNodeIds: [ "popUpCtx" ]
		});
		this._currentCtxMenu=this._contextMenu;
		this._emptyContextMenu = new dijit.Menu({
			targetNodeIds: [ "popUpEmptyCtx" ]
		});
		var menuItem = new dijit.MenuItem({
			label: ibm.tivoli.fwm.i18n.getMaxMsg("map","no_actions_available_label"),
			onClick: dojo.hitch(this, function()
			{
				console.log("nothing to be done");
			})
		});
		this._emptyContextMenu.addChild(menuItem);
		this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_" + this.compId, dojo.hitch(this, this.serverUpdated)));
		
	},
	serverUpdated:function(data){
		console.log("ctx menu",data);
		if(data && data.gisdata && data.gisdata.flags && data.gisdata.flags.readonly==true){
			this._currentCtxMenu=this._emptyContextMenu;
		}else{
			this._currentCtxMenu=this._contextMenu;
		}
	},

	/**
	 * on map click outside the menu, we close the opened menu
	 */
	_onClick: function(event_name, evt, event_args)
	{
		dijit.popup.close(this._currentCtxMenu);
	},
	/**
	 * Context menu args like map location where the menu was opened
	 */
	_contextArgs: {
		mapLocation: {}
	},
	/**
	 * Executed when user right clicks the map in order to show the context menu
	 */
	_onRightClick: function(event_name, evt, event_args)
	{
		dijit.popup.close(this._currentCtxMenu);
		var point = event_args.location;
		var divPosition = dojo.position(dojo.byId(this.divId), true);					
		var x = event_args.pixel.x + divPosition.x;
		var y = event_args.pixel.y + divPosition.y;				
		this._contextArgs = {
			mapLocation: point
		};
		dijit.popup.open({
			popup: this._currentCtxMenu,
			x: x,
			y: y,
			onExecute: dojo.hitch(this, function(ag)
			{
				dijit.popup.close(this._currentCtxMenu);
			}),
			onCancel: function(ag)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("cancel", ag);
				}
			},
			orient: 'L'
		});
	},
	/**
	 * If an menu item is execute we must call the menu controller method
	 */
	_executeAction: function(action)
	{
		action.execute(this._contextArgs);
	},
	/**
	 * Adds a new Action into the menu. Action must be a
	 * ibm.tivoli.fwm.mxmap.actions.Actions
	 */
	addChild: function(action)
	{
		var menuItem = new dijit.MenuItem({
			label: action.label,
			onClick: dojo.hitch(this, function()
			{
				this._executeAction(action);
			})
		});
		this._contextMenu.addChild(menuItem);
	},
	/**
	 * Destroy the map handlers /TODO must be moved to _Base
	 */
	destroyRecursive: function()
	{
		dijit.popup.close(this._contextMenu);
		dijit.popup.close(this._emptyContextMenu);
		this.map.click.removeHandler( this.onClick,this);
		this.map.rightclick.removeHandler(this.onRightClick,this);
		
	}

});
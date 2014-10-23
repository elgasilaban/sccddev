/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.ItineraryTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager");

/**
 * Mobile Info Panel tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.ItineraryTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
	label: "Show Itinerary",
	iconClass: "basicMapToolbarBtn itineraryMapToolbarBtn",
	map: null,
	_itineraryManager: null,
	_dialog:null,
	constructor: function(params)
	{
		
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarytool");
		this.label = _label || this.label;
		
		this._dialog = null;
		this._itineraryManager = new ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager({
			map: this.map
		});
		this.addSubscription(dojo.subscribe("showItinerary_"+this.map.getId(), dojo.hitch(this, this.triggerShowItinerary)));
	},
	triggerShowItinerary:function(){
		this.execute();
	},
	execute: function()
	{
		if (this._dialog)
		{
			this._dialog.close();
			this._dialog = null;
		}
		var routeManager = this.map.getMultipleRoutesManager();
		if (routeManager && routeManager.routes && routeManager.routes[0])
		{
			var currentItinerary = routeManager.routes[0].itinerary;
			if (currentItinerary)
			{
				this._itineraryManager.updateRouteItinerary(currentItinerary, routeManager, routeManager.routes[0]);
			}
		}
		this._itineraryManager.showPanel();
	},
	disable: function()
	{
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
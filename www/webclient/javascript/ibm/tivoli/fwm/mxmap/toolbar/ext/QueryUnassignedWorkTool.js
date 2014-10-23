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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");

/**
 * Query unassigned work tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "Unassigned Work Orders",
	iconClass: "basicMapToolbarBtn unassignedWorkOrderMapToolbarBtn",
	map: null,
	layerLabel: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "unassignedworktool");
		this.label = _label || this.label;
		this.addSubscription(dojo.subscribe("onQueryUnassignedWorkResult_" + this.map.getId(), dojo.hitch(this, this.queryReturned)));
		this.addSubscription(dojo.subscribe("onWorkAssigned_" + this.map.getId(), dojo.hitch(this, this.onWorkAssigned)));
		this.addSubscription(dojo.subscribe("onQueryUnassignedWorkCancel_" + this.map.getId(), dojo.hitch(this, this.cancelQuery)));
	},
	onWorkAssigned: function(data)
	{
		console.log("assigned!",data);
		
		if (this.isActive() == true)
		{
			dojo.publish("removeRecordsFromLayer_" + this.map.getId(), [ this.layerLabel, [data]]);	
		}
	},
	_lastQueryData: null,
	_lastQueryBounds: null,
	// Enables the Unassigned Work Orders tool (show unassigned work orders)
	executeOn: function()
	{
		this._lastQueryBounds = this.map.getMapstraction().getBounds();
		this.map.getMaximo().showQueryUnassignedWorkDialog(this._lastQueryBounds);
	},
	// Disables the Unassigned Work Orders tool (hides unassigned work orders)
	executeOff: function()
	{
		this._clearUnassignedLayer();
	},
	_clearUnassignedLayer: function()
	{
		if (this.layerLabel != null)
		{
			dojo.publish("removeLayer_" + this.map.getId(), [ this.layerLabel ]);
		}
	},
	// Handles the response from the server when the OK button is clicked
	queryReturned: function(data, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if(data==null){
			if (!isAutomaticRefresh)
			{
				this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
				this.setActive(false);
			}
			return;
		}
		this._lastQueryData = data.queryData;
		// If records were found, sends an event to create a layer and display
		// the records
		if (data.records.length == 0 && (!data.spatialEnabledRecords || data.spatialEnabledRecords.length == 0))
		{
			if (!isAutomaticRefresh)
			{
				if (data.error)
				{
					this.map.getMaximo().showMessage(data.error.group, data.error.key, [ data.error.params ]);
				}
				else
				{
					this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
				}
				this.setActive(false);
			}
		}
		else
		{
			this.layerLabel = data.layerLabel;
			if (data.spatialEnabledRecords != null && data.spatialEnabledRecords.length > 0)
			{
				var fct = function(mbos, errors)
				{
					console.log("mbos", mbos, errors);
					var records = data.records.concat(mbos);
					if (records.length == 0)
					{
						if (!isAutomaticRefresh)
						{
							this.setActive(false);
							this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
						}
					}
					else
					{
						this._addDefaultMarkerInfo(records);
						dojo.publish("addRecordsToLayer_" + this.map.getId(), [ data.layerLabel, records, true, null, null, avoidLayerEnabled ]);
					}
				};
				// handle spatial records
				this.map.filterRecordsInMapView(data.spatialEnabledRecords, dojo.hitch(this, fct));

			}
			else
			{
				var records = data.records;
				this._addDefaultMarkerInfo(records);
				dojo.publish("addRecordsToLayer_" + this.map.getId(), [ data.layerLabel, records, true, null, null, avoidLayerEnabled ]);
			}
		}

	},
	_addDefaultMarkerInfo: function(records)
	{
		var defaultUnassignedMarker = {
			"url": "../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/symbology/workorder/map_WO_Unassigned.png",
			"offsetx": 24,
			"offsety": 36,
			"width": 47,
			"height": 36
		};
		for ( var i in records)
		{
			records[i].ownDefaultMarker = defaultUnassignedMarker;
		}
	},
	// Handles the response from the server when the cancel button is clicked
	cancelQuery: function(data)
	{
		this.setActive(false);
	},
	disable: function()
	{
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
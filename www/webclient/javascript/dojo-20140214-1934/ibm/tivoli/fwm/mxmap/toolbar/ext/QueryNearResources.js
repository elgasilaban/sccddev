//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/QueryNearResources", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");

/**
 * Query unassigned work tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "Nearby resources",
	iconClass: "basicMapToolbarBtn nearbyResourcesMapToolbarBtn",
	map: null,
	nearbyCrewsLabel: "",
	nearbyLaborsLabel: "",
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearresourcestool");
		this.label = _label || this.label;
		this.nearbyCrewsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbycrews");
		this.nearbyLaborsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbylabors");

		this.addSubscription(dojo.subscribe("onMapRefresh_" + this.map.getId(), dojo.hitch(this, this._onMapRefresh)));
	},
	updateLayers: function(crewsData, laborsData, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if (crewsData && crewsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyCrewsLabel, crewsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
		}
		if (laborsData && laborsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyLaborsLabel, laborsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		}
		if (isAutomaticRefresh != true && laborsData.length == 0 && crewsData.length == 0)
		{
			this.setActive(false);
			this.map.getMaximo().showMessage("mapserver", "noresourcesinarea");
		}
	},
	disable: function()
	{

	},
	destroy: function()
	{
		this.destroyRecursive();
	},
	// util method - gets an array of gis data to send to spatial for conversion
	// returns null if records is null or any record in records does not have
	// gisdata.
	_getGISData: function(records)
	{
		var array = [];
		if (records)
		{
			for ( var index in records)
			{
				if (records[index].gisdata)
				{
					array.push(records[index].gisdata);
				}
				else
				{
					console.warn("[QueryNearResouces] Records has a record without gisdata.", records);
					return null;
				}
			}
		}
		else
		{
			console.warn("[QueryNearResouces] Records has a record without gisdata.", records);
			return null;
		}
		return array;
	},

	// util function to add the records in the new layer.
	_sendEventToLayer: function(layerName, layerData, avoidLayerEnabled)
	{
		dojo.publish("addRecordsToLayer_" + this.map.getId(), [ layerName, layerData, true, null, null, avoidLayerEnabled ]);
	},
	_sendEventToRemoveLayer: function(layerName)
	{
		dojo.publish("removeLayer_" + this.map.getId(), [ layerName ]);
	},
	// Enables the Nearby Resources tool (show nearby resources)
	executeOn: function(refreshOptions)
	{
		var fct = function(data)
		{
			if (data.status == "TOOMANYRECORDS")
			{
				this.map.getMaximo().showMessage(data.error.group, data.error.key, [data.error.params]);
				return;
			}
			var crewsData = data.crews;
			var laborsData = data.labors;

			/*
			 * just a small perf improvement to cache all the LBS points
			 * conversion to current coordsystem at once
			 */
			var toProject = this._getGISData(crewsData);
			toProject.join(this._getGISData(laborsData));
			if (toProject.length > 0)
			{
				this.map.getMapstraction().getAllPointsFromWGS84(toProject, dojo.hitch(this, function()
				{
					/*
					 * do not update the crews/labor data. Map is aware these
					 * are WGS84 if we convert it here, it will get converted
					 * again later in the code, so we need to keep it in wgs84
					 */
					this.updateLayers(crewsData, laborsData, refreshOptions);
				}), dojo.hitch(this, function(error)
				{
					if (error && error.msgkey)
					{
						this.map.getMaximo().showMessage(error.msggroup, error.msgkey);
					}
				}));
			}
			else
			{
				this.updateLayers(crewsData, laborsData, refreshOptions);
			}

		};

		var fctErr = function(data)
		{
			console.warn("[QueryNearResources] Error querying nearby resources", data);
		};

		var bounds = this.map.getMapstraction().getBounds();
		var auxFct = function(ps)
		{
			var xlatedBounds = new mxn.BoundingBox(ps[0].lat, ps[0].lon, ps[1].lat, ps[1].lon);
			this.map.getMaximo().getCrewLaborByCoords(dojo.hitch(this, fct), dojo.hitch(this, fctErr), xlatedBounds);
		};
		// resources always use LBS that is in wgs84 so we need to convert the
		// boundaries to this coordinate system
		this.map.getMapstraction().getAllPointsInWGS84([ bounds.sw, bounds.ne ], dojo.hitch(this, auxFct));
	},
	// Disables the Nearby Resources tool (hides nearby resources)
	executeOff: function()
	{
		this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
	},
	_onMapRefresh: function(refreshOptions)
	{
		if (this.isActive() == true)
		{
			this.executeOff();
			this.executeOn(refreshOptions);
		}
	}
});
});

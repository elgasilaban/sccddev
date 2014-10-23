//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/layers/LayersManager", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/layers/Layer,ibm/tivoli/fwm/mxmap/layers/SymbologyLayer,ibm/tivoli/fwm/mxmap/layers/LegendLayer,ibm/tivoli/fwm/mxmap/layers/TrafficLayer,ibm/tivoli/fwm/mxmap/layers/RouteLayer,ibm/tivoli/fwm/mxmap/ImageLibraryManager,ibm/tivoli/fwm/mxmap/layers/VirtualLayer"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayersManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.layers.Layer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LegendLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.TrafficLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.RouteLayer");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.layers.VirtualLayer");

/**
 * Controls the map layers
 * 
 * Creates/removes layers based on the records added to them.<br>
 * Sets the records symbologies when added<br>
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayersManager", [ ibm.tivoli.fwm.mxmap._Base ], {
	_layers: null,
	_layersById: null,
	symbManager: null,
	_map: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._layers = [];
		this._layersById = [];
		this._map = options.map;
		this.addSubscription(dojo.subscribe("addRecordsToLayer_" + this._map.getId(), dojo.hitch(this, this.addRecordCustomLayer)));
		this.addSubscription(dojo.subscribe("removeRecordsFromLayer_" + this._map.getId(), dojo.hitch(this, this.removeRecordsFromLayer)));
		this.addSubscription(dojo.subscribe("removeLayer_" + this._map.getId(), dojo.hitch(this, this.removeLayerByName)));

	},
	addRecord: function(mboInfo, markerOptions)
	{
		var layer = this._getLayerForMbo(mboInfo);
		layer.addRecord(mboInfo, markerOptions);
	},
	removeRecord: function(mboInfo)
	{
		var layer = this._getLayerForMbo(mboInfo);
		layer.removeRecord(mboInfo);
	},
	// find layerid based on the objectname
	_getLayerForMbo: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		return this.getLayerForObjectName(mboName);
	},
	getLayerForObjectName: function(mboName)
	{

		var layer = this.getLayerById(mboName);
		if (layer == null)
		{
			// create Layer
			layer = new ibm.tivoli.fwm.mxmap.layers.Layer({
				layerId: mboName.toLowerCase(),
				layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
				symbManager: this.symbManager,
				map: this.map
			});
			this.addLayer(layer, false);
			layer.enable();
		}
		return layer;
	},
	getLayerIdForMbo: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		return this.getLayerForObjectName(mboName).getLayerId();
	},
	removeRecord: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		var layer = this.getLayerById(mboName);
		if (layer != null)
		{
			layer.removeRecord(mboInfo);
		}
	},
	addRecordCustomLayer: function(layerName, data, cleanBeforeAdd, layerId, childrenTitle, avoidLayerEnabled)
	{
		if (data.length > 0)
		{
			var virtualLayer = this.getLayerById(layerName);
			if (virtualLayer == null)
			{
				virtualLayer = new ibm.tivoli.fwm.mxmap.layers.VirtualLayer({
					layerId: layerName,
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.VIRTUAL_LAYER,
					symbManager: this.symbManager,
					map: this.map,
					objectType: data[0].mxdata.mboName
				});
			}
			this.resetLayer(virtualLayer, avoidLayerEnabled);

			for ( var i in data)
			{
				virtualLayer.addRecord(data[i]);
			}

		}
	},
	removeLayerByName: function(layerName, keepLayerEntry, layerId)
	{
		var _layer = this.getLayer(layerName);

		if (_layer)
		{
			_layer.removeMXRecordSetData();
			if (keepLayerEntry != true)
			{
				this._layers[layerName] = null;
				delete this._layers[layerName];
			}
		}

		if (layerId && this._layersById[layerId])
		{
			this._layersById[layerId] = null;
		}

	},
	removeLayer: function(layer)
	{
		delete this._layersById[layer.getLayerId()];
		delete this._layers[layer.getLayerName()];
	},
	addLayer: function(layer, cleanBeforeAdd)
	{
		var layerName = layer.getLayerName();
		var layerId = layer.getLayerId();
		if (dojo.config.fwm.debug == true)
		{
			console.log("[mxmap.layers.LayersManager.addLayer] LayerId: " + layerId);
		}
		var _layer = this.getLayer(layerName);
		if (_layer)
		{
			if (cleanBeforeAdd)
			{
				this.removeLayerByName(layerName, false, layerId);
			}
			_layer.addMXRecordSet(layer.getMXRecordSet());
		}
		else
		{
			this._layers[layerName] = layer;
			if (layerId)
			{
				this._layersById[layerId] = layer;
			}
		}
	},
	resetLayer: function(layer, avoidLayerEnabled)
	{
		var layerName = layer.getLayerName();
		var layerId = layer.getLayerId();
		var _layer = this.getLayer(layerName);
		if (_layer)
		{
			this.removeLayerByName(layerName, false, layerId);
		}
		if (layerName)
		{
			this._layers[layerName] = layer;
		}
		if (layerId)
		{
			this._layersById[layerId] = layer;
		}
		if (layer.isDisabled() && avoidLayerEnabled != true)
		{
			layer.enable();
		}

	},
	showLayer: function(layerName)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			layer.show();
		}
		else
		{
			console.warn("[LayersManager] Cannot show layer " + layerName + " because it was not found.");
		}
	},
	hideLayer: function(layerName)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			layer.hide();
		}
		else
		{
			console.warn("[LayersManager] Cannot hide layer " + layerName + " because it was not found.");
		}
	},
	getLayer: function(layerName)
	{
		if (this._layers.hasOwnProperty(layerName) == true)
		{
			return this._layers[layerName];
		}
		return null;
	},
	redrawMarkers: function()
	{
		for ( var index in this._layers)
		{
			this._layers[index].redrawMarkers();
		}
	},
	getLayerById: function(layerId)
	{
		layerId = layerId.toLowerCase();

		for (id in this._layersById)
		{
			var idLowerCase = id.toLowerCase();
			if (idLowerCase == layerId)
			{
				return this._layersById[id];
			}
		}
		return null;
	},
	/* returns an array with all the existing layers */
	getLayers: function()
	{
		var array = [];
		for ( var index in this._layers)
		{
			array.push(this._layers[index]);
		}
		return array;
	},
	removeRecordsFromLayer: function(layerName, data)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			for ( var index in data)
			{
				layer.removeRecord(data[index]);
			}
		}
		else
		{
			console.log("[LayerManager] Layer " + layerName + " not found to remove records.");
		}
		this._map.refreshMap();
	},
	_getLayerByIdOrDefaultForMbo: function(layerId, mboInfo)
	{
		if (layerId)
		{
			return this.getLayerById(layerId);
		}
		else
		{
			return this._getLayerForMbo(mboInfo);
		}
	},
	setMboMarkerInfo: function(mboInfo, opt, layerId)
	{
		var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
		return layer.setMboMarkerInfo(mboInfo, opt);
	},
	getMboMarkerInfo: function(mboInfo, layerId)
	{
		var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
		return layer.getMboMarkerInfo(mboInfo);
	}

});
});

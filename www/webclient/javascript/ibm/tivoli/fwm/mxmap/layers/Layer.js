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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.Layer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

ibm.tivoli.fwm.mxmap.layers.LayerType = {
	LAYER: 0,
	SYMBOLOGY: 1,
	LEGEND: 2,
	VIRTUAL_LAYER: 4
};

/**
 * Represents a map layer
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Unscheduled Work", records: a MXRecordSet,
 * parentLayer: the layer that is creating this layer, }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.Layer", [ ibm.tivoli.fwm.mxmap._Base ], {
	_layerName: null,
	_layerId: null,
	_records: null,
	_map: null,
	// Whether this layer is currently active or not
	_disabled: null,
	// Array with the sublayers
	_childLayers: null,
	// Pointer to the parent layer
	_parentLayer: null,
	_leftIconURL: null,
	_rightIconURL: null,
	_rightIconSet: false,
	_childrenTitle: null,
	layerRecords: null,
	_mboMarkerOptions: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._childLayers = [];
		this._layerId = options.layerId;

		this._mboMarkerOptions = new MboMarkerOptionsTable();

		this._map = options.map;
		this.layerRecords = [];
		this._disabled = true;
		this._layerName = this.layerName;
		this._childrenTitle = options.childrenTitle;
		this._parentLayer = options.parentLayer;
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this._rightIconURL = libraryManager.getLayerDetailsOffImageInfo().getImageURL();
		if (this.layerType == ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER)
		{
			this.layerConf = this.symbManager.getLayerConfigById(this._layerId);
			if (!this.layerConf)
			{
				console.warn("[Layer] No conf for ", this._layerId);
				// TODO Return others Layer
				this.layerConf = this.symbManager.getDefaultLayerConfigFor(this._layerId);
				// return;
			}
			this._layerName = this.layerConf.label;
			this._childrenTitle = this.layerConf.symbologyTitle;
			// Get the array of symbology configurations for this layer
			var symbologyConfigArray = this.symbManager.getSymbologyConfigArrayByLayer(this.layerConf);
			var firstSymbology = true;
			for ( var symbologyId in symbologyConfigArray)
			{
				// For each symbology configuration in the array, build a
				// symbology for this layer (a child layer)
				var symbologyConfig = symbologyConfigArray[symbologyId];
				var symbologyType = symbologyConfig.type;
				var symbologyLabel = symbologyConfig.label;
				var symbologyChildrenTitle = symbologyConfig.legendTitle;
				var symbology = this.createNewChildLayer({
					layerName: symbologyLabel,
					layerId: symbologyId.toLowerCase(),
					layerConf: symbologyConfig,
					map: this._map,
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY,
					symbologyType: symbologyType,
					childrenTitle: symbologyChildrenTitle
				});
				if (firstSymbology == true)
				{
					// At least one symbology must be enabled, so enable the
					// first symbology in each layer
					symbology.enable();
					this.symbManager.setActiveSymbology(this.layerConf.id, symbologyConfig);
					firstSymbology = false;
				}

				// Get the array of legend configurations for the symbology
				var legendConfigArray = this.symbManager.getLegendConfigArrayBySymbology(symbologyConfig);
				for ( var legendId in legendConfigArray)
				{
					var legendConfig = legendConfigArray[legendId];

					var legendLabel = legendConfig.label;
					var legendSymbol = legendConfig.symbol;
					var legend = symbology.createNewChildLayer({
						layerConf: legendConfig,
						layerName: legendLabel,
						layerId: legendId.toLowerCase(),
						map: this._map,
						layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LEGEND,
						symbol: legendSymbol
					});
				}
			}
			// Checks if there is a default symbology configured for this layer
			// If so, enable this symbology
			var defaultSymbology = this.symbManager.getDefaultSymbologyForLayer(this.layerConf.id);
			if (defaultSymbology != null)
			{
				var symbology = null;
				symbology = dojo.filter(this.getChildren(), function(child)
				{
					return (child.layerId == defaultSymbology);
				});
				if (symbology.length > 0)
				{
					symbology[0].toggleState();
					this.symbManager.setActiveSymbology(this.layerConf.id, symbologyConfigArray[defaultSymbology]);
				}
			}
		}

		this.init();
	},
	/**
	 * Sets the left icon (on/off icon)
	 */
	init: function()
	{
		this._setLeftIconURL();
	},
	/**
	 * Sets the left icon (on/off icon)
	 */
	_setLeftIconURL: function()
	{
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		if (this.isDisabled())
		{
			this._leftIconURL = libraryManager.getLayerOffImageInfo().getImageURL();
		}
		else
		{
			this._leftIconURL = libraryManager.getLayerOnImageInfo().getImageURL();
		}
	},
	/**
	 * Sets the right icon (submenu icon)
	 */
	_setRightIconURL: function()
	{
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this._rightIconURL = libraryManager.getLayerDetailsImageInfo().getImageURL();
		this._rightIconSet = true;
	},
	getLeftIconURL: function()
	{
		return this._leftIconURL;
	},
	getRightIconURL: function()
	{
		return this._rightIconURL;
	},
	/**
	 * Retrieves the layer name
	 */
	getLayerName: function()
	{
		return this._layerName;
	},
	getLayerId: function()
	{
		return this._layerId;
	},
	getMXRecordSet: function()
	{
		return this._records;
	},
	/**
	 * Enables or disables this layer
	 */
	toggleState: function()
	{
		if (this.isDisabled())
		{
			this.enable();
		}
		else
		{
			this.disable();
		}
	},
	/**
	 * Shows records on the map - should be used to show a brand new set of
	 * records. this method is called to show records for the first time.
	 */
	show: function()
	{
		this._disabled = false;
		if (this._records != null)
		{
			this._records.showMXRecordsOnMap();
		}
	},
	addRecord: function(mboInfo, markerOptions)
	{
		var _exists =this._getRecord(mboInfo);
		if (_exists!=null)
		{				
			console.log("conta",this.layerRecords[_exists].counter);
			mboInfo.counter=this.layerRecords[_exists].counter;
			this.map.removeMboMarkerFromMap(this.layerRecords[_exists], this._layerId);
			mboInfo.counter++;
			this.layerRecords[_exists]=mboInfo;
			
		}
		else
		{
			mboInfo.counter = 1;
			this.layerRecords.push(mboInfo);
		}
		//mboInfo.counter++;
		//this.layerRecords.push(mboInfo);

		if (!this.isDisabled())
		{
			this.map.addMboMarker(mboInfo, markerOptions, this._layerId);
		}
	},
	removeRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				var contador = --this.layerRecords[i].counter;
				if (contador == 0)
				{
					this.layerRecords.splice(i, 1);
					this.map.removeMboMarkerFromMap(mboInfo, this._layerId);
				}
				return contador;
			}
		}
	},
	_getRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				return i;
			}
		}
		return null;
	},
	hasRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				return true;
			}
		}
		return false;
	},
	_mboInfosEqual: function(mboInfo1, mboInfo2)
	{
		return (mboInfo1.mxdata.mboName == mboInfo2.mxdata.mboName && mboInfo1.mxdata.uid.value == mboInfo2.mxdata.uid.value);
	},
	hasRecords: function()
	{
		return this.layerRecords.length > 0;
	},
	isVisibleInUI: function()
	{
		if (this.layerType == ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER)
		{
			return this.hasRecords();
		}
		else
		{
			return true;
		}
	},
	/**
	 * Adds records to the layer
	 */
	addMXRecordSet: function(anotherMXRecordSet)
	{
		if (this._records != null)
		{
			this._records.addMXRecordSet(anotherMXRecordSet);
		}

	},
	/**
	 * Removes records from the layer
	 */
	removeMXRecordSetData: function()
	{
		if (this._records != null)
		{
			this._records.removeMXRecordsFromMap();
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Layer] _records is null");
			}
		}
		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarker(mboInfo, this._layerId);
			}
			this.layerRecords = [];
		}
	},
	/**
	 * Checks whether this layer is currently disabled
	 */
	isDisabled: function()
	{
		return (this._disabled == true);
	},
	/**
	 * Removes records by ID
	 */
	removeMXRecordByUid: function(uidData)
	{
		if (this._records != null)
		{
			this._records.removeRecordFromMap(uidData);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Layer] _records is null");
			}
		}
	},
	/**
	 * Creates a new child layer based on its type
	 */
	createNewChildLayer: function(options)
	{

		var layer = null;
		options.parentLayer = this;

		// Create the child layer according to its type
		switch (options.layerType)
		{
			case ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY:
				layer = new ibm.tivoli.fwm.mxmap.layers.SymbologyLayer(options);
				break;
			case ibm.tivoli.fwm.mxmap.layers.LayerType.LEGEND:
				layer = new ibm.tivoli.fwm.mxmap.layers.LegendLayer(options);
				break;
			default:
				layer = new ibm.tivoli.fwm.mxmap.layers.Layer(options);
				break;
		}
		;

		// Add the layer to the array of child layers
		if (layer != null)
		{
			this.addChildLayer(layer);
		}

		return layer;
	},
	/**
	 * Adds the child layer to the array
	 */
	addChildLayer: function(layer, cleanBeforeAdd)
	{
		var layerName = layer.getLayerName();
		var _layer = this.getChildLayer(layerName);
		if (_layer == null)
		{
			this._childLayers[layerName] = layer;
		}
		// If this layer has at least one child, set the submenu icon
		if (this._rightIconSet == false)
		{
			this._setRightIconURL();
		}
	},
	/*
	 * Retrieves the child layer by name
	 */
	getChildLayer: function(layerName)
	{
		if (this._childLayers.hasOwnProperty(layerName) == true)
		{
			return this._childLayers[layerName];
		}
		return null;
	},
	/**
	 * Returns an array with all the existing layers
	 */
	getChildren: function()
	{
		var array = [];
		for ( var index in this._childLayers)
		{
			array.push(this._childLayers[index]);
		}
		return array;
	},
	/**
	 * Retrieves the parent layer
	 */
	getParentLayer: function()
	{
		return this._parentLayer;
	},
	/**
	 * Retrieves sibling layers
	 */
	getSiblings: function()
	{
		return this.isRoot() ? null : this._parentLayer.getChildren();

	},
	/**
	 * Checks if this layer has children
	 */
	hasChildren: function()
	{
		var hasChildren = false;
		for ( var index in this._childLayers)
		{
			hasChildren = true;
			break;
		}
		return hasChildren;
	},
	/**
	 * Checks if this layer is a root layer
	 */
	isRoot: function()
	{
		return (this._parentLayer == null);
	},
	/**
	 * Enables this layer making its records visible
	 */
	enable: function()
	{
		this._disabled = false;

		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.showMboMarker(mboInfo, this._layerId);
			}
		}
		this._setLeftIconURL();
	},
	/**
	 * Disables this layer making its records invisible
	 */
	disable: function()
	{
		this._disabled = true;

		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarkerFromMap(mboInfo, this._layerId);
			}
		}
		this._setLeftIconURL();

	},
	redrawMarkers: function()
	{
		if (this.layerRecords != null && !this.isDisabled())
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarkerFromMap(mboInfo, this._layerId);
				this._map.showMboMarker(mboInfo, this._layerId);
			}
		}
	},
	getChildrenTitle: function()
	{
		return this._childrenTitle;
	},
	setMboMarkerInfo: function(mboInfo, opt)
	{
		return this._mboMarkerOptions.setMboMarkerInfo(mboInfo, opt);
	},
	getMboMarkerInfo: function(mboInfo)
	{
		return this._mboMarkerOptions.getMboMarkerInfo(mboInfo);
	}

});

function MboMarkerOptionsTable()
{
	this.mbosOnMap = {};
	/*
	 * Stores a reference for the given MBO with the given options. If a
	 * reference already exists, updates all of its properties with the given
	 * ones.
	 */
	this.setMboMarkerInfo = function(mboInfo, opt)
	{
		this._createMboMarkerHashRecord(mboInfo);
		for ( var propName in opt)
		{
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value][propName] = opt[propName];
		}

	};
	/*
	 * Creates a reference for the given MBO in the map's MBO marker map. The
	 * reference count is initialized to 0.
	 */
	this._createMboMarkerHashRecord = function(mboInfo)
	{
		if (!this.mbosOnMap[mboInfo.mxdata.mboName])
		{
			this.mbosOnMap[mboInfo.mxdata.mboName] = {};
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value])
		{
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value] = {};
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value]["layerCount"] = 0;
		}
	};
	/*
	 * Returns the stored info for the given MBO.
	 */
	this.getMboMarkerInfo = function(mboInfo)
	{
		if (!mboInfo.mxdata)
		{
			return null;
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName])
		{
			return null;
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value])
		{
			return null;
		}
		return this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value];
	};
};

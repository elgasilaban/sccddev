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
dojo.provide("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Handles the map symbology configuration.
 * The terms layer and object are used somewhat interchangeably, because the
 * design for the symbology feature mixes them.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager",[ ibm.tivoli.fwm.mxmap._Base ], {
	_mapSymbologyJson: null,
	_map: null,
	_objectMap: null,
	_defaultSymbologyConfig: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._map = options.map;
		this._mapSymbologyJson = this._map.mapConf.symbologyConfig;
		this._objectMap = this._buildObjectMap(this._mapSymbologyJson);
		this._defaultSymbologyConfig = options.defaultSymbologyConfig;
	},
	_buildObjectMap: function(symbologyConfig)
	{
		var retval = {};
		if((this._mapSymbologyJson != null) && (this._mapSymbologyJson.layers != null)){
			for (id in this._mapSymbologyJson.layers)
			{
				var layer = this._mapSymbologyJson.layers[id];
				retval[layer.id] = layer;
				this.setActiveSymbologyForLayer(layer, layer.symbologies[0]);
			}
		}
		return retval;
	},
	getDefaultLayerConfigFor:function(_id){
		this._layerIdXlation[_id]="others";
		return this.getLayerConfigById(_id);
	},
	/**
	 * Retrieves the symbology config for the layer (object type) specified by id
	 */
	getLayerConfigById: function(id2)
	{
		var _id = id2.toLowerCase();
		if(this._layerIdXlation[_id]!=null){
			_id=this._layerIdXlation[_id];
		} 
		return this._objectMap[_id];
	},
	/**
	 * Retrieves an array with all the symbologies for a given layer
	 */
	getSymbologyConfigArrayByLayer: function(layerConfig){
		var symbologyArray = {};
		if((layerConfig != null) && (layerConfig.symbologies != null)){
			dojo.forEach(layerConfig.symbologies, function(symbology){
				if(symbology.id != null && symbology.id != ""){
					symbologyArray[symbology.id] = symbology; 
				}
			});
		}
		return symbologyArray;
	},
	/**
	 * Retrieves an array with all the legends for a given symbology
	 */
	getLegendConfigArrayBySymbology: function(symbologyConfig){
		var legendArray = {};
		if((symbologyConfig != null) && (symbologyConfig.legends != null)){
			dojo.forEach(symbologyConfig.legends, function(legend){
				if(legend.id != null && legend.id != ""){
					legendArray[legend.id] = legend; 
				}
			});
		}
		return legendArray;
	},
	_layerIdXlation:{},
	setActiveSymbology: function(layerId, symbology)
	{
		
		var layer = this.getLayerConfigById(layerId);
		this.setActiveSymbologyForLayer(layer, symbology);
	},
	setActiveSymbologyForLayer: function(layer, symbology)
	{
		layer.activeSymbology = symbology;
	},
	getActiveSymbology: function(layerId)
	{
		return this.getLayerConfigById(layerId).activeSymbology;
	},
	getLegendForObject: function(object, routeColor)
	{
		var layer = this.getLayerConfigById(object.mxdata.mboName);
		return this.getLegendForObjectAndLayer(layer, object, routeColor);
	},
	/*
	 * Given an object and the currently active symbology, returns the symbol
	 * for the object in the symbology. If a color is given and the selected
	 * symbology is based on resource, the given color is used to find the right
	 * symbol.
	 */
	getLegendForObjectAndLayer: function(layer, object, routeColor)
	{
		var activeSymbology = layer.activeSymbology;
		if (activeSymbology == null)
		{
			return ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo();
		}
		if (activeSymbology.id == "resource")
		{
			if (object.routedata == null)
			{
				if (object.ownDefaultMarker != null)
				{
					return object.ownDefaultMarker;
				}
				else
				{
					return this._getDefaultSymbol(activeSymbology);
				}
			}
			else
			{
				var rtlDir = "";
				if(document.body.dir == "rtl")
				{
					rtlDir = "/rtl";
				}
				// Symbology type: resource.
				// We use the route color to find the right symbol.
				return {
					"url": "../webclient/javascript/ibm/tivoli/fwm/mxmap/resources" + rtlDir + "/symbology/workorder/map_WO_" + routeColor.replace("#", "").toLowerCase() + ".png",
					"color": "",
					"offsetx": 24,
					"offsety": 36,
					"width": 47,
					"height": 36
				};
			}
		}
		else if (activeSymbology.id == "fwm_default")
		{
			if (object.ownDefaultMarker != null)
			{
				return object.ownDefaultMarker;
			}
			else
			{
				// Symbology type: default
				// We assume there's only one value and return it.
				return activeSymbology.legends[0].symbol;
			}
		}
		else
		{
			if (activeSymbology.type == "numeric")
			{
				return this._getNumericSymbol(object, activeSymbology);
			}
			else if (activeSymbology.type == "domainvalue" || activeSymbology.type == "tablevalue")
			{
				return this._getDomainSymbol(object, activeSymbology);
			}
			// Shouldn't ever happen, but just in case...
			return this._getDefaultSymbol(activeSymbology);
		}
	},
	/*
	 * Returns the default symbol for the given symbology.
	 */
	_getDefaultSymbol: function(symbology)
	{
		var defaultSymbols = dojo.filter(symbology.legends, function(legend)
		{
			return legend.isDefault == true;
		});
		return defaultSymbols.length > 0 ? defaultSymbols[0].symbol : null;
	},
	/*
	 * Returns the right symbol for the given object in the given symbology,
	 * based on the relevant attribute's value and the configured ranges.
	 */
	_getNumericSymbol: function(object, symbology)
	{
		// Symbology type: numeric
		// We try to convert the value to a number and find a range that
		// contains that number. If either fails we return the default symbol.
		var val = object.mxdata.attributes[symbology.id];
		if (val == "")
		{
			val = "null";
			var symbols = dojo.filter(symbology.legends, function(legend)
			{
				return (legend.id == val);
			});
			return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
		}
		else if (!val)
		{
			return this._getDefaultSymbol(symbology);
		}
		else
		{
			var attrVal = parseInt(val);
			var symbols = dojo.filter(symbology.legends, function(legend)
			{
				return (attrVal >= parseInt(legend.minValue) && attrVal <= parseInt(legend.maxValue));
			});
			return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
		}
	},
	/*
	 * Returns the right symbol for the given object in the given symbology,
	 * based on the relevant attribute's value and the configured value/symbol
	 * pairs.
	 */
	_getDomainSymbol: function(object, symbology)
	{
		var attrVal = String(object.mxdata.attributes[symbology.id]).toLowerCase();
		if (attrVal == "")
			attrVal = "null";
		var symbols = dojo.filter(symbology.legends, function(legend)
		{
			return (legend.id == attrVal);
		});
		return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
	},
	/*
	 * Returns the default symbology for the layer
	 * The default symbology is a configuration in the presentation.
	 */
	getDefaultSymbologyForLayer: function(layer)
	{
		var defaultSymbology = null;
		if(this._defaultSymbologyConfig != null)
		{
			var layerSymbologyPair = null;
			layerSymbologyPair = dojo.filter(this._defaultSymbologyConfig, function(pair)
			{
				return (pair.layer == layer);
			});
			if(layerSymbologyPair.length > 0)
			{
				defaultSymbology = layerSymbologyPair[0].symbology;
			}
		}
		return defaultSymbology;
	}

});


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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LegendLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a symbology legend
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Approved",
 *  parentLayer: the layer that is creating this layer,
 * }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.LegendLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			symbol: null,
			minValue: null,
			maxValue: null,
			isDefault: false,
			/**
			 * Sets the right icon (legend marker)
			 */
			init: function()
			{
				this._setRightIconURL();
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			toggleState: function()
			{
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			enable: function()
			{
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			disable: function()
			{
			},
			getSymbolURL: function()
			{
				var symbolURL = null;
				if (this.symbol != null){
					symbolURL = this.symbol.url;
				}
				return symbolURL;
			},
			getMinValue: function()
			{
				return this.minValue;
			},
			getMaxValue: function()
			{
				return this.maxValue;
			},
			isDefaultLegend: function()
			{
				return this.isDefault;
			},
			/**
			 * Sets the left icon (nothing)
			 */
			_setLeftIconURL: function()
			{
			},
			/**
			 * Sets the right icon (legend marker)
			 */
			_setRightIconURL: function()
			{
				this._rightIconURL = this.getSymbolURL();
			}
	});
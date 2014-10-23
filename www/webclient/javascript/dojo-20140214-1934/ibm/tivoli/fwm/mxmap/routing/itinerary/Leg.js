//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/itinerary/Leg", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/routing/itinerary/Step,ibm/tivoli/fwm/mxmap/routing/Router"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
/**
 * 
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/Leg.html", "<div  style=\"width:100%;margin-bottom:10px;\">\n<div data-dojo-attach-point=\"distanceNode\" style=\"text-align: center;width: 100%;\"></div>\n<div data-dojo-attach-point=\"stepsNode\"></div>\n<div data-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"legInfo\" style=\"background-color: #FAFAFA;border: 1px solid #E0E0E0;margin: 1px;padding: 10px 2px;\">\n<span data-dojo-attach-point=\"markerNode\" style=\"float:left;margin-top:-10px\"></span>\n<span data-dojo-attach-point=\"endLocDescNode\"></span>\n</div>\n</div>"),
	location: null,
	info: null,
	marker: null,
	steps: [],
	stepWidgets: [],
	needsToGeocode: null,
	distanceToLeg: null,
	durationToLeg: null,
	distanceUnit: null,
	map: null,
	// Maximum icon width used to determine the margins left and right
	_maxMarkerImageWidth: 47,
	setMap: function(map)
	{
		this.map = map;
	},
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.steps = [];
		this.stepWidgets = [];
	},
	postCreate: function()
	{
		this.addressLoading = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_being_loaded");
		this.failedToLoadAddress = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_info_not_found");

		if (this.distanceToLeg != null)
		{

			this.distanceNode.innerHTML = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatDistance(this.distanceToLeg, this.distanceUnit);
			this.distanceNode.innerHTML += " - ";
		}
		if (this.durationToLeg != null)
		{
			this.distanceNode.innerHTML += ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatTime(this.durationToLeg);
		}
		if (this.marker != null)
		{
			dojo.create("img", {
				src: this.marker.iconUrl
			}, this.markerNode, "only");
			var markerLabel = this.marker.labelText;
			
			if (markerLabel)
			{
				var numberOfDigitsOffset = this._calculateLabelOffset(markerLabel);
				var _left;
				var _top;
				if (dojo.isIE)
				{
					// Workaround to overcome the IE "float left" problem
					_left = this.marker.attributes.iconAnchor[0] - numberOfDigitsOffset;
					_top = 6 - this.marker.attributes.iconSize[1];
				}
				else
				{
					_top = 9;
					_left = this.marker.attributes.iconAnchor[0] + 4 + numberOfDigitsOffset;
				}
				_left += "px";
				_top += "px";
				dojo.create("div", {
					innerHTML: markerLabel,
					style: {
						"float": "left",
						"left": _left,
						"top": _top,
						"position": "relative",
						"color": "white"
					}
				}, this.markerNode, "last");
			}
			// 12-12808. Adjust the markerNode width so that all markers in the route directions dialog are aligned
			var maxMarkerNodeMargin = Math.floor(this._maxMarkerImageWidth/2);
			var currentMarkerNodeMargin = this.marker.attributes.iconSize[0] - this.marker.attributes.iconAnchor[0];
			if(currentMarkerNodeMargin < maxMarkerNodeMargin)
			{
				var marginAdjustment = (maxMarkerNodeMargin - currentMarkerNodeMargin) + "px";
				dojo.style(this.markerNode, "marginLeft", marginAdjustment);
				dojo.style(this.markerNode, "marginRight", marginAdjustment);
			}
		}
		if (this.info || this.needsToGeocode == true)
		{
			if (this.needsToGeocode == true)
			{
				var fctSuccess = function(location)
				{
					var address = location[0].formattedAddress;
					this.endLocDescNode.innerHTML = address;
					this.needsToGeocode = false;
					this.info = address;
				};
				var fctError = function(location)
				{
					this.endLocDescNode.innerHTML = this.failedToLoadAddress;
				};
				this.map.geocoder.reverseGeocode(this.location.lat, this.location.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));
				this.endLocDescNode.innerHTML = this.addressLoading;
			}
			else
			{
				this.endLocDescNode.innerHTML = this.info;
			}
		}
		for ( var i = 0; i < this.steps.length; i++)
		{
			var step = this.steps[i];
			step.position = i + 1;
			step.distanceUnit = this.distanceUnit;
			step.map = this.map;
			step.closeDialog = this.closeDialog;
			var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Step(step, this.map);
			dojo.place(legWidget.domNode, this.stepsNode, 'last');
			this.stepWidgets.push(legWidget);
		}
	},
	_onClick: function(evt)
	{
		console.log("Clicked on leg ", this.location);
		this.map.getMapstraction().setCenter(this.location);
		this.closeDialog();

	},
	// Workaround to shift the label text (number) to the right in case it has more than 1 digit
	// in order to center it inside the marker image.
	_calculateLabelOffset: function(labelText)
	{
		var labelOffset = 0;
		var labelNumber = parseInt(labelText);
		if( (labelNumber/100) >= 1 )
		{
			labelOffset = 7;
		}
		else if((labelNumber/10) >= 1)
		{
			labelOffset = 4;
		}
		return labelOffset;
	}
});

});

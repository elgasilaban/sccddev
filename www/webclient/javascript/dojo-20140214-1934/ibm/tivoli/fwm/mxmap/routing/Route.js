//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/Route", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.Route");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
/**
 * This represents a route.<br>
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.Route", ibm.tivoli.fwm.mxmap._Base, {
	totalDuration: 0,
	inputInfo: null,
	totalDistance: 0,
	stops: [],
	legsData: null,
	routeBounds: null,
	copyrights: null,
	polyline: null,
	markers: null,
	map: null,
	itinerary: null,
	initialConf: null,
	originalRouter: null,
	distanceUnit: null,
	lineVisible: true,
	setItinerary: function(data)
	{
		this.itinerary = data;
	},
	customMarkerOptions: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		console.log("route created", params);
	},
	zoomToRoute: function()
	{
		try
		{
			this.map.getMapstraction().setBounds(this.getBounds());
		}
		catch (e)
		{
			console.error("zoom to route", e);
		}
	},
	getBounds: function()
	{
		if (this.routeBounds == null)
		{
			this.routeBounds = this.map.getMapstraction().getBoundingBoxFromPoints(this.polyline.points);
			this.routeBounds.merge(this.map.getMapstraction().getBoundingBoxFromPoints(this.stops));
		}
		return this.routeBounds;
	},
	clear: function()
	{
		// Removes all mbo markers (markers that do not belong to mbos will not
		// be removed at this point)
		for ( var i = 0; i < this.inputInfo.stops.length; i++)
		{
			try
			{
				if (this.inputInfo.stops[i].calculatedStop != true)
				{
					this.map.removeMboFromLayerManager(this.inputInfo.stops[i]);
				}
			}
			catch (e)
			{
				console.log("Removing non existing mbo marker");
			}
		}

		this.hideCalculatedMarkers();
		this.markers = null;
		if (this.polyline)
		{
			try
			{
				this.map.getMapstraction().removePolyline(this.polyline);
			}
			catch (e)
			{
				console.error("cannot remove polyline");
			}
		}

	},
	show: function()
	{
		if (this.lineVisible)
		{
			this.map.getMapstraction().addPolyline(this.polyline);
		}
		if (this.markers == null)
		{
			this._createMarkers();
		}
	},
	redraw: function()
	{
		this.clear();
		this.show();
	},
	_addMarker: function(/* LatLngPoint */p, stopNum)
	{
		console.log("[mxmap.routing.Route._addMarker] Adding Marker: ", stopNum);
		var m = new mxn.Marker(p);
		m.label = String(stopNum);

		// Get either the start position or the end position marker depending on
		// the stopNum
		var markerInfo = (stopNum > 0) ? ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getEndPositionMarkerImageInfo() : ibm.tivoli.fwm.mxmap.ImageLibraryManager
				.getImageLibraryManager().getStartPositionMarkerImageInfo();

		var aa = {
			label: "",
			tooltip: "",
			draggable: false,
			icon: markerInfo.getImageURL(),
			iconSize: markerInfo.getImageSize(),
			iconAnchor: markerInfo.getImageAnchor(),
			hover: true
		};
		this.map.getMapstraction().addMarkerWithData(m, aa);
		return m;
	},
	_woStopNumber: 1,
	_addNewMarker: function(index)
	{
		if (this.inputInfo.stops[index].calculatedStop != true)
		{
			// this is a stop based on a mbo

			console.log(index, "mbo stop", this.stops[index], this.inputInfo.stops[index]);

			var mboStop = this.inputInfo.stops[index];

			mboStop.routeInfo = {
				stopNumber: index
			};
			var usedIndex = index;
			var fct = function(marker)
			{
				this.markers[usedIndex] = marker;
			};
			var label = "";
			var tooltip = "";

			if (mboStop && mboStop.mxdata && (mboStop.mxdata.mboName == "WORKORDER" || mboStop.mxdata.extendsMboName == "WORKORDER"))
			{
				if (this.map.isMobile != true)
				{
					tooltip = mboStop.mxdata.attributes.wonum;
				}

				label = String(this._woStopNumber++);
			}

			var markerOptions = {
				"draggable": false,
				"enableMapTips": true,
				"label": label,
				"tooltip": tooltip,
				"color": this.originalRouter.routecolor,
				"markerReferenceCallback": dojo.hitch(this, fct)
			};
			this.map.addMboToLayerManager(mboStop, markerOptions);

		}
		else
		{
			// this is a configured stop or user location

			console.log(index, "calculated stop", this.stops[index], this.inputInfo.stops[index]);

			var m = this._addMarker(this.stops[index], index);

			this.markers[index] = m;
			this.markers[index].calculated = true;
		}
	},
	getMarkerForStop: function(index)
	{
		if (this.markers != null && this.markers.length > index)
		{
			return this.markers[index];
		}
		else
		{
			console.log("no marker for index ", index);
			return null;
		}
	},
	_createMarkers: function()
	{
		this.markers = [];
		var initialLocation = this.itinerary.getInitialLocation();
		var stopNum = 1;

		console.log("debug", this.stops, this.itinerary);

		if (initialLocation)
		{
			var p = initialLocation.location;
			this._addNewMarker(0);
			// initialLocation.marker = m;
			// this.markers.push(m);
		}
		for ( var i = 1; i < this.stops.length; i++)
		{
			var p = this.stops[i];

			this._addNewMarker(i);

		}
	},
	avoidTollsSupported: true,
	setSupportAvoidToll: function(supported)
	{
		this.avoidTollsSupported = supported;
	},
	avoidHighwaysSupported: true,
	setSupportAvoidHighway: function(supported)
	{
		this.avoidHighwaysSupported = supported;
	},
	hideCalculatedMarkers: function()
	{
		// Removes all remaining markers
		if (this.markers != null)
		{
			for ( var i = 0; i < this.markers.length; i++)
			{
				try
				{
					if (this.markers[i].calculated == true)
					{
						this.map.getMapstraction().removeMarker(this.markers[i]);
					}
				}
				catch (e)
				{
					console.log("Removing non existing marker");
				}
			}

		}

	},
	showCalculatedMarkers: function()
	{
		// Removes all remaining markers
		if (this.markers != null)
		{
			for ( var i = 0; i < this.markers.length; i++)
			{
				try
				{
					if (this.markers[i].calculated == true)
					{
						var m = this._addMarker(this.stops[i], i);
						this.markers[i] = m;
						this.markers[i].calculated = true;
					}
				}
				catch (e)
				{
					console.log("error readding marker", e);
				}
			}

		}
	},
	setLineVisible: function(visible)
	{
		if (visible == this.lineVisible)
		{
			return;
		}
		this.lineVisible = visible;
		if (this.lineVisible == true)
		{
			this.map.getMapstraction().addPolyline(this.polyline);
		}
		else
		{
			this.map.getMapstraction().removePolyline(this.polyline);
		}
		// this.redraw();
	}
});
});

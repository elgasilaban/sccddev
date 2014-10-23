//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/MyLocationTool", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button,ibm/tivoli/fwm/mxmap/ImageLibraryManager,ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationTool");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");

ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus = {
	DISABLED: -1,
	MARKER_CENTERED: 0,
	MARKER_NOT_CENTERED: 1
};

/**
 * My Location tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "My Location",
	iconClass: "basicMapToolbarBtn myLocationMapToolbarBtn",
	map: null,
	myLocationToolStatus: null,
	myLocationMarker: null,
	lbsCircle: null,
	imageLibManager: null,
	myCurrentLocationInstance: null,
	_executedAtLeastOnce: false,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "mylocationtool");

		this.resetMyLocationTool();

		this.label = _label || this.label;

		this.imageLibManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this.myCurrentLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();

	},
	
	disable: function()
	{
		// does nothing
	},
	destroy: function()
	{
		this.resetMyLocationTool();
		this.destroyRecursive();
	},
	toggleStatus: function()
	{
		this.toggleMyLocationStatus();
	},
	/**
	 * Changes the status of the tool From DISABLED to MARKER_CENTERED, from
	 * MARKER_CENTERED to DISABLED and from MARKER_NOT_CENTERED to
	 * MARKER_CENTERED
	 */
	toggleMyLocationStatus: function()
	{
		switch (this.myLocationToolStatus)
		{
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED:
				// 12-13616. Moving this.setActive(true) here (before this.watchMyLocationMarkerPosition()), because
				// the latter can result in an error and, if so, the error callback will reset the button status to "off"
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				this.watchMyLocationMarkerPosition();
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED:
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				this.setCenterAndUpdateMarkerPosition();
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED:
				this.resetMyLocationTool();
				break;
			default:
				break;
		}
		;

	},
	/**
	 * Updates the My Location marker position according to the new current
	 * location If the current status is MARKER_CENTERED, forces the map to be
	 * centered around the marker
	 */
	setCenterAndUpdateMarkerPosition: function()
	{
		this._executedAtLeastOnce = true;
		if (this.myLocationToolStatus != ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED)
		{
			if (this.myCurrentLocationInstance)
			{
				if (this.myCurrentLocationInstance.getPosition() && this.myCurrentLocationInstance.getPosition().coords)
				{
					// Retrieve the properties related to My Location
					var coords = this.myCurrentLocationInstance.getPosition().coords;
					var lat = coords.latitude;
					var lng = coords.longitude;
					var accuracy = coords.accuracy;
					var latLonPoint = new mxn.LatLonPoint(lat, lng);

					// Remove existing My Location marker (if any)
					this.removeMyLocationMarker();

					// Add the My Location marker with accuracy circle
					this.createMyLocationMarker(latLonPoint, accuracy);

					// Move map around the marker only if the marker was already
					// centered
					if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
					{
						this.map.getMapstraction().endPan.removeHandler(this.endPanHandler, this);
						this.map.getMapstraction().endPan.addHandler(this.createEndPanHandler, this);
						this._center(latLonPoint);						
					}
				}
			}
		}
	},	
	/**
	 * Changes the position of the marker on the map. This method must be called
	 * when the status changes from DISABLED to MARKER_CENTERED.
	 */
	_handler: null,
	watchMyLocationMarkerPosition: function()
	{
		if (this.myCurrentLocationInstance)
		{
			// The method this.setCenterAndUpdateMarkerPosition must be called
			// whenever the user's current position changes.
			// 12-13674. We need to create the listener prior to calling watchUserLocation on myCurrentLocationInstance
			// because some errors may happen synchronously. When an error happens during the listenToUserLocation() call,
			// the error callback is executed before the handler is returned, so the myCurrentLocationInstance.removeListeners
			// tries to remove the listener using a handler that does not exist yet.
			this._handler = this.myCurrentLocationInstance.createListener(dojo.hitch(this, this.setCenterAndUpdateMarkerPosition), dojo.hitch(this, this.failedToGetLocation));
			this.myCurrentLocationInstance.listenToUserLocation(this._handler);
		}
	},
	/**
	 * Creates the My Location marker according to the specifications (blue dot
	 * with a blue hollow accuracy circle around it)
	 */
	convertedPoints:{},
	createMyLocationMarker: function(latLonPoint, accuracy)
	{

		var succFct = function(points)
		{
			var p = points[0];
			this.convertedPoints[latLonPoint]=p;
			var markerData = this.imageLibManager.getMyLocationMarkerImageInfo().generateMarkerData("");
			this.myLocationMarker = new mxn.Marker(p);
			this.createAccuracyCircle(p, accuracy);
			this.map.getMapstraction().addMarkerWithData(this.myLocationMarker, markerData);
		};
		var errFct = function(error)
		{
			console.error("error", error);
		};
		this.map.getMapstraction().getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));

		
	},
	_center:function(latLonPoint){
		var succFct = function(points)
		{
			var p = points[0];
			this.map.getMapstraction().setCenter(p);
		};
		var errFct = function(error)
		{
			console.error("error", error);
		};
		this.map.getMapstraction().getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));
	},
	/**
	 * Removes the My Location marker and the accuracy circle
	 */
	removeMyLocationMarker: function()
	{
		if (this.myLocationMarker)
		{
			this.map.getMapstraction().removeMarker(this.myLocationMarker);
			this.myLocationMarker = null;
		}
		if (this.lbsCircle)
		{
			this.map.getMapstraction().removePolyline(this.lbsCircle);
			this.lbsCircle = null;
		}
	},
	// Sends the error message to Maximo (according to specifications) and
	// resets the status of the tool
	failedToGetLocation: function()
	{
		if (this._executedAtLeastOnce == false)
		{
			this.map.failedToGetLocation();
			this.resetMyLocationTool();
		}
		else
		{
			// Send status message to maximo
			this.map.failedToGetLocationStatusMessages();
		}
	},
	/**
	 * Puts the tool in the DISABLED status and removes the marker
	 */
	resetMyLocationTool: function()
	{
		this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED;
		this.removeMyLocationMarker();
		this.stopWatchingMyLocationMarkerPosition();
		this._executedAtLeastOnce = false;
		this.setActive(false);
	},
	/**
	 * Disables the browser's watchPosition API
	 */
	stopWatchingMyLocationMarkerPosition: function()
	{
		if (this.myCurrentLocationInstance != null)
		{
			this.myCurrentLocationInstance.removeListeners(this._handler);
		}
	},
	/**
	 * This is an auxiliary handler that is added just before the setCenter()
	 * function. The purpose is to avoid the endPanHandler being triggered by
	 * the setCenter call.
	 */
	createEndPanHandler: function()
	{
		this.map.getMapstraction().endPan.removeHandler(this.createEndPanHandler, this);
		this.map.getMapstraction().endPan.addHandler(this.endPanHandler, this);
	},

	/**
	 * Handler function that changes the status of the tool from MARKER_CENTERED
	 * to MARKER_NOT_CENTERED whenever an endPan event is captured.
	 */
	endPanHandler: function(event_name, event_source, event_args)
	{
		if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
		{
			this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED;			
		}
		
	},
	// TODO: Refactor: this logic should be moved somewhere else
	createAccuracyCircle: function(point, accuracy)
	{
		if (this.lbsCircle == null)
		{
			var circle = new mxn.Radius(point, 10);
			var radiusInKms = (accuracy / 1000);
			if(this.lbsCircle){
				this.removeMyLocationMarker();
			}
			this.lbsCircle = circle.getPolyline(radiusInKms, "#C6DBEB");
			this.map.getMapstraction().addPolylineWithData(this.lbsCircle, {
				centerPoint: point,
				width: 3,
				opacity: 0.5,
				fillColor: "#D0E0EC",
				closed: true,
				radiusInKMs: radiusInKms
			});
		}
	}

});
});

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
dojo.provide("ibm.tivoli.fwm.mxmap.CurrentMXRecManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

dojo.declare("ibm.tivoli.fwm.mxmap.CurrentMXRecManager", ibm.tivoli.fwm.mxmap.MXRecord, {

	map: null,
	currentMarker: null,
	markerImgUrl: null,
	recordSet: null,
	currentFromRecSet: false,
	mbo: null,
	mboInfo: null,
	draggable: true,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		if (!this.markerImgUrl)
		{
			this.markerImgUrl = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo().getImageURL();
		}
		this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_" + this.map.getId(), dojo.hitch(this, this.serverUpdated)));
		this.recordSet = this.map.getCurrentRecordSetControl();
		this.mboInfo = options.mbo;
	},
	disposeMarker: function()
	{
		this._removeMarker();
		// remove current marker listener, return it to rec set if needed
		// if (this.currentFromRecSet == true)
		// {
		// this.recordSet.updateMXRecord(this.mboInfo.mxdata.uid,
		// this.mboInfo.mxdata, this.mboInfo.gisdata);
		// this.recordSet.showMXRecord(this.mboInfo.mxdata.uid);
		//
		// }
	},
	showCurrentRecord: function(noZoom)
	{
		if (this.mbo)
		{
			this.serverUpdated(this.mbo, noZoom);
		}
	},
	/**
	 * Triggered always that any new data from server is received. It will
	 * update the current representation of the current record on the map.
	 */
	serverUpdated: function(data, noZoom)
	{

		console.log("[CurrentMXRecManager] Server Updated with data", data);

		if (this.mboInfo && this.mboInfo.mxdata)
		{

			console.log("[CurrentMXRecManager] Trying to dispose current marker", this.mboInfo.mxdata);

			if (this.mboInfo.mxdata.uid.name != data.mxdata.uid.name || this.mboInfo.mxdata.uid.value != data.mxdata.uid.value)
			{
				this.disposeMarker();
				this.isMboOnMap = false;
			}
		}

		this.currentFromRecSet = false;

		this.mboInfo = data;
		this.mbo = data;
		this._updateMarkerLocation(data, noZoom);

	},

	/**
	 * Places a marker for the current record. Also adds a handler for dragging
	 * event of this marker.
	 */
	_placeMarker: function()
	{

		var markerOptions = {
			"events": {
				"onMoveEnd": dojo.hitch(this, this.movedMarker)
			},
			"enableMapTips": true
		};
		this.map.addMboToLayerManager(this.mboInfo, markerOptions);
		this.isMboOnMap = true;

	},

	/**
	 * Updates the current marker based on the new location data. It also
	 * publishes the event that the current record location has been updated
	 * thru 'onCurrentLocationUpdated' event
	 */
	_updateMarkerLocation: function(newMboInfo, noZoom)
	{
		this.inherited(arguments);
		dojo.publish("onCurrentLocationUpdated_" + this.map.getId());
		// if (noZoom != true)
		// {
		// this.center();
		// }
	},

	/**
	 * Returns a simple map tip for the current record TBD
	 */
	/*
	 * getMapTipData: function(mxdata) { var textBubble = mxdata.mboName + "\n" +
	 * mxdata.mboInfo.ADDRESSCODE + "\n" + mxdata.mboInfo.ORGID; return {
	 * infoBubble: textBubble, label: null,// nothing specified in spec. marker:
	 * 4, icon: this.markerImgUrl, iconSize: [ 32, 32 ], draggable:
	 * this._isDraggable(), hover: false }; },
	 */

	/**
	 * Triggered after the current record marker is moved. It then sends to the
	 * server the new record location
	 */
	movedMarker: function(event_name, evt, event_args)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Marker moved", event_args.newLocation);
		}
		this.reverseGeocodeCurrentRecord(event_args.newLocation, false);
	},

	/**
	 * Set the current SA record location
	 * 
	 * @param {lat,lng,address}
	 */
	setServersCurrentRecordLocation: function(newGISlocation)
	{
		this.map.getMaximo().setCurrentRecordLocation(newGISlocation);
	},

	/**
	 * Reverse geocode the current record.
	 * 
	 * @param newGISlocation -
	 *            Opcional, only if want to use a different position than the
	 *            current marker one.
	 */
	reverseGeocodeCurrentRecord: function(newGISlocation, addressOnly)
	{
		if (!newGISlocation)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] New Location has no GIS Data - Using current location");
			}
			newGISlocation = this.currentMarker.location;
		}
		var fctError = function(error)
		{
			this.reverseGeocodeCallbackError(error, newGISlocation, addressOnly);
		};
		var fctSuccess = function(revData)
		{
			this.reverseGeocodeCallback(revData, newGISlocation);
		};

		this.map.geocoder.reverseGeocode(newGISlocation.lat, newGISlocation.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));
	},
	reverseGeocodeAddressOnly: function()
	{
		this.reverseGeocodeCurrentRecord(null, true);
	},
	/**
	 * In case it fails to find an address based on the coordinates only the
	 * coordinates are set. If the coordinates has not changed nothing is
	 * updated on the server.
	 * 
	 * @param error -
	 *            error code
	 * @see ibm.tivoli.fwm.mxmap.Geocoder.ErrorCodes
	 * @param point -
	 *            from this reverse geocode was executed
	 */
	reverseGeocodeCallbackError: function(error, point, addressOnly)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Error during reverse geocoding for current record", error);
		}
		if (addressOnly && addressOnly == true)
		{
			// only address is needed. no x/y needed.
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] No address found");
			}
			this.map.getMaximo().showMessage("mapserver", "auto_revgeocode_noresults");
			return;
		}
		else
		{
			if (!this.currentMaker || point.lat != this.currentMarker.location.lat || point.lng != this.currentMarker.location.lng)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[CurrentMXRecManager] Coordinates changed, setting value on server", point);
				}
				if (point.lat && point.lng)
				{
					this.map.getMaximo().setCurrentRecordLocation({
						lat: point.lat,
						lng: point.lng
					}, "FAILED_REV_GEOCODE");
				}
			}
		}
	},

	/**
	 * An address was during reverse geocoding. Only its address is set into the
	 * SA record. The coordinates are the same of the marker.
	 * 
	 * @param location -
	 *            usually where marker was dropped
	 * @param originalLocation -
	 *            from where it was moved
	 */
	reverseGeocodeCallback: function(location, originalLocation)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Processing reverseGeocodeCallback: ", location);
		}
		var point = originalLocation;
		// gets the address of the first record as
		// we are working with x/y coordinates
		var address = location[0].formattedAddress;
		this.map.getMaximo().setCurrentRecordLocation({
			lat: point.lat,
			lng: point.lng,
			address: address
		});
	}
});
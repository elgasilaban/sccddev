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
dojo.provide("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.MXRecord");

/**
 * Controls the set of records (SA) that are on the map.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	records: null,
	mxRecords: null,
	mboInfoArray: null,
	markerImgUrl: null,
	_hidden: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.mxRecords = [];
		this.mboInfoArray = [];
		// this.records = new ibm.tivoli.fwm.mxmap.MXRecordSet({map: this.map,
		// records: this.records, markerImgUrl: this.markerImgUrl});
		this.addSubscription(dojo.subscribe("onCurrentRecordSetUpdated_" + this.map.getId(), dojo.hitch(this, this.updateRecordSetAndRefresh)));
		if (this.records != null)
		{
			this.updateRecordSet(this.records);
		}
	},
	isEmpty: function()
	{
		if (this.mxRecords)
		{
			for ( var id in this.mxRecords)
			{
				return false;
			}
		}
		return true;
	},
	centerAndZoom: function()
	{
		this.map.zoomToMbos(this.mboInfoArray);
	},
	showMXRecordsOnMap: function(noZoom)
	{
		var markerOptions = {
			"enableMapTips": true
		};

		this.map.showAllMboRecords(this.mboInfoArray, markerOptions, noZoom != true);
		this._hidden = false;
	},
	updateRecordSetAndRefresh: function(newRecords, noZoom)
	{
		this.updateRecordSet(newRecords);
		this.showMXRecordsOnMap(noZoom);
	},
	length: function()
	{
		return this.mxRecords.length;
	},
	updateRecordSet: function(newRecords)
	{
		while (this.mxRecords.length > 0)
		{
			var mxRec = this.mxRecords.pop();
			mxRec._removeMarker();
		}

		this.records = newRecords;
		this.mxRecords = [];
		this.mboInfoArray = [];
		for ( var id in this.records)
		{
			var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: this.records[id],
				map: this.map
			});
			if (mxRec.hasAnyGISCoordinates())
			{
				this.mxRecords.push(mxRec);
				this.mboInfoArray.push(this.records[id]);
			}
		}
	},

	destroyRecursive: function()
	{
		this.inherited(arguments);

	}
});
//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/MXRecord", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.MXRecord");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

dojo
		.declare(
				"ibm.tivoli.fwm.mxmap.MXRecord",
				ibm.tivoli.fwm.mxmap._Base,
				{
					mboInfo: null,
					map: null,

					markerImgUrl: null,
					markerImgInfo: null,
					lbsMarker: null,
					lbsMarkerImgInfo: null,
					lbsCircle: null,
					imageLibManager: null,
					isMboOnMap: false,
					constructor: function(options)
					{
						dojo.mixin(this, options);
						// this.imageLibManager =
						// ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
					},

					/**
					 * Checks if the currrent SA record has an address
					 * 
					 * @returns true if it has any address different than ""
					 */
					hasAddress: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata && this.mboInfo.gisdata.address != null && this.mboInfo.gisdata.address != "");
					},
					hasGISCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata != null && this.mboInfo.gisdata.lat != null && this.mboInfo.gisdata.lng != null);
					},
					hasAutolocateGISCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.lng != null)
								|| this.hasAutolocateSpatialData();
					},
					hasAutolocateGISOnlyCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.lng != null);
					},
					hasAutolocateSpatialData: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.PLUSSISGIS != null && this.mboInfo.autolocate.gisdata.PLUSSISGIS == true);
					},
					hasAnyGISCoordinates: function()
					{
						return this.hasGISCoordinates() || this.hasAutolocateGISCoordinates() || this.hasSPATIALCoordinates();
					},
					hasLBSCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.lbsdata && this.mboInfo.lbsdata.lat != null);
					},
					hasSPATIALCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata != null && this.mboInfo.gisdata.PLUSSISGIS == true);
					},
					_removeMarker: function()
					{
						console.log("[mxmap.MXRecord._removeMarker] calling map.removeMboMarker " + this.mboInfo.mxdata.uid.value);
						this.map.removeMboMarker(this.mboInfo);
						this.isMboOnMap = false;
					},
					/**
					 * Triggered always that any new data from server is
					 * received. It will update the current representation of
					 * the current record on the map.
					 */
					serverUpdated: function(data)
					{
						console.log("MXRecord.serverUpdated ");
						this.mboInfo = data;
						this.isMboOnMap = false;
						this._updateMarkerLocation(data);
					},
					/**
					 * Updates the current marker based on the new location
					 * data. It also publishes the event that the current record
					 * location has been updated thru 'onCurrentLocationUpdated'
					 * event
					 */
					_updateMarkerLocation: function(newMboInfo, noZoom)
					{
						console.log("[MXrecord] Updating  Location ", newMboInfo);
						this._removeMarker();
						this.mboInfo = newMboInfo;
						if (this.hasAnyGISCoordinates())
						{
							this._placeMarker();
							if (noZoom != true)
							{
								this.center();
							}
						}

					},

					/**
					 * Places a marker for the current record. Also adds a
					 * handler for dragging event of this marker.
					 */
					_placeMarker: function()
					{

						this.map.addMboToLayerManager(this.mboInfo);
						this.isMboOnMap = true;
					},

					/**
					 * Center the map over the current record
					 */
					center: function()
					{
						this.centerAndZoom();
					},

					/**
					 * Center the map over the current record and zoom.
					 * 
					 * @param zoom
					 *            level
					 */
					centerAndZoom: function(zoomLevel)
					{
						if (this.hasAnyGISCoordinates())
						{
							console.log("[MXRecord] About to center and zoom on record on marker");
							if (this.isMboOnMap == false)
							{
								this._placeMarker();
							}

							this.map.centerOnMbo(this.mboInfo, zoomLevel);

						}
					},
					getMXLatLng: function()
					{
						return new mxn.LatLonPoint(this.mboInfo.gisdata.lat, this.mboInfo.gisdata.lng);
					},
					/* 12-100070 */
					_isDraggable: function()
					{
						if (this.mboInfo.gisdata && this.mboInfo.gisdata.flags && this.mboInfo.gisdata.flags.readonly == true)
						{
							return false;
						}
						return (this.draggable && this.draggable == true);
					},
					hide: function()
					{
						console.log("[MXRecord] hiding marker", this);

					},
					remove: function()
					{
						this._removeMarker();
					},
					show: function()
					{
						if (this.isMboOnMap == false)
						{
							if (this.hasAnyGISCoordinates() == true)
							{
								this._placeMarker();

							}
						}
					}
				});
});

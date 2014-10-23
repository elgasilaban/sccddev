//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/ImageLibraryManager", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/MarkerImageInfo"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.MarkerImageInfo");

ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance = null;

dojo.declare("ibm.tivoli.fwm.mxmap.ImageLibraryManager", null, {
	_infoCache: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._loadCache();
	},
	getMarkerImageInfoForObject: function(objectName) {
		
		var result = objectName ? this._infoCache[objectName.toUpperCase()] : null;
		if(!result)
		{
			console.warn("[ImageLibraryManager] No marker image found for object " + objectName);
			console.warn("[ImageLibraryManager] returning default one");
			return this.getDefaultMarkerImageInfo();
		}
		return result;
	},
	getLBSMarkerImageInfo: function(lbsData) {
		if (lbsData)
		{
			if ("EXCEEDED_TOLERANCE" === lbsData.max_accuracy_state)
			{
				return this.getMarkerImageInfoForObject("__LBS_EXCEEDED_ACCURACY");
			}
			else if ("EXCEEDED_TOLERANCE" === lbsData.last_update_condition_state)
			{
				return this.getMarkerImageInfoForObject("__LBS_EXCEEDED_UPDATE_COND");
			}
			else
			{
				return this.getMarkerImageInfoForObject("__LBS_INSIDE_TOLERANCE");
			}
		}
		console.warn("no lbs data!");
		return null;
	},
	getDefaultMarkerImageInfo: function() {
		return this._infoCache["__DEFAULT_MARKER"];
	},
	getStartPositionMarkerImageInfo: function() {
		return this._infoCache["__START_POSITION_MARKER"];
	},
	getEndPositionMarkerImageInfo: function() {
		return this._infoCache["__END_POSITION_MARKER"];
	},
	getLayerOnImageInfo: function() {
		return this._infoCache["__LAYER_ON"];
	},
	getLayerOffImageInfo: function() {
		return this._infoCache["__LAYER_OFF"];
	},
	getLayerDetailsImageInfo: function() {
		return this._infoCache["__LAYER_DETAILS"];
	},
	getLayerDetailsOffImageInfo: function() {
		return this._infoCache["__LAYER_DETAILS_OFF"];
	},
	getDefaultReadOnlyMarkerImageInfo: function() {
		return this._infoCache["__DEFAULT_RO_MARKER"];
	},
	getMyLocationMarkerImageInfo: function() {
		return this._infoCache["__MY_LOCATION"];
	},
	getDefaultWorkOrderMarkerImageInfo: function() {
		return this._infoCache["WORKORDER"];
	},
	getResourcesPath: function() {
		return dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "resources");
	},
	// temporary to accommodate the custom marker
	// we should have something to allow users to override
	// the images
	updateDefaultMarkerImageURL: function(newURL)
	{
		this.getDefaultMarkerImageInfo().setImageURL(newURL);
	},
	_loadCache: function()
	{	
		var rtlDir = "";
		if(document.body.dir == "rtl")
		{
			rtlDir = "/rtl";
		}

		this._infoCache = {};
		this._infoCache["LABOR"] = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/labor/map_locationLabor.png", imageSize: [47,36], imageAnchor:[24,41]}); 
		this._infoCache["AMCREW"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/crew/map_locationCrew.png", imageSize: [47,36], imageAnchor:[24,41]});
		this._infoCache["WORKORDER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/workorder/map_WO_default.png", imageSize: [47,36], imageAnchor:[24,36]});
		this._infoCache["__DEFAULT_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/map_default_marker.png", imageSize: [36,36], imageAnchor:[11,36]});
		this._infoCache["__START_POSITION_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_start.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__END_POSITION_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_red.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__DEFAULT_RO_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/map_default_marker.png", imageSize: [32,32], imageAnchor:[0,32]});
		this._infoCache["__LBS_EXCEEDED_ACCURACY"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_red.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LBS_EXCEEDED_UPDATE_COND"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_yellow.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LBS_INSIDE_TOLERANCE"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_blue.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__MY_LOCATION"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_blue.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LAYER_ON"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/checkBox_selected.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_OFF"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/checkBox_unselected.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_DETAILS"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbologyMenu_arrow.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_DETAILS_OFF"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbologyMenu_arrow_off.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["UNASSIGNEDWORK"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/marker_yellow.png", imageSize: [20,34], imageAnchor:[10,34]});
	}
});

ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager = function()
{
	if(!ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance)
	{
		ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance = new ibm.tivoli.fwm.mxmap.ImageLibraryManager();	
	}
	return ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance;
};

});

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
dojo.provide("ibm.tivoli.fwm.mxmap.Geocoder");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.i18n");
/**
 * Maximo geocoder helper class.
 */
ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes={
	ZERO_RESULTS:"ZERO_RESULTS",
	INVALID_REQUEST:"INVALID_REQUEST",
	REQUEST_DENIED:"REQUEST_DENIED",
	OVER_LIMIT:"OVER_LIMIT",	
	UNKNOWN:"UNKNOWN"
};
dojo.declare("ibm.tivoli.fwm.mxmap.Geocoder", ibm.tivoli.fwm.mxmap._Base, {

	map: null,	 
	key: null, //some GeoCoder provider demand a Key to be passed to the geocoder interface
	_geocode : null,
	_candidateDialog: null,
	
	/**
	 * Adds the listener to the mxmap_geocoder event which triggers the
	 * findlocation action
	 * 
	 * @param options
	 */
	constructor : function(options) {
		dojo.mixin(this, options);
		this.addSubscription(dojo.subscribe("mxmap_geocoder_"+this.map.getId(), dojo.hitch(this, this.findLocation)));
		this.addSubscription(dojo.subscribe("addressCandidateSelectedOnMapId_" + this.map.getId(), dojo.hitch(this, this._addressCandidateSelected)));
	},
	
	/**
	 * Find a location on the map based on the address string.<br>
	 * 
	 * In case it fails to find an address it displays the returned Geocode
	 * status message.
	 * 
	 * @param address -
	 *            the address string to be geocoded
	 * @param callback -
	 *            If any success function must handle the results other than the
	 *            default one. By default it sets the returned data (coords and
	 *            address) into the current SA record.
	 * @see Geocoder.returnFindLocation
	 * @param errorCallback -
	 *            If any error function must handle the results other than the
	 *            default one.
	 * @see Geocoder.errorDuringGeocode
	 */
	findLocation : function(address, callback, errorCallback) {
		if(!address || address.length==0){
			return;
		}
		if (!errorCallback) {
			errorCallback = dojo.hitch(this, this.errorDuringGeocode);
		}
		if (!callback) {
			callback = dojo.hitch(this, this.returnFindLocation);
		}
		this._geocode = new mxn.Geocoder(this.map.providerName, callback, errorCallback,{key:this.key,map:this.map.getMapstraction(),customParams:this.map.getGeoCoderConf()});

		this._geocode.geocode({
			address : address
			
		});

	},
	
	/**
	 * Reverse geocode based on lat/lng coordinates. <br>
	 * 
	 * @param lat -
	 *            Latitude
	 * @param lng -
	 *            Longitude
	 * @param callback -
	 *            If any success function must handle the results other than the
	 *            default one. By default it sets back the currentSA record
	 *            address.
	 * @see Geocoder.returnUpdateAddress
	 * @param errorCallback -
	 *            If any error function must handle the results other than the
	 *            default one.
	 * @see Geocoder.returnFindLocation
	 */
	reverseGeocode : function(lat, lng, callback, errorCallback) {
		if (!errorCallback) {
			errorCallback = dojo.hitch(this, this.errorDuringGeocode);
		}
		if (!callback) {
			callback = dojo.hitch(this, this.returnUpdateAddress);
		}
		this._geocode = new mxn.Geocoder(this.map.providerName, callback, errorCallback,{key:this.key,map:this.map.getMapstraction(),customParams:this.map.getGeoCoderConf()});
		this._geocode.geocode({
			lat : lat,
			lng : lng
		});
	},

	convertGeocodedAddressIntoFormattedAddress : function(location) {
		return location.formattedAddress;
	},
	
	/**
	 * Having a location with coords data, set the current SA record coords.
	 * 
	 * @param addressCandidates 
	 */
	returnFindLocation: function(addressCandidates) {
		if (dojo.config.fwm.debug == true)
		{
		console.log("[Geocoder] Address candidates: ", addressCandidates);
		}
		if(addressCandidates.length == 1){
			var location1 = addressCandidates[0];
			this.map.getMaximo().setCurrentRecordLocation({
				lat : location1.point.lat,
				lng : location1.point.lng,
				address : this.convertGeocodedAddressIntoFormattedAddress(location1)
			});
		}else{
			var me = this;
			var title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "addresscandidates");
			if(this._candidateDialog==null){
				this._candidateDialog = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({map: me.map, title: title});
			}
			var content1 = ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter
									.createHTMLDOMWithList(
											addressCandidates,
											this.map.getId(),
											this._candidateDialog.getCalculatedWidth(),
											this._candidateDialog.getCalculatedHeight());			
			this._candidateDialog.setContent(content1);
			this._candidateDialog.show();
		}
	},
	
	/**
	 * Having a location with address data, set the current SA record formattted
	 * address.
	 * 
	 * @param object
	 *            with address information.
	 */
	returnUpdateAddress : function(location) {
		this.map.getMaximo().setCurrentRecordLocation({
			address : this.convertGeocodedAddressIntoFormattedAddress(location)
		});
	},
	
	/**
	 * Handles geocoding errors and display msgs accordingly
	 * 
	 * @param String
	 *            with error value
	 */
	errorDuringGeocode : function(errorCode) {
		switch (errorCode) {
		
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.ZERO_RESULTS:
			this.map.getMaximo().showMessage("mapserver", "geocode_noresults");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.INVALID_REQUEST:
			this.map.getMaximo().showMessage("mapserver", "geocode_invalid_req");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.REQUEST_DENIED:
			this.map.getMaximo().showMessage("mapserver", "geocode_req_denied");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.OVER_LIMIT:
			this.map.getMaximo().showMessage("mapserver", "geocode_limits_exceed");
			break;
		
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.UNKNOWN:
			this.map.getMaximo().showMessage("mapserver", "geocode_unknown_error");
			break;

		default:
			this.map.getMaximo().showMessage("mapserver", "geocode_unknown_error");
			break;
		}		
		console.info("[Geocoder] Geocoder Service returned an error code: ", errorCode);
	},
	
	/**
	 * Callback method for address selected from the address candidate dialog 
	 * address.
	 * 
	 * @param object with address information.
	 */
	_addressCandidateSelected: function(addressSelected)
	{
		if(this._candidateDialog){			
			this._candidateDialog.close();
			this._candidateDialog = null;
		}
		this.returnFindLocation([addressSelected]);
	}
});
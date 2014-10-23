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
dojo.provide("ibm.tivoli.fwm.mxmap.UserSessionManager");
/**
 * 
 */
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.declare("ibm.tivoli.fwm.mxmap.UserSessionManager", ibm.tivoli.fwm.mxmap._Base, {
	map:null,
	lastUserLocation:null,
	constructor: function(params)
	{
		dojo.mixin(this, params);

		dojo.addOnUnload(dojo.hitch(this, this.onMapExit));
		
		if(this.map.getSessionData() && this.map.getSessionData().lastUserLocation){			
			this.lastUserLocation=dojo.fromJson(this.map.getSessionData().lastUserLocation);
		}
		console.log(this.lastUserLocation);
	},
	hasLastUserLocation:function(){
		if(this.lastUserLocation!=null && this.lastUserLocation.lat && this.lastUserLocation.lng){
			return true;
		}
		return false;
	},
	getLastUserLocation:function(){
		return this.lastUserLocation;
	},
	
	onMapExit:function(){
		var mapstraction = this.map.getMapstraction();
		if(mapstraction){
			var locInfo ={				
					lat: mapstraction.getCenter().lat,
					lng: mapstraction.getCenter().lng,
					level: mapstraction.getZoom(),
					customData:this.map.getInitialLocationCustomInfo()
			};
			console.info("[UserSessionManager] Saving Location", locInfo);
			this.map.getMaximo().storeUserLocation(locInfo);
		}else{
			console.info("[UserSessionManager] Could not save location. Mapstraction is null.");
		}
	}
});
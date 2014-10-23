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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.GMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.declare("ibm.tivoli.fwm.mxmap.impl.GMaps", ibm.tivoli.fwm.mxmap.Map, {
	
	constructor : function(options) {
		this.providerName="googlev3";
	},
	_getCustomInitOptions:function(){
		
		if(this.customInitialMapOptions){
			return this.customInitialMapOptions.gmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	_getInitOptions : function() {
		var options = {
			panControl : true,
			mapTypeControl : true,
			scaleControl : true,
			overviewMapControl : true,
			streetViewControl : true,
			scaleControlOptions : {
				style : google.maps.ScaleControlStyle.DEFAULT
			},
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

		if (this.isMobile == true) {
			options.panControl = false; //does not work and looks bad on native android browser
			options.overviewMapControl = false;
			options.scaleControl = false; //looks bad on native android browser and takes space from map
		}

		return options;
	},
	destroyMap:function(){
		//TODO
	}
	
});
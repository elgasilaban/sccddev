//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/factories/gmaps", ["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/GMaps"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.gmaps");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.GMaps");
/**
 * Factory to load google maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.gmaps = {
	compId:null,
	/**
	 * After we load the google maps javascripts this method is called. 
	 */
	apiLoaded : function() {
		console.log('Google Maps API is now available');		
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.GMaps","gmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {		
		this._loadJSApi(options.mapConf.key, options.mapConf.https);
	},
	/**
	 * this method loads the google maps api and the mapstraction js for google.
	 */
	_loadJSApi : function(key, https) {
		var protocol = 'http';
		var license = '';
		if(https)
			protocol = 'https';
		if(key)
			license = '&client=' + key;
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.googlev3.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.googlev3.geocoder.js", "js");
		dojo.io.script.get({
			url : protocol + '://maps.google.com/maps/api/js?v=3.8&sensor=true&callback=ibm.tivoli.fwm.mxmap.factories.gmaps.apiLoaded' + license,
			timeout : 30000,
			error : function() {
				console.error('Failed to load google apis');
				alert('Failed to load google maps api, check your internet conncetion.');
			}
		});
	}
};
});

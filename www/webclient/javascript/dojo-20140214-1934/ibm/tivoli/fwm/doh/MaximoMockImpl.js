//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/MaximoMockImpl", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/MaximoIntegration"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.MaximoMockImpl");
dojo.require('ibm.tivoli.fwm.mxmap.MaximoIntegration');
dojo.declare("ibm.tivoli.fwm.doh.MaximoMockImpl", ibm.tivoli.fwm.mxmap.MaximoIntegration, {
	handleServer: function(actions)
	{
		console.log("[Maximo Integration] Actions Received: ", actions);
	},
	storeUserLocation: function(locationInfo)
	{
		console.log("store loc");
	},
	getRouteStops: function(callback, erroCb)
	{
		console.log("getRouteStops")
	},
	loadMapTipTemplate: function(mxdata, successCallback, errorCallback)
	{
		console.log("loadMapTipTemplate")
	},
	loadMapTipItems: function(successCallback, errorCallback)
	{
		console.log("loadMapTipItems")
	},
	setCurrentRecordLocation: function(location, status)
	{
		console.log("setCurrentRecordLocation")
	},
	showMessage: function(msgGroup, msgKey, params)
	{
		alert(msgGroup + "#" + msgKey);
	},
	showMaximoDialog: function(dialogId, objectname, objectid)
	{
		console.log("showMaximoDialog");
	},
	refreshMap: function()
	{
		console.log("refreshMap");
	}
});
});

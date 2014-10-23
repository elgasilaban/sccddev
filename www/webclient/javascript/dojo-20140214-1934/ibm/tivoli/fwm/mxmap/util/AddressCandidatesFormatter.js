//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/util/AddressCandidatesFormatter", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelLine"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine");
/**
 * @param candidates An array with objects that has formattedAddress attribute
 * @param mapId the of the geocoder's map.
 * @param dialog width
 * @param dialog height
 * @return a DOM object with the information
 * */
ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter.createHTMLDOMWithList = function(candidates, mapId, width, height){
	var holder = dojo.create("div");

	// because of ie does not accept 100%, we do not use the table style
	// we use the dialog width -20 px
	var _width = width - 25;
	var table = dojo.create("table", {role: "grid", valign: "top", width:"100%", "class":"addressCandidateTable"}, holder, "last");
	
	// 12-10393: ie needs a tbody
	var tbody = dojo.create("tbody", {}, table, "last");	
	
	// creates a closure to capture the address
	var newPublishFunctionForAddress = function(selectedAddress){
		return function() { 
			dojo.publish("addressCandidateSelectedOnMapId_" + mapId, [selectedAddress]); 
		};
	};
	// as per designed, show only the first 10 candidates
	if(candidates.length > 10){
		candidates = candidates.slice(0, 10);
	}
	
	for(var index in candidates){
		var candidate = candidates[index];
		//var rowClass = index % 2 != 0 ? "tablerow trodd" : "tablerow  treven";  //breaks the horizontal scroll in small widths
		var rowClass = index % 2 != 0 ? "" : "addresscandidateRowStyle";
		var selectAddress = newPublishFunctionForAddress(candidate);
		var _content = candidate.formattedAddress;
		var newLine = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine();
		newLine.setRowClass(rowClass);
		newLine.setCallbackFunction(selectAddress);
		newLine.setContent(_content);
		newLine.placeAt(tbody, "last");
	}	
	return holder;
};
});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/itinerary/Step", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/routing/Router"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");

/**
 * 
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Step", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/Step.html", "<div  style=\"width:100%;border-top:1px solid #F0F0F0;margin-bottom:3px;\" data-dojo-attach-event=\"ondijitclick:_onClick,onmouseenter:_onHover,onmouseleave:_onUnhover\" >\n\n<div  style=\"padding:10px;\">\n<span data-dojo-attach-point=\"stepInfoNode\"></span><div data-dojo-attach-point=\"distanceInfoNode\" style=\"float:right;\"></div></div>\n</div>"),
	distanceUnit:0,
	distance:0,
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	postCreate: function()
	{
		this.stepInfoNode.innerHTML = "<b>" + this.position + ".  </b>" + this.info;
		
		this.distanceInfoNode.innerHTML = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatDistance(this.distance,this.distanceUnit);
	},
	_onClick: function(evt)
	{
		console.log("Clicked on step " , this);
		this.map.getMapstraction().setCenter(this.location);
		this.closeDialog();
		
	},
	_onHover: function(evt)
	{
		// console.log("e")
		// dojo.style(this.domNode,"border","1px solid black");
	},
	_onUnhover: function(evt)
	{
		// console.log("a")
		// dojo.style(this.domNode,"border","0px solid black");
	}
});

});

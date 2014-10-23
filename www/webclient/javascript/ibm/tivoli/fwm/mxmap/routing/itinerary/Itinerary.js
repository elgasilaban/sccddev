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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents an intinerary among route stops.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary", ibm.tivoli.fwm.mxmap._Base, {
	initialLocation: null,
	legs: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.legs = [];
		this.initialLocation = {};
	},
	setInitialLocation: function(info, location, locationMarker, clickCallback,needsToGeocode)
	{
		this.initialLocation = {
			location: location,
			info: info,
			needsToGeocode:needsToGeocode,
			marker: locationMarker,
			onclick: clickCallback
		};
	},
	addAllLegs: function(legs)
	{
		this.legs = this.legs.concat(legs);
	},
	addLeg: function(/* mxn.LatLng */location, /*string with the stop info*/info,/*distance in km or miles*/ distanceToLeg,/*duration in minutes*/ durationToLeg, locationMarker, steps, clickCallback, pos)
	{
		var leg = {
			location: location,
			distanceToLeg: distanceToLeg,
			durationToLeg: durationToLeg,
			info: info,
			needsToGeocode:false,
			marker: locationMarker,
			steps: steps,
			onclick: clickCallback
		};
		if (!pos)
		{
			this.legs.push(leg);
			return this.legs.length-1;
		}
		else
		{
			this.legs[pos] = leg;
			return pos;
		}
		
	},
	getInitialLocation: function()
	{
		return this.initialLocation;
	},
	clearAll: function()
	{
		this.legs = [];
		this.initialLocation = {};
	}
});
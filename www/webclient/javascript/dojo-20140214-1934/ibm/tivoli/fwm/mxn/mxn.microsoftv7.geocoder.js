//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxn/mxn.microsoftv7.geocoder", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/*
*
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
*/
/**
 * !This implementation demands Dojo! Implements the Bing maps Location Rest
 * service wrapper for mapstraction.
 * 
 * 
 * Bing Services Locations API reference:
 * http://msdn.microsoft.com/en-us/library/ff701715.aspx
 */
mxn.register('microsoftv7', {
	
	Geocoder : {
		init : function() {
			var me = this;		
			//  There's no native bing location api, just a REST interface. That's why we
			//  set an empty object into the this.geocoders.
			this.geocoders[this.api] = {};
			// maybe in the future we should create other function to avoid any
			// collisions
			window._mxn_Bing_Geocodecallback = function(args) {
				me.geocode_callback(args);
			};
		},
		/**
		 * 
		 */
		geocode : function(address) {
			var me = this;			
			if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
				// we can use this strucuted info to improve the search in the
				// future:
				// http://msdn.microsoft.com/en-us/library/ff701714.aspx
				address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
			}

			if (address.hasOwnProperty('lat') && (address.hasOwnProperty('lon') || address.hasOwnProperty('lng'))) {
				var lat = address.lat;
				var lng = address.lng;
				if (!lng) {
					lng = address.lon;
				}
				
				var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + lat + "," + lng + "?output=json&jsonp=_mxn_Bing_Geocodecallback&key=" + me.optParams.key;
				dojo.io.script.get({
					url : geocodeRequest,
					timeout : 13000,
					error : function(error) {
						console.error('Failed to access bing maps geocoding api',error);
						alert('Failed to access bing maps geocoding api');
					}
				});
			} else {
				var mapView="";
				
				if(me.optParams.map && me.optParams.map.getBounds()){
					
					var ne = me.optParams.map.getBounds().getNorthEast();
					var sw = me.optParams.map.getBounds().getSouthWest();
					
					mapView = "mapView="+sw.lat+","+sw.lng+","+ne.lat+","+ne.lng;
				}
				var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + address.address + "?output=json&jsonp=_mxn_Bing_Geocodecallback&key=" + me.optParams.key+"&"+mapView;
				
				dojo.io.script.get({
					url : geocodeRequest,
					timeout : 13000,
					error : function(error) {
						console.error('Failed to access bing maps geocoding api',error);
						alert('Failed to access bing maps geocoding api');
					}
				});

			}
		},
		/**
		 * Callback function. It converts the results into mapstraction object. 
		 */
		geocode_callback : function(response) {
			var isBestMatch = function(candidate){
				var confidence = candidate.confidence || "";
				var matchCodes = candidate.matchCodes[0] || "";				
				var calculationMethod = "";
				if(candidate.geocodePoints){
					calculationMethod = candidate.geocodePoints[0].calculationMethod || ""; 
				}
				return (confidence == "High" && matchCodes == "Good" && calculationMethod == "Rooftop"); 				
			};
			var convertBingToMapstraction = function(bingResult) {
				var _location = {};
				_location.formattedAddress = bingResult.address.formattedAddress;
				_location.street = bingResult.address.street;
				_location.locality = bingResult.address.locality;
				_location.region = bingResult.address.adminDistrict;
				_location.country = bingResult.address.countryRegion;
				
				_location.point = new mxn.LatLonPoint(bingResult.point.coordinates[0], bingResult.point.coordinates[1]);
				return _location;
			};
			var all_locations = [];
			if (response.authenticationResultCode != "ValidCredentials") {
				// throw "Invalid credentials. Check if the Bing Maps geocode
				// api key is valid.";
				this.error_callback(response.authenticationResultCode);
				return;
			}
			if (response.statusCode == 200) {
				var results = response.resourceSets;
				for (var setId in results) {
					var set = results[setId];
					if (set.estimatedTotal == 0) {
						this.error_callback("ZERO_RESULTS");
						return;
					}
					for (var rid in set.resources) {
						var result = set.resources[rid];						
						if(isBestMatch(result) == true)
						{
							this.callback([convertBingToMapstraction(result)]);
							return;
						}
						all_locations.push(convertBingToMapstraction(result));
					}
				}
			} else {
				this.error_callback(response.statusDescription);
				return;
			}

			this.callback(all_locations);
		}
	}
});
});

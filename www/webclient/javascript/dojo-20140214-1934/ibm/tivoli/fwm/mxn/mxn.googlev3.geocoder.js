//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxn/mxn.googlev3.geocoder", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/*
MAPSTRACTION   v2.0.17   http://www.mapstraction.com

(C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
Copyright (c) 2011 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
mxn.register('googlev3', {

	Geocoder : {

		init : function() {
			this.geocoders[this.api] = new google.maps.Geocoder();
		},

		geocode : function(address) {
			var me = this;

			if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
				address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
			}
			
			if (address.hasOwnProperty('lat') && (address.hasOwnProperty('lon') || address.hasOwnProperty('lng'))) {
				// command from mxn default implementation
				var lng = (address.lng) ? address.lng : address.lon;
				var lat = address.lat;
				var latlon = new google.maps.LatLng(lat,lng);
				
				this.geocoders[this.api].geocode( {
									'latLng': latlon
								}, function(results, status)
								{
									me.geocode_callback(results, status);
								});
			} else {
				
				var params= {
						'address' : address.address						
				};
				
				if(me.optParams.map && me.optParams.map.getBounds()){
					
					var ne = me.optParams.map.getBounds().getNorthEast();
					var sw = me.optParams.map.getBounds().getSouthWest();
					
					var bounds = new google.maps.LatLngBounds(sw.toProprietary(this.api),ne.toProprietary(this.api));
					params.bounds=bounds;
					
				}
				
				this.geocoders[this.api].geocode(params, function(results, status) {
					me.geocode_callback(results, status);
				});
			}
		},

		geocode_callback : function(results, status) {
			var isBestMatch = function(candidate){
				var result = false;
				if(candidate.geometry && candidate.geometry.location_type){
					var locationType = candidate.geometry.location_type;				
					result = (locationType == google.maps.GeocoderLocationType.ROOFTOP);
				}
				return result;
			};
			
			// this is Maximo team update:
			var all_locations = [];
			if (status != google.maps.GeocoderStatus.OK) {
				this.error_callback(status);
			} else {
				for ( var rid in results) {
					var place = results[rid];
					var streetparts = [];
					var return_location = {
						street : '',
						locality : '',
						postcode : '',
						region : '',
						country : '',
						formatted_address : ''
					};
					return_location.formattedAddress = place.formatted_address;
					for ( var i = 0; i < place.address_components.length; i++) {
						var addressComponent = place.address_components[i];

						for ( var j = 0; j < addressComponent.types.length; j++) {
							var componentType = addressComponent.types[j];
							switch (componentType) {
							case 'country':
								return_location.country = addressComponent.long_name;
								break;
							case 'administrative_area_level_1':
								return_location.region = addressComponent.long_name;
								break;
							case 'locality':
								return_location.locality = addressComponent.long_name;
								break;
							case 'street_address':
								return_location.street = addressComponent.long_name;
								break;
							case 'postal_code':
								return_location.postcode = addressComponent.long_name;
								break;
							case 'street_number':
								streetparts.unshift(addressComponent.long_name);
								break;
							case 'route':
								streetparts.push(addressComponent.long_name);
								break;
							}
						}
					}

					if (return_location.street === '' && streetparts.length > 0) {
						return_location.street = streetparts.join(' ');
					}

					return_location.point = new mxn.LatLonPoint(place.geometry.location.lat(), place.geometry.location.lng());

					if(isBestMatch(place) == true)
					{
						this.callback([return_location]);
						return;
					}					
					all_locations.push(return_location);					
				}			
				this.callback(all_locations);				
			}
		}
	}
});
});

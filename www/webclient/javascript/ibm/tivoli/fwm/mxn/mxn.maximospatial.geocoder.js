/*
 *
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 */
mxn.register('maximospatial', {

	Geocoder: {

		init: function()
		{
			var me = this;
			esriDojoNew.require("esri.tasks.locator");
			
			this.locator = new esri.tasks.Locator(this.optParams.customParams.url);
			dojo.connect(this.locator, "onAddressToLocationsComplete", dojo.hitch(this, this.geocode_callback));

			var revgeocode_callback = function(candidate)
			{				

				if (candidate && candidate.address)
				{
					// this service returns geocoding results in geographic -
					// convert to web mercator to display on map
					var _location = {};
					_location.formattedAddress = "";
					if (candidate.address.Address)
					{
						_location.formattedAddress = candidate.address.Address;
					}
					if (candidate.address.City)
					{
						if (_location.formattedAddress.length > 0)
						{
							_location.formattedAddress += ', ';
						}
						_location.formattedAddress += candidate.address.City;
					}
					if (candidate.address.State)
					{
						if (_location.formattedAddress.length > 0)
						{
							_location.formattedAddress += ', ';
						}
						_location.formattedAddress += candidate.address.State;
					}
					if (candidate.address.Zip)
					{
						if (_location.formattedAddress.length > 0)
						{
							_location.formattedAddress += ', ';
						}
						_location.formattedAddress += candidate.address.Zip;
					}
					if (candidate.address.Zip4)
					{
						if (_location.formattedAddress.length > 0)
						{
							_location.formattedAddress += ', ';
						}
						_location.formattedAddress += candidate.address.Zip4;
					}

					_location.point = new mxn.LatLonPoint(candidate.location.y, candidate.location.x);
					me.callback([ _location ]);
				}
				else
				{
					me.error_callback("ZERO_RESULTS");
				}
			};

			dojo.connect(this.locator, "onLocationToAddressComplete", revgeocode_callback);
			dojo.connect(this.locator, "onError", dojo.hitch(this, this.error_callback));

		},

		geocode: function(address)
		{
			this.locator.outSpatialReference = window.mx.esri.sr;
			if (!address.hasOwnProperty('address') || address.address === null || address.address === '')
			{
				var ax = address.lng; // anchor x
				var ay = address.lat; // anchor y
				var myPoint = new esri.geometry.Point(ax, ay, this.locator.outSpatialReference);
				this.locator.locationToAddress(myPoint, 100);
			}
			else
			{
				this.locator.addressToLocations({
					'SingleLine': address.address
				}, [ "*" ]);
			}
		},

		geocode_callback: function(response)
		{

			var convertEsriToMapstraction = function(item)
			{
				var _location = {};
				var result = item.attributes;
				_location.formattedAddress = result.Match_addr;
				_location.street = result.StreetName;
				_location.locality = result.City;
				_location.region = result.State;
				_location.country = result.Country;
				_location.point = new mxn.LatLonPoint(item.location.y, item.location.x);
				_location.score = item.score;
				
				return _location;
			};
			var sortList = function(list)
			{
				var _length = list.length;
				var i, j;
				for (i = 0; i < _length; i++)
				{
					for (j = i + 1; j < _length; j++)
					{
						var diff = list[i].score - list[j].score;
						if (diff < 0)
						{
							var aux = list[i];
							list[i] = list[j];
							list[j] = aux;
						}
					}
				}
				return list;
			};

			var all_locations = [];

			if (response == null || response.length == 0)
			{
				this.error_callback("ZERO_RESULTS");
				return;
			}
			else
			{
				dojo.forEach(response, function(item, index)
				{
					// there were some tests were we had more that 1 record with
					// a score of 100. Based on the values with high score, it
					// is
					// better to let the user pick up one record.
					all_locations.push(convertEsriToMapstraction(item));
				});
			}
			this.callback(sortList(all_locations));
		}
	}
});
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

	Mapstraction: {

		init: function(element, api, key, optParams)
		{
			var me = this;
			if (google && google.maps)
			{
				// by default add road map and no controls
				var myOptions = {};
				if (optParams)
				{
					myOptions = optParams;
				}
				else
				{
					myOptions = {
						disableDefaultUI: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						mapTypeControl: false,
						mapTypeControlOptions: null,
						navigationControl: false,
						navigationControlOptions: null,
						scrollwheel: true
					};
				}

				// find controls
				if (!this.addControlsArgs && loadoptions.addControlsArgs)
				{
					this.addControlsArgs = loadoptions.addControlsArgs;
				}
				if (this.addControlsArgs)
				{
					if (this.addControlsArgs.zoom)
					{
						myOptions.navigationControl = true;
						if (this.addControlsArgs.zoom == 'small')
						{
							myOptions.navigationControlOptions = {
								style: google.maps.NavigationControlStyle.SMALL
							};
						}
						if (this.addControlsArgs.zoom == 'large')
						{
							myOptions.navigationControlOptions = {
								style: google.maps.NavigationControlStyle.ZOOM_PAN
							};
						}
					}
					if (this.addControlsArgs.map_type)
					{
						myOptions.mapTypeControl = true;
						myOptions.mapTypeControlOptions = {
							style: google.maps.MapTypeControlStyle.DEFAULT
						};
					}
				}

				var map = new google.maps.Map(element, myOptions);

				var fireOnNextIdle = [];

				/**
				 * This event is fired after a zoom or pan operation ands, so
				 * it's necessary to handle those events.
				 */
				google.maps.event.addListener(map, 'idle', function()
				{
					var fireListCount = fireOnNextIdle.length;
					if (fireListCount > 0)
					{
						var fireList = fireOnNextIdle.splice(0, fireListCount);
						var handler;
						while ((handler = fireList.shift()))
						{
							handler();
						}
					}
				});
				google.maps.event.addListener(map, 'rightclick', function(location)
				{

					me.rightclick.fire({
						'location': new mxn.LatLonPoint(location.latLng.lat(), location.latLng.lng()),
						'pixel': location.pixel,
						'point': location.point
					});
				});
				// deal with click
				google.maps.event.addListener(map, 'click', function(location)
				{
					me.click.fire({
						'location': new mxn.LatLonPoint(location.latLng.lat(), location.latLng.lng())
					});
				});

				// deal with zoom change
				google.maps.event.addListener(map, 'zoom_changed', function()
				{
					// zoom_changed fires before the
					// zooming has finished so we
					// wait for the next idle event
					// before firing our changezoom
					// so that method calls report the
					// correct values
					fireOnNextIdle.push(function()
					{
						me.changeZoom.fire();
					});
				});

				// deal with map movement
				google.maps.event.addListener(map, 'center_changed', function()
				{
					me.moveendHandler(me);
					me.endPan.fire();
				});

				// deal with initial tile loading
				var loadListener = google.maps.event.addListener(map, 'tilesloaded', function()
				{
					me.load.fire();
					google.maps.event.removeListener(loadListener);
				});

				map.LabelMarkerOverlay = function LabelMarkerOverlay(labelText, latLong, _map, marker, icon, iconAnchor, iconSize)
				{
					this.labelText = ((labelText != null) ? labelText : "");
					this.labelLatLong = latLong;
					this.labelDiv = null;
					this.icon = icon;
					this.iconAnchor = iconAnchor;
					this.iconSize = iconSize;

					this.marker = marker;
					this.setMap(_map);

					var me = this;
					google.maps.event.addListener(this.marker, "zindex_changed", function()
					{
						me.setZIndex();
					});
				};

				map.LabelMarkerOverlay.prototype = new google.maps.OverlayView();

				map.LabelMarkerOverlay.prototype.onAdd = function()
				{
					var div = document.createElement('div');
					div.style.position = "absolute";

					var ax = (this.iconAnchor && this.iconAnchor[0]) ? this.iconAnchor[0] : 0; // anchor
					// x
					var ay = (this.iconAnchor && this.iconAnchor[1]) ? this.iconAnchor[1] : 0; // anchor
					// y
					var img = document.createElement("img");
					img.style.position = "absolute";
					img.style.left = "-22px";// ax + 'px';
					img.style.top = "-10px";// ay + 'px';
					if (dojo.isIE)
					{
						img.style.left = "-19px";// ax + 'px';
						img.style.top = "-9px";// ay + 'px';
					}
					img.style.width = this.iconSize[0] + "px";
					img.style.zIndex = "0";
					img.src = this.icon;
					div.appendChild(img);

					var textDiv = document.createElement('div');
					textDiv.style.position = "absolute";
					textDiv.style.left = '-20px';
					if (dojo.isIE)
					{
						textDiv.style.left = "-19px";// ax + 'px';
					}
					
					textDiv.style.top = '0px';
					textDiv.style.width = this.iconSize[0] + 'px';
					textDiv.style.zIndex = "1";
					textDiv.style.color = "white";
					textDiv.style.fontSize = "12px";
					textDiv.style.textAlign = "center";
					textDiv.style.className = "fwmMarkerLabelGoogle";
					div.appendChild(textDiv);
					var txt = document.createTextNode(this.labelText);
					textDiv.appendChild(txt);

					this.labelDiv = div;

					this.getPanes().overlayImage.appendChild(div);
				};

				map.LabelMarkerOverlay.prototype.draw = function()
				{

					var sw = this.getProjection().fromLatLngToDivPixel(this.labelLatLong);

					var div = this.labelDiv;
					// FIXME Ideally we shouldn't have hard-coded offsets...
					div.style.left = (sw.x - 3) + 'px';
					div.style.top = (sw.y - 27) + 'px';
					div.style.width = this.iconSize[0] + "px";

					this.setZIndex();
				};

				map.LabelMarkerOverlay.prototype.setZIndex = function()
				{

					if (typeof this.marker.getZIndex() === "undefined")
					{
						this.labelDiv.style.zIndex = parseInt(this.labelDiv.style.top, 10) + 1;
					}
					else
					{
						this.labelDiv.style.zIndex = this.marker.getZIndex() + 1;
					}

				};

				map.LabelMarkerOverlay.prototype.onRemove = function()
				{

					if (this.labelDiv && this.labelDiv.parentNode)
					{
						this.labelDiv.parentNode.removeChild(this.labelDiv);
						this.labelDiv = null;
					}
				};

				this.maps[api] = map;
				this.loaded[api] = true;

			}
			else
			{
				alert(api + ' map script not imported');
			}

		},

		applyOptions: function()
		{
			var map = this.maps[this.api];
			var myOptions = [];
			if (this.options.enableDragging)
			{

				myOptions.draggable = true;
			}
			if (this.options.enableScrollWheelZoom)
			{
				myOptions.scrollwheel = true;
			}
			map.setOptions(myOptions);
		},

		resizeTo: function(width, height)
		{
			this.currentElement.style.width = width;
			this.currentElement.style.height = height;
			var map = this.maps[this.api];
			google.maps.event.trigger(map, 'resize');
		},

		addControls: function(args)
		{
			var map = this.maps[this.api];
			// remove old controls

			// Google has a combined zoom and pan control.
			if (args.zoom || args.pan)
			{
				if (args.zoom == 'large')
				{
					this.addLargeControls();
				}
				else
				{
					this.addSmallControls();
				}
			}
			if (args.scale)
			{
				var myOptions = {
					scaleControl: true,
					scaleControlOptions: {
						style: google.maps.ScaleControlStyle.DEFAULT
					}
				};
				map.setOptions(myOptions);
				this.addControlsArgs.scale = true;
			}
			if (args.map_type)
			{
				this.addMapTypeControls();
			}
		},

		addSmallControls: function()
		{
			var map = this.maps[this.api];
			var myOptions = {
				navigationControl: true,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				}
			};
			map.setOptions(myOptions);

			this.addControlsArgs.pan = false;
			this.addControlsArgs.scale = false;
			this.addControlsArgs.zoom = 'small';
		},
		/*
		 * Always in WGS84
		 */
		getAllPointsFromWGS84: function(points, callback)
		{
			callback(points);
		},
		getAllPointsInWGS84: function(points, callback)
		{
			callback(points);
		},
		addLargeControls: function()
		{
			var map = this.maps[this.api];
			var myOptions = {
				navigationControl: true,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.DEFAULT
				}
			};
			map.setOptions(myOptions);
			this.addControlsArgs.pan = true;
			this.addControlsArgs.zoom = 'large';
		},

		addMapTypeControls: function()
		{
			var map = this.maps[this.api];
			var myOptions = {
				mapTypeControl: true,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DEFAULT
				}
			};
			map.setOptions(myOptions);
			this.addControlsArgs.map_type = true;
		},

		setCenterAndZoom: function(point, zoom)
		{
			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			map.setCenter(pt);
			map.setZoom(zoom);
		},

		addMarker: function(marker, old)
		{

			return marker.toProprietary(this.api);
		},

		removeMarker: function(marker)
		{
			marker.closeBubble();
			marker.remove();
		},

		declutterMarkers: function(opts)
		{
			var map = this.maps[this.api];
			// TODO: Add provider code
		},

		addPolyline: function(polyline, old)
		{
			var map = this.maps[this.api];
			var propPolyline = polyline.toProprietary(this.api);
			propPolyline.setMap(map);
			return propPolyline;
		},

		removePolyline: function(polyline)
		{
			var map = this.maps[this.api];
			polyline.proprietary_polyline.setMap(null);
		},

		getCenter: function()
		{
			var map = this.maps[this.api];
			var pt = map.getCenter();
			return new mxn.LatLonPoint(pt.lat(), pt.lng());
		},

		setCenter: function(point, options)
		{
			var map = this.maps[this.api];

			var pt = point.toProprietary(this.api);
			if (options && options.pan)
			{
				map.panTo(pt);
			}
			else
			{
				map.setCenter(pt);
				if (!map.getZoom())
				{
					map.setZoom(10);
				}
			}
		},

		setZoom: function(zoom)
		{
			var map = this.maps[this.api];
			map.setZoom(zoom);
		},

		getZoom: function()
		{
			var map = this.maps[this.api];
			return map.getZoom();
		},

		getZoomLevelForBoundingBox: function(bbox)
		{
			var map = this.maps[this.api];
			var sw = bbox.getSouthWest().toProprietary(this.api);
			var ne = bbox.getNorthEast().toProprietary(this.api);
			var gLatLngBounds = new google.maps.LatLngBounds(sw, ne);
			map.fitBounds(gLatLngBounds);
			return map.getZoom();
		},

		setMapType: function(type)
		{
			var map = this.maps[this.api];
			switch (type)
			{
				case mxn.Mapstraction.ROAD:
					map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
					break;
				case mxn.Mapstraction.SATELLITE:
					map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
					break;
				case mxn.Mapstraction.HYBRID:
					map.setMapTypeId(google.maps.MapTypeId.HYBRID);
					break;
				case mxn.Mapstraction.PHYSICAL:
					map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
					break;
				default:
					map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			}
		},

		getMapType: function()
		{
			var map = this.maps[this.api];
			var type = map.getMapTypeId();
			switch (type)
			{
				case google.maps.MapTypeId.ROADMAP:
					return mxn.Mapstraction.ROAD;
				case google.maps.MapTypeId.SATELLITE:
					return mxn.Mapstraction.SATELLITE;
				case google.maps.MapTypeId.HYBRID:
					return mxn.Mapstraction.HYBRID;
				case google.maps.MapTypeId.TERRAIN:
					return mxn.Mapstraction.PHYSICAL;
				default:
					return null;
			}
		},

		getBounds: function()
		{
			var map = this.maps[this.api];
			if(map.getZoom()<=2){//zoom out at max, need to query the entire world				
				return new mxn.BoundingBox(-90.01, -179.999, 90.01, 180.01);
			}
			var gLatLngBounds = map.getBounds();
			if (!gLatLngBounds)
			{
				throw 'Bounds not available, map must be initialized';
			}
			var sw = gLatLngBounds.getSouthWest();
			var ne = gLatLngBounds.getNorthEast();
			//issue 
			
			return new mxn.BoundingBox(sw.lat(), sw.lng(), ne.lat(), ne.lng());
		},

		setBounds: function(bounds)
		{
			var map = this.maps[this.api];
			var sw = bounds.getSouthWest().toProprietary(this.api);
			var ne = bounds.getNorthEast().toProprietary(this.api);
			var gLatLngBounds = new google.maps.LatLngBounds(sw, ne);
			map.fitBounds(gLatLngBounds);
//			if(this.rectangle){
//				this.rectangle.setMap(null);
//			}
//			this.rectangle = new google.maps.Rectangle({
//				strokeColor: "#FF0000",
//		        strokeOpacity: 0.8,
//		        strokeWeight: 2,
//		        fillColor: "#FF0000",
//		        fillOpacity: 0.35,
//		        map: map,
//				bounds: gLatLngBounds
//			});
			
		},

		addImageOverlay: function(id, src, opacity, west, south, east, north, oContext)
		{
			var map = this.maps[this.api];

			var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(south, west), new google.maps.LatLng(north, east));

			var groundOverlay = new google.maps.GroundOverlay(src, imageBounds);
			groundOverlay.setMap(map);
		},

		setImagePosition: function(id, oContext)
		{
			// do nothing
		},

		addOverlay: function(url, autoCenterAndZoom)
		{
			var map = this.maps[this.api];

			var opt = {
				preserveViewport: (!autoCenterAndZoom)
			};
			var layer = new google.maps.KmlLayer(url, opt);
			layer.setMap(map);
		},

		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type)
		{
			var map = this.maps[this.api];
			var tilelayers = [];
			var z_index = this.tileLayers.length || 0;
			tilelayers[0] = {
				getTileUrl: function(coord, zoom)
				{
					url = tile_url;
					url = url.replace(/\{Z\}/g, zoom);
					url = url.replace(/\{X\}/g, coord.x);
					url = url.replace(/\{Y\}/g, coord.y);
					return url;
				},
				tileSize: new google.maps.Size(256, 256),
				isPng: true,
				minZoom: min_zoom,
				maxZoom: max_zoom,
				opacity: opacity,
				name: copyright_text
			};
			var tileLayerOverlay = new google.maps.ImageMapType(tilelayers[0]);
			if (map_type)
			{
				map.mapTypes.set('tile' + z_index, tileLayerOverlay);
				var mapTypeIds = [ google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN ];
				for ( var f = 0; f < this.tileLayers.length; f++)
				{
					mapTypeIds.push('tile' + f);
				}
				var optionsUpdate = {
					mapTypeControlOptions: {
						mapTypeIds: mapTypeIds
					}
				};
				map.setOptions(optionsUpdate);
			}
			else
			{
				map.overlayMapTypes.insertAt(z_index, tileLayerOverlay);
			}
			this.tileLayers.push([ tile_url, tileLayerOverlay, true, z_index ]);
			return tileLayerOverlay;
		},

		toggleTileLayer: function(tile_url)
		{
			var map = this.maps[this.api];
			for ( var f = 0; f < this.tileLayers.length; f++)
			{
				var tileLayer = this.tileLayers[f];
				if (tileLayer[0] == tile_url)
				{
					if (tileLayer[2])
					{
						map.overlayMapTypes.removeAt(tileLayer[3]);
						tileLayer[2] = false;
					}
					else
					{
						map.overlayMapTypes.insertAt(tileLayer[3], tileLayer[1]);
						tileLayer[2] = true;
					}
				}
			}
		},

		trafficLayer: null,

		toggleTraffic: function(state)
		{
			var map = this.maps[this.api];
			if (state == true)
			{
				if (this.trafficLayer == null)
				{
					this.trafficLayer = new google.maps.TrafficLayer();
					this.trafficLayer.setMap(map);
				}
			}
			else
			{
				if (this.trafficLayer != null)
				{
					this.trafficLayer.setMap(null);
					this.trafficLayer = null;
				}
			}
		},

		getPixelRatio: function()
		{
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		mousePosition: function(element)
		{
			var map = this.maps[this.api];
			var locDisp = document.getElementById(element);
			if (locDisp !== null)
			{
				google.maps.event.addListener(map, 'mousemove', function(point)
				{
					var loc = point.latLng.lat().toFixed(4) + ' / ' + point.latLng.lng().toFixed(4);
					locDisp.innerHTML = loc;
				});
				locDisp.innerHTML = '0.0000 / 0.0000';
			}
		}
	},

	LatLonPoint: {

		toProprietary: function()
		{
			return new google.maps.LatLng(this.lat, this.lon);
		},

		fromProprietary: function(googlePoint)
		{
			this.lat = googlePoint.lat();
			this.lon = googlePoint.lng();
			this.lng = googlePoint.lng();
		}

	},

	Marker: {

		toProprietary: function()
		{

			var options = {};

			// do we have an Anchor?
			var ax = 0; // anchor x
			var ay = 0; // anchor y

			if (this.iconAnchor)
			{
				ax = this.iconAnchor[0];
				ay = this.iconAnchor[1];
			}
			if (!this.iconSize)
			{
				this.iconSize = [ 32, 32 ];
			}
			var gAnchorPoint = new google.maps.Point(ax, ay);
			if (this.iconUrl)
			{
				if (this.labelText != null && this.labelText.length > 0)
				{
					// If there's a label, overwrite the default icon with a
					// transparent one, because the real one will be in the
					// overlay
					options.icon = new google.maps.MarkerImage("../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/transparent.png", new google.maps.Size(this.iconSize[0], this.iconSize[1]),
							new google.maps.Point(0, 0), gAnchorPoint);
				}
				else
				{
					options.icon = new google.maps.MarkerImage(this.iconUrl, new google.maps.Size(this.iconSize[0], this.iconSize[1]), new google.maps.Point(0, 0), gAnchorPoint);
				}

				// do we have a Shadow?
				if (this.iconShadowUrl)
				{
					if (this.iconShadowSize)
					{
						var x = this.iconShadowSize[0];
						var y = this.iconShadowSize[1];
						options.shadow = new google.maps.MarkerImage(this.iconShadowUrl, new google.maps.Size(x, y), new google.maps.Point(0, 0), gAnchorPoint);
					}
					else
					{
						options.shadow = new google.maps.MarkerImage(this.iconShadowUrl);
					}
				}
			}

			if (this.draggable)
			{
				options.draggable = this.draggable;
			}

			// else
			// {
			// if (this.labelText != null && this.labelText.length > 0)
			// {
			// options.title = this.labelText;
			// }
			// }
			if (this.imageMap)
			{
				options.shape = {
					coord: this.imageMap,
					type: 'poly'
				};
			}
			var latLong = this.location.toProprietary(this.api);
			options.position = latLong;
			options.map = this.map;
			options.zIndex = Math.round((90 - latLong.lat()) * 1000);

			var marker = new google.maps.Marker(options);

			if (this.labelText != null && this.labelText.length > 0)
			{
				var overlay = new this.map.LabelMarkerOverlay(this.labelText, latLong, this.map, marker, this.iconUrl, this.iconAnchor, this.iconSize);
				this._labelOverlay = overlay;
			}

			if (this.infoBubble)
			{
				var event_action = "click";
				if (this.hover)
				{
					event_action = "mouseover";
				}
				google.maps.event.addListener(marker, event_action, function()
				{
					marker.mapstraction_marker.closeBubble();
					marker.mapstraction_marker.openBubble();
				});
			}
			if (this.tooltip && this.tooltip.length > 0)
			{

				google.maps.event.addListener(marker, "mouseover", function(a)
				{
					var map = marker.map;
					var scale = Math.pow(2, map.getZoom());
					var nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng());
					var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
					var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
					var pixelOffset = new google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale));

					marker.mapstraction_marker.showTooltip(pixelOffset, map.getDiv());

				});
				google.maps.event.addListener(marker, "mouseout", function()
				{
					marker.mapstraction_marker.hideTooltip();
				});
			}
			if (this.hoverIconUrl)
			{
				var gSize = new google.maps.Size(this.iconSize[0], this.iconSize[1]);
				var zerozero = new google.maps.Point(0, 0);
				var hIcon = new google.maps.MarkerImage(this.hoverIconUrl, gSize, zerozero, gAnchorPoint);
				var Icon = new google.maps.MarkerImage(this.iconUrl, gSize, zerozero, gAnchorPoint);
				google.maps.event.addListener(marker, "mouseover", function()
				{
					marker.setIcon(hIcon);
				});
				google.maps.event.addListener(marker, "mouseout", function()
				{
					marker.setIcon(Icon);
				});
			}
			if (this.draggable)
			{
				var mapstractionMarker = this;
				google.maps.event.addListener(marker, 'dragstart', function(arg)
				{
					marker.mapstraction_marker.hideTooltip();
					dojo.publish("startedUserInteractionOnMap_" + this._maximoMapId, [ {
						objectSource: mapstractionMarker,
						objectSourceName: 'googlev3',
						eventName: 'dragstart'
					} ]);
					marker.mapstraction_marker.dragstart.fire({
						marker: mapstractionMarker,
						newLocation: {
							lng: arg.latLng.lng(),
							lat: arg.latLng.lat()
						}
					});

				});
				google.maps.event.addListener(marker, 'drag', function(arg)
				{
					marker.mapstraction_marker.drag.fire({
						marker: mapstractionMarker,
						newLocation: {
							lng: arg.latLng.lng(),
							lat: arg.latLng.lat()
						}
					});
				});
				google.maps.event.addListener(marker, 'dragend', function(arg)
				{
					marker.mapstraction_marker.dragend.fire({
						marker: mapstractionMarker,
						newLocation: {
							lng: arg.latLng.lng(),
							lat: arg.latLng.lat()
						}
					});
					dojo.publish("endedUserInteractionOnMap_" + this._maximoMapId, [ {
						objectSource: marker,
						objectSourceName: 'googlev3',
						eventName: 'dragend'
					} ]);
				});
			}
			google.maps.event.addListener(marker, 'click', function()
			{
				marker.mapstraction_marker.click.fire();
			});
			var infowindow = new google.maps.InfoWindow({
				content: this.infoBubble
			});
			this.proprietary_infowindow = infowindow;
			return marker;
		},

		openBubble: function()
		{
			dojo.publish("startedUserInteractionOnMap", [ {
				objectSource: this,
				objectSourceName: 'googlev3',
				eventName: 'openBubble'
			} ]);
			this.hideTooltip();
			var infowindow = this.proprietary_infowindow;
			infowindow.setContent(this.infoBubble);
			google.maps.event.addListener(infowindow, 'closeclick', function(closedWindow)
			{
				dojo.publish("endedUserInteractionOnMap", [ {
					objectSource: this,
					objectSourceName: 'googlev3',
					eventName: 'closeBubble'
				} ]);
			});
			this.openInfoBubble.fire({
				'marker': this
			});
			// Save
			// so we
			// can
			// close
			// it later
			infowindow.open(this.map, this.proprietary_marker);
		},

		closeBubble: function()
		{
			if (this.hasOwnProperty('proprietary_infowindow'))
			{
				this.proprietary_infowindow.close();
				this.closeInfoBubble.fire({
					'marker': this
				});
			}
		},

		hide: function()
		{
			this.hideTooltip();

			this.proprietary_marker.setOptions({
				visible: false
			});
		},

		remove: function()
		{
			this.hideTooltip();
			this.proprietary_marker.setMap(null);
			try
			{
				if (this._labelOverlay != null)
				{
					this._labelOverlay.setMap(null);
					this._labelOverlay = null;
				}
			}
			catch (e)
			{
				console.warn("[mxn.googlev3.core.Marker.remove()]", e);
			}
		},

		show: function()
		{
			this.proprietary_marker.setOptions({
				visible: true
			});
			if (this._labelOverlay != null)
			{
				this._labelOverlay.onAdd();
			}
		},

		update: function()
		{
			var point = new mxn.LatLonPoint();
			point.fromProprietary('googlev3', this.proprietary_marker.getPosition());
			this.location = point;
		}

	},

	Polyline: {

		toProprietary: function()
		{
			var points = [];
			for ( var i = 0; i < this.points.length; i++)
			{
				points.push(this.points[i].toProprietary('googlev3'));
			}
			var polyline = null;
			/* if it is closed, created a polygon */
			if (this.closed && this.closed == true)
			{
				var polygonOptions = {
					paths: [ points ],
					fillColor: this.fillColor || '#000000',
					fillOpacy: this.opacity || 1.0,
					strokeColor: this.color || '#000000',
					strokeOpacity: 1.0,
					strokeWeight: this.width || 3,
					clickable: false,
					editable: false
				};
				polyline = new google.maps.Polygon(polygonOptions);
			}
			else
			{
				var polyOptions = {
					path: points,
					strokeColor: this.color || '#000000',
					strokeOpacity: this.opacity || 1.0,
					strokeWeight: this.width || 3,
					clickable: false
				};

				polyline = new google.maps.Polyline(polyOptions);
			}

			return polyline;
		},

		show: function()
		{
			throw 'Not implemented';
		},

		hide: function()
		{
			throw 'Not implemented';
		}

	}

});

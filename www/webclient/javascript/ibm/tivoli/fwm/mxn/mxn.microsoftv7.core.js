/*
 *
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 */
mxn.register('microsoftv7', {

	/**
	 * Mapstraction implementation for Bing maps.
	 */
	Mapstraction: {

		/**
		 * Initializes the map and all the initial setup for it. Also the
		 * handlers are added to the map in this map. Special attention in Bing
		 * maps for this method because it doesn't support changes of map
		 * components on demand and we create the map instance in this method.
		 * Therefore many of unchangeable stuff is set up here in this method.
		 */
		init: function(element, api, key, optParams)
		{

			var me = this;
			dojo.require("ibm.tivoli.fwm.mxmap.InfoWindow");
			if (!Microsoft || !Microsoft.Maps)
			{
				throw api + ' map script not imported';
			}

			var options = optParams;
			if (!optParams)
			{
				options = {};
			}

			options.credentials = key;

			if (optParams.isIE && (!options.width || !options.height))
			{
				var width = 600;
				var height = 800;
				/**
				 * must not have px in the value
				 */
				if (element.style && element.style.width)
				{
					width = element.style.width;
					if (width.substr(width.length - 2) == 'px')
					{
						width = width.substr(0, width.length - 2);
					}
				}
				if (element.style && element.style.height)
				{
					height = element.style.height;
					if (height.substr(height.length - 2) == 'px')
					{
						height = height.substr(0, height.length - 2);
					}
				}
				options.width = width;// 'inherit';
				options.height = height;// 'inherit';
			}

			if (optParams.initialLocation && optParams.initialLocation.lat != null)
			{
				options.center = new Microsoft.Maps.Location(optParams.initialLocation.lat, optParams.initialLocation.lng);
			}
			if (optParams.initialLocation && optParams.initialLocation.level != null)
			{
				options.zoom = optParams.initialLocation.level;
			}
			// options.center=Location
			// zoom

			this.maps[api] = new Microsoft.Maps.Map(element, options);

			if (optParams.isIE)
			{
				/**
				 * ALL THIS CODE IS FOR INTERNET EXPLORER WINDOW RESIZE LOGIC IE
				 * doesn't update the map div width/height correctly in bingmaps
				 * so it doesn't fit in the available space. This logic listens
				 * to window.resize event to update the map width/height based
				 * on it's parent node and the view port available.
				 * 
				 * **IT DEPENDS ON DIJIT **
				 */

				var addEvent = function(elem, type, eventHandle)
				{
					if (elem == null || elem == undefined)
						return;
					if (elem.addEventListener)
					{
						elem.addEventListener(type, eventHandle, false);
					}
					else if (elem.attachEvent)
					{
						elem.attachEvent("on" + type, eventHandle);
					}
				};

				var mapDivElement = element.childNodes[0];

				var ieBingMapsResize = function()
				{
					try
					{
						// Issue 12-12453. The _resize() method in Map.js takes
						// care of the Map's parent div,
						// so I think that there is no need to calculate the
						// dimensions of this div.
						// var availableHorRegion =
						// parseInt(dijit.getViewport().h -
						// mapDivElement.parentNode.offsetTop - 20);
						// mapDivElement.style.height = (availableHorRegion) +
						// "px";
						mapDivElement.style.height = "100%";
						// var availableVerRegion =
						// parseInt(dijit.getViewport().w -
						// mapDivElement.offsetLeft - 20);
						// mapDivElement.style.width = (availableVerRegion) +
						// "px";
						mapDivElement.style.width = "100%";
					}
					catch (e)
					{
						console.error("Could not resize map element.", e.message);
					}
				};
				addEvent(window, "resize", ieBingMapsResize);

			}
			// dojo.create("div", {
			// id: "infoCustom",
			// style: {
			// top: 0,
			// left: 0,
			// width: '100px',
			// height: '150px',
			// zIndex: 1000000,
			// position: "absolute",
			// backgroundColor: "white",
			// display: "none"
			// }
			// }, dojo.body());

			var clickHandler = function(e)
			{
				var map = me.maps[me.api];
				switch (e.targetType)
				{
					case 'map':
						var msLatLng = new Microsoft.Maps.Location(e.getX(), e.getY());
						var latLng = new mxn.LatLonPoint(msLatLng.latitude, msLatLng.longitude);
						me.click.fire({
							'location': latLng
						});
						break;
					case 'pushpin':
					{
						break;
					}
					default:
						break;
				}

			};
			Microsoft.Maps.Events.addHandler(this.maps[api], 'click', clickHandler);
			var rclickHandler = function(event)
			{
				if (event.targetType && event.targetType == 'map')
				{

					var point = new Microsoft.Maps.Point(event.getX(), event.getY());
					var msLatLng = me.maps[api].tryPixelToLocation(point);
					var latLng = new mxn.LatLonPoint(msLatLng.latitude, msLatLng.longitude);
					var pixel = {
						x: event.pageX - event.target.getPageX(),
						y: event.pageY - event.target.getPageY()
					};
					me.rightclick.fire({
						'location': latLng,
						'pixel': pixel
					});

				}

				mxn.util.stopEventPropagation(event);
				return true;
			};
			// deal with mouse right click
			Microsoft.Maps.Events.addHandler(this.maps[api], 'rightclick', rclickHandler);
			// deal with zoom change
			Microsoft.Maps.Events.addHandler(this.maps[api], 'viewchange', function()
			{
				me.moveendHandler(me);
				me.changeZoom.fire();
			});

			// deal with map movement
			Microsoft.Maps.Events.addHandler(this.maps[api], 'viewchangeend', function()
			{
				me.moveendHandler(me);
				me.endPan.fire();
			});

			// removes the bird's eye pop-up
			this.loaded[api] = true;
			me.load.fire();
		},
		/**
		 * disposes map
		 */
		destroyMap: function()
		{
			var map = this.maps[this.api];
			console.log("[Bingv7] Going to dispose");
			map.dispose();
			console.log("[Bingv7] Disposed");
			this.loaded[this.api] = false;
			map = null;

		},
		/**
		 * Enable/disable map options. ** Bing provider only accept options set
		 * in map contructor ***
		 */
		applyOptions: function()
		{
			// not implemented
		},

		/**
		 * Resizes the map.
		 */
		resizeTo: function(nWidth, nHeight)
		{
			if (dojo.isIE)
			{
				if (this.currentElement.childNodes[0])
				{
					this.currentElement.childNodes[0].style.width = nWidth;
					this.currentElement.childNodes[0].style.height = nHeight;
				}
				var map = this.maps[this.api];

				map.setOptions({
					width: "0px"
				});
			}
		},

		/**
		 * Add controls dinamically changes the options of the map and can be
		 * called multiple times. ** Bing provider only accept options set in
		 * map contructor ***
		 */
		addControls: function(args)
		{
			// not implemented
		},

		/**
		 * Reset to small controls. ** Bing provider only accept options set in
		 * map contructor ***
		 */
		addSmallControls: function()
		{
			// not implemented
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
		/**
		 * reset to large controls ** Bing provider only accept options set in
		 * map contructor ***
		 */
		addLargeControls: function()
		{
			// not implemented
		},

		/**
		 * Enable map type control (ROAD, MAP, etc) ** Bing provider only accept
		 * options set in map contructor ***
		 */
		addMapTypeControls: function()
		{
			// not implemented
		},

		/**
		 * Set map center point and zoom level.
		 */
		setCenterAndZoom: function(nPoint, nZoom)
		{
			var map = this.maps[this.api];
			var options = {
				zoom: nZoom,
				center: nPoint.toProprietary(this.api)
			};
			map.setView(options);
		},

		/**
		 * Add a marker (Microsoft.Maps.Pushpin) to the map. Also the event
		 * handlers are added using the specific code of Bing provider.
		 */
		addMarker: function(marker, old)
		{
			var map = this.maps[this.api];
			marker.pinID = "ms7pin-" + new Date().getTime() + '-' + (Math.floor(Math.random() * Math.pow(2, 16)));// TODO
			// why
			// is
			// it
			// needed?
			var pin = marker.toProprietary(this.api);
			map.entities.push(pin);
			return pin;
		},

		/**
		 * Remove the marker (Microsoft.Maps.Pushpin) from the map.
		 * 
		 * Not sure why but map.entities.remove doesn't work correctly. So we
		 * need to iterate over all entities in order to remove them correctly.
		 */
		removeMarker: function(marker)
		{
			var map = this.maps[this.api];
			marker.closeBubble();
			var msPushPin = marker.proprietary_marker;

			var ppIndex = map.entities.indexOf(msPushPin);
			var found = false;
			for ( var i = 0; i < map.entities.getLength(); i++)
			{

				var pushpin = map.entities.get(i);

				if (pushpin instanceof Microsoft.Maps.Pushpin)
				{
					if (msPushPin == pushpin)
					{
						var ii = map.entities.indexOf(pushpin);
						map.entities.removeAt(i);
						found = true;
						break;
					}

				}
			}
			try
			{
				map.entities.remove(msPushPin);

			}
			catch (e)
			{
				console.warn("failed to remove pushpin", e);
			}
			return;

		},

		/**
		 * Not supported.
		 */
		declutterMarkers: function(opts)
		{
			throw 'Not supported';
		},

		/**
		 * Add polyline (Microsoft.Map.Polyline) to the map.
		 */
		addPolyline: function(polyline, old)
		{

			var map = this.maps[this.api];
			var pl = polyline.toProprietary(this.api);

			map.entities.push(pl);
			return pl;
		},

		/**
		 * Remove polyline (Microsoft.Map.Polyline) from the map.
		 */
		removePolyline: function(polyline)
		{
			var map = this.maps[this.api];
			map.entities.remove(polyline.proprietary_polyline);
		},

		/**
		 * Returns center point of the map.
		 */
		getCenter: function()
		{
			var map = this.maps[this.api];
			var pt = map.getCenter();

			var point = new mxn.LatLonPoint(pt.latitude, pt.longitude);

			return point;
		},

		/**
		 * Set center point in the map.
		 */
		setCenter: function(point, options)
		{
			// var options ={zoom: nZoom, center:
			// nPoint.toProprietary(this.api)};
			var map = this.maps[this.api];
			this.setCenterAndZoom(point, map.getZoom());

			// var pt = point.toProprietary(this.api);
			// var options = map.getOptions();
			// options.center = pt;
			// map.setView(options);
		},

		/**
		 * Set zoom level in the map.
		 */
		setZoom: function(zoom)
		{
			var map = this.maps[this.api];
			var options = {};
			options.zoom = zoom;
			map.setView(options);
		},

		/**
		 * Returns zoom level of the map.
		 */
		getZoom: function()
		{
			var map = this.maps[this.api];
			return map.getZoom();
		},

		/**
		 * Returns the zoom level of specific rectangle.
		 */
		getZoomLevelForBoundingBox: function(bbox)
		{
			var map = this.maps[this.api];			
			var se = bbox.getSoutheast().toProprietary(this.api);
			var nw = bbox.getNorthwest().toProprietary(this.api);
			var latLongBounds = Microsoft.Maps.LocationRect.fromCorners(se, nw);
			map.setView({
				bounds: latLongBounds
			});
			return map.getZoom();
		},

		/**
		 * Set the map type according to Microsoft.Maps.MapTypeId enumeration.
		 */
		setMapType: function(type)
		{
			var map = this.maps[this.api];
			switch (type)
			{
				case mxn.Mapstraction.ROAD:
					map.setMapType(Microsoft.Maps.MapTypeId.road);
					break;
				case mxn.Mapstraction.SATELLITE:
					map.setMapType(Microsoft.Maps.MapTypeId.aerial);
					break;
				case mxn.Mapstraction.HYBRID:
					map.setMapType(Microsoft.Maps.MapTypeId.birdseye);
					break;
				default:
					map.setMapType(Microsoft.Maps.MapTypeId.road);
			}
		},

		/**
		 * Returns the map type according to Microsoft.Maps.MapTypeId
		 * enumeration.
		 */
		getMapType: function()
		{
			var map = this.maps[this.api];
			var mode = map.GetMapStyle();
			switch (mode)
			{
				case Microsoft.Maps.MapTypeId.aerial:
					return mxn.Mapstraction.SATELLITE;
				case Microsoft.Maps.MapTypeId.road:
					return mxn.Mapstraction.ROAD;
				case Microsoft.Maps.MapTypeId.birdseye:
					return mxn.Mapstraction.HYBRID;
				default:
					return null;
			}
		},

		/**
		 * Returns the rectancgle of current view.
		 */
		getBounds: function()
		{
			var map = this.maps[this.api];
			var view = map.getBounds();
			var bottomright = view.getSoutheast();
			var topleft = view.getNorthwest();
			
			return new mxn.BoundingBox(bottomright.latitude,topleft.longitude, topleft.latitude,  bottomright.longitude);
		},

		/**
		 * Set the rectangle of current view.
		 */
		setBounds: function(bounds)
		{
			var map = this.maps[this.api];
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			var nw = new Microsoft.Maps.Location(ne.lat, sw.lon);
			var se = new Microsoft.Maps.Location(sw.lat, ne.lon);
			var rec = Microsoft.Maps.LocationRect.fromCorners(nw, se);

			var vopt = map.getOptions();

			// Set the zoom level of the map
			vopt.bounds = rec;
			map.setView(vopt);

		},

		/**
		 * TODO update comment. check if it is possible to overlay image on map
		 */
		addImageOverlay: function(id, src, nOpacity, west, south, east, north, oContext)
		{
			var map = this.maps[this.api];
			// TODO Rafael, não conseguí entender como usar as cordenadas para
			// image overlay, as options do bing não possuem propriedades para
			// coordeanadas.
			// var imageBounds =
			// Microsoft.Maps.LocationRect.fromEdges(north,west,south,east)
			var tileSource = new Microsoft.Maps.TileSource({
				uriConstructor: src
			});
			var tileLayer = new Microsoft.Maps.TileLayer({
				mercator: tileSource,
				opacity: nOpacity,
				visible: true
			});
			map.entities.push(tileLayer);
		},

		/*
		 * TODO to be investigated
		 */
		setImagePosition: function(id, oContext)
		{
			var map = this.maps[this.api];
			var topLeftPoint;
			var bottomRightPoint;
			throw "not implemented";
		},

		/*
		 * TODO to be investigated
		 */
		addOverlay: function(url, autoCenterAndZoom)
		{
			var map = this.maps[this.api];
			// Create the tile layer source
			var tileSource = new Microsoft.Maps.TileSource({
				uriConstructor: url
			});

			// Construct the layer using the tile source
			var tilelayer = new Microsoft.Maps.TileLayer({
				mercator: tileSource
			});

			// Push the tile layer to the map
			map.entities.push(tilelayer);

		},

		/*
		 * TODO to be investigated
		 */
		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom)
		{
			var map = this.maps[this.api];
			// Create the tile layer source
			var tileSource = new Microsoft.Maps.TileSource({
				uriConstructor: tile_url
			});

			// Construct the layer using the tile source
			var tilelayer = new Microsoft.Maps.TileLayer({
				mercator: tileSource,
				opacity: opacity,
				visible: true
			});

			// Push the tile layer to the map
			map.entities.push(tilelayer);
		},

		/*
		 * TODO to be implemented.
		 */
		toggleTileLayer: function(tile_url)
		{
			throw 'Not implemented';
		},

		trafficLayer: null,

		toggleTraffic: function(state)
		{
			var map = this.maps[this.api];
			if (state == true)
			{
				if (this.trafficLayer != null)
				{
					this.trafficLayer.show();
				}
				else
				{

					var me = this;
					var enableTraffic = function()
					{
						me.trafficLayer = new Microsoft.Maps.Traffic.TrafficLayer(map);
						me.trafficLayer.show();
					};
					if (!Microsoft.Maps.Traffic)
					{
						Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', {
							callback: enableTraffic
						});
					}
					else
					{
						enableTraffic();
					}

				}
			}
			else
			{
				if (this.trafficLayer != null)
				{
					this.trafficLayer.hide();
				}
			}
		},

		/*
		 * TODO to be investigated.
		 */
		getPixelRatio: function()
		{
			throw 'Not implemented';
		},

		/**
		 * Returns the mouse position based on an element. The 'mousemove' event
		 * listener has been registered to get the current mouse point.
		 */
		mousePosition: function(element)
		{
			var locDisp = document.getElementById(element);
			if (locDisp !== null)
			{
				var map = this.maps[this.api];
				Microsoft.Maps.Events.addHandler(map, 'mousemove', function(eventArgs)
				{
					var point = new Microsoft.Maps.Point(eventArgs.pageX, eventArgs.pageY);
					var _location = map.tryPixelToLocation(point);
					var loc = _location.latitude.toFixed(4) + " / " + _location.longitude.toFixed(4);
					locDisp.innerHTML = loc;
				});
				locDisp.innerHTML = "0.0000 / 0.0000";
			}
		}
	},

	/**
	 * LatLonPoint object definition for Bing provider.
	 */
	LatLonPoint: {

		/**
		 * Returns a new proprietary instance of Microsoft.Maps.Location object.
		 */
		toProprietary: function()
		{
			return new Microsoft.Maps.Location(this.lat, this.lon);
		},

		/**
		 * Encapsulates the latitute/longitude coordinates into lat/lon
		 * mapstraction attributes.
		 */
		fromProprietary: function(mpoint)
		{

			this.lat = mpoint.latitude;
			this.lon = mpoint.longitude;
			this.lng = mpoint.longitude;
		}

	},

	/**
	 * Marker object definition for Bing provider.
	 */
	Marker: {

		/**
		 * Returns a new proprietary instance of Microsoft.Maps.Pushpin object.
		 */
		toProprietary: function()
		{
			var pin;
			var map = this.map;
			
			var pinOptions = {
				draggable: this.draggable,
				visible: true
			};
			if (this.labelText != null && this.labelText.length > 0)
			{
				pinOptions.text = this.labelText;
				pinOptions.textOffset = new Microsoft.Maps.Point(2, 6);
			}

			if (this.iconUrl)
			{
				pinOptions.icon = this.iconUrl;
			}
			if (this.iconSize)
			{
				pinOptions.height = this.iconSize[1];
				pinOptions.width = this.iconSize[0];
			}

			if (this.iconAnchor)
			{				
				pinOptions.anchor = new Microsoft.Maps.Point(this.iconAnchor[0] - 2, this.iconAnchor[1] - 2);
			}
			pin = new Microsoft.Maps.Pushpin(this.location.toProprietary(this.api), pinOptions);

			Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
			{
				pin.mapstraction_marker.dragging = false;
			});

			var rootElement = this.mapstraction.currentElement;
			if (this.infoBubble)
			{
				var infoWindow = new ibm.tivoli.fwm.mxmap.InfoWindow({
					map: map,
					mapId: this._maximoMapId,
					rootElement: rootElement
				});
				this.proprietary_infowindow = infoWindow;

				Microsoft.Maps.Events.addHandler(pin, "click", function(e)
				{
					// 12-10255
					if (pin.mapstraction_marker.dragging == true)
					{
						return;
					}
					dojo.publish("startedUserInteractionOnMap_" + this._maximoMapId, [ {
						objectSource: pin,
						objectSourceName: 'microsoftv7',
						eventName: 'openBubble'
					} ]);
					pin.mapstraction_marker.openBubble(e);
				});
			}
			if (this.draggable == true)
			{
				var m = this;
				Microsoft.Maps.Events.addHandler(pin, "dragstart", function()
				{
					dojo.publish("startedUserInteractionOnMap_" + this._maximoMapId, [ {
						objectSource: pin,
						objectSourceName: 'microsoftv7',
						eventName: 'dragstart'
					} ]);
					var latLng = new mxn.LatLonPoint(pin.getLocation().latitude, pin.getLocation().longitude);
					pin.mapstraction_marker.dragstart.fire(latLng);
					pin.mapstraction_marker.hideTooltip();

				});
				Microsoft.Maps.Events.addHandler(pin, "drag", function()
				{
					var latLng = new mxn.LatLonPoint(pin.getLocation().latitude, pin.getLocation().longitude);
					pin.mapstraction_marker.drag.fire(latLng);
					pin.mapstraction_marker.dragging = true;
				});
				Microsoft.Maps.Events.addHandler(pin, "dragend", function()
				{
					if (pin.mapstraction_marker.dragging != true)
					{
						return;
					}

					pin.mapstraction_marker.dragend.fire({
						marker: pin.mapstraction_marker,
						newLocation: {
							lng: pin.getLocation().longitude,
							lat: pin.getLocation().latitude
						}
					});
					dojo.publish("endedUserInteractionOnMap_" + this._maximoMapId, [ {
						objectSource: pin,
						objectSourceName: 'microsoftv7',
						eventName: 'dragend'
					} ]);
				});
			}
			if (this.tooltip && this.tooltip.length > 0)
			{

				Microsoft.Maps.Events.addHandler(pin, "mouseover", function()
				{
					var screenPoint = map.tryLocationToPixel(pin.getLocation(), Microsoft.Maps.PixelReference.control);

					pin.mapstraction_marker.showTooltip(screenPoint, map.getRootElement());

				});
				Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
				{
					pin.mapstraction_marker.hideTooltip();

				});

			}
			if (this.hoverIconUrl)
			{
				Microsoft.Maps.Events.addHandler(pin, "mouseover", function()
				{
					pinOptions.icon = hIcon;
					pin.setOptions(pinOptions);
				});
				Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
				{
					pinOptions.icon = hIcon;
					pin.setOptions(pinOptions);

				});

			}
			map.entities.push(pin);
			return pin;
		},

		/**
		 * Shows the marker's bubble (Microsoft.Maps.Infobox).
		 */
		openBubble: function()
		{
			this.hideTooltip();
			var infowindow = this.proprietary_infowindow;

			var loc = this.proprietary_marker.getLocation();

			var pinPixel = this.map.tryLocationToPixel(loc, Microsoft.Maps.PixelReference.control);

			this.proprietary_infowindow.setContent(this.infoBubble);
			this.proprietary_infowindow.show(pinPixel.x, pinPixel.y);
			var marker = this;
			var map = this.map;

			Microsoft.Maps.Events.addHandler(map, 'viewchange', function(e)
			{

				var pinPixel = marker.map.tryLocationToPixel(marker.proprietary_marker.getLocation(), Microsoft.Maps.PixelReference.control);
				infowindow.updatePosition(pinPixel.x, pinPixel.y);
			});

			this.openInfoBubble.fire({
				'marker': this
			});

		},

		/**
		 * Hide the marker's bubble (Microsoft.Maps.Infobox).
		 */
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

		/**
		 * Hide the marker (Microsoft.Maps.Pushpin).
		 */
		hide: function()
		{
			var pin = this.proprietary_marker;
			pin.setOptions({
				visible: false
			});
			this.hideTooltip();
		},

		/**
		 * Shows the marker (Microsoft.Maps.Pushpin).
		 */
		show: function()
		{
			var pin = this.proprietary_marker;
			pin.setOptions({
				visible: true
			});
		},

		// TODO to be implemented.
		update: function()
		{
			var point = new mxn.LatLonPoint();
			point.fromProprietary('microsoftv7', this.proprietary_marker.getLocation());
			this.location = point;
		}

	},

	/**
	 * Polyline definition for Bing provider.
	 */
	Polyline: {

		/**
		 * Returns a new proprietary instance of Microsoft.Maps.Polyline object.
		 */
		toProprietary: function()
		{
			var mpoints = [];

			for ( var i = 0; i < this.points.length; i++)
			{
				mpoints.push(this.points[i].toProprietary('microsoftv7'));
			}
			var mpolyline = null;
			var opacity = this.opacity ? Math.round(this.opacity * 255) : 255;
			var color = Microsoft.Maps.Color.fromHex(this.color);
			// 12-13693. Using the correct stroke width for route lines.
			var strokeWidth = this.width || 3;

			// 12-10633
			if (this.fillColor)
			{
				var fillColor = Microsoft.Maps.Color.fromHex(this.fillColor);
				var fillColorWithOpacity = new Microsoft.Maps.Color(opacity, fillColor.r, fillColor.g, fillColor.b);
			}

			/* if it is closed, created a polygon */
			if (this.closed && this.closed == true)
			{
				mpolyline = new Microsoft.Maps.Polygon(mpoints, {
					fillColor: fillColorWithOpacity || "#000000",
					strokeColor: color,
					visible: true
				});
			}
			else
			{
				// 12-13693. Using the correct stroke opacity for route lines.
				color.a = opacity;
				mpolyline = new Microsoft.Maps.Polyline(mpoints, {
					strokeColor: color,
					strokeThickness: strokeWidth,
					visible: true
				});
			}
			this.proprietary_polyline = mpolyline;
			return mpolyline;
		},

		/**
		 * Shows the polyline.
		 */
		show: function()
		{
			this.proprietary_polyline.setOptions({
				visible: true
			});
		},

		/**
		 * Hide the polyline.
		 */
		hide: function()
		{
			this.proprietary_polyline.setOptions({
				visible: false
			});
		}

	}

});

//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxn/mxn.maximospatial.core", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/impl/MaximoSpatialMxn,ibm/tivoli/fwm/mxmap/impl/MaximoSpatialMover,ibm/tivoli/fwm/mxmap/InfoWindow"], function(dijit,dojo,dojox){
/*
 *
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 */
mxn.register('maximospatial', {

	Mapstraction: {
		val: null,
		_mover: null,
		_connections: null,
		_infoWindowListener: null,
		init: function(element, api, key, optParams)
		{
			// we can assure that dojo is loaded in here, that's
			// why dojo.require is not outside this block
			dojo.require("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn");
			dojo.require("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover");
			dojo.require("ibm.tivoli.fwm.mxmap.InfoWindow");

			this._connections = [];

			var me = this;
			me.api = api;
			me.setMapLoadRequired(true);
			if (!esriDojoNew)
			{
				throw api + ' map script not imported';
			}

			// prefetch openstreetmap dojo layers
			esriDojoNew.require("esri.layers.osm");
			var mapInitialExtent = null;
			esriDojoNew.require("esri.map");
			esriDojoNew.require("esri.tasks.geometry");
			esriDojoNew.require("esri.tasks.route");
			esriDojoNew.require("esri.dijit.Scalebar");
			esriDojoNew.require("esri.tasks.locator");

			var mapOpts = {
				isZoomSlider: true,
				isPanArrows: false,
				nav: false,
				logo: false
			};
			var extentInitiallySet = false;
			if (optParams.lastUserLocationData && optParams.lastUserLocationData.customData && optParams.lastUserLocationData.customData.extentData)
			{
				var extent = optParams.lastUserLocationData.customData.extentData;
				var spatialReference = new esri.SpatialReference({
					wkid: extent.wkid,
					wkt: extent.wkt
				});
				mapInitialExtent = new esri.geometry.Extent(extent.xmin, extent.ymin, extent.xmax, extent.ymax, spatialReference);

				mapOpts.extent = mapInitialExtent;
				extentInitiallySet = true;
			}
			/** ESRI Maps always break with right to left languages.* */
			dojo.style(element, "direction", "ltr");

			// it seems there is a problem when the element is hidden in IE
			this.maps[api] = new esri.Map(element.id, mapOpts);
			me.mapDivId = element.id;
			// adjust pan rate and duration to provide a better
			// user experience
			// during drag and drop of the marker
			esriConfig.defaults.map.panDuration = 500; // time
			// in
			// milliseconds;
			// default
			// panDuration:250
			esriConfig.defaults.map.panRate = 15; // refresh
			// rate of
			// zoom
			// animation;
			// default
			// panRate:25

			var map = this.maps[api];
			map.extentInitiallySet = extentInitiallySet;
			var defLenUnit = 'metric';
			if (optParams.defaultLenUnit == "MILES")
			{
				defLenUnit = 'english';
			}
			var geoSvcData = optParams.spatial.geometryService;
			if (geoSvcData && geoSvcData.url)
			{
				try
				{
					me.esriGeometryService = new esri.tasks.GeometryService(geoSvcData.url);
				}
				catch (e)
				{
					console.warn("[MaximoSpatial] Error creating geometry service for data", geoSvcData);
				}
			}
			var spatialMapManager = new ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn({
				map: map,
				mapstraction: me,
				mapInitialExtent: mapInitialExtent,
				lenUnit: defLenUnit,
				esriGeometryService: me.esriGeometryService
			});
			spatialMapManager.loadMap(optParams.spatial);
			map.spatialMapManager = spatialMapManager;

			me.toWebMercatorCache = {};
			/* function to convert lat/lng to maximo spatial reference */
			me.projectPointsToWebMercator = function(points, callbackFct, errCallback)
			{
				return spatialMapManager.projectPointsToWebMercator(points, callbackFct, errCallback);
			};
			me.fromWebMercatorCache = {};
			/* function to convert x/y in maximo spatial reference to lat/lng */
			me.projectPointsFromWebMercator = function(points, callbackFct, errCallback)
			{
				return spatialMapManager.projectPointsFromWebMercator(points, callbackFct, errCallback);
			};
			dojo.connect(map, "onClick", function(evt)
			{
				me.click.fire({
					'location': new mxn.LatLonPoint(evt.mapPoint.y, evt.mapPoint.x),
					'pixel': evt.screenPoint,
					'point': evt.mapPoint
				});

			});

			dojo.connect(dojo.byId(element.id), "oncontextmenu", function(evt)
			{

				mxn.util.stopEventPropagation(evt);
				dojo.stopEvent(evt);
			});

			dojo.connect(dojo.byId(element.id), "contextmenu", function(evt)
			{
				mxn.util.stopEventPropagation(evt);
				dojo.stopEvent(evt);
				var fct = function(e)
				{
					var posx = 0;
					var posy = 0;
					if (!e)
						var e = window.event;
					if (e.pageX || e.pageY)
					{
						posx = e.pageX;
						posy = e.pageY;
					}
					else if (e.clientX || e.clientY)
					{
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}

					return {
						x: posx,
						y: posy
					};
				};

				var x = fct(evt).x;
				var y = fct(evt).y;
				y -= dojo.coords(dojo.byId(me.mapDivId)).y;
				x -= dojo.coords(dojo.byId(me.mapDivId)).x;

				var pt = new esri.geometry.Point(x, y);

				var latLng = map.toMap(pt);
				var point = new mxn.LatLonPoint(latLng.y, latLng.x);

				me.rightclick.fire({
					'location': point,
					'pixel': {
						x: x,
						y: y
					}
				});

				return true;
			});
		},
		applyOptions: function()
		{
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		resizeTo: function(width, height, ww, hh)
		{
			var map = this.maps[this.api];
			dojo.style(dojo.byId(this.mapDivId), "width", width);
			// Issue 12-13085
			// Issue 12-13543: Need to convert to string before attempting to use indexOf 
			var strWidth = width.toString();
			if (strWidth.indexOf("%") > -1)
			{
				strWidth = "100%";
			}
			dojo.style(map.root, "width", strWidth);
			dojo.style(dojo.byId(this.mapDivId), "height", hh);

			map.resize();
			map.reposition();
		},

		addControls: function(args)
		{
		},

		addSmallControls: function()
		{
		},

		addLargeControls: function()
		{
		},

		addMapTypeControls: function()
		{
		},

		setCenterAndZoom: function(point, zoom)
		{
			var map = this.maps[this.api];
			console.log(map.extent);
			var pt = point.toProprietary(this.api);

			if (map.spatialMapManager.isPointInFullExtent(pt) == false)
			{
				console.warn("[Maximo Spatial] Map extent does not contain center point to zoom", point);
				return;
			}

			if (zoom)
			{

				map.centerAndZoom(pt, zoom);
			}
			else
			{

				map.centerAt(pt);
			}

		},

		addMarker: function(marker, old)
		{

			var map = this.maps[this.api];

			var pin = marker.toProprietary(this.api);

			var gPin = map.graphics.add(pin);
			if (marker.proprietary_marker_label)
			{
				map.graphics.add(marker.proprietary_marker_label);
			}

			return pin;
		},
		getAllPointsInWGS84: function(pointArray, successCb, errCb)
		{

			if (window.mx.esri.sr.wkid == mxn.util.getWGS84WKID())
			{
				callback(pointArray);
			}
			else
			{
				var map = this.maps[this.api];
				var fct = function(points)
				{

					successCb(points);
				};
				this.projectPointsToWebMercator(pointArray, dojo.hitch(this, fct), errCb);
			}
		},
		getAllPointsFromWGS84: function(pointArray, successCb, errCb)
		{

			if (window.mx.esri.sr.wkid == mxn.util.getWGS84WKID())
			{
				successCb(pointArray);
			}
			else
			{
				var map = this.maps[this.api];
				var fct = function(points)
				{

					successCb(points);
				};
				this.projectPointsFromWebMercator(pointArray, dojo.hitch(this, fct), errCb);
			}
		},

		removeMarker: function(marker)
		{
			var map = this.maps[this.api];
			map.graphics.remove(marker.proprietary_marker);
			if (marker.proprietary_marker_label)
			{
				map.graphics.remove(marker.proprietary_marker_label);
			}
			marker.closeBubble();
		},

		declutterMarkers: function(opts)
		{
			var map = this.maps[this.api];
			console.error("unimplemented");
		},
		addPolyline: function(polyline, old)
		{
			var map = this.maps[this.api];
			var colorTemp = new dojo.Color(polyline.color);
			var color = new dojo.Color([ colorTemp.r, colorTemp.g, colorTemp.b, polyline.opacity ]);

			var centerPoint = polyline.getAttribute("centerPoint");
			var radiusInKMs = polyline.getAttribute("radiusInKMs");
			if (centerPoint && radiusInKMs)
			{
				var params = new esri.tasks.BufferParameters();
				var pt = centerPoint.toProprietary(this.api);
				params.geometries = [ pt ];
				params.distances = [ radiusInKMs ];
				params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
				params.bufferSpatialReference = map.spatialReference;
				params.outSpatialReference = map.spatialReference;

				var onComplete = function(geometries)
				{
					var _fillColor = new dojo.Color(polyline.fillColor || "#000000");
					_fillColor.a = (polyline.opacity || 1.0) / 2.0;
					var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, color, 3),
							_fillColor);
					var graphic = new esri.Graphic(geometries[0], symbol);
					/* removes the temporary graphic */
					if (polyline.esri_graphic)
					{
						map.graphics.remove(polyline.esri_graphic);
					}
					map.graphics.add(graphic);
					polyline.esri_graphic = graphic;
				};

				var onError = function(error)
				{
					console.warn("[MaximoSpatial] Error getting geometry to surround marker: ", error);
					// TODO: hold the error throw after the refactoring - avoid
					// show one error per request
					// map.getMaximo().showMessage("mapcontrol",
					// "geometryerror");
					if (polyline.esri_graphic)
					{
						map.graphics.remove(polyline.esri_graphic);
					}
					polyline.esri_graphic = null;

				};
				if (this.esriGeometryService)
				{
					this.esriGeometryService.buffer(params, onComplete, onError);
				}
				/*
				 * else { map.getMaximo().showMessage("mapcontrol",
				 * "geometryerror"); }
				 */
			}
			var polygonOrLine = polyline.toProprietary(this.api);
			var graphic = null;
			var symbol = null;
			if (polyline.closed && polyline.closed == true)
			{
				// add a temporary graphic to have some data to return
				var fill = polyline.fillColor || "#000000";
				var _fillColor = new dojo.Color(fill);
				_fillColor.a = (polyline.opacity || 1.0);
				symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, color, 3), _fillColor);

			}
			else
			{
				symbol = new esri.symbol.SimpleLineSymbol().setColor(color).setWidth(polyline.width);
			}
			graphic = new esri.Graphic(polygonOrLine, symbol);
			map.graphics.add(graphic);
			polyline.esri_graphic = graphic;
			return graphic;
		},

		removePolyline: function(polyline)
		{
			var map = this.maps[this.api];
			if (polyline.esri_graphic)
			{
				map.graphics.remove(polyline.esri_graphic);
			}
			else
			{
				console.warn("no graphics found on this polyline");
			}

		},

		getCenter: function()
		{
			var map = this.maps[this.api];
			var pt = map.extent.getCenter();
			var point = new mxn.LatLonPoint(pt.y, pt.x);
			return point;
		},

		setCenter: function(point, options)
		{

			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			if (map.spatialMapManager.isPointInFullExtent(pt) == false)
			{
				return;
			}
			map.centerAt(pt);

		},
		setZoom: function(zoom)
		{
			var map = this.maps[this.api];

			map.centerAndZoom(map.extent.getCenter(), zoom);
		},
		getZoom: function()
		{
			var map = this.maps[this.api];
			// var zoom = map.getLevel();
			if (map.getLevel() == -1)
			{
				if (map._maximo && map._maximo.mapStartingWidth)
				{
					return (map.extent.getWidth() / map._maximo.mapStartingWidth);
				}
				else
				{
					// no way to know the current level
					return 1;
				}
			}
			else
			{
				return map.getLevel();
			}
		},

		getZoomLevelForBoundingBox: function(bbox)
		{
			// NE and SW points from the bounding box.
			var map = this.maps[this.api];
			var ne = bbox.getNorthEast();
			var sw = bbox.getSouthWest();
			var zoom;

			// TODO: Add provider code
			return zoom;
		},

		setMapType: function(type)
		{
		},

		getMapType: function()
		{
		},

		getBounds: function()
		{
			var map = this.maps[this.api];
			var bnd = map.extent;
			return new mxn.BoundingBox(bnd.ymin, bnd.xmin, bnd.ymax, bnd.xmax);
		},

		setBounds: function(bounds)
		{
			var map = this.maps[this.api];
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();
			var bnd = new esri.geometry.Extent(parseFloat(sw.lon), parseFloat(sw.lat), parseFloat(ne.lon), parseFloat(ne.lat), map.spatialReference);
			map.setExtent(bnd, true);
		},

		addImageOverlay: function(id, src, opacity, west, south, east, north, oContext)
		{
		},

		setImagePosition: function(id, oContext)
		{
		},

		addOverlay: function(url, autoCenterAndZoom)
		{
		},

		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type)
		{
		},

		toggleTileLayer: function(tile_url)
		{
		},

		getPixelRatio: function()
		{
		},

		mousePosition: function(element)
		{
		},
		destroyMap: function()
		{
			if (this.maps[this.api].infoWindow)
			{
				this.maps[this.api].infoWindow.destroy();
			}
			if (this._mover)
			{
				this._mover.disconnectInstalledListeners();
			}
			if (this._infoWindowListener)
			{
				dojo.disconnect(this._infoWindowListener);
			}
			if (this._connections)
			{
				for ( var link in this._connections)
				{
					dojo.disconnect(this._connections[link]);
				}
			}
			// destroy all DIJITs registered by Esri api:
			try
			{
				var mapDiv = dojo.byId(this.mapDivId);
				var esriWidgets = esriDijitNew.findWidgets(mapDiv);

				esriDojoNew.forEach(esriWidgets, function(w)
				{
					w.destroyRecursive(true);
				});
				// not sure why the above is empty, however we
				// have dijits so we need the second logic
				// below.
				for ( var id in esriDijitNew.registry)
				{
					var esris = esriDijitNew.registry[id];
					for ( var id2 in esris)
					{
						if (esris[id2].destroy)
						{
							console.info("destroying " + esris[id2].id);
							esris[id2].destroy();
						}
					}
				}
			}
			catch (e)
			{
				console.warn("exception destroying map", e);
			}

		}
	},

	LatLonPoint: {
		toProprietary: function(api)
		{
			var sr = this.sr;
			if (sr && sr != null)
			{
				sr = new esri.SpatialReference({
					wkid: sr
				});
			}
			else
			{
				sr = window.mx.esri.sr;
			}
			return new esri.geometry.Point(this.lon, this.lat, sr);
		},
		fromProprietary: function(pt)
		{
			this.lat = pt.y;
			this.lon = pt.x;
			this.lng = pt.x;
			this.sr = pt.spatialReference.wkid;
		},
		fromWGS84: function(callback, errCb)
		{
			this.api = api;

			if (window.mx.esri.sr.wkid == mxn.util.getWGS84WKID())
			{
				callback(this);
			}
			else
			{
				var map = this.maps[this.api];
				var fct = function(points)
				{
					this.lat = points[0].lat;
					this.lng = points[0].lng;
					this.lon = points[0].lng;
					this.sr = points[0].sr;
					callback(this);
				};
				map.projectPointsFromWebMercator([ this ], dojo.hitch(this, fct), errCb);
			}
		},
		toWGS84: function(callback, errCb)
		{
			if (window.mx.esri.sr.wkid == mxn.util.getWGS84WKID())
			{
				callback(this);
			}
			else
			{
				var map = this.maps[this.api];
				var fct = function(points)
				{
					this.lat = points[0].lat;
					this.lng = points[0].lng;
					this.lon = points[0].lng;
					this.sr = points[0].sr;
					callback(this);
				};
				map.projectPointsToWebMercator([ this ], dojo.hitch(this, fct), errCb);
			}
		}
	},

	Marker: {
		toProprietary: function()
		{
			var map = this.map;
			var myPoint = this.location.toProprietary(this.api);// new

			if (!this.iconSize)
			{
				this.iconSize = [ 16, 16 ];
			}

			var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, this.iconSize[0], new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new dojo.Color([ 255, 0, 0 ]), 1), new dojo.Color([ 0, 255, 0, 0.25 ]));
			if (this.iconUrl)
			{
				symbol = new esri.symbol.PictureMarkerSymbol(this.iconUrl, this.iconSize[0], this.iconSize[1]);

			}
			// MAPSTRACTION assumes img origin is at bottom left.
			// Esri uses image's center so we must offset esri
			// symbol to match Mapstraction's
			if (this.iconAnchor)
			{
				// ESRI uses the center of the image as it's origin
				// need to adjust icon anchor before set it to bottom left
				symbol.setOffset((this.iconSize[0] / 2) - this.iconAnchor[0], this.iconAnchor[1] - (this.iconSize[1] / 2));
			}
			else
			{
				symbol.setOffset(this.iconSize[0] / 2, -this.iconSize[1] / 2);
			}

			// add label if needed
			if (this.labelText != null && this.labelText.length > 0)
			{
				var font = esri.symbol.Font("14px", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, "Serif");
				var textSymbol = esri.symbol.TextSymbol(this.labelText, font, new dojo.Color("#FFFFFF"));
				var imgXOffset = ((this.iconSize[0] / 2) - this.iconAnchor[0]);

				var xoffset = (this.iconSize[0] / 2) - this.iconAnchor[0];
				/*
				 * if(isNaN(this.labelText)==false){ var num =
				 * parseInt(this.labelText); if(num>9){
				 * xoffset-=-(this.iconSize[0] / 4); } }
				 */
				textSymbol.setOffset(xoffset, +(this.iconSize[1] / 2));
				// textSymbol.setAlign(esri.symbol.Font.ALIGN_MIDDLE);
				textSymbol.setFont(font);

				var txtGraphic = new esri.Graphic(myPoint, textSymbol);
				txtGraphic.proprietary_marker_label = this;
				txtGraphic.is_mapstraction_label = true;
				this.proprietary_marker_label = txtGraphic;
			}

			var graphic = new esri.Graphic(myPoint, symbol);
			if (this.draggable == true)
			{
				if (!this.mapstraction._mover)
				{
					this.mapstraction._mover = new ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover({
						map: map
					});
					this.mapstraction._mover.installListenersOn(map.graphics);
				}

			}
			var rootElement = this.mapstraction.currentElement;
			if (this.tooltip && this.tooltip.length > 0)
			{
				this._toolTipMouseListeners = [];
				this._toolTipMouseListeners.push(dojo.connect(map.graphics, "onMouseOver", function(e)
				{
					mxn.util.stopEventPropagation(e);
					dojo.stopEvent(e);
					var mapstraction_marker = e.graphic.mapstraction_marker;
					if (!e.graphic.mapstraction_marker)
					{
						mapstraction_marker = e.graphic.proprietary_marker_label;
					}
					if (mapstraction_marker)
					{
						var geometry = mapstraction_marker.proprietary_marker.geometry;
						if (geometry.type == "point")
						{
							var screenPoint = map.toScreen(geometry);
							mapstraction_marker.showTooltip(screenPoint, rootElement);
						}
					}

				}));

				this._toolTipMouseListeners.push(dojo.connect(map.graphics, "onMouseDown", function(e)
				{
					var mapstraction_marker = e.graphic.mapstraction_marker;
					if (!e.graphic.mapstraction_marker)
					{
						mapstraction_marker = e.graphic.proprietary_marker_label;
					}
					if (mapstraction_marker)
					{
						mapstraction_marker.hideTooltip();
					}
				}));
				this._toolTipMouseListeners.push(dojo.connect(map.graphics, "onMouseOut", function(e)
				{

					var mapstraction_marker = e.graphic.mapstraction_marker;
					if (!e.graphic.mapstraction_marker)
					{
						mapstraction_marker = e.graphic.proprietary_marker_label;
					}
					if (mapstraction_marker)
					{
						mapstraction_marker.hideTooltip();
					}
				}));

			}

			if (this.infoBubble)
			{
				var infoWindow = new ibm.tivoli.fwm.mxmap.InfoWindow({
					map: map,
					isRTL: false,
					mapId: this._maximoMapId,
					rootElement: rootElement
				});
				this.proprietary_infowindow = infoWindow;

				// as esri allow us to listen on graphics (and not on a
				// single
				// graphic
				// we need to have a single listener registered to avoid
				// multiple
				// events to be published
				if (!this.mapstraction._infoWindowListener)
				{
					this.mapstraction._infoWindowListener = dojo.connect(map.graphics, "onClick", function(e)
					{
						mxn.util.stopEventPropagation(e);
						dojo.stopEvent(e);
						var mapstraction_marker = e.graphic.mapstraction_marker;
						if (!e.graphic.mapstraction_marker)
						{
							mapstraction_marker = e.graphic.proprietary_marker_label;
						}
						if (mapstraction_marker)
						{
							dojo.publish("startedUserInteractionOnMap_" + this._maximoMapId, [ {
								objectSource: mapstraction_marker,
								objectSourceName: 'maximospatial',
								eventName: 'openBubble'
							} ]);
							mapstraction_marker.openBubble();
						}
					});
				}
			}
			return graphic;

		},
		openBubble: function()
		{
			var map = this.map;
			var marker = this;
			var infowindow = this.proprietary_infowindow;

			var point = this.location.toProprietary(this.api);
			var screenPoint = map.toScreen(point);
			this.proprietary_infowindow.setContent(this.infoBubble);
			this.proprietary_infowindow.show(screenPoint.x, screenPoint.y);

			var updateInfoWindow = function(extent, delta)
			{
				var screenPoint = map.toScreen(point);
				infowindow.updatePosition(screenPoint.x + delta.x, screenPoint.y + delta.y);
			};
			var updateInfoWindowZoom = function()
			{
				var screenPoint = map.toScreen(point);
				infowindow.updatePosition(screenPoint.x, screenPoint.y);
			};
			dojo.connect(map, "onPan", updateInfoWindow);
			dojo.connect(map, "onZoomEnd", updateInfoWindowZoom);

			this.openInfoBubble.fire({
				'marker': this
			});

			this.hideTooltip();
		},
		closeBubble: function()
		{
			if (this.hasOwnProperty('proprietary_infowindow'))
			{
				this.proprietary_infowindow.close();
				this.closeInfoBubble.fire({
					'marker': this
				});
				dojo.publish("endedUserInteractionOnMap_" + this._maximoMapId, [ {
					objectSource: this,
					objectSourceName: 'maximospatial',
					eventName: 'closeBubble'
				} ]);

			}
		},
		hide: function()
		{
			this.proprietary_marker.hide();
			if (this.proprietary_marker_label)
			{
				this.proprietary_marker_label.hide();
			}
			this.hideTooltip();

			if (this._toolTipMouseListeners && this._toolTipMouseListeners.length > 0)
			{
				for ( var i in this._toolTipMouseListeners)
				{
					dojo.disconnect(this._toolTipMouseListeners[i]);
				}
			}

		},
		show: function()
		{
			this.proprietary_marker.show();
			if (this.proprietary_marker_label)
			{
				this.proprietary_marker_label.show();
			}
		},
		update: function()
		{
			var point = new mxn.LatLonPoint();
			point.fromProprietary('maximospatial', this.proprietary_marker.getPosition());
			this.location = point;
		}
	},
	Polyline: {
		fromProprietary: function(polyline)
		{
			var paths = polyline.paths || polyline.rings;
			var points = [];

			for ( var i = 0; i < paths.length; i++)
			{
				var path = paths[i];
				for ( var j = 0; j < path.length; j++)
				{
					var p = path[j];
					var point = new mxn.LatLonPoint(p[1], p[0]);
					points.push(point);
				}
			}

			this.points = points;
		},
		toProprietary: function()
		{
			var mpoints = [];
			var polylineJson;
			var polylineOrPolygon;
			for ( var index = 0; index < this.points.length; index++)
			{
				var p = this.points[index];
				mpoints.push([ p.lon, p.lat ]);
			}

			if (this.closed && this.closed == true)
			{
				polylineJson = {
					"rings": [ [] ],
					"spatialReference": {
						"wkid": window.mx.esri.sr.wkid
					}
				};
				polylineJson.spatialReference = window.mx.esri.sr.wkid;
				polylineOrPolygon = new esri.geometry.Polygon(polylineJson);
				polylineOrPolygon.rings[0] = mpoints;
			}
			else
			{
				polylineJson = {
					"paths": [ [] ],
					"spatialReference": {
						"wkid": window.mx.esri.sr.wkid
					}
				};
				polylineJson.paths[0] = mpoints;
				polylineJson.spatialReference = window.mx.esri.sr.wkid;
				polylineOrPolygon = new esri.geometry.Polyline(polylineJson);
			}
			this.proprietary_polyline = polylineOrPolygon;
			return polylineOrPolygon;
		},
		show: function()
		{
		},
		hide: function()
		{
		}
	}
});
});

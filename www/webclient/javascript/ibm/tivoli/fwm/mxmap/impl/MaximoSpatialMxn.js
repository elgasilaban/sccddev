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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn");

/**
 * It's hard to extend Mapstraction without impacting other providers so this
 * dojo object performs the main operations for MaximoSpatial.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn", null, {

	map: null,
	fullExtent: null,
	mapstraction: null,
	numberOfExternalMaps: 0,
	totalLoaded: 0,
	totalMapServices: 0,
	loadList: [],
	mapInitialExtent: null,
	bingMapsLayer: null,
	osmTries: 0,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.loadList = [];
		fromWebMercatorCache = {};
		toWebMercatorCache = {};
	},
	/**
	 * This method checks if all layers are already loaded so further map
	 * operations can be performed
	 */
	checkIfAllLoaded: function()
	{
		this.totalLoaded++;

		console.log("TotalMapServices", this.totalLoaded + "/" + this.getTotalLayers());

		if (this.getTotalLayers() == this.totalLoaded)
		{
			for ( var i = 0; i < this.loadList.length; i++)
			{
				dojo.disconnect(this.loadList[i]);
			}
			this.mapstraction.loaded[this.api] = true;

			console.log("spatialReference", this.map.spatialReference);

			// this is to store the map spatial reference to be
			// referenced by any other code
			window.mx = {
				esri: {
					sr: this.map.spatialReference
				}
			};
			var width = 0;
			if (this.map.extent)
			{
				width = this.map.extent.getWidth();
			}
			this.map._maximo = {
				mapStartingWidth: width,
				hasCachedMapService: this.hasCachedMapService
			};
			var ms = this.mapstraction;
			ms.state = {
				updating: false,
				panning: false,
				zooming: false
			};
			dojo.connect(this.map, "onUpdateStart", function(evt)
			{

				ms.state.updating = true;

			});
			dojo.connect(this.map, "onUpdateEnd", function(evt)
			{
				ms.state.updating = false;
				// ms.endPan.fire();// no matching event

			});
			dojo.connect(this.map, "onPanStart", function(evt, startpoint)
			{
				ms.state.updating = true;

			});
			dojo.connect(this.map, "onPanEnd", function(evt)
			{				
				ms.endPan.fire();
				ms.state.updating = false;

			});
			dojo.connect(this.map, "onZoomStart", function(extent, zoomFactor, anchor, level)
			{

				ms.state.updating = true;

			});

			dojo.connect(this.map, "onReposition", function(x, y)
			{				
				dojo.publish("onESRIReposition");
			});
			dojo.connect(this.map, "onZoomEnd", function(extent, zoomFactor, anchor, level)
			{

				ms.state.updating = false;
				ms.changeZoom.fire();

			});
			if (this._failedLayers.length > 0)
			{
				console.warn("The following layers failed to load", this._failedLayers);
			}
			var fl = this._failedLayers;
			this.mapstraction.getFailedLayers = function()
			{
				return fl;
			};

			try
			{
				var scalebar = new esri.dijit.Scalebar({
					map: this.map,
					scalebarUnit: this.lenUnit,
					attachTo: 'bottom-left'
				});
			}
			catch (e)
			{
				console.warn("failed to load scale bar");
				console.warn(e);
			}

			if (!this.mapstraction.optParams.isMobile)
			{
				try
				{
					var overviewMapDijit = new esri.dijit.OverviewMap({
						map: this.map,
						color: "#6E6EFF",
						expandFactor: 2.5,
						maximizeButton: false,
						visible: false
					});
					overviewMapDijit.startup();
				}
				catch (e)
				{
					console.warn("failed to load Overview Map");
					console.warn(e);
				}
			}

			this.mapstraction.runDeferred();

		}

	},
	_failedLayers: [],
	/**
	 * when a map fails to load
	 */
	_failedToLoadMapService: function(args, error)
	{
		console.log("error", args, error);
		args.error = error;
		this._failedLayers.push(args);
		this.handleB4BaseMap(args, null);
		this.checkIfAllLoaded();
	},
	hasCachedMapService: false,
	/**
	 * Determine the type of a layer and loads it
	 */
	determineTypeAndLoadLayer: function(response, mps, map)
	{

		var layer;
		var mapServiceParameter = {
			id: mps.name,
			opacity: parseFloat(mps.transparency),
			visible: mps.visible

		};

		var onUpdateFct = function(arg)
		{

			console.info("onUpdate for  ", mps.name, mps.url, arg, layer.fullExtent, layer);

			if (this.fullExtent == null)
			{
				this.fullExtent = layer.fullExtent;
				console.info("this.fullExtent  ", this.fullExtent);
			}
			else
			{
				this.fullExtent = this.fullExtent.union(layer.fullExtent);
				console.info("this.fullExtent  ", this.fullExtent);
			}
			this.checkIfAllLoaded();
		};
		if (response.tileInfo)
		{

			console.log(mps.name + ' is tiled ' + mps.url);

			layer = new esri.layers.ArcGISTiledMapServiceLayer(mps.url, mapServiceParameter);
			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));
			this.hasCachedMapService = true;

		}
		else if (response.serviceDataType === "esriImageServiceDataTypeGeneric")
		{

			console.log(mps.label + ' is ImageServer service ' + mps.url);

			var imageServiceParameters = new esri.layers.ImageServiceParameters();
			mapServiceParameter.imageParameters = imageServiceParameters;
			layer = new esri.layers.ArcGISImageServiceLayer(mps.url, mapServiceParameter);
			layer.setDisableClientCaching(true);
			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));

		}
		else
		{

			console.log(mps.name + ' is dynamic ' + mps.url);

			// Use the ImageParameters to set map service layer
			// definitions and map service visible layers before
			// adding to the client map.
			var imageParameters = new esri.layers.ImageParameters();

			imageParameters.transparent = true;
			if (mps.visibleLayers && mps.visibleLayers.length > 0 && mps.visibleLayers[0] !== 'all')
			{
				// I want layers 5,4, and 3 to be visible
				imageParameters.layerIds = mps.visibleLayers;
				imageParameters.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;

			}

			if (this.mapInitialExtent)
			{

				console.log("has an extent", this.mapInitialExtent);

				imageParameters.bbox = this.mapInitialExtent;
			}
			mapServiceParameter.imageParameters = imageParameters;
			//            

			layer = new esri.layers.ArcGISDynamicMapServiceLayer(mps.url, mapServiceParameter);
			// for dynamic map services we don't cache its map
			// images locally bcuz changes to it are often.
			layer.setDisableClientCaching(true);

			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));
			// onload is triggered before we can execute actions
			// on the map
			dojo.connect(layer, "onLoad", dojo.hitch(this, function()
			{
				console.log(mps.name + " layer was loaded waiting for 1st update");
			}));

		}
		// console.log("added layer ' " + mps.name + "' " + mps.order);
		// spatial order is the opposite, the biggest the order is the lower in
		// the map it will be

		console.log("order ", mps.order, this.basemapOrder);
		if (this.baseMapAdded == true)
		{
			this.map.addLayer(layer);
		}
		else
		{
			this.handleB4BaseMap(mps, layer);
		}
		// , mps.order);
	},
	handleB4BaseMap: function(mps, layer)
	{
		if (mps.order == this.basemapOrder)
		{
			this.baseMapAdded = true;
			if (layer)
			{
				this.map.addLayer(layer);
			}
			for ( var id in this.buffer)
			{
				this.map.addLayer(this.buffer[id]);
			}
		}
		else
		{
			if (layer)
			{
				this.buffer.push(layer);
			}
		}
	},
	buffer: [],
	numberOfBaseMaps: 0,
	/**
	 * returns the total number of layers to be loaded
	 */
	getTotalLayers: function()
	{
		return this.totalMapServices + this.numberOfExternalMaps;
	},
	/**
	 * Create a OpenStreetMap Layer
	 */
	createOSMLater: function()
	{

		try
		{
			if (this.osmTries == 0)
			{
				this.numberOfExternalMaps++;
			}
			this.openStreetMapLayer = new esri.layers.OpenStreetMapLayer();
			/*
			 * esri.layers.OpenStreetMapLayer( { id: "OpenStreetMap", visible:
			 * true, opacity: 1, displayLevels:[0,1,2] });
			 */

			this.map.addLayer(this.openStreetMapLayer, 0);
			this.loadList.push(dojo.connect(this.openStreetMapLayer, "onUpdate", dojo.hitch(this, "checkIfAllLoaded")));
			// for all maps loaded event
		}
		catch (e)
		{
			console.log("osm", e);
			if (this.osmTries < 6)
			{
				this.osmTries++;
				console.warn('postpone OSM');
				setTimeout(dojo.hitch(this, this.createOSMLater), 500);
			}
			else
			{
				console.error('failed to load OSM');
			}
		}

	},
	/**
	 * Create a bing map layer
	 */
	createBingMapsLayer: function(key)
	{
		this.numberOfExternalMaps++;
		this.bingMapsLayer = new esri.virtualearth.VETiledLayer({
			id: "Bing Maps",
			bingMapsKey: key,
			mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD
		});

		this.map.addLayer(this.bingMapsLayer);
		this.loadList.push(dojo.connect(this.bingMapsLayer, "onUpdateEnd", dojo.hitch(this, this.checkIfAllLoaded)));

		var bingMapsButtonsDiv = dojo.create('div', {
			id: 'bingButtons',
			className: 'bingMapsButtonsDiv'
		}, dojo.byId(this.map.id));

		var buttonClick = dojo.hitch(this, function(id)
		{
			this.bingMapsLayer.setMapStyle(id);
		});

		var msg1 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_aerial");
		var aerials = dojo.create('button', {
			innerHTML: msg1
		}, bingMapsButtonsDiv);
		dojo.connect(aerials, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL);
		});

		var msg2 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_aerialwithlabels");
		var aerialsWithLegend = dojo.create('button', {
			innerHTML: msg2
		}, bingMapsButtonsDiv);
		dojo.connect(aerialsWithLegend, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS);
		});

		var msg3 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_roads");
		var roads = dojo.create('button', {
			innerHTML: msg3
		}, bingMapsButtonsDiv);
		dojo.connect(roads, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD);
		});

	},
	/**
	 * Loads a map based on a map configuration
	 */
	loadMap: function(spatialConf)
	{
		this._failedLayers = [];
		// Bing Maps layer
		if (spatialConf.bingMaps)
		{
			this.createBingMapsLayer(spatialConf.bingMapsKey);
		}
		// OpenStreetMap layer
		if (spatialConf.openStreetMap)
		{
			this.createOSMLater();
		}

		this.totalLoaded = 0;
		if (spatialConf.mapservices[0])
		{
			this.basemapOrder = spatialConf.mapservices[0].order;
		}
		for ( var svcId = 0; svcId < spatialConf.mapservices.length; svcId++)
		{

			var mapServiceInfo = spatialConf.mapservices[svcId];

			var rParams = {
				"f": "json"
			};

			console.log(this.totalMapServices + " " + svcId + " " + spatialConf.mapservices[svcId].order, spatialConf.mapservices[svcId]);

			this.totalMapServices++;

			esri.request({
				url: mapServiceInfo.url,
				load: dojo.hitch(this, function(arg, arg2)
				{
					this.determineTypeAndLoadLayer(arg, arg2.args.params.mapServiceInfo, this.map);
				}),
				error: dojo.hitch(this, function(error)
				{
					this._failedToLoadMapService(mapServiceInfo, error);
				}),
				handleAs: "json",
				callbackParamName: "callback",
				sync: true,
				content: rParams,
				params: {
					"mapServiceInfo": mapServiceInfo
				},
				timeout: 30000
			});

		}
	},
	isPointInFullExtent: function(pt)
	{
		var fullextent = this.map.extent;

		if (this.fullExtent)
		{
			fullextent = this.fullExtent;
		}
		return fullextent.contains(pt);
	},
	toWebMercatorCache: {},
	projectPointsToWebMercator: function(points, callbackFct, errCallback)
	{

		var outSR = new esri.SpatialReference({
			wkid: 4326
		});
		var esriPoints = [];
		var propPoints = [];

		for ( var i = 0; i < points.length; i++)
		{
			if (this.toWebMercatorCache[points[i]] != null)
			{
				propPoints.push(this.toWebMercatorCache[points[i]]);
				continue;
			}
			esriPoints.push(points[i].toProprietary("maximospatial"));
		}

		if (propPoints.length == points.length)
		{

			callbackFct(propPoints);
			return;
		}
		if (this.esriGeometryService == null)
		{
			var error = {
				message: "Geometry service not found",
				msggroup: "plussmap",
				msgkey: "failed_loading_geometry_service"
			};
			errCallback(error);
		}
		var mxnMe = this;
		this.esriGeometryService.project(esriPoints, outSR, function(projectedPoints)
		{

			for ( var i = 0; i < projectedPoints.length; i++)
			{
				var esriP = projectedPoints[i];
				var pp = new mxn.LatLonPoint(esriP.y, esriP.x, outSR.wkid);
				mxnMe.toWebMercatorCache[points[i]] = pp;
				propPoints.push(pp);
			}

			callbackFct(propPoints);
		});

	},
	fromWebMercatorCache: {},
	projectPointsFromWebMercator: function(points, callbackFct, errCallback)
	{
		var outSR = window.mx.esri.sr;
		var esriPoints = [];
		var mercatorSr = new esri.SpatialReference({
			wkid: 4326
		});
		var propPoints = [];

		for ( var i = 0; i < points.length; i++)
		{
			if (this.fromWebMercatorCache[points[i]] != null)
			{
				propPoints.push(this.fromWebMercatorCache[points[i]]);
				continue;
			}
			var p = new esri.geometry.Point(points[i].lng, points[i].lat, mercatorSr);
			esriPoints.push(p);
		}

		if (propPoints.length == points.length)
		{

			callbackFct(propPoints);
			return;
		}
		if (this.esriGeometryService == null)
		{
			var error = {
				message: "Geometry service not found",
				msggroup: "plussmap",
				msgkey: "failed_loading_geometry_service"
			};
			errCallback(error);
		}
		var mxnMe = this;
		this.esriGeometryService.project(esriPoints, outSR, function(projectedPoints)
		{

			for ( var i = 0; i < projectedPoints.length; i++)
			{
				var esriP = projectedPoints[i];

				var pp = new mxn.LatLonPoint(esriP.y, esriP.x, outSR.wkid);
				mxnMe.fromWebMercatorCache[points[i]] = pp;
				propPoints.push(pp);
			}

			callbackFct(propPoints);
		});
	}

});
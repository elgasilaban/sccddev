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
dojo.provide("ibm.tivoli.fwm.mxmap.Map");
dojo.require("ibm.tivoli.fwm.mxmap.ContextMenu");
dojo.require("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet");
dojo.require("ibm.tivoli.fwm.mxmap.MaximoIntegration");
dojo.require("ibm.tivoli.fwm.mxmap.Geocoder");
dojo.require("ibm.tivoli.fwm.mxmap.UserSessionManager");
dojo.require("ibm.tivoli.fwm.mxmap.MapTipsManager");
dojo.require("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager");
dojo.require("ibm.tivoli.fwm.mxmap.CurrentMXRecManager");
dojo.require("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayersManager");
dojo.require("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager");
dojo.require("dijit.dijit");
dojo.require("dijit.Tooltip");
dojo.require("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
/**
 * Main map implementation
 */
dojo.declare("ibm.tivoli.fwm.mxmap.Map", ibm.tivoli.fwm.mxmap._Base, {
	events: {
		mapLoaded: "mxmap.mapLoaded"
	},
	map: null,
	_actionsAreEnabled: true,
	routeManager: null,
	divId: null,
	height: null,
	width: null,
	heightPx: null,
	widthPx: null,
	compId: null,
	mapConf: null,
	routeConf: null,
	providerName: null,
	isMobile: false,
	router: null,
	isFullScreen: false,
	customInitialMapOptions: {},
	fullScreenHelper: null,
	geocoder: null,
	maximo: null,
	currentRecordSetControl: null,
	userSessionManager: null,
	initialized: false,
	markerRefresher: null,
	toolbar: null,
	currentRecordMgr: null,
	maptips: null,
	contextMenu: null,
	layersManager: null,
	symbologyManager: null,
	mapOffsetTop: null,
	getId: function()
	{
		return this.compId;
	},
	constructor: function(options)
	{
		this._datasources = [];
	},
	getMaximo: function()
	{
		return this.maximo;
	},
	getSessionData: function()
	{
		if (this.mapConf)
		{
			return this.mapConf.sessionData;
		}
		return {};
	},

	/**
	 * In case no configuration was made
	 */
	_getDefaultInitialLocation: function()
	{
		return {
			lat: 0.0,
			lng: 0.0,
			level: 3
		};
	},
	_getInitialLocation: function(location)
	{
		console.log("[Map] Configured Initial Location ", location);
		var loc = this._getDefaultInitialLocation();

		if (this.userSessionManager != null && this.userSessionManager.hasLastUserLocation())
		{
			location = this.userSessionManager.getLastUserLocation();
		}
		if (location && location.lat && location.lng)
		{
			loc.lat = location.lat;
			loc.lng = location.lng;
		}

		if (location && location.level)
		{
			loc.level = location.level;
		}
		console.log("[Map] Initial Location to be used if no record", loc);
		return loc;

	},
	getMapTipsManager: function()
	{
		return this.maptips;
	},
	/**
	 * Creates a map based on the props of the options param.
	 */
	createMap: function(options)
	{
		console.log('[Map] Map Component Id ', options.compId);
		this.refreshListener = [];
		this.compId = options.compId;
		this._sectionExpaded = false;
		try
		{

			if (this.initialized === true)
			{
				console.warn("already created!");
				return;
			}
			if (options.isInExpanded == false)
			{
				this.disableActions();
			}
			dojo.mixin(this, options);
			if (dojo.isIE > 0)
			{
				// not sure why but in IE the view port returned is taller.
				this._dueDistances = 84;
			}
			var mapDiv = dojo.byId(this.divId);
			/* 12-10909 - need to set the values here first because of resize */
			this.mapOffsetTop = mapDiv.offsetTop;
			this._resize();
			this.userSessionManager = new ibm.tivoli.fwm.mxmap.UserSessionManager({
				map: this,
				persistence: this.mapConf.inputConfs.contextpersistent
			});
			this.map = new mxn.Mapstraction(this.divId, this.providerName, false, this.mapConf.key, this.getInitOptions(), this.getId());
			if (this.isMobile == true)
			{
				this.map.addControls({
					pan: true,
					zoom: 'small',
					scale: true,
					enableScrollWheelZoom: true,
					map_type: true
				});
			}
			else
			{
				this.map.addControls({
					pan: true,
					zoom: 'large',
					scale: true,
					enableScrollWheelZoom: true,
					map_type: true
				});
			}
			this.map.applyOptions();
			console.log("[Map] Options", options);
			if (options.isTesting == true)
			{
				console.log("[Map] UT ENABLED");
				this.maximo = options.maximoImpl;
			}
			else
			{
				this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
			}
			this.maptips = new ibm.tivoli.fwm.mxmap.MapTipsManager({
				maximo: this.maximo
			});

			// Create the symbologyManager object and build the layer tree
			// according to the symbology configuration file
			this.mapConf.inputConfs.defaultsymbology = dojo.fromJson(this.mapConf.inputConfs.defaultsymbology);
			this.symbologyManager = new ibm.tivoli.fwm.mxmap.symbology.SymbologyManager({
				map: this,
				defaultSymbologyConfig: this.mapConf.inputConfs.defaultsymbology
			});

			this.layersManager = new ibm.tivoli.fwm.mxmap.layers.LayersManager({
				symbManager: this.symbologyManager,
				layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
				map: this
			});

			if (this.allowsTrafficLayer() == true)
			{
				// Create the traffic layer
				var trafficLayerOptions = {
					layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "traffic"),// "Traffic";
					layerId: "traffic",
					map: this
				};
				var trafficLayer = new ibm.tivoli.fwm.mxmap.layers.TrafficLayer(trafficLayerOptions);
				this.layersManager.addLayer(trafficLayer, false);
			}

			// Create the route layer
			var routeLayerOptions = {
				layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "routelayer"),// "Route";
				layerId: "route",
				map: this
			};
			var routeLayer = new ibm.tivoli.fwm.mxmap.layers.RouteLayer(routeLayerOptions);
			this.layersManager.addLayer(routeLayer, false);

			var interval = this.mapConf.inputConfs.refreshmapinterval;
			if (interval != null && interval > 0)
			{
				this.markerRefresher = new ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher({
					map: this,
					maximo: this.maximo,
					interval: interval
				});
			}

			var me = this;
			this.currentRecordSetControl = new ibm.tivoli.fwm.mxmap.CurrentMXRecordSet({
				records: me.mapConf.records,
				markerImgUrl: me.mapConf.inputConfs.markerimgurl,
				map: me
			});
			
			/* 12-13622 */
			if (me.mapConf.error)
			{
				this.maximo.showMessage(me.mapConf.error.group, me.mapConf.error.key, [me.mapConf.error.params]);
			}

			/* 12-10070 */
			this.currentRecordMgr = new ibm.tivoli.fwm.mxmap.CurrentMXRecManager({
				mbo: me.mapConf.currentMbo,
				map: me,
				draggable: (me.isMapViewOnly() == false),
				markerImgUrl: me.mapConf.inputConfs.markerimgurl
			});
			this.geocoder = new ibm.tivoli.fwm.mxmap.Geocoder({
				map: me,
				key: this.mapConf.key
			});
			this.map.setMapType(mxn.Mapstraction.ROAD);

			console.log("[Map] Input Configurations", this.mapConf.inputConfs);
			if (this.mapConf.inputConfs.toolbarenabled == 1 || this.mapConf.inputConfs.toolbarenabled == true || this.mapConf.inputConfs.toolbarenabled=="true")
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[Map] Toolbar enabled with these additional items", this.mapConf.inputConfs.toolitems);
				}
				var additionalItems = [];
				if (this.mapConf.inputConfs.toolitems)
				{
					additionalItems = dojo.fromJson(this.mapConf.inputConfs.toolitems);
				}

				this.toolbar = new ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager({
					gisdata: this.mapConf.gisdata,
					mxdata: this.mapConf.mxdata,
					items: additionalItems,
					map: me
				});

				this.toolbar.startup();
				/* 12-10909 - update the values if we have toolbar */
				this.mapOffsetTop = mapDiv.offsetTop;
			}

			this.isFullScreen = (this.mapConf.inputConfs.fullscreenmode == "true");
			this.fullScreenHelper = new ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper({
				map: me,
				mapToolbar: me.toolbar,
				mapDivElement: dojo.byId(me.divId),
				mapDivWidth: me.widthPx,
				mapDivHeight: me.heightPx
			});
			console.log("[Map] Map configured, waiting for Map loading");
			if (!this.map.isLoaded())
			{
				this.map.addOnload(dojo.hitch(this, this._completeInitAfterMapLoads));
				this.map.addOnload(dojo.hitch(this, this._resize));

			}
			else
			{
				this._completeInitAfterMapLoads();
			}

			if (this.mapConf.isInMapManager)
			{
				var updateExtentsFn = dojo.hitch(this, function(context, args)
				{
					var locInfo = {
						lat: this.map.getCenter().lat,
						lng: this.map.getCenter().lng,
						level: this.map.getZoom()
					};
					console.info("[UserSessionManager] Saving Location", locInfo);
					this.getMaximo().storeUserLocation(locInfo);
				});

				this.map.changeZoom.addHandler(updateExtentsFn, ""/* context */);
				this.map.endPan.addHandler(updateExtentsFn, ""/* context */);
			}
			// reset timeout timer
			this.map.endPan.addHandler(function()
			{
				this.resetMaximoTimeout(false);
			}, this.maximo);
		}
		catch (e)
		{
			console.error("Error in map creation", e, dojo.toJson(e));
			sendEvent('showErrors', options.compId, "unknown");
		}
	},
	centerAndZoomMap: function()
	{

		if (this.routerManager != null && this.routeConf.hasRoute == true)
		{
			return;
		}
		var initialLocation = this._getInitialLocation(this.mapConf.initialLocation);
		if (this.mapConf.zoomToDataInput == true)
		{

			console.log("[Map] Zoom to data input enabled ", this.currentRecordSetControl.isEmpty(), this.currentRecordMgr.hasAnyGISCoordinates());

			if (this.currentRecordSetControl.isEmpty() == true && this.currentRecordMgr.hasAnyGISCoordinates() != true)
			{
				console.log("[Map] Center and Zoom Map - on default location");

				this._setDefaultLocation(initialLocation);
			}
			else
			{
				if (this.currentRecordMgr.hasAnyGISCoordinates() == true)
				{
					console.log("[Map] Center Map - with current recordrecords ");
					this._zoomToCurrentMboRec(initialLocation);
				}
				else
				{
					console.log("[Map] Center and Zoom Map - with multiple records and Zoom Data Enabled");
					this.zoomToMbos(this.currentRecordSetControl.mboInfoArray);
				}
			}

		}
		else
		{
			console.log(this.getId(), "[Map] Center and Zoom Map - on default location", initialLocation);
			this._setDefaultLocation(initialLocation);
		}

	},
	_zoomToCurrentMboRec: function(initialLocation)
	{
		this.currentRecordMgr.centerAndZoom(initialLocation.level);
	},
	_completeInitAfterMapLoads: function()
	{
		this._checkMapLoadedCorrectly();
		if (dojo.config.fwm.debug == true)
		{
			console.log("[Map] Loading actions", this.mapConf);
		}
		if (this.mapConf.action)
		{
			switch (this.mapConf.action)
			{
				case "showMBOLocation":
					if (dojo.config.fwm.debug == true)
					{
						console.log("[Map] Show Mbos Location");
					}
					this.currentRecordSetControl.showMXRecordsOnMap();
					if (this.currentRecordMgr.hasAnyGISCoordinates())
					{
						this.currentRecordMgr.showCurrentRecord(true);
					}
					this.centerAndZoomMap();

					break;
				case "noAction":
					var initialLocation = this._getInitialLocation(this.mapConf.initialLocation);
					this._setDefaultLocation(initialLocation);
					break;
				default:
					console.error("[Map] Unknown initial action", this.mapConf.action);
					break;
			}
		}

		dojo.connect(window, "onresize", this, this._resize);
		if (this.isMobile == true)
		{
			// 12-13046. Safari triggers onorientationchange instead of onresize
			// upon tilting the device.
			var res = function()
			{
				var rr = function()
				{
					this._resize();
				};
				setTimeout(dojo.hitch(this, rr), 200);
			};
			dojo.connect(window, "onorientationchange", this, res);
		}

		this.addSubscription(dojo.subscribe("mxmap_section_expanded_" + this.getId(), dojo.hitch(this, this._mapSectionExpanded)));

		if (this.isMapViewOnly() == false)
		{
			console.log("[Map] Map is not read only - creating context menu");
			this.contextMenu = new ibm.tivoli.fwm.mxmap.ContextMenu({
				divId: this.divId,
				compId: this.getId(),
				map: this.map
			});
			// In future we must be able to load
			dojo.require("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation");
			var setLocationConf = {
				map: this,
				compId: this.getId(),
				label: "Set record location"
			};
			this.contextMenu.addChild(new ibm.tivoli.fwm.mxmap.actions.SetRecordLocation(setLocationConf));
			this.contextMenu.serverUpdated(this.currentRecordMgr.mboInfo);
		}

		if (this.markerRefresher)
		{
			console.log("[Map] Starting Map Marker Refresher");
			this.markerRefresher.start();
		}
		console.log("[Map] Route Configuration Info: ", this.routeConf);
		if (this.routeConf)
		{

			var rparam = {
				routeUrl: this.mapConf.route,
				map: this,
				provider: this.mapConf.provider,
				routeConf: this.routeConf

			};
			this.routeManager = new ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager(rparam);
			
			
			if (this.routeConf.error)
			{
				this.maximo.showMessage(this.routeConf.error.group, this.routeConf.error.key, [this.routeConf.error.params]);
			}
			else if (this.routeConf.hasRoute == true)
			{
				var opendirectionsdialog = this.routeConf.showdirectionsonload;

				this.refreshRoute(true, opendirectionsdialog);
			}
			var fctR = function()
			{
				this.refreshRoute(true, false, true);
			};
			this.addSubscription(dojo.subscribe("refreshroute_" + this.getId(), dojo.hitch(this, fctR)));
		}

		console.log("[Map] Map is full screen", this.isFullScreen);

		if (this.isFullScreen == true)
		{
			this.fullScreenOn();
		}
		this.initialized = true;
		console.log("[Map] Publishing event to indicate map loaded.", this.events.mapLoaded);
		dojo.publish(this.events.mapLoaded, [ this.map, this.getId(), this ]);
		console.log("[Map] Done");
		if (this.isMobile == true)
		{
			// need to handle fullscreen when dialogs are opened/closed
			var onDialogOpen = function()
			{
				if (this.fullScreenHelper._fullScreenOn == true)
				{
					this.fullScreenOff();
					this._mustResetFullScreen = true;
				}
				else
				{
					this._mustResetFullScreen = false;
				}
			};
			var onDialogClose = function()
			{
				if (this._mustResetFullScreen == true)
				{
					this.fullScreenOn();
					this._mustResetFullScreen = false;
				}
			};
			this.addSubscription(dojo.subscribe("onDialogRequested_" + this.getId(), dojo.hitch(this, onDialogOpen)));
			this.addSubscription(dojo.subscribe("onDialogClosed_" + this.getId(), dojo.hitch(this, onDialogClose)));
		}
	},
	getMapConfiguration: function()
	{
		return this.mapConf;
	},
	getMapstraction: function()
	{
		return this.map;
	},
	getSymbologyManager: function()
	{
		return this.symbologyManager;
	},

	_routeRefreshRunning: false,
	refreshRoute: function(forceRefresh, opendirectionsdialog, servercallback, noZoom, routeFinishCallback, routeErrorCallback)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		console.log("[Map] Refreshing Routes");
		if (this.routeManager)
		{
			if (this._routeRefreshRunning == true)
			{
				console.warn("Route is already being refreshed");
				return;
			}
			this._routeRefreshRunning = true;
			var fct = function(data)
			{
				this.routeManager.clearAll();
				if (data.hasRoute == true)
				{
					var callback = dojo.hitch(this, function()
					{
						this._routeRefreshRunning = false;
						if (routeFinishCallback)
						{
							routeFinishCallback(this.routeManager);
						}
					});
					console.log("opendirectionsdialog", opendirectionsdialog);
					if (opendirectionsdialog == "true")
					{
						callback = dojo.hitch(this, function()
						{
							// forces the itinerary dialog to open per conf.
							dojo.publish("showItinerary_" + this.getId());
							console.log("forcing dialog to show route info");
							this._routeRefreshRunning = false;
						});
					}
					var errFct2 = dojo.hitch(this, function(statusCode, error)
					{
						this._routeRefreshRunning = false;
						if (routeErrorCallback)
						{
							routeErrorCallback(statusCode, error);
						}
						else
						{
							this.routeManager.routingError(statusCode, error);
						}

					});
					this.routeManager.createRoute(data.stops, this.routeConf, callback, errFct2, noZoom);

				}
				else
				{
					if (routeFinishCallback)
					{
						routeFinishCallback();
					}
					this._routeRefreshRunning = false;
				}

			};
			var fctErr = function(data)
			{
				console.warn("[Map] Error refreshing route", data);
				this._routeRefreshRunning = false;
				if (routeErrorCallback)
				{
					routeErrorCallback(data);
				}
				else
				{
					if (data.error)
					{
						this.maximo.showMessage(data.error.group, data.error.key, [ data.error.params ]);
					}
					else
					{
						this.maximo.showMessage("mapserver", "route_unknown_failure", [ data ]);
					}
				}

			};
			this.maximo.getRouteStops(dojo.hitch(this, fct), dojo.hitch(this, fctErr), forceRefresh, servercallback);
		}
		else
		{
			console.warn("[Map] No route manager on map - could not refresh route.", this.compId);
		}
	},
	refreshDatasource: function(callback, errcallback)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		var success = dojo.hitch(this, function(response)
		{
			var noZoom = true;
			var datasource = null;
			if (response.action.data.currentMbo)
			{
				this.currentRecordMgr.serverUpdated(response.action.data.currentMbo, noZoom);
				datasource = this.currentRecordMgr;
			}
			else
			{
				this.currentRecordSetControl.updateRecordSetAndRefresh(response.action.data.records, noZoom);
				datasource = this.currentRecordSetControl;
			}
			if (callback)
			{
				callback(datasource);
			}
		});
		var error = dojo.hitch(this, function()
		{
			if (errcallback)
			{
				errcallback(response);
			}
		});
		this.maximo.refreshDatasource(success, error);
	},
	_datasources: [],
	registerDatasourceRefresh: function(callback)
	{
		this._datasources.push(callback);

	},
	_refreshEntireMapRunning: null,
	refreshMap: function(refreshOptions)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		if (this._refreshEntireMapRunning == true)
		{
			console.warn("[Map] refresh going on, ignoring second request");
			return;
		}
		console.info("Refresh:Started");
		this._refreshEntireMapRunning = true;
		var datasourceToZoomTo = null;
		var finalRefreshStep = dojo.hitch(this, function(routeDatasource)
		{

			var i = -1;
			var mustZoom = true;
			if (refreshOptions && refreshOptions.zoom == false)
			{
				mustZoom = false;
			}
			var fct = dojo.hitch(this, function(datasourceObjectToZoom)
			{

				i++;
				if (datasourceObjectToZoom)
				{
					datasourceToZoomTo = datasourceObjectToZoom;
				}
				if (i < this._datasources.length)
				{
					this._datasources[i](fct, null, !mustZoom);
				}
				else
				{
					if (datasourceToZoomTo != null && mustZoom)
					{
						datasourceToZoomTo.centerAndZoom();
					}
					console.info("Refresh:Ended");
					this._refreshEntireMapRunning = false;
					dojo.publish("onMapRefresh_" + this.getId(), [ refreshOptions ]);

				}
			});
			fct(routeDatasource);
		});
		// this only happens if we have the applet as datasource so we can skip
		// to the last step directly
		if (this._datasources.length > 0 && (this.mapConf.inputConfs.datasrc == 'MAINRECORD' && this.currentRecordMgr.hasAnyGISCoordinates() == false) || this.mapConf.inputConfs.datasrc == null
				|| this.mapConf.inputConfs.datasrc.length == 0)
		{
			finalRefreshStep();
		}
		else
		{

			var routeTrigger = dojo.hitch(this, function(datasource)
			{
				datasourceToZoomTo = datasource;
				var routeError = dojo.hitch(this, function(statusCode, error)
				{
					if (refreshOptions.automatic == false)
					{
						this.routeManager.routingError(statusCode, error);
					}
					finalRefreshStep();
				});
				this.refreshRoute(true, false, false, true, finalRefreshStep, routeError);
			});
			this.refreshDatasource(routeTrigger);
		}

	},
	setRecordLocation: function()
	{
		console.log("[Map] Setting current record location: ", this.contextMenu.map.point);
		dijit.popup.close(this.contextMenu);
	},
	clearMarkers: function()
	{
		this.map.removeAllMarkers();
	},
	getMultipleRoutesManager: function()
	{
		return this.routeManager;
	},
	/**
	 * Return any initial provider specific configuration. If any custom conf is
	 * set (by MapControl or presentations 'initialMapOptions' property) it will
	 * override the current code conf.
	 * 
	 */
	getInitOptions: function()
	{
		var defOptions = this._getInitOptions();
		var customInitOptions = this._getCustomInitOptions(this.mapConf.mapoptions);
		for ( var propName in customInitOptions)
		{
			if (customInitOptions.hasOwnProperty(propName))
			{
				var propValue = customInitOptions[propName];
				defOptions[propName] = propValue;
			}
		}
		return defOptions;
	},
	_getCustomInitOptions: function()
	{
		throw "Cannot find custom init options";
	},
	_getInitOptions: function()
	{
		console.warn("No implementation found");
		return {};
	},
	getGeoCoderConf: function()
	{
		return {};
	},
	/**
	 * Set the map current location based on lat/lng and zoom level
	 */
	_setLocation: function(lat, lng, level)
	{
		var latLng = new mxn.LatLonPoint(lat, lng);
		this.map.setCenterAndZoom(latLng, level);
	},
	/**
	 * Set the map current location based on location object {latitude,
	 * longitude, zoomlevel}
	 */
	_setDefaultLocation: function(location)
	{

		if (location && location.lat && location.lng)
		{
			console.log("[Map] setDefaultLocation", location);
			var latLng = new mxn.LatLonPoint(location.lat, location.lng);
			this.map.setCenterAndZoom(latLng, location.level);
		}
		else
		{
			console.log("[Map] setDefaultLocation missing default location");
			this.map.setCenterAndZoom(new mxn.LatLonPoint(0, 0), 3);
		}

	},
	/**
	 * this function resizes the map div based on the input.
	 */
	_resize: function()
	{
		var mapElement = dojo.byId(this.divId);
		var h = this.height;
		var w = this.width;
		if (!this.height)
		{
			h = '100%';
		}
		if (!this.width)
		{
			w = '100%';
		}

		if (h.substr(h.length - 1, 1) == '%')
		{

			// 100% is not valid in maximo, so we need to
			// configure
			// FYI... offsetTop is only returned when the
			// style on the div is position:absolute or
			// position:relative (in
			// some
			// cases)
			// we minus 50, since there is extra padding in
			// maximo that causes
			// scrolling
			// 12-10712 negative values breaks in ie
			h = this._getHeightInPixels(h, mapElement);
			if (h <= 0)
			{
				h = 200;
			}
		}

		// we don't do the same for width, since maximo components are in TD
		// rows and the map inherits the row width.
		dojo.style(mapElement, {
			'width': w,
			'height': h
		});

		if (this.toolbar)
		{
			this.toolbar.updateToolbarWidth(w);
		}
		this.heightPx = parseInt(("" + h).match(/\d+/) || 0);

		
		this.widthPx = this._getWidthInPixels(w);

		if (this.map)
		{
			// 12-10810 - it is needed not only for the full
			// screen but also if the user resizes the screen
			// without fullscreen.
			this.map.resizeTo(w, h, this.widthPx, this.heightPx);
			// Issue 12-12704. If in fullscreen mode, the map div needs to be
			// resized differently

			if (this.fullScreenHelper)
			{
				this.fullScreenHelper.updateMapDimensions(w, h);
			}
		}

	},
	/**
	 * Converts values in % into actual pixel ones
	 */
	// Issue 12-10994. This variable is to compensate the toolbar height on the
	// first resize (because the toolbar is not created yet)
	// TODO: Use the actual toolbar height instead of this hardcoded number
	_dueToolbarHeight: 35,
	_dueDistances: 15,
	_getHeightInPixels: function(height, mapElement)
	{
		var h = height.substr(0, height.length - 1);
		var availableHorRegion = parseInt(dijit.getViewport().h - this.mapOffsetTop);
		var pct = parseInt(h);

		h = (availableHorRegion * (pct / 100.0));

		h -= (this._dueDistances + this._dueToolbarHeight);
		this._dueToolbarHeight = 0;

		return h;
	},
	
	_getWidthInPixels: function(w)
	{
		if (w.substr(w.length - 1, 1) == '%')
		{
			var mapElement = dojo.byId(this.divId);
			var widthPercentageStr = w.substr(0, w.length - 1);
			var availableHorRegion = parseInt(dijit.getViewport().w - this._getMapOffsetLeft());
			var widthPercentage = parseInt(widthPercentageStr);
			var width = (availableHorRegion * (widthPercentage / 100.0));
			width -= 15;
			return parseInt(("" + width).match(/\d+/) || 0);//
		}
		else
		{
			return parseInt(("" + w).match(/\d+/) || 0);//
		}
	},

	getCurrentRecordSetControl: function()
	{
		return this.currentRecordSetControl;
	},
	destroyRecursive: function()
	{
		this.userSessionManager.onMapExit();
		this.map.endPan.removeHandler(this.maximo.resetMaximoTimeout, this.maximo);
		if (this.markerRefresher)
		{
			this.markerRefresher.destroyRecursive();
			this.markerRefresher = null;
		}
		if (this.routeManager)
		{
			this.routeManager.destroyRecursive();
		}
		if (this.getMapstraction() != null)
		{
			this.destroyMap();
		}
		if (this.maximo)
		{
			this.maximo.destroyRecursive();
		}
		if (this.geocoder)
		{
			this.geocoder.destroyRecursive();
		}
		if (this.currentRecordSetControl)
		{
			this.currentRecordSetControl.destroyRecursive();
		}
		if (this.currentRecordMgr)
		{
			this.currentRecordMgr.destroyRecursive();
		}
		if (this.contextMenu)
		{
			this.contextMenu.destroyRecursive();
		}
		if (this.maptips)
		{
			this.maptips.destroyRecursive();
		}
		if (this.toolbar)
		{
			this.toolbar.destroyRecursive();
		}
		if (this.fullScreenHelper)
		{
			this.fullScreenHelper.destroyRecursive();
		}
		if (this.layersManager)
		{
			this.layersManager.destroyRecursive();
		}
		this.inherited(arguments);
	},
	destroyMap: function()
	{
		throw "To be implemented by provider";
	},

	fullScreenOn: function()
	{
		this.fullScreenHelper.fullScreenModeOn();
	},
	fullScreenOff: function()
	{
		this.fullScreenHelper.fullScreenModeOff();
	},
	getWidthInPixels: function()
	{
		var w = this.width;
		if (!this.width)
		{
			w = '100%';
		}
		this.widthPx = this._getWidthInPixels(w);
		return this.widthPx;

	},
	getHeightInPixels: function()
	{
		return this.heightPx;
	},
	/**
	 * If we failed to retrieve user location. The possible errors are:<br>
	 * code 1 - Permission denied, user did not allow to share his location<br>
	 * code 2 - Position unavailable, the position of the device could not be
	 * determined<br>
	 * code 3 - Timeout, device took too long (longer than the timeout
	 * specified) to return current location<br>
	 * code 4 - Geolocation not supported, this device does not support
	 * geolocation, this is a custom error code<br>
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html#permission_denied_error
	 * @param error:
	 *            {code,message}
	 */
	failedToGetLocation: function()
	{
		var maximo = this.getMaximo();
		var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
		switch (myLocationInstance.getStatus())
		{
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
				maximo.showMessage("map", "curr_loc_perm_denied");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
				maximo.showMessage("map", "curr_loc_timeout");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
				maximo.showMessage("map", "curr_loc_position_unavailable");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
				maximo.showMessage("map", "curr_loc_not_supported");
				break;
			default:
				maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
		}
		;
	},
	failedToGetLocationStatusMessages: function()
	{
		var maximo = this.getMaximo();
		var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
		switch (myLocationInstance.getStatus())
		{
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
				maximo.showMessage("map", "curr_loc_perm_denied_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
				maximo.showMessage("map", "curr_loc_timeout_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
				maximo.showMessage("map", "curr_loc_position_unavailable_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
				maximo.showMessage("map", "curr_loc_not_supported_statusmsg");
				break;
			default:
				maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
		}
		;
	},
	getLayersManager: function()
	{
		return this.layersManager;
	},
	_checkMapLoadedCorrectly: function()
	{
		// this is to allow async map services loading to check for errors.
	},
	/* mboInfo:{mxdata,gisdata,autolocatedata,lbsdata} */
	handlerMapping: {
		"onMoveEnd": "dragend"
	},
	centerOnMbo: function(mboInfo, zoomlevel)
	{
		var localgisdata = mboInfo.gisdata;
		if (mboInfo.autolocate != null)
		{
			localgisdata = mboInfo.autolocate.gisdata;
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("Center on  ", mboInfo.mxdata.mboName, localgisdata.lat, localgisdata.lng);
			console.log("Is autolocated ", mboInfo.autolocate != null);
		}
		var point = new mxn.LatLonPoint(localgisdata.lat, localgisdata.lng);

		if (mboInfo.gisdata.islbs == true)
		{
			point.sr = mxn.util.getWGS84WKID();
			var auxFct = function(/* array of projected points */points)
			{
				this._centerOnPoint(points[0], zoomlevel);
			};
			this.getMapstraction().getAllPointsFromWGS84([ point ], dojo.hitch(this, auxFct));
		}
		else
		{
			this._centerOnPoint(point, zoomlevel);
		}

	},
	_centerOnPoint: function(cp, zoomlevel)
	{

		if (zoomlevel)
		{
			this.getMapstraction().setCenterAndZoom(cp, zoomlevel);
		}
		else
		{
			this.getMapstraction().setCenter(cp);
		}

	},
	/*
	 * Removes the given MBO's marker from the map
	 */
	removeMboMarker: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			if (!layerId)
			{
				layerId = this.layersManager.getLayerIdForMbo(mboInfo);
				this.layersManager.removeRecord(mboInfo);
			}
			else
			{
				this.removeMboMarkerFromMap(mboInfo, layerId);
			}

		}
		else
		{
			console.warn("There was no marker for ", mboInfo);
		}
	},
	/*
	 * Removes the MBO from the map
	 */
	removeMboMarkerFromMap: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			console.log("[%% mxmap.Map.removeMboMarkerFromMap]", layerId, " mbo=" + mboInfo.mxdata.mboName + "," + mboInfo.mxdata.uid.value + " removing marker");
			info.isOnMap = false;
			this.getMapstraction().removeMarker(info.marker);
			if (info.lbsCircle || info.lbsMarker)
			{
				this.getMapstraction().removePolyline(info.lbsCircle);
				this.getMapstraction().removeMarker(info.lbsMarker);
			}
			info = {};
		}
		else
		{
			console.warn("no marker for ", mboInfo);
		}
	},
	/*
	 * If the given MBO has been previously added to the map, show its marker
	 * using the stored marker options.
	 */
	showMboMarker: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			info.isOnMap = true;
			this.addMboMarker(mboInfo, info.markerOptions, layerId);
		}
	},
	/*
	 * Adds the MBO to its default layer (based on type).
	 */
	addMboToLayerManager: function(mboInfo, markerOptions)
	{
		this.layersManager.addRecord(mboInfo, markerOptions);
	},
	/*
	 * Removes the MBO from its default layer (based on type).
	 */
	removeMboFromLayerManager: function(mboInfo)
	{
		this.layersManager.removeRecord(mboInfo);
	},
	/*
	 * Adds a reference to the given MBO, and if this is the first reference
	 * also creates a marker for it using the given marker options.
	 */
	addMboMarker: function(mboInfo, options, layerId)
	{
		var localgisdata = mboInfo.gisdata;
		if (mboInfo.autolocate != null)
		{
			localgisdata = mboInfo.autolocate.gisdata;
		}

		// console.log("Adding ", mboInfo.mxdata.mboName, localgisdata.lat,
		// localgisdata.lng);
		// console.log("Is autolocated ", mboInfo.autolocate != null);

		var point = new mxn.LatLonPoint(localgisdata.lat, localgisdata.lng);
		if (localgisdata.islbs == true)
		{
			// must be sure to conver the WGS point into the current coord
			// system
			point.sr = mxn.util.getWGS84WKID();
			var succFct = function(pointInCurrentSR)
			{
				this._createMarker(mboInfo, options, pointInCurrentSR[0], layerId);
			};
			var errFct = function(err)
			{
				console.error("Error converting point to current SR", err);
			};

			this.getMapstraction().getAllPointsFromWGS84([ point ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));

		}
		else
		{
			this._createMarker(mboInfo, options, point, layerId);
		}

	},
	/*
	 * Creates a marker in the map for the given MBO, with the given marker
	 * options, in the given point.
	 */
	_createMarker: function(mboInfo, options, point, layerId)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[Map._createMarker] Beginning");
		}
		var marker = new mxn.Marker(point);
		if (options && options.events)
		{
			for ( var eventName in options.events)
			{
				var eventFtc = options.events[eventName];
				var mapstractioEventName = this.handlerMapping[eventName];
				marker[mapstractioEventName].addHandler(eventFtc);
			}
		}

		var draggable = true;
		if (mboInfo.gisdata.flags.readonly == true)
		{
			draggable = false;
		}
		else if (this.isMapViewOnly() == true)
		{
			draggable = false;
		}
		else if (options && options.draggable)
		{
			draggable = options.draggable;
		}

		if (mboInfo.gisdata.islbs == true && mboInfo.lbsdata && mboInfo.gisdata.lat != null)
		{
			var accuracyMarker = this._addLBSAccuracyMarker(mboInfo.lbsdata, point);
			var circle = this._addLBSAccuracyCircle(mboInfo.lbsdata, point);

			this._updateMboMarkerHash(mboInfo, {
				lbsMarker: accuracyMarker,
				lbsCircle: circle
			}, layerId);

		}
		var color = options ? options.color : "#ffffff";
		var symbol = this.getSymbologyManager().getLegendForObject(mboInfo, color);
		var icon = symbol.url;
		var tooltip = "";
		if (options && options.tooltip)
		{
			tooltip = options.tooltip;
		}

		var markerdata = {
			infoBubble: "FWMMAPTIPS",
			label: null,
			tooltip: tooltip,
			marker: 4,
			icon: icon,
			iconSize: [ symbol.width, symbol.height ],
			iconAnchor: [ symbol.offsetx, symbol.offsety ],
			draggable: draggable,
			hover: false
		};
		if (options != null)
		{
			markerdata.label = options.label;
			markerdata.hover = options.hover;
		}
		this.getMapstraction().addMarkerWithData(marker, markerdata);
		console.log("[mxmap.Map._createMarker] mbo=" + mboInfo.mxdata.mboName + "," + mboInfo.mxdata.uid.value + " creating marker");

		this.getMapTipsManager().enableMarker(marker, mboInfo.mxdata);

		this._updateMboMarkerHash(mboInfo, {
			isOnMap: true,
			marker: marker,
			markerOptions: options
		}, layerId);
		if (options && options.markerReferenceCallback)
		{
			try
			{
				options.markerReferenceCallback(marker);
			}
			catch (e)
			{
				console.error("cannot call reference ftc", e);
			}
		}
	},
	/*
	 * Stores a reference for the given MBO with the given options. If a
	 * reference already exists, updates all of its properties with the given
	 * ones.
	 */
	_updateMboMarkerHash: function(mboInfo, opt, layerId)
	{
		return this.layersManager.setMboMarkerInfo(mboInfo, opt, layerId);
	},
	/*
	 * Returns the stored info for the given MBO.
	 */
	_getMboMarkerInfo: function(mboInfo, layerId)
	{
		return this.layersManager.getMboMarkerInfo(mboInfo, layerId);
	},
	/**
	 * in order to place several markers at once, can improve performance by
	 * using this method
	 */
	showAllMboRecords: function(mboInfoArray, options, zoom)
	{
		if (!mboInfoArray || mboInfoArray.length == 0)
		{
			return;
		}
		for ( var index in mboInfoArray)
		{
			this.addMboToLayerManager(mboInfoArray[index]);
		}
		if (zoom == true)
		{
			this.zoomToMbos(mboInfoArray);
		}

	},
	/**
	 * Forces zoom to cover all the current records on the map.
	 */
	zoomToMbos: function(mboInfoArray)
	{
		if (!mboInfoArray || mboInfoArray.length == 0)
		{
			return;
		}
		if (mboInfoArray && mboInfoArray.length == 1)
		{
			this.centerOnMbo(mboInfoArray[0]);
		}
		else
		{
			this.map.autoCenterAndZoom();
		}
	},
	_addLBSAccuracyCircle: function(lbsdata, point)
	{
		console.log("LBS", lbsdata, lbsdata.max_accuracy_state);
		if ("EXCEEDED_TOLERANCE" !== lbsdata.max_accuracy_state)
		{
			var circle = new mxn.Radius(point, 10);
			var radiusInKms = (lbsdata.location_accuracy / 1000);
			var lbsCircle = circle.getPolyline(radiusInKms, "#C6DBEB");
			this.getMapstraction().addPolylineWithData(lbsCircle, {
				centerPoint: point,
				width: 3,
				opacity: 0.5,
				fillColor: "#D0E0EC",
				closed: true,
				radiusInKMs: radiusInKms
			});
		}
		else
		{
			console.log("accuracy exceeded tolerance");
		}
		return lbsCircle;
	},
	_addLBSAccuracyMarker: function(lbsdata, point)
	{
		var accuracyMarker = new mxn.Marker(point);
		var accuracyMarkerInfo = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getLBSMarkerImageInfo(lbsdata);
		var markerdata2 = {
			infoBubble: "",
			label: null,// nothing specified in spec.
			marker: 4,
			icon: accuracyMarkerInfo.getImageURL(),
			iconSize: accuracyMarkerInfo.getImageSize(),
			iconAnchor: accuracyMarkerInfo.getImageAnchor(),
			draggable: false,
			hover: false
		};
		this.getMapstraction().addMarkerWithData(accuracyMarker, markerdata2);
		return accuracyMarker;
	},
	enableTraffic: function()
	{
		this.getMapstraction().toggleTraffic(true);
	},
	disableTraffic: function()
	{
		this.getMapstraction().toggleTraffic(false);
	},
	enableRoutes: function()
	{
		if (this.getMultipleRoutesManager())
		{
			this.getMultipleRoutesManager().showRoutesAndCalculatedMarkers();
		}
	},
	disableRoutes: function()
	{
		this.getMultipleRoutesManager().hideRoutesAndCalculatedMarkers();
	},
	disableActions: function()
	{
		this._actionsAreEnabled = false;
	},

	enableActions: function()
	{
		this._actionsAreEnabled = true;
	},
	isMapViewOnly: function()
	{
		var confs = this.mapConf.inputConfs;
		if (confs != null && confs.mapviewonly != null)
		{
			return confs.mapviewonly == "1" || confs.mapviewonly == "true";
		}
		// map default is read only
		return true;
	},
	allowsTrafficLayer: function()
	{
		return true;
	},
	getDefaultLengthUnit: function()
	{
		return this.mapConf.lengthunit;
	},
	/**
	 * when map is ina section and it just got expanded we force map to refresh
	 * its data.
	 */
	_mapSectionExpanded: function()
	{
		this.enableActions();
		var showdirectionsonload = false;
		if (this.routeConf && this.routeConf.showdirectionsonload == true)
		{
			showdirectionsonload = true;
		}
		// this.refreshRoute(true, showdirectionsonload);
		// Issue 12-13542. The line below shouldn't have been commented out.
		this._resize();
		var refreshOptions = {
				zoom: true,
				disableMsgs: false,
				automatic: false
			};
		this.refreshMap(refreshOptions);
		if (this._sectionExpaded == false)
		{
			this.centerAndZoomMap();
			this._sectionExpaded = true;
		}
	},
	getInitialLocationCustomInfo: function()
	{
		return {};
	},
	autoRefreshMap: function()
	{
		var refreshOptions = {
			zoom: false,
			disableMsgs: true,
			automatic: true
		};
		this.refreshMap(refreshOptions);
	},
	_getMapOffsetLeft: function()
	{
		var mapDiv = dojo.byId(this.divId);
		return mapDiv.offsetLeft;
	}

});

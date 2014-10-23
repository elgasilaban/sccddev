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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
/**
 * This is the implementation of Map.js for Maximo Spatial maps.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial", ibm.tivoli.fwm.mxmap.Map, {

	constructor: function(options)
	{
		this.providerName = "maximospatial";
		this._alreadyFixedStartingMboZoom = false;

	},
	/**
	 * MaximoSpatial does not support traffic layer
	 */
	allowsTrafficLayer: function()
	{
		return false;
	},
	/**
	 * There may be some spatial specific configurations
	 */
	_getCustomInitOptions: function()
	{
		if (this.customInitialMapOptions)
		{
			return this.customInitialMapOptions.spatial;
		}
		log.info("no custom configuration");
		return {};
	},
	// check if there is a valid configuration
	createMap: function(options)
	{
		if (!options.mapConf.SPATIAL)
		{
			console.error("no spatial conf");
			this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
			this.getMaximo().showMessage("mapcontrol", "nospatialmapconf");

		}
		else
		{
			var spatialConf = options.mapConf.SPATIAL;
			if (spatialConf.bingMaps != true && spatialConf.openStreetMap != true && (spatialConf.mapservices == null || spatialConf.mapservices.length == 0))
			{
				this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
				this.getMaximo().showMessage("plussmap", "no_mapservices_configured");
			}
			else
			{
				this.inherited(arguments);
			}
		}
	},
	/**
	 * Loads the initial options for the mapstraction map creation.<Br>
	 * Returns the route url service, geocode url service, initial extent and
	 * specific spatial conf.
	 */
	_getInitOptions: function()
	{

		var options = {
			route: this.mapConf.route,
			geocode: this.mapConf.geocode,
			initialExtent: this._getInitialLocation(),
			lastUserLocationData: this.userSessionManager.getLastUserLocation(),
			spatial: this.mapConf.SPATIAL,
			isMobile: this.isMobile,
			defaultLenUnit: this.getDefaultLengthUnit()
		};

		return options;
	},

	_getDefaultInitialLocation: function()
	{
		return {};
	},
	/**
	 * Returns the geocode configuration url
	 */
	getGeoCoderConf: function()
	{
		var options = {
			url: this.mapConf.geocode
		};
		return options;
	},
	/**
	 * destroys map implementation
	 */
	destroyMap: function()
	{
		console.log("destroying map!");
		try
		{
			var map = this.getMapstraction();

			if (typeof (map) != 'undefined' && map != null)
			{
				map.destroyMap();
			}
		}
		catch (e)
		{
			console.error("cannot destroy spatial maps", e.message);
		}
		console.log("map was destroyed!");
	},
	/**
	 * Esri maps is compound of several mapservices. Some of them may fail to
	 * load but the map can be used. Code tolerates failures but at the end
	 * shows a message with all mapservices that failed to load.
	 */
	_checkMapLoadedCorrectly: function()
	{
		var _failedLayers = this.getMapstraction().getFailedLayers();
		if (_failedLayers && _failedLayers.length > 0)
		{
			// plussmap,failed_loading_layer
			console.log("_failedLayers", _failedLayers);
			var params = [ _failedLayers[0].name, _failedLayers[0].error.message ];
			// we use the same maximo spatial message.
			this.getMaximo().showMessage("plussmap", "failed_loading_layer", params);
		}
	},
	/**
	 * In order to support Linked records we need to intercept the center on mbo
	 * to not only rely on X/Y but also on Featureclasses.
	 */
	centerOnMbo: function(mboInfo, zoomlevel)
	{
		var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
		if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
		{
			var fct = function(args)
			{
				try
				{
					var point = this._updateMboInfo(mboInfo, args);
					this._centerOnPoint(point, zoomlevel);
				}
				catch (e)
				{
					console.error("No feature found to zoom over!", args, e);
				}
			};
			if (spatialAutolocate == true)
			{
				this._queryMapsServiceForMboGeometry(mboInfo.autolocate, dojo.hitch(this, fct));
			}
			else
			{
				this._queryMapsServiceForMboGeometry(mboInfo, dojo.hitch(this, fct));
			}
		}
		else
		{
			this.inherited(arguments);
		}

	},
	/**
	 * Based on a esri feature this method converts it on a mxn.LatLonPoint
	 * 
	 * @param feature
	 * @returns
	 */
	_getLatLngFromFeature: function(feature)
	{
		if (!feature)
		{
			console.error("feature is empty", feature);
			return null;
		}
		var geometry = feature.geometry;
		var point = feature.geometry;
		if (geometry.type != 'point')
		{
			point = geometry.getExtent().getCenter();
		}
		var lng = point.x;
		var lat = point.y;

		var point = new mxn.LatLonPoint(lat, lng);
		return point;
	},
	/**
	 * Returns the layer info for a mboname/featureclass mapping.
	 * 
	 * @param mboName
	 * @param featureclassName
	 * @returns {Array}
	 */
	_getMboObjectLayers: function(mboName, featureclassName)
	{
		var conf = this.mapConf.SPATIAL;
		var layerInfo = [];
		for ( var i in conf.linkableInfo)
		{
			var service = conf.linkableInfo[i];
			for ( var j in service.layers)
			{
				var layer = service.layers[j];
				if (layer.parent == mboName && layer.child == featureclassName)
				{
					layerInfo.push({
						url: service.url + "/" + layer.layerId,
						layer: layer

					});

				}
			}
		}
		return layerInfo;
	},
	/**
	 * Checks if mbo does not have a x/y but has a feature class (is linked)
	 * 
	 * @param mboInfo
	 * @returns {Boolean}
	 */
	_isBasedOnSpatial: function(mboInfo)
	{
		return (mboInfo && mboInfo.gisdata && mboInfo.gisdata.PLUSSISGIS == true) || (mboInfo && mboInfo.gisdata && mboInfo.gisdata.FROMFC == true);
	},
	/**
	 * Checks if this mbo is autolocated by an entity that has a featureclass
	 * (is linked)
	 * 
	 * @param mboInfo
	 * @returns
	 */
	_isAutolocateBasedOnSpatial: function(mboInfo)
	{
		if (this._isBasedOnSpatial(mboInfo) == false)
		{
			return this._isBasedOnSpatial(mboInfo.autolocate);
		}
		return false;
	},
	/**
	 * Based on a mbo it can retrieve the mxn.LatLngPoint based on a cached
	 * feature. Used by Routing.
	 * 
	 * @param mboInfo
	 * @returns
	 */
	getPointFromMboInfo: function(mboInfo)
	{
		var point = this._getLatLngFromFeature(mboInfo.FC);
		return point;
	},
	/**
	 * When we are able to load the feature classes of a mbo we cache this
	 * information to not have to query the service again next time.
	 * 
	 * @param mboInfo
	 * @param args
	 * @param callback
	 * @returns
	 */
	_updateMboInfo: function(mboInfo, queryResultInfo, callback)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("updatemboinfo", mboInfo, queryResultInfo);
		}
		if (queryResultInfo.features && queryResultInfo.features[0])
		{
			var retFC = queryResultInfo.features[0];
			var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
			if (dojo.config.fwm.debug == true)
			{
				console.log("Success", queryResultInfo);
			}
			if (spatialAutolocate == true)
			{
				mboInfo.autolocate.FC = retFC;
				mboInfo.autolocate.FROMFC = true;
			}
			else
			{
				mboInfo.FC = retFC;
				mboInfo.FROMFC = true;
			}
			var point = this._getLatLngFromFeature(retFC);
			return point;
		}
		else
		{
			console.error("no feature found!", queryResultInfo);
			throw "no feature found!";
		}

	},
	/**
	 * check if this is a SPATIAL feature class mbo that is linked
	 */
	addMboMarker: function(mboInfo, options, layerId)
	{

		var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
		if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
		{
			// add SPATIAL logic to get coordinates.
			var fct = function(queryResultInfo)
			{
				try
				{
					var point = this._updateMboInfo(mboInfo, queryResultInfo);
					this._createMarker(mboInfo, options, point, layerId);
				}
				catch (e)
				{
					console.error("No feature found!", queryResultInfo, e);
				}
			};
			if (spatialAutolocate == true)
			{
				this._queryMapsServiceForMboGeometry(mboInfo.autolocate, dojo.hitch(this, fct));
			}
			else
			{
				this._queryMapsServiceForMboGeometry(mboInfo, dojo.hitch(this, fct));
			}

		}
		else
		{
			this.inherited(arguments);
		}
	},
	_getLayerMappingForMbo: function(mboInfo)
	{
		var layerInfoData = this._getMboObjectLayers(mboInfo.mxdata.mboName, mboInfo.mxdata.attributes.plussfeatureclass);

		if (!layerInfoData || layerInfoData.length == 0)
		{
			// tries with the extendsMboName (in case of views)
			layerInfoData = this._getMboObjectLayers(mboInfo.mxdata.extendsMboName, mboInfo.mxdata.attributes.plussfeatureclass);
			if (!layerInfoData || layerInfoData.length == 0)
			{
				console.error("no layer mapping info for this mbo", mboInfo.mxdata.extendsMboName, mboInfo.mxdata.attributes.plussfeatureclass, mboInfo);
				return;
			}
		}
		if (layerInfoData.length > 1)
		{
			console.warn("more than one layer mapping ", mboInfo.mxdata.mboName, mboInfo.mxdata.attributes.plussfeatureclass, layerInfoData);
		}
		return layerInfoData;
	},
	/**
	 * Based on a mboinfo it queries for its feature class based on the
	 * MaximoSpatial configuration between the Mbo and the feature classe
	 * (gisobject)
	 * 
	 * @param mboInfo
	 * @param callback
	 * @param errCb
	 */
	_queryMapsServiceForMboGeometry: function(mboInfo, callback, errCb)
	{
		// if it's cached
		if (mboInfo.FROMFC == true)
		{
			callback({
				features: [ mboInfo.FC ]
			});
			return;
		}

		// tries first with the mboName
		var layerInfoData = this._getLayerMappingForMbo(mboInfo);
		if (layerInfoData)
		{
			this._getMBOGeometry(layerInfoData, [ mboInfo ], callback, errCb);
		}
		else
		{
			console.error("No layer info");
			if (errCb)
			{
				errCb();
			}
		}

	},
	_checkIfAnyFeaturedClass: function(recs)
	{
		for ( var i in recs)
		{
			var stop = recs[i];
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});

			if (mxrec.hasSPATIALCoordinates() || (mxrec.hasGISCoordinates() == false && mxrec.hasAutolocateSpatialData() == true))
			{
				return true;
			}
		}
	},
	showAllMboRecords: function(records, markerOptions, zoom)
	{
		if (!records || records.length == 0)
		{
			return;
		}
		var callback = function(mboInfoArray, totalErrors)
		{
			console.log("calledback", mboInfoArray, totalErrors);
			for ( var index in records)
			{
				var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: records[index],
					map: this
				});
				if (mxRec.hasAnyGISCoordinates() == true)
				{
					// this.map.addMboToLayerManager(this.mboInfo,
					// markerOptions);
					this.addMboToLayerManager(records[index], markerOptions);
				}
				else
				{
					console.warn("Mbo with no GIS info ", records[index]);
				}
			}
			if (zoom == true)
			{
				this.map.autoCenterAndZoom();
			}
		};
		if (this._checkIfAnyFeaturedClass(records) == true)
		{
			this.queryMultipleRecordsAtOnce(records, dojo.hitch(this, callback), dojo.hitch(this, callback));
		}
		else
		{
			dojo.hitch(this, callback)([]);

		}
	},
	filterRecordsInMapView: function(mboArray, callback, errCb)
	{
		var esriMap = this.map.maps["maximospatial"];
		this.queryMultipleRecordsAtOnce(mboArray, callback, errCb, esriMap.extent);
	},
	queryMultipleRecordsAtOnce: function(mboArray, callback, errCb, onRegionGeometry)
	{

		var queryHash = {};
		var totalUrls = 0;
		for ( var i = 0; i < mboArray.length; i++)
		{
			var mboInfo = mboArray[i];
			var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
			if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
			{
				var refMbo = mboInfo;
				if (spatialAutolocate == true)
				{
					refMbo = mboInfo.autolocate;
				}
				console.log("mbo ", mboInfo);
				var layerInfoData = this._getLayerMappingForMbo(refMbo);
				if (!layerInfoData)
				{
					console.error("No layer info");
					if (errCb)
					{
						errCb();
					}
					return;
				}
				for ( var j = 0; j < layerInfoData.length; j++)
				{
					if (queryHash[layerInfoData[j].url] == null)
					{
						totalUrls++;
						queryHash[layerInfoData[j].url] = {
							info: layerInfoData[j],
							refMbos: [],
							mbos: []
						};
					}
					queryHash[layerInfoData[j].url].refMbos.push(refMbo);
					queryHash[layerInfoData[j].url].mbos.push(mboInfo);
				}
			}
		}
		var allInRange = [];
		var totalErrors = [];
		var accumulate = function(url, mbos, error)
		{
			totalUrls--;
			console.log("accumulate", url, mbos, error, totalUrls);
			allInRange = allInRange.concat(mbos);
			totalErrors.push({
				error: error,
				url: url
			});
			if (totalUrls == 0)
			{
				callback(allInRange, totalErrors);
			}
		};
		for ( var layerURL in queryHash)
		{
			this.queryAndCache(layerURL, queryHash, dojo.hitch(this, accumulate), onRegionGeometry);

		}

	},

	queryAndCache: function(layerURL, queryHash, callback, regionGeometry)
	{
		var layerInfoData = queryHash[layerURL].info;
		console.log("URL ", layerURL, layerInfoData);

		var matchFCAttributeNames = layerInfoData.layer.linkableColumns;
		var matchMBOAttributeNames = layerInfoData.layer.mboColumns;
		var queryTask, query;
		queryTask = new esri.tasks.QueryTask(layerURL);
		query = new esri.tasks.Query();
		query.returnGeometry = true;
		if (regionGeometry != null)
		{
			query.geometry = regionGeometry;
		}
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
		query.outFields = [ '*' ];
		query.where = this._createWhereClause(queryHash[layerURL].refMbos, matchFCAttributeNames, matchMBOAttributeNames);

		console.log(query.where);
		var fct = function(args)
		{
			var refMbos = queryHash[layerURL].refMbos;
			console.log("args", args, refMbos, layerURL);
			var aliases = {};
			for ( var ii in matchFCAttributeNames)
			{
				for ( var kk in args.fieldAliases)
				{
					var alias = args.fieldAliases[kk];
					if (alias == matchFCAttributeNames[ii])
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
					else if (kk == matchFCAttributeNames[ii])
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
					else if (kk.search("\." + matchFCAttributeNames[ii]) != -1)
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
				}

			}
			var mbos = [];
			for ( var l = 0; l < args.features.length; l++)
			{
				var feature = args.features[l];
				// find mbo

				var mbo = this._getRefMboOfFeature(refMbos, feature.attributes, matchFCAttributeNames, matchMBOAttributeNames, aliases);
				if (!mbo)
				{
					console.log("cannot find the mbo reference for feature", feature);
					console.log("in mbos ", refMbos);
				}
				var whereClause = this._createWhereClause([ mbo ], matchFCAttributeNames, matchMBOAttributeNames);
				console.log("wclause was ", whereClause);
				console.log("for         ", mbo);
				var _arg = {
					features: [ feature ]
				};
				this._updateQueryResultCache(layerURL, whereClause, _arg);
				mbos.push(mbo);
				mbo.FC = feature;
				mbo.FROMFC = true;

			}
			callback(layerURL, mbos);
		};
		var errfct = function(error)
		{
			console.error("Error querying", error);
			callback(layerURL, [], error);
		};
		queryTask.execute(query, dojo.hitch(this, fct), dojo.hitch(this, errfct));
	},

	_getRefMboOfFeature: function(_refMbos, attributes, matchFCAttributeNames, matchMBOAttributeNames, aliases)
	{
		for ( var k = 0; k < _refMbos.length; k++)
		{
			var m = _refMbos[k];
			console.log("mm ", m, aliases);
			var match = false;
			for ( var ii in matchFCAttributeNames)
			{
				var fcAttr = matchFCAttributeNames[ii];
				console.log(matchMBOAttributeNames[ii].toLowerCase());
				console.log(fcAttr, aliases[fcAttr], attributes[aliases[fcAttr]]);
				if (m.mxdata.attributes[matchMBOAttributeNames[ii].toLowerCase()] == attributes[aliases[fcAttr]])
				{
					console.log("found mbo for feature", fcAttr, aliases[fcAttr], matchMBOAttributeNames[ii].toLowerCase(), m.mxdata.attributes[matchMBOAttributeNames[ii].toLowerCase()],
							attributes[aliases[fcAttr]]);
					match = true;
				}
				else
				{
					match = false;
					break;
				}
			}
			if (match == true)
			{
				return m;
			}
		}
	},
	_getMBOGeometry: function(layerInfoData, mboInfoArray, callback, errCb, index)
	{
		if (!index)
		{
			index = 0;
		}
		var layerURL = layerInfoData[index].url;
		var matchFCAttributeNames = layerInfoData[index].layer.linkableColumns;
		var matchMBOAttributeNames = layerInfoData[index].layer.mboColumns;
		var queryTask, query;
		queryTask = new esri.tasks.QueryTask(layerURL);
		query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outFields = []; // no field needed
		query.where = this._createWhereClause(mboInfoArray, matchFCAttributeNames, matchMBOAttributeNames);
		if (dojo.config.fwm.debug == true)
		{
			console.info('getting mbo with query', query.where);
			console.info('On layer ', layerURL);
		}
		var whereClause = query.where;
		if (this._isInCache(layerURL, query.where) == true)
		{
			callback(this._queryCache[layerURL][query.where].results);
			return;
		}

		if (this._hasRequestedAlready(layerURL, query.where) == true)
		{
			this._updateRequestCache(layerURL, query.where, callback, errCb);
			return;
		}
		this._updateRequestCache(layerURL, query.where, callback, errCb);
		var fct = function(args)
		{
			if (!args.features || !args.features[0])
			{
				index++;
				if (index < layerInfoData.length)
				{
					console.log("trying next layer", index);
					this._getMBOGeometry(layerInfoData, mboInfo, callback, errCb, index);
				}
				else
				{
					var err = {
						errormsg: "no feature found for '" + whereClause + "' on " + layerURL,
						details: {
							whereClause: whereClause,
							layerURL: layerURL,
							layerInfoData: layerInfoData
						}
					};
					this._triggerQueryResultError(layerURL, whereClause, args, err);
				}
			}
			else
			{
				this._updateQueryResultCache(layerURL, whereClause, args);

				while (this._queryRequestCache[layerURL][whereClause].reqs.length > 0)
				{
					if (dojo.config.fwm.debug == true)
					{
						console.log("Calling reqs", this._queryRequestCache[layerURL][whereClause].reqs.length);
					}
					var ff = this._queryRequestCache[layerURL][whereClause].reqs.pop();
					ff.success(args);
				}
			}

		};
		var errfct = function(args)
		{
			console.log("Error querying for spatial feature class", args);
			var err = {
				errormsg: "Error querying for spatial feature class"
			};
			this._triggerQueryResultError(layerURL, whereClause, args, err);

		};
		queryTask.execute(query, dojo.hitch(this, fct), dojo.hitch(this, errfct));
	},

	_createWhereClause: function(mboInfoArray, matchFCAttributeNames, matchMBOAttributeNames)
	{
		console.log(mboInfoArray);
		var query = "";
		for ( var j = 0; j < mboInfoArray.length; j++)
		{
			var mboInfo = mboInfoArray[j];
			var queryForOneMbo = "";
			for ( var i = 0; i < matchFCAttributeNames.length; i++)
			{
				var strAdd = '\'';
				var attr = matchFCAttributeNames[i];
				var value = mboInfo.mxdata.attributes[matchMBOAttributeNames[i].toLowerCase()];
				if (isNaN(value))
				{
					value = value.split("'").join("''");
				}

				// Replace single apostrophes for double apostrophes
				if (value.length == 0)
				{
					queryForOneMbo += attr + ' is null AND '; // empty strings
					// from
					// Maximo are null in the database
				}
				else
				{
					if (isNaN(value))
					{
						queryForOneMbo += attr + '=' + strAdd + value + strAdd + ' AND ';
					}
					else
					{
						queryForOneMbo += attr + '=' + value + ' AND ';
					}
				}
			}
			if (queryForOneMbo.length > 0)
			{
				queryForOneMbo = queryForOneMbo.substr(0, queryForOneMbo.length - 5);
				if (query.length > 0)
				{
					query += " OR ";
				}
				query += "(";
				query += queryForOneMbo;
				query += ")";
			}
			else
			{
				console.error("no matching attributes", mboInfo, matchFCAttributeNames, matchMBOAttributeNames);
			}

		}
		return query;
	},
	/**
	 * Checks if we have the results in cache
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @return true if it's in cache
	 */
	_isInCache: function(layerURL, whereClause)
	{
		if (this._queryCache[layerURL])
		{
			if (this._queryCache[layerURL][whereClause])
			{
				if ((this._queryCache[layerURL][whereClause]._timestamp - new Date().getTime()) < this._expiringCache)
				{
					this._queryCache[layerURL][whereClause]._hitTimes++;
					console.log("Cache hit!", this._queryCache[layerURL][whereClause]._hitTimes);
					return true;
				}
				else
				{
					console.info("expiring cahce for " + whereClause);
					this._queryCache[layerURL][whereClause] = null;
				}
			}
		}
		return false;
	},
	/**
	 * Updates the cache for query results
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @param results
	 */
	_updateQueryResultCache: function(layerURL, whereClause, results)
	{
		if (!this._queryCache[layerURL])
		{
			this._queryCache[layerURL] = {};
		}
		this._queryCache[layerURL][whereClause] = {
			results: results,
			_hitTimes: 0,
			_timestamp: new Date().getTime()
		};
	},
	/**
	 * Buffer sequenced requests
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @param callback
	 * @param errCb
	 */
	_hasRequestedAlready: function(layerURL, whereClause)
	{
		if (this._queryRequestCache[layerURL] && this._queryRequestCache[layerURL][whereClause] != null)
		{
			return true;
		}
		return false;
	},
	_updateRequestCache: function(layerURL, whereClause, callback, errCb)
	{
		if (!this._queryRequestCache[layerURL])
		{
			this._queryRequestCache[layerURL] = {};
		}
		if (!this._queryRequestCache[layerURL][whereClause])
		{
			this._queryRequestCache[layerURL][whereClause] = {
				reqs: []
			};
		}
		this._queryRequestCache[layerURL][whereClause].reqs.push({
			success: callback,
			error: errCb
		});
	},
	/**
	 * If any requests where buffered we need to trigger the error callback
	 */
	_triggerQueryResultError: function(layerURL, whereClause, args, err)
	{
		while (this._queryRequestCache[layerURL][whereClause].reqs.length > 0)
		{
			var ff = this._queryRequestCache[layerURL][whereClause].reqs.pop();
			if (ff.error)
			{
				ff.error(err, args);
			}
			else
			{
				console.log(err);
			}
		}
	},
	_queryCache: {},
	_queryRequestCache: {},
	_expiringCache: 30000,
	getInitialLocationCustomInfo: function()
	{
		var esriMap = this.map.maps["maximospatial"];
		return {
			extentData: {
				wkid: esriMap.spatialReference.wkid,
				wkt: esriMap.spatialReference.wkt,
				xmin: esriMap.extent.xmin,
				xmax: esriMap.extent.xmax,
				ymax: esriMap.extent.ymax,
				ymin: esriMap.extent.ymin

			}
		};
	},
	_setDefaultLocation: function(location)
	{
		var esriMap = this.map.maps["maximospatial"];
		if (esriMap.extentInitiallySet != true)
		{
			this.inherited(arguments);
		}
	},
	_resize: function()
	{
		// Spatial API is increasing the map width for some reason,
		// and create scrolling if width=100%. Width will have to be
		// reset to a smaller value.
		if (!this.width)
		{
			w = '99%';
		}
		else
		{
			if (this.width.indexOf('%') > -1)
			{
				var _w = parseInt(this.width.substr(0, this.width.length - 1));
				if (_w > 99)
				{
					this.width = '99%';
				}
			}
		}

		this.inherited(arguments);
	},
	_alreadyFixedStartingMboZoom: null,
	_zoomToCurrentMboRec: function(initialLocation)
	{
		if (this._alreadyFixedStartingMboZoom != true)
		{
			var handler;
			var counter = 0;
			var fct = dojo.hitch(this, function()
			{
				counter++;
				if (this.map.state.updating != true || counter > 100)
				{
					this.currentRecordMgr.centerAndZoom(initialLocation.level);
				}
				else
				{
					setTimeout(fct, 300);
				}
				dojo.unsubscribe(handler);
			});
			var h2;
			var addListener = dojo.hitch(this, function()
			{
				dojo.unsubscribe(h2);
				handler = dojo.subscribe("onESRIReposition", fct);
			});
			h2 = dojo.subscribe(this.events.mapLoaded, addListener);
		}
		this.inherited(arguments);

	}

});
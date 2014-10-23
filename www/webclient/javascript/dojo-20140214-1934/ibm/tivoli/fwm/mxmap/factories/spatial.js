//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/factories/spatial", ["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/MaximoSpatial"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.spatial");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial");
/**
 * Factory to load MaximoSpatial Esri's js api
 */
ibm.tivoli.fwm.mxmap.factories.spatial = ({
	/**
	 * After we load the google maps javascripts this method is called.
	 */
	loaded: false,
	apiLoaded: function()
	{

		ibm.tivoli.fwm.mxmap.factories.spatial.loaded = true;
		esri.config.defaults.io.proxyUrl = dojo.config.fwm.ctxRoot + '/webclient/pluss/proxy.jsp';

		console.log('Maximo Spatial Maps API is now available');
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial", "spatial");
	},
	/**
	 * method to be overriden by all map factory implementation
	 * 
	 * @param options
	 */
	init: function(options)
	{
		var localapi = false;
		if (options.mapConf.SPATIAL && options.mapConf.SPATIAL.localApi)
		{
			localapi = true;
		}
		this._loadJSApi(options.mapConf.key, options.mapConf.https, options.isMobile, localapi);
	},
	/**
	 * this method loads the google maps api and the mapstraction js for google.
	 */
	_loadJSApi: function(key, https, isMobile, localApi)
	{
		this.isMobile = isMobile;
		this.localApi = localApi;
		this.protocol = 'http';

		if (window.location.protocol=="https:")//spatial does not have db config for https. It propagates whatever maximo is using.
		{
			this.protocol = 'https';
		}

		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/pluss/com/esri/solutions/jsviewer/themes/spatial/mxmap.css", "css");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/pluss/com/esri/solutions/jsviewer/themes/spatial/override.css", "css");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.geocoder.js", "js");

		ibm.tivoli.fwm.mxmap.factories.spatial.initDojo(ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded);
	},
	localApi: false,
	isMobile: false,
	protocol: 'http',
	initDojo: function(fct)
	{

		if (window.esri == null)
		{
			if (window.djConfig == null)
			{
				window.djConfig = dojo.config;
			}
			window.djConfig.scopeMap = [ [ "dojo", "esriDojoNew" ], [ "dijit", "esriDijitNew" ], [ "dojox", "esriDojoxNew" ] ];

			var mobileString = '';
			if (this.isMobile)
			{ // need to append 'compact' to the url in case of a everyplace
				// application, to use esri mobile api
				mobileString = 'compact';
				console.info("compact version being used");
			}

			var url = this.protocol + '://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.8' + mobileString;

			if (this.localApi)
			{
				url = dojo.config.fwm.ctxRoot + '/webclient/javascript/pluss/arcgis_js_index.jsp?apiPath=arcgis_js_api/library/2.8/jsapi' + mobileString + '/';
			}

			dojo.io.script.get({
				url: url,
				timeout: 30000,
				error: function()
				{
					console.error('Failed to load esri js apis');
					alert('Failed to load esri js api');
				}
			});
		}

		ibm.tivoli.fwm.mxmap.factories.spatial.fcc = fct;
		ibm.tivoli.fwm.mxmap.factories.spatial.waiter();
	},
	waiter: function()
	{
		if (!window.esri)
		{
			setTimeout("ibm.tivoli.fwm.mxmap.factories.spatial.waiter()", 300);
		}
		else
		{

			try
			{

				// This is only executed after the dojo from ESRI API is loaded.
				if (this.isMobile)
				{
					esriDojoNew.require("esri.toolbars.draw");
					esriDojoNew.require("esri.toolbars.edit");
					esriDojoNew.require("esri.toolbars.navigation");
					esriDojoNew.require("esri.tasks.identify");
					esriDojoNew.require("esri.tasks.query");
					esriDojoNew.require("esri.tasks.geometry");
					esriDojoNew.require("esri.virtualearth.VETiledLayer");
					esriDojoNew.require("esri.virtualearth.VEGeocoder");
				}

				// loading it here to always work. On MaximoSpatialMxn.js
				// sometimes it does not load
				esriDojoNew.require("esri.dijit.Scalebar");
				esriDojoNew.require("esri.dijit.OverviewMap");
				esriDojoNew.require("esri.map");

				esriDojoNew.addOnLoad(ibm.tivoli.fwm.mxmap.factories.spatial.fcc);
			}
			catch (e)
			{
				console.log("Failed to load compact api", e);
			}
		}

	},
	apiPooler: function()
	{

		try
		{
			if (window.esri != null)
			{
				ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded();
				return;
			}
		}
		catch (e)
		{
			console.log("Error loading spatial api", e);
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("loaded", ibm.tivoli.fwm.mxmap.factories.spatial.loaded);
		}
		if (ibm.tivoli.fwm.mxmap.factories.spatial.loaded != true)
		{
			setTimeout("ibm.tivoli.fwm.mxmap.factories.spatial.apiPooler()", 500);
		}
		else
		{
			ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded();
		}
	}
});
});

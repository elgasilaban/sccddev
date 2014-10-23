//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/factory", ["dijit","dojo","dojox","dojo/require!dojo/io/script"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factory");
dojo.require("dojo.io.script");
/**
 * This js loads a factory for the provider and after it's instantiated it
 * creates the map.
 */
ibm.tivoli.fwm.mxmap.stack = {};
ibm.tivoli.fwm.mxmap.factory = {
	events: {
		mapImplLoaded: "mxmap.mapImplLoaded"
	},
	options: null,
	initialized: false,
	tries: 10,
	registry: {},
	/**
	 * In IE we need to first load MXN standard files and only after we can load
	 * the other ones. Otherwise IE will break complaining MXN object is not
	 * defined.
	 */
	ieWait: function()
	{
		ibm.tivoli.fwm.mxmap.factory.tries--;
		if (ibm.tivoli.fwm.mxmap.factory.tries > 0)
		{
			ibm.tivoli.fwm.mxmap.factory.init();
		}
		else
		{
			throw "Cannot load MXN...";
		}
	},
	/**
	 * Loads the core Mapstraction javascripts
	 */
	init: function()
	{
		// must be loaded first otherwise it breaks the other
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.js", "js");

		console.log("[Factory] is Ie?", (dojo.isIE != null));
		if (dojo.isIE)
		{
			if (!window.mxn)
			{
				console.log("waiting...");
				setTimeout("ibm.tivoli.fwm.mxmap.factory.ieWait()", 100);
				return;
			}
		}
		// if(dojo.config.fwm.debug==true || dojo.config.debugAtAllCosts==true){
		// try {
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/Map.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/actions/SetRecordLocation.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/MXRecord.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/MaximoIntegration.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/ContextMenu.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/Geocoder.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/InfoWindow.js", "js");
		//			
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/toolbar/ToolbarManager.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/routing/Router.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/CurrentMXRecManager.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/CurrentMXRecordSet.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/routing/impl/spatial.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.core.js",
		// "js");
		//			
		//			
		// } catch (e) {
		// // the above section is just for debugging.
		// }
		// }
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.geocoder.js", "js");

		this.initialized = true;
		console.log("[Factory] Initiated factory");
	},

	/**
	 * This method creates the provider implementation and triggers its
	 * createMap method
	 */
	createMap: function(options)
	{
		console.log("[Factory] Component ID: " + options.compId);
		console.log("[Factory] Is error in Map Configuration? " + options.mapConf.error);
		if (options.mapConf.error && options.mapConf.error == true)
		{
			console.log("[Factory] Options.mapConf.key: ", options.mapConf.key);
			addCommInput('msgKey', options.mapConf.key);
			addCommInput('msgGroup', options.mapConf.group);
			sendEvent('showErrors', options.compId, options.mapConf.key);
			return;
		}
		if (this.initialized != true)
		{
			this.init();
		}

		if (this.mapExists(options.compId))
		{
			console.log("[Factory]  Map exists, destroying", options.compId);
			this.destroyCurrentMap(options.compId);
		}

		var providerName = options.mapConf.provider;
		if (!this.loaded[providerName])
		{
			ibm.tivoli.fwm.mxmap.stack[providerName] = [];
			ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
			this.loaded[providerName] = -1;
			var providerImplFactory = "ibm.tivoli.fwm.mxmap.factories." + providerName;

			var reqStr = "dojo." + "require('" + providerImplFactory + "')"; // breaking
																				// up
																				// dojo.
																				// and
																				// require
																				// necessary
																				// to
																				// fool
																				// the
																				// dojo
																				// parser!

			dojo.eval(reqStr);
			this.options = options;
			//DONT CHANGE FOR DOJO.EVAL!!
			eval(providerImplFactory + ".init(this.options)");
			console.log("[Factory]  Provider initiated.");
		}
		else
		{

			if (this.loaded[providerName] == -1)
			{
				console.log("[Factory] Api is NOT loaded, queueing options");
				ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
			}
			else
			{
				console.log("[Factory] Api is loaded");
				dojo.publish(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded, [ this.loaded[providerName], providerName ]);
				this._createProviderMap(options, this.loaded[providerName]);
			}
		}

	},
	mapExists: function(compId)
	{

		return this.registry[compId] && this.registry[compId].currentMap;
	},
	destroyCurrentMap: function(compId)
	{
		console.log("[Factory] Destroying map", compId, this.registry[compId]);
		try
		{
			if (this.registry[compId] && this.registry[compId].currentMap)
			{
				this.registry[compId].currentMap.destroyRecursive();
			}
		}
		catch (e)
		{
			console.log("[Factory]  Could not destroy", e);
		}
		this.registry[compId] = null;
	},
	loaded: {},
	/**
	 * When the provider api is initializes this method is called.
	 */
	apiInitialized: function(mapImpl, provider)
	{
		console.log("[Factory] Loaded: ", mapImpl, provider);
		this.loaded[provider] = mapImpl;
		dojo.publish(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded, [ mapImpl, provider ]);
		this.executeStack(mapImpl, provider);
	},
	executeStack: function(mapImpl, provider)
	{
		if (ibm.tivoli.fwm.mxmap.stack[provider])
		{
			var queuedRequest = ibm.tivoli.fwm.mxmap.stack[provider];

			for ( var id in queuedRequest)
			{
				var options = queuedRequest[id];
				this._createProviderMap(options, mapImpl);
			}
		}
	},
	_createProviderMap: function(options, mapImpl)
	{
		console.log("[Factory] Create: ", mapImpl, options);
		var instance = null;
		eval("this._instance = new " + mapImpl + "();");
		instance = this._instance;
		console.log("[Factory] Instance: ", instance);
		instance.createMap(options);
		this.registry[options.compId] = {
			currentMap: instance
		};
	}

};
});

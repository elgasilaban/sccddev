//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/ConfigHelper", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/doh/MaximoMockImpl"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh.ConfigHelper");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.doh.MaximoMockImpl');
ibm.tivoli.fwm.doh.ConfigData = {
	maps: [ "Gmaps", "Bingmaps", "Spatial dynamic map", "Spatial cached map", "Spatial openstreetmaps", "Spatial bingmaps" ]
};
// ibm.tivoli.fwm.doh.ConfigData={maps:["Spatial cached map"]};
var isBidiEnabled = false;
dojo.declare("ibm.tivoli.fwm.doh.ConfigHelper", null, {
	conf: null,
	mapProvider: null,
	constructor: function(params)
	{
		this.getInitialConf();
		this.mapProvider = params.mapProvider;
		switch (params.mapProvider)
		{
			case "Gmaps":
				this.setGMaps();
				break;
			case "Spatial dynamic map":
				this.setSpatialMapsDynamic();
				break;
			case "Spatial cached map":
				this.setSpatialMapsCached();
				break;
			case "Spatial openstreetmaps":
				this.setSpatialMapsOSM();
				break;
			case "Spatial bingmaps":
				this.setSpatialBingMaps();
				break;
			case "Bingmaps":
				this.setBingMaps();
				break;

			default:
				break;
		}
		this.conf.mapConf.symbologyConfig = {
			layers: [ {
				id: "workorder",
				label: "a",
				labelGroup: "a",
				labelKey: "b",
				symbologies: [ {

					id: "fwm_default",
					label: "wo",
					labelGroup: "a",
					labelKey: "b",
					legendTitle: "le",
					legendTitleGroup: "",
					legendTitleKey: "",
					symbologyTitle: "",
					symbologyTitleGroup: "a",
					symbologyTitleKey: "a",
					legends: [ {
						id: "fwm_default",
						label: "a",
						labelGroup: "a",
						labelKey: "b",
						symbol: {
							color: "",
							offsetx: 11,
							offsety: 36,
							height: 36,
							width: 36,
							url: "../../ibm/tivoli/fwm/mxmap/resources/symbology/map_default_marker.png"
						}
					} ]

				} ]

			}, {
				id: "locations",
				label: "locations",
				labelGroup: "a",
				labelKey: "b",
				symbologies: [ {

					id: "fwm_default",
					label: "a",
					labelGroup: "a",
					labelKey: "b",
					legendTitle: "le",
					legendTitleGroup: "",
					legendTitleKey: "",
					symbologyTitle: "",
					symbologyTitleGroup: "a",
					symbologyTitleKey: "a",
					legends: [ {
						id: "fwm_default",
						label: "a",
						labelGroup: "a",
						labelKey: "b",
						symbol: {
							color: "",
							offsetx: 11,
							offsety: 36,
							height: 36,
							width: 36,
							url: "../../ibm/tivoli/fwm/mxmap/resources/symbology/map_default_marker.png"
						}
					} ]

				} ]

			}, {
				id: "others",
				label: "a",
				labelGroup: "a",
				labelKey: "b",
				symbologies: [ {

					id: "fwm_default",
					label: "a",
					labelGroup: "a",
					labelKey: "b",
					legendTitle: "le",
					legendTitleGroup: "",
					legendTitleKey: "",
					symbologyTitle: "",
					symbologyTitleGroup: "a",
					symbologyTitleKey: "a",
					legends: [ {
						id: "fwm_default",
						label: "a",
						labelGroup: "a",
						labelKey: "b",
						symbol: {
							color: "",
							offsetx: 11,
							offsety: 36,
							height: 36,
							width: 36,
							url: "../../ibm/tivoli/fwm/mxmap/resources/symbology/map_default_marker.png"
						}
					} ]

				} ]

			} ]
		};
		window.sendEvent = this.sendEvent;
		window.resetLogoutTimer = this.resetLogoutTimer;
		window.REQUESTTYPE = 1;

	},
	resetLogoutTimer: function()
	{
		console.log("timer reset");
	},
	sendEvent: function(arg1, arg2, arg3)
	{
		console.warn("captured sendevent", arg1, arg2, arg3);
		console.trace();
	},
	getInitialConf: function()
	{
		this.conf = {
			"compId": "mx7503_mapcontrol",
			"divId": "test_mapdiv_maps",
			// tests purposes
			"isTesting": true,
			"maximoImpl": new ibm.tivoli.fwm.doh.MaximoMockImpl(),
			"mapConf": {
				"https": false,
				"sessionData": {},
				"initialLocation": {
					"level": 10.0,
					"lng": -23.0,
					"lat": -43.0
				},
				"provider": null,
				"currentMbo": null,
				"inputConfs": this.getInputConfs(),
				"contextPersistence": true,
				"mapViewOnly": false,
				"action": "showMBOLocation",
				"zoomToDataInput": true,
				"records": [],
				"isMobile": false,
				"routeConf": {
					hasRoute: false
				},
				"width": "300px",
				"height": "300px"

			}
		};
	},
	getInputConfs: function()
	{
		return {

			"markerimgurl": null,
			"dataattribute": null,
			"toolbarenabled": "1",
			"routeendx": null,
			"showdirectionsonload": null,
			"routeendy": null,
			"initialy": null,
			"hidelabel": "false",
			"inputmode": null,
			"initialx": null,
			"id": "mxmap_section_div",
			"routestartx": null,
			"routedatasrc": null,
			"mapoptions": "{bingmaps:{},gmaps:{},spatial:{}}",
			"height": "100%",
			"routecolor": "#0000FF",
			"synchronous": "false",
			"licensekey": "FWM_FWM",
			"zoomtodatainput": "1",
			"startwithcurrentlocation": null,
			"fullscreenmode": "0",
			"mapviewonly": "0",
			"toolitems": null,
			"width": "100%",
			"sigoption": null,
			"label": "Map",
			"datasrc": "MAINRECORD",
			"routestarty": null,
			"refreshmapinterval": null,
			"zoomlevel": null,
			"beanclass": null,
			"optimizeroute": null,
			"contextpersistent": "1",
			"sigoptiondatasrc": null

		};
	},
	setBingMaps: function()
	{
		this.conf.mapConf.provider = "bingmaps";
		this.conf.mapConf.key = "AnTWFGEWAfcOu65V3sExt6Z3zuFe8EQm2NZAMWIbASt_QcvApGD6-o7DLCERsx5R";

	},
	setGMaps: function()
	{
		this.conf.mapConf.provider = "gmaps";

	},
	setSpatialMapsOSM: function()
	{
		this.conf.mapConf.provider = "spatial";
		this.conf.mapConf.geocode = "http://tasks.arcgisonline.com/ArcGIS/rest/services/Locators/TA_Address_NA_10/GeocodeServer";

		this.conf.mapConf.route = "http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route";
		this.conf.mapConf.SPATIAL = {
			"mapInfo": {
				"siteID": "BEDFORD",
				"mapName": "1001"
			},
			"geometryService": {
				"name": "Geometry",
				"url": "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
			},
			"bingMaps": false,
			"mapservices": [],
			"openStreetMap": true
		};
	},
	setSpatialBingMaps: function()
	{
		this.conf.mapConf.provider = "spatial";
		this.conf.mapConf.geocode = "http://tasks.arcgisonline.com/ArcGIS/rest/services/Locators/TA_Address_NA_10/GeocodeServer";

		this.conf.mapConf.route = "http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route";
		this.conf.mapConf.SPATIAL = {
			"mapInfo": {
				"siteID": "BEDFORD",
				"mapName": "1001"
			},
			"geometryService": {
				"name": "Geometry",
				"url": "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
			},
			"bingMaps": true,
			"bingMapsKey": "AnTWFGEWAfcOu65V3sExt6Z3zuFe8EQm2NZAMWIbASt_QcvApGD6-o7DLCERsx5R",
			"mapservices": [],
			"openStreetMap": false
		};
	},
	setSpatialMapsCached: function()
	{
		this.conf.mapConf.provider = "spatial";
		this.conf.mapConf.geocode = "http://tasks.arcgisonline.com/ArcGIS/rest/services/Locators/TA_Address_NA_10/GeocodeServer";

		this.conf.mapConf.route = "http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route";
		this.conf.mapConf.SPATIAL = {
			"mapInfo": {
				"siteID": "BEDFORD",
				"mapName": "1001"
			},
			"geometryService": {
				"name": "Geometry",
				"url": "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
			},
			"bingMaps": false,
			"mapservices": [ {
				"id": "1",
				"transparency": "1.0",
				"order": "0",
				"name": "usa",
				"visibleLayers": [ "all" ],
				"url": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer"
			} ],
			"openStreetMap": false
		};

	},
	setSpatialMapsDynamic: function()
	{
		this.conf.mapConf.provider = "spatial";
		this.conf.mapConf.geocode = "http://tasks.arcgisonline.com/ArcGIS/rest/services/Locators/TA_Address_NA_10/GeocodeServer";

		this.conf.mapConf.route = "http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route";
		this.conf.mapConf.SPATIAL = {
			"mapInfo": {
				"siteID": "BEDFORD",
				"mapName": "1001"
			},
			"geometryService": {
				"name": "Geometry",
				"url": "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
			},
			"bingMaps": false,
			"mapservices": [ {
				"id": "1",
				"transparency": "1.0",
				"order": "0",
				"name": "usa",
				"visibleLayers": [ "all" ],
				"url": "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/MapServer"
			} ],
			"linkableInfo": [ {
				"url": "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/MapServer",
				"layers": [ {
					"layerId": 4,
					"parent": "WORKORDER",
					"child": "INCIDENTING",
					"linkableColumns": [ "FID" ],
					"mboColumns": [ "FEATUREID" ]

				} ]
			} ],
			"openStreetMap": false
		};

	},
	setSessionData: function(sdata)
	{
		this.conf.mapConf.sessionData = sdata;
	},
	buildMap: function(callback)
	{
		var ddd;
		if (dojo.byId("testBody").className == "tabBody")
		{
			dojo.empty(dojo.byId("testBody"));
			var tb = dojo.create('div', {
				id: "testBody"
			}, dojo.query(".tabBody")[0]);
			ddd = dojo.create('div', {
				id: "mapSection"
			}, tb);
		}
		else
		{
			ddd = dojo.byId("mapSection");
		}
		var mdom = dojo.create("div", {
			id: this.conf.divId
		}, ddd);
		var h1;
		var cb = function(mapObj)
		{
			dojo.unsubscribe(h1);
			window.mxmap = mapObj;
			var h;
			var fct = function(nativeMap, mapId, map)
			{
				console.info("************ Map loaded", nativeMap, mapId, map);
				var f = function()
				{
					// passes the map and the mapstraction
					callback(nativeMap, mapId, map);
				};
				dojo.unsubscribe(h);				
				setTimeout(f, "1000");
			};
			h = dojo.subscribe("mxmap.mapLoaded", fct);
			
		};

		h1 = dojo.subscribe(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded, dojo.hitch(this, cb));
		
		ibm.tivoli.fwm.mxmap.factory.createMap(this.conf);
	},
	destroyMap: function()
	{
		console.log("destroyMap!", this.conf.compId);
		ibm.tivoli.fwm.mxmap.factory.destroyCurrentMap(this.conf.compId);
	},
	getDefaultMboSet: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.cached_defaultMboset;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.defaultMboset;
	},
	getDefaultLocation: function()
	{

		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.cached_defaultLocation;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.defaultLocation;
	},
	getDefaultCurrMbo: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.cached_defautMainRecord;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord;
	},
	getLinkedCurrMbo: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord_linked;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord_linked;
	},
	getAutolocatedCurrMbo: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.cached_autolocatedMainRecord;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.autolocatedMainRecord;
	},

	getDefautGisData: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return {

				"flags": {
					"readonly": false
				},
				"address": "dfaerger, Brazil",
				"lng": -12271506.269011926,
				"lat": 4234305.6188845355

			};
		}
		return {
			lat: 37.774637,
			"flags": {
				"readonly": false
			},
			lng: -122.420606,
			address: ""
		};
	},
	getDefaultRouteConf: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.defaultRouteConf;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.defaultRouteConf;
	},

	getRouteConfWithStartAndEnd: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithStartAndEnd;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithStartAndEnd;
	},

	getRouteConfWithCurrLocAndInvalidEndPoint: function()
	{
		if (this.mapProvider == "Spatial cached map")
		{
			return ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithCurrLocAndInvalidEndPoint;
		}
		return ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithCurrLocAndInvalidEndPoint;
	}
});

ibm.tivoli.fwm.doh.ConfigHelper.cached_defaultMboset = [ {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 2
		},
		"mboInfo": {
			"ADDRESSCODE": "1002",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "Cameroon",
		"lng": -4740318.74613228,
		"lat": -1978801.7882460733
	}
}, {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 3
		},
		"mboInfo": {
			"ADDRESSCODE": "1003",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "S\u00e3o Gabriel da Cachoeira, Brazil",
		"lng": -13010193.710359834,
		"lat": 4266103.422651167
	}
}, {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 4
		},
		"mboInfo": {
			"ADDRESSCODE": "1004",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "Santo Ant\u00f4nio do Leverger, Brazil",
		"lng": -12271506.269011926,
		"lat": 4234305.6188845355
	}
} ];

ibm.tivoli.fwm.doh.ConfigHelper.defaultMboset = [ {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 2
		},
		"mboInfo": {
			"ADDRESSCODE": "1002",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "Cameroon",
		"lng": 15.8234759653,
		"lat": 3.0085973472
	}
}, {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 3
		},
		"mboInfo": {
			"ADDRESSCODE": "1003",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "S\u00e3o Gabriel da Cachoeira, Brazil",
		"lng": -69.2546490347,
		"lat": 0.5490349957
	}
}, {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 4
		},
		"mboInfo": {
			"ADDRESSCODE": "1004",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "Santo Ant\u00f4nio do Leverger, Brazil",
		"lng": -55.1921490347,
		"lat": -16.446884109
	}
} ];

ibm.tivoli.fwm.doh.ConfigHelper.cached_defaultLocation = {
	"lng": -12271506.269011926,
	"lat": 4234305.6188845355,
	"level": 2
};
ibm.tivoli.fwm.doh.ConfigHelper.defaultLocation = {
	"level": 10.0,
	"lng": -122.4200,
	"lat": 37.7700
};
ibm.tivoli.fwm.doh.ConfigHelper.cached_defautMainRecord = {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 1
		},
		"mboInfo": {
			"ADDRESSCODE": "1001",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "",
		"lng": null,
		"lat": null
	}
};
ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord_linked = {
	"mxdata": {
		"uid": {
			"name": "WOID",
			"value": 12
		},
		"mboInfo": {
			"WONUM": "1001",
			"SITEID": "BEDFORD",
			"ORGID": "EAGLENA"
		},
		"attributes": {
			"featureid": 1,
			"plussigis": true,
			"plussfeatureclass": "INCIDENTING",
			"wonum": "1001",
			"siteid": "BEDFORD",
			"orgid": "EAGLENA"
		},
		"mboName": "WORKORDER"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"PLUSSISGIS": true,
		"address": "",
		"lng": null,
		"lat": null
	}
};
ibm.tivoli.fwm.doh.ConfigHelper.defautMainRecord = {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 1
		},
		"mboInfo": {
			"ADDRESSCODE": "1001",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "",
		"lng": null,
		"lat": null
	}
};

ibm.tivoli.fwm.doh.ConfigHelper.cached_autolocatedMainRecord = {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 1
		},
		"mboInfo": {
			"ADDRESSCODE": "1001",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "",
		"lng": null,
		"lat": null
	},
	"autolocate": {
		"mxdata": {
			"uid": {
				"name": "SERVICEADDRESSID",
				"value": 4
			},
			"mboInfo": {
				"ADDRESSCODE": "1004",
				"ORGID": "EAGLENA"
			},
			"mboName": "SERVICEADDRESS"
		},
		"gisdata": {
			"flags": {
				"readonly": false
			},
			"address": "Santo Ant\u00f4nio do Leverger, Brazil",
			"lng": -12271506.269011926,
			"lat": 4234305.6188845355

		}
	}

};

ibm.tivoli.fwm.doh.ConfigHelper.autolocatedMainRecord = {
	"mxdata": {
		"uid": {
			"name": "SERVICEADDRESSID",
			"value": 1
		},
		"mboInfo": {
			"ADDRESSCODE": "1001",
			"ORGID": "EAGLENA"
		},
		"mboName": "SERVICEADDRESS"
	},
	"gisdata": {
		"flags": {
			"readonly": false
		},
		"address": "",
		"lng": null,
		"lat": null
	},
	"autolocate": {
		"mxdata": {
			"uid": {
				"name": "SERVICEADDRESSID",
				"value": 4
			},
			"mboInfo": {
				"ADDRESSCODE": "1004",
				"ORGID": "EAGLENA"
			},
			"mboName": "SERVICEADDRESS"
		},
		"gisdata": {
			"flags": {
				"readonly": false
			},
			"address": "Santo Ant\u00f4nio do Leverger, Brazil",
			"lng": -55.1921490347,
			"lat": -16.446884109
		}
	}

};

ibm.tivoli.fwm.doh.ConfigHelper.defaultRouteConf = {
	"start": {
		"lng": null,
		"name": "start",
		"lat": null
	},
	"showdirectionsonload": null,
	"startwithcurrentlocation": "false",
	"routecolor": "#0000FF",
	"end": {
		"lng": null,
		"name": "end",
		"lat": null
	},
	"optimizeroute": null,
	"hasRoute": true
};

ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithStartAndEnd = {
	"start": {
		"lng": -118.3858645042,
		"name": "start",
		"lat": 33.9525020000
	},
	"showdirectionsonload": null,
	"startwithcurrentlocation": "false",
	"routecolor": "#0000FF",
	"end": {
		"lng": -118.3439540863,
		"name": "end",
		"lat": 33.9670765664
	},
	"optimizeroute": null,
	"hasRoute": true
};

ibm.tivoli.fwm.doh.ConfigHelper.routeConfWithCurrLocAndInvalidEndPoint = {
	"start": {
		"lng": null,
		"name": "start",
		"lat": null
	},
	"showdirectionsonload": null,
	"startwithcurrentlocation": "true",
	"routecolor": "#0000FF",
	"end": {
		"lng": -118.7010649788,
		"name": "end",
		"lat": 33.8397409637
	},
	"optimizeroute": null,
	"hasRoute": true
};

ibm.tivoli.fwm.doh.ConfigHelper.validRoute = {
	"stops": [ {
		"mxdata": {
			"uid": {
				"value": 4,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1003",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.2511566031",
		"gisdata": {
			"address": "561 S Spring St, Los Angeles, CA 90013, USA",
			"lng": -118.2511566031,
			"flags": {
				"readonly": false
			},
			"lat": 34.0463318459
		},
		"name": "SERVICEADDRESS:4",
		"lat": "34.0463318459"
	}, {
		"mxdata": {
			"uid": {
				"value": 5,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1004",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.4986782154",
		"gisdata": {
			"address": "1401 Palisades Beach Rd, Santa Monica, CA 90401, USA",
			"lng": -118.4986782154,
			"flags": {
				"readonly": false
			},
			"lat": 34.013371126
		},
		"name": "SERVICEADDRESS:5",
		"lat": "34.013371126"
	} ],
	"hasRoute": true
};

ibm.tivoli.fwm.doh.ConfigHelper.routeWithOnlyOneStop = {
	"stops": [ {
		"mxdata": {
			"uid": {
				"value": 4,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1003",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.2511566031",
		"gisdata": {
			"address": "561 S Spring St, Los Angeles, CA 90013, USA",
			"lng": -118.2511566031,
			"flags": {
				"readonly": false
			},
			"lat": 34.0463318459
		},
		"name": "SERVICEADDRESS:4",
		"lat": "34.0463318459"
	} ],
	"hasRoute": true
};

ibm.tivoli.fwm.doh.ConfigHelper.routeWithInvalidStop = {
	"stops": [ {
		"mxdata": {
			"uid": {
				"value": 4,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1003",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.2511566031",
		"gisdata": {
			"address": "561 S Spring St, Los Angeles, CA 90013, USA",
			"lng": -118.2511566031,
			"flags": {
				"readonly": false
			},
			"lat": 34.0463318459
		},
		"name": "SERVICEADDRESS:4",
		"lat": "34.0463318459"
	}, {
		"mxdata": {
			"uid": {
				"value": 5,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1004",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.4986782154",
		"gisdata": {
			"address": "1401 Palisades Beach Rd, Santa Monica, CA 90401, USA",
			"lng": -118.4986782154,
			"flags": {
				"readonly": false
			},
			"lat": 34.013371126
		},
		"name": "SERVICEADDRESS:5",
		"lat": "34.013371126"
	}, {
		"mxdata": {
			"uid": {
				"value": 6,
				"name": "SERVICEADDRESSID"
			},
			"mboName": "SERVICEADDRESS",
			"mboInfo": {
				"ADDRESSCODE": "1005",
				"ORGID": "EAGLENA"
			}
		},
		"lng": "-118.7010649788",
		"gisdata": {
			"address": "",
			"lng": -118.7010649788,
			"flags": {
				"readonly": false
			},
			"lat": 33.8397409637
		},
		"name": "SERVICEADDRESS:6",
		"lat": "33.8397409637"
	} ],
	"hasRoute": true
};

});

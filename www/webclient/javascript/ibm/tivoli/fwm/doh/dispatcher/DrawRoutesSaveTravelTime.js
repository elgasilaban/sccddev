dojo.provide("ibm.tivoli.fwm.doh.dispatcher.DrawRoutesSaveTravelTime");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh.dispatcher.DrawRoutes');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");
dojo.require("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager");

dojo.declare("ibm.tivoli.fwm.doh.dispatcher.DrawRoutesSaveTravelTime", [ ibm.tivoli.fwm.doh.dispatcher.DrawRoutes ], {
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.name = "Draw and save travel time";
		dojo.subscribe("SAVEBULKTRAVELTIME", dojo.hitch(this, this.serverHandler));
	},

	// WITH PROBLEM
	// disp.drawAllRoutes([{"stops":[{"startTime":1338195600000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":null},{"startTime":1338204600000,"mxdata":{"uid":{"name":"WORKORDERID","value":1965},"mboInfo":{"WONUM":"BOSA1159","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":1965,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSA1159","worktype":"PM","wopriority":9}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"Distribution
	// Center Cir, Littleton, MA 01460,
	// USA","lng":-71.5119157226,"PLUSSISGIS":false,"lat":42.5478708766},"routedata":{"ASSIGNMENTID":"314","TOLOCATIONSID":null,"FROMLOCATIONSID":"455","SLROUTEID":"112","HASTRAVELTIME":true,"TRAVELTIME_SECS":420,"FROMASSIGNMENT":null}},{"startTime":1338210000000,"mxdata":{"uid":{"name":"WORKORDERID","value":1966},"mboInfo":{"WONUM":"BOSA1161","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":1966,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSA1161","worktype":"CAL","wopriority":12}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"97
	// Snake Hill Rd, Ayer, MA 01432,
	// USA","lng":-71.5587456,"PLUSSISGIS":false,"lat":42.5550647},"routedata":{"ASSIGNMENTID":"315","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"112","HASTRAVELTIME":true,"TRAVELTIME_SECS":360,"FROMASSIGNMENT":"314"}},{"startTime":1338219000000,"mxdata":{"uid":{"name":"WORKORDERID","value":1967},"mboInfo":{"WONUM":"BOSA1162","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":1967,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSA1162","worktype":"CM","wopriority":6}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"78
	// School Ln, Westford, MA 01886,
	// USA","lng":-71.4661577,"PLUSSISGIS":false,"lat":42.5933368},"routedata":{"ASSIGNMENTID":"316","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"112","HASTRAVELTIME":true,"TRAVELTIME_SECS":840,"FROMASSIGNMENT":"315"}},{"startTime":1338224400000,"mxdata":{"uid":{"name":"WORKORDERID","value":1968},"mboInfo":{"WONUM":"BOSA1163","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":1968,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSA1163","worktype":"","wopriority":2}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"Campinas
	// - S\u00e3o Paulo,
	// Brazil","lng":-47.0632391,"PLUSSISGIS":false,"lat":-22.9071048},"routedata":{"ASSIGNMENTID":"317","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"112","HASTRAVELTIME":true,"TRAVELTIME_SECS":60,"FROMASSIGNMENT":"316"}},{"startTime":1338228000000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":{"ASSIGNMENTID":null,"TOLOCATIONSID":"455","FROMLOCATIONSID":null,"SLROUTEID":"112","HASTRAVELTIME":true,"TRAVELTIME_SECS":720,"FROMASSIGNMENT":"317"}}],"color":"1C29A8","resource":{"GISABLE":true,"RESDESCRIPTION":"Earl
	// Henry","LBSINTERVAL":"30","FWMTYPE":"LABOR","id":"LABOR:BOSHENRY","FWMRESKEY":"BOSHENRY","LATITUDEY":42.5414395111,"_LABORSHIFTNUM":"DAY","RESID":"BOSHENRY","LABORCODE":"BOSHENRY","name":"BOSHENRY","quantity":1.0,"_REFOBJECTNAME":"LABOR","LONGITUDEX":-71.5488530902}},
	// {"stops":[{"startTime":1338195600000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":null},{"startTime":1338201900000,"mxdata":{"uid":{"name":"WORKORDERID","value":1982},"mboInfo":{"WONUM":"BOSA1206","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":1982,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSA1206","worktype":"PM","wopriority":5}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"24
	// Lawrence St, Littleton, MA 01460,
	// USA","lng":-71.4976246352,"PLUSSISGIS":false,"lat":42.5591550229},"routedata":{"ASSIGNMENTID":"330","TOLOCATIONSID":null,"FROMLOCATIONSID":"455","SLROUTEID":"113","HASTRAVELTIME":true,"TRAVELTIME_SECS":240,"FROMASSIGNMENT":null}},{"startTime":1338228000000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":{"ASSIGNMENTID":null,"TOLOCATIONSID":"455","FROMLOCATIONSID":null,"SLROUTEID":"113","HASTRAVELTIME":true,"TRAVELTIME_SECS":240,"FROMASSIGNMENT":"330"}}],"color":"567531","resource":{"GISABLE":true,"RESDESCRIPTION":"Overhead
	// Line Crew
	// 1","LBSINTERVAL":"30","AMCREW":"BOSOHL1","FWMTYPE":"AMCREW","id":"AMCREW:BOSOHL1","FWMRESKEY":"BOSOHL1","LATITUDEY":42.5606612273,"_LABORSHIFTNUM":"DAY","RESID":"BOSOHL1","name":"BOSOHL1","quantity":1.0,"_REFOBJECTNAME":"LABOR","LONGITUDEX":-71.4969255236}}],"drawRouteCallback","onRouteError");
	// TRAVELTIME
	// dispatcher.drawAllRoutes([{"stops":[{"startTime":1338282000000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":null},{"startTime":1338291119000,"mxdata":{"uid":{"name":"WORKORDERID","value":2015},"mboInfo":{"WONUM":"BOSB1158","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2015,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1158","worktype":"EM","wopriority":1}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"407
	// Newtown Rd, Littleton, MA 01460,
	// USA","lng":-71.4597129342,"PLUSSISGIS":false,"lat":42.5271675293},"routedata":{"ASSIGNMENTID":"358","TOLOCATIONSID":null,"FROMLOCATIONSID":"455","SLROUTEID":"115","HASTRAVELTIME":false,"FROMASSIGNMENT":null}},{"startTime":1338298200000,"mxdata":{"uid":{"name":"WORKORDERID","value":2013},"mboInfo":{"WONUM":"BOSB1156","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2013,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1156","worktype":"EV","wopriority":4}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"25
	// Boxboro Rd, Littleton, MA 01460,
	// USA","lng":-71.4756774423,"PLUSSISGIS":false,"lat":42.5083151367},"routedata":{"ASSIGNMENTID":"357","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"115","HASTRAVELTIME":false,"FROMASSIGNMENT":"358"}},{"startTime":1338303600000,"mxdata":{"uid":{"name":"WORKORDERID","value":2029},"mboInfo":{"WONUM":"BOSB1177","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2029,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1177","worktype":"CM","wopriority":4}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"12
	// Lillian Rd, Acton, MA 01720,
	// USA","lng":-71.4707421777,"PLUSSISGIS":false,"lat":42.498728602},"routedata":{"ASSIGNMENTID":"369","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"115","HASTRAVELTIME":false,"FROMASSIGNMENT":"357"}},{"startTime":1338310800000,"mxdata":{"uid":{"name":"WORKORDERID","value":2040},"mboInfo":{"WONUM":"BOSB1214","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2040,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1214","worktype":"PM","wopriority":3}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"20
	// Fort Pond Hill Rd, Littleton, MA 01460,
	// USA","lng":-71.4714717386,"PLUSSISGIS":false,"lat":42.5033796787},"routedata":{"ASSIGNMENTID":"377","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"115","HASTRAVELTIME":false,"FROMASSIGNMENT":"369"}},{"startTime":1338318000000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":{"ASSIGNMENTID":null,"TOLOCATIONSID":"455","FROMLOCATIONSID":null,"SLROUTEID":"115","HASTRAVELTIME":false,"FROMASSIGNMENT":"377"}}],"color":"1C29A8","resource":{"GISABLE":true,"RESDESCRIPTION":"Earl
	// Henry","LBSINTERVAL":"30","FWMTYPE":"LABOR","id":"LABOR:BOSHENRY","FWMRESKEY":"BOSHENRY","LATITUDEY":42.5414395111,"_LABORSHIFTNUM":"DAY","RESID":"BOSHENRY","LABORCODE":"BOSHENRY","name":"BOSHENRY","quantity":1.0,"_REFOBJECTNAME":"LABOR","LONGITUDEX":-71.5488530902}},
	// {"stops":[{"startTime":1338282000000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":null},{"startTime":1338286500000,"mxdata":{"uid":{"name":"WORKORDERID","value":2033},"mboInfo":{"WONUM":"BOSB1206","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2033,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1206","worktype":"PM","wopriority":5}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"24
	// Lawrence St, Littleton, MA 01460,
	// USA","lng":-71.4976246352,"PLUSSISGIS":false,"lat":42.5591550229},"routedata":{"ASSIGNMENTID":"373","TOLOCATIONSID":null,"FROMLOCATIONSID":"455","SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":240,"FROMASSIGNMENT":null}},{"startTime":1338291000000,"mxdata":{"uid":{"name":"WORKORDERID","value":2046},"mboInfo":{"WONUM":"BOSB1224","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2046,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1224","worktype":"EM","wopriority":1}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"182
	// Hartwell Ave, Littleton, MA 01460,
	// USA","lng":-71.5051777358,"PLUSSISGIS":false,"lat":42.5603562126},"routedata":{"ASSIGNMENTID":"383","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":60,"FROMASSIGNMENT":"373"}},{"startTime":1338295320000,"mxdata":{"uid":{"name":"WORKORDERID","value":2008},"mboInfo":{"WONUM":"BOSB1125","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2008,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1125","worktype":"","wopriority":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"850
	// Boston Rd, Groton, MA 01450,
	// USA","lng":-71.5191525,"PLUSSISGIS":false,"lat":42.5769745},"routedata":{"ASSIGNMENTID":"354","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":240,"FROMASSIGNMENT":"383"}},{"startTime":1338303600000,"mxdata":{"uid":{"name":"WORKORDERID","value":2047},"mboInfo":{"WONUM":"BOSB1226","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2047,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1226","worktype":"CM","wopriority":5}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"62
	// Duck Pond Dr, Groton, MA 01450,
	// USA","lng":-71.5134372,"PLUSSISGIS":false,"lat":42.5866746},"routedata":{"ASSIGNMENTID":"384","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":120,"FROMASSIGNMENT":"354"}},{"startTime":1338311700000,"mxdata":{"uid":{"name":"WORKORDERID","value":2038},"mboInfo":{"WONUM":"BOSB1212","SITEID":"BEDFORD"},"mboName":"WORKORDER","extendsMboName":"WORKORDER","attributes":{"plussfeatureclass":"","workorderid":2038,"plussgis":"","status":"APPR","siteid":"BEDFORD","wonum":"BOSB1212","worktype":"EMCAL","wopriority":8}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"118
	// Sandy Pond Rd, Ayer, MA 01432,
	// USA","lng":-71.5491427666,"PLUSSISGIS":false,"lat":42.5600645733},"routedata":{"ASSIGNMENTID":"376","TOLOCATIONSID":null,"FROMLOCATIONSID":null,"SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":480,"FROMASSIGNMENT":"384"}},{"startTime":1338314400000,"mxdata":{"uid":{"name":"LOCATIONSID","value":455},"mboInfo":{"LOCATION":"BOS125","SITEID":"BEDFORD"},"mboName":"LOCATIONS","extendsMboName":"LOCATIONS","attributes":{"plussfeatureclass":"","locationsid":455,"plussgis":"","location":"BOS125","status":"OPERATING","siteid":"BEDFORD","fwm_default":""}},"lbsdata":null,"gisdata":{"flags":{"readonly":true},"address":"550
	// King St, Littleton, MA 01460,
	// USA","lng":-71.4716434,"PLUSSISGIS":false,"lat":42.5494288},"routedata":{"ASSIGNMENTID":null,"TOLOCATIONSID":"455","FROMLOCATIONSID":null,"SLROUTEID":"114","HASTRAVELTIME":true,"TRAVELTIME_SECS":660,"FROMASSIGNMENT":"376"}}],"color":"567531","resource":{"GISABLE":true,"RESDESCRIPTION":"Overhead
	// Line Crew
	// 1","LBSINTERVAL":"30","AMCREW":"BOSOHL1","FWMTYPE":"AMCREW","id":"AMCREW:BOSOHL1","FWMRESKEY":"BOSOHL1","LATITUDEY":42.5606612273,"_LABORSHIFTNUM":"DAY","RESID":"BOSOHL1","name":"BOSOHL1","quantity":1.0,"_REFOBJECTNAME":"LABOR","LONGITUDEX":-71.4969255236}}],"drawRouteCallback","onRouteError");

	_executeRoutes: function(disp)
	{
		disp.drawAllRoutes([ {
			"stops": [ {
				"startTime": 1338282000000,
				"mxdata": {
					"uid": {
						"name": "LOCATIONSID",
						"value": 455
					},
					"mboInfo": {
						"LOCATION": "BOS125",
						"SITEID": "BEDFORD"
					},
					"mboName": "LOCATIONS",
					"extendsMboName": "LOCATIONS",
					"attributes": {
						"plussfeatureclass": "",
						"locationsid": 455,
						"plussgis": "",
						"location": "BOS125",
						"status": "OPERATING",
						"siteid": "BEDFORD",
						"fwm_default": ""
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "550 King St, Littleton, MA 01460, USA",
					"lng": -71.4716434,
					"PLUSSISGIS": false,
					"lat": 42.5494288
				},
				"routedata": null
			}, {
				"startTime": 1338291119000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2015
					},
					"mboInfo": {
						"WONUM": "BOSB1158",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2015,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1158",
						"worktype": "EM",
						"wopriority": 1
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "407 Newtown Rd, Littleton, MA 01460, USA",
					"lng": -71.4597129342,
					"PLUSSISGIS": false,
					"lat": 42.5271675293
				},
				"routedata": {
					"ASSIGNMENTID": "358",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": "455",
					"SLROUTEID": "115",
					"HASTRAVELTIME": false,
					"FROMASSIGNMENT": null
				}
			}, {
				"startTime": 1338298200000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2013
					},
					"mboInfo": {
						"WONUM": "BOSB1156",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2013,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1156",
						"worktype": "EV",
						"wopriority": 4
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "25 Boxboro Rd, Littleton, MA 01460, USA",
					"lng": -71.4756774423,
					"PLUSSISGIS": false,
					"lat": 42.5083151367
				},
				"routedata": {
					"ASSIGNMENTID": "357",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "115",
					"HASTRAVELTIME": false,
					"FROMASSIGNMENT": "358"
				}
			}, {
				"startTime": 1338303600000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2029
					},
					"mboInfo": {
						"WONUM": "BOSB1177",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2029,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1177",
						"worktype": "CM",
						"wopriority": 4
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "12 Lillian Rd, Acton, MA 01720, USA",
					"lng": -71.4707421777,
					"PLUSSISGIS": false,
					"lat": 42.498728602
				},
				"routedata": {
					"ASSIGNMENTID": "369",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "115",
					"HASTRAVELTIME": false,
					"FROMASSIGNMENT": "357"
				}
			}, {
				"startTime": 1338310800000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2040
					},
					"mboInfo": {
						"WONUM": "BOSB1214",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2040,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1214",
						"worktype": "PM",
						"wopriority": 3
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "20 Fort Pond Hill Rd, Littleton, MA 01460, USA",
					"lng": -71.4714717386,
					"PLUSSISGIS": false,
					"lat": 42.5033796787
				},
				"routedata": {
					"ASSIGNMENTID": "377",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "115",
					"HASTRAVELTIME": false,
					"FROMASSIGNMENT": "369"
				}
			}, {
				"startTime": 1338318000000,
				"mxdata": {
					"uid": {
						"name": "LOCATIONSID",
						"value": 455
					},
					"mboInfo": {
						"LOCATION": "BOS125",
						"SITEID": "BEDFORD"
					},
					"mboName": "LOCATIONS",
					"extendsMboName": "LOCATIONS",
					"attributes": {
						"plussfeatureclass": "",
						"locationsid": 455,
						"plussgis": "",
						"location": "BOS125",
						"status": "OPERATING",
						"siteid": "BEDFORD",
						"fwm_default": ""
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "550 King St, Littleton, MA 01460, USA",
					"lng": -71.4716434,
					"PLUSSISGIS": false,
					"lat": 42.5494288
				},
				"routedata": {
					"ASSIGNMENTID": null,
					"TOLOCATIONSID": "455",
					"FROMLOCATIONSID": null,
					"SLROUTEID": "115",
					"HASTRAVELTIME": false,
					"FROMASSIGNMENT": "377"
				}
			} ],
			"color": "1C29A8",
			"resource": {
				"GISABLE": true,
				"RESDESCRIPTION": "Earl Henry",
				"LBSINTERVAL": "30",
				"FWMTYPE": "LABOR",
				"id": "LABOR:BOSHENRY",
				"FWMRESKEY": "BOSHENRY",
				"LATITUDEY": 42.5414395111,
				"_LABORSHIFTNUM": "DAY",
				"RESID": "BOSHENRY",
				"LABORCODE": "BOSHENRY",
				"name": "BOSHENRY",
				"quantity": 1.0,
				"_REFOBJECTNAME": "LABOR",
				"LONGITUDEX": -71.5488530902
			}
		}, {
			"stops": [ {
				"startTime": 1338282000000,
				"mxdata": {
					"uid": {
						"name": "LOCATIONSID",
						"value": 455
					},
					"mboInfo": {
						"LOCATION": "BOS125",
						"SITEID": "BEDFORD"
					},
					"mboName": "LOCATIONS",
					"extendsMboName": "LOCATIONS",
					"attributes": {
						"plussfeatureclass": "",
						"locationsid": 455,
						"plussgis": "",
						"location": "BOS125",
						"status": "OPERATING",
						"siteid": "BEDFORD",
						"fwm_default": ""
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "550 King St, Littleton, MA 01460, USA",
					"lng": -71.4716434,
					"PLUSSISGIS": false,
					"lat": 42.5494288
				},
				"routedata": null
			}, {
				"startTime": 1338286500000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2033
					},
					"mboInfo": {
						"WONUM": "BOSB1206",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2033,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1206",
						"worktype": "PM",
						"wopriority": 5
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "24 Lawrence St, Littleton, MA 01460, USA",
					"lng": -71.4976246352,
					"PLUSSISGIS": false,
					"lat": 42.5591550229
				},
				"routedata": {
					"ASSIGNMENTID": "373",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": "455",
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 240,
					"FROMASSIGNMENT": null
				}
			}, {
				"startTime": 1338291000000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2046
					},
					"mboInfo": {
						"WONUM": "BOSB1224",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2046,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1224",
						"worktype": "EM",
						"wopriority": 1
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "182 Hartwell Ave, Littleton, MA 01460, USA",
					"lng": -71.5051777358,
					"PLUSSISGIS": false,
					"lat": 42.5603562126
				},
				"routedata": {
					"ASSIGNMENTID": "383",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 60,
					"FROMASSIGNMENT": "373"
				}
			}, {
				"startTime": 1338295320000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2008
					},
					"mboInfo": {
						"WONUM": "BOSB1125",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2008,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1125",
						"worktype": "",
						"wopriority": ""
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "850 Boston Rd, Groton, MA 01450, USA",
					"lng": -71.5191525,
					"PLUSSISGIS": false,
					"lat": 42.5769745
				},
				"routedata": {
					"ASSIGNMENTID": "354",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 240,
					"FROMASSIGNMENT": "383"
				}
			}, {
				"startTime": 1338303600000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2047
					},
					"mboInfo": {
						"WONUM": "BOSB1226",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2047,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1226",
						"worktype": "CM",
						"wopriority": 5
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "62 Duck Pond Dr, Groton, MA 01450, USA",
					"lng": -71.5134372,
					"PLUSSISGIS": false,
					"lat": 42.5866746
				},
				"routedata": {
					"ASSIGNMENTID": "384",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 120,
					"FROMASSIGNMENT": "354"
				}
			}, {
				"startTime": 1338311700000,
				"mxdata": {
					"uid": {
						"name": "WORKORDERID",
						"value": 2038
					},
					"mboInfo": {
						"WONUM": "BOSB1212",
						"SITEID": "BEDFORD"
					},
					"mboName": "WORKORDER",
					"extendsMboName": "WORKORDER",
					"attributes": {
						"plussfeatureclass": "",
						"workorderid": 2038,
						"plussgis": "",
						"status": "APPR",
						"siteid": "BEDFORD",
						"wonum": "BOSB1212",
						"worktype": "EMCAL",
						"wopriority": 8
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "118 Sandy Pond Rd, Ayer, MA 01432, USA",
					"lng": -71.5491427666,
					"PLUSSISGIS": false,
					"lat": 42.5600645733
				},
				"routedata": {
					"ASSIGNMENTID": "376",
					"TOLOCATIONSID": null,
					"FROMLOCATIONSID": null,
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 480,
					"FROMASSIGNMENT": "384"
				}
			}, {
				"startTime": 1338314400000,
				"mxdata": {
					"uid": {
						"name": "LOCATIONSID",
						"value": 455
					},
					"mboInfo": {
						"LOCATION": "BOS125",
						"SITEID": "BEDFORD"
					},
					"mboName": "LOCATIONS",
					"extendsMboName": "LOCATIONS",
					"attributes": {
						"plussfeatureclass": "",
						"locationsid": 455,
						"plussgis": "",
						"location": "BOS125",
						"status": "OPERATING",
						"siteid": "BEDFORD",
						"fwm_default": ""
					}
				},
				"lbsdata": null,
				"gisdata": {
					"flags": {
						"readonly": true
					},
					"address": "550 King St, Littleton, MA 01460, USA",
					"lng": -71.4716434,
					"PLUSSISGIS": false,
					"lat": 42.5494288
				},
				"routedata": {
					"ASSIGNMENTID": null,
					"TOLOCATIONSID": "455",
					"FROMLOCATIONSID": null,
					"SLROUTEID": "114",
					"HASTRAVELTIME": true,
					"TRAVELTIME_SECS": 660,
					"FROMASSIGNMENT": "376"
				}
			} ],
			"color": "567531",
			"resource": {
				"GISABLE": true,
				"RESDESCRIPTION": "Overhead Line Crew 1",
				"LBSINTERVAL": "30",
				"AMCREW": "BOSOHL1",
				"FWMTYPE": "AMCREW",
				"id": "AMCREW:BOSOHL1",
				"FWMRESKEY": "BOSOHL1",
				"LATITUDEY": 42.5606612273,
				"_LABORSHIFTNUM": "DAY",
				"RESID": "BOSOHL1",
				"name": "BOSOHL1",
				"quantity": 1.0,
				"_REFOBJECTNAME": "LABOR",
				"LONGITUDEX": -71.4969255236
			}
		} ], "drawRouteCallback", "onRouteError");
	},
	serverHandler: function(success, error)
	{
		success({
			result: "success"
		});
	},
	onSLRTravelTimeUpdated: function(data)
	{
		this.deferredObj.callback(true);
	}

});

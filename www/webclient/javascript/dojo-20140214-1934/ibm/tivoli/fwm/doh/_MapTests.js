//>>built
// wrapped by build app
define("ibm/tivoli/fwm/doh/_MapTests", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.doh._MapTests");
dojo.declare("ibm.tivoli.fwm.doh._MapTests", null , {
	mapProvider:null,
	confHelper: null,
	deferredObj: null,
	name: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
	
	},
	setUp: function()
	{
		
	},
	runMapTest: function(nativeMap, mapId, map /*map & mapstraction*/)
	{
		console.error("mapLoaded must be implemented");
		this.deferredObj.errback("mapLoaded must be implemented");
	},
	prepareConfData:function(){
		console.error("prepareConfData must be implemented");
	},
	runTest: function()
	{	
		console.log("executing", this.name, this);		
		this.confHelper = new ibm.tivoli.fwm.doh.ConfigHelper({mapProvider:this.mapProvider});
		this.prepareConfData();		
		this.confHelper.buildMap(dojo.hitch(this, this.runMapTest));
		this.deferredObj = new doh.Deferred();
		return this.deferredObj;
	},
	tearDown: function()
	{
		this.confHelper.destroyMap();
	}
	
});
});

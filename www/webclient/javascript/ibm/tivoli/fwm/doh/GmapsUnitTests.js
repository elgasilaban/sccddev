dojo.provide("ibm.tivoli.fwm.doh.GmapsUnitTests");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
/**
 * GMaps provider unit test module
 */
doh.register("ibm.tivoli.fwm.doh.GmapsUnitTests", [
  {
	  /**
	   * Tests if a GMaps configurations is correctly loaded
	   */
	mapFullConf:{
	  		"divId":"test_mapdiv_gmaps",			
	  		"mapConf":{provider:"gmaps",initialLocation:{lat:-23.0,lng:-43.0,level:8},gmaps:{mapType:"mxn.Mapstraction.ROAD"}},			
	  		"width":"500px",
	  		"height":"500px"
	  	  },
    name: "GMapLoad",
    setUp: function(){
      var mdom = dojo.create("div",{id:this.mapFullConf.divId},dojo.query(".tabBody")[0]);
      dojo.subscribe(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded,dojo.hitch(this,this.implLoaded));
    },
    implLoaded:function(mapObj){
    	try {
    		console.log("aqui!",mapObj)
    		doh.assertNotEqual(null, mapObj, "Implementation loaded");
    		
    		dojo.subscribe("mxmap.mapLoaded",dojo.hitch(this,this.mapLoaded));
    		
    	}catch (e) {
    		this.deferredObj.errback(e);
    	}
    },
    mapLoaded:function(map,mapId){
    	try {    		
    		this.mapImpl=mapObj;
    		var initialLocation = this.mapFullConf.mapConf.initialLocation;
    		doh.assertEqual(initialLocation.level,this.mapImpl.map.getZoom(),"Initial extent zoom level is wrong.");
    		doh.assertEqual(initialLocation.lat,this.mapImpl.map.getCenter().lat,"Center lat is not the same.");
    		doh.assertEqual(initialLocation.lng,this.mapImpl.map.getCenter().lng,"Center lng is not the same.");
    		this.deferredObj.callback(true);
    	} catch (e) {
    		this.deferredObj.errback(e);
    	}
    },
    mapImpl:null,
    
  	timeout:6000,
  	deferredObj:null,
  	runTest: function(){
  		this.deferredObj = new doh.Deferred();    			
  		ibm.tivoli.fwm.mxmap.factory.createMap(this.mapFullConf);            

  		//Return the deferred.  DOH will 
  		//wait on this object for one of the callbacks to 
  		//be called, or for the timeout to expire.
  		return this.deferredObj;  
  	},
    tearDown: function(){
    }
  }

]);

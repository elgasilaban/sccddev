dojo.provide("ibm.tivoli.fwm.doh.BingMapsUnitTests");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
/**
 * GMaps provider unit test module
 */
doh.register("ibm.tivoli.fwm.doh.BingMapsUnitTests", [
  {
	  /**
	   * Tests if a bing configurations is correctly loaded
	   */
	mapFullConf:{
	  		"divId":"test_mapdiv_bingmaps",			
	  		"mapConf":{
	  			provider:"bingmaps",
	  			key:"AnTWFGEWAfcOu65V3sExt6Z3zuFe8EQm2NZAMWIbASt_QcvApGD6-o7DLCERsx5R",
	  			initialLocation:{lat:-23.0,lng:-43.0,level:8},
	  			bing:{mapType:"mxn.Mapstraction.ROAD"}},			
	  		"width":"500px",
	  		"height":"500px"
	  	  },
    name: "BingMapsLoad",
    setUp: function(){
      var mdom = dojo.create("div",{id:this.mapFullConf.divId},dojo.query(".tabBody")[0]);
      dojo.subscribe(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded,dojo.hitch(this,this.implLoaded));
    },
    implLoaded:function(mapObj){
    	try {
    		doh.assertNotEqual(null, mapObj, "Implementation loaded");
    		dojo.subscribe("mxmap.mapLoaded",dojo.hitch(this,this.mapLoaded));
    		
    	}catch (e) {
    		this.deferredObj.errback(e);
    	}
    },
    mapLoaded:function(map){
    	try {
    		this.mapImpl=map;
    		var initialLocation = this.mapFullConf.mapConf.initialLocation;
    		doh.assertEqual(initialLocation.level,this.mapImpl.map.getZoom(),"Initial extent zoom level is wrong.");
    		doh.assertEqual(initialLocation.lat,this.mapImpl.map.getCenter().lat,"Center lat is not the same.");
    		doh.assertEqual(initialLocation.lng,this.mapImpl.map.getCenter().lng,"Center lng is not the same.");
    		this.mapImpl.map.addMarker(new mxn.Marker(new mxn.LatLonPoint(-24.0,-44.0)));
    		var point = new mxn.LatLonPoint(initialLocation.lat,initialLocation.lng);
    		var myMarker=new mxn.Marker(point);
    		myMarker.setIcon("http://mapstraction.com/icon.gif");
    		myMarker.setLabel("Great Work!");
    		myMarker.setInfoBubble("<b>Be Happy</b>");
    		this.mapImpl.map.addMarker(myMarker);
    		this.deferredObj.callback(true);
    	} catch (e) {
    		this.deferredObj.errback(e);
    	}
    },
    mapImpl:null,
    
  	timeout:36000,
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

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.Cache");
dojo.require("doh.runner");


dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture", null, {
	cache: null,	
	constructor: function(name, runTest) {
		this.name = name;
		this.runTest = runTest;
	},
	setUp:function() {
		this.cache = new ibm.tivoli.simplesrm.srm.dojo.data.Cache();
		this.cache.put("k1","v1");
		this.cache.put("k2","v2",{timeout: 0, onPurge: function(){console.log("purged k2");}});
		this.cache.put("k3","v3",{timeout: 3600000, onPurge: function(){console.log("purged k3");}});
	},
	tearDown:function() {
		//do something after every test you want to run
	}
});


doh.register("ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache",
[
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("simpleAccess", function(){
		for(var i = 0; i < 100 ; i++) {			
			doh.assertTrue(this.cache.get("k1") === "v1");			
			doh.assertTrue(this.cache.get("k3") === "v3");
		}
	}),
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("purgeAfterFirstGet", function(){
		var d = new doh.Deferred();
		var test = dojo.hitch(this, function(){
			try{			
				doh.assertTrue(this.cache.get("k2") === undefined);			
				d.callback(true);
			}
			catch(err){
				d.errback(new Error("test failed"));
			}
			
		});
		setTimeout(test,1000);
		return d;
	}),
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("purgeOld", function(){
		var d = new doh.Deferred();
		var test = dojo.hitch(this, function(){
			try{			
				doh.assertTrue(this.cache.countKeys() === 3);
				this.cache.purge();
				doh.assertTrue(this.cache.countKeys() === 2);
				d.callback(true);
			}
			catch(err){
				d.errback(new Error("test failed"));
			}
			
		});
		setTimeout(test,1000);
		return d;
	}),
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("clearAll", function(){
		this.cache.clear();
		doh.assertTrue(this.cache.get("k1") === undefined);
		doh.assertTrue(this.cache.get("k2") === undefined);
		doh.assertTrue(this.cache.get("k3") === undefined);
	})
	,
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("putObject", function(){
		var obj = { tab: [1,2], name: "asdf"};
		this.cache.put("obj",obj);
		doh.assertEqual(this.cache.get("obj"),obj);		
	}),
	new ibm.tivoli.simplesrm.srm.dojo.data.test.TestCache.fixture("put - illegal use", function(){
		try{
			this.cache.put(null,obj);
			doh.assertTrue(false);
		}
		catch(ex){}
		try{
			this.cache.put(undefined,obj);
			doh.assertTrue(false);
		}
		catch(ex){}
		try{
			this.cache.put(123,obj);
			doh.assertTrue(false);
		}
		catch(ex){}
		try{
			this.cache.put({},obj);
			doh.assertTrue(false);
		}
		catch(ex){}		
		try{
			this.cache.put("a",undefined);
			doh.assertTrue(false);
		}
		catch(ex){}
		
	})
]);
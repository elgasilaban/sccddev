dojo.provide("ibm.tivoli.simplesrm.srm.dojo.test.TestLogger");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Logger");
//dojo.require("doh.runner");


dojo.declare("ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture", null, {
	checkAllLevels: function(){
		var err = new Error("original message");
		this.logger.log("log",err);
		this.logger.debug("debug",err);
		this.logger.info("info",err);
		this.logger.warn("warn",err);
		this.logger.error("error",err);
	},
	levels: ibm.tivoli.simplesrm.srm.dojo.LogLevels,
	logger: new ibm.tivoli.simplesrm.srm.dojo.Logger(),
	
	constructor: function(name, runTest) {
		this.name = name;
		this.runTest = runTest;
	},
	setUp:function() {},
	tearDown:function() {}
});


doh.register("ibm.tivoli.simplesrm.srm.dojo.test.TestLogger",
[
	new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("prerequisites", function(){
		 doh.assertTrue( this.levels.ERROR instanceof ibm.tivoli.simplesrm.srm.dojo.LogLevel);
		 doh.assertTrue(this.logger instanceof ibm.tivoli.simplesrm.srm.dojo.Logger);
	}),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("defaultLevel", function(){
		 doh.assertEqual(this.logger.getLevel(), this.levels.ERROR);
		 this.checkAllLevels();
		 console.log("after default(ERROR)");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelAll", function(){
		 this.logger.setLevel(this.levels.ALL);
		 doh.assertEqual(this.logger.getLevel(), this.levels.ALL);
		 this.checkAllLevels();
		 console.log("after ALL");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelLOG", function(){
		 this.logger.setLevel(this.levels.LOG);
		 doh.assertEqual(this.logger.getLevel(), this.levels.LOG);
		 this.checkAllLevels();
		 console.log("after LOG");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelDEBUG", function(){
		 this.logger.setLevel(this.levels.DEBUG);
		 doh.assertEqual(this.logger.getLevel(), this.levels.DEBUG);
		 this.checkAllLevels();
		 console.log("after DEBUG");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelINFO", function(){
		 this.logger.setLevel(this.levels.INFO);
		 doh.assertEqual(this.logger.getLevel(), this.levels.INFO);
		 this.checkAllLevels();
		 console.log("after INFO");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelWARN", function(){
		 this.logger.setLevel(this.levels.WARN);
		 doh.assertEqual(this.logger.getLevel(), this.levels.WARN);
		 this.checkAllLevels();
		 console.log("after WARN");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelERROR", function(){
		 this.logger.setLevel(this.levels.ERROR);
		 doh.assertEqual(this.logger.getLevel(), this.levels.ERROR);
		 this.checkAllLevels();
		 console.log("after ERROR");
	 }),
	 new ibm.tivoli.simplesrm.srm.dojo.test.TestLogger.fixture("LevelOFF", function(){
		 this.logger.setLevel(this.levels.OFF);
		 doh.assertEqual(this.logger.getLevel(), this.levels.OFF);
		 this.checkAllLevels();
		 console.log("after OFF");
	 })
		
]);
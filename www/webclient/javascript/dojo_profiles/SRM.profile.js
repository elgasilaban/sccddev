dependencies = {
	"stripConsole": "normal",

   //Array of layers to be built
	"layers": [
		{
         // where the output file goes, relative to the dojo dir (or release dir?)
			"name": "../layers/mbs/SRMUIDojo.js",
			//"name": "../../../com/ibm/ism/pmsc/dojo/SRMUIDojo.js",
			
			// what the module's name will be, i.e., what gets generated
         // for dojo.provide(<name here>);
			"resourceName" : "layers.mbs.SRMUIDojo",
			//"resourceName" : "com.ibm.ism.pmsc.dojo.SRMUIDojo",

         //this is relative to util/buildscripts
         //copyrightFile: "../../../SimpleSRM/IBMCopyright.txt",

         //A list of Dojo resources that this this layer relies on 
		   // i.e. modules to use as the "source" for this layer
			"dependencies": [
            "ibm.tivoli.simplesrm.srm.dijit.Navigator",
            "ibm.tivoli.simplesrm.srm.dijit.Overview.Pod",
            "ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod",
            "ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardPod",
            "ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsPod",
            "ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatPod",
            "com.ibm.ism.pmsc.dojo.srmPageInit",
            "dijit.form.ComboButton",
            "dijit.form.RadioButton", 
            "dojox.gfx.vml",            
		    "dojox.gfx.shape",
		    "dojox.gfx.path"
			]
		}       

	],
   // An array of individual prefix objects, describing where relative to the source directory tree (i.e. util dir),
   // a particular top-level module's source is found.
	"prefixes": [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		["com", "../../../webmodule/webclient/javascript/com"],
		["ibm/tivoli/simplesrm/srm", "../../../webmodule/webclient/javascript/simplesrm/srm"],
		["ibm/tivoli/tpae", "../../../webmodule/webclient/javascript/tpae"],
		["ibm/tivoli/tip", "../../../webmodule/webclient/javascript/tip"] 
	]
}

//cd C:\tools\dojo-release-1.4.2-src\util\buildscripts
//build  profile=SRM action=clean,release optimize=shrinksafe cssOptimize=comments copyTests=false releaseName=SRMDojo releaseDir=../../SRMDojo layerOptimize=shrinksafe version=1.3.1-290603-IBM
//build profileFile=../../../../SimpleSRM/SimpleSRM.profile.js action=clean,release version=1.3.1-290603-IBM optimize=shrinksafe layerOptimize=shrinksafe cssOptimize=comments copyTests=false localeList=de releaseName=SRMdojo releaseDir=../../../../SimpleSRMrel/WebContent

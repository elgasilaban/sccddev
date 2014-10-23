//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/SimpleSrmApp", ["dijit","dojo","dojox","dojo/require!dijit/Dialog,dojo/fx,dijit/layout/TabContainer,dijit/layout/ContentPane,ibm/tivoli/simplesrm/srm/dojo/Utilities,ibm/tivoli/simplesrm/tsam/dojo/data/tsamQuery,ibm/tivoli/simplesrm/srm/dijit/Navigator,ibm/tivoli/simplesrm/srm/dijit/MyCatalogRequestsGrid,ibm/tivoli/simplesrm/srm/dijit/CreateCatalogRequest,ibm/tivoli/simplesrm/srm/dijit/CreatorPopupDialog,ibm/tivoli/simplesrm/srm/dijit/Overview/RequestsPod,ibm/tivoli/simplesrm/srm/dijit/Overview/ApprovalsPod,ibm/tivoli/simplesrm/srm/dijit/DojoUpgrades,ibm/tivoli/simplesrm/srm/dojo/Logger"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

/*
** SimpleSrmApp is an object that brings together all the widgets into a useful application
*/
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.SimpleSrmApp");

dojo.require("dijit.Dialog");
dojo.require("dojo.fx");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Utilities");
dojo.require("ibm.tivoli.simplesrm.tsam.dojo.data.tsamQuery");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.Navigator");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyCatalogRequestsGrid");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.CreateCatalogRequest");	// pulls in CreatorPopupdialog
dojo.require("ibm.tivoli.simplesrm.srm.dijit.CreatorPopupDialog");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.ApprovalsPod");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.DojoUpgrades");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Logger");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.SimpleSrmApp", 
	[dijit._Widget, dijit._Templated, ibm.tivoli.simplesrm.srm.dijit.WidgetBase], 
{	
	widgetsInTemplate: true,
	templateString:"<div>\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<!--  the UI -->\n\t<div id=\"${id}_selfservicestation\" style=\"display: block; margin: 0; \">\n\t\t<table class='glass' style=\"width:100%\">\n\t\t\t<tr><td class='glass ul'></td><td class='glass um' colspan=\"3\"></td><td class='glass ur'></td></tr>\n\t\t\t<tr>\n\t\t\t\t<td class='glass lt'></td>\n\t\t\t\t<td class='glass content'>\n\t\t\t   \t\t<div id='${id}_navigator' dojoType='ibm.tivoli.simplesrm.srm.dijit.Navigator' dojoAttachPoint=\"navigator\" sytle=\"width:100%;\"></div>\n\t\t\t\t</td>\n\t\t\t\t<td class='glass rt'></td>\t\n\t\t\t\t<td class='glass content'  style=\"width:398px;\">\n\t\t\t\t\t<div dojoAttachPoint=\"pods\"></div>\n\t\t\t   \t</td>\n\t\t\t\t<td class='glass rt'></td>\n\t\t\t</tr>\n\t\t\t<tr><td class=\"glass ll\"></td><td class=\"glass lm\" colspan=\"3\"></td><td class=\"glass lr\"></td></tr>\n\t\t</table>\n\t</div>\n</div>",
	
	imagesPath: "",

	constructor: function()
	{
		console.log("SimpleSrmApp.ctor");
		
		if(!this.imagesPath){
			this.imagesPath = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit", "images");
		}
		
		var dojoUpgrade = new ibm.tivoli.simplesrm.srm.dijit.DojoUpgrades();
		dojoUpgrade.modifyDojo();
	},
	
	addApprovalsPod: function(){
		var approver_groups = ibm.tivoli.tpae.dojo.data.getConfigProperty("APPROVER_GROUP_LIST");
		if(approver_groups.length > 0) {
			var r = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getCurrentUserRole();
			if(r && r.GROUPNAME && r.GROUPNAME.match("^(?:"+approver_groups+")$")) {
				var that = this;
				var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMaxPropValue(); 
				deferred.addCallback(function(response){
					var tab = response.MAXPROPVALUEMboSet.MAXPROPVALUE;
					var ntab = dojo.filter( tab,function(el){
						return el.Attributes.PROPNAME.content === "pmrdp.enable.autoapproval";
					});
					if((ntab.length>0) &&(ntab[0].Attributes.PROPVALUE.content !== "Y")){
						var pod = new ibm.tivoli.simplesrm.srm.dijit.Overview.ApprovalsPod();
						dojo.place(pod.domNode, that.pods,"after");								
					}
				});
				deferred.addErrback( function(){
					console.error("Failed loading ApprovalsPod");
					ibm.tivoli.logger.error("Failed loading ApprovalsPod");
				});
			}
		}
	},
	
	addPods: function(){
		/* Query the config.properties from WAS */
		var podlist = ibm.tivoli.tpae.dojo.data.getConfigProperty("POD_LIST").split(',');		
		podlist.unshift("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod");
		var that = this;
		dojo.forEach(podlist, function(el){					
			var podtype = el.trim();			
			try {
				console.log("SimpleSrmApp.startup creating pod '%s'", podtype);
				dojo._loadModule(podtype);
				var pod = dojo.getObject(podtype);
				dojo.place((new pod()).domNode, that.pods,"before");
			}
			catch(ex){
				console.error("addPods",ex);
				ibm.tivoli.logger.error("Failed loading pod " + podtype,ex);
			}
		});
	},
	
	buildRendering: function()
	{		
		this.connect(this,"startup","addPods");
		this.connect(this,"startup","addApprovalsPod");
		this.inherited(arguments);
	},
	postCreate: function()
	{
		// when the list of requests is refreshed, update the recent requests also
		var cmrq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getCatalogRequests();
		cmrq.addCallback(dojo.hitch(this, function(response) {
			this.navigator.refreshRecentRequests(response);
		}));
		this.inherited(arguments);
	},
	startup: function()
	{	
		console.log("SimpleSrmApp.startup");
		
		this.inherited(arguments);		
	},
	
	logout: function()
	{
		window.location.assign("devlogin.jsp" + window.location.search);
	},
	
	dummy_:null
});


});

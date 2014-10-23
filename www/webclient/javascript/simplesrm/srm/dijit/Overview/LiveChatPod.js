//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatPod");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatView");
//dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatDetails");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery"); 
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable"); 


/*
 * LiveChatPod
 * Live Chat information and link to start a live chat
*/
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatPod", ibm.tivoli.simplesrm.srm.dijit.Overview.Pod, {
	//widget to fill in Pod information section
	viewType: "ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatView",
	dialog: 'pmtcochatqueue',  //widget input parms
	title: "",
	buttontitle: "",
	
	//detailsType: "ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatDetails",
	//autoRefreshProperty: "MessageAutoRefresh",
	
	constructor: function() 	{
		console.log("Overview.LiveChatPod.ctor");
		ibm.tivoli.simplesrm.srm.dijit.Overview.livechatpod = this;	     		
	},
	
	postMixInProperties: function() 	{
		console.log("Overview.LiveChatPod.postMixInProperties");
		if (this.title!="")
			this.heading = this.title;
		else
		     this.heading = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").LiveChatHeading;
		if (this.buttontitle!="")
			this.detailsLinkLabel = this.buttontitle;
		else
		    this.detailsLinkLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").LiveChatLink;
		this.detailsUrl = "#requests";
		 
		
		this.inherited(arguments);
	},
	postCreate: function() 	{
		this.refresh();
		this.inherited(arguments);		
		
		
		//Check sigoption to hide footer
		var sigoptions = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._sigoptions;
		if (sigoptions!=null && dojo.indexOf(sigoptions, "PMTCOCHATNOW")<0) {  //sigoption
			//hide footer
			dojo.style(this.footer, "display", "none"); 
		} else {
		   //replace anchor with button in footer
		   this.footer.innerHTML="<button id='livechatbutton' class='livechatbutton'>" + this.detailsLinkLabel + "</button>";
		   dojo.byId("livechatbutton").title = this.detailsLinkLabel;
		   dojo.connect(dojo.byId("livechatbutton"), "onclick",  this, this.onShowDetails);
		   //dojo.style(this.footer, "fontSize", .9+"em");  //enlarge link
		}
		
		//Add chat icon to heading
		var pod = this.footer.parentNode;
		var head = dojo.query(".title", pod);
		if (head && this.iconimage && this.iconimage.length>0) {
			var image_path = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit") + "images/" + this.iconimage;
			head[0].innerHTML = "<img src='" + image_path + "' alt='|' style='width:20px;height:20px;margin-bottom: -5px;'/>  " + this.heading;			
		}
		 
	},
	
	//Get Live Chat message from PMTCOCHATMSG table
	refresh: function() 	{
		console.log("Overview.LiveChatPod.refresh");
		//this._cancelPoll();
				 				
		//default message
		//var message = "<h3 style='margin-top:.5em;'>" + dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").LiveChatMessage + "</h3>";  //default message
		var message = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").LiveChatMessage;
		
		
		//Get message from PMTCOCHATMSG mbo, with clob field PMTCOCHATMSG.MESSAGE.
		var params = {};
		params._exactmatch=1;
		//params.contentuid='1,461';  //TODO - get key from maxvar The maxvar is PMTCOCHATMESSAGEUID and the value is longdescription.contentuid
		params._compact=1;
		params.sync = true;	
		params._includecols="message";
		 
							
		//Get mbo
		var deferred  =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMbo("PMTCOCHATMSG",params);
		if (deferred) {
		   deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
		      if (response.PMTCOCHATMSGMboSet.rsCount>0) {
		          var ld = response.PMTCOCHATMSGMboSet.PMTCOCHATMSG[0].MESSAGE;
		          ld = ld.replace(/&nbsp;/g, " ");
		          this._view.setData(ld);
		      } else {
		    	  console.log("LiveChatPod:refresh - no Long Description");
		    	  this._view.setData(message);  //set default message in Pod view
		      }
		   }));
		} else {
			 console.log("LiveChatPod:refresh - no deferred Long Description");
			this._view.setData(message);  //set default message in Pod view
		}
				 
	},			
					
	 
	_onDataReady: function() {
		this.inherited(arguments);
	},
	
	//Called when Live Chat link/button clicked to start live chat
	onShowDetails: function() 	{
		//TODO show LiveChat dialog
		console.log("LiveChatView.onShowDetails - display live chat dialog");
						
		arguments.caller=null; //running into a IE bug in stacktrace()		
		var navid = "mx107";
	    var nav = dojo.query("div.srmnavigator");  //use id of navigator
	    if (nav.length>0)
		    navid = nav[0].id;	    
		sendEvent(this.dialog,  navid,  "pmtcochatqueue");		//launch livechat dialog 
	}
});

/**
 * Widget to display live chat information
 * 
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatView", 
		[ibm.tivoli.simplesrm.srm.dijit.Overview.View],
{
	widgetsInTemplate: true,
	//'	<div dojoType="ibm.tivoli.simplesrm.srm.dijit.Overview.DataTable" dojoAttachPoint="dataTable" heading="${tableCaption}"></div>\n' +
	templateString: '<div>' +	                
	                '<div id="livechatview" class="livechatview"></div>' +					
					'</div>',
	tableCaption: "",
	totalStr: "Total",
	showDetails: "Show details",
	
	constructor: function() 	{
		console.log("Overview.LiveChatView.ctor");
	},
	
	postMixInProperties: function() 	{
		console.log("Overview.LiveChatView.postMixInProperties");		 
		this.inherited(arguments);
	},
	
	
	//set live chat data in dom
	setData: function(messages) {
		console.log("Overview.LiveChatView.setData");
				
		dojo.byId("livechatview").innerHTML = messages;		 
	} 
	 
	 
});
 

/*ibm.tivoli.simplesrm.srm.dijit.Overview.livechatpod = null;
ibm.tivoli.simplesrm.srm.dijit.Overview._LiveChatPod = function(){
	// summary: returns the singleton bulletin board object
	if(!ibm.tivoli.simplesrm.srm.dijit.Overview.livechatpod){
		ibm.tivoli.simplesrm.srm.dijit.Overview.livechatpod = new ibm.tivoli.simplesrm.srm.dijit.Overview.LiveChatPod(); 
	}
	return ibm.tivoli.simplesrm.srm.dijit.Overview.livechatpod;	// Object
};*/ 
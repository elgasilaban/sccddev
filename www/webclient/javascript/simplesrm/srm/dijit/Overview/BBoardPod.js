//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardPod");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardView");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardDetails");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod");

dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyBBoardMessagesGrid");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable"); 

//contains all messages the current user can see
ibm.tivoli.simplesrm.srm.dijit.Overview.personMessages = [];

//contains all groups current user belongs to
ibm.tivoli.simplesrm.srm.dijit.Overview.personGroups = [];

//contains all sites the current user has access to
ibm.tivoli.simplesrm.srm.dijit.Overview.personOrgsSites = [];

// Tracking messages
ibm.tivoli.simplesrm.srm.dijit.Overview.isTracking = "1";


/*
 * BBoardPod
 * Loads bulletin board messages targeted for logged in user
*/

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardPod", ibm.tivoli.simplesrm.srm.dijit.Overview.Pod,
{
	viewType: "ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardView",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardDetails",
	autoRefreshProperty: "MessageAutoRefresh",
	
	constructor: function()
	{
		console.log("Overview.BBoardPod.ctor");
		ibm.tivoli.simplesrm.srm.dijit.Overview.bboardpod = this;
	
	    // Load Org, Site, Person Group Data
	    // Note: This will only be loaded during initialization to improve performance 	
		var dq_personGroups = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getPersonGroups();
		dq_personGroups.addCallbacks(dojo.hitch(this, this._updatePersonGroups), dojo.hitch(this, this._refreshError));

		var dq_personOrgsSites = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getPersonOrgsSites();
		dq_personOrgsSites.addCallbacks(dojo.hitch(this, this._updatePersonOrgsSites), dojo.hitch(this, this._refreshError));

		
	},
	
	postMixInProperties: function()
	{
		console.log("Overview.BBoardPod.postMixInProperties");
		this.heading = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").MyNewsHeading;
		this.detailsLinkLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").ManageMyNewsLink;
		this.detailsUrl = "#requests";
		
		this.inherited(arguments);
	},
	postCreate: function()
	{
		this.refresh();
		this.inherited(arguments);
	},
	refresh: function()
	{
		console.log("Overview.BBoardPod.refresh");
		this._cancelPoll();

		// Load messages
		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getBBoardMessages();
		dq.addCallbacks(dojo.hitch(this, this._updatePersonMessages), dojo.hitch(this, this._refreshError));
		
	},

   	// Update personMessages
	_updatePersonMessages: function(response)
	{
		try {
   		    this._processMessages(response.Requests);
   		    this._updateData(personMessages);
		}
		catch(ex) {
			ibm.tivoli.logger.error("BBoardPod._updatePersonMessages failure",ex);
		}
	},
	
	// Update personGroups
	_updatePersonGroups: function(response)
	{
		try {
		    personGroups = response.Requests;
		}
		catch(ex) {
			ibm.tivoli.logger.error("BBoardPod._updatePersonGroups failure",ex);
		}
	},
		
	
	// Update personOrgsSites
	_updatePersonOrgsSites: function(response)
	{
		try {
		    personOrgsSites = response.Requests;
		}
		catch(ex) {
			ibm.tivoli.logger.error("BBoardPod._updatePersonOrgs failure",ex);
		}
	},
	
	
	// Process messages
	_processMessages: function(response)
	{
		console.log("Overview.BBoardPod._processMessages");
		try {
		
			personMessages = response;
			var msgid = [];
			var count = 0;
   			console.log("Number of messages before:" + personMessages.length);
   			
   			var authallsites = personOrgsSites[0].AUTHALLSITES;
   			
   			// Iterate over the list of messages and remove those that should not be displayed
			for(var i = 0; i < personMessages.length; ++i) {
		    
				var id = personMessages[i].key;
		    
				// Remove messages targeted to a particular audience that should not be displayed
				// for this user
			    
				var del = false;

				// Remove Messages that are not targeted for the user's org
				if (undefined != personMessages[i].MSGORGID && authallsites == false) {

					var orgCtr = 0;
					for(var j=0; j < personOrgsSites.length; ++j) {
						var orgid = personOrgsSites[j].ORGID;
						if (personMessages[i].MSGORGID == orgid) { 	
							orgCtr++;
						}
					}
					if(orgCtr == 0) {
						del=true;
						console.log("Deleting message because it is not targeted for user's orgid. bulletinid: " + personMessages[i].key);
					}
				}

				// Remove Messages that are not targeted for the user's site
				if (undefined != personMessages[i].MSGSITEID && del == false && authallsites == false) {
			    
					var siteCtr = 0;
					for(var k=0; k < personOrgsSites.length; ++k) {
   						var siteid = personOrgsSites[k].SITEID;		    
						if (personMessages[i].MSGSITEID == siteid) { 	  	  			    
							siteCtr++;
						}
					}
					if(siteCtr == 0) {
						del=true;
						console.log("Deleting message because it is not targeted for user's siteid. bulletinid: " + personMessages[i].key);
					}
   	  		    	
				}
			    
				// Remove Messages that are not targeted for the user's persongroup
				if (undefined != personMessages[i].PERSONGROUP && del == false) {
	
					var found = false;
					var pCtr = 0;
					for(var l=0; l < personGroups.length; ++l) {
						var pg = personGroups[l];
						var group = pg.PERSONGROUP;
						if (personMessages[i].PERSONGROUP == group) {
							pCtr++;
							break;
						}
					}
					if(pCtr == 0) {
						del=true;
					}
				}
				      	
				if(del == true) {
		    		msgid.push(i);
		    		count++;
				}
			}
			
			console.log("Deleting messages.  Count: " + count);		
			for(var p = msgid.length-1; p >= 0; --p) {
				var dm = msgid[p];
				personMessages.splice(dm,1);
			}
			return personMessages;
		}
		catch(ex) {
			ibm.tivoli.logger.error("BBoardPod._processMessages failure",ex);
		}
	},
				
	_updateData: function(response)
	{
		console.log("Overview.BBoardPod._updateData");
		try {

			this._cancelPoll();
			this._refreshErrorCount = 0;
		
			var requests=response;
			if (response.Requests)
			   requests = response.Requests;
						 
			var messages = requests.slice();

			if(this._detailsData === requests){
				return;
			}
				
			if (messages.length > 0)
			{
				ibm.tivoli.simplesrm.srm.dijit.Overview.isTracking = messages[0].ISTRACKING;
			}
			if (ibm.tivoli.simplesrm.srm.dijit.Overview.isTracking == 1)
			{
				for(var j = messages.length-1; j >= 0; --j) {			    
				       var YES = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Yes;
				       if (messages[j].ISVIEWED == YES ) {
						messages.splice(j,1);
					}
				}
			}			
			
			messages.sort(function(b, a) 
			{
				// sort descending
				return a.POSTDATE > b.POSTDATE ? 1 : a.POSTDATE < b.POSTDATE ? -1 : 0;
			});
			for(var i = 0; i < messages.length; ++i) {
				var dt = dojo.date.stamp.fromISOString(messages[0].POSTDATE);
				if(dt) {
					this._mostRecent = dt.getTime();
					break;
				}
			}
			this._detailsData = requests; 
			this._view.setData(messages);
			this._onDataReady();
		}
		catch(ex) {
			ibm.tivoli.logger.error("BBoardPod._updateData failure",ex);
		}
		finally {
			this._resetPoll();
		}
	},
	_poll: function()
	{
	/*  Let user manually refresh to improve performance
		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getBBoardMessages();
		dq.addCallback(dojo.hitch(this, function(response) {
			var messages = response.Requests;
			if(messages.length > 0) {
				this.refresh();
			}
			else {
				this._resetPoll();
			}

		}));
	*/		
	},
	_onDataReady: function()
	{
		this.inherited(arguments);
	},
	onShowDetails: function()
	{
		var bNeedsConnect = undefined == this._details;
		this.inherited(arguments);
		if(bNeedsConnect && this._details) {	// only connect once
			this.connect(this._details.detailsWidget, "onRefresh", this._updateData);
		}
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardView", 
		[ibm.tivoli.simplesrm.srm.dijit.Overview.View, ibm.tivoli.simplesrm.srm.dijit.ShowMessageDetails],
{
	widgetsInTemplate: true,
	templateString: '<div>\n' +
					'	<div dojoType="ibm.tivoli.simplesrm.srm.dijit.Overview.DataTable" dojoAttachPoint="dataTable" heading="${tableCaption}"></div>\n' +
					'</div>\n',
	tableCaption: "",
	totalStr: "Total",
	showDetails: "Show details",
	constructor: function()
	{
		console.log("Overview.BBoardView.ctor");
	},
	postMixInProperties: function()
	{
		console.log("Overview.BBoardView.postMixInProperties");
		this.tableCaption = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").RecentActivity;
		this.totalStr =     dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Total;
		this.showDetails =	dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").ShowDetails;
		this.inherited(arguments);
	},
	setData: function(messages)
	{
		console.log("Overview.BBoardView.setData");
		this.clear();
		this._detailsData = messages;
		var status_stats = {srm_status_count: [], srm_unique_stati: 0};
		var l = messages.length;
		var maxoverview =  Math.min(5, l);
		
		if(l <= 0){
			this.dataTable.addRow(dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").NoRecentActivity, "");
		}
		else {
			for(var i = 0; i < l; ++i) {
				var cmr = messages[i];
				var status = cmr.StatusString;
				var dueDate = this._formatDate(cmr.POSTDATE);
				
				if(i < maxoverview) {
					var subj = cmr.SUBJECT;
					if (subj) {
						subj = dojo.trim(subj);
						if (subj.length > 200)  //truncate at 200. I beleive field len is 200
						   subj = subj.substring(0,200) + "...";
					}
					var newsubj = subj; 
						//If no spaces, then we add one so html will wrap
					if (subj && subj.length> 50 && (subj.indexOf(" ")<0 || subj.indexOf(" ")>50 ) ) {		   
						   newsubj = subj.substring(0,50) + "- " + subj.substring(50);
						   subj = newsubj;
					}
					if (subj && subj.length> 100 && (subj.indexOf(" ",52)<0 || subj.indexOf(" ",52)>100 ) ) {		   
						   newsubj = subj.substring(0,100) + "- " + subj.substring(100);	
						   subj = newsubj;
					}
					if (subj && subj.length> 150 && (subj.indexOf(" ",105)<0) ) {		   
						   newsubj = subj.substring(0,150) + "- " + subj.substring(150);	
						   subj = newsubj;
					}
					
					
					var link = "<a href='#req_"+ cmr.id +"' title='"+this.showDetails.htmlencode()+"'>" +(newsubj ? newsubj.htmlencode() : '...')+ "</a>";
					this.dataTable.addRow(link, dueDate);
				}
			}
			if(l > 0) {
				var links = dojo.query("a", this.dataTable.domNode);
				for(var i = 0; i < links.length; ++i) {
					this.connect(links[i], "onclick", this._showMessageDetails);
				}
			}			
		}
	},

	//launch My News dialog 
	_viewNews: function(bbUID)  
	{ 
		console.log("BBoardPod._viewNews - launch dialog  bbUID = ",bbUID);
		//var node = dojo.byId(this.id);
		arguments.caller=null; //running into a IE bug in stacktrace()
		
		var navid = "mx107";
	    var nav = dojo.query("div.srmnavigator");  //use id of navigator
	    if (nav.length>0)
		    navid = nav[0].id;	    
	    sendEvent("srmssviewmynews",  navid,  bbUID);		
	}, 
	clear: function()
	{
		this.dataTable.clear();
	},	
	_showMessageDetails: function(evt)
	{
		console.log("Overview.BBoardView._showMessageDetails:" + evt);
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
		try {
			var href = evt.target.href;
			var reqid = href.substring(href.lastIndexOf("_")+1);

			for(var i = 0; i < this._detailsData.length; ++i) {
				var req = this._detailsData[i];
				if(reqid == req.id) 
				{
					if (product!=null && product.indexOf("srm")>=0)
						this._viewNews(reqid);
					else
					{
						this.setApprContext(true);
						this.showRecordDetails(req);
					}
					break;
				}
			}
		}
		catch(ex){
			console.warn(ex);
		}
	}, 
	_formatDate: function(d) {
		if(d) {
			if(d.search("9999") === 0) {
				d = this._uiStringTable.ForeverLabel;
			}
			else {
				var isod = d.replace(' ', 'T');
				var format_opts = {fullYear:true, selector: "date"};
				var dt = dojo.date.stamp.fromISOString(isod);
				if(dt) {
					d = dojo.date.locale.format(dt, format_opts);
				}
			}
		}
		return d;
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardDetails", ibm.tivoli.simplesrm.srm.dijit.Overview.Details,
{
	headingText: "My News",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.MyBBoardMessagesGrid",
	
	//TODO: _cshKey identifies help...identify valid file
	_cshKey: "",
	
	constructor: function()
	{
		console.log("Overview.BBoardDetails.ctor");
		this.headingText = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").ManageMyNews;

		var localText = dojo.locale;
		var localMatch = localText.match(/-/gi);
		if(localMatch != null)
		{
			localText = localText.split('-')[0];
		}

      this._cshKey = "/help/index.jsp?topic=/com.ibm.sccd.doc/selfserv/c_my_news_pod.html";
		//this._cshKey = "/maximohelp/"+localText+"/mergedProjects/srmssctr/helpmynewspodgrid.htm";
	},
	refresh: function(data_set)
	{
		console.log("Overview.BBoardDetails.refresh");
		if (this.detailsWidget && this.detailsWidget._initialization_complete!=undefined && this.detailsWidget._initialization_complete!=true) {
			console.log("Overview.BBoardDetails.refresh- start MyMessagesGrid");
			this.detailsWidget.startup();
		}
		
		if(data_set) {
			this._detailsData = data_set;
			this.detailsWidget.clearGrid();
			this.detailsWidget._loadGrid(this._detailsData);
		}
		else {
			this.inherited(arguments);	// will refresh detailsWidget
		} 
	},
	resize: function()
	{
		this.inherited(arguments);
		this.detailsWidget.simpleGrid.resize();
	}
});

ibm.tivoli.simplesrm.srm.dijit.Overview.bboardpod = null;
ibm.tivoli.simplesrm.srm.dijit.Overview._BBoardPod = function(){
	// summary: returns the singleton bulletin board object
	if(!ibm.tivoli.simplesrm.srm.dijit.Overview.bboardpod){
		ibm.tivoli.simplesrm.srm.dijit.Overview.bboardpod = new ibm.tivoli.simplesrm.srm.dijit.Overview.BBoardPod(); 
	}
	return ibm.tivoli.simplesrm.srm.dijit.Overview.bboardpod;	// Object
};
ibm.tivoli.simplesrm.srm.dijit.Overview._BBoardPodTracking = function(){
	return ibm.tivoli.simplesrm.srm.dijit.Overview.isTracking;
};
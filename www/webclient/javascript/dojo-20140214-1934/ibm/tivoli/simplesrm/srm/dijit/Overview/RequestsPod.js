//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/Overview/RequestsPod", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!ibm/tivoli/simplesrm/srm/dijit/Overview/Pod,ibm/tivoli/simplesrm/srm/dojo/data/srmQuery,dojo/DeferredList,ibm/tivoli/simplesrm/srm/dijit/BaguetteChart,ibm/tivoli/simplesrm/srm/dijit/MyCatalogRequestsGrid"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsView");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestDetails");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestRefresh");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("dojo.DeferredList");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.BaguetteChart");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyCatalogRequestsGrid");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod", ibm.tivoli.simplesrm.srm.dijit.Overview.Pod,
{
	viewType: "ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsView",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.Overview.RequestDetails",
	autoRefreshProperty: "RequestsAutoRefresh",
	//configurable Pod parms
	os: 'SRM_SR',   
    sr_object: 'SR',   
	fd: '', //'SRM_SRUSRLIST'
	view_dialog: 'srmssviewsr',	
	label: "",
	cols: '',
	
	postMixInProperties: function()
	{		
		console.log("Overview.RequestsPod.postMixInProperties os = " + this.os + " fd = "+ this.fd + " view_dialog = " + this.view_dialog + " ticket_object = " + this.sr_object );
		try {
		   //Get Pod headings from bundle
		   var key = this.sr_object +  'RequestPodHeading'; //default bundle key = SRRequestPodHeading
		   this.heading = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		   
		   var key = this.sr_object + 'ShowMyRequestsLink';  
		   this.detailsLinkLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		   this.detailsUrl = "#requests";
		} catch(ex) {
			 console.log("Overview.RequestsPod.postMixInProperties - " + ex);
			 //Use control label as heading as last resort 
			 if ((this.heading==null || this.heading=="") && this.label!=null && this.label.length>0)
			     this.heading = this.label;
			 else
				 this.heading = "My Requests";
			 this.detailsLinkLabel = "Show All My Requests...";
		}
		
		this.inherited(arguments);
	},

	constructor: function()
	{
		console.log("Overview.RequestsPod.constructor ");
		if(invalidRequestGridColumnName != "")
		{
			//alert("Columns : "+invalidRequestGridColumnName+", configured for the 'Show All My Requests' dialog in the My Requests Pod do not exist. Edit the Self Service Center application and correct the columns property.");
			var invalidCol1 = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").InvalidColumn1;
			var invalidCol2 = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").InvalidColumn2;
			alert(invalidCol1 +" "+invalidRequestGridColumnName +", "+invalidCol2);
		}
		//dojo.subscribe("refreshpod", this, "_poll");  //not used now that  RequestRefresh is called when create SR dialog button is clicked 				
	},

	postCreate: function()
	{
		//ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPodID = this.id;
		var params = [];
		params._maxItems=10; //Get 10 at startup		
		this.refresh(params);
		this.inherited(arguments);
	},
	/**
	 * Requery my data and update my UI
	 */
	refresh: function(params) {
		console.log("RequestsPod.refresh()");
		this._cancelPoll();
		if (params==undefined) 
		   params = [];
		if (this.fd && this.fd!='')
		   params._fd = this.fd;  //filtering domain
		params.os = this.os;   //OS name
		params.sr_object = this.sr_object;  //Main object
		
		if (!params._maxItems)  //Get 500 max if amount not passed in
		   params._maxItems=500;  
		
		var amt = parseInt(ibm.tivoli.tpae.dojo.data.getConfigProperty("MaxRequestsPodRecords"),10);
		if (!isNaN(amt) && amt > 0) {
         params._maxItems=amt;  
		}
		params._orderbydesc="changedate";	

		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getServiceRequests(params);
		dq.addCallbacks(dojo.hitch(this, this._updateData), dojo.hitch(this, this._refreshError));
	},

	/**
	 * Update the UI, given a new data set
	 */
	_lastRequestId : null,	 
	_updateData: function(response)
	{
		try {
			this._cancelPoll();
			this._refreshErrorCount = 0;
			var requests = response.Requests;
			if(this._detailsData === requests){
				return;
			}
			requests.sort(function(a, b) 
			{
				// sort descending
				return a.CHANGEDATE < b.CHANGEDATE ? 1 : a.CHANGEDATE > b.CHANGEDATE ? -1 : 0;
			});
			if (requests.length>0) {
				var dt = dojo.date.stamp.fromISOString(requests[0].CHANGEDATE);
				//shouldn't have to do this. However rest is ignoring seconds so it is returning the latest when it shouldn"t. That's a tpae bug.
				dt = dojo.date.add(dt, "minute", 1);  
				if(dt) {
					this._mostRecent = dt.getTime();
					this._lastRequestId = requests[0].TICKETUID;					 
				}
			}
			this._detailsData = requests;
			this._view.setData(requests);
			this._onDataReady();
		}
		catch(ex) {
			ibm.tivoli.logger.error("RequestsPod._updateData failure",ex);
		}
		finally {
			this._resetPoll();
		}
	},
	_poll: function()
	{
		console.log("RequestsPod._poll");
		var params = [];
		if (this.fd && this.fd!='')
		   params._fd = this.fd;  
		params.os = this.os;
		params.sr_object = this.sr_object;

		//Poll for new SRs or SRs that have changed
		//Get any SRs with a CHANGEDATE newer than most recent or ticketud > last one
		if(this._lastRequestId != null) {		 
			var lastChangeDate = dojo.date.stamp.toISOString(new Date(this._mostRecent));  	
			params.changedate= "~gt~" + lastChangeDate;			 
			params.ticketuid= "~gt~" + this._lastRequestId;
			params._opmodeor="1";
		}
 		
		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getServiceRequests(params);
		dq.addCallbacks(dojo.hitch(this, this._checkUpdateSR), dojo.hitch(this, this.__refreshError));
	},
	
	_checkUpdateSR: function(response)
	{
		this._cancelPoll();
		var requests = response.Requests;
		//Any new or modified SRs? 	 
		if(requests.length > 0 )		 
		//if(requests.length > 1 || (requests.length > 0  && this._lastRequestId == null) || (requests.length == 0  && this._lastRequestId != null))   	
			this.refresh();
		else
			this._resetPoll();
		
	},
	_onDataReady: function()
	{
		this.inherited(arguments);
	},	
		
	//Show All My Requests clicked
	onShowDetails: function()
	{
		var bNeedsConnect = undefined == this._details;

		// temporary 
		var col = dojo.fromJson(unescape(this.cols));
		colAttrNameArray = [];
		colAttrNameArray = new Array(col.cols.length);
		for (var colIter = 0; colIter < col.cols.length; colIter++) {
		    colAttrNameArray[col.cols[colIter].name.toUpperCase()] = col.cols[colIter].description;
		}
		
		//this.inherited(arguments);
		
		// lazy create
		if(!this._details) {
			dojo["require"](this.detailsType);
			//dojo.require(this.detailsType);		
			//dojo._loadModule(this.detailsType);
			
			var cls = dojo.getObject(this.detailsType);
			this._details = new cls({headingText: this.detailsLinkLabel});
		} else {
			if (this._details.detailsWidget.toolBar) //clear search field 
				this._details.detailsWidget.toolBar.searchField.searchField.value = "";
		}
		
		this._details.refresh(this._detailsData);
		this._details.show();			
		
		if(bNeedsConnect && this._details) {	// only connect once
			this.connect(this._details.detailsWidget, "onRefresh", this._updateData);
		}
		//pass view dialog and ObjectStructure parms to Grid 
		if (this._details && this._details.detailsWidget._setViewDialog) { 
			this._details.detailsWidget._setViewDialog(this.view_dialog);
			this._details.detailsWidget._setFD(this.fd);
			this._details.detailsWidget._setOS(this.os);
			this._details.detailsWidget._setTicketObject(this.sr_object);						 
		}
		
		this._details.detailsWidget.refresh(true); //Get to get all SRs for user
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsView", 
		[ibm.tivoli.simplesrm.srm.dijit.Overview.View, ibm.tivoli.simplesrm.srm.dijit.ShowRequestDetails],
{
	widgetsInTemplate: true,
	templateString: '<div>\n' +
					'	<div dojoType="ibm.tivoli.simplesrm.srm.dijit.BaguetteChart" barHeight="15" captionHeight="13" captionFontSize="10"\n' + 
					'			showTotal="true" totalLegend="${totalStr}"\n' + 
					'		dojoAttachPoint="baguetteChart" style="overflow:hidden; margin-bottom: 10px;"></div>\n' +
					'	<div dojoType="ibm.tivoli.simplesrm.srm.dijit.Overview.DataTable" dojoAttachPoint="dataTable" heading="${tableCaption}"></div>\n' +
					'</div>\n',
	tableCaption: "",
	totalStr: "Total",
	showDetais: "Show details",
	view_dialog: "srmssviewsr",
	constructor: function()
	{
		console.log("Overview.RequestsView.ctor");
	},
	postMixInProperties: function()
	{
		console.log("Overview.RequestsView.postMixInProperties");
		this.tableCaption = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").RecentActivity;
		this.totalStr =     dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Total;
		this.showDetails =	dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").ShowDetails;
		this.inherited(arguments);
	},
	
	//Store data in Pod view
	setData: function(requests)
	{
		this.clear();

		//get sr/incident status count
		if ( requests && requests.length>0) {
			sendXHREvent("pmsc_getTicketStatusCount", "my_requests_pod", this.getParent().sr_object, REQUESTTYPE_HIGHASYNC, "json", "application/json",  //hardcoding pod id is not good
				dojo.hitch(this,this._getTicketStatusCount),				
			   	function(response) {
			           console.error("RequstsPod.setData() - sendXHREvent error - " + response);
		        }
		    );
	    }							
		
		this._detailsData = requests;
		//var status_stats = {srm_status_count: [], srm_unique_stati: 0};
		var l = requests.length;
		var maxoverview =  Math.min(5, l);  //only show most recent 5
		for(var i = 0; i < l; ++i) {
			var cmr = requests[i];
			var status = cmr.StatusString;
			if(i < maxoverview) {
				var desc = cmr.DESCRIPTION;
				if (desc) {
					desc = dojo.trim(desc);
					if (desc.length > 100)  //truncate at 100 even though field len is 100
					   desc = desc.substring(0,100) + "...";
				}
				var newdesc = desc; 
					//If no spaces, then we add one so html will wrap
				if (desc && desc.length> 50 && (desc.indexOf(" ")<0 || desc.indexOf(" ")>50 ) ) {		   
					   newdesc = desc.substring(0,50) + " " + desc.substring(50);				   	
				}
				var link = "<a href='#req_"+ cmr.id +"' title='"+this.showDetails.htmlencode()+"'>" +(newdesc ? newdesc.htmlencode() : '...')+ "</a>";
				this.dataTable.addRow(link, status);  //add SR row to table
			}
			/*if('number' == typeof status_stats.srm_status_count[status]) {
				++status_stats.srm_status_count[status];
			}
			else {
				status_stats.srm_status_count[status] = 1;
				++status_stats.srm_unique_stati;
			}*/
		}
		if(l > 0) {
			var links = dojo.query("a", this.dataTable.domNode);
			for(var i = 0; i < links.length; ++i) {
				this.connect(links[i], "onclick", this._showRequestDetails);
			}
		}
		if(l > 0){
			//this._refreshBaguetteChart(status_stats);
		}
		else{ 
			this.dataTable.addRow(dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").NoRecentActivity, "");
		}
	},
	
	//Process server async call to get count of SR/incident status for baguette 
	_getTicketStatusCount: function(response) {
		console.log("Navigator._getSRStatusCount_resp:" + response);
		var domain = this.getParent().sr_object + "STATUS";  //SRSTATUS or INCIDENTSTATUS 
		var statusMap = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable(domain);
		var status_stats = {srm_status_count: [], srm_unique_stati: 0};
		for (var status in response) {			
			status_stats.srm_status_count[statusMap.descriptionByValue(status)] = response[status];
		}
		status_stats.srm_unique_stati = status_stats.srm_status_count.length;
		this._refreshBaguetteChart(status_stats);
	},
	

	//launch View SR dialog 
	_viewSR: function(ticketUID)  
	{ 
		console.log("RequestsPod._viewSR: launch dialog - " + this.view_dialog + " ticketUID = ",ticketUID);
		//var node = dojo.byId(this.id);
		arguments.caller=null; //running into a IE bug in stacktrace()		
		var navid = "mx107";
	    var nav = dojo.query("div.srmnavigator");  //use id of navigator
	    if (nav.length>0)
		    navid = nav[0].id;	    
		sendEvent(this.view_dialog,  navid,  ticketUID);
	},
	clear: function()
	{
		this.dataTable.clear();
		if(this.baguetteChart){
			this.baguetteChart.setData([]);
		}
	},	
	_refreshBaguetteChart: function(status_stats)
	{
		if(!this.baguetteChart){
			return;
		}

		console.log("Overview.RequestsView._refreshBaguetteChart: refreshing");

		var counts = status_stats.srm_status_count;
		counts.sort();
		// set stripe graph data using colors generated by walking around the color wheel
		var stripeData = [];
		for(var s in counts) {
			stripeData.push({name: s, value: counts[s], color: ibm.tivoli.simplesrm.srm.dijit.BaguetteChart.getDefaultColor(s)});
		}
		this.baguetteChart.setData(stripeData);
	},
	_showRequestDetails: function(evt)
	{
		console.log(evt);
		try {
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			var href = evt.target.href;
			var reqid = href.substring(href.lastIndexOf("_")+1);
			console.log("RequestsPod._showRequestDetails(%s)", reqid);
			for(var i = 0; i < this._detailsData.length; ++i) {
				var req = this._detailsData[i];
				if(reqid == req.id) {
					console.log("RequestsPod._showRequestDetails reqid = ", req.id);
					if (product!=null && product.indexOf("srm")>=0)
						this._viewSR(reqid);
					else
						this.showRecordDetails(req);
					break;
				}
			}
		}
		catch(ex){
			console.warn(ex);
		}
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestDetails", ibm.tivoli.simplesrm.srm.dijit.Overview.Details,
{
	headingText: "Manage Requests",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.MyCatalogRequestsGrid",
	
	_cshKey: "",
	
	constructor: function()
	{
		//var key = "SR" + "MyRequests";
		/*
		var key = this.sr_object +  'RequestPodHeading';
		try {			  
		    this.headingText = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		} catch(ex) {
			console.log("Overview.RequestDetails.constructor - " + ex);
			this.headingText = "My Requests";
		}
		if (this.headingText==undefined) {
			console.log("Overview.RequestDetails.constructor:  undefined key - " + key);
			this.headingText = "My Requests";
		}
		*/

		var localText = dojo.locale;
		var localMatch = localText.match(/-/gi);
		if(localMatch != null)
		{
			localText = localText.split('-')[0];
		}
		
      this._cshKey = "/help/index.jsp?topic=/com.ibm.sccd.doc/selfserv/c_my_requests_pod.html";
		//this._cshKey = "/maximohelp/"+localText+"/mergedProjects/srmssctr/helpmyrequestpodgrid.htm";
	},
	refresh: function(data_set)
	{
	     //startup not called in dojo 1.4!  added this code 		
		if (this.detailsWidget && this.detailsWidget._initialization_complete!=undefined && this.detailsWidget._initialization_complete!= true) {
			console.log("RequestsPod.Overview.RequestDetails - start MyRecordsGrid");
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
		//var containerSz = dojo.contentBox(this.containerNode)
		//dojo.style(this.detailsWidget.id + "_grid_container", "height", containerSz.h + "px");
		this.detailsWidget.simpleGrid.resize();
		this.detailsWidget.baguetteChart.resize();
	}
});

//ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPodID = null;  //Is there an easier way to get pointer to Pod?

//This is used to refresh the My Requests Pod
//Called from mxeventjshandler srmbutton property (when button is clicked)
ibm.tivoli.simplesrm.srm.dijit.Overview.RequestRefresh = function(comp, eventType, eventValue, requesttype, piggyBack) {
    console.log('ibm.tivoli.simplesrm.srm.dijit.Overview.RequestRefresh: comp.id=' + comp.id + ', eventType=' + eventType + ', eventValue=' + eventValue + ', requesttype=' + requesttype + ', piggyBack=' + piggyBack);
    var ws = dijit.registry.byClass("ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod");  //returns WidgetSet
    ws.forEach(function(pod, index, hash){    	
    	//var pod = dijit.byId(ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPodID);
        if (pod.sr_object=='SR') {  //not ideal
        	pod._cancelPoll();  	 
        	window.setTimeout( function(){ pod._poll(); return null; }, 1000 );  //wait until server does it's work    	
        }
    	  
   	});    
    
	return REQUESTTYPE_SYNC;
};
});

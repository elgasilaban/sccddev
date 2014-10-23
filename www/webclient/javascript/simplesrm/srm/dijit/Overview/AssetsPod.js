//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsPod");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsView");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetDetails");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("dojo.DeferredList");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.BaguetteChart");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyAssetsGrid");
//dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyCatalogRequestsGrid");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsPod", ibm.tivoli.simplesrm.srm.dijit.Overview.Pod,
{
	viewType: "ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsView",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.Overview.AssetDetails",
	autoRefreshProperty:  "AssetsAutoRefresh",
	//configurable Pod parms
	os: 'MXASSET',   
    sr_object: 'ASSET',   
	fd: '',
	view_dialog: 'srmssviewasset',	
	label: "",
	
	postMixInProperties: function()
	{		
		console.log("Overview.AssetsPod.postMixInProperties os = " + this.os + " fd = "+ this.fd + " view_dialog = " + this.view_dialog + " ticket_object = " + this.sr_object );
		try {
		   //Get Pod headings from bundle
		   var key = 'AssetsPodHeading'; //default bundle key = SRRequestPodHeading
		   this.heading = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		   
		   var key = 'ShowMyAssetsLink';  
		   this.detailsLinkLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		   this.detailsUrl = "#requests";
		} catch(ex) {
			 console.log("Overview.AssetsPod.postMixInProperties - " + ex);
			 //Use control label as heading as last resort 
			 if ((this.heading==null || this.heading=="") && this.label!=null && this.label.length>0)
			     this.heading = this.label;
			 else
				 this.heading = "My Assets";
			 this.detailsLinkLabel = "Show All My Assets...";
		}
		
		this.inherited(arguments);
	},

	constructor: function()
	{
		console.log("Overview.AssetsPod.constructor ");
		if(invalidAssetGridColumnName != "")
		{
			//alert("Columns : "+invalidRequestGridColumnName+", configured for the 'Show All My Requests' dialog in the My Requests Pod do not exist. Edit the Self Service Center application and correct the columns property.");
			var invalidCol1 = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").InvalidColumn1;
			var invalidCol2 = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").InvalidColumn2;
			console.error(invalidCol1 +" "+invalidAssetGridColumnName +", "+invalidCol2);
			//alert(invalidCol1 +" "+invalidAssetGridColumnName +", "+invalidCol2);
		}
		dojo.subscribe("refreshpod", this, "_poll");
	},

	postCreate: function()
	{
		this.refresh();
		this.inherited(arguments);
	},
	
	/**
	 * Requery my asset data and update my UI
	 */
	refresh: function()
	{
		this._cancelPoll();
		var params = {};
		if (this.fd!=null && this.fd!='')
		   params._fd = this.fd;  //filtering domain
		params.os = this.os;   //OS name
		params.sr_object = this.sr_object;  //Main object

		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getAssets(params);
		dq.addCallbacks(dojo.hitch(this, this._updateData), dojo.hitch(this, this._refreshError));
	},

	/**
	 * Update the UI, given a new data set
	 */
	_firstStatusDate : null,      //used in polling
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
			//save newest status date
			if (requests.length>0) {
				var dt = dojo.date.stamp.fromISOString(requests[0].CHANGEDATE);
				if(dt) {
					this._mostRecent = dt.getTime();
					dt.setTime(this._mostRecent+60000);		//add a minute so polling gets only newest 				
					this._firstStatusDate = dojo.date.stamp.toISOString(dt); 				 
				}				
			}		 
			 				
			
			this._detailsData = requests;
			this._view.setData(requests);
			this._onDataReady();
		}
		catch(ex) {
			ibm.tivoli.logger.error("Overview.AssetsPod._updateData failure",ex);
		}
		finally {
			this._resetPoll();
		}
	},
	
	//Check if any assets have a more recent changedate 
	_poll: function()
	{
		//may need a better approach to seeing if anything changed.
		var params = {};
		if (this.fd && this.fd!='')
		   params._fd = this.fd;  //Pod properties
		params.os = this.os;
		params.sr_object = this.sr_object;

		if(this._firstStatusDate != null)			
		    params.changedate = "~gt~" +this._firstStatusDate; 		
		var dq = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getAssets(params);
		dq.addCallbacks(dojo.hitch(this, this._checkUpdateAssets), dojo.hitch(this, this.__refreshError));
	},
	
	//If any assets have a newer status date, then refresh the pod
	_checkUpdateAssets: function(response) 	{
		this._cancelPoll();
		var requests = response.Requests;
		if(requests.length > 0) 
			this.refresh();
		else
			this._resetPoll();		
	},
	
	_onDataReady: function()
	{
		this.inherited(arguments);
	},

	//called when yuo click Show All My Assets
	onShowDetails: function()
	{
		var bNeedsConnect = undefined == this._details;
		this.inherited(arguments);
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
	}
});

//Handles the main view of the top 5 items.
//Contains BaguetteChart, Overview.DataTable
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetsView", 
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
	view_dialog: "srmssviewsr",  //TODO
	constructor: function()
	{
		console.log("Overview.AssetsView.ctor");
	},
	
	postMixInProperties: function()
	{
		console.log("Overview.AssetsView.postMixInProperties");
		this.tableCaption = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").AssetActivity;
		this.totalStr =     dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Total;
		this.showDetails =	dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").ShowDetails;
		this.inherited(arguments);
	},
	
	//Add top 5 rows based on status date
	setData: function(requests)
	{
		this.clear();
		this._detailsData = requests;
		var status_stats = {srm_status_count: [], srm_unique_stati: 0};
		var l = requests.length;
		var maxoverview =  Math.min(5, l);
		for(var i = 0; i < l; ++i) {
			var cmr = requests[i];
			var status = cmr.StatusString;
			if(i < maxoverview) {
				var link = "<a href='#req_"+ cmr.id +"' title='"+this.showDetails.htmlencode()+"'>" +(cmr.ASSETNUM ? cmr.ASSETNUM.htmlencode() : '...')+ "</a>";
				//var link = "<a href='#req_"+ cmr.id +"' title='"+this.showDetails.htmlencode()+"'>" +(cmr.DESCRIPTION ? cmr.DESCRIPTION.htmlencode() : '...')+ "</a>";
				this.dataTable.addRow(link, status);
			}
			if('number' == typeof status_stats.srm_status_count[status]) {
				++status_stats.srm_status_count[status];
			}
			else {
				status_stats.srm_status_count[status] = 1;
				++status_stats.srm_unique_stati;
			}
		}
		if(l > 0) {
			var links = dojo.query("a", this.dataTable.domNode);
			for(var i = 0; i < links.length; ++i) {
				this.connect(links[i], "onclick", this._showRequestDetails);
			}
		}
		if(l > 0){
			this._refreshBaguetteChart(status_stats);
		}
		else{ 
			this.dataTable.addRow(dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").NoAssetsAssigned, "");
		}
	},

	
	//launch View asset dialog 
	_viewAsset: function(assetID)  
	{ 
		console.log("Overview.AssetsView._viewAsset: launch dialog - " + this.view_dialog + " ticketUID = ",assetID);		
		arguments.caller=null; //running into a IE bug in stacktrace()
		
	    var navid = "mx107";
	    var nav = dojo.query("div.srmnavigator");  		
	    if (nav.length>0)
		    navid = nav[0].id;
	    sendEvent(this.view_dialog,  navid,  assetID);
	},
	
	//clear table
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

		console.log("Overview.AssetsView._refreshBaguetteChart: refreshing");

		var counts = status_stats.srm_status_count;
		counts.sort();
		// set stripe graph data using colors generated by walking around the color wheel
		var stripeData = [];
		for(var s in counts) {
			stripeData.push({name: s, value: counts[s], color: ibm.tivoli.simplesrm.srm.dijit.BaguetteChart.getDefaultColor(s)});
		}
		this.baguetteChart.setData(stripeData);
	},
	
	//Called when you click a row in the table to display the asset dialog
	_showRequestDetails: function(evt)
	{
		console.log(evt);
		try {
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			var href = evt.target.href;
			var reqid = href.substring(href.lastIndexOf("_")+1);
			console.log("Overview.AssetsView._showRequestDetails(%s)", reqid);
			for(var i = 0; i < this._detailsData.length; ++i) {
				var req = this._detailsData[i];
				if(reqid == req.id) {
					console.log("Overview.AssetsView._showRequestDetails reqid = ", req.id);					
					this._viewAsset(reqid);					
					break;
				}
			}
		}
		catch(ex){
			console.warn(ex);
		}
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.AssetDetails", ibm.tivoli.simplesrm.srm.dijit.Overview.Details,
{
	headingText: "Manage Requests",
	detailsType: "ibm.tivoli.simplesrm.srm.dijit.MyAssetsGrid",
	
	_cshKey: "",
	
	constructor: function()
	{
		//TODO 
		var key = "MyAssets";
		//var key = this.sr_object + "MyRequests";
		try {			  
		    this.headingText = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable")[key];
		} catch(ex) {
			console.log("Overview.AssetDetails.constructor - " + ex);
			this.headingText = "My Assets";
		}
		if (this.headingText==undefined) {
			console.log("Overview.AssetDetails.constructor:  undefined key - " + key);
			this.headingText = "My Assets";
			
		}

		var localText = dojo.locale;
		var localMatch = localText.match(/-/gi);
		if(localMatch != null)
		{
			localText = localText.split('-')[0];
		}
		
      this._cshKey = "/help/index.jsp?topic=/com.ibm.sccd.doc/selfserv/c_my_assets_pod.html";
		//this._cshKey = "/maximohelp/"+localText+"/mergedProjects/srmssctr/helpmyrequestpodgrid.htm";
	},
	
	refresh: function(data_set)
	{
	     //fpb - startup not called in dojo 1.4!  added this code 		
		if (this.detailsWidget && this.detailsWidget._initialization_complete!=undefined && this.detailsWidget._initialization_complete!= true) {
			console.log("Overview.AssetDetails.refresh - start AssetsGrid");
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


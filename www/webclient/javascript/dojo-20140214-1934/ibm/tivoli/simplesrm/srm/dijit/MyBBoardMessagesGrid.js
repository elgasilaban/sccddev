//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/MyBBoardMessagesGrid", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/simplesrm/srm/dijit/MyRecordsGrid,ibm/tivoli/simplesrm/srm/dijit/MessageDetails,dijit/Dialog"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.MyBBoardMessagesGrid");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.ShowMessageDetails");

// include modules
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyRecordsGrid");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MessageDetails");
dojo.require("dijit.Dialog");


// Summary:
//	A mixin for showing message details.
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.ShowMessageDetails",
			 ibm.tivoli.simplesrm.srm.dijit.CreatorFactory,
{
	_approveRights: false,

	popup: null,
	
	showRecordDetails: function(selected_record)
	{
		if(this.popup) {
			this.popup.destroy();
			this.popup = null;
		}
		if(selected_record) {
			console.log("ShowMessageDetails", selected_record);
			var rd = new ibm.tivoli.simplesrm.srm.dijit.MessageDetails({approval: this._approveRights});
			rd.setData(selected_record);

			/*var d = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMessageDetails(selected_record);
			d.addCallback(dojo.hitch(this, function(response)
			{
				var rd = new ibm.tivoli.simplesrm.srm.dijit.MessageDetails({approval: this._approveRights});
				rd.setData(response);
			})); */
		}
	},
	
	/**
	 * Specify whether the parent grid allows the approval panel to be displayed
	 * or not.
	 */
	setApprContext: function(approvalContext) {
		this._approveRights = approvalContext;
	}
});

// Format Grid
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.MyBBoardMessagesGrid", 
	[dijit._Widget, ibm.tivoli.simplesrm.srm.dijit.MyRecordsGrid, ibm.tivoli.simplesrm.srm.dijit.ShowMessageDetails],
{
 
	// constructor defines "static" properties for this class, and
	// declares "instance" properties for this class
	constructor: function()
	{
		console.log("MyBBoardMessagesGrid.ctor");
		
//		this._hoverer = new  ibm.tivoli.simplesrm.srm.dojo.Hoverer();
//		this._conn_onHover = dojo.connect(this._hoverer, "OnHover", this, "_showGridTooltip");
		
 		// the column definitions
 		// the order they are listed here is the order they will be displayed in the tooltip
		this._column_defs = [
			 {field: 'key',			name: "",							 	width: '10%',	compare: dojo.hitch(this, "_sortDefault"), showInTooltip: false}
			,{field: 'id', 			name: 'id',								width: '10%',	compare: dojo.hitch(this, "_sortNumber")}
			,{field: 'type', 		name: "Object Type",					width: '10%',	compare: dojo.hitch(this, "_sortString"), showInTooltip: false}
			,{field: 'SUBJECT',		name: this._uiStringTable.Subject, 	    width: '20%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")}
			,{field: 'MESSAGE',     name: this._uiStringTable.Message,  	width: '40%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringHtml")}
			,{field: 'POSTDATE',    name: this._uiStringTable.PostDate,     width: '15%',   compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatDateTimeReally")}
			,{field: 'EXPIREDATE',  name: this._uiStringTable.ExpireDate,   width: '15%',   compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatDateTimeReally")}
			,{field: 'StatusString',name: this._uiStringTable.Status,		width: '5%',	compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe")}
		];
		
		//,{field: 'ISVIEWED',    name: this._uiStringTable.MsgViewed,    width: '5%',    compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe")}
		
		var tracking = ibm.tivoli.simplesrm.srm.dijit.Overview._BBoardPodTracking();
		if(tracking == "1")
		
		{
			this._column_defs.push({field: "ISVIEWED",  name: this._uiStringTable.MsgViewed,   width: '5%',  compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")});
			this._initial_view_cols = [3, 4, 5, 6, 8];
		}
		else
		{
			this._initial_view_cols = [3, 4, 5, 6];
		}
		
		this._data_key_field = 0;
		this._initial_sort_index = 2;	 	// change date (column index, not field index)
		this._initial_sort_asc = false;		// descending
		
		// query parameters
		this._queryErrorMessage = "CTJZH2361E";

	},
	ajaxQueryData: function()
	{
		return ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getBBoardMessages();

	},
	
	// load handler for the data query
	_processQueryResult: function(response)
	{
		if(!dojo.isArray(response.Requests)) {
			response.requests = [];
		}
		
		var messages = ibm.tivoli.simplesrm.srm.dijit.Overview._BBoardPod()._processMessages(response.Requests);
		
		this._loadGrid(messages);
		return this.inherited(arguments);
	},

	_dummy:null
});

});

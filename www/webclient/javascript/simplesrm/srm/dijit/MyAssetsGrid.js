//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.MyAssetsGrid");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.ShowAssetDetails");
//dojo.provide("ibm.tivoli.simplesrm.srm.dijit.MyApprovalsGrid");

// include modules
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyRecordsGrid");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.RequestDetails");
dojo.require("dijit.Dialog");


// Summary:
//	A mixin for showing request details.
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.ShowAssetDetails",
			 ibm.tivoli.simplesrm.srm.dijit.CreatorFactory,
{

	popup: null,
	
	showRecordDetails: function(selected_record)
	{
		//this.createAndShowInputForm(selected_record, true);
		if(this.popup) {
			this.popup.destroy();
			this.popup = null;
		}
		if(selected_record) {
			console.log("ShowAssetDetails", selected_record);
			var d = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestDetails(selected_record);
			d.addCallback(dojo.hitch(this, function(response)
			{
				var rd = new ibm.tivoli.simplesrm.srm.dijit.RequestDetails({approval: false});
				rd.setData(response);
			}));
		}
	}
	
	/**
	 * Specify whether the parent grid allows the approval panel to be displayed
	 * or not.
	 */
	//setApprContext: function(approvalContext) {
	//	this._approveRights = approvalContext;
	//}
});

// Summary:
//	TODO: write this
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.MyAssetsGrid",
	[dijit._Widget, ibm.tivoli.simplesrm.srm.dijit.MyRecordsGrid, ibm.tivoli.simplesrm.srm.dijit.ShowAssetDetails],
{
 
	// constructor defines "static" properties for this class, and
	// declares "instance" properties for this class
	constructor: function()
	{
		console.log("MyAssetsGrid.ctor");
		
        //this._hoverer = new  ibm.tivoli.simplesrm.srm.dojo.Hoverer();
        //this._conn_onHover = dojo.connect(this._hoverer, "OnHover", this, "_showGridTooltip");
		
 		// the column definitions
 		// the order they are listed here is the order they will be displayed in the tooltip
		
		//Default asset grid columns
		//Columns can also be set via colAssetAttrNameArray global var set in assetspod jsp using assetspod control columns property 
		this._column_defs = [
				 {field: 'key',			 name: "",							 	width: '5%',	compare: dojo.hitch(this, "_sortDefault"), showInTooltip: false}
				,{field: 'id', 			 name: 'id',							width: '5%',	compare: dojo.hitch(this, "_sortNumber")}
				,{field: 'type', 		 name: "Object Type",					width: '5%',	compare: dojo.hitch(this, "_sortString"), showInTooltip: false}
				,{field: 'ASSETNUM',     name: this._uiStringTable.AssetNumber,	width: '10%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")}
				,{field: 'SERIALNUM',    name: this._uiStringTable.Serial,      width: '10%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")}				
				,{field: 'DESCRIPTION',  name: this._uiStringTable.Description,	width: '25%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")}
				,{field: 'StatusString', name: this._uiStringTable.Status,		width: '5%',	compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe")}
				,{field: 'LOCATION',     name: this._uiStringTable.Location,    width: '10%',	compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, "_formatStringSafe")}				
				,{field: 'REFRESHDATE',   name: this._uiStringTable.RefreshDate,  width: '10%',  compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatDateTimeReally")}
				,{field: 'PLANNEDREFRESHDATE',   name: this._uiStringTable.PlannedRefreshDate,  width: '10%',  compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatDateTimeReally")}		
				,{field: 'ISPRIMARY',    name: this._uiStringTable.IsPrimary,   width: '5%',	compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe"), editable: true,  type: dojox.grid.cells.Bool}
				,{field: 'ISUSER',       name: this._uiStringTable.IsUser,	    width: '5%',	compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe"), editable: true,  type: dojox.grid.cells.Bool}
				,{field: 'ISCUSTODIAN',  name: this._uiStringTable.IsCustodian, width: '5%',	compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatStringSafe"), editable: true,  type: dojox.grid.cells.Bool}
				,{field: 'CHANGEDATE',   name: this._uiStringTable.ChangeDate,  width: '10%',  compare: dojo.hitch(this, "_sortDefault"), formatter: dojo.hitch(this, "_formatDateTimeReally")}
		];
				 
		indeces = 1;
		this._initial_sort_index = 0;	 	// SR ID (column index, not field index)
		
		//colAssetAttrNameArray is set in assetspod jsp using assetspod control columns property
		if (colAssetAttrNameArray!=null && colAssetAttrNameArray.length>0) {
			
			this._initial_view_cols = [indeces+2];	// indecies into _column_defs
					
			for (key in colAssetAttrNameArray) {
  			    if(key == "STATUS")
					  key= "StatusString";
				
				//Does column key already exist in column defs?
				var exists = false;
				var index = -1;
				for (var i=0; i<this._column_defs.length;i++) {
				   var rec = this._column_defs[i];
				   if (rec.field ==key) {
						exists=true;
						index = i;
						break;						
					}
				} 
				
				//Add new record to column defs
				if (exists ==false) {				
				   formatString = "_formatStringSafe";
				   colWidth = '13%';

				   var dateMatch = key.match(/DATE/gi);
				   if(dateMatch != null)
					   formatString = "_formatDateTimeReally";
				
				   var widthMatch = key.match(/ID/gi);
				   if(widthMatch != null)
					  colWidth = '6%';

				   var colValue = key;
				   if(colValue == "STATUS")
					   colValue= "StatusString";
				   
				   this._column_defs.push({field: colValue,  name: colAttrNameArray[key],   width: colWidth,  compare: dojo.hitch(this, "_sortString"), formatter: dojo.hitch(this, formatString)});				
				   this._initial_view_cols[indeces++] = this._column_defs.length-1;
				   
				} else {  //column already in column def array
				   this._initial_view_cols[indeces++] = index;	
				}
			}			
		} else {
			this._initial_view_cols = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];  //default columns
		}	
				
			
		this._data_key_field = 0;
		this._initial_sort_asc = false;		// descending
		
		// query parameters
		this._queryErrorMessage = "CTJZH2360E";
	},


	ajaxQueryData: function()
	{
		var params = [];
		if (this._fd!=null)
		   params._fd = this._fd;  //filtering domain
		params.os = this._os;   //OS name
		params.sr_object = this._ticket_object;  //Main object

		return ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getAssets(params);
	},
	
	// load handler for the data query
	_processQueryResult: function(response)
	{
		if(!dojo.isArray(response.Requests)) {
			response.requests = [];
		}
		var requests = response.Requests;
		this._loadGrid(response.Requests);
		return this.inherited(arguments);
	},

	_dummy:null
});
 

 

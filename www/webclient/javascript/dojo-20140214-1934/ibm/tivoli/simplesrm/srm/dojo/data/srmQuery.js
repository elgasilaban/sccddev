//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dojo/data/srmQuery", ["dijit","dojo","dojox","dojo/require!dojo/DeferredList,ibm/tivoli/tpae/dojo/data/tpaeQuery,ibm/tivoli/simplesrm/srm/dojo/data/OfferingTree,ibm/tivoli/simplesrm/srm/dojo/data/SolutionTree,ibm/tivoli/simplesrm/srm/dojo/data/TemplatesTree,ibm/tivoli/simplesrm/srm/dojo/Utilities,dojox/xml/DomParser"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

/**
 * These classes provide all the data access for the UI.
 * The high-level get*() methods retrieve the data and reformat for
 * the UI's consumption.  If you want the raw data, call getObjectStore() directly.
 *  
 */

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data._srmQuery");

dojo.require("dojo.DeferredList");
dojo.require("ibm.tivoli.tpae.dojo.data.tpaeQuery");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.SolutionTree");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.TemplatesTree");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Utilities");
dojo.require("dojox.xml.DomParser");



//***** srmQuery *******
dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data._srmQuery", null,
{
	constructor: function()
	{
		dojo.mixin(this, ibm.tivoli.tpae.dojo.data.tpaeQuery());
	},
	
	_sigoptions: null,  //app sigoptions for user

	buildCCR: function(/*object*/form_data, /*object*/request_details,user_data){
		var create_data = {};
		create_data._compact = 1;
		
		/* PMSCCR attributes*/
		
		//normal
//		create_data.ORGID = user_data.SITE[0].ORGID;		
		
		//mandatory
//		create_data.SITEID = user_data.SITE[0].SITEID;
//		create_data.CHANGEBY = form_data.user;
//		create_data.CHANGEDATE ="2006-08-19T19:27:14+02:00";
		create_data.DESCRIPTION = form_data.Description;
//		create_data.HISTORYFLAG = false;
//		create_data.STATUS ="NEW";
		
		//genereted automatically by maximo
//		create_data.PMSCCRID = 10;
//		create_data.PMSCCRNUM = 10;
		
		return create_data;
	},
	buildSR: function(response,form_data,request_details,user_data){
		var create_data ={};
		var statusMap =  this.getDomainSynonymTable('SRSTATUS');	
		var classMap = this.getDomainSynonymTable('TKCLASS');
		var newsr = classMap.valueByMaxvalue('SR');
		
		//SR parameters
		create_data.CREATEDBY  = this.safeGetValue(form_data.requestedby, "");
		create_data.REPORTEDBY = form_data.user;
		
		if(undefined != form_data.RequestedStartDate && form_data.RequestedStartDate.length > 0){
			create_data.TARGETSTART = form_data.RequestedStartDate;
		}
		if(undefined != form_data.RequestedEndDate && form_data.RequestedEndDate.length > 0){
			create_data.TARGETFINISH = form_data.RequestedEndDate;
		}
		
		create_data.COMMODITY = request_details.COMMODITY;//"SRVDEPLY";//
		create_data.COMMODITYGROUP = request_details.COMMODITYGROUP;//"IT";//
		create_data.CLASS = newsr;
//		create_data.AFFECTEDDATE = user_data.PERSON[0].STATUSDATE;//TODO: fake value
		create_data.CLASSSTRUCTUREID = form_data.csid;
		create_data.DESCRIPTION = this.safeGetValue(form_data.Description, "TEST");//TODO: fake backup value
//		create_data.OWNER = user_data.USERID; //TODO: check if it's correct field
		create_data.PMSCCRID = response.CreateSRM_CARDCREATEResponse.SRM_CARDCREATESet.PMSCCR.PMSCCRNUM;
		create_data.PMSCITEMNUM = form_data.ItemNum;
//		create_data.REPORTDATE = user_data.PERSON[0].STATUSDATE;//TODO: fake value
//		create_data.STATUS = statusMap.valueByMaxvalue("DRAFT");
			
		create_data.ITEMNUM= form_data.ItemNum;
		create_data.ITEMSETID = form_data.ItemSetID;
		create_data.ORDERUNIT = this.safeGetValue(request_details.ORDERUNIT, "EACH"); 
		create_data.LINETYPE = request_details.ITEMTYPE;
		create_data.QTY = "1";
		
		//generate automatically by maximo
//		create_data.TICKETID = "10";
				
		//WCA is NOT suported right now - next, if this is a WCA offering, we include the variable parameter data
		var wca_params = /^PMRDPVSRPARM/;
		for(var fd in form_data) {
			if(wca_params.test(fd))
			{
				create_data[fd] = form_data[fd];
			}
		}
		
		return create_data;
	},
	updateSR: function(create_response,form_data,request_details,user_data){
		// by now, the base request has been created
		var me = this;
		// Query for basic things
		var statusMap =  me.getDomainSynonymTable('SRSTATUS');			
		var datatypeMap = me.getDomainSynonymTable('DATATYPE');
		var ALN = datatypeMap.valueByMaxvalue("ALN");
		var NUMERIC = datatypeMap.valueByMaxvalue("NUMERIC");
		var TABLE = datatypeMap.valueByMaxvalue("MAXTABLE");
		
					
		var line_data = {};
		var pdspecs = [];
		var sr = create_response.CreateSRM_SRCREATEResponse.SRM_SRCREATESet.SR;
		
		line_data = {id: sr.TICKETUID};
		line_data.PMSCCRID = sr.PMSCCRID;
		line_data.TICKETID = sr.TICKETID;
        line_data.TICKETUID = sr.TICKETUID;
//        line_data.STATUS = statusMap.valueByMaxvalue("NEW");
        line_data.SOURCE = "TSAMWEBUI"; // marker field to avoid race between escalations
		pdspecs = sr.TICKETSPEC;	
		
		// attribute data
		var nr = 0;
		dojo.forEach(pdspecs, function(pdspec,nr){
			var attr_det = pdspec.ASSETATTRIBUTE[0];
			var attr_val = form_data[pdspec.ASSETATTRID];
			var req = request_details.AttributeByID[pdspec.ASSETATTRID];
			
			if(attr_val === undefined && req){
				attr_val = req.ALNValue || req.ALNVALUE || req.NumValue || req.NUMVALUE || req.TABLEVALUE || req.TableValue;
			}
			
			if(undefined == attr_det || undefined == attr_val) {
				console.log("\tskipping ", pdspec.ASSETATTRID);
				return;
			}
			nr++;
			var attr_spec = "TICKETSPEC."+ nr + ".";

			line_data[attr_spec + "TICKETSPECID"] = pdspec.TICKETSPECID;
			line_data[attr_spec + "ASSETATTRID"] = pdspec.ASSETATTRID;
			line_data[attr_spec + "SECTION"] = "";
			line_data[attr_spec + "REFOBJECTID"] = pdspec.REFOBJECTID;		

			if(ALN == attr_det.DATATYPE) {
				line_data[attr_spec + "ALNVALUE"] = attr_val;
			}
			else if(NUMERIC == attr_det.DATATYPE) {
				line_data[attr_spec + "NUMVALUE"] = attr_val;
			}
			else if(TABLE == attr_det.DATATYPE) {	
				line_data[attr_spec + "TABLEVALUE"] = attr_val;
			}
			else {
				// TODO: now what?
				console.error("createRequest.unrecognized DATATYPE");
				return;	// skip this attribute for now
			}

		});		
		
		return line_data;
	},
	/*
	 * 
	 */
	createRequest: function(/*object*/form_data, /*object*/request_details)
	{
		var ret_deferred = new dojo.Deferred();
		var me = this;		
		var user_data = this.getLoggedInUser();
		var phase1 = null, phase2 = null, phase3 = null;
		
		var ccr_data = this.buildCCR(form_data, request_details, user_data);

		// Phase 1 error.  This function is only called if there is an error creating a CCR.
		var errorCCR = function(response){
			ibm.tivoli.logger.error("",new Error("srmQuery.createRequest: unable to create SRM_CARDCREATE, most likely bad data passed in create request. " + response));
			ret_deferred.errback("CTJZH2338E");
			return response;
		};
		//Phase 2 error
		var errorSR = function(response){
			ibm.tivoli.logger.error("",new Error("srmQuery.createRequest: error creating SRM_SR, most likely bad data passed in create request. " + response));
			ret_deferred.errback("CTJZH2338E");
			return response;
		};
		//Phase 3 error
		var errorUpdateSR = function(response){
			ibm.tivoli.logger.error("",new Error("srmQuery.createRequest: error updating SRM_SR, most likely bad data passed in create request. " + response));
			ret_deferred.errback("CTJZH2334E");
			return response;
		};

		// Completion!  Lastly, this function is called at the end if there is no error.
		var returnResult = function(response){	
			ret_deferred.callback(response);			
		};		
		
		// Phase 3. These functions get called to update the SR, or process an error updating the SR
		var updateSR = function(response){
			var final_data = me.updateSR(response,form_data, request_details, user_data);
			phase3 = me.postToObjectStructure("SRM_SRCREATE", true, final_data);
			phase3.addCallbacks(returnResult,errorUpdateSR);	// Update SR response (phase 3)
			return response;
		};
		// Phase 2.  These functions get called to create a SR, or process an error create the SR
		var createSR = function(response){
			var sr_data = me.buildSR(response,form_data, request_details, user_data);
			phase2 = me.postToObjectStructure("SRM_SRCREATE", true, sr_data);
			phase2.addCallbacks(updateSR,errorSR);				// Create SR response (phase 2)
			return response;
		};
		// Phase 1.  Yes it is a little backwards, but this is the code that starts of processing the request.  The first phase is to 
		// create the CCR.  If it succeeds it will proceed to phase 2.  If it fails it will call the CCR error function above.
		phase1 = me.postToObjectStructure("SRM_CARDCREATE", true, ccr_data);		
		phase1.addCallbacks(createSR,errorCCR);			// Create CCR response (phase 1)
		
		return ret_deferred;		
	},


	/**
	 * get the list of this user's service and catalog requests
	 */
	getRequests: function(params)
	{
		var deferred = null;
		if(undefined == params) {params = {};}
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString();
		
		if(params.ItemNum && params.ItemSetID) {
			// I've been given the ItemNum and ItemSetID. This means we want the offering details.
			// After calling the SRM_OFFERINGDET, transform the data to match what the 
			// TDI getrequestdetails request returned.  This way none of the application code relying
			// on the data has to change.

				// local helper to find the offering's classificationID
			function _getClassificationID(offering)
			{
				var classificationID = "";
				var offeringStructureID = offering.CLASSSTRUCTUREID;
				var n = undefined == offering.CLASSSTRUCTURE? 0 : offering.CLASSSTRUCTURE.length;
				for(var i = 0; i < n; ++i) {
					if(offering.CLASSSTRUCTURE[i].CLASSSTRUCTUREID == offeringStructureID) {
						classificationID = offering.CLASSSTRUCTURE[i].CLASSIFICATIONID;
						break;
					}
				}
				return classificationID;
			}

			// get the data
			console.log("srmQuery.getRequests() enter ", params);
			
         deferred = this.getObjectStructure("SRM_OFFERINGDET", {sync: _sync, _exactmatch: 1, ITEMNUM: params.ItemNum, ITEMSETID: params.ItemSetID});				 
			deferred.addCallback(dojo.hitch(this, function(response) {
				// swizzle the data to look like the TDI response
    			var noff = response.QuerySRM_OFFERINGDETResponse.SRM_OFFERINGDETSet.PMSCOFFERING[0];	// the new offering data
				var Request = [];
				var off =  {
					ClassStructureID: noff.CLASSSTRUCTUREID,
					ClassificationID: _getClassificationID(noff),
					Description: (undefined == noff.DESCRIPTION ? "" : _locale_debug + noff.DESCRIPTION),
					LongDescription: (undefined == noff.LONGDESCRIPTION ? undefined : _locale_debug + noff.LONGDESCRIPTION[0].LDTEXT),
					ImageName: undefined == noff.IMGLIB ? undefined : noff.IMGLIB[0].IMAGENAME,
					ItemID: noff.ITEMID,
					ItemNum: noff.ITEMNUM,
					ItemSetID: noff.ITEMSETID,
					//Price:  (undefined == noff.PRICE ? 0 : noff.PRICE),  
					//ORDERUNIT: noff.ORDERUNIT,
					ITEMTYPE: noff.ITEMTYPE,
					COMMODITY: noff.COMMODITY,
					COMMODITYGROUP: noff.COMMODITYGROUP,
					Status: noff.STATUS,
					Attribute: []
				};
				Request[0] = off;
				off.AttributeByID = {};
				
				var nattrs = noff.PMSCITEMSPEC;
				var num_attrs = nattrs.length;
				for(var i = 0; i < num_attrs; ++i) {
					var nattr = nattrs[i];					
					var offd =  noff.PMSCOFFDIALOG[i];
					var attr = {
						   AssetAttrID: nattr.ASSETATTRIBUTE[0].ASSETATTRIBUTEID,
						   DataType:    nattr.ASSETATTRIBUTE[0].DATATYPE,
						   Description: (undefined == nattr.ASSETATTRIBUTE[0].DESCRIPTION ? "" : _locale_debug + nattr.ASSETATTRIBUTE[0].DESCRIPTION),
						   DisplaySequence: nattr.DISPLAYSEQUENCE,						   
						   Hidden: offd.HIDDEN,
						   //MaxValue: not in new API,
						   ReadOnly: offd.READONLY,
						   Mandatory: offd.MANDATORY
					   };
					   if(undefined != nattr.NUMVALUE) {
						   attr.NumValue = nattr.NUMVALUE;
	     		     	}
		    			if(undefined != nattr.ALNVALUE){
			    			attr.ALNValue = nattr.ALNVALUE;
				    	}
					off.Attribute.push(attr);
					off.AttributeByID[attr.AssetAttrID] = attr;
				}
				response.Request = Request;	// Add the TDI style Request to the response
				this._patchRequestImageName(response.Request[0]);
				return response;
			}));
		}
		else if(undefined != params.id) {
			if("CMR" == params.type) {
				deferred = this.getObjectStructure("PMZHBR1_PMSCMR", {MRID: params.id});
			}
			else if("SR" == params.type) {
				deferred =  this.getObjectStructure("SRM_SR", {TICKETUID: params.id, _fd:"PMZHBT_SRUSRLIST", _verbose:"false"});
			}
		}
		return deferred;
	},

	/**
	 * Returns the details for a given request from the SRDET object structure.
	 * params.id is mandatory and contains the ID of the request.
	 */
	getRequestDetails: function(params) {
		console.log("srmQuery.getRequestDetails() enter ", params);
		deferred =  this.getObjectStructure("SRM_SRDET", {TICKETUID: params.id});
		return deferred;
	},
	getCatalogRequests: function(params)
	{
		// get the status domain we need
		var mrstatq = this.getDomain({DOMAINID: 'MRSTATUS'});
		// get the list of requests
		var cmrq = this.getObjectStructure("PMZHBR1_PMSCMR", params);

		deferred = new dojo.Deferred();	// this is the deferred returned by the function. (see comments in getProjectsServersFlat for details)
		deferred.addErrback(dojo.hitch(this, this._ajaxError));
		
		// when all the queries complete, add a "StatusString" property to each project with the pretty-formatted status
		var _queries = new dojo.DeferredList([mrstatq, cmrq]);
		_queries.addCallback(dojo.hitch(this, function(responses)
		{
			var reqs = [];
			// CMRS
			if(responses[1][0]) {
				var statusMap = this.getDomainSynonymTable('MRSTATUS');
				var cmrs = responses[1][1].QueryPMZHBR1_PMSCMRResponse.PMZHBR1_PMSCMRSet.PMSCMR;
				var count = undefined == cmrs ? 0 : cmrs.length;
				for(var i = 0; i < count; ++i) {
					try {
						var cmr = cmrs[i];
						
						req = {
							key: "CMR" + cmr.MRID,
							id: cmr.MRID,
							type: "CMR",
							STATUS: cmr.STATUS,
							StatusString: statusMap.descriptionByValue(cmr.STATUS),
							STATUSDATE: cmr.STATUSDATE,
							REQUESTEDBY: cmr.REQUESTEDBY,
							REQUESTEDFOR: cmr.REQUESTEDFOR,
							CHANGEDATE: cmr.CHANGEDATE,
							DESCRIPTION: cmr.DESCRIPTION ? cmr.DESCRIPTION : cmr.PMSCMRLINE[0].DESCRIPTION,
							item: cmr
						};
						reqs.push(req);
					}
					catch(ex) {
						ibm.tivoli.logger.error("srmQuery._getRequests: error processing CMR " + i,ex);
						deferred.errback(responses[1][1]);
					}
				}
				deferred.callback({Requests: reqs});	// call the callback the caller would have added
			}
			else {
				deferred.errback(responses[1][1]);	
			}
			return responses;		
		}));
		return deferred;
	},
	
	getServiceRequests: function(params)
	{
		var deferred = null;
		if(undefined == params) { params = {}; }
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString();		
		
		var os_name = "SRM_SR";   //default OS name
		if (params.os!=undefined) {		
			os_name = params.os;	
			params.os=null;
		}
		var sr_object = "SR";    //default object(mbo)
		if (params.sr_object!=undefined) {		
			sr_object = params.sr_object;	
			params.sr_object=null;
		}
		
		//Add timestamp to request to avoid IE caching problem. IE is caching request and not sending it.
		//Fixed in 7.5.0.1
		//if (dojo.isIE) {
		//   var timestamp =  new Date().valueOf();  
		//   params._preventCache = timestamp;
		//}
		
		if(undefined == params.id) {
			// get the status domain we need
			var srstatq = this.getDomain({DOMAINID: 'SRSTATUS'});
			
			//if(undefined == params._fd || params._fd!="") {				 	
				   //params._fd = "SRM_SRUSRLIST";	// limit to SRs the logged in user may see				 
			//}
			
			// get the list of requests
			params._verbose=false;
			var srq =  this.getObjectStructure(os_name, params);  

			deferred = new dojo.Deferred();	// this is the deferred returned by the function. 
			deferred.addErrback(dojo.hitch(this, this._ajaxError));
			
			// when all the queries complete, add a "StatusString" property to each SR with the pretty-formatted status
			var _queries = new dojo.DeferredList([srstatq, srq]);
			_queries.addCallbacks(dojo.hitch(this, function(responses)
			{
				var reqs = [];
				
				// SRs
				if(responses[1][0]) {
					var statusMap = this.getDomainSynonymTable('SRSTATUS');
					var srs;
					
					var query_response = "Query" + os_name + "Response";  //"QuerySRM_SRResponse"
					var srset_response = os_name + "Set";  //"SRM_SRSet"
										 
					//This is equivalent to responses[1][1].QuerySRM_SRResponse.SRM_SRSet.SR;
				    srs = responses[1][1][query_response][srset_response][sr_object];			       
					 
					var count = undefined == srs ? 0 : srs.length;
					for(var i = 0; i < count; ++i) {
						try {
							var sr = srs[i];
						
							req = {
								key: "SR" + sr.TICKETUID,
								id: sr.TICKETUID,
								type: "SR",
								StatusString: statusMap.descriptionByValue(sr.STATUS),
								REQUESTEDBY: sr.CREATEDBY, 
								REQUESTEDFOR: sr.AFFECTEDPERSON,
								item: sr
							}

							for (var name in sr)
							{
								req[name] = sr[name];
							}

							reqs.push(req);
						}
						catch(ex) {
							ibm.tivoli.logger.error("srmQuery._getServiceRequests: error processing SR " + i,ex);
							if(deferred.fired < 0) {
								deferred.errback(responses[1][1]);
							}
						}
					}
				}
				else {
					if(deferred.fired < 0) {
						deferred.errback(responses[1][1]);
					}
				}	
				if(deferred.fired < 0) {
					deferred.callback({Requests: reqs});	// call the callback the caller would have added
				}
				return responses;		
			}), function(responses) 
			{
				if(deferred.fired < 0) {
					deferred.errback(new Error("srmQuery.getServiceRequests query failure"));
				}
			});
		}
		else {
			//deferred =  this.getObjectStructure("SRM_SR", {TICKETUID: params.id, _fd:"PMZHBT_SRUSRLIST"});			
            deferred =  this.getObjectStructure(os_name, {TICKETUID: params.id, _fd: params._fd, _verbose:"false"});				
		}
		return deferred;
	},
	addZero: function(n)
	{
		return n < 10 ? '0' + n : n;
	},
	
	/**
	 * Get Assets
	 * 
	 * @param params
	 * @returns
	 */
	getAssets: function(params)
	{
		var deferred = null;
		if(undefined == params) { params = {}; }
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString();		
		
		var os_name = "MXASSET";   //default OS name
		if (params.os!=undefined) {		
			os_name = params.os;	
			params.os=null;
		}
		var sr_object = "ASSET";    //default object(mbo)
		if (params.sr_object!=undefined) {		
			sr_object = params.sr_object;	
			params.sr_object=null;
		}
		//Get asset for user
		var personid = this.getLoggedInUser().PERSONID;
 		//params["assetusercust.personid"]=personid;
		
		//Add timestamp to request to avoid IE caching problem. IE is caching request and not sending it.
		//Fixed in 7.5.0.1
		//if (dojo.isIE) {
		//   var timestamp =  new Date().valueOf();  
		//   params._preventCache = timestamp;
		//}
		
		if(undefined == params.id) {  //No id, get all assets for user
			// get the status domain we need
			var assetstatq = this.getDomain({DOMAINID: 'ASSETSTATUS'});  //Get the Asset status domain			
						 			
			params._verbose=false;
			var srq =  this.getObjectStructure(os_name, params);  //Get the assets  

			deferred = new dojo.Deferred();	// this is the deferred returned by the function. 
			deferred.addErrback(dojo.hitch(this, this._ajaxError));
			
			// when all the queries complete, add a "StatusString" property to each Asset with the pretty-formatted status
			var _queries = new dojo.DeferredList([assetstatq, srq]);
			_queries.addCallbacks(dojo.hitch(this, function(responses)
			{
				var reqs = [];
				
				// Assets
				if(responses[1][0]) {
					var statusMap = this.getDomainSynonymTable('ASSETSTATUS');  //asset status domain should be cached
					var srs;
					
					var query_response = "Query" + os_name + "Response";  //"QueryMXASSETResponse"
					var asset_response = os_name + "Set";  //"MXASSETSet"
										 
					//This is equivalent to responses[1][1].QueryMXASSETResponse.MXASSETSet.ASSET;
				    var assets = responses[1][1][query_response][asset_response][sr_object];			       
					 
					var count = undefined == assets ? 0 : assets.length;
					for(var i = 0; i < count; ++i) {
						try {
							var asset = assets[i];						
							
							var personid=null, orgid=null, isprimary=null, iscustodian=null, isuser=null;
							if (undefined != asset.ASSETUSERCUST) {
								personid = asset.ASSETUSERCUST[0].PERSONID;
								orgid = asset.ASSETUSERCUST[0].ORGID;
								isprimary = asset.ASSETUSERCUST[0].ISPRIMARY;
								iscustodian = asset.ASSETUSERCUST[0].ISCUSTODIAN;
								isuser = asset.ASSETUSERCUST[0].ISUSER;								
							}
							 
							var req = {
								key: "ASSET" + asset.ASSETID,
								id: asset.ASSETID,								
								type: "ASSET",
								StatusString: statusMap.descriptionByValue(asset.STATUS),
								
								//ASSETNUM: asset.ASSETNUM,
								//SITEID: asset.SITEID,
								//DESCRIPTION: asset.DESCRIPTION,
								//LOCATION: asset.LOCATION,
								//SERIALNUM: asset.SERIALNUM,
								//CHANGEDATE: asset.CHANGEDATE,
								//STATUSDATE: asset.STATUSEDATE,
																
								REFRESHDATE: asset.TLOAMREFRESHDATE==undefined || asset.TLOAMREFRESHDATE==null ?'' : asset.TLOAMREFRESHDATE,
								PLANNEDREFRESHDATE: asset.TLOAMREFRESHPLANDATE==undefined ||asset.TLOAMREFRESHPLANDATE==null?'':asset.TLOAMREFRESHPLANDATE,
								PERSONID: personid,
								ORGID: orgid,
								ISPRIMARY: isprimary,
								ISCUSTODIAN: iscustodian,
								ISUSER: isuser															 
								//item: sr
							}

							//this adds all other attributes 
							for (var name in asset) {
						     		req[name] = asset[name];
							}							

							reqs.push(req);
						}
						catch(ex) {
							ibm.tivoli.logger.error("srmQuery._getAssets: error processing Asset " + i,ex);
							if(deferred.fired < 0) {
								deferred.errback(responses[1][1]);
							}
						}
					}
				}
				else {
					if(deferred.fired < 0) {
						deferred.errback(responses[1][1]);
					}
				}	
				if(deferred.fired < 0) {
					deferred.callback({Requests: reqs});	// call the callback the caller would have added
				}
				return responses;		
			}), function(responses) 
			{
				if(deferred.fired < 0) {
					deferred.errback(new Error("srmQuery.getAssets query failure"));
				}
			});
		}
		else {
			//Get one asset			
            deferred =  this.getObjectStructure(os_name, {ASSETID: params.id,  _verbose:"false"});				
		}
		return deferred;
	},
	

	/**
	 * get data from BULLETINBOARD table
	 */
	getBBoardMessages: function(params)
	{
		console.log("srmQuery.getBBoardMessages() enter ", params);

		var msgs = [];
		var deferred = null;
		if(undefined == params) { params = {}; }
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString(); 
		
		if(undefined == params.id) {
			
			// get the status domain			
			var bbstatq = this.getDomain({DOMAINID: 'BULLETINSTATUS'});

			// get the list of messages			
			var objstr = this.getObjectStructure("SRM_BULLETINBOARD", {_verbose:"false"});
			
			deferred = new dojo.Deferred();	// this is the deferred returned by the function. 
			deferred.addErrback(dojo.hitch(this, this._ajaxError));
			
			// when all the queries complete, add a "StatusString" property to each message with the pretty-formatted status
			var _queries = new dojo.DeferredList([bbstatq, objstr]);
			_queries.addCallback(dojo.hitch(this, function(responses)
			{	
				// BulletinBoard Messages
				if(responses[1][0]) {
					var statusMap = this.getDomainSynonymTable('BULLETINSTATUS');

					// PMBBISTRACKING
					var maxPropValue = responses[1][1].QuerySRM_BULLETINBOARDResponse.SRM_BULLETINBOARDSet.DUMMY_TABLE[0].MAXPROPVALUE;
					var isTracking = 1;
					if (maxPropValue != undefined)
					{
						isTracking = maxPropValue[0].PROPVALUE;
					}
						
					var resp = responses[1][1].QuerySRM_BULLETINBOARDResponse.SRM_BULLETINBOARDSet.DUMMY_TABLE[0].BULLETINBOARD;
					var count = undefined == resp ? 0 : resp.length;
					for(var i = 0; i < count; ++i) {
						try {
							var cr = resp[i];
							
							// Process Bulletin Board Message Status records
							var msgStatus = resp[i].BBOARDMSGSTATUS;
							var viewed = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").No;
							if (undefined != msgStatus) {
							        viewed = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Yes;
							}
							
							// Process Bulletin Board Audience records                            
							
							var msgorgid1 = null;
							var msgsiteid1 = null;
							var persongroup1 = null;
							var msgAudience = resp[i].BBOARDAUDIENCE;		
							
							
							if (undefined != msgAudience) {
								msgorgid1 = msgAudience[0].MSGORGID;
								msgsiteid1 = msgAudience[0].MSGSITEID;
								persongroup1 = msgAudience[0].PERSONGROUP;
							}
                            
							var msg = {
								key: cr.BULLETINBOARDID,
								id: cr.BULLETINBOARDUID,
								type: "BULLETBOARD",
								STATUS: cr.STATUS,
								StatusString: statusMap.descriptionByValue(cr.STATUS),
								SUBJECT: cr.SUBJECT,
								MESSAGE: cr.MESSAGE,
								POSTBY: cr.POSTBY,
								POSTDATE: cr.POSTDATE,
								EXPIREDATE: cr.EXPIREDATE,
								ISVIEWED: viewed,
								MSGORGID: msgorgid1,
								MSGSITEID: msgsiteid1,
								PERSONGROUP: persongroup1,
								ISTRACKING: isTracking

							}
							msgs.push(msg);
						}
						catch(ex) {
							ibm.tivoli.logger.error("srmQuery._getBBoardeMessages: error processing BulletinBoard " + i,ex);
							deferred.errback(responses[1][1]);
						}
					}
				}
				else {
					deferred.errback(responses[1][1]);
				}	
				deferred.callback({Requests: msgs});	// call the callback the caller would have added
				return responses;		
			}));
		}
		else {
			console.log("srmQuery.getBBoardMessages() params should not be specified");
		}
		return deferred;
	},

	
	/**
	 * get the list of person groups this user has access to
	 */
	getPersonGroups: function(params)
	{
		console.log("srmQuery.getPersonGroups() enter ", params);
		
		var deferred = null;
		if(undefined == params) { params = {}; }
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString(); 
		
		if(undefined == params.id) {
			
			// get the list of person groups
			var user = this.getLoggedInUser();
     		var personid=user.PERSONID;
			//var objstr = this.getObjectStructure("SRM_PGTEAM", { _exactmatch: 1, resppartygroup: personid });
			var objstr = this.getObjectStructure("SRM_PGTEAM", { _exactmatch: 1 });

			deferred = new dojo.Deferred();	// this is the deferred returned by the function. 
			deferred.addErrback(dojo.hitch(this, this._ajaxError));
			
			var _queries = new dojo.DeferredList([objstr]);
			_queries.addCallback(dojo.hitch(this, function(responses)
			{
				var pgd = [];
				
				// Person Group Team records
				if(responses[0][0]) {
					var resp = responses[0][1].QuerySRM_PGTEAMResponse.SRM_PGTEAMSet.PERSONGROUPTEAM;
					var count = undefined == resp ? 0 : resp.length;
					for(var i = 0; i < count; ++i) {
						try {
							var cr = resp[i];
							
							var pg  = {
								key: cr.PERSONGROUPTEAMID,
								//id: cr.BULLETINBOARDUID,
								PERSONGROUP: cr.PERSONGROUP,
								RESPPARTYGROUP: cr.RESPPARTYGROUP
							}
							pgd.push(pg);
						}
						catch(ex) {
							ibm.tivoli.logger.error("srmQuery._getBBoardeMessages: error processing BulletinBoard " + i,ex);
							deferred.errback(responses[1][1]);
						}
					}
				}
				else {
					deferred.errback(responses[1][1]);
				}	
				deferred.callback({Requests: pgd});	// call the callback the caller would have added
				return responses;		
			}));
		}
		else {
			console.log("srmQuery.getPersonGroups() params should not be specified");
		}
		return deferred;
	},
	
	/**
	 * get the list of organizations this user has access to
	 */
	getPersonOrgsSites: function(params)
	{
		console.log("srmQuery.getPersonOrgs() enter ", params);
		
		var deferred = null;
		if(undefined == params) { params = {}; }
		var _sync = undefined == params.sync ? false : params.sync;
		var _locale_debug = this._getLocaleDebugString(); 
		
		if(undefined == params.id) {

			// get the list of organizations
			var user = this.getLoggedInUser();
			var loginid = user.LOGINID;
			
			var defSite = "NODEFAULTSITE";
			var defOrg = "NODEFAULTORG"
			if (undefined != user.SITE) {
				defSite = user.SITE[0].SITEID;
				defOrg = user.SITE[0].ORGID;
			}
			
			var objstr = this.getObjectStructure("SRM_ORGSITE", { _exactmatch: 1 });
			//var objstr = this.getObjectStructure("SRM_ORGSITE", { _exactmatch: 1, userid: loginid });

			deferred = new dojo.Deferred();	// this is the deferred returned by the function. 
			deferred.addErrback(dojo.hitch(this, this._ajaxError));
			
			var _queries = new dojo.DeferredList([objstr]);
			_queries.addCallback(dojo.hitch(this, function(responses)
			{
				var orgsite = [];
				
				// Set Default Org\Site
				var os = {
					key: 1,
					SITEID: defSite,
					ORGID: defOrg,
					AUTHALLSITES: false
				}
				orgsite.push(os);
				
				// Site Records
				if(responses[0][0]) {
					var resp = responses[0][1].QuerySRM_ORGSITEResponse.SRM_ORGSITESet.GROUPUSER;
					var count = undefined == resp ? 0 : resp.length;
					var authallsites = false;
					// Check for access to all sites
					for(var i = 0; i < count; ++i) {
						try {
							var cr = resp[i];
							
							var maxGroup = resp[i].MAXGROUP;
							if (maxGroup[0].AUTHALLSITES == true) {
								orgsite[0].AUTHALLSITES = true;
								authallsites = true;
								break;
							}
						}	
						catch(ex) {
							ibm.tivoli.logger.error("srmQuery._getPersonOrgs: error processing BulletinBoard " + i,ex);
							deferred.errback(responses[0][1]);
						}
					}
					// Check for access to individual sites
					if (authallsites == false) {
						for(var i = 0; i < count; ++i) {
							try {
								var siteAuth = resp[i].SITEAUTH;
								if (undefined != siteAuth) {
							    	var siteAuthCount = siteAuth.length;
							    	for (var j = 0; j < siteAuthCount; ++j) {
							    		os = {
											key: 1,
											SITEID: siteAuth[j].SITEID,
											ORGID: siteAuth[j].ORGID,
											AUTHALLSITES: false
										}
										orgsite.push(os);
									}

								}
							
							}
							catch(ex) {
								ibm.tivoli.logger.error("srmQuery._getPersonOrgs: error processing BulletinBoard " + i,ex);
								deferred.errback(responses[0][1]);
							}
						}
					}
				}
				else {
					deferred.errback(responses[1][1]);
				}	
				deferred.callback({Requests: orgsite});	// call the callback the caller would have added
				return responses;		
			}));
		}
		else {
			console.log("srmQuery.getPersonOrgs() params should not be specified");
		}
		return deferred;
	},
	
	approveRequest: function(/*number*/ticketID, /*string*/memo, /*boolean*/approve)
	{
		var srStatusMap = this.getDomainSynonymTable('SRSTATUS');
		var newstatus = approve ? srStatusMap.valueByMaxvalue('PENDING') : srStatusMap.valueByMaxvalue('CLOSED');
		var classMap = this.getDomainSynonymTable('TKCLASS');
		var newsr = classMap.valueByMaxvalue('SR');

		var params = {
			wsUrl: this.baseWSUrl + "TICKET",
			sync: true
		};
				
		params.postData = 
			  '<?xml version="1.0" encoding="UTF-8"?>'
		    + '<soapenv:Envelope xmlns:q0="http://www.ibm.com/maximo" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
		    + '<soapenv:Body>'
			+ '<q0:ticketchangeStatus>'
			+ '<q0:ticket>'
			+ '<q0:TICKET>'
			+ '<q0:CLASS maxvalue="" changed="true">' + newsr + '</q0:CLASS>'
			+ '<q0:TICKETID changed="true">' + ticketID + '</q0:TICKETID>'
			+ '</q0:TICKET>'
			+ '</q0:ticket>'
			+ '<q0:status>'+ newstatus + '</q0:status>'
			+ '<q0:memo><![CDATA[' + memo + ']]></q0:memo>'
			+ '</q0:ticketchangeStatus>'
			+ '</soapenv:Body>'
			+ '</soapenv:Envelope>';
		
		var deferred = this.callWebService(params);
		// the response
		//		<?xml version="1.0" encoding="UTF-8"?>
		//		<max:ticketchangeStatusResponse 
		//			xmlns:max="http://www.ibm.com/maximo" 
		//			creationDateTime="ISO datetime" 
		//			baseLanguage="string" 
		//			transLanguage="string" 
		//			messageID="string" 
		//			maximoVersion="string" /> 

		var bSuccess = false;	// assume the worst
		deferred.addCallbacks(function(response) 
		{				
			console.log(response);
			bSuccess = true;
			return response;
		},
		function(response)
		{
			console.error(response);
			return response;
		});
		return bSuccess;				
	},
	
	/**
	 * Returns the list of ticket templates in a tree format
	 * and caches the result 
	 */

	_templateCache: null,
		getTemplates: function(params)
		 {
			console.log("srmQuery.getTemplates() enter ", params);
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			
			if(undefined == params) { params = {}; }  
			var status="ACTIVE";
			var ccrStatus_domain = this.getDomainSynonymTable('TEMPLATESTATUS');
			status = ccrStatus_domain.valueByMaxvalue('ACTIVE');
			var tmpltclass = "SR";
			var tmpltclass_domain = this.getDomainSynonymTable('TKCLASS');
			tmpltclass = tmpltclass_domain.valueByMaxvalue('SR');
			params["class"]=tmpltclass;
			params.status=status;
			params.selfservaccess="1";
			params._verbose=false;

			var _tree = null;
			if (params._tree) {
				_tree = params._tree;
				delete params._tree;
			}
			var deferred = this.getObjectStructure("SRMTKTEMPLTOS", params);
			//var deferred = this.getObjectStructure("SRMTKTEMPLTOS", {sync: true});
			console.log("srmQuery.getTemplates() deferred:", deferred);

			deferred.addCallback(dojo.hitch(this, function(response) {  
				console.log("srmQuery.getTemplates() inner callback:", response);
				if(response == null)
					return null;
				var template = response.QuerySRMTKTEMPLTOSResponse.SRMTKTEMPLTOSSet.TKTEMPLATE;  
				var tmpltTable;	
				if (template) {
					   tmpltTable = response.QuerySRMTKTEMPLTOSResponse.SRMTKTEMPLTOSSet.TKTEMPLATE; 
				} else {
					tmpltTable = []; /* Fix to PTM PHYP0391GOC - in case of zero offerings */
				}
				var tmpltTree = new ibm.tivoli.simplesrm.srm.dojo.data.TemplatesTree;
				
				if (product!=null && product.indexOf("srm")>=0){
					if(params._search && params._search.length > 0)
						tmpltTree._noParents = true;
				}
				
				
				//reuse other tree for use the same fodler structure
				if(_tree)
					tmpltTree._tree = _tree; 
				for (var i = 0; i < tmpltTable.length; i++) {
					var template =tmpltTable[i];	
					if(params._folder && params._folder.length > 0){
						var classtructure = {DESCRIPTION : params._folder,
											 CLASSSTRUCTUREUID : params._folder};
						template.CLASSSTRUCTURE = new Array();
						template.CLASSSTRUCTURE.push(classtructure);
				    }    
					tmpltTree.addTemplate(template);
				}
				var resTree = { Category : tmpltTree._tree };
				console.log("srmQuery.getTemplates() resTree:", resTree);
				this._templateCache = resTree;
				return resTree;

			}));

			console.log("srmQuery.getTemplates() exit");
			return deferred;
	},
	
	_image_cache:  new Array(),  //image cache	 
	
	/**
	 * Returns the list of offerings in a tree format
	 * and caches the result 
	 */	
	_catalogCache: null,
	 _offTree: null,     // global used to save intermediate Offerings when there are more than 500 in DB and we retrieve 500 at a time. 
	 getRequestsCatalog: function(params)
	 {
		console.log("srmQuery.getRequestsCatalog() enter ", params);
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");		
				
		if(undefined == params) { 
           params = {};
        }
	   params._exactmatch = 1;
		//Get active status offerings only
		var offering_status = "ACTIVE";
		var offeringStatus_domain = this.getDomainSynonymTable('ITEMSTATUS');
		var offering_status = offeringStatus_domain.valueByMaxvalue("ACTIVE");
		params.status = offering_status;
		params._verbose=false;
        //params._fd = "SRM_OFFERING";  //filter offerings not in catalog or catalog is not active
		
		console.log("srmQuery().getRequestsCatalog() params: ", params);
		var deferred =null;
		if (params._usembo!=undefined) {  //use Mbo instead of OS for performance 
			 params._includecols="itemid,itemnum,itemsetid,description,catalogclassstructure";
			 deferred = this.getMbo("PMSCOFFERING", params);
			 delete params['_usembo'];
		} else {
		    deferred = this.getObjectStructure("SRM_OFFERING", params);
		}
		
		deferred.addCallback(dojo.hitch(this, function(response) {
			//console.log("Deferred response: ", response);
			if(response == null)
				return null;
			
			var pmscsrvoff = null;
			if (response.PMSCOFFERINGMboSet)  
				pmscsrvoff = response.PMSCOFFERINGMboSet.PMSCOFFERING;
			else
		        pmscsrvoff = response.QuerySRM_OFFERINGResponse.SRM_OFFERINGSet.PMSCOFFERING; 
          
         var offTable;
			if (pmscsrvoff) {
				 offTable = pmscsrvoff; 
			} else {
				offTable = []; /* Fix to PTM PHYP0391GOC - in case of zero offerings */
			}
			
			var offTree = this._offTree;  //local offering tree
			//Use a local variable if not retrieving the list of catalog offerings
			if (params._search==undefined && params._folder == undefined && this._offTree==null) { 
			   this._offTree = new ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree;
			   offTree = this._offTree;
			   
			   //Not getting Offering catalog
			} else  if (params._search != undefined || params._folder !=undefined) {
				offTree =  new ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree;
			}
			
			if (product!=null && product.indexOf("srm")>=0){
				if(params._search && params._search.length > 0)
					offTree._noParents = true;
			}
			var itemid = -1;  //keep track of last itemid
			for (var i = 0; i < offTable.length; i++) {
				//console.log("current: ", offTable[i].DESCRIPTION);
				
				if (product!=null && product.indexOf("srm")>=0) {
				      var offering =offTable[i];
				      itemid = offering.ITEMID;  
				      
				      if(params._folder && params._folder.length > 0){
				    	  var classtructure = {DESCRIPTION : params._folder,
									 		  CLASSSTRUCTUREUID : params._folder};
		                  if (offering.PMSCCATALOGOFFMAP) {  //Is offering in catalog?
				    	     offering.PMSCCATALOGOFFMAP[0].CLASSSTRUCTURE = new Array();
				    	     offering.PMSCCATALOGOFFMAP[0].CLASSSTRUCTURE.push(classtructure);
                             while(offering.PMSCCATALOGOFFMAP.length!=1) { //delete other arrays entries
                                 offering.PMSCCATALOGOFFMAP.pop();
                             }
	                      } else  if (offering.CATALOGCLASSSTRUCTURE) {  //Is offering in catalog?  
		                	     offering.PMSCCATALOGOFFMAP = new Array();
					    	     offering.PMSCCATALOGOFFMAP[0].CLASSSTRUCTURE = new Array();
					    	     offering.PMSCCATALOGOFFMAP[0].CLASSSTRUCTURE.push(classtructure);
			                  }
		                  }				          
				      offTree.addOffering(offering);
				} else { 
					 offTree.addOffering(offTable[i]);
				}
			}
			
			var resTree;
			if (response.PMSCOFFERINGMboSet)  
				resTree = { Category : offTree._tree, count:  response.PMSCOFFERINGMboSet.rsCount, lastItemID: itemid};  
			else
			    resTree = { Category : offTree._tree, count:  response.QuerySRM_OFFERINGResponse.rsCount, lastItemID: itemid};  
			console.log("srmQuery.getRequestsCatalog() resTree:", resTree);
			this._catalogCache = resTree;
			return resTree;
		}));
		
		console.log("srmQuery.getRequestsCatalog() exit");
		return deferred;
	},
    /**
	 * Returns the list of offerings in a tree format 
	 */
	 getFavItem: function(params)
	 {
		console.log("srmQuery.getFavItem() enter ", params);
		
		if(undefined == params) {params = {};}
		var _sync = undefined == params.sync ? false : params.sync;
		var _user = this.getLoggedInUser();
		var _personid=_user.PERSONID;

		console.log("_personid: ", _personid);
		
		var deferred = this.getObjectStructure("SRM_FAVITEM", {sync: _sync, _exactmatch: 1, PERSONID: _personid});		   
		
		deferred.addCallback(dojo.hitch(this, function(response) {
			console.log("Deferred response: ", response);
			
			var favitems;
			var pmscsrvoff;
			favitems  = response.QuerySRM_FAVITEMResponse.SRM_FAVITEMSet.FAVITEM;
           
			var favTable;	
			if (favitems) {
				favTable =  response.QuerySRM_FAVITEMResponse.SRM_FAVITEMSet.FAVITEM; 
			} else {
				favTable = []; /* Fix to PTM PHYP0391GOC - in case of zero offerings */
			}
			
			console.log(" favTable",favTable);
			
			var offering_status = "ACTIVE";
			var offeringStatus_domain = this.getDomainSynonymTable('ITEMSTATUS');
			var offering_status = offeringStatus_domain.valueByMaxvalue("ACTIVE");
			var offTree = new ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree;
			for (var i = 0; i < favTable.length; i++) {
				var offTable = favTable[i].PMSCOFFERING;
				console.log("********* offTable",offTable);
				for (var j = 0; j < offTable.length; j++) {
					pmscsrvoff= favTable[i].PMSCOFFERING[j];
					pmscsrvoff.DESCRIPTION = favTable[i].DESCRIPTION;
					pmscsrvoff.ITEMNUM = favTable[i].ITEMNUM;
					pmscsrvoff.ITEMSETID = favTable[i].ITEMSETID;
					pmscsrvoff.FAVITEM = true;  
					if (pmscsrvoff.STATUS == offering_status) {
						offTree.addOffering(pmscsrvoff);
					}
				}	
			}
			var resTree = { Category : offTree._tree };
			console.log("srmQuery.getFavItem() resTree:", resTree);
			this._catalogCache = resTree;
			return resTree;
			}));
			
		console.log("srmQuery.getFavItem() exit");
		return deferred;
	},

	getOfferingInfo: function(itemNum)
	{
		var offering = null;
		if(undefined == this._catalogCache) {
			this.getRequestsCatalog({sync: true});
		}
		if(undefined != this._catalogCache) {
			
			function findOffering(category, itemNum) {
				//console.log("...searching category ", category.Description);
				for(var i = 0; i < category.length; ++i) {
					var cat = category[i];
					//console.log("...catagory: ", cat.Description);
					if(cat.Offering) {
						for(var j = 0; j < cat.Offering.length; ++j) {
							var off = cat.Offering[j];
							//console.log("......offering: ", off.ItemNum)
							if(itemNum == off.ItemNum) {
								//console.log("...... foundit.");
								return off;
							}
						}
					}
					if(cat.Category) {
						return findOffering(cat.Category, itemNum);
					}
				}
			}
			
			offering = findOffering(this._catalogCache.Category, itemNum);
			if(offering) {	// the in-context list and what's available to this user may not match
				this._patchRequestImageName(offering);
			}
		}
		return offering;
	},
	

	getIncidentsCatalog: function()
	{
		var deferred = null;
		var requests_catalog = ibm.tivoli.tpae.dojo.data.getConfigProperty("IncidentsCatalog");
		if(requests_catalog && requests_catalog.length > 0) {
			alert("getIncidents was never ported from TDI");
		}
		return deferred;
	},
	// returns a list of offerings that are appropriate in the given context
	getOfferingsInContext: function(contextName)
	{
		var off_in_context = [];
		var offlist = this.getDomainSynonymTable(contextName);
		if(offlist) {
			for(var i = 0; i < offlist.length; ++i) {
				var offering = this.getOfferingInfo(offlist.synonyms[i].MAXVALUE);
				if(offering) {
					off_in_context.push(offering);
				}
			}
		}
		console.log(off_in_context);
		return off_in_context;
	},
	
	//Get User's Shopping Cart (PMSCCR+SRs) for tooltip  
	getShoppingCart: function() {
		console.log("srmQuery.getShoppingCart() enter ");
		//var user = this.getLoggedInUser();
		var user =  this.getLoggedInUser().USERID;		
		
		//Get draft status value
		var draft_status="DRAFT";
		var ccrStatus_domain = this.getDomainSynonymTable('PMSCCRSTATUS');
		draft_status = ccrStatus_domain.valueByMaxvalue("DRAFT");		 
		 		
		//Get latest cart for user in draft status		 	
		var  deferred= this.getObjectStructure("SRM_CART", {_exactmatch: 1, status: draft_status, _orderbydesc:"changedate",_maxItems:1,_verbose:"false"});	 		 
		//var  deferred= this.getObjectStructure("SRM_CART", {_exactmatch: 1, status: draft_status, changeby: user, _orderbydesc:"changedate",_maxItems:1,_verbose:"false"});	 
      	return deferred;		 
	},
	
	// we get the request's icon image name from the query, but have to cook
	// up the path to the actual bits.
	imageCacheUrl: "/SRMCommonsWeb/MaxImageCache/",
	_patchRequestImageName: function(request) 
	{
		try {
			if(undefined == request.ImagePath || undefined == request.ImageName) {
				request.ImagePath = "";
				if(undefined == request.ImageName) {
					request.ImageName = "";
				}
				// build the URL to the offering's image
				if(request.ImageName.length > 0) {
					request.ImagePath =  this.imageCacheUrl + request.ImageName + "?REFID=" + request.ItemID;
				}
				else {
					request.ImagePath = "/SimpleSRM/js/simplesrm/srm/dijit/images/icons/default_request.png";
				}
			}
		}
		catch(ex) {
			ibm.tivoli.logger.error("srmQuery._patchRequestImageName: " + ex,ex);
		}
		return request;
	},
			
	
	/**
	 *  Get classstructures used by solutions
	 *  This gets all of them. Should we only get the top level and then when user click on folder get the children? 
	 * 
	 */
	getSolutionsClassStructures: function(params) {  //fpb
		console.log("srmQuery.getSolutionsClassStructures() enter ", params);
		
		if(undefined == params) { params = {}; }
		 
		params._fd="SRM_SOLUTIONCS";  //gets only CS that are used in solutions (active and for self service)
		params._orderbydesc="CLASSSTRUCTUREID";
	
		//get classstructures used by solutions
		var deferred = this.getObjectStructure("SRM_CLASSSTRUCTURE", params);
		 
		
		deferred.addCallback(dojo.hitch(this, function(response) {  
			console.log("srmQuery.getSolutionsClassStructures() inner callback:", response);
			if(response == null)
				return null;	
			var cs = response.QuerySRM_CLASSSTRUCTUREResponse.SRM_CLASSSTRUCTURESet.CLASSSTRUCTURE;  
			var csTable;	
			if (cs) {
				csTable = response.QuerySRM_CLASSSTRUCTUREResponse.SRM_CLASSSTRUCTURESet.CLASSSTRUCTURE; 
			} else {
				csTable = []; /* Fix to PTM PHYP0391GOC - in case of zero classstructures */
			}
			var csTree = new ibm.tivoli.simplesrm.srm.dojo.data.SolutionTree;  //Todo
			
			for (var i = 0; i < csTable.length; i++) {
				csTree.addSolution(csTable[i]);
			}
			var resTree = { Category : csTree._tree };
			console.log("srmQuery.getSolutionsClassStructures() resTree:", resTree);
			//this._solutionCache = resTree;
			return resTree;						
		}));

		console.log("srmQuery.getSolutionswithClass() exit");
		return deferred;
	},

	
	
	_solutionCache: null,
	/**
	 * Get Solutions
	 */
	getSolutions: function(params)  
	 {
		console.log("srmQuery.getSolutions() enter ", params);
		
		if(undefined == params) { params = {}; }

		var _tree = null;
		//Are we storing solution in an existingn tree?
		if (params._tree) {
			_tree = params._tree;
			delete params._tree;
		}
						
		var deferred = this.getObjectStructure("SRM_SOLUTION", params);
		console.log("srmQuery.getSolutions() deferred:", deferred);

		
		deferred.addCallback(dojo.hitch(this, function(response) {  
			console.log("srmQuery.getSolutions() inner callback:", response);
			if(response == null)
				return null;	
			var solution = response.QuerySRM_SOLUTIONResponse.SRM_SOLUTIONSet.SOLUTION;  
			var solTable;	
			if (solution) {
				solTable = response.QuerySRM_SOLUTIONResponse.SRM_SOLUTIONSet.SOLUTION; 
			} else {
				solTable = []; /* Fix to PTM PHYP0391GOC - in case of zero offerings */
			}
			var solTree = new ibm.tivoli.simplesrm.srm.dojo.data.SolutionTree;
			
			//Merge into existing tree
			if(_tree) {  //fpb
				solTree._tree = _tree;
			}

			for (var i = 0; i < solTable.length; i++) {
				solTree.addSolution(solTable[i]);
			}
			var resTree = { Category : solTree._tree };
			console.log("srmQuery.getSolutions() resTree:", resTree);
			this._solutionCache = resTree;
			return resTree;
						
		}));

		console.log("srmQuery.getSolutions() exit");
		return deferred;
	},
	
	//Get User's number of cart templates  
	getCartTemplatesAmt: function() {
		console.log("srmQuery.getCartTemplatesAmt() enter ");
				
		var user =  this.getLoggedInUser().USERID;
		
		var params = {};
		params._exactmatch=1;
		params._maxItems=1;
		params._compact=1;
		params.sync = true;
		params._includecols="PMSCTMPLID";
		//params.owner=user;
		
		var url = this.baseRestUrl + this.rest_context_root + "/rest/mbo/PMSCTMPL";
				 		 
		var  deferred= this.get(url, true, params );	 
      	return deferred;		 
	},

	
	getFavTemplates: function(params)
	 {
		
		if(undefined == params) { params = {}; }  
		
		params.PERSONID = this.getLoggedInUser().PERSONID;
		
		var deferred = this.getObjectStructure("SRM_FAVTKTEMPLATE", params);

		deferred.addCallback(dojo.hitch(this, function(response) {  

			var favoriteSet = response.QuerySRM_FAVTKTEMPLATEResponse.SRM_FAVTKTEMPLATESet;
			var favoriteTable;	
			if (favoriteSet && favoriteSet.FAVORITE && favoriteSet.FAVORITE.length > 0) {
				favoriteTable = favoriteSet.FAVORITE;
			} else {
				favoriteTable = []; 
			}
			var tmpltTree = new ibm.tivoli.simplesrm.srm.dojo.data.TemplatesTree;

			for (var i = 0; i < favoriteTable.length; i++) {
				tmpltTree.addTemplate(favoriteTable[i].TKTEMPLATE[0]);
			}
			var resTree = { Category : tmpltTree._tree };
			this._templateCache = resTree;
			return resTree;

		}));

		return deferred;
	 },
	 
	//truncate long description
	 truncate: function(description) {
	 	var truncate = 100;
	 	
	 	//Add spacing
	 	var desc = description.replace(/<li>/g, "<li> - ");
	     desc = desc.replace(/<br /g, " <br ");    
	     desc = desc.replace(/<p>/, " <p>");
	     
	     //add space after comma, removed by server OS class
	     desc = desc.replace(/,/g, ", ")
	 	
	 	//Remove html tags because it may contain rich text. 
	 	//TODO - need to improve this:
	 	//  - it will remove things it shouldn't (1<2 and 4>3)
	 	//  - 7.2 supports anchors and we want to leave them in		
	     desc = desc.replace(/<.*?>/g, " ");
	 	
	 	//Fix encoding of "&" RTE encodes it to &amp;amp; 
	 	desc = desc.replace(/&amp;/g, "&");
	 	
	 	//replace non breaking space with a space
	 	desc = desc.replace(/&nbsp;/g, " ");  

	 	if(desc.length > truncate*2) {  //>200?						    
	 								
	 		//truncate on a space, . or ;
	 		truncate = truncate+5;
	 		desc = desc.substring(0, truncate);	// initial truncate
	 		truncate= truncate-1;           //decrement until ending character located
	 		while (truncate>0 && desc.charAt(truncate)!=" " && desc.charAt(truncate)!=";" && desc.charAt(truncate)!="."  ) {
	 		    truncate= truncate-1;
	 		}
	 		if (truncate>0)
	 		   desc = desc.substring(0, truncate+1).replace(/\s+$/, "");	// truncate and trim trailing spaces
	 		
	 		//hacks to truncate text
	 		if (desc.indexOf(" ")==-1 || desc.indexOf(" ")>50) {
	 			desc = desc.substring(0,45) + " " + desc.substring(46);
	 		}
	 		if (desc.length>90 && (desc.indexOf(" ",47)==-1 || desc.indexOf(" ",47)>90)) {
	 			desc = desc.substring(0,90) + " " + desc.substring(91);
	 		} 
	 		
	 		desc += "...";   
	 	}   
	 	return desc;
	 }
	 
});
ibm.tivoli.simplesrm.srm.dojo.data._srmquery = null;
ibm.tivoli.simplesrm.srm.dojo.data.srmQuery = function(){
	// summary: returns the singleton query object
	if(!ibm.tivoli.simplesrm.srm.dojo.data._srmquery){
		ibm.tivoli.simplesrm.srm.dojo.data._srmquery = new ibm.tivoli.simplesrm.srm.dojo.data._srmQuery(); 
	}
	return ibm.tivoli.simplesrm.srm.dojo.data._srmquery;	// Object
};


//****** tsamQuery *******


});

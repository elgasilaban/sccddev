//>>built
// wrapped by build app
define("ibm/tivoli/tpae/dojo/data/tpaeQuery", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/simplesrm/srm/dojo/data/Cache"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.tpae.dojo.data.ajaxQuery");
dojo.provide("ibm.tivoli.tpae.dojo.data._ajaxQuery");

dojo.provide("ibm.tivoli.tpae.dojo.data.tpaeQuery");
dojo.provide("ibm.tivoli.tpae.dojo.data._tpaeQuery");
dojo.provide("ibm.tivoli.tpae.dojo.data.SynonymDomain");
dojo.provide("ibm.tivoli.tpae.data.loggedInUsername");

dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.Cache");


//TODO - this can be removed (along with references) and use getLoggedInUser() instead
ibm.tivoli.tpae.data.loggedInUsername = "";	// a global. gasp!

/**
 * Handle ajax data queries.
 * Directs the query through the proxy servlet if necessary 
 */
dojo.declare("ibm.tivoli.tpae.dojo.data._ajaxQuery", null, 
{
	_proxyUrl: "/SRMCommonsWeb/ProxyServlet",
	_timeout: Infinity,
	devMode: false,
   token: '',  //auth token 
   loginid: '',

   _cacheTimeoutStatic: 0,
   _cacheTimeoutSeldomChanged: 0,
  
	constructor: function()
	{
		this._timeout = parseInt(ibm.tivoli.tpae.dojo.data.getConfigProperty("QueryTimeout"),10);
		if(isNaN(this._timeout) || this._timeout < 0) {
			this._timeout = Infinity;
		}
		var dm = ibm.tivoli.tpae.dojo.data.getConfigProperty("Devmode");
		this.devMode = (dm == "true" || dm == "1");

		this._cacheTimeoutStatic = parseInt(ibm.tivoli.tpae.dojo.data.getConfigProperty("CacheTimeoutStatic"),10);
		if(isNaN(this._cacheTimeoutStatic) || this._cacheTimeoutStatic < 0) {
			this._cacheTimeoutStatic = Infinity;
		}

		this._cacheTimeoutSeldomChanged = parseInt(ibm.tivoli.tpae.dojo.data.getConfigProperty("CacheTimeoutSeldomChanged"),10);
		if(isNaN(this._cacheTimeoutSeldomChanged) || this._cacheTimeoutSeldomChanged < 0) {
			this._cacheTimeoutSeldomChanged = 900000;
		}

	},
	useProxy: function(url)
	{     	
		var bUseProxy=true;
		var bp = ibm.tivoli.tpae.dojo.data.getConfigProperty("UseProxy");  
		if (bp!=null) 
		    bUseProxy = (bp=='true' || bp=='1');				

		if(!this.devMode) {
			if('/' == url.charAt(0)) {
				bUseProxy = false;
			}
			else {
				var m = url.match(new RegExp(":\\/\\/(\\w+)"));
				if(m) {
					var data_host = m[1];
					bUseProxy = (data_host != window.location.host);
				}
			}
		}
		return bUseProxy;
	},

	//Set auth tokens  
	setToken: function(token_p, loginid_p) {  
		if (token_p!=null)  
	    	this.token= token_p;
	    if (loginid_p!=null)  
	    	this.loginid= loginid_p;	      
	},

	get: function(/*string*/url, /*boolean*/sync, /*object*/query_args)
	{
		var _data = {};
		var _url = url;
		var _sync = undefined == sync ? true : sync;		
		var _xtraHeaders = {};
		var type = "json";
		if (query_args["handleas"]) {
			type =  query_args["handleas"];
		}		
	
		var useProxy = this.useProxy(_url);
		if(useProxy) {
			_url = this._proxyUrl;
			_xtraHeaders["x-targeturl"] = url;
		}
		if( url.match(new RegExp("\\/rest")) ) {
			_data._format = "json";
		}
		else {
			_data.format = "json";
		}
		if (query_args["Cache-Control"]) {
			_xtraHeaders["Cache-Control"] = query_args["Cache-Control"];
			delete query_args["Cache-Control"];
		}

      //Pass langcode if it was passed to us when starting
      if (ibm.tivoli.tpae.dojo.data._langcode!=null &&  ibm.tivoli.tpae.dojo.data._langcode.length>0) {
			_data._lang = ibm.tivoli.tpae.dojo.data._langcode;
      }

		if (this.token!=null && this.token!='')  
			_xtraHeaders["__mxtoken"] = this.token;
				 
		if (this.loginid!=null & this.loginid!='')  
			_xtraHeaders["__mxuser"] = this.loginid;

		for(var p in query_args) {
			_data[p] = query_args[p];
		}
		var errHandler = dojo.hitch(this, this._ajaxError);
		
		var _deferred = dojo.xhrGet({
			url: _url,
			content: _data,
			headers: _xtraHeaders,
			sync: _sync,			
			timeout: this._timeout,
			handleAs: type,
			load: function(response, ioArgs) 
			{
				console.log("tpaeQuery:get loaded - ", url, sync);
				return response;
			},
			error: function(response, ioArgs)
			{
				errHandler(response, ioArgs); 
				return response;
			}
		});
		return _deferred;
	},
	// Summary:
	//	Same as get, but for xhrPost
	post: function(/*string*/url, /*boolean*/sync, /*object*/data) 
	{
		var _data = {};
		var _url = url;
		var _sync = undefined == sync ? true : sync;
		var _xtraHeaders = {};
	
		var useProxy = this.useProxy(_url);
		if(useProxy) {
			_url = this._proxyUrl;
			_xtraHeaders["x-targeturl"] = url;
		}

		if (this.token!=null && this.token!='')  
			_xtraHeaders["__mxtoken"] = this.token;
				 
		if (this.loginid!=null & this.loginid!='')  
			_xtraHeaders["__mxuser"] = this.loginid;

		if( url.match(new RegExp("\\/rest")) ) {
			_data._format = "json";
		}
		else {
			_data.format = "json";
		}
		for(var p in data) {
			_data[p] = data[p];
		}

		if (undefined == _data._compact){
			_data._compact = 1;
		}
		var _deferred = dojo.xhrPost({
			url: _url,
			content: _data,
			headers: _xtraHeaders,
			sync: _sync,
			handleAs: "json",
			load: function(response, ioArgs) 
			{
				console.log("tpaeQuery:post loaded", url);
				return response;
			},
			error: function(response, ioArgs) 
			{
				if("cancel" === response.dojoType) {
					console.log("request canceled");
				}
				else {
					var msg = "ajaxQuery.post failure";
					if(ioArgs && ioArgs.xhr) {
						msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
					}
					console.error(msg);
					ibm.tivoli.logger.error("msg: " + msg + "response:" + response);
				}
				return response;
			}
		});
		return _deferred;
	},

	/**
	 * Call a MEA webService sending a raw XML POST request.
	 * The call passes through the proxy servlet, the real WS url is
	 * passed in the x-targeturl header
	 */
	callWebService : function(params){
		var _url = params.wsUrl;
		var headers = {
			"SOAPAction": "urn:action", 
     		"Content-Type": "text/xml; charset=utf-8" 
		};
		var useProxy = this.useProxy(_url);
		if(useProxy) {
			_url = this._proxyUrl;
			headers["x-targeturl"] = params.wsUrl;
		}
		var _deferred = dojo.rawXhrPost({
	          		url		: _url,
	                headers : headers,
	                postData: params.postData,
					handleAs: "text",
					sync    : params.sync,
					load    : function(response, ioArgs) {
								console.log("WS response loaded");							
								return response;
					},
					error   : dojo.hitch(this, this._ajaxError)
					});
		return _deferred;
	},
	
	_ajaxError: function(response, ioArgs)
	{
		if("cancel" === response.dojoType) {
			console.log("request canceled");
		}
		else {
			var msg = "ajaxQuery.get failure: " + response.toString();
			console.error(msg);
			ibm.tivoli.logger.error(msg);
		}
		return response;
	},
	
	/**
	 * summary: 
	 * 	returns the given value if it is defined.  
	 * 	If value is undefined, then returns defaultValue
	 * 	If defaultValue is undefined, then returns ""
	 *  
	 *  Used this function when accessing data fields from data returned from one of our
	 *  REST queries.  Depending on the circumstances, all fields may not be present, and
	 *  this function can be used to safely assign a field value to a variable.
	 *  
	 *  Example:
	 *    var mrlineid = this.safeGetValue(response.CreatePMZHBR1_PMSCMRCREATEResponse.PMZHBR1_PMSCMRCREATESet.PMSCMR.PMSCMRLINE[0].MRLINEID, "0")
	 *    
	 *  Warning:
	 *  	What this function cannot guard against is an undefined intermediate object in the response.  For example, if 
	 *  	response.CreatePMZHBR1_PMSCMRCREATEResponse.PMZHBR1_PMSCMRCREATESet.PMSCMR.PMSCMRLINE[0] is undefined, 
	 *  	response.CreatePMZHBR1_PMSCMRCREATEResponse.PMZHBR1_PMSCMRCREATESet.PMSCMR.PMSCMRLINE[0].MRLINEID will cause an error before
	 *  	safeGetValue is ever called.
	 *   
	 */
	safeGetValue: function(/*String*/value, /*any*/defaultValue) 
	{
		return undefined != value ? value : (undefined != defaultValue ? defaultValue : "");
	}
});
ibm.tivoli.tpae.dojo.data._ajaxquery = null;
ibm.tivoli.tpae.dojo.data.ajaxQuery = function(){
	// summary: returns the singleton query object
	if(!ibm.tivoli.tpae.dojo.data._ajaxquery){
		ibm.tivoli.tpae.dojo.data._ajaxquery = new ibm.tivoli.tpae.dojo.data._ajaxQuery();
	}
	return ibm.tivoli.tpae.dojo.data._ajaxquery;	// Object
};

ibm.tivoli.tpae.dojo.data._runInMaximo = false;    //Don't use separate servlet for config.properties 
ibm.tivoli.tpae.dojo.data._langcode = "";         //language code. If passed in we include it on REST API _lang parm
ibm.tivoli.tpae.dojo.data._configfile = "config.properties";

//properties cache
ibm.tivoli.tpae.dojo.data._propmap = new ibm.tivoli.simplesrm.srm.dojo.data.Cache();

//Get property from cache or retrieve them from server.
//Try config.properties first then try config75.properties
ibm.tivoli.tpae.dojo.data.getConfigProperty = function(pname) {
   var propmap = ibm.tivoli.tpae.dojo.data._propmap;
   if(undefined === propmap.get(pname) && propmap.countKeys()==0){  //Find property in cache
	
	  //If config.properties is in the maximouiweb war	
	  if (ibm.tivoli.tpae.dojo.data._runInMaximo==true) {
		  var context_root = "/maximo";		  
		  var context = window.location.pathname;  // /maximo/ui
		  if (context.indexOf("/")!=0)
			  context = "/" + context;
		  var paths = context.split("/");
		  if (paths.length>=2) {
			  context_root = "/" + paths[1]; 
		  }	   
		  		  
		  dojo.xhrGet({			
			  url: context_root + "/webclient/javascript/com/ibm/ism/pmsc/dojo/" + ibm.tivoli.tpae.dojo.data._configfile,	
			  sync: true,
			  handleAs: "text",
			  load: function(response, ioArgs) {    
			     //split config properties into array of lines
			     //TODO - add all of them to the array
			     var arrayOfLines = response.split(/\r\n|\n|\r/);
			     for(var indx = 0; indx < arrayOfLines.length; indx++){
			        var singleLine = arrayOfLines[indx].trim();
			        if (singleLine!="" && singleLine[0]!= "#") {  //not comment
			           var attrs = singleLine.split("=");
			           if (attrs.length==2) {
	                      var key = attrs[0].trim();
	                      var value = attrs[1].trim();
	                      //ibm.tivoli.tpae.dojo.data._propmap[key] = value;	                      		            			             
                          propmap.put(key,value);
			           }			       
			        }
			     }		    			     				
			     return response;
			     },
			     
			  error: function(response, ioArgs) {				 
			     var msg = "getConfigProperty failure" + ibm.tivoli.tpae.dojo.data._configfile;
				 if(ioArgs && ioArgs.xhr) {
				    msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
				 }
				 console.log(msg);				 
				 
				 //Try config75.properties if not already tried
				 if (ibm.tivoli.tpae.dojo.data._configfile!="config75.properties") {
					ibm.tivoli.tpae.dojo.data._configfile = "config75.properties";
				 
				    dojo.xhrGet({			
					     url: context_root + "/webclient/javascript/com/ibm/ism/pmsc/dojo/" +  ibm.tivoli.tpae.dojo.data._configfile,	
					     sync: true,
					     handleAs: "text",
					     load: function(response, ioArgs) {						   
						  
  					        //split config properties into array of lines					    
					        var arrayOfLines = response.split(/\r\n|\n|\r/);
					        for(var indx = 0; indx < arrayOfLines.length; indx++){
					           var singleLine = arrayOfLines[indx].trim();
					           if (singleLine!="" && singleLine[0]!= "#") {  //not comment
					              var attrs = singleLine.split("=");
					              if (attrs.length==2) {
			                         var key = attrs[0].trim();
			                         var value = attrs[1].trim();			                      	                      		            			             
		                             propmap.put(key,value);
					              }			       
					           }
					        }		    			     				
					        return response;
					        },
					     
					     error: function(response, ioArgs) {// no config.properies or config75.properties	 
					       
					        var msg = "getConfigProperty failure" + ibm.tivoli.tpae.dojo.data._configfile;
						    if(ioArgs && ioArgs.xhr) {
						       msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
						    }
						    console.error(msg);
						    alert ("config.properties not found");  //Let user know!!
						    ibm.tivoli.logger.error(msg);
						    return response;
				         }   
			         });
				 } else {
					 var msg = "getConfigProperty failure" + ibm.tivoli.tpae.dojo.data._configfile;
					 if(ioArgs && ioArgs.xhr) {
					    msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
					 }
					 console.log(msg);
					 return response;					 
				 }
			
		      }   
	      });
		  
	    
	    //If config.properties is in separate war
	  } else { 
		dojo.xhrGet({
			url: "/SRMCommonsWeb/SimpleSrm",
			content: {p: pname},
			sync: true,
			handleAs: "text",
			load: function(response, ioArgs) 
			{
				propmap.put(pname,response.trim());
				return response;
			},
			error: function(response, ioArgs) 
			{
				var msg = "getConfigProperty failure";
				if(ioArgs && ioArgs.xhr) {
					msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
				}
				console.error(msg);
				ibm.tivoli.logger.error(msg);
				return response;
			}
	      });
		}
	}
	return propmap.get(pname);
};
 

//******* tpaeQuery ******
dojo.declare("ibm.tivoli.tpae.dojo.data._tpaeQuery", null,
{
	baseRestUrl: "",
	restOS: "maximo/rest/srm/",  //default context root
	restMbo: "maximo/rest/mbo/",	 
	rest_context_root: "maximo",  

	baseWSUrl: "",

   cache: {
       general : new ibm.tivoli.simplesrm.srm.dojo.data.Cache(),
       domain : new ibm.tivoli.simplesrm.srm.dojo.data.Cache(),
       domainSynonyms: new ibm.tivoli.simplesrm.srm.dojo.data.Cache(),		
       clear: function(){
          var property = null;
          for(property in this){
             if(this[property].clear){
                this[property].clear();
             }
          }			
       }
    },
	
	constructor: function()
	{
		dojo.mixin(this, ibm.tivoli.tpae.dojo.data.ajaxQuery());

		val = ibm.tivoli.tpae.dojo.data.getConfigProperty("maxURL");
		this.baseRestUrl = (val==null || val.length == 0) ? window.location.protocol + "//" +window.location.host+"/" : val;  
		this.baseWSUrl = this.baseRestUrl + "meaweb/services/";
				 		
		var context = window.location.pathname;  // /maximo/ui
		  if (context.indexOf("/")!=0)
			  context = "/" + context;
		  var paths = context.split("/");
		  if (paths.length>=2) {
			  this.rest_context_root = paths[1]; 
		  }
		  
		  this.restOS = this.rest_context_root + "/rest/srm/";
		  this.restMbo = this.rest_context_root + "/rest/mbo/";	
				
	},
	// TODO: maybe I should get rid of this function
	_getLocaleDebugString: function()
	{
		var bdebug = window.location.search.search("debug=(1|true)") > 0;
		var blocale = window.location.search.search("locale=es") > 0;
		return bdebug && blocale ? "$$$ " : "";
	},
	normalizeOSResults: function(results)
	{
		var i;
		for(i in results) {
		    console.log(i);
		    results.Query_Response = results[i];
		    //delete results[i];
		    for(var j in results.Query_Response) {
		    	if(/Set$/.test(j)) {
		        	results.Query_Response.Set = results.Query_Response[j];
		            //delete results.Query_Response[j];
		            break;
		        }
		    }    
		}
		return results;
	},
	
	getObjectStructure: function(os, args)
	{
		console.log("srmQuery.getObjectStructure", os, args);

		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
		
		var _url = this.baseRestUrl + this.restOS + os;
		var _sync = false;
		var _args = {};
		if(undefined != args) {
			if(undefined != args.id) {
				_url += "/" + args.id;
			}
			if(undefined != args.sync) {
				_sync = args.sync;
			}
		}
		if("object" == typeof args) {
			for(var a in args) {
				if("id" != a && "sync" != a){
					_args[a] = args[a];
				}
			}
		}
		if(undefined == _args._compact) {
			_args._compact = 1;
		}
		if(undefined == _args._exactmatch) {
			_args._exactmatch = 1;
		}
		return this.get(_url, _sync, _args);
	},
	
	postToObjectStructure: function(os, sync, data)	{
		var _url = this.baseRestUrl + this.restOS + os;
		var _data = {};
		if(undefined != data) {
			if(undefined != data.id) {
				_url += "/" + data.id;
			}
		}
		if("object" == typeof data) {
			for(var a in data) {
				if("id" != a){
					_data[a] = data[a];
				}
			}
		}
		return this.post(_url, sync, _data);
	},
	

	//Get Mbo
	getMbo: function(mbo, args) {  
		console.log("srmQuery.getMbo", mbo, args);	
		
		var _url = this.baseRestUrl + this.restMbo + mbo;  		 
		var _sync = false;
		var _args = {};
		if(undefined != args) {
			if(undefined != args.id) {
				_url += "/" + args.id;
			}
			if(undefined != args.sync) {
				_sync = args.sync;
			}
		}
		if("object" == typeof args) {
			for(var a in args) {
				if("id" != a && "sync" != a){
					_args[a] = args[a];
				}
			}
		}
		if(undefined == _args._compact) {
			_args._compact = 1;
		}
		if(undefined == _args._exactmatch) {
			_args._exactmatch = 1;
		}
		return this.get(_url, _sync, _args);
	},
	
	
	/**
	 * retrieve Maximo global properties
	 * @return {Deferred}
	 */
	getMaxPropValue: function(){
		//url = this.baseRestUrl + this.rest_context_root + "/rest/mbo/MAXPROPVALUE";
		url = this.baseRestUrl + this.restMbo + "MAXPROPVALUE";
		
		var params = {};
		params._exactmatch=1;
		return this.get(url,false,params);
	},
	
	 
	/**
	 * Get MAXVARS
	 * varnamep:  name of varvalue to retrieve
	 */
	getMaxVarValue: function(varnamep){
		var params = {};
		if (varnamep)
		   params = {varname:varnamep};
		params._exactmatch=1;		
		
		var url = this.baseRestUrl + this.restMbo + "MAXVARS"; 
		 
		return this.get(url,true,params);
	},
	
	/**
	 * REST Logout
	 * 
	 */
	logout: function(){
		var params = {};		 				
		var url = this.baseRestUrl +  this.rest_context_root + "/rest/logout";		 
		return this.get(url,true,params);
	},
	
	/**
	 * Get Catalogs
	 * 	  
	 */
	getCatalogs: function(){
	 var value = null;
		var params = {};		 
		params._exactmatch=1;
		params._compact=1;
		params.sync = true;
		params._includecols="itemnum,itemsetid,status";
				
		//var url = this.baseRestUrl + this.rest_context_root + "/rest/mbo/PMSCCATALOG";
		var url = this.baseRestUrl + this.restMbo + "PMSCCATALOG";
		
		var d=  this.get(url,true,params);		 			 
		d.addCallback(dojo.hitch(this, function(response) 	{
			var values = response.PMSCCATALOGMboSet.PMSCCATALOG;
			if (values.length >0) {				
			    var general = this.cache.general;
			    general.put("catalogs", values);
			}
		}));						
	},
	
	/**
	 * Get MAXMESSAGES value
	 * msggroupp:  message group to retrieve
	 * msgkeyp:    message key to retrieve	  
	 */
	getMaxMessage: function(msggroupp, msgkeyp){
	 var value = null;
		var params = {};
		if (msggroupp)
		   params.msggroup = msggroupp;
		if (msgkeyp)
			   params.msgkey = msgkeyp;
		params._exactmatch=1;
		params._maxItems=1;
		params._compact=1;
		params.sync = true;
		params._includecols='MSGKEY,VALUE';
		
		//var url = this.baseRestUrl + this.rest_context_root + "/rest/mbo/MAXMESSAGES";
		var url = this.baseRestUrl + this.restMbo + "MAXMESSAGES";
		
		var d=  this.get(url,true,params);		 			 
		d.addCallback(dojo.hitch(this, function(response) 	{
			values = response.MAXMESSAGESMboSet.MAXMESSAGES;
			if (values.length >0)
				value = values[0].VALUE;
		}));
		return value;				
	},
	
	/**
	 * Get list of MAXMESSAGES 
	 * msggroupp:  message group to retrieve
	 * msgkeyp:    message key to retrieve	  
	 */
	getMaxMessages: function(msggroupp, msgkeyp){
        var value = null;
		var params = {};
		if (msggroupp)
		   params.msggroup = msggroupp;
		if (msgkeyp)
			   params.msgkey = msgkeyp;		
	
		params._exactmatch=1;
		params._compact=1;
		params._includecols='MSGKEY,VALUE';
		params.sync = true;
		//params._maxItems=1;
		
		//var url = this.baseRestUrl +  this.rest_context_root + "/rest/mbo/MAXMESSAGES";
		var url = this.baseRestUrl + this.restMbo + "MAXMESSAGES";
		return  this.get(url,true,params);
	},
	
	/**
	 * get the list of users
	 * if params.id is specified, return that specific user  
	 */
	getUsers: function(params)
	{
		return this.getObjectStructure("MBS_MAXUSER", params);
	},

	/**
	 * similar to getUsers, but more data
	 */
	getUserDetails: function(params)
	{
		if (ibm.tivoli.tpae.dojo.data._runInMaximo==true)
			return this.getObjectStructure("SRM_MAXUSERDET", params);
		else
		   return this.getObjectStructure("MBS_MAXUSERDET", params);
	},
	/**
	 * return the user record for the logged in user
	 */
	//_loggedInUser: null,
	getLoggedInUser: function() {
		//If running in Maximo, the userid is passed in on the srmPageInit control		 
		
		var d = null,
			res = null,
			general = this.cache.general;
      if(undefined === general.get("_loggedInUser")) {
			// returnes the logged in user.
			// works in the dev environment, because the proxy will add a MAXAUTH header
			if (ibm.tivoli.tpae.dojo.data._runInMaximo==true)
				 d = this.getUserDetails({sync: true, _verbose:"false"});
			     //d = this.getUserDetails({USERID:this.loginid, sync: true, _verbose:"false"});
			else 	
		       d = this.getUserDetails({_fd:"PMZHBT_LOGGEDONUSR", sync: true});

			d.addCallbacks(function(response){
				if(ibm.tivoli.tpae.dojo.data._runInMaximo==true &&  response.QuerySRM_MAXUSERDETResponse.rsCount >= 1) {	
					var loggedInUser = response.QuerySRM_MAXUSERDETResponse.SRM_MAXUSERDETSet.MAXUSER[0];
					general.put("_loggedInUser",loggedInUser);
					ibm.tivoli.tpae.data.loggedInUsername = loggedInUser.USERID;
			    }
				else if(response.QueryMBS_MAXUSERDETResponse.rsCount >= 1) {	// TODO: changed == to >= to cope with bug in query
					var loggedInUser = response.QueryMBS_MAXUSERDETResponse.MBS_MAXUSERDETSet.MAXUSER[0];
					general.put("_loggedInUser",loggedInUser);
					ibm.tivoli.tpae.data.loggedInUsername = loggedInUser.USERID;
				}
				else { 
					ibm.tivoli.tpae.data.loggedInUsername = "";
				}
			},
			function(response)
			{
				console.warn("Failed getting logged in user: ", response);
				ibm.tivoli.tpae.data.loggedInUsername = "";
			});
		}
		res = general.get("_loggedInUser");
		return res;
	},


	getLoggedInUsername: function(){
		var res = this.getLoggedInUser();
		return res ? res.USERID : "";
	},

	/**
	 * get the list of user groups
	 * if params.id is specified, return that specific group
	 */
	getGroups: function(params)
	{
		return this.getObjectStructure("MBS_MAXGROUP", params);
	},

	getCurrentUserRole: function()
	{
		var params = {_fd: "PMZHBT_CLOUDROLE",sync: true};
		var d = this.getObjectStructure("MBS_GROUPUSER",params);
		var roleitem = null;
		d.addCallback(dojo.hitch(this, function(response)
		{
			if(response.QueryPMZHBR1_GROUPUSERResponse.rsCount > 0){
				roleitem = response.QueryPMZHBR1_GROUPUSERResponse.PMZHBR1_GROUPUSERSet.GROUPUSER[0];
			}
		}));
		return roleitem;
	},
	getUserRole: function(params)
	{
		if (undefined == params){
			params = {};
		}
		params.sync = true;
		params._fd="PMZHBT_CLUSERROLE";
		var d = this.getObjectStructure("MBS_GROUPUSER",params);
		var roleitem;
		d.addCallback(dojo.hitch(this, function(response)
		{
			roleitem = response.QueryMBS_GROUPUSERResponse.MBS_GROUPUSERSet.GROUPUSER[0];
		}));
		return roleitem;
	},
	 
	//_domainCache: {},	// cache the results by DOMAINID
	
	
	//Get a domain or a list of domains
	getDomain: function(params) {
		var d = null,
		domain = this.cache.domain;
		
		params._verbose=false;		 
		var	os = "MXDOMAIN";		
		
		if(undefined != params.DOMAINID && (dojo.isArray(params.DOMAINID) ||  undefined === domain.get(params.DOMAINID) )   ) {     
			d = this.getObjectStructure(os, params);
			d.addCallback(function(response){
				var os_root = response.QueryMXDOMAINResponse;
				
				if(os_root.rsCount > 0) {
					for (var i=0;i<os_root.rsCount;i++) {
                      var MAXDOMAIN = os_root.MXDOMAINSet.MAXDOMAIN[i];
                      var domainid = MAXDOMAIN.DOMAINID;                      
					  domain.put(domainid,MAXDOMAIN);					    
				   }
				}
				return response;
			});
		} else {
			d = new dojo.Deferred();
			d.callback(domain.get(params.DOMAINID) ? domain.get(params.DOMAINID) : new Error(params.DOMAINID));
		}
		d.addErrback(function(response){
			console.error("tpeaQuery().getDomain has failed: ", response);
			return response;
		});

		return d;
	},

	//we could also pass an array of domains to get them all at once
	getDomainSynonymTable: function(domainid) {
		//console.log("_srmQuery.getDomainSynonymTable - " + domainid);		
		var synonyms = null,
		domainSynonyms = this.cache.domainSynonyms,  
		domain = this.cache.domain;
		
		//If passed array get all at once
		if(dojo.isArray(domainid)){
			var params = {sync:true};
			
			var domainids = [];
			dojo.forEach(domainid, dojo.hitch(this,function(domain){
				domainids.push(domain);				 
			}));
			
			 params.DOMAINID=domainids;
             params["DOMAINID.ormode"]=1;
             params._exactmatch=0;
			 this.getDomain(params);  //Get list of domains
			
			 //Cache domains
			 dojo.forEach(domainid, dojo.hitch(this,function(d){
			    var synonyms = domain.get(d).SYNONYMDOMAIN;
			    //var synonyms = domain.get(domain).QueryMXDOMAINResponse.MXDOMAINSet.MAXDOMAIN[0].SYNONYMDOMAIN; 
				domainSynonyms.put(d,new ibm.tivoli.tpae.dojo.data.SynonymDomain(synonyms));	
			 }));
			 return;			
		} 
		
		if(undefined === domainSynonyms.get(domainid)) {
			if(undefined === domain.get(domainid)){
				// don't have the data yet. Get it now.
				console.log("_srmQuery.getDomainSynonymTable - " + domainid);	
				this.getDomain({DOMAINID: domainid, sync: true});
			}			
                       
			//cache it
            var synonyms = domain.get(domainid).SYNONYMDOMAIN;
            //var synonyms = domain.get(domainid).QueryMXDOMAINResponse.MXDOMAINSet.MAXDOMAIN[0].SYNONYMDOMAIN;        
			domainSynonyms.put(domainid,new ibm.tivoli.tpae.dojo.data.SynonymDomain(synonyms));			
		}
		
		return domainSynonyms.get(domainid);
	},


	getLanguageTable: function(params)
	{
		console.log("_srmQuery.getLanguageTable");
		if (undefined == params){
			params = {};
		}
		params.ENABLED = "true";
		return this.getObjectStructure("MBS_LANGUAGE", params);
	}	
});
ibm.tivoli.tpae.dojo.data._tpaequery = null;
ibm.tivoli.tpae.dojo.data.tpaeQuery = function(){
	// summary: returns the singleton query object
	if(!ibm.tivoli.tpae.dojo.data._tpaequery){
		ibm.tivoli.tpae.dojo.data._tpaequery = new ibm.tivoli.tpae.dojo.data._tpaeQuery();
	}
	return ibm.tivoli.tpae.dojo.data._tpaequery;	// Object
};
//-------------------------
dojo.declare("ibm.tivoli.tpae.dojo.data.SynonymDomain", null,
{
	synonyms: null,
	length: 0,
	
	constructor: function(synonyms) 
	{
		this.synonyms = synonyms;
		if(this.synonyms) {
			this.length = this.synonyms.length;
		} 
	},
	descriptionByValue: function(value)
	{
		var desc = this.fieldByKey("VALUE", "DESCRIPTION", value);
		if(undefined == desc){
			desc = value;
		}
		return desc;
	},
	valueByMaxvalue: function(maxvalue)
	{
		return this.fieldByKey("MAXVALUE", "VALUE", maxvalue);
	},
	fieldByKey: function(keyfield, valfield, keyvalue)
	{
		for(var i = 0; i < this.length; ++i) {
			var s = this.synonyms[i];
			if(keyvalue === s[keyfield]) {
				return s[valfield];
			}
		}
		return null;
	}
});
});

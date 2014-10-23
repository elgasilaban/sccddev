//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

/**
 * These classes provide all the data access for the UI.
 * The high-level get*() methods retrieve the data and reformat for
 * the UI's consumption.  If you want the raw data, call getObjectStore() directly.
 *  
 * The TSAM specific queries ought to be factored out into a class in TSAM_web,
 * but that would mean moving MyDeploymentsGrid and DeploymentDetails too, and I'm not ready to do that
 */
dojo.provide("com.ibm.ism.pmsc.dojo.srmBaseQuery");
dojo.provide("com.ibm.ism.pmsc.dojo._ajaxQuery");

/**
 * Handle ajax data queries.
 * Directs the query through the proxy servlet if necessary 
 */
dojo.declare("com.ibm.ism.pmsc.dojo._ajaxQuery", null, 
{
	_proxyUrl: "/SRMCommonsWeb/ProxyServlet",
	_timeout: Infinity,
	devMode: false,

	restOnly: true, /* For REST navigator */
	
	constructor: function()
	{
		this._timeout = parseInt(com.ibm.ism.pmsc.dojo.getConfigProperty("QueryTimeout"));
		if(isNaN(this._timeout) || this._timeout < 0) {
			this._timeout = Infinity;
		}
		var dm = com.ibm.ism.pmsc.dojo.getConfigProperty("Devmode");
		this.devMode = (dm == "true" || dm == "1");
	},
	useProxy: function(url)
	{
		return false; //fpb
		var bUseProxy = true;

		if(!this.devMode) {
			if('/' == url.charAt(0)) {
				bUseProxy = false;
			}
			else {
				var m = url.match(/:\/\/([^/]+)/);
				if(m) {
					var data_host = m[1];
					bUseProxy = (data_host != window.location.host);
				}
			}
		}
		return bUseProxy;
	},
	get: function(/*string*/url, /*boolean*/sync, /*object*/query_args)
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
		if( url.match(/rest\/rest/)  || url.match(/restweb\/rest/)) {  //fpb
			_data._format = "json";
		}
		else {
			_data.format = "json";
		}

		for(var p in query_args) {
			_data[p] = query_args[p];
		}
		
		_data._lid = "PMSCADMUSR"; //fpb
		_data._lpwd = "maxadmin";
		
		var errHandler = dojo.hitch(this, this._ajaxError);
		
		var _deferred = dojo.xhrGet({
			url: _url,
			content: _data,
			headers: _xtraHeaders,
			sync: _sync,
			timeout: this._timeout,
			handleAs: "json",
			load: function(response, ioArgs) 
			{
				console.log("loaded");
				//debugger;
				return response;
			},
			error: function(response, ioArgs)
			{
				errHandler(response, ioArgs); 
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
		if( url.match(/rest\/rest/) ) {
			_data._format = "json";
		}
		else {
			_data.format = "json";
		}
		for(var p in data) {
			_data[p] = data[p];
		}
		var _deferred = dojo.xhrPost({
			url: _url,
			content: _data,
			headers: _xtraHeaders,
			sync: _sync,
			handleAs: "json",
			load: function(response, ioArgs) 
			{
				console.log("loaded");
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
					new ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(msg);
					new ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(response);
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
		}
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
			var msg = "ajaxQuery.get failure: " + response.toString()
			console.error(msg);
			new ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(msg);
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

com.ibm.ism.pmsc.dojo._propmap = {};
com.ibm.ism.pmsc.dojo.getConfigProperty = function(pname)
{
	if(undefined == com.ibm.ism.pmsc.dojo._propmap[pname]) 
	{
		dojo.xhrGet({
			url: "/SRMCommonsWeb/SimpleSrm",
			content: {p: pname},
			sync: true,
			handleAs: "text",
			load: function(response, ioArgs) 
			{
				com.ibm.ism.pmsc.dojo._propmap[pname] = response.trim();
				return response;
			},
			error: function(response, ioArgs) 
			{
				var msg = "getConfigProperty failure";
				if(ioArgs && ioArgs.xhr) {
					msg += "(" + ioArgs.xhr.status + "): " + ioArgs.xhr.responseText;
				}
				console.error(msg);
				new ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(msg);
				return response;
			}
		});
	}
	return com.ibm.ism.pmsc.dojo._propmap[pname];
}

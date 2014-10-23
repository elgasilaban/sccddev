/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */


// jsStorage is used for browsers that do not support local or session storage
var jsStorage;

/*
 * this method will load a list of domains (used by page)
 */
loadDomains = function(domains)
{
	for(var x = 0; x < domains.length; x++)
	{
		loadDomain(domains[x]);
	}
};

/*
 * this method will load the domain passed in
 * if the domain is already there, we won't reload it (TODO need to check the timestamp/hash to see if we should reload the bundle)
 */
loadDomain = function(domain)
{
	if (DESIGNMODE)
	{
		return;
	}

	// check to see if domain is already in the cache
	var bundle = null;
	if (browserSupportsLocalStorage())
	{
		bundle = localStorage.getItem(domain.did);
		if (bundle != null && domainNeedRefresh(domain, dojo.fromJson(bundle)))
		{
			bundle = null;
		}
		updateLocalStorageIndex(domain.did);
	}
	if (!bundle)
	{
		if (browserSupportsSessionStorage())
		{
			bundle = sessionStorage.getItem(domain.did);
			if (bundle == null)
			{
				if (DEBUGLEVEL > 0)
				{
					console.log("loadDomain(): Domain [" + domain.did + "] is not in local or session storage... requesting from servlet.");
				}
				// request domain from servlet
				getDomain(domain);
			}
			else
			{
				if (DEBUGLEVEL > 0)
				{
					console.log("loadDomain(): Domain [" + domain.did + "] is in session storage.");
				}
			}
		}
		else
		{
			if (jsStorage == null)
			{
				jsStorage = new javascriptStorage();
			}
			bundle = jsStorage.getItem(domain.did);
			if (bundle == null)
			{
				if (DEBUGLEVEL > 0)
				{
					console.log("loadDomain(): Domain [" + domain.did + "] is not in javascript storage... requesting from servlet.");
				}
				// request domain from servlet
				getDomain(domain);
			}
			else
			{			
				if (DEBUGLEVEL > 0)
				{
					console.log("loadDomain(): Domain [" + domain.did + "] is in javascript storage.");
				}
			}
		}
	}
	else
	{
		if (DEBUGLEVEL > 0)
		{
			console.log("loadDomain(): Domain [" + domain.did + "] is in local storage.");
		}
	}
};

domainNeedRefresh = function(domain,localObj)
{
	if(domain.simpledomain)
	{	
		if (domain.ts == "null")
		{
			return false;
		}
		else
		{
			if (localObj.keystamp == domain.ts)
			{
				return false;
			}
			else
			{
				removeDomain(domain.did);
				return true;
			}
		}
	} 
	else
	{
		if (domain.validfor == "null")
		{
			return false;
		}
		else 
		{
			var curts= new Date().getTime();
			if (curts < (localObj.timestamp + (domain.validfor*86400000)))
			{
				removeDomain(domain.did);
				return true;
			}
		}
	}
	return false;
};

removeDomain = function(domain)
{
	localStorage.removeItem(domain);
	removeLocalStorageIndex(domain);
	sessionStorage.removeItem(domain);
};

browserSupportsLocalStorage = function()
{
	try
	{
		return 'localStorage' in window && window['localStorage'] !== null;
	}
	catch (e)
	{
		return false;
	}
};

browserSupportsSessionStorage = function()
{
	try 
	{
		return 'sessionStorage' in window && window['sessionStorage'] !== null;
	} 
	catch (e) 
	{
		return false;
	}
}

getDataStore = function(id)
{
	if (DESIGNMODE)
	{
		return null;
	}
 	var ds = new DataStore(id);
 	var bundle = null;
 	if(browserSupportsLocalStorage())
 	{
	 	bundle = localStorage.getItem(id);
	 	updateLocalStorageIndex(id);
 	}
 	if (!bundle)
 	{
 		if(browserSupportsSessionStorage())
 		{
 			bundle = sessionStorage.getItem(id);
 		}
	 	else
	 	{
	 		if (jsStorage != null)
			{
	 			bundle = jsStorage.getItem(id);
	 		}
	 	}
 	}
	if (bundle == null)
 	{
		return null;
 	}
 	ds.contents = dojo.fromJson(bundle);
 	return ds;
};

DataStore = function(id)
{
	this.id = id;
	this.contents = {
		dataBundleId: id,
		cacheable: true,
		complete: false,
		timestamp: "",
		type: "",
		attributes: new Array(),
		data: new Array()
	};
};

DataStore.prototype.addRow = function(newRow)
{
	this.contents.data.push(newRow);
};

DataStore.prototype.filter = function(filterObj)
{
	if(!filterObj || DESIGNMODE)
	{
		return;
	}
	var len = filterObj.params.length;
	if(len == 0)
	{
		return;
	}
	var exactMatch = false;
	if(filterObj.exactMatch)
	{
		exactMatch = filterObj.exactMatch;
	}

	var keepRows = new Array();
	for(var columnIndex = 0; columnIndex < len; columnIndex++)
	{
		var keepRowsAny = new Array();
		var filterValue = filterObj.params[columnIndex].value;
		var filterAttribute = filterObj.params[columnIndex].attribute;
		for(var rowIndex = 0; rowIndex < this.length(); rowIndex++)
		{
			var value = this.getValue(rowIndex, filterAttribute);
			if(value == undefined)  //leave this as is.  if(!value) does not work need to compare "" for site/org
			{
				continue;
			}
			value=value.toLowerCase();
			if(exactMatch)
			{
				if(value==filterValue)//this will cover exact match and empty strings
				{
					keepRows.push(this.contents.data[rowIndex]);
					this.removeRow(rowIndex);
					rowIndex--; //decrement since row has been removed. Keep index in sync.
				}
			}
			else
			{
				var startMatch = value.indexOf(filterValue);
				if(startMatch != -1)
				{
					if(startMatch == 0)
					{
						keepRows.push(this.contents.data[rowIndex]);
					}
					else if(startMatch > 0)
					{
						keepRowsAny.push(this.contents.data[rowIndex]);
					}
					this.removeRow(rowIndex);
					rowIndex--; //decrement since row has been removed. Keep index in sync.
				}
			}
		}
		keepRows = keepRows.concat(keepRowsAny);
	}
	this.contents.data = keepRows;
};

DataStore.prototype.getValue = function(rowIndex, attributeName)
{
	var row = this.getRow(rowIndex);
	var attributeNum = this.contents.attributes[attributeName.toLowerCase()];
	if(!undef(attributeNum))
	{
		return row[attributeNum];
	}
	else
	{
		console.error("Attribute: "+attributeName.toLowerCase()+" does not exist in the "+this.getID()+" datastore!");
	}
	return null;
};

DataStore.prototype.length = function()
{
	return this.contents.data.length;
};

DataStore.prototype.getID = function()
{
	return this.id;
};

DataStore.prototype.getRow = function(index)
{
	return this.contents.data[index];
};

DataStore.prototype.isComplete = function()
{
	return complete;
};

DataStore.prototype.removeRow = function(rowIndex)
{
	if (rowIndex < this.length() &&  rowIndex >= 0)
	{
		this.contents.data.splice(rowIndex, 1);
	}
};

/*
 * End Client Interface
 */

getDomain = function(domaininfo)
{
	var XHRACTION = MAXRCURL+"/dp/";

	var content = {
		uisessionid: queueManager.sessionId,
		datastoreid: domaininfo.did,
		domaints: domaininfo.ts
	};

	dojo.xhrPost( {
		url:      XHRACTION,
		handleAs: "json",
		responseType: "application/json",
		content:  content,
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		error: function(error, ioArgs) {
			// TODO Handle the error
		},
		load: processBundleForCache
	});
};

getInstantBundle = function(menuController, component, pageOffset, fldInfo)
{
	var XHRACTION = MAXRCURL+"/dp/";
	var filterObj = {  "ta_attrs" : fldInfo.domain.ta_attrs,
			"value" : component.value };
	var content = {
			uisessionid   : queueManager.sessionId,
			datastoreid : fldInfo.domain.id,
			filterobj: dojo.toJson(filterObj)
	};

	dojo.xhrPost( {
		url:      XHRACTION,
		handleAs: "json",
		responseType: "application/json",
		content:  content,
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		error: function(error, ioArgs) {
			// TODO Handle the error
		},
		load: function (responseObj, ioArgs) {
			if(undef(responseObj))
				return null;

			var id = responseObj.id;
			var ds = new DataStore(id);
			ds.contents = responseObj;

			menuController.filterDataStore = ds;
			menuController.buildTAMenu(component, pageOffset, fldInfo);
		}
	});
};

processBundleForCache = function(responseObj, ioArgs)
{
	// Handle response
	if(undef(responseObj))
		return null;

	var id = responseObj.id;
	var ds = new DataStore(id);
	ds.contents = responseObj;
	responseObj.timestamp=new Date().getTime();
	responseObj.keystamp = ioArgs.args.content.domaints;
	// if it's cacheable, put it in the persistent browser cache, otherwise leave it in the session cache
	// check for the quota exceeded error to see if the cache is full
	try {
		if(ds.contents.cacheable && browserSupportsLocalStorage())
		{
			if (DEBUGLEVEL > 0)
			{
				console.log("processBundleForCache():, [" + id + "] using localStorage");
			}
			localStorage.setItem(id, dojo.toJson(responseObj));
			createLocalStorageIndex(id);
		}
		else if(browserSupportsSessionStorage())
		{
			if (DEBUGLEVEL > 0)
			{
				console.log("processBundleForCache(): [" + id + "] using sessionStorage");
			}
			sessionStorage.setItem(id, dojo.toJson(responseObj));
		}
		else
		{
			if (DEBUGLEVEL > 0)
			{
				console.log("processBundleForCache(): [" + id + "] using javascriptStorage");
			}
			jsStorage.setItem(id, dojo.toJson(responseObj));
		}
	} catch (e) {
		if (e.number == -2147024882 || e.name == "NS_ERROR_DOM_QUOTA_REACHED") 
		{
			// if the space is exceeded, we need to make room for this bundle if possible (remove unused items)
			if (DEBUGLEVEL > 0)
			{
				console.warn("localStorage is full, attempting to clear some space");
			}
			freeLocalStorage();
			processBundleForCache(responseObj, ioArgs);
		}
	}
};

FilterObject = function(exact)
{
	this.exactMatch = exact;
	this.params = new Array();
};

FilterObject.prototype.add = function(attribute, value)
{
	this.params.push({'attribute': attribute.toLowerCase(), 'value': value.toLowerCase()});
};

freeLocalStorage = function()
{
	storeIndexString = localStorage.getItem("storeIndex");
	if(storeIndexString==null)
	{
		localStorage.clear();
	} else {
		storeIndexObject = dojo.fromJson(storeIndexString);
		oldestLastUsed = null;
		oldestId = null;
		for (var i in storeIndexObject)
		{
			if(oldestLastUsed == null || storeIndexObject[i].lastused < oldestLastUsed)
			{
				oldestLastUsed = storeIndexObject[i].lastused;
				oldestId = storeIndexObject[i].id;
			}
		}
		removeDomain(oldestId);
		if (DEBUGLEVEL > 0)
		{
			console.log("Deleting " + oldestId + " from localStorage.");
		}
	}
};

removeLocalStorageIndex = function(domain)
{
	storeIndexString = localStorage.getItem("storeIndex");
	if(storeIndexString!=null)
	{
		storeIndexObject = dojo.fromJson(storeIndexString);
		delete storeIndexObject[domain];
		storeIndexString = dojo.toJson(storeIndexObject);
		localStorage.setItem("storeIndex", storeIndexString);
	}
};

updateLocalStorageIndex = function(domain)
{
	storeIndexString = localStorage.getItem("storeIndex");
	if (storeIndexString == null)
	{
		return;
	}
	else
	{
		storeIndexObject = dojo.fromJson(storeIndexString);
	}
	indexDomain = storeIndexObject[domain];
	if(indexDomain==undefined)
	{
		return;
	}
	indexDomain.lastused = new Date().getTime();

	storeIndexObject[domain]  = indexDomain;
	storeIndexString = dojo.toJson(storeIndexObject);
	localStorage.setItem("storeIndex", storeIndexString);
};

createLocalStorageIndex = function(domain)
{
	storeIndexString = localStorage.getItem("storeIndex");
	if (storeIndexString == null)
	{
		storeIndexObject = new Object();
	}
	else
	{
		storeIndexObject = dojo.fromJson(storeIndexString);
	}
	indexDomain = storeIndexObject[domain];
	if(indexDomain==undefined)
	{
		indexDomain = {"id":domain};
	}
	indexDomain.lastused = new Date().getTime();
	storeIndexObject[domain] = indexDomain;
	storeIndexString = dojo.toJson(storeIndexObject);
	localStorage.setItem("storeIndex", storeIndexString);
};

// js class that acts like session or local storage, used when html5 not available
javascriptStorage = function()
{
	// create an empty json object to stuff the datastores into
	// load hash from top.name, or create a new array
	this.hash = {};
	// counter to keep track of hash size
	this.length = 0;
	this.loaded = false;

	this.getItem = function(key)
	{
		if(typeof(key) == 'undefined' || key == "")
			return;
			
		if (DEBUGLEVEL > 0)
		{
			console.log("javascriptStorage.getItem(" + key + ")");
		}
		// if this.hash hasn't been loaded yet, top.name is not empty, and there are no items in hash, load hash from top.name
		if (this.loaded == false && top.name != "" && typeof(this.hash[0]) != 'object')
		{
			if (DEBUGLEVEL > 0)
			{
				console.log(" ...loading domains");
			}
			try
			{
				this.hash = dojo.fromJson(top.name);
			}
			catch(e)
			{
				// if there is an exception converting top.name to json, init with empty hash
				this.hash = {};
			}
			this.loaded = true;
			if (DEBUGLEVEL > 0)
			{
				console.log(" ...domains loaded");
			}
		}
		return this.hash[key];
	}

	// need to update top.name when anything is modified	
	this.setItem = function(key, value)
	{
		if (DEBUGLEVEL > 0)
		{
			console.log("javascriptStorage.setItem(" + key + ", object)");
		}
		if (typeof(value) != 'undefined') 
		{
			this.hash[key] = value;
			this.length ++;
			top.name = dojo.toJson(this.hash);
		}
	}
	
	this.getMemSize = function()
	{
		return top.name.length;
	}
};

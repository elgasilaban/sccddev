/*
 * IBM Confidential
 * 
 * OCO Source Materials
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.MapTipsManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.i18n");
dojo.require("dijit.form.Select");

/**
 * Implement the logic for loading, parsing and caching Maptips. An mxn marker
 * can be enabled to show maptips. This marker must be associated with a Maximo
 * record so based on the mxdata the maptip can be loaded.
 * 
 * This manager will cache any already loaded maptip (based on objectname/id).
 * The maptip is loaded based on the rest format 'maptip' from the rest
 * interface.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.MapTipsManager", ibm.tivoli.fwm.mxmap._Base, {
	_templateCache: {},
	_menuCache: {},
	maximo: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._templateCache = {};
		this._menuCache = {};
	},
	/**
	 * It enables the infowindow replacement with the associated maptip
	 * 
	 * @param mapstraction
	 *            marker
	 * @param mxdata
	 *            json object with this structure: { mboName://NAME OF THE
	 *            MAXIMO OBJECT, uid: { name://NAME OF THE COLUMN WITH THE MBO
	 *            UID value: //VALUE THE MBO UID } * }
	 */
	enableMarker: function(marker, mxdata)
	{

		// here is the trick
		// replace the marker's openBubble function by a function that
		// first tries to load the maptip from maximo, set the
		// infoBubble and only then call the original openBubble.
		//
		marker.openBubble.clone = function()
		{
			var that = this;
			var temp = function temporary()
			{
				return that.apply(this, arguments);
			};
			for (key in this)
			{
				temp[key] = this[key];
			}
			return temp;
		};
		var obclone = marker.openBubble.clone();
		var me = this;
		marker.openBubble = function()
		{
			me._handleOpenBubble(marker, mxdata, obclone);
		};
	},
	// checks if a maptip template was already loaded
	_isTemplateLoaded: function(objectname, id)
	{
		return this._templateCache[objectname] && this._templateCache[objectname][id];
	},
	// gets a maptip template
	// * it assumes the template is loaded.
	_getTemplate: function(objectname, id)
	{
		return this._templateCache[objectname][id];
	},
	// after loading the template from the server it
	// updates the cache and trigger the openMapTip
	_onTemplateLoaded: function(html, marker, mxdata, fct)
	{
		var objectname = mxdata.mboName;
		var id = mxdata.uid.value;
		console.log(html);
		this._updateTemplate(objectname, id, html);
		this._openMapTip(objectname, id, marker, fct);
	},
	// update the cache with template data
	_updateTemplate: function(objectname, id, html)
	{
		if (!this._templateCache.hasOwnProperty(objectname))
		{
			this._templateCache[objectname] = {};
		}
		this._templateCache[objectname][id] = html;
	},
	// triggers the mapstraction openbubble method
	// * it assumes the template is loaded.
	_openMapTip: function(objectname, id, marker, fct)
	{
		var html = this._getTemplate(objectname, id);
		var menuData = this._getMenuData(objectname);
		var infoDOM = this._createInfoDOM(html, menuData, objectname, id);
		marker.setInfoBubble(infoDOM);
		fct.apply(marker);
	},
	_createInfoDOM: function(html, menuData, objectName, objectId)
	{
		var outerDiv = dojo.create("div", {
			style: {
				overflow: "auto",
				marginTop: "8px"
			}
		});
		var htmlDiv = dojo.create("div", {
			innerHTML: html
		}, outerDiv);
		if (menuData)
		{
			var menuDiv = dojo.create("div", null, outerDiv);
			this._newSelect(menuData, menuDiv, objectName, objectId);
		}
		return outerDiv;

	},
	// on request to open the marker bubble we try to update the maptip
	// content;
	// fct - is the original open bubble function from mapstraction.
	_handleOpenBubble: function(marker, mxdata, fct)
	{
		var objectname = mxdata.mboName;
		console.log("objectname",objectname);
		var id = mxdata.uid.value;
		// it's important to always load the info on server so we are skipping
		// the cache on the template
		/*
		 * // if the template has already been is loaded, then the menu had been
		 * loaded // before. if (this._isTemplateLoaded(objectname, id)) {
		 * console.info("Cache hit for " + objectname + ":" + id);
		 * this._openMapTip(objectname, id, marker, fct); } // if the template
		 * is not loaded, confirm the menu has already // been loaded for
		 * another // record. // if the menu was not loaded, load it and then
		 * load the // template afterwards. else {
		 */
		if (this._isMenuLoaded(objectname))
		{
			this._loadTemplate(mxdata, marker, fct);
		}
		else
		{
			this._loadMenu(mxdata, marker, fct);
		}
		// }

	},
	_loadMenu: function(mxdata, marker, fct)
	{
		var fctSuccess = dojo.hitch(this, function(data)
		{
			this._onMenuLoaded(data, marker, mxdata, fct);
		});
		var fctError = dojo.hitch(this, function(error)
		{
			this._onMenuLoadError(error, marker, mxdata, fct);
		});
		this.maximo.loadMapTipItems(fctSuccess, fctError);
	},
	_loadTemplate: function(mxdata, marker, fct)
	{

		var fctSuccess = dojo.hitch(this, function(data)
		{
			this._onTemplateLoaded(data, marker, mxdata, fct);
		});
		var fctError = dojo.hitch(this, function(error)
		{
			this._onTemplateLoadError(error, marker, mxdata, fct);
		});
		// must load it.
		this.maximo.loadMapTipTemplate(mxdata, fctSuccess, fctError);

	},
	// on any error we just set the maptip content with the error
	_onTemplateLoadError: function(error, marker, mxdata, fct)
	{
		marker.setInfoBubble("Error loading maptip " + error);
		fct.apply(marker);
	},
	// on any error we just set the maptipmenu content with the error
	_onMenuLoadError: function(error, marker, mxdata, fct)
	{
		marker.setInfoBubble("Error loading maptipmenu " + error);
		fct.apply(marker);
	},
	_onMenuLoaded: function(menusJSON, marker, mxdata, fct)
	{
		for ( var objName in menusJSON)
		{
			var menuItems = menusJSON[objName];
			console.log(objName, menuItems);
			this._updateMenu(objName, menuItems);
		}
		this._loadTemplate(mxdata, marker, fct);
	},
	_updateMenu: function(objectname, menuJSON)
	{
		var moreDetails = ibm.tivoli.fwm.i18n.getMaxMsg("map", "moredetailsaboutrecord");
		var items = [ {
			value: 'noaction',
			label: moreDetails,
			selected: true
		} ];
		for ( var itemMenu in menuJSON)
		{

			var itemInfo = {
				value: menuJSON[itemMenu],
				label: menuJSON[itemMenu].name
			};
			itemInfo.itemData = menuJSON[itemMenu];
			items.push(itemInfo);
		}
		this._menuCache[objectname] = items;
	},
	_isMenuLoaded: function(objectname)
	{
		return this._menuCache[objectname] != null;
	},
	_newSelect: function(menuJSON, div, objectName, objectId)
	{
		console.log(menuJSON);
		var select;
		var fctOnChange = dojo.hitch(this, function(item)
		{
			if ('noaction' != '' + item)
			{
				console.log("dialog", item);
				this.maximo.showMaximoDialog(item.dialogid, objectName, objectId, item.relationship);
				select.reset();
			}
		});
		select = new dijit.form.Select({
			onChange: fctOnChange
		}, div);
		select.addOption(menuJSON);
		select.reset();
		select.startup();

		// Issue 12-12797
		if (navigator.userAgent.indexOf("Android") > -1)
		{
			var mobileHeight = "40px";
			select.domNode.style.height = mobileHeight;
			var openDropDown = select.openDropDown;
			select.openDropDown = function() {
				var items = select.dropDown.getChildren();
				items.forEach(function(item)
				{
					item.domNode.style.height = mobileHeight;
				});
				openDropDown.apply(select, arguments);
			};
		}
	},
	_getMenuData: function(objectName)
	{
		return this._menuCache[objectName];
	},
	destroyRecursive: function()
	{
		this._templateCache = {};
	}
});
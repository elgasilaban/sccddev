/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */


var menuWorking = false;
var showingMenu = false;

function MenuController(id,next,previous,search,searchFor)
{
	this.resources = {	"next"		: next,
			"previous"	: previous,
			"search" 	: search,
			"searchfor" : searchFor
	};

	this.settings = {	"scroll": true
	};

	this.typeahead = { "settings" : { 	"minimumchars"	: 0,
		"usepages"		: true,
		"showsearch"	: true,
		"menulength"	: 8,
		"separator"		: " : ",
		"shownextcount"	: false,
		"showprevcount"	: false,
		"instantfetch"	: false
	}
	};

	this.topMenu;
	this.RTL=false;
	this.holder = document.getElementById('menuholdertd');
	this.cache = null;
	this.filterDataStore = null;
	this.menuIndex = topLevelMenus.length;
	this.menutimer = null;
	this.id = id;
	topLevelMenus[this.id] = this;
	
	/**
	 * Used to build a menu based on JSON Example struct is: { "id":"mainmenu",
	 * "items":[ {"id":"menuitem0","text":"menuitem
	 * 0","image":"modimg_plans.gif","event":"","sub":""},
	 * {"id":"menuitem1","text":"menuitem
	 * 1","image":"modimg_pm.gif","event":"","sub": {"id":"sub1","items":[
	 * {"id":"submenuitem0","text":"menuitem
	 * 0","image":"","event":"","sub":"sub2"},
	 * {"id":"submenuitem1","text":"menuitem
	 * 1","image":"","event":"","sub":""}}, {"id":"menuitem2","text":"menuitem
	 * 2","image":"modimg_problem.gif","event":"","sub":""} ]} ]}
	 */
	this.buildMenu=function(target,menuDef)
	{
		return this.buildMenuLevel(0,target,menuDef);
	};
	
	this.buildMenuLevel=function(level,target,menuDef)
	{
		if(!this.holder)
			return;
		if(level>0 && this.staticMenu) {
			this.holder = document.body;
		}
			
		if(menuDef.id == "0") {
			menuDef.id = target + "_menu";
		}
	 	this.baseClassName = (menuDef.baseClassName)? menuDef.baseClassName : "menus";
	 	this.hasSubClassName = (menuDef.hasSubClassName)? menuDef.hasSubClassName : "submenu";
	 	this.subClassName = (menuDef.subClassName)? menuDef.subClassName : "menus";
	 	this.staticMenu = (menuDef.staticMenu)? menuDef.staticMenu : false;
		this.RTL=(document.body.dir=="rtl");
		var menuId = menuDef.id;
		var items = menuDef.items;
		if(undef(items) || items.length==0)
			return;
		if(tpaeConfig.fp7504==true && MAXRECENTAPPS > 0 && menuDef.mxevent=="changeapp" && level == 0 && menuDef.items[0]["id"]!="recentApps") {
			var recentAppList = getRecentAppList();
			if(recentAppList && recentAppList.length>0) {
				var recentItem = {"id":"recentApps","className":"recentAppsMenuItem","image":"recentapps.png","border":false,"text":RECENTAPPTEXT,"sub":{"id":"recentAppList","mxevent":menuDef.mxevent,"items":recentAppList}};
				menuDef.items[0]["border"]=true;
				menuDef.items.unshift(recentItem);
			}
		}
		var menu = document.createElement("ul");
		var objs = document.getElementsByTagName("OBJECT");
		dojo.attr(menu, 
				{  }
			);
		if(this.staticMenu) {
	 		dojo.connect(this.holder.parentNode, "mousedown", this.holder.parentNode, hideAllMenusNF);	
	 		dojo.connect(this.holder.parentNode, "scroll", this.holder.parentNode, hideAllMenusNF);
		}
		menu.setAttribute("target",target);
		if(!undef(menuDef.prevIndex)) {
			menu.setAttribute("prevIndex", menuDef.prevIndex);
		}
		if(!undef(menuDef.nextIndex)) {
			menu.setAttribute("nextIndex", menuDef.nextIndex);
		}
		dojo.attr(menu, {
			"role":"menu",
			"type":menuDef.type,
			"id":menuId,
			"level":level,
			"static":this.staticMenu,
			"aria-labelledby":menuDef.labelledBy
		});
		if(level==0) {
			this.trueTop = menuId;	
		}
		dojo.connect(menu, "mouseleave", this, function(event) {
			if(tpaeConfig.menuHideDelay>0) {
				if(this.menutimer!=null) {
					this.stopHideMenuTimer();
				}
				var menuId = (this.topMenu)?((this.topMenu.id)? this.topMenu.id: this.topMenu):this.trueTop;
				this.menutimer = window.setTimeout("topLevelMenus['shared']._hideMenu('"+menuId+"'); topLevelMenus['shared']._removeHighlight('"+this.trueTop+"');", tpaeConfig.menuHideDelay);
			}
		});
		menu.setAttribute("role","menu");
		menu.setAttribute("type",menuDef.type);
		menu.setAttribute("id",menuId);
		menu.setAttribute("level",level);
		if(!undef(menuDef.openat)) {
			dojo.attr(menu, {"openat":menuDef.openat});
		}
		var typeAheadMenu=(menuDef.typeahead==true);
		if(typeAheadMenu) {
			dojo.attr(menu, {"typeahead":"true"})
		}
		var firstSub;
		for(var i=0;i<items.length;i++)
		{
			var item = items[i];
			//If a sub us expected, but has no items, don't bother with this item
			if(!undef(item.sub) && (undef(item.sub.items) || item.sub.items.length==0)) {
				continue;
			}
			var menuItem = document.createElement("li");
			var menuItemId = menu.id+"_"+i;
			dojo.attr(menuItem,{"draggable":"false"});
			var itemText;
			var menuItemA =  document.createElement("a");
			var tabIndex = -1;
			if(i==0) {
				tabIndex = 0;
			}
			dojo.attr(menuItemA,{"id":menuId+"_"+i+"_a","role":"menuitem","tabindex":tabIndex, "draggable":"false"});
			dojo.connect(menuItem, "keydown", this, this._menuKey);
			var disabled = (!undef(item.disabled) && (item.disabled==true || item.disabled=="true"));
			var href = "javascript: void(0);";
			if(!disabled && (undef(item.sub) || typeAheadMenu))
			{
				if(!typeAheadMenu && !item.value && !this.staticMenu) {
					item.value=item.id;
				}
				if(undef(item.targetId)) {
					item.target=target;
				}
				else {
					item.target=item.targetId;
				}
				if(item.mxevent)
				{
					item.event = item.mxevent;
					dojo.attr(menuItemA,{"eventType":item.event});
					this.addEventStateHandler(menuItem);
				}
				else
				{
					if(menuDef.mxevent)
					{
						item.event=menuDef.mxevent;
					}
					else
					{
						item.event = "click";
					}
				}
				if(item.eventvalue)
					item.value = item.eventvalue;
				href = "javascript: topLevelMenus['"+this.id+"'].menuClick("+dojo.toJson(item)+");";
				menuItem.setAttribute("eventtype",item.event);
				this.addEventStateHandler(menuItem);
				dojo.attr(menuItem,{"anchorId":menuId+"_"+i+"_a"})
			}
			menuItemA.setAttribute("href",href);
			menuItem.appendChild(menuItemA);
			menu.appendChild(menuItem);
			if(typeAheadMenu)
			{
				itemText=item.display;

				if(i==menuDef.matchedRow) {
					appendClass(menuItem, "tadefault");
				}
				menuItem.style.padding="0px 4px 0px 4px";
				menuItem.style.lineHeight="18px";
			}
			else
			{
				dojo.attr(menuItem,{"id":menuItemId});
				// the id?
				itemText=item.text;
				var menuImage = document.createElement("img");
				menuImage.className="menuimg";
				menuImage.setAttribute("alt","");
				if(undef(item.image))
				{
					menuImage.src=IMAGE_PATH+"menus/blank.gif";
				}
				else
				{
					menuImage.src=IMAGE_PATH+item.image;
				}
				menuItemA.appendChild(menuImage);
				if(!undef(item.sub))
				{
					menuItemA.setAttribute("aria-haspopup","true");
					menuItemA.className = this.hasSubClassName;
					item.sub.id = menuId + "_"+ item.sub.id + "_level_" + (level+1);
					dojo.attr(menuItem,{"subid":item.sub.id});
			 	 	item.sub.baseClassName = this.baseClassName;
			 	 	item.sub.hasSubClassName = this.hasSubClassName;
			 	 	item.sub.subClassName = this.subClassName;
			 	 	item.sub.staticMenu = this.staticMenu;
			 	 	item.sub.labelledBy = menuItem.id;
					var sub = this.buildMenuLevel(level+1,target,item.sub);
					if(undef(sub)) { //If the sub doesn't build for any reason we should remove the menu item. 
						menu.removeChild(menuItem);
					}
					if(!firstSub) {
						firstSub = sub;
					}
				}
				if(item.className) {
					menuItem.className = item.className;
				}
				if(level < 1 && this.staticMenu) {
					menuItemA.className += " dojoxEllipsis";
				}
			}
			var tNode = document.createElement("SPAN");
			menuItemA.appendChild(tNode);
			if(item.innerClassName) {
				tNode.className = item.className;
			}
			tNode.innerHTML=itemText;
			tNode.id = menuItemA.id+"_tnode";
			dojo.attr(menuItemA,{"aria-labelledby":tNode.id});
			if(item.border==true || item.border=="true") {
				menuItem.className+=" menuborder";
			}
			//menuItem.className+= " "+item.className;
			if(disabled)
			{
				menuItemA.className="off";
				menuItemA.setAttribute("aria-disabled","true");
				dojo.attr(menuItem,{"active":"false"});
			}
			if(!MOBILEAGENT) {
				dojo.connect(menuItem, "mouseover", this, this._showSub);
			}
			else {
				addListener(menuItem, "click", function(event) { 
					menus._showSub(event); 
					menus._menuItemFocus(dojo.attr(this, "anchorId"));
				} , false);
			}
			dojo.connect(menuItem, "mouseover", this, function(event){ 
					this.stopHideMenuTimer(); 
					stopBubble(event);
				}
			);
		}
		menu.style.display="none";
		dojo.connect(menu, "mousedown", this, function(event){stopBubble(event)});
		dojo.connect(menu, "keydown", this,  function(event){stopBubble(event)});
		dojo.connect(menu, "keyup", this,  function(event){stopBubble(event)});
		dojo.connect(menu, "click", this,  function(event){stopBubble(event)});
		menu.className = this.baseClassName;
		if(level > 0) {
			menu.className = this.subClassName;;
		}
		menu.style.position="absolute";
		if(typeAheadMenu) {
			menu.style.background="#fbfbfb";
		}
		if(firstSub)
		{
			this.holder.insertBefore(menu, firstSub);
		}
		else
		{
			this.holder.appendChild(menu);
		}
		return menu;
	};

	this.addEventStateHandler = function(menuItem) {
		dojo.subscribe("appeventstate", null, function(message){
			if(message.eventtype != dojo.attr(menuItem, "eventtype"))
				return;
			if(message.enabled){
				dojo.forEach(dojo.query("img", menuItem), function(element) {
					removeClass(element, "opacity_20");
				});
				dojo.forEach(dojo.query("span", menuItem), function(element) {
					removeClass(element, "opacity_20");
					dojo.attr(element, {
						"disabled" : ""
					});
				});
				dojo.attr(menuItem, {
					"enabled" : "true",
					"ariaDisabled" : "false"
				});
			}
			else {
				dojo.forEach(dojo.query("img", menuItem), function(element) {
					appendClass(element, "opacity_20");
				});
				dojo.forEach(dojo.query("span", menuItem), function(element) {
					appendClass(element, "opacity_20");
					dojo.attr(element, {
						"disabled" : "disabled"
					});
				});
				dojo.attr(menuItem, {
					"enabled" : "false",
					"ariaDisabled" : "true"
				});
			}
		});
		
	};
	
	this.menuStateHandler=function(data) {
		var element = dojo.byId(this.elementId+"_a");
		if(!element || undef(dojo.attr(element,"eventType")) || undef(data.eventtype) || dojo.attr(element,"eventType")!=data.eventtype){
			return;
		}
		if(data.enabled.toString()=="false") {
			element.onclick=function(event) {return false;};	
		}
		else {
			element.onclick=null;
		}
		
		element.className=(!data.enabled)?"off":"";
		element.setAttribute("aria-disabled",!data.enabled);
		dojo.attr(dojo.byId(this.elementId),{"active":data.enabled});
	};
	
	/*
	 * Positions the menuholder where the click was fired and set it as visible
	 */
	this._showMenu=function(id,foc)
	{
		var menu = getElement(id);
		if(undef(menu))
		{
			return;
		}
		if(undef(foc))
		{
			foc=true;
		}
		var clientArea=document.getElementById(clientAreaId);
		var headerScrollDiv = document.getElementById(headerScrollDivId);
		this.topMenu=id;
		if(!this.trueTop) {
			this.trueTop = id;
		}
		menu.style.display = "";
		var openat = menu.getAttribute("openat");
		var top = 0;
		var left = 0;
		var	lastClickID=lastClickElement.id;
		if(!undef(lastClickID))
			lastClickElement=document.getElementById(lastClickID);
		if(!undef(clickX) && !undef(clickY))
		{
			left = clickX;
			top = clickY;
			clickX=null;
			clickY=null;
		}
		else if (openat == "northwest")
		{
			// Context menus
			top = getTopPosition(lastClickElement);
			left = getLeftPosition(lastClickElement);
			if((USERLANG=="AR")||(USERLANG=="HE"))
			{
				left+=lastClickElement.offsetWidth;
			}
		}
		else if (openat == "parentsouthwest")
		{
			var lc=lastClickElement.getAttribute("lc");
			var posEl;
			if(!undef(lc))
			{
				posEl = document.getElementById(lc);
			}
			if(!undef(posEl))
			{
				top= getTopPosition(posEl) + posEl.offsetHeight - 1;
				left = getLeftPosition(posEl) + 1;

				if((USERLANG=="AR")||(USERLANG=="HE"))
				{
					left+=(posEl.offsetWidth-menu.offsetWidth);
				}
			}
			else
			{
				//Due to structural differences in combobox and toolbarcombobox
				// we must make sure we get the correct element to use for the
				// left
				var testElement=lastClickElement.parentNode.parentNode.parentNode;
				top = getTopPosition(testElement) + testElement.offsetHeight - 1;
				try
				{
					if(!undef(testElement.getAttribute("control")))
					{

						if(isIE())
							testElement=lastClickElement.parentNode.previousSibling;// .parentNode;
						else
							testElement=lastClickElement.parentNode.previousSibling.parentNode;
						if(testElement.firstNode)
							testElement=testElement.firstNode;
						else
							testElement=testElement.firstChild;
					}
					left = getLeftPosition(testElement) + 1;
				}
				catch(error)
				{
					testElement=lastClickElement.parentNode;
					left = getLeftPosition(testElement) + 1;
				}
				if((USERLANG=="AR")||(USERLANG=="HE"))
				{
					left+=testElement.offsetWidth;
				}
			}
		}
		else
		{
			top = getTopPosition(lastClickElement) + lastClickElement.offsetHeight - 1;
			left = getLeftPosition(lastClickElement);

			if((USERLANG=="AR")||(USERLANG=="HE"))
			{
				left+=lastClickElement.offsetWidth-menu.offsetWidth;
			}
		}

		top+=document.body.scrollTop;
		if(!isIE() || (USERLANG!="AR" && USERLANG!="HE"))
			left+=document.body.scrollLeft;// Bidi menus not showing in the
		// correct location on IE with this

		var hrequired;
		var vrequired;
		if(DESIGNMODE)
		{
			hrequired = parseInt((document.body.offsetWidth-2)+document.body.scrollLeft) - parseInt(menu.offsetWidth)-10 + document.body.scrollLeft;
			vrequired = parseInt((document.body.offsetHeight-2)+document.body.scrollTop) - parseInt(menu.offsetHeight) + document.body.scrollTop;
		}
		else
		{
			hrequired = parseInt(document.body.offsetWidth-2) - parseInt(menu.offsetWidth)-10 + document.body.scrollLeft;
			vrequired = parseInt(document.body.offsetHeight-2) - parseInt(menu.offsetHeight) + document.body.scrollTop;
		}

		if(left > hrequired)
		{
			if(!(USERLANG=="AR")&&!(USERLANG=="HE"))
			{
				left = document.body.offsetWidth - menu.offsetWidth - 5 + document.body.scrollLeft;
			}
		}
		if(top > vrequired)
		{
			var openerHeight = 0;
			if(lastClickElement)
				openerHeight=lastClickElement.offsetHeight + 3;
			var tempTop = top - menu.offsetHeight - openerHeight;
			if(tempTop<5)
				top=20;
			else
				top = tempTop;

			if(vrequired<5 && this.settings.scroll)
			{
				var menuWidth = parseInt(menu.offsetWidth);
				try //invalid procedure call in IE when not enough room to show menu
				{
					menu.style.overflowY="scroll";
					menu.style.overflowX="hidden";
					top=20+document.body.scrollTop;
					menu.style.height=document.body.clientHeight-25;
					menu.style.width=menuWidth+13;
				}
				catch(error)
				{}
			}
		}

		if((USERLANG=="AR")||(USERLANG=="HE"))
		{
			if( left < 0 )
			{
				left = 0;
			}

			if (isIE() && (document.body.scrollHeight > document.body.offsetHeight))
			{
				if(openat != "parentsouthwest")
					left -= 16;
			}
		}
		var type = menu.type;
		if(type=="-1" && openat!="parentsouthwest")
			top=top-15;
		menu.style.top = top+1;
		menu.style.left = left-1;
		if(!this.staticMenu) {
			this.showShim(menu);
		}
		addMouseDownEventsForPopups();
		if(foc)
			this._focusFirstItem(menu);
	};

	
	this.stopHideMenuTimer=function() 
	{
		if(this.menutimer) {
			window.clearTimeout(this.menutimer);
			this.menutimer = null;
		}
	}
	
	
	/*
	 * Gets shim. Creates one if one does not exist.
	 */
	this.getShim=function(menu, create)
	{
		if(undef(create)) {
			create = true;
		}
		var shim = dojo.byId(dojo.attr(menu, "parentmenuid")+"_shim");
		if(!shim && create) {
			shim = document.createElement("IFRAME");
			shim.id = dojo.attr(menu, "parentmenuid")+"_shim";
			shim.className = "menuShim";
			dojo.attr(shim, {"role":"presentation","aria-hidden":"true"});
			menu.parentElement.insertBefore(shim, menu);
		}
		return shim;
	};
	
	this.hideShim=function(menu)
	{
		var shim = this.getShim(menu, false);
		if(shim) {
			dojo.style(shim,{"display":"none"});
		}
	};
	
	this.showShim=function(menu) 
	{
		if(document.getElementsByTagName("OBJECT").length==0){
			return;
		}
		var shim = this.getShim(menu);
		var shadow = 3;
		var top = 1;
		if(dojo.isIE) {
			shadow = 0;
			top = 0;
		}
		dojo.style(shim, {	"top":(parseInt(menu.style.top)+top)+"px",
							"left":menu.style.left,
							"position":"absolute",
							"height":menu.offsetHeight + shadow,
							"width":menu.offsetWidth + shadow,
							"role" : "presentation",
							"aria-hidden" : "true",
							"display":""
		});
	};
	
	this.getMenuData=function(dsId)
	{
		try
		{
			if(!dataSets)
				return;
			var set = dataSets[dsId];
			return set;
		}
		catch(error)
		{

		}
	};

	this.menuClick=function(item)
	{
		var topMenu = document.getElementById(this.topMenu);
		var comp = document.getElementById(item.target);
		if(topMenu && topMenu.getAttribute("typeahead")=="true")
		{
			if(comp)
			{
				var offset = item.offset; 
				if(offset>=0) // ellipses items
				{
					this.typeAhead(comp,item.offset);
					this._focusFirstItem('typeaheadmenu');
					return;
				}
				else if(item.value=="search")
				{
					comp.setAttribute("stopvalidate",true);
					fldInfo = comp.getAttribute("fldInfo");
					if(fldInfo)
					{
						fldInfo = dojo.fromJson(fldInfo);
						// var lookupInfo =
						// this.buildTAFilter(fldInfo.domain,comp.value );
						
						var dataStoreInfo = getDataStoreInfo(fldInfo);
						if (dataStoreInfo != null)
						{
							var lookupInfo = {  "ta_attrs" : dataStoreInfo.typeahead.attributes,
												"value" : comp.value 
										};
							sendEvent('selectvalue',comp.id,dojo.toJson(lookupInfo));
						}
					}
				}
				else
				{
					comp.value=item.value;
					input_forceChanged(comp); 
				}
			}
		}
		else // standard item
		{
			showingMenu=false;
			sendEvent(item.event,item.target,item.value);
		}
		if(!topMenu) {
			topMenu = dojo.byId(this.trueTop);
		}
		if(topMenu) {
			this._hideMenu(this.topMenu);
		}
		if(comp)
			comp.focus();
	};

	this.buildAutoFillFilter=function(dataStoreInfo)
	{
		var dataFilter = new FilterObject(true);
		var filters = dataStoreInfo.filters;
		for(var filterAttribute in filters)
		{
			var filterIds = filters[filterAttribute];
			for(var index = 0; index < filterIds.length; index++)
			{
				var id = filterIds[index];
				var component = getComponentOnCurrentDataRow(id);
				if(component)
				{
					if(component.value!="")
					{
						dataFilter.add(filterAttribute, component.value);
						break;
					}
				}
			}
		}
		return dataFilter;
	};

	this.filterOnSiteOrg=function(dataStoreInfo, fldInfo)
	{
		var dataFilter = new FilterObject(true);
		try
		{
			if(fldInfo.sofid)
			{
				var pageAutoFillInfo = getAutoFillInfoForPage(fldInfo);
				if (pageAutoFillInfo)
				{
					var siteorgValues = pageAutoFillInfo.siteorgvalues[fldInfo.sofid];
					if(siteorgValues)
					{
						var orgFilter = new FilterObject(true);
						orgFilter.add("orgid", siteorgValues["orgid"]);
						this.filterDataStore.filter(orgFilter);
						var siteFilter = new FilterObject(true);
						siteFilter.add("siteid", siteorgValues["siteid"]);
						this.filterDataStore.filter(siteFilter);
					}
				}
			}
		}
		catch(error)
		{
			console.error(error);
			// nothing for filtering from autoFillInfo
		}
		return dataFilter;
	};

	this.buildTAFilter=function(dataStore, value)
	{
		var dataFilter = new FilterObject(false);
		var dataStoreAttributes = dataStore.typeahead.attributes;
		for(var i =0;i<dataStoreAttributes.length;i++)
		{
			dataFilter.add(dataStoreAttributes[i], value);
		}
		return dataFilter;
	};

	this.typeAheadInstant=function(component,pageOffset)
	{
		if(!tpaeConfig.clientDataValidation)
			return;
		this._destroyMenus();
		if(component.value.length<this.typeahead.settings.minimumchars)
			return;
		var fldInfo = component.getAttribute("fldInfo");
		if(!fldInfo)
			return;
		fldInfo = fldInfo ? dojo.fromJson(fldInfo) : fldInfo;
		var dataStoreId = fldInfo.dsid;
		if(!dataStoreId)
			return;

		if (this.typeahead.settings.instantfetch == true)
		{
			this.filterDataStore = getDynamicBundle(this, component, pageOffset, fldInfo);
		}
		else
		{
			if (this.filterDataStore == null || component.value.indexOf(domain.lastFilterTerm)!=0)
			{
				this.filterDataStore = getDataStore(fldInfo.dsid);
				domain.lastFilterTerm = component.value;
				component.setAttribute("fldInfo",dojo.toJson(fldInfo));
			}
			return this.buildTAMenu(component, pageOffset, fldInfo);
		}
	};

	this.buildTAMenu=function(component, pageOffset, fldInfo)
	{
		var dataStoreInfo = getDataStoreInfo(fldInfo);
		if(!dataStoreInfo)
		{
			return;
		}
		var value = component.value;
		var menuId = "typeaheadmenu";
		if(undef(this.filterDataStore))
			return;

		if (this.typeahead.settings.instantfetch != true)
		{
			this.filterDataStore.filter(this.buildTAFilter(dataStoreInfo,value));
			if(undef(this.filterDataStore))
				return;
		}
		var newDataSet = new Array();
		if(pageOffset>0 && this.typeahead.settings.usepages)
		{
			var prev = this.resources["previous"];
			if(this.typeahead.settings.showprevcount&& pageOffset>0)
				prev+= " <small style='color:#C0C0C0'>("+(pageOffset)+")</small>";
			newDataSet.push({"value":"...","display":prev,"offset":(pageOffset-this.typeahead.settings.menulength)});
		}
		else if(value.trim()=="" && !fldInfo.required)
		{
			newDataSet.push({"value":"","display":"&nbsp;"});
		}
		var rowCount=-1;
		for(var rowIndex = 0; rowIndex < this.filterDataStore.length(); rowIndex ++)
		{
			rowCount++;
			if(rowCount<pageOffset) // not on correct page of values yet
			{
				continue;
			}
			if(this.typeahead.settings.usepages && newDataSet.length==this.typeahead.settings.menulength)
			{
				var next = this.resources["next"];
				if(this.typeahead.settings.shownextcount)
					next += " <small style='color:#C0C0C0'>("+(this.filterDataStore.length()-(rowCount+1))+")</small>";
				item = {"value":"...","display":next,"offset":(pageOffset+this.typeahead.settings.menulength)};
				item.border=true;
				newDataSet.push(item);
				break;
			}

			var domainAttributes= dataStoreInfo.ta_attrs;
			dataStoreInfotchedRow = false;
			var display="";
			for(var i=0;i<domainAttributes.length;i++)
			{
				var attrValue = this.filterDataStore.getValue(rowIndex, domainAttributes[i]);
				if(!attrValue)
				{
					continue;
				}
				var displayCheck = attrValue.toLowerCase();
				var start = displayCheck.indexOf(value.toLowerCase());
				if(display.length>0)
				{
					display += "<td style='white-space:nowrap;'> : </td>";
				}
				if(start>=0) // attribute contains match
				{
					var item;
					var end = start + value.length;
					display += attrValue.substring(0,start)+"<span class='tamatch'>"+attrValue.substring(start,end)+"</span>"+attrValue.substring(end);
					matchedRow=true;
				}
				else
					display += attrValue;
			}
			if(matchedRow)
			{
				var itemValue = this.filterDataStore.getValue(rowIndex, dataStoreInfo.typeahead.keyattribute);
				if(itemValue)
				{
					item = {"value":itemValue,"display":display};
					if((pageOffset>0 && newDataSet.length==1) && this.typeahead.settings.usepages)
						item.border=true;
					newDataSet.push(item);
				}
			}
		}
		if(fldInfo.lookup && this.typeahead.settings.showsearch)
		{
			var srch = this.resources["search"];
			if(value.trim().length>0)
				srch = this.resources["searchfor"].replace("{0}","<span class='tamatch'>"+value+"</span>");
			item = {"value":"search","display":"<img class='menuimg' style='margin:0px' src='"+IMAGE_PATH+"img_lookup.gif'/>"+srch};
			item.border = true;
			newDataSet.push(item);
		}
		if(newDataSet.length>0)
		{
			var menu = this.buildMenu(0, component.id,{"typeahead":true,"offset":pageOffset,"id":menuId,"items":newDataSet});
			menu.setAttribute('openat','typeahead');
			component.setAttribute('menu',menuId);
			lastClickElement=component;
			this._showMenu(menu.id,false);
			setFieldState(component,new ValidationError(0,""));
			dojo.connect(component, "keyup", this, this.menuTargetEvent);
			dojo.connect(component, "keydown", this, this.menuTargetEvent);
		}
	};

	this.typeAhead=function(component,pageOffset)
	{
		if(!tpaeConfig.clientDataValidation || component.readOnly == true)
			return;
		var menuId = "typeaheadmenu";
		this._destroyMenus();
		var value = component.value;
		if(value.length<this.typeahead.settings.minimumchars)
			return;
		var fldInfo = component.getAttribute("fldInfo");
		if(!fldInfo)
		{
			return;
		}
		fldInfo = fldInfo ? dojo.fromJson(fldInfo) : fldInfo;
		var dataStoreInfo = getDataStoreInfo(fldInfo);
		if(!dataStoreInfo)
		{
			return;
		}
		this.filterDataStore = getDataStore(fldInfo.dsid);
		if(undef(this.filterDataStore))
		{
			return;
		}

		//neeed to do org and site filters
		this.filterOnSiteOrg(dataStoreInfo, fldInfo);
		this.filterDataStore.filter(this.buildTAFilter(dataStoreInfo, value));
		var dataFilter = this.buildAutoFillFilter(dataStoreInfo);
		if(dataFilter)
		{
			this.filterDataStore.filter(dataFilter);
		}
		if(undef(this.filterDataStore))
		{
			return;
		}
		var newDataSet = new Array();
		var nextIndex, prevIndex;
		if(pageOffset > 0 && this.typeahead.settings.usepages)
		{
			var prev = this.resources["previous"];
			if(this.typeahead.settings.showprevcount)
				prev += " <small style='color:#C0C0C0'>(" + pageOffset + ")</small>";
			prevIndex = newDataSet.length; 
			newDataSet.push({"value":"...","display":prev,"offset":(pageOffset-this.typeahead.settings.menulength)});
		}
		if(pageOffset == 0 && value.trim() == "" && !fldInfo.required)
		{
			newDataSet.push({"value":"","display":"&nbsp;"});
		}
		var rowCount = 0;
		var item, matchedRowNum;
		dojo.removeAttr(component,"ta_match");
		for(var rowIndex = pageOffset; rowIndex < this.filterDataStore.length() && rowCount < this.typeahead.settings.menulength; rowIndex++)
		{
			var domainAttributes= dataStoreInfo.typeahead.attributes;
			var matchedRow = false;
			var display = "";
			for(var i=0;i<domainAttributes.length;i++)
			{
				var attrValue = this.filterDataStore.getValue(rowIndex, domainAttributes[i]);
				dojo.require("dojox.html.entities");
				attrValue = dojox.html.entities.encode(attrValue);
				if(!attrValue)
				{
					continue;
				}
				var displayCheck = attrValue.toLowerCase();
				var start = displayCheck.indexOf(value.toLowerCase());
				if(display.length>0)
				{
					display += "<td style='white-space:nowrap;'> : </td>";
				}
				if(start>=0) // attribute contains match
				{
					var end = start + value.length;
					display += attrValue.substring(0,start)+"<span class='tamatch'>"+attrValue.substring(start,end)+"</span>"+attrValue.substring(end);
					var itemValue = this.filterDataStore.getValue(rowIndex, dataStoreInfo.typeahead.keyattribute);
					if(value.length > 0 && start==0 &&  (dataStoreInfo.typeahead.keyattribute == domainAttributes[i]))
					{
						if(undef(matchedRowNum)) {
							dojo.attr(component,{"ta_match" : itemValue});
							matchedRowNum = rowIndex;
						}
					}
					matchedRow=true;
				}
				else
					display += attrValue;
			}
			if(matchedRow)
			{
				var itemValue = this.filterDataStore.getValue(rowIndex, dataStoreInfo.typeahead.keyattribute);
				if(itemValue)
				{
					item = {"value":itemValue, "display":display};
					if(pageOffset > 0 && rowCount == 0 && this.typeahead.settings.usepages)
						item.border = true;
					newDataSet.push(item);
					rowCount++;
				}
			}
		}
		if(this.typeahead.settings.usepages && pageOffset + rowCount < this.filterDataStore.length())
		{
			var next = this.resources["next"];
			if(this.typeahead.settings.shownextcount)
				next += " <small style='color:#C0C0C0'>("+(this.filterDataStore.length()-(rowIndex+1))+")</small>";
			item = {"value":"...","display":next,"offset":(pageOffset+this.typeahead.settings.menulength)};
			item.border=true;
			nextIndex = newDataSet.length;
			newDataSet.push(item);
		}

		if(fldInfo.lookup && this.typeahead.settings.showsearch)
		{
			var srch = this.resources["search"];
			if(value.trim().length>0)
				srch = this.resources["searchfor"].replace("{0}","<span class='tamatch'>"+value+"</span>");
			item = {"value":"search","display":"<img class='menuimg' style='margin:0px' src='"+IMAGE_PATH+"img_lookup.gif'/>"+srch};
			item.border=true;
			newDataSet.push(item);
		}
		if(newDataSet.length>0)
		{
			var menu = this.buildMenu(component.id,{"typeahead":true,"offset":pageOffset,"id":menuId,"items":newDataSet, "matchedRow" : matchedRowNum});
			menu.setAttribute('openat','typeahead');
			component.setAttribute('menu',menuId);
			lastClickElement=component;
			this._showMenu(menu.id,false);
			setFieldState(component,new ValidationError(0,""));
			dojo.connect(component, "keyup", this, this.menuTargetEvent);
			dojo.connect(component, "keydown", this, this.menuTargetEvent);
		}
	};

	this.menuTargetEvent=function(event)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		if(event.type=="keyup")
		{
			if(event.keyCode==KEYCODE_DOWN_ARROW)
			{
				var el = getSourceElement(event);
				if(el)
				{
					var menu = el.getAttribute('menu');
					if(!undef(menu))
						menu = document.getElementById(menu);
					if(!menu || menu.style.display=="none")
						return;
					this._focusFirstItem(menu);
					cancelEvent(event);
				}
			}
		}
		else if (event.type=="keydown")
		{
			if(event.keyCode==KEYCODE_DOWN_ARROW)
			{
				cancelEvent(event);
			}
			else if(event.keyCode==KEYCODE_ESC)
			{
				var el = getSourceElement(event);
				if(el)
				{
					var menu = el.getAttribute('menu');
					if(menu)
					{
						this._hideMenu(menu);
						cancelEvent(event);
					}
				}
			}
		}
	};

	this._focusFirstItem=function(menuOrId)
	{
		var menu = getElement(menuOrId);
		if(!menu)
			return;
		var items = menu.getElementsByTagName("li");
		var firstItem = items.item(0);
		var anc = firstItem.childNodes.item(0);
		this._menuItemFocus(anc);
		anc.focus();
	};

	/**
	 * Focus on a menu item
	 */
	this._menuItemFocus=function(anc)
	{
		this._hideOtherMenus();
		var focusClass = "current";
		if(!anc)
			return;
		if(!anc.parentNode) {
			return;
		}
		var parentMenu = anc.parentNode.parentNode;
		if(parentMenu.getAttribute("typeahead")=="true")
			focusClass="s"+focusClass;
		var currentItemId = parentMenu.getAttribute("currentid");
		if(currentItemId && currentItemId!="")
		{
			var currentItem = document.getElementById(currentItemId);
			if(currentItem) {
				removeClass(currentItem.parentNode,focusClass);
				dojo.attr(currentItem, {"tabindex":"-1"});
			}
		}
		dojo.attr(anc, {"tabindex":"0"});
		appendClass(anc.parentNode,focusClass);
		parentMenu.setAttribute("currentid",anc.id);
	};

	/**
	 * Show a sub menu based on an event
	 */
	this._showSub=function(event)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		var el = getSourceElement(event);
		if(el)
		{
			if(el.tagName=="LI")
				el=el.childNodes.item(0);
			this._showSubMenu(el,(event.type=="keydown"));
		}
		stopBubble(event);
	};

	/**
	 * Show a sub menu based on an element
	 */
	this._showSubMenu=function(anc,foc)
	{
		while(anc && anc.tagName!="A" && anc.tagName!="UL")
		{
			anc=anc.parentNode;
		}
		if(undef(anc))
			return;
		this._menuItemFocus(anc);
		var parentMenu = anc.parentNode.parentNode;
		var oldSubId = parentMenu.getAttribute("submenu");
		if(!undef(oldSubId))
			this._hideMenu(oldSubId);
		var li = anc.parentNode;
		var sub = this._getSubMenu(li);
		if(li.getAttribute("active")!="false" && sub)
		{
			if(sub.style.display=="inline") {
				return; //already showing
			}
			var menuTop = getTopPosition(li)-1+document.body.scrollTop;
			var menuLeft = 0;
			sub.style.left="0px";
			sub.style.top="0px";
			sub.style.display="inline";
			if(!this.RTL)
			{
				menuLeft=getLeftPosition(li)+(parentMenu.offsetWidth-3)+document.body.scrollLeft;
			}
			else
			{
				menuLeft=getLeftPosition(li)-(sub.offsetWidth-3);
			}
			var topMenu = document.getElementById(this.topMenu);
			var bodyLimitX = document.body.offsetWidth-2;
			var bodyLimitY = document.body.offsetHeight-2;
			sub.setAttribute("parentmenuid",parentMenu.id);
			sub.setAttribute("parentitemid",li.id);
			if(!this.RTL)
			{
				if((menuLeft+sub.offsetWidth)>(bodyLimitX+document.body.scrollLeft))
				{
					menuLeft=getLeftPosition(li)-sub.offsetWidth+document.body.scrollLeft + 5; // pop open to left
				}
			}
			else
			{
				if(menuLeft < 0 )
				{
					menuLeft=getLeftPosition(li)+li.offsetWidth; // pop open to right
				}
			}
			if((menuTop+sub.offsetHeight) > (bodyLimitY+document.body.scrollTop))
			{
				menuTop = parseInt((menuTop+li.offsetHeight)-sub.clientHeight);
				if(menuTop<0)
				{
					menuTop=0;
				}
			}
			sub.style.left=menuLeft-2+"px";
			sub.style.top=menuTop+"px";
			sub.style.zIndex = "30000";
			parentMenu.setAttribute("submenu",sub.id);
			parentMenu.setAttribute("currentid",anc.id);
			appendClass(li,"current");
			this.showShim(sub);
			if(this.staticMenu && undef(dojo.attr(parentMenu,"parentmenuid"))) {
				this.topMenu = sub;
			}
			if(foc)
			{
				var subItems = sub.getElementsByTagName("li");
				var firstItem = subItems.item(0);
				var anc = firstItem.childNodes.item(0);
				this._menuItemFocus(anc);
				anc.focus();
			}
		}
	};

	this._removeHighlight=function(menuOrId) 
	{
		var menu = dojo.byId(menuOrId);
		if(!menu) {
			return;
		}
		var currentItemId = dojo.attr(menu,"currentid");
		if(currentItemId && currentItemId!="")
		{
			var currentItem = document.getElementById(currentItemId);
			if(currentItem)
				removeClass(currentItem.parentNode,"current");
		}
	}
	
	/**
	 * hide a menu for an event
	 */
	this._hideMenuForEvent=function(event)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		var menu = getSourceElement(event).parentNode.parentNode;
		this._hideMenu(menu);
		var focusItem = document.getElementById(menu.getAttribute("parentitemid"));
		if(focusItem && focusItem.tagName=="LI")
		{
			var anc = focusItem.childNodes.item(0);
			this._menuItemFocus(anc);
			anc.focus();
		}
	};

	/**
	 * hide a menu using an id
	 */
	this._hideMenu=function(menuOrId)
	{
		var menu = dojo.byId(menuOrId);
		if(!menu)
			return;
		var target = menu.getAttribute("target");
		if(!undef(target)) {
			target=document.getElementById(target);
		}
		if((dojo.attr(menu,"static")!="true" && dojo.attr(menu,"static")!=true)|| !undef(dojo.attr(menu,"parentmenuid"))) {
			menu.style.display="none";
			this._removeHighlight(menu.id);
		}
		var subId=menu.getAttribute("submenu");
		menu.removeAttribute("submenu");
		if(!undef(subId))
			this._hideMenu(subId);
		if(target)
			focusElement(target);
		if(menu.id==this.topMenu)
		{
			this._destroyMenus();
			this.topMenu=null;
			//need delay as events bubble too quickly and keys can be sent to item getting focus.
			delayedFocus(getFocusId(),false,100);
	 		showObjs();
		}
		this.hideShim(menu);
	};
	
	this._destroyMenus=function()
	{
		while (this.holder.hasChildNodes())
		{
			this.holder.removeChild(this.holder.firstChild);
		}
	};

	/**
	 * Menu Key handler
	 */
	this._menuKey=function(event,li)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		if(undef(li))
		{
			li = getSourceElement(event).parentNode;
		}
		var menu = li.parentNode;
		var typeAhead = (menu.getAttribute("typeahead") == "true");
		var items = menu.childNodes;
		if(event.keyCode!=KEYCODE_ENTER)
			stopBubble(event);
		switch(event.keyCode)
		{
			case KEYCODE_ENTER:
				if(this._getSubMenu(li))
				{
					cancelEvent(event);
					this._showSub(event);
					stopBubble(event);
				}
				return;
			case KEYCODE_ESC:
				this._hideMenuForEvent(event);
				cancelEvent(event);
				return;
			case KEYCODE_LEFT_ARROW:
				if(!this.RTL)
				{
					this._hideMenuForEvent(event);
				}
				else
				{
					this._showSub(event);
				}
				return;
			case KEYCODE_RIGHT_ARROW:
				if(!this.RTL)
				{
					this._showSub(event);
				}
				else
				{
					this._hideMenuForEvent(event);
				}
				return;
			case KEYCODE_TAB:
				this._hideMenu(menu.id);
				return;
		}
		for(var i = 0; i < items.length; i++)
		{
			if(items.item(i) != li)
			{
				continue;
			}
			var currentIndex = i;
			switch(event.keyCode)
			{
				case KEYCODE_UP_ARROW:
					currentIndex--;
					break;
				case KEYCODE_DOWN_ARROW:
					currentIndex++;
					break;
			}
			if(currentIndex < 0)
			{
				currentIndex = items.length - 1;
			}
			else if(currentIndex > items.length - 1)
			{
				currentIndex = 0;
			}
			li = items.item(currentIndex);
			var anc = li.childNodes.item(0);
			if(!anc || anc.tagName!="A")
			{
				return this._menuKey(event, li);
			}
			this._menuItemFocus(anc, true);
			anc.focus();
			cancelEvent(event);
			break;
		}
	};

	this._getSubMenu=function(li)
	{
		var subId = li.getAttribute("subid");
		var subMenu = null;
		if(!undef(subId))
		{
			subMenu = document.getElementById(subId);
		}
		return subMenu;
		// if the menus are built in one structure
		// return (li.getElementsByTagName("ul")[0]);
	};

	this.hasLocalStorage=function()
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

	this.createMenuCache=function(menuDef)
	{
		if(this.hasLocalStorage())
		{
			if(undef(menuDef))
			{
				menuDef=dojo.fromJson(localStorage.getItem("menucache"));
			}
			else
			{
				localStorage.setItem("menucache", dojo.toJson(menuDef));
			}
		}
		this.cache = menuDef;
	};

	this._showCachedMenu=function(eventtype,componentid,val)
	{
		if(!this.cache || (eventtype!="showmenu" && eventtype!="click"))
			return false;
		var cachedMenu = this.cache[val];
		if(undef(cachedMenu)) // some menus will be stored with the launching
			// component id prefixed
		{
			var component = dojo.byId(componentid);
			if(component)
			{
				var menuType = component.getAttribute("menutype");
				if(menuType)
				{
					menuType=menuType.toUpperCase();
					cachedMenu = this.cache[componentid+"_"+menuType];
					if(undef(cachedMenu))
						cachedMenu = this.cache[menuType];
				}
			}
		}
		if(!undef(cachedMenu) && !undef(cachedMenu.items))
		{
			this.buildMenu(componentid,cachedMenu,null);
			this._showMenu(cachedMenu.id,true);
			return true;
		}
		return false;
	};
	
	this._hideOtherMenus=function() {
	 	for(var menuIndex in topLevelMenus) {
	 		var menu = topLevelMenus[menuIndex];
	 		if(menu!=this) {
	 			var top = dojo.byId(menu.trueTop);
	 			if(!top) {
	 				top = dojo.byId(menu.topMenu);
	 			}
	 			if(top) {
	 				var currentItemId = dojo.attr(top,"currentid");
	 				if(currentItemId && currentItemId!="")
	 				{
	 					var currentItem = document.getElementById(currentItemId);
	 					if(currentItem)
	 						removeClass(currentItem.parentNode,"current");
	 				}
	 			}
	 			if(menu!=null && this!=null && 
	 				menu.topMenu != this.topMenu) {
	 				menu._hideMenu(menu.topMenu);
	 			}
	 		}
	 	}
	};

}

//These will override the old implementations

/*
 * Hides all open menus
 */
hideAllMenus=function(nf)
{
	hidePopup();
	if(MOBILEDATEPICKER)
		closeDatePicker();
	dojohelper.closePickerPopup();
	stopPopOver();
	for(var menuIndex in topLevelMenus) {
		var menu = topLevelMenus[menuIndex];
		if(menu.topMenu) {
			var tm = dojo.byId(menu.topMenu);
			if(!tm) {
				return;
			}
	 		var currentItemId = dojo.byId(menu.topMenu).getAttribute("currentid");
	 		if(currentItemId && currentItemId!="")
	 		{
	 			var currentItem = document.getElementById(currentItemId);
	 			if(currentItem)
	 				removeClass(currentItem.parentNode,"current");
	 		}
	 		if(menu.staticMenu) {
	 			currentItemId = dojo.byId(dojo.attr(dojo.byId(menu.topMenu),"parentmenuid")).getAttribute("currentid");
		 		if(currentItemId && currentItemId!="")
		 		{
		 			var currentItem = document.getElementById(currentItemId);
		 			if(currentItem)
		 				removeClass(currentItem.parentNode,"current");
		 		}
	 		}
		}
		menu._hideMenu(menu.topMenu);
	}
	if(nf)
		delayedFocus(getFocusId(),true,100);
};

/*
	 * Hides all open menus no focus
	 */
hideAllMenusNF=function()
{
	hidePopup();
	for(var menuIndex in topLevelMenus) {
		var menu = topLevelMenus[menuIndex];
		menu._hideMenu(menu.topMenu);
	}
};
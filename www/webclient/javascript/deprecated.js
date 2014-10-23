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
/* WARNING: code within this file has been deprecated and will be removed in an upcoming release. It is recommended that you do not
 * use any code from this file.
 * 
 * NOTE: When functions are added, they should call logDeprecatedMethodUse() as their first line. 
 */

var versioning = ["7.5.0.4 Feature Pack"];

function logDeprecatedMethodUse(version, message) {
	if(message) {
		message="("+message+")";
	}
	else {
		message="";
	}
	var callee = arguments.callee.caller.arguments.callee
	var caller = "";
	if(callee && callee.caller) {
		caller  = " from "+callee.caller.name;
	}
	var methodName = arguments.callee.caller.name;
	if(DEBUGLEVEL>0) {
		console.warn("'"+methodName+"' was called'"+caller+"'. This method was deprecated in "+version+". "+ message);
	}
}

/* Begin Version 7.5.0.4 feature pack */
var openMenus = new Array();
var lastUniqueMenu = "";
var currentMenu = null;
var currentMenuItemList = null;

function closeMenus()
{
	logDeprecatedMethodUse(versioning[0],"");
	for(var i = 0; i < openMenus.length; i ++ )
	{
		var om = getElement(openMenus[i]);
		if(om)
		{
			om.parentNode.removeChild(om);
		}
	}
	openMenus = new Array();
}

function highlightMenuItem(cell,over,doPath)
{
	logDeprecatedMethodUse(versioning[0],"");
	var row;
	if(cell.tagName!="TR")
		row=cell.parentNode;
	else
		row = cell;

	var mpId=cell.parentNode.getAttribute("menuparent");
	var mp=null;
	if(mpId)
		mp=document.getElementById(mpId);
	if(over && mp)
	{
		var oldCurrentId = mp.getAttribute("currentMenuItemId");
		var oldCurrent=null;
		if(oldCurrentId && oldCurrentId != row.id)
		{
			oldCurrent=document.getElementById(oldCurrentId);
			if(oldCurrent)
				highlightMenuItem(oldCurrent,false,false);
		}
		mp.setAttribute("currentMenuItemId",row.id);
	}
	actualHighlightMenuItem(row,over,doPath);
}

function actualHighlightMenuItem(row,over,doPath)
{
	logDeprecatedMethodUse(versioning[0],"");
	var cells=row.cells;
	if(over)
	{
		if(!cells[0].className.endsWith("over"))
		{
			cells[0].setAttribute("cname",cells[0].className);
			cells[0].className+="over";
			cells[1].setAttribute("cname",cells[1].className);
			cells[1].className+="over";
			cells[2].setAttribute("cname",cells[2].className);
			cells[2].className+="over";
			cells[3].setAttribute("cname",cells[3].className);
			cells[3].className+="over";
			cells[4].setAttribute("cname",cells[4].className);
			cells[4].className+="over";
			cells[5].setAttribute("cname",cells[5].className);
			cells[5].className+="over";
			if(doPath)
				highlightMenuPath(row,true);
		}
	}
	else if(cells[0].className.indexOf("over")>-1)
	{
		cells[0].className=cells[0].getAttribute("cname");
		cells[1].className=cells[1].getAttribute("cname");
		cells[2].className=cells[2].getAttribute("cname");
		cells[3].className=cells[3].getAttribute("cname");
		cells[4].className=cells[4].getAttribute("cname");
		cells[5].className=cells[5].getAttribute("cname");
		if(doPath)
			highlightMenuPath(row,false);
	}
}

/*
 * Returns the id of the last open menu
 */
function getLastOpenMenu()
{
	logDeprecatedMethodUse(versioning[0],"");
	return openMenus[openMenus.length - 1];
}

/*
 * Shows the given menu
 */
function showMenu(id, event, src)
{
	logDeprecatedMethodUse(versioning[0],"");
	if(openMenus[openMenus.length - 1] == id)
		return;

	if(src.tagName=="A" || src.tagName=="TD")
	{
		while(!undef(src) && src.tagName!="TR" && src.tagName!="LI")
		{
			src = src.parentNode;
		}
	}
	if(undef(src))
	{
		return;
	}

	var sub = getElement(id);
	if (sub != null)
	{
		sub.style.display = "";
		var menuHolder = document.getElementById("menuholdertd");
		var mainMenu   = document.getElementById(openMenus[0]);
		var parentMenu = document.getElementById(src.getAttribute("menuparent"));

		hideUnrelatedSubMenus(sub);
		// Negative values causes defects in RTL Mode
		// sub.style.left = -5000;
		sub.style.top = -5000;
		sub.style.display = "hidden";
		var tb = document.getElementById(sub.id+"_table");
		if(tb)
			tb.style.display="inline";

		var currentRelativeLeft = getLeftPosition(src) - getLeftPosition(mainMenu);

		var MENU_OVERLAP = 2; // 1px border + 1px border
		var SPACER_WIDTH = 2; // 2px spacer row

		var newLeft;
		if(USERLANG=="AR" || USERLANG=="HE")
		{
			currentRelativeLeft = currentRelativeLeft - mainMenu.offsetWidth;
			if(getLeftPosition(parentMenu) - sub.offsetWidth + (MENU_OVERLAP + SPACER_WIDTH) < 0)
			{
				newLeft = currentRelativeLeft + parentMenu.offsetWidth;
				newLeft -= MENU_OVERLAP;
			}
			else
			{
				newLeft = currentRelativeLeft - sub.offsetWidth;
				newLeft += MENU_OVERLAP + SPACER_WIDTH;
			}
		}
		else
		{
			if(getLeftPosition(parentMenu) + parentMenu.offsetWidth + sub.offsetWidth - (MENU_OVERLAP + SPACER_WIDTH) > document.body.offsetWidth)
			{
				newLeft = currentRelativeLeft - sub.offsetWidth;
				newLeft += MENU_OVERLAP;
			}
			else
			{
				newLeft = currentRelativeLeft + parentMenu.offsetWidth;
				newLeft -= MENU_OVERLAP + SPACER_WIDTH;
			}

		}

		var holderTop = getTopPosition(menuHolder);
		var srcTop = getTopPosition(src);

		var menuTableBody = null;
		if(!SCREENREADER)
			menuTableBody=getFirstChildElement(getFirstChildElement(sub));
		else
			menuTableBody=getFirstChildElement(sub);

		var newTop = srcTop - holderTop - getFirstChildElement(menuTableBody).clientHeight;

		if(newTop + sub.offsetHeight > document.body.clientHeight - holderTop)
		{
			var bottomOffset = getLastChildElement(menuTableBody).clientHeight;
			newTop = srcTop - holderTop + src.offsetHeight - sub.offsetHeight + bottomOffset;

			if(bottomOffset <= 1)
			{
				// tweak to fix the alignment problem caused by the 1px empty last row in the table
				// in all browsers except Firefox
				if(navigator.userAgent.indexOf('Firefox') == -1)
				{
					newTop += 2;
				}
			}
		}

		if(parentMenu == mainMenu)
		{
			// tweak to fix the alignment problem caused by the 1px empty first row in the table
			if((isIE() && getBrowserVersion() >= 7) || navigator.userAgent.indexOf('Opera') != -1)
			{
				newTop -= 1;
			}
		}

		if(newTop + holderTop < 0)
		{
			newTop = -holderTop;
		}

		sub.style.left = newLeft;
		sub.style.top = newTop;
		sub.style.visibility = "visible";
		openMenus.push(id);
	}
}

function getFirstChildElement(node)
{
	logDeprecatedMethodUse(versioning[0],"");
	var result = node.firstChild;
	while (result.nodeType != 1)
	{
		result = result.nextSibling;
	}
	return result;
}

function getLastChildElement(node)
{
	logDeprecatedMethodUse(versioning[0],"");
	var result = node.lastChild;
	while (result.nodeType != 1)
	{
		result = result.previousSibling;
	}
	return result;
}

/*
 * Positions the menuholder where the click was fired and set it as visible
 */
function setMenuPosition(id,type)
{
	logDeprecatedMethodUse(versioning[0],"");
	var clientArea=document.getElementById(clientAreaId);
	var headerScrollDiv = document.getElementById(headerScrollDivId);
	bindEvents("td"); // menu - slow
	var holder = getElement("menuholder");
	var menu = document.getElementById(id);
	if(undef(menu))
		return;
	if(SCREENREADER)
		menu.style.width="200px";
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
				left+=posEl.offsetWidth-1;
			}
		}
		else
		{
			//Due to structural differences in combobox and toolbarcombobox
			// we must make sure we get the correct element to use for the left
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
			left+=lastClickElement.offsetWidth;
		}
	}

	top+=document.body.scrollTop;
	if(!isIE() || (USERLANG!="AR" && USERLANG!="HE"))
		left+=document.body.scrollLeft;// Bidi menus not showing in the correct
	// location on IE with this

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
		var tempTop = top - menu.offsetHeight + 16;
		if(tempTop<5)
			top=20;
		else
			top = tempTop;

		if(vrequired<5)
		{
			var menuWidth = parseInt(menu.offsetWidth);
			menu.style.overflowY="scroll";
			top=20;
			menu.style.height=document.body.clientHeight-18;
			menu.style.width=menuWidth+13;
		}

	}

	if((USERLANG=="AR")||(USERLANG=="HE"))
	{
		if( (left - menu.offsetWidth) < 0 )
		{
			left = left  + menu.offsetWidth;
		}


		if (isIE() && (document.body.scrollHeight > document.body.offsetHeight))
		{
			if(openat != "parentsouthwest")
				left -= 16;
		}

	}

	if(type=="-1" && openat!="parentsouthwest")
		top=top-15;
	holder.style.top = top;
	holder.style.left = left;
	menu.style.visibility = "visible";
	addMouseDownEventsForPopups(clientArea,headerScrollDiv);
	setCurrentMenu(id);
	openMenus.push(id);
	focusMenuItem(id,0,true,false);
}

function menuKey(event,el,menuId)
{
	logDeprecatedMethodUse(versioning[0],"");
	switch(event.keyCode)
	{
	case KEYCODE_UP_ARROW:
		focusMenuItem(menuId,-1,false,false);
		break;
	case KEYCODE_DOWN_ARROW:
		focusMenuItem(menuId,1,false,false);
		break;
	case KEYCODE_ESC:
		if(SCREENREADER)
			break;
	case KEYCODE_LEFT_ARROW:
		menu_close(event,el,menuId);
		break;
	case KEYCODE_RIGHT_ARROW:
		if(!SCREENREADER)
		{
			menu_focusSub(event,el,menuId);
			break;
		}
	case KEYCODE_ENTER:
	case KEYCODE_SPACEBAR:
		if(!menu_focusSub(event,el,menuId))
		{
			var src=getSourceElement(event);
			if(src.tagName!="A")
				src.click();
			else
				return;
		}
		break;
	case KEYCODE_TAB:
		if(event.shiftKey)
			focusMenuItem(menuId,-1,false,false);
		else
			focusMenuItem(menuId,1,false,false);
		break;
	}
	cancelEvent(event);
}

function menu_close(event,el,menuId)
{
	logDeprecatedMethodUse(versioning[0],"");
	var menu=currentMenu;
	if(!undef(menu))
	{
		var menuParent = menu.getAttribute("menuparent");
		if(!undef(menuParent))
		{
			setCurrentMenu(menuParent);
			focusMenuItem(menuParent,0,false,true);
			hideMenu(menuId);
			hideUnrelatedSubMenus(document.getElementById(menuId));
		}
		else
		{
			hideAllMenus(true);
		}
	}
}

function menu_focusSub(event,el,menuId)
{
	logDeprecatedMethodUse(versioning[0],"");
	var sub=el.getAttribute("submenu");
	if(!undef(sub))
	{
		var submenu=document.getElementById(sub);
		if(submenu)
		{
			submenu.setAttribute("currentitem","");
			showMenu(sub,event,getSourceElement(event));
			setCurrentMenu(sub);
			focusMenuItem(sub,0,false,false);
			return true;
		}
	}
	return false;
}

function focusMenuItem(menuId,moveValue,newlyOpened,fromParent)
{
	logDeprecatedMethodUse(versioning[0],"");
	var menu = currentMenu;
	if(!menu)
		return;
	var menuItemArray = currentMenuItemList;
	if(undef(menuItemArray) || menuItemArray.length==0)
		return;
	var itemCount = menuItemArray.length;
	var currentfocusIndex=menu.getAttribute("currentitem");
	if(undef(currentfocusIndex) && moveValue==0)
	{
		//start trying at element 0
		currentfocusIndex=-1;
		moveValue=1;
	}
	else
	{
		if(moveValue==null)
		{
			currentfocusIndex=0;
			moveValue=0;
		}
		currentfocusIndex=parseInt(currentfocusIndex);
		// setup initial focus location
		if(moveValue>0)
		{
			if(currentfocusIndex==itemCount-1)
				currentfocusIndex=-1;
		}
		else if(!fromParent)
		{
			if(currentfocusIndex==0)
				currentfocusIndex=itemCount;
		}
	}
	var look=true;
	// 07-22214 - Adding a safety counter. We will only walk through 30 items
	var walkCount = 0;
	while(look && currentMenu!=null && walkCount<30)
	{
		currentfocusIndex+=moveValue;
		var id=menuItemArray[currentfocusIndex]+"_middle_anchor";
		var anchor=document.getElementById(id);
		if(undef(anchor))
			return;
		if(anchor.getAttribute("disabled")!="disabled")
		{
			stopFocus=true;
			menu.setAttribute('currentitem',currentfocusIndex);
			var delayTime = 300;
			if(SCREENREADER)
				delayTime=700;
			stopFocus=false;
			if(newlyOpened)
				delayedFocus(id,false,delayTime);
			else
				focusItemNow(id);
			look=false;
			continue;
		}
		if(moveValue>0)
		{
			if(currentfocusIndex==itemCount)
			{
				currentfocusIndex=-1;
			}
		}
		else
		{
			if(currentfocusIndex==0)
				currentfocusIndex=itemCount-1;
		}
		walkCount++;
	}
	showingMenu=false;
}

function setMenuHeight(menu)
{
	logDeprecatedMethodUse(versioning[0],"");
	var hasBeenSet = menu.getAttribute("heightset");
	if(!undef(hasBeenSet) && hasBeenSet == "true")
		return;
	var truewidth = parseInt(menu.offsetWidth);
	menu.style.overflow = "auto";
	menu.style.position = "absolute";
	menu.setAttribute("heightset", "true");
	if(!IE)
		menu.style.width = truewidth + "px";
}

/*
 * Hides the given menu
 */
function hideMenu(id)
{
	logDeprecatedMethodUse(versioning[0],"");
	if(undef(id))
		return;
	var sub = null;
	if (id == "current")
	{
		sub = currentMenu;
	}
	else
	{
		sub = getElement(id);
	}
	if (sub != null)
	{
		sub.style.visibility = "hidden";
		sub.style.display = "none";
		var oldCurrentId = sub.getAttribute("currentMenuItemId");
		if(oldCurrentId)
		{
			var oldCurrent = document.getElementById(oldCurrentId);
			if(oldCurrent)
			{
				highlightMenuItem(oldCurrent,false,false);
			}
		}
	}
	stopFocus=false;
}

/*
 * Hides all open menus
 */
function hideAllMenus(nf)
{
	logDeprecatedMethodUse(versioning[0],"");
	if(showingPopup)
		return;
	hidePopup();
	if(MOBILEDATEPICKER)
		closeDatePicker();
	dojohelper.closePickerPopup();
	stopPopOver();
	currentMenu=null;
	for(var i = 0; i < openMenus.length; i++)
	{
		var om = getElement(openMenus[i]);
		if(om)
			om.style.display = "none";
	}
	openMenus = new Array();
	if(nf)
		delayedFocus(getFocusId(),true,100);
}

/*
 * Hides all open menus no focus
 */
function hideAllMenusNF()
{
	logDeprecatedMethodUse(versioning[0],"");
	if(showingPopup)
		return;
	hidePopup();
	currentMenu=null;
	for(var i = 0; i < openMenus.length; i++)
	{
		var om = getElement(openMenus[i]);
		if(om)
			om.style.display = "none";
	}
	openMenus = new Array();
}

/*
 * Goes through the menus hierarchy and hides all until it reaches the current menu's parent
 */
function hideUnrelatedSubMenus(menu)
{
	logDeprecatedMethodUse(versioning[0],"");
	if(undef(menu))
		return;
	var parent = menu.getAttribute("menuparent");
	while(getLastOpenMenu() != parent)
	{
		hideMenu(openMenus.pop());
	}
}

/*
 * Goes through the menus hierarchy and hides all until it reaches the current menu
 */
function hideUnrelatedMenus(menu)
{
	logDeprecatedMethodUse(versioning[0],"");
	if(undef(menu))
		return;
	while(getLastOpenMenu() != menu)
	{
		hideMenu(openMenus.pop());
	}
}
/*
 * Sets the current menu
 */
function setCurrentMenu(id)
{
	logDeprecatedMethodUse(versioning[0],"");
	currentMenu = getElement(id);
	var menuItemList=currentMenu.getAttribute("itemlist");
	currentMenuItemList=menuItemList.split(",");
}

/* menuitem handler */
function mi_(event)
{
	logDeprecatedMethodUse(versioning[0],"");
	event = (event) ? event : ((window.event) ? window.event : "");
	var menuParent=this.getAttribute("menuparent");
	var subMenu=this.getAttribute("submenu");
	switch(event.type)
	{
	case "click":
		if(this.tagName=="A" || this.tagName=="TD")
		{
			var menuitem = this;
			if(this.tagName=="TD")
			{
				var menuitemid=this.getAttribute("anch");
				menuitem=document.getElementById(menuitemid);
				if(undef(menuitem))
					return;
				subMenu=menuitem.getAttribute("submenu");
			}
			else
				stopBubble(event);
			var itemdisabled=menuitem.getAttribute("itemdisabled")=="true";
			if (itemdisabled)
			{
				cancelEvent(event);
			}
			else if(!undef(subMenu))
			{
				showMenu(subMenu,event,this);
				return noStatus();
			}
			else
			{
				var menusId=menuitem.getAttribute("menusid");
				var rsq=menuitem.getAttribute("rsq");
				var itemId=menuitem.getAttribute("itemid");
				if(rsq=="1")
					itemId = itemId.replace("\"", "'");
				lastClickElement=menuitem;
				sendEvent("click",menusId,itemId);
				hideAllMenus();
				event.cancelBubble=true;
			}
		}
		break;
	case "focus":
		if(this.tagName=="A")
		{
			if(!SCREENREADER)
			{
				highlightMenuItem(this.parentNode,true,true);
				hideFocus(this);
				return noStatus();
			}
		}
		break;
	case "keydown":
		if(this.tagName=="A")
			menuKey(event, this, menuParent);
		break;
	case "mouseover":
		if(this.tagName=="TD")
		{
			subMenu=this.parentNode.getAttribute("submenu");
			menuParent=this.parentNode.getAttribute("menuparent");
			highlightMenuItem(this,true,true);
			if(!undef(subMenu))
				showMenu(subMenu,event,this);
			else
				hideUnrelatedMenus(menuParent);
			return noStatus();
		}
		break;
	}
}

function highlightMenuPath(item)
{
	while(item!=null && item.tagName=="TR")
	{
		var menuid=item.getAttribute("menuparent");
		if(!undef(menuid))
		{
			var menu=document.getElementById(menuid);
			if(menu)
			{
				var opener=menu.getAttribute("openeritem");
				var openeritem=null;
				if(!undef(openeritem))
					document.getElementById(opener);
				if(openeritem)
				{
					item=openeritem;
					item.setAttribute("highlighted","true");
					highlightMenuItem(item,true,false);
				}
				else
					item=null;
			}
		}
		else
			break;
	}
}

function highlightMenuPath(item)
{
	logDeprecatedMethodUse(versioning[0],"");
	while(item!=null && item.tagName=="TR")
	{
		var menuid=item.getAttribute("menuparent");
		if(!undef(menuid))
		{
			var menu=document.getElementById(menuid);
			if(menu)
			{
				var opener=menu.getAttribute("openeritem");
				var openeritem=null;
				if(!undef(openeritem))
					document.getElementById(opener);
				if(openeritem)
				{
					item=openeritem;
					item.setAttribute("highlighted","true");
					highlightMenuItem(item,true,false);
				}
				else
					item=null;
			}
		}
		else
			break;
	}
}

function bindDeprecatedEvents(ctype,el,tag) {
	if(ctype=="menuitem") {
		//only log this if it is actually used. Called a little differently than before
		logDeprecatedMethodUse(versioning[0],"should not be binding events to menu items in this manner");
		if(tag=="a")
		{
			el.onfocus=mi_;
			el.onkeydown=mi_;
			el.onclick=mi_;
		}
		else if(tag=="td")
		{
			el.onmouseover=mi_;
			el.onclick=mi_;
		}
	}
}

/* End Version 7.5.0.4 feature pack */
//logDeprecatedMethodUse(versioning[0],"");
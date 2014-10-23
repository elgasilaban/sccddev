/*
 *	Licensed Materials - Property of IBM
 *	"Restricted Materials of IBM"
 *	5724-U18
 *	(C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
 *	US Government Users Restricted Rights - Use, duplication or
 *	disclosure restricted by GSA ADP Schedule Contract with
 *	IBM Corp.
 **/

var navContainerMinWidth = 75;
var navIconWidth = 0; //50

function hideExtraHovers(section) {
	dojo.connect(section, "mouseout", section, function(event) {
		dojo.forEach(dojo.query(".hoverButton", dojo.byId(this.id + "_head")), function(element) {
			dojo.style(element, {
				"display" : "none"
			});
		});
	});
}

function sizeAnchors(navContainer, width){
	var navMenuAnchors = dojo.query(".dojoxEllipsis", navContainer);
	for(var naIndex=0;naIndex<navMenuAnchors.length;naIndex++) {
		var navAnchor = navMenuAnchors[naIndex];
		if(navAnchor.className.indexOf("navTitle") ==0) {
			continue;
		}
		dojo.removeAttr(navAnchor, "width");
		var section = navAnchor.parentNode.parentNode.parentNode.parentNode;
		var newWidth = width;
		var scrolled = (section.scrollHeight > section.clientHeight);
		if(scrolled) {
			if(dojo.isIE > 0){
				newWidth -= 7;
			}
			else {
				newWidth -= 15;
			}
		}
		newWidth-= (parseInt(dojo.style(navAnchor, "paddingRight")) + parseInt(dojo.style(navAnchor, "paddingLeft")) + 6);
		if(newWidth<0) {
			newWidth = 1; //IE issue
		}
		dojo.style(navAnchor, {"width": newWidth + "px"});
/*
		dojo.forEach(dojo.query("span", navAnchor), function(element) {
			newWidth = newWidth - getLeftPosition(element);
			if(dojo.isIE > 0 && scrolled){
				newWidth -= 20;
			}
			dojo.style(element, {
				"width" : newWidth+""
			});
		});
*/
	}
}

function ncEvents(navContainer, img, newTD, oldImgHandler) {
	dojo.disconnect(oldImgHandler);
	dojo.connect(img, "click", img, function(event) {
		///must toggle state
		var state = dojo.attr(navContainer,"state");
		switch (state)
		{
			case "open":
				state="icon";
				break;
			case "icon":
				state="closed";
				break;
			case "closed":
				state="open";
		}
		setNavContainerState(navContainer, state, false);
		stopBubble(event);
	});
	dojo.connect(img, "mouseup", img, function(event) {
		
	});
	dojo.connect(img, "mousedown", img, function(event) {
		stopBubble(event);
	});

	dojo.style(newTD, {
		"cursor" : "col-resize"
	});
	dojo.connect(newTD, "mousedown", newTD, function(event) {
		hideAllMenus();
		this.style.opacity = '0.4';
		// cancel out any text selections 
		document.body.focus(); 
		appendClass(document.body,"dragging");
		// prevent text selection in IE 
		document.body.onselectstart = function () { return false; };
		var moveHandle = dojo.connect(document, "mousemove", document, function(event) {
			hideAllMenus();
			appendClass(document.body,"dragged");
			document.body.onselectstart = function () { return false; };
			var width = parseInt(event.clientX) - 5;
			if(document.body.dir == "rtl") {
				width = parseInt(document.body.clientWidth - event.clientX) - 5;
			}
			dojo.attr(navContainer,{"maxwidth":width});
			var tbSpacer = dojo.byId("apptoolbarSpacer");
			if(tbSpacer){
				dojo.style(tbSpacer, {
					"width" : (width+10)+"px"
				});
			}
			dojo.style(navContainer, {
				"visibility" : "visible",
				"overflow" : "hidden",
				"width" : width+"px",
				"position" : "",
				"left" : "0px"
			});
			var navWidth = parseInt(navContainer.style.width);
			var navMenuItems = dojo.query(".navMenus", navContainer);
			var tooSmall = navWidth < navIconWidth + 20;
			for(var tnIndex=0;tnIndex<navMenuItems.length;tnIndex++) {
				var tn = navMenuItems[tnIndex];
				if(tooSmall) {
					appendClass(tn,"hide");
				}
				else {
					removeClass(tn,"hide");
				}
			}
			sizeAnchors(navContainer, navWidth);
			sizePanes(navContainer, false);
		}); 
		dojo.connect(document, "mouseover", document, function(event) { return false; });
		var docHandler = dojo.connect(document, "mouseup", newTD, function(event) {
			this.style.opacity = '1';
			dojo.disconnect(moveHandle);
			dojo.disconnect(docHandler);
			removeClass(document.body,"dragging");
			var navWidth = parseInt(navContainer.style.width);
			if(parseInt(navContainer.style.width) < 25) {
				navContainer.style.width=parseInt(navIconWidth+1)+"px";
				setNavContainerState(navContainer,"icon",true);
			}
			else {
				setNavContainerState(navContainer,"open",true);
			}
			var width = parseInt(event.clientX) - 5;
			if(document.body.dir == "rtl") {
				width = parseInt(document.body.clientWidth - event.clientX) - 5;
			}
		});
	});
}


///BEGIN OVERRIDE

/**
 * Change size state of a navContrainer expanded / collapsed
 * 
 * @param img
 * @param navContainer
 * @param state
 */
function setNavContainerState(navContainer, state, dragged) {
	var collapseDir = dojo.attr(navContainer, "collapseDir");
	var img = dojo.byId(navContainer.id + "_collapseImage");
	var setOpen = dojo.attr(navContainer, "state");
	if(undef(state)) {
		state = setOpen;
	}
	var navCol = dojo.byId(dojo.attr(navContainer, "navcolId"));
	if(dragged || state=="icon") {
		dojo.attr( navContainer, {
			"maxwidth" : parseInt(navContainer.style.width)
		});
	}
	if(state=="icon" && navIconWidth ==0 ) {
		state = "closed";
	}
	if(img) {
		if (state=="open" || state=="icon") {
			dojo.style(img, {
				"backgroundImage" : dojo.style(img, "backgroundImage").replace("collapsed", "expanded")
			});
			var width = (state=="icon")? navIconWidth : parseInt(navContainer.getAttribute("maxwidth"));
			if(state!="icon") {
				if(dragged) {
					width=navContainer.clientWidth;
				}
			}
			var navMenuItems = dojo.query(".navMenus", navContainer);
			for(var tnIndex=0;tnIndex<navMenuItems.length;tnIndex++) {
				var tn = navMenuItems[tnIndex];
				if(state=="icon") {
					appendClass(tn,"hide");
				}
				else {
					removeClass(tn,"hide");
				}
			}
			dojo.style(navContainer, {
				"visibility" : "visible",
				"overflow" : "hidden",
				"width" : width+"px",
				"position" : "",
				"left" : "0px"
			});
		} 
		else if (state=="closed") {
			dojo.style(img, {
				"backgroundImage" : dojo.style(img, "backgroundImage").replace("expanded", "collapsed")
			});
			dojo.style(navContainer, {
				"visibility" : "hidden",
				"overflow" : "hidden",
				"width" : "1px",
				"position" : "relative",
				"left" : "-1px"
			});
		}
		dojo.attr( navContainer, {
			"state":state
		});
	}
	sizePanes(navContainer,false);
}
///END OVERRIDE

///BEGIN OVERRIDE
/**
 * Builds new navsection content menus
 * 
 * @param level
 * @param id
 * @param menuDef
 * @param holder
 * @param className
 * @return
 */
function buildNavigationMenu(level, navId, id, menuDef, holder, className, showImages, isQuery) {
	var mcId = id+"_MC";
	var navMenus = topLevelMenus[mcId];
	if(!navMenus) {
		navMenus = new MenuController(mcId);
	}
 	holder = dojo.query("div", holder)[0];
 	navMenus.holder = holder;
	while (holder.hasChildNodes()) {
		holder.removeChild(holder.lastChild);
	}
	if(className && className!="") {
		className = " "+ className;
	}
	menuDef.baseClassName = "navMenus" + className;
	menuDef.hasSubClassName = "navSubmenu" + className;
	menuDef.subClassName = "subNavMenus"+ className;
	menuDef.staticMenu = true;
	menuDef.id = id+"_menu";
	var menu = navMenus.buildMenuLevel(0,APPTARGET,menuDef);
	if(undef(menu)) {
		return;
	}
	holder.appendChild(menu);
	navMenus.trueTop = menu.id;
	dojo.style(holder, {"overFlow":"hidden"});
	dojo.style(menu, {"display":"", "position":"static"});
	return;
}
	
	///END OVERRIDE

function setPromptValue(id, value) {
	var element = dojo.byId(id);
	if(!value) {
		value = dojo.attr(element, "promptValue"); 
	}
	if(element){
		if(document.activeElement != element) {
			if(element.value=="" || value==dojo.attr(element, "promptValue") ) {
				dojo.attr(element, {"value" : value});
				appendClass(element, "promptvalue");
			}
		}
		else {
			dojo.attr(element, {"value" : ""});
			removeClass(element, "promptvalue");
		}
		dojo.attr(element, {"promptValue": value});
		dojo.connect(element, "focus", element, function(event) {
		 	if(this.value == dojo.attr(this,"promptValue")) {
				dojo.attr(this, {"value" : ""});
				removeClass(this, "promptvalue");
			 }
		});
		dojo.connect(element, "blur", element, function(event) {
			if(this.value.trim() == "") {
				dojo.attr(element, {"value" : value});
				appendClass(element, "promptvalue");
			}
		});
	}	
}
/*
 *	Licensed Materials - Property of IBM
 *	"Restricted Materials of IBM"
 *	5724-U18
 *	(C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 *	US Government Users Restricted Rights - Use, duplication or
 *	disclosure restricted by GSA ADP Schedule Contract with
 *	IBM Corp.
 **/

/**
 * Resize the navsections. Each open section will get an equal percentage of vertical space. 
 * If a section uses less than it is given that space is shared among others. 
 * @param containerOrId
 * @param contHeight
 * @return
 */

function sizeNavSections(containerOrId, contHeight) {
	if(DESIGNMODE)
		return;
	var closedHeadingHeights = 0;
	var totalHeadingHeights = 0;
	var open = new Array();
	var containerOrId = dojo.byId(containerOrId);
	var navSections = eval(containerOrId.id + "navSections");
	var sectionCount = getObjectLength(navSections);
	var open = new Array();
	for (id in navSections) {
		var secDef = navSections[id];
		totalHeadingHeights += (secDef.headingHeight = dojo.byId(id+"_head").offsetHeight + 1);
		if(secDef.state == "min") {
			closedHeadingHeights += secDef.headingHeight;
		}
		else {
			open.push(id);
		}
	}
	var reclaimed = 0;
	var scrolled = new Array();
	var lastOpen;
	var distributedHeight = Math.ceil((contHeight - closedHeadingHeights) / open.length);
	for (id in navSections) {
		var secDef = navSections[id];
		var menuContainer = dojo.byId(id + "_content");
		var sec = dojo.byId(id);
		switch (secDef.state) {
			case "min":
				dojo.style(menuContainer, {"display":"none"});
				dojo.style(sec, {"height" : secDef.headingHeight + "px"});
				break;
			case "normal":
			case "max":
				var height = distributedHeight;
				lastOpen = id;
				dojo.style(sec, {"height" : height + "px"});
				var inner = dojo.byId(menuContainer.id + "_inner");
				dojo.style(sec, {"height" : height + "px"});
				dojo.style(menuContainer, {"height":"", "overflowY":"auto", "overflowX":"hidden", "display":""});
				dojo.style(inner, {"display":""});
				var adjust = 1; //deals with unexplained div offset in IE
				var extra = (height - secDef.headingHeight) - inner.offsetHeight - adjust;
				if(extra>=0) {
					if(dojo.isIE > 0) {
						adjust = 2;
					}
					reclaimed += extra + adjust;
					height -= extra - adjust;
				}
				else {
					scrolled.push(id);
				}
				dojo.style(sec, {"height" : height + "px"});
				dojo.style(menuContainer, {"height":(height - secDef.headingHeight) -1 + "px", "overflowY":"auto", "overflowX":"hidden"});
				break;
		}
	}
	if(reclaimed > 0) {
		if(scrolled.length == 0 && lastOpen) {
			scrolled.push(lastOpen);
		}
		if(scrolled.length>0) {
			//distribute reclaimed amount across all scrolled
			var unused = 0;
			reclaimed = Math.ceil((reclaimed / scrolled.length));
			for(var i = 0;i<scrolled.length;i++) {
				reclaimed += unused;
				var sizeContent = dojo.byId(scrolled[i] + "_content");
				var unused = (sizeContent.offsetHeight + reclaimed) - sizeContent.scrollHeight;
				var secDef = navSections[scrolled[i]];
				if(unused < 0 || scrolled[i]==lastOpen) {
					unused = 0;  
				}
				var height = (sizeContent.offsetHeight+(reclaimed-unused));
				dojo.style(sizeContent,{"height":height-1+"px","overflowY":"auto","overflowX":"hidden"});
				dojo.style(sizeContent.parentNode,{"height":(height+secDef.headingHeight)+"px"});
				if(unused > 0) {
					dojo.style(sizeContent,{"overflowY":"hidden"});
				}
			}
			if(unused > 0) {
				var sizeContent = dojo.byId(lastOpen + "_content");
				var height = sizeContent.offsetHeight+unused;
				dojo.style(sizeContent,{"height":height+"px"});
				dojo.style(sizeContent.parentNode,{"height":(height+secDef.headingHeight)+"px"});
			}
		}
	}
}

/**
 * Find out how much extra space this element is using
 * @param content
 * @param headHeight
 * @return
 */
function getExtraSpace(content, headHeight) {
	var contentHeight = (content.parentNode.offsetHeight - headHeight) - 3;
	var inner = dojo.byId(content.id + "_inner");
	return (contentHeight - inner.offsetHeight);
}

/**
 * Used to resize the navbar and adjacent column
 * We allow supression of section sizing as the scrolling is reset on them and we don't really want to do that if
 * user closes and open the whole container
 * @param containerOrId
 * @return
 */
function sizePanes(containerOrId, sections) {
	if(DESIGNMODE)
		return;
	var navContainer = dojo.byId(containerOrId);
	var overFlow = dojo.attr(navContainer, "pagenav") == "true";
	if (overFlow) {
		var adjacentCol = dojo.byId(dojo.attr(navContainer, "adjacentColId"));
		if(!adjacentCol) {
			adjacentCol = getAdjacentCol(navContainer.id).adjacentCol; 
		}
		// make room for breadcrumbs if there are any
		var breadcrumbsHeight = 0;
		if (typeof breadcrumbsId != 'undefined') {
			var breadCrumbs = dojo.byId(breadcrumbsId);
			if(breadCrumbs) {
				breadcrumbsHeight = dojo.marginBox(breadCrumbs).h;
			}
		}
		if (navContainer && adjacentCol) {
			dojo.style(adjacentCol, {"width":"100%"});
			var bodyScroll = document.body.scrollHeight;
			var setHeight = 0;
			if (bodyScroll > 0) {
				setHeight = (dojo.window.getBox().h - dojo.position(navContainer).y - breadcrumbsHeight - 1);
				if(setHeight>0) {
					var widthOffset = 0;
					if(dojo.attr(navContainer, "collapsible") == "true") { //needs to match the width of the collapse sep, but it may not be created yet 
						widthOffset = 6;
					}
					var sep = dojo.byId(navContainer.id + "_navSep");
					if(sep) {
						dojo.style(sep, {
							"height" : setHeight+"px"
						});
					}
		
					var currentAppDiv = dojo.byId("pagecurrentappdiv");
					if (currentAppDiv) {
						widthOffset += currentAppDiv.offsetLeft; 
					}		
					
					dojo.style(adjacentCol, {
						"height" : setHeight + "px",
						"verticalAlign" : "top",
						"width" : (dojo.window.getBox().w - navContainer.offsetWidth - widthOffset -1) + "px",
						"overflow" : "auto"
					});
					dojo.connect(adjacentCol, "scroll", adjacentCol, function() {
						stopPopWait();
						stopPopOver();
						dojohelper.closePickerPopup();
					});
					dojo.connect(adjacentCol, "mousewheel", adjacentCol, function() {
						stopPopWait();
						stopPopOver();
						dojohelper.closePickerPopup();
					});
					dojo.connect(adjacentCol, "wheel", adjacentCol, function() {
						stopPopWait();
						stopPopOver();
						dojohelper.closePickerPopup();
					});
					dojo.forEach(dojo.query("> table", adjacentCol), function(element) {
						dojo.style(element, {
							"height" : ""
						});
						dojo.attr(element, {
							"height" : ""
						});
					});
					dojo.style(navContainer, {
						"height" : setHeight + "px"
					});
				}
			}
			var tb = findParent(navContainer, "table", 1);
			dojo.style(tb, {
				"height" : ""
			});
			dojo.attr(tb, {
				"height" : ""
			});
			if(sections) {
				sizeNavSections(containerOrId, setHeight - 1);
			}
			
			dojo.publish("sizeNavHeader", navContainer.clientWidth);
			
			var navSections = eval(navContainer.id + "navSections");

			for(navsection in navSections) {
				
				dojo.forEach(dojo.query("div.navTitle", dojo.byId(navsection)), function(element) {
					var head = dojo.byId(navsection+"_head");
					var inputs = dojo.query("input", head).length;
					var navSec = navSections[navsection];
					var padding = 0;
					var iconWidth = 16; //width of internal icons
					if(inputs>0) {
						switch(navSec.state) {
							case 'min':
							case 'normal':
								padding = iconWidth * 2;
								break;
							case 'max':
								padding = iconWidth;;
								break;
						}
						//padding +=10; //needed to handle internal padding on elements
					}
					dojo.style(element, {
						"width":navContainer.clientWidth-padding+"px"
					});
				});
				sizeAnchors(navContainer, navContainer.clientWidth);
			}				
		}
	} else if(sections){
		sizeNavSections(containerOrId, null);
	}
}

/**
 * Used to remove any visble trace of the navcontainer from the page
 * @param navContainerId
 * @return
 */ 
function killNavContainer(navContainerId) {
	var navContainer = dojo.byId(navContainerId);
	if (!navContainer)
		return;
	var sectionCol = findParent(navContainer, "td", 2);
	if(!sectionCol)
		return;
	sectionCol.style.display="none";
	var section = findParent(sectionCol, "table", 1);
	if(!section)
		return;
	dojo.attr(section, {
		"cellspacing": "0"
		});
	dojo.style(section, {
		"padding": "0", 
		"borderSpacing" : "0"
	});
	var adjacentCol = section.rows[0].cells[sectionCol.cellIndex+1];
	dojo.style(adjacentCol, {
		"padding": "0" 
	});

}

function getAdjacentCol(navContainerId) {
	var navContainer = dojo.byId(navContainerId);
	var adjacentColId = dojo.attr(navContainer, "adjacentColId");
	var sectionCol = findParent(navContainer, "td", 2);
	var sectionRow = sectionCol.parentNode;
	var adjacentCol;
	if(adjacentColId) {
		adjacentCol = dojo.byId(adjacentColId);
	}
	else {
		adjacentCol = sectionRow.cells[sectionCol.cellIndex + 1];
		if(adjacentCol && dojo.attr(adjacentCol, "className")=="navSep") {
			adjacentCol = sectionRow.cells[sectionCol.cellIndex + 2];
		}
	}
	
	var handleOffset = 1;
	var collapseDir = "L";
	if (!adjacentCol) {
		try
		{
			adjacentCol = sectionRow.cells[sectionCol.cellIndex - 1];
			if(adjacentCol) {
				collapseDir = "R";
				handleOffset = 0;
			}
		}
		catch(error)
		{} //safety for bad colindex
	}
	if(sectionCol) {
		dojo.attr(navContainer, {"navcolId" : sectionCol.id});
		dojo.style( sectionCol , {"background":"#efefef"});
	}
	return {"adjacentCol":adjacentCol,"collapseDir":collapseDir,"handleOffset":handleOffset};
}

/**
 * Called after initial render to allow us to create the control structure
 * within the existing DOM
 * 
 * @param navContainerId
 * @return
 */
function fixNavContainer(navContainerId) {
	dojo.require("dojox.fx");
	var navContainer = dojo.byId(navContainerId);
	if (!navContainer)
		return;
	dojo.connect(navContainer, "selectstart", navContainer, function () { return false; });
	var collapsible = dojo.attr(navContainer, "collapsible") == "true";
	var sectionCol = findParent(navContainer, "td", 2);
	dojo.attr(sectionCol, {"class":dojo.attr(sectionCol,"class")+" noPadding"});
	var navTop = getTopPosition(navContainer);
	sectionCol.style.display = "none";
	var viewport = dojo.window.getBox();
	sectionCol.style.display = "";
	navContainer.parentNode.removeAttribute("noWrap");
	var setWidth = sectionCol.offsetWidth;
	var sectionRow = sectionCol.parentNode;
	if (!sectionRow || !sectionCol)
		return;
	var table = sectionRow.parentNode.parentNode
	table.style.borderSpacing = "0";
	table.cellPadding = "0";
	sectionCol.style.padding = "0px";
	var cell = sectionRow.cells[sectionCol.cellIndex];
	dojo.style(cell, {
		"width":"0%"
	});
	var section = div = findParent(cell, "TD", 1);
	dojo.style(section, {
		"padding":"0px"
	});

	var adjacentColInfo = getAdjacentCol(navContainerId);
	var adjacentCol = adjacentColInfo.adjacentCol; 
	var handleOffset = adjacentColInfo.handleOffset;
	var collapseDir = adjacentColInfo.collapseDir;
	dojo.attr(navContainer, {
		"collapseDir" : collapseDir
	});

	if(DESIGNMODE)
		return;
	if (adjacentCol) {
		adjacentColumn = adjacentCol;
		dojo.style(adjacentCol, {
			"width" : "100%",
			"padding" : "0",
			"verticalAlign" : "top"
		});
		dojo.style(adjacentCol, {
			"overflowY" : "auto"
		});
		var childTables = dojo.query("> table", adjacentCol);
		childTables.style( {
			"height" : ""
		});
		childTables.attr( {
			"height" : ""
		});
		dojo.attr(adjacentCol, {
			"height" : ""
		});
		dojo.style(dojo.byId(adjacentCol.id + "_div"), {
			"overflow":"auto"
		});
		dojo.attr(navContainer, {
			"adjacentColId" : adjacentCol.id + "_div"
		});
		sizePanes(navContainer, true);
	}
	// we had to make sure this happens after the initial render.
	// IE 7 does not like us modifying the table until it is completely created 
	if(collapsible && adjacentCol && !dojo.byId(navContainerId + "_navSep")) {
		var newTD;
		try {
			newTD = sectionRow.insertCell(sectionCol.cellIndex + handleOffset);
			newTD.id = navContainerId + "_navSep";
			newTD.className = "navSep";
	
			var img = document.createElement("button");
			img.id = navContainerId + "_collapseImage";
			img.className = "navCollapse" + dojo.attr(navContainer, "collapseDir");
			dojo.attr(img, {"title":navContainerStrings.collapse,"aria-label":navContainerStrings.collapse}); 
			dojo.connect(img, "mouseover", img, function(event) {
				dojo.style(img, {
					"backgroundImage" : dojo.style(img, "backgroundImage").replace('.png', '_hover.png')
				});
				stopBubble(event);
			});
			dojo.connect(img, "mouseout", img, function() {
				dojo.style(img, {
					"backgroundImage" : dojo.style(img, "backgroundImage").replace('_hover.png', '.png')
				});
			});
			appendClass(this, "navCollapseHover");
			dojo.attr(img, {
				"aria-label" : navContainer.getAttribute("buttonTitle")
			});
			
			var imgClickHandler = dojo.connect(img, "click", img, function() {
					//must toggle state
					setNavContainerState(navContainer,dojo.attr(navContainer,"state")!="open");
				});
			ncEvents(navContainer, img, newTD, imgClickHandler);
			newTD.appendChild(img);
		}
		catch(error) {
		}
	}
	dojo.attr(sectionRow.parentNode.parentNode, {
		"cellSpacing" : "0"
	});

	if (dojo.attr(navContainer, "pagenav") == "true") {
		navContainer.className += " fixedNavContainer";
	} else {
		navContainer.className += " navContainer";
	}
	return navContainer;
}

/**
 * Change size state of a navContrainer expanded / collapsed
 * 
 * @param img
 * @param navContainer
 * @param open
 */
function setNavContainerState(navContainer, open) {
	var collapseDir = dojo.attr(navContainer, "collapseDir");
	var img = dojo.byId(navContainer.id + "_collapseImage");
	var setOpen = dojo.attr(navContainer, "state")=="open";
	if(undef(open)) {
		open = setOpen;
	}
	var navCol = dojo.byId(dojo.attr(navContainer, "navcolId"));
	if (open==true || open=="true") {
		dojo.attr(navContainer, {
			"state":"open"
		});
		dojo.style(img, {
			"backgroundImage" : dojo.style(img, "backgroundImage").replace("collapsed", "expanded")
		});
		dojo.attr(img, {"title":navContainerStrings.collapse,"aria-label":navContainerStrings.collapse});
		dojo.style(navContainer, {
			"visibility" : "visible",
			"overflow" : "hidden",
			"width" : parseInt(navContainer.getAttribute("maxwidth")),
			"position" : "",
			"left" : "0px"
		});
	} else {
		dojo.attr( navContainer, {
			"maxwidth" : parseInt(navContainer.style.width),
			"state":"closed"
		});
		dojo.style(img, {
			"backgroundImage" : dojo.style(img, "backgroundImage").replace("expanded", "collapsed")
		});
		dojo.attr(img, {"title":navContainerStrings.expand,"aria-label":navContainerStrings.expand});
		dojo.style(navContainer, {
			"visibility" : "hidden",
			"overflow" : "auto",
			"width" : "1px",
			"position" : "relative",
			"left" : "-1px"
		});
	}
	sizePanes(navContainer,false);
}

/**
 * Allows min/max toggle when header is clicked
 * @param sectionId
 * @return
 */
function toggleSectionMinMax(sectionId) {
	var containerId = dojo.attr(dojo.byId(sectionId), "containerId");
	var navSections = eval(containerId + "navSections");
	var navSec = navSections[sectionId];
	switch(navSec.state) {
		case 'max':
			toggleSectionView(sectionId, 'min');
			break;
		default:
			toggleSectionView(sectionId, 'max');
			break;
	}
}

/**
 * expand / collapse navsections
 * 
 * @param sectionId
 * @param type
 */
function toggleSectionView(sectionId, type) {
	var containerId = dojo.attr(dojo.byId(sectionId), "containerId");
	var navSections = eval(containerId + "navSections");
	var navSec = navSections[sectionId];
	if(type==navSec.state) {
		return;
	}
	if (!SCREENREADER) {
		dojo.forEach(dojo.query("> div.hoverButton", dojo.byId(sectionId + "_head")), function(element) {
			dojo.style(element, {
				"display" : "none"
			});
		});
	}
	if (type == 'max') {
		for (id in navSections) {
			var secDef = navSections[id];
			secDef.state = "min";
		}
		navSec.state = type;
		sizePanes(containerId,true);
	} else if (type == 'normal') {
		for (id in navSections) {
			var secDef = navSections[id];
			if (secDef.state == "max")
				secDef.state = "normal";
		}
		navSec.state = type;
		sizePanes(containerId,true);
	} else if (type == 'min') {
		var totalOpen = 0;
		for (id in navSections) {
			var secDef = navSections[id];
			if (secDef.state != "min") {
				totalOpen++;
			}
		}
		if (totalOpen == 2) {
			for (id in navSections) {
				var secDef = navSections[id];
				if (secDef.state != "min") {
					secDef.state = "max";
				}
			}
		} else if (totalOpen == 1) {
			var navSectionsOrder = eval(containerId + "navSectionsOrder");
			var pos = dojo.indexOf(navSectionsOrder, sectionId);
			for (id in navSections) {
				var secDef = navSections[id];
				secDef.state = "min";
			}
			if (pos == 0) {
				navSections[navSectionsOrder[1]].state = "max";
			} else {
				navSections[navSectionsOrder[pos - 1]].state = "max";
			}

		}
		navSec.state = type;
		sizePanes(containerId,true);
	}
	var section = dojo.byId(sectionId);
	programmaticEvent( section,"mouseout");
	programmaticEvent( section,"mouseover");
}

/**
 * Used as callback for fetchNavigationMenu
 * 
 * @param responseObj
 * @param ioArgs
 * @return
 */
function fillNavSection(responseObj, ioArgs) {
	var events = dojo.fromJson(ioArgs.args.content.events);
	var id = events[0].navSectionId;
	var render = events[0].render;
	var cName= events[0].classname;
	var section = dojo.byId(id);
	if (undef(responseObj)) {
		section.style.display = "none";
		return;
	}
	if (!SCREENREADER) {
		dojo.connect(section, "mouseover", section, function(event) {
			var navSectionsOrder = eval(dojo.attr(section, "containerId") + "navSectionsOrder");
			if (navSectionsOrder.length > 1) {
				var col = dojo.byId(this.id + "_" + navSections[this.id].state);
				if (col) {
					dojo.style(col, {
						"display" : "inline"
					});
				}
			}
		});
		dojo.connect(section, "mouseout", section, function(event) {
			dojo.forEach(dojo.query("> div.hoverButton", dojo.byId(this.id + "_head")), function(element) {
				dojo.style(element, {
					"display" : "none"
				});
			});
		});
		hideExtraHovers(section);
	}
	if (responseObj)
		responseObj = (responseObj.menu) ? responseObj.menu : responseObj;
	responseObj["labelledBy"]=ioArgs.labelledBy;
	var holder = dojo.byId(id + "_content");
	buildNavigationMenu(0, id, id, responseObj, holder, cName, events[0].showImages, events[0].isQuery);
	var navSections = eval(events[0].containerId + "navSections");
	//if(!render || render != "true") {
		sizePanes(events[0].containerId,true);
	//}
}

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
function buildNavigationMenu(level, navId, id, menuDef, holder, className, showImages, isQuery) 
{
	var ul;
	if (holder.tagName != "UL") {
		var holderParent = dojo.byId(holder.id + "_inner");
		if (holderParent) {
			holder = holderParent;
		}
		var oldItems = holder.childNodes;
		while(holder.childNodes.length >0) {
			holder.removeChild(holder.childNodes[0]);
		}
		ul = document.createElement("ul");
		var labelId = holder.id;
		labelId = labelId.substring(0, labelId.indexOf("_cont"));
		dojo.attr(ul, {
			"aria-labelledby" : labelId + "_label",
			"role" : "tree"
		});
	} else {
		ul = holder;
	}
	if (level == 0)
		dojo.connect(ul, "keydown", ul, function(event) {
			treeKey(event, ul)
		});

	ul.id = id + "_menu";
	ul.className = className;
	var menuEvent = menuDef.mxevent;
	for (itemIndex in menuDef.items) {
		var item = menuDef.items[itemIndex];
		item.menuevent = menuEvent;
		addTreeStyleMenuItem(navId, id, level, itemIndex, ul, item, className, showImages, isQuery);
	}
	if (holder != ul) {
		holder.appendChild(ul);
	}
	var length = 0;
	if (menuDef.items) {
		length = menuDef.items.length;
	}
	if(saveButton) {
		var attr = dojo.attr(saveButton, "disabled");
		dojo.publish("appeventstate",[{"eventtype":"SAVE","enabled": !attr}]);
	}
	return length;	
	
}


/**
 * expand / collapse tree items
 * 
 * @param img
 * @param sectionId
 * @return
 */
function toggleMenuView(imgOrId, sectionOrId) {
	var section = dojo.byId(sectionOrId);
	var img = dojo.byId(imgOrId);
	if (section.style.display == "none" || section.offsetHeight == 1) {
		dojo.attr(img, {
			"src" : img.src.replace("collapsed", "expanded")
		});
		img.src = img.src.replace("collapsed", "expanded");
		dojo.style(section, {
			"display" : ""
		});
	} else {
		dojo.attr(img, {
			"src" : img.src.replace("expanded", "collapsed")
		});
		img.src = img.src.replace("expanded", "collapsed");
		dojo.style(section, {
			"display" : "none"
		});
	}
}

/**
 * Add an item to the new navsection content menu
 * 
 * @param level
 * @param itemIndex
 * @param ul
 * @param item
 * @param className
 * @return
 */
function treeItemHighlight(event) {
	var div = getSourceElement(event);
	if (div.tagName != "DIV") {
		div = findParent(div, "DIV", 1);
	}
	switch (event.type) {
	case "focus":
	case "mouseover":
		div.className = div.className.replace("acMenuDIV", "acMenuhoverDIV");
		dojo.forEach(dojo.query("span", div), function(element) {
			dojo.attr(element, {
				"origclass" : element.className
			});
			dojo.attr(element, {
				"class" : "acMenuHoverText"
			});
			dojo.connect(element, "mouseover", element, function(event) {
				cancelEvent(event);
			}, true);
			dojo.style(element, {
				"pointerEvents" : "none"
			});
		});
		break;
	case "mouseout":
	case "blur":
		div.className = div.className.replace("acMenuhoverDIV", "acMenuDIV");
		dojo.forEach(dojo.query("span", div), function(element) {
			dojo.attr(element, {
				"class" : dojo.attr(element, "origclass")
			});
		});
		break;
	}
}

function addTreeStyleMenuItem(navId, id, level, itemIndex, ul, item, className, showImages, isQuery) {
	var li = document.createElement("li");
	if(item.disabled) {
		dojo.attr(li, {"enabled":"false","aria-disabled":"true"});
	}
	dojo.attr(li, {
		"role" : "presentation",
		"class" : "acMenuLI",
		"id": ul.id + item.id
	});
	var div = document.createElement("div");
	div.id = li.id + "_div";
	dojo.connect(div, "focus", div, function(event) {
		treeItemHighlight(event);
	});
	dojo.connect(div, "mouseover", div, function(event) {
		treeItemHighlight(event);
	});
	dojo.connect(div, "blur", div, function(event) {
		treeItemHighlight(event);
	});
	dojo.connect(div, "mouseout", div, function(event) {
		treeItemHighlight(event);
	});
	div.className = "acMenuDIV";
	if (item.sub) {
		var plusMinus = document.createElement("img");
		plusMinus.id = li.id + "_plusminus";
		plusMinus.src = IMAGE_PATH + "tasknav/" + ((item.sub) ? "node_collapsed.png" : "node_nochildren.png");
		plusMinus.className = "acMenuImg";
        plusMinus.alt = "";
		dojo.attr(plusMinus, {
			"wait" : IMAGE_PATH + "tasknav/node_collapsed.png"
		});
		div.appendChild(plusMinus);
	} else {
		if(document.body.dir=="rtl") {
			dojo.style(div, {
				"paddingRight" : "13px"
			});
		}
		else {
			dojo.style(div, {
				"paddingLeft" : "13px"
			});
		}

	}
	if (level == 0 && showImages) {
		var menuImage = document.createElement("img");
		menuImage.className = "acMenuImg";
        menuImage.alt = "";
		if(item.disabled) {
			menuImage.className += " opacity_20";
		}
		menuImage.src = IMAGE_PATH + ((undef(item.image)) ? "menus/blank.gif" : item.image);
		div.appendChild(menuImage);
	}
	var tNode = document.createElement("SPAN");
	tNode.id = li.id + "_label";
	dojo.style(tNode, {
		"display" : "inline",
		"whiteSpace" : "normal",
		"role":"presentation"
	});
	div.appendChild(tNode);
	if (level > 0) {
		tNode.className = "acSubMenuText";
	}
	if(item.disabled) {
		tNode.className += " opacity_20";
	}
	tNode.innerHTML = item.text;// uncomment for text wrapping test + " | this
	// is some extra text to make things really
	// long";
	if (level == 0 && itemIndex == 0)
		div.tabIndex = "0";
	dojo.attr(div, {
		"role" : "treeitem",
		"aria-labelledby" : tNode.id
	});
	if(!undef(item.sub)) {
		dojo.attr(div, {
			"aria-expanded" : "false",
			"aria-haspopup": "true"
		});
	}
	li.appendChild(div);
	if (item.showborder) { // use item.border for all defined menu seps
		li.className = li.className + " acMenuItemBorder";
	}
	var addItem = true;
	if (item.sub) {
		var sub = document.createElement("ul");
		sub.id = ul.id + "_" + item.sub.id;

		var toggleEvent = "toggleMenuView('" + plusMinus.id + "','" + sub.id + "_menu')";
		dojo.attr(li, {
			"nodeinfo" : dojo.toJson( {
				"children" : true,
				"childrenfilled" : true,
				"state" : "closed",
				"node" : null,
				"primaryevent" : "",
				"toggleevent" : {
					"jsevent" : toggleEvent
				}
			})
		});
		if(document.body.dir=="rtl") {
			dojo.style(sub, {
				"display" : "none",
				"marginRight": "20px"
			});			
		}
		else {
			dojo.style(sub, {
				"display" : "none",
				"marginLeft": "20px"
			});
		}
		

		dojo.attr(sub, {
			"navId" : navId,
			"role" : "group",
			"aria-live" : "polite" 
		});
		li.appendChild(sub);
		item.sub.menuevent = item.menuevent;
		var subLength = buildNavigationMenu((level + 1), navId, sub.id, item.sub, sub, className);
		if (subLength == 0) {
			addItem = false;
		}
		dojo.connect(li, "click", li, function(event) {
			if(dojo.attr(li, "enabled")!="false") {
				toggleMenuView(plusMinus.id, sub.id);
			}
			hideAllMenusNF();
			stopBubble(event);
		});
	} else {
		if(undef(item.eventvalue)) {
			item.eventvalue = "";
		}
		dojo.attr(li, {
			"nodeinfo" : dojo.toJson( {
				"children" : false,
				"childrenfilled" : false,
				"state" : "closed",
				"node" : null,
				"primaryevent" : {
					"eventtype" : ((item.mxevent) ? item.mxevent : item.menuevent),
					"targetid" : ((item.eventtarget) ? item.eventtarget : navId),
					"value" : (!isQuery) ? item.eventvalue : (item.eventvalue+"{:}"+item.text)
				},
				"toggleevent" : ""
			})
		});

		dojo.connect(li, "click", li, function(event) {
			stopBubble(event);
			hideAllMenusNF();
			if(dojo.attr(li, "enabled")!="false") {
				processEvent(dojo.fromJson(this.getAttribute("nodeinfo")).primaryevent);
			}
		});
		if(item.mxevent) {
			dojo.attr(li, {"eventtype" : item.mxevent});
			dojo.subscribe("appeventstate", null, function(message){
				if(message.eventtype!=dojo.attr(li, "eventtype"))
					return;
				if(message.enabled){
					dojo.forEach(dojo.query("img", li), function(element) {
						removeClass(element, "opacity_20");
					});
					dojo.forEach(dojo.query("span", li), function(element) {
						removeClass(element, "opacity_20");
						dojo.attr(element, {
							"disabled" : ""
						});
					});
					dojo.attr(li, {
						"enabled" : "true",
						"ariaDisabled" : "false"
					});
				}
				else {
					dojo.forEach(dojo.query("img", li), function(element) {
						appendClass(element, "opacity_20");
					});
					dojo.forEach(dojo.query("span", li), function(element) {
						appendClass(element, "opacity_20");
						dojo.attr(element, {
							"disabled" : "disabled"
						});
					});
					dojo.attr(li, {
						"enabled" : "false",
						"ariaDisabled" : "true"
					});
				}
			});
		}
	}
	if (addItem) {
		dojo.attr(li, {
			"navId" : navId
		});
		ul.appendChild(li);
	}
	return li;
}

/**
 * Creates and queues event to getData from Navsection.java using XHR
 * 
 * @param id
 * @param containerId
 * @return
 */
function fetchNavigationMenu(id, containerId, showImages, tryCache, isQuery) {
	var holder = dojo.byId(id + "_content");
	var section = dojo.byId(id);
	if (!holder || !section)
		return;
	var navSections = eval(containerId + "navSections");
	if (tryCache) {
		var menuCache = localStorage["menucache"];
		if (menuCache) {
			menuCache = dojo.fromJson(menuCache);
			gotoMenu = menuCache["goto"];
			if (gotoMenu) {
				if (gotoMenu.items[0].eventvalue == "startcntr") {
					gotoMenu.items.shift();
				}
				fromCache = true;
				fillNavSection(gotoMenu, {
					'args' : {
						'content' : {
							'events' : "[{'navSectionId':'" + id + "','containerId':'" + containerId + "','showImages':" + showImages + "}]"
						}
					}
				});
				return;
			}
		}
	}
	var fetchEvent = new Event("getData", id, "", REQUESTTYPE_HIGHASYNC);
	var menu = dojo.byId(id + "_menu");
	if (menu) {
		var inner = dojo.byId(holder.id + "_inner");
		if (inner) {
			inner.removeChild(menu);
		}
	}
	fetchEvent["navSectionId"] = id;
	fetchEvent["containerId"] = containerId;
	fetchEvent["showImages"] = showImages;
	fetchEvent["isQuery"] = isQuery;
	queueManager.queueEvent(fetchEvent, "text/json", "json", fillNavSection, null);
}



/* Generic helper methods */

/**
 * Walk up DOM a specified number of levels looking for a particular tagname
 */
function findParent(element, tagName, levels) {
	tagName = tagName.toUpperCase();
	var level = 0;
	element = element.parentNode;
	while (element.tagName != tagName || level < levels) {
		if (element.tagName == tagName) {
			level++;
			if (level == levels)
				break;
		}
		element = element.parentNode;
	}
	return element;
}

/*
 * Returns the number of members within a Javascript object
 */
function getObjectLength(object) {
	var element_count = 0;
	for (e in object) {
		element_count++;
	}
	return element_count;
}

function hideExtraHovers(section) {
	//to be implemented in featurepack navsection_ex.js
}

function ncEvents(navContainer, img, newTD, oldImgHandler) {
	//to be implemented in featurepack navsection_ex.js
}

function sizeAnchors(navContainer, width){
	//to be implemented in featurepack navsection_ex.js
}
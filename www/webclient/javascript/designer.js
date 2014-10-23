/*
 * Licensed Materials - Property of IBM
 * 'Restricted Materials of IBM'
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
	var currentControl = null;
	var dropTargetId;
	var dragSourceId;
	var dragSourceType;
	var selectedStack = new Array(); 
	var selectedControl = null;
	var selectedControlType = null;
	var DESIGNER_HIGHLIGHT=new webColor("D7E8B1");
	var DESIGNER_DRAGENTER=new webColor("F5E9B8");
	var selectionMatches = true;
	var mouseDownStatus = false;
	var controlSource = false;
	
	function sendDesignerKey(event)
	{
		switch(event.keyCode)
		{
			case KEYCODE_DELETE:
				sendEvent("DELETENODE",'designer',"");
				cancelEvent(event);
				break;
			case KEYCODE_CUT:
				//alert("CUT")
				break;
			case KEYCODE_COPY:
				//alert("COPY")
				break;
			case KEYCODE_PASTE:
				//alert("PASTE")
				break;
			case KEYCODE_PROPERTIES:
				sendEvent("PROPERTIES",'designer',"");
				cancelEvent(event);
				break;
			case KEYCODE_F10:
				parent.sendEvent('designcontextmenu', 'designer', '');
				break;
		}
	}
	
	function webColor(hex, red, green, blue)
	{
		this.red=red;
		this.green=green;
		this.blue=blue;
		if(hex && hex.substring(0,1)!="#")
			hex="#"+hex;
		this.hex = hex;
		if(this.hex && this.hex!="")
		{
			this.red = getRed();
			this.green = getGreen();
			this.blue = getBlue();
		}
		else
		{
			this.hex = "#"+getHex();
		}
	
		function getHex()
		{
			if(!this.hex || this.hex=="")
			{
				var newHex = "";
				tmp = parseInt(red).toString(16);
				if (tmp.length < 2)
					tmp = "0" + tmp;
				newHex+=tmp;
				tmp = parseInt(green).toString(16);
				if (tmp.length < 2)
					tmp = "0" + tmp;
				newHex+=tmp;
				tmp = parseInt(blue).toString(16);
				if (tmp.length < 2)
					tmp = "0" + tmp;
				newHex+=tmp;
				hex = newHex.toUpperCase();
			}
			return hex;
		}
	
		function getRed()
		{
			if(!this.red || this.red=="")
			{
				var a = MakeNum(hex.substr(1,1));
				var b = MakeNum(hex.substr(2,1));
				red = (a*16)+(b*1);
			}
			return red;
		}
	
		function getGreen()
		{
			if(!this.green || this.green=="")
			{
				var a = MakeNum(hex.substr(3,1));
				var b = MakeNum(hex.substr(4,1));
				green = (a*16)+(b*1);
			}
			return green;
		}
	
		function getBlue()
		{
			if(!this.blue || this.blue=="")
			{
				var a = MakeNum(hex.substr(5,1));
				var b = MakeNum(hex.substr(6,1));
				blue = (a*16)+(b*1);
	
			}
			return blue;
		}
	
		function MakeNum(str)
		{
			if((str >= 0) && (str <= 9))
				return str;
	
			switch(str.toUpperCase()) 
			{
				case "A": return 10;
				case "B": return 11;
				case "C": return 12;
				case "D": return 13;
				case "E": return 14;
				case "F": return 15;
			}
		}
	}
	
	function refreshDesignerCanvas()
	{
		var canvas = getElement("canvas_iframe");
		canvas.contentWindow.sendEvent("rerender","systemhandler",null);
	}
	
	/** START OF EVENT FUNCTIONS **/
	
	var selectedComponent;
	
	function mxd_onmousedown(event,component,type)
	{
		var compId = component.getAttribute("compid");
		if(undef(compId))
			compId=component.id;
		var mousEvent = event.type.indexOf("mouse")>-1;
		lastClickElement=component;
		if(mousEvent && getButton(event)=="left")
		{
			hideAllMenus();
			parent.mouseDownStatus = true;
			parent.controlSource = false;
			parent.selectedComponent = component;
			parent.selectedControl = getControl(component);
			parent.selectedControlType=type;
			selectionMatches=false;
	
			if(undef(parent.selectedControl))
				return;
			parent.dragSourceId = compId;
			parent.setCommInput("selectedcontrol", compId);
			parent.setCommInput("selectedfield",compId);
	
			if (type == "tab")
			{
				tabSelect(compId);
			}
			else 
			{
				if (parent.selectedControl != null)
				{
					parent.sendEvent('selectcontrol', 'designer', '');
				}
			}
		}
		else if(mousEvent)
		{
			setClickPosition(component,event);
			parent.setCommInput("selectedcontrol", compId);
			parent.setCommInput("selectedfield", compId);
			addCommInput("selectedcontrol", compId);
			addCommInput("selectedfield", compId);
			parent.sendEvent('designcontextmenu', 'designer', compId);
		}
		cancelEvent(event);
	}
	
	function mxd_onmousetab(event,ctrlInst)
	{
		tabClick(ctrlInst.id);
	}
	
	function mxd_onmouseup(event, ctrlInst, type)
	{
		parent.mouseDownStatus = false;
	
		if (parent.selectedControl != null) {
			if (parent.selectedControl.id != ctrlInst.id) {
				mxd_ondrop(event, parent.selectedControl);
			}
		}
	
		parent.controlSource = false;
		cancelEvent(event);	
	}
	
	function mxd_onmouseover(event,component,type)
	{
		if (parent.mouseDownStatus == true) 
		{
			mxd_ondragover(event,component);
			var compId = component.getAttribute("compid");
			if(undef(compId))
				compId=component.id;
			parent.dropTargetId = compId;
		}
	}
	
	function mxd_onmouseout(event,component)
	{
		if (parent.mouseDownStatus == true) 
		{
			event = event || window.event; // global window.event is IE specific
			var targetControl = event.target || event.srcElement; // srcElement is IE specific
			targetControl = getControl(targetControl);
			if (!undef(targetControl)) 
			{
				targetControl.style.backgroundColor = "";
				bg = targetControl.getAttribute("bg");
				if (!undef(bg)) 
					targetControl.style.background = bg;
			}
		}
	}
	
	function mxd_onmousemove(event,ctrlInst)
	{
		cancelEvent(event);
	}
	
	function getControl(el)
	{
		while(el!=null && el.getAttribute("control")!="true")
		{
			el=el.parentNode;
		}
		return el;
	}
	
	function getControlType(ctrlInst)
	{
		var cId = ctrlInst.id;
		if(cId.indexOf("designer_ctrl_")>-1)
		{
			return cId.substring(14,cId.length);
		}
	}
	
	/** DRAGOVER **/
	function mxd_ondragover(event,ctrlInst)
	{
		parent.dropTargetId=ctrlInst.id;
	
		event = event || window.event; // global window.event is IE specific
		var targetControl = event.target || event.srcElement; // srcElement is IE specific
		targetControl = getControl(targetControl);
	
		bg=targetControl.style.background;
		if(!undef(bg))
			targetControl.setAttribute("bg",bg);
		targetControl.style.backgroundColor="#F5E9B8";
		cancelEvent(event);
	}
	
	
	var canvasId = "";
	
	function setCanvasId(cid)
	{
		canvasId = cid;
	}
	
	function getCanvasId()
	{
		return canvasId;
	}
	
	function getCanvasDocument()
	{
		var canvas_iframe = getElement("canvas_iframe");
		// use both contentWindow and contentDocument - one will be valid depending on browser version
		var framedoc = (canvas_iframe.contentWindow || canvas_iframe.contentDocument);
		if (framedoc.document)
		{
			framedoc = framedoc.document;
		}
		return framedoc;
	}
	
	/* DROP */
	function mxd_ondrop(event,ctrlInst)
	{
		//make sure we are dragging from somewhere, not just lost hold of a dialog
		if (parent.dropTargetId==null)
		{
			//something went wrong, cancel the drop
			return;
		}
	
		event = event || window.event; // global window.event is IE specific
		var targetControl = event.target || event.srcElement; // srcElement is IE specific
	
		targetControl = getControl(targetControl);
		if (!undef(targetControl)) {
			targetControl.style.backgroundColor = "";
			bg = targetControl.getAttribute("bg");
			if (!undef(bg)) 
				targetControl.style.background = bg;
		}
	
		var duplicate = "";
		if(event.ctrlKey)
			duplicate = "duplicate";
	
		if(parent.controlSource==true)
		{
			// we are dragging an object off of the toolbox
			parent.setCommInput("control", parent.dragSourceType);
			parent.setCommInput("targetfield", parent.dropTargetId);
			parent.sendEvent("insertcontrol", "designer", "");
		}		
		else
		{
			// we are dragging an existing object from one place to another
			parent.setCommInput("sourcefield", parent.dragSourceId);
			parent.setCommInput("targetfield", parent.dropTargetId);
			parent.sendEvent("movecontrol", "designer", duplicate);
		}
	
		var tmp = getControl(targetControl);
	
		if (tmp != parent.currentControl)
		{
			if(tmp.tagName=="TR")
			{
				tmp.style.backgroundColor = "";
				if (tmp.hasChildNodes) 
				{
					for (var i = 0; i < tmp.childNodes.length; i++) //FireFox supports childNodes[]
					{
						if(tmp.childNodes[i].style != null)
						{
							tmp.childNodes[i].style.borderTop = "";
						}
					}
				}else{
					for (var i = 0; i < tmp.children.length; i++) //Internet Explorer supports children[]
					{
						tmp.children[i].style.borderTop = "";
					}
				}
			}
		}
		cancelEvent(event);
		parent.currentControl = null;
		parent.dropTargetId = null;
		parent.dragSourceId = null;
	}
	
	function controls_ondragstart(ctrlInst)
	{
		dragSourceId = currentControl.id;
		dragSourceType = getControlType(currentControl);
	}
	
	function controls_onmousedown(event,ctrlInst)
	{
		mouseDownStatus = true;
		currentControl=ctrlInst;
		controlSource = true;
		selectedComponent = ctrlInst;//event.srcElement;;
		selectedControl = getControl(selectedComponent);
		dragSourceId = currentControl.id;
		dragSourceType = getControlType(currentControl);
		cancelEvent(event);
	}
	
	function controls_onmouseup(event,ctrlInst)
	{
		mouseDownStatus = false;
		currentControl = ctrlInst;
		controlSource = false;
	}
	
	function controls_onmousemove(event,ctrlInst)
	{
		cancelEvent(event);
	}
	
	function controls_onmouseover(event,ctrlInst)
	{
		ctrlInst.className = " tpsel";
		cancelEvent(event);
	}
	
	function controls_onmouseout(event,ctrlInst)
	{
		ctrlInst.className = " tpnosel";
		cancelEvent(event);
	}
	
	function cancelevent ()
	{
		window.event.returnValue = false;
	}
	
	function window_onmouseup()
	{
		mouseDownStatus = false;
		controlSource = false;
	}
	
	document.onmouseup=window_onmouseup;
	
	
	//new viewport stuff
	stamp = 1;
	faded = true;
	
	viewport_height = 30;
	viewport_width  = 20;
	
	function fadeViewport()
	{
		var speed = 2;
		var timer = 0;
	
		var framedoc = getCanvasDocument();
		var viewport_right = framedoc.getElementById("viewport_right");
	
		height = parseInt(viewport_right.style.height);
		width  = parseInt(viewport_right.style.left);
	
		viewport_height = height;
		viewport_width  = width;
	
		for(var i=90;i>=0;i--){
			setTimeout("changeOpacity('viewport_right',"+i+");",(timer * speed)); 
			setTimeout("changeOpacity('viewport_bottom',"+i+");",(timer * speed));
			setTimeout("changeOpacity('viewport_top',"+i+");",(timer * speed));
			setTimeout("changeOpacity('viewport_left',"+i+");",(timer * speed));
			setTimeout("changeOpacity('viewport_corner',"+i+");",(timer * speed));
			if(i<=40){
				setTimeout("changeOpacity('viewport_tail',"+i+");",(timer * speed));
			}
			timer++;
		}
	}
	
	function showViewport()
	{
		var speed = 5;
		var timer = 0;
	
		sizeViewport(viewportHeight, viewportWidth);
	
		for (var i = 0; i <= 90; i++) {
			setTimeout("changeOpacity('viewport_right'," + i + ");", (timer * speed));
			setTimeout("changeOpacity('viewport_bottom'," + i + ");", (timer * speed));
			setTimeout("changeOpacity('viewport_top'," + i + ");", (timer * speed));
			setTimeout("changeOpacity('viewport_left'," + i + ");", (timer * speed));
			setTimeout("changeOpacity('viewport_corner'," + i + ");", (timer * speed));
			if (i <= 40) {
				setTimeout("changeOpacity('viewport_tail'," + i + ");", (timer * speed));
			}
			timer++;
		}
	}
	
	function sizeViewport(v_height, v_width)
	{	
		var framedoc = getCanvasDocument();
	
		var viewport_right = framedoc.getElementById("viewport_right");
		var viewport_bottom = framedoc.getElementById("viewport_bottom");
		var viewport_top = framedoc.getElementById("viewport_top");
		var viewport_left = framedoc.getElementById("viewport_left");
		var viewport_corner = framedoc.getElementById("viewport_corner");
		var viewport_tail = framedoc.getElementById("viewport_tail");
	
		if (v_height == 0 && v_width == 0) 
		{
			viewport_right.style.visibility = "hidden";
			viewport_bottom.style.visibility = "hidden";
			viewport_top.style.visibility = "hidden";
			viewport_left.style.visibility = "hidden";
			viewport_corner.style.visibility = "hidden";
			viewport_tail.style.visibility = "hidden";
			fade();
		}
		else 
		{
			viewport_right.style.visibility = "visible";
			viewport_bottom.style.visibility = "visible";
			viewport_top.style.visibility = "visible";
			viewport_left.style.visibility = "visible";
			viewport_corner.style.visibility = "visible";
			viewport_tail.style.visibility = "visible";
		}
	
		viewport_right.style.height = v_height;
	
		if (document.body.dir=="rtl" || USERLANG=="AR" || USERLANG=="HE")
		{
			viewport_right.style.right = v_width;
			viewport_corner.style.right = v_width;
			viewport_tail.style.right = v_width;
		}
		else
		{
			viewport_right.style.left = v_width;
			viewport_corner.style.left = v_width;
			viewport_tail.style.left = v_width;
		}
	
		viewport_bottom.style.width = v_width;
		viewport_bottom.style.top = v_height;
		viewport_top.style.width = v_width;
		viewport_left.style.height = v_height;
		viewport_corner.style.top = v_height;
		viewport_tail.style.top = v_height;
	
		viewportWidth = v_width;
		viewportHeight = v_height;
		sizeCanvas();
	}
	
	function changeOpacity(elementId, opacity) {
		var framedoc = getCanvasDocument();
		var shade = framedoc.getElementById(elementId);
	
		if(opacity==0){
			shade.style.visibility = "hidden";
		}
		else
		{
			shade.style.visibility = "visible";
			shade.style.opacity = (opacity / 100); 
			shade.style.MozOpacity = (opacity / 100); 
			shade.style.KhtmlOpacity = (opacity / 100); 
			shade.style.filter = "alpha(opacity=" +opacity+ ")";
		}
	}

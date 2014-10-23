/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2006,2011 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

	var nav = navigator.userAgent.toLowerCase();
	var IE = false;
	var AN = false;
	var SA = false;
	var BROWSER = "";
	if(nav.indexOf("msie")>-1)
	{
		IE = true;
		BROWSER = "IE";
	}
	else if(nav.indexOf("opera")>-1)
	{
		BROWSER = "OP";
	}
	else if(nav.indexOf("firefox")>-1)
	{
		BROWSER = "FF";
	}
	else if(nav.indexOf("safari")>-1)
	{
		if(nav.indexOf("chrome")>-1)
			BROWSER = "CH";
		else if(nav.indexOf("android")>-1)
		{
			AN = true;
			BROWSER = "AN";
		}
		else
		{
			SA = true;
			BROWSER = "SA";
		}
	}
	
	/* check an event vs. a string of keycodes in the following format "KEYCODE_SPACEBAR|KEYCODE_ENTER" for a match */
	function hasKeyCode(event,code)
	{
		if(code==event.keyCode)
			return true;
		try
		{
			var codes=code.split("|");
			var codeCheck=event.keyCode;
			for(var i=0;i<codes.length;i++)
			{
				if(codeCheck==eval(codes[i]))
				{
					return true;
				}
			}
		}
		catch(error)
		{
		}
		return false;
	}
	
	function altPressed(event)
	{
		if(isIE())
		{
			return event.altLeft;
		}
		else
			return event.altKey;
	}
	
	function isIE()
	{
		return IE;
	}
	
	function isAndroid()
	{
		return AN;
	}
	
	function isSafari()
	{
		return SA;
	}
	
	function getBrowserVersion()
	{
		if(navigator.appVersion.indexOf("MSIE") != -1)
			return parseFloat(navigator.appVersion.split("MSIE")[1]);
		else
			return parseFloat(navigator.appVersion);
	}
	
	/* Get the document inside of an IFRAME in IE and Firefox */
	function getIframeDoc(IFrameObj)
	{
		var IFrameDoc;
		if (IFrameObj.contentDocument)
		{
			// For NS6
			IFrameDoc = IFrameObj.contentDocument;
		}
		else if (IFrameObj.contentWindow)
		{
			IFrameDoc = IFrameObj.contentWindow.document;
		}
		else if (IFrameObj.document)
		{
			IFrameDoc = IFrameObj.document;
		}
		else
		{
			return null;
		}
		return IFrameDoc;
	}
	
	/* Get the top of an object in IE and Firefox */
	function getTop(el)
	{
		if(isIE)
		{
			return el.posTop;
		}
		else
		{
			return el.top;
		}
	}
	
	/* Get the left of an object in IE and Firefox */
	function getLeft(el)
	{
		if(isIE)
		{
			return el.posLeft;
		}
		else
		{
			return el.left;
		}
	}
	
	/* Stop an event from bubbling in IE and Firefox */
	function stopBubble(event)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		if(dojo.isIE)
			event.cancelBubble=true;
		else
			event.stopPropagation();
	}
	
	/* kill an event in IE and Firefox */
	function cancelEvent(event)
	{
		event = (event) ? event : ((window.event) ? window.event : "");
		if(dojo.isIE)
		{
			event.cancelBubble=true;
			event.returnValue=false;
		}
		else
		{
			event.stopPropagation();
			event.preventDefault();
		}
	}
	
	/* Remove a bound event from an object in IE and Firefox */
	function removeListener(object, eventType, listener, capture )
	{
		if(IE)
		{
			object.detachEvent( "on"+eventType , listener );
		}
		else // Mozilla, Netscape, Firefox
		{
			object.removeEventListener(eventType, listener, capture);
		}
	}
	
	/* Bind an event to an object in IE and Firefox */	
	function addListener(object, eventType, listener, capture )
	{
		if(IE)
		{
			object.attachEvent( "on"+eventType , listener);
		}
		else // Mozilla, Netscape, Firefox
		{
			object.addEventListener(eventType, listener, capture);
		}
	}
	
	/* Gets the source element of an event in IE and Firefox */	
	function getSourceElement(event)
	{
		var srcEl = event.srcElement;
		if(srcEl==null)
			srcEl = event.target;
		return srcEl;
	}
	
	
	/* Fires an event on an object in IE and Firefox */
	function frontEndEvent(obj, eventType)
	{
		//TODO - dispatch events in Firefox is not complete...
		if(!undef(obj))
		{
			var href = obj.getAttribute("href");
			if(href && href.length>0)
			{
				var index = href.toLowerCase().indexOf("javascript:");
				if(index==0)
				{
					var scrpt = href.substring(index+1);
					eval(scrpt);
					return;
				}
			}
			if(IE)
			{
				obj.fireEvent("on"+eventType);
			}
			else
			{
				var evt =null;
				if(eventType=="click" || eventType=="mousedown" || eventType=="mouseenter")
				{
					evt = document.createEvent("MouseEvents");
					evt.initMouseEvent(eventType, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
				}
				if(!undef(evt))
					obj.dispatchEvent(evt);
			}
		}
	}
	
	/* Used to suppress link visibility in status window */
	function noStatus()
	{
		window.status='Done';
		return true;
	}
	
	/* String replacement method */
	function replace(original, oldString, newString)
	{
		var i;
		while((i = original.indexOf(oldString))>-1)
		{
			original = original.substring(0,i) + newString + original.substring(i + oldString.length);
		}
		return original;
	}
	
	function isDisabled(el)
	{
		if(undef(el))
			return false;
		var elDis = el.getAttribute("disabled");
		return (elDis=="disabled" || elDis==true);
	}
	
	function setDisabled(elId,dis)
	{
		var el = document.getElementById(elId);
		if(undef(el))
			return;
		var elDis = isDisabled(el);
		if(elDis==dis) //already set to what we want
			return;
	
		if(dis==true)
		{
			appendClass(el, "opacity_30");
			el.setAttribute("disabled","disabled");
		}
		else
		{
			removeClass(el, "opacity_30");
			el.setAttribute("disabled","");
		}
	}
	
	function getFirstChild(el)
	{
		var child=null;
		var childNum=0;
		var badType=3;
		if(el!=null)
		{
			child= el.childNodes.item(childNum);
			while(undef(child) || child.nodeType==badType)
			{
				childNum++;
				child= el.childNodes.item(childNum);
				if(child)
					break;
			}
		}
		return child;
	}
	
	
	function getButton(event)
	{
		if(IE)
		{
			if(event.button==1)
				return "left";
			else
				return "right";
		}
		else
		{
			if(event.button==0)
				return "left";
			else
				return "right";	
		}
	}
	
	/*
	 * Does one element contain another within the DOM hierarchy
	 */
	function contains(container, child)
	{
		var found = false;
		if(!container || !child)
			return found;
	
		if(dojo.isIE && !undef(container.contains))
		{
			found = container.contains(child);
		}
		else
		{
			found = dojo.query("#"+container.id+" #"+child.id);
			found=found.length>0;
		}
		return found;
	}
	
	function hideFocus(el)
	{
		var outline=el.getAttribute("outline");
		if(outline=="false")
		{
			if(IE)
				el.hideFocus=true;
			else
				el.style.outline='none';
		}
	}
	
	function point(event,x,y)
	{
		this.event=event;
		this.x=x;
		this.y=y;
	}
	
	/**
	 * returns a point for an event offset
	 * @param event
	 * @return
	 */
	function getEventOffset(event)
	{
		var obj = getSourceElement(event);
		var pos_x = event.offsetX?(event.offsetX):event.pageX-getLeftPosition(obj);
		var pos_y = event.offsetY?(event.offsetY):event.pageY-getTopPosition(obj);
		if(typeof(pos_x)!='number' || undef(pos_x))
			pos_x=0;
		if(typeof(pos_y)!='number'|| undef(pos_y))
			pos_y=0;
		return new point(event,pos_x,pos_y);
	}

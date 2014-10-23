/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

	var asnViewerApplet = null;

	var myId = null;
	var myRequestURLBase = null;
	var myProjectId = null;
	var myUISessionId = null;
	var noOfAttempts = 0;
	var ATTEMPTS_TO_CHECK = 20;
	var SKDsizer;

	var fullScrenOn = false;
	
	var schedulerDivWidth = null;
	var schedulerDivHeight = null;
	var schedulerTop = null;
	var schedulerLeft = null;
	var schedulerZIndex = null;

	var origClientAreaInfoScrollTop = null;
	var origClientAreaInfoScrollLeft = null;
	var origClientAreaInfoPosition = null;
	var origClientAreaInfoOverflow = null;
	var origClientAreaInfoTop = null;
	var origClientAreaInfoLeft = null;

	
	function toggleFullScreenMode()
	{
		var viewerDIV = document.getElementById("asnviewerAppletDiv");

		var viewportwidth;
		var viewportheight;

		viewportwidth = dijit.getViewport().w;
		viewportheight = dijit.getViewport().h;
 
		if (fullScrenOn)
		{
			if(dojo.isIE)
			{
				// Need to adjust the client area due to fix of issue 12-10107
				// we make the client area 'full screen'
				// clientAreaId is a value that is made available by Maximo
				if (window.clientAreaId) 
				{
					var clientArea = document.getElementById(window.clientAreaId);
					if (clientArea) 
					{
						clientArea.style.top = origClientAreaInfoTop;
						clientArea.style.left = origClientAreaInfoLeft;
						clientArea.style.position = origClientAreaInfoPosition;
						clientArea.style.overflow = origClientAreaInfoOverflow;
	
						clientArea.scrollTop = origClientAreaInfoScrollTop;
						clientArea.scrollLeft = origClientAreaInfoScrollLeft;
					}
				}
			}

			viewerDIV.style.width = '100%';
			viewerDIV.style.height = schedulerDivHeight;
			viewerDIV.style.top = schedulerTop;
			viewerDIV.style.left = schedulerLeft;
			viewerDIV.style.zIndex = schedulerZIndex;
			fullScrenOn = false;
		}
		else
		{
			if(dojo.isIE)
			{
				if(window.clientAreaId)
				{
					var clientArea = document.getElementById(window.clientAreaId);
					if(clientArea)
					{
						var position = (clientArea.style.position || "relative");
						var overflow =  (clientArea.style.overflow || "auto");
						
						origClientAreaInfoScrollTop = clientArea.scrollTop;
						origClientAreaInfoScrollLeft = clientArea.scrollLeft;
						origClientAreaInfoPosition = position;
						origClientAreaInfoOverflow = overflow;
						origClientAreaInfoTop = clientArea.style.top;
						origClientAreaInfoLeft = clientArea.style.left;
						
						clientArea.scrollTop = 0;
						clientArea.scrollLeft = 0;
						clientArea.style.width = viewportwidth;
						clientArea.style.height = viewportheight;
						clientArea.style.top = '0px';
						clientArea.style.left = '0px';
						clientArea.style.position = 'absolute';
						clientArea.style.overflow = 'hidden';
					 }
				 }
			 }
			 
			this.schedulerDivWidth = viewerDIV.style.width;
			this.schedulerDivHeight = viewerDIV.style.height;
			this.schedulerTop = viewerDIV.style.top;
			this.schedulerLeft = viewerDIV.style.left;
			this.schedulerZIndex = viewerDIV.style.zIndex;
						
			viewerDIV.style.width = '100%';
			viewerDIV.style.height = (viewportheight - 20) + "px";
			viewerDIV.style.top = '0px';
			viewerDIV.style.left = '0px';
			viewerDIV.style.zIndex = '1000';
			fullScrenOn = true;
		 }
		
		 makeViewerFullheight();
	}
	

	
	function selectApplet(id)
	{
		if(asnViewerAppletAvailable(id))
		{	
			try
			{
				asnViewerApplet.setActive();
				//fix issue 12-12659
				setButtonEnabled(saveButton, true); 
			}
			catch(error)
			{
			}
		}
	}

	
	function refreshApplet(id)
	{
		if(!asnViewerAppletAvailable(id))
			return;

		if(asnViewerApplet.readyState!="complete")
			return;

		sendEvent(asnViewerApplet.id, "updateapplet", '');
	}
	
	function initProjectDataModel(id, projectId)
	{
		myId = id;
		myProjectId = projectId;
		
		noOfAttempts++;
		
		if(!asnViewerAppletAvailable(id))
			return;

		try
		{
			asnViewerApplet.initProjectDataModel(myProjectId);
			hideWait();
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}
	
			setTimeout("initProjectDataModel(myId, myProjectId)", 2000);
		}
	}

	function setSKDServletURLBase(id, requestURLBase)
	{
		myId = id;
		myRequestURLBase = requestURLBase;
		noOfAttempts++;

		if(!asnViewerAppletAvailable(id))
			return;

		try
		{
			asnViewerApplet.setSKDServletURLBase(myRequestURLBase);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setSKDServletURLBase(myId, myRequestURLBase)", 2000);
		}
	}
	
	function setUISessionId(id, uisessionId)
	{
		myId = id;
		myUISessionId = uisessionId;
		noOfAttempts++;

		if(!asnViewerAppletAvailable(id))
			return;

		try
		{
			asnViewerApplet.setUISessionId(uisessionId);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setUISessionId(myId, myUISessionId)", 2000);
		}
	}
	
	function setSKDActivityQBE(id, skdActivityQBE)
	{
		myId = id;
		mySkdActivityQBE = skdActivityQBE;
		noOfAttempts++;

		if(!asnViewerAppletAvailable(id))
			return;

		try
		{
			asnViewerApplet.setSKDActivityQBE(skdActivityQBE);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0))
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setSKDActivityQBE(myId, mySkdActivityQBE)", 2000);
		}
	}

	function setConstraintValues(id, newValues)
	{
		myId = id;
		myNewValues = newValues;
		noOfAttempts++;

		if(!asnViewerAppletAvailable(id))
			return;

		try
		{
			asnViewerApplet.editConstraint(newValues);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0))
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setConstraintValues(myId, myNewValues)", 2000);
		}
	}

	function asnViewerAppletAvailable(id)
	{
		asnViewerApplet = document.getElementById(id);
		if(!asnViewerApplet)
		{
			alert("Error: Test Applet not found! id = " + id);
			return false;
		}
		return true;
	}


	function adjustForFullScreen()
	{
		if (dojo.isIE)
		{
			// The following code is added as a fix to the following problem.
			// If the browser window is in restored state (i.e not fully maximized)
			// and if the full screen is on (i.e user clicked on our full screen button)
			// and the user after that used F11 of the browser to show the browser
			// in full screen mode, then the client area is still left with old
			// width and height and the applet only renders in a partial area
			// instead of the full visible area.
			// NOTE that this happens only in IE
			 var viewportwidth;
			 var viewportheight;

			 viewportwidth = dijit.getViewport().w;
			 viewportheight = dijit.getViewport().h;

			 if(fullScrenOn)
			 {
				 if(window.clientAreaId)
				 {
					 var clientArea = document.getElementById(window.clientAreaId);
					 if(clientArea)
					 {
						var position = (clientArea.style.position || "relative");
						var overflow =  (clientArea.style.overflow || "auto");
						
						clientArea.scrollTop = 0;
						clientArea.scrollLeft = 0;
						clientArea.style.width = viewportwidth;
						clientArea.style.height = viewportheight;
						clientArea.style.top = '0px';
						clientArea.style.left = '0px';
						clientArea.style.position = 'absolute';
						clientArea.style.overflow = 'hidden';
						
					 }
				 }
			 }
		}
	}
	

	function makeViewerFullheight()
	{
		adjustForFullScreen();
		
		var asnViewerApplet = document.getElementById("ASNViewerId");
		if(!asnViewerApplet)
			return;
		var asnViewerAppletControl = getControl(asnViewerApplet);
		if(!asnViewerAppletControl)
			return;
		var vs = dojo.window.getBox();
		var available = parseInt(vs.h) - parseInt(getTopPosition(asnViewerAppletControl));
		asnViewerApplet.height=available+"px";
		asnViewerApplet.style.height=available+"px";
		// 12-13399
		asnViewerApplet.width="100%";
		asnViewerApplet.style.width="100%";
	}

	function refreshskdviewer(skdid,servletbase,uisessionid,projectid,skdtableid)
	{
		setSKDServletURLBase(skdid, servletbase);
		setUISessionId(skdid, uisessionid);
		initProjectDataModel(skdid, projectid);
		asnViewerApplet = document.getElementById(skdid);
		asnViewerAppletControl = getControl(asnViewerApplet);
		if(asnViewerAppletControl)
		{
			asnViewerAppletControl.style.top=0;
			var el = document.getElementById(skdtableid);
			if(el)
			{
				el.width="100%";
				makeViewerFullheight(skdid);
			}
		}
		//fix issue 12-12659
		setButtonEnabled(saveButton, true); 
	}

	function skdviewerprojectchanged(skdid,servletbase,uisessionid,projectid)
	{
		setSKDServletURLBase(skdid, servletbase);
		setUISessionId(skdid, uisessionid);
		initProjectDataModel(skdid, projectid);
	}

	function showSchedulerLoading(loading) {
		var id = document.getElementById("asnviewer_loading");
		if (id!=null) {
			var skdViewerApplet = document.getElementById('ASNViewerId');
			var skdViewerAppletControl = getControl(skdViewerApplet);
			if (skdViewerAppletControl) {
				if (loading) {
					// hide the applet, when we are loading
					makeSchedulerVisibile(false, 'ASNViewerId');
					id.style.display="";
					skdViewerAppletControl._loading=true;
				} else {
					
					if (skdViewerAppletControl._loading==true) {
						// show applet when we are done loading
						makeSchedulerVisibile(true, 'ASNViewerId');
					}
					
					_hideSchedulerLoading(skdViewerAppletControl);
				}
			}
		}
	}
	
	function _hideSchedulerLoading(appletControl) {
		var id = document.getElementById("asnviewer_loading");
		if (id!=null) {
			id.style.display="none";
		}
		if (appletControl) {
			appletControl._loading=false;
		}
	}
	
	function makeSchedulerVisibile(vis,id)
	{
		var asnViewerApplet = document.getElementById(id);
		var asnViewerAppletControl = getControl(asnViewerApplet);
		if(asnViewerAppletControl)
		{
			var tbl = document.getElementById("asnviewertable");
			if(vis)
			{
				// hide loading animation
				_hideSchedulerLoading(asnViewerAppletControl);
				
				asnViewerAppletControl.style.position="relative";
				asnViewerAppletControl.style.top=0;
				if(tbl)
				{
					tbl.width="100%";
					window.setTimeout(makeViewerFullheight, 0);
				}
				asnViewerApplet.tabIndex="0";
				if(!SKDsizer)
				{
					SKDsizer=dojo.connect(window, "resize", null, makeViewerFullheight);
				}
			}
			else
			{
				// hide loading, just in case
				_hideSchedulerLoading(asnViewerAppletControl);
				
				// hide the html elements when we no longer are visible so that it doesn't consume whitespace
				// 12-12450
				if (dojo.isIE) {
					// we need to use absolute to ensure "space" isn't added to the visible screen in IE
					asnViewerAppletControl.style.position="absolute";
				}
				asnViewerAppletControl.style.top=-5000;
				if(tbl)
				{
					tbl.height=1;
					tbl.width=1;
				}
				asnViewerApplet.tabIndex="-1";
				dojo.disconnect(SKDsizer);
				SKDsizer = undefined;
			}
		}
	}
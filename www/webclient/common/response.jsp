<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page import= "psdi.webclient.system.beans.*, psdi.webclient.controls.RecordHover, psdi.webclient.system.controller.*, java.util.*, java.io.*,psdi.webclient.system.runtime.*,psdi.webclient.system.session.*,psdi.webclient.system.controller.*,psdi.util.BidiUtils,psdi.webclient.controls.Menus;" %><%
	java.io.PrintWriter writer = response.getWriter();
	writer.println("<?xml version=\"1.0\" encoding=\"" + session.getAttribute("_encoding") + "\" ?>");
	WebClientRuntime wcr = psdi.webclient.system.runtime.WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	writer.println("<server_response csrftoken=\"" + wcs.getCSRFToken() + "\">");
	
	if(wcs.getDesignmode())
	{
		writer.println("<designmode>true</designmode>");
	}
	AppInstance jsApp = wcs.getCurrentApp();
	StringBuilder stringBuilder = new StringBuilder();
	String redirectURL = null;
	PageInstance currentPage = null; 
	if(jsApp!=null)
	{
		currentPage = jsApp.getCurrentPage();
		String portalMsg = "";
		if(wcs.getTipPortalMode())
		{
			stringBuilder.append("<tipmessage>");
			stringBuilder.append("<![CDATA[" + wcs.getPortalMsg() + "]]>");
			stringBuilder.append("</tipmessage>");
			wcs.setPortalMsg("");
	 	}
		redirectURL = jsApp.getRedirectURL();
	}
	else
	{
		redirectURL="{RELOAD}";
	}
	
	if (redirectURL != null)
	{
		if(jsApp!=null)
			jsApp.setRedirectURL(null);
		stringBuilder.append("<redirect><![CDATA[" + redirectURL + "]]></redirect>");
	}
	else
	{
		RecordHover recHover = jsApp.getRecHover();
		if(recHover!=null) {
			stringBuilder.append("<rechover><![CDATA[" + recHover.renderContent() + "]]></rechover>");
			jsApp.clearRecHover();
		}
		if(wcs.isCombinedSetValue()) {
			Menus menus = (Menus) currentPage.getControlInstance(currentPage.getMenuHandlerId());
			if(menus != null && menus.needsRender() && menus.getMenus().size()> 0) {
				stringBuilder.append(menus.render());
			}
		}
		wcs.processRender();
		stringBuilder.append("<deferredscript>");
		stringBuilder.append("<![CDATA[");
		boolean des = "true".equalsIgnoreCase(request.getParameter("designmode"));
		try
		{
			java.util.Stack pageStack = jsApp.getPageStack();
			String currentfocusid = "";
			String defaultfocusid = "";
			String scrolltop = "";
			String scrollleft = "";
			String focusRow = "";
			java.util.Iterator pageIterator = pageStack.iterator();
			psdi.webclient.system.controller.PageInstance stackPage = null;
			boolean topPage = false;
			boolean longOpRunning = wcs.hasLongOpStarted() && !wcs.hasLongOpCompleted();
			while(pageIterator.hasNext())
			{
				stackPage = (psdi.webclient.system.controller.PageInstance)pageIterator.next();
				topPage=!pageIterator.hasNext();
				if (longOpRunning && stackPage.get("_longopPage") == null)
				{
					continue; //Only want to set focus on longop dialog if long op is running
				}
				currentfocusid = (String)stackPage.getFocusRenderId();
				scrolltop = (String)stackPage.get("scrolltoppos");
				scrollleft = (String)stackPage.get("scrollleftpos");
				stackPage.remove("infocuscontainer");
				stackPage.remove("focuscontainerid");
				stackPage.remove("scrolltoppos");
				stackPage.remove("scrollleftpos");
				defaultfocusid=(String)stackPage.get("defaultfocusid");
				if(wcr.isNull(currentfocusid) && !wcr.isNull(defaultfocusid))
					currentfocusid=defaultfocusid;
				if(wcr.isNull(currentfocusid))
					currentfocusid=(String)stackPage.get("firstfocusableobject");
				stackPage.remove("firstfocusableobject");
				if(wcs.getRequestType()!=WebClientSession.RequestType.SYNC || (stackPage!=null && stackPage.focus()))
				{
					stringBuilder.append("stopFocus=false;reFocusItem();");
				}
				else
				{
					if(!wcr.isNull(currentfocusid) && topPage && !des)
						stringBuilder.append("focusItem('"+currentfocusid+"',"+topPage+");");
				}
				if(!wcr.isNull(scrolltop) && !wcr.isNull(scrollleft))
					stringBuilder.append("scrollScreen('"+scrolltop+"','"+scrollleft+"');");
			}
			String refreshOuter = (String)jsApp.get("refreshouterapp");
			if(refreshOuter!=null && refreshOuter.equalsIgnoreCase("true"))
			{
				jsApp.remove("refreshouterapp");
				stringBuilder.append("parent.sendEvent('rerender','systemhandler',null);");
			}
			//The following is for Web Replay/tbx
			if(wcs.isWebReplayEnabled())
				stringBuilder.append("callWebReplayFrame();");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		Map<String, String> changedErrorContainers = currentPage.getChangedErrorContainers();
		if(changedErrorContainers!=null && changedErrorContainers.size()>0)
		{
			Set<String> set = changedErrorContainers.keySet();
			Iterator<String> keys = set.iterator();
			String newType = "";
			for (Map.Entry<String, String> entry : changedErrorContainers.entrySet())
			{
				newType += "setECIcon(\""+entry.getKey()+"\",\""+entry.getValue()+"\");";
			}
			stringBuilder.append(newType);
			changedErrorContainers.clear();
		}
		currentPage.clearChangedErrorContainers();
		
		if(!des)
			stringBuilder.append("resetLogoutTimer(true);");
		WebClientEvent originalEvent =wcs.getOriginalEvent();
		String eventType = originalEvent.getType();
		if("processEdit".equalsIgnoreCase(eventType))
		{
			String originalFieldTarget = originalEvent.getTargetId();
			ComponentInstance originalTarget = currentPage.getComponentInstance(originalFieldTarget);
			String oTragetRenderId = originalTarget.getRenderId();
			if(originalTarget.isOnTableRow())
			{
				int eventRow = originalEvent.getRow();
				oTragetRenderId=WebClientRuntime.addRowMarker(oTragetRenderId, eventRow);
			}
			if(originalTarget!=null)
			{
				stringBuilder.append("input_forceChanged(dojo.byId('"+oTragetRenderId+"'));");
			}
		}
		if(jsApp.getId().equalsIgnoreCase("designer"))
		{
			String events = request.getParameter("events");
			com.ibm.json.java.JSONArray clientQueuedEvents = com.ibm.json.java.JSONArray.parse(WebClientRuntime.decodeSafevalue(events));
			com.ibm.json.java.JSONObject currentEvent = (com.ibm.json.java.JSONObject)clientQueuedEvents.get(0);
			String selControl = (String)currentEvent.get("selectedcontrol");
			String selField = (String)currentEvent.get("selectedfield");
			if(selControl!=null && selControl.length()>0)
			{
				stringBuilder.append("working=false;setCommInput('selectedcontrol','").append(selControl).append("');working=true;");
			}
			if(selField!=null && selField.length()>0)
			{
				stringBuilder.append("working=false;setCommInput('selectedfield','").append(selField).append("');working=true;");
			}
	
		}
		stringBuilder.append("if(tpaeConfig.validationOn) {");
		stringBuilder.append("setButtonEnabled(saveButton,").append(((AppBean)jsApp.getAppBean()).hasModifications()).append(")};");
		
		String[] mxJSPostEvent = jsApp.getMXJSPostEvent();
		if(mxJSPostEvent != null) {
			stringBuilder.append("eval(").append(mxJSPostEvent[1]).append(")('").append(mxJSPostEvent[0]).append("');");
		}
		stringBuilder.append("]]>");
		stringBuilder.append("</deferredscript>");
	}
stringBuilder.append("</server_response>");
%>
<%=stringBuilder.toString()%>
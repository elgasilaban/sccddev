<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="psdi.server.MXServer"%>
<%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="org.w3c.dom.*"
%><%@page import="psdi.mbo.*"
%><%@page import="psdi.util.*"
%><%@page import="psdi.webclient.system.controller.*"
%><%@page import="psdi.webclient.system.beans.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.servlet.*"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.controls.*"
%><%@page import="psdi.webclient.components.*"
%><%@page import="java.util.*"
%><%@page import="java.io.*"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%@include file="constants.jsp"
%><%

	// designed to use ony 2-3 getProperty calls, but gets some basic variables required by almost all components
	// and setup some other simple variables
	/* BEGIN - very common use variables */
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	String controlType= control.getType();
	/* ASYNCH - BEGIN */
	String asyncExc = "";
	String replaceMethod = component.getProperty("replacemethod");
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	String finalScriptStart="<finalscript><![CDATA[";
	String finalScriptEnd="]]></finalscript>";
	boolean async = component.isAsyncEnabled();
	String exceptionClass = "";
	String excImageClass = "";
	String asynchExc = "";
	String asynch = "async='0'";
	String componentValue = null;
	boolean appendContent = false;
	/* ASYNCH - END */
	PageInstance currentPage = control.getPage();
	String componentEvents = "";
	WebClientSession wcs = control.getWebClientSession();
	String UAGENT = wcs.getUserAgentName();
	String USERAGENT = wcs.getUserAgentReplacement();
	WebClientEvent originalEvent = wcs.getOriginalEvent();
	WebClientEvent currentEvent = wcs.getCurrentEvent();
	AppInstance app = currentPage.getAppInstance();
	String tabindex = "0";
	String id = component.getRenderId();
	String realId = component.getId();
	String automationId ="";
	String holderId=component.getProperty("holderid");
	boolean showallcontrols = false;
	String dojoDirectory = WebClientRuntime.getDojoDirectory(request);
	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	psdi.server.MXServer mxserv = (MXServer)s.getMXServerRemote();
	String langcode = s.getUserInfo().getLangCode();
	String defaultAlign;
	String reverseAlign;
	boolean rtl;
	{
		Alignment align = wcs.getAlignment();
		defaultAlign = align.begin;
		reverseAlign = align.end;
		rtl = align.rtl;
	}
	boolean automation = wcs.isAutomationOn();
	if(automation)
		automationId = "automationid=\"" + realId + "\"";
	boolean designmode = wcs.getDesignmode();
	boolean useAbbrRenderId = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabbrrenderid"));

	if(id.charAt(id.length() - 1) == ':')
	{
		id = id.substring(0, id.length()-1);
		int idx = id.indexOf(':');
		if(idx > 0)
			id = id.substring(idx + 1);
	}
	/* END - very common use variables */

	String servletBase = wcs.getMaximoRequestContextURL() + "/webclient";
	boolean stopReRender = false;
	final String BROWSER_KEYWORD = "#{BROWSER}";
	
	boolean ismobile = app.isMobile();
	boolean useAbsPath = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabsoluteimagepath"));

	String skin = wcs.getSkin();
	final String basePath = wcs.getWebClientURL();
	String IMAGE_PATH = wcs.getImageURL();
	String CSS_PATH = wcs.getCssURL();

	boolean debug = request.getParameter("debug") != null;
	int debuglevel = debug ? Integer.parseInt(request.getParameter("debug")) : 0;
	int debugTest = wcs.getDebugLevel();
	if(debugTest > 0)
	{
		debug = true;
		debuglevel = debugTest;
	}
	boolean accessibilityMode = wcs.getAccessibilityMode();
	String componentDisplay = "display:inline";
	boolean componentVisible = component.isVisible();
	if((!designmode && !componentVisible) || control.isHiddenByLicense())
	{
		if(component.needsRender())
			componentDisplay="display:none";
	}
	String refreshDisplay = Boolean.toString(componentVisible);
	String COMP_HOLDER_ID = id + "_compHolder";
	String textcss = component.getProperty("textcss");
	String cssclass = component.getCssClass();

	String asyncevents = component.getProperty("asyncevents");
	if(!WebClientRuntime.isNull(asyncevents))
	{
		if(async)
			asyncevents = "ae=\"" + asyncevents + "\"";
		else
			asyncevents = "";
	}

	%><%@include file="componentdesign.jsp"%><%

	//used to close the script and open the placeholder div for default rendered components
	boolean defaultRender = component.isDefaultRender();
	String compType = "";
	if(debuglevel > 0)
		compType = " comptype=\"" + component.getType() + "\"";
	if(defaultRender)
	{	
	%><%@ include file="componentholder_start.jsp" %><%
	}
	String cellText = control.getProperty("celltext");
	if(cellText.length() == 0)
		cellText = control.getParentInstance().getProperty("celltext");
	cssclass += " " + cellText;	%>
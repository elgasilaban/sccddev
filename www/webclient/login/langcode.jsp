<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="java.util.Locale"
%><%@page import="psdi.server.MXServer"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.util.MXSession"
%><%
	MXSession mxSession = WebClientRuntime.getMXSession(session);

	Locale locale = null;
	String langcode = null;
	if (mxSession.getUserInfo() != null)
	{
		langcode = mxSession.getUserInfo().getLangCode();
	}
	else
	{
		Object[] settings = WebClientRuntime.getLocaleFromRequest(request);
		if (settings[0] instanceof String)
		{
			langcode = (String)settings[0];
		}

		if (settings[1] instanceof Locale)
		{
			locale = (Locale)settings[1];
		}
	}
	if (langcode == null)
	{
		langcode = MXServer.getMXServer().getBaseLang();
	}
%>
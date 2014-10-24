<%--
* Licensed Materials - Property of IBM
*
* 5724-U18
* (C) COPYRIGHT IBM CORP. 2006,2012 All Rights Reserved.
*
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.runtime.AppDescriptor"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%@include file="xmlFormat.jsp"
%><%
	String appId = request.getParameter("appId");
	if(appId != null && !appId.isEmpty())
	{
		WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();

		response.setContentType("text/plain");
		if(appId.equalsIgnoreCase("library") || appId.equalsIgnoreCase("menus")
				|| appId.equalsIgnoreCase("lookups") || appId.equalsIgnoreCase("replibrary"))
		{
			%>Libraries, menus, and lookups don't have an entity resource model.<%
		}
		else
		{
			AppDescriptor descriptor = wcr.getAppDescriptor(appId.toLowerCase(), getWebClientSession(session, request));
			%><%=xmlFormat(descriptor.getEntityRelationshipModel().generateERMXML().toString())%><%
		}
	}
	else
	{
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		%>No appId specified<%
	}
%>

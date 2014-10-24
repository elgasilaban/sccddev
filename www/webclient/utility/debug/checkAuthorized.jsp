<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="java.util.List"
%><%@page import="java.util.Arrays"
%><%@page import="psdi.util.MXSession"
%><%@page import="psdi.mbo.MboSetRemote"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSessionManager"
%><%
{
	MXSession mxs = WebClientRuntime.getMXSession(session);
	if(mxs == null || mxs.getUserInfo() == null)
	{
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		%>You are not authorized to access this page.<%
		return;
	}
	String user = mxs.getUserInfo().getLoginID().toUpperCase();
	List authorizedUsers = Arrays.asList(WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DEBUG_CONSOLE_USERS, "").toUpperCase().split(","));
	if(!authorizedUsers.contains(user))
	{
		String authorizedGroup = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DEBUG_CONSOLE_GROUP, "");
		MboSetRemote groups = mxs.getMboSet("GROUPUSER");
		groups.setWhere("userid = '" + user + "' and groupname = '" + authorizedGroup.toUpperCase() + "'");
		groups.reset();
		if(groups.getMbo(0) == null)
		{
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			%>You are not authorized to access this page.<%
			return;
		}
	}
}
%>
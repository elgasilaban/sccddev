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
--%><%
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSessionManager"
%><%!
	WebClientSession getWebClientSession(HttpSession session, HttpServletRequest request) throws Exception
	{
		String uiSessionId = request.getParameter(WebClientSessionManager.UISESSIONID); 

		if(uiSessionId == null || uiSessionId.isEmpty())
		{
			throw new Exception("No session id specified");
		}

		WebClientSessionManager mgr = WebClientSessionManager.getWebClientSessionManager(session);
		if(mgr == null)
		{
			throw new Exception("Session manager not available");
		}

		boolean designerSession = false;
		if(uiSessionId.startsWith(WebClientSessionManager.DESIGN_MODE))
		{
			uiSessionId = uiSessionId.substring(WebClientSessionManager.DESIGN_MODE.length());
			designerSession = true;
		}

		WebClientSession wcs = mgr.getWebClientSession(uiSessionId);
		if(wcs == null)
		{
			throw new Exception("Invalid session: '" + uiSessionId + "'");
		}

		if(designerSession)
		{
			wcs = wcs.getDesignModeWebClientSession();
		}

		return wcs;
	}
%>
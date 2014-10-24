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
--%><%@page import="psdi.webclient.system.session.WebClientSessionManager"
%><%@page import="psdi.util.MXException"
%><%@page import="psdi.webclient.system.controller.MPFormData"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%
	request.getSession().setAttribute("importdata", null);

	if (MPFormData.isRequestMultipart(request))
	{
		try
		{
			MPFormData mpData = new MPFormData(request, 10); //Max 10MB
			String filecontent = mpData.getFileOutputStream().toString();
			if (filecontent != null && filecontent.length() > 0)
			{
				request.getSession().setAttribute("importdata", filecontent);
			}
		}
		catch(MXException ex)
		{
			ex.printStackTrace();
		}
	}
	WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	if (wcs == null)
	{
		response.sendRedirect(servletBase + "/ui?event=importapp");
	}
	else
	{
		response.sendRedirect(servletBase + "/ui?event=importapp&" + wcs.getUISessionUrlParameter() + wcs.getCSRFTokenParameter());
	}
%>
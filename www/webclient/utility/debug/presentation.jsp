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
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="java.io.ByteArrayOutputStream"
%><%@page import="java.io.PrintWriter"
%><%@page import="java.io.StringWriter"
%><%@page import="java.io.StringReader"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.MPFormData"
%><%@page import="psdi.webclient.system.controller.PresentationLoader"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.util.MXException"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%@include file="xmlFormat.jsp"
%><%
	PresentationLoader loader = new PresentationLoader();
	WebClientSession wcs = getWebClientSession(session, request);

	if(Boolean.parseBoolean(request.getParameter("import")))
	{
		if (MPFormData.isRequestMultipart(request))
		{
			MPFormData mpData = new MPFormData(request, 10); //Max 10MB

			JSONArray array = new JSONArray();
			JSONObject json = new JSONObject();
			array.add(json);

			ByteArrayOutputStream bytes = mpData.getFileOutputStream();
			if (bytes == null)
			{
				json.put("error", "No file given");
			}
			else
			{
				String xml = bytes.toString();
				if (xml == null || xml.isEmpty())
				{
					json.put("error", "File was empty");
				}
				else
				{
					try
					{
						loader.importApp(wcs, xml);
						json.put("name", loader.getAppID());
					}
					catch(MXException ex)
					{
						json.put("error", ex.getMessage());
					}
				}
			}
			%><%=array.serialize()%><%
		}
	}
	else
	{
		String appId = request.getParameter("appId");
		if(appId != null && !appId.isEmpty())
		{
			StringWriter writer = new StringWriter();
			String type = request.getParameter("format");
			if(type != null && type.equals("sql"))
			{
				loader.exportSQL(wcs, appId, new PrintWriter(writer));

				if(Boolean.parseBoolean(request.getParameter("download")))
				{
					response.addHeader("Content-Disposition", "attachment; filename=" + appId.toLowerCase() + ".ora");
				}
			}
			else
			{
				String xml = null;

				if(wcs.hasDesignModeWebClientSession())
				{
					AppInstance currentApp = wcs.getDesignModeWebClientSession().getCurrentApp();
					if(currentApp != null && currentApp.getId().equalsIgnoreCase(appId))
					{
						xml = loader.getXMLString(wcs, currentApp);
					}
				}

				if(xml == null)
				{
					xml = WebClientRuntime.getWebClientRuntime().getAppXML(appId);
					if(xml == null)
					{
						xml = loader.exportXML(wcs, appId);
					}
				}

				if(Boolean.parseBoolean(request.getParameter("download")))
				{
					response.addHeader("Content-Disposition", "attachment; filename=" + appId.toLowerCase() + ".xml");
					writer.write(xml);
				}
				else
				{
					xmlFormat(xml, writer);
				}
			}
			response.setContentType("text/plain");
			%><%=writer.toString()%><%
		}
		else
		{
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			%>No appId specified<%
		}
	}
%>
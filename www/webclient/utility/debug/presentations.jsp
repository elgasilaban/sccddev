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
%><%@page import="java.io.PrintWriter"
%><%@page import="java.io.StringWriter"
%><%@page import="java.io.ByteArrayOutputStream"
%><%@page import="java.util.zip.ZipEntry"
%><%@page import="java.util.zip.ZipOutputStream"
%><%@page import="psdi.mbo.MboSetRemote"
%><%@page import="psdi.mbo.MboValueData"
%><%@page import="psdi.util.MXSession"
%><%@page import="psdi.webclient.system.controller.PresentationLoader"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%!
	private String getAppId(HttpServletRequest request)
	{
		String appId = request.getParameter("appId");
		if(appId != null && !appId.isEmpty())
		{
			return appId;
		}
		return null;
	}
%><%
	if (Boolean.parseBoolean(request.getParameter("unload")))
	{
		String appId = getAppId(request);
		if(appId == null)
		{
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			%>No appId specified<%
			return;
		}
		WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();

		if(appId.equalsIgnoreCase("library") || appId.equalsIgnoreCase("menus")
				|| appId.equalsIgnoreCase("lookups") || appId.equalsIgnoreCase("replibrary"))
		{
			
		}
		else
		{
			wcr.removeAppDescriptor(appId);
		}
	}
	else if (Boolean.parseBoolean(request.getParameter("uncacheXML")))
	{
		String appId = getAppId(request);
		if(appId == null)
		{
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			%>No appId specified<%
			return;
		}
		WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();

		if(appId.equalsIgnoreCase("library") || appId.equalsIgnoreCase("menus")
				|| appId.equalsIgnoreCase("lookups") || appId.equalsIgnoreCase("replibrary"))
		{
			
		}
		else
		{
			wcr.removeAppXML(appId.toLowerCase());
		}
	}
	else if(Boolean.parseBoolean(request.getParameter("download")))
	{
		String type = request.getParameter("format");
		boolean isXml = type == null || !type.equals("sql");

		response.addHeader("Content-Disposition", "attachment; filename=AllPresentation" + (isXml ? "Xmls" : "Sqls") + ".zip");

		ZipOutputStream zip = new ZipOutputStream(response.getOutputStream());
		MXSession mxs = (MXSession)session.getValue("MXSession");
		MboSetRemote mboset = mxs.getMboSet("maxpresentation");
		mboset.setOrderBy("app asc");
		mboset.reset();
		MboValueData[][] mvds = mboset.getMboValueData(0, 500, new String[] {"app"});
		PresentationLoader loader = new PresentationLoader();
		WebClientSession wcs = getWebClientSession(session, request);
		for (MboValueData[] mvd : mvds)
		{
			String app = mvd[0].getData();
			ZipEntry entry = new ZipEntry(app.toLowerCase() + (isXml ? ".xml" : ".ora"));
			zip.putNextEntry(entry);
			String data;
			if(isXml)
			{
				data = WebClientRuntime.getWebClientRuntime().getAppXML(app);
				if(data == null)
				{
					data = loader.exportXML(wcs, app);
				}
			}
			else
			{
				StringWriter writer = new StringWriter();
				loader.exportSQL(wcs, app, new PrintWriter(writer));
				data = writer.toString();
			}
			zip.write(data.getBytes());
			zip.closeEntry();
		}
		zip.close();
	}
	else
	{
		WebClientSession wcs = getWebClientSession(session, request);

		JSONArray items = new JSONArray();

		String appBeingDesigned = null;
		if(wcs.hasDesignModeWebClientSession())
		{
			appBeingDesigned = wcs.getDesignModeWebClientSession().getCurrentAppId().toUpperCase();
		}

		MXSession mxs = (MXSession)session.getValue("MXSession");
		MboSetRemote mboset = mxs.getMboSet("maxpresentation");
		mboset.setOrderBy("app asc");
		mboset.reset();
		MboValueData[][] mvds = mboset.getMboValueData(0, 500, new String[] {"app"});
		for (MboValueData[] mvd : mvds)
		{
			JSONObject item = new JSONObject();
			String app = mvd[0].getData();
			item.put("id", app);
			if(WebClientRuntime.getWebClientRuntime().getAppXML(app.toLowerCase()) != null)
			{
				item.put("cached", true);
			}
			if(appBeingDesigned != null && appBeingDesigned.equals(app))
			{
				item.put("editing", true);
			}
			items.add(item);
		}

		JSONObject json = new JSONObject();
		json.put("identifier", "id");
		json.put("items", items);
		%><%=json.serialize()%><%
	}
%>
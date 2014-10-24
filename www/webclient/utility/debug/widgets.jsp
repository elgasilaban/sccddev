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
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.util.Date"
%><%@page import="java.util.List"
%><%@page import="java.util.Stack"
%><%@page import="java.util.zip.ZipEntry"
%><%@page import="java.util.zip.ZipOutputStream"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%@include file="encodeProperties.jsp"
%><%!
JSONObject encodeInstance(BaseInstance instance, String id, boolean includeProperties)
{
	JSONObject json = new JSONObject();

	json.put("label", instance.getId() + " (" + instance.getDescriptor().getName() + ")");
	if(instance instanceof ComponentInstance)
	{
		json.put("type", "component");
	}
	else if(instance instanceof PageInstance)
	{
		json.put("type", "page");
	}
	else
	{
		json.put("type", "control");
	}
	json.put("id", id);
	//json.put("descriptor", instance.getDescriptor().getName());
	json.put("widgetId", instance.getId());
	
	if(includeProperties)
	{
		json.put("properties", encodeProperties(instance));
	}

	JSONArray jsonChildren = new JSONArray();
	int count = 0;

	List<BaseInstance> children = instance.getChildren();
	for(BaseInstance child: children)
	{
		jsonChildren.add(encodeInstance(child, id + '.' + count++, includeProperties));
	}

	if(instance instanceof ControlInstance)
	{
		List<ComponentInstance> components = ((ControlInstance)instance).getComponents();
		for(ComponentInstance child: components)
		{
			jsonChildren.add(encodeInstance(child, id + '.' + count++, includeProperties));
		}
	}

	if(jsonChildren.size() > 0)
	{
		json.put("children", jsonChildren);
	}

	return json;
}
%><%
	WebClientSession wcs = getWebClientSession(session, request);
	AppInstance app = wcs.getCurrentApp();

	JSONObject widgetsJson = new JSONObject();
	widgetsJson.put("identifier", "id");
	widgetsJson.put("label", "label");

	JSONArray items = new JSONArray();

	JSONObject appObj = new JSONObject();
	appObj.put("label", app.getId() + " (app)");
	appObj.put("id", 0);
	appObj.put("type", "app");

	boolean snapshot = Boolean.parseBoolean(request.getParameter("snapshot"));

	Stack<PageInstance> pages = app.getPageStack();
	PageInstance currentPage = app.getCurrentPage();
	JSONArray children = new JSONArray(pages.size());
	int count = 0;
	for(PageInstance pageInstance: pages)
	{
		JSONObject pageJSON = encodeInstance(pageInstance, "0." + count++, snapshot);
		if(currentPage == pageInstance)
		{
			pageJSON.put("currentPage", true);
			pageJSON.put("label", pageJSON.get("label") + " <- Current");
		}
		children.add(pageJSON);
	}

	appObj.put("children", children);

	items.add(appObj);

	widgetsJson.put("items", items);

	if(snapshot) {
		response.addHeader("Content-Disposition", "attachment; filename=WidgetSnapshot-" + new SimpleDateFormat("yyyyMMdd-kkmm").format(new Date()) + ".zip");
		ZipOutputStream zip = new ZipOutputStream(response.getOutputStream());
		zip.putNextEntry(new ZipEntry("WidgetSnapshot.json"));
		zip.write(widgetsJson.serialize(true).getBytes());
		zip.closeEntry();
		zip.close();
	}
	else
	{
		%><%=widgetsJson.serialize()%><%
	}
%>

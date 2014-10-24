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
%><%@page import="psdi.webclient.system.serviceability.Category"
%><%@page import="psdi.webclient.system.serviceability.Log"
%><%@page import="psdi.webclient.system.serviceability.LogEntry"
%><%@page import="psdi.webclient.system.serviceability.Level"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="java.util.Collection"
%><%@include file="checkAuthorized.jsp"
%><%@include file="logEntry.jsp"
%><%@include file="session.jsp"
%><%!
private void encodeCategories(JSONArray array, Category category, Log logger)
{
	JSONObject json = new JSONObject();

	json.put("id", array.size());
	if(category.name == null)
	{
		json.put("path", "Default");
	}
	else
	{
		json.put("path", category.toString());
	}
	json.put("path", category.toString());
	Level level = logger.getLevel(category);
	if(level == null)
	{
		json.put("level", "inherited");
	}
	else
	{
		json.put("level", level.toString());
	}

	array.add(json);

	Collection<Category> children = category.subCategories();
	for(Category child: children)
	{
		encodeCategories(array, child, logger);
	}
}
%><%
	WebClientSession wcs = getWebClientSession(session, request);
	Log logger = wcs.serviceability.logger;

	String action = request.getParameter("action");
	if(action != null)
	{
		if(action.equals("clear"))
		{
			logger.clear();
		}
		else if(action.equals("getSettings"))
		{
			JSONObject json = new JSONObject();
			json.put("limit", logger.getLimit());
			%><%=json.serialize()%><%
		}
		else if(action.equals("getCategories"))
		{
			JSONObject json = new JSONObject();
			JSONArray items = new JSONArray();
			encodeCategories(items, Category.ROOT, logger);
			json.put("identifier", "id");
			json.put("items", items);
			%><%=json.serialize()%><%
		}
		else if(action.equals("set"))
		{
			String attr = request.getParameter("attr");
			String value = request.getParameter("value");

			if(attr.equals("limit"))
			{
				logger.setLimit(Integer.parseInt(value));
				%><%=logger.getLimit()%><%
			}
			else if(attr.equals("level"))
			{
				String categoryName = request.getParameter("category");
				Category category;
				if(categoryName != null) {
					category = Category.byName(categoryName);
					if(category == null) {
						response.setStatus(response.SC_BAD_REQUEST);
						%>Unrecognized category '<%=categoryName%>'<%
						return;
					}
				} else {
					category = Category.ROOT;
				}
				if(value.equals("inherited")) {
					logger.clearLevel(category);
				} else {
					logger.setLevel(category, Level.valueOf(value));
				}
				%><%=logger.getLevel(category)%><%
			}
			else
			{
				response.setStatus(response.SC_BAD_REQUEST);
				%>Unrecognized attr '<%=attr%>'<%
				return;
			}
		}
		return;
	}

	JSONObject json = new JSONObject();
	json.put("identifier", "id");
	json.put("items", encodeLogEntries(logger.getEntries(), "id", ""));

%><%=json.serialize()%>
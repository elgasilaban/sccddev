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
--%><%@page import="java.util.Map.Entry"%>
<%
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.serviceability.Events"
%><%@page import="psdi.webclient.system.serviceability.EventEntry"
%><%@page import="psdi.webclient.system.serviceability.HandledByEntry"
%><%@page import="psdi.webclient.system.serviceability.LogEntry"
%><%@page import="psdi.webclient.system.serviceability.Requests"
%><%@page import="psdi.webclient.system.serviceability.RequestEntry"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.text.DateFormat"
%><%@page import="java.util.Enumeration"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="logEntry.jsp"
%><%@include file="session.jsp"
%><%!
JSONObject encodeParameters(RequestEntry entry, String subId)
{
	JSONObject item = new JSONObject();
	item.put("id", subId);
	item.put("nodeType", "parameters");

	JSONArray parameters = new JSONArray();
	int count = 0;
	for(Entry<String, String[]> parameter: entry.parameters.entrySet())
	{	
		JSONObject parameterJson = new JSONObject();
		parameterJson.put("id", subId + count++);
		parameterJson.put("name", parameter.getKey());
		parameterJson.put("value", parameter.getValue()[0]);
		parameterJson.put("nodeType", "parameter");
		parameters.add(parameterJson);
	}
	item.put("children", parameters);
	return item;
}

JSONObject encodeAttributes(RequestEntry entry, String subId)
{
	JSONObject item = new JSONObject();
	item.put("id", subId);
	item.put("nodeType", "attributes");

	JSONArray attributes = new JSONArray();
	int count = 0;
	for(Entry<String, Object> attribute: entry.attributes.entrySet())
	{	
		JSONObject attributeJson = new JSONObject();
		attributeJson.put("id", subId + count++);
		attributeJson.put("name", attribute.getKey());
		attributeJson.put("value", String.valueOf(attribute.getValue()));
		attributeJson.put("nodeType", "attribute");
		attributes.add(attributeJson);
	}
	item.put("children", attributes);
	return item;
}

JSONObject encodeHeaders(RequestEntry entry, String subId)
{
	JSONObject item = new JSONObject();
	item.put("id", subId);
	item.put("nodeType", "headers");

	JSONArray headers = new JSONArray();
	int count = 0;
	for(Entry<String, String[]> header: entry.headers.entrySet())
	{	
		JSONObject headerJson = new JSONObject();
		headerJson.put("id", subId + count++);
		headerJson.put("name", header.getKey());
		headerJson.put("value", header.getValue()[0]);
		headerJson.put("nodeType", "header");
		headers.add(headerJson);
	}
	item.put("children", headers);
	return item;
}

JSONObject encodeRequest(RequestEntry entry, String id)
{
	JSONObject json = new JSONObject();

	json.put("id", id);
	json.put("nodeType", "request");
	json.put("timestamp", encodeDate(entry.getTimestamp()));
	json.put("url", entry.requestURL);
	json.put("contentType", entry.contentType);
	json.put("contentLength", entry.contentLength);

	JSONArray children = new JSONArray();

	children.add(encodeHeaders(entry, id + ".h"));
	children.add(encodeParameters(entry, id + ".p"));
	children.add(encodeAttributes(entry, id + ".a"));

	String subId = id + ".e";
	JSONObject item = new JSONObject();
	item.put("children", encodeEventEntries(entry.getEvents(), "id", subId));
	item.put("id", subId);
	item.put("nodeType", "events");
	children.add(item);
	
	json.put("children", children);

	return json;
}

JSONArray encodeHandledByEntries(HandledByEntry[] entries, String id, String idBase)
{
	JSONArray jsonChildren = new JSONArray();
	int i = 0;
	for(HandledByEntry childEntry: entries)
	{
		JSONObject childJson = new JSONObject();
		childJson.put(id, idBase + i++);
		childJson.put("timestamp", encodeDate(childEntry.getTimestamp()));
		childJson.put("className", childEntry.getHandlerClass().getName());
		childJson.put("instanceId", childEntry.instanceId);
		childJson.put("nodeType", "handledByEntry");
		jsonChildren.add(childJson);
	}
	return jsonChildren;
}

JSONArray encodeEventEntries(Events events, String id, String idBase)
{
	JSONArray items = new JSONArray();
	if(events != null)
	{
		int i = 0;
		for(EventEntry entry: events.getEvents())
		{
			items.add(encodeEvent(entry, idBase + i++));
		}
	}
	return items;
}

JSONObject encodeEvent(EventEntry entry, String id)
{
	JSONObject json = new JSONObject();

	json.put("id", id);
	json.put("nodeType", "event");
	json.put("timestamp", encodeDate(entry.getTimestamp()));
	json.put("type", entry.event.getType());// + '@' + Integer.toHexString(entry.event.hashCode()));
//	json.put("source", entry.event.getSourceControlInstance().getId());
//	json.put("source", entry.event.getSourceComponentInstance().getId());
	json.put("target", entry.event.getTargetId());
	json.put("value", entry.event.getValueString());
	json.put("requestEvent", entry.isRequestEvent());

	JSONArray children = new JSONArray();
	int count = 0;
	for(EventEntry childEntry: entry.getEvents())
	{
		children.add(encodeEvent(childEntry, id + "." + count++));
	}

	LogEntry[] logEntries = entry.getLogs();
	if(logEntries.length > 0)
	{
		JSONObject item = new JSONObject();
		String subId = id + ".l";
		item.put("children", encodeLogEntries(logEntries, "id", subId));
		item.put("id", subId);
		item.put("nodeType", "logEntries");
		children.add(item);
	}

	HandledByEntry[] handledBy = entry.getHandledBy();
	if(handledBy != null && handledBy.length > 0)
	{
		JSONObject item = new JSONObject();
		String subId = id + ".h";
		item.put("id", subId);
		item.put("nodeType", "handledByEntries");
		item.put("children", encodeHandledByEntries(handledBy, "id", subId));
		children.add(item);
	}

	if(children.size() > 0)
	{
		json.put("children", children);
	}

	return json;
}
%><%
	WebClientSession wcs = getWebClientSession(session, request);
	Requests requests = wcs.serviceability.requests;

	String action = request.getParameter("action");
	if(action != null)
	{
		if(action.equals("clear"))
		{
			requests.clear();
		}
		else if(action.equals("getSettings"))
		{
			JSONObject json = new JSONObject();
			json.put("limit", requests.getLimit());
			json.put("enabled", requests.isEnabled());
			%><%=json.serialize()%><%
		}
		else if(action.equals("set"))
		{
			String attr = request.getParameter("attr");
			String value = request.getParameter("value");

			if(attr.equals("limit"))
			{
				requests.setLimit(Integer.parseInt(value));
			}
			else if(attr.equals("enabled"))
			{
				requests.setEnabled(Boolean.parseBoolean(value));
			}
			else
			{
				response.setStatus(response.SC_INTERNAL_SERVER_ERROR);
				%>Unrecognized attr '<%=attr%>'<%
			}
		}
		return;
	}

	JSONArray items = new JSONArray();
	int i = 0;
	for(RequestEntry entry: requests.getRequests())
	{
		items.add(encodeRequest(entry, Integer.toString(i++)));
	}

	JSONObject json = new JSONObject();
	json.put("identifier", "id");
	json.put("label", "timestamp");
	json.put("items", items);

%><%=json.serialize()%>
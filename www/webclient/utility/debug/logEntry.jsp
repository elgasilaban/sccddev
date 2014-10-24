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
%><%@page import="psdi.webclient.system.serviceability.LogEntry"
%><%@page import="java.io.PrintWriter"
%><%@page import="java.io.StringWriter"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.text.DateFormat"
%><%@page import="java.util.Date"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%!
	private static JSONObject encodeDate(String iso8601String)
	{
		JSONObject item = new JSONObject();
		item.put("_value", iso8601String);
		item.put("_type", "Date");
		return item;
	}

	private static JSONArray encodeLogEntries(LogEntry[] entries, String id, String idBase)
	{
		JSONArray items = new JSONArray();
		for(int i = 0; i < entries.length; i++)
		{
			JSONObject item = encodeLogEntry(entries[i]);
			item.put(id, idBase + (i + 1));
			items.add(item);
		}
		return items;
	}

	private static JSONObject encodeLogEntry(LogEntry entry)
	{
		JSONObject item = new JSONObject();
		item.put("timestamp", encodeDate(entry.getTimestamp()));
		item.put("message", entry.getMessage());
		item.put("category", entry.category.toString());
		item.put("level", entry.level.toString());
		item.put("source", entry.loggedAt);
		item.put("detail", entry.getDetail());
		item.put("nodeType", "logEntry");
		return item;
	}
%>
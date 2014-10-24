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
%><%@page import="psdi.webclient.system.controller.LabelCache"
%><%@page import="psdi.webclient.system.controller.LabelCacheMgr"
%><%@page import="psdi.webclient.system.controller.LocaleString"
%><%@page import="java.util.Map.Entry"
%><%@page import="java.util.Iterator"
%><%@page import="java.io.PrintWriter"
%><%@page import="java.io.StringWriter"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%
	WebClientSession wcs = getWebClientSession(session, request);

	JSONArray items = new JSONArray();

	String appId = wcs.getCurrentAppId();

	LabelCache cache = LabelCacheMgr.getAppLabelCache(appId, wcs);
	int idx = 0;
	for(Entry entry : cache.entrySet())
	{
		idx ++;
		JSONObject item = new JSONObject();
		String keyParts[] = ((String)entry.getKey()).split("\\|");
		String id = keyParts[0];
		String property = keyParts[1];
		item.put("idx", idx);
		item.put("id", id);
		item.put("property", property);
		Object val = entry.getValue();
		if (val instanceof String)
		{
			item.put("value", (String)entry.getValue());
		}
		else
		{
			item.put("value", ((LocaleString)entry.getValue()).getValue());
		}
		items.add(item);
	}

	JSONObject json = new JSONObject();
	json.put("identifier", "idx");
	json.put("items", items);

%><%=json.serialize()%>
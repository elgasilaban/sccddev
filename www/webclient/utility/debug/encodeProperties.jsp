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
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.runtime.BaseDescriptor"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="java.util.Arrays"
%><%@page import="java.util.Set"
%><%@page import="java.util.HashSet"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%!
JSONArray encodeProperties(BaseInstance instance)
{
	Set<String> propertyNames = new HashSet<String>();

	propertyNames.addAll(Arrays.asList(instance.getPropertyNames()));

	if(instance instanceof ControlInstance)
	{
		ControlInstance propertyOriginator = ((ControlInstance)instance).getPropertyOriginator();
		if(propertyOriginator != null)
		{
			propertyNames.addAll(propertyOriginator.getDescriptor().getProperties().keySet());
		}
	}

	BaseDescriptor descriptor = instance.getDescriptor();
	propertyNames.addAll(descriptor.getProperties().keySet());

	JSONArray items = new JSONArray();
	for(String propertyName: propertyNames)
	{
		JSONObject json = new JSONObject();
		json.put("property", propertyName);
		json.put("value", instance.getProperty(propertyName));
		items.add(json);
	}
	return items;
}
%>
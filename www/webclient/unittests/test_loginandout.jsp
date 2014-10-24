<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%--
*********************************************************************************************************

This page logs out a user from the MAXIMO. This can be customized for any further calls for LDAP

*********************************************************************************************************
--%><%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" import="java.util.Locale, psdi.util.*, psdi.webclient.system.session.*, psdi.webclient.system.runtime.*, psdi.webclient.system.websession.*" %><%
String invalidate = request.getParameter("invalidate");
if(invalidate != null && invalidate.equals("session"))
{
	session.invalidate();
	return;
}

String clear = request.getParameter("clear");
if(clear != null)
{
	if(clear.equals("all"))
	{
		java.util.Enumeration<String> attributeNames = session.getAttributeNames();

		while(attributeNames.hasMoreElements())
		{
			session.removeAttribute(attributeNames.nextElement());
		}
	}
	else
	{
		session.removeAttribute(clear);
	}
}

clear = request.getParameter("rclear");
if(clear != null)
{
	request.removeAttribute(clear);
}

if(request.getParameter("setredirecturl") != null)
{
	session.setAttribute("redirecturl", WebClientRuntime.getMaximoRequestContextURL(request) + "/redirecturl");
} 

if(request.getParameter("setsignoutfrom") != null)
{
	session.setAttribute("signoutfrom", WebClientRuntime.getMaximoRequestContextURL(request) + "/signoutfrom");
} 

if(request.getParameter("setsignoutmessage") != null)
{
	session.setAttribute("signoutmessage", "Signout message");
} 

if(request.getParameter("setformAuth") != null)
{
	session.setAttribute("formAuth", Boolean.TRUE);
} 

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<style type="text/css">
	body { font-family: Arial; font-size: 11px;}
	h4 { margin-top: 10px; margin-bottom: 5px; }
	</style>
</head>
<body>
<h4>Request parameters <a href="?">Clear</a></h4>
<table border="1" style="border-collapse: collapse;">
		<tr>
		<th>Name</th><th>Value</th>
		</tr>
<%
	java.util.Enumeration<String> parameterNames = request.getParameterNames();

	while(parameterNames.hasMoreElements())
	{	
		String attribute = parameterNames.nextElement();
		%>
		<tr>
		<td><%=attribute%></td><td><%=request.getParameter(attribute)%></td>
		</tr>
<%	}	%>
</table>
<h4>Request attributes</h4>
<table border="1" style="border-collapse: collapse;">
		<tr>
		<th>Name</th><th>Value</th>
		</tr>
<%
	java.util.Enumeration<String> attributeNames = request.getAttributeNames();

	while(attributeNames.hasMoreElements())
	{	
		String attribute = attributeNames.nextElement();
		%>
		<tr>
		<td><%=attribute%></td><td><%=session.getAttribute(attribute)%></td><td><a href="?rclear=<%=attribute%>">Clear</a></td>
		</tr>
<%	}	%>
</table>
<h4>Session</h4>
<a href="?invalidate=session">Invalidate</a><br />
<%=session%>
<h4>Session attributes</h4>
<table border="1" style="border-collapse: collapse;">
		<tr>
		<th>Name</th><th>Value</th><td><a href="?clear=all">Clear All</a></td>
		</tr>
<%
	attributeNames = session.getAttributeNames();

	while(attributeNames.hasMoreElements())
	{	
		String attribute = attributeNames.nextElement();
		%>
		<tr>
		<td><%=attribute%></td><td><%=session.getAttribute(attribute)%></td><td><a href="?clear=<%=attribute%>">Clear</a></td>
		</tr>
<%	}	%>
</table>

<h4>login.jsp</h4>
<a target="_blank" href="../login/login.jsp">None</a><br/>
<a target="_blank" href="../login/login.jsp?langcode=AR">Arabic</a><br/>
<a target="_blank" href="../login/login.jsp?langcode=CH">Chinese</a><br/>
<h4>loginerror.jsp</h4>
<a target="_blank" href="../login/loginerror.jsp">None</a><br/>
<a target="_blank" href="../login/loginerror.jsp?redirect=true">Redirect</a><br/>
<a target="_blank" href="../login/loginerror.jsp?unavailable=true">Unavailable</a> <small>This varies between Weblogic and WebSphere and hence should be tested in both</small><br/>
<a target="_blank" href="../login/loginerror.jsp?basic=true">Basic</a><br/>
<a target="_blank" href="../login/loginerror.jsp?unavailable=true&basic=true">Unavailable and Basic</a><br/>
<a target="_blank" href="../login/loginerror.jsp?langcode=AR">Arabic</a><br/>
<h4>logout.jsp</h4>
<%
	String[] attributes = new String[] {"redirecturl", "signoutfrom", "signoutmessage", "formAuth"};

	for(int i = 0; i < attributes.length; i++)
	{	%>
		<%=attributes[i]%>
		<%
		if(session.getAttribute(attributes[i]) != null)
		{	%>
			<input type="checkbox" checked="checked" onchange="document.location='?clear=<%=attributes[i]%>'"/>
	<%	}
		else
		{	%>
			<input type="checkbox" onchange="document.location='?set<%=attributes[i]%>=true'"/>
	<%	}
	}
%>
<br/>
<a target="_blank" href="../login/logout.jsp">None</a><br/>
<a target="_blank" href="../login/logout.jsp?unavailable=true">Unavailable</a> <small>This varies between Weblogic and WebSphere and hence should be tested in both</small><br/>
<a target="_blank" href="../login/logout.jsp?timeout=true">Timeout</a><br/>
<a target="_blank" href="../login/logout.jsp?unavailable=true&timeout=true">Unavailable and Timeout</a><br/>
<a target="_blank" href="../login/logout.jsp?langcode=AR">Arabic</a><br/>
<a target="_blank" href="../login/logout.jsp?langcode=AR&timeout=true">Arabic and Timeout</a><br/>
<h4>exit.jsp</h4>
<a target="_blank" href="../login/exit.jsp">None</a><br/>
<a target="_blank" href="../login/exit.jsp?logintimeout=1">Login Timeout</a><br/>
<a target="_blank" href="../login/exit.jsp?wcstimeout=true">WCS Timeout</a><br/>
<a target="_blank" href="../login/exit.jsp?wcstimeout=true&formAuth=true">WCS Timeout and formAuth</a><br/>
<a target="_blank" href="../login/exit.jsp?formAuth=true">formAuth</a><br/>
<a target="_blank" href="../login/exit.jsp?redirect=true">Redirect</a><br/>
<a target="_blank" href="../login/exit.jsp?langcode=AR">Arabic</a><br/>
<h4>timeoutwait.jsp</h4>
<a target="_blank" href="../login/timeoutwait.jsp">None</a><br/>
<a target="_blank" href="../login/timeoutwait.jsp?langcode=AR">Arabic</a><br/>
<h4>connection.jsp</h4>
<a target="_blank" href="../login/connection.jsp">None</a><br/>
<a target="_blank" href="../login/connection.jsp?langcode=AR">Arabic</a><br/>
</body>
</html>
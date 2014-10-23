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
--%><%@ page contentType="text/html;charset=UTF-8" import="psdi.webclient.system.runtime.WebClientRuntime"%><%
%><%@include file="langcode.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<title><%=WebClientRuntime.getMXSession(session).getMessage("fusion", "Working")%></title>
</head>
<body>
	<div style="margin:auto;width:100px;" role="main">
		<img alt="<%=WebClientRuntime.getMXSession(session).getMessage("fusion", "Working")%>" src="../images/progressbar.gif" />
	</div>
</body>
</html>
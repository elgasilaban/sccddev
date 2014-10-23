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
--%><%@ page contentType="text/html;charset=UTF-8" import="psdi.webclient.system.runtime.WebClientRuntime,java.net.URL"%><%
%><%@include file="langcode.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<title><%=WebClientRuntime.getMXSession(session).getMessage("fusion", "Working")%></title>
	<script language="JavaScript" type="text/javascript">
		parent.document.location="<%=new URL(new URL(WebClientRuntime.getMaximoRequestURL(request)), request.getContextPath() + "/ui/login")%>";
	</script>	
</head>
<body>
	<div style="margin:auto;width:100px;" role="main">
		<img alt="<%=WebClientRuntime.getMXSession(session).getMessage("fusion", "Working")%>" src="../images/progressbar.gif" />
	</div>
</body>
</html>
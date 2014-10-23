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
--%><%@ page
	import="com.ibm.tivoli.imi.controller.FrontController"
	contentType="text/xhtml;charset=UTF-8"
%><%
	response.setContentType("text/html;charset=UTF-8");
	FrontController.handleRequest(request, response);
%>
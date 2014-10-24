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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "org.w3c.dom.*, java.util.*, java.io.*" %>
<%
String params="?";
Enumeration e=request.getParameterNames();
while (e.hasMoreElements())
{
    String key=(String) e.nextElement();
    params+=key + "=" + request.getParameter(key) + "&";
}
String reposturl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"/ui/" + params;
%>
<script type="text/javascript">
parent.document.location="<%=reposturl%>"
</script>
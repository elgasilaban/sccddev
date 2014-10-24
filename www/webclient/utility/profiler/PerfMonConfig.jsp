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

<%@ page language="java" buffer="8kb" autoFlush="true" isThreadSafe="true" isErrorPage="false"  %>
<%@ page import="psdi.server.*, psdi.webclient.system.filter.*" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="PerfMon.css">
<title>Maximo Activity Dashboard</title>
<script language="JavaScript">
<!--
    // Row highlighter
    var objClass

    function rollOnRow(obj, txt) {
        objClass = obj.className
        obj.className = "rowon";
        window.status = txt;
    }
    
    function rollOffRow(obj) {
        obj.className = objClass;
		window.status= "";
    }

// -->
</script>
</head>
<body>

<%



String sqlplan=PerfMonUtils.sqlPlan;
if (sqlplan != null && !sqlplan.equals(""))
{
	sqlplan ="checked";
}
else 
	sqlplan ="";

String traceplan=PerfMonUtils.logTracePlan;
if (traceplan != null && !traceplan.equals(""))
{
	traceplan ="checked";
}
else 
	traceplan ="";
	
String sqlTrackTime=PerfMonUtils.sqlTrackTime;

	
	
%>


<form name="perfmon" action="PerfMonConfig.jsp" method="post" onsubmit="window.close()">
<table border='0' cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td style='text-align:left;'><table class='layoutmain' border='0' cellpadding='2' cellspacing='2' bgcolor='#669999'>
    <tr>
    <th><input type="checkbox" name="mxe.db.logSQLPlan" <%=sqlplan%> >Track SQL Plan</th>
    <th><input type="checkbox" name="logTracePlan" <%=traceplan%>  >Process Stack Trace</th>
    <th><input name='logSQLTimeLimitThresHold' type='hidden' value='<%=sqlTrackTime%>'></th>
    <th><input name='save' type='submit' value='*** Save ***'></th>
    </tr>
</table>
<% PerfMonUtils.handleConfig(request); %>
</form>
</body>
</html>
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
<%@ page import=" java.util.*, psdi.server.*, psdi.webclient.system.filter.*" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <meta http-equiv="cache-control" content="no-cache">
 <meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<link rel="stylesheet" type="text/css" href="PerfMon.css">
<title>MAXIMO Performance Monitor</title>
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

String pattern=request.getParameter("Pattern");

if (pattern!=null)
	session.setAttribute("maximo.pattern", pattern);
else
	session.setAttribute("maximo.pattern", "");
	
	
%>


<form name="perfmon" action="PerfMon.jsp" method="post">
<table border='0' width='100%'>
<tr>
<td valign='middle'>
<img src="loginLogo_IBM.gif" /><span style='font-size:18.0pt'>Maximo Activity Dashboard </span><br>
<span style='font-size:11.0pt'>Request / Response  </span>
</td>
</tr>
</table>
<table border='0' cellpadding='0' cellspacing='0' width='800'>
<tr>
<td style='text-align:left;'>
  <table class='layoutmain' border='0' cellpadding='2' cellspacing='3' bgcolor='#3366CC' width='800'>
    <tr >
    <th><input name='Config' type='button' value='*** Configure Monitoring ***' onclick="JavaScript:window.open('PerfMonConfig.jsp','mywin','location=0,width=600,height=150,menubar=0,toolbar=0,resizable=0');void(0);"></th>    
    <th><a href="servermon.jsp"><font color=white>View Server Request</font></a></th>
    <th>&nbsp;</th>
    <th><input name='Refresh' type='submit' value='*** Refresh ***'></th>
    <th><input name='Enable' type='submit' value='Enable'></th>
    <th><input name='Disable' type='submit' value='Disable'></th>
    <th><input name='Reset' type='submit' value='Reset'></th>
    </tr>
</table></td>
<td><table border='0' width='100%'>
</table></td>
</tr>
</table>

<% PerfMonUtils.handleRequest(request); %>

<table border='0' cellpadding='0' cellspacing='0'>
<tr>
<td>
<table  border='1' cellpadding='3' cellspacing='3' rules='all' width='800'>
<tr class='headtextr' valign='top'>
<th>Monitor Label</a><br><img src='asc.gif'></th>
<th>Response Time</a><br></th>
<th>Hits </a><br></th>
<th>Avg ms.</a><br></th>
<th>Total ms.</a><br></th>
</tr>
<%
  //out.println(PerfmonResponseTracking.getPerfMonResponseData());
    LinkedHashMap  respData = PerfmonResponseTracking.getPerfMonResponseData();
    if (respData != null) 
    {	//out.println("---- there is a data " +respData);
		Set keys = respData.keySet();
		Iterator keysIterator = keys.iterator();	    		
		while ( keysIterator.hasNext() ) 
		{
			String name = (String) keysIterator.next();
			HashMap actualData = (HashMap) respData.get(name);
			if (actualData != null ) 
			{
				try
				{
					Integer numberOfHits = (Integer) actualData.get("numberOfHits");
					Integer responseTime = (Integer) actualData.get("responseTime");
					Integer totalTime = (Integer) actualData.get("totalTime");
					Integer avgTime = new Integer(totalTime.intValue() / numberOfHits.intValue() ); 
				
					out.println("<tr>");					
					out.println("<th width=300 align=left><font color='navy'><b>"+name+"</b></font></th>");
					out.println("<th>"+responseTime+"</th>");	
					out.println("<th>"+numberOfHits+"</th>");	
					out.println("<th>"+avgTime+"</th>");	
					out.println("<th>"+totalTime+"</th>");					
					out.println("</tr>");
				}
				catch (Exception e) 
				{}
				
			}				
			//out.println("---- response" +val);
		}
    }	
    //else 
    	//out.println("---- response" +respData);
		
%>
</table>




</form>
<br>
<table border='0' cellpadding='0' cellspacing='0' width='800'>
<tr>
<td style='text-align:left;'>
	<table class='layoutmain' border='1' cellpadding='3' cellspacing='3' rules='all' width='800'>
    <tr class='headtextr'>
    <th> &nbsp;
    </tr>
</table>
</body>
</html>
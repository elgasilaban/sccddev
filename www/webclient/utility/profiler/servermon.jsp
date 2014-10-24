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
<%@ page import="psdi.server.*, psdi.webclient.system.filter.*, java.util.*" %>
<html>
<head>
<title>MAXIMO Performance Monitor</title>
<link rel="stylesheet" type="text/css" href="PerfMon.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <meta http-equiv="cache-control" content="no-cache">
 <meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Expires" content="0">

</head>
<body>

<% PerfMonUtils.handleRequest(request); 

String stmtid = request.getParameter("statmentid");
String expandStatement = "1";
if (stmtid == null)
	stmtid = "-1";

String reqUrl = "PerfMon.jsp";
%>

<form action="servermon.jsp" method="post">
<table border='0' width='100%'>
<tr>
<td>
<img src="loginLogo_IBM.gif" /><span style='font-size:18.0pt'>Maximo Activity Dashboard </span>
<br>
<span style='font-size:11.0pt'> SQL / Explain Plan / Stack Trace </span>
</td>
</tr>
</table>
<table border='0' cellpadding='0' cellspacing='0' width='800'>
<tr>
<td style='text-align:left;'>
<table  border='0' cellpadding='2' cellspacing='3' bgcolor='#3366CC' width='800'>
    <tr>
    <th><input name='Config' type='button' value='*** Configure Monitoring ***' onclick="JavaScript:window.open('PerfMonConfig.jsp','mywin','location=0,width=600,height=150,menubar=0,toolbar=0,resizable=0');void(0);"></th>    
    <th align='left'>&nbsp;&nbsp;&nbsp;<a href="<%=reqUrl%>"><font color=white>View Web Request</font></a></th>
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

<table  border='1' cellpadding='3' cellspacing='3' rules='all' width='800'>
<tr class='headtextr' valign='top'>
<TH valign='top' width='300'>Transcation</TH>
<TH valign='top' width='500' align="left" >Details</TH>
<%
	  Iterator it = PerformanceStats.getList();
	  Object obj;
		 String sqlTraceAnch = "";
		 int viewSqlTraceAnch=0;
      while (it.hasNext())
      {
        obj = it.next();
        viewSqlTraceAnch++;
        sqlTraceAnch = obj+"sqltrace"+viewSqlTraceAnch;
        out.println ("<TR>");
        out.println("<TH class='headtextc' nowrap valign='top' width='300' align=left><font color='navy'><b>"+obj+"</font></TH>");
        out.println("<TD>");
        	out.println("<TABLE border=0>");
        		out.println("<TR>");
        			out.println("<TD nowrap><A NAME='"+sqlTraceAnch+"'></A><A href='servermon.jsp?expand="+obj+"&#"+sqlTraceAnch+"'># "+PerformanceStats.get(obj).getSQLCount()+" stmts</A></TD>");
        			out.println("<TD nowrap><B>MboSets:"+PerformanceStats.get(obj).getMboSetCount()+"</B> ");
        			out.println(PerformanceStats.get(obj).getMboSetString()+"</TD>");
        		out.println("</TR>");
        		out.println("<TR>");
        			out.println("<TD nowrap>Total SQLs time[<b>"+PerformanceStats.get(obj).getSQLTime()+"ms</b>]</TD>");
        			out.println("<TD nowrap><B>Mbos:"+PerformanceStats.get(obj).getMboCount()+"</B> ");
        			out.println(PerformanceStats.get(obj).getMboString()+"</TD>");
        		out.println("</TR>");
        		
        		// Loop to printout the sql if expanded
        		if (PerfMonUtils.isExpanded(session, obj.toString()))
        		{
        			 PerformanceStats p = PerformanceStats.get(obj);

					 Iterator slist = p.getSQLStatements();
					 Object stmt;
					 String displayStat = null;
					 String explainPlan = null;
					 String sqlTimeTimeColor ="green";
					 String distplayStatementColor = "black";
					 String stackTraceAnch = "";
				
					 int sqlTime =0;
					 int viewStackTraceAnch = 0;
				
					 int stmt_id = 0;
					 while (slist.hasNext())
					 {
						stmt = slist.next();
						displayStat = (String) stmt;
						sqlTime = Integer.parseInt(p.getStatementIndividualTime(stmt));
					 	 viewStackTraceAnch++;
						
						 stackTraceAnch = obj+"stacktrace"+viewStackTraceAnch;
						 

						if (sqlTime >= PerfMonUtils.sqlDisplayThresholdValue)
						{
							sqlTimeTimeColor ="red";
						}
						else 
							sqlTimeTimeColor ="green";
						
						
						if (displayStat.indexOf("Explain")>0)
						{
							explainPlan = "<br><font color=red><b>"+displayStat.substring(displayStat.indexOf("Explain"),displayStat.length())+"</b></font>";
							displayStat = displayStat.substring(0,displayStat.indexOf("Explain"));
						
						}
						else 
						{
							explainPlan = "";
						}
						
						distplayStatementColor = "black";
						
						if (displayStat.indexOf("applicationauth")> 0) 
							distplayStatementColor = "brown";
						else if (displayStat.indexOf("sigoption")> 0) 
							distplayStatementColor = "brown";
						else if (displayStat.indexOf("sigoptflag")> 0) 
							distplayStatementColor = "brown";
						else if (displayStat.indexOf("condition")> 0) 
							distplayStatementColor = "brown";
						
						out.println("<TR>");
							out.println("<TD nowrap><b># SQLs ("+p.getStatementCount(stmt)+")</b></TD>");
							out.println("<TD wrap> <font color="+sqlTimeTimeColor+"><b>["+sqlTime+" ms] </b></font><font color='"+distplayStatementColor+"'>"+displayStat+"</font>"+explainPlan+"</TD>");
						out.println("</TR>");
						if (PerfMonUtils.logTracePlan != null)
						{	
							out.println("<TR>");
							//out.println("<TD nowarp>&nbsp;</TD>");
							out.println("<TD nowrap><A NAME='"+stackTraceAnch+"'>&nbsp;</A></TD>"); 
							out.println("<TD nowrap valign=top align=right><A href='servermon.jsp?statmentid="+stmt_id+"&#"+stackTraceAnch+"'>VIEW STACK TRACE</A></TD>");
							out.println("</TR>");
							out.println("<TR>");
							out.println("<TD nowarp>&nbsp;</TD>");
							if (stmt_id == Integer.parseInt(stmtid) && expandStatement.equals("1"))
								out.println("<TD nowarp valign=top><font size=3 color=blue>"+p.display((String)stmt)+"</font></TD>");
							else 
								out.println("<TD nowarp>&nbsp;</TD>");
							
							out.println("</TR>");
						}
						stmt_id++;
					 }
        		}
        		
        	out.println("</TABLE>");
        out.println("</TD>");
        out.println("</TR>");	// End of the main row
      }

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
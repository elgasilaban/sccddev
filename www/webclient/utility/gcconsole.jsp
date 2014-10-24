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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "psdi.webclient.system.controller.*, java.util.*, psdi.mbo.*, psdi.util.*, java.io.*" %>
<%
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>
<%		
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	Date today = new Date();
%>
<%String defaultAlign="left";
	String reverseAlign="right";
	boolean rtl = false;
	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	String langcode = s.getUserInfo().getLangCode();
	if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE"))
	{
		defaultAlign="right";
		reverseAlign="left";
		rtl = true;
	}
	%>
<html>
<head>
<BASE HREF="<%= servletBase%>/webclient/utility">
<title>Garbage Collection Console</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<link rel="stylesheet" type="text/css" href="<%= servletBase%>/webclient/utility/performance.css">
<body style="margin:0px">
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>		
			<td colspan=5 align=center width="90%" class="bgnavbar">
				<font class=fontbig>Garbage Collection Data <%=today%> </font>
			</td>
			<td >
				<input type=button value="Refresh" onClick="javascript:window.location.reload();">
			</td>
		</tr>	
	 </table>
<div id="data" style="width:100%; height:90%; z-index:1; background-color:#ffffff; layer-background-color: #ffffff; border: 1px solid #c0c0c0; overflow:auto">		 		
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>
			<td nowrap  width="100%">&nbsp;</td>
			
	 	</tr>
	 	
	 	
	<%
	    try {          	    
		
			String gcfilepath = RequestHandler.getWebClientProperty("webclient.gcfilepath", null);
			BufferedReader fileReader = null;                
			if (gcfilepath !=null)
			{
		    	    fileReader = new BufferedReader(new FileReader(gcfilepath+"gc.log"));		
		    	}

		String gcLine = null;	
		while((gcLine = fileReader.readLine()) != null)
      		{
      			if (gcLine.indexOf("Full")>=0)
	      			out.println("<tr class=rowsky  ><td>");
	      		else 
	      			out.println("<tr class=rowwhite  ><td>");
	    		out.println("&nbsp;&nbsp;&nbsp;&nbsp;"+ gcLine);
	    		out.println("</td></tr>");	    	    			    		
	    	}
	    } catch (Exception e) {
	    	out.println("<tr class=rowwhite><td align=center>");
	      		out.println(" No Collections found  " );
	      	out.println("</td></tr>");
	    }
	    	 
	%>	
	
</table>
</div>
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<td>
			<tr>
				<td colspan=4 class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
				&nbsp;</td>
		 	</tr>					
		</td>
	</table>  
</body>
</html>
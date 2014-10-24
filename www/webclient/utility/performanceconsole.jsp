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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "psdi.webclient.system.beans.*, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.WebClientRuntime, psdi.webclient.system.session.WebClientSession, java.util.*, psdi.mbo.*, psdi.util.*, java.io.*" %>
<%
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>
<%
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<html>
<head>
	<BASE HREF="<%= servletBase%>/webclient/utility">
	<title>Performance Console</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<%
			WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
			WebClientSession wcs = wcr.getWebClientSession(request);
	if (wcs != null ) {
		AppInstance appInst = wcs.getCurrentApp();
		String appname = appInst.getAppTitle();	
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
<link rel="stylesheet" type="text/css" href="<%= servletBase%>/webclient/utility/performance.css">
<body style="margin:0px">
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>		
			<td colspan=4 align=center width="90%" class="bgnavbar">
				<font class=fontbig> Performance Data, <%= today%>
			</td>
			<td >
				<input type=button value="GC Collection" onClick="window.open('gcconsole.jsp','gc', 'toolbar=no,width=700,height=500,scrollbars=auto');">
			</td>
		</tr>	
	 </table>
<div id="data" style="width:100%; height:90%; z-index:1; background-color:#ffffff; layer-background-color: #ffffff; border: 1px solid #c0c0c0; overflow:auto">		 		
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>
			<td nowrap  width="1px">&nbsp;</td>
			<td class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
				Description
			</td>
			<td class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
				Action
			</td>
			<td class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
				Target
			</td>			
			
	 	</tr>					
	 	
	<%
	    try {          
		TreeMap appPerformanceData = new TreeMap();	
		appPerformanceData = (TreeMap) session.getAttribute("performancedata");
		if (appPerformanceData != null ) {
			Set keys = appPerformanceData.keySet();
	    		Iterator keysIterator = keys.iterator();	    		
	    		while ( keysIterator.hasNext() ) {
				String name = (String) keysIterator.next();
				if (name.indexOf("data") > 0 ) {
					String displayname = name.substring(name.indexOf("-")+1,name.length()-4);
					String event = displayname.substring(0,displayname.indexOf("-"));
					String target = displayname.substring(displayname.indexOf("-")+1,displayname.length());					
					if (name.indexOf("performance") <0) {
			%>	
			
					<tr class=rowwhite  >
						<td nowrap ><input type=button value="View Statistics" onClick= "javascript:window.open('performancedata.jsp?key=<%=name%>','<%=event%>data', 'toolbar=no,width=700,height=550,scrollbars=no')"></td>
						<td nowrap ><%=name.substring(0,name.length()-4)%></td>
						<td nowrap ><%=event%></td>						
						<td nowrap ><%=target%></td>						
											
					</tr>							
			<%
					}
				}				
				
	      	        }
	    	 }				
	    } catch (Exception e) {
	    
	      out.println("Exception happened in application"+e);
	    }
	    	 
	%>	
	
</table>
<% } else {
%>
	No Tracking is done 
<%}%>
</div>
	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>
			<td colspan=4 class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
			&nbsp;</td>
	 	</tr>					
	</td>
</body>
</html>
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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "psdi.webclient.system.beans.*, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.WebClientRuntime, psdi.webclient.system.session.WebClientSession, java.util.*, psdi.mbo.*, psdi.util.*, java.text.DecimalFormat, java.io.*" %>
<%
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
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
	<title>Performance Data</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<link rel="stylesheet" type="text/css" href="<%= servletBase%>/webclient/utility/performance.css">
<body style="margin:0px">
<%
       WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	AppInstance appInst = wcs.getCurrentApp();
	String appname = appInst.getAppTitle();		
	Date today = new Date();
	String key = request.getParameter("key");		
	if (key != null)
		key = key.substring(0,key.indexOf("data"));
	TreeMap appPerformanceData = new TreeMap();				
	TreeMap hmPerformanceData = new TreeMap();			
	TreeMap hmPerformanceDataNumber = new TreeMap();
	appPerformanceData = (TreeMap) session.getAttribute("performancedata");
	hmPerformanceData = (TreeMap) appPerformanceData.get(key+"data");
	hmPerformanceDataNumber = (TreeMap) appPerformanceData.get(key+"number");
	if (hmPerformanceData != null ) {
	int sValue=0;
%>

	<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1px" class="bgnavbar" control="true" align="center">
		<tr>
			<td colspan=4  align=center width="10%" class="bgnavbar">
				<font class=fontbig> Performance Data for Application - > <%=today%>					
				 <br><%=key%></font>
			</td>
		 </tr>		
	  <tr>
		<td align=center class="navbar"  width="20%">
			Ms.
		</td>
		<td align=center class="navbar"  width="20%">
			Sec. 
		</td>
		<td class="navbar" nowrap >
			Description 
		</td>
	 </tr>		
	 <tr class=rowsky>
	       <td align="center" nowrap>
		  <%
			try {
				sValue = Integer.parseInt( hmPerformanceData.get("09_REQUEST_DONE").toString());				
			  } catch (Exception e){
				sValue=0;
			  }				  	
		   %> 	
		 <%= sValue %> Ms.
		</td>
		
		<td  align="center" nowrap>
		  <%=  (double) sValue/1000 %> Sec.
		</td>
		<td >
			Total Request Processing Time 
		</td>
	</tr>
</table>
<div id="data" style="width:100%; height:78%; z-index:1; background-color:#ffffff; layer-background-color: #ffffff; border: 1px solid #c0c0c0; overflow:auto">	
<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="2" border="1px" class="bgnavbar" control="true" align="center">
		<tr class="bgnavbar">
			<td colspan=4>						  
				EVENTS PROCESSING TIME 
			</td>
		</tr>		
		<tr>
			<td  align=center width="10%" class="navbar" nowrap>
				# Times Called
			</td>
			<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
				Ms.
			</td>
			<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
				Sec. 
			</td>
			<td class="navbar" nowrap style="padding-<%=reverseAlign%>:11px">
				Description 
			</td>
		 </tr>
		 <%
	    Set keys = hmPerformanceData.keySet();
	    Iterator keysIterator = keys.iterator();
	    while ( keysIterator.hasNext() ) {
		String name = (String) keysIterator.next();

		int value = 0;
		int numberOfTimes = 0;
		
		if (!name.startsWith("REQUEST")) {
		    value = Integer.parseInt(hmPerformanceData.get(name).toString());
		    numberOfTimes = Integer.parseInt(hmPerformanceDataNumber.get(name).toString()); 
		 
		}
		String secondsDisplayStyle = "";
		double seconds = (double) value / 1000; 
		if (seconds > 0 ) 
			secondsDisplayStyle = "<font class=fontmaroon>"+seconds+"</font>";
		else 	
			secondsDisplayStyle = ""+seconds;
		
	      if (name.startsWith("AEVENTQUE")) {				        
	      		String displaynm = name.substring(name.indexOf("{"),name.length());
	      		%>				            
	      		<tr class=rowsky>
	      			<td  align="center" nowrap>	
	      			<%=numberOfTimes%>
	      			</td>
	      			<td align="center" nowrap>
	      			  <%= value %> Ms.	
	      			</td>
	      			<td align="center" nowrap>
	      			    <%= secondsDisplayStyle %> Sec.
	      			</td>
	      			<td nowrap >
	      			    <%=displaynm%> 
	      			</td>
	      		</tr>							
	      		<%				                				
		}
	    		    
	 }
       %>
       <tr class="bgnavbar">
       		<td colspan=4>						  
       			RENDER EVENTS PROCESSING TIME 
       		</td>
       	</tr>
       	<tr>
       		<td  align=center width="10%" class="navbar" nowrap>
       			# Times Called
       		</td>
       		<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
       			Ms.
       		</td>
       		<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
       			Sec. 
       		</td>
       		<td class="navbar" nowrap style="padding-<%=reverseAlign%>:11px">
       			Description 
       		</td>
       	 </tr>
        <%
       	    keys = hmPerformanceData.keySet();
       	    keysIterator = keys.iterator();
       	    while ( keysIterator.hasNext() ) {
       		String name = (String) keysIterator.next();
       		int value = 0;
       		int numberOfTimes = 0;
       		if (!name.startsWith("REQUEST")) {
       		    value = Integer.parseInt(hmPerformanceData.get(name).toString());
       		    numberOfTimes = Integer.parseInt(hmPerformanceDataNumber.get(name).toString()); 
       		 
       		}
       		String secondsDisplayStyle = "";
       		double seconds = (double) value / 1000; 
       		if (seconds > 0 ) 
       			secondsDisplayStyle = "<font class=fontmaroon>"+seconds+"</font>";
       		else 	
       			secondsDisplayStyle = ""+seconds;
       		if (name.startsWith("RENDER_EVENT")) {	
       		%>
       				<tr class=rowwhite>
				<td  align="center" nowrap>	
				<%=numberOfTimes%>
				</td>
				<td align="center" nowrap>
				  <%= value %> Ms.	
				</td>
				<td align="center" nowrap>
				    <%= secondsDisplayStyle %> Sec.
				</td>
				<%  
					String control = name.substring(name.indexOf("RENDER_EVENT")+12,name.length());
			    	 %>
			    	 <td nowrap >
				    <%=control%>
				</td>
			</tr>	
			<%
			      
       		}
			
       	}
%>   
 <tr class="bgnavbar">
       		<td colspan=4>						  
       			COMPONENT INCLUDES TIME
       		</td>
 </tr>
       	<tr>
       		<td  align=center width="10%" class="navbar" nowrap>
       			# Times Called
       		</td>
       		<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
       			Avg Sec Per Component. 
       		</td>
       		<td class="navbar" nowrap style="padding-<%=reverseAlign%>:11px">
       			Description 
       		</td>
       		<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
       			Comulitive Ms.
       		</td>
       		<td align=center class="navbar" align="<%=defaultAlign%>" width="20%">
       			Comulitive Sec.
       		</td>
       		
       	 </tr>
       	 <%
       	    keys = hmPerformanceData.keySet();
       	    keysIterator = keys.iterator();
       	     while ( keysIterator.hasNext() ) {
       	     	String name = (String) keysIterator.next();
       		int value = 0;
       		int numberOfTimes = 0;
       		if (!name.startsWith("REQUEST")) {
       		    value = Integer.parseInt(hmPerformanceData.get(name).toString());
       		    numberOfTimes = Integer.parseInt(hmPerformanceDataNumber.get(name).toString()); 
       		 
       		}
       		String secondsDisplayStyle = "";
       		String avgsecondsDisplayStyle = "";
       		double seconds = (double) value / 1000; 
       		double avgseconds = (double) (((double) value / numberOfTimes)/ 1000); 
       		if (seconds > 0 ) 
       			secondsDisplayStyle = "<font class=fontmaroon>"+seconds+"</font>";
       		else 	
       			secondsDisplayStyle = ""+seconds;
       		if (avgseconds > 0 ) 
       			avgsecondsDisplayStyle = "<font class=fontmaroon>"+avgseconds+"</font>";
       		else 	
       			avgsecondsDisplayStyle = ""+avgseconds;


       		if (name.startsWith("A_EVENT_CONTROL_TYPE")) 
       		{	
       			if (name.indexOf("page.jsp") != -1 ) 
       			{
       			%>				            
			<tr class=rowsky>
				<td  align="center" nowrap>	
				<%=numberOfTimes%>
				</td>
				<td align="center" nowrap>
				    <%= avgsecondsDisplayStyle %> Sec.
				</td>
				<%  
					String control = name.substring(name.indexOf("A_EVENT_CONTROL_TYPE")+20,name.length());
			    	 %>
				<td nowrap >
				    <%=control%> 
				</td>
				<td align="center" nowrap>
				  <%= value %> Ms.	
				</td>
				<td align="center" nowrap>
				    <%= secondsDisplayStyle %> Sec.
				</td>
				 
			</tr>		
			<%
			break;
       		}
       		}
       		
       	    }
    %>    
       	 <%
       	    keys = hmPerformanceData.keySet();
       	    keysIterator = keys.iterator();
       	     while ( keysIterator.hasNext() ) {
       	     	String name = (String) keysIterator.next();
       		int value = 0;
       		int numberOfTimes = 0;
       		if (!name.startsWith("REQUEST")) {
       		    value = Integer.parseInt(hmPerformanceData.get(name).toString());
       		    numberOfTimes = Integer.parseInt(hmPerformanceDataNumber.get(name).toString()); 
       		 
       		}
       		String secondsDisplayStyle = "";
       		String avgsecondsDisplayStyle = "";
       		double seconds = (double) value / 1000; 
       		
       		double avgseconds = (double) (((double) value / numberOfTimes)/ 1000); 
       		DecimalFormat nf = new DecimalFormat();
		       nf.setMaximumFractionDigits(3);
		       String savgseconds = nf.format(avgseconds);	
       		if (seconds > 0 ) 
       			secondsDisplayStyle = "<font class=fontmaroon>"+seconds+"</font>";
       		else 	
       			secondsDisplayStyle = ""+seconds;
       		if (avgseconds > 0 ) 
       			avgsecondsDisplayStyle = "<font class=fontmaroon>"+savgseconds+"</font>";
       		else 	
       			avgsecondsDisplayStyle = ""+savgseconds;
       		if (name.startsWith("A_EVENT_CONTROL_TYPE")) {	
       			if (name.indexOf("page.jsp") == -1 ) {
       			%>				            
			<tr class=rowwhite>
				<td  align="center" nowrap>	
				<%=numberOfTimes%>
				</td>
				<td align="center" nowrap>
				    <%= avgsecondsDisplayStyle %> Sec.
				</td>
				<%  
					String control = name.substring(name.indexOf("A_EVENT_CONTROL_TYPE")+20,name.length());
			    	 %>
				<td nowrap >
				    <%=control%> 
				</td>
				<td align="center" nowrap>
				  <%= value %> Ms.	
				</td>
				<td align="center" nowrap>
				    <%= secondsDisplayStyle %> Sec.
				</td>
				 
			</tr>		
			<%
       		}
       			}
       	    }
    %>    
</table>
</div>
<%
}
%>
<table width="100%" style="border: 1px solid black" borderColor="#c0c0c0" bordercolorlight='#8C8A87' bordercolordark='#FFFFFF' cellspacing="0" cellpadding="0" border="1" class="bgnavbar" control="true" align="center">
		<tr>
			<td colspan=4 class="bgnavbar" nowrap style="padding-<%=reverseAlign%>:10px">
			&nbsp;</td>
	 	</tr>					
	</table>
</body>
</html>
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
--%><%@ include file="../common/componentheader.jsp" %><%

		String codebase = "", datasrc = "";
		String messageGroup = "wfdesign";
		String archive = component.getProperty("archive");
		String code = component.getProperty("code");
		String width = component.getProperty("width");
		String height = component.getProperty("height");
		String nodedatasrc = component.getProperty("nodedatasrc");
		String actiondatasrc = component.getProperty("actiondatasrc");
		String classid = component.getProperty("classid");//, "8AD9C840-044E-11D1-B3E9-00805F499D93");
%>	
		<table aria-hidden="true" align="<%=defaultAlign%>" align="center" WIDTH="<%=width%>" HEIGHT="<%=height%>" control="true" controltype="wfcanvas" style="width:<%=width%>;height:<%=height%>;position:relative;top:-5000;" >
			<tr>
				<td align="<%=defaultAlign%>">
				<OBJECT class="wfcanvas"
						id="<%=id%>" NAME="<%=id%>" 
                        <%=automationId%>
						mxpart="applet" 
						classid = "clsid:<%=classid%>"
						codebase = "<%=codebase%>"
						WIDTH="100%" HEIGHT="100%" 
						ALIGN="baseline" 
						style="position:relative;" 
						datasrc="<%=datasrc%>" 
						onreadystatechange="refreshCanvas()" >
						<PARAM NAME="type" VALUE = "application/x-java-applet;jpi-version=1.4.1" >
						<PARAM NAME="CODE" 				VALUE=<%=code%> >
						<PARAM NAME="IMAGE_PATH" 		VALUE="<%=IMAGE_PATH%>">
						<PARAM NAME="ARCHIVE" 			VALUE="<%=archive%>" >
						<PARAM NAME=NAME 				VALUE="<%=id%>" >
						<PARAM NAME="scriptable" 		VALUE="true" >
						<PARAM NAME="mayscript" 		VALUE="true" >
						<PARAM NAME="nodedatasrc" 		VALUE="<%=nodedatasrc%>" >
						<PARAM NAME="actiondatasrc" 	VALUE="<%=actiondatasrc%>" >
						<SPAN STYLE="color:red">WorkFlow Canvas failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
						No Java 2 SDK, Standard Edition v 1.4.2 support for APPLET!!
				</OBJECT>
				</td>
			</tr>
		</table>

<%@ include file="../common/componentfooter.jsp" %>		
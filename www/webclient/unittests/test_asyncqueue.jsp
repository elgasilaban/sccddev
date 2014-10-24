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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" import= "java.util.*, psdi.util.*,psdi.mbo.*,psdi.webclient.controls.*,psdi.webclient.system.session.*,psdi.webclient.system.runtime.*,psdi.webclient.system.websession.*,psdi.webclient.system.controller.*, psdi.webclient.system.beans.*,psdi.server.*" %>
<% 
	
	psdi.util.MXSession sess = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);

	ComponentInstance component = (ComponentInstance)session.getAttribute("currentcomponent");
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String servletBase = wcs.getMaximoRequestContextURL()+"/webclient";
	String UAGENT = wcs.getUserAgentName();
	String USERAGENT=wcs.getUserAgentReplacement();
	PageInstance currentPage = control.getPage();
	AppInstance app = currentPage.getAppInstance();
	AppBean woAppBean = (AppBean)app.getAppBean();
	String asyncURL = wcs.getMaximoRequestContextURL()+"/ui/maximo";
	MboRemote mbo = null;

	woAppBean.insert();
	mbo = woAppBean.getMbo(); //Currently inserted MBO
	
	PageInstance pi = app.getCurrentPage();
	
	String cid = "";
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Expires" content="0">
		<title>Async Queue Unit Test</title>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/dojo/resources/dojo.css"/>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/dijit/themes/tundra/tundra.css"/>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/dojox/grid/resources/tundraGrid.css"/>
		<script type="text/javascript" src="<%=servletBase %>/javascript/dojo/dojo.js">
			var djConfig =
			{
				isDebug: false,
				parseOnLoad: false
			};
		</script>
 		<script type="text/javascript" src="<%=servletBase %>/javascript/dojo_library.js"></script>	 
 		<script type="text/javascript" src="<%=servletBase %>/javascript/constants.js"></script>	
 		<script type="text/javascript" src="<%=servletBase %>/javascript/browser_library.js"></script> 
 		<script type="text/javascript" src="<%=servletBase %>/javascript/unittests/unittest_library.js"></script> 		
	<script language="JavaScript">
	var ASYNCURL = "<%=asyncURL%>?uisessionid=<%=wcs.getUISessionID()%>";
	var CONTEXTURL = "<%=asyncURL%>";
	var testappid = "<%=app.getId()%>";
	</script>	
	</head>
	<body>
	<h2 style='color:blue'>Async Queue Unit Test</h2>
	<form id="hiddenform" name="hiddenform" action="<%=asyncURL%>">
	<table style='padding-left:1em'> 
	<tr>
		<td><%= mbo.getMboValueInfoStatic("wonum").getTitle() %></td>
		<% cid = pi.get("wonum").toString(); %>
		<td><input type="text" id="<%=cid %>"  name="<%=cid %>"  targetid="<%=cid %>" wait="30" requesttype="async"  onkeydown="sendtestevents(this.id,event)"  dataattribute="<%= mbo.getMboValueInfoStatic("wonum").getAttributeName().toLowerCase() %>" value="<%= mbo.getString("wonum") %>" mxevent="setvalue"></input></input></td>
		<td><select name="<%=cid %>cb" id="mx<%=cid %>cb">
				    <option value="async">Normal Async</option>
					<option value="highasync">High Priority</option>
			</select>
		</td>
	</tr>
	<tr>
		<td><%= mbo.getMboValueInfoStatic("description").getTitle() %></td>
		<% cid = pi.get("description").toString(); %>		
		<td><input type="text" id="<%=cid %>" name="<%=cid %>" targetid="<%=cid %>" wait="0" requesttype="async"   onkeydown="sendtestevents(this.id,event)" dataattribute="<%= mbo.getMboValueInfoStatic("description").getAttributeName().toLowerCase() %>"  mxevent="setvalue"></input></input></td>
		<td><select name="<%=cid %>cb" id="<%=cid %>cb">
				    <option value="async">Normal Async</option>
					<option value="highasync">High Priority</option>
			</select>
		</td>				
	</tr>
	<tr>
		<td><%= mbo.getMboValueInfoStatic("assetnum").getTitle() %></td>
		<% cid = pi.get("assetnum").toString(); %>		
		<td><input  type="text"  id="<%=cid %>" name="<%=cid %>" targetid="<%=cid %>" wait="0" requesttype="async" onkeydown="sendtestevents(this.id,event)" dataattribute="<%= mbo.getMboValueInfoStatic("assetnum").getAttributeName().toLowerCase() %>" mxevent="setvalue"></input></input></td>
		<td><select name="<%=cid %>cb" id="<%=cid %>cb">
				    <option value="async">Normal Async</option>
					<option value="highasync">High Priority</option>
			</select>
		</td>			
	</tr>
	<tr>
		<td><%= mbo.getMboValueInfoStatic("worktype").getTitle() %></td>
		<% cid = pi.get("worktype").toString(); %>	
		<td><input type="text" id="<%=cid %>" name="<%=cid %>" targetid="<%=cid %>" wait="0" requesttype="async"  onkeydown="sendtestevents(this.id,event)" dataattribute="<%= mbo.getMboValueInfoStatic("worktype").getAttributeName().toLowerCase() %>" mxevent="setvalue"></input></input></td>
		<td><select name="<%=cid %>cb" id="<%=cid %>cb">
				    <option value="async">Normal Async</option>
					<option value="highasync">High Priority</option>
			</select>
		</td>		
	</tr>
	<tr>
		<td><%= mbo.getMboValueInfoStatic("wopriority").getTitle() %></td>
		<% cid = pi.get("wopriority").toString(); %>	
		<td><input type="text" id="<%=cid %>" name="<%=cid %>" targetid="<%=cid %>" wait="0" requesttype="async"  onkeydown="sendtestevents(this.id,event)" dataattribute="<%= mbo.getMboValueInfoStatic("wopriority").getAttributeName().toLowerCase() %>" mxevent="setvalue"></input></input></td>
		<td><select name="<%=cid %>cb" id="<%=cid %>cb">
				    <option value="async">Normal Async</option>
					<option value="highasync">High Priority</option>
			</select>
		</td>		
	</tr>	
	<tr>
		<td colspan="3" align="right">
		<a href="javascript:sendsaveevent()">Save</a> | <a href="javascript:refreshwindow()">Refresh</a> | <a href="javascript:returntoapp()">Return To App</a>
		</td>
	</tr>
	</table>
	
	<table  style='padding-left:1em'>
		<tr>
			<td width="50%" style="color:red;font-style:bold">
				<b>Request Queue</b> |  <a href="javascript:clearvalues('requesttext')">Clear</a>
			</td>		
		</tr>	
		<tr>
			<td>
				<div id='requestqueue' style="display:inline;width:100%;hieght:100%">
				<textarea id='requesttext' name="requesttext" rows=15 cols=175 readonly style="background-color:#F9F7ED;"></textarea>
				</div>
			</td>
		</tr>
		<tr><td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<td width="50%" style="color:red;font-style:bold">
				<b>Response Queue</b> |  <a href="javascript:clearvalues('responsetext')">Clear</a>
			</td>			
		</tr>
		
			
		<tr>
			<td>
				<div id='responsequeue' style="display:inline;width:100%;hieght:100%">
				<textarea id='responsetext' name='responsetext'  rows=15 cols=175 readonly style="background-color:#CDEB8B;"></textarea>
				</div>
			</td>		
		</tr>
		
	</table>
	<input type="hidden" size="45" name="changedcomponentid"	value="" size="30" />
	<!--  <input type="hidden" size="45" name="selectedcontrol" id="selectedcontrol" size="30"/> -->
	<!-- <input type="hidden" size="45" name="uisessionid" value="<%=wcs.getUISessionID()%>" /> -->
	<!-- <input type="hidden" size="45" name="currentfocus" id="currentfocus" size="30"/> -->
	
	</form>
	
	</body>
</html>
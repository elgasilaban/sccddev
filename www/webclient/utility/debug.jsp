<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="psdi.mbo.MboSetRemote"
%><%@page import="psdi.util.MXSession"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.serviceability.Level"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSessionManager"
%><%
	String dojoDirectory = WebClientRuntime.getDojoDirectory(request);

	String uiSessionId = request.getParameter(WebClientSessionManager.UISESSIONID); 

	WebClientSessionManager mgr = WebClientSessionManager.getWebClientSessionManager(session);
	if(mgr == null)
	{
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		%>You need to login before you can use the debug console.<%
		return;
	}

	%><%@include file="debug/checkAuthorized.jsp"%><%

	String[] ids = mgr.getWebClientSessionIds();
	if(ids == null || ids.length == 0)
	{
		%>No sessions available<%
		return;
	}
	
	if(uiSessionId == null || uiSessionId.isEmpty())
	{
		uiSessionId = ids[0];
	}
	
	WebClientSession wcs = null;
	if(uiSessionId != null)
	{
		if(uiSessionId.startsWith(WebClientSessionManager.DESIGN_MODE))
		{
			String baseId = uiSessionId.substring(WebClientSessionManager.DESIGN_MODE.length());
			wcs = mgr.getWebClientSession(baseId);
			if(wcs != null)
			{
				wcs = wcs.getDesignModeWebClientSession();
			}
		}
		else
		{
			wcs = mgr.getWebClientSession(uiSessionId);
		}
	}
	if(wcs == null && ids.length == 1)
	{
		uiSessionId = null;
	}

	JSONArray uiSessionIds = new JSONArray();

	if(uiSessionId == null || uiSessionId.isEmpty() || ids.length > 0)
	{
		for(String id : ids)
		{
			JSONObject sessionId = new JSONObject();
			sessionId.put("value", id);
			if(id.startsWith(WebClientSessionManager.DESIGN_MODE))
			{
				sessionId.put("label", id.substring(WebClientSessionManager.DESIGN_MODE.length()) + " - Design");
			}
			else
			{
				sessionId.put("label", id);
			}
			uiSessionIds.add(sessionId);
		}
	}
	JSONArray levels = new JSONArray();
	for(Level level : Level.values())
	{
		levels.add(level.toString());
	}

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Tpae Web Client Debug Console</title>
<link rel="stylesheet" type="text/css" href="../javascript/<%=dojoDirectory%>/dojo/resources/dojo.css" />
<link rel="stylesheet" type="text/css" href="../javascript/<%=dojoDirectory%>/dijit/themes/claro/claro.css" />
<link rel="stylesheet" type="text/css" href="../javascript/<%=dojoDirectory%>/dojox/grid/enhanced/resources/claro/EnhancedGrid.css" />
<link rel="stylesheet" type="text/css" href="../javascript/<%=dojoDirectory%>/ibm/tivoli/mbs/debug/resources/style.css" />
<link rel="stylesheet" type="text/css" href="../javascript/<%=dojoDirectory%>/ibm/tivoli/mbs/debug/resources/icons.css" />
<link rel="shortcut icon" href="../skins/tivoli09/images/maximo-icon.ico"/>
<script data-dojo-config="async: true<%if(request.getParameter("dev")!=null){%>, packages:[{name:'ibm', location:'../../ibm' }]<%}%>"
		src="../javascript/<%=dojoDirectory%>/dojo/dojo.js<%if(request.getParameter("dev")!=null){%>.uncompressed.js<%}%>"
		type="text/javascript"></script>
</head>
<body class="claro">
	<div id="console" style="width: 100%; height: 100%;"></div>
	<script>
	require(["ibm/tivoli/mbs/debug/Console"], function(Console){
		var console = new Console({
			gutter: true,
			uiSessionId: "<%=WebClientRuntime.makesafevalue(uiSessionId)%>",
			uiSessionIds: <%=uiSessionIds.serialize()%>,
			uiSessionIdParamName: "<%=WebClientSessionManager.UISESSIONID%>",
			levels: <%=levels.serialize()%>
		}, "console");
		console.startup();
	});
	</script>
</body>
</html>
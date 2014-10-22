<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%@page	language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="psdi.webclient.system.runtime.WebClientRuntime"%>
<%@page import="psdi.webclient.system.controller.ComponentInstance"%>
<%@page import="psdi.webclient.system.session.WebClientSession"%>
<%@page import="psdi.webclient.system.controller.AppInstance"%>
<%@page import="psdi.webclient.system.controller.ControlInstance"%>

<%
	String enablerContext = WebClientRuntime.getMaximoBaseURL(request) + "/enabler";
	// Because we are being loaded in an Iframe, the current component will likely be wrong as the rendering will have continued past
	// the true control and component that we need.  The IDs for those are passed in as parameters by the IFrame.  We do need a control
	// temporarily to get a reference to the page we are on.  From the page, we can use the ID passed in by the IFrame to get a reference
	// to the correct control and component instances.
	//TODO this is not multi uisession safe, we could get the wrong wcs
	ComponentInstance tempComponent = (ComponentInstance)session.getAttribute("currentcomponent");
	WebClientSession wcs = tempComponent.getWebClientSession();
	String langcode = wcs.getUserLanguageCode();
	// Now get the correct component and control instances.
	ComponentInstance component = tempComponent.getPage().getComponentInstance(request.getParameter("componentId"));
	ControlInstance control = component.getControl();
%>
<html lang="<%=langcode.toLowerCase()%>">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 <meta http-equiv="Content-Script-Type" content="text/javascript; charset=utf-8">
<link rel="stylesheet" href="<%=enablerContext%>/js/bluedojo/dijit/themes/tundra/tundra.css" type="text/css">
<%-- 
define the proper character set, because the shrinksafe step for compressing dojo compresses \uxxxx to UTF-8 bytes 
--%>
<script type="text/javascript" src='<%=enablerContext%>/js/bluedojo/dojo/dojo.js' charset="UTF-8"></script>
<script type="text/javascript" src='<%=enablerContext%>/js/com/ibm/mm/enabler/enabler_config.js'></script>
<script type="text/javascript" src="<%=enablerContext%>/js/openajaxhub/OpenAjaxManagedHub-all.js"></script>

<script language="JavaScript" type="text/javascript">
	dojo.registerModulePath("com.ibm.mm.enabler","<%=enablerContext%>/js/com/ibm/mm/enabler");
	dojo.registerModulePath("com.ibm.mm.data","<%=enablerContext%>/js/com/ibm/mm/data");
	dojo.registerModulePath("com.ibm.mashups.enabler","<%=enablerContext%>/js/com/ibm/mashups/enabler");
</script>

<script type="text/javascript" src="<%=enablerContext%>/js/com/ibm/mm/enabler/enabler.core.js"></script>

<script type="text/javascript" >
dojo.registerModulePath("com.ibm.mashups.livetext","<%=enablerContext%>/js/com/ibm/mashups/livetext");
dojo.registerModulePath("com.ibm.mm.livetext","<%=enablerContext%>/js/com/ibm/mm/livetext");
dojo.require("com.ibm.mm.livetext.ServiceModelImpl");
var livetextService = new com.ibm.mm.livetext.ServiceModelImpl();
TagService = SemTagSvc = livetextService;
dojo.addOnLoad(function(){
    livetextService.init();
});		
</script>

</head>
<body class="tundra">
</body>
</html>
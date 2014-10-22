<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import="psdi.webclient.system.controller.*, psdi.webclient.system.runtime.WebClientRuntime, psdi.webclient.controls.*" %><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	String id = component.getRenderId();

	Menus menus = (Menus)component.getControl();
	String firstItemId = null;
	if(menus != null)
	{
		firstItemId = menus.getFirstMenuItemId();
	}
	if(Boolean.parseBoolean(request.getParameter("hiddenframe")) && !WebClientRuntime.isNull(firstItemId) &&
		!((ControlInstance)menus.getParentInstance()).needsRender())
	{
		menus.getPage().put("showingmenu", "true");
%>		<deferredscript><%="<![CDATA["%>
			menus._destroyMenus();
			menus.holder = document.getElementById("menuholdertd"); 
			var menu = menus.buildMenu("<%=menus.getId()%>",<%=menus.getMenusAsJson().toString()%>,null);
			showingMenu = true;
			stopFocus = true;
			menus._showMenu(menu.id,true);
		<%="]]>"%></deferredscript>
<%	}	%>
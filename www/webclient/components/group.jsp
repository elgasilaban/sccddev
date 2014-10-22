<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String id = component.getRenderId();
	Alignment alignment = wcs.getAlignment();
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	boolean designmode = wcs.getDesignmode();
	AppInstance app = control.getPage().getAppInstance();
	boolean componentVisible = component.isVisible();
	String componentValue = null;
	String textcss = component.getProperty("textcss");
	String cssclass = component.getCssClass();
	
	boolean defaultRender = component.isDefaultRender();
	if(defaultRender)
	{
		%><%@ include file="../common/componentholder_begin.jsp" %><%
	}
	/*
	 * Used to group more than one component for layout
	 */
	String layout = component.getProperty("layout");
	String width = component.getProperty("width");
	String valign = component.getProperty("valign");
	String height = component.getProperty("height");
	String displayStyle = component.getProperty("displaystyle");
	if(displayStyle.equalsIgnoreCase("_none"))
		displayStyle="";
	else
		displayStyle="display:"+displayStyle+";";
	if(!width.equals(""))
		width="width=\""+width+"\"";

	if(!valign.equals(""))
		valign="vertical-align:"+valign+";";

	if(!height.equals(""))
		height="height=\""+height+"\"";

	cssclass=textcss+" "+cssclass;
	if(!cssclass.equals(""))
		cssclass="class=\""+cssclass+"\"";

	String cellspacing = component.getProperty("cellspacing");
	if(!WebClientRuntime.isNull(cellspacing))
	{
		int spacing = Integer.parseInt(cellspacing);
		cellspacing="cellspacing='"+cellspacing+"'";
	}
	if(component.needsRender())
	{
		if(layout.equalsIgnoreCase("table"))
		{
			%><table role="presentation" id="<%=id%>" <%=cellspacing%> <%=width%> <%=height%> valign="top" <%=cssclass%><%
					%> summary="" style="<%=valign%><%=displayStyle%>"<%
					if(wcs.isAutomationOn())
					{
						%> automationid="<%=component.getId()%>"<%
					}
					%>><%
		}
		else if(layout.equalsIgnoreCase("div"))
		{
			%><div id="<%=id%>" <%=width%> <%=height%> valign="top" nowrap="nowrap" <%=cssclass%><%
					%> style="<%=displayStyle%>"<%
					if(wcs.isAutomationOn())
					{
						%> automationid="<%=component.getId()%>"<%
					}
					%>><%
		}
	}//if needs render
	component.renderChildComponents();
	if(component.needsRender())
	{
		if(layout.equalsIgnoreCase("table"))
		{
			%></table><%
		}
		else if(layout.equalsIgnoreCase("div"))
		{
			%></div><%
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
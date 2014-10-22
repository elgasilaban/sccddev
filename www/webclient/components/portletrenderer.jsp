<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2010, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page buffer="none" import= "org.w3c.dom.*,psdi.mbo.*, psdi.util.*, psdi.webclient.system.controller.*, psdi.webclient.system.beans.*, psdi.webclient.system.runtime.*, psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.webclient.controls.*, psdi.webclient.components.*, java.util.*" %><%
	String portletCompid = request.getParameter("pcompid");//portlet component id
	
	if(WebClientRuntime.isNull(portletCompid))
		return;
	
	//mark the control as loaded
	//call create render data on the control
	//include jsp based on jsp file name of the portlet. 
	WebClientSession webClientSession = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	if (webClientSession == null)
		return;
	AppInstance currentapp = webClientSession.getCurrentApp();
	ComponentInstance portletcomponent = currentapp.getApplicationPage().getComponentInstance(currentapp.getOrigId(portletCompid));
	
	if(portletcomponent== null)
			return;
			
	ControlInstance pControl = portletcomponent.getControl();
	if (pControl instanceof BulletinBoard) //because BulletinBoard is different and extends Hyperlink control
	{
		BulletinBoard portlet = (BulletinBoard)pControl;
		portlet.getStateManager().setStateLoadCalled();		  
		portlet.setChangedFlag();
	}  
	else {
		PortletDataInstance portlet = (PortletDataInstance)pControl;
		portlet.getStateManager().setStateLoadCalled();		  
		portlet.setChangedFlag();
	}
 		
	//mimic what response.jsp does since we can't use that
	//need to do special render 
    String desName = ((ComponentDescriptor)portletcomponent.getDescriptor()).getJSPFileName();
 	response.setContentType("text/xml");
	response.setCharacterEncoding("UTF-8");
	java.io.PrintWriter writer = response.getWriter();
	writer.println("<?xml version=\"1.0\" encoding=\"" + session.getAttribute("_encoding") + "\" ?>");
	writer.println("<server_response>");
	RequestDispatcher view = request.getRequestDispatcher(desName+".jsp");
	request.setAttribute("currentcomponent",portletcomponent);//because simple header would need that
	view.include(request, response);
	writer.println("</server_response>");
%>
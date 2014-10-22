<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	String count = component.getProperty("count");
	WebClientSession wcs = control.getWebClientSession();
	int countInt = 0;
	if(count!=null && count.length()>0) {
		countInt = Integer.parseInt(count);
		if(countInt<0) {
			countInt = 0;
		}
		if(countInt>0) {
			%><div class="bulletinCount"><%=countInt%></div><%if(wcs.getAlignment().rtl){%><script>addLoadMethod('adjustBBCountLocation()');</script><%}
		}
	}	%>
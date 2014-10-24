<!--
/***************************************************************************
 * IBM Confidential
 *
 * OCO Source Materials
 *
 *
 * Copyright IBM Corp. 2007
 *
 * The source code for this program is not published or otherwise divested of
 * its trade secret, irrespective of what has been deposited with the
 * U.S. Copyright Office
 * 
 * @version 1.3, 1/12/09
 * @file /cmvc/itsm/vc/0/5/9/0/s.70
 *
 * 
 ****************************************************************************/
-->
<%@ page
	import="com.ibm.tivoli.srm.screencapturer.webclient.controller.WebClientSessionMapper,psdi.util.MXSession, psdi.webclient.system.runtime.WebClientRuntime"
%><%
	String width = request.getParameter("width");

	final int marginTopInt = 5;
	String marginTop = String.valueOf(marginTopInt);

	String height = request.getParameter("height");
	int heightInt = Integer.parseInt(height) - 5;
	height = String.valueOf(heightInt);
	
	WebClientSessionMapper.addSession(WebClientRuntime.makesafevalue(request.getParameter("uisessionid")), request);
	
	MXSession mxSession = (MXSession)session.getAttribute("MXSession");

	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script language="JavaScript">
			function hideWindow() {
				parent.window.moveTo(0, 0);
				parent.window.resizeTo(1, 1);
			}

			function showWindow(width, height) {
				parent.window.moveTo(0, 0);
				parent.window.resizeTo(width, height);
			}

			function refreshAttachments() {
				parent.sendEvent("dialogok", "attachments", "");
			}
		</script>
	</head>
	<body>

	<applet width="155" height="20">
		<param name="jnlp_href" value="<%=servletBase.toString()%>/webclient/srm_screen_capturer/sc-applet.jsp">
		<param name="uisessionid" value="<%=WebClientRuntime.makesafevalue(request.getParameter("uisessionid"))%>">
      	<param name="scriptable" value="true">
      	<param name="lang" value="<%=mxSession.getUserInfo().getLangCode()%>"/>
	</applet>

</body>

</html>
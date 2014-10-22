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
--%><%--
* This jsp is loaded when an error occurs while an application is being initialized. This is because if 
* the application cannot initialize properly, then the normal render process cannot be used as it requires
* a valid appliation instance.
*
* Buttons are provided here to retry the action that the user was originally attempting or just go to the
* Start Center if the application cannot be loaded.
--%>
<%@page import="psdi.util.BidiUtils"
%><%@page import="java.net.URLEncoder"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true"
%><%@include file="../login/langcode.jsp"
%><%
String errorMessage = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_EXC);
if (errorMessage == null)
{
	errorMessage = mxSession.getMessage("ui", "loadapperrorgeneric");
}
String retryURL = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_RETRYURL);
String retryQuery = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_RETRYQUERY);
String returnURL = WebClientRuntime.getMaximoRequestContextURL(request) + request.getServletPath();
if (retryURL == null)
{
	retryURL = returnURL;
}
String errorLabel = mxSession.getMessage("ui", "loadapperror");
String returnBtnLabel = mxSession.getMessage("ui", "loadapperrorreturnlabel");
String retryBtnLabel = mxSession.getMessage("ui", "loadapperrorretrylabel");
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<base href="<%=WebClientRuntime.getMaximoRequestContextURL(request)+"/webclient/common/"%>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><%=mxSession.getMessage("fusion","CompanyName")%></title>
	<link href="../login/css/login.css" rel="stylesheet" type="text/css" />
<%	String reverseAlign = "right";
	if(BidiUtils.isGUIMirrored(langcode))
	{
		reverseAlign = "left";
%>	<link href="../login/css/RTLlogin.css" rel="stylesheet" type="text/css" />
<%	} 
%>
	<script>
		function executeRetry()
		{
<%--		 Since the response could come back very quickly showing the same error if it hasn't been resolved,
			 show a working icon for a second just to show that the request actually happened.			
--%>		var iconImg = document.getElementById("icon");
			iconImg.src = "../images/progressbar.gif";
			window.setTimeout(function() {
				var retryURL = '<%=retryURL%>';
				var retryQuery = '';
<%				if (retryQuery != null)
				{
					// If there's a query string component, encode it so that no one can inject any script.
%>					retryURL += '?' + decodeURIComponent('<%=URLEncoder.encode(retryQuery)%>');
<%				}
%>				location.href = retryURL + retryQuery;
			}, 1000);
		}
	</script>
</head>
<body>
	<div>
		<div class="main_tbl">
			<div style="text-align:<%=reverseAlign%>;padding-bottom:3px;" role="banner">
				<img src="../login/images/ibm-logo-white.gif" alt="IBM">
			</div>
			<div class="dialog" role="main">
				<img id="icon" class="messageIcon" src="../login/images/st34critical_shad.png" alt="" />
				<h1 class="message"><%=errorLabel%></h1>
				<p class="messageDesc"><%=errorMessage%></p>
			
				<div style="text-align:<%=reverseAlign%>">
					<button class="tiv_btn" onClick="location.href='<%=returnURL%>'"><%=returnBtnLabel%></button>
					<button class="tiv_btn" onClick="executeRetry()"><%=retryBtnLabel%></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
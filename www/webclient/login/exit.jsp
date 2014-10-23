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
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true"
%><%@page import="psdi.util.BidiUtils"
%><%@include file="langcode.jsp"
%><%

	if (request.getParameter("redirect") != null)
	{
		//This redirect is done to insure the proper language is used if this page sits long enough for the session to time out
		//and thus lose the MXSession and the session attribute langcode
		response.sendRedirect("../../ui/login");
		return;
	}

	String[] labels = mxSession.getMessages("logout", new String[] {"logoutlabel", "logoutmessagepart1", "logoutmessagepart2", "loginbtntext"});
	boolean wcstimeout = request.getParameter("wcstimeout") != null;
	boolean formAuth = request.getParameter("formAuth") != null;
	boolean sharedSession = request.getParameter("sharedSession") != null;
	String msg;
	String icon = "informational";
	if (request.getParameter("logintimeout") != null)
	{
		msg = mxSession.getMessage("jspmessages", "session_timeout");
	}
	else if (sharedSession)
	{
		msg = mxSession.getMessage("ui","shareduisession");
		labels[0] = mxSession.getMessage("ui", "msgboxtitle");
		icon = "critical";
	}
	else if (formAuth && !wcstimeout)
	{
		msg = labels[1];
		icon = "success";
	}
	else
	{
		msg = (wcstimeout ? mxSession.getMessage("jspmessages", "session_timeout") + "<br /><br />" : "") + labels[2];
	}

	String chkLang;
	String acceptLang = request.getHeader("accept-language");
	if (acceptLang != null)
	{
		if (acceptLang.length() > 2)
		{
			chkLang = acceptLang.substring(0, 2);
		}
		else
		{
			chkLang = acceptLang;
		}
	}
	else
	{
		chkLang = psdi.server.MXServer.getMXServer().getBaseLang();
	}
	String skin = WebClientRuntime.getWebClientSystemProperty("mxe.webclient.skin");
	if(skin==null || skin.length()==0) {
		skin="classic";
	}
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><%=mxSession.getMessage("fusion", "CompanyName")%></title>
	<link href="css/login.css" rel="stylesheet" type="text/css" />
	<link href="css/<%=skin%>/login.css" rel="stylesheet" type="text/css" />
<%	String reverseAlign = "right";
	if(BidiUtils.isGUIMirrored(langcode))
	{
		reverseAlign = "left";
%>	<link href="css/RTLlogin.css" rel="stylesheet" type="text/css" />
<%	}
%></head>
<body>
	<div>
		<div class="main_tbl exit">
			<div style="text-align:<%=reverseAlign%>;padding-bottom:3px;" role="banner">
				<img src="images/ibm-logo-white.gif" alt="IBM">
			</div>
			<div class="dialog" role="main">
				<img class="messageIcon" src="images/st34<%=icon%>_shad.png" alt="" />
				<h1 class="message"><%=labels[0]%></h1>
				<p class="messageDesc"><%=msg%></p>
				<form id="returnFrm" name="returnFrm" method="post" style="text-align:<%=reverseAlign%>"<%
							if (sharedSession || langcode == null || langcode.equalsIgnoreCase(chkLang))
							{
								%> action="../../ui/login"<%
							}
							%>>
					<input type="hidden" id="redirect" name="redirect" value="1" />
					<input type="hidden" id="langcode" name="langcode" value="<%=langcode%>" />
					<div class="exitsep"></div>
					<button type="submit" id="submit" class="tiv_btn"><%=labels[3]%></button>
				</form>
				<script>
					if (parent.location != document.location)
					{
						var form = document.getElementById('returnFrm');
						if(form)
						{
							form.disabled = true;
							form.style.display = "none";
							form.setAttribute("aria-hidden", "true");
						}
					}
				</script>
			</div>
		</div>
	</div>
</body>
</html>
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
%><%@page import="psdi.webclient.system.session.WebClientSessionManager"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@include file="langcode.jsp"
%><%
	String errorlabel;
	String message;
	String message2 = null;
	String returnBtnLabel = null;
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	boolean unavailable = false;
	boolean reload = false;
	String url = null;
	if (wcs != null && request.getParameter("longoprunning") != null)
	{
		//String msg = 
		errorlabel = wcs.getMessage("ui", "msgboxtitle");
		message = wcs.getMessage("ui", "longopthreadrunning");
		returnBtnLabel = wcs.getMessage("logout", "loginbtntext");
		url = new StringBuilder().append(WebClientRuntime.getMaximoRequestContextURL(request)).append("/ui/login?event=loadapp&value=").append(wcs.getCurrentAppId()).append("&").append(wcs.getUISessionUrlParameter()).append(wcs.getCSRFTokenParameter()).toString();
		reload = true;
	}
	else
	{
		if (request.getParameter("redirect") != null)
		{
			//This redirect is done to insure the proper lanuage is used if this page sits long enough for the session to time out
			//and thus lose the MXSession and the session attribute langcode
			response.sendRedirect("../../ui/login");
			return;
		}
	
		if(langcode != null)
		{
			langcode = langcode.toUpperCase();
			session.setAttribute("langcode", langcode);
			mxSession.setLangCode(langcode);
		}
		if(locale != null)
		{
			session.setAttribute("_locale_", locale);
			mxSession.setLocale(locale);
		}
	
		unavailable = request.getParameter("unavailable") != null;
		if (unavailable)
		{
			String[] unavailMsgs = mxSession.getMessages("login", new String[] {"maxuisessionstitle", "maxuisessions", "maxuisessionsclose"});
			errorlabel = unavailMsgs[0];
			message = unavailMsgs[1];
			message2 = unavailMsgs[2];
		}
		else
		{
			errorlabel = mxSession.getMessage("login", "loginerrorlabel");
			message = (String)session.getAttribute("signoutmessage");
			if (message == null)
			{
				message = mxSession.getMessage("access", "invaliduser");
			}
			returnBtnLabel = mxSession.getMessage("logout", "loginbtntext");
		}
	
		if (unavailable)
		{
			WebClientSessionManager wcsm = WebClientSessionManager.getWebClientSessionManager(session);
			if (wcsm == null || !wcsm.hasSessions())
			{
				session.invalidate();
			}
		}
		else
		{
			session.invalidate();
		}
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

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><%=mxSession.getMessage("fusion","CompanyName")%></title>
	<link href="css/login.css" rel="stylesheet" type="text/css" /><% 
	String skin = WebClientRuntime.getWebClientSystemProperty("mxe.webclient.skin");
	if(skin==null || skin.length()==0) {
		skin="classic";
	}
%>	<link href="css/<%=skin%>/login.css" rel="stylesheet" type="text/css" />
<%	String reverseAlign = "right";
	if(BidiUtils.isGUIMirrored(langcode))
	{
		reverseAlign = "left";
%>	<link href="css/RTLlogin.css" rel="stylesheet" type="text/css" />
<%	}
%></head>
<body>
	<div>
		<div class="main_tbl">
			<div style="text-align:<%=reverseAlign%>;padding-bottom:3px;" role="banner">
				<img src="images/ibm-logo-white.gif" alt="IBM">
			</div>
			<div class="dialog" role="main">
				<img class="messageIcon" src="images/st34critical_shad.png" alt="" />
				<h1 class="message"><%=errorlabel%></h1>
				<p class="messageDesc"><%=message%></p>
<%		if(unavailable)
		{
			if(request.getParameter("basic") != null)
			{
%>				<p><%=message2%></p>
<%			}
		}
		else
		{
%>				<div style="text-align:<%=reverseAlign%>">
<%
			if (reload)
			{
%>
					<button class="tiv_btn" onclick="this.style.display='none';document.location='<%=url%>'"><%=returnBtnLabel%></button>
<%				
			}
			else
			{
%>
					<form id="returnFrm" name="returnFrm" method="post"<%
							if (langcode == null || langcode.equalsIgnoreCase(chkLang))
							{
								%> action="../../ui/login"<%
							}
							%>>
						<button class="tiv_btn" type="submit"><%=returnBtnLabel%></button>
						<input type="hidden" id="redirect" name="redirect" value="1" />
						<input type="hidden" id="langcode" name="langcode" value="<%=langcode%>" />

						</form>
<%		}				
%>
				</div>
<%	  }
%>			</div>
		</div>
	</div>
</body>
</html>
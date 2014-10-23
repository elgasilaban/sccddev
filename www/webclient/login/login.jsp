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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" import="psdi.util.*,psdi.webclient.system.runtime.*,psdi.webclient.system.session.*,psdi.webclient.system.websession.*,psdi.webclient.system.dojo.*,psdi.server.*,java.util.*,java.rmi.RemoteException" %><%!
private static class Labels
{
	private static final String group = "login";
	
	final String welcome;
	final String welcomeToMaximo;
	final String enterInfo;
	final String username;
	final String password;
	final String loginButton;
	final String selectLanguage;
	final String onLanguageSelection;
	final String forgotPassword;
	final String newUserLabel;
	final String newUserLink;
	final String mobileLoginLink;
	final String standardLoginLink;
	final String copyright;

	Labels(String langCode) throws MXException, RemoteException
	{
		MXServer server = MXServer.getMXServer();

		welcome = server.getMessage(group, "welcome", langCode);
		welcomeToMaximo = server.getMessage(group, "welcomemaximomessage", langCode);
		enterInfo = server.getMessage(group, "enterinfo", langCode);
		username = server.getMessage(group, "username", langCode);
		password = server.getMessage(group, "password", langCode);
		loginButton = server.getMessage(group, "loginbutton", langCode);
		selectLanguage = server.getMessage(group, "languages", langCode);
		onLanguageSelection = server.getMessage(group, "onlanguageselection", langCode);
		forgotPassword = server.getMessage(group, "forgotpassword", langCode);
		newUserLabel = server.getMessage(group, "newuserlabel", langCode);
		newUserLink = server.getMessage(group, "newuserlink", langCode);
		mobileLoginLink = server.getMessage(group, "mobileloginlink", langCode);
		standardLoginLink= server.getMessage(group, "standardloginlink", langCode);
		copyright = server.getMessage(group, "copyright", langCode);
	}
}
%><%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setDateHeader("Expires", 0);
	response.setHeader("Pragma", "no-cache");

	WebClientSessionManager wcsm = WebClientSessionManager.getWebClientSessionManager(session);
	if (wcsm != null && wcsm.getSessionInvalidated())
	{
		session.removeAttribute("MXSession");
	}

	MXSession s = WebClientRuntime.getMXSession(session);
	String skin = WebClientRuntime.getWebClientSystemProperty("mxe.webclient.skin");
	if(skin==null || skin.length()==0) {
		skin="classic";
	}
	if (!WebClientSessionFactory.getWebClientSessionFactory().hasAvailableSessions())
	{
		String url = new java.net.URL(new java.net.URL(WebClientRuntime.getMaximoRequestURL(request)), "loginerror.jsp").toString() + "?unavailable=true";
		if (!WebClientRuntime.send503Error(response, s, url))
		{
			response.sendRedirect(url);
		}
		return;
	}

	s.setClientHost(request.getRemoteHost());
	s.setClientAddr(request.getRemoteAddr());

	Object[] settings = WebClientRuntime.getLocaleFromRequest(request);
	String langcode;
	if (settings[0] instanceof String)
	{
		langcode = (String)settings[0];
	}
	else
	{
		langcode = MXServer.getMXServer().getBaseLang();
	}
	Map<String,String> langNameToCodeMap = null;
	String[][] langs = s.getLanguageList();
	if(langs != null)
	{
		if(langs.length == 1)
		{
			langcode = langs[0][0];
		}
		else if(langs.length > 1)
		{
			langNameToCodeMap = new HashMap<String,String>();
			for(int i = 0; i < langs.length; i++)
			{
				langNameToCodeMap.put(langs[i][1], langs[i][0]);
			}
		}
	}
	s.setLangCode(langcode);
	session.setAttribute("langcode", langcode);

	Locale locale = null;
	if (settings[1] instanceof Locale)
	{
		locale = (Locale)settings[1];
		session.setAttribute("_locale_", locale);
	}
	if (locale != null)
	{
		session.removeAttribute("locale");
		s.setLocale(locale);
	}

	if (request.getParameter("langchanged") != null)
	{
		session.setAttribute("_langchanged", "1");
	}

	boolean isMobile = false;

	boolean everyplace = WebClientRuntime.getWebClientRuntime().hasLicenseAccess("EVERYPLACE");
	if(everyplace)
	{
		String mobile = request.getParameter("mobile");
		if(WebClientRuntime.isNull(mobile))
		{
			String userAgent = request.getHeader("User-Agent").toUpperCase();
			if(userAgent.contains("MOBILE") || userAgent.contains("IPHONE") || userAgent.contains("IPOD") || userAgent.contains("PLAYBOOK") || userAgent.contains("ANDROID"))
			{
				isMobile = true;
			}
		}
		else if(mobile.equals("true"))
		{
			isMobile = true;
		}
		if(isMobile) {
			skin = "mobile";
		}
	}
	request.setCharacterEncoding("UTF-8");

	String debug = request.getParameter("debug");
	if(debug == null || debug.length() == 0)
	{
		debug = "0";
	}

	boolean formAuth = request.getParameter("appservauth") != null;
	String allowInSubFrame = request.getParameter("allowinsubframe");
	if (formAuth)
	{
		session.setAttribute("formAuth", "true");
	}
	String url = WebClientRuntime.getMaximoRequestContextURL(request)+"/ui/login";

	String queryString = request.getQueryString();
	if(queryString != null)
	{
		url += "?" + HTML.encode(queryString);
	}
	int branding = s.getBranding();
	if(branding == MXServerRemote.BRAND_NONE)
	{
		branding = MXServerRemote.BRAND_MAXIMO_AND_TIVOLI;
	}
	WebClientSession wcs = null;
	if(wcsm != null)
	{
		wcs = wcsm.getWebClientSession(request);
		if(wcs != null)
		{
			if(wcs.usingContextInterval())
			{
				s.disconnect();
			}
		}
	}
	if(s.isConnected() && s.getUserName().equalsIgnoreCase(s.getProperty("mxe.system.reguser")))
	{
		s.disconnect();
	}
	if(!formAuth && (WebAppEnv.useAppServerSecurity() || s.isConnected()))
	{
		response.sendRedirect(url);
		return;
	}

	String userFieldName = "username";
	String passwordFieldName = "password";
	boolean tokenExpire = false;
	if(WebAppEnv.useAppServerSecurity())
	{
		userFieldName = "j_" + userFieldName;
		passwordFieldName = "j_" + passwordFieldName;
		url="../../j_security_check";

		if (s.isConnected()) // This is possible cause for Appserver token expiry
		{
			tokenExpire = true;
		}
	}

	String userName = request.getParameter("username");
	if(userName == null)
	{
		userName = "";
	}
	
	Labels labels = new Labels(langcode);

	String reverseAlign = "right";
	String direction = "ltr";
	if(BidiUtils.isGUIMirrored(langcode))
	{
		reverseAlign = "left";
		direction = "rtl";
	}

	String timestamp = Long.toString(System.currentTimeMillis());
	session.setAttribute("allowlogin", timestamp);

	String message;
	MXException loginException = (MXException)session.getAttribute("loginexception");
	if (loginException != null)
	{
		//Issue 10-12120
		message = s.getTaggedMessage(loginException);
		message = WebClientRuntime.replaceString(message,"\"","\\\"");
		session.removeAttribute("loginexception");
	}
	else
	{
		message = (String)request.getAttribute("signoutmessage");
		if (message == null)
		{
			message = (String)session.getAttribute("signoutmessage");
			if (message != null)
			{
				session.removeAttribute("signoutmessage");
			}
		}
		else
		{
			request.removeAttribute("signoutmessage");
		}
	}
	if (message != null)
	{
		message = WebClientRuntime.removeQuotes(message);
		message = message.replace("\\n"," ");
	}
	
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<link rel="apple-touch-icon" href="../images/maximo-icon.png"/>
	<link rel="shortcut icon" href="../images/maximo-icon.ico"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Expires" content="0" />
	<meta name="viewport" content="width=320, initial-scale=1.0" />
	<meta name="format-detection" content="telephone=no" />
<%	if(branding == MXServerRemote.BRAND_MAXIMO || branding == MXServerRemote.BRAND_MAXIMO_AND_TIVOLI)
	{
%>	<title><%=labels.welcomeToMaximo%></title>
<%	}
	else
	{
%>	<title><%=labels.welcome%></title>
<%	}
%>	<link href="css/login.css" rel="stylesheet" type="text/css" />
	<link href="css/<%=skin%>/login.css" rel="stylesheet" type="text/css" />
<%	if(isMobile)
	{
%>	<link href="css/mobilelogin.css" rel="stylesheet" type="text/css" />
<%	}
	if(direction.equals("rtl"))
	{
%>	<link href="css/RTLlogin.css" rel="stylesheet" type="text/css" />
<%	}
%></head>

<body <%=(tokenExpire?"":"onload=\"checkForRefresh()\"")%>>
	<div role="main">
		<table id="main_tbl" class="main_tbl" cellpadding="0" cellspacing="3" role="presentation">
			<tr role="banner">
				<td>
<%					//Branding image
					if(branding == MXServerRemote.BRAND_TIVOLI || branding == MXServerRemote.BRAND_MAXIMO_AND_TIVOLI)
					{
%>					<img class="defaultbrandinglogo" src="images/tivoli_brandmark.png" alt="Tivoli" />
<%					}
%>				</td>
				<td align="<%=reverseAlign%>">
					<img class="defaultibmlogo" src="images/ibm-logo-white.gif" alt="IBM" />
				</td>
			</tr>
			<tr>
				<td class="dialog" colspan="2">
<%			if(branding == MXServerRemote.BRAND_MAXIMO || branding == MXServerRemote.BRAND_MAXIMO_AND_TIVOLI)
			{
				//  Welcome to MAXIMO
%>				<h1 class="prod_name"><%=labels.welcomeToMaximo%></h1>
<%			}
			else
			{
				// Welcome,
%>				<h1 class="prod_name"><%=labels.welcome%></h1>
<%			}
			if(!isMobile && message != null)
			{
%>				<div class="errorText">
					<img id="error_img" src="images/st16_critical_24.png" alt="Error" align="absmiddle"/>
					<%=message%>
				</div>
<%			}
%>				<table cellpadding="0" cellspacing="0" role="presentation">
						<tr>
							<td colspan="5" align="<%=reverseAlign%>">
							<%	if(branding == MXServerRemote.BRAND_MAXIMO || branding == MXServerRemote.BRAND_MAXIMO_AND_TIVOLI)
								{
									//  Welcome to MAXIMO
					%>				<h1 class="prod_name ext_prod_name" style="display:none"><%=labels.welcomeToMaximo%></h1>
					<%			}
								else
								{
									// Welcome,
					%>				<h1 class="prod_name ext_prod_name" style="display:none"><%=labels.welcome%></h1>
					<%			} %>
							</td>
						</tr>
						<tr>
							<td valign="top"><img src="images/mx_icon<%=isMobile?"_ev":""%>.png" alt="" /></td>
							<td class="input_pad">
								<form id="loginform" name="loginform" method="post" action="<%=url%>" onsubmit="loginSetup();">
									<input type="hidden" name="allowinsubframe" value="<%=HTML.encode(allowInSubFrame)%>"/>
									<input type="hidden" name="mobile" id="mobile" value="<%=isMobile%>"/>
									<input type="hidden" name="login" id="loginjsp" value="jsp" />
									<input type="hidden" name="loginstamp" id="loginstamp" value="<%=timestamp%>" />
<%								if (wcs != null)
								{									
%>									<input type="hidden" name="<%=WebClientSessionManager.CSRFTOKEN%>" id="csrftoken" value="<%=wcs.getCSRFToken()%>" />
<%								}
								if(Integer.parseInt(debug) > 0)
								{
%>									<input type="hidden" name="debug" value="<%=debug%>"/>
<%								}
%>									<label for="<%=userFieldName%>"><%=labels.username%></label><br />
<%								String attrs = "";
								if(BidiUtils.isBidiEnabled())
								{
									attrs = BidiUtils.buildTagAttribute("",BidiUtils.getMboTextDirection("MAXUSER","LOGINID",true),"",true);
									attrs += "onkeyup='processBidiKeys(null,this)' onfocus='input_bidi_onfocus(null, this)' onblur='input_bidi_onblur(null, this)' onchange='input_bidi_onfocus(null, this)' ";
								}
%>									<input <%=attrs%> style="width:<%=isMobile?145:195%>px" name="<%=userFieldName%>" id="<%=userFieldName%>" langcode="<%=langcode%>" type="text" value="<%=HTML.encode(userName)%>"/>
									<br /><br />
									<label for="<%=passwordFieldName%>"><%=labels.password%></label><br />
									<input style="width:<%=isMobile?145:195%>px" name="<%=passwordFieldName%>" id="<%=passwordFieldName%>" type="password" />
									<br /><br />
									<div style="text-align: <%=reverseAlign%>">
										<button class="tiv_btn" type="submit" id="loginbutton"><%=labels.loginButton%></button>
									</div>
								</form>
							</td>
						</tr>
						<%@ include file="login_ex.jsp" %>
<%					if(!formAuth && isMobile)
					{
%>						<tr>
							<td align="<%=reverseAlign%>" height="18" colspan="2">
								<form name="mobileform" method="get" action="<%=url%>" onsubmit="showWait()">
									<input type="hidden" name="mobile" value="<%=!isMobile%>" />
									<button id="mobilelink" class="link" type="submit"><span><%=labels.standardLoginLink%></span></button>
								</form>
							</td>
						</tr>
						<tr>
							<td align="<%=reverseAlign%>" height="18" colspan="2">
								<form name="selfregform" method="post" action="<%=url%>" onsubmit="showWait()">
									<input type="hidden" name="event" value="loadapp" />
									<input type="hidden" name="value" value="forgotpswd" />
									<input type="hidden" name="login" value="selfreg" />
<%								if(langNameToCodeMap != null)
								{
%>									<input type="hidden" name="langcode" value="<%=langcode%>" />
<%								}
%>									<button id="forgotpwdlink" class="link" type="submit"><span><%=labels.forgotPassword%></span></button>
								</form>
							</td>
						</tr>
<%					}
					if(langNameToCodeMap != null)
					{	
						String[] langNames = langNameToCodeMap.keySet().toArray(new String[langNameToCodeMap.size()]);
						Arrays.sort(langNames);
%>						<tr height="<%=isMobile?"104":"30"%>px">
							<td nowrap="nowrap" align="<%=reverseAlign%>" colspan="2">
								<form name="langform" method="post" id="langform" >
									<input type="hidden" id="languser" name="username" />
<% 								if(formAuth)
								{
%>									<input type="hidden" name="langchanged" value="1" />
<%								}
%>									<label for="langselect"><%=labels.selectLanguage%>
									</label>
									
									<select id="langselect" name="langcode" onchange="selectLanguage()" title="<%=labels.onLanguageSelection%>">
<%								for(int i = 0; i < langNames.length; i++)
								{
									String code = langNameToCodeMap.get(langNames[i]); 
									if(code.equals(langcode))
									{
%>										<option value="<%=code%>" selected="selected"><%=langNames[i]%></option>
<%									}
									else
									{
%>										<option value="<%=code%>"><%=langNames[i]%></option>
<%									}
								}
%>									</select>
								</form>
							</td>
						</tr>
<%					}
					else if(isMobile)
					{
%>						<tr height="104px"><td colspan="2">&nbsp;</td></tr>
<%					}
					if(!formAuth && !isMobile)
					{
						if(everyplace)
						{
%>						<tr>
							<td align="<%=reverseAlign%>" height="18" colspan="2">
								<form name="mobileform" method="get" action="<%=url%>" onsubmit="showWait()">
									<input type="hidden" name="mobile" value="<%=!isMobile%>" />
									<button id="mobilelink" class="link" type="submit"><span><%=labels.mobileLoginLink%></span></button>
								</form>
							</td>
						</tr>
<%						}
%>						<tr>
							<td align="<%=reverseAlign%>" height="18" colspan="2">
								<form name="selfregform" method="post" action="<%=url%>" onsubmit="showWait()">
									<input type="hidden" name="event" value="loadapp" />
									<input type="hidden" name="value" value="forgotpswd" />
									<input type="hidden" name="login" value="selfreg" />
<%								if(langNameToCodeMap != null)
								{
%>									<input type="hidden" name="langcode" value="<%=langcode%>" />
<%								}
%>									<button id="forgotpwdlink" class="link" type="submit"><span><%=labels.forgotPassword%></span></button>
								</form>
							</td>
						</tr>
						<tr>
							<td align="<%=reverseAlign%>" height="18" colspan="2">
								<form name="selfregform" method="post" action="<%=url%>" onsubmit="showWait()">
									<input type="hidden" name="event" value="loadapp" />
									<input type="hidden" name="value" value="selfreg" />
									<input type="hidden" name="login" value="selfreg" />
<%								if(langNameToCodeMap != null)
								{
%>									<input type="hidden" name="langcode" value="<%=langcode%>" />
<%								}
%>									<%=labels.newUserLabel%> <button id="selfreglink" class="link" type="submit"><span><%=labels.newUserLink%></span></button>
								</form>
							</td>
						</tr>
<%					}
%>				</table>
				</td>
			</tr>
			<tr>
				<td colspan="2" class="copyright" role="contentinfo"><img alt="IBM" src="images/ibm-logo-white.gif" style="display: none"><p><%=labels.copyright%></p></td>
			</tr>
		</table>
	</div>
<%	if(BidiUtils.isBidiEnabled())
	{
%>	<script type="text/javascript" src="../javascript/<%=Dojo.getMaximoJavascriptDirectory(request)%>bidi_library.js"></script>
<%	}

	if(tokenExpire)
	{
%>	<script type="text/javascript" src="../javascript/<%=WebClientRuntime.getDojoDirectory(request)%>/dojo/dojo.js"></script>
	<script type="text/javascript" src="../javascript/tokenrelog.js"></script>
<%	}

%>	<script language="JavaScript" type="text/javascript">
	var MAINDOC=document;
	function checkForRefresh() 
	{
<%		if (BidiUtils.isBidiEnabled())
		{
%>			setTimeout("document.getElementById('username').blur(); document.getElementById('username').focus()",100);
<%		}
%>		document.cookie = "TJE= ; expires=-1; path=/";
		document.cookie = "TE3= ; expires=-1; path=/";
<%		String portalMode = request.getParameter("portalmode");
		if ((allowInSubFrame == null || allowInSubFrame.equalsIgnoreCase("false"))
				&& (portalMode == null || portalMode.equals("false")))
		{	%>
				function getFrameName(frame)
				{
					var frames = parent.frames, 
					l = frames.length, 
					name = null;
				
				    for (var x=0; x<l; x++) {
				        if (frames[x] === frame) {
				            name = frames[x].name;
				        }
				    }
				
					return name;
				}
				
				if (self != top)
				{
					var currentFrameName = getFrameName(self);
					if ("commframe" != currentFrameName)
					{
						top.location.replace(self.location.href);
					}
				}
<%		}

%>		if (MAINDOC.location != document.location)
		{
			var hiddenFrame = parent.document.getElementById("commframe");
			if (hiddenFrame != null)
			{
				var debugwindow = parent.document.getElementById("dockedHiddenFrame");
				var hdrRow = parent.document.getElementById("debugHeaderRow");
				hdrRow.style.display="none";
				debugwindow.style.display="";
				debugwindow.style.visibility="visible";
				debugwindow.style.position="absolute";
				debugwindow.style.top = -16;
				debugwindow.style.left = -18;
				debugwindow.style.opacity=1;
				debugwindow.style.filter="alpha(opacity=100)";
				debugwindow.style.width=parent.document.body.clientWidth +19;
				debugwindow.style.height=parent.document.body.clientHeight + 16;
				hiddenFrame.style.width=parent.document.body.clientWidth +19;
				hiddenFrame.style.height=parent.document.body.clientHeight + 16;
				debugwindow.style.zIndex=1001
				hiddenFrame.style.display="inline";
				parent.hideWait();
			}
		}

<%		if (message != null && isMobile)
		{
%>			alert("<%=message%>");
<%		}

%>		var userField = document.getElementById("<%=userFieldName%>");
		if (<%=loginException != null%> || userField.value == "")
		{
			userField.focus();
			userField.select();
		}
		else
		{
			var pWordField = document.getElementById("<%=passwordFieldName%>");
			if (pWordField.value == "")
			{
				pWordField.focus();
				pWordField.select();
			}
			else
			{
				document.getElementById("loginbutton").focus();
			}
		}
		window.setTimeout("document.location='exit.jsp?logintimeout=1'", <%=(session.getMaxInactiveInterval() - 10) * 1000%>);
	
		if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1)
		{
			setTimeout(hideURLbar, 0);
		}
	}
	
	function loginSetup()
	{
		showWait();
<%		if (s.isConnected())
		{
%>			hiddenFrame = parent.document.getElementById("commframe");
			if (hiddenFrame != null)
			{
				var debugwindow = parent.document.getElementById("dockedHiddenFrame");
				debugwindow.style.width=50;
				debugwindow.style.height=50;
				hiddenFrame.style.width=50;
				hiddenFrame.style.height=50;
				debugwindow.style.visibility="hidden";
				hiddenFrame.style.display="none";
				parent.showWait();
			}
<%		}
%>	}

	function selectLanguage()
	{
		var langform = document.getElementById("langform");
		var username = document.getElementById("<%=userFieldName%>");
		if(username && username.value)
		{
			langform.languser.value = username.value;
		}
		langform.submit();
	}

	function showWait()
	{
		document.body.style.cursor="wait";
		document.body.onkeydown = noKeys;

		var lb = document.getElementById("loginbutton");
		if (lb)
		{
			lb.disabled = true;
			lb.setAttribute("aria-disabled", "true");
		}

		var main_tbl = document.getElementById("main_tbl");
		if (main_tbl)
		{
			main_tbl.style.display = "none";
			main_tbl.setAttribute("aria-hidden", "true");
		}
	}

	function noKeys(event)
	{
		event = event || window.event;
		event.cancelBubble = true;
		event.returnValue = false;
		return false;
	}

	function hideURLbar()
	{
		window.scrollTo(0, 1);
	}
	</script>
</body>
<%@ include file="../common/webreplayLogin.jsp" %>
</html>
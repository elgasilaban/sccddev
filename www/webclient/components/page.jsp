<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006,2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="java.net.URLEncoder"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="psdi.webclient.system.dojo.Dojo"
%><%@include file="../common/simpleheader.jsp"
%><%@include file="../common/reportrunner.jsp"
%><%
boolean debugHiddenFrame = (debug && Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("debughiddenframe", "false")));
boolean allowInSubFrame = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.allowinsubframe", "false"));
boolean mobileDatePicker = ismobile;
String sessionid = wcs.getUISessionID();
String sessionUrlParam = wcs.getUISessionUrlParameter() + wcs.getCSRFTokenParameter();
String presentationid = app.getId();
boolean everyplace = WebClientRuntime.getWebClientRuntime().hasLicenseAccess("EVERYPLACE");
String userLocale = s.getUserInfo().getLocale().getLanguage();
String viewportSize = app.getProperty("viewport");
String viewportWidth = "0";
String viewportHeight = "0";
java.util.Locale locale = new java.util.Locale(userLocale);
String datePattern=MXFormat.getDatePattern(locale);
String timePattern=MXFormat.getTimePattern(locale);
Boolean simpledomainDownload = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_SIMPLEDOMAINDOWNLOAD, "1").equals("1");
Boolean clientDataValidation = app.isAsyncEnabled() && WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTDATAVALIDATION, "0").equals("1");
Boolean systemNavBar = wcs.showSystemNavBar(currentPage);
String maximoJSDirectory = Dojo.getMaximoJavascriptDirectory(request);
boolean fp7504 = WebClientRuntime.is7504FPEnabled();
boolean newApplinking = app.inAppLinkMode() && fp7504;
int applinkDivs = 0;
int xIndex = viewportSize.indexOf('x');
String filePromptText = WebClientRuntime.getWebClientSystemProperty("mxe.doclink.usefileprompt", "0");
boolean vertLabels = wcs.useVerticalLabels();
if(xIndex!=-1)
{
	viewportWidth  = viewportSize.substring(0,xIndex);
	viewportHeight = viewportSize.substring(xIndex+1);
}
if(ismobile)
{
	//Mobile apps will always use the mobile skin.
	app.setSkin("mobile");
}
else
{	//Otherwise if a skin is defined for the presentation that will be used.
	app.setSkin(app.getProperty("skin"));
}
wcs.applySkin();
skin = wcs.getSkin();
String skinName = wcs.getSkinName(); 
String maximoJSSkinDirectory = (skinName.equals("") || skinName.equals("classic"))?"/javascript/"+maximoJSDirectory:"/"+skin+"css/../js/";
IMAGE_PATH = wcs.getImageURL();
CSS_PATH = wcs.getCssURL();

boolean debugDojo = "1".equals(WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DOJO_DEBUG, "false")) || "1".equals(request.getParameter("debugDojo"));

String cssFile = component.getProperty("cssfile");
String fpCssFile = "maximo_ex";
if(rtl)
{
	cssFile = "RTL"+cssFile;
	fpCssFile = "RTL"+fpCssFile;
}
app.getHotkeys().reset();
request.setAttribute(WebClientSessionManager.UISESSIONID, sessionid);
boolean rerender = (designmode && component.needsRender() && hiddenFrame);
Stack appStack = control.getWebClientSession().getAppStack();
if(component.needsRender())
{
	String apptitle = control.getWebClientSession().getCurrentApp().getAppTitle();
	if(!rerender)
	{	
		if(BidiUtils.isBidiEnabled())
		{
			
			String[] bidiTagAttributes = {"","",""};
			bidiTagAttributes = BidiClientUtils.getTagAttributes(null,null,apptitle,false);
			if(bidiTagAttributes[2] != null && bidiTagAttributes[2].length() > 0)
			{
				apptitle = BidiUtils.enforceBidiDirection(apptitle,bidiTagAttributes[2]);
			}
		}
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="<%=langcode.toLowerCase()%>">
	<head>
		<%	boolean useabsimgpath = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabsoluteimagepath"));
			if(useabsimgpath==true) { %>
				<script>
					var loc = String(document.location);
					if(loc.indexOf("/ui/")==-1) {
						window.location= "<%=request.getRequestURL()%>";
					}
				</script>
		<%	} %>
		<title><%=apptitle %></title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/javascript/<%=dojoDirectory%>/dojo/resources/dojo.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/javascript/<%=dojoDirectory%>/dojo/resources/dnd.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/javascript/<%=dojoDirectory%>/dojox/html/resources/ellipsis.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/javascript/<%=dojoDirectory%>/dijit/themes/tundra/tundra.css"/>
		<link id="csslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/<%=cssFile%>"/>
<%	if(fp7504) { %>
		<link id="csslink_ex" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/<%=fpCssFile%>.css"/>
<%	}
	if(mobileDatePicker)
	{
%>		<link id="datecsslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/datepicker.css"/>
<%	}
%>		<link rel="shortcut icon" href="<%=IMAGE_PATH%><%=app.getProperty("favoriteicon")%>"/>
		<link rel="apple-touch-icon" href="<%=IMAGE_PATH%><%=app.getProperty("appleicon")%>"/> 
		<meta http-equiv="imagetoolbar" content="no"/>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
		<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<%	if(rtl) //viewport not well supported for bidi settings by mobile browsers
	{	
		if(wcs.getUserAgent()!=WebClientSession.AGENT_SAFARI) { 
		//rtl on safari ios6 is having issues when yo ufocus on a field. (scrolls to incorrect location)
		// We have decided to not set a viewpport in ios at this time to solve this problem until ios fixes it.
	%>	<meta name="viewport" content="initial-scale=1.0"/>
	<%	}
	}
	else
	{
%>		<meta name="viewport" content="width=480, initial-scale=1.0"/>
<%	}
%>		<meta name="format-detection" content="telephone=no"/>

<%@ include file="../common/imagepreload.jsp" %>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>deprecated.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>constants.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>prototype.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>browser_library.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>menus.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>navsection.js"></script>
<% 	if(fp7504) { %>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>navsection_ex.js"></script>
<%	}
	if(BidiUtils.isBidiEnabled())
	{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>bidi_library.js"></script>
<%	}
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>library.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>library_ex.js"></script>
		<script type="text/javascript" src="<%=servletBase%><%=maximoJSSkinDirectory%>skinlibrary.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>async.js"></script>
<%	if(mobileDatePicker)
	{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>datepicker.js"></script>
<%	}
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>designer.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>wfdesign.js"></script>
<%	if(!designmode)
	{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>sessiontimer.js"></script>
<%	}	%>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>dataproxy.js"></script>
		<script type="text/javascript">
			var clientAreaId = "";
			document.title="<%=apptitle%>";
			isBidiEnabled = <%=BidiUtils.isBidiEnabled()%>;
			var APP_KEY_LABEL = "<%=app.getKeyLabel()%>";
			var IMAGE_PATH="<%=IMAGE_PATH%>";
			var MAINDOC=document;
			// No more hidden document, so set it to current document for backwards compatibility.
			var HIDDENDOC=document;
			var IFRAMEPAGE = "<%=wcs.getMaximoRequestContextURL() + "/ui/maximo.jsp?" + sessionUrlParam + (designmode ? "&designmode=true" : "")%>";
<%			String XHRAction = wcs.getMaximoRequestContextURL()+"/ui/maximo.jsp";
			if(wcs.getTipPortalMode())
				XHRAction = wcs.getProxyRequestContextURL()+"?hiddenform=true&" + sessionUrlParam;
%>			var XHRACTION = "<%=XHRAction%>";
<%
			String PORTLETACTION = wcs.getMaximoRequestContextURL()+"/webclient/components/portletrenderer.jsp?" + sessionUrlParam;
			if(wcs.getTipPortalMode())
				PORTLETACTION = wcs.getProxyRequestContextURL()+"/webclient/components/portletrenderer.jsp?hiddenform=true&" + sessionUrlParam;

%>			var PORTLETACTION = "<%=PORTLETACTION%>";
            var USEFILEPROMPT = "<%=filePromptText%>";
            var VERTLABELS = "<%=vertLabels%>";
			var DESIGNMODE=<%=designmode%>;
			var APPTARGET="<%=app.getId()%>";
			var DEBUGLEVEL = <%=debuglevel%>;
			var SCREENREADER = <%=accessibilityMode%>;
			var WEBREPLAY = <%=wcs.isWebReplayEnabled()%>;
			var FOCUSDELAY = 300;
			var UNLOAD_WARN = "<%=wcs.getMessage("ui","unload")%>";
			var SKIN = "<%=skin%>";
			var USERLOCALE="<%=userLocale%>";
			var MSG_BTNCLOSE = <%=wcs.MSG_BTNCLOSE%>;
			var MSG_BTNOK = <%=wcs.MSG_BTNOK%>;
			var MSG_BTNCANCEL = <%=wcs.MSG_BTNCANCEL%>;
			var MSG_BTNYES = <%=wcs.MSG_BTNYES%>;
			var MSG_BTNNO = <%=wcs.MSG_BTNNO%>;
			var MSGBOX_TITLE = "<%=wcs.getMessage("ui","msgboxtitle")%>";
			var EXCEPTION_NONE          = <%=BaseInstance.EXCEPTION_NONE %>;
			var EXCEPTION_WARNING       = <%=BaseInstance.EXCEPTION_WARNING %>;
			var EXCEPTION_ERROR         = <%=BaseInstance.EXCEPTION_ERROR %>;
			var EXCEPTION_YESNOCANCEL   = <%=BaseInstance.EXCEPTION_YESNOCANCEL %>;
			var EXCEPTION_REQUIREDFIELD = <%=BaseInstance.EXCEPTION_REQUIREDFIELD %>;
			var EXCEPTION_INFO          = <%=BaseInstance.EXCEPTION_INFO %>;
			var REQUESTTYPE_ASYNC     = "<%=WebClientSession.RequestType.ASYNC.toString()%>";
			var REQUESTTYPE_HIGHASYNC = "<%=WebClientSession.RequestType.HIGHASYNC.toString()%>";
			var REQUESTTYPE_SYNC      = "<%=WebClientSession.RequestType.SYNC.toString()%>";
			var REQUESTTYPE_NORENDER  = "<%=WebClientSession.RequestType.NORENDER.toString()%>";
			var REQUESTTYPE_NONE      = "none";
			var REQUESTTYPE_DEFAULT   = "default";
			var REQUESTTYPE = "<%=WebClientSession.REQUESTTYPE%>";
			var JAVASCRIPT_BASE = "<%=servletBase%>/javascript/<%=dojoDirectory%>/";
			var DEBUG_DOJO = <%=debugDojo%>;
			var SERVER_UPDATE_WARN="<%=wcs.getMessage("async","server_update_field")%>";
			var SERVER_UPDATE_BUTTON="<%=wcs.getMessage("async","server_update_insert")%>";
			var SERVER_CLEAR_WARN="<%=wcs.getMessage("async","server_update_field_clear")%>";
			var SERVER_CLEAR_BUTTON="<%=wcs.getMessage("async","server_update_clear")%>";
			var CONTAINER_ERROR_ICONS = <%=wcs.getContainerErrorIconJSON()%>;
			var menus;
			var topLevelMenus = new Array();
			var tpaeConfig = {
				fp7504 : <%=fp7504%>,
				extendedTooltipShowDelay: 1000,
				extendedTooltipHideDelay: 500,
				tabBreadCrumbs: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_TABBREADCRUMBS,"0").equals("1")%>,
				clientDataValidation: <%=clientDataValidation%>,
				validationOn: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTDATAVALIDATION, "0").equals("1")%>,
				menuHideDelay : <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_MENUHIDE_DELAY, "0")%>,
				clientEventQueue: {
					timeout: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTEVENTQUEUETIMEOUT, "10000")%>,
<%					if(clientDataValidation)
					{
%>					threshold: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTEVENTQUEUETHRESHOLD, "2")%>
<%					}
					else
					{
%>					threshold: 1
<%					}
%>				}
			};
			queueManager = new QueueManager({sessionid:decodeURIComponent("<%=URLEncoder.encode(sessionid)%>"), designmode:<%=designmode%>, threshold:tpaeConfig.clientEventQueue.threshold, timeout:tpaeConfig.clientEventQueue.timeout, csrftoken:'<%=wcs.getCSRFToken()%>'});
			/* 
			*	Do images last so that special bindings done in inputs do not overwrite related field events for hover images
			* 	May wish to change all bindings in bindEvents to use dojo.connect in the future
			*/
			var eventBindObjects = new Array("a","div","input","button","select","span","textarea","fieldset","img");
			var LEAVE_TIMEOUT = <%=WebClientRuntime.getWebClientSystemProperty("mxe.webclient.exitcontexttimeout", "0")%>;
<%			if(!designmode)
			{
				String product;
				if(session.getAttribute("product") == null)
				{
					if(wcs.isMaximoOrTivoliBrand())
						product = wcs.getMessage("system","maximoproductname");
					else
						product = wcs.getMessage("system","nonmaximoproductname");

					session.setAttribute("product", product);
				}
				else
				{
					product = (String)session.getAttribute("product");
				}
				product += " - " + wcs.getAppDesc(wcs.getCurrentAppId());  //e.g Maximo - Purchase Orders or CCMDB - Service Desk
				String logOutPage = WebClientRuntime.getWebClientProperty("webclient.logoutpage");
				String maximoRequestURL = wcs.getMaximoRequestURL();
				String logOutUrl = new java.net.URL(new java.net.URL(maximoRequestURL), logOutPage).toString() + "?" + sessionUrlParam;
%>
			var PRODUCTNAME = "<%= product%>";
			SESSION_TIMEOUT = <%=session.getMaxInactiveInterval()%>;//in seconds
			timeUntilLogout=SESSION_TIMEOUT;//in seconds
			SESSION_WARNTIMEOUT = <%=Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.sessiontimeoutwarningtime","0"))*60%>;//in seconds.
			SESSIONRESETTHRESHHOLD = SESSION_TIMEOUT/3;//in seconds.
			var WARNTEXTMINS = "<%=wcs.getMessage("ui","warnbrowsersessiontimeout")%>";
			var WARNTEXTSECS = "<%=wcs.getMessage("ui","warnbrowsersessiontimeoutsecs")%>";
			var WARNLOSTCONNECTION =  "<%=wcs.getMessage("ui","warnlostconnection")%>";
			var WARNCONNECTIONRESTORED =  "<%=wcs.getMessage("ui","warnconnectionrestored")%>";
			var CONNECTIONRESTOREDBTNTEXT =  "<%=wcs.getMessage("messagebox", "MSG_BTNOK")%>";
			var WARNLOSTURL  = "<%=wcs.getMaximoRequestContextURL()+"/ui/" + System.currentTimeMillis() + "?checkhiddenandconnection=true&" + sessionUrlParam%>";
			var SHOWLOSTCONNECTIONWARNINGONLY = <%=designmode?"false":WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionwarningonly","false")%>;
			var CONNECTIONREDRAWURL  = "<%=wcs.getMaximoRequestContextURL()+ "/ui/maximo.jsp?event=render&targetid=" + presentationid + "&value=rerender&conectionwarningclosed=true&" + sessionUrlParam%>";
			CONNECTIONWARNINGINTERVAL = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionwarninginterval","15"))*1000%>;//in milliseconds.
			CONNECTIONRECHECKINTERVAL = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionrecheckinterval","2"))*1000%>;//in milliseconds.
			var ASYNCTOOLTIPWAITEBEFOREOPEN = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.asyncerrortooltipwaitbeforeopen","2"))*1000%>;//in milliseconds.
			var ASYNCTOOLTIPUSERVALUE =  "<%=wcs.getMessage("messagebox","MSG_LBENTER")%>";
			var MAXRCURL = "<%=wcs.getMaximoRequestContextURL()%>";
			var TIMEOUTRESETURL = "<%=wcs.getMaximoRequestContextURL()+"/servlet/sessionservlet?resetsession=true"%>";
			var LOGOUTURL = "<%= logOutUrl%>";
<%			} //endif !designmode
			long pageSeqNumber = 1;
			AsyncRequestManager asyncManager = wcs.getAsyncRequestManager();
			if (asyncManager != null)
			{
				asyncManager.resetRequestSequenceNumber();
				pageSeqNumber = asyncManager.getNextPageRenderSeqNumber();
			}
%>			var PAGESEQNUM = "<%=pageSeqNumber%>";
			var UISESSIONID = decodeURIComponent("<%=URLEncoder.encode(sessionid)%>");
			var CSRFTOKEN = "<%=wcs.getCSRFToken()%>";
			var loadMethods = new Array;
			function addLoadMethod(method)
			{
				loadMethods.push(method);
			}
			var USERNAME="<%=s.getUserInfo().getUserName()%>";
			var USERLANG="<%=langcode%>";
			var MOBILE=<%=ismobile%>;
			var MOBILEAGENT = <%=wcs.isMobileUserAgent()%>; 
			var MOBILEDATEPICKER=<%=mobileDatePicker%>;
			var OUTOFSEQERRORMSG="<%=wcs.getMessage("system", "outOfOrderReqTimeout")%>";
			var OUTOFSEQERRORRELOADBUTTON="<%=wcs.getMessage("system", "outOfOrderReloadButtonTxt")%>";
			var CONNECTIONERRORMSG="<%=WebClientRuntime.replaceString(wcs.getMessage("ui", "cannotconnect"), "\n", "<br/>")%>";
			var UNKNOWSERVERERRORMSG="<%=WebClientRuntime.replaceString(wcs.getMessage("ui", "unknowservererror"), "\n", "<br/>")%>";
<%		if(mobileDatePicker)
		{
%>			var calDate = new Date();
<%		}
%>			var warnExit = <%="1".equals(WebClientRuntime.getWebClientSystemProperty("webclient.exitwarn", "1"))%>
			addLoadMethod("hideURLbar();");
			addLoadMethod("stopDocScroll();");
<%
		if(clientDataValidation)
		{
			JSONArray domainList = new JSONArray();
			for(Map.Entry<String, DataStoreInfo> dataStoreEntry : app.getEntityRelationshipModel().getDataStoreList().entrySet())
			{
				DataStoreInfo dataStoreInfo = dataStoreEntry.getValue();
				if (simpledomainDownload || !dataStoreInfo.isSimpleDomain())
				{
					domainList.add(dataStoreInfo.getAsJSONForDownload());
				}
			}
%>			var TABLEDOMAINLIST = <%=domainList.serialize(debug)%>;
			var INVALIDFILENAMEMSG="<%=wcs.getMessage("iface", "InvalidFileName")%>";
<%		}
%>		</script>
<%
		String dojoTextDirection = "";
		String dojoLocale;
		// Handle a few special cases where the Maximo language code needs a little massage to
		// be the correct dojo locale.
		if ("ZHT".equalsIgnoreCase(langcode))
			dojoLocale = "zh-tw";
		else if ("NO".equalsIgnoreCase(langcode))
			dojoLocale = "nb";
		else
			dojoLocale = langcode.toLowerCase().replace('_', '-');
		
		if(rtl)
		{
			dojoTextDirection = "dir=\"rtl\"";
		}
%>		<script type="text/javascript">
			var djConfig =
			{
<%				if (debuglevel >= 3)
				{
%>					popup: true,
<%				}
%>				isDebug: <%=debugDojo && debuglevel >= 3%>,
				modulePaths: {
<%						if(Dojo.isDevelopmentBuild()) {
%>							'ibm':'../../ibm',
<%						}
%>							'com.ibm.mm':'/enabler/js/com/ibm/mm',
							'com.ibm.mashups':'/enabler/js/com/ibm/mm',
							'com.ibm.widgets':'/enabler/js/com/ibm/widgets'},
				parseOnLoad: false,
				locale: '<%=dojoLocale%>',
				extraLocale: ['<%=userLocale.toLowerCase().replace('_', '-')%>']
			};
			var DOJOLOCALE="<%=dojoLocale%>";
		</script>
<%	if (debugDojo)
	{
		// If we're in debug mode, load the uncompressed layers
%>		<script type="text/javascript" src="<%=basePath%>/javascript/<%=dojoDirectory%>/dojo/dojo.js.uncompressed.js"></script>
<%		for (String layer : Dojo.getDojoLayers("/webclient/javascript/" + dojoDirectory + "/layers/", request.getSession().getServletContext()))
		{
%>		<script type="text/javascript" src="<%=basePath%>/javascript/<%=dojoDirectory%>/layers/<%=layer%>"></script>
<%		}
	}
	else
	{
%>
		<script type="text/javascript" src="<%=basePath %>/javascript/<%=dojoDirectory%>/dojo/dojo.js" djConfig="parseOnLoad:true"></script>
<%	}
		// We need to load window.js as it is used in the showwait() function in library.js.
%>		<script type="text/javascript" src="<%=basePath%>/javascript/<%=dojoDirectory%>/dojo/window.js"></script>
		<script type="text/javascript" src="<%=basePath%>/javascript/<%=maximoJSDirectory%>dojo_library.js"></script>
		<script>
			var MAXRECENTAPPS = <%=WebClientRuntime.getWebClientSystemProperty("webclient.maxRecentApps", "8")%>;
			var RECENTAPPTEXT = "<%=wcs.getMessage("ui", "recentApps")%>";
			<%	String appId = wcs.getCurrentAppId();
				if(fp7504 && app.getTrackInRecents() && !app.inAppLinkMode()){%>
					addToAppCache({"text":"<%=apptitle%>","id":"recentApp_<%=appId%>","eventvalue":"<%=appId%>"});
			<%}%>
			var hebrew=false;
			var islamic=false;
			dojo.require('layers.mbs.popuplayer');
			dojo.addOnLoad(function() {
				if(dojo.isFF >= 4 || dojo.isFF==0){ //problem with 3.6 and dojox.html.ellipsis
					dojo.require("dojox.html.ellipsis");
				}
				dojo.require("ibm.tivoli.mbs.html");
				dojo.require("dojo.number");
				dojo.require('dijit._base.popup'); 
				dojo.require('dijit.Tooltip');
				dojo.require('dojo.dnd.Moveable');
				dojo.require("dojo.dnd.move");
				dojo.require("dojo.fx");
				// Workaround to set the starting z index for dojo popups and tooltips above the maximo dialog.
				dojo.addOnLoad(dojohelper.fixPopupZIndex);
			});
		</script>
<%		
		// In portal mode and designmode, don't put in the iframe busting code as we need to run in an iframe.
		if (!wcs.getPortalMode() && !allowInSubFrame && !designmode)
		{
%>			<style>html { display:none }</style>
			<script>
				if (self == top) {
					document.documentElement.style.display = 'block';
				} else {
					top.location = self.location;
				}
			</script>
<%		}
	//Allows support of internal srolling in apps with navbar
	String scroll = component.getProperty("scroll");
	if(!systemNavBar && !ismobile)
	{
		scroll="false";
	}
	String overflow = "";
	if(scroll.equals("false") && !designmode)
	{
		scroll = "scroll='no' ";
		overflow = "overflow:hidden;";
	}
	else
	{
		scroll = "";
	}
%>	</head>
	<body role="application" <%=scroll%>class="tundra<%if(app.getId().equals("startcntr")){%> scBody<%}%>" <%=dojoTextDirection%> style="<%=overflow%>cursor:wait;padding:0px;margin:0px;height:100%;width:100%"
		onkeydown="<%if(!designmode){%>resetLogoutTimer(false);<%}%>if(working){cancelEvent(event);};if(event.keyCode==78 && event.ctrlKey && !event.altKey){window.open();return false;};<% if(designmode){%>parent.sendDesignerKey(event)<%}else{%>if(hasKeyCode(event, 'KEYCODE_BACKSPACE') && (getSourceElement(event).type == 'undefined' || !(getSourceElement(event).type.indexOf('text') >= 0 || getSourceElement(event).type == 'password'))) cancelEvent(event); if (appHotkey(event) == false) { if(menus){menus._hideMenu();} if(event.ctrlKey && event.altKey){if(event.keyCode==70){ qsTB=getQSTB(); if(qsTB){ qsTB.focus();} }}}<%}%>"
		onclick="if(getSourceElement(event).id!='wait'){hideAllMenus(false);}" <% if(designmode || app.getId().equals("designer")){%>oncontextmenu="return false;"<%}%>>
		<%@include file="page_ex.jsp"%>
<%		if(designmode)
		{
%>			<div id="body_double">
<%		}
	}
	else	// else for if (!rerender) block
	{	
	
		// gets executed when viewport is changed in designer (DesignerAppBean.setValue calls setRerenderFlags)
		// or when toggle viewport button is clicked
		if (designmode) 
		{
			holderId = "body_double";
%><%@ include file="../common/componentholder_start.jsp" %>
	<script>
			setSkin('<%=servletBase%>/<%=skin%>css/<%=cssFile%>');

			parent.viewportHeight = <%= viewportHeight %>;
			parent.viewportWidth = <%= viewportWidth %>;
			viewportHeight = <%= viewportHeight %>;
			viewportWidth = <%= viewportWidth %>;

<%			if (currentPage.showViewport() && everyplace)
			{
%>				parent.showViewport();
<%			}
			else
			{
%>				parent.fadeViewport();
<%			}
		}
%>
	</script>
<%	}	// end else for if (!rerender) block

%>		<table id="menuholder" style="position:absolute;z-index:50000;top:0px;left:0px;display:inline;" role="presentation"><tr><td id="menuholdertd" width="100%"></td></tr></table>
		<!-- used to remove select of text when item cannot take select DO NOT REMOVE --><label for="tempselect" aria-hidden="true" style="display:none">TEMPSELECT</label><input type="text" id="tempselect" aria-hidden="true" <%if(accessibilityMode){%>tabindex="-1" <%}%>style="position:absolute;top:-1000"/>
		<table id="<%=id%>" class="<%=cssclass%>" summary="" width="100%" <%if(!designmode){%>height="100%"<%}%> style="vertical-align:top;" role="presentation">

<%}  // end if(component.needsRender() block
boolean longOpRunning = wcs.hasLongOpStarted() && !wcs.hasLongOpCompleted();
if ( !component.skipRender()  && !longOpRunning)
{
	component.renderChildComponents();
}
%><%@ include file="../common/webreplay.jsp" %><%
if(component.needsRender())
{
%>	</table>
	<table id="dialogholder" style="position:absolute;top:0px;<%=defaultAlign%>:0px;" role="presentation">
		<tr>
			<td id="dialogholdertd" width="100%" aria-live="polite"></td>
			<td id="popupholdertd" width="100%" onClick="cancelBubble(event);" aria-live="polite" role="presentation"></td>
<%if (longOpRunning)
	{
		//long op is in progress so only want to render the the longop dialog
		PageInstance longOpWait = app.getCurrentPage();
		if (longOpWait.get("_longopPage") != null)
		{
			%><td><%
			((PageComponent)component).renderDialog(longOpWait, true);
			%></td><%
		}
	}
	else
	{
		for (int pageidx = 1; pageidx < app.getPageStack().size(); pageidx++)
		{
%>		<td aria-live="polite"><%
			PageInstance dialogPage = (PageInstance)app.getPageStack().get(pageidx);
			((PageComponent)component).renderDialog(dialogPage, true);
		%></td>
<%		}
	}
%>		</tr>
	</table>
<%		if(!designmode)
		{
			int timeOutWarning = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.sessiontimeoutwarningtime","0"));
			if(timeOutWarning !=0 )
			{
				%><%@ include file="timeoutwarning.jsp" %><%
			}
		}
%>		<div id="wait" width="100%" height="100%" class="wait" style="position:absolute;top:0px;<%=defaultAlign%>:0px;height:100%;width:100%">&nbsp;</div>

<%@ include file="hiddenframe.jsp" %>

	<script>
		dialogCount=0;//all dialogs increase the count when _init (on refresh and straight render of page)
<%		// Build the hotkey array of arrays
		Hotkeys hotkeys = app.getHotkeys();
		Iterator i = hotkeys.getKeycodes().iterator();
		while (i.hasNext())
		{
			int keycode = ((Integer)i.next()).intValue();
%>		appHotkeys[<%=keycode%>] = new Array(
<%
			Iterator keys = hotkeys.getHotkeysForKeycode(keycode).iterator();
			while (keys.hasNext())
			{
				List params = (List)keys.next();
				boolean ctrl = ((Boolean)params.get(Hotkeys.IDX_CTRL)).booleanValue();
				boolean alt = ((Boolean)params.get(Hotkeys.IDX_ALT)).booleanValue();
				String target = (String)params.get(Hotkeys.IDX_TARGET);
				String eventname = (String)params.get(Hotkeys.IDX_EVENT);

%>			new Array(<%=ctrl%>, <%=alt%>, "<%=target%>", "<%=eventname%>")<%
				if (keys.hasNext())
				{
%>,
<%				}
			}
%>
		);
<%
		}
%>		fixPasswordFields();
		if(DESIGNMODE)
		{
			parent.unLockWait();
			parent.hideWait();
		}
<%		if(!designmode)
		{
%>			startLogoutTimer();
			startTimer();
<%		}	%>
	</script>
<%	if(designmode)
	{	%>
	</div>
<%	}	%>	
	<script>
		if(tpaeConfig.validationOn)
		{
			setButtonEnabled(saveButton,<%=((AppBean)app.getAppBean()).hasModifications()%>);
		}
	</script>
<%
}	// end if(component.needsRender()) block
JSONObject autoFillInfo = ((PageInstance)control).getAutoFillInfo();
if(!rerender)
{
	
	if(component.needsRender())
	{	

		if(designmode)
		{
			// if in designmode and rendering for the first time... whether it's shown or not, set the viewport 
			// and ismobile values on maxapps.  event is handled by DesignerAppBean
%>			<script>			
				addLoadMethod("parent.sendEvent('setmobilefields', 'designer', '<%= viewportSize %>')");
			</script>
<%								
			if(currentPage.showViewport())
			{
%>	<div id="viewport_right" class="viewport" style="height: <%=viewportHeight%>px;"></div>
	<div id="viewport_left" class="viewport" style="height: <%=viewportHeight%>px;"></div>
	<div id="viewport_bottom" class="viewport" style="width: <%=viewportWidth%>px; overflow: hidden; top: <%=viewportHeight%>px;"></div>
	<div id="viewport_top" class="viewport" style="width: <%=viewportWidth%>px; overflow: hidden; top: 1px;"></div>
	<div id="viewport_tail" class="viewport" style="height: 5000px; top: <%=viewportHeight%>;"></div>
	<div id="viewport_corner" class="viewport" style="overflow: hidden; top: <%=viewportHeight%>;"></div>
<%			}	// end if(currentPage.showViewport())
		}	// end if(designmode)
		Map<String, String> changedErrorContainers = currentPage.getChangedErrorContainers();
		if(changedErrorContainers != null)
		{
			changedErrorContainers.clear();
		}
%>
	<div id="storage" style="display:none"></div>
<%
		if(mobileDatePicker)
		{
		%><%@ include file="../common/datepicker.jsp" %><%
		}
	%><%@ include file="asyncerrortooltipdialog.jsp" %>
	<%=getClosingDivs(newApplinking, applinkDivs)%>
</body>
<script>
menus = new MenuController("shared","<%=wcs.getMessage("ui","typeahead_next")%>","<%=wcs.getMessage("ui","typeahead_previous")%>","<%=wcs.getMessage("ui","typeaheadsearch")%>","<%=wcs.getMessage("ui","typeaheadsearchfor")%>");
menus["handlerId"] = "<%=currentPage.getMenuHandlerId()%>";
<%	if(autoFillInfo!=null)
	{
%>updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo%>);
<%	}
%>
function processLoadMethods()
{
	while(loadMethods.length > 0)
	{
		var loadMethod = loadMethods.shift();
		try
		{
			if(DEBUGLEVEL > 1)
			{
				console.debug(loadMethod);
			}
			eval(loadMethod);
		}
		catch(error)
		{
			console.error("LoadMethod error["+error.description+"]. Unable to process: ["+loadMethod+"]");
		}
	}
}
function getQSTB()
{
	return getElement("<%=component.getControl().getPage().get("quicksearchtextbox")%>");
}
sizeCanvas();
<% 	if(!designmode && !wcs.getPortalMode())
	{
%>	window.onbeforeunload = promptSessionLeave;
<%	}
%><%@ include file="menucache.jsp" %>
<%	if(clientDataValidation)
	{
%>
		loadDomains(TABLEDOMAINLIST);
<%	}	%>
</script>
</html>
<%	}
	else	// else block for if(component.needsRender())
	{
		((PageComponent)component).renderDialogs(false);
		// Check if we've been instructed to open a URL in a new window
		List listurls = (List)app.remove("openMultipleUrls");
		if(listurls != null)
		{
			for (int i = 0; i < listurls.size(); i++)
			{
				Map<String,String> urlprop = (Map<String,String>)listurls.get(i);
				String url = urlprop.get("url");
				// Double escape special chars since the url goes into a quoted string inside another quoted strings in javascript
				StringBuilder builder = new StringBuilder();
				int length = url.length();
				for(int j = 0; j < length; j++)
				{
					char ch = url.charAt(j);
					if(ch == '\\')
					{
						builder.append("\\\\\\");
					}
					else if(ch == '\"')
					{
						builder.append("\\\\");
					}
					else if(ch == '\'')
					{
						builder.append('\\');
					}
					builder.append(ch);
				}
				url = builder.toString();
				String windowId = urlprop.get("windowId");
				if(windowId != null)
				{
%>				<finalscript><![CDATA[
					stopFocus=true;
					addLoadMethod('openURL("<%=url%>", "<%=windowId%>" <%
							String options = urlprop.get("windowOptions");
							if(options != null && !options.isEmpty())
							{
								%>, "<%=options%>"<%
							}
						%>);');
				]]></finalscript>
<%				}
				else
				{
%>				<finalscript><![CDATA[
					parent.document.location="<%=url%>";
				]]></finalscript>
<%				}
			}
		}
		String external = (String)app.get("launchexternal");
		if (!WebClientRuntime.isNull(external))
		{
			app.remove("launchexternal");
%>			<finalscript><![CDATA[			
				var WshShell =  new ActiveXObject("WScript.Shell");
				var external = "<%=external%>";
				WshShell.Run(external,10,false)
			]]></finalscript>
<%		}
		if(clientDataValidation)
		{
			List<DataStoreInfo> createdDataStores = control.getPage().getDialogDataStores();
			if (createdDataStores != null)
			{
				JSONArray domainList = new JSONArray();
				for(DataStoreInfo dataStoreInfo : createdDataStores)
				{
					if (simpledomainDownload || !dataStoreInfo.isSimpleDomain())
					{
						domainList.add(dataStoreInfo.getAsJSONForDownload());
					}
				}
%>			<finalscript><![CDATA[
				loadDomains(<%=domainList.serialize(debug)%>);
			]]></finalscript>
<%			}
		}

		if(autoFillInfo != null)
		{
%>			<finalscript><![CDATA[
				updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo%>);
			]]></finalscript>
<%		}
	}	// 	end else block for if(component.needsRender())
	control.getPage().remove("controlrenderhash");
}
else	// else block for if(!rerender)
{
%>	<%@ include file="../common/componentholder_end.jsp" %>
<%}		// end else block for if(!rerender)
%><%@ include file="../common/componentfooter.jsp" %>
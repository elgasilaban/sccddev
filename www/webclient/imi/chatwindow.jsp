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
 * @version 1.34, 11/6/07
 * @file /cmvc/itsm/vc/0/4/1/2/s.56
 *
 * 
 ****************************************************************************/
-->
<%@ include file="im_session_setup.jsp"%>
<%@ page info="TSD Instant Messenger Integration"
	import="
		com.ibm.tivoli.imi.spi.IMUser.IMUserStatus,
		com.ibm.tivoli.imi.controller.SessionInfoHelper,
		com.ibm.tivoli.imi.controller.PartnerInfo,
		com.ibm.tivoli.imi.controller.Messages,
		psdi.webclient.system.dojo.Dojo,
		java.net.URLEncoder"%>
<%
	if(imSessionHandler == null) {
%>
		<script language="JavaScript" type="text/javascript">
			alert("<%=Messages.getString(session, "ALERT_INVALID_SESSION")%>");
			window.close();
		</script>
<%
		IMSessionHandler.logInfo("An attempt to open a chat window has failed because an IMSessionHandler could not be gotten, probably due to user does not have a valid MXSession");
		return; 
	}
	String relationship = request.getParameter("relationship");
	PartnerInfo partnerInfo = null;
	try {
		partnerInfo = imSessionHandler.getPartnerInfo(request);
		if(partnerInfo == null || partnerInfo.getIMPartnerID() == null || partnerInfo.getIMPartnerID().trim().equals("")) {
%>
			<script language="JavaScript" type="text/javascript">
				alert("<%=Messages.getString(session, "ALERT_ICON_NOT_SYNCHRONIZED")%>");
				window.close();
			</script>
<%
			IMSessionHandler.logDebug("An attempt to open a chat window has failed because IM icon was not synchronized");
			return;
		}
	} catch(Exception e) {
%>
		<script language="JavaScript" type="text/javascript">
			alert("<%=Messages.getString(session, "EX_INTERNAL_ERROR")%>");
			window.close();
		</script>
<%
		IMSessionHandler.logError("It was not possible to get partner info. Reason: " + e.getMessage(), e);
		return;
	}

	final String controlid = request.getParameter("controlid");
	final String uisessionid = request.getParameter("uisessionid");

	String sessionId = null;
	try {
		sessionId = SessionInfoHelper.getSessionId(request);
	} catch(Exception e) {
%>
		<script language="JavaScript" type="text/javascript">
			alert("<%=Messages.getString(session, "EX_INTERNAL_ERROR")%>");
			window.close();
		</script>
<%
		IMSessionHandler.logDebug("It was not possible to get session id. Reason: " + e.getMessage());
		return;
	}
	String maximoJSDirectory = Dojo.getMaximoJavascriptDirectory(request);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><%=Messages.getString(session, "WINDOW_CHAT_TITLE")%></title>
		<link rel=StyleSheet href="chat_styles.css" type="text/css" media="screen">
		<script language="JavaScript" type="text/javascript" src="../javascript/<%=maximoJSDirectory%>constants.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/<%=maximoJSDirectory%>library.js"></script>
		<script language="JavaScript" type="text/javascript">

			var url = "frontcontroller.jsp?action_code=CHAT_REFRESH&relationship=<%=relationship%>&controlid=<%=controlid%>&sessionid=<%=sessionId%>&uisessionid=<%=URLEncoder.encode(uisessionid)%>";
			var timeout = "10000";
			var stop = false;
			var abortCalled = false;
			var saveInfoDefined = false;
			var chatIdentifier = new Date().getMilliseconds();
			var partner = "<%=partnerInfo.getIMPartnerID()%>";
			

			function createXMLHttp() {
				var xmlhttp = null;
			    var ms = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp","Microsoft.XMLHttp"];
				
			    for (var i = 0; i < ms.length; i++) {
			        try {
			            xmlhttp = new ActiveXObject(ms[i]);
			            return xmlhttp;
			        } catch (ex) {
			        }
			    }
			    if(XMLHttpRequest != 'undefined' ) { 
			        try  { 
			            xmlhttp = new XMLHttpRequest();
			            return xmlhttp;
			        } catch  (e) {
			        } 
			    }
	        	return false; 
			}

			function setHeaders(xmlhttp, msg) {
			    xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			    xmlhttp.setRequestHeader("Pragma", "no-cache");
			    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			    xmlhttp.setRequestHeader("Accept", "application/soap+xml, application/dime, multipart/related, text/*");
			    xmlhttp.setRequestHeader("Content-Length", msg.length);
			    xmlhttp.setRequestHeader("stop", ((stop) ? "true" : "false"));
			    xmlhttp.setRequestHeader("chatIdentifier", chatIdentifier);
			    xmlhttp.setRequestHeader("partner", partner);
			}

			function sendMessage(msg) {
				if(abortCalled) {
					return;
				}
			
		        var xmlhttp = createXMLHttp();
		        if(xmlhttp) {

			        xmlhttp.onreadystatechange = function (xmlhttp) {
						return function() {
						    if(xmlhttp != null && xmlhttp.readyState == 4) {
						        if(xmlhttp.status == 200) {
						        	if(abortionLock(xmlhttp)) {
						        		return;
						        	}
						        	if(!saveInfoDefined) {
						        		verifySavingInfo(xmlhttp);
						        	}
						        	verifyAlertMessage(xmlhttp);
									verifyAbortion();
									var newMessage = xmlhttp.responseText;
									updateHTMLContent(newMessage);
						        } else {
						            updateHTMLContent("<%=Messages.getString(session, "WINDOW_ERR_MESSAGE")%>:\n" + xmlhttp.statusText);
						        }
						    }
					    };
					} (xmlhttp);

			        xmlhttp.open("POST", url, true);
			        setHeaders(xmlhttp, msg);
			        xmlhttp.send(msg);
				} else {
					updateHTMLContent("<%=Messages.getString(session, "WINDOW_ERR_MESSAGE")%>\n");
		        }
			}
			
			/*
			 * Return true only if this chat window has been already asked to
			 * be closed due to an abortion. This function tries to synchronize
			 * concurrent threads, once each response is handled in a new thread
			 * and the first one can be blocked due to Alert message box (waiting
			 * for user response)
			 */
			function abortionLock(xmlhttp) {
				if(abortCalled) {
					return true;
				}
			    var aborted = xmlhttp.getResponseHeader("aborted");
				if(aborted == "true") {
					abortCalled = true;
				}
				return false;
			}
			
			function verifySavingInfo(xmlhttp) {
	        	var willSave = xmlhttp.getResponseHeader("willSave");
                var savingInfo = document.getElementById("savingInfo");
				if(willSave == "false") {
					savingInfo.innerHTML = "<%=Messages.getString(session, "WINDOW_SAVING_INFO_dontSave")%>";
				} else {
					savingInfo.innerHTML = "<%=Messages.getString(session, "WINDOW_SAVING_INFO_save")%>";
				}
				saveInfoDefined = true;
			}
			
			function verifyAlertMessage(xmlhttp) {
	        	var alertMessage = xmlhttp.getResponseHeader("alert");
				if(alertMessage != null && alertMessage != "") {
					alert(alertMessage);
				}
			}
			
			function verifyAbortion() {
				if(abortCalled) {
					window.close();
				}
			}
			
			function updateHTMLContent(newMessage) {
	            if (newMessage != null && newMessage != "") {
	                var chatTextArea = document.getElementById("chatTextArea");
					chatTextArea.value = chatTextArea.value + newMessage + "\r\n";
					chatTextArea.scrollTop = chatTextArea.scrollHeight;					
	            }
			}
			
			function msgOnClick() {
                var msgTextArea = document.getElementById("msgTextArea");
			    sendMessage(msgTextArea.value);
			    msgTextArea.value = "";
			}
			
			function msgOnKeyPress(msgTextArea, event) {
			    if (event.keyCode != 13) {
			    	return;
			    }
		    	msg = msgTextArea.value;
			    if (hasCarriageReturn(msg)) {
			        sendMessage(msg, true);
			        msgTextArea.value = "";
			    }
			}
			
			/* Return true if this text has carriage return */
			function hasCarriageReturn(text) {
				var textChar;
				for (var i = 0; i < text.length; i++) {
					textChar = text.charAt(i);
					if (textChar == '\n' || textChar == '\f' || textChar == '\r') {
						return true;
					}
				}
				return false;
			}

			function stopChat() {
				stop = true;
				sendMessage("");
			}
			
			function refreshChat() {
				sendMessage("");
		        setTimeout("refreshChat()", timeout);
			}

			/*****************************************************/
			/* Constants values to help set widgets position	 */
			/*****************************************************/
				var ie = true;
				if(navigator.userAgent.indexOf("MSIE") == -1) {
			    	ie = false;
				}
				
				var TOP_USED_HEIGHT		= 80;
				var BOTTOM_USED_HEIGHT	= 56;
				
				var PIXELS_PER_ROW		= 16;
				var PIXELS_PER_COL		= 6;
				
				var CHAT_ROWS_FACTOR	= 7/10;
				var MSG_ROWS_FACTOR		= 3/10;
				
				var MIN_WINDOW_WIDTH	= 400;
				var MIN_WINDOW_HEIGHT	= 360;
			/*****************************************************/

			var resizeTextAreas = function () {

				var windowInnerWidth;
				var	windowInnerHeight;
			
				if (ie) {
				  	windowInnerWidth = document.body.clientWidth;
				  	windowInnerHeight = document.body.clientHeight;
				} else {
				  	windowInnerWidth = window.innerWidth;
				  	windowInnerHeight = window.innerHeight;
				}
			
				if (windowInnerWidth < MIN_WINDOW_WIDTH) {
					windowInnerWidth = MIN_WINDOW_WIDTH;
				}
				if (windowInnerHeight < MIN_WINDOW_HEIGHT) {
					windowInnerHeight = MIN_WINDOW_HEIGHT;
				}
			
				var availableWidth = windowInnerWidth;
				var availableHeight = windowInnerHeight - TOP_USED_HEIGHT - BOTTOM_USED_HEIGHT;
				
				var textAreaCols = availableWidth / PIXELS_PER_COL;
				var chatTextAreaRows = (availableHeight / PIXELS_PER_ROW) * CHAT_ROWS_FACTOR;
				var msgTextAreaRows = (availableHeight / PIXELS_PER_ROW) * MSG_ROWS_FACTOR;

	            var chatTextArea = document.getElementById("chatTextArea");
				chatTextArea.rows = chatTextAreaRows;
				chatTextArea.cols = textAreaCols;

                var msgTextArea = document.getElementById("msgTextArea");
				msgTextArea.rows = msgTextAreaRows;
				msgTextArea.cols = textAreaCols;

				var buttonTDPadding = (availableWidth - msgTextArea.clientWidth) / 2;

                var sendButtonTD = document.getElementById("sendButtonTD");
				sendButtonTD.style.paddingLeft = buttonTDPadding;

                var closeButtonTD = document.getElementById("closeButtonTD");
				closeButtonTD.style.paddingRight = buttonTDPadding;
			}

		</script>
	</head>
	<body onbeforeunload="stopChat();" onfocus="removeClass(document.getElementById('chatTextArea'),'chatTextAreaFocused'); removeClass(document.getElementById('msgTextArea'),'msgTextAreaFocused');">
		<table width="100%" role="presentation">
			<tr>
				<td colspan="2">
					<h1 class="chatAnnouncement"><%=Messages.getString(session, "WINDOW_CHAT_ANNOUNCEMENT")%> <%=userInfo.getMXUserName()%> <%=Messages.getString(session, "WINDOW_CHAT_ANNOUNCEMENT_and")%> <%=partnerInfo.getMXPartnerName()%></h1>
				</td>
			</tr>
			<tr>
				<td colspan="2">
				    <h1 class="chatStatusMessages" aria-live="true"><div id="savingInfo">loading saving information...</div></h1>
				</td>
			</tr>
			<tr>
				<td width="100%" align="center" colspan="2">
					<textarea  aria-live="true" id="chatTextArea" wrap="on" rows="12" cols="50" readonly="true" class="chatTextArea" onfocus="appendClass(this,'chatTextAreaFocused'); removeClass(document.getElementById('msgTextArea'),'msgTextAreaFocused');"></textarea>
				</td>
			</tr>
			<tr>
				<td width="100%" align="center" colspan="2">
					<textarea id="msgTextArea" wrap="on" rows="4" cols="50" onkeyup="msgOnKeyPress(this, event);" class="msgTextArea" onfocus="appendClass(this,'msgTextAreaFocused'); removeClass(document.getElementById('chatTextArea'),'chatTextAreaFocused');"></textarea>
				</td>
			</tr>
			<tr>
				<td width="100%" align="center" colspan="2"><hr></td>
			</tr>
				<td id="sendButtonTD" align="left" width="50%"><input class="sendButton" type="button" value="&nbsp;&nbsp;<%=Messages.getString(session, "WINDOW_SEND_BUTTON")%>&nbsp;&nbsp;" onclick="msgOnClick();" onmouseover="appendClass(this,'hoverButton');" onmouseout="removeClass(this,'hoverButton');" /></td>
				<td id="closeButtonTD" align="right" width="50%"><input class="closeButton" type="button" value="&nbsp;&nbsp;<%=Messages.getString(session, "WINDOW_CLOSE_BUTTON")%>&nbsp;&nbsp;" onclick="window.close();" onmouseover="appendClass(this,'hoverButton');" onmouseout="removeClass(this,'hoverButton');" /></td>
			</tr>
		</table>
	</body>
	<script language="JavaScript" type="text/javascript">
		refreshChat();
		resizeTextAreas();
		document.getElementById("msgTextArea").focus();
		window.onresize = resizeTextAreas;
	</script>
</html>
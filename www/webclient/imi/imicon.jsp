<%--
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 5724-U18
* (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><!--
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
 * @version 1.3, 12/17/07
 * @file /cmvc/itsm/vc/0/4/6/6/s.24
 *
 * 
 ****************************************************************************/
-->
<%@ page import="psdi.webclient.system.runtime.WebClientRuntime,com.ibm.tivoli.imi.controller.DynamicIcon,com.ibm.tivoli.imi.controller.Messages,java.net.URL,java.net.URLEncoder"%>
<%
	final String relationship = request.getParameter("relationship").replaceAll("[\\W]","");
	final String saveconversation = request.getParameter("saveconversation").replaceAll("[\\W]","");
	final String uisessionid = request.getParameter("uisessionid");
	final String controlid = request.getParameter("controlid").replaceAll("[\\W]","");
	final String iconPathPrefix = new URL(new java.net.URL(WebClientRuntime.getMaximoRequestURL(request)), request.getContextPath() + "/").toString();

	final String url = new URL(new URL(WebClientRuntime.getMaximoRequestURL(request)), "./../imi/frontcontroller.jsp?action_code=IMICON_REFRESH&relationship=" + relationship + "&uisessionid=" + URLEncoder.encode(uisessionid) + "&controlid=" + controlid).toString();
	final String target = "icon";

	response.setContentType("text/html;charset=UTF-8");
	
	Messages.setResourceBundle(session);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script language="JavaScript" type="text/javascript">

			var uisessionid = decodeURIComponent("<%=URLEncoder.encode(uisessionid)%>");
			var relationship = "<%=relationship%>";
			var saveconversation = "<%=saveconversation%>";
			var controlid = "<%=controlid%>";
			var timeout = "20000";
			var target = "<%=target%>";

			var url = "<%=url%>";
			var xmlhttp = null;
			var previousResponse = null;

			var iconPathPrefix = "<%=iconPathPrefix%>";
			var iconPathValues = [];
			var iconAltValues = [];

/******************************************************************************************************************************
	ICON_CODE meaning
	-----------------
	First digit (from the left):				0 - has link | 1 - does not have link
	Second and third digits (from the left):	the number of the image to represent user state or connection state
	Fourth and fifth digits (from the left):	the number of the tool tip text to represent user state or connection state
*/
			var LOADING_ICON_CODE				= "00611";
			var INCOMPATIBLE_BROWSER_ICON_CODE	= "00708";
			var FAILURE_ICON_CODE				= "00712";

			// This value is used to check when IM icon is red (IM connection not opened)
			var IM_CONN_CLOSED_ICON_CODE = 7;
/******************************************************************************************************************************/

<%
	int i = 0;
	DynamicIcon.IconPath[] vals = DynamicIcon.IconPath.values();
	while (i < vals.length) {
	    DynamicIcon.IconPath ip = vals[i];
%>
		iconPathValues[<%=i%>] = "<%=ip.toString()%>";
<%
		i++;
	}
	i = 0;
	DynamicIcon.IconAlt[] iaVals = DynamicIcon.IconAlt.values();
	while (i < iaVals.length) {
	    DynamicIcon.IconAlt ia = iaVals[i];
%>
		iconAltValues[<%=i%>] = "<%=ia.toString()%>";
<%
		i++;
	}
%>


			function createXMLHttp() {
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

			function refreshIcon() {
		        xmlhttp = createXMLHttp(); 
			
			    if(xmlhttp) {
			        xmlhttp.onreadystatechange = receiveResponse;
			        xmlhttp.open("GET", url, true);
			        xmlhttp.send(null);
			    } else {
					updateHTMLContent("00607");
			    }
			}
			
			function receiveResponse() {
			    if(xmlhttp.readyState == 4) {
			        if(xmlhttp.status == 200) {
						var response = xmlhttp.responseText;
						updateHTMLContent(response);
			        } else {
						updateHTMLContent("00607");
			        }
			        setTimeout("refreshIcon()", timeout);
			    }
			}

			var chatWindow = null;
			
			function openChatWindow() {
				if (chatWindow == null || chatWindow.closed) {
					chatWindow = window.open("./../imi/chatwindow.jsp?relationship=" + relationship + "&uisessionid=" + <%=URLEncoder.encode(uisessionid)%> + "&saveconversation=" + saveconversation + "&controlid=" + controlid, "", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width=440,height=500");
				}
				return false;
			}
			
			// Actually this function is not implemented, it will be done for SRM release 7.2
			// Meanwhile a message box will be showed saying that IM connection is not opened
			// Note: this function must be called only when IM connection is closed!
			function openIMConfigDialog() {
				alert("<%=Messages.getString(session, "IM_SESSION_CLOSED")%>");
				parent.document.location=iconPathPrefix+"ui/?event=gotoapp&value=imiconf&uisessionid=" + <%=URLEncoder.encode(uisessionid)%> + "&controlid=" + controlid;
				return false;
			}
			
			function updateHTMLContent(response) {
				if(response == null || response == previousResponse) {
					return;
				}
				var hasLink = response.charAt(0);
				var iconCode = Number(response.substring(3, 5));
				var iconPath = iconPathPrefix + iconPathValues[iconCode];
				var iconAlt = iconAltValues[Number(response.substring(1, 3))];
				var result = "";
				var addImage = true;
				if(hasLink == "1") {
					chatWindow = null; 
					if(iconCode == IM_CONN_CLOSED_ICON_CODE) { 
						result = "<a title=\"<%=Messages.getString(session, "LAUNCH_IM_WIN")%>\" id=\"launchim\" href=\"javascript: void(0);\" onclick=\"return openIMConfigDialog();\">";
						addImage = false;
					} 
                                        else {
						result = "<a title=\"<%=Messages.getString(session, "LAUNCH_IM_WIN")%>\" id=\"launchim\" href=\"javascript: void(0);\" onclick=\"return openChatWindow();\">";
					}
				}
				if(addImage) {
					result += "<img aria-live=\"true\" src=\'" + iconPath + "\' alt=\'" + iconAlt + "\' title=\'" + iconAlt + "\' name=\'icon_img\' border=\'0\'/>";	
				}
				if(hasLink == "1") {
					result += "</a>";
				}
			    document.getElementById(target).innerHTML = result;
			    previousResponse = response;
			}
			
		</script>
	</head>
	<body onFocus="document.getElementById('launchim').focus()">
		<div id="<%=target%>"></div>
		<script language="JavaScript" type="text/javascript">
			updateHTMLContent("00610");
			refreshIcon();
		</script>
 	</body>
</html>
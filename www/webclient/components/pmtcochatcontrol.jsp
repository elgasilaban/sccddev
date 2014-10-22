<%@ include file="../common/simpleheader.jsp" %>
<%@page import="psdi.util.HTML"%>
<%@page import="com.ibm.ism.pmtco.chat.LiveChatLogHelper"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.AgentChatQueueControl"%>
<%  
    String skinName = wcs.getSkinName().trim();    
    boolean isTivoli13Skin = skinName.equalsIgnoreCase("tivoli13");
	AgentChatQueueControl agentControl = (AgentChatQueueControl)control;
	agentControl.setupAgent();
	boolean chatAgent = agentControl.isChatAgent();
    String label = component.getProperty("label");
    String chatsPendingMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatsArePendingIndicator"));
    String popupBlockedMsg =  HTML.encode(wcs.getMaxMessage("pmtco", "ChatPopupBlocked").getTaggedMessage());
    String okLabel = HTML.encode(wcs.getMessage("messagebox", "MSG_BTNOK"));
    String queueLabel = label + " " + "({0})";
%>

<% if (component.needsRender()) { %>	

	<% if (chatAgent) { %>

	<style type="text/css">
	<% if (isTivoli13Skin) { %>
		.pmtcochatcontrol_count {
    		background: none repeat scroll 0 0 #CA7000;
    		border: 0 solid #000000;
    		border-radius: 3px 3px 3px 3px;
    		color: #FFFFFF;
    		display: none;
    		font-family: tahoma, verdana;
    		font-size: 9px;
	<% if (rtl) { %>
    		left: 22px;
	<% } else { %>
    		left: -4px;
	<% } %>
    		top: -5px;
    		padding: 1px 4px 2px;
    		position: relative;
    		margin: 0px 2px;
		}
	<% } else { %>
		.pmtcochatcontrol_link {
			cursor: pointer;
			text-decoration: underline;
			vertical-align: top;
		}
	<% } %>
	</style>		

	<% } %>

	<script type="text/javascript">
	
		dojo.require("com.ibm.ism.pmtco.livechat");
		
	<% if (LiveChatLogHelper.isDebugEnabled()) { %>
		com.ibm.ism.pmtco.livechat.debug = true;
	<% } %>
		
		com.ibm.ism.pmtco.livechat.popupBlockedMsg = '<%=popupBlockedMsg%>';
		com.ibm.ism.pmtco.livechat.okLabel = '<%=okLabel%>';
				
	<% if (chatAgent) { %>
	
	    com.ibm.ism.pmtco.livechat.agentContext.chatQueues = <%=agentControl.getQueueListJson()%>;
				
		com.ibm.ism.pmtco.livechat.runAfterHandshake(function() {
		
			com.ibm.ism.pmtco.livechat.batch(function() {
				com.ibm.ism.pmtco.livechat.agentContext.waitingForQueueInfo = com.ibm.ism.pmtco.livechat.subscribeReceiveWaitQueueInfo(function(message) {
					if (com.ibm.ism.pmtco.livechat.debug === true) {
						console.log('Received chat queue info: ' + dojo.toJson(message));
					}
					var total = 0;
					if (message.data.queuecounts) {
						total = com.ibm.ism.pmtco.livechat.totalQueueCount(com.ibm.ism.pmtco.livechat.agentContext.chatQueues, message.data.queuecounts);
					}
					if (total > 0) {
						<% if (isTivoli13Skin) { %>
						var span = dojo.byId("<%=id%>");
						span.title = dojo.replace("<%=queueLabel%>", [total]);
						span.style.cursor = "pointer";
						var image = dojo.byId("<%=id%>_image");
						image.alt = dojo.replace("<%=queueLabel%>", [total]);
						image.src = "<%=IMAGE_PATH%>pmtcochatwin_chatWaiting.gif";
						image.onclick = function() {com.ibm.ism.pmtco.livechat.launchAgentChat("<%=id%>");};
						image.onmouseover = function() {this.src = "<%=IMAGE_PATH%>pmtcochatwin_chatWaitingRO.gif";};
						image.onmouseout = function() {this.src = "<%=IMAGE_PATH%>pmtcochatwin_chatWaiting.gif";};
						var div = dojo.byId("<%=id%>_count");
						div.innerHTML = total;
						div.style.display = "inline";
						<% } else { %>
						var onclickfunc = 'com.ibm.ism.pmtco.livechat.launchAgentChat("<%=id%>");';
						var qlabel = dojo.replace("<%=queueLabel%>", [total]);
						var image = "<img src='<%=IMAGE_PATH%>pmtcochatwin_chatWaiting.gif' alt='<%=chatsPendingMsg%>' title='<%=chatsPendingMsg%>'/>";
						var link = "<span class='pmtcochatcontrol_link' onclick='" + onclickfunc + "'>" + qlabel + "</span>";
						var span = dojo.byId("<%=id%>");
						span.innerHTML = image + link;
						<% } %>
					}
					else {
						<% if (isTivoli13Skin) { %>
						var span = dojo.byId("<%=id%>");
						span.title = dojo.replace("<%=queueLabel%>", [total]);
						span.style.cursor = "default";
						var image = dojo.byId("<%=id%>_image");
						image.alt = dojo.replace("<%=queueLabel%>", [total]);
						image.src = "<%=IMAGE_PATH%>pmtcochatwin_noChatWaiting.gif";
						image.onclick = function() {};
						image.onmouseover = function() {};
						image.onmouseout = function() {};
						var div = dojo.byId("<%=id%>_count");
						div.innerHTML = "";
						div.style.display = "none";
						<% } else { %>
						var span = dojo.byId("<%=id%>");
						span.innerHTML = dojo.replace("<%=queueLabel%>", [total]);
						<% } %>
					}
				});
				com.ibm.ism.pmtco.livechat.sendRequestWaitQueueInfo('<%=wcs.getUISessionID()%>');
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Requested initial chat queue info update');
				}
			});
			
			<% if (isTivoli13Skin) { %>
			var span = dojo.byId("<%=id%>");
			span.title = dojo.replace("<%=queueLabel%>", ["?"]);
			var image = dojo.byId("<%=id%>_image");
			image.alt = dojo.replace("<%=queueLabel%>", ["?"]);
			<% } else { %>
			var span = dojo.byId("<%=id%>");
			span.innerHTML = dojo.replace("<%=queueLabel%>", ["?"]);
			<% } %>
		});
		
		com.ibm.ism.pmtco.livechat.onBeforeAgentLaunch = function() {
			<% if (isTivoli13Skin) { %>
			var span = dojo.byId("<%=id%>");
			span.title = dojo.replace("<%=queueLabel%>", ["?"]);
			span.style.cursor = "default";
			var image = dojo.byId("<%=id%>_image");
			image.alt = dojo.replace("<%=queueLabel%>", ["?"]);
			image.src = "<%=IMAGE_PATH%>pmtcochatwin_chatUnavailable.png";
			image.onclick = function() {};
			image.onmouseover = function() {};
			image.onmouseout = function() {};
			var div = dojo.byId("<%=id%>_count");
			div.innerHTML = "";
			div.style.display = "none";
			<% } else { %>
			var span = dojo.byId("<%=id%>");
			span.innerHTML = dojo.replace("<%=queueLabel%>", ["?"]);
			<% } %>
		};
		
		com.ibm.ism.pmtco.livechat.onFailedAgentLaunch = function() {
			com.ibm.ism.pmtco.livechat.sendRequestWaitQueueInfo('<%=wcs.getUISessionID()%>');
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Requested chat queue info update due to agent chat launch failure');
			}
		};
		
		com.ibm.ism.pmtco.livechat.onConnectionBroken = function() {
			<% if (isTivoli13Skin) { %>
			var span = dojo.byId("<%=id%>");
			span.title = dojo.replace("<%=queueLabel%>", ["!"]);
			span.style.cursor = "default";
			var image = dojo.byId("<%=id%>_image");
			image.alt = dojo.replace("<%=queueLabel%>", ["!"]);
			image.src = "<%=IMAGE_PATH%>pmtcochatwin_chatUnavailable.png";
			image.onclick = function() {};
			image.onmouseover = function() {};
			image.onmouseout = function() {};
			var div = dojo.byId("<%=id%>_count");
			div.innerHTML = "";
			div.style.display = "none";
			<% } else { %>
			var span = dojo.byId("<%=id%>");
			span.innerHTML = dojo.replace("<%=queueLabel%>", ["!"]);
			<% } %>
			com.ibm.ism.pmtco.livechat.close();
		};
				
		com.ibm.ism.pmtco.livechat.onHandshakeFailed = function() {
			<% if (isTivoli13Skin) { %>
			var span = dojo.byId("<%=id%>");
			span.title = dojo.replace("<%=queueLabel%>", ["!"]);
			span.style.cursor = "default";
			var image = dojo.byId("<%=id%>_image");
			image.alt = image.title = dojo.replace("<%=queueLabel%>", ["!"]);
			image.src = "<%=IMAGE_PATH%>pmtcochatwin_chatUnavailable.png";
			image.onclick = function() {};
			image.onmouseover = function() {};
			image.onmouseout = function() {};
			var div = dojo.byId("<%=id%>_count");
			div.innerHTML = "";
			div.style.display = "none";
			<% } else { %>
			var span = dojo.byId("<%=id%>");
			span.innerHTML = dojo.replace("<%=queueLabel%>", ["!"]);
			<% } %>
			com.ibm.ism.pmtco.livechat.close();
		};
		
		com.ibm.ism.pmtco.livechat.cometdLoggingLevel = '<%=agentControl.getCometdLoggingLevel()%>';
		com.ibm.ism.pmtco.livechat.maxDisconnectsAllowed = <%=agentControl.getMaxDisconnectsAllowed()%>;
		
		com.ibm.ism.pmtco.livechat.open();
							
		dojo.addOnWindowUnload(function() {
			com.ibm.ism.pmtco.livechat.close();
		});
				
	<% } %>

	</script>

	<% if (chatAgent) { %>
	
	<td valign="top" align="<%=defaultAlign%>" nowrap="nowrap" style="vertical-align:top;">
	<% if (isTivoli13Skin) { %>
		<div class="bc">
			<span id="<%=id%>" class="text powerwhite" title="<%=label%>" style="cursor:default;">
				<img id="<%=id%>_image" class="pwimg" border="0" style="vertical-align:top;margin:0px;margin-left:3px;margin-right:3px;" src="<%=IMAGE_PATH%>pmtcochatwin_chatUnavailable.png" alt="<%=label%>"/>
			</span>
		</div>
		<div id="<%=id%>_count" class="pmtcochatcontrol_count"></div>
	<% } else { %>
		<div class="bc">
			<span id="<%=id%>" class="text powerwhite"><%=label%></span>
		</div>
	<% } %>
	</td>
	
	<% } %>

<% } %>
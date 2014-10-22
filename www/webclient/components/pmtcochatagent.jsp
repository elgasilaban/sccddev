<%@ include file="../common/simpleheader.jsp" %>
<%@page import="psdi.util.HTML"%>
<%@page import="com.ibm.ism.pmtco.chat.LiveChatLogHelper"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.LiveChatState"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.AgentChatWindowControl"%>
<%  String welcomeMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatAgentWelcomeMsg"));
    String waitingMsg = HTML.encode(wcs.getMessage("pmtco", "WaitingForEndUserToJoin"));
    //String userJoinMsg = HTML.encode(wcs.getMessage("pmtco", "EndUserHasJoinedChat"));
    String userLeftMsg = HTML.encode(wcs.getMessage("pmtco", "EndUserHasLeftChat"));
    String noUserMsg = HTML.encode(wcs.getMessage("pmtco", "NoEndUserAvailable"));
    String inputFieldLabel = HTML.encode(wcs.getMessage("pmtco", "ChatInputFieldLabel"));
    String sendButtonLabel = HTML.encode(wcs.getMessage("pmtco", "ChatSendButtonLabel"));
    String closeButtonLabel =  HTML.encode(wcs.getMessage("pmtco", "ChatCloseButtonLabel"));
    String serviceRequestLabel = HTML.encode(wcs.getMessage("pmtco", "ChatServiceRequestLabel"));
    String startTimeMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatStartTimeMsg"));
    String userNameMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatAgentUserNameMsg"));
    String hasTimedoutMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatSessionHasTimedout"));
    String timeoutWarnMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatSessionTimeoutWarn"));
    String cannotConnectMsg =  HTML.encode(wcs.getMessage("pmtco", "CannotConnectToChatServer"));
    String lostConnectMsg =  HTML.encode(wcs.getMessage("pmtco", "LostConnectionToChatServer"));
    String popupBlockedMsg =  HTML.encode(wcs.getMaxMessage("pmtco", "ChatPopupBlocked").getTaggedMessage());
    String closeConfirmMsg = HTML.encode(wcs.getMessage("pmtco", "ChatSessionCloseConfirmAgentMsg"));
    String okLabel = HTML.encode(wcs.getMessage("messagebox", "MSG_BTNOK"));
    String cancelLabel = HTML.encode(wcs.getMessage("messagebox", "MSG_BTNCANCEL"));
    
	if (component.needsRender()) {
%>	

	<div id="<%=id%>">	
		<div id="<%=id%>_waitingForUser" class="pmtcochatwin_headerArea">
			<div class="pmtcochatwin_waitingText">
      			<span class="pmtcochatwin_titleText"><%=welcomeMsg%></span>
				<br />
      			<%=waitingMsg%>
    		</div>
		</div>
		<div id="<%=id%>_userNotAvailable" class="pmtcochatwin_headerArea">
			<div class="pmtcochatwin_noAgentText">
      			<span class="pmtcochatwin_titleText"><%=welcomeMsg%></span>
				<br />
      			<%=noUserMsg%>
    		</div>
		</div>
		<div id="<%=id%>_userAvailable" class="pmtcochatwin_headerArea">
			<div class="pmtcochatwin_welcomeText">
      			<span class="pmtcochatwin_titleText"><%=welcomeMsg%></span>
				<br />
				<br />
				<span id="<%=id%>_startTime"></span>
      			<div id="<%=id%>_contactDetails" class="pmtcochatwin_contactDetails"></div>
      			<span id="<%=id%>_srnum"></span>
    		</div>
		</div>
		<div id="<%=id%>_chatArea" class="pmtcochatwin_chatArea"></div>
		<div id="<%=id%>_textInputArea" class="pmtcochatwin_textInputArea">
			<span id="<%=id%>_textPrompt" class="pmtcochatwin_textInputPrompt"><%=inputFieldLabel%></span>
  			<textarea id="<%=id%>_textInput" class="pmtcochatwin_textInputField"></textarea>
		</div>
		<div id="<%=id%>_sendButtonArea" class="pmtcochatwin_sendButton">
			<input id="<%=id%>_sendButton" class="pmtcochatwin_chatButton" name="Send" type="button" value="<%=sendButtonLabel%>" />
			<input id="<%=id%>_closeButton" class="pmtcochatwin_chatButton" name="Close" type="button" value="<%=closeButtonLabel%>" />
		</div>
	</div>
	
<%  if (!designmode) {
	    AgentChatWindowControl agentControl = (AgentChatWindowControl)control;
    	String personId = wcs.getUserInfo().getPersonId();
    	String displayName = agentControl.getMyChatDisplayName();
		LiveChatState state = LiveChatState.getInstance(wcs);
		String currentUISession = wcs.getUISessionID();
		
		state.activeAgentChatSessions.put(currentUISession, state.pendingAgentChat);
		state.pendingAgentChat = null;
		
		// get keep alive interval
		long keepAliveTimeIntervalMillis = agentControl.getKeepSessionAliveInterval();
		String greetingMsg = HTML.encode(agentControl.getGreetingMsg());
%>	

	<script type="text/javascript">
	
		dojo.require("com.ibm.ism.pmtco.livechat");
		
	<% if (LiveChatLogHelper.isDebugEnabled()) { %>
		com.ibm.ism.pmtco.livechat.debug = true;
	<% } %>

		com.ibm.ism.pmtco.livechat.popupBlockedMsg = '<%=popupBlockedMsg%>';
		com.ibm.ism.pmtco.livechat.okLabel = '<%=okLabel%>';
		com.ibm.ism.pmtco.livechat.cancelLabel = '<%=cancelLabel%>';
		
		warnExit = false;

		// Hide chat entry and end user info sections.
		dojo.addClass("<%=id%>_userAvailable", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_userNotAvailable", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
		
		com.ibm.ism.pmtco.livechat.agentContext.uiSessionId = '<%=currentUISession%>';
        com.ibm.ism.pmtco.livechat.agentContext.chatQueues = <%=agentControl.getQueueListJson()%>;

		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Keep alive interval = <%=keepAliveTimeIntervalMillis%>');
			console.log('UI sesson ID = <%=currentUISession%>');
		}
		
		<%  if (keepAliveTimeIntervalMillis > 0) {
		%>
				com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler = setInterval(com.ibm.ism.pmtco.livechat.keepAliveCallback, <%=keepAliveTimeIntervalMillis%>);
		<%  }
		%>
        
		// Create handler to send chat text when return key is pressed.
		dojo.query("#<%=id%>_textInput").attr({"autocomplete": "off"}).onkeyup(function(e) {
			if (e.keyCode == dojo.keys.ENTER) {
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Return was pressed in chat input field');
				}
				com.ibm.ism.pmtco.livechat.sendChat('<%=id%>_textInput', '<%=personId%>', com.ibm.ism.pmtco.livechat.agentContext.chatChannel, '<%=displayName%>');
			}
			com.ibm.ism.pmtco.livechat.stopWindowBlink();
		});
		
		// Create handler to send chat text when send button is pressed.
		dojo.query("#<%=id%>_sendButton").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
            	console.log('Send chat button was pressed');
			}
			com.ibm.ism.pmtco.livechat.sendChat('<%=id%>_textInput', '<%=personId%>', com.ibm.ism.pmtco.livechat.agentContext.chatChannel, '<%=displayName%>');
			dojo.byId("<%=id%>_textInput").focus();
		});
		
		dojo.query("#<%=id%>_closeButton").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
            	console.log('Close chat button was pressed');
			}
			
			com.ibm.ism.pmtco.livechat.promptCloseChatWindow('<%=closeConfirmMsg%>', '300px');
	        if (!e) var e = window.event;
	        e.cancelBubble = true;
	        if (e.stopPropagation) e.stopPropagation();
			
		});
		
		dojo.query("#<%=id%>_textPrompt").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onclick event on chat input prompt');
			}
		    dojo.byId("<%=id%>_textInput").focus();
		});

		dojo.query("#<%=id%>_textInput").onfocus(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onfocus event on chat input field');
			}
		    dojo.addClass("<%=id%>_textPrompt", "pmtcochatwin_hide");
		});

		dojo.query("#<%=id%>_textInput").onblur(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onblur event on chat input field');
			}
		    if (dojo.byId("<%=id%>_textInput").value == '') {
		        dojo.removeClass("<%=id%>_textPrompt", "pmtcochatwin_hide");
		    }
		});
		
		com.ibm.ism.pmtco.livechat.agentContext.onEndUserReady = function(message) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Received chat end user ready: ' + dojo.toJson(message));
			}
			// Test if the end user has prematurely left the chat session before the agent can accept.
			if (message.data.nouser && message.data.nouser === true) {
				com.ibm.ism.pmtco.livechat.unsubscribe(com.ibm.ism.pmtco.livechat.agentContext.endUserReady);
				com.ibm.ism.pmtco.livechat.agentContext.endUserReady = null;
				dojo.addClass("<%=id%>_waitingForUser", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_userNotAvailable", "pmtcochatwin_hide");
				com.ibm.ism.pmtco.livechat.close();
				com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			else {
				// Set up chat session between the end user and the agent.
				com.ibm.ism.pmtco.livechat.agentContext.chatting = true;
				com.ibm.ism.pmtco.livechat.agentContext.chatChannel = message.data.chatchannel;
				com.ibm.ism.pmtco.livechat.agentContext.userid = message.data.userid;
				com.ibm.ism.pmtco.livechat.agentContext.ticketid = message.data.ticketid;
				com.ibm.ism.pmtco.livechat.agentContext.ticketuid = message.data.ticketuid;
				com.ibm.ism.pmtco.livechat.unsubscribe(com.ibm.ism.pmtco.livechat.agentContext.endUserReady);
				com.ibm.ism.pmtco.livechat.agentContext.endUserReady = null;
				com.ibm.ism.pmtco.livechat.agentContext.waitingForChats = com.ibm.ism.pmtco.livechat.subscribe(message.data.chatchannel, com.ibm.ism.pmtco.livechat.agentContext.onWaitingForChats);
										
				var userName = "<span class=\"pmtcochatwin_youName\">" + com.ibm.ism.pmtco.livechat.agentContext.userid + "</span>";
				var agentLabel = dojo.replace("<%=userNameMsg%>", [userName]);
				dojo.byId("<%=id%>_contactDetails").innerHTML = agentLabel;
				
				var srnum = dojo.byId("<%=id%>_srnum");
				
				// old code which directs the main maximo ui window to the SR - odd behavior if the session has timedout or signed out
				// win.location.protocol + "//" + win.location.host + "/maximo/ui/?event=loadapp&value=sr&uniqueid=" + ticketuid;						
				//var actionstr = 'com.ibm.ism.pmtco.livechat.openServiceRequest(window.opener, com.ibm.ism.pmtco.livechat.agentContext.ticketuid);';
				//var srlink = "<span class='pmtcochatwin_link' onclick='" + actionstr + "' title='" + com.ibm.ism.pmtco.livechat.agentContext.ticketid + "'>" + com.ibm.ism.pmtco.livechat.agentContext.ticketid + "</span>";
				
				// new code which launches new window
				// <a href="$1" target="_blank">$1</a>
				// http://localhost:7001/maximo/ui/login?event=loadapp&value=sr&additionalevent=useqbe&additionaleventvalue=TICKETID='1181'
				var srlinkURL = window.opener.location.protocol + "//" + window.opener.location.host + "/" + com.ibm.ism.pmtco.livechat.getContextRoot(window.opener.location.pathname) + "/ui/?event=loadapp&value=sr&additionalevent=useqbe&additionaleventvalue=TICKETID='" + com.ibm.ism.pmtco.livechat.agentContext.ticketid + "'";
				var srlink="<a href=\"" + srlinkURL + "\" target=\"_blank\">" + com.ibm.ism.pmtco.livechat.agentContext.ticketid + "</a>";
				srnum.innerHTML = dojo.replace("<%=serviceRequestLabel%>", [srlink]);
				
				// Show chat entry section.
				dojo.addClass("<%=id%>_waitingForUser", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_userAvailable", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_sendButton", "pmtcochatwin_hide");
				warnExit = true;
				
				com.ibm.ism.pmtco.livechat.displayGreeting('<%=id%>_chatArea', '<%=displayName%>', '<%=greetingMsg%>', '<%=defaultAlign%>', false);	
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
				
				// Fetch details about end user from the Maximo server.
				sendXHREvent('fetchChatStartInfo', '<%=id%>', com.ibm.ism.pmtco.livechat.agentContext.userid, REQUESTTYPE_HIGHASYNC, 'json', 'application/json', function(response, ioargs) {
					if (response) {
						if (com.ibm.ism.pmtco.livechat.debug === true) {
							console.log('Received response from fetchChatStartInfo event: ' + dojo.toJson(response));
						}
						if (response.timestamp) {
							var startLabel = dojo.replace("<%=startTimeMsg%>", [response.timestamp]);
							dojo.byId("<%=id%>_startTime").innerHTML = startLabel;									
						}
						if (response.displayname) {
							var userName = "<span class=\"pmtcochatwin_youName\">" + response.displayname + "</span>";
							var agentLabel = dojo.replace("<%=userNameMsg%>", [userName]);
							dojo.byId("<%=id%>_contactDetails").innerHTML = agentLabel;
						}
						if (response.phone) {
							dojo.byId("<%=id%>_contactDetails").innerHTML += "<br/>" + response.phone;
						}
						if (response.email) {
							dojo.byId("<%=id%>_contactDetails").innerHTML += "<br/>" + response.email;
						}
						com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
					}
					else {
						console.error('No response object received from fetchChatStartInfo event');
					}
				}, 
				function(response, ioargs) {
					console.error('Error response function triggered from fetchChatStartInfo event');
				});
			}
		};
			
		com.ibm.ism.pmtco.livechat.agentContext.onWaitingForChats = function(message) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Agent received chat: ' + dojo.toJson(message));
			}
			if (message.data.otherpartyleft && message.data.otherpartyleft === true) {
				com.ibm.ism.pmtco.livechat.agentContext.chatting = false;
				
				if (!com.ibm.ism.pmtco.livechat.agentContext.timedout || com.ibm.ism.pmtco.livechat.agentContext.timedout === false) {
					com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=userLeftMsg%>', '<%=defaultAlign%>');
					dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
					dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
					warnExit = false;
					com.ibm.ism.pmtco.livechat.stopWindowBlink();
					com.ibm.ism.pmtco.livechat.close();
					com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
					com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
				}
			}
			else if (message.data.chattimedout && message.data.chattimedout === true) {
				com.ibm.ism.pmtco.livechat.agentContext.chatting = false;
				com.ibm.ism.pmtco.livechat.agentContext.timedout = true;
				com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=hasTimedoutMsg%>', '<%=defaultAlign%>');
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.close();
				com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
				if (com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler) {			
					clearInterval(com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler);
	 			}
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			else if (message.data.chattimeoutwarn && message.data.chattimeoutwarn === true) {
				var warn = dojo.replace("<%=timeoutWarnMsg%>", [message.data.numminidle , message.data.nummintiltimeout]);
				com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', warn, '<%=defaultAlign%>');
			}
			else {
				com.ibm.ism.pmtco.livechat.displayChat('<%=id%>_chatArea', message, '<%=defaultAlign%>');
			}
		};
			
		// Run this function after handshake is received from CometD server.
		com.ibm.ism.pmtco.livechat.runAfterHandshake(function() {
			if (com.ibm.ism.pmtco.livechat.agentContext.endUserReady) {
				com.ibm.ism.pmtco.livechat.agentContext.endUserReady = com.ibm.ism.pmtco.livechat.subscribeReceiveEnduserReady(com.ibm.ism.pmtco.livechat.agentContext.onEndUserReady);
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Restored subscription for end user ready');
				}
			}
			else if (com.ibm.ism.pmtco.livechat.agentContext.waitingForChats) {
				com.ibm.ism.pmtco.livechat.agentContext.waitingForChats = com.ibm.ism.pmtco.livechat.subscribe(com.ibm.ism.pmtco.livechat.agentContext.chatChannel, com.ibm.ism.pmtco.livechat.agentContext.onWaitingForChats);				
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Restored subscription to wait for chats');
				}
			}
			else {
				com.ibm.ism.pmtco.livechat.batch(function() {
					// Run this function when an end user is available to chat with the agent.
					com.ibm.ism.pmtco.livechat.agentContext.endUserReady = com.ibm.ism.pmtco.livechat.subscribeReceiveEnduserReady(com.ibm.ism.pmtco.livechat.agentContext.onEndUserReady);
				
					// Notify that the agent is ready to chat with an end user.
					com.ibm.ism.pmtco.livechat.sendNotifyAgentReady('<%=currentUISession%>', '<%=personId%>', com.ibm.ism.pmtco.livechat.agentContext.chatQueues);
					com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
					if (com.ibm.ism.pmtco.livechat.debug === true) {
						console.log('Sent notification that agent is ready to chat');
					}
				});
			}
		});
		
		com.ibm.ism.pmtco.livechat.onChatReceived = function() {
			<% if (agentControl.isGrabFocusOnNewChat()) { %>
			window.focus();
			<% } %>
			com.ibm.ism.pmtco.livechat.startWindowBlink();
		};
		
		dojo.connect(document, 'onclick', function() {
		      com.ibm.ism.pmtco.livechat.stopWindowBlink();
		});
		
		dojo.connect(window, 'onresize', function(e) {
		       com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
		});
		
		com.ibm.ism.pmtco.livechat.onConnectionBroken = function() {
			com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=lostConnectMsg%>', '<%=defaultAlign%>');
			if (com.ibm.ism.pmtco.livechat.agentContext.chatting && com.ibm.ism.pmtco.livechat.agentContext.chatting === true) {
				com.ibm.ism.pmtco.livechat.agentContext.chatting = false;
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");	
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
			
			if (com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler) {			
				clearInterval(com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler);
 			}
		};
				
		com.ibm.ism.pmtco.livechat.onHandshakeFailed = function() {
			com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=cannotConnectMsg%>', '<%=defaultAlign%>');
			if (com.ibm.ism.pmtco.livechat.agentContext.chatting && com.ibm.ism.pmtco.livechat.agentContext.chatting === true) {
				com.ibm.ism.pmtco.livechat.agentContext.chatting = false;
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
		};
		
		com.ibm.ism.pmtco.livechat.cometdLoggingLevel = '<%=agentControl.getCometdLoggingLevel()%>';
		com.ibm.ism.pmtco.livechat.maxDisconnectsAllowed = <%=agentControl.getMaxDisconnectsAllowed()%>;

		// Open connection to CometD server.
		com.ibm.ism.pmtco.livechat.open();

		// Run this function after browser window is closed.
		dojo.addOnWindowUnload(function() {
			com.ibm.ism.pmtco.livechat.agentChatClosed('<%=id%>');
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
			
			if (com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler) {			
				clearInterval(com.ibm.ism.pmtco.livechat.agentContext.keepAliveHandler);
 			}
		});

	</script>
	
	<%  } 
	%>
				
	<%  } 
	%>
	
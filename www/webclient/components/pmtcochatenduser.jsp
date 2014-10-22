<%@ include file="../common/simpleheader.jsp" %>
<%@page import="psdi.util.HTML"%>
<%@page import="com.ibm.ism.pmtco.chat.LiveChatLogHelper"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.LiveChatState"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.EndUserChatContext"%>
<%@page import="com.ibm.ism.pmtco.webclient.chat.controls.EndUserChatWindowControl"%>
<%  String welcomeMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatUserWelcomeMsg"));
    String waitingMsg =  HTML.encode(wcs.getMessage("pmtco", "WaitingForAgentToJoin"));
    //String agentJoinMsg =  HTML.encode(wcs.getMessage("pmtco", "AgentHasJoinedChat"));
    String agentLeftMsg =  HTML.encode(wcs.getMessage("pmtco", "AgentHasLeftChat"));
    String noAgentsMsg =  HTML.encode(wcs.getMessage("pmtco", "NoAgentsAvailable"));
    String startTimeMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatStartTimeMsg"));
    String serviceRequestLabel = HTML.encode(wcs.getMessage("pmtco", "ChatServiceRequestLabel"));
    String agentNameMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatUserAgentNameMsg"));
    String inputFieldLabel =  HTML.encode(wcs.getMessage("pmtco", "ChatInputFieldLabel"));
    String sendButtonLabel =  HTML.encode(wcs.getMessage("pmtco", "ChatSendButtonLabel"));
    String closeButtonLabel =  HTML.encode(wcs.getMessage("pmtco", "ChatCloseButtonLabel"));
    String hasTimedoutMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatSessionHasTimedout"));
    String timeoutWarnMsg =  HTML.encode(wcs.getMessage("pmtco", "ChatSessionTimeoutWarn"));
    String cannotConnectMsg =  HTML.encode(wcs.getMessage("pmtco", "CannotConnectToChatServer"));
    String lostConnectMsg =  HTML.encode(wcs.getMessage("pmtco", "LostConnectionToChatServer"));
    String popupBlockedMsg =  HTML.encode(wcs.getMaxMessage("pmtco", "ChatPopupBlocked").getTaggedMessage());
    String closeConfirmMsg = HTML.encode(wcs.getMessage("pmtco", "ChatSessionCloseConfirmMsg"));
    String okLabel = HTML.encode(wcs.getMessage("messagebox", "MSG_BTNOK"));
    String cancelLabel = HTML.encode(wcs.getMessage("messagebox", "MSG_BTNCANCEL"));
    
	if (component.needsRender()) {
%>	

	<div id="<%=id%>">	
		<div id="<%=id%>_waitingForAgent" class="pmtcochatwin_headerArea">
			<div class="pmtcochatwin_waitingText">
      			<span class="pmtcochatwin_titleText"><%=welcomeMsg%></span>
				<br />
      			<%=waitingMsg%>
    		</div>
		</div>
		<div id="<%=id%>_agentNotAvailable" class="pmtcochatwin_headerArea">
			<div class="pmtcochatwin_noAgentText">
      			<span class="pmtcochatwin_titleText"><%=welcomeMsg%></span>
				<br />
      			<%=noAgentsMsg%>
    		</div>
		</div>
		<div id="<%=id%>_agentAvailable" class="pmtcochatwin_headerArea">
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
		EndUserChatWindowControl enduserControl = (EndUserChatWindowControl)control;
    	String personId = wcs.getUserInfo().getPersonId();    
    	String displayName = enduserControl.getMyChatDisplayName();
		LiveChatState state = LiveChatState.getInstance(wcs);
		String currentUISession = wcs.getUISessionID();
		
		EndUserChatContext context = state.pendingUserChat;
		state.activeUserChatSessions.put(currentUISession, state.pendingUserChat);
		state.pendingUserChat = null;
		
		// get keep alive interval
		long keepAliveTimeIntervalMillis = enduserControl.getKeepSessionAliveInterval();
	    String greetingMsg = HTML.encode(enduserControl.getGreetingMsg());
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
		
		dojo.addClass("<%=id%>_agentAvailable", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_agentNotAvailable", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
		dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
		
		com.ibm.ism.pmtco.livechat.endUserContext.uiSessionId = '<%=currentUISession%>';

		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Keep alive interval = <%=keepAliveTimeIntervalMillis%>');
			console.log('UI sesson ID = <%=currentUISession%>');
		}
		
<%  if (keepAliveTimeIntervalMillis > 0) {
%>
		com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler = setInterval(com.ibm.ism.pmtco.livechat.keepAliveCallback, <%=keepAliveTimeIntervalMillis%>);		
<%  }
%>
		dojo.query("#<%=id%>_textInput").attr({"autocomplete": "off"}).onkeyup(function(e) {
			if (e.keyCode == dojo.keys.ENTER) {
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Return was pressed in chat input field');
				}
				com.ibm.ism.pmtco.livechat.sendChat('<%=id%>_textInput', '<%=personId%>', com.ibm.ism.pmtco.livechat.endUserContext.chatChannel, '<%=displayName%>');
			}
			com.ibm.ism.pmtco.livechat.stopWindowBlink();
		});
		
		dojo.query("#<%=id%>_sendButton").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
            	console.log('Send chat button was pressed');
			}
			com.ibm.ism.pmtco.livechat.sendChat('<%=id%>_textInput', '<%=personId%>', com.ibm.ism.pmtco.livechat.endUserContext.chatChannel, '<%=displayName%>');
			dojo.byId("<%=id%>_textInput").focus();
		});
		
		dojo.query("#<%=id%>_closeButton").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
            	console.log('Close chat button was pressed');
			}
			if (com.ibm.ism.pmtco.livechat.endUserContext.chatting && com.ibm.ism.pmtco.livechat.endUserContext.chatting === true) {
				com.ibm.ism.pmtco.livechat.promptCloseChatWindow('<%=closeConfirmMsg%>', '300px');
	            if (!e) var e = window.event;
	            e.cancelBubble = true;
	            if (e.stopPropagation) e.stopPropagation();
			}
			else {
				warnExit = false;
				window.close();
			}
		});
			
		dojo.query("#<%=id%>_textPrompt").onclick(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onclick event received on chat input prompt');
		    }
		    dojo.byId("<%=id%>_textInput").focus();
		});

		dojo.query("#<%=id%>_textInput").onfocus(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onfocus event received on chat input field');
			}
		    dojo.addClass("<%=id%>_textPrompt", "pmtcochatwin_hide");
		});

		dojo.query("#<%=id%>_textInput").onblur(function(e) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
		    	console.log('Onblur event received on chat input field');
			}
		    if (dojo.byId("<%=id%>_textInput").value == '') {
		        dojo.removeClass("<%=id%>_textPrompt", "pmtcochatwin_hide");
		    }
		});
		
		com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForAgent = function(message) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Received chat agent ready: ' + dojo.toJson(message));
			}
			if (message.data.noagent && message.data.noagent === true) {
				com.ibm.ism.pmtco.livechat.unsubscribe(com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent);
				com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent = null;
				dojo.addClass("<%=id%>_waitingForAgent", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_agentNotAvailable", "pmtcochatwin_hide");
				com.ibm.ism.pmtco.livechat.close();
				com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			else {
				com.ibm.ism.pmtco.livechat.endUserContext.chatting = true;
				com.ibm.ism.pmtco.livechat.endUserContext.chatChannel = message.data.chatchannel;
				com.ibm.ism.pmtco.livechat.unsubscribe(com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent);
				com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent = null;
				com.ibm.ism.pmtco.livechat.endUserContext.waitingForChats = com.ibm.ism.pmtco.livechat.subscribe(message.data.chatchannel, com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForChats);
										
				var userName = "<span class=\"pmtcochatwin_youName\">" + message.data.agentid + "</span>";
				var agentLabel = dojo.replace("<%=agentNameMsg%>", [userName]);
				dojo.byId("<%=id%>_contactDetails").innerHTML = agentLabel;
				var srnum = dojo.byId("<%=id%>_srnum");
				srnum.innerHTML = dojo.replace("<%=serviceRequestLabel%>", ['<%=context.endUserTicketId%>']);
				dojo.addClass("<%=id%>_waitingForAgent", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_agentAvailable", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.removeClass("<%=id%>_sendButton", "pmtcochatwin_hide");
				warnExit = true;
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
				
				// Fetch details about end user from the Maximo server.
				sendXHREvent('fetchChatStartInfo', '<%=id%>', message.data.agentid, REQUESTTYPE_HIGHASYNC, 'json', 'application/json', function(response, ioargs) {
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
							var agentLabel = dojo.replace("<%=agentNameMsg%>", [userName]);
							dojo.byId("<%=id%>_contactDetails").innerHTML = agentLabel;
						}
						if (response.displayname) {
							com.ibm.ism.pmtco.livechat.displayGreeting('<%=id%>_chatArea', response.displayname, '<%=greetingMsg%>', '<%=defaultAlign%>', true);
						}
						else {
							com.ibm.ism.pmtco.livechat.displayGreeting('<%=id%>_chatArea', message.data.agentid, '<%=greetingMsg%>', '<%=defaultAlign%>', true);									
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
		
		com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForChats = function(message) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('End user received chat: ' + dojo.toJson(message));
			}
			if (message.data.otherpartyleft && message.data.otherpartyleft === true) {
				com.ibm.ism.pmtco.livechat.endUserContext.chatting = false;
				
				if (!com.ibm.ism.pmtco.livechat.endUserContext.timedout || com.ibm.ism.pmtco.livechat.endUserContext.timedout === false) {
					com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=agentLeftMsg%>', '<%=defaultAlign%>');
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
				com.ibm.ism.pmtco.livechat.endUserContext.chatting = false;
				com.ibm.ism.pmtco.livechat.endUserContext.timedout = true;
				com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=hasTimedoutMsg%>', '<%=defaultAlign%>');
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.close();
				com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
				if (com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler) {			
					clearInterval(com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler);
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

		com.ibm.ism.pmtco.livechat.runAfterHandshake(function() {
			if (com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent) {
				com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent = com.ibm.ism.pmtco.livechat.subscribeReceiveAgentReady(com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForAgent);				
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Restored subscription to wait for agent');
				}
			}
			else if (com.ibm.ism.pmtco.livechat.endUserContext.waitingForChats) {
				com.ibm.ism.pmtco.livechat.endUserContext.waitingForChats = com.ibm.ism.pmtco.livechat.subscribe(com.ibm.ism.pmtco.livechat.endUserContext.chatChannel, com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForChats);				
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Restored subscription to wait for chats');
				}
			}
			else {
				com.ibm.ism.pmtco.livechat.batch(function() {
					com.ibm.ism.pmtco.livechat.endUserContext.waitingForAgent = com.ibm.ism.pmtco.livechat.subscribeReceiveAgentReady(com.ibm.ism.pmtco.livechat.endUserContext.onWaitingForAgent);
					com.ibm.ism.pmtco.livechat.sendRequestNextAgent('<%=currentUISession%>', '<%=personId%>', '<%=context.endUserTicketId%>', '<%=context.endUserTicketUid%>', '<%=context.isNewSR%>', '<%=context.endUserTicketQueueId%>');
					com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
					if (com.ibm.ism.pmtco.livechat.debug === true) {
						console.log('Sent notification to request next agent');
					}
				});
			}
		});

		com.ibm.ism.pmtco.livechat.onChatReceived = function() {
			<% if (enduserControl.isGrabFocusOnNewChat()) { %>
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
			if (com.ibm.ism.pmtco.livechat.endUserContext.chatting && com.ibm.ism.pmtco.livechat.endUserContext.chatting === true) {
				com.ibm.ism.pmtco.livechat.endUserContext.chatting = false;
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");	
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
			
			if (com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler) {			
				clearInterval(com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler);
 			}
		};
				
		com.ibm.ism.pmtco.livechat.onHandshakeFailed = function() {
			com.ibm.ism.pmtco.livechat.displayMessage('<%=id%>_chatArea', '<%=cannotConnectMsg%>', '<%=defaultAlign%>');
			if (com.ibm.ism.pmtco.livechat.endUserContext.chatting && com.ibm.ism.pmtco.livechat.endUserContext.chatting === true) {
				com.ibm.ism.pmtco.livechat.endUserContext.chatting = false;
				dojo.addClass("<%=id%>_textInputArea", "pmtcochatwin_hide");
				dojo.addClass("<%=id%>_sendButton", "pmtcochatwin_hide");	
				warnExit = false;
				com.ibm.ism.pmtco.livechat.stopWindowBlink();
				com.ibm.ism.pmtco.livechat.adjustHeight('<%=id%>','<%=id%>_chatArea');
			}
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
		};

		com.ibm.ism.pmtco.livechat.cometdLoggingLevel = '<%=enduserControl.getCometdLoggingLevel()%>';
		com.ibm.ism.pmtco.livechat.maxDisconnectsAllowed = <%=enduserControl.getMaxDisconnectsAllowed()%>;

		com.ibm.ism.pmtco.livechat.open();
		
		dojo.addOnWindowUnload(function() {
			com.ibm.ism.pmtco.livechat.endUserChatClosed('<%=id%>');
			com.ibm.ism.pmtco.livechat.close();
			com.ibm.ism.pmtco.livechat.clearTimeoutInterval();
			
  			if (com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler) {			
				clearInterval(com.ibm.ism.pmtco.livechat.endUserContext.keepAliveHandler);
 			}
  			
        });
		
		</script>

<%  } 
%>
			
<%  } 
%>

								
		
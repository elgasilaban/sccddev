dojo.provide("com.ibm.ism.pmtco.livechat");

dojo.require("dojo.date"); 
dojo.require("dojo.date.locale"); 
dojo.require("com.ibm.ism.pmtco.dojox.cometd");
dojo.require("com.ibm.ism.pmtco.dojox.cometd.timestamp");
dojo.require("com.ibm.ism.pmtco.dojox.cometd.ack");
dojo.require("com.ibm.ism.pmtco.dojox.cometd.reload");

// Variables for labels and messages, override with translated values.
com.ibm.ism.pmtco.livechat.okLabel = "OK";
com.ibm.ism.pmtco.livechat.cancelLabel = "CANCEL";
com.ibm.ism.pmtco.livechat.popupBlockedMsg = "Chat window was blocked by the browser, disable the popup blocker.";

// Callback function stubs, override with actual functions if desired.
com.ibm.ism.pmtco.livechat.onHandshakeFailed = function() {};
com.ibm.ism.pmtco.livechat.onConnectionClosed = function() {};
com.ibm.ism.pmtco.livechat.onConnectionBroken = function() {};
com.ibm.ism.pmtco.livechat.onConnectionEstablished = function() {};
com.ibm.ism.pmtco.livechat.onChatReceived = function() {};
com.ibm.ism.pmtco.livechat.onBeforeAgentLaunch = function() {};
com.ibm.ism.pmtco.livechat.onSuccessAgentLaunch = function() {};
com.ibm.ism.pmtco.livechat.onFailedAgentLaunch = function() {};

// Variables that control the logging level, override to enable debugging.
com.ibm.ism.pmtco.livechat.debug = false;
com.ibm.ism.pmtco.livechat.cometdLoggingLevel = 'info';

// Variables that control disconnect error handling, override to forgive spurious disconnects.
com.ibm.ism.pmtco.livechat.maxDisconnectsAllowed = 0;

//Variables that control chat window blink indication, override if desired.
com.ibm.ism.pmtco.livechat.blinkColor = "#A5A5A5";
com.ibm.ism.pmtco.livechat.blinkRate = 500;

// Variables for internal use, DO NOT override.
com.ibm.ism.pmtco.livechat.openCount = 0;
com.ibm.ism.pmtco.livechat.disconnectCount = 0;
com.ibm.ism.pmtco.livechat.connected = false;
com.ibm.ism.pmtco.livechat.gotHandshake = false;
com.ibm.ism.pmtco.livechat.clientId = '';
com.ibm.ism.pmtco.livechat.lastChatClientId = '';
com.ibm.ism.pmtco.livechat.deferredFuncs = new Array();

com.ibm.ism.pmtco.livechat._onListenerException = function(exception, subscriptionHandle, isListener, message) { 
	if (exception.message) {
		console.error('CometD listener exception thrown: ' + exception.message);
	}
	else {
		console.error('CometD listener exception thrown');
	}
};

com.ibm.ism.pmtco.livechat.open = function(host, context) {
	if (com.ibm.ism.pmtco.livechat.openCount > 0) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Livechat is already in use, open count: ' + com.ibm.ism.pmtco.livechat.openCount);
		}
		com.ibm.ism.pmtco.livechat.openCount++;
		return;
	}
	com.ibm.ism.pmtco.livechat.connected = false;
	com.ibm.ism.pmtco.livechat.disconnectCount = 0;
	com.ibm.ism.pmtco.livechat.gotHandshake = false;
	com.ibm.ism.pmtco.livechat.openCount = 1;
	var urlHost = location.host;
	if (host) {
		urlHost = host;
	}
	var urlContext = com.ibm.ism.pmtco.livechat.getContextRoot(location.pathname);
	if (context) {
		urlContext = context
	}
	var cometURL = location.protocol + "//" + urlHost + "/" + urlContext + "/cometd";
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Configure CometD, URL: ' + cometURL);
	}
	com.ibm.ism.pmtco.dojox.cometd.onListenerException = com.ibm.ism.pmtco.livechat._onListenerException;
	com.ibm.ism.pmtco.dojox.cometd.websocketEnabled = false;
	com.ibm.ism.pmtco.dojox.cometd.configure({
		url: cometURL,
		logLevel: com.ibm.ism.pmtco.livechat.cometdLoggingLevel
	});
	com.ibm.ism.pmtco.dojox.cometd.addListener('/meta/handshake', com.ibm.ism.pmtco.livechat._metaHandshake);
	com.ibm.ism.pmtco.dojox.cometd.addListener('/meta/connect', com.ibm.ism.pmtco.livechat._metaConnect);
	com.ibm.ism.pmtco.dojox.cometd.handshake();
};

com.ibm.ism.pmtco.livechat.close = function() {
	if (com.ibm.ism.pmtco.livechat.openCount > 1) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Livechat is still in use, open count: ' + com.ibm.ism.pmtco.livechat.openCount);
		}
		com.ibm.ism.pmtco.livechat.openCount--;
		return;
	}
	if (com.ibm.ism.pmtco.dojox.cometd.isDisconnected()) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('CometD already disconnected');
		}
		return;
	}
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Disconnect CometD');
	}
	com.ibm.ism.pmtco.dojox.cometd.disconnect(true);
	com.ibm.ism.pmtco.livechat.openCount = 0;
	com.ibm.ism.pmtco.livechat.connected = false;
	com.ibm.ism.pmtco.livechat.disconnectCount = 0;
	com.ibm.ism.pmtco.livechat.gotHandshake = false;
	com.ibm.ism.pmtco.livechat.deferredFuncs.length = 0;
};

com.ibm.ism.pmtco.livechat.clearTimeoutInterval = function() {
	// clear timeout interval so chat windows never time out
	clearTimeout(logoutTimerID);
	logoutTimerID = -1;
	signedOut = true;
};

com.ibm.ism.pmtco.livechat.runAfterHandshake = function(func) {
	com.ibm.ism.pmtco.livechat.deferredFuncs.push(func);
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Deferred function to be run after CometD handshake, queue size: ' + com.ibm.ism.pmtco.livechat.deferredFuncs.length);
	}
};

com.ibm.ism.pmtco.livechat.publish = function(channel, data) {
	com.ibm.ism.pmtco.dojox.cometd.publish(channel, data);
};

com.ibm.ism.pmtco.livechat.subscribe = function(channel, func) {
	return com.ibm.ism.pmtco.dojox.cometd.subscribe(channel, func);
};

com.ibm.ism.pmtco.livechat.unsubscribe = function(subscription) {
	com.ibm.ism.pmtco.dojox.cometd.unsubscribe(subscription);
};

com.ibm.ism.pmtco.livechat.batch = function(func) {
	com.ibm.ism.pmtco.dojox.cometd.batch(func);
};

com.ibm.ism.pmtco.livechat._metaHandshake = function(handshake) {
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Received CometD handshake: ' + dojo.toJson(handshake));
	}
	if (handshake.successful === true) {
		com.ibm.ism.pmtco.livechat.gotHandshake = true;
		com.ibm.ism.pmtco.livechat.clientId = handshake.clientId;
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Running CometD handshake deferred functions, queue size: ' + com.ibm.ism.pmtco.livechat.deferredFuncs.length);
		}
		dojo.forEach(com.ibm.ism.pmtco.livechat.deferredFuncs, function(func) {
			func();
		});
	}
	else {
		console.error('CometD handshake unsuccessful');
		com.ibm.ism.pmtco.livechat.onHandshakeFailed();
	}
};

com.ibm.ism.pmtco.livechat._metaConnect = function(message) {
	if (com.ibm.ism.pmtco.dojox.cometd.isDisconnected()) {
		com.ibm.ism.pmtco.livechat.connected = false;
		com.ibm.ism.pmtco.livechat.disconnectCount = 0;
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('CometD connection closed');
		}
		com.ibm.ism.pmtco.livechat.onConnectionClosed();
		return;
	}
	if (message && message.successful && message.successful === true) {
		if (com.ibm.ism.pmtco.livechat.disconnectCount > 0) {
			console.warn('Detected CometD reconnect, reset count');
		}
		com.ibm.ism.pmtco.livechat.disconnectCount = 0;
	}
	else {
		com.ibm.ism.pmtco.livechat.disconnectCount++;
		console.warn('Detected CometD disconnect, count=' + com.ibm.ism.pmtco.livechat.disconnectCount);
	}
	var wasConnected = com.ibm.ism.pmtco.livechat.connected;
	if (com.ibm.ism.pmtco.livechat.disconnectCount > com.ibm.ism.pmtco.livechat.maxDisconnectsAllowed) {
		com.ibm.ism.pmtco.livechat.connected = false;
	}
	else {
		com.ibm.ism.pmtco.livechat.connected = true;
	}
	if (!wasConnected && com.ibm.ism.pmtco.livechat.connected) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('CometD connection established');
		}
		com.ibm.ism.pmtco.livechat.onConnectionEstablished();
	}
	else if (wasConnected && !com.ibm.ism.pmtco.livechat.connected) {
		console.error('CometD connection broken');
		com.ibm.ism.pmtco.livechat.onConnectionBroken();
	}
};

// Functions for opening chat windows.

com.ibm.ism.pmtco.livechat.launchAgentChat = function(id) {
	com.ibm.ism.pmtco.livechat._launchChatAgent(id);
};

com.ibm.ism.pmtco.livechat.launchEndUserChatOld = function(id) {
	com.ibm.ism.pmtco.livechat._launchChat(id);
};

com.ibm.ism.pmtco.livechat.launchEndUserChat = function(comp, eventType, eventValue, requesttype, piggyBack) {
	com.ibm.ism.pmtco.livechat._launchChat(comp.id);
	return REQUESTTYPE_NONE;
};

com.ibm.ism.pmtco.livechat.agentChatClosed = function(id) {
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Sending closeChat event, id=' + id);
	}
	sendXHREvent('closeChat', id, com.ibm.ism.pmtco.livechat.clientId+'/'+com.ibm.ism.pmtco.livechat.agentContext.uiSessionId, REQUESTTYPE_NORENDER);
};

com.ibm.ism.pmtco.livechat.endUserChatClosed = function(id) {
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Sending closeChat event, id=' + id);
	}
	sendXHREvent('closeChat', id, com.ibm.ism.pmtco.livechat.clientId+'/'+com.ibm.ism.pmtco.livechat.endUserContext.uiSessionId, REQUESTTYPE_NORENDER);
};

com.ibm.ism.pmtco.livechat._launchChat = function(id) {
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Sending launchChat event, id=' + id);
	}
	sendXHREvent('launchChat', id, '', REQUESTTYPE_HIGHASYNC, 'json', 'application/json', function(response, ioargs) {
		if (response) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Received response from launchChat event: ' + dojo.toJson(response));
			}
			if (response.message) {
				com.ibm.ism.pmtco.livechat._showPopup(response.message, '500px');
				return;
			}
			var chatWin;
			if (response.uisessionid) {
				chatWin = com.ibm.ism.pmtco.livechat._openChatWindow(response.winwidth, response.winheight, response.appname, response.uisessionid);
			}
			else {
				chatWin = com.ibm.ism.pmtco.livechat._openChatWindow(response.winwidth, response.winheight, response.appname);			
			}
			if (com.ibm.ism.pmtco.livechat._popupBlocked(chatWin)) {
				console.warn('Popup of chat window was blocked by browser');
				sendXHREvent('resetChat', id, '', REQUESTTYPE_NORENDER);
				com.ibm.ism.pmtco.livechat._showPopup(com.ibm.ism.pmtco.livechat.popupBlockedMsg, '500px');
			}
			else if (response.mxevent && response.pageid) {
				if (com.ibm.ism.pmtco.livechat.debug === true) {
					console.log('Sending ' + response.mxevent + ' event from launchChat event response, id=' + response.pageid);
				}
				sendEvent(response.mxevent, response.pageid, '');
			}
		}
		else {
			console.error('No response object returned from launchChat event');
		}
	},
	function(response, ioargs) {
		console.error('Error response function triggered from launchChat event');
	});
};

com.ibm.ism.pmtco.livechat._launchChatAgent = function(id) {
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Sending launchChat event for agent, id=' + id);
	}
	com.ibm.ism.pmtco.livechat.onBeforeAgentLaunch();
	sendXHREvent('launchChat', id, '', REQUESTTYPE_HIGHASYNC, 'json', 'application/json', function(response, ioargs) {
		if (response) {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Received response from launchChat event for agent: ' + dojo.toJson(response));
			}
			if (response.message) {
				com.ibm.ism.pmtco.livechat.onFailedAgentLaunch();
				com.ibm.ism.pmtco.livechat._showPopup(response.message, '500px');
				return;
			}
			var chatWin;
			if (response.uisessionid) {
				chatWin = com.ibm.ism.pmtco.livechat._openChatWindow(response.winwidth, response.winheight, response.appname, response.uisessionid);
			}
			else {
				chatWin = com.ibm.ism.pmtco.livechat._openChatWindow(response.winwidth, response.winheight, response.appname);			
			}
			if (com.ibm.ism.pmtco.livechat._popupBlocked(chatWin)) {
				console.warn('Popup of chat window was blocked by browser');
				sendXHREvent('resetChat', id, '', REQUESTTYPE_NORENDER);
				com.ibm.ism.pmtco.livechat.onFailedAgentLaunch();
				com.ibm.ism.pmtco.livechat._showPopup(com.ibm.ism.pmtco.livechat.popupBlockedMsg, '500px');
			}
			else {
				com.ibm.ism.pmtco.livechat.onSuccessAgentLaunch();
			}
		}
		else {
			console.error('No response object returned from launchChat event for agent');
			com.ibm.ism.pmtco.livechat.onFailedAgentLaunch();
		}
	},
	function(response, ioargs) {
		console.error('Error response function triggered from launchChat event for agent');
		com.ibm.ism.pmtco.livechat.onFailedAgentLaunch();
	});
};

com.ibm.ism.pmtco.livechat._popupBlocked = function(window) {
	if (!window || window.closed || typeof window == 'undefined' || typeof window.closed == 'undefined') {
		return true;
	}
	else {
		return false;
	}
};

com.ibm.ism.pmtco.livechat._showPopup = function(message, w) {
	showCustomPopup({
		compid: "",
		width: w,
		systemdialog: true,
		focus: true, 
		content: "<p style=\"margin: 5px;\">" + message + "</p>",  
		icon: "st_MessageWarning.png", 
		closeX: false,
		buttons: [{
			id: "xxxx_button1",
			text: com.ibm.ism.pmtco.livechat.okLabel,
			event: ""
		}]
	});
};

com.ibm.ism.pmtco.livechat.promptCloseChatWindow = function(message, w) {
	showCustomPopup({
		compid: "",
		width: w,
		systemdialog: true,
		content: "<p style=\"margin: 5px;\">" + message + "</p>", 
		icon: "st_MessageQuestion.png", 
		closeX: false,
		buttons: [
			{
		    	id: "xxxx_button1",
		    	text: com.ibm.ism.pmtco.livechat.okLabel,
		    	event: "warnExit = false; window.close();"
		    },
		    {
				id: "xxxx_button2",
				text: com.ibm.ism.pmtco.livechat.cancelLabel,
				event: ""
			}
		]
	});
};

com.ibm.ism.pmtco.livechat._openChatWindow = function(width, height, appName, uisessionid) {
	
	var chatProps = "width=" + width + ",height=" + height + ",location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no";
	var chatURL = location.protocol + "//" + location.host + "/" + com.ibm.ism.pmtco.livechat.getContextRoot(location.pathname) + "/ui/?event=loadapp&value=" + appName;
	if (uisessionid) {
		chatURL = chatURL + "&uisessionid=" + uisessionid;
	}
	var csrftoken = com.ibm.ism.pmtco.livechat._getQueryValue("csrftoken");
	if (csrftoken) {
		chatURL = chatURL + "&csrftoken=" + csrftoken;
	}
	if (com.ibm.ism.pmtco.livechat.debug === true) {
		console.log('Open chat window: ' + chatURL);
	}
	return window.open(chatURL, '_blank', chatProps);
};

com.ibm.ism.pmtco.livechat._getQueryValue = function(name) {
	var index = location.search.indexOf(name + "=");
	if (index > -1) {
		var value = location.search.substring(index);
		index = value.indexOf("=");
		value = value.substring(index+1);
		index = value.indexOf("&");
		if (index > -1) {
			value = value.substring(0, index);
		}
		return value;
	}
	else {
		return null;
	}
};

com.ibm.ism.pmtco.livechat._getQueryValue2 = function(loc, name) {
	var index = loc.search.indexOf(name + "=");
	if (index > -1) {
		var value = loc.search.substring(index);
		index = value.indexOf("=");
		value = value.substring(index+1);
		index = value.indexOf("&");
		if (index > -1) {
			value = value.substring(0, index);
		}
		return value;
	}
	else {
		return null;
	}
};

// Functions for controlling the chat process.

com.ibm.ism.pmtco.livechat.clearDisplay = function(id) {
	var chat = dojo.byId(id);
	chat.innerHTML = "";
};

com.ibm.ism.pmtco.livechat.displayMessage = function(id, text, align) {
	var chatArea = dojo.byId(id);
	var chatClass;
	if (chatArea.hasChildNodes()) {
		chatClass = "pmtcochatwin_chatItem";
	}
	else {
		chatClass = "pmtcochatwin_chatItemNoPad";
	}
	com.ibm.ism.pmtco.livechat.lastChatClientId = "";
	
	chatArea.innerHTML += "<div class=\"" + chatClass + "\"><div class=\"pmtcochatwin_chatSysMessage\">" + text + "</div></div>";

	chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
};

com.ibm.ism.pmtco.livechat.displayChat = function(id, message, align) {
	var chatText = message.data.chat;
	chatText = com.ibm.ism.pmtco.livechat.escapeHTML(chatText);
	var chatArea = dojo.byId(id);
	var titleClass = "pmtcochatwin_chatMeTitle";
	var commentsClass = "pmtcochatwin_chatMeComments";
	if (com.ibm.ism.pmtco.livechat.clientId != message.data.clientid) {
		titleClass = "pmtcochatwin_chatYouTitle";
		commentsClass = "pmtcochatwin_chatYouComments";
	}
	var name = message.data.personid;
	if (com.ibm.ism.pmtco.livechat.lastChatClientId === message.data.clientid) {
		name = "&#62;";
	}
	else if (message.data.displayname) {
		name = message.data.displayname;
	}
	
	// replace text with links
	chatText = com.ibm.ism.pmtco.livechat.replaceURLWithLinks(chatText);
		
	var chatClass;
	if (com.ibm.ism.pmtco.livechat.lastChatClientId === message.data.clientid) {
		chatClass = "pmtcochatwin_chatItemNoPad";
	}
	else if (chatArea.hasChildNodes()) {
		chatClass = "pmtcochatwin_chatItem";
	}
	else {
		chatClass = "pmtcochatwin_chatItemNoPad";
	}
	
	chatArea.innerHTML += "<div class=\"" + chatClass + "\"><div class=\"" + titleClass + "\">" + name + "</div><div class=\"" + commentsClass + "\">" + chatText + "</div></div>";
		
	chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
	com.ibm.ism.pmtco.livechat.lastChatClientId = message.data.clientid;
	if (com.ibm.ism.pmtco.livechat.clientId != message.data.clientid) {
		com.ibm.ism.pmtco.livechat.onChatReceived();
	}
};

com.ibm.ism.pmtco.livechat.displayGreeting = function(id, name, text, align, isYou) {
	if (!text || !text.length) return;
	var chatArea = dojo.byId(id);
	var titleClass = "pmtcochatwin_chatMeTitle";
	var commentsClass = "pmtcochatwin_chatMeComments";
	if (isYou) {
		titleClass = "pmtcochatwin_chatYouTitle";
		commentsClass = "pmtcochatwin_chatYouComments";
	}
	
	var chatClass;
	if (chatArea.hasChildNodes()) {
		chatClass = "pmtcochatwin_chatItem";
	}
	else {
		chatClass = "pmtcochatwin_chatItemNoPad";
	}

	chatArea.innerHTML += "<div class=\"" + chatClass + "\"><div class=\"" + titleClass + "\">" + name + "</div><div class=\"" + commentsClass + "\">" + text + "</div></div>";

	chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
};
		
com.ibm.ism.pmtco.livechat.replaceURLWithLinks = function(text) {
	//text starting with http:// https:// or ftp://
    //var httpPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	var httpPattern = /((https?|ftp):\/\/[\S]+(\B|\b|$))/gim;
    var processedText = text.replace(httpPattern, '<a href="$1" target="_blank">$1</a>');

    //text starting with www. without http prefix
    var wwwPattern = /(^|[^\/])(www\.[\S]+(\B|\b|$))/gim;
    processedText = processedText.replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

    // email addresses 
    var emailPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+)/gim;
    processedText = processedText.replace(emailPattern, '<a href="mailto:$1">$1</a>');

    return processedText;
};

com.ibm.ism.pmtco.livechat.sendChat = function(id, from, channel, displayname) {
    var text = dojo.byId(id).value.replace(/(\r\n|\n|\r)/gm, "");
    dojo.byId(id).value = '';
    if (!text || !text.length) return;
    var data = { personid: from, chat: text, clientid: com.ibm.ism.pmtco.livechat.clientId };
    if (displayname) {
    	data.displayname = displayname;
    }
	com.ibm.ism.pmtco.livechat.publish(channel, data);
};

com.ibm.ism.pmtco.livechat.escapeHTML = function(string) {
    var pre = document.createElement('pre');
    var text = document.createTextNode( string );
    pre.appendChild(text);
    return pre.innerHTML;
};

com.ibm.ism.pmtco.livechat.sendRequestNextAgent = function(session, person, tickid, tickuid, newsr, qid) {
	com.ibm.ism.pmtco.livechat.publish('/service/SCCDChat/requestNextAgent', { uisession: session, personid: person, ticketid: tickid, ticketuid: tickuid, isnewsr: newsr, queueid: qid } );
};

com.ibm.ism.pmtco.livechat.sendNotifyLeaveChat = function() {
	com.ibm.ism.pmtco.livechat.publish('/service/SCCDChat/notifyLeaveChat', { });
};

com.ibm.ism.pmtco.livechat.sendNotifyAgentReady = function(session, person, queues) {
	com.ibm.ism.pmtco.livechat.publish('/service/SCCDChat/notifyAgentReady', { uisession: session, personid: person, queueids: queues } );
};

com.ibm.ism.pmtco.livechat.sendRequestWaitQueueInfo = function(session) {
	com.ibm.ism.pmtco.livechat.publish('/service/SCCDChat/requestWaitQueueInfo', { uisession: session } );
};

com.ibm.ism.pmtco.livechat.subscribeReceiveAgentReady = function(func) {
	return com.ibm.ism.pmtco.livechat.subscribe('/SCCDChat/receiveAgentStatus', func);
};

com.ibm.ism.pmtco.livechat.subscribeReceiveEnduserReady = function(func) {
	return com.ibm.ism.pmtco.livechat.subscribe('/SCCDChat/receiveEnduserStatus', func);
};

com.ibm.ism.pmtco.livechat.subscribeReceiveWaitQueueInfo = function(func) {
	return com.ibm.ism.pmtco.livechat.subscribe('/SCCDChat/receiveWaitQueueInfo', func);
};

com.ibm.ism.pmtco.livechat.totalQueueCount = function(queueids, queuecounts) {
	var total = 0;
	dojo.forEach(queuecounts, function(queue) {
		if (dojo.some(queueids, function(item){return item === queue.queueid})) {
			total = total + queue.count;
		}
	});
	return total;
};

com.ibm.ism.pmtco.livechat.keepAliveCallback = function() {
	if (com.ibm.ism.pmtco.livechat.debug === true) {	
		console.log('Calling resetLogoutTimer');
	}
	resetLogoutTimer(false);
};

com.ibm.ism.pmtco.livechat.startWindowBlink = function() {
	if (!com.ibm.ism.pmtco.livechat.blinkTimer) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Start chat window blink');
		}
		com.ibm.ism.pmtco.livechat.saveBackgroundColor = window.document.body.style.backgroundColor;
		com.ibm.ism.pmtco.livechat.blinkTimer = setInterval(com.ibm.ism.pmtco.livechat._blinkTimerCallback, com.ibm.ism.pmtco.livechat.blinkRate);
	}
};

com.ibm.ism.pmtco.livechat.stopWindowBlink = function() {
	if (com.ibm.ism.pmtco.livechat.blinkTimer) {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Stop chat window blink');
		}
		clearInterval(com.ibm.ism.pmtco.livechat.blinkTimer);
		com.ibm.ism.pmtco.livechat.blinkTimer = null;
		window.document.body.style.backgroundColor = com.ibm.ism.pmtco.livechat.saveBackgroundColor;
	}
};

com.ibm.ism.pmtco.livechat._blinkTimerCallback = function() {
	var bgColor = window.document.body.style.backgroundColor;
	if (bgColor === com.ibm.ism.pmtco.livechat.saveBackgroundColor) {
		window.document.body.style.backgroundColor = com.ibm.ism.pmtco.livechat.blinkColor;
	}
	else {
		window.document.body.style.backgroundColor = com.ibm.ism.pmtco.livechat.saveBackgroundColor;
	}
};

com.ibm.ism.pmtco.livechat.adjustHeight = function(containerId, areaId) {
	com.ibm.ism.pmtco.livechat._adjustHeightToFit(containerId, areaId, 100, 30, 33);
};

com.ibm.ism.pmtco.livechat._adjustHeightToFit = function(containerId, areaId, minHeight, margin, padding) {
	var wHeight = document.body.clientHeight;
	if (wHeight > 0) {
		var iHeight = 0;
		dojo.query("#" + containerId + ">div").forEach(function(node, index, nodelist) {
			if (node.id === areaId) {}
			else if (node.offsetHeight > 0) {
				iHeight += node.offsetHeight
			}
		});
		var jHeight = wHeight - (iHeight + margin);
		if (jHeight > minHeight) {
			if (dojo.isIE) {
				padding = 0;
			}
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Chat window height=' + wHeight + ', iHeight=' + iHeight + ', padding=' + padding + ', jHeight=' + jHeight + ' - area height set');
			}			
			jHeight -= padding;
			dojo.byId(areaId).style.height = jHeight + "px";
		}
		else {
			if (com.ibm.ism.pmtco.livechat.debug === true) {
				console.log('Chat window height=' + wHeight + ', iHeight=' + iHeight + ', jHeight=' + jHeight);
			}			
		}
	}
	else {
		if (com.ibm.ism.pmtco.livechat.debug === true) {
			console.log('Chat window height not available!');
		}
	}
};

com.ibm.ism.pmtco.livechat.getContextRoot = function(path) {
	  var contextRoot = "maximo";
	  
	  var context = path;  
	  
	  if (context.indexOf("/") != 0)
		  context = "/" + context;
	  
	  var paths = context.split("/");
	  
	  if (paths.length >= 2) {
		  contextRoot = paths[1]; 
	  }	
	  
	  if (com.ibm.ism.pmtco.livechat.debug === true) {
		  console.log('Context Root = ' + contextRoot);
	  }
	  
	  return contextRoot;
};

com.ibm.ism.pmtco.livechat.endUserContext = new Object();

com.ibm.ism.pmtco.livechat.agentContext = new Object();





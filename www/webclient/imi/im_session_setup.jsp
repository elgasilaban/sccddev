<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
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
 * @version 1.7, 10/11/07
 * @file /cmvc/itsm/vc/0/4/1/9/s.43
 *
 * 
 ****************************************************************************/
%><%@ page
	info="TSD Instant Messenger Integration"
	import="
		com.ibm.tivoli.imi.controller.IMSessionHandler,
		com.ibm.tivoli.imi.controller.UserInfo,
		com.ibm.tivoli.imi.controller.SessionInfoHelper,
		com.ibm.tivoli.imi.spi.IMException"
%><%
	response.setContentType("text/html;charset=UTF-8");

	IMSessionHandler imSessionHandler = null;
	UserInfo userInfo = IMSessionHandler.getUserInfo(session);
	try {
		SessionInfoHelper.putWebClientSession(request);
		imSessionHandler = IMSessionHandler.getIMSessionHandler(session);
		if (imSessionHandler != null) {
			synchronized (imSessionHandler) {
				if (imSessionHandler.refreshIMServerHostname() && imSessionHandler.isIMSessionOpened()) {
					imSessionHandler.closeIMSession(true, request);
					/*
					WebClientSession webClientSession =  WebClientRuntime.getWebClientRuntime().getWebClientSession(session);
					WebClientEvent event = new WebClientEvent("", webClientSession.getCurrentAppId(), null, webClientSession);
					webClientSession.showMessageBox(event, IMSessionHandler.MESSAGE_GROUP, MessageKey.SERVER_CHANGED.toString(), null);
					WebClientRuntime.sendEvent(event);
					*/
				}
			}
		}
	} catch (IMException ime) {
		IMSessionHandler.logInfo(ime.getMessage());
	} catch (Exception e) {
		IMSessionHandler.logError("The following exception has occurred: " + e.getMessage(), e);
	}
%>
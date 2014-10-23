/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
/**
 * This dojo object implements the load of maxmessages to be accessible in the map 
 * 
 * @author rcouto
 */
dojo.provide("ibm.tivoli.fwm.i18n");
/**
 * This js loads msgs translated messages from MAXMESSAGES
 * 
 */
//caching variable
ibm.tivoli.fwm.i18n.msgs = {};


/**
 * Loads all MAXMESSAGES from a msggroup.
 */
ibm.tivoli.fwm.i18n.preLoadMsgGroup = function(msggroup) {
	if (ibm.tivoli.fwm.i18n.msgs[msggroup] == null) {
		var txt = dojohelper.getText(dojo.config.fwm.ctxRoot + '/rest/mbo/maxmessages?msggroup=' + msggroup + '&_includecols=msgkey,value&_format=json&');
		var maxmsgResult = dojo.fromJson(txt);
		if (maxmsgResult.MAXMESSAGESMboSet.MAXMESSAGES.length > 0) {
			ibm.tivoli.fwm.i18n.msgs[msggroup] = {};
			for ( var i = 0; i < maxmsgResult.MAXMESSAGESMboSet.MAXMESSAGES.length; i++) {
				var msg = maxmsgResult.MAXMESSAGESMboSet.MAXMESSAGES[i];				
				ibm.tivoli.fwm.i18n.msgs[msggroup][msg.Attributes.MSGKEY.content] = msg.Attributes.VALUE.content;
			}
		}
	}
};
/**
 * Loads a specific msgkey from a msggroup from MAXMESSAGES
 */
ibm.tivoli.fwm.i18n.getMaxMsg = function(msggroup, msgkey) {
	if (ibm.tivoli.fwm.i18n.msgs[msggroup] == null) {
		ibm.tivoli.fwm.i18n.msgs[msggroup] = {};
	}
	if (ibm.tivoli.fwm.i18n.msgs[msggroup][msgkey] == null) {
		ibm.tivoli.fwm.i18n.msgs[msggroup][msgkey] = ibm.tivoli.fwm.i18n._loadMsgThruRest(msggroup, msgkey);
	}
	if (ibm.tivoli.fwm.i18n.msgs[msggroup][msgkey] == null) {
		return (msggroup + "#" + msgkey);
	}

	return ibm.tivoli.fwm.i18n.msgs[msggroup][msgkey];
};
/**
 * Internal method for loading a specific message.
 */
ibm.tivoli.fwm.i18n._loadMsgThruRest = function(msggroup, msgkey) {
	var txt = dojohelper.getText(dojo.config.fwm.ctxRoot + '/rest/mbo/maxmessages?msgkey=' + msgkey + '&msggroup=' + msggroup + '&_includecols=msgkey,value&_format=json&_maxItems=1');
	var maxmsgResult = dojo.fromJson(txt);
	if (maxmsgResult.MAXMESSAGESMboSet.MAXMESSAGES.length > 0) {
		return maxmsgResult.MAXMESSAGESMboSet.MAXMESSAGES[0].Attributes.VALUE.content;
	}
	return null;
};

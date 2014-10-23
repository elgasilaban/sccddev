//>>built
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
define("ibm/tivoli/mbs/debug/UISessionIdMixin", ["dojo/_base/lang","dojo/_base/declare","dojo/topic"],
		function(lang, declare, topic)
{
	return declare("ibm.tivoli.mbs.debug.BorderContainerWithUISessionId", null,
	{
		constructor: function()
		{
			topic.subscribe("uiSessionId", lang.hitch(this, function(data) {
				this.uiSessionId = data;
				this.reload();
			}));
		},
		getUISessionIdParam: function()
		{
			return this.uiSessionIdParamName + "=" + this.uiSessionId; 
//			return this.uiSessionIdParamName + "=" + this.sessionInfo.uiSessionId + "&" + this.csrfParamName + "=" + this.sessionInfo.csrfToken; 
		},
		reload: function()
		{
		}
	});
});
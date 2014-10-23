/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

//RELOGIN IN AND RESUME ON THE APP CONTEXT WHERE THIS REDIRECT HAPPENED BECAUSE OF APPSERVER TOKEN EXPIRY Story 07-28312
dojo.require("dijit.dijit");
dojo.require("dijit.form.Form");
dojo.addOnLoad(function(event)
{
	dojo.connect(dojo.byId('loginbutton'), 'onclick', function(event)
	{
		dojo.stopEvent(event);
		dojo.xhrPost({
			form: 'loginform',			      
			handleAs: 'xml',
			handle: function(data, ioArgs) {
				parent.document.location.reload(true);
			},
			error: function(error,ioArgs) {
				parent.document.location.reload(true);
			}
		}); // xhrPost()
	}); // connect()
}); // addOnLoad()
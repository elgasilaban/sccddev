//>>built
// wrapped by build app
define("ibm/tivoli/mbs/dijit/editor/plugins/TpaePasteFromWord", ["dijit","dojo","dojox","dojo/require!dojox/editor/plugins/PasteFromWord"], function(dijit,dojo,dojox){
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011, 2012 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.provide("ibm.tivoli.mbs.dijit.editor.plugins.TpaePasteFromWord");

dojo.require("dojox.editor.plugins.PasteFromWord");

// This is a bit of a hack. I need to override the declaration of the Enterkeyhandler regularPsToSingleLinePs function
// to make it do nothing. I was causing problems with IE and needs to go away.
dijit._editor.plugins.EnterKeyHandling.prototype.regularPsToSingleLinePs = function(html)
{
	// do nothing
	return html;
};

dojo.declare("ibm.tivoli.mbs.dijit.editor.plugins.TpaePasteFromWord", dojox.editor.plugins.PasteFromWord,
{
	constructor: function()
	{
		// Add filters that make Office 2010 look better in the editor.
		// For Office 2010, remove </o:p> tags
		this._filters.push({regexp: /<(\/?)o\:p[^>]*>/gi, handler: ""});
		// Replace the <p *> tags with a <br />
		this._filters.push({regexp: /(<p[^>]*>)/ig, handler: "<br />"});
		// Scrap the </p> tags
		this._filters.push({regexp: /(<\/p[^>]*>)/ig, handler: ""});
		// Remove the various tags that cause problems.
		this._filters.push({regexp: /(<[\/]?(shape|imagedata|stroke|formulas|f|lock)[^>]*?>)/ig, handler: ""});
		// Remove the font tags inside links as they mess up the link.
		this._filters.push({regexp: /(<a\s+href[^>]*>.*?)<font[^>]*>(.*?)<\/font[^>]*>(.*?<\/a[^>]*>)/ig, handler: "$1$2$3"});
		// Remove the span tags inside links as they mess up the link.
		this._filters.push({regexp: /(<a\s+href[^>]*>.*?)<span[^>]*>(.*?)<\/span[^>]*>(.*?<\/a[^>]*>)/ig, handler: "$1$2$3"});
	},
	
	/**
	 * If the dialog was already shown, set the onfocus listener back up.
	 */
	_openDialog: function()
	{
		if (this._rte && this._rte.iframe && this._rte.iframe.onfocus_saved)
		{
			this._rte.iframe.onfocus = this._rte.iframe.onfocus_saved;
		}
		
		this.inherited(arguments);
	},
	
	/**
	 * Remove the onfocus listener as it can get in a loop with some IE plugins that cause the browser to hang.
 	 * Save it off and add it back on when if the dialog needs to be shown again.
	 */
	_paste: function()
	{
		this._rte.iframe.onfocus_saved = this._rte.iframe.onfocus;
		this._rte.iframe.onfocus = null;
		
		this.inherited(arguments);
	},
	
	/**
	 * Remove the onfocus listener as it can get in a loop with some IE plugins that cause the browser to hang.
 	 * Save it off and add it back on when if the dialog needs to be shown again.
	 */
	_cancel: function()
	{
		this._rte.iframe.onfocus_saved = this._rte.iframe.onfocus;
		this._rte.iframe.onfocus = null;
		
		this.inherited(arguments);
	}
});

//Register this plugin.
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin", null, function(o)
{
	if (o.plugin)
	{
		return;
	}
	var name = o.args.name.toLowerCase();
	if(name === "tpaepastefromword")
	{
		o.plugin = new ibm.tivoli.mbs.dijit.editor.plugins.TpaePasteFromWord({
			width: ("width" in o.args)?o.args.width:"400px",
			height: ("height" in o.args)?o.args.width:"300px"
		});
	}
});
});

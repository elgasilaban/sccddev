/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011,2012 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.provide("ibm.tivoli.mbs.dijit.editor.plugins.TpaeLinkDialog");

/**
 * This plugin extends the LinkDialog Dojo plugin and fixes a few problems with it.
 * 1. When a link it created, it ensures that it starts with "http://" if it appears to be a basic web site name.
 * 2. Adds a listener to clicks on nodes in the editor and if it's a hyperlink, launches the URL.
 */
dojo.declare("ibm.tivoli.mbs.dijit.editor.plugins.TpaeLinkDialog", dijit._editor.plugins.LinkDialog,
{
	linkDialogTemplate: [
		             		"<table><tr><td>",
		             		"<label for='${id}_urlInput'>${url}</label>",
		             		"</td><td>",
		             		"<input dojoType='dijit.form.ValidationTextBox' required='true' " +
		             		"id='${id}_urlInput' name='urlInput' intermediateChanges='true'>",
		             		"</td></tr><tr><td>",
		             		"<label for='${id}_textInput'>${text}</label>",
		             		"</td><td>",
		             		"<input dojoType='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' " +
		             		"name='textInput' intermediateChanges='true'>",
		             		"</td></tr><tr style='display:none'><td>",
		             		"<label for='${id}_targetSelect'>${target}</label>",
		             		"</td><td>",
		             		"<select id='${id}_targetSelect' name='targetSelect' dojoType='dijit.form.Select'>",
		             		"<option selected='selected' value='_self'>${currentWindow}</option>",
		             		"<option value='_blank'>${newWindow}</option>",
		             		"<option value='_top'>${topWindow}</option>",
		             		"<option value='_parent'>${parentWindow}</option>",
		             		"</select>",
		             		"</td></tr><tr><td colspan='2'>",
		             		"<button dojoType='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>",
		             		"<button dojoType='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>",
		             		"</td></tr></table>"
		             	].join(""),

	_loadDropDown: function(callback){
		//	12-14061 - Allow substitution variables starting with colon.
		this.inherited(arguments);
		var isUrlValid = this._urlInput.isValid;
		this._urlInput.isValid = dojo.hitch(this, function(){
			var value = this._urlInput.get("value");
			return value.charAt(0) == ':' || isUrlValid();
		});
	},

	/**
	 * Connects the onclick event to the launch URL function used for launching URLs defined in the Rich Text Editor.
	 */
	_connectTagEvents: function()
	{
		this.inherited(arguments);
		this.editor.onLoadDeferred.addCallback(dojo.hitch(this, function()
		{
			this.connect(this.editor.editNode, "onclick", this._launchURL);
		}));
	},
	
	/**
	 * Used to launch a URL directly from the Rich Text Editor.  Can be configured to use single click or ctrl + click
	 * through the plugin options.
	 */
	_launchURL: function(e)
	{
		if(e && e.target){
			var t = e.target;
			var tg = t.tagName? t.tagName.toLowerCase() : "";
			if(tg === this.tag){
				var href = t.href? t.href : "";
				var target = t.target? t.target : "";
				// Always launch link in new window.
				window.open(href, "_blank");
			}
		}
	},
	
	setValue: function(args)
	{
		var url = args.urlInput;
		if(url && url.length > 1)
		{
			url = dojo.trim(url);
			if(url.indexOf("://") === -1)
			{
				// Check that it doesn't start with / or ./, which would
				// imply 'target server relativeness'
				// 12-14061 - Also allow substitution variables that start with a colon.
				if(url.charAt(0) !== '/' && url.indexOf("./") !== 0 && url.charAt(0) !== ':')
				{
					if(this._hostRxp.test(url)){
						url = "http://" + url;
					}
				}
			}
		}
		args.urlInput = url;
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
	switch(o.args.name)
	{
		case "tpaeCreateLink":
			o.plugin = new ibm.tivoli.mbs.dijit.editor.plugins.TpaeLinkDialog({command: "createLink"});
			break;
	}
});
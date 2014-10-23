//>>built
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

/**
 * Extends the dijit Editor widget to fix some bugs.
 */
define("ibm/tivoli/mbs/dijit/editor/TpaeTextEditor", ["dojo/_base/declare", "dojo/_base/sniff", "dijit/Editor"], function(declare, has, Editor)
{
	return declare("ibm.tivoli.mbs.dijit.editor.TpaeTextEditor", Editor, 
	{
		// Reference to the save button so we don't have to search for it every time.
		saveButtonElement: null,
		
		// Flag to denote when to ensure the fontname in the editor needs to be reset to the value from the drop down. This can happen in IE
		// When the font size is changed right after changing the font name.
		fixFontName: false,
		
		/**
		 * Save reference to the save button after the editor has been fully loaded. This will make sure we don't start trying to
		 * enable the save button until after the editor has finished loading.
		 * 
		 * Also, for IE override the onFocus for the iframe to better handle browser changes to the font name.
		 */
		onLoad: function(html)
		{
			this.inherited(arguments);
			if (saveButton)
				this.saveButtonElement = getElement(saveButton);
			
			if (has("ie"))
			{
				var fontSizePlugin = this._findPlugin("fontSize");
				if (fontSizePlugin)
				{
					var _editor = this;
					fontSizePlugin.connect(fontSizePlugin.button.select, "onChange", function(choice) {
						_editor.fixFontName = true;
					});
				}
				
				// Override the iframe onfocus listener in IE to better handle font name changing.
				var _fontNamePlugin = this._findPlugin("fontName");
				if (_fontNamePlugin)
				{
					var _this = this;
					var _inheritedIframeOnFocus = this.iframe.onfocus;
					
					this.iframe.onfocus = function()
					{
						// This is a fix for IE that changes the focus to be on the edit node instead of the body of the iframe, but it breaks
						// some instances with the font name plugin where its value can be lost. The rest of the code in this function fixes that
						// side effect.
						if (_inheritedIframeOnFocus)
							_inheritedIframeOnFocus();
						
						// Only fix the font name when the font size has been set.
						if (_this.fixFontName)
						{
							_this.fixFontName = false;
							
							var fontNamePluginValue = _fontNamePlugin.button.attr("value");
							// If the font name in the plugin doesn't match the browser, reset the browser to what the plugin says.
							if (_this.queryCommandValue("fontName") != fontNamePluginValue && fontNamePluginValue != '')
							{
								_this._fontnameImpl(fontNamePluginValue);
							}
						}
					};
				}
			}
		},
		onKeyUp: function(e){
			this.inherited(arguments);
			parent.appHotkey(e);
		},
		/**
		 * Finds the plugin in the editor that has the specified command.
		 */
		_findPlugin: function(pluginCommand)
		{
			var plugin = null;
			// Search from the end because the font name plugin is likely to be near the end of the array.
			for (var i = this._plugins.length - 1; i >= 0 && plugin == null; i--)
			{
				if (this._plugins[i])
				{
					if (this._plugins[i].command == pluginCommand)
						plugin = this._plugins[i];
				}
			}
			return plugin;
		},
		
		
		/**
		 * Enable save button if it's disabled and the content has changed.
		 */
		onNormalizedDisplayChanged: function(event)
		{
			this.inherited(arguments);
			if (this.saveButtonElement)
			{
				var disabled = this.saveButtonElement.getAttribute("disabled");
				// In IE the value for disabled is a boolean while in firefox it is a string. Handle both cases.
				var disabledBoolean = (typeof disabled == "boolean" && disabled) || disabled == "true";
				if (disabledBoolean && (this.getValue(true) != this.savedContent))
				{
					setButtonEnabled(saveButton, true);
				}
			}
		},
		
		_fontnameImpl: function(/*String*/argument)
		{
			// If the font choice is surrounded by single quotes, get rid of them.  They are unnecessary and mess up
			// Lotus notes when the email gets forwarded.
			if (argument && argument.length >= 2 && argument.charAt(0) == '\'' && argument.charAt(argument.length - 1) == '\'')
				argument = argument.substring(1,argument.length - 1);
			return this.inherited(arguments);
		},
		
		_insertorderedlistImpl: function(/*String*/argument) {
			this._fixlisttoggle('insertorderedlist', argument);
			return this.inherited(arguments);
		},
	
		_insertunorderedlistImpl: function(/*String*/argument) {
			this._fixlisttoggle('insertunorderedlist', argument);
			return this.inherited(arguments);
		},
		
		/**
		 * Fixes the toggling of list types in IE.  Without this fix, when changing a line from bullet to numbers
		 * IE will change the entire list.  This forces only the line that the cursor is on or set of selected lines
		 * to change to the new list type.
		 */
		_fixlisttoggle: function(/*String*/command, /*String*/argument) {
			// First check to see if we're in IE.  If not, just execute the normal command.
			if (has("ie"))
			{
				// First check to see if we're in an existing list.
				var range = dijit.range.getSelection(this.window).getRangeAt(0);
				var blockNode = dijit.range.getBlockAncestor(range.endContainer, null, this.editNode).blockNode;
				var togglingListType = (((blockNode.parentNode.nodeName == 'UL' || blockNode.parentNode.parentNode.nodeName == 'UL') && command == 'insertorderedlist') 
							|| ((blockNode.parentNode.nodeName == 'OL' || blockNode.parentNode.parentNode.nodeName == 'OL') && command == 'insertunorderedlist'));
				
				if (togglingListType)
				{
					// Now make sure we're not in a sublist.
					var listNode = blockNode.parentNode;
					if (blockNode.parentNode.nodeName != 'UL' && blockNode.parentNode.nodeName != 'OL')
						listNode = blockNode.parentNode.parentNode;
					
					// If parentNode of the list is another list, then we're in a sublist and should not
					// outdent before running the command.
					if (listNode.parentNode.nodeName != 'UL' && listNode.parentNode.nodeName != 'OL')
					{
						// We're toggling the list type.  First execute an outdent to remove the existing list and then execute the command to create the list.
						// This will allow only the selected lines to be included in the new list.
						this.document.execCommand('outdent', false);
					}
				}
			}
		}
	});
});
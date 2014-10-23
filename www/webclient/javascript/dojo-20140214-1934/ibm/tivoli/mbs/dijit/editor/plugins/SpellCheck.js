//>>built
// wrapped by build app
define("ibm/tivoli/mbs/dijit/editor/plugins/SpellCheck", ["dijit","dojo","dojox","dojo/require!dijit/_editor/_Plugin"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.mbs.dijit.editor.plugins.SpellCheck");

dojo.require("dijit._editor._Plugin");

dojo.declare("ibm.tivoli.mbs.dijit.editor.plugins.SpellCheck",
	dijit._editor._Plugin,
	{
		//	summary:
		//		This plugin provides a button for checking the spelling of the content in the editor.
		//
		//	description:
		//		The command provided by this plugin are:
		//		* checkSpelling

		// Override _Plugin.useDefaultCommand: processing is done in this plugin rather than by sending command to
		// the Editor
		useDefaultCommand: false,
		iconClassPrefix: "editorIcon",

		// TODO: unclear if this is needed.
		command: "spellCheck",
		
		setEditor: function(){
			// Override _Plugin.setEditor() to setup handler for button click events.
			this.inherited("setEditor", arguments);
			this.connect(this.button, "onClick", this._spellcheck);
		},
		
		getLabel: function() {
			return "Spell Check";
		},
		
		updateState: function(){
			// Override _Plugin.updateState() to only follow disabled setting of entire control.
			this.button.set('disabled', this.editor.get('disabled'));
		},
		
		_spellcheck: function(){
			queueManager.hold();
			queueManager.currentfocus = this.editor.id;
			queueManager.queueEvent(new Event('setvalue',this.editor.id,this.editor.get('value'),'SYNC'),"text/xml","xml", processXHR);
			queueManager.queueEvent(new Event('spellcheck',this.editor.id,'','SYNC'),"text/xml","xml", processXHR);
			queueManager.release();
		}
	}
);
// Register this plugin.
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin",null,function(o){
	if(o.plugin){ return; }
	switch(o.args.name){
	case "spellCheck":
		o.plugin = new ibm.tivoli.mbs.dijit.editor.plugins.SpellCheck({command: o.args.name});
	}
});

});

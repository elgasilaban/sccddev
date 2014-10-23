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
define("ibm/tivoli/mbs/debug/ServerLogs", ["dojo/_base/lang","dojo/_base/declare","dojo/_base/xhr","dojo/dom-construct","dojo/on","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/Toolbar","dijit/form/TextBox","dijit/form/Button"], 
		function(lang, declare, xhr, domConstruct, on, BorderContainer, ContentPane, Toolbar, TextBox, Button)
{
	return declare("ibm.tivoli.mbs.debug.LogFiles", BorderContainer, 
	{
		_stack: [],
		_current: null,
		_setPath: function(path)
		{
			if(path === this._current)
			{
				return;
			}
			this.logPath.set('value', path);
			this._stack.push(this._current);
			this._backButton.set('disabled', false);
			this._load(path);
		},
		_goto: function(path)
		{
			var value = this.logPath.get('value');
			if(value)
			{
				value += '/';
			}
			this._setPath(value + path);
		},
		_back: function()
		{
			var path = this._stack.pop();
			if(path !== null && path !== undefined)
			{
				this.logPath.set('value', path);
				this._load(path);
			}
			if(this._stack.length === 0)
			{
				this._backButton.set('disabled', true);
			}
		},
		_load: function(path)
		{
			var self = this;
			this._current = path;
			xhr.get({
				url: "debug/serverLogs.jsp?path=" + path,
				handleAs: "json",
				load: function(result) {
					var div = domConstruct.create("div");
					domConstruct.place(div, self.logContent, "only");
					if(result.files && result.files.length > 0)
					{
						var table = domConstruct.create("table");
						domConstruct.place(table, div);

						var tr = domConstruct.create("tr");
						domConstruct.place(tr, table);

						var td = domConstruct.create("th");
						domConstruct.place(td, tr);
						domConstruct.place(document.createTextNode('Name'), td);

						var td = domConstruct.create("th", {style: 'text-align:center;'});
						domConstruct.place(td, tr);
						domConstruct.place(document.createTextNode('Last Modified'), td);

						var td = domConstruct.create("th");
						domConstruct.place(td, tr);
						domConstruct.place(document.createTextNode('Size'), td);
						
						for(var i = 0; i < result.files.length; i++)
						{
							tr = document.createElement('tr');
							table.appendChild(tr);

							var file = result.files[i];
							td = document.createElement('td');
							tr.appendChild(td);
							var anchor = document.createElement('a');
							anchor.setAttribute('href', file.name);
							td.appendChild(anchor);
							on(anchor, "click", function(e) {
								self._goto(this.getAttribute('href'));
								e.preventDefault(); 
							});
							anchor.appendChild(document.createTextNode(file.name + (file.isDirectory?'/':'')));
							td = domConstruct.create("th", {style: 'padding:0px 20px;'});
							tr.appendChild(td);
							td.appendChild(document.createTextNode(file.lastModified));

							td = domConstruct.create("th", {style: 'text-align:right;'});
							tr.appendChild(td);
							td.appendChild(document.createTextNode(file.size));
						}
					}
					if(result.fileContent)
					{
						var pre = domConstruct.create("pre");
						domConstruct.place(pre, div, "last");
						pre.appendChild(document.createTextNode(result.fileContent));
					}
				},
				error: function(error, ioArgs) {
					var div = domConstruct.create("div");
					domConstruct.place(div, self.logContent, "only");
					div.setAttribute('style','color: red;');
					div.appendChild(document.createTextNode(ioArgs.xhr.responseText));
				}
			});
		},

		postCreate: function()
		{
			this.inherited(arguments);

			var content = new ContentPane({
				region: "center",
				splitter: false
			});
			this.logContent = domConstruct.create("div");
			content.set('content', this.logContent);
			
			this.addChild(content);
		
			
			var toolbar = new Toolbar({region: "top", splitter:false});
			
			var back = this._backButton = new Button({
				label: "Back",
				showLabel: false,
				iconClass: "tpaeDebugBackward",
				disabled: true,
				onClick: function() {
					self._back();
				}
			});
			toolbar.addChild(back);

			var label = domConstruct.create("label", {"for":"logPath",style:"vertical-align: middle;"});
			label.appendChild(document.createTextNode("Path:"));
			domConstruct.place(label, toolbar.containerNode);
			
			this.logPath = new TextBox({
				id: "logPath",
				style: "width:400px",
				onKeyUp: function(e) {
					if(e.keyCode == 13)
					{
						self._setPath(self.logPath.get('value'));
					}
				}
			});
			
			toolbar.addChild(this.logPath);
			
			var self = this;
			var go = new Button({
				label: "Go",
				onClick: function() {
					self._setPath(self.logPath.get('value'));
				}
			});
			toolbar.addChild(go);

			
			this.addChild(toolbar);

			this._load('');
		}
	});
});
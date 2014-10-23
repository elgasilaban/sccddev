/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{
'dijit/form/nls/validate':function(){
define({ root:
//begin v1.x content
({
	invalidMessage: "The value entered is not valid.",
	missingMessage: "This value is required.",
	rangeMessage: "This value is out of range."
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"hr": true,
"he": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"az": true,
"ar": true
});

},
'url:dijit/templates/CheckedMenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n",
'ibm/tivoli/fwm/mxmap/routing/itinerary/Step':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/routing/Router"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");

/**
 * 
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Step", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/Step.html", "<div  style=\"width:100%;border-top:1px solid #F0F0F0;margin-bottom:3px;\" data-dojo-attach-event=\"ondijitclick:_onClick,onmouseenter:_onHover,onmouseleave:_onUnhover\" >\n\n<div  style=\"padding:10px;\">\n<span data-dojo-attach-point=\"stepInfoNode\"></span><div data-dojo-attach-point=\"distanceInfoNode\" style=\"float:right;\"></div></div>\n</div>"),
	distanceUnit:0,
	distance:0,
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	postCreate: function()
	{
		this.stepInfoNode.innerHTML = "<b>" + this.position + ".  </b>" + this.info;
		
		this.distanceInfoNode.innerHTML = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatDistance(this.distance,this.distanceUnit);
	},
	_onClick: function(evt)
	{
		console.log("Clicked on step " , this);
		this.map.getMapstraction().setCenter(this.location);
		this.closeDialog();
		
	},
	_onHover: function(evt)
	{
		// console.log("e")
		// dojo.style(this.domNode,"border","1px solid black");
	},
	_onUnhover: function(evt)
	{
		// console.log("a")
		// dojo.style(this.domNode,"border","0px solid black");
	}
});

});

},
'dijit/_base/scroll':function(){
define("dijit/_base/scroll", [
	"dojo/window", // windowUtils.scrollIntoView
	".."	// export symbol to dijit
], function(windowUtils, dijit){
	// module:
	//		dijit/_base/scroll
	// summary:
	//		Back compatibility module, new code should use windowUtils directly instead of using this module.

	dijit.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
		// summary:
		//		Scroll the passed node into view, if it is not already.
		//		Deprecated, use `windowUtils.scrollIntoView` instead.

		windowUtils.scrollIntoView(node, pos);
	};
});

},
'dijit/_TemplatedMixin':function(){
define("dijit/_TemplatedMixin", [
	"dojo/_base/lang", // lang.getObject
	"dojo/touch",
	"./_WidgetBase",
	"dojo/string", // string.substitute string.trim
	"dojo/cache",	// dojo.cache
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.destroy, domConstruct.toDom
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window" // win.doc
], function(lang, touch, _WidgetBase, string, cache, array, declare, domConstruct, has, unload, win) {

/*=====
	var _WidgetBase = dijit._WidgetBase;
=====*/

	// module:
	//		dijit/_TemplatedMixin
	// summary:
	//		Mixin for widgets that are instantiated from a template

	var _TemplatedMixin = declare("dijit._TemplatedMixin", null, {
		// summary:
		//		Mixin for widgets that are instantiated from a template

		// templateString: [protected] String
		//		A string that represents the widget template.
		//		Use in conjunction with dojo.cache() to load from a file.
		templateString: null,

		// templatePath: [protected deprecated] String
		//		Path to template (HTML file) for this widget relative to dojo.baseUrl.
		//		Deprecated: use templateString with require([... "dojo/text!..."], ...) instead
		templatePath: null,

		// skipNodeCache: [protected] Boolean
		//		If using a cached widget template nodes poses issues for a
		//		particular widget class, it can set this property to ensure
		//		that its template is always re-built from a string
		_skipNodeCache: false,

		// _earlyTemplatedStartup: Boolean
		//		A fallback to preserve the 1.0 - 1.3 behavior of children in
		//		templates having their startup called before the parent widget
		//		fires postCreate. Defaults to 'false', causing child widgets to
		//		have their .startup() called immediately before a parent widget
		//		.startup(), but always after the parent .postCreate(). Set to
		//		'true' to re-enable to previous, arguably broken, behavior.
		_earlyTemplatedStartup: false,

/*=====
		// _attachPoints: [private] String[]
		//		List of widget attribute names associated with data-dojo-attach-point=... in the
		//		template, ex: ["containerNode", "labelNode"]
 		_attachPoints: [],
 =====*/

/*=====
		// _attachEvents: [private] Handle[]
		//		List of connections associated with data-dojo-attach-event=... in the
		//		template
 		_attachEvents: [],
 =====*/

		constructor: function(){
			this._attachPoints = [];
			this._attachEvents = [];
		},

		_stringRepl: function(tmpl){
			// summary:
			//		Does substitution of ${foo} type properties in template string
			// tags:
			//		private
			var className = this.declaredClass, _this = this;
			// Cache contains a string because we need to do property replacement
			// do the property replacement
			return string.substitute(tmpl, this, function(value, key){
				if(key.charAt(0) == '!'){ value = lang.getObject(key.substr(1), false, _this); }
				if(typeof value == "undefined"){ throw new Error(className+" template:"+key); } // a debugging aide
				if(value == null){ return ""; }

				// Substitution keys beginning with ! will skip the transform step,
				// in case a user wishes to insert unescaped markup, e.g. ${!foo}
				return key.charAt(0) == "!" ? value :
					// Safer substitution, see heading "Attribute values" in
					// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
					value.toString().replace(/"/g,"&quot;"); //TODO: add &amp? use encodeXML method?
			}, this);
		},

		buildRendering: function(){
			// summary:
			//		Construct the UI for this widget from a template, setting this.domNode.
			// tags:
			//		protected

			if(!this.templateString){
				this.templateString = cache(this.templatePath, {sanitize: true});
			}

			// Lookup cached version of template, and download to cache if it
			// isn't there already.  Returns either a DomNode or a string, depending on
			// whether or not the template contains ${foo} replacement parameters.
			var cached = _TemplatedMixin.getCachedTemplate(this.templateString, this._skipNodeCache);

			var node;
			if(lang.isString(cached)){
				node = domConstruct.toDom(this._stringRepl(cached));
				if(node.nodeType != 1){
					// Flag common problems such as templates with multiple top level nodes (nodeType == 11)
					throw new Error("Invalid template: " + cached);
				}
			}else{
				// if it's a node, all we have to do is clone it
				node = cached.cloneNode(true);
			}

			this.domNode = node;

			// Call down to _Widget.buildRendering() to get base classes assigned
			// TODO: change the baseClass assignment to _setBaseClassAttr
			this.inherited(arguments);

			// recurse through the node, looking for, and attaching to, our
			// attachment points and events, which should be defined on the template node.
			this._attachTemplateNodes(node, function(n,p){ return n.getAttribute(p); });

			this._beforeFillContent();		// hook for _WidgetsInTemplateMixin

			this._fillContent(this.srcNodeRef);
		},

		_beforeFillContent: function(){
		},

		_fillContent: function(/*DomNode*/ source){
			// summary:
			//		Relocate source contents to templated container node.
			//		this.containerNode must be able to receive children, or exceptions will be thrown.
			// tags:
			//		protected
			var dest = this.containerNode;
			if(source && dest){
				while(source.hasChildNodes()){
					dest.appendChild(source.firstChild);
				}
			}
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){
			// summary:
			//		Iterate through the template and attach functions and nodes accordingly.
			//		Alternately, if rootNode is an array of widgets, then will process data-dojo-attach-point
			//		etc. for those widgets.
			// description:
			//		Map widget properties and functions to the handlers specified in
			//		the dom node and it's descendants. This function iterates over all
			//		nodes and looks for these properties:
			//			* dojoAttachPoint/data-dojo-attach-point
			//			* dojoAttachEvent/data-dojo-attach-event
			// rootNode: DomNode|Widget[]
			//		the node to search for properties. All children will be searched.
			// getAttrFunc: Function
			//		a function which will be used to obtain property for a given
			//		DomNode/Widget
			// tags:
			//		private

			var nodes = lang.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x = lang.isArray(rootNode) ? 0 : -1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];
				if(this.widgetsInTemplate && (getAttrFunc(baseNode, "dojoType") || getAttrFunc(baseNode, "data-dojo-type"))){
					continue;
				}
				// Process data-dojo-attach-point
				var attachPoint = getAttrFunc(baseNode, "dojoAttachPoint") || getAttrFunc(baseNode, "data-dojo-attach-point");
				if(attachPoint){
					var point, points = attachPoint.split(/\s*,\s*/);
					while((point = points.shift())){
						if(lang.isArray(this[point])){
							this[point].push(baseNode);
						}else{
							this[point]=baseNode;
						}
						this._attachPoints.push(point);
					}
				}

				// Process data-dojo-attach-event
				var attachEvent = getAttrFunc(baseNode, "dojoAttachEvent") || getAttrFunc(baseNode, "data-dojo-attach-event");
				if(attachEvent){
					// NOTE: we want to support attributes that have the form
					// "domEvent: nativeEvent; ..."
					var event, events = attachEvent.split(/\s*,\s*/);
					var trim = lang.trim;
					while((event = events.shift())){
						if(event){
							var thisFunc = null;
							if(event.indexOf(":") != -1){
								// oh, if only JS had tuple assignment
								var funcNameArr = event.split(":");
								event = trim(funcNameArr[0]);
								thisFunc = trim(funcNameArr[1]);
							}else{
								event = trim(event);
							}
							if(!thisFunc){
								thisFunc = event;
							}
							// Map "press", "move" and "release" to keys.touch, keys.move, keys.release
							this._attachEvents.push(this.connect(baseNode, touch[event] || event, thisFunc));
						}
					}
				}
			}
		},

		destroyRendering: function(){
			// Delete all attach points to prevent IE6 memory leaks.
			array.forEach(this._attachPoints, function(point){
				delete this[point];
			}, this);
			this._attachPoints = [];

			// And same for event handlers
			array.forEach(this._attachEvents, this.disconnect, this);
			this._attachEvents = [];

			this.inherited(arguments);
		}
	});

	// key is templateString; object is either string or DOM tree
	_TemplatedMixin._templateCache = {};

	_TemplatedMixin.getCachedTemplate = function(templateString, alwaysUseString){
		// summary:
		//		Static method to get a template based on the templatePath or
		//		templateString key
		// templateString: String
		//		The template
		// alwaysUseString: Boolean
		//		Don't cache the DOM tree for this template, even if it doesn't have any variables
		// returns: Mixed
		//		Either string (if there are ${} variables that need to be replaced) or just
		//		a DOM tree (if the node can be cloned directly)

		// is it already cached?
		var tmplts = _TemplatedMixin._templateCache;
		var key = templateString;
		var cached = tmplts[key];
		if(cached){
			try{
				// if the cached value is an innerHTML string (no ownerDocument) or a DOM tree created within the current document, then use the current cached value
				if(!cached.ownerDocument || cached.ownerDocument == win.doc){
					// string or node of the same document
					return cached;
				}
			}catch(e){ /* squelch */ } // IE can throw an exception if cached.ownerDocument was reloaded
			domConstruct.destroy(cached);
		}

		templateString = string.trim(templateString);

		if(alwaysUseString || templateString.match(/\$\{([^\}]+)\}/g)){
			// there are variables in the template so all we can do is cache the string
			return (tmplts[key] = templateString); //String
		}else{
			// there are no variables in the template so we can cache the DOM tree
			var node = domConstruct.toDom(templateString);
			if(node.nodeType != 1){
				throw new Error("Invalid template: " + templateString);
			}
			return (tmplts[key] = node); //Node
		}
	};

	if(has("ie")){
		unload.addOnWindowUnload(function(){
			var cache = _TemplatedMixin._templateCache;
			for(var key in cache){
				var value = cache[key];
				if(typeof value == "object"){ // value is either a string or a DOM node template
					domConstruct.destroy(value);
				}
				delete cache[key];
			}
		});
	}

	// These arguments can be specified for widgets which are used in templates.
	// Since any widget can be specified as sub widgets in template, mix it
	// into the base widget class.  (This is a hack, but it's effective.)
	lang.extend(_WidgetBase,{
		dojoAttachEvent: "",
		dojoAttachPoint: ""
	});

	return _TemplatedMixin;
});

},
'dijit/_Templated':function(){
define("dijit/_Templated", [
	"./_WidgetBase",
	"./_TemplatedMixin",
	"./_WidgetsInTemplateMixin",
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.extend lang.isArray
	"dojo/_base/kernel" // kernel.deprecated
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, array, declare, lang, kernel){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _WidgetsInTemplateMixin = dijit._WidgetsInTemplateMixin;
=====*/

	// module:
	//		dijit/_Templated
	// summary:
	//		Deprecated mixin for widgets that are instantiated from a template.

	// These arguments can be specified for widgets which are used in templates.
	// Since any widget can be specified as sub widgets in template, mix it
	// into the base widget class.  (This is a hack, but it's effective.)
	lang.extend(_WidgetBase, {
		waiRole: "",
		waiState:""
	});

	return declare("dijit._Templated", [_TemplatedMixin, _WidgetsInTemplateMixin], {
		// summary:
		//		Deprecated mixin for widgets that are instantiated from a template.
		//		Widgets should use _TemplatedMixin plus if necessary _WidgetsInTemplateMixin instead.

		// widgetsInTemplate: [protected] Boolean
		//		Should we parse the template to find widgets that might be
		//		declared in markup inside it?  False by default.
		widgetsInTemplate: false,

		constructor: function(){
			kernel.deprecated(this.declaredClass + ": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin", "", "2.0");
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){

			this.inherited(arguments);

			// Do deprecated waiRole and waiState
			var nodes = lang.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x = lang.isArray(rootNode) ? 0 : -1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];

				// waiRole, waiState
				var role = getAttrFunc(baseNode, "waiRole");
				if(role){
					baseNode.setAttribute("role", role);
				}
				var values = getAttrFunc(baseNode, "waiState");
				if(values){
					array.forEach(values.split(/\s*,\s*/), function(stateValue){
						if(stateValue.indexOf('-') != -1){
							var pair = stateValue.split('-');
							baseNode.setAttribute("aria-"+pair[0], pair[1]);
						}
					});
				}
			}
		}
	});
});

},
'dijit/_CssStateMixin':function(){
define("dijit/_CssStateMixin", [
	"dojo/touch",
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/declare",	// declare
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/window" // win.body
], function(touch, array, declare, domClass, lang, win){

// module:
//		dijit/_CssStateMixin
// summary:
//		Mixin for widgets to set CSS classes on the widget DOM nodes depending on hover/mouse press/focus
//		state changes, and also higher-level state changes such becoming disabled or selected.

return declare("dijit._CssStateMixin", [], {
	// summary:
	//		Mixin for widgets to set CSS classes on the widget DOM nodes depending on hover/mouse press/focus
	//		state changes, and also higher-level state changes such becoming disabled or selected.
	//
	// description:
	//		By mixing this class into your widget, and setting the this.baseClass attribute, it will automatically
	//		maintain CSS classes on the widget root node (this.domNode) depending on hover,
	//		active, focus, etc. state.   Ex: with a baseClass of dijitButton, it will apply the classes
	//		dijitButtonHovered and dijitButtonActive, as the user moves the mouse over the widget and clicks it.
	//
	//		It also sets CSS like dijitButtonDisabled based on widget semantic state.
	//
	//		By setting the cssStateNodes attribute, a widget can also track events on subnodes (like buttons
	//		within the widget).

	// cssStateNodes: [protected] Object
	//		List of sub-nodes within the widget that need CSS classes applied on mouse hover/press and focus
	//.
	//		Each entry in the hash is a an attachpoint names (like "upArrowButton") mapped to a CSS class names
	//		(like "dijitUpArrowButton"). Example:
	//	|		{
	//	|			"upArrowButton": "dijitUpArrowButton",
	//	|			"downArrowButton": "dijitDownArrowButton"
	//	|		}
	//		The above will set the CSS class dijitUpArrowButton to the this.upArrowButton DOMNode when it
	//		is hovered, etc.
	cssStateNodes: {},

	// hovering: [readonly] Boolean
	//		True if cursor is over this widget
	hovering: false,

	// active: [readonly] Boolean
	//		True if mouse was pressed while over this widget, and hasn't been released yet
	active: false,

	_applyAttributes: function(){
		// This code would typically be in postCreate(), but putting in _applyAttributes() for
		// performance: so the class changes happen before DOM is inserted into the document.
		// Change back to postCreate() in 2.0.  See #11635.

		this.inherited(arguments);

		// Automatically monitor mouse events (essentially :hover and :active) on this.domNode
		array.forEach(["onmouseenter", "onmouseleave", touch.press], function(e){
			this.connect(this.domNode, e, "_cssMouseEvent");
		}, this);

		// Monitoring changes to disabled, readonly, etc. state, and update CSS class of root node
		array.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active"], function(attr){
			this.watch(attr, lang.hitch(this, "_setStateClass"));
		}, this);

		// Events on sub nodes within the widget
		for(var ap in this.cssStateNodes){
			this._trackMouseState(this[ap], this.cssStateNodes[ap]);
		}
		// Set state initially; there's probably no hover/active/focus state but widget might be
		// disabled/readonly/checked/selected so we want to set CSS classes for those conditions.
		this._setStateClass();
	},

	_cssMouseEvent: function(/*Event*/ event){
		// summary:
		//	Sets hovering and active properties depending on mouse state,
		//	which triggers _setStateClass() to set appropriate CSS classes for this.domNode.

		if(!this.disabled){
			switch(event.type){
				case "mouseenter":
				case "mouseover":	// generated on non-IE browsers even though we connected to mouseenter
					this._set("hovering", true);
					this._set("active", this._mouseDown);
					break;

				case "mouseleave":
				case "mouseout":	// generated on non-IE browsers even though we connected to mouseleave
					this._set("hovering", false);
					this._set("active", false);
					break;

				case "mousedown":
				case "touchpress":
					this._set("active", true);
					this._mouseDown = true;
					// Set a global event to handle mouseup, so it fires properly
					// even if the cursor leaves this.domNode before the mouse up event.
					// Alternately could set active=false on mouseout.
					var mouseUpConnector = this.connect(win.body(), touch.release, function(){
						this._mouseDown = false;
						this._set("active", false);
						this.disconnect(mouseUpConnector);
					});
					break;
			}
		}
	},

	_setStateClass: function(){
		// summary:
		//		Update the visual state of the widget by setting the css classes on this.domNode
		//		(or this.stateNode if defined) by combining this.baseClass with
		//		various suffixes that represent the current widget state(s).
		//
		// description:
		//		In the case where a widget has multiple
		//		states, it sets the class based on all possible
		//	 	combinations.  For example, an invalid form widget that is being hovered
		//		will be "dijitInput dijitInputInvalid dijitInputHover dijitInputInvalidHover".
		//
		//		The widget may have one or more of the following states, determined
		//		by this.state, this.checked, this.valid, and this.selected:
		//			- Error - ValidationTextBox sets this.state to "Error" if the current input value is invalid
		//			- Incomplete - ValidationTextBox sets this.state to "Incomplete" if the current input value is not finished yet
		//			- Checked - ex: a checkmark or a ToggleButton in a checked state, will have this.checked==true
		//			- Selected - ex: currently selected tab will have this.selected==true
		//
		//		In addition, it may have one or more of the following states,
		//		based on this.disabled and flags set in _onMouse (this.active, this.hovering) and from focus manager (this.focused):
		//			- Disabled	- if the widget is disabled
		//			- Active		- if the mouse (or space/enter key?) is being pressed down
		//			- Focused		- if the widget has focus
		//			- Hover		- if the mouse is over the widget

		// Compute new set of classes
		var newStateClasses = this.baseClass.split(" ");

		function multiply(modifier){
			newStateClasses = newStateClasses.concat(array.map(newStateClasses, function(c){ return c+modifier; }), "dijit"+modifier);
		}

		if(!this.isLeftToRight()){
			// For RTL mode we need to set an addition class like dijitTextBoxRtl.
			multiply("Rtl");
		}

		var checkedState = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
		if(this.checked){
			multiply(checkedState);
		}
		if(this.state){
			multiply(this.state);
		}
		if(this.selected){
			multiply("Selected");
		}

		if(this.disabled){
			multiply("Disabled");
		}else if(this.readOnly){
			multiply("ReadOnly");
		}else{
			if(this.active){
				multiply("Active");
			}else if(this.hovering){
				multiply("Hover");
			}
		}

		if(this.focused){
			multiply("Focused");
		}

		// Remove old state classes and add new ones.
		// For performance concerns we only write into domNode.className once.
		var tn = this.stateNode || this.domNode,
			classHash = {};	// set of all classes (state and otherwise) for node

		array.forEach(tn.className.split(" "), function(c){ classHash[c] = true; });

		if("_stateClasses" in this){
			array.forEach(this._stateClasses, function(c){ delete classHash[c]; });
		}

		array.forEach(newStateClasses, function(c){ classHash[c] = true; });

		var newClasses = [];
		for(var c in classHash){
			newClasses.push(c);
		}
		tn.className = newClasses.join(" ");

		this._stateClasses = newStateClasses;
	},

	_trackMouseState: function(/*DomNode*/ node, /*String*/ clazz){
		// summary:
		//		Track mouse/focus events on specified node and set CSS class on that node to indicate
		//		current state.   Usually not called directly, but via cssStateNodes attribute.
		// description:
		//		Given class=foo, will set the following CSS class on the node
		//			- fooActive: if the user is currently pressing down the mouse button while over the node
		//			- fooHover: if the user is hovering the mouse over the node, but not pressing down a button
		//			- fooFocus: if the node is focused
		//
		//		Note that it won't set any classes if the widget is disabled.
		// node: DomNode
		//		Should be a sub-node of the widget, not the top node (this.domNode), since the top node
		//		is handled specially and automatically just by mixing in this class.
		// clazz: String
		//		CSS class name (ex: dijitSliderUpArrow).

		// Current state of node (initially false)
		// NB: setting specifically to false because domClass.toggle() needs true boolean as third arg
		var hovering=false, active=false, focused=false;

		var self = this,
			cn = lang.hitch(this, "connect", node);

		function setClass(){
			var disabled = ("disabled" in self && self.disabled) || ("readonly" in self && self.readonly);
			domClass.toggle(node, clazz+"Hover", hovering && !active && !disabled);
			domClass.toggle(node, clazz+"Active", active && !disabled);
			domClass.toggle(node, clazz+"Focused", focused && !disabled);
		}

		// Mouse
		cn("onmouseenter", function(){
			hovering = true;
			setClass();
		});
		cn("onmouseleave", function(){
			hovering = false;
			active = false;
			setClass();
		});
		cn(touch.press, function(){
			active = true;
			setClass();
		});
		cn(touch.release, function(){
			active = false;
			setClass();
		});

		// Focus
		cn("onfocus", function(){
			focused = true;
			setClass();
		});
		cn("onblur", function(){
			focused = false;
			setClass();
		});

		// Just in case widget is enabled/disabled while it has focus/hover/active state.
		// Maybe this is overkill.
		this.watch("disabled", setClass);
		this.watch("readOnly", setClass);
	}
});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/FullScreen':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button,ibm/tivoli/fwm/i18n"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.FullScreen");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.i18n");

/**
 * Full Screen tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.FullScreen", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	_labelOn: "Set Full Screen On",
	_labelOff: "Set Full Screen Off",
	iconClass: "basicMapToolbarBtn fullScreenMapToolbarBtn",
	map: null,
	_isFullScreen: false,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._isFullScreen = false;
		this._handlers=[];
		var labelOn = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenon");
		var labelOff = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenoff");
		this._labelOn = labelOn || this._labelOn; 
		this._labelOff = labelOff || this._labelOff;
		
		// listen to these events to update the button label/image by external
		// full screen changes
		this.addSubscription(dojo.subscribe("mapFullScreenModeChanged_"+this.map.getId(), dojo.hitch(this, this._updateFullScreenState)));
		

		
	},
	createToolbarButton: function()
	{
		this._button = new dijit.form.Button({
			label: this._labelOn,
			showLabel: false,
			iconClass: this.iconClass,
			onClick: dojo.hitch(this, function()
			{
				this.execute();
			})

		});
		return this._button;

	},
	executeOn: function()
	{
		this._doFullScreen();
	},
	executeOff:function(){
		this._restoreOriginalSize();
	},

	disable: function()
	{
		// does nothing
	},

	_doFullScreen: function()
	{
		this._changeButtonState(true, this._labelOff);
		this.map.fullScreenOn();
	},
	_restoreOriginalSize: function(event)
	{
		this._changeButtonState(false, this._labelOn);
		this.map.fullScreenOff();
	},
	_updateFullScreenState: function(event)
	{
		if (event.modeOn == true)
		{
			this.setActive(true);
			this._changeButtonState(true, this._labelOff);			
		}
		else
		{
			this.setActive(false);
			this._changeButtonState(false, this._labelOn);
		}
	},
	_changeButtonState: function(fullScreenMode, newLabel)
	{
		this._button.set({
			label: newLabel
		});
		this._isFullScreen = fullScreenMode;
	}	
});
});

},
'url:dijit/form/templates/ComboButton.html':"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n",
'dijit/DialogUnderlay':function(){
define("dijit/DialogUnderlay", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.getBox
	"./_Widget",
	"./_TemplatedMixin",
	"./BackgroundIframe"
], function(declare, domAttr, win, winUtils, _Widget, _TemplatedMixin, BackgroundIframe){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/DialogUnderlay
	// summary:
	//		The component that blocks the screen behind a `dijit.Dialog`

	return declare("dijit.DialogUnderlay", [_Widget, _TemplatedMixin], {
		// summary:
		//		The component that blocks the screen behind a `dijit.Dialog`
		//
		// description:
		// 		A component used to block input behind a `dijit.Dialog`. Only a single
		//		instance of this widget is created by `dijit.Dialog`, and saved as
		//		a reference to be shared between all Dialogs as `dijit._underlay`
		//
		//		The underlay itself can be styled based on and id:
		//	|	#myDialog_underlay { background-color:red; }
		//
		//		In the case of `dijit.Dialog`, this id is based on the id of the Dialog,
		//		suffixed with _underlay.

		// Template has two divs; outer div is used for fade-in/fade-out, and also to hold background iframe.
		// Inner div has opacity specified in CSS file.
		templateString: "<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",

		// Parameters on creation or updatable later

		// dialogId: String
		//		Id of the dialog.... DialogUnderlay's id is based on this id
		dialogId: "",

		// class: String
		//		This class name is used on the DialogUnderlay node, in addition to dijitDialogUnderlay
		"class": "",

		_setDialogIdAttr: function(id){
			domAttr.set(this.node, "id", id + "_underlay");
			this._set("dialogId", id);
		},

		_setClassAttr: function(clazz){
			this.node.className = "dijitDialogUnderlay " + clazz;
			this._set("class", clazz);
		},

		postCreate: function(){
			// summary:
			//		Append the underlay to the body
			win.body().appendChild(this.domNode);
		},

		layout: function(){
			// summary:
			//		Sets the background to the size of the viewport
			//
			// description:
			//		Sets the background to the size of the viewport (rather than the size
			//		of the document) since we need to cover the whole browser window, even
			//		if the document is only a few lines long.
			// tags:
			//		private

			var is = this.node.style,
				os = this.domNode.style;

			// hide the background temporarily, so that the background itself isn't
			// causing scrollbars to appear (might happen when user shrinks browser
			// window and then we are called to resize)
			os.display = "none";

			// then resize and show
			var viewport = winUtils.getBox();
			os.top = viewport.t + "px";
			os.left = viewport.l + "px";
			is.width = viewport.w + "px";
			is.height = viewport.h + "px";
			os.display = "block";
		},

		show: function(){
			// summary:
			//		Show the dialog underlay
			this.domNode.style.display = "block";
			this.layout();
			this.bgIframe = new BackgroundIframe(this.domNode);
		},

		hide: function(){
			// summary:
			//		Hides the dialog underlay
			this.bgIframe.destroy();
			delete this.bgIframe;
			this.domNode.style.display = "none";
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/ItineraryTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate,dijit/form/Button,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog,ibm/tivoli/fwm/mxmap/routing/itinerary/ItineraryManager"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.ItineraryTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager");

/**
 * Mobile Info Panel tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.ItineraryTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
	label: "Show Itinerary",
	iconClass: "basicMapToolbarBtn itineraryMapToolbarBtn",
	map: null,
	_itineraryManager: null,
	_dialog:null,
	constructor: function(params)
	{
		
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarytool");
		this.label = _label || this.label;
		
		this._dialog = null;
		this._itineraryManager = new ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager({
			map: this.map
		});
		this.addSubscription(dojo.subscribe("showItinerary_"+this.map.getId(), dojo.hitch(this, this.triggerShowItinerary)));
	},
	triggerShowItinerary:function(){
		this.execute();
	},
	execute: function()
	{
		if (this._dialog)
		{
			this._dialog.close();
			this._dialog = null;
		}
		var routeManager = this.map.getMultipleRoutesManager();
		if (routeManager && routeManager.routes && routeManager.routes[0])
		{
			var currentItinerary = routeManager.routes[0].itinerary;
			if (currentItinerary)
			{
				this._itineraryManager.updateRouteItinerary(currentItinerary, routeManager, routeManager.routes[0]);
			}
		}
		this._itineraryManager.showPanel();
	},
	disable: function()
	{
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
});

},
'ibm/tivoli/fwm/mxmap/routing/MultipleRoutesManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/routing/RouterFactory,ibm/tivoli/fwm/mxmap/routing/itinerary/Itinerary"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.RouterFactory");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
/**
 * Manage multiple routes.<br>
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager", ibm.tivoli.fwm.mxmap._Base, {
	routeConf: null,
	provider: null,
	map: null,
	routeUrl: null,
	routingData: null,
	routes: null,
	visible: true,

	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.factory = new ibm.tivoli.fwm.mxmap.routing.RouterFactory({
			map: this.map,
			provider: this.provider
		});
		this.routeConf.routeUrl = this.routeUrl;
		this.routes = [];
	},
	createRoute: function(stops, config, callback, errcallback, noZoom)
	{
		var routeConf = {
			routecolor: config.routecolor,
			routeOpacity: 0.5,
			routeLineWidth: 5,
			endLocation: config.end,
			startLocation: config.start,
			optimizeroute: config.optimizeroute,
			startwithcurrentlocation: config.startwithcurrentlocation,
			routeUrl: config.routeUrl,
			map: this.map
		};

		var router = this.factory.createRouter(routeConf);
		router.customConf = this.customConf;

		var fct = function(route)
		{
			route.id = this.routes.length;
			this.routes.push(route);
			route.setLineVisible(this.visible);
			route.show();
			if (noZoom != true)
			{
				route.zoomToRoute();
				console.log("zooming to single route!");
			}
			if (callback)
			{
				callback(route);
			}
		};

		if (!errcallback)
		{
			errcallback = dojo.hitch(this, this.routingError);
		}

		router.drawRoute(stops, dojo.hitch(this, fct), errcallback, routeConf);
	},
	customConf: null,
	reGenerate: function(route, customConf, callback, errorCallback)
	{
		this.customConf = customConf;
		if (dojo.config.fwm.debug == true)
		{
			console.log("route id " + route.id);
		}
		route.originalRouter.customConf = customConf;

		route.originalRouter.drawRoute(route.inputInfo.stops, callback, errorCallback);
		// this.createRoute(conf.stops,conf.successCb,conf.errorCb);
	},
	replaceRoute: function(route, id)
	{
		this.removeRoute(this.routes[id]);
		this.routes[id] = route;
		route.id = id;
	},
	removeRoute: function(route)
	{
		route.clear();
	},
	clearAll: function()
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Clearing all route information");
		}
		while (this.routes.length > 0)
		{
			this.routes.pop().clear();
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Done");
		}
	},
	redrawAll: function()
	{
		dojo.forEach(this.routes, function(route)
		{
			route.redraw();
		});
	},
	setLineVisible: function(visible)
	{
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(visible);
		});
	},
	hideRoutesAndCalculatedMarkers: function()
	{
		this.visible = false;
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(false);
			route.hideCalculatedMarkers();
		});
	},
	showRoutesAndCalculatedMarkers: function()
	{
		this.visible = true;
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(true);
			route.showCalculatedMarkers();
		});
	},
	// _addItinerary: function(route)
	// {},
	centerAndZoom: function()
	{
		this.zoomAndCenterOverAll();
	},
	zoomAndCenterOverAll: function()
	{
		if (this.routes.length > 0)
		{

			var bounds = this.routes[0].getBounds();
			for ( var i = 1; i < this.routes.length; i++)
			{
				var r = this.routes[i];

				bounds.merge(r.getBounds());
			}

			this.map.getMapstraction().setBounds(bounds);
		}
		else
		{
			console.warn("[MultipleRoutesManager] No routes to center on");
		}
	},
	routingError: function(statusCode, error)
	{

		var maximo = this.map.getMaximo();
		switch (statusCode)
		{

			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ:
				maximo.showMessage("mapserver", "route_min_stops_failure");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS:
				maximo.showMessage("mapserver", "route_zero_results");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.INVALID_REQUEST:
				maximo.showMessage("mapserver", "route_invalid_request");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED:
				maximo.showMessage("mapserver", "route_request_denied");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.OVER_LIMIT:
				maximo.showMessage("mapserver", "route_over_limit");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.TIMEOUT:
				maximo.showMessage("mapserver", "route_timeout");
				break;

			default:
				var msg = error;
				if (error && error.message)
				{
					msg = error.message;
				}
				maximo.showMessage("mapserver", "route_unknown_failure", [ msg ]);
				break;
		}

	},
	destroyRecursive: function()
	{
		if (this.router)
		{
			this.router.destroyRecursive();
		}
		this.inherited(arguments);
	},
	getItinerary: function()
	{
		return this.routes[0].itinerary;
	}

});
});

},
'dijit/place':function(){
define("dijit/place", [
	"dojo/_base/array", // array.forEach array.map array.some
	"dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.getBox
	"."	// dijit (defining dijit.place to match API doc)
], function(array, domGeometry, domStyle, kernel, win, winUtils, dijit){

	// module:
	//		dijit/place
	// summary:
	//		Code to place a popup relative to another node


	function _place(/*DomNode*/ node, choices, layoutNode, aroundNodeCoords){
		// summary:
		//		Given a list of spots to put node, put it at the first spot where it fits,
		//		of if it doesn't fit anywhere then the place with the least overflow
		// choices: Array
		//		Array of elements like: {corner: 'TL', pos: {x: 10, y: 20} }
		//		Above example says to put the top-left corner of the node at (10,20)
		// layoutNode: Function(node, aroundNodeCorner, nodeCorner, size)
		//		for things like tooltip, they are displayed differently (and have different dimensions)
		//		based on their orientation relative to the parent.	 This adjusts the popup based on orientation.
		//		It also passes in the available size for the popup, which is useful for tooltips to
		//		tell them that their width is limited to a certain amount.	 layoutNode() may return a value expressing
		//		how much the popup had to be modified to fit into the available space.	 This is used to determine
		//		what the best placement is.
		// aroundNodeCoords: Object
		//		Size of aroundNode, ex: {w: 200, h: 50}

		// get {x: 10, y: 10, w: 100, h:100} type obj representing position of
		// viewport over document
		var view = winUtils.getBox();

		// This won't work if the node is inside a <div style="position: relative">,
		// so reattach it to win.doc.body.	 (Otherwise, the positioning will be wrong
		// and also it might get cutoff)
		if(!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body"){
			win.body().appendChild(node);
		}

		var best = null;
		array.some(choices, function(choice){
			var corner = choice.corner;
			var pos = choice.pos;
			var overflow = 0;

			// calculate amount of space available given specified position of node
			var spaceAvailable = {
				w: {
					'L': view.l + view.w - pos.x,
					'R': pos.x - view.l,
					'M': view.w
				   }[corner.charAt(1)],
				h: {
					'T': view.t + view.h - pos.y,
					'B': pos.y - view.t,
					'M': view.h
				   }[corner.charAt(0)]
			};

			// configure node to be displayed in given position relative to button
			// (need to do this in order to get an accurate size for the node, because
			// a tooltip's size changes based on position, due to triangle)
			if(layoutNode){
				var res = layoutNode(node, choice.aroundCorner, corner, spaceAvailable, aroundNodeCoords);
				overflow = typeof res == "undefined" ? 0 : res;
			}

			// get node's size
			var style = node.style;
			var oldDisplay = style.display;
			var oldVis = style.visibility;
			if(style.display == "none"){
				style.visibility = "hidden";
				style.display = "";
			}
			var mb = domGeometry. getMarginBox(node);
			style.display = oldDisplay;
			style.visibility = oldVis;

			// coordinates and size of node with specified corner placed at pos,
			// and clipped by viewport
			var
				startXpos = {
					'L': pos.x,
					'R': pos.x - mb.w,
					'M': Math.max(view.l, Math.min(view.l + view.w, pos.x + (mb.w >> 1)) - mb.w) // M orientation is more flexible
				}[corner.charAt(1)],
				startYpos = {
					'T': pos.y,
					'B': pos.y - mb.h,
					'M': Math.max(view.t, Math.min(view.t + view.h, pos.y + (mb.h >> 1)) - mb.h)
				}[corner.charAt(0)],
				startX = Math.max(view.l, startXpos),
				startY = Math.max(view.t, startYpos),
				endX = Math.min(view.l + view.w, startXpos + mb.w),
				endY = Math.min(view.t + view.h, startYpos + mb.h),
				width = endX - startX,
				height = endY - startY;

			overflow += (mb.w - width) + (mb.h - height);

			if(best == null || overflow < best.overflow){
				best = {
					corner: corner,
					aroundCorner: choice.aroundCorner,
					x: startX,
					y: startY,
					w: width,
					h: height,
					overflow: overflow,
					spaceAvailable: spaceAvailable
				};
			}

			return !overflow;
		});

		// In case the best position is not the last one we checked, need to call
		// layoutNode() again.
		if(best.overflow && layoutNode){
			layoutNode(node, best.aroundCorner, best.corner, best.spaceAvailable, aroundNodeCoords);
		}

		// And then position the node.  Do this last, after the layoutNode() above
		// has sized the node, due to browser quirks when the viewport is scrolled
		// (specifically that a Tooltip will shrink to fit as though the window was
		// scrolled to the left).
		//
		// In RTL mode, set style.right rather than style.left so in the common case,
		// window resizes move the popup along with the aroundNode.
		var l = domGeometry.isBodyLtr(),
			s = node.style;
		s.top = best.y + "px";
		s[l ? "left" : "right"] = (l ? best.x : view.w - best.x - best.w) + "px";
		s[l ? "right" : "left"] = "auto";	// needed for FF or else tooltip goes to far left

		return best;
	}

	/*=====
	dijit.place.__Position = function(){
		// x: Integer
		//		horizontal coordinate in pixels, relative to document body
		// y: Integer
		//		vertical coordinate in pixels, relative to document body

		this.x = x;
		this.y = y;
	};
	=====*/

	/*=====
	dijit.place.__Rectangle = function(){
		// x: Integer
		//		horizontal offset in pixels, relative to document body
		// y: Integer
		//		vertical offset in pixels, relative to document body
		// w: Integer
		//		width in pixels.   Can also be specified as "width" for backwards-compatibility.
		// h: Integer
		//		height in pixels.   Can also be specified as "height" from backwards-compatibility.

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};
	=====*/

	return (dijit.place = {
		// summary:
		//		Code to place a DOMNode relative to another DOMNode.
		//		Load using require(["dijit/place"], function(place){ ... }).

		at: function(node, pos, corners, padding){
			// summary:
			//		Positions one of the node's corners at specified position
			//		such that node is fully visible in viewport.
			// description:
			//		NOTE: node is assumed to be absolutely or relatively positioned.
			// node: DOMNode
			//		The node to position
			// pos: dijit.place.__Position
			//		Object like {x: 10, y: 20}
			// corners: String[]
			//		Array of Strings representing order to try corners in, like ["TR", "BL"].
			//		Possible values are:
			//			* "BL" - bottom left
			//			* "BR" - bottom right
			//			* "TL" - top left
			//			* "TR" - top right
			// padding: dijit.place.__Position?
			//		optional param to set padding, to put some buffer around the element you want to position.
			// example:
			//		Try to place node's top right corner at (10,20).
			//		If that makes node go (partially) off screen, then try placing
			//		bottom left corner at (10,20).
			//	|	place(node, {x: 10, y: 20}, ["TR", "BL"])
			var choices = array.map(corners, function(corner){
				var c = { corner: corner, pos: {x:pos.x,y:pos.y} };
				if(padding){
					c.pos.x += corner.charAt(1) == 'L' ? padding.x : -padding.x;
					c.pos.y += corner.charAt(0) == 'T' ? padding.y : -padding.y;
				}
				return c;
			});

			return _place(node, choices);
		},

		around: function(
			/*DomNode*/		node,
			/*DomNode || dijit.place.__Rectangle*/ anchor,
			/*String[]*/	positions,
			/*Boolean*/		leftToRight,
			/*Function?*/	layoutNode){

			// summary:
			//		Position node adjacent or kitty-corner to anchor
			//		such that it's fully visible in viewport.
			//
			// description:
			//		Place node such that corner of node touches a corner of
			//		aroundNode, and that node is fully visible.
			//
			// anchor:
			//		Either a DOMNode or a __Rectangle (object with x, y, width, height).
			//
			// positions:
			//		Ordered list of positions to try matching up.
			//			* before: places drop down to the left of the anchor node/widget, or to the right in
			//				the case of RTL scripts like Hebrew and Arabic
			//			* after: places drop down to the right of the anchor node/widget, or to the left in
			//				the case of RTL scripts like Hebrew and Arabic
			//			* above: drop down goes above anchor node
			//			* above-alt: same as above except right sides aligned instead of left
			//			* below: drop down goes below anchor node
			//			* below-alt: same as below except right sides aligned instead of left
			//
			// layoutNode: Function(node, aroundNodeCorner, nodeCorner)
			//		For things like tooltip, they are displayed differently (and have different dimensions)
			//		based on their orientation relative to the parent.	 This adjusts the popup based on orientation.
			//
			// leftToRight:
			//		True if widget is LTR, false if widget is RTL.   Affects the behavior of "above" and "below"
			//		positions slightly.
			//
			// example:
			//	|	placeAroundNode(node, aroundNode, {'BL':'TL', 'TR':'BR'});
			//		This will try to position node such that node's top-left corner is at the same position
			//		as the bottom left corner of the aroundNode (ie, put node below
			//		aroundNode, with left edges aligned).	If that fails it will try to put
			// 		the bottom-right corner of node where the top right corner of aroundNode is
			//		(ie, put node above aroundNode, with right edges aligned)
			//

			// if around is a DOMNode (or DOMNode id), convert to coordinates
			var aroundNodePos = (typeof anchor == "string" || "offsetWidth" in anchor)
				? domGeometry.position(anchor, true)
				: anchor;

			// Adjust anchor positioning for the case that a parent node has overflw hidden, therefore cuasing the anchor not to be completely visible
			if(anchor.parentNode){
				var parent = anchor.parentNode;
				while(parent && parent.nodeType == 1 && parent.nodeName != "BODY"){  //ignoring the body will help performance
					var parentPos = domGeometry.position(parent, true);
					var parentStyleOverflow = domStyle.getComputedStyle(parent).overflow;
					if(parentStyleOverflow == "hidden" || parentStyleOverflow == "auto" || parentStyleOverflow == "scroll"){
						var bottomYCoord = Math.min(aroundNodePos.y + aroundNodePos.h, parentPos.y + parentPos.h);
						var rightXCoord = Math.min(aroundNodePos.x + aroundNodePos.w, parentPos.x + parentPos.w);
						aroundNodePos.x = Math.max(aroundNodePos.x, parentPos.x);
						aroundNodePos.y = Math.max(aroundNodePos.y, parentPos.y);
						aroundNodePos.h = bottomYCoord - aroundNodePos.y;
						aroundNodePos.w = rightXCoord - aroundNodePos.x;
					}	
					parent = parent.parentNode;
				}
			}			

			var x = aroundNodePos.x,
				y = aroundNodePos.y,
				width = "w" in aroundNodePos ? aroundNodePos.w : (aroundNodePos.w = aroundNodePos.width),
				height = "h" in aroundNodePos ? aroundNodePos.h : (kernel.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+aroundNodePos.height+", width:"+width+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+aroundNodePos.height+", w:"+width+" }", "", "2.0"), aroundNodePos.h = aroundNodePos.height);

			// Convert positions arguments into choices argument for _place()
			var choices = [];
			function push(aroundCorner, corner){
				choices.push({
					aroundCorner: aroundCorner,
					corner: corner,
					pos: {
						x: {
							'L': x,
							'R': x + width,
							'M': x + (width >> 1)
						   }[aroundCorner.charAt(1)],
						y: {
							'T': y,
							'B': y + height,
							'M': y + (height >> 1)
						   }[aroundCorner.charAt(0)]
					}
				})
			}
			array.forEach(positions, function(pos){
				var ltr =  leftToRight;
				switch(pos){
					case "above-centered":
						push("TM", "BM");
						break;
					case "below-centered":
						push("BM", "TM");
						break;
					case "after":
						ltr = !ltr;
						// fall through
					case "before":
						push(ltr ? "ML" : "MR", ltr ? "MR" : "ML");
						break;
					case "below-alt":
						ltr = !ltr;
						// fall through
					case "below":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "BL" : "BR", ltr ? "TL" : "TR");
						push(ltr ? "BR" : "BL", ltr ? "TR" : "TL");
						break;
					case "above-alt":
						ltr = !ltr;
						// fall through
					case "above":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "TL" : "TR", ltr ? "BL" : "BR");
						push(ltr ? "TR" : "TL", ltr ? "BR" : "BL");
						break;
					default:
						// To assist dijit/_base/place, accept arguments of type {aroundCorner: "BL", corner: "TL"}.
						// Not meant to be used directly.
						push(pos.aroundCorner, pos.corner);
				}
			});

			var position = _place(node, choices, layoutNode, {w: width, h: height});
			position.aroundNodePos = aroundNodePos;

			return position;
		}
	});
});

},
'dijit/_HasDropDown':function(){
define("dijit/_HasDropDown", [
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred",
	"dojo/_base/event", // event.stop
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-class", // domClass.add domClass.contains domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox domGeometry.position
	"dojo/dom-style", // domStyle.set
	"dojo/has",
	"dojo/keys", // keys.DOWN_ARROW keys.ENTER keys.ESCAPE
	"dojo/_base/lang", // lang.hitch lang.isFunction
	"dojo/touch",
	"dojo/_base/window", // win.doc
	"dojo/window", // winUtils.getBox
	"./registry",	// registry.byNode()
	"./focus",
	"./popup",
	"./_FocusMixin"
], function(declare, Deferred, event,dom, domAttr, domClass, domGeometry, domStyle, has, keys, lang, touch,
			win, winUtils, registry, focus, popup, _FocusMixin){

/*=====
	var _FocusMixin = dijit._FocusMixin;
=====*/

	// module:
	//		dijit/_HasDropDown
	// summary:
	//		Mixin for widgets that need drop down ability.

	return declare("dijit._HasDropDown", _FocusMixin, {
		// summary:
		//		Mixin for widgets that need drop down ability.

		// _buttonNode: [protected] DomNode
		//		The button/icon/node to click to display the drop down.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then either focusNode or domNode (if focusNode is also missing) will be used.
		_buttonNode: null,

		// _arrowWrapperNode: [protected] DomNode
		//		Will set CSS class dijitUpArrow, dijitDownArrow, dijitRightArrow etc. on this node depending
		//		on where the drop down is set to be positioned.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then _buttonNode will be used.
		_arrowWrapperNode: null,

		// _popupStateNode: [protected] DomNode
		//		The node to set the popupActive class on.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then focusNode or _buttonNode (if focusNode is missing) will be used.
		_popupStateNode: null,

		// _aroundNode: [protected] DomNode
		//		The node to display the popup around.
		//		Can be set via a data-dojo-attach-point assignment.
		//		If missing, then domNode will be used.
		_aroundNode: null,

		// dropDown: [protected] Widget
		//		The widget to display as a popup.  This widget *must* be
		//		defined before the startup function is called.
		dropDown: null,

		// autoWidth: [protected] Boolean
		//		Set to true to make the drop down at least as wide as this
		//		widget.  Set to false if the drop down should just be its
		//		default width
		autoWidth: true,

		// forceWidth: [protected] Boolean
		//		Set to true to make the drop down exactly as wide as this
		//		widget.  Overrides autoWidth.
		forceWidth: false,

		// maxHeight: [protected] Integer
		//		The max height for our dropdown.
		//		Any dropdown taller than this will have scrollbars.
		//		Set to 0 for no max height, or -1 to limit height to available space in viewport
		maxHeight: 0,

		// dropDownPosition: [const] String[]
		//		This variable controls the position of the drop down.
		//		It's an array of strings with the following values:
		//
		//			* before: places drop down to the left of the target node/widget, or to the right in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* after: places drop down to the right of the target node/widget, or to the left in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* above: drop down goes above target node
		//			* below: drop down goes below target node
		//
		//		The list is positions is tried, in order, until a position is found where the drop down fits
		//		within the viewport.
		//
		dropDownPosition: ["below","above"],

		// _stopClickEvents: Boolean
		//		When set to false, the click events will not be stopped, in
		//		case you want to use them in your subwidget
		_stopClickEvents: true,

		_onDropDownMouseDown: function(/*Event*/ e){
			// summary:
			//		Callback when the user mousedown's on the arrow icon
			if(this.disabled || this.readOnly){ return; }

			// Prevent default to stop things like text selection, but don't stop propogation, so that:
			//		1. TimeTextBox etc. can focusthe <input> on mousedown
			//		2. dropDownButtonActive class applied by _CssStateMixin (on button depress)
			//		3. user defined onMouseDown handler fires
			e.preventDefault();

			this._docHandler = this.connect(win.doc, touch.release, "_onDropDownMouseUp");

			this.toggleDropDown();
		},

		_onDropDownMouseUp: function(/*Event?*/ e){
			// summary:
			//		Callback when the user lifts their mouse after mouse down on the arrow icon.
			//		If the drop down is a simple menu and the mouse is over the menu, we execute it, otherwise, we focus our
			//		drop down widget.  If the event is missing, then we are not
			//		a mouseup event.
			//
			//		This is useful for the common mouse movement pattern
			//		with native browser <select> nodes:
			//			1. mouse down on the select node (probably on the arrow)
			//			2. move mouse to a menu item while holding down the mouse button
			//			3. mouse up.  this selects the menu item as though the user had clicked it.
			if(e && this._docHandler){
				this.disconnect(this._docHandler);
			}
			var dropDown = this.dropDown, overMenu = false;

			if(e && this._opened){
				// This code deals with the corner-case when the drop down covers the original widget,
				// because it's so large.  In that case mouse-up shouldn't select a value from the menu.
				// Find out if our target is somewhere in our dropdown widget,
				// but not over our _buttonNode (the clickable node)
				var c = domGeometry.position(this._buttonNode, true);
				if(!(e.pageX >= c.x && e.pageX <= c.x + c.w) ||
					!(e.pageY >= c.y && e.pageY <= c.y + c.h)){
					var t = e.target;
					while(t && !overMenu){
						if(domClass.contains(t, "dijitPopup")){
							overMenu = true;
						}else{
							t = t.parentNode;
						}
					}
					if(overMenu){
						t = e.target;
						if(dropDown.onItemClick){
							var menuItem;
							while(t && !(menuItem = registry.byNode(t))){
								t = t.parentNode;
							}
							if(menuItem && menuItem.onClick && menuItem.getParent){
								menuItem.getParent().onItemClick(menuItem, e);
							}
						}
						return;
					}
				}
			}
			if(this._opened){
				if(dropDown.focus && dropDown.autoFocus !== false){
					// Focus the dropdown widget - do it on a delay so that we
					// don't steal our own focus.
					window.setTimeout(lang.hitch(dropDown, "focus"), 1);
				}
			}else{
				// The drop down arrow icon probably can't receive focus, but widget itself should get focus.
				// setTimeout() needed to make it work on IE (test DateTextBox)
				setTimeout(lang.hitch(this, "focus"), 0);
			}

			if(has("ios")){
				this._justGotMouseUp = true;
				setTimeout(lang.hitch(this, function(){
					this._justGotMouseUp = false;
				}), 0);
			}
		},

		_onDropDownClick: function(/*Event*/ e){
			if(has("ios") && !this._justGotMouseUp){
				// This branch fires on iPhone for ComboBox, because the button node is an <input> and doesn't
				// generate touchstart/touchend events.   Pretend we just got a mouse down / mouse up.
				// The if(has("ios") is necessary since IE and desktop safari get spurious onclick events
				// when there are nested tables (specifically, clicking on a table that holds a dijit.form.Select,
				// but not on the Select itself, causes an onclick event on the Select)
				this._onDropDownMouseDown(e);
				this._onDropDownMouseUp(e);
			}

			// The drop down was already opened on mousedown/keydown; just need to call stopEvent().
			if(this._stopClickEvents){
				event.stop(e);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);

			this._buttonNode = this._buttonNode || this.focusNode || this.domNode;
			this._popupStateNode = this._popupStateNode || this.focusNode || this._buttonNode;

			// Add a class to the "dijitDownArrowButton" type class to _buttonNode so theme can set direction of arrow
			// based on where drop down will normally appear
			var defaultPos = {
					"after" : this.isLeftToRight() ? "Right" : "Left",
					"before" : this.isLeftToRight() ? "Left" : "Right",
					"above" : "Up",
					"below" : "Down",
					"left" : "Left",
					"right" : "Right"
			}[this.dropDownPosition[0]] || this.dropDownPosition[0] || "Down";
			domClass.add(this._arrowWrapperNode || this._buttonNode, "dijit" + defaultPos + "ArrowButton");
		},

		postCreate: function(){
			// summary:
			//		set up nodes and connect our mouse and keypress events

			this.inherited(arguments);

			this.connect(this._buttonNode, touch.press, "_onDropDownMouseDown");
			this.connect(this._buttonNode, "onclick", "_onDropDownClick");
			this.connect(this.focusNode, "onkeypress", "_onKey");
			this.connect(this.focusNode, "onkeyup", "_onKeyUp");
		},

		destroy: function(){
			if(this.dropDown){
				// Destroy the drop down, unless it's already been destroyed.  This can happen because
				// the drop down is a direct child of <body> even though it's logically my child.
				if(!this.dropDown._destroyed){
					this.dropDown.destroyRecursive();
				}
				delete this.dropDown;
			}
			this.inherited(arguments);
		},

		_onKey: function(/*Event*/ e){
			// summary:
			//		Callback when the user presses a key while focused on the button node

			if(this.disabled || this.readOnly){ return; }

			var d = this.dropDown, target = e.target;
			if(d && this._opened && d.handleKey){
				if(d.handleKey(e) === false){
					/* false return code means that the drop down handled the key */
					event.stop(e);
					return;
				}
			}
			if(d && this._opened && e.charOrCode == keys.ESCAPE){
				this.closeDropDown();
				event.stop(e);
			}else if(!this._opened &&
					(e.charOrCode == keys.DOWN_ARROW ||
						( (e.charOrCode == keys.ENTER || e.charOrCode == " ") &&
						  //ignore enter and space if the event is for a text input
						  ((target.tagName || "").toLowerCase() !== 'input' ||
						     (target.type && target.type.toLowerCase() !== 'text'))))){
				// Toggle the drop down, but wait until keyup so that the drop down doesn't
				// get a stray keyup event, or in the case of key-repeat (because user held
				// down key for too long), stray keydown events
				this._toggleOnKeyUp = true;
				event.stop(e);
			}
		},

		_onKeyUp: function(){
			if(this._toggleOnKeyUp){
				delete this._toggleOnKeyUp;
				this.toggleDropDown();
				var d = this.dropDown;	// drop down may not exist until toggleDropDown() call
				if(d && d.focus){
					setTimeout(lang.hitch(d, "focus"), 1);
				}
			}
		},

		_onBlur: function(){
			// summary:
			//		Called magically when focus has shifted away from this widget and it's dropdown

			// Don't focus on button if the user has explicitly focused on something else (happens
			// when user clicks another control causing the current popup to close)..
			// But if focus is inside of the drop down then reset focus to me, because IE doesn't like
			// it when you display:none a node with focus.
			var focusMe = focus.curNode && this.dropDown && dom.isDescendant(focus.curNode, this.dropDown.domNode);

			this.closeDropDown(focusMe);

			this.inherited(arguments);
		},

		isLoaded: function(){
			// summary:
			//		Returns true if the dropdown exists and it's data is loaded.  This can
			//		be overridden in order to force a call to loadDropDown().
			// tags:
			//		protected

			return true;
		},

		loadDropDown: function(/*Function*/ loadCallback){
			// summary:
			//		Creates the drop down if it doesn't exist, loads the data
			//		if there's an href and it hasn't been loaded yet, and then calls
			//		the given callback.
			// tags:
			//		protected

			// TODO: for 2.0, change API to return a Deferred, instead of calling loadCallback?
			loadCallback();
		},

		loadAndOpenDropDown: function(){
			// summary:
			//		Creates the drop down if it doesn't exist, loads the data
			//		if there's an href and it hasn't been loaded yet, and
			//		then opens the drop down.  This is basically a callback when the
			//		user presses the down arrow button to open the drop down.
			// returns: Deferred
			//		Deferred for the drop down widget that
			//		fires when drop down is created and loaded
			// tags:
			//		protected
			var d = new Deferred(),
				afterLoad = lang.hitch(this, function(){
					this.openDropDown();
					d.resolve(this.dropDown);
				});
			if(!this.isLoaded()){
				this.loadDropDown(afterLoad);
			}else{
				afterLoad();
			}
			return d;
		},

		toggleDropDown: function(){
			// summary:
			//		Callback when the user presses the down arrow button or presses
			//		the down arrow key to open/close the drop down.
			//		Toggle the drop-down widget; if it is up, close it, if not, open it
			// tags:
			//		protected

			if(this.disabled || this.readOnly){ return; }
			if(!this._opened){
				this.loadAndOpenDropDown();
			}else{
				this.closeDropDown();
			}
		},

		openDropDown: function(){
			// summary:
			//		Opens the dropdown for this widget.   To be called only when this.dropDown
			//		has been created and is ready to display (ie, it's data is loaded).
			// returns:
			//		return value of dijit.popup.open()
			// tags:
			//		protected

			var dropDown = this.dropDown,
				ddNode = dropDown.domNode,
				aroundNode = this._aroundNode || this.domNode,
				self = this;

			// Prepare our popup's height and honor maxHeight if it exists.

			// TODO: isn't maxHeight dependent on the return value from dijit.popup.open(),
			// ie, dependent on how much space is available (BK)

			if(!this._preparedNode){
				this._preparedNode = true;
				// Check if we have explicitly set width and height on the dropdown widget dom node
				if(ddNode.style.width){
					this._explicitDDWidth = true;
				}
				if(ddNode.style.height){
					this._explicitDDHeight = true;
				}
			}

			// Code for resizing dropdown (height limitation, or increasing width to match my width)
			if(this.maxHeight || this.forceWidth || this.autoWidth){
				var myStyle = {
					display: "",
					visibility: "hidden"
				};
				if(!this._explicitDDWidth){
					myStyle.width = "";
				}
				if(!this._explicitDDHeight){
					myStyle.height = "";
				}
				domStyle.set(ddNode, myStyle);

				// Figure out maximum height allowed (if there is a height restriction)
				var maxHeight = this.maxHeight;
				if(maxHeight == -1){
					// limit height to space available in viewport either above or below my domNode
					// (whichever side has more room)
					var viewport = winUtils.getBox(),
						position = domGeometry.position(aroundNode, false);
					maxHeight = Math.floor(Math.max(position.y, viewport.h - (position.y + position.h)));
				}

				// Attach dropDown to DOM and make make visibility:hidden rather than display:none
				// so we call startup() and also get the size
				popup.moveOffScreen(dropDown);

				if(dropDown.startup && !dropDown._started){
					dropDown.startup(); // this has to be done after being added to the DOM
				}
				// Get size of drop down, and determine if vertical scroll bar needed
				var mb = domGeometry.getMarginSize(ddNode);
				var overHeight = (maxHeight && mb.h > maxHeight);
				domStyle.set(ddNode, {
					overflowX: "hidden",
					overflowY: overHeight ? "auto" : "hidden"
				});
				if(overHeight){
					mb.h = maxHeight;
					if("w" in mb){
						mb.w += 16;	// room for vertical scrollbar
					}
				}else{
					delete mb.h;
				}

				// Adjust dropdown width to match or be larger than my width
				if(this.forceWidth){
					mb.w = aroundNode.offsetWidth;
				}else if(this.autoWidth){
					mb.w = Math.max(mb.w, aroundNode.offsetWidth);
				}else{
					delete mb.w;
				}

				// And finally, resize the dropdown to calculated height and width
				if(lang.isFunction(dropDown.resize)){
					dropDown.resize(mb);
				}else{
					domGeometry.setMarginBox(ddNode, mb);
				}
			}

			var retVal = popup.open({
				parent: this,
				popup: dropDown,
				around: aroundNode,
				orient: this.dropDownPosition,
				onExecute: function(){
					self.closeDropDown(true);
				},
				onCancel: function(){
					self.closeDropDown(true);
				},
				onClose: function(){
					domAttr.set(self._popupStateNode, "popupActive", false);
					domClass.remove(self._popupStateNode, "dijitHasDropDownOpen");
					self._opened = false;
				}
			});
			domAttr.set(this._popupStateNode, "popupActive", "true");
			domClass.add(self._popupStateNode, "dijitHasDropDownOpen");
			this._opened=true;

			// TODO: set this.checked and call setStateClass(), to affect button look while drop down is shown
			return retVal;
		},

		closeDropDown: function(/*Boolean*/ focus){
			// summary:
			//		Closes the drop down on this widget
			// focus:
			//		If true, refocuses the button widget
			// tags:
			//		protected

			if(this._opened){
				if(focus){ this.focus(); }
				popup.close(this.dropDown);
				this._opened = false;
			}
		}

	});
});

},
'ibm/tivoli/fwm/mxmap/layers/LayerPanelWidget':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog,ibm/tivoli/fwm/mxmap/layers/LayerWidget"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");

dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerWidget");

dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerPanelWidget.html", "<div class=\"text\">\n\t<div data-dojo-attach-point=\"layers\"></div>\n</div>"),
	infoPanel: null,
	map: null,
	_layers: null,
	_title: null,
	_div: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._layers = [];
		this._title = params.title;
		// this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
	},
	postCreate: function()
	{
	},
	updateLayers: function(newLayers /* [] of Layer */)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[LayerPanelWidget] Update Layers: ", newLayers);
		}
		dojo.forEach(this._layers, function(layer)
		{
			layer.destroyRecursive(true);
		});
		var div = dojo.create("div");
		
		
		dojo.style(div, {
			borderBottom : '1px solid #E0E0E0'
		});
		
		this._layers = [];

		for ( var i = 0; i < newLayers.length; i++)
		{
			if (newLayers[i].isVisibleInUI()) // Don't show empty layers
			{
				var layerWidget = new ibm.tivoli.fwm.mxmap.layers.LayerWidget({
					layer: newLayers[i],
					layerPanel: this
				});
				dojo.place(layerWidget.domNode, div, 'last');
				this._layers.push(layerWidget);
			}
		}
		dojo.place(div, this.layers, 'only');

		if (!this._title)
		{
			// Change the title of the panel according to the type of symbology
			if (newLayers[0] instanceof ibm.tivoli.fwm.mxmap.layers.SymbologyLayer)
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "symbologydialogtitle");
			}
			else if (newLayers[0] instanceof ibm.tivoli.fwm.mxmap.layers.LegendLayer)
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "legenddialogtitle");
			}
			else
			{
				this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
			}
		}

		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
		this.infoPanel = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({
			map: this.map,
			title: this._title
		});
		this.infoPanel.setContent(this.domNode);
		this.infoPanel.show(true);
	},
	close: function()
	{
		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
	}
});
});

},
'dijit/_MenuBase':function(){
define("dijit/_MenuBase", [
	"./popup",
	"dojo/window",
	"./_Widget",
	"./_KeyNavContainer",
	"./_TemplatedMixin",
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.isDescendant domClass.replace
	"dojo/dom-attr",
	"dojo/dom-class", // domClass.replace
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/array"	// array.indexOf
], function(pm, winUtils, _Widget, _KeyNavContainer, _TemplatedMixin,
	declare, dom, domAttr, domClass, lang, array){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _KeyNavContainer = dijit._KeyNavContainer;
=====*/

// module:
//		dijit/_MenuBase
// summary:
//		Base class for Menu and MenuBar

return declare("dijit._MenuBase",
	[_Widget, _TemplatedMixin, _KeyNavContainer],
{
	// summary:
	//		Base class for Menu and MenuBar

	// parentMenu: [readonly] Widget
	//		pointer to menu that displayed me
	parentMenu: null,

	// popupDelay: Integer
	//		number of milliseconds before hovering (without clicking) causes the popup to automatically open.
	popupDelay: 500,

	onExecute: function(){
		// summary:
		//		Attach point for notification about when a menu item has been executed.
		//		This is an internal mechanism used for Menus to signal to their parent to
		//		close them, because they are about to execute the onClick handler.  In
		//		general developers should not attach to or override this method.
		// tags:
		//		protected
	},

	onCancel: function(/*Boolean*/ /*===== closeAll =====*/){
		// summary:
		//		Attach point for notification about when the user cancels the current menu
		//		This is an internal mechanism used for Menus to signal to their parent to
		//		close them.  In general developers should not attach to or override this method.
		// tags:
		//		protected
	},

	_moveToPopup: function(/*Event*/ evt){
		// summary:
		//		This handles the right arrow key (left arrow key on RTL systems),
		//		which will either open a submenu, or move to the next item in the
		//		ancestor MenuBar
		// tags:
		//		private

		if(this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled){
			this.focusedChild._onClick(evt);
		}else{
			var topMenu = this._getTopMenu();
			if(topMenu && topMenu._isMenuBar){
				topMenu.focusNext();
			}
		}
	},

	_onPopupHover: function(/*Event*/ /*===== evt =====*/){
		// summary:
		//		This handler is called when the mouse moves over the popup.
		// tags:
		//		private

		// if the mouse hovers over a menu popup that is in pending-close state,
		// then stop the close operation.
		// This can't be done in onItemHover since some popup targets don't have MenuItems (e.g. ColorPicker)
		if(this.currentPopup && this.currentPopup._pendingClose_timer){
			var parentMenu = this.currentPopup.parentMenu;
			// highlight the parent menu item pointing to this popup
			if(parentMenu.focusedChild){
				parentMenu.focusedChild._setSelected(false);
			}
			parentMenu.focusedChild = this.currentPopup.from_item;
			parentMenu.focusedChild._setSelected(true);
			// cancel the pending close
			this._stopPendingCloseTimer(this.currentPopup);
		}
	},

	onItemHover: function(/*MenuItem*/ item){
		// summary:
		//		Called when cursor is over a MenuItem.
		// tags:
		//		protected

		// Don't do anything unless user has "activated" the menu by:
		//		1) clicking it
		//		2) opening it from a parent menu (which automatically focuses it)
		if(this.isActive){
			this.focusChild(item);
			if(this.focusedChild.popup && !this.focusedChild.disabled && !this.hover_timer){
				this.hover_timer = setTimeout(lang.hitch(this, "_openPopup"), this.popupDelay);
			}
		}
		// if the user is mixing mouse and keyboard navigation,
		// then the menu may not be active but a menu item has focus,
		// but it's not the item that the mouse just hovered over.
		// To avoid both keyboard and mouse selections, use the latest.
		if(this.focusedChild){
			this.focusChild(item);
		}
		this._hoveredChild = item;
	},

	_onChildBlur: function(item){
		// summary:
		//		Called when a child MenuItem becomes inactive because focus
		//		has been removed from the MenuItem *and* it's descendant menus.
		// tags:
		//		private
		this._stopPopupTimer();
		item._setSelected(false);
		// Close all popups that are open and descendants of this menu
		var itemPopup = item.popup;
		if(itemPopup){
			this._stopPendingCloseTimer(itemPopup);
			itemPopup._pendingClose_timer = setTimeout(function(){
				itemPopup._pendingClose_timer = null;
				if(itemPopup.parentMenu){
					itemPopup.parentMenu.currentPopup = null;
				}
				pm.close(itemPopup); // this calls onClose
			}, this.popupDelay);
		}
	},

	onItemUnhover: function(/*MenuItem*/ item){
		// summary:
		//		Callback fires when mouse exits a MenuItem
		// tags:
		//		protected

		if(this.isActive){
			this._stopPopupTimer();
		}
		if(this._hoveredChild == item){ this._hoveredChild = null; }
	},

	_stopPopupTimer: function(){
		// summary:
		//		Cancels the popup timer because the user has stop hovering
		//		on the MenuItem, etc.
		// tags:
		//		private
		if(this.hover_timer){
			clearTimeout(this.hover_timer);
			this.hover_timer = null;
		}
	},

	_stopPendingCloseTimer: function(/*dijit._Widget*/ popup){
		// summary:
		//		Cancels the pending-close timer because the close has been preempted
		// tags:
		//		private
		if(popup._pendingClose_timer){
			clearTimeout(popup._pendingClose_timer);
			popup._pendingClose_timer = null;
		}
	},

	_stopFocusTimer: function(){
		// summary:
		//		Cancels the pending-focus timer because the menu was closed before focus occured
		// tags:
		//		private
		if(this._focus_timer){
			clearTimeout(this._focus_timer);
			this._focus_timer = null;
		}
	},

	_getTopMenu: function(){
		// summary:
		//		Returns the top menu in this chain of Menus
		// tags:
		//		private
		for(var top=this; top.parentMenu; top=top.parentMenu);
		return top;
	},

	onItemClick: function(/*dijit._Widget*/ item, /*Event*/ evt){
		// summary:
		//		Handle clicks on an item.
		// tags:
		//		private

		// this can't be done in _onFocus since the _onFocus events occurs asynchronously
		if(typeof this.isShowingNow == 'undefined'){ // non-popup menu
			this._markActive();
		}

		this.focusChild(item);

		if(item.disabled){ return false; }

		if(item.popup){
			this._openPopup();
		}else{
			// before calling user defined handler, close hierarchy of menus
			// and restore focus to place it was when menu was opened
			this.onExecute();

			// user defined handler for click
			item.onClick(evt);
		}
	},

	_openPopup: function(){
		// summary:
		//		Open the popup to the side of/underneath the current menu item
		// tags:
		//		protected

		this._stopPopupTimer();
		var from_item = this.focusedChild;
		if(!from_item){ return; } // the focused child lost focus since the timer was started
		var popup = from_item.popup;
		if(popup.isShowingNow){ return; }
		if(this.currentPopup){
			this._stopPendingCloseTimer(this.currentPopup);
			pm.close(this.currentPopup);
		}
		popup.parentMenu = this;
		popup.from_item = from_item; // helps finding the parent item that should be focused for this popup
		var self = this;
		pm.open({
			parent: this,
			popup: popup,
			around: from_item.domNode,
			orient: this._orient || ["after", "before"],
			onCancel: function(){ // called when the child menu is canceled
				// set isActive=false (_closeChild vs _cleanUp) so that subsequent hovering will NOT open child menus
				// which seems aligned with the UX of most applications (e.g. notepad, wordpad, paint shop pro)
				self.focusChild(from_item);	// put focus back on my node
				self._cleanUp();			// close the submenu (be sure this is done _after_ focus is moved)
				from_item._setSelected(true); // oops, _cleanUp() deselected the item
				self.focusedChild = from_item;	// and unset focusedChild
			},
			onExecute: lang.hitch(this, "_cleanUp")
		});

		this.currentPopup = popup;
		// detect mouseovers to handle lazy mouse movements that temporarily focus other menu items
		popup.connect(popup.domNode, "onmouseenter", lang.hitch(self, "_onPopupHover")); // cleaned up when the popped-up widget is destroyed on close

		if(popup.focus){
			// If user is opening the popup via keyboard (right arrow, or down arrow for MenuBar),
			// if the cursor happens to collide with the popup, it will generate an onmouseover event
			// even though the mouse wasn't moved.  Use a setTimeout() to call popup.focus so that
			// our focus() call overrides the onmouseover event, rather than vice-versa.  (#8742)
			popup._focus_timer = setTimeout(lang.hitch(popup, function(){
				this._focus_timer = null;
				this.focus();
			}), 0);
		}
	},

	_markActive: function(){
		// summary:
		//		Mark this menu's state as active.
		//		Called when this Menu gets focus from:
		//			1) clicking it (mouse or via space/arrow key)
		//			2) being opened by a parent menu.
		//		This is not called just from mouse hover.
		//		Focusing a menu via TAB does NOT automatically set isActive
		//		since TAB is a navigation operation and not a selection one.
		//		For Windows apps, pressing the ALT key focuses the menubar
		//		menus (similar to TAB navigation) but the menu is not active
		//		(ie no dropdown) until an item is clicked.
		this.isActive = true;
		domClass.replace(this.domNode, "dijitMenuActive", "dijitMenuPassive");
	},

	onOpen: function(/*Event*/ /*===== e =====*/){
		// summary:
		//		Callback when this menu is opened.
		//		This is called by the popup manager as notification that the menu
		//		was opened.
		// tags:
		//		private

		this.isShowingNow = true;
		this._markActive();
	},

	_markInactive: function(){
		// summary:
		//		Mark this menu's state as inactive.
		this.isActive = false; // don't do this in _onBlur since the state is pending-close until we get here
		domClass.replace(this.domNode, "dijitMenuPassive", "dijitMenuActive");
	},

	onClose: function(){
		// summary:
		//		Callback when this menu is closed.
		//		This is called by the popup manager as notification that the menu
		//		was closed.
		// tags:
		//		private

		this._stopFocusTimer();
		this._markInactive();
		this.isShowingNow = false;
		this.parentMenu = null;
	},

	_closeChild: function(){
		// summary:
		//		Called when submenu is clicked or focus is lost.  Close hierarchy of menus.
		// tags:
		//		private
		this._stopPopupTimer();

		if(this.currentPopup){
			// If focus is on a descendant MenuItem then move focus to me,
			// because IE doesn't like it when you display:none a node with focus,
			// and also so keyboard users don't lose control.
			// Likely, immediately after a user defined onClick handler will move focus somewhere
			// else, like a Dialog.
			if(array.indexOf(this._focusManager.activeStack, this.id) >= 0){
				domAttr.set(this.focusedChild.focusNode, "tabIndex", this.tabIndex);
				this.focusedChild.focusNode.focus();
			}
			// Close all popups that are open and descendants of this menu
			pm.close(this.currentPopup);
			this.currentPopup = null;
		}

		if(this.focusedChild){ // unhighlight the focused item
			this.focusedChild._setSelected(false);
			this.focusedChild._onUnhover();
			this.focusedChild = null;
		}
	},

	_onItemFocus: function(/*MenuItem*/ item){
		// summary:
		//		Called when child of this Menu gets focus from:
		//			1) clicking it
		//			2) tabbing into it
		//			3) being opened by a parent menu.
		//		This is not called just from mouse hover.
		if(this._hoveredChild && this._hoveredChild != item){
			this._hoveredChild._onUnhover(); // any previous mouse movement is trumped by focus selection
		}
	},

	_onBlur: function(){
		// summary:
		//		Called when focus is moved away from this Menu and it's submenus.
		// tags:
		//		protected
		this._cleanUp();
		this.inherited(arguments);
	},

	_cleanUp: function(){
		// summary:
		//		Called when the user is done with this menu.  Closes hierarchy of menus.
		// tags:
		//		private

		this._closeChild(); // don't call this.onClose since that's incorrect for MenuBar's that never close
		if(typeof this.isShowingNow == 'undefined'){ // non-popup menu doesn't call onClose
			this._markInactive();
		}
	}
});

});

},
'dijit/focus':function(){
define("dijit/focus", [
	"dojo/aspect",
	"dojo/_base/declare", // declare
	"dojo/dom", // domAttr.get dom.isDescendant
	"dojo/dom-attr", // domAttr.get dom.isDescendant
	"dojo/dom-construct", // connect to domConstruct.empty, domConstruct.destroy
	"dojo/Evented",
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/ready",
	"dojo/_base/sniff", // has("ie")
	"dojo/Stateful",
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.get
	"./a11y",	// a11y.isTabNavigable
	"./registry",	// registry.byId
	"."		// to set dijit.focus
], function(aspect, declare, dom, domAttr, domConstruct, Evented, lang, on, ready, has, Stateful, unload, win, winUtils,
			a11y, registry, dijit){

	// module:
	//		dijit/focus
	// summary:
	//		Returns a singleton that tracks the currently focused node, and which widgets are currently "active".

/*=====
	dijit.focus = {
		// summary:
		//		Tracks the currently focused node, and which widgets are currently "active".
		//		Access via require(["dijit/focus"], function(focus){ ... }).
		//
		//		A widget is considered active if it or a descendant widget has focus,
		//		or if a non-focusable node of this widget or a descendant was recently clicked.
		//
		//		Call focus.watch("curNode", callback) to track the current focused DOMNode,
		//		or focus.watch("activeStack", callback) to track the currently focused stack of widgets.
		//
		//		Call focus.on("widget-blur", func) or focus.on("widget-focus", ...) to monitor when
		//		when widgets become active/inactive
		//
		//		Finally, focus(node) will focus a node, suppressing errors if the node doesn't exist.

		// curNode: DomNode
		//		Currently focused item on screen
		curNode: null,

		// activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		activeStack: [],

		registerIframe: function(iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle with remove() method to deregister.
		},

		registerWin: function(targetWindow, effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow: Window?
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode: DOMNode?
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle with remove() method to deregister.
		}
	};
=====*/

	var FocusManager = declare([Stateful, Evented], {
		// curNode: DomNode
		//		Currently focused item on screen
		curNode: null,

		// activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		activeStack: [],

		constructor: function(){
			// Don't leave curNode/prevNode pointing to bogus elements
			var check = lang.hitch(this, function(node){
				if(dom.isDescendant(this.curNode, node)){
					this.set("curNode", null);
				}
				if(dom.isDescendant(this.prevNode, node)){
					this.set("prevNode", null);
				}
			});
			aspect.before(domConstruct, "empty", check);
			aspect.before(domConstruct, "destroy", check);
		},

		registerIframe: function(/*DomNode*/ iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle with remove() method to deregister.
			return this.registerWin(iframe.contentWindow, iframe);
		},

		registerWin: function(/*Window?*/targetWindow, /*DomNode?*/ effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow:
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode:
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle with remove() method to deregister.

			// TODO: make this function private in 2.0; Editor/users should call registerIframe(),

			var _this = this;
			var mousedownListener = function(evt){
				_this._justMouseDowned = true;
				setTimeout(function(){ _this._justMouseDowned = false; }, 0);

				// workaround weird IE bug where the click is on an orphaned node
				// (first time clicking a Select/DropDownButton inside a TooltipDialog)
				if(has("ie") && evt && evt.srcElement && evt.srcElement.parentNode == null){
					return;
				}

				_this._onTouchNode(effectiveNode || evt.target || evt.srcElement, "mouse");
			};

			// Listen for blur and focus events on targetWindow's document.
			// IIRC, I'm using attachEvent() rather than dojo.connect() because focus/blur events don't bubble
			// through dojo.connect(), and also maybe to catch the focus events early, before onfocus handlers
			// fire.
			// Connect to <html> (rather than document) on IE to avoid memory leaks, but document on other browsers because
			// (at least for FF) the focus event doesn't fire on <html> or <body>.
			var doc = has("ie") ? targetWindow.document.documentElement : targetWindow.document;
			if(doc){
				if(has("ie")){
					targetWindow.document.body.attachEvent('onmousedown', mousedownListener);
					var activateListener = function(evt){
						// IE reports that nodes like <body> have gotten focus, even though they have tabIndex=-1,
						// ignore those events
						var tag = evt.srcElement.tagName.toLowerCase();
						if(tag == "#document" || tag == "body"){ return; }

						// Previous code called _onTouchNode() for any activate event on a non-focusable node.   Can
						// probably just ignore such an event as it will be handled by onmousedown handler above, but
						// leaving the code for now.
						if(a11y.isTabNavigable(evt.srcElement)){
							_this._onFocusNode(effectiveNode || evt.srcElement);
						}else{
							_this._onTouchNode(effectiveNode || evt.srcElement);
						}
					};
					doc.attachEvent('onactivate', activateListener);
					var deactivateListener =  function(evt){
						_this._onBlurNode(effectiveNode || evt.srcElement);
					};
					doc.attachEvent('ondeactivate', deactivateListener);

					return {
						remove: function(){
							targetWindow.document.detachEvent('onmousedown', mousedownListener);
							doc.detachEvent('onactivate', activateListener);
							doc.detachEvent('ondeactivate', deactivateListener);
							doc = null;	// prevent memory leak (apparent circular reference via closure)
						}
					};
				}else{
					doc.body.addEventListener('mousedown', mousedownListener, true);
					doc.body.addEventListener('touchstart', mousedownListener, true);
					var focusListener = function(evt){
						_this._onFocusNode(effectiveNode || evt.target);
					};
					doc.addEventListener('focus', focusListener, true);
					var blurListener = function(evt){
						_this._onBlurNode(effectiveNode || evt.target);
					};
					doc.addEventListener('blur', blurListener, true);

					return {
						remove: function(){
							doc.body.removeEventListener('mousedown', mousedownListener, true);
							doc.body.removeEventListener('touchstart', mousedownListener, true);
							doc.removeEventListener('focus', focusListener, true);
							doc.removeEventListener('blur', blurListener, true);
							doc = null;	// prevent memory leak (apparent circular reference via closure)
						}
					};
				}
			}
		},

		_onBlurNode: function(/*DomNode*/ /*===== node =====*/){
			// summary:
			// 		Called when focus leaves a node.
			//		Usually ignored, _unless_ it *isn't* followed by touching another node,
			//		which indicates that we tabbed off the last field on the page,
			//		in which case every widget is marked inactive
			this.set("prevNode", this.curNode);
			this.set("curNode", null);

			if(this._justMouseDowned){
				// the mouse down caused a new widget to be marked as active; this blur event
				// is coming late, so ignore it.
				return;
			}

			// if the blur event isn't followed by a focus event then mark all widgets as inactive.
			if(this._clearActiveWidgetsTimer){
				clearTimeout(this._clearActiveWidgetsTimer);
			}
			this._clearActiveWidgetsTimer = setTimeout(lang.hitch(this, function(){
				delete this._clearActiveWidgetsTimer;
				this._setStack([]);
				this.prevNode = null;
			}), 100);
		},

		_onTouchNode: function(/*DomNode*/ node, /*String*/ by){
			// summary:
			//		Callback when node is focused or mouse-downed
			// node:
			//		The node that was touched.
			// by:
			//		"mouse" if the focus/touch was caused by a mouse down event

			// ignore the recent blurNode event
			if(this._clearActiveWidgetsTimer){
				clearTimeout(this._clearActiveWidgetsTimer);
				delete this._clearActiveWidgetsTimer;
			}

			// compute stack of active widgets (ex: ComboButton --> Menu --> MenuItem)
			var newStack=[];
			try{
				while(node){
					var popupParent = domAttr.get(node, "dijitPopupParent");
					if(popupParent){
						node=registry.byId(popupParent).domNode;
					}else if(node.tagName && node.tagName.toLowerCase() == "body"){
						// is this the root of the document or just the root of an iframe?
						if(node === win.body()){
							// node is the root of the main document
							break;
						}
						// otherwise, find the iframe this node refers to (can't access it via parentNode,
						// need to do this trick instead). window.frameElement is supported in IE/FF/Webkit
						node=winUtils.get(node.ownerDocument).frameElement;
					}else{
						// if this node is the root node of a widget, then add widget id to stack,
						// except ignore clicks on disabled widgets (actually focusing a disabled widget still works,
						// to support MenuItem)
						var id = node.getAttribute && node.getAttribute("widgetId"),
							widget = id && registry.byId(id);
						if(widget && !(by == "mouse" && widget.get("disabled"))){
							newStack.unshift(id);
						}
						node=node.parentNode;
					}
				}
			}catch(e){ /* squelch */ }

			this._setStack(newStack, by);
		},

		_onFocusNode: function(/*DomNode*/ node){
			// summary:
			//		Callback when node is focused

			if(!node){
				return;
			}

			if(node.nodeType == 9){
				// Ignore focus events on the document itself.  This is here so that
				// (for example) clicking the up/down arrows of a spinner
				// (which don't get focus) won't cause that widget to blur. (FF issue)
				return;
			}

			this._onTouchNode(node);

			if(node == this.curNode){ return; }
			this.set("curNode", node);
		},

		_setStack: function(/*String[]*/ newStack, /*String*/ by){
			// summary:
			//		The stack of active widgets has changed.  Send out appropriate events and records new stack.
			// newStack:
			//		array of widget id's, starting from the top (outermost) widget
			// by:
			//		"mouse" if the focus/touch was caused by a mouse down event

			var oldStack = this.activeStack;
			this.set("activeStack", newStack);

			// compare old stack to new stack to see how many elements they have in common
			for(var nCommon=0; nCommon<Math.min(oldStack.length, newStack.length); nCommon++){
				if(oldStack[nCommon] != newStack[nCommon]){
					break;
				}
			}

			var widget;
			// for all elements that have gone out of focus, set focused=false
			for(var i=oldStack.length-1; i>=nCommon; i--){
				widget = registry.byId(oldStack[i]);
				if(widget){
					widget._hasBeenBlurred = true;		// TODO: used by form widgets, should be moved there
					widget.set("focused", false);
					if(widget._focusManager == this){
						widget._onBlur(by);
					}
					this.emit("widget-blur", widget, by);
				}
			}

			// for all element that have come into focus, set focused=true
			for(i=nCommon; i<newStack.length; i++){
				widget = registry.byId(newStack[i]);
				if(widget){
					widget.set("focused", true);
					if(widget._focusManager == this){
						widget._onFocus(by);
					}
					this.emit("widget-focus", widget, by);
				}
			}
		},

		focus: function(node){
			// summary:
			//		Focus the specified node, suppressing errors if they occur
			if(node){
				try{ node.focus(); }catch(e){/*quiet*/}
			}
		}
	});

	var singleton = new FocusManager();

	// register top window and all the iframes it contains
	ready(function(){
		var handle = singleton.registerWin(win.doc.parentWindow || win.doc.defaultView);
		if(has("ie")){
			unload.addOnWindowUnload(function(){
				handle.remove();
				handle = null;
			})
		}
	});

	// Setup dijit.focus as a pointer to the singleton but also (for backwards compatibility)
	// as a function to set focus.
	dijit.focus = function(node){
		singleton.focus(node);	// indirection here allows dijit/_base/focus.js to override behavior
	};
	for(var attr in singleton){
		if(!/^_/.test(attr)){
			dijit.focus[attr] = typeof singleton[attr] == "function" ? lang.hitch(singleton, attr) : singleton[attr];
		}
	}
	singleton.watch(function(attr, oldVal, newVal){
		dijit.focus[attr] = newVal;
	});

	return singleton;
});

},
'dojo/i18n':function(){
define("dojo/i18n", ["./_base/kernel", "require", "./has", "./_base/array", "./_base/lang", "./_base/xhr"], function(dojo, require, has, array, lang) {
	// module:
	//		dojo/i18n
	// summary:
	//		This module implements the !dojo/i18n plugin and the v1.6- i18n API
	// description:
	//		We choose to include our own plugin to leverage functionality already contained in dojo
	//		and thereby reduce the size of the plugin compared to various loader implementations. Also, this
	//		allows foreign AMD loaders to be used without their plugins.
	var
		thisModule= dojo.i18n=
			// the dojo.i18n module
			{},

		nlsRe=
			// regexp for reconstructing the master bundle name from parts of the regexp match
			// nlsRe.exec("foo/bar/baz/nls/en-ca/foo") gives:
			// ["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
			// nlsRe.exec("foo/bar/baz/nls/foo") gives:
			// ["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
			// so, if match[5] is blank, it means this is the top bundle definition.
			// courtesy of http://requirejs.org
			/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,

		getAvailableLocales= function(
			root,
			locale,
			bundlePath,
			bundleName
		){
			// return a vector of module ids containing all available locales with respect to the target locale
			// For example, assuming:
			//	 * the root bundle indicates specific bundles for "fr" and "fr-ca",
			//	 * bundlePath is "myPackage/nls"
			//	 * bundleName is "myBundle"
			// Then a locale argument of "fr-ca" would return
			//	 ["myPackage/nls/myBundle", "myPackage/nls/fr/myBundle", "myPackage/nls/fr-ca/myBundle"]
			// Notice that bundles are returned least-specific to most-specific, starting with the root.
			//
			// If root===false indicates we're working with a pre-AMD i18n bundle that doesn't tell about the available locales;
			// therefore, assume everything is available and get 404 errors that indicate a particular localization is not available
			//

			for(var result= [bundlePath + bundleName], localeParts= locale.split("-"), current= "", i= 0; i<localeParts.length; i++){
				current+= (current ? "-" : "") + localeParts[i];
				if(!root || root[current]){
					result.push(bundlePath + current + "/" + bundleName);
				}
			}
			return result;
		},

		cache= {},

		getL10nName= dojo.getL10nName = function(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = "dojo/i18n!" + moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		},

		doLoad = function(require, bundlePathAndName, bundlePath, bundleName, locale, load){
			// get the root bundle which instructs which other bundles are required to contruct the localized bundle
			require([bundlePathAndName], function(root){
				var
					current= cache[bundlePathAndName + "/"]= lang.clone(root.root),
					availableLocales= getAvailableLocales(!root._v1x && root, locale, bundlePath, bundleName);
				require(availableLocales, function(){
					for (var i= 1; i<availableLocales.length; i++){
						cache[availableLocales[i]]= current= lang.mixin(lang.clone(current), arguments[i]);
					}
					// target may not have been resolve (e.g., maybe only "fr" exists when "fr-ca" was requested)
					var target= bundlePathAndName + "/" + locale;
					cache[target]= current;
					load && load(lang.delegate(current));
				});
			});
		},

		normalize = function(id, toAbsMid){
			// note: id may be relative
			var match= nlsRe.exec(id),
				bundlePath= match[1];
			return /^\./.test(bundlePath) ? toAbsMid(bundlePath) + "/" +  id.substring(bundlePath.length) : id;
		};

		load = function(id, require, load){
			// note: id is always absolute
			var
				match= nlsRe.exec(id),
				bundlePath= match[1] + "/",
				bundleName= match[5] || match[4],
				bundlePathAndName= bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale=  localeSpecified || dojo.locale,
				target= bundlePathAndName + "/" + targetLocale;

			if(localeSpecified){
				if(cache[target]){
					// a request for a specific local that has already been loaded; just return it
					load(cache[target]);
				}else{
					// a request for a specific local that has not been loaded; load and return just that locale
					doLoad(require, bundlePathAndName, bundlePath, bundleName, targetLocale, load);
				}
				return;
			}// else a non-locale-specific request; therefore always load dojo.locale + dojo.config.extraLocale

			// notice the subtle algorithm that loads targeLocal last, which is the only doLoad application that passes a value for the load callback
			// this makes the sync loader follow a clean code path that loads extras first and then proceeds with tracing the current deps graph
			var extra = dojo.config.extraLocale || [];
			extra = lang.isArray(extra) ? extra : [extra];
			extra.push(targetLocale);
			array.forEach(extra, function(locale){
				doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, locale==targetLocale && load);
			});
		};


	true || has.add("dojo-v1x-i18n-Api",
		// if true, define the v1.x i18n functions
		1
	);

	if(1){
		var
			evalBundle=
				// keep the minifiers off our define!
				// if bundle is an AMD bundle, then __amdResult will be defined; otherwise it's a pre-amd bundle and the bundle value is returned by eval
				new Function("bundle", "var __preAmdResult, __amdResult; function define(bundle){__amdResult= bundle;} __preAmdResult= eval(bundle); return [__preAmdResult, __amdResult];"),

			fixup= function(url, preAmdResult, amdResult){
				// nls/<locale>/<bundle-name> indicates not the root.
				return preAmdResult ? (/nls\/[^\/]+\/[^\/]+$/.test(url) ? preAmdResult : {root:preAmdResult, _v1x:1}) : amdResult;
			},

			syncRequire= function(deps, callback){
				var results= [];
				dojo.forEach(deps, function(mid){
					var url= require.toUrl(mid + ".js");
					if(cache[url]){
						results.push(cache[url]);
					}else{

						try {
							var bundle= require(mid);
							if(bundle){
								results.push(bundle);
								return;
							}
						}catch(e){}

						dojo.xhrGet({
							url:url,
							sync:true,
							load:function(text){
								var result = evalBundle(text);
								results.push(cache[url]= fixup(url, result[0], result[1]));
							},
							error:function(){
								results.push(cache[url]= {});
							}
						});
					}
				});
				callback.apply(null, results);
			};

		thisModule.getLocalization= function(moduleName, bundleName, locale){
			var result,
				l10nName= getL10nName(moduleName, bundleName, locale).substring(10);
			load(l10nName, (1 && !require.isXdUrl(require.toUrl(l10nName + ".js")) ? syncRequire : require), function(result_){ result= result_; });
			return result;
		};

		thisModule.normalizeLocale= function(locale){
			var result = locale ? locale.toLowerCase() : dojo.locale;
			if(result == "root"){
				result = "ROOT";
			}
			return result;
		};
	}

	return lang.mixin(thisModule, {
		dynamic:true,
		normalize:normalize,
		load:load,
		cache:function(mid, value){
			cache[mid] = value;
		}
	});
});

},
'dijit/hccss':function(){
define("dijit/hccss", [
	"require",			// require.toUrl
	"dojo/_base/config", // config.blankGif
	"dojo/dom-class", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/dom-construct", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/dom-style", // domClass.add domConstruct.create domStyle.getComputedStyle
	"dojo/ready", // ready
	"dojo/_base/sniff", // has("ie") has("mozilla")
	"dojo/_base/window" // win.body
], function(require, config, domClass, domConstruct, domStyle, ready, has, win){

	// module:
	//		dijit/hccss
	// summary:
	//		Test if computer is in high contrast mode, and sets dijit_a11y flag on <body> if it is.

	if(has("ie") || has("mozilla")){	// NOTE: checking in Safari messes things up
		// priority is 90 to run ahead of parser priority of 100
		ready(90, function(){
			// summary:
			//		Detects if we are in high-contrast mode or not

			// create div for testing if high contrast mode is on or images are turned off
			var div = domConstruct.create("div",{
				id: "a11yTestNode",
				style:{
					cssText:'border: 1px solid;'
						+ 'border-color:red green;'
						+ 'position: absolute;'
						+ 'height: 5px;'
						+ 'top: -999px;'
						+ 'background-image: url("' + (config.blankGif || require.toUrl("dojo/resources/blank.gif")) + '");'
				}
			}, win.body());

			// test it
			var cs = domStyle.getComputedStyle(div);
			if(cs){
				var bkImg = cs.backgroundImage;
				var needsA11y = (cs.borderTopColor == cs.borderRightColor) || (bkImg != null && (bkImg == "none" || bkImg == "url(invalid-url:)" ));
				if(needsA11y){
					domClass.add(win.body(), "dijit_a11y");
				}
				if(has("ie")){
					div.outerHTML = "";		// prevent mixed-content warning, see http://support.microsoft.com/kb/925014
				}else{
					win.body().removeChild(div);
				}
			}
		});
	}
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/form/Button"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");

/**
 * Full Screen tool bar action.
 */
// TODO get translated messages or change the description to images
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	label: "",
	_button: null,
	iconClass: "basicMapToolbarBtn",
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._handlers=[];
		

	},
	createToolbarButton: function()
	{
		this._button = new dijit.form.Button({
			label: this.label,
			showLabel: false,
			iconClass: this.iconClass,
			onClick: dojo.hitch(this, function()
			{
				this.execute();
			})

		});
		return this._button;

	},
	execute: function()
	{
		console.error("to be implemented");
	},
	disable: function()
	{
		// does nothing
		console.error("to be implemented");
	},
	destroy: function()
	{
		this._button.destroyRecursive();
		// equivalent to super.destroyRecursive()
		// arguments is mandatory
		this.inherited(arguments);
		this.destroyRecursive();
	}
});
});

},
'ibm/tivoli/fwm/mxmap/routing/itinerary/ItineraryManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,dijit/form/CheckBox,dijit/form/RadioButton,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog,ibm/tivoli/fwm/mxmap/routing/itinerary/Leg,ibm/tivoli/fwm/mxmap/routing/itinerary/Step"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.RadioButton");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
/**
 * Controls the route step by step information and dialog
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/ItineraryManager.html", "<div style=\"width:100%;overflow: auto;\">\n\t<div data-dojo-attach-point=\"controls\" style=\"background-color: #FFFFFF;border: 1px solid #E0E0E0;padding: 10px;margin-left: 4px; margin-right: 4px;\">\n\t\t<div style=\"float:left;width:50%;\" data-dojo-attach-point=\"avoidersNode\">\n\t\t\t<div style=\"padding-top:0px;padding-bottom:10px\">\n\t\t\t\t<span data-dojo-attach-point=\"ahNode\" style=\"padding-left:10px;padding-right:10px\"></span> <div data-dojo-attach-point=\"avoidhighwaysdiv\" data-dojo-attach-event=\"ondijitclick:_highClick\" style=\"display:inline\"><label data-dojo-attach-point=\"itineraryavoidhighways\" for=\"avoidhighways\">Avoid highways</label></div><br/>\n\t\t\t</div>\n\t\t\t<div style=\"padding-top: 10px; padding-bottom:0px\">\n\t\t\t\t<span data-dojo-attach-point=\"atNode\" style=\"padding-left:10px;padding-right:10px\"></span> <div data-dojo-attach-point=\"avoidtollsdiv\" data-dojo-attach-event=\"ondijitclick:_tollsClick\" style=\"display:inline\"><label data-dojo-attach-point=\"itineraryavoidtolls\" for=\"avoidtolls\">Avoid tolls</label></div><br/>\n\t\t\t</div>\n\t\t</div>\n\t\t<div data-dojo-attach-point=\"kmdiv\" data-dojo-attach-event=\"ondijitclick:_kmClick\" style=\"padding-top:0px;padding-bottom:10px\">\n\t\t\t<span data-dojo-attach-point=\"kmNode\" style=\"padding-left:10px;padding-right:10px\"></span><label data-dojo-attach-point=\"itinerarykm\" for=\"km\">Kilometers</label>\n\t\t</div>\n\t\t<div data-dojo-attach-point=\"milesdiv\" data-dojo-attach-event=\"ondijitclick:_milesClick\" style=\"padding-top:10px;padding-bottom:0px\">\n\t\t\t<span data-dojo-attach-point=\"miNode\" style=\"padding-left:10px;padding-right:10px\"></span><label data-dojo-attach-point=\"itinerarymiles\" for=\"miles\">Miles</label>\n\t\t</div>\n\t</div>\n\t<div data-dojo-attach-point=\"markerNode\" style=\"float:left;\" data-dojo-attach-event=\"ondijitclick:_onInitialLocClick\"></div>\n\t<div data-dojo-attach-point=\"startLocation\" style=\"margin: 1px;padding: 7px 2px;\" ></div>\n\t<div data-dojo-attach-point=\"routeInfo\" style=\"padding: 2px;\">\n\t</div>\n</div>"),
	infoPanel: null,
	map: null,
	legs: [],
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	highway: null,
	toll: null,
	km: null,
	miles: null,
	postCreate: function()
	{
		// Dojo's checkboxes don't work well on Android, so we use native ones instead
		var isAndroid = navigator.userAgent.indexOf("Android") > -1;
		var checkboxBuilder = (isAndroid 
				? function(params, container)
					{
						return new ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput("checkbox", params, container);
					}
				: function(params, container)
					{
						return new dijit.form.CheckBox(params, container);
					});
		var radioBuilder = (isAndroid 
				? function(params, container)
					{
						return new ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput("radio", params, container);
					}
				: function(params, container)
					{
						return new dijit.form.RadioButton(params, container);
					});

		this.highway = checkboxBuilder({
			name: "highway",
			value: "highway",
			checked: false,
			onChange: dojo.hitch(this, this.onHighWayChanged),
			label: this.itineraryavoidhighways // only used by the mobile version
		}, this.ahNode);
		//this.itineraryavoidhighwaysdiv
		this.toll = checkboxBuilder({
			name: "toll",
			value: "toll",
			checked: false,
			onChange: dojo.hitch(this, this.onTollChanged),
			label: this.itineraryavoidtolls // only used by the mobile version
		}, this.atNode);
		var defaultLengthUnit = this.map.getDefaultLengthUnit();

		this.km = radioBuilder({
			checked: (defaultLengthUnit == "KILOMETERS"),
			value: "km",
			name: "unit",
			onChange: dojo.hitch(this, this.onUnitChanged),
			label: this.itinerarykm // only used by the mobile version
		}, this.kmNode);
		this.miles = radioBuilder({
			checked: (defaultLengthUnit == "MILES"),
			value: "mi",
			name: "unit",
			onChange: dojo.hitch(this, this.onUnitChanged),
			label: this.itinerarymiles // only used by the mobile version
		}, this.miNode);

		// Translate the texts in the dialog
		this.itineraryavoidhighways.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itineraryavoidhw");
		this.itineraryavoidtolls.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itineraryavoidtolls");
		this.itinerarykm.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarykm");
		this.itinerarymiles.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarymiles");
		this.addressLoading = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_being_loaded");
		this.failedToLoadAddress = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_info_not_found");

	},
	_highClick:function(){
		var state = !this.highway.get('value');
		this.highway.set("checked",state);
	},
	_tollsClick:function(){
		var state = !this.toll.get('value');
		this.toll.set("checked",state);
	},
	_kmClick:function(){
		this.km.set("checked",true);
	},
	_milesClick:function(){
		this.miles.set("checked",true);
	},
	onUnitChanged: function(enabled)
	{
		/*
		 * because it's a radio button and there are only 2 options if one
		 * changes the other changes too (to true and to false) so we jsut
		 * trigger on the enablement
		 */
		if (enabled == true)
		{
			this.onRouteControlsChanged(false);
		}
	},
	onTollChanged: function()
	{
		this.onRouteControlsChanged(true);
	},
	onHighWayChanged: function(arg)
	{
		this.onRouteControlsChanged(true);
	},	
	enableControls:function(enable){
		this.miles.setDisabled(!enable);
		this.km.setDisabled(!enable);
		this.highway.setDisabled(!enable);
		this.toll.setDisabled(!enable);
	},
	onRouteControlsChanged: function(needsToReRoute)
	{
		this.enableControls(false);
		var custom = this.getControls();
		var conf = this.route.inputInfo;
		var me = this;
		if (!this.infoPanel)
		{
			console.info("info panel", this.infoPanel);
			this._getInfoPanel();
		}
		
		var fct = function(route)
		{
			var routeId = me.route.id;
			if (needsToReRoute == true)
			{
				me.routeManager.replaceRoute(route, routeId);
				route.show();
			}
			me.updateRouteItinerary(route.itinerary, me.routeManager, route);
			
			me.enableControls(true);
		};
		var errFct = function(error){
			me.enableControls(true);
			conf.errorCb(error);
		};
		
		if (needsToReRoute == true)
		{
	
			dojo.empty(this.routeInfo);
			dojo.create("img", {
				src: dojo.config.fwm.ctxRoot + "/webclient/skins/tivoli09/images/progressbar.gif"
			}, this.routeInfo);
			this.routeManager.reGenerate(this.route, custom, fct, errFct);
		}
		else
		{
			this.route.originalRouter.customConf = custom;
			fct(this.route);
		}
	},
	getControls: function()
	{
		var state = {};
		if (this.highway.get('value') != false)
		{
			state.avoidHighway = true;
		}
		else
		{
			state.avoidHighway = false;
		}
		if (this.toll.get('value') != false)
		{
			state.avoidToll = true;
		}
		else
		{
			state.avoidToll = false;
		}
		var km = this.km.get("value") != false;
		var miles = this.miles.get("value") != false;
		if (km == true)
		{
			state.distanceUnit = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM;
		}
		else
		{
			state.distanceUnit = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.MILES;
		}
		return state;
	},
	routeManager: null,
	route: null,
	_createLegFromInitialLocation: function(initialLocation)
	{
		var leg = initialLocation;
		leg.marker = this.route.getMarkerForStop(0);
		leg.map = this.map;
		leg.distanceUnit = this.getControls().distanceUnit;
		var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Leg(leg);
		return legWidget;

		dojo.place(legWidget.domNode, this.routeInfo, 'first');
	},
	updateRouteItinerary: function(itinerary, routeManager, route)
	{
		this.routeManager = routeManager;
		this.route = route;
		if (this.route == null)
		{
			this.enableControls(false);
			return;
		}
		this.enableControls(true);
		if (this.route.avoidTollsSupported == false && this.route.avoidHighwaysSupported == false)
		{
			console.log("not visible");
			dojo.style(this.avoidersNode, "display", "none");
		}
		else
		{
			dojo.style(this.avoidersNode, "display", "block");
		}
		this.legs = [];
		var initialLocation = itinerary.getInitialLocation();
		var fct = function()
		{
			this.infoPanel.close();
		};
		if (initialLocation)
		{
			initialLocation.marker = this.route.getMarkerForStop(0);
			initialLocation.closeDialog = dojo.hitch(this, fct);

			var legWidget = this._createLegFromInitialLocation(initialLocation);
			dojo.place(legWidget.domNode, this.startLocation, 'only');

		}
		// to force an empty list

		dojo.empty(this.routeInfo);

		for ( var i = 0; i < itinerary.legs.length; i++)
		{
			var leg = itinerary.legs[i];
			leg.marker = this.route.getMarkerForStop(i + 1);
			leg.map = this.map;
			leg.distanceUnit = this.getControls().distanceUnit;
			leg.closeDialog = dojo.hitch(this, fct);
			var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Leg(leg);

			dojo.place(legWidget.domNode, this.routeInfo, 'last');
			this.legs.push(legWidget);
		}

	},
	_onInitialLocClick: function(args)
	{
		var _loc = this.route.itinerary.getInitialLocation().location;
		this.map.getMapstraction().setCenter(_loc);
	},
	isIt: false,
	showPanel: function()
	{
		if (this.isIt == false)
		{
			this.isIt = true;
			this._getInfoPanel();
			this.infoPanel.setContent(this.domNode);
		}
		if(this.route==null){
			this.enableControls(false);
		}else{
			this.enableControls(true);
		}
		this.infoPanel.show();
	},
	_getInfoPanel: function()
	{
		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
		this.infoPanel = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({
			map: this.map,
			fitHeight: true
		});
		// sets the height of the content to provide right scroll. removes 40 to
		// better display it
		/*
		 * var height = this.infoPanel.getCalculatedHeight() - 40; if (height <=
		 * 0) { height = 10; }
		 * 
		 * dojo.style(this.domNode, { "height": height + "px" });
		 */
		return this.infoPanel;
	}

});

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput", [ ], {
	_checkbox: null,
	constructor: function(type, args, container)
	{
		container.innerHTML += '<input type="' + type + '" name="' + args.name + '" value="' + args.value + '"/>';
		var checkbox = container.childNodes[0];
		checkbox.checked = args.checked;
		var onchange = args.onChange;
		checkbox.onchange = function(evt) {
			onchange(evt.target.checked);
		};

		args.label.onclick = function() { checkbox.click(); };

		this._checkbox = checkbox;
	},
	get: function(name)
	{
		if (name == "value")
		{
			return this._checkbox.checked;
		}
	},
	set: function(name, value)
	{
		// Do nothing, as this is being called in the onclick by dojo after the state has already changed
	},
	setDisabled: function(state)
	{
		this._checkbox.disabled = state;
	}
});
});

},
'ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelLine':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine", [dijit._Widget, dijit._Templated], {
	templateString:"<tr role=\"row\" style=\"display: ;\" dojoAttachPoint=\"row\">\n\t<th>\n\t\t<img src=\"../webclient/skins/tivoli09/images/blank.gif\" style=\"display: none\" class=\"tablerow_blank_icon\" title=\"\" alt=\"\">\n\t</th>\n\t<td role=\"gridcell\" control=\"true\" dojoAttachPoint=\"clickable\" onmouseover=\"appendClass(this.parentNode,'trh')\" onmouseout=\"removeClass(this.parentNode,'trh')\" style=\"padding-left: 5px;\" class=\"tc hl cursor_hand\">\n\t\t<table role=\"presentation\" style=\"display: inline;\">\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td nowrap=\"nowrap\" valign=\"top\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t<table role=\"presentation\" control=\"true\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" class=\" \" summary=\"\" style=\"width: 100%; vertical-align: top\">\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr control=\"true\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t\t\t\t<td nowrap=\"nowrap\" align=\"left\" valign=\"top\" style=\"vertical-align: top;\">\n\t\t\t\t\t\t\t\t\t\t<div aria-live=\"polite\" class=\"bc\">\n\t\t\t\t\t\t\t\t\t\t\t<span ctype=\"label\" tabindex=\"0\" \n\t\t\t\t\t\t\t\t\t\t\tclass=\"text txtplain  label  \" \n\t\t\t\t\t\t\t\t\t\t\tstyle=\"cursor: pointer;\"\n\t\t\t\t\t\t\t\t\t\t\ttitle=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"content\"></div>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</td>\n</tr>",	
	domNode:null,
	row: null,
	content: null,
	clickable: null,	
	constructor : function(options) {
		dojo.mixin(this,options);
	},
	postCreate:function(){
		dojo.parser.parse(this.domNode);		
	},	
	setCallbackFunction: function(callback)
	{
		this.clickable.onclick = callback;
	},
	setRowClass: function(newClass)
	{
		dojo.addClass(this.row, newClass);
	},
	setContent: function(content)
	{
		this.content.innerHTML = content;
	}
});
});

},
'ibm/tivoli/fwm/mxmap/MapTipsManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/i18n,dijit/form/Select"], function(dijit,dojo,dojox){
/*
 * IBM Confidential
 * 
 * OCO Source Materials
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.MapTipsManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.i18n");
dojo.require("dijit.form.Select");

/**
 * Implement the logic for loading, parsing and caching Maptips. An mxn marker
 * can be enabled to show maptips. This marker must be associated with a Maximo
 * record so based on the mxdata the maptip can be loaded.
 * 
 * This manager will cache any already loaded maptip (based on objectname/id).
 * The maptip is loaded based on the rest format 'maptip' from the rest
 * interface.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.MapTipsManager", ibm.tivoli.fwm.mxmap._Base, {
	_templateCache: {},
	_menuCache: {},
	maximo: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this._templateCache = {};
		this._menuCache = {};
	},
	/**
	 * It enables the infowindow replacement with the associated maptip
	 * 
	 * @param mapstraction
	 *            marker
	 * @param mxdata
	 *            json object with this structure: { mboName://NAME OF THE
	 *            MAXIMO OBJECT, uid: { name://NAME OF THE COLUMN WITH THE MBO
	 *            UID value: //VALUE THE MBO UID } * }
	 */
	enableMarker: function(marker, mxdata)
	{

		// here is the trick
		// replace the marker's openBubble function by a function that
		// first tries to load the maptip from maximo, set the
		// infoBubble and only then call the original openBubble.
		//
		marker.openBubble.clone = function()
		{
			var that = this;
			var temp = function temporary()
			{
				return that.apply(this, arguments);
			};
			for (key in this)
			{
				temp[key] = this[key];
			}
			return temp;
		};
		var obclone = marker.openBubble.clone();
		var me = this;
		marker.openBubble = function()
		{
			me._handleOpenBubble(marker, mxdata, obclone);
		};
	},
	// checks if a maptip template was already loaded
	_isTemplateLoaded: function(objectname, id)
	{
		return this._templateCache[objectname] && this._templateCache[objectname][id];
	},
	// gets a maptip template
	// * it assumes the template is loaded.
	_getTemplate: function(objectname, id)
	{
		return this._templateCache[objectname][id];
	},
	// after loading the template from the server it
	// updates the cache and trigger the openMapTip
	_onTemplateLoaded: function(html, marker, mxdata, fct)
	{
		var objectname = mxdata.mboName;
		var id = mxdata.uid.value;
		console.log(html);
		this._updateTemplate(objectname, id, html);
		this._openMapTip(objectname, id, marker, fct);
	},
	// update the cache with template data
	_updateTemplate: function(objectname, id, html)
	{
		if (!this._templateCache.hasOwnProperty(objectname))
		{
			this._templateCache[objectname] = {};
		}
		this._templateCache[objectname][id] = html;
	},
	// triggers the mapstraction openbubble method
	// * it assumes the template is loaded.
	_openMapTip: function(objectname, id, marker, fct)
	{
		var html = this._getTemplate(objectname, id);
		var menuData = this._getMenuData(objectname);
		var infoDOM = this._createInfoDOM(html, menuData, objectname, id);
		marker.setInfoBubble(infoDOM);
		fct.apply(marker);
	},
	_createInfoDOM: function(html, menuData, objectName, objectId)
	{
		var outerDiv = dojo.create("div", {
			style: {
				overflow: "auto",
				marginTop: "8px"
			}
		});
		var htmlDiv = dojo.create("div", {
			innerHTML: html
		}, outerDiv);
		if (menuData)
		{
			var menuDiv = dojo.create("div", null, outerDiv);
			this._newSelect(menuData, menuDiv, objectName, objectId);
		}
		return outerDiv;

	},
	// on request to open the marker bubble we try to update the maptip
	// content;
	// fct - is the original open bubble function from mapstraction.
	_handleOpenBubble: function(marker, mxdata, fct)
	{
		var objectname = mxdata.mboName;
		console.log("objectname",objectname);
		var id = mxdata.uid.value;
		// it's important to always load the info on server so we are skipping
		// the cache on the template
		/*
		 * // if the template has already been is loaded, then the menu had been
		 * loaded // before. if (this._isTemplateLoaded(objectname, id)) {
		 * console.info("Cache hit for " + objectname + ":" + id);
		 * this._openMapTip(objectname, id, marker, fct); } // if the template
		 * is not loaded, confirm the menu has already // been loaded for
		 * another // record. // if the menu was not loaded, load it and then
		 * load the // template afterwards. else {
		 */
		if (this._isMenuLoaded(objectname))
		{
			this._loadTemplate(mxdata, marker, fct);
		}
		else
		{
			this._loadMenu(mxdata, marker, fct);
		}
		// }

	},
	_loadMenu: function(mxdata, marker, fct)
	{
		var fctSuccess = dojo.hitch(this, function(data)
		{
			this._onMenuLoaded(data, marker, mxdata, fct);
		});
		var fctError = dojo.hitch(this, function(error)
		{
			this._onMenuLoadError(error, marker, mxdata, fct);
		});
		this.maximo.loadMapTipItems(fctSuccess, fctError);
	},
	_loadTemplate: function(mxdata, marker, fct)
	{

		var fctSuccess = dojo.hitch(this, function(data)
		{
			this._onTemplateLoaded(data, marker, mxdata, fct);
		});
		var fctError = dojo.hitch(this, function(error)
		{
			this._onTemplateLoadError(error, marker, mxdata, fct);
		});
		// must load it.
		this.maximo.loadMapTipTemplate(mxdata, fctSuccess, fctError);

	},
	// on any error we just set the maptip content with the error
	_onTemplateLoadError: function(error, marker, mxdata, fct)
	{
		marker.setInfoBubble("Error loading maptip " + error);
		fct.apply(marker);
	},
	// on any error we just set the maptipmenu content with the error
	_onMenuLoadError: function(error, marker, mxdata, fct)
	{
		marker.setInfoBubble("Error loading maptipmenu " + error);
		fct.apply(marker);
	},
	_onMenuLoaded: function(menusJSON, marker, mxdata, fct)
	{
		for ( var objName in menusJSON)
		{
			var menuItems = menusJSON[objName];
			console.log(objName, menuItems);
			this._updateMenu(objName, menuItems);
		}
		this._loadTemplate(mxdata, marker, fct);
	},
	_updateMenu: function(objectname, menuJSON)
	{
		var moreDetails = ibm.tivoli.fwm.i18n.getMaxMsg("map", "moredetailsaboutrecord");
		var items = [ {
			value: 'noaction',
			label: moreDetails,
			selected: true
		} ];
		for ( var itemMenu in menuJSON)
		{

			var itemInfo = {
				value: menuJSON[itemMenu],
				label: menuJSON[itemMenu].name
			};
			itemInfo.itemData = menuJSON[itemMenu];
			items.push(itemInfo);
		}
		this._menuCache[objectname] = items;
	},
	_isMenuLoaded: function(objectname)
	{
		return this._menuCache[objectname] != null;
	},
	_newSelect: function(menuJSON, div, objectName, objectId)
	{
		console.log(menuJSON);
		var select;
		var fctOnChange = dojo.hitch(this, function(item)
		{
			if ('noaction' != '' + item)
			{
				console.log("dialog", item);
				this.maximo.showMaximoDialog(item.dialogid, objectName, objectId, item.relationship);
				select.reset();
			}
		});
		select = new dijit.form.Select({
			onChange: fctOnChange
		}, div);
		select.addOption(menuJSON);
		select.reset();
		select.startup();

		// Issue 12-12797
		if (navigator.userAgent.indexOf("Android") > -1)
		{
			var mobileHeight = "40px";
			select.domNode.style.height = mobileHeight;
			var openDropDown = select.openDropDown;
			select.openDropDown = function() {
				var items = select.dropDown.getChildren();
				items.forEach(function(item)
				{
					item.domNode.style.height = mobileHeight;
				});
				openDropDown.apply(select, arguments);
			};
		}
	},
	_getMenuData: function(objectName)
	{
		return this._menuCache[objectName];
	},
	destroyRecursive: function()
	{
		this._templateCache = {};
	}
});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/QueryUnassignedWorkDispatcherTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/QueryUnassignedWorkTool,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkDispatcherTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool");
dojo.require("dijit.form.Button");

/**
 * Specialized query unassigned work tool for the Dispatcher view. Bypasses the
 * dialog and calls the control to use the project's query to filter.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkDispatcherTool", ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool, {
		constructor: function(params)
		{
			this.inherited(arguments);
			this.addSubscription(dojo.subscribe("onMapRefresh_"+this.map.getId(), dojo.hitch(this, this._onMapRefresh)));
		},
		executeOn: function(refreshOptions)
		{			
			var bounds = this.map.getMapstraction().getBounds();
			this.map.getMaximo().queryUnassignedWorkDispatcher(bounds, 
					dojo.hitch(this, function(data) {
						this.queryReturned(data, refreshOptions);
					}),
					dojo.hitch(this, this.cancelQuery));
		},
		_onMapRefresh:function(refreshOptions){
			if(this.isActive() == true){
				this.executeOff();
				if (!refreshOptions) {
					refreshOptions = {
							zoom: false,
							disableMsgs: false,
							automatic: false
						};
				}
				this.executeOn(refreshOptions);
			}
		}
});
});

},
'ibm/tivoli/fwm/mxmap/layers/LegendLayer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LegendLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a symbology legend
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Approved",
 *  parentLayer: the layer that is creating this layer,
 * }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.LegendLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			symbol: null,
			minValue: null,
			maxValue: null,
			isDefault: false,
			/**
			 * Sets the right icon (legend marker)
			 */
			init: function()
			{
				this._setRightIconURL();
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			toggleState: function()
			{
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			enable: function()
			{
			},
			/**
			 * Does nothing, the legend layer is just informative
			 */
			disable: function()
			{
			},
			getSymbolURL: function()
			{
				var symbolURL = null;
				if (this.symbol != null){
					symbolURL = this.symbol.url;
				}
				return symbolURL;
			},
			getMinValue: function()
			{
				return this.minValue;
			},
			getMaxValue: function()
			{
				return this.maxValue;
			},
			isDefaultLegend: function()
			{
				return this.isDefault;
			},
			/**
			 * Sets the left icon (nothing)
			 */
			_setLeftIconURL: function()
			{
			},
			/**
			 * Sets the right icon (legend marker)
			 */
			_setRightIconURL: function()
			{
				this._rightIconURL = this.getSymbolURL();
			}
	});
});

},
'ibm/tivoli/fwm/mxmap/impl/MaximoSpatial':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
/**
 * This is the implementation of Map.js for Maximo Spatial maps.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial", ibm.tivoli.fwm.mxmap.Map, {

	constructor: function(options)
	{
		this.providerName = "maximospatial";
		this._alreadyFixedStartingMboZoom = false;

	},
	/**
	 * MaximoSpatial does not support traffic layer
	 */
	allowsTrafficLayer: function()
	{
		return false;
	},
	/**
	 * There may be some spatial specific configurations
	 */
	_getCustomInitOptions: function()
	{
		if (this.customInitialMapOptions)
		{
			return this.customInitialMapOptions.spatial;
		}
		log.info("no custom configuration");
		return {};
	},
	// check if there is a valid configuration
	createMap: function(options)
	{
		if (!options.mapConf.SPATIAL)
		{
			console.error("no spatial conf");
			this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
			this.getMaximo().showMessage("mapcontrol", "nospatialmapconf");

		}
		else
		{
			var spatialConf = options.mapConf.SPATIAL;
			if (spatialConf.bingMaps != true && spatialConf.openStreetMap != true && (spatialConf.mapservices == null || spatialConf.mapservices.length == 0))
			{
				this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
				this.getMaximo().showMessage("plussmap", "no_mapservices_configured");
			}
			else
			{
				this.inherited(arguments);
			}
		}
	},
	/**
	 * Loads the initial options for the mapstraction map creation.<Br>
	 * Returns the route url service, geocode url service, initial extent and
	 * specific spatial conf.
	 */
	_getInitOptions: function()
	{

		var options = {
			route: this.mapConf.route,
			geocode: this.mapConf.geocode,
			initialExtent: this._getInitialLocation(),
			lastUserLocationData: this.userSessionManager.getLastUserLocation(),
			spatial: this.mapConf.SPATIAL,
			isMobile: this.isMobile,
			defaultLenUnit: this.getDefaultLengthUnit()
		};

		return options;
	},

	_getDefaultInitialLocation: function()
	{
		return {};
	},
	/**
	 * Returns the geocode configuration url
	 */
	getGeoCoderConf: function()
	{
		var options = {
			url: this.mapConf.geocode
		};
		return options;
	},
	/**
	 * destroys map implementation
	 */
	destroyMap: function()
	{
		console.log("destroying map!");
		try
		{
			var map = this.getMapstraction();

			if (typeof (map) != 'undefined' && map != null)
			{
				map.destroyMap();
			}
		}
		catch (e)
		{
			console.error("cannot destroy spatial maps", e.message);
		}
		console.log("map was destroyed!");
	},
	/**
	 * Esri maps is compound of several mapservices. Some of them may fail to
	 * load but the map can be used. Code tolerates failures but at the end
	 * shows a message with all mapservices that failed to load.
	 */
	_checkMapLoadedCorrectly: function()
	{
		var _failedLayers = this.getMapstraction().getFailedLayers();
		if (_failedLayers && _failedLayers.length > 0)
		{
			// plussmap,failed_loading_layer
			console.log("_failedLayers", _failedLayers);
			var params = [ _failedLayers[0].name, _failedLayers[0].error.message ];
			// we use the same maximo spatial message.
			this.getMaximo().showMessage("plussmap", "failed_loading_layer", params);
		}
	},
	/**
	 * In order to support Linked records we need to intercept the center on mbo
	 * to not only rely on X/Y but also on Featureclasses.
	 */
	centerOnMbo: function(mboInfo, zoomlevel)
	{
		var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
		if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
		{
			var fct = function(args)
			{
				try
				{
					var point = this._updateMboInfo(mboInfo, args);
					this._centerOnPoint(point, zoomlevel);
				}
				catch (e)
				{
					console.error("No feature found to zoom over!", args, e);
				}
			};
			if (spatialAutolocate == true)
			{
				this._queryMapsServiceForMboGeometry(mboInfo.autolocate, dojo.hitch(this, fct));
			}
			else
			{
				this._queryMapsServiceForMboGeometry(mboInfo, dojo.hitch(this, fct));
			}
		}
		else
		{
			this.inherited(arguments);
		}

	},
	/**
	 * Based on a esri feature this method converts it on a mxn.LatLonPoint
	 * 
	 * @param feature
	 * @returns
	 */
	_getLatLngFromFeature: function(feature)
	{
		if (!feature)
		{
			console.error("feature is empty", feature);
			return null;
		}
		var geometry = feature.geometry;
		var point = feature.geometry;
		if (geometry.type != 'point')
		{
			point = geometry.getExtent().getCenter();
		}
		var lng = point.x;
		var lat = point.y;

		var point = new mxn.LatLonPoint(lat, lng);
		return point;
	},
	/**
	 * Returns the layer info for a mboname/featureclass mapping.
	 * 
	 * @param mboName
	 * @param featureclassName
	 * @returns {Array}
	 */
	_getMboObjectLayers: function(mboName, featureclassName)
	{
		var conf = this.mapConf.SPATIAL;
		var layerInfo = [];
		for ( var i in conf.linkableInfo)
		{
			var service = conf.linkableInfo[i];
			for ( var j in service.layers)
			{
				var layer = service.layers[j];
				if (layer.parent == mboName && layer.child == featureclassName)
				{
					layerInfo.push({
						url: service.url + "/" + layer.layerId,
						layer: layer

					});

				}
			}
		}
		return layerInfo;
	},
	/**
	 * Checks if mbo does not have a x/y but has a feature class (is linked)
	 * 
	 * @param mboInfo
	 * @returns {Boolean}
	 */
	_isBasedOnSpatial: function(mboInfo)
	{
		return (mboInfo && mboInfo.gisdata && mboInfo.gisdata.PLUSSISGIS == true) || (mboInfo && mboInfo.gisdata && mboInfo.gisdata.FROMFC == true);
	},
	/**
	 * Checks if this mbo is autolocated by an entity that has a featureclass
	 * (is linked)
	 * 
	 * @param mboInfo
	 * @returns
	 */
	_isAutolocateBasedOnSpatial: function(mboInfo)
	{
		if (this._isBasedOnSpatial(mboInfo) == false)
		{
			return this._isBasedOnSpatial(mboInfo.autolocate);
		}
		return false;
	},
	/**
	 * Based on a mbo it can retrieve the mxn.LatLngPoint based on a cached
	 * feature. Used by Routing.
	 * 
	 * @param mboInfo
	 * @returns
	 */
	getPointFromMboInfo: function(mboInfo)
	{
		var point = this._getLatLngFromFeature(mboInfo.FC);
		return point;
	},
	/**
	 * When we are able to load the feature classes of a mbo we cache this
	 * information to not have to query the service again next time.
	 * 
	 * @param mboInfo
	 * @param args
	 * @param callback
	 * @returns
	 */
	_updateMboInfo: function(mboInfo, queryResultInfo, callback)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("updatemboinfo", mboInfo, queryResultInfo);
		}
		if (queryResultInfo.features && queryResultInfo.features[0])
		{
			var retFC = queryResultInfo.features[0];
			var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
			if (dojo.config.fwm.debug == true)
			{
				console.log("Success", queryResultInfo);
			}
			if (spatialAutolocate == true)
			{
				mboInfo.autolocate.FC = retFC;
				mboInfo.autolocate.FROMFC = true;
			}
			else
			{
				mboInfo.FC = retFC;
				mboInfo.FROMFC = true;
			}
			var point = this._getLatLngFromFeature(retFC);
			return point;
		}
		else
		{
			console.error("no feature found!", queryResultInfo);
			throw "no feature found!";
		}

	},
	/**
	 * check if this is a SPATIAL feature class mbo that is linked
	 */
	addMboMarker: function(mboInfo, options, layerId)
	{

		var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
		if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
		{
			// add SPATIAL logic to get coordinates.
			var fct = function(queryResultInfo)
			{
				try
				{
					var point = this._updateMboInfo(mboInfo, queryResultInfo);
					this._createMarker(mboInfo, options, point, layerId);
				}
				catch (e)
				{
					console.error("No feature found!", queryResultInfo, e);
				}
			};
			if (spatialAutolocate == true)
			{
				this._queryMapsServiceForMboGeometry(mboInfo.autolocate, dojo.hitch(this, fct));
			}
			else
			{
				this._queryMapsServiceForMboGeometry(mboInfo, dojo.hitch(this, fct));
			}

		}
		else
		{
			this.inherited(arguments);
		}
	},
	_getLayerMappingForMbo: function(mboInfo)
	{
		var layerInfoData = this._getMboObjectLayers(mboInfo.mxdata.mboName, mboInfo.mxdata.attributes.plussfeatureclass);

		if (!layerInfoData || layerInfoData.length == 0)
		{
			// tries with the extendsMboName (in case of views)
			layerInfoData = this._getMboObjectLayers(mboInfo.mxdata.extendsMboName, mboInfo.mxdata.attributes.plussfeatureclass);
			if (!layerInfoData || layerInfoData.length == 0)
			{
				console.error("no layer mapping info for this mbo", mboInfo.mxdata.extendsMboName, mboInfo.mxdata.attributes.plussfeatureclass, mboInfo);
				return;
			}
		}
		if (layerInfoData.length > 1)
		{
			console.warn("more than one layer mapping ", mboInfo.mxdata.mboName, mboInfo.mxdata.attributes.plussfeatureclass, layerInfoData);
		}
		return layerInfoData;
	},
	/**
	 * Based on a mboinfo it queries for its feature class based on the
	 * MaximoSpatial configuration between the Mbo and the feature classe
	 * (gisobject)
	 * 
	 * @param mboInfo
	 * @param callback
	 * @param errCb
	 */
	_queryMapsServiceForMboGeometry: function(mboInfo, callback, errCb)
	{
		// if it's cached
		if (mboInfo.FROMFC == true)
		{
			callback({
				features: [ mboInfo.FC ]
			});
			return;
		}

		// tries first with the mboName
		var layerInfoData = this._getLayerMappingForMbo(mboInfo);
		if (layerInfoData)
		{
			this._getMBOGeometry(layerInfoData, [ mboInfo ], callback, errCb);
		}
		else
		{
			console.error("No layer info");
			if (errCb)
			{
				errCb();
			}
		}

	},
	_checkIfAnyFeaturedClass: function(recs)
	{
		for ( var i in recs)
		{
			var stop = recs[i];
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});

			if (mxrec.hasSPATIALCoordinates() || (mxrec.hasGISCoordinates() == false && mxrec.hasAutolocateSpatialData() == true))
			{
				return true;
			}
		}
	},
	showAllMboRecords: function(records, markerOptions, zoom)
	{
		if (!records || records.length == 0)
		{
			return;
		}
		var callback = function(mboInfoArray, totalErrors)
		{
			console.log("calledback", mboInfoArray, totalErrors);
			for ( var index in records)
			{
				var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: records[index],
					map: this
				});
				if (mxRec.hasAnyGISCoordinates() == true)
				{
					// this.map.addMboToLayerManager(this.mboInfo,
					// markerOptions);
					this.addMboToLayerManager(records[index], markerOptions);
				}
				else
				{
					console.warn("Mbo with no GIS info ", records[index]);
				}
			}
			if (zoom == true)
			{
				this.map.autoCenterAndZoom();
			}
		};
		if (this._checkIfAnyFeaturedClass(records) == true)
		{
			this.queryMultipleRecordsAtOnce(records, dojo.hitch(this, callback), dojo.hitch(this, callback));
		}
		else
		{
			dojo.hitch(this, callback)([]);

		}
	},
	filterRecordsInMapView: function(mboArray, callback, errCb)
	{
		var esriMap = this.map.maps["maximospatial"];
		this.queryMultipleRecordsAtOnce(mboArray, callback, errCb, esriMap.extent);
	},
	queryMultipleRecordsAtOnce: function(mboArray, callback, errCb, onRegionGeometry)
	{

		var queryHash = {};
		var totalUrls = 0;
		for ( var i = 0; i < mboArray.length; i++)
		{
			var mboInfo = mboArray[i];
			var spatialAutolocate = this._isAutolocateBasedOnSpatial(mboInfo);
			if (this._isBasedOnSpatial(mboInfo) == true || spatialAutolocate == true)
			{
				var refMbo = mboInfo;
				if (spatialAutolocate == true)
				{
					refMbo = mboInfo.autolocate;
				}
				console.log("mbo ", mboInfo);
				var layerInfoData = this._getLayerMappingForMbo(refMbo);
				if (!layerInfoData)
				{
					console.error("No layer info");
					if (errCb)
					{
						errCb();
					}
					return;
				}
				for ( var j = 0; j < layerInfoData.length; j++)
				{
					if (queryHash[layerInfoData[j].url] == null)
					{
						totalUrls++;
						queryHash[layerInfoData[j].url] = {
							info: layerInfoData[j],
							refMbos: [],
							mbos: []
						};
					}
					queryHash[layerInfoData[j].url].refMbos.push(refMbo);
					queryHash[layerInfoData[j].url].mbos.push(mboInfo);
				}
			}
		}
		var allInRange = [];
		var totalErrors = [];
		var accumulate = function(url, mbos, error)
		{
			totalUrls--;
			console.log("accumulate", url, mbos, error, totalUrls);
			allInRange = allInRange.concat(mbos);
			totalErrors.push({
				error: error,
				url: url
			});
			if (totalUrls == 0)
			{
				callback(allInRange, totalErrors);
			}
		};
		for ( var layerURL in queryHash)
		{
			this.queryAndCache(layerURL, queryHash, dojo.hitch(this, accumulate), onRegionGeometry);

		}

	},

	queryAndCache: function(layerURL, queryHash, callback, regionGeometry)
	{
		var layerInfoData = queryHash[layerURL].info;
		console.log("URL ", layerURL, layerInfoData);

		var matchFCAttributeNames = layerInfoData.layer.linkableColumns;
		var matchMBOAttributeNames = layerInfoData.layer.mboColumns;
		var queryTask, query;
		queryTask = new esri.tasks.QueryTask(layerURL);
		query = new esri.tasks.Query();
		query.returnGeometry = true;
		if (regionGeometry != null)
		{
			query.geometry = regionGeometry;
		}
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
		query.outFields = [ '*' ];
		query.where = this._createWhereClause(queryHash[layerURL].refMbos, matchFCAttributeNames, matchMBOAttributeNames);

		console.log(query.where);
		var fct = function(args)
		{
			var refMbos = queryHash[layerURL].refMbos;
			console.log("args", args, refMbos, layerURL);
			var aliases = {};
			for ( var ii in matchFCAttributeNames)
			{
				for ( var kk in args.fieldAliases)
				{
					var alias = args.fieldAliases[kk];
					if (alias == matchFCAttributeNames[ii])
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
					else if (kk == matchFCAttributeNames[ii])
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
					else if (kk.search("\." + matchFCAttributeNames[ii]) != -1)
					{
						aliases[matchFCAttributeNames[ii]] = kk;
					}
				}

			}
			var mbos = [];
			for ( var l = 0; l < args.features.length; l++)
			{
				var feature = args.features[l];
				// find mbo

				var mbo = this._getRefMboOfFeature(refMbos, feature.attributes, matchFCAttributeNames, matchMBOAttributeNames, aliases);
				if (!mbo)
				{
					console.log("cannot find the mbo reference for feature", feature);
					console.log("in mbos ", refMbos);
				}
				var whereClause = this._createWhereClause([ mbo ], matchFCAttributeNames, matchMBOAttributeNames);
				console.log("wclause was ", whereClause);
				console.log("for         ", mbo);
				var _arg = {
					features: [ feature ]
				};
				this._updateQueryResultCache(layerURL, whereClause, _arg);
				mbos.push(mbo);
				mbo.FC = feature;
				mbo.FROMFC = true;

			}
			callback(layerURL, mbos);
		};
		var errfct = function(error)
		{
			console.error("Error querying", error);
			callback(layerURL, [], error);
		};
		queryTask.execute(query, dojo.hitch(this, fct), dojo.hitch(this, errfct));
	},

	_getRefMboOfFeature: function(_refMbos, attributes, matchFCAttributeNames, matchMBOAttributeNames, aliases)
	{
		for ( var k = 0; k < _refMbos.length; k++)
		{
			var m = _refMbos[k];
			console.log("mm ", m, aliases);
			var match = false;
			for ( var ii in matchFCAttributeNames)
			{
				var fcAttr = matchFCAttributeNames[ii];
				console.log(matchMBOAttributeNames[ii].toLowerCase());
				console.log(fcAttr, aliases[fcAttr], attributes[aliases[fcAttr]]);
				if (m.mxdata.attributes[matchMBOAttributeNames[ii].toLowerCase()] == attributes[aliases[fcAttr]])
				{
					console.log("found mbo for feature", fcAttr, aliases[fcAttr], matchMBOAttributeNames[ii].toLowerCase(), m.mxdata.attributes[matchMBOAttributeNames[ii].toLowerCase()],
							attributes[aliases[fcAttr]]);
					match = true;
				}
				else
				{
					match = false;
					break;
				}
			}
			if (match == true)
			{
				return m;
			}
		}
	},
	_getMBOGeometry: function(layerInfoData, mboInfoArray, callback, errCb, index)
	{
		if (!index)
		{
			index = 0;
		}
		var layerURL = layerInfoData[index].url;
		var matchFCAttributeNames = layerInfoData[index].layer.linkableColumns;
		var matchMBOAttributeNames = layerInfoData[index].layer.mboColumns;
		var queryTask, query;
		queryTask = new esri.tasks.QueryTask(layerURL);
		query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outFields = []; // no field needed
		query.where = this._createWhereClause(mboInfoArray, matchFCAttributeNames, matchMBOAttributeNames);
		if (dojo.config.fwm.debug == true)
		{
			console.info('getting mbo with query', query.where);
			console.info('On layer ', layerURL);
		}
		var whereClause = query.where;
		if (this._isInCache(layerURL, query.where) == true)
		{
			callback(this._queryCache[layerURL][query.where].results);
			return;
		}

		if (this._hasRequestedAlready(layerURL, query.where) == true)
		{
			this._updateRequestCache(layerURL, query.where, callback, errCb);
			return;
		}
		this._updateRequestCache(layerURL, query.where, callback, errCb);
		var fct = function(args)
		{
			if (!args.features || !args.features[0])
			{
				index++;
				if (index < layerInfoData.length)
				{
					console.log("trying next layer", index);
					this._getMBOGeometry(layerInfoData, mboInfo, callback, errCb, index);
				}
				else
				{
					var err = {
						errormsg: "no feature found for '" + whereClause + "' on " + layerURL,
						details: {
							whereClause: whereClause,
							layerURL: layerURL,
							layerInfoData: layerInfoData
						}
					};
					this._triggerQueryResultError(layerURL, whereClause, args, err);
				}
			}
			else
			{
				this._updateQueryResultCache(layerURL, whereClause, args);

				while (this._queryRequestCache[layerURL][whereClause].reqs.length > 0)
				{
					if (dojo.config.fwm.debug == true)
					{
						console.log("Calling reqs", this._queryRequestCache[layerURL][whereClause].reqs.length);
					}
					var ff = this._queryRequestCache[layerURL][whereClause].reqs.pop();
					ff.success(args);
				}
			}

		};
		var errfct = function(args)
		{
			console.log("Error querying for spatial feature class", args);
			var err = {
				errormsg: "Error querying for spatial feature class"
			};
			this._triggerQueryResultError(layerURL, whereClause, args, err);

		};
		queryTask.execute(query, dojo.hitch(this, fct), dojo.hitch(this, errfct));
	},

	_createWhereClause: function(mboInfoArray, matchFCAttributeNames, matchMBOAttributeNames)
	{
		console.log(mboInfoArray);
		var query = "";
		for ( var j = 0; j < mboInfoArray.length; j++)
		{
			var mboInfo = mboInfoArray[j];
			var queryForOneMbo = "";
			for ( var i = 0; i < matchFCAttributeNames.length; i++)
			{
				var strAdd = '\'';
				var attr = matchFCAttributeNames[i];
				var value = mboInfo.mxdata.attributes[matchMBOAttributeNames[i].toLowerCase()];
				if (isNaN(value))
				{
					value = value.split("'").join("''");
				}

				// Replace single apostrophes for double apostrophes
				if (value.length == 0)
				{
					queryForOneMbo += attr + ' is null AND '; // empty strings
					// from
					// Maximo are null in the database
				}
				else
				{
					if (isNaN(value))
					{
						queryForOneMbo += attr + '=' + strAdd + value + strAdd + ' AND ';
					}
					else
					{
						queryForOneMbo += attr + '=' + value + ' AND ';
					}
				}
			}
			if (queryForOneMbo.length > 0)
			{
				queryForOneMbo = queryForOneMbo.substr(0, queryForOneMbo.length - 5);
				if (query.length > 0)
				{
					query += " OR ";
				}
				query += "(";
				query += queryForOneMbo;
				query += ")";
			}
			else
			{
				console.error("no matching attributes", mboInfo, matchFCAttributeNames, matchMBOAttributeNames);
			}

		}
		return query;
	},
	/**
	 * Checks if we have the results in cache
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @return true if it's in cache
	 */
	_isInCache: function(layerURL, whereClause)
	{
		if (this._queryCache[layerURL])
		{
			if (this._queryCache[layerURL][whereClause])
			{
				if ((this._queryCache[layerURL][whereClause]._timestamp - new Date().getTime()) < this._expiringCache)
				{
					this._queryCache[layerURL][whereClause]._hitTimes++;
					console.log("Cache hit!", this._queryCache[layerURL][whereClause]._hitTimes);
					return true;
				}
				else
				{
					console.info("expiring cahce for " + whereClause);
					this._queryCache[layerURL][whereClause] = null;
				}
			}
		}
		return false;
	},
	/**
	 * Updates the cache for query results
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @param results
	 */
	_updateQueryResultCache: function(layerURL, whereClause, results)
	{
		if (!this._queryCache[layerURL])
		{
			this._queryCache[layerURL] = {};
		}
		this._queryCache[layerURL][whereClause] = {
			results: results,
			_hitTimes: 0,
			_timestamp: new Date().getTime()
		};
	},
	/**
	 * Buffer sequenced requests
	 * 
	 * @param layerURL
	 * @param whereClause
	 * @param callback
	 * @param errCb
	 */
	_hasRequestedAlready: function(layerURL, whereClause)
	{
		if (this._queryRequestCache[layerURL] && this._queryRequestCache[layerURL][whereClause] != null)
		{
			return true;
		}
		return false;
	},
	_updateRequestCache: function(layerURL, whereClause, callback, errCb)
	{
		if (!this._queryRequestCache[layerURL])
		{
			this._queryRequestCache[layerURL] = {};
		}
		if (!this._queryRequestCache[layerURL][whereClause])
		{
			this._queryRequestCache[layerURL][whereClause] = {
				reqs: []
			};
		}
		this._queryRequestCache[layerURL][whereClause].reqs.push({
			success: callback,
			error: errCb
		});
	},
	/**
	 * If any requests where buffered we need to trigger the error callback
	 */
	_triggerQueryResultError: function(layerURL, whereClause, args, err)
	{
		while (this._queryRequestCache[layerURL][whereClause].reqs.length > 0)
		{
			var ff = this._queryRequestCache[layerURL][whereClause].reqs.pop();
			if (ff.error)
			{
				ff.error(err, args);
			}
			else
			{
				console.log(err);
			}
		}
	},
	_queryCache: {},
	_queryRequestCache: {},
	_expiringCache: 30000,
	getInitialLocationCustomInfo: function()
	{
		var esriMap = this.map.maps["maximospatial"];
		return {
			extentData: {
				wkid: esriMap.spatialReference.wkid,
				wkt: esriMap.spatialReference.wkt,
				xmin: esriMap.extent.xmin,
				xmax: esriMap.extent.xmax,
				ymax: esriMap.extent.ymax,
				ymin: esriMap.extent.ymin

			}
		};
	},
	_setDefaultLocation: function(location)
	{
		var esriMap = this.map.maps["maximospatial"];
		if (esriMap.extentInitiallySet != true)
		{
			this.inherited(arguments);
		}
	},
	_resize: function()
	{
		// Spatial API is increasing the map width for some reason,
		// and create scrolling if width=100%. Width will have to be
		// reset to a smaller value.
		if (!this.width)
		{
			w = '99%';
		}
		else
		{
			if (this.width.indexOf('%') > -1)
			{
				var _w = parseInt(this.width.substr(0, this.width.length - 1));
				if (_w > 99)
				{
					this.width = '99%';
				}
			}
		}

		this.inherited(arguments);
	},
	_alreadyFixedStartingMboZoom: null,
	_zoomToCurrentMboRec: function(initialLocation)
	{
		if (this._alreadyFixedStartingMboZoom != true)
		{
			var handler;
			var counter = 0;
			var fct = dojo.hitch(this, function()
			{
				counter++;
				if (this.map.state.updating != true || counter > 100)
				{
					this.currentRecordMgr.centerAndZoom(initialLocation.level);
				}
				else
				{
					setTimeout(fct, 300);
				}
				dojo.unsubscribe(handler);
			});
			var h2;
			var addListener = dojo.hitch(this, function()
			{
				dojo.unsubscribe(h2);
				handler = dojo.subscribe("onESRIReposition", fct);
			});
			h2 = dojo.subscribe(this.events.mapLoaded, addListener);
		}
		this.inherited(arguments);

	}

});
});

},
'dojo/parser':function(){
define(
	"dojo/parser", ["./_base/kernel", "./_base/lang", "./_base/array", "./_base/html", "./_base/window", "./_base/url",
		"./_base/json", "./aspect", "./date/stamp", "./query", "./on", "./ready"],
	function(dojo, dlang, darray, dhtml, dwindow, _Url, djson, aspect, dates, query, don){

// module:
//		dojo/parser
// summary:
//		The Dom/Widget parsing package

new Date("X"); // workaround for #11279, new Date("") == NaN

var features = {
	// Feature detection for when node.attributes only lists the attributes specified in the markup
	// rather than old IE/quirks behavior where it lists every default value too
	"dom-attributes-explicit": document.createElement("div").attributes.length < 40
};
function has(feature){
	return features[feature];
}


dojo.parser = new function(){
	// summary:
	//		The Dom/Widget parsing package

	var _nameMap = {
		// Map from widget name (ex: "dijit.form.Button") to structure mapping
		// lowercase version of attribute names to the version in the widget ex:
		//	{
		//		label: "label",
		//		onclick: "onClick"
		//	}
	};
	function getNameMap(proto){
		// summary:
		//		Returns map from lowercase name to attribute name in class, ex: {onclick: "onClick"}
		var map = {};
		for(var name in proto){
			if(name.charAt(0)=="_"){ continue; }	// skip internal properties
			map[name.toLowerCase()] = name;
		}
		return map;
	}
	// Widgets like BorderContainer add properties to _Widget via dojo.extend().
	// If BorderContainer is loaded after _Widget's parameter list has been cached,
	// we need to refresh that parameter list (for _Widget and all widgets that extend _Widget).
	aspect.after(dlang, "extend", function(){
		_nameMap = {};
	}, true);

	// Map from widget name (ex: "dijit.form.Button") to constructor
	var _ctorMap = {};

	this._functionFromScript = function(script, attrData){
		// summary:
		//		Convert a <script type="dojo/method" args="a, b, c"> ... </script>
		//		into a function
		// script: DOMNode
		//		The <script> DOMNode
		// attrData: String
		//		For HTML5 compliance, searches for attrData + "args" (typically
		//		"data-dojo-args") instead of "args"
		var preamble = "";
		var suffix = "";
		var argsStr = (script.getAttribute(attrData + "args") || script.getAttribute("args"));
		if(argsStr){
			darray.forEach(argsStr.split(/\s*,\s*/), function(part, idx){
				preamble += "var "+part+" = arguments["+idx+"]; ";
			});
		}
		var withStr = script.getAttribute("with");
		if(withStr && withStr.length){
			darray.forEach(withStr.split(/\s*,\s*/), function(part){
				preamble += "with("+part+"){";
				suffix += "}";
			});
		}
		return new Function(preamble+script.innerHTML+suffix);
	};

	this.instantiate = /*====== dojo.parser.instantiate= ======*/function(nodes, mixin, args){
		// summary:
		//		Takes array of nodes, and turns them into class instances and
		//		potentially calls a startup method to allow them to connect with
		//		any children.
		// nodes: Array
		//		Array of nodes or objects like
		//	|		{
		//	|			type: "dijit.form.Button",
		//	|			node: DOMNode,
		//	|			scripts: [ ... ],	// array of <script type="dojo/..."> children of node
		//	|			inherited: { ... }	// settings inherited from ancestors like dir, theme, etc.
		//	|		}
		// mixin: Object?
		//		An object that will be mixed in with each node in the array.
		//		Values in the mixin will override values in the node, if they
		//		exist.
		// args: Object?
		//		An object used to hold kwArgs for instantiation.
		//		See parse.args argument for details.

		var thelist = [],
		mixin = mixin||{};
		args = args||{};

		// Precompute names of special attributes we are looking for
		// TODO: for 2.0 default to data-dojo- regardless of scopeName (or maybe scopeName won't exist in 2.0)
		var dojoType = (args.scope || dojo._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (args.scope || dojo._scopeName) + "-",// typically "data-dojo-"
			dataDojoType = attrData + "type",						// typically "data-dojo-type"
			dataDojoProps = attrData + "props",						// typically "data-dojo-props"
			dataDojoAttachPoint = attrData + "attach-point",
			dataDojoAttachEvent = attrData + "attach-event",
			dataDojoId = attrData + "id";

		// And make hash to quickly check if a given attribute is special, and to map the name to something friendly
		var specialAttrs = {};
		darray.forEach([dataDojoProps, dataDojoType, dojoType, dataDojoId, "jsId", dataDojoAttachPoint,
				dataDojoAttachEvent, "dojoAttachPoint", "dojoAttachEvent", "class", "style"], function(name){
			specialAttrs[name.toLowerCase()] = name.replace(args.scope, "dojo");
		});

		darray.forEach(nodes, function(obj){
			if(!obj){ return; }

			var node = obj.node || obj,
				type = dojoType in mixin ? mixin[dojoType] : obj.node ? obj.type : (node.getAttribute(dataDojoType) || node.getAttribute(dojoType)),
				ctor = _ctorMap[type] || (_ctorMap[type] = dlang.getObject(type)),
				proto = ctor && ctor.prototype;
			if(!ctor){
				throw new Error("Could not load class '" + type);
			}

			// Setup hash to hold parameter settings for this widget.	Start with the parameter
			// settings inherited from ancestors ("dir" and "lang").
			// Inherited setting may later be overridden by explicit settings on node itself.
			var params = {};

			if(args.defaults){
				// settings for the document itself (or whatever subtree is being parsed)
				dlang.mixin(params, args.defaults);
			}
			if(obj.inherited){
				// settings from dir=rtl or lang=... on a node above this node
				dlang.mixin(params, obj.inherited);
			}

			// Get list of attributes explicitly listed in the markup
			var attributes;
			if(has("dom-attributes-explicit")){
				// Standard path to get list of user specified attributes
				attributes = node.attributes;
			}else{
				// Special path for IE, avoid (sometimes >100) bogus entries in node.attributes
				var clone = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false),
					attrs = clone.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g, "").replace(/^\s*<[a-zA-Z0-9]*/, "").replace(/>.*$/, "");

				attributes = darray.map(attrs.split(/\s+/), function(name){
					var lcName = name.toLowerCase();
					return {
						name: name,
						// getAttribute() doesn't work for button.value, returns innerHTML of button.
						// but getAttributeNode().value doesn't work for the form.encType or li.value
						value: (node.nodeName == "LI" && name == "value") || lcName == "enctype" ?
								node.getAttribute(lcName) : node.getAttributeNode(lcName).value,
						specified: true
					};
				});
			}

			// Read in attributes and process them, including data-dojo-props, data-dojo-type,
			// dojoAttachPoint, etc., as well as normal foo=bar attributes.
			var i=0, item;
			while(item = attributes[i++]){
				if(!item || !item.specified){
					continue;
				}

				var name = item.name,
					lcName = name.toLowerCase(),
					value = item.value;

				if(lcName in specialAttrs){
					switch(specialAttrs[lcName]){

					// Data-dojo-props.   Save for later to make sure it overrides direct foo=bar settings
					case "data-dojo-props":
						var extra = value;
						break;

					// data-dojo-id or jsId. TODO: drop jsId in 2.0
					case "data-dojo-id":
					case "jsId":
						var jsname = value;
						break;

					// For the benefit of _Templated
					case "data-dojo-attach-point":
					case "dojoAttachPoint":
						params.dojoAttachPoint = value;
						break;
					case "data-dojo-attach-event":
					case "dojoAttachEvent":
						params.dojoAttachEvent = value;
						break;

					// Special parameter handling needed for IE
					case "class":
						params["class"] = node.className;
						break;
					case "style":
						params["style"] = node.style && node.style.cssText;
						break;
					}
				}else{
					// Normal attribute, ex: value="123"

					// Find attribute in widget corresponding to specified name.
					// May involve case conversion, ex: onclick --> onClick
					if(!(name in proto)){
						var map = (_nameMap[type] || (_nameMap[type] = getNameMap(proto)));
						name = map[lcName] || name;
					}

					// Set params[name] to value, doing type conversion
					if(name in proto){
						switch(typeof proto[name]){
						case "string":
							params[name] = value;
							break;
						case "number":
							params[name] = value.length ? Number(value) : NaN;
							break;
						case "boolean":
							// for checked/disabled value might be "" or "checked".	 interpret as true.
							params[name] = value.toLowerCase() != "false";
							break;
						case "function":
							if(value === "" || value.search(/[^\w\.]+/i) != -1){
								// The user has specified some text for a function like "return x+5"
								params[name] = new Function(value);
							}else{
								// The user has specified the name of a function like "myOnClick"
								// or a single word function "return"
								params[name] = dlang.getObject(value, false) || new Function(value);
							}
							break;
						default:
							var pVal = proto[name];
							params[name] =
								(pVal && "length" in pVal) ? (value ? value.split(/\s*,\s*/) : []) :	// array
									(pVal instanceof Date) ?
										(value == "" ? new Date("") :	// the NaN of dates
										value == "now" ? new Date() :	// current date
										dates.fromISOString(value)) :
								(pVal instanceof dojo._Url) ? (dojo.baseUrl + value) :
								djson.fromJson(value);
						}
					}else{
						params[name] = value;
					}
				}
			}

			// Mix things found in data-dojo-props into the params, overriding any direct settings
			if(extra){
				try{
					extra = djson.fromJson.call(args.propsThis, "{" + extra + "}");
					dlang.mixin(params, extra);
				}catch(e){
					// give the user a pointer to their invalid parameters. FIXME: can we kill this in production?
					throw new Error(e.toString() + " in data-dojo-props='" + extra + "'");
				}
			}

			// Any parameters specified in "mixin" override everything else.
			dlang.mixin(params, mixin);

			var scripts = obj.node ? obj.scripts : (ctor && (ctor._noScript || proto._noScript) ? [] :
						query("> script[type^='dojo/']", node));

			// Process <script type="dojo/*"> script tags
			// <script type="dojo/method" event="foo"> tags are added to params, and passed to
			// the widget on instantiation.
			// <script type="dojo/method"> tags (with no event) are executed after instantiation
			// <script type="dojo/connect" data-dojo-event="foo"> tags are dojo.connected after instantiation
			// <script type="dojo/watch" data-dojo-prop="foo"> tags are dojo.watch after instantiation
			// <script type="dojo/on" data-dojo-event="foo"> tags are dojo.on after instantiation
			// note: dojo/* script tags cannot exist in self closing widgets, like <input />
			var connects = [],	// functions to connect after instantiation
				calls = [],		// functions to call after instantiation
				watch = [],  //functions to watch after instantiation
				on = []; //functions to on after instantiation

			if(scripts){
				for(i=0; i<scripts.length; i++){
					var script = scripts[i];
					node.removeChild(script);
					// FIXME: drop event="" support in 2.0. use data-dojo-event="" instead
					var event = (script.getAttribute(attrData + "event") || script.getAttribute("event")),
						prop = script.getAttribute(attrData + "prop"),
						type = script.getAttribute("type"),
						nf = this._functionFromScript(script, attrData);
					if(event){
						if(type == "dojo/connect"){
							connects.push({event: event, func: nf});
						}else if(type == "dojo/on"){
							on.push({event: event, func: nf});
						}else{
							params[event] = nf;
						}
					}else if(type == "dojo/watch"){
						watch.push({prop: prop, func: nf});
					}else{
						calls.push(nf);
					}
				}
			}

			// create the instance
			var markupFactory = ctor.markupFactory || proto.markupFactory;
			var instance = markupFactory ? markupFactory(params, node, ctor) : new ctor(params, node);
			thelist.push(instance);

			// map it to the JS namespace if that makes sense
			if(jsname){
				dlang.setObject(jsname, instance);
			}

			// process connections and startup functions
			for(i=0; i<connects.length; i++){
				aspect.after(instance, connects[i].event, dojo.hitch(instance, connects[i].func), true);
			}
			for(i=0; i<calls.length; i++){
				calls[i].call(instance);
			}
			for(i=0; i<watch.length; i++){
				instance.watch(watch[i].prop, watch[i].func);
			}
			for(i=0; i<on.length; i++){
				don(instance, on[i].event, on[i].func);
			}
		}, this);

		// Call startup on each top level instance if it makes sense (as for
		// widgets).  Parent widgets will recursively call startup on their
		// (non-top level) children
		if(!mixin._started){
			darray.forEach(thelist, function(instance){
				if( !args.noStart && instance  &&
					dlang.isFunction(instance.startup) &&
					!instance._started
				){
					instance.startup();
				}
			});
		}
		return thelist;
	};

	this.parse = /*====== dojo.parser.parse= ======*/ function(rootNode, args){
		// summary:
		//		Scan the DOM for class instances, and instantiate them.
		//
		// description:
		//		Search specified node (or root node) recursively for class instances,
		//		and instantiate them. Searches for either data-dojo-type="Class" or
		//		dojoType="Class" where "Class" is a a fully qualified class name,
		//		like `dijit.form.Button`
		//
		//		Using `data-dojo-type`:
		//		Attributes using can be mixed into the parameters used to instantiate the
		//		Class by using a `data-dojo-props` attribute on the node being converted.
		//		`data-dojo-props` should be a string attribute to be converted from JSON.
		//
		//		Using `dojoType`:
		//		Attributes are read from the original domNode and converted to appropriate
		//		types by looking up the Class prototype values. This is the default behavior
		//		from Dojo 1.0 to Dojo 1.5. `dojoType` support is deprecated, and will
		//		go away in Dojo 2.0.
		//
		// rootNode: DomNode?
		//		A default starting root node from which to start the parsing. Can be
		//		omitted, defaulting to the entire document. If omitted, the `args`
		//		object can be passed in this place. If the `args` object has a
		//		`rootNode` member, that is used.
		//
		// args: Object
		//		a kwArgs object passed along to instantiate()
		//
		//			* noStart: Boolean?
		//				when set will prevent the parser from calling .startup()
		//				when locating the nodes.
		//			* rootNode: DomNode?
		//				identical to the function's `rootNode` argument, though
		//				allowed to be passed in via this `args object.
		//			* template: Boolean
		//				If true, ignores ContentPane's stopParser flag and parses contents inside of
		//				a ContentPane inside of a template.   This allows dojoAttachPoint on widgets/nodes
		//				nested inside the ContentPane to work.
		//			* inherited: Object
		//				Hash possibly containing dir and lang settings to be applied to
		//				parsed widgets, unless there's another setting on a sub-node that overrides
		//			* scope: String
		//				Root for attribute names to search for.   If scopeName is dojo,
		//				will search for data-dojo-type (or dojoType).   For backwards compatibility
		//				reasons defaults to dojo._scopeName (which is "dojo" except when
		//				multi-version support is used, when it will be something like dojo16, dojo20, etc.)
		//			* propsThis: Object
		//				If specified, "this" referenced from data-dojo-props will refer to propsThis.
		//				Intended for use from the widgets-in-template feature of `dijit._WidgetsInTemplateMixin`
		//
		// example:
		//		Parse all widgets on a page:
		//	|		dojo.parser.parse();
		//
		// example:
		//		Parse all classes within the node with id="foo"
		//	|		dojo.parser.parse(dojo.byId('foo'));
		//
		// example:
		//		Parse all classes in a page, but do not call .startup() on any
		//		child
		//	|		dojo.parser.parse({ noStart: true })
		//
		// example:
		//		Parse all classes in a node, but do not call .startup()
		//	|		dojo.parser.parse(someNode, { noStart:true });
		//	|		// or
		//	|		dojo.parser.parse({ noStart:true, rootNode: someNode });

		// determine the root node based on the passed arguments.
		var root;
		if(!args && rootNode && rootNode.rootNode){
			args = rootNode;
			root = args.rootNode;
		}else{
			root = rootNode;
		}
		root = root ? dhtml.byId(root) : dwindow.body();
		args = args || {};

		var dojoType = (args.scope || dojo._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (args.scope || dojo._scopeName) + "-",	// typically "data-dojo-"
			dataDojoType = attrData + "type",						// typically "data-dojo-type"
			dataDojoTextDir = attrData + "textdir";					// typically "data-dojo-textdir"

		// List of all nodes on page w/dojoType specified
		var list = [];

		// Info on DOMNode currently being processed
		var node = root.firstChild;

		// Info on parent of DOMNode currently being processed
		//	- inherited: dir, lang, and textDir setting of parent, or inherited by parent
		//	- parent: pointer to identical structure for my parent (or null if no parent)
		//	- scripts: if specified, collects <script type="dojo/..."> type nodes from children
		var inherited = args && args.inherited;
		if(!inherited){
			function findAncestorAttr(node, attr){
				return (node.getAttribute && node.getAttribute(attr)) ||
					(node !== dwindow.doc && node !== dwindow.doc.documentElement && node.parentNode ? findAncestorAttr(node.parentNode, attr) : null);
			}
			inherited = {
				dir: findAncestorAttr(root, "dir"),
				lang: findAncestorAttr(root, "lang"),
				textDir: findAncestorAttr(root, dataDojoTextDir)
			};
			for(var key in inherited){
				if(!inherited[key]){ delete inherited[key]; }
			}
		}
		var parent = {
			inherited: inherited
		};

		// For collecting <script type="dojo/..."> type nodes (when null, we don't need to collect)
		var scripts;

		// when true, only look for <script type="dojo/..."> tags, and don't recurse to children
		var scriptsOnly;

		function getEffective(parent){
			// summary:
			//		Get effective dir, lang, textDir settings for specified obj
			//		(matching "parent" object structure above), and do caching.
			//		Take care not to return null entries.
			if(!parent.inherited){
				parent.inherited = {};
				var node = parent.node,
					grandparent = getEffective(parent.parent);
				var inherited  = {
					dir: node.getAttribute("dir") || grandparent.dir,
					lang: node.getAttribute("lang") || grandparent.lang,
					textDir: node.getAttribute(dataDojoTextDir) || grandparent.textDir
				};
				for(var key in inherited){
					if(inherited[key]){
						parent.inherited[key] = inherited[key];
					}
				}
			}
			return parent.inherited;
		}

		// DFS on DOM tree, collecting nodes with data-dojo-type specified.
		while(true){
			if(!node){
				// Finished this level, continue to parent's next sibling
				if(!parent || !parent.node){
					break;
				}
				node = parent.node.nextSibling;
				scripts = parent.scripts;
				scriptsOnly = false;
				parent = parent.parent;
				continue;
			}

			if(node.nodeType != 1){
				// Text or comment node, skip to next sibling
				node = node.nextSibling;
				continue;
			}

			if(scripts && node.nodeName.toLowerCase() == "script"){
				// Save <script type="dojo/..."> for parent, then continue to next sibling
				type = node.getAttribute("type");
				if(type && /^dojo\/\w/i.test(type)){
					scripts.push(node);
				}
				node = node.nextSibling;
				continue;
			}
			if(scriptsOnly){
				node = node.nextSibling;
				continue;
			}

			// Check for data-dojo-type attribute, fallback to backward compatible dojoType
			var type = node.getAttribute(dataDojoType) || node.getAttribute(dojoType);

			// Short circuit for leaf nodes containing nothing [but text]
			var firstChild = node.firstChild;
			if(!type && (!firstChild || (firstChild.nodeType == 3 && !firstChild.nextSibling))){
				node = node.nextSibling;
				continue;
			}

			// Setup data structure to save info on current node for when we return from processing descendant nodes
			var current = {
				node: node,
				scripts: scripts,
				parent: parent
			};

			// If dojoType/data-dojo-type specified, add to output array of nodes to instantiate
			var ctor = type && (_ctorMap[type] || (_ctorMap[type] = dlang.getObject(type))), // note: won't find classes declared via dojo.Declaration
				childScripts = ctor && !ctor.prototype._noScript ? [] : null; // <script> nodes that are parent's children
			if(type){
				list.push({
					"type": type,
					node: node,
					scripts: childScripts,
					inherited: getEffective(current) // dir & lang settings for current node, explicit or inherited
				});
			}

			// Recurse, collecting <script type="dojo/..."> children, and also looking for
			// descendant nodes with dojoType specified (unless the widget has the stopParser flag).
			// When finished with children, go to my next sibling.
			node = firstChild;
			scripts = childScripts;
			scriptsOnly = ctor && ctor.prototype.stopParser && !(args && args.template);
			parent = current;

		}

		// go build the object instances
		var mixin = args && args.template ? {template: true} : null;
		return this.instantiate(list, mixin, args); // Array
	};
}();


//Register the parser callback. It should be the first callback
//after the a11y test.
if(dojo.config.parseOnLoad){
	dojo.ready(100, dojo.parser, "parse");
}

return dojo.parser;
});

},
'url:dijit/form/templates/DropDownButton.html':"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n",
'dijit/form/ToggleButton':function(){
define("dijit/form/ToggleButton", [
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"./Button",
	"./_ToggleButtonMixin"
], function(declare, kernel, Button, _ToggleButtonMixin){

/*=====
	var Button = dijit.form.Button;
	var _ToggleButtonMixin = dijit.form._ToggleButtonMixin;
=====*/

	// module:
	//		dijit/form/ToggleButton
	// summary:
	//		A templated button widget that can be in two states (checked or not).


	return declare("dijit.form.ToggleButton", [Button, _ToggleButtonMixin], {
		// summary:
		//		A templated button widget that can be in two states (checked or not).
		//		Can be base class for things like tabs or checkbox or radio buttons

		baseClass: "dijitToggleButton",

		setChecked: function(/*Boolean*/ checked){
			// summary:
			//		Deprecated.  Use set('checked', true/false) instead.
			kernel.deprecated("setChecked("+checked+") is deprecated. Use set('checked',"+checked+") instead.", "", "2.0");
			this.set('checked', checked);
		}
	});
});

},
'dojo/date/stamp':function(){
define("dojo/date/stamp", ["../_base/kernel", "../_base/lang", "../_base/array"], function(dojo, lang, array) {
	// module:
	//		dojo/date/stamp
	// summary:
	//		TODOC

lang.getObject("date.stamp", true, dojo);

// Methods to convert dates to or from a wire (string) format using well-known conventions

dojo.date.stamp.fromISOString = function(/*String*/formattedString, /*Number?*/defaultTime){
	//	summary:
	//		Returns a Date object given a string formatted according to a subset of the ISO-8601 standard.
	//
	//	description:
	//		Accepts a string formatted according to a profile of ISO8601 as defined by
	//		[RFC3339](http://www.ietf.org/rfc/rfc3339.txt), except that partial input is allowed.
	//		Can also process dates as specified [by the W3C](http://www.w3.org/TR/NOTE-datetime)
	//		The following combinations are valid:
	//
	//			* dates only
	//			|	* yyyy
	//			|	* yyyy-MM
	//			|	* yyyy-MM-dd
	// 			* times only, with an optional time zone appended
	//			|	* THH:mm
	//			|	* THH:mm:ss
	//			|	* THH:mm:ss.SSS
	// 			* and "datetimes" which could be any combination of the above
	//
	//		timezones may be specified as Z (for UTC) or +/- followed by a time expression HH:mm
	//		Assumes the local time zone if not specified.  Does not validate.  Improperly formatted
	//		input may return null.  Arguments which are out of bounds will be handled
	// 		by the Date constructor (e.g. January 32nd typically gets resolved to February 1st)
	//		Only years between 100 and 9999 are supported.
	//
  	//	formattedString:
	//		A string such as 2005-06-30T08:05:00-07:00 or 2005-06-30 or T08:05:00
	//
	//	defaultTime:
	//		Used for defaults for fields omitted in the formattedString.
	//		Uses 1970-01-01T00:00:00.0Z by default.

	if(!dojo.date.stamp._isoRegExp){
		dojo.date.stamp._isoRegExp =
//TODO: could be more restrictive and check for 00-59, etc.
			/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
	}

	var match = dojo.date.stamp._isoRegExp.exec(formattedString),
		result = null;

	if(match){
		match.shift();
		if(match[1]){match[1]--;} // Javascript Date months are 0-based
		if(match[6]){match[6] *= 1000;} // Javascript Date expects fractional seconds as milliseconds

		if(defaultTime){
			// mix in defaultTime.  Relatively expensive, so use || operators for the fast path of defaultTime === 0
			defaultTime = new Date(defaultTime);
			array.forEach(array.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop){
				return defaultTime["get" + prop]();
			}), function(value, index){
				match[index] = match[index] || value;
			});
		}
		result = new Date(match[0]||1970, match[1]||0, match[2]||1, match[3]||0, match[4]||0, match[5]||0, match[6]||0); //TODO: UTC defaults
		if(match[0] < 100){
			result.setFullYear(match[0] || 1970);
		}

		var offset = 0,
			zoneSign = match[7] && match[7].charAt(0);
		if(zoneSign != 'Z'){
			offset = ((match[8] || 0) * 60) + (Number(match[9]) || 0);
			if(zoneSign != '-'){ offset *= -1; }
		}
		if(zoneSign){
			offset -= result.getTimezoneOffset();
		}
		if(offset){
			result.setTime(result.getTime() + offset * 60000);
		}
	}

	return result; // Date or null
};

/*=====
	dojo.date.stamp.__Options = function(){
		//	selector: String
		//		"date" or "time" for partial formatting of the Date object.
		//		Both date and time will be formatted by default.
		//	zulu: Boolean
		//		if true, UTC/GMT is used for a timezone
		//	milliseconds: Boolean
		//		if true, output milliseconds
		this.selector = selector;
		this.zulu = zulu;
		this.milliseconds = milliseconds;
	}
=====*/

dojo.date.stamp.toISOString = function(/*Date*/dateObject, /*dojo.date.stamp.__Options?*/options){
	//	summary:
	//		Format a Date object as a string according a subset of the ISO-8601 standard
	//
	//	description:
	//		When options.selector is omitted, output follows [RFC3339](http://www.ietf.org/rfc/rfc3339.txt)
	//		The local time zone is included as an offset from GMT, except when selector=='time' (time without a date)
	//		Does not check bounds.  Only years between 100 and 9999 are supported.
	//
	//	dateObject:
	//		A Date object

	var _ = function(n){ return (n < 10) ? "0" + n : n; };
	options = options || {};
	var formattedDate = [],
		getter = options.zulu ? "getUTC" : "get",
		date = "";
	if(options.selector != "time"){
		var year = dateObject[getter+"FullYear"]();
		date = ["0000".substr((year+"").length)+year, _(dateObject[getter+"Month"]()+1), _(dateObject[getter+"Date"]())].join('-');
	}
	formattedDate.push(date);
	if(options.selector != "date"){
		var time = [_(dateObject[getter+"Hours"]()), _(dateObject[getter+"Minutes"]()), _(dateObject[getter+"Seconds"]())].join(':');
		var millis = dateObject[getter+"Milliseconds"]();
		if(options.milliseconds){
			time += "."+ (millis < 100 ? "0" : "") + _(millis);
		}
		if(options.zulu){
			time += "Z";
		}else if(options.selector != "time"){
			var timezoneOffset = dateObject.getTimezoneOffset();
			var absOffset = Math.abs(timezoneOffset);
			time += (timezoneOffset > 0 ? "-" : "+") +
				_(Math.floor(absOffset/60)) + ":" + _(absOffset%60);
		}
		formattedDate.push(time);
	}
	return formattedDate.join('T'); // String
};

return dojo.date.stamp;
});

},
'dojo/Stateful':function(){
define("dojo/Stateful", ["./_base/kernel", "./_base/declare", "./_base/lang", "./_base/array"], function(dojo, declare, lang, array) {
	// module:
	//		dojo/Stateful
	// summary:
	//		TODOC

return dojo.declare("dojo.Stateful", null, {
	// summary:
	//		Base class for objects that provide named properties with optional getter/setter
	//		control and the ability to watch for property changes
	// example:
	//	|	var obj = new dojo.Stateful();
	//	|	obj.watch("foo", function(){
	//	|		console.log("foo changed to " + this.get("foo"));
	//	|	});
	//	|	obj.set("foo","bar");
	postscript: function(mixin){
		if(mixin){
			lang.mixin(this, mixin);
		}
	},

	get: function(/*String*/name){
		// summary:
		//		Get a property on a Stateful instance.
		//	name:
		//		The property to get.
		//	returns:
		//		The property value on this Stateful instance.
		// description:
		//		Get a named property on a Stateful object. The property may
		//		potentially be retrieved via a getter method in subclasses. In the base class
		// 		this just retrieves the object's property.
		// 		For example:
		//	|	stateful = new dojo.Stateful({foo: 3});
		//	|	stateful.get("foo") // returns 3
		//	|	stateful.foo // returns 3

		return this[name]; //Any
	},
	set: function(/*String*/name, /*Object*/value){
		// summary:
		//		Set a property on a Stateful instance
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		//	returns:
		//		The function returns this dojo.Stateful instance.
		// description:
		//		Sets named properties on a stateful object and notifies any watchers of
		// 		the property. A programmatic setter may be defined in subclasses.
		// 		For example:
		//	|	stateful = new dojo.Stateful();
		//	|	stateful.watch(function(name, oldValue, value){
		//	|		// this will be called on the set below
		//	|	}
		//	|	stateful.set(foo, 5);
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myObj.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)
		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks){
			this._watchCallbacks(name, oldValue, value);
		}
		return this; //dojo.Stateful
	},
	watch: function(/*String?*/name, /*Function*/callback){
		// summary:
		//		Watches a property for changes
		//	name:
		//		Indicates the property to watch. This is optional (the callback may be the
		// 		only parameter), and if omitted, all the properties will be watched
		// returns:
		//		An object handle for the watch. The unwatch method of this object
		// 		can be used to discontinue watching this property:
		//		|	var watchHandle = obj.watch("foo", callback);
		//		|	watchHandle.unwatch(); // callback won't be called now
		//	callback:
		//		The function to execute when the property changes. This will be called after
		//		the property has been changed. The callback will be called with the |this|
		//		set to the instance, the first argument as the name of the property, the
		// 		second argument as the old value and the third argument as the new value.

		var callbacks = this._watchCallbacks;
		if(!callbacks){
			var self = this;
			callbacks = this._watchCallbacks = function(name, oldValue, value, ignoreCatchall){
				var notify = function(propertyCallbacks){
					if(propertyCallbacks){
                        propertyCallbacks = propertyCallbacks.slice();
						for(var i = 0, l = propertyCallbacks.length; i < l; i++){
							try{
								propertyCallbacks[i].call(self, name, oldValue, value);
							}catch(e){
								console.error(e);
							}
						}
					}
				};
				notify(callbacks['_' + name]);
				if(!ignoreCatchall){
					notify(callbacks["*"]); // the catch-all
				}
			}; // we use a function instead of an object so it will be ignored by JSON conversion
		}
		if(!callback && typeof name === "function"){
			callback = name;
			name = "*";
		}else{
			// prepend with dash to prevent name conflicts with function (like "name" property)
			name = '_' + name;
		}
		var propertyCallbacks = callbacks[name];
		if(typeof propertyCallbacks !== "object"){
			propertyCallbacks = callbacks[name] = [];
		}
		propertyCallbacks.push(callback);
		return {
			unwatch: function(){
				propertyCallbacks.splice(array.indexOf(propertyCallbacks, callback), 1);
			}
		}; //Object
	}

});

});

},
'dijit/form/ComboButton':function(){
require({cache:{
'url:dijit/form/templates/ComboButton.html':"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton", [
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys
	"../focus",		// focus.focus()
	"./DropDownButton",
	"dojo/text!./templates/ComboButton.html"
], function(declare, event, keys, focus, DropDownButton, template){

/*=====
	var DropDownButton = dijit.form.DropDownButton;
=====*/

// module:
//		dijit/form/ComboButton
// summary:
//		A combination button and drop-down button.

return declare("dijit.form.ComboButton", DropDownButton, {
	// summary:
	//		A combination button and drop-down button.
	//		Users can click one side to "press" the button, or click an arrow
	//		icon to display the drop down.
	//
	// example:
	// |	<button data-dojo-type="dijit.form.ComboButton" onClick="...">
	// |		<span>Hello world</span>
	// |		<div data-dojo-type="dijit.Menu">...</div>
	// |	</button>
	//
	// example:
	// |	var button1 = new dijit.form.ComboButton({label: "hello world", onClick: foo, dropDown: "myMenu"});
	// |	dojo.body().appendChild(button1.domNode);
	//

	templateString: template,

	// Map widget attributes to DOMNode attributes.
	_setIdAttr: "",	// override _FormWidgetMixin which puts id on the focusNode
	_setTabIndexAttr: ["focusNode", "titleNode"],
	_setTitleAttr: "titleNode",

	// optionsTitle: String
	//		Text that describes the options menu (accessibility)
	optionsTitle: "",

	baseClass: "dijitComboButton",

	// Set classes like dijitButtonContentsHover or dijitArrowButtonActive depending on
	// mouse action over specified node
	cssStateNodes: {
		"buttonNode": "dijitButtonNode",
		"titleNode": "dijitButtonContents",
		"_popupStateNode": "dijitDownArrowButton"
	},

	_focusedNode: null,

	_onButtonKeyPress: function(/*Event*/ evt){
		// summary:
		//		Handler for right arrow key when focus is on left part of button
		if(evt.charOrCode == keys[this.isLeftToRight() ? "RIGHT_ARROW" : "LEFT_ARROW"]){
			focus.focus(this._popupStateNode);
			event.stop(evt);
		}
	},

	_onArrowKeyPress: function(/*Event*/ evt){
		// summary:
		//		Handler for left arrow key when focus is on right part of button
		if(evt.charOrCode == keys[this.isLeftToRight() ? "LEFT_ARROW" : "RIGHT_ARROW"]){
			focus.focus(this.titleNode);
			event.stop(evt);
		}
	},

	focus: function(/*String*/ position){
		// summary:
		//		Focuses this widget to according to position, if specified,
		//		otherwise on arrow node
		// position:
		//		"start" or "end"
		if(!this.disabled){
			focus.focus(position == "start" ? this.titleNode : this._popupStateNode);
		}
	}
});

});

},
'ibm/tivoli/fwm/mxmap/helpers/MapMarkersRefresher':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojox/timing/_base"], function(dijit,dojo,dojox){
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
dojo.require("dojox.timing._base");

dojo.provide("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher");
/**
 * This class is used to perform the refresh of the markers on the map. The time
 * interval defined in the application designer for the map is informed in
 * seconds. Zero and negative values are ignored and the marker is not started.
 * 
 * To avoid refresh a map and create problems to an eventually user interaction
 * in the moment of the refresh, this class listens to the events
 * <code>startedUserInteractionOnMap</code> and
 * <code>endedUserInteractionOnMap</code>.
 * 
 * Both events, when published, SHOULD pass along the following object: {
 * objectSource: anObject, // json object [optional] objectSourceName:
 * "myObjectName", // string [required] eventName: "userInteractionEvent" //
 * string [required] }
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher", ibm.tivoli.fwm.mxmap._Base, {
	maximo: null,
	interval: 0, // seconds
	_timer: null,
	_signalCounter: 0,
	map: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.addSubscription(dojo.subscribe("startedUserInteractionOnMap_" + this.map.getId(), dojo.hitch(this, this.disableMapRefresh)));
		this.addSubscription(dojo.subscribe("endedUserInteractionOnMap_" + this.map.getId(), dojo.hitch(this, this.checkToEnableMapRefresh)));
		this._signalCounter = 0;
	},
	start: function()
	{
		if (this._timer == null)
		{
			if (this.interval > 0)
			{

				console.log("[MapMarkersRefresher] Starting timer with interval " + this.interval);

				this._doStart();
			}
			else
			{

				console.log("[MapMarkersRefresher] Interal must be greater than zero -- Start ignored.");

			}
		}
		else
		{

			console.log("[MapMarkersRefresher] Timer already started. Ignoring start");

		}
	},
	disableMapRefresh: function(e)
	{

		console.log("[MapMarkersRefresher] Received startedUserInteraction - Refreshed Disabled", e);

		this._signalCounter = this._signalCounter + 1;
	},
	checkToEnableMapRefresh: function(e)
	{

		console.log("[MapMarkersRefresher] Received endedUserInteraction", e);

		this._signalCounter = this._signalCounter - 1;
		// we could receive more events than expecting
		// no reason to not use a counter at the implementation time
		// as it is the responsibility of the map implementation to 'say' when
		// we can refresh or not
		if (this._signalCounter <= 0)
		{
			console.log("[MapMarkersRefresher] Map Refresh Enabled");
			this._signalCounter = 0;
		}
	},
	stop: function()
	{
		if (this._timer == null)
		{
			console.log("[MapMarkersRefresher] Timer not started. Ignoring stop");
		}
		else
		{
			console.log("[MapMarkersRefresher] Stopping timer");
			this._timer.stop();
			this._timer = null;
		}
	},
	_doStart: function()
	{
		var that = this;
		this._timer = new dojox.timing.Timer(this.interval * 1000);
		this._timer.onTick = function()
		{
			if (that._signalCounter == 0)
			{
				console.log("[MapMarkersRefresher] Refreshing markers positions");
				
				that.map.autoRefreshMap();
			}
			else
			{
				console.log("[MapMarkersRefresher] Refresh disabled at this time. Counter: " + that._signalCounter);
			}
		};
		this._timer.onStart = function()
		{
			console.log("[MapMarkersRefresher] Started timer to refresh map markers");
		};
		this._timer.onStop = function()
		{
			console.log("[MapMarkersRefresher] Stopped timer to refresh map markers");
		};
		this._timer.start();
	},
	getMaximo: function()
	{
		return this.maximo;
	},
	destroyRecursive: function()
	{
		this.stop();
		this.inherited(arguments);
	}
});
});

},
'dijit/_base/window':function(){
define("dijit/_base/window", [
	"dojo/window", // windowUtils.get
	".."	// export symbol to dijit
], function(windowUtils, dijit){
	// module:
	//		dijit/_base/window
	// summary:
	//		Back compatibility module, new code should use windowUtils directly instead of using this module.

	dijit.getDocumentWindow = function(doc){
		return windowUtils.get(doc);
	};
});

},
'dijit/PopupMenuItem':function(){
define("dijit/PopupMenuItem", [
	"dojo/_base/declare", // declare
	"dojo/dom-style", // domStyle.set
	"dojo/query", // query
	"dojo/_base/window", // win.body
	"./registry",	// registry.byNode
	"./MenuItem",
	"./hccss"
], function(declare, domStyle, query, win, registry, MenuItem){

/*=====
	var MenuItem = dijit.MenuItem;
=====*/

	// module:
	//		dijit/PopupMenuItem
	// summary:
	//		An item in a Menu that spawn a drop down (usually a drop down menu)

	return declare("dijit.PopupMenuItem", MenuItem, {
		// summary:
		//		An item in a Menu that spawn a drop down (usually a drop down menu)

		_fillContent: function(){
			// summary:
			//		When Menu is declared in markup, this code gets the menu label and
			//		the popup widget from the srcNodeRef.
			// description:
			//		srcNodeRefinnerHTML contains both the menu item text and a popup widget
			//		The first part holds the menu item text and the second part is the popup
			// example:
			// |	<div data-dojo-type="dijit.PopupMenuItem">
			// |		<span>pick me</span>
			// |		<popup> ... </popup>
			// |	</div>
			// tags:
			//		protected

			if(this.srcNodeRef){
				var nodes = query("*", this.srcNodeRef);
				this.inherited(arguments, [nodes[0]]);

				// save pointer to srcNode so we can grab the drop down widget after it's instantiated
				this.dropDownContainer = this.srcNodeRef;
			}
		},

		startup: function(){
			if(this._started){ return; }
			this.inherited(arguments);

			// we didn't copy the dropdown widget from the this.srcNodeRef, so it's in no-man's
			// land now.  move it to win.doc.body.
			if(!this.popup){
				var node = query("[widgetId]", this.dropDownContainer)[0];
				this.popup = registry.byNode(node);
			}
			win.body().appendChild(this.popup.domNode);
			this.popup.startup();

			this.popup.domNode.style.display="none";
			if(this.arrowWrapper){
				domStyle.set(this.arrowWrapper, "visibility", "");
			}
			this.focusNode.setAttribute("aria-haspopup", "true");
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			if(this.popup){
				// Destroy the popup, unless it's already been destroyed.  This can happen because
				// the popup is a direct child of <body> even though it's logically my child.
				if(!this.popup._destroyed){
					this.popup.destroyRecursive(preserveDom);
				}
				delete this.popup;
			}
			this.inherited(arguments);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/dispatcher/DispatcherManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/routing/MultipleRoutesManager,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager");
dojo.require("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
/**
 * Controls the communication between the map,routing and the applet.<br>
 * By default it sets the map symbology to be based on the routes.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	_needsModelRefresh: false,
	applet: null,
	routeCache: null,
	routeManager: null,
	_calculatingRoutes: false,
	_callBuffer: [],
	_totalRequested: 0,
	_totalCompleted: 0,
	travelTimeToSave: [],
	errorCodes: null,
	_updateProjTries: 10,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.map.registerDatasourceRefresh(dojo.hitch(this, this.refreshDS));
		this._executionOptions = {};
		this.routeManager = this.map.routeManager;
		this.addSubscription(dojo.subscribe("onWorkAssigned_" + this.map.getId(), dojo.hitch(this, this.onWorkAssigned)));
		this.routeCache = {};
		this._calculatingRoutes = false;
		this._callBuffer = [];
		this._needsModelRefresh = false;
		this.errorCodes = [];
		this._totalRequested = 0;
		this._totalCompleted = 0;
		this.travelTimeToSave = [];
		this._updateProjTries = 10;

	},
	/**
	 * Set the default symbology to be based on the Route.
	 */
	init: function()
	{
		var workOrderMarkerInfo = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultWorkOrderMarkerImageInfo();
		var resourceLayer = {
			"id": "resource",
			"labelGroup": "map",
			"labelKey": "resourcesymbologylabel",
			"legendTitleGroup": "map",
			"legendTitleKey": "workorderresourcelegendtitle",
			"type": "dynamic",
			"legends": [ {
				"id": "fwm_default",
				"labelGroup": "map",
				"labelKey": "defaultlayerlabel",
				"symbol": {
					"url": workOrderMarkerInfo.getImageURL(),
					"color": "",
					"offsetx": workOrderMarkerInfo.getImageAnchor()[0],
					"offsety": workOrderMarkerInfo.getImageAnchor()[1],
					"width": workOrderMarkerInfo.getImageSize()[0],
					"height": workOrderMarkerInfo.getImageSize()[1]
				},
				"isDefault": true
			} ]
		};
		var layer = this.map.layersManager.getLayerForObjectName("WORKORDER");
		this.routeLayer = layer.createNewChildLayer({
			layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "resourcesymbologylabel"),
			layerId: resourceLayer.id,
			layerConf: resourceLayer,
			map: this.map,
			layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY,
			symbologyType: resourceLayer.type,
			childrenTitle: ""
		});
		this.routeLayer.toggleState();
	},
	clearAllCurrentRoutes: function()
	{
		this.data = {};
		this.routeManager.clearAll();
		this.routeCache = {};
	},
	drawAllRoutes: function(routeData, successCallback, errorCallback)
	{
		this.resetMaximoTimer();
		// TODO find a way tocancel a previous request, like when user clicks
		// twice on the next calendar view page
		// 12-13571 - Since the applet can make more than one multiple route request for a given set of resources,
		// we cannot reset the this.travelTimeToSave buffer inside the _addRoute() method because would erase all
		// travel times from the previous request before sending to Maximo. So we only reset this.travelTimeToSave
		// if this is the first multiple route request from the applet.
		if(this._calculatingRoutes == false)
		{
			this.travelTimeToSave = [];
			// This variable cannot be reset in _addRoute() method as well because errors that might
			// happen in the first applet request will be ignored.
			this.errorCodes = [];
		}
		this._loadedData(routeData);
	},
	/**
	 * If several routing requests were done, we buffer the last one in order to
	 * execute after the other calls
	 */
	_triggerBufferedCalls: function()
	{
		if (this._callBuffer.length > 0)
		{
			console.log("executing buffered calls", this._callBuffer.length);

			this._loadedData(this._callBuffer.pop());
		}
	},
	/**
	 * Creates the routesfor the current Dispatch data. Data comes from the
	 * dispatch applet and contains the assignments per resources for a certain
	 * day.<br>
	 * 
	 * We only buffer the last request, so if a routing request is being handled
	 * and another 2 requests from dispatch are done, only the last one needs to
	 * be executed, improving usability and performance.
	 * 
	 * @param data
	 */
	_loadedData: function(data)
	{
		if (!window.ccc)
		{
			window.ccc = 0;
		}
		data.id = window.ccc++;
		console.info("DISPATCH loaded data", data.id, data);
		if (this._calculatingRoutes == true)
		{
			console.log("BUFFERING IN DISPATCH route being executed buffering call");

			var bufdata = this._callBuffer[0];
			if (bufdata && bufdata.options)
			{
				if (bufdata.options.hasErrCallback == true)
				{
					this._refreshInfo.errorCb();
				}
				else if (bufdata.options.hasCallback == true)
				{
					this._refreshInfo.callback();
				}
			}			
			this._callBuffer[0] = (data);
			// only one is buffered, we only
			// calculate the last requested
			// route
		}
		else
		{
			console.log("executing", data.options);
			var routes = data.allRoutes;
			this._totalRequested = routes.length;
			this.data = data;
			if (this._totalRequested > 0)
			{
				this._startTime = new Date().getTime();
				// This variable cannot be reset here because errors that might happen in the first applet
				// request will be ignored.
				//this.errorCodes = [];
				this._calculatingRoutes = true;
				// simple mutex
				this._needsModelRefresh = false;
				if (dojo.config.fwm.debug == true)
				{
					// console.log("map", this.map);
					// console.log(routes.length, data);
				}

				this._totalCompleted = 0;

				for ( var id in routes)
				{
					var routeInfo = routes[id];
					this._addRoute(id, routeInfo);
				}

			}
			else
			{
				// 12-13612. Sometimes (not sure why) a buffered call runs and the logic flow ends up here
				// because this._totalRequested = 0. When this happens (mostly because the user scrolled
				// the applet from one day do another skipping one day between the two), the zoomAndCenterOverAll() function
				// is not called when the routes are done loading. So I added the logic below (the same as in allSLRRequestsComplete())
				// to guarantee that zoomAndCenterOverAll() runs.
				this.allSLRRequestsComplete();
			}
		}
	},
	/*
	 * DEBUGGGING purposes, would add a stop marker
	 */
	__debugAddStopToMap: function(record)
	{
		var point = new mxn.LatLonPoint(record.lat, record.lng);
		this.map.getMapstraction().addMarker(new mxn.Marker(point));
	},
	/**
	 * Draws a route based on the route info of a resource
	 * 
	 * @param id
	 * @param routeInfo
	 */
	_addRoute: function(id, routeInfo)
	{

		var color = routeInfo.color;
		if (color.substring(0, 1) != '#')
		{
			color = "#" + color;
		}

		var stops = [];
		// 12-13571 - Since the applet can make more than one multiple route request for a given set of resources,
		// we cannot reset the this.travelTimeToSave buffer here because would erase all
		// travel times from the previous request before sending to Maximo. So we only reset this.travelTimeToSave
		// in the first multiple route request from the applet.
		//this.travelTimeToSave = [];
		var cf = this.map.routeConf;
		cf.routecolor = color;
		stops = routeInfo.stops;
		var routeInfoAux = routeInfo;
		if (routeInfo.noroute != true && stops.length > 1)
		{

			var complete = function(route)
			{
				if (this.routeCache[routeInfoAux.resource.id])
				{
					this.routeCache[routeInfoAux.resource.id].clear();
				}
				this.routeCache[routeInfoAux.resource.id] = route;
				this.completeRoute(route, routeInfoAux);

			};
			var error = function(errorCode, msg)
			{
				this._totalCompleted++;
				this.onError(errorCode, routeInfoAux, msg);
				// 12-13610 - We need to try to remove this cached route if the route creation was successful for this resource
				// in a previous day. Otherwise, if the route fails for this day (which is the case here), the old route
				// will not be deleted and may confuse the user.
				if (this.routeCache[routeInfo.resource.id])
				{
					this.routeCache[routeInfo.resource.id].clear();
					this.routeCache[routeInfo.resource.id] = null;
				}
				if (this._totalCompleted == this._totalRequested)
				{
					this.allSLRRequestsComplete();
				}
			};
			this.routeManager.createRoute(stops, cf, dojo.hitch(this, complete), dojo.hitch(this, error), true);
		}
		else
		{
			this._totalCompleted++;
			if (routeInfo.noroute == true)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("no route for this resource", routeInfo);
				}
			}
			else
			{
				this.onError("MIN_STOPS_REQ", routeInfoAux);
			}
			if (this.routeCache[routeInfo.resource.id])
			{
				this.routeCache[routeInfo.resource.id].clear();
				this.routeCache[routeInfo.resource.id] = null;
			}
			if (this._totalCompleted == this._totalRequested)
			{
				this.allSLRRequestsComplete();
			}
		}
	},
	/**
	 * this method is called when a route is completed. It will handle any need
	 * to save the travel time.
	 * 
	 * @param route
	 * @param routeInfo
	 */
	completeRoute: function(route, routeInfo)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("route", route);
			console.log("routeInfo", routeInfo);
		}
		this._totalCompleted++;
		for ( var j in routeInfo.stops)
		{
			var item = routeInfo.stops[j];

			if (j > 0)
			{
				var legInfo = route.itinerary.legs[j - 1];

				var routedata = item.routedata;
				if (routedata == null)
				{
					console.error("Assignment ", item, " with no route data info");
					continue;
				}
				if (routedata.HASTRAVELTIME == false)
				{

					if (legInfo)
					{
						var totalSecondsToStop = this.convertDurationToSeconds(legInfo.durationToLeg);
						if (totalSecondsToStop)
						{

							var slrTravelData = {
								ASSIGNMENTID: routedata.ASSIGNMENTID,
								SLROUTEID: routedata.SLROUTEID,
								FROMLOCATIONSID: routedata.FROMLOCATIONSID,
								TOLOCATIONSID: routedata.TOLOCATIONSID,
								FROMASSIGNMENT: routedata.FROMASSIGNMENT,
								TRAVELTIME_SECS: totalSecondsToStop
							};

							this.travelTimeToSave.push(slrTravelData);
							this._needsModelRefresh = true;
						}
					}
				}
			}

		}

		console.log(this._totalCompleted, "/", this._totalRequested, "routes created");

		if (this._totalCompleted == this._totalRequested)
		{
			this.allSLRRequestsComplete();
		}
	},
	/**
	 * Simple conversion from duration double to seconds
	 * 
	 * @param duration
	 * @returns
	 */
	convertDurationToSeconds: function(/* in minutes */duration)
	{
		return Math.round(duration * 60);
	},
	/**
	 * On a failure of creating a route we buffer it and only display after all
	 * routes are drawn. We buffer the error, the route info and any message
	 * from the routing service.
	 * 
	 * @param errorCode
	 * @param routeInfo
	 * @param msg
	 */
	onError: function(errorCode, routeInfo, msg)
	{
		console.warn("Failed to draw route", errorCode);
		this.errorCodes.push({
			errorInfo: {
				code: errorCode,
				msg: msg
			},
			routeInfo: routeInfo
		});

	},
	/**
	 * If any traveltime needs to be saved, this is executed and saves ALL the
	 * traveltime calculated in this routing execution
	 */
	_saveBulkOfSLRTravelTime: function()
	{
		var success = function(result)
		{
			console.log("result", result);
			this._handleServerData(result, "onSLRTravelTimeUpdated");
		};
		var myEvent = new Event("SAVEBULKTRAVELTIME", 'mapdispatcher-mxdispatcherctrl', this.travelTimeToSave, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, success), dojo.hitch(this, this.genericError));
	},
	/**
	 * @deprecated use _saveBulkOfSLRTravelTime
	 * @param slrTravel
	 */
	_saveSLRTravelTime: function(slrTravel)
	{
		var success = function(data)
		{
			console.log("Saved SLRTravel Time ", data, slrTravel);

		};
		var myEvent = new Event("SAVETRAVELTIME", 'mapdispatcher-mxdispatcherctrl', slrTravel, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", success, this.genericError);
	},
	/**
	 * This is a method to wrap up the applet calls to the server.
	 * 
	 * @param p
	 * @param appletCallbackFunction
	 * @param appletErrorCallback
	 */
	sendActionToServer: function(p, appletCallbackFunction, appletErrorCallback)
	{
		var beanMethodName = p.servermethod;
		var params = p.serverparams;
		if (dojo.config.fwm.debug == true)
		{
			console.log("sendActionToServer", beanMethodName, params, appletCallbackFunction);
		}
		var callback = function(data)
		{
			this._handleServerData(data, appletCallbackFunction, appletErrorCallback);

		};

		var myEvent = new Event(beanMethodName, 'mapdispatcher-mxdispatcherctrl', params, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, callback), dojo.hitch(this, callback));
	},

	/**
	 * When all routes are completed for a certain dispatch request this method
	 * handles the results.<br>
	 * If there are buffered calls just skip the final methods and go on with
	 * the routing calculation of the buffered scripts.
	 */
	allSLRRequestsComplete: function()
	{

		this._calculatingRoutes = false;
		console.log("completed ", this.data.id, this.data.options);
		if (this._callBuffer.length > 0)
		{
			this.handleExecutionFinished();
			this._triggerBufferedCalls();
		}
		else
		{
			if (!this.data.options || this.data.options.noZoom != true)
			{
				this.routeManager.zoomAndCenterOverAll();
			}

			var _endTime = new Date().getTime();
			console.info("Total for all routes b4 saving travel time: ", (_endTime - this._startTime), "ms");
			if (this.travelTimeToSave != null && this.travelTimeToSave.length > 0)
			{
				this._saveBulkOfSLRTravelTime();
			}

			if (this.map)
			{
				if (this.errorCodes != null && this.errorCodes.length > 0)
				{
					var returnedFct = function(data)
					{
						this.triggerMsgs();
						this.handleExecutionFinished();
					};

					var myEvent = new Event("SHOWMULTIPLEROUTEERRORS", 'mapdispatcher-mxdispatcherctrl', this.errorCodes, REQUESTTYPE_HIGHASYNC);
					queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, returnedFct), dojo.hitch(this, returnedFct));

				}
				else
				{
					this.handleExecutionFinished();

				}
			}
		}

	},
	handleExecutionFinished: function()
	{
		if (this.data.options && this.data.options.hasCallback == true)
		{
			this._refreshInfo.callback(this.routeManager);
		}
	},
	/**
	 * This is to force maximo to show messages on any error
	 * 
	 * @param error
	 */
	genericError: function(error)
	{
		this._calculatingRoutes = false;
		this.triggerMsgs();
		console.error("Error ", error);
	},
	/**
	 * All data returned from server is handled by this method that can trigger
	 * other messages or just call the success function back
	 */
	_handleServerData: function(data, callback, errCallback)
	{
		if (data && data.result == 'failed')
		{
			console.warn("there was an error on server", data);
			if (data.mxerror == true)
			{
				this.triggerMsgs();
			}
			if (errCallback)
			{
				this.getApplet().jsCallback(errCallback, dojo.toJson(data));
			}
		}
		else
		{
			this.getApplet().jsCallback(callback, dojo.toJson(data));
		}
	},
	/**
	 * Update several asignments at once
	 */
	bulkAssignmentsUpdates: function(arrayOfAssignments)
	{
		var success = function(data)
		{
			this._handleServerData(data, "onBulkAssignments");
			// this.getApplet().jsCallback("onBulkAssignments",
			// dojo.toJson(data));
		};

		var myEvent = new Event("UPDATEASSIGNMENTS", 'mapdispatcher-mxdispatcherctrl', arrayOfAssignments, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, success), dojo.hitch(this, this.genericError));
		this.resetMaximoTimer();
	},
	/**
	 * On SKDProject updates it is called to reload the projects data.
	 * 
	 * @param projId
	 */
	updateProject: function(projId)
	{
		console.log("Project changed");
		if (!this.getApplet())
		{
			this._updateProjTries--;
			if (this._updateProjTries <= 0)
			{
				this._updateProjTries = 10;
				console.error("Can't find the applet or it's not loaded!");
			}
			else
			{
				var fct = function()
				{
					this.updateProject(projId);
				};
				setTimeout(dojo.hitch(this, fct), 1000);
			}
		}
		this._updateProjTries = 10;
		this.getApplet().updateProjId(projId);
		this.resetMaximoTimer();
	},
	/**
	 * Due the high async calls, we need to force maximo to trigger its actions
	 * thru sync calls to trigger messages and actions
	 */
	triggerMsgs: function()
	{
		sendEvent("TRIGGERMSGS", 'mapdispatcher-mxdispatcherctrl');
		this.resetMaximoTimer();
	},
	/**
	 * Applets reference gets lost when changing tabs or re loading it. So this
	 * method tries "hard" to get its reference
	 * 
	 * @returns
	 */
	getApplet: function()
	{
		try
		{

			this.applet.isLoaded();
			return this.applet;
		}
		catch (e)
		{
			console.log("trying to refecth the applet with dojo.byId ", dojo.byId("CalendarViewId"), e);
			this.applet = dojo.byId("CalendarViewId");
			try
			{
				this.applet.isLoaded();
				return this.applet;
			}
			catch (e2)
			{
				console.log("trying to refecth the applet with window.CalendarViewId", window.CalendarViewId, e2);
				this.applet = window.CalendarViewId;
				try
				{
					this.applet.isLoaded();
					return this.applet;
				}
				catch (e3)
				{
					console.warn("can't find applet to start communication", e3);
				}
			}
		}
	},
	/**
	 * Forces the applet to get refreshed
	 */
	refresh: function()
	{

		this.getApplet().updateModel();

	},
	_refreshInfo: null,
	refreshDS: function(callback, errorCallback, noZoom)
	{
		console.log("calling updateModel");
		// dangerous... but that's what i can do now Ideally we should pass it
		// to the applet
		this._refreshInfo = {
			callback: callback,
			errorCb: errorCallback
		};
		var _executionOptions = {
			noZoom: noZoom,
			refreshMap: true,
			hasCallback: false,
			hasErrCallback: false
		};
		if (callback)
		{
			_executionOptions.hasCallback = true;
		}
		if (callback)
		{
			_executionOptions.hasErrCallback = true;
		}
		this.getApplet().updateModelWithOptions(dojo.toJson(_executionOptions));
		console.log("done");
	},
	/**
	 * If any work order gets assigned we need to update the applets data.
	 */
	onWorkAssigned: function()
	{
		// need to refresh the model to load the assignmenton the applet.
		this.getApplet().updateModel();

	},
	/**
	 * On any action we must reset maximo timer.
	 */
	resetMaximoTimer: function()
	{
		resetLogoutTimer(false);
	}

});
});

},
'dijit/form/RadioButton':function(){
define("dijit/form/RadioButton", [
	"dojo/_base/declare", // declare
	"./CheckBox",
	"./_RadioButtonMixin"
], function(declare, CheckBox, _RadioButtonMixin){

/*=====
	var CheckBox = dijit.form.CheckBox;
	var _RadioButtonMixin = dijit.form._RadioButtonMixin;
=====*/

	// module:
	//		dijit/form/RadioButton
	// summary:
	//		Radio button widget

	return declare("dijit.form.RadioButton", [CheckBox, _RadioButtonMixin], {
		// summary:
		// 		Same as an HTML radio, but with fancy styling.

		baseClass: "dijitRadio"
	});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/MobileInfoPanel':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/form/Button,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.MobileInfoPanel");

dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");

/**
 * Mobile Info Panel tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.MobileInfoPanel", ibm.tivoli.fwm.mxmap._Base, {
		label: "Info Panel",
		iconClass: "basicMapToolbarBtn",
		map: null,
		_dialog: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this._dialog = null;	
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "infopanel");
			this.label = _label || this.label;
		},
		createToolbarButton: function()
		{
			var button = new dijit.form.Button( {
				label: this.label,
				showLabel: true,
				iconClass: this.iconClass,
				onClick: dojo.hitch(this, function()
				{
					this.execute();
				})
			});
			return button;
		},
		execute: function()
		{
			if (this._dialog)
			{
				this._dialog.close();
				this._dialog = null;
			}	
			var me = this;
			this._dialog = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({map: me.map});
			this._dialog.show();
		},
		disable: function()
		{
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
});
});

},
'dijit/main':function(){
define("dijit/main", [
	"dojo/_base/kernel"
], function(dojo){
	// module:
	//		dijit
	// summary:
	//		The dijit package main module

	return dojo.dijit;
});

},
'ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Provides access to current location data.<br>
 */

ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus = {
	UNASSIGNED: -1,
	HAS_LOCATION: 0,
	PERMISSION_DENIED: 1,
	POSITION_UNAVAILABLE: 2,
	GEOLOCATION_NOT_SUPPORTED: 4,
	TIMEOUT: 3
};

ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance = null;
/**
 * This implements the control of monitoring user current location. It always
 * uses the watchposition method. It demanded a small tweak for Firefox because
 * mozilla ALWAYS throws a timeout error after the timeout has been achieved
 * EVEN if a location was found before the timeout and stops watching the
 * location.
 * 
 * We have opened an issue for mozilla:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=732923
 * 
 * In order to avoid this, when we are in firefox we set a high timeout (10
 * minutes) so during 10 minutes FF keeps monitoring correctly the user
 * location. If the 10 minutes is achieved but we had a location found during
 * the timeout period, we just restart the watch position again. On the first
 * time though, we need to timeout after the regular timeout period. So we force
 * a check after the regular timeout to see if firefox has found a location. If
 * not we trigger the regular error, else we just keep monitoring.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation", ibm.tivoli.fwm.mxmap._Base, {
	_userLocation: null,
	_userLocationStatus: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.UNASSIGNED,
	// Time to wait for a response from the geolocation API
	_timeout: 5000,
	_watchPositionId: null,
	_waitingForTimeout: false,
	_callbackArray: null,
	_listenerArray: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		console.log("MyCurrentLocation created at ", new Date());
		this._callbackArray = [];
		this._listenerArray = [];
		this._h = 0;

		if (dojo.isMozilla)
		{
			console.log("Firefox");
			this._oldTimeout = this._timeout;
			this._timeout = 10 * 60000;
		}

	},
	/**
	 * Retrieves the current position data
	 */
	getPosition: function()
	{
		return this._userLocation;
	},
	/**
	 * Retrieves the current status (or error code)
	 */
	getStatus: function()
	{
		return this._userLocationStatus;
	},
	/**
	 * callback response for current user location
	 * 
	 * @param position
	 * @param callback
	 */
	_lastLocationTimestamp: 0,
	gotUserLocation: function(position)
	{
		this._userLocation = position;
		this._userLocationStatus = ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.HAS_LOCATION;
		this._lastLocationTimestamp = new Date().getTime();

		if (this._listenerArray)
		{
			for ( var handler in this._listenerArray)
			{
				var fct = this._listenerArray[handler];
				fct.success(position);
			}

		}
		if (this._callbackArray)
		{
			while (this._callbackArray.length > 0)
			{
				var fctErr = this._callbackArray.pop();
				fctErr.success(position);
			}
		}

		this._callbackArray = [];

	},
	/**
	 * If we failed to retrieve user location. The possible errors are:<br>
	 * code 1 - Permission denied, user did not allow to share his location<br>
	 * code 2 - Position unavailable, the position of the device could not be
	 * determined<br>
	 * code 3 - Timeout, device took too long (longer than the timeout
	 * specified) to return current location<br>
	 * code 4 - Geolocation not supported, this device does not support
	 * geolocation, this is a custom error code<br>
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html#permission_denied_error
	 * @param error:
	 *            {code,message}
	 * @param callback
	 *            error function
	 */
	failedToGetLocation: function(error)
	{
		console.warn("Error finding user location", error);
		this._userLocationStatus = error.code;
		if (this._listenerArray)
		{
			for ( var handler in this._listenerArray)
			{

				var fct = this._listenerArray[handler];
				fct.failure(error);
			}

		}
		// Execute all buffered error callbacks
		if (this._callbackArray)
		{
			while (this._callbackArray.length > 0)
			{
				var fctErr = this._callbackArray.pop();
				fctErr.failure(error);
			}
		}

		this._callbackArray = [];
	},
	_isWaitingForTimeout: function()
	{
		var now = new Date();
		if (now.getTime() < (this._lastGetLocCall + this._timeout))
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	_lastGetLocCall: 0,
	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4. If watchPosition is enabled, just return the
	 * last location.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 * @param callback
	 * @param errorCb
	 */
	getUserLocation: function(callback, errorCb)
	{
		if (this._watchPositionId != null && this.isStatusHasLocation())

		{
			// If Watch Position is enabled, return the current position, if it
			// exists
			// If it does not exist, it means that the watchPosition API was
			// unable to retrieve it
			callback(this._userLocation);
		}
		else
		{
			this._callbackArray.push({
				success: callback,
				failure: errorCb
			});
			this.watchUserLocation();
		}
	},
	/**
	 * Adds the success and error callback functions to a buffer and returns
	 * a handler so these callback functions can be removed later when
	 * the tool is no longer in used by the caller
	 * 
	 * @param callback
	 * @param errorCb
	 */
	// 12-13674. We need to create the listener prior to calling watchUserLocation on myCurrentLocationInstance
	// because some errors may happen synchronously. When an error happens during the listenToUserLocation() call,
	// the error callback is executed before the handler is returned, so the myCurrentLocationInstance.removeListeners
	// tries to remove the listener using a handler that does not exist yet.
	_h: null,
	createListener: function(callback, errorCb)
	{
		this._h++;
		var h = this._h;
		this._listenerArray[h] = {
			success: callback,
			failure: errorCb
		};
		return h;
	},

	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4. Once active, the callback function will fire
	 * whenever a location change is noticed by the browser.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 */
	listenToUserLocation: function(handler)
	{
		if(this._listenerArray[handler] != null)
		{
			this.watchUserLocation();
		}
		else
		{
			console.warn("No listener for handler ", handler);
		}
	},
	removeListeners: function(handler)
	{
		if(handler != null)
		{
			this._listenerArray[handler] = null;
			delete this._listenerArray[handler];
		}
	},
	watchUserLocation: function()
	{

		if (navigator.geolocation)
		{
			if (this._watchPositionId == null)
			{

				var fctSuccess = function(position)
				{
					console.log("got location", position);
					this.gotUserLocation(position);
					if (this._mozzilaTS)
					{
						clearTimeout(this._mozzilaTS);
					}
				};
				var fctErr = function(error)
				{
					this.clearWatchUserLocation();
					if (error.code == error.TIMEOUT && dojo.isMozilla && this.isStatusHasLocation() == true)
					{
						console.log("last timestamp", this._lastLocationTimestamp);
						var now = new Date();
						var elapsedTime = (now.getTime() - this._requestTimestamp.getTime());
						if (elapsedTime < (this._timeout + 5000) || elapsedTime > (this._timeout - 5000))
						{
							// probabily due mozilla accurate implementation
							console.log("skipping first timeout error due mozilla accurate implementation");
							
							this.watchUserLocation();
							return;
						}
					}					
					this.failedToGetLocation(error);
				};
				this._requestTimestamp = new Date();

				this._watchPositionId = navigator.geolocation.watchPosition(dojo.hitch(this, fctSuccess), dojo.hitch(this, fctErr), {
					timeout: this._timeout
				});
				if (dojo.isMozilla)
				{// we need to manually add the timeout for the first time.
					// Due firefox issue
					if (this.isStatusUnassigned() == true)
					{
						var ffMozilla = dojo.hitch(this, function()
						{
							console.log("first try in Mozilla to get location");
							this.clearWatchUserLocation();
							var error = {
								TIMEOUT: true,
								code: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT,
								message: "Browser FF timeout"
							};
							this.clearWatchUserLocation();
							this.failedToGetLocation(error);
						});
						this._mozzilaTS = setTimeout(ffMozilla, this._oldTimeout);
					}
				}
			}
			else
			{
				console.warn("Watch Position is already enabled");
				if (this.isStatusHasLocation() == true)
				{// show last postion
					this.gotUserLocation(this._userLocation);
				}
				else
				{
					if (this.isStatusUnassigned() != true)
					{
						var error = {
							code: this.getStatus(),
							message: "Failed"
						};
						this.clearWatchUserLocation();
						this.failedToGetLocation(error);
					}
				}
			}
		}
		else
		{
			console.warn("no geolocation support");
			this._userLocationStatus = ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED;
			var error = {
				code: ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED,
				message: "Browser does not support geolocation"
			};			
			this.failedToGetLocation(error);
		}

	},
	/**
	 * Disables the watchPosition and sets _watchPositionId to null
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 */

	clearWatchUserLocation: function()
	{
		if (this._watchPositionId != null)
		{
			if (navigator.geolocation)
			{
				navigator.geolocation.clearWatch(this._watchPositionId);
				this._watchPositionId = null;
			}
		}
		else
		{
			console.log("Watch Position is already disabled.");
		}
	},

	/**
	 * Returns true if _userLocationStatus = UNASSIGNED
	 */
	isStatusUnassigned: function()
	{
		return this.isStatusEqual(ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.UNASSIGNED);
	},
	/**
	 * Returns true if _userLocationStatus = HAS_LOCATION
	 */
	isStatusHasLocation: function()
	{
		return this.isStatusEqual(ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.HAS_LOCATION);
	},
	/**
	 * Returns true if _userLocationStatus = locStatus
	 */
	isStatusEqual: function(locStatus)
	{
		return (this._userLocationStatus == locStatus);
	},
	convertPositionToMapPoint: function(map, callback, errorCb)
	{
		var position = this.getPosition();
		var latLng = new mxn.LatLonPoint(position.coords.latitude, position.coords.longitude);
		map.getMapstraction().getAllPointsFromWGS84([ latLng ], dojo.hitch(this, function(points)
		{
			callback(points[0]);
		}));
	}
});

/**
 * Retrieves the MyCurrentLocation singleton instance
 */
ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance = function()
{
	if (!ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance)
	{
		ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance = new ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation();
	}
	return ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation._instance;
};
});

},
'ibm/tivoli/fwm/mxmap/layers/SymbologyLayer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a map symbology
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Status",
 *  parentLayer: the layer that is creating this layer,
 * }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			symbologyType: null,
			/**
			 * Enables this symbology layer, executes the action that configures the markers for this symbology
			 * and disables all the other sibling symbologies
			 */
			toggleState: function()
			{
				var siblings = this.getSiblings();
				dojo.forEach(siblings, function(sibling){
					sibling.disable();
				});
				this.enable();
			},
			/**
			 * Enables this layer and configures the markers for the records according 
			 * to the legends (children of this symbology)
			 */
			enable: function()
			{
				var layerId = this.getParentLayer().getLayerId();
				this._map.getSymbologyManager().setActiveSymbology(layerId, this.layerConf);

				this.inherited(arguments);
				
				this._map.getLayersManager().redrawMarkers();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
			}
		});
});

},
'ibm/tivoli/fwm/mxmap/ImageLibraryManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/MarkerImageInfo"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

dojo.provide("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.MarkerImageInfo");

ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance = null;

dojo.declare("ibm.tivoli.fwm.mxmap.ImageLibraryManager", null, {
	_infoCache: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._loadCache();
	},
	getMarkerImageInfoForObject: function(objectName) {
		
		var result = objectName ? this._infoCache[objectName.toUpperCase()] : null;
		if(!result)
		{
			console.warn("[ImageLibraryManager] No marker image found for object " + objectName);
			console.warn("[ImageLibraryManager] returning default one");
			return this.getDefaultMarkerImageInfo();
		}
		return result;
	},
	getLBSMarkerImageInfo: function(lbsData) {
		if (lbsData)
		{
			if ("EXCEEDED_TOLERANCE" === lbsData.max_accuracy_state)
			{
				return this.getMarkerImageInfoForObject("__LBS_EXCEEDED_ACCURACY");
			}
			else if ("EXCEEDED_TOLERANCE" === lbsData.last_update_condition_state)
			{
				return this.getMarkerImageInfoForObject("__LBS_EXCEEDED_UPDATE_COND");
			}
			else
			{
				return this.getMarkerImageInfoForObject("__LBS_INSIDE_TOLERANCE");
			}
		}
		console.warn("no lbs data!");
		return null;
	},
	getDefaultMarkerImageInfo: function() {
		return this._infoCache["__DEFAULT_MARKER"];
	},
	getStartPositionMarkerImageInfo: function() {
		return this._infoCache["__START_POSITION_MARKER"];
	},
	getEndPositionMarkerImageInfo: function() {
		return this._infoCache["__END_POSITION_MARKER"];
	},
	getLayerOnImageInfo: function() {
		return this._infoCache["__LAYER_ON"];
	},
	getLayerOffImageInfo: function() {
		return this._infoCache["__LAYER_OFF"];
	},
	getLayerDetailsImageInfo: function() {
		return this._infoCache["__LAYER_DETAILS"];
	},
	getLayerDetailsOffImageInfo: function() {
		return this._infoCache["__LAYER_DETAILS_OFF"];
	},
	getDefaultReadOnlyMarkerImageInfo: function() {
		return this._infoCache["__DEFAULT_RO_MARKER"];
	},
	getMyLocationMarkerImageInfo: function() {
		return this._infoCache["__MY_LOCATION"];
	},
	getDefaultWorkOrderMarkerImageInfo: function() {
		return this._infoCache["WORKORDER"];
	},
	getResourcesPath: function() {
		return dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "resources");
	},
	// temporary to accommodate the custom marker
	// we should have something to allow users to override
	// the images
	updateDefaultMarkerImageURL: function(newURL)
	{
		this.getDefaultMarkerImageInfo().setImageURL(newURL);
	},
	_loadCache: function()
	{	
		var rtlDir = "";
		if(document.body.dir == "rtl")
		{
			rtlDir = "/rtl";
		}

		this._infoCache = {};
		this._infoCache["LABOR"] = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/labor/map_locationLabor.png", imageSize: [47,36], imageAnchor:[24,41]}); 
		this._infoCache["AMCREW"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/crew/map_locationCrew.png", imageSize: [47,36], imageAnchor:[24,41]});
		this._infoCache["WORKORDER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/workorder/map_WO_default.png", imageSize: [47,36], imageAnchor:[24,36]});
		this._infoCache["__DEFAULT_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/map_default_marker.png", imageSize: [36,36], imageAnchor:[11,36]});
		this._infoCache["__START_POSITION_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_start.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__END_POSITION_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_red.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__DEFAULT_RO_MARKER"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbology/map_default_marker.png", imageSize: [32,32], imageAnchor:[0,32]});
		this._infoCache["__LBS_EXCEEDED_ACCURACY"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_red.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LBS_EXCEEDED_UPDATE_COND"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_yellow.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LBS_INSIDE_TOLERANCE"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_blue.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__MY_LOCATION"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/map16_pointMarker_blue.png", imageSize: [16,16], imageAnchor:[8,8]});
		this._infoCache["__LAYER_ON"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/checkBox_selected.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_OFF"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/checkBox_unselected.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_DETAILS"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbologyMenu_arrow.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["__LAYER_DETAILS_OFF"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/symbologyMenu_arrow_off.png", imageSize: [15,15], imageAnchor:[0,0]});
		this._infoCache["UNASSIGNEDWORK"]  = new ibm.tivoli.fwm.mxmap.MarkerImageInfo({imageUrl: this.getResourcesPath() + rtlDir + "/marker_yellow.png", imageSize: [20,34], imageAnchor:[10,34]});
	}
});

ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager = function()
{
	if(!ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance)
	{
		ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance = new ibm.tivoli.fwm.mxmap.ImageLibraryManager();	
	}
	return ibm.tivoli.fwm.mxmap.ImageLibraryManager._instance;
};

});

},
'dijit/_OnDijitClickMixin':function(){
define("dijit/_OnDijitClickMixin", [
	"dojo/on",
	"dojo/_base/array", // array.forEach
	"dojo/keys", // keys.ENTER keys.SPACE
	"dojo/_base/declare", // declare
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window" // win.doc.addEventListener win.doc.attachEvent win.doc.detachEvent
], function(on, array, keys, declare, has, unload, win){

	// module:
	//		dijit/_OnDijitClickMixin
	// summary:
	//		Mixin so you can pass "ondijitclick" to this.connect() method,
	//		as a way to handle clicks by mouse, or by keyboard (SPACE/ENTER key)


	// Keep track of where the last keydown event was, to help avoid generating
	// spurious ondijitclick events when:
	// 1. focus is on a <button> or <a>
	// 2. user presses then releases the ENTER key
	// 3. onclick handler fires and shifts focus to another node, with an ondijitclick handler
	// 4. onkeyup event fires, causing the ondijitclick handler to fire
	var lastKeyDownNode = null;
	if(has("ie")){
		(function(){
			var keydownCallback = function(evt){
				lastKeyDownNode = evt.srcElement;
			};
			win.doc.attachEvent('onkeydown', keydownCallback);
			unload.addOnWindowUnload(function(){
				win.doc.detachEvent('onkeydown', keydownCallback);
			});
		})();
	}else{
		win.doc.addEventListener('keydown', function(evt){
			lastKeyDownNode = evt.target;
		}, true);
	}

	// Custom a11yclick (a.k.a. ondijitclick) event
	var a11yclick = function(node, listener){
		if(/input|button/i.test(node.nodeName)){
			// pass through, the browser already generates click event on SPACE/ENTER key
			return on(node, "click", listener);
		}else{
			// Don't fire the click event unless both the keydown and keyup occur on this node.
			// Avoids problems where focus shifted to this node or away from the node on keydown,
			// either causing this node to process a stray keyup event, or causing another node
			// to get a stray keyup event.

			function clickKey(/*Event*/ e){
				return (e.keyCode == keys.ENTER || e.keyCode == keys.SPACE) &&
						!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
			}
			var handles = [
				on(node, "keypress", function(e){
					//console.log(this.id + ": onkeydown, e.target = ", e.target, ", lastKeyDownNode was ", lastKeyDownNode, ", equality is ", (e.target === lastKeyDownNode));
					if(clickKey(e)){
						// needed on IE for when focus changes between keydown and keyup - otherwise dropdown menus do not work
						lastKeyDownNode = e.target;

						// Prevent viewport scrolling on space key in IE<9.
						// (Reproducible on test_Button.html on any of the first dijit.form.Button examples)
						// Do this onkeypress rather than onkeydown because onkeydown.preventDefault() will
						// suppress the onkeypress event, breaking _HasDropDown
						e.preventDefault();
					}
				}),

				on(node, "keyup", function(e){
					//console.log(this.id + ": onkeyup, e.target = ", e.target, ", lastKeyDownNode was ", lastKeyDownNode, ", equality is ", (e.target === lastKeyDownNode));
					if(clickKey(e) && e.target == lastKeyDownNode){	// === breaks greasemonkey
						//need reset here or have problems in FF when focus returns to trigger element after closing popup/alert
						lastKeyDownNode = null;
						listener.call(this, e);
					}
				}),

				on(node, "click", function(e){
					// and connect for mouse clicks too (or touch-clicks on mobile)
					listener.call(this, e);
				})
			];

			return {
				remove: function(){
					array.forEach(handles, function(h){ h.remove(); });
				}
			};
		}
	};

	return declare("dijit._OnDijitClickMixin", null, {
		connect: function(
				/*Object|null*/ obj,
				/*String|Function*/ event,
				/*String|Function*/ method){
			// summary:
			//		Connects specified obj/event to specified method of this object
			//		and registers for disconnect() on widget destroy.
			// description:
			//		Provide widget-specific analog to connect.connect, except with the
			//		implicit use of this widget as the target object.
			//		This version of connect also provides a special "ondijitclick"
			//		event which triggers on a click or space or enter keyup.
			//		Events connected with `this.connect` are disconnected upon
			//		destruction.
			// returns:
			//		A handle that can be passed to `disconnect` in order to disconnect before
			//		the widget is destroyed.
			// example:
			//	|	var btn = new dijit.form.Button();
			//	|	// when foo.bar() is called, call the listener we're going to
			//	|	// provide in the scope of btn
			//	|	btn.connect(foo, "bar", function(){
			//	|		console.debug(this.toString());
			//	|	});
			// tags:
			//		protected

			return this.inherited(arguments, [obj, event == "ondijitclick" ? a11yclick : event, method]);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/factories/spatial':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/MaximoSpatial"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.spatial");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial");
/**
 * Factory to load MaximoSpatial Esri's js api
 */
ibm.tivoli.fwm.mxmap.factories.spatial = ({
	/**
	 * After we load the google maps javascripts this method is called.
	 */
	loaded: false,
	apiLoaded: function()
	{

		ibm.tivoli.fwm.mxmap.factories.spatial.loaded = true;
		esri.config.defaults.io.proxyUrl = dojo.config.fwm.ctxRoot + '/webclient/pluss/proxy.jsp';

		console.log('Maximo Spatial Maps API is now available');
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.MaximoSpatial", "spatial");
	},
	/**
	 * method to be overriden by all map factory implementation
	 * 
	 * @param options
	 */
	init: function(options)
	{
		var localapi = false;
		if (options.mapConf.SPATIAL && options.mapConf.SPATIAL.localApi)
		{
			localapi = true;
		}
		this._loadJSApi(options.mapConf.key, options.mapConf.https, options.isMobile, localapi);
	},
	/**
	 * this method loads the google maps api and the mapstraction js for google.
	 */
	_loadJSApi: function(key, https, isMobile, localApi)
	{
		this.isMobile = isMobile;
		this.localApi = localApi;
		this.protocol = 'http';

		if (window.location.protocol=="https:")//spatial does not have db config for https. It propagates whatever maximo is using.
		{
			this.protocol = 'https';
		}

		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/pluss/com/esri/solutions/jsviewer/themes/spatial/mxmap.css", "css");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/pluss/com/esri/solutions/jsviewer/themes/spatial/override.css", "css");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.geocoder.js", "js");

		ibm.tivoli.fwm.mxmap.factories.spatial.initDojo(ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded);
	},
	localApi: false,
	isMobile: false,
	protocol: 'http',
	initDojo: function(fct)
	{

		if (window.esri == null)
		{
			if (window.djConfig == null)
			{
				window.djConfig = dojo.config;
			}
			window.djConfig.scopeMap = [ [ "dojo", "esriDojoNew" ], [ "dijit", "esriDijitNew" ], [ "dojox", "esriDojoxNew" ] ];

			var mobileString = '';
			if (this.isMobile)
			{ // need to append 'compact' to the url in case of a everyplace
				// application, to use esri mobile api
				mobileString = 'compact';
				console.info("compact version being used");
			}

			var url = this.protocol + '://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.8' + mobileString;

			if (this.localApi)
			{
				url = dojo.config.fwm.ctxRoot + '/webclient/javascript/pluss/arcgis_js_index.jsp?apiPath=arcgis_js_api/library/2.8/jsapi' + mobileString + '/';
			}

			dojo.io.script.get({
				url: url,
				timeout: 30000,
				error: function()
				{
					console.error('Failed to load esri js apis');
					alert('Failed to load esri js api');
				}
			});
		}

		ibm.tivoli.fwm.mxmap.factories.spatial.fcc = fct;
		ibm.tivoli.fwm.mxmap.factories.spatial.waiter();
	},
	waiter: function()
	{
		if (!window.esri)
		{
			setTimeout("ibm.tivoli.fwm.mxmap.factories.spatial.waiter()", 300);
		}
		else
		{

			try
			{

				// This is only executed after the dojo from ESRI API is loaded.
				if (this.isMobile)
				{
					esriDojoNew.require("esri.toolbars.draw");
					esriDojoNew.require("esri.toolbars.edit");
					esriDojoNew.require("esri.toolbars.navigation");
					esriDojoNew.require("esri.tasks.identify");
					esriDojoNew.require("esri.tasks.query");
					esriDojoNew.require("esri.tasks.geometry");
					esriDojoNew.require("esri.virtualearth.VETiledLayer");
					esriDojoNew.require("esri.virtualearth.VEGeocoder");
				}

				// loading it here to always work. On MaximoSpatialMxn.js
				// sometimes it does not load
				esriDojoNew.require("esri.dijit.Scalebar");
				esriDojoNew.require("esri.dijit.OverviewMap");
				esriDojoNew.require("esri.map");

				esriDojoNew.addOnLoad(ibm.tivoli.fwm.mxmap.factories.spatial.fcc);
			}
			catch (e)
			{
				console.log("Failed to load compact api", e);
			}
		}

	},
	apiPooler: function()
	{

		try
		{
			if (window.esri != null)
			{
				ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded();
				return;
			}
		}
		catch (e)
		{
			console.log("Error loading spatial api", e);
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("loaded", ibm.tivoli.fwm.mxmap.factories.spatial.loaded);
		}
		if (ibm.tivoli.fwm.mxmap.factories.spatial.loaded != true)
		{
			setTimeout("ibm.tivoli.fwm.mxmap.factories.spatial.apiPooler()", 500);
		}
		else
		{
			ibm.tivoli.fwm.mxmap.factories.spatial.apiLoaded();
		}
	}
});
});

},
'dojo/dnd/autoscroll':function(){
define("dojo/dnd/autoscroll", ["../main", "../window"], function(dojo) {
	// module:
	//		dojo/dnd/autoscroll
	// summary:
	//		TODOC

dojo.getObject("dnd", true, dojo);

dojo.dnd.getViewport = dojo.window.getBox;

dojo.dnd.V_TRIGGER_AUTOSCROLL = 32;
dojo.dnd.H_TRIGGER_AUTOSCROLL = 32;

dojo.dnd.V_AUTOSCROLL_VALUE = 16;
dojo.dnd.H_AUTOSCROLL_VALUE = 16;

dojo.dnd.autoScroll = function(e){
	// summary:
	//		a handler for onmousemove event, which scrolls the window, if
	//		necesary
	// e: Event
	//		onmousemove event

	// FIXME: needs more docs!
	var v = dojo.window.getBox(), dx = 0, dy = 0;
	if(e.clientX < dojo.dnd.H_TRIGGER_AUTOSCROLL){
		dx = -dojo.dnd.H_AUTOSCROLL_VALUE;
	}else if(e.clientX > v.w - dojo.dnd.H_TRIGGER_AUTOSCROLL){
		dx = dojo.dnd.H_AUTOSCROLL_VALUE;
	}
	if(e.clientY < dojo.dnd.V_TRIGGER_AUTOSCROLL){
		dy = -dojo.dnd.V_AUTOSCROLL_VALUE;
	}else if(e.clientY > v.h - dojo.dnd.V_TRIGGER_AUTOSCROLL){
		dy = dojo.dnd.V_AUTOSCROLL_VALUE;
	}
	window.scrollBy(dx, dy);
};

dojo.dnd._validNodes = {"div": 1, "p": 1, "td": 1};
dojo.dnd._validOverflow = {"auto": 1, "scroll": 1};

dojo.dnd.autoScrollNodes = function(e){
	// summary:
	//		a handler for onmousemove event, which scrolls the first avaialble
	//		Dom element, it falls back to dojo.dnd.autoScroll()
	// e: Event
	//		onmousemove event

	// FIXME: needs more docs!

	var b, t, w, h, rx, ry, dx = 0, dy = 0, oldLeft, oldTop;

	for(var n = e.target; n;){
		if(n.nodeType == 1 && (n.tagName.toLowerCase() in dojo.dnd._validNodes)){
			var s = dojo.getComputedStyle(n),
				overflow = (s.overflow.toLowerCase() in dojo.dnd._validOverflow),
				overflowX = (s.overflowX.toLowerCase() in dojo.dnd._validOverflow),
				overflowY = (s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
			if(overflow || overflowX || overflowY){
				b = dojo._getContentBox(n, s);
				t = dojo.position(n, true);
			}
			// overflow-x
			if(overflow || overflowX){
				w = Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL, b.w / 2);
				rx = e.pageX - t.x;
				if(dojo.isWebKit || dojo.isOpera){
					// FIXME: this code should not be here, it should be taken into account
					// either by the event fixing code, or the dojo.position()
					// FIXME: this code doesn't work on Opera 9.5 Beta
					rx += dojo.body().scrollLeft;
				}
				dx = 0;
				if(rx > 0 && rx < b.w){
					if(rx < w){
						dx = -w;
					}else if(rx > b.w - w){
						dx = w;
					}
					oldLeft = n.scrollLeft;
					n.scrollLeft = n.scrollLeft + dx;
				}
			}
			// overflow-y
			if(overflow || overflowY){
				//console.log(b.l, b.t, t.x, t.y, n.scrollLeft, n.scrollTop);
				h = Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL, b.h / 2);
				ry = e.pageY - t.y;
				if(dojo.isWebKit || dojo.isOpera){
					// FIXME: this code should not be here, it should be taken into account
					// either by the event fixing code, or the dojo.position()
					// FIXME: this code doesn't work on Opera 9.5 Beta
					ry += dojo.body().scrollTop;
				}
				dy = 0;
				if(ry > 0 && ry < b.h){
					if(ry < h){
						dy = -h;
					}else if(ry > b.h - h){
						dy = h;
					}
					oldTop = n.scrollTop;
					n.scrollTop  = n.scrollTop  + dy;
				}
			}
			if(dx || dy){ return; }
		}
		try{
			n = n.parentNode;
		}catch(x){
			n = null;
		}
	}
	dojo.dnd.autoScroll(e);
};

	return dojo.dnd;
});

},
'dijit/form/_RadioButtonMixin':function(){
define("dijit/form/_RadioButtonMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/event", // event.stop
	"dojo/_base/lang", // lang.hitch
	"dojo/query", // query
	"dojo/_base/window", // win.doc
	"../registry"	// registry.getEnclosingWidget
], function(array, declare, domAttr, event, lang, query, win, registry){

	// module:
	//		dijit/form/_RadioButtonMixin
	// summary:
	// 		Mixin to provide widget functionality for an HTML radio button

	return declare("dijit.form._RadioButtonMixin", null, {
		// summary:
		// 		Mixin to provide widget functionality for an HTML radio button

		// type: [private] String
		//		type attribute on <input> node.
		//		Users should not change this value.
		type: "radio",

		_getRelatedWidgets: function(){
			// Private function needed to help iterate over all radio buttons in a group.
			var ary = [];
			query("input[type=radio]", this.focusNode.form || win.doc).forEach( // can't use name= since query doesn't support [] in the name
				lang.hitch(this, function(inputNode){
					if(inputNode.name == this.name && inputNode.form == this.focusNode.form){
						var widget = registry.getEnclosingWidget(inputNode);
						if(widget){
							ary.push(widget);
						}
					}
				})
			);
			return ary;
		},

		_setCheckedAttr: function(/*Boolean*/ value){
			// If I am being checked then have to deselect currently checked radio button
			this.inherited(arguments);
			if(!this._created){ return; }
			if(value){
				array.forEach(this._getRelatedWidgets(), lang.hitch(this, function(widget){
					if(widget != this && widget.checked){
						widget.set('checked', false);
					}
				}));
			}
		},

		_onClick: function(/*Event*/ e){
			if(this.checked || this.disabled){ // nothing to do
				event.stop(e);
				return false;
			}
			if(this.readOnly){ // ignored by some browsers so we have to resync the DOM elements with widget values
				event.stop(e);
				array.forEach(this._getRelatedWidgets(), lang.hitch(this, function(widget){
					domAttr.set(this.focusNode || this.domNode, 'checked', widget.checked);
				}));
				return false;
			}
			return this.inherited(arguments);
		}
	});
});

},
'dojo/dnd/TimedMoveable':function(){
define("dojo/dnd/TimedMoveable", ["../main", "./Moveable"], function(dojo) {
	// module:
	//		dojo/dnd/TimedMoveable
	// summary:
	//		TODOC

	/*=====
	dojo.declare("dojo.dnd.__TimedMoveableArgs", [dojo.dnd.__MoveableArgs], {
		// timeout: Number
		//		delay move by this number of ms,
		//		accumulating position changes during the timeout
		timeout: 0
	});
	=====*/

	// precalculate long expressions
	var oldOnMove = dojo.dnd.Moveable.prototype.onMove;

	dojo.declare("dojo.dnd.TimedMoveable", dojo.dnd.Moveable, {
		// summary:
		//		A specialized version of Moveable to support an FPS throttling.
		//		This class puts an upper restriction on FPS, which may reduce
		//		the CPU load. The additional parameter "timeout" regulates
		//		the delay before actually moving the moveable object.

		// object attributes (for markup)
		timeout: 40,	// in ms, 40ms corresponds to 25 fps

		constructor: function(node, params){
			// summary:
			//		an object that makes a node moveable with a timer
			// node: Node||String
			//		a node (or node's id) to be moved
			// params: dojo.dnd.__TimedMoveableArgs
			//		object with additional parameters.

			// sanitize parameters
			if(!params){ params = {}; }
			if(params.timeout && typeof params.timeout == "number" && params.timeout >= 0){
				this.timeout = params.timeout;
			}
		},

		onMoveStop: function(/* dojo.dnd.Mover */ mover){
			if(mover._timer){
				// stop timer
				clearTimeout(mover._timer);
				// reflect the last received position
				oldOnMove.call(this, mover, mover._leftTop)
			}
			dojo.dnd.Moveable.prototype.onMoveStop.apply(this, arguments);
		},
		onMove: function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop){
			mover._leftTop = leftTop;
			if(!mover._timer){
				var _t = this;	// to avoid using dojo.hitch()
				mover._timer = setTimeout(function(){
					// we don't have any pending requests
					mover._timer = null;
					// reflect the last received position
					oldOnMove.call(_t, mover, mover._leftTop);
				}, this.timeout);
			}
		}
	});

	return dojo.dnd.TimedMoveable;
	
});

},
'ibm/tivoli/fwm/mxmap/layers/VirtualLayer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/layers/Layer,ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.VirtualLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.Layer");

dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Used only to display a subset of mbos on the markers resulting from a query
 * 
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.VirtualLayer", [ ibm.tivoli.fwm.mxmap.layers.Layer ], {
	constructor: function(options)
	{
		this._layerName = options.layerId;
		this._layerId = options.layerId;
		this.enable();
		this.layerConf = this.symbManager.getLayerConfigById(options.objectType);
	}
});
});

},
'ibm/tivoli/fwm/mxmap/factories/gmaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/GMaps"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.gmaps");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.GMaps");
/**
 * Factory to load google maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.gmaps = {
	compId:null,
	/**
	 * After we load the google maps javascripts this method is called. 
	 */
	apiLoaded : function() {
		console.log('Google Maps API is now available');		
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.GMaps","gmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {		
		this._loadJSApi(options.mapConf.key, options.mapConf.https);
	},
	/**
	 * this method loads the google maps api and the mapstraction js for google.
	 */
	_loadJSApi : function(key, https) {
		var protocol = 'http';
		var license = '';
		if(https)
			protocol = 'https';
		if(key)
			license = '&client=' + key;
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.googlev3.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.googlev3.geocoder.js", "js");
		dojo.io.script.get({
			url : protocol + '://maps.google.com/maps/api/js?v=3.8&sensor=true&callback=ibm.tivoli.fwm.mxmap.factories.gmaps.apiLoaded' + license,
			timeout : 30000,
			error : function() {
				console.error('Failed to load google apis');
				alert('Failed to load google maps api, check your internet conncetion.');
			}
		});
	}
};
});

},
'dojo/cache':function(){
define("dojo/cache", ["./_base/kernel", "./text"], function(dojo, text){
	// module:
	//		dojo/cache
	// summary:
	//		The module defines dojo.cache by loading dojo/text.

	//dojo.cache is defined in dojo/text
	return dojo.cache;
});

},
'ibm/tivoli/fwm/mxmap/Geocoder':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/util/AddressCandidatesFormatter,ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog,ibm/tivoli/fwm/i18n"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.Geocoder");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.i18n");
/**
 * Maximo geocoder helper class.
 */
ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes={
	ZERO_RESULTS:"ZERO_RESULTS",
	INVALID_REQUEST:"INVALID_REQUEST",
	REQUEST_DENIED:"REQUEST_DENIED",
	OVER_LIMIT:"OVER_LIMIT",	
	UNKNOWN:"UNKNOWN"
};
dojo.declare("ibm.tivoli.fwm.mxmap.Geocoder", ibm.tivoli.fwm.mxmap._Base, {

	map: null,	 
	key: null, //some GeoCoder provider demand a Key to be passed to the geocoder interface
	_geocode : null,
	_candidateDialog: null,
	
	/**
	 * Adds the listener to the mxmap_geocoder event which triggers the
	 * findlocation action
	 * 
	 * @param options
	 */
	constructor : function(options) {
		dojo.mixin(this, options);
		this.addSubscription(dojo.subscribe("mxmap_geocoder_"+this.map.getId(), dojo.hitch(this, this.findLocation)));
		this.addSubscription(dojo.subscribe("addressCandidateSelectedOnMapId_" + this.map.getId(), dojo.hitch(this, this._addressCandidateSelected)));
	},
	
	/**
	 * Find a location on the map based on the address string.<br>
	 * 
	 * In case it fails to find an address it displays the returned Geocode
	 * status message.
	 * 
	 * @param address -
	 *            the address string to be geocoded
	 * @param callback -
	 *            If any success function must handle the results other than the
	 *            default one. By default it sets the returned data (coords and
	 *            address) into the current SA record.
	 * @see Geocoder.returnFindLocation
	 * @param errorCallback -
	 *            If any error function must handle the results other than the
	 *            default one.
	 * @see Geocoder.errorDuringGeocode
	 */
	findLocation : function(address, callback, errorCallback) {
		if(!address || address.length==0){
			return;
		}
		if (!errorCallback) {
			errorCallback = dojo.hitch(this, this.errorDuringGeocode);
		}
		if (!callback) {
			callback = dojo.hitch(this, this.returnFindLocation);
		}
		this._geocode = new mxn.Geocoder(this.map.providerName, callback, errorCallback,{key:this.key,map:this.map.getMapstraction(),customParams:this.map.getGeoCoderConf()});

		this._geocode.geocode({
			address : address
			
		});

	},
	
	/**
	 * Reverse geocode based on lat/lng coordinates. <br>
	 * 
	 * @param lat -
	 *            Latitude
	 * @param lng -
	 *            Longitude
	 * @param callback -
	 *            If any success function must handle the results other than the
	 *            default one. By default it sets back the currentSA record
	 *            address.
	 * @see Geocoder.returnUpdateAddress
	 * @param errorCallback -
	 *            If any error function must handle the results other than the
	 *            default one.
	 * @see Geocoder.returnFindLocation
	 */
	reverseGeocode : function(lat, lng, callback, errorCallback) {
		if (!errorCallback) {
			errorCallback = dojo.hitch(this, this.errorDuringGeocode);
		}
		if (!callback) {
			callback = dojo.hitch(this, this.returnUpdateAddress);
		}
		this._geocode = new mxn.Geocoder(this.map.providerName, callback, errorCallback,{key:this.key,map:this.map.getMapstraction(),customParams:this.map.getGeoCoderConf()});
		this._geocode.geocode({
			lat : lat,
			lng : lng
		});
	},

	convertGeocodedAddressIntoFormattedAddress : function(location) {
		return location.formattedAddress;
	},
	
	/**
	 * Having a location with coords data, set the current SA record coords.
	 * 
	 * @param addressCandidates 
	 */
	returnFindLocation: function(addressCandidates) {
		if (dojo.config.fwm.debug == true)
		{
		console.log("[Geocoder] Address candidates: ", addressCandidates);
		}
		if(addressCandidates.length == 1){
			var location1 = addressCandidates[0];
			this.map.getMaximo().setCurrentRecordLocation({
				lat : location1.point.lat,
				lng : location1.point.lng,
				address : this.convertGeocodedAddressIntoFormattedAddress(location1)
			});
		}else{
			var me = this;
			var title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "addresscandidates");
			if(this._candidateDialog==null){
				this._candidateDialog = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({map: me.map, title: title});
			}
			var content1 = ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter
									.createHTMLDOMWithList(
											addressCandidates,
											this.map.getId(),
											this._candidateDialog.getCalculatedWidth(),
											this._candidateDialog.getCalculatedHeight());			
			this._candidateDialog.setContent(content1);
			this._candidateDialog.show();
		}
	},
	
	/**
	 * Having a location with address data, set the current SA record formattted
	 * address.
	 * 
	 * @param object
	 *            with address information.
	 */
	returnUpdateAddress : function(location) {
		this.map.getMaximo().setCurrentRecordLocation({
			address : this.convertGeocodedAddressIntoFormattedAddress(location)
		});
	},
	
	/**
	 * Handles geocoding errors and display msgs accordingly
	 * 
	 * @param String
	 *            with error value
	 */
	errorDuringGeocode : function(errorCode) {
		switch (errorCode) {
		
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.ZERO_RESULTS:
			this.map.getMaximo().showMessage("mapserver", "geocode_noresults");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.INVALID_REQUEST:
			this.map.getMaximo().showMessage("mapserver", "geocode_invalid_req");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.REQUEST_DENIED:
			this.map.getMaximo().showMessage("mapserver", "geocode_req_denied");
			break;
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.OVER_LIMIT:
			this.map.getMaximo().showMessage("mapserver", "geocode_limits_exceed");
			break;
		
		case ibm.tivoli.fwm.mxmap.GeoCodeErrorCodes.UNKNOWN:
			this.map.getMaximo().showMessage("mapserver", "geocode_unknown_error");
			break;

		default:
			this.map.getMaximo().showMessage("mapserver", "geocode_unknown_error");
			break;
		}		
		console.info("[Geocoder] Geocoder Service returned an error code: ", errorCode);
	},
	
	/**
	 * Callback method for address selected from the address candidate dialog 
	 * address.
	 * 
	 * @param object with address information.
	 */
	_addressCandidateSelected: function(addressSelected)
	{
		if(this._candidateDialog){			
			this._candidateDialog.close();
			this._candidateDialog = null;
		}
		this.returnFindLocation([addressSelected]);
	}
});
});

},
'ibm/tivoli/fwm/mxmap/InfoWindow':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.InfoWindow");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.InfoWindow", [ibm.tivoli.fwm.mxmap._Base,dijit._Widget, dijit._Templated], {
	map:null,
	isRTL:null,
	templateString:"<div>\n<div style=\"position: relative; width: 0pt; height: 0pt; line-height: 0; border-color: transparent rgb(255, 255, 255) transparent transparent; margin-left: 0px; margin-top: 0px; border-style: solid; float: left; border-width: 15px 15px 15px 2px;\"></div>\n\n<div dojoAttachPoint=\"mainDialog\" style=\"padding:5px;position:relative;float:left;border:1px solid #000;background-color:#fff;min-width:100px;min-height:50px;\">\n\t<div dojoAttachPoint=\"closeBtn\" style=\"padding:0;margin:0;float:right;width:29px;height:29px;cursor: pointer;text-align:right;position:absolute;background: url(../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/ac16_winClose.png) no-repeat;background-position: 8px 6px;\" dojoAttachEvent=\"onclick:close\"></div>\t\n\t<div dojoAttachPoint=\"content\" style=\"overflow-x:auto;\"></div>\n\t</div>\n</div>",
	_display: null,
	rootElement:null,
	domNode:null,
	mapId:null,
	constructor : function(options) {
		dojo.mixin(this,options);
		this._display = false;
		if(!this.isRTL){
			this.isRTL=document.body.dir=='rtl';
		}
	},
	postCreate:function(){
		dojo.parser.parse(this.domNode);
		dojo.style(this.domNode,"display","none");
		dojo.style(this.domNode,"position","absolute");
		this._display = false;
		this.placeAt(this.rootElement);
		// Moves the close button to the left if bidi is enabled
		if(this.isRTL==true)
		{
			dojo.style(this.closeBtn, "float", "left");
			dojo.style(this.closeBtn, "left", "3px");
			dojo.style(this.domNode, "direction", "rtl");
		} else {
			dojo.style(this.closeBtn, "float", "right");
			dojo.style(this.closeBtn, "right", "3px");
			dojo.style(this.domNode, "direction", "ltr");
		}
		if (dojo.isIE) {
			dojo.style(this.mainDialog,"width","100px");
		}
		dojo.connect(this.domNode, "oncontextmenu", function(evt)
		{
			mxn.util.stopEventPropagation(evt);
			dojo.stopEvent(evt);
		});
		
	},
	updatePosition:function(x,y){		
		var coords ={x:0,y:0};// dojo.position(this.rootElement,true);		
		var px = x+coords.x+this.offset.x;
		var py = y+coords.y+this.offset.y;
		dojo.style(this.domNode,"left",px);
		dojo.style(this.domNode,"top",py);		

		if(this.isDisplayed()){
			if(parseInt(px)<0 || parseInt(py)<0 || parseInt(dojo.style(this.domNode, "right"))<0 || parseInt(dojo.style(this.domNode, "bottom"))<0){
				this.close();
			}
		}
	},
	isDisplayed:function(){
		return (this._display == true);
	},
	setContent:function(content){
		if(typeof(content) == 'object'){
			this.setDomContent(content);
		}else{
			dojo.empty(this.content);
			dojo.create("div",{innerHTML:text},this.content);
		}
	},
	setDomContent:function(domToAppend){
		dojo.place(domToAppend, this.content, "only");
	},
	close:function(){		
		dojo.style(this.domNode,"display",'none');
		this._display = false;
		dojo.publish("endedUserInteractionOnMap_"+this.mapId, [ {
			objectSource: this,
			objectSourceName: 'infowindow',
			eventName: 'closeBubble'
		} ]);
	},
	offset:{
		y:-15,
		x:0
	},
	show:function(x,y){
		
		var coords ={x:0,y:0};// dojo.position(this.rootElement,true);		

		var px = x+coords.x+this.offset.x;
		var py = y+coords.y+this.offset.y;
		
		dojo.style(this.domNode,"top",py);
		dojo.style(this.domNode,"left",px);
		dojo.style(this.domNode,"display",'block');
		this._display = true;
	}


});
});

},
'dijit/_base/popup':function(){
define("dijit/_base/popup", [
	"dojo/dom-class", // domClass.contains
	"../popup",
	"../BackgroundIframe"	// just loading for back-compat, in case client code is referencing it
], function(domClass, popup){

// module:
//		dijit/_base/popup
// summary:
//		Old module for popups, new code should use dijit/popup directly


// Hack support for old API passing in node instead of a widget (to various methods)
var origCreateWrapper = popup._createWrapper;
popup._createWrapper = function(widget){
	if(!widget.declaredClass){
		// make fake widget to pass to new API
		widget = {
			_popupWrapper: (widget.parentNode && domClass.contains(widget.parentNode, "dijitPopup")) ?
				widget.parentNode : null,
			domNode: widget,
			destroy: function(){}
		};
	}
	return origCreateWrapper.call(this, widget);
};

// Support old format of orient parameter
var origOpen = popup.open;
popup.open = function(/*dijit.popup.__OpenArgs*/ args){
	// Convert old hash structure (ex: {"BL": "TL", ...}) of orient to format compatible w/new popup.open() API.
	// Don't do conversion for:
	//		- null parameter (that means to use the default positioning)
	//		- "R" or "L" strings used to indicate positioning for context menus (when there is no around node)
	//		- new format, ex: ["below", "above"]
	//		- return value from deprecated dijit.getPopupAroundAlignment() method,
	//			ex: ["below", "above"]
	if(args.orient && typeof args.orient != "string" && !("length" in args.orient)){
		var ary = [];
		for(var key in args.orient){
			ary.push({aroundCorner: key, corner: args.orient[key]});
		}
		args.orient = ary;
	}

	return origOpen.call(this, args);
};

return popup;
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/WorkOrderSymbologyTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/layers/LayerPanelWidget,ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/toolbar/ext/LayersTool,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool");
dojo.require("dijit.form.Button");

/**
 * Work order symbology tool (this is just a shortcut to Layers -> Work Order)
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool", ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool, {
		iconClass: "basicMapToolbarBtn workOrderSymbologyMapToolbarBtn",
		constructor: function(params)
		{			
			dojo.mixin(this, params); 
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "workordersymbology");
			this.label = _label || this.label;
		},
		execute: function()
		{
			var layer = this.map.getLayersManager().getLayerById("workorder");
			if((layer != null) && (layer.hasChildren()))
			{
				var _layerPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.map, title: layer.getChildrenTitle()});		
				_layerPanelManager.updateLayers(layer.getChildren());
			}
		}
});
});

},
'url:dijit/form/templates/Button.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n",
'ibm/tivoli/fwm/mxmap/toolbar/ext/RefresherTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate,ibm/tivoli/fwm/mxmap/_Base,dijit/form/Button"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.RefresherTool");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.Button");

/**
 * Full Screen tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.RefresherTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
	label: "Refresh",
	iconClass: "basicMapToolbarBtn refreshMapToolbarBtn",
	map: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);

		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "refreshtoolbar");
		this.label = _label || this.label;
	},
	execute: function()
	{
		var refreshOptions = {
				zoom: true,
				disableMsgs: false,
				automatic: false
			};
		this.map.refreshMap(refreshOptions);
	},
	disable: function()
	{
		// does nothing
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
});

},
'dojo/_base/url':function(){
define("dojo/_base/url", ["./kernel"], function(dojo) {
	// module:
	//		dojo/url
	// summary:
	//		This module contains dojo._Url

	var
		ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
		ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),
		_Url = function(){
			var n = null,
				_a = arguments,
				uri = [_a[0]];
			// resolve uri components relative to each other
			for(var i = 1; i<_a.length; i++){
				if(!_a[i]){ continue; }

				// Safari doesn't support this.constructor so we have to be explicit
				// FIXME: Tracked (and fixed) in Webkit bug 3537.
				//		http://bugs.webkit.org/show_bug.cgi?id=3537
				var relobj = new _Url(_a[i]+""),
					uriobj = new _Url(uri[0]+"");

				if(
					relobj.path == "" &&
					!relobj.scheme &&
					!relobj.authority &&
					!relobj.query
				){
					if(relobj.fragment != n){
						uriobj.fragment = relobj.fragment;
					}
					relobj = uriobj;
				}else if(!relobj.scheme){
					relobj.scheme = uriobj.scheme;

					if(!relobj.authority){
						relobj.authority = uriobj.authority;

						if(relobj.path.charAt(0) != "/"){
							var path = uriobj.path.substring(0,
								uriobj.path.lastIndexOf("/") + 1) + relobj.path;

							var segs = path.split("/");
							for(var j = 0; j < segs.length; j++){
								if(segs[j] == "."){
									// flatten "./" references
									if(j == segs.length - 1){
										segs[j] = "";
									}else{
										segs.splice(j, 1);
										j--;
									}
								}else if(j > 0 && !(j == 1 && segs[0] == "") &&
									segs[j] == ".." && segs[j-1] != ".."){
									// flatten "../" references
									if(j == (segs.length - 1)){
										segs.splice(j, 1);
										segs[j - 1] = "";
									}else{
										segs.splice(j - 1, 2);
										j -= 2;
									}
								}
							}
							relobj.path = segs.join("/");
						}
					}
				}

				uri = [];
				if(relobj.scheme){
					uri.push(relobj.scheme, ":");
				}
				if(relobj.authority){
					uri.push("//", relobj.authority);
				}
				uri.push(relobj.path);
				if(relobj.query){
					uri.push("?", relobj.query);
				}
				if(relobj.fragment){
					uri.push("#", relobj.fragment);
				}
			}

			this.uri = uri.join("");

			// break the uri into its main components
			var r = this.uri.match(ore);

			this.scheme = r[2] || (r[1] ? "" : n);
			this.authority = r[4] || (r[3] ? "" : n);
			this.path = r[5]; // can never be undefined
			this.query = r[7] || (r[6] ? "" : n);
			this.fragment	 = r[9] || (r[8] ? "" : n);

			if(this.authority != n){
				// server based naming authority
				r = this.authority.match(ire);

				this.user = r[3] || n;
				this.password = r[4] || n;
				this.host = r[6] || r[7]; // ipv6 || ipv4
				this.port = r[9] || n;
			}
		};
	_Url.prototype.toString = function(){ return this.uri; };

	return dojo._Url = _Url;
});

},
'dojox/main':function(){
define("dojox/main", ["dojo/_base/kernel"], function(dojo) {
	// module:
	//		dojox/main
	// summary:
	//		The dojox package main module; dojox package is somewhat unusual in that the main module currently just provides an empty object.

	return dojo.dojox;
});
},
'url:dijit/templates/MenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n",
'dojo/text':function(){
define("dojo/text", ["./_base/kernel", "require", "./has", "./_base/xhr"], function(dojo, require, has, xhr){
	// module:
	//		dojo/text
	// summary:
	//		This module implements the !dojo/text plugin and the dojo.cache API.
	// description:
	//		We choose to include our own plugin to leverage functionality already contained in dojo
	//		and thereby reduce the size of the plugin compared to various foreign loader implementations.
	//		Also, this allows foreign AMD loaders to be used without their plugins.
	//
	//		CAUTION: this module is designed to optionally function synchronously to support the dojo v1.x synchronous
	//		loader. This feature is outside the scope of the CommonJS plugins specification.

	var getText;
	if(1){
		getText= function(url, sync, load){
			xhr("GET", {url:url, sync:!!sync, load:load});
		};
	}else{
		// TODOC: only works for dojo AMD loader
		if(require.getText){
			getText= require.getText;
		}else{
			console.error("dojo/text plugin failed to load because loader does not support getText");
		}
	}

	var
		theCache= {},

		strip= function(text){
			//Strips <?xml ...?> declarations so that external SVG and XML
			//documents can be added to a document without worry. Also, if the string
			//is an HTML document, only the part inside the body tag is returned.
			if(text){
				text= text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
				var matches= text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
				if(matches){
					text= matches[1];
				}
			}else{
				text = "";
			}
			return text;
		},

		notFound = {},

		pending = {},

		result= {
			dynamic:
				// the dojo/text caches it's own resources because of dojo.cache
				true,

			normalize:function(id, toAbsMid){
				// id is something like (path may be relative):
				//
				//	 "path/to/text.html"
				//	 "path/to/text.html!strip"
				var parts= id.split("!"),
					url= parts[0];
				return (/^\./.test(url) ? toAbsMid(url) : url) + (parts[1] ? "!" + parts[1] : "");
			},

			load:function(id, require, load){
				// id is something like (path is always absolute):
				//
				//	 "path/to/text.html"
				//	 "path/to/text.html!strip"
				var
					parts= id.split("!"),
					stripFlag= parts.length>1,
					absMid= parts[0],
					url = require.toUrl(parts[0]),
					text = notFound,
					finish = function(text){
						load(stripFlag ? strip(text) : text);
					};
				if(absMid in theCache){
					text = theCache[absMid];
				}else if(url in require.cache){
					text = require.cache[url];
				}else if(url in theCache){
					text = theCache[url];
				}
				if(text===notFound){
					if(pending[url]){
						pending[url].push(finish);
					}else{
						var pendingList = pending[url] = [finish];
						getText(url, !require.async, function(text){
							theCache[absMid]= theCache[url]= text;
							for(var i = 0; i<pendingList.length;){
								pendingList[i++](text);
							}
							delete pending[url];
						});
					}
				}else{
					finish(text);
				}
			}
		};

	dojo.cache= function(/*String||Object*/module, /*String*/url, /*String||Object?*/value){
		//	 * (string string [value]) => (module, url, value)
		//	 * (object [value])        => (module, value), url defaults to ""
		//
		//	 * if module is an object, then it must be convertable to a string
		//	 * (module, url) module + (url ? ("/" + url) : "") must be a legal argument to require.toUrl
		//	 * value may be a string or an object; if an object then may have the properties "value" and/or "sanitize"
		var key;
		if(typeof module=="string"){
			if(/\//.test(module)){
				// module is a version 1.7+ resolved path
				key = module;
				value = url;
			}else{
				// module is a version 1.6- argument to dojo.moduleUrl
				key = require.toUrl(module.replace(/\./g, "/") + (url ? ("/" + url) : ""));
			}
		}else{
			key = module + "";
			value = url;
		}
		var
			val = (value != undefined && typeof value != "string") ? value.value : value,
			sanitize = value && value.sanitize;

		if(typeof val == "string"){
			//We have a string, set cache value
			theCache[key] = val;
			return sanitize ? strip(val) : val;
		}else if(val === null){
			//Remove cached value
			delete theCache[key];
			return null;
		}else{
			//Allow cache values to be empty strings. If key property does
			//not exist, fetch it.
			if(!(key in theCache)){
				getText(key, true, function(text){
					theCache[key]= text;
				});
			}
			return sanitize ? strip(theCache[key]) : theCache[key];
		}
	};

	return result;

/*=====
dojo.cache = function(module, url, value){
	// summary:
	//		A getter and setter for storing the string content associated with the
	//		module and url arguments.
	// description:
	//		If module is a string that contains slashes, then it is interpretted as a fully
	//		resolved path (typically a result returned by require.toUrl), and url should not be
	//		provided. This is the preferred signature. If module is a string that does not
	//		contain slashes, then url must also be provided and module and url are used to
	//		call `dojo.moduleUrl()` to generate a module URL. This signature is deprecated.
	//		If value is specified, the cache value for the moduleUrl will be set to
	//		that value. Otherwise, dojo.cache will fetch the moduleUrl and store it
	//		in its internal cache and return that cached value for the URL. To clear
	//		a cache value pass null for value. Since XMLHttpRequest (XHR) is used to fetch the
	//		the URL contents, only modules on the same domain of the page can use this capability.
	//		The build system can inline the cache values though, to allow for xdomain hosting.
	// module: String||Object
	//		If a String with slashes, a fully resolved path; if a String without slashes, the
	//		module name to use for the base part of the URL, similar to module argument
	//		to `dojo.moduleUrl`. If an Object, something that has a .toString() method that
	//		generates a valid path for the cache item. For example, a dojo._Url object.
	// url: String
	//		The rest of the path to append to the path derived from the module argument. If
	//		module is an object, then this second argument should be the "value" argument instead.
	// value: String||Object?
	//		If a String, the value to use in the cache for the module/url combination.
	//		If an Object, it can have two properties: value and sanitize. The value property
	//		should be the value to use in the cache, and sanitize can be set to true or false,
	//		to indicate if XML declarations should be removed from the value and if the HTML
	//		inside a body tag in the value should be extracted as the real value. The value argument
	//		or the value property on the value argument are usually only used by the build system
	//		as it inlines cache content.
	//	example:
	//		To ask dojo.cache to fetch content and store it in the cache (the dojo["cache"] style
	//		of call is used to avoid an issue with the build system erroneously trying to intern
	//		this example. To get the build system to intern your dojo.cache calls, use the
	//		"dojo.cache" style of call):
	//		| //If template.html contains "<h1>Hello</h1>" that will be
	//		| //the value for the text variable.
	//		| var text = dojo["cache"]("my.module", "template.html");
	//	example:
	//		To ask dojo.cache to fetch content and store it in the cache, and sanitize the input
	//		 (the dojo["cache"] style of call is used to avoid an issue with the build system
	//		erroneously trying to intern this example. To get the build system to intern your
	//		dojo.cache calls, use the "dojo.cache" style of call):
	//		| //If template.html contains "<html><body><h1>Hello</h1></body></html>", the
	//		| //text variable will contain just "<h1>Hello</h1>".
	//		| var text = dojo["cache"]("my.module", "template.html", {sanitize: true});
	//	example:
	//		Same example as previous, but demostrates how an object can be passed in as
	//		the first argument, then the value argument can then be the second argument.
	//		| //If template.html contains "<html><body><h1>Hello</h1></body></html>", the
	//		| //text variable will contain just "<h1>Hello</h1>".
	//		| var text = dojo["cache"](new dojo._Url("my/module/template.html"), {sanitize: true});
	return val; //String
};
=====*/
});


},
'ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/form/ToggleButton,ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");

dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.form.ToggleButton");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");

/**
 * Base class for tools with enabled/disabled status
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
	toolActive: false,
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	createToolbarButton: function()
	{
		this._button = new dijit.form.ToggleButton({
			label: this.label,
			showLabel: false,
			iconClass: this.iconClass,
			onClick: dojo.hitch(this, function()
			{
				this.execute();
			})

		});
		return this._button;

	},
	/**
	 * The execute method has been overridden here to run toggleStatus()
	 */
	execute: function()
	{
		this.toggleStatus();
	},
	/**
	 * Runs either executeOn or executeOff, depending on the toolActive status.
	 * The executeOff and executeOn methods must be implemented.
	 * Should any error occur in the executeOff and executeOn routines that requires the status to remain the same,
	 * the setActive(true/false) method must be called explicitly.
	 */
	toggleStatus: function()
	{
		if(this.isActive() == true)
		{
			this.setActive(false);
			this.executeOff();
		}
		else
		{
			this.setActive(true);
			this.executeOn();
		}
	},
	/**
	 * Checks if the tool is active
	 */
	isActive: function()
	{
		return this.toolActive;
	},
	executeOn: function()
	{
		console.error("to be implemented");
	},
	executeOff: function()
	{
		console.error("to be implemented");
	},
	/**
	 * Changes the status of the tool (and the button)
	 */
	setActive: function(active)
	{
		if(this._button != null){
			this._button.set({
				checked: active
			});
		}
		this.toolActive = active;
	}	
});
});

},
'url:dijit/form/templates/CheckBox.html':"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"onclick:_onClick\"\n/></div>\n",
'ibm/tivoli/fwm/mxmap/toolbar/ext/MyLocationTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button,ibm/tivoli/fwm/mxmap/ImageLibraryManager,ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationTool");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");

ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus = {
	DISABLED: -1,
	MARKER_CENTERED: 0,
	MARKER_NOT_CENTERED: 1
};

/**
 * My Location tool bar action.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "My Location",
	iconClass: "basicMapToolbarBtn myLocationMapToolbarBtn",
	map: null,
	myLocationToolStatus: null,
	myLocationMarker: null,
	lbsCircle: null,
	imageLibManager: null,
	myCurrentLocationInstance: null,
	_executedAtLeastOnce: false,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "mylocationtool");

		this.resetMyLocationTool();

		this.label = _label || this.label;

		this.imageLibManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this.myCurrentLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();

	},
	
	disable: function()
	{
		// does nothing
	},
	destroy: function()
	{
		this.resetMyLocationTool();
		this.destroyRecursive();
	},
	toggleStatus: function()
	{
		this.toggleMyLocationStatus();
	},
	/**
	 * Changes the status of the tool From DISABLED to MARKER_CENTERED, from
	 * MARKER_CENTERED to DISABLED and from MARKER_NOT_CENTERED to
	 * MARKER_CENTERED
	 */
	toggleMyLocationStatus: function()
	{
		switch (this.myLocationToolStatus)
		{
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED:
				// 12-13616. Moving this.setActive(true) here (before this.watchMyLocationMarkerPosition()), because
				// the latter can result in an error and, if so, the error callback will reset the button status to "off"
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				this.watchMyLocationMarkerPosition();
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED:
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				this.setCenterAndUpdateMarkerPosition();
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED:
				this.resetMyLocationTool();
				break;
			default:
				break;
		}
		;

	},
	/**
	 * Updates the My Location marker position according to the new current
	 * location If the current status is MARKER_CENTERED, forces the map to be
	 * centered around the marker
	 */
	setCenterAndUpdateMarkerPosition: function()
	{
		this._executedAtLeastOnce = true;
		if (this.myLocationToolStatus != ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED)
		{
			if (this.myCurrentLocationInstance)
			{
				if (this.myCurrentLocationInstance.getPosition() && this.myCurrentLocationInstance.getPosition().coords)
				{
					// Retrieve the properties related to My Location
					var coords = this.myCurrentLocationInstance.getPosition().coords;
					var lat = coords.latitude;
					var lng = coords.longitude;
					var accuracy = coords.accuracy;
					var latLonPoint = new mxn.LatLonPoint(lat, lng);

					// Remove existing My Location marker (if any)
					this.removeMyLocationMarker();

					// Add the My Location marker with accuracy circle
					this.createMyLocationMarker(latLonPoint, accuracy);

					// Move map around the marker only if the marker was already
					// centered
					if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
					{
						this.map.getMapstraction().endPan.removeHandler(this.endPanHandler, this);
						this.map.getMapstraction().endPan.addHandler(this.createEndPanHandler, this);
						this._center(latLonPoint);						
					}
				}
			}
		}
	},	
	/**
	 * Changes the position of the marker on the map. This method must be called
	 * when the status changes from DISABLED to MARKER_CENTERED.
	 */
	_handler: null,
	watchMyLocationMarkerPosition: function()
	{
		if (this.myCurrentLocationInstance)
		{
			// The method this.setCenterAndUpdateMarkerPosition must be called
			// whenever the user's current position changes.
			// 12-13674. We need to create the listener prior to calling watchUserLocation on myCurrentLocationInstance
			// because some errors may happen synchronously. When an error happens during the listenToUserLocation() call,
			// the error callback is executed before the handler is returned, so the myCurrentLocationInstance.removeListeners
			// tries to remove the listener using a handler that does not exist yet.
			this._handler = this.myCurrentLocationInstance.createListener(dojo.hitch(this, this.setCenterAndUpdateMarkerPosition), dojo.hitch(this, this.failedToGetLocation));
			this.myCurrentLocationInstance.listenToUserLocation(this._handler);
		}
	},
	/**
	 * Creates the My Location marker according to the specifications (blue dot
	 * with a blue hollow accuracy circle around it)
	 */
	convertedPoints:{},
	createMyLocationMarker: function(latLonPoint, accuracy)
	{

		var succFct = function(points)
		{
			var p = points[0];
			this.convertedPoints[latLonPoint]=p;
			var markerData = this.imageLibManager.getMyLocationMarkerImageInfo().generateMarkerData("");
			this.myLocationMarker = new mxn.Marker(p);
			this.createAccuracyCircle(p, accuracy);
			this.map.getMapstraction().addMarkerWithData(this.myLocationMarker, markerData);
		};
		var errFct = function(error)
		{
			console.error("error", error);
		};
		this.map.getMapstraction().getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));

		
	},
	_center:function(latLonPoint){
		var succFct = function(points)
		{
			var p = points[0];
			this.map.getMapstraction().setCenter(p);
		};
		var errFct = function(error)
		{
			console.error("error", error);
		};
		this.map.getMapstraction().getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));
	},
	/**
	 * Removes the My Location marker and the accuracy circle
	 */
	removeMyLocationMarker: function()
	{
		if (this.myLocationMarker)
		{
			this.map.getMapstraction().removeMarker(this.myLocationMarker);
			this.myLocationMarker = null;
		}
		if (this.lbsCircle)
		{
			this.map.getMapstraction().removePolyline(this.lbsCircle);
			this.lbsCircle = null;
		}
	},
	// Sends the error message to Maximo (according to specifications) and
	// resets the status of the tool
	failedToGetLocation: function()
	{
		if (this._executedAtLeastOnce == false)
		{
			this.map.failedToGetLocation();
			this.resetMyLocationTool();
		}
		else
		{
			// Send status message to maximo
			this.map.failedToGetLocationStatusMessages();
		}
	},
	/**
	 * Puts the tool in the DISABLED status and removes the marker
	 */
	resetMyLocationTool: function()
	{
		this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED;
		this.removeMyLocationMarker();
		this.stopWatchingMyLocationMarkerPosition();
		this._executedAtLeastOnce = false;
		this.setActive(false);
	},
	/**
	 * Disables the browser's watchPosition API
	 */
	stopWatchingMyLocationMarkerPosition: function()
	{
		if (this.myCurrentLocationInstance != null)
		{
			this.myCurrentLocationInstance.removeListeners(this._handler);
		}
	},
	/**
	 * This is an auxiliary handler that is added just before the setCenter()
	 * function. The purpose is to avoid the endPanHandler being triggered by
	 * the setCenter call.
	 */
	createEndPanHandler: function()
	{
		this.map.getMapstraction().endPan.removeHandler(this.createEndPanHandler, this);
		this.map.getMapstraction().endPan.addHandler(this.endPanHandler, this);
	},

	/**
	 * Handler function that changes the status of the tool from MARKER_CENTERED
	 * to MARKER_NOT_CENTERED whenever an endPan event is captured.
	 */
	endPanHandler: function(event_name, event_source, event_args)
	{
		if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
		{
			this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED;			
		}
		
	},
	// TODO: Refactor: this logic should be moved somewhere else
	createAccuracyCircle: function(point, accuracy)
	{
		if (this.lbsCircle == null)
		{
			var circle = new mxn.Radius(point, 10);
			var radiusInKms = (accuracy / 1000);
			if(this.lbsCircle){
				this.removeMyLocationMarker();
			}
			this.lbsCircle = circle.getPolyline(radiusInKms, "#C6DBEB");
			this.map.getMapstraction().addPolylineWithData(this.lbsCircle, {
				centerPoint: point,
				width: 3,
				opacity: 0.5,
				fillColor: "#D0E0EC",
				closed: true,
				radiusInKMs: radiusInKms
			});
		}
	}

});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/QueryUnassignedWorkTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");

/**
 * Query unassigned work tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "Unassigned Work Orders",
	iconClass: "basicMapToolbarBtn unassignedWorkOrderMapToolbarBtn",
	map: null,
	layerLabel: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "unassignedworktool");
		this.label = _label || this.label;
		this.addSubscription(dojo.subscribe("onQueryUnassignedWorkResult_" + this.map.getId(), dojo.hitch(this, this.queryReturned)));
		this.addSubscription(dojo.subscribe("onWorkAssigned_" + this.map.getId(), dojo.hitch(this, this.onWorkAssigned)));
		this.addSubscription(dojo.subscribe("onQueryUnassignedWorkCancel_" + this.map.getId(), dojo.hitch(this, this.cancelQuery)));
	},
	onWorkAssigned: function(data)
	{
		console.log("assigned!",data);
		
		if (this.isActive() == true)
		{
			dojo.publish("removeRecordsFromLayer_" + this.map.getId(), [ this.layerLabel, [data]]);	
		}
	},
	_lastQueryData: null,
	_lastQueryBounds: null,
	// Enables the Unassigned Work Orders tool (show unassigned work orders)
	executeOn: function()
	{
		this._lastQueryBounds = this.map.getMapstraction().getBounds();
		this.map.getMaximo().showQueryUnassignedWorkDialog(this._lastQueryBounds);
	},
	// Disables the Unassigned Work Orders tool (hides unassigned work orders)
	executeOff: function()
	{
		this._clearUnassignedLayer();
	},
	_clearUnassignedLayer: function()
	{
		if (this.layerLabel != null)
		{
			dojo.publish("removeLayer_" + this.map.getId(), [ this.layerLabel ]);
		}
	},
	// Handles the response from the server when the OK button is clicked
	queryReturned: function(data, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if(data==null){
			if (!isAutomaticRefresh)
			{
				this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
				this.setActive(false);
			}
			return;
		}
		this._lastQueryData = data.queryData;
		// If records were found, sends an event to create a layer and display
		// the records
		if (data.records.length == 0 && (!data.spatialEnabledRecords || data.spatialEnabledRecords.length == 0))
		{
			if (!isAutomaticRefresh)
			{
				if (data.error)
				{
					this.map.getMaximo().showMessage(data.error.group, data.error.key, [ data.error.params ]);
				}
				else
				{
					this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
				}
				this.setActive(false);
			}
		}
		else
		{
			this.layerLabel = data.layerLabel;
			if (data.spatialEnabledRecords != null && data.spatialEnabledRecords.length > 0)
			{
				var fct = function(mbos, errors)
				{
					console.log("mbos", mbos, errors);
					var records = data.records.concat(mbos);
					if (records.length == 0)
					{
						if (!isAutomaticRefresh)
						{
							this.setActive(false);
							this.map.getMaximo().showMessage("mapserver", "noworkordersinarea");
						}
					}
					else
					{
						this._addDefaultMarkerInfo(records);
						dojo.publish("addRecordsToLayer_" + this.map.getId(), [ data.layerLabel, records, true, null, null, avoidLayerEnabled ]);
					}
				};
				// handle spatial records
				this.map.filterRecordsInMapView(data.spatialEnabledRecords, dojo.hitch(this, fct));

			}
			else
			{
				var records = data.records;
				this._addDefaultMarkerInfo(records);
				dojo.publish("addRecordsToLayer_" + this.map.getId(), [ data.layerLabel, records, true, null, null, avoidLayerEnabled ]);
			}
		}

	},
	_addDefaultMarkerInfo: function(records)
	{
		var defaultUnassignedMarker = {
			"url": "../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/symbology/workorder/map_WO_Unassigned.png",
			"offsetx": 24,
			"offsety": 36,
			"width": 47,
			"height": 36
		};
		for ( var i in records)
		{
			records[i].ownDefaultMarker = defaultUnassignedMarker;
		}
	},
	// Handles the response from the server when the cancel button is clicked
	cancelQuery: function(data)
	{
		this.setActive(false);
	},
	disable: function()
	{
	},
	destroy: function()
	{
		this.destroyRecursive();
	}
});
});

},
'ibm/tivoli/fwm/mxmap/layers/LayerWidget':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayerWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayerWidget", [dijit._Widget, dijit._Templated], {	
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerWidget.html", "<div style=\"border: 1px solid #E0E0E0; border-bottom:0px\">\n<table style=\"width: 99%;height:35px;\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td data-dojo-attach-event=\"ondijitclick:_enableOrDisableLayer\" style=\"padding: 5px;\">\n\t\t\t\t<div data-dojo-attach-point=\"activeOrHiddenImage\"></div>\n\t\t\t</td>\n\t\t\t<td style=\"width: 90%;\" data-dojo-attach-event=\"ondijitclick:_enableOrDisableLayer\" >\n\t\t\t\t<div data-dojo-attach-point=\"layerInfo\"></div>\n\t\t\t</td>\n\t\t\t<td data-dojo-attach-event=\"ondijitclick:_showChildrenLayerWidget\" style=\"padding: 0px 4px 0px 12px; height: 35px;\">\n\t\t\t\t<div data-dojo-attach-point=\"submenu\" style=\"float:right;\"></div>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>"),
	layer: null,
	_layerLeftImageDom: null,
	_layerRightImageDom: null,
	layerPanel: null,
	_symbologyPanelManager: null,
	constructor:function(params){
		dojo.mixin(this, params);				
	},
	postCreate:function(){		
		this.layerInfo.innerHTML = this.layer.getLayerName();
		var leftIconURL = this.layer.getLeftIconURL();
		if(leftIconURL != null){
			this._layerLeftImageDom = dojo.create("img",{src: leftIconURL},this.activeOrHiddenImage, "only");
			dojo.style(this._layerLeftImageDom, {opacity: 1.0, visibility: "visible"});
		}
		var rightIconURL = this.layer.getRightIconURL();
		this._layerRightImageDom = dojo.create("img",{src: rightIconURL},this.submenu,"last");
		// If the layer has no right icon, make it invisible in order to avoid showing a broken image icon.
		if(rightIconURL == null){
			dojo.style(this._layerRightImageDom, {visibility: "hidden"});
		}
		dojo.style(this.layerInfo, "float", (document.body.dir == "rtl") ? "right" : "left");
	},
	_showChildrenLayerWidget: function(){
		if(this.layer.hasChildren() == true){
			var _childPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.layerPanel.map, title: this.layer.getChildrenTitle()});		
			_childPanelManager.updateLayers(this.layer.getChildren());
			this.layerPanel.close();
		}
	},
	_enableOrDisableLayer: function(){
		this.layer.toggleState();
		
		if(this.layerPanel){
			this.layerPanel.close();
		}	
	},
	destroyRecursive: function(){
		this.inherited(arguments);
		if(this._layerImageDom){
			dojo.destroy(this._layerImageDom);
		}
		if(this._layerRightImageDom){
			dojo.destroy(this._layerRightImageDom);
		}
	}
});

});

},
'dojo/uacss':function(){
define("dojo/uacss", ["./dom-geometry", "./_base/lang", "./ready", "./_base/sniff", "./_base/window"],
	function(geometry, lang, ready, has, baseWindow){
	// module:
	//		dojo/uacss
	// summary:
	//		Applies pre-set CSS classes to the top-level HTML node, based on:
	//			- browser (ex: dj_ie)
	//			- browser version (ex: dj_ie6)
	//			- box model (ex: dj_contentBox)
	//			- text direction (ex: dijitRtl)
	//
	//		In addition, browser, browser version, and box model are
	//		combined with an RTL flag when browser text is RTL. ex: dj_ie-rtl.

	var
		html = baseWindow.doc.documentElement,
		ie = has("ie"),
		opera = has("opera"),
		maj = Math.floor,
		ff = has("ff"),
		boxModel = geometry.boxModel.replace(/-/,''),

		classes = {
			"dj_ie": ie,
			"dj_ie6": maj(ie) == 6,
			"dj_ie7": maj(ie) == 7,
			"dj_ie8": maj(ie) == 8,
			"dj_ie9": maj(ie) == 9,
			"dj_quirks": has("quirks"),
			"dj_iequirks": ie && has("quirks"),

			// NOTE: Opera not supported by dijit
			"dj_opera": opera,

			"dj_khtml": has("khtml"),

			"dj_webkit": has("webkit"),
			"dj_safari": has("safari"),
			"dj_chrome": has("chrome"),

			"dj_gecko": has("mozilla"),
			"dj_ff3": maj(ff) == 3
		}; // no dojo unsupported browsers

	classes["dj_" + boxModel] = true;

	// apply browser, browser version, and box model class names
	var classStr = "";
	for(var clz in classes){
		if(classes[clz]){
			classStr += clz + " ";
		}
	}
	html.className = lang.trim(html.className + " " + classStr);

	// If RTL mode, then add dj_rtl flag plus repeat existing classes with -rtl extension.
	// We can't run the code below until the <body> tag has loaded (so we can check for dir=rtl).
	// priority is 90 to run ahead of parser priority of 100
	ready(90, function(){
		if(!geometry.isBodyLtr()){
			var rtlClassStr = "dj_rtl dijitRtl " + classStr.replace(/ /g, "-rtl ");
			html.className = lang.trim(html.className + " " + rtlClassStr + "dj_rtl dijitRtl " + classStr.replace(/ /g, "-rtl "));
		}
	});
	return has;
});

},
'dijit/Tooltip':function(){
require({cache:{
'url:dijit/templates/Tooltip.html':"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip", [
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/declare", // declare
	"dojo/_base/fx", // fx.fadeIn fx.fadeOut
	"dojo/dom", // dom.byId
	"dojo/dom-class", // domClass.add
	"dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
	"dojo/dom-style", // domStyle.set, domStyle.get
	"dojo/_base/lang", // lang.hitch lang.isArrayLike
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/window", // win.body
	"./_base/manager",	// manager.defaultDuration
	"./place",
	"./_Widget",
	"./_TemplatedMixin",
	"./BackgroundIframe",
	"dojo/text!./templates/Tooltip.html",
	"."		// sets dijit.showTooltip etc. for back-compat
], function(array, declare, fx, dom, domClass, domGeometry, domStyle, lang, has, win,
			manager, place, _Widget, _TemplatedMixin, BackgroundIframe, template, dijit){

/*=====
	var _Widget = dijit._Widget;
	var BackgroundIframe = dijit.BackgroundIframe;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/Tooltip
	// summary:
	//		Defines dijit.Tooltip widget (to display a tooltip), showTooltip()/hideTooltip(), and _MasterTooltip


	var MasterTooltip = declare("dijit._MasterTooltip", [_Widget, _TemplatedMixin], {
		// summary:
		//		Internal widget that holds the actual tooltip markup,
		//		which occurs once per page.
		//		Called by Tooltip widgets which are just containers to hold
		//		the markup
		// tags:
		//		protected

		// duration: Integer
		//		Milliseconds to fade in/fade out
		duration: manager.defaultDuration,

		templateString: template,

		postCreate: function(){
			win.body().appendChild(this.domNode);

			this.bgIframe = new BackgroundIframe(this.domNode);

			// Setup fade-in and fade-out functions.
			this.fadeIn = fx.fadeIn({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onShow") });
			this.fadeOut = fx.fadeOut({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onHide") });
		},

		show: function(innerHTML, aroundNode, position, rtl, textDir){
			// summary:
			//		Display tooltip w/specified contents to right of specified node
			//		(To left if there's no space on the right, or if rtl == true)
			// innerHTML: String
			//		Contents of the tooltip
			// aroundNode: DomNode || dijit.__Rectangle
			//		Specifies that tooltip should be next to this node / area
			// position: String[]?
			//		List of positions to try to position tooltip (ex: ["right", "above"])
			// rtl: Boolean?
			//		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
			//		means "rtl"; specifies GUI direction, not text direction.
			// textDir: String?
			//		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.


			if(this.aroundNode && this.aroundNode === aroundNode && this.containerNode.innerHTML == innerHTML){
				return;
			}

			// reset width; it may have been set by orient() on a previous tooltip show()
			this.domNode.width = "auto";

			if(this.fadeOut.status() == "playing"){
				// previous tooltip is being hidden; wait until the hide completes then show new one
				this._onDeck=arguments;
				return;
			}
			this.containerNode.innerHTML=innerHTML;
			
			this.set("textDir", textDir);
			this.containerNode.align = rtl? "right" : "left"; //fix the text alignment

			var pos = place.around(this.domNode, aroundNode,
				position && position.length ? position : Tooltip.defaultPosition, !rtl, lang.hitch(this, "orient"));

			// Position the tooltip connector for middle alignment.
			// This could not have been done in orient() since the tooltip wasn't positioned at that time.
			var aroundNodeCoords = pos.aroundNodePos;
			if(pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M'){
				this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
				this.connectorNode.style.left = "";
			}else if(pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M'){
				this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
			}

			// show it
			domStyle.set(this.domNode, "opacity", 0);
			this.fadeIn.play();
			this.isShowingNow = true;
			this.aroundNode = aroundNode;
		},

		orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ tooltipCorner, /*Object*/ spaceAvailable, /*Object*/ aroundNodeCoords){
			// summary:
			//		Private function to set CSS for tooltip node based on which position it's in.
			//		This is called by the dijit popup code.   It will also reduce the tooltip's
			//		width to whatever width is available
			// tags:
			//		protected
			this.connectorNode.style.top = ""; //reset to default

			//Adjust the spaceAvailable width, without changing the spaceAvailable object
			var tooltipSpaceAvaliableWidth = spaceAvailable.w - this.connectorNode.offsetWidth;

			node.className = "dijitTooltip " +
				{
					"MR-ML": "dijitTooltipRight",
					"ML-MR": "dijitTooltipLeft",
					"TM-BM": "dijitTooltipAbove",
					"BM-TM": "dijitTooltipBelow",
					"BL-TL": "dijitTooltipBelow dijitTooltipABLeft",
					"TL-BL": "dijitTooltipAbove dijitTooltipABLeft",
					"BR-TR": "dijitTooltipBelow dijitTooltipABRight",
					"TR-BR": "dijitTooltipAbove dijitTooltipABRight",
					"BR-BL": "dijitTooltipRight",
					"BL-BR": "dijitTooltipLeft"
				}[aroundCorner + "-" + tooltipCorner];

			// reduce tooltip's width to the amount of width available, so that it doesn't overflow screen
			this.domNode.style.width = "auto";
			var size = domGeometry.getContentBox(this.domNode);

			var width = Math.min((Math.max(tooltipSpaceAvaliableWidth,1)), size.w);
			var widthWasReduced = width < size.w;

			this.domNode.style.width = width+"px";

			//Adjust width for tooltips that have a really long word or a nowrap setting
			if(widthWasReduced){
				this.containerNode.style.overflow = "auto"; //temp change to overflow to detect if our tooltip needs to be wider to support the content
				var scrollWidth = this.containerNode.scrollWidth;
				this.containerNode.style.overflow = "visible"; //change it back
				if(scrollWidth > width){
					scrollWidth = scrollWidth + domStyle.get(this.domNode,"paddingLeft") + domStyle.get(this.domNode,"paddingRight");
					this.domNode.style.width = scrollWidth + "px";
				}
			}

			// Reposition the tooltip connector.
			if(tooltipCorner.charAt(0) == 'B' && aroundCorner.charAt(0) == 'B'){
				var mb = domGeometry.getMarginBox(node);
				var tooltipConnectorHeight = this.connectorNode.offsetHeight;
				if(mb.h > spaceAvailable.h){
					// The tooltip starts at the top of the page and will extend past the aroundNode
					var aroundNodePlacement = spaceAvailable.h - ((aroundNodeCoords.h + tooltipConnectorHeight) >> 1);
					this.connectorNode.style.top = aroundNodePlacement + "px";
					this.connectorNode.style.bottom = "";
				}else{
					// Align center of connector with center of aroundNode, except don't let bottom
					// of connector extend below bottom of tooltip content, or top of connector
					// extend past top of tooltip content
					this.connectorNode.style.bottom = Math.min(
						Math.max(aroundNodeCoords.h/2 - tooltipConnectorHeight/2, 0),
						mb.h - tooltipConnectorHeight) + "px";
					this.connectorNode.style.top = "";
				}
			}else{
				// reset the tooltip back to the defaults
				this.connectorNode.style.top = "";
				this.connectorNode.style.bottom = "";
			}

			return Math.max(0, size.w - tooltipSpaceAvaliableWidth);
		},

		_onShow: function(){
			// summary:
			//		Called at end of fade-in operation
			// tags:
			//		protected
			if(has("ie")){
				// the arrow won't show up on a node w/an opacity filter
				this.domNode.style.filter="";
			}
		},

		hide: function(aroundNode){
			// summary:
			//		Hide the tooltip

			if(this._onDeck && this._onDeck[1] == aroundNode){
				// this hide request is for a show() that hasn't even started yet;
				// just cancel the pending show()
				this._onDeck=null;
			}else if(this.aroundNode === aroundNode){
				// this hide request is for the currently displayed tooltip
				this.fadeIn.stop();
				this.isShowingNow = false;
				this.aroundNode = null;
				this.fadeOut.play();
			}else{
				// just ignore the call, it's for a tooltip that has already been erased
			}
		},

		_onHide: function(){
			// summary:
			//		Called at end of fade-out operation
			// tags:
			//		protected

			this.domNode.style.cssText="";	// to position offscreen again
			this.containerNode.innerHTML="";
			if(this._onDeck){
				// a show request has been queued up; do it now
				this.show.apply(this, this._onDeck);
				this._onDeck=null;
			}
		},
		
		_setAutoTextDir: function(/*Object*/node){
		    // summary:
		    //	    Resolve "auto" text direction for children nodes
		    // tags:
		    //		private

            this.applyTextDir(node, has("ie") ? node.outerText : node.textContent);
            array.forEach(node.children, function(child){this._setAutoTextDir(child); }, this);
		},
		
		_setTextDirAttr: function(/*String*/ textDir){
		    // summary:
		    //		Setter for textDir.
		    // description:
		    //		Users shouldn't call this function; they should be calling
		    //		set('textDir', value)
		    // tags:
		    //		private
	
            this._set("textDir", typeof textDir != 'undefined'? textDir : "");
    	    if (textDir == "auto"){
    	        this._setAutoTextDir(this.containerNode);
    	    }else{
    	        this.containerNode.dir = this.textDir;
    	    }  		             		        
        }
	});

	dijit.showTooltip = function(innerHTML, aroundNode, position, rtl, textDir){
		// summary:
		//		Static method to display tooltip w/specified contents in specified position.
		//		See description of dijit.Tooltip.defaultPosition for details on position parameter.
		//		If position is not specified then dijit.Tooltip.defaultPosition is used.
		// innerHTML: String
		//		Contents of the tooltip
		// aroundNode: dijit.__Rectangle
		//		Specifies that tooltip should be next to this node / area
		// position: String[]?
		//		List of positions to try to position tooltip (ex: ["right", "above"])
		// rtl: Boolean?
		//		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
		//		means "rtl"; specifies GUI direction, not text direction.
		// textDir: String?
		//		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.
		if(!Tooltip._masterTT){ dijit._masterTT = Tooltip._masterTT = new MasterTooltip(); }
		return Tooltip._masterTT.show(innerHTML, aroundNode, position, rtl, textDir);
	};

	dijit.hideTooltip = function(aroundNode){
		// summary:
		//		Static method to hide the tooltip displayed via showTooltip()
		return Tooltip._masterTT && Tooltip._masterTT.hide(aroundNode);
	};

	var Tooltip = declare("dijit.Tooltip", _Widget, {
		// summary:
		//		Pops up a tooltip (a help message) when you hover over a node.

		// label: String
		//		Text to display in the tooltip.
		//		Specified as innerHTML when creating the widget from markup.
		label: "",

		// showDelay: Integer
		//		Number of milliseconds to wait after hovering over/focusing on the object, before
		//		the tooltip is displayed.
		showDelay: 400,

		// connectId: String|String[]
		//		Id of domNode(s) to attach the tooltip to.
		//		When user hovers over specified dom node, the tooltip will appear.
		connectId: [],

		// position: String[]
		//		See description of `dijit.Tooltip.defaultPosition` for details on position parameter.
		position: [],

		_setConnectIdAttr: function(/*String|String[]*/ newId){
			// summary:
			//		Connect to specified node(s)

			// Remove connections to old nodes (if there are any)
			array.forEach(this._connections || [], function(nested){
				array.forEach(nested, lang.hitch(this, "disconnect"));
			}, this);

			// Make array of id's to connect to, excluding entries for nodes that don't exist yet, see startup()
			this._connectIds = array.filter(lang.isArrayLike(newId) ? newId : (newId ? [newId] : []),
					function(id){ return dom.byId(id); });

			// Make connections
			this._connections = array.map(this._connectIds, function(id){
				var node = dom.byId(id);
				return [
					this.connect(node, "onmouseenter", "_onHover"),
					this.connect(node, "onmouseleave", "_onUnHover"),
					this.connect(node, "onfocus", "_onHover"),
					this.connect(node, "onblur", "_onUnHover")
				];
			}, this);

			this._set("connectId", newId);
		},

		addTarget: function(/*DOMNODE || String*/ node){
			// summary:
			//		Attach tooltip to specified node if it's not already connected

			// TODO: remove in 2.0 and just use set("connectId", ...) interface

			var id = node.id || node;
			if(array.indexOf(this._connectIds, id) == -1){
				this.set("connectId", this._connectIds.concat(id));
			}
		},

		removeTarget: function(/*DomNode || String*/ node){
			// summary:
			//		Detach tooltip from specified node

			// TODO: remove in 2.0 and just use set("connectId", ...) interface

			var id = node.id || node,	// map from DOMNode back to plain id string
				idx = array.indexOf(this._connectIds, id);
			if(idx >= 0){
				// remove id (modifies original this._connectIds but that's OK in this case)
				this._connectIds.splice(idx, 1);
				this.set("connectId", this._connectIds);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);
			domClass.add(this.domNode,"dijitTooltipData");
		},

		startup: function(){
			this.inherited(arguments);

			// If this tooltip was created in a template, or for some other reason the specified connectId[s]
			// didn't exist during the widget's initialization, then connect now.
			var ids = this.connectId;
			array.forEach(lang.isArrayLike(ids) ? ids : [ids], this.addTarget, this);
		},

		_onHover: function(/*Event*/ e){
			// summary:
			//		Despite the name of this method, it actually handles both hover and focus
			//		events on the target node, setting a timer to show the tooltip.
			// tags:
			//		private
			if(!this._showTimer){
				var target = e.target;
				this._showTimer = setTimeout(lang.hitch(this, function(){this.open(target)}), this.showDelay);
			}
		},

		_onUnHover: function(/*Event*/ /*===== e =====*/){
			// summary:
			//		Despite the name of this method, it actually handles both mouseleave and blur
			//		events on the target node, hiding the tooltip.
			// tags:
			//		private

			// keep a tooltip open if the associated element still has focus (even though the
			// mouse moved away)
			if(this._focus){ return; }

			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			this.close();
		},

		open: function(/*DomNode*/ target){
 			// summary:
			//		Display the tooltip; usually not called directly.
			// tags:
			//		private

			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			Tooltip.show(this.label || this.domNode.innerHTML, target, this.position, !this.isLeftToRight(), this.textDir);

			this._connectNode = target;
			this.onShow(target, this.position);
		},

		close: function(){
			// summary:
			//		Hide the tooltip or cancel timer for show of tooltip
			// tags:
			//		private

			if(this._connectNode){
				// if tooltip is currently shown
				Tooltip.hide(this._connectNode);
				delete this._connectNode;
				this.onHide();
			}
			if(this._showTimer){
				// if tooltip is scheduled to be shown (after a brief delay)
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
		},

		onShow: function(/*===== target, position =====*/){
			// summary:
			//		Called when the tooltip is shown
			// tags:
			//		callback
		},

		onHide: function(){
			// summary:
			//		Called when the tooltip is hidden
			// tags:
			//		callback
		},

		uninitialize: function(){
			this.close();
			this.inherited(arguments);
		}
	});

	Tooltip._MasterTooltip = MasterTooltip;		// for monkey patching
	Tooltip.show = dijit.showTooltip;		// export function through module return value
	Tooltip.hide = dijit.hideTooltip;		// export function through module return value

	// dijit.Tooltip.defaultPosition: String[]
	//		This variable controls the position of tooltips, if the position is not specified to
	//		the Tooltip widget or *TextBox widget itself.  It's an array of strings with the following values:
	//
	//			* before: places tooltip to the left of the target node/widget, or to the right in
	//			  the case of RTL scripts like Hebrew and Arabic
	//			* after: places tooltip to the right of the target node/widget, or to the left in
	//			  the case of RTL scripts like Hebrew and Arabic
	//			* above: tooltip goes above target node
	//			* below: tooltip goes below target node
	//			* top: tooltip goes above target node but centered connector
	//			* bottom: tooltip goes below target node but centered connector
	//
	//		The list is positions is tried, in order, until a position is found where the tooltip fits
	//		within the viewport.
	//
	//		Be careful setting this parameter.  A value of "above" may work fine until the user scrolls
	//		the screen so that there's no room above the target node.   Nodes with drop downs, like
	//		DropDownButton or FilteringSelect, are especially problematic, in that you need to be sure
	//		that the drop down and tooltip don't overlap, even when the viewport is scrolled so that there
	//		is only room below (or above) the target node, but not both.
	Tooltip.defaultPosition = ["after", "before"];


	return Tooltip;
});

},
'dojo/string':function(){
define("dojo/string", ["./_base/kernel", "./_base/lang"], function(dojo, lang) {
	// module:
	//		dojo/string
	// summary:
	//		TODOC

lang.getObject("string", true, dojo);

/*=====
dojo.string = {
	// summary: String utilities for Dojo
};
=====*/

dojo.string.rep = function(/*String*/str, /*Integer*/num){
	// summary:
	//		Efficiently replicate a string `n` times.
	// str:
	//		the string to replicate
	// num:
	//		number of times to replicate the string

	if(num <= 0 || !str){ return ""; }

	var buf = [];
	for(;;){
		if(num & 1){
			buf.push(str);
		}
		if(!(num >>= 1)){ break; }
		str += str;
	}
	return buf.join("");	// String
};

dojo.string.pad = function(/*String*/text, /*Integer*/size, /*String?*/ch, /*Boolean?*/end){
	// summary:
	//		Pad a string to guarantee that it is at least `size` length by
	//		filling with the character `ch` at either the start or end of the
	//		string. Pads at the start, by default.
	// text:
	//		the string to pad
	// size:
	//		length to provide padding
	// ch:
	//		character to pad, defaults to '0'
	// end:
	//		adds padding at the end if true, otherwise pads at start
	// example:
	//	|	// Fill the string to length 10 with "+" characters on the right.  Yields "Dojo++++++".
	//	|	dojo.string.pad("Dojo", 10, "+", true);

	if(!ch){
		ch = '0';
	}
	var out = String(text),
		pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
	return end ? out + pad : pad + out;	// String
};

dojo.string.substitute = function(	/*String*/		template,
									/*Object|Array*/map,
									/*Function?*/	transform,
									/*Object?*/		thisObject){
	// summary:
	//		Performs parameterized substitutions on a string. Throws an
	//		exception if any parameter is unmatched.
	// template:
	//		a string with expressions in the form `${key}` to be replaced or
	//		`${key:format}` which specifies a format function. keys are case-sensitive.
	// map:
	//		hash to search for substitutions
	// transform:
	//		a function to process all parameters before substitution takes
	//		place, e.g. mylib.encodeXML
	// thisObject:
	//		where to look for optional format function; default to the global
	//		namespace
	// example:
	//		Substitutes two expressions in a string from an Array or Object
	//	|	// returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// by providing substitution data in an Array
	//	|	dojo.string.substitute(
	//	|		"File '${0}' is not found in directory '${1}'.",
	//	|		["foo.html","/temp"]
	//	|	);
	//	|
	//	|	// also returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// but provides substitution data in an Object structure.  Dotted
	//	|	// notation may be used to traverse the structure.
	//	|	dojo.string.substitute(
	//	|		"File '${name}' is not found in directory '${info.dir}'.",
	//	|		{ name: "foo.html", info: { dir: "/temp" } }
	//	|	);
	// example:
	//		Use a transform function to modify the values:
	//	|	// returns "file 'foo.html' is not found in directory '/temp'."
	//	|	dojo.string.substitute(
	//	|		"${0} is not found in ${1}.",
	//	|		["foo.html","/temp"],
	//	|		function(str){
	//	|			// try to figure out the type
	//	|			var prefix = (str.charAt(0) == "/") ? "directory": "file";
	//	|			return prefix + " '" + str + "'";
	//	|		}
	//	|	);
	// example:
	//		Use a formatter
	//	|	// returns "thinger -- howdy"
	//	|	dojo.string.substitute(
	//	|		"${0:postfix}", ["thinger"], null, {
	//	|			postfix: function(value, key){
	//	|				return value + " -- howdy";
	//	|			}
	//	|		}
	//	|	);

	thisObject = thisObject || dojo.global;
	transform = transform ?
		lang.hitch(thisObject, transform) : function(v){ return v; };

	return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
		function(match, key, format){
			var value = lang.getObject(key, false, map);
			if(format){
				value = lang.getObject(format, false, thisObject).call(thisObject, value, key);
			}
			return transform(value, key).toString();
		}); // String
};

/*=====
dojo.string.trim = function(str){
	// summary:
	//		Trims whitespace from both sides of the string
	// str: String
	//		String to be trimmed
	// returns: String
	//		Returns the trimmed string
	// description:
	//		This version of trim() was taken from [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript).
	//		The short yet performant version of this function is dojo.trim(),
	//		which is part of Dojo base.  Uses String.prototype.trim instead, if available.
	return "";	// String
}
=====*/

dojo.string.trim = String.prototype.trim ?
	lang.trim : // aliasing to the native function
	function(str){
		str = str.replace(/^\s+/, '');
		for(var i = str.length - 1; i >= 0; i--){
			if(/\S/.test(str.charAt(i))){
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	};

return dojo.string;
});

},
'url:dijit/templates/MenuSeparator.html':"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>",
'ibm/tivoli/fwm/mxmap/routing/RouterFactory':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.RouterFactory");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
/**
 * This class creates a new Router implementation based on the current map provider.
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.RouterFactory", ibm.tivoli.fwm.mxmap._Base, {
	provider:null,
	router:null,
	map:null,
	constructor:function(params){
		dojo.mixin(this,params);
	},
	createRouter:function(params){
		var routerName ="ibm.tivoli.fwm.mxmap.routing.impl."+this.provider;		
		var reqStr = "dojo." + "require('" + routerName+ "')"; // breaking up dojo. and require necessary to fool the dojo parser!
		
		eval(reqStr);
		//trying to keep one instance of bing maps only;
		if(this.provider=="bingmaps" && this.router!=null){
			console.log("bingmaps hit!");
			return this.router;
		}
		this._params=params;
		var itemDijitStr = " this._routerInstance = new ibm.tivoli.fwm.mxmap.routing.impl."+this.provider+"(this._params)";
		eval(itemDijitStr);
		if(this.provider=="bingmaps"){
			this.router=this._routerInstance;
		}
		return this._routerInstance;
	}	
});
});

},
'dijit/dijit':function(){
define("dijit/dijit", [
	".",
	"./_base",
	"dojo/parser",
	"./_Widget",
	"./_TemplatedMixin",
	"./_Container",
	"./layout/_LayoutWidget",
	"./form/_FormWidget",
	"./form/_FormValueWidget"
], function(dijit){

	// module:
	//		dijit/dijit
	// summary:
	//		A roll-up for common dijit methods
	//		All the stuff in _base (these are the function that are guaranteed available without an explicit dojo.require)
	//		And some other stuff that we tend to pull in all the time anyway

	return dijit;
});

},
'ibm/tivoli/fwm/mxmap/routing/itinerary/Leg':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated,ibm/tivoli/fwm/mxmap/routing/itinerary/Step,ibm/tivoli/fwm/mxmap/routing/Router"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
/**
 * 
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/Leg.html", "<div  style=\"width:100%;margin-bottom:10px;\">\n<div data-dojo-attach-point=\"distanceNode\" style=\"text-align: center;width: 100%;\"></div>\n<div data-dojo-attach-point=\"stepsNode\"></div>\n<div data-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"legInfo\" style=\"background-color: #FAFAFA;border: 1px solid #E0E0E0;margin: 1px;padding: 10px 2px;\">\n<span data-dojo-attach-point=\"markerNode\" style=\"float:left;margin-top:-10px\"></span>\n<span data-dojo-attach-point=\"endLocDescNode\"></span>\n</div>\n</div>"),
	location: null,
	info: null,
	marker: null,
	steps: [],
	stepWidgets: [],
	needsToGeocode: null,
	distanceToLeg: null,
	durationToLeg: null,
	distanceUnit: null,
	map: null,
	// Maximum icon width used to determine the margins left and right
	_maxMarkerImageWidth: 47,
	setMap: function(map)
	{
		this.map = map;
	},
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.steps = [];
		this.stepWidgets = [];
	},
	postCreate: function()
	{
		this.addressLoading = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_being_loaded");
		this.failedToLoadAddress = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_info_not_found");

		if (this.distanceToLeg != null)
		{

			this.distanceNode.innerHTML = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatDistance(this.distanceToLeg, this.distanceUnit);
			this.distanceNode.innerHTML += " - ";
		}
		if (this.durationToLeg != null)
		{
			this.distanceNode.innerHTML += ibm.tivoli.fwm.mxmap.routing.DistanceUnit.formatTime(this.durationToLeg);
		}
		if (this.marker != null)
		{
			dojo.create("img", {
				src: this.marker.iconUrl
			}, this.markerNode, "only");
			var markerLabel = this.marker.labelText;
			
			if (markerLabel)
			{
				var numberOfDigitsOffset = this._calculateLabelOffset(markerLabel);
				var _left;
				var _top;
				if (dojo.isIE)
				{
					// Workaround to overcome the IE "float left" problem
					_left = this.marker.attributes.iconAnchor[0] - numberOfDigitsOffset;
					_top = 6 - this.marker.attributes.iconSize[1];
				}
				else
				{
					_top = 9;
					_left = this.marker.attributes.iconAnchor[0] + 4 + numberOfDigitsOffset;
				}
				_left += "px";
				_top += "px";
				dojo.create("div", {
					innerHTML: markerLabel,
					style: {
						"float": "left",
						"left": _left,
						"top": _top,
						"position": "relative",
						"color": "white"
					}
				}, this.markerNode, "last");
			}
			// 12-12808. Adjust the markerNode width so that all markers in the route directions dialog are aligned
			var maxMarkerNodeMargin = Math.floor(this._maxMarkerImageWidth/2);
			var currentMarkerNodeMargin = this.marker.attributes.iconSize[0] - this.marker.attributes.iconAnchor[0];
			if(currentMarkerNodeMargin < maxMarkerNodeMargin)
			{
				var marginAdjustment = (maxMarkerNodeMargin - currentMarkerNodeMargin) + "px";
				dojo.style(this.markerNode, "marginLeft", marginAdjustment);
				dojo.style(this.markerNode, "marginRight", marginAdjustment);
			}
		}
		if (this.info || this.needsToGeocode == true)
		{
			if (this.needsToGeocode == true)
			{
				var fctSuccess = function(location)
				{
					var address = location[0].formattedAddress;
					this.endLocDescNode.innerHTML = address;
					this.needsToGeocode = false;
					this.info = address;
				};
				var fctError = function(location)
				{
					this.endLocDescNode.innerHTML = this.failedToLoadAddress;
				};
				this.map.geocoder.reverseGeocode(this.location.lat, this.location.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));
				this.endLocDescNode.innerHTML = this.addressLoading;
			}
			else
			{
				this.endLocDescNode.innerHTML = this.info;
			}
		}
		for ( var i = 0; i < this.steps.length; i++)
		{
			var step = this.steps[i];
			step.position = i + 1;
			step.distanceUnit = this.distanceUnit;
			step.map = this.map;
			step.closeDialog = this.closeDialog;
			var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Step(step, this.map);
			dojo.place(legWidget.domNode, this.stepsNode, 'last');
			this.stepWidgets.push(legWidget);
		}
	},
	_onClick: function(evt)
	{
		console.log("Clicked on leg ", this.location);
		this.map.getMapstraction().setCenter(this.location);
		this.closeDialog();

	},
	// Workaround to shift the label text (number) to the right in case it has more than 1 digit
	// in order to center it inside the marker image.
	_calculateLabelOffset: function(labelText)
	{
		var labelOffset = 0;
		var labelNumber = parseInt(labelText);
		if( (labelNumber/100) >= 1 )
		{
			labelOffset = 7;
		}
		else if((labelNumber/10) >= 1)
		{
			labelOffset = 4;
		}
		return labelOffset;
	}
});

});

},
'dijit/form/DropDownButton':function(){
require({cache:{
'url:dijit/form/templates/DropDownButton.html':"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/DropDownButton", [
	"dojo/_base/declare", // declare
	"dojo/_base/lang",	// hitch
	"dojo/query", // query
	"../registry",	// registry.byNode
	"../popup",		// dijit.popup2.hide
	"./Button",
	"../_Container",
	"../_HasDropDown",
	"dojo/text!./templates/DropDownButton.html"
], function(declare, lang, query, registry, popup, Button, _Container, _HasDropDown, template){

/*=====
	Button = dijit.form.Button;
	_Container = dijit._Container;
	_HasDropDown = dijit._HasDropDown;
=====*/

// module:
//		dijit/form/DropDownButton
// summary:
//		A button with a drop down


return declare("dijit.form.DropDownButton", [Button, _Container, _HasDropDown], {
	// summary:
	//		A button with a drop down
	//
	// example:
	// |	<button data-dojo-type="dijit.form.DropDownButton">
	// |		Hello world
	// |		<div data-dojo-type="dijit.Menu">...</div>
	// |	</button>
	//
	// example:
	// |	var button1 = new dijit.form.DropDownButton({ label: "hi", dropDown: new dijit.Menu(...) });
	// |	win.body().appendChild(button1);
	//

	baseClass : "dijitDropDownButton",

	templateString: template,

	_fillContent: function(){
		// Overrides Button._fillContent().
		//
		// My inner HTML contains both the button contents and a drop down widget, like
		// <DropDownButton>  <span>push me</span>  <Menu> ... </Menu> </DropDownButton>
		// The first node is assumed to be the button content. The widget is the popup.

		if(this.srcNodeRef){ // programatically created buttons might not define srcNodeRef
			//FIXME: figure out how to filter out the widget and use all remaining nodes as button
			//	content, not just nodes[0]
			var nodes = query("*", this.srcNodeRef);
			this.inherited(arguments, [nodes[0]]);

			// save pointer to srcNode so we can grab the drop down widget after it's instantiated
			this.dropDownContainer = this.srcNodeRef;
		}
	},

	startup: function(){
		if(this._started){ return; }

		// the child widget from srcNodeRef is the dropdown widget.  Insert it in the page DOM,
		// make it invisible, and store a reference to pass to the popup code.
		if(!this.dropDown && this.dropDownContainer){
			var dropDownNode = query("[widgetId]", this.dropDownContainer)[0];
			this.dropDown = registry.byNode(dropDownNode);
			delete this.dropDownContainer;
		}
		if(this.dropDown){
			popup.hide(this.dropDown);
		}

		this.inherited(arguments);
	},

	isLoaded: function(){
		// Returns whether or not we are loaded - if our dropdown has an href,
		// then we want to check that.
		var dropDown = this.dropDown;
		return (!!dropDown && (!dropDown.href || dropDown.isLoaded));
	},

	loadDropDown: function(/*Function*/ callback){
		// Default implementation assumes that drop down already exists,
		// but hasn't loaded it's data (ex: ContentPane w/href).
		// App must override if the drop down is lazy-created.
		var dropDown = this.dropDown;
		var handler = dropDown.on("load", lang.hitch(this, function(){
			handler.remove();
			callback();
		}));
		dropDown.refresh();		// tell it to load
	},

	isFocusable: function(){
		// Overridden so that focus is handled by the _HasDropDown mixin, not by
		// the _FormWidget mixin.
		return this.inherited(arguments) && !this._mouseDown;
	}
});

});

},
'dijit/form/_FormValueMixin':function(){
define("dijit/form/_FormValueMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/keys", // keys.ESCAPE
	"dojo/_base/sniff", // has("ie"), has("quirks")
	"./_FormWidgetMixin"
], function(declare, domAttr, keys, has, _FormWidgetMixin){

/*=====
	var _FormWidgetMixin = dijit.form._FormWidgetMixin;
=====*/

	// module:
	//		dijit/form/_FormValueMixin
	// summary:
	//		Mixin for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.

	return declare("dijit.form._FormValueMixin", _FormWidgetMixin, {
		// summary:
		//		Mixin for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.
		// description:
		//		Each _FormValueMixin represents a single input value, and has a (possibly hidden) <input> element,
		//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
		//		works as expected.

		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,

		_setReadOnlyAttr: function(/*Boolean*/ value){
			domAttr.set(this.focusNode, 'readOnly', value);
			this.focusNode.setAttribute("aria-readonly", value);
			this._set("readOnly", value);
		},

		postCreate: function(){
			this.inherited(arguments);

			if(has("ie")){ // IE won't stop the event with keypress
				this.connect(this.focusNode || this.domNode, "onkeydown", this._onKeyDown);
			}
			// Update our reset value if it hasn't yet been set (because this.set()
			// is only called when there *is* a value)
			if(this._resetValue === undefined){
				this._lastValueReported = this._resetValue = this.value;
			}
		},

		_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the widget.
			//		If the value has changed, then fire onChange event, unless priorityChange
			//		is specified as null (or false?)
			this._handleOnChange(newValue, priorityChange);
		},

		_handleOnChange: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Called when the value of the widget has changed.  Saves the new value in this.value,
			//		and calls onChange() if appropriate.   See _FormWidget._handleOnChange() for details.
			this._set("value", newValue);
			this.inherited(arguments);
		},

		undo: function(){
			// summary:
			//		Restore the value to the last value passed to onChange
			this._setValueAttr(this._lastValueReported, false);
		},

		reset: function(){
			// summary:
			//		Reset the widget's value to what it was at initialization time
			this._hasBeenBlurred = false;
			this._setValueAttr(this._resetValue, true);
		},

		_onKeyDown: function(e){
			if(e.keyCode == keys.ESCAPE && !(e.ctrlKey || e.altKey || e.metaKey)){
				var te;
				if(has("ie") < 9 || (has("ie") && has("quirks"))){
					e.preventDefault(); // default behavior needs to be stopped here since keypress is too late
					te = document.createEventObject();
					te.keyCode = keys.ESCAPE;
					te.shiftKey = e.shiftKey;
					e.srcElement.fireEvent('onkeypress', te);
				}
			}
		}
	});
});

},
'dijit/form/_FormWidgetMixin':function(){
define("dijit/form/_FormWidgetMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-style", // domStyle.get
	"dojo/_base/lang", // lang.hitch lang.isArray
	"dojo/mouse", // mouse.isLeft
	"dojo/_base/sniff", // has("webkit")
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.scrollIntoView
	"../a11y"	// a11y.hasDefaultTabStop
], function(array, declare, domAttr, domStyle, lang, mouse, has, win, winUtils, a11y){

// module:
//		dijit/form/_FormWidgetMixin
// summary:
//		Mixin for widgets corresponding to native HTML elements such as <checkbox> or <button>,
//		which can be children of a <form> node or a `dijit.form.Form` widget.

return declare("dijit.form._FormWidgetMixin", null, {
	// summary:
	//		Mixin for widgets corresponding to native HTML elements such as <checkbox> or <button>,
	//		which can be children of a <form> node or a `dijit.form.Form` widget.
	//
	// description:
	//		Represents a single HTML element.
	//		All these widgets should have these attributes just like native HTML input elements.
	//		You can set them during widget construction or afterwards, via `dijit._Widget.attr`.
	//
	//		They also share some common methods.

	// name: [const] String
	//		Name used when submitting form; same as "name" attribute or plain HTML elements
	name: "",

	// alt: String
	//		Corresponds to the native HTML <input> element's attribute.
	alt: "",

	// value: String
	//		Corresponds to the native HTML <input> element's attribute.
	value: "",

	// type: [const] String
	//		Corresponds to the native HTML <input> element's attribute.
	type: "text",

	// tabIndex: Integer
	//		Order fields are traversed when user hits the tab key
	tabIndex: "0",
	_setTabIndexAttr: "focusNode",	// force copy even when tabIndex default value, needed since Button is <span>

	// disabled: Boolean
	//		Should this widget respond to user input?
	//		In markup, this is specified as "disabled='disabled'", or just "disabled".
	disabled: false,

	// intermediateChanges: Boolean
	//		Fires onChange for each value change or only on demand
	intermediateChanges: false,

	// scrollOnFocus: Boolean
	//		On focus, should this widget scroll into view?
	scrollOnFocus: true,

	// Override _WidgetBase mapping id to this.domNode, needs to be on focusNode so <label> etc.
	// works with screen reader
	_setIdAttr: "focusNode",

	postCreate: function(){
		this.inherited(arguments);
		this.connect(this.domNode, "onmousedown", "_onMouseDown");
	},

	_setDisabledAttr: function(/*Boolean*/ value){
		this._set("disabled", value);
		domAttr.set(this.focusNode, 'disabled', value);
		if(this.valueNode){
			domAttr.set(this.valueNode, 'disabled', value);
		}
		this.focusNode.setAttribute("aria-disabled", value);

		if(value){
			// reset these, because after the domNode is disabled, we can no longer receive
			// mouse related events, see #4200
			this._set("hovering", false);
			this._set("active", false);

			// clear tab stop(s) on this widget's focusable node(s)  (ComboBox has two focusable nodes)
			var attachPointNames = "tabIndex" in this.attributeMap ? this.attributeMap.tabIndex :
				("_setTabIndexAttr" in this) ? this._setTabIndexAttr : "focusNode";
			array.forEach(lang.isArray(attachPointNames) ? attachPointNames : [attachPointNames], function(attachPointName){
				var node = this[attachPointName];
				// complex code because tabIndex=-1 on a <div> doesn't work on FF
				if(has("webkit") || a11y.hasDefaultTabStop(node)){	// see #11064 about webkit bug
					node.setAttribute('tabIndex', "-1");
				}else{
					node.removeAttribute('tabIndex');
				}
			}, this);
		}else{
			if(this.tabIndex != ""){
				this.set('tabIndex', this.tabIndex);
			}
		}
	},

	_onFocus: function(e){
		if(this.scrollOnFocus){
			winUtils.scrollIntoView(this.domNode);
		}
		this.inherited(arguments);
	},

	isFocusable: function(){
		// summary:
		//		Tells if this widget is focusable or not.  Used internally by dijit.
		// tags:
		//		protected
		return !this.disabled && this.focusNode && (domStyle.get(this.domNode, "display") != "none");
	},

	focus: function(){
		// summary:
		//		Put focus on this widget
		if(!this.disabled && this.focusNode.focus){
			try{ this.focusNode.focus(); }catch(e){}/*squelch errors from hidden nodes*/
		}
	},

	compare: function(/*anything*/ val1, /*anything*/ val2){
		// summary:
		//		Compare 2 values (as returned by get('value') for this widget).
		// tags:
		//		protected
		if(typeof val1 == "number" && typeof val2 == "number"){
			return (isNaN(val1) && isNaN(val2)) ? 0 : val1 - val2;
		}else if(val1 > val2){
			return 1;
		}else if(val1 < val2){
			return -1;
		}else{
			return 0;
		}
	},

	onChange: function(/*===== newValue =====*/){
		// summary:
		//		Callback when this widget's value is changed.
		// tags:
		//		callback
	},

	// _onChangeActive: [private] Boolean
	//		Indicates that changes to the value should call onChange() callback.
	//		This is false during widget initialization, to avoid calling onChange()
	//		when the initial value is set.
	_onChangeActive: false,

	_handleOnChange: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
		// summary:
		//		Called when the value of the widget is set.  Calls onChange() if appropriate
		// newValue:
		//		the new value
		// priorityChange:
		//		For a slider, for example, dragging the slider is priorityChange==false,
		//		but on mouse up, it's priorityChange==true.  If intermediateChanges==false,
		//		onChange is only called form priorityChange=true events.
		// tags:
		//		private
		if(this._lastValueReported == undefined && (priorityChange === null || !this._onChangeActive)){
			// this block executes not for a change, but during initialization,
			// and is used to store away the original value (or for ToggleButton, the original checked state)
			this._resetValue = this._lastValueReported = newValue;
		}
		this._pendingOnChange = this._pendingOnChange
			|| (typeof newValue != typeof this._lastValueReported)
			|| (this.compare(newValue, this._lastValueReported) != 0);
		if((this.intermediateChanges || priorityChange || priorityChange === undefined) && this._pendingOnChange){
			this._lastValueReported = newValue;
			this._pendingOnChange = false;
			if(this._onChangeActive){
				if(this._onChangeHandle){
					clearTimeout(this._onChangeHandle);
				}
				// setTimeout allows hidden value processing to run and
				// also the onChange handler can safely adjust focus, etc
				this._onChangeHandle = setTimeout(lang.hitch(this,
					function(){
						this._onChangeHandle = null;
						this.onChange(newValue);
					}), 0); // try to collapse multiple onChange's fired faster than can be processed
			}
		}
	},

	create: function(){
		// Overrides _Widget.create()
		this.inherited(arguments);
		this._onChangeActive = true;
	},

	destroy: function(){
		if(this._onChangeHandle){ // destroy called before last onChange has fired
			clearTimeout(this._onChangeHandle);
			this.onChange(this._lastValueReported);
		}
		this.inherited(arguments);
	},

	_onMouseDown: function(e){
		// If user clicks on the button, even if the mouse is released outside of it,
		// this button should get focus (to mimics native browser buttons).
		// This is also needed on chrome because otherwise buttons won't get focus at all,
		// which leads to bizarre focus restore on Dialog close etc.
		// IE exhibits strange scrolling behavior when focusing a node so only do it when !focused.
		// FF needs the extra help to make sure the mousedown actually gets to the focusNode
		if((!this.focused || !has("ie")) && !e.ctrlKey && mouse.isLeft(e) && this.isFocusable()){ // !e.ctrlKey to ignore right-click on mac
			// Set a global event to handle mouseup, so it fires properly
			// even if the cursor leaves this.domNode before the mouse up event.
			var mouseUpConnector = this.connect(win.body(), "onmouseup", function(){
				if(this.isFocusable()){
					this.focus();
				}
				this.disconnect(mouseUpConnector);
			});
		}
	}
});

});

},
'ibm/tivoli/fwm/mxmap/util/AddressCandidatesFormatter':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelLine"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine");
/**
 * @param candidates An array with objects that has formattedAddress attribute
 * @param mapId the of the geocoder's map.
 * @param dialog width
 * @param dialog height
 * @return a DOM object with the information
 * */
ibm.tivoli.fwm.mxmap.util.AddressCandidatesFormatter.createHTMLDOMWithList = function(candidates, mapId, width, height){
	var holder = dojo.create("div");

	// because of ie does not accept 100%, we do not use the table style
	// we use the dialog width -20 px
	var _width = width - 25;
	var table = dojo.create("table", {role: "grid", valign: "top", width:"100%", "class":"addressCandidateTable"}, holder, "last");
	
	// 12-10393: ie needs a tbody
	var tbody = dojo.create("tbody", {}, table, "last");	
	
	// creates a closure to capture the address
	var newPublishFunctionForAddress = function(selectedAddress){
		return function() { 
			dojo.publish("addressCandidateSelectedOnMapId_" + mapId, [selectedAddress]); 
		};
	};
	// as per designed, show only the first 10 candidates
	if(candidates.length > 10){
		candidates = candidates.slice(0, 10);
	}
	
	for(var index in candidates){
		var candidate = candidates[index];
		//var rowClass = index % 2 != 0 ? "tablerow trodd" : "tablerow  treven";  //breaks the horizontal scroll in small widths
		var rowClass = index % 2 != 0 ? "" : "addresscandidateRowStyle";
		var selectAddress = newPublishFunctionForAddress(candidate);
		var _content = candidate.formattedAddress;
		var newLine = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelLine();
		newLine.setRowClass(rowClass);
		newLine.setCallbackFunction(selectAddress);
		newLine.setContent(_content);
		newLine.placeAt(tbody, "last");
	}	
	return holder;
};
});

},
'ibm/tivoli/fwm/mxmap/routing/Route':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.Route");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
/**
 * This represents a route.<br>
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.Route", ibm.tivoli.fwm.mxmap._Base, {
	totalDuration: 0,
	inputInfo: null,
	totalDistance: 0,
	stops: [],
	legsData: null,
	routeBounds: null,
	copyrights: null,
	polyline: null,
	markers: null,
	map: null,
	itinerary: null,
	initialConf: null,
	originalRouter: null,
	distanceUnit: null,
	lineVisible: true,
	setItinerary: function(data)
	{
		this.itinerary = data;
	},
	customMarkerOptions: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		console.log("route created", params);
	},
	zoomToRoute: function()
	{
		try
		{
			this.map.getMapstraction().setBounds(this.getBounds());
		}
		catch (e)
		{
			console.error("zoom to route", e);
		}
	},
	getBounds: function()
	{
		if (this.routeBounds == null)
		{
			this.routeBounds = this.map.getMapstraction().getBoundingBoxFromPoints(this.polyline.points);
			this.routeBounds.merge(this.map.getMapstraction().getBoundingBoxFromPoints(this.stops));
		}
		return this.routeBounds;
	},
	clear: function()
	{
		// Removes all mbo markers (markers that do not belong to mbos will not
		// be removed at this point)
		for ( var i = 0; i < this.inputInfo.stops.length; i++)
		{
			try
			{
				if (this.inputInfo.stops[i].calculatedStop != true)
				{
					this.map.removeMboFromLayerManager(this.inputInfo.stops[i]);
				}
			}
			catch (e)
			{
				console.log("Removing non existing mbo marker");
			}
		}

		this.hideCalculatedMarkers();
		this.markers = null;
		if (this.polyline)
		{
			try
			{
				this.map.getMapstraction().removePolyline(this.polyline);
			}
			catch (e)
			{
				console.error("cannot remove polyline");
			}
		}

	},
	show: function()
	{
		if (this.lineVisible)
		{
			this.map.getMapstraction().addPolyline(this.polyline);
		}
		if (this.markers == null)
		{
			this._createMarkers();
		}
	},
	redraw: function()
	{
		this.clear();
		this.show();
	},
	_addMarker: function(/* LatLngPoint */p, stopNum)
	{
		console.log("[mxmap.routing.Route._addMarker] Adding Marker: ", stopNum);
		var m = new mxn.Marker(p);
		m.label = String(stopNum);

		// Get either the start position or the end position marker depending on
		// the stopNum
		var markerInfo = (stopNum > 0) ? ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getEndPositionMarkerImageInfo() : ibm.tivoli.fwm.mxmap.ImageLibraryManager
				.getImageLibraryManager().getStartPositionMarkerImageInfo();

		var aa = {
			label: "",
			tooltip: "",
			draggable: false,
			icon: markerInfo.getImageURL(),
			iconSize: markerInfo.getImageSize(),
			iconAnchor: markerInfo.getImageAnchor(),
			hover: true
		};
		this.map.getMapstraction().addMarkerWithData(m, aa);
		return m;
	},
	_woStopNumber: 1,
	_addNewMarker: function(index)
	{
		if (this.inputInfo.stops[index].calculatedStop != true)
		{
			// this is a stop based on a mbo

			console.log(index, "mbo stop", this.stops[index], this.inputInfo.stops[index]);

			var mboStop = this.inputInfo.stops[index];

			mboStop.routeInfo = {
				stopNumber: index
			};
			var usedIndex = index;
			var fct = function(marker)
			{
				this.markers[usedIndex] = marker;
			};
			var label = "";
			var tooltip = "";

			if (mboStop && mboStop.mxdata && (mboStop.mxdata.mboName == "WORKORDER" || mboStop.mxdata.extendsMboName == "WORKORDER"))
			{
				if (this.map.isMobile != true)
				{
					tooltip = mboStop.mxdata.attributes.wonum;
				}

				label = String(this._woStopNumber++);
			}

			var markerOptions = {
				"draggable": false,
				"enableMapTips": true,
				"label": label,
				"tooltip": tooltip,
				"color": this.originalRouter.routecolor,
				"markerReferenceCallback": dojo.hitch(this, fct)
			};
			this.map.addMboToLayerManager(mboStop, markerOptions);

		}
		else
		{
			// this is a configured stop or user location

			console.log(index, "calculated stop", this.stops[index], this.inputInfo.stops[index]);

			var m = this._addMarker(this.stops[index], index);

			this.markers[index] = m;
			this.markers[index].calculated = true;
		}
	},
	getMarkerForStop: function(index)
	{
		if (this.markers != null && this.markers.length > index)
		{
			return this.markers[index];
		}
		else
		{
			console.log("no marker for index ", index);
			return null;
		}
	},
	_createMarkers: function()
	{
		this.markers = [];
		var initialLocation = this.itinerary.getInitialLocation();
		var stopNum = 1;

		console.log("debug", this.stops, this.itinerary);

		if (initialLocation)
		{
			var p = initialLocation.location;
			this._addNewMarker(0);
			// initialLocation.marker = m;
			// this.markers.push(m);
		}
		for ( var i = 1; i < this.stops.length; i++)
		{
			var p = this.stops[i];

			this._addNewMarker(i);

		}
	},
	avoidTollsSupported: true,
	setSupportAvoidToll: function(supported)
	{
		this.avoidTollsSupported = supported;
	},
	avoidHighwaysSupported: true,
	setSupportAvoidHighway: function(supported)
	{
		this.avoidHighwaysSupported = supported;
	},
	hideCalculatedMarkers: function()
	{
		// Removes all remaining markers
		if (this.markers != null)
		{
			for ( var i = 0; i < this.markers.length; i++)
			{
				try
				{
					if (this.markers[i].calculated == true)
					{
						this.map.getMapstraction().removeMarker(this.markers[i]);
					}
				}
				catch (e)
				{
					console.log("Removing non existing marker");
				}
			}

		}

	},
	showCalculatedMarkers: function()
	{
		// Removes all remaining markers
		if (this.markers != null)
		{
			for ( var i = 0; i < this.markers.length; i++)
			{
				try
				{
					if (this.markers[i].calculated == true)
					{
						var m = this._addMarker(this.stops[i], i);
						this.markers[i] = m;
						this.markers[i].calculated = true;
					}
				}
				catch (e)
				{
					console.log("error readding marker", e);
				}
			}

		}
	},
	setLineVisible: function(visible)
	{
		if (visible == this.lineVisible)
		{
			return;
		}
		this.lineVisible = visible;
		if (this.lineVisible == true)
		{
			this.map.getMapstraction().addPolyline(this.polyline);
		}
		else
		{
			this.map.getMapstraction().removePolyline(this.polyline);
		}
		// this.redraw();
	}
});
});

},
'ibm/tivoli/fwm/mxmap/routing/impl/spatial':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/routing/Router,ibm/tivoli/fwm/mxmap/routing/Route"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.spatial");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");
/**
 * Maximo spatial maps routing implementation.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.spatial", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	map: null,
	_stopSymbol: null,
	_routeSymbol: null,
	_spatialReference: null,
	_esriMap: null,
	_spatialReference: null,
	conf: null,
	_lastStop: null,
	_routeParams: null,
	_successCallback: null,
	_failureCallback: null,
	_routeLimits: 10,
	_oldWGS84Point: null,
	constructor: function(params)
	{
		console.log("Router esri", params);
		dojo.mixin(this, params);// will set conf and map
		this.directionsService = new esri.tasks.RouteTask(this.routeUrl);

		// setting stop symbols
		this._stopSymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
		this._stopSymbol.outline.setWidth(4);
		// setting route line symbols

		if (this.routecolor.indexOf("#") != 0)
		{
			this.routecolor = "#" + this.routecolor;
		}
		this._routeSymbol = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color()).setWidth(this.routeLineWidth);
		this._esriMap = this.map.getMapstraction().getProviderMap();
		this._spatialReference = this._esriMap.spatialReference;

	},
	/*
	 * Final route step, calls callback function with routeSummary params
	 */
	_onSolveRoute: function(routeSummary, callback)
	{
		if (callback)
		{
			callback(routeSummary);
		}
	},
	_routeFailed: function(error, errCb, errorCode)
	{

		console.log("route failed", error);
		if (errCb)
		{
			if (!errorCode)
			{
				errorCode = ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN;
			}
			errCb(errorCode, error);
		}
	},
	/**
	 * Based on a lat/lng it creates an esri geometry point.
	 * 
	 * @param lat
	 * @param lng
	 * @returns
	 */
	_createStop: function(lat, lng, text)
	{
		var mappoint = new esri.geometry.Point(lng, lat, this._spatialReference);

		var ss = new esri.symbol.TextSymbol(text).setColor(new dojo.Color([ 256, 0, 0 ])).setAlign(esri.symbol.Font.ALIGN_START).setFont(
				new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));
		var stop = new esri.Graphic(mappoint, ss);
		if (window.DEBUGLEVEL && window.DEBUGLEVEL > 1)
		{
			this.map.getMapstraction().getProviderMap().graphics.add(stop);
		}

		return stop;

	},

	/*
	 * prepare params in order to avoid any esri route limit.
	 */
	_prepareParams: function(start, offset, stops)
	{
		this._routeParams.stops = new esri.tasks.FeatureSet();
		console.info("offset", start, offset, "/", stops.length);
		for ( var i = start; i < offset; i++)
		{
			var stop = stops[i];
			var stopEsri = null;
			if (stop.hasOwnProperty("gisdata") == true)
			{
				var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});

				console.log("mbo SPATIAL? AUTOSPATIAL? stop", mxrec.hasSPATIALCoordinates(), mxrec.hasAutolocateSpatialData(), stop);

				if (mxrec.hasSPATIALCoordinates())
				{
					var point = this.map.getPointFromMboInfo(mxrec.mboInfo);
					stopEsri = this._createStop(point.lat, point.lng, i);
				}
				else if (mxrec.hasGISCoordinates())
				{
					stopEsri = this._createStop(stop.gisdata.lat, stop.gisdata.lng, i);
				}
				else if (mxrec.hasAutolocateSpatialData())
				{
					var point = this.map.getPointFromMboInfo(mxrec.mboInfo.autolocate);
					stopEsri = this._createStop(point.lat, point.lng, i);
				}
				else if (mxrec.hasAutolocateGISCoordinates())
				{
					stopEsri = this._createStop(stop.autolocate.gisdata.lat, stop.autolocate.gisdata.lng, i);
				}
				else
				{
					console.warn("Stop doesn't have gis coords", stop);
				}
			}

			else
			{
				console.log("stop is calculated", stop);
				if (stop.lat == null)
				{
					console.error("stop does not have lat/lng", stop);
				}
				else
				{
					stopEsri = this._createStop(stop.lat, stop.lng, i);
				}
			}

			this._routeParams.stops.features.push(stopEsri);
		}

	},
	/**
	 * converst a si
	 */
	_getStops2LatLng: function(stops)
	{
		var lls = [];
		for ( var index = 0; index < stops.length; index++)
		{
			lls.push(new mxn.LatLonPoint(stops[index].lat, stops[index].lng));
		}
		return lls;
	},
	/**
	 * Executes the routing on esri maps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	showRoute: function(stops, successCb, failCb)
	{
		// first step, check if any stop is a FEATURE CLASS if so need to get
		// it's X/Y from server
		if (this._checkIfAnyFeaturedClass(stops) == true)
		{
			var fct = function()
			{
				this._showRouteAllPointsWithXY(stops, successCb, failCb);
			};
			this._convertAnyFeatureStop(stops, dojo.hitch(this, fct), failCb);
		}
		else
		{
			console.log("ALL Features have XY");
			this._showRouteAllPointsWithXY(stops, successCb, failCb);
		}

	},
	_convertAnyFeatureStop: function(stops, callback, errCallback)
	{
		

		var stopsToConvert = [];
		for ( var j = 0; j < stops.length; j++)
		{
			var stop = stops[j];
			if (stop.calculatedStop == null)
			{
				var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});
				if (mxrec.hasSPATIALCoordinates() == true)
				{
					stopsToConvert.push(stop);
				}
				else if (mxrec.hasAutolocateSpatialData())
				{
					stopsToConvert.push(stop.autolocate);
				}
				else
				{
					console.warn("no SPATIAL GIS info for stop ", stop);
				}

			}
		}
		var test = function(args)
		{
			callback();
		};
		this.map.queryMultipleRecordsAtOnce(stopsToConvert, test, errCallback);
		/*
		 * var stop = stops[i]; while (stop.calculatedStop == true ||
		 * stops.length == i) { i++; stop = stops[i]; }
		 * 
		 * var convertedFC = function(args) { if (args != null && stop != null) {
		 * 
		 * console.log("args", args);
		 * 
		 * if (!args.features || !args.features[0]) { var error = {
		 * errormessage: "Cannot find geomery for feature", stop: stop }; if
		 * (errCallback) { errCallback(error); } else {
		 * console.error(errCallback); } return; } // need this to update mbo
		 * data var point = this.map._updateMboInfo(stop, args);
		 * 
		 * var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({ mboInfo: stop, map:
		 * this.map });
		 * 
		 * i++; stop = stops[i]; }
		 * 
		 * while (i < stops.length && (stop.gisdata.PLUSSISGIS != true &&
		 * (stop.autolocate == null || stop.autolocate.gisdata.PLUSSISGIS ==
		 * false))) { i++; stop = stops[i]; }
		 * 
		 * console.log("stop", stop, i, stops.length);
		 * 
		 * if (stops.length <= i) { callback(); } else { var mxrec = new
		 * ibm.tivoli.fwm.mxmap.MXRecord({ mboInfo: stop, map: this.map }); if
		 * (mxrec.hasSPATIALCoordinates() == true) {
		 * this.map._queryMapsServiceForMboGeometry(stop, dojo.hitch(this,
		 * convertedFC), errCallback); } else { if
		 * (mxrec.hasAutolocateSpatialData()) {
		 * this.map._queryMapsServiceForMboGeometry(stop.autolocate,
		 * dojo.hitch(this, convertedFC), errCallback); } else {
		 * console.warn("no GIS info for stop ", stop); } }
		 *  }
		 *  };
		 * 
		 * var d = dojo.hitch(this, convertedFC); d();
		 */
	},// maybe merge it in maximospatial.js
	_checkIfAnyFeaturedClass: function(stops)
	{
		for ( var i in stops)
		{
			var stop = stops[i];
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});

			if (mxrec.hasSPATIALCoordinates() || (mxrec.hasGISCoordinates() == false && mxrec.hasAutolocateSpatialData() == true))
			{
				return true;
			}
		}
	},
	_retrieveStopInfo: function(pt, mboInfo, legIndex, itinerary, geocodeCache)
	{
		var txt = "";
		if (mboInfo.mxdata != null && mboInfo.mxdata.attributes != null && mboInfo.mxdata.attributes.formattedaddress != null && mboInfo.mxdata.attributes.formattedaddress.length > 0)
		{
			geocodeCache[pt] = mboInfo.mxdata.attributes.formattedaddress;
			txt = geocodeCache[pt];
		}
		else
		{
			// geocode it
			var legIndex = itinerary.legs.length;
			var fctSuccess = function(location)
			{
				var address = location[0].formattedAddress;
				if (legIndex >= 0)
				{
					itinerary.legs[legIndex].info = address;
				}
				else
				{
					itinerary.initialLocation.info = address;
				}
				geocodeCache[pt] = address;
			};
			var fctError = function(error)
			{
				console.error("could not find leg ", legIndex, "info");
			};
			this.map.geocoder.reverseGeocode(pt.lat, pt.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));

		}
		return txt;

	},
	_getLatLngFromStop: function(mboInfo)
	{
		var pt = {};
		if (mboInfo.calculatedStop == true)
		{
			pt.lat = mboInfo.lat;
			pt.lng = mboInfo.lng;
		}
		else
		{
			var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: mboInfo,
				map: this.map
			});
			console.log("mxrec", mxrec.hasGISCoordinates(), mxrec.hasAutolocateGISOnlyCoordinates());
			if (mxrec.hasAutolocateGISOnlyCoordinates())
			{
				pt.lat = mboInfo.autolocate.gisdata.lat;
				pt.lng = mboInfo.autolocate.gisdata.lng;
			}
			else
			{
				pt.lat = mboInfo.gisdata.lat;
				pt.lng = mboInfo.gisdata.lng;
			}
		}
		return pt;
	},

	_showRouteAllPointsWithXY: function(stops, successCb, failCb)
	{

		this._routeParams = new esri.tasks.RouteParameters();
		if (dojo.config.fwm.debug == true)
		{
			console.info("stops", stops.length, {
				stops: stops
			});
		}

		this._routeParams.outSpatialReference = new esri.SpatialReference({
			wkid: this._spatialReference
		});

		this._routeParams.returnDirections = true;
		if (this.isOptimizeRoute())
		{
			// makes optimization but does not change 1st and last stops
			this._routeParams.findBestSequence = true;
			this._routeParams.preserveFirstStop = true;
			this._routeParams.preserveLastStop = true;

		}
		this._routeParams.directionsLengthUnits = "esriKilometers";// Always in
		// km

		this._routeParams.returnRoutes = true;
		this._routeParams.returnStops = true;
		var offset = 0;
		var routeSummary = {
			totalDuration: 0,
			totalDistance: 0,
			stops: [],
			legsData: null,
			polyline: null,
			copyrights: "",
			map: this.map
		};
		var polylinePoints = [];
		var th = this._startTimer();
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var start = 0;
		var successFct = function(solveResult)
		{
			console.log("solveResult", solveResult);
			this._stopTimer(th, stops.length);
			if (solveResult.messages && solveResult.messages.length > 0)
			{
				// not sure what to do.. the routing task never fails, just add
				// messages to the solve result AND documentation is still TBA
				// :(
				// http://help.arcgis.com/en/webapi/javascript/arcgis/help/jsapi/routetask.htm#onSolveComplete
				console.warn("Route service returend the following messages :");
				for ( var i = 0; i < solveResult.messages.length; i++)
				{
					var msg = solveResult.messages[i];
					console.warn(msg.description, msg);
				}
				if (msg.type == 50)
				{
					this._routeFailed(msg, failCb, ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS);
					return;
				}
			}
			var directions = solveResult.routeResults[0].directions;

			var steps = [];
			var c = 1;
			var legDistance = 0.0;
			var legDuration = 0.0;
			var flagEndStart = false;

			console.log("total route stops", solveResult.routeResults[0].directions.features.length);
			for ( var i in solveResult.routeResults[0].directions.features)
			{
				var feature = solveResult.routeResults[0].directions.features[i];

				var step = {
					distance: feature.attributes.length,
					duration: feature.attributes.time,
					info: feature.attributes.text,
					location: this.map._getLatLngFromFeature(feature)
				};
				steps.push(step);
				legDistance += feature.attributes.length;
				legDuration += feature.attributes.time;
				// check if this i the last step of a leg
				if (flagEndStart == true && feature.attributes.length == 0)
				{
					console.log("Ok leg completed ", legDuration);
					var pt = this.map._getLatLngFromFeature(feature);

					var txt = feature.attributes.text;
					console.log("legs ", itinerary.legs.length, stops[itinerary.legs.length + 1]);

					var lpos = itinerary.addLeg(pt, txt, legDistance, legDuration, null, steps, null);
					var sInfo = stops[lpos + 1];
					var needsToGeocode = true;
					if (sInfo.mxdata)
					{
						var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
							mboInfo: sInfo,
							map: this.map
						});
						if (mxrec.hasGISCoordinates() == true || mxrec.hasSPATIALCoordinates() == true)
						{
							if (mxrec.hasAddress() == true)
							{
								needsToGeocode = false;
								itinerary.legs[lpos].info = mxrec.mboInfo.gisdata.address;
							}
						}
						else if (mxrec.hasAutolocateGISOnlyCoordinates() == true || mxrec.hasAutolocateSpatialData() == true)
						{
							var autolocateMboInfo = sInfo.autolocate;
							if (autolocateMboInfo.gisdata.address != null && autolocateMboInfo.gisdata.address.length > 0)
							{
								needsToGeocode = false;
								itinerary.legs[lpos].info = autolocateMboInfo.gisdata.address;
							}
						}
					}
					itinerary.legs[lpos].needsToGeocode = needsToGeocode;

					steps = [];
					legDistance = 0;
					legDuration = 0;
					c++;
					flagEndStart = false;

				}
				else if (flagEndStart == false && feature.attributes.length == 0)
				{
					flagEndStart = true;
				}
			}

			if (start == 0)
			{
				var geom = solveResult.routeResults[0].directions.features[0].geometry;
				var pt = this.map._getLatLngFromFeature(solveResult.routeResults[0].directions.features[0]);
				var txt = solveResult.routeResults[0].directions.features[0].attributes.text;
				itinerary.setInitialLocation(txt, pt, null, null, true);

			}
			// add this esriroute polyline to the main route polyline points
			// array;
			var pol = new mxn.Polyline();
			pol.fromProprietary(this.map.getMapstraction().api, directions.mergedGeometry);
			polylinePoints = polylinePoints.concat(pol.points);

			// sum total distance and time
			routeSummary.totalDistance += directions.totalLength;
			routeSummary.totalDuration += directions.totalTime;

			// if we still have stops to be added
			if (offset < stops.length)
			{
				start = offset - 1;
				offset = offset + this._routeLimits;
				if (offset > stops.length)
				{
					offset = stops.length;
				}
				if ((offset - start) >= this._routeLimits)
				{
					offset--;
				}
				this._prepareParams(start, offset, stops);
				th = this._startTimer(th, stops.length);
				var errorFctAux = function(error)
				{
					this._routeFailed(error, failCb);
				};
				this.directionsService.solve(this._routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));

			}
			else
			{
				routeSummary.itinerary = itinerary;
				routeSummary.inputInfo = {
					stops: stops,
					successCb: successCb,
					errorCb: failCb
				};
				routeSummary.originalRouter = this;
				routeSummary.distanceUnit = this.getCurrentDistanceUnit();
				// all route stops were calculated
				var poly = new mxn.Polyline(polylinePoints);
				poly.addData({
					color: this.routecolor,
					opacity: this.routeOpacity,
					width: this.routeLineWidth
				});
				routeSummary.polyline = poly;
				routeSummary.stops = this._getStops2LatLng(stops);

				var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routeSummary);
				routeInfo.setSupportAvoidToll(false);
				routeInfo.setSupportAvoidHighway(false);

				this._onSolveRoute(routeInfo, successCb);
				if (dojo.config.fwm.debug == true)
				{
					console.info("stopsEnd", {
						stops: stops
					});
				}
				this._stopTimer(null, stops.length);
			}

		};

		if (stops.length > this._routeLimits)
		{

			offset = offset + this._routeLimits;
		}
		else
		{
			offset = stops.length;
		}

		this._prepareParams(start, offset, stops);

		if (this._routeParams.stops.features.length >= 2)
		{
			var errorFctAux = function(error)
			{
				this._routeFailed(error, failCb);
			};
			this.directionsService.solve(this._routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));
			// this._lastStop = this._routeParams.stops.features.splice(0,
			// 1)[0];
		}

	},
	/**
	 * This intercepts the user location call and converts it to spatial
	 * coordinate system.
	 */
	getUserLocation: function(callback, errorCb)
	{
		if (this.myCurrentLocationInstance)
		{
			var errorCallback = function()
			{
				if (this.map)
				{
					this.map.failedToGetLocation();
				}
				errorCb();
			};
			var success = function()
			{
				this._convertToSpatialCoordSystem(callback);
			};

			this.myCurrentLocationInstance.getUserLocation(dojo.hitch(this, success), dojo.hitch(this, errorCallback));
		}
	},
	_convertToSpatialCoordSystem: function(callback)
	{
		var storeConvertedPoint = function(point)
		{
			this.myCurrentLocationInstance._esriSRLatLng = point;
			this.myCurrentLocationInstance._oldWGS84Point = this.myCurrentLocationInstance.getPosition();
			if (callback)
			{
				callback();
			}
		};
		this.myCurrentLocationInstance.convertPositionToMapPoint(this.map, dojo.hitch(this, storeConvertedPoint));
	},
	_isESRIUpToDate: function()
	{
		var currPosition = this.myCurrentLocationInstance.getPosition();
		var esriRefPoint = this.myCurrentLocationInstance._oldWGS84Point;
		if (esriRefPoint == null)
		{
			this._convertToSpatialCoordSystem();
			return false;
		}
		if (currPosition.coords != esriRefPoint.coords)
		{
			this._convertToSpatialCoordSystem();
			return false;
		}
		return true;
	},
	/**
	 * we must convert the w3c position into the same map spatial reference.
	 */
	_getUserLocationStop: function()
	{
		return this.myCurrentLocationInstance._esriSRLatLng;
	},
	isLocationStatusUnassigned: function()
	{
		if (this.myCurrentLocationInstance.isStatusHasLocation())
		{
			return !this.isLocationStatusHasLocation();
		}
		return this.inherited(arguments);
	},
	isLocationStatusHasLocation: function()
	{
		if (this.myCurrentLocationInstance.isStatusHasLocation())
		{
			return this._isESRIUpToDate();
		}
		return this.inherited(arguments);

	}

});
});

},
'ibm/tivoli/fwm/mxmap/UserSessionManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.UserSessionManager");
/**
 * 
 */
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.declare("ibm.tivoli.fwm.mxmap.UserSessionManager", ibm.tivoli.fwm.mxmap._Base, {
	map:null,
	lastUserLocation:null,
	constructor: function(params)
	{
		dojo.mixin(this, params);

		dojo.addOnUnload(dojo.hitch(this, this.onMapExit));
		
		if(this.map.getSessionData() && this.map.getSessionData().lastUserLocation){			
			this.lastUserLocation=dojo.fromJson(this.map.getSessionData().lastUserLocation);
		}
		console.log(this.lastUserLocation);
	},
	hasLastUserLocation:function(){
		if(this.lastUserLocation!=null && this.lastUserLocation.lat && this.lastUserLocation.lng){
			return true;
		}
		return false;
	},
	getLastUserLocation:function(){
		return this.lastUserLocation;
	},
	
	onMapExit:function(){
		var mapstraction = this.map.getMapstraction();
		if(mapstraction){
			var locInfo ={				
					lat: mapstraction.getCenter().lat,
					lng: mapstraction.getCenter().lng,
					level: mapstraction.getZoom(),
					customData:this.map.getInitialLocationCustomInfo()
			};
			console.info("[UserSessionManager] Saving Location", locInfo);
			this.map.getMaximo().storeUserLocation(locInfo);
		}else{
			console.info("[UserSessionManager] Could not save location. Mapstraction is null.");
		}
	}
});
});

},
'ibm/tivoli/fwm/mxmap/MXRecord':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.MXRecord");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

dojo
		.declare(
				"ibm.tivoli.fwm.mxmap.MXRecord",
				ibm.tivoli.fwm.mxmap._Base,
				{
					mboInfo: null,
					map: null,

					markerImgUrl: null,
					markerImgInfo: null,
					lbsMarker: null,
					lbsMarkerImgInfo: null,
					lbsCircle: null,
					imageLibManager: null,
					isMboOnMap: false,
					constructor: function(options)
					{
						dojo.mixin(this, options);
						// this.imageLibManager =
						// ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
					},

					/**
					 * Checks if the currrent SA record has an address
					 * 
					 * @returns true if it has any address different than ""
					 */
					hasAddress: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata && this.mboInfo.gisdata.address != null && this.mboInfo.gisdata.address != "");
					},
					hasGISCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata != null && this.mboInfo.gisdata.lat != null && this.mboInfo.gisdata.lng != null);
					},
					hasAutolocateGISCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.lng != null)
								|| this.hasAutolocateSpatialData();
					},
					hasAutolocateGISOnlyCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.lng != null);
					},
					hasAutolocateSpatialData: function()
					{
						return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null && this.mboInfo.autolocate.gisdata.PLUSSISGIS != null && this.mboInfo.autolocate.gisdata.PLUSSISGIS == true);
					},
					hasAnyGISCoordinates: function()
					{
						return this.hasGISCoordinates() || this.hasAutolocateGISCoordinates() || this.hasSPATIALCoordinates();
					},
					hasLBSCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.lbsdata && this.mboInfo.lbsdata.lat != null);
					},
					hasSPATIALCoordinates: function()
					{
						return (this.mboInfo && this.mboInfo.gisdata != null && this.mboInfo.gisdata.PLUSSISGIS == true);
					},
					_removeMarker: function()
					{
						console.log("[mxmap.MXRecord._removeMarker] calling map.removeMboMarker " + this.mboInfo.mxdata.uid.value);
						this.map.removeMboMarker(this.mboInfo);
						this.isMboOnMap = false;
					},
					/**
					 * Triggered always that any new data from server is
					 * received. It will update the current representation of
					 * the current record on the map.
					 */
					serverUpdated: function(data)
					{
						console.log("MXRecord.serverUpdated ");
						this.mboInfo = data;
						this.isMboOnMap = false;
						this._updateMarkerLocation(data);
					},
					/**
					 * Updates the current marker based on the new location
					 * data. It also publishes the event that the current record
					 * location has been updated thru 'onCurrentLocationUpdated'
					 * event
					 */
					_updateMarkerLocation: function(newMboInfo, noZoom)
					{
						console.log("[MXrecord] Updating  Location ", newMboInfo);
						this._removeMarker();
						this.mboInfo = newMboInfo;
						if (this.hasAnyGISCoordinates())
						{
							this._placeMarker();
							if (noZoom != true)
							{
								this.center();
							}
						}

					},

					/**
					 * Places a marker for the current record. Also adds a
					 * handler for dragging event of this marker.
					 */
					_placeMarker: function()
					{

						this.map.addMboToLayerManager(this.mboInfo);
						this.isMboOnMap = true;
					},

					/**
					 * Center the map over the current record
					 */
					center: function()
					{
						this.centerAndZoom();
					},

					/**
					 * Center the map over the current record and zoom.
					 * 
					 * @param zoom
					 *            level
					 */
					centerAndZoom: function(zoomLevel)
					{
						if (this.hasAnyGISCoordinates())
						{
							console.log("[MXRecord] About to center and zoom on record on marker");
							if (this.isMboOnMap == false)
							{
								this._placeMarker();
							}

							this.map.centerOnMbo(this.mboInfo, zoomLevel);

						}
					},
					getMXLatLng: function()
					{
						return new mxn.LatLonPoint(this.mboInfo.gisdata.lat, this.mboInfo.gisdata.lng);
					},
					/* 12-100070 */
					_isDraggable: function()
					{
						if (this.mboInfo.gisdata && this.mboInfo.gisdata.flags && this.mboInfo.gisdata.flags.readonly == true)
						{
							return false;
						}
						return (this.draggable && this.draggable == true);
					},
					hide: function()
					{
						console.log("[MXRecord] hiding marker", this);

					},
					remove: function()
					{
						this._removeMarker();
					},
					show: function()
					{
						if (this.isMboOnMap == false)
						{
							if (this.hasAnyGISCoordinates() == true)
							{
								this._placeMarker();

							}
						}
					}
				});
});

},
'dijit/layout/_ContentPaneResizeMixin':function(){
define("dijit/layout/_ContentPaneResizeMixin", [
	"dojo/_base/array", // array.filter array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr",	// domAttr.has
	"dojo/dom-class",	// domClass.contains domClass.toggle
	"dojo/dom-geometry",// domGeometry.contentBox domGeometry.marginBox
	"dojo/_base/lang", // lang.mixin
	"dojo/query", // query
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/window", // win.global
	"../registry",	// registry.byId
	"./utils",	// marginBox2contextBox
	"../_Contained"
], function(array, declare, domAttr, domClass, domGeometry, lang, query, has, win,
			registry, layoutUtils, _Contained){

/*=====
var _Contained = dijit._Contained;
=====*/

// module:
//		dijit/layout/_ContentPaneResizeMixin
// summary:
//		Resize() functionality of ContentPane.   If there's a single layout widget
//		child then it will call resize() with the same dimensions as the ContentPane.
//		Otherwise just calls resize on each child.


return declare("dijit.layout._ContentPaneResizeMixin", null, {
	// summary:
	//		Resize() functionality of ContentPane.   If there's a single layout widget
	//		child then it will call resize() with the same dimensions as the ContentPane.
	//		Otherwise just calls resize on each child.
	//
	//		Also implements basic startup() functionality, where starting the parent
	//		will start the children

	// doLayout: Boolean
	//		- false - don't adjust size of children
	//		- true - if there is a single visible child widget, set it's size to
	//				however big the ContentPane is
	doLayout: true,

	// isLayoutContainer: [protected] Boolean
	//		Indicates that this widget will call resize() on it's child widgets
	//		when they become visible.
	isLayoutContainer: true,

	startup: function(){
		// summary:
		//		See `dijit.layout._LayoutWidget.startup` for description.
		//		Although ContentPane doesn't extend _LayoutWidget, it does implement
		//		the same API.

		if(this._started){ return; }

		var parent = this.getParent();
		this._childOfLayoutWidget = parent && parent.isLayoutContainer;

		// I need to call resize() on my child/children (when I become visible), unless
		// I'm the child of a layout widget in which case my parent will call resize() on me and I'll do it then.
		this._needLayout = !this._childOfLayoutWidget;

		this.inherited(arguments);

		if(this._isShown()){
			this._onShow();
		}

		if(!this._childOfLayoutWidget){
			// If my parent isn't a layout container, since my style *may be* width=height=100%
			// or something similar (either set directly or via a CSS class),
			// monitor when my size changes so that I can re-layout.
			// For browsers where I can't directly monitor when my size changes,
			// monitor when the viewport changes size, which *may* indicate a size change for me.
			this.connect(has("ie") ? this.domNode : win.global, 'onresize', function(){
				// Using function(){} closure to ensure no arguments to resize.
				this._needLayout = !this._childOfLayoutWidget;
				this.resize();
			});
		}
	},

	_checkIfSingleChild: function(){
		// summary:
		//		Test if we have exactly one visible widget as a child,
		//		and if so assume that we are a container for that widget,
		//		and should propagate startup() and resize() calls to it.
		//		Skips over things like data stores since they aren't visible.

		var childNodes = query("> *", this.containerNode).filter(function(node){
				return node.tagName !== "SCRIPT"; // or a regexp for hidden elements like script|area|map|etc..
			}),
			childWidgetNodes = childNodes.filter(function(node){
				return domAttr.has(node, "data-dojo-type") || domAttr.has(node, "dojoType") || domAttr.has(node, "widgetId");
			}),
			candidateWidgets = array.filter(childWidgetNodes.map(registry.byNode), function(widget){
				return widget && widget.domNode && widget.resize;
			});

		if(
			// all child nodes are widgets
			childNodes.length == childWidgetNodes.length &&

			// all but one are invisible (like dojo.data)
			candidateWidgets.length == 1
		){
			this._singleChild = candidateWidgets[0];
		}else{
			delete this._singleChild;
		}

		// So we can set overflow: hidden to avoid a safari bug w/scrollbars showing up (#9449)
		domClass.toggle(this.containerNode, this.baseClass + "SingleChild", !!this._singleChild);
	},

	resize: function(changeSize, resultSize){
		// summary:
		//		See `dijit.layout._LayoutWidget.resize` for description.
		//		Although ContentPane doesn't extend _LayoutWidget, it does implement
		//		the same API.

		// For the TabContainer --> BorderContainer --> ContentPane case, _onShow() is
		// never called, so resize() is our trigger to do the initial href download (see [20099]).
		// However, don't load href for closed TitlePanes.
		if(!this._wasShown && this.open !== false){
			this._onShow();
		}

		this._resizeCalled = true;

		this._scheduleLayout(changeSize, resultSize);
	},

	_scheduleLayout: function(changeSize, resultSize){
		// summary:
		//		Resize myself, and call resize() on each of my child layout widgets, either now
		//		(if I'm currently visible) or when I become visible
		if(this._isShown()){
			this._layout(changeSize, resultSize);
		}else{
			this._needLayout = true;
			this._changeSize = changeSize;
			this._resultSize = resultSize;
		}
	},

	_layout: function(changeSize, resultSize){
		// summary:
		//		Resize myself according to optional changeSize/resultSize parameters, like a layout widget.
		//		Also, since I am a Container widget, each of my children expects me to
		//		call resize() or layout() on them.
		//
		//		Should be called on initialization and also whenever we get new content
		//		(from an href, or from set('content', ...))... but deferred until
		//		the ContentPane is visible

		// Set margin box size, unless it wasn't specified, in which case use current size.
		if(changeSize){
			domGeometry.setMarginBox(this.domNode, changeSize);
		}

		// Compute content box size of containerNode in case we [later] need to size our single child.
		var cn = this.containerNode;
		if(cn === this.domNode){
			// If changeSize or resultSize was passed to this method and this.containerNode ==
			// this.domNode then we can compute the content-box size without querying the node,
			// which is more reliable (similar to LayoutWidget.resize) (see for example #9449).
			var mb = resultSize || {};
			lang.mixin(mb, changeSize || {}); // changeSize overrides resultSize
			if(!("h" in mb) || !("w" in mb)){
				mb = lang.mixin(domGeometry.getMarginBox(cn), mb); // just use domGeometry.setMarginBox() to fill in missing values
			}
			this._contentBox = layoutUtils.marginBox2contentBox(cn, mb);
		}else{
			this._contentBox = domGeometry.getContentBox(cn);
		}

		this._layoutChildren();

		delete this._needLayout;
	},

	_layoutChildren: function(){
		// Call _checkIfSingleChild() again in case app has manually mucked w/the content
		// of the ContentPane (rather than changing it through the set("content", ...) API.
		if(this.doLayout){
			this._checkIfSingleChild();
		}

		if(this._singleChild && this._singleChild.resize){
			var cb = this._contentBox || domGeometry.getContentBox(this.containerNode);

			// note: if widget has padding this._contentBox will have l and t set,
			// but don't pass them to resize() or it will doubly-offset the child
			this._singleChild.resize({w: cb.w, h: cb.h});
		}else{
			// All my child widgets are independently sized (rather than matching my size),
			// but I still need to call resize() on each child to make it layout.
			array.forEach(this.getChildren(), function(widget){
				if(widget.resize){
					widget.resize();
				}
			});
		}
	},

	_isShown: function(){
		// summary:
		//		Returns true if the content is currently shown.
		// description:
		//		If I am a child of a layout widget then it actually returns true if I've ever been visible,
		//		not whether I'm currently visible, since that's much faster than tracing up the DOM/widget
		//		tree every call, and at least solves the performance problem on page load by deferring loading
		//		hidden ContentPanes until they are first shown

		if(this._childOfLayoutWidget){
			// If we are TitlePane, etc - we return that only *IF* we've been resized
			if(this._resizeCalled && "open" in this){
				return this.open;
			}
			return this._resizeCalled;
		}else if("open" in this){
			return this.open;		// for TitlePane, etc.
		}else{
			var node = this.domNode, parent = this.domNode.parentNode;
			return (node.style.display != 'none') && (node.style.visibility != 'hidden') && !domClass.contains(node, "dijitHidden") &&
					parent && parent.style && (parent.style.display != 'none');
		}
	},

	_onShow: function(){
		// summary:
		//		Called when the ContentPane is made visible
		// description:
		//		For a plain ContentPane, this is called on initialization, from startup().
		//		If the ContentPane is a hidden pane of a TabContainer etc., then it's
		//		called whenever the pane is made visible.
		//
		//		Does layout/resize of child widget(s)

		if(this._needLayout){
			// If a layout has been scheduled for when we become visible, do it now
			this._layout(this._changeSize, this._resultSize);
		}

		this.inherited(arguments);

		// Need to keep track of whether ContentPane has been shown (which is different than
		// whether or not it's currently visible).
		this._wasShown = true;
	}
});

});

},
'dijit/WidgetSet':function(){
define("dijit/WidgetSet", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/declare", // declare
	"dojo/_base/window", // win.global
	"./registry"	// to add functions to dijit.registry
], function(array, declare, win, registry){

	// module:
	//		dijit/WidgetSet
	// summary:
	//		Legacy registry code.   New modules should just use registry.
	//		Will be removed in 2.0.

	var WidgetSet = declare("dijit.WidgetSet", null, {
		// summary:
		//		A set of widgets indexed by id. A default instance of this class is
		//		available as `dijit.registry`
		//
		// example:
		//		Create a small list of widgets:
		//		|	var ws = new dijit.WidgetSet();
		//		|	ws.add(dijit.byId("one"));
		//		| 	ws.add(dijit.byId("two"));
		//		|	// destroy both:
		//		|	ws.forEach(function(w){ w.destroy(); });
		//
		// example:
		//		Using dijit.registry:
		//		|	dijit.registry.forEach(function(w){ /* do something */ });

		constructor: function(){
			this._hash = {};
			this.length = 0;
		},

		add: function(/*dijit._Widget*/ widget){
			// summary:
			//		Add a widget to this list. If a duplicate ID is detected, a error is thrown.
			//
			// widget: dijit._Widget
			//		Any dijit._Widget subclass.
			if(this._hash[widget.id]){
				throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
			}
			this._hash[widget.id] = widget;
			this.length++;
		},

		remove: function(/*String*/ id){
			// summary:
			//		Remove a widget from this WidgetSet. Does not destroy the widget; simply
			//		removes the reference.
			if(this._hash[id]){
				delete this._hash[id];
				this.length--;
			}
		},

		forEach: function(/*Function*/ func, /* Object? */thisObj){
			// summary:
			//		Call specified function for each widget in this set.
			//
			// func:
			//		A callback function to run for each item. Is passed the widget, the index
			//		in the iteration, and the full hash, similar to `array.forEach`.
			//
			// thisObj:
			//		An optional scope parameter
			//
			// example:
			//		Using the default `dijit.registry` instance:
			//		|	dijit.registry.forEach(function(widget){
			//		|		console.log(widget.declaredClass);
			//		|	});
			//
			// returns:
			//		Returns self, in order to allow for further chaining.

			thisObj = thisObj || win.global;
			var i = 0, id;
			for(id in this._hash){
				func.call(thisObj, this._hash[id], i++, this._hash);
			}
			return this;	// dijit.WidgetSet
		},

		filter: function(/*Function*/ filter, /* Object? */thisObj){
			// summary:
			//		Filter down this WidgetSet to a smaller new WidgetSet
			//		Works the same as `array.filter` and `NodeList.filter`
			//
			// filter:
			//		Callback function to test truthiness. Is passed the widget
			//		reference and the pseudo-index in the object.
			//
			// thisObj: Object?
			//		Option scope to use for the filter function.
			//
			// example:
			//		Arbitrary: select the odd widgets in this list
			//		|	dijit.registry.filter(function(w, i){
			//		|		return i % 2 == 0;
			//		|	}).forEach(function(w){ /* odd ones */ });

			thisObj = thisObj || win.global;
			var res = new WidgetSet(), i = 0, id;
			for(id in this._hash){
				var w = this._hash[id];
				if(filter.call(thisObj, w, i++, this._hash)){
					res.add(w);
				}
			}
			return res; // dijit.WidgetSet
		},

		byId: function(/*String*/ id){
			// summary:
			//		Find a widget in this list by it's id.
			// example:
			//		Test if an id is in a particular WidgetSet
			//		| var ws = new dijit.WidgetSet();
			//		| ws.add(dijit.byId("bar"));
			//		| var t = ws.byId("bar") // returns a widget
			//		| var x = ws.byId("foo"); // returns undefined

			return this._hash[id];	// dijit._Widget
		},

		byClass: function(/*String*/ cls){
			// summary:
			//		Reduce this widgetset to a new WidgetSet of a particular `declaredClass`
			//
			// cls: String
			//		The Class to scan for. Full dot-notated string.
			//
			// example:
			//		Find all `dijit.TitlePane`s in a page:
			//		|	dijit.registry.byClass("dijit.TitlePane").forEach(function(tp){ tp.close(); });

			var res = new WidgetSet(), id, widget;
			for(id in this._hash){
				widget = this._hash[id];
				if(widget.declaredClass == cls){
					res.add(widget);
				}
			 }
			 return res; // dijit.WidgetSet
		},

		toArray: function(){
			// summary:
			//		Convert this WidgetSet into a true Array
			//
			// example:
			//		Work with the widget .domNodes in a real Array
			//		|	array.map(dijit.registry.toArray(), function(w){ return w.domNode; });

			var ar = [];
			for(var id in this._hash){
				ar.push(this._hash[id]);
			}
			return ar;	// dijit._Widget[]
		},

		map: function(/* Function */func, /* Object? */thisObj){
			// summary:
			//		Create a new Array from this WidgetSet, following the same rules as `array.map`
			// example:
			//		|	var nodes = dijit.registry.map(function(w){ return w.domNode; });
			//
			// returns:
			//		A new array of the returned values.
			return array.map(this.toArray(), func, thisObj); // Array
		},

		every: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `array.every` acting explicitly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first false return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || win.global;
			var x = 0, i;
			for(i in this._hash){
				if(!func.call(thisObj, this._hash[i], x++, this._hash)){
					return false; // Boolean
				}
			}
			return true; // Boolean
		},

		some: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `array.some` acting explicitly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first true return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || win.global;
			var x = 0, i;
			for(i in this._hash){
				if(func.call(thisObj, this._hash[i], x++, this._hash)){
					return true; // Boolean
				}
			}
			return false; // Boolean
		}

	});

	// Add in 1.x compatibility methods to dijit.registry.
	// These functions won't show up in the API doc but since they are deprecated anyway,
	// that's probably for the best.
	array.forEach(["forEach", "filter", "byClass", "map", "every", "some"], function(func){
		registry[func] = WidgetSet.prototype[func];
	});


	return WidgetSet;
});

},
'dijit/nls/loading':function(){
define({ root:
//begin v1.x content
({
	loadingState: "Loading...",
	errorState: "Sorry, an error occurred"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"hr": true,
"he": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"az": true,
"ar": true
});

},
'ibm/tivoli/fwm/mxmap/CurrentMXRecordSet':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/MXRecord"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.MXRecord");

/**
 * Controls the set of records (SA) that are on the map.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	records: null,
	mxRecords: null,
	mboInfoArray: null,
	markerImgUrl: null,
	_hidden: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.mxRecords = [];
		this.mboInfoArray = [];
		// this.records = new ibm.tivoli.fwm.mxmap.MXRecordSet({map: this.map,
		// records: this.records, markerImgUrl: this.markerImgUrl});
		this.addSubscription(dojo.subscribe("onCurrentRecordSetUpdated_" + this.map.getId(), dojo.hitch(this, this.updateRecordSetAndRefresh)));
		if (this.records != null)
		{
			this.updateRecordSet(this.records);
		}
	},
	isEmpty: function()
	{
		if (this.mxRecords)
		{
			for ( var id in this.mxRecords)
			{
				return false;
			}
		}
		return true;
	},
	centerAndZoom: function()
	{
		this.map.zoomToMbos(this.mboInfoArray);
	},
	showMXRecordsOnMap: function(noZoom)
	{
		var markerOptions = {
			"enableMapTips": true
		};

		this.map.showAllMboRecords(this.mboInfoArray, markerOptions, noZoom != true);
		this._hidden = false;
	},
	updateRecordSetAndRefresh: function(newRecords, noZoom)
	{
		this.updateRecordSet(newRecords);
		this.showMXRecordsOnMap(noZoom);
	},
	length: function()
	{
		return this.mxRecords.length;
	},
	updateRecordSet: function(newRecords)
	{
		while (this.mxRecords.length > 0)
		{
			var mxRec = this.mxRecords.pop();
			mxRec._removeMarker();
		}

		this.records = newRecords;
		this.mxRecords = [];
		this.mboInfoArray = [];
		for ( var id in this.records)
		{
			var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: this.records[id],
				map: this.map
			});
			if (mxRec.hasAnyGISCoordinates())
			{
				this.mxRecords.push(mxRec);
				this.mboInfoArray.push(this.records[id]);
			}
		}
	},

	destroyRecursive: function()
	{
		this.inherited(arguments);

	}
});
});

},
'dojo/dnd/Moveable':function(){
define("dojo/dnd/Moveable", ["../main", "../Evented", "../touch", "./Mover"], function(dojo, Evented, touch) {
	// module:
	//		dojo/dnd/Moveable
	// summary:
	//		TODOC


/*=====
dojo.declare("dojo.dnd.__MoveableArgs", [], {
	// handle: Node||String
	//		A node (or node's id), which is used as a mouse handle.
	//		If omitted, the node itself is used as a handle.
	handle: null,

	// delay: Number
	//		delay move by this number of pixels
	delay: 0,

	// skip: Boolean
	//		skip move of form elements
	skip: false,

	// mover: Object
	//		a constructor of custom Mover
	mover: dojo.dnd.Mover
});
=====*/

dojo.declare("dojo.dnd.Moveable", [Evented], {
	// object attributes (for markup)
	handle: "",
	delay: 0,
	skip: false,

	constructor: function(node, params){
		// summary:
		//		an object, which makes a node moveable
		// node: Node
		//		a node (or node's id) to be moved
		// params: dojo.dnd.__MoveableArgs?
		//		optional parameters
		this.node = dojo.byId(node);
		if(!params){ params = {}; }
		this.handle = params.handle ? dojo.byId(params.handle) : null;
		if(!this.handle){ this.handle = this.node; }
		this.delay = params.delay > 0 ? params.delay : 0;
		this.skip  = params.skip;
		this.mover = params.mover ? params.mover : dojo.dnd.Mover;
		this.events = [
			dojo.connect(this.handle, touch.press, this, "onMouseDown"),
			// cancel text selection and text dragging
			dojo.connect(this.handle, "ondragstart",   this, "onSelectStart"),
			dojo.connect(this.handle, "onselectstart", this, "onSelectStart")
		];
	},

	// markup methods
	markupFactory: function(params, node, ctor){
		return new ctor(node, params);
	},

	// methods
	destroy: function(){
		// summary:
		//		stops watching for possible move, deletes all references, so the object can be garbage-collected
		dojo.forEach(this.events, dojo.disconnect);
		this.events = this.node = this.handle = null;
	},

	// mouse event processors
	onMouseDown: function(e){
		// summary:
		//		event processor for onmousedown/ontouchstart, creates a Mover for the node
		// e: Event
		//		mouse/touch event
		if(this.skip && dojo.dnd.isFormElement(e)){ return; }
		if(this.delay){
			this.events.push(
				dojo.connect(this.handle, touch.move, this, "onMouseMove"),
				dojo.connect(this.handle, touch.release, this, "onMouseUp")
			);
			this._lastX = e.pageX;
			this._lastY = e.pageY;
		}else{
			this.onDragDetected(e);
		}
		dojo.stopEvent(e);
	},
	onMouseMove: function(e){
		// summary:
		//		event processor for onmousemove/ontouchmove, used only for delayed drags
		// e: Event
		//		mouse/touch event
		if(Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay){
			this.onMouseUp(e);
			this.onDragDetected(e);
		}
		dojo.stopEvent(e);
	},
	onMouseUp: function(e){
		// summary:
		//		event processor for onmouseup, used only for delayed drags
		// e: Event
		//		mouse event
		for(var i = 0; i < 2; ++i){
			dojo.disconnect(this.events.pop());
		}
		dojo.stopEvent(e);
	},
	onSelectStart: function(e){
		// summary:
		//		event processor for onselectevent and ondragevent
		// e: Event
		//		mouse event
		if(!this.skip || !dojo.dnd.isFormElement(e)){
			dojo.stopEvent(e);
		}
	},

	// local events
	onDragDetected: function(/* Event */ e){
		// summary:
		//		called when the drag is detected;
		//		responsible for creation of the mover
		new this.mover(this.node, e, this);
	},
	onMoveStart: function(/* dojo.dnd.Mover */ mover){
		// summary:
		//		called before every move operation
		dojo.publish("/dnd/move/start", [mover]);
		dojo.addClass(dojo.body(), "dojoMove");
		dojo.addClass(this.node, "dojoMoveItem");
	},
	onMoveStop: function(/* dojo.dnd.Mover */ mover){
		// summary:
		//		called after every move operation
		dojo.publish("/dnd/move/stop", [mover]);
		dojo.removeClass(dojo.body(), "dojoMove");
		dojo.removeClass(this.node, "dojoMoveItem");
	},
	onFirstMove: function(/* dojo.dnd.Mover */ mover, /* Event */ e){
		// summary:
		//		called during the very first move notification;
		//		can be used to initialize coordinates, can be overwritten.

		// default implementation does nothing
	},
	onMove: function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop, /* Event */ e){
		// summary:
		//		called during every move notification;
		//		should actually move the node; can be overwritten.
		this.onMoving(mover, leftTop);
		var s = mover.node.style;
		s.left = leftTop.l + "px";
		s.top  = leftTop.t + "px";
		this.onMoved(mover, leftTop);
	},
	onMoving: function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop){
		// summary:
		//		called before every incremental move; can be overwritten.

		// default implementation does nothing
	},
	onMoved: function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop){
		// summary:
		//		called after every incremental move; can be overwritten.

		// default implementation does nothing
	}
});

return dojo.dnd.Moveable;
});

},
'ibm/tivoli/fwm/mxmap/impl/MaximoSpatialMxn':function(){
// wrapped by build app
define(["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn");

/**
 * It's hard to extend Mapstraction without impacting other providers so this
 * dojo object performs the main operations for MaximoSpatial.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMxn", null, {

	map: null,
	fullExtent: null,
	mapstraction: null,
	numberOfExternalMaps: 0,
	totalLoaded: 0,
	totalMapServices: 0,
	loadList: [],
	mapInitialExtent: null,
	bingMapsLayer: null,
	osmTries: 0,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.loadList = [];
		fromWebMercatorCache = {};
		toWebMercatorCache = {};
	},
	/**
	 * This method checks if all layers are already loaded so further map
	 * operations can be performed
	 */
	checkIfAllLoaded: function()
	{
		this.totalLoaded++;

		console.log("TotalMapServices", this.totalLoaded + "/" + this.getTotalLayers());

		if (this.getTotalLayers() == this.totalLoaded)
		{
			for ( var i = 0; i < this.loadList.length; i++)
			{
				dojo.disconnect(this.loadList[i]);
			}
			this.mapstraction.loaded[this.api] = true;

			console.log("spatialReference", this.map.spatialReference);

			// this is to store the map spatial reference to be
			// referenced by any other code
			window.mx = {
				esri: {
					sr: this.map.spatialReference
				}
			};
			var width = 0;
			if (this.map.extent)
			{
				width = this.map.extent.getWidth();
			}
			this.map._maximo = {
				mapStartingWidth: width,
				hasCachedMapService: this.hasCachedMapService
			};
			var ms = this.mapstraction;
			ms.state = {
				updating: false,
				panning: false,
				zooming: false
			};
			dojo.connect(this.map, "onUpdateStart", function(evt)
			{

				ms.state.updating = true;

			});
			dojo.connect(this.map, "onUpdateEnd", function(evt)
			{
				ms.state.updating = false;
				// ms.endPan.fire();// no matching event

			});
			dojo.connect(this.map, "onPanStart", function(evt, startpoint)
			{
				ms.state.updating = true;

			});
			dojo.connect(this.map, "onPanEnd", function(evt)
			{				
				ms.endPan.fire();
				ms.state.updating = false;

			});
			dojo.connect(this.map, "onZoomStart", function(extent, zoomFactor, anchor, level)
			{

				ms.state.updating = true;

			});

			dojo.connect(this.map, "onReposition", function(x, y)
			{				
				dojo.publish("onESRIReposition");
			});
			dojo.connect(this.map, "onZoomEnd", function(extent, zoomFactor, anchor, level)
			{

				ms.state.updating = false;
				ms.changeZoom.fire();

			});
			if (this._failedLayers.length > 0)
			{
				console.warn("The following layers failed to load", this._failedLayers);
			}
			var fl = this._failedLayers;
			this.mapstraction.getFailedLayers = function()
			{
				return fl;
			};

			try
			{
				var scalebar = new esri.dijit.Scalebar({
					map: this.map,
					scalebarUnit: this.lenUnit,
					attachTo: 'bottom-left'
				});
			}
			catch (e)
			{
				console.warn("failed to load scale bar");
				console.warn(e);
			}

			if (!this.mapstraction.optParams.isMobile)
			{
				try
				{
					var overviewMapDijit = new esri.dijit.OverviewMap({
						map: this.map,
						color: "#6E6EFF",
						expandFactor: 2.5,
						maximizeButton: false,
						visible: false
					});
					overviewMapDijit.startup();
				}
				catch (e)
				{
					console.warn("failed to load Overview Map");
					console.warn(e);
				}
			}

			this.mapstraction.runDeferred();

		}

	},
	_failedLayers: [],
	/**
	 * when a map fails to load
	 */
	_failedToLoadMapService: function(args, error)
	{
		console.log("error", args, error);
		args.error = error;
		this._failedLayers.push(args);
		this.handleB4BaseMap(args, null);
		this.checkIfAllLoaded();
	},
	hasCachedMapService: false,
	/**
	 * Determine the type of a layer and loads it
	 */
	determineTypeAndLoadLayer: function(response, mps, map)
	{

		var layer;
		var mapServiceParameter = {
			id: mps.name,
			opacity: parseFloat(mps.transparency),
			visible: mps.visible

		};

		var onUpdateFct = function(arg)
		{

			console.info("onUpdate for  ", mps.name, mps.url, arg, layer.fullExtent, layer);

			if (this.fullExtent == null)
			{
				this.fullExtent = layer.fullExtent;
				console.info("this.fullExtent  ", this.fullExtent);
			}
			else
			{
				this.fullExtent = this.fullExtent.union(layer.fullExtent);
				console.info("this.fullExtent  ", this.fullExtent);
			}
			this.checkIfAllLoaded();
		};
		if (response.tileInfo)
		{

			console.log(mps.name + ' is tiled ' + mps.url);

			layer = new esri.layers.ArcGISTiledMapServiceLayer(mps.url, mapServiceParameter);
			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));
			this.hasCachedMapService = true;

		}
		else if (response.serviceDataType === "esriImageServiceDataTypeGeneric")
		{

			console.log(mps.label + ' is ImageServer service ' + mps.url);

			var imageServiceParameters = new esri.layers.ImageServiceParameters();
			mapServiceParameter.imageParameters = imageServiceParameters;
			layer = new esri.layers.ArcGISImageServiceLayer(mps.url, mapServiceParameter);
			layer.setDisableClientCaching(true);
			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));

		}
		else
		{

			console.log(mps.name + ' is dynamic ' + mps.url);

			// Use the ImageParameters to set map service layer
			// definitions and map service visible layers before
			// adding to the client map.
			var imageParameters = new esri.layers.ImageParameters();

			imageParameters.transparent = true;
			if (mps.visibleLayers && mps.visibleLayers.length > 0 && mps.visibleLayers[0] !== 'all')
			{
				// I want layers 5,4, and 3 to be visible
				imageParameters.layerIds = mps.visibleLayers;
				imageParameters.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;

			}

			if (this.mapInitialExtent)
			{

				console.log("has an extent", this.mapInitialExtent);

				imageParameters.bbox = this.mapInitialExtent;
			}
			mapServiceParameter.imageParameters = imageParameters;
			//            

			layer = new esri.layers.ArcGISDynamicMapServiceLayer(mps.url, mapServiceParameter);
			// for dynamic map services we don't cache its map
			// images locally bcuz changes to it are often.
			layer.setDisableClientCaching(true);

			this.loadList.push(dojo.connect(layer, "onUpdateEnd", dojo.hitch(this, onUpdateFct)));
			// onload is triggered before we can execute actions
			// on the map
			dojo.connect(layer, "onLoad", dojo.hitch(this, function()
			{
				console.log(mps.name + " layer was loaded waiting for 1st update");
			}));

		}
		// console.log("added layer ' " + mps.name + "' " + mps.order);
		// spatial order is the opposite, the biggest the order is the lower in
		// the map it will be

		console.log("order ", mps.order, this.basemapOrder);
		if (this.baseMapAdded == true)
		{
			this.map.addLayer(layer);
		}
		else
		{
			this.handleB4BaseMap(mps, layer);
		}
		// , mps.order);
	},
	handleB4BaseMap: function(mps, layer)
	{
		if (mps.order == this.basemapOrder)
		{
			this.baseMapAdded = true;
			if (layer)
			{
				this.map.addLayer(layer);
			}
			for ( var id in this.buffer)
			{
				this.map.addLayer(this.buffer[id]);
			}
		}
		else
		{
			if (layer)
			{
				this.buffer.push(layer);
			}
		}
	},
	buffer: [],
	numberOfBaseMaps: 0,
	/**
	 * returns the total number of layers to be loaded
	 */
	getTotalLayers: function()
	{
		return this.totalMapServices + this.numberOfExternalMaps;
	},
	/**
	 * Create a OpenStreetMap Layer
	 */
	createOSMLater: function()
	{

		try
		{
			if (this.osmTries == 0)
			{
				this.numberOfExternalMaps++;
			}
			this.openStreetMapLayer = new esri.layers.OpenStreetMapLayer();
			/*
			 * esri.layers.OpenStreetMapLayer( { id: "OpenStreetMap", visible:
			 * true, opacity: 1, displayLevels:[0,1,2] });
			 */

			this.map.addLayer(this.openStreetMapLayer, 0);
			this.loadList.push(dojo.connect(this.openStreetMapLayer, "onUpdate", dojo.hitch(this, "checkIfAllLoaded")));
			// for all maps loaded event
		}
		catch (e)
		{
			console.log("osm", e);
			if (this.osmTries < 6)
			{
				this.osmTries++;
				console.warn('postpone OSM');
				setTimeout(dojo.hitch(this, this.createOSMLater), 500);
			}
			else
			{
				console.error('failed to load OSM');
			}
		}

	},
	/**
	 * Create a bing map layer
	 */
	createBingMapsLayer: function(key)
	{
		this.numberOfExternalMaps++;
		this.bingMapsLayer = new esri.virtualearth.VETiledLayer({
			id: "Bing Maps",
			bingMapsKey: key,
			mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD
		});

		this.map.addLayer(this.bingMapsLayer);
		this.loadList.push(dojo.connect(this.bingMapsLayer, "onUpdateEnd", dojo.hitch(this, this.checkIfAllLoaded)));

		var bingMapsButtonsDiv = dojo.create('div', {
			id: 'bingButtons',
			className: 'bingMapsButtonsDiv'
		}, dojo.byId(this.map.id));

		var buttonClick = dojo.hitch(this, function(id)
		{
			this.bingMapsLayer.setMapStyle(id);
		});

		var msg1 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_aerial");
		var aerials = dojo.create('button', {
			innerHTML: msg1
		}, bingMapsButtonsDiv);
		dojo.connect(aerials, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL);
		});

		var msg2 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_aerialwithlabels");
		var aerialsWithLegend = dojo.create('button', {
			innerHTML: msg2
		}, bingMapsButtonsDiv);
		dojo.connect(aerialsWithLegend, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS);
		});

		var msg3 = ibm.tivoli.fwm.i18n.getMaxMsg("plussmap", "bing_button_roads");
		var roads = dojo.create('button', {
			innerHTML: msg3
		}, bingMapsButtonsDiv);
		dojo.connect(roads, 'onclick', null, function()
		{
			buttonClick(esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD);
		});

	},
	/**
	 * Loads a map based on a map configuration
	 */
	loadMap: function(spatialConf)
	{
		this._failedLayers = [];
		// Bing Maps layer
		if (spatialConf.bingMaps)
		{
			this.createBingMapsLayer(spatialConf.bingMapsKey);
		}
		// OpenStreetMap layer
		if (spatialConf.openStreetMap)
		{
			this.createOSMLater();
		}

		this.totalLoaded = 0;
		if (spatialConf.mapservices[0])
		{
			this.basemapOrder = spatialConf.mapservices[0].order;
		}
		for ( var svcId = 0; svcId < spatialConf.mapservices.length; svcId++)
		{

			var mapServiceInfo = spatialConf.mapservices[svcId];

			var rParams = {
				"f": "json"
			};

			console.log(this.totalMapServices + " " + svcId + " " + spatialConf.mapservices[svcId].order, spatialConf.mapservices[svcId]);

			this.totalMapServices++;

			esri.request({
				url: mapServiceInfo.url,
				load: dojo.hitch(this, function(arg, arg2)
				{
					this.determineTypeAndLoadLayer(arg, arg2.args.params.mapServiceInfo, this.map);
				}),
				error: dojo.hitch(this, function(error)
				{
					this._failedToLoadMapService(mapServiceInfo, error);
				}),
				handleAs: "json",
				callbackParamName: "callback",
				sync: true,
				content: rParams,
				params: {
					"mapServiceInfo": mapServiceInfo
				},
				timeout: 30000
			});

		}
	},
	isPointInFullExtent: function(pt)
	{
		var fullextent = this.map.extent;

		if (this.fullExtent)
		{
			fullextent = this.fullExtent;
		}
		return fullextent.contains(pt);
	},
	toWebMercatorCache: {},
	projectPointsToWebMercator: function(points, callbackFct, errCallback)
	{

		var outSR = new esri.SpatialReference({
			wkid: 4326
		});
		var esriPoints = [];
		var propPoints = [];

		for ( var i = 0; i < points.length; i++)
		{
			if (this.toWebMercatorCache[points[i]] != null)
			{
				propPoints.push(this.toWebMercatorCache[points[i]]);
				continue;
			}
			esriPoints.push(points[i].toProprietary("maximospatial"));
		}

		if (propPoints.length == points.length)
		{

			callbackFct(propPoints);
			return;
		}
		if (this.esriGeometryService == null)
		{
			var error = {
				message: "Geometry service not found",
				msggroup: "plussmap",
				msgkey: "failed_loading_geometry_service"
			};
			errCallback(error);
		}
		var mxnMe = this;
		this.esriGeometryService.project(esriPoints, outSR, function(projectedPoints)
		{

			for ( var i = 0; i < projectedPoints.length; i++)
			{
				var esriP = projectedPoints[i];
				var pp = new mxn.LatLonPoint(esriP.y, esriP.x, outSR.wkid);
				mxnMe.toWebMercatorCache[points[i]] = pp;
				propPoints.push(pp);
			}

			callbackFct(propPoints);
		});

	},
	fromWebMercatorCache: {},
	projectPointsFromWebMercator: function(points, callbackFct, errCallback)
	{
		var outSR = window.mx.esri.sr;
		var esriPoints = [];
		var mercatorSr = new esri.SpatialReference({
			wkid: 4326
		});
		var propPoints = [];

		for ( var i = 0; i < points.length; i++)
		{
			if (this.fromWebMercatorCache[points[i]] != null)
			{
				propPoints.push(this.fromWebMercatorCache[points[i]]);
				continue;
			}
			var p = new esri.geometry.Point(points[i].lng, points[i].lat, mercatorSr);
			esriPoints.push(p);
		}

		if (propPoints.length == points.length)
		{

			callbackFct(propPoints);
			return;
		}
		if (this.esriGeometryService == null)
		{
			var error = {
				message: "Geometry service not found",
				msggroup: "plussmap",
				msgkey: "failed_loading_geometry_service"
			};
			errCallback(error);
		}
		var mxnMe = this;
		this.esriGeometryService.project(esriPoints, outSR, function(projectedPoints)
		{

			for ( var i = 0; i < projectedPoints.length; i++)
			{
				var esriP = projectedPoints[i];

				var pp = new mxn.LatLonPoint(esriP.y, esriP.x, outSR.wkid);
				mxnMe.fromWebMercatorCache[points[i]] = pp;
				propPoints.push(pp);
			}

			callbackFct(propPoints);
		});
	}

});
});

},
'ibm/tivoli/fwm/mxmap/CurrentMXRecManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.CurrentMXRecManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

dojo.declare("ibm.tivoli.fwm.mxmap.CurrentMXRecManager", ibm.tivoli.fwm.mxmap.MXRecord, {

	map: null,
	currentMarker: null,
	markerImgUrl: null,
	recordSet: null,
	currentFromRecSet: false,
	mbo: null,
	mboInfo: null,
	draggable: true,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		if (!this.markerImgUrl)
		{
			this.markerImgUrl = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo().getImageURL();
		}
		this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_" + this.map.getId(), dojo.hitch(this, this.serverUpdated)));
		this.recordSet = this.map.getCurrentRecordSetControl();
		this.mboInfo = options.mbo;
	},
	disposeMarker: function()
	{
		this._removeMarker();
		// remove current marker listener, return it to rec set if needed
		// if (this.currentFromRecSet == true)
		// {
		// this.recordSet.updateMXRecord(this.mboInfo.mxdata.uid,
		// this.mboInfo.mxdata, this.mboInfo.gisdata);
		// this.recordSet.showMXRecord(this.mboInfo.mxdata.uid);
		//
		// }
	},
	showCurrentRecord: function(noZoom)
	{
		if (this.mbo)
		{
			this.serverUpdated(this.mbo, noZoom);
		}
	},
	/**
	 * Triggered always that any new data from server is received. It will
	 * update the current representation of the current record on the map.
	 */
	serverUpdated: function(data, noZoom)
	{

		console.log("[CurrentMXRecManager] Server Updated with data", data);

		if (this.mboInfo && this.mboInfo.mxdata)
		{

			console.log("[CurrentMXRecManager] Trying to dispose current marker", this.mboInfo.mxdata);

			if (this.mboInfo.mxdata.uid.name != data.mxdata.uid.name || this.mboInfo.mxdata.uid.value != data.mxdata.uid.value)
			{
				this.disposeMarker();
				this.isMboOnMap = false;
			}
		}

		this.currentFromRecSet = false;

		this.mboInfo = data;
		this.mbo = data;
		this._updateMarkerLocation(data, noZoom);

	},

	/**
	 * Places a marker for the current record. Also adds a handler for dragging
	 * event of this marker.
	 */
	_placeMarker: function()
	{

		var markerOptions = {
			"events": {
				"onMoveEnd": dojo.hitch(this, this.movedMarker)
			},
			"enableMapTips": true
		};
		this.map.addMboToLayerManager(this.mboInfo, markerOptions);
		this.isMboOnMap = true;

	},

	/**
	 * Updates the current marker based on the new location data. It also
	 * publishes the event that the current record location has been updated
	 * thru 'onCurrentLocationUpdated' event
	 */
	_updateMarkerLocation: function(newMboInfo, noZoom)
	{
		this.inherited(arguments);
		dojo.publish("onCurrentLocationUpdated_" + this.map.getId());
		// if (noZoom != true)
		// {
		// this.center();
		// }
	},

	/**
	 * Returns a simple map tip for the current record TBD
	 */
	/*
	 * getMapTipData: function(mxdata) { var textBubble = mxdata.mboName + "\n" +
	 * mxdata.mboInfo.ADDRESSCODE + "\n" + mxdata.mboInfo.ORGID; return {
	 * infoBubble: textBubble, label: null,// nothing specified in spec. marker:
	 * 4, icon: this.markerImgUrl, iconSize: [ 32, 32 ], draggable:
	 * this._isDraggable(), hover: false }; },
	 */

	/**
	 * Triggered after the current record marker is moved. It then sends to the
	 * server the new record location
	 */
	movedMarker: function(event_name, evt, event_args)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Marker moved", event_args.newLocation);
		}
		this.reverseGeocodeCurrentRecord(event_args.newLocation, false);
	},

	/**
	 * Set the current SA record location
	 * 
	 * @param {lat,lng,address}
	 */
	setServersCurrentRecordLocation: function(newGISlocation)
	{
		this.map.getMaximo().setCurrentRecordLocation(newGISlocation);
	},

	/**
	 * Reverse geocode the current record.
	 * 
	 * @param newGISlocation -
	 *            Opcional, only if want to use a different position than the
	 *            current marker one.
	 */
	reverseGeocodeCurrentRecord: function(newGISlocation, addressOnly)
	{
		if (!newGISlocation)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] New Location has no GIS Data - Using current location");
			}
			newGISlocation = this.currentMarker.location;
		}
		var fctError = function(error)
		{
			this.reverseGeocodeCallbackError(error, newGISlocation, addressOnly);
		};
		var fctSuccess = function(revData)
		{
			this.reverseGeocodeCallback(revData, newGISlocation);
		};

		this.map.geocoder.reverseGeocode(newGISlocation.lat, newGISlocation.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));
	},
	reverseGeocodeAddressOnly: function()
	{
		this.reverseGeocodeCurrentRecord(null, true);
	},
	/**
	 * In case it fails to find an address based on the coordinates only the
	 * coordinates are set. If the coordinates has not changed nothing is
	 * updated on the server.
	 * 
	 * @param error -
	 *            error code
	 * @see ibm.tivoli.fwm.mxmap.Geocoder.ErrorCodes
	 * @param point -
	 *            from this reverse geocode was executed
	 */
	reverseGeocodeCallbackError: function(error, point, addressOnly)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Error during reverse geocoding for current record", error);
		}
		if (addressOnly && addressOnly == true)
		{
			// only address is needed. no x/y needed.
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] No address found");
			}
			this.map.getMaximo().showMessage("mapserver", "auto_revgeocode_noresults");
			return;
		}
		else
		{
			if (!this.currentMaker || point.lat != this.currentMarker.location.lat || point.lng != this.currentMarker.location.lng)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[CurrentMXRecManager] Coordinates changed, setting value on server", point);
				}
				if (point.lat && point.lng)
				{
					this.map.getMaximo().setCurrentRecordLocation({
						lat: point.lat,
						lng: point.lng
					}, "FAILED_REV_GEOCODE");
				}
			}
		}
	},

	/**
	 * An address was during reverse geocoding. Only its address is set into the
	 * SA record. The coordinates are the same of the marker.
	 * 
	 * @param location -
	 *            usually where marker was dropped
	 * @param originalLocation -
	 *            from where it was moved
	 */
	reverseGeocodeCallback: function(location, originalLocation)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[CurrentMXRecManager] Processing reverseGeocodeCallback: ", location);
		}
		var point = originalLocation;
		// gets the address of the first record as
		// we are working with x/y coordinates
		var address = location[0].formattedAddress;
		this.map.getMaximo().setCurrentRecordLocation({
			lat: point.lat,
			lng: point.lng,
			address: address
		});
	}
});
});

},
'dijit/typematic':function(){
define("dijit/typematic", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/connect", // connect.connect
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.mixin, lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie")
	"."		// setting dijit.typematic global
], function(array, connect, event, kernel, lang, on, has, dijit){

// module:
//		dijit/typematic
// summary:
//		These functions are used to repetitively call a user specified callback
//		method when a specific key or mouse click over a specific DOM node is
//		held down for a specific amount of time.
//		Only 1 such event is allowed to occur on the browser page at 1 time.

var typematic = (dijit.typematic = {
	// summary:
	//		These functions are used to repetitively call a user specified callback
	//		method when a specific key or mouse click over a specific DOM node is
	//		held down for a specific amount of time.
	//		Only 1 such event is allowed to occur on the browser page at 1 time.

	_fireEventAndReload: function(){
		this._timer = null;
		this._callback(++this._count, this._node, this._evt);

		// Schedule next event, timer is at most minDelay (default 10ms) to avoid
		// browser overload (particularly avoiding starving DOH robot so it never gets to send a mouseup)
		this._currentTimeout = Math.max(
			this._currentTimeout < 0 ? this._initialDelay :
				(this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay)),
			this._minDelay);
		this._timer = setTimeout(lang.hitch(this, "_fireEventAndReload"), this._currentTimeout);
	},

	trigger: function(/*Event*/ evt, /*Object*/ _this, /*DOMNode*/ node, /*Function*/ callback, /*Object*/ obj, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start a timed, repeating callback sequence.
		//		If already started, the function call is ignored.
		//		This method is not normally called by the user but can be
		//		when the normal listener code is insufficient.
		// evt:
		//		key or mouse event object to pass to the user callback
		// _this:
		//		pointer to the user's widget space.
		// node:
		//		the DOM node object to pass the the callback function
		// callback:
		//		function to call until the sequence is stopped called with 3 parameters:
		// count:
		//		integer representing number of repeated calls (0..n) with -1 indicating the iteration has stopped
		// node:
		//		the DOM node object passed in
		// evt:
		//		key or mouse event object
		// obj:
		//		user space object used to uniquely identify each typematic sequence
		// subsequentDelay (optional):
		//		if > 1, the number of milliseconds until the 3->n events occur
		//		or else the fractional time multiplier for the next event's delay, default=0.9
		// initialDelay (optional):
		//		the number of milliseconds until the 2nd event occurs, default=500ms
		// minDelay (optional):
		//		the maximum delay in milliseconds for event to fire, default=10ms
		if(obj != this._obj){
			this.stop();
			this._initialDelay = initialDelay || 500;
			this._subsequentDelay = subsequentDelay || 0.90;
			this._minDelay = minDelay || 10;
			this._obj = obj;
			this._evt = evt;
			this._node = node;
			this._currentTimeout = -1;
			this._count = -1;
			this._callback = lang.hitch(_this, callback);
			this._fireEventAndReload();
			this._evt = lang.mixin({faux: true}, evt);
		}
	},

	stop: function(){
		// summary:
		//		Stop an ongoing timed, repeating callback sequence.
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		if(this._obj){
			this._callback(-1, this._node, this._evt);
			this._obj = null;
		}
	},

	addKeyListener: function(/*DOMNode*/ node, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key.
		//		See also the trigger method for other parameters.
		// keyObject:
		//		an object defining the key to listen for:
		// 		charOrCode:
		//			the printable character (string) or keyCode (number) to listen for.
		// 		keyCode:
		//			(deprecated - use charOrCode) the keyCode (number) to listen for (implies charCode = 0).
		// 		charCode:
		//			(deprecated - use charOrCode) the charCode (number) to listen for.
		// 		ctrlKey:
		//			desired ctrl key state to initiate the callback sequence:
		//			- pressed (true)
		//			- released (false)
		//			- either (unspecified)
		// 		altKey:
		//			same as ctrlKey but for the alt key
		// 		shiftKey:
		//			same as ctrlKey but for the shift key
		// returns:
		//		a connection handle
		if(keyObject.keyCode){
			keyObject.charOrCode = keyObject.keyCode;
			kernel.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}else if(keyObject.charCode){
			keyObject.charOrCode = String.fromCharCode(keyObject.charCode);
			kernel.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}
		var handles = [
			on(node, connect._keypress, lang.hitch(this, function(evt){
				if(evt.charOrCode == keyObject.charOrCode &&
				(keyObject.ctrlKey === undefined || keyObject.ctrlKey == evt.ctrlKey) &&
				(keyObject.altKey === undefined || keyObject.altKey == evt.altKey) &&
				(keyObject.metaKey === undefined || keyObject.metaKey == (evt.metaKey || false)) && // IE doesn't even set metaKey
				(keyObject.shiftKey === undefined || keyObject.shiftKey == evt.shiftKey)){
					event.stop(evt);
					typematic.trigger(evt, _this, node, callback, keyObject, subsequentDelay, initialDelay, minDelay);
				}else if(typematic._obj == keyObject){
					typematic.stop();
				}
			})),
			on(node, "keyup", lang.hitch(this, function(){
				if(typematic._obj == keyObject){
					typematic.stop();
				}
			}))
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	},

	addMouseListener: function(/*DOMNode*/ node, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a typematic mouse click.
		//		See the trigger method for other parameters.
		// returns:
		//		a connection handle
		var handles =  [
			on(node, "mousedown", lang.hitch(this, function(evt){
				event.stop(evt);
				typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
			})),
			on(node, "mouseup", lang.hitch(this, function(evt){
				if(this._obj){
					event.stop(evt);
				}
				typematic.stop();
			})),
			on(node, "mouseout", lang.hitch(this, function(evt){
				event.stop(evt);
				typematic.stop();
			})),
			on(node, "mousemove", lang.hitch(this, function(evt){
				evt.preventDefault();
			})),
			on(node, "dblclick", lang.hitch(this, function(evt){
				event.stop(evt);
				if(has("ie")){
					typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
					setTimeout(lang.hitch(this, typematic.stop), 50);
				}
			}))
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	},

	addListener: function(/*Node*/ mouseNode, /*Node*/ keyNode, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key and mouseclick.
		//		This is a thin wrapper to addKeyListener and addMouseListener.
		//		See the addMouseListener and addKeyListener methods for other parameters.
		// mouseNode:
		//		the DOM node object to listen on for mouse events.
		// keyNode:
		//		the DOM node object to listen on for key events.
		// returns:
		//		a connection handle
		var handles = [
			this.addKeyListener(keyNode, keyObject, _this, callback, subsequentDelay, initialDelay, minDelay),
			this.addMouseListener(mouseNode, _this, callback, subsequentDelay, initialDelay, minDelay)
		];
		return { remove: function(){ array.forEach(handles, function(h){ h.remove(); }); } };
	}
});

return typematic;

});

},
'ibm/tivoli/fwm/mxmap/helpers/MapFullScreenHelper':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojo/dom"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

dojo.provide("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper");

dojo.require("dojo.dom");

/**
 * MapFullScreenHelper implementation. Encapsulates the full screen code.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	mapDivElement: null,
	mapDivWidth: null,
	mapDivHeight: null,
	_fullScreenOn: false,
	_keyHandler: null,
	_origViewPortContent: null,
	_oldOverflow: null,
	_oldBodyParentOverflow: null,
	_origClientAreaInfo: null,
	_origOnScrollFunction: null,
	mapToolbar: null,
	_isAndroid: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._fullScreenOn = false;
		this._isAndroid = navigator.userAgent.indexOf("Android") > -1;
	},
	_checkForESCKey: function(event)
	{
		if (event.keyCode == dojo.keys.ESCAPE)
		{
			this.fullScreenModeOff();
		}
	},
	_doPreSetupIfIE: function(saveData)
	{
		if (dojo.isIE && true !== this.map.isMobile)
		{
			// Need to adjust the client area due to fix of issue 12-10107
			// we make the client area 'full screen'
			// clientAreaId is a value that is made available by Maximo
			if (window.clientAreaId)
			{
				var clientArea = dojo.byId(window.clientAreaId);
				if (clientArea)
				{
					if (true === saveData)
					{
						var position = (clientArea.style.position || "relative");
						var overflow = (clientArea.style.overflow || "auto");
						this._origClientAreaInfo = {
							height: clientArea.style.height,
							width: clientArea.style.width,
							scrollTop: clientArea.scrollTop,
							scrollLeft: clientArea.scrollLeft,
							position: position,
							overflow: overflow
						};
					}
					else
					{
						this._origClientAreaInfo = {
							height: clientArea.style.height,
							width: clientArea.style.width,
							scrollTop: this._origClientAreaInfo.scrollTop,
							scrollLeft: this._origClientAreaInfo.scrollLeft,
							position: this._origClientAreaInfo.position,
							overflow: this._origClientAreaInfo.overflow
						};
					}
					clientArea.scrollTop = 0;
					clientArea.scrollLeft = 0;
					dojo.style(clientArea, {
						'width': dijit.getViewport().w + "px",
						'height': dijit.getViewport().h + "px",
						'top': '0px',
						'left': '0px',
						'position': 'absolute',
						'overflow': 'hidden'
					});

				}
			}
			// Hides the applet so it will not show up on the map when in full
			// screen mode
			var calendarViewDiv = dojo.byId("calviewAppletDiv");
			if (calendarViewDiv != null)
			{
				dojo.style(calendarViewDiv, {
					'display': 'none'
				});
			}
		}
	},
	_undoPreSetupIfIE: function()
	{
		if (dojo.isIE && true !== this.map.isMobile)
		{
			// Need to adjust the client area due to fix of issue 12-10107
			// we make the client area 'full screen'
			// clientAreaId is a value that is made available by Maximo
			if (window.clientAreaId)
			{
				var clientArea = dojo.byId(window.clientAreaId);
				if (clientArea)
				{
					dojo.style(clientArea, {
						'width': this._origClientAreaInfo.width,
						'height': this._origClientAreaInfo.height,
						'position': this._origClientAreaInfo.position,
						'overflow': this._origClientAreaInfo.overflow
					});
					clientArea.scrollTop = this._origClientAreaInfo.scrollTop;
					clientArea.scrollLeft = this._origClientAreaInfo.scrollLeft;
				}
			}
			// Shows the applet again
			var calendarViewDiv = dojo.byId("calviewAppletDiv");
			if (calendarViewDiv != null)
			{
				dojo.style(calendarViewDiv, {
					'display': 'block'
				});
			}
		}
	},
	fullScreenModeOn: function()
	{
		if (this._fullScreenOn == false)
		{
			this._doPreSetupIfIE(true);
			// 12-12451. _adjustScrolls() is now being called before
			// _adjustMapToFullScreen() so that the scroll does not
			// affect the value of dijit.getViewport().w
			this._adjustScrolls();
			this._setViewPortSettings();
			this._adjustMapToFullScreen();
			this._hideElementsHackOn();
			/* 12-10287 */
			this._adjustOpacity();
			this._fullScreenOn = true;
			this._keyHandler = dojo.connect(document, "onkeypress", dojo.hitch(this, this._checkForESCKey));

			// Issue 12-11271
			var _left = 0;
			window.top.scrollTo(_left, 0);

			// need to notify the map of the changes in div size
			// 12-10547 - reduces in this.map.toolbar.getToolbarHeight() pixels
			// the height to not hide the map info at the bottom
			var toolbarHeight = 0;
			if (this.map.toolbar)
			{
				toolbarHeight = this.map.toolbar.getToolbarHeight();
			}
			this.map.getMapstraction().resizeTo(dijit.getViewport().w, dijit.getViewport().h - toolbarHeight);
			dojo.publish("mapFullScreenModeChanged_" + this.map.getId(), [ {
				modeOn: true
			} ]);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[MapFullScreenHelper] Full Screen is already on");
			}
		}
	},
	_adjustMapToFullScreen: function()
	{
		//console.log("[_adjustMapToFullScreen] Viewport = " + dijit.getViewport().w + "," + dijit.getViewport().h);
		
		// On Android, after we make it full screen and the user had zoomed into the page,
		// the resize event is called multiple times, the last one of which with a wrong
		// (too small) size. We ignore those resize events here, assuming we already
		// resized to the correct size.
		if (dijit.getViewport().w < 200 || dijit.getViewport().h < 200)
		{
			return;
		}
		
		var _top = "0px";
		var _left = 0;
		if (this.mapToolbar)
		{
			var divElement = this.mapToolbar.getToolbarDivElement();
			// 12-13272. Do not set z-index if IE, otherwise maximo dialogs will
			// be hidden
			if (dojo.isIE && (this.map.isMobile == true))
			{
				dojo.style(divElement, {
					'width': dijit.getViewport().w + "px",
					'top': '0px',
					'left': _left + "px",
					'position': 'absolute'
				});
			}
			else
			{
				dojo.style(divElement, {
					'width': dijit.getViewport().w + "px",
					'top': '0px',
					'left': _left + "px",
					'position': 'absolute',
					'zIndex': '1001'
				});
			}
			_top = divElement.offsetHeight + "px";
		}
		// 12-10547 - reduces in 20 pixels the height to not hide the map info
		// at the bottom
		// 12-10765 and 12-10674 - reduces zIndex
		// 12-12707 - using the correct toolbar height
		var toolbarHeight = 0;
		if (this.map.toolbar)
		{
			toolbarHeight = this.map.toolbar.getToolbarHeight();
		}

		//console.log("[_adjustMapToFullScreen] toolbarHeight = " + toolbarHeight);
		//console.log("[_adjustMapToFullScreen] Viewport = " + dijit.getViewport().w + "," + dijit.getViewport().h);
		
		// 12-13272. Do not set z-index if IE, otherwise maximo dialogs will be
		// hidden
		if (dojo.isIE && (this.map.isMobile == true))
		{
			dojo.style(this.mapDivElement, {
				'width': dijit.getViewport().w + "px",
				'height': (dijit.getViewport().h - toolbarHeight) + "px",
				'top': _top,
				'left': _left + "px",
				'position': 'absolute'
			});
		}
		else
		{
			dojo.style(this.mapDivElement, {
				'width': dijit.getViewport().w + "px",
				'height': (dijit.getViewport().h - toolbarHeight) + "px",
				'top': _top,
				'left': _left + "px",
				'position': 'absolute',
				'zIndex': '1000'
			});
		}
	},
	_hideElementsHackOn: function()
	{
		if (this._isAndroid || dojo.isIE)
		{
			// Issue 12-11443
			// Remove the map from the DOM so it doesn't get hidden by the
			// workaround
			this.mapParent = this._removeMapFromParent();
			// Hide all elements in the page that will be behind the map
			this._hidePageElements();
			// Re-add the map to the page
			this._addMapToParent(document.body);
		}
	},
	_hideElementsHackOff: function()
	{
		if (this._isAndroid || dojo.isIE)
		{
			// Issue 12-11443
			// Remove the map from the root node and add it back to its parent
			this._removeMapFromParent();
			this._addMapToParent(this.mapParent);
			// Return all nodes to their previous visibility
			this._showPageElements();
		}
		if (dojo.isIE)
		{
			// After restoring, IE left most of the screen blank. This nudges
			// it to redraw and fixes the problem.
			window.onresize();
		}
	},
	_removeMapFromParent: function()
	{
		var _parent = this.mapDivElement.parentNode;
		_parent.removeChild(this.mapDivElement);
		if (this.mapToolbar)
		{
			_parent.removeChild(this.mapToolbar.getToolbarDivElement());
		}

		return _parent;
	},
	_addMapToParent: function(parent)
	{
		if (this.mapToolbar)
		{
			parent.appendChild(this.mapToolbar.getToolbarDivElement());
		}
		parent.appendChild(this.mapDivElement);
	},
	_hidePageElements: function()
	{
		// Exclude the dialogs HTML from hiding or they won't work
		var dialogholder = dojo.byId("dialogholder");
		var dialogs = dojo.query(".dijitDialog");
		// 12-13323. Adding the wait div to the exclude list.
		var waitDiv = dojo.byId("wait");
		var excludes = [ dialogholder, waitDiv ].concat(dialogs);
		dojo.query("body *").forEach(function(node, index, arr)
		{
			if (node.style
			// Also exclude all the descendants of excluded divs
			&& !dojo.some(excludes, function(parent)
			{
				return dojo.dom.isDescendant(node, parent);
			}))
			{
				node._fwm_display_ = node.style.display;
				node.style.display = "none";
			}
		});
	},
	_showPageElements: function()
	{
		dojo.query("body *").forEach(function(node, index, arr)
		{
			if (node.style && "_fwm_display_" in node)
			{
				node.style.display = node._fwm_display_;
			}
		});
	},
	_adjustOpacity: function()
	{
		// maximo contains opacity from 0 to 100 in increments of 5
		for ( var counter = 0; counter < 100; counter += 5)
		{
			dojo.query(".opacity_" + counter).style("opacity", "1.0");
		}
	},
	_restoreOpacity: function()
	{
		// maximo contains opacity from 0 to 100 in increments of 5
		for ( var counter = 0; counter < 100; counter += 5)
		{
			dojo.query(".opacity_" + counter).style("opacity", "." + counter);
		}
	},
	_adjustScrolls: function()
	{
		// Store the overflow state we have to restore later.
		// IE had issues, so have to check that it's defined. Ugh.
		var body = dojo.body();
		if (body.style && body.style.overflow)
		{
			this._oldOverflow = dojo.style(body, "overflow");
		}
		else
		{
			this._oldOverflow = "";
		}
		if (dojo.isIE)
		{
			// IE will put scrollbars in anyway, html (parent of body)
			// also controls them in standards mode, so we have to
			// remove them, argh.
			if (body.parentNode && body.parentNode.style && body.parentNode.style.overflow)
			{
				this._oldBodyParentOverflow = body.parentNode.style.overflow;
			}
			else
			{
				try
				{
					this._oldBodyParentOverflow = dojo.style(body.parentNode, "overflow");
				}
				catch (e)
				{
					this._oldBodyParentOverflow = "scroll";
				}
			}
			dojo.style(body.parentNode, "overflow", "hidden");
		}
		dojo.style(body, "overflow", "hidden");
		// 12-12456. Intercepts the scroll event and forces a scroll to the top
		// This is necessary because of the middle mouse button scroll (it can't
		// be disabled in FF)
		this._origOnScrollFunction = window.onscroll;
		window.onscroll = function(e)
		{
			window.top.scrollTo(0, 0);
		};
	},
	_restoreScrolls: function()
	{
		var body = dojo.body();
		if (dojo.isIE && !dojo.isQuirks)
		{
			body.parentNode.style.overflow = this._oldBodyParentOverflow;
		}
		dojo.style(body, "overflow", this._oldOverflow);
		// Restores the onscroll handler
		window.onscroll = this._origOnScrollFunction;
	},
	_setViewPortSettings: function()
	{
		// configure viewport settings to no allow users to scale the screen
		var viewPortMeta = dojo.query('meta[name="viewport"]')[0];
		if (viewPortMeta)
		{
			this._origViewPortContent = dojo.attr(viewPortMeta, "content");
			// 12-13165. Removing maximum-scale=1.0. For some reason, even after
			// restoring viewport settings
			// the maximum-scale property was persisting...
			if (this._isAndroid)
			{
				//console.log("[_setViewPortSettings] Viewport before null = " + dijit.getViewport().w + "," + dijit.getViewport().h);
				dojo.attr(viewPortMeta, "content", null);
				//console.log("[_setViewPortSettings] Viewport after null = " + dijit.getViewport().w + "," + dijit.getViewport().h);
				dojo.attr(viewPortMeta, "content", "initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width");
				//console.log("[_setViewPortSettings] Viewport after device-width= " + dijit.getViewport().w + "," + dijit.getViewport().h);
			}
			else
			{
				dojo.attr(viewPortMeta, "content", "initial-scale=1.0,user-scalable=no,width=device-width");
			}
		}
		else
		{
			var meta = dojo.create("meta", {
				name: "viewport",
				content: "initial-scale=1.0, user-scalable=no"
			});
			/* 12-11086 */
			this._origViewPortContent = dojo.create("meta", {
				name: "viewport",
				content: "initial-scale=1.0, user-scalable=yes"
			});
			document.getElementsByTagName("head")[0].appendChild(meta);
		}
	},
	_removeViewPortSettings: function()
	{
		var viewPortMeta = dojo.query('meta[name="viewport"]')[0];
		if (viewPortMeta)
		{
			// The statement below is necessary because of issue 12-13165. It's a
			// workaround for an Android bug.
			dojo.attr(viewPortMeta, "content", null);
			dojo.attr(viewPortMeta, "content", this._origViewPortContent);
		}
	},
	fullScreenModeOff: function()
	{
		if (this._fullScreenOn == true)
		{

			this._hideElementsHackOff();

			this._undoPreSetupIfIE();
			this._restoreMapToOriginalSize();
			this._restoreScrolls();
			/* 12-10287 */
			this._restoreOpacity();
			this._fullScreenOn = false;
			if (this._keyHandler)
			{
				dojo.disconnect(this._keyHandler);
				this._keyHandler = null;
			}
			/* 12-11086: changed user-scalable to yes */
			this._removeViewPortSettings();

			// need to notify the map of the changes in div size
			this.map._resize();// .getMapstraction().resizeTo(this.mapDivWidth,
			// this.mapDivHeight);
			dojo.publish("mapFullScreenModeChanged_" + this.map.getId(), [ {
				modeOn: false
			} ]);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.warn("[MapFullScreenHelper] Full Screen is already off");
			}
		}
	},
	_restoreMapToOriginalSize: function()
	{
		dojo.style(this.mapDivElement, {
			'width': this.mapDivWidth,
			'height': this.mapDivHeight,
			'top': '0px',
			'left': '0px',
			'position': 'relative',
			'zIndex': ''
		});
		if (this.mapToolbar)
		{
			var divElement = this.mapToolbar.getToolbarDivElement();
			dojo.style(divElement, {
				'width': this.mapDivWidth,
				'top': this.mapDivElement.style.top,
				'left': this.mapDivElement.style.left,
				'position': 'relative',
				'zIndex': ''
			});
		}
	},
	updateMapDimensions: function(newWidth, newHeight)
	{
		this.mapDivWidth = newWidth;
		this.mapDivHeight = newHeight;

		// 12-10601
		if (this._fullScreenOn == true)
		{
			this._doPreSetupIfIE(false);
			//console.log("[MapFullScreenHelper] updateMapDimensions");
			this._adjustMapToFullScreen();
		}
	}
});
});

},
'dijit/MenuItem':function(){
require({cache:{
'url:dijit/templates/MenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/sniff", // has("ie")
	"./_Widget",
	"./_TemplatedMixin",
	"./_Contained",
	"./_CssStateMixin",
	"dojo/text!./templates/MenuItem.html"
], function(declare, dom, domAttr, domClass, event, kernel, has,
			_Widget, _TemplatedMixin, _Contained, _CssStateMixin, template){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _Contained = dijit._Contained;
	var _CssStateMixin = dijit._CssStateMixin;
=====*/

	// module:
	//		dijit/MenuItem
	// summary:
	//		A line item in a Menu Widget


	return declare("dijit.MenuItem",
		[_Widget, _TemplatedMixin, _Contained, _CssStateMixin],
		{
		// summary:
		//		A line item in a Menu Widget

		// Make 3 columns
		// icon, label, and expand arrow (BiDi-dependent) indicating sub-menu
		templateString: template,

		baseClass: "dijitMenuItem",

		// label: String
		//		Menu text
		label: '',
		_setLabelAttr: { node: "containerNode", type: "innerHTML" },

		// iconClass: String
		//		Class to apply to DOMNode to make it display an icon.
		iconClass: "dijitNoIcon",
		_setIconClassAttr: { node: "iconNode", type: "class" },

		// accelKey: String
		//		Text for the accelerator (shortcut) key combination.
		//		Note that although Menu can display accelerator keys there
		//		is no infrastructure to actually catch and execute these
		//		accelerators.
		accelKey: "",

		// disabled: Boolean
		//		If true, the menu item is disabled.
		//		If false, the menu item is enabled.
		disabled: false,

		_fillContent: function(/*DomNode*/ source){
			// If button label is specified as srcNodeRef.innerHTML rather than
			// this.params.label, handle it here.
			if(source && !("label" in this.params)){
				this.set('label', source.innerHTML);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);
			var label = this.id+"_text";
			domAttr.set(this.containerNode, "id", label);
			if(this.accelKeyNode){
				domAttr.set(this.accelKeyNode, "id", this.id + "_accel");
				label += " " + this.id + "_accel";
			}
			this.domNode.setAttribute("aria-labelledby", label);
			dom.setSelectable(this.domNode, false);
		},

		_onHover: function(){
			// summary:
			//		Handler when mouse is moved onto menu item
			// tags:
			//		protected
			this.getParent().onItemHover(this);
		},

		_onUnhover: function(){
			// summary:
			//		Handler when mouse is moved off of menu item,
			//		possibly to a child menu, or maybe to a sibling
			//		menuitem or somewhere else entirely.
			// tags:
			//		protected

			// if we are unhovering the currently selected item
			// then unselect it
			this.getParent().onItemUnhover(this);

			// When menu is hidden (collapsed) due to clicking a MenuItem and having it execute,
			// FF and IE don't generate an onmouseout event for the MenuItem.
			// So, help out _CssStateMixin in this case.
			this._set("hovering", false);
		},

		_onClick: function(evt){
			// summary:
			//		Internal handler for click events on MenuItem.
			// tags:
			//		private
			this.getParent().onItemClick(this, evt);
			event.stop(evt);
		},

		onClick: function(/*Event*/){
			// summary:
			//		User defined function to handle clicks
			// tags:
			//		callback
		},

		focus: function(){
			// summary:
			//		Focus on this MenuItem
			try{
				if(has("ie") == 8){
					// needed for IE8 which won't scroll TR tags into view on focus yet calling scrollIntoView creates flicker (#10275)
					this.containerNode.focus();
				}
				this.focusNode.focus();
			}catch(e){
				// this throws on IE (at least) in some scenarios
			}
		},

		_onFocus: function(){
			// summary:
			//		This is called by the focus manager when focus
			//		goes to this MenuItem or a child menu.
			// tags:
			//		protected
			this._setSelected(true);
			this.getParent()._onItemFocus(this);

			this.inherited(arguments);
		},

		_setSelected: function(selected){
			// summary:
			//		Indicate that this node is the currently selected one
			// tags:
			//		private

			/***
			 * TODO: remove this method and calls to it, when _onBlur() is working for MenuItem.
			 * Currently _onBlur() gets called when focus is moved from the MenuItem to a child menu.
			 * That's not supposed to happen, but the problem is:
			 * In order to allow dijit.popup's getTopPopup() to work,a sub menu's popupParent
			 * points to the parent Menu, bypassing the parent MenuItem... thus the
			 * MenuItem is not in the chain of active widgets and gets a premature call to
			 * _onBlur()
			 */

			domClass.toggle(this.domNode, "dijitMenuItemSelected", selected);
		},

		setLabel: function(/*String*/ content){
			// summary:
			//		Deprecated.   Use set('label', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
			this.set("label", content);
		},

		setDisabled: function(/*Boolean*/ disabled){
			// summary:
			//		Deprecated.   Use set('disabled', bool) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
			this.set('disabled', disabled);
		},
		_setDisabledAttr: function(/*Boolean*/ value){
			// summary:
			//		Hook for attr('disabled', ...) to work.
			//		Enable or disable this menu item.

			this.focusNode.setAttribute('aria-disabled', value ? 'true' : 'false');
			this._set("disabled", value);
		},
		_setAccelKeyAttr: function(/*String*/ value){
			// summary:
			//		Hook for attr('accelKey', ...) to work.
			//		Set accelKey on this menu item.

			this.accelKeyNode.style.display=value?"":"none";
			this.accelKeyNode.innerHTML=value;
			//have to use colSpan to make it work in IE
			domAttr.set(this.containerNode,'colSpan',value?"1":"2");

			this._set("accelKey", value);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/routing/impl/gmaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/routing/Router,ibm/tivoli/fwm/mxmap/routing/Route"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.gmaps");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");
/**
 * Google maps routing implementation.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.gmaps", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	_routeLimits: 25,// how many stops the routing service allows
	// markers images url prefix
	_markerHost: "http://maps.gstatic.com/mapfiles/markers2/",

	constructor: function(params)
	{
		console.log("[Gmaps Router]", params);
		dojo.mixin(this, params);

		this.directionsService = new google.maps.DirectionsService();

		if (this.map.mapConf.key == null || this.map.mapConf.key.length == 0)
		{
			// no premier map
			this._routeLimits = 10;
		}
		console.log("[Gmaps Router] _routeLimits: ", this._routeLimits);

	},
	/*
	 * Return all the vertices coordinates of the route path
	 */
	_getPathCoords: function(r)
	{
		var coords = [];

		for ( var k in r.overview_path)
		{
			var p = r.overview_path[k];
			var mxnll = new mxn.LatLonPoint();
			mxnll.fromProprietary(this.map.getMapstraction().api, p);
			coords.push(mxnll);
		}

		return coords;
	},
	/**
	 * 
	 * @param route
	 * @param addmarkers
	 * @param map
	 * @returns { distance: total distance of this route duration: total
	 *          duration in seconds of this route marker: all the markers for
	 *          each stop of this route }
	 */
	_iterateOverLegs: function(route, addmarkers, map)
	{
		var routingData = {
			distance: 0,
			duration: 0,
			legData: [],
			markers: [],
			stops: [],
			polyline: []
		};
		var lastPoint = null;
		var lastAddress = "";

		for ( var k in route.legs)
		{
			var leg = route.legs[k];
			routingData.distance += leg.distance.value;
			routingData.duration += leg.duration.value;
			var stepsInfo = this._getStepsData(leg.steps);
			var steps = stepsInfo.stepData;
			var startpt = new mxn.LatLonPoint();
			startpt.fromProprietary(this.map.getMapstraction().api, leg.start_location);
			var ep = new mxn.LatLonPoint();
			ep.fromProprietary(this.map.getMapstraction().api, leg.end_location);
			routingData.legData.push({
				distance: leg.distance.value,
				duration: leg.duration.value,
				startAddress: leg.start_address,
				endAddress: leg.end_address,
				endLatLng: ep,
				startLatLng: startpt,
				steps: steps
			});
			routingData.polyline = routingData.polyline.concat(stepsInfo.polyStops);

			routingData.stops.push(startpt);

			lastPoint = leg.end_location;
			lastAddress = leg.end_address;

		}

		var lastpt = new mxn.LatLonPoint();
		lastpt.fromProprietary(this.map.getMapstraction().api, lastPoint);
		routingData.stops.push(lastpt);

		return routingData;
	},
	_getStepsData: function(steps)
	{
		var data = [];
		var polyStops = [];
		if (steps)
		{
			for ( var index in steps)
			{
				var step = steps[index];
				var distance = step.distance.value;

				var loc = new mxn.LatLonPoint();
				loc.fromProprietary(this.map.getMapstraction().api, step.start_location);
				distance /= 1000;// google returns in meters, we need in km

				data.push({
					distance: distance,
					duration: step.duration.value,
					info: step.instructions,
					location: loc
				});
				polyStops = polyStops.concat(step.path);
			}
		}
		return {
			stepData: data,
			polyStops: polyStops
		};
	},

	/**
	 * allows to create more than 25 stops route in gmaps. It handles the return
	 * of each 25 stops route requests and and merge them. And returns in teh
	 * call back the routing data:
	 * 
	 * distance: 0, duration: 0, polyline: null, waypoints: [], markers: [],
	 * copyrights:
	 * 
	 */
	ccs: [ "#ff0000", "#00ff00", "#ffffff" ],
	co: 0,
	_multipleRouteSuccess: function(routesResponses, callback, errCb, initialStops)
	{

		var map = this.map.getMapstraction().getProviderMap();
		var routingData = {
			totalDistance: 0,
			totalDuration: 0,
			legsData: [],
			polyline: null,
			stops: [],
			copyrights: null
		};

		var plineCoords = [];
		for ( var index = 0; index < routesResponses.length; index++)
		{
			var r = routesResponses[index].routes[0];

			// if (window.DEBUGLEVEL && window.DEBUGLEVEL > 1)
			// {
			// var polyDebug = new mxn.Polyline();
			// polyDebug.points = this._getPathCoords(r);
			// polyDebug.color = this.ccs[this.co++];
			// this.map.getMapstraction().addPolyline(polyDebug);
			// }

			// plineCoords = plineCoords.concat(this._getPathCoords(r));

			if (routingData.copyrights == null)
			{
				routingData.copyrights = r.copyrights;
			}
			else
			{
				routingData.copyrights += ", " + r.copyrights;
			}

			var rd = this._iterateOverLegs(r, true, map);

			for ( var k in rd.polyline)
			{
				var p = rd.polyline[k];
				var mxnll = new mxn.LatLonPoint();
				mxnll.fromProprietary(this.map.getMapstraction().api, p);
				plineCoords.push(mxnll);
			}

			routingData.totalDistance += rd.distance;
			routingData.totalDuration += rd.duration;

			routingData.legsData = routingData.legsData.concat(rd.legData);
			var rstops = rd.stops;
			if (routesResponses[index].overlapPrevious == true)
			{
				rstops = rstops.slice(1, rstops.length);
			}
			routingData.stops = routingData.stops.concat(rstops);
			// routingData.markers = routingData.markers.concat(rd.markers);
		}

		var poly = new mxn.Polyline();
		poly.points = plineCoords;
		poly.color = this.routecolor;
		poly.setOpacity(this.routeOpacity);
		poly.setWidth(this.routeLineWidth);

		if (dojo.config.fwm.debug == true)
		{
			console.log("points poly", plineCoords.length);
			console.log("poly color", poly.color);
		}

		routingData.polyline = poly;

		routingData.map = this.map;

		var customFct = function(_markerHost)
		{
			this._markerHost = _markerHost;
			this._counter = 0;
			this.getNext = function()
			{
				// this.wp.text=this._generateMarkerText();
				return {
					icon: this._generateMarkerImageUrl(),
					size: [ 20, 34 ],
					anchor: [ 10, 34 ]
				};
			};
			this._generateMarkerImageUrl = function()
			{

				var color = "_green";
				var offset = (this._counter % 26);

				var digit = String.fromCharCode(65 + offset);
				if (dojo.config.fwm.debug == true)
				{
					console.log("custommarker", this._counter, digit);
				}
				this._counter++;

				return this._markerHost + "marker" + color + digit + ".png";
			};
		};

		routingData.customMarkerOptions = new customFct(this._markerHost);

		// maybe moved to the route.
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var mustGeocode = false;
		if (initialStops[0].calculatedStop == true)
		{
			mustGeocode = true;
		}
		itinerary.setInitialLocation(routingData.legsData[0].startAddress, routingData.legsData[0].startLatLng, null, null, mustGeocode);
		if (routingData.legsData && routingData.legsData.length > 0)
		{

			for ( var index = 0; index < routingData.legsData.length; index++)
			{
				var loc = routingData.legsData[index].endLatLng;
				var info = routingData.legsData[index].endAddress;
				var distanceToLeg = routingData.legsData[index].distance;
				var durationToLeg = routingData.legsData[index].duration / 60;/*
																				 * supposed
																				 * to
																				 * be
																				 * in
																				 * minutes
																				 */
				var steps = routingData.legsData[index].steps;

				distanceToLeg /= 1000;/*
										 * google returns in meters, we need in
										 * km
										 */

				itinerary.addLeg(loc, info, distanceToLeg, durationToLeg, null, steps, null, null);
			}
		}
		// check if last stop was calculated we must force geocode
		if (initialStops[initialStops.length - 1].calculatedStop == true)
		{
			itinerary.legs[itinerary.legs.length - 1].needsToGeocode = true;
		}
		routingData.itinerary = itinerary;
		routingData.inputInfo = {
			stops: initialStops,
			successCb: callback,
			errorCb: errCb
		};
		routingData.originalRouter = this;
		routingData.distanceUnit = this.getCurrentDistanceUnit();
		var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routingData);

		if (callback)
		{
			callback(routeInfo);
		}
	},

	distanceUnit: null,
	/**
	 * Executes the routing on gmaps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	showRoute: function(stops, callback, errCb)
	{
		this._counter = 0;
		console.log("stops", {
			stops: stops
		});
		var offset = 0;
		var completedOnes = 0;
		var routes = [];
		var th = this._startTimer();
		this.distanceUnit = google.maps.UnitSystem.IMPERIAL;
		if (this.getCurrentDistanceUnit() == ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM)
		{
			this.distanceUnit = google.maps.UnitSystem.METRIC;
		}
		var start = 0;
		var overlap = false;
		var complFct = function(response)
		{

			response.overlapPrevious = overlap;
			overlap = false;
			routes.push(response);
			if (dojo.config.fwm.debug == true)
			{
				console.log("total", offset, stops.length);
			}
			if (offset < stops.length)
			{
				start = offset;
				offset += this._routeLimits;
				if (offset >= stops.length)
				{
					offset = stops.length;
				}
				/**
				 * we need to connect route n with route n-1. Suppose we have
				 * limit of 2 stops and we got 3 stops, then we route 1 to 2 and
				 * 2 to 3.
				 */
				if (start > 0)
				{
					console.log("Using last stop from previous request", start, offset, (offset - start));
					start--;
					if ((offset - start) >= this._routeLimits)
					{
						offset--;
					}
					overlap = true;

				}
				var subStopsSet = stops.slice(start, offset);
				if (dojo.config.fwm.debug == true)
				{
					console.log("start", start, "end", offset, subStopsSet.length, subStopsSet[0], subStopsSet[subStopsSet.length - 1]);
				}
				this._calculateRoute(subStopsSet, dojo.hitch(this, complFct), errCb);
			}
			else
			{
				this._multipleRouteSuccess(routes, callback, errCb, stops);
				this._stopTimer(null, stops.length);
			}
			// }
		};

		offset += this._routeLimits;

		if (offset >= stops.length)
		{
			offset = stops.length;
		}
		th = this._startTimer();
		if (dojo.config.fwm.debug == true)
		{
			console.log("start", start, "end", offset, stops.slice(start, offset).length);
		}
		this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), errCb);

	},
	__convertMboToGmapsLatLng: function(mboInfo)
	{
		var latLng = null;
		if (mboInfo.hasOwnProperty("gisdata"))
		{
			if (mboInfo.gisdata.lat != null && mboInfo.gisdata.lng != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.gisdata.lat), parseFloat(mboInfo.gisdata.lng));
			}
			else if (mboInfo.autolocate != null && mboInfo.autolocate.gisdata != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.autolocate.gisdata.lat), parseFloat(mboInfo.autolocate.gisdata.lng));
			}
			else if (mboInfo.hasOwnProperty("lat") && mboInfo != null)
			{
				latLng = new google.maps.LatLng(parseFloat(mboInfo.lat), parseFloat(mboInfo.lng));
			}
			else
			{
				console.warn("Stop doesn't have gis coords", mboInfo);
			}
		}
		else
		{
			latLng = new google.maps.LatLng(parseFloat(mboInfo.lat), parseFloat(mboInfo.lng));
		}
		return latLng;

	},
	/**
	 * calculates one route.
	 * 
	 * @param stops
	 * @param callback
	 * @param errCb
	 */
	_calculateRoute: function(stops, callback, errCb)
	{

		var start = this.__convertMboToGmapsLatLng(stops[0]);

		var end = this.__convertMboToGmapsLatLng(stops[stops.length - 1]);

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,// always in km (meters
			// here)
			waypoints: []
		};

		request.avoidHighways = this.getAvoidHighways();
		request.avoidTolls = this.getAvoidTolls();

		for ( var i = 1; i < stops.length - 1; i++)
		{
			var stop = stops[i];

			var ll = this.__convertMboToGmapsLatLng(stop);// new
			// google.maps.LatLng(parseFloat(stop.lat),
			// parseFloat(stop.lng));
			var wp = {
				location: ll,
				stopover: true
			};
			request.waypoints.push(wp);
		}
		if (this.isOptimizeRoute())
		{
			request.optimizeWaypoints = true;// NOT sure what
			// to do with
			// this since
			// gmaps only
			// suppot 10 orr
			// 25 stops
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("Route request", request);
		}
		var th = this._startTimer();
		var me = this;
		this.directionsService.route(request, function(response, status)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("status", status);
				console.log("response", response);
			}
			me._stopTimer(th, stops.length);

			/**
			 * Google's status codes (the ones with & are supported by our api): &
			 * OK indicates the response contains a valid result. NOT_FOUND
			 * indicates at least one of the locations specified in the
			 * requests's origin, destination, or waypoints could not be
			 * geocoded. & ZERO_RESULTS indicates no route could be found
			 * between the origin and destination. MAX_WAYPOINTS_EXCEEDED
			 * indicates that too many waypoints were provided in the request
			 * The maximum allowed waypoints is 8, plus the origin, and
			 * destination. ( Google Maps API for Business customers may contain
			 * requests with up to 23 waypoints.) INVALID_REQUEST indicates that
			 * the provided request was invalid. & OVER_QUERY_LIMIT indicates
			 * the service has received too many requests from your application
			 * within the allowed time period. & REQUEST_DENIED indicates that
			 * the service denied use of the directions service by your
			 * application. & UNKNOWN_ERROR indicates a directions request could
			 * not be processed due to a server error. The request may succeed
			 * if you try again.
			 */
			if (status == google.maps.DirectionsStatus.OK)
			{
				if (callback)
				{
					callback(response);
				}
			}
			else
			{
				if (errCb)
				{
					switch (status)
					{
						case google.maps.DirectionsStatus.ZERO_RESULTS:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS, status);
							break;
						case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.OVER_LIMIT, status);
							break;
						case google.maps.DirectionsStatus.REQUEST_DENIED:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED, status);
							break;
						default:
							errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN_ERROR, status);
							break;
					}

				}
			}
		});
	}
});
});

},
'ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dijit/Dialog,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Button");

dojo.declare("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog", null, {
	map: null,
	title: null,
	_theDialog: null,
	_content: null,
	mainSec: null,
	undercontent: null,
	fitHeight: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
	},
	createDialog: function()
	{
		var height = this.getCalculatedHeight();
		var width = this.getCalculatedWidth();

		var title = this.title || "";

		var dialogOpts = {
			title: title,
			// 12-12908. Dijit.Dialog has a bug in which the title bar's "x" close button does not
			// work in mobile devices if draggable is set to true.
			draggable: this.map.isMobile ? false:true,
			closable: false,
			style: "width: " + (width) + "px; max-height: " + (height) + "px; overflow-y: auto;"
		};

		this._theDialog = new dijit.Dialog(dialogOpts);
		this._cancelHandler=dojo.connect(this._theDialog,"onCancel",dojo.hitch(this,this._resetMaximoDialogStates));
		// this._theDialog.layout(this.map.getMapstraction().currentElement);
		// this._theDialog.placeAt(this.map.getMapstraction().currentElement);
		// does not work, puts the dialog below the map images

		dojo.connect(window, "onresize", this, this._onResize);
	},
	full: null,
	center: null,
	bottom: null,
	_createContentSection: function(content)
	{
		if (this.center != null && false)
		{
			dojo.place(content, this.center, 'first');
			return this.full;
		}
		else
		{

			var _content = dojo.create("div", {
				style: {
					width: (this.getCalculatedWidth() - this.fixedpaddingw) + "px"
				}
			});
			this.full = _content;
			var mainSec = dojo.create("div", {
				style: {
					overflowY: "auto",
					overflowX: "auto",
					maxHeight: (this.getCalculatedHeight() - this.fixedpaddingh) + "px",
					width: (this.getCalculatedWidth() - this.fixedpaddingw) + "px"
				}
			}, _content);
			// 12-12821. IE ignores the "max-height" attribute so
			// "height" must be used instead.
			if (dojo.isIE && this.fitHeight)
			{
				mainSec.style.height = (this.getCalculatedHeight() - this.fixedpaddingh) + "px";
			}
			this.center = mainSec;
			dojo.place(content, mainSec, 'only');

			var btnDiv = dojo.create("div", {
				"mxnId": "btnDiv",
				"class": "infoPanelCloseBtn",
				"style": {
					"textAlign": (document.body.dir == "rtl") ? "left" : "right"
				}
			}, _content);
			this.btnDiv = btnDiv;

			var btn2 = dojo.create("div", {
				"mxnId": "btn"
			}, btnDiv);

			var _closeButtonLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "infopaneldialogclose");
			this.closeBtn = new dijit.form.Button({
				label: _closeButtonLabel,
				onClick: dojo.hitch(this, function()
				{					
					this.close();
				})
			}, btn2);

			return _content;
		}

	},
	_myFct: function()
	{

	},
	setContent: function(content)
	{
		// Issue 12-11310. The dialog needs to be created every time because the
		// browser window may have
		// been resized since the last time that setContent was called.
		// if (this._theDialog == null)
		// {
		this.createDialog();
		// }
		// console.log("CALLED
		// setContent",this._createContentSections(content));
		this._theDialog._myFct = function()
		{

		};
		this._theDialog.set("content", this._createContentSection(content));

	},
	_onResize: function()
	{
		if (this._theDialog && this._theDialog.get("open"))
		{
			this._recalculateDimensions();
		}
	},
	_recalculateDimensions: function()
	{
		var width = this.getCalculatedWidth();

		if (this.fitHeight)
		{
			var height = this.getCalculatedHeight();
			this._theDialog.resize({w: width, h: height});
			this.center.style.height = (height - this.fixedpaddingh);
		}
		else
		{
			this._theDialog.resize({w: width});
		}
		this.center.style.width = (width - this.fixedpaddingw);
		this.btnDiv.style.width = (width - this.fixedpaddingw);

		this._theDialog.show();
	},
	getCalculatedWidth: function()
	{
		// 12-13416. Very ugly workaround to overcome the fact that there is no way
		// to handle a pinch zoom event in Android
		var isAndroid = navigator.userAgent.indexOf("Android") > -1;
		if(isAndroid)
		{
			this.map._resize();
		}
		
		var MIN_WIDTH = 310;
		var viewPortWidth = this.map.getWidthInPixels();

		if (this.map.isMobile)
		{
			var width = Math.ceil(viewPortWidth * 0.4);
		}
		else
		{
			var width = Math.ceil(viewPortWidth * 0.5);
		}

		if (width > MIN_WIDTH)
		{
			return width;
		}
		// 12-13416. Never let the dialog width be greater than the viewport width.
		if (MIN_WIDTH > viewPortWidth)
		{
			return viewPortWidth;
		}

		return MIN_WIDTH;
	},
	getCalculatedHeight: function()
	{
		// var height = this.map.getHeightInPixels(); //gets the wrong height in
		// fullscreenmode
		var mapHeight = Math.min(dojo.window.getBox().h,
				dojo.marginBox(this.map.getMapstraction().currentElement).h);
		
		// Defect 61760. Minimum height defined for dialogs when the map height is too small
		// This does not apply to mobile maps (everyplace apps), otherwise the close buttons can be hidden in iDevices.
		var height = Math.ceil(mapHeight * 0.85);
		
		if (this.map.isMobile)
		{
			return height;
		}

		var MIN_HEIGHT = 400;
		if (height > MIN_HEIGHT)
		{
			return height;
		}

		return MIN_HEIGHT;
	},
	close: function()
	{
		if (this._theDialog)
		{
			// destroy on the dialog has a conflict with Maximo code.
			// removing all the descendants ease enough the nodes on the DOM
			// tree
			// this._theDialog.destroyDescendants(false);
			this._theDialog.hide();
			// this._theDialog = null;
			// this.closeBtn.destroyRecursive();
			// this.closeBtn = null;
			// maximo!
		}
		this._resetMaximoDialogStates();
	},
	_resetMaximoDialogStates:function(){
		dialogCount--;
		showObjs();		
	},
	fixedpaddingw: 25,
	fixedpaddingh: 80,
	show: function()
	{
		this._recalculateDimensions();
		this._theDialog.show();
		// MAXIMO hide applets
		hideObjs();
		dialogCount++;
	},
	closeBtn: null,
	onCancel: function()
	{
		this.close();
	}
});
});

},
'dijit/ToolbarSeparator':function(){
define("dijit/ToolbarSeparator", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"./_Widget",
	"./_TemplatedMixin"
], function(declare, dom, _Widget, _TemplatedMixin){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/ToolbarSeparator
	// summary:
	//		A spacer between two `dijit.Toolbar` items


	return declare("dijit.ToolbarSeparator", [_Widget, _TemplatedMixin], {
		// summary:
		//		A spacer between two `dijit.Toolbar` items

		templateString: '<div class="dijitToolbarSeparator dijitInline" role="presentation"></div>',

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}
	});
});

},
'dijit/layout/_LayoutWidget':function(){
define("dijit/layout/_LayoutWidget", [
	"dojo/_base/lang", // lang.mixin
	"../_Widget",
	"../_Container",
	"../_Contained",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/window" // win.global
], function(lang, _Widget, _Container, _Contained,
	declare, domClass, domGeometry, domStyle, has, win){

/*=====
	var _Widget = dijit._Widget;
	var _Container = dijit._Container;
	var _Contained = dijit._Contained;
=====*/

	// module:
	//		dijit/layout/_LayoutWidget
	// summary:
	//		_LayoutWidget Base class for a _Container widget which is responsible for laying out its children.
	//		Widgets which mixin this code must define layout() to manage placement and sizing of the children.


	return declare("dijit.layout._LayoutWidget", [_Widget, _Container, _Contained], {
		// summary:
		//		Base class for a _Container widget which is responsible for laying out its children.
		//		Widgets which mixin this code must define layout() to manage placement and sizing of the children.

		// baseClass: [protected extension] String
		//		This class name is applied to the widget's domNode
		//		and also may be used to generate names for sub nodes,
		//		for example dijitTabContainer-content.
		baseClass: "dijitLayoutContainer",

		// isLayoutContainer: [protected] Boolean
		//		Indicates that this widget is going to call resize() on its
		//		children widgets, setting their size, when they become visible.
		isLayoutContainer: true,

		buildRendering: function(){
			this.inherited(arguments);
			domClass.add(this.domNode, "dijitContainer");
		},

		startup: function(){
			// summary:
			//		Called after all the widgets have been instantiated and their
			//		dom nodes have been inserted somewhere under win.doc.body.
			//
			//		Widgets should override this method to do any initialization
			//		dependent on other widgets existing, and then call
			//		this superclass method to finish things off.
			//
			//		startup() in subclasses shouldn't do anything
			//		size related because the size of the widget hasn't been set yet.

			if(this._started){ return; }

			// Need to call inherited first - so that child widgets get started
			// up correctly
			this.inherited(arguments);

			// If I am a not being controlled by a parent layout widget...
			var parent = this.getParent && this.getParent();
			if(!(parent && parent.isLayoutContainer)){
				// Do recursive sizing and layout of all my descendants
				// (passing in no argument to resize means that it has to glean the size itself)
				this.resize();

				// Since my parent isn't a layout container, and my style *may be* width=height=100%
				// or something similar (either set directly or via a CSS class),
				// monitor when viewport size changes so that I can re-layout.
				this.connect(win.global, 'onresize', function(){
					// Using function(){} closure to ensure no arguments passed to resize().
					this.resize();
				});
			}
		},

		resize: function(changeSize, resultSize){
			// summary:
			//		Call this to resize a widget, or after its size has changed.
			// description:
			//		Change size mode:
			//			When changeSize is specified, changes the marginBox of this widget
			//			and forces it to relayout its contents accordingly.
			//			changeSize may specify height, width, or both.
			//
			//			If resultSize is specified it indicates the size the widget will
			//			become after changeSize has been applied.
			//
			//		Notification mode:
			//			When changeSize is null, indicates that the caller has already changed
			//			the size of the widget, or perhaps it changed because the browser
			//			window was resized.  Tells widget to relayout its contents accordingly.
			//
			//			If resultSize is also specified it indicates the size the widget has
			//			become.
			//
			//		In either mode, this method also:
			//			1. Sets this._borderBox and this._contentBox to the new size of
			//				the widget.  Queries the current domNode size if necessary.
			//			2. Calls layout() to resize contents (and maybe adjust child widgets).
			//
			// changeSize: Object?
			//		Sets the widget to this margin-box size and position.
			//		May include any/all of the following properties:
			//	|	{w: int, h: int, l: int, t: int}
			//
			// resultSize: Object?
			//		The margin-box size of this widget after applying changeSize (if
			//		changeSize is specified).  If caller knows this size and
			//		passes it in, we don't need to query the browser to get the size.
			//	|	{w: int, h: int}

			var node = this.domNode;

			// set margin box size, unless it wasn't specified, in which case use current size
			if(changeSize){
				domGeometry.setMarginBox(node, changeSize);
			}

			// If either height or width wasn't specified by the user, then query node for it.
			// But note that setting the margin box and then immediately querying dimensions may return
			// inaccurate results, so try not to depend on it.
			var mb = resultSize || {};
			lang.mixin(mb, changeSize || {});	// changeSize overrides resultSize
			if( !("h" in mb) || !("w" in mb) ){
				mb = lang.mixin(domGeometry.getMarginBox(node), mb);	// just use domGeometry.marginBox() to fill in missing values
			}

			// Compute and save the size of my border box and content box
			// (w/out calling domGeometry.getContentBox() since that may fail if size was recently set)
			var cs = domStyle.getComputedStyle(node);
			var me = domGeometry.getMarginExtents(node, cs);
			var be = domGeometry.getBorderExtents(node, cs);
			var bb = (this._borderBox = {
				w: mb.w - (me.w + be.w),
				h: mb.h - (me.h + be.h)
			});
			var pe = domGeometry.getPadExtents(node, cs);
			this._contentBox = {
				l: domStyle.toPixelValue(node, cs.paddingLeft),
				t: domStyle.toPixelValue(node, cs.paddingTop),
				w: bb.w - pe.w,
				h: bb.h - pe.h
			};

			// Callback for widget to adjust size of its children
			this.layout();
		},

		layout: function(){
			// summary:
			//		Widgets override this method to size and position their contents/children.
			//		When this is called this._contentBox is guaranteed to be set (see resize()).
			//
			//		This is called after startup(), and also when the widget's size has been
			//		changed.
			// tags:
			//		protected extension
		},

		_setupChild: function(/*dijit._Widget*/child){
			// summary:
			//		Common setup for initial children and children which are added after startup
			// tags:
			//		protected extension

			var cls = this.baseClass + "-child "
				+ (child.baseClass ? this.baseClass + "-" + child.baseClass : "");
			domClass.add(child.domNode, cls);
		},

		addChild: function(/*dijit._Widget*/ child, /*Integer?*/ insertIndex){
			// Overrides _Container.addChild() to call _setupChild()
			this.inherited(arguments);
			if(this._started){
				this._setupChild(child);
			}
		},

		removeChild: function(/*dijit._Widget*/ child){
			// Overrides _Container.removeChild() to remove class added by _setupChild()
			var cls = this.baseClass + "-child"
					+ (child.baseClass ?
						" " + this.baseClass + "-" + child.baseClass : "");
			domClass.remove(child.domNode, cls);

			this.inherited(arguments);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/factories/bingmaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/BingMaps"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.bingmaps");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.BingMaps");
/**
 * Factory to load bing maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.bingmaps = {
	/**
	 * After we load the bing maps javascripts this method is called. 
	 */
	loaded:false,
	apiLoaded : function() {		
		console.log('Bing Maps API is now available');
		ibm.tivoli.fwm.mxmap.factories.bingmaps.loaded=true;
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.BingMaps","bingmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {
		this._loadJSApi(options.mapConf.key, options.mapConf.https, options.mapConf.locale);
	},
	/**
	 * this method loads the bing maps api and the mapstraction js for bing.
	 */
	_loadJSApi : function(key, https, locale) {
		var queryStr = "";
		var protocol = 'http';
		var license = '';
		if(https){
			protocol = 'https';
			queryStr+="&s=1";
		}
		if(key){
			license = '&key=' + key;
			queryStr+=license;
		}else{
			console.warn("no bing maps key was set.");
		}
		if(locale){
			var locStr = '&mkt=' + locale.locStr;
			queryStr+=locStr;
		}else{
			console.warn("no locale was set.");
		}
		
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.microsoftv7.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot+"/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.microsoftv7.geocoder.js", "js");
		window.fwmBingMapsLoaded=function(){
			ibm.tivoli.fwm.mxmap.factories.bingmaps.apiLoaded();
		};
		queryStr+="&onscriptload=fwmBingMapsLoaded";
		dojo.io.script.get({
			url : protocol + '://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0' + queryStr,
			timeout : 30000,
			error : function() {
				console.error('Failed to load bing apis');
				alert('Failed to load bing maps api');
			}
		});
		//NOT NEEDED since the onscriptload method is working.
		//ibm.tivoli.fwm.mxmap.factories.bingmaps.apiPooler();
	},
	 
	apiPooler:function(){
		try{
		if(Microsoft && Microsoft.Maps){
			ibm.tivoli.fwm.mxmap.factories.bingmaps.apiLoaded();
			return;
		}
		}catch (e) {
			// todo: handle exception
		}
		
			if(ibm.tivoli.fwm.mxmap.factories.bingmaps.loaded!=true){
				setTimeout("ibm.tivoli.fwm.mxmap.factories.bingmaps.apiPooler",500);
			}
		
		
	}
};

});

},
'dijit/popup':function(){
define("dijit/popup", [
	"dojo/_base/array", // array.forEach array.some
	"dojo/aspect",
	"dojo/_base/connect",	// connect._keypress
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-construct", // domConstruct.create domConstruct.destroy
	"dojo/dom-geometry", // domGeometry.isBodyLtr
	"dojo/dom-style", // domStyle.set
	"dojo/_base/event", // event.stop
	"dojo/keys",
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie") has("mozilla")
	"dojo/_base/window", // win.body
	"./place",
	"./BackgroundIframe",
	"."	// dijit (defining dijit.popup to match API doc)
], function(array, aspect, connect, declare, dom, domAttr, domConstruct, domGeometry, domStyle, event, keys, lang, on, has, win,
			place, BackgroundIframe, dijit){

	// module:
	//		dijit/popup
	// summary:
	//		Used to show drop downs (ex: the select list of a ComboBox)
	//		or popups (ex: right-click context menus)


	/*=====
	dijit.popup.__OpenArgs = function(){
		// popup: Widget
		//		widget to display
		// parent: Widget
		//		the button etc. that is displaying this popup
		// around: DomNode
		//		DOM node (typically a button); place popup relative to this node.  (Specify this *or* "x" and "y" parameters.)
		// x: Integer
		//		Absolute horizontal position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		// y: Integer
		//		Absolute vertical position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		// orient: Object|String
		//		When the around parameter is specified, orient should be a list of positions to try, ex:
		//	|	[ "below", "above" ]
		//		For backwards compatibility it can also be an (ordered) hash of tuples of the form
		//		(around-node-corner, popup-node-corner), ex:
		//	|	{ "BL": "TL", "TL": "BL" }
		//		where BL means "bottom left" and "TL" means "top left", etc.
		//
		//		dijit.popup.open() tries to position the popup according to each specified position, in order,
		//		until the popup appears fully within the viewport.
		//
		//		The default value is ["below", "above"]
		//
		//		When an (x,y) position is specified rather than an around node, orient is either
		//		"R" or "L".  R (for right) means that it tries to put the popup to the right of the mouse,
		//		specifically positioning the popup's top-right corner at the mouse position, and if that doesn't
		//		fit in the viewport, then it tries, in order, the bottom-right corner, the top left corner,
		//		and the top-right corner.
		// onCancel: Function
		//		callback when user has canceled the popup by
		//			1. hitting ESC or
		//			2. by using the popup widget's proprietary cancel mechanism (like a cancel button in a dialog);
		//			   i.e. whenever popupWidget.onCancel() is called, args.onCancel is called
		// onClose: Function
		//		callback whenever this popup is closed
		// onExecute: Function
		//		callback when user "executed" on the popup/sub-popup by selecting a menu choice, etc. (top menu only)
		// padding: dijit.__Position
		//		adding a buffer around the opening position. This is only useful when around is not set.
		this.popup = popup;
		this.parent = parent;
		this.around = around;
		this.x = x;
		this.y = y;
		this.orient = orient;
		this.onCancel = onCancel;
		this.onClose = onClose;
		this.onExecute = onExecute;
		this.padding = padding;
	}
	=====*/

	/*=====
	dijit.popup = {
		// summary:
		//		Used to show drop downs (ex: the select list of a ComboBox)
		//		or popups (ex: right-click context menus).
		//
		//		Access via require(["dijit/popup"], function(popup){ ... }).

		moveOffScreen: function(widget){
			// summary:
			//		Moves the popup widget off-screen.
			//		Do not use this method to hide popups when not in use, because
			//		that will create an accessibility issue: the offscreen popup is
			//		still in the tabbing order.
			// widget: dijit._WidgetBase
			//		The widget
		},

		hide: function(widget){
			// summary:
			//		Hide this popup widget (until it is ready to be shown).
			//		Initialization for widgets that will be used as popups
			//
			// 		Also puts widget inside a wrapper DIV (if not already in one)
			//
			//		If popup widget needs to layout it should
			//		do so when it is made visible, and popup._onShow() is called.
			// widget: dijit._WidgetBase
			//		The widget
		},

		open: function(args){
			// summary:
			//		Popup the widget at the specified position
			// example:
			//		opening at the mouse position
			//		|		popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
			// example:
			//		opening the widget as a dropdown
			//		|		popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}});
			//
			//		Note that whatever widget called dijit.popup.open() should also listen to its own _onBlur callback
			//		(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.
			// args: dijit.popup.__OpenArgs
			//		Parameters
			return {};	// Object specifying which position was chosen
		},

		close: function(popup){
			// summary:
			//		Close specified popup and any popups that it parented.
			//		If no popup is specified, closes all popups.
			// widget: dijit._WidgetBase?
			//		The widget, optional
		}
	};
	=====*/

	var PopupManager = declare(null, {
		// _stack: dijit._Widget[]
		//		Stack of currently popped up widgets.
		//		(someone opened _stack[0], and then it opened _stack[1], etc.)
		_stack: [],

		// _beginZIndex: Number
		//		Z-index of the first popup.   (If first popup opens other
		//		popups they get a higher z-index.)
		_beginZIndex: 1000,

		_idGen: 1,

		_createWrapper: function(/*Widget*/ widget){
			// summary:
			//		Initialization for widgets that will be used as popups.
			//		Puts widget inside a wrapper DIV (if not already in one),
			//		and returns pointer to that wrapper DIV.

			var wrapper = widget._popupWrapper,
				node = widget.domNode;

			if(!wrapper){
				// Create wrapper <div> for when this widget [in the future] will be used as a popup.
				// This is done early because of IE bugs where creating/moving DOM nodes causes focus
				// to go wonky, see tests/robot/Toolbar.html to reproduce
				wrapper = domConstruct.create("div",{
					"class":"dijitPopup",
					style:{ display: "none"},
					role: "presentation"
				}, win.body());
				wrapper.appendChild(node);

				var s = node.style;
				s.display = "";
				s.visibility = "";
				s.position = "";
				s.top = "0px";

				widget._popupWrapper = wrapper;
				aspect.after(widget, "destroy", function(){
					domConstruct.destroy(wrapper);
					delete widget._popupWrapper;
				});
			}

			return wrapper;
		},

		moveOffScreen: function(/*Widget*/ widget){
			// summary:
			//		Moves the popup widget off-screen.
			//		Do not use this method to hide popups when not in use, because
			//		that will create an accessibility issue: the offscreen popup is
			//		still in the tabbing order.

			// Create wrapper if not already there
			var wrapper = this._createWrapper(widget);

			domStyle.set(wrapper, {
				visibility: "hidden",
				top: "-9999px",		// prevent transient scrollbar causing misalign (#5776), and initial flash in upper left (#10111)
				display: ""
			});
		},

		hide: function(/*Widget*/ widget){
			// summary:
			//		Hide this popup widget (until it is ready to be shown).
			//		Initialization for widgets that will be used as popups
			//
			// 		Also puts widget inside a wrapper DIV (if not already in one)
			//
			//		If popup widget needs to layout it should
			//		do so when it is made visible, and popup._onShow() is called.

			// Create wrapper if not already there
			var wrapper = this._createWrapper(widget);

			domStyle.set(wrapper, "display", "none");
		},

		getTopPopup: function(){
			// summary:
			//		Compute the closest ancestor popup that's *not* a child of another popup.
			//		Ex: For a TooltipDialog with a button that spawns a tree of menus, find the popup of the button.
			var stack = this._stack;
			for(var pi=stack.length-1; pi > 0 && stack[pi].parent === stack[pi-1].widget; pi--){
				/* do nothing, just trying to get right value for pi */
			}
			return stack[pi];
		},

		open: function(/*dijit.popup.__OpenArgs*/ args){
			// summary:
			//		Popup the widget at the specified position
			//
			// example:
			//		opening at the mouse position
			//		|		popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
			//
			// example:
			//		opening the widget as a dropdown
			//		|		popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}});
			//
			//		Note that whatever widget called dijit.popup.open() should also listen to its own _onBlur callback
			//		(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.

			var stack = this._stack,
				widget = args.popup,
				orient = args.orient || ["below", "below-alt", "above", "above-alt"],
				ltr = args.parent ? args.parent.isLeftToRight() : domGeometry.isBodyLtr(),
				around = args.around,
				id = (args.around && args.around.id) ? (args.around.id+"_dropdown") : ("popup_"+this._idGen++);

			// If we are opening a new popup that isn't a child of a currently opened popup, then
			// close currently opened popup(s).   This should happen automatically when the old popups
			// gets the _onBlur() event, except that the _onBlur() event isn't reliable on IE, see [22198].
			while(stack.length && (!args.parent || !dom.isDescendant(args.parent.domNode, stack[stack.length-1].widget.domNode))){
				this.close(stack[stack.length-1].widget);
			}

			// Get pointer to popup wrapper, and create wrapper if it doesn't exist
			var wrapper = this._createWrapper(widget);


			domAttr.set(wrapper, {
				id: id,
				style: {
					zIndex: this._beginZIndex + stack.length
				},
				"class": "dijitPopup " + (widget.baseClass || widget["class"] || "").split(" ")[0] +"Popup",
				dijitPopupParent: args.parent ? args.parent.id : ""
			});

			if(has("ie") || has("mozilla")){
				if(!widget.bgIframe){
					// setting widget.bgIframe triggers cleanup in _Widget.destroy()
					widget.bgIframe = new BackgroundIframe(wrapper);
				}
			}

			// position the wrapper node and make it visible
			var best = around ?
				place.around(wrapper, around, orient, ltr, widget.orient ? lang.hitch(widget, "orient") : null) :
				place.at(wrapper, args, orient == 'R' ? ['TR','BR','TL','BL'] : ['TL','BL','TR','BR'], args.padding);

			wrapper.style.display = "";
			wrapper.style.visibility = "visible";
			widget.domNode.style.visibility = "visible";	// counteract effects from _HasDropDown

			var handlers = [];

			// provide default escape and tab key handling
			// (this will work for any widget, not just menu)
			handlers.push(on(wrapper, connect._keypress, lang.hitch(this, function(evt){
				if(evt.charOrCode == keys.ESCAPE && args.onCancel){
					event.stop(evt);
					args.onCancel();
				}else if(evt.charOrCode === keys.TAB){
					event.stop(evt);
					var topPopup = this.getTopPopup();
					if(topPopup && topPopup.onCancel){
						topPopup.onCancel();
					}
				}
			})));

			// watch for cancel/execute events on the popup and notify the caller
			// (for a menu, "execute" means clicking an item)
			if(widget.onCancel && args.onCancel){
				handlers.push(widget.on("cancel", args.onCancel));
			}

			handlers.push(widget.on(widget.onExecute ? "execute" : "change", lang.hitch(this, function(){
				var topPopup = this.getTopPopup();
				if(topPopup && topPopup.onExecute){
					topPopup.onExecute();
				}
			})));

			stack.push({
				widget: widget,
				parent: args.parent,
				onExecute: args.onExecute,
				onCancel: args.onCancel,
				onClose: args.onClose,
				handlers: handlers
			});

			if(widget.onOpen){
				// TODO: in 2.0 standardize onShow() (used by StackContainer) and onOpen() (used here)
				widget.onOpen(best);
			}

			return best;
		},

		close: function(/*Widget?*/ popup){
			// summary:
			//		Close specified popup and any popups that it parented.
			//		If no popup is specified, closes all popups.

			var stack = this._stack;

			// Basically work backwards from the top of the stack closing popups
			// until we hit the specified popup, but IIRC there was some issue where closing
			// a popup would cause others to close too.  Thus if we are trying to close B in [A,B,C]
			// closing C might close B indirectly and then the while() condition will run where stack==[A]...
			// so the while condition is constructed defensively.
			while((popup && array.some(stack, function(elem){return elem.widget == popup;})) ||
				(!popup && stack.length)){
				var top = stack.pop(),
					widget = top.widget,
					onClose = top.onClose;

				if(widget.onClose){
					// TODO: in 2.0 standardize onHide() (used by StackContainer) and onClose() (used here)
					widget.onClose();
				}

				var h;
				while(h = top.handlers.pop()){ h.remove(); }

				// Hide the widget and it's wrapper unless it has already been destroyed in above onClose() etc.
				if(widget && widget.domNode){
					this.hide(widget);
				}

				if(onClose){
					onClose();
				}
			}
		}
	});

	return (dijit.popup = new PopupManager());
});

},
'dijit/_base/manager':function(){
define("dijit/_base/manager", [
	"dojo/_base/array",
	"dojo/_base/config", // defaultDuration
	"../registry",
	".."	// for setting exports to dijit namespace
], function(array, config, registry, dijit){

	// module:
	//		dijit/_base/manager
	// summary:
	//		Shim to methods on registry, plus a few other declarations.
	//		New code should access dijit/registry directly when possible.

	/*=====
	dijit.byId = function(id){
		// summary:
		//		Returns a widget by it's id, or if passed a widget, no-op (like dom.byId())
		// id: String|dijit._Widget
		return registry.byId(id); // dijit._Widget
	};

	dijit.getUniqueId = function(widgetType){
		// summary:
		//		Generates a unique id for a given widgetType
		// widgetType: String
		return registry.getUniqueId(widgetType); // String
	};

	dijit.findWidgets = function(root){
		// summary:
		//		Search subtree under root returning widgets found.
		//		Doesn't search for nested widgets (ie, widgets inside other widgets).
		// root: DOMNode
		return registry.findWidgets(root);
	};

	dijit._destroyAll = function(){
		// summary:
		//		Code to destroy all widgets and do other cleanup on page unload

		return registry._destroyAll();
	};

	dijit.byNode = function(node){
		// summary:
		//		Returns the widget corresponding to the given DOMNode
		// node: DOMNode
		return registry.byNode(node); // dijit._Widget
	};

	dijit.getEnclosingWidget = function(node){
		// summary:
		//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
		//		the node is not contained within the DOM tree of any widget
		// node: DOMNode
		return registry.getEnclosingWidget(node);
	};
	=====*/
	array.forEach(["byId", "getUniqueId", "findWidgets", "_destroyAll", "byNode", "getEnclosingWidget"], function(name){
		dijit[name] = registry[name];
	});

	/*=====
	dojo.mixin(dijit, {
		// defaultDuration: Integer
		//		The default fx.animation speed (in ms) to use for all Dijit
		//		transitional fx.animations, unless otherwise specified
		//		on a per-instance basis. Defaults to 200, overrided by
		//		`djConfig.defaultDuration`
		defaultDuration: 200
	});
	=====*/
	dijit.defaultDuration = config["defaultDuration"] || 200;

	return dijit;
});

},
'dojo/dnd/Mover':function(){
define("dojo/dnd/Mover", ["../main", "../Evented", "../touch", "./common", "./autoscroll"], function(dojo, Evented, touch) {
	// module:
	//		dojo/dnd/Mover
	// summary:
	//		TODOC


dojo.declare("dojo.dnd.Mover", [Evented], {
	constructor: function(node, e, host){
		// summary:
		//		an object which makes a node follow the mouse, or touch-drag on touch devices.
		//		Used as a default mover, and as a base class for custom movers.
		// node: Node
		//		a node (or node's id) to be moved
		// e: Event
		//		a mouse event, which started the move;
		//		only pageX and pageY properties are used
		// host: Object?
		//		object which implements the functionality of the move,
		//	 	and defines proper events (onMoveStart and onMoveStop)
		this.node = dojo.byId(node);
		this.marginBox = {l: e.pageX, t: e.pageY};
		this.mouseButton = e.button;
		var h = (this.host = host), d = node.ownerDocument;
		this.events = [
			// At the start of a drag, onFirstMove is called, and then the following two
			// connects are disconnected
			dojo.connect(d, touch.move, this, "onFirstMove"),

			// These are called continually during the drag
			dojo.connect(d, touch.move, this, "onMouseMove"),

			// And these are called at the end of the drag
			dojo.connect(d, touch.release,   this, "onMouseUp"),

			// cancel text selection and text dragging
			dojo.connect(d, "ondragstart",   dojo.stopEvent),
			dojo.connect(d.body, "onselectstart", dojo.stopEvent)
		];
		// notify that the move has started
		if(h && h.onMoveStart){
			h.onMoveStart(this);
		}
	},
	// mouse event processors
	onMouseMove: function(e){
		// summary:
		//		event processor for onmousemove/ontouchmove
		// e: Event
		//		mouse/touch event
		dojo.dnd.autoScroll(e);
		var m = this.marginBox;
		this.host.onMove(this, {l: m.l + e.pageX, t: m.t + e.pageY}, e);
		dojo.stopEvent(e);
	},
	onMouseUp: function(e){
		if(dojo.isWebKit && dojo.isMac && this.mouseButton == 2 ?
				e.button == 0 : this.mouseButton == e.button){ // TODO Should condition be met for touch devices, too?
			this.destroy();
		}
		dojo.stopEvent(e);
	},
	// utilities
	onFirstMove: function(e){
		// summary:
		//		makes the node absolute; it is meant to be called only once.
		// 		relative and absolutely positioned nodes are assumed to use pixel units
		var s = this.node.style, l, t, h = this.host;
		switch(s.position){
			case "relative":
			case "absolute":
				// assume that left and top values are in pixels already
				l = Math.round(parseFloat(s.left)) || 0;
				t = Math.round(parseFloat(s.top)) || 0;
				break;
			default:
				s.position = "absolute";	// enforcing the absolute mode
				var m = dojo.marginBox(this.node);
				// event.pageX/pageY (which we used to generate the initial
				// margin box) includes padding and margin set on the body.
				// However, setting the node's position to absolute and then
				// doing dojo.marginBox on it *doesn't* take that additional
				// space into account - so we need to subtract the combined
				// padding and margin.  We use getComputedStyle and
				// _getMarginBox/_getContentBox to avoid the extra lookup of
				// the computed style.
				var b = dojo.doc.body;
				var bs = dojo.getComputedStyle(b);
				var bm = dojo._getMarginBox(b, bs);
				var bc = dojo._getContentBox(b, bs);
				l = m.l - (bc.l - bm.l);
				t = m.t - (bc.t - bm.t);
				break;
		}
		this.marginBox.l = l - this.marginBox.l;
		this.marginBox.t = t - this.marginBox.t;
		if(h && h.onFirstMove){
			h.onFirstMove(this, e);
		}

		// Disconnect onmousemove and ontouchmove events that call this function
		dojo.disconnect(this.events.shift());
	},
	destroy: function(){
		// summary:
		//		stops the move, deletes all references, so the object can be garbage-collected
		dojo.forEach(this.events, dojo.disconnect);
		// undo global settings
		var h = this.host;
		if(h && h.onMoveStop){
			h.onMoveStop(this);
		}
		// destroy objects
		this.events = this.node = this.host = null;
	}
});

return dojo.dnd.Mover;
});

},
'dijit/BackgroundIframe':function(){
define("dijit/BackgroundIframe", [
	"require",			// require.toUrl
	".",	// to export dijit.BackgroundIframe
	"dojo/_base/config",
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-style", // domStyle.set
	"dojo/_base/lang", // lang.extend lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie"), has("mozilla"), has("quirks")
	"dojo/_base/window" // win.doc.createElement
], function(require, dijit, config, domConstruct, domStyle, lang, on, has, win){

	// module:
	//		dijit/BackgroundIFrame
	// summary:
	//		new dijit.BackgroundIframe(node)
	//		Makes a background iframe as a child of node, that fills
	//		area (and position) of node

	// TODO: remove _frames, it isn't being used much, since popups never release their
	// iframes (see [22236])
	var _frames = new function(){
		// summary:
		//		cache of iframes

		var queue = [];

		this.pop = function(){
			var iframe;
			if(queue.length){
				iframe = queue.pop();
				iframe.style.display="";
			}else{
				if(has("ie") < 9){
					var burl = config["dojoBlankHtmlUrl"] || require.toUrl("dojo/resources/blank.html") || "javascript:\"\"";
					var html="<iframe src='" + burl + "' role='presentation'"
						+ " style='position: absolute; left: 0px; top: 0px;"
						+ "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
					iframe = win.doc.createElement(html);
				}else{
					iframe = domConstruct.create("iframe");
					iframe.src = 'javascript:""';
					iframe.className = "dijitBackgroundIframe";
					iframe.setAttribute("role", "presentation");
					domStyle.set(iframe, "opacity", 0.1);
				}
				iframe.tabIndex = -1; // Magic to prevent iframe from getting focus on tab keypress - as style didn't work.
			}
			return iframe;
		};

		this.push = function(iframe){
			iframe.style.display="none";
			queue.push(iframe);
		}
	}();


	dijit.BackgroundIframe = function(/*DomNode*/ node){
		// summary:
		//		For IE/FF z-index schenanigans. id attribute is required.
		//
		// description:
		//		new dijit.BackgroundIframe(node)
		//			Makes a background iframe as a child of node, that fills
		//			area (and position) of node

		if(!node.id){ throw new Error("no id"); }
		if(has("ie") || has("mozilla")){
			var iframe = (this.iframe = _frames.pop());
			node.appendChild(iframe);
			if(has("ie")<7 || has("quirks")){
				this.resize(node);
				this._conn = on(node, 'resize', lang.hitch(this, function(){
					this.resize(node);
				}));
			}else{
				domStyle.set(iframe, {
					width: '100%',
					height: '100%'
				});
			}
		}
	};

	lang.extend(dijit.BackgroundIframe, {
		resize: function(node){
			// summary:
			// 		Resize the iframe so it's the same size as node.
			//		Needed on IE6 and IE/quirks because height:100% doesn't work right.
			if(this.iframe){
				domStyle.set(this.iframe, {
					width: node.offsetWidth + 'px',
					height: node.offsetHeight + 'px'
				});
			}
		},
		destroy: function(){
			// summary:
			//		destroy the iframe
			if(this._conn){
				this._conn.remove();
				this._conn = null;
			}
			if(this.iframe){
				_frames.push(this.iframe);
				delete this.iframe;
			}
		}
	});

	return dijit.BackgroundIframe;
});

},
'url:dijit/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n",
'ibm/tivoli/fwm/mxmap/routing/Router':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation,ibm/tivoli/fwm/mxmap/MXRecord"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");
dojo.require("ibm.tivoli.fwm.mxmap.MXRecord");
/**
 * Maximo router main helper class.<br>
 * Map providers must extend this class
 */
ibm.tivoli.fwm.mxmap.routing.CalculatedStops = {
	CONF_START_STOP: "ConfiguredStartLocation",
	CONF_END_STOP: "ConfiguredEndLocation",
	USER_LOCATION_STOP: "UserGeoLocation"
};
ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes = {
	ZERO_RESULTS: "ZERO_RESULTS",
	INVALID_REQUEST: "INVALID_REQUEST",
	REQUEST_DENIED: "REQUEST_DENIED",
	OVER_LIMIT: "OVER_LIMIT",
	MIN_STOPS_REQ: "MIN_STOPS_REQ",
	TIMEOUT: "TIMEOUT",
	UNKNOWN: "UNKNOWN"
};
ibm.tivoli.fwm.mxmap.routing.DistanceUnit = {
	KM: 0,
	MILES: 1,
	getLabel: function(unitType)
	{
		if (unitType == this.KM)
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancekm");
		}
		else
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancemi");
		}
	},
	getBy1000Label: function(unitType)
	{
		if (unitType == this.KM)
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distancemeters");
		}
		else
		{
			return ibm.tivoli.fwm.i18n.getMaxMsg("map", "distanceft");
		}
	},
	formatDistance: function(valueInKilometers, unit)
	{
		var val = 0;
		var tokenStr = "";
		var strVal = "";

		if (unit == this.MILES)
		{
			valueInKilometers = valueInKilometers / 1.6;
		}
		if (valueInKilometers <= 0.1)
		{
			val = (valueInKilometers * 10000);
			tokenStr = this.getBy1000Label(unit);
		}
		else
		{
			val = valueInKilometers * 10;
			tokenStr = this.getLabel(unit);
		}
		val = Math.round(val);
		val = val / 10;
		
		strVal = tokenStr.replace("{0}", val.toString());
		
		return strVal;
	},
	formatTime: function(time)
	{
		var tokenStr = "";
		var strVal = "";
		var hr = Math.floor(time / 60), // Important to use math.floor with
		// hours
		min = Math.round(time % 60);

		if (hr < 1 && min < 1)
		{
			return strVal;
		}
		else if (hr < 1)
		{
			tokenStr = ibm.tivoli.fwm.i18n.getMaxMsg("map", "timemin");
			strVal = tokenStr.replace("{0}", min.toString());
		}
		else
		{
			tokenStr = ibm.tivoli.fwm.i18n.getMaxMsg("map", "timehmin");
			strVal = tokenStr.replace("{0}", hr.toString());
			strVal = strVal.replace("{1}", min.toString());
		}
		return strVal;

	}
};
dojo.declare("ibm.tivoli.fwm.mxmap.routing.Router", ibm.tivoli.fwm.mxmap._Base, {
	routecolor: null,
	endLocation: null,
	startLocation: null,
	optimizeroute: false,
	myCurrentLocationInstance: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.myCurrentLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
	},
	/**
	 * Tries to get the device location thru the w3c Geolocation API.<br>
	 * It has a timeout of 10 seconds and if device does not support geolocation
	 * it returns an error code 4.
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html
	 * @param callback
	 * @param errorCb
	 */
	getUserLocation: function(callback, errorCb)
	{
		if (this.myCurrentLocationInstance)
		{
			var errorCallback = function()
			{
				if (this.map)
				{
					this.map.failedToGetLocation();
				}
				errorCb();
			};
			
			this.myCurrentLocationInstance.getUserLocation(callback, dojo.hitch(this, errorCallback));
		}
	},
	/**
	 * Converts the current geolocation position into a standard stop.
	 * 
	 * @returns
	 */
	_getUserLocationStop: function()
	{
		var userLocStop = null;
		if (this.myCurrentLocationInstance)
		{
			var position = this.myCurrentLocationInstance.getPosition();
			userLocStop = {
				name: "currentLocation",
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		}
		return userLocStop;
	},
	isLocationStatusUnassigned: function()
	{
		var isLocStatUnassigned = false;
		if (this.myCurrentLocationInstance)
		{
			isLocStatUnassigned = this.myCurrentLocationInstance.isStatusUnassigned();
		}
		return isLocStatUnassigned;
	},
	isLocationStatusHasLocation: function()
	{
		var isLocStatHasLoc = false;
		if (this.myCurrentLocationInstance)
		{
			isLocStatHasLoc = this.myCurrentLocationInstance.isStatusHasLocation();
		}
		return isLocStatHasLoc;
	},
	_checkForCalculatedStops: function(stops)
	{
		
		if (stops && stops.length > 0)
		{
			console.log("Total stops " + stops.length);			
						
			if (stops[0].calculatedStop == true)
			{
				stops = stops.slice(1, stops.length );
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log(stops.length, stops);
			}
			var lastStopIndex = 0;
			if (stops.length == 0)
			{
				return stops;
			}
			if (stops.length > 0)
			{
				lastStopIndex = stops.length - 1;
			}
			if (stops[stops.length - 1].calculatedStop == true)
			{
				stops = stops.slice(0, stops.length - 1);
			}
		}
		// check if any missing GISDATA stop
		var i = 0;
		while (i < stops.length)
		{
			var stop = stops[i];
			var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});
			if (mxRec.hasAnyGISCoordinates() == false)
			{
				console.warn("Stop", stop, "Has no GIS info",stops.length);				
				stops=stops.slice(0,i).concat(stops.slice(i+1));
				console.warn("Stop", stops.length);
			}else{
				i++;
			}

		}

		return stops;
	},
	/**
	 * Draw the route based on a set of stops and the current route
	 * configuration.<br>
	 * If route starts with current location it retrieves the current location
	 * and inserts it into the 1st stop.<br>
	 * Else if there is a starting point set with lat/lng it inserts the
	 * starting point into the 1st stop.<br>
	 * If there is an ending point set with lat/lng it inserts the ending point
	 * into the 1st stop.<br>
	 * 
	 * @param stops []
	 * @param successcallback
	 * @param errorCallback
	 */
	drawRoute: function(stops, callback, errorCallback, instanceConf)
	{

		

		stops = this._checkForCalculatedStops(stops);
		console.log("conf instance ", instanceConf);
		if (this.isStartWithCurrentLocation(instanceConf) && this.isLocationStatusUnassigned())
		{
			var fct = function()
			{
				console.info("continuing to draw route WITH user start location");				
				this.drawRoute(stops, callback, errorCallback);
			};
			var fctError = function()
			{
				console.info("continuing to draw route without user start location");
				this.drawRoute(stops, callback, errorCallback);
			};
			console.log("getting user location");
			this.getUserLocation(dojo.hitch(this, fct), dojo.hitch(this, fctError));
		}
		else
		{
			var _stops = [];
			if (this.isStartWithCurrentLocation(instanceConf) && this.isLocationStatusHasLocation())
			{
				var ul = this._getUserLocationStop(instanceConf);
				ul.calculatedStop = true;
				ul.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.USER_LOCATION_STOP;
				_stops.push(ul);
			}
			else
			{
				var startLocation = this.startLocation;
				if (instanceConf && instanceConf.startLocation != null)
				{
					startLocation = instanceConf.startLocation;
				}
				if (startLocation && startLocation.hasOwnProperty("lat") && startLocation.lat != null)
				{
					startLocation.calculatedStop = true;
					startLocation.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.CONF_START_STOP;
					_stops.push(startLocation);
				}
			}

			_stops = _stops.concat(stops);
			var endLocation = this.endLocation;
			if (instanceConf && instanceConf.endLocation != null)
			{
				endLocation = instanceConf.endLocation;
			}
			if (endLocation && endLocation.hasOwnProperty("lat") && endLocation.lat != null)
			{
				endLocation.calculatedStop = true;
				endLocation.calculatedStopType = ibm.tivoli.fwm.mxmap.routing.CalculatedStops.CONF_END_STOP;
				_stops.push(endLocation);
			}
			if (_stops.length < 2)
			{
				console.warn("at least 2 stops are needed");
				errorCallback(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ, "at least 2 stops are needed");
				return;
			}
			this.showRoute(_stops, callback, errorCallback, true, instanceConf);
		}

	},
	
	/**
	 * this is the extension point of routing. All implementations must override
	 * this method
	 * 
	 * @param stops
	 * @param cb
	 * @param errcb
	 */
	showRoute: function(stops, cb, errcb, zoomToRoute)
	{
		throw "No showRoute implementation";
	},
	isStartWithCurrentLocation: function(instanceConf)
	{
		if (instanceConf && instanceConf.startithcurrentlocation)
		{
			return instanceConf.startwithcurrentlocation == "true";
		}
		else
		{
			return this.startwithcurrentlocation == "true";
		}
	},
	isOptimizeRoute: function()
	{
		return this.optimizeroute == "true";
	},

	destroyRecursive: function()
	{
		this.inherited(arguments);
	},

	getCurrentDistanceUnit: function()
	{
		if (this.customConf)
		{
			return this.customConf.distanceUnit;
		}
		else
		{
			return ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM;
		}

	},
	getAvoidHighways: function()
	{
		if (this.customConf)
		{
			return this.customConf.avoidHighway;
		}
		return false;

	},
	getAvoidTolls: function()
	{
		if (this.customConf)
		{
			return this.customConf.avoidToll;
		}
		return false;

	},
	/**
	 * The code below is only for evaluating route performance.
	 */
	timers: null,
	_startTimer: function()
	{
		try
		{
			if (dojo.config.fwm.debug == true)
			{
				if (this.timers == null)
				{
					this.timers = [];
				}

				this.timers.push(new Date().getTime());
				return this.timers.length - 1;
			}
			return -1;
		}
		catch (e)
		{
			console.log("error starting timer", e);
		}
	},

	_stopTimer: function(h, total)
	{
		try
		{
			if (dojo.config.fwm.debug == true)
			{
				var endt = new Date().getTime();
				if (h == null)
				{
					console.info("Total routing time for " + total + " stops in (s) ", (endt - this.timers[0]) / 1000);
					this.timers = null;
				}
				else
				{
					console.log("Route step routing time for " + total + " stops in (s) ", (endt - this.timers[h]) / 1000);
				}
			}
		}
		catch (e)
		{
			console.log("error stopping timer", e);
		}
	}

});
});

},
'dijit/form/Button':function(){
require({cache:{
'url:dijit/form/templates/Button.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button", [
	"require",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.trim
	"dojo/ready",
	"./_FormWidget",
	"./_ButtonMixin",
	"dojo/text!./templates/Button.html"
], function(require, declare, domClass, kernel, lang, ready, _FormWidget, _ButtonMixin, template){

/*=====
	var _FormWidget = dijit.form._FormWidget;
	var _ButtonMixin = dijit.form._ButtonMixin;
=====*/

// module:
//		dijit/form/Button
// summary:
//		Button widget

// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/form/DropDownButton", "dijit/form/ComboButton", "dijit/form/ToggleButton"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.form.Button", [_FormWidget, _ButtonMixin], {
	// summary:
	//		Basically the same thing as a normal HTML button, but with special styling.
	// description:
	//		Buttons can display a label, an icon, or both.
	//		A label should always be specified (through innerHTML) or the label
	//		attribute.  It can be hidden via showLabel=false.
	// example:
	// |	<button data-dojo-type="dijit.form.Button" onClick="...">Hello world</button>
	//
	// example:
	// |	var button1 = new dijit.form.Button({label: "hello world", onClick: foo});
	// |	dojo.body().appendChild(button1.domNode);

	// showLabel: Boolean
	//		Set this to true to hide the label text and display only the icon.
	//		(If showLabel=false then iconClass must be specified.)
	//		Especially useful for toolbars.
	//		If showLabel=true, the label will become the title (a.k.a. tooltip/hint) of the icon.
	//
	//		The exception case is for computers in high-contrast mode, where the label
	//		will still be displayed, since the icon doesn't appear.
	showLabel: true,

	// iconClass: String
	//		Class to apply to DOMNode in button to make it display an icon
	iconClass: "dijitNoIcon",
	_setIconClassAttr: { node: "iconNode", type: "class" },

	baseClass: "dijitButton",

	templateString: template,

	// Map widget attributes to DOMNode attributes.
	_setValueAttr: "valueNode",

	_onClick: function(/*Event*/ e){
		// summary:
		//		Internal function to handle click actions
		var ok = this.inherited(arguments);
		if(ok){
			if(this.valueNode){
				this.valueNode.click();
				e.preventDefault(); // cancel BUTTON click and continue with hidden INPUT click
				// leave ok = true so that subclasses can do what they need to do
			}
		}
		return ok;
	},

	_fillContent: function(/*DomNode*/ source){
		// Overrides _Templated._fillContent().
		// If button label is specified as srcNodeRef.innerHTML rather than
		// this.params.label, handle it here.
		// TODO: remove the method in 2.0, parser will do it all for me
		if(source && (!this.params || !("label" in this.params))){
			var sourceLabel = lang.trim(source.innerHTML);
			if(sourceLabel){
				this.label = sourceLabel; // _applyAttributes will be called after buildRendering completes to update the DOM
			}
		}
	},

	_setShowLabelAttr: function(val){
		if(this.containerNode){
			domClass.toggle(this.containerNode, "dijitDisplayNone", !val);
		}
		this._set("showLabel", val);
	},

	setLabel: function(/*String*/ content){
		// summary:
		//		Deprecated.  Use set('label', ...) instead.
		kernel.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
		this.set("label", content);
	},

	_setLabelAttr: function(/*String*/ content){
		// summary:
		//		Hook for set('label', ...) to work.
		// description:
		//		Set the label (text) of the button; takes an HTML string.
		//		If the label is hidden (showLabel=false) then and no title has
		//		been specified, then label is also set as title attribute of icon.
		this.inherited(arguments);
		if(!this.showLabel && !("title" in this.params)){
			this.titleNode.title = lang.trim(this.containerNode.innerText || this.containerNode.textContent || '');
		}
	}
});


});


},
'dijit/_WidgetBase':function(){
define("dijit/_WidgetBase", [
	"require",			// require.toUrl
	"dojo/_base/array", // array.forEach array.map
	"dojo/aspect",
	"dojo/_base/config", // config.blankGif
	"dojo/_base/connect", // connect.connect
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.byId
	"dojo/dom-attr", // domAttr.set domAttr.remove
	"dojo/dom-class", // domClass.add domClass.replace
	"dojo/dom-construct", // domConstruct.create domConstruct.destroy domConstruct.place
	"dojo/dom-geometry",	// isBodyLtr
	"dojo/dom-style", // domStyle.set, domStyle.get
	"dojo/_base/kernel",
	"dojo/_base/lang", // mixin(), isArray(), etc.
	"dojo/on",
	"dojo/ready",
	"dojo/Stateful", // Stateful
	"dojo/topic",
	"dojo/_base/window", // win.doc.createTextNode
	"./registry"	// registry.getUniqueId(), registry.findWidgets()
], function(require, array, aspect, config, connect, declare,
			dom, domAttr, domClass, domConstruct, domGeometry, domStyle, kernel,
			lang, on, ready, Stateful, topic, win, registry){

/*=====
var Stateful = dojo.Stateful;
=====*/

// module:
//		dijit/_WidgetBase
// summary:
//		Future base class for all Dijit widgets.

// For back-compat, remove in 2.0.
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/_base/manager"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

// Nested hash listing attributes for each tag, all strings in lowercase.
// ex: {"div": {"style": true, "tabindex" true}, "form": { ...
var tagAttrs = {};
function getAttrs(obj){
	var ret = {};
	for(var attr in obj){
		ret[attr.toLowerCase()] = true;
	}
	return ret;
}

function nonEmptyAttrToDom(attr){
	// summary:
	//		Returns a setter function that copies the attribute to this.domNode,
	//		or removes the attribute from this.domNode, depending on whether the
	//		value is defined or not.
	return function(val){
		domAttr[val ? "set" : "remove"](this.domNode, attr, val);
		this._set(attr, val);
	};
}

return declare("dijit._WidgetBase", Stateful, {
	// summary:
	//		Future base class for all Dijit widgets.
	// description:
	//		Future base class for all Dijit widgets.
	//		_Widget extends this class adding support for various features needed by desktop.
	//
	//		Provides stubs for widget lifecycle methods for subclasses to extend, like postMixInProperties(), buildRendering(),
	//		postCreate(), startup(), and destroy(), and also public API methods like set(), get(), and watch().
	//
	//		Widgets can provide custom setters/getters for widget attributes, which are called automatically by set(name, value).
	//		For an attribute XXX, define methods _setXXXAttr() and/or _getXXXAttr().
	//
	//		_setXXXAttr can also be a string/hash/array mapping from a widget attribute XXX to the widget's DOMNodes:
	//
	//		- DOM node attribute
	// |		_setFocusAttr: {node: "focusNode", type: "attribute"}
	// |		_setFocusAttr: "focusNode"	(shorthand)
	// |		_setFocusAttr: ""		(shorthand, maps to this.domNode)
	// 		Maps this.focus to this.focusNode.focus, or (last example) this.domNode.focus
	//
	//		- DOM node innerHTML
	//	|		_setTitleAttr: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		_setTitleAttr: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		_setMyClassAttr: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value of _setXXXAttr is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		If the custom setter is null, no action is performed other than saving the new value
	//		in the widget (in this).
	//
	//		If no custom setter is defined for an attribute, then it will be copied
	//		to this.focusNode (if the widget defines a focusNode), or this.domNode otherwise.
	//		That's only done though for attributes that match DOMNode attributes (title,
	//		alt, aria-labelledby, etc.)

	// id: [const] String
	//		A unique, opaque ID string that can be assigned by users or by the
	//		system. If the developer passes an ID which is known not to be
	//		unique, the specified ID is ignored and the system-generated ID is
	//		used instead.
	id: "",
	_setIdAttr: "domNode",	// to copy to this.domNode even for auto-generated id's

	// lang: [const] String
	//		Rarely used.  Overrides the default Dojo locale used to render this widget,
	//		as defined by the [HTML LANG](http://www.w3.org/TR/html401/struct/dirlang.html#adef-lang) attribute.
	//		Value must be among the list of locales specified during by the Dojo bootstrap,
	//		formatted according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt) (like en-us).
	lang: "",
	// set on domNode even when there's a focus node.   but don't set lang="", since that's invalid.
	_setLangAttr: nonEmptyAttrToDom("lang"),

	// dir: [const] String
	//		Bi-directional support, as defined by the [HTML DIR](http://www.w3.org/TR/html401/struct/dirlang.html#adef-dir)
	//		attribute. Either left-to-right "ltr" or right-to-left "rtl".  If undefined, widgets renders in page's
	//		default direction.
	dir: "",
	// set on domNode even when there's a focus node.   but don't set dir="", since that's invalid.
	_setDirAttr: nonEmptyAttrToDom("dir"),	// to set on domNode even when there's a focus node

	// textDir: String
	//		Bi-directional support,	the main variable which is responsible for the direction of the text.
	//		The text direction can be different than the GUI direction by using this parameter in creation
	//		of a widget.
	// 		Allowed values:
	//			1. "ltr"
	//			2. "rtl"
	//			3. "auto" - contextual the direction of a text defined by first strong letter.
	//		By default is as the page direction.
	textDir: "",

	// class: String
	//		HTML class attribute
	"class": "",
	_setClassAttr: { node: "domNode", type: "class" },

	// style: String||Object
	//		HTML style attributes as cssText string or name/value hash
	style: "",

	// title: String
	//		HTML title attribute.
	//
	//		For form widgets this specifies a tooltip to display when hovering over
	//		the widget (just like the native HTML title attribute).
	//
	//		For TitlePane or for when this widget is a child of a TabContainer, AccordionContainer,
	//		etc., it's used to specify the tab label, accordion pane title, etc.
	title: "",

	// tooltip: String
	//		When this widget's title attribute is used to for a tab label, accordion pane title, etc.,
	//		this specifies the tooltip to appear when the mouse is hovered over that text.
	tooltip: "",

	// baseClass: [protected] String
	//		Root CSS class of the widget (ex: dijitTextBox), used to construct CSS classes to indicate
	//		widget state.
	baseClass: "",

	// srcNodeRef: [readonly] DomNode
	//		pointer to original DOM node
	srcNodeRef: null,

	// domNode: [readonly] DomNode
	//		This is our visible representation of the widget! Other DOM
	//		Nodes may by assigned to other properties, usually through the
	//		template system's data-dojo-attach-point syntax, but the domNode
	//		property is the canonical "top level" node in widget UI.
	domNode: null,

	// containerNode: [readonly] DomNode
	//		Designates where children of the source DOM node will be placed.
	//		"Children" in this case refers to both DOM nodes and widgets.
	//		For example, for myWidget:
	//
	//		|	<div data-dojo-type=myWidget>
	//		|		<b> here's a plain DOM node
	//		|		<span data-dojo-type=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//		|	</div>
	//
	//		containerNode would point to:
	//
	//		|		<b> here's a plain DOM node
	//		|		<span data-dojo-type=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//
	//		In templated widgets, "containerNode" is set via a
	//		data-dojo-attach-point assignment.
	//
	//		containerNode must be defined for any widget that accepts innerHTML
	//		(like ContentPane or BorderContainer or even Button), and conversely
	//		is null for widgets that don't, like TextBox.
	containerNode: null,

/*=====
	// _started: Boolean
	//		startup() has completed.
	_started: false,
=====*/

	// attributeMap: [protected] Object
	//		Deprecated.   Instead of attributeMap, widget should have a _setXXXAttr attribute
	//		for each XXX attribute to be mapped to the DOM.
	//
	//		attributeMap sets up a "binding" between attributes (aka properties)
	//		of the widget and the widget's DOM.
	//		Changes to widget attributes listed in attributeMap will be
	//		reflected into the DOM.
	//
	//		For example, calling set('title', 'hello')
	//		on a TitlePane will automatically cause the TitlePane's DOM to update
	//		with the new title.
	//
	//		attributeMap is a hash where the key is an attribute of the widget,
	//		and the value reflects a binding to a:
	//
	//		- DOM node attribute
	// |		focus: {node: "focusNode", type: "attribute"}
	// 		Maps this.focus to this.focusNode.focus
	//
	//		- DOM node innerHTML
	//	|		title: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		title: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		myClass: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		There are also some shorthands for backwards compatibility:
	//		- string --> { node: string, type: "attribute" }, for example:
	//	|	"focusNode" ---> { node: "focusNode", type: "attribute" }
	//		- "" --> { node: "domNode", type: "attribute" }
	attributeMap: {},

	// _blankGif: [protected] String
	//		Path to a blank 1x1 image.
	//		Used by <img> nodes in templates that really get their image via CSS background-image.
	_blankGif: config.blankGif || require.toUrl("dojo/resources/blank.gif"),

	//////////// INITIALIZATION METHODS ///////////////////////////////////////

	postscript: function(/*Object?*/params, /*DomNode|String*/srcNodeRef){
		// summary:
		//		Kicks off widget instantiation.  See create() for details.
		// tags:
		//		private
		this.create(params, srcNodeRef);
	},

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		// summary:
		//		Kick off the life-cycle of a widget
		// params:
		//		Hash of initialization parameters for widget, including
		//		scalar values (like title, duration etc.) and functions,
		//		typically callbacks like onClick.
		// srcNodeRef:
		//		If a srcNodeRef (DOM node) is specified:
		//			- use srcNodeRef.innerHTML as my contents
		//			- if this is a behavioral widget then apply behavior
		//			  to that srcNodeRef
		//			- otherwise, replace srcNodeRef with my generated DOM
		//			  tree
		// description:
		//		Create calls a number of widget methods (postMixInProperties, buildRendering, postCreate,
		//		etc.), some of which of you'll want to override. See http://dojotoolkit.org/reference-guide/dijit/_WidgetBase.html
		//		for a discussion of the widget creation lifecycle.
		//
		//		Of course, adventurous developers could override create entirely, but this should
		//		only be done as a last resort.
		// tags:
		//		private

		// store pointer to original DOM tree
		this.srcNodeRef = dom.byId(srcNodeRef);

		// For garbage collection.  An array of listener handles returned by this.connect() / this.subscribe()
		this._connects = [];

		// For widgets internal to this widget, invisible to calling code
		this._supportingWidgets = [];

		// this is here for back-compat, remove in 2.0 (but check NodeList-instantiate.html test)
		if(this.srcNodeRef && (typeof this.srcNodeRef.id == "string")){ this.id = this.srcNodeRef.id; }

		// mix in our passed parameters
		if(params){
			this.params = params;
			lang.mixin(this, params);
		}
		this.postMixInProperties();

		// generate an id for the widget if one wasn't specified
		// (be sure to do this before buildRendering() because that function might
		// expect the id to be there.)
		if(!this.id){
			this.id = registry.getUniqueId(this.declaredClass.replace(/\./g,"_"));
		}
		registry.add(this);

		this.buildRendering();

		if(this.domNode){
			// Copy attributes listed in attributeMap into the [newly created] DOM for the widget.
			// Also calls custom setters for all attributes with custom setters.
			this._applyAttributes();

			// If srcNodeRef was specified, then swap out original srcNode for this widget's DOM tree.
			// For 2.0, move this after postCreate().  postCreate() shouldn't depend on the
			// widget being attached to the DOM since it isn't when a widget is created programmatically like
			// new MyWidget({}).   See #11635.
			var source = this.srcNodeRef;
			if(source && source.parentNode && this.domNode !== source){
				source.parentNode.replaceChild(this.domNode, source);
			}
		}

		if(this.domNode){
			// Note: for 2.0 may want to rename widgetId to dojo._scopeName + "_widgetId",
			// assuming that dojo._scopeName even exists in 2.0
			this.domNode.setAttribute("widgetId", this.id);
		}
		this.postCreate();

		// If srcNodeRef has been processed and removed from the DOM (e.g. TemplatedWidget) then delete it to allow GC.
		if(this.srcNodeRef && !this.srcNodeRef.parentNode){
			delete this.srcNodeRef;
		}

		this._created = true;
	},

	_applyAttributes: function(){
		// summary:
		//		Step during widget creation to copy  widget attributes to the
		//		DOM according to attributeMap and _setXXXAttr objects, and also to call
		//		custom _setXXXAttr() methods.
		//
		//		Skips over blank/false attribute values, unless they were explicitly specified
		//		as parameters to the widget, since those are the default anyway,
		//		and setting tabIndex="" is different than not setting tabIndex at all.
		//
		//		For backwards-compatibility reasons attributeMap overrides _setXXXAttr when
		//		_setXXXAttr is a hash/string/array, but _setXXXAttr as a functions override attributeMap.
		// tags:
		//		private

		// Get list of attributes where this.set(name, value) will do something beyond
		// setting this[name] = value.  Specifically, attributes that have:
		//		- associated _setXXXAttr() method/hash/string/array
		//		- entries in attributeMap.
		var ctor = this.constructor,
			list = ctor._setterAttrs;
		if(!list){
			list = (ctor._setterAttrs = []);
			for(var attr in this.attributeMap){
				list.push(attr);
			}

			var proto = ctor.prototype;
			for(var fxName in proto){
				if(fxName in this.attributeMap){ continue; }
				var setterName = "_set" + fxName.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); }) + "Attr";
				if(setterName in proto){
					list.push(fxName);
				}
			}
		}

		// Call this.set() for each attribute that was either specified as parameter to constructor,
		// or was found above and has a default non-null value.   For correlated attributes like value and displayedValue, the one
		// specified as a parameter should take precedence, so apply attributes in this.params last.
		// Particularly important for new DateTextBox({displayedValue: ...}) since DateTextBox's default value is
		// NaN and thus is not ignored like a default value of "".
		array.forEach(list, function(attr){
			if(this.params && attr in this.params){
				// skip this one, do it below
			}else if(this[attr]){
				this.set(attr, this[attr]);
			}
		}, this);
		for(var param in this.params){
			this.set(param, this[param]);
		}
	},

	postMixInProperties: function(){
		// summary:
		//		Called after the parameters to the widget have been read-in,
		//		but before the widget template is instantiated. Especially
		//		useful to set properties that are referenced in the widget
		//		template.
		// tags:
		//		protected
	},

	buildRendering: function(){
		// summary:
		//		Construct the UI for this widget, setting this.domNode.
		//		Most widgets will mixin `dijit._TemplatedMixin`, which implements this method.
		// tags:
		//		protected

		if(!this.domNode){
			// Create root node if it wasn't created by _Templated
			this.domNode = this.srcNodeRef || domConstruct.create('div');
		}

		// baseClass is a single class name or occasionally a space-separated list of names.
		// Add those classes to the DOMNode.  If RTL mode then also add with Rtl suffix.
		// TODO: make baseClass custom setter
		if(this.baseClass){
			var classes = this.baseClass.split(" ");
			if(!this.isLeftToRight()){
				classes = classes.concat( array.map(classes, function(name){ return name+"Rtl"; }));
			}
			domClass.add(this.domNode, classes);
		}
	},

	postCreate: function(){
		// summary:
		//		Processing after the DOM fragment is created
		// description:
		//		Called after the DOM fragment has been created, but not necessarily
		//		added to the document.  Do not include any operations which rely on
		//		node dimensions or placement.
		// tags:
		//		protected
	},

	startup: function(){
		// summary:
		//		Processing after the DOM fragment is added to the document
		// description:
		//		Called after a widget and its children have been created and added to the page,
		//		and all related widgets have finished their create() cycle, up through postCreate().
		//		This is useful for composite widgets that need to control or layout sub-widgets.
		//		Many layout widgets can use this as a wiring phase.
		if(this._started){ return; }
		this._started = true;
		array.forEach(this.getChildren(), function(obj){
			if(!obj._started && !obj._destroyed && lang.isFunction(obj.startup)){
				obj.startup();
				obj._started = true;
			}
		});
	},

	//////////// DESTROY FUNCTIONS ////////////////////////////////

	destroyRecursive: function(/*Boolean?*/ preserveDom){
		// summary:
		// 		Destroy this widget and its descendants
		// description:
		//		This is the generic "destructor" function that all widget users
		// 		should call to cleanly discard with a widget. Once a widget is
		// 		destroyed, it is removed from the manager object.
		// preserveDom:
		//		If true, this method will leave the original DOM structure
		//		alone of descendant Widgets. Note: This will NOT work with
		//		dijit._Templated widgets.

		this._beingDestroyed = true;
		this.destroyDescendants(preserveDom);
		this.destroy(preserveDom);
	},

	destroy: function(/*Boolean*/ preserveDom){
		// summary:
		// 		Destroy this widget, but not its descendants.
		//		This method will, however, destroy internal widgets such as those used within a template.
		// preserveDom: Boolean
		//		If true, this method will leave the original DOM structure alone.
		//		Note: This will not yet work with _Templated widgets

		this._beingDestroyed = true;
		this.uninitialize();

		// remove this.connect() and this.subscribe() listeners
		var c;
		while(c = this._connects.pop()){
			c.remove();
		}

		// destroy widgets created as part of template, etc.
		var w;
		while(w = this._supportingWidgets.pop()){
			if(w.destroyRecursive){
				w.destroyRecursive();
			}else if(w.destroy){
				w.destroy();
			}
		}

		this.destroyRendering(preserveDom);
		registry.remove(this.id);
		this._destroyed = true;
	},

	destroyRendering: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Destroys the DOM nodes associated with this widget
		// preserveDom:
		//		If true, this method will leave the original DOM structure alone
		//		during tear-down. Note: this will not work with _Templated
		//		widgets yet.
		// tags:
		//		protected

		if(this.bgIframe){
			this.bgIframe.destroy(preserveDom);
			delete this.bgIframe;
		}

		if(this.domNode){
			if(preserveDom){
				domAttr.remove(this.domNode, "widgetId");
			}else{
				domConstruct.destroy(this.domNode);
			}
			delete this.domNode;
		}

		if(this.srcNodeRef){
			if(!preserveDom){
				domConstruct.destroy(this.srcNodeRef);
			}
			delete this.srcNodeRef;
		}
	},

	destroyDescendants: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Recursively destroy the children of this widget and their
		//		descendants.
		// preserveDom:
		//		If true, the preserveDom attribute is passed to all descendant
		//		widget's .destroy() method. Not for use with _Templated
		//		widgets.

		// get all direct descendants and destroy them recursively
		array.forEach(this.getChildren(), function(widget){
			if(widget.destroyRecursive){
				widget.destroyRecursive(preserveDom);
			}
		});
	},

	uninitialize: function(){
		// summary:
		//		Stub function. Override to implement custom widget tear-down
		//		behavior.
		// tags:
		//		protected
		return false;
	},

	////////////////// GET/SET, CUSTOM SETTERS, ETC. ///////////////////

	_setStyleAttr: function(/*String||Object*/ value){
		// summary:
		//		Sets the style attribute of the widget according to value,
		//		which is either a hash like {height: "5px", width: "3px"}
		//		or a plain string
		// description:
		//		Determines which node to set the style on based on style setting
		//		in attributeMap.
		// tags:
		//		protected

		var mapNode = this.domNode;

		// Note: technically we should revert any style setting made in a previous call
		// to his method, but that's difficult to keep track of.

		if(lang.isObject(value)){
			domStyle.set(mapNode, value);
		}else{
			if(mapNode.style.cssText){
				mapNode.style.cssText += "; " + value;
			}else{
				mapNode.style.cssText = value;
			}
		}

		this._set("style", value);
	},

	_attrToDom: function(/*String*/ attr, /*String*/ value, /*Object?*/ commands){
		// summary:
		//		Reflect a widget attribute (title, tabIndex, duration etc.) to
		//		the widget DOM, as specified by commands parameter.
		//		If commands isn't specified then it's looked up from attributeMap.
		//		Note some attributes like "type"
		//		cannot be processed this way as they are not mutable.
		//
		// tags:
		//		private

		commands = arguments.length >= 3 ? commands : this.attributeMap[attr];

		array.forEach(lang.isArray(commands) ? commands : [commands], function(command){

			// Get target node and what we are doing to that node
			var mapNode = this[command.node || command || "domNode"];	// DOM node
			var type = command.type || "attribute";	// class, innerHTML, innerText, or attribute

			switch(type){
				case "attribute":
					if(lang.isFunction(value)){ // functions execute in the context of the widget
						value = lang.hitch(this, value);
					}

					// Get the name of the DOM node attribute; usually it's the same
					// as the name of the attribute in the widget (attr), but can be overridden.
					// Also maps handler names to lowercase, like onSubmit --> onsubmit
					var attrName = command.attribute ? command.attribute :
						(/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);

					domAttr.set(mapNode, attrName, value);
					break;
				case "innerText":
					mapNode.innerHTML = "";
					mapNode.appendChild(win.doc.createTextNode(value));
					break;
				case "innerHTML":
					mapNode.innerHTML = value;
					break;
				case "class":
					domClass.replace(mapNode, value, this[attr]);
					break;
			}
		}, this);
	},

	get: function(name){
		// summary:
		//		Get a property from a widget.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property from a widget. The property may
		//		potentially be retrieved via a getter method. If no getter is defined, this
		// 		just retrieves the object's property.
		//
		// 		For example, if the widget has properties `foo` and `bar`
		//		and a method named `_getFooAttr()`, calling:
		//		`myWidget.get("foo")` would be equivalent to calling
		//		`widget._getFooAttr()` and `myWidget.get("bar")`
		//		would be equivalent to the expression
		//		`widget.bar2`
		var names = this._getAttrNames(name);
		return this[names.g] ? this[names.g]() : this[name];
	},

	set: function(name, value){
		// summary:
		//		Set a property on a widget
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a widget which may potentially be handled by a
		// 		setter in the widget.
		//
		// 		For example, if the widget has properties `foo` and `bar`
		//		and a method named `_setFooAttr()`, calling
		//		`myWidget.set("foo", "Howdy!")` would be equivalent to calling
		//		`widget._setFooAttr("Howdy!")` and `myWidget.set("bar", 3)`
		//		would be equivalent to the statement `widget.bar = 3;`
		//
		//		set() may also be called with a hash of name/value pairs, ex:
		//
		//	|	myWidget.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	});
		//
		//	This is equivalent to calling `set(foo, "Howdy")` and `set(bar, 3)`

		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var names = this._getAttrNames(name),
			setter = this[names.s];
		if(lang.isFunction(setter)){
			// use the explicit setter
			var result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// Mapping from widget attribute to DOMNode attribute/value/etc.
			// Map according to:
			//		1. attributeMap setting, if one exists (TODO: attributeMap deprecated, remove in 2.0)
			//		2. _setFooAttr: {...} type attribute in the widget (if one exists)
			//		3. apply to focusNode or domNode if standard attribute name, excluding funcs like onClick.
			// Checks if an attribute is a "standard attribute" by whether the DOMNode JS object has a similar
			// attribute name (ex: accept-charset attribute matches jsObject.acceptCharset).
			// Note also that Tree.focusNode() is a function not a DOMNode, so test for that.
			var defaultNode = this.focusNode && !lang.isFunction(this.focusNode) ? "focusNode" : "domNode",
				tag = this[defaultNode].tagName,
				attrsForTag = tagAttrs[tag] || (tagAttrs[tag] = getAttrs(this[defaultNode])),
				map =	name in this.attributeMap ? this.attributeMap[name] :
						names.s in this ? this[names.s] :
						((names.l in attrsForTag && typeof value != "function") ||
							/^aria-|^data-|^role$/.test(name)) ? defaultNode : null;
			if(map != null){
				this._attrToDom(name, value, map);
			}
			this._set(name, value);
		}
		return result || this;
	},

	_attrPairNames: {},		// shared between all widgets
	_getAttrNames: function(name){
		// summary:
		//		Helper function for get() and set().
		//		Caches attribute name values so we don't do the string ops every time.
		// tags:
		//		private

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		var uc = name.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); });
		return (apn[name] = {
			n: name+"Node",
			s: "_set"+uc+"Attr",	// converts dashes to camel case, ex: accept-charset --> _setAcceptCharsetAttr
			g: "_get"+uc+"Attr",
			l: uc.toLowerCase()		// lowercase name w/out dashes, ex: acceptcharset
		});
	},

	_set: function(/*String*/ name, /*anything*/ value){
		// summary:
		//		Helper function to set new value for specified attribute, and call handlers
		//		registered with watch() if the value has changed.
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks && this._created && value !== oldValue){
			this._watchCallbacks(name, oldValue, value);
		}
	},

	on: function(/*String*/ type, /*Function*/ func){
		// summary:
		//		Call specified function when event occurs, ex: myWidget.on("click", function(){ ... }).
		// description:
		//		Call specified function when event `type` occurs, ex: `myWidget.on("click", function(){ ... })`.
		//		Note that the function is not run in any particular scope, so if (for example) you want it to run in the
		//		widget's scope you must do `myWidget.on("click", lang.hitch(myWidget, func))`.

		return aspect.after(this, this._onMap(type), func, true);
	},

	_onMap: function(/*String*/ type){
		// summary:
		//		Maps on() type parameter (ex: "mousemove") to method name (ex: "onMouseMove")
		var ctor = this.constructor, map = ctor._onMap;
		if(!map){
			map = (ctor._onMap = {});
			for(var attr in ctor.prototype){
				if(/^on/.test(attr)){
					map[attr.replace(/^on/, "").toLowerCase()] = attr;
				}
			}
		}
		return map[type.toLowerCase()];	// String
	},

	toString: function(){
		// summary:
		//		Returns a string that represents the widget
		// description:
		//		When a widget is cast to a string, this method will be used to generate the
		//		output. Currently, it does not implement any sort of reversible
		//		serialization.
		return '[Widget ' + this.declaredClass + ', ' + (this.id || 'NO ID') + ']'; // String
	},

	getChildren: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		Does not return nested widgets, nor widgets that are part of this widget's template.
		return this.containerNode ? registry.findWidgets(this.containerNode) : []; // dijit._Widget[]
	},

	getParent: function(){
		// summary:
		//		Returns the parent widget of this widget
		return registry.getEnclosingWidget(this.domNode.parentNode);
	},

	connect: function(
			/*Object|null*/ obj,
			/*String|Function*/ event,
			/*String|Function*/ method){
		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.connect, except with the
		//		implicit use of this widget as the target object.
		//		Events connected with `this.connect` are disconnected upon
		//		destruction.
		// returns:
		//		A handle that can be passed to `disconnect` in order to disconnect before
		//		the widget is destroyed.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when foo.bar() is called, call the listener we're going to
		//	|	// provide in the scope of btn
		//	|	btn.connect(foo, "bar", function(){
		//	|		console.debug(this.toString());
		//	|	});
		// tags:
		//		protected

		var handle = connect.connect(obj, event, this, method);
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	disconnect: function(handle){
		// summary:
		//		Disconnects handle created by `connect`.
		//		Also removes handle from this widget's list of connects.
		// tags:
		//		protected
		var i = array.indexOf(this._connects, handle);
		if(i != -1){
			handle.remove();
			this._connects.splice(i, 1);
		}
	},

	subscribe: function(t, method){
		// summary:
		//		Subscribes to the specified topic and calls the specified method
		//		of this object and registers for unsubscribe() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.subscribe, except with the
		//		implicit use of this widget as the target object.
		// t: String
		//		The topic
		// method: Function
		//		The callback
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when /my/topic is published, this button changes its label to
		//	|   // be the parameter of the topic.
		//	|	btn.subscribe("/my/topic", function(v){
		//	|		this.set("label", v);
		//	|	});
		// tags:
		//		protected
		var handle = topic.subscribe(t, lang.hitch(this, method));
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	unsubscribe: function(/*Object*/ handle){
		// summary:
		//		Unsubscribes handle created by this.subscribe.
		//		Also removes handle from this widget's list of subscriptions
		// tags:
		//		protected
		this.disconnect(handle);
	},

	isLeftToRight: function(){
		// summary:
		//		Return this widget's explicit or implicit orientation (true for LTR, false for RTL)
		// tags:
		//		protected
		return this.dir ? (this.dir == "ltr") : domGeometry.isBodyLtr(); //Boolean
	},

	isFocusable: function(){
		// summary:
		//		Return true if this widget can currently be focused
		//		and false if not
		return this.focus && (domStyle.get(this.domNode, "display") != "none");
	},

	placeAt: function(/* String|DomNode|_Widget */reference, /* String?|Int? */position){
		// summary:
		//		Place this widget's domNode reference somewhere in the DOM based
		//		on standard domConstruct.place conventions, or passing a Widget reference that
		//		contains and addChild member.
		//
		// description:
		//		A convenience function provided in all _Widgets, providing a simple
		//		shorthand mechanism to put an existing (or newly created) Widget
		//		somewhere in the dom, and allow chaining.
		//
		// reference:
		//		The String id of a domNode, a domNode reference, or a reference to a Widget possessing
		//		an addChild method.
		//
		// position:
		//		If passed a string or domNode reference, the position argument
		//		accepts a string just as domConstruct.place does, one of: "first", "last",
		//		"before", or "after".
		//
		//		If passed a _Widget reference, and that widget reference has an ".addChild" method,
		//		it will be called passing this widget instance into that method, supplying the optional
		//		position index passed.
		//
		// returns:
		//		dijit._Widget
		//		Provides a useful return of the newly created dijit._Widget instance so you
		//		can "chain" this function by instantiating, placing, then saving the return value
		//		to a variable.
		//
		// example:
		// | 	// create a Button with no srcNodeRef, and place it in the body:
		// | 	var button = new dijit.form.Button({ label:"click" }).placeAt(win.body());
		// | 	// now, 'button' is still the widget reference to the newly created button
		// | 	button.on("click", function(e){ console.log('click'); }));
		//
		// example:
		// |	// create a button out of a node with id="src" and append it to id="wrapper":
		// | 	var button = new dijit.form.Button({},"src").placeAt("wrapper");
		//
		// example:
		// |	// place a new button as the first element of some div
		// |	var button = new dijit.form.Button({ label:"click" }).placeAt("wrapper","first");
		//
		// example:
		// |	// create a contentpane and add it to a TabContainer
		// |	var tc = dijit.byId("myTabs");
		// |	new dijit.layout.ContentPane({ href:"foo.html", title:"Wow!" }).placeAt(tc)

		if(reference.declaredClass && reference.addChild){
			reference.addChild(this, position);
		}else{
			domConstruct.place(this.domNode, reference, position);
		}
		return this;
	},

	getTextDir: function(/*String*/ text,/*String*/ originalDir){
		// summary:
		//		Return direction of the text.
		//		The function overridden in the _BidiSupport module,
		//		its main purpose is to calculate the direction of the
		//		text, if was defined by the programmer through textDir.
		//	tags:
		//		protected.
		return originalDir;
	},

	applyTextDir: function(/*===== element, text =====*/){
		// summary:
		//		The function overridden in the _BidiSupport module,
		//		originally used for setting element.dir according to this.textDir.
		//		In this case does nothing.
		// element: DOMNode
		// text: String
		// tags:
		//		protected.
	}
});

});

},
'ibm/tivoli/fwm/mxmap/factory':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojo/io/script"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factory");
dojo.require("dojo.io.script");
/**
 * This js loads a factory for the provider and after it's instantiated it
 * creates the map.
 */
ibm.tivoli.fwm.mxmap.stack = {};
ibm.tivoli.fwm.mxmap.factory = {
	events: {
		mapImplLoaded: "mxmap.mapImplLoaded"
	},
	options: null,
	initialized: false,
	tries: 10,
	registry: {},
	/**
	 * In IE we need to first load MXN standard files and only after we can load
	 * the other ones. Otherwise IE will break complaining MXN object is not
	 * defined.
	 */
	ieWait: function()
	{
		ibm.tivoli.fwm.mxmap.factory.tries--;
		if (ibm.tivoli.fwm.mxmap.factory.tries > 0)
		{
			ibm.tivoli.fwm.mxmap.factory.init();
		}
		else
		{
			throw "Cannot load MXN...";
		}
	},
	/**
	 * Loads the core Mapstraction javascripts
	 */
	init: function()
	{
		// must be loaded first otherwise it breaks the other
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.js", "js");

		console.log("[Factory] is Ie?", (dojo.isIE != null));
		if (dojo.isIE)
		{
			if (!window.mxn)
			{
				console.log("waiting...");
				setTimeout("ibm.tivoli.fwm.mxmap.factory.ieWait()", 100);
				return;
			}
		}
		// if(dojo.config.fwm.debug==true || dojo.config.debugAtAllCosts==true){
		// try {
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/Map.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/actions/SetRecordLocation.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/MXRecord.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/MaximoIntegration.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/ContextMenu.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/Geocoder.js", "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/InfoWindow.js", "js");
		//			
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/toolbar/ToolbarManager.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/routing/Router.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/CurrentMXRecManager.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/CurrentMXRecordSet.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxmap/routing/impl/spatial.js",
		// "js");
		// dojohelper.loadfile(dojo.config.fwm.ctxRoot +
		// "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.maximospatial.core.js",
		// "js");
		//			
		//			
		// } catch (e) {
		// // the above section is just for debugging.
		// }
		// }
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.core.js", "js");
		dojohelper.loadfile(dojo.config.fwm.ctxRoot + "/webclient/javascript/ibm/tivoli/fwm/mxn/mxn.geocoder.js", "js");

		this.initialized = true;
		console.log("[Factory] Initiated factory");
	},

	/**
	 * This method creates the provider implementation and triggers its
	 * createMap method
	 */
	createMap: function(options)
	{
		console.log("[Factory] Component ID: " + options.compId);
		console.log("[Factory] Is error in Map Configuration? " + options.mapConf.error);
		if (options.mapConf.error && options.mapConf.error == true)
		{
			console.log("[Factory] Options.mapConf.key: ", options.mapConf.key);
			addCommInput('msgKey', options.mapConf.key);
			addCommInput('msgGroup', options.mapConf.group);
			sendEvent('showErrors', options.compId, options.mapConf.key);
			return;
		}
		if (this.initialized != true)
		{
			this.init();
		}

		if (this.mapExists(options.compId))
		{
			console.log("[Factory]  Map exists, destroying", options.compId);
			this.destroyCurrentMap(options.compId);
		}

		var providerName = options.mapConf.provider;
		if (!this.loaded[providerName])
		{
			ibm.tivoli.fwm.mxmap.stack[providerName] = [];
			ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
			this.loaded[providerName] = -1;
			var providerImplFactory = "ibm.tivoli.fwm.mxmap.factories." + providerName;

			var reqStr = "dojo." + "require('" + providerImplFactory + "')"; // breaking
																				// up
																				// dojo.
																				// and
																				// require
																				// necessary
																				// to
																				// fool
																				// the
																				// dojo
																				// parser!

			dojo.eval(reqStr);
			this.options = options;
			//DONT CHANGE FOR DOJO.EVAL!!
			eval(providerImplFactory + ".init(this.options)");
			console.log("[Factory]  Provider initiated.");
		}
		else
		{

			if (this.loaded[providerName] == -1)
			{
				console.log("[Factory] Api is NOT loaded, queueing options");
				ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
			}
			else
			{
				console.log("[Factory] Api is loaded");
				dojo.publish(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded, [ this.loaded[providerName], providerName ]);
				this._createProviderMap(options, this.loaded[providerName]);
			}
		}

	},
	mapExists: function(compId)
	{

		return this.registry[compId] && this.registry[compId].currentMap;
	},
	destroyCurrentMap: function(compId)
	{
		console.log("[Factory] Destroying map", compId, this.registry[compId]);
		try
		{
			if (this.registry[compId] && this.registry[compId].currentMap)
			{
				this.registry[compId].currentMap.destroyRecursive();
			}
		}
		catch (e)
		{
			console.log("[Factory]  Could not destroy", e);
		}
		this.registry[compId] = null;
	},
	loaded: {},
	/**
	 * When the provider api is initializes this method is called.
	 */
	apiInitialized: function(mapImpl, provider)
	{
		console.log("[Factory] Loaded: ", mapImpl, provider);
		this.loaded[provider] = mapImpl;
		dojo.publish(ibm.tivoli.fwm.mxmap.factory.events.mapImplLoaded, [ mapImpl, provider ]);
		this.executeStack(mapImpl, provider);
	},
	executeStack: function(mapImpl, provider)
	{
		if (ibm.tivoli.fwm.mxmap.stack[provider])
		{
			var queuedRequest = ibm.tivoli.fwm.mxmap.stack[provider];

			for ( var id in queuedRequest)
			{
				var options = queuedRequest[id];
				this._createProviderMap(options, mapImpl);
			}
		}
	},
	_createProviderMap: function(options, mapImpl)
	{
		console.log("[Factory] Create: ", mapImpl, options);
		var instance = null;
		eval("this._instance = new " + mapImpl + "();");
		instance = this._instance;
		console.log("[Factory] Instance: ", instance);
		instance.createMap(options);
		this.registry[options.compId] = {
			currentMap: instance
		};
	}

};
});

},
'ibm/tivoli/fwm/mxmap/layers/TrafficLayer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.TrafficLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents a traffic layer.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.TrafficLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			/**
			 * Enables this layer and consequently the traffic view.
			 */
			enable: function()
			{
				this.inherited(arguments);
				this._map.enableTraffic();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
				this._map.disableTraffic();
			}
		});
});

},
'ibm/tivoli/fwm/mxmap/layers/RouteLayer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.RouteLayer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents the routes layer. Turning this layer on or off shows or hider the route paths.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.RouteLayer",
		[ ibm.tivoli.fwm.mxmap.layers.Layer ], {
			/**
			 * Starts the layer as enabled.
			 */
			init: function()
			{
				this.inherited(arguments);
				this.enable();
			},
			/**
			 * Enables this layer
			 */
			enable: function()
			{
				this.inherited(arguments);
				this._map.enableRoutes();
			},
			/**
			 * Disables this layer
			 */
			disable: function()
			{
				this.inherited(arguments);
				this._map.disableRoutes();
			}
		});
});

},
'ibm/tivoli/fwm/mxmap/symbology/SymbologyManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Handles the map symbology configuration.
 * The terms layer and object are used somewhat interchangeably, because the
 * design for the symbology feature mixes them.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager",[ ibm.tivoli.fwm.mxmap._Base ], {
	_mapSymbologyJson: null,
	_map: null,
	_objectMap: null,
	_defaultSymbologyConfig: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._map = options.map;
		this._mapSymbologyJson = this._map.mapConf.symbologyConfig;
		this._objectMap = this._buildObjectMap(this._mapSymbologyJson);
		this._defaultSymbologyConfig = options.defaultSymbologyConfig;
	},
	_buildObjectMap: function(symbologyConfig)
	{
		var retval = {};
		if((this._mapSymbologyJson != null) && (this._mapSymbologyJson.layers != null)){
			for (id in this._mapSymbologyJson.layers)
			{
				var layer = this._mapSymbologyJson.layers[id];
				retval[layer.id] = layer;
				this.setActiveSymbologyForLayer(layer, layer.symbologies[0]);
			}
		}
		return retval;
	},
	getDefaultLayerConfigFor:function(_id){
		this._layerIdXlation[_id]="others";
		return this.getLayerConfigById(_id);
	},
	/**
	 * Retrieves the symbology config for the layer (object type) specified by id
	 */
	getLayerConfigById: function(id2)
	{
		var _id = id2.toLowerCase();
		if(this._layerIdXlation[_id]!=null){
			_id=this._layerIdXlation[_id];
		} 
		return this._objectMap[_id];
	},
	/**
	 * Retrieves an array with all the symbologies for a given layer
	 */
	getSymbologyConfigArrayByLayer: function(layerConfig){
		var symbologyArray = {};
		if((layerConfig != null) && (layerConfig.symbologies != null)){
			dojo.forEach(layerConfig.symbologies, function(symbology){
				if(symbology.id != null && symbology.id != ""){
					symbologyArray[symbology.id] = symbology; 
				}
			});
		}
		return symbologyArray;
	},
	/**
	 * Retrieves an array with all the legends for a given symbology
	 */
	getLegendConfigArrayBySymbology: function(symbologyConfig){
		var legendArray = {};
		if((symbologyConfig != null) && (symbologyConfig.legends != null)){
			dojo.forEach(symbologyConfig.legends, function(legend){
				if(legend.id != null && legend.id != ""){
					legendArray[legend.id] = legend; 
				}
			});
		}
		return legendArray;
	},
	_layerIdXlation:{},
	setActiveSymbology: function(layerId, symbology)
	{
		
		var layer = this.getLayerConfigById(layerId);
		this.setActiveSymbologyForLayer(layer, symbology);
	},
	setActiveSymbologyForLayer: function(layer, symbology)
	{
		layer.activeSymbology = symbology;
	},
	getActiveSymbology: function(layerId)
	{
		return this.getLayerConfigById(layerId).activeSymbology;
	},
	getLegendForObject: function(object, routeColor)
	{
		var layer = this.getLayerConfigById(object.mxdata.mboName);
		return this.getLegendForObjectAndLayer(layer, object, routeColor);
	},
	/*
	 * Given an object and the currently active symbology, returns the symbol
	 * for the object in the symbology. If a color is given and the selected
	 * symbology is based on resource, the given color is used to find the right
	 * symbol.
	 */
	getLegendForObjectAndLayer: function(layer, object, routeColor)
	{
		var activeSymbology = layer.activeSymbology;
		if (activeSymbology == null)
		{
			return ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo();
		}
		if (activeSymbology.id == "resource")
		{
			if (object.routedata == null)
			{
				if (object.ownDefaultMarker != null)
				{
					return object.ownDefaultMarker;
				}
				else
				{
					return this._getDefaultSymbol(activeSymbology);
				}
			}
			else
			{
				var rtlDir = "";
				if(document.body.dir == "rtl")
				{
					rtlDir = "/rtl";
				}
				// Symbology type: resource.
				// We use the route color to find the right symbol.
				return {
					"url": "../webclient/javascript/ibm/tivoli/fwm/mxmap/resources" + rtlDir + "/symbology/workorder/map_WO_" + routeColor.replace("#", "").toLowerCase() + ".png",
					"color": "",
					"offsetx": 24,
					"offsety": 36,
					"width": 47,
					"height": 36
				};
			}
		}
		else if (activeSymbology.id == "fwm_default")
		{
			if (object.ownDefaultMarker != null)
			{
				return object.ownDefaultMarker;
			}
			else
			{
				// Symbology type: default
				// We assume there's only one value and return it.
				return activeSymbology.legends[0].symbol;
			}
		}
		else
		{
			if (activeSymbology.type == "numeric")
			{
				return this._getNumericSymbol(object, activeSymbology);
			}
			else if (activeSymbology.type == "domainvalue" || activeSymbology.type == "tablevalue")
			{
				return this._getDomainSymbol(object, activeSymbology);
			}
			// Shouldn't ever happen, but just in case...
			return this._getDefaultSymbol(activeSymbology);
		}
	},
	/*
	 * Returns the default symbol for the given symbology.
	 */
	_getDefaultSymbol: function(symbology)
	{
		var defaultSymbols = dojo.filter(symbology.legends, function(legend)
		{
			return legend.isDefault == true;
		});
		return defaultSymbols.length > 0 ? defaultSymbols[0].symbol : null;
	},
	/*
	 * Returns the right symbol for the given object in the given symbology,
	 * based on the relevant attribute's value and the configured ranges.
	 */
	_getNumericSymbol: function(object, symbology)
	{
		// Symbology type: numeric
		// We try to convert the value to a number and find a range that
		// contains that number. If either fails we return the default symbol.
		var val = object.mxdata.attributes[symbology.id];
		if (val == "")
		{
			val = "null";
			var symbols = dojo.filter(symbology.legends, function(legend)
			{
				return (legend.id == val);
			});
			return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
		}
		else if (!val)
		{
			return this._getDefaultSymbol(symbology);
		}
		else
		{
			var attrVal = parseInt(val);
			var symbols = dojo.filter(symbology.legends, function(legend)
			{
				return (attrVal >= parseInt(legend.minValue) && attrVal <= parseInt(legend.maxValue));
			});
			return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
		}
	},
	/*
	 * Returns the right symbol for the given object in the given symbology,
	 * based on the relevant attribute's value and the configured value/symbol
	 * pairs.
	 */
	_getDomainSymbol: function(object, symbology)
	{
		var attrVal = String(object.mxdata.attributes[symbology.id]).toLowerCase();
		if (attrVal == "")
			attrVal = "null";
		var symbols = dojo.filter(symbology.legends, function(legend)
		{
			return (legend.id == attrVal);
		});
		return (symbols.length > 0 ? symbols[0].symbol : this._getDefaultSymbol(symbology));
	},
	/*
	 * Returns the default symbology for the layer
	 * The default symbology is a configuration in the presentation.
	 */
	getDefaultSymbologyForLayer: function(layer)
	{
		var defaultSymbology = null;
		if(this._defaultSymbologyConfig != null)
		{
			var layerSymbologyPair = null;
			layerSymbologyPair = dojo.filter(this._defaultSymbologyConfig, function(pair)
			{
				return (pair.layer == layer);
			});
			if(layerSymbologyPair.length > 0)
			{
				defaultSymbology = layerSymbologyPair[0].symbology;
			}
		}
		return defaultSymbology;
	}

});


});

},
'url:dijit/templates/Tooltip.html':"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n",
'dijit/_base/sniff':function(){
define("dijit/_base/sniff", [ "dojo/uacss" ], function(){
	// module:
	//		dijit/_base/sniff
	// summary:
	//		Back compatibility module, new code should require dojo/uacss directly instead of this module.
});

},
'ibm/tivoli/fwm/mxmap/geolocation/LocationMonitor':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dojox/timing/_base,ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor");
dojo.require("dojox.timing._base");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation");

/**
 * Monitors the user's current location and send it to Maximo so that the data
 * can be stored in the LBSLOCATION table
 */
ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance = null;

dojo.declare("ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor", ibm.tivoli.fwm.mxmap._Base, {
	interval: 0, // seconds
	_timer: null,
	compId: null,
	_myCurrentLocation: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);

		// Get the instance of MyCurrentLocation
		this._myCurrentLocation = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();

	},
	/**
	 * Starts the timer to monitor the current location
	 */
	start: function()
	{
		if (this._timer == null)
		{
			if (this.interval > 0)
			{

				console.log("[LocationMonitor] Starting timer with interval " + this.interval);

				this._doStart();
			}
			else
			{

				console.log("[LocationMonitor] Interal must be greater than zero -- Start ignored.");

			}
		}
		else
		{

			console.log("[LocationMonitor] Timer already started. Ignoring start");

		}
	},
	/**
	 * Stops the timer
	 */
	stop: function()
	{
		if (this._timer == null)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[LocationMonitor] Timer not started. Ignoring stop");
			}
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[LocationMonitor] Stopping timer");
			}
			this._timer.stop();
			this._timer = null;
		}
	},
	/**
	 * Returns true if the timer is active
	 */
	started: function()
	{
		return (this._timer != null);
	},
	/**
	 * Creates the instance of dojox.timing.Timer and changes the onTick,
	 * onStart and onStop functions Calls myCurrentLocation.getUserLocation on
	 * onTick
	 */
	_doStart: function()
	{
		this._myCurrentLocation.getUserLocation(dojo.hitch(this, this._updateMaximoRecord), dojo.hitch(this, this._failedToGetCurrentLocation));
		this._timer = new dojox.timing.Timer(this.interval * 1000);
		this._timer.onTick = dojo.hitch(this, function()
		{
			if (this._myCurrentLocation)
			{
				this._myCurrentLocation.getUserLocation(dojo.hitch(this, this._updateMaximoRecord), dojo.hitch(this, this._failedToGetCurrentLocation));
			}
		});
		this._timer.onStart = dojo.hitch(this, function()
		{

			console.log("[LocationMonitor] Started timer to update current location");

		});
		this._timer.onStop = dojo.hitch(this, function()
		{

			console.log("[LocationMonitor] Stopped timer to update current location");

		});
		this._timer.start();
	},
	/**
	 * Sends the LBS location data to the server
	 */
	_updateMaximoRecord: function(position)
	{

		if (position && position.coords)
		{
			var positionData = position.coords;

			var myEvent = new Event("loadLaborLBS", this.compId, {
				lat: positionData.latitude,
				lng: positionData.longitude,
				locationAccuracy: positionData.accuracy,
				altitudeAccuracy: positionData.altitudeAccuracy,
				altitude: positionData.altitude,
				heading: positionData.heading,
				speed: positionData.speed
			}, REQUESTTYPE_HIGHASYNC);

			queueManager.queueEvent(myEvent, "text/html", "text", dojo.hitch(this, this._messageSuccessfullySentToMaximo), dojo.hitch(this, this._failedToSendMessageToMaximo));
		}
	},
	/**
	 * Handles the 4 possible errors when trying to retrieve LBS location data.
	 * If the errors are either PERMISSION_DENIED or GEOLOCATION_NOT_SUPPORTED,
	 * the server logs the error and the LBS data collection stops. If the
	 * errors are either TIMEOUT or POSITION_UNAVAILABLE, just log in the
	 * browser console.
	 */
	_failedToGetCurrentLocation: function()
	{
		if (this._myCurrentLocation)
		{
			switch (this._myCurrentLocation.getStatus())
			{
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
					this.stop();

					console.warn("[LocationMonitor] Could not retrieve current location (PERMISSION_DENIED). LBS data collection stopped.");

					this._logPermissionDenied();
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
					this.stop();

					console.warn("[LocationMonitor] Could not retrieve current location (GEOLOCATION_NOT_SUPPORTED). LBS data collection stopped.");

					this._logNotSupported();
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
					console.warn("[LocationMonitor] Could not retrieve current location (TIMEOUT).");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
					console.warn("[LocationMonitor] Could not retrieve current location (POSITION_UNAVAILABLE).");
					break;
				default:
					break;
			}
			;
		}
	},
	_failedToSendMessageToMaximo: function()
	{
		console.error("[LocationMonitor] Failed to send current location to Maximo");
	},
	_messageSuccessfullySentToMaximo: function()
	{
	},
	/**
	 * Send a message to the server so that it can log the PERMISSION_DENIED
	 * error.
	 */
	_logPermissionDenied: function()
	{
		sendEvent('logLBSCollectionPermissionDenied', this.compId, '');
	},
	/**
	 * Send a message to the server so that it can log the
	 * GEOLOCATION_NOT_SUPPORTED error.
	 */
	_logNotSupported: function()
	{
		sendEvent('logLBSCollectionNotSupported', this.compId, '');
	},
	destroyRecursive: function()
	{
		this.stop();
		this.inherited(arguments);
	}
});

/**
 * Retrieves the LocationMonitor singleton instance
 */
ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor.getLocationMonitorInstance = function(params)
{
	if (!ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance)
	{
		ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance = new ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor(params);
	}
	return ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor._instance;
};

});

},
'dijit/Toolbar':function(){
define("dijit/Toolbar", [
	"require",
	"dojo/_base/declare", // declare
	"dojo/_base/kernel",
	"dojo/keys", // keys.LEFT_ARROW keys.RIGHT_ARROW
	"dojo/ready",
	"./_Widget",
	"./_KeyNavContainer",
	"./_TemplatedMixin"
], function(require, declare, kernel, keys, ready, _Widget, _KeyNavContainer, _TemplatedMixin){

/*=====
	var _Widget = dijit._Widget;
	var _KeyNavContainer = dijit._KeyNavContainer;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/Toolbar
	// summary:
	//		A Toolbar widget, used to hold things like `dijit.Editor` buttons


	// Back compat w/1.6, remove for 2.0
	if(!kernel.isAsync){
		ready(0, function(){
			var requires = ["dijit/ToolbarSeparator"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return declare("dijit.Toolbar", [_Widget, _TemplatedMixin, _KeyNavContainer], {
		// summary:
		//		A Toolbar widget, used to hold things like `dijit.Editor` buttons

		templateString:
			'<div class="dijit" role="toolbar" tabIndex="${tabIndex}" data-dojo-attach-point="containerNode">' +
			'</div>',

		baseClass: "dijitToolbar",

		postCreate: function(){
			this.inherited(arguments);

			this.connectKeyNavHandlers(
				this.isLeftToRight() ? [keys.LEFT_ARROW] : [keys.RIGHT_ARROW],
				this.isLeftToRight() ? [keys.RIGHT_ARROW] : [keys.LEFT_ARROW]
			);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/routing/impl/bingmaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/routing/Router,ibm/tivoli/fwm/mxmap/routing/Route"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.impl.bingmaps");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Router");
dojo.require("ibm.tivoli.fwm.mxmap.routing.Route");

/**
 * Bing maps routing implementation.
 */
ibm.tivoli.fwm.mxmap.routing.impl.bcc = 0;
ibm.tivoli.fwm.mxmap.routing.impl.bingmapsId = function()
{
	return ibm.tivoli.fwm.mxmap.routing.impl.bcc++;
};

dojo.declare("ibm.tivoli.fwm.mxmap.routing.impl.bingmaps", [ ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base ], {
	directionsService: null,
	map: null,
	conf: null,
	_isLoaded: false,
	_routeQueue: [],
	_msHandlers: [],
	_routeLimits: 10,
	/**
	 * Bing maps needs to load the Direction module
	 * 
	 */
	c: 0,
	constructor: function(params)
	{
		console.log("router bingmaps", params);
		this.id = ibm.tivoli.fwm.mxmap.routing.impl.bingmapsId();
		this._msHandlers = [];
		this._routeQueueParalel = [];
		this._isLoaded = false;
		dojo.mixin(this, params);
		this.c = 0;
		var loadedFct = dojo.hitch(this, this._loaded);
		if (Microsoft.Maps.Directions)
		{
			console.log("MsDirections loaded");
			this.directionsService = new Microsoft.Maps.Directions.DirectionsManager(this.map.getMapstraction().getProviderMap());

			this._isLoaded = true;
		}
		else
		{
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				callback: loadedFct
			});
		}
	},
	/**
	 * Until the bing directions module is not loaded we cannot perform any
	 * routing. After it loads we trigger the _executeQueue to execute any
	 * queued routing requests.
	 */
	_loaded: function()
	{
		console.log("loaded module Microsoft.Maps.Directions");
		this.directionsService = new Microsoft.Maps.Directions.DirectionsManager(this.map.getMapstraction().getProviderMap());

		this._isLoaded = true;

		this._executeQueue();
	},

	/**
	 * Handles final route callback when it's complete
	 * 
	 * @param arg
	 * @param callback
	 */
	_routedOk: function(routeSummary, callback)
	{
		console.log("routed ok", this.id, this.routecolor, routeSummary);
		
		routeSummary.totalDistance = routeSummary.distance;
		routeSummary.totalDuration = routeSummary.time;
		routeSummary.map = this.map;
		var itinerary = new ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary();
		var initialStops = routeSummary.inputInfo.stops;
		if (routeSummary.itineraryLegInfo.length > 0)
		{
			var mustGeocode = false;
			if (initialStops[0].calculatedStop == true)
			{
				mustGeocode = true;
			}
			itinerary.setInitialLocation(routeSummary.itineraryLegInfo[0].startAddress, routeSummary.itineraryLegInfo[0].startLoc, null, null, mustGeocode);
		}

		itinerary.addAllLegs(routeSummary.itineraryLegInfo);
		
		//check if last stop was calculated we must force geocode
		if(initialStops[initialStops.length-1].calculatedStop==true){
			itinerary.legs[itinerary.legs.length-1].needsToGeocode=true;
		}
		routeSummary.itinerary = itinerary;
		routeSummary.distanceUnit = this.getCurrentDistanceUnit();

		if (callback)
		{
			var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routeSummary);
			callback(routeInfo);
		}
		this.isExecuting = false;
		this.executeQueuedParalel();
	},
	/**
	 * Handles routing error callback
	 * http://msdn.microsoft.com/en-us/library/hh312807.aspx
	 * 
	 * @param error
	 * @param erroCb
	 */
	_routeError: function(status, errCb)
	{
		console.error("route failed", status, errCb);
		if (errCb)
		{
			switch (status.responseCode)
			{
				case 2:
				case 3:
				case 4:
				case 5:
				case 8:
				case 15:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS, status);
					break;
				case 13:
				case 16:
				case 18:
				case 17:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED, status);
					break;
				case 11:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.TIMEOUT, status);
					break;
				default:
					errCb(ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN_ERROR, status);
					break;

			}
		}
		this.executeQueuedParalel();
	},
	/**
	 * Executes all queued routing requests
	 */
	_executeQueue: function()
	{
		console.log("executing queued ", this._routeQueue.length);
		for ( var i = 0; i < this._routeQueue.length; i++)
		{
			console.log("fct ", this._routeQueue[i]);
			var obj = this._routeQueue[i];
			this.showRoute(obj.stops, obj.callback, obj.errCb, null, obj.instanceConf);

		}
	},
	executeQueuedParalel: function()
	{
		console.log("executing queued paralele", this._routeQueueParalel.length);
		if (this._routeQueueParalel.length > 0)
		{
			var obj = this._routeQueueParalel.pop();
			this.showRoute(obj.stops, obj.callback, obj.errCb, null, obj.instanceConf);
		}
		console.log("sent");
	},
	/**
	 * Get route data, route polyline, stop locations and last stop.
	 * 
	 * @param resp
	 * @param map
	 * @returns {lastWayPoint:lastWayPoint,locations:locations,polylineVertices:polylineVertices}
	 */
	_extractItinerarySteps: function(itineraryItems)
	{
		var steps = [];
		var lastDistance = 0.0;
		for ( var id in itineraryItems)
		{
			var item = itineraryItems[id];
			var loc = new mxn.LatLonPoint(item.coordinate.latitude,item.coordinate.longitude);
			var step = {
				distance: lastDistance,
				duration: item.durationInSeconds,
				info: item.formattedText,
				location:loc
			};
			steps.push(step);
			lastDistance = item.distance;

		}
		return steps;
	},
	_extractRouteInfo: function(resp, map)
	{
		var lastWayPoint = null;
		var locations = [];
		var polylineVertices = [];
		var itineraryLegInfo = [];

		for ( var j in resp.route)
		{
			var routeLegs = resp.route[j];
			for ( var k in routeLegs)
			{
				var leg = routeLegs[k];
				
				for ( var l in leg)
				{
					var st = leg[l];
				
					if (!st)
					{
						continue;
					}
					// st.startWaypointLocation
					var startpt = new mxn.LatLonPoint();
					startpt.fromProprietary(this.map.getMapstraction().api, st.startWaypointLocation);

					locations.push(startpt);

					var legEnd = new mxn.LatLonPoint();
					legEnd.fromProprietary(this.map.getMapstraction().api, st.endWaypointLocation);
					var legInfo = {
						location: legEnd,
						startLoc: startpt,
						distanceToLeg: st.summary.distance,
						durationToLeg: Math.round(st.summary.time / 6) / 10,
						info: null,
						startAddress: null,
						marker: null,
						steps: null,
						onclick: null
					};
					console.log(l, st.subLegs);
					for ( var m in st.subLegs)
					{
						var sleg = st.subLegs[m];

						if (legInfo.startAddress == null)
						{

							legInfo.startAddress = sleg.startDescription;
						}
						polylineVertices = polylineVertices.concat(this._getPolylineVertices(sleg, map));
						legInfo.info = sleg.endDescription;
					}

					legInfo.steps = this._extractItinerarySteps(st.itineraryItems);
					itineraryLegInfo.push(legInfo);
					lastWayPoint = new mxn.LatLonPoint();
					lastWayPoint.fromProprietary(this.map.getMapstraction().api, st.endWaypointLocation);

				}
			}
		}
		return {
			lastWayPoint: lastWayPoint,
			locations: locations,
			itineraryInfo: itineraryLegInfo,
			polylineVertices: polylineVertices
		};
	},
	/*
	 * iterate over a subleg and returns the vertices of the polyline
	 */
	_getPolylineVertices: function(subLeg)
	{
		var lineVertices = [];
		if (subLeg && subLeg.routePath)
		{
			var rpath = subLeg.routePath;

			for ( var i in rpath.decodedLatitudes)
			{
				var lat = rpath.decodedLatitudes[i];
				var lng = rpath.decodedLongitudes[i];
				// lineVertices.push(new Microsoft.Maps.Location(lat, lng));
				lineVertices.push(new mxn.LatLonPoint(lat, lng));
			}

		}
		return lineVertices;
	},
	/**
	 * Executes the routing on bing maps provider.
	 * 
	 * @see Router.js#showRoute
	 */
	_routeQueueParalel: null,
	showRoute: function(stops, callback, errCb, a, instanceConf)
	{

		if (this.isExecuting == true)
		{
			console.warn("there's a execution going on");
			this._routeQueueParalel.push({
				stops: stops,
				callback: callback,
				errCb: errCb,
				instanceConf: instanceConf
			});
			return;
		}

		if (this._isLoaded == true)
		{
			this.isExecuting = true;
			var failFct = function(error)
			{
				this.isExecuting = false;
				this._routeError(error, errCb);
			};
			var map = this.map.getMapstraction().getProviderMap();

			var routeSummary = {
				distance: 0,
				time: 0
			};
			if (instanceConf != null && instanceConf.routecolor)
			{
				this.routecolor = instanceConf.routecolor;
			}
			var offset = 0;
			var vertices = [];
			var waypointsLocations = [];
			var itineraryInfo = [];
			var th = this._startTimer();
			var complFct = function(response)
			{
				console.log("response", response);

				for ( var j in response.routeSummary)
				{
					routeSummary.distance += response.routeSummary[j].distance;
					routeSummary.time += response.routeSummary[j].time;
					console.log(j, "summary", response.routeSummary[j]);
				}
				var routeInfo = this._extractRouteInfo(response, map);

				vertices = vertices.concat(routeInfo.polylineVertices);
				itineraryInfo = itineraryInfo.concat(routeInfo.itineraryInfo);
				waypointsLocations = waypointsLocations.concat(routeInfo.locations);
				this._stopTimer(th, waypointsLocations.length);
				var lastStop = routeInfo.lastWayPoint;

				if (offset < stops.length)
				{

					var start = offset;
					offset += this._routeLimits;

					if (offset >= stops.length)
					{
						offset = stops.length;
					}

					if (start > 0)
					{
						start = start - 1;
					}
					th = this._startTimer();
					console.log("offset2", start, offset, stops.slice(start, offset).length);
					this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), errCb);
				}
				else
				{
					// adding last stop
					waypointsLocations.push(lastStop);
					// reset bing maps direction service otherwise it throws an
					// exception if we request more than the max route stops
					// limit
					console.warn("final resetDirections");
					this.directionsService.resetDirections();
					this._renderRoute(waypointsLocations, vertices, routeSummary, map, callback, errCb, itineraryInfo, stops);

				}

			};
			if (offset < stops.length)
			{

				var start = offset;
				offset += this._routeLimits;

				if (offset >= stops.length)
				{
					offset = stops.length;
				}

				if (start > 0)
				{
					start = start - 1;
				}
				console.log("offset", start, offset, stops.slice(start, offset).length, " m ", this.map.getId());
				// console.trace();
				this._calculateRoute(stops.slice(start, offset), dojo.hitch(this, complFct), dojo.hitch(this, failFct));

			}

			return;

		}
		else
		{
			// queueing a request until route module was not loaded
			console.warn("wait");
			this._routeQueue.push({
				stops: stops,
				callback: callback,
				errCb: errCb,
				instanceConf: instanceConf
			});
		}
	},
	/*
	 * Draw a list of stop locations,draw a polygon based on its vertices and
	 * execute the callback function with the route summary param.
	 */
	_renderRoute: function(waypointsLocations, vertices, routeSummary, map, callback, errCb, itineraryInfo, initialStops)
	{

		var poly = new mxn.Polyline();
		poly.points = vertices;
		poly.color = this.routecolor;
		poly.setOpacity(this.routeOpacity);
		poly.setWidth(this.routeLineWidth);
		
				
		routeSummary.stops = waypointsLocations;
		routeSummary.polyline = poly;
		console.log("rendering routes");
		var wp = this.directionsService.getRenderOptions().waypointPushpinOptions;
		wp.draggable = false;

		var customFct = function(opts)
		{
			this.wp = opts;
			this._counter = 0;
			this.getNext = function()
			{
				this.wp.text = this._generateMarkerText();
				return this.wp;
			};
			this._generateMarkerText = function()
			{

				var offset = (this._counter % 26);

				var dis = parseInt(this._counter / 26);
				var digit = String.fromCharCode(65 + offset);
				this._counter++;
				if (dis > 0)
				{
					digit += dis;
				}
				return digit;
			};
		};

		routeSummary.customMarkerOptions = new customFct(wp);

		routeSummary.itineraryLegInfo = itineraryInfo;
		console.log(itineraryInfo);
		this._stopTimer(null, routeSummary.stops.length);
		routeSummary.inputInfo = {
			stops: initialStops,
			successCb: callback,
			errorCb: errCb
		};
		routeSummary.originalRouter = this;
		this._routedOk(routeSummary, callback);
	},
	_convertMboToMSLocation: function(mboInfo)
	{
		var latLng;
		if (mboInfo.hasOwnProperty("gisdata"))
		{
			if (mboInfo.gisdata.lat != null && mboInfo.gisdata.lng != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.gisdata.lat, mboInfo.gisdata.lng);
			}
			else if (mboInfo.autolocate != null && mboInfo.autolocate.gisdata != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.autolocate.gisdata.lat, mboInfo.autolocate.gisdata.lng);
			}
			else if (mboInfo.hasOwnProperty("lat") && mboInfo != null)
			{
				latLng = new Microsoft.Maps.Location(mboInfo.lat, mboInfo.lng);
			}
			else
			{
				console.warn("Stop doesn't have gis coords", mboInfo);
			}
		}
		else
		{
			latLng = new Microsoft.Maps.Location(mboInfo.lat, mboInfo.lng);
		}
		return latLng;

	},
	/*
	 * Execute one route request against bing maps.
	 */
	_calculateRoute: function(stops, callback, errCb)
	{
		var successHandler = null;
		var errorHandler = null;
		var success = function(arg)
		{
			if (successHandler)
			{
				Microsoft.Maps.Events.removeHandler(successHandler);
			}
			if (callback)
			{
				callback(arg);
			}

		};
		var errorFct = function(error)
		{
			if (errorHandler)
			{
				Microsoft.Maps.Events.removeHandler(errorHandler);
			}
			if (errCb)
			{
				errCb(error);
			}
		};
		errorHandler = Microsoft.Maps.Events.addHandler(this.directionsService, 'directionsError', dojo.hitch(this, errorFct));

		successHandler = Microsoft.Maps.Events.addHandler(this.directionsService, 'directionsUpdated', dojo.hitch(this, success));
		console.warn("resetDirections in _calculateRoute", this.c++);
		this.directionsService.resetDirections();

		
		var reqOpts = {
			routeMode: Microsoft.Maps.Directions.RouteMode.driving,
			distanceUnit: Microsoft.Maps.Directions.DistanceUnit.kilometers,// requests
																			// are
																			// always
																			// in
																			// km

			routeDraggable: false
		};
		if (this.getAvoidHighways() == true && this.getAvoidTolls() == true)
		{
			reqOpts.routeAvoidance = 12;
		}
		else if (this.getAvoidTolls() == true)
		{
			reqOpts.routeAvoidance = 8;
		}
		else if (this.getAvoidHighways() == true)
		{
			reqOpts.routeAvoidance = 4;
		}
		else
		{
			reqOpts.routeAvoidance = 0;
		}
		if (reqOpts.routeAvoidance && reqOpts.routeAvoidance == 0 && this.isOptimizeRoute())
		{
			reqOpts.routeOptimization = Microsoft.Maps.Directions.RouteOptimization.shortestDistance;
		}
		this.directionsService.setRequestOptions(reqOpts);
		console.log("request options", reqOpts);
		for ( var i = 0; i < stops.length; i++)
		{
			var stop = stops[i];
			// if(stop.hasOwnProperty("gisdata")){
			// stop=stop.gisdata;
			// }
			var loc = this._convertMboToMSLocation(stop);// new
															// Microsoft.Maps.Location(stop.lat,
															// stop.lng);
			var waypoint = new Microsoft.Maps.Directions.Waypoint({
				location: loc
			});
			this.directionsService.addWaypoint(waypoint);
		}
		
		var color = this.routecolor;
		var lineWidth = this.routeLineWidth;
		var opacity = this.routeOpacity;
		
		if (color.indexOf("#") != 0)
		{
			color = "#" + color;
		}
		
		var msColor = Microsoft.Maps.Color.fromHex(color);
				
		this.directionsService.setRenderOptions({
			waypointPushpinOptions: {
				draggable: false
			},
			drivingPolylineOptions: {
				strokeColor: new Microsoft.Maps.Color(opacity*255, msColor.r, msColor.g, msColor.b),
				strokeThickness: lineWidth
			},

			autoUpdateMapView: false
		});
		
		
		

		this.directionsService.calculateDirections();
	},

	/**
	 * remove MS handlers
	 */
	destroyRecursive: function()
	{
		this.inherited(arguments);// similar to
		// super.destroyRecursive().
		// arguments is mandatory
		// var
		for ( var hid in this._msHandlers)
		{
			var handler = this._msHandlers[hid];
			Microsoft.Maps.Events.removeHandler(handler);
		}
		this.directionsService.dispose();
	}

});
});

},
'ibm/tivoli/fwm/mxmap/routing/itinerary/Itinerary':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Represents an intinerary among route stops.
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary", ibm.tivoli.fwm.mxmap._Base, {
	initialLocation: null,
	legs: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.legs = [];
		this.initialLocation = {};
	},
	setInitialLocation: function(info, location, locationMarker, clickCallback,needsToGeocode)
	{
		this.initialLocation = {
			location: location,
			info: info,
			needsToGeocode:needsToGeocode,
			marker: locationMarker,
			onclick: clickCallback
		};
	},
	addAllLegs: function(legs)
	{
		this.legs = this.legs.concat(legs);
	},
	addLeg: function(/* mxn.LatLng */location, /*string with the stop info*/info,/*distance in km or miles*/ distanceToLeg,/*duration in minutes*/ durationToLeg, locationMarker, steps, clickCallback, pos)
	{
		var leg = {
			location: location,
			distanceToLeg: distanceToLeg,
			durationToLeg: durationToLeg,
			info: info,
			needsToGeocode:false,
			marker: locationMarker,
			steps: steps,
			onclick: clickCallback
		};
		if (!pos)
		{
			this.legs.push(leg);
			return this.legs.length-1;
		}
		else
		{
			this.legs[pos] = leg;
			return pos;
		}
		
	},
	getInitialLocation: function()
	{
		return this.initialLocation;
	},
	clearAll: function()
	{
		this.legs = [];
		this.initialLocation = {};
	}
});
});

},
'ibm/tivoli/fwm/mxmap/impl/MaximoSpatialMover':function(){
// wrapped by build app
define(["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover");

/**
 * This Dojo class is a helper class to reduce the amount of code in the
 * mxn.maximospatial.core.js file. It has the responsibility of provide drag and
 * drop capability to the Marker.
 * 
 * @author thadeurc
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover", null, {
	isMouseOver: false,
	isMouseDown: false,
	originX: 0.0,
	originY: 0.0,
	_wasDragged: false,
	_graphic: null,
	map: null,
	_LIMIT_TO_PAN_PXS: 40,
	_connections: [],
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._connections = [];
		this._wasDragged = false;
	},
	_isGraphicDraggable: function(graphic)
	{
		return (graphic != null && graphic.mapstraction_marker != null && graphic.mapstraction_marker.draggable == true);
	},
	_onMouseOver: function(e)
	{
		dojo.stopEvent(e);
		e.target.style.cursor = 'pointer';
	},
	_onMouseDown: function(e)
	{
		if (this._isGraphicDraggable(e.graphic) == true)
		{
			dojo.publish("startedUserInteractionOnMap", [ {
				objectSource: this,
				objectSourceName: 'MaximoSpatialMover',
				eventName: 'mousedown'
			} ]);
			e.target.style.cursor = 'move';
			this.map.disableMapNavigation();
			this.isMouseDown = true;
			this._graphic = e.graphic;
			this.originX = e.mapPoint.x;
			this.originY = e.mapPoint.y;
			// use 2% and 3% as limit for pan
			this._LIMIT_TO_PAN_VERTICAL = Math.ceil(this.map.height * 0.03) + 32;
			this._LIMIT_TO_PAN_HORIZONTAL = Math.ceil(this.map.width * 0.02) + 32;
		}

	},
	_onMouseDrag: function(e)
	{
		if (this.isMouseDown == true)
		{
			dojo.stopEvent(e);
			// make the map move along the mouse cursor
			this._move(e);
			this._ensureInsideMap(e);
			this._wasDragged = true;
		}
	},
	_ensureInsideMap: function(e)
	{
		var x = e.screenPoint.x;
		var y = e.screenPoint.y;
		var screenCenter = this.map.toScreen(this.map.extent.getCenter());
		var newX = screenCenter.x;
		var newY = screenCenter.y;
		var deltaX = newX;
		var deltaY = newY;

		// need to move to the right?
		if (this.map.width - x <= this._LIMIT_TO_PAN_HORIZONTAL)
		{
			deltaX = newX + (this._LIMIT_TO_PAN_HORIZONTAL * 4);
		}
		// need to move to the left?
		else if (x <= this._LIMIT_TO_PAN_HORIZONTAL)
		{
			deltaX = newX - (this._LIMIT_TO_PAN_HORIZONTAL * 4);
		}

		// need to move down?
		if (this.map.height - y <= this._LIMIT_TO_PAN_VERTICAL)
		{
			deltaY = newY + (this._LIMIT_TO_PAN_VERTICAL * 4);
		}
		// need to move up?
		else if (y <= this._LIMIT_TO_PAN_VERTICAL)
		{
			deltaY = newY - (this._LIMIT_TO_PAN_VERTICAL * 4);
		}
		// do we need to shift the map ?
		if (newX != deltaX || newY != deltaY)
		{
			var shiftPosition = this._calculateShiftForMarker(deltaX - newX, deltaY - newY);
			this._shiftMapCenter(deltaX, deltaY);
			this._shiftMarker(shiftPosition);
		}
	},
	_shiftMarker: function(shiftPosition)
	{
		this._doMove(shiftPosition.x, shiftPosition.y);
	},
	_move: function(e)
	{
		this._doMove(e.mapPoint.x, e.mapPoint.y);
	},
	// diffX and diffY represents how much the center of the map
	// was shifted
	// in screen units. We calculate how much map units we need
	// to shift the
	// cursor in map units, which is the unit that
	// graphic.offset receives.
	_calculateShiftForMarker: function(diffX, diffY)
	{
		// needs to calculate based on the map shift
		// shift on map was done in screen units. Need to have
		// the logic below to
		// make the appropriate conversions
		var posCursor = new esri.geometry.Point(this.originX, this.originY, this.map.sr);
		var posCursorOnScreen = this.map.toScreen(posCursor);
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Cursor on Screen: ", posCursorOnScreen);
		}
		var posCursorOnScreenUpdated = new esri.geometry.Point(posCursorOnScreen.x + diffX, posCursorOnScreen.y + diffY, this.map.sr);
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Cursor on Screen After Delta: ", posCursorOnScreenUpdated);
		}
		return this.map.toMap(posCursorOnScreenUpdated);
	},
	_shiftMapCenter: function(deltaX, deltaY)
	{
		var posCenter = new esri.geometry.Point(deltaX, deltaY);
		var latLngCenter = this.map.toMap(posCenter);
		this.map.centerAt(latLngCenter);
	},
	_doMove: function(toMapPointX, toMapPointY)
	{
		var deltaX = (toMapPointX - this.originX);
		var deltaY = (toMapPointY - this.originY);
		var movedGeom = this._graphic.geometry.offset(deltaX, deltaY);
		this.originX = toMapPointX;
		this.originY = toMapPointY;
		this._graphic.setGeometry(movedGeom);
	},
	_onMouseUp: function(e)
	{
		if (this._isGraphicDraggable(e.graphic) == true)
		{
			dojo.stopEvent(e);
			this.isMouseDown = false;
			this._wasDragged = false;
			this.originX = 0.0;
			this.originY = 0.0;
			this.map.enableMapNavigation();
			e.target.style.cursor = 'pointer';
			this._graphic = null;
		}
	},
	_onMapMouseOut: function(e)
	{
		// handles the case where the user moved the cursor out
		// of the map
		// in this case we 'release' the mouse click to avoid
		// strange behavior
		if (this.isMouseDown == true)
		{
			this._onMouseDragEnd(e);
			this._onMouseUp(e);
		}
	},
	_onMouseDragEnd: function(e)
	{
		if (this.isMouseDown == true && this._wasDragged == true)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[MaximoSpatialMover] Marker Point left at: ", this._graphic.geometry);
			}
			var marker = this._graphic.mapstraction_marker;
			marker.dragend.fire({
				marker: marker,
				newLocation: {
					lng: this._graphic.geometry.x,
					lat: this._graphic.geometry.y
				}
			});
		}
		dojo.publish("endedUserInteractionOnMap", [ {
			objectSource: this,
			objectSourceName: 'MaximoSpatialMover',
			eventName: 'mouseDragEnd'
		} ]);
	},
	installListenersOn: function(graphics)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Connecting listeners");
		}
		this._connections.push(dojo.connect(graphics, "onMouseDown", dojo.hitch(this, this._onMouseDown)));
		this._connections.push(dojo.connect(graphics, "onMouseUp", dojo.hitch(this, this._onMouseDragEnd)));
		this._connections.push(dojo.connect(graphics, "onMouseUp", dojo.hitch(this, this._onMouseUp)));
		this._connections.push(dojo.connect(graphics, "onMouseDrag", dojo.hitch(this, this._onMouseDrag)));
		this._connections.push(dojo.connect(this.map, "onMouseDrag", dojo.hitch(this, this._onMouseDrag)));
		this._connections.push(dojo.connect(this.map, "onMouseOut", dojo.hitch(this, this._onMapMouseOut)));
		this._connections.push(dojo.connect(this.map, "onMouseUp", dojo.hitch(this, this._onMapMouseOut)));
	},
	disconnectInstalledListeners: function()
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Disconnecting listeners");
		}
		for ( var link in this._connections)
		{
			dojo.disconnect(this._connections[link]);
		}
		this._connections = [];
	}
});
});

},
'dijit/DropDownMenu':function(){
require({cache:{
'url:dijit/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu", [
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys
	"dojo/text!./templates/Menu.html",
	"./_OnDijitClickMixin",
	"./_MenuBase"
], function(declare, event, keys, template, _OnDijitClickMixin, _MenuBase){

/*=====
	var _MenuBase = dijit._MenuBase;
	var _OnDijitClickMixin = dijit._OnDijitClickMixin;
=====*/

	// module:
	//		dijit/DropDownMenu
	// summary:
	//		dijit.DropDownMenu widget

	return declare("dijit.DropDownMenu", [_MenuBase, _OnDijitClickMixin], {
		// summary:
		//		A menu, without features for context menu (Meaning, drop down menu)

		templateString: template,

		baseClass: "dijitMenu",

		postCreate: function(){
			var l = this.isLeftToRight();
			this._openSubMenuKey = l ? keys.RIGHT_ARROW : keys.LEFT_ARROW;
			this._closeSubMenuKey = l ? keys.LEFT_ARROW : keys.RIGHT_ARROW;
			this.connectKeyNavHandlers([keys.UP_ARROW], [keys.DOWN_ARROW]);
		},

		_onKeyPress: function(/*Event*/ evt){
			// summary:
			//		Handle keyboard based menu navigation.
			// tags:
			//		protected

			if(evt.ctrlKey || evt.altKey){ return; }

			switch(evt.charOrCode){
				case this._openSubMenuKey:
					this._moveToPopup(evt);
					event.stop(evt);
					break;
				case this._closeSubMenuKey:
					if(this.parentMenu){
						if(this.parentMenu._isMenuBar){
							this.parentMenu.focusPrev();
						}else{
							this.onCancel(false);
						}
					}else{
						event.stop(evt);
					}
					break;
			}
		}
	});
});

},
'dijit/form/_FormMixin':function(){
define("dijit/form/_FormMixin", [
	"dojo/_base/array", // array.every array.filter array.forEach array.indexOf array.map
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.hitch lang.isArray
	"dojo/window" // winUtils.scrollIntoView
], function(array, declare, kernel, lang, winUtils){

	// module:
	//		dijit/form/_FormMixin
	// summary:
	//		Mixin for containers of form widgets (i.e. widgets that represent a single value
	//		and can be children of a <form> node or dijit.form.Form widget)

	return declare("dijit.form._FormMixin", null, {
		// summary:
		//		Mixin for containers of form widgets (i.e. widgets that represent a single value
		//		and can be children of a <form> node or dijit.form.Form widget)
		// description:
		//		Can extract all the form widgets
		//		values and combine them into a single javascript object, or alternately
		//		take such an object and set the values for all the contained
		//		form widgets

	/*=====
		// value: Object
		//		Name/value hash for each child widget with a name and value.
		//		Child widgets without names are not part of the hash.
		//
		//		If there are multiple child widgets w/the same name, value is an array,
		//		unless they are radio buttons in which case value is a scalar (since only
		//		one radio button can be checked at a time).
		//
		//		If a child widget's name is a dot separated list (like a.b.c.d), it's a nested structure.
		//
		//		Example:
		//	|	{ name: "John Smith", interests: ["sports", "movies"] }
	=====*/

		// state: [readonly] String
		//		Will be "Error" if one or more of the child widgets has an invalid value,
		//		"Incomplete" if not all of the required child widgets are filled in.  Otherwise, "",
		//		which indicates that the form is ready to be submitted.
		state: "",

		//	TODO:
		//	* Repeater
		//	* better handling for arrays.  Often form elements have names with [] like
		//	* people[3].sex (for a list of people [{name: Bill, sex: M}, ...])
		//
		//

		_getDescendantFormWidgets: function(/*dijit._WidgetBase[]?*/ children){
			// summary:
			//		Returns all form widget descendants, searching through non-form child widgets like BorderContainer
			var res = [];
			array.forEach(children || this.getChildren(), function(child){
				if("value" in child){
					res.push(child);
				}else{
					res = res.concat(this._getDescendantFormWidgets(child.getChildren()));
				}
			}, this);
			return res;
		},

		reset: function(){
			array.forEach(this._getDescendantFormWidgets(), function(widget){
				if(widget.reset){
					widget.reset();
				}
			});
		},

		validate: function(){
			// summary:
			//		returns if the form is valid - same as isValid - but
			//		provides a few additional (ui-specific) features.
			//		1 - it will highlight any sub-widgets that are not
			//			valid
			//		2 - it will call focus() on the first invalid
			//			sub-widget
			var didFocus = false;
			return array.every(array.map(this._getDescendantFormWidgets(), function(widget){
				// Need to set this so that "required" widgets get their
				// state set.
				widget._hasBeenBlurred = true;
				var valid = widget.disabled || !widget.validate || widget.validate();
				if(!valid && !didFocus){
					// Set focus of the first non-valid widget
					winUtils.scrollIntoView(widget.containerNode || widget.domNode);
					widget.focus();
					didFocus = true;
				}
	 			return valid;
	 		}), function(item){ return item; });
		},

		setValues: function(val){
			kernel.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.", "", "2.0");
			return this.set('value', val);
		},
		_setValueAttr: function(/*Object*/ obj){
			// summary:
			//		Fill in form values from according to an Object (in the format returned by get('value'))

			// generate map from name --> [list of widgets with that name]
			var map = { };
			array.forEach(this._getDescendantFormWidgets(), function(widget){
				if(!widget.name){ return; }
				var entry = map[widget.name] || (map[widget.name] = [] );
				entry.push(widget);
			});

			for(var name in map){
				if(!map.hasOwnProperty(name)){
					continue;
				}
				var widgets = map[name],						// array of widgets w/this name
					values = lang.getObject(name, false, obj);	// list of values for those widgets

				if(values === undefined){
					continue;
				}
				if(!lang.isArray(values)){
					values = [ values ];
				}
				if(typeof widgets[0].checked == 'boolean'){
					// for checkbox/radio, values is a list of which widgets should be checked
					array.forEach(widgets, function(w){
						w.set('value', array.indexOf(values, w.value) != -1);
					});
				}else if(widgets[0].multiple){
					// it takes an array (e.g. multi-select)
					widgets[0].set('value', values);
				}else{
					// otherwise, values is a list of values to be assigned sequentially to each widget
					array.forEach(widgets, function(w, i){
						w.set('value', values[i]);
					});
				}
			}

			/***
			 * 	TODO: code for plain input boxes (this shouldn't run for inputs that are part of widgets)

			array.forEach(this.containerNode.elements, function(element){
				if(element.name == ''){return};	// like "continue"
				var namePath = element.name.split(".");
				var myObj=obj;
				var name=namePath[namePath.length-1];
				for(var j=1,len2=namePath.length;j<len2;++j){
					var p=namePath[j - 1];
					// repeater support block
					var nameA=p.split("[");
					if(nameA.length > 1){
						if(typeof(myObj[nameA[0]]) == "undefined"){
							myObj[nameA[0]]=[ ];
						} // if

						nameIndex=parseInt(nameA[1]);
						if(typeof(myObj[nameA[0]][nameIndex]) == "undefined"){
							myObj[nameA[0]][nameIndex] = { };
						}
						myObj=myObj[nameA[0]][nameIndex];
						continue;
					} // repeater support ends

					if(typeof(myObj[p]) == "undefined"){
						myObj=undefined;
						break;
					};
					myObj=myObj[p];
				}

				if(typeof(myObj) == "undefined"){
					return;		// like "continue"
				}
				if(typeof(myObj[name]) == "undefined" && this.ignoreNullValues){
					return;		// like "continue"
				}

				// TODO: widget values (just call set('value', ...) on the widget)

				// TODO: maybe should call dojo.getNodeProp() instead
				switch(element.type){
					case "checkbox":
						element.checked = (name in myObj) &&
							array.some(myObj[name], function(val){ return val == element.value; });
						break;
					case "radio":
						element.checked = (name in myObj) && myObj[name] == element.value;
						break;
					case "select-multiple":
						element.selectedIndex=-1;
						array.forEach(element.options, function(option){
							option.selected = array.some(myObj[name], function(val){ return option.value == val; });
						});
						break;
					case "select-one":
						element.selectedIndex="0";
						array.forEach(element.options, function(option){
							option.selected = option.value == myObj[name];
						});
						break;
					case "hidden":
					case "text":
					case "textarea":
					case "password":
						element.value = myObj[name] || "";
						break;
				}
	  		});
	  		*/

			// Note: no need to call this._set("value", ...) as the child updates will trigger onChange events
			// which I am monitoring.
		},

		getValues: function(){
			kernel.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.", "", "2.0");
			return this.get('value');
		},
		_getValueAttr: function(){
			// summary:
			// 		Returns Object representing form values.   See description of `value` for details.
			// description:

			// The value is updated into this.value every time a child has an onChange event,
			// so in the common case this function could just return this.value.   However,
			// that wouldn't work when:
			//
			// 1. User presses return key to submit a form.  That doesn't fire an onchange event,
			// and even if it did it would come too late due to the setTimeout(..., 0) in _handleOnChange()
			//
			// 2. app for some reason calls this.get("value") while the user is typing into a
			// form field.   Not sure if that case needs to be supported or not.

			// get widget values
			var obj = { };
			array.forEach(this._getDescendantFormWidgets(), function(widget){
				var name = widget.name;
				if(!name || widget.disabled){ return; }

				// Single value widget (checkbox, radio, or plain <input> type widget)
				var value = widget.get('value');

				// Store widget's value(s) as a scalar, except for checkboxes which are automatically arrays
				if(typeof widget.checked == 'boolean'){
					if(/Radio/.test(widget.declaredClass)){
						// radio button
						if(value !== false){
							lang.setObject(name, value, obj);
						}else{
							// give radio widgets a default of null
							value = lang.getObject(name, false, obj);
							if(value === undefined){
								lang.setObject(name, null, obj);
							}
						}
					}else{
						// checkbox/toggle button
						var ary=lang.getObject(name, false, obj);
						if(!ary){
							ary=[];
							lang.setObject(name, ary, obj);
						}
						if(value !== false){
							ary.push(value);
						}
					}
				}else{
					var prev=lang.getObject(name, false, obj);
					if(typeof prev != "undefined"){
						if(lang.isArray(prev)){
							prev.push(value);
						}else{
							lang.setObject(name, [prev, value], obj);
						}
					}else{
						// unique name
						lang.setObject(name, value, obj);
					}
				}
			});

			/***
			 * code for plain input boxes (see also domForm.formToObject, can we use that instead of this code?
			 * but it doesn't understand [] notation, presumably)
			var obj = { };
			array.forEach(this.containerNode.elements, function(elm){
				if(!elm.name)	{
					return;		// like "continue"
				}
				var namePath = elm.name.split(".");
				var myObj=obj;
				var name=namePath[namePath.length-1];
				for(var j=1,len2=namePath.length;j<len2;++j){
					var nameIndex = null;
					var p=namePath[j - 1];
					var nameA=p.split("[");
					if(nameA.length > 1){
						if(typeof(myObj[nameA[0]]) == "undefined"){
							myObj[nameA[0]]=[ ];
						} // if
						nameIndex=parseInt(nameA[1]);
						if(typeof(myObj[nameA[0]][nameIndex]) == "undefined"){
							myObj[nameA[0]][nameIndex] = { };
						}
					}else if(typeof(myObj[nameA[0]]) == "undefined"){
						myObj[nameA[0]] = { }
					} // if

					if(nameA.length == 1){
						myObj=myObj[nameA[0]];
					}else{
						myObj=myObj[nameA[0]][nameIndex];
					} // if
				} // for

				if((elm.type != "select-multiple" && elm.type != "checkbox" && elm.type != "radio") || (elm.type == "radio" && elm.checked)){
					if(name == name.split("[")[0]){
						myObj[name]=elm.value;
					}else{
						// can not set value when there is no name
					}
				}else if(elm.type == "checkbox" && elm.checked){
					if(typeof(myObj[name]) == 'undefined'){
						myObj[name]=[ ];
					}
					myObj[name].push(elm.value);
				}else if(elm.type == "select-multiple"){
					if(typeof(myObj[name]) == 'undefined'){
						myObj[name]=[ ];
					}
					for(var jdx=0,len3=elm.options.length; jdx<len3; ++jdx){
						if(elm.options[jdx].selected){
							myObj[name].push(elm.options[jdx].value);
						}
					}
				} // if
				name=undefined;
			}); // forEach
			***/
			return obj;
		},

	 	isValid: function(){
	 		// summary:
	 		//		Returns true if all of the widgets are valid.
			//		Deprecated, will be removed in 2.0.  Use get("state") instead.

			return this.state == "";
		},

		onValidStateChange: function(/*Boolean*/ /*===== isValid =====*/){
			// summary:
			//		Stub function to connect to if you want to do something
			//		(like disable/enable a submit button) when the valid
			//		state changes on the form as a whole.
			//
			//		Deprecated.  Will be removed in 2.0.  Use watch("state", ...) instead.
		},

		_getState: function(){
			// summary:
			//		Compute what this.state should be based on state of children
			var states = array.map(this._descendants, function(w){
				return w.get("state") || "";
			});

			return array.indexOf(states, "Error") >= 0 ? "Error" :
				array.indexOf(states, "Incomplete") >= 0 ? "Incomplete" : "";
		},

		disconnectChildren: function(){
			// summary:
			//		Remove connections to monitor changes to children's value, error state, and disabled state,
			//		in order to update Form.value and Form.state.
			array.forEach(this._childConnections || [], lang.hitch(this, "disconnect"));
			array.forEach(this._childWatches || [], function(w){ w.unwatch(); });
		},

		connectChildren: function(/*Boolean*/ inStartup){
			// summary:
			//		Setup connections to monitor changes to children's value, error state, and disabled state,
			//		in order to update Form.value and Form.state.
			//
			//		You can call this function directly, ex. in the event that you
			//		programmatically add a widget to the form *after* the form has been
			//		initialized.

			var _this = this;

			// Remove old connections, if any
			this.disconnectChildren();

			this._descendants = this._getDescendantFormWidgets();

			// (Re)set this.value and this.state.   Send watch() notifications but not on startup.
			var set = inStartup ? function(name, val){ _this[name] = val; } : lang.hitch(this, "_set");
			set("value", this.get("value"));
			set("state", this._getState());

			// Monitor changes to error state and disabled state in order to update
			// Form.state
			var conns = (this._childConnections = []),
				watches = (this._childWatches = []);
			array.forEach(array.filter(this._descendants,
				function(item){ return item.validate; }
			),
			function(widget){
				// We are interested in whenever the widget changes validity state - or
				// whenever the disabled attribute on that widget is changed.
				array.forEach(["state", "disabled"], function(attr){
					watches.push(widget.watch(attr, function(){
						_this.set("state", _this._getState());
					}));
				});
			});

			// And monitor calls to child.onChange so we can update this.value
			var onChange = function(){
				// summary:
				//		Called when child's value or disabled state changes

				// Use setTimeout() to collapse value changes in multiple children into a single
				// update to my value.   Multiple updates will occur on:
				//	1. Form.set()
				//	2. Form.reset()
				//	3. user selecting a radio button (which will de-select another radio button,
				//		 causing two onChange events)
				if(_this._onChangeDelayTimer){
					clearTimeout(_this._onChangeDelayTimer);
				}
				_this._onChangeDelayTimer = setTimeout(function(){
					delete _this._onChangeDelayTimer;
					_this._set("value", _this.get("value"));
				}, 10);
			};
			array.forEach(
				array.filter(this._descendants, function(item){ return item.onChange; } ),
				function(widget){
					// When a child widget's value changes,
					// the efficient thing to do is to just update that one attribute in this.value,
					// but that gets a little complicated when a checkbox is checked/unchecked
					// since this.value["checkboxName"] contains an array of all the checkboxes w/the same name.
					// Doing simple thing for now.
					conns.push(_this.connect(widget, "onChange", onChange));

					// Disabling/enabling a child widget should remove it's value from this.value.
					// Again, this code could be more efficient, doing simple thing for now.
					watches.push(widget.watch("disabled", onChange));
				}
			);
		},

		startup: function(){
			this.inherited(arguments);

			// Initialize value and valid/invalid state tracking.  Needs to be done in startup()
			// so that children are initialized.
			this.connectChildren(true);

			// Make state change call onValidStateChange(), will be removed in 2.0
			this.watch("state", function(attr, oldVal, newVal){ this.onValidStateChange(newVal == ""); });
		},

		destroy: function(){
			this.disconnectChildren();
			this.inherited(arguments);
		}

	});
});

},
'dijit/Menu':function(){
define("dijit/Menu", [
	"require",
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/dom", // dom.byId dom.isDescendant
	"dojo/dom-attr", // domAttr.get domAttr.set domAttr.has domAttr.remove
	"dojo/dom-geometry", // domStyle.getComputedStyle domGeometry.position
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel",
	"dojo/keys",	// keys.F10
	"dojo/_base/lang", // lang.hitch
	"dojo/on",
	"dojo/_base/sniff", // has("ie"), has("quirks")
	"dojo/_base/window", // win.body win.doc.documentElement win.doc.frames win.withGlobal
	"dojo/window", // winUtils.get
	"./popup",
	"./DropDownMenu",
	"dojo/ready"
], function(require, array, declare, event, dom, domAttr, domGeometry, domStyle, kernel, keys, lang, on,
			has, win, winUtils, pm, DropDownMenu, ready){

/*=====
	var DropDownMenu = dijit.DropDownMenu;
=====*/

// module:
//		dijit/Menu
// summary:
//		Includes dijit.Menu widget and base class dijit._MenuBase

// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.Menu", DropDownMenu, {
	// summary:
	//		A context menu you can assign to multiple elements

	constructor: function(){
		this._bindings = [];
	},

	// targetNodeIds: [const] String[]
	//		Array of dom node ids of nodes to attach to.
	//		Fill this with nodeIds upon widget creation and it becomes context menu for those nodes.
	targetNodeIds: [],

	// contextMenuForWindow: [const] Boolean
	//		If true, right clicking anywhere on the window will cause this context menu to open.
	//		If false, must specify targetNodeIds.
	contextMenuForWindow: false,

	// leftClickToOpen: [const] Boolean
	//		If true, menu will open on left click instead of right click, similar to a file menu.
	leftClickToOpen: false,

	// refocus: Boolean
	// 		When this menu closes, re-focus the element which had focus before it was opened.
	refocus: true,

	postCreate: function(){
		if(this.contextMenuForWindow){
			this.bindDomNode(win.body());
		}else{
			// TODO: should have _setTargetNodeIds() method to handle initialization and a possible
			// later set('targetNodeIds', ...) call.  There's also a problem that targetNodeIds[]
			// gets stale after calls to bindDomNode()/unBindDomNode() as it still is just the original list (see #9610)
			array.forEach(this.targetNodeIds, this.bindDomNode, this);
		}
		this.inherited(arguments);
	},

	// thanks burstlib!
	_iframeContentWindow: function(/* HTMLIFrameElement */iframe_el){
		// summary:
		//		Returns the window reference of the passed iframe
		// tags:
		//		private
		return winUtils.get(this._iframeContentDocument(iframe_el)) ||
			// Moz. TODO: is this available when defaultView isn't?
			this._iframeContentDocument(iframe_el)['__parent__'] ||
			(iframe_el.name && win.doc.frames[iframe_el.name]) || null;	//	Window
	},

	_iframeContentDocument: function(/* HTMLIFrameElement */iframe_el){
		// summary:
		//		Returns a reference to the document object inside iframe_el
		// tags:
		//		protected
		return iframe_el.contentDocument // W3
			|| (iframe_el.contentWindow && iframe_el.contentWindow.document) // IE
			|| (iframe_el.name && win.doc.frames[iframe_el.name] && win.doc.frames[iframe_el.name].document)
			|| null;	//	HTMLDocument
	},

	bindDomNode: function(/*String|DomNode*/ node){
		// summary:
		//		Attach menu to given node
		node = dom.byId(node);

		var cn;	// Connect node

		// Support context menus on iframes.  Rather than binding to the iframe itself we need
		// to bind to the <body> node inside the iframe.
		if(node.tagName.toLowerCase() == "iframe"){
			var iframe = node,
				window = this._iframeContentWindow(iframe);
			cn = win.withGlobal(window, win.body);
		}else{

			// To capture these events at the top level, attach to <html>, not <body>.
			// Otherwise right-click context menu just doesn't work.
			cn = (node == win.body() ? win.doc.documentElement : node);
		}


		// "binding" is the object to track our connection to the node (ie, the parameter to bindDomNode())
		var binding = {
			node: node,
			iframe: iframe
		};

		// Save info about binding in _bindings[], and make node itself record index(+1) into
		// _bindings[] array.  Prefix w/_dijitMenu to avoid setting an attribute that may
		// start with a number, which fails on FF/safari.
		domAttr.set(node, "_dijitMenu" + this.id, this._bindings.push(binding));

		// Setup the connections to monitor click etc., unless we are connecting to an iframe which hasn't finished
		// loading yet, in which case we need to wait for the onload event first, and then connect
		// On linux Shift-F10 produces the oncontextmenu event, but on Windows it doesn't, so
		// we need to monitor keyboard events in addition to the oncontextmenu event.
		var doConnects = lang.hitch(this, function(cn){
			return [
				// TODO: when leftClickToOpen is true then shouldn't space/enter key trigger the menu,
				// rather than shift-F10?
				on(cn, this.leftClickToOpen ? "click" : "contextmenu", lang.hitch(this, function(evt){
					// Schedule context menu to be opened unless it's already been scheduled from onkeydown handler
					event.stop(evt);
					this._scheduleOpen(evt.target, iframe, {x: evt.pageX, y: evt.pageY});
				})),
				on(cn, "keydown", lang.hitch(this, function(evt){
					if(evt.shiftKey && evt.keyCode == keys.F10){
						event.stop(evt);
						this._scheduleOpen(evt.target, iframe);	// no coords - open near target node
					}
				}))
			];
		});
		binding.connects = cn ? doConnects(cn) : [];

		if(iframe){
			// Setup handler to [re]bind to the iframe when the contents are initially loaded,
			// and every time the contents change.
			// Need to do this b/c we are actually binding to the iframe's <body> node.
			// Note: can't use connect.connect(), see #9609.

			binding.onloadHandler = lang.hitch(this, function(){
				// want to remove old connections, but IE throws exceptions when trying to
				// access the <body> node because it's already gone, or at least in a state of limbo

				var window = this._iframeContentWindow(iframe);
					cn = win.withGlobal(window, win.body);
				binding.connects = doConnects(cn);
			});
			if(iframe.addEventListener){
				iframe.addEventListener("load", binding.onloadHandler, false);
			}else{
				iframe.attachEvent("onload", binding.onloadHandler);
			}
		}
	},

	unBindDomNode: function(/*String|DomNode*/ nodeName){
		// summary:
		//		Detach menu from given node

		var node;
		try{
			node = dom.byId(nodeName);
		}catch(e){
			// On IE the dom.byId() call will get an exception if the attach point was
			// the <body> node of an <iframe> that has since been reloaded (and thus the
			// <body> node is in a limbo state of destruction.
			return;
		}

		// node["_dijitMenu" + this.id] contains index(+1) into my _bindings[] array
		var attrName = "_dijitMenu" + this.id;
		if(node && domAttr.has(node, attrName)){
			var bid = domAttr.get(node, attrName)-1, b = this._bindings[bid], h;
			while(h = b.connects.pop()){
				h.remove();
			}

			// Remove listener for iframe onload events
			var iframe = b.iframe;
			if(iframe){
				if(iframe.removeEventListener){
					iframe.removeEventListener("load", b.onloadHandler, false);
				}else{
					iframe.detachEvent("onload", b.onloadHandler);
				}
			}

			domAttr.remove(node, attrName);
			delete this._bindings[bid];
		}
	},

	_scheduleOpen: function(/*DomNode?*/ target, /*DomNode?*/ iframe, /*Object?*/ coords){
		// summary:
		//		Set timer to display myself.  Using a timer rather than displaying immediately solves
		//		two problems:
		//
		//		1. IE: without the delay, focus work in "open" causes the system
		//		context menu to appear in spite of stopEvent.
		//
		//		2. Avoid double-shows on linux, where shift-F10 generates an oncontextmenu event
		//		even after a event.stop(e).  (Shift-F10 on windows doesn't generate the
		//		oncontextmenu event.)

		if(!this._openTimer){
			this._openTimer = setTimeout(lang.hitch(this, function(){
				delete this._openTimer;
				this._openMyself({
					target: target,
					iframe: iframe,
					coords: coords
				});
			}), 1);
		}
	},

	_openMyself: function(args){
		// summary:
		//		Internal function for opening myself when the user does a right-click or something similar.
		// args:
		//		This is an Object containing:
		//		* target:
		//			The node that is being clicked
		//		* iframe:
		//			If an <iframe> is being clicked, iframe points to that iframe
		//		* coords:
		//			Put menu at specified x/y position in viewport, or if iframe is
		//			specified, then relative to iframe.
		//
		//		_openMyself() formerly took the event object, and since various code references
		//		evt.target (after connecting to _openMyself()), using an Object for parameters
		//		(so that old code still works).

		var target = args.target,
			iframe = args.iframe,
			coords = args.coords;

		// Get coordinates to open menu, either at specified (mouse) position or (if triggered via keyboard)
		// then near the node the menu is assigned to.
		if(coords){
			if(iframe){
				// Specified coordinates are on <body> node of an <iframe>, convert to match main document
				var ifc = domGeometry.position(iframe, true),
					window = this._iframeContentWindow(iframe),
					scroll = win.withGlobal(window, "_docScroll", dojo);

				var cs = domStyle.getComputedStyle(iframe),
					tp = domStyle.toPixelValue,
					left = (has("ie") && has("quirks") ? 0 : tp(iframe, cs.paddingLeft)) + (has("ie") && has("quirks") ? tp(iframe, cs.borderLeftWidth) : 0),
					top = (has("ie") && has("quirks") ? 0 : tp(iframe, cs.paddingTop)) + (has("ie") && has("quirks") ? tp(iframe, cs.borderTopWidth) : 0);

				coords.x += ifc.x + left - scroll.x;
				coords.y += ifc.y + top - scroll.y;
			}
		}else{
			coords = domGeometry.position(target, true);
			coords.x += 10;
			coords.y += 10;
		}

		var self=this;
		var prevFocusNode = this._focusManager.get("prevNode");
		var curFocusNode = this._focusManager.get("curNode");
		var savedFocusNode = !curFocusNode || (dom.isDescendant(curFocusNode, this.domNode)) ? prevFocusNode : curFocusNode;

		function closeAndRestoreFocus(){
			// user has clicked on a menu or popup
			if(self.refocus && savedFocusNode){
				savedFocusNode.focus();
			}
			pm.close(self);
		}
		pm.open({
			popup: this,
			x: coords.x,
			y: coords.y,
			onExecute: closeAndRestoreFocus,
			onCancel: closeAndRestoreFocus,
			orient: this.isLeftToRight() ? 'L' : 'R'
		});
		this.focus();

		this._onBlur = function(){
			this.inherited('_onBlur', arguments);
			// Usually the parent closes the child widget but if this is a context
			// menu then there is no parent
			pm.close(this);
			// don't try to restore focus; user has clicked another part of the screen
			// and set focus there
		};
	},

	uninitialize: function(){
 		array.forEach(this._bindings, function(b){ if(b){ this.unBindDomNode(b.node); } }, this);
 		this.inherited(arguments);
	}
});

});

},
'dijit/form/_CheckBoxMixin':function(){
define("dijit/form/_CheckBoxMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/event" // event.stop
], function(declare, domAttr, event){

	// module:
	//		dijit/form/_CheckBoxMixin
	// summary:
	// 		Mixin to provide widget functionality corresponding to an HTML checkbox

	return declare("dijit.form._CheckBoxMixin", null, {
		// summary:
		// 		Mixin to provide widget functionality corresponding to an HTML checkbox
		//
		// description:
		//		User interacts with real html inputs.
		//		On onclick (which occurs by mouse click, space-bar, or
		//		using the arrow keys to switch the selected radio button),
		//		we update the state of the checkbox/radio.
		//

		// type: [private] String
		//		type attribute on <input> node.
		//		Overrides `dijit.form.Button.type`.  Users should not change this value.
		type: "checkbox",

		// value: String
		//		As an initialization parameter, equivalent to value field on normal checkbox
		//		(if checked, the value is passed as the value when form is submitted).
		value: "on",

		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,
		
		// aria-pressed for toggle buttons, and aria-checked for checkboxes
		_aria_attr: "aria-checked",

		_setReadOnlyAttr: function(/*Boolean*/ value){
			this._set("readOnly", value);
			domAttr.set(this.focusNode, 'readOnly', value);
			this.focusNode.setAttribute("aria-readonly", value);
		},

		// Override dijit.form.Button._setLabelAttr() since we don't even have a containerNode.
		// Normally users won't try to set label, except when CheckBox or RadioButton is the child of a dojox.layout.TabContainer
		_setLabelAttr: undefined,

		postMixInProperties: function(){
			if(this.value == ""){
				this.value = "on";
			}
			this.inherited(arguments);
		},

		reset: function(){
			this.inherited(arguments);
			// Handle unlikely event that the <input type=checkbox> value attribute has changed
			this._set("value", this.params.value || "on");
			domAttr.set(this.focusNode, 'value', this.value);
		},

		_onClick: function(/*Event*/ e){
			// summary:
			//		Internal function to handle click actions - need to check
			//		readOnly, since button no longer does that check.
			if(this.readOnly){
				event.stop(e);
				return false;
			}
			return this.inherited(arguments);
		}
	});
});

},
'dijit/layout/ContentPane':function(){
define("dijit/layout/ContentPane", [
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.mixin lang.delegate lang.hitch lang.isFunction lang.isObject
	"../_Widget",
	"./_ContentPaneResizeMixin",
	"dojo/string", // string.substitute
	"dojo/html", // html._ContentSetter html._emptyNode
	"dojo/i18n!../nls/loading",
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred", // Deferred
	"dojo/dom", // dom.byId
	"dojo/dom-attr", // domAttr.attr
	"dojo/_base/window", // win.body win.doc.createDocumentFragment
	"dojo/_base/xhr", // xhr.get
	"dojo/i18n" // i18n.getLocalization
], function(kernel, lang, _Widget, _ContentPaneResizeMixin, string, html, nlsLoading,
	array, declare, Deferred, dom, domAttr, win, xhr, i18n){

/*=====
	var _Widget = dijit._Widget;
	var _ContentPaneResizeMixin = dijit.layout._ContentPaneResizeMixin;
=====*/

// module:
//		dijit/layout/ContentPane
// summary:
//		A widget containing an HTML fragment, specified inline
//		or by uri.  Fragment may include widgets.


return declare("dijit.layout.ContentPane", [_Widget, _ContentPaneResizeMixin], {
	// summary:
	//		A widget containing an HTML fragment, specified inline
	//		or by uri.  Fragment may include widgets.
	//
	// description:
	//		This widget embeds a document fragment in the page, specified
	//		either by uri, javascript generated markup or DOM reference.
	//		Any widgets within this content are instantiated and managed,
	//		but laid out according to the HTML structure.  Unlike IFRAME,
	//		ContentPane embeds a document fragment as would be found
	//		inside the BODY tag of a full HTML document.  It should not
	//		contain the HTML, HEAD, or BODY tags.
	//		For more advanced functionality with scripts and
	//		stylesheets, see dojox.layout.ContentPane.  This widget may be
	//		used stand alone or as a base class for other widgets.
	//		ContentPane is useful as a child of other layout containers
	//		such as BorderContainer or TabContainer, but note that those
	//		widgets can contain any widget as a child.
	//
	// example:
	//		Some quick samples:
	//		To change the innerHTML: cp.set('content', '<b>new content</b>')
	//
	//		Or you can send it a NodeList: cp.set('content', dojo.query('div [class=selected]', userSelection))
	//
	//		To do an ajax update: cp.set('href', url)

	// href: String
	//		The href of the content that displays now.
	//		Set this at construction if you want to load data externally when the
	//		pane is shown.  (Set preload=true to load it immediately.)
	//		Changing href after creation doesn't have any effect; Use set('href', ...);
	href: "",

	// content: String || DomNode || NodeList || dijit._Widget
	//		The innerHTML of the ContentPane.
	//		Note that the initialization parameter / argument to set("content", ...)
	//		can be a String, DomNode, Nodelist, or _Widget.
	content: "",

	// extractContent: Boolean
	//		Extract visible content from inside of <body> .... </body>.
	//		I.e., strip <html> and <head> (and it's contents) from the href
	extractContent: false,

	// parseOnLoad: Boolean
	//		Parse content and create the widgets, if any.
	parseOnLoad: true,

	// parserScope: String
	//		Flag passed to parser.  Root for attribute names to search for.   If scopeName is dojo,
	//		will search for data-dojo-type (or dojoType).  For backwards compatibility
	//		reasons defaults to dojo._scopeName (which is "dojo" except when
	//		multi-version support is used, when it will be something like dojo16, dojo20, etc.)
	parserScope: kernel._scopeName,

	// preventCache: Boolean
	//		Prevent caching of data from href's by appending a timestamp to the href.
	preventCache: false,

	// preload: Boolean
	//		Force load of data on initialization even if pane is hidden.
	preload: false,

	// refreshOnShow: Boolean
	//		Refresh (re-download) content when pane goes from hidden to shown
	refreshOnShow: false,

	// loadingMessage: String
	//		Message that shows while downloading
	loadingMessage: "<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",

	// errorMessage: String
	//		Message that shows if an error occurs
	errorMessage: "<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",

	// isLoaded: [readonly] Boolean
	//		True if the ContentPane has data in it, either specified
	//		during initialization (via href or inline content), or set
	//		via set('content', ...) / set('href', ...)
	//
	//		False if it doesn't have any content, or if ContentPane is
	//		still in the process of downloading href.
	isLoaded: false,

	baseClass: "dijitContentPane",

	/*======
	// ioMethod: dojo.xhrGet|dojo.xhrPost
	//		Function that should grab the content specified via href.
	ioMethod: dojo.xhrGet,
	======*/

	// ioArgs: Object
	//		Parameters to pass to xhrGet() request, for example:
	// |	<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props="href: './bar', ioArgs: {timeout: 500}">
	ioArgs: {},

	// onLoadDeferred: [readonly] dojo.Deferred
	//		This is the `dojo.Deferred` returned by set('href', ...) and refresh().
	//		Calling onLoadDeferred.addCallback() or addErrback() registers your
	//		callback to be called only once, when the prior set('href', ...) call or
	//		the initial href parameter to the constructor finishes loading.
	//
	//		This is different than an onLoad() handler which gets called any time any href
	//		or content is loaded.
	onLoadDeferred: null,

	// Cancel _WidgetBase's _setTitleAttr because we don't want the title attribute (used to specify
	// tab labels) to be copied to ContentPane.domNode... otherwise a tooltip shows up over the
	// entire pane.
	_setTitleAttr: null,

	// Flag to parser that I'll parse my contents, so it shouldn't.
	stopParser: true,

	// template: [private] Boolean
	//		Flag from the parser that this ContentPane is inside a template
	//		so the contents are pre-parsed.
	// (TODO: this declaration can be commented out in 2.0)
	template: false,

	create: function(params, srcNodeRef){
		// Convert a srcNodeRef argument into a content parameter, so that the original contents are
		// processed in the same way as contents set via set("content", ...), calling the parser etc.
		// Avoid modifying original params object since that breaks NodeList instantiation, see #11906.
		if((!params || !params.template) && srcNodeRef && !("href" in params) && !("content" in params)){
			var df = win.doc.createDocumentFragment();
			srcNodeRef = dom.byId(srcNodeRef);
			while(srcNodeRef.firstChild){
				df.appendChild(srcNodeRef.firstChild);
			}
			params = lang.delegate(params, {content: df});
		}
		this.inherited(arguments, [params, srcNodeRef]);
	},

	postMixInProperties: function(){
		this.inherited(arguments);
		var messages = i18n.getLocalization("dijit", "loading", this.lang);
		this.loadingMessage = string.substitute(this.loadingMessage, messages);
		this.errorMessage = string.substitute(this.errorMessage, messages);
	},

	buildRendering: function(){
		this.inherited(arguments);

		// Since we have no template we need to set this.containerNode ourselves, to make getChildren() work.
		// For subclasses of ContentPane that do have a template, does nothing.
		if(!this.containerNode){
			this.containerNode = this.domNode;
		}

		// remove the title attribute so it doesn't show up when hovering
		// over a node  (TODO: remove in 2.0, no longer needed after #11490)
		this.domNode.title = "";

		if(!domAttr.get(this.domNode,"role")){
			this.domNode.setAttribute("role", "group");
		}
	},

	startup: function(){
		// summary:
		//		Call startup() on all children including non _Widget ones like dojo.dnd.Source objects

		// This starts all the widgets
		this.inherited(arguments);

		// And this catches stuff like dojo.dnd.Source
		if(this._contentSetter){
			array.forEach(this._contentSetter.parseResults, function(obj){
				if(!obj._started && !obj._destroyed && lang.isFunction(obj.startup)){
					obj.startup();
					obj._started = true;
				}
			}, this);
		}
	},

	setHref: function(/*String|Uri*/ href){
		// summary:
		//		Deprecated.   Use set('href', ...) instead.
		kernel.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.", "", "2.0");
		return this.set("href", href);
	},
	_setHrefAttr: function(/*String|Uri*/ href){
		// summary:
		//		Hook so set("href", ...) works.
		// description:
		//		Reset the (external defined) content of this pane and replace with new url
		//		Note: It delays the download until widget is shown if preload is false.
		//	href:
		//		url to the page you want to get, must be within the same domain as your mainpage

		// Cancel any in-flight requests (a set('href', ...) will cancel any in-flight set('href', ...))
		this.cancel();

		this.onLoadDeferred = new Deferred(lang.hitch(this, "cancel"));
		this.onLoadDeferred.addCallback(lang.hitch(this, "onLoad"));

		this._set("href", href);

		// _setHrefAttr() is called during creation and by the user, after creation.
		// Assuming preload == false, only in the second case do we actually load the URL;
		// otherwise it's done in startup(), and only if this widget is shown.
		if(this.preload || (this._created && this._isShown())){
			this._load();
		}else{
			// Set flag to indicate that href needs to be loaded the next time the
			// ContentPane is made visible
			this._hrefChanged = true;
		}

		return this.onLoadDeferred;		// Deferred
	},

	setContent: function(/*String|DomNode|Nodelist*/data){
		// summary:
		//		Deprecated.   Use set('content', ...) instead.
		kernel.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.", "", "2.0");
		this.set("content", data);
	},
	_setContentAttr: function(/*String|DomNode|Nodelist*/data){
		// summary:
		//		Hook to make set("content", ...) work.
		//		Replaces old content with data content, include style classes from old content
		//	data:
		//		the new Content may be String, DomNode or NodeList
		//
		//		if data is a NodeList (or an array of nodes) nodes are copied
		//		so you can import nodes from another document implicitly

		// clear href so we can't run refresh and clear content
		// refresh should only work if we downloaded the content
		this._set("href", "");

		// Cancel any in-flight requests (a set('content', ...) will cancel any in-flight set('href', ...))
		this.cancel();

		// Even though user is just setting content directly, still need to define an onLoadDeferred
		// because the _onLoadHandler() handler is still getting called from setContent()
		this.onLoadDeferred = new Deferred(lang.hitch(this, "cancel"));
		if(this._created){
			// For back-compat reasons, call onLoad() for set('content', ...)
			// calls but not for content specified in srcNodeRef (ie: <div data-dojo-type=ContentPane>...</div>)
			// or as initialization parameter (ie: new ContentPane({content: ...})
			this.onLoadDeferred.addCallback(lang.hitch(this, "onLoad"));
		}

		this._setContent(data || "");

		this._isDownloaded = false; // mark that content is from a set('content') not a set('href')

		return this.onLoadDeferred; 	// Deferred
	},
	_getContentAttr: function(){
		// summary:
		//		Hook to make get("content") work
		return this.containerNode.innerHTML;
	},

	cancel: function(){
		// summary:
		//		Cancels an in-flight download of content
		if(this._xhrDfd && (this._xhrDfd.fired == -1)){
			this._xhrDfd.cancel();
		}
		delete this._xhrDfd; // garbage collect

		this.onLoadDeferred = null;
	},

	uninitialize: function(){
		if(this._beingDestroyed){
			this.cancel();
		}
		this.inherited(arguments);
	},

	destroyRecursive: function(/*Boolean*/ preserveDom){
		// summary:
		//		Destroy the ContentPane and its contents

		// if we have multiple controllers destroying us, bail after the first
		if(this._beingDestroyed){
			return;
		}
		this.inherited(arguments);
	},

	_onShow: function(){
		// summary:
		//		Called when the ContentPane is made visible
		// description:
		//		For a plain ContentPane, this is called on initialization, from startup().
		//		If the ContentPane is a hidden pane of a TabContainer etc., then it's
		//		called whenever the pane is made visible.
		//
		//		Does necessary processing, including href download and layout/resize of
		//		child widget(s)

		this.inherited(arguments);

		if(this.href){
			if(!this._xhrDfd && // if there's an href that isn't already being loaded
				(!this.isLoaded || this._hrefChanged || this.refreshOnShow)
			){
				return this.refresh();	// If child has an href, promise that fires when the load is complete
			}
		}
	},

	refresh: function(){
		// summary:
		//		[Re]download contents of href and display
		// description:
		//		1. cancels any currently in-flight requests
		//		2. posts "loading..." message
		//		3. sends XHR to download new data

		// Cancel possible prior in-flight request
		this.cancel();

		this.onLoadDeferred = new Deferred(lang.hitch(this, "cancel"));
		this.onLoadDeferred.addCallback(lang.hitch(this, "onLoad"));
		this._load();
		return this.onLoadDeferred;		// If child has an href, promise that fires when refresh is complete
	},

	_load: function(){
		// summary:
		//		Load/reload the href specified in this.href

		// display loading message
		this._setContent(this.onDownloadStart(), true);

		var self = this;
		var getArgs = {
			preventCache: (this.preventCache || this.refreshOnShow),
			url: this.href,
			handleAs: "text"
		};
		if(lang.isObject(this.ioArgs)){
			lang.mixin(getArgs, this.ioArgs);
		}

		var hand = (this._xhrDfd = (this.ioMethod || xhr.get)(getArgs));

		hand.addCallback(function(html){
			try{
				self._isDownloaded = true;
				self._setContent(html, false);
				self.onDownloadEnd();
			}catch(err){
				self._onError('Content', err); // onContentError
			}
			delete self._xhrDfd;
			return html;
		});

		hand.addErrback(function(err){
			if(!hand.canceled){
				// show error message in the pane
				self._onError('Download', err); // onDownloadError
			}
			delete self._xhrDfd;
			return err;
		});

		// Remove flag saying that a load is needed
		delete this._hrefChanged;
	},

	_onLoadHandler: function(data){
		// summary:
		//		This is called whenever new content is being loaded
		this._set("isLoaded", true);
		try{
			this.onLoadDeferred.callback(data);
		}catch(e){
			console.error('Error '+this.widgetId+' running custom onLoad code: ' + e.message);
		}
	},

	_onUnloadHandler: function(){
		// summary:
		//		This is called whenever the content is being unloaded
		this._set("isLoaded", false);
		try{
			this.onUnload();
		}catch(e){
			console.error('Error '+this.widgetId+' running custom onUnload code: ' + e.message);
		}
	},

	destroyDescendants: function(/*Boolean*/ preserveDom){
		// summary:
		//		Destroy all the widgets inside the ContentPane and empty containerNode

		// Make sure we call onUnload (but only when the ContentPane has real content)
		if(this.isLoaded){
			this._onUnloadHandler();
		}

		// Even if this.isLoaded == false there might still be a "Loading..." message
		// to erase, so continue...

		// For historical reasons we need to delete all widgets under this.containerNode,
		// even ones that the user has created manually.
		var setter = this._contentSetter;
		array.forEach(this.getChildren(), function(widget){
			if(widget.destroyRecursive){
				widget.destroyRecursive(preserveDom);
			}
		});
		if(setter){
			// Most of the widgets in setter.parseResults have already been destroyed, but
			// things like Menu that have been moved to <body> haven't yet
			array.forEach(setter.parseResults, function(widget){
				if(widget.destroyRecursive && widget.domNode && widget.domNode.parentNode == win.body()){
					widget.destroyRecursive(preserveDom);
				}
			});
			delete setter.parseResults;
		}

		// And then clear away all the DOM nodes
		if(!preserveDom){
			html._emptyNode(this.containerNode);
		}

		// Delete any state information we have about current contents
		delete this._singleChild;
	},

	_setContent: function(/*String|DocumentFragment*/ cont, /*Boolean*/ isFakeContent){
		// summary:
		//		Insert the content into the container node

		// first get rid of child widgets
		this.destroyDescendants();

		// html.set will take care of the rest of the details
		// we provide an override for the error handling to ensure the widget gets the errors
		// configure the setter instance with only the relevant widget instance properties
		// NOTE: unless we hook into attr, or provide property setters for each property,
		// we need to re-configure the ContentSetter with each use
		var setter = this._contentSetter;
		if(! (setter && setter instanceof html._ContentSetter)){
			setter = this._contentSetter = new html._ContentSetter({
				node: this.containerNode,
				_onError: lang.hitch(this, this._onError),
				onContentError: lang.hitch(this, function(e){
					// fires if a domfault occurs when we are appending this.errorMessage
					// like for instance if domNode is a UL and we try append a DIV
					var errMess = this.onContentError(e);
					try{
						this.containerNode.innerHTML = errMess;
					}catch(e){
						console.error('Fatal '+this.id+' could not change content due to '+e.message, e);
					}
				})/*,
				_onError */
			});
		}

		var setterParams = lang.mixin({
			cleanContent: this.cleanContent,
			extractContent: this.extractContent,
			parseContent: !cont.domNode && this.parseOnLoad,
			parserScope: this.parserScope,
			startup: false,
			dir: this.dir,
			lang: this.lang,
			textDir: this.textDir
		}, this._contentSetterParams || {});

		setter.set( (lang.isObject(cont) && cont.domNode) ? cont.domNode : cont, setterParams );

		// setter params must be pulled afresh from the ContentPane each time
		delete this._contentSetterParams;

		if(this.doLayout){
			this._checkIfSingleChild();
		}

		if(!isFakeContent){
			if(this._started){
				// Startup each top level child widget (and they will start their children, recursively)
				delete this._started;
				this.startup();

				// Call resize() on each of my child layout widgets,
				// or resize() on my single child layout widget...
				// either now (if I'm currently visible) or when I become visible
				this._scheduleLayout();
			}

			this._onLoadHandler(cont);
		}
	},

	_onError: function(type, err, consoleText){
		this.onLoadDeferred.errback(err);

		// shows user the string that is returned by on[type]Error
		// override on[type]Error and return your own string to customize
		var errText = this['on' + type + 'Error'].call(this, err);
		if(consoleText){
			console.error(consoleText, err);
		}else if(errText){// a empty string won't change current content
			this._setContent(errText, true);
		}
	},

	// EVENT's, should be overide-able
	onLoad: function(/*===== data =====*/){
		// summary:
		//		Event hook, is called after everything is loaded and widgetified
		// tags:
		//		callback
	},

	onUnload: function(){
		// summary:
		//		Event hook, is called before old content is cleared
		// tags:
		//		callback
	},

	onDownloadStart: function(){
		// summary:
		//		Called before download starts.
		// description:
		//		The string returned by this function will be the html
		//		that tells the user we are loading something.
		//		Override with your own function if you want to change text.
		// tags:
		//		extension
		return this.loadingMessage;
	},

	onContentError: function(/*Error*/ /*===== error =====*/){
		// summary:
		//		Called on DOM faults, require faults etc. in content.
		//
		//		In order to display an error message in the pane, return
		//		the error message from this method, as an HTML string.
		//
		//		By default (if this method is not overriden), it returns
		//		nothing, so the error message is just printed to the console.
		// tags:
		//		extension
	},

	onDownloadError: function(/*Error*/ /*===== error =====*/){
		// summary:
		//		Called when download error occurs.
		//
		//		In order to display an error message in the pane, return
		//		the error message from this method, as an HTML string.
		//
		//		Default behavior (if this method is not overriden) is to display
		//		the error message inside the pane.
		// tags:
		//		extension
		return this.errorMessage;
	},

	onDownloadEnd: function(){
		// summary:
		//		Called when download is finished.
		// tags:
		//		callback
	}
});

});

},
'dijit/_KeyNavContainer':function(){
define("dijit/_KeyNavContainer", [
	"dojo/_base/kernel", // kernel.deprecated
	"./_Container",
	"./_FocusMixin",
	"dojo/_base/array", // array.forEach
	"dojo/keys", // keys.END keys.HOME
	"dojo/_base/declare", // declare
	"dojo/_base/event", // event.stop
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/lang" // lang.hitch
], function(kernel, _Container, _FocusMixin, array, keys, declare, event, domAttr, lang){

/*=====
	var _FocusMixin = dijit._FocusMixin;
	var _Container = dijit._Container;
=====*/

	// module:
	//		dijit/_KeyNavContainer
	// summary:
	//		A _Container with keyboard navigation of its children.

	return declare("dijit._KeyNavContainer", [_FocusMixin, _Container], {

		// summary:
		//		A _Container with keyboard navigation of its children.
		// description:
		//		To use this mixin, call connectKeyNavHandlers() in
		//		postCreate().
		//		It provides normalized keyboard and focusing code for Container
		//		widgets.

/*=====
		// focusedChild: [protected] Widget
		//		The currently focused child widget, or null if there isn't one
		focusedChild: null,
=====*/

		// tabIndex: Integer
		//		Tab index of the container; same as HTML tabIndex attribute.
		//		Note then when user tabs into the container, focus is immediately
		//		moved to the first item in the container.
		tabIndex: "0",

		connectKeyNavHandlers: function(/*keys[]*/ prevKeyCodes, /*keys[]*/ nextKeyCodes){
			// summary:
			//		Call in postCreate() to attach the keyboard handlers
			//		to the container.
			// preKeyCodes: keys[]
			//		Key codes for navigating to the previous child.
			// nextKeyCodes: keys[]
			//		Key codes for navigating to the next child.
			// tags:
			//		protected

			// TODO: call this automatically from my own postCreate()

			var keyCodes = (this._keyNavCodes = {});
			var prev = lang.hitch(this, "focusPrev");
			var next = lang.hitch(this, "focusNext");
			array.forEach(prevKeyCodes, function(code){ keyCodes[code] = prev; });
			array.forEach(nextKeyCodes, function(code){ keyCodes[code] = next; });
			keyCodes[keys.HOME] = lang.hitch(this, "focusFirstChild");
			keyCodes[keys.END] = lang.hitch(this, "focusLastChild");
			this.connect(this.domNode, "onkeypress", "_onContainerKeypress");
			this.connect(this.domNode, "onfocus", "_onContainerFocus");
		},

		startupKeyNavChildren: function(){
			kernel.deprecated("startupKeyNavChildren() call no longer needed", "", "2.0");
		},

		startup: function(){
			this.inherited(arguments);
			array.forEach(this.getChildren(), lang.hitch(this, "_startupChild"));
		},

		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			this.inherited(arguments);
			this._startupChild(widget);
		},

		focus: function(){
			// summary:
			//		Default focus() implementation: focus the first child.
			this.focusFirstChild();
		},

		focusFirstChild: function(){
			// summary:
			//		Focus the first focusable child in the container.
			// tags:
			//		protected
			this.focusChild(this._getFirstFocusableChild());
		},

		focusLastChild: function(){
			// summary:
			//		Focus the last focusable child in the container.
			// tags:
			//		protected
			this.focusChild(this._getLastFocusableChild());
		},

		focusNext: function(){
			// summary:
			//		Focus the next widget
			// tags:
			//		protected
			this.focusChild(this._getNextFocusableChild(this.focusedChild, 1));
		},

		focusPrev: function(){
			// summary:
			//		Focus the last focusable node in the previous widget
			//		(ex: go to the ComboButton icon section rather than button section)
			// tags:
			//		protected
			this.focusChild(this._getNextFocusableChild(this.focusedChild, -1), true);
		},

		focusChild: function(/*dijit._Widget*/ widget, /*Boolean*/ last){
			// summary:
			//		Focus specified child widget.
			// widget:
			//		Reference to container's child widget
			// last:
			//		If true and if widget has multiple focusable nodes, focus the
			//		last one instead of the first one
			// tags:
			//		protected

			if(!widget){ return; }

			if(this.focusedChild && widget !== this.focusedChild){
				this._onChildBlur(this.focusedChild);	// used by _MenuBase
			}
			widget.set("tabIndex", this.tabIndex);	// for IE focus outline to appear, must set tabIndex before focs
			widget.focus(last ? "end" : "start");
			this._set("focusedChild", widget);
		},

		_startupChild: function(/*dijit._Widget*/ widget){
			// summary:
			//		Setup for each child widget
			// description:
			//		Sets tabIndex=-1 on each child, so that the tab key will
			//		leave the container rather than visiting each child.
			// tags:
			//		private

			widget.set("tabIndex", "-1");

			this.connect(widget, "_onFocus", function(){
				// Set valid tabIndex so tabbing away from widget goes to right place, see #10272
				widget.set("tabIndex", this.tabIndex);
			});
			this.connect(widget, "_onBlur", function(){
				widget.set("tabIndex", "-1");
			});
		},

		_onContainerFocus: function(evt){
			// summary:
			//		Handler for when the container gets focus
			// description:
			//		Initially the container itself has a tabIndex, but when it gets
			//		focus, switch focus to first child...
			// tags:
			//		private

			// Note that we can't use _onFocus() because switching focus from the
			// _onFocus() handler confuses the focus.js code
			// (because it causes _onFocusNode() to be called recursively)
			// Also, _onFocus() would fire when focus went directly to a child widget due to mouse click.

			// Ignore spurious focus events:
			//	1. focus on a child widget bubbles on FF
			//	2. on IE, clicking the scrollbar of a select dropdown moves focus from the focused child item to me
			if(evt.target !== this.domNode || this.focusedChild){ return; }

			this.focusFirstChild();

			// and then set the container's tabIndex to -1,
			// (don't remove as that breaks Safari 4)
			// so that tab or shift-tab will go to the fields after/before
			// the container, rather than the container itself
			domAttr.set(this.domNode, "tabIndex", "-1");
		},

		_onBlur: function(evt){
			// When focus is moved away the container, and its descendant (popup) widgets,
			// then restore the container's tabIndex so that user can tab to it again.
			// Note that using _onBlur() so that this doesn't happen when focus is shifted
			// to one of my child widgets (typically a popup)
			if(this.tabIndex){
				domAttr.set(this.domNode, "tabIndex", this.tabIndex);
			}
			this.focusedChild = null;
			this.inherited(arguments);
		},

		_onContainerKeypress: function(evt){
			// summary:
			//		When a key is pressed, if it's an arrow key etc. then
			//		it's handled here.
			// tags:
			//		private
			if(evt.ctrlKey || evt.altKey){ return; }
			var func = this._keyNavCodes[evt.charOrCode];
			if(func){
				func();
				event.stop(evt);
			}
		},

		_onChildBlur: function(/*dijit._Widget*/ /*===== widget =====*/){
			// summary:
			//		Called when focus leaves a child widget to go
			//		to a sibling widget.
			//		Used by MenuBase.js (TODO: move code there)
			// tags:
			//		protected
		},

		_getFirstFocusableChild: function(){
			// summary:
			//		Returns first child that can be focused
			return this._getNextFocusableChild(null, 1);	// dijit._Widget
		},

		_getLastFocusableChild: function(){
			// summary:
			//		Returns last child that can be focused
			return this._getNextFocusableChild(null, -1);	// dijit._Widget
		},

		_getNextFocusableChild: function(child, dir){
			// summary:
			//		Returns the next or previous focusable child, compared
			//		to "child"
			// child: Widget
			//		The current widget
			// dir: Integer
			//		* 1 = after
			//		* -1 = before
			if(child){
				child = this._getSiblingOfChild(child, dir);
			}
			var children = this.getChildren();
			for(var i=0; i < children.length; i++){
				if(!child){
					child = children[(dir>0) ? 0 : (children.length-1)];
				}
				if(child.isFocusable()){
					return child;	// dijit._Widget
				}
				child = this._getSiblingOfChild(child, dir);
			}
			// no focusable child found
			return null;	// dijit._Widget
		}
	});
});

},
'dijit/layout/utils':function(){
define("dijit/layout/utils", [
	"dojo/_base/array", // array.filter array.forEach
	"dojo/dom-class", // domClass.add domClass.remove
	"dojo/dom-geometry", // domGeometry.marginBox
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/lang", // lang.mixin
	".."	// for exporting symbols to dijit, remove in 2.0
], function(array, domClass, domGeometry, domStyle, lang, dijit){

	// module:
	//		dijit/layout/utils
	// summary:
	//		marginBox2contentBox() and layoutChildren()

	var layout = lang.getObject("layout", true, dijit);
	/*===== layout = dijit.layout =====*/

	layout.marginBox2contentBox = function(/*DomNode*/ node, /*Object*/ mb){
		// summary:
		//		Given the margin-box size of a node, return its content box size.
		//		Functions like domGeometry.contentBox() but is more reliable since it doesn't have
		//		to wait for the browser to compute sizes.
		var cs = domStyle.getComputedStyle(node);
		var me = domGeometry.getMarginExtents(node, cs);
		var pb = domGeometry.getPadBorderExtents(node, cs);
		return {
			l: domStyle.toPixelValue(node, cs.paddingLeft),
			t: domStyle.toPixelValue(node, cs.paddingTop),
			w: mb.w - (me.w + pb.w),
			h: mb.h - (me.h + pb.h)
		};
	};

	function capitalize(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}

	function size(widget, dim){
		// size the child
		var newSize = widget.resize ? widget.resize(dim) : domGeometry.setMarginBox(widget.domNode, dim);

		// record child's size
		if(newSize){
			// if the child returned it's new size then use that
			lang.mixin(widget, newSize);
		}else{
			// otherwise, call getMarginBox(), but favor our own numbers when we have them.
			// the browser lies sometimes
			lang.mixin(widget, domGeometry.getMarginBox(widget.domNode));
			lang.mixin(widget, dim);
		}
	}

	layout.layoutChildren = function(/*DomNode*/ container, /*Object*/ dim, /*Widget[]*/ children,
			/*String?*/ changedRegionId, /*Number?*/ changedRegionSize){
		// summary:
		//		Layout a bunch of child dom nodes within a parent dom node
		// container:
		//		parent node
		// dim:
		//		{l, t, w, h} object specifying dimensions of container into which to place children
		// children:
		//		an array of Widgets or at least objects containing:
		//			* domNode: pointer to DOM node to position
		//			* region or layoutAlign: position to place DOM node
		//			* resize(): (optional) method to set size of node
		//			* id: (optional) Id of widgets, referenced from resize object, below.
		// changedRegionId:
		//		If specified, the slider for the region with the specified id has been dragged, and thus
		//		the region's height or width should be adjusted according to changedRegionSize
		// changedRegionSize:
		//		See changedRegionId.

		// copy dim because we are going to modify it
		dim = lang.mixin({}, dim);

		domClass.add(container, "dijitLayoutContainer");

		// Move "client" elements to the end of the array for layout.  a11y dictates that the author
		// needs to be able to put them in the document in tab-order, but this algorithm requires that
		// client be last.    TODO: move these lines to LayoutContainer?   Unneeded other places I think.
		children = array.filter(children, function(item){ return item.region != "center" && item.layoutAlign != "client"; })
			.concat(array.filter(children, function(item){ return item.region == "center" || item.layoutAlign == "client"; }));

		// set positions/sizes
		array.forEach(children, function(child){
			var elm = child.domNode,
				pos = (child.region || child.layoutAlign);
			if(!pos){
				throw new Error("No region setting for " + child.id)
			}

			// set elem to upper left corner of unused space; may move it later
			var elmStyle = elm.style;
			elmStyle.left = dim.l+"px";
			elmStyle.top = dim.t+"px";
			elmStyle.position = "absolute";

			domClass.add(elm, "dijitAlign" + capitalize(pos));

			// Size adjustments to make to this child widget
			var sizeSetting = {};

			// Check for optional size adjustment due to splitter drag (height adjustment for top/bottom align
			// panes and width adjustment for left/right align panes.
			if(changedRegionId && changedRegionId == child.id){
				sizeSetting[child.region == "top" || child.region == "bottom" ? "h" : "w"] = changedRegionSize;
			}

			// set size && adjust record of remaining space.
			// note that setting the width of a <div> may affect its height.
			if(pos == "top" || pos == "bottom"){
				sizeSetting.w = dim.w;
				size(child, sizeSetting);
				dim.h -= child.h;
				if(pos == "top"){
					dim.t += child.h;
				}else{
					elmStyle.top = dim.t + dim.h + "px";
				}
			}else if(pos == "left" || pos == "right"){
				sizeSetting.h = dim.h;
				size(child, sizeSetting);
				dim.w -= child.w;
				if(pos == "left"){
					dim.l += child.w;
				}else{
					elmStyle.left = dim.l + dim.w + "px";
				}
			}else if(pos == "client" || pos == "center"){
				size(child, dim);
			}
		});
	};


	return {
		marginBox2contentBox: layout.marginBox2contentBox,
		layoutChildren: layout.layoutChildren
	};
});

},
'dijit/_Contained':function(){
define("dijit/_Contained", [
	"dojo/_base/declare", // declare
	"./registry"	// registry.getEnclosingWidget(), registry.byNode()
], function(declare, registry){

	// module:
	//		dijit/_Contained
	// summary:
	//		Mixin for widgets that are children of a container widget

	return declare("dijit._Contained", null, {
		// summary:
		//		Mixin for widgets that are children of a container widget
		//
		// example:
		// | 	// make a basic custom widget that knows about it's parents
		// |	declare("my.customClass",[dijit._Widget,dijit._Contained],{});

		_getSibling: function(/*String*/ which){
			// summary:
			//      Returns next or previous sibling
			// which:
			//      Either "next" or "previous"
			// tags:
			//      private
			var node = this.domNode;
			do{
				node = node[which+"Sibling"];
			}while(node && node.nodeType != 1);
			return node && registry.byNode(node);	// dijit._Widget
		},

		getPreviousSibling: function(){
			// summary:
			//		Returns null if this is the first child of the parent,
			//		otherwise returns the next element sibling to the "left".

			return this._getSibling("previous"); // dijit._Widget
		},

		getNextSibling: function(){
			// summary:
			//		Returns null if this is the last child of the parent,
			//		otherwise returns the next element sibling to the "right".

			return this._getSibling("next"); // dijit._Widget
		},

		getIndexInParent: function(){
			// summary:
			//		Returns the index of this widget within its container parent.
			//		It returns -1 if the parent does not exist, or if the parent
			//		is not a dijit._Container

			var p = this.getParent();
			if(!p || !p.getIndexOfChild){
				return -1; // int
			}
			return p.getIndexOfChild(this); // int
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/MaximoIntegration':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.MaximoIntegration");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Implements Maximo <-> Map JS framework communication. Currently using
 * sendEvent
 */
dojo.declare("ibm.tivoli.fwm.mxmap.MaximoIntegration", ibm.tivoli.fwm.mxmap._Base, {
	compId: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.addSubscription(dojo.subscribe("mxmap_onServerData_" + this.compId, dojo.hitch(this, this.handleServer)));
	},
	resetMaximoTimeout: function(fromServer)
	{
		try
		{
			console.log("timer from server:", fromServer);
			if (!fromServer)
			{
				fromServer = false;
			}
			resetLogoutTimer(fromServer);
			// reset timer
		}
		catch (e)
		{

		}
	},
	/**
	 * Handles actions from server
	 */
	handleServer: function(actions)
	{
		console.log("[Maximo Integration] Actions Received: ", actions);

		var action = null;
		try
		{
			this.resetMaximoTimeout(true);
			if (actions)
			{
				for ( var id in actions)
				{
					action = actions[id];
					console.log("[Maximo Integration] Processing action: ", action);
					switch (action.action)
					{
						case "updatedCurrentRecordLocation":
							console.log("onCurrentRecordUpdate_" + this.compId);
							dojo.publish("onCurrentRecordUpdate_" + this.compId, [ action.data.currentMbo ]);
							break;
						case "updatedRecordSetLocation":
							if (action.data.currentMbo)
							{
								dojo.publish("onCurrentRecordUpdate_" + this.compId, [ action.data.currentMbo ]);
								console.log("event was updatedRecordSetLocation");
							}
							dojo.publish("onCurrentRecordSetUpdated_" + this.compId, [ action.data.records ]);
							break;
						case "addRecordsToLayer":
							console.log('received records to add to layer', action);
							dojo.publish("addRecordsToLayer_" + this.compId, [ action.layerName, action.data.records, action.cleanBeforeAdd ]);
							break;
						case "removeRecordsFromLayer":
							console.log('received records to remove from layer', action);
							dojo.publish("removeRecordsFromLayer_" + this.compId, [ action.layerName, action.data.records ]);
							break;
						case "exception":
							dojo.publish("onServerException_" + this.compId, [ action.data.failedAction ]);
							console.warn("An exception was thrown from server", action.data);
							break;
						case "refreshroute":
							console.warn("refreshroute", action);
							dojo.publish("refreshroute_" + this.compId, [ action.data ]);

							break;
						case "refreshdatasource":
							console.warn("refreshdatasource", action);
							this.refreshDatasource(dojo.hitch(this, function(response)
									{
										this.handleServer(response);
									}), 
									function(){});

							break;
						case "noop":
							sendEvent("NOOP", this.compId, '');

							break;

						default:

							dojo.publish(action.action + "_" + this.compId, [ action.data ]);
							break;
					}
				}
			}
		}
		catch (e)
		{
			if (action)
			{
				console.error("Failed executing server action: ", action, e);
			}
			else
			{
				console.error("Failed executing server actions: ", actions, e);
			}
		}
	},
	storeUserLocation: function(locationInfo)
	{
		var myEvent = new Event("storeUserLocation", this.compId, dojo.toJson(locationInfo), REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", function()
		{
		}, function()
		{
			console.error("failed to save user context.");
		});
	},
	getRouteStops: function(callback, erroCb, forceRefresh, serverCallback)
	{
		if (forceRefresh == null)
		{
			forceRefresh = false;
		}
		var normalReturn = function(data)
		{

			if (data.error)
			{
				erroCb(data);

			}
			else
			{
				if (data.forceUIRefresh == true)
				{
					data.hasRoute = false;// the NOOP would force the route to
					// be drawn again.
					console.info("the results bean is going to change and then will send another UI Refresh.");
					sendEvent("NOOP", this.compId, '');
				}
				callback(data);

			}

		};
		if (!serverCallback)
		{
			serverCallback = false;
		}
		var myEvent = new Event("getRouteStops", this.compId + "_router", {
			forceRefresh: forceRefresh,
			serverCallback: serverCallback
		}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, normalReturn), erroCb);
	},

	loadMapTipTemplate: function(mxdata, successCallback, errorCallback)
	{
		var myEvent = new Event("loadMapTipTemplate", this.compId, {
			objectName: mxdata.mboName,
			objectId: mxdata.uid.value
		}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "text/html", "text", successCallback, errorCallback);
	},

	loadMapTipItems: function(successCallback, errorCallback)
	{
		var myEvent = new Event("loadMenuItems", this.compId, "", REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);

	},

	/**
	 * Send the set current location on server record.
	 */
	setCurrentRecordLocation: function(location, status)
	{
		var params = {
			lat: location.lat,
			lng: location.lng,
			formattedaddress: location.address,
			status: status
		};
		console.log("Calling Maximo event with data: ", location);

		var myEvent = new Event("setCurrentSALocation", this.compId, params, REQUESTTYPE_SYNC);
		queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function(err)
		{
			console.log("error", err);
		});
	},
	/**
	 * Send Maximo event to display a Maxmsg.
	 * 
	 * @param msgGroup
	 * @param msgKey
	 * @param params
	 *            string[]
	 */
	showMessage: function(msgGroup, msgKey, params)
	{

		var myEvent = new Event("showMaxMessage", this.compId, {
			msgKey: msgKey,
			msgGroup: msgGroup,
			params: params
		}, REQUESTTYPE_SYNC);
		queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function(err)
		{
			console.log("error", err);
		});
	},
	showMaximoDialog: function(dialogId, objectname, objectid, relationship)
	{
		addCommInput('dialogid', dialogId);
		if (objectname && objectid)
		{
			addCommInput('objectname', objectname);
			addCommInput('objectid', objectid);

		}
		if (relationship)
		{
			addCommInput('relationship', relationship);
		}
		dojo.publish("onDialogRequested_" + this.compId, []);
		sendEvent('showDialog', this.compId, '');
	},
	showQueryUnassignedWorkDialog: function(bounds)
	{
		if (bounds)
		{
			addCommInput('mapbounds_sw_latitudey', bounds.sw.lat);
			addCommInput('mapbounds_sw_longitudex', bounds.sw.lon);
			addCommInput('mapbounds_ne_latitudey', bounds.ne.lat);
			addCommInput('mapbounds_ne_longitudex', bounds.ne.lon);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
		this.showMaximoDialog('map_wo_query_unassigned_work', null, null);
	},
	queryUnassignedWorkDispatcher: function(bounds, callback, errorCb)
	{
		if (bounds)
		{
			var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, bounds, REQUESTTYPE_HIGHASYNC);
			queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
	},
	refreshQueryUnassignedWork: function(bounds, queryData, callback, errorCb)
	{
		if (bounds)
		{
			var params = {
				"bounds": bounds,
				"queryData": queryData
			};
			var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, params, REQUESTTYPE_HIGHASYNC);
			queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
	},
	getCrewLaborByCoords: function(callback, erroCb, bounds)
	{

		var myEvent = new Event("getCrewLaborByCoords", this.compId, bounds, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
	},	
	
	_refreshDSRunning: false,
	refreshDatasource: function(callback,errorcb)
	{
		if (this._refreshDSRunning == true)
		{
			console.log("refresh datasouce is already taking place.");
			return;
		}
		var onSuccess = function(response)
		{
			console.log("[Maximo Integration] Refreshing Map: ", response);
			callback(response);
			/* 12-13622 */
			if (response.action.data.error)
			{
				this.showMessage(response.action.data.error.group, response.action.data.error.key, [response.action.data.error.params]);
			}
			this._refreshDSRunning = false;
		};
		var onError = function()
		{
			console.error("Failed to refresh marker position");
			errorcb();
			this._refreshDSRunning = false;
		};
		var myEvent = new Event("refreshMarkersPositions", this.compId, {}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, onSuccess), dojo.hitch(this, onError));
	},
	loadSymbologyConfigFile: function(successCallback, errorCallback)
	{
		var myEvent = new Event("loadSymbologyConfig", this.compId, "", REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
	}

});

});

},
'dojox/timing/_base':function(){
define("dojox/timing/_base", ["dojo/_base/kernel", "dojo/_base/lang"], function(dojo){
	dojo.experimental("dojox.timing");
	dojo.getObject("timing", true, dojox);

	dojox.timing.Timer = function(/*int*/ interval){
		// summary: Timer object executes an "onTick()" method repeatedly at a specified interval.
		//			repeatedly at a given interval.
		// interval: Interval between function calls, in milliseconds.
		this.timer = null;
		this.isRunning = false;
		this.interval = interval;

		this.onStart = null;
		this.onStop = null;
	};

	dojo.extend(dojox.timing.Timer, {
		onTick: function(){
			// summary: Method called every time the interval passes.  Override to do something useful.
		},
			
		setInterval: function(interval){
			// summary: Reset the interval of a timer, whether running or not.
			// interval: New interval, in milliseconds.
			if (this.isRunning){
				window.clearInterval(this.timer);
			}
			this.interval = interval;
			if (this.isRunning){
				this.timer = window.setInterval(dojo.hitch(this, "onTick"), this.interval);
			}
		},
		
		start: function(){
			// summary: Start the timer ticking.
			// description: Calls the "onStart()" handler, if defined.
			// 				Note that the onTick() function is not called right away,
			//				only after first interval passes.
			if (typeof this.onStart == "function"){
				this.onStart();
			}
			this.isRunning = true;
			this.timer = window.setInterval(dojo.hitch(this, "onTick"), this.interval);
		},
		
		stop: function(){
			// summary: Stop the timer.
			// description: Calls the "onStop()" handler, if defined.
			if (typeof this.onStop == "function"){
				this.onStop();
			}
			this.isRunning = false;
			window.clearInterval(this.timer);
		}
	});
	return dojox.timing;
});

},
'ibm/tivoli/fwm/mxmap/actions/Actions':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dijit/Menu"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.actions.Actions");

dojo.require("dijit.Menu");
dojo.declare("ibm.tivoli.fwm.mxmap.actions.Actions", null, {
	divId : null,
	map : null,
	label : null,	
	constructor : function(params) {
		dojo.mixin(this, params);

	},
	execute : function(args) {
		console.info("not implemented");
	}

});
});

},
'url:dijit/templates/Dialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n",
'dijit/form/CheckBox':function(){
require({cache:{
'url:dijit/form/templates/CheckBox.html':"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"onclick:_onClick\"\n/></div>\n"}});
define("dijit/form/CheckBox", [
	"require",
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/_base/kernel",
	"dojo/query", // query
	"dojo/ready",
	"./ToggleButton",
	"./_CheckBoxMixin",
	"dojo/text!./templates/CheckBox.html",
	"dojo/NodeList-dom" // NodeList.addClass/removeClass
], function(require, declare, domAttr, kernel, query, ready, ToggleButton, _CheckBoxMixin, template){

/*=====
	var ToggleButton = dijit.form.ToggleButton;
	var _CheckBoxMixin = dijit.form._CheckBoxMixin;
=====*/

	// module:
	//		dijit/form/CheckBox
	// summary:
	//		Checkbox widget

	// Back compat w/1.6, remove for 2.0
	if(!kernel.isAsync){
		ready(0, function(){
			var requires = ["dijit/form/RadioButton"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return declare("dijit.form.CheckBox", [ToggleButton, _CheckBoxMixin], {
		// summary:
		// 		Same as an HTML checkbox, but with fancy styling.
		//
		// description:
		//		User interacts with real html inputs.
		//		On onclick (which occurs by mouse click, space-bar, or
		//		using the arrow keys to switch the selected radio button),
		//		we update the state of the checkbox/radio.
		//
		//		There are two modes:
		//			1. High contrast mode
		//			2. Normal mode
		//
		//		In case 1, the regular html inputs are shown and used by the user.
		//		In case 2, the regular html inputs are invisible but still used by
		//		the user. They are turned quasi-invisible and overlay the background-image.

		templateString: template,

		baseClass: "dijitCheckBox",

		_setValueAttr: function(/*String|Boolean*/ newValue, /*Boolean*/ priorityChange){
			// summary:
			//		Handler for value= attribute to constructor, and also calls to
			//		set('value', val).
			// description:
			//		During initialization, just saves as attribute to the <input type=checkbox>.
			//
			//		After initialization,
			//		when passed a boolean, controls whether or not the CheckBox is checked.
			//		If passed a string, changes the value attribute of the CheckBox (the one
			//		specified as "value" when the CheckBox was constructed (ex: <input
			//		data-dojo-type="dijit.CheckBox" value="chicken">)
			//		widget.set('value', string) will check the checkbox and change the value to the
			//		specified string
			//		widget.set('value', boolean) will change the checked state.
			if(typeof newValue == "string"){
				this._set("value", newValue);
				domAttr.set(this.focusNode, 'value', newValue);
				newValue = true;
			}
			if(this._created){
				this.set('checked', newValue, priorityChange);
			}
		},
		_getValueAttr: function(){
			// summary:
			//		Hook so get('value') works.
			// description:
			//		If the CheckBox is checked, returns the value attribute.
			//		Otherwise returns false.
			return (this.checked ? this.value : false);
		},

		// Override behavior from Button, since we don't have an iconNode
		_setIconClassAttr: null,

		postMixInProperties: function(){
			this.inherited(arguments);

			// Need to set initial checked state as part of template, so that form submit works.
			// domAttr.set(node, "checked", bool) doesn't work on IE until node has been attached
			// to <body>, see #8666
			this.checkedAttrSetting = this.checked ? "checked" : "";
		},

		 _fillContent: function(){
			// Override Button::_fillContent() since it doesn't make sense for CheckBox,
			// since CheckBox doesn't even have a container
		},

		_onFocus: function(){
			if(this.id){
				query("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
			}
			this.inherited(arguments);
		},

		_onBlur: function(){
			if(this.id){
				query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
			}
			this.inherited(arguments);
		}
	});
});

},
'dijit/_Container':function(){
define("dijit/_Container", [
	"dojo/_base/array", // array.forEach array.indexOf
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.place
	"./registry"	// registry.byNode()
], function(array, declare, domConstruct, registry){

	// module:
	//		dijit/_Container
	// summary:
	//		Mixin for widgets that contain a set of widget children.

	return declare("dijit._Container", null, {
		// summary:
		//		Mixin for widgets that contain a set of widget children.
		// description:
		//		Use this mixin for widgets that needs to know about and
		//		keep track of their widget children. Suitable for widgets like BorderContainer
		//		and TabContainer which contain (only) a set of child widgets.
		//
		//		It's not suitable for widgets like ContentPane
		//		which contains mixed HTML (plain DOM nodes in addition to widgets),
		//		and where contained widgets are not necessarily directly below
		//		this.containerNode.   In that case calls like addChild(node, position)
		//		wouldn't make sense.

		buildRendering: function(){
			this.inherited(arguments);
			if(!this.containerNode){
				// all widgets with descendants must set containerNode
	 			this.containerNode = this.domNode;
			}
		},

		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			// summary:
			//		Makes the given widget a child of this widget.
			// description:
			//		Inserts specified child widget's dom node as a child of this widget's
			//		container node, and possibly does other processing (such as layout).

			var refNode = this.containerNode;
			if(insertIndex && typeof insertIndex == "number"){
				var children = this.getChildren();
				if(children && children.length >= insertIndex){
					refNode = children[insertIndex-1].domNode;
					insertIndex = "after";
				}
			}
			domConstruct.place(widget.domNode, refNode, insertIndex);

			// If I've been started but the child widget hasn't been started,
			// start it now.  Make sure to do this after widget has been
			// inserted into the DOM tree, so it can see that it's being controlled by me,
			// so it doesn't try to size itself.
			if(this._started && !widget._started){
				widget.startup();
			}
		},

		removeChild: function(/*Widget|int*/ widget){
			// summary:
			//		Removes the passed widget instance from this widget but does
			//		not destroy it.  You can also pass in an integer indicating
			//		the index within the container to remove

			if(typeof widget == "number"){
				widget = this.getChildren()[widget];
			}

			if(widget){
				var node = widget.domNode;
				if(node && node.parentNode){
					node.parentNode.removeChild(node); // detach but don't destroy
				}
			}
		},

		hasChildren: function(){
			// summary:
			//		Returns true if widget has children, i.e. if this.containerNode contains something.
			return this.getChildren().length > 0;	// Boolean
		},

		_getSiblingOfChild: function(/*dijit._Widget*/ child, /*int*/ dir){
			// summary:
			//		Get the next or previous widget sibling of child
			// dir:
			//		if 1, get the next sibling
			//		if -1, get the previous sibling
			// tags:
			//      private
			var node = child.domNode,
				which = (dir>0 ? "nextSibling" : "previousSibling");
			do{
				node = node[which];
			}while(node && (node.nodeType != 1 || !registry.byNode(node)));
			return node && registry.byNode(node);	// dijit._Widget
		},

		getIndexOfChild: function(/*dijit._Widget*/ child){
			// summary:
			//		Gets the index of the child in this container or -1 if not found
			return array.indexOf(this.getChildren(), child);	// int
		}
	});
});

},
'dojo/html':function(){
define("dojo/html", ["./_base/kernel", "./_base/lang", "./_base/array", "./_base/declare", "./dom", "./dom-construct", "./parser"], function(dojo, lang, darray, declare, dom, domConstruct, parser) {
	// module:
	//		dojo/html
	// summary:
	//		TODOC

	lang.getObject("html", true, dojo);

	// the parser might be needed..

	// idCounter is incremented with each instantiation to allow asignment of a unique id for tracking, logging purposes
	var idCounter = 0;

	dojo.html._secureForInnerHtml = function(/*String*/ cont){
		// summary:
		//		removes !DOCTYPE and title elements from the html string.
		//
		//		khtml is picky about dom faults, you can't attach a style or <title> node as child of body
		//		must go into head, so we need to cut out those tags
		//	cont:
		//		An html string for insertion into the dom
		//
		return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig, ""); // String
	};

/*====
	dojo.html._emptyNode = function(node){
		// summary:
		//		removes all child nodes from the given node
		//	node: DOMNode
		//		the parent element
	};
=====*/
	dojo.html._emptyNode = domConstruct.empty;

	dojo.html._setNodeContent = function(/* DomNode */ node, /* String|DomNode|NodeList */ cont){
		// summary:
		//		inserts the given content into the given node
		//	node:
		//		the parent element
		//	content:
		//		the content to be set on the parent element.
		//		This can be an html string, a node reference or a NodeList, dojo.NodeList, Array or other enumerable list of nodes

		// always empty
		domConstruct.empty(node);

		if(cont) {
			if(typeof cont == "string") {
				cont = domConstruct.toDom(cont, node.ownerDocument);
			}
			if(!cont.nodeType && lang.isArrayLike(cont)) {
				// handle as enumerable, but it may shrink as we enumerate it
				for(var startlen=cont.length, i=0; i<cont.length; i=startlen==cont.length ? i+1 : 0) {
					domConstruct.place( cont[i], node, "last");
				}
			} else {
				// pass nodes, documentFragments and unknowns through to dojo.place
				domConstruct.place(cont, node, "last");
			}
		}

		// return DomNode
		return node;
	};

	// we wrap up the content-setting operation in a object
	declare("dojo.html._ContentSetter", null,
		{
			// node: DomNode|String
			//		An node which will be the parent element that we set content into
			node: "",

			// content: String|DomNode|DomNode[]
			//		The content to be placed in the node. Can be an HTML string, a node reference, or a enumerable list of nodes
			content: "",

			// id: String?
			//		Usually only used internally, and auto-generated with each instance
			id: "",

			// cleanContent: Boolean
			//		Should the content be treated as a full html document,
			//		and the real content stripped of <html>, <body> wrapper before injection
			cleanContent: false,

			// extractContent: Boolean
			//		Should the content be treated as a full html document, and the real content stripped of <html>, <body> wrapper before injection
			extractContent: false,

			// parseContent: Boolean
			//		Should the node by passed to the parser after the new content is set
			parseContent: false,

			// parserScope: String
			//		Flag passed to parser.	Root for attribute names to search for.	  If scopeName is dojo,
			//		will search for data-dojo-type (or dojoType).  For backwards compatibility
			//		reasons defaults to dojo._scopeName (which is "dojo" except when
			//		multi-version support is used, when it will be something like dojo16, dojo20, etc.)
			parserScope: dojo._scopeName,

			// startup: Boolean
			//		Start the child widgets after parsing them.	  Only obeyed if parseContent is true.
			startup: true,

			// lifecyle methods
			constructor: function(/* Object */params, /* String|DomNode */node){
				//	summary:
				//		Provides a configurable, extensible object to wrap the setting on content on a node
				//		call the set() method to actually set the content..

				// the original params are mixed directly into the instance "this"
				lang.mixin(this, params || {});

				// give precedence to params.node vs. the node argument
				// and ensure its a node, not an id string
				node = this.node = dom.byId( this.node || node );

				if(!this.id){
					this.id = [
						"Setter",
						(node) ? node.id || node.tagName : "",
						idCounter++
					].join("_");
				}
			},
			set: function(/* String|DomNode|NodeList? */ cont, /* Object? */ params){
				// summary:
				//		front-end to the set-content sequence
				//	cont:
				//		An html string, node or enumerable list of nodes for insertion into the dom
				//		If not provided, the object's content property will be used
				if(undefined !== cont){
					this.content = cont;
				}
				// in the re-use scenario, set needs to be able to mixin new configuration
				if(params){
					this._mixin(params);
				}

				this.onBegin();
				this.setContent();
				this.onEnd();

				return this.node;
			},
			setContent: function(){
				// summary:
				//		sets the content on the node

				var node = this.node;
				if(!node) {
					// can't proceed
					throw new Error(this.declaredClass + ": setContent given no node");
				}
				try{
					node = dojo.html._setNodeContent(node, this.content);
				}catch(e){
					// check if a domfault occurs when we are appending this.errorMessage
					// like for instance if domNode is a UL and we try append a DIV

					// FIXME: need to allow the user to provide a content error message string
					var errMess = this.onContentError(e);
					try{
						node.innerHTML = errMess;
					}catch(e){
						console.error('Fatal ' + this.declaredClass + '.setContent could not change content due to '+e.message, e);
					}
				}
				// always put back the node for the next method
				this.node = node; // DomNode
			},

			empty: function() {
				// summary
				//	cleanly empty out existing content

				// destroy any widgets from a previous run
				// NOTE: if you dont want this you'll need to empty
				// the parseResults array property yourself to avoid bad things happenning
				if(this.parseResults && this.parseResults.length) {
					darray.forEach(this.parseResults, function(w) {
						if(w.destroy){
							w.destroy();
						}
					});
					delete this.parseResults;
				}
				// this is fast, but if you know its already empty or safe, you could
				// override empty to skip this step
				dojo.html._emptyNode(this.node);
			},

			onBegin: function(){
				// summary
				//		Called after instantiation, but before set();
				//		It allows modification of any of the object properties
				//		- including the node and content provided - before the set operation actually takes place
				//		This default implementation checks for cleanContent and extractContent flags to
				//		optionally pre-process html string content
				var cont = this.content;

				if(lang.isString(cont)){
					if(this.cleanContent){
						cont = dojo.html._secureForInnerHtml(cont);
					}

					if(this.extractContent){
						var match = cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
						if(match){ cont = match[1]; }
					}
				}

				// clean out the node and any cruft associated with it - like widgets
				this.empty();

				this.content = cont;
				return this.node; /* DomNode */
			},

			onEnd: function(){
				// summary
				//		Called after set(), when the new content has been pushed into the node
				//		It provides an opportunity for post-processing before handing back the node to the caller
				//		This default implementation checks a parseContent flag to optionally run the dojo parser over the new content
				if(this.parseContent){
					// populates this.parseResults if you need those..
					this._parse();
				}
				return this.node; /* DomNode */
			},

			tearDown: function(){
				// summary
				//		manually reset the Setter instance if its being re-used for example for another set()
				// description
				//		tearDown() is not called automatically.
				//		In normal use, the Setter instance properties are simply allowed to fall out of scope
				//		but the tearDown method can be called to explicitly reset this instance.
				delete this.parseResults;
				delete this.node;
				delete this.content;
			},

			onContentError: function(err){
				return "Error occured setting content: " + err;
			},

			_mixin: function(params){
				// mix properties/methods into the instance
				// TODO: the intention with tearDown is to put the Setter's state
				// back to that of the original constructor (vs. deleting/resetting everything regardless of ctor params)
				// so we could do something here to move the original properties aside for later restoration
				var empty = {}, key;
				for(key in params){
					if(key in empty){ continue; }
					// TODO: here's our opportunity to mask the properties we dont consider configurable/overridable
					// .. but history shows we'll almost always guess wrong
					this[key] = params[key];
				}
			},
			_parse: function(){
				// summary:
				//		runs the dojo parser over the node contents, storing any results in this.parseResults
				//		Any errors resulting from parsing are passed to _onError for handling

				var rootNode = this.node;
				try{
					// store the results (widgets, whatever) for potential retrieval
					var inherited = {};
					darray.forEach(["dir", "lang", "textDir"], function(name){
						if(this[name]){
							inherited[name] = this[name];
						}
					}, this);
					this.parseResults = parser.parse({
						rootNode: rootNode,
						noStart: !this.startup,
						inherited: inherited,
						scope: this.parserScope
					});
				}catch(e){
					this._onError('Content', e, "Error parsing in _ContentSetter#"+this.id);
				}
			},

			_onError: function(type, err, consoleText){
				// summary:
				//		shows user the string that is returned by on[type]Error
				//		overide/implement on[type]Error and return your own string to customize
				var errText = this['on' + type + 'Error'].call(this, err);
				if(consoleText){
					console.error(consoleText, err);
				}else if(errText){ // a empty string won't change current content
					dojo.html._setNodeContent(this.node, errText, true);
				}
			}
	}); // end dojo.declare()

	dojo.html.set = function(/* DomNode */ node, /* String|DomNode|NodeList */ cont, /* Object? */ params){
			// summary:
			//		inserts (replaces) the given content into the given node. dojo.place(cont, node, "only")
			//		may be a better choice for simple HTML insertion.
			// description:
			//		Unless you need to use the params capabilities of this method, you should use
			//		dojo.place(cont, node, "only"). dojo.place() has more robust support for injecting
			//		an HTML string into the DOM, but it only handles inserting an HTML string as DOM
			//		elements, or inserting a DOM node. dojo.place does not handle NodeList insertions
			//		or the other capabilities as defined by the params object for this method.
			//	node:
			//		the parent element that will receive the content
			//	cont:
			//		the content to be set on the parent element.
			//		This can be an html string, a node reference or a NodeList, dojo.NodeList, Array or other enumerable list of nodes
			//	params:
			//		Optional flags/properties to configure the content-setting. See dojo.html._ContentSetter
			//	example:
			//		A safe string/node/nodelist content replacement/injection with hooks for extension
			//		Example Usage:
			//		dojo.html.set(node, "some string");
			//		dojo.html.set(node, contentNode, {options});
			//		dojo.html.set(node, myNode.childNodes, {options});
		if(undefined == cont){
			console.warn("dojo.html.set: no cont argument provided, using empty string");
			cont = "";
		}
		if(!params){
			// simple and fast
			return dojo.html._setNodeContent(node, cont, true);
		}else{
			// more options but slower
			// note the arguments are reversed in order, to match the convention for instantiation via the parser
			var op = new dojo.html._ContentSetter(lang.mixin(
					params,
					{ content: cont, node: node }
			));
			return op.set();
		}
	};

	return dojo.html;
});

},
'ibm/tivoli/fwm/mxmap/Map':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/ContextMenu,ibm/tivoli/fwm/mxmap/CurrentMXRecordSet,ibm/tivoli/fwm/mxmap/MaximoIntegration,ibm/tivoli/fwm/mxmap/Geocoder,ibm/tivoli/fwm/mxmap/UserSessionManager,ibm/tivoli/fwm/mxmap/MapTipsManager,ibm/tivoli/fwm/mxmap/helpers/MapMarkersRefresher,ibm/tivoli/fwm/mxmap/toolbar/ToolbarManager,ibm/tivoli/fwm/mxmap/CurrentMXRecManager,ibm/tivoli/fwm/mxmap/helpers/MapFullScreenHelper,ibm/tivoli/fwm/mxmap/layers/LayersManager,ibm/tivoli/fwm/mxmap/symbology/SymbologyManager,dijit/dijit,dijit/Tooltip,ibm/tivoli/fwm/mxmap/routing/MultipleRoutesManager,ibm/tivoli/fwm/mxmap/actions/SetRecordLocation"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.Map");
dojo.require("ibm.tivoli.fwm.mxmap.ContextMenu");
dojo.require("ibm.tivoli.fwm.mxmap.CurrentMXRecordSet");
dojo.require("ibm.tivoli.fwm.mxmap.MaximoIntegration");
dojo.require("ibm.tivoli.fwm.mxmap.Geocoder");
dojo.require("ibm.tivoli.fwm.mxmap.UserSessionManager");
dojo.require("ibm.tivoli.fwm.mxmap.MapTipsManager");
dojo.require("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager");
dojo.require("ibm.tivoli.fwm.mxmap.CurrentMXRecManager");
dojo.require("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayersManager");
dojo.require("ibm.tivoli.fwm.mxmap.symbology.SymbologyManager");
dojo.require("dijit.dijit");
dojo.require("dijit.Tooltip");
dojo.require("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
/**
 * Main map implementation
 */
dojo.declare("ibm.tivoli.fwm.mxmap.Map", ibm.tivoli.fwm.mxmap._Base, {
	events: {
		mapLoaded: "mxmap.mapLoaded"
	},
	map: null,
	_actionsAreEnabled: true,
	routeManager: null,
	divId: null,
	height: null,
	width: null,
	heightPx: null,
	widthPx: null,
	compId: null,
	mapConf: null,
	routeConf: null,
	providerName: null,
	isMobile: false,
	router: null,
	isFullScreen: false,
	customInitialMapOptions: {},
	fullScreenHelper: null,
	geocoder: null,
	maximo: null,
	currentRecordSetControl: null,
	userSessionManager: null,
	initialized: false,
	markerRefresher: null,
	toolbar: null,
	currentRecordMgr: null,
	maptips: null,
	contextMenu: null,
	layersManager: null,
	symbologyManager: null,
	mapOffsetTop: null,
	getId: function()
	{
		return this.compId;
	},
	constructor: function(options)
	{
		this._datasources = [];
	},
	getMaximo: function()
	{
		return this.maximo;
	},
	getSessionData: function()
	{
		if (this.mapConf)
		{
			return this.mapConf.sessionData;
		}
		return {};
	},

	/**
	 * In case no configuration was made
	 */
	_getDefaultInitialLocation: function()
	{
		return {
			lat: 0.0,
			lng: 0.0,
			level: 3
		};
	},
	_getInitialLocation: function(location)
	{
		console.log("[Map] Configured Initial Location ", location);
		var loc = this._getDefaultInitialLocation();

		if (this.userSessionManager != null && this.userSessionManager.hasLastUserLocation())
		{
			location = this.userSessionManager.getLastUserLocation();
		}
		if (location && location.lat && location.lng)
		{
			loc.lat = location.lat;
			loc.lng = location.lng;
		}

		if (location && location.level)
		{
			loc.level = location.level;
		}
		console.log("[Map] Initial Location to be used if no record", loc);
		return loc;

	},
	getMapTipsManager: function()
	{
		return this.maptips;
	},
	/**
	 * Creates a map based on the props of the options param.
	 */
	createMap: function(options)
	{
		console.log('[Map] Map Component Id ', options.compId);
		this.refreshListener = [];
		this.compId = options.compId;
		this._sectionExpaded = false;
		try
		{

			if (this.initialized === true)
			{
				console.warn("already created!");
				return;
			}
			if (options.isInExpanded == false)
			{
				this.disableActions();
			}
			dojo.mixin(this, options);
			if (dojo.isIE > 0)
			{
				// not sure why but in IE the view port returned is taller.
				this._dueDistances = 84;
			}
			var mapDiv = dojo.byId(this.divId);
			/* 12-10909 - need to set the values here first because of resize */
			this.mapOffsetTop = mapDiv.offsetTop;
			this._resize();
			this.userSessionManager = new ibm.tivoli.fwm.mxmap.UserSessionManager({
				map: this,
				persistence: this.mapConf.inputConfs.contextpersistent
			});
			this.map = new mxn.Mapstraction(this.divId, this.providerName, false, this.mapConf.key, this.getInitOptions(), this.getId());
			if (this.isMobile == true)
			{
				this.map.addControls({
					pan: true,
					zoom: 'small',
					scale: true,
					enableScrollWheelZoom: true,
					map_type: true
				});
			}
			else
			{
				this.map.addControls({
					pan: true,
					zoom: 'large',
					scale: true,
					enableScrollWheelZoom: true,
					map_type: true
				});
			}
			this.map.applyOptions();
			console.log("[Map] Options", options);
			if (options.isTesting == true)
			{
				console.log("[Map] UT ENABLED");
				this.maximo = options.maximoImpl;
			}
			else
			{
				this.maximo = new ibm.tivoli.fwm.mxmap.MaximoIntegration(options);
			}
			this.maptips = new ibm.tivoli.fwm.mxmap.MapTipsManager({
				maximo: this.maximo
			});

			// Create the symbologyManager object and build the layer tree
			// according to the symbology configuration file
			this.mapConf.inputConfs.defaultsymbology = dojo.fromJson(this.mapConf.inputConfs.defaultsymbology);
			this.symbologyManager = new ibm.tivoli.fwm.mxmap.symbology.SymbologyManager({
				map: this,
				defaultSymbologyConfig: this.mapConf.inputConfs.defaultsymbology
			});

			this.layersManager = new ibm.tivoli.fwm.mxmap.layers.LayersManager({
				symbManager: this.symbologyManager,
				layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
				map: this
			});

			if (this.allowsTrafficLayer() == true)
			{
				// Create the traffic layer
				var trafficLayerOptions = {
					layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "traffic"),// "Traffic";
					layerId: "traffic",
					map: this
				};
				var trafficLayer = new ibm.tivoli.fwm.mxmap.layers.TrafficLayer(trafficLayerOptions);
				this.layersManager.addLayer(trafficLayer, false);
			}

			// Create the route layer
			var routeLayerOptions = {
				layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "routelayer"),// "Route";
				layerId: "route",
				map: this
			};
			var routeLayer = new ibm.tivoli.fwm.mxmap.layers.RouteLayer(routeLayerOptions);
			this.layersManager.addLayer(routeLayer, false);

			var interval = this.mapConf.inputConfs.refreshmapinterval;
			if (interval != null && interval > 0)
			{
				this.markerRefresher = new ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher({
					map: this,
					maximo: this.maximo,
					interval: interval
				});
			}

			var me = this;
			this.currentRecordSetControl = new ibm.tivoli.fwm.mxmap.CurrentMXRecordSet({
				records: me.mapConf.records,
				markerImgUrl: me.mapConf.inputConfs.markerimgurl,
				map: me
			});
			
			/* 12-13622 */
			if (me.mapConf.error)
			{
				this.maximo.showMessage(me.mapConf.error.group, me.mapConf.error.key, [me.mapConf.error.params]);
			}

			/* 12-10070 */
			this.currentRecordMgr = new ibm.tivoli.fwm.mxmap.CurrentMXRecManager({
				mbo: me.mapConf.currentMbo,
				map: me,
				draggable: (me.isMapViewOnly() == false),
				markerImgUrl: me.mapConf.inputConfs.markerimgurl
			});
			this.geocoder = new ibm.tivoli.fwm.mxmap.Geocoder({
				map: me,
				key: this.mapConf.key
			});
			this.map.setMapType(mxn.Mapstraction.ROAD);

			console.log("[Map] Input Configurations", this.mapConf.inputConfs);
			if (this.mapConf.inputConfs.toolbarenabled == 1 || this.mapConf.inputConfs.toolbarenabled == true || this.mapConf.inputConfs.toolbarenabled=="true")
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[Map] Toolbar enabled with these additional items", this.mapConf.inputConfs.toolitems);
				}
				var additionalItems = [];
				if (this.mapConf.inputConfs.toolitems)
				{
					additionalItems = dojo.fromJson(this.mapConf.inputConfs.toolitems);
				}

				this.toolbar = new ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager({
					gisdata: this.mapConf.gisdata,
					mxdata: this.mapConf.mxdata,
					items: additionalItems,
					map: me
				});

				this.toolbar.startup();
				/* 12-10909 - update the values if we have toolbar */
				this.mapOffsetTop = mapDiv.offsetTop;
			}

			this.isFullScreen = (this.mapConf.inputConfs.fullscreenmode == "true");
			this.fullScreenHelper = new ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper({
				map: me,
				mapToolbar: me.toolbar,
				mapDivElement: dojo.byId(me.divId),
				mapDivWidth: me.widthPx,
				mapDivHeight: me.heightPx
			});
			console.log("[Map] Map configured, waiting for Map loading");
			if (!this.map.isLoaded())
			{
				this.map.addOnload(dojo.hitch(this, this._completeInitAfterMapLoads));
				this.map.addOnload(dojo.hitch(this, this._resize));

			}
			else
			{
				this._completeInitAfterMapLoads();
			}

			if (this.mapConf.isInMapManager)
			{
				var updateExtentsFn = dojo.hitch(this, function(context, args)
				{
					var locInfo = {
						lat: this.map.getCenter().lat,
						lng: this.map.getCenter().lng,
						level: this.map.getZoom()
					};
					console.info("[UserSessionManager] Saving Location", locInfo);
					this.getMaximo().storeUserLocation(locInfo);
				});

				this.map.changeZoom.addHandler(updateExtentsFn, ""/* context */);
				this.map.endPan.addHandler(updateExtentsFn, ""/* context */);
			}
			// reset timeout timer
			this.map.endPan.addHandler(function()
			{
				this.resetMaximoTimeout(false);
			}, this.maximo);
		}
		catch (e)
		{
			console.error("Error in map creation", e, dojo.toJson(e));
			sendEvent('showErrors', options.compId, "unknown");
		}
	},
	centerAndZoomMap: function()
	{

		if (this.routerManager != null && this.routeConf.hasRoute == true)
		{
			return;
		}
		var initialLocation = this._getInitialLocation(this.mapConf.initialLocation);
		if (this.mapConf.zoomToDataInput == true)
		{

			console.log("[Map] Zoom to data input enabled ", this.currentRecordSetControl.isEmpty(), this.currentRecordMgr.hasAnyGISCoordinates());

			if (this.currentRecordSetControl.isEmpty() == true && this.currentRecordMgr.hasAnyGISCoordinates() != true)
			{
				console.log("[Map] Center and Zoom Map - on default location");

				this._setDefaultLocation(initialLocation);
			}
			else
			{
				if (this.currentRecordMgr.hasAnyGISCoordinates() == true)
				{
					console.log("[Map] Center Map - with current recordrecords ");
					this._zoomToCurrentMboRec(initialLocation);
				}
				else
				{
					console.log("[Map] Center and Zoom Map - with multiple records and Zoom Data Enabled");
					this.zoomToMbos(this.currentRecordSetControl.mboInfoArray);
				}
			}

		}
		else
		{
			console.log(this.getId(), "[Map] Center and Zoom Map - on default location", initialLocation);
			this._setDefaultLocation(initialLocation);
		}

	},
	_zoomToCurrentMboRec: function(initialLocation)
	{
		this.currentRecordMgr.centerAndZoom(initialLocation.level);
	},
	_completeInitAfterMapLoads: function()
	{
		this._checkMapLoadedCorrectly();
		if (dojo.config.fwm.debug == true)
		{
			console.log("[Map] Loading actions", this.mapConf);
		}
		if (this.mapConf.action)
		{
			switch (this.mapConf.action)
			{
				case "showMBOLocation":
					if (dojo.config.fwm.debug == true)
					{
						console.log("[Map] Show Mbos Location");
					}
					this.currentRecordSetControl.showMXRecordsOnMap();
					if (this.currentRecordMgr.hasAnyGISCoordinates())
					{
						this.currentRecordMgr.showCurrentRecord(true);
					}
					this.centerAndZoomMap();

					break;
				case "noAction":
					var initialLocation = this._getInitialLocation(this.mapConf.initialLocation);
					this._setDefaultLocation(initialLocation);
					break;
				default:
					console.error("[Map] Unknown initial action", this.mapConf.action);
					break;
			}
		}

		dojo.connect(window, "onresize", this, this._resize);
		if (this.isMobile == true)
		{
			// 12-13046. Safari triggers onorientationchange instead of onresize
			// upon tilting the device.
			var res = function()
			{
				var rr = function()
				{
					this._resize();
				};
				setTimeout(dojo.hitch(this, rr), 200);
			};
			dojo.connect(window, "onorientationchange", this, res);
		}

		this.addSubscription(dojo.subscribe("mxmap_section_expanded_" + this.getId(), dojo.hitch(this, this._mapSectionExpanded)));

		if (this.isMapViewOnly() == false)
		{
			console.log("[Map] Map is not read only - creating context menu");
			this.contextMenu = new ibm.tivoli.fwm.mxmap.ContextMenu({
				divId: this.divId,
				compId: this.getId(),
				map: this.map
			});
			// In future we must be able to load
			dojo.require("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation");
			var setLocationConf = {
				map: this,
				compId: this.getId(),
				label: "Set record location"
			};
			this.contextMenu.addChild(new ibm.tivoli.fwm.mxmap.actions.SetRecordLocation(setLocationConf));
			this.contextMenu.serverUpdated(this.currentRecordMgr.mboInfo);
		}

		if (this.markerRefresher)
		{
			console.log("[Map] Starting Map Marker Refresher");
			this.markerRefresher.start();
		}
		console.log("[Map] Route Configuration Info: ", this.routeConf);
		if (this.routeConf)
		{

			var rparam = {
				routeUrl: this.mapConf.route,
				map: this,
				provider: this.mapConf.provider,
				routeConf: this.routeConf

			};
			this.routeManager = new ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager(rparam);
			
			
			if (this.routeConf.error)
			{
				this.maximo.showMessage(this.routeConf.error.group, this.routeConf.error.key, [this.routeConf.error.params]);
			}
			else if (this.routeConf.hasRoute == true)
			{
				var opendirectionsdialog = this.routeConf.showdirectionsonload;

				this.refreshRoute(true, opendirectionsdialog);
			}
			var fctR = function()
			{
				this.refreshRoute(true, false, true);
			};
			this.addSubscription(dojo.subscribe("refreshroute_" + this.getId(), dojo.hitch(this, fctR)));
		}

		console.log("[Map] Map is full screen", this.isFullScreen);

		if (this.isFullScreen == true)
		{
			this.fullScreenOn();
		}
		this.initialized = true;
		console.log("[Map] Publishing event to indicate map loaded.", this.events.mapLoaded);
		dojo.publish(this.events.mapLoaded, [ this.map, this.getId(), this ]);
		console.log("[Map] Done");
		if (this.isMobile == true)
		{
			// need to handle fullscreen when dialogs are opened/closed
			var onDialogOpen = function()
			{
				if (this.fullScreenHelper._fullScreenOn == true)
				{
					this.fullScreenOff();
					this._mustResetFullScreen = true;
				}
				else
				{
					this._mustResetFullScreen = false;
				}
			};
			var onDialogClose = function()
			{
				if (this._mustResetFullScreen == true)
				{
					this.fullScreenOn();
					this._mustResetFullScreen = false;
				}
			};
			this.addSubscription(dojo.subscribe("onDialogRequested_" + this.getId(), dojo.hitch(this, onDialogOpen)));
			this.addSubscription(dojo.subscribe("onDialogClosed_" + this.getId(), dojo.hitch(this, onDialogClose)));
		}
	},
	getMapConfiguration: function()
	{
		return this.mapConf;
	},
	getMapstraction: function()
	{
		return this.map;
	},
	getSymbologyManager: function()
	{
		return this.symbologyManager;
	},

	_routeRefreshRunning: false,
	refreshRoute: function(forceRefresh, opendirectionsdialog, servercallback, noZoom, routeFinishCallback, routeErrorCallback)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		console.log("[Map] Refreshing Routes");
		if (this.routeManager)
		{
			if (this._routeRefreshRunning == true)
			{
				console.warn("Route is already being refreshed");
				return;
			}
			this._routeRefreshRunning = true;
			var fct = function(data)
			{
				this.routeManager.clearAll();
				if (data.hasRoute == true)
				{
					var callback = dojo.hitch(this, function()
					{
						this._routeRefreshRunning = false;
						if (routeFinishCallback)
						{
							routeFinishCallback(this.routeManager);
						}
					});
					console.log("opendirectionsdialog", opendirectionsdialog);
					if (opendirectionsdialog == "true")
					{
						callback = dojo.hitch(this, function()
						{
							// forces the itinerary dialog to open per conf.
							dojo.publish("showItinerary_" + this.getId());
							console.log("forcing dialog to show route info");
							this._routeRefreshRunning = false;
						});
					}
					var errFct2 = dojo.hitch(this, function(statusCode, error)
					{
						this._routeRefreshRunning = false;
						if (routeErrorCallback)
						{
							routeErrorCallback(statusCode, error);
						}
						else
						{
							this.routeManager.routingError(statusCode, error);
						}

					});
					this.routeManager.createRoute(data.stops, this.routeConf, callback, errFct2, noZoom);

				}
				else
				{
					if (routeFinishCallback)
					{
						routeFinishCallback();
					}
					this._routeRefreshRunning = false;
				}

			};
			var fctErr = function(data)
			{
				console.warn("[Map] Error refreshing route", data);
				this._routeRefreshRunning = false;
				if (routeErrorCallback)
				{
					routeErrorCallback(data);
				}
				else
				{
					if (data.error)
					{
						this.maximo.showMessage(data.error.group, data.error.key, [ data.error.params ]);
					}
					else
					{
						this.maximo.showMessage("mapserver", "route_unknown_failure", [ data ]);
					}
				}

			};
			this.maximo.getRouteStops(dojo.hitch(this, fct), dojo.hitch(this, fctErr), forceRefresh, servercallback);
		}
		else
		{
			console.warn("[Map] No route manager on map - could not refresh route.", this.compId);
		}
	},
	refreshDatasource: function(callback, errcallback)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		var success = dojo.hitch(this, function(response)
		{
			var noZoom = true;
			var datasource = null;
			if (response.action.data.currentMbo)
			{
				this.currentRecordMgr.serverUpdated(response.action.data.currentMbo, noZoom);
				datasource = this.currentRecordMgr;
			}
			else
			{
				this.currentRecordSetControl.updateRecordSetAndRefresh(response.action.data.records, noZoom);
				datasource = this.currentRecordSetControl;
			}
			if (callback)
			{
				callback(datasource);
			}
		});
		var error = dojo.hitch(this, function()
		{
			if (errcallback)
			{
				errcallback(response);
			}
		});
		this.maximo.refreshDatasource(success, error);
	},
	_datasources: [],
	registerDatasourceRefresh: function(callback)
	{
		this._datasources.push(callback);

	},
	_refreshEntireMapRunning: null,
	refreshMap: function(refreshOptions)
	{
		if (this._actionsAreEnabled == false)
		{
			console.log("[Map] Actions are disabled maybe map is in a collapsed section");
			return;
		}
		if (this._refreshEntireMapRunning == true)
		{
			console.warn("[Map] refresh going on, ignoring second request");
			return;
		}
		console.info("Refresh:Started");
		this._refreshEntireMapRunning = true;
		var datasourceToZoomTo = null;
		var finalRefreshStep = dojo.hitch(this, function(routeDatasource)
		{

			var i = -1;
			var mustZoom = true;
			if (refreshOptions && refreshOptions.zoom == false)
			{
				mustZoom = false;
			}
			var fct = dojo.hitch(this, function(datasourceObjectToZoom)
			{

				i++;
				if (datasourceObjectToZoom)
				{
					datasourceToZoomTo = datasourceObjectToZoom;
				}
				if (i < this._datasources.length)
				{
					this._datasources[i](fct, null, !mustZoom);
				}
				else
				{
					if (datasourceToZoomTo != null && mustZoom)
					{
						datasourceToZoomTo.centerAndZoom();
					}
					console.info("Refresh:Ended");
					this._refreshEntireMapRunning = false;
					dojo.publish("onMapRefresh_" + this.getId(), [ refreshOptions ]);

				}
			});
			fct(routeDatasource);
		});
		// this only happens if we have the applet as datasource so we can skip
		// to the last step directly
		if (this._datasources.length > 0 && (this.mapConf.inputConfs.datasrc == 'MAINRECORD' && this.currentRecordMgr.hasAnyGISCoordinates() == false) || this.mapConf.inputConfs.datasrc == null
				|| this.mapConf.inputConfs.datasrc.length == 0)
		{
			finalRefreshStep();
		}
		else
		{

			var routeTrigger = dojo.hitch(this, function(datasource)
			{
				datasourceToZoomTo = datasource;
				var routeError = dojo.hitch(this, function(statusCode, error)
				{
					if (refreshOptions.automatic == false)
					{
						this.routeManager.routingError(statusCode, error);
					}
					finalRefreshStep();
				});
				this.refreshRoute(true, false, false, true, finalRefreshStep, routeError);
			});
			this.refreshDatasource(routeTrigger);
		}

	},
	setRecordLocation: function()
	{
		console.log("[Map] Setting current record location: ", this.contextMenu.map.point);
		dijit.popup.close(this.contextMenu);
	},
	clearMarkers: function()
	{
		this.map.removeAllMarkers();
	},
	getMultipleRoutesManager: function()
	{
		return this.routeManager;
	},
	/**
	 * Return any initial provider specific configuration. If any custom conf is
	 * set (by MapControl or presentations 'initialMapOptions' property) it will
	 * override the current code conf.
	 * 
	 */
	getInitOptions: function()
	{
		var defOptions = this._getInitOptions();
		var customInitOptions = this._getCustomInitOptions(this.mapConf.mapoptions);
		for ( var propName in customInitOptions)
		{
			if (customInitOptions.hasOwnProperty(propName))
			{
				var propValue = customInitOptions[propName];
				defOptions[propName] = propValue;
			}
		}
		return defOptions;
	},
	_getCustomInitOptions: function()
	{
		throw "Cannot find custom init options";
	},
	_getInitOptions: function()
	{
		console.warn("No implementation found");
		return {};
	},
	getGeoCoderConf: function()
	{
		return {};
	},
	/**
	 * Set the map current location based on lat/lng and zoom level
	 */
	_setLocation: function(lat, lng, level)
	{
		var latLng = new mxn.LatLonPoint(lat, lng);
		this.map.setCenterAndZoom(latLng, level);
	},
	/**
	 * Set the map current location based on location object {latitude,
	 * longitude, zoomlevel}
	 */
	_setDefaultLocation: function(location)
	{

		if (location && location.lat && location.lng)
		{
			console.log("[Map] setDefaultLocation", location);
			var latLng = new mxn.LatLonPoint(location.lat, location.lng);
			this.map.setCenterAndZoom(latLng, location.level);
		}
		else
		{
			console.log("[Map] setDefaultLocation missing default location");
			this.map.setCenterAndZoom(new mxn.LatLonPoint(0, 0), 3);
		}

	},
	/**
	 * this function resizes the map div based on the input.
	 */
	_resize: function()
	{
		var mapElement = dojo.byId(this.divId);
		var h = this.height;
		var w = this.width;
		if (!this.height)
		{
			h = '100%';
		}
		if (!this.width)
		{
			w = '100%';
		}

		if (h.substr(h.length - 1, 1) == '%')
		{

			// 100% is not valid in maximo, so we need to
			// configure
			// FYI... offsetTop is only returned when the
			// style on the div is position:absolute or
			// position:relative (in
			// some
			// cases)
			// we minus 50, since there is extra padding in
			// maximo that causes
			// scrolling
			// 12-10712 negative values breaks in ie
			h = this._getHeightInPixels(h, mapElement);
			if (h <= 0)
			{
				h = 200;
			}
		}

		// we don't do the same for width, since maximo components are in TD
		// rows and the map inherits the row width.
		dojo.style(mapElement, {
			'width': w,
			'height': h
		});

		if (this.toolbar)
		{
			this.toolbar.updateToolbarWidth(w);
		}
		this.heightPx = parseInt(("" + h).match(/\d+/) || 0);

		
		this.widthPx = this._getWidthInPixels(w);

		if (this.map)
		{
			// 12-10810 - it is needed not only for the full
			// screen but also if the user resizes the screen
			// without fullscreen.
			this.map.resizeTo(w, h, this.widthPx, this.heightPx);
			// Issue 12-12704. If in fullscreen mode, the map div needs to be
			// resized differently

			if (this.fullScreenHelper)
			{
				this.fullScreenHelper.updateMapDimensions(w, h);
			}
		}

	},
	/**
	 * Converts values in % into actual pixel ones
	 */
	// Issue 12-10994. This variable is to compensate the toolbar height on the
	// first resize (because the toolbar is not created yet)
	// TODO: Use the actual toolbar height instead of this hardcoded number
	_dueToolbarHeight: 35,
	_dueDistances: 15,
	_getHeightInPixels: function(height, mapElement)
	{
		var h = height.substr(0, height.length - 1);
		var availableHorRegion = parseInt(dijit.getViewport().h - this.mapOffsetTop);
		var pct = parseInt(h);

		h = (availableHorRegion * (pct / 100.0));

		h -= (this._dueDistances + this._dueToolbarHeight);
		this._dueToolbarHeight = 0;

		return h;
	},
	
	_getWidthInPixels: function(w)
	{
		if (w.substr(w.length - 1, 1) == '%')
		{
			var mapElement = dojo.byId(this.divId);
			var widthPercentageStr = w.substr(0, w.length - 1);
			var availableHorRegion = parseInt(dijit.getViewport().w - this._getMapOffsetLeft());
			var widthPercentage = parseInt(widthPercentageStr);
			var width = (availableHorRegion * (widthPercentage / 100.0));
			width -= 15;
			return parseInt(("" + width).match(/\d+/) || 0);//
		}
		else
		{
			return parseInt(("" + w).match(/\d+/) || 0);//
		}
	},

	getCurrentRecordSetControl: function()
	{
		return this.currentRecordSetControl;
	},
	destroyRecursive: function()
	{
		this.userSessionManager.onMapExit();
		this.map.endPan.removeHandler(this.maximo.resetMaximoTimeout, this.maximo);
		if (this.markerRefresher)
		{
			this.markerRefresher.destroyRecursive();
			this.markerRefresher = null;
		}
		if (this.routeManager)
		{
			this.routeManager.destroyRecursive();
		}
		if (this.getMapstraction() != null)
		{
			this.destroyMap();
		}
		if (this.maximo)
		{
			this.maximo.destroyRecursive();
		}
		if (this.geocoder)
		{
			this.geocoder.destroyRecursive();
		}
		if (this.currentRecordSetControl)
		{
			this.currentRecordSetControl.destroyRecursive();
		}
		if (this.currentRecordMgr)
		{
			this.currentRecordMgr.destroyRecursive();
		}
		if (this.contextMenu)
		{
			this.contextMenu.destroyRecursive();
		}
		if (this.maptips)
		{
			this.maptips.destroyRecursive();
		}
		if (this.toolbar)
		{
			this.toolbar.destroyRecursive();
		}
		if (this.fullScreenHelper)
		{
			this.fullScreenHelper.destroyRecursive();
		}
		if (this.layersManager)
		{
			this.layersManager.destroyRecursive();
		}
		this.inherited(arguments);
	},
	destroyMap: function()
	{
		throw "To be implemented by provider";
	},

	fullScreenOn: function()
	{
		this.fullScreenHelper.fullScreenModeOn();
	},
	fullScreenOff: function()
	{
		this.fullScreenHelper.fullScreenModeOff();
	},
	getWidthInPixels: function()
	{
		var w = this.width;
		if (!this.width)
		{
			w = '100%';
		}
		this.widthPx = this._getWidthInPixels(w);
		return this.widthPx;

	},
	getHeightInPixels: function()
	{
		return this.heightPx;
	},
	/**
	 * If we failed to retrieve user location. The possible errors are:<br>
	 * code 1 - Permission denied, user did not allow to share his location<br>
	 * code 2 - Position unavailable, the position of the device could not be
	 * determined<br>
	 * code 3 - Timeout, device took too long (longer than the timeout
	 * specified) to return current location<br>
	 * code 4 - Geolocation not supported, this device does not support
	 * geolocation, this is a custom error code<br>
	 * 
	 * @see http://dev.w3.org/geo/api/spec-source.html#permission_denied_error
	 * @param error:
	 *            {code,message}
	 */
	failedToGetLocation: function()
	{
		var maximo = this.getMaximo();
		var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
		switch (myLocationInstance.getStatus())
		{
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
				maximo.showMessage("map", "curr_loc_perm_denied");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
				maximo.showMessage("map", "curr_loc_timeout");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
				maximo.showMessage("map", "curr_loc_position_unavailable");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
				maximo.showMessage("map", "curr_loc_not_supported");
				break;
			default:
				maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
		}
		;
	},
	failedToGetLocationStatusMessages: function()
	{
		var maximo = this.getMaximo();
		var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
		switch (myLocationInstance.getStatus())
		{
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
				maximo.showMessage("map", "curr_loc_perm_denied_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
				maximo.showMessage("map", "curr_loc_timeout_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
				maximo.showMessage("map", "curr_loc_position_unavailable_statusmsg");
				break;
			case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
				maximo.showMessage("map", "curr_loc_not_supported_statusmsg");
				break;
			default:
				maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
		}
		;
	},
	getLayersManager: function()
	{
		return this.layersManager;
	},
	_checkMapLoadedCorrectly: function()
	{
		// this is to allow async map services loading to check for errors.
	},
	/* mboInfo:{mxdata,gisdata,autolocatedata,lbsdata} */
	handlerMapping: {
		"onMoveEnd": "dragend"
	},
	centerOnMbo: function(mboInfo, zoomlevel)
	{
		var localgisdata = mboInfo.gisdata;
		if (mboInfo.autolocate != null)
		{
			localgisdata = mboInfo.autolocate.gisdata;
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("Center on  ", mboInfo.mxdata.mboName, localgisdata.lat, localgisdata.lng);
			console.log("Is autolocated ", mboInfo.autolocate != null);
		}
		var point = new mxn.LatLonPoint(localgisdata.lat, localgisdata.lng);

		if (mboInfo.gisdata.islbs == true)
		{
			point.sr = mxn.util.getWGS84WKID();
			var auxFct = function(/* array of projected points */points)
			{
				this._centerOnPoint(points[0], zoomlevel);
			};
			this.getMapstraction().getAllPointsFromWGS84([ point ], dojo.hitch(this, auxFct));
		}
		else
		{
			this._centerOnPoint(point, zoomlevel);
		}

	},
	_centerOnPoint: function(cp, zoomlevel)
	{

		if (zoomlevel)
		{
			this.getMapstraction().setCenterAndZoom(cp, zoomlevel);
		}
		else
		{
			this.getMapstraction().setCenter(cp);
		}

	},
	/*
	 * Removes the given MBO's marker from the map
	 */
	removeMboMarker: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			if (!layerId)
			{
				layerId = this.layersManager.getLayerIdForMbo(mboInfo);
				this.layersManager.removeRecord(mboInfo);
			}
			else
			{
				this.removeMboMarkerFromMap(mboInfo, layerId);
			}

		}
		else
		{
			console.warn("There was no marker for ", mboInfo);
		}
	},
	/*
	 * Removes the MBO from the map
	 */
	removeMboMarkerFromMap: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			console.log("[%% mxmap.Map.removeMboMarkerFromMap]", layerId, " mbo=" + mboInfo.mxdata.mboName + "," + mboInfo.mxdata.uid.value + " removing marker");
			info.isOnMap = false;
			this.getMapstraction().removeMarker(info.marker);
			if (info.lbsCircle || info.lbsMarker)
			{
				this.getMapstraction().removePolyline(info.lbsCircle);
				this.getMapstraction().removeMarker(info.lbsMarker);
			}
			info = {};
		}
		else
		{
			console.warn("no marker for ", mboInfo);
		}
	},
	/*
	 * If the given MBO has been previously added to the map, show its marker
	 * using the stored marker options.
	 */
	showMboMarker: function(mboInfo, layerId)
	{
		var info = this._getMboMarkerInfo(mboInfo, layerId);
		if (info != null)
		{
			info.isOnMap = true;
			this.addMboMarker(mboInfo, info.markerOptions, layerId);
		}
	},
	/*
	 * Adds the MBO to its default layer (based on type).
	 */
	addMboToLayerManager: function(mboInfo, markerOptions)
	{
		this.layersManager.addRecord(mboInfo, markerOptions);
	},
	/*
	 * Removes the MBO from its default layer (based on type).
	 */
	removeMboFromLayerManager: function(mboInfo)
	{
		this.layersManager.removeRecord(mboInfo);
	},
	/*
	 * Adds a reference to the given MBO, and if this is the first reference
	 * also creates a marker for it using the given marker options.
	 */
	addMboMarker: function(mboInfo, options, layerId)
	{
		var localgisdata = mboInfo.gisdata;
		if (mboInfo.autolocate != null)
		{
			localgisdata = mboInfo.autolocate.gisdata;
		}

		// console.log("Adding ", mboInfo.mxdata.mboName, localgisdata.lat,
		// localgisdata.lng);
		// console.log("Is autolocated ", mboInfo.autolocate != null);

		var point = new mxn.LatLonPoint(localgisdata.lat, localgisdata.lng);
		if (localgisdata.islbs == true)
		{
			// must be sure to conver the WGS point into the current coord
			// system
			point.sr = mxn.util.getWGS84WKID();
			var succFct = function(pointInCurrentSR)
			{
				this._createMarker(mboInfo, options, pointInCurrentSR[0], layerId);
			};
			var errFct = function(err)
			{
				console.error("Error converting point to current SR", err);
			};

			this.getMapstraction().getAllPointsFromWGS84([ point ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));

		}
		else
		{
			this._createMarker(mboInfo, options, point, layerId);
		}

	},
	/*
	 * Creates a marker in the map for the given MBO, with the given marker
	 * options, in the given point.
	 */
	_createMarker: function(mboInfo, options, point, layerId)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[Map._createMarker] Beginning");
		}
		var marker = new mxn.Marker(point);
		if (options && options.events)
		{
			for ( var eventName in options.events)
			{
				var eventFtc = options.events[eventName];
				var mapstractioEventName = this.handlerMapping[eventName];
				marker[mapstractioEventName].addHandler(eventFtc);
			}
		}

		var draggable = true;
		if (mboInfo.gisdata.flags.readonly == true)
		{
			draggable = false;
		}
		else if (this.isMapViewOnly() == true)
		{
			draggable = false;
		}
		else if (options && options.draggable)
		{
			draggable = options.draggable;
		}

		if (mboInfo.gisdata.islbs == true && mboInfo.lbsdata && mboInfo.gisdata.lat != null)
		{
			var accuracyMarker = this._addLBSAccuracyMarker(mboInfo.lbsdata, point);
			var circle = this._addLBSAccuracyCircle(mboInfo.lbsdata, point);

			this._updateMboMarkerHash(mboInfo, {
				lbsMarker: accuracyMarker,
				lbsCircle: circle
			}, layerId);

		}
		var color = options ? options.color : "#ffffff";
		var symbol = this.getSymbologyManager().getLegendForObject(mboInfo, color);
		var icon = symbol.url;
		var tooltip = "";
		if (options && options.tooltip)
		{
			tooltip = options.tooltip;
		}

		var markerdata = {
			infoBubble: "FWMMAPTIPS",
			label: null,
			tooltip: tooltip,
			marker: 4,
			icon: icon,
			iconSize: [ symbol.width, symbol.height ],
			iconAnchor: [ symbol.offsetx, symbol.offsety ],
			draggable: draggable,
			hover: false
		};
		if (options != null)
		{
			markerdata.label = options.label;
			markerdata.hover = options.hover;
		}
		this.getMapstraction().addMarkerWithData(marker, markerdata);
		console.log("[mxmap.Map._createMarker] mbo=" + mboInfo.mxdata.mboName + "," + mboInfo.mxdata.uid.value + " creating marker");

		this.getMapTipsManager().enableMarker(marker, mboInfo.mxdata);

		this._updateMboMarkerHash(mboInfo, {
			isOnMap: true,
			marker: marker,
			markerOptions: options
		}, layerId);
		if (options && options.markerReferenceCallback)
		{
			try
			{
				options.markerReferenceCallback(marker);
			}
			catch (e)
			{
				console.error("cannot call reference ftc", e);
			}
		}
	},
	/*
	 * Stores a reference for the given MBO with the given options. If a
	 * reference already exists, updates all of its properties with the given
	 * ones.
	 */
	_updateMboMarkerHash: function(mboInfo, opt, layerId)
	{
		return this.layersManager.setMboMarkerInfo(mboInfo, opt, layerId);
	},
	/*
	 * Returns the stored info for the given MBO.
	 */
	_getMboMarkerInfo: function(mboInfo, layerId)
	{
		return this.layersManager.getMboMarkerInfo(mboInfo, layerId);
	},
	/**
	 * in order to place several markers at once, can improve performance by
	 * using this method
	 */
	showAllMboRecords: function(mboInfoArray, options, zoom)
	{
		if (!mboInfoArray || mboInfoArray.length == 0)
		{
			return;
		}
		for ( var index in mboInfoArray)
		{
			this.addMboToLayerManager(mboInfoArray[index]);
		}
		if (zoom == true)
		{
			this.zoomToMbos(mboInfoArray);
		}

	},
	/**
	 * Forces zoom to cover all the current records on the map.
	 */
	zoomToMbos: function(mboInfoArray)
	{
		if (!mboInfoArray || mboInfoArray.length == 0)
		{
			return;
		}
		if (mboInfoArray && mboInfoArray.length == 1)
		{
			this.centerOnMbo(mboInfoArray[0]);
		}
		else
		{
			this.map.autoCenterAndZoom();
		}
	},
	_addLBSAccuracyCircle: function(lbsdata, point)
	{
		console.log("LBS", lbsdata, lbsdata.max_accuracy_state);
		if ("EXCEEDED_TOLERANCE" !== lbsdata.max_accuracy_state)
		{
			var circle = new mxn.Radius(point, 10);
			var radiusInKms = (lbsdata.location_accuracy / 1000);
			var lbsCircle = circle.getPolyline(radiusInKms, "#C6DBEB");
			this.getMapstraction().addPolylineWithData(lbsCircle, {
				centerPoint: point,
				width: 3,
				opacity: 0.5,
				fillColor: "#D0E0EC",
				closed: true,
				radiusInKMs: radiusInKms
			});
		}
		else
		{
			console.log("accuracy exceeded tolerance");
		}
		return lbsCircle;
	},
	_addLBSAccuracyMarker: function(lbsdata, point)
	{
		var accuracyMarker = new mxn.Marker(point);
		var accuracyMarkerInfo = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getLBSMarkerImageInfo(lbsdata);
		var markerdata2 = {
			infoBubble: "",
			label: null,// nothing specified in spec.
			marker: 4,
			icon: accuracyMarkerInfo.getImageURL(),
			iconSize: accuracyMarkerInfo.getImageSize(),
			iconAnchor: accuracyMarkerInfo.getImageAnchor(),
			draggable: false,
			hover: false
		};
		this.getMapstraction().addMarkerWithData(accuracyMarker, markerdata2);
		return accuracyMarker;
	},
	enableTraffic: function()
	{
		this.getMapstraction().toggleTraffic(true);
	},
	disableTraffic: function()
	{
		this.getMapstraction().toggleTraffic(false);
	},
	enableRoutes: function()
	{
		if (this.getMultipleRoutesManager())
		{
			this.getMultipleRoutesManager().showRoutesAndCalculatedMarkers();
		}
	},
	disableRoutes: function()
	{
		this.getMultipleRoutesManager().hideRoutesAndCalculatedMarkers();
	},
	disableActions: function()
	{
		this._actionsAreEnabled = false;
	},

	enableActions: function()
	{
		this._actionsAreEnabled = true;
	},
	isMapViewOnly: function()
	{
		var confs = this.mapConf.inputConfs;
		if (confs != null && confs.mapviewonly != null)
		{
			return confs.mapviewonly == "1" || confs.mapviewonly == "true";
		}
		// map default is read only
		return true;
	},
	allowsTrafficLayer: function()
	{
		return true;
	},
	getDefaultLengthUnit: function()
	{
		return this.mapConf.lengthunit;
	},
	/**
	 * when map is ina section and it just got expanded we force map to refresh
	 * its data.
	 */
	_mapSectionExpanded: function()
	{
		this.enableActions();
		var showdirectionsonload = false;
		if (this.routeConf && this.routeConf.showdirectionsonload == true)
		{
			showdirectionsonload = true;
		}
		// this.refreshRoute(true, showdirectionsonload);
		// Issue 12-13542. The line below shouldn't have been commented out.
		this._resize();
		var refreshOptions = {
				zoom: true,
				disableMsgs: false,
				automatic: false
			};
		this.refreshMap(refreshOptions);
		if (this._sectionExpaded == false)
		{
			this.centerAndZoomMap();
			this._sectionExpaded = true;
		}
	},
	getInitialLocationCustomInfo: function()
	{
		return {};
	},
	autoRefreshMap: function()
	{
		var refreshOptions = {
			zoom: false,
			disableMsgs: true,
			automatic: true
		};
		this.refreshMap(refreshOptions);
	},
	_getMapOffsetLeft: function()
	{
		var mapDiv = dojo.byId(this.divId);
		return mapDiv.offsetLeft;
	}

});

});

},
'dijit/_base':function(){
define("dijit/_base", [
	".",
	"./a11y",	// used to be in dijit/_base/manager
	"./WidgetSet",	// used to be in dijit/_base/manager
	"./_base/focus",
	"./_base/manager",
	"./_base/place",
	"./_base/popup",
	"./_base/scroll",
	"./_base/sniff",
	"./_base/typematic",
	"./_base/wai",
	"./_base/window"
], function(dijit){

	// module:
	//		dijit/_base
	// summary:
	//		Includes all the modules in dijit/_base

	return dijit._base;
});

},
'dijit/_base/typematic':function(){
define("dijit/_base/typematic", ["../typematic"], function(){
	// for back-compat, just loads top level module
});

},
'dojo/window':function(){
define("dojo/window", ["./_base/lang", "./_base/sniff", "./_base/window", "./dom", "./dom-geometry", "./dom-style"],
	function(lang, has, baseWindow, dom, geom, style) {

// module:
//		dojo/window
// summary:
//		TODOC

var window = lang.getObject("dojo.window", true);

/*=====
dojo.window = {
	// summary:
	//		TODO
};
window = dojo.window;
=====*/

window.getBox = function(){
	// summary:
	//		Returns the dimensions and scroll position of the viewable area of a browser window

	var
		scrollRoot = (baseWindow.doc.compatMode == 'BackCompat') ? baseWindow.body() : baseWindow.doc.documentElement,
		// get scroll position
		scroll = geom.docScroll(), // scrollRoot.scrollTop/Left should work
		w, h;

	if(has("touch")){ // if(scrollbars not supported)
		var uiWindow = baseWindow.doc.parentWindow || baseWindow.doc.defaultView;   // use UI window, not dojo.global window. baseWindow.doc.parentWindow probably not needed since it's not defined for webkit
		// on mobile, scrollRoot.clientHeight <= uiWindow.innerHeight <= scrollRoot.offsetHeight, return uiWindow.innerHeight
		w = uiWindow.innerWidth || scrollRoot.clientWidth; // || scrollRoot.clientXXX probably never evaluated
		h = uiWindow.innerHeight || scrollRoot.clientHeight;
	}else{
		// on desktops, scrollRoot.clientHeight <= scrollRoot.offsetHeight <= uiWindow.innerHeight, return scrollRoot.clientHeight
		// uiWindow.innerWidth/Height includes the scrollbar and cannot be used
		w = scrollRoot.clientWidth;
		h = scrollRoot.clientHeight;
	}
	return {
		l: scroll.x,
		t: scroll.y,
		w: w,
		h: h
	};
};

window.get = function(doc){
	// summary:
	// 		Get window object associated with document doc

	// In some IE versions (at least 6.0), document.parentWindow does not return a
	// reference to the real window object (maybe a copy), so we must fix it as well
	// We use IE specific execScript to attach the real window reference to
	// document._parentWindow for later use
	if(has("ie") && window !== document.parentWindow){
		/*
		In IE 6, only the variable "window" can be used to connect events (others
		may be only copies).
		*/
		doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
		//to prevent memory leak, unset it after use
		//another possibility is to add an onUnload handler which seems overkill to me (liucougar)
		var win = doc._parentWindow;
		doc._parentWindow = null;
		return win;	//	Window
	}

	return doc.parentWindow || doc.defaultView;	//	Window
};

window.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
	// summary:
	//		Scroll the passed node into view, if it is not already.

	// don't rely on node.scrollIntoView working just because the function is there

	try{ // catch unexpected/unrecreatable errors (#7808) since we can recover using a semi-acceptable native method
		node = dom.byId(node);
		var doc = node.ownerDocument || baseWindow.doc,
			body = doc.body || baseWindow.body(),
			html = doc.documentElement || body.parentNode,
			isIE = has("ie"), isWK = has("webkit");
		// if an untested browser, then use the native method
		if((!(has("mozilla") || isIE || isWK || has("opera")) || node == body || node == html) && (typeof node.scrollIntoView != "undefined")){
			node.scrollIntoView(false); // short-circuit to native if possible
			return;
		}
		var backCompat = doc.compatMode == 'BackCompat',
			clientAreaRoot = (isIE >= 9 && node.ownerDocument.parentWindow.frameElement)
				? ((html.clientHeight > 0 && html.clientWidth > 0 && (body.clientHeight == 0 || body.clientWidth == 0 || body.clientHeight > html.clientHeight || body.clientWidth > html.clientWidth)) ? html : body)
				: (backCompat ? body : html),
			scrollRoot = isWK ? body : clientAreaRoot,
			rootWidth = clientAreaRoot.clientWidth,
			rootHeight = clientAreaRoot.clientHeight,
			rtl = !geom.isBodyLtr(),
			nodePos = pos || geom.position(node),
			el = node.parentNode,
			isFixed = function(el){
				return ((isIE <= 6 || (isIE && backCompat))? false : (style.get(el, 'position').toLowerCase() == "fixed"));
			};
		if(isFixed(node)){ return; } // nothing to do

		while(el){
			if(el == body){ el = scrollRoot; }
			var elPos = geom.position(el),
				fixedPos = isFixed(el);

			if(el == scrollRoot){
				elPos.w = rootWidth; elPos.h = rootHeight;
				if(scrollRoot == html && isIE && rtl){ elPos.x += scrollRoot.offsetWidth-elPos.w; } // IE workaround where scrollbar causes negative x
				if(elPos.x < 0 || !isIE){ elPos.x = 0; } // IE can have values > 0
				if(elPos.y < 0 || !isIE){ elPos.y = 0; }
			}else{
				var pb = geom.getPadBorderExtents(el);
				elPos.w -= pb.w; elPos.h -= pb.h; elPos.x += pb.l; elPos.y += pb.t;
				var clientSize = el.clientWidth,
					scrollBarSize = elPos.w - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.w = clientSize;
					elPos.x += (rtl && (isIE || el.clientLeft > pb.l/*Chrome*/)) ? scrollBarSize : 0;
				}
				clientSize = el.clientHeight;
				scrollBarSize = elPos.h - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.h = clientSize;
				}
			}
			if(fixedPos){ // bounded by viewport, not parents
				if(elPos.y < 0){
					elPos.h += elPos.y; elPos.y = 0;
				}
				if(elPos.x < 0){
					elPos.w += elPos.x; elPos.x = 0;
				}
				if(elPos.y + elPos.h > rootHeight){
					elPos.h = rootHeight - elPos.y;
				}
				if(elPos.x + elPos.w > rootWidth){
					elPos.w = rootWidth - elPos.x;
				}
			}
			// calculate overflow in all 4 directions
			var l = nodePos.x - elPos.x, // beyond left: < 0
				t = nodePos.y - Math.max(elPos.y, 0), // beyond top: < 0
				r = l + nodePos.w - elPos.w, // beyond right: > 0
				bot = t + nodePos.h - elPos.h; // beyond bottom: > 0
			if(r * l > 0){
				var s = Math[l < 0? "max" : "min"](l, r);
				if(rtl && ((isIE == 8 && !backCompat) || isIE >= 9)){ s = -s; }
				nodePos.x += el.scrollLeft;
				el.scrollLeft += s;
				nodePos.x -= el.scrollLeft;
			}
			if(bot * t > 0){
				nodePos.y += el.scrollTop;
				el.scrollTop += Math[t < 0? "max" : "min"](t, bot);
				nodePos.y -= el.scrollTop;
			}
			el = (el != scrollRoot) && !fixedPos && el.parentNode;
		}
	}catch(error){
		console.error('scrollIntoView: ' + error);
		node.scrollIntoView(false);
	}
};

return window;
});

},
'dijit/_FocusMixin':function(){
define("dijit/_FocusMixin", [
	"./focus",
	"./_WidgetBase",
	"dojo/_base/declare", // declare
	"dojo/_base/lang" // lang.extend
], function(focus, _WidgetBase, declare, lang){

/*=====
	var _WidgetBase = dijit._WidgetBase;
=====*/

	// module:
	//		dijit/_FocusMixin
	// summary:
	//		Mixin to widget to provide _onFocus() and _onBlur() methods that
	//		fire when a widget or it's descendants get/lose focus

	// We don't know where _FocusMixin will occur in the inheritance chain, but we need the _onFocus()/_onBlur() below
	// to be last in the inheritance chain, so mixin to _WidgetBase.
	lang.extend(_WidgetBase, {
		// focused: [readonly] Boolean
		//		This widget or a widget it contains has focus, or is "active" because
		//		it was recently clicked.
		focused: false,

		onFocus: function(){
			// summary:
			//		Called when the widget becomes "active" because
			//		it or a widget inside of it either has focus, or has recently
			//		been clicked.
			// tags:
			//		callback
		},

		onBlur: function(){
			// summary:
			//		Called when the widget stops being "active" because
			//		focus moved to something outside of it, or the user
			//		clicked somewhere outside of it, or the widget was
			//		hidden.
			// tags:
			//		callback
		},

		_onFocus: function(){
			// summary:
			//		This is where widgets do processing for when they are active,
			//		such as changing CSS classes.  See onFocus() for more details.
			// tags:
			//		protected
			this.onFocus();
		},

		_onBlur: function(){
			// summary:
			//		This is where widgets do processing for when they stop being active,
			//		such as changing CSS classes.  See onBlur() for more details.
			// tags:
			//		protected
			this.onBlur();
		}
	});

	return declare("dijit._FocusMixin", null, {
		// summary:
		//		Mixin to widget to provide _onFocus() and _onBlur() methods that
		//		fire when a widget or it's descendants get/lose focus

		// flag that I want _onFocus()/_onBlur() notifications from focus manager
		_focusManager: focus
	});

});

},
'dijit/_WidgetsInTemplateMixin':function(){
define("dijit/_WidgetsInTemplateMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/parser", // parser.parse
	"dijit/registry"	// registry.findWidgets
], function(array, declare, parser, registry){

	// module:
	//		dijit/_WidgetsInTemplateMixin
	// summary:
	//		Mixin to supplement _TemplatedMixin when template contains widgets

	return declare("dijit._WidgetsInTemplateMixin", null, {
		// summary:
		//		Mixin to supplement _TemplatedMixin when template contains widgets

		// _earlyTemplatedStartup: Boolean
		//		A fallback to preserve the 1.0 - 1.3 behavior of children in
		//		templates having their startup called before the parent widget
		//		fires postCreate. Defaults to 'false', causing child widgets to
		//		have their .startup() called immediately before a parent widget
		//		.startup(), but always after the parent .postCreate(). Set to
		//		'true' to re-enable to previous, arguably broken, behavior.
		_earlyTemplatedStartup: false,

		// widgetsInTemplate: [protected] Boolean
		//		Should we parse the template to find widgets that might be
		//		declared in markup inside it?  (Remove for 2.0 and assume true)
		widgetsInTemplate: true,

		_beforeFillContent: function(){
			if(this.widgetsInTemplate){
				// Before copying over content, instantiate widgets in template
				var node = this.domNode;

				var cw = (this._startupWidgets = parser.parse(node, {
					noStart: !this._earlyTemplatedStartup,
					template: true,
					inherited: {dir: this.dir, lang: this.lang, textDir: this.textDir},
					propsThis: this,	// so data-dojo-props of widgets in the template can reference "this" to refer to me
					scope: "dojo"	// even in multi-version mode templates use dojoType/data-dojo-type
				}));

				this._supportingWidgets = registry.findWidgets(node);

				this._attachTemplateNodes(cw, function(n,p){
					return n[p];
				});
			}
		},

		startup: function(){
			array.forEach(this._startupWidgets, function(w){
				if(w && !w._started && w.startup){
					w.startup();
				}
			});
			this.inherited(arguments);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/MarkerImageInfo':function(){
// wrapped by build app
define(["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.MarkerImageInfo");

/**
 * Holds information for a Marker Image.
 * 
 * Constructor params:
 * 
 * ibm.tivoli.fwm.mxmap.MarkerImageInfo({
 * 											imageUrl: string (required), 
 * 											imageSize: [Integer, Integer] (optional), 
 * 											imageAnchor: [Integer] (optional)
 * 										})
 */
dojo.declare("ibm.tivoli.fwm.mxmap.MarkerImageInfo", null, {
	_imageSize: null,
	_imageAnchor: null,
	_imageURL: null,
	constructor : function(options) {
		dojo.mixin(this, options);		
		this._imageSize = options.imageSize || [32,32];
		this._imageAnchor = options.imageAnchor || [0,32];
		this._imageURL = options.imageUrl || "";
	},
	getImageSize: function()
	{
		return this._imageSize;
	},
	getImageAnchor: function()
	{
		return this._imageAnchor;
	},
	getImageURL: function()
	{
		return this._imageURL;
	},
	getSymbolURL: function()
	{
		return this._imageURL;
	},
	setImageURL: function(newURL)
	{
		this._imageURL = newURL;
	},
	generateMarkerData:function(label,draggable,hover){
		return {
		label : label,
		draggable : true==draggable,
		icon : this.getImageURL(),
		iconSize : this.getImageSize(),
		iconAnchor : this.getImageAnchor(),
		hover : true==hover
		};			
	}
});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ToolbarManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/Toolbar,ibm/tivoli/fwm/mxmap/toolbar/ToolbarSeparator"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.Toolbar");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator");
/**
 * Controls the toolbar actions
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager",
		 [ ibm.tivoli.fwm.mxmap._Base], {
			gisdata: null,
			mxdata: null,
			map: null,			
			items:[],
			_defaultItems: [],
			toolbarItems:null,
			toolbarDivElement: null,
			// TODO: Use the actual toolbar height instead of this hardcoded number
			_toolbarHeight: 35,
			
			/**
			 * Subscribes to the server updates to the current record
			 */
			constructor: function(options)
			{
				dojo.mixin(this, options);
				this.toolbarItems = [];
				this._defaultItems = ['RefresherTool','FullScreen'];
				// ['FullScreen','RefresherTool','MyLocationTool','ItineraryTool','QueryUnassignedWorkTool','QueryNearResources', 'LayersTool'];
				//if(this.map.isMobile == true){
					//this._defaultItems.push('MobileInfoPanel');
				//}
			},
			postCreate: function(){
				this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_"+this.map.getId(),
						dojo.hitch(this, this.serverUpdated)));
			},
			container:null,
			toolbar:null,
			startup:function(){		
				var borderBottomStyle = dojo.isIE ? '1px solid #AAA' : '0px solid #AAA';
				this.container = dojo.create("div", {
							id: this.map.divId + "_toolbar",
							style: {
								width: this.map.getWidthInPixels(),
								whiteSpace: 'normal',
								'background-color': '#FFFFFF',
								'border':'1px solid #AAA',
								'border-bottom-color':'black','display':'block',
								'borderBottom' : borderBottomStyle
							}
						}, dojo.byId(this.map.divId), 'before');
				var div = dojo.create("div", {
							style: {
								width: this.map.getWidthInPixels()
							}							
						}, this.container);
				/* 12-10553 - toolbar must have height set in the style */
				this.toolbar = new dijit.Toolbar(/* Object? */ {style: {width: '100%', 'border':'0','background-position-y':'4%'}, splitter: "true"}, /* DomNode|String */div);				
				
				var me = this;
				
				var mapid = this.map.getId();				
				var createItemButton = function(item){
					if(item == "sep"){
						var d = new ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator();
						me.toolbar.addChild(d);
						
					}else{
						var dijitName ="ibm.tivoli.fwm.mxmap.toolbar.ext."+item;
	
						var reqStr = "dojo." + "require('" + dijitName+ "')"; // breaking up dojo. and require necessary to fool the dojo parser!						
						try{
							eval(reqStr);
						}catch (e) {
								console.error("cannot load tool",e);
								return;
						}
						
						this.map=me.map;// breaking up dojo. and require necessary to fool the dojo parser!
						
						var itemDijitStr = "this.itemDojo = new ibm.tivoli.fwm.mxmap.toolbar.ext."+item+"({map:this.map})";// breaking up dojo. and require necessary to fool the dojo parser!
						dojo.eval(itemDijitStr);
						var itemDojo=this.itemDojo;// breaking up dojo. and require necessary to fool the dojo parser!
						
						var button = itemDojo.createToolbarButton();						
						var clickListener = function(){						
							if(me.lastItemClicked){
			            		me.lastItemClicked.disable();
			            	}
			            	dojo.publish("mxnToolbarClicked_"+mapid,[item]);
			            	me.lastItemClicked=itemDojo;
						};
						me.addSubscription(dojo.connect(button,"onClick",me,clickListener));
	
				        me.toolbar.addChild(button);
				        me.toolbarItems.push(itemDojo);
					}					
				};
				if(this.items==null || this.items.length==0){					
					console.log("Default toolbar items",this._defaultItems);
					dojo.forEach(this._defaultItems, createItemButton);
				}else{
					console.log("Toolbar items",this.items);
					dojo.forEach(this.items, createItemButton);
				}
				// toolbar div is necessary for the full screen feature
				this.toolbarDivElement = this.container;				
			},
			lastItemClicked:null,
			serverUpdated: function()
			{
				this.mxdata = data.mxdata;
				this.gisdata = data.gisdata;
			},
			destroyRecursive: function(){
				this.inherited(arguments);
				dojo.forEach(this.toolbarItems, function(item){										
					item.destroy();					
				});
				this.toolbar.destroy();
				dojo.empty(this.container);
			},
			getToolbarDivElement: function(){				
				return this.toolbarDivElement;
			},
			updateToolbarWidth: function(newWidth)
			{
				dojo.style(this.toolbarDivElement, {width: newWidth});
			},
			getToolbarHeight: function()
			{
				return this._toolbarHeight;
			}
		});
});

},
'dojo/data/util/sorter':function(){
define("dojo/data/util/sorter", ["dojo/_base/lang"], function(lang) {
	// module:
	//		dojo/data/util/sorter
	// summary:
	//		TODOC

var sorter = lang.getObject("dojo.data.util.sorter", true);

sorter.basicComparator = function(	/*anything*/ a,
													/*anything*/ b){
	//	summary:
	//		Basic comparision function that compares if an item is greater or less than another item
	//	description:
	//		returns 1 if a > b, -1 if a < b, 0 if equal.
	//		'null' values (null, undefined) are treated as larger values so that they're pushed to the end of the list.
	//		And compared to each other, null is equivalent to undefined.

	//null is a problematic compare, so if null, we set to undefined.
	//Makes the check logic simple, compact, and consistent
	//And (null == undefined) === true, so the check later against null
	//works for undefined and is less bytes.
	var r = -1;
	if(a === null){
		a = undefined;
	}
	if(b === null){
		b = undefined;
	}
	if(a == b){
		r = 0;
	}else if(a > b || a == null){
		r = 1;
	}
	return r; //int {-1,0,1}
};

sorter.createSortFunction = function(	/* attributes array */sortSpec, /*dojo.data.core.Read*/ store){
	//	summary:
	//		Helper function to generate the sorting function based off the list of sort attributes.
	//	description:
	//		The sort function creation will look for a property on the store called 'comparatorMap'.  If it exists
	//		it will look in the mapping for comparisons function for the attributes.  If one is found, it will
	//		use it instead of the basic comparator, which is typically used for strings, ints, booleans, and dates.
	//		Returns the sorting function for this particular list of attributes and sorting directions.
	//
	//	sortSpec: array
	//		A JS object that array that defines out what attribute names to sort on and whether it should be descenting or asending.
	//		The objects should be formatted as follows:
	//		{
	//			attribute: "attributeName-string" || attribute,
	//			descending: true|false;   // Default is false.
	//		}
	//	store: object
	//		The datastore object to look up item values from.
	//
	var sortFunctions=[];

	function createSortFunction(attr, dir, comp, s){
		//Passing in comp and s (comparator and store), makes this
		//function much faster.
		return function(itemA, itemB){
			var a = s.getValue(itemA, attr);
			var b = s.getValue(itemB, attr);
			return dir * comp(a,b); //int
		};
	}
	var sortAttribute;
	var map = store.comparatorMap;
	var bc = sorter.basicComparator;
	for(var i = 0; i < sortSpec.length; i++){
		sortAttribute = sortSpec[i];
		var attr = sortAttribute.attribute;
		if(attr){
			var dir = (sortAttribute.descending) ? -1 : 1;
			var comp = bc;
			if(map){
				if(typeof attr !== "string" && ("toString" in attr)){
					 attr = attr.toString();
				}
				comp = map[attr] || bc;
			}
			sortFunctions.push(createSortFunction(attr,
				dir, comp, store));
		}
	}
	return function(rowA, rowB){
		var i=0;
		while(i < sortFunctions.length){
			var ret = sortFunctions[i++](rowA, rowB);
			if(ret !== 0){
				return ret;//int
			}
		}
		return 0; //int
	}; // Function
};

return sorter;
});

},
'dijit/form/_ButtonMixin':function(){
define("dijit/form/_ButtonMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/_base/event", // event.stop
	"../registry"		// registry.byNode
], function(declare, dom, event, registry){

// module:
//		dijit/form/_ButtonMixin
// summary:
//		A mixin to add a thin standard API wrapper to a normal HTML button

return declare("dijit.form._ButtonMixin", null, {
	// summary:
	//		A mixin to add a thin standard API wrapper to a normal HTML button
	// description:
	//		A label should always be specified (through innerHTML) or the label attribute.
	//		Attach points:
	//			focusNode (required): this node receives focus
	//			valueNode (optional): this node's value gets submitted with FORM elements
	//			containerNode (optional): this node gets the innerHTML assignment for label
	// example:
	// |	<button data-dojo-type="dijit.form.Button" onClick="...">Hello world</button>
	//
	// example:
	// |	var button1 = new dijit.form.Button({label: "hello world", onClick: foo});
	// |	dojo.body().appendChild(button1.domNode);

	// label: HTML String
	//		Content to display in button.
	label: "",

	// type: [const] String
	//		Type of button (submit, reset, button, checkbox, radio)
	type: "button",

	_onClick: function(/*Event*/ e){
		// summary:
		//		Internal function to handle click actions
		if(this.disabled){
			event.stop(e);
			return false;
		}
		var preventDefault = this.onClick(e) === false; // user click actions
		if(!preventDefault && this.type == "submit" && !(this.valueNode||this.focusNode).form){ // see if a non-form widget needs to be signalled
			for(var node=this.domNode; node.parentNode; node=node.parentNode){
				var widget=registry.byNode(node);
				if(widget && typeof widget._onSubmit == "function"){
					widget._onSubmit(e);
					preventDefault = true;
					break;
				}
			}
		}
		if(preventDefault){
			e.preventDefault();
		}
		return !preventDefault;
	},

	postCreate: function(){
		this.inherited(arguments);
		dom.setSelectable(this.focusNode, false);
	},

	onClick: function(/*Event*/ /*===== e =====*/){
		// summary:
		//		Callback for when button is clicked.
		//		If type="submit", return true to perform submit, or false to cancel it.
		// type:
		//		callback
		return true;		// Boolean
	},

	_setLabelAttr: function(/*String*/ content){
		// summary:
		//		Hook for set('label', ...) to work.
		// description:
		//		Set the label (text) of the button; takes an HTML string.
		this._set("label", content);
		(this.containerNode||this.focusNode).innerHTML = content;
	}
});

});

},
'ibm/tivoli/fwm/i18n':function(){
// wrapped by build app
define(["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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

});

},
'ibm/tivoli/fwm/mxmap/_Base':function(){
// wrapped by build app
define(["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap._Base");
/**
 * Base dojo object to help for cleaning up subscribe/unsubscribe,
 * connect/disconnect and map handlers
 */
dojo.declare("ibm.tivoli.fwm.mxmap._Base", null, {
	_handlers : null,
	constructor : function(options) {
		this._handlers = [];
	},
	addSubscription : function(handler) {
		this._handlers.push(handler);
	},

	destroyRecursive : function() {
		var h;
		while ((h = this._handlers.pop())) {
			dojo.unsubscribe(h);
		}
	}

});
});

},
'dijit/registry':function(){
define("dijit/registry", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/sniff", // has("ie")
	"dojo/_base/unload", // unload.addOnWindowUnload
	"dojo/_base/window", // win.body
	"."	// dijit._scopeName
], function(array, has, unload, win, dijit){

	// module:
	//		dijit/registry
	// summary:
	//		Registry of existing widget on page, plus some utility methods.
	//		Must be accessed through AMD api, ex:
	//		require(["dijit/registry"], function(registry){ registry.byId("foo"); })

	var _widgetTypeCtr = {}, hash = {};

	var registry =  {
		// summary:
		//		A set of widgets indexed by id

		length: 0,

		add: function(/*dijit._Widget*/ widget){
			// summary:
			//		Add a widget to the registry. If a duplicate ID is detected, a error is thrown.
			//
			// widget: dijit._Widget
			//		Any dijit._Widget subclass.
			if(hash[widget.id]){
				throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
			}
			hash[widget.id] = widget;
			this.length++;
		},

		remove: function(/*String*/ id){
			// summary:
			//		Remove a widget from the registry. Does not destroy the widget; simply
			//		removes the reference.
			if(hash[id]){
				delete hash[id];
				this.length--;
			}
		},

		byId: function(/*String|Widget*/ id){
			// summary:
			//		Find a widget by it's id.
			//		If passed a widget then just returns the widget.
			return typeof id == "string" ? hash[id] : id;	// dijit._Widget
		},

		byNode: function(/*DOMNode*/ node){
			// summary:
			//		Returns the widget corresponding to the given DOMNode
			return hash[node.getAttribute("widgetId")]; // dijit._Widget
		},

		toArray: function(){
			// summary:
			//		Convert registry into a true Array
			//
			// example:
			//		Work with the widget .domNodes in a real Array
			//		|	array.map(dijit.registry.toArray(), function(w){ return w.domNode; });

			var ar = [];
			for(var id in hash){
				ar.push(hash[id]);
			}
			return ar;	// dijit._Widget[]
		},

		getUniqueId: function(/*String*/widgetType){
			// summary:
			//		Generates a unique id for a given widgetType

			var id;
			do{
				id = widgetType + "_" +
					(widgetType in _widgetTypeCtr ?
						++_widgetTypeCtr[widgetType] : _widgetTypeCtr[widgetType] = 0);
			}while(hash[id]);
			return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id; // String
		},

		findWidgets: function(/*DomNode*/ root){
			// summary:
			//		Search subtree under root returning widgets found.
			//		Doesn't search for nested widgets (ie, widgets inside other widgets).

			var outAry = [];

			function getChildrenHelper(root){
				for(var node = root.firstChild; node; node = node.nextSibling){
					if(node.nodeType == 1){
						var widgetId = node.getAttribute("widgetId");
						if(widgetId){
							var widget = hash[widgetId];
							if(widget){	// may be null on page w/multiple dojo's loaded
								outAry.push(widget);
							}
						}else{
							getChildrenHelper(node);
						}
					}
				}
			}

			getChildrenHelper(root);
			return outAry;
		},

		_destroyAll: function(){
			// summary:
			//		Code to destroy all widgets and do other cleanup on page unload

			// Clean up focus manager lingering references to widgets and nodes
			dijit._curFocus = null;
			dijit._prevFocus = null;
			dijit._activeStack = [];

			// Destroy all the widgets, top down
			array.forEach(registry.findWidgets(win.body()), function(widget){
				// Avoid double destroy of widgets like Menu that are attached to <body>
				// even though they are logically children of other widgets.
				if(!widget._destroyed){
					if(widget.destroyRecursive){
						widget.destroyRecursive();
					}else if(widget.destroy){
						widget.destroy();
					}
				}
			});
		},

		getEnclosingWidget: function(/*DOMNode*/ node){
			// summary:
			//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
			//		the node is not contained within the DOM tree of any widget
			while(node){
				var id = node.getAttribute && node.getAttribute("widgetId");
				if(id){
					return hash[id];
				}
				node = node.parentNode;
			}
			return null;
		},

		// In case someone needs to access hash.
		// Actually, this is accessed from WidgetSet back-compatibility code
		_hash: hash
	};

	if(has("ie")){
		// Only run _destroyAll() for IE because we think it's only necessary in that case,
		// and because it causes problems on FF.  See bug #3531 for details.
		unload.addOnWindowUnload(function(){
			registry._destroyAll();
		});
	}

	/*=====
	dijit.registry = {
		// summary:
		//		A list of widgets on a page.
	};
	=====*/
	dijit.registry = registry;

	return registry;
});

},
'dojo/io/script':function(){
define("dojo/io/script", ["../main"], function(dojo) {
	// module:
	//		dojo/io/script
	// summary:
	//		TODOC

	dojo.getObject("io", true, dojo);

/*=====
dojo.declare("dojo.io.script.__ioArgs", dojo.__IoArgs, {
	constructor: function(){
		//	summary:
		//		All the properties described in the dojo.__ioArgs type, apply to this
		//		type as well, EXCEPT "handleAs". It is not applicable to
		//		dojo.io.script.get() calls, since it is implied by the usage of
		//		"jsonp" (response will be a JSONP call returning JSON)
		//		or the response is pure JavaScript defined in
		//		the body of the script that was attached.
		//	callbackParamName: String
		//		Deprecated as of Dojo 1.4 in favor of "jsonp", but still supported for
		//		legacy code. See notes for jsonp property.
		//	jsonp: String
		//		The URL parameter name that indicates the JSONP callback string.
		//		For instance, when using Yahoo JSONP calls it is normally,
		//		jsonp: "callback". For AOL JSONP calls it is normally
		//		jsonp: "c".
		//	checkString: String
		//		A string of JavaScript that when evaluated like so:
		//		"typeof(" + checkString + ") != 'undefined'"
		//		being true means that the script fetched has been loaded.
		//		Do not use this if doing a JSONP type of call (use callbackParamName instead).
		//	frameDoc: Document
		//		The Document object for a child iframe. If this is passed in, the script
		//		will be attached to that document. This can be helpful in some comet long-polling
		//		scenarios with Firefox and Opera.
		this.callbackParamName = callbackParamName;
		this.jsonp = jsonp;
		this.checkString = checkString;
		this.frameDoc = frameDoc;
	}
});
=====*/

	var loadEvent = dojo.isIE ? "onreadystatechange" : "load",
		readyRegExp = /complete|loaded/;

	dojo.io.script = {
		get: function(/*dojo.io.script.__ioArgs*/args){
			//	summary:
			//		sends a get request using a dynamically created script tag.
			var dfd = this._makeScriptDeferred(args);
			var ioArgs = dfd.ioArgs;
			dojo._ioAddQueryToUrl(ioArgs);

			dojo._ioNotifyStart(dfd);

			if(this._canAttach(ioArgs)){
				var node = this.attach(ioArgs.id, ioArgs.url, args.frameDoc);

				//If not a jsonp callback or a polling checkString case, bind
				//to load event on the script tag.
				if(!ioArgs.jsonp && !ioArgs.args.checkString){
					var handle = dojo.connect(node, loadEvent, function(evt){
						if(evt.type == "load" || readyRegExp.test(node.readyState)){
							dojo.disconnect(handle);
							ioArgs.scriptLoaded = evt;
						}
					});
				}
			}

			dojo._ioWatch(dfd, this._validCheck, this._ioCheck, this._resHandle);
			return dfd;
		},

		attach: function(/*String*/id, /*String*/url, /*Document?*/frameDocument){
			//	summary:
			//		creates a new <script> tag pointing to the specified URL and
			//		adds it to the document.
			//	description:
			//		Attaches the script element to the DOM.	 Use this method if you
			//		just want to attach a script to the DOM and do not care when or
			//		if it loads.
			var doc = (frameDocument || dojo.doc);
			var element = doc.createElement("script");
			element.type = "text/javascript";
			element.src = url;
			element.id = id;
			element.async = true;
			element.charset = "utf-8";
			return doc.getElementsByTagName("head")[0].appendChild(element);
		},

		remove: function(/*String*/id, /*Document?*/frameDocument){
			//summary: removes the script element with the given id, from the given frameDocument.
			//If no frameDocument is passed, the current document is used.
			dojo.destroy(dojo.byId(id, frameDocument));

			//Remove the jsonp callback on dojo.io.script, if it exists.
			if(this["jsonp_" + id]){
				delete this["jsonp_" + id];
			}
		},

		_makeScriptDeferred: function(/*Object*/args){
			//summary:
			//		sets up a Deferred object for an IO request.
			var dfd = dojo._ioSetArgs(args, this._deferredCancel, this._deferredOk, this._deferredError);

			var ioArgs = dfd.ioArgs;
			ioArgs.id = dojo._scopeName + "IoScript" + (this._counter++);
			ioArgs.canDelete = false;

			//Special setup for jsonp case
			ioArgs.jsonp = args.callbackParamName || args.jsonp;
			if(ioArgs.jsonp){
				//Add the jsonp parameter.
				ioArgs.query = ioArgs.query || "";
				if(ioArgs.query.length > 0){
					ioArgs.query += "&";
				}
				ioArgs.query += ioArgs.jsonp
					+ "="
					+ (args.frameDoc ? "parent." : "")
					+ dojo._scopeName + ".io.script.jsonp_" + ioArgs.id + "._jsonpCallback";

				ioArgs.frameDoc = args.frameDoc;

				//Setup the Deferred to have the jsonp callback.
				ioArgs.canDelete = true;
				dfd._jsonpCallback = this._jsonpCallback;
				this["jsonp_" + ioArgs.id] = dfd;
			}
			return dfd; // dojo.Deferred
		},

		_deferredCancel: function(/*Deferred*/dfd){
			//summary: canceller function for dojo._ioSetArgs call.

			//DO NOT use "this" and expect it to be dojo.io.script.
			dfd.canceled = true;
			if(dfd.ioArgs.canDelete){
				dojo.io.script._addDeadScript(dfd.ioArgs);
			}
		},

		_deferredOk: function(/*Deferred*/dfd){
			//summary: okHandler function for dojo._ioSetArgs call.

			//DO NOT use "this" and expect it to be dojo.io.script.
			var ioArgs = dfd.ioArgs;

			//Add script to list of things that can be removed.
			if(ioArgs.canDelete){
				dojo.io.script._addDeadScript(ioArgs);
			}

			//Favor JSONP responses, script load events then lastly ioArgs.
			//The ioArgs are goofy, but cannot return the dfd since that stops
			//the callback chain in Deferred. The return value is not that important
			//in that case, probably a checkString case.
			return ioArgs.json || ioArgs.scriptLoaded || ioArgs;
		},

		_deferredError: function(/*Error*/error, /*Deferred*/dfd){
			//summary: errHandler function for dojo._ioSetArgs call.

			if(dfd.ioArgs.canDelete){
				//DO NOT use "this" and expect it to be dojo.io.script.
				if(error.dojoType == "timeout"){
					//For timeouts, remove the script element immediately to
					//avoid a response from it coming back later and causing trouble.
					dojo.io.script.remove(dfd.ioArgs.id, dfd.ioArgs.frameDoc);
				}else{
					dojo.io.script._addDeadScript(dfd.ioArgs);
				}
			}
			console.log("dojo.io.script error", error);
			return error;
		},

		_deadScripts: [],
		_counter: 1,

		_addDeadScript: function(/*Object*/ioArgs){
			//summary: sets up an entry in the deadScripts array.
			dojo.io.script._deadScripts.push({id: ioArgs.id, frameDoc: ioArgs.frameDoc});
			//Being extra paranoid about leaks:
			ioArgs.frameDoc = null;
		},

		_validCheck: function(/*Deferred*/dfd){
			//summary: inflight check function to see if dfd is still valid.

			//Do script cleanup here. We wait for one inflight pass
			//to make sure we don't get any weird things by trying to remove a script
			//tag that is part of the call chain (IE 6 has been known to
			//crash in that case).
			var _self = dojo.io.script;
			var deadScripts = _self._deadScripts;
			if(deadScripts && deadScripts.length > 0){
				for(var i = 0; i < deadScripts.length; i++){
					//Remove the script tag
					_self.remove(deadScripts[i].id, deadScripts[i].frameDoc);
					deadScripts[i].frameDoc = null;
				}
				dojo.io.script._deadScripts = [];
			}

			return true;
		},

		_ioCheck: function(/*Deferred*/dfd){
			//summary: inflight check function to see if IO finished.
			var ioArgs = dfd.ioArgs;
			//Check for finished jsonp
			if(ioArgs.json || (ioArgs.scriptLoaded && !ioArgs.args.checkString)){
				return true;
			}

			//Check for finished "checkString" case.
			var checkString = ioArgs.args.checkString;
			return checkString && eval("typeof(" + checkString + ") != 'undefined'");


		},

		_resHandle: function(/*Deferred*/dfd){
			//summary: inflight function to handle a completed response.
			if(dojo.io.script._ioCheck(dfd)){
				dfd.callback(dfd);
			}else{
				//This path should never happen since the only way we can get
				//to _resHandle is if _ioCheck is true.
				dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
			}
		},

		_canAttach: function(/*Object*/ioArgs){
			//summary: A method that can be overridden by other modules
			//to control when the script attachment occurs.
			return true;
		},

		_jsonpCallback: function(/*JSON Object*/json){
			//summary:
			//		generic handler for jsonp callback. A pointer to this function
			//		is used for all jsonp callbacks.  NOTE: the "this" in this
			//		function will be the Deferred object that represents the script
			//		request.
			this.ioArgs.json = json;
		}
	};

	return dojo.io.script;
});

},
'ibm/tivoli/fwm/mxmap/ContextMenu':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/Menu"], function(dijit,dojo,dojox){
/*
 * IBM Confidential
 * 
 * OCO Source Materials
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.ContextMenu");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.Menu");
/**
 * Implement the logic for showing and executing the context menu over the map.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.ContextMenu", ibm.tivoli.fwm.mxmap._Base, {
	divId: null,
	map: null,
	compId:null,
	_contextMenu: null,
	_emptyContextMenu: null,
	_currentCtxMenu:null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.map.click.addHandler(this._onClick,this);
		this.map.rightclick.addHandler(this._onRightClick,this);

		dojo.create("div", {
			id: "popUpCtx"
		}, dojo.byId(this.divId));
		dojo.create("div", {
			id: "popUpEmptyCtx"
		}, dojo.byId(this.divId));
		this._contextMenu = new dijit.Menu({
			targetNodeIds: [ "popUpCtx" ]
		});
		this._currentCtxMenu=this._contextMenu;
		this._emptyContextMenu = new dijit.Menu({
			targetNodeIds: [ "popUpEmptyCtx" ]
		});
		var menuItem = new dijit.MenuItem({
			label: ibm.tivoli.fwm.i18n.getMaxMsg("map","no_actions_available_label"),
			onClick: dojo.hitch(this, function()
			{
				console.log("nothing to be done");
			})
		});
		this._emptyContextMenu.addChild(menuItem);
		this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_" + this.compId, dojo.hitch(this, this.serverUpdated)));
		
	},
	serverUpdated:function(data){
		console.log("ctx menu",data);
		if(data && data.gisdata && data.gisdata.flags && data.gisdata.flags.readonly==true){
			this._currentCtxMenu=this._emptyContextMenu;
		}else{
			this._currentCtxMenu=this._contextMenu;
		}
	},

	/**
	 * on map click outside the menu, we close the opened menu
	 */
	_onClick: function(event_name, evt, event_args)
	{
		dijit.popup.close(this._currentCtxMenu);
	},
	/**
	 * Context menu args like map location where the menu was opened
	 */
	_contextArgs: {
		mapLocation: {}
	},
	/**
	 * Executed when user right clicks the map in order to show the context menu
	 */
	_onRightClick: function(event_name, evt, event_args)
	{
		dijit.popup.close(this._currentCtxMenu);
		var point = event_args.location;
		var divPosition = dojo.position(dojo.byId(this.divId), true);					
		var x = event_args.pixel.x + divPosition.x;
		var y = event_args.pixel.y + divPosition.y;				
		this._contextArgs = {
			mapLocation: point
		};
		dijit.popup.open({
			popup: this._currentCtxMenu,
			x: x,
			y: y,
			onExecute: dojo.hitch(this, function(ag)
			{
				dijit.popup.close(this._currentCtxMenu);
			}),
			onCancel: function(ag)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("cancel", ag);
				}
			},
			orient: 'L'
		});
	},
	/**
	 * If an menu item is execute we must call the menu controller method
	 */
	_executeAction: function(action)
	{
		action.execute(this._contextArgs);
	},
	/**
	 * Adds a new Action into the menu. Action must be a
	 * ibm.tivoli.fwm.mxmap.actions.Actions
	 */
	addChild: function(action)
	{
		var menuItem = new dijit.MenuItem({
			label: action.label,
			onClick: dojo.hitch(this, function()
			{
				this._executeAction(action);
			})
		});
		this._contextMenu.addChild(menuItem);
	},
	/**
	 * Destroy the map handlers /TODO must be moved to _Base
	 */
	destroyRecursive: function()
	{
		dijit.popup.close(this._contextMenu);
		dijit.popup.close(this._emptyContextMenu);
		this.map.click.removeHandler( this.onClick,this);
		this.map.rightclick.removeHandler(this.onRightClick,this);
		
	}

});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/LayersTool':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/layers/LayerPanelWidget,ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate");
dojo.require("dijit.form.Button");

/**
 * Layers tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.LayersTool", ibm.tivoli.fwm.mxmap.toolbar.ext._ToolTemplate, {
		label: "Layers",
		iconClass: "basicMapToolbarBtn layersMapToolbarBtn",
		map: null,
		constructor: function(params)
		{			
			dojo.mixin(this, params); 
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
			this.label = _label || this.label;
		},
		execute: function()
		{	
			var _layerPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.map});		
			_layerPanelManager.updateLayers(this.map.getLayersManager().getLayers());
		},
		disable: function()
		{
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
});
});

},
'dijit/_base/wai':function(){
define("dijit/_base/wai", [
	"dojo/dom-attr", // domAttr.attr
	"dojo/_base/lang", // lang.mixin
	"..",	// export symbols to dijit
	"../hccss"			// not using this module directly, but loading it sets CSS flag on <html>
], function(domAttr, lang, dijit){

	// module:
	//		dijit/_base/wai
	// summary:
	//		Deprecated methods for setting/getting wai roles and states.
	//		New code should call setAttribute()/getAttribute() directly.
	//
	//		Also loads hccss to apply dijit_a11y class to root node if machine is in high-contrast mode.

	lang.mixin(dijit, {
		hasWaiRole: function(/*Element*/ elem, /*String?*/ role){
			// summary:
			//		Determines if an element has a particular role.
			// returns:
			//		True if elem has the specific role attribute and false if not.
			// 		For backwards compatibility if role parameter not provided,
			// 		returns true if has a role
			var waiRole = this.getWaiRole(elem);
			return role ? (waiRole.indexOf(role) > -1) : (waiRole.length > 0);
		},

		getWaiRole: function(/*Element*/ elem){
			// summary:
			//		Gets the role for an element (which should be a wai role).
			// returns:
			//		The role of elem or an empty string if elem
			//		does not have a role.
			 return lang.trim((domAttr.get(elem, "role") || "").replace("wairole:",""));
		},

		setWaiRole: function(/*Element*/ elem, /*String*/ role){
			// summary:
			//		Sets the role on an element.
			// description:
			//		Replace existing role attribute with new role.

			domAttr.set(elem, "role", role);
		},

		removeWaiRole: function(/*Element*/ elem, /*String*/ role){
			// summary:
			//		Removes the specified role from an element.
			// 		Removes role attribute if no specific role provided (for backwards compat.)

			var roleValue = domAttr.get(elem, "role");
			if(!roleValue){ return; }
			if(role){
				var t = lang.trim((" " + roleValue + " ").replace(" " + role + " ", " "));
				domAttr.set(elem, "role", t);
			}else{
				elem.removeAttribute("role");
			}
		},

		hasWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Determines if an element has a given state.
			// description:
			//		Checks for an attribute called "aria-"+state.
			// returns:
			//		true if elem has a value for the given state and
			//		false if it does not.

			return elem.hasAttribute ? elem.hasAttribute("aria-"+state) : !!elem.getAttribute("aria-"+state);
		},

		getWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Gets the value of a state on an element.
			// description:
			//		Checks for an attribute called "aria-"+state.
			// returns:
			//		The value of the requested state on elem
			//		or an empty string if elem has no value for state.

			return elem.getAttribute("aria-"+state) || "";
		},

		setWaiState: function(/*Element*/ elem, /*String*/ state, /*String*/ value){
			// summary:
			//		Sets a state on an element.
			// description:
			//		Sets an attribute called "aria-"+state.

			elem.setAttribute("aria-"+state, value);
		},

		removeWaiState: function(/*Element*/ elem, /*String*/ state){
			// summary:
			//		Removes a state from an element.
			// description:
			//		Sets an attribute called "aria-"+state.

			elem.removeAttribute("aria-"+state);
		}
	});

	return dijit;
});

},
'dijit/form/_FormSelectWidget':function(){
define("dijit/form/_FormSelectWidget", [
	"dojo/_base/array", // array.filter array.forEach array.map array.some
	"dojo/aspect", // aspect.after
	"dojo/data/util/sorter", // util.sorter.createSortFunction
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/kernel",	// _scopeName
	"dojo/_base/lang", // lang.delegate lang.isArray lang.isObject lang.hitch
	"dojo/query", // query
	"./_FormValueWidget"
], function(array, aspect, sorter, declare, dom, domClass, kernel, lang, query, _FormValueWidget){

/*=====
	var _FormValueWidget = dijit.form._FormValueWidget;
=====*/

// module:
//		dijit/form/_FormSelectWidget
// summary:
//		Extends _FormValueWidget in order to provide "select-specific"
//		values - i.e., those values that are unique to <select> elements.


/*=====
dijit.form.__SelectOption = function(){
	// value: String
	//		The value of the option.  Setting to empty (or missing) will
	//		place a separator at that location
	// label: String
	//		The label for our option.  It can contain html tags.
	// selected: Boolean
	//		Whether or not we are a selected option
	// disabled: Boolean
	//		Whether or not this specific option is disabled
	this.value = value;
	this.label = label;
	this.selected = selected;
	this.disabled = disabled;
}
=====*/

return declare("dijit.form._FormSelectWidget", _FormValueWidget, {
	// summary:
	//		Extends _FormValueWidget in order to provide "select-specific"
	//		values - i.e., those values that are unique to <select> elements.
	//		This also provides the mechanism for reading the elements from
	//		a store, if desired.

	// multiple: [const] Boolean
	//		Whether or not we are multi-valued
	multiple: false,

	// options: dijit.form.__SelectOption[]
	//		The set of options for our select item.  Roughly corresponds to
	//		the html <option> tag.
	options: null,

	// store: dojo.data.api.Identity
	//		A store which, at the very least implements dojo.data.api.Identity
	//		to use for getting our list of options - rather than reading them
	//		from the <option> html tags.
	store: null,

	// query: object
	//		A query to use when fetching items from our store
	query: null,

	// queryOptions: object
	//		Query options to use when fetching from the store
	queryOptions: null,

	// onFetch: Function
	//		A callback to do with an onFetch - but before any items are actually
	//		iterated over (i.e. to filter even further what you want to add)
	onFetch: null,

	// sortByLabel: Boolean
	//		Flag to sort the options returned from a store by the label of
	//		the store.
	sortByLabel: true,


	// loadChildrenOnOpen: Boolean
	//		By default loadChildren is called when the items are fetched from the
	//		store.  This property allows delaying loadChildren (and the creation
	//		of the options/menuitems) until the user clicks the button to open the
	//		dropdown.
	loadChildrenOnOpen: false,

	getOptions: function(/*anything*/ valueOrIdx){
		// summary:
		//		Returns a given option (or options).
		// valueOrIdx:
		//		If passed in as a string, that string is used to look up the option
		//		in the array of options - based on the value property.
		//		(See dijit.form.__SelectOption).
		//
		//		If passed in a number, then the option with the given index (0-based)
		//		within this select will be returned.
		//
		//		If passed in a dijit.form.__SelectOption, the same option will be
		//		returned if and only if it exists within this select.
		//
		//		If passed an array, then an array will be returned with each element
		//		in the array being looked up.
		//
		//		If not passed a value, then all options will be returned
		//
		// returns:
		//		The option corresponding with the given value or index.  null
		//		is returned if any of the following are true:
		//			- A string value is passed in which doesn't exist
		//			- An index is passed in which is outside the bounds of the array of options
		//			- A dijit.form.__SelectOption is passed in which is not a part of the select

		// NOTE: the compare for passing in a dijit.form.__SelectOption checks
		//		if the value property matches - NOT if the exact option exists
		// NOTE: if passing in an array, null elements will be placed in the returned
		//		array when a value is not found.
		var lookupValue = valueOrIdx, opts = this.options || [], l = opts.length;

		if(lookupValue === undefined){
			return opts; // dijit.form.__SelectOption[]
		}
		if(lang.isArray(lookupValue)){
			return array.map(lookupValue, "return this.getOptions(item);", this); // dijit.form.__SelectOption[]
		}
		if(lang.isObject(valueOrIdx)){
			// We were passed an option - so see if it's in our array (directly),
			// and if it's not, try and find it by value.
			if(!array.some(this.options, function(o, idx){
				if(o === lookupValue ||
					(o.value && o.value === lookupValue.value)){
					lookupValue = idx;
					return true;
				}
				return false;
			})){
				lookupValue = -1;
			}
		}
		if(typeof lookupValue == "string"){
			for(var i=0; i<l; i++){
				if(opts[i].value === lookupValue){
					lookupValue = i;
					break;
				}
			}
		}
		if(typeof lookupValue == "number" && lookupValue >= 0 && lookupValue < l){
			return this.options[lookupValue]; // dijit.form.__SelectOption
		}
		return null; // null
	},

	addOption: function(/*dijit.form.__SelectOption|dijit.form.__SelectOption[]*/ option){
		// summary:
		//		Adds an option or options to the end of the select.  If value
		//		of the option is empty or missing, a separator is created instead.
		//		Passing in an array of options will yield slightly better performance
		//		since the children are only loaded once.
		if(!lang.isArray(option)){ option = [option]; }
		array.forEach(option, function(i){
			if(i && lang.isObject(i)){
				this.options.push(i);
			}
		}, this);
		this._loadChildren();
	},

	removeOption: function(/*String|dijit.form.__SelectOption|Number|Array*/ valueOrIdx){
		// summary:
		//		Removes the given option or options.  You can remove by string
		//		(in which case the value is removed), number (in which case the
		//		index in the options array is removed), or select option (in
		//		which case, the select option with a matching value is removed).
		//		You can also pass in an array of those values for a slightly
		//		better performance since the children are only loaded once.
		if(!lang.isArray(valueOrIdx)){ valueOrIdx = [valueOrIdx]; }
		var oldOpts = this.getOptions(valueOrIdx);
		array.forEach(oldOpts, function(i){
			// We can get null back in our array - if our option was not found.  In
			// that case, we don't want to blow up...
			if(i){
				this.options = array.filter(this.options, function(node){
					return (node.value !== i.value || node.label !== i.label);
				});
				this._removeOptionItem(i);
			}
		}, this);
		this._loadChildren();
	},

	updateOption: function(/*dijit.form.__SelectOption|dijit.form.__SelectOption[]*/ newOption){
		// summary:
		//		Updates the values of the given option.  The option to update
		//		is matched based on the value of the entered option.  Passing
		//		in an array of new options will yield better performance since
		//		the children will only be loaded once.
		if(!lang.isArray(newOption)){ newOption = [newOption]; }
		array.forEach(newOption, function(i){
			var oldOpt = this.getOptions(i), k;
			if(oldOpt){
				for(k in i){ oldOpt[k] = i[k]; }
			}
		}, this);
		this._loadChildren();
	},

	setStore: function(/*dojo.data.api.Identity*/ store,
						/*anything?*/ selectedValue,
						/*Object?*/ fetchArgs){
		// summary:
		//		Sets the store you would like to use with this select widget.
		//		The selected value is the value of the new store to set.  This
		//		function returns the original store, in case you want to reuse
		//		it or something.
		// store: dojo.data.api.Identity
		//		The store you would like to use - it MUST implement dojo.data.api.Identity,
		//		and MAY implement dojo.data.api.Notification.
		// selectedValue: anything?
		//		The value that this widget should set itself to *after* the store
		//		has been loaded
		// fetchArgs: Object?
		//		The arguments that will be passed to the store's fetch() function
		var oStore = this.store;
		fetchArgs = fetchArgs || {};
		if(oStore !== store){
			// Our store has changed, so update our notifications
			var h;
			while(h = this._notifyConnections.pop()){ h.remove(); }

			if(store && store.getFeatures()["dojo.data.api.Notification"]){
				this._notifyConnections = [
					aspect.after(store, "onNew", lang.hitch(this, "_onNewItem"), true),
					aspect.after(store, "onDelete", lang.hitch(this, "_onDeleteItem"), true),
					aspect.after(store, "onSet", lang.hitch(this, "_onSetItem"), true)
				];
			}
			this._set("store", store);
		}

		// Turn off change notifications while we make all these changes
		this._onChangeActive = false;

		// Remove existing options (if there are any)
		if(this.options && this.options.length){
			this.removeOption(this.options);
		}

		// Add our new options
		if(store){
			this._loadingStore = true;
			store.fetch(lang.delegate(fetchArgs, {
				onComplete: function(items, opts){
					if(this.sortByLabel && !fetchArgs.sort && items.length){
						items.sort(sorter.createSortFunction([{
							attribute: store.getLabelAttributes(items[0])[0]
						}], store));
					}

					if(fetchArgs.onFetch){
							items = fetchArgs.onFetch.call(this, items, opts);
					}
					// TODO: Add these guys as a batch, instead of separately
					array.forEach(items, function(i){
						this._addOptionForItem(i);
					}, this);

					// Set our value (which might be undefined), and then tweak
					// it to send a change event with the real value
					this._loadingStore = false;
						this.set("value", "_pendingValue" in this ? this._pendingValue : selectedValue);
					delete this._pendingValue;

					if(!this.loadChildrenOnOpen){
						this._loadChildren();
					}else{
						this._pseudoLoadChildren(items);
					}
					this._fetchedWith = opts;
					this._lastValueReported = this.multiple ? [] : null;
					this._onChangeActive = true;
					this.onSetStore();
					this._handleOnChange(this.value);
				},
				scope: this
			}));
		}else{
			delete this._fetchedWith;
		}
		return oStore;	// dojo.data.api.Identity
	},

	// TODO: implement set() and watch() for store and query, although not sure how to handle
	// setting them individually rather than together (as in setStore() above)

	_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
		// summary:
		//		set the value of the widget.
		//		If a string is passed, then we set our value from looking it up.
		if(this._loadingStore){
			// Our store is loading - so save our value, and we'll set it when
			// we're done
			this._pendingValue = newValue;
			return;
		}
		var opts = this.getOptions() || [];
		if(!lang.isArray(newValue)){
			newValue = [newValue];
		}
		array.forEach(newValue, function(i, idx){
			if(!lang.isObject(i)){
				i = i + "";
			}
			if(typeof i === "string"){
				newValue[idx] = array.filter(opts, function(node){
					return node.value === i;
				})[0] || {value: "", label: ""};
			}
		}, this);

		// Make sure some sane default is set
		newValue = array.filter(newValue, function(i){ return i && i.value; });
		if(!this.multiple && (!newValue[0] || !newValue[0].value) && opts.length){
			newValue[0] = opts[0];
		}
		array.forEach(opts, function(i){
			i.selected = array.some(newValue, function(v){ return v.value === i.value; });
		});
		var val = array.map(newValue, function(i){ return i.value; }),
			disp = array.map(newValue, function(i){ return i.label; });

		this._set("value", this.multiple ? val : val[0]);
		this._setDisplay(this.multiple ? disp : disp[0]);
		this._updateSelection();
		this._handleOnChange(this.value, priorityChange);
	},

	_getDisplayedValueAttr: function(){
		// summary:
		//		returns the displayed value of the widget
		var val = this.get("value");
		if(!lang.isArray(val)){
			val = [val];
		}
		var ret = array.map(this.getOptions(val), function(v){
			if(v && "label" in v){
				return v.label;
			}else if(v){
				return v.value;
			}
			return null;
		}, this);
		return this.multiple ? ret : ret[0];
	},

	_loadChildren: function(){
		// summary:
		//		Loads the children represented by this widget's options.
		//		reset the menu to make it populatable on the next click
		if(this._loadingStore){ return; }
		array.forEach(this._getChildren(), function(child){
			child.destroyRecursive();
		});
		// Add each menu item
		array.forEach(this.options, this._addOptionItem, this);

		// Update states
		this._updateSelection();
	},

	_updateSelection: function(){
		// summary:
		//		Sets the "selected" class on the item for styling purposes
		this._set("value", this._getValueFromOpts());
		var val = this.value;
		if(!lang.isArray(val)){
			val = [val];
		}
		if(val && val[0]){
			array.forEach(this._getChildren(), function(child){
				var isSelected = array.some(val, function(v){
					return child.option && (v === child.option.value);
				});
				domClass.toggle(child.domNode, this.baseClass + "SelectedOption", isSelected);
				child.domNode.setAttribute("aria-selected", isSelected);
			}, this);
		}
	},

	_getValueFromOpts: function(){
		// summary:
		//		Returns the value of the widget by reading the options for
		//		the selected flag
		var opts = this.getOptions() || [];
		if(!this.multiple && opts.length){
			// Mirror what a select does - choose the first one
			var opt = array.filter(opts, function(i){
				return i.selected;
			})[0];
			if(opt && opt.value){
				return opt.value
			}else{
				opts[0].selected = true;
				return opts[0].value;
			}
		}else if(this.multiple){
			// Set value to be the sum of all selected
			return array.map(array.filter(opts, function(i){
				return i.selected;
			}), function(i){
				return i.value;
			}) || [];
		}
		return "";
	},

	// Internal functions to call when we have store notifications come in
	_onNewItem: function(/*item*/ item, /*Object?*/ parentInfo){
		if(!parentInfo || !parentInfo.parent){
			// Only add it if we are top-level
			this._addOptionForItem(item);
		}
	},
	_onDeleteItem: function(/*item*/ item){
		var store = this.store;
		this.removeOption(store.getIdentity(item));
	},
	_onSetItem: function(/*item*/ item){
		this.updateOption(this._getOptionObjForItem(item));
	},

	_getOptionObjForItem: function(item){
		// summary:
		//		Returns an option object based off the given item.  The "value"
		//		of the option item will be the identity of the item, the "label"
		//		of the option will be the label of the item.  If the item contains
		//		children, the children value of the item will be set
		var store = this.store, label = store.getLabel(item),
			value = (label ? store.getIdentity(item) : null);
		return {value: value, label: label, item:item}; // dijit.form.__SelectOption
	},

	_addOptionForItem: function(/*item*/ item){
		// summary:
		//		Creates (and adds) the option for the given item
		var store = this.store;
		if(!store.isItemLoaded(item)){
			// We are not loaded - so let's load it and add later
			store.loadItem({item: item, onItem: function(i){
				this._addOptionForItem(i);
			},
			scope: this});
			return;
		}
		var newOpt = this._getOptionObjForItem(item);
		this.addOption(newOpt);
	},

	constructor: function(/*Object*/ keywordArgs){
		// summary:
		//		Saves off our value, if we have an initial one set so we
		//		can use it if we have a store as well (see startup())
		this._oValue = (keywordArgs || {}).value || null;
		this._notifyConnections = [];
	},

	buildRendering: function(){
		this.inherited(arguments);
		dom.setSelectable(this.focusNode, false);
	},

	_fillContent: function(){
		// summary:
		//		Loads our options and sets up our dropdown correctly.  We
		//		don't want any content, so we don't call any inherit chain
		//		function.
		var opts = this.options;
		if(!opts){
			opts = this.options = this.srcNodeRef ? query("> *",
						this.srcNodeRef).map(function(node){
							if(node.getAttribute("type") === "separator"){
								return { value: "", label: "", selected: false, disabled: false };
							}
							return {
								value: (node.getAttribute("data-" + kernel._scopeName + "-value") || node.getAttribute("value")),
										label: String(node.innerHTML),
								// FIXME: disabled and selected are not valid on complex markup children (which is why we're
								// looking for data-dojo-value above.  perhaps we should data-dojo-props="" this whole thing?)
								// decide before 1.6
										selected: node.getAttribute("selected") || false,
								disabled: node.getAttribute("disabled") || false
							};
						}, this) : [];
		}
		if(!this.value){
			this._set("value", this._getValueFromOpts());
		}else if(this.multiple && typeof this.value == "string"){
			this._set("value", this.value.split(","));
		}
	},

	postCreate: function(){
		// summary:
		//		sets up our event handling that we need for functioning
		//		as a select
		this.inherited(arguments);

		// Make our event connections for updating state
		this.connect(this, "onChange", "_updateSelection");
		this.connect(this, "startup", "_loadChildren");

		this._setValueAttr(this.value, null);
	},

	startup: function(){
		// summary:
		//		Connects in our store, if we have one defined
		this.inherited(arguments);
		var store = this.store, fetchArgs = {};
		array.forEach(["query", "queryOptions", "onFetch"], function(i){
			if(this[i]){
				fetchArgs[i] = this[i];
			}
			delete this[i];
		}, this);
		if(store && store.getFeatures()["dojo.data.api.Identity"]){
			// Temporarily set our store to null so that it will get set
			// and connected appropriately
			this.store = null;
			this.setStore(store, this._oValue, fetchArgs);
		}
	},

	destroy: function(){
		// summary:
		//		Clean up our connections
		var h;
		while(h = this._notifyConnections.pop()){ h.remove(); }
		this.inherited(arguments);
	},

	_addOptionItem: function(/*dijit.form.__SelectOption*/ /*===== option =====*/){
		// summary:
		//		User-overridable function which, for the given option, adds an
		//		item to the select.  If the option doesn't have a value, then a
		//		separator is added in that place.  Make sure to store the option
		//		in the created option widget.
	},

	_removeOptionItem: function(/*dijit.form.__SelectOption*/ /*===== option =====*/){
		// summary:
		//		User-overridable function which, for the given option, removes
		//		its item from the select.
	},

	_setDisplay: function(/*String or String[]*/ /*===== newDisplay =====*/){
		// summary:
		//		Overridable function which will set the display for the
		//		widget.  newDisplay is either a string (in the case of
		//		single selects) or array of strings (in the case of multi-selects)
	},

	_getChildren: function(){
		// summary:
		//		Overridable function to return the children that this widget contains.
		return [];
	},

	_getSelectedOptionsAttr: function(){
		// summary:
		//		hooks into this.attr to provide a mechanism for getting the
		//		option items for the current value of the widget.
		return this.getOptions(this.get("value"));
	},

	_pseudoLoadChildren: function(/*item[]*/ /*===== items =====*/){
		// summary:
		//		a function that will "fake" loading children, if needed, and
		//		if we have set to not load children until the widget opens.
		// items:
		//		An array of items that will be loaded, when needed
	},

	onSetStore: function(){
		// summary:
		//		a function that can be connected to in order to receive a
		//		notification that the store has finished loading and all options
		//		from that store are available
	}
});

});

},
'dijit/form/Select':function(){
require({cache:{
'url:dijit/form/templates/Select.html':"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n"}});
define("dijit/form/Select", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/dom-class", // domClass.add domClass.remove domClass.toggle
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-geometry", // domGeometry.setMarginBox
	"dojo/_base/event", // event.stop
	"dojo/i18n", // i18n.getLocalization
	"dojo/_base/lang", // lang.hitch
	"./_FormSelectWidget",
	"../_HasDropDown",
	"../Menu",
	"../MenuItem",
	"../MenuSeparator",
	"../Tooltip",
	"dojo/text!./templates/Select.html",
	"dojo/i18n!./nls/validate"
], function(array, declare, domAttr, domClass, domConstruct, domGeometry, event, i18n, lang,
			_FormSelectWidget, _HasDropDown, Menu, MenuItem, MenuSeparator, Tooltip, template){

/*=====
	var _FormSelectWidget = dijit.form._FormSelectWidget;
	var _HasDropDown = dijit._HasDropDown;
	var _FormSelectWidget = dijit._FormSelectWidget;
	var Menu = dijit.Menu;
	var MenuItem = dijit.MenuItem;
	var MenuSeparator = dijit.MenuSeparator;
	var Tooltip = dijit.Tooltip;
=====*/

// module:
//		dijit/form/Select
// summary:
//		This is a "styleable" select box - it is basically a DropDownButton which
//		can take a <select> as its input.


var _SelectMenu = declare("dijit.form._SelectMenu", Menu, {
	// summary:
	//		An internally-used menu for dropdown that allows us a vertical scrollbar
	buildRendering: function(){
		// summary:
		//		Stub in our own changes, so that our domNode is not a table
		//		otherwise, we won't respond correctly to heights/overflows
		this.inherited(arguments);
		var o = (this.menuTableNode = this.domNode);
		var n = (this.domNode = domConstruct.create("div", {style: {overflowX: "hidden", overflowY: "scroll"}}));
		if(o.parentNode){
			o.parentNode.replaceChild(n, o);
		}
		domClass.remove(o, "dijitMenuTable");
		n.className = o.className + " dijitSelectMenu";
		o.className = "dijitReset dijitMenuTable";
		o.setAttribute("role", "listbox");
		n.setAttribute("role", "presentation");
		n.appendChild(o);
	},

	postCreate: function(){
		// summary:
		//		stop mousemove from selecting text on IE to be consistent with other browsers

		this.inherited(arguments);

		this.connect(this.domNode, "onmousemove", event.stop);
	},

	resize: function(/*Object*/ mb){
		// summary:
		//		Overridden so that we are able to handle resizing our
		//		internal widget.  Note that this is not a "full" resize
		//		implementation - it only works correctly if you pass it a
		//		marginBox.
		//
		// mb: Object
		//		The margin box to set this dropdown to.
		if(mb){
			domGeometry.setMarginBox(this.domNode, mb);
			if("w" in mb){
				// We've explicitly set the wrapper <div>'s width, so set <table> width to match.
				// 100% is safer than a pixel value because there may be a scroll bar with
				// browser/OS specific width.
				this.menuTableNode.style.width = "100%";
			}
		}
	}
});

var Select = declare("dijit.form.Select", [_FormSelectWidget, _HasDropDown], {
	// summary:
	//		This is a "styleable" select box - it is basically a DropDownButton which
	//		can take a <select> as its input.

	baseClass: "dijitSelect",

	templateString: template,

	// required: Boolean
	//		Can be true or false, default is false.
	required: false,

	// state: [readonly] String
	//		"Incomplete" if this select is required but unset (i.e. blank value), "" otherwise
	state: "",

	// message: String
	//		Currently displayed error/prompt message
	message: "",

	//	tooltipPosition: String[]
	//		See description of dijit.Tooltip.defaultPosition for details on this parameter.
	tooltipPosition: [],

	// emptyLabel: string
	//		What to display in an "empty" dropdown
	emptyLabel: "&#160;",	// &nbsp;

	// _isLoaded: Boolean
	//		Whether or not we have been loaded
	_isLoaded: false,

	// _childrenLoaded: Boolean
	//		Whether or not our children have been loaded
	_childrenLoaded: false,

	_fillContent: function(){
		// summary:
		//		Set the value to be the first, or the selected index
		this.inherited(arguments);
		// set value from selected option
		if(this.options.length && !this.value && this.srcNodeRef){
			var si = this.srcNodeRef.selectedIndex || 0; // || 0 needed for when srcNodeRef is not a SELECT
			this.value = this.options[si >= 0 ? si : 0].value;
		}
		// Create the dropDown widget
		this.dropDown = new _SelectMenu({id: this.id + "_menu"});
		domClass.add(this.dropDown.domNode, this.baseClass + "Menu");
	},

	_getMenuItemForOption: function(/*dijit.form.__SelectOption*/ option){
		// summary:
		//		For the given option, return the menu item that should be
		//		used to display it.  This can be overridden as needed
		if(!option.value && !option.label){
			// We are a separator (no label set for it)
			return new MenuSeparator();
		}else{
			// Just a regular menu option
			var click = lang.hitch(this, "_setValueAttr", option);
			var item = new MenuItem({
				option: option,
				label: option.label || this.emptyLabel,
				onClick: click,
				disabled: option.disabled || false
			});
			item.focusNode.setAttribute("role", "listitem");
			return item;
		}
	},

	_addOptionItem: function(/*dijit.form.__SelectOption*/ option){
		// summary:
		//		For the given option, add an option to our dropdown.
		//		If the option doesn't have a value, then a separator is added
		//		in that place.
		if(this.dropDown){
			this.dropDown.addChild(this._getMenuItemForOption(option));
		}
	},

	_getChildren: function(){
		if(!this.dropDown){
			return [];
		}
		return this.dropDown.getChildren();
	},

	_loadChildren: function(/*Boolean*/ loadMenuItems){
		// summary:
		//		Resets the menu and the length attribute of the button - and
		//		ensures that the label is appropriately set.
		//	loadMenuItems: Boolean
		//		actually loads the child menu items - we only do this when we are
		//		populating for showing the dropdown.

		if(loadMenuItems === true){
			// this.inherited destroys this.dropDown's child widgets (MenuItems).
			// Avoid this.dropDown (Menu widget) having a pointer to a destroyed widget (which will cause
			// issues later in _setSelected). (see #10296)
			if(this.dropDown){
				delete this.dropDown.focusedChild;
			}
			if(this.options.length){
				this.inherited(arguments);
			}else{
				// Drop down menu is blank but add one blank entry just so something appears on the screen
				// to let users know that they are no choices (mimicing native select behavior)
				array.forEach(this._getChildren(), function(child){ child.destroyRecursive(); });
				var item = new MenuItem({label: "&#160;"});
				this.dropDown.addChild(item);
			}
		}else{
			this._updateSelection();
		}

		this._isLoaded = false;
		this._childrenLoaded = true;

		if(!this._loadingStore){
			// Don't call this if we are loading - since we will handle it later
			this._setValueAttr(this.value);
		}
	},

	_setValueAttr: function(value){
		this.inherited(arguments);
		domAttr.set(this.valueNode, "value", this.get("value"));
		this.validate(this.focused);	// to update this.state
	},

	_setDisabledAttr: function(/*Boolean*/ value){
		this.inherited(arguments);
		this.validate(this.focused);	// to update this.state
	},

	_setRequiredAttr: function(/*Boolean*/ value){
		this._set("required", value);
		this.focusNode.setAttribute("aria-required", value);
		this.validate(this.focused);	// to update this.state
	},

	_setDisplay: function(/*String*/ newDisplay){
		// summary:
		//		sets the display for the given value (or values)
		var lbl = newDisplay || this.emptyLabel;
		this.containerNode.innerHTML = '<span class="dijitReset dijitInline ' + this.baseClass + 'Label">' + lbl + '</span>';
		this.focusNode.setAttribute("aria-valuetext", lbl);
	},

	validate: function(/*Boolean*/ isFocused){
		// summary:
		//		Called by oninit, onblur, and onkeypress, and whenever required/disabled state changes
		// description:
		//		Show missing or invalid messages if appropriate, and highlight textbox field.
		//		Used when a select is initially set to no value and the user is required to
		//		set the value.

		var isValid = this.disabled || this.isValid(isFocused);
		this._set("state", isValid ? "" : "Incomplete");
		this.focusNode.setAttribute("aria-invalid", isValid ? "false" : "true");
		var message = isValid ? "" : this._missingMsg;
		if(message && this.focused && this._hasBeenBlurred){
			Tooltip.show(message, this.domNode, this.tooltipPosition, !this.isLeftToRight());
		}else{
			Tooltip.hide(this.domNode);
		}
		this._set("message", message);
		return isValid;
	},

	isValid: function(/*Boolean*/ /*===== isFocused =====*/){
		// summary:
		//		Whether or not this is a valid value.  The only way a Select
		//		can be invalid is when it's required but nothing is selected.
		return (!this.required || this.value === 0 || !(/^\s*$/.test(this.value || ""))); // handle value is null or undefined
	},

	reset: function(){
		// summary:
		//		Overridden so that the state will be cleared.
		this.inherited(arguments);
		Tooltip.hide(this.domNode);
		this.validate(this.focused);	// to update this.state
	},

	postMixInProperties: function(){
		// summary:
		//		set the missing message
		this.inherited(arguments);
		this._missingMsg = i18n.getLocalization("dijit.form", "validate",
									this.lang).missingMessage;
	},

	postCreate: function(){
		// summary:
		//		stop mousemove from selecting text on IE to be consistent with other browsers

		this.inherited(arguments);

		this.connect(this.domNode, "onmousemove", event.stop);
	},

	_setStyleAttr: function(/*String||Object*/ value){
		this.inherited(arguments);
		domClass.toggle(this.domNode, this.baseClass + "FixedWidth", !!this.domNode.style.width);
	},

	isLoaded: function(){
		return this._isLoaded;
	},

	loadDropDown: function(/*Function*/ loadCallback){
		// summary:
		//		populates the menu
		this._loadChildren(true);
		this._isLoaded = true;
		loadCallback();
	},

	closeDropDown: function(){
		// overriding _HasDropDown.closeDropDown()
		this.inherited(arguments);

		if(this.dropDown && this.dropDown.menuTableNode){
			// Erase possible width: 100% setting from _SelectMenu.resize().
			// Leaving it would interfere with the next openDropDown() call, which
			// queries the natural size of the drop down.
			this.dropDown.menuTableNode.style.width = "";
		}
	},

	uninitialize: function(preserveDom){
		if(this.dropDown && !this.dropDown._destroyed){
			this.dropDown.destroyRecursive(preserveDom);
			delete this.dropDown;
		}
		this.inherited(arguments);
	},

	_onFocus: function(){
		this.validate(true);	// show tooltip if second focus of required tooltip, but no selection
		this.inherited(arguments);
	},

	_onBlur: function(){
		Tooltip.hide(this.domNode);
		this.inherited(arguments);
	}
});

Select._Menu = _SelectMenu;	// for monkey patching

return Select;
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ext/QueryNearResources':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");

/**
 * Query unassigned work tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "Nearby resources",
	iconClass: "basicMapToolbarBtn nearbyResourcesMapToolbarBtn",
	map: null,
	nearbyCrewsLabel: "",
	nearbyLaborsLabel: "",
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearresourcestool");
		this.label = _label || this.label;
		this.nearbyCrewsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbycrews");
		this.nearbyLaborsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbylabors");

		this.addSubscription(dojo.subscribe("onMapRefresh_" + this.map.getId(), dojo.hitch(this, this._onMapRefresh)));
	},
	updateLayers: function(crewsData, laborsData, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if (crewsData && crewsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyCrewsLabel, crewsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
		}
		if (laborsData && laborsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyLaborsLabel, laborsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		}
		if (isAutomaticRefresh != true && laborsData.length == 0 && crewsData.length == 0)
		{
			this.setActive(false);
			this.map.getMaximo().showMessage("mapserver", "noresourcesinarea");
		}
	},
	disable: function()
	{

	},
	destroy: function()
	{
		this.destroyRecursive();
	},
	// util method - gets an array of gis data to send to spatial for conversion
	// returns null if records is null or any record in records does not have
	// gisdata.
	_getGISData: function(records)
	{
		var array = [];
		if (records)
		{
			for ( var index in records)
			{
				if (records[index].gisdata)
				{
					array.push(records[index].gisdata);
				}
				else
				{
					console.warn("[QueryNearResouces] Records has a record without gisdata.", records);
					return null;
				}
			}
		}
		else
		{
			console.warn("[QueryNearResouces] Records has a record without gisdata.", records);
			return null;
		}
		return array;
	},

	// util function to add the records in the new layer.
	_sendEventToLayer: function(layerName, layerData, avoidLayerEnabled)
	{
		dojo.publish("addRecordsToLayer_" + this.map.getId(), [ layerName, layerData, true, null, null, avoidLayerEnabled ]);
	},
	_sendEventToRemoveLayer: function(layerName)
	{
		dojo.publish("removeLayer_" + this.map.getId(), [ layerName ]);
	},
	// Enables the Nearby Resources tool (show nearby resources)
	executeOn: function(refreshOptions)
	{
		var fct = function(data)
		{
			if (data.status == "TOOMANYRECORDS")
			{
				this.map.getMaximo().showMessage(data.error.group, data.error.key, [data.error.params]);
				return;
			}
			var crewsData = data.crews;
			var laborsData = data.labors;

			/*
			 * just a small perf improvement to cache all the LBS points
			 * conversion to current coordsystem at once
			 */
			var toProject = this._getGISData(crewsData);
			toProject.join(this._getGISData(laborsData));
			if (toProject.length > 0)
			{
				this.map.getMapstraction().getAllPointsFromWGS84(toProject, dojo.hitch(this, function()
				{
					/*
					 * do not update the crews/labor data. Map is aware these
					 * are WGS84 if we convert it here, it will get converted
					 * again later in the code, so we need to keep it in wgs84
					 */
					this.updateLayers(crewsData, laborsData, refreshOptions);
				}), dojo.hitch(this, function(error)
				{
					if (error && error.msgkey)
					{
						this.map.getMaximo().showMessage(error.msggroup, error.msgkey);
					}
				}));
			}
			else
			{
				this.updateLayers(crewsData, laborsData, refreshOptions);
			}

		};

		var fctErr = function(data)
		{
			console.warn("[QueryNearResources] Error querying nearby resources", data);
		};

		var bounds = this.map.getMapstraction().getBounds();
		var auxFct = function(ps)
		{
			var xlatedBounds = new mxn.BoundingBox(ps[0].lat, ps[0].lon, ps[1].lat, ps[1].lon);
			this.map.getMaximo().getCrewLaborByCoords(dojo.hitch(this, fct), dojo.hitch(this, fctErr), xlatedBounds);
		};
		// resources always use LBS that is in wgs84 so we need to convert the
		// boundaries to this coordinate system
		this.map.getMapstraction().getAllPointsInWGS84([ bounds.sw, bounds.ne ], dojo.hitch(this, auxFct));
	},
	// Disables the Nearby Resources tool (hides nearby resources)
	executeOff: function()
	{
		this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
	},
	_onMapRefresh: function(refreshOptions)
	{
		if (this.isActive() == true)
		{
			this.executeOff();
			this.executeOn(refreshOptions);
		}
	}
});
});

},
'ibm/tivoli/fwm/mxmap/toolbar/ToolbarSeparator':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator",
		[ dijit._Widget, dijit._Templated ],
		{
		// summary:
		//		A spacer between two `dijit.Toolbar` items
		templateString: '<div class="mapTbSep dijitInline" waiRole="presentation"></div>',
		postCreate: function(){ dojo.setSelectable(this.domNode, false); },
		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}

	});



});

},
'dijit/form/_FormWidget':function(){
define("dijit/form/_FormWidget", [
	"dojo/_base/declare",	// declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/ready",
	"../_Widget",
	"../_CssStateMixin",
	"../_TemplatedMixin",
	"./_FormWidgetMixin"
], function(declare, kernel, ready, _Widget, _CssStateMixin, _TemplatedMixin, _FormWidgetMixin){

/*=====
var _Widget = dijit._Widget;
var _TemplatedMixin = dijit._TemplatedMixin;
var _CssStateMixin = dijit._CssStateMixin;
var _FormWidgetMixin = dijit.form._FormWidgetMixin;
=====*/

// module:
//		dijit/form/_FormWidget
// summary:
//		FormWidget


// Back compat w/1.6, remove for 2.0
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/form/_FormValueWidget"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}

return declare("dijit.form._FormWidget", [_Widget, _TemplatedMixin, _CssStateMixin, _FormWidgetMixin], {
	// summary:
	//		Base class for widgets corresponding to native HTML elements such as <checkbox> or <button>,
	//		which can be children of a <form> node or a `dijit.form.Form` widget.
	//
	// description:
	//		Represents a single HTML element.
	//		All these widgets should have these attributes just like native HTML input elements.
	//		You can set them during widget construction or afterwards, via `dijit._Widget.attr`.
	//
	//		They also share some common methods.

	setDisabled: function(/*Boolean*/ disabled){
		// summary:
		//		Deprecated.  Use set('disabled', ...) instead.
		kernel.deprecated("setDisabled("+disabled+") is deprecated. Use set('disabled',"+disabled+") instead.", "", "2.0");
		this.set('disabled', disabled);
	},

	setValue: function(/*String*/ value){
		// summary:
		//		Deprecated.  Use set('value', ...) instead.
		kernel.deprecated("dijit.form._FormWidget:setValue("+value+") is deprecated.  Use set('value',"+value+") instead.", "", "2.0");
		this.set('value', value);
	},

	getValue: function(){
		// summary:
		//		Deprecated.  Use get('value') instead.
		kernel.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.", "", "2.0");
		return this.get('value');
	},

	postMixInProperties: function(){
		// Setup name=foo string to be referenced from the template (but only if a name has been specified)
		// Unfortunately we can't use _setNameAttr to set the name due to IE limitations, see #8484, #8660.
		// Regarding escaping, see heading "Attribute values" in
		// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
		this.nameAttrSetting = this.name ? ('name="' + this.name.replace(/'/g, "&quot;") + '"') : '';
		this.inherited(arguments);
	},

	// Override automatic assigning type --> focusNode, it causes exception on IE.
	// Instead, type must be specified as ${type} in the template, as part of the original DOM
	_setTypeAttr: null
});

});

},
'ibm/tivoli/fwm/mxmap/layers/LayersManager':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/layers/Layer,ibm/tivoli/fwm/mxmap/layers/SymbologyLayer,ibm/tivoli/fwm/mxmap/layers/LegendLayer,ibm/tivoli/fwm/mxmap/layers/TrafficLayer,ibm/tivoli/fwm/mxmap/layers/RouteLayer,ibm/tivoli/fwm/mxmap/ImageLibraryManager,ibm/tivoli/fwm/mxmap/layers/VirtualLayer"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.LayersManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.layers.Layer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.SymbologyLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.LegendLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.TrafficLayer");
dojo.require("ibm.tivoli.fwm.mxmap.layers.RouteLayer");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
dojo.require("ibm.tivoli.fwm.mxmap.layers.VirtualLayer");

/**
 * Controls the map layers
 * 
 * Creates/removes layers based on the records added to them.<br>
 * Sets the records symbologies when added<br>
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.LayersManager", [ ibm.tivoli.fwm.mxmap._Base ], {
	_layers: null,
	_layersById: null,
	symbManager: null,
	_map: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._layers = [];
		this._layersById = [];
		this._map = options.map;
		this.addSubscription(dojo.subscribe("addRecordsToLayer_" + this._map.getId(), dojo.hitch(this, this.addRecordCustomLayer)));
		this.addSubscription(dojo.subscribe("removeRecordsFromLayer_" + this._map.getId(), dojo.hitch(this, this.removeRecordsFromLayer)));
		this.addSubscription(dojo.subscribe("removeLayer_" + this._map.getId(), dojo.hitch(this, this.removeLayerByName)));

	},
	addRecord: function(mboInfo, markerOptions)
	{
		var layer = this._getLayerForMbo(mboInfo);
		layer.addRecord(mboInfo, markerOptions);
	},
	removeRecord: function(mboInfo)
	{
		var layer = this._getLayerForMbo(mboInfo);
		layer.removeRecord(mboInfo);
	},
	// find layerid based on the objectname
	_getLayerForMbo: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		return this.getLayerForObjectName(mboName);
	},
	getLayerForObjectName: function(mboName)
	{

		var layer = this.getLayerById(mboName);
		if (layer == null)
		{
			// create Layer
			layer = new ibm.tivoli.fwm.mxmap.layers.Layer({
				layerId: mboName.toLowerCase(),
				layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
				symbManager: this.symbManager,
				map: this.map
			});
			this.addLayer(layer, false);
			layer.enable();
		}
		return layer;
	},
	getLayerIdForMbo: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		return this.getLayerForObjectName(mboName).getLayerId();
	},
	removeRecord: function(mboInfo)
	{
		var mboName = mboInfo.mxdata.mboName;
		var layer = this.getLayerById(mboName);
		if (layer != null)
		{
			layer.removeRecord(mboInfo);
		}
	},
	addRecordCustomLayer: function(layerName, data, cleanBeforeAdd, layerId, childrenTitle, avoidLayerEnabled)
	{
		if (data.length > 0)
		{
			var virtualLayer = this.getLayerById(layerName);
			if (virtualLayer == null)
			{
				virtualLayer = new ibm.tivoli.fwm.mxmap.layers.VirtualLayer({
					layerId: layerName,
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.VIRTUAL_LAYER,
					symbManager: this.symbManager,
					map: this.map,
					objectType: data[0].mxdata.mboName
				});
			}
			this.resetLayer(virtualLayer, avoidLayerEnabled);

			for ( var i in data)
			{
				virtualLayer.addRecord(data[i]);
			}

		}
	},
	removeLayerByName: function(layerName, keepLayerEntry, layerId)
	{
		var _layer = this.getLayer(layerName);

		if (_layer)
		{
			_layer.removeMXRecordSetData();
			if (keepLayerEntry != true)
			{
				this._layers[layerName] = null;
				delete this._layers[layerName];
			}
		}

		if (layerId && this._layersById[layerId])
		{
			this._layersById[layerId] = null;
		}

	},
	removeLayer: function(layer)
	{
		delete this._layersById[layer.getLayerId()];
		delete this._layers[layer.getLayerName()];
	},
	addLayer: function(layer, cleanBeforeAdd)
	{
		var layerName = layer.getLayerName();
		var layerId = layer.getLayerId();
		if (dojo.config.fwm.debug == true)
		{
			console.log("[mxmap.layers.LayersManager.addLayer] LayerId: " + layerId);
		}
		var _layer = this.getLayer(layerName);
		if (_layer)
		{
			if (cleanBeforeAdd)
			{
				this.removeLayerByName(layerName, false, layerId);
			}
			_layer.addMXRecordSet(layer.getMXRecordSet());
		}
		else
		{
			this._layers[layerName] = layer;
			if (layerId)
			{
				this._layersById[layerId] = layer;
			}
		}
	},
	resetLayer: function(layer, avoidLayerEnabled)
	{
		var layerName = layer.getLayerName();
		var layerId = layer.getLayerId();
		var _layer = this.getLayer(layerName);
		if (_layer)
		{
			this.removeLayerByName(layerName, false, layerId);
		}
		if (layerName)
		{
			this._layers[layerName] = layer;
		}
		if (layerId)
		{
			this._layersById[layerId] = layer;
		}
		if (layer.isDisabled() && avoidLayerEnabled != true)
		{
			layer.enable();
		}

	},
	showLayer: function(layerName)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			layer.show();
		}
		else
		{
			console.warn("[LayersManager] Cannot show layer " + layerName + " because it was not found.");
		}
	},
	hideLayer: function(layerName)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			layer.hide();
		}
		else
		{
			console.warn("[LayersManager] Cannot hide layer " + layerName + " because it was not found.");
		}
	},
	getLayer: function(layerName)
	{
		if (this._layers.hasOwnProperty(layerName) == true)
		{
			return this._layers[layerName];
		}
		return null;
	},
	redrawMarkers: function()
	{
		for ( var index in this._layers)
		{
			this._layers[index].redrawMarkers();
		}
	},
	getLayerById: function(layerId)
	{
		layerId = layerId.toLowerCase();

		for (id in this._layersById)
		{
			var idLowerCase = id.toLowerCase();
			if (idLowerCase == layerId)
			{
				return this._layersById[id];
			}
		}
		return null;
	},
	/* returns an array with all the existing layers */
	getLayers: function()
	{
		var array = [];
		for ( var index in this._layers)
		{
			array.push(this._layers[index]);
		}
		return array;
	},
	removeRecordsFromLayer: function(layerName, data)
	{
		var layer = this.getLayer(layerName);
		if (layer)
		{
			for ( var index in data)
			{
				layer.removeRecord(data[index]);
			}
		}
		else
		{
			console.log("[LayerManager] Layer " + layerName + " not found to remove records.");
		}
		this._map.refreshMap();
	},
	_getLayerByIdOrDefaultForMbo: function(layerId, mboInfo)
	{
		if (layerId)
		{
			return this.getLayerById(layerId);
		}
		else
		{
			return this._getLayerForMbo(mboInfo);
		}
	},
	setMboMarkerInfo: function(mboInfo, opt, layerId)
	{
		var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
		return layer.setMboMarkerInfo(mboInfo, opt);
	},
	getMboMarkerInfo: function(mboInfo, layerId)
	{
		var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
		return layer.getMboMarkerInfo(mboInfo);
	}

});
});

},
'ibm/tivoli/fwm/mxmap/layers/Layer':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.layers.Layer");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

ibm.tivoli.fwm.mxmap.layers.LayerType = {
	LAYER: 0,
	SYMBOLOGY: 1,
	LEGEND: 2,
	VIRTUAL_LAYER: 4
};

/**
 * Represents a map layer
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Unscheduled Work", records: a MXRecordSet,
 * parentLayer: the layer that is creating this layer, }
 */
dojo.declare("ibm.tivoli.fwm.mxmap.layers.Layer", [ ibm.tivoli.fwm.mxmap._Base ], {
	_layerName: null,
	_layerId: null,
	_records: null,
	_map: null,
	// Whether this layer is currently active or not
	_disabled: null,
	// Array with the sublayers
	_childLayers: null,
	// Pointer to the parent layer
	_parentLayer: null,
	_leftIconURL: null,
	_rightIconURL: null,
	_rightIconSet: false,
	_childrenTitle: null,
	layerRecords: null,
	_mboMarkerOptions: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._childLayers = [];
		this._layerId = options.layerId;

		this._mboMarkerOptions = new MboMarkerOptionsTable();

		this._map = options.map;
		this.layerRecords = [];
		this._disabled = true;
		this._layerName = this.layerName;
		this._childrenTitle = options.childrenTitle;
		this._parentLayer = options.parentLayer;
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this._rightIconURL = libraryManager.getLayerDetailsOffImageInfo().getImageURL();
		if (this.layerType == ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER)
		{
			this.layerConf = this.symbManager.getLayerConfigById(this._layerId);
			if (!this.layerConf)
			{
				console.warn("[Layer] No conf for ", this._layerId);
				// TODO Return others Layer
				this.layerConf = this.symbManager.getDefaultLayerConfigFor(this._layerId);
				// return;
			}
			this._layerName = this.layerConf.label;
			this._childrenTitle = this.layerConf.symbologyTitle;
			// Get the array of symbology configurations for this layer
			var symbologyConfigArray = this.symbManager.getSymbologyConfigArrayByLayer(this.layerConf);
			var firstSymbology = true;
			for ( var symbologyId in symbologyConfigArray)
			{
				// For each symbology configuration in the array, build a
				// symbology for this layer (a child layer)
				var symbologyConfig = symbologyConfigArray[symbologyId];
				var symbologyType = symbologyConfig.type;
				var symbologyLabel = symbologyConfig.label;
				var symbologyChildrenTitle = symbologyConfig.legendTitle;
				var symbology = this.createNewChildLayer({
					layerName: symbologyLabel,
					layerId: symbologyId.toLowerCase(),
					layerConf: symbologyConfig,
					map: this._map,
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY,
					symbologyType: symbologyType,
					childrenTitle: symbologyChildrenTitle
				});
				if (firstSymbology == true)
				{
					// At least one symbology must be enabled, so enable the
					// first symbology in each layer
					symbology.enable();
					this.symbManager.setActiveSymbology(this.layerConf.id, symbologyConfig);
					firstSymbology = false;
				}

				// Get the array of legend configurations for the symbology
				var legendConfigArray = this.symbManager.getLegendConfigArrayBySymbology(symbologyConfig);
				for ( var legendId in legendConfigArray)
				{
					var legendConfig = legendConfigArray[legendId];

					var legendLabel = legendConfig.label;
					var legendSymbol = legendConfig.symbol;
					var legend = symbology.createNewChildLayer({
						layerConf: legendConfig,
						layerName: legendLabel,
						layerId: legendId.toLowerCase(),
						map: this._map,
						layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LEGEND,
						symbol: legendSymbol
					});
				}
			}
			// Checks if there is a default symbology configured for this layer
			// If so, enable this symbology
			var defaultSymbology = this.symbManager.getDefaultSymbologyForLayer(this.layerConf.id);
			if (defaultSymbology != null)
			{
				var symbology = null;
				symbology = dojo.filter(this.getChildren(), function(child)
				{
					return (child.layerId == defaultSymbology);
				});
				if (symbology.length > 0)
				{
					symbology[0].toggleState();
					this.symbManager.setActiveSymbology(this.layerConf.id, symbologyConfigArray[defaultSymbology]);
				}
			}
		}

		this.init();
	},
	/**
	 * Sets the left icon (on/off icon)
	 */
	init: function()
	{
		this._setLeftIconURL();
	},
	/**
	 * Sets the left icon (on/off icon)
	 */
	_setLeftIconURL: function()
	{
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		if (this.isDisabled())
		{
			this._leftIconURL = libraryManager.getLayerOffImageInfo().getImageURL();
		}
		else
		{
			this._leftIconURL = libraryManager.getLayerOnImageInfo().getImageURL();
		}
	},
	/**
	 * Sets the right icon (submenu icon)
	 */
	_setRightIconURL: function()
	{
		var libraryManager = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		this._rightIconURL = libraryManager.getLayerDetailsImageInfo().getImageURL();
		this._rightIconSet = true;
	},
	getLeftIconURL: function()
	{
		return this._leftIconURL;
	},
	getRightIconURL: function()
	{
		return this._rightIconURL;
	},
	/**
	 * Retrieves the layer name
	 */
	getLayerName: function()
	{
		return this._layerName;
	},
	getLayerId: function()
	{
		return this._layerId;
	},
	getMXRecordSet: function()
	{
		return this._records;
	},
	/**
	 * Enables or disables this layer
	 */
	toggleState: function()
	{
		if (this.isDisabled())
		{
			this.enable();
		}
		else
		{
			this.disable();
		}
	},
	/**
	 * Shows records on the map - should be used to show a brand new set of
	 * records. this method is called to show records for the first time.
	 */
	show: function()
	{
		this._disabled = false;
		if (this._records != null)
		{
			this._records.showMXRecordsOnMap();
		}
	},
	addRecord: function(mboInfo, markerOptions)
	{
		var _exists =this._getRecord(mboInfo);
		if (_exists!=null)
		{				
			console.log("conta",this.layerRecords[_exists].counter);
			mboInfo.counter=this.layerRecords[_exists].counter;
			this.map.removeMboMarkerFromMap(this.layerRecords[_exists], this._layerId);
			mboInfo.counter++;
			this.layerRecords[_exists]=mboInfo;
			
		}
		else
		{
			mboInfo.counter = 1;
			this.layerRecords.push(mboInfo);
		}
		//mboInfo.counter++;
		//this.layerRecords.push(mboInfo);

		if (!this.isDisabled())
		{
			this.map.addMboMarker(mboInfo, markerOptions, this._layerId);
		}
	},
	removeRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				var contador = --this.layerRecords[i].counter;
				if (contador == 0)
				{
					this.layerRecords.splice(i, 1);
					this.map.removeMboMarkerFromMap(mboInfo, this._layerId);
				}
				return contador;
			}
		}
	},
	_getRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				return i;
			}
		}
		return null;
	},
	hasRecord: function(mboInfo)
	{
		for ( var i = 0; i < this.layerRecords.length; ++i)
		{
			if (this._mboInfosEqual(this.layerRecords[i], mboInfo))
			{
				return true;
			}
		}
		return false;
	},
	_mboInfosEqual: function(mboInfo1, mboInfo2)
	{
		return (mboInfo1.mxdata.mboName == mboInfo2.mxdata.mboName && mboInfo1.mxdata.uid.value == mboInfo2.mxdata.uid.value);
	},
	hasRecords: function()
	{
		return this.layerRecords.length > 0;
	},
	isVisibleInUI: function()
	{
		if (this.layerType == ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER)
		{
			return this.hasRecords();
		}
		else
		{
			return true;
		}
	},
	/**
	 * Adds records to the layer
	 */
	addMXRecordSet: function(anotherMXRecordSet)
	{
		if (this._records != null)
		{
			this._records.addMXRecordSet(anotherMXRecordSet);
		}

	},
	/**
	 * Removes records from the layer
	 */
	removeMXRecordSetData: function()
	{
		if (this._records != null)
		{
			this._records.removeMXRecordsFromMap();
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Layer] _records is null");
			}
		}
		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarker(mboInfo, this._layerId);
			}
			this.layerRecords = [];
		}
	},
	/**
	 * Checks whether this layer is currently disabled
	 */
	isDisabled: function()
	{
		return (this._disabled == true);
	},
	/**
	 * Removes records by ID
	 */
	removeMXRecordByUid: function(uidData)
	{
		if (this._records != null)
		{
			this._records.removeRecordFromMap(uidData);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Layer] _records is null");
			}
		}
	},
	/**
	 * Creates a new child layer based on its type
	 */
	createNewChildLayer: function(options)
	{

		var layer = null;
		options.parentLayer = this;

		// Create the child layer according to its type
		switch (options.layerType)
		{
			case ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY:
				layer = new ibm.tivoli.fwm.mxmap.layers.SymbologyLayer(options);
				break;
			case ibm.tivoli.fwm.mxmap.layers.LayerType.LEGEND:
				layer = new ibm.tivoli.fwm.mxmap.layers.LegendLayer(options);
				break;
			default:
				layer = new ibm.tivoli.fwm.mxmap.layers.Layer(options);
				break;
		}
		;

		// Add the layer to the array of child layers
		if (layer != null)
		{
			this.addChildLayer(layer);
		}

		return layer;
	},
	/**
	 * Adds the child layer to the array
	 */
	addChildLayer: function(layer, cleanBeforeAdd)
	{
		var layerName = layer.getLayerName();
		var _layer = this.getChildLayer(layerName);
		if (_layer == null)
		{
			this._childLayers[layerName] = layer;
		}
		// If this layer has at least one child, set the submenu icon
		if (this._rightIconSet == false)
		{
			this._setRightIconURL();
		}
	},
	/*
	 * Retrieves the child layer by name
	 */
	getChildLayer: function(layerName)
	{
		if (this._childLayers.hasOwnProperty(layerName) == true)
		{
			return this._childLayers[layerName];
		}
		return null;
	},
	/**
	 * Returns an array with all the existing layers
	 */
	getChildren: function()
	{
		var array = [];
		for ( var index in this._childLayers)
		{
			array.push(this._childLayers[index]);
		}
		return array;
	},
	/**
	 * Retrieves the parent layer
	 */
	getParentLayer: function()
	{
		return this._parentLayer;
	},
	/**
	 * Retrieves sibling layers
	 */
	getSiblings: function()
	{
		return this.isRoot() ? null : this._parentLayer.getChildren();

	},
	/**
	 * Checks if this layer has children
	 */
	hasChildren: function()
	{
		var hasChildren = false;
		for ( var index in this._childLayers)
		{
			hasChildren = true;
			break;
		}
		return hasChildren;
	},
	/**
	 * Checks if this layer is a root layer
	 */
	isRoot: function()
	{
		return (this._parentLayer == null);
	},
	/**
	 * Enables this layer making its records visible
	 */
	enable: function()
	{
		this._disabled = false;

		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.showMboMarker(mboInfo, this._layerId);
			}
		}
		this._setLeftIconURL();
	},
	/**
	 * Disables this layer making its records invisible
	 */
	disable: function()
	{
		this._disabled = true;

		if (this.layerRecords != null)
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarkerFromMap(mboInfo, this._layerId);
			}
		}
		this._setLeftIconURL();

	},
	redrawMarkers: function()
	{
		if (this.layerRecords != null && !this.isDisabled())
		{
			for (rec in this.layerRecords)
			{
				var mboInfo = this.layerRecords[rec];
				this._map.removeMboMarkerFromMap(mboInfo, this._layerId);
				this._map.showMboMarker(mboInfo, this._layerId);
			}
		}
	},
	getChildrenTitle: function()
	{
		return this._childrenTitle;
	},
	setMboMarkerInfo: function(mboInfo, opt)
	{
		return this._mboMarkerOptions.setMboMarkerInfo(mboInfo, opt);
	},
	getMboMarkerInfo: function(mboInfo)
	{
		return this._mboMarkerOptions.getMboMarkerInfo(mboInfo);
	}

});

function MboMarkerOptionsTable()
{
	this.mbosOnMap = {};
	/*
	 * Stores a reference for the given MBO with the given options. If a
	 * reference already exists, updates all of its properties with the given
	 * ones.
	 */
	this.setMboMarkerInfo = function(mboInfo, opt)
	{
		this._createMboMarkerHashRecord(mboInfo);
		for ( var propName in opt)
		{
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value][propName] = opt[propName];
		}

	};
	/*
	 * Creates a reference for the given MBO in the map's MBO marker map. The
	 * reference count is initialized to 0.
	 */
	this._createMboMarkerHashRecord = function(mboInfo)
	{
		if (!this.mbosOnMap[mboInfo.mxdata.mboName])
		{
			this.mbosOnMap[mboInfo.mxdata.mboName] = {};
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value])
		{
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value] = {};
			this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value]["layerCount"] = 0;
		}
	};
	/*
	 * Returns the stored info for the given MBO.
	 */
	this.getMboMarkerInfo = function(mboInfo)
	{
		if (!mboInfo.mxdata)
		{
			return null;
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName])
		{
			return null;
		}
		if (!this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value])
		{
			return null;
		}
		return this.mbosOnMap[mboInfo.mxdata.mboName][mboInfo.mxdata.uid.value];
	};
};

});

},
'dojo/dnd/common':function(){
define("dojo/dnd/common", ["../main"], function(dojo) {
	// module:
	//		dojo/dnd/common
	// summary:
	//		TODOC

dojo.getObject("dnd", true, dojo);

dojo.dnd.getCopyKeyState = dojo.isCopyKey;

dojo.dnd._uniqueId = 0;
dojo.dnd.getUniqueId = function(){
	// summary:
	//		returns a unique string for use with any DOM element
	var id;
	do{
		id = dojo._scopeName + "Unique" + (++dojo.dnd._uniqueId);
	}while(dojo.byId(id));
	return id;
};

dojo.dnd._empty = {};

dojo.dnd.isFormElement = function(/*Event*/ e){
	// summary:
	//		returns true if user clicked on a form element
	var t = e.target;
	if(t.nodeType == 3 /*TEXT_NODE*/){
		t = t.parentNode;
	}
	return " button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0;	// Boolean
};

return dojo.dnd;
});

},
'dijit/CheckedMenuItem':function(){
require({cache:{
'url:dijit/templates/CheckedMenuItem.html':"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem", [
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.toggle
	"./MenuItem",
	"dojo/text!./templates/CheckedMenuItem.html",
	"./hccss"
], function(declare, domClass, MenuItem, template){

/*=====
	var MenuItem = dijit.MenuItem;
=====*/

	// module:
	//		dijit/CheckedMenuItem
	// summary:
	//		A checkbox-like menu item for toggling on and off

	return declare("dijit.CheckedMenuItem", MenuItem, {
		// summary:
		//		A checkbox-like menu item for toggling on and off

		templateString: template,

		// checked: Boolean
		//		Our checked state
		checked: false,
		_setCheckedAttr: function(/*Boolean*/ checked){
			// summary:
			//		Hook so attr('checked', bool) works.
			//		Sets the class and state for the check box.
			domClass.toggle(this.domNode, "dijitCheckedMenuItemChecked", checked);
			this.domNode.setAttribute("aria-checked", checked);
			this._set("checked", checked);
		},

		iconClass: "",	// override dijitNoIcon

		onChange: function(/*Boolean*/ /*===== checked =====*/){
			// summary:
			//		User defined function to handle check/uncheck events
			// tags:
			//		callback
		},

		_onClick: function(/*Event*/ e){
			// summary:
			//		Clicking this item just toggles its state
			// tags:
			//		private
			if(!this.disabled){
				this.set("checked", !this.checked);
				this.onChange(this.checked);
			}
			this.inherited(arguments);
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/actions/SetRecordLocation':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/actions/Actions,ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation");
dojo.require("ibm.tivoli.fwm.mxmap.actions.Actions");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

/**
 * Action to set the location of the current record.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation", [ ibm.tivoli.fwm.mxmap.actions.Actions, ibm.tivoli.fwm.mxmap._Base ], {

	constructor : function(params) {
		dojo.mixin(this, params);
		this.label = ibm.tivoli.fwm.i18n.getMaxMsg("map","set_recloc_label");//"Set record Location";
		this.mapstraction = this.map.getMapstraction();
		/* used to remove the temp pushpin */
		this.addSubscription(dojo.subscribe("onCurrentLocationUpdated_"+this.map.getId(), dojo.hitch(this, this._clearMarker)));
		this.addSubscription(dojo.subscribe("onServerException_"+this.map.getId(), dojo.hitch(this, this._clearMarker)));
	},
	marker : null,
	mapstraction : null,
	/**
	 * Removes the temp marker after the current record location was updated.
	 */
	_clearMarker : function() {
		
		if (this.marker != null) {
			if (dojo.config.fwm.debug == true)
			{
				console.log("[SetRecordLocation] Clearing Temporary Marker", this.marker);
			}
			this.mapstraction.removeMarker(this.marker);
		}
	},
	/**
	 * Returns the image path to be used. Checks for a custom path or returns the default.
	 * */
	_getPushPinImagePath: function(){
		var defaultImagePath = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultReadOnlyMarkerImageInfo().getImageURL();
		var custom = this.map.mapConf.markerimgurl;
		if(custom != null && custom.trim().length > 0){
			return custom;
		}
		return defaultImagePath;
		 
	},
	/**
	 * Load the current right click position and updates server's current record
	 * data
	 * 
	 * @Override Action method
	 */
	execute : function(args) {
		if (this.marker != null) {
			this.mapstraction.removeMarker(this.marker);
		}
		this.marker = new mxn.Marker(args.mapLocation);		
		var tempPushPin = this._getPushPinImagePath();
		var markerData = {
			draggable : true,
			icon : tempPushPin,
			iconSize : [ 32, 32 ],
			iconAnchor : [ 11, 32 ],
			hover : true
		};
		
		// middle and not bottom right.
		this.mapstraction.addMarkerWithData(this.marker, markerData);
		// adds are only allowed if we have the mainrecord as DS, so we use the first record
		this.map.currentRecordMgr.reverseGeocodeCurrentRecord(args.mapLocation);		
	}

});
});

},
'dijit/_base/place':function(){
define("dijit/_base/place", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/lang", // lang.isArray
	"dojo/window", // windowUtils.getBox
	"../place",
	".."	// export to dijit namespace
], function(array, lang, windowUtils, place, dijit){

	// module:
	//		dijit/_base/place
	// summary:
	//		Back compatibility module, new code should use dijit/place directly instead of using this module.

	dijit.getViewport = function(){
		// summary:
		//		Deprecated method to return the dimensions and scroll position of the viewable area of a browser window.
		//		New code should use windowUtils.getBox()

		return windowUtils.getBox();
	};

	/*=====
	dijit.placeOnScreen = function(node, pos, corners, padding){
		// summary:
		//		Positions one of the node's corners at specified position
		//		such that node is fully visible in viewport.
		//		Deprecated, new code should use dijit.place.at() instead.
	};
	=====*/
	dijit.placeOnScreen = place.at;

	/*=====
	dijit.placeOnScreenAroundElement = function(node, aroundElement, aroundCorners, layoutNode){
		// summary:
		//		Like dijit.placeOnScreenAroundNode(), except it accepts an arbitrary object
		//		for the "around" argument and finds a proper processor to place a node.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	====*/
	dijit.placeOnScreenAroundElement = function(node, aroundNode, aroundCorners, layoutNode){
		// Convert old style {"BL": "TL", "BR": "TR"} type argument
		// to style needed by dijit.place code:
		//		[
		// 			{aroundCorner: "BL", corner: "TL" },
		//			{aroundCorner: "BR", corner: "TR" }
		//		]
		var positions;
		if(lang.isArray(aroundCorners)){
			positions = aroundCorners;
		}else{
			positions = [];
			for(var key in aroundCorners){
				positions.push({aroundCorner: key, corner: aroundCorners[key]});
			}
		}

		return place.around(node, aroundNode, positions, true, layoutNode);
	};

	/*=====
	dijit.placeOnScreenAroundNode = function(node, aroundNode, aroundCorners, layoutNode){
		// summary:
		//		Position node adjacent or kitty-corner to aroundNode
		//		such that it's fully visible in viewport.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	=====*/
	dijit.placeOnScreenAroundNode = dijit.placeOnScreenAroundElement;

	/*=====
	dijit.placeOnScreenAroundRectangle = function(node, aroundRect, aroundCorners, layoutNode){
		// summary:
		//		Like dijit.placeOnScreenAroundNode(), except that the "around"
		//		parameter is an arbitrary rectangle on the screen (x, y, width, height)
		//		instead of a dom node.
		//		Deprecated, new code should use dijit.place.around() instead.
	};
	=====*/
	dijit.placeOnScreenAroundRectangle = dijit.placeOnScreenAroundElement;

	dijit.getPopupAroundAlignment = function(/*Array*/ position, /*Boolean*/ leftToRight){
		// summary:
		//		Deprecated method, unneeded when using dijit/place directly.
		//		Transforms the passed array of preferred positions into a format suitable for
		//		passing as the aroundCorners argument to dijit.placeOnScreenAroundElement.
		//
		// position: String[]
		//		This variable controls the position of the drop down.
		//		It's an array of strings with the following values:
		//
		//			* before: places drop down to the left of the target node/widget, or to the right in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* after: places drop down to the right of the target node/widget, or to the left in
		//			  the case of RTL scripts like Hebrew and Arabic
		//			* above: drop down goes above target node
		//			* below: drop down goes below target node
		//
		//		The list is positions is tried, in order, until a position is found where the drop down fits
		//		within the viewport.
		//
		// leftToRight: Boolean
		//		Whether the popup will be displaying in leftToRight mode.
		//
		var align = {};
		array.forEach(position, function(pos){
			var ltr = leftToRight;
			switch(pos){
				case "after":
					align[leftToRight ? "BR" : "BL"] = leftToRight ? "BL" : "BR";
					break;
				case "before":
					align[leftToRight ? "BL" : "BR"] = leftToRight ? "BR" : "BL";
					break;
				case "below-alt":
					ltr = !ltr;
					// fall through
				case "below":
					// first try to align left borders, next try to align right borders (or reverse for RTL mode)
					align[ltr ? "BL" : "BR"] = ltr ? "TL" : "TR";
					align[ltr ? "BR" : "BL"] = ltr ? "TR" : "TL";
					break;
				case "above-alt":
					ltr = !ltr;
					// fall through
				case "above":
				default:
					// first try to align left borders, next try to align right borders (or reverse for RTL mode)
					align[ltr ? "TL" : "TR"] = ltr ? "BL" : "BR";
					align[ltr ? "TR" : "TL"] = ltr ? "BR" : "BL";
					break;
			}
		});
		return align;
	};

	return dijit;
});

},
'ibm/tivoli/fwm/mxmap/impl/BingMaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.BingMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.declare("ibm.tivoli.fwm.mxmap.impl.BingMaps", ibm.tivoli.fwm.mxmap.Map, {

	constructor: function(options)
	{
		this.providerName = "microsoftv7";
	},
	/**
	 * These options will refine maps UI. See their descriptions at:
	 * http://msdn.microsoft.com/en-us/library/gg427603.aspx
	 */
	_getInitOptions: function()
	{
		var options = {};
		
		options.fixedMapPosition = false;
		options.useInertia = true;
		options.showScalebar = true;
		options.disableTouchInput = false;// allows user to touch screen.
		options.enableClickableLogo = false;
		options.enableSearchLogo = false;
		options.showCopyright = true;
		options.mapTypeId = Microsoft.Maps.MapTypeId.road;
		/* FWM opts */
		options.isIE = dojo.isIE;
		
		if (this.isMobile == true)
		{
			// 12-12979 Commenting out the line below because this option was making
			// the repositioning of maptips fail when resizing the mapcontrol div
			// options.fixedMapPosition = true;
			options.showScalebar = false;
		}
		
		options.initialLocation=this._getInitialLocation();
		
		
		return options;

	},
	_getCustomInitOptions: function()
	{
		if (this.customInitialMapOptions)
		{
			return this.customInitialMapOptions.bingmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	destroyMap: function()
	{
		console.log("Destroying map!");
		try
		{
			var map = this.getMapstraction();

			if (typeof (map) != 'undefined' && map != null)
			{
				map.destroyMap();
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log("map was destroyed!");
			}
		}
		catch (e)
		{
			console.error("cannot destroy bing maps ", e.message);
		}

	}

});
});

},
'dijit/MenuSeparator':function(){
require({cache:{
'url:dijit/templates/MenuSeparator.html':"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator", [
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"./_WidgetBase",
	"./_TemplatedMixin",
	"./_Contained",
	"dojo/text!./templates/MenuSeparator.html"
], function(declare, dom, _WidgetBase, _TemplatedMixin, _Contained, template){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _Contained = dijit._Contained;
=====*/

	// module:
	//		dijit/MenuSeparator
	// summary:
	//		A line between two menu items

	return declare("dijit.MenuSeparator", [_WidgetBase, _TemplatedMixin, _Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});
});

},
'ibm/tivoli/fwm/mxmap/impl/GMaps':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.GMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.declare("ibm.tivoli.fwm.mxmap.impl.GMaps", ibm.tivoli.fwm.mxmap.Map, {
	
	constructor : function(options) {
		this.providerName="googlev3";
	},
	_getCustomInitOptions:function(){
		
		if(this.customInitialMapOptions){
			return this.customInitialMapOptions.gmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	_getInitOptions : function() {
		var options = {
			panControl : true,
			mapTypeControl : true,
			scaleControl : true,
			overviewMapControl : true,
			streetViewControl : true,
			scaleControlOptions : {
				style : google.maps.ScaleControlStyle.DEFAULT
			},
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

		if (this.isMobile == true) {
			options.panControl = false; //does not work and looks bad on native android browser
			options.overviewMapControl = false;
			options.scaleControl = false; //looks bad on native android browser and takes space from map
		}

		return options;
	},
	destroyMap:function(){
		//TODO
	}
	
});
});

},
'dijit/Dialog':function(){
require({cache:{
'url:dijit/templates/Dialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog", [
	"require",
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/connect", // connect._keypress
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred", // Deferred
	"dojo/dom", // dom.isDescendant
	"dojo/dom-class", // domClass.add domClass.contains
	"dojo/dom-geometry", // domGeometry.position
	"dojo/dom-style", // domStyle.set
	"dojo/_base/event", // event.stop
	"dojo/_base/fx", // fx.fadeIn fx.fadeOut
	"dojo/i18n", // i18n.getLocalization
	"dojo/_base/kernel", // kernel.isAsync
	"dojo/keys",
	"dojo/_base/lang", // lang.mixin lang.hitch
	"dojo/on",
	"dojo/ready",
	"dojo/_base/sniff", // has("ie") has("opera")
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.getBox
	"dojo/dnd/Moveable", // Moveable
	"dojo/dnd/TimedMoveable", // TimedMoveable
	"./focus",
	"./_base/manager",	// manager.defaultDuration
	"./_Widget",
	"./_TemplatedMixin",
	"./_CssStateMixin",
	"./form/_FormMixin",
	"./_DialogMixin",
	"./DialogUnderlay",
	"./layout/ContentPane",
	"dojo/text!./templates/Dialog.html",
	".",			// for back-compat, exporting dijit._underlay (remove in 2.0)
	"dojo/i18n!./nls/common"
], function(require, array, connect, declare, Deferred,
			dom, domClass, domGeometry, domStyle, event, fx, i18n, kernel, keys, lang, on, ready, has, win, winUtils,
			Moveable, TimedMoveable, focus, manager, _Widget, _TemplatedMixin, _CssStateMixin, _FormMixin, _DialogMixin,
			DialogUnderlay, ContentPane, template, dijit){
	
/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _CssStateMixin = dijit._CssStateMixin;
	var _FormMixin = dijit.form._FormMixin;
	var _DialogMixin = dijit._DialogMixin;
=====*/	


	// module:
	//		dijit/Dialog
	// summary:
	//		A modal dialog Widget


	/*=====
	dijit._underlay = function(kwArgs){
		// summary:
		//		A shared instance of a `dijit.DialogUnderlay`
		//
		// description:
		//		A shared instance of a `dijit.DialogUnderlay` created and
		//		used by `dijit.Dialog`, though never created until some Dialog
		//		or subclass thereof is shown.
	};
	=====*/

	var _DialogBase = declare("dijit._DialogBase", [_TemplatedMixin, _FormMixin, _DialogMixin, _CssStateMixin], {
		// summary:
		//		A modal dialog Widget
		//
		// description:
		//		Pops up a modal dialog window, blocking access to the screen
		//		and also graying out the screen Dialog is extended from
		//		ContentPane so it supports all the same parameters (href, etc.)
		//
		// example:
		// |	<div data-dojo-type="dijit.Dialog" data-dojo-props="href: 'test.html'"></div>
		//
		// example:
		// |	var foo = new dijit.Dialog({ title: "test dialog", content: "test content" };
		// |	dojo.body().appendChild(foo.domNode);
		// |	foo.startup();

		templateString: template,

		baseClass: "dijitDialog",

		cssStateNodes: {
			closeButtonNode: "dijitDialogCloseIcon"
		},

		// Map widget attributes to DOMNode attributes.
		_setTitleAttr: [
			{ node: "titleNode", type: "innerHTML" },
			{ node: "titleBar", type: "attribute" }
		],

		// open: [readonly] Boolean
		//		True if Dialog is currently displayed on screen.
		open: false,

		// duration: Integer
		//		The time in milliseconds it takes the dialog to fade in and out
		duration: manager.defaultDuration,

		// refocus: Boolean
		// 		A Toggle to modify the default focus behavior of a Dialog, which
		// 		is to re-focus the element which had focus before being opened.
		//		False will disable refocusing. Default: true
		refocus: true,

		// autofocus: Boolean
		// 		A Toggle to modify the default focus behavior of a Dialog, which
		// 		is to focus on the first dialog element after opening the dialog.
		//		False will disable autofocusing. Default: true
		autofocus: true,

		// _firstFocusItem: [private readonly] DomNode
		//		The pointer to the first focusable node in the dialog.
		//		Set by `dijit._DialogMixin._getFocusItems`.
		_firstFocusItem: null,

		// _lastFocusItem: [private readonly] DomNode
		//		The pointer to which node has focus prior to our dialog.
		//		Set by `dijit._DialogMixin._getFocusItems`.
		_lastFocusItem: null,

		// doLayout: [protected] Boolean
		//		Don't change this parameter from the default value.
		//		This ContentPane parameter doesn't make sense for Dialog, since Dialog
		//		is never a child of a layout container, nor can you specify the size of
		//		Dialog in order to control the size of an inner widget.
		doLayout: false,

		// draggable: Boolean
		//		Toggles the moveable aspect of the Dialog. If true, Dialog
		//		can be dragged by it's title. If false it will remain centered
		//		in the viewport.
		draggable: true,

		//aria-describedby: String
		//		Allows the user to add an aria-describedby attribute onto the dialog.   The value should
		//		be the id of the container element of text that describes the dialog purpose (usually
		//		the first text in the dialog).
		//		<div data-dojo-type="dijit.Dialog" aria-describedby="intro" .....>
		//			<div id="intro">Introductory text</div>
		//			<div>rest of dialog contents</div>
		//		</div>
		"aria-describedby":"",

		postMixInProperties: function(){
			var _nlsResources = i18n.getLocalization("dijit", "common");
			lang.mixin(this, _nlsResources);
			this.inherited(arguments);
		},

		postCreate: function(){
			domStyle.set(this.domNode, {
				display: "none",
				position:"absolute"
			});
			win.body().appendChild(this.domNode);

			this.inherited(arguments);

			this.connect(this, "onExecute", "hide");
			this.connect(this, "onCancel", "hide");
			this._modalconnects = [];
		},

		onLoad: function(){
			// summary:
			//		Called when data has been loaded from an href.
			//		Unlike most other callbacks, this function can be connected to (via `dojo.connect`)
			//		but should *not* be overridden.
			// tags:
			//		callback

			// when href is specified we need to reposition the dialog after the data is loaded
			// and find the focusable elements
			this._position();
			if(this.autofocus && DialogLevelManager.isTop(this)){
				this._getFocusItems(this.domNode);
				focus.focus(this._firstFocusItem);
			}
			this.inherited(arguments);
		},

		_endDrag: function(){
			// summary:
			//		Called after dragging the Dialog. Saves the position of the dialog in the viewport,
			//		and also adjust position to be fully within the viewport, so user doesn't lose access to handle
			var nodePosition = domGeometry.position(this.domNode),
				viewport = winUtils.getBox();
			nodePosition.y = Math.min(Math.max(nodePosition.y, 0), (viewport.h - nodePosition.h));
			nodePosition.x = Math.min(Math.max(nodePosition.x, 0), (viewport.w - nodePosition.w));
			this._relativePosition = nodePosition;
			this._position();
		},

		_setup: function(){
			// summary:
			//		Stuff we need to do before showing the Dialog for the first
			//		time (but we defer it until right beforehand, for
			//		performance reasons).
			// tags:
			//		private

			var node = this.domNode;

			if(this.titleBar && this.draggable){
				this._moveable = new ((has("ie") == 6) ? TimedMoveable // prevent overload, see #5285
					: Moveable)(node, { handle: this.titleBar });
				this.connect(this._moveable, "onMoveStop", "_endDrag");
			}else{
				domClass.add(node,"dijitDialogFixed");
			}

			this.underlayAttrs = {
				dialogId: this.id,
				"class": array.map(this["class"].split(/\s/), function(s){ return s+"_underlay"; }).join(" ")
			};
		},

		_size: function(){
			// summary:
			// 		If necessary, shrink dialog contents so dialog fits in viewport
			// tags:
			//		private

			this._checkIfSingleChild();

			// If we resized the dialog contents earlier, reset them back to original size, so
			// that if the user later increases the viewport size, the dialog can display w/out a scrollbar.
			// Need to do this before the domGeometry.position(this.domNode) call below.
			if(this._singleChild){
				if(this._singleChildOriginalStyle){
					this._singleChild.domNode.style.cssText = this._singleChildOriginalStyle;
				}
				delete this._singleChildOriginalStyle;
			}else{
				domStyle.set(this.containerNode, {
					width:"auto",
					height:"auto"
				});
			}

			var bb = domGeometry.position(this.domNode);
			var viewport = winUtils.getBox();
			if(bb.w >= viewport.w || bb.h >= viewport.h){
				// Reduce size of dialog contents so that dialog fits in viewport

				var w = Math.min(bb.w, Math.floor(viewport.w * 0.75)),
					h = Math.min(bb.h, Math.floor(viewport.h * 0.75));

				if(this._singleChild && this._singleChild.resize){
					this._singleChildOriginalStyle = this._singleChild.domNode.style.cssText;
					this._singleChild.resize({w: w, h: h});
				}else{
					domStyle.set(this.containerNode, {
						width: w + "px",
						height: h + "px",
						overflow: "auto",
						position: "relative"	// workaround IE bug moving scrollbar or dragging dialog
					});
				}
			}else{
				if(this._singleChild && this._singleChild.resize){
					this._singleChild.resize();
				}
			}
		},

		_position: function(){
			// summary:
			//		Position modal dialog in the viewport. If no relative offset
			//		in the viewport has been determined (by dragging, for instance),
			//		center the node. Otherwise, use the Dialog's stored relative offset,
			//		and position the node to top: left: values based on the viewport.
			if(!domClass.contains(win.body(), "dojoMove")){	// don't do anything if called during auto-scroll
				var node = this.domNode,
					viewport = winUtils.getBox(),
					p = this._relativePosition,
					bb = p ? null : domGeometry.position(node),
					l = Math.floor(viewport.l + (p ? p.x : (viewport.w - bb.w) / 2)),
					t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2))
				;
				domStyle.set(node,{
					left: l + "px",
					top: t + "px"
				});
			}
		},

		_onKey: function(/*Event*/ evt){
			// summary:
			//		Handles the keyboard events for accessibility reasons
			// tags:
			//		private

			if(evt.charOrCode){
				var node = evt.target;
				if(evt.charOrCode === keys.TAB){
					this._getFocusItems(this.domNode);
				}
				var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
				// see if we are shift-tabbing from first focusable item on dialog
				if(node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === keys.TAB){
					if(!singleFocusItem){
						focus.focus(this._lastFocusItem); // send focus to last item in dialog
					}
					event.stop(evt);
				}else if(node == this._lastFocusItem && evt.charOrCode === keys.TAB && !evt.shiftKey){
					if(!singleFocusItem){
						focus.focus(this._firstFocusItem); // send focus to first item in dialog
					}
					event.stop(evt);
				}else{
					// see if the key is for the dialog
					while(node){
						if(node == this.domNode || domClass.contains(node, "dijitPopup")){
							if(evt.charOrCode == keys.ESCAPE){
								this.onCancel();
							}else{
								return; // just let it go
							}
						}
						node = node.parentNode;
					}
					// this key is for the disabled document window
					if(evt.charOrCode !== keys.TAB){ // allow tabbing into the dialog for a11y
						event.stop(evt);
					// opera won't tab to a div
					}else if(!has("opera")){
						try{
							this._firstFocusItem.focus();
						}catch(e){ /*squelch*/ }
					}
				}
			}
		},

		show: function(){
			// summary:
			//		Display the dialog
			// returns: dojo.Deferred
			//		Deferred object that resolves when the display animation is complete

			if(this.open){ return; }

			if(!this._started){
				this.startup();
			}

			// first time we show the dialog, there's some initialization stuff to do
			if(!this._alreadyInitialized){
				this._setup();
				this._alreadyInitialized=true;
			}

			if(this._fadeOutDeferred){
				this._fadeOutDeferred.cancel();
			}

			this._modalconnects.push(on(window, "scroll", lang.hitch(this, "layout")));
			this._modalconnects.push(on(window, "resize", lang.hitch(this, function(){
				// IE gives spurious resize events and can actually get stuck
				// in an infinite loop if we don't ignore them
				var viewport = winUtils.getBox();
				if(!this._oldViewport ||
						viewport.h != this._oldViewport.h ||
						viewport.w != this._oldViewport.w){
					this.layout();
					this._oldViewport = viewport;
				}
			})));
			this._modalconnects.push(on(this.domNode, connect._keypress, lang.hitch(this, "_onKey")));

			domStyle.set(this.domNode, {
				opacity:0,
				display:""
			});

			this._set("open", true);
			this._onShow(); // lazy load trigger

			this._size();
			this._position();

			// fade-in Animation object, setup below
			var fadeIn;

			this._fadeInDeferred = new Deferred(lang.hitch(this, function(){
				fadeIn.stop();
				delete this._fadeInDeferred;
			}));

			fadeIn = fx.fadeIn({
				node: this.domNode,
				duration: this.duration,
				beforeBegin: lang.hitch(this, function(){
					DialogLevelManager.show(this, this.underlayAttrs);
				}),
				onEnd: lang.hitch(this, function(){
					if(this.autofocus && DialogLevelManager.isTop(this)){
						// find focusable items each time dialog is shown since if dialog contains a widget the
						// first focusable items can change
						this._getFocusItems(this.domNode);
						focus.focus(this._firstFocusItem);
					}
					this._fadeInDeferred.callback(true);
					delete this._fadeInDeferred;
				})
			}).play();

			return this._fadeInDeferred;
		},

		hide: function(){
			// summary:
			//		Hide the dialog
			// returns: dojo.Deferred
			//		Deferred object that resolves when the hide animation is complete

			// if we haven't been initialized yet then we aren't showing and we can just return
			if(!this._alreadyInitialized){
				return;
			}
			if(this._fadeInDeferred){
				this._fadeInDeferred.cancel();
			}

			// fade-in Animation object, setup below
			var fadeOut;

			this._fadeOutDeferred = new Deferred(lang.hitch(this, function(){
				fadeOut.stop();
				delete this._fadeOutDeferred;
			}));
			// fire onHide when the promise resolves.
			this._fadeOutDeferred.then(lang.hitch(this, 'onHide'));

			fadeOut = fx.fadeOut({
				node: this.domNode,
				duration: this.duration,
				onEnd: lang.hitch(this, function(){
					this.domNode.style.display = "none";
					DialogLevelManager.hide(this);
					this._fadeOutDeferred.callback(true);
					delete this._fadeOutDeferred;
				})
			 }).play();

			if(this._scrollConnected){
				this._scrollConnected = false;
			}
			var h;
			while(h = this._modalconnects.pop()){
				h.remove();
			}

			if(this._relativePosition){
				delete this._relativePosition;
			}
			this._set("open", false);

			return this._fadeOutDeferred;
		},

		layout: function(){
			// summary:
			//		Position the Dialog and the underlay
			// tags:
			//		private
			if(this.domNode.style.display != "none"){
				if(dijit._underlay){	// avoid race condition during show()
					dijit._underlay.layout();
				}
				this._position();
			}
		},

		destroy: function(){
			if(this._fadeInDeferred){
				this._fadeInDeferred.cancel();
			}
			if(this._fadeOutDeferred){
				this._fadeOutDeferred.cancel();
			}
			if(this._moveable){
				this._moveable.destroy();
			}
			var h;
			while(h = this._modalconnects.pop()){
				h.remove();
			}

			DialogLevelManager.hide(this);

			this.inherited(arguments);
		}
	});

	var Dialog = declare("dijit.Dialog", [ContentPane, _DialogBase], {});
	Dialog._DialogBase = _DialogBase;	// for monkey patching

	var DialogLevelManager = Dialog._DialogLevelManager = {
		// summary:
		//		Controls the various active "levels" on the page, starting with the
		//		stuff initially visible on the page (at z-index 0), and then having an entry for
		//		each Dialog shown.

		_beginZIndex: 950,

		show: function(/*dijit._Widget*/ dialog, /*Object*/ underlayAttrs){
			// summary:
			//		Call right before fade-in animation for new dialog.
			//		Saves current focus, displays/adjusts underlay for new dialog,
			//		and sets the z-index of the dialog itself.
			//
			//		New dialog will be displayed on top of all currently displayed dialogs.
			//
			//		Caller is responsible for setting focus in new dialog after the fade-in
			//		animation completes.

			// Save current focus
			ds[ds.length-1].focus = focus.curNode;

			// Display the underlay, or if already displayed then adjust for this new dialog
			var underlay = dijit._underlay;
			if(!underlay || underlay._destroyed){
				underlay = dijit._underlay = new DialogUnderlay(underlayAttrs);
			}else{
				underlay.set(dialog.underlayAttrs);
			}

			// Set z-index a bit above previous dialog
			var zIndex = ds[ds.length-1].dialog ? ds[ds.length-1].zIndex + 2 : Dialog._DialogLevelManager._beginZIndex;
			if(ds.length == 1){	// first dialog
				underlay.show();
			}
			domStyle.set(dijit._underlay.domNode, 'zIndex', zIndex - 1);

			// Dialog
			domStyle.set(dialog.domNode, 'zIndex', zIndex);

			ds.push({dialog: dialog, underlayAttrs: underlayAttrs, zIndex: zIndex});
		},

		hide: function(/*dijit._Widget*/ dialog){
			// summary:
			//		Called when the specified dialog is hidden/destroyed, after the fade-out
			//		animation ends, in order to reset page focus, fix the underlay, etc.
			//		If the specified dialog isn't open then does nothing.
			//
			//		Caller is responsible for either setting display:none on the dialog domNode,
			//		or calling dijit.popup.hide(), or removing it from the page DOM.

			if(ds[ds.length-1].dialog == dialog){
				// Removing the top (or only) dialog in the stack, return focus
				// to previous dialog

				ds.pop();

				var pd = ds[ds.length-1];	// the new active dialog (or the base page itself)

				// Adjust underlay
				if(ds.length == 1){
					// Returning to original page.
					// Hide the underlay, unless the underlay widget has already been destroyed
					// because we are being called during page unload (when all widgets are destroyed)
					if(!dijit._underlay._destroyed){
						dijit._underlay.hide();
					}
				}else{
					// Popping back to previous dialog, adjust underlay
					domStyle.set(dijit._underlay.domNode, 'zIndex', pd.zIndex - 1);
					dijit._underlay.set(pd.underlayAttrs);
				}

				// Adjust focus
				if(dialog.refocus){
					// If we are returning control to a previous dialog but for some reason
					// that dialog didn't have a focused field, set focus to first focusable item.
					// This situation could happen if two dialogs appeared at nearly the same time,
					// since a dialog doesn't set it's focus until the fade-in is finished.
					var focus = pd.focus;
					if(pd.dialog && (!focus || !dom.isDescendant(focus, pd.dialog.domNode))){
						pd.dialog._getFocusItems(pd.dialog.domNode);
						focus = pd.dialog._firstFocusItem;
					}

					if(focus){
						focus.focus();
					}
				}
			}else{
				// Removing a dialog out of order (#9944, #10705).
				// Don't need to mess with underlay or z-index or anything.
				var idx = array.indexOf(array.map(ds, function(elem){return elem.dialog}), dialog);
				if(idx != -1){
					ds.splice(idx, 1);
				}
			}
		},

		isTop: function(/*dijit._Widget*/ dialog){
			// summary:
			//		Returns true if specified Dialog is the top in the task
			return ds[ds.length-1].dialog == dialog;
		}
	};

	// Stack representing the various active "levels" on the page, starting with the
	// stuff initially visible on the page (at z-index 0), and then having an entry for
	// each Dialog shown.
	// Each element in stack has form {
	//		dialog: dialogWidget,
	//		focus: returnFromGetFocus(),
	//		underlayAttrs: attributes to set on underlay (when this widget is active)
	// }
	var ds = Dialog._dialogStack = [
		{dialog: null, focus: null, underlayAttrs: null}	// entry for stuff at z-index: 0
	];

	// Back compat w/1.6, remove for 2.0
	if(!kernel.isAsync){
		ready(0, function(){
			var requires = ["dijit/TooltipDialog"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return Dialog;
});

},
'dijit/_base/focus':function(){
define("dijit/_base/focus", [
	"dojo/_base/array", // array.forEach
	"dojo/dom", // dom.isDescendant
	"dojo/_base/lang", // lang.isArray
	"dojo/topic", // publish
	"dojo/_base/window", // win.doc win.doc.selection win.global win.global.getSelection win.withGlobal
	"../focus",
	".."	// for exporting symbols to dijit
], function(array, dom, lang, topic, win, focus, dijit){

	// module:
	//		dijit/_base/focus
	// summary:
	//		Deprecated module to monitor currently focused node and stack of currently focused widgets.
	//		New code should access dijit/focus directly.

	lang.mixin(dijit, {
		// _curFocus: DomNode
		//		Currently focused item on screen
		_curFocus: null,

		// _prevFocus: DomNode
		//		Previously focused item on screen
		_prevFocus: null,

		isCollapsed: function(){
			// summary:
			//		Returns true if there is no text selected
			return dijit.getBookmark().isCollapsed;
		},

		getBookmark: function(){
			// summary:
			//		Retrieves a bookmark that can be used with moveToBookmark to return to the same range
			var bm, rg, tg, sel = win.doc.selection, cf = focus.curNode;

			if(win.global.getSelection){
				//W3C Range API for selections.
				sel = win.global.getSelection();
				if(sel){
					if(sel.isCollapsed){
						tg = cf? cf.tagName : "";
						if(tg){
							//Create a fake rangelike item to restore selections.
							tg = tg.toLowerCase();
							if(tg == "textarea" ||
									(tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))){
								sel = {
									start: cf.selectionStart,
									end: cf.selectionEnd,
									node: cf,
									pRange: true
								};
								return {isCollapsed: (sel.end <= sel.start), mark: sel}; //Object.
							}
						}
						bm = {isCollapsed:true};
						if(sel.rangeCount){
							bm.mark = sel.getRangeAt(0).cloneRange();
						}
					}else{
						rg = sel.getRangeAt(0);
						bm = {isCollapsed: false, mark: rg.cloneRange()};
					}
				}
			}else if(sel){
				// If the current focus was a input of some sort and no selection, don't bother saving
				// a native bookmark.  This is because it causes issues with dialog/page selection restore.
				// So, we need to create psuedo bookmarks to work with.
				tg = cf ? cf.tagName : "";
				tg = tg.toLowerCase();
				if(cf && tg && (tg == "button" || tg == "textarea" || tg == "input")){
					if(sel.type && sel.type.toLowerCase() == "none"){
						return {
							isCollapsed: true,
							mark: null
						}
					}else{
						rg = sel.createRange();
						return {
							isCollapsed: rg.text && rg.text.length?false:true,
							mark: {
								range: rg,
								pRange: true
							}
						};
					}
				}
				bm = {};

				//'IE' way for selections.
				try{
					// createRange() throws exception when dojo in iframe
					//and nothing selected, see #9632
					rg = sel.createRange();
					bm.isCollapsed = !(sel.type == 'Text' ? rg.htmlText.length : rg.length);
				}catch(e){
					bm.isCollapsed = true;
					return bm;
				}
				if(sel.type.toUpperCase() == 'CONTROL'){
					if(rg.length){
						bm.mark=[];
						var i=0,len=rg.length;
						while(i<len){
							bm.mark.push(rg.item(i++));
						}
					}else{
						bm.isCollapsed = true;
						bm.mark = null;
					}
				}else{
					bm.mark = rg.getBookmark();
				}
			}else{
				console.warn("No idea how to store the current selection for this browser!");
			}
			return bm; // Object
		},

		moveToBookmark: function(/*Object*/ bookmark){
			// summary:
			//		Moves current selection to a bookmark
			// bookmark:
			//		This should be a returned object from dijit.getBookmark()

			var _doc = win.doc,
				mark = bookmark.mark;
			if(mark){
				if(win.global.getSelection){
					//W3C Rangi API (FF, WebKit, Opera, etc)
					var sel = win.global.getSelection();
					if(sel && sel.removeAllRanges){
						if(mark.pRange){
							var n = mark.node;
							n.selectionStart = mark.start;
							n.selectionEnd = mark.end;
						}else{
							sel.removeAllRanges();
							sel.addRange(mark);
						}
					}else{
						console.warn("No idea how to restore selection for this browser!");
					}
				}else if(_doc.selection && mark){
					//'IE' way.
					var rg;
					if(mark.pRange){
						rg = mark.range;
					}else if(lang.isArray(mark)){
						rg = _doc.body.createControlRange();
						//rg.addElement does not have call/apply method, so can not call it directly
						//rg is not available in "range.addElement(item)", so can't use that either
						array.forEach(mark, function(n){
							rg.addElement(n);
						});
					}else{
						rg = _doc.body.createTextRange();
						rg.moveToBookmark(mark);
					}
					rg.select();
				}
			}
		},

		getFocus: function(/*Widget?*/ menu, /*Window?*/ openedForWindow){
			// summary:
			//		Called as getFocus(), this returns an Object showing the current focus
			//		and selected text.
			//
			//		Called as getFocus(widget), where widget is a (widget representing) a button
			//		that was just pressed, it returns where focus was before that button
			//		was pressed.   (Pressing the button may have either shifted focus to the button,
			//		or removed focus altogether.)   In this case the selected text is not returned,
			//		since it can't be accurately determined.
			//
			// menu: dijit._Widget or {domNode: DomNode} structure
			//		The button that was just pressed.  If focus has disappeared or moved
			//		to this button, returns the previous focus.  In this case the bookmark
			//		information is already lost, and null is returned.
			//
			// openedForWindow:
			//		iframe in which menu was opened
			//
			// returns:
			//		A handle to restore focus/selection, to be passed to `dijit.focus`
			var node = !focus.curNode || (menu && dom.isDescendant(focus.curNode, menu.domNode)) ? dijit._prevFocus : focus.curNode;
			return {
				node: node,
				bookmark: node && (node == focus.curNode) && win.withGlobal(openedForWindow || win.global, dijit.getBookmark),
				openedForWindow: openedForWindow
			}; // Object
		},

		// _activeStack: dijit._Widget[]
		//		List of currently active widgets (focused widget and it's ancestors)
		_activeStack: [],

		registerIframe: function(/*DomNode*/ iframe){
			// summary:
			//		Registers listeners on the specified iframe so that any click
			//		or focus event on that iframe (or anything in it) is reported
			//		as a focus/click event on the <iframe> itself.
			// description:
			//		Currently only used by editor.
			// returns:
			//		Handle to pass to unregisterIframe()
			return focus.registerIframe(iframe);
		},

		unregisterIframe: function(/*Object*/ handle){
			// summary:
			//		Unregisters listeners on the specified iframe created by registerIframe.
			//		After calling be sure to delete or null out the handle itself.
			// handle:
			//		Handle returned by registerIframe()

			handle && handle.remove();
		},

		registerWin: function(/*Window?*/targetWindow, /*DomNode?*/ effectiveNode){
			// summary:
			//		Registers listeners on the specified window (either the main
			//		window or an iframe's window) to detect when the user has clicked somewhere
			//		or focused somewhere.
			// description:
			//		Users should call registerIframe() instead of this method.
			// targetWindow:
			//		If specified this is the window associated with the iframe,
			//		i.e. iframe.contentWindow.
			// effectiveNode:
			//		If specified, report any focus events inside targetWindow as
			//		an event on effectiveNode, rather than on evt.target.
			// returns:
			//		Handle to pass to unregisterWin()

			return focus.registerWin(targetWindow, effectiveNode);
		},

		unregisterWin: function(/*Handle*/ handle){
			// summary:
			//		Unregisters listeners on the specified window (either the main
			//		window or an iframe's window) according to handle returned from registerWin().
			//		After calling be sure to delete or null out the handle itself.

			handle && handle.remove();
		}
	});

	// Override focus singleton's focus function so that dijit.focus()
	// has backwards compatible behavior of restoring selection (although
	// probably no one is using that).
	focus.focus = function(/*Object || DomNode */ handle){
		// summary:
		//		Sets the focused node and the selection according to argument.
		//		To set focus to an iframe's content, pass in the iframe itself.
		// handle:
		//		object returned by get(), or a DomNode

		if(!handle){ return; }

		var node = "node" in handle ? handle.node : handle,		// because handle is either DomNode or a composite object
			bookmark = handle.bookmark,
			openedForWindow = handle.openedForWindow,
			collapsed = bookmark ? bookmark.isCollapsed : false;

		// Set the focus
		// Note that for iframe's we need to use the <iframe> to follow the parentNode chain,
		// but we need to set focus to iframe.contentWindow
		if(node){
			var focusNode = (node.tagName.toLowerCase() == "iframe") ? node.contentWindow : node;
			if(focusNode && focusNode.focus){
				try{
					// Gecko throws sometimes if setting focus is impossible,
					// node not displayed or something like that
					focusNode.focus();
				}catch(e){/*quiet*/}
			}
			focus._onFocusNode(node);
		}

		// set the selection
		// do not need to restore if current selection is not empty
		// (use keyboard to select a menu item) or if previous selection was collapsed
		// as it may cause focus shift (Esp in IE).
		if(bookmark && win.withGlobal(openedForWindow || win.global, dijit.isCollapsed) && !collapsed){
			if(openedForWindow){
				openedForWindow.focus();
			}
			try{
				win.withGlobal(openedForWindow || win.global, dijit.moveToBookmark, null, [bookmark]);
			}catch(e2){
				/*squelch IE internal error, see http://trac.dojotoolkit.org/ticket/1984 */
			}
		}
	};

	// For back compatibility, monitor changes to focused node and active widget stack,
	// publishing events and copying changes from focus manager variables into dijit (top level) variables
	focus.watch("curNode", function(name, oldVal, newVal){
		dijit._curFocus = newVal;
		dijit._prevFocus = oldVal;
		if(newVal){
			topic.publish("focusNode", newVal);	// publish
		}
	});
	focus.watch("activeStack", function(name, oldVal, newVal){
		dijit._activeStack = newVal;
	});

	focus.on("widget-blur", function(widget, by){
		topic.publish("widgetBlur", widget, by);	// publish
	});
	focus.on("widget-focus", function(widget, by){
		topic.publish("widgetFocus", widget, by);	// publish
	});

	return dijit;
});

},
'dijit/a11y':function(){
define("dijit/a11y", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/config", // defaultDuration
	"dojo/_base/declare", // declare
	"dojo/dom",			// dom.byId
	"dojo/dom-attr", // domAttr.attr domAttr.has
	"dojo/dom-style", // style.style
	"dojo/_base/sniff", // has("ie")
	"./_base/manager",	// manager._isElementShown
	"."	// for exporting methods to dijit namespace
], function(array, config, declare, dom, domAttr, domStyle, has, manager, dijit){

	// module:
	//		dijit/a11y
	// summary:
	//		Accessibility utility functions (keyboard, tab stops, etc.)

	var shown = (dijit._isElementShown = function(/*Element*/ elem){
		var s = domStyle.get(elem);
		return (s.visibility != "hidden")
			&& (s.visibility != "collapsed")
			&& (s.display != "none")
			&& (domAttr.get(elem, "type") != "hidden");
	});

	dijit.hasDefaultTabStop = function(/*Element*/ elem){
		// summary:
		//		Tests if element is tab-navigable even without an explicit tabIndex setting

		// No explicit tabIndex setting, need to investigate node type
		switch(elem.nodeName.toLowerCase()){
			case "a":
				// An <a> w/out a tabindex is only navigable if it has an href
				return domAttr.has(elem, "href");
			case "area":
			case "button":
			case "input":
			case "object":
			case "select":
			case "textarea":
				// These are navigable by default
				return true;
			case "iframe":
				// If it's an editor <iframe> then it's tab navigable.
				var body;
				try{
					// non-IE
					var contentDocument = elem.contentDocument;
					if("designMode" in contentDocument && contentDocument.designMode == "on"){
						return true;
					}
					body = contentDocument.body;
				}catch(e1){
					// contentWindow.document isn't accessible within IE7/8
					// if the iframe.src points to a foreign url and this
					// page contains an element, that could get focus
					try{
						body = elem.contentWindow.document.body;
					}catch(e2){
						return false;
					}
				}
				return body && (body.contentEditable == 'true' ||
					(body.firstChild && body.firstChild.contentEditable == 'true'));
			default:
				return elem.contentEditable == 'true';
		}
	};

	var isTabNavigable = (dijit.isTabNavigable = function(/*Element*/ elem){
		// summary:
		//		Tests if an element is tab-navigable

		// TODO: convert (and rename method) to return effective tabIndex; will save time in _getTabNavigable()
		if(domAttr.get(elem, "disabled")){
			return false;
		}else if(domAttr.has(elem, "tabIndex")){
			// Explicit tab index setting
			return domAttr.get(elem, "tabIndex") >= 0; // boolean
		}else{
			// No explicit tabIndex setting, so depends on node type
			return dijit.hasDefaultTabStop(elem);
		}
	});

	dijit._getTabNavigable = function(/*DOMNode*/ root){
		// summary:
		//		Finds descendants of the specified root node.
		//
		// description:
		//		Finds the following descendants of the specified root node:
		//		* the first tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the last tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the first element in document order with the lowest
		//		  positive tabIndex value
		//		* the last element in document order with the highest
		//		  positive tabIndex value
		var first, last, lowest, lowestTabindex, highest, highestTabindex, radioSelected = {};

		function radioName(node){
			// If this element is part of a radio button group, return the name for that group.
			return node && node.tagName.toLowerCase() == "input" &&
				node.type && node.type.toLowerCase() == "radio" &&
				node.name && node.name.toLowerCase();
		}

		var walkTree = function(/*DOMNode*/parent){
			for(var child = parent.firstChild; child; child = child.nextSibling){
				// Skip text elements, hidden elements, and also non-HTML elements (those in custom namespaces) in IE,
				// since show() invokes getAttribute("type"), which crash on VML nodes in IE.
				if(child.nodeType != 1 || (has("ie") && child.scopeName !== "HTML") || !shown(child)){
					continue;
				}

				if(isTabNavigable(child)){
					var tabindex = domAttr.get(child, "tabIndex");
					if(!domAttr.has(child, "tabIndex") || tabindex == 0){
						if(!first){
							first = child;
						}
						last = child;
					}else if(tabindex > 0){
						if(!lowest || tabindex < lowestTabindex){
							lowestTabindex = tabindex;
							lowest = child;
						}
						if(!highest || tabindex >= highestTabindex){
							highestTabindex = tabindex;
							highest = child;
						}
					}
					var rn = radioName(child);
					if(domAttr.get(child, "checked") && rn){
						radioSelected[rn] = child;
					}
				}
				if(child.nodeName.toUpperCase() != 'SELECT'){
					walkTree(child);
				}
			}
		};
		if(shown(root)){
			walkTree(root);
		}
		function rs(node){
			// substitute checked radio button for unchecked one, if there is a checked one with the same name.
			return radioSelected[radioName(node)] || node;
		}

		return { first: rs(first), last: rs(last), lowest: rs(lowest), highest: rs(highest) };
	};
	dijit.getFirstInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is first in the tabbing order
		var elems = dijit._getTabNavigable(dom.byId(root));
		return elems.lowest ? elems.lowest : elems.first; // DomNode
	};

	dijit.getLastInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is last in the tabbing order
		var elems = dijit._getTabNavigable(dom.byId(root));
		return elems.last ? elems.last : elems.highest; // DomNode
	};

	return {
		hasDefaultTabStop: dijit.hasDefaultTabStop,
		isTabNavigable: dijit.isTabNavigable,
		_getTabNavigable: dijit._getTabNavigable,
		getFirstInTabbingOrder: dijit.getFirstInTabbingOrder,
		getLastInTabbingOrder: dijit.getLastInTabbingOrder
	};
});

},
'dijit/form/_ToggleButtonMixin':function(){
define("dijit/form/_ToggleButtonMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr" // domAttr.set
], function(declare, domAttr){

// module:
//		dijit/form/_ToggleButtonMixin
// summary:
//		A mixin to provide functionality to allow a button that can be in two states (checked or not).

return declare("dijit.form._ToggleButtonMixin", null, {
	// summary:
	//		A mixin to provide functionality to allow a button that can be in two states (checked or not).

	// checked: Boolean
	//		Corresponds to the native HTML <input> element's attribute.
	//		In markup, specified as "checked='checked'" or just "checked".
	//		True if the button is depressed, or the checkbox is checked,
	//		or the radio button is selected, etc.
	checked: false,

	// aria-pressed for toggle buttons, and aria-checked for checkboxes
	_aria_attr: "aria-pressed",

	_onClick: function(/*Event*/ evt){
		var original = this.checked;
		this._set('checked', !original); // partially set the toggled value, assuming the toggle will work, so it can be overridden in the onclick handler
		var ret = this.inherited(arguments); // the user could reset the value here
		this.set('checked', ret ? this.checked : original); // officially set the toggled or user value, or reset it back
		return ret;
	},

	_setCheckedAttr: function(/*Boolean*/ value, /*Boolean?*/ priorityChange){
		this._set("checked", value);
		domAttr.set(this.focusNode || this.domNode, "checked", value);
		(this.focusNode || this.domNode).setAttribute(this._aria_attr, value ? "true" : "false"); // aria values should be strings
		this._handleOnChange(value, priorityChange);
	},

	reset: function(){
		// summary:
		//		Reset the widget's value to what it was at initialization time

		this._hasBeenBlurred = false;

		// set checked state to original setting
		this.set('checked', this.params.checked || false);
	}
});

});

},
'dijit/_Widget':function(){
define("dijit/_Widget", [
	"dojo/aspect",	// aspect.around
	"dojo/_base/config",	// config.isDebug
	"dojo/_base/connect",	// connect.connect
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.hitch
	"dojo/query",
	"dojo/ready",
	"./registry",	// registry.byNode
	"./_WidgetBase",
	"./_OnDijitClickMixin",
	"./_FocusMixin",
	"dojo/uacss",		// browser sniffing (included for back-compat; subclasses may be using)
	"./hccss"		// high contrast mode sniffing (included to set CSS classes on <body>, module ret value unused)
], function(aspect, config, connect, declare, kernel, lang, query, ready,
			registry, _WidgetBase, _OnDijitClickMixin, _FocusMixin){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _OnDijitClickMixin = dijit._OnDijitClickMixin;
	var _FocusMixin = dijit._FocusMixin;
=====*/


// module:
//		dijit/_Widget
// summary:
//		Old base for widgets.   New widgets should extend _WidgetBase instead


function connectToDomNode(){
	// summary:
	//		If user connects to a widget method === this function, then they will
	//		instead actually be connecting the equivalent event on this.domNode
}

// Trap dojo.connect() calls to connectToDomNode methods, and redirect to _Widget.on()
function aroundAdvice(originalConnect){
	return function(obj, event, scope, method){
		if(obj && typeof event == "string" && obj[event] == connectToDomNode){
			return obj.on(event.substring(2).toLowerCase(), lang.hitch(scope, method));
		}
		return originalConnect.apply(connect, arguments);
	};
}
aspect.around(connect, "connect", aroundAdvice);
if(kernel.connect){
	aspect.around(kernel, "connect", aroundAdvice);
}

var _Widget = declare("dijit._Widget", [_WidgetBase, _OnDijitClickMixin, _FocusMixin], {
	// summary:
	//		Base class for all Dijit widgets.
	//
	//		Extends _WidgetBase, adding support for:
	//			- declaratively/programatically specifying widget initialization parameters like
	//				onMouseMove="foo" that call foo when this.domNode gets a mousemove event
	//			- ondijitclick
	//				Support new data-dojo-attach-event="ondijitclick: ..." that is triggered by a mouse click or a SPACE/ENTER keypress
	//			- focus related functions
	//				In particular, the onFocus()/onBlur() callbacks.   Driven internally by
	//				dijit/_base/focus.js.
	//			- deprecated methods
	//			- onShow(), onHide(), onClose()
	//
	//		Also, by loading code in dijit/_base, turns on:
	//			- browser sniffing (putting browser id like .dj_ie on <html> node)
	//			- high contrast mode sniffing (add .dijit_a11y class to <body> if machine is in high contrast mode)


	////////////////// DEFERRED CONNECTS ///////////////////

	onClick: connectToDomNode,
	/*=====
	onClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onDblClick: connectToDomNode,
	/*=====
	onDblClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse double click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onKeyDown: connectToDomNode,
	/*=====
	onKeyDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being pressed down.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyPress: connectToDomNode,
	/*=====
	onKeyPress: function(event){
		// summary:
		//		Connect to this function to receive notifications of printable keys being typed.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyUp: connectToDomNode,
	/*=====
	onKeyUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being released.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onMouseDown: connectToDomNode,
	/*=====
	onMouseDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is pressed down.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseMove: connectToDomNode,
	/*=====
	onMouseMove: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves over nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOut: connectToDomNode,
	/*=====
	onMouseOut: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOver: connectToDomNode,
	/*=====
	onMouseOver: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseLeave: connectToDomNode,
	/*=====
	onMouseLeave: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseEnter: connectToDomNode,
	/*=====
	onMouseEnter: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseUp: connectToDomNode,
	/*=====
	onMouseUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is released.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/

	constructor: function(params){
		// extract parameters like onMouseMove that should connect directly to this.domNode
		this._toConnect = {};
		for(var name in params){
			if(this[name] === connectToDomNode){
				this._toConnect[name.replace(/^on/, "").toLowerCase()] = params[name];
				delete params[name];
			}
		}
	},

	postCreate: function(){
		this.inherited(arguments);

		// perform connection from this.domNode to user specified handlers (ex: onMouseMove)
		for(var name in this._toConnect){
			this.on(name, this._toConnect[name]);
		}
		delete this._toConnect;
	},

	on: function(/*String*/ type, /*Function*/ func){
		if(this[this._onMap(type)] === connectToDomNode){
			// Use connect.connect() rather than on() to get handling for "onmouseenter" on non-IE, etc.
			// Also, need to specify context as "this" rather than the default context of the DOMNode
			return connect.connect(this.domNode, type.toLowerCase(), this, func);
		}
		return this.inherited(arguments);
	},

	_setFocusedAttr: function(val){
		// Remove this method in 2.0 (or sooner), just here to set _focused == focused, for back compat
		// (but since it's a private variable we aren't required to keep supporting it).
		this._focused = val;
		this._set("focused", val);
	},

	////////////////// DEPRECATED METHODS ///////////////////

	setAttribute: function(/*String*/ attr, /*anything*/ value){
		// summary:
		//		Deprecated.  Use set() instead.
		// tags:
		//		deprecated
		kernel.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
		this.set(attr, value);
	},

	attr: function(/*String|Object*/name, /*Object?*/value){
		// summary:
		//		Set or get properties on a widget instance.
		//	name:
		//		The property to get or set. If an object is passed here and not
		//		a string, its keys are used as names of attributes to be set
		//		and the value of the object as values to set in the widget.
		//	value:
		//		Optional. If provided, attr() operates as a setter. If omitted,
		//		the current value of the named property is returned.
		// description:
		//		This method is deprecated, use get() or set() directly.

		// Print deprecation warning but only once per calling function
		if(config.isDebug){
			var alreadyCalledHash = arguments.callee._ach || (arguments.callee._ach = {}),
				caller = (arguments.callee.caller || "unknown caller").toString();
			if(!alreadyCalledHash[caller]){
				kernel.deprecated(this.declaredClass + "::attr() is deprecated. Use get() or set() instead, called from " +
				caller, "", "2.0");
				alreadyCalledHash[caller] = true;
			}
		}

		var args = arguments.length;
		if(args >= 2 || typeof name === "object"){ // setter
			return this.set.apply(this, arguments);
		}else{ // getter
			return this.get(name);
		}
	},

	getDescendants: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		This method should generally be avoided as it returns widgets declared in templates, which are
		//		supposed to be internal/hidden, but it's left here for back-compat reasons.

		kernel.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.", "", "2.0");
		return this.containerNode ? query('[widgetId]', this.containerNode).map(registry.byNode) : []; // dijit._Widget[]
	},

	////////////////// MISCELLANEOUS METHODS ///////////////////

	_onShow: function(){
		// summary:
		//		Internal method called when this widget is made visible.
		//		See `onShow` for details.
		this.onShow();
	},

	onShow: function(){
		// summary:
		//		Called when this widget becomes the selected pane in a
		//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
		//		`dijit.layout.AccordionContainer`, etc.
		//
		//		Also called to indicate display of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
		// tags:
		//		callback
	},

	onHide: function(){
		// summary:
			//		Called when another widget becomes the selected pane in a
			//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
			//		`dijit.layout.AccordionContainer`, etc.
			//
			//		Also called to indicate hide of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
			// tags:
			//		callback
	},

	onClose: function(){
		// summary:
		//		Called when this widget is being displayed as a popup (ex: a Calendar popped
		//		up from a DateTextBox), and it is hidden.
		//		This is called from the dijit.popup code, and should not be called directly.
		//
		//		Also used as a parameter for children of `dijit.layout.StackContainer` or subclasses.
		//		Callback if a user tries to close the child.   Child will be closed if this function returns true.
		// tags:
		//		extension

		return true;		// Boolean
	}
});

// For back-compat, remove in 2.0.
if(!kernel.isAsync){
	ready(0, function(){
		var requires = ["dijit/_base"];
		require(requires);	// use indirection so modules not rolled into a build
	});
}
return _Widget;
});

},
'url:dijit/form/templates/Select.html':"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n",
'dojo/touch':function(){
define("dojo/touch", ["./_base/kernel", "./on", "./has", "./mouse"], function(dojo, on, has, mouse){
// module:
//		dojo/touch

/*=====
	dojo.touch = {
		// summary:
		//		This module provides unified touch event handlers by exporting
		//		press, move, release and cancel which can also run well on desktop.
		//		Based on http://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html
		//
		// example:
		//		1. Used with dojo.connect()
		//		|	dojo.connect(node, dojo.touch.press, function(e){});
		//		|	dojo.connect(node, dojo.touch.move, function(e){});
		//		|	dojo.connect(node, dojo.touch.release, function(e){});
		//		|	dojo.connect(node, dojo.touch.cancel, function(e){});
		//
		//		2. Used with dojo.on
		//		|	define(["dojo/on", "dojo/touch"], function(on, touch){
		//		|		on(node, touch.press, function(e){});
		//		|		on(node, touch.move, function(e){});
		//		|		on(node, touch.release, function(e){});
		//		|		on(node, touch.cancel, function(e){});
		//
		//		3. Used with dojo.touch.* directly
		//		|	dojo.touch.press(node, function(e){});
		//		|	dojo.touch.move(node, function(e){});
		//		|	dojo.touch.release(node, function(e){});
		//		|	dojo.touch.cancel(node, function(e){});
		
		press: function(node, listener){
			// summary:
			//		Register a listener to 'touchstart'|'mousedown' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		move: function(node, listener){
			// summary:
			//		Register a listener to 'touchmove'|'mousemove' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		release: function(node, listener){
			// summary:
			//		Register a listener to 'touchend'|'mouseup' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		},
		cancel: function(node, listener){
			// summary:
			//		Register a listener to 'touchcancel'|'mouseleave' for the given node
			// node: Dom
			//		Target node to listen to
			// listener: Function
			//		Callback function
			// returns:
			//		A handle which will be used to remove the listener by handle.remove()
		}
	};
=====*/

	function _handle(/*String - press | move | release | cancel*/type){
		return function(node, listener){//called by on(), see dojo.on
			return on(node, type, listener);
		};
	}
	var touch = has("touch");
	//device neutral events - dojo.touch.press|move|release|cancel
	dojo.touch = {
		press: _handle(touch ? "touchstart": "mousedown"),
		move: _handle(touch ? "touchmove": "mousemove"),
		release: _handle(touch ? "touchend": "mouseup"),
		cancel: touch ? _handle("touchcancel") : mouse.leave
	};
	return dojo.touch;
});
},
'dijit/_DialogMixin':function(){
define("dijit/_DialogMixin", [
	"dojo/_base/declare", // declare
	"./a11y"	// _getTabNavigable
], function(declare, a11y){

	// module:
	//		dijit/_DialogMixin
	// summary:
	//		_DialogMixin provides functions useful to Dialog and TooltipDialog

	return declare("dijit._DialogMixin", null, {
		// summary:
		//		This provides functions useful to Dialog and TooltipDialog

		execute: function(/*Object*/ /*===== formContents =====*/){
			// summary:
			//		Callback when the user hits the submit button.
			//		Override this method to handle Dialog execution.
			// description:
			//		After the user has pressed the submit button, the Dialog
			//		first calls onExecute() to notify the container to hide the
			//		dialog and restore focus to wherever it used to be.
			//
			//		*Then* this method is called.
			// type:
			//		callback
		},

		onCancel: function(){
			// summary:
			//	    Called when user has pressed the Dialog's cancel button, to notify container.
			// description:
			//	    Developer shouldn't override or connect to this method;
			//		it's a private communication device between the TooltipDialog
			//		and the thing that opened it (ex: `dijit.form.DropDownButton`)
			// type:
			//		protected
		},

		onExecute: function(){
			// summary:
			//	    Called when user has pressed the dialog's OK button, to notify container.
			// description:
			//	    Developer shouldn't override or connect to this method;
			//		it's a private communication device between the TooltipDialog
			//		and the thing that opened it (ex: `dijit.form.DropDownButton`)
			// type:
			//		protected
		},

		_onSubmit: function(){
			// summary:
			//		Callback when user hits submit button
			// type:
			//		protected
			this.onExecute();	// notify container that we are about to execute
			this.execute(this.get('value'));
		},

		_getFocusItems: function(){
			// summary:
			//		Finds focusable items in dialog,
			//		and sets this._firstFocusItem and this._lastFocusItem
			// tags:
			//		protected

			var elems = a11y._getTabNavigable(this.containerNode);
			this._firstFocusItem = elems.lowest || elems.first || this.closeButtonNode || this.domNode;
			this._lastFocusItem = elems.last || elems.highest || this._firstFocusItem;
		}
	});
});

},
'dijit/nls/common':function(){
define({ root:
//begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Cancel",
	buttonSave: "Save",
	itemClose: "Close"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"hr": true,
"he": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"az": true,
"ar": true
});

},
'dijit/form/_FormValueWidget':function(){
define("dijit/form/_FormValueWidget", [
	"dojo/_base/declare", // declare
	"dojo/_base/sniff", // has("ie")
	"./_FormWidget",
	"./_FormValueMixin"
], function(declare, has, _FormWidget, _FormValueMixin){

/*=====
var _FormWidget = dijit.form._FormWidget;
var _FormValueMixin = dijit.form._FormValueMixin;
=====*/

// module:
//		dijit/form/_FormValueWidget
// summary:
//		FormValueWidget


return declare("dijit.form._FormValueWidget", [_FormWidget, _FormValueMixin],
{
	// summary:
	//		Base class for widgets corresponding to native HTML elements such as <input> or <select> that have user changeable values.
	// description:
	//		Each _FormValueWidget represents a single input value, and has a (possibly hidden) <input> element,
	//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
	//		works as expected.

	// Don't attempt to mixin the 'type', 'name' attributes here programatically -- they must be declared
	// directly in the template as read by the parser in order to function. IE is known to specifically
	// require the 'name' attribute at element creation time.  See #8484, #8660.

	_layoutHackIE7: function(){
		// summary:
		//		Work around table sizing bugs on IE7 by forcing redraw

		if(has("ie") == 7){ // fix IE7 layout bug when the widget is scrolled out of sight
			var domNode = this.domNode;
			var parent = domNode.parentNode;
			var pingNode = domNode.firstChild || domNode; // target node most unlikely to have a custom filter
			var origFilter = pingNode.style.filter; // save custom filter, most likely nothing
			var _this = this;
			while(parent && parent.clientHeight == 0){ // search for parents that haven't rendered yet
				(function ping(){
					var disconnectHandle = _this.connect(parent, "onscroll",
						function(){
							_this.disconnect(disconnectHandle); // only call once
							pingNode.style.filter = (new Date()).getMilliseconds(); // set to anything that's unique
							setTimeout(function(){ pingNode.style.filter = origFilter }, 0); // restore custom filter, if any
						}
					);
				})();
				parent = parent.parentNode;
			}
		}
	}
});

});

}}});

define("layers/map/mxmap", [], 1);

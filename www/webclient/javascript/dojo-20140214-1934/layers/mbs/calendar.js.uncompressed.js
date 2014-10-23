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
'url:dijit/form/templates/DropDownBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n",
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
'dijit/form/RangeBoundTextBox':function(){
define("dijit/form/RangeBoundTextBox", [
	"dojo/_base/declare", // declare
	"dojo/i18n", // i18n.getLocalization
	"./MappedTextBox"
], function(declare, i18n, MappedTextBox){

/*=====
	var MappedTextBox = dijit.form.MappedTextBox;
=====*/

	// module:
	//		dijit/form/RangeBoundTextBox
	// summary:
	//		Base class for textbox form widgets which defines a range of valid values.

	/*=====
		dijit.form.RangeBoundTextBox.__Constraints = function(){
			// min: Number
			//		Minimum signed value.  Default is -Infinity
			// max: Number
			//		Maximum signed value.  Default is +Infinity
			this.min = min;
			this.max = max;
		}
	=====*/

	return declare("dijit.form.RangeBoundTextBox", MappedTextBox, {
		// summary:
		//		Base class for textbox form widgets which defines a range of valid values.

		// rangeMessage: String
		//		The message to display if value is out-of-range
		rangeMessage: "",

		/*=====
		// constraints: dijit.form.RangeBoundTextBox.__Constraints
		constraints: {},
		======*/

		rangeCheck: function(/*Number*/ primitive, /*dijit.form.RangeBoundTextBox.__Constraints*/ constraints){
			// summary:
			//		Overridable function used to validate the range of the numeric input value.
			// tags:
			//		protected
			return	("min" in constraints? (this.compare(primitive,constraints.min) >= 0) : true) &&
				("max" in constraints? (this.compare(primitive,constraints.max) <= 0) : true); // Boolean
		},

		isInRange: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Tests if the value is in the min/max range specified in constraints
			// tags:
			//		protected
			return this.rangeCheck(this.get('value'), this.constraints);
		},

		_isDefinitelyOutOfRange: function(){
			// summary:
			//		Returns true if the value is out of range and will remain
			//		out of range even if the user types more characters
			var val = this.get('value');
			var isTooLittle = false;
			var isTooMuch = false;
			if("min" in this.constraints){
				var min = this.constraints.min;
				min = this.compare(val, ((typeof min == "number") && min >= 0 && val !=0) ? 0 : min);
				isTooLittle = (typeof min == "number") && min < 0;
			}
			if("max" in this.constraints){
				var max = this.constraints.max;
				max = this.compare(val, ((typeof max != "number") || max > 0) ? max : 0);
				isTooMuch = (typeof max == "number") && max > 0;
			}
			return isTooLittle || isTooMuch;
		},

		_isValidSubset: function(){
			// summary:
			//		Overrides `dijit.form.ValidationTextBox._isValidSubset`.
			//		Returns true if the input is syntactically valid, and either within
			//		range or could be made in range by more typing.
			return this.inherited(arguments) && !this._isDefinitelyOutOfRange();
		},

		isValid: function(/*Boolean*/ isFocused){
			// Overrides dijit.form.ValidationTextBox.isValid to check that the value is also in range.
			return this.inherited(arguments) &&
				((this._isEmpty(this.textbox.value) && !this.required) || this.isInRange(isFocused)); // Boolean
		},

		getErrorMessage: function(/*Boolean*/ isFocused){
			// Overrides dijit.form.ValidationTextBox.getErrorMessage to print "out of range" message if appropriate
			var v = this.get('value');
			if(v !== null && v !== '' && v !== undefined && (typeof v != "number" || !isNaN(v)) && !this.isInRange(isFocused)){ // don't check isInRange w/o a real value
				return this.rangeMessage; // String
			}
			return this.inherited(arguments);
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			if(!this.rangeMessage){
				this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
				this.rangeMessage = this.messages.rangeMessage;
			}
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			this.inherited(arguments);
			if(this.focusNode){ // not set when called from postMixInProperties
				if(this.constraints.min !== undefined){
					this.focusNode.setAttribute("aria-valuemin", this.constraints.min);
				}else{
					this.focusNode.removeAttribute("aria-valuemin");
				}
				if(this.constraints.max !== undefined){
					this.focusNode.setAttribute("aria-valuemax", this.constraints.max);
				}else{
					this.focusNode.removeAttribute("aria-valuemax");
				}
			}
		},

		_setValueAttr: function(/*Number*/ value, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('value', ...) works.

			this.focusNode.setAttribute("aria-valuenow", value);
			this.inherited(arguments);
		},

		applyTextDir: function(/*===== element, text =====*/){
			// summary:
			//		The function overridden in the _BidiSupport module,
			//		originally used for setting element.dir according to this.textDir.
			//		In this case does nothing.
			// element: Object
			// text: String
			// tags:
			//		protected.
		}
	});
});

},
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
'dojo/cldr/nls/islamic':function(){
define({ root:

//begin v1.x content
{
	"months-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"dateFormatItem-yQQQ": "y QQQ",
	"dateFormatItem-yMEd": "EEE, y-M-d",
	"dateFormatItem-MMMEd": "E MMM d",
	"eraNarrow": [
		"AH"
	],
	"dateTimeFormats-appendItem-Day-Of-Week": "{0} {1}",
	"dateFormat-long": "y MMMM d",
	"months-format-wide": [
		"Muharram",
		"Safar",
		"Rabiʻ I",
		"Rabiʻ II",
		"Jumada I",
		"Jumada II",
		"Rajab",
		"Shaʻban",
		"Ramadan",
		"Shawwal",
		"Dhuʻl-Qiʻdah",
		"Dhuʻl-Hijjah"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dateFormatItem-EEEd": "d EEE",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, y MMMM dd",
	"dateFormatItem-Md": "M-d",
	"dayPeriods-format-abbr-am": "AM",
	"dateTimeFormats-appendItem-Second": "{0} ({2}: {1})",
	"dateFormatItem-yM": "y-M",
	"months-standAlone-wide": [
		"Muharram",
		"Safar",
		"Rabiʻ I",
		"Rabiʻ II",
		"Jumada I",
		"Jumada II",
		"Rajab",
		"Shaʻban",
		"Ramadan",
		"Shawwal",
		"Dhuʻl-Qiʻdah",
		"Dhuʻl-Hijjah"
	],
	"timeFormat-short": "HH:mm",
	"quarters-format-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"timeFormat-long": "HH:mm:ss z",
	"dateFormatItem-yMMM": "y MMM",
	"dateFormatItem-yQ": "y Q",
	"dateTimeFormats-appendItem-Era": "{0} {1}",
	"months-format-abbr": [
		"Muh.",
		"Saf.",
		"Rab. I",
		"Rab. II",
		"Jum. I",
		"Jum. II",
		"Raj.",
		"Sha.",
		"Ram.",
		"Shaw.",
		"Dhuʻl-Q.",
		"Dhuʻl-H."
	],
	"timeFormat-full": "HH:mm:ss zzzz",
	"dateTimeFormats-appendItem-Week": "{0} ({2}: {1})",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"Muh.",
		"Saf.",
		"Rab. I",
		"Rab. II",
		"Jum. I",
		"Jum. II",
		"Raj.",
		"Sha.",
		"Ram.",
		"Shaw.",
		"Dhuʻl-Q.",
		"Dhuʻl-H."
	],
	"quarters-format-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"quarters-standAlone-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"timeFormat-medium": "HH:mm:ss",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"eraAbbr": [
		"AH"
	],
	"days-standAlone-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "AM",
	"dateFormatItem-MMMd": "MMM d",
	"dateFormatItem-MEd": "E, M-d",
	"dateTimeFormat-full": "{1} {0}",
	"days-format-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateTimeFormats-appendItem-Day": "{0} ({2}: {1})",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"dateFormatItem-hm": "h:mm a",
	"dateTimeFormats-appendItem-Year": "{0} {1}",
	"dateTimeFormats-appendItem-Hour": "{0} ({2}: {1})",
	"dayPeriods-format-abbr-pm": "PM",
	"days-format-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"eraNames": [
		"AH"
	],
	"days-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"days-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-MMM": "LLL",
	"dateTimeFormats-appendItem-Quarter": "{0} ({2}: {1})",
	"dayPeriods-format-wide-am": "AM",
	"dateTimeFormats-appendItem-Month": "{0} ({2}: {1})",
	"dateTimeFormats-appendItem-Minute": "{0} ({2}: {1})",
	"dateFormat-short": "yyyy-MM-dd",
	"dateFormatItem-yMMMEd": "EEE, y MMM d",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"dateFormat-medium": "y MMM d",
	"dayPeriods-format-narrow-pm": "PM",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a"
}
//end v1.x content
,
	"ar": true,
	"bg": true,
	"bn": true,
	"bs": true,
	"da": true,
	"de": true,
	"en": true,
	"en-gb": true,
	"es": true,
	"fa": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hi": true,
	"hu": true,
	"id": true,
	"in": true,
	"it": true,
	"iw": true,
	"lv": true,
	"ml": true,
	"ms": true,
	"nb": true,
	"nl": true,
	"no": true,
	"pl": true,
	"pt": true,
	"pt-pt": true,
	"ru": true,
	"sr": true,
	"sv": true,
	"th": true,
	"tr": true,
	"uk": true,
	"ur": true,
	"vi": true,
	"zh": true,
	"zh-hant": true
});
},
'dijit/form/_TextBoxMixin':function(){
define("dijit/form/_TextBoxMixin", [
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.byId
	"dojo/_base/event", // event.stop
	"dojo/keys", // keys.ALT keys.CAPS_LOCK keys.CTRL keys.META keys.SHIFT
	"dojo/_base/lang", // lang.mixin
	".."	// for exporting dijit._setSelectionRange, dijit.selectInputText
], function(array, declare, dom, event, keys, lang, dijit){

// module:
//		dijit/form/_TextBoxMixin
// summary:
//		A mixin for textbox form input widgets

var _TextBoxMixin = declare("dijit.form._TextBoxMixin", null, {
	// summary:
	//		A mixin for textbox form input widgets

	// trim: Boolean
	//		Removes leading and trailing whitespace if true.  Default is false.
	trim: false,

	// uppercase: Boolean
	//		Converts all characters to uppercase if true.  Default is false.
	uppercase: false,

	// lowercase: Boolean
	//		Converts all characters to lowercase if true.  Default is false.
	lowercase: false,

	// propercase: Boolean
	//		Converts the first character of each word to uppercase if true.
	propercase: false,

	// maxLength: String
	//		HTML INPUT tag maxLength declaration.
	maxLength: "",

	// selectOnClick: [const] Boolean
	//		If true, all text will be selected when focused with mouse
	selectOnClick: false,

	// placeHolder: String
	//		Defines a hint to help users fill out the input field (as defined in HTML 5).
	//		This should only contain plain text (no html markup).
	placeHolder: "",

	_getValueAttr: function(){
		// summary:
		//		Hook so get('value') works as we like.
		// description:
		//		For `dijit.form.TextBox` this basically returns the value of the <input>.
		//
		//		For `dijit.form.MappedTextBox` subclasses, which have both
		//		a "displayed value" and a separate "submit value",
		//		This treats the "displayed value" as the master value, computing the
		//		submit value from it via this.parse().
		return this.parse(this.get('displayedValue'), this.constraints);
	},

	_setValueAttr: function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
		// summary:
		//		Hook so set('value', ...) works.
		//
		// description:
		//		Sets the value of the widget to "value" which can be of
		//		any type as determined by the widget.
		//
		// value:
		//		The visual element value is also set to a corresponding,
		//		but not necessarily the same, value.
		//
		// formattedValue:
		//		If specified, used to set the visual element value,
		//		otherwise a computed visual value is used.
		//
		// priorityChange:
		//		If true, an onChange event is fired immediately instead of
		//		waiting for the next blur event.

		var filteredValue;
		if(value !== undefined){
			// TODO: this is calling filter() on both the display value and the actual value.
			// I added a comment to the filter() definition about this, but it should be changed.
			filteredValue = this.filter(value);
			if(typeof formattedValue != "string"){
				if(filteredValue !== null && ((typeof filteredValue != "number") || !isNaN(filteredValue))){
					formattedValue = this.filter(this.format(filteredValue, this.constraints));
				}else{ formattedValue = ''; }
			}
		}
		if(formattedValue != null && formattedValue != undefined && ((typeof formattedValue) != "number" || !isNaN(formattedValue)) && this.textbox.value != formattedValue){
			this.textbox.value = formattedValue;
			this._set("displayedValue", this.get("displayedValue"));
		}

		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, formattedValue);
		}

		this.inherited(arguments, [filteredValue, priorityChange]);
	},

	// displayedValue: String
	//		For subclasses like ComboBox where the displayed value
	//		(ex: Kentucky) and the serialized value (ex: KY) are different,
	//		this represents the displayed value.
	//
	//		Setting 'displayedValue' through set('displayedValue', ...)
	//		updates 'value', and vice-versa.  Otherwise 'value' is updated
	//		from 'displayedValue' periodically, like onBlur etc.
	//
	//		TODO: move declaration to MappedTextBox?
	//		Problem is that ComboBox references displayedValue,
	//		for benefit of FilteringSelect.
	displayedValue: "",

	_getDisplayedValueAttr: function(){
		// summary:
		//		Hook so get('displayedValue') works.
		// description:
		//		Returns the displayed value (what the user sees on the screen),
		// 		after filtering (ie, trimming spaces etc.).
		//
		//		For some subclasses of TextBox (like ComboBox), the displayed value
		//		is different from the serialized value that's actually
		//		sent to the server (see dijit.form.ValidationTextBox.serialize)

		// TODO: maybe we should update this.displayedValue on every keystroke so that we don't need
		// this method
		// TODO: this isn't really the displayed value when the user is typing
		return this.filter(this.textbox.value);
	},

	_setDisplayedValueAttr: function(/*String*/ value){
		// summary:
		//		Hook so set('displayedValue', ...) works.
		// description:
		//		Sets the value of the visual element to the string "value".
		//		The widget value is also set to a corresponding,
		//		but not necessarily the same, value.

		if(value === null || value === undefined){ value = '' }
		else if(typeof value != "string"){ value = String(value) }

		this.textbox.value = value;

		// sets the serialized value to something corresponding to specified displayedValue
		// (if possible), and also updates the textbox.value, for example converting "123"
		// to "123.00"
		this._setValueAttr(this.get('value'), undefined);

		this._set("displayedValue", this.get('displayedValue'));

		// textDir support
		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, value);
		}
	},

	format: function(value /*=====, constraints =====*/){
		// summary:
		//		Replaceable function to convert a value to a properly formatted string.
		// value: String
		// constraints: Object
		// tags:
		//		protected extension
		return ((value == null || value == undefined) ? "" : (value.toString ? value.toString() : value));
	},

	parse: function(value /*=====, constraints =====*/){
		// summary:
		//		Replaceable function to convert a formatted string to a value
		// value: String
		// constraints: Object
		// tags:
		//		protected extension

		return value;	// String
	},

	_refreshState: function(){
		// summary:
		//		After the user types some characters, etc., this method is
		//		called to check the field for validity etc.  The base method
		//		in `dijit.form.TextBox` does nothing, but subclasses override.
		// tags:
		//		protected
	},

	/*=====
	onInput: function(event){
		// summary:
		//		Connect to this function to receive notifications of various user data-input events.
		//		Return false to cancel the event and prevent it from being processed.
		// event:
		//		keydown | keypress | cut | paste | input
		// tags:
		//		callback
	},
	=====*/
	onInput: function(){},

	__skipInputEvent: false,
	_onInput: function(){
		// summary:
		//		Called AFTER the input event has happened
		// set text direction according to textDir that was defined in creation
		if(this.textDir == "auto"){
			this.applyTextDir(this.focusNode, this.focusNode.value);
		}

		this._refreshState();

		// In case someone is watch()'ing for changes to displayedValue
		this._set("displayedValue", this.get("displayedValue"));
	},

	postCreate: function(){
		// setting the value here is needed since value="" in the template causes "undefined"
		// and setting in the DOM (instead of the JS object) helps with form reset actions
		this.textbox.setAttribute("value", this.textbox.value); // DOM and JS values should be the same

		this.inherited(arguments);

		// normalize input events to reduce spurious event processing
		//	onkeydown: do not forward modifier keys
		//	           set charOrCode to numeric keycode
		//	onkeypress: do not forward numeric charOrCode keys (already sent through onkeydown)
		//	onpaste & oncut: set charOrCode to 229 (IME)
		//	oninput: if primary event not already processed, set charOrCode to 229 (IME), else do not forward
		var handleEvent = function(e){
			var charCode = e.charOrCode || e.keyCode || 229;
			if(e.type == "keydown"){
				switch(charCode){ // ignore "state" keys
					case keys.SHIFT:
					case keys.ALT:
					case keys.CTRL:
					case keys.META:
					case keys.CAPS_LOCK:
						return;
					default:
						if(charCode >= 65 && charCode <= 90){ return; } // keydown for A-Z can be processed with keypress
				}
			}
			if(e.type == "keypress" && typeof charCode != "string"){ return; }
			if(e.type == "input"){
				if(this.__skipInputEvent){ // duplicate event
					this.__skipInputEvent = false;
					return;
				}
			}else{
				this.__skipInputEvent = true;
			}
			// create fake event to set charOrCode and to know if preventDefault() was called
			var faux = lang.mixin({}, e, {
				charOrCode: charCode,
				wasConsumed: false,
				preventDefault: function(){
					faux.wasConsumed = true;
					e.preventDefault();
				},
				stopPropagation: function(){ e.stopPropagation(); }
			});
			// give web page author a chance to consume the event
			if(this.onInput(faux) === false){
				event.stop(faux); // return false means stop
			}
			if(faux.wasConsumed){ return; } // if preventDefault was called
			setTimeout(lang.hitch(this, "_onInput", faux), 0); // widget notification after key has posted
		};
		array.forEach([ "onkeydown", "onkeypress", "onpaste", "oncut", "oninput" ], function(event){
			this.connect(this.textbox, event, handleEvent);
		}, this);
	},

	_blankValue: '', // if the textbox is blank, what value should be reported
	filter: function(val){
		// summary:
		//		Auto-corrections (such as trimming) that are applied to textbox
		//		value on blur or form submit.
		// description:
		//		For MappedTextBox subclasses, this is called twice
		// 			- once with the display value
		//			- once the value as set/returned by set('value', ...)
		//		and get('value'), ex: a Number for NumberTextBox.
		//
		//		In the latter case it does corrections like converting null to NaN.  In
		//		the former case the NumberTextBox.filter() method calls this.inherited()
		//		to execute standard trimming code in TextBox.filter().
		//
		//		TODO: break this into two methods in 2.0
		//
		// tags:
		//		protected extension
		if(val === null){ return this._blankValue; }
		if(typeof val != "string"){ return val; }
		if(this.trim){
			val = lang.trim(val);
		}
		if(this.uppercase){
			val = val.toUpperCase();
		}
		if(this.lowercase){
			val = val.toLowerCase();
		}
		if(this.propercase){
			val = val.replace(/[^\s]+/g, function(word){
				return word.substring(0,1).toUpperCase() + word.substring(1);
			});
		}
		return val;
	},

	_setBlurValue: function(){
		this._setValueAttr(this.get('value'), true);
	},

	_onBlur: function(e){
		if(this.disabled){ return; }
		this._setBlurValue();
		this.inherited(arguments);

		if(this._selectOnClickHandle){
			this.disconnect(this._selectOnClickHandle);
		}
	},

	_isTextSelected: function(){
		return this.textbox.selectionStart == this.textbox.selectionEnd;
	},

	_onFocus: function(/*String*/ by){
		if(this.disabled || this.readOnly){ return; }

		// Select all text on focus via click if nothing already selected.
		// Since mouse-up will clear the selection need to defer selection until after mouse-up.
		// Don't do anything on focus by tabbing into the widget since there's no associated mouse-up event.
		if(this.selectOnClick && by == "mouse"){
			this._selectOnClickHandle = this.connect(this.domNode, "onmouseup", function(){
				// Only select all text on first click; otherwise users would have no way to clear
				// the selection.
				this.disconnect(this._selectOnClickHandle);

				// Check if the user selected some text manually (mouse-down, mouse-move, mouse-up)
				// and if not, then select all the text
				if(this._isTextSelected()){
					_TextBoxMixin.selectInputText(this.textbox);
				}
			});
		}
		// call this.inherited() before refreshState(), since this.inherited() will possibly scroll the viewport
		// (to scroll the TextBox into view), which will affect how _refreshState() positions the tooltip
		this.inherited(arguments);

		this._refreshState();
	},

	reset: function(){
		// Overrides dijit._FormWidget.reset().
		// Additionally resets the displayed textbox value to ''
		this.textbox.value = '';
		this.inherited(arguments);
	},
	_setTextDirAttr: function(/*String*/ textDir){
		// summary:
		//		Setter for textDir.
		// description:
		//		Users shouldn't call this function; they should be calling
		//		set('textDir', value)
		// tags:
		//		private

		// only if new textDir is different from the old one
		// and on widgets creation.
		if(!this._created
			|| this.textDir != textDir){
				this._set("textDir", textDir);
				// so the change of the textDir will take place immediately.
				this.applyTextDir(this.focusNode, this.focusNode.value);
		}
	}
});


_TextBoxMixin._setSelectionRange = dijit._setSelectionRange = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
	if(element.setSelectionRange){
		element.setSelectionRange(start, stop);
	}
};

_TextBoxMixin.selectInputText = dijit.selectInputText = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
	// summary:
	//		Select text in the input element argument, from start (default 0), to stop (default end).

	// TODO: use functions in _editor/selection.js?
	element = dom.byId(element);
	if(isNaN(start)){ start = 0; }
	if(isNaN(stop)){ stop = element.value ? element.value.length : 0; }
	try{
		element.focus();
		_TextBoxMixin._setSelectionRange(element, start, stop);
	}catch(e){ /* squelch random errors (esp. on IE) from unexpected focus changes or DOM nodes being hidden */ }
};

return _TextBoxMixin;
});

},
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
'dojo/cldr/supplemental':function(){
define("dojo/cldr/supplemental", ["../_base/kernel", "../_base/lang", "../i18n"], function(dojo, lang) {
	// module:
	//		dojo/cldr/supplemental
	// summary:
	//		TODOC

lang.getObject("cldr.supplemental", true, dojo);

dojo.cldr.supplemental.getFirstDayOfWeek = function(/*String?*/locale){
// summary: Returns a zero-based index for first day of the week
// description:
//		Returns a zero-based index for first day of the week, as used by the local (Gregorian) calendar.
//		e.g. Sunday (returns 0), or Monday (returns 1)

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/firstDay
	var firstDay = {/*default is 1=Monday*/
		mv:5,
		ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,
		ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,
		ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,
		il:0,'in':0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,
		mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,
		vi:0,zw:0
// variant. do not use?		gb:0,
	};

	var country = dojo.cldr.supplemental._region(locale);
	var dow = firstDay[country];
	return (dow === undefined) ? 1 : dow; /*Number*/
};

dojo.cldr.supplemental._region = function(/*String?*/locale){
	locale = dojo.i18n.normalizeLocale(locale);
	var tags = locale.split('-');
	var region = tags[1];
	if(!region){
		// IE often gives language only (#2269)
		// Arbitrary mappings of language-only locales to a country:
		region = {de:"de", en:"us", es:"es", fi:"fi", fr:"fr", he:"il", hu:"hu", it:"it",
			ja:"jp", ko:"kr", nl:"nl", pt:"br", sv:"se", zh:"cn"}[tags[0]];
	}else if(region.length == 4){
		// The ISO 3166 country code is usually in the second position, unless a
		// 4-letter script is given. See http://www.ietf.org/rfc/rfc4646.txt
		region = tags[2];
	}
	return region;
};

dojo.cldr.supplemental.getWeekend = function(/*String?*/locale){
// summary: Returns a hash containing the start and end days of the weekend
// description:
//		Returns a hash containing the start and end days of the weekend according to local custom using locale,
//		or by default in the user's locale.
//		e.g. {start:6, end:0}

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/weekend{Start,End}
	var weekendStart = {/*default is 6=Saturday*/
		'in':0,
		af:4,dz:4,ir:4,om:4,sa:4,ye:4,
		ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5
	};

	var weekendEnd = {/*default is 0=Sunday*/
		af:5,dz:5,ir:5,om:5,sa:5,ye:5,
		ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6
	};

	var country = dojo.cldr.supplemental._region(locale);
	var start = weekendStart[country];
	var end = weekendEnd[country];
	if(start === undefined){start=6;}
	if(end === undefined){end=0;}
	return {start:start, end:end}; /*Object {start,end}*/
};

return dojo.cldr.supplemental;
});

},
'dojo/cldr/nls/gregorian':function(){
define({ root:

//begin v1.x content
{
	"months-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "Day of the Week",
	"dateFormatItem-yQQQ": "y QQQ",
	"dateFormatItem-yMEd": "EEE, y-M-d",
	"dateFormatItem-MMMEd": "E MMM d",
	"eraNarrow": [
		"BCE",
		"CE"
	],
	"dateTimeFormats-appendItem-Day-Of-Week": "{0} {1}",
	"dateFormat-long": "y MMMM d",
	"months-format-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dateFormatItem-EEEd": "d EEE",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, y MMMM dd",
	"dateFormatItem-Md": "M-d",
	"dayPeriods-format-abbr-am": "AM",
	"dateTimeFormats-appendItem-Second": "{0} ({2}: {1})",
	"field-era": "Era",
	"dateFormatItem-yM": "y-M",
	"months-standAlone-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"timeFormat-short": "HH:mm",
	"quarters-format-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"timeFormat-long": "HH:mm:ss z",
	"field-year": "Year",
	"dateFormatItem-yMMM": "y MMM",
	"dateFormatItem-yQ": "y Q",
	"dateTimeFormats-appendItem-Era": "{0} {1}",
	"field-hour": "Hour",
	"months-format-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"timeFormat-full": "HH:mm:ss zzzz",
	"dateTimeFormats-appendItem-Week": "{0} ({2}: {1})",
	"field-day-relative+0": "Today",
	"field-day-relative+1": "Tomorrow",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"quarters-format-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"quarters-standAlone-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"timeFormat-medium": "HH:mm:ss",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"eraAbbr": [
		"BCE",
		"CE"
	],
	"field-minute": "Minute",
	"field-dayperiod": "Dayperiod",
	"days-standAlone-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-day-relative+-1": "Yesterday",
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "AM",
	"dateFormatItem-MMMd": "MMM d",
	"dateFormatItem-MEd": "E, M-d",
	"dateTimeFormat-full": "{1} {0}",
	"field-day": "Day",
	"days-format-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"field-zone": "Zone",
	"dateTimeFormats-appendItem-Day": "{0} ({2}: {1})",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"dateFormatItem-hm": "h:mm a",
	"dateTimeFormats-appendItem-Year": "{0} {1}",
	"dateTimeFormats-appendItem-Hour": "{0} ({2}: {1})",
	"dayPeriods-format-abbr-pm": "PM",
	"days-format-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"eraNames": [
		"BCE",
		"CE"
	],
	"days-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"days-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "Month",
	"dateTimeFormats-appendItem-Quarter": "{0} ({2}: {1})",
	"dayPeriods-format-wide-am": "AM",
	"dateTimeFormats-appendItem-Month": "{0} ({2}: {1})",
	"dateTimeFormats-appendItem-Minute": "{0} ({2}: {1})",
	"dateFormat-short": "yyyy-MM-dd",
	"field-second": "Second",
	"dateFormatItem-yMMMEd": "EEE, y MMM d",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "Week",
	"dateFormat-medium": "y MMM d",
	"dayPeriods-format-narrow-pm": "PM",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a"
}
//end v1.x content
,
	"aa": true,
	"af": true,
	"ak": true,
	"am": true,
	"ar": true,
	"ar-dz": true,
	"ar-jo": true,
	"ar-lb": true,
	"ar-ma": true,
	"ar-qa": true,
	"ar-sa": true,
	"ar-sy": true,
	"ar-tn": true,
	"ar-ye": true,
	"as": true,
	"asa": true,
	"az": true,
	"az-cyrl": true,
	"be": true,
	"bem": true,
	"bez": true,
	"bg": true,
	"bm": true,
	"bn": true,
	"bn-in": true,
	"bo": true,
	"br": true,
	"brx": true,
	"bs": true,
	"byn": true,
	"ca": true,
	"cgg": true,
	"chr": true,
	"cs": true,
	"cy": true,
	"da": true,
	"dav": true,
	"de": true,
	"de-at": true,
	"de-be": true,
	"dz": true,
	"ebu": true,
	"ee": true,
	"el": true,
	"el-polyton": true,
	"en": true,
	"en-au": true,
	"en-be": true,
	"en-bw": true,
	"en-bz": true,
	"en-ca": true,
	"en-dsrt": true,
	"en-gb": true,
	"en-hk": true,
	"en-ie": true,
	"en-in": true,
	"en-mt": true,
	"en-nz": true,
	"en-pk": true,
	"en-sg": true,
	"en-shaw": true,
	"en-za": true,
	"en-zw": true,
	"eo": true,
	"es": true,
	"es-ar": true,
	"es-cl": true,
	"es-co": true,
	"es-ec": true,
	"es-gt": true,
	"es-hn": true,
	"es-pa": true,
	"es-pe": true,
	"es-pr": true,
	"es-us": true,
	"et": true,
	"eu": true,
	"fa": true,
	"fa-af": true,
	"ff": true,
	"fi": true,
	"fil": true,
	"fo": true,
	"fr": true,
	"fr-be": true,
	"fr-ca": true,
	"fr-ch": true,
	"fur": true,
	"ga": true,
	"gl": true,
	"gsw": true,
	"gu": true,
	"guz": true,
	"gv": true,
	"ha": true,
	"haw": true,
	"he": true,
	"hi": true,
	"hr": true,
	"hu": true,
	"hy": true,
	"id": true,
	"ig": true,
	"ii": true,
	"in": true,
	"is": true,
	"it": true,
	"it-ch": true,
	"iw": true,
	"ja": true,
	"jmc": true,
	"ka": true,
	"kab": true,
	"kam": true,
	"kde": true,
	"kea": true,
	"khq": true,
	"ki": true,
	"kk": true,
	"kl": true,
	"kln": true,
	"km": true,
	"kn": true,
	"ko": true,
	"kok": true,
	"ksb": true,
	"ksh": true,
	"kw": true,
	"lag": true,
	"lg": true,
	"ln": true,
	"lt": true,
	"luo": true,
	"luy": true,
	"lv": true,
	"mas": true,
	"mer": true,
	"mfe": true,
	"mg": true,
	"mk": true,
	"ml": true,
	"mo": true,
	"mr": true,
	"ms": true,
	"ms-bn": true,
	"mt": true,
	"my": true,
	"naq": true,
	"nb": true,
	"nd": true,
	"ne": true,
	"ne-in": true,
	"nl": true,
	"nl-be": true,
	"nn": true,
	"no": true,
	"nyn": true,
	"oc": true,
	"om": true,
	"or": true,
	"pa": true,
	"pa-arab": true,
	"pa-pk": true,
	"pl": true,
	"ps": true,
	"pt": true,
	"pt-pt": true,
	"rm": true,
	"ro": true,
	"rof": true,
	"ru": true,
	"ru-ua": true,
	"rw": true,
	"rwk": true,
	"saq": true,
	"se": true,
	"seh": true,
	"ses": true,
	"sg": true,
	"sh": true,
	"shi": true,
	"shi-tfng": true,
	"si": true,
	"sk": true,
	"sl": true,
	"sn": true,
	"so": true,
	"sq": true,
	"sr": true,
	"sr-ba": true,
	"sr-cyrl-ba": true,
	"sr-latn": true,
	"sr-latn-me": true,
	"sr-me": true,
	"ssy": true,
	"sv": true,
	"sv-fi": true,
	"sw": true,
	"syr": true,
	"ta": true,
	"te": true,
	"teo": true,
	"th": true,
	"ti": true,
	"ti-er": true,
	"tl": true,
	"to": true,
	"tr": true,
	"trv": true,
	"tzm": true,
	"uk": true,
	"ur": true,
	"vi": true,
	"vun": true,
	"xog": true,
	"yo": true,
	"zh": true,
	"zh-hans-sg": true,
	"zh-hant": true,
	"zh-hant-hk": true,
	"zh-hant-mo": true,
	"zh-hk": true,
	"zh-mo": true,
	"zh-sg": true,
	"zh-tw": true,
	"zu": true
});
},
'dijit/form/TextBox':function(){
require({cache:{
'url:dijit/form/templates/TextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox", [
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-style", // domStyle.getComputedStyle
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/sniff", // has("ie") has("mozilla")
	"dojo/_base/window", // win.doc.selection.createRange
	"./_FormValueWidget",
	"./_TextBoxMixin",
	"dojo/text!./templates/TextBox.html",
	".."	// to export dijit._setSelectionRange, remove in 2.0
], function(declare, domConstruct, domStyle, kernel, lang, has, win,
			_FormValueWidget, _TextBoxMixin, template, dijit){

/*=====
	var _FormValueWidget = dijit.form._FormValueWidget;
	var _TextBoxMixin = dijit.form._TextBoxMixin;
=====*/

	// module:
	//		dijit/form/TextBox
	// summary:
	//		A base class for textbox form inputs

	var TextBox = declare(/*====="dijit.form.TextBox", =====*/ [_FormValueWidget, _TextBoxMixin], {
		// summary:
		//		A base class for textbox form inputs

		templateString: template,
		_singleNodeTemplate: '<input class="dijit dijitReset dijitLeft dijitInputField" data-dojo-attach-point="textbox,focusNode" autocomplete="off" type="${type}" ${!nameAttrSetting} />',

		_buttonInputDisabled: has("ie") ? "disabled" : "", // allows IE to disallow focus, but Firefox cannot be disabled for mousedown events

		baseClass: "dijitTextBox",

		postMixInProperties: function(){
			var type = this.type.toLowerCase();
			if(this.templateString && this.templateString.toLowerCase() == "input" || ((type == "hidden" || type == "file") && this.templateString == this.constructor.prototype.templateString)){
				this.templateString = this._singleNodeTemplate;
			}
			this.inherited(arguments);
		},

		_onInput: function(e){
			this.inherited(arguments);
			if(this.intermediateChanges){ // _TextBoxMixin uses onInput
				var _this = this;
				// the setTimeout allows the key to post to the widget input box
				setTimeout(function(){ _this._handleOnChange(_this.get('value'), false); }, 0);
			}
		},

		_setPlaceHolderAttr: function(v){
			this._set("placeHolder", v);
			if(!this._phspan){
				this._attachPoints.push('_phspan');
				// dijitInputField class gives placeHolder same padding as the input field
				// parent node already has dijitInputField class but it doesn't affect this <span>
				// since it's position: absolute.
				this._phspan = domConstruct.create('span',{className:'dijitPlaceHolder dijitInputField'},this.textbox,'after');
			}
			this._phspan.innerHTML="";
			this._phspan.appendChild(document.createTextNode(v));
			this._updatePlaceHolder();
		},

		_updatePlaceHolder: function(){
			if(this._phspan){
				this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
			}
		},

		_setValueAttr: function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this.inherited(arguments);
			this._updatePlaceHolder();
		},

		getDisplayedValue: function(){
			// summary:
			//		Deprecated.  Use get('displayedValue') instead.
			// tags:
			//		deprecated
			kernel.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.", "", "2.0");
			return this.get('displayedValue');
		},

		setDisplayedValue: function(/*String*/ value){
			// summary:
			//		Deprecated.  Use set('displayedValue', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.", "", "2.0");
			this.set('displayedValue', value);
		},

		_onBlur: function(e){
			if(this.disabled){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
		},

		_onFocus: function(/*String*/ by){
			if(this.disabled || this.readOnly){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
		}
	});

	if(has("ie")){
		TextBox = declare(/*===== "dijit.form.TextBox.IEMixin", =====*/ TextBox, {
			declaredClass: "dijit.form.TextBox",	// for user code referencing declaredClass

			_isTextSelected: function(){
				var range = win.doc.selection.createRange();
				var parent = range.parentElement();
				return parent == this.textbox && range.text.length == 0;
			},

			postCreate: function(){
				this.inherited(arguments);
				// IE INPUT tag fontFamily has to be set directly using STYLE
				// the setTimeout gives IE a chance to render the TextBox and to deal with font inheritance
				setTimeout(lang.hitch(this, function(){
					try{
						var s = domStyle.getComputedStyle(this.domNode); // can throw an exception if widget is immediately destroyed
						if(s){
							var ff = s.fontFamily;
							if(ff){
								var inputs = this.domNode.getElementsByTagName("INPUT");
								if(inputs){
									for(var i=0; i < inputs.length; i++){
										inputs[i].style.fontFamily = ff;
									}
								}
							}
						}
					}catch(e){/*when used in a Dialog, and this is called before the dialog is
						shown, s.fontFamily would trigger "Invalid Argument" error.*/}
				}), 0);
			}
		});

		// Overrides definition of _setSelectionRange from _TextBoxMixin (TODO: move to _TextBoxMixin.js?)
		dijit._setSelectionRange = _TextBoxMixin._setSelectionRange = function(/*DomNode*/ element, /*Number?*/ start, /*Number?*/ stop){
			if(element.createTextRange){
				var r = element.createTextRange();
				r.collapse(true);
				r.moveStart("character", -99999); // move to 0
				r.moveStart("character", start); // delta from 0 is the correct position
				r.moveEnd("character", stop-start);
				r.select();
			}
		}
	}else if(has("mozilla")){
		TextBox = declare(/*===== "dijit.form.TextBox.MozMixin", =====*/TextBox, {
			declaredClass: "dijit.form.TextBox",	// for user code referencing declaredClass

			_onBlur: function(e){
				this.inherited(arguments);
				if(this.selectOnClick){
						// clear selection so that the next mouse click doesn't reselect
					this.textbox.selectionStart = this.textbox.selectionEnd = undefined;
				}
			}
		});
	}else{
		TextBox.prototype.declaredClass = "dijit.form.TextBox";
	}
	lang.setObject("dijit.form.TextBox", TextBox);	// don't do direct assignment, it confuses API doc parser

	return TextBox;
});

},
'dojo/date/locale':function(){
define("dojo/date/locale", [
	"../_base/kernel",
	"../_base/lang",
	"../_base/array",
	"../date",
	"../cldr/supplemental",
	"../regexp",
	"../string",
	"../i18n!../cldr/nls/gregorian"
], function(dojo, lang, array, date, cldr, regexp, string, gregorian) {
	// module:
	//		dojo/date/locale
	// summary:
	//		This modules defines dojo.date.locale, localization methods for Date.

lang.getObject("date.locale", true, dojo);

// Localization methods for Date.   Honor local customs using locale-dependent dojo.cldr data.

// Load the bundles containing localization information for
// names and formats

//NOTE: Everything in this module assumes Gregorian calendars.
// Other calendars will be implemented in separate modules.

	// Format a pattern without literals
	function formatPattern(dateObject, bundle, options, pattern){
		return pattern.replace(/([a-z])\1*/ig, function(match){
			var s, pad,
				c = match.charAt(0),
				l = match.length,
				widthList = ["abbr", "wide", "narrow"];
			switch(c){
				case 'G':
					s = bundle[(l < 4) ? "eraAbbr" : "eraNames"][dateObject.getFullYear() < 0 ? 0 : 1];
					break;
				case 'y':
					s = dateObject.getFullYear();
					switch(l){
						case 1:
							break;
						case 2:
							if(!options.fullYear){
								s = String(s); s = s.substr(s.length - 2);
								break;
							}
							// fallthrough
						default:
							pad = true;
					}
					break;
				case 'Q':
				case 'q':
					s = Math.ceil((dateObject.getMonth()+1)/3);
//					switch(l){
//						case 1: case 2:
							pad = true;
//							break;
//						case 3: case 4: // unimplemented
//					}
					break;
				case 'M':
					var m = dateObject.getMonth();
					if(l<3){
						s = m+1; pad = true;
					}else{
						var propM = ["months", "format", widthList[l-3]].join("-");
						s = bundle[propM][m];
					}
					break;
				case 'w':
					var firstDay = 0;
					s = dojo.date.locale._getWeekOfYear(dateObject, firstDay); pad = true;
					break;
				case 'd':
					s = dateObject.getDate(); pad = true;
					break;
				case 'D':
					s = dojo.date.locale._getDayOfYear(dateObject); pad = true;
					break;
				case 'E':
					var d = dateObject.getDay();
					if(l<3){
						s = d+1; pad = true;
					}else{
						var propD = ["days", "format", widthList[l-3]].join("-");
						s = bundle[propD][d];
					}
					break;
				case 'a':
					var timePeriod = (dateObject.getHours() < 12) ? 'am' : 'pm';
					s = options[timePeriod] || bundle['dayPeriods-format-wide-' + timePeriod];
					break;
				case 'h':
				case 'H':
				case 'K':
				case 'k':
					var h = dateObject.getHours();
					// strange choices in the date format make it impossible to write this succinctly
					switch (c){
						case 'h': // 1-12
							s = (h % 12) || 12;
							break;
						case 'H': // 0-23
							s = h;
							break;
						case 'K': // 0-11
							s = (h % 12);
							break;
						case 'k': // 1-24
							s = h || 24;
							break;
					}
					pad = true;
					break;
				case 'm':
					s = dateObject.getMinutes(); pad = true;
					break;
				case 's':
					s = dateObject.getSeconds(); pad = true;
					break;
				case 'S':
					s = Math.round(dateObject.getMilliseconds() * Math.pow(10, l-3)); pad = true;
					break;
				case 'v': // FIXME: don't know what this is. seems to be same as z?
				case 'z':
					// We only have one timezone to offer; the one from the browser
					s = dojo.date.locale._getZone(dateObject, true, options);
					if(s){break;}
					l=4;
					// fallthrough... use GMT if tz not available
				case 'Z':
					var offset = dojo.date.locale._getZone(dateObject, false, options);
					var tz = [
						(offset<=0 ? "+" : "-"),
						string.pad(Math.floor(Math.abs(offset)/60), 2),
						string.pad(Math.abs(offset)% 60, 2)
					];
					if(l==4){
						tz.splice(0, 0, "GMT");
						tz.splice(3, 0, ":");
					}
					s = tz.join("");
					break;
//				case 'Y': case 'u': case 'W': case 'F': case 'g': case 'A': case 'e':
//					console.log(match+" modifier unimplemented");
				default:
					throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern);
			}
			if(pad){ s = string.pad(s, l); }
			return s;
		});
	}

/*=====
	dojo.date.locale.__FormatOptions = function(){
	//	selector: String
	//		choice of 'time','date' (default: date and time)
	//	formatLength: String
	//		choice of long, short, medium or full (plus any custom additions).  Defaults to 'short'
	//	datePattern:String
	//		override pattern with this string
	//	timePattern:String
	//		override pattern with this string
	//	am: String
	//		override strings for am in times
	//	pm: String
	//		override strings for pm in times
	//	locale: String
	//		override the locale used to determine formatting rules
	//	fullYear: Boolean
	//		(format only) use 4 digit years whenever 2 digit years are called for
	//	strict: Boolean
	//		(parse only) strict parsing, off by default
		this.selector = selector;
		this.formatLength = formatLength;
		this.datePattern = datePattern;
		this.timePattern = timePattern;
		this.am = am;
		this.pm = pm;
		this.locale = locale;
		this.fullYear = fullYear;
		this.strict = strict;
	}
=====*/

dojo.date.locale._getZone = function(/*Date*/dateObject, /*boolean*/getName, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Returns the zone (or offset) for the given date and options.  This
	//		is broken out into a separate function so that it can be overridden
	//		by timezone-aware code.
	//
	// dateObject:
	//		the date and/or time being formatted.
	//
	// getName:
	//		Whether to return the timezone string (if true), or the offset (if false)
	//
	// options:
	//		The options being used for formatting
	if(getName){
		return date.getTimezoneName(dateObject);
	}else{
		return dateObject.getTimezoneOffset();
	}
};


dojo.date.locale.format = function(/*Date*/dateObject, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Format a Date object as a String, using locale-specific settings.
	//
	// description:
	//		Create a string from a Date object using a known localized pattern.
	//		By default, this method formats both date and time from dateObject.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo.date.locale.addCustomFormats method.
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//
	// dateObject:
	//		the date and/or time to be formatted.  If a time only is formatted,
	//		the values in the year, month, and day fields are irrelevant.  The
	//		opposite is true when formatting only dates.

	options = options || {};

	var locale = dojo.i18n.normalizeLocale(options.locale),
		formatLength = options.formatLength || 'short',
		bundle = dojo.date.locale._getGregorianBundle(locale),
		str = [],
		sauce = lang.hitch(this, formatPattern, dateObject, bundle, options);
	if(options.selector == "year"){
		return _processPattern(bundle["dateFormatItem-yyyy"] || "yyyy", sauce);
	}
	var pattern;
	if(options.selector != "date"){
		pattern = options.timePattern || bundle["timeFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}
	if(options.selector != "time"){
		pattern = options.datePattern || bundle["dateFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}

	return str.length == 1 ? str[0] : bundle["dateTimeFormat-"+formatLength].replace(/\{(\d+)\}/g,
		function(match, key){ return str[key]; }); // String
};

dojo.date.locale.regexp = function(/*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Builds the regular needed to parse a localized date

	return dojo.date.locale._parseInfo(options).regexp; // String
};

dojo.date.locale._parseInfo = function(/*dojo.date.locale.__FormatOptions?*/options){
	options = options || {};
	var locale = dojo.i18n.normalizeLocale(options.locale),
		bundle = dojo.date.locale._getGregorianBundle(locale),
		formatLength = options.formatLength || 'short',
		datePattern = options.datePattern || bundle["dateFormat-" + formatLength],
		timePattern = options.timePattern || bundle["timeFormat-" + formatLength],
		pattern;
	if(options.selector == 'date'){
		pattern = datePattern;
	}else if(options.selector == 'time'){
		pattern = timePattern;
	}else{
		pattern = bundle["dateTimeFormat-"+formatLength].replace(/\{(\d+)\}/g,
			function(match, key){ return [timePattern, datePattern][key]; });
	}

	var tokens = [],
		re = _processPattern(pattern, lang.hitch(this, _buildDateTimeRE, tokens, bundle, options));
	return {regexp: re, tokens: tokens, bundle: bundle};
};

dojo.date.locale.parse = function(/*String*/value, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Convert a properly formatted string to a primitive Date object,
	//		using locale-specific settings.
	//
	// description:
	//		Create a Date object from a string using a known localized pattern.
	//		By default, this method parses looking for both date and time in the string.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo.date.locale.addCustomFormats method.
	//
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//		When two digit years are used, a century is chosen according to a sliding
	//		window of 80 years before and 20 years after present year, for both `yy` and `yyyy` patterns.
	//		year < 100CE requires strict mode.
	//
	// value:
	//		A string representation of a date

	// remove non-printing bidi control chars from input and pattern
	var controlChars = /[\u200E\u200F\u202A\u202E]/g,
		info = dojo.date.locale._parseInfo(options),
		tokens = info.tokens, bundle = info.bundle,
		re = new RegExp("^" + info.regexp.replace(controlChars, "") + "$",
			info.strict ? "" : "i"),
		match = re.exec(value && value.replace(controlChars, ""));

	if(!match){ return null; } // null

	var widthList = ['abbr', 'wide', 'narrow'],
		result = [1970,0,1,0,0,0,0], // will get converted to a Date at the end
		amPm = "",
		valid = dojo.every(match, function(v, i){
		if(!i){return true;}
		var token=tokens[i-1];
		var l=token.length;
		switch(token.charAt(0)){
			case 'y':
				if(l != 2 && options.strict){
					//interpret year literally, so '5' would be 5 A.D.
					result[0] = v;
				}else{
					if(v<100){
						v = Number(v);
						//choose century to apply, according to a sliding window
						//of 80 years before and 20 years after present year
						var year = '' + new Date().getFullYear(),
							century = year.substring(0, 2) * 100,
							cutoff = Math.min(Number(year.substring(2, 4)) + 20, 99);
						result[0] = (v < cutoff) ? century + v : century - 100 + v;
					}else{
						//we expected 2 digits and got more...
						if(options.strict){
							return false;
						}
						//interpret literally, so '150' would be 150 A.D.
						//also tolerate '1950', if 'yyyy' input passed to 'yy' format
						result[0] = v;
					}
				}
				break;
			case 'M':
				if(l>2){
					var months = bundle['months-format-' + widthList[l-3]].concat();
					if(!options.strict){
						//Tolerate abbreviating period in month part
						//Case-insensitive comparison
						v = v.replace(".","").toLowerCase();
						months = dojo.map(months, function(s){ return s.replace(".","").toLowerCase(); } );
					}
					v = dojo.indexOf(months, v);
					if(v == -1){
//						console.log("dojo.date.locale.parse: Could not parse month name: '" + v + "'.");
						return false;
					}
				}else{
					v--;
				}
				result[1] = v;
				break;
			case 'E':
			case 'e':
				var days = bundle['days-format-' + widthList[l-3]].concat();
				if(!options.strict){
					//Case-insensitive comparison
					v = v.toLowerCase();
					days = dojo.map(days, function(d){return d.toLowerCase();});
				}
				v = dojo.indexOf(days, v);
				if(v == -1){
//					console.log("dojo.date.locale.parse: Could not parse weekday name: '" + v + "'.");
					return false;
				}

				//TODO: not sure what to actually do with this input,
				//in terms of setting something on the Date obj...?
				//without more context, can't affect the actual date
				//TODO: just validate?
				break;
			case 'D':
				result[1] = 0;
				// fallthrough...
			case 'd':
				result[2] = v;
				break;
			case 'a': //am/pm
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
				if(!options.strict){
					var period = /\./g;
					v = v.replace(period,'').toLowerCase();
					am = am.replace(period,'').toLowerCase();
					pm = pm.replace(period,'').toLowerCase();
				}
				if(options.strict && v != am && v != pm){
//					console.log("dojo.date.locale.parse: Could not parse am/pm part.");
					return false;
				}

				// we might not have seen the hours field yet, so store the state and apply hour change later
				amPm = (v == pm) ? 'p' : (v == am) ? 'a' : '';
				break;
			case 'K': //hour (1-24)
				if(v == 24){ v = 0; }
				// fallthrough...
			case 'h': //hour (1-12)
			case 'H': //hour (0-23)
			case 'k': //hour (0-11)
				//TODO: strict bounds checking, padding
				if(v > 23){
//					console.log("dojo.date.locale.parse: Illegal hours value");
					return false;
				}

				//in the 12-hour case, adjusting for am/pm requires the 'a' part
				//which could come before or after the hour, so we will adjust later
				result[3] = v;
				break;
			case 'm': //minutes
				result[4] = v;
				break;
			case 's': //seconds
				result[5] = v;
				break;
			case 'S': //milliseconds
				result[6] = v;
//				break;
//			case 'w':
//TODO				var firstDay = 0;
//			default:
//TODO: throw?
//				console.log("dojo.date.locale.parse: unsupported pattern char=" + token.charAt(0));
		}
		return true;
	});

	var hours = +result[3];
	if(amPm === 'p' && hours < 12){
		result[3] = hours + 12; //e.g., 3pm -> 15
	}else if(amPm === 'a' && hours == 12){
		result[3] = 0; //12am -> 0
	}

	//TODO: implement a getWeekday() method in order to test
	//validity of input strings containing 'EEE' or 'EEEE'...

	var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
	if(options.strict){
		dateObject.setFullYear(result[0]);
	}

	// Check for overflow.  The Date() constructor normalizes things like April 32nd...
	//TODO: why isn't this done for times as well?
	var allTokens = tokens.join(""),
		dateToken = allTokens.indexOf('d') != -1,
		monthToken = allTokens.indexOf('M') != -1;

	if(!valid ||
		(monthToken && dateObject.getMonth() > result[1]) ||
		(dateToken && dateObject.getDate() > result[2])){
		return null;
	}

	// Check for underflow, due to DST shifts.  See #9366
	// This assumes a 1 hour dst shift correction at midnight
	// We could compare the timezone offset after the shift and add the difference instead.
	if((monthToken && dateObject.getMonth() < result[1]) ||
		(dateToken && dateObject.getDate() < result[2])){
		dateObject = date.add(dateObject, "hour", 1);
	}

	return dateObject; // Date
};

function _processPattern(pattern, applyPattern, applyLiteral, applyAll){
	//summary: Process a pattern with literals in it

	// Break up on single quotes, treat every other one as a literal, except '' which becomes '
	var identity = function(x){return x;};
	applyPattern = applyPattern || identity;
	applyLiteral = applyLiteral || identity;
	applyAll = applyAll || identity;

	//split on single quotes (which escape literals in date format strings)
	//but preserve escaped single quotes (e.g., o''clock)
	var chunks = pattern.match(/(''|[^'])+/g),
		literal = pattern.charAt(0) == "'";

	dojo.forEach(chunks, function(chunk, i){
		if(!chunk){
			chunks[i]='';
		}else{
			chunks[i]=(literal ? applyLiteral : applyPattern)(chunk.replace(/''/g, "'"));
			literal = !literal;
		}
	});
	return applyAll(chunks.join(''));
}

function _buildDateTimeRE(tokens, bundle, options, pattern){
	pattern = regexp.escapeString(pattern);
	if(!options.strict){ pattern = pattern.replace(" a", " ?a"); } // kludge to tolerate no space before am/pm
	return pattern.replace(/([a-z])\1*/ig, function(match){
		// Build a simple regexp.  Avoid captures, which would ruin the tokens list
		var s,
			c = match.charAt(0),
			l = match.length,
			p2 = '', p3 = '';
		if(options.strict){
			if(l > 1){ p2 = '0' + '{'+(l-1)+'}'; }
			if(l > 2){ p3 = '0' + '{'+(l-2)+'}'; }
		}else{
			p2 = '0?'; p3 = '0{0,2}';
		}
		switch(c){
			case 'y':
				s = '\\d{2,4}';
				break;
			case 'M':
				s = (l>2) ? '\\S+?' : '1[0-2]|'+p2+'[1-9]';
				break;
			case 'D':
				s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|'+p2+'[1-9][0-9]|'+p3+'[1-9]';
				break;
			case 'd':
				s = '3[01]|[12]\\d|'+p2+'[1-9]';
				break;
			case 'w':
				s = '[1-4][0-9]|5[0-3]|'+p2+'[1-9]';
				break;
			case 'E':
				s = '\\S+';
				break;
			case 'h': //hour (1-12)
				s = '1[0-2]|'+p2+'[1-9]';
				break;
			case 'k': //hour (0-11)
				s = '1[01]|'+p2+'\\d';
				break;
			case 'H': //hour (0-23)
				s = '1\\d|2[0-3]|'+p2+'\\d';
				break;
			case 'K': //hour (1-24)
				s = '1\\d|2[0-4]|'+p2+'[1-9]';
				break;
			case 'm':
			case 's':
				s = '[0-5]\\d';
				break;
			case 'S':
				s = '\\d{'+l+'}';
				break;
			case 'a':
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
					s = am + '|' + pm;
				if(!options.strict){
					if(am != am.toLowerCase()){ s += '|' + am.toLowerCase(); }
					if(pm != pm.toLowerCase()){ s += '|' + pm.toLowerCase(); }
					if(s.indexOf('.') != -1){ s += '|' + s.replace(/\./g, ""); }
				}
				s = s.replace(/\./g, "\\.");
				break;
			default:
			// case 'v':
			// case 'z':
			// case 'Z':
				s = ".*";
//				console.log("parse of date format, pattern=" + pattern);
		}

		if(tokens){ tokens.push(match); }

		return "(" + s + ")"; // add capture
	}).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
}

var _customFormats = [];
dojo.date.locale.addCustomFormats = function(/*String*/packageName, /*String*/bundleName){
	// summary:
	//		Add a reference to a bundle containing localized custom formats to be
	//		used by date/time formatting and parsing routines.
	//
	// description:
	//		The user may add custom localized formats where the bundle has properties following the
	//		same naming convention used by dojo.cldr: `dateFormat-xxxx` / `timeFormat-xxxx`
	//		The pattern string should match the format used by the CLDR.
	//		See dojo.date.locale.format() for details.
	//		The resources must be loaded by dojo.requireLocalization() prior to use

	_customFormats.push({pkg:packageName,name:bundleName});
};

dojo.date.locale._getGregorianBundle = function(/*String*/locale){
	var gregorian = {};
	dojo.forEach(_customFormats, function(desc){
		var bundle = dojo.i18n.getLocalization(desc.pkg, desc.name, locale);
		gregorian = lang.mixin(gregorian, bundle);
	}, this);
	return gregorian; /*Object*/
};

dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");

dojo.date.locale.getNames = function(/*String*/item, /*String*/type, /*String?*/context, /*String?*/locale){
	// summary:
	//		Used to get localized strings from dojo.cldr for day or month names.
	//
	// item:
	//	'months' || 'days'
	// type:
	//	'wide' || 'abbr' || 'narrow' (e.g. "Monday", "Mon", or "M" respectively, in English)
	// context:
	//	'standAlone' || 'format' (default)
	// locale:
	//	override locale used to find the names

	var label,
		lookup = dojo.date.locale._getGregorianBundle(locale),
		props = [item, context, type];
	if(context == 'standAlone'){
		var key = props.join('-');
		label = lookup[key];
		// Fall back to 'format' flavor of name
		if(label[0] == 1){ label = undefined; } // kludge, in the absence of real aliasing support in dojo.cldr
	}
	props[1] = 'format';

	// return by copy so changes won't be made accidentally to the in-memory model
	return (label || lookup[props.join('-')]).concat(); /*Array*/
};

dojo.date.locale.isWeekend = function(/*Date?*/dateObject, /*String?*/locale){
	// summary:
	//	Determines if the date falls on a weekend, according to local custom.

	var weekend = cldr.getWeekend(locale),
		day = (dateObject || new Date()).getDay();
	if(weekend.end < weekend.start){
		weekend.end += 7;
		if(day < weekend.start){ day += 7; }
	}
	return day >= weekend.start && day <= weekend.end; // Boolean
};

// These are used only by format and strftime.  Do they need to be public?  Which module should they go in?

dojo.date.locale._getDayOfYear = function(/*Date*/dateObject){
	// summary: gets the day of the year as represented by dateObject
	return date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject) + 1; // Number
};

dojo.date.locale._getWeekOfYear = function(/*Date*/dateObject, /*Number*/firstDayOfWeek){
	if(arguments.length == 1){ firstDayOfWeek = 0; } // Sunday

	var firstDayOfYear = new Date(dateObject.getFullYear(), 0, 1).getDay(),
		adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
		week = Math.floor((dojo.date.locale._getDayOfYear(dateObject) + adj - 1) / 7);

	// if year starts on the specified day, start counting weeks at 1
	if(firstDayOfYear == firstDayOfWeek){ week++; }

	return week; // Number
};

return dojo.date.locale;
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
'dijit/form/ValidationTextBox':function(){
require({cache:{
'url:dijit/form/templates/ValidationTextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox", [
	"dojo/_base/declare", // declare
	"dojo/i18n", // i18n.getLocalization
	"./TextBox",
	"../Tooltip",
	"dojo/text!./templates/ValidationTextBox.html",
	"dojo/i18n!./nls/validate"
], function(declare, i18n, TextBox, Tooltip, template){

/*=====
	var Tooltip = dijit.Tooltip;
	var TextBox = dijit.form.TextBox;
=====*/

	// module:
	//		dijit/form/ValidationTextBox
	// summary:
	//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.


	/*=====
		dijit.form.ValidationTextBox.__Constraints = function(){
			// locale: String
			//		locale used for validation, picks up value from this widget's lang attribute
			// _flags_: anything
			//		various flags passed to regExpGen function
			this.locale = "";
			this._flags_ = "";
		}
	=====*/

	return declare("dijit.form.ValidationTextBox", TextBox, {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.
		// tags:
		//		protected

		templateString: template,
		baseClass: "dijitTextBox dijitValidationTextBox",

		// required: Boolean
		//		User is required to enter data into this field.
		required: false,

		// promptMessage: String
		//		If defined, display this hint string immediately on focus to the textbox, if empty.
		//		Also displays if the textbox value is Incomplete (not yet valid but will be with additional input).
		//		Think of this like a tooltip that tells the user what to do, not an error message
		//		that tells the user what they've done wrong.
		//
		//		Message disappears when user starts typing.
		promptMessage: "",

		// invalidMessage: String
		// 		The message to display if value is invalid.
		//		The translated string value is read from the message file by default.
		// 		Set to "" to use the promptMessage instead.
		invalidMessage: "$_unset_$",

		// missingMessage: String
		// 		The message to display if value is empty and the field is required.
		//		The translated string value is read from the message file by default.
		// 		Set to "" to use the invalidMessage instead.
		missingMessage: "$_unset_$",

		// message: String
		//		Currently error/prompt message.
		//		When using the default tooltip implementation, this will only be
		//		displayed when the field is focused.
		message: "",

		// constraints: dijit.form.ValidationTextBox.__Constraints
		//		user-defined object needed to pass parameters to the validator functions
		constraints: {},

		// regExp: [extension protected] String
		//		regular expression string used to validate the input
		//		Do not specify both regExp and regExpGen
		regExp: ".*",

		regExpGen: function(/*dijit.form.ValidationTextBox.__Constraints*/ /*===== constraints =====*/){
			// summary:
			//		Overridable function used to generate regExp when dependent on constraints.
			//		Do not specify both regExp and regExpGen.
			// tags:
			//		extension protected
			return this.regExp; // String
		},

		// state: [readonly] String
		//		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
		state: "",

		// tooltipPosition: String[]
		//		See description of `dijit.Tooltip.defaultPosition` for details on this parameter.
		tooltipPosition: [],

		_setValueAttr: function(){
			// summary:
			//		Hook so set('value', ...) works.
			this.inherited(arguments);
			this.validate(this.focused);
		},

		validator: function(/*anything*/ value, /*dijit.form.ValidationTextBox.__Constraints*/ constraints){
			// summary:
			//		Overridable function used to validate the text input against the regular expression.
			// tags:
			//		protected
			return (new RegExp("^(?:" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value) &&
				(!this.required || !this._isEmpty(value)) &&
				(this._isEmpty(value) || this.parse(value, constraints) !== undefined); // Boolean
		},

		_isValidSubset: function(){
			// summary:
			//		Returns true if the value is either already valid or could be made valid by appending characters.
			//		This is used for validation while the user [may be] still typing.
			return this.textbox.value.search(this._partialre) == 0;
		},

		isValid: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Tests if value is valid.
			//		Can override with your own routine in a subclass.
			// tags:
			//		protected
			return this.validator(this.textbox.value, this.constraints);
		},

		_isEmpty: function(value){
			// summary:
			//		Checks for whitespace
			return (this.trim ? /^\s*$/ : /^$/).test(value); // Boolean
		},

		getErrorMessage: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Return an error message to show if appropriate
			// tags:
			//		protected
			return (this.required && this._isEmpty(this.textbox.value)) ? this.missingMessage : this.invalidMessage; // String
		},

		getPromptMessage: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Return a hint message to show when widget is first focused
			// tags:
			//		protected
			return this.promptMessage; // String
		},

		_maskValidSubsetError: true,
		validate: function(/*Boolean*/ isFocused){
			// summary:
			//		Called by oninit, onblur, and onkeypress.
			// description:
			//		Show missing or invalid messages if appropriate, and highlight textbox field.
			// tags:
			//		protected
			var message = "";
			var isValid = this.disabled || this.isValid(isFocused);
			if(isValid){ this._maskValidSubsetError = true; }
			var isEmpty = this._isEmpty(this.textbox.value);
			var isValidSubset = !isValid && isFocused && this._isValidSubset();
			this._set("state", isValid ? "" : (((((!this._hasBeenBlurred || isFocused) && isEmpty) || isValidSubset) && this._maskValidSubsetError) ? "Incomplete" : "Error"));
			this.focusNode.setAttribute("aria-invalid", isValid ? "false" : "true");

			if(this.state == "Error"){
				this._maskValidSubsetError = isFocused && isValidSubset; // we want the error to show up after a blur and refocus
				message = this.getErrorMessage(isFocused);
			}else if(this.state == "Incomplete"){
				message = this.getPromptMessage(isFocused); // show the prompt whenever the value is not yet complete
				this._maskValidSubsetError = !this._hasBeenBlurred || isFocused; // no Incomplete warnings while focused
			}else if(isEmpty){
				message = this.getPromptMessage(isFocused); // show the prompt whenever there's no error and no text
			}
			this.set("message", message);

			return isValid;
		},

		displayMessage: function(/*String*/ message){
			// summary:
			//		Overridable method to display validation errors/hints.
			//		By default uses a tooltip.
			// tags:
			//		extension
			if(message && this.focused){
				Tooltip.show(message, this.domNode, this.tooltipPosition, !this.isLeftToRight());
			}else{
				Tooltip.hide(this.domNode);
			}
		},

		_refreshState: function(){
			// Overrides TextBox._refreshState()
			this.validate(this.focused);
			this.inherited(arguments);
		},

		//////////// INITIALIZATION METHODS ///////////////////////////////////////

		constructor: function(){
			this.constraints = {};
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			if(!constraints.locale && this.lang){
				constraints.locale = this.lang;
			}
			this._set("constraints", constraints);
			this._computePartialRE();
		},

		_computePartialRE: function(){
			var p = this.regExpGen(this.constraints);
			this.regExp = p;
			var partialre = "";
			// parse the regexp and produce a new regexp that matches valid subsets
			// if the regexp is .* then there's no use in matching subsets since everything is valid
			if(p != ".*"){ this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,
				function(re){
					switch(re.charAt(0)){
						case '{':
						case '+':
						case '?':
						case '*':
						case '^':
						case '$':
						case '|':
						case '(':
							partialre += re;
							break;
						case ")":
							partialre += "|$)";
							break;
						 default:
							partialre += "(?:"+re+"|$)";
							break;
					}
				}
			);}
			try{ // this is needed for now since the above regexp parsing needs more test verification
				"".search(partialre);
			}catch(e){ // should never be here unless the original RE is bad or the parsing is bad
				partialre = this.regExp;
				console.warn('RegExp error in ' + this.declaredClass + ': ' + this.regExp);
			} // should never be here unless the original RE is bad or the parsing is bad
			this._partialre = "^(?:" + partialre + ")$";
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
			if(this.invalidMessage == "$_unset_$"){ this.invalidMessage = this.messages.invalidMessage; }
			if(!this.invalidMessage){ this.invalidMessage = this.promptMessage; }
			if(this.missingMessage == "$_unset_$"){ this.missingMessage = this.messages.missingMessage; }
			if(!this.missingMessage){ this.missingMessage = this.invalidMessage; }
			this._setConstraintsAttr(this.constraints); // this needs to happen now (and later) due to codependency on _set*Attr calls attachPoints
		},

		_setDisabledAttr: function(/*Boolean*/ value){
			this.inherited(arguments);	// call FormValueWidget._setDisabledAttr()
			this._refreshState();
		},

		_setRequiredAttr: function(/*Boolean*/ value){
			this._set("required", value);
			this.focusNode.setAttribute("aria-required", value);
			this._refreshState();
		},

		_setMessageAttr: function(/*String*/ message){
			this._set("message", message);
			this.displayMessage(message);
		},

		reset:function(){
			// Overrides dijit.form.TextBox.reset() by also
			// hiding errors about partial matches
			this._maskValidSubsetError = true;
			this.inherited(arguments);
		},

		_onBlur: function(){
			// the message still exists but for back-compat, and to erase the tooltip
			// (if the message is being displayed as a tooltip), call displayMessage('')
			this.displayMessage('');

			this.inherited(arguments);
		}
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
'url:dijit/form/templates/ValidationTextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
'dojox/main':function(){
define("dojox/main", ["dojo/_base/kernel"], function(dojo) {
	// module:
	//		dojox/main
	// summary:
	//		The dojox package main module; dojox package is somewhat unusual in that the main module currently just provides an empty object.

	return dojo.dojox;
});
},
'dijit/form/_DateTimeTextBox':function(){
require({cache:{
'url:dijit/form/templates/DropDownBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/_DateTimeTextBox", [
	"dojo/date", // date date.compare
	"dojo/date/locale", // locale.regexp
	"dojo/date/stamp", // stamp.fromISOString stamp.toISOString
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.getObject
	"./RangeBoundTextBox",
	"../_HasDropDown",
	"dojo/text!./templates/DropDownBox.html"
], function(date, locale, stamp, declare, lang, RangeBoundTextBox, _HasDropDown, template){

/*=====
	var _HasDropDown = dijit._HasDropDown;
	var RangeBoundTextBox = dijit.form.RangeBoundTextBox;
=====*/

	// module:
	//		dijit/form/_DateTimeTextBox
	// summary:
	//		Base class for validating, serializable, range-bound date or time text box.


	new Date("X"); // workaround for #11279, new Date("") == NaN

	/*=====
	declare(
		"dijit.form._DateTimeTextBox.__Constraints",
		[RangeBoundTextBox.__Constraints, locale.__FormatOptions], {
		// summary:
		//		Specifies both the rules on valid/invalid values (first/last date/time allowed),
		//		and also formatting options for how the date/time is displayed.
		// example:
		//		To restrict to dates within 2004, displayed in a long format like "December 25, 2005":
		//	|		{min:'2004-01-01',max:'2004-12-31', formatLength:'long'}
	});
	=====*/

	var _DateTimeTextBox = declare("dijit.form._DateTimeTextBox", [RangeBoundTextBox, _HasDropDown], {
		// summary:
		//		Base class for validating, serializable, range-bound date or time text box.

		templateString: template,

		// hasDownArrow: [const] Boolean
		//		Set this textbox to display a down arrow button, to open the drop down list.
		hasDownArrow: true,

		// openOnClick: [const] Boolean
		//		Set to true to open drop down upon clicking anywhere on the textbox.
		openOnClick: true,

		/*=====
		// constraints: dijit.form._DateTimeTextBox.__Constraints
		//		Despite the name, this parameter specifies both constraints on the input
		//		(including starting/ending dates/times allowed) as well as
		//		formatting options like whether the date is displayed in long (ex: December 25, 2005)
		//		or short (ex: 12/25/2005) format.  See `dijit.form._DateTimeTextBox.__Constraints` for details.
		constraints: {},
		======*/

		// Override ValidationTextBox.regExpGen().... we use a reg-ex generating function rather
		// than a straight regexp to deal with locale  (plus formatting options too?)
		regExpGen: locale.regexp,

		// datePackage: String
		//		JavaScript namespace to find calendar routines.	 Uses Gregorian calendar routines
		//		at dojo.date, by default.
		datePackage: date,

		postMixInProperties: function(){
			this.inherited(arguments);
			this._set("type", "text"); // in case type="date"|"time" was specified which messes up parse/format
		},

		// Override _FormWidget.compare() to work for dates/times
		compare: function(/*Date*/ val1, /*Date*/ val2){
			var isInvalid1 = this._isInvalidDate(val1);
			var isInvalid2 = this._isInvalidDate(val2);
			return isInvalid1 ? (isInvalid2 ? 0 : -1) : (isInvalid2 ? 1 : date.compare(val1, val2, this._selector));
		},

		// flag to _HasDropDown to make drop down Calendar width == <input> width
		forceWidth: true,

		format: function(/*Date*/ value, /*dojo.date.locale.__FormatOptions*/ constraints){
			// summary:
			//		Formats the value as a Date, according to specified locale (second argument)
			// tags:
			//		protected
			if(!value){ return ''; }
			return this.dateLocaleModule.format(value, constraints);
		},

		"parse": function(/*String*/ value, /*dojo.date.locale.__FormatOptions*/ constraints){
			// summary:
			//		Parses as string as a Date, according to constraints
			// tags:
			//		protected

			return this.dateLocaleModule.parse(value, constraints) || (this._isEmpty(value) ? null : undefined);	 // Date
		},

		// Overrides ValidationTextBox.serialize() to serialize a date in canonical ISO format.
		serialize: function(/*anything*/ val, /*Object?*/ options){
			if(val.toGregorian){
				val = val.toGregorian();
			}
			return stamp.toISOString(val, options);
		},

		// dropDownDefaultValue: Date
		//		The default value to focus in the popupClass widget when the textbox value is empty.
		dropDownDefaultValue : new Date(),

		// value: Date
		//		The value of this widget as a JavaScript Date object.  Use get("value") / set("value", val) to manipulate.
		//		When passed to the parser in markup, must be specified according to `dojo.date.stamp.fromISOString`
		value: new Date(""),	// value.toString()="NaN"

		_blankValue: null,	// used by filter() when the textbox is blank

		// popupClass: [protected extension] String
		//		Name of the popup widget class used to select a date/time.
		//		Subclasses should specify this.
		popupClass: "", // default is no popup = text only


		// _selector: [protected extension] String
		//		Specifies constraints.selector passed to dojo.date functions, should be either
		//		"date" or "time".
		//		Subclass must specify this.
		_selector: "",

		constructor: function(/*Object*/ args){
			this.datePackage = args.datePackage || this.datePackage;
			this.dateFuncObj = typeof this.datePackage == "string" ?
				lang.getObject(this.datePackage, false) :// "string" part for back-compat, remove for 2.0
				this.datePackage;
			this.dateClassObj = this.dateFuncObj.Date || Date;
			this.dateLocaleModule = lang.getObject("locale", false, this.dateFuncObj);
			this.regExpGen = this.dateLocaleModule.regexp;
			this._invalidDate = this.constructor.prototype.value.toString();
		},

		buildRendering: function(){
			this.inherited(arguments);

			if(!this.hasDownArrow){
				this._buttonNode.style.display = "none";
			}

			// If openOnClick is true, we basically just want to treat the whole widget as the
			// button.  We need to do that also if the actual drop down button will be hidden,
			// so that there's a mouse method for opening the drop down.
			if(this.openOnClick || !this.hasDownArrow){
				this._buttonNode = this.domNode;
				this.baseClass += " dijitComboBoxOpenOnClick";
			}
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			constraints.selector = this._selector;
			constraints.fullYear = true; // see #5465 - always format with 4-digit years
			var fromISO = stamp.fromISOString;
			if(typeof constraints.min == "string"){ constraints.min = fromISO(constraints.min); }
 			if(typeof constraints.max == "string"){ constraints.max = fromISO(constraints.max); }
			this.inherited(arguments);
		},

		_isInvalidDate: function(/*Date*/ value){
			// summary:
			//		Runs various tests on the value, checking for invalid conditions
			// tags:
			//		private
			return !value || isNaN(value) || typeof value != "object" || value.toString() == this._invalidDate;
		},

		_setValueAttr: function(/*Date|String*/ value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			// summary:
			//		Sets the date on this textbox. Note: value can be a JavaScript Date literal or a string to be parsed.
			if(value !== undefined){
				if(typeof value == "string"){
					value = stamp.fromISOString(value);
				}
				if(this._isInvalidDate(value)){
					value = null;
				}
				if(value instanceof Date && !(this.dateClassObj instanceof Date)){
					value = new this.dateClassObj(value);
				}
			}
			this.inherited(arguments);
			if(this.dropDown){
				this.dropDown.set('value', value, false);
			}
		},

		_set: function(attr, value){
			// Avoid spurious watch() notifications when value is changed to new Date object w/the same value
			if(attr == "value" && this.value instanceof Date && this.compare(value, this.value) == 0){
				return;
			}
			this.inherited(arguments);
		},

		_setDropDownDefaultValueAttr: function(/*Date*/ val){
			if(this._isInvalidDate(val)){
				// convert null setting into today's date, since there needs to be *some* default at all times.
				 val = new this.dateClassObj()
						}
			this.dropDownDefaultValue = val;
		},

		openDropDown: function(/*Function*/ callback){
			// rebuild drop down every time, so that constraints get copied (#6002)
			if(this.dropDown){
				this.dropDown.destroy();
			}
			var PopupProto = lang.isString(this.popupClass) ? lang.getObject(this.popupClass, false) : this.popupClass,
				textBox = this,
				value = this.get("value");
			this.dropDown = new PopupProto({
				onChange: function(value){
					// this will cause InlineEditBox and other handlers to do stuff so make sure it's last
					_DateTimeTextBox.superclass._setValueAttr.call(textBox, value, true);
				},
				id: this.id + "_popup",
				dir: textBox.dir,
				lang: textBox.lang,
				value: value,
				currentFocus: !this._isInvalidDate(value) ? value : this.dropDownDefaultValue,
					constraints: textBox.constraints,
				filterString: textBox.filterString, // for TimeTextBox, to filter times shown

					datePackage: textBox.datePackage,

					isDisabledDate: function(/*Date*/ date){
						// summary:
						// 	disables dates outside of the min/max of the _DateTimeTextBox
						return !textBox.rangeCheck(date, textBox.constraints);
					}
				});

			this.inherited(arguments);
		},

		_getDisplayedValueAttr: function(){
			return this.textbox.value;
		},

		_setDisplayedValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange){
			this._setValueAttr(this.parse(value, this.constraints), priorityChange, value);
		}
	});

	return _DateTimeTextBox;
});

},
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
'dijit/_TimePicker':function(){
require({cache:{
'url:dijit/templates/TimePicker.html':"<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div data-dojo-attach-point=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\n    ><div data-dojo-attach-point=\"timeMenu,focusNode\" data-dojo-attach-event=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div data-dojo-attach-point=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\n></div>\n"}});
define("dijit/_TimePicker", [
	"dojo/_base/array", // array.forEach
	"dojo/date", // date.compare
	"dojo/date/locale", // locale.format
	"dojo/date/stamp", // stamp.fromISOString stamp.toISOString
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.add domClass.contains domClass.toggle
	"dojo/dom-construct", // domConstruct.create
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // deprecated
	"dojo/keys", // keys
	"dojo/_base/lang", // lang.mixin
	"dojo/_base/sniff", // has("ie")
	"dojo/query", // query
	"dijit/typematic",
	"./_Widget",
	"./_TemplatedMixin",
	"./form/_FormValueWidget",
	"dojo/text!./templates/TimePicker.html"
], function(array, ddate, locale, stamp, declare, domClass, domConstruct, event, kernel, keys, lang, has, query,
			typematic, _Widget, _TemplatedMixin, _FormValueWidget, template){

/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _FormValueWidget = dijit.form._FormValueWidget;
=====*/

	// module:
	//		dijit/_TimePicker
	// summary:
	//		A graphical time picker.


	/*=====
	declare(
		"dijit._TimePicker.__Constraints",
		locale.__FormatOptions,
		{
			// clickableIncrement: String
			//		See `dijit._TimePicker.clickableIncrement`
			clickableIncrement: "T00:15:00",

			// visibleIncrement: String
			//		See `dijit._TimePicker.visibleIncrement`
			visibleIncrement: "T01:00:00",

			// visibleRange: String
			//		See `dijit._TimePicker.visibleRange`
			visibleRange: "T05:00:00"
		}
	);
	=====*/

	return declare("dijit._TimePicker", [_Widget, _TemplatedMixin], {
		// summary:
		//		A graphical time picker.
		//		This widget is used internally by other widgets and is not available
		//		as a standalone widget due to lack of accessibility support.

		templateString: template,

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: "dijitTimePicker",

		// clickableIncrement: String
		//		ISO-8601 string representing the amount by which
		//		every clickable element in the time picker increases.
		//		Set in local time, without a time zone.
		//		Example: `T00:15:00` creates 15 minute increments
		//		Must divide dijit._TimePicker.visibleIncrement evenly
		clickableIncrement: "T00:15:00",

		// visibleIncrement: String
		//		ISO-8601 string representing the amount by which
		//		every element with a visible time in the time picker increases.
		//		Set in local time, without a time zone.
		//		Example: `T01:00:00` creates text in every 1 hour increment
		visibleIncrement: "T01:00:00",

		// visibleRange: String
		//		ISO-8601 string representing the range of this TimePicker.
		//		The TimePicker will only display times in this range.
		//		Example: `T05:00:00` displays 5 hours of options
		visibleRange: "T05:00:00",

		// value: String
		//		Date to display.
		//		Defaults to current time and date.
		//		Can be a Date object or an ISO-8601 string.
		//		If you specify the GMT time zone (`-01:00`),
		//		the time will be converted to the local time in the local time zone.
		//		Otherwise, the time is considered to be in the local time zone.
		//		If you specify the date and isDate is true, the date is used.
		//		Example: if your local time zone is `GMT -05:00`,
		//		`T10:00:00` becomes `T10:00:00-05:00` (considered to be local time),
		//		`T10:00:00-01:00` becomes `T06:00:00-05:00` (4 hour difference),
		//		`T10:00:00Z` becomes `T05:00:00-05:00` (5 hour difference between Zulu and local time)
		//		`yyyy-mm-ddThh:mm:ss` is the format to set the date and time
		//		Example: `2007-06-01T09:00:00`
		value: new Date(),

		_visibleIncrement:2,
		_clickableIncrement:1,
		_totalIncrements:10,

		// constraints: dijit._TimePicker.__Constraints
		//		Specifies valid range of times (start time, end time)
		constraints:{},

/*=====
		serialize: function(val, options){
			// summary:
			//		User overridable function used to convert the attr('value') result to a String
			// val: Date
			//		The current value
			// options: Object?
			// tags:
			//		protected
		},
=====*/
		serialize: stamp.toISOString,

/*=====
		// filterString: string
		//		The string to filter by
		filterString: "",
=====*/

		setValue: function(/*Date*/ value){
			// summary:
			//		Deprecated.  Used set('value') instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
			this.set('value', value);
		},

		_setValueAttr: function(/*Date*/ date){
			// summary:
			//		Hook so set('value', ...) works.
			// description:
			//		Set the value of the TimePicker.
			//		Redraws the TimePicker around the new date.
			// tags:
			//		protected
			this._set("value", date);
			this._showText();
		},

		_setFilterStringAttr: function(val){
			// summary:
			//		Called by TimeTextBox to filter the values shown in my list
			this._set("filterString", val);
			this._showText();
		},

		isDisabledDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to disable certain dates in the TimePicker e.g. `isDisabledDate=locale.isWeekend`
			// dateObject: Date
			// locale: String?
			// type:
			//		extension
			return false; // Boolean
		},

		_getFilteredNodes: function(/*number*/ start, /*number*/ maxNum, /*Boolean*/ before, /*DOMnode*/ lastNode){
			// summary:
			//		Returns an array of nodes with the filter applied.  At most maxNum nodes
			//		will be returned - but fewer may be returned as well.  If the
			//		before parameter is set to true, then it will return the elements
			//		before the given index
			// tags:
			//		private
			var
				nodes = [],
				lastValue = lastNode ? lastNode.date : this._refDate,
				n,
				i = start,
				max = this._maxIncrement + Math.abs(i),
				chk = before ? -1 : 1,
				dec = before ? 1 : 0,
				inc = 1 - dec;
			do{
				i -= dec;
				n = this._createOption(i);
				if(n){
					if((before && n.date > lastValue) || (!before && n.date < lastValue)){
						break; // don't wrap
					}
					nodes[before ? "unshift" : "push"](n);
					lastValue = n.date;
				}
				i += inc;
			}while(nodes.length < maxNum && (i*chk) < max);
			return nodes;
		},

		_showText: function(){
			// summary:
			//		Displays the relevant choices in the drop down list
			// tags:
			//		private
			var fromIso = stamp.fromISOString;
			this.timeMenu.innerHTML = "";
			this._clickableIncrementDate=fromIso(this.clickableIncrement);
			this._visibleIncrementDate=fromIso(this.visibleIncrement);
			this._visibleRangeDate=fromIso(this.visibleRange);
			// get the value of the increments and the range in seconds (since 00:00:00) to find out how many divs to create
			var
				sinceMidnight = function(/*Date*/ date){
					return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
				},
				clickableIncrementSeconds = sinceMidnight(this._clickableIncrementDate),
				visibleIncrementSeconds = sinceMidnight(this._visibleIncrementDate),
				visibleRangeSeconds = sinceMidnight(this._visibleRangeDate),
				// round reference date to previous visible increment
				time = (this.value || this.currentFocus).getTime();

			this._refDate = new Date(time - time % (clickableIncrementSeconds*1000));
			this._refDate.setFullYear(1970,0,1); // match parse defaults

			// assume clickable increment is the smallest unit
			this._clickableIncrement = 1;
			// divide the visible range by the clickable increment to get the number of divs to create
			// example: 10:00:00/00:15:00 -> display 40 divs
			this._totalIncrements = visibleRangeSeconds / clickableIncrementSeconds;
			// divide the visible increments by the clickable increments to get how often to display the time inline
			// example: 01:00:00/00:15:00 -> display the time every 4 divs
			this._visibleIncrement = visibleIncrementSeconds / clickableIncrementSeconds;
			// divide the number of seconds in a day by the clickable increment in seconds to get the
			// absolute max number of increments.
			this._maxIncrement = (60 * 60 * 24) / clickableIncrementSeconds;

			var
				// Find the nodes we should display based on our filter.
				// Limit to 10 nodes displayed as a half-hearted attempt to stop drop down from overlapping <input>.
				count = Math.min(this._totalIncrements, 10),
				after = this._getFilteredNodes(0, (count >> 1) + 1, false),
				moreAfter = [],
				estBeforeLength = count - after.length,
				before = this._getFilteredNodes(0, estBeforeLength, true, after[0]);
				if(before.length < estBeforeLength){
					moreAfter = this._getFilteredNodes(after.length, estBeforeLength - before.length, false);
				}
			array.forEach(before.concat(after, moreAfter), function(n){ this.timeMenu.appendChild(n); }, this);
		},

		constructor: function(){
			this.constraints = {}; // create instance object
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			this._setConstraintsAttr(this.constraints); // this needs to happen now (and later) due to codependency on _set*Attr calls
		},

		_setConstraintsAttr: function(/* Object */ constraints){
			// brings in visibleRange, increments, etc.
			lang.mixin(this, constraints);

			// locale needs the lang in the constraints as locale
			if(!constraints.locale){
				constraints.locale = this.lang;
			}
		},

		postCreate: function(){
			// assign typematic mouse listeners to the arrow buttons
			this.connect(this.timeMenu, has("ie") ? "onmousewheel" : 'DOMMouseScroll', "_mouseWheeled");
			this._connects.push(typematic.addMouseListener(this.upArrow, this, "_onArrowUp", 33, 250));
			this._connects.push(typematic.addMouseListener(this.downArrow, this, "_onArrowDown", 33, 250));

			this.inherited(arguments);
		},

		_buttonMouse: function(/*Event*/ e){
			// summary:
			//		Handler for hover (and unhover) on up/down arrows
			// tags:
			//		private

			// in non-IE browser the "mouseenter" event will become "mouseover",
			// but in IE it's still "mouseenter"
			domClass.toggle(e.currentTarget, e.currentTarget == this.upArrow ? "dijitUpArrowHover" : "dijitDownArrowHover",
				e.type == "mouseenter" || e.type == "mouseover");
		},

		_createOption: function(/*Number*/ index){
			// summary:
			//		Creates a clickable time option
			// tags:
			//		private
			var date = new Date(this._refDate);
			var incrementDate = this._clickableIncrementDate;
			date.setHours(date.getHours() + incrementDate.getHours() * index,
				date.getMinutes() + incrementDate.getMinutes() * index,
				date.getSeconds() + incrementDate.getSeconds() * index);
			if(this.constraints.selector == "time"){
				date.setFullYear(1970,0,1); // make sure each time is for the same date
			}
			var dateString = locale.format(date, this.constraints);
			if(this.filterString && dateString.toLowerCase().indexOf(this.filterString) !== 0){
				// Doesn't match the filter - return null
				return null;
			}

			var div = domConstruct.create("div", {"class": this.baseClass+"Item"});
			div.date = date;
			div.index = index;
			domConstruct.create('div',{
				"class": this.baseClass + "ItemInner",
				innerHTML: dateString
			}, div);

			if(index%this._visibleIncrement<1 && index%this._visibleIncrement>-1){
				domClass.add(div, this.baseClass+"Marker");
			}else if(!(index%this._clickableIncrement)){
				domClass.add(div, this.baseClass+"Tick");
			}

			if(this.isDisabledDate(date)){
				// set disabled
				domClass.add(div, this.baseClass+"ItemDisabled");
			}
			if(this.value && !ddate.compare(this.value, date, this.constraints.selector)){
				div.selected = true;
				domClass.add(div, this.baseClass+"ItemSelected");
				if(domClass.contains(div, this.baseClass+"Marker")){
					domClass.add(div, this.baseClass+"MarkerSelected");
				}else{
					domClass.add(div, this.baseClass+"TickSelected");
				}

				// Initially highlight the current value.   User can change highlight by up/down arrow keys
				// or mouse movement.
				this._highlightOption(div, true);
			}
			return div;
		},

		_onOptionSelected: function(/*Object*/ tgt){
			// summary:
			//		Called when user clicks an option in the drop down list
			// tags:
			//		private
			var tdate = tgt.target.date || tgt.target.parentNode.date;
			if(!tdate || this.isDisabledDate(tdate)){ return; }
			this._highlighted_option = null;
			this.set('value', tdate);
			this.onChange(tdate);
		},

		onChange: function(/*Date*/ /*===== time =====*/){
			// summary:
			//		Notification that a time was selected.  It may be the same as the previous value.
			// tags:
			//      public
		},

		_highlightOption: function(/*node*/ node, /*Boolean*/ highlight){
			// summary:
			//		Turns on/off highlight effect on a node based on mouse out/over event
			// tags:
			//		private
			if(!node){return;}
			if(highlight){
				if(this._highlighted_option){
					this._highlightOption(this._highlighted_option, false);
				}
				this._highlighted_option = node;
			}else if(this._highlighted_option !== node){
				return;
			}else{
				this._highlighted_option = null;
			}
			domClass.toggle(node, this.baseClass+"ItemHover", highlight);
			if(domClass.contains(node, this.baseClass+"Marker")){
				domClass.toggle(node, this.baseClass+"MarkerHover", highlight);
			}else{
				domClass.toggle(node, this.baseClass+"TickHover", highlight);
			}
		},

		onmouseover: function(/*Event*/ e){
			// summary:
			//		Handler for onmouseover event
			// tags:
			//		private
			this._keyboardSelected = null;
			var tgr = (e.target.parentNode === this.timeMenu) ? e.target : e.target.parentNode;
			// if we aren't targeting an item, then we return
			if(!domClass.contains(tgr, this.baseClass+"Item")){return;}
			this._highlightOption(tgr, true);
		},

		onmouseout: function(/*Event*/ e){
			// summary:
			//		Handler for onmouseout event
			// tags:
			//		private
			this._keyboardSelected = null;
			var tgr = (e.target.parentNode === this.timeMenu) ? e.target : e.target.parentNode;
			this._highlightOption(tgr, false);
		},

		_mouseWheeled: function(/*Event*/ e){
			// summary:
			//		Handle the mouse wheel events
			// tags:
			//		private
			this._keyboardSelected = null;
			event.stop(e);
			// we're not _measuring_ the scroll amount, just direction
			var scrollAmount = (has("ie") ? e.wheelDelta : -e.detail);
			this[(scrollAmount>0 ? "_onArrowUp" : "_onArrowDown")](); // yes, we're making a new dom node every time you mousewheel, or click
		},

		_onArrowUp: function(count){
			// summary:
			//		Handler for up arrow key.
			// description:
			//		Removes the bottom time and add one to the top
			// tags:
			//		private
			if(typeof count == "number" && count == -1){ return; } // typematic end
			if(!this.timeMenu.childNodes.length){ return; }
			var index = this.timeMenu.childNodes[0].index;
			var divs = this._getFilteredNodes(index, 1, true, this.timeMenu.childNodes[0]);
			if(divs.length){
				this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length - 1]);
				this.timeMenu.insertBefore(divs[0], this.timeMenu.childNodes[0]);
			}
		},

		_onArrowDown: function(count){
			// summary:
			//		Handler for up arrow key.
			// description:
			//		Remove the top time and add one to the bottom
			// tags:
			//		private
			if(typeof count == "number" && count == -1){ return; } // typematic end
			if(!this.timeMenu.childNodes.length){ return; }
			var index = this.timeMenu.childNodes[this.timeMenu.childNodes.length - 1].index + 1;
			var divs = this._getFilteredNodes(index, 1, false, this.timeMenu.childNodes[this.timeMenu.childNodes.length - 1]);
			if(divs.length){
				this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
				this.timeMenu.appendChild(divs[0]);
			}
		},

		handleKey: function(/*Event*/ e){
			// summary:
			//		Called from `dijit.form._DateTimeTextBox` to pass a keypress event
			//		from the `dijit.form.TimeTextBox` to be handled in this widget
			// tags:
			//		protected
			if(e.charOrCode == keys.DOWN_ARROW || e.charOrCode == keys.UP_ARROW){
				event.stop(e);
				// Figure out which option to highlight now and then highlight it
				if(this._highlighted_option && !this._highlighted_option.parentNode){
					this._highlighted_option = null;
				}
				var timeMenu = this.timeMenu,
					tgt = this._highlighted_option || query("." + this.baseClass + "ItemSelected", timeMenu)[0];
				if(!tgt){
					tgt = timeMenu.childNodes[0];
				}else if(timeMenu.childNodes.length){
					if(e.charOrCode == keys.DOWN_ARROW && !tgt.nextSibling){
						this._onArrowDown();
					}else if(e.charOrCode == keys.UP_ARROW && !tgt.previousSibling){
						this._onArrowUp();
					}
					if(e.charOrCode == keys.DOWN_ARROW){
						tgt = tgt.nextSibling;
					}else{
						tgt = tgt.previousSibling;
					}
				}
				this._highlightOption(tgt, true);
				this._keyboardSelected = tgt;
				return false;
			}else if(e.charOrCode == keys.ENTER || e.charOrCode === keys.TAB){
				// mouse hover followed by TAB is NO selection
				if(!this._keyboardSelected && e.charOrCode === keys.TAB){
					return true;	// true means don't call stopEvent()
				}

				// Accept the currently-highlighted option as the value
				if(this._highlighted_option){
					this._onOptionSelected({target: this._highlighted_option});
				}

				// Call stopEvent() for ENTER key so that form doesn't submit,
				// but not for TAB, so that TAB does switch focus
				return e.charOrCode === keys.TAB;
			}
			return undefined;
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
'url:dijit/templates/TimePicker.html':"<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div data-dojo-attach-point=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\n    ><div data-dojo-attach-point=\"timeMenu,focusNode\" data-dojo-attach-event=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div data-dojo-attach-point=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\n></div>\n",
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
'ibm/tivoli/mbs/dijit/form/DateTimeTextBox':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/require!ibm/tivoli/mbs/dijit/DateTimeCalendar,dijit/form/_DateTimeTextBox"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.mbs.dijit.form.DateTimeTextBox");

dojo.require("ibm.tivoli.mbs.dijit.DateTimeCalendar");
dojo.require("dijit.form._DateTimeTextBox");

dojo.declare(
	"ibm.tivoli.mbs.dijit.form.DateTimeTextBox",
	dijit.form._DateTimeTextBox,
	{
		// summary:
		//		A validating, serializable, range-bound date text box with a drop down calendar
		//
		//		Example:
		// |	new mxe.form.DateTimeTextBox({value: new Date(2009, 0, 20)})
		//
		//		Example:
		// |	<input dojotype='mxe.form.DateTimeTextBox' value='2009-01-20 12:10:00 AM'>

		baseClass: "dijitTextBox dijitDateTextBox",
		popupClass: "ibm.tivoli.mbs.dijit.DateTimeCalendar",
		_selector: "",

		// value: Date
		//		The value of this widget as a JavaScript Date object, with only year/month/day specified.
		//		If specified in markup, use the format specified in `dojo.date.stamp.fromISOString`
		value: new Date("")	// value.toString()="NaN"
	}
);

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
'url:dijit/form/templates/Button.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n",
'url:dijit/templates/Tooltip.html':"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n",
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
'dojo/regexp':function(){
define("dojo/regexp", ["./_base/kernel", "./_base/lang"], function(dojo, lang) {
	// module:
	//		dojo/regexp
	// summary:
	//		TODOC

lang.getObject("regexp", true, dojo);

/*=====
dojo.regexp = {
	// summary: Regular expressions and Builder resources
};
=====*/

dojo.regexp.escapeString = function(/*String*/str, /*String?*/except){
	//	summary:
	//		Adds escape sequences for special characters in regular expressions
	// except:
	//		a String with special characters to be left unescaped

	return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch){
		if(except && except.indexOf(ch) != -1){
			return ch;
		}
		return "\\" + ch;
	}); // String
};

dojo.regexp.buildGroupRE = function(/*Object|Array*/arr, /*Function*/re, /*Boolean?*/nonCapture){
	//	summary:
	//		Builds a regular expression that groups subexpressions
	//	description:
	//		A utility function used by some of the RE generators. The
	//		subexpressions are constructed by the function, re, in the second
	//		parameter.  re builds one subexpression for each elem in the array
	//		a, in the first parameter. Returns a string for a regular
	//		expression that groups all the subexpressions.
	// arr:
	//		A single value or an array of values.
	// re:
	//		A function. Takes one parameter and converts it to a regular
	//		expression.
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression. Defaults to false

	// case 1: a is a single value.
	if(!(arr instanceof Array)){
		return re(arr); // String
	}

	// case 2: a is an array
	var b = [];
	for(var i = 0; i < arr.length; i++){
		// convert each elem to a RE
		b.push(re(arr[i]));
	}

	 // join the REs as alternatives in a RE group.
	return dojo.regexp.group(b.join("|"), nonCapture); // String
};

dojo.regexp.group = function(/*String*/expression, /*Boolean?*/nonCapture){
	// summary:
	//		adds group match to expression
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression.
	return "(" + (nonCapture ? "?:":"") + expression + ")"; // String
};

return dojo.regexp;
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
'dojo/date':function(){
define("dojo/date", ["./_base/kernel", "./_base/lang"], function(dojo, lang) {
	// module:
	//		dojo/date
	// summary:
	//		TODOC

lang.getObject("date", true, dojo);

/*=====
dojo.date = {
	// summary: Date manipulation utilities
}
=====*/

dojo.date.getDaysInMonth = function(/*Date*/dateObject){
	//	summary:
	//		Returns the number of days in the month used by dateObject
	var month = dateObject.getMonth();
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(month == 1 && dojo.date.isLeapYear(dateObject)){ return 29; } // Number
	return days[month]; // Number
};

dojo.date.isLeapYear = function(/*Date*/dateObject){
	//	summary:
	//		Determines if the year of the dateObject is a leap year
	//	description:
	//		Leap years are years with an additional day YYYY-02-29, where the
	//		year number is a multiple of four with the following exception: If
	//		a year is a multiple of 100, then it is only a leap year if it is
	//		also a multiple of 400. For example, 1900 was not a leap year, but
	//		2000 is one.

	var year = dateObject.getFullYear();
	return !(year%400) || (!(year%4) && !!(year%100)); // Boolean
};

// FIXME: This is not localized
dojo.date.getTimezoneName = function(/*Date*/dateObject){
	//	summary:
	//		Get the user's time zone as provided by the browser
	// dateObject:
	//		Needed because the timezone may vary with time (daylight savings)
	//	description:
	//		Try to get time zone info from toString or toLocaleString method of
	//		the Date object -- UTC offset is not a time zone.  See
	//		http://www.twinsun.com/tz/tz-link.htm Note: results may be
	//		inconsistent across browsers.

	var str = dateObject.toString(); // Start looking in toString
	var tz = ''; // The result -- return empty string if nothing found
	var match;

	// First look for something in parentheses -- fast lookup, no regex
	var pos = str.indexOf('(');
	if(pos > -1){
		tz = str.substring(++pos, str.indexOf(')'));
	}else{
		// If at first you don't succeed ...
		// If IE knows about the TZ, it appears before the year
		// Capital letters or slash before a 4-digit year
		// at the end of string
		var pat = /([A-Z\/]+) \d{4}$/;
		if((match = str.match(pat))){
			tz = match[1];
		}else{
		// Some browsers (e.g. Safari) glue the TZ on the end
		// of toLocaleString instead of putting it in toString
			str = dateObject.toLocaleString();
			// Capital letters or slash -- end of string,
			// after space
			pat = / ([A-Z\/]+)$/;
			if((match = str.match(pat))){
				tz = match[1];
			}
		}
	}

	// Make sure it doesn't somehow end up return AM or PM
	return (tz == 'AM' || tz == 'PM') ? '' : tz; // String
};

// Utility methods to do arithmetic calculations with Dates

dojo.date.compare = function(/*Date*/date1, /*Date?*/date2, /*String?*/portion){
	//	summary:
	//		Compare two date objects by date, time, or both.
	//	description:
	//  	Returns 0 if equal, positive if a > b, else negative.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	portion:
	//		A string indicating the "date" or "time" portion of a Date object.
	//		Compares both "date" and "time" by default.  One of the following:
	//		"date", "time", "datetime"

	// Extra step required in copy for IE - see #3112
	date1 = new Date(+date1);
	date2 = new Date(+(date2 || new Date()));

	if(portion == "date"){
		// Ignore times and compare dates.
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);
	}else if(portion == "time"){
		// Ignore dates and compare times.
		date1.setFullYear(0, 0, 0);
		date2.setFullYear(0, 0, 0);
	}

	if(date1 > date2){ return 1; } // int
	if(date1 < date2){ return -1; } // int
	return 0; // int
};

dojo.date.add = function(/*Date*/date, /*String*/interval, /*int*/amount){
	//	summary:
	//		Add to a Date in intervals of different size, from milliseconds to years
	//	date: Date
	//		Date object to start with
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//	amount:
	//		How much to add to the date.

	var sum = new Date(+date); // convert to Number before copying to accomodate IE (#3112)
	var fixOvershoot = false;
	var property = "Date";

	switch(interval){
		case "day":
			break;
		case "weekday":
			//i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo.cldr.supplemental

			// Divide the increment time span into weekspans plus leftover days
			// e.g., 8 days is one 5-day weekspan / and two leftover days
			// Can't have zero leftover days, so numbers divisible by 5 get
			// a days value of 5, and the remaining days make up the number of weeks
			var days, weeks;
			var mod = amount % 5;
			if(!mod){
				days = (amount > 0) ? 5 : -5;
				weeks = (amount > 0) ? ((amount-5)/5) : ((amount+5)/5);
			}else{
				days = mod;
				weeks = parseInt(amount/5);
			}
			// Get weekday value for orig date param
			var strt = date.getDay();
			// Orig date is Sat / positive incrementer
			// Jump over Sun
			var adj = 0;
			if(strt == 6 && amount > 0){
				adj = 1;
			}else if(strt == 0 && amount < 0){
			// Orig date is Sun / negative incrementer
			// Jump back over Sat
				adj = -1;
			}
			// Get weekday val for the new date
			var trgt = strt + days;
			// New date is on Sat or Sun
			if(trgt == 0 || trgt == 6){
				adj = (amount > 0) ? 2 : -2;
			}
			// Increment by number of weeks plus leftover days plus
			// weekend adjustments
			amount = (7 * weeks) + days + adj;
			break;
		case "year":
			property = "FullYear";
			// Keep increment/decrement from 2/29 out of March
			fixOvershoot = true;
			break;
		case "week":
			amount *= 7;
			break;
		case "quarter":
			// Naive quarter is just three months
			amount *= 3;
			// fallthrough...
		case "month":
			// Reset to last day of month if you overshoot
			fixOvershoot = true;
			property = "Month";
			break;
//		case "hour":
//		case "minute":
//		case "second":
//		case "millisecond":
		default:
			property = "UTC"+interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
	}

	if(property){
		sum["set"+property](sum["get"+property]()+amount);
	}

	if(fixOvershoot && (sum.getDate() < date.getDate())){
		sum.setDate(0);
	}

	return sum; // Date
};

dojo.date.difference = function(/*Date*/date1, /*Date?*/date2, /*String?*/interval){
	//	summary:
	//		Get the difference in a specific unit of time (e.g., number of
	//		months, weeks, days, etc.) between two dates, rounded to the
	//		nearest integer.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//		Defaults to "day".

	date2 = date2 || new Date();
	interval = interval || "day";
	var yearDiff = date2.getFullYear() - date1.getFullYear();
	var delta = 1; // Integer return value

	switch(interval){
		case "quarter":
			var m1 = date1.getMonth();
			var m2 = date2.getMonth();
			// Figure out which quarter the months are in
			var q1 = Math.floor(m1/3) + 1;
			var q2 = Math.floor(m2/3) + 1;
			// Add quarters for any year difference between the dates
			q2 += (yearDiff * 4);
			delta = q2 - q1;
			break;
		case "weekday":
			var days = Math.round(dojo.date.difference(date1, date2, "day"));
			var weeks = parseInt(dojo.date.difference(date1, date2, "week"));
			var mod = days % 7;

			// Even number of weeks
			if(mod == 0){
				days = weeks*5;
			}else{
				// Weeks plus spare change (< 7 days)
				var adj = 0;
				var aDay = date1.getDay();
				var bDay = date2.getDay();

				weeks = parseInt(days/7);
				mod = days % 7;
				// Mark the date advanced by the number of
				// round weeks (may be zero)
				var dtMark = new Date(date1);
				dtMark.setDate(dtMark.getDate()+(weeks*7));
				var dayMark = dtMark.getDay();

				// Spare change days -- 6 or less
				if(days > 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = -1;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 0;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = -1;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = -2;
							break;
						// Range contains weekend
						case (dayMark + mod) > 5:
							adj = -2;
					}
				}else if(days < 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = 0;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 1;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = 2;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = 1;
							break;
						// Range contains weekend
						case (dayMark + mod) < 0:
							adj = 2;
					}
				}
				days += adj;
				days -= (weeks*2);
			}
			delta = days;
			break;
		case "year":
			delta = yearDiff;
			break;
		case "month":
			delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
			break;
		case "week":
			// Truncate instead of rounding
			// Don't use Math.floor -- value may be negative
			delta = parseInt(dojo.date.difference(date1, date2, "day")/7);
			break;
		case "day":
			delta /= 24;
			// fallthrough
		case "hour":
			delta /= 60;
			// fallthrough
		case "minute":
			delta /= 60;
			// fallthrough
		case "second":
			delta /= 1000;
			// fallthrough
		case "millisecond":
			delta *= date2.getTime() - date1.getTime();
	}

	// Round for fractional values and DST leaps
	return Math.round(delta); // Number (integer)
};

return dojo.date;
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
'url:dijit/form/templates/ComboButton.html':"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n",
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
'url:dijit/templates/Calendar.html':"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"onclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n",
'ibm/tivoli/mbs/dijit/DateTimeCalendar':function(){
// wrapped by build app
define(["dijit","dojo","dojox","dojo/i18n!dojo/cldr/nls/gregorian","dojo/i18n!dojo/cldr/nls/islamic","dojo/i18n!dojo/cldr/nls/hebrew","dojo/i18n!dijit/nls/common","dojo/require!dojo/cldr/supplemental,dojo/date,dojo/date/locale,dijit/_Widget,dijit/_TimePicker,dijit/Calendar,dijit/_Templated"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.mbs.dijit.DateTimeCalendar");

dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.requireLocalization("dojo.cldr", "gregorian");
dojo.requireLocalization("dojo.cldr", "islamic");
dojo.requireLocalization("dojo.cldr", "hebrew");
dojo.require("dijit._Widget");
dojo.require("dijit._TimePicker");
dojo.require("dijit.Calendar");
dojo.require("dijit._Templated");
dojo.requireLocalization("dijit", "common");

dojo.declare(
	"ibm.tivoli.mbs.dijit.DateTimeCalendar",
	[dijit._Widget, dijit._Templated],
	{
		// summary:
		//		A simple GUI for choosing a date and time in the context of a monthly calendar.
		//
		// description:
		//		A simple GUI for choosing a date in the context of a monthly calendar.
		//		This widget can't be used in a form because it doesn't serialize the date to an
		//		`<input>` field.  For a form element, use ibm.tivoli.mbs.dijit.form.DateTimeTextBox instead.
		//
		//		Note that the parser takes all dates attributes passed in the
		//		[RFC 3339 format](http://www.faqs.org/rfcs/rfc3339.html), e.g. `2005-06-30T08:05:00-07:00`
		//		so that they are serializable and locale-independent.
		//
		// example:
		//	|	var calendar = new ibm.tivoli.mbs.dijit.DateTimeCalendar({}, dojo.byId("calendarNode"));
		//
		// example:
		//	|	<div dojoType="ibm.tivoli.mbs.dijit.DateTimeCalendar"></div>

		templateString: dojo.cache("ibm.tivoli.mbs.dijit", "templates/DateTimeCalendar.html", "<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer dijitCalendarYearContainer\" dojoAttachEvent=\"onkeypress: _onKeyPress,onclick: _onClick\">\r\n    <tr align=\"center\">\r\n        <td align=\"center\" style=\"vertical-align: top;\">\r\n            <span id=\"calendarNodeID\" dojoattachpoint=\"calendarNode\" class=\"dijitVisible\"></span>\r\n        </td>\r\n        <td style=\"white-space: nowrap;vertical-align: top\" rowspan=\"2\">\r\n            <span id=\"timeNodeID\" dojoattachpoint=\"timeNode\" class=\"dijitVisible\"></span>\r\n        </td>\r\n    </tr>\r\n    <tr align=\"center\">\r\n        <td width=\"100%\" style=\"vertical-align: bottom\">\r\n            <button dojoattachpoint=\"okButtonNode\" dojoattachevent=\"onclick: _onOkClick\">\r\n            </button>\r\n            <button dojoattachpoint=\"cancelButtonNode\" dojoattachevent=\"onclick: _close\">\r\n            </button>\r\n        </td>\r\n    </tr>\r\n</table>\r\n"),

		// value: Date
		//		The currently selected Date
		value: null,

		// datePackage: String
		//		JavaScript namespace to find Calendar routines.  Uses Gregorian Calendar routines
		//		at dojo.date by default.
		datePackage: "dojo.date",

		// tabIndex: Integer
		//		Order fields are traversed when user hits the tab key
		tabIndex: "0",

		tNode: null,

		dNode: null,

		widgetsInTemplate: true,

		attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
			tabIndex: "domNode"
		}),

		_getValueAttr: function () {
			// summary:
			//		Support getter attr('value')
			return this.value;
		},

		_setValueAttr: function (/*Date*/value) {
			// summary:
			//		Support setter attr("value", ...)
			// description:
			// 		Set the current date and update the UI.  If the date is disabled, the value will
			//		not change, but the display will change to the corresponding month.
			// tags:
			//      protected
			this.value = !value ? value : new this.dateClassObj(value);
			if (this.dNode) {
				this.dNode._setValueAttr(value);
				this.tNode._setValueAttr(new Date(value));
			}
		},

		_setCurrentFocusAttr: function (/*Date*/value) {
			this.currentFocus = new this.dateClassObj(value);
			if (this.dNode) {
				this.dNode._setCurrentFocusAttr(value);
			}
		},

		_setText: function (node, text) {
			// summary:
			//		This just sets the content of node to the specified text.
			//		Can't do "node.innerHTML=text" because of an IE bug w/tables, see #3434.
			// tags:
			//      private
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
			node.appendChild(dojo.doc.createTextNode(text));
		},

		goToToday: function () {
			// summary:
			//      Sets calendar's value to the current date - today is the default date
			this.dNode.attr('value', value);
			this.tNode.attr('value', new Date(value));
		},

		constructor: function (/*Object*/args) {
			var dateClass = (args.datePackage && (args.datePackage != "dojo.date")) ? args.datePackage + ".Date" : "Date";
			this.dateClassObj = dojo.getObject(dateClass, false);
			this.datePackage = args.datePackage || this.datePackage;
			this.dateFuncObj = dojo.getObject(this.datePackage, false);
			this.dateLocaleModule = dojo.getObject(this.datePackage + ".locale", false);
		},

		postCreate: function () {
			this.inherited(arguments);
			dojo.setSelectable(this.domNode, false);

			var options = { selector: 'time', timePattern: this.constraints.timePattern , lang: this.constraints.lang};
			var tpick = dijit.byId(this.id + "_time");
			if (tpick) {
				tpick.destroy();
				delete tpick;
			}

			var value = this.value;
			if(value) {
				this.value = null;
				this.attr('value', new this.dateClassObj(value));
			}

			var dateTimeWidget = this;

			this.tNode = new dijit._TimePicker({
				visibleIncrement: "T00:15:00",
				visibleRange: "T02:15:00",
				style: "font-size: .9em;",
				constraints: options,
				id: this.id + "_time",
				lang: this.lang,
				onChange: function (/*Date*/date) {
					if(dateTimeWidget.value) { //12-12668 (IE9) Error is thrown from the date/time widget when user selects time without selecting date
						dateTimeWidget.value.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
					}
				}
			}, this.timeNode);

			var dpick = dijit.byId(this.id + "_date");
			if (dpick) {
				dpick.destroy();   
				delete dpick;
			}

			this.dNode = new dijit.Calendar({
				constraints: this.constraints,
				id: this.id + "_date",
				datePackage: this.datePackage,
				lang: this.lang,
				onChange: function (/*Date*/date) {
					if(dateTimeWidget.tNode) {
						var timeValue = dateTimeWidget.tNode.get('value');
						if(!isNaN(timeValue.getTime()))
						{
							date.setHours(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
							dateTimeWidget.tNode.set('value', new Date(date));
						}
					}
					dateTimeWidget.value = new dateTimeWidget.dateClassObj(date);
					dojo.attr(dateTimeWidget.okButtonNode, 'disabled', false);
				},
				currentFocus: this.attr('currentFocus'),
				value: value
			}, this.calendarNode);

			if(value) {
				this.tNode.set('value', new Date(value));
			} else {
				dojo.attr(dateTimeWidget.okButtonNode, 'disabled', true);
			}
			
			dojo.connect(this.dNode.monthWidget.dropDown, "onClick", this._onClick);

			var loc = dojo.i18n.getLocalization("dijit", "common", this.lng);
			var okButtonLabel = loc.buttonOk || "OK";
			var cancelButtonLabel = loc.buttonCancel || "Cancel";

			this._setText(this.okButtonNode, okButtonLabel);
			this._setText(this.cancelButtonNode, cancelButtonLabel);
		},
		_onClick: function (/*Event*/evt) {
			// summary:
			//      Handler for clicks to stop event propagation 
			// tags:
			//      protected
			evt.stopPropagation();
		},
		_onOkClick: function (/*Event*/evt) {
			// summary:
			//      Handler for OK click, returns the DateTime value if appropriate
			// tags:
			//      protected
			dojo.stopEvent(evt);
			var dateTimeValue = this._getValueAttr();
			this.onChange(dateTimeValue);
		},
		_onKeyPress: function (/*Event*/evt) {
			// summary:
			//		Provides keyboard navigation of calendar
			// tags:
			//		protected
			var dk = dojo.keys;
			switch (evt.keyCode) {
				case dk.ENTER:
					this._onOkClick(evt);
					break;
				case dk.ESCAPE:
					this._close();
				default:
					this.dNode._onKeyPress(evt);
			}
			dojo.stopEvent(evt);
		},

		onValueSelected: function(/*Date*/ /*===== date =====*/){
			// summary:
			//		Deprecated.   Notification that a date cell was selected.  It may be the same as the previous value.
			// description:
			//      Formerly used by `dijit.form._DateTimeTextBox` (and thus `dijit.form.DateTextBox`)
			//      to get notification when the user has clicked a date.  Now onExecute() (above) is used.
			// tags:
			//      protected
		},

		onChange: function (/*Date*/date) {
			// summary:
			//		Notification that a date cell was selected.  It may be the same as the previous value.
			// description:
			//      Used by `dijit.form._DateTimeTextBox` (and thus `dijit.form.DateTextBox`)
			//      to get notification when the user has clicked a date.
			// tags:
			//      protected
			this.onValueSelected(value);	// remove when we switch to Dojo 2.0
		},

		_close: function () {
			// summary: Close Pop-up
			//	
			//dojohelper.closePickerPopup();
			this.destroy();
		}
	}
);
});

},
'dojo/cldr/nls/hebrew':function(){
define({ root:

//begin v1.x content
{
	"months-format-narrow": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"dateFormatItem-yQQQ": "y QQQ",
	"months-standAlone-narrow-leap": "Adar II",
	"dateFormatItem-yMEd": "EEE, y-M-d",
	"dateFormatItem-MMMEd": "E MMM d",
	"eraNarrow": [
		"AM"
	],
	"dateTimeFormats-appendItem-Day-Of-Week": "{0} {1}",
	"dateFormat-long": "y MMMM d",
	"months-format-wide": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dateFormatItem-EEEd": "d EEE",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, y MMMM dd",
	"dateFormatItem-Md": "M-d",
	"dayPeriods-format-abbr-am": "AM",
	"dateTimeFormats-appendItem-Second": "{0} ({2}: {1})",
	"dateFormatItem-yM": "y-M",
	"months-standAlone-wide": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"timeFormat-short": "HH:mm",
	"quarters-format-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"timeFormat-long": "HH:mm:ss z",
	"dateFormatItem-yMMM": "y MMM",
	"dateFormatItem-yQ": "y Q",
	"dateTimeFormats-appendItem-Era": "{0} {1}",
	"months-format-abbr-leap": "Adar II",
	"months-format-abbr": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"timeFormat-full": "HH:mm:ss zzzz",
	"dateTimeFormats-appendItem-Week": "{0} ({2}: {1})",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"quarters-format-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"quarters-standAlone-wide": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"months-standAlone-wide-leap": "Adar II",
	"timeFormat-medium": "HH:mm:ss",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"months-format-narrow-leap": "Adar II",
	"eraAbbr": [
		"AM"
	],
	"days-standAlone-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "AM",
	"dateFormatItem-MMMd": "MMM d",
	"dateFormatItem-MEd": "E, M-d",
	"dateTimeFormat-full": "{1} {0}",
	"days-format-wide": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"months-standAlone-abbr-leap": "Adar II",
	"dateTimeFormats-appendItem-Day": "{0} ({2}: {1})",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"Tishri",
		"Heshvan",
		"Kislev",
		"Tevet",
		"Shevat",
		"Adar I",
		"Adar",
		"Nisan",
		"Iyar",
		"Sivan",
		"Tamuz",
		"Av",
		"Elul"
	],
	"dateFormatItem-hm": "h:mm a",
	"dateTimeFormats-appendItem-Year": "{0} {1}",
	"dateTimeFormats-appendItem-Hour": "{0} ({2}: {1})",
	"dayPeriods-format-abbr-pm": "PM",
	"days-format-abbr": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"eraNames": [
		"AM"
	],
	"days-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"days-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7"
	],
	"dateFormatItem-MMM": "LLL",
	"dateTimeFormats-appendItem-Quarter": "{0} ({2}: {1})",
	"dayPeriods-format-wide-am": "AM",
	"dateTimeFormats-appendItem-Month": "{0} ({2}: {1})",
	"dateTimeFormats-appendItem-Minute": "{0} ({2}: {1})",
	"dateFormat-short": "yyyy-MM-dd",
	"dateFormatItem-yMMMEd": "EEE, y MMM d",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"dateFormat-medium": "y MMM d",
	"dayPeriods-format-narrow-pm": "PM",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a",
	"months-format-wide-leap": "Adar II"
}
//end v1.x content
,
	"ar": true,
	"bg": true,
	"el": true,
	"fa": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hu": true,
	"iw": true,
	"lv": true,
	"nl": true,
	"ru": true,
	"sr": true,
	"sv": true,
	"th": true,
	"tr": true,
	"uk": true
});
},
'dijit/form/MappedTextBox':function(){
define("dijit/form/MappedTextBox", [
	"dojo/_base/declare", // declare
	"dojo/dom-construct", // domConstruct.place
	"./ValidationTextBox"
], function(declare, domConstruct, ValidationTextBox){

/*=====
	var ValidationTextBox = dijit.form.ValidationTextBox;
=====*/

	// module:
	//		dijit/form/MappedTextBox
	// summary:
	//		A dijit.form.ValidationTextBox subclass which provides a base class for widgets that have
	//		a visible formatted display value, and a serializable
	//		value in a hidden input field which is actually sent to the server.

	return declare("dijit.form.MappedTextBox", ValidationTextBox, {
		// summary:
		//		A dijit.form.ValidationTextBox subclass which provides a base class for widgets that have
		//		a visible formatted display value, and a serializable
		//		value in a hidden input field which is actually sent to the server.
		// description:
		//		The visible display may
		//		be locale-dependent and interactive.  The value sent to the server is stored in a hidden
		//		input field which uses the `name` attribute declared by the original widget.  That value sent
		//		to the server is defined by the dijit.form.MappedTextBox.serialize method and is typically
		//		locale-neutral.
		// tags:
		//		protected

		postMixInProperties: function(){
			this.inherited(arguments);

			// we want the name attribute to go to the hidden <input>, not the displayed <input>,
			// so override _FormWidget.postMixInProperties() setting of nameAttrSetting
			this.nameAttrSetting = "";
		},

		// Override default behavior to assign name to focusNode
		_setNameAttr: null,

		serialize: function(val /*=====, options =====*/){
			// summary:
			//		Overridable function used to convert the get('value') result to a canonical
			//		(non-localized) string.  For example, will print dates in ISO format, and
			//		numbers the same way as they are represented in javascript.
			// val: anything
			// options: Object?
			// tags:
			//		protected extension
			return val.toString ? val.toString() : ""; // String
		},

		toString: function(){
			// summary:
			//		Returns widget as a printable string using the widget's value
			// tags:
			//		protected
			var val = this.filter(this.get('value')); // call filter in case value is nonstring and filter has been customized
			return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; // String
		},

		validate: function(){
			// Overrides `dijit.form.TextBox.validate`
			this.valueNode.value = this.toString();
			return this.inherited(arguments);
		},

		buildRendering: function(){
			// Overrides `dijit._TemplatedMixin.buildRendering`

			this.inherited(arguments);

			// Create a hidden <input> node with the serialized value used for submit
			// (as opposed to the displayed value).
			// Passing in name as markup rather than calling domConstruct.create() with an attrs argument
			// to make query(input[name=...]) work on IE. (see #8660)
			this.valueNode = domConstruct.place("<input type='hidden'" + (this.name ? " name='" + this.name.replace(/'/g, "&quot;") + "'" : "") + "/>", this.textbox, "after");
		},

		reset: function(){
			// Overrides `dijit.form.ValidationTextBox.reset` to
			// reset the hidden textbox value to ''
			this.valueNode.value = '';
			this.inherited(arguments);
		}
	});
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
'url:dijit/form/templates/DropDownButton.html':"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n",
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
'dijit/Calendar':function(){
define("dijit/Calendar", [
	"dojo/_base/array", // array.map
	"dojo/date",
	"dojo/date/locale",
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.get
	"dojo/dom-class", // domClass.add domClass.contains domClass.remove domClass.toggle
	"dojo/_base/event", // event.stop
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/keys", // keys
	"dojo/_base/lang", // lang.hitch
	"dojo/_base/sniff", // has("ie")
	"./CalendarLite",
	"./_Widget",
	"./_CssStateMixin",
	"./_TemplatedMixin",
	"./form/DropDownButton",
	"./hccss"	// not used directly, but sets CSS class on <body>
], function(array, date, local, declare, domAttr, domClass, event, kernel, keys, lang, has,
			CalendarLite, _Widget, _CssStateMixin, _TemplatedMixin, DropDownButton){

/*=====
	var CalendarLite = dijit.CalendarLite;
	var _CssStateMixin = dijit._CssStateMixin;
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var DropDownButton = dijit.form.DropDownButton;
=====*/

	// module:
	//		dijit/Calendar
	// summary:
	//		A simple GUI for choosing a date in the context of a monthly calendar.

	var Calendar = declare("dijit.Calendar",
		[CalendarLite, _Widget, _CssStateMixin], // _Widget for deprecated methods like setAttribute()
		{
		// summary:
		//		A simple GUI for choosing a date in the context of a monthly calendar.
		//
		// description:
		//		See CalendarLite for general description.   Calendar extends CalendarLite, adding:
		//			- month drop down list
		//			- keyboard navigation
		//			- CSS classes for hover/mousepress on date, month, and year nodes
		//			- support of deprecated methods (will be removed in 2.0)

		// Set node classes for various mouse events, see dijit._CssStateMixin for more details
		cssStateNodes: {
			"decrementMonth": "dijitCalendarArrow",
			"incrementMonth": "dijitCalendarArrow",
			"previousYearLabelNode": "dijitCalendarPreviousYear",
			"nextYearLabelNode": "dijitCalendarNextYear"
		},

		setValue: function(/*Date*/ value){
			// summary:
			//      Deprecated.   Use set('value', ...) instead.
			// tags:
			//      deprecated
			kernel.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
			this.set('value', value);
		},

		_createMonthWidget: function(){
			// summary:
			//		Creates the drop down button that displays the current month and lets user pick a new one

			return new Calendar._MonthDropDownButton({
				id: this.id + "_mddb",
				tabIndex: -1,
				onMonthSelect: lang.hitch(this, "_onMonthSelect"),
				lang: this.lang,
				dateLocaleModule: this.dateLocaleModule
			}, this.monthNode);
		},

		buildRendering: function(){
			this.inherited(arguments);

			// Events specific to Calendar, not used in CalendarLite
			this.connect(this.domNode, "onkeypress", "_onKeyPress");
			this.connect(this.dateRowsNode, "onmouseover", "_onDayMouseOver");
			this.connect(this.dateRowsNode, "onmouseout", "_onDayMouseOut");
			this.connect(this.dateRowsNode, "onmousedown", "_onDayMouseDown");
			this.connect(this.dateRowsNode, "onmouseup", "_onDayMouseUp");
		},

		_onMonthSelect: function(/*Number*/ newMonth){
			// summary:
			//      Handler for when user selects a month from the drop down list
			// tags:
			//      protected

			// move to selected month, bounding by the number of days in the month
			// (ex: dec 31 --> jan 28, not jan 31)
			this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus, "month",
				newMonth - this.currentFocus.getMonth()));
		},

		_onDayMouseOver: function(/*Event*/ evt){
			// summary:
			//      Handler for mouse over events on days, sets hovered style
			// tags:
			//      protected

			// event can occur on <td> or the <span> inside the td,
			// set node to the <td>.
			var node =
				domClass.contains(evt.target, "dijitCalendarDateLabel") ?
				evt.target.parentNode :
				evt.target;

			if(node && (
				(node.dijitDateValue && !domClass.contains(node, "dijitCalendarDisabledDate"))
					|| node == this.previousYearLabelNode || node == this.nextYearLabelNode
				)){
				domClass.add(node, "dijitCalendarHoveredDate");
				this._currentNode = node;
			}
		},

		_onDayMouseOut: function(/*Event*/ evt){
			// summary:
			//      Handler for mouse out events on days, clears hovered style
			// tags:
			//      protected

			if(!this._currentNode){ return; }

			// if mouse out occurs moving from <td> to <span> inside <td>, ignore it
			if(evt.relatedTarget && evt.relatedTarget.parentNode == this._currentNode){ return; }
			var cls = "dijitCalendarHoveredDate";
			if(domClass.contains(this._currentNode, "dijitCalendarActiveDate")){
				cls += " dijitCalendarActiveDate";
			}
			domClass.remove(this._currentNode, cls);
			this._currentNode = null;
		},

		_onDayMouseDown: function(/*Event*/ evt){
			var node = evt.target.parentNode;
			if(node && node.dijitDateValue && !domClass.contains(node, "dijitCalendarDisabledDate")){
				domClass.add(node, "dijitCalendarActiveDate");
				this._currentNode = node;
			}
		},

		_onDayMouseUp: function(/*Event*/ evt){
			var node = evt.target.parentNode;
			if(node && node.dijitDateValue){
				domClass.remove(node, "dijitCalendarActiveDate");
			}
		},

		handleKey: function(/*Event*/ evt){
			// summary:
			//		Provides keyboard navigation of calendar.
			// description:
			//		Called from _onKeyPress() to handle keypress on a stand alone Calendar,
			//		and also from `dijit.form._DateTimeTextBox` to pass a keypress event
			//		from the `dijit.form.DateTextBox` to be handled in this widget
			// returns:
			//		False if the key was recognized as a navigation key,
			//		to indicate that the event was handled by Calendar and shouldn't be propogated
			// tags:
			//		protected
			var increment = -1,
				interval,
				newValue = this.currentFocus;
			switch(evt.charOrCode){
				case keys.RIGHT_ARROW:
					increment = 1;
					//fallthrough...
				case keys.LEFT_ARROW:
					interval = "day";
					if(!this.isLeftToRight()){ increment *= -1; }
					break;
				case keys.DOWN_ARROW:
					increment = 1;
					//fallthrough...
				case keys.UP_ARROW:
					interval = "week";
					break;
				case keys.PAGE_DOWN:
					increment = 1;
					//fallthrough...
				case keys.PAGE_UP:
					interval = evt.ctrlKey || evt.altKey ? "year" : "month";
					break;
				case keys.END:
					// go to the next month
					newValue = this.dateFuncObj.add(newValue, "month", 1);
					// subtract a day from the result when we're done
					interval = "day";
					//fallthrough...
				case keys.HOME:
					newValue = new this.dateClassObj(newValue);
					newValue.setDate(1);
					break;
				case keys.ENTER:
				case " ":
					this.set("value", this.currentFocus);
					break;
				default:
					return true;
			}

			if(interval){
				newValue = this.dateFuncObj.add(newValue, interval, increment);
			}

			this._setCurrentFocusAttr(newValue);

			return false;
		},

		_onKeyPress: function(/*Event*/ evt){
			// summary:
			//		For handling keypress events on a stand alone calendar
			if(!this.handleKey(evt)){
				event.stop(evt);
			}
		},

		onValueSelected: function(/*Date*/ /*===== date =====*/){
			// summary:
			//		Deprecated.   Notification that a date cell was selected.  It may be the same as the previous value.
			// description:
			//      Formerly used by `dijit.form._DateTimeTextBox` (and thus `dijit.form.DateTextBox`)
			//      to get notification when the user has clicked a date.  Now onExecute() (above) is used.
			// tags:
			//      protected
		},

		onChange: function(value){
			this.onValueSelected(value);	// remove in 2.0
		},

		getClassForDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to return CSS classes to associate with the date entry for the given dateObject,
			//		for example to indicate a holiday in specified locale.
			// dateObject: Date
			// locale: String?
			// tags:
			//      extension

/*=====
			return ""; // String
=====*/
		}
	});

	Calendar._MonthDropDownButton = declare("dijit.Calendar._MonthDropDownButton", DropDownButton, {
		// summary:
		//		DropDownButton for the current month.    Displays name of current month
		//		and a list of month names in the drop down

		onMonthSelect: function(){ },

		postCreate: function(){
			this.inherited(arguments);
			this.dropDown = new Calendar._MonthDropDown({
				id: this.id + "_mdd", //do not change this id because it is referenced in the template
				onChange: this.onMonthSelect
			});
		},
		_setMonthAttr: function(month){
			// summary:
			//		Set the current month to display as a label
			var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month);
			this.dropDown.set("months", monthNames);

			// Set name of current month and also fill in spacer element with all the month names
			// (invisible) so that the maximum width will affect layout.   But not on IE6 because then
			// the center <TH> overlaps the right <TH> (due to a browser bug).
			this.containerNode.innerHTML =
				(has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + this.dropDown.domNode.innerHTML + "</div>") +
				"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" +  monthNames[month.getMonth()] + "</div>";
		}
	});

	Calendar._MonthDropDown = declare("dijit.Calendar._MonthDropDown", [_Widget, _TemplatedMixin], {
		// summary:
		//		The list-of-months drop down from the MonthDropDownButton

		// months: String[]
		//		List of names of months, possibly w/some undefined entries for Hebrew leap months
		//		(ex: ["January", "February", undefined, "April", ...])
		months: [],

		templateString: "<div class='dijitCalendarMonthMenu dijitMenu' " +
			"data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",

		_setMonthsAttr: function(/*String[]*/ months){
			this.domNode.innerHTML = array.map(months, function(month, idx){
					return month ? "<div class='dijitCalendarMonthLabel' month='" + idx +"'>" + month + "</div>" : "";
				}).join("");
		},

		_onClick: function(/*Event*/ evt){
			this.onChange(domAttr.get(evt.target, "month"));
		},

		onChange: function(/*Number*/ /*===== month =====*/){
			// summary:
			//		Callback when month is selected from drop down
		},

		_onMenuHover: function(evt){
			domClass.toggle(evt.target, "dijitCalendarMonthLabelHover", evt.type == "mouseover");
		}
	});

	return Calendar;
});

},
'url:dijit/form/templates/TextBox.html':"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
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
'dijit/CalendarLite':function(){
require({cache:{
'url:dijit/templates/Calendar.html':"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"onclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n"}});
define("dijit/CalendarLite", [
	"dojo/_base/array", // array.forEach array.map
	"dojo/_base/declare", // declare
	"dojo/cldr/supplemental", // cldrSupplemental.getFirstDayOfWeek
	"dojo/date", // date
	"dojo/date/locale",
	"dojo/dom", // dom.setSelectable
	"dojo/dom-class", // domClass.contains
	"dojo/_base/event", // event.stop
	"dojo/_base/lang", // lang.getObject, lang.hitch
	"dojo/_base/sniff", // has("ie") has("webkit")
	"dojo/string", // string.substitute
	"dojo/_base/window", // win.doc.createTextNode
	"./_WidgetBase",
	"./_TemplatedMixin",
	"dojo/text!./templates/Calendar.html"
], function(array, declare, cldrSupplemental, date, local, dom, domClass, event, lang, has, string, win,
			_WidgetBase, _TemplatedMixin, template){

/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
=====*/

	// module:
	//		dijit/CalendarLite
	// summary:
	//		Lightweight version of Calendar widget aimed towards mobile use

	var CalendarLite = declare("dijit.CalendarLite", [_WidgetBase, _TemplatedMixin], {
		// summary:
		//		Lightweight version of Calendar widget aimed towards mobile use
		//
		// description:
		//		A simple GUI for choosing a date in the context of a monthly calendar.
		//		This widget can't be used in a form because it doesn't serialize the date to an
		//		`<input>` field.  For a form element, use dijit.form.DateTextBox instead.
		//
		//		Note that the parser takes all dates attributes passed in the
		//		[RFC 3339 format](http://www.faqs.org/rfcs/rfc3339.html), e.g. `2005-06-30T08:05:00-07:00`
		//		so that they are serializable and locale-independent.
		//
		//		Also note that this widget isn't keyboard accessible; use dijit.Calendar for that
		// example:
		//	|	var calendar = new dijit.CalendarLite({}, dojo.byId("calendarNode"));
		//
		// example:
		//	|	<div data-dojo-type="dijit.CalendarLite"></div>

		// Template for main calendar
		templateString: template,

		// Template for cell for a day of the week (ex: M)
		dowTemplateString: '<th class="dijitReset dijitCalendarDayLabelTemplate" role="columnheader"><span class="dijitCalendarDayLabel">${d}</span></th>',

		// Templates for a single date (ex: 13), and for a row for a week (ex: 20 21 22 23 24 25 26)
		dateTemplateString: '<td class="dijitReset" role="gridcell" data-dojo-attach-point="dateCells"><span class="dijitCalendarDateLabel" data-dojo-attach-point="dateLabels"></span></td>',
		weekTemplateString: '<tr class="dijitReset dijitCalendarWeekTemplate" role="row">${d}${d}${d}${d}${d}${d}${d}</tr>',

		// value: Date
		//		The currently selected Date, initially set to invalid date to indicate no selection.
		value: new Date(""),
		// TODO: for 2.0 make this a string (ISO format) rather than a Date

		// datePackage: String
		//		JavaScript object containing Calendar functions.  Uses Gregorian Calendar routines
		//		from dojo.date by default.
		datePackage: date,

		// dayWidth: String
		//		How to represent the days of the week in the calendar header. See locale
		dayWidth: "narrow",

		// tabIndex: Integer
		//		Order fields are traversed when user hits the tab key
		tabIndex: "0",

		// currentFocus: Date
		//		Date object containing the currently focused date, or the date which would be focused
		//		if the calendar itself was focused.   Also indicates which year and month to display,
		//		i.e. the current "page" the calendar is on.
		currentFocus: new Date(),

		baseClass:"dijitCalendar",

		_isValidDate: function(/*Date*/ value){
			// summary:
			//		Runs various tests on the value, checking that it's a valid date, rather
			//		than blank or NaN.
			// tags:
			//		private
			return value && !isNaN(value) && typeof value == "object" &&
				value.toString() != this.constructor.prototype.value.toString();
		},

		_getValueAttr: function(){
			// summary:
			//		Support get('value')

			// this.value is set to 1AM, but return midnight, local time for back-compat
			if(this.value && !isNaN(this.value)){
				var value = new this.dateClassObj(this.value);
				value.setHours(0, 0, 0, 0);

				// If daylight savings pushes midnight to the previous date, fix the Date
				// object to point at 1am so it will represent the correct day. See #9366
				if(value.getDate() < this.value.getDate()){
					value = this.dateFuncObj.add(value, "hour", 1);
				}
				return value;
			}else{
				return null;
			}
		},

		_setValueAttr: function(/*Date|Number*/ value, /*Boolean*/ priorityChange){
			// summary:
			//		Support set("value", ...)
			// description:
			// 		Set the current date and update the UI.  If the date is disabled, the value will
			//		not change, but the display will change to the corresponding month.
			// value:
			//		Either a Date or the number of seconds since 1970.
			// tags:
			//      protected
			if(value){
				// convert from Number to Date, or make copy of Date object so that setHours() call below
				// doesn't affect original value
				value = new this.dateClassObj(value);
			}
			if(this._isValidDate(value)){
				if(!this._isValidDate(this.value) || this.dateFuncObj.compare(value, this.value)){
					value.setHours(1, 0, 0, 0); // round to nearest day (1am to avoid issues when DST shift occurs at midnight, see #8521, #9366)

					if(!this.isDisabledDate(value, this.lang)){
						this._set("value", value);

						// Set focus cell to the new value.   Arguably this should only happen when there isn't a current
						// focus point.   This will also repopulate the grid, showing the new selected value (and possibly
						// new month/year).
						this.set("currentFocus", value);

						if(priorityChange || typeof priorityChange == "undefined"){
							this.onChange(this.get('value'));
						}
					}
				}
			}else{
				// clear value, and repopulate grid (to deselect the previously selected day) without changing currentFocus
				this._set("value", null);
				this.set("currentFocus", this.currentFocus);
			}
		},

		_setText: function(node, text){
			// summary:
			//		This just sets the content of node to the specified text.
			//		Can't do "node.innerHTML=text" because of an IE bug w/tables, see #3434.
			// tags:
			//      private
			while(node.firstChild){
				node.removeChild(node.firstChild);
			}
			node.appendChild(win.doc.createTextNode(text));
		},

		_populateGrid: function(){
			// summary:
			//      Fills in the calendar grid with each day (1-31)
			// tags:
			//      private

			var month = new this.dateClassObj(this.currentFocus);
			month.setDate(1);

			var firstDay = month.getDay(),
				daysInMonth = this.dateFuncObj.getDaysInMonth(month),
				daysInPreviousMonth = this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(month, "month", -1)),
				today = new this.dateClassObj(),
				dayOffset = cldrSupplemental.getFirstDayOfWeek(this.lang);
			if(dayOffset > firstDay){ dayOffset -= 7; }

			// Mapping from date (as specified by number returned from Date.valueOf()) to corresponding <td>
			this._date2cell = {};

			// Iterate through dates in the calendar and fill in date numbers and style info
			array.forEach(this.dateCells, function(template, idx){
				var i = idx + dayOffset;
				var date = new this.dateClassObj(month),
					number, clazz = "dijitCalendar", adj = 0;

				if(i < firstDay){
					number = daysInPreviousMonth - firstDay + i + 1;
					adj = -1;
					clazz += "Previous";
				}else if(i >= (firstDay + daysInMonth)){
					number = i - firstDay - daysInMonth + 1;
					adj = 1;
					clazz += "Next";
				}else{
					number = i - firstDay + 1;
					clazz += "Current";
				}

				if(adj){
					date = this.dateFuncObj.add(date, "month", adj);
				}
				date.setDate(number);

				if(!this.dateFuncObj.compare(date, today, "date")){
					clazz = "dijitCalendarCurrentDate " + clazz;
				}

				if(this._isSelectedDate(date, this.lang)){
					clazz = "dijitCalendarSelectedDate " + clazz;
					template.setAttribute("aria-selected", true);
				}else{
					template.setAttribute("aria-selected", false);
				}

				if(this.isDisabledDate(date, this.lang)){
					clazz = "dijitCalendarDisabledDate " + clazz;
					template.setAttribute("aria-disabled", true);
				}else{
					clazz = "dijitCalendarEnabledDate " + clazz;
					template.removeAttribute("aria-disabled");
				}

				var clazz2 = this.getClassForDate(date, this.lang);
				if(clazz2){
					clazz = clazz2 + " " + clazz;
				}

				template.className = clazz + "Month dijitCalendarDateTemplate";

				// Each cell has an associated integer value representing it's date
				var dateVal = date.valueOf();
				this._date2cell[dateVal] = template;
				template.dijitDateValue = dateVal;

				// Set Date string (ex: "13").
				this._setText(this.dateLabels[idx], date.getDateLocalized ? date.getDateLocalized(this.lang) : date.getDate());
			}, this);

			// set name of this month
			this.monthWidget.set("month", month);

			// Fill in localized prev/current/next years
			var y = month.getFullYear() - 1;
			var d = new this.dateClassObj();
			array.forEach(["previous", "current", "next"], function(name){
				d.setFullYear(y++);
				this._setText(this[name+"YearLabelNode"],
					this.dateLocaleModule.format(d, {selector:'year', locale:this.lang}));
			}, this);
		},

		goToToday: function(){
			// summary:
			//      Sets calendar's value to today's date
			this.set('value', new this.dateClassObj());
		},

		constructor: function(/*Object*/args){
			this.datePackage = args.datePackage || this.datePackage;
			this.dateFuncObj = typeof this.datePackage == "string" ?
				lang.getObject(this.datePackage, false) :// "string" part for back-compat, remove for 2.0
				this.datePackage;
			this.dateClassObj = this.dateFuncObj.Date || Date;
			this.dateLocaleModule = lang.getObject("locale", false, this.dateFuncObj);
		},

		_createMonthWidget: function(){
			// summary:
			//		Creates the drop down button that displays the current month and lets user pick a new one

			return CalendarLite._MonthWidget({
				id: this.id + "_mw",
				lang: this.lang,
				dateLocaleModule: this.dateLocaleModule
			}, this.monthNode);
		},

		buildRendering: function(){
			// Markup for days of the week (referenced from template)
			var d = this.dowTemplateString,
				dayNames = this.dateLocaleModule.getNames('days', this.dayWidth, 'standAlone', this.lang),
				dayOffset = cldrSupplemental.getFirstDayOfWeek(this.lang);
			this.dayCellsHtml = string.substitute([d,d,d,d,d,d,d].join(""), {d: ""}, function(){
				return dayNames[dayOffset++ % 7]
			});

			// Markup for dates of the month (referenced from template), but without numbers filled in
			var r = string.substitute(this.weekTemplateString, {d: this.dateTemplateString});
			this.dateRowsHtml = [r,r,r,r,r,r].join("");

			// Instantiate from template.
			// dateCells and dateLabels arrays filled when _Templated parses my template.
			this.dateCells = [];
			this.dateLabels = [];
			this.inherited(arguments);

			dom.setSelectable(this.domNode, false);

			var dateObj = new this.dateClassObj(this.currentFocus);

			this._supportingWidgets.push(this.monthWidget = this._createMonthWidget());

			this.set('currentFocus', dateObj, false);	// draw the grid to the month specified by currentFocus

			// Set up connects for increment/decrement of months/years
			var connect = lang.hitch(this, function(nodeProp, part, amount){
				this.connect(this[nodeProp], "onclick", function(){
					this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus, part, amount));
				});
			});
			connect("incrementMonth", "month", 1);
			connect("decrementMonth", "month", -1);
			connect("nextYearLabelNode", "year", 1);
			connect("previousYearLabelNode", "year", -1);
		},

		_setCurrentFocusAttr: function(/*Date*/ date, /*Boolean*/ forceFocus){
			// summary:
			//		If the calendar currently has focus, then focuses specified date,
			//		changing the currently displayed month/year if necessary.
			//		If the calendar doesn't have focus, updates currently
			//		displayed month/year, and sets the cell that will get focus.
			// forceFocus:
			//		If true, will focus() the cell even if calendar itself doesn't have focus

			var oldFocus = this.currentFocus,
				oldCell = oldFocus && this._date2cell ? this._date2cell[oldFocus.valueOf()] : null;

			// round specified value to nearest day (1am to avoid issues when DST shift occurs at midnight, see #8521, #9366)
			date = new this.dateClassObj(date);
			date.setHours(1, 0, 0, 0);

			this._set("currentFocus", date);

			// TODO: only re-populate grid when month/year has changed
			this._populateGrid();

			// set tabIndex=0 on new cell, and focus it (but only if Calendar itself is focused)
			var newCell = this._date2cell[date.valueOf()];
			newCell.setAttribute("tabIndex", this.tabIndex);
			if(this.focused || forceFocus){
				newCell.focus();
			}

			// set tabIndex=-1 on old focusable cell
			if(oldCell && oldCell != newCell){
				if(has("webkit")){	// see #11064 about webkit bug
					oldCell.setAttribute("tabIndex", "-1");
				}else{
					oldCell.removeAttribute("tabIndex");
				}
			}
		},

		focus: function(){
			// summary:
			//		Focus the calendar by focusing one of the calendar cells
			this._setCurrentFocusAttr(this.currentFocus, true);
		},

		_onDayClick: function(/*Event*/ evt){
			// summary:
			//      Handler for day clicks, selects the date if appropriate
			// tags:
			//      protected
			event.stop(evt);
			for(var node = evt.target; node && !node.dijitDateValue; node = node.parentNode);
			if(node && !domClass.contains(node, "dijitCalendarDisabledDate")){
				this.set('value', node.dijitDateValue);
			}
		},

		onChange: function(/*Date*/ /*===== date =====*/){
			// summary:
			//		Called only when the selected date has changed
		},

		_isSelectedDate: function(dateObject /*===== , locale =====*/){
			// summary:
			//		Extension point so developers can subclass Calendar to
			//		support multiple (concurrently) selected dates
			// dateObject: Date
			// locale: String?
			// tags:
			//		protected extension
			return this._isValidDate(this.value) && !this.dateFuncObj.compare(dateObject, this.value, "date")
		},

		isDisabledDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to disable certain dates in the calendar e.g. `isDisabledDate=dojo.date.locale.isWeekend`
			// dateObject: Date
			// locale: String?
			// tags:
			//      extension
/*=====
			return false; // Boolean
=====*/
		},

		getClassForDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to return CSS classes to associate with the date entry for the given dateObject,
			//		for example to indicate a holiday in specified locale.
			// dateObject: Date
			// locale: String?
			// tags:
			//      extension

/*=====
			return ""; // String
=====*/
		}
	});

	CalendarLite._MonthWidget = declare("dijit.CalendarLite._MonthWidget", _WidgetBase, {
		// summary:
		//		Displays name of current month padded to the width of the month
		//		w/the longest name, so that changing months doesn't change width.
		//
		//		Create as new dijit.Calendar._MonthWidget({
		//			lang: ...,
		//			dateLocaleModule: ...
		//		})

		_setMonthAttr: function(month){
			// summary:
			//		Set the current month to display as a label
			var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month),
				spacer =
					(has("ie") == 6 ? "" :	"<div class='dijitSpacer'>" +
						array.map(monthNames, function(s){ return "<div>" + s + "</div>"; }).join("") + "</div>");

			// Set name of current month and also fill in spacer element with all the month names
			// (invisible) so that the maximum width will affect layout.   But not on IE6 because then
			// the center <TH> overlaps the right <TH> (due to a browser bug).
			this.domNode.innerHTML =
				spacer +
				"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" +
				monthNames[month.getMonth()] + "</div>";
		}
	});

	return CalendarLite;
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

}}});

define("layers/mbs/calendar", [], 1);

/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2009,2011 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

/**
 * Used to keep track of files that have already been loaded using the function
 * loadfile().
 */
document.filesloaded = "";
this.dojohelper = {};
var dh = dojohelper;
var pickerPopup;
var RICH_TEXT_MARKER = "<!-- RICH TEXT -->";

/**
 * Parses any dojo widgets contained by the specified element. If the widget was
 * already registered, it is destroyed before being parsed again.
 */
dojohelper.parseDojo = function(elementId) {
	if (dijit.byId(elementId) != undefined) {
		// if we're reloading the page, destroy the old widgets.
		dijit.byId(elementId).destroyRecursive();
	}

	dojo.parser.parse(dojo.byId(elementId).parentNode);
};


/**
 * Returns the popup id for the specified HTML element.
 */
dojohelper.getPopupId = function(node)
{
	return node.id + "_popup";
};


dojohelper.showPickerPopup = function(element) {
	// The constraints are a string that must be turned into a json object.
	var options = dojo.fromJson(element.getAttribute("constraints"));
	var button = element.tagName == "BUTTON";
	dojo.removeAttr(element, "gregorian");
	var datePackage = element.getAttribute("datePackage");
	var dateLocaleModule = dojo.getObject(datePackage ? datePackage + ".locale" : "dojo.date.locale", false);
	var dateClassObj = dojo.getObject(datePackage ? datePackage + ".Date" : "Date", false);
	var onChange = function (value)
	{
		var dateStr = "";
		var timeStr = "";
		var newValue= "";
		var dNodeValue;
		
		dNodeValue = this.attr('value');
		if(!dNodeValue || !dNodeValue.toGregorian) {
			dNodeValue = null;
		}
		else {
			dNodeValue = dNodeValue.toGregorian();
		}
		if(!undef(options.datePattern))
		{
			var dateOnlyOption = { selector: 'date', datePattern: options.datePattern, locale: options.locale};
			dateStr = dateLocaleModule.format(value, dateOnlyOption);
			if(dateLocaleModule && dNodeValue) {
				dojo.attr(element, {"gregorian":  dateLocaleModule.format(dNodeValue, dateOnlyOption)});
			}
			newValue = dateStr;
		}
		if(!undef(options.timePattern))
		{
			var timeOnlyOption = { selector: 'time', timePattern: options.timePattern, locale: options.locale};
			timeStr = dateLocaleModule.format(value, timeOnlyOption);
			if(dateLocaleModule && dNodeValue) {
				dojo.attr(element, {"gregorian":  dateLocaleModule.format(dNodeValue, timeOnlyOption)});
			}
			newValue = timeStr;
		}
		if((!undef(options.datePattern))&&(!undef(options.timePattern)))
		{
			newValue = dateStr +" "+ timeStr;
			if(dateLocaleModule && dNodeValue) {
				dojo.attr(element, {"gregorian":  dateLocaleModule.format(dNodeValue, dateOnlyOption) +" "+ timeStr});
			}
		}
		if(element.tagName != "BUTTON")
		{
			element.valueSelected = true;
			element.focus();
			if (newValue != element.value)
			{
				element.setAttribute("prekeyvalue", element.value);
				element.value = newValue;
				element.setAttribute("dojoValue", value.valueOf());
				if(document.createEvent)
				{
					// explicitly create and dispatch a change event as it doesn't get triggered when the 
					// value is programmatically set.				
					// First build the fake event.
					var changeEvent = document.createEvent("HTMLEvents");
					changeEvent.initEvent('change', /*bubbles up*/true, /*cancelable*/true);
					// Now dispatch the event
					element.dispatchEvent(changeEvent);
				}
				else
				{
					element.fireEvent('onchange');
				}
				sendEvent("setvalue", element.id, newValue);
			}
		}
		if(button)
		{
			sendEvent(element.getAttribute("selectevent"), element.id, value.valueOf());
		}
		element.focus();
		dojohelper.closePickerPopup();
	};

	var elementValue = element.value ? element.getAttribute("dojoValue") : undefined;
	var value;
	if(elementValue) {
		value = new dateClassObj(parseInt(elementValue));
		currentFocus = value;
	} else {
		value = undefined;
		currentFocus = new dateClassObj();
	}
	
	var picker = dijit.byId(dh.getPopupId(element));
	if(!picker) {
		var pickerClass = dojo.getObject(element.getAttribute("PopupType"), false);
		picker = new pickerClass({
		id: dh.getPopupId(element),
		lang: element.lang,
		lng: element.lng,
		dir: document.body.dir,
		constraints: options,
		value: value,
		currentFocus: currentFocus,
		datePackage: element.getAttribute("datePackage"),
		_close: function () {
			dijit.popup.close(picker);
			picker.destroy();
			delete picker;
		}
		});
		dojo.connect(picker, "onClick", function(evt){
			evt.stopPropagation();
		});
		if(picker.monthWidget != null)
		{//datetime picker does not have a month widget
			dojo.connect(picker.monthWidget.dropDown, "onClick", function(evt){
				evt.stopPropagation();
			});
		}
		dojo.marginBox(picker.domNode, { w: element.offsetWidth });
	}
	else
	{
		picker.onChange = new function() {};
		picker.set("value", value);
		picker.set("currentFocus", currentFocus);
	}
	picker.onChange = onChange;
	aroundNode=element;
	if(!button && element.tagName!="INPUT") {
		aroundNode=element.parentNode.parentNode;
	}
	dijit.popup.open({
		popup: picker,
		orient: ((dojo.attr(document.body,"dir")=="rtl")?{ 'BR': 'TR', 'TR': 'BR' }:{ 'BL': 'TL', 'TL': 'BL' }),
		around: aroundNode
	});
	pickerPopup=picker;
};

dojohelper.closePickerPopup = function() {
	if(pickerPopup==null)
		return;
	var picker = dojo.byId(pickerPopup);
	if(!picker)
		return;
	dijit.popup.close();
	picker.destroy();
	pickerPopup=null;
	delete picker;
};

/**
 * Delegates to input_changed_value.
 */
dojohelper.input_changed = function(event) {
	dojohelper.input_changed_value(this.domNode, arguments[0]);
};

dojohelper.widget_input_changed = function (event) {
	if (!working && !this.readOnly) {
		var hiddenForm = getHiddenForm();
		var inputs = hiddenForm.elements;
		var value = this.attr("value");
		
		if ((this.declaredClass == "dijit.form.TimeTextBox") || (this.declaredClass == "dijit.form.DateTextBox") || (this.declaredClass == "ibm.tivoli.mbs.dijit.form.DateTimeTextBox")) {
			var dateValue = new Date(this.attr("value").valueOf());
			var constraints = this.attr("constraints");
			constraints.locale = USERLOCALE;
			value = dojo.date.locale.format(dateValue, constraints);
		}

		inputs.namedItem("changedcomponentid").value = this.focusNode.id;
		inputs.namedItem("changedcomponentvalue").value = value;
		this.setAttribute("changed", "true");
	}
};

/**
 * Analagous to input_forceChanged() in library.js.  This sets the hidden changed fields so that if 
 * OK or Cancel is pressed, the clieck event sent up instead of setvalue.  And the changed value is 
 * stored in the changecomponent fields.
 */
dojohelper.input_changed_value = function(component, value) {
	// The check to see if working is true is for an issue in IE where a sendevent occurs which calls focus() on
	// on the body of the document.  This ultimately results in a call to this function which messes up the values
	// for the changed component.
	
	if (undef(component) || component.readOnly || working)
		return;
	var hiddenForm = getHiddenForm();
	var inputs = hiddenForm.elements;
	if (component.dojotype)
	{
		var widgetComponent = dijit.byId(component.id);
		
		var value =  widgetComponent.attr("value");

		if ((component.declaredClass == "dijit.form.TimeTextBox") || (component.declaredClass == "dijit.form.DateTextBox") || (component.declaredClass == "ibm.tivoli.mbs.dijit.form.DateTimeTextBox") )
		{
			var dateValue = new Date(widgetComponent.attr("value").vateOf());		
			var constraints = widgetComponent.attr("constraints");
			constraints.locale = USERLOCALE;
			value = dojo.date.locale.format(dateValue, constraints);
		}
		
		inputs.namedItem("changedcomponentid").value = component.id;
		inputs.namedItem("changedcomponentvalue").value = value;
	}
	else
	{
		inputs.namedItem("changedcomponentid").value = component.id;
		inputs.namedItem("changedcomponentvalue").value = value;
	}
	component.setAttribute("changed", true);
};

dojohelper.onBeforeActivate = function(event) {
	this._restoreSelection();
};

/**
 * Analagous to input_onfocus() in library.js. This is called when a component gets focus. 
 * If any other component has changed, it does a sendEvent to set the value on the server.
 */
dojohelper.on_focus = function(event) {
	var component = this.domNode;
	if (undef(component) || component.readOnly == true)
		return;

	var hiddenForm = getHiddenForm();
	var inputs = hiddenForm.elements;
	inputs.namedItem("currentfocus").value = component.id;
	var ccId = inputs.namedItem("changedcomponentid").value;
	var ccVal = inputs.namedItem("changedcomponentvalue").value;
	var clicked = component.getAttribute("clicked");
	if (ccId != "" && (component == null || component.id != ccId)
			&& clicked != "true") { // Something was changed
		arguments.caller = null; // running into a IE bug in stacktrace()
		sendEvent("setvalue", ccId, ccVal);
	}
};

/**
 * Called when the input for the rich text editor has changed.
 */
dojohelper.rte_input_changed = function(event) {
	var newValue = arguments[0];
	if (!newValue.endsWith(RICH_TEXT_MARKER))
		newValue += RICH_TEXT_MARKER;
	dojohelper.input_changed_value(this.domNode, newValue);
};

dojohelper.fixPopupZIndex = function() {
	dojo.require('dijit.Dialog');
	dijit.Dialog._DialogLevelManager._beginZIndex = 100000;
	dojo.require('dijit._base.popup');
	dojo.connect(dijit.popup, 'open', function(args){
		var currentNode = args.around;
		var zindex = 100000;
		while (currentNode && (!currentNode.style || !currentNode.style.zIndex))
		{
			currentNode = currentNode.parentNode;
		}
		if(currentNode) {
			zindex += Number(currentNode.style.zIndex);
		}
		args.popup.domNode.parentNode.style.zIndex = zindex;
	});
	dojo.require('dijit.Tooltip');
	dijit.hideTooltip(); //Make sure dijit._masterTT is valid, would be better if we could connect to constructor
	dojo.connect(dijit._masterTT, 'show', function(innerHTML, aroundNode, position) {
		var currentNode = aroundNode;
		var zindex = 100000;
		while (currentNode && (!currentNode.style || !currentNode.style.zIndex))
		{
			currentNode = currentNode.parentNode;
		}
		if(currentNode) {
			zindex += Number(currentNode.style.zIndex);
		}
		this.domNode.style.zIndex = zindex;
	});
};

/**
 * Returns true if the specified file has already been loaded.
 */
dojohelper.isFileLoaded = function(filename, context) {
	var result = false;
	if (document.filesloaded.indexOf("[" + filename + "]") != -1 && context == null) {
		result = true;
	} else if (context != null) {
		if (typeof (context.filesloaded) != "undefined"
				&& context.filesloaded.indexOf("[" + filename + "]") != -1) {
			result = true;
		}
	}
	return result;
};

/**
 * Loads the specified file linked to by the fileUrl.  Two file types are supported, either "js" or "css".
 * If necessary, a context may be specified which will be used with the function indirectEval to provide a scope
 * when evaluating javascript.  The implementation of the indirectEval function should simply call eval(contents).
 *
 * If a specified file has already been loaded, it will not be loaded again.
 */
dojohelper.loadfile = function(fileUrl, filetype, context, indirectEval) {
	if (!dh.isFileLoaded(fileUrl, context)) {
		if (filetype == "js") {
			var contents = dh.getText(fileUrl);
			if (!contents) {
				return;
			}

			contents = "(function(){ " + contents + "})()";
			if (context != null) {
				indirectEval.call(context, contents);
				context.filesloaded += "[" + fileUrl + "]\n";
			} else {
				eval(contents);
				document.filesloaded += "[" + fileUrl + "]\n";
			}
			
		} else if (filetype == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", fileUrl);

			document.getElementsByTagName("head")[0].appendChild(fileref);
			document.filesloaded += "[" + fileUrl + "]\n";
		}
	}
};

dojohelper.getXhrObj = function() {
	var xhrObj = null;
	try {
		xhrObj = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			xhrObj = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				xhrObj = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				throw new Error("XMLHTTP not available: " + failed);
			}
		}
	}
	return xhrObj;
};

dojohelper.isDocumentOk = function(http) {
	var stat = http.status || 0;
	return (stat >= 200 && stat < 300) || stat == 304 || stat == 1223;
};

dojohelper.getText = function(url) {
	var xhrObj = dh.getXhrObj();

	xhrObj.open('GET', url, false);
	xhrObj.send(null);
	if (!dh.isDocumentOk(xhrObj)) {
		var err = Error("Error loading " + url + " status: " + xhrObj.status);
		err.status = xhrObj.status;
		err.responseText = xhrObj.responseText;
		throw err;
	}
	return xhrObj.responseText;
};

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

		templateString: dojo.cache("ibm.tivoli.mbs.dijit", "templates/DateTimeCalendar.html"),

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
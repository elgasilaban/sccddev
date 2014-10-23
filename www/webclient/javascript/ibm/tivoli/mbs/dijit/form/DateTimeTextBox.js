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

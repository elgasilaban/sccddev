//>>built
// wrapped by build app
define("ibm/tivoli/mbs/dijit/KpiGauge", ["dijit","dojo","dojox","dojo/require!dojox/widget/AnalogGauge"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.mbs.dijit.KpiGauge");

dojo.require("dojox.widget.AnalogGauge");

dojo.declare("ibm.tivoli.mbs.dijit.KpiGauge",dojox.widget.AnalogGauge,{
	// summary:
	//		a gauge built using the dojox.gfx package.
	//
	// description:
	//		using dojo.gfx (and thus either SVG or VML based on what is supported), this widget
	//		builds a gauge component, used to display numerical data in a familiar format 
	//
	// usage:
	//		<script type="text/javascript">
	//			dojo.require("ibm.tivoli.mbs.dijit.KpiGauge");
	//			dojo.require("dijit.util.parser");
	//		</script>
	//		...
	//		<div	dojoType="ibm.tivoli.mbs.dijit.KpiGauge"
	//				id="testGauge"
	//				width="300"
	//				height="200"
	//				cx=150
	//				cy=175
	//				radius=125
	//				hasParent="false"
	//				url="http://www.ibm.com"
	//				image="gaugeOverlay.png"
	//				imageOverlay="false"
	//				imageWidth="280"
	//				imageHeight="155"
	//				imageX="12"
	//				imageY="38">
	//		</div>

	// hasParent: boolean
	//if this widge is inside a parent iframe window
	hasParent: false,

	// url: String
	// url to open when clicking on the chart
	url: null,

	drawRange: function(/*Object*/range){
		// summary:
		//		This function is used to draw (or redraw) a range
		// description:
		//		Draws a range (colored area on the background of the gauge) 
		//		based on the given arguments.
		// range:
		//		A range is a dojox.widget.gauge.Range or an object
		//		with similar parameters (low, high, hover, etc.).
		
		this.inherited(arguments);
		var path = range.shape;
		
		if (this.url!=null)
		{
				this.connect(path.getEventSource(), 'onmousedown', this.handleMouseDown);
				path.getEventSource().style.cursor = 'pointer';
				this.connect(path.getEventSource(), 'onclick', this.handleOnClick);
		}	
	},

	handleOnClick: function(/*Object*/event){
			// summary:
			//		This is an internal handler used by the gauge to support using
			//		the mouse to click to open a url 
			// event:	Object
			//			The event object
			//alert( '! KpiGauge handleonclick');
		if (this.url!=null)
		{
			if (this.hasParent)
			{
				parent.window.name="kpilink";
				parent.window.location =this.url;
			}
			else
			{
				window.name="kpilink";
				window.location = this.url;
			}
		}		
	},
	
	_dragIndicator: function(/*Object*/ widget, /*Object*/ event){
		// summary:
		//		Handles the dragging of an indicator, including moving/re-drawing
		// get angle for mouse position
	}	
});
});

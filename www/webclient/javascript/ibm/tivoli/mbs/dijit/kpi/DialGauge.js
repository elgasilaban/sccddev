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
dojo.provide("ibm.tivoli.mbs.dijit.kpi.DialGauge");

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojox.gauges.AnalogGauge');
dojo.require('dojox.gauges.AnalogArrowIndicator');
dojo.require('dojox.gauges.AnalogNeedleIndicator');
dojo.require('dojox.gauges.AnalogArcIndicator');

dojo.declare(
	"ibm.tivoli.mbs.dijit.kpi.DialGauge",
	[dijit._Widget, dijit._Templated],
    {
		isContainer: true,

		_gauge : null,
		startValue: 0,
		endValue: 100,
		hover: null,
		innerColor: "gray",
		arc3Color: "red",
		arc2Color: "yellow",
		arc1Color: "green",
		valueColor: "orange",
		targetColor: "darkgray",
		arc1Label: null,
		arc2Label: null,
		arc3Label: null,
		valueLabel: null,
		
		orientation: "clockwise",
		
		arcWidth: 20,
		tickLength: 10,
		needleWidth: 6,
    	startAngle: -90,
    	endAngle: 90,

        templateString: '<div dojoAttachPoint="gaugeWidgetNode"></div>',

        postCreate: function () {
            this.inherited(arguments);
            
            if(!this.needleLength)
            {
            	this.needleLength = this.radius + this.arcWidth;
            }
            
            if(this.orientation == "cclockwise")
            {
            	this.startAngle = 90;
            	this.endAngle = -90;
            }
            
			this._gauge = new dojox.gauges.AnalogGauge({
				id: this.id + "gauge",
				background: 'white',
				width: this.width,
				height: this.height,
				radius: this.radius,
				cx: this.cx,
				cy: this.cy,
				orientation: this.orientation,
            	startAngle: this.startAngle,
            	endAngle: this.endAngle,
				ranges: [{
					low: this.startValue, 
					high: this.endValue, 
					hover: this.hover, 
					color: this.innerColor
				}],
				majorTicks: {
					offset: this.tickOffset, 
					interval: this.tickInterval, 
					length: this.tickLength, 
					color: "black"
				},
				indicators: [
					new dojox.gauges.AnalogArcIndicator({
						value: this.endValue,
						width: this.arcWidth,
						offset: this.radius,
						color: this.arc3Color,
						noChange: true,
						hover: this.arc3Label,
						hideValue: true
					}),
					new dojox.gauges.AnalogArcIndicator({
						value: this.arc1Threshold,
						width: this.arcWidth,
						offset: this.radius,
						color: this.arc2Color,
						noChange: true,
						hover: this.arc2Label,
						hideValue: true
					}),
					new dojox.gauges.AnalogArcIndicator({
						value: this.arc2Threshold,
						width: this.arcWidth,
						offset: this.radius,
						color: this.arc1Color,
						noChange: true,
						hover: this.arc1Label,
						hideValue: true
					}),
					new dojox.gauges.AnalogNeedleIndicator({
						value: this.target,
						color: this.targetColor,
						width: this.needleWidth,
						length: this.needleLength,
						noChange: true,
						hover: this.targetLabel,
						easing: 'dojo.fx.easing.linear',
						hideValue: true
					}),
					new dojox.gauges.AnalogArrowIndicator({
						value: this.value,
						color: this.valueColor,
						width: this.needleWidth,
						length: this.needleLength,
						noChange: true,
						hover: this.valueLabel,
						easing: 'dojo.fx.easing.bounceOut',
						hideValue: true
					})
				]
			}, this.gaugeWidgetNode);
			this._supportingWidgets.push(this._gauge);
			this._gauge.startup();
			if(this.url)
			{
				this._gauge._rangeData[0].shape.rawNode.onclick = dojo.hitch(this, function(e){
					warnExit = false;
					window.location = this.url;
				});
				dojo.style(this._gauge._rangeData[0].shape.rawNode, "cursor", "pointer");
			}	
        }
    }
);
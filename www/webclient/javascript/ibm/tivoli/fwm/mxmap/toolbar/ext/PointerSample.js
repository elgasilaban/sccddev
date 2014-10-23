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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.PointerSample");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.Toolbar");
/**
 * This a sample extension to toolbar actions in FWM
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.PointerSample",null,{
	label:"Point Info",
	iconClass:"basicMapToolbarBtn",
	constructor:function(params){
		console.log("Pointer is started",params);
		dojo.mixin(this,params);		
	},
	createToolbarButton:function(){
		  var button = new dijit.form.Button({
	            label: this.label,	            
	            showLabel: true,
	            iconClass: this.iconClass,
	            onClick: dojo.hitch(this,function() {	            	
	            	this.execute();
	            })
	            
	        });
		  return button;
		
	},	
	handler:null,
	oldCursor:null,
	execute:function(){
		
		this.oldCursor=dojo.style(this.map.divId,'cursor');
		dojo.style(this.map.divId,'cursor','crosshair');
		this.handler=this.map.getMapstraction().click.addHandler( this._onClick,this);
	},
	disable:function(){
		this.map.getMapstraction().click.removeHandler( this._onClick,this);
		dojo.style(this.map.divId,'cursor',this.oldCursor);
	},
	destroy: function(){
	
	},
	_onClick: function(event_name, evt, event_args)
	{
		var point = event_args.location;
		alert("Point Clicked "+point.lat+","+point.lng);		
		this.disable();		
	}
});
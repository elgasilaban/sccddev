//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/InfoWindow", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base,dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
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

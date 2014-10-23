//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/routing/RouterFactory", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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

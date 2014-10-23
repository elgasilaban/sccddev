dojo.provide("ibm.tivoli.fwm.doh.module");
// Sample url to access the unittests:
// http://localhost:7001/maximo/webclient/javascript/mydojo/util/doh/runner.html?test=../../../ibm/tivoli/fwm/doh/module.js&paths=ibm.tivoli.fwm,../../../ibm/tivoli/fwm
// This file loads in all the test definitions.

try
{
	dojo.config.fwm = {
		ctxRoot: window.location.protocol + "//" + window.location.host + '/maximo',
		debug: true

	};
	dojo.registerModulePath("ibm.tivoli.fwm.doh", "../../ibm/tivoli/fwm/doh");
	dojo.registerModulePath("ibm.tivoli.fwm", "../../ibm/tivoli/fwm");
	if (dojo.isBrowser)
	{
		var x = document.createElement('script');
		x.src = dojo.config.fwm.ctxRoot + '/webclient/javascript/dojo_library.js';
		document.getElementsByTagName("head")[0].appendChild(x);

	}
	/**
	 * Create a new queue manager with a given config
	 */
	function QueueManager(config)
	{

	}
	;
	QueueManager.prototype.queueEvent = function(event, responseType, handleAs, responseHandler, errorHandler)
	{
		console.log("queueEvent", event, responseType, handleAs, responseHandler, errorHandler);
		dojo.publish(event.type, [ responseHandler, errorHandler ]);

	};
	window.Event = function(type, targetId, value, requestType)
	{
		this.type = type;
		this.targetId = targetId ? targetId : "";
		this.value = value ? value : "";
		this.requestType = requestType ? requestType : 1;
	};
	window.Event.prototype.setInvalidValue = function(isValid)
	{
		this.isInvalidValue = isValid;
	};
	window.queueManager = new QueueManager();

	var REQUESTTYPE_HIGHASYNC = 5;
	window.REQUESTTYPE_HIGHASYNC = 5;
	var app = [ 'gmaps', 'bingmaps', 'spatial' ];

	dojo.require("ibm.tivoli.fwm.doh.zoom.ZoomToDataInputUnitTests");
	dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreenUnitTests");
	dojo.require("ibm.tivoli.fwm.doh.toolbar.ToolbarUnitTests");
	dojo.require("ibm.tivoli.fwm.doh.route.RouteUnitTests");
	dojo.require("ibm.tivoli.fwm.doh.symbology.SymbologyUnitTests");

	dojo.require("ibm.tivoli.fwm.doh.dispatcher.DispatcherUnitTests");

}
catch (e)
{
	doh.debug(e);
}

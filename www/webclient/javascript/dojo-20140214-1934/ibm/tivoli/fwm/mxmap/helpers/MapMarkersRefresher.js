//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/helpers/MapMarkersRefresher", ["dijit","dojo","dojox","dojo/require!dojox/timing/_base"], function(dijit,dojo,dojox){
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
dojo.require("dojox.timing._base");

dojo.provide("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher");
/**
 * This class is used to perform the refresh of the markers on the map. The time
 * interval defined in the application designer for the map is informed in
 * seconds. Zero and negative values are ignored and the marker is not started.
 * 
 * To avoid refresh a map and create problems to an eventually user interaction
 * in the moment of the refresh, this class listens to the events
 * <code>startedUserInteractionOnMap</code> and
 * <code>endedUserInteractionOnMap</code>.
 * 
 * Both events, when published, SHOULD pass along the following object: {
 * objectSource: anObject, // json object [optional] objectSourceName:
 * "myObjectName", // string [required] eventName: "userInteractionEvent" //
 * string [required] }
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.helpers.MapMarkersRefresher", ibm.tivoli.fwm.mxmap._Base, {
	maximo: null,
	interval: 0, // seconds
	_timer: null,
	_signalCounter: 0,
	map: null,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this.addSubscription(dojo.subscribe("startedUserInteractionOnMap_" + this.map.getId(), dojo.hitch(this, this.disableMapRefresh)));
		this.addSubscription(dojo.subscribe("endedUserInteractionOnMap_" + this.map.getId(), dojo.hitch(this, this.checkToEnableMapRefresh)));
		this._signalCounter = 0;
	},
	start: function()
	{
		if (this._timer == null)
		{
			if (this.interval > 0)
			{

				console.log("[MapMarkersRefresher] Starting timer with interval " + this.interval);

				this._doStart();
			}
			else
			{

				console.log("[MapMarkersRefresher] Interal must be greater than zero -- Start ignored.");

			}
		}
		else
		{

			console.log("[MapMarkersRefresher] Timer already started. Ignoring start");

		}
	},
	disableMapRefresh: function(e)
	{

		console.log("[MapMarkersRefresher] Received startedUserInteraction - Refreshed Disabled", e);

		this._signalCounter = this._signalCounter + 1;
	},
	checkToEnableMapRefresh: function(e)
	{

		console.log("[MapMarkersRefresher] Received endedUserInteraction", e);

		this._signalCounter = this._signalCounter - 1;
		// we could receive more events than expecting
		// no reason to not use a counter at the implementation time
		// as it is the responsibility of the map implementation to 'say' when
		// we can refresh or not
		if (this._signalCounter <= 0)
		{
			console.log("[MapMarkersRefresher] Map Refresh Enabled");
			this._signalCounter = 0;
		}
	},
	stop: function()
	{
		if (this._timer == null)
		{
			console.log("[MapMarkersRefresher] Timer not started. Ignoring stop");
		}
		else
		{
			console.log("[MapMarkersRefresher] Stopping timer");
			this._timer.stop();
			this._timer = null;
		}
	},
	_doStart: function()
	{
		var that = this;
		this._timer = new dojox.timing.Timer(this.interval * 1000);
		this._timer.onTick = function()
		{
			if (that._signalCounter == 0)
			{
				console.log("[MapMarkersRefresher] Refreshing markers positions");
				
				that.map.autoRefreshMap();
			}
			else
			{
				console.log("[MapMarkersRefresher] Refresh disabled at this time. Counter: " + that._signalCounter);
			}
		};
		this._timer.onStart = function()
		{
			console.log("[MapMarkersRefresher] Started timer to refresh map markers");
		};
		this._timer.onStop = function()
		{
			console.log("[MapMarkersRefresher] Stopped timer to refresh map markers");
		};
		this._timer.start();
	},
	getMaximo: function()
	{
		return this.maximo;
	},
	destroyRecursive: function()
	{
		this.stop();
		this.inherited(arguments);
	}
});
});

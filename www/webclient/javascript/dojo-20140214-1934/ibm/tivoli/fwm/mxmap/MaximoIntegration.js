//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/MaximoIntegration", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Base"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.MaximoIntegration");
dojo.require("ibm.tivoli.fwm.mxmap._Base");

/**
 * Implements Maximo <-> Map JS framework communication. Currently using
 * sendEvent
 */
dojo.declare("ibm.tivoli.fwm.mxmap.MaximoIntegration", ibm.tivoli.fwm.mxmap._Base, {
	compId: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.addSubscription(dojo.subscribe("mxmap_onServerData_" + this.compId, dojo.hitch(this, this.handleServer)));
	},
	resetMaximoTimeout: function(fromServer)
	{
		try
		{
			console.log("timer from server:", fromServer);
			if (!fromServer)
			{
				fromServer = false;
			}
			resetLogoutTimer(fromServer);
			// reset timer
		}
		catch (e)
		{

		}
	},
	/**
	 * Handles actions from server
	 */
	handleServer: function(actions)
	{
		console.log("[Maximo Integration] Actions Received: ", actions);

		var action = null;
		try
		{
			this.resetMaximoTimeout(true);
			if (actions)
			{
				for ( var id in actions)
				{
					action = actions[id];
					console.log("[Maximo Integration] Processing action: ", action);
					switch (action.action)
					{
						case "updatedCurrentRecordLocation":
							console.log("onCurrentRecordUpdate_" + this.compId);
							dojo.publish("onCurrentRecordUpdate_" + this.compId, [ action.data.currentMbo ]);
							break;
						case "updatedRecordSetLocation":
							if (action.data.currentMbo)
							{
								dojo.publish("onCurrentRecordUpdate_" + this.compId, [ action.data.currentMbo ]);
								console.log("event was updatedRecordSetLocation");
							}
							dojo.publish("onCurrentRecordSetUpdated_" + this.compId, [ action.data.records ]);
							break;
						case "addRecordsToLayer":
							console.log('received records to add to layer', action);
							dojo.publish("addRecordsToLayer_" + this.compId, [ action.layerName, action.data.records, action.cleanBeforeAdd ]);
							break;
						case "removeRecordsFromLayer":
							console.log('received records to remove from layer', action);
							dojo.publish("removeRecordsFromLayer_" + this.compId, [ action.layerName, action.data.records ]);
							break;
						case "exception":
							dojo.publish("onServerException_" + this.compId, [ action.data.failedAction ]);
							console.warn("An exception was thrown from server", action.data);
							break;
						case "refreshroute":
							console.warn("refreshroute", action);
							dojo.publish("refreshroute_" + this.compId, [ action.data ]);

							break;
						case "refreshdatasource":
							console.warn("refreshdatasource", action);
							this.refreshDatasource(dojo.hitch(this, function(response)
									{
										this.handleServer(response);
									}), 
									function(){});

							break;
						case "noop":
							sendEvent("NOOP", this.compId, '');

							break;

						default:

							dojo.publish(action.action + "_" + this.compId, [ action.data ]);
							break;
					}
				}
			}
		}
		catch (e)
		{
			if (action)
			{
				console.error("Failed executing server action: ", action, e);
			}
			else
			{
				console.error("Failed executing server actions: ", actions, e);
			}
		}
	},
	storeUserLocation: function(locationInfo)
	{
		var myEvent = new Event("storeUserLocation", this.compId, dojo.toJson(locationInfo), REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", function()
		{
		}, function()
		{
			console.error("failed to save user context.");
		});
	},
	getRouteStops: function(callback, erroCb, forceRefresh, serverCallback)
	{
		if (forceRefresh == null)
		{
			forceRefresh = false;
		}
		var normalReturn = function(data)
		{

			if (data.error)
			{
				erroCb(data);

			}
			else
			{
				if (data.forceUIRefresh == true)
				{
					data.hasRoute = false;// the NOOP would force the route to
					// be drawn again.
					console.info("the results bean is going to change and then will send another UI Refresh.");
					sendEvent("NOOP", this.compId, '');
				}
				callback(data);

			}

		};
		if (!serverCallback)
		{
			serverCallback = false;
		}
		var myEvent = new Event("getRouteStops", this.compId + "_router", {
			forceRefresh: forceRefresh,
			serverCallback: serverCallback
		}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, normalReturn), erroCb);
	},

	loadMapTipTemplate: function(mxdata, successCallback, errorCallback)
	{
		var myEvent = new Event("loadMapTipTemplate", this.compId, {
			objectName: mxdata.mboName,
			objectId: mxdata.uid.value
		}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "text/html", "text", successCallback, errorCallback);
	},

	loadMapTipItems: function(successCallback, errorCallback)
	{
		var myEvent = new Event("loadMenuItems", this.compId, "", REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);

	},

	/**
	 * Send the set current location on server record.
	 */
	setCurrentRecordLocation: function(location, status)
	{
		var params = {
			lat: location.lat,
			lng: location.lng,
			formattedaddress: location.address,
			status: status
		};
		console.log("Calling Maximo event with data: ", location);

		var myEvent = new Event("setCurrentSALocation", this.compId, params, REQUESTTYPE_SYNC);
		queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function(err)
		{
			console.log("error", err);
		});
	},
	/**
	 * Send Maximo event to display a Maxmsg.
	 * 
	 * @param msgGroup
	 * @param msgKey
	 * @param params
	 *            string[]
	 */
	showMessage: function(msgGroup, msgKey, params)
	{

		var myEvent = new Event("showMaxMessage", this.compId, {
			msgKey: msgKey,
			msgGroup: msgGroup,
			params: params
		}, REQUESTTYPE_SYNC);
		queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function(err)
		{
			console.log("error", err);
		});
	},
	showMaximoDialog: function(dialogId, objectname, objectid, relationship)
	{
		addCommInput('dialogid', dialogId);
		if (objectname && objectid)
		{
			addCommInput('objectname', objectname);
			addCommInput('objectid', objectid);

		}
		if (relationship)
		{
			addCommInput('relationship', relationship);
		}
		dojo.publish("onDialogRequested_" + this.compId, []);
		sendEvent('showDialog', this.compId, '');
	},
	showQueryUnassignedWorkDialog: function(bounds)
	{
		if (bounds)
		{
			addCommInput('mapbounds_sw_latitudey', bounds.sw.lat);
			addCommInput('mapbounds_sw_longitudex', bounds.sw.lon);
			addCommInput('mapbounds_ne_latitudey', bounds.ne.lat);
			addCommInput('mapbounds_ne_longitudex', bounds.ne.lon);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
		this.showMaximoDialog('map_wo_query_unassigned_work', null, null);
	},
	queryUnassignedWorkDispatcher: function(bounds, callback, errorCb)
	{
		if (bounds)
		{
			var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, bounds, REQUESTTYPE_HIGHASYNC);
			queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
	},
	refreshQueryUnassignedWork: function(bounds, queryData, callback, errorCb)
	{
		if (bounds)
		{
			var params = {
				"bounds": bounds,
				"queryData": queryData
			};
			var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, params, REQUESTTYPE_HIGHASYNC);
			queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
		}
		else
		{
			console.warn("No bounds specified for query unassigned work");
		}
	},
	getCrewLaborByCoords: function(callback, erroCb, bounds)
	{

		var myEvent = new Event("getCrewLaborByCoords", this.compId, bounds, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
	},	
	
	_refreshDSRunning: false,
	refreshDatasource: function(callback,errorcb)
	{
		if (this._refreshDSRunning == true)
		{
			console.log("refresh datasouce is already taking place.");
			return;
		}
		var onSuccess = function(response)
		{
			console.log("[Maximo Integration] Refreshing Map: ", response);
			callback(response);
			/* 12-13622 */
			if (response.action.data.error)
			{
				this.showMessage(response.action.data.error.group, response.action.data.error.key, [response.action.data.error.params]);
			}
			this._refreshDSRunning = false;
		};
		var onError = function()
		{
			console.error("Failed to refresh marker position");
			errorcb();
			this._refreshDSRunning = false;
		};
		var myEvent = new Event("refreshMarkersPositions", this.compId, {}, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, onSuccess), dojo.hitch(this, onError));
	},
	loadSymbologyConfigFile: function(successCallback, errorCallback)
	{
		var myEvent = new Event("loadSymbologyConfig", this.compId, "", REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
	}

});

});

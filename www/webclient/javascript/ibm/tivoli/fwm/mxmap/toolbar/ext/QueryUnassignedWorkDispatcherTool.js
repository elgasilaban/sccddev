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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkDispatcherTool");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool");
dojo.require("dijit.form.Button");

/**
 * Specialized query unassigned work tool for the Dispatcher view. Bypasses the
 * dialog and calls the control to use the project's query to filter.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkDispatcherTool", ibm.tivoli.fwm.mxmap.toolbar.ext.QueryUnassignedWorkTool, {
		constructor: function(params)
		{
			this.inherited(arguments);
			this.addSubscription(dojo.subscribe("onMapRefresh_"+this.map.getId(), dojo.hitch(this, this._onMapRefresh)));
		},
		executeOn: function(refreshOptions)
		{			
			var bounds = this.map.getMapstraction().getBounds();
			this.map.getMaximo().queryUnassignedWorkDispatcher(bounds, 
					dojo.hitch(this, function(data) {
						this.queryReturned(data, refreshOptions);
					}),
					dojo.hitch(this, this.cancelQuery));
		},
		_onMapRefresh:function(refreshOptions){
			if(this.isActive() == true){
				this.executeOff();
				if (!refreshOptions) {
					refreshOptions = {
							zoom: false,
							disableMsgs: false,
							automatic: false
						};
				}
				this.executeOn(refreshOptions);
			}
		}
});
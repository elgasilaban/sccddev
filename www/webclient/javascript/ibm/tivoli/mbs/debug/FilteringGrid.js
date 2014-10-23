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
define(["dojo/_base/lang","dojo/_base/declare","dojox/grid/EnhancedGrid",
        "dojox/grid/enhanced/plugins/Filter","dojox/grid/enhanced/plugins/Search"],
		function(lang, declare, EnhancedGrid)
{
	return declare("ibm.tivoli.mbs.debug.FilteringGrid", EnhancedGrid,
	{
		plugins: {
			search: true, 
			filter: {}
		},
		setStore: function(store, query, queryOptions) {
			var filter = this.plugin('filter');
			var rules = null;
			if(filter) {
				rules = filter.filterDefDialog.getFilter();
				filter.filterDefDialog.clearFilter(true);
			}
			this.inherited("setStore", arguments);
			if(filter && rules) {
				filter.filterDefDialog.setFilter(rules);
			}
		}
	});
});
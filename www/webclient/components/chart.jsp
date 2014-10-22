
<%@ include file="../common/simpleheader.jsp"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.mbo.*"
%><%@page import="psdi.util.*"
%><%@page import="psdi.server.MXServer"
%>

<style>
	@import url("../webclient/javascript/dojo-20140214-1934/dojo/resources/site-2.css");
	@import url("../webclient/javascript/dojo-20140214-1934/dojo/resources/dnd.css");
	@import url("../webclient/javascript/dojo-20140214-1934/dojo/resources/dnd.css");
</style>

<script type="text/javascript">
dojo.provide("dojo.store.CustomJsonRest");
dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.StoreSeries");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojo.store.JsonRest");
dojo.require("dojo.store.Memory");
dojo.require("dojo.store.Observable");
dojo.require("dojo.store.Cache");
dojo.require("dojo.store.util.QueryResults");
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.Magnify");
dojo.require("dojox.charting.action2d.MoveSlice");
dojo.require("dojox.charting.action2d.Shake");
dojo.require("dojox.charting.action2d.Tooltip");
dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ObjectStore");

dojo.declare("dojo.store.CustomJsonRest", dojo.store.JsonRest, {
	constructor: function(args) {
		dojo.safeMixin(this, args);
	},

	 
	query: function(clause, options) {
		var results = this.inherited(arguments, [clause, options]).then(function(response) {
			return response.QueryMXASSETResponse.MXASSETSet.ASSET;
		});
		return dojo.store.util.QueryResults(results);
	}
});

 
function ready() {

var reststore = new dojo.store.CustomJsonRest({
		target:"/sccddev/rest/os/mxasset/?_format=json&_compact=1&parent=11400"
	});
	
myStore = dojo.store.Cache(
	reststore,
	dojo.store.Memory());
	
grid = new dojox.grid.DataGrid({
	store: dataStore = dojo.data.ObjectStore({
    	objectStore: myStore}),
	structure: [
	    {name:"Assetnum", field:"ASSETNUM", width: "200px"},
	    {name:"Description", field:"DESCRIPTION", width: "400px", editable: true}
	]
	// make sure you have a target HTML element with this id
	}, "testgrid");

grid.startup();
}

dojo.ready(ready);

</script>
<div id="store">
	<div id="testgrid" style="width: 800px; height: 480px;"/>
</div>
<%@ include file="../common/componentfooter.jsp" %>
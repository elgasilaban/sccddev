<%--
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * @CODETOBEDEFINED
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%><%@page import="com.ibm.tivoli.maximo.map.data.GpsDataCollectorControl"%>
<%@page import="com.ibm.tivoli.maximo.map.data.GpsDataCollectorComponent"%>
<%@page import="com.ibm.tivoli.maximo.map.dispatcher.MapDispatcherComponent"%>
<%@ page contentType="text/html;charset=UTF-8" import="java.util.List, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.system.session.*" %><%@ include file="../../common/simpleheader.jsp" %><%
	//ComponentInstance component = (ComponentInstance)request.getAttribute("currentcomponent");
	if(component == null)
		component = (ComponentInstance)session.getAttribute("currentcomponent");

	WebClientSession wcSession = component.getWebClientSession();
	boolean designMode = wcSession.getDesignmode();
	boolean useAbbrRenderID = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabbrrenderid"));

	
	if(designMode){
	//not sure
	
	}else{

	if (component.needsRender())
	{
	GpsDataCollectorComponent gpsComponent = (GpsDataCollectorComponent)component;
	if(gpsComponent.getIsLBSEnabled() && gpsComponent.getLBSInterval()>0){		
		%><script type="text/javascript" language="javascript">
		<%	if (debuglevel == 0)
		{%>
			dojohelper.loadfile("<%=basePath%>/javascript/<%=dojoDirectory%>/layers/map/mxmap.js", "js");
		<%}%>
		dojo.registerModulePath('ibm.tivoli.fwm', '../../ibm/tivoli/fwm');
		dojo.addOnLoad(function(){
		dojo.require("ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor");

		var locationMonitorEnabled = ${currentcomponent.isLBSEnabled};
		// Check if gps data collection is enabled
		if(locationMonitorEnabled == true){
			var gpsCollectionInterval = ${currentcomponent.LBSInterval};
			// Now check if there is a valid interval for gps data for this user
			if((gpsCollectionInterval != null) && (gpsCollectionInterval != 0)){
				// Start the Location Monitors
				// It reads gps data from the browser's geolocation API and sends to the Maximo server
				var locationMonitor = ibm.tivoli.fwm.mxmap.geolocation.LocationMonitor.getLocationMonitorInstance({interval: gpsCollectionInterval, compId: "${currentcomponent.id}"});
				if(!locationMonitor.started()){
					locationMonitor.start();
				}
			}
		}
		});
		</script>
<%	}}
}%>
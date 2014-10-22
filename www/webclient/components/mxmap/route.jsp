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
--%><%@ include file="../../common/simpleheader.jsp" %><%
	request.setAttribute("maproute_control", control);

	if(designmode)
	{
		%><tr style="min-height:50px;"><td style="min-height:10px;background-color: ${maproute_control.color};width:100%; height:10px;"></td></tr><%
	}else{
		if (component.needsRender()) {
	// <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
		
%>
<script type="text/javascript" language="javascript">	

	/*
	TODO: THE CODE WILL BE MOVED TO MAPSTRACTION - THE MAP WE HAVE HERE IS NOT THE MAP EXPECTED BY THE PROVIDER. 
	dojo.registerModulePath('ibm.tivoli.fwm', '../../ibm/tivoli/fwm');
	dojo.require('ibm.tivoli.fwm.mxmap.factory');
	dojo.require('ibm.tivoli.fwm.i18n');
	
	var rendererOptions = {
		draggable: true
	};
	var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	var directionsService = new google.maps.DirectionsService();
	var map = ibm.tivoli.fwm.mxmap.factory.registry.currentMap;
	var australia = new google.maps.LatLng(-25.274398, 133.775136);
	
	function initialize() {
		var myOptions = {
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: australia
		};
		console.log("ateh aqui vai");
	    directionsDisplay.setMap(map);
	    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

		google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
			computeTotalDistance(directionsDisplay.directions);
		});
			    
		calcRoute();
	}

	function calcRoute() {
		var request = {
			origin: "Sydney, NSW",
			destination: "Sydney, NSW",
			waypoints:[{location: "Bourke, NSW"}, {location: "Broken Hill, NSW"}],
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
  		});
	}	
	initialize();
	dojo.addOnLoad(function(){				
		initialize();									
	});
	<div id="directionsPanel" style="float:right;width:30%;height:100%">
	*/
</script>

<% 
		} %>

<%	} %>



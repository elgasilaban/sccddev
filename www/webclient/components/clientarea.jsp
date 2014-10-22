<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
	Boolean systemNavBar = wcs.showSystemNavBar(currentPage) ;
	if(!designmode)
	{
%>	<div id="<%=id%>" <%if(!systemNavBar){%>style="overflow: auto"<%}%>> <!-- This is the clientarea -->
<%	}
	component.renderChildComponents();
	if(!designmode)
	{
%>	</div>
<%	}
	if(component.needsRender())
	{
%>	<script>
		clientAreaId = "<%=id%>";
		var SYSTEMNAVBAR = <%=systemNavBar%>; 
		var adjacentColumn = null;
		dojo.connect(window, "resize", sizeClientArea);
		addLoadMethod("sizeClientArea()");
		dojo.subscribe("maintabchange", null, function(message){
			var clientArea = dojo.byId("<%=id%>");
			if(clientArea) {
				clientArea.scrollTop = 0;
				clientArea.scrollLeft = 0;
			}
		});
	</script>
<%	}
%><%@ include file="../common/componentfooter.jsp" %>
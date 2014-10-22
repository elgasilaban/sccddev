<%--       
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-M19
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
 *
 * Defect   Name       Date      Description
 * =======  =========  ========  ===============================================  
 * 43755    mhartel    10/31/11  Progress map values do not refresh
 * 45038    mhartel    01/11/12  Progress Map for Normal Change should not require scroll bar
 * 46110    mhartel    02/12/12  progress map and wf assignments get duplicated
--%>
<%@ include file="../common/simpleheader.jsp" %><%
    String height = component.getProperty("height"); 
    		
	// If needsRender, then this is the first time this control is being rendered and we need to send back the html
	// to render the component.
	if (component.needsRender())
	{
%>	

	<table style="height:<%=height%>; text-align:<%=defaultAlign%>;" dir='<%=rtl?"rtl":"ltr"%>'><tr><td>
		<table style="text-align:<%=defaultAlign%>;" id="<%=id%>" dir='<%=rtl?"rtl":"ltr"%>'></table>
	</td></tr></table>
	
<%
		if (!designmode)
		{
%>	

	<script type="text/javascript">
	
		if (!this.tpae)
		{
			tpae = {};
		}
		if (!tpae.pmguiprogressmap)
		{
			tpae.pmguiprogressmap = {};
		
			// Define function to load data model into component.
			tpae.pmguiprogressmap.loadmodel = function(id) {
		    	// Send AJAX call to server to fetch data model.
				sendXHREvent("fetchDataModel", id, "", REQUESTTYPE_HIGHASYNC, "json", "application/json", 
					// Callback function to process data data returned by the server.
					function(responseObj, ioArgs) {
						// Lookup the DOM node that represents the HTML table.
						var node = dojo.byId(id);
						// Remove all existing rows from the table.
						dojo.empty(node);
						if (responseObj) {
							// If an error message is returned from server then display it.
		        			if (responseObj.error) {
		        				// Add a row to the table.
								var row = node.insertRow(-1);
		        				// Create a table cell to contain the error icon.
								row.insertCell(0).innerHTML = "<img src='<%=IMAGE_PATH%>pmgui_flagerror.gif' alt=''/>";	
								// Create a table cell to contain the error message.
								row.insertCell(1).innerHTML = responseObj.error;		        			
		        			}
							// If a list of nodes are returned by the server then process it.
		        			else if (responseObj.items) {
		        				var visitedActive = false;
		        				// Add a first row to the table that will contain the nodes and the links between them.
		        				var row1 = node.insertRow(-1);
								// Add a second row to the table that will contain the node labels.
		        				var row2 = node.insertRow(-1);
		        				// Define the image tag for the node connector links.
		        				//var linkimgtag = "<img src='<%=IMAGE_PATH%>pmgui_connector.gif' alt=''/>";
		        				var linkimgtag = "<img src='<%=IMAGE_PATH%>blank.gif' alt='' height='13' width='1'/>";
		        				// Walk through the node list from the server.
		        				// TODO: the hardcoded values for nodecolor below are placeholders until the css is completed
								for (var i=0; i < responseObj.items.length; i++) {
									var imgfile;
									var nodecolor;
									var border;
									if (responseObj.items[i].active) {
										// Set the image to use for an active node.
										//imgfile = "<%=IMAGE_PATH%>pmgui_activeNode.gif";
										//nodecolor = "#e2982e";
										nodecolor = "#a6c476";
										border = "1px solid #31627e";
										// for automation
										dojo.byId(id).title = responseObj.items[i].value;
										visitedActive = true;
									}
									else {	
										// Set the image to use for an inactive node.
										if (visitedActive == true) {
											//imgfile = "<%=IMAGE_PATH%>pmgui_inactiveNode.gif";
											//imgfile = "#e8e8e8";
											nodecolor = "#d9d8d8";
											border = "0px";
										} else {
											//imgfile = "<%=IMAGE_PATH%>pmgui_visitedNode.gif";
											nodecolor = "#7d9dcc";
											border = "0px";
										}
									}
									// Define the image tag for the node connector links.
									//var nodeimgtag = "<img src='" + imgfile + "' alt='" + responseObj.items[i].tooltip + "' tabindex='0' title='" + responseObj.items[i].tooltip + "'/>";
									// TODO: style information on this div is a placeholder until the css is completed
									var nodeimgtag = "<div style='width:85px;height:13px;border:" + border + ";background-color:" + nodecolor + ";'/>";
									// Create a table cell in the first row to contain the node icon.
									var td = row1.insertCell(-1);
									td.align = "center";
									td.style.width = "85px";
									td.style.height = "13px";
									td.innerHTML = nodeimgtag;
									
									// Create a table cell in the second row to contain the node label.
									td = row2.insertCell(-1);
									//td.align = "center";
									td.style.width = "85px";
									td.style.height = "13px";
									td.style.verticalAlign = "top";
									td.innerHTML = responseObj.items[i].value;
									if (i < responseObj.items.length-1) {
										// Create a table cell in the fisrt row to contain the node connector link icon.
										row1.insertCell(-1).innerHTML = linkimgtag;
										// Create an empty table cell in the second row.
										row2.insertCell(-1).innerHTML = "&nbsp;";
									}
								}
		        			}
		        			else {
		        				console.log('Error updating ' + id + ': no items in response object');
		        			}
						}
						else {
							console.log('Error updating ' + id + ': no response object');
						}
					},
					// Callback function to handle server communication problem.
					function(responseObj, ioArgs) {
						var node = dojo.byId(id);
						dojo.empty(node);
						console.log('Error updating ' + id + ': sendXHREvent problem function called');
					}	
				);
			}
		}
		
		dojo.addOnLoad(function() {
<%			if (debug)
			{
%>				
				console.log("Updating pmguiprogressmap <%=id%> (render phase)");
<%			}
%>	
			tpae.pmguiprogressmap.loadmodel("<%=id%>");
		});
	
	</script>	
	
<%	
		}
	} 
	else if (!designmode) // We're doing a component model update, if not designmode update via javascript. 
	{
%>

	<component id="<%=id%>_holder"><![CDATA[<script>

<%		if (debug)
		{
%>			
			console.log('Updating pmguiprogressmap <%=id%>');
<%		}
%>	
		tpae.pmguiprogressmap.loadmodel("<%=id%>");
		        
    </script>]]></component>
	
<%  
	}
%>
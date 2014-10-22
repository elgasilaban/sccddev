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
 * Defect   Name       Date      Description
 * =======  =========  ========  ===============================================  
 * 44010    mhartel    10/31/11  <Story 16070> Use final icons in Workflow Assignment control
 * 44098    mhartel    11/04/11  16070: G11N: Fly over string show empty for WF assignment link
 * 44143    mhartel    11/07/11  <16364> Add new dialog to the WF assignment component
 * 44168    mhartel    11/14/11  <16364> Add ability to re-assign WF task
 * 46110    mhartel    02/12/12  progress map and wf assignments get duplicated
--%>

<%@ include file="../common/simpleheader.jsp" %><%
	//The width and height values will be used to set the dimensions for the workflow assignments area.
	String width = component.getProperty("width"); 
    String height = component.getProperty("height"); 
    
	// If needsRender, then this is the first time this control is being rendered and we need to send back the html
	// to render the component.
	if (component.needsRender())
	{
%>	

	<style type="text/css">
		.pmguiwfassignlink {
			cursor:pointer;
			text-decoration:underline;
			vertical-align:top;
		}
		.pmguiwfassignlabel {
			vertical-align:top;
		}
	</style>		

	<div style="width:<%=width%>; height:<%=height%>; overflow:auto; text-align:<%=defaultAlign%>;" dir='<%=rtl?"rtl":"ltr"%>'>
		<table style="text-align:<%=defaultAlign%>;" id="<%=id%>" dir='<%=rtl?"rtl":"ltr"%>'></table>
	</div>
	
<%
		if (!designmode)
		{
%>	

	<script type="text/javascript">
	
		if (!this.tpae)
		{
			tpae = {};
		}
		if (!tpae.pmguiwfassign)
		{
			tpae.pmguiwfassign = {};
		
			// Define function to load data model into component.
			tpae.pmguiwfassign.loadmodel = function(id) {
		    	// Send AJAX call to server to fetch data model.
				sendXHREvent("fetchWorkflowAssignments", id, "", REQUESTTYPE_HIGHASYNC, "json", "application/json", 
					// Callback function to process data data returned by the server.
					function(responseObj, ioArgs) {
						// Lookup DOM node that represents the table.
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
		        			// If an message is returned from server then display it.
		        			else if (responseObj.message) {
								// Add a row to the table.
								var row = node.insertRow(-1);
								// Create a table cell to contain the message.
								row.insertCell(0).innerHTML = responseObj.message;		        			
		        			}
		        			// If a list of workflow assignments are returned by the server then process it.
		        			else if (responseObj.items) {
		        				// Walk through the workflow assignment list from the server.
		        				var idnum = 1;
								dojo.forEach(responseObj.items, function(item) {
									// Add a row to the table.
									var row = node.insertRow(-1);
									// Create a table cell to contain the workflow assignment icon.
									row.insertCell(0).innerHTML = "<img src='<%=IMAGE_PATH%>" + item.imgfile + "' alt='" + item.imgalt + "' title='" + item.imgalt + "'/>";
									if (item.eventname) {
										var targetname = id;
										if (item.targetname) {
											targetname = item.targetname;
										}
										// Set the action string to use for the assignment link's onclick event.
										var actionstr = 'sendXHREvent("' + item.eventname + '", "' + targetname + '", "' + item.uniqueid + '", REQUESTTYPE_SYNC);';
										// RTC 20088 - Added to make validation possible, even without tab out
										// Full onclick javascript code
										var onclickstr = 'setFocusId(event, this);setValueForFocusChange(event, this);window.setTimeout(function() { ' + actionstr + ' }, 50);';
										// Create a table cell to contain the workflow assignment link.
										row.insertCell(1).innerHTML = "<span id='pmguiwflink" + idnum + "' class='pmguiwfassignlink' ctype='label' onclick='" + onclickstr + "' title='" + item.title + "'>" + item.title + "</span>";
									}
									else {
										// Create a table cell to contain the workflow assignment label.
										row.insertCell(1).innerHTML = "<span id='pmguiwflink" + idnum + "' class='pmguiwfassignlabel'>" + item.title + "</span>";													
									}
									idnum++;
								});
		        			}
		        			else {
		        				console.log('Error updating pmguiwfassign ' + id + ': no items in response object');
		        			}
						}
						else {
							console.log('Error updating pmguiwfassign ' + id + ': no response object');
						}
					},
					// Callback function to handle server communication problem.
					function(responseObj, ioArgs) {
						var node = dojo.byId(id);
						dojo.empty(node);
						console.log('Error updating pmguiwfassign ' + id + ': sendXHREvent problem function called');
					}	
				);
			}
		}
		
		dojo.addOnLoad(function() {
<%			if (debug)
			{
%>				
				console.log("Updating pmguiwfassign <%=id%> (render phase)");
<%			}
%>	
			tpae.pmguiwfassign.loadmodel("<%=id%>");
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
			console.log('Updating pmguiwfassign <%=id%>');
<%		}
%>	
		tpae.pmguiwfassign.loadmodel("<%=id%>");
		        
    </script>]]></component>
	
<%  
	}
%>
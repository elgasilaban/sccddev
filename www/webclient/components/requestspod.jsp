<%--
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-M19
 *
 * (C) COPYRIGHT IBM CORP. 2006
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%><%@ include file="../common/simpleheader.jsp" %>
<%@ page import="com.ibm.ism.pmsc.webclient.controls.RequestsPod,java.util.List,psdi.util.HTML;" %>
	<%
	
	
String label = control.getProperty("label");
if (label==null || label.equals(""))
   	label = "srmRequestsPod";

//Get Pod configuration parms
String osname = component.getProperty("osname");
String ticket_object = component.getProperty("ticket_object");
String filterdomain = component.getProperty("filterdomain");
String viewdialog = component.getProperty("viewdialog");

String widgetid=id+"requestspod";

	
RequestsPod requestsPodControl  = (RequestsPod)control;
String columnName = component.getProperty("columns");
requestsPodControl.setColumnName(columnName);
requestsPodControl.setTicketObject(ticket_object); 


Map columnHeading = null;
columnHeading = requestsPodControl.getResultSetAttributes();
List invalidColumnName = requestsPodControl.getInvalidColumn();
	%>
	 <script type="text/javascript">
 	  var invalidRequestGridColumnName = ""; 
	    <%
		if(invalidColumnName.size() > 0)
		{ 
		%>
		  invalidRequestGridColumnName = "<%=invalidColumnName.toString()%>"; 
		<%
		}
		%>

	</script>
	<%

	String value =  "";	 
	boolean userEditable= component.getProperty("usereditable").equalsIgnoreCase("true");
	String width = component.getProperty("width");
	String numericonly= component.getProperty("numericonly");
	String isdatefield =  "";
	String menutype=component.getMenuType();
	String lookup=component.getLookupName();
	String requiredString = wcs.getMaxMessage("ui","required").getMessage();
	ComponentInstance linkBack = null;
	boolean longdesc = false;
	boolean isReadOnly = false;
	boolean isMasked = false;
	boolean isRequired = false;
	//boolean comboBox = controlType.indexOf("combobox")!=-1 || (controlType.equals("reasonchange") && control.getProperty("usecombo").equalsIgnoreCase("true"));
	BoundComponentInstance boundComponent = null;
	String maskedTitle = "";
	boolean isDate = false; 
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		isReadOnly = boundComponent.isReadOnly();
		isMasked = boundComponent.isMasked();
		isRequired = boundComponent.isRequired();
		if(isMasked)
			maskedTitle=wcs.getMaxMessage("ui","maskedtitle").getMessage();
	}
	String mdStr = hiddenFrame? "MAINDOC." : "";
	 
		
	// If needsRender, then this is the first time this control is being rendered and we need to send back the html
	// to render the dojo widget.
	if (control.needsRender()) 	{
	
	   if (designmode) {%>
		     <div control="true" id="<%=widgetid%>" <%=automationId%>>			    
			      <span class="text dl" <%=componentEvents%>><a href=''onclick='return false;'><%=label%>...</a></span>
      		</div>
       <%} else {
       	Iterator headIter = columnHeading.entrySet().iterator();
		Map.Entry  first = (Map.Entry)headIter.next();
		StringBuffer colBuffer = new StringBuffer("{cols:[");
		colBuffer.append("{\"name\": \"");
		colBuffer.append((String)first.getKey());
		colBuffer.append("\", \"description\":\"");
		colBuffer.append((String)first.getValue());
		colBuffer.append("\"}");

		for (;headIter.hasNext();) 
		{
			Map.Entry me = (Map.Entry)headIter.next();
			colBuffer.append(",{\"name\": \"");
			colBuffer.append((String)me.getKey());
			colBuffer.append("\", \"description\":\"");
			colBuffer.append((String)me.getValue());
			colBuffer.append("\"}");
		}
		
		colBuffer.append("]}");
		
		String cols = HTML.encode(colBuffer.toString());
           
       %>   	 
	      <div  id='<%=widgetid%>' dojoType='ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod' class='tundra simplesrm' dojoAttachPoint='srmpod_0' cols='<%=cols%>' os='<%=osname %>' fd='<%=filterdomain%>'  view_dialog='<%=viewdialog%>' sr_object='<%=ticket_object%>' label='<%=label%>'></div>	      
	
	      <script type="text/javascript">	                           						 
		    				     		
    		dojo.addOnLoad(function() {           	  
           	  dojo.require('ibm.tivoli.simplesrm.srm.dijit.Overview.RequestsPod');	
           	    dojo.addOnLoad(function() {
           		   if (dijit.byId('<%=widgetid%>') != undefined) {
               		    dijit.byId('<%=widgetid%>').destroyRecursive();
           		   }

            		   try
            		   {
            		      dojohelper.parseDojo('<%=widgetid%>');
            		   }
            		   catch(error)
            		   {
            			   console.log(error);
            		   }
           	    });
               });     

			var colAttrNameArray = new Array(<%=columnHeading.entrySet().size()%>); 

			<% 
			for (Iterator i = columnHeading.entrySet().iterator(); i.hasNext();) 
			{
				Map.Entry me = (Map.Entry)i.next();
				String  key = (String) me.getKey();            
				String val = (String) me.getValue(); 
				%>colAttrNameArray['<%=key.toUpperCase()%>'] = "<%=val%>";<%
			}
				
			%>

 	     </script>
	   <%
		}
	} else {		
		
	}
	 %>
<%@ include file="../common/componentfooter.jsp" %>

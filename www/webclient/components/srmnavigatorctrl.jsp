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
 Removed from after top include
  <jsp:useBean id="simplesrm" scope="page" class="com.ibm.tivoli.simplesrm.Util" /> 
 *
--%>
<%@ include file="../common/simpleheader.jsp" %> 
<%

    String label = control.getProperty("label");
    if(designmode)
    {
    %>
	   <%@ include file="../common/designerevents.jsp" %>
    <%  
	//label = control.getLocalizedType();
    if (label==null || label.equals(""))
    	label = "srmNavigator";    
    }        
	
        // If the control is brand new, render the data.  Otherwise, if the data just changed, send back the changes.
        if(control.needsRender()){
           String mdStr = hiddenFrame? "MAINDOC." : "";
           String toolTip = component.getProperty("tooltip");
           String hidecarticon = component.getProperty("hidecarticon");  //default is false
           String hidecreatesricon = component.getProperty("hidecreatesricon");  //default is false
           String offering_fd = component.getProperty("offering_fd");  //offering filtering domain
           System.out.println("hidecarticon = " + hidecarticon + " hiecreatesricon = " + hidecreatesricon + " offerring_fd = " + offering_fd);
           if (offering_fd==null)
               offering_fd="";             					
		
		   if (designmode)
    	   {%>
		     <div control="true" id="<%=id%>" <%=automationId%>>			    
			     <span class="text dl" <%=componentEvents%>><a href='' onclick='return false;'><%=label%>...</a></span>
      		</div>
			
	       <%} else {%>		
              <script type="text/javascript">		    
     					    				
	          </script>           
	          
	              <div class='tundra simplesrm'>          
	                <div class='simplesrm'>
		              <div id="<%=id%>_selfservicestation" style="display: block; margin: 0;">
		         		   <table class='glass' style="width:100%">  
			         		   <tr><td class='glass ul'></td><td class='glass um' colspan="3"></td></tr>  	        	
				    	        <tr>
				    	            <td class='glass lt'></td>
				    	            <td class='glass content' >
					        	    	<div id='<%=id%>' dojoType='ibm.tivoli.simplesrm.srm.dijit.Navigator' toolTip="<%=toolTip%>" style="width:100%;" hidecarticon="<%=hidecarticon%>" hidecreatesricon="<%=hidecreatesricon%>" offering_fd="<%=offering_fd%>">
					        	    	</div>
			    			        </td>
			    			        <td class='glass rt'></td>		    		        
					            </tr>
				           </table> 
		               </div>
		             </div>
		            </div>
		            
		               
    	       <script type="text/javascript">    	       
		           console.log("navigator id = <%=id%>");
                   //dojo.registerModulePath('ibm.tivoli', '<%=servletBase%>/javascript');
                   dojo.addOnLoad(function() {
                	   dojo.require('ibm.tivoli.simplesrm.srm.dijit.Navigator');
                	   dojo.addOnLoad(function() {
                		   if (dijit.byId('<%=id%>') != undefined) {
                    		    dijit.byId('<%=id%>').destroyRecursive();
                		   }
                		   try
                		   {
                		      dojohelper.parseDojo('<%=id%>');
                		   }
                		   catch(error)
                		   {
                			   console.log(error);
                		   }
                	   });
                   });                                                     	   
	              		          
	          </script>
	       <%
	        }
		}
	 %>
<%@ include file="../common/componentfooter.jsp" %>
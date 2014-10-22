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
--%>
<%@ include file="../common/simpleheader.jsp" %>
<%@ page import="psdi.server.MXServer;"  %>
<%
	
       boolean debug_dojo = "true".equalsIgnoreCase(WebClientRuntime.getWebClientSystemProperty("webclient.dojo.debug", "false"));
       System.out.println("srmPageEnd.jsp Debug dojo = " + debug_dojo);

        %>
        <div id='<%=id%>'>
        </div>
    	<%

       if(control.needsRender() && !designmode) {
           String mdStr = hiddenFrame? "MAINDOC." : "";

           String topic = "/srmssctr/cmd/";
           String cmd = request.getParameter("cmd");
           String params = "";
       
          //create offering 
          //...event=loadapp&value=srmssctr&cmd=createofferingt&itemnum=PMSC_2001A&itemsetid=PMSCS1 
          //topic = /srmssctr/cmd/createoffering  {ItemNum:1234, ItemSetID:6789}}
          System.out.println("srmPageEnd.jsp cmd = " + cmd);
          if (cmd!=null) {
             if (cmd.equalsIgnoreCase("createoffering")) {
                topic = topic + "createoffering";
                String itemNum = request.getParameter("itemnum");
                String itemSetID = request.getParameter("itemsetid");
                System.out.println("srmPageEnd.jsp itemnum = " + itemNum + " itemsetid = " + itemSetID);
                
                if (itemNum!=null) {                   
                   params = "{ItemNum:'" + itemNum + "'";
                   if (itemSetID!=null) {
                      params = params + ", ";
                      params = params + "ItemSetID:'" + itemSetID+ "'";
                   }
                   params = params + "}";
                }
               
             //Create SR  
             //...event=loadapp&value=srmssctr&cmd=createsr 
             //topic = /srmssctr/cmd/createsr  {}}
             } else if (cmd.equalsIgnoreCase("createsr")) {
            	 topic = topic + "createsr";
            	 params = "{}";
            	 
            	//View SR  
                 //...event=loadapp&value=srmssctr&cmd=viewsr 
                 //topic = /srmssctr/cmd/createsr  {ticketuid:'1234'}}	 
             } else if (cmd.equalsIgnoreCase("viewsr")) {
            	 topic = topic + "viewsr";
            	 String ticketuid = request.getParameter("ticketuid");
            	 if (ticketuid==null)
            		 ticketuid = request.getParameter("uniqueid"); 
            	 
            	 if (ticketuid!=null) {                   
                     params = "{ticketuid:'" + ticketuid + "'}"; 
                 }  
            
           	 //View Solution  
                 //...event=loadapp&value=srmssctr&cmd=viewsolution&solutionid=1234 
                 //topic = /srmssctr/cmd/viewsolution  {ID:'1234';Solution:'true'}}	
            } else if (cmd.equalsIgnoreCase("viewsolution")) {
            	 topic = topic + "viewsolution";
            	 String solutionid = request.getParameter("solutionid");
            	 if (solutionid==null) 
            		 solutionid = request.getParameter("uniqueid");
            	 
            	 if (solutionid!=null) {                   
                     params = "{ID:'" + solutionid + "',Solution:'true'}";                 
                 }
                        
           //Quick insert (ticket template)  
           //...event=loadapp&value=srmssctr&cmd=quickinsert&templateid=1234 
           //topic = /srmssctr/cmd/quickinsert  {ID:'1234';Template:'true'}}	
           } else if (cmd.equalsIgnoreCase("quickinsert")) {
            	 topic = topic + "quickinsert";
            	 String templateid = request.getParameter("templateid");
            	 if (templateid==null) 
            		 templateid= request.getParameter("uniqueid");
            	 if (templateid!=null) {                   
                     params = "{ID:'" + templateid + "',Template:'true'}";                 
                 }
           }
             
             System.out.println("srmPageEnd.jsp params = " + params);
             if (!params.equals("")) {
                %>
                <script type="text/javascript">
                 addLoadMethod("<%=mdStr%>dojo.publish('<%=topic%>',[<%=params%>]);");
                </script>
                <%
             }         
          }
        }
        %>
<%@ include file="../common/componentfooter.jsp" %>
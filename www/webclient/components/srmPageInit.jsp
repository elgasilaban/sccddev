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
<%@ page import="psdi.server.MXServer,psdi.webclient.system.websession.WebAppEnv;"  %>
<%
	
       boolean debug_dojo = "1".equals(WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DOJO_DEBUG, "false")) || 
                            "1".equals(request.getParameter("debugDojo"));      

       //Pass langcode so we can pass it on REST API call
       String maxlangcode = langcode;

       //boolean appServerSecurity = WebAppEnv.useAppServerSecurity();  
       //if (appServerSecurity==true) {
       //  maxlangcode="";
       //}

       System.out.println("srmPageInit.jsp Debug dojo = " + debug_dojo + " id = " + id + " lang = " + maxlangcode);       

       String loginid = wcs.getUserInfo().getLoginID();
       String username = wcs.getUserInfo().getUserName();  
       username = username.replace("\\", "%5c");
       
       String runInMaximo = control.getProperty("runInMaximo");
       if (runInMaximo==null || runInMaximo.length()==0)
    	   runInMaximo = "true";
              
       //System.out.println("token = " + token + "uid = " + username + "runInMaximo = " + runInMaximo);
	
        if(control.needsRender() && !designmode)
        {
        		String mdStr = hiddenFrame? "MAINDOC." : "";
		%>
		          
        <div id='<%=id%>'>
        </div>
         
	    <script type="text/javascript">
	    
	       //Do this here because we can't set it in djConfig in page.jsp
	       dojo.config.gfxRenderer='svg,silverlight,vml';
	    
	      //not needed when using dojo-build directory
	      //dojo.registerModulePath('ibm.tivoli.simplesrm', '<%=servletBase%>/javascript/simplesrm');
	      //dojo.registerModulePath('ibm.tivoli.tip', '<%=servletBase%>/javascript/tip');
	      //dojo.registerModulePath('ibm.tivoli.tpae', '<%=servletBase%>/javascript/tpae');
	      //dojo.registerModulePath('com', '<%=servletBase%>/javascript/com');
          
	      // Load the custom Dojo layer file for the Self service UI app.
	      //If debug_dojo=true (debugDojo=1 on url), uncompressed SSC layer is loaded in page.jsp
	      //If debug_dojo=false  and debug>=2, don't load SSC layer. Modules loaded individually. Add modules to page.jsp for src level debugging   		   
           
	      <% if(debug_dojo ==false && debuglevel<2) { %>  //normal - no debug               
              //This causes the js to be load 
              dojo.require('layers.mbs.SRMUIDojo');  
          <%}  %>          
                       
	      dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/dojo/resources/dojo.css', 'css');	      
          dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/dojox/grid/resources/Grid.css', 'css');	      
	      dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/dojox/grid/resources/tundraGrid.css', 'css');

	      <% if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE")) { %>	
	         dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/tip/dijit/themes/RTLTivoli_Tundra.css', 'css');
          <% } else { %>
	         dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/tip/dijit/themes/Tivoli_Tundra.css', 'css');
          <% } %>
	      
	      <% if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE")) { %>		            
	 	     dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/RTLSimpleSRM_Tundra.css', 'css');
	 	  <% } else { %>
	 	     dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/SimpleSRM_Tundra.css', 'css');
          <% } %>
          
	 	  <% if(USERAGENT.equals("IE")) { 
	 	        if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE")) { %>	
 	                dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/RTLSimpleSRM_Tundra_ie.css', 'css');
 	            <% } else { %>
 	                dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/SimpleSRM_Tundra_ie.css', 'css');
    	        <% }  
 	      } %> 	     

 	      <% if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE")) { %>	
 	         dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/RTLsimplesrm.css', 'css');
 	      <% } else { %>
 	         dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/ibm/tivoli/simplesrm/srm/dijit/themes/simplesrm.css', 'css');
 	      <% } %>

 	      dojo.addOnLoad(function() {      
		      dojo.require('com.ibm.ism.pmsc.dojo.srmPageInit');		       
		      dojo.addOnLoad(function() {				 
	      		    var spe = new com.ibm.ism.pmsc.dojo.srmPageInit('<%=username%>', '<%=runInMaximo%>',  '<%=maxlangcode%>');
  		      });
              });		  		  		
		   
	    </script>
    	<%
		}
	    %>
<%@ include file="../common/componentfooter.jsp" %>

<%@ page
 contentType="application/x-java-jnlp-file"
 info="TRC Connect"
 import="
    java.net.URL,
    psdi.webclient.system.controller.SessionContext,
    psdi.webclient.system.beans.DataBean,
    psdi.webclient.system.runtime.WebClientRuntime
 "
%>

<%

		String playBackURL = request.getParameter("url");

        URL mainURL = new URL(new URL(request.getRequestURL().toString()), request.getContextPath() + "/webclient/jws");
%>

<!-- JNLP File for the Tivoli Remote Control Controller -->
 <jnlp
      spec="1.0+"
      codebase="<%=mainURL.toString()%>">
      <information>
 	       <title>Tivoli Remote Control Player 5.1.0</title> 
	       <vendor>IBM Tivoli</vendor> 
          <icon href="icon.gif"/>
	       <icon kind="splash" href="splash.gif"/>
      </information>
      <security>
          <all-permissions/>
      </security>
      <resources>
           <j2se version="1.4+"/>
           <jar href="TRCPlayer.jar"/>
       </resources>
       <application-desc>
        <argument>--recordingurl</argument>
		<argument><%=playBackURL%></argument>
       </application-desc>
 </jnlp>
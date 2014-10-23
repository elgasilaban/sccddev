
<%@ page
 contentType="application/x-java-jnlp-file"
 info="TRC Connect"
 import="
    java.net.URL,
    com.ibm.tsd.integrate.trc.Messages,
    psdi.security.UserInfo,
    psdi.server.MXServer,
    psdi.util.MXFormat,
    psdi.util.MXSession,
    psdi.webclient.system.controller.SessionContext,
    psdi.webclient.system.beans.DataBean,
    psdi.webclient.system.runtime.WebClientRuntime,
    psdi.webclient.system.session.WebClientSession
 "
%>

<%
        final String ENABLE_AUTO_UPLOAD_PROPERTY = "mxe.int.trc.upload.recording";

        MXSession mxSession = null;
        if (session != null) {
             //mxSession = (MXSession)session.getAttribute("MXSession");
             WebClientSession wcs = new WebClientSession(session);
	     wcs.setRequest(request);
	     mxSession = wcs.getMXSession();

        }
        String realm = "MAXIMO Web Application Realm";

        if (mxSession != null) {
            UserInfo ui = mxSession.getUserInfo();
            if (ui != null) {
                Messages msg = new Messages("com.ibm.tsd.integrate.trc.messages",ui.getLocale());
                request.setCharacterEncoding("UTF-8");
                realm = msg.getString("TRC_MAXIMO_BASIC_REALM");
            }
        }
                               
        String host = request.getParameter("TRCHost");
        String port = request.getParameter("TRCPort");
        String ticketID = request.getParameter("ticketID");
        String ticketType = (String)request.getParameter("ticketType");

        /*
         * Validation introduced due to defect 45181 (Cross Site Scripting)
        */
        if(!host.matches("[\\w.]+")) {//The hostname or ip should have only ordinary character, number and dots
        	host = "unknown";//A default value
        }
        if(!port.matches("\\d+")) {//it means that there is no digits [0-9]
        	port = "888";//A default value
        }
        if(!ticketID.matches("(\\w)+")) {
        	ticketID = "1";//A default value
        }
        if(!ticketType.matches("(\\w)+")) {
        	ticketType = "SR";//A default value
        }
        /*
         * End
        */

        MXServer mxServer = MXServer.getMXServer();
        String enableUpload = "0";
        if (mxServer != null) {
            enableUpload = mxServer.getProperty(ENABLE_AUTO_UPLOAD_PROPERTY);
            if ("y".equalsIgnoreCase(enableUpload)) {
                enableUpload = "1"; //standardized way to represent true
            }
        }

        String authHeader = null;
        String cookie = request.getHeader("Cookie");
        if (cookie != null && cookie.indexOf("LtpaToken") > -1) {
            //WebSphere authorization, use that for TRC auth header
            authHeader = "\"Cookie: " + cookie + "\"";
        } else {
            //Need to pass in authentication header for every POST call when LDAP is in place
            String Authorization = request.getHeader("Authorization");
            if (Authorization == null && MXFormat.getStoreYesValue().equalsIgnoreCase(enableUpload)) {
                response.setStatus(401);
                response.setHeader("WWW-Authenticate", "Basic realm=\"" + realm + "\"");
            }
            authHeader = "\"Authorization: " + Authorization + "\"";;
        }

        URL mainURL = new URL(request.getScheme(), request.getServerName(), request.getServerPort(), request.getContextPath() + "/webclient/jws");
        URL auditURL = new URL(request.getScheme(), request.getServerName(), request.getServerPort(), request.getContextPath() + "/webclient/trc/uploadAudit");
        URL uploadURL = new URL(request.getScheme(), request.getServerName(), request.getServerPort(), request.getContextPath() + "/webclient/utility/uploadutility.jsp");
        URL helpURL = new URL("http://publib.boulder.ibm.com/infocenter/tivihelp/v3r1/index.jsp?topic=/com.ibm.itrc.doc_5.1.0/welcome.htm");

%><!-- JNLP File for the Tivoli Remote Control Controller -->
 <jnlp
      spec="1.0+"
      codebase="<%=mainURL.toString()%>">
      <information>
 	       <title>Tivoli Remote Control Controller 5.1.0</title>
	       <vendor>IBM Tivoli</vendor> 
          <icon href="icon.gif"/>
	       <icon kind="splash" href="splash.gif"/>
      </information>
      <security>
          <all-permissions/>
      </security>
      <resources>
           <j2se version="1.4+"/>
           <jar href="TRCConsole.jar"/>
       </resources>
       <application-desc>
		<argument>--host</argument>
		<argument><%=host%></argument>
		<argument>--port</argument>
		<argument><%=port%></argument>
		<argument>--header</argument>
		<argument><%=authHeader%></argument>
		<argument>--token</argument>
		<argument>86c80da39c59d7479af08709f0c851eac92ccfe4</argument>
		<argument>--session</argument>
		<argument>active</argument>
		<argument>--auditurl</argument>
		<argument><%=auditURL.toString()%></argument>
<%
    if (MXFormat.getStoreYesValue().equalsIgnoreCase(enableUpload)) {
%>
		<argument>--uploadurl</argument>
		<argument><%=uploadURL.toString()%></argument>
<%
    }
%>
		<argument>--ticketID</argument>
		<argument><%=ticketID%></argument>
		<argument>--ticketType</argument>
		<argument><%=ticketType%></argument>
        <argument>--help</argument>
        <argument><%=helpURL.toString()%></argument>
       </application-desc>
 </jnlp>

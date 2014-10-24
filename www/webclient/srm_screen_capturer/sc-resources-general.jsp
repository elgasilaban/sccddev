

<%@ page
contentType="application/x-java-jnlp-file"
%>
<%
java.net.URL url = new java.net.URL(request.getScheme(),request.getServerName(),request.getServerPort(),request.getContextPath());
%>
<jnlp codebase="<%=url.toString()%>/webclient/srm_screen_capturer/" href="sc-resources-general.jsp">
    <information>
        <title>Screen Capture Resources</title>
        <vendor>IBM</vendor>
        <offline-allowed/>
    </information>
    <resources>
        <jar href="commons-httpclient-3.1.jar"/>
        <jar href="commons-logging.jar"/>
        <jar href="commons-httpclient-3.1.jar"/>
        <jar href="commons-codec-1.3.jar"/>
    </resources>
    <component-desc />
</jnlp>
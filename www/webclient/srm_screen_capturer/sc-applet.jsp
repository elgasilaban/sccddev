
<%@ page
contentType="application/x-java-jnlp-file"
%>
<%
java.net.URL url = new java.net.URL(request.getScheme(),request.getServerName(),request.getServerPort(),request.getContextPath());
%>

<jnlp 
  spec="1.0+" 
  codebase="<%=url.toString()%>/webclient/srm_screen_capturer/" 
  href="sc-applet.jsp"
  > 
  <information> 
    <title>Screen Capturer</title> 
    <vendor>IBM</vendor>  
    <description>Screen Capture Applet</description>  
    <offline-allowed/> 
  </information> 
  <security>
    <all-permissions/>
  </security>
  <resources> 
    <j2se version="1.6+"
	      href="http://java.sun.com/products/autodl/j2se"/>
    <jar href="tsd_screen_capturer.jar"/>  
    <extension name="other" href="sc-resources-general.jsp"/> 
  </resources> 
  <applet-desc 
      documentBase="<%=url.toString()%>/webclient/srm_screen_capturer/" 
      name="Applet" 
      main-class="com.ibm.tivoli.srm.screencapture.ScreenCapturerApplet"
      width="155"
      height="20"
      > 
  </applet-desc>
</jnlp>
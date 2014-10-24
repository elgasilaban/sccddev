<%@ page isErrorPage="true" import="java.io.*" %>
<% 

exception.printStackTrace(System.err);
String errorMessage = exception.getLocalizedMessage();
errorMessage = errorMessage.replaceAll("&","&amp;");
errorMessage = errorMessage.replaceAll("<","&lt;");
errorMessage = errorMessage.replaceAll("'","&apos;");
errorMessage = errorMessage.replaceAll("\"","&quot;");
errorMessage = errorMessage.replaceAll(">","&gt;");

%>
<HTML>
  <HEAD>
	 <title>This request was not understood</title>
	 <style type="text/css">
#mybox{
  padding: 0.5em;
  border: noborder;
  border-width: thin; 
  width: 100%;
}
h2 { 
  text-align: justify;
  color:#5555FF;
  font-size:15pt;
  font-family: Verdana, Helvitica, sans-serif;
  font-weight:bold
}
	 </style>
  </HEAD>
  <BODY>
	 <h2>This request was not understood</h2>
	 <TABLE BORDER=2  BGCOLOR="#DDDDFF">
		<TR VALIGN="BOTTOM">
		  <TD BGCOLOR="#C2B0D6" ><B><FONT FACE="Verdana, Helvitica,
		  sans-serif"  COLOR="black" SIZE="4PT">HTTP Error
		  Code:&nbsp;&nbsp;&nbsp;500</B><BR><BR></TD>
		</TR>
		<TR>
<%
  String errorMessage = exception.getLocalizedMessage();
  errorMessage = errorMessage.replaceAll("&","&amp;");
  errorMessage = errorMessage.replaceAll("<","&lt;");
  errorMessage = errorMessage.replaceAll("'","&apos;");
  errorMessage = errorMessage.replaceAll("\"","&quot;");
  errorMessage = errorMessage.replaceAll(">","&gt;");
  
%>
		  <TD><B>Error Message:</B><div id="mybox"><PRE><%=errorMessage%><BR></PRE></div></TD>
		</TR>
	 </TABLE>
  </BODY>
</HTML>

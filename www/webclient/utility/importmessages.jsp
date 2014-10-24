<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page import="psdi.app.appsetup.*,java.util.*,psdi.server.*,psdi.security.*,psdi.mbo.*"                 
%>
<%
  String filename = request.getParameter("value");
  filename = (filename == null) ? "" : filename;
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<html>
<head>
<BASE HREF="<%= servletBase%>/webclient/utility">
<title>Import Messages</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<form name="IMPORT" enctype="multipart/form-data" method="post" action="<%=servletBase%>/webclient/utility/setfile.jsp">
<input type="hidden" NAME="event" VALUE="importmessages">
<table width="98%" cellspacing="0" align="center">
<tr><td colspan=2 align="Center"><h1>Import Messages</h1></td></tr>
<tr><td><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td>&nbsp;</td></tr></table></td></tr>
<tr><td width="125px">Filename:</td><td><input type="file" name="value" value="<%=filename%>"></td></tr>
<tr><td><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td>&nbsp;</td></tr></table></td></tr>
<tr><td>&nbsp;</td><td><input type="submit" id="doimport" onclick="freezebutton()" value="Import"></td></tr>
</table>
</form>
<script language="JavaScript" type="text/javascript">
function freezebutton()
{
  document.getElementById('doimport').disabled=true;
  document.forms['IMPORT'].submit();
}
</script>
</body>
</html>
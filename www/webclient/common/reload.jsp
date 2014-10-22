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
--%><%
	String forceReload = request.getParameter("forcereload");

	if(forceReload!=null && forceReload.equals("true"))
	{
		String newReq = request.getRequestURL().toString() ;
		String query = request.getQueryString().replace("forcereload=true","forcereload=false");
		newReq+="?"+query;	%>
		</script>
		<script defer>
			parent.showWait();
			parent.submitHidden();
<%	}	%>
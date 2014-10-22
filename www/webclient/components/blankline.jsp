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
--%><%@ include file="../common/componentheader.jsp" %><%

	String width = component.getProperty("width");
	if(!width.equals(""))
	{
		width = "style=\"width:" + width + "\"";
	}

%>	<div id="<%=id%>" name="<%=id%>" class="<%=cssclass%>" <%if(designmode && control.getType().equals("blankline")){%>style="border: 1px dashed #999"<%}%> <%=width%>>&nbsp;</div>
<%@ include file="../common/componentfooter.jsp" %>
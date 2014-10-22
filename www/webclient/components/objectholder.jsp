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
--%><%@ include file="../common/simpleheader.jsp" %><%
	if(component.needsRender())
	{	%>
		<div aria-hidden="true" id="<%=control.getId()%>">
		</div>
<%	}
%><%@ include file="../common/componentfooter.jsp" %>
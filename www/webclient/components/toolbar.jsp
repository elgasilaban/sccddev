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
if (!designmode)
{
	if(control.hasChildElements())
	{	
		if(((Toolbar)control).needsRendering())
		{
			control.setNeedsRender(true);
		}
%>
<table id="<%=id%>" <%=automationId%> valign="top" summary="" role="toolbar">
	<tr>
		<td role="navigation">&nbsp;</td>
<%		component.renderChildrenControls();%>
	</tr>
</table>
<%	}
}
%><%@ include file="../common/componentfooter.jsp" %>
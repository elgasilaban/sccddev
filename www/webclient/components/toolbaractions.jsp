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
	if(component.needsRender())
	{
%>	<ul class="toolbar" role="toolbar"><%
	}
	control.renderChildren();
	if(component.needsRender())
	{
%>	</ul>
<%		if(control instanceof ToolbarActions)
		{
			String saveButtonId = ((ToolbarActions)control).getSaveButtonId();
			if(saveButtonId!=null)
			{	%>
	<script>
		saveButton = "<%=saveButtonId%>";
	</script>
<%			}
		}
	}
%>
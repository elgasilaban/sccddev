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
	if(!designmode)
	{
		String errorMsg = component.getProperty("errormsg");
		boolean changed = control.hasChanged();
		if(control.needsRender() || changed)
		{
			holderId = id+"_wrapper";
%>		<%@ include file="../common/componentholder_start.jsp" %>
		<div id="<%=id%>_wrapper" <%=automationId%>>
<%			if(!WebClientRuntime.isNull(errorMsg))
			{
%>			<span class="<%=textcss%> pnc"><%=errorMsg%></span>
<%			}
			else
			{
				component.renderChildrenControls();
			}
%>		</div>
<%			if(!component.needsRender() && changed)
			{
				app.put("endcdata", "true");
%>		 <%@ include file="../common/componentholder_end.jsp" %>
<%
				app.remove("endcdata");
			}
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
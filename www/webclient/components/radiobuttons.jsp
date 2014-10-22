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
	boolean dynamicButtons = component.getProperty("static").equals("false");
	((RadioButtonGroup)control).setRadioButtonsComponent(component);
	//Entire component rerenders along with children during any render event
	String newAutomationId = "";
	String value = "";
	String labelledById = component.getLabelledByRenderId();
	%><%@ include file="../common/componentexception.jsp" %><%
	if(automation)
	{
		newAutomationId = "automationid=\"" + realId + "_inner\"";
	}
	if (component.getProperty("border").equalsIgnoreCase("true"))
	{
		cssclass+="border";
	}
	if(component.needsRender())
	{
%>		<tr>
			<td colspan="10" id="<%=id%>_holder" <%=automationId%> class="<%=cssclass%>" style="padding:3px" valign="top"><%
	}
	else
	{
%>		<%@ include file="../common/componentholder_start.jsp" %>
<%	}
%>	<table role="radiogroup" <%if(labelledById!=null){%>aria-labelledby="<%=labelledById%>"<%}%> aria-invalid="<%=(exceptionType!=ComponentInstance.EXCEPTION_NONE)%>"  id="<%=id%>" <%=newAutomationId%> cellspacing="1">
		<tr>
			<td><%
			if(exceptionType != ComponentInstance.EXCEPTION_NONE)
			{
				%><img <%=excImageClass%><%=excMouseEvents%> src="<%=IMAGE_PATH%><%=exceptionImage%>" alt=""><%
			}
			%></td>
<%		List children = component.getChildren();
		int count = 0;
		if (children != null && children.size()>0)
		{
			Iterator i = children.iterator();
			boolean forcedRender = false;
			if(!control.needsRender())
			{
				control.setNeedsRender(true);
				forcedRender = true;
			}
			while (i.hasNext())
			{
				String automationIdButton = "";
				if(automation)
				{
					automationIdButton = "automationid=\"" + realId + "_button_" + count + "\"";
				}
%>				<td id="<%=id%>_button_<%=count%>" <%=automationIdButton%> valign="top">
					<% ((ComponentInstance)i.next()).render(); %>
				</td>
<%				count++;
			}
			if(forcedRender)
			{
				control.setNeedsRender(false);
			}
		}	%>
		</tr>
	</table>
<%	if(component.needsRender())
	{
		%></td>
		</tr>
<%	}
	else //if(component.hasPropertyChanged("cssclass"))
	{
%>	<script>
		var el = document.getElementById("<%=id%>_holder");
		if(el)
		{
			el.className="<%=cssclass%>";
			el.style.display='block';
		}
	</script>
	<%@ include file="../common/componentholder_end.jsp" %>
<%	}
%><%@ include file="../common/componentfooter.jsp" %>
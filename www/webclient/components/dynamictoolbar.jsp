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
	if(control.getChildCount()>0)
	{	
		if(component.needsRender())
		{	%>
				<tr>
					<td dyntoolbar="true" style="padding-<%=defaultAlign%>:5px; background-position: 1px 2px;" class="tbSep"></td>
					<td id="<%=id%>" <%=automationId%> style="padding:0px;vertical-align:middle;padding-<%=defaultAlign%>:1px;white-space: nowrap">
	<%	}	
		String divAutomationId="";
		if(automation)
			divAutomationId="automationid=\""+realId+"_inner\"";
	%><%@ include file="../common/componentholder_start.jsp" %>
						<%	String dynLabel = control.getProperty("label");
							if(!WebClientRuntime.isNull(dynLabel.trim()))
							{	%>
								<span class="<%=textcss%> dtbl" style="padding-bottom:8px;"><%=dynLabel%></span>
						<%	}	
							if(!((ControlInstance)control.getParentInstance()).needsRender())
							{	%>
						<ul class="toolbar" <%=divAutomationId%> role="toolbar">
						<%	}	 %>
							<%	component.renderChildComponents();
							if(!((ControlInstance)control.getParentInstance()).needsRender())
							{	%>
						</ul>
						<%	}	 %>
				<%@ include file="../common/componentholder_end.jsp" %>
	<%	if(component.needsRender())
		{	%>
					</td>
				</tr>
<%		}
	}	%>
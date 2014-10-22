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

    String tabStyle = control.getProperty("style");
	String ariaRole = "";
	boolean isMainTab = ((TabGroup)control).isMainTab();
	if(isMainTab)
	{
        ariaRole = "role=\"main\"";
    }

	if(component.needsRender())
	{
		if(component.rerendering())
		{
%>
			<%@ include file="../common/componentholder_start.jsp" %><%
			String style = control.getProperty("style");
			if(style.equals("form"))
			{	%>
				<script>
					dojo.publish("maintabchange",[{"id":"<%=id%>","listtab":<%=app.onListTab()%>}]);
				</script>	
		<%	}
		}
		else
		{
%>
		<tr>
			<td id="<%=id%>_td" <%=ariaRole%> style="vertical-align:top;padding:0px;margin:0px">
				<% 	if(accessibilityMode && ariaRole.length()>0)
					{	%>
						<h1 class="ah" id="main_content" ><%= wcs.getMessage("ui","mainform")%></h1>
				<%	}	%>
				<%@ include file="../common/componentholder_start.jsp" %>
<%		}	%>
					<table role="presentation"  id="<%=id%>" width="100%" class="<%=cssclass%>">
						<!-- begin tabgroup <%=id %>-->
<%	}

	component.renderChildComponents();

	if(component.needsRender())
	{
%>
						<!-- end   tabgroup <%=id %>-->
					</table>
<%		if(component.rerendering())
		{
			control.setNeedsRender(false);
%>
			<%@ include file="../common/componentholder_end.jsp" %>
<%		}
		else
		{
%>				<%@ include file="../common/componentholder_end.jsp" %>
			</td>
		</tr>
<%		}
	}	%>
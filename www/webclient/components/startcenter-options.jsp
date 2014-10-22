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
--%><%--
This JSP is the handler for StartCenter-Options component.
It provides a wrapper user interface for children hyperlink controls
--%>
<%@ include file="../common/simpleheader.jsp" %><%
StartCenterOptions scOptions =((StartCenterOptions)control);

if(component.needsRender())
{
%>
		<table role="presentation" id="<%=id%>" class='scoo' <%=automationId%> border="0" width="100%" align="<%=reverseAlign%>">
			<tr>
				<td valign="top" align="<%=reverseAlign%>" nowrap>
					<table role="presentation" border="0" cellpadding="2" bordercolor="#111111" align="<%=reverseAlign%>">
					   <tr>
					<%
}//if render
					List children = scOptions.getChildren();

					if (children != null )
					{
						Iterator i = children.iterator();
						while (i.hasNext())
						{
							DatasrcInstance child = (DatasrcInstance)i.next();
							child.render();
						}
					}

if(component.needsRender())
{
					%>
				</tr>
				</table>
				</td>
			</tr>
		</table>
<%
}
%><%@ include file="../common/componentfooter.jsp" %>
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
This JSP is the handler for StartCenter-Pane component.
It provides a wrapper/container for individual portlets that are
created on the fly in the instance class.
--%>
<%@ include file="../common/simpleheader.jsp" %><%
String column = component.getProperty("column");
String width = component.getProperty("width");

StartCenterPane scPane = (StartCenterPane)control;

if(column.equals("leftcolumn"))
	cssclass = "ppl";
else if(column.equals("rightcolumn"))
	cssclass = "ppr";

if(component.needsRender())
{

%>
<td id="<%=id%>" arial-live="polite" <%=automationId%> width="<%=width %>" class="psc <%=cssclass%>" valign="top">
<% 	if(accessibilityMode)
	{
		if(column.equals("leftcolumn"))
		{	%>
			<a class="ah" name="main_content"><%= wcs.getMessage("ui","mainform")%></a>
<%		}
		else
		{	%>
			<br class="ah">	
	<%	}
	}	%>
<%
}//if render 

	List children = control.getChildren();
	if (children != null )
	{
		Iterator i = children.iterator();
		while (i.hasNext())
		{
			DatasrcInstance child = (DatasrcInstance)i.next();
			String portletId = child.getProperty("layoutid");

			if(component.needsRender())	
			{%>			
			<div id="portletbox_<%=Long.parseLong(portletId)%>" class="portletbox">
				<table role="presentation" width='100%' border="0" cellspacing='0' cellpadding='0' class='pbt <%=child.getType()%>_pc' style="margin-bottom:10px"><%
			}
 			//Render each portlet
			child.render();
				
			if(component.needsRender())	
			{
%>	
				</table>
			</div>	
<%
			}
		}//while
	}//if
	
	if(component.needsRender())	
	{
%>
</td>
<%
	}
else 
{	
	//Check if the portlet was deleted, if it was then remove it
	//This code belong in every portlet, BUT it is kept here as a exception.
	//Reason is two fold:
	//	1. Portlet has to be deleted from the databean
	//	2. Portlet ControlInstance has to be removed from the start center pane 
	// 	3. Since DIV component was added here, it should be removed from here.
	//  4. Portlet cannot handle it because by the time this code is execute, control instance and mbo would have already been deleted.
	
	String deleteId = scPane.portletDeleted(); 
	if(deleteId != null && !deleteId.equals(""))
	{	
%>
<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		var pane = getElement("<%=id %>");
		var portlet = getElement("portletbox_<%=Long.parseLong(scPane.portletDeleted())%>");		
		if(!undef(pane) && !undef(portlet))
		{
			pane.removeChild(portlet);			
		}
</script>]]></component>		
	<%	scPane.setPortletDeleted(null);
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
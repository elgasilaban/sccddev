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
designSelected = false;//control.isSelected();
if(designmode)
{
	componentEvents+="onmousedown='mxd_onmousedown(event,getElement(\""+id+"\"));' ";
    componentEvents+="onmouseup='mxd_onmouseup(event,getElement(\""+id+"\"));' ";
    componentEvents+="onmousemove='mxd_onmousemove(event,getElement(\""+id+"\"));' ";
    componentEvents+="onmouseover='mxd_onmouseover(event,getElement(\""+id+"\"));' ";
    componentEvents+="onmouseout='mxd_onmouseout(event,getElement(\""+id+"\"));' ";

    componentEvents+="ondragstart='cancelevent()'";
    componentEvents+="ondragenter='cancelevent()'";
    componentEvents+="ondragover='cancelevent()'";
    componentEvents+="ondragleave='cancelevent()'";
    componentEvents+="ondrop='cancelevent()'";

	cssclass = " selectable_control";
}
TabGroup tabgroup = (TabGroup)control.getParentInstance();
Tab tab = (Tab)control;
if(tab.isCurrent())
{
	if(component.needsRender() && component.isVisible())
	{
		if(component.getProperty("rendercomponent").equals("tabbodies")) {
			cssclass ="tabbody " +cssclass;
			
		}
    %>
		<tr id="<%=id%>" <%=automationId%> control="true">
			<td id="<%=tabgroup.getRenderId()%>" class="<%=cssclass%>" <%=componentEvents%> width="100%" >
				<table role="presentation" id="<%=tabgroup.getRenderId()%>_tabbody_table" summary="" class="tabBodyTable">
					<% control.renderChildren(); %>
				</table><!-- end of tabbody -->
			</td>
		</tr>
<%	}
	else
	{
		control.renderChildren();
	}
}	%>
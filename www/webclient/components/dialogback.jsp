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
	String height = component.getProperty("height");
	String align = component.getProperty("align");
	//for buttongroups on dialogs
	height = height.equals("")?"":"height:"+height+"px";
	if (component.needsRender())
	{	
%><table role="presentation" id="<%=id%>" <%=automationId%> class="dialogb" width="100%" style="position:relative;top:0px;margin:0px;" height="100%" ondblclick="cancelEvent(event);">
	<tr>
		<td class="<%=cssclass%>" style="<%=height%>;padding:0px;" align="<%=align%>">
<%	}	%>
		<%	component.renderChildComponents();
	if (component.needsRender())
	{	%>
		</td>
	</tr>
</table>
<%	}
	else
	{
		String expand = ((Dialog)control).toggleExpand();
		if(expand!=null)
		{	
			boolean expanded = "true".equals(expand);
		%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			el=parent.document.getElementById("<%=id%>");
			if(el)
			{
				dialog=parent.document.getElementById("<%=component.getParentInstance().getRenderId()%>_inner");
				if(dialog)
					topPos=getTopPosition(dialog);
				var dialogBody = el.parentNode.parentNode;
				dialogBody.style.visibility="<%=(expanded?"visible":"hidden")%>";
				dialogBody.setAttribute("aria-hidden","<%=(expanded?"false":"true")%>");
				if(dialog)
					dialog.style.top=topPos;
			}
		</script>]]></component>
<%		}
	}	%>
<%@ include file="../common/componentfooter.jsp" %>
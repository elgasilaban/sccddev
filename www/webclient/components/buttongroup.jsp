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
	cssclass = "invisbuttongroup";
	String label = component.getProperty("label");
	String align = component.getProperty("align");
	String showGroup = component.getProperty("showbackground");
	if(showGroup.equals("true"))
	{
		cssclass = "buttongroup";
	}
	//IBMBIDI Start
	//Fix for Static Aligns
	if(defaultAlign.equalsIgnoreCase("right"))
	{
		if(align != null)
		{
			if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}
			else if(align.equalsIgnoreCase("left"))
			{
				align = "right";
			}
		}
	}
	//IBMBIDI End
	String labelalign = component.getProperty("labelalign");
	if("table".equals(control.getParentInstance().getType().toLowerCase()))
	{
		cssclass+=" tablebuttongroup";
	}
	String lType = null;
	boolean display = true;
	String width ="width:100%;";
	if(control.getParentInstance() instanceof Table)
	{
		Table tableControl=(Table)control.getParentInstance();
		display=tableControl.getFlagValue(DataBean.TABLE_EXPANDED);
		if(!ismobile)
		{
			String parentWidth = control.getParentInstance().getProperty("width");
			if(!WebClientRuntime.isNull(parentWidth))
			{
				width="width:"+parentWidth+";overflow-x:auto;";
			}
		}
	}

	if(component.getProperty("buttonsenabled").equals("false"))
	{
		display=false;
	}

	display = (display && componentVisible);

	String tableIdExt = "_table";
	if(component.needsRender())
	{
		String tableAutomationId ="";
		if(automation)
		{
			tableAutomationId="automationid=\""+realId+tableIdExt+"\"";
		}
	%>
<td colspan="7" height="0" align="<%=align%>" id="<%=id%>" <%=automationId%> style="<% if(!display){%>display:none;<%}%><%=designerSelected%>;white-space: nowrap;" class="<%= cssclass %>">
	<div style="<%=width%>;">
		<table <%if(designmode){%>width="100%" <%}%>id="<%=id + tableIdExt%>" <%=tableAutomationId%> summary="" role="group">
			<tr>
<%  }
	List children = component.getChildren();
	Iterator i = children.iterator();
	while (i.hasNext())
	{
		ComponentInstance child = (ComponentInstance)i.next();
		String tempAlign = align;
		if(child.getProperty("designonly").equals("true") && !designmode)
		{
			continue;
		}
		if(component.needsRender())
		{
			if(child.getType().equals("label"))
			{
				if(child.getProperty("title").length()==0) {
					continue;
				}
				tempAlign=defaultAlign;
			}
%>			<td align="<%=tempAlign%>" style="white-space: nowrap;">
<%		}
		child.render();
		if(component.needsRender())
		{
%>			</td>
<%		}
	}
	if(component.needsRender())
	{
%>			</tr>
		</table>
	</div>
</td>
<%	}
	else
	{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		addLoadMethod("updateDisplay('<%=id%>','<%if(!display){%>none<%}%>')");
		</script><%="]]>"%></component>
<%		if(designmode)
		{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		el=document.getElementById("<%=id%>");
		if(el)
			el.style.backgroundColor="<%=designerSelectedColor%>";
		</script><%="]]>"%></component>
<%		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
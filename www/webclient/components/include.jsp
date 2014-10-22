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
	if(designmode)
	{
		int TR = 0;
		int TD = 1;
		int innerElement = -1;
		String innerType = "";
		String selBorderColor = "#aacc54";
		List<BaseInstance> children = control.getChildren();
		if(children.size() > 0)
		{
			ControlInstance childControl = (ControlInstance)children.get(0);
			if(childControl != null)
			{
				List<ComponentInstance> components = childControl.getComponents();
				if(components != null && components.size() > 0)
				{
					ComponentInstance firstChildComponent = components.get(0);
					innerType = firstChildComponent.getType();
					if(innerType.equals("components"))
					{
						String layout = firstChildComponent.getProperty("layout");
						if(layout.equals("horizontal"))
							innerElement=TD;
						else
							innerElement=TR;
					}
				}
			}
		}
		else
		{
			innerElement=TR;
		}
		String label = showallcontrols?control.getLocalizedType():"";
		String designerSelectedColorStr = "";
		if(!designerSelectedColor.equals(""))
			designerSelectedColorStr="background-color:"+designerSelectedColor+";border:1px solid "+selBorderColor;
		if(component.needsRender())
		{
			if(innerElement==TD)
			{	%>
				</tr>
				<tr>
					<td colspan="100" id="<%=id%>" style="<%=designerSelectedColorStr%>" <%=componentEvents%>>
						<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%" class="includeblock">
							<tr>
								<td colspan="100">
									<a href="" aria-live="polite" id="<%=id%>_label" class="text dl" onmouseover="return noStatus();" target="_blank"/><%=label%></a>
								</td>
							</tr>
							<%component.renderChildComponents();%>
						</table>
					</td>
				</tr>
				<tr>
		<%	}
			else if(innerElement==TR || innerType.equals("section") || innerType.equals("tabgroup"))
			{	%>
				<tr>
					<td colspan="100" id="<%=id%>" style="<%=designerSelectedColorStr%>" <%=componentEvents%>>
						<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%" class="includeblock">
							<tr>
								<td colspan="100"><a href="" aria-live="polite" id="<%=id%>_label" class="text dl" onmouseover="return noStatus();" target="_blank"/><%=label%></a></td>
							</tr>
							<%component.renderChildComponents();%>
						</table>
					</td>
				</tr>
		<%	}
			else
			{	%>
				<div id="<%=id%>"  style="<%=designerSelectedColorStr%>" <%=componentEvents%>>
					<div class="includeblock">
						<a href="" aria-live="polite" id="<%=id%>_label" class="text dl" onmouseover="return noStatus();" target="_blank"/><%=label%></a>
						<div id="<%=id%>_container">
							<%component.renderChildComponents();%>
						</div>
					</div>
				</div>
		<%	}
		}
		else
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			el=document.getElementById("<%=id%>");
			if(el)
			{
				if("<%=designerSelectedColor%>"!="")
					el.style.border="1px solid <%=selBorderColor%>";
				else
					el.style.border="";
				el.style.backgroundColor="<%=designerSelectedColor%>";
			}
			el=document.getElementById("<%=id%>_label");
			if(el)
				el.innerHTML="<%=label%>";
		</script>]]></component>
		<%	component.renderChildComponents();
		}
	}
	else
	{
		component.renderChildComponents();
	}	%><%@ include file="../common/componentfooter.jsp" %>
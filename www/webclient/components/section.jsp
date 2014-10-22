<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
	String alignValue = component.getProperty("align");
	String height = component.getProperty("height");

	//Fix for Static Aligns
	if(defaultAlign.equalsIgnoreCase("right"))
	{
		if(alignValue != null){
			if(alignValue.equalsIgnoreCase("right"))
			{
				alignValue = "left";
			}
			else
			{
				if(alignValue.equalsIgnoreCase("left"))
					alignValue = "right";
			}
		}
	}

	String align = "";
	String label = component.getProperty("label");
	String border = component.getProperty("border");
	Section sectionControl = (Section)control;
	String expanded = sectionControl.isExpanded();
	String display = "";
	String decription = component.getProperty("description");

	if (designmode) //this should change, section will use specific events
	{
		componentEvents+="onmousedown='mxd_onmousedown(event,getElement(\""+id+"\"\""+component.getParentInstance().getRenderId()+"\"));' ";
		componentEvents+="onmouseup='mxd_onmouseup(event,getElement(\""+id+"\"));' ";
		componentEvents+="onmousemove='mxd_onmousemove(event,getElement(\""+id+"\"));' ";
		componentEvents+="onmouseover='mxd_onmouseover(event,getElement(\""+id+"\"));' ";
		componentEvents+="onmouseout='mxd_onmouseout(event,getElement(\""+id+"\"));' ";

		componentEvents+="ondragstart='cancelevent()'";
		componentEvents+="ondragenter='cancelevent()'";
		componentEvents+="ondragover='cancelevent()'";
		componentEvents+="ondragleave='cancelevent()'";
		componentEvents+="ondrop='cancelevent()'";
	}

	boolean visible = true;
	if(!expanded.equals("true") || !componentVisible)
	{
		display = "none";
		visible = false;
	}
	if (alignValue != null && alignValue.length() != 0)
		align = "align=\"" + alignValue + "\"";

	if (height != null && height.length() != 0)
		height = "height=\"" + height + "\"";

	boolean needsBorder = false;
	if(label != null && label.length() == 0 && border != null && border.equals("true"))
	{
		needsBorder = true;
	}
	 // if no label or border we don't want the label component to use the erroricons
	if(label == null || label.length() == 0)
	{
		control.setProperty("erroricon", "false");
	}
	boolean onTableDetails = control.getProperty("ontabledetails").equalsIgnoreCase("true");

	if(onTableDetails)
	{
		cssclass="std";
		if(label != null && label.length() != 0)
			cssclass += " stdpad";
	}
	if(label.equals(control.getLocalizedType()) && !showallcontrols)
	{
		label = "";
	}
	boolean sectionBorder = wcs.getSkin().length() != 0 && !wcs.getSkin().equals("classic") 
							&& label != null && label.length() != 0 && !label.equals(control.getLocalizedType()) 
							&& !onTableDetails;
	List children = component.getChildren();
	List controlChildren = control.getChildren();
	int childCount = children.size();
	Iterator i = children.iterator();
	while (i.hasNext())
	{
		ComponentInstance child = (ComponentInstance)i.next();
		if((child.getProperty("designonly").equalsIgnoreCase("true") && !designmode))
		{
			continue;
		}
		if(component.needsRender() && needsBorder)
		{
			%><td nowrap width="100%" class="section sbt">&nbsp;</td></tr><tr><%
		}
		if(component.needsRender())
		{
			if (designmode)
			{
				cssclass="sdm";
			}
			String labelledById =component.getLabelledByRenderId();
		String padding = "";
		if(wcs.useVerticalLabels()) {
			padding = "padding: 0px 5px;";
		}
%>
	<td id="<%=id%>" data-dojo-type="dojo.dnd.Source" aria-live="polite" <%=visible?"":"aria-hidden=\"true\""%> <%=(labelledById==null?"":"role=\"region\" aria-labelledby=\""+labelledById+"\"")%> <%=automationId%> <%=componentEvents%> <%=align%> style="<%=padding%>display:<%=display%>;white-space:nowrap;padding-bottom: 2px;" class="<%=cssclass%> <%if(sectionBorder){%>sectionb<%}%> container " valign="top" <%=height%> ><%
		}
		if(component.needsRender() && !WebClientRuntime.isNull(decription))
		{
			String descAutoId = "";
			if(automation)
				descAutoId = "automationid=\"" + realId + "_desc\"";	%>
			<table role="presentation" id="<%=id%>_desc_table">
				<tr>
					<td id="<%=id%>_desc" aria-live="polite" <%=descAutoId%> colspan="10" class="sdesc">
					<%= decription %>
					</td>
				</tr>
			</table>
<%		}
		child.render();
		if(component.needsRender())
		{
	%></td><%
		}
		if(component.needsRender() && needsBorder)
		{
%></tr><tr><td  width="100%" nowrap class="section sbb">&nbsp;</td><%
		}
	}
	boolean expandChanged = ((Section)control).hasExpandedChanged();
	if(!component.needsRender() && (expandChanged || component.hasPropertyChanged("cssclass") 
									|| component.hasPropertyChanged("border") || component.hasPropertyChanged("align")))
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		el = document.getElementById("<%=id%>");
		if(el)
		{
<%			if(expandChanged)
			{
				Section section = (Section)control;
				String sectionOuterId = section.getOuterId();
			%>
				try
				{
					var so = document.getElementById("<%=sectionOuterId%>");
					if(so && "<%=display%>" == "none")
					{
						var par=so.parentNode.parentNode.parentNode.parentNode;
						if(par.getAttribute("sc") == "true")
							par.style.width = par.clientWidth;
					}
				}
				catch(error)
				{
				}
				el.style.display="<%=display%>";
				el.setAttribute("aria-hidden","<%=!visible%>");
<%			}
			if(component.hasPropertyChanged("cssclass"))
			{	%>
				el.className="<%=cssclass%>";
<%			}
			if(component.hasPropertyChanged("border"))
			{	%>
				el.border="<%=border%>";
<%			}
			if(component.hasPropertyChanged("align"))
			{	%>
				el.align="<%=alignValue%>";
<%			}
			if(component.hasPropertyChanged("description"))
			{	%>
				el = document.getElementById("<%=id%>_desc");
				if(el)
					el.innerHTML="<%=decription%>";
<%			}	%>
		}
	</script><%="]]>"%></component>
<%	}
	((Section)control).setExpandedChanged(false);
%><%@ include file="../common/componentfooter.jsp" %>
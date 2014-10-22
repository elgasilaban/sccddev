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
	if (designmode) //this should change, section will use specific events
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
	}

	String cellspacing = component.getProperty("cellspacing");
	String borderSpacing = "";
	if(control.getType().equals("section"))
	{
		if(UAGENT.equals("OPERA") || UAGENT.equals("FIREFOX") || UAGENT.equals("SAFARI"))
		{
			cssclass += " borderSpacer";
		}
	}
	boolean hasChildren = control.hasChildElements();
	String renderControls = component.getProperty("rendercontrols");
	String width = component.getProperty("width");
	String display = "";
	String height = component.getProperty("height");
	String displayStyle = component.getProperty("displaystyle");
	if(!displayStyle.equals(""))
	{
		display="display:"+displayStyle+";";
	}
	String emptyControl = component.getProperty("emptycontrol");
	boolean noLayout = (component.getProperty("layout").equalsIgnoreCase("none") || !component.needsRender());
	String styleHeight = "";
	String styleWidth = "";
	if(!width.equals(""))
	{
		styleWidth = "width:"+width+";";
		width="width=\""+width+"\"";
	}
	List children = control.getChildren();
	ControlInstance firstChild = null;
	if(children!= null && children.size() > 0)
	{
		firstChild = (ControlInstance)control.getChildren().get(0);
		if(firstChild != null && firstChild instanceof psdi.webclient.controls.ButtonGroup) {
			//cssclass+=" borderSpacerWide";	
		}	

	}
	if(height.equals("") && controlType.indexOf("section")==0)
	{
		if(control instanceof SectionRow || (control instanceof Section && (firstChild != null && firstChild instanceof SectionRow)))
		{
			if(UAGENT.equals("SAFARI") || UAGENT.equals("CHROME"))
			{
				height="100%";
			}
		}
	}

	if(!height.equals(""))
	{
		styleHeight = "height:" + height + ";";
		height = "height=\"" + height + "\"";
	}
	if (designmode && emptyControl.equals("true"))
	{
		cssclass += " nsc ";
		cellspacing = "5";
	}
	String spacing = cellspacing;

	if(!WebClientRuntime.isNull(spacing))
	{
		spacing = "cellpadding='0' cellspacing='"+spacing+"'";
	}

	if(hasChildren)
	{
		if(!noLayout)
		{
			String hotkeyHandler = (control instanceof Table) ? "onkeydown=\"tableHotkey(event, this);\"" : "";
			String disabled_include = "";
			if(designmode && control.getType().equals("include"))
			{
				disabled_include="DISABLED";
			}
%><table role="presentation" control="true" id="<%=id%>" <%=automationId%> <%=disabled_include%> <%=width%> <%=height%> class="<%=cssclass%>" summary="" <%=hotkeyHandler%> style="<%=styleWidth%><%=styleHeight%><%=display%>;;vertical-align:top"><%}
		if(renderControls.equals(""))
		{
			component.renderChildrenControls();
		}
		else
		{
			Iterator i = control.getChildren().iterator();
			boolean needsRender = control.needsRender();
			while (i.hasNext())
			{
				ControlInstance child = (ControlInstance)i.next();
				if(child.getType().equals(renderControls))
				{
					if(needsRender)
					{
						child.setNeedsRender(true);
					}
					child.render();
				}
			}
		}
		if(!noLayout)
		{
%></table>
<%		}
	}
	else if(designmode)
	{
		if (component.needsRender())
		{
%>			<td>
			<table role="presentation" id="<%=id%>" <%=automationId%> width="100%" control="true" class="<%=cssclass%>" <%=componentEvents%>>
				<tr>
					<td height="20px" style="height:20px">
						&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
			</table>
			</td>
<%		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
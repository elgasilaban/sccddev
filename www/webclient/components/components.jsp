<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="java.util.Iterator"
%><%@page import="java.util.List"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String id = component.getRenderId();
	Alignment alignment = wcs.getAlignment();
	String controlType= control.getType();
	AppInstance app = control.getPage().getAppInstance();
	String IMAGE_PATH = wcs.getImageURL();
	boolean componentVisible = component.isVisible();
	String componentValue = null;
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	boolean accessibilityMode = wcs.getAccessibilityMode();
	boolean designmode = wcs.getDesignmode();
	String cssclass = component.getCssClass();
	
	String componentEvents = "";
	boolean showallcontrols = false; 
	%><%@ include file="../common/componentdesign.jsp" %><%
	
	boolean defaultRender = component.isDefaultRender();
	if(defaultRender)
	{
		%><%@ include file="../common/componentholder_begin.jsp" %><%
	}
	boolean hasChildren = component.hasChildren();
	boolean renderAll = component.getProperty("renderall").equalsIgnoreCase("true");
	boolean designControl = component.getProperty("designcontrol").equalsIgnoreCase("true");
	boolean isHorizontal = component.getProperty("layout").equalsIgnoreCase("horizontal");
	String ariaRole = component.getProperty("ariarole");
	if(ariaRole.length()>0)
	{
		ariaRole=" role='"+ariaRole+"' ";
	}
	boolean isVertical = !isHorizontal;
	boolean visible = componentVisible;
	String colspan = component.getProperty("colspan");
	String column = component.getProperty("column");
	int colNum = 0;
	try
	{
		colNum=("".equals(column))?0:Integer.parseInt(column);
	}
	catch(Exception ex)
	{
		colNum=0;
	}
	
	String controlContainer = control.getParentInstance().getType();
	if(isVertical && controlContainer.equals("controlcontainer"))
	{
		isVertical = false;
	}
	String componentCSS = component.getProperty("componentcss");
	String valign = component.getProperty("valign");
	String width = component.getProperty("width");
	String height= component.getProperty("height");

	String nowrap = (component.getProperty("nowrap").equals("true")) ? "nowrap=\"nowrap\"" : "";
	if(isHorizontal && !width.equals(""))
	{
		width=" width=\""+width+"\" ";
	}
	else
	{
		width = "";
	}

	boolean verticalLabels = wcs.useVerticalLabels() && component.getBoolean("makevertical") && 
		!control.getProperty("labellayout").equals("horizontal") &&	!control.getProperty("hidelabel").equals("true");
	if(!height.equals(""))
	{
		height=" height:"+height+";";
	}
	String vAlignStr="";
	if(valign.equals(""))
	{
		valign="top";
	}
	vAlignStr="vertical-align:"+valign+";";

	if(!componentCSS.equals(""))
	{
		cssclass+=" "+componentCSS;
	}
	if (designmode && designControl)
	{
		cssclass = "nsc";
	}

	boolean visibilitychanged = component.hasPropertyChanged("display") || control.hasPropertyChanged("display") || component.getProperty("visibilitychanged").equalsIgnoreCase("true");
	boolean noLayout = (component.getProperty("layout").equalsIgnoreCase("none") || !component.needsRender());
	if(noLayout && component.isOnTableRow() && Integer.parseInt(control.getRowNum()) < 0)
	{
		visibilitychanged = true; //isOnTableFilterRow() is not working
	}

	String display = "";
	String displayStyle = "";
	if(!visible)
	{
		display = "none";
	}
	if(!display.equals(""))
	{
		displayStyle="display:"+display+";";
	}
	if(!WebClientRuntime.isNull(colspan))
	{
		colspan="colspan='"+colspan+"'";
	}

	String align = component.getProperty("align");
	if (!WebClientRuntime.isNull(align))
	{
		if(alignment.rtl)
		{
			align = alignment.reverse(align);
		}
		if(!verticalLabels)
		{
			align = "align=\""+align+"\"";
		}
	}
	if(noLayout)
	{
		isHorizontal=false;
		isVertical=false;
	}
	boolean designonly=component.getProperty("designonly").equalsIgnoreCase("true");
	List children = component.getChildren();
	//BVR - TODO - must do this with the registry
	if(isVertical && control.getType().indexOf("box")>-1 && !control.isOnTableRow())
	{
        cssclass+=" leafspacer";
	}
    else if ( (wcs.useVerticalLabels() && control.getType().indexOf("blank")>-1))
    {
        cssclass+=" leafspacer";
    }

	if(!cssclass.trim().equals(""))	
	{
		cssclass="class=\""+cssclass+"\"";
	}
	if (children != null )
	{
		int childCount = children.size();
		Iterator i = children.iterator();
		int childCounter = 0;
		while (i.hasNext())
		{
			ComponentInstance child = (ComponentInstance)i.next();
			if(child == null)
			{
				continue;
			}
				
			if((child.getProperty("designonly").equalsIgnoreCase("true") && !designmode))
			{
				continue;
			}
			boolean internalAlign = false;
			if(align.equals(""))
			{
				align = child.getProperty("align");
				String labelAlign = align;
				if(child.getType().equals("label")) {
					labelAlign = child.getProperty("labelalign");	
					if(labelAlign.length()>0) {
						align = labelAlign;
					}
				}
				
				if (!WebClientRuntime.isNull(align))
				{
					if(alignment.rtl)
					{
						align = alignment.reverse(align);
					}
					if(!verticalLabels)
					{
						align = "align=\""+align+"\"";
					}
					internalAlign = true;
				}
			}

			String counterAutomationId ="";
			if(wcs.isAutomationOn())
			{
				counterAutomationId = "automationid=\"" + component.getId() + "_" + childCounter + "\"";
			}
			if(designmode)
			{	//This entire block is here due to the changing of IDs for each TD. We need the designer events to use the new IDs.
				// we also added compid to the TD so that we can use it in designer.js
				id = id + "_" + childCounter;
				componentEvents = "";
				%><%@ include file="../common/designerevents.jsp" %><%
				id = component.getId();
			}
			else
			{
				componentEvents="";
			}
			if(isHorizontal)
			{
				String childCssClass = child.getProperty("cssclass");
				if(WebClientRuntime.isNull(width) && children.size()==1 && childCssClass.indexOf("ts")!= -1)
				{
					width = "width=\"100%\"";
				}
				for(int col = 1; col < colNum; col++)
				{
%>					<td id="<%=id%>_<%=childCounter%>" <%if(designmode){%>compid="<%=id%>"<%}%>></td>
<%				}
				if(verticalLabels)
				{
					if(childCounter>0)
					{	%>
						<tr>
				<%	}
				}
%>				<td<%=ariaRole%> <%=componentEvents%> <%if(designmode){%>compid="<%=id%>"<%}%> <%=colspan%> <%=nowrap%><%
					%> <%=width%> id="<%=id%>_<%=childCounter%>" <%=counterAutomationId%> <%=align%> <%=cssclass%><%
					%> valign="<%=valign%>" style="<%=height%><%=vAlignStr%><%=displayStyle%><%=designerSelected%>"><%
			}
			else if(isVertical)
			{
				if(component.getType().equals("header"))
				{
%>					<tr class="aha">
						<td>
							<div id="<%=id%>_<%=childCounter%>_div" style="width:100%;height:100%;overflow-x:auto">
								<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">

<%				}
%>				<tr<%=ariaRole%> <%=componentEvents%> <%if(designmode){%>compid="<%=id%>"<%}%> control="true"<%
					%> id="<%=id%>_<%=childCounter%>" <%=counterAutomationId%> <%=cssclass%><%
					%> style="<%=vAlignStr%><%=displayStyle%><%=designerSelected%>">
<%			}
				child.setComponentContainerId(id+"_"+childCounter);
				child.render();
				if(internalAlign)
				{
					align="";
				}
				noLayout = (component.getProperty("layout").equalsIgnoreCase("none") || !component.needsRender());
				if(noLayout)
				{
					isHorizontal=false;
					isVertical=false;
				}
			if(isHorizontal)
			{
				%></td>
<%				if(verticalLabels)
				{
%>						</tr>
<%				}
			}
			else if(isVertical)
			{
%>				</tr>
<%				if(component.getType().equals("header"))
				{
%>								</table>
							</div>
						</td>
					</tr>
<%				}
				if(component.getType().equals("header"))
				{
%>					<script>
						var headerId = "<%=id%>_<%=childCounter%>";
						var headerScrollDivId = "<%=id%>_<%=childCounter%>_div";
					</script>
<%				}
			}
			else if(designmode && (controlType.equals("page") || control.hasPropertyChanged("designerselected")) || visibilitychanged)
			{
				String compType = "";
				if(wcs.getDebugLevel() > 0)
					compType = " comptype=\"" + component.getType() + "\"";

%>			<component id="<%=id%>_holder"<%=compType%> replacemethod="NONE"><%="<![CDATA["%><script>
<%				if(designmode && (controlType.equals("page") || control.hasPropertyChanged("designerselected")))
				{
%>					el = document.getElementById("<%=id%>_<%=childCounter%>");
					if(el)
						el.style.backgroundColor="<%=designerSelectedColor%>";
<%				}
				if(visibilitychanged)
				{
%>					addLoadMethod("hideShowElement('<%=id%>_<%=childCounter%>','<%=display%>')");
<%				}
%>			</script><%="]]>"%></component>
<%			}
			childCounter++;
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
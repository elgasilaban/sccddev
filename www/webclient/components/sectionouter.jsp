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
--%><%@ include file="../common/componentheader.jsp" %><%
//boolean hasComponents = component.hasComponents();
boolean hasChildren = component.hasChildren();
boolean renderAll = component.getProperty("renderall").equals("true");
boolean isHorizontal = component.getProperty("layout").equalsIgnoreCase("horizontal");
boolean isVertical = !isHorizontal;
String label = component.getProperty("label");
boolean visible = !component.getProperty("visible").equalsIgnoreCase("false") && !control.getProperty("display").equalsIgnoreCase("false");
boolean visibilitychanged = component.hasPropertyChanged("display") || control.hasPropertyChanged("display");
String display = "";
if(!visible)
	display = "none";
String colspan = component.getProperty("colspan");
if(!WebClientRuntime.isNull(colspan))
	colspan="colspan='"+colspan+"'";
String width = "";
width="width=\""+width+"\"";
String align = component.getProperty("align");
	//IBMBIDI Start
    //Fix for Static Aligns
    if(defaultAlign.equalsIgnoreCase("right"))
    {
    	if(align!=null){
    		if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}else{
				if(align.equalsIgnoreCase("left"))
					align = "right";
				}
		}
    }
    //IBMBIDI End
if (!WebClientRuntime.isNull(align))
	align = "align=\""+align+"\"";

String fixed = "";
//06-21158 The fixed table layout is causing a problem.  Since I don't know
//why this was originally placed here I'm just commenting out to correct issue.
//if(!label.equals(""))
//	fixed = "style=\"table-layout:fixed\"";
	boolean designonly=component.getProperty("designonly").equalsIgnoreCase("true");
	List children = component.getChildren();
	Section section = ((Section)control);
	if(section.getOuterId().equals(""))
		section.setOutertId(id);
	if(component.needsRender())
	{
		ControlInstance parent = (ControlInstance)control.getParentInstance(); 
		if(!component.rerendering())
		{	%>
		<tr>
			<td id="<%=id%>" <%=automationId%> control="true" style="vertical-align:top;">
	<%	}
		else
		{
			holderId=COMP_HOLDER_ID;
			%><%@ include file="../common/componentholder_start.jsp" %><%	
		}
		String automationIdInner = "";
        if(automation)
            automationIdInner="automationid=\""+realId+"_inner\"";
        String height = "";
        //if(control.getParentInstance().getType().equals("sectioncol"))
        	//height="height:100%;";
        %>
		<div id="<%=COMP_HOLDER_ID%>" aria-live="polite" <%=visible?"":"aria-hidden=\"true\""%> style="padding:0px;margin:0px;vertical-align:top;height: 100%;display:<%=display%>" <%if(!label.equals("")){%>class="sectionBS"<%}%> >
		<%if (designmode){%><div style="vertical-align:top;" class="sc"><%}%>
			<table id="<%=id%>_inner" role="presentation" <%=automationIdInner%> cellspacing="0" <%if(designmode){%>class="so sdm"<%}else{%>class="so <%=cssclass%>"<%}%> cellpadding="0" height="100%" width="100%" <%=fixed%> <%=componentEvents%> style="vertical-align:top;<%=height%><%=designerSelected%>" ><%	}

	int childCount = children.size();
	//width="";
	Iterator i = children.iterator();
	int childCounter = 0;

	while (i.hasNext())
	{
		ComponentInstance child = (ComponentInstance)i.next();
		if((child.getProperty("designonly").equalsIgnoreCase("true") && !designmode))
		{
			continue;
		}
		boolean internalAlign = false;
		if(align.equals(""))
		{
			align=child.getProperty("align");
			//IBMBIDI Start
    //Fix for Static Aligns
    if(defaultAlign.equalsIgnoreCase("right"))
    {
    	if(align!=null){
    		if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}else{
				if(align.equalsIgnoreCase("left"))
					align = "right";
				}
		}
    }
    //IBMBIDI End
			if (!WebClientRuntime.isNull(align))
			{
				align = "align=\""+align+"\"";
				internalAlign = true;
			}
		}
		if(component.needsRender())
		{
            String automationIdCount = "";
            if(automation)
                automationIdCount="automationid=\""+realId+"_"+childCounter+"\"";
			if(!child.hiddenByProperty())
			{
		%><tr id="<%=id%>_<%=childCounter%>" <%=automationIdCount%> style="vertical-align:top;display:<%=display%>;" > <%
			}
			childCounter++;
		}
			child.render();
			if(internalAlign)
				align="";
		if(component.needsRender())
		{
			if(!child.hiddenByProperty())
			{	%>
		</tr>
		<%	}
		}
	}
	boolean hasVisChildren = control.hasVisibleChildren();
	if(component.needsRender())
	{	%>
			</table>
		</div>
	<%	if(component.rerendering())
		{
			control.setNeedsRender(false);
			%><%@ include file="../common/componentholder_end.jsp" %><%
		}
		else
		{	%>
			</td>
		</tr>
	<%	}
	}
	else if(component.hasPropertyChanged("display") || control.hasPropertyChanged("display") || component.getProperty("visibilitychanged").equalsIgnoreCase("true"))
	{
		String compDisplay = "inline";
		if(!visible || !hasVisChildren)
			compDisplay="none";	%>
		<finalscript>
			addLoadMethod("hideShowElement('<%=COMP_HOLDER_ID%>','<%=compDisplay%>')");
		</finalscript>
<%	}	%><%@ include file="../common/componentfooter.jsp" %>
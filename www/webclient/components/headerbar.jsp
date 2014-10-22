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
	boolean onTableDetails = control.getProperty("ontabledetails").equalsIgnoreCase("true");
	String label = control.getProperty("text").trim();
	String headerheight = component.getProperty("headerheight");
	String width = "width:100%;";
	if(label==null || label.equals(""))
		label = control.getProperty("label").trim();
	boolean border = control.getProperty("border").equalsIgnoreCase("true");
	String type = component.getProperty("type");
	boolean rounded = Boolean.valueOf(component.getProperty("rounded")).booleanValue();
	boolean inverted = Boolean.valueOf(component.getProperty("inverted")).booleanValue();
	String tableclass = "";
	if(inverted)
	{
		cssclass="hbi";
		tableclass="hbit";
	}
	componentDisplay = "";
	String rightEnd = component.getProperty("rightend");
	String rightEndClass = component.getProperty("rightendclass");
	
	boolean tableExpanded = false;
	if(control instanceof Table && ((Table)control).getFlagValue(DataBean.TABLE_EXPANDED))
	{
		tableExpanded = true;
	}
	
	if((!designmode && !componentVisible) || (!tableExpanded && inverted)) 	// don't show bottom header (inverted=true) if !tableExpanded
	{
		componentDisplay="display:none";
	}
	String innerCss = "";
	if(onTableDetails)
		cssclass="tdhb";
	boolean labelIsType = label.startsWith(control.getLocalizedType()) && designmode;
	if(controlType.equalsIgnoreCase("section"))
	{
		if(label.equals("") || labelIsType)
		{
			if(onTableDetails)
			{
				cssclass="tdhbnb";
			}
			else
				cssclass="hbnb";
		}
		if(border && !designmode)
		{
			cssclass="hbb";
		}
	}
	if(!WebClientRuntime.isNull(rightEnd))
	{
		innerCss = cssclass;
		cssclass="";
	}
	ControlInstance parentControl = (ControlInstance)control.getParentInstance();

	String tdleftAutoId="";
	String tdmiddleAutoId="";
	String tdrightAutoId="";
	if(automation) {
		tdleftAutoId="automationid=\""+realId+"_left\"";
		tdmiddleAutoId="automationid=\""+realId+"_middle\"";
		tdrightAutoId="automationid=\""+realId+"_right\"";
	}
	boolean dialogType = controlType.equalsIgnoreCase("dialog") || controlType.equalsIgnoreCase("messagebox");
	if(component.needsRender())
	{
		control.setProperty("headerid",id);
		if (rounded || type.equalsIgnoreCase("portlet"))
		{ //don't put space before the following <table> (it will break some layouts)
	%><table id="<%=id%>" <%=automationId%> width="100%" style="margin:0px;<%=componentDisplay%>" class="<%=tableclass%>" role="presentation">
			<tr>
<%				if (wcs.getSkin().equals("classic") || wcs.getSkin().equals(""))
				{
%>				<td id="<%=id%>_left" <%=tdleftAutoId%> class="<%=cssclass.trim()%>l" width="6" height="<%=headerheight%>" style="padding:0px;">&nbsp;</td>
<%				}
%>				<td id="<%=id%>_middle" <%=tdmiddleAutoId%> class="<%=cssclass%>" valign="middle" align="<%=defaultAlign%>" width="*">
					<table role="presentation" class="" width="100%">
						<tr>
							<td valign="center" align="<%=defaultAlign%>" style="padding:0px;white-space:nowrap;" class="dh mh">
								<table role="presentation"  width="100%">
									<tr>
<%		}
		else
		{
			boolean onTable = control instanceof Table;
			String hotkeyHandler = (onTable) ? "onkeydown=\"tableHotkey(event, this);\"" : "";
%>		<td id="<%=id%>" <%if(!label.equals("") || onTable){%>class="<%if(dialogType && !onTable){%>d<%}%>hbouter"<%}%> <%=automationId%> style="padding:0px;<%=componentDisplay%>;white-space:nowrap;" <%=hotkeyHandler%> role="presentation">
			<table cellspacing="0" cellpadding="0" style="<%=width%>" class="<%=tableclass%>" role="presentation">
				<tr>
<%		}
		boolean showEnds = false;
		if((label.equals("") && controlType.equalsIgnoreCase("section")) || cssclass.equals("hbb"))
		{
			if(cssclass.equals("hbb"))
			{
				String td1AutoId="";
				if(automation)
					td1AutoId="automationid=\""+realId+"_1\"";
%>				<td id="<%=id%>_1" <%=td1AutoId%> valign="top" class="<%=cssclass%>" width="100%" <%=componentEvents%>><%=label%></td>
<%			}
			else if(!onTableDetails)
			{
%>				<td valign="top" style="font-size:1px;" width="100%"></td>
<%			}
		}
		else
		{
			List children = component.getChildren();
			if (children != null)
			{
				int childCount = children.size();

				if(childCount<=1)
				{
					width="";
				}
				else
				{
					//width="width=\""+(100/childCount)+"%\"";
				}
				Iterator i = children.iterator();
				int xx = 0;
				if(!onTableDetails && !dialogType && !labelIsType)
				{
					showEnds=true;
					if(!inverted)
					{
%>						<td class="h_l"></td>
<%					}
					else
					{
%>						<td class="h_il"></td>
<%					}
				}
				String childCss="";
				if(!dialogType)
				{
					childCss=cssclass+" hbsh";
				}
				else
				{
					childCss = "dhbsh";
				}
				while (i.hasNext())
				{
					ComponentInstance child = (ComponentInstance)i.next();
					String align = "";
					if(controlType.equalsIgnoreCase("section") )
					{
						align = "middle";
					}
					else
					{
						align = child.getProperty("align");
					}

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
					String childCssClass = child.getProperty("cssclass");
					childCssClass=childCss +" "+ childCssClass;
					if (childCssClass.indexOf("ts") != -1 && child.getType().equals("blankline"))
						width = "width=\"100%\"";

					if (!align.equals(""))
						align = "align=\""+align+"\"";

					String headerAutoId="";
					if(automation)
						headerAutoId="automationid=\""+realId+"_header_"+xx+"\"";
%>					<td id="<%=id%>_header_<%=xx%>" <%=headerAutoId%> <%=align%> class="<%=childCss%>" valign="middle" style="padding:0px;white-space:nowrap;" <%=width%>><%
					child.setComponentContainerId(id+"_header_"+xx);
					xx++;
					child.render();
					%></td>
<%					if(controlType.equalsIgnoreCase("section") && onTableDetails)
					{
						break;  //don't process the rest of the children
					}
				}
			}
		}
		if(rounded)
		{
%>								</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
<%				if (wcs.getSkin().equals("classic") || wcs.getSkin().equals(""))
				{
%>				<td id="<%=id%>_right" <%=tdrightAutoId%> class="<%=cssclass.trim()%>r" width="6" height="<%=headerheight%>">&nbsp;</td>
<%				}
%>			</tr>
		</table><%
		}
		else
		{
			if(!WebClientRuntime.isNull(rightEnd))
			{
%>				<td style="padding:0px;" class="<%=innerCss%>" id="<%=id%>_right" <%=tdrightAutoId%>>
					<img alt="" src="<%=IMAGE_PATH%><%=rightEnd%>" style="margin:0px;display:inline" />
				</td>
<% 			}
			else if(!WebClientRuntime.isNull(rightEndClass))
			{
%>				<td style="padding-<%=defaultAlign%>:0px;" class="<%=rightEndClass%>" id="<%=id%>_right" nowrap <%=tdrightAutoId%>>
				</td>
<% 			}
			if(showEnds)
			{
				if(!inverted)
				{
%>					<td class="h_r"></td>
<%				}
				else
				{
%>					<td class="h_ir"></td>
<%				}
			}
%>				</tr>
			</table>
		</td>
<%		}
	}
	else
	{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		var el = document.getElementById("<%=id%>");
		if(el)
		{
<%			if((!designmode && !componentVisible) || (!tableExpanded && inverted))
			{
%>			el.style.display="none";
<%			}
			else
			{
%>			el.style.display="";
<%			}
			if(component.hasPropertyChanged("cssclass"))
			{
%>			el.className="<%=cssclass%>";
<%			}
			if(component.hasPropertyChanged("border"))
			{
%>			el.border="<%=border%>";
<%			}
%>		}
<%		
		if(component.hasPropertyChanged("cssclass"))
		{
%>			el = document.getElementById("<%=id%>_left");
			if(el)
				el.className="<%=cssclass.trim()%>_left";
			el = document.getElementById("<%=id%>_middle");
			if(el)
				el.className="<%=cssclass.trim()%>_middle";
			el = document.getElementById("<%=id%>_1");
			if(el)
				el.className="<%=cssclass%>_1";
			el = document.getElementById("<%=id%>_right");
			if(el)
				el.className="<%=cssclass.trim()%>_right";
<%		}
		if(component.hasPropertyChanged("text"))
		{
%>			el = document.getElementById("<%=id%>_1");
			if(el)
				el.innerHTML="<%=label%>";
<%		}
%>	</script><%="]]>"%></component>
<%		List children = component.getChildren();
		if (children != null )
		{
			int childCount = children.size();
			Iterator i = children.iterator();
			while (i.hasNext())
			{
				ComponentInstance child = (ComponentInstance)i.next();
				boolean internalAlign = false;
				child.render();
			}
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
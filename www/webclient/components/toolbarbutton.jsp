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
BaseInstance parentControl = control.getParentInstance();
if(component.needsRender())
{
	String mboName = component.getProperty("mboname");
	if (mboName == null || mboName.isEmpty())
	{
		String buttonType = control.getProperty("buttontype");
		String itemValue = control.getProperty("key");
		String itemSubpos = control.getProperty("subposition");
		String itemActionKey = control.getProperty("accesskey");
		String type = control.getProperty("elementtype");
		String image = control.getProperty("image");
		String text = control.getProperty("text");
		String mxevent = control.getProperty("mxevent");

		boolean disabled = ((ToolbarButton)control).isDisabled() || (!designmode && !componentVisible);

		if("SAVE".equals(itemValue) && parentControl instanceof psdi.webclient.controls.ToolbarActions)
		{
			((psdi.webclient.controls.ToolbarActions)parentControl).setSaveButtonId(id);
		}

		String itemTitle = text;
		if (!itemActionKey.isEmpty())
		{
			itemActionKey = app.getHotkeys().addHotkey(wcs, itemActionKey, id, itemValue);

			boolean isRTL = BidiUtils.isGUIMirrored(langcode);
			String bidiSep = isRTL ? BidiUtils.RLM : "";
			itemTitle = text + bidiSep + "    " + bidiSep + itemActionKey;
			if(isRTL)
				itemTitle = BidiUtils.enforceBidiDirection(itemTitle, isRTL ? BidiUtils.RTL_DIRECTION : BidiUtils.LTR_DIRECTION);
		}

		if (!mxevent.isEmpty())
		{
			component.setProperty("mxevent", mxevent);
		}
		else
		{
			component.setProperty("mxevent", itemValue);
		}


		//Button in the menubar
		if(buttonType.equalsIgnoreCase("menu") && (itemSubpos.equals("0") || !type.equalsIgnoreCase("option")))
		{
			if (!image.contains("atb"))
			{
				image = "ab_" + image;
			}
%>			<li id="<%=id%>" role="presentation" onmouseover="appendClass(this,'onhover')" onmouseout="removeClass(this,'onhover')" <%if(disabled){%> disabled="true" aria-disabled="true"<%}%>><%
				%><a id="<%=id%>_text" role="button" onkeydown="itemAKey(event,this)" <%=automationId%><%
						%> onfocus="setCurrentfocusId(event, this);appendClass(this.parentNode,'onhover')" onblur="removeClass(this.parentNode,'onhover')" <%
						%><%if(disabled){%> disabled="true" aria-disabled="true"<%}%> class="<%=textcss%> <%=cssclass%> <%if(!disabled){%>on<%}else{%>off<%}%>"<%
							if(!designmode)
							{
								%> href="javascript:setClickElementId('<%=id%>_text');sendEvent('click','<%=id%>','<%=itemValue%>');"<%
							}
							%>><%
					if(!image.isEmpty())
					{
						%><img alt="" id="<%=id%>_image" src="<%=IMAGE_PATH + image%>" /><%
					}
						%><%=text%><%
				%></a><%
				if(type.equalsIgnoreCase("HEADER"))
				{
					String menuAutomationId = "";
					if(automation)
					{
						String itemPos = control.getProperty("position");
						menuAutomationId="automationid=\""+realId+"_search_dropdown_"+itemPos+"_menuarrow\"";
					}
					itemTitle = itemTitle.trim();
					%><a id="<%=id%>_dropdown" onkeydown="itemAKey(event,this)" lc="<%=id%>"<%
							%> onfocus="setCurrentfocusId(event, this);appendClass(this.parentNode,'onhover')" onblur="removeClass(this.parentNode,'onhover')" <%
							%><%if(disabled){%> disabled="true"<%}%> class="<%if(!disabled){%>on<%}else{%>off<%}%>"<%
							if(!designmode)
							{
								%> href="javascript:setClickElementId('<%=id%>_dropdown');sendEvent('click','<%=id%>','<%=mxevent%>')"<%
							}
							%>><%
						%><img role="presentation" id="<%=id%>_dropdown_menuarrow" <%=menuAutomationId%> alt="<%=itemTitle%> <%=wcs.getMessage("ui","menu")%>" src="<%=IMAGE_PATH%>atb_popoutmenu.gif" /><%
					%></a><%
				}
			%></li>
<%		}
		//Button in the toolbar
		else if((buttonType.equalsIgnoreCase("toolbar") || buttonType.equalsIgnoreCase("dyntoolbarmenu") || buttonType.equalsIgnoreCase("dyntoolbar")) && (text != null && !text.isEmpty()))
		{
			String url = control.getProperty("url");
			String href;
			if(url != null && !url.isEmpty())
			{
				href = "window.open(\""+url+"\")";
			}
			else
			{
				href = "setClickElementId(\""+id+"\");sendEvent(\"click\",\""+id+"\",\"\")";
			}
			boolean needsSep = ((ToolbarButton)control).needsSep();
			String className="";
			if(needsSep)
			{
				className=" class=\"tbSep\" style=\"padding-"+defaultAlign+": 6px\""; //style='background: url("+IMAGE_PATH+"toolbar/toolbarsep.gif) no-repeat 3px 2px;padding-left:6px'";
			}
%>			<li role="presentation"<%=className%> id="<%=id%>" ctype="toolbarbutton" <%if(disabled){%>disabled="disabled"<%}%>><%
				%><a role="button" id="<%=id%>_anchor" href='javascript:<%=href%>' <%=automationId%> onkeydown="itemAKey(event,this)" title="<%if(!accessibilityMode){%><%=itemTitle%><%}%>"<% 
						%> onfocus="setCurrentfocusId(event, this);appendClass(this,'onhover')" onblur="removeClass(this,'onhover')" <%
						%><%if(disabled){%> disabled="true" aria-disabled="true"<%}%> eventtype="<%=mxevent%>" class="<%if(!disabled){%>on<%}else{%>off<%}%>" ><%
					%><img role="presentation" tabindex="-1" id="<%=id%>_image" src="<%=IMAGE_PATH%><%=image%>" alt=""/><%
				%></a><%
			%></li>
<%		}
	}
}%><%@ include file="../common/componentfooter.jsp" %>
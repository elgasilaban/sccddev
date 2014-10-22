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
%><%@page import="psdi.webclient.controls.Tab"%><%
%><%@page import="psdi.webclient.controls.TabGroup"%><%
	if(component.needsRender() && component.isVisible())
	{
		%><%@ include file="../common/exceptioncontainericon.jsp" %><%
		TabGroup tabGroup = ((TabGroup)control.getParentInstance());
		String format = tabGroup.getProperty("format");
		Tab currentTab = tabGroup.getCurrentTab();
		String currentTabType = currentTab.getProperty("type");
		boolean hideForFormat = (format.equalsIgnoreCase("carddeck") || (format.equalsIgnoreCase("navigation") && (currentTabType.equals("list") || control.getProperty("type").equals("list"))));
		if (!hideForFormat || designmode)
		{
			String labelcss = component.getProperty("labelcss");

			componentEvents=" onmouseover=\"return noStatus()\"";
			if(designmode)
			{
				componentEvents+=" onmousedown=\"stopBubble(event);\" href=\"javascript: parent.sendEvent('selectcontrol','designer','" + id + "');\"";
			}
			else
			{
				componentEvents+=" href=\"javascript: sendEvent('click','" + id + "','');\"";
			}
			String tabLabel = component.getProperty("label");
			String tabnum = (String)session.getAttribute("RENDER_tabNum");
			int tabNum = 0;
			if(tabnum != null)
			{
				tabNum = Integer.parseInt(tabnum);
			}

			String tabOnOff = "on";
			String tabIndex = "-1"; 
			if(((Tab)control).isCurrent())
			{
				tabOnOff = "on";
				tabIndex = "0";
			}
			else
			{
				tabOnOff = "off";
			}
			if (designSelected && designmode)
			{
				tabOnOff += "sel";
			}

			if(componentDisplay.equals("display:inline"))
			{
				componentDisplay="";
			}

			String automationIdAnchor = "";
			if(automation)
			{
				automationIdAnchor=" automationid=\""+realId+"_anchor\" ";
			}

			String tabImage = "";
			if(format.equalsIgnoreCase("wizard"))
			{
				tabImage = "<img src='"+IMAGE_PATH+"wizard_step.gif' border='0' align='absmiddle' alt=''/>";
			}	%>
			<li role="presentation" id="<%=id%>" ctype="tab"><%
				%><a role="tab" tabindex="<%=tabIndex%>" id="<%=id%>_anchor"<%=automationIdAnchor%> title="<%=tabLabel%>" <%
						if(((Tab)control).isCurrent())
						{
							%> onfocus="setCurrentfocusId(event, this);"<%
						}
						else
						{
							%> onfocus="setCurrentfocusId(event, this);appendClass(this,'offhover')" onblur="removeClass(this,'offhover')"<%  
						}
						%> class="text tablabel<%=tabOnOff%> <%=tabOnOff%> <%=labelcss%>" <%
						%> onkeydown="if(event.keyCode==KEYCODE_SPACEBAR){sendEvent('click','<%=id%>','');cancelEvent(event);}else {itemAKey(event,this)}"<%
						%><%=componentEvents%>><%
					if(designmode)
					{
						%><span style="cursor:pointer" onmouseover="this.style.textDecoration='underline';" onmouseout="this.style.textDecoration='';" <%
							%> onmousedown="stopBubble(event)" onclick="parent.sendEvent('selecttab','designer','<%=id%>');cancelEvent(event);"><%
					}
					%><%@ include file="../common/uistatusindicator.jsp" %><%=error_icon%><%=tabImage%>&nbsp;<%=tabLabel%><%
					if(designmode)
					{
						%></span><%
					}
				%></a><%
			%></li><%
			tabNum++;
			session.setAttribute("RENDER_tabNum", tabNum + "");
		}
	}	%><%@ include file="../common/componentfooter.jsp" %>
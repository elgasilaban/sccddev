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
	ToggleImage toggleImage = (ToggleImage)component;
	String state = (String)toggleImage.getState();
	boolean showLabel = component.getProperty("showlabel").equalsIgnoreCase("true");
	String label = "";
	String falseactive = component.getProperty("falseactive");
	String mxeventvalue = component.getProperty("mxeventvalue");
	String tooltip = toggleImage.getMessage();
	if(tooltip == null)
	{
		tooltip = "";
	}
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String longdesc=component.getProperty("longdesc");
	String align="";
	String margin="margin:0px;";
	String display =component.getProperty("display");
	String src = toggleImage.getSource();
	String imageType = "";
	if(WebClientRuntime.isNull(src) || (src.indexOf(".gif")==-1 && src.indexOf(".jpg")==-1 && src.indexOf(".png")==-1))
		imageType=".gif";
	boolean detailbutton=false;
	tabindex="0";
	String mxevent= component.getProperty("mxevent");
	if (!width.equals(""))
		width = "width=\""+width+"\"";
	if (!height.equals(""))
		height = "height=\""+height+"\"";
	String onclick = "";
	int clickableState=component.getClickState();
	if(cssclass.equalsIgnoreCase("di"))
		cssclass+=" "+USERAGENT+"_"+cssclass;
	boolean disabled = true;
	if(falseactive.equalsIgnoreCase("true") || (state.equals("true") && clickableState==ComponentInstance.CLICKABLE_ON))
		tabindex="0";
	else
		tabindex="-1";

	disabled = false;
	if(clickableState!=ComponentInstance.CLICKABLE_ON || isMasked)
	{
		disabled = true;
		cssclass+="opacity_30";
	}

	if(component.isOnTableRow())
	{
		align="align=\"absbottom\"";
		margin="margin:0px;margin-top:2px;";
	}
	else
	{
		if(detailbutton)
		{
			%>&nbsp;<%
		}
	}
	if(WebClientRuntime.isNull(src))
	{
		tabindex="-1";
		src="blank.gif";
		if (!designmode)
			componentEvents="";
	}    
	String active = "";
	if(clickableState!=ComponentInstance.CLICKABLE_ON || isMasked)
	{
		tabindex="-1";
		active="active=\"0\"";
	}
	if(WebClientRuntime.isNull(mxeventvalue))
	{
		mxeventvalue=state;
	}
	
	mxeventvalue="ev=\""+mxeventvalue+"\"";
	String href= "javascript: void(0);";
	String foc= "";
	%><a<%
			if(!disabled)
			{
				%> <%=foc%><%
				%> href="<%=href%>"<%
			}
			%> ctype="toggleimage"<%
			%> <%=mxeventvalue%> tabindex="<%=tabindex%>" <%=active%> compid="<%=id%>" <%=componentEvents%> <%if(control.getType().equals("table-selectrow")){%>aria-role="checkbox" aria-checked="<%=state.equals("true")%>"<%}%><%if(!accessibilityMode){%>title="<%=WebClientRuntime.makesafevalue(tooltip)%>"<%}%><%
			if(disabled)
			{
				%> disabled="disabled"<%
			}%>><%
			JSONObject fieldInfo = ((BoundComponentInstance)component).getFieldInfo();
			if(mxevent!=null && mxevent.equals("toggleselectrow"))
			{
				fieldInfo = new JSONObject();
				fieldInfo.put("eventpriority", 2);
			}
		%><img id="<%=id%>" <%
			if(component.isAsyncEnabled())
			{
				%> async='1'<%
			}
			if(fieldInfo!=null)
			{
				%> fldInfo='<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>'<%
			}
			%> aria-disabled="true" aria-hidden="true" <%=automationId%> tabindex="-1" border="0" class="ti <%=cssclass%>"<%
			%> src="<%=IMAGE_PATH%><%=src%><%=imageType%>" source="<%=src%>" imgtype="<%=imageType%>" <%=mxeventvalue%><%
			%> align="top" style="display:<%=display%>;<%=margin%>" <%=align%> alt="<%=WebClientRuntime.makesafevalue(tooltip)%>" <%=width%> <%=height%>/><%
	%></a>
<%	if(showLabel)
	{	
		label = toggleImage.getLabel();	
		String newAutomationId = "";
		if(automation)
			newAutomationId="automationid=\""+realId+"_label\"";
%>		&nbsp;<span id="<%=id%>_label" <%=newAutomationId%> class="text"><%=label%></span>
<%	}
%><%@ include file="../common/componentfooter.jsp" %>
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
	String readonly = "";
	String ariaString = "";
	String readOnlyString = wcs.getMaxMessage("ui", "readonly").getMessage();
	String unCheckedString = wcs.getMaxMessage("ui", "unchecked").getMessage();
	String checkedString = wcs.getMaxMessage("ui", "checked").getMessage();
	String cbString = wcs.getMaxMessage("ui", "checkbox").getMessage();
	String cbSize = component.getProperty("cbsize");
	if(!WebClientRuntime.isNull(cbSize))
	{
		cbSize = " height='" + cbSize + " width='" + cbSize + "'";
	}

	String title = component.getProperty("title");

	boolean isReadOnly = false;
	boolean isMasked = false;
	BoundComponentInstance boundComponent = null;
	String maskedTitle = "";
	boolean invalidBinding = false;
	JSONObject fieldInfo = null;
	if(component instanceof BoundComponentInstance)
	{
		invalidBinding = ((BoundComponentInstance)component).getString() == BoundComponentInstance.INVALID_BINDING; 
		boundComponent = (BoundComponentInstance)component;
		isReadOnly = (boundComponent.isReadOnly() || invalidBinding || designmode);
		isMasked = boundComponent.isMasked();
		if(isMasked)
		{
			maskedTitle = wcs.getMaxMessage("ui", "maskedtitle").getMessage();
		}
		fieldInfo = boundComponent.getFieldInfo();
		if(fieldInfo != null)
		{
			fieldInfo.put(BoundComponentInstance.EVENT_PRIORITY, BoundComponentInstance.PRIORITY_FLUSH);
		}
	}
	String value = "";
	%><%@ include file="../common/componentexception.jsp" %><%
	String[] titleSepParam = {""};
	String titleSep = " ";
	if(!accessibilityMode)
	{
		titleSep = wcs.getSettingsProperty("titlesepformat", titleSepParam);
		if(titleSep == null)
		{
			titleSep = ":";
		}
		titleSep += " ";
	}
	String cancelClickBubble = "";
	if(component.isOnTableRow())
	{
		cancelClickBubble=" cancelEvent(event); ";
	}

	String requiredString = wcs.getMaxMessage("ui", "required").getMessage();
	boolean customImages = false;
	String cursor = "default";
	if(!isReadOnly)
	{
		readOnlyString = "";
	}
	else
	{
		readOnlyString = " " + readOnlyString;
		readonly = "readonly";
		if (!accessibilityMode)
		{
			tabindex = "-1";
		}
	}

	// image name pattern '{imagename}{check:unchecked}.{imagetype}'
	// needs one checked image and one unchecked image
	String checked = "unchecked";
	if (((BoundComponentInstance)component).getBoolean() && !designmode)
	{
		checked = "checked";
	}
	if(exceptionType != ComponentInstance.EXCEPTION_NONE) {
		exc="exc=\""+exceptionType+"\"";
		if(checked.equals("checked")) {
			checked = "unchecked";
		} else {
			checked = "checked";
		}
	}
	String imageName = component.getProperty("imagename");
	String imageType = component.getProperty("imagetype");
	String imgType = "";
	if (WebClientRuntime.isNull(imageName))
	{
		if(component.isOnTableRow())
		{
			imageName = "table_cb_";
		}
		else
		{
			imageName = "cb_";
		}
		if (WebClientRuntime.isNull(imageType))
		{
			imageType = "gif";
		}
	}
	else
	{
		customImages = true;
		cursor = "pointer";
	}

	if (WebClientRuntime.isNull(imageType))
	{
		imageType = "gif";
	}
	else
	{
		imgType = "imgtype=\"" + imageType + "\"";
	}
	String src = IMAGE_PATH;
	if(isMasked)
	{
		src += imageName + "masked" + "." + imageType;
		title += titleSep + maskedTitle;
	}
	else
	{
		String currentCheckedString = unCheckedString;
		if(!checked.equalsIgnoreCase("checked"))
		{
			checked = "unchecked";
		}
		else
		{
			currentCheckedString=checkedString;
		}

		String cb = "";
		if(accessibilityMode)
		{
			cb=" "+cbString;
		}
		title+=cb+titleSep+currentCheckedString;
		if(!customImages)
		{
			src +=imageName+checked+readonly+"."+imageType;
		}
		else
		{
			src +=imageName+checked+"."+imageType;
		}

		if(!WebClientRuntime.isNull(component.getProperty("msgtrue")) && !WebClientRuntime.isNull(component.getProperty("msgfalse")))
		{
			title=((Checkbox)component).getCustomTooltip();
		}
	}
	String mxEventJSHandler = component.getProperty("mxeventjshandler");
	%>
	<table role="presentation" id="<%=id%>_tb" border="0" cellspacing="0" cellpadding="0"<%
			%> style="margin:0px;vertical-align:middle;<%=invalidBinding?"":"border:0px;" %>display:inline<%if(wcs.getUserAgent()!=wcs.AGENT_IE){%>-table;<%}%>;"<%
			%> class="<%=invalidBinding?"iu ":"" %><%=exceptionClass%>_b">
		<tbody>
			<tr>
<%			if(invalidBinding)
			{
%>				<td class="text"><%=BoundComponentInstance.INVALID_BINDING%></td>
<%			}
			if(exceptionType != ComponentInstance.EXCEPTION_NONE)
			{
				%><td><img id="<%=id%>_err" <%=excImageClass%><%=excMouseEvents%> alt="" src="<%=IMAGE_PATH%><%=exceptionImage%>"></td><%
			}
%>				<td valign="middle"><%
					%><a role="checkbox" <%=ariaString%> aria-checked="<%=checked.equalsIgnoreCase("checked")%>"<%
							%> href="javascript: void(0)" id="<%=id%>" ctype="checkbox" class="cb09" <%=exc%><%
							%> title="<%if(!accessibilityMode || component.isOnTableRow()){%><%=WebClientRuntime.makesafevalue(title)%><%}%>"<%
							%> tabindex="<%=tabindex%>" style="cursor:<%=cursor%>" imgid="<%=id%>_img"<%
							if(isReadOnly)
							{
								%> aria-readonly="true"<%
							}
							if(mxEventJSHandler.length() != 0)
							{
								%> mxejse="<%=mxEventJSHandler%>"<%
							}
							if(component.isAsyncEnabled())
							{
								%> async='1' <%=asyncevents%><%
							}
							if(fieldInfo != null)
							{
								%> fldInfo='<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>'<%
							}
							%>><%
						%><img border="0" alt="<%if(!accessibilityMode){%><%=WebClientRuntime.makesafevalue(title)%><%}%>"<%
							%> tabindex="-1" align="texttop" id="<%=id%>_img"<%
							%> <%=automationId%> class="<%=cssclass%>" src="<%=src%>" <%=cbSize%> <%=imgType%><%
							%> imgname="<%=imageName%>" checked="<%=checked%>" style="cursor:<%=cursor%>"<%
							%> readonly="<%=isReadOnly%>" onfocus="this.parentNode.focus()"/><%
					%></a><%
				%></td>
			</tr>
		</tbody>
	</table>
<%@ include file="../common/componentfooter.jsp" %>
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
	String rows = component.getProperty("rows");
	String cols = component.getProperty("columns");
	String selectonfocus = component.getProperty("selectonfocus");
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	boolean hidetooltip = component.getBoolean("hidetooltip");
	String requiredString = " " + wcs.getMaxMessage("ui","required").getMessage() + " ";
	boolean escapeAmpersand = control.getBoolean("escapeampersand");
	String value =  "";
	String align = "";

	if(WebClientRuntime.isNull(width) && WebClientRuntime.isNull(height))
	{
		int rowscale = Integer.parseInt(component.getProperty("rowscale"));
		int colscale = Integer.parseInt(component.getProperty("columnscale"));
		if(WebClientRuntime.isNull(rows))
			rows=Integer.toString(rowscale * 2);
		else
			rows=Integer.toString(rowscale * Integer.parseInt(rows));

		if(WebClientRuntime.isNull(cols))
			cols=Integer.toString(colscale * 30);
		else
			cols=Integer.toString(colscale * Integer.parseInt(cols));
	}
	else
	{
		// For a mobile application, when this text area is used in place of the rich text editor the
		// control will be a RichTextControl.  In that case, shrink the width and height values in
		// half so it looks better on a mobile device.
		if (control instanceof RichTextControl && !((RichTextControl)control).isRichTextSupported())
		{
			if (width.length() != 0)
			{
				try {
					int widthInt = Integer.parseInt(width) / 2;
					width = String.valueOf(widthInt);
				}
				catch (NumberFormatException e)
				{
				}
			}
			if (height.length() != 0)
			{
				try {
					int heightInt = Integer.parseInt(height) / 2;
					height = String.valueOf(heightInt);
				}
				catch (NumberFormatException e)
				{
				}
			}
		}
		rows=height;
		cols=width;
	}

	boolean hadInvalidXMLChars = false;
	if(!isMasked)
	{
		value = boundComponent.getString();
		if(WebClientRuntime.hasInvalidXMLChars(value))
		{
			hadInvalidXMLChars = true;
		}
	}
	else
	{
		value="";
	}

	String titleValue = value;
//bidi-hcg-AS start
	String[] bidiTagAttributes = {"","",""};
	if(BidiUtils.isBidiEnabled()) 
	{
		String bidiSep = BidiUtils.getDelimeterPrefix(langcode);
		if (controlType.equals("whereclause")) 
		{    //bidi-hcg-SC
			bidiTagAttributes[0] = BidiUtils.buildTagAttribute(value,"LTR","SQL",true);
			bidiTagAttributes[1] = "SQL";
			bidiTagAttributes[2] = "LTR";
		}
		else
			bidiTagAttributes = BidiClientUtils.getTagAttributes(component,app,value,true);
		titleValue = BidiUtils.processComplexexpression(titleValue,bidiTagAttributes[1],WebClientRuntime.getMXSession(session));		
		titleValue = BidiUtils.enforceBidiDirection(titleValue,bidiTagAttributes[2]);
		value = BidiUtils.processComplexexpression(value,bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
		align = BidiClientUtils.getTextAlignmentStyle(bidiTagAttributes[1],WebClientRuntime.getMXSession(session));   //bidi-hcg-SC
		titleSep = bidiSep + titleSep + bidiSep;
	}
//bidi-hcg-AS end	
	title = WebClientRuntime.makesafevalue(title);
	titleValue = WebClientRuntime.makesafevalue(titleValue);
	if(escapeAmpersand)
		value = WebClientRuntime.makesafeWithAmpersand(value);
	else
		value = WebClientRuntime.makesafevalue(value);
	if(accessibilityMode)
	{
		titleValue="";
		if(isRequired)
			requiredString+=" "+titleSep;
	}
	if(!isRequired)
		requiredString="";

	ComponentInstance linkBack = null;
	boolean isQuery = false;
	JSONObject fieldInfo = null;
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		linkBack = boundComponent.getLinkBack();
		isQuery = boundComponent.isQuery();
		fieldInfo = boundComponent.getFieldInfo();
	}
	if(boundComponent.getDataValueInError() != null)
	{
		value = boundComponent.getDataValueInError();
		boundComponent.setDataValueInError(null);
		control.getPage().put("currentfocusid",id);
		if(component.isOnTableRow())
			control.getPage().put("currentfocusrow",control.getParentInstance().getRowNum());
%>		<script>
			addLoadMethod("input_forceChanged(document.getElementById('<%=id%>'))");
			addLoadMethod("document.getElementById('<%=id%>').setAttribute('changed_by_user','false')");
		</script>
<%	}
	if(!WebClientRuntime.isNull(title) && !WebClientRuntime.isNull(value) || !WebClientRuntime.isNull(maskedTitle))
		title+=titleSep;
	if (!BidiUtils.isBidiEnabled())
		title="title=\""+title+" "+titleValue+requiredString+maskedTitle+"\"";
	else
		title = "title=\"" + BidiUtils.enforceBidiDirection(title+" "+titleValue+requiredString+maskedTitle,BidiUtils.getLayoutOrientation(langcode)) + "\""; 
	if(selectonfocus.equals("false"))
	  cssclass += " ns";
	String maxlength = "maxlength=\"" + length + "\"";
	String cur = WebClientRuntime.getWebClientProperty("webclient.ldcursorpos","begin");
	String focuslocation = component.getProperty("focuslocation");
	if(!focuslocation.equalsIgnoreCase("end") && cur.equalsIgnoreCase("begin"))
		cur = "cursor='0'";
	else
		cur = "";

	boolean isDate = (dataType == MXFormat.DATE || dataType == MXFormat.TIME || dataType == MXFormat.DATETIME);
	if (isDate || isNumeric || component.getProperty("inputmode").equals("query") || component.getProperty("inputmode").equals("queryrequired") )
		maxlength = "";	
	if(hidetooltip && !accessibilityMode)
		title = "";

    String helpImage = "";
	%><%@ include file="../common/componentexception.jsp"%><%
	if(hadInvalidXMLChars && exceptionType == ComponentInstance.EXCEPTION_NONE)
	{
		exceptionType = BaseInstance.EXCEPTION_INFO;
		exceptionClass+=" fld_info";
		exc="exc=\""+exceptionType+"\"";

		JSONObject err = new JSONObject();
		err.put("compid", boundComponent.getId());
		err.put("exception", wcs.getMaxMessage("ui", "ctrlCharsRemoved").getMessage());
		err.put("exceptiontype", BaseInstance.EXCEPTION_INFO);
		fieldInfo.put("err", err);
	}

    if(component.isHoversActive() && !control.isOnTableFilterRow())
    {
        %><%@ include file="../common/extendedtooltip.jsp" %><%
    }
	%><textarea id="<%=id%>" <%=ariaString%> <%=automationId%> class="fld <%=cssclass%> <%=exceptionClass%>" <%=exc%><%
		%> <%=readOnly%> escamp="<%=escapeAmpersand%>" ctype="textarea" tabindex="<%=tabindex%>" <%=asyncStr%> <%=asyncevents%><%
		%> <%=bidiTagAttributes[0]%> <%=exc%> <%=maxlength%> <%=cur%> <%=componentEvents%> startatzero="true" <%=title%><%
		%> style="overflow:auto;width:<%=cols%>px;height:<%=rows%>px;<%=align%>;"<%
		if(!control.isOnTableFilterRow())
		{
			%> work="1"<%
		} 
		if(!isQuery){
			%> dType="<%=dataType%>"<%
		}
		if(fieldInfo != null)
		{
			%> fldInfo="<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>"<%
		}
		if(linkBack != null)
		{
			%> linkedimage="<%=linkBack.getRenderId()%>"<%
		}
		%>><%=value%></textarea><%=helpImage%><%

	boolean onPopup = control.getPage() != wcs.getCurrentApp().getPageStack().firstElement();
	//Set the input up as the one that has changed if data was not valid
	if (!boundComponent.isDataValid())
	{
		if (app.getCurrentPage().getComponentInstance(id) != null)
		{
			%><script>
				el=document.getElementById("<%=id%>");
				if (el != null)
					input_changed(null,el);
			</script><%
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
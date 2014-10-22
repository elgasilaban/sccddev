<%--
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-M19
 *
 * (C) COPYRIGHT IBM CORP. 2006
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%><%@ include file="../common/componentheader.jsp" %><%
	String rows = component.getProperty("rows");
	String cols = component.getProperty("columns");
	boolean accepthtmltags = control.getProperty("accepthtmltags").equalsIgnoreCase("true"); 
	
	String selectonfocus = component.getProperty("selectonfocus");
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	boolean hidetooltip = Boolean.valueOf(component.getProperty("hidetooltip")).booleanValue();
	String requiredString = " "+wcs.getMaxMessage("ui","required").getMessage()+" ";
	boolean resizeable = Boolean.valueOf(component.getProperty("resizeable")).booleanValue();
	String value =  "";
	String align = "";    //bidi-hcg-SC

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
		rows=height;
		cols=width;
	}

	if(!isMasked && !accepthtmltags) //bidi-hcg-AS (moved from below, apparent bug in original code //fpb
		value = WebClientRuntime.removeQuotes(boundComponent.getString());
	else if (!isMasked)
		value = boundComponent.getString();

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
	if (!accepthtmltags)   //fpb
    	value = WebClientRuntime.makesafevalue(value);
	else
		// Ampersands are escaped on the client side before the value is sent to the server.  We need to unescape them before sending
		// back to the client.  This is done so that values such as &lt; don't get turned into < by the server.  Escaping the value 
		// turns it into &amp;lt; which the server ignores and we can unescape it on the way out turning it back into &lt; so it works correctly
		// in the client.
		value = value.replaceAll("&amp;", "&");
	
	//Substitution for url parms
	String hostName = request.getServerName();
    String hostPort = request.getServerPort() + "";
    String hostProtocol = request.getScheme();     
	 
	value = value.replaceAll("\\$protocol\\$", hostProtocol);
	if (hostPort!=null && hostPort.length()>0)
		value = value.replaceAll("\\$port\\$", hostPort);
	else 
		value = value.replaceAll("\\$port\\$", "80");
	value = value.replaceAll("\\$hostname\\$", hostName);
	
	if(accessibilityMode)
	{
		titleValue="";
		if(isRequired)
			requiredString+=" "+titleSep;
	}
	if(!isRequired)
		requiredString="";

	ComponentInstance linkBack = null;
	if(component instanceof BoundComponentInstance)
		linkBack = ((BoundComponentInstance)component).getLinkBack();

    if(boundComponent.getDataValueInError() != null)
    {
        value = boundComponent.getDataValueInError();
        boundComponent.setDataValueInError(null);
   		control.getPage().put("currentfocusid",id);
   		if(component.isOnTableRow())
   			control.getPage().put("currentfocusrow",control.getParentInstance().getRowNum());
%>
		<script>
			addLoadMethod("MAINDOC.input_forceChanged(document.getElementById('<%=id%>'))");
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
		title="";
	
	String ctype = "textarea";
	String textarea_tag = "textarea";
	String preformated_style = "";
	if (accepthtmltags)  { //fpb
		//need to do this with div because if not it shows the background as rows 
		if (isReadOnly)
			preformated_style  = "background-repeat:no-repeat;";
	    title="";
        textarea_tag = "div";
        ctype="";  //used to bind events 
        //preformated_style   = "border: 1px solid black;";
	}
	%>
	<<%=textarea_tag%>
			id="<%=id%>"
             <%=automationId%>
			class="<%=cssclass%>"
			<%=readOnly%>
			ctype="<%=ctype%>"
			tabindex="<%=tabindex%>"
			<%=bidiTagAttributes[0]%> 
			style="display:inline-block;white-space:normal;overflow:auto;width:<%=cols%>px;height:<%=rows%>px;<%=align%><%=preformated_style%>"			
			<%=componentEvents%> startatzero="true" <%=title%> <%if(linkBack!=null){%>linkedimage="<%=linkBack.getRenderId()%>"<%}%>
			<%=maxlength%> <%=cur%>> 
				 		
	<%
	if (!accepthtmltags)  { //fpb
	%>
		<%=value%></<%=textarea_tag%>>
	<% } else {  //enclose in table because ancestor td sets nowrap. In IE text does not wrap.   %>
		<table style="font-size:100%">
      <tr>
       <td>
       <%=value%>
       </td>
		</tr>
		</table>
       </<%=textarea_tag%>>
	<% } %>	
 	
	<% 	boolean onPopup = control.getPage()!=wcs.getCurrentApp().getPageStack().firstElement();
		if(resizeable && !onPopup)
		{	%>
	<img id="<%=id%>_res" src="<%=IMAGE_PATH%>corner_resizer.gif" onmousedown="moveable_onmousedown(event, this)" movemethod="resizeTextArea" releasemethod="setTextAreaSize" ownerid="<%=id%>" class="dh" alt="Resize" movecursor="default" onpopup="<%=onPopup%>"/>
	<script>
			addLoadMethod("<%if(hiddenFrame){%>MAINDOC.<%}%>positionTextAreaResizer('<%=id%>')");
	</script>
	<%	} 				
			
	//Set the input up as the one that has changed if data was not valid
	if (!boundComponent.isDataValid())
	{
		if (app.getCurrentPage().getComponentInstance(id) != null)
		{     %>
			<script>
				el=MAINDOC.getElement("<%=id%>");
				if (el != null)
					MAINDOC.input_changed(null,el);
			</script>
	<%	}
	}   %><%@ include file="../common/componentfooter.jsp" %>
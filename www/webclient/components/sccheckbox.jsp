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
 * Clone of Checkbox.jsp which uses a String instead of a Boolean to store value.
 *
--%><%@ include file="../common/simpleheader.jsp" %><%

	String readonly = "";
	String readOnlyString = wcs.getMaxMessage("ui","readonly").getMessage();
	String unCheckedString = wcs.getMaxMessage("ui","unchecked").getMessage();
	String checkedString = wcs.getMaxMessage("ui","checked").getMessage();
	String cbString = wcs.getMaxMessage("ui","checkbox").getMessage();
	String cbSize =  component.getProperty("cbsize");;
	if(!WebClientRuntime.isNull(cbSize))
		cbSize = " height='"+cbSize+" width='"+cbSize+"'";

	String title = component.getProperty("title");

	boolean isReadOnly = false;
	boolean isMasked = false;
	BoundComponentInstance boundComponent = null;
	String maskedTitle = "";
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		isReadOnly = boundComponent.isReadOnly();
		isMasked = boundComponent.isMasked();
		if(isMasked)
			maskedTitle=wcs.getMaxMessage("ui","maskedtitle").getMessage();
	}
	String[] titleSepParam = {""};
	String titleSep = " ";
	if(!accessibilityMode)
	{
		titleSep=wcs.getSettingsProperty("titlesepformat", titleSepParam);
		if(titleSep==null)
			titleSep=":";
		titleSep+=" ";
	}
	String cancelClickBubble = "";
	if(component.isOnTableRow())
		cancelClickBubble=" cancelEvent(event); ";

	String requiredString = wcs.getMaxMessage("ui","required").getMessage();
	boolean customImages = false;
	String cursor = "default";
	if(!isReadOnly)
	{
		readOnlyString="";
	}
	else
	{
		readonly = "readonly";
		if (!accessibilityMode) {
			tabindex="-1";
		}
	}

	// image name pattern '{imagename}{check:unchecked}.{imagetype}'
	// needs one checked image and one unchecked image
	String checked = "unchecked";
	//Replaced this line to support String instead of boolean
	//if (((BoundComponentInstance)component).getBoolean() && !designmode)
    String value = ((BoundComponentInstance)component).getString();
	if (value!=null && value.equalsIgnoreCase("1") && !designmode)
		checked = "checked";

	String imageName= component.getProperty("imagename");
	String imageType= component.getProperty("imagetype");
	String imgType = "";
	if (WebClientRuntime.isNull(imageName))
	{
		if(component.isOnTableRow())
			imageName = "table_cb_";
		else
			imageName = "cb_";
		if (WebClientRuntime.isNull(imageType))
			imageType = "gif";
	}
	else
	{
		customImages=true;
		cursor="pointer";
	}

	if (WebClientRuntime.isNull(imageType))
		imageType = "gif";
	else
		imgType="imgtype=\""+imageType+"\"";
	String src = IMAGE_PATH;
	if(isMasked)
	{
		src +=imageName+"masked"+"."+imageType;
		title+=titleSep+maskedTitle;
	}
	else
	{
		String currentCheckedString =unCheckedString;
		if(!checked.equalsIgnoreCase("checked"))
			checked = "unchecked";
		else
			currentCheckedString=checkedString;

		String cb = "";
		if(accessibilityMode)
			cb=cbString;
		title+=" "+cb+" "+readOnlyString+titleSep+currentCheckedString;
		if(!customImages)
			src +=imageName+checked+readonly+"."+imageType;
		else
			src +=imageName+checked+"."+imageType;

		if(!WebClientRuntime.isNull(component.getProperty("msgtrue")) && !WebClientRuntime.isNull(component.getProperty("msgfalse")))
			title=((Checkbox)component).getCustomTooltip();
	}
	%>
<a href="javascript: void(0)" id="<%=id%>" tabindex="<%=tabindex%>" ctype="checkbox" title="<%=title%>" style="cursor:<%=cursor%>" <%=componentEvents%> imgid="<%=id%>_img"><img border="0" alt="<%=title%>" tabindex="-1" align="texttop" id="<%=id%>_img" <%=automationId%> class="<%=cssclass%>" src="<%=src%>" <%=cbSize%> <%=imgType%> imgname="<%=imageName%>" checked="<%=checked%>" style="cursor:<%=cursor%>" readonly="<%=isReadOnly%>" onfocus="this.parentNode.focus()"/></a>

<%@ include file="../common/componentfooter.jsp" %>
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
	//String servPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	String servPath = wcs.getMaximoRequestContextURL();
    String imagePath = "";
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String thumbnailflag = component.getProperty("thumbnail");
	String label = component.getProperty("label");
	// unsure of this... why did we use this?
	String catchedImageSrc = ((RecordImage)component).getCachedImageSrc();
	String imageSource = ((RecordImage)component).getImageSrc()[0];
	String altText = component.getProperty("alttext");
	if (altText.equals(""))
	{
		altText = ((RecordImage)component).getImageSrc()[1];
	}
	String imageSize = "";
	imageSize = "height=\""+height+"\" width=\""+width+"\" ";
	if(thumbnailflag.equals("true"))
	{
		if(!designmode)
			componentEvents+=" onclick=\"sendEvent('click', '"+id+"', ' ')\"";
		imagePath = IMAGE_PATH + "img_placeholder.jpg";
		imageSize = "height=\""+height+"\" width=\""+width+"\" ";
	}
	else
		imagePath = IMAGE_PATH + "img_placeholderEnlarged.jpg";
	
	if (imageSource !=null)
	{
		imagePath = servPath + imageSource;
	} 
	else 
	{
		MaxMessage message = wcs.getMaxMessage("jspmessages","noimageavailable");
		if(message!=null)
			altText = message.getMessage();
		else
			altText="";
	}
	imagePath += "?" +wcs.getUISessionUrlParameter();
	String margin="";
	String notThumbnail = "";
	if(!thumbnailflag.equals("true"))
	{
		notThumbnail = "tabindex=\"-1\" style=\"padding:0px;overflow:auto;width:"+width+"; hight:"+height+"\" class=\"recordimagediv\" align=\"center\" ";
	}
	else
	{	
		margin="margin-"+defaultAlign+":3px;";
	}
	
	if(component.needsRender()) 
	{	
        String newAutomationId = "";
        if(automation)
            newAutomationId="automationid=\""+id+"_img\"";%>
		<div id="<%=id%>" <%=automationId%> <%=notThumbnail%>>
			<img id="<%=id%>_img" <%=newAutomationId%> aria-live="polite" <%=imageSize%> src="<%=imagePath%>" style="cursor:pointer;display:inline;margin:0px;<%=margin%>" alt="<%=altText %>" title="<%=altText%>" <%=componentEvents%>  align="top">
		</div>
<%	}	
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		el=document.getElementById("<%=id%>_img");
		if(el)
		{
			el.src="<%=imagePath%>";
			el.alt="<%=altText%>";
			el.title="<%=altText%>";
		}
	</script>]]></component>
<%	}
	%><%@ include file="../common/componentfooter.jsp" %>
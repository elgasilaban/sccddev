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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "org.w3c.dom.*,psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.util.*, java.util.*, java.io.*" %><%@ include file="../common/constants.jsp" %><%
	final String BROWSER_KEYWORD = "#{BROWSER}";
	String USERAGENT = request.getHeader("User-Agent").toUpperCase();
	String archive = "../applets/attachimageapplet.jar";
	if (USERAGENT.indexOf("MAC OS")>-1)
	{
		archive = "applets/attachimageapplet.jar";
	}
	
	if(USERAGENT.indexOf("MSIE")>-1)
		USERAGENT="IE";
	else
		USERAGENT="OTHER";
	
	
	// Because we are being loaded in an Iframe, the current component will likely be wrong as the rendering will have continued past
	// the true control and component that we need.  The IDs for those are passed in as parameters by the IFrame.  We do need a control
	// temporarily to get a reference to the page we are on.  From the page, we can use the ID passed in by the IFrame to get a reference
	// to the correct control and component instances.
	ComponentInstance tempComponent = ComponentInstance.getCurrent(request);
	WebClientSession wcs = tempComponent.getWebClientSession();
	String servletBase = wcs.getMaximoRequestContextURL()+"/webclient";
	AppInstance app = wcs.getCurrentApp();
	
	// Now get the correct component and control instances.
	ComponentInstance component = tempComponent.getPage().getComponentInstance(request.getParameter("componentId"));
	ControlInstance control = component.getControl();
	
	MPEncodedFormData mpData = null;
	if (MPFormData.isRequestMultipart(request))
	{
		// get the multipart data
		try
		{
		    mpData = new MPEncodedFormData(request);
		}
		catch(psdi.util.MXException mxe)
		{
			wcs.addWarning(mxe);
		}
	}	
%>

<%@page import="psdi.webclient.controls.UploadImageAttachment"%>
<html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<BASE HREF="<%= servletBase%>/utility">
	<link rel=stylesheet type="text/css" href="../webclient/css/maximo.css">
	<script>
		/**
		 * Puts the image and image name if specified on the IMPORT form and 
		 * then submits the form.
		 */
		function importOnSubmit(event) {
			// Get the name specified by the user if there is one.
			var namedInputs = parent.document.getElementsByName('clipboardimagename');
			if (namedInputs && namedInputs.length > 0)
			{
				var namedInput = namedInputs[0];
				document.IMPORT.userSuppliedName.value = namedInput.value;
			}
			
			// Grab the image from the clipboard.
			grabImage();
			
			// Now submit using the original submit for the form.
			document.IMPORT.oldSubmit(event);
		}
		
		/**
		 * We need to replace the submit() function on the IMPORT form because 
		 * when submit() is called, it doesn't trigger an onsubmit event.  Therefore,
		 * by replacing submit(), we can intercept it and do what we need to do.
		 */
		function setupOnSubmit() {
			// Store the original submit() so we can call it when we're finished.
			document.IMPORT.oldSubmit = document.IMPORT.submit;
			document.IMPORT.submit = importOnSubmit;
		}
		
		/**
		 * Gets the image from the clipboard and puts it in the encodedjpg element on the
		 * IMPORT form.
		 */
		function grabImage() {
			var obj = document.getElementById('attachimage');
			try {
				var clipboardimage = obj.getClipboardImageURI();
				document.IMPORT.encodedjpg.value = clipboardimage;
			}
			catch (e)
			{
				//console.log("Error caught while attemptiong to grab image: " + e);
			}
		}
	</script>
</head>
<body style="background: transparent; background-color: transparent"<% if (mpData == null) {%> onLoad="setupOnSubmit()" <%} %>>
<% if (mpData == null) { 
	// Only include the attach image applet if there is no image available.
	if (USERAGENT.equalsIgnoreCase("IE")) { %>
	  	<object id="attachimage" 
	  		name="attachimage" 
	  		classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" 
	  		codebase="http://java.sun.com/update/1.6.0/jinstall-6-windows-i586.cab"
	  		mxpart="applet"
	  		id="attachimage" 
	  		type="application/x-java-applet" 
	  		width="1" 
	  		height="1" >
	<% } 
	else { // Firefox and others %>
		<object classid="java:psdi.webclient.applet.attachimage.AttachImageApplet"
			id="attachimage"
			name="attachimage"
			mxpart="applet"
			archive="<%=archive%>"
			type="application/x-java-applet;version=1.6"
			width="1" 
			height="1" >
	<% } %>
			<PARAM NAME="type" 				VALUE = "application/x-java-applet;version=1.6" >
			<PARAM NAME="CODE" 				VALUE=psdi.webclient.applet.attachimage.AttachImageApplet >
			<PARAM NAME="ARCHIVE" 			VALUE="<%=archive%>" >
			<PARAM NAME=NAME 				VALUE="attachimage" >
			<PARAM NAME="scriptable" 		VALUE="true" >
			<PARAM NAME="mayscript" 		VALUE="true" >
			<SPAN STYLE="color:red">Clipboard Image Capture failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
						No Java 2 SDK, Standard Edition Support for applet
		</object>
 <%}%>
<form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post" onsubmit="alert('onsubmit called');">
	<input type="hidden" NAME="event" VALUE="addattachment">
	<input id="file" type="hidden" name="encodedjpg" value="NOIMAGE">
	<input id="userSuppliedName" type="hidden" name="userSuppliedName">
</form>
</body><%
if (MPFormData.isRequestMultipart(request))
	{
		if(mpData!=null)
		{
			// Get the file name if one was specified by the user.
			String fileName = mpData.getFileName();
			if (fileName == null)
			{
				// No file name specified, so use a default based on the date and time.
				fileName = ((UploadImageAttachment)control).getDefaultImageAttachmentName();
			}
			UploadFile df = new UploadFile(fileName, fileName, "", mpData.getFileOutputStream());
	
			if (df != null)
		    {
				app.put("doclinkfile", df);
				String pageId = control.getPage().getId();
				%>
				<script>
					parent.sendEvent("dialogok", "<%=pageId%>", "");
				</script>
				<%			
			}
	    }
	    else
	    {	
	    %>
			<script>
	    	parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
			</script>
		<%
	    }
	}	%>
</html>
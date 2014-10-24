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
	String disabledStr = "";
	String componentStyle ="";
	//String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	final String BROWSER_KEYWORD = "#{BROWSER}";
	String USERAGENT = request.getHeader("User-Agent");

	if(USERAGENT.toUpperCase().indexOf("GECKO")>-1 || USERAGENT.toUpperCase().indexOf("OPERA")>-1)
		USERAGENT="FIREFOX"; //OPERA seems to render more like firefox
	else if(USERAGENT.toUpperCase().indexOf("MSIE")>-1)
		USERAGENT="IE";
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	String servletBase = wcs.getMaximoRequestContextURL();
	AppInstance app = wcs.getCurrentApp();
		String componentId = request.getParameter("componentId");
	String controlId = request.getParameter("controlId");
	ControlInstance uploadfileControl = wcs.getControlInstance(controlId);
	String title = "";
	if(uploadfileControl!=null)
		title = uploadfileControl.getProperty("label");
	String eventName = "";
	if (uploadfileControl !=null)
	{
		eventName = uploadfileControl.getProperty("event");
		if (eventName.equals("uploadimage"))
		{
	    		if (((psdi.webclient.controls.UploadFile) uploadfileControl).hasImageAttached())
    			{
   	       		disabledStr = "disabled ";
    				componentStyle = "background: #DEDEDE; color:#000000; -moz-opacity:.6;filter:alpha(opacity=60);";
    			}
		}
	}
%>
<%String defaultAlign="left";
	String reverseAlign="right";
	boolean rtl = false;
	String realDir = "ltr";
	String fSize = USERAGENT.equals("FIREFOX")? "34" : "35";
	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	String langcode = s.getUserInfo().getLangCode();
	if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE"))
	{
		defaultAlign="right";
		reverseAlign="left";
		realDir = "rtl";
		rtl = true;
	}
	String hPosition = (realDir == "rtl"? "right:" : "left:");
	hPosition += "0";		
	String skin = wcs.getSkin();
	%><html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<BASE HREF="<%= servletBase%>/webclient/utility">
	<link rel=stylesheet type="text/css" href="../webclient/<%=skin%>css/<%if(rtl){%>RTL<%}%>maximo.css">
</head>
<body style="background: transparent; background-color: transparent">
<form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post">
   	<input type="hidden" NAME="componetId" VALUE="<%=componentId%>">
   	<input type="hidden" NAME="controlId" VALUE="<%=controlId%>">
	<table width="100%" cellspacing="0" align="center" class="maintable">
		<tr>
			<td align="<%=defaultAlign%>">
<%	if(BidiUtils.isBidiEnabled()) { //bidi-hcg-SC %>
				<input id="file" name="value" type="file" size="35" class="text" dir="<%= realDir %>" value="" <%=disabledStr%> accept="text/css" onchange="parent.processChange(this)" onkeydown="return parent.onFileKeyDown(this);" onmousedown="return parent.onFileMouseDown(this);" onfocus="parent.fileOnFocus(this)">
				<input id="faked_file" size="<%=fSize%>" class="text" value="" accept="text/css" <%=disabledStr%> style="position: absolute; <%=hPosition%>; z-index: 2; background-color: #C0C0C0" dir="ltr" onfocus="parent.fakeOnFocus(this)" onkeydown="return parent.onFakeKeyDown(event,this);" oncopy="parent.processCopy(this)" onpaste="return false;" oncut="return false;" type="text">
<% } else { %>
				<input id="file" type="file" name="value" title="<%=title%>" size="35" class="text" <%=disabledStr%> style=<%=componentStyle%> value="" onclick="if(!parent.undef(parent.firingControl) && parent.firingControl.id==this.id){parent.sendEvent('clientonly','clickFileButton', this.id)}">
<% } %>
			</td>
		</tr>
	</table>
</form>
</body>
<%	if (MPFormData.isRequestMultipart(request))
	{
	    if ((uploadfileControl !=null)&& (uploadfileControl.getPage()!=null))
	    {
			String pageId = uploadfileControl.getPage().getId();
			WebClientEvent wce = new WebClientEvent (eventName, uploadfileControl.getType(), "", wcs);
			wce.setSourceControl(uploadfileControl);
			wcs.setRequest(request);
			wcs.setResponse(response);
		    int status = wcs.handleEvent(wce);
			if (status ==EventQueue.PROCESS_NEXT_EVENT )
			{
				%>
					<script>
						parent.sendEvent("dialogok", "<%=pageId%>", "");
					</script>
				<%
			}
			else
			{
				%>
					<script>
	    				parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
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
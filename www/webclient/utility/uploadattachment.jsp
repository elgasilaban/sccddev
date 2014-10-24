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
	//String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"/webclient";;
	final String BROWSER_KEYWORD = "#{BROWSER}";
	String USERAGENT = request.getHeader("User-Agent");
	if(USERAGENT.toUpperCase().indexOf("GECKO")>-1 || USERAGENT.toUpperCase().indexOf("OPERA")>-1)
		USERAGENT="FIREFOX"; //OPERA seems to render more like firefox
	else if(USERAGENT.toUpperCase().indexOf("MSIE")>-1)
		USERAGENT="IE";
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	String controlId = request.getParameter("controlId");
	ControlInstance control = wcs.getControlInstance(controlId);
	String title = "";
	if(control!=null)
		title = control.getProperty("label");
	String servletBase = wcs.getMaximoRequestContextURL()+"/webclient";
	AppInstance app = wcs.getCurrentApp();
	String fName = "";
	MPFormData mpData = null;
	if (MPFormData.isRequestMultipart(request))
	{
		// get the multipart data
		try
		{
		    mpData = new MPFormData(request);
			fName = mpData.getFullFileName();
		}
		catch(psdi.util.MXException mxe)
		{
			wcs.addWarning(mxe);
		}
	}	
%><%String defaultAlign="left";
	String reverseAlign="right";
	String realDir = "ltr";
	boolean rtl = false;
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
%>
<html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<BASE HREF="<%= servletBase%>/utility">
	<link rel=stylesheet type="text/css" href="../webclient/<%=skin%>css/<%if(rtl){%>RTL<%}%>maximo.css">
</head>
<body style="background: transparent; background-color: transparent">
<form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post">
	<input type="hidden" NAME="event" VALUE="addattachment">
	<table width="100%" cellspacing="0" align="center" class="maintable">
		<tr>
			<td align="<%=defaultAlign%>">
			<%	if(BidiUtils.isBidiEnabled()) { /*bidi-hcg-SC*/
					String bfName = fName;
					if (bfName != null && bfName.length() > 1)
						bfName = BidiUtils.processComplexexpression(bfName, BidiUtils.PATH, null);
			%>
				<input id="file" name="value" type="file" class="text" size="35" dir="<%= realDir %>" value="<%=fName%>" accept="text/css" onchange="parent.processChange(this)" onkeydown="return parent.onFileKeyDown(this);" onmousedown="return parent.onFileMouseDown(this);" onfocus="parent.fileOnFocus(this)">
				<input id="faked_file" size="29" value="<%=bfName%>" accept="text/css" style="position: absolute; <%=hPosition%>;top:0; z-index: 2; background-color: #C0C0C0" dir="ltr" onfocus="parent.fakeOnFocus(this)" onkeydown="return parent.onFakeKeyDown(event,this);" oncopy="parent.processCopy(this)" onpaste="return false;" oncut="return false;" type="text">  
			<%	} else { %>						
				<input id="file" type="file" title="<%=title%>" class="text" name="value" size="35" value="<%=fName%>" accept="text/css" onclick="if(!parent.undef(parent.firingControl) && parent.firingControl.id==this.id){parent.sendEvent('clientonly','clickFileButton', this.id)}">
			<%	} %>				
			</td>
		</tr>
	</table>
</form>
</body><%
if (MPFormData.isRequestMultipart(request))
	{
		if(mpData!=null)
		{
			UploadFile df = new UploadFile(mpData.getFileName(), mpData.getFullFileName(), mpData.getFileContentType(), mpData.getFileOutputStream());
			if(mpData.getFileOutputStream().size() == 0)  
            {
                Object[] param= {mpData.getFullFileName()};
                MXApplicationException except = new MXApplicationException("iface", "InvalidFileName", param);
				String msg = except.getLocalizedMessage();
			%>
				<script>
              	 	alert("<%=msg%>");
					parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
                </script>
            <%
				df = null;
            }
            else { 
				boolean uploadChecked = control.getDataBean().getBoolean("upload");
				boolean pathExists = mpData.getFullFileName().indexOf("\\") >= 0;
				//Check if we are trying to attach a file that has no path
				if( (!uploadChecked) && (!pathExists) ) 
				{ //We are trying to attach a file, without uploading but the path isn't present, so invalid
	                MXApplicationException except = new MXApplicationException("doclink", "browseunsupported");
					String msg = except.getLocalizedMessage();
				%>
					<script>
	              	 	alert("<%=msg%>");
						parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
	                </script>
	            <%
					df = null;
	            }
			}
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
			alert('send event');
	    	parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
			</script>
		<%
	    }
	}	%>
</html>
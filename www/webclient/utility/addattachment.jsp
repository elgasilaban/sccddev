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
--%><%@ page import="java.util.*,psdi.webclient.system.controller.* , psdi.webclient.beans.doclinks.* "%>

<%
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();

	if (MPFormData.isRequestMultipart(request))
	{
		// get the multipart data, the 10 as a parameter is the maximum file size in MB.
	    MPFormData mpData = new MPFormData(request, 10);
	
		DocLinkFile df = new DocLinkFile(mpData.getFileName(), mpData.getFullFileName(), mpData.getFileContentType(), mpData.getFileOutputStream());

		if (df != null)
	    {
			SessionContext sc = (SessionContext)session.getAttribute("sessioncontext");
			AppInstance app = sc.getCurrentApp();
			app.put("doclinkfile", df);

			String pageId = app.getCurrentPageId();
%>
			<script>
				parent.sendEvent("dialogok", "<%= pageId %>", "");
			</script>
<%			
	    }
	}

%>
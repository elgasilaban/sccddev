<%@ page
	import="com.ibm.tivoli.srm.screencapturer.webclient.controller.UploadScreenshotHelper"
	contentType="text/xhtml;charset=UTF-8"
%><%
	UploadScreenshotHelper.uploadScreenshot(request);
%>
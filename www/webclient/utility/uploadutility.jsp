
<%@ page 

import="psdi.util.*,
java.util.*,
psdi.webclient.system.controller.*,
java.io.File,java.io.IOException,
java.io.InputStream,
java.util.Properties,
psdi.app.doclink.DoctypesRemote,
psdi.app.doclink.DoctypesSetRemote,
psdi.app.doclink.DocinfoRemote,
psdi.app.doclink.DocinfoSetRemote,
psdi.app.doclink.DoclinksRemote,
psdi.app.doclink.DoclinksSetRemote,
psdi.app.ticket.*,
psdi.mbo.*,
psdi.mbo.MboConstants,
psdi.server.MXServer,
psdi.util.MXSession,
psdi.webclient.system.controller.MPFormData,
psdi.webclient.system.controller.UploadFile" 

contentType="text/xhtml;charset=UTF-8"%>

<%

String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();

%>

<html>

	<head>

		<META http-equiv="Content-Type" content="text/xml; charset=utf-8">
		<BASE HREF="<%=servletBase%>/webclient/utility">
		<link rel=stylesheet type="text/css" href="../webclient/css/maximo.css">
	
	</head>
	
	<body>
	
	</body>

<%
        final String ATTACHMENTS = "Attachments"; //not sure if this has an internal/external value

System.out.println("PREPARING TO UPLOAD...");

if (MPFormData.isRequestMultipart(request)) {
	
	MPFormData mpData = new MPFormData(request);
	
	System.out.println("FILE NAME WAS...");
	System.out.println(mpData.getFileName());
	
    //must strip any non-digits due to various display formats for uid
    String tickuid = mpData.getParameter("ticketID");
    StringBuffer buff = new StringBuffer();
    for (int y=0;y<tickuid.length();y++) {
        char nextchar = tickuid.charAt(y);
        if (Character.isDigit(nextchar)) {
            buff.append(nextchar);
        }
    }
    tickuid = buff.toString();
	long ticketID = new Long(tickuid).longValue();

    String ticketType = (String)mpData.getParameter("ticketType"); //example: INCIDENT, SR, PROBLEM
	String sessionName = (String)mpData.getParameter("sessionName");
	
	System.out.println("CHECKING MPDATA");
	
	if(mpData!=null) {
		
		UploadFile df = new UploadFile(mpData.getFileName(), mpData.getFullFileName(), mpData.getFileContentType(), mpData.getFileOutputStream());
		String fileRoot = MXServer.getMXServer().getProperty("mxe.doclink.doctypes.defpath") + File.separatorChar + ATTACHMENTS + File.separatorChar;
		
		System.out.println("UPLOADING TRC OUTPUT TO "+fileRoot);
		
		MXServer mxServer = MXServer.getMXServer();
			
		psdi.security.SecurityService secServ = (psdi.security.SecurityService) mxServer.lookup("SECURITY");
		psdi.security.UserInfo userInfo = secServ.authenticateUser(MXServer.getMXServer().getProperty("mxe.int.dfltuser", Locale.getDefault().getLanguage()), true);
			
		DoctypesSetRemote dtsettk = (DoctypesSetRemote)mxServer.getMboSet("DOCTYPES", userInfo);
        dtsettk.reset();
        dtsettk.fetchNext();
        for (int h=0;h<dtsettk.getSize();h++) {
            psdi.mbo.MboRemote dtmbo = dtsettk.getMbo(h);
            String doctype = dtmbo.getString("doctype");
            if (!ATTACHMENTS.equals(doctype)) {
                continue;
            }
            String defaultfilepath = dtmbo.getString("defaultfilepath");
            String app1 = dtmbo.getString("app");
            if (defaultfilepath != null) {
                fileRoot = defaultfilepath;
                break;
            }
        }

        df.setDirectoryName(fileRoot);
		
		File uploadDirectory = new File(df.getDirectoryName());
		
		if (df != null) {						
			df.writeToDisk();
			
			psdi.mbo.MboSetRemote ticketSet = mxServer.getMboSet(ticketType,userInfo);
			psdi.mbo.MboRemote ticket = ticketSet.getMboForUniqueId(ticketID);
 
			
			DoclinksSetRemote dlSet = (DoclinksSetRemote)ticket.getMboSet("DOCLINKS"); 
			DoclinksRemote docLinks = (DoclinksRemote)dlSet.add();
			
			String f = df.getFileName();
			
			String documentName = sessionName != null && sessionName.length() > 1 ? sessionName : f.substring(0, f.length() > 8 ? 8 : f.length());
			
			java.net.URL contextURL = new java.net.URL(new java.net.URL(request.getRequestURL().toString()), request.getContextPath() + "/webclient/jws");
			
            java.net.URL url = new java.net.URL(request.getRequestURL().toString());
            //String protocol = url.getProtocol(); DEFECT 17812, COMMENTED OUT PROTOCOL BECAUSE ALL ATTACHMENT VIEW SUPPORTS ONLY HTTP AT THIS TIME
            String protocol = "http"; //per 17812
            String host = url.getHost();
            
            String workingString = MXServer.getMXServer().getProperty("mxe.doclink.path01");
            
            if(workingString != null && workingString.length() > 0) {
               String[] split = workingString.split("=");
               if(split != null && split.length == 2) {
                  host = split[1].trim();
               }
            }
            
			String fUrl = (host.startsWith(protocol) ? "" : protocol+"://")+host+(host.endsWith("/") ? "" : "/")+uploadDirectory.getName()+"/"+df.getFileName();//new java.net.URL(protocol, host, -1, "/"+uploadDirectory.getName()+"/"+df.getFileName()).toString();
			
			if(mpData.getFileName().endsWith(".trc")) {
				fUrl = contextURL.toString()+"/trc_player.jsp?url="+fUrl;
			}
			
			DocinfoSetRemote diSet = (DocinfoSetRemote)docLinks.getMboSet("DOCINFO");
			DocinfoRemote docInfo = (DocinfoRemote)diSet.add();
			
			
			docInfo.setValue("URLNAME",fUrl, MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("NEWURLNAME",fUrl, MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("DOCTYPE", ATTACHMENTS, MboConstants.NOVALIDATION_AND_NOACTION);						
			docInfo.setValue("URLTYPE", MXServer.getMXServer().getMaximoDD().getTranslator().toExternalDefaultValue("URLTYPE","WWW"), MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("PRINTTHRULINKDFLT", 1, MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("USEDEFAULTFILEPATH", 0,MboConstants.NOACCESSCHECK);
			docInfo.setValue("SHOW", 1, MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("DOCUMENT", documentName, MboConstants.NOVALIDATION_AND_NOACTION);
			docInfo.setValue("DESCRIPTION", mpData.getFullFileName(), MboConstants.NOVALIDATION_AND_NOACTION);

			diSet.validate();
			docInfo.validate();
			docInfo.validateAttributes();
			
			
			docLinks.setValue("DOCTYPE", ATTACHMENTS, MboConstants.NOVALIDATION_AND_NOACTION);
			docLinks.setValue("Upload", false, MboConstants.NOACCESSCHECK);
			docLinks.setValue("COPYLINKTOWO", 1, MboConstants.NOVALIDATION_AND_NOACTION);
			docLinks.setValue("DOCUMENT",documentName,MboConstants.NOVALIDATION_AND_NOACTION);
			docLinks.setValue("OWNERTABLE", ticketType, MboConstants.NOVALIDATION_AND_NOACTION); 
			docLinks.setValue("OWNERID", ticketID, MboConstants.NOVALIDATION_AND_NOACTION); 
			docLinks.setValue("DOCINFOID", docInfo.getUniqueIDValue(), MboConstants.NOVALIDATION_AND_NOACTION);
			
			dlSet.validate();
			docLinks.appValidateAddInfo();
			docLinks.validate();
			docLinks.validateAttributes();
			
			dlSet.save();
			diSet.save();
			
	    }
	}
}


%>
	
</html>
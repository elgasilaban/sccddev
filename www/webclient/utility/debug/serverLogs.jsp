<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="java.util.Date"
%><%@page import="java.io.FileReader"
%><%@page import="java.io.File"
%><%@page import="java.io.StringWriter"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.text.DateFormat"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%!
	DateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
%><%
	//This works for Websphere, need to try it out and update it for WebLogic
	String serverRootProperty = System.getProperty("server.root");

	if(serverRootProperty == null || serverRootProperty.isEmpty())
	{
		response.setStatus(response.SC_INTERNAL_SERVER_ERROR);
		%>Can't figure out the server log directory. This is most likely because you are running<%
		%> Weblogic, and we don't know how to programatically determine the directory.<%
		return;
	}

	String serverRoot = serverRootProperty + File.separatorChar + "logs";

	String path = request.getParameter("path");
	if(path == null)
	{
		path = "";
	}

	File file = new File(serverRoot + "/" + path);
	int slash = path.lastIndexOf('/');
	String parent; 
	if(slash != -1)
	{
		parent = path.substring(0, slash);
	}
	else
	{
		parent = "";
	}

	if(!file.getCanonicalPath().startsWith(serverRoot) || !file.exists())
	{
		response.setStatus(response.SC_NOT_FOUND);
		%>Invalid path: <%=path%><%
		return;
	}

	JSONObject result = new JSONObject();

	if(file.isDirectory())
	{
		JSONArray fileArray = new JSONArray();
		File[] files = file.listFiles();
		Date date = new Date();
		for(File f: files)
		{
			JSONObject fileData = new JSONObject();
			fileData.put("name", f.getName());
			fileData.put("size", f.length());
			date.setTime(f.lastModified());
			fileData.put("lastModified", timestampFormat.format(date));
			fileData.put("isDirectory", f.isDirectory());
			fileArray.add(fileData);
		}
		result.put("files", fileArray);
	}
	else
	{
		FileReader reader = new FileReader(file);
		char[] buffer = new char[1024];
		int len;
		StringWriter writer = new StringWriter();
		while((len = reader.read(buffer)) > 0)
		{
			writer.write(buffer, 0, len);
		}
		result.put("fileContent", writer.toString());
	}

%><%=result.serialize()%>
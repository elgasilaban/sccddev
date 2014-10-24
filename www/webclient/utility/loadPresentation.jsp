<%@page import="java.io.PrintWriter"%>
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
--%><%@ page import="psdi.util.*,java.util.*,psdi.webclient.system.controller.*"
%><%
try {
	String data = request.getParameter("data");
	if (data==null) throw new Exception("missing data");
	
	MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	if (s==null) throw new Exception("Oh boy... no session.");

	if (!s.isConnected()) {
		System.out.println("*** Connecting to Maximo as user: " + request.getParameter("username"));
	    s.setClientHost(request.getRemoteHost());
		s.setClientAddr(request.getRemoteAddr());
		s.setLangCode("en");
		s.setLocale(new Locale("en","US"));
		s.setUserName(request.getParameter("username"));
		s.setPassword(request.getParameter("password"));
		s.connect();
	}
	
	psdi.webclient.system.runtime.WebClientRuntime wcr = psdi.webclient.system.runtime.WebClientRuntime.getWebClientRuntime();
	psdi.webclient.system.session.WebClientSession wcs = wcr.getWebClientSession(request);
	if (wcs==null) {
		wcs = psdi.webclient.system.session.WebClientSessionFactory.getWebClientSessionFactory().createSession(request, response);
	}
	wcs.setRequest(request);
	wcs.setSessionFound(true);
	wcs.setMxSessionConnected(true);
	if (wcs.getMXSession()==null) {
		throw new Exception("MXSession is still null.");
	}

	PresentationLoader pl = new PresentationLoader();
	pl.importApp(wcs, data);

	// if we got here, the, evey thing is fine.
	
	PrintWriter w = response.getWriter();
	w.write("Loaded Presentation");
	w.flush();	
} catch (Throwable t) {
	t.printStackTrace();
	response.sendError(501, "Failed to load presentation: " + t.getMessage());
	PrintWriter w = response.getWriter();
	w.write("Import Failed!!!!");
	t.printStackTrace(w);
	w.flush();
}
%>
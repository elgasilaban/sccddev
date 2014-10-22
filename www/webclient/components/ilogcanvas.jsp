<%@ include file="../common/simpleheader.jsp" %>
<% if (!designmode){%>
<%
String ilogControlType = "ilogcanvas";
String ilogAppletClass = "com.ibm.ism.rba.webclient.ilogcanvas.applet.ILOGCanvasApplet";
String ilogAppletArchive = "rba/ilogcanvasapplet.jar;preload," +
                           "rba/ilogcanvasresources.jar;preload," +
                           "rba/batik-jviews-svggen-8.6.jar;preload," +
                           "rba/rba-jviews-diagrammer.jar;preload," +
                           "rba/rba-jviews-framework-lib.jar;preload," +
                           "rba/dummyClassesDiagrammer.jar;preload," +
			               "rba/ilogdepllic.jar;preload";

String nodeBeanId = control.getProperty("nodedatasrc", "");
String actionBeanId = control.getProperty("actiondatasrc", "");
                           
String[] ilogAppletArgNames = new String[] { "nodes", "actions" };
String[] ilogAppletArgValues = new String[] { nodeBeanId, actionBeanId };
%>
<%@ include file="ilogcanvasapplet.jsp" %>
<%}%>
<%@ include file="../common/componentfooter.jsp" %>


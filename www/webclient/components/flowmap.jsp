<%@ include file="../common/simpleheader.jsp" %>
<% if (!designmode){%>
<%
String ilogControlType = "flowmap";
String ilogAppletClass = "com.ibm.ism.pmcom.webclient.flowmap.applet.FlowMapApplet";
String ilogAppletArchive = "topology/topologymapapplet.jar," +
                           "topology/flowmap_applet_resources.jar," +
                           "topology/batik-jviews-svggen-8.6.jar," +
                           "topology/jviews-diagrammer.jar," +
                           "topology/jviews-framework-lib.jar," +
				           "topology/ilogdepllic.jar," +
				           "topology/dummyClassesDiagrammer.jar," +
                           "../ilogpallette/flowmap.jar";
String[] ilogAppletArgNames = new String[] { "nodepopuptarget" };
String[] ilogAppletArgValues = new String[] { component.getProperty("nodepopuptarget") };
%>
<%@ include file="../common/ilogapplet.jsp" %>
<%}%>
<%@ include file="../common/componentfooter.jsp" %>
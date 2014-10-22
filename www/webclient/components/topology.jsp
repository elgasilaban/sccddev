<%@ include file="../common/simpleheader.jsp" %>
<% if (!designmode){%>
<%@page import="com.ibm.ism.pmcom.webclient.topology.controls.TopologyControl,com.ibm.ism.pmcom.webclient.topology.constants.TopologyConstants" %>
<%
String ilogControlType = "topology";
String ilogAppletClass = "com.ibm.ism.pmcom.webclient.topology.applet.TopologyApplet";
String ilogAppletArchive = "topology/topologymapapplet.jar," +
                           "topology/flowmap_applet_resources.jar," +
                           "topology/batik-jviews-svggen-8.6.jar," +
                           "topology/jviews-diagrammer.jar," +
                           "topology/jviews-framework-lib.jar," +
				   		   "topology/ilogdepllic.jar," +
				   		   "topology/dummyClassesDiagrammer.jar," +
                           "../ilogpallette/topology.jar";
String[] ilogAppletArgNames = new String[] { TopologyConstants.PROPERTY_NODEPOPUP_TARGET, TopologyConstants.PROPERTY_LINKPOPUP_TARGET, TopologyConstants.PROPERTY_MAXNODE_DEPTH,TopologyConstants.PROPERTY_INITNODE_DEPTH,TopologyConstants.PROPERTY_APP_NAME};
TopologyControl topocontrol = (TopologyControl) control;
String[] ilogAppletArgValues = new String[] { component.getProperty(TopologyConstants.PROPERTY_NODEPOPUP_TARGET), component.getProperty(TopologyConstants.PROPERTY_LINKPOPUP_TARGET),topocontrol.getTopologyDepth(),topocontrol.getTopologyInitDepth(),component.getProperty(TopologyConstants.PROPERTY_APP_NAME) };
%>
<%@ include file="../common/ilogapplet.jsp" %>
<%}%>
<%@ include file="../common/componentfooter.jsp" %>

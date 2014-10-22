<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
   
if (!designmode)
{
   %><%@page import="com.ibm.tivoli.maximo.asset.topology.controls.TopologyControl,com.ibm.tivoli.maximo.asset.topology.constants.TopologyConstants" %><%

   String ilogControlType = "topology";

   String ilogAppletClass = "com.ibm.tivoli.maximo.asset.topology.applet.TopologyApplet";

   String ilogAppletArchive = 
                    servletBase + "/applets/telco/telcoapplet.jar," +
                    servletBase + "/applets/telco/ilogdepllic.jar," +
                    servletBase + "/astilogpallette/asttopology.jar," +
                    servletBase + "/applets/telco/dummyClassesDiagrammer.jar," +
                    servletBase + "/applets/telco/batik-jviews-svggen-8.6.jar," +
                    servletBase + "/applets/telco/jviews-diagrammer.jar," +  
                    servletBase + "/applets/telco/jviews-framework-lib.jar";

   String ilogAppletArchiveForBrowserCache = 
                    servletBase + "/applets/telco/telcoapplet.jar," +
                    servletBase + "/astilogpallette/asttopology.jar";

   String ilogAppletArchiveForPluginCache =
                    servletBase + "/applets/telco/batik-jviews-svggen-8.6.jar," +
                    servletBase + "/applets/telco/jviews-diagrammer.jar," +
                    servletBase + "/applets/telco/dummyClassesDiagrammer.jar," +
                    servletBase + "/applets/telco/jviews-framework-lib.jar";

   String ilogAppletArchiveForAllInPluginCache = 
                    servletBase + "/applets/telco/telcoapplet.jar," +
                    servletBase + "/applets/telco/ilogdepllic.jar," +
                    servletBase + "/astilogpallette/asttopology.jar" +
                    servletBase + "/applets/telco/batik-jviews-svggen-8.6.jar," +
                    servletBase + "/applets/telco/jviews-diagrammer.jar," +
                    servletBase + "/applets/telco/dummyClassesDiagrammer.jar," +
                    servletBase + "/applets/telco/jviews-framework-lib.jar";

   String[] ilogAppletArgNames = new String[] { TopologyConstants.PROPERTY_NODEPOPUP_TARGET, 
                                             TopologyConstants.PROPERTY_LINKPOPUP_TARGET, 
                                             TopologyConstants.PROPERTY_MOVETOPOPUP_TARGET, 
                                             TopologyConstants.PROPERTY_MAXNODE_DEPTH, 
                                             TopologyConstants.PROPERTY_INITNODE_DEPTH, 
                                             TopologyConstants.PROPERTY_APP_NAME};

   TopologyControl topocontrol = (TopologyControl) control;

   String[] ilogAppletArgValues = new String[] { component.getProperty(TopologyConstants.PROPERTY_NODEPOPUP_TARGET), 
                                              component.getProperty(TopologyConstants.PROPERTY_LINKPOPUP_TARGET),
                                              component.getProperty(TopologyConstants.PROPERTY_MOVETOPOPUP_TARGET),
                                              topocontrol.getTopologyDepth(),
                                              topocontrol.getTopologyInitDepth(),
                                              component.getProperty(TopologyConstants.PROPERTY_APP_NAME) };

   %><%@ include file="../common/astilogapplet.jsp" %><%
}

%><%@ include file="../common/componentfooter.jsp" %>

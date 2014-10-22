<!--
/*******************************************************************************
 ************** Begin Standard Header - Do not add comments here ***************
 * 
 * File:     %W%
 * Version:  %I%
 * Modified: %G% %U%
 * Build:    %R% %L%
 *
 * Licensed Materials - Property of IBM
 * 
 * Restricted Materials of IBM
 * 
 * 5725-E24
 * 
 * (C) COPYRIGHT IBM CORP. 2012. All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 * 
 *************************** End Standard Header ******************************
 ******************************************************************************/ 
 -->
<%@ include file="../common/simpleheader.jsp" %>
<%
String ilogControlType = "pmguischeduleview";
String ilogAppletClass = "com.ibm.ism.pmgui.webclient.scheduleview.applet.ScheduleViewerApplet";
String ilogAppletArchive = "topology/dummyClasses.jar,"+
		   "topology/topologymapapplet.jar," +
		   "topology/flowmap_applet_resources.jar," +
                "topology/jviews-gantt.jar," +
                "topology/jviews-chart.jar," +
                "topology/jviews-framework-lib.jar," +
                "topology/ilogdepllic.jar";
String[] ilogAppletArgNames = new String[] { "charttype", "datasrc" };
String[] ilogAppletArgValues = new String[] { component.getProperty("charttype"), component.getProperty("datasrc") };
%>
<%@ include file="../common/ilogapplet.jsp" %>
<%@ include file="../common/componentfooter.jsp" %>

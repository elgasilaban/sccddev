<%@ include file="../common/simpleheader.jsp" %>
<%
String ilogControlType = "pmguiganttview";
String ilogAppletClass = "com.ibm.ism.pmgui.webclient.ganttview.applet.GanttViewerApplet";
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

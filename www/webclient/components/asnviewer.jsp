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
--%><%@page contentType="text/html;charset=UTF-8" autoFlush="true"
%><%@page import="com.ibm.tivoli.maximo.skd.control.*"
%><%@page import="java.net.URLEncoder"
%><%@include file="../common/simpleheader.jsp"
%><%
	ASNViewerControl asnViewerControl = (ASNViewerControl) control;
	id = component.getId();
	app.put("asnviewerId", asnViewerControl.getId());
	if(component.needsRender())
	{
%>	<tr>
		<td aria-hidden=true">
			<script type="text/javascript" src="<%=servletBase%>/javascript/grpassign.js"></script>
			<div id="asnviewerAppletDiv" style="padding: 0; margin:0; align:top;width:100%;position:absolute;">
			<div id="asnviewer_loading" width="100%" align="center" height="100px" style="display:none;">
				<img alt="loading..." src="<%=IMAGE_PATH + "progressbar.gif"%>" align="middle"">
			</div>
			<table role="presentation" id="asnviewertable" width="100%" align="left" control="true" controltype="testapplet" style="background-color:#E7E7E7;position:relative;top:-5000" >
				<tr>
					<td align="left">
<%			if(!designmode) // Don't write the applet in designmode
			{
%>						<object 
								id="ASNViewerId"
								name="ASNViewer" 
								type="<%=WebClientConstants.JAVA_APPLET_OBJECT_TYPE%>"
								mxpart="applet" 
								width="100%" height="100%" 
								align="baseline"
								style="position:relative;" 
								datasrc="MAINRECORD" 
								tabindex="-1"
<%							if(USERAGENT.equals("IE"))
							{
%>								classid = "clsid:<%=WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID%>"
<%								String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
								if (hostProtocol == null)
								{
									hostProtocol = request.getScheme();
								}
%>								codebase = "<%=hostProtocol+"://"+control.getProperty("codebase", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL)%>"
<%							}
							else
							{
%>								classid="java:com.ibm.tivoli.maximo.skd.applet.ASNViewerApplet" 
<%							}
%>								>
							<param name="type"           value="<%=WebClientConstants.JAVA_APPLET_OBJECT_TYPE%>" />
							<param name="CODE"           value="com.ibm.tivoli.maximo.skd.applet.ASNViewerApplet" />
							<param name="CODEBASE"       value="<%=servletBase%>/applets/scheduler/" />
							<param name="IMAGE_PATH"     value="../webclient/images/" />
							<param name="ARCHIVE"        value="dummyClasses.jar,skdviewerlicense.jar,skdviewer.jar,jviews-gantt.jar,jviews-framework-lib.jar,jviews-chart.jar,jhbasic-2.0_05.jar,icu4j-4_0_1.jar" />
							<param name="NAME"           value="ASNViewer" />
							<param NAME="APPNAME"        value="<%=wcs.getCurrentApp().getId()%>" />
							<param name="DEBUG"          value="true" />
							<param name="ISBIDION"       value="<%=BidiClientUtils.isBidiEnabled()%>" />
							<param name="LANGCODE"       value="<%=control.getWebClientSession().getUserInfo().getLangCode() %>" />
							<param name="scriptable"     value="true" />
							<param name="mayscript"      value="true" />
							<param name="java_arguments" value="-Djnlp.packEnabled=false" />
							<span style="color:red">Graphical Assignment Manager GANTT View failed to load! -- Please check browser security settings and get the Java Plugin</span>
							No Java 2 Plugin, Standard Edition Support for applet
						</object>
						<script>
							addLoadMethod("makeSchedulerVisibile(<%=asnViewerControl.getAppletVisible()%>, 'ASNViewerId')");
						</script>
<%			} //!designmode
%>					</td>
				</tr>
			</table>
			</div>
			<table id="ASNViewerId_back"<%
				if(automation)
				{
					%> automationid="<%=realId%>_filler"<%
				}
				%> class="mdw" style="position:relative;display:none;"><tr><td class="din"></td></tr></table>
		</td>
	</tr>
<%	} // Component needs render.
	else
	{
		if(!designmode)
		{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		addLoadMethod("makeSchedulerVisibile(<%=asnViewerControl.getAppletVisible()%>, 'ASNViewerId')");
	</script>]]></component>
<%		}//designmode
	}	//if component needs render

if(!designmode)
{
	String dataSource = asnViewerControl.getProperty("datasrc");

	//if filter applied
	//call method on applet via JS
	//reset apply filter flag if value is not ""
	if ( asnViewerControl.isfilterapplied())
	{
		String skdActivityQBE = wcs.getDataBean(dataSource).getString("SKDACTIVITYQBE");
		if (skdActivityQBE != null && !skdActivityQBE.equals(""))
		{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		setSKDActivityQBE("ASNViewerId", "<%=skdActivityQBE%>");
	</script>]]></component>
<%		}
		asnViewerControl.setApplyFilter(false);	
	}
	if (asnViewerControl.wasConstraintEdited())
	{
		String newConstraintValues = wcs.getDataBean(dataSource).getString("EDITCONSTRAINTVALUES");

		if (newConstraintValues != null && !newConstraintValues.isEmpty())
		{
%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
<%			if ( asnViewerControl.needsRender() && asnViewerControl.getAppletVisible())
			{
%>				setConstraintValues("ASNViewerId", "<%=newConstraintValues%>");
<%			}
			else
			{
%>				parent.setConstraintValues("ASNViewerId", "<%=newConstraintValues%>");
<%			}
%>	</script>]]></component>
<%		}
		asnViewerControl.setConstraintEdited(false);
	}

	// refresh applet data
	if (!asnViewerControl.wasConstraintEdited()
			&& !asnViewerControl.isfilterapplied() 
			&& ((asnViewerControl.hasChanged() && !component.needsRender()) || asnViewerControl.needsRender())
			&& asnViewerControl.getAppletVisible())
	{
		DataBean skdAppBean = wcs.getDataBean(dataSource);
		MboValueData mvd = skdAppBean.getMboValueData("SKDPROJECTID");
		long projectid = 0;
		if(mvd != null)
		{
			projectid = mvd.getDataAsLong();
		}
		String skdProjectId = Long.toString(projectid);
		String skdServletBase = wcs.getMaximoRequestContextURL() + "/skd";
		boolean projectChanged = false;
		if(!app.containsKey("projectid") || !app.get("projectid").equals(skdProjectId))
		{
			app.put("projectid", skdProjectId);
			projectChanged = true;
		}

		if (asnViewerControl.needToRefreshProjectData())
		{
			projectChanged = true;
		}

		if(!control.needsRender() )
		{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
<%		}
%>		<script>
<%		if(asnViewerControl.needsRender() || app.get("applinked") != null || projectChanged)
		{
%>			addLoadMethod("skdviewerprojectchanged('ASNViewerId','<%=skdServletBase%>',decodeURIComponent('<%=URLEncoder.encode(wcs.getUISessionID())%>'),'<%=skdProjectId%>')");
<%		}
%>		</script>
<%		if(!control.needsRender())
		{
%>		]]></component>
<%		}

		if(asnViewerControl.needsRender() && app.get("applinked") != null)
		{
			app.remove("applinked");
		}
	}
}//design mode
%><%@ include file="../common/componentfooter.jsp" %>
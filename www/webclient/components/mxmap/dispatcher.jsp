<%--
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%>
<%@ page contentType="text/html;charset=UTF-8"
	import="java.util.List, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.system.session.*"%>
<%@include file="../../common/simpleheader.jsp"%>
<%
	
	if(component == null)
		component = (ComponentInstance)session.getAttribute("currentcomponent");

	WebClientSession wcSession = component.getWebClientSession();
	boolean designMode = wcSession.getDesignmode();
	boolean useAbbrRenderID = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabbrrenderid"));

	id = component.getId();
	if(useAbbrRenderID  && !designMode && id.charAt(id.length() - 1) != ':'){
		id = component.getRenderId();
		
	}
	if(designMode){
	//not sure
	}else{
		String dataSource = component.getControl().getProperty("datasrc");
		if(dataSource==null || dataSource.length()==0){
			dataSource="MAINRECORD";
		}
		DataBean skdAppBean = wcs.getDataBean(dataSource);
		MboValueData mvd = skdAppBean.getMboValueData("SKDPROJECTID");
		long projectid = 0;
		if(mvd != null)
		{
			projectid = mvd.getDataAsLong();
		}
		String skdProjectId = Long.toString(projectid);
	if (component.needsRender())
	{		
		
		String height = component.getControl().getProperty("height");
		String width = component.getControl().getProperty("width");		
		
		String mapControlId = component.getControl().getProperty("mapControlId");
		if(mapControlId==null || mapControlId.length()==0 ){
			mapControlId="mxmap_div";
		}
		String skdServletBase = wcs.getMaximoRequestContextURL() + "/skd";		
		
		
	
%>
<tr>
	<td aria-hidden=true">

		<div id="calviewAppletDiv"
			style="padding: 0; margin: 0; align: top; min-width: 300px;">
			<table role="presentation" id="calviewtable" width="100%"
				align="left" control="true" controltype="testapplet"
				style="background-color: #E7E7E7; width: 100%; height:<%=height%>;">
				<tr>
					<td align="left"><object id="CalendarViewId"
							name="CalendarViewer"
							type="<%=WebClientConstants.JAVA_APPLET_OBJECT_TYPE%>"
							mxpart="applet" width="100%" height="<%=height%>"
							align="baseline" style="margin-top: -5px; position: relative;"
							datasrc="MAINRECORD" tabindex="-1"
							<%							if(USERAGENT.equals("IE"))
							{
%>
							classid="clsid:<%=WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID%>"
							<%								String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
								if (hostProtocol == null)
								{
									hostProtocol = request.getScheme();
								}
%>
							codebase="<%=hostProtocol+"://"+control.getProperty("codebase", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL)%>"
							<%							}
							else
							{
%>
							classid="java:com.ibm.tivoli.maximo.skd.dispatcher.applet.DispatcherViewerApplet"
							<%							}
%>>
							<param name="type"
								value="<%=WebClientConstants.JAVA_APPLET_OBJECT_TYPE%>" />
							<param name="SERVLETURL" value="<%=skdServletBase%>" />
							<param name="SKDPROJECTID" value="<%=skdProjectId%>" />
							<param name="UISESSION" value="<%=wcs.getUISessionID()%>" />

							<param name="CODE"
								value="com.ibm.tivoli.maximo.skd.dispatcher.applet.DispatcherViewerApplet" />
							<!-- this seems wrong -->
							<param name="CODEBASE"
								value="<%=servletBase%>/applets/scheduler/" />
							<param name="IMAGE_PATH" value="../webclient/images/" />
							<param name="ARCHIVE"
								value="json4j.jar,dummyClasses.jar,skdviewerlicense.jar,dispatcherviewer.jar,jviews-gantt.jar,jviews-framework-lib.jar,jviews-chart.jar,jhbasic-2.0_05.jar,icu4j-4_0_1.jar" />
							<param name="NAME" value="Dispatcher" />
							<param name="JSNAMESPACE" value="dispatcher" />
							<param NAME="APPNAME" value="<%=wcs.getCurrentApp().getId()%>" />
							<param name="DEBUG" value="<%=debug%>" />
							<param name="ISBIDION"
								value="<%=BidiClientUtils.isBidiEnabled()%>" />
							<param name="LANGCODE"
								value="<%=control.getWebClientSession().getUserInfo().getLangCode() %>" />
							<param name="scriptable" value="true" />
							<param name="mayscript" value="true" />
							<PARAM name="separate_jvm" value="true">
							<param name="java_arguments"
								value="-Djnlp.packEnabled=false -Xmx256m" />
							<span style="color: red">Calendar View failed to load! --
								Please check browser security settings and get the Java Plugin</span>
							No Java 2 SDK, Standard Edition Support for applet
						</object>
					</td>
				</tr>
			</table>
		</div> <script type="text/javascript">
		<%	if (debuglevel == 0)
		{%>
			console.info("Using MXMAP built version. dispatcher");
			dojohelper.loadfile("<%=basePath%>/javascript/<%=dojoDirectory%>/layers/map/mxmap.js", "js");
			
		<%}%>
			dojo.registerModulePath('ibm.tivoli.fwm', '../../ibm/tivoli/fwm');
			dojo.addOnLoad(function(){
		// Load the dojo modules that we need
		dojo.require("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager");

		// If the user switched tabs and came back, we need to cleanup 
		//  the previous widget before we create a new one.
		
		ibm.tivoli.fwm.mxmap.dispatcher.attachToMap=function(map){
			console.log("map",map);
			console.log("applet:",window.CalendarViewId);
			var disp = new ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager({map:map,applet:CalendarViewId});
			disp.init();
			window.dispatcher=disp;
			
			//notify applet:
			try {
				CalendarViewId.isLoaded();
				CalendarViewId.setJSCommunicationReady();
				console.info("ok to execute methdos",dispatcher);
			} catch(e) {
				console.warn("Attaching to map but applet is not yet there", e);
			}
			
			makeViewerFullheight({map: map});
		};
		console.log("** going to subscribe to map load",dojo.byId("<%=mapControlId%>"))
		
		ibm.tivoli.fwm.mxmap.dispatcher.checkForMap=function(){
			var _h;
			var mapLoadedHandler;
			//handler to hide anyremaining javascript menus on the map
			var fct = function(arg){
				
					if(_h!=null){
						dojo.unsubscribe(_h);
					}
					if(mapLoadedHandler!=null){
						dojo.unsubscribe(mapLoadedHandler);
					}
					
				
			};
			
			_h=dojo.subscribe('mxnmap_onTabOut',fct);
			var attached=false;
			try{
				console.log(ibm.tivoli.fwm.mxmap.factory.registry);
				if(ibm.tivoli.fwm.mxmap.factory.registry){
					for(var id in ibm.tivoli.fwm.mxmap.factory.registry){
						console.log("id",id,"<%=mapControlId%>");
							var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
							attached = ibm.tivoli.fwm.mxmap.dispatcher.attachToMap(map);
						}
					}
				}
				catch (e)
				{
					console.warn("map is not there", e);
				}
				if (attached == false)
				{
					mapLoadedHandler=dojo.subscribe("mxmap.mapLoaded", function(mapProvider, id, map)
					{
						attached = ibm.tivoli.fwm.mxmap.dispatcher.attachToMap(map);
					});
				}
			};
			ibm.tivoli.fwm.mxmap.dispatcher.checkForMap();
			
			function makeViewerFullheight(params)
			{
				var dispatchApplet = document.getElementById("CalendarViewId");
				if(!dispatchApplet)
					return;		
				var dispatchAppletControl = getControl(dispatchApplet);
				if(!dispatchAppletControl)
					return;
				var calviewtable = document.getElementById("calviewtable");
				var vs = dojo.window.getBox();
				var available = parseInt(vs.h) - parseInt(getTopPosition(dispatchAppletControl));

				// Values to be subtracted from dispatchApplet and calviewtable hieghts,
				// due to map style setup (applet gets a little bigger than the map).
				// calviewtable height must be a little smaller than dispatchApplet height. 
				var appletAjustment = 17;
				var calviewAjustment = 20;
				
				dispatchApplet.height=(available - appletAjustment)+"px";
				if (calviewtable)
				{
					calviewtable.style.height=(available - calviewAjustment)+"px";
					// Defect 61369: Very ugly workaround to resize both the calendar and map width
					// so that each ones takes half of the screen width
					// The problem happened only in one of these situations:
					// 1 - tivoli13 skin (regardless of browser)
					// 2 - IE (regardless of skin)
					var clientArea = dojo.byId(clientAreaId);
					calviewtable.style.width=(0.9*clientArea.offsetWidth/2)+"px";
					if(params && params.map)
					{
						params.map.width = calviewtable.style.width;
						params.map._resize();
					}
					else
					{
						try
						{
							if(ibm.tivoli.fwm.mxmap.factory.registry)
							{
								for(var id in ibm.tivoli.fwm.mxmap.factory.registry)
								{
									var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
									if(map)
									{
										map.width = calviewtable.style.width;
										map._resize();
									}
								}
							}
						}
						catch (e)
						{
							console.warn("map is not there", e);
						}
					}
				}
			}
			makeViewerFullheight();
			dojo.connect(window,"resize", makeViewerFullheight);
			
			});
		</script> <%	}else{
	
%> <component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script>
			console.log("must check if dispatcher exists ${currentcomponent.id}", window.dispatcher)
			try {
				if(!window.dispatcher){
					console.error("no dispatcher integration with map found");
				}else{					
					window.dispatcher.updateProject('<%=skdProjectId%>');
				}
			}
			catch (e)
			{
				console.warn("applet is not yet there", e.message);
			}
		</script> <%="]]>"%></component> <%}
}%>
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
--%><%@page import="com.ibm.tivoli.maximo.map.MapControl"%>
<%@ include file="../../common/simpleheader.jsp" %><%
	request.setAttribute("mxmap_control", control);
	MapControl mapControl = (MapControl)control;
	boolean isExpanded = true;
	if(mapControl.getParentInstance() instanceof Section){
		Section mapParentSection = ((Section)mapControl.getParentInstance());
		isExpanded="true".equals(mapParentSection.isExpanded());	
	}
	if(designmode)
	{
		%><tr style="min-height:50px;"><td><div style="min-height:10px;background-color: green;width:${mxmap_control.width}; height:${mxmap_control.height};background-image:url('../webclient/images/designer/map/mapdesigner.jpg');"></div></td></tr><%
	}else{		
	if (component.needsRender()) {
		JSONObject mapConf =  mapControl.getMapConfiguration();
		JSONObject routeConf =  mapControl.getRouteConfiguration();
%><script type="text/javascript" language="javascript">	
<%	if (debuglevel == 0)
{%>
	console.info("Using MXMAP built version.");
	dojohelper.loadfile("<%=basePath%>/javascript/<%=dojoDirectory%>/layers/map/mxmap.js", "js");
	
<%}%>
	dojo.registerModulePath('ibm.tivoli.fwm', '../../ibm/tivoli/fwm');
	dojo.addOnLoad(function(){
		dojo.require('ibm.tivoli.fwm.mxmap.factory');
		dojo.require('ibm.tivoli.fwm.i18n');	
		dojo.require("dojo.io.script");
		<%if(ismobile){
		//this metatag was defined by Gmaps for Iphone/Ipad
		%>
		var viewPortMeta=dojo.query('meta[name="viewport"]')[0];
		/* 12-11086: changed user-scalable to yes*/		
		if(viewPortMeta){
			dojo.attr(viewPortMeta,"content","initial-scale=1.0, user-scalable=yes");
		}else{
			var meta = dojo.create("meta",{name:"viewport",content:"initial-scale=1.0, user-scalable=yes"});
			document.getElementsByTagName("head")[0].appendChild(meta);
		}

		dojohelper.loadfile("<%=basePath%>/skins/mobile/css/<%if(rtl){%>RTL<%}%>mxmap.css", "css");
		
		<%}else{%>
		dojohelper.loadfile("<%=basePath%>/skins/tivoli09/css/<%if(rtl){%>RTL<%}%>mxmap.css", "css");
		<%
		}%>
		if(!dojo.config.fwm){
			dojo.config.fwm={
				ctxRoot:'<%=request.getContextPath()%>',				
				debug:(window.DEBUGLEVEL>0)//allows some timing/debugging functions
			};
		};
		
		ibm.tivoli.fwm.i18n.preLoadMsgGroup("map");
		
		ibm.tivoli.fwm.mxmap.factory.createMap({
			"compId":"${currentcomponent.id}",
			"divId":"${currentcomponent.id}_mapdiv",			
			"mapConf":<%=mapConf.toString()%>,
			"routeConf": <%=routeConf.toString()%>,
			"isInExpanded":<%=isExpanded%>,
			"isMobile":${mxmap_control.mobile},		
			"width":"${mxmap_control.width}",
			"height":"${mxmap_control.height}"
		});
		var _h;
		//handler to hide anyremaining javascript menus on the map
		var fct = function(arg){
			var renderId= "${currentcomponent.renderId}";			
			if(arg && arg.listeners && dojo.indexOf(arg.listeners,renderId)>-1){			
			dojo.publish("mxnmap_onTabOut");
			ibm.tivoli.fwm.mxmap.factory.destroyCurrentMap('${currentcomponent.id}');
			if(_h!=null){
				dojo.unsubscribe(_h);
			}
			}
		};
		
		_h=dojo.subscribe('widgetCleanup',fct);		
		
	}); 
	
</script>
<style type="text/css"><%-- This is because maximo.css sets that imgs must have a margin of 2px, and was breaking the map tiles--%>
#${currentcomponent.id}_mapdiv img{
margin:0px !important;
}
.NavBar_compassControlContainer{
left:0 !important;
}
</style><div id="${currentcomponent.id}_mapdiv" style="position:relative; background-color: #FFFFFF; border:1px solid; border-color:#AAA !important; border-top-color:lightgray"></div>
<%
	request.getSession().setAttribute("fwmMapInitialCollapsedState",mapControl.getParentInstance().getProperty("collapsed"));
		
	} else {
%><component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script>
			var state = [${mxmap_control.currentState}];
			console.log("current state", state);		
			dojo.publish("mxmap_onServerData_${currentcomponent.id}",state);
			
			<% 
			boolean wasExpanded=false;
			if(mapControl.getParentInstance() instanceof Section){
				Section mapParentSection = ((Section)mapControl.getParentInstance());
				wasExpanded=mapParentSection.hasExpandedChanged() && "true".equals(mapParentSection.isExpanded());	
			}
			
			
			if(ismobile && wasExpanded==true){
			%>
				setTimeout(function(){dojo.publish("mxmap_section_expanded_${currentcomponent.id}");},500);				
			<%}
			
			%>
		</script>
	<%="]]>"%></component>
<%
	}
}
%>
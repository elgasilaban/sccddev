<%--
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * @CODETOBEDEFINED
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%><%@ page contentType="text/html;charset=UTF-8" import="java.util.List, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.system.session.*" %><%
	ComponentInstance component = (ComponentInstance)request.getAttribute("currentcomponent");

	if(component == null)
		component = (ComponentInstance)session.getAttribute("currentcomponent");

	WebClientSession wcSession = component.getWebClientSession();
	boolean designMode = wcSession.getDesignmode();
	boolean useAbbrRenderID = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabbrrenderid"));

	String id = component.getId();
	
	if(useAbbrRenderID  && !designMode && id.charAt(id.length() - 1) != ':')
		id = component.getRenderId();
	String label = component.getProperty("label");
	String mapControlId = component.getControl().getProperty("mapcontrolid");
	String name = component.getControl().getProperty("id");
	if(mapControlId==null || mapControlId.length()==0 ){
		mapControlId="mxmap_div";
	}
	String jsAction = component.getProperty("mxeventjshandler");
	
	String addressFieldID = component.getProperty("addresstxtfld");
	
	List<BaseInstance> components = component.getParentInstance().getChildren();
	
	//Recover the geocoderbutton component
	for(int i = 0; i < components.size(); i++) {
		String addressCompID = components.get(i).getId();		
		if(addressCompID.endsWith(addressFieldID)) {
			addressFieldID = components.get(i).getRenderId();
			break;
		}
	}
	
	if (component.needsRender())
	{
		
		
%>	<span id="<%=id%>" ></span>
	<span id="<%=id%>_result"></span>

	<script type="text/javascript">
	
	
	
	if(window.mxbtnaction==null){
		window.mxbtnaction={};
	}
	console.info(window.mxbtnaction,"  ${currentcomponent.id} -- <%=component.getSafeId()%>" );
	
			
		window.<%=jsAction%>={geocode:function(a,b,c,e,f){			
			var address = dojo.byId("<%=addressFieldID%>").value.toString();
			console.log("mapControlId <%=mapControlId%>-mapcontrol");
			dojo.publish("mxmap_geocoder_<%=mapControlId%>-mapcontrol",[address]);			
		    return REQUESTTYPE_NONE;
		}
	};
	

	</script>
<%	}else{ %><component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script>
		console.log("current ${currentcomponent.id}");					
		</script>
	<%="]]>"%></component>

<%}%>
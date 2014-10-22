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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="com.ibm.json.java.*"
%><%@page import="psdi.webclient.components.*"
%><%@page import="psdi.webclient.controls.*"
%><%@page import="psdi.webclient.controls.Menus"
%><%@page import="psdi.webclient.system.controller.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	boolean show = !wcs.getMobile() && (!component.getProperty("menutype").equals("goto") || 
			!control.getPage().getAppInstance().inAppLinkMode()); 
	if(show) {
		Alignment align = wcs.getAlignment();
		String imagePath = wcs.getImageURL();
		String id = ((BaseInstance)component).getRenderId().replaceAll("-","_"); //we need to make sure there are no '-' in the IDs
		String title = component.getProperty("title");
		boolean pageNav = control.getParentInstance().getBoolean("pagenav");
		String image = component.getProperty("image");
		boolean expanded = component.getBoolean("expanded");
		int sectionCount = control.getParentInstance().getChildCount();
		if(sectionCount==1) {
			expanded = true;
		}
		String icon = component.getProperty("icon");
		boolean showImages = component.getBoolean("showimages");
		boolean exclusive = component.getBoolean("exclusive");
		String height = component.getProperty("height");
		String display = "";
		if(!expanded && !wcs.getAccessibilityMode()) {
			display = "none";
		}
		if(image.length() > 0) {
			image = "<img src='" + imagePath + "tasknav/" + image + "' style='margin: 3px;' alt=''/>";
		}

		String minimize = ((NavSection)component).minimize;
		String maximize = ((NavSection)component).maximize;
		String restore = ((NavSection)component).restore;
		String containerId = control.getParentInstance().getProperty("containerid");
		if(component.needsRender()) {	
	%>		<div id="<%=id%>" class="navSection" role="group" aria-labelledby="<%=id%>_label" containerId="<%=containerId%>" >
			<div class="navHeadOuter">
			<div id="<%=id%>_head" title="<%=title%>" role="presentation" style="width:100%" class="navHead" <%if(!wcs.getAccessibilityMode() && !wcs.getDesignmode()){%>on<%if(!pageNav){%>dbl<%}%>click="toggleSectionMinMax('<%=id%>');hideAllMenusNF();"<%}%>>
					<div style="display:inline" style="white-space: nowrap">
						<table role="presentation">
							<tr>
								<td>
									<div id="<%=id%>_label" class="navTitle dojoxEllipsis"><%=image%><%=title%></div>
								</td>
								<td>
						<% 						
						if(sectionCount > 1) {	
							if(!wcs.getAccessibilityMode()){ %>
							<div id="<%=id%>_min" class="hoverButton" style="vertical-align: top;float: <%=align.end%>;<%if(!wcs.getAccessibilityMode()){%>display:none;<%}else{%>display:inline;<%}%>">
								<input aria-label="<%=restore%>" alt="<%=restore%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','normal');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>restore.gif" /><%if(pageNav){%><input aria-label="<%=maximize%>" alt="<%=maximize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','max');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>maximize.gif" /><%}%>
							</div>
							<div id="<%=id%>_max" class="hoverButton" style="vertical-align: top;float: <%=align.end%>;<%if(!wcs.getAccessibilityMode()){%>display:none;<%}else{%>display:inline;<%}%>">
								<input aria-label="<%=minimize%>" alt="<%=minimize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','min');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>minimize.gif" />
							</div>
							<div id="<%=id%>_normal" class="hoverButton" style="vertical-align: top;float: <%=align.end%>;<%if(!wcs.getAccessibilityMode()){%>display:none;<%}else{%>display:inline;<%}%>">
								<input aria-label="<%=minimize%>" alt="<%=minimize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','min');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>minimize.gif" /><%if(pageNav){%><input aria-label="<%=maximize%>" alt="<%=maximize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','max');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>maximize.gif" /><%}%>
							</div>
						  <%}
							else {%>
							<div id="<%=id%>_accessible" style="vertical-align: top;float: <%=align.end%>;display:inline;">
								<input aria-label="<%=minimize%>" alt="<%=minimize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','min');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>minimize.gif" /><input aria-label="<%=maximize%>" alt="<%=maximize%>" type="image" role="button" onclick="toggleSectionView('<%=id%>','max');hideAllMenusNF();stopBubble(event);" src="<%=imagePath%>maximize.gif" />
							</div>
						  <%}
						}	%>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
	<%	}
		String dataString = ((NavSection)component).getDataString();
		boolean needsClose = false;
		if(!wcs.getDesignmode())
		{	
			if(component.needsRender()) {%>
			<div id="<%=id%>_content" style="display:<%=display%>;" class="navContent">
				<div id="<%=id%>_content_inner">
				</div>
			</div>
			<%}
			else if(component.hasChanged()){ 
			%><component id="<%=id%>_holder" compid="<%=id%>"><%="<![CDATA["%><%
				needsClose = true;
			}	
			if(component.needsRender() || component.hasChanged()) { %>
			<script type="text/javascript">
			<%  boolean tryCache = (component.getProperty("datasrcid").equalsIgnoreCase("menus") && component.getProperty("menutype").equals("goto")); 
				boolean isQuery = component.getProperty("menutype").equals("query"); %>
				var state<%=id%> = "<%if(expanded){%>normal<%}else{%>min<%}%>";
				if(<%=containerId%>navSections["<%=id%>"]) {
					state<%=id%> = <%=containerId%>navSections["<%=id%>"]["state"];
				}
				<%=containerId%>navSections["<%=id%>"]={"height":"<%=height%>","state":state<%=id%>,"loaded":false};
				<%=containerId%>navSectionsOrder.push("<%=id%>");
				fillNavSection(<%=dataString%>, {"labelledBy":"<%=id%>_label","args":{"content":{"events": dojo.toJson([{"navSectionId":"<%=id%>","containerId" : "<%=containerId%>","classname":"ns_<%=component.getProperty("menutype")%>","showImages" : "<%=showImages%>","isQuery" : "<%=isQuery%>","render" : "true"}])}}});
				</script>
		<%	}	
		}
		else if(component.needsRender())
		{	%>
			<div style="height: 40px">
				&nbsp;
			</div> 
	<%	}
		if(component.needsRender()) {%>
	</div>
	<%	}
		else if(needsClose){
			%>]]></component><%
		}
	}	%>
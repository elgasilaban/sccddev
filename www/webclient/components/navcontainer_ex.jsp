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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="java.util.Iterator"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%
	//This component has no refresh. It's contents are intended to refresh themselves
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	if(component.needsRender()) {
		Boolean systemNavBar = wcs.showSystemNavBar(control.getPage());
		String servletBase = wcs.getMaximoRequestContextURL() + "/webclient";
		AppInstance app = control.getPage().getAppInstance();
		String id = ((BaseInstance)component).getRenderId().replaceAll("-","_"); //we need to make sure there are no '-' in the IDs
		String width = component.getProperty("width");
		String height = component.getProperty("height");
		boolean pageNav = component.getBoolean("pagenav");
		boolean expanded = component.getBoolean("expanded");
		boolean collapsible = component.getBoolean("collapsible");
		String IMAGE_PATH = wcs.getImageURL();
		if(pageNav) {
			height = "";
		}
		if(!collapsible) {
			expanded = true;
		}
		else if(width.length()>0) {
			int wdth = Integer.valueOf(width);
			wdth -= 9;
			width = String.valueOf(wdth);
		}
			
		if(!height.equals("")) {
			height = "overflow-y:auto; margin-top: 1px; height:"+height+"px;";
		}
		control.setProperty("containerid", id);	
		boolean designMode = wcs.getDesignmode();	
		boolean hideIt = (pageNav && (!systemNavBar)) || wcs.getMobile() || app.isMobile(); %>
	<script type="text/javascript">
		var <%=id%>navSections = {};
		var <%=id%>navSectionsOrder = new Array();
	</script>
	<div id="<%=id%>" role="navigation" state="open" <%if(designMode){%>onmousedown="stopBubble(event)"<%}%>  cellspacing="0" collapsible="<%=collapsible%>" style="overflow: hidden;<%if(designMode){%>cursor: not-allowed;<%}%><%=height%><%if(!expanded){%>display:none;<%}%>vertical-align:top;border-spacing: collapse;width:<%=width%>" pagenav="<%=pageNav%>">
		<%	if(!hideIt) {
				Iterator i = control.getChildren().iterator();
				boolean needsRender = control.needsRender();
				while (i.hasNext())
				{
					ControlInstance child = (ControlInstance)i.next();
					if(child.getType().equals("navsection")) {
						child.setNeedsRender(control.needsRender());
						child.render();
					}
				}
			}	%>
	</div> 
<% if(!hideIt) { %>
	<script type="text/javascript">
		fixNavContainer('<%=id%>');
		// delay this as IE wraps the toolbar late in the process and the navbar top position is calculated incorrectly
		function fixIt() {
			fixNavContainer('<%=id%>');
			dojo.connect(window, 'resize', function() {sizePanes('<%=id%>', true)});
			var header = dojo.byId('<%=id%>navcontainerheader');
			if(header) {
				addLoadMethod("dojo.publish('sizeNavHeader', dojo.byId('<%=id%>').clientWidth);");
			}
			var navContainer = dojo.byId('<%=id%>');
			if(navContainer) {
				var navWidth = parseInt(navContainer.style.width);
				sizeAnchors(navContainer, navWidth);
			}
		}
		var navContainerStrings = {"collapse":"<%=wcs.getMessage("jspmessages","collapsesection",new String[]{""}).replace("  "," ")%>","expand":"<%=wcs.getMessage("jspmessages","expandsection",new String[]{""}).replace("  "," ")%>"};
		addLoadMethod("window.setTimeout(fixIt, 100);");
	</script>
<%		}
		else { %>
	<script type="text/javascript">
		addLoadMethod("killNavContainer('<%=id%>')");
	</script>
	<%	}
	}	%>
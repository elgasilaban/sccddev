<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012,2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page contentType="text/html;charset=UTF-8" buffer="none"
		%><%@page import="psdi.mbo.MboValueInfoStatic"
	    %><%@page import="psdi.webclient.system.controller.AppInstance"
		%><%@page import="psdi.webclient.system.beans.AppBean"
		%><%@page import="psdi.webclient.system.controller.BaseInstance"
		%><%@page import="psdi.webclient.system.controller.ComponentInstance"
		%><%@page import="psdi.webclient.system.controller.ControlInstance"
		%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
		%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
		%><%@page import="psdi.webclient.system.session.WebClientSession" 
		%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String id = ((BaseInstance)component).getRenderId();
	String searchLabel = component.getProperty("prompt");
	if(searchLabel.length()>0) {
		AppInstance app = control.getPage().getAppInstance();
		searchLabel = searchLabel.replace("{0}", app.getKeyLabel());
	}
	boolean hidden = component.getBoolean("hidden");
	if(component.needsRender()) {
		Boolean systemNavBar = wcs.showSystemNavBar(control.getPage());
		String IMAGE_PATH = wcs.getImageURL();
		String searchMenuLabel = wcs.getMessage("jspmessages","quicksearchdropdown");
		String disabled = hidden?"disabled=\"disabled\" aria-disabled=\"true\"":"";
		%>
	<td>
		<div id="<%=id%>_outer" class="qsFieldOuter">
			<input id="<%=id%>" <%=disabled%> aria-label="<%=searchLabel%>" title="<%=searchLabel%>" promptValue="<%if(!hidden){ %><%=searchLabel%><%}%>" ctype="qstextbox" class="fld text tt qSearch queryField" async="1" ae="setvalue" /><%
		  %><div id="<%=id%>_QSButtonDiv" <%=disabled%> class="greybuttondiv<%if(hidden){%> opacity_45<%}%>"<%if(!wcs.getUserAgentName().equals("IE")){%> style="padding: 5px 2px; "<%}else{%>style="padding: 0px;"<%}%>>
				<button id="<%=id%>QSImage" <%=disabled%> aria-label="<%=searchLabel%>" title="<%=searchLabel%>" role="button" onclick="sendEvent('find', '<%=id%>', '')" class="greybutton"><img src="<%=IMAGE_PATH%>qf_find.gif" alt=""/></button>
			<%	if(wcs.getCurrentApp().getAppQuickSearchOptions().size() > 0) { %>
				<button id="<%=id%>QSMenuImage" <%=disabled%> type="button" role="button" title="<%=searchMenuLabel%>" aria-label="<%=searchMenuLabel%>" role="button" onclick="setClickPosition(this, event); sendEvent('click', '<%=id%>', 'quicksearch')" class="greybutton"><img  src="<%=IMAGE_PATH%>nav_btn_menuArrow_Search.gif" alt=""/></button>
			<%	}	%>
			</div>
		</div>
	</td>
	<script>
	function fixQSFieldWidth(width) {
		var qsField = dojo.byId("<%=id%>");
		var qsButtonDiv = dojo.byId("<%=id%>_QSButtonDiv");
		var qsMenuImage = dojo.byId("<%=id%>QSMenuImage");
		if(qsField && qsButtonDiv) {
		<% if(!hidden) { %>
			dojo.connect(qsButtonDiv, "mouseover", qsButtonDiv, function(event) {
				appendClass(qsButtonDiv, "greybuttondiv_hover");
			});
			dojo.connect(qsButtonDiv, "mouseout", qsButtonDiv, function(event) {
				removeClass(qsButtonDiv, "greybuttondiv_hover");
			});
		<%	}	%>
			if(!undef(width)) {
				var setWidth = width - getLeftPosition(qsField) - qsButtonDiv.offsetWidth - 15;
				if(document.body.dir == "rtl") {
					setWidth = width - qsButtonDiv.offsetWidth - 25
				}
				if(setWidth < 80) {
					setWidth = 80;
				}
				dojo.style(qsField, {"width": setWidth +"px"});
			}
		}
		else if(!undef(width)) {
			var qsFieldOuter = dojo.byId("<%=id%>_outer");
			if(qsFieldOuter) {
				dojo.style(qsFieldOuter, {"width": width +"px"});
			}
			return;
		}
		bindQSFieldEvents(qsField);
	}
	function bindQSFieldEvents(el) {
		dojo.connect(el, "drop", el, tb_);
		dojo.connect(el, "blur", el, tb_);
		dojo.connect(el, "click", el, tb_);
		dojo.connect(el, "change", el, tb_);
		dojo.connect(el, "cut", el, tb_);
		dojo.connect(el, "focus", el, tb_);
		dojo.connect(el, "keydown", el, tb_);
		dojo.connect(el, "keypress", el, tb_);
		dojo.connect(el, "keyup", el, tb_);
		dojo.connect(el, "mousedown", el, tb_);
		dojo.connect(el, "mousemove", el, tb_);
		dojo.connect(el, "mouseup", el, tb_);
		dojo.connect(el, "paste", el, tb_);
		tb_(el);
		bound = true;
	}
	function bindQSFunctions() {
		var qsField = dojo.byId("<%=id%>");
		var qsImage = dojo.byId("<%=id%>QSImage");
		if(qsField) {
			dojo.connect(qsField, "focus", qsField, function(event){
				input_onfocus(event,this);
			} );
			dojo.connect(qsField, "blur", qsField, function(event){
				input_onblur(event,this);
			} );

			dojo.connect(qsField, "keypress", qsImage, function(event){
				if(hasKeyCode(event,'KEYCODE_ENTER')) {
					sendEvent('find', '<%=id%>', '')
				}
			} );
		}
	}
	<% if(!hidden) { %>
		addLoadMethod("bindQSFunctions();");
		addLoadMethod("fixQSFieldWidth();");
	<%	}	%>
	dojo.subscribe("sizeNavHeader", function(data){
		fixQSFieldWidth(data);
	});
	</script>
<%	}
	else{
		%><component id="<%=id%>_holder" compid="<%=id%>" replacemethod="NONE"><![CDATA[
			<script type="text/javascript">
			<%	String qsValue = control.getProperty("quicksearchvalue");
				if(qsValue.length()==0) { %>
					setPromptValue("<%=id%>", "<%=searchLabel%>");
			<%	} %>
			</script>
		]]></component>
<%	}
	control.setChangedFlag(false); 
%>
<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp"%><%
	String serverMessage = (String)app.get("servermessage");
	String serverMessageType = (String)app.get("servermessagetype");
	if(wcs.hasLongOpStarted())
	{
		serverMessage="";
		serverMessageType="";
	}
	else
	{
		app.put("servermessage", "");
		app.put("servermessagetype", "");
	}
	boolean modal = !component.getProperty("modal").equalsIgnoreCase("false");
    String control_events="onmousedown='hideAllMenus();'";//moveable_onmousedown(event,this);'";
    control_events+="onkeypress=\"if(hasKeyCode(event,'KEYCODE_ESC')) {sendEvent('dialogcancel','"+id+"', null, null); }\"";
    if(!designmode)
    {
		if(modal)
			control_events+="ondragstart='return false;' ";
		control_events+="ondblclick=\"toggleMinimize('"+id+"')\" ";
    }
	String DIALOG_CONTENT_SUFFIX = "_content";
	int expChars = 60;
	boolean collapsed = false;
	String dialogState = (collapsed) ? "display:none" : "";
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String defaultbutton = component.getProperty("defaultbutton");
	String popme = (String)currentPage.get("popme");
    boolean dialogMessage = !wcs.getForceMessagesToMainPage();
	Map reportParams = (Map)currentPage.get("reportparams");
	int max = -1;
	boolean messageBox = false;
	if(control.getType().equals("messagebox"))
	{
		max=450;
		messageBox = true;
	}
	if (designmode)
		max = 400;
	boolean rerender = (component.needsRender() && ((ControlInstance)control.getParentInstance()).needsRender());
	JSONObject autoFillInfo = ((PageInstance)control).getAutoFillInfo();
	if( !WebClientRuntime.isNull(popme) && popme.equals("true") )
	{
		replaceMethod = "NONE";
		%><%@ include file="../common/componentholder_start.jsp" %>
			<script>
			cancelTimerCalls();
			cancelQueryTimeout();
			dialogCount--;
			showObjs();
			var dialogToRemove=getElement("<%=id%>_inner");
			if(dialogToRemove)
			{
				removePageAutoFill("<%=control.getPage().getPageAutoFillId()%>");
				dialogTD=dialogToRemove.parentNode;
				dialogRow=dialogTD.parentNode;
				dialogRow.deleteCell(dialogTD.cellIndex);
<%				if(modal)
				{
%>				removeModalWaitLayer();
<%				}
%>			}
			</script>
		<%@ include file="../common/componentholder_end.jsp" %>
<%	}
	else if (rerender || (component.needsRender() && (WebClientRuntime.isNull((String)currentPage.get("popped")))))
	{
		if(control.getPage().get("currentfocusid")==null)
			control.setFocus();
		// Prevent multi-popping
		currentPage.put("popped", "true");
		%><!-- Begin of the DIALOG -->
<%		String innerdialogwaitAutoId="";
		String innerAutoId="";
		String firstAutoId="";
		if(automation)
		{
			innerdialogwaitAutoId="automationid=\""+id+"_inner_dialogwait\"";
			innerAutoId="automationid=\""+realId+"_inner\"";
			firstAutoId="automationid=\""+realId+"_first\"";
		}
		String positionX = control.getProperty("positionX");
		String positionY = control.getProperty("positionY");
		boolean positionAtTop = Boolean.valueOf(control.getProperty("positionattop")).booleanValue();
		boolean uiskin = !wcs.getSkin().equals("") && !wcs.getSkin().equals("classic");
		String labelledById =component.getLabelledByRenderId();
		
		if (WebClientRuntime.isNull((String)currentPage.get("rerendering")))
		{	
			if(hiddenFrame)
			{
				replaceMethod = "addDialog";
			%><%@ include file="../common/componentholder_start.jsp" %><%
			}
			else
			{
%>			<div id="<%=id%>" <%=automationId%>>
<%			}
		}
		if(modal)
		{
%>			<div id='<%=id%>_inner_dialogwait' <%=innerdialogwaitAutoId%> class='wait'>&nbsp;</div>
<%		}	
				List children = component.getChildren();
		        int ctr=0;
		        String dialogcontentsuffixAutoId="";
		        String innercontentAutoId="";
				if (children!=null)
				{
%>				<table id="<%=id%>_inner" <%=innerAutoId%> role="<%=(messageBox?"alert":"dialog")%>" <%=(labelledById==null?"":"aria-labelledby=\""+labelledById+"\"")%> positionAtTop="<%=positionAtTop%>" positionX="<%=positionX%>" positionY="<%=positionY%>" modal="<%=modal%>" width="<%=width%>" height="<%=height%>" class="dsc1 mc<%if(modal){%> modal<%}%>" border="0" defaultbutton="<%=defaultbutton%>" control="true" <%=control_events%> style="visibility:hidden;" cellpadding="0px" cellspacing="0px">
<%					Iterator i = children.iterator();
					while (i.hasNext())
					{
						ComponentInstance child = (ComponentInstance)i.next();

						dialogcontentsuffixAutoId="";
						innercontentAutoId="";
						if(automation) 
						{
							dialogcontentsuffixAutoId="automationid=\""+realId+DIALOG_CONTENT_SUFFIX+ctr+"\"";
							innercontentAutoId="automationid=\""+realId+"_inner_content\"";
						}
%>			<tr id="<%= id + DIALOG_CONTENT_SUFFIX + ctr%>" aria-live="polite" <%=collapsed?"aria-hidden=\"true\"":""%> <%=dialogcontentsuffixAutoId%> style="<%= dialogState%>" valign="top">
				<td id="<%=id%>_inner_content" <%=innercontentAutoId%> valign="BOTTOM"  style="padding:0px;<%if(accessibilityMode){%>background:#ffffff;border:3px solid #fff;<%}%> %>">
<%					if(ctr==0)
					{	//don't output whitespace around the following image
						%><img tabindex="0" alt="" id="<%=control.getId()%>_first" alt="" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" style="display:inline;margin:0px" firstbuttonid="first"/><%
					}
					child.render();
					if(ctr>0)
					{
						String lastbutton = component.getControl().getProperty("lastbutton");
				    	ComponentInstance lastButton = control.getPage().getComponent(lastbutton);
				    	if(lastButton!=null)
				    	{
						    lastbutton=lastButton.getRenderId();
				    	}	
						String labelid = ((Dialog)control).getLabelRenderId();	
						%><img tabindex="0" labelid="<%=labelid%>" alt="" id="<%=control.getId()%>_last" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" lastbuttonid="<%=lastbutton%>"><%
					}
				%></td>
<%				ctr++;
%>			</tr>
<%					}
%>		</table>
<%				}
	if (WebClientRuntime.isNull((String)currentPage.get("rerendering")))
	{
		if(!hiddenFrame)
		{
%>		</div>
<%		}
%>		<script>
<%			if(autoFillInfo!=null)
			{
%>			updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo%>);
<%			}
%>			window.setTimeout("_initDialog('<%=id%>','<%=control.getId()%>',<%=max%>,<%=modal%>)", 50);
<%			if(serverMessage != null && serverMessageType != "")
			{
%>			showMessage(<%=serverMessageType%>, "<%=serverMessage%>", <%=dialogMessage%>);
<%			}
%>		</script>
<%		if(hiddenFrame)
		{
			%><%@ include file="../common/componentholder_end.jsp" %><%
		}
	}
	else
	{
%>		<script>
<%			if(autoFillInfo!=null)
			{
%>			updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo%>);
<%			}
%>			addLoadMethod("_initDialog('<%=id%>','<%=control.getId()%>',<%=max%>,<%=modal%>);window.setTimeout(\"focusItem('<%=(String)app.getCurrentPage().getFocusRenderId()%>',true)\", 200);");
<%			if(serverMessage != null && serverMessageType != "")
			{
%>			showMessage(<%=serverMessageType%>, "<%=serverMessage%>", <%=dialogMessage%>);
<%			}
%>		</script>
<%	}
}
else
{
	if(serverMessage!=null && serverMessageType!="")
	{
		%><%=finalScriptStart%>showMessage(<%=serverMessageType%>, "<%=serverMessage%>", <%=dialogMessage%>);<%=finalScriptEnd%><%
	}

	if ( !component.skipRender() )
	{
		component.renderChildComponents();
%>		<%=finalScriptStart%>
			makeDialogScroll('<%=id%>','<%=control.getId()%>',<%=max%>);
<%			if(autoFillInfo != null)
			{
%>			updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo%>);
<%			}
%>		<%=finalScriptEnd%><%
	}
}
if (reportParams != null)
{
	String reportFormAutoId="";
	if(automation) 
	{
		reportFormAutoId="automationId='reportForm'";
	}
%>	<%=finalScriptStart%>
	document.write("<form name='reportForm' id='reportForm' <%=reportFormAutoId%> action='testAction'></form>");
	var reportForm = document.forms['reportForm'];
<%	Object pKeys[] = reportParams.keySet().toArray();
	for(int i = 0; i < pKeys.length; i++)
	{
%>		var newInput = document.createElement("input");
		newInput.setAttribute("type","hidden");
		newInput.setAttribute("name","<%=pKeys[i].toString() %>");
		newInput.setAttribute("value","<%=reportParams.get(pKeys[i].toString()) %>");
		reportForm.appendChild(newInput);
<%	}
%>	reportForm.action = "<%=reportParams.get("redir") %>";
	reportForm.method = "post";
	reportForm.target = "ActuateReport";

	reportForm.submit();
	<%=finalScriptEnd%>
<%	currentPage.put("reportparams", null);
}
%><%@ include file="../common/componentfooter.jsp"%>
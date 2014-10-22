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
--%><%@ include file="../common/simpleheader.jsp" %><%
	if(hiddenFrame)
	{
		replaceMethod="addDialog";
%><%@ include file="../common/componentholder_start.jsp" %>
<%	}
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
    String control_events="onmousedown='hideAllMenus();moveable_onmousedown(event,this);'";
    control_events+="onkeydown=\"if(hasKeyCode(event,'KEYCODE_ESC')) {sendEvent('dialogcancel','"+id+"', null, null); }\"";
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
	System.out.println(currentPage.getId());
    String lastbutton = component.getControl().getProperty("lastbutton");
    ComponentInstance lastButton = control.getPage().getComponent(lastbutton);
    if(lastButton!=null)
	    lastbutton=lastButton.getRenderId();
    boolean dialogMessage = !wcs.getForceMessagesToMainPage();
	Map reportParams = (Map)currentPage.get("reportparams");
	int max = -1;
	id=component.getId();
	if(control.getType().equals("messagebox"))
		max=450;
	if (designmode)
		max = 400;
	boolean rerender = (component.needsRender() && ((ControlInstance)control.getParentInstance()).needsRender());
	if( !WebClientRuntime.isNull(popme) && popme.equals("true") )
	{	
	System.out.println("POPME");
	%>
	<script>
		cancelTimerCalls();
		cancelQueryTimeout();
		dialogCount--;
		showObjs();
		var dialogToRemove=getElement("<%=id%>_inner");
		if(dialogToRemove)
		{
			dialogTD=dialogToRemove.parentNode;
			dialogRow=dialogTD.parentNode;
			dialogRow.deleteCell(dialogTD.cellIndex);
			addLoadMethod("removeModalWaitLayer()");
		}
	</script>
<%	}
	else if (rerender || (component.needsRender() && (WebClientRuntime.isNull((String)currentPage.get("popped")))))
	{
		control.setFocus();
		// Prevent multi-popping
		currentPage.put("popped", "true");
		String innerdialogwaitAutoId="";
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

		if (WebClientRuntime.isNull((String)currentPage.get("rerendering")))
		{	
			if(hiddenFrame)
			{
				replaceMethod = "addDialog";
			}
			else
			{	%>
			<div id="<%=id%>" <%=automationId%>>
	<%		}
		}
		if(modal)
		{	%>
			<div id='<%=id%>_inner_dialogwait' <%=innerdialogwaitAutoId%> class='wait'>&nbsp;</div>
	<%	}	%>
			<table role="dialog" aria-live="assertive" aria-atomic="true" id="<%=id%>_inner" <%=innerAutoId%> positionAtTop="<%=positionAtTop%>" positionX="<%=positionX%>" positionY="<%=positionY%>" modal="<%=modal%>" width="<%=width%>" height="<%=height%>" class="dh mc<%if(modal){%> modal<%}%>" border="0" defaultbutton="<%=defaultbutton%>" control="true" <%=control_events%> style="visibility:hidden;" >
                <tr>
	                <td colspan="3">
	            		<img tabindex="0" alt="" id="<%= id %>_first" <%=firstAutoId%> alt="" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" firstbuttonid="first">
                	</td>
                </tr>
                <%
					List children = component.getChildren();
			        int ctr=0;
			        String dialogcontentsuffixAutoId="";
			        String innercontentAutoId="";
					if (children!=null)
					{
						Iterator i = children.iterator();
						while (i.hasNext())
						{
							ComponentInstance child = (ComponentInstance)i.next();

							dialogcontentsuffixAutoId="";
							innercontentAutoId="";
							if(automation) {
								dialogcontentsuffixAutoId="automationid=\""+realId+DIALOG_CONTENT_SUFFIX+ctr+"\"";
								innercontentAutoId="automationid=\""+realId+"_inner_content\"";
							}
			%>	<tr id="<%= id + DIALOG_CONTENT_SUFFIX + ctr%>" <%=dialogcontentsuffixAutoId%> style="<%= dialogState%>" valign="top">

				<%	if(uiskin)
					{	%>
					<td valign="BOTTOM" style="width:6px;" class="opacity_80 <%if(ctr>0){%>dgltshad<%}%>">
						<%if(ctr==0){%><img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_shadow_head_left.gif" style="margin:0px" align="top" class="opacity_80"><%}else{%>&nbsp;<%}%>
					</td>
				<%	}
					else
					{	%>
					<td></td>
				<%	}	%>
					<td id="<%=id%>_inner_content" <%=innercontentAutoId%> valign="BOTTOM" style="padding:0px;"><%
						child.render();	%>
					</td>
					<td valign="BOTTOM" style="width:3px" class="opacity_80 <%if(ctr>0){%>dgrtshad<%}%>">
						<%if(ctr==0){%><img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_shadow_head.gif" style="margin:0px" align="top" class="opacity_80"><%}else{%>&nbsp;<%}%>
					</td>
					<%	ctr++;	%>
				</tr><%
						}
					}

					String bottomshadowAutoId="";
					String lastAutoId="";
					if(automation) {
						bottomshadowAutoId="automationid=\""+realId+"_bottomshadow\"";
						lastAutoId="automationid=\""+realId+"_last\"";
					}
					%>

 				<tr valign="top">
					<td id="<%=id%>_bottomshadow" <%=bottomshadowAutoId%> colspan="3" style="padding:0px;font-size:3px;vertical-align:top;" valign="top">
 					 	<table style="margin:0px;" valign="top" width="100%">
					 		<tr height="4px" valign="top">
					 			<td class="opacity_80 dgbotshadl" valign="top">&nbsp;</td>
					 			<td width="*" class="opacity_80 dgbotshad" valign="top">&nbsp;</td>
					 			<td class="opacity_80 dgbotshadr" valign="top">&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
                <tr>
	                <td colspan="3">
			            <img tabindex="0" alt="" id="<%= id %>_last" <%=lastAutoId%> onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" lastbuttonid="<%=lastbutton%>">
	                </td>
				</tr>
			</table>
	<%	if (WebClientRuntime.isNull((String)currentPage.get("rerendering")))
		{
			if(hiddenFrame)
			{	%>
				<script>
					setDialogPosition('<%=id%>','<%=control.getId()%>',<%=max%>);
					dialogCount++;
					hideObjs();
					addModalWaitLayer('<%=id%>_inner_dialogwait');
				</script>
		<%	}
			else
			{	%>
				</div>
				<script>
					addDialog(document.getElementById('<%=id%>').innerHTML,null);
					setDialogPosition('<%=id%>','<%=control.getId()%>',<%=max%>);
					dialogCount++;
					hideObjs();
					addModalWaitLayer('<%=id%>_inner_dialogwait');
				</script>			
		<%	}
			if(serverMessage!=null && serverMessageType!="")
        	{	%>
				<script>showMessage(<%=serverMessageType%>, '<%=serverMessage%>', <%=dialogMessage%>);</script>
		<%	}
		}
		else
		{	%>
			<script>
				setDialogPosition('<%=id%>','<%=control.getId()%>',<%=max%>);
				focusItem('<%=(String)app.getCurrentPage().getFocusRenderId()%>',true);
			</script>
		<%	if(serverMessage!=null && serverMessageType!="")
			{
				%><script>showMessage(<%=serverMessageType%>, '<%=serverMessage%>', <%=dialogMessage%>);");</script><%
			}
		}
	}
	else
	{
		if(serverMessage!=null && serverMessageType!="")
		{
			%><script>showMessage(<%=serverMessageType%>, '<%=serverMessage%>', <%=dialogMessage%>);");</script><%
		}
		if ( !component.skipRender() )
		{
        	component.renderChildComponents();	%>
        	<script>fixDialogPosition('<%=id%>','<%=control.getId()%>',<%=max%>);</script>
	<%	}	%>
	<script> if(dojo.byId('<%=id%>_inner')){var <%=component.getSafeId()%>DnD = new dojo.dnd.Moveable(dojo.byId('<%=id%>_inner'),{skip: true, handle: dojo.byId('<%=id%>_content0')});}</script>
<%	}
	if (reportParams != null)
	{
		String reportFormAutoId="";
		if(automation) {
			reportFormAutoId="automationId='reportForm'";
		}	%>
			<script>
			document.write("<form name='reportForm' id='reportForm' <%=reportFormAutoId%> action='testAction'></form>");
			var reportForm = document.forms['reportForm'];
			<%
				Object pKeys[] = reportParams.keySet().toArray();
				for(int i = 0; i < pKeys.length; i++)
				{
			%>
				var newInput = document.createElement("input");
				newInput.setAttribute("type","hidden");
				newInput.setAttribute("name","<%=pKeys[i].toString() %>");
				newInput.setAttribute("value","<%=reportParams.get(pKeys[i].toString()) %>");
				reportForm.appendChild(newInput);
			<%
				}
			%>
			reportForm.action = "<%=reportParams.get("redir") %>";
			reportForm.method = "post";
			reportForm.target = "ActuateReport";

			reportForm.submit();
			</script>
		<%
		currentPage.put("reportparams", null);
	}
	if(hiddenFrame)
	{
%><%@ include file="../common/componentholder_end.jsp" %><%
	}
	else
	{
%><%@ include file="../common/componentfooter.jsp" %><%
	}	%>
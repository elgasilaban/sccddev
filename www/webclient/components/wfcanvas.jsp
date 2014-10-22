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
	    WfCanvas canvas = (WfCanvas) control;
		id = component.getId();
	    app.put("wfCanvasId", canvas.getId());
		String nodeBeanId = control.getProperty("nodedatasrc", "nodes");
		String actionBeanId = control.getProperty("actiondatasrc", "actions");
	    String datasrc = control.getProperty("datasrc");
	    if(component.needsRender())
	    {
	        String messageGroup = "wfdesign";
			String archive = control.getProperty("archive", "../webclient/applets/wfapplet.jar");        
			String code = control.getProperty("code", "psdi.webclient.applet.wfcanvas.applet.WorkflowApplet");
			String width = control.getProperty("width", "100%");
			String nodedatasrc = control.getProperty("nodedatasrc", "");
			String actiondatasrc = control.getProperty("actiondatasrc", "");
			// Set right now to use any version of 1.6_12+
			String classid = control.getProperty("classid", WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID);

			String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
			if (hostProtocol == null)
			{
				hostProtocol = request.getScheme();
			}
			String codebase = hostProtocol+"://"+control.getProperty("codebase", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL);
			String type = control.getProperty("type", WebClientConstants.JAVA_APPLET_OBJECT_TYPE);
	        String automationIdBack = "";
	        if(automation)
	            automationIdBack="automationid=\""+realId+"_filler\"";
			%>
			<tr>
			<td>
			<table id="<%=id%>_table" tabindex="-1" align="<%=defaultAlign%>" align="center" control="true" controltype="wfcanvas" style="width:<%=width%>;position:relative;top:-5000;" role="presentation">
				<tr>
					<td align="<%=defaultAlign%>" style="vertical-align:top">
					<%	if(!designmode)
						{	%>
							<object type="<%=type%>"
								id="<%=id%>" name="<%=id%>"
								<%=automationId%>
								mxpart="applet" 
								width="100%" height="100%"
								align="baseline" 
								style="position:relative;"
								datasrc="<%=datasrc%>"
								onreadystatechange="refreshCanvas('<%=id%>')"
								onfocus="setCurrentfocusId(event, this)"
								tabindex="-1"
<%							if(USERAGENT.equals("IE"))
							{	%>
								class="wfcanvas"
								classid = "clsid:<%=classid%>"
								codebase = "<%=codebase%>"
<%							}
							else
							{	%>
								classid="java:<%=code%>" 
								archive="<%=archive%>" 
<%							}	%>
								>
							<PARAM NAME="rtlOrientation" 	VALUE="<%=BidiUtils.isGUIMirrored(langcode)%>" >
							<PARAM NAME="type" 				VALUE="<%=type%>" >
							<PARAM NAME="CODE" 				VALUE="<%=code%>" >
							<PARAM NAME="IMAGE_PATH" 		VALUE="<%=IMAGE_PATH%>">
							<PARAM NAME="ARCHIVE" 			VALUE="<%=archive%>" >
							<PARAM NAME=NAME 				VALUE="<%=id%>" >
							<PARAM NAME="scriptable" 		VALUE="true" >
							<PARAM NAME="mayscript" 		VALUE="true" >
							<PARAM NAME="nodedatasrc" 		VALUE="<%=nodedatasrc%>" >
							<PARAM NAME="actiondatasrc" 	VALUE="<%=actiondatasrc%>" >
							<PARAM NAME="createrevLabel"	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.createrev").getMessage()%>">
							<PARAM NAME="validateLabel"		VALUE="<%=wcs.getMaxMessage(messageGroup,"action.validate").getMessage()%>">
							<PARAM NAME="enableLabel"		VALUE="<%=wcs.getMaxMessage(messageGroup,"action.enable").getMessage()%>">
							<PARAM NAME="activateLabel"		VALUE="<%=wcs.getMaxMessage(messageGroup,"action.activate").getMessage()%>">
							<PARAM NAME="deleteLabel" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"action.delete").getMessage()%>" >
							<PARAM NAME="deleteTip" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"action.delete.tip").getMessage()%>" >
							<PARAM NAME="propertiesLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.properties").getMessage()%>" >
							<PARAM NAME="propertiesTip" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.properties.tip").getMessage()%>" >
							<PARAM NAME="modeNormalLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.mode.normal").getMessage()%>" >
							<PARAM NAME="modeLineLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.mode.line").getMessage()%>" >
							<PARAM NAME="modeLineNegLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"action.mode.line_neg").getMessage()%>" >
							<PARAM NAME="zoomLabel" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"zoom").getMessage()%>" >
							<PARAM NAME="lineOverLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"line_over").getMessage()%>" >
							<PARAM NAME="nodeOverLabel" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"node_over").getMessage()%>" >
							<PARAM NAME="lineLabel" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"line").getMessage()%>" >
							<PARAM NAME="lineNegLabel" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"line_neg").getMessage()%>" >
							<PARAM NAME="lineEndLabel" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"line_end").getMessage()%>" >
							<PARAM NAME="dialog.title"		VALUE="<%=wcs.getMaxMessage(messageGroup,"dialog.title").getMessage()%>" >
							<PARAM NAME="dialog.ok"			VALUE="<%=wcs.getMaxMessage(messageGroup,"dialog.ok").getMessage()%>" >
							<PARAM NAME="unknown.error"		VALUE="<%=wcs.getMaxMessage(messageGroup,"unknown.error").getMessage()%>" >
							<!-- Node strings -->
							<PARAM NAME="task.tooltip" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"task.tooltip").getMessage()%>" >
							<PARAM NAME="condition.tooltip" VALUE="<%=wcs.getMaxMessage(messageGroup,"condition.tooltip").getMessage()%>" >
							<PARAM NAME="input.tooltip" 	VALUE="<%=wcs.getMaxMessage(messageGroup,"input.tooltip").getMessage()%>" >
							<PARAM NAME="subprocess.tooltip"  VALUE="<%=wcs.getMaxMessage(messageGroup,"subprocess.tooltip").getMessage()%>" >
							<PARAM NAME="wait.tooltip" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"wait.tooltip").getMessage()%>" >
							<PARAM NAME="interaction.tooltip" VALUE="<%=wcs.getMaxMessage(messageGroup,"interaction.tooltip").getMessage()%>" >
							<PARAM NAME="stop.tooltip" 		VALUE="<%=wcs.getMaxMessage(messageGroup,"stop.tooltip").getMessage()%>" >
							<PARAM NAME="Country_Code" 		VALUE="<%=wcs.getUserInfo().getLocale().getCountry()  %>" >
							<PARAM NAME="Language_Code"		VALUE="<%=wcs.getUserInfo().getLocale().getLanguage() %>" >
							<SPAN STYLE="color:red">WorkFlow Canvas failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
							No Java 2 SDK, Standard Edition Support for applet
					</object>
	
					<table id="<%=id%>_back" <%=automationIdBack%> class="mdw" style="position:relative;display:none;" role="presentation"><tr><td class="din"></td></tr></table>
					<% 	}
						else
						{	%>
							&nbsp;<div class="wfcanvas"
							id="<%=id%>" NAME="<%=id%>" 
							<%=automationId%>
							mxpart="applet" 
							classid = "clsid:<%=classid%>"
							codebase = "<%=codebase%>"
							ALIGN="baseline" 
							style="padding:5px;position:relative;display:inline;background:#E7E7E7;border:1px solid #000000;"><%=id%></div>
					<%	}	%>
					</td>
				</tr>
			</table>
			</td>
			</tr>
<%	} 
	else if (canvas.getRefreshVisibility())
	{ 
		canvas.setRefreshVisibility(false);		%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		wfCanvas = document.getElementById("<%=id%>");
		ctrl = getControl(wfCanvas);
		makeCanvasVisible(<%=canvas.getAppletVisible()%>,"<%=id%>");   
	<%	if(canvas.getAppletVisible())
		{	%>
		    reload=true;
	<%	}	%>
		</script>]]></component>
<%	}
// refresh applet data
	if (canvas.hasChanged() && (!designmode) && (!component.needsRender()) && canvas.getAppletVisible())
	{
	    DataBean wfProcess = wcs.getDataBean(datasrc);
	    psdi.webclient.beans.wfdesign.NodesBean wfNodes = (psdi.webclient.beans.wfdesign.NodesBean)wcs.getDataBean(nodeBeanId);
	    DataBean wfActions = wcs.getDataBean(actionBeanId);
	    String processid = wfProcess.getString("wfprocessid");
	    String zoomLevel = "100";
	    String processname = "";
	            
	    boolean processEditable = false;
	    if(processid!=null && !processid.equals(""))
	    {
	        zoomLevel = wfProcess.getString("wfzoom");
	        if(zoomLevel==null||zoomLevel.equals(""))
	            zoomLevel="100";
	        wfProcess.getString("processname");
	        processEditable = (!wfProcess.getBoolean("enabled") && !wfProcess.getBoolean("active"));
	    }
	    Stack pageStack = app.getPageStack();	%>
	    <component id="<%=id%>_holder1"<%=compType%>><![CDATA[<script>
	   <%	if(pageStack.size() == 1)
	    {
	        String lastprocid = canvas.getProcessId();
	        if(lastprocid!=null && lastprocid.equals(processid))
	        { %>  
	        reload=true;
		<%  }
	        else
	        { %>
	              var reload=false;
			<%    canvas.setProcessId(processid);
	        }
	        int savedNodeRow = wfNodes.getCurrentRow();
	        int savedActionRow = wfActions.getCurrentRow();
	        wfNodes.setCurrentRow(0);
	        wfActions.setCurrentRow(0);
	        int nodeCount = 0;
	        int actionCount = 0;
	        %>var wfNodes = new Array();
		    var wfActions = new Array();
		    <%	
			String maxValueNodeType = null;
			String[] nodeAttributes = {"nodeid", "nodetype", "xcoordinate", "xcoordinate", "title"};
			String[] actionAttributes = {"actionid", "ownernodeid", "membernodeid", "ispositive"};
			int nodeRow = 0;
			while(wfNodes.setCurrentRow(nodeRow))
			{	
				if(!wfNodes.isRowDeleted(nodeRow))
				{
					maxValueNodeType = ((psdi.webclient.beans.wfdesign.NodesBean)wfNodes).getNodeTypeMaxValue();
					%>
					node = new wfnode("<%=wfNodes.getString("nodeid")%>");
					node.row="<%=nodeRow%>";
					node.type="<%=maxValueNodeType%>";
					node.x="<%=wfNodes.getXCoord()%>";
					node.y="<%=wfNodes.getYCoord()%>";
					node.title="<%=wfNodes.getString("title")%>";
				<%	
					MboSetData actionSetData = wfActions.getMboSetData(0, 2000, actionAttributes);
					int actionDataSetCount = actionSetData.getMboDataCount();
					for(int actionRow=0;actionRow<actionDataSetCount;actionRow++)
					{
						MboData actionData = actionSetData.getMboData(actionRow);
						if(actionData!=null && !actionData.toBeDeleted())
						{
							%>action = new wfaction("<%=actionData.getMboValueData("actionid").getData()%>");
							action.row="<%=actionRow%>";
							action.ownerrow="<%=wfNodes.getCurrentRow()%>";
							action.ownerid="<%=actionData.getMboValueData("ownernodeid").getData()%>";
							action.memberid="<%=actionData.getMboValueData("membernodeid").getData()%>";
							action.ispositive="<%=actionData.getMboValueData("ispositive").getDataAsBoolean()%>";
							wfActions[wfActions.length]=action;
							<% actionCount++;
						}
					}	
					%>wfNodes[wfNodes.length]=node;<%
					nodeCount++;
				}
				nodeRow++;
			}
			if(savedNodeRow>=nodeCount)
			{
				savedNodeRow=0;
			}
			if(savedActionRow>=actionCount)
			{
				savedActionRow=0;
			}
			wfNodes.setCurrentRow(savedNodeRow);
			wfActions.setCurrentRow(savedActionRow);
	// strange, WFSelected doesn't seem to be set anywhere
			String sel = (String)app.get("WFselected");
			String selectedType = (sel==null)? "node":sel;
			String actionIndex = "0";	%>
			wf_Canvas = document.getElementById("<%=id%>");
			wf_Canvas.setupProcess("<%=processid%>", "<%=processname%>", <%=processEditable%>, <%=zoomLevel%>);
			wf_Canvas.setBidiEnabled(<%=BidiUtils.isBidiEnabled()%>);  //bidi-hcg-SC;
			wf_Canvas.setMaximoTextDirection("<%=BidiUtils.getMboTextDirection("WFNODE","title",true)%>");  //bidi-hcg-SC;
			buildWorkFlow("<%=id%>",wfNodes,wfActions,<%=zoomLevel%>, <%=processEditable%>, <%=savedNodeRow%>, <%=actionIndex%>,"<%=selectedType%>",reload);
		</script>]]></component>
	<%	}	// if pagestack
	} // if designmode
	
	if (!WebClientRuntime.isNull(canvas.getError()))
	{
	%>
	<%=finalScriptStart%>wfCanvas.showError('<%=canvas.getError()%>');<%=finalScriptEnd%>
	<%
	  canvas.setError(null);
	}
	if (canvas.isSetCursor())
	{
	%><%=finalScriptStart%>wfCanvas.setCursor(false);<%=finalScriptEnd%>
	<%
	  canvas.setSetCursor(false);
	}	%><%@ include file="../common/componentfooter.jsp" %>
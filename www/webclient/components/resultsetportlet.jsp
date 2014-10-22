<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%--
This JSP is the handler for Result Set Portlet component.
It provides user interface for the portlet and handling of events

Events fire by this component are;
- Open Record through unqiue id
- Filter expand/close
- Filter
- Clear Filter
- Change Graph Type
- Change View By Attribute
--%><%@ include file="../common/simpleheader.jsp"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.webclient.beans.startcntr.ResultSetGraph"
%><%@page import="psdi.webclient.beans.startcntr.ChartData"
%><%@page import="psdi.webclient.beans.startcntr.BarChartData"
%><%@page import="psdi.webclient.beans.startcntr.BarChartData.BarChartItem"
%><%@page import="psdi.webclient.beans.startcntr.PieChartData"
%><%@page import="psdi.webclient.beans.startcntr.PieChartData.PieChartItem"
%><%
String layoutId =  component.getProperty("layoutid");
ResultSetPortlet portletControl = (ResultSetPortlet)control;
PortletStateImpl portletStateManager = portletControl.getStateManager();
try {
	//If the portlet has never been loaded call this, once its loaded we do not clear the flag
	if(portletStateManager.isPortletNotLoaded(component))
	{
		%><%@ include file="portletloader.jsp" %><%
	}
	else
	{
		synchronized (portletControl.getAppBean().getPortletLoadingSync())
		{
		String methodName = "makeChart" + id.replace('-','_');
		String labels[] = portletControl.getLabels();
		String openRecordlbl = wcs.getMessage("startcntr","openrecord");
		String sortLabel = wcs.getMessage("startcntr","sortlbl");
		String precedeGraph = "false";
		String chartName = "portletchart_"+layoutId;
		String servPath =  wcs.getMaximoRequestContextURL();
	
		boolean viewChanged = portletControl.hasViewChanged();
		boolean filterToggled = portletStateManager.isFilterToggled();
		boolean stateChanged = portletStateManager.isPortletStateChanged();
		boolean isBidiEnabled = BidiUtils.isBidiEnabled();
	
		// 12-14163 - Hide the numeric labels that overflow from the pie chart.
		String chartstyle = "cursor:pointer;overflow:hidden"; 
	
		//if just view changed or filter was toggled, then don't re render as there is no need to redraw
		//but this flag had to be turned on when these events were fired so that jsp could be hit
		if(viewChanged || filterToggled || stateChanged)
			portletControl.setChangedFlag(false);
	
		if(session.getAttribute("precedegraph"+layoutId) != null)
			precedeGraph = (String)session.getAttribute("precedegraph"+layoutId);
		MboSetData data = portletControl.getResultSet();	
		boolean hideFilter  =  !Boolean.valueOf(portletControl.isFilterOpen());
		boolean hideHeadings = false;
		if(WebClientRuntime.is7504FPEnabled()) {
			hideHeadings = ((data == null) || (data.getMboDataCount() == 0)) && hideFilter;
		}
		if((portletStateManager.wasPortletLoadCalled())
				|| (portletStateManager.isPortletLoaded() && component.hasChanged() && !stateChanged))
		{
			List graphData = null;
			Properties graphDetails = null;
			String graphErrorMsg = null;
	
			portletControl.setUpDefaults();
	
			String conditionAttribute = portletControl.getConditionAttribute();
			String[] groupByAttribute = portletControl.getGroupByAttribute();
			
			String keyAttribute = portletControl.getKeyColumn();
			Vector attributes = portletControl.getResultSetAttributes();
			int noOfRecords = portletControl.getNoOfRecords();
			String rsApp = portletControl.getAppName();
			String column = component.getProperty("columnnum");
			String errorMsg = portletControl.errorInPortlet();
			
			MboSetInfo rInfo = null;
			MboSetInfo cInfo = null;
			if (isBidiEnabled)
			{
				rInfo = portletControl.getResultMboSetInfo();
				cInfo = portletControl.getConfigMboSetInfo();
			}
	
			int iStart = Integer.parseInt(component.getProperty("start"));
			int rowsToDisplay = Integer.parseInt(component.getProperty("rowstodisplay"));
	
			if(rowsToDisplay == 0)
				rowsToDisplay = 10;
	
			int iEnd = iStart + rowsToDisplay;
	
			String sortType = component.getProperty("sorttype");
			String sortAttribute = component.getProperty("sortattribute");
	
			String otherEvents = "onmouseout=\"return noStatus();\" "+
								"onfocus=\"return noStatus();\" "+
								"onmouseover=\"return noStatus();\" ";
	
			if(data == null || data.getMboDataCount()==0)
			{
				graphData = null;
				precedeGraph = "false";
			}
			else
			{
				//	get graph information only if the current view is chart
				if(precedeGraph.equals("true") || component.getProperty("showchart").equals("true") || groupByAttribute!=null)
				{
					graphData = portletControl.generateGraphData();
					graphErrorMsg = portletControl.getGraphError();
					String bAlign = "";
					if (isBidiEnabled && rInfo != null)
					{
						if(graphData!=null)
						{
							for(int i = 0; i < graphData.size(); i++)
							{
								Hashtable htData =  (Hashtable)graphData.get(i);
								String val = BidiUtils.applyBidiAttributes(rInfo,htData.get("attr").toString(),htData.get("value").toString(),langcode);	 				   
								htData.put("value", val);
								if (i == 0)
									bAlign = BidiUtils.isLTRExpression(BidiUtils.getMboComplexExpressionType(rInfo,htData.get("attr").toString()))? "left" : "";
							}
						}
					}
					graphDetails =  portletControl.getGraphDetails();
					graphDetails.setProperty("langcode", langcode);
					if ((isBidiEnabled && cInfo != null) || ("RTL".equals(BidiUtils.getLayoutOrientation(langcode))))
					{
						String attr = BidiUtils.enforceBidiDirection(graphDetails.getProperty("attributename"),
								BidiUtils.getMboTextDirection(cInfo,graphDetails.getProperty("attribute"),true));
						graphDetails.setProperty("attributename", attr);
						graphDetails.setProperty("align", bAlign);
					}
				}
			}
	
			if(precedeGraph.equals("true") && (graphDetails== null || graphDetails.isEmpty()))
			{
				precedeGraph = "false";
				session.setAttribute("precedegraph"+layoutId,"false");
			}
	
			holderId="portletbody_"+layoutId;
	
	%>	<component vis="true"  ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%> 
				<div id='rsportletgraph_<%= layoutId %>' style='display:<%= precedeGraph.equals("true")?"inline":"none" %>; position:relative; top:0;'>
	<%					if(graphData != null)
					{
							ResultSetGraph rsGraph = new ResultSetGraph(graphData, graphDetails, control.getWebClientSession());
							ChartData chartData  = rsGraph.makeChartData();
	%>					<%--  portletinternalheader --%>
					<table role="presentation" width="100%" cellspacing="0" border="0" cellpadding="0" align="<%=defaultAlign%>" class="plinner">
						<tr>
							<td colspan=2>
	<%								if(portletControl.getProperty("readonlymode").equals("false"))
								{
	%>								<table role="presentation" width="100%"  cellspacing="0" cellpadding="0" align="center">
									<tr>
										<td aria-hidden="true" class="pih" width="45%" nowrap="true" valign="middle" align="<%=defaultAlign%>">
											<span class="<%=textcss%> pihl"><%=labels[0] %>:</span>
											<a class="pl" title="<%=graphDetails.getProperty("chartname")%>" tabindex="0" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('rsdisplay','<%=id %>','<%=layoutId%>');}" href="javascript:sendEvent('rsdisplay','<%=id %>','<%=layoutId%>')" <%=otherEvents %>>
												<%=graphDetails.getProperty("chartname")%></a>
										</td>
										<td class="pih" width="45%" align="<%=reverseAlign%>" valign="middle">
											<span class="<%=textcss%> pihl"><%=labels[1] %>:</span>
											<a class="pl" title="<%=graphDetails.getProperty("attributename")%>" tabindex="0" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('rsdisplay','<%=id %>','<%=layoutId%>');}"  href="javascript:sendEvent('rsdisplay','<%=id %>','<%=layoutId%>')" <%=otherEvents %>>
											<%=graphDetails.getProperty("attributename")%></a>   
										</td>
									</tr>
								</table>
	<%								}
	%>							</td>
						</tr>
						<%--  portletinternalheader end --%>
	<%
							if(!portletControl.queryExists())
							{//if query doesn't exist then display error message
	%>							<tr>
								<td class="<%=textcss%> pnc">
									<%= labels[13] %>
								</td>
							</tr>
	<%							}
							else if(attributes.isEmpty())
							{
	%>							<%@ include file="portletnotsetupmsg.jsp" %>
	<%							}
							else if (errorMsg!=null)
							{
	%>							<tr>
								<td class="<%=textcss%> pnc">
									<%= labels[14]%><br><%=graphErrorMsg%>
								</td>
							</tr>
	<%							}
							else
							{
								if (USERAGENT.equals("IE"))
									chartstyle = chartstyle+";height: 400px";
								else
									chartstyle = chartstyle+";height: 85%";
	%>
						<%--  rsgraph --%>
						<tr>
							<td aria-hidden="true" <%if(column.equals("1")){%><%="width=\"60%\""%><%}%> valign="top" ><%= rsGraph.getTitle()%>
							<div id="rchart_<%= id %>" style="<%=chartstyle%>" dir="ltr"<%/*This is a hack but without it labels aren't aligned correctly in rtl*/%>></div>
							<script type="text/javascript">
								dojo.require('layers.mbs.startcenter');
								dojo.require('dojox.charting.Chart');
								dojo.require('dojox.charting.action2d.Tooltip');
								dojo.require('dojox.charting.action2d.MoveSlice');
								dojo.require('dojox.charting.axis2d.Default');
								dojo.require('dojox.charting.plot2d.Pie');
								dojo.require('dojox.charting.plot2d.Columns');
	<%							if(rtl)
							{
	%>								dojo.require("dojox.charting.BidiSupport");
								dojo.require("dojox.charting.widget.BidiSupport");
	<%							}
							String chartRef = "chart" + id.replace('-','_') + "_ref";
	%>								document.<%=methodName%> = function()
								{
									if (document.<%=chartRef%>)
									{
										document.<%=chartRef%>.destroy();
									}
	<%							if(chartData instanceof PieChartData)
							{
								PieChartData pieChartData = (PieChartData)chartData;
								JSONArray sliceData = new JSONArray();
								JSONArray urls = new JSONArray();
								JSONArray xlabels = new JSONArray();
							
								int start = rtl?pieChartData.items.length-1:0;
								int end = rtl?-1:pieChartData.items.length;
								for(int i = start; i != end; )
								{
									PieChartItem item = pieChartData.items[i];
									JSONObject slice = new JSONObject();
									slice.put("y", item.value);
									slice.put("color", item.color);
									slice.put("stroke", "white");
									slice.put("text", item.value);
									slice.put("tooltip", item.tooltip);
									sliceData.add(slice);
									urls.add(item.url);
									JSONObject xlabel = new JSONObject();
									xlabel.put("value", i + 1);
									xlabel.put("text", item.text);
									xlabels.add(xlabel);
									if(rtl) i--; else i++;
								}
	%>									var urls = <%=urls%>;
									var chart = new dojox.charting.Chart("rchart_<%= id %>");
	
									chart.addPlot("default", {
										type: "Pie",
										font: "normal normal 11px sans-serif",
										fontColor: "black",
										labelWiring: "#ccc",
										labelStyle: "columns",
										htmlLabels: true,
										startAngle: 0,
										radius: 75
									});
									chart.addSeries("Series A", <%=sliceData%>);
	
									new dojox.charting.action2d.MoveSlice(chart, "default");
									new dojox.charting.action2d.Tooltip(chart, "default");
	<%							}
							else if(chartData instanceof BarChartData)
							{
								BarChartData barChartData = (BarChartData)chartData;
								JSONArray barData = new JSONArray();
								JSONArray urls = new JSONArray();
								JSONArray xlabels = new JSONArray();
	
								int length = barChartData.items.length;
								for(int i = 0; i < length; i++)
								{
									BarChartItem item = barChartData.items[rtl ? length - i - 1 : i];
									JSONObject bar = new JSONObject();
									bar.put("y", item.value);
									bar.put("fill", item.color);
									bar.put("tooltip", item.tooltip);
									barData.add(bar);
									urls.add(item.url);
									JSONObject xlabel = new JSONObject();
									xlabel.put("value", i + 1);
									xlabel.put("text", item.text);
									xlabels.add(xlabel);
								}
	%>									var urls = <%=urls%>;
									var chart = new dojox.charting.Chart("rchart_<%= id %>");
	
									chart.addAxis("y", {vertical: true, includeZero: true, majorTicks: true, minorTicks: false, majorTickStep: <%=barChartData.tickInterval%><%=rtl?",leftBottom: false":""%>});
									chart.addAxis("x", {
										natural: true, labels: <%=xlabels%>, majorLabels:true, minorLabels:true, 
										majorTicks:true, minorTicks:true, majorTickStep:10, minorTickStep:1, rotation:90
									});
									chart.addPlot("default", {type: "Columns", font: "normal normal 11pt sans-serif", gap: 10});
									chart.addSeries("Series 1" , <%=barData%>);
									new dojox.charting.action2d.Tooltip(chart, "default");
	<%							}
	%>									chart.connectToPlot("default", this, function(evt)
									{
										if(evt.type == "onclick")
										{
											sendEvent('showrsdata','<%=portletControl.getId()%>',urls[evt.index]);
											return;
										}
									});
									chart.render();
									document.<%=chartRef%> = chart;
								}
	<%							if("true".equals(precedeGraph))
							{
	%>								dojo.addOnLoad(function() {
									document.<%=methodName%>();
								});	
	<%							}
	%>							</script>
	
							</td>
	<%
							if(graphData != null && column.equals("1"))
							{
	%>								<td width="60%" align="center" valign="top" style="padding-top:5">
									<%@ include file="resultsetportletlegend.jsp"%>
								</td>
	<%							}
	%>						</tr>
	<%
							if(graphData != null && column.equals("0"))
							{
	%>						<tr>
							<td align="center" >
								<%@ include file="resultsetportletlegend.jsp"%>
							<td>
						</tr>
	<%							}
	%>							<tr>
								<td class="plfooterb" valign="middle" align="<%=defaultAlign%>" nowrap="true" colspan="20">&nbsp;
									<a tabindex="0" title="<%=labels[4] %>" class="<%=textcss%> pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('changeview','<%= id %>','LIST');}"   href="javascript:sendEvent('changeview','<%= id %>','LIST')" <%=otherEvents %>>
										<%=labels[4] %></a>
								</td>
							</tr>
	<%							}//else
	%>					</table>
	<%					}//if graphData is not null
	
					if(errorMsg!=null)
					{
	%>						<span class="<%=textcss%> pnc pe" align="center" valign="top"><%= labels[14] %></span><br><span class="<%=textcss%> pnc" align="center" valign="top"><%=errorMsg %></span>
	<%					}
	
					if(graphErrorMsg!=null)
					{
	%>						<br><span class="<%=textcss%> pnc" align="center" valign="top"><%=graphErrorMsg %></span><br>
						<span style="font-style:normaltext-align:left;padding-left:10px"><a tabindex="0" title="<%=labels[4] %>" class="<%=textcss%> pl" style="font-style:normal" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('changeview','<%= id %>','LIST');}"   href="javascript:sendEvent('changeview','<%= id %>','LIST')" <%=otherEvents %>><%=labels[4] %></a></span>
	<%					}
	%>				</div>
				<%--  end rsgraph --%>
	
				<%-- begin rsdata --%>
				<div id='rsportletdata_<%= layoutId %>' style='display:<%=(precedeGraph.equals("false"))?"inline":"none" %>; position:relative; top:0;'>
					<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="<%=defaultAlign%>" class="plinner">
	<%					if(data != null)
						{
	%>						<tr id="header_row_<%=layoutId%>" style="<%if(hideHeadings){%>display:none<%}%>">
	<%								//display all column headings
								for(int i = 0;i < attributes.size(); i++)
								{
									String[] arrColumn = (String[])attributes.elementAt(i);
									//check if sorting is on then send 0
									String sortField = arrColumn[0];
									String bAlign = isBidiEnabled && BidiUtils.isLTRExpression(BidiUtils.getMboComplexExpressionType(rInfo,arrColumn[0])) ? "style='text-align: left;'" : "";
	%>							<td class="<%=textcss%> khtc" nowrap="true"  <%= bAlign %>>
								&nbsp;
								<span>
	<%								if(arrColumn[0].indexOf(".") != -1)
									{
	%>									<span>
	<%									}
									else
									{
	%>										<a tabindex="0" title="<%=sortLabel%>" class="<%=textcss%> pl ibhc" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('sort','<%= id %>','<%=arrColumn[0]%>');}"  href="javascript:sendEvent('sort','<%= id %>','<%=arrColumn[0]%>')" <%=otherEvents %>>
	<%									}
									String finalData = !(isBidiEnabled && cInfo != null)? arrColumn[1] : BidiUtils.enforceBidiDirection(arrColumn[1],
											BidiUtils.getMboTextDirection(cInfo,"DESCRIPTION",true));
									out.print(finalData);
									%></a>
									<% if(sortAttribute.equalsIgnoreCase(sortField)){%>
									<%@ include file="portletsort.jsp" %>
									<% } %>
									</span>
								</span>
							</td>
	<%								}/*end for*/
	%>						</tr>
	
	<%					if(data != null)
						{
	%>							<tr id="filter_row_<%=layoutId%>" class="<%=textcss%> rstfc" style="<%if(hideFilter){%>display: none<%}%>">
	<%							//display all column headings
							String[] arrColumn = null;
							for(int i = 0;i < attributes.size(); i++)
							{
								arrColumn = (String[])attributes.elementAt(i);
								String bAlign = isBidiEnabled &&
										BidiUtils.isLTRExpression(BidiUtils.getMboComplexExpressionType(rInfo,arrColumn[0])) ? 
												"style='text-align: left;'" : "";
								if (BidiUtils.getLayoutOrientation(langcode).equals("RTL"))
									bAlign="style='text-align: right;'";
	%>								<td id="filter_cells_<%=layoutId%>_<%=i%>" class="rsfco" <%= bAlign %>>
									&nbsp;
									<span id="filter_dataspan_<%=layoutId%>_<%=i%>">
	<%										if(arrColumn[0].indexOf(".") == -1)
										{
											String bidiAttrs = isBidiEnabled? BidiUtils.buildTagAttribute(portletControl.getQbeSetting(arrColumn[0]),
												BidiUtils.getMboTextDirection(rInfo,arrColumn[0],true),"",true) : "";
	%>										<input
											id="<%= arrColumn[0] %>@<%=layoutId%>"
											type="text"
											onblur="rsportlet_filterActivate(this,false)"
											onfocus="rsportlet_filterActivate(this,true);setCurrentfocusId(event, this);"
											onkeypress="rsportlet_onkeypress(event,'<%=id%>',this.id)"
											onchange="rsportlet_onchange(event,this,this.id,'<%=control.getId()%>')"
											onmouseup="rsportlet_onmouseup(this)"
											class="<%=textcss%> ib"
											name="filter_<%= arrColumn[0] %>_<%=layoutId%>"
											value="<%=portletControl.getQbeSetting(arrColumn[0]) %>"
											<%= bidiAttrs %>
											tabindex="0"
											title="<%= arrColumn[1] %>"
											size="5"
											maxlength="254"/>
	<%										}
										else
										{
											%>&nbsp;<%
										}
	%>									</span>
								 </td>
	<%							 }/*end for*/
	%>							</tr>
	<%								if(data.getMboDataCount() == 0)
								{
	%>							<tr>
								<td class="<%=textcss%> pnc" colspan="<%= arrColumn.length %>" style="text-align:center" >
									&nbsp;<%= wcs.getMessage("jspmessages","tablenorowsmessage") %>
								</td>
							</tr>
	<%								}
							}//end if
	
							if(data != null)
							{
								for(int i = 0; i < data.getMboDataCount(); i++)
								{
									MboData mboData = data.getMboData(i); //Get Mbo data current row
									String style = "";
									if(!conditionAttribute.equals(""))
									{
										MboValueData conditionValue = mboData.getMboValueData(conditionAttribute);
										style = portletControl.compareValues(conditionValue);
										//decide on color
									}
	%>						<tr valign="top" >
	<%								for(int j = 0;j < attributes.size(); j++)
								{
									String[] arrColumn = (String[])attributes.elementAt(j);//get column details
	
									MboValueData keyValue = mboData.getMboValueData(keyAttribute); //Get data of key attribute
									if(keyAttribute!=null)
										keyValue = mboData.getMboValueData(keyAttribute); //Get data of key attribute
									MboValueData displayData = mboData.getMboValueData(arrColumn[0]);//get data to display
									String appToGo = "";
	
									if(rsApp.equalsIgnoreCase("WORKVIEW"))
										appToGo = mboData.getMboValueData("app").getData().toLowerCase();
									else
										appToGo = rsApp.toLowerCase();
									String bAlign = isBidiEnabled &&
											BidiUtils.isLTRExpression(BidiUtils.getMboComplexExpressionType(rInfo,arrColumn[0]))? "align='left'" : "";
	%>							<td style="padding-<%=defaultAlign%>:5px" <%= bAlign %>>
								<a tabindex="0" title="<%=openRecordlbl %>" class="<%=textcss%> rsd <% if(keyValue != null) { out.println("pkr");%>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%= id %>','<%= appToGo%>-<%= keyValue.getDataAsLong() %>');}"  href="javascript:sendEvent('openrecord','<%=id %>','<%= appToGo%>-<%= keyValue.getDataAsLong() %>')" <% }%>  <%=otherEvents %>>
									<span <%= style %>><%
									if(displayData!=null)
									{
										String finalData = !(isBidiEnabled && rInfo != null)? displayData.getData() :
										BidiUtils.applyBidiAttributes(rInfo,arrColumn[0],displayData.getData(),langcode);
										%><%=WebClientRuntime.makesafevalue(finalData)%><%
									}
									%></span>
								</a>
							</td>
	<%								}//end for
	%>						</tr>
						<tr valign="top">
							<td colspan="<%= attributes.size() %>" height="1" class="psep"></td>
						</tr>
	<%							}//end for
						}//end if
	
						//If There are more records to display, display scrolling links
						if(noOfRecords > 0 )
						{
	%>							<tr valign="top">
								<td colspan="<%= attributes.size() %>"  align="<%=reverseAlign%>" >
									<div height="5" border="1" >
										<table role="presentation" class="plfooter" width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td valign="middle" align="<%=defaultAlign%>" nowrap="true">
													&nbsp;
	<%													if(graphErrorMsg!=null || graphData != null)
													{//graphical view
	%>													<a tabindex="0" title="<%=labels[6] %>" class="<%=textcss%> pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('changeview','<%= id %>','CHART');}"  href="javascript:sendEvent('changeview','<%= id %>','CHART')" <%=otherEvents %>>
														<%=labels[6] %></a>
	<%													}
													else
													{
														if(portletControl.getProperty("readonlymode").equals("false"))
														{
	%>													<a tabindex="0" title="<%=labels[7] %>" class="<%=textcss%> pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('rsdisplay','<%=id %>','<%=layoutId%>');}" href="javascript:sendEvent('rsdisplay','<%=id %>','<%=layoutId%>')" <%=otherEvents %>>
														<%=labels[7] %></a>
	<% 														}
													}
	%>												</td>
												<td align="<%=reverseAlign%>" width="220" class="text">
													<%@ include file="portletlistscroll.jsp" %>
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
	<%						}//if noOfRecords
	
						if(data == null && !attributes.isEmpty())
						{
	%>							<tr>
								<td class="<%=textcss%> pnc" align="center" valign="top" colspan="<%= attributes.size() %>"><%=labels[11] %></td>
							</tr>
	<%						}
					}//if showing result set
	
					if(attributes.isEmpty())
					{
	%>						<%@ include file="portletnotsetupmsg.jsp" %>
	<%					}
	
					if(errorMsg!=null)
					{
	%>						<tr>
							<td class="<%=textcss%> pnc" align="center" valign="top" colspan="<%= attributes.size() %>"><span class="pe"><%= labels[14] %></span><br><span><%=errorMsg %></span></td>
						</tr>
	<%					}
	%>					</table>
				</div>
	<script>finishPortlet("<%=layoutId%>");</script>
	<%="]]>"%></component>
	<%
		portletStateManager.setStateLoaded();
	
		if( portletControl.hasChanged())
		{
			//works for both refresh and sort
			portletControl.setChangedFlag(false);
		}
	}//if needs render
	else
	{
		//Static events will be handled here. No data is fetched only div switching is done, but this follows component
		//properties being updated.
	
		if(viewChanged)
		{
	%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
		<script>
	<%			if(precedeGraph.equals("false"))
			{
	%>				hideShowElement("rsportletdata_<%=layoutId%>", "inline");
				hideShowElement("rsportletgraph_<%=layoutId%>", "none");
	<%			}
			else
			{
	%>				hideShowElement("rsportletdata_<%=layoutId%>", "none");
				hideShowElement("rsportletgraph_<%=layoutId%>", "inline");
				document.<%=methodName%>();
	<%			}
			portletControl.setViewChanged(false);
	%>		finishPortlet("<%=layoutId%>");
		</script>
	<%="]]>"%></component>
	<%		}//view changed
		if(filterToggled)
		{
	%>			<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
				<script>
					hideShowElement("filter_row_<%=layoutId%>",<%=!hideFilter%>);
					hideShowElement("header_row_<%=layoutId%>",<%=!hideHeadings%>);
				</script>
			<%="]]>"%></component>
	<%			portletStateManager.setFilterToggled(false);
		}
	
		//	/If the portlet state is changed then fire the javascript to toggle its state
		if(portletStateManager.isPortletStateChanged())
		{
	%>			<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
				<script>
				var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
				hideShowElement("portletbody_<%=layoutId%>_outer",(portletContent.style.display =='none'));
				</script>
			<%="]]>"%></component>
	<%			portletStateManager.setPortletStateChanged(false);
		}
	}
	} 
	}
}
catch(Throwable e) {
	if(wcs.getDebugLevel() > 0) {
		e.printStackTrace();
	}
	%><component vis="true"  ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
		<script>deadPortlet("<%=id%>");</script>
	<%="]]>"%></component><%
}

%><%@ include file="../common/componentfooter.jsp" %>
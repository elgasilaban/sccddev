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
This JSP is the handler for KPIGraph Portlet component.
It provides the user interface for the KPIGraph portlet.

Main Events fired by this component are
- Update of KPIs
- Open KPI(s)
- Open Linked Report
- Open Linked KPI
--%><%@page import="psdi.app.kpi.KPIUtil.Trend"%>
<%@page import="psdi.app.kpi.KPIUtil.Status"%>
<%@include file="../common/simpleheader.jsp"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.webclient.beans.startcntr.KPIGraph"
%><%@page import="psdi.webclient.beans.startcntr.ChartData"
%><%@page import="psdi.webclient.beans.startcntr.BarChartData"
%><%@page import="psdi.webclient.beans.startcntr.BarChartData.BarChartItem"
%><%@page import="psdi.webclient.beans.startcntr.DialChartData"
%><%
String layoutId = component.getProperty("layoutid");
String servPath = wcs.getMaximoRequestContextURL();

KPIGraphPortlet portletControl = (KPIGraphPortlet)control;
PortletStateImpl portletStateManager = portletControl.getStateManager();

///intially when the portlet has not been loaded
//if the portlet has not been loaded ever call this.
//once its loaded we do not clear the flag
if(portletStateManager.isPortletNotLoaded(component))
{
%><%@ include file="portletloader.jsp" %><%
}
else
{
	synchronized (portletControl.getAppBean().getPortletLoadingSync())
	{
	String[] dialchartvalues = portletControl.getDialChartValues();
	String dialheight = dialchartvalues[0];
	String dialwidth = dialchartvalues[1];
	String dialradius = dialchartvalues[2];
	String dialcx = dialchartvalues[3];
	String dialcy = dialchartvalues[4];
	String dialrangewidth = dialchartvalues[5];
	String dialrangeoffset = dialchartvalues[6];
	String dialhandwidth = dialchartvalues[7];
	String dialhandlength = dialchartvalues[8];
	String dialmajortickoffset = dialchartvalues[9];

	Vector kpis = null;
	boolean isEmpty = false;
	boolean isBidiEnabled = BidiUtils.isBidiEnabled();
	String dir = !langcode.equalsIgnoreCase("AR")? "dir='ltr'" : "";
	ChartData chartData = null;
	String chartstyle = "width:100%; height:100%;";
	int noOfKpis = 0;//so we dont call it many times

	boolean stateChanged = portletStateManager.isPortletStateChanged();
	//if just porlet was minimised  then don't re render as there is no need to redraw
	//but this flag had to be turned on when these events were fired so that jsp could be hit
	if(stateChanged)
		portletControl.setChangedFlag(false);

	if(portletStateManager.wasPortletLoadCalled()
			|| (portletStateManager.isPortletLoaded() && component.hasChanged() && !stateChanged))
	{
		Hashtable kpi = null;
		String sReportName = "";
		String sLinkedKPI = "";
		kpis = portletControl.getKPIs();
		isEmpty = kpis.isEmpty();
		noOfKpis = kpis.size();//so we dont call it many times

		String labels[] = portletControl.getLabels();
		boolean displayList = portletControl.displayList();

		holderId="portletbody_"+layoutId;
%>	<component vis="true"  ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
		<table role="presentation" width="100%" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>" class="plinner">
<%
		//For all KPis selected, display data, with Trend and status depending on the respective values
		if(!isEmpty)
		{
			if(noOfKpis == 1)
			{
				kpi = (Hashtable)kpis.elementAt(0);
				sReportName = kpi.get("reportnum").toString();
				sLinkedKPI = kpi.get("linkto").toString();
			}

			String dojoTypeInput = "";
			String userCalendar = s.getUserInfo().getCaltype().toLowerCase();
			boolean isNational = !CalendarUtils.GREGORIAN.equalsIgnoreCase(userCalendar);
			Date date = null;
			if(isNational)
			{
				Locale userLocale = s.getUserInfo().getLocale();
				try
				{
					if(kpis.size()==1)
					{
						date = MXFormat.stringToDateTime(kpi.get("lastupdated").toString(),userLocale);
					}
					else
					{
						date = MXFormat.stringToDateTime(portletControl.getLastDate(),userLocale);
					}
					String usrLocale = userLocale.toString().toLowerCase().replace('_', '-');
					String dojoDatePattern = "constraints=\"{";
					String dojoLang = "lang=\""+usrLocale+"\"";
					String dojoPackage = psdi.util.CalendarUtils.getDojoDatePackage(userCalendar);
					String datePackage = "datePackage=\""+dojoPackage+"\"";

%>				<script>
					dojo.require('layers.mbs.calendar');
					dojo.addOnLoad(function() {
						dojo.require('<%=dojoPackage%>');
						dojo.require('<%=dojoPackage%>.locale');
						dojo.requireLocalization('dojo.cldr', '<%=userCalendar%>','<%=usrLocale%>','ROOT');
					});
				</script>
<%
					dojoDatePattern+= "datePattern:'"+MXFormat.getDatePattern(userLocale) + "', timePattern:'"+MXFormat.getDisplayTimePattern(userLocale)+"'";
					dojoDatePattern+=",locale:'"+usrLocale+"'}\"";
					dojoTypeInput = dojoTypeInput + " " + dojoDatePattern;
					dojoTypeInput = dojoTypeInput + " " + datePackage + " " +dojoLang;
					if(date != null)
						dojoTypeInput = dojoTypeInput + "dojovalue='" + date.getTime() +"'";
				}
				catch(Exception e)
				{
					dojoTypeInput = "";
				}
			}
%>			<tr>
				<td colspan=2>
					<table role="presentation" width="100%" cellspacing="0" cellpadding="0" align="center">
						<tr>
<%							if(noOfKpis==1 && !displayList) //&& narrow column
							{
								if(!sReportName.equals("") || !sLinkedKPI.equals(""))
								{
%>								<td width="1%" nowrap valign="bottom" align="<%=defaultAlign%>"  class="pih">
									<table role="presentation" width="100%" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>">
										<tr>
<%											if(!sReportName.equals(""))
											{
%>											<td>
												<a tabindex="0" title="<%= labels[0] +": "+kpi.get("reportdesc")  %>" class="pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','<%=id %>','<%=sReportName%>');}" href="javascript:sendEvent('openreport','<%=id %>','<%=sReportName%>')">
													<img align="<%=defaultAlign%>" alt="<%= labels[0] +": "+kpi.get("reportdesc") %>" src="<%= IMAGE_PATH %>btn_report_link.gif" border="0"/>
												</a>
											</td>
<%											}
											if(!sLinkedKPI.equals(""))
											{
%>											<td>
												<a tabindex="0" title="<%= labels[1] +": "+kpi.get("linktodesc") %>" class="pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%= id %>',<%= sLinkedKPI %>);}" href="javascript:sendEvent('openrecord','<%= id %>',<%= sLinkedKPI %>)">
													<img align="<%=defaultAlign%>" alt="<%= labels[1] +": "+kpi.get("linktodesc") %>" src="<%= IMAGE_PATH %>btn_kpi_link.gif" border="0"/>
												</a>
											</td>
<%											}
%>										</tr>
									</table>
								</td>
<%								}
							}
%>							<td aria-hidden="true"  width="50%" nowrap="true" valign="middle" class="pih" align="<%=defaultAlign%>">
								<span class="text pihl"><%=labels[9]%>:</span>
								<span id="<%=layoutId%>_lastUpdate" class="portletinternalsettinglabellink" <%=dojoTypeInput%>>
<%								if(!isNational)
								{
									if(noOfKpis==1) 
									{
										%><%=kpi.get("lastupdated").toString()%><%
									}
									else
									{
										%><%=portletControl.getLastDate()%><%
									}
								}
%>								&nbsp;
								</span>
<%								if(isNational)
								{
%>								<script>
									addLoadMethod("formatCalendarLabel('<%=layoutId%>_lastUpdate');");
								</script>
<%								}
%>							</td>
							<td width="40%" align="<%=reverseAlign%>" valign="middle" class="pih">
								<a tabindex="0" title="<%=labels[2]%>" class="pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('updatekpis','<%=id%>');}" href="javascript:sendEvent('updatekpis','<%=id%>')">
									<%=labels[2]%>
								</a>
							</td>
						</tr>
					</table>
				</td>
			</tr>
<%
			if(noOfKpis >= 1)
			{
				//KPI Header where there is just one KPI and the KPis is in the narrow section
				if(!displayList)
				{
					String statusColor = "";
					String statusClass = "";

%>			<tr>
				<td>
					<div>
						<table role="presentation" border="0" bgcolor="white" width="100%" cellpadding="0" cellspacing="0" >
							<tr>
<%								if(portletControl.isLinkedToReport())
								{
%>								<td class="text khtc" style="text-align:center"><%= labels[12] %></td>
<%								}
								if(portletControl.isLinkedToKPI())
								{
%>								<td class="text khtc" style="text-align:center"><%= labels[13] %></td>
<%								}
%>								<td class="text khtc" style="text-align:center"><%= labels[3] %></td>
								<td class="text khtnc"><%= labels[4] %></td>
								<td class="text khtnc"><%= labels[5] %></td>
								<td class="text khtnc"><%= labels[6] %></td>
								<td class="text khtnc">&nbsp;<%= labels[7] %></td>
							</tr>
<%							for(int i=0;i< noOfKpis; i++)
							{
								kpi = (Hashtable)kpis.elementAt(i);
								Trend trend = (Trend)kpi.get("trend");
								Status status = (Status)kpi.get("status");
								statusColor	= KPIPortlet.getKPIStatusColor(status, wcs);
								statusClass	= KPIPortlet.getKPIClass(status);
								String sPercentMark  = "";

								if((kpi.get("format").toString()).equalsIgnoreCase("PERCENT"))
									sPercentMark = portletControl.percentKPIMark();

%>							<tr>
<%								if(portletControl.isLinkedToReport())
								{
%>								<td align="center">
<%									if(kpi.get("reportnum") !=null && !kpi.get("reportnum").toString().equals("") )
									{
%>									<a tabindex="0" title="<%=labels[0] +": "+  kpi.get("reportdesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>');}" href="javascript:sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>')">
										<img alt="<%=labels[0] +": "+ kpi.get("reportdesc") %>" src="<%= IMAGE_PATH %>btn_report_link.gif" border="0"/>
									</a>
<%									}
%>								</td>
<%								}
								if(portletControl.isLinkedToKPI())
								{
%>								<td align="center">
<%									if(kpi.get("linkto")!=null && !kpi.get("linkto").toString().equals(""))
									{
%>									<a tabindex="0" title="<%=labels[1] +": "+  kpi.get("linktodesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>');}" href="javascript:sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>')">
										<img alt="<%=labels[1] +": "+  kpi.get("linktodesc") %>" src="<%= IMAGE_PATH %>btn_kpi_link.gif" border="0"/>
									</a>
<%									}
%>								</td>
<%								}
%>								<td  align="center">
									<a tabindex="0" title="<%=labels[11] %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%=id %>',<%= kpi.get("kpiuid") %>);}"  href="javascript:sendEvent('openrecord','<%=id %>',<%= kpi.get("kpiuid") %>)">
										<img alt="<%= WebClientRuntime.makesafevalue(kpi.get("kpiname").toString())+" - "+labels[9]+":"+kpi.get("lastupdated") %><%= ", "+labels[10]+":"+portletControl.formatNumber(kpi.get("lastkpivalue")) %>" style="background-color:<%=statusColor%>" src="<%=IMAGE_PATH + trend.image()%>" border="0" />
									</a>
								</td>
								<td class="text <%= statusClass %>" <%= dir %>>
									<%= portletControl.formatNumber(kpi.get("lastkpivalue")) %>
								</td>
								<td class="text <%= statusClass %>" <%= dir %>>
									<%= portletControl.formatNumber(kpi.get("kpivalue")) %>
								</td>
								<td class="text <%= statusClass %>" <%= dir %>>
									<%= portletControl.formatNumber(kpi.get("target")) %>
								</td>
								<td  class="text <%= statusClass %>" <%= dir %>>
									<%= portletControl.formatNumber(kpi.get("variance")) %>
								</td>
							</tr>
							<tr valign="top">
<%
								int colspan = 7;
								if((!portletControl.isLinkedToReport() && portletControl.isLinkedToKPI()) ||  (portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI()) )
									colspan = 6;
								else if(!portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI())
									colspan = 5;

%>								<td colspan=<%=colspan %> class="psep"></td>
							</tr>
<%							}//for
%>						</table>
					</div>
				</td>
			</tr>
<%				} //!displayList
			}//if more than one

%>			<tr>
				<td id="kpigraphtitle_<%=layoutId %>" valign="middle">
<%
				if(portletStateManager.wasPortletLoadCalled() || (portletStateManager.isPortletLoaded() && component.hasChanged()))
				{
					String chartName = "portletchart_"+layoutId;

					KPIGraph kpiGraph = new KPIGraph(kpis, true, wcs);
					chartData = kpiGraph.makeChartData();

					if (chartData != null)
					{
						chartstyle = "width: 100%";
	
						if (USERAGENT.equals("IE"))
							chartstyle = chartstyle+";height: 300px; width:400px;";
						else
							chartstyle = chartstyle+";height: 85%;";
					}

					if (noOfKpis == 1)
					{
%>					<%= kpiGraph.getTitle()%>
<%					}
				}
%>				</td>
			</tr>
			<tr>
				<td valign="middle" width="40%" aria-hidden="true">
					<div id="kpiportletchart_<%= id %>_holder" style="<%=chartstyle%>" dir="ltr"<%/*This dir is a hack but without it labels aren't aligned correctly in rtl*/%>></div>
				</td>
<%				if((portletStateManager.wasPortletLoadCalled() || (portletStateManager.isPortletLoaded() && component.hasChanged()))
					&& chartData != null)
				{
					String methodName = "makeChart" + id.replace('-','_');
					String chartRef = "chart" + id.replace('-','_') + "_ref";

%>					<script type="text/javascript">
						dojo.require('layers.mbs.startcenter');
						dojo.addOnLoad(function()
						{
<%							if(chartData instanceof DialChartData)
							{
								DialChartData dialData = (DialChartData)chartData;
%>								dojo.require('ibm.tivoli.mbs.dijit.kpi.DialGauge');
								document.<%=methodName%> = function()
								{
									var dJit = dijit.byId("kpiportletchart_<%= id %>");
									if(dJit)
										dJit.destroyRecursive(true);

									var gauge = new ibm.tivoli.mbs.dijit.kpi.DialGauge({<%
										%>id: "kpiportletchart_<%= id %>", <%
										%>width: <%=dialwidth%>, <%
										%>height: <%=dialheight%>, <%
										%>radius: <%=dialradius%>, <%
										%>cx: <%=dialcx%>, <%
										%>cy: <%=dialcy%>, <%
										%>url: <%=dialData.url != null ? '"' + wcs.getMaximoRequestContextURL() + dialData.url + '"': null%>,<%
										%>startValue: <%=dialData.start%>, <%
										%>endValue: <%=dialData.end%>, <%
										%>hover: "<%=dialData.label%>", <%
										%>innerColor: "<%=dialData.innerColor%>", <%
										%>tickOffset: <%=dialmajortickoffset%>, <%
										%>tickInterval: <%=dialData.tickInterval%>, <%
										%>arc1Color: "<%=dialData.arc1Color%>", <%
										%>arc1Label: "<%=dialData.arc1Label%>", <%
										%>arc1Threshold: <%=dialData.arc1Threshold%>, <%
										%>arc2Color: "<%=dialData.arc2Color%>", <%
										%>arc2Label: "<%=dialData.arc2Label%>", <%
										%>arc2Threshold: <%=dialData.arc2Threshold%>, <%
										%>arc3Color: "<%=dialData.arc3Color%>", <%
										%>arc3Label: "<%=dialData.arc3Label%>", <%
										%>target: <%=dialData.target%>, <%
										%>targetColor: "<%=dialData.targetColor%>", <%
										%>targetLabel: "<%=dialData.targetLabel%>", <%
										%>value: <%=dialData.kpi%>, <%
										%>valueColor: "<%=dialData.kpiColor%>", <%
										%>valueLabel: "<%=dialData.kpiLabel%>"<%
										if(rtl)
										{
											%>,orientation: "cclockwise"<%
										}
									%>}, 'kpiportletchart_<%= id %>_holder');
									gauge.startup();
								};
								dojo.addOnLoad(document.<%=methodName%>);
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
%>								dojo.require('dojox.charting.Chart');
								dojo.require('dojox.charting.action2d.Tooltip');
								dojo.require('dojox.charting.axis2d.Default');
								dojo.require('dojox.charting.plot2d.Columns');
<%								if(rtl)
								{
%>								dojo.require("dojox.charting.BidiSupport");
								dojo.require("dojox.charting.widget.BidiSupport");
<%								}
%>
								document.<%=methodName%> = function()
								{
									if (document.<%=chartRef%>)
									{
										document.<%=chartRef%>.destroy();
									}
									var barurls = <%=urls.serialize()%>;
									var chart = new dojox.charting.Chart('kpiportletchart_<%= id %>_holder');
									chart.addAxis("y", {vertical: true, includeZero: true, majorTicks: true, minorTicks: false, majorTickStep: <%=barChartData.tickInterval%><%=rtl?",leftBottom: false":""%>});
									chart.addAxis("x", {natural: true, labels: <%=xlabels%>});
									chart.addPlot("default", {type: "Columns", font: "normal normal 11pt sans-serif", gap: 5});
									chart.addSeries("Series 1" , <%=barData%>);
									new dojox.charting.action2d.Tooltip(chart, "default");
									chart.connectToPlot("default", this, function(evt)
									{
										if(evt.type == "onclick")
										{
											warnExit = false;
											parent.window.location = "<%=wcs.getMaximoRequestContextURL()%>" + barurls[evt.index];
										}
										else if(evt.type == "onmouseover")
										{
											dojo.style("kpiportletchart_<%= id %>_holder", "cursor", "pointer");
										}
										else if(evt.type == "onmouseout")
										{
											dojo.style("kpiportletchart_<%= id %>_holder", "cursor", null);
										}
									});

									chart.render();
									document.<%=chartRef%> = chart;
								};
								dojo.addOnLoad(document.<%=methodName%>);
<%							}
%>						});
					</script>
<%				}

				//List of KPIs when the list has to be displayed.
				if(displayList)
				{
%>					<td nowrap style="padding-<%=defaultAlign%>:1" valign="top">
					<table role="grid" border="0" width="100%" cellspacing="0" cellpadding="0" <%if(accessibilityMode){%>summary="<%=control.getProperty("label")%>"<%}%>>
						<tr role="row">
<%							if(portletControl.isLinkedToReport())
							{
%>							<th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center"><%= labels[12] %></th>
<%							}
							if(portletControl.isLinkedToKPI())
							{
%>							<th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center"><%= labels[13] %></th>
<%							}
%>							<th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center" nowrap><%=labels[3]%></th>
							<th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px" nowrap><%=labels[8]%></th>
							<th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px" nowrap><%=labels[5]%></th>
							<th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px" nowrap><%=labels[6]%></th>
							<th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px" nowrap><%=labels[7]%></th>
						</tr>
<%
					for(int i = 0 ;i < noOfKpis; i++)
					{
						kpi = (Hashtable)kpis.elementAt(i);
						String tdClass = KPIPortlet.getKPIClass((Status)kpi.get("status"));
						String statusColor = KPIPortlet.getKPIStatusColor((Status)kpi.get("status"), wcs);
						Trend trend = (Trend)kpi.get("trend"); 
						String sPercentMark  = "";

						if((kpi.get("format").toString()).equalsIgnoreCase("PERCENT"))
							sPercentMark = portletControl.percentKPIMark();

%>						<tr role="row">
<%							if(portletControl.isLinkedToReport())
							{
%>							<td role="gridcell"  align="center">
<%								if(kpi.get("reportnum") !=null && !kpi.get("reportnum").toString().equals("") )
								{
%>								<a tabindex="0" title="<%=labels[0] +": "+   kpi.get("reportdesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>');}" href="javascript:sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>')">
									<img alt="<%=labels[0] +": "+  kpi.get("reportdesc") %>" src="<%= IMAGE_PATH %>btn_report_link.gif" border="0"/>
								</a>
<%								} %>
							</td>
<%							}
							if(portletControl.isLinkedToKPI())
							{
%>							<td role="gridcell"  align="center">
<%								if(kpi.get("linkto")!=null && !kpi.get("linkto").toString().equals(""))
								{
%>								<a tabindex="0" title="<%=labels[1] +": "+  kpi.get("linktodesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>');}" href="javascript:sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>')">
									<img alt="<%=labels[1] +": "+  kpi.get("linktodesc") %>" src="<%= IMAGE_PATH %>btn_kpi_link.gif" border="0"/>
								</a>
<% 								}
%>							</td>
<%							}
							
%>							<td role="gridcell" align="center">
								<a tabindex="0" class="text" title="<%=labels[11] %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%= id %>',<%= kpi.get("kpiuid") %>);}"  href="javascript:sendEvent('openrecord','<%= id %>',<%= kpi.get("kpiuid") %>)">
									<img class="kpilisttrendImage" alt="<%= labels[9]+":"+kpi.get("lastupdated") %><%= ", "+labels[10]+":"+portletControl.formatNumber(kpi.get("lastkpivalue")) %>" style="background-color:<%=statusColor%>" src="<%=IMAGE_PATH + trend.image()%>" border="0"/>
								</a>
							</td>
<%							String kpiname = !isBidiEnabled? kpi.get("kpiname").toString() : kpi.get("kpinamebidi").toString();  //bidi-hcg-SC
							String rtlPercentMark = "";
							String lang = portletControl.getWebClientSession().getUserLanguageCode();
							if (isBidiEnabled && BidiUtils.hasDifferDirection(kpiname,lang))
							{
								rtlPercentMark = sPercentMark + "&nbsp;";
								sPercentMark = "";
							}
%>							<td role="gridcell" class="text <%=tdClass%> kdb">
								<%= rtlPercentMark %><%= WebClientRuntime.makesafevalue(kpiname) %><%= sPercentMark %>
							</td>
							<td role="gridcell" class="text <%= tdClass %>" <%= dir %>>
								<%= portletControl.formatNumber(kpi.get("kpivalue")) %>
							</td>
							<td role="gridcell" class="text <%= tdClass %>" <%= dir %>>
								<%= portletControl.formatNumber(kpi.get("target")) %>
							</td>
							<td role="gridcell" class="text <%= tdClass %>" <%= dir %>>
								<%= portletControl.formatNumber(kpi.get("variance")) %>
							</td>
						</tr>
						<tr valign="top">
<%
							int colspan = 7;
							if((!portletControl.isLinkedToReport() && portletControl.isLinkedToKPI()) ||  (portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI()) )
								colspan = 6;
							else if(!portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI())
								colspan = 5;

%>							<td colspan=<%=colspan %>  class="psep"></td>
						</tr>
<%					} //end for
%>					</table>
				</td>
<%				}// displayList
%>			</tr>
<%		}//end if !isEmpty
		//If no kPIs were selected then display the portlet not setup message
		if(isEmpty)
		{
%>		<%@ include file="portletnotsetupmsg.jsp" %>
<%
		}
%>		</table>
	<script>finishPortlet("<%=layoutId%>");</script>
	<%="]]>"%></component>
<%
		portletStateManager.setStateLoaded();
	}

	if(portletStateManager.isPortletUpdated())
	{
		portletStateManager.setPortletUpdated(false);
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
			new_outer = getElementById("portletbody_<%=layoutId%>");
			old_outer = getElement("portletbody_<%=layoutId%>");
			old_outer.innerHTML = new_outer.innerHTML;
			old_outer.setAttribute("aria-busy", "false");
			finishPortlet("<%=layoutId%>");
		</script><%="]]>"%></component>
<%
				//Render chart after the iframe has been written from the hidden frame
				String chartName = "portletchart_"+layoutId;
				KPIGraph kpiGraph = new KPIGraph(kpis, true, wcs);
				chartData = kpiGraph.makeChartData();

				if (chartData != null)
				{
%>					dojo.require('layers.mbs.startcenter');
					dojo.addOnLoad(function() {
						dojo.addOnLoad(function() {
							var dJit = dijit.byId("kpiportletchart_<%= id %>");
							if(dJit)
								dJit.destroyRecursive(true);
						});
					});

<%					if(chartData instanceof DialChartData)
					{
						DialChartData dialData = (DialChartData)chartData;
%>						dojo.require('ibm.tivoli.mbs.dijit.kpi.DialGauge');
						document.makeKpiportletChart_<%= id %> = function()
						{
							var dJit = dijit.byId("kpiportletchart_<%= id %>");
							if(dJit)
								dJit.destroyRecursive(true);

							var gauge = new ibm.tivoli.mbs.dijit.kpi.DialGauge({<%
								%>id: "kpiportletchart_<%= id %>", <%
								%>width: <%=dialwidth%>, <%
								%>height: <%=dialheight%>, <%
								%>radius: <%=dialradius%>, <%
								%>cx: <%=dialcx%>, <%
								%>cy: <%=dialcy%>, <%
								%>url: <%=dialData.url != null ? '"' + wcs.getMaximoRequestContextURL() + dialData.url + '"': null%>,<%
								%>startValue: <%=dialData.start%>, <%
								%>endValue: <%=dialData.end%>, <%
								%>hover: "<%=dialData.label%>", <%
								%>innerColor: "<%=dialData.innerColor%>", <%
								%>tickOffset: <%=dialmajortickoffset%>, <%
								%>tickInterval: <%=dialData.tickInterval%>, <%
								%>arc1Color: "<%=dialData.arc1Color%>", <%
								%>arc1Label: "<%=dialData.arc1Label%>", <%
								%>arc1Threshold: <%=dialData.arc1Threshold%>, <%
								%>arc2Color: "<%=dialData.arc2Color%>", <%
								%>arc2Label: "<%=dialData.arc2Label%>", <%
								%>arc2Threshold: <%=dialData.arc2Threshold%>, <%
								%>arc3Color: "<%=dialData.arc3Color%>", <%
								%>arc3Label: "<%=dialData.arc3Label%>", <%
								%>target: <%=dialData.target%>, <%
								%>targetColor: "<%=dialData.targetColor%>", <%
								%>targetLabel: "<%=dialData.targetLabel%>", <%
								%>value: <%=dialData.kpi%>, <%
								%>valueColor: "<%=dialData.kpiColor%>", <%
								%>valueLabel: "<%=dialData.kpiLabel%>"<%
							%>}, 'kpiportletchart_<%= id %>_holder');
							gauge.startup();
						};
						dojo.addOnLoad(document.makeKpiportletChart_<%= id %>);
<%					}
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
%>
						dojo.require('dojox.charting.Chart');
						dojo.require('dojox.charting.action2d.Tooltip');
						dojo.require('dojox.charting.axis2d.Default');
						dojo.require('dojox.charting.plot2d.Columns');
						dojo.require("dojox.charting.BidiSupport");
						dojo.require("dojox.charting.widget.BidiSupport");
						document.makeKpiportletChart_<%= id %> = function()
						{
							if (document.makeKpiportletChart_<%=id%>_ref)
							{
								document.makeKpiportletChart_<%=id%>_ref.destroy();
							}
							var barurls = <%=urls.serialize()%>;
							var chart = new dojox.charting.Chart('kpiportletchart_<%= id %>_holder');
							chart.addAxis("y", {vertical: true, includeZero: true, majorTicks: true, minorTicks: false, majorTickStep: <%=barChartData.tickInterval%><%=rtl?",leftBottom: false":""%>});
							chart.addAxis("x", {natural: true, labels: <%=xlabels%>});
							chart.addPlot("default", {type: "Columns", font: "normal normal 11pt sans-serif", gap: 5});
							chart.addSeries("Series 1" , <%=barData%>);
							new dojox.charting.action2d.Tooltip(chart, "default");
							chart.connectToPlot("default",this, function(evt)
							{
								if(evt.type == "onclick")
								{
									parent.window.location = "<%=wcs.getMaximoRequestContextURL()%>" + barurls[evt.index];
								}
								else if(evt.type == "onmouseover")
								{
									dojo.style("kpiportletchart_<%= id %>_holder", "cursor", "pointer");
								}
								else if(evt.type == "onmouseout")
								{
									dojo.style("kpiportletchart_<%= id %>_holder", "cursor", null);
								}
							});
							chart.render();
							document.makeKpiportletChart_<%=id%>_ref = chart;
						}
						dojo.addOnLoad(document.makeKpiportletChart_<%= id %>);
<%					}
				}
				if (noOfKpis ==1)
				{
%>					var kpititleid = getElement("kpigraphtitle_<%=layoutId %>");
					if(!undef(kpititleid ))
					{
						kpititleid.innerHTML = "<%=kpiGraph.getTitle()%>";
					}
<%				}
%>	finishPortlet("<%=layoutId%>");</script><%="]]>"%></component><%
	}

	if(portletControl.hasChanged())
	{
		portletControl.setChangedFlag(false);
	}

	//	/If the portlet state is changed then fire the javascript to toggle its state
	if(portletStateManager.isPortletStateChanged())
	{
		portletStateManager.setPortletStateChanged(false);
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
			<script>
			var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
				hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
			</script>
	<%="]]>"%></component>
<%	}
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
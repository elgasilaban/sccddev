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
This JSP renders the graph portion in the KPIGRAPH control in the KPI Manager application.
--%><%@ include file="../common/simpleheader.jsp"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.webclient.beans.common.ChartUtil"
%><%@page import="psdi.webclient.beans.startcntr.ChartData"
%><%@page import="psdi.webclient.beans.startcntr.DialChartData"
%><%@page import="psdi.webclient.beans.kpi.LineChartData"
%><%@page import="psdi.webclient.beans.kpi.LineChartData.LineChartItem"
%><%@page import="psdi.webclient.beans.kpi.LineChartData.LineChartItem.Point"
%><%

String height = component.getProperty("height");
String width = component.getProperty("width");
String scroll = component.getProperty("scroll");
String border = component.getProperty("border");
String src = component.getProperty("src");
String type = component.getProperty("type");

boolean nograph=false;
KPIGraph kpiGraph = (KPIGraph)control;

if(type.equalsIgnoreCase("dial"))
	kpiGraph.refreshChart();

String graphTitle = kpiGraph.setGraphInfo(type);
if(kpiGraph.isNewKPI()) 
{
	String iframedivAutoId="";
	String nomsgAutoId="";
	if(automation)
	{
		iframedivAutoId="automationid=\""+realId+"_iframe_div\"";
		nomsgAutoId="automationid=\"nographmessage\"";
	}

%>	<div aria-hidden="true" id="<%=id%>_iframe_div" <%=iframedivAutoId%> align="center" valign="middle">
		<div id="nographmessage" <%=nomsgAutoId%> style="text-align:middle;<% if(kpiGraph.isNewKPI()){ %>display:inline<%}else{%>display:none<%}%>">
			<table role="presentation" class="nkm" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
				<tr>
					<td width="100%" height="100%" align="center" valign="middle"><br><br>
						<%=wcs.getMessage("kpi","notrun")%>
					</td>
				<tr>
			</table>
		</div>
	</div>
<%
}
else if (!"trend".equalsIgnoreCase(type) || wcs.getCurrentApp().get("kpitrendchart") != null)
{
	ChartData chartData;
	if(type.equalsIgnoreCase("trend"))
	{
		chartData = (ChartData)wcs.getCurrentApp().get("kpitrendchart");
	}
	else
	{
		chartData = (ChartData)wcs.getCurrentApp().get("kpimainchart");
	}

%>	<div aria-hidden="true" id="<%=id%>_div" <%if(automation){%>automationid="<%=realId%>_div"<%}%> style="width:100%;height:100%;display:inline">
<%	if (graphTitle != null) 
	{
%>		<table aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="10%">
			<td width="10%" valign="bottom" align="center" nowrap="true">
				<%=graphTitle%>
			</td>
		</table>
<%	}
%>		<table aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
			<tr colspan="3">
				<td>
					<div id="kpichart_<%= id %>_holder" style="width: 100%; height: 500" dir="ltr"<%/*This dir is a hack but without it labels aren't aligned correctly in rtl*/%>></div>
<%				if (chartData instanceof LineChartData)
				{
%>					<div align="center">
						<div id="kpichart_<%= id %>_legend_holder" style="width: 99%"></div>
					</div>
<%				}
%>				</td>
			</tr>
		</table>
	</div>
<%	if (chartData != null) 
	{
		String chartRef = "chart" + id.replace('-','_') + "_ref";

%>		<script type="text/javascript">
			dojo.require('layers.mbs.startcenter');
			dojo.addOnLoad(function ()
			{
				// Destroy everything outside the chart type checks because the type could have changed
				//Cleanup the gauge
				var dJit = dijit.byId("kpichart_<%=id%>");
				if(dJit)
					dJit.destroyRecursive(true);
				//Cleanup the line chart legend
				var dJitl = dijit.byId("kpichart_<%=id%>_legend_holder")
				if(dJitl)
					dJitl.destroyRecursive(true);
				if (document.<%=chartRef%>)
				{
					//A Chart is not a dojo widget, so we have to destroy it differently
					document.<%=chartRef%>.destroy();
				}

<%		if (chartData instanceof DialChartData)
		{
			DialChartData dialData = (DialChartData)chartData;
%>			dojo.require('ibm.tivoli.mbs.dijit.kpi.DialGauge');
			var gauge = new ibm.tivoli.mbs.dijit.kpi.DialGauge({<%
				%>id: "kpichart_<%= id %>", <%
				%>width: 400, <%
				%>height: 140, <%
				%>radius: 75, <%
				%>cx: 140, <%
				%>cy: 130, <%
				%>startValue: <%=dialData.start%>, <%
				%>endValue: <%=dialData.end%>, <%
				%>hover: "<%=dialData.label%>", <%
				%>innerColor: "<%=dialData.innerColor%>", <%
				%>tickOffset: 90, <%
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
			%>}, 'kpichart_<%= id %>_holder');
			gauge.startup();
<%		}
		else if (chartData instanceof LineChartData)
		{
			LineChartData lineChartData = (LineChartData)chartData;
			JSONArray yLabels = new JSONArray();
			double value = lineChartData.yMin;
			for (int j = 0; j < 11; j++)
			{
				JSONObject label = new JSONObject();
				label.put("value", value);
				label.put("text", ChartUtil.getChartUtil().formatNumber(value, wcs.getUserInfo().getLocale()));
				yLabels.add(label);
				value += lineChartData.yInterval;
			}
			
%>			dojo.require("dojo.date.locale");
			dojo.require('dojox.charting.Chart');
			dojo.require('dojox.charting.action2d.Tooltip');
			dojo.require('dojox.charting.axis2d.Default');
			dojo.require('dojox.charting.plot2d.Lines');
			dojo.require('dojox.charting.widget.Legend');
<%			if(rtl)
			{
%>			dojo.require("dojox.charting.BidiSupport");
			dojo.require("dojox.charting.widget.BidiSupport");
<%			}
%>
			var chart = new dojox.charting.Chart("kpichart_<%=id%>_holder"<%if(rtl){%>, {textDir: "rtl"}<%}%>);
			chart.addAxis("x", {
				"majorLabels": true,
				"minorLabels": false,
				"minorTick": false,
				"majorTickStep": <%=lineChartData.xInterval%>,
				"min": 0,
				"max": <%=lineChartData.dateCount%>,
				"labelFunc": function(axisNumericPosition)
				{
					var date = new Date(<%=lineChartData.startDate.getTime()%>);
					date = dojo.date.add(date, "day", <%if(rtl){%><%=lineChartData.dateCount%> - <%}%>parseInt(axisNumericPosition))
					return dojo.date.locale.format(date, {formatLength: 'short', selector:'date', locale: DOJOLOCALE});
				}
			});
			chart.addAxis("y", {
				"vertical": true,
				"includeZero": false,
				"majorTicks": true,
				"minorTicks": false,
				"min": <%=lineChartData.yMin%>,
				"max": <%=lineChartData.yMax%>,
				"majorTickStep": <%=lineChartData.yInterval%>,
<%				if(rtl)
				{
%>				"leftBottom": false,
<%				}
%>				"labels": <%=yLabels%>
			});

			var markers = dojox.charting.Theme.defaultMarkers;
			chart.addPlot("other", {type: "Lines", markers: true});
<%
			String[] markers = new String[] {"SQUARE", "CIRCLE", "TRIANGLE", "TRIANGLE_INVERTED", "DIAMOND"};

			for (int k = 0; k < lineChartData.lines.length; k++)
			{
				JSONArray points = new JSONArray();
				int length = lineChartData.lines[k].points.length;
				for(int i = 0; i < length; i++)
				{
					Point point = lineChartData.lines[k].points[rtl ? length - i - 1 : i];
					JSONObject data = new JSONObject();
					data.put("x", rtl ? lineChartData.dateCount - point.x : point.x);
					data.put("y", point.y);
					data.put("tooltip", point.tooltip);
					points.add(data);
				}
%>			chart.addSeries("<%=lineChartData.lines[k].description%>", <%=points%>, {"marker":markers.<%=markers[k % markers.length]%>, "stroke":{"color": "<%=lineChartData.lines[k].color%>"}, "plot":"other" });
<%			}
%>			new dojox.charting.action2d.Tooltip(chart, "other");
			chart.render();	
			new dojox.charting.widget.Legend({chart: chart}, 'kpichart_<%= id %>_legend_holder');
			document.<%=chartRef%> = chart;
<%		}
%>			});
		</script>
<%	}
}
%><%@ include file="../common/componentfooter.jsp" %>
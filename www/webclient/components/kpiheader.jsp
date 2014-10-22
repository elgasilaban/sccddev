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
--%><%--
This JSP renders the header portion in the KPIGRAPH control in the KPI Manager application. 
--%>
<%@page import="psdi.app.kpi.KPIUtil.Trend"%>
<%@page import="psdi.app.kpi.KPIUtil.Status"%>
<%@ include file="../common/simpleheader.jsp" %><%
if(component.getProperty("showheader").equals("true"))
{
	String type = component.getProperty("type");
	String headerclass = component.getProperty("headerclass");
	String dir = !langcode.equalsIgnoreCase("AR")? "dir='ltr'" : "";
	if(type.equalsIgnoreCase("dial"))
	{	
		String reportImage = component.getProperty("reportlinkimage");
		String kpiImage = component.getProperty("kpilinkimage");
	
		KPIGraph graphControl = (KPIGraph)control;
		String labels[] = wcs.getMessages("kpi",new String[]{"drillreport","drillkpi","lastrunlbl","updatelbl","statuslbl","actuallbl","lastreadlbl","targetlbl","variancelbl"});
		String statusClass	   = textcss+" ";
		String statusColor = "";	
		Status status;
		Trend trend;
		String sReportName = "";
		String sLinkedKPI  = "";
		Object sKPIDate	   = "";
		Hashtable htKPIData = null;
		//Get data and draw this control only if there is data
		if(!graphControl.isNewKPI())
		{ 	
			Vector vecData = graphControl.getKPIData();
	
		  if(vecData.size() != 0)
		  {
			htKPIData = (Hashtable)vecData.elementAt(0);
			status	   = (Status)htKPIData.get("status");
			trend 	   = (Trend)htKPIData.get("trend");
			sReportName = htKPIData.get("reportnum").toString();
			sLinkedKPI  = htKPIData.get("linkto").toString();
			sKPIDate	   = htKPIData.get("lastupdated");
			//IBMBIDI Start
	      	String dojoTypeInput = "";
	      	String userCalendar = s.getUserInfo().getCaltype().toLowerCase();
	      	boolean isNational = !CalendarUtils.GREGORIAN.equalsIgnoreCase(userCalendar);
	      	Date date = null;
	      	if(isNational)
	      	{
	      		Locale userLocale = s.getUserInfo().getLocale();
	      		try{
	      			date = MXFormat.stringToDateTime(sKPIDate.toString(),userLocale); 
	      			String usrLocale = userLocale.toString().toLowerCase().replace('_', '-');
		      		String dojoDatePattern = "constraints=\"{";
		      	    String dojoLang = "lang=\""+usrLocale+"\"";
		      		String dojoPackage = psdi.util.CalendarUtils.getDojoDatePackage(userCalendar);
		      		String datePackage = "datePackage=\""+dojoPackage+"\"";
		      		%>
		      		<script>
		      			dojo.require('<%=dojoPackage%>');
		      			dojo.require('<%=dojoPackage%>.locale');	
		      			//dojo.requireLocalization('dojo.cldr', '<%=userCalendar%>','<%=usrLocale%>','ROOT');
		      		</script>
		      		<%
		      		
		      		dojoDatePattern+= "datePattern:'"+MXFormat.getDatePattern(userLocale) + "', timePattern:'"+MXFormat.getDisplayTimePattern(userLocale)+"'";
		      		dojoDatePattern+=",locale:'"+usrLocale+"'}\"";
		      		dojoTypeInput = dojoTypeInput + " " + dojoDatePattern;
		      		dojoTypeInput = dojoTypeInput + " " + datePackage + " " +dojoLang;
		      		if(date!=null)
		      		dojoTypeInput = dojoTypeInput + "dojovalue='" + date.getTime() +"'";
	
	      		}catch(Exception e){
	      			dojoTypeInput = "";
	      		}
	      	}
	      	//IBMBIDI End
	
			statusColor = KPIPortlet.getKPIStatusColor(status, wcs);
			statusClass = KPIPortlet.getKPIClass(status);
			
			String graphhdrAutoId="";
			if(automation)
				graphhdrAutoId="automationid=\""+realId+"_graphheadertable\"";	
	%>
	<table role="presentation" id="<%=id%>_graphheadertable" <%=graphhdrAutoId%> class="<%=headerclass%>" width="100%" style="background-color: #EDEEED" cellspacing="0" cellpadding="0" align="center">
		<tr>
			<%if(!sReportName.equals("") || !sLinkedKPI.equals("")){%>
				<td width="10%" valign="bottom" nowrap="true">
					<%if(!sReportName.equals("")){%>
						<a tabindex="0" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','kpi','<%=sReportName %>');}" href="javascript:sendEvent('openreport','kpi','<%=sReportName %>')">
							<img alt="<%= labels[0] %>" src="<%= IMAGE_PATH + reportImage %>" border="0" />
						</a>
					<%}%>
					<%if(!sLinkedKPI.equals("")){%>
						<a tabindex="0" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openlinkedkpi','kpi','<%=sLinkedKPI %>');}" href="javascript:sendEvent('openlinkedkpi','kpi','<%=sLinkedKPI %>')">
							<img alt="<%= labels[1] %>" src="<%= IMAGE_PATH + kpiImage %>" border="0" />
						</a>
					<%}%>	
			    </td>
			<%}%>
			<td  id="<%=id%>_lsKPIDate" width="45%" class="<%=textcss%> kub" <%=dojoTypeInput%>>
		    	<%= labels[2] %>:<% if(!isNational){%><%= sKPIDate%><%}%>
	        </td>
	  		<td width="45%" class="<%=textcss%> kub" align="<%=reverseAlign%>">
  				<a tabindex="0" class="pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('updatekpis','kpi','kpi');}" href="javascript:sendEvent('updatekpis','kpi','kpi')"><%= labels[3] %></a>
	  		</td>
		</tr> 
		<tr>
			<td colspan="3">
		   		<table role="grid" border="0" bgcolor="white" width="100%" cellpadding="0" cellspacing="0">
					<tr role="row">
					    <th role="columnheader" width="10%" class="<%=textcss%> khtc">
					    	<%= labels[4] %>
					    </th>
					    <th role="columnheader" width="30%" class="<%=textcss%> khtnc">
					    	<%= labels[5] %>
					    </th>
					    <th role="columnheader" width="20%" class="<%=textcss%> khtnc">
					    	<%= labels[6] %>
					    </th>
					    <th role="columnheader" width="20%" class="<%=textcss%> khtnc">
					    	<%= labels[7] %>
					    </th>
					    <th role="columnheader" width="20%" class="<%=textcss%> khtnc">
					    	<%= labels[8] %>
					    </th>
					</tr>
					<tr role="row">
					    <td role="gridcell" width="10%" valign="bottom" <%=dir%>>
					    	&nbsp;&nbsp;<img alt="" style="background-color:<%=statusColor%>" src="<%=IMAGE_PATH + trend.image()%>" border="0" />
					    </td>
				    	<td role="gridcell" width="30%" class="<%= statusClass %>" <%=dir%>>                   
				    		<%= graphControl.formatNumber(htKPIData.get("kpivalue")) %> 
				    	</td>
					    <td role="gridcell" width="20%" class="<%= statusClass %>" <%=dir%>>
						    <%= graphControl.formatNumber(htKPIData.get("lastkpivalue")) %>
					    </td>
					    <td role="gridcell" width="20%" class="<%= statusClass %>" <%=dir%>>
						    <%= graphControl.formatNumber(htKPIData.get("target")) %>
					    </td>
					    <td role="gridcell" width="20%" class="<%= statusClass %>" <%=dir%>>
						    <%= graphControl.formatNumber(htKPIData.get("variance")) %>
					    </td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<%if(isNational)
	{%>
	<script>
		addLoadMethod("formatCalendarLabel('<%=id%>_lsKPIDate');");
	</script>
	<%}%>
<%
	  }// end if(vecData.size() != 0)
	  else
	  {%>
			<table role="presentation" border=0 height="100%" width="100%" align="center" valign="middle">
				<tr>
					<td  align="center" class="nokpigraph">			
			             <%=s.getMessage("kpi", "nochartdata")%>
					</td>
				</tr>
			</table>
	  
<%	  }
	}//if not new 
   }
}//if show header
%><%@ include file="../common/componentfooter.jsp" %>
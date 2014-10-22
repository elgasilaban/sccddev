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
This JSP is the handler for KPI List Portlet component.
It provides the user interface for the KPI List portlet.

Main Events fired by this component are:
- Update of KPIs
- Open KPI(s)
--%>
<%@page import="psdi.app.kpi.KPIUtil.Trend"%>
<%@page import="psdi.app.kpi.KPIUtil.Status"%>
<%@ include file="../common/simpleheader.jsp" %><%
String layoutId =  component.getProperty("layoutid");
KPIListPortlet portletControl = (KPIListPortlet)control;
PortletStateImpl portletStateManager = portletControl.getStateManager();

//intially when the portlet has not been loaded
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
	boolean isEmpty = false;
	boolean isBidiEnabled = BidiUtils.isBidiEnabled();  //bidi-hcg-SC
	String dir = ((isBidiEnabled && BidiUtils.isGUIMirrored(langcode)) || rtl)? "dir='ltr'" : "";
	int colspan = 7;
	boolean stateChanged = portletStateManager.isPortletStateChanged();
	//if just porlet was minimised  then don't re render as there is no need to redraw
	//but this flag had to be turned on when these events were fired so that jsp could be hit
	if(stateChanged)
		portletControl.setChangedFlag(false);
	
	if((portletStateManager.wasPortletLoadCalled()) 
			|| (portletStateManager.isPortletLoaded() && component.hasChanged() && !stateChanged))
	{	
		holderId="portletbody_"+layoutId;		
	
		Vector kpis = portletControl.getKPIs();
		isEmpty = kpis.isEmpty();
		String latestDate = portletControl.getLastDate();
		String labels[] = portletControl.getLabels();
	%><component vis="true" ignrdispstyle="true"  id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
		<table role="grid" id="<%=id%>" <%=automationId%> class="plinner" width="100%" border="0" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>">
	   	<%
	     	//If one or more KPIs are selected, display the Last update header
	     	if(!isEmpty)
	     	{
		      	
		      	if((!portletControl.isLinkedToReport() && portletControl.isLinkedToKPI()) ||  (portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI()) )
		      		colspan = 6;
		      	else if(!portletControl.isLinkedToReport() && !portletControl.isLinkedToKPI())
		      		colspan = 5;
	     %>
	 		<tr>
	     	   <td colspan="<%=colspan%>">
		           <table role="presentation" width="100%" cellspacing="0" cellpadding="0" align="center">
		           	<tr>
			            <td width="50%" class="pih" nowrap>
			                <span class="text pihl"><%=labels[7]+":" %></span>
			                <span class="portletinternalsettinglabellink">
				             <%=latestDate %>
							</span>
			            </td>
		    	        <td width="50%" align="<%=reverseAlign%>" class="pih">
		    	        	<a tabindex="0" class="pl" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('updatekpis','<%=id%>');}" href="javascript:sendEvent('updatekpis','<%=id%>')">
		    	        		<%= labels[0] %>
		    	        	</a>
		    	        </td>
		   	        </tr>
		           </table>
	          </td>
	       </tr>
	       <%-- Display the columns --%>
	    <tr role="row">
	 	     <% if(portletControl.isLinkedToReport()) { %>
	 	     <th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center"><%= labels[10] %></th>
	 	     <% } %>
	 	     <% if(portletControl.isLinkedToKPI()) { %>
	 	     <th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center"><%= labels[11] %></th>
	 	     <% } %>
	  	 	 <th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px;text-align:center" nowrap><%= labels[1] %></th>
	 	   	 <th role="columnheader" class="text khtc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px" nowrap><%= labels[6] %></th>
	 	   	 <th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px"  nowrap><%= labels[3] %></th>
	 	   	 <th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px"  nowrap><%= labels[4] %></th>
	 	   	 <th role="columnheader" class="text khtnc" style="padding-<%=defaultAlign%>:2px;padding-<%=reverseAlign%>:2px"  nowrap><%= labels[5] %></th>
	
		</tr>
	   	<%
	    	}//end if
	
		//For all KPis selected, display data, with Trend and status depending on the respective values
		for(int i = 0 ; i < kpis.size() ; i++)
	    {
			Hashtable kpi = (Hashtable)kpis.elementAt(i);
			Status status = (Status)kpi.get("status");
			Trend trend = (Trend)kpi.get("trend"); 
			String statusClass = KPIPortlet.getKPIClass(status);
			String statusColor = KPIPortlet.getKPIStatusColor(status, wcs);
			String sPercentMark  = "";
	
			if((kpi.get("format").toString()).equalsIgnoreCase("PERCENT"))
				sPercentMark = portletControl.percentKPIMark();
		 	 %>
		  		<tr role="row">
	 	 			 <% if(portletControl.isLinkedToReport()) { %>
					<td role="gridcell"  align="center">
						<% if(kpi.get("reportnum") !=null && !kpi.get("reportnum").toString().equals("") ) { %>
				    	<a tabindex="0" title="<%=labels[12] +": "+  kpi.get("reportdesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>');}" href="javascript:sendEvent('openreport','<%=id%>','<%= kpi.get("reportnum") %>')">
				    		<img alt="<%=labels[12] +": "+ kpi.get("reportdesc") %>" src="<%= IMAGE_PATH %>btn_report_link.gif" border="0"/>
				    	</a>
				    	<% } %>
				    </td>
				    <% } %>
				    <% if(portletControl.isLinkedToKPI()) { %>
					<td role="gridcell"  align="center">
						<% if(kpi.get("linkto")!=null && !kpi.get("linkto").toString().equals("")) { %>
				    	<a tabindex="0" title="<%=labels[13] +": "+  kpi.get("linktodesc") %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>');}" href="javascript:sendEvent('openrecord','<%=id%>','<%= kpi.get("linkto").toString() %>')">
				    		<img alt="<%=labels[13] +": "+ kpi.get("linktodesc") %>" src="<%= IMAGE_PATH %>btn_kpi_link.gif" border="0"/>
				    	</a>
				    	<% } %>
				    </td>
				    <% }
				    %>
			   		<td role="gridcell"  align="center">
				    	<a tabindex="0" title="<%= labels[9] %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openrecord','<%=id%>','<%= kpi.get("kpiuid") %>');}" href="javascript:sendEvent('openrecord','<%=id%>','<%= kpi.get("kpiuid") %>')">
				    		<img class="kpilisttrendImage" alt="<%= labels[7]+":"+kpi.get("lastupdated") %><%= ","+labels[8]+":"+portletControl.formatNumber(kpi.get("lastkpivalue")) %>" style="background-color:<%=statusColor%>;border-color: #<%=statusColor%>;" src="<%=IMAGE_PATH + trend.image()%>" border="0"/>
				    	</a>
				    </td>
				    <% String kpiname = !isBidiEnabled? kpi.get("kpiname").toString() : kpi.get("kpinamebidi").toString();  //bidi-hcg-SC
					   String rtlPercentMark = "";
					   String lang = portletControl.getWebClientSession().getUserLanguageCode();
					   if (isBidiEnabled && BidiUtils.hasDifferDirection(kpiname,lang)) {
						   rtlPercentMark = sPercentMark + "&nbsp;";
						   sPercentMark = "";
					   }	   
				    %> 
				    <td role="gridcell" class="text <%=statusClass%> kdb">
				    <%= rtlPercentMark %><%= WebClientRuntime.makesafevalue(kpiname) %><%= sPercentMark %></td>
				    <td role="gridcell" class="text <%=statusClass%>" <%=dir%>><%= portletControl.formatNumber(kpi.get("kpivalue")) %></td>
				    <td role="gridcell" class="text <%=statusClass%>" <%=dir%>><%= portletControl.formatNumber(kpi.get("target")) %></td>
				    <td role="gridcell" class="text <%=statusClass%>" <%=dir%>><%= portletControl.formatNumber(kpi.get("variance")) %></td>
			    </tr>
			    <tr valign="top">
		          <td colspan=<%=colspan %> class="psep"></td>
		       </tr>
	
		<%
	           }//end for
	  		if(isEmpty)
	  	    {
	  	    %>
	  			<%@ include file="portletnotsetupmsg.jsp" %>
	  		<%
	  		}
	  	    %>
		</table>
		<script>finishPortlet("<%=layoutId%>");</script>
	<%="]]>"%></component>
	<%	portletStateManager.setStateLoaded();
	}
	if(portletStateManager.isPortletUpdated())
	{
		portletStateManager.setPortletUpdated(false);%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
		<script>
			new_outer = getElementById("portletbody_<%=layoutId%>");
			old_outer = getElement("portletbody_<%=layoutId%>");
			old_outer.innerHTML=new_outer.innerHTML;
			old_outer.setAttribute("aria-busy", "false");
			finishPortlet("<%=layoutId%>");
		</script>
	<%="]]>"%></component>
<%	}
	
	if(portletControl.hasChanged())
		portletControl.setChangedFlag(false);
	
	//	/If the portlet state is changed then fire the javascript to toggle its state
	if(portletStateManager.isPortletStateChanged())
	{
		portletStateManager.setPortletStateChanged(false);	%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
		<script>
			var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
			hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
		</script>
	<%="]]>"%></component>
<%	}
	}
}	%><%@ include file="../common/componentfooter.jsp" %>
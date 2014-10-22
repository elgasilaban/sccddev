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
This JSP is the handler for Report List Portlet component.
It provides the user interface for the portlet.

Main Events fired by this component are
- Open application via change app

CREATED ON: April 18, 2006
--%>
<%@ include file="../common/simpleheader.jsp" %><% 
String layoutId =  component.getProperty("layoutid");
ReportListPortlet portletControl = (ReportListPortlet)control;
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
	boolean stateChanged = portletStateManager.isPortletStateChanged();
	
	//if just porlet was minimised  then don't re render as there is no need to redraw
	//but this flag had to be turned on when these events were fired so that jsp could be hit   
	if(stateChanged)
		portletControl.setChangedFlag(false);
		
	if(portletStateManager.wasPortletLoadCalled() 
			|| (portletStateManager.isPortletLoaded() && component.hasChanged() && !stateChanged))
	{
			int noOfRecords = 0; 
			int iStart 		= 0;
			int iEnd  		= 0;	
			int rowsToDisplay = 10;		
			SortedMap<Integer, Map<String, String>> data =  null;
	
			data = portletControl.getReports();
			noOfRecords = portletControl.getNoOfReports(); //must be called after getSelectedReports
			
			iStart = Integer.parseInt(component.getProperty("start"));
			rowsToDisplay	= Integer.parseInt(component.getProperty("rowstodisplay"));
		
			if(rowsToDisplay == 0)
				rowsToDisplay = 10;
			
			iEnd 	= iStart+rowsToDisplay;
			
			String otherEvents = "onmouseout=\"return noStatus();\" "+
							"onfocus=\"return noStatus();\" "+
							"onmouseover=\"return noStatus();\" ";		
							
			holderId="portletbody_"+layoutId;	%>
		<component vis="true"  ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
	    	<table role="presentation" id="<%=id%>" <%=automationId%> width="100%" border="0" class="plinner" align="<%=defaultAlign%>">         	    
	   <%	if(data != null)
			{	
			     int datacount = data.size();
			     if(datacount > 0)
			     {	%>		 
				<tr>
				  <td class="plss"></td>
				  <td style="height:4px;" nowrap></td>
				</tr>		     
			<%	Set<Integer> entries = data.keySet();
				for(Integer i:entries)		
				{
	    		    Map mboData = data.get(i); //Get Mbo data current row
					String reportDesc = mboData.get("report.description").toString();    		       	
					int reportNum = Integer.parseInt(mboData.get("report.reportnum").toString());		
					String reportApp = mboData.get("appname").toString();
					String reportName = mboData.get("reportname").toString();			
					String eventValue = reportName+"$"+reportApp+"$"+reportNum;	%>
				<tr>
					<td class="plss"></td>
					<td nowrap>
						<a tabindex="0" title="<%=reportDesc %>" class="<%=textcss%> rsd" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('openreport','<%= id %>','<%= eventValue %>');}"  href="javascript:sendEvent('openreport','<%=id %>','<%= eventValue %>')" <%=otherEvents %>>
						  <%= WebClientRuntime.makesafevalue(reportDesc)%>
						</a>
					</td>
				</tr>						
				<tr>
					<td class="plss"></td>
					<td class="psep" nowrap></td>
				</tr>
			<%
				}
			%>			
				<tr>
					<td class="plss"></td>
					<td class="text" style="text-align:<%=reverseAlign%>" >
					    <%@ include file="portletlistscroll.jsp" %>
					</td>
				</tr>		
			<%	
			    }
			    else
			    {
			%>
				<tr>
					<td class="<%=textcss%> pnc" style="text-align:center" >
					    <%= wcs.getMessage("jspmessages","tablenorowsmessage") %>
					</td>
				</tr>	
			<%	}			
			}
			else
			{	%>			
				<%@ include file="portletnotsetupmsg.jsp" %>				 		
		<%	}	%>							
		</table>
		<script>finishPortlet("<%=layoutId%>");</script>
	<%="]]>"%></component>
	<% 	portletStateManager.setStateLoaded();
		if( portletStateManager.isPortletUpdated())
		{
			portletStateManager.setPortletUpdated(false);
			//works for both refresh and sort
		%><component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
				new_outer = getElementById("portletbody_<%=layoutId%>");
				old_outer = getElement("portletbody_<%=layoutId%>");
				old_outer.innerHTML=new_outer.innerHTML;
				old_outer.setAttribute("aria-busy", "false");
				finishPortlet("<%=layoutId%>");
	    </script><%="]]>"%></component><%		 
		
		}//if refreshed	
	}
	else
	{
		///If the portlet state is changed then fire the javascript to toggle its state	
		if(portletStateManager.isPortletStateChanged())
		{	%>
			<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
				<script>
					var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
					hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
				</script>
			<%="]]>"%></component>	
		<%	portletStateManager.setPortletStateChanged(false);
		}
	}
	}
}	%><%@ include file="../common/componentfooter.jsp" %>
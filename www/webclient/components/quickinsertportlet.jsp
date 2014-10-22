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
This JSP is the handler for Quick Insert portlet component. It provides user interface for the portlet

Events fired by this component are;
- Open application in INSERT mode.
--%>
<%@ include file="../common/simpleheader.jsp" %><%

String layoutId =  component.getProperty("layoutid");
QuickInsertPortlet portletControl = (QuickInsertPortlet)control;
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
	
	if(portletStateManager.wasPortletLoadCalled())
	{	
		holderId="portletbody_"+layoutId;	
		
	%><component id="<%=id%>_holder"  vis="true" ignrdispstyle="true" holder="<%=holderId%>" comptype="<%=component.getType()%>">
	<%="<![CDATA["%><table role="presentation" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>" class="plinner">
	   		<%
			ArrayList allActions = portletControl.getRenderData();
			if(portletControl.hasData())
			{
				if(allActions!=null)
				{
					StringBuffer sb = new StringBuffer();
					StringBuffer imgSb = new StringBuffer();
					for(int i = 0; i < allActions.size(); i++)
					{			
						sb.setLength(0);
						imgSb.setLength(0);
						Hashtable appInfo = (Hashtable)allActions.get(i);
						String appId 		= appInfo.get("app").toString();	
						String customDesc  	= appInfo.get("desc").toString();					
						String actionId 	= appInfo.get("optionname").toString();	
						String actionDesc   = appInfo.get("optiondesc").toString();						
						String templateId   = appInfo.get("templateid").toString();
						//String appImage = "action_"+actionId.toLowerCase()+"_"+appId.toLowerCase()+".gif";//StringBuffer
						imgSb.append("action_").append(actionId.toLowerCase()).append("_").append(appId.toLowerCase()).append(".gif");
						sb.append(appId).append("$").append(actionId).append("$").append(templateId);
						if(customDesc.equals(""))
							customDesc = actionDesc;
			%>
						<tr>
						  <td class="pls"></td>
						  <td colspan="2" style="height:4px;" nowrap></td>
		  				  <td class="prs"></td>
						</tr>
						<tr>
							<td class="pls"></td>						
							<td  nowrap  align="<%=defaultAlign%>"  valign="top" style="vertical-align:top;">
								<div nowrap class="bc" style='display:inline;text-align:<%=rtl?reverseAlign:defaultAlign%>'>
			        				 <a ctype="label" tabindex="0" href="Javascript: sendEvent('quickinsert','<%=portletControl.getId()%>','<%=sb.toString()%>',3);" class="text qil" title="<%=customDesc%>" >
			        				 <img  src='<%=IMAGE_PATH%><%=imgSb.toString() %>'  alt="<%=customDesc%>" class="qim"/><%=customDesc%></a>
								</div>
							</td
						<td class="prs"></td>
						</tr>
						<tr>
						  <td class="pls"></td>
						  <td colspan="2" class="psep" nowrap></td>
		  				  <td class="prs"></td>
						</tr><%
					}
				}
			}
			else
			{
				if(portletControl.areAllActionsRestricted())
				{
		%>
			<tr>
				<td class="<%=textcss%> pnc">
					<%=wcs.getMessage("startcntr","noactionaccess") %>
				</td>
			</tr>
		 <%
				}
			 	else
			 	{
		%>
			<%@ include file="portletnotsetupmsg.jsp" %>
		 <%
			 	}
			}
		 %>
		</table><script>finishPortlet("<%=layoutId%>");</script>
	<%="]]>"%></component>		  
	<% 
	//mark the portlet state loaded
		portletStateManager.setStateLoaded();
	}
	else
	{
		//	/If the portlet state is changed then fire the javascript to toggle its state
		if(portletStateManager.isPortletStateChanged())
		{
			portletStateManager.setPortletStateChanged(false);	%>
		<component vis="true" id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
			<script>
			var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
				hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
			</script>
		<%="]]>"%></component>		
	<%	}
	}
	}
}	%><%@ include file="../common/componentfooter.jsp" %>
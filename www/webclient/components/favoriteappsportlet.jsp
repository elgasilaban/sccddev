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
This JSP is the handler for Favorite Applications Portlet component.
It provides the user interface for the portlet.

Main Events fired by this component are
- Open application via change app

CREATED ON: April 18, 2006
--%><%@ include file="../common/simpleheader.jsp" %><%
String layoutId =  component.getProperty("layoutid");
FavoriteAppsPortlet portletControl = (FavoriteAppsPortlet)control;
PortletStateImpl portletStateManager = portletControl.getStateManager();

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
		
%>	<component vis="true" ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
		<table role="presentation" id="<%=id%>" <%=automationId%> class="plinner" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>">
<%			TreeMap favoriteApps = portletControl.getRenderData();

			if(portletControl.hasData())
			{
				for(int i = 0; i < favoriteApps.size(); i++)
				{
					Hashtable appInfo = (Hashtable)favoriteApps.get(new Integer(i+1));
					String appId 	= appInfo.get("app").toString();
					String appDesc  = appInfo.get("desc").toString();
					String appImage = appInfo.get("image").toString();
					if(appImage.equalsIgnoreCase(""))
						appImage="appimg_generic.gif";

					if(!appImage.endsWith(".gif") && !appImage.endsWith(".jpg") && !appImage.endsWith(".png"))
						appImage = appImage+".gif"; //we have to assume .gif image is there.
%>					<tr>
						<td class="pls"></td>
						<td colspan="2" style="height:4px;" nowrap></td>
						<td class="prs"></td>
					</tr>
					<tr>
						<td class="pls"></td>
						<td align="<%=defaultAlign%>"    valign="top" style="vertical-align:top;" > 
							<div class="bc" style="display:inline;text-align:<%=rtl?reverseAlign:defaultAlign%>">
								<span align='middle' role="navigation"   ctype="label" tabindex="0" <%=WebClientRuntime.createSendEventString("changeapp",app.getId(),appId,3)%> class="text favappsportletlink" title="<%=appDesc%>" >
								<img ctype="image" src='<%=IMAGE_PATH%><%=appImage%>'  class='fali' border='0' alt="<%=appDesc%>"/><%=appDesc%></span>
							</div>
						</td>
						<td class="prs"></td>
					</tr>
					<tr>
						<td class="pls"></td>
						<td colspan="2" class="psep" nowrap></td>
						<td class="prs"></td>
					</tr>
<%				}
			}
			else
			{
				if(portletControl.areAllAppsRestricted())
				{
%>					<tr>
						<td class="<%=textcss%> pnc">
							<%=wcs.getMessage("startcntr","noactionaccess") %>
						</td>
					</tr>
<%				}
				else
				{
%>					<%@ include file="portletnotsetupmsg.jsp" %>
<%				}
			}
%>		</table>
	<script>finishPortlet("<%=layoutId%>");</script><%="]]>"%></component>
<%		portletStateManager.setStateLoaded();
	}
	else
	{
		///If the portlet state is changed then fire the javascript to toggle its state
		if(portletStateManager.isPortletStateChanged())
		{
			portletStateManager.setPortletStateChanged(false);
%>	<component vis="true"  id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
		<script>
			var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
			hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
		</script>
	<%="]]>"%></component>	
<%		}
	}
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
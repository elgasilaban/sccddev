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
This JSP is the handler for StartCenter-Tabs component.
It provides a container as well implmentation for individual tab that are 
drawn based on the start center settings

Events fire by this component are
- Change Tab - load applicaiton with a unique id
--%>
<%@ include file="../common/simpleheader.jsp" %><%
StartCenterTabs scTabsControl =((StartCenterTabs)control);
ArrayList startCenters = scTabsControl.getRenderData(); %>
<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
	<tr>
		<td class="tabgroupback" role="main" >
			<ul class="tabgroup" nowrap="nowrap" role="tablist"><%
		String tabOnOff= "on";
		for(int i = 0; i < startCenters.size() ;i++)
		{
			Hashtable htSC = (Hashtable)startCenters.get(i);
			String scconfigId =  htSC.get("scconfigid").toString();
			String scDescription =  WebClientRuntime.makesafevalue(htSC.get("description").toString());					
            boolean current = scconfigId.equals(scTabsControl.getCurrentStartCenterId());
            String highlight="";
            String tabIndex = "-1";
            if(!current)
            {
            	tabOnOff= "off";
            	highlight="onfocus=\"appendClass(this,'offhover')\" onblur=\"removeClass(this,'offhover')\" ";
			}
			else
			{
				tabOnOff = "on";
				tabIndex = "0";
			}
			//bidi-hcg-AS start	
				if(BidiUtils.isBidiEnabled()) 
				{
					String[] bidiTagAttributes = {"","",""};	
					bidiTagAttributes = BidiClientUtils.getTagAttributes(null,null,"",false);
					if(bidiTagAttributes[2] != null && bidiTagAttributes[2].length() > 0) 
					{
						scDescription = BidiUtils.enforceBidiDirection(scDescription,bidiTagAttributes[2]);		
					} 
				}
			//bidi-hcg-AS end		
            String automationIdAnchor = "";
            if(automation)
            {
                automationIdAnchor="automationid=\""+realId+"_"+scconfigId+"_anchor\"";
			}	
				%><li role="presentation" <%if(current){%>aria-selected="true"<%}%> id="<%=id%>_<%=scconfigId%>" ctype="tab"><a onkeydown="itemAKey(event,this)" role="tab" tabindex="<%=tabIndex%>" nowrap="nowrap" <%=highlight%>href="Javascript: sendEvent('changesc','<%=id%>','<%=scconfigId%>')" id="<%=id%>_anchor_<%=i%>"<%=automationIdAnchor%>title="<%=scDescription%>" class="text tablabel<%=tabOnOff%> <%=tabOnOff%>" onkeypress="if(event.keyCode==KEYCODE_SPACEBAR){sendEvent('changesc','<%=id%>','<%=scconfigId%>')}" onfocus="setCurrentfocusId(event, this);"<%=componentEvents%>>&nbsp;<%=scDescription%></a></li><%
		}	%></ul>
		 </td>
	</tr>
</table>
<%@ include file="../common/componentfooter.jsp" %>
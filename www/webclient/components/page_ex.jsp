<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%!
/**
	If we are using the new style app linking, then return enough div's to close the apps, otherwise just an empty string
*/
public String getClosingDivs(boolean newApplinking, int applinkDivs)
{
	String rtnDivs="";
	if(newApplinking)
	{
		rtnDivs="</div>";
		for(int i=0;i<applinkDivs;i++)
		{
			rtnDivs+="</div>";
		}
	}
	return rtnDivs;
}
%><%
if(newApplinking)
{
	Iterator appIterator = appStack.iterator();
	int appCount = 1; %>
	<div class="bottomApp" style="clear:both;" >
		<div class="linkedAppTitle"><a href="javascript: sendEvent('returntoapp',APPTARGET,<%=appCount%>)"><%=((AppInstance)appStack.get(0)).getAppTitle()%></a></div><div class="titlelogo">&nbsp;</div>
			<div class="bottomAppBack" ><%
			if(appIterator.hasNext())
			{
				AppInstance stackApp = (AppInstance) appIterator.next();				
				while(appIterator.hasNext())
				{
					String readonlyflag = (String) stackApp.get("returninputR/O");
					boolean isReadOnly = ((readonlyflag != null) && ("true".equals(readonlyflag)));
					stackApp = (AppInstance) appIterator.next();
					boolean last = !appIterator.hasNext();
					appCount++;
					%><div class="linkedApp <%if(last){%>linkedAppLast<%}%>" style="clear:both;">
						<div class="linkedAppTitle"><%
						if (!last)
						{%><a href="javascript: sendEvent('returntoapp',APPTARGET,<%=appCount%>)"><%
						}%><%=stackApp.getAppTitle()%><%if(!last){%></a><%}%></div><%
						if (last) 
						{ %><div class="retButtons"><button onclick="sendEvent('returnnovalue',APPTARGET,'')"><%=wcs.getMessage("ui","return")%></button><% 
							if (!isReadOnly)
							{ %><button onclick="sendEvent('returnwithvalue',APPTARGET,'')"><%=wcs.getMessage("ui","returnvalue")%></button><%
							} %></div><%
						}%>
					<%	applinkDivs++;
				}
			} %>		
			<div id="pagecurrentappdiv" class="currentApp" style="clear:both;">
<% } %>
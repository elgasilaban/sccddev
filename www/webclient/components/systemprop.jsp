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
--%><%@ include file="../common/componentheader.jsp" %><% 
String dataAttribute = component.getProperty("dataattribute");
boolean showProperty = true;
String label = component.getProperty("label");
String value = "";

if ( dataAttribute.equalsIgnoreCase("trialexpdays") )
{
	showProperty = false;
	if (!wcs.isPermanentLicense() )
	{
		value = wcs.getEvalDaysRemaining();
		showProperty = true;
	}
}
else
{
	String[] propVal = wcs.getSystemProperty(dataAttribute);
	int x = 0;
	value = propVal[x];

	while( ++x < propVal.length )
	{
		value+="<br>"+propVal[x];
	}
}

if (showProperty)
{
%>	<tr id="<%=id%>" <%=automationId%>>
		<td class="<%=textcss%> label" style="white-space:nowrap;vertical-align:top;" align="<%=reverseAlign%>"><%=label%></td>
		<td class="<%=textcss%> label" style="white-space:nowrap;padding-<%=defaultAlign%>:15px;"><%=value%></td>
	</tr>
	<tr height="5px;"><td colspan="2"></td></tr>
<%
}
%><%@ include file="../common/componentfooter.jsp" %>
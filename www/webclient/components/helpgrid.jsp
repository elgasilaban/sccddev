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
--%><%@ include file="../common/simpleheader.jsp" %><%
	String innerhtml = component.getProperty("innerhtml");
	String msgkey = component.getProperty("msgkey");
	String msggroup = component.getProperty("msggroup");
	String morehelp = component.getProperty("morehelp");

	if(morehelp.length() > 0)
	{
		try
		{
			String[] morehelpstring = WebClientRuntime.getHelpString(morehelp);
			String helpUrl = WebClientRuntime.getWebClientRuntime().getHelpUrl(morehelpstring[0], morehelpstring[1], wcs.getHelpLangCode());
			String morehelptext = wcs.getMessage("jspmessages", "morehelp", new String[] {""});
			morehelp = "<a href='" + helpUrl + "' target='_blank'>" + morehelptext + "</a>";
		}
		catch(IndexOutOfBoundsException ex)
		{
			System.err.println("Bad morehelp property for control " + wcs.getCurrentApp().getOrigId(id) + " it should be package,filename");
			morehelp = "<span class=\"iu\">" + morehelp + "</span>"; //leave morehelp string as is
		}
	}
	
	if(!WebClientRuntime.isNull(innerhtml))
	{
		innerhtml = WebClientRuntime.replaceLogicalsWithSymbols(innerhtml);
	}
	else
	{
		if(!WebClientRuntime.isNull(msgkey) && !WebClientRuntime.isNull(msggroup))
		{
			innerhtml = wcs.getMaxMessage(msggroup, msgkey).getMessage();
		}
	}

	String opacityCss = "";
	if(designmode)
	{
		opacityCss="opacity_80"; %>
	<a href="Javascript: void(0);" <%=componentEvents%>><%@ include file="../common/uistatusindicator.jsp" %>
<%	}
%>
<div width="100%" class="helpgrid <%=opacityCss%>">
	<table border="0" width="100%" summary="" id="<%=id%>" <%=automationId%> role="presentation">
		<tr>
			<td width="1" valign="top">
				<img alt="" border="0" src="<%=IMAGE_PATH%><%if(langcode.equalsIgnoreCase("HE")){%>../<%}%>icon_details.gif" aria-hidden="true"/>
			</td>
			<td class="<%=textcss%> help" style="cursor:default">
				<%=innerhtml%> <%=morehelp%>
			</td>
		</tr>
	</table>
</div>
<% 	if(designmode)
	{	
%>	</a>
<%	}
%><%@ include file="../common/componentfooter.jsp" %>
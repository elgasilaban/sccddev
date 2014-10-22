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
--%><%@ include file="../common/simpleheader.jsp" %>
<%
	ComponentInstance fhComponent=originalEvent.getSourceComponentInstance();
	LabelCache syscache = LabelCacheMgr.getSystemLabelCache(wcs);	
	String fieldLabel = syscache.getString("fieldhelp_ctrl", "fieldlabel");
	String fhLabel = fhComponent.getProperty("title");
	if(fieldLabel.equals(""))
		fieldLabel="Field:";
	String boundLabel = syscache.getString("fieldhelp_ctrl", "boundlabel");
	if(boundLabel.equals(""))
		boundLabel="Table.Column:";
	String boundTo= fhComponent.getProperty("objectname")+"."+fhComponent.getProperty("attributename");
	String helpRemarks = fhComponent.getProperty("remarks");
%>
<tr>
	<td colspan="6" width="100%" align="center">
<table id="<%=id%>" <%=automationId%> width="300px" role="presentation" align="center" border="0" summary="">	
	<tr>
		<td nowrap align='<%=reverseAlign%>'>
			<span class="<%=textcss%> label"><%=fieldLabel%></span>
		</td>
		<td nowrap width="10px">&nbsp;</td>
		<td nowrap align='<%=defaultAlign%>'>
			<span class="<%=textcss%> fhd"><%=fhLabel%></span>
		</td>
	</tr>
	<tr>
		<td nowrap align='<%=reverseAlign%>'>
			<span class="<%=textcss%> label"><%=boundLabel%></span>
		</td>
		<td nowrap width="10px">&nbsp;</td>
		<td nowrap align='<%=defaultAlign%>'>
			<span class="<%=textcss%> fhd"><%=boundTo%></span>
		</td>
	</tr>
	<tr>
		<td colspan="3" class="<%=textcss%> fhd fhrb">
			<%=helpRemarks%>
		</td>
	</tr>
</table>
</td>
</tr>
<%@ include file="../common/componentfooter.jsp" %>
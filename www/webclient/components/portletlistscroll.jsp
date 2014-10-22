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
--%><%
String scrollLabels[] = wcs.getMessages("startcntr",new String[]{"previouspagelbl","nextpagelbl","scrolloflbl"});

%>
<table border="0" cellspacing="0" cellpadding="0" class="<%=textcss%>" align="<%=reverseAlign%>" >
	<tr>                               	
 	<% if(noOfRecords <= rowsToDisplay ) {%>
		<td valign="middle" align="<%=reverseAlign%>" nowrap class="pscr" height="1">
		 <%= iStart+1 %>&nbsp;-&nbsp;<% if(iEnd >= noOfRecords) out.print(noOfRecords); else out.print(iEnd); %>&nbsp;<%= scrollLabels[2] %>&nbsp;<%= noOfRecords %></td>
	<% } else { %>
		<td  valign="middle" align="center" width="14" nowrap><% if(iStart != 0 && !accessibilityMode) {%><a tabindex="0" title="<%= scrollLabels[0] %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('scroll','<%= id %>','previous');}" href="javascript:sendEvent('scroll','<%= id %>','previous')">
				<img align="absmiddle" alt="<%=scrollLabels[0]%>" aria-hidden="true" src="<%= IMAGE_PATH%>btn_previouspage.gif" width="10" height="5" border="0" align="absmiddle"></a>
		<% }else out.print("&nbsp;"); %></td>
		<td  valign="middle" align="center" width="75" nowrap>
		<% if(iStart != 0) {%>
			<a tabindex="0" title="<%= scrollLabels[0] %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('scroll','<%= id %>','previous');}" class="pl" href="javascript:sendEvent('scroll','<%= id %>','previous')"><%= scrollLabels[0]  %></a>
		<% }else out.print("&nbsp;"); %>
		</td>                      	 
		<td align="center" height="1" nowrap>
		<% if(iStart != 0) {%>
    		<img align="absmiddle" border="0" src="<%= IMAGE_PATH%>portlet_pageseperator.gif" alt=""/><% }out.print("&nbsp;"); %></td>
    	<td valign="middle" align="center" nowrap class="pscr" height="1">
			&nbsp;&nbsp;<%= iStart+1 %>&nbsp;-&nbsp;<% if(iEnd >= noOfRecords) out.print(noOfRecords); else out.print(iEnd); %>&nbsp;<%= scrollLabels[2] %>&nbsp;<%= noOfRecords %>&nbsp;&nbsp;
		</td>
        <td align="center" height="1" nowrap>
		<% if(noOfRecords > rowsToDisplay &&  iEnd < noOfRecords) {%>
			<img aria-hidden="true" tabindex="0" align="absmiddle" border="0" src="<%= IMAGE_PATH%>portlet_pageseperator.gif" alt=""/> <% }else out.print("&nbsp;"); %>
		</td>
		<td  valign="middle" align="center" nowrap style="padding-<%=defaultAlign%>:3px;padding-<%=reverseAlign%>:3px;"><% if(noOfRecords > rowsToDisplay && iEnd < noOfRecords) {%><a tabindex="0" title="<%= scrollLabels[1] %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('scroll','<%= id %>','next');}" class="pl" href="javascript:sendEvent('scroll','<%= id %>','next')"><%= scrollLabels[1] %></a>
		<% }else out.print("&nbsp;"); %></td>
		<td valign="middle" align="center" nowrap width="10"><% if(noOfRecords > rowsToDisplay && iEnd < noOfRecords && !accessibilityMode) {%><a tabindex="0" title="<%= scrollLabels[1] %>"  onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('scroll','<%= id %>','next');}" class="pl" href="javascript:sendEvent('scroll','<%= id %>','next')">
			<img align="absmiddle" alt="<%=scrollLabels[1]%>" aria-hidden="true" src="<%= IMAGE_PATH%>btn_nextpage.gif" border="0" align="absmiddle"/></a>
		<% }else out.print("&nbsp;"); %></td>	                             
		<% } %>                                	                             
	</tr>
</table>
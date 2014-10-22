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
--%><%@page import="psdi.util.HTML"%>
<div aria-live="polite" aria-busy="true" id='portletbody_<%=layoutId%>_outer' style='display: <%=portletStateManager.isMaximised()?"inline":"none" %>; top:0;'>
	<table aria-hidden="true" role="presentation" cellspacing="0" cellpadding="0" width="100%" height="100%">
		<tr>
			<td id='portletbody_<%=layoutId%>'>
			</td>
		</tr>	
		<tr>
			<td id="load_<%=layoutId%>" class="plinner plc"><% 
				String title = HTML.cleanValue(control.getProperty("label"), true, true, false);
				String loading = wcs.getMessage("jspmessages","waitMessage"); 
				String reload = wcs.getMessage("startcntr","reload");
				%><img id="<%=id%>_image" src="<%= IMAGE_PATH + "progressbar.gif"%>" alt="<%=loading%>" aria-label="<%=loading%>" class="pli" loadinglabel="<%=loading%>" refreshlabel="<%=reload%>"/><%
				String reloadLink = "<a id='"+id+"_retryanchor' aria-label="+reload+" href=\"Javascript: refreshPortlet('"+id+"','"+title+"','"+layoutId+"')\"><img src='"+IMAGE_PATH+"small_refresh.png' alt='' style='vertical-align: bottom;border: 0px'/>"+reload+"</a>";
				String error = wcs.getMessage("startcntr","failedPortlet", new String[] {reloadLink});
				%></br>
				<span id="<%=id%>_retrylink" style="display:none"><%=error%></span>
			</td>	
		</tr>
	</table> 
</div>                                         
<script><%
	%>
	var def = {};
	def["id"] = "<%=id%>";
	def["title"] = "<%=title%>";
	def["layoutId"] = "<%=layoutId%>";
	def["headerId"] = "<%=control.getProperty("headerid")%>";
	def["reload"] = "<%=reload%>";
	setupPortlet(def);
	addLoadMethod("refreshPortlet('<%=id%>', '<%=title.replace("\\'", "\\\\\\'")%>', '<%=layoutId%>')");
</script>
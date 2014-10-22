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
//	psdi.webclient.beans.common.WorkflowMapBean mapBean = (psdi.webclient.beans.common.WorkflowMapBean)Utility.getDataSource(sessionContext, control);
//	String url = mapBean.getMapURL();
	
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	
	String dimension = "";
	dimension += !width.equals("")?"width=\""+width+"\" ":"";
	dimension += !height.equals("")?"height=\""+height+"\" ":"";
	psdi.webclient.beans.common.WorkflowMapBean wfMapBean = (psdi.webclient.beans.common.WorkflowMapBean)wcs.getDataBean(control.getProperty("datasrc"));
	String mapUrl = "";
	if(wfMapBean!=null)
		mapUrl=wfMapBean.getMapURL();
	if(component.needsRender())
	{
%>
	<div class="wfmd" id="<%= id%>" <%=automationId%> <%=dimension%> cellspacing="0" tabindex="-1" style="border:1px solid #000000;">
<% 		if(!WebClientRuntime.isNull(mapUrl))
		{	
            String automationIdImg = "";
            if(automation)
                automationIdImg="automationid=\""+realId+"_img\"";%>
		<iframe id="<%=id%>_img"  <%=automationIdImg%> src="" width="100%" height="100%" role="presentation"></iframe>
<%		}	%>
	</div>
<% 	}
	if(!WebClientRuntime.isNull(mapUrl))
	{	
		if(component.needsRender())
		{%>
	<script>
<%		} else {%>
	<%=finalScriptStart%>
		<%}%>
		addLoadMethod('document.getElementById("<%=id%>_img").src="<%=mapUrl%>"');
<% 		if(component.needsRender())
		{%>
	</script>
<%		} else {%>
	<%=finalScriptEnd%>
		<%}
	}
%>
<%@ include file="../common/componentfooter.jsp" %>
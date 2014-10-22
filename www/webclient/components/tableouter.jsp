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
	boolean forceRender = false;
	if(control.hasPropertyChanged("display") && !component.needsRender())
	{
		control.setNeedsRender(true);
		forceRender=true;
	}
	if(component.needsRender())
	{	
        String newAutomationId = "";
        if(automation)
            newAutomationId="automationid=\""+realId+"_holder\"";        
		if(component.rerendering() && hiddenFrame)
		{	
			%><%@ include file="../common/componentholder_start.jsp" %><%
		}
		else
		{	%>
	<!-- BEGIN Tableouter -->
	<div nowrap id="<%=id%>_holder" class="tableouter" <%=newAutomationId%> style="<%=componentDisplay%>;background-color: inherit !important">
	<%	} 

        String width = control.getProperty("width"); 
        if(!ismobile && !WebClientRuntime.isNull(width))
        	width="width:"+width+";overflow-x:auto;";
        else
        	width="width:100%";	%>
		<table role="presentation" id="<%=id%>" <%=automationId%> valign="top" summary="" class="<%=cssclass%>" style="<%=width%>;border-collapse: collapse;">
<%	}
	if(control.isVisible())
		component.renderChildComponents();

	if(component.needsRender())
	{	
%>		</table>
	<%	if(component.rerendering() && hiddenFrame)
		{
			%><%@ include file="../common/componentholder_end.jsp" %><%
		}
		else
		{	%>
	</div>
<!-- END Tableouter -->
<%		}
	}
	if(forceRender)
	{
		control.setNeedsRender(false);
		forceRender=false;
		%>
		<script>
			addRerendered("<%=id%>_holder",true);
		</script>
<%	}	
%><%@ include file="../common/componentfooter.jsp" %>
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
	<%@ include file="../common/designerevents.jsp" %><%
	String label = control.getLocalizedType();	
	String newAutomationId = "";
    if(automation)
        newAutomationId="automationid=\""+realId+"_ta\"";
    if(!component.needsRender())
	{ %>
	<component id="<%=id%>_holder" <%=compType%>><![CDATA[
<%	}
	else
	{	%>
		<div id="<%=id%>_holder">
<%	}	%>
		<div control="true" id="<%=id%>" <%=automationId%>>
			<div id="<%=id%>_ta" <%=newAutomationId%> style="padding-<%=defaultAlign%>:5px;<%=designerSelected%>">
				<span class=""<%=textcss%> dl" <%=componentEvents%>><a tabindex="-1" href='' onclick='return false;'><%=label%>...</a></span>
			</div>
		</div>
<%	if(!component.needsRender())
	{ %>
	]]></component>
<%	}
	else
	{	%>
	</div>	
<%	}	%>
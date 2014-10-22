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
	String designLabel = "";
	if(designmode)
	{
		if(showallcontrols)
			designLabel=control.getLocalizedType();
		if(component.needsRender())
		{
			%>
			<td id="<%=id%>" class="srdm" <%=componentEvents%> style="<%=designerSelected%>"><table role="presentation" style="width:100%;height:100%;" height="100%" cellspacing="0" cellpadding="0"><%if(designmode){%><tr><td colspan="100"><a href="" id="<%=id%>_label" aria-live="polite" class="text dl" onmouseover="return noStatus();" target="_blank"/><%@ include file="../common/uistatusindicator.jsp" %><%=designLabel%></a></td></tr><%}%><tr>
	<%	}
	}
	component.renderChildComponents();
	if(component.needsRender() && designmode)
	{	%>
		</tr></table></td>
<%	}
	else
	{
		if(designmode)
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			el=document.getElementById("<%=id%>");
			if(el)
				el.style.backgroundColor="<%=designerSelectedColor%>";
			el=document.getElementById("<%=id%>_label");
			if(el)
				el.innerHTML="<%=designLabel%>";
		</script>]]></component>
	<%	}
	}	%><%@ include file="../common/componentfooter.jsp" %>
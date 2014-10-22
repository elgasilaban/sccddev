<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
	String designLabel = "";
	boolean visible = !component.getProperty("visible").equalsIgnoreCase("false") && !control.getProperty("display").equalsIgnoreCase("false");
	boolean visibilitychanged = component.hasPropertyChanged("display") || control.hasPropertyChanged("display");
	String width = "";
	if(!control.getParentInstance().getParentInstance().getBoolean("useproportionalcols")) {
		width = component.getProperty("width");
	}
	if(!WebClientRuntime.isNull(width))
		width = "width:"+width+";";
	String display = "";
	if(!visible)
	{
		display = "none";
	}
	if(designmode)
	{
		if(showallcontrols)
			designLabel=control.getLocalizedType();
	}
	if(component.needsRender())
	{
		String designClass="scdm";
		if(control.equals(control.getParentInstance().getChildren().get(0)) && control.getParentInstance().getChildren().size()>1) {
			designClass="fscdm";
		}	%>
		<td id="<%=id%>" aria-live="polite" <%=visible?"":"aria-hidden=\"true\""%> style="<%=width%>display:<%=display%>;<%=designerSelected%>;padding:0 2px;vertical-align: top" sc="true" <%=componentEvents%> height="100%" class="<%if(designmode){%><%=designClass%> <%}%>sectioncol">
			<div id="<%=id%>_div" style="height: 100%">
			<%if(designmode){%><div><a href="" id="<%=id%>_label" aria-live="polite" class="text dl" onmouseover="return noStatus();" target="_blank"/><%@ include file="../common/uistatusindicator.jsp" %><%=designLabel%></a></div><%}%>
<%	}
	component.renderChildComponents();
	if(component.needsRender())
	{	%>
		</div>
	</td>
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
		else if(component.hasPropertyChanged("display") || control.hasPropertyChanged("display") || component.getProperty("visibilitychanged").equalsIgnoreCase("true"))
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			addLoadMethod("hideShowElement('<%=id%>','<%=display%>')");
		</script>]]></component>
	<%	}
	}	%><%@ include file="../common/componentfooter.jsp" %>
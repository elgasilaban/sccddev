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
    if(designmode)
	{	%>
		<%@ include file="../common/designerevents.jsp" %>
<%  }
	TableDetails tableDetailsControl = (TableDetails)control;
	boolean expanded = tableDetailsControl.expanded().equals("true");
	String display = "";
	if(!expanded || !componentVisible)
		display="none";
	int rowNum = ((Table)control.getParentInstance()).getCurrentRow();
	if(component.needsRender())
	{
        String newAutomationId = "";
        if(automation)
            newAutomationId="automationid=\""+realId+"_inner\"";
        String width = control.getParentInstance().getProperty("width"); 
        if(!ismobile && !WebClientRuntime.isNull(width))
        	width="width:"+width+";overflow-x:auto;";
        else
        	width="width:100%";
    %>
	<td id="<%=id%>" rownum="<%=rowNum%>" <%=automationId%> tabledetails="true" class="std <%=cssclass%>" style="display:<%=display%>">
		<%if(!skin.equals("")){%><div class="tdbar"></div><%}%><div id="<%=id%>_inner" <%=newAutomationId%> style="<%=width%>;display:<%=display%>"><%
	}
	if(designmode || component.needsRender() || ((Table)control.getParentInstance()).getFlagValue(DataBean.TABLE_DETAILS_EXPANDED))
		component.renderChildComponents();
	if(component.needsRender())
	{	%>
		</div>
	</td>
<%	}
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
        el = document.getElementById("<%=id%>");
        if(el)
        {
            <%if(component.hasPropertyChanged("cssclass")){%>
                el.className="<%=cssclass%>";
            <%}%>
			el.style.display="<%=display%>";
			el.setAttribute("aria-hidden" , "<%=display.equals("none")%>");
			el.setAttribute("rownum", "<%=rowNum%>" );
		}
		el = document.getElementById("<%=id%>_inner");
		if(el)
		{
				el.style.display="<%=display%>";
				el.setAttribute("aria-hidden" , "<%=display.equals("none")%>");
		}
	</script>]]></component>
<%	}	%><%@ include file="../common/componentfooter.jsp" %>
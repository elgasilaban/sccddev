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
	TableBody tableBodyControl = (TableBody)control.getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	TableRow tableRow = (TableRow)control;
	DataBean tableBean = tableControl.getDataBean();
	String rownum = control.getProperty("rownum");
	int row = -5;
	int currentRow = tableBean.getCurrentRow();
	boolean expanded = control.getParentInstance().getProperty("filterexpanded").equalsIgnoreCase("true");
	int rowType = tableRow.getRowType();

	String control_events="";
	String component_events = "";
	String display = component.getProperty("display");
	String rowHeight = "";
	if(tableRow instanceof TableDataRow)
		rowHeight = tableControl.getProperty("datarowheight");
	else if(tableRow instanceof TableTitleRow)
		rowHeight = tableControl.getProperty("titlerowheight");
	else if(tableRow instanceof TableFilterRow)
		rowHeight = tableControl.getProperty("filterrowheight");
	if(!WebClientRuntime.isNull(rowHeight))
		rowHeight="height:"+rowHeight;
	boolean evenRow = true;
	String currentRowMarker = "";
	if(rownum!=null)
	{
		row = Integer.parseInt(rownum);
		if(row>=0 && tableRow instanceof TableDataRow)
		{
			if(row==currentRow)
			{
				cssclass+=" tcr";
				currentRowMarker = " current=\"true\"";
				((TableDataRow)tableRow).setCurrentRow(true);
			}
			else
				((TableDataRow)tableRow).setCurrentRow(false);
// Story 06-13334
			if (tableControl.isListTabRetain() && ((ResultsBean)tableControl.getDataBean()).isModifiedRow(row)) 
			{
				String style = tableRow.getProperty("celltext");
				style+= " trmod";
				tableRow.setProperty("celltext",style);	
			}					
		}
		if(row%2==0)
		{
			evenRow = false;
			cssclass+=" trodd";
		}
		else
			cssclass+=" treven";
	}

	if(tableRow.rowVisible())
		display="";
	else
		display="none";

	String keyUp = "";
	String keyDown = "";
	if(rowType==tableRow.FILTERROW)
	{
		keyDown="onkeydown=\"if(event.keyCode == KEYCODE_ENTER) tableRowEnterKeyFlag=1; else tableRowEnterKeyFlag=0;\""; 
    	keyUp="onkeyup=\"if(tableRowEnterKeyFlag==1 && event.keyCode==KEYCODE_ENTER){sendEvent('filterrows','"+id+"','');cancelEvent(event);}\"";
	}
	%><%@ include file="../common/exceptioncontainericon.jsp" %><%
	if(!(tableRow instanceof TableDataRow))
		error_icon = "";
	boolean addCompWrapper = false;
	int newTableRow = tableControl.getNewRowNum();
	boolean forceRender =  newTableRow>=0 && newTableRow==row;
	if(forceRender)
	{
		control.setNeedsRender(true);
	}
	if(component.needsRender())
	{	
		String cData = (String)app.get("incdata");	
		if(hiddenFrame && !Boolean.parseBoolean(cData))
		{	
			addCompWrapper = true; %>
			<component id="<%=id%>_holder" compid="<%=id%>" replacemethod="addTableRow" tableBodyId="<%=tableBodyControl.getTableBodyComponentRenderId()%>" <%=compType%>><![CDATA[
			<table role="presentation" id="<%=id%>_rowholder">
		<%	app.put("incdata","true");
			app.put("startedcdata",component.getId());
		}	
	if(tableRow instanceof TableTitleRow) {
		error_icon="<th id=\"errtitle\">"+error_icon+"</th>";
	}
	else {
		error_icon="<td headers=\"errtitle\">"+error_icon+"</td>";
	}
	if(control.getType().equals("tabletoggleselectrows")) {
		cssclass+="tsr";
	}
	%>
	<tr <%if(error_icon.length()>0){%>aria-invalid="true"<%}%> role="row" id="<%=id%>" <%=automationId%><%=currentRowMarker%> <%=keyUp%> <%=keyDown%> class="<%=cssclass%>"<%if(display.equals("none")){%> aria-hidden="true" <%}%> style="display:<%=display%>;">
	<% if(!(control instanceof TableToggleSelectRow) && !(tableBean.isSubSelect())){%><%=error_icon%><%} 
	}%><%	component.renderChildComponents(); %><%
	if(component.needsRender())
	{	%>
	</tr>
<%		if(addCompWrapper)
		{	%>
			</table>
		<%@ include file="../common/componentholder_end.jsp" %>
	<%	}
	}
	else
	{	%>
	<%@ include file="../common/componentholder_start.jsp" %>
	<script>
		var row = dojo.byId("<%=id%>");
		if(row)
		{
			row.style.display="<%=display%>";
			row.setAttribute("aria-hidden" , "<%=display.equals("none")%>");
			row.className="<%=cssclass%>";
		}
	</script>
	<%@ include file="../common/componentholder_end.jsp" %>
<%	}	
	if(forceRender)
	{
		control.setNeedsRender(false);
	}
%><%@ include file="../common/componentfooter.jsp" %>
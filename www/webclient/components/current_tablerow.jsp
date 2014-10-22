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
	if(rownum!=null)
	{
		row = Integer.parseInt(rownum);
		if(row>=0 && tableRow instanceof TableDataRow)
		{
			if(row==currentRow)
			{
				cssclass+=" tcr";
				((TableDataRow)tableRow).setCurrentRow(true);
			}
			else
				((TableDataRow)tableRow).setCurrentRow(false);
// Story 06-13334
			if (tableControl.isListTabRetain() && tableControl.getDataBean().isModifiedRow(row)) 
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
	boolean forceRender=false;
	if(!component.needsRender())
	{
		control.setNeedsRender(true);
		forceRender=true; %>
	<div id="<%=id%>_holder">
	<table id="<%=id%>_table_new">
<%	}


%>
<tr id="<%=id%><%if(forceRender){%>_new<%}%>" <%=automationId%> <%=keyUp%> <%=keyDown%> class="<%=cssclass%>" style="display:<%=display%>;">
<%	component.renderChildComponents(); %>
</tr>
<%	if(forceRender)
	{
		control.setNeedsRender(false);
	%>
 	</table>
 	</div>
 	<script>
		var rowHolder  = document.getElementById("<%=tableBodyControl.getId()%>_rowholder");
		var newElOuter  = document.getElementById("<%=id%>_holder");
		rowHolder.innerHTML = newElOuter.innerHTML;

 		newRow = document.getElementById("<%=id%>_new");
		oldRow = document.getElementById("<%=id%>");
		if(newRow && oldRow)
		{
			oldTable=oldRow.parentNode;
			oldTable.replaceChild(newRow,oldRow);
			brandNewRow=document.getElementById("<%=id%>_new");
			brandNewRow.id="<%=id%>";
			brandNewRow.className="<%=cssclass%>";
			brandNewRow.style.display="<%=display%>";

		}
	</script>	
<%	}
 %><%@ include file="../common/componentfooter.jsp" %>
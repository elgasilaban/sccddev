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
	/*
	 * Used to pass render/refresh to the dynamically created children in table columns
	*/
        Table tableControl = (Table)control.getParentInstance();
        boolean tableExpanded=tableControl.getFlagValue(DataBean.TABLE_EXPANDED) || designmode;
        int currentRow = tableControl.getCurrentRow();
        String disp = "";
        String width = tableControl.getProperty("width");
        boolean useWidth = false;
        if(!tableExpanded || !componentVisible)
            disp="display:none";
        if(!ismobile && !WebClientRuntime.isNull(width))
        {
        	width="width:"+width+";overflow-x:scroll;";
        	useWidth=true;
        }
        else
        	width="width:100%";	
		boolean refreshAll = tableControl.getFlagValue(DataBean.TABLE_REFRESH_ALL_ROWS) && tableControl.getNewRowNum()==-1;
		String displayRowsPerPage = control.getProperty("displayrowsperpage");
		int displayRows=tableControl.getDataBean().getPageRowCount();
		if(component.needsRender() || refreshAll)
    	{
       		control.setNeedsRender(true);
            String newAutomationId = "";
            if(automation)
                newAutomationId="automationid=\""+realId+"_bodyholder\"";
            String borderCollapse = "";
            if(!USERAGENT.equals("IE"))
            	borderCollapse="border-collapse:separate;";
  			if(component.rerendering() && hiddenFrame)
			{	
				holderId=id+"_bodyholder";
				%><%@ include file="../common/componentholder_start.jsp" %><%
			}
			else
			{	
				%><div id="<%=id%>_bodyholder" <%=newAutomationId%>><%
			}	
			TableBody bodyControl = (TableBody)control;
			ComponentInstance labelledByComponent = tableControl.findUseForLablledByComponent();
			bodyControl.setTableBodyComponentRenderId(id); 
  			String summary = "";
  			if(labelledByComponent != null)
				summary = labelledByComponent.getProperty("title"); %>
				<div id="<%=id%>_bodyholder1" <%=newAutomationId%> style="<%=width%>;">
					<table role="grid" id="<%=id%>" rownum="<%=currentRow%>" <%=(labelledByComponent==null?"":"aria-labelledby=\""+labelledByComponent.getRenderId()+"\"")%> rowsperpage="<%=displayRowsPerPage%>" displayrows="<%=displayRows%>" <%=automationId%> valign="top" summary="<%=summary%>" <%=componentEvents%> style="<%=borderCollapse%><%=disp%>" class="<%=cssclass%>">
						<tr>
							<th id="<%=control.getId()%>_rowholder" colspan="200" style='display:none'></th>
						</tr><%
		}
       	if(tableExpanded)
       	{
       		Iterator i = control.getChildren().iterator();
		    boolean needsRender = component.needsRender();
		    DataBean tableBean = tableControl.getDataBean();
		    ResultsBean resultsBean = app.getResultsBean();
		    boolean subsel = tableControl.getFlagValue(DataBean.TABLE_SUBSELECT_ON) && (tableBean==resultsBean || (resultsBean==null && tableBean==app.getAppBean()));
	       	TableDataRow row = (TableDataRow) tableControl.getRowControl();
	   		int offsetNum = tableControl.getDataBean().getTableOffset();
			int oldCurrent = tableControl.getOldCurrentRow();
		    while (i.hasNext())
			{
		        ControlInstance child = (ControlInstance)i.next();
		        if(child instanceof TableRow)
				{
		        	if(child instanceof TableDataRow && (!subsel && !(child instanceof TableDataRowMock)) || (subsel && child instanceof TableDataRowMock))
					{
						int thisRow = -1;
			   			if(needsRender || designmode || refreshAll)
			   			{
					   		for(int rowNum=0; rowNum<displayRows;rowNum++)
					   		{
					   			thisRow = offsetNum+rowNum;
								if(needsRender)
									row.setNeedsRender(true);
					   			row.renderDataRow(thisRow);
					   			if(thisRow==currentRow)
					   				tableControl.setOldCurrentRow(thisRow);
					   		}
			   			}
			   			else
			   			{
			   				
			   				thisRow = oldCurrent;
			   				if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
			   				{
			   					row.renderDataRow(thisRow);
			   				}

			   				thisRow = currentRow;
			   				tableControl.setOldCurrentRow(thisRow);
			   				if(thisRow!=oldCurrent)
			   				{
				   				if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
				   				{
				   					row.renderDataRow(thisRow);
				   				}
			   				}

			   				thisRow = originalEvent.getRow();
			   				if(thisRow!=currentRow && thisRow!=oldCurrent)
			   				{
			   					if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
			   					{
			   						row.renderDataRow(thisRow);
			   					}
			   				}
			   			}

					}
					else
					{
						if(!(tableControl.getDataBean().isSubSelect() && child instanceof TableFilterRow))
						{
							boolean doRender = false;
							if(child instanceof TableToggleSelectRow && tableControl.getFlagValue(DataBean.TABLE_SUBSELECT_ON))
								doRender=true;
							else if(child instanceof TableFilterRow)
								doRender=true;
							else if(child instanceof TableTitleRow && tableControl.getFlagValue(DataBean.TABLE_REFRESH_TITLE))
								doRender=true;
							else
								doRender=false;
							if(doRender || needsRender)
							{
								if(needsRender)
									child.setNeedsRender(true);
								child.render();
							}
						}
					}
				}
			}
       	}
        if(component.needsRender())
		{	%>
						</table>
					</div>
				<%	if(useWidth)
					{	%>
					<script>
						//This code fixes problem when the header is too wide to fit in defined width of the table.
						//It will look at the body width and match it to it's parent.
						var outer = document.getElementById("<%=id%>_bodyholder");
						var inner = document.getElementById("<%=id%>_bodyholder1");
						if(outer && inner && (outer.offsetWidth>inner.offsetWidth))
							inner.style.width=outer.offsetWidth;
					</script>
				<%	}
					if(component.rerendering() && hiddenFrame)
					{
						%><%@ include file="../common/componentholder_end.jsp" %><%
					}
					else
					{
						%></div><%
					}
    		if(component.rerendering())
    		{
   				control.setNeedsRender(false);
    		}
		}
        else
        {	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
        var tableBody = document.getElementById("<%=id%>");
        if(tableBody)
        {
			tableBody.setAttribute("rownum", "<%=currentRow%>" );
		}
	</script>]]></component>
	<%	}	
        tableControl.wasTableRowChanged();
	%><%@ include file="../common/componentfooter.jsp" %>
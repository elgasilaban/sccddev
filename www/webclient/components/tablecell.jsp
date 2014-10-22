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
--%><%@ include file="../common/simpleheader.jsp" %><%
	TableBody tableBodyControl = (TableBody)control.getParentInstance().getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	psdi.webclient.controls.TableCell tableCell = (psdi.webclient.controls.TableCell)component.getControl();
	TableCol tableCol = tableCell.getTableCol();
	if(designmode)
		cssclass="scell";
	else
		cssclass="tc "+cssclass;
	boolean numeric = tableCell.isNumeric();
	boolean ltrOnly = tableCell.isLTROnly();
	boolean preserveTitleAlign = false;
	String leftDir = "dir='ltr' ";
	String rowHeight = "";
	String ariaRole = "gridcell"; 
	String rtlAlign = "";
    String headerId = "";
	boolean onFilter = false;
	String width = ""; 
	if(((TableRow)control.getParentInstance()) instanceof TableDataRow) {
		rowHeight = tableControl.getProperty("datarowheight");
		headerId = "headers=\""+tableCol.getHeaderId()+"\"";
		width = "width:"+control.getProperty("width")+";";
    }
	else if(((TableRow)control.getParentInstance()) instanceof TableTitleRow)
	{
        tableCol.setHeaderId(id);
        rowHeight = tableControl.getProperty("titlerowheight");
		leftDir = "";
		if (BidiUtils.isBidiEnabled() || rtl)
			preserveTitleAlign = true;
	}	
	else if(((TableRow)control.getParentInstance()) instanceof TableFilterRow)
	{
		rowHeight = tableControl.getProperty("filterrowheight");
		onFilter = true;
		headerId = "headers=\""+tableCol.getHeaderId()+"\"";
	}
	if(!WebClientRuntime.isNull(rowHeight))
		rowHeight="height:"+rowHeight;

	// This is a bit of a hack for Firefox on Linux and Firefox 3.x on Windows.  For some reason, there is no space
	// between the cells so a 5px padding on the right of each cell is added.
	String padright = "";
	if ((request.getHeader("user-agent").indexOf("Linux") > -1 && request.getHeader("user-agent").indexOf("Firefox") > -1)
		|| (request.getHeader("user-agent").indexOf("Firefox/3.") > -1)
		|| ((BidiUtils.isBidiEnabled()) && (request.getHeader("user-agent").toUpperCase().indexOf("MSIE")>-1)) )  //bidi-hcg-SC
	{   //Don't insert padding after last column
		if(!tableControl.isLastColumn(tableCell.getColumnId()))
			padright = "padding-"+reverseAlign+":5px;";
	}

	String extraspace = "";
	if (tableControl.getProperty("spacecolumns").equals("true"))
	{   //Don't insert space after last column
		if(!tableControl.isLastColumn(tableCell.getColumnId()))
			extraspace = "<td>&nbsp</td>";
	}

	DataBean tableBean = tableControl.getDataBean();
	String colSpan = component.getProperty("colspan");
	String height=component.getProperty("height");
	String align=component.getProperty("align");

	//Fix for Static Aligns
	if(defaultAlign.equalsIgnoreCase("right"))
	{
		if(align!=null)
		{
			if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}
			else
			{
				if(align.equalsIgnoreCase("left"))
					align = "right";
			}
		}
	}

	if(!WebClientRuntime.isNull(colSpan))
		colSpan="colspan=\""+colSpan+"\"";

	if(!WebClientRuntime.isNull(align))
		align="align=\""+align+"\"";

	/*
	 * Used to expand components within a table column
	 */
		int currentRow = tableBean.getCurrentRow();
		int myRow = ((TableRow)control.getParentInstance()).getRow();
		String click="";
		boolean current = false;
		String over = "";
		if(myRow>=0)
		{
			if(myRow==currentRow)
				current=true;
			click="tcClick(event,'"+id+"')";
			if(!(tableControl.isTableSelectRowsOpen().equals("true")))
				over+=" onmouseover=\"appendClass(this.parentNode,'trh')\" onmouseout=\"removeClass(this.parentNode,'trh')\"";
		}


	if(designmode)
	{
		if(myRow==-1)
			cssclass="tcdm";
	}
	else if(!(tableControl.isTableSelectRowsOpen().equals("true")))
		cssclass+=" cursor_hand";

	String columnDisplay = "";
	boolean hiddenBySigOrLic = !onFilter && ((!designmode && !componentVisible) || control.isHiddenByLicense());
	boolean rowByRow = false;
	if( hiddenBySigOrLic || (tableCol!=null && tableCol.getProperty("mxevent").equals("toggleselectrow") && !tableControl.getRowSelectVis() && !designmode)) {
		String sigoptionDatasrc = tableCol.getProperty("sigoptiondatasrc"); //12-11288 && 12-11590 - must hide column in a different way depending on how sigoption is implemented
		if(!"".equals(sigoptionDatasrc)) {
			DataBean dataBean = app.getDataBean(sigoptionDatasrc);
			if(dataBean == tableControl.getDataBean()) {
				rowByRow = true;
			}
		}
		else {
			rowByRow = true;
		}
		if(!rowByRow) {
			columnDisplay="display:none;";
		}
		else {
			componentDisplay="display:none;";
		}
	}
	boolean isRowDeleted=(myRow>=0 && tableControl.getDataBean().isRowDeleted(myRow));
	if(isRowDeleted)
		cssclass+=" trdr";
	String elementType = "td";
	if(tableCell.getRow() instanceof TableTitleRow)
	{
		elementType = "th";
		ariaRole = "columnheader";
		if(preserveTitleAlign)
		{
			rtlAlign = " align='right' ";
		}
	}
	if(!hiddenBySigOrLic || rowByRow) {
		if(component.needsRender())
		{
			String rMargin = "3";
			if(myRow<0)
				rMargin="3";
	
	%>	<<%=elementType%> role="<%=ariaRole%>" control="true" id="<%=id%>" <%=automationId%> <%=colSpan%> <%=over%><%
				%> onclick="<%=click%>" style="<%=columnDisplay%><%=rowHeight%>;<%=padright%><%=designerSelected%> <%=width%>"<%
				%> currentrow="<%=current%>" class="<%=cssclass%>" <%=headerId%> <%=componentEvents%> <%=align%>><%if(rowByRow && hiddenBySigOrLic){%><br/><%}%><table role="presentation" id="<%=id%>_inner" style="width: 100%; <%=componentDisplay%>; <%if(numeric){%>margin-right:<%=rMargin%>px <%}%>"<%
				if(numeric)
				{
					%> align="right" <%
				}
				else if(ltrOnly)
				{
					if(!preserveTitleAlign)
					{
						%> align='left'<%
					}
					%> <%=leftDir%><%
				}
				%> <%=rtlAlign%>>
			<tr>
	<%	}
		List groupChildren = component.getChildren();
		if (groupChildren != null )
		{
			Iterator childIterator = groupChildren.iterator();
			while (childIterator.hasNext())
			{
				ComponentInstance groupChild = (ComponentInstance)childIterator.next();
				groupChild.setChangedFlag();
				groupChild.render();
			}
		}
		if(component.needsRender())
		{
	%>		<%=extraspace%>
	<%
			//the following line allows borders on rows with no content to work correctly on firefox
			if(skin.equals(""))
			{
	%>				<<%=elementType%> class="tce">&nbsp;</<%=elementType%>>
	<%		}
	%>			</tr>
			</table></<%=elementType%>>
	<%	}
		else
		{
			String compDisplay = componentVisible?"inline":"none";
	%>		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
				el = document.getElementById("<%=id%>");
				if(el)
				{
					el.className="<%=cssclass%>";
					el.setAttribute("currentrow","<%=current%>");
				}
				el_inner=document.getElementById("<%=id%>_inner");
				if(el_inner)
				{
					el_inner.style.display="<%=compDisplay%>";
					el_inner.setAttribute("aria-hidden" , "<%=compDisplay.equals("none")%>");
				}
			</script>]]></component>
	<%	}
	}
%><%@ include file="../common/componentfooter.jsp" %>
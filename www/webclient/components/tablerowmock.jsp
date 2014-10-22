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
	TableBody tableBodyControl = (TableBody)control.getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	TableRow tableRow = (TableRow)control;
	DataBean dataSource = tableControl.getDataBean();
	int row = tableRow.getRow();
	int currentRow = dataSource.getCurrentRow();
	String cbSrc=IMAGE_PATH+"table_cb_unchecked.gif";
	String cbTtitle = wcs.getMaxMessage("tableinfo","cntrlTableAltSelectDataRow").getMessage();
	String control_events="";
	String component_events = "";
	String display = "";
	if(row%2==0)
		cssclass+=" trodd";
	else
		cssclass+=" treven";
	if(tableRow.rowVisible())
		display="";
	else
		display="none";
	String checked = "unchecked";
	if(tableRow.rowVisible()) //Don't try to call methods on invisible rows as they probably don't have data.
	{
		if(dataSource.isSelected(row))
		{
			cbSrc=IMAGE_PATH+"table_cb_checked.gif";
			cbTtitle += " " +wcs.getMessage("ui","checked");
			checked = "checked";
		}
		else
			cbTtitle += " " +wcs.getMessage("ui","unchecked");
	}
	if(component.needsRender() || row==currentRow)
	{
		boolean expanded = control.getParentInstance().getProperty("filterexpanded").equalsIgnoreCase("true");
		int rowType = tableRow.getRowType();

		if(rownum!=null)
		{
			if(row>=0 && tableRow instanceof TableDataRow)
			{
				if(row==currentRow)
				{
					cssclass+=" tcr";
					((TableDataRow)tableRow).setCurrentRow(true);
				}
				else
					((TableDataRow)tableRow).setCurrentRow(false);
			}
		}
	}
// Story 06-13334
	String hoverClass = "trh";
	if (tableControl.isListTabRetain()) 
	{
		if (tableControl.getDataBean().isModifiedRow(row)) 
		{
			cssclass+= " trmod";
		}
		else if (tableControl.getDataBean().isRowDeleted(row)) 
		{
			if(row==currentRow)
			{		
				cssclass = cssclass.replaceAll("tcr","trdrcr");
			} 
			else 
			{
				cssclass+= " trdr";
			}
			hoverClass = "trdrch";
		}			
	}	
	if(component.needsRender())
	{	%>
<tr role="row" id="<%=id%>_row" class="<%=cssclass%>" style="display:<%=display%>;"> <%
//we need to render all of the column data now
		List columnControls = tableBodyControl.getChildren();
		Iterator cols = columnControls.iterator();
		String dataString = "&nbsp;";
		int colCount = 0;
		String eventIcon = null;
		String eventDesc = null;
		String mxEvent = null;
		componentEvents="";
		componentEvents+=" onmouseover=\"return noStatus();\"";
		componentEvents+=" onfocus=\"input_onfocus(event,this);\"";
		componentEvents+=" onblur=\"input_onblur(event,this);\"";
		String compEvents = "";
		String newId = WebClientRuntime.parseParamForRow(wcs,id)[0];
		String webclientWrap = WebClientRuntime.getWebClientProperty("webclient.wraplength", "75");
		boolean canBreakWords=Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.canbreakwords","true")).booleanValue();
		boolean hyphenBreaks=Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.addhyphentobreak","false")).booleanValue();
		String fldInfo = "";
		String mainTab = control.getPage().getMainTabId();
		boolean rowSelected = dataSource.isSelected(row); 
		while (cols.hasNext())
		{
			Object col = (Object)cols.next();
			if(col instanceof TableCol)
			{
				TableCol columnControl = (TableCol) col;
				isNumeric = columnControl.isNumeric();
				eventIcon = columnControl.getProperty("mxevent_icon");
				eventDesc = columnControl.getProperty("mxevent_desc");
				mxEvent = columnControl.getProperty("mxevent");
				dataString="";
				if(!WebClientRuntime.isNull(mxEvent) && !mxEvent.equalsIgnoreCase("selectrecord"))
				{
					if(mxEvent.equalsIgnoreCase("toggleselectrow"))
					{
						//specialized id, we don't want to walk the columns to find the select for the refresh
						compEvents+=" onfocus=\"input_onfocus(event,this);\"";
						compEvents+=" onblur=\"input_onblur(event,this);\"";
						compEvents+=" onclick=\"cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a'); fixMockedLink('"+id+"_row_link'); sendEvent('toggleselectrow','"+control.getId()+"[R:"+row+"]','"+row+"');\"";
						compEvents+=" onkeydown=\"if(event.keyCode==KEYCODE_SPACEBAR || event.keyCode==KEYCODE_ENTER){cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a'); fixMockedLink('"+id+"_row_link');sendEvent('toggleselectrow','"+control.getId()+"[R:"+row+"]','"+row+"');}\"";
						fldInfo=" fldinfo='{\"eventpriority\":2}'";
						dataString="<a id=\""+newId+"_"+row+"_sel_a\" href=\"javascript: void(0);\" title=\""+cbTtitle+"\" tabindex=\"0\" style=\"cursor:default\" "+componentEvents+" "+compEvents+"><img border=\"0\" alt=\""+cbTtitle+"\" tabindex=\"-1\" align=\"texttop\" id=\""+id+"_"+row+"_sel\" selrow=\"true\" class=\"\" src=\""+cbSrc+"\" style=\"cursor:default\" checked=\""+checked+"\"/></a>";
					}
					else if(!WebClientRuntime.isNull(eventIcon))
					{
						compEvents=" onclick=\"cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a');sendEvent('click','"+control.getId()+"[R:"+row+"]','"+mxEvent+"[R:"+row+"]');\"";
						compEvents+=" onkeydown=\"if(event.keyCode==KEYCODE_SPACEBAR || event.keyCode==KEYCODE_ENTER){cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a');sendEvent('toggleselectrow','"+control.getId()+"[R:"+row+"]','"+row+"');}\"";
						dataString="<a href=\"javascript: void(0)\" title=\""+cbTtitle+"\" tabindex=\"0\" style=\"cursor:default\" "+componentEvents+" "+compEvents+">";
						dataString+="<img id=\""+newId+"_"+row+"_"+colCount+"\" tabindex=\"-1\" border=\"0\" "+componentEvents+" src=\""+IMAGE_PATH+""+eventIcon+"\" style=\"cursor:pointer;margin:0px;\" alt=\""+eventDesc+"\"/></a>";
					}
				}
				else if(dataSource!=null)
				{
					String da = columnControl.getProperty("dataattribute");
					String ds = columnControl.getProperty("datasource");
					if(!WebClientRuntime.isNull(da))
					{
						dataString = dataSource.getString(row,da);
						//must handle get properties from column directly as renderPropertyCache prevents us from resetting it for each column
						int wrapInt = 75;
						String wrap = columnControl.getProperty("wraplength");
						if(WebClientRuntime.isNull(wrap))
						{
							wrap = component.getProperty("wraplength");
							if(WebClientRuntime.isNull(wrap))
								wrap = webclientWrap;
						}
						try
						{
							wrapInt=Integer.parseInt(wrap);
						}
						catch(NumberFormatException numEx)
						{

						}
						String localCanBreak = columnControl.getProperty("canbreakwords");
						if(!WebClientRuntime.isNull(localCanBreak))
							canBreakWords=Boolean.valueOf(localCanBreak).booleanValue();
						String localHyphenBreak = columnControl.getProperty("addhyphentobreak");
						if(!WebClientRuntime.isNull(localHyphenBreak))
							hyphenBreaks=Boolean.valueOf(localHyphenBreak).booleanValue();
						dataString = WebClientRuntime.wrapText(dataString, wrapInt, canBreakWords, hyphenBreaks);
						dataString = HTML.encodeTolerant(dataString);
						if(WebClientRuntime.is7504FPEnabled()) {
							String el = "span";
							String additional = " row='"+row+"' ";;
							String className = "";
							
							if(rowSelected && colCount<=1) {
								el = "a";
								className = " anchor";
								additional+=" href=\"Javascript: sendEvent('selectmockedrecord','"+tableControl.getId()+"','"+row+"');\" ";
							}
							dataString = "<"+el+" id='"+id+"_row_link' class='text label"+className+"'"+additional+">"+dataString+"</"+el+">";
						}
					}
				}
				if(WebClientRuntime.isNull(dataString))
					dataString="&nbsp";

				String align = "";
				String padding="";
				if(isNumeric)
				{
					align="align='"+reverseAlign+"'";
					padding="style='padding-"+reverseAlign+":10px'";
				}
				String over =" onmouseover=\"if(this.getAttribute('currentrow')!='true'){appendClass(this.parentNode,'"+hoverClass+"');}\" onmouseout=\"removeClass(this.parentNode,'"+hoverClass+"')\"";
				%>
				<td role="gridcell" mxejse='trmHdlr' id="<%=control.getId()%>[R:<%=row%>]"<%=asyncevents%> <%if(async){%>async="1" <%}%><%=fldInfo%>class="text tc tcolmulti tabletext" <%=align%> <%=padding%> <%=over%> <%if(!rowSelected || colCount>1) {%>onclick="cancelEvent(event);sendEvent('click','<%=control.getId()%>[R:<%=row%>]','setcurrent');"<%}%>><%=dataString %></td>
			<%	colCount++;
			}
		}	%>
 </tr><%
	}
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		tRow = document.getElementById("<%=id%>_row");
		if(tRow)
		{
			tRow.style.display="<%=display%>";
			tRow.className="<%=cssclass%>";
		}
		addLoadMethod("document.getElementById('<%=id%>_row').className='<%=cssclass%>';");
		cb = document.getElementById("<%=id+"_"+row+"_sel"%>");
		if(cb)
		{
			cb.src="<%=cbSrc%>";
			cb.alt="<%=cbTtitle%>";
			
		}
	</script>]]></component>
<%	}
 %><%@ include file="../common/componentfooter.jsp" %>
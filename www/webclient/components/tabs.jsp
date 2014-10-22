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
--%><%@ include file="../common/componentheader.jsp" %><%@include file="tabs_ex.jsp" %><%
	String format = component.getProperty("format");
	TabGroup tabGroup = ((TabGroup)control);
	Tab currentTab = tabGroup.getCurrentTab();
	String currentTabType = currentTab.getProperty("type");
	boolean hideForFormat = (format.equalsIgnoreCase("navigation") && currentTabType.equals("list") && !designmode);
	String breadCrumbs = "";
	String buttons = "";
	if(format!=null && format.equalsIgnoreCase("navigation")) {
		if (WebClientRuntime.is7504FPEnabled())
		{			
			buttons = getButtonHtml(id, wcs, designmode);
		}
		else
		{
			DataBean dataBean = app.getDataBean();
			ResultsBean results = app.getResultsBean();
			String queryDesc = "";
			if(results!=null) {
				queryDesc = results.getCurrentQueryDescription();
			}
			if(queryDesc.length()==0) {
				String keyAttribute = control.getDataBean().getKeyAttribute();
				queryDesc = wcs.getMessage("tabgroup", "recordlist", new String[]{});
			}
			String bcType = "a  href=\"javascript: sendEvent('gotolisttab','"+id+"','')\"";
			if(designmode) {
				bcType = "span"; 
			}
			breadCrumbs = "<"+bcType+">"+queryDesc+"</"+bcType+">";
			String keyValue = dataBean.getString(dataBean.getKeyAttribute());
			boolean hasMods = ((AppBean)app.getAppBean()).hasModifications();
			String disabled = "";

			if(!hasMods) {
				disabled = " disabled='disabled' ";
			}
			if(keyValue.length()>0)
			{
				if(rtl) {
					breadCrumbs = keyValue + "&nbsp;&lt;&nbsp;" + breadCrumbs;
				}
				else {
					breadCrumbs += "&nbsp;&gt;&nbsp;" + keyValue ;							
				}
			}
		}
	}
	if(!hideForFormat)
	{
		if(component.needsRender() && (!format.equalsIgnoreCase("carddeck") || (designmode)))
		{	
			String style = component.getProperty("style");
			if(!style.equalsIgnoreCase("form"))
			{
				cssclass="sub"+cssclass;
			}	
			String innerClass = "tabgroup"; 
			if(format.equalsIgnoreCase("wizard"))
			{
				innerClass+="w";
			}	%>
		<td class="<%=cssclass%>" <%if(format.equalsIgnoreCase("navigation")){%>style="padding: 5px 5px 0 5px;"<%}%>>
		<%	if(!hideForFormat || (designmode))
			{	
				String opaque = "";
				String cursor = "cursor: pointer;";
				if(designmode) {
					opaque = " opacity_55";
					cursor="cursor: default;";
				}
				if(format.equalsIgnoreCase("navigation")) { %>
					<table role="presentation" class="text tabBreadCrumbs<%=opaque%>" style="<%=cursor%>display: inline"><tr><td class="breadcrumbButtonGroup" <%=getAdditionalBreadcrumbProperty()%>><%=buttons%></td><td id="<%=id%>_breadCrumbs"><%=breadCrumbs%></td></tr></table>
				<%}%>
				<ul class="<%=innerClass%>" nowrap="nowrap" role="tablist" <%if(breadCrumbs.length()>0){%>style="padding-top: 3px;"<%}%>><%
			}
		}
		component.renderChildrenControls(); 
		if(component.needsRender() && (!format.equalsIgnoreCase("carddeck") || designmode))
		{
		  %></ul>
		</td>
	<%	}
		if(!component.needsRender())
		{	%>
			<component id="<%=id%>_breadCrumbs"<%=compType%> ignrdispstyle="true"><![CDATA[<%=breadCrumbs%>]]></component>		
	<%	}
	}	%><%@ include file="../common/componentfooter.jsp" %>
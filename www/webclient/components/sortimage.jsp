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
	String src = "blank.gif"; //component.getSource();
	SortImage sortImage = (SortImage)component;
	String order = sortImage.getSortOrder().toLowerCase();
	String sortLevel = sortImage.getSortLevel();
	msg = sortImage.getSortLabel(order);
	String width = "11";
	String height = "11";
	if(!order.equals(""))
		src="col_sort_"+order+".gif";
	else
		width="0";
	if(!sortLevel.equals("")) {
	%><span class="sit"><%
	}	
%><img id="<%=id%>" <%=automationId%> tabindex="-1" border="0" src="<%=IMAGE_PATH%><%=src%>" aria-live="polite" alt="<%=msg%>" width="<%=width%>" height="<%=height%>" align="absmiddle" style="margin:0px;" <%=componentEvents%> /><%
	if(!sortLevel.equals("")) {
	%><%=sortLevel%></span><%	
	} %>
<%@ include file="../common/componentfooter.jsp" %>
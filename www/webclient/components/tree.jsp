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
--%><%--
This JSP is the handler for "tree" component.
It provides a wrapper/container for this tree and its children.
It handles the following events
- render of the tree
- refresh of the tree
--%>
<%@ include file="../common/simpleheader.jsp" %>
<%
String label = component.getProperty("label");
if(designmode)
{
%>
	<%@ include file="../common/designerevents.jsp" %>
<%  
	label = control.getLocalizedType();
}

Tree treeControl = (Tree)control; //Tree handler

String treeAutomationId = "";
if(automation)
    treeAutomationId="automationid=\""+realId+"_tree\"";

if(component.needsRender())
{
	//Attributes specified for this control (in xml)
	String treeheight = component.getProperty("height");
	String treewidth = component.getProperty("width");

	if(!WebClientRuntime.isNull(treeheight))
	{
		if(treeheight.indexOf("%")==-1)
			treeheight=treeheight+"px";
		treeheight="height:"+treeheight+";";
	}
	if(!WebClientRuntime.isNull(treewidth))
	{
		if(treewidth.indexOf("%")==-1)
			treewidth=treewidth+"px";
		treewidth="width:"+treewidth+";";
	}

%>
	<%if (designmode)
	{%>
		<div control="true" id="<%=id%>" <%=automationId%>>
			<span class="<%=textcss%> dl" <%=componentEvents%>><a href=''onclick='return false;'><%@ include file="../common/uistatusindicator.jsp" %><%=label%>...</a></span>
	<%}%>
			<div control="true" align="<%=defaultAlign%>"  class="tcont <%=cssclass%>" <%if(!ismobile){%>style="<%=treeheight%><%=treewidth%>overflow:auto;"<%}%>>
				<div id="<%=treeControl.getId()+"_treecontainer"%>">
					<ul onkeydown="treeKey(event, this)" role="tree" id="<%=id+"_tree"%>" <%=treeAutomationId%> nowrap="true" align="<%=defaultAlign%>" class="tcontr" style="margin:2px;padding:2px;list-style:none;">		
			<%	component.renderChildrenControls(); %>
					</ul>
				</div>
			</div>

	<%if (designmode)
	{%>
		</div>
	<%}%>
<%
    // No need to refresh any further, we have just rendered the tree!
    if (!designmode)
	    treeControl.setRefreshTree(false);
}
else
{
	if(!designmode)
	{		
	 //if tree itself has to be refreshed then render the treenodes within wrapper and swap replace old content, else just let the refresh go on
	 if(treeControl.hasChanged())
	 {
			holderId=treeControl.getId()+"_treecontainer";
	%><%@ include file="../common/componentholder_start.jsp" %>
			<ul onkeydown="treeKey(event, this)" role="tree" id="<%=id+"_tree"%>" <%=treeAutomationId%> nowrap="true" align="<%=defaultAlign%>" class="tcontr <%=cssclass%>" style="margin:2px;padding:2px;list-style:none;">			
<%		
			component.renderChildrenControls();
%>
			</ul>	
			<%@ include file="../common/componentholder_end.jsp" %>		
<%
				treeControl.setRefreshTree(false);
	 	}
	 	else
			component.renderChildrenControls();
	}
	else
		component.renderChildrenControls();
	
}	
%><%@ include file="../common/componentfooter.jsp" %>
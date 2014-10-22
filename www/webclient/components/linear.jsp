<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page import="psdi.webclient.beans.linear.*"%><%@ include file="../common/simpleheader.jsp" %><%
String width  = component.getProperty("width");
String height = component.getProperty("height");

if(designmode)
{	
	if(false) //remove this if we want to show the control in designer
	{
%>	<div id="<%=id%>" class="sdm" style="width:<%=width%>;height:<%=height%>;"><%=control.getLocalizedType()%></div>
<%	}
}
else
{
	LinearViewer viewer = (LinearViewer)control;
	boolean isVisible = viewer.isVisibleOnCurrentTab();

	if (component.needsRender())
	{
		String url = viewer.buildUrl(wcs, servletBase, "/lnr", "/flex/LinearApp.swf");
%>	<object id="<%=id%>" width="<%=width%>" height="<%=height%>" style="height: <%= isVisible ? height : "0px" %>; padding: 0px 5px 5px 5px"
			type="application/x-shockwave-flash" data="<%=url%>" aria-hidden="true">
		<param name="movie" value="<%=url%>" />
		<param name="wmode" value="opaque" />
		<param name="menu" value="false" />
		<param name="allowScriptAccess" value="sameDomain" />
		<SPAN STYLE="color:red">Object failed to load</SPAN>
							Flash not enabled
	</object>
<%	}
	else
	{
		boolean visibilityChanged = viewer.hasVisibilityChanged();
		if(visibilityChanged || isVisible)
		{
%>			<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
			var control = document.getElementById("<%=id%>");
			if(control)
			{
				try
				{
<%					if(visibilityChanged)
					{
						viewer.setVisibilityChanged(false);
%>						control.style.height = "<%= isVisible ? height : "0px" %>";
<%					}
					if(isVisible)
					{
%>						control.refreshData();
<%					}
%>				}
				catch(error)
				{
<%					if(debug)
					{
%>						console.log('Error loading data <%=id%>: ' + error);
<%					}
%>				}
			}
			</script><%="]]>"%></component>
<%		}
	}
}	%>
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
--%><%	String rbDisplay="";
	if(!wcs.showRunBook())
	{
		rbDisplay="none";
	}
	if(component.needsRender())
	{	%>
<tr>
	<td colspan="20">
	<iframe id="runbookFrame" src="<%=servletBase%>/utility/runbook.jsp" frameborder="0" scrolling="no" style="display:<%=rbDisplay%>" height="97px" width="100%"></iframe>
	</td>
</tr>
<script defer>
	function toggleRunbook(disp)
	{
		rec = document.getElementById("runbookFrame");
		if(rec)
		{
			rec.style.position="absolute";
			rec.style.display=disp;
			rec.style.top=document.body.clientHeight-rec.offsetHeight;
		}
	}
	toggleRunbook('<%=rbDisplay%>');
</script>
<%	}
	else
	{	if (hiddenFrame)
        {%>addLoadMethod("MAINDOC.toggleRunbook('<%=rbDisplay%>')");
<%      }
  	}
%>
<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011,2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%
String incData = (String)app.get("incdata");
if(hiddenFrame && !Boolean.parseBoolean(incData))
{
	// We are not in a CDATA tag, so start it.
	// Set the incdata flag on the app so that subcomponents know it has already been started.
	app.put("incdata","true");
	// Keep a reference to the component that started the CDATA tag so we can end it in the right place.
	app.put("startedcdata",component.getId());
	String repMethod = "";
	if(!WebClientRuntime.isNull(replaceMethod))
		repMethod=" replacemethod=\""+replaceMethod+"\"";
	String append="";
	if(appendContent)
		append=" append=\""+appendContent+"\"";
	if(!WebClientRuntime.isNull(holderId))
		holderId=" holder=\""+holderId+"\"";
	%><component vis="<%=refreshDisplay%>" id="<%=id%>_holder" compid="<%=id%>"<%=repMethod%><%=holderId%><%=append%><%=compType%>><![CDATA[<%
	String listeners = control.getRefreshListeners();
	if(listeners.length()>0){%><script pre='true'>publishMessage(<%=listeners%>);</script><%}%><%
}
else if(!"false".equals(component.getProperty("needsdivwrapper")))
{
	String style = "";
	if(componentDisplay.equals("display:none"))
	{
		style=" style=\""+componentDisplay+"\"";
	}
	%><div aria-live="polite" id="<%=id%>_holder" class="bc"<%=style%>><%
}	%>
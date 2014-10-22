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
--%><%
boolean inCData = Boolean.parseBoolean((String)app.get("incdata"));
String startedCData = (String)app.get("startedcdata");
String endCData = (String)app.get("endcdata");//this is to force writing the end component block. Needed for special components like treenode.

//after tree node expansion this is a a mismatch.
if(hiddenFrame && inCData && ((endCData!=null && endCData.equals("true")) || (component.getId().equals(startedCData))))
{
	// Turn the CDATA marker back off so the next component will know to open it.
	app.put("incdata","false");
	app.remove("startedcdata");
	%>]]></component>
<%	boolean hasInternalValue = (new Boolean(component.getProperty("internalvalue"))).booleanValue();
	if(hasInternalValue && componentValue!=null)
	{
%>	<compvalue id="<%=id%>"><![CDATA[<%=componentValue%>]]></compvalue>
<%	}
}
else if(!"false".equals(component.getProperty("needsdivwrapper")))
{
	%></div><%
}	%>
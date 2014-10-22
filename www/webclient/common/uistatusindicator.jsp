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
--%><%
/*
This component renderes the UI to show if a control is is set for special flags. For e.g.
- is control set for condition ui
 
Conditions are basically properties and the control will check for some property set
of a true value.

More conditions can be added later.
*/

if (designmode && "true".equals(wcs.getCurrentApp().get("showconditionalui")) && !component.getProperty("includeuistatus").equals("false"))
{
	if(!control.getProperty("sigoption").isEmpty())
	{
		%><img class='uii' width='10px' height='10px' align='absmiddle' border='0' src='../webclient/images/designer/conditionapplied.png' alt='Conditional UI Applied'/><%
	}
}	%>
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
--%>
<%!
/**
	Returns the html necessary to generate a button to be used as the back to list page button
*/
public String getButtonHtml(String id, WebClientSession wcs, boolean designmode)
{
	String onclick = "javascript:sendEvent('gotolisttab','"+id+"','')";
	if(designmode)
	{
		onclick="return false;";
	}
	String text = wcs.getMessage("ui", "backtolisttab");
	String events = "";
	if(!designmode) {
		events = "onmouseover=\"appendClass(this, 'bchover')\" onmouseout=\"removeClass(this, 'bchover')\" onkeydown=\"if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){stopBubble(event);"+onclick+";return true;}\" onclick=\""+onclick+"\"";
	}

	return "<div tabindex='0' role='button' aria-labelledby='"+id+"_middle' title='"+text+"' "+events+"><table role='presentation'><tr><td class='pbspecialwest'></td><td id='"+id+"_middle' class='pbspecialmiddle' class=\"text\">" + text + "</td><td class='pbspecialeast'></td></tr></table></div>";
}

/**
	Returns any additional properties that are necessary on the button section on the breadcrumb line
*/
public String getAdditionalBreadcrumbProperty()
{
	return "style=\"padding-bottom:2px\"";
}
%>
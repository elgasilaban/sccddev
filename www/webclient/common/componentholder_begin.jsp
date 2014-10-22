<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
/*
 * This file is for use if you are not using simpleheader.jsp, if you are using simpleheader.jsp, it already does this for you
 */
{
	String compType = "";
	if(wcs.getDebugLevel() > 0)
	{
		compType = " comptype=\"" + component.getType() + "\"";
	}
	String replaceMethod = component.getProperty("replacemethod");
	boolean appendContent = false;
	String holderId = component.getProperty("holderid");
	String refreshDisplay = Boolean.toString(componentVisible);
	String componentDisplay = "display:inline";
	if(component.needsRender() && ((!designmode && !componentVisible) || control.isHiddenByLicense()))
	{
		componentDisplay = "display:none";
	}
	%><%@ include file="../common/componentholder_start.jsp" %><%
}
%>
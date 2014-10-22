<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012,2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	String moreHelp = wcs.getMaxMessage("jspmessages", "morehelp").getMessage(); 
	String extendedtooltip = component.getProperty("extendedtooltip");
	String rechover = component.getProperty("rechover");
	String hovertooltip = " hovertooltip='"+extendedtooltip+"' ";
	String tooltiptype = WebClientSession.RequestType.HIGHASYNC.toString();
	if(rechover.length()>0) {
		tooltiptype = WebClientSession.RequestType.SYNC.toString();
        hovertooltip = " hovertooltip='"+rechover+"' ";
    }
	String tttype = " tttype='"+tooltiptype+"' ";
	int tabIndex = -1;
	if(accessibilityMode) {
		tabIndex = 0;
	}
	helpImage = "<img id='"+id+"_tt' src='"+wcs.getImageURL()+"btn10_moreInfo.png' role='button' aria-label='"+component.getProperty("title")+" "+moreHelp+"' class='tooltipMarker' compid='"+id+"' tabindex='"+tabIndex+"' "+hovertooltip+tttype+" ctype='ttimage'/>";
%>
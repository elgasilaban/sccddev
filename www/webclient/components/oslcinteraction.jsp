<%--
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 5724-U18
* (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%@ include file="../common/simpleheader.jsp" %>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
String interactionType = (String) wcs.getRequest().getAttribute("OSLCInteractionType");

//This variable contains the java method name used in the class associated with this component
String javaMethod = interactionType;
%>
   	<script type="text/javascript">
		<%@ include file="../javascript/oslcinteraction.js" %>
		eventHandler();
		dojo.require("dojo.parser")
       	dojo.require("dijit.form.Button")
       	dojo.require("dijit.Dialog")
       	dojo.require("dijit.form.TextBox")

	</script>
</head>

<%
//Get some default information
StringBuffer query = new StringBuffer();

/*
if ((interactionType != null) && (interactionType.equalsIgnoreCase("CREATIONDIALOG")))
{
	//mboRemote is different of null because always there is a ticket associated tih the appication
	MboRemote mboRemote = wcs.getCurrentApp().getDataBean().getMboSet().getMbo(0);
	String summary = mboRemote.getString("DESCRIPTION");
	String description = mboRemote.getString("DESCRIPTION_LONGDESCRIPTION");
		
	if(summary!=null && !summary.equals("")) {
		query.append("&dc:name=" + summary);		
	}
		
	if(description!=null && !description.equals("")) {
		query.append("&dc:description=" + description);
	}
}
*/

String width = "700px";
String height = "700px";
String src = "";

height = (String)wcs.getRequest().getAttribute("OSLCInteractionHeight");
width = (String)wcs.getRequest().getAttribute("OSLCInteractionWidth");


//Select URL
String interactionUrl = (String) wcs.getRequest().getAttribute("OSLCInteractionTypeURI");

src = interactionUrl + query.toString() + "#oslc-core-postMessage-1.0";
%>

<div dojoType="dijit.Dialog" valign="top" style="background: url(<%=IMAGE_PATH%>progressbar.gif) no-repeat">
	<iframe id="<%=interactionType%>" onload="unLockWait();hideWait();this.parentNode.style.background=''" src="<%=src%>" width="<%=width%>" height="<%=height%>" tabindex="0" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="auto"></iframe>
</div>
<script>
	lockWait();
</script>
<%@ include file="../common/componentfooter.jsp" %>
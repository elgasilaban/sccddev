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
--%><%@page import="psdi.webclient.system.controller.ContainerErrorInfo"
%><%
	String error_icon = "";
	if(!designmode && "true".equals(component.getProperty("erroricon")))// && (app.isAsyncEnabled() || app.deepRequiredEnabled()))
	{
		ContainerErrorInfo error_info = component.getErrorInfo();
		String error_tooltip = "";
		String error_type = "blank";
		String error_event = "";
		String error_display = " style='display:none' ";
		String error_tabindex = "-1";
		String error_image = IMAGE_PATH+"blank.gif";
		if(error_info!=null)
		{
			error_tooltip = error_info.getTooltip();
			error_type = error_info.getType();
			error_event = error_info.getImageEvent();
			error_display=" ";
			//since these icons cannot take a click, let's not allow them to get focus by tabbing
			//error_tabindex = "0";
			error_image=IMAGE_PATH+"async/"+error_type+".png";
		}
		//Removed until a click can be done to focus on the item
		//sendXHREvent(this.getAttribute(\"error_event\"), \""+control.getId()+"\", \"\", \"REQUESTTYPE_ASYNC\", \"xml\", \"text/xml\", null ,null);
		error_icon="<img id='"+id+"_er_img' src='"+error_image+"'"+error_display+"class='"+component.getType()+"_"+error_type+"_icon' title=\""+error_tooltip+"\" alt=\""+error_tooltip+"\"/>";
	}	%>
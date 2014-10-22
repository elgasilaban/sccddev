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
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%
String exceptionImage = "";
int exceptionType = boundComponent != null ? boundComponent.getExceptionType() : -1;
int excImageSize = 16;
if(wcs.getSkin().equals(""))
	excImageSize = 12;
String asyncStr = (async) ? "async='1'" : "";
String excMouseEvents = "onclick=\"forceFocus('"+id+"');startPopOver(event,'"+id+"',true);stopBubble(event);\"";
String ariaException = " aria-invalid=\"true\"";
excImageClass = " class='exc' ";
String exc = "exc=\"" + exceptionType + "\"";
switch (exceptionType)
{
	case ComponentInstance.EXCEPTION_ERROR:
		exceptionImage = "async/error.png";
		component.setChangedFlag(true);
		exceptionClass += " fld_error";
		break;
	case ComponentInstance.EXCEPTION_REQUIREDFIELD:
		exceptionImage = "async/error.png";
		component.setChangedFlag(true);
		exceptionClass += " fld_error";
		break;
	case ComponentInstance.EXCEPTION_INFO:
		exceptionImage = "async/info.png";
		exceptionClass += " fld_info";
		break;
	case ComponentInstance.EXCEPTION_YESNOCANCEL:
		exceptionImage = "async/question.png";
		component.setChangedFlag(true);
		exceptionClass += " fld_question";
		break;
	case ComponentInstance.EXCEPTION_WARNING:
		exceptionImage = "async/warning.png";
		component.setChangedFlag(true);
		exceptionClass += " fld_warn";
		if(component instanceof BoundComponentInstance)
		{
			boundComponent = (BoundComponentInstance)component;
			if (boundComponent.isRevert())
			{
				boundComponent.resetIsRevert();
			}
		}
		break;
	case BaseInstance.EXCEPTION_SMARTFILL:
		component.setChangedFlag(true);
		exceptionClass+=" fld_smartfill";
		break;
	default:
		exc = "";
		ariaException = "";
		exceptionImage = "blank.gif";
		excImageClass = " "; //should be a space to allow for correct output
		excMouseEvents = "";
		break;
}
ariaString += ariaException;
componentValue=value;	%>
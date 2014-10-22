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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "org.w3c.dom.*,psdi.mbo.*, psdi.util.*, psdi.webclient.system.controller.*, psdi.webclient.system.beans.*, psdi.webclient.system.runtime.*, psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.webclient.controls.*, psdi.webclient.components.*, java.util.*, java.io.*" %><%@ include file="simpleheader.jsp" %><%
	boolean isRequired = false;
	boolean mxes = false;
	boolean isReadOnly = false;
	boolean isMasked = false;
	if(request.getParameter("view") != null)
		mxes = true;
	String cancelClickBubble = "";
	if(component.isOnTableRow())
		cancelClickBubble=" cancelEvent(event); ";
	String[] titleSepParam = {""};
	String titleSep = " ";
	if(!accessibilityMode)
	{
		titleSep = wcs.getSettingsProperty("titlesepformat", titleSepParam);
		if(titleSep == null)
			titleSep = ": ";
		titleSep += " ";
	}

	BoundComponentInstance boundComponent = null;
	String onfilterrow = component.getProperty("onfilterrow");
	String maskedTitle = "";
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		isReadOnly = boundComponent.isReadOnly();
		isMasked = boundComponent.isMasked();
		isRequired = boundComponent.isRequired();
		if(isMasked)
			maskedTitle = wcs.getMaxMessage("ui", "maskedtitle").getMessage();
	}
	
	boolean focused = false;
	boolean hideOnTable = component.getProperty("hideontable").equalsIgnoreCase("true");
	boolean onTableDetails = control.getProperty("ontabledetails").equalsIgnoreCase("true");
	boolean tableReadOnly = false;
	String fieldSize = component.getProperty("size");
	if(fieldSize.equals(""))
		fieldSize = "0";
	String remarks = component.getProperty("remarks");
	PageInstance myPage = control.getPage();
	String title = component.getProperty("title");
	String length = component.getProperty("length");
	int size = Integer.parseInt(fieldSize);
	if(component.isOnTableRow())
	{
		if(size > 40)
			size = 40;
	}
	String scale = component.getProperty("scale");
	String intType = component.getProperty("inttype");
	int dataType = -1;
	if(!WebClientRuntime.isNull(intType))
		dataType = Integer.parseInt(intType);
	boolean isNumeric = component.getProperty("isnumeric").equalsIgnoreCase("true");
	boolean isPersistent = component.getProperty("ispersistent").equalsIgnoreCase("true");
	String entityName = component.getProperty("entityname");
	String objectName = component.getProperty("objectname");
	String attributeName = component.getProperty("attributename");
	String columnName = component.getProperty("columnname");
	boolean hasLongDescription = component.getProperty("haslongdescription").equalsIgnoreCase("true");
	String rownum = control.getProperty("rownum");
	String msgLookup = component.getProperty("msg");
	String titlePrepend = component.getProperty("titleprepend");
	String titleAppend = component.getProperty("titleappend");
	String msgGroup = "";
	String msgKey = "";
	String msg = "";
	int msgCutOff = msgLookup.indexOf("#");
	if(msgCutOff > -1)
	{
		msgGroup = msgLookup.substring(0, msgCutOff);
		msgKey = msgLookup.substring(msgCutOff + 1);
		String msgpair[] = WebClientRuntime.breakupMsgLookup(msgLookup);
		msg = wcs.getMaxMessage(msgpair[0], msgpair[1]).getMessage();
	}

	msgCutOff = titlePrepend.indexOf("#");
	if(msgCutOff > -1)
	{
		String msgpair[] = WebClientRuntime.breakupMsgLookup(titlePrepend);
		titlePrepend = wcs.getMaxMessage(msgpair[0], msgpair[1]).getMessage();
	}

	msgCutOff = titleAppend.indexOf("#");
	if(msgCutOff > -1)
	{
		String msgpair[] = WebClientRuntime.breakupMsgLookup(titleAppend);
		titleAppend = wcs.getMaxMessage(msgpair[0], msgpair[1]).getMessage();
	}

	if(mxes && control.getProperty("label").equals(""))
	{
		if(!controlType.equalsIgnoreCase("section") && !controlType.equalsIgnoreCase("sectionrow"))
			control.setProperty("label", "xxxxxxxxxxx");
	}
	String accesskey = component.getProperty("accesskey");
	if (!WebClientRuntime.isNull(accesskey))
		accesskey = app.getHotkeys().addHotkey(wcs,accesskey, id, "click");
	String trd = "";
	%><%@ include file="inputcss.jsp" %>
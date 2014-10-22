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
%><%@page import="psdi.webclient.system.beans.DataBean"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.util.CalendarUtils"
%><%@page import="psdi.util.MXFormat"
%><%@page import="java.util.Date"
%><%@page import="java.util.Locale"
%><%
	Locale userLocale = s.getUserInfo().getLocale();
	String userCalendar = s.getUserInfo().getCaltype().toLowerCase();
	String usrLocale = userLocale.toString().toLowerCase().replace('_', '-');
	String dojoLang = " lang=\""+usrLocale+"\" lng=\""+langcode.toLowerCase()+"\"";
	Date date = null;
	
	if(!designmode && component instanceof BoundComponentInstance)
	{
		if(dataType == MXFormat.DATE || dataType == MXFormat.TIME || dataType == MXFormat.DATETIME)
		{
			if( (boundComponent.isQuery() || boundComponent.isDefault() ) && WebClientRuntime.isPrependedDate(boundComponent.getString()) )
			{
				date=new Date();
			}
			else
			{
				String attribute = boundComponent.getProperty(boundComponent.DATA_ATTRIBUTE);
				DataBean bean = boundComponent.getDataBean();
				if(control.isOnTableRow() && !(boundComponent.isQuery() || boundComponent.isDefault()) )
					date = bean.getMboValueData(Integer.parseInt(control.getRowNum()), attribute).getDataAsDate();
				else
					date = bean.getDate(attribute);
			}
		}
	}
	if(date == null)
	{
		date = new Date();
	}
	else
	{
		if(isReadOnly && ! CalendarUtils.GREGORIAN.equalsIgnoreCase(userCalendar))
		{
			if(dataType == MXFormat.DATE || dataType == MXFormat.DATETIME)
			{
				if(dataType == MXFormat.DATE)
				{
					if(!value.equalsIgnoreCase(MXFormat.dateToString(date, userLocale)))
					{
						date = MXFormat.stringToDate(value, userLocale);
					}
				}
				else if(dataType == MXFormat.DATETIME)
				{
					if(!value.equalsIgnoreCase(MXFormat.dateTimeToString(date, userLocale)))
					{
						date = MXFormat.stringToDateTime(value, userLocale);
					}
				}
			}
		}
	}
	
	String dojoPackage = CalendarUtils.getDojoDatePackage(userCalendar);
	
	// Issue: 12-13655 - TVT - Hebrew date popup not working and set, by default, to Hebrew calendar
	// Hebrew calendar should not be tied to locale or langcode.
	// If you're looking for how it used to be done see code below but Hebrew should be a 
	// calendar option when we decide to support it.
	//
	//Hebrew calendar setting comes from language rather than userCalendar setting
	//if(langcode.toLowerCase().startsWith("he"))
	//{
	//	dojoPackage = CalendarUtils.getDojoDatePackage("HEBREW");
	//}
	
	String dojoDatePattern = "";
  %><script>
		dojo.require('layers.mbs.calendar');
		dojo.require('dojo.date.locale');
<%		String timePattern = MXFormat.getDisplayTimePattern(userLocale);
		if(!timePattern.contains("hh"))
		{
			timePattern = WebClientRuntime.replaceString(timePattern, "h", "hh");
		}
		String datePattern = MXFormat.getDatePattern(userLocale);
		if(dojoPackage.length() != 0) 
		{
%>			dojo.require('<%=dojoPackage%>');
			dojo.require('<%=dojoPackage%>.locale');
<%		}

		if(dataType == MXFormat.TIME)
		{
			dojoTypeInput = "PopupType=\"dijit._TimePicker\"";
			dojoDatePattern = "timePattern:'"+timePattern+"',selector:'time'";
%>			dojo.require('dijit._TimePicker');
<%		}
		else if(dataType == MXFormat.DATE || (dataType != MXFormat.DATETIME && component.getLookupName().equalsIgnoreCase("datelookup")))
		{
			dojoTypeInput = "PopupType=\"dijit.Calendar\"";
			dojoDatePattern = "datePattern:'"+datePattern+"',selector:'date'";
%>			dojo.require('dijit.Calendar');
<%		}
		else if(dataType == MXFormat.DATETIME || component.getLookupName().equalsIgnoreCase("datetimelookup"))
		{
			dojoTypeInput = "PopupType=\"ibm.tivoli.mbs.dijit.DateTimeCalendar\"";
			dojoDatePattern = "datePattern:'"+datePattern+ "', timePattern:'"+timePattern+"'";
%>			dojo.require('ibm.tivoli.mbs.dijit.DateTimeCalendar');
<%		}
%>	</script><%	
	dojoTypeInput += " constraints=\"{" + dojoDatePattern + ",locale:'" + usrLocale + "',visibleRange: 'T03:30:00'}\""
	+ ((dataType != MXFormat.TIME)? " datePackage=\"" + dojoPackage+"\"":"" ) + dojoLang
	+ " dojoValue='" + date.getTime() + "'";
%>
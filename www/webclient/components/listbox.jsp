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
--%><%--
This JSP renders the Listbox control.
--%><%
%><%@page import="psdi.webclient.system.serviceability.Level"
%><%@page import="psdi.webclient.system.serviceability.Category"
%><%@include file="../common/componentheader.jsp"
%><%!
public static final Category LOG_CATEGORY = Category.get(ComponentInstance.LOG_CATEGORY, "Listbox");
%><%
if(designmode)
{
	%><%@ include file="../common/designerevents.jsp" %><%
}

String width = component.getProperty("width");
String height = component.getProperty("height");
String keyvalue = component.getProperty("keyvalue");

Listbox listControl = (Listbox)control;

String displaystyle = null;
String dojoTypeInput = "";
boolean isDate = false;
Date date = null;
String dojoDatePattern = "";
Locale userLocale = s.getUserInfo().getLocale();
String usrLocale = userLocale.toString().toLowerCase().replace('_', '-');
String dojoLang = "lang=\""+usrLocale+"\"";
String userCalendar = s.getUserInfo().getCaltype().toLowerCase();
String dojoPackage = psdi.util.CalendarUtils.getDojoDatePackage(userCalendar);
String datePackage = "datePackage=\""+dojoPackage+"\"";
boolean isNational = !CalendarUtils.GREGORIAN.equalsIgnoreCase(userCalendar);

if(WebClientRuntime.isNull(width))
	width="96%";
else
	width+="px";

if(WebClientRuntime.isNull(height))
	height="40px";
else
	height+="px";

if(!designmode && listControl.getDataBean() != null)
{
	String dataattribute = component.getProperty("dataattribute");
	DataBean dataBean = listControl.getDataBean();
	if(keyvalue.isEmpty())
	{
		keyvalue = dataBean.getString(dataattribute);
	}

	String inputmode = component.getProperty("inputmode");
	MboValueData mvd = dataBean.getMboValueData(dataattribute);
	isRequired = inputmode.contains("required") || (mvd != null && mvd.isRequired());
	isReadOnly = inputmode.contains("readonly") || (mvd != null && mvd.isReadOnly());
}

JSONObject fieldInfo = null;
if(component instanceof BoundComponentInstance)
{
	fieldInfo = boundComponent.getFieldInfo();
}
// Note how the listbox contents is built always - on render as well as on refresh - because updating it
// seems rather impossible. A performance improvement in the future might want to look at setting the
// focused item on refresh to work without the need to regenerate the whole listbox contents
if(listControl.hasChanged())
{
	String listboxdivAutoId = "";
	if(automation)
	{
		listboxdivAutoId = "automationid=\"" + realId + "_listboxdiv\"";
	}
	%><ul id="<%=id%>" <%=componentEvents%> <%=listboxdivAutoId%> tabindex="-1" class="listbox <%=cssclass%><%=isReadOnly?" readonly":""%>" align="<%=defaultAlign%>" role="listbox"<%
			if(isRequired)
			{
				%> aria-required="true"<%
			}
			if(isReadOnly)
			{
				%> aria-disabled="true"<%
			}
			%> style="height:<%=height%>;width:<%=width%>" <%if(fieldInfo!=null){%>fldInfo='<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>'<%}%>>
<%		if(!designmode)
		{
			MboValueData[][] valueListData = listControl.getData();
			if (valueListData != null)
			{
				boolean anySelected = false;
				for(int i = 0; i < valueListData.length; i++)
				{
					if(valueListData[i][0] == null)
					{
						%>Bad key<script>dojo.addClass('<%=id%>', 'iu');</script><%
						wcs.serviceability.logger.log(Level.ERROR, LOG_CATEGORY, id + " - No data was returned for the keyvalue.", "Check that the keyattribute property was specified in the control properties.");
						break;
					}
					String listboxitem_keyvalue = valueListData[i][0].getData();
					if(Integer.toString(i).equals(keyvalue) || keyvalue.equalsIgnoreCase(listboxitem_keyvalue))
					{
						anySelected = true;
						break;
					}
				}

				wcs.serviceability.logger.log(Level.INFO, LOG_CATEGORY, id + " - populating the list with " + valueListData.length + " items");
				for(int i = 0; i < valueListData.length; i++)
				{
					boolean selected = false;

					if(valueListData[i][0] == null)
					{
						break;
					}
					String listboxitem_keyvalue = valueListData[i][0].getData();

					String listboxitem_label;
					if(valueListData[i][1] != null)
					{
						listboxitem_label = valueListData[i][1].getData();
					}
					else
					{
						wcs.serviceability.logger.log(Level.WARNING, LOG_CATEGORY, id + " - No data was returned for the display attribute. Using the key value in its place.", "Check that the displayattribute property was specified in the control properties.");
						listboxitem_label = listboxitem_keyvalue;
					}

					String[] bidiTagAttributes = {"","",""};
					if(BidiUtils.isBidiEnabled())
					{
						bidiTagAttributes = BidiClientUtils.getTagAttributes(component,app,listboxitem_label,false);
						bidiTagAttributes[0] += "style='" + BidiClientUtils.getTextAlignmentStyle(WebClientRuntime.getMXSession(session)) + "' ";
					}

					if(Integer.toString(i).equals(keyvalue) || keyvalue.equalsIgnoreCase(listboxitem_keyvalue))
					{
						wcs.serviceability.logger.log(Level.INFO, LOG_CATEGORY, id + " - item with keyvalue='" + keyvalue + "' being marked as selected");
						selected = true;
					}

					if(isNational)
					{
						try
						{
							date = MXFormat.stringToDateTime(listboxitem_label, userLocale);
							if(date != null)
							{
								isDate = true;
%>							<script>
								dojo.require('<%=dojoPackage%>');
								dojo.require('<%=dojoPackage%>.locale');		
								dojo.requireLocalization('dojo.cldr', '<%=userCalendar%>','<%=usrLocale%>','ROOT');
							</script>
<%								dojoDatePattern = "constraints=\"{";
								dojoDatePattern += "datePattern:'" + MXFormat.getDatePattern(userLocale) + "', timePattern:'" + MXFormat.getDisplayTimePattern(userLocale) + "'";
								dojoDatePattern +=",locale:'" + usrLocale + "'}\"";
								dojoTypeInput = dojoTypeInput + " " + dojoDatePattern;
								dojoTypeInput = dojoTypeInput + " " + datePackage + " " +dojoLang;
							}
						}
						catch(Exception e)
						{
							isDate = false;
							dojoTypeInput = "";
						}
					}
					String titleValue = title + titleSep + WebClientRuntime.makesafevalue(listboxitem_label);

					String listboxitemAutoId = "";
					String itemnameAutoId = "";
					if(automation)
					{
						listboxitemAutoId = "automationid=\"" + realId + "_listboxitem_" + i + "\"";
						itemnameAutoId = "automationid=\"" + realId + "_" + i + "\"";
					}
%>					<li id="<%=id%>_listboxitem_<%=i%>" <%=listboxitemAutoId%> class="text<%=selected?" selected":""%>"<%
							%>>
						<a id="<%=id%>_<%=i%>_itemname" <%=itemnameAutoId%> tabindex="<%=isReadOnly||(anySelected&&!selected)?-1:0%>" role="option"<%
								if(isReadOnly || selected)
								{
									if(isReadOnly)
									{
										%> disabled="true"<%
										%> aria-disabled="true"<%
									}
									if(selected)
									{
										%> aria-selected="true"<%
									}
									%> href="javascript:"<%
								}
								else
								{
									%> href="javascript:sendEvent('setvalue','<%=control.getId()%>','<%=WebClientRuntime.makesafevalue(WebClientRuntime.makesafejavascriptstringparameter(listboxitem_keyvalue))%>');"<%
								}
								%> onfocus="setCurrentfocusId(event,this);"<%
								%> onclick="if(event.altKey || event.shiftKey || event.ctrlKey) { cancelEvent(event); return false;}"<%
								%> onkeydown="listboxKey(event,this);"<%
								%> <%=bidiTagAttributes[0]%><%
								if(isDate && isNational)
								{
									%> dojovalue='<%=date.getTime()%>'<%
								} %> <%=dojoTypeInput%>>
<%						if(!isDate || !isNational)
						{
							%><%=WebClientRuntime.makesafevalue(listboxitem_label)%><%
						}
%>						</a>
<%						if(isDate && isNational)
						{
%>						<script>
							dojo.addOnLoad(function() {formatCalendarLabel('<%=id%>_<%=i%>_itemname');});
						</script>
<%						}
%>					</li>
<%				}
			}
			else
			{
				%><%=BoundComponentInstance.INVALID_BINDING%><script>dojo.addClass('<%=id%>', 'iu');</script><%
			}
		}//if !designmode
%></ul><%
	//when the control is not set to refreshonreloadevent=false, the call will only come here if the control has changed.
	//So make sure the control is not to be changed again unless done explicitly.
	listControl.setChangedFlag(false);
}
%><%@ include file="../common/componentfooter.jsp" %>
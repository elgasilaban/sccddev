<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="org.w3c.dom.Element"
%><%@page import="psdi.mbo.MaxMessage"
%><%@page import="psdi.security.UserInfo"
%><%@page import="psdi.util.MXFormat"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.webclient.components.Image"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.controller.LabelCache"
%><%@page import="psdi.webclient.system.controller.LabelCacheMgr"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%@include file="../common/constants.jsp"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String id = component.getRenderId();
	String controlType = control.getType();
	Alignment alignment = wcs.getAlignment();
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	boolean accessibilityMode = wcs.getAccessibilityMode();
	boolean designmode = wcs.getDesignmode();
	UserInfo userInfo = wcs.getUserInfo();
	String langcode = userInfo.getLangCode();
	PageInstance currentPage = control.getPage();
	AppInstance app = currentPage.getAppInstance();
	String IMAGE_PATH = wcs.getImageURL();
	boolean componentVisible = component.isVisible();
	String componentValue = null;
	String textcss = component.getProperty("textcss");
	String cssclass = component.getCssClass();
	String tabindex = "0";
	String UAGENT = wcs.getUserAgentName();
	String USERAGENT = wcs.getUserAgentReplacement();
	String BROWSER_KEYWORD = "#{BROWSER}";
	
	boolean defaultRender = component.isDefaultRender();
	if(defaultRender)
	{
		%><%@ include file="../common/componentholder_begin.jsp" %><%
	}
	//TODO - BVR - MOVE MORE OF THIS INTO AN IMAGE.JAVA component initialize and render
	String src = component.getProperty("src");
	String dataattribute = component.getProperty("dataattribute");
	if(!WebClientRuntime.isNull(dataattribute) && control.getType().equals("image") && WebClientRuntime.isNull(control.getProperty("sigoption")))
	{
		src = ((BoundComponentInstance)component).getString();
	}
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String designerEnabled = component.getProperty("designerenabled");
	String ariaHidden = component.getProperty("ariahidden");
	boolean lookupChanged = false;
	String menutype = component.getMenuType();
	String lookup = component.getLookupName();
	String tooltip = component.getProperty("tooltip");
	String linkedcomponent = component.getProperty("linkedcomponent");
	boolean useOriginalId = component.getProperty("useoriginalid").equals("true");
	String ariaRole = "";
	if(useOriginalId)
	{
		id = component.getId();
	}
	ComponentInstance linkedComp = null;
	if(!WebClientRuntime.isNull(linkedcomponent))
	{
		linkedComp = currentPage.getComponentInstance(linkedcomponent);
		if(linkedComp != null)
		{
			linkedcomponent = linkedComp.getRenderId();
		}
	}
	String longdesc = component.getProperty("longdesc");
	String align = component.getProperty("align");
	//IBMBIDI Start
	//Fix for Static Aligns
	if(alignment.rtl)
	{
		align = alignment.reverse(align);
	}
	//IBMBIDI End
	ComponentInstance textbox = control.getComponent(id.replace("button", "textarea"));
	String padding = "";
	if (textbox != null)
	{
		String scale = textbox.getProperty("rowscale");
		if(!WebClientRuntime.isNull(scale))
		{
			align = "top";
		}
	}
	boolean comboBox = (controlType.indexOf("combobox") != -1 || control instanceof psdi.webclient.controls.Combobox);
	if(!WebClientRuntime.isNull(align))
	{
		if(align.equals("absmiddle") && !UAGENT.equals("IE") && comboBox)
		{
			align = "top";
		}
		align = "align=\""+align+"\"";
	}
	String margin = component.getProperty("margin");
	String display = component.getProperty("display");
	String cursor = "";
	String border = component.getProperty("border");
	String messageGroup = component.getProperty("msggroup");
	String msgLookup = component.getProperty("msg");
	String titlePrepend = component.getProperty("titleprepend");
	String titleAppend = component.getProperty("titleappend");
	String msgGroup = "";
	String msgKey = "";
	String msg = "";
	BoundComponentInstance boundComponent = null;
	String onfilterrow = component.getProperty("onfilterrow");
	String maskedTitle = "";
	boolean isMasked = false;
	boolean isReadonly = false;
	String inputmode = component.getProperty("inputmode").toLowerCase();
	String active = "";
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		isMasked = boundComponent.isMasked();
		isReadonly = boundComponent.isReadOnly();
	}
	String intType= component.getProperty("inttype");
	int dataType = -1;
	if(!WebClientRuntime.isNull(intType))
	{
		dataType=Integer.parseInt(intType);
	}

	msgKey = component.getProperty("msgkey");

	String parentType = "";
	String show = component.getProperty("show");
	if(isMasked)
	{
		show = "false";
	}
	parentType = controlType;
	boolean detailbutton = false;
	String eventValue = component.getProperty("eventvalue");;//set this to send a value along with the click event

	boolean setsFocus = Boolean.valueOf(component.getProperty("setsfocus")).booleanValue();
	String cancelClickBubble = "";
	if(component.isOnTableRow())
	{
		cancelClickBubble = " cancelEvent(event); ";
	}

	boolean isLdOwner = boundComponent != null && boundComponent.getProperty(BoundComponentInstance.HAS_LONG_DESCRIPTION).equalsIgnoreCase("true");

	if(messageGroup.equals(""))
	{
		messageGroup = "jspmessages";
	}

	if(!lookup.equalsIgnoreCase("NONE"))
	{
		if((lookup.equalsIgnoreCase("longdesc") || lookup.equalsIgnoreCase("")) 
				&& (isLdOwner && (WebClientRuntime.isNull(longdesc) || (longdesc != null && longdesc.equalsIgnoreCase("true")))))
		{
			if(inputmode.equalsIgnoreCase("query"))
			{
				active="active=\"0\"";
			}
			else
			{
				boolean hasLD = boundComponent.hasLongDescription();
				longdesc="_off";
				if(hasLD)
				{
					longdesc="_on";
				}
				msg = wcs.getMaxMessage(messageGroup, "longDescriptionButton").getMessage();
				src = "img_longdescription" + longdesc + "";
				component.setProperty("mxevent", "longdesc_dialog");
				detailbutton = true;
				if(!accessibilityMode)
				{
					tabindex = "-1";
				}
			}
		}
		else if(!lookup.equalsIgnoreCase("longdesc"))
		{
			if(dataType == FIELD_TYPE_TIME)
			{
				lookup = "timelookup";
			}
			if(!lookup.equals("") || !menutype.equals(""))
			{
				detailbutton = true;
				if(menutype.equals(""))
				{
					msgKey = null;
					if(dataType == FIELD_TYPE_DATE || (dataType != FIELD_TYPE_DATETIME && lookup.equalsIgnoreCase("datelookup")))
					{
						msgKey = "selectDateButton";
						src = "img_date";
					}
					else if(dataType == FIELD_TYPE_DATETIME || lookup.equalsIgnoreCase("datetimelookup"))
					{
						msgKey = "selectDateTimeButton";
						src = "img_date_time";
					}
					else if(dataType == FIELD_TYPE_TIME)
					{
						msgKey = "selectDateTimeButton";
						src = "img_time";
					}
					else if(lookup.equalsIgnoreCase("date_selector"))
					{
						msgKey = "selectDateFrequenctPattern";
						src = "img_date_time";
					}
					else
					{
						msgKey = "selectValueButton";
						src = "img_lookup";
					}
					if(msgKey != null)
					{
						MaxMessage message = wcs.getMaxMessage(messageGroup, msgKey);
						if(message != null)
						{
							msg = message.getMessage();
						}
					}
					component.setProperty("mxevent", "selectvalue");
					eventValue = lookup;
				}
				else
				{
					//ControlInstance menu = wcs.getControlInstance(menutype);
					src = "img_menu";
					Element menuElement = WebClientRuntime.getWebClientRuntime().getLibraryDescriptor("menus",wcs).getDialog(menutype,wcs);
					if(menuElement != null)
					{
						String elementId = menuElement.getAttribute("id");
						LabelCache syscache = LabelCacheMgr.getSystemLabelCache(wcs);
						msg = syscache.getString(elementId, "label");
						if (msg == null)
						{
							msg = menuElement.getAttribute("label");
						}

						String menuIm = menuElement.getAttribute("image");
						if(!WebClientRuntime.isNull(menuIm))
						{
							src = menuIm;
						}
					}

					if(WebClientRuntime.isNull(msg))
					{
						MaxMessage message = wcs.getMaxMessage(messageGroup, "showmenu");
						if(message != null)
						{
							msg = message.getMessage();
						}
					}
					String compIm = component.getProperty("detailimage");
					if(!WebClientRuntime.isNull(compIm))
					{
						src = compIm;
					}
					component.setProperty("mxevent","showmenu");
				}
				margin = "0";
				detailbutton = true;
				if(!accessibilityMode)
				{
					tabindex="-1";
				}
			}
		}
	}
	String imageType = "";

	if(!messageGroup.equals("") && !msgKey.equals("") && msg.equals(""))
	{
		MaxMessage message = wcs.getMaxMessage(messageGroup, msgKey);
		if(message!=null)
		{
			msg = message.getMessage();
		}
	}

	if(!tooltip.equals(""))
	{
		msg = tooltip;
	}

	if(msg.indexOf("{0}") > -1 && component instanceof BoundComponentInstance)
	{
		component.setProperty("alwaysinclude", "true");
		msg = msg.replace("{0}", ((BoundComponentInstance)component).getString());
	}

	String mxevent = component.getProperty("mxevent");

	if (!width.equals(""))
	{
		width = "width=\"" + width + "\"";
	}

	if (!height.equals(""))
	{
		height = "height=\"" + height + "\"";
	}

	boolean clickable = !WebClientRuntime.isNull(mxevent);
	if(comboBox && isReadonly && "true".equals(component.getProperty("disablereadonly")))
	{
		clickable = false;
	}
	if(clickable)
	{
		if(detailbutton)
		{
			align="align=\"absmiddle\"";
			ariaRole = "aria-haspopup=\"true\"";
			if(wcs.getSkinName().equals(""))
			{
				width = "width=\"16\"";
				height = "height=\"16\"";
			}
		}
		String currentFocus = "";
		cursor = "cursor:default;";
	}
	else
	{
		tabindex = "-1";
		ariaHidden="true";
	}

	if(comboBox)
	{
		tabindex = "-1";
	}

	if(component.isOnTableRow() && !comboBox)
	{
		margin = "margin:0px;margin-top:2px;margin-" + alignment.begin + ":2px;";
	}
	else
	{
		if(margin.equals("-1"))
		{
			margin = "";
		}
		else
		{
			margin = "margin:" + margin + "px";
		}
	}

	if(src.contains(BROWSER_KEYWORD))
	{
		src = src.replace(BROWSER_KEYWORD, USERAGENT);
	}

	if (designmode && (src==null || src.equals("")) && controlType.equalsIgnoreCase("image") && !parentType.equals("dialog"))
	{
		src = "designer/image.gif";
		imageType="";
	}
	if(!show.equals("false"))
	{
		if(src!=null && !src.equals(""))
		{
			if(src.equalsIgnoreCase("blank") || !clickable)
			{
				tabindex="-1";
				if(component.getProperty("cssclass").indexOf("lookupspacer") == -1
						&& ((component.isOnTableFilterRow() && !designmode) || component.isOnTableTitleRow()))
				{
					width = "width='0px'";
				}
			}
		}
		else
		{
			tabindex = "-1";
			margin = "margin:0px;";
			src = "blank";
			if(!wcs.getSkinName().equals(""))
			{
				width = "width='26px'";
				height = "height='26px'";
			}
			if(wcs.getSkinName().equals("mobile"))
			{
				width = "width='32px'";
				height = "height='32px'";
			}
			display = "inline";
			align = "align=\"absmiddle\"";
			if(component.isOnTableRow() || component.isOnTableFilterRow())
			{
				width = "width='0px'";
			}
		}
		String onDialog = "";
		String sf = "";
		if(parentType.equals("dialog"))
		{
			onDialog = "dialog=\"1\"";
		}
		if(!cssclass.trim().equals(""))
		{
			cssclass = "class=\""+cssclass+"\"";
		}
        if(src.indexOf("blank")==0)
		{
			clickable = false;
			if(component.getProperty("iconmenu").length()>0) {
			    display = "none";
            }
		}
		if(!display.equals(""))
		{
			display = "display:"+display+";";
		}
		if(!linkedcomponent.equals(""))
		{
			linkedcomponent="lc=\""+linkedcomponent+"\"";
		}
		boolean isDate = (dataType == MXFormat.DATE || dataType == MXFormat.TIME || dataType == MXFormat.DATETIME
				|| lookup.equalsIgnoreCase("datelookup")|| lookup.equalsIgnoreCase("datetimelookup"));
		if(!eventValue.equals("") && !accessibilityMode)
		{
			eventValue = "ev=\"" + eventValue + "\"";
			if(isDate)
			{
				eventValue += " mxejse=\"dateLookupHdlr\"";
			}
		}
		if(!clickable || src.equals("blank.gif") || src.equals("blank") || accessibilityMode)
		{
			active = "active=\"0\"";
			tabindex = "NONE";
		}
		if(designerEnabled.equals("true"))
		{
			designerEnabled = "de=\"1\"";
		}
		else
		{
			designerEnabled = "";
		}
		if(setsFocus)
		{
			sf = "sf=\"1\"";
		}
		else
		{
			sf = "sf=\"0\"";
		}
		if(WebClientRuntime.isNull(src) || (src.indexOf(".gif")==-1 && src.indexOf(".jpg")==-1 && src.indexOf(".png")==-1))
		{
			imageType = ".gif";
		}
		//IBMBIDI Start
		if((src.contains("btn_help"))&&(langcode.equalsIgnoreCase("HE")))
		{
			src = "../" + src;
		}
		//IBMBIDI End
		if(ariaHidden.equals("true"))
			ariaHidden = "aria-hidden=\""+ariaHidden+"\"";
		else
			ariaHidden = "";

		if(accessibilityMode && clickable)
		{
			tabindex="-1";
		%><a id="<%=id%>"<%
				if(comboBox)
				{
					%> tabindex="-1"<%
				}
				%> title="<%=msg%>" alt="<%=msg%>" <%=linkedcomponent%> onfocus="input_onfocus(null,this);"<%
				%> href="Javascript: setClickPosition(document.getElementById('<%=id%>'),null);<%
					if(isDate)
					{
						//(function(){})(); is needed at the end so no value is returned, otherwise the browser will try to use the return value as a URL;
						%>dateLookupHdlr(dojo.byId('<%=id%>'),'click','','NONE',false);(function(){})();<% 
					}
					else
					{
						%>sendEvent('click','<%=id%>','<%=eventValue%>');<%
					}
					%>"><%
		}
		if(control.getType().equals("image"))
		{
			%><%@ include file="../common/uistatusindicator.jsp" %><%
		}
		%><img <%=sf%> <%=ariaHidden%> <%=active%> ctype="image" alt="<%=msg%>"<%
				%> <%=designerEnabled%> src="<%=IMAGE_PATH%><%=src%><%=imageType%>" source="<%=src%>" imgtype="<%=imageType%>"<%
				%> style="<%=padding%><%=cursor%><%=display%><%=margin%>" border="0" <%=onDialog%> <%=linkedcomponent%><%
				%> <%=ariaRole%> <%=cssclass%> <%=align%> <%=width%> <%=height%> <%=eventValue%><%
				if(wcs.isAutomationOn())
				{
					%> automationid="<%=component.getId()%>"<%
				}
				if(!accessibilityMode)
				{
					%> id="<%=id%>"<%
				}
				if(!tabindex.equals("NONE"))
				{
					%> tabindex="<%=tabindex%>"<%
				}
				if(!accessibilityMode || component.isOnTableRow())
				{
					%> title="<%=msg%>"<%
				}
				%>/><%
		if(accessibilityMode && clickable)
		{
		%></a><%
		}
		if(WebClientRuntime.is7504FPEnabled()) {
		%><%@ include file="image_ex.jsp" %><% 
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
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
--%><%@ include file="../common/componentheader.jsp" %><%
	boolean defaultButton=component.getProperty("default").equalsIgnoreCase("true");
	cssclass = textcss+" pb";

	String width = "";
	if(!(component.getProperty("width").equals("")) )
		width = "width:"+component.getProperty("width");
	if(defaultButton)
		cssclass +=" default";
	String text = component.getProperty("label");
	String btn_img = component.getProperty("image");
	String inner_img = component.getProperty("innerimage");
	boolean hasmenu = false;
	boolean disabled = component.getProperty("disabled").equalsIgnoreCase("true");
	String menuType = component.getProperty("menutype");
	String mxEventJSHandler = component.getProperty("mxeventjshandler");
	String dojoTypeInput = "";
	if(component.needsRender()) {
		String mxeJSEventHandlerPost = component.getProperty("mxeventjshandlerpost");
		if(mxeJSEventHandlerPost.length()>0) {
			app.addMXJSPostEvent(component.getId(), mxeJSEventHandlerPost);
		}
	}
	if(!"".equals(mxEventJSHandler))
	{
		if("dateLookupHdlr".equals(mxEventJSHandler))
		{
			String value="";
			dataType=MXFormat.DATETIME;
			%><%@ include file="../common/dateoptions.jsp" %><%
		}
		mxEventJSHandler=" mxejse='"+mxEventJSHandler+"' ";
	}

	hasmenu = !menuType.equals("NONE");
	String dub = "";
	if(designmode)
	{
		if (text.equals(""))
			text = control.getType();
	}
	else if(!disabled)
	{
		if(component.getProperty("doclinkuploadbutton").equals("true") )
		{
			dub="dub=\"1\"";
			currentPage.put("doclinkuploadclicktargetid", id);
		}
		else
		{
			if(hasmenu)
			{
				component.setProperty("mxevent","showmenu");
				component.setProperty("eventvalue",menuType);
			}
		}
	}

	if(text != null)
	{
		String elementType = "button";
		String src = "";
		String alt = "";
		if (btn_img != "")
		{
			elementType = "img";
			src = "src=\"" + IMAGE_PATH + btn_img + "\"";
			alt = "title=\"" + text + "\"";
			text = "";
		}
		if(inner_img.length()>0) {
			inner_img = "<img src="+IMAGE_PATH+inner_img+" class='pbi'/>";
		}
		if(designmode)
		{
			designerSelected="background: #cdcdcd;"+designerSelected;
%>			<a href='' id="<%=id%>" class="<%=cssclass%>" style="margin:3px;text-decoration:none;color:#000000" onclick='return false;'>
<%		}
		%><%@ include file="../common/uistatusindicator.jsp" %>
		<<%=elementType%> ctype="pushbutton" <%=src%> <%=alt%> <%=dub%> <%=dojoTypeInput%> <%=mxEventJSHandler%> control="true" id="<%=id%>"<%
				%> <%=automationId%> class="<%=cssclass%>" <%=componentEvents%><%
				if(designmode)
				{
					%> onclick='return false;'<%
					%> style="padding:2px;padding-bottom:0px;border:1px solid #999999;<%=designerSelected%>"<% 
				}
				else 
				{
					if(component.getProperty("doclinkuploadbutton").equals("true"))
					{
						%> onclick="setCurrentfocusFromId(null,'<%=id%>');setClickPosition(this,null);doclinkuploadbutton(null,this);"<% 
					}
					%> style="<%=width%>"<%
				}
				if(disabled)
				{
					%> disabled="disabled" aria-disabled="true" <%
				}
				%>><%
			%><%=inner_img%><%=text%><%
			if(hasmenu)
			{
				if(skin == null || skin.isEmpty())
				{
					%><img border="0" valign="middle" style="position:relative;top:2px;margin:0px" src="<%= IMAGE_PATH + "pushbtn_divider.gif" %>" alt=""/><%
				}
				%><img border="0" tabindex="-1" align="absmiddle" style="padding:0px 2px;margin:0px" src="<%= IMAGE_PATH + "pushbtn_down.gif" %>" alt=""/><%
			}
		%></<%=elementType%>><%
		if(designmode)
		{
%>			</a>
<%		}
	}
%><%@ include file="../common/componentfooter.jsp" %>
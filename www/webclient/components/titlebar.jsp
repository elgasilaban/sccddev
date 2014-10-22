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
--%><%@ include file="../common/componentheader.jsp" %><%
	if (designmode)
	{
		return;
	}	
	boolean is7504FPEnabled=WebClientRuntime.is7504FPEnabled();
	String apptitle = "";
	String docTitle = "";
	String height = component.getProperty("height");
	String userFullName = control.getWebClientSession().getUserInfo().getDisplayName();
	try
	{
		docTitle = control.getWebClientSession().getCurrentApp().getAppTitle();
		if(control.getWebClientSession().getCurrentApp().getId().equalsIgnoreCase("startcntr"))
		{
			if (BidiUtils.isBidiEnabled())     //bidi-hcg-SC
				userFullName = BidiUtils.enforceBidiDirection(userFullName, BidiUtils.getMboTextDirection("PERSON", "DISPLAYNAME", true)); //bidi-hcg-SC
			apptitle = control.getWebClientSession().getMessage("login","welcomeusername",new String[]{userFullName});
		}
	}
	catch(Exception e)
	{
		apptitle = "";
	}
//bidi-hcg-AS start
	if(BidiUtils.isBidiEnabled())
	{
		String[] bidiTagAttributes = BidiClientUtils.getTagAttributes(null,null,apptitle,false);
		if(bidiTagAttributes[2] != null && bidiTagAttributes[2].length() > 0)
		{
			apptitle = BidiUtils.enforceBidiDirection(apptitle,bidiTagAttributes[2]);
			docTitle = BidiUtils.enforceBidiDirection(docTitle,bidiTagAttributes[2]);
		}
	}
//bidi-hcg-AS end
	if(apptitle.equals(""))
		apptitle=docTitle;

	String appimage;
	try
	{
		appimage = control.getWebClientSession().getCurrentApp().getAppImage();
	}
	catch(Exception e)
	{
		appimage = "";
	}

	String informationImage = "information.gif";
	if(appimage == null || appimage.length() == 0)
	{
		if(app.getApp().toLowerCase().equals("startcntr"))
			appimage="appimg_startcntr.gif";
		else
			appimage="appimg_generic.gif";
	}
	String classname = "bgnb";
	String bgClass = "titlebarback";
	boolean applinking = app.inAppLinkMode();
	if(applinking)
	{
		classname = "alnb";
		bgClass+="_applink";
	}
	cssclass = classname +" "+ cssclass;

	boolean thePortalMode = control.getWebClientSession().getPortalMode();
	if (thePortalMode)
	{
		appimage = "blank.gif";
		informationImage = "blank.gif";
		cssclass = "bgnbp";
		if (!applinking)
			apptitle = "";
	}
	if(component.needsRender())
	{
		boolean useHomeButton = false;
		String homeButtonProperty = component.getProperty("homebutton");
		if(!homeButtonProperty.equals("false"))
		{
			String homeButtonSysSetting = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_HOMEBUTTON,"0");
			boolean isMobile = currentPage.getAppInstance().isMobile() || wcs.getMobile(); 
			if(!isMobile && homeButtonSysSetting.equals("1") || homeButtonProperty.equals("true"))
			{
				useHomeButton = true;	
			}
		}
		boolean useGotoButton = useHomeButton;
	%><%@ include file="titlebar_ex.jsp" %>
	<td width="100%" align="<%=defaultAlign%>" class="<%=bgClass%>">
		<table width="100%" border="0" style="height: <%=height%>px" class="<%=cssclass%>" role="banner">
			<tr>
				<td style="vertical-align:top;white-space: nowrap;">
					<table cellspacing="0" cellpadding="0" role="presentation" style="height: 100%;">
						<tr>
							<%if(!accessibilityMode && !useHomeButton){%>
							<td width="35" class="applogo">
								<a id="appImageAnchor" href="javascript: sendEvent('focusfirst')"><img id="appimage" border="0" src="<%=IMAGE_PATH%><%=appimage%>" align="<%=defaultAlign%>" hspace="0" alt="<%=docTitle%>" /></a>
							</td>
							<%}%>
							<td style="white-space: nowrap">
							<%if(useHomeButton){ 
								String homeText = wcs.getMaxMessage("ui", "homelinktext").getMessage();
								String gotoText = wcs.getMaxMessage("ui", "gotoMenuText").getMessage();	%>
								<button onclick="sendEvent('changeapp','<%=app.getId()%>','startcntr')" title="<%=homeText%>" onmouseout="this.className='homebutton';" onmouseover="this.className='homebutton homebuttonhover'" onblur="this.className='homebutton';" onfocus="this.className='homebutton homebuttonhover'" class="homebutton"></button><%if(useGotoButton){%><button id="<%=id%>_gotoButton" onclick="setClickPosition(this);sendEvent('showmenu','<%=id%>_gotoButton','goto')" class="gotobutton" onmouseout="this.className='gotobutton';" onmouseover="this.className='gotobutton gotobuttonhover'" onblur="this.className='gotobutton';" onfocus="this.className='gotobutton gotobuttonhover'" title="<%=gotoText%>"></button><%} if(!wcs.getMobile()){%><img aria-hidden="true" style="margin:0px;vertical-align: bottom" src="<%=IMAGE_PATH%>ac_ban_divider.png" alt=""/><%}%>
							<%}%>
							</td>
							<td style="vertical-align:<%if(useHomeButton){%>middle<%}else{%>top<%}%>;white-space: nowrap;">
								<span id="txtappname" class="<%if(useHomeButton){%>homeButton<%}%>txtappname">&nbsp;
									<%=apptitle%>
								</span>
							</td>
						</tr>
					</table>
				</td>
		<%	if(!ismobile)
			{	%>
				<td style="vertical-align:bottom;text-align:<%=defaultAlign%>">
					<table id="titlebar_error_table" class="umtable" border="0" cellspacing="0" cellpadding="0" style="text-align:<%=defaultAlign%>" role="presentation">
						<tr>
							<td><img id="titlebar_error_image" src="<%= IMAGE_PATH%><%=informationImage%>"  style="visibility:hidden" alt=""/></td>
							<td id="titlebar_error" role="alert" class="<%=textcss%> um" style="white-space: nowrap">&nbsp;</td>
						</tr>
					</table>
				</td>
		<%	} %>
			
				<td class="titlebarlinks" align="<%=reverseAlign%>" style="text-align:<%=reverseAlign%>">
					<table role="navigation" align="<%=reverseAlign%>" style="height: 100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<span class="homeButtontxtappname userfullname" style="display:none"><%=userFullName%></span>
							</td>
		<%
	}
	component.renderChildrenControls(); //It has to be called, independent of needsrender
	if(component.needsRender())
	{	%>
						</tr>
					</table>
				</td>
				<td class="titlelogo">&nbsp;</td>
			</tr>
			<%@ include file="titlebar_ex1.jsp" %>
		</table>
	</td>
<%	}
	String serverMessage = (String)app.get("servermessage");
	if(!WebClientRuntime.isNull(serverMessage))
	{
		String serverMessageType = (String)app.get("servermessagetype");
		if(WebClientRuntime.isNull(serverMessageType))
			serverMessageType="0"; 
		if(hiddenFrame)
		{	
			%><component id="<%=id%>_holder" role="alert" <%=compType%>><%="<![CDATA["%><%	
		}	%>
		<script>
	<%	if(!RequestHandler.getWebClientProperty("alertmessages","false").equals("true"))
		{	%>
			showMessage(<%=serverMessageType%>, "<%=serverMessage%>", false);
	<% 	}
		else
		{	%>
			alert("<%=serverMessage%>");
	<%	}	%>
		</script>
	<%	if(hiddenFrame)
		{	
			%><%="]]>"%></component><%
		}
	}
	app.put("servermessage", "");
	app.put("servermessagetype", "");
%><%@ include file="../common/componentfooter.jsp" %>
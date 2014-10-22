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
--%>
<%-- This component is just included once when an app is loaded and it presents the session logout warning --%>
<!-- Begin LOST CONNECTION WARNING DIALOG -->
<%
String warnheading = wcs.getMessage("ui","msgboxtitle");
String oklbl = wcs.getMessage("messagebox","MSG_BTNOK");
boolean uiskin = !wcs.getSkin().equals("") && !wcs.getSkin().equals("classic");
%>
<div id="warnlcdiv" style="display:none" aria-hidden="true">
	<div id='warnlcdiv_inner_dialogwait' class='wait_modal'>&nbsp;</div>
	<table id="warnlcdiv_inner" positionX="" positionY="" tabindex="0" modal="true" width="400" height="200" class="dh mc modal"<%
			%> border="0" defaultbutton="" control="true" onmousedown='moveable_onmousedown(event,this);' ondragstart='return false;' style="visibility:hidden;" role="presentation">
		<tr>
			<td colspan="3">
				<img tabindex="0" alt="" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" firstbuttonid="first"/>
			</td>
		</tr>
		<tr style="" valign="top">
		<%	if(uiskin)
			{	%>
				<td valign="BOTTOM" style="width:6px;" class="opacity_80">
					<img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_shadow_head_left.gif" style="margin:0px" align="top" class="opacity_80"/>
				</td>
		<%	}
			else
			{	%>
				<td></td>
		<%	}	%>
			<td valign="BOTTOM" style="padding:0px;">
				<table width="100%" style="margin:0px;" role="presentation">
					<tr>
						<%	if (!uiskin) {	%>
						<td class="dh mh dhbl" width="6" height="25" style="padding:0px;">&nbsp;</td>
						<%	}%>
						<td class="dh mh dhb" valign="middle" align="<%=defaultAlign%>" width="*">
							<table width="100%" role="presentation">
								<tr>
									<td nowrap="nowrap" valign="middle" align="<%=defaultAlign%>" style="padding:0px;" class="dh mh">
										<table width="100%" role="presentation">
											<tr>
												<%	if (!uiskin) {	%>
												<td align="<%=defaultAlign%>" class="" valign="middle" style="padding:0px;" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;"><img sf="1" active="0" ctype="image" tabindex="-1" src="<%=IMAGE_PATH%>dialog_hdr_icon.gif" imgtype="" alt="" style="display:block;margin:0px" border="0" dialog="1" class="dh mh " align="<%=defaultAlign%>" /></div>
												</td>
												<%	}	%>
												<td align="<%=defaultAlign%>" class="" valign="middle" style="padding:0px;" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;"><h1 style="display:inline" title="<%=warnheading%>"><span align='left' ctype="label" noclick="1" targetid="mx696" class="text dh mh " style="display:block;padding-<%=defaultAlign%>:2px;padding-top:2px;;;;" title="<%=warnheading%>"><%=warnheading%></span></h1></div>
												</td>
												<td class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;">
														<div class="ts dh mh " >&nbsp;</div>
													</div>
												</td>
												<td align="<%=reverseAlign%>" class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;"><img sf="1" ctype="image" tabindex="0" src="<%=IMAGE_PATH%>blank.gif" imgtype="" alt="" style="cursor:default;display:block;margin:0px" border="0" dialog="1" align="<%=reverseAlign%>" /></div>
												</td>
												<td align="<%=reverseAlign%>" class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;"><img sf="1" active="0" ctype="image" tabindex="-1" src="<%=IMAGE_PATH%>blank.gif" imgtype="" alt="" style="display:block;margin:0px" border="0" dialog="1" align="<%=reverseAlign%>" /></div>
												</td>
												<td align="<%=reverseAlign%>" class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;"><img sf="1" ctype="image" tabindex="0" src="<%=IMAGE_PATH%>blank.gif" imgtype="" alt="" style="cursor:default;display:block;margin:0px" border="0" dialog="1" align="<%=reverseAlign%>" /></div>
												</td>
												<td align="<%=reverseAlign%>" class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc dhbsh" style="display:inline;"><img sf="1" active="0" ctype="image" tabindex="-1" src="<%=IMAGE_PATH%>blank.gif" imgtype="" alt="" style="display:block;margin:0px" border="0" dialog="1" align="<%=reverseAlign%>" /></div>
												</td>
												<%	if (!uiskin) {	%>
												<td align="<%=reverseAlign%>" class="" valign="middle" style="padding:0px;" width="100%" nowrap="nowrap">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;"><img tabindex="0" border="0" onclick="handleLostconnectionWarnDialog('close')" onkeydown="if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){handleLostconnectionWarnDialog('close');}" tabindex='0' class="" src="../webclient/images/dialogclose.gif" style="cursor:default;display:block;margin:0px" align="<%=reverseAlign%>" alt="" /></div>
												</td>
												<%	}	%>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
						<%	if (!uiskin) {	%>
						<td class="dh mh dhbr" width="6" height="25">&nbsp;</td>
						<%	}	%>
					</tr>
				</table>
			</td>
			<td valign="BOTTOM" style="width:3px" class="opacity_80">
				<img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_shadow_head.gif" style="margin:0px" align="top" class="opacity_80"/>
			</td>
		</tr>
		<tr style="" valign="top">

		<%	if (uiskin) {	%>
			<td valign="BOTTOM" style="width:6px;" class="opacity_80 dgltshad">&nbsp;</td>
		<%	}
			else
			{	%>
			<td></td>
		<%	}	%>
			<td valign="BOTTOM" style="padding:0px;">
				<table class="dialogb" role="presentation" width="100%" style="position:relative;top:0px;margin:0px;" height="100%">
					<tr>
						<td class="" style=";padding:0px;" align="">
							<table width="100%" height="*" role="presentation">
								<tr>
									<td style="height:100%;padding:10px;" align="">&nbsp;</td>
								</tr>
							</table>
							<table width="100%" height="-50px" role="presentation">
								<tr>
									<td class="db ml " style="height:100%;padding:10px;" align="">
										<div id="warnlcdiv_bodydiv">
											<table cellspacing="2" width="100%" role="presentation">
												<td align="<%=defaultAlign%>" valign="top" style="vertical-align:top;;">
													<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;">
														<h1 style="display:inline" title="">
														<span aria-live="polite" id="warnlcdiv_warnmsg" class="text ml " style="display:block;padding-<%=defaultAlign%>:2px;padding-top:2px;;;;" title=" "></span>
														</h1>
													</div>
												</td>
											</table>
										</div>
									</td>
								</tr>
							</table>
							<table width="100%" height="*" role="presentation">
								<tr>
									<td style="height:100%;padding:10px;" align="<%=reverseAlign%>">
										<table cellspacing="2" width="100%" role="presentation">
											<td colspan="7" height="0" align="<%=reverseAlign%>" style="" nowrap="nowrap">
												<table width="100%" class="buttongroup" summary="" role="presentation">
													<tr>
														<td align="<%=reverseAlign%>" nowrap="nowrap">
															<div id="warnlcdiv_okbutton" nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:none;">
																<button control="true" style="" class="text pb default" onclick="parent.handleLostconnectionWarnDialog('close')">
																&nbsp;&nbsp;<%=oklbl %>&nbsp;&nbsp; 
																</button>
															</div>
														</td>
													</tr>
												</table>
											</td>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
			<td valign="BOTTOM" style="width:3px" class="opacity_80 dgrtshad">
				&nbsp;
			</td>
		</tr>
		<tr valign="top">
			<td colspan="3" style="padding:0px;font-size:3px;vertical-align:top;" valign="top">
				<table style="margin:0px;" valign="top" width="100%" role="presentation">
					<tr height="4px" valign="top">
						<td style="font-size:1px;width:5px;padding:0px;" valign="top">
							<img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_shadow_foot.gif" style="margin:0px" align="top" class="opacity_80"/>
						</td>
						<td width="*" style="height:1px;font-size:3px;height:3px;" class="opacity_80 dgbotshad" valign="top">
							&nbsp;
						</td>
						<td style="height:1px;font-size:3px;width:4px;height:3px;" valign="top">
							<img alt="" src="<%=IMAGE_PATH%>dialogs/dialog_bottom_right_shadow.gif" style="margin:0px" align="top" class="opacity_80"/>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<img tabindex="0" alt="" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" lastbuttonid=""/>
			</td>
		</tr>
	</table>
</div>
<!-- End LOST CONNECTION WARNING DIALOG -->
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
<%-- This component is just included once when an app is loaded and it presents the session logout warning --%><%
String warnheading = wcs.getMessage("ui","msgboxtitle");
String oklbl = wcs.getMessage("messagebox","MSG_BTNOK");
boolean uiskin = !wcs.getSkin().equals("") && !wcs.getSkin().equals("classic");
%><!-- Begin WARNING DIALOG -->
<div id="warndiv" style="" aria-hidden="true" onclick="handleWarnDialog('close')"  role="alert">
	<div id='warndiv_inner_dialogwait' style="display:none" class='wait_modal'>&nbsp;</div>
	<table id="warndiv_inner" positionX="" positionY="" tabindex="0" modal="true" width="400" role="presentation" class="dsc1 dh mc modal"<%
			%> border="0" defaultbutton="" style="display: none" aria-hidden="true" >
		<tr style="" valign="top">
			<td valign="BOTTOM" style="padding:0px;" class="dh mh dhb">
				<table id="warndiv_content0" width="100%" role="presentation">
					<tr>
						<%	if (!uiskin) {	%>
						<td align="<%=defaultAlign%>" class="" valign="middle" style="padding:0px;" nowrap="nowrap">
							<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;"><img sf="1" active="0" ctype="image" tabindex="-1" src="<%=IMAGE_PATH%>dialog_hdr_icon.gif" imgtype="" alt="" style="display:block;margin:0px" border="0" dialog="1" class="dh mh " align="<%=defaultAlign%>" /></div>
						</td>
						<%	}	%>
						<td align="<%=defaultAlign%>" class="" valign="middle" style="padding:0px;" nowrap="nowrap">
							<h1 style="display:inline" title="<%=warnheading%>"><span align='left' ctype="label" noclick="1" targetid="mx696" class="text dh mh " style="display:block;padding-<%=defaultAlign%>:2px;padding-top:2px;;;;" title="<%=warnheading%>"><%=warnheading%></span></h1>
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
							<!-- <div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;"><img sf="1" onclick="handleWarnDialog('close')" onkeydown="if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){handleWarnDialog('close');}" ctype="image" tabindex="0" de="1" src="<%=IMAGE_PATH%>dialogclose.gif" imgtype="" alt="" style="cursor:default;display:block;margin:0px" border="0" dialog="1" align="right" /></div>-->
							<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;"><img tabindex="0" border="0" onclick="handleWarnDialog('close')" onkeydown="if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){handleWarnDialog('close');}" tabindex='0' class="" src="../webclient/images/dialogclose.gif" style="cursor:default;display:block;margin:0px" align="<%=reverseAlign%>" alt="" ></div>
						</td>
						<%	}	%>
					</tr>
				</table>
			</td>
		</tr>
		<tr style="" valign="top">
			<td valign="BOTTOM" style="padding:0px;">
				<table class="dialogb" width="100%" style="position:relative;top:0px;margin:0px;" height="100%" role="presentation">
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
										<div id="warndiv_bodydiv">
											<h1 style="display:inline" title="">
											<span id="warndiv_warnmsg" class="text ml " style="display:block;padding-<%=defaultAlign%>:2px;padding-top:2px;;;;" title=" " aria-live="polite">WARN MESSAGE</span>
											</h1>
										</div>
									</td>
								</tr>
							</table>
							<table width="100%" height="*" role="presentation">
								<tr>
									<td align="<%=reverseAlign%>" nowrap="nowrap">
										<div nowrap="nowrap" needsrefresh="false" vis="true" class="bc" style="display:inline;">
											<button control="true" style="" class="text pb default" onmouseover="appendClass(this,'pbo')" onmouseout="removeClass(this,'pbo')">
											&nbsp;&nbsp;<%=oklbl %>&nbsp;&nbsp;
											</button>
										</div>
									</td>
								</tr>
							</table>
							<img tabindex="0" alt="" role="button" onfocus="moveable_onfocus(this);" src="<%=IMAGE_PATH%>blank.gif" width="1" height="1" lastbuttonid="" aria-hidden="true"/>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>
<script type="text/javascript">
window.setTimeout("if(dojo.byId('warndiv_inner')){dojo.require('dojo.dnd.move');var warndivDnD = new dojo.dnd.move.constrainedMoveable(dojo.byId('warndiv_inner'),{constraints : function(){var d=dojo.byId('warndiv_inner'); return {'t':0, 'l':-1*(d.clientWidth-50)};}, within: true, skip: true, handle: dojo.byId('warndiv_content0')});}",500);
</script>
<!-- End WARNING DIALOG -->
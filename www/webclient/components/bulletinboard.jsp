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
This JSP is the handler for Bulletin Board component.
It provides the user interface for viewing bulletin board messages.
This component is used in the BulletinBoard system dialog and the BulletinBoard
portlet.

Events fired by the component:
- Referesh to check for new messages. (Except when it is inside BulletinBoard portlet)

CREATED ON: April 24, 2006
--%><%@page import="psdi.webclient.beans.startcntr.StartCenterAppBean"%><%@
include file="../common/simpleheader.jsp" %><%
BulletinBoard bbControl  = (BulletinBoard)control;
PortletStateImpl portletStateManager = bbControl.getStateManager();
String layoutId =  component.getProperty("layoutid");
boolean inbbportlet = control.getType().equals("bulletinboardportlet");
//intially when the portlet has not been loaded
//if the portlet has not been loaded ever call this.
//once its loaded we do not clear the flag
if(inbbportlet && portletStateManager.isPortletNotLoaded(component))
{
	%><%@ include file="portletloader.jsp" %><%
}
else
{
	// If we're in the start center, synchronize on the object all other portlets are using to sync against.
	DataBean appBean = bbControl.getWebClientSession().getCurrentApp().getAppBean();
	Object portletLoadingSync;
	if (appBean instanceof StartCenterAppBean)
	{
		portletLoadingSync = ((StartCenterAppBean)appBean).getPortletLoadingSync();
	}
	else
	{
		portletLoadingSync = new Object();
	}
	
	synchronized (portletLoadingSync)
	{
	Vector attributes = new Vector();
	String arrColumn[] = null;
	MboSetData data =  null;

	String sortType = "";
	String nextSort = "";
	String noLabel = MXFormat.getDisplayNoValue(wcs.getLocale());
	String yesLabel =  MXFormat.getDisplayYesValue(wcs.getLocale());//Need to be done this way for multi language-KD

	boolean filterToggled = portletStateManager.isFilterToggled();
	if(filterToggled)
	{
		bbControl.setChangedFlag(false);
	}
	boolean hasChanged = bbControl.hasChanged();
	
	//MboSetRemote bbSet = bbControl.getDataBean().getMboSet();
	// Commented this out for performance. No need for this expensive query just to get the BBSet name for BIDI. Just get it from
	// cache (see below) - Sach
	
	String bbsetName = bbControl.getBBSetName();

	//if in portlet then check its rendering like any other portlet.
	//if not in porlet then like any other component
	if((inbbportlet && (portletStateManager.wasPortletLoadCalled() || (portletStateManager.isPortletLoaded() && component.hasChanged()))
			|| (!inbbportlet && (component.needsRender() || hasChanged))))
	{
		attributes = bbControl.getResultSetAttributes();
		data       = bbControl.getRenderData();
		if(data != null)
		{
			for(int i = 0 ;i < data.getMboDataCount(); i++)
			{
				MboData mboData = data.getMboData(i); //Get Mbo data current row
				MboValueData displayData = mboData.getMboValueData("Subject");//get data to display
			}
		}
	
	String interval = component.getProperty("refreshinterval");
	
	String width = component.getProperty("width");
	String expandonlyone = component.getProperty("expandonlyone");
	String otherEvents = "onmouseout=\"return noStatus();\" "+
						"onfocus=\"return noStatus();\" "+
						"onmouseover=\"return noStatus();\" ";

	String labels[] = bbControl.getLabels();
	String containerAutomationId ="";
	String tableAutomationId ="";
	int count = 0;
	if(data!=null) {
		count = data.getMboDataCount();
	}
	if(automation)
	{
		tableAutomationId="automationid=\""+realId+"_table\"";
		containerAutomationId="automationid=\""+realId+"_container\"";
	}
	boolean hideHeadings  = !Boolean.valueOf(bbControl.isFilterOpen()) && WebClientRuntime.is7504FPEnabled(); 
	if(!inbbportlet)
	{
	%><div id="<%=id%>_container" <%=containerAutomationId%>>
<%  } 
	else
	{
		holderId="portletbody_"+layoutId;
	%><component vis="true" ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><%="<![CDATA["%>
<%  } 
	%><table role="presentation" id="<%=id%>_table" <%=tableAutomationId%> <%if(inbbportlet){%>class="plinner"<%}%> width="<%=width%>" border="0" selectedMsgIndex="-1">
<%		if(inbbportlet)
		{
%>			<tr id="heading_row_<%=layoutId%>" style="<%if(hideHeadings){%>display: none<%}%>">
<%				//display all column headings
				for(int i = 0;i < attributes.size(); i++)
				{
					arrColumn = (String[])attributes.elementAt(i);
					//check if sorting is on then send 0	%>
					<td class="<%=textcss%> khtc" nowrap>
						&nbsp;
						<span><%//<!--Venkyg : bulletinboard.jsp It is HEADING text for searching field text box -->
						out.print(arrColumn[1]);%></span>
					</td>
<%				}/*end for*/
%>			</tr>
<%			//if (data != null)
			{
			String filterRowAutoId = "";
			String filterCellsAutoId = "";
			String filterDataAutoId = "";
			String bidiAttributes = "";
			String textAlign = "";
			if(automation)
			{
				filterRowAutoId="automationid=\"filter_row_"+layoutId+"\"";
				filterCellsAutoId="automationid=\"filter_cells_"+layoutId+"\"";
				filterDataAutoId="automationid=\"filter_dataspan_"+layoutId+"\"";
			}
%>			<tr id="filter_row_<%=layoutId%>" <%=filterRowAutoId%> class="<%=textcss%> rstfc" style="<%if(hideHeadings){%>display: none<%}%>">
<%			String inputAutoId="";
				//display all column headings
				for(int i = 0;i < attributes.size(); i++)
				{
					arrColumn = (String[])attributes.elementAt(i);	%>
					<td id="filter_cells_<%=layoutId%>_<%=i%>" <%=filterCellsAutoId%> class="rsfco">
						<span id="filter_dataspan_<%=layoutId%>_<%=i%>" <%=filterDataAutoId%>>
<%							if(arrColumn[0].indexOf(".") == -1)
							{
								if(automation) 
								{
									inputAutoId="automationid=\""+arrColumn[0]+"_"+layoutId+"\"";
								}
								String val = arrColumn[0].equals("viewstatus") && bbControl.getIsViewedValue().equals("No")?     //bidi-hcg-SC start
								bbControl.getIsViewedValue() : bbControl.getQbeSetting(arrColumn[0]);
								if (BidiUtils.isBidiEnabled())
								{
									bidiAttributes = BidiUtils.buildTagAttribute(val, BidiUtils.getMboTextDirection(bbsetName,arrColumn[0],true),"", true);
									textAlign = " style='" + BidiClientUtils.getTextAlignmentStyle("",langcode) + "' ";
								}

								if(arrColumn[0].equals("viewstatus") && bbControl.getIsViewedValue().equals("No"))
								{
%>									<input
										id="<%= arrColumn[0] %>@<%=layoutId%>"
										<%=inputAutoId%>
										<%=bidiAttributes%>
										<%=textAlign%>
										type="text"
										onblur="rsportlet_filterActivate(this,false)"
										onfocus="rsportlet_filterActivate(this,true);setCurrentfocusId(event, this);"
										onkeypress="rsportlet_onkeypress(event,'<%=id%>',this.id)"
										onchange="rsportlet_onchange(event,this,this.id,'<%=bbControl.getId()%>')";
										onkeydown="input_keydown(event,this)"
										onmouseup="rsportlet_onmouseup(this)"
										class="<%=textcss%> ib"
										name="filter_<%= arrColumn[0] %>_<%=layoutId%>"
										value="<%= val %>"
										tabindex="0"
										title="<%= arrColumn[1] %>"
										size="5"
										maxlength="254"/>
<%									bbControl.setIsViewedValue("");
								}
								else
								{
%>									<input
										id="<%= arrColumn[0] %>@<%=layoutId%>"
										<%=inputAutoId%>
										<%=bidiAttributes%>
										<%=textAlign%>
										type="text"
										onblur="rsportlet_filterActivate(this,false)"
										onfocus="rsportlet_filterActivate(this,true);setCurrentfocusId(event, this);"
										onkeypress="rsportlet_onkeypress(event,'<%=id%>',this.id)"
										onchange="rsportlet_onchange(event,this,this.id,'<%=bbControl.getId()%>')";
										onkeydown="input_keydown(event,this)"
										onmouseup="rsportlet_onmouseup(this)"
										class="<%=textcss%> ib"
										name="filter_<%= arrColumn[0] %>_<%=layoutId%>"
										value="<%=val %>"
										tabindex="0"
										title="<%= arrColumn[1] %>"
										size="5"
										maxlength="254"/>
<%								}
							}
%>						</span>
					</td>
<%				}/*end for*/
%>			</tr>
<% 		}//end if <!--Venkyg : End -- It is TEXT box for searching field text box -->
	}//if inside bulletinboardportlet
		if(inbbportlet)
		{
%>			<tr><td width="2px" colspan="5" height="2px"></td></tr><%
		}
		if(data != null)
		{
			for(int i = 0 ;i < data.getMboDataCount(); i++)
			{
				MboData mboData = data.getMboData(i); //Get Mbo data current row
				long uniqueId = mboData.getMboValueData("bulletinboarduid").getDataAsLong();
				String bbUniqueId = (new Long(uniqueId)).toString();

				String style = textcss+" bbmlc";
				String message = "";
%>				<tr>
<%					for(int j = 0;j < attributes.size(); j++)
					{
						arrColumn = (String[])attributes.elementAt(j);//get column details

						MboValueData displayData = mboData.getMboValueData(arrColumn[0]);//get data to display
						message = mboData.getMboValueData("message").getData();
						if (message != null)
							message = RichText.cleanValue(message, false, false);

						if(inbbportlet && arrColumn[0].equals("viewstatus"))
						{
							String isViewed = "";
							List viewedMsgIdList = bbControl.getViewedMessageIdList();
							if(viewedMsgIdList.contains(bbUniqueId))
								isViewed = yesLabel;
							else
								isViewed = noLabel;	%>
							<td width="5%" align="<%=defaultAlign%>" nowrap valign="top">
								<span class="bbm" style="<%= style %>"><%=isViewed%></span>
							 </td>
<%						}
						else if(arrColumn[0].equals("subject"))
						{
							String subject = displayData.getData();
							String shortsub = WebClientRuntime.shortenString(subject,35);
							String linkTitle = WebClientRuntime.makesafevalue(displayData.getData());

							if (BidiUtils.isBidiEnabled()) 
							{
								subject = BidiUtils.enforceBidiDirection(subject, BidiUtils.getMboTextDirection(bbsetName,"subject",true));
								shortsub = BidiUtils.enforceBidiDirection(shortsub, BidiUtils.getMboTextDirection(bbsetName,"subject",true));
								linkTitle = BidiUtils.enforceBidiDirection(linkTitle, BidiUtils.getMboTextDirection(bbsetName,"subject",true));
							}
							String bbmsglinkAutoId="";
							String bbshortsubAutoId="";
							String bbfullsubAutoId="";
							if(automation) 
							{
								bbmsglinkAutoId="automationid=\""+id+"_bbmessagelink_"+i+"\"";
								bbshortsubAutoId="automationid=\""+id+"_bbshortsub_"+bbUniqueId+"\"";
								bbfullsubAutoId="automationid=\""+id+"_bbfullsub_"+bbUniqueId+"\"";
							}	%>
							<td width="30%" align="<%=defaultAlign%>" nowrap>
								<a tabindex="0" title="<%= linkTitle %>" id="<%=id%>_bbmessagelink_<%=i%>" <%=bbmsglinkAutoId%> class="<%=textcss%> bbmlc" <%=otherEvents %> onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {bboard_displayMessage('<%=id%>',<%=i%>,<%=expandonlyone%>,<%=bbUniqueId%>);}" href="javascript:bboard_displayMessage('<%=id%>',<%=i%>,<%=expandonlyone%>,<%=bbUniqueId%>)">
									<span id="<%=id%>_bbshortsub_<%=bbUniqueId%>" <%=bbshortsubAutoId%> style="display:inline;padding-<%=defaultAlign%>:5px;padding-<%=reverseAlign%>:3px">&gt;&gt;&nbsp;<%=shortsub %></span>
									<span id="<%=id%>_bbfullsub_<%=bbUniqueId%>" <%=bbfullsubAutoId%> style="display:none;padding-<%=defaultAlign%>:5px;padding-<%=reverseAlign%>:3px">&gt;&gt;&nbsp;<%=subject %></span>
								</a>
							 </td>
<%						}
						else if(inbbportlet && arrColumn[0].equals("message"))
						{
							// The message for the bulletin board is an email, so we need to strip the html.
							String msge = RichText.toPlainText(displayData.getData(), true);
							String shortmsg = WebClientRuntime.shortenString(msge,40);

							if (BidiUtils.isBidiEnabled())
							{
								shortmsg = BidiUtils.enforceBidiDirection(shortmsg, BidiUtils.getMboTextDirection(bbsetName,"message",true));
							}

							String bbmsgAutoId="";
							if(automation)
							{
								bbmsgAutoId="automationid=\""+id+"_bbmsg_"+bbUniqueId+"\"";
							}
%>							<td width="30%" align="<%=defaultAlign%>" nowrap>
								<span id="<%=id%>_bbmsg_<%=bbUniqueId%>" <%=bbmsgAutoId%> class="bbm" style=" <%= style %> display:inline"><%=shortmsg %></span>
							</td>
<%						}
						else
						{
							if((!inbbportlet && arrColumn[0].equals("postdate")) || inbbportlet)
							{
								String psDate = "";
								try
								{
									Date pDate = psdi.util.MXFormat.stringToDateTime(displayData.getData(),s.getUserInfo().getLocale());
									psDate = psdi.util.MXNFormat.dateTimeToString(pDate,s.getUserInfo().getICULocale());
								}
								catch(Exception e)
								{
									psDate = displayData.getData();
								}	%>
								<td width="18%" align="<%=defaultAlign%>" nowrap>
									<span class="bbm" style="<%= style %>" title="<%= arrColumn[1] + " : " + psDate %>"><%= psDate %></span>
								 </td>
<%							}
						}//end viewstatus if
					}//end attributes for
%>				</tr>
				<tr>
					<td <%if(inbbportlet) out.println("colspan=\"5\""); else out.println("colspan=\"3\"");%>>
<%						String bbmsgmainAutoId="";
						String bbmessageAutoId="";
						if(automation) 
						{
							bbmsgmainAutoId="automationid=\""+id+"_bbmessagemain_"+i+"\"";
							bbmessageAutoId="automationid=\""+id+"_bbmessage\"";
						}
%>						<div id="<%=id%>_bbmessagemain_<%=i%>" <%=bbmsgmainAutoId%> style="display:none;overflow:visible">
							<table role="presentation" border="0" >
								<tr>
									<td class="bbmbs">&nbsp;&nbsp;</td>
									<td>
										<div tabindex="0" title="<%= RichText.toPlainText(message, true) %>" class="bbm <%=cssclass%>" id='<%=id%>_bbmessage' <%=bbmessageAutoId%>>
											<%= message %>
										</div>
									</td>
								<tr>
							</table>
						</div>
					</td>
				</tr>
<%				/* End message details */
				if(i != data.getMboDataCount()-1)
				{
%>					<tr><td colspan="5" class="bbmsd"></td></tr><%
				}
			}//end getMboDataCount for
		}//end data if

		if(data == null || count==0)
		{
			if(inbbportlet)
			{	%>
				<tr class="<%=textcss%> pnc"><td colspan="6" title="<%=labels[0] %>"><center><%=labels[0] %></center></td></tr>
<%			}
			else
			{
%>				<tr class="<%=textcss%> pnc"><td colspan="3" title="<%=labels[0] %>"><center><%=labels[0] %></center></td></tr><%
			}
		}	%>
		</table>
<%		if(inbbportlet) 
		{ 
			portletStateManager.setStateLoaded();

			if( bbControl.hasChanged())
			{
				bbControl.setChangedFlag(false);
			}
			
%>	<script>finishPortlet("<%=layoutId%>");</script><%="]]>"%></component>
<%		}
		else
		{
%>		</div>
<%	 	} 
	}//if needsrender or refresh
	if((inbbportlet && portletStateManager.isPortletLoaded() && component.hasChanged())
				|| (!inbbportlet && hasChanged))
	{
		//works for both refresh and sort
	%><component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
			new_outer = document.getElementById("<%=id%>_container");
			old_outer = document.getElementById("<%=id%>_container");
			old_outer.innerHTML=new_outer.innerHTML;
	</script><%="]]>"%></component>
	<%
		bbControl.resetflags();
	}//if refreshed

	if(filterToggled)
	{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
		<script>
			hideShowElement("filter_row_<%=layoutId%>",(dojo.byId("filter_row_<%=layoutId%>").style.display=='none'));
			hideShowElement("heading_row_<%=layoutId%>",(dojo.byId("heading_row_<%=layoutId%>").style.display=='none'));
		</script>
	<%="]]>"%></component>
<%	portletStateManager.setFilterToggled(false);
	}
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
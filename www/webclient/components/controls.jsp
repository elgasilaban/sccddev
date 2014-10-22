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
{
	boolean border = false;

	int sectionColCount = Integer.parseInt(component.getProperty("colcount"));
	boolean isPalleteLabelsOn = Boolean.valueOf(component.getProperty("displaylabels")).booleanValue();

	String sectioncolWidth = Integer.toString(100/sectionColCount) + "%";

	String DESIGNER_IMAGE_PATH = "../webclient/images/designer/";

	int x = 0;
	String[] cols = {"control", "objectname", "description"};

	MboSetData msd = wcs.getDataBean(control.getProperty("datasrc")).getMboSetData(0, 200, cols);
	MboData[] md = msd.getMboData();
	String show = wcs.getMaxMessage("designer", "show").getMessage();
	String hide = wcs.getMaxMessage("designer", "hide").getMessage();
	String labels = wcs.getMaxMessage("designer", "labels").getMessage();
	//should these radio buttons be components in the registry entry of "controls"?
%>	<td>
		<div class="controls" id="<%=id%>controls<%=sectionColCount%>" height="100%" width="100%" tabindex="0">
			<table role="presenation" width="100%" border="0">
				<tr>
					<td align="<%=defaultAlign%>" style="font-size:xx-small;white-space: nowrap;">
						<%=labels%>
						<input type="radio" name="labelsradio" <% if(!isPalleteLabelsOn) out.print("value=\"no\""); else out.print("value=\"yes\" checked");%> style="border:0px" onclick='var coll = getElementsByName("controllabel");for(i=0;i<coll.length;i++){if (coll[i].style){coll[i].style.display="inline";}};sendEvent("setcontrollablestate", "designer");'/><%=show%>
						<input type="radio" name="labelsradio" <% if(isPalleteLabelsOn) out.print("value=\"no\""); else out.print("value=\"yes\" checked");%> style="border:0px" onclick='var coll = getElementsByName("controllabel");for(i=0;i<coll.length;i++){if (coll[i].style){coll[i].style.display="none";}};sendEvent("setcontrollablestate", "designer");'/><%=hide%>
						<hr style="height:1px;">
					</td>
				</tr>
			</table>

			<table role="presenation" width="100%" border="0">
				<tr>
<%				while (x < md.length)
				{
					int y = 0;
					while (y < sectionColCount)
					{
						if(md[x].isFlagSet(MboConstants.HIDDEN)) {
							x++;
							continue;
						}
						String itemctrl = md[x].getMboValueData(cols[0]).getData();
						String itemobj = md[x].getMboValueData(cols[1]).getData();
						String itemdesc = md[x].getMboValueData(cols[2]).getData();	%>
							<td title="<%=itemctrl%>">
							<div  id="designer_ctrl_<%= itemctrl %>" class="tpnosel" controltype="<%= itemctrl %>" controlid="<%= itemctrl %>" tabindex="0"
								onmousedown="controls_onmousedown(event,this)"
								onmouseup="controls_onmouseup(event,this)"
								onmouseover="controls_onmouseover(event,this)"
								onmouseout="controls_onmouseout(event,this)"

								ondragstart='cancelevent()';
								ondragenter='cancelevent()';
								ondragover='cancelevent()';
								ondragleave='cancelevent()';
								ondrop='cancelevent()';

								style="font-size:9px;">
								<center><span><img src="<%= DESIGNER_IMAGE_PATH + itemctrl.toLowerCase() + ".gif" %>" align="middle" alt="<%= itemctrl %>"/><br><span name="controllabel" id="controllabel" style="display:<% if (isPalleteLabelsOn) out.print("inline"); else out.print("none"); %>"><%=itemdesc%></span></span></center>
							</div>
							</td>
<%						y++;
						x++;
						if (x == md.length)
						{
%>							<td colspan="<%= sectionColCount - y %>">
							</td>
<%						break;
						}
					}
%>					</tr>
					<tr>
<%				}
%>				</tr>
			</table>
		</div>
	</td>
<%}
%><%@ include file="../common/componentfooter.jsp" %>
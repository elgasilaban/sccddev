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
This JSP is the handler for popup component.

CREATED ON: Feb 2, 2007
--%>
<%@ include file="../common/simpleheader.jsp" %><%

String popme = (String)currentPage.get("popme");

if( !WebClientRuntime.isNull(popme) && popme.equals("true") )
{
%>
	<script>
		popupNode = getElement("<%=control.getId()%>");
		modalTopZ-=10;
        popupCount--;
		if(popupNode)
			popupNode.parentNode.removeChild(popupNode);
	</script>
<%
}
else if(component.needsRender() && WebClientRuntime.isNull((String)currentPage.get("popped")))
{
	control.setFocus();
	currentPage.put("popped", "true");
	currentPage.put("ispopup", "true");
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	wcs.killPopup(false);//clears flag
	if(!width.equals(""))
		width ="width =\""+width+"\"";

	if(!height.equals(""))
		height ="height =\""+height+"\"";
	String style= "";
	if(!USERAGENT.equals("IE"))
		style="style=\"border-spacing: 5px;border-collapse: separate\"";
%>
			<div id="<%=control.getId()%>_container">
				<div id="<%=control.getId()%>" class="p_out <%=cssclass%>" >
					<table id="popup" class="p_in" <%=width%> <%=height%> cellspacing="4" <%=style%> valign='middle' align='center' role="presentation" >
<%
						List children = component.getChildren();
						if (children!=null)
						{
							Iterator i = children.iterator();
							while (i.hasNext())
							{
								ComponentInstance child = (ComponentInstance)i.next();
								child.render();
							}
						}
%>
					</table>
				</div>
			</div>
		<script>
			showingPopup = true;
			var popup = getElementById("<%=control.getId()%>_container");
			var holder  = getElement("popupholdertd");
			holder.innerHTML = popup.innerHTML;
			setPopupPosition("<%=control.getId()%>");
			popup.innerHTML= "";
			popupCount++;
		</script>
<%
}
else
{
	List children = component.getChildren();
	if (children!=null)
	{
		Iterator i = children.iterator();
		while (i.hasNext())
		{
			ComponentInstance child = (ComponentInstance)i.next();
			child.render();
		}
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
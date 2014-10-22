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
      if(designmode)
	{%>
		<%@ include file="../common/designerevents.jsp" %>
  <%}
	String type = component.getProperty("type");
	String css = type.indexOf("body")!=-1?"db":"";
	String height = "*";
	String dialogHeight = control.getProperty("height");
	if(!WebClientRuntime.isNull(dialogHeight))
	{
		if(type.indexOf("body")!=-1)
			height=(Integer.parseInt(dialogHeight)-200)+"px";
	}
	String align = component.getProperty("align");
	//IBMBIDI Start
    //Fix for Static Aligns
    if(defaultAlign.equalsIgnoreCase("right"))
    {
    	if(align!=null){
    		if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}else{
				if(align.equalsIgnoreCase("left"))
					align = "right";
				}
		}
    }
    //IBMBIDI End
	//for buttongroups on dialogs
	if(type.equals("bottom") && WebClientRuntime.isNull("align"))
		align=reverseAlign;

	Dialog dialog = (Dialog)control;
	if (component.needsRender())
	{
%><table role="presentation" width="100%" <%if(type.equals("bottom")){%>class="dbottom"<%}%> height="<%=height%>" ondblclick="cancelEvent(event);">
	<tr>
		<td class="<%=css%> <%=cssclass%> dss" align="<%=align%>">
	<%	if(type.indexOf("body")!=-1)
		{	%>
			<div id="<%=control.getId()%>_bodydiv" class="dbDiv"  onscroll='hideAllMenusNF()'>
	<%	}
		if (type.equals("empty"))
		{
			if(component.getChildCount()>0)
			{
				component.renderChildComponents();
			}
			else
			{	%>
		&nbsp;
		<%	}
		}
		else
		{	%>
			<table role="presentation" cellspacing="2" width="100%">
			<%
			if (type.equals("body"))
			{
				if(!accessibilityMode && control.getPage().get("currentfocusid")==null)
					control.setFocus();
				dialog.renderDialogBody();
				if(!accessibilityMode)
					control.getPage().remove("focuscontainerid");
			}
			else if (type.equals("bottom"))
			{
				if(WebClientRuntime.isNull((String)control.getPage().get("defaultfocusid")))
				{
					String defaultButton = control.getProperty(psdi.webclient.controls.Pushbutton.DEFAULTBUTTON_PROPERTY);
					if(!WebClientRuntime.isNull(defaultButton))
						control.getPage().put("defaultfocusid",defaultButton);
					else
						control.setFocus();
				}
				dialog.renderDialogBottom();
			}
			else if (type.indexOf("enclosed")!=-1)
			{
				component.renderChildComponents();
			}
			%>
			</table>
			<%
		}
		if(type.indexOf("body")!=-1)
		{	%>
			</div>
	<%	}	%>
		</td>
	</tr>
</table>
<%	}
	else
	{
        if(component.hasPropertyChanged("cssclass") || component.hasPropertyChanged("height"))
        {	%>
        <component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
	        el = document.getElementById("<%=id%>");
	        if(el)
	        {
	            <%if(component.hasPropertyChanged("cssclass")){%>
	                el.className="<%=css%> <%=cssclass%>";
	            <%}if(component.hasPropertyChanged("height")){%>
	                el.style.height="<%=height%>";<%}%>
	        }
		</script>]]></component>
   <%	}
        if (type.equals("body"))
        {
            dialog.renderDialogBody();
        }
        else if (type.equals("bottom"))
        {
            dialog.renderDialogBottom();
        }
        else if (type.indexOf("enclosed")!=-1)
        {
           component.renderChildComponents();
        }
	}
%><%@ include file="../common/componentfooter.jsp" %>
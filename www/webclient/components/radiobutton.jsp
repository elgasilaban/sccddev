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
	String inputMode = component.getProperty("inputmode");
	RadioButtonGroup rbGroup = ((RadioButtonGroup)control.getParentInstance());
	String radioButtonsComponentId = rbGroup.getRadioButtonsComponentId();
	String rbComponentTrueId = rbGroup.getRadioButtonsComponentTrueId();
	ComponentInstance rbButtons = rbGroup.getComponent(rbComponentTrueId);
	String[] siblingButtons = rbGroup.getSiblingButtonComponents(id);
	if(Boolean.parseBoolean(component.getProperty("default")))
		cssclass += " default";
	String checked = component.getProperty("checked");

	boolean rbasync = async && rbGroup.isAsync();
	
	int buttonCount = rbGroup.getChildCount();
    int posInSet = rbGroup.getRenderNumber();
    rbGroup.setRenderNumber(++posInSet);
	
%><input type="radio" role="radio" tabindex="<%=rbGroup.getTabindex((psdi.webclient.controls.RadioButton)control)%>" ctype="radiobutton"<%
	%> rbsid="<%=radioButtonsComponentId%>" prevrb="<%=siblingButtons[0]%>" nextrb="<%=siblingButtons[1]%>"<%
	%> id="<%=id%>" <%=automationId%> <%=inputMode%> <%=componentEvents%> class="<%=cssclass%>"<%
	%> aria-setsize="<%=buttonCount%>" aria-posinset="<%=posInSet%>"<%
	if(inputMode.equalsIgnoreCase("readonly") && !designmode) //in designmode don't disable the control or it won't be selectable
	{
		%> aria-disabled="true" disabled="DISABLED"<%
	}
	if((checked.equalsIgnoreCase("true") || checked.equalsIgnoreCase("1")) && !designmode)
	{
		%> checked="CHECKED"<%
	}
	if (rbasync)
	{
		String mxEventJSHandler = component.getProperty("mxeventjshandler"); 
		if(mxEventJSHandler.length() != 0)
		{
			%> mxejse="<%=mxEventJSHandler%>" rbasync="1"<%
		}
	}
	if(rbButtons instanceof BoundComponentInstance)
	{
		JSONObject fieldInfo = ((BoundComponentInstance)rbButtons).getFieldInfo();
		if(fieldInfo!=null)
		{ 
			%> fldInfo='<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>'<%
		}
	}
	%>/><%
%><%@ include file="../common/componentfooter.jsp" %>
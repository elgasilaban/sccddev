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
<%@ include file="../common/componentheader.jsp" %>
<%
	String message = component.getProperty("message");
	String messageKey = component.getProperty("messagekey");
	String messageGroup = component.getProperty("messagegroup");
	String doneMessage = component.getProperty("donemessage");
	String doneMessagekey = component.getProperty("donemessagekey");
	String doneMessageGroup = component.getProperty("donemessagegroup");
	String progressImage = component.getProperty("progressimage");
	String progressDoneImage = component.getProperty("progressdoneimage");
	String longOpMessage = component.getProperty("longopmessage");
	String isfromquery = component.getProperty("isfromquery");
	int cut = -1;
	if(!WebClientRuntime.isNull(longOpMessage))
		cut=longOpMessage.indexOf("#");
	if(cut>-1)
	{
		messageGroup=longOpMessage.substring(0,cut);
		messageKey=longOpMessage.substring(cut+1);
	}
	boolean realtimeMessages = Boolean.valueOf(component.getProperty("showmessages")).booleanValue();
	String messages = "";
	String interval = component.getProperty("interval");
	if(WebClientRuntime.isNull(interval))
		interval = "4000";

	if  (isfromquery.equals("true"))
	{
             interval = "10000";
	}

	// If no explicit message specified on the control, use the default keys
	if(WebClientRuntime.isNull(message) || !WebClientRuntime.isNull(longOpMessage))
		message = wcs.getMessage(messageGroup,messageKey);

	if(WebClientRuntime.isNull(doneMessage))
	{
		if(!WebClientRuntime.isNull(doneMessagekey) && !WebClientRuntime.isNull(doneMessageGroup))
			doneMessage = wcs.getMessage(doneMessageGroup,doneMessagekey);
	}
	if(component.needsRender())
	{
		String msgAutoId="";
		String imageAutoId="";
		String msgsAutoId="";
		if(automation) {
			msgAutoId="automationid=\""+realId+"_message\"";
			imageAutoId="automationid=\""+realId+"_image\"";
			msgsAutoId="automationid=\""+realId+"_messages\"";
		}

		wcs.setLongOpComponent(component);	%>
		<table role="presentation" id="<%=id%>" <%=automationId%> class="longop <%=cssclass%>" >
			<tr>
				<td aria-live="polite" class="lom" id="<%=id%>_message" <%=msgAutoId%> nowrap>
					<img id="<%=id%>_image" <%=imageAutoId%> src="<%= IMAGE_PATH + progressImage%>" alt="" align="middle" style="align:middle;margin-<%=reverseAlign%>:20px"/>
					<%=message %>
				</td>
			</tr>
		<%	if(realtimeMessages)
			{	%>
			<tr>
				<td align="center">
					<br>
					<div aria-live="polite" id="<%= id %>_messages" <%=msgsAutoId%> class="lmb">
					</div>
				</td>
			</tr>
		<%	}	 %>
		</div>
<%		// Must not fire the check events in design mode
              Boolean cwarningclosed = (Boolean)session.getAttribute("connectionwarningclosed");
		if((!designmode) && isfromquery.equals("false"))
		{	
			 
		%>
			<script>
		        	addLoadMethod("addTimeout('dolongopcheck()',<%=Integer.parseInt(interval)%>);");
			</script>
<%		}
              if((!designmode) && isfromquery.equals("true"))
		{
		%>
			<script>
		        	addLoadMethod("addTimeout('dolongopquerycheck()',<%=Integer.parseInt(interval)%>);");
			</script>
<%		}
              session.removeAttribute("connectionwarningclosed");
	}
	else if(!designmode)
	{
		if(wcs.hasWarnings())
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			el=getElement("<%=id%>_messages");
			if(el)
			{
		<%		ArrayList messageList = wcs.getWarnings();
				// now add them to the event
				String nextMessage = "";
				for(int i=0;i<messageList.size();i++)
				{
					nextMessage = WebClientRuntime.replaceString(wcs.getMessage((MXException)messageList.get(i)),"\n\t","<br>"); %>
					oldHTML=el.innerHTML;
					el.innerHTML=oldHTML+"<%=nextMessage%><br><br>";
					el.scrollTop=el.scrollHeight;
		<%		}
				messageList.clear(); %>
			}
		</script>]]></component>
	<%	}
		if(!currentPage.getProperty("buttonsenabled").equals("true")) 
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		        addLoadMethod("addTimeout('dolongopcheck()',<%=Integer.parseInt(interval)%>);");
		</script>]]></component>	
	<%	}
	       else if((currentPage.getProperty("buttonsenabled").equals("true")) && isfromquery.equals("true"))
		{	%>
		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		        addLoadMethod("addTimeout('dolongopquerycheck()',<%=Integer.parseInt(interval)%>);");
		</script>]]></component>
	<%	}
		else
		{
			if(!WebClientRuntime.isNull(doneMessage))
			{	%>
			<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
				el=getElement("<%=id%>_message");
				if(el)
					el.innerHTML="<%=doneMessage%>";
			</script>]]></component>
		<%	}
			if(!WebClientRuntime.isNull(progressDoneImage))
			{	%>
			<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
				el=getElement("<%=id%>_image");
				if(el)
					el.src="<%=IMAGE_PATH +progressDoneImage%>";
			</script>]]></component>
		<%	}
		}		
	}	%>
<%@ include file="../common/componentfooter.jsp" %>
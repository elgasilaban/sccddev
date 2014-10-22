<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
		String height = component.getProperty("height");
		String width = component.getProperty("width");
		String value = ((BoundComponentInstance)component).getString();
		boolean invalidBinding = value == BoundComponentInstance.INVALID_BINDING;
		boolean mobileRichText = control instanceof RichTextControl && !((RichTextControl)control).isRichTextSupported();
		
		if(!invalidBinding)
		{
			value = HTML.cleanValue(value, true, Boolean.parseBoolean((String)app.get("incdata")));
		}

		if (mobileRichText)
		{
			// For a mobile application, when this text viewer is used in place of the rich text editor the
			// control will be a RichTextControl.  In that case, shrink the width and height values in
			// half so it looks better on a mobile device.

			String divHeight = Integer.toString(Integer.parseInt(height) - 4);
			String divWidth = Integer.toString(Integer.parseInt(width) - 4);
			if (width.length() != 0)
			{
				try
				{
					int widthInt = Integer.parseInt(width) / 2;
					width = Integer.toString(widthInt);
					// TODO: Magic number 4, how I hate thee. Either need to compute the value, 
					//  or change updateRichTextViewer() to set the size from the iframe content area
					divWidth = Integer.toString(widthInt - 4);
				}
				catch (NumberFormatException e)
				{
				}
			}
			if (height.length() != 0)
			{
				try 
				{
					int heightInt = Integer.parseInt(height) / 2;
					height = Integer.toString(heightInt);
					// TODO: Magic number 4, how I hate thee. Either need to compute the value, 
					//  or change updateRichTextViewer() to set the size from the iframe content area
					divHeight = Integer.toString(heightInt - 4);
				}
				catch (NumberFormatException e)
				{
				}
			}

			// Make the internal div a little smaller than the iFrame or we get unnecessary scroll bars.
			// This adds a click handler for mobile devices.  If the user clicks it, we send a special event
			// that gets handled in the RichTextViewer component. It changes the component to a text area 
			// and removes the rich text formatting so that it can be edited on a mobile device.
			if(!((BoundComponentInstance)component).isReadOnly())		
			{
				value = new StringBuilder().append("<div onclick=\"parent.sendEvent(\\'editmobiletext\\', \\'").append(id)
				.append("\\', \\'").append(id).append("\\');\" style=\"").append("width:").append(divWidth)
				.append("px;height:").append(divHeight).append("px;").append("\">")
				.append(value)
				.append("</div>").toString();
			}
		}
		if (!designmode)
		{
			//Use an iframe because of css inheritance, we don't want the view to inherit our styles
			if (component.needsRender() || mobileRichText)
			{
				// We're going to pass the value in an HTML attribute so we need to encode it.
				value = HTML.encode(value);
%>				<span class="<%=textcss%>">
					<iframe id="<%=id%>" class="fld<%=invalidBinding ? " iu" : ""%>" style="width:<%=width%>px;height:<%=height%>px;"<%
							%> frameborder="0" title="<%=component.getProperty("iframetitle")%>"<%
							%> onload="updateRichTextViewer('<%=id%>', '<%=value%>', true, <%=rtl%>);"></iframe>
				</span>
<%			}
			else
			{
%>			<script>
				updateRichTextViewer('<%=id%>', '<%=value%>', false, <%=rtl%>);
			</script>
<%			}
		}
		else
		{
			// In design mode, just put a div with the right width and height.
%>			<div id="<%=id%>" class="text ibta<%=invalidBinding ? " iu" : ""%>" style="width:<%=width%>px;height:<%=height%>px;"></div>
<%		}
%><%@ include file="../common/componentfooter.jsp" %>
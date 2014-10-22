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
--%><%--
This JSP renders the select control.
--%>
<%@ include file = "../common/componentheader.jsp" %>

<%
    if(designmode)
	{	%>
		<%@ include file = "../common/designerevents.jsp" %>
<%  } 

String width = component.getProperty("width");
String dataattribute =  component.getProperty("dataattribute");

String selectitem_keyvalue = "";
String selectitem_label = "";
String selectitem_labelClass = "";
String selectitem_class = null;
String displaystyle = null;
String readonly = "";

// In Firefox, the display:inline doesn't allow for setting the height and width which are needed for the listbox.
// Using the inline-stack and aligning it to the top is the only way to do this, unfortunately.  Firefox 3 includes
// support for the more standard "inline-block" which should be used whenever support for Firefox 2 is dropped.
if(USERAGENT.equals("IE"))
	displaystyle = "display:inline;";
else
	displaystyle = "display:inline-block;vertical-align:top;";

if(WebClientRuntime.isNull(width))
	width = "110px";
else
	width += "px";

if(WebClientRuntime.isNull(cssclass))
	cssclass = "text cbt";

if(isReadOnly)
	readonly = "disabled=\"disabled\" aria-disabled=\"true\"";

String inputMode = component.getProperty("inputmode").toLowerCase();
String keyvalue = null;
if("query".equals(inputMode))
{
	keyvalue =  control.getDataBean().getQbe(dataattribute);
}
else
{
	keyvalue =  control.getDataBean().getString(dataattribute);
}

// Note how the select contents is built always - on render as well as on refresh - because updating it
// seems rather impossible. A performance improvement in the future might want to look at setting the
// focused item on refresh to work without the need to regenerate the whole select contents

	String selectdivAutoId = "";
	if(automation)
	{
		selectdivAutoId = "automationid=\"" + realId + "_selectdiv\"";
	}
	String sendEvent = "";
	if(!isReadOnly)
	{
		sendEvent = "sendEvent('setvalue','" + id + "', this.value)";
	}
	%>
	<div id="<%= id %>_div" <%= selectdivAutoId %> class=" <%= cssclass %>" align="<%=defaultAlign%>" style="<%=displaystyle%>">
		<select id="<%= id %>" <%= componentEvents %> ctype="select" <%= readonly %> li="<%= id %>" class=" <%= cssclass %>" align="<%=defaultAlign%>" style="<%=displaystyle%>width:<%=width%>">
		<%
		
		if(!designmode)
		{
			try
			{
				Map selectItems = ((Combobox)control).getDisplayValues();
				boolean selected = false;
				if (selectItems != null)
				{
					// if there's a blank keyvalue, add it as the first option, then remove it from the map
					// we want a blank for qbe fields so you can clear it out
					if (selectItems.containsKey(Combobox.BLANK_KEY) || "query".equals(inputMode))
					{
						String selected_text = "";
						selectitem_class = "text li";
						// determine if the blank should be selected
						if(WebClientRuntime.isNull(keyvalue))
						{
							selected_text = " selected" ;
							selectitem_class += " lis";
						}
					%>
						<option id="<%= id %>_selectitem_blank" value="" class="<%= selectitem_class %>" <%= selected_text %> > </option>
					<%
						selectItems.remove(Combobox.BLANK_KEY);
					}

					int i = 0;
					Iterator it = selectItems.entrySet().iterator();
					while (it.hasNext())
					{
						// the menu options are stored as a map containing ("KEY", "TEXT", "eventvalue", "ELEMENTTYPE")
						Map.Entry item = (Map.Entry)it.next();
						selectitem_label = "";
	
						selectitem_keyvalue = (String)item.getKey();
	
						// Stay save with the value shown
						selectitem_label = WebClientRuntime.makesafevalue((String)item.getValue());

						// selected is true if current option = the value of the attribute.  selects the option in the list
						selected = false;

						selectitem_class = "text li";
						selectitem_labelClass = "lilns";

	//bidi-hcg-AS start
						String[] bidiTagAttributes = {"","",""};
						if(BidiUtils.isBidiEnabled()) {
							bidiTagAttributes = BidiClientUtils.getTagAttributes(component, app, selectitem_label, false);
	                        bidiTagAttributes[0] += "style='" + BidiClientUtils.getTextAlignmentStyle(WebClientRuntime.getMXSession(session)) + "' ";
						}
	//bidi-hcg-AS end
						if(keyvalue.equalsIgnoreCase(selectitem_keyvalue))
						{
							selected = true;
							selectitem_class += " lis";
							selectitem_labelClass = "lils";
						}
	
						String selectitemAutoId = "";
						String itemnameAutoId = "";
						if(automation)
						{
							selectitemAutoId = "automationid=\"" + realId + "_selectitem_" + i + "\"";
							itemnameAutoId = "automationid=\"" + realId + "_" + i + "\"";
						}
						
						%>
						<option id="<%= id %>_selectitem_<%= i %>" value="<%= selectitem_keyvalue %>" class="<%= selectitem_class %>" 
					<% 	if(!isReadOnly && !selected)
						{ 	%>
						onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) <%= sendEvent %>" 
					<% 	}
						else
						{ 	
							if (selected)
							{	%>
								selected
						<%	}	%>
							style="cursor:default"
					<%	}	%>>
							<%= selectitem_label %>
						</option>
				<%		
						i ++;
					}
				}
			}
			catch(Exception e)
			{
				//e.printStackTrace();
			}	
		}//if !designmode
		%>
		</select>
	</div>
	
	<%

	//when the control is not set to refreshonreloadevent=false, the call will only come here if the control has changed.
	//So make sure the control is not to be changed again unless done explicitly.
	control.setChangedFlag(false);

%><%@ include file="../common/componentfooter.jsp" %>

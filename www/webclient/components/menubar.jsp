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
--%><%@ include file="../common/componentheader.jsp" %>
<%

String label = component.getProperty("label");

if(designmode)
	label = control.getLocalizedType();

boolean writeCloseHtml = false;

// Write the table container and create the buttons when the control is rendered
if(component.needsRender())
{ 
	// Get the list of items in the menubar (menubar or appbar)
	String toolbarevent = component.getProperty("toolbarevent");
	String sourcemethod = component.getProperty("sourcemethod");

	String linkList = control.getProperty("appbarlinks");
	if (linkList==null)
	{
		linkList="";
	}

	final Object sourceObject;
	if (control.getType().equals("appbar"))
	{
		sourceObject = wcs;
	}
	else
	{
		sourceObject = app;
	}

	TreeMap searchMap = null;
	try
	{
		java.lang.reflect.Method m = sourceObject.getClass().getMethod(sourcemethod, new Class[0]);
		searchMap = (TreeMap) m.invoke(sourceObject, new Object[0]);
	}
	catch (NoSuchMethodException ex)
	{
		System.err.println("Invalid sourcemethod '" + sourcemethod + "' in class '" + sourceObject.getClass().getName() + 
			"' specified for control '" + control.getId() + "' in app '" + component.getPage().getAppInstance().getId() + "'");
%>		<div class="text iu"><%=BoundComponentInstance.INVALID_BINDING%></div>
<%		return;
	}

	// Write the html for the control if there are buttons
	if (!searchMap.isEmpty())
	{
		writeCloseHtml = true;

		if(designmode)
		{
			// in design mode set the background transparent so the green selection color shows through
			cssclass = "mbdm";
		}
		
%>	<ul class="menubar" role="toolbar">
<%
		// Only create the button children for the control once.  the control will have children if we've already done this...
		if (!control.hasChildElements())
		{
			if (linkList!="")
			{
				//parse linkList to get control properties
				String[] linkProps = linkList.split(";");
				for (int i = 0; i < linkProps.length; i++)
				{
					ControlInstance button = currentPage.createRuntimeControlInstance(id + "_button_" + i, "toolbarbutton", control);
	
					String[] linkAttrs = linkProps[i].split(",");
	
					button.setProperty("key", linkAttrs[0]);
					button.setProperty("text", linkAttrs[1]);
					button.setProperty("image", linkAttrs[2]);
					button.setProperty("buttontype", "menu");
					button.setProperty("mxevent", "changeapp"); //ToolbarButton sets it as mxevent
	
					button.setNeedsRender(true);
				}
			}
			// Create the buttons and add them as children
			String positionG = "";
			String appId = app.getId();
			String appModule = app.getAppModule();
			if(control.getType().equals("appbar"))
			{
				Iterator it = searchMap.values().iterator();
				while ( it.hasNext() )
				{
					if(control.getType().equals("appbar"))
					{
						Hashtable option = (Hashtable)it.next();
						String keyAtt = (String)option.get("KEY");
						if (keyAtt.equals(appId.toUpperCase()))
						{
							positionG = (String)option.get("POSITION");
							break;
						}

						String type = (String)option.get("ELEMENTTYPE");
						String module = (String)option.get("MODULEAPP");
						if((!module.equalsIgnoreCase(appModule)) || 
							(type.equalsIgnoreCase("MODULE")) || 
							(type.equalsIgnoreCase("HEADER")) || 
							(appId.equalsIgnoreCase(keyAtt)))
						{
							continue;
						}
					}
				}
			}

			int index = 0;
			ControlInstance headerButton = null;
			Iterator it = searchMap.values().iterator();
			while ( it.hasNext() )
			{
				Hashtable option = (Hashtable)it.next();
				String type = (String)option.get("ELEMENTTYPE");
				String position = (String)option.get("POSITION");
				if(control.getType().equals("appbar"))
				{
					if (!position.equals(positionG))
					{
						continue;
					}

					String module = (String)option.get("MODULEAPP");
					String keyAtt = (String)option.get("KEY");
					if((!module.equalsIgnoreCase(appModule)) || 
						(type.equalsIgnoreCase("MODULE")) || 
						(type.equalsIgnoreCase("HEADER")) || 
						(appId.equalsIgnoreCase(keyAtt)))
					{
						continue;
					}
				}
				ControlInstance button = currentPage.createRuntimeControlInstance(id + "_button_" + index, "toolbarbutton", control);

				boolean isHeader = false;
				if (type.equalsIgnoreCase("HEADER"))
				{
					headerButton = button;
					isHeader = true;
				}

				Iterator iterator = option.keySet().iterator();
				while(iterator.hasNext())
				{
					Object key = iterator.next();

					String keyVal = key.toString().toLowerCase();
					String optVal = option.get(key).toString();

					button.setProperty(keyVal,optVal);

					if (!isHeader && headerButton != null && keyVal.equalsIgnoreCase("key"))
					{
						headerButton.setProperty("default-option",optVal);
						headerButton = null;
					}

					button.setProperty("buttontype", "menu");
				}

				if (type.equalsIgnoreCase("HEADER"))
				{
					button.setProperty("mxevent", "showMenubarMenu"); //ToolbarButton sets it as mxevent
				}

				if (type.equalsIgnoreCase("APP"))
				{
					button.setProperty("mxevent", "changeapp"); //ToolbarButton sets it as mxevent
				}
				
				button.setNeedsRender(true);
				index++;
			} 
		}
	}	
}

/* Always send the render event to the buttons */
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

// Close the control's html if we're doing a render.
if(component.needsRender() && writeCloseHtml)
{
%>	</ul>
<%}	%><%@ include file="../common/componentfooter.jsp" %>
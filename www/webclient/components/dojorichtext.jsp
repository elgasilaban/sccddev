<%--
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-M19
 *
 * (C) COPYRIGHT IBM CORP. 2006
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
 
 // Load the built richtexteditor.js which includes everything neededin a single file.
			// Sometimes if we're loaded in the hidden frame dojo doesn't know the page has been loaded.
			// Call the function explicitly just to be sure.  If this isn't done, an error can occur while
			// initializing the rich text editor in IE.
			
			//addLoadMethod("<%=mdStr%>dojo.loaded();");
			
			
--%><%@ include file="../common/simpleheader.jsp" %>
	<%
	BoundComponentInstance boundComponent = ((BoundComponentInstance)component);
	boolean debugHiddenFrame = (debug && Boolean.valueOf(RequestHandler.getWebClientProperty("debughiddenframe","false")).booleanValue());

        boolean debug_dojo = "true".equalsIgnoreCase(WebClientRuntime.getWebClientSystemProperty("webclient.dojo.debug", "false"));

	String value = "";
	
	// The width and height values will be used to set the pixel dimensions for the editor area.
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String editor_height = height;
	if (WebClientRuntime.isNull(width))
		width = "950";
	if (WebClientRuntime.isNull(height)) {
		height = "325";
		editor_height = height;
	}
	//editor height must be less than container height for FF
	try {
	   int ht = Integer.parseInt(height);
	   ht= ht-50;
	   editor_height = Integer.toString(ht);
	} catch (NumberFormatException nme) {
		System.out.println("dojorichtext - " + nme);
	}
		
	String dojoType = control.getProperty("dojo_type");
	boolean isReadOnly = boundComponent.isReadOnly();
	
	// Set to true to use the declarative method for rendering the rich text editor.  Otherwise, it is programmatically
	// created and rendered through javascript.
	boolean declarative = false;
	
	value = WebClientRuntime.removeQuotes(boundComponent.getString());
	
	// To allow customers to configure the plugins used by the rich text editor, a property is available on the control
	// in which a list of plugins may be specified.  There is a default set of plugins that are specified and those are
	// also loaded by dojo below.  This property is primarily available to let users disable plugins by removing them
	// from the default.  Any plugins specific here will need to have any associated dojo files loaded using the dojo_require
	// property.
	StringBuilder plugins = new StringBuilder("");
	String pluginList = control.getProperty("plugins");
	if (pluginList != null && !"".equals(pluginList))
	{
		StringTokenizer tokenizer = new StringTokenizer(pluginList, ",");
		while (tokenizer.hasMoreTokens())
		{
			String nextToken = tokenizer.nextToken().trim();
			// Handle the situation where a more complex plugin is defined.  e.g. {name:'pluginx', command:'xcommand', generic:false}
			if (nextToken.startsWith("{"))
			{
				if (!nextToken.endsWith("}"))
				{
					String nextTokenPart = tokenizer.nextToken().trim();
					while (!nextTokenPart.endsWith("}") && tokenizer.hasMoreTokens())
					{
						nextToken = nextToken + "," + nextTokenPart;
						nextTokenPart = tokenizer.nextToken().trim();
					}
					nextToken = nextToken + "," + nextTokenPart;
				}
				plugins.append(nextToken);
			}
			else
			{
				plugins.append("'");
				plugins.append(nextToken.trim());
				plugins.append("'");
			}
			if (tokenizer.hasMoreTokens())
				plugins.append(",");
		}
	}
	
	// The dojo_require property allows for loading of necessary supporting dojo files for plugins.
	List dojoRequires = new ArrayList();
	dojoRequires.add("dijit.Editor");
	String dojoRequireList = control.getProperty("dojo_require");
	if (!WebClientRuntime.isNull(dojoRequireList))
	{
		StringTokenizer tokenizer = new StringTokenizer(dojoRequireList, ",");
		while (tokenizer.hasMoreTokens())
		{
			dojoRequires.add(tokenizer.nextToken().trim());
		}
	}
	
	// The load_css property allows for loading of necessary supporting css files for plugins.
	List cssFiles = new ArrayList();
	String cssFileList = control.getProperty("load_css");
	String prefix = "javascript/" + WebClientRuntime.getDojoDirectory(request) + "/";
	if (!WebClientRuntime.isNull(cssFileList))
	{
		StringTokenizer tokenizer = new StringTokenizer(cssFileList, ",");
		while (tokenizer.hasMoreTokens())
		{
			cssFiles.add(prefix + tokenizer.nextToken().trim());
		}
	}
	
	// Maximo will replace quotes with the escaped version in strings to prevent browsers from executing user entered values.
	// Since we need our value to be interpretted as html, we need to unescape them.
	//value = value.replace("&quot;", "\'");	 
	value = value.replace("&quot;", "\\\"");

	// Ampersands are escaped on the client side before the value is sent to the server.  We need to unescape them before sending
	// back to the client.  This is done so that values such as &lt; don't get turned into < by the server.  Escaping the value 
	// turns it into &amp;lt; which the server ignores and we can unescape it on the way out turning it back into &lt; so it works correctly
	// in the client.
	value = value.replaceAll("&amp;", "&");
	
	
	// Remove any carriage returns or line feeds as they are not used in the html interpretation anyway and they can only
	// mess up the value being returned to the client.  That is, the value may need to be returned to the client as a javascript
	// string and if there is a newline, it will split the string over two lines which will cause an error.
	value = value.replaceAll("\r", "");
	value = value.replaceAll("\n", "");
	
	
	// If the resulting javascript from this jsp is rendered in the hidden frame, all references to global javascript elements
	// such as dojo or any library functions must be prefaced by the MAINDOC variable.  This is because the hidden frame document
	// doesn't know about anything loaded in the main document.  This string is put in front of these calls just in case the MAINDOC
	// reference is needed.
	String mdStr = hiddenFrame? "MAINDOC." : "";
	
	
	// If needsRender, then this is the first time this control is being rendered and we need to send back the html
	// to render the dojo widget.
	if (control.needsRender())
	{
		// Escape (multiple levels are needed) the quotes so they go over the wire correctly.
		value = value.replaceAll("\'", "\\\\\\\\\\'");
		
		if (declarative)
		{
			// Note that the ampersands in the  value sent from the client to the server are escaped so that values such as &lt; are not turned into
			// > by the server.
			%>
			<div class='text ibta ns' id='<%=id%>_border' style='width:<%=width%>px;height:<%=height%>px;display:inline-block;*display:inline;'>
				<div id='<%=id %>' dojotype='<%=dojoType%>'
						style='border:none;'
						extraPlugins="[<%=plugins.toString()%>]"
						widgetId='<%=id %>'
						>
					<%=value%>
				</div>
			</div>
	<%	} else {%>
			<div class='text ibta ns' id='<%=id%>_border' style='width:<%=width%>px;height:<%=height%>px;display:inline-block;*display:inline;'>
				<div id='<%=id%>_dijitholder' style='border:none;'></div>
			</div>
	<%	}
		// If we're running in the hidden frame, run everything in the context of the main document.
		String withMaindoc = hiddenFrame? "with(MAINDOC) {" : "";
		String endWithMaindoc = hiddenFrame? "}" : "";
		 %>
		<script type="text/javascript">
			addLoadMethod("<%=mdStr%>dojo.loaded();");
            addLoadMethod("<%=mdStr%>dojo.registerModulePath('dojo.nls', '<%=servletBase%>/javascript/com/ibm/ism/pmsc/dojo/nls');");

			// Load the SRM Dojo layer file for RTE.
			//If debug>=2, don't load layer. Add modules to page.jsp for src level debugging     			           
            <% if(debuglevel==1) { %>	      
			   addLoadMethod("<%=mdStr%>dojohelper.loadfile('<%=servletBase%>/javascript/com/ibm/ism/pmsc/dojo/SRMEditorDojo.js.uncompressed.js', 'js');");           
            <% } else if(debuglevel<=0) { %>  //normal
               addLoadMethod("<%=mdStr%>dojohelper.loadfile('<%=servletBase%>/javascript/com/ibm/ism/pmsc/dojo/SRMEditorDojo.js', 'js');");
            <%} %>           

		<%
		   for (Iterator iter = cssFiles.iterator(); iter.hasNext();) { %>
				addLoadMethod("<%=mdStr%>dojohelper.loadfile('<%=servletBase%>/<%=iter.next().toString()%>', 'css');");
		<% }
		
		   for (Iterator iter = dojoRequires.iterator(); iter.hasNext();) { %>
				addLoadMethod("<%=mdStr%>dojo.require('<%=iter.next().toString()%>');");
		<% } 
			
			if (declarative) { %>
				addLoadMethod("<%=mdStr%>dojohelper.parseDojo('<%= id%>');");
		<%	} else {
				
				String createEditorStr = 
						withMaindoc +
							"if (dijit.byId('" + id + "') != undefined)" +
							"{" +
							"	dijit.byId('" + id + "').destroyRecursive();" +
							"}" +
							"var pluginArray = new Array(" + plugins.toString() + ");" +
							"var params = new dojo.global.Object();" +
  							"params.id = '" + id + "';" +
  							"params.name = '"+id+"';" +
  							"params.value = '" + value + "';" +
  							"if (" + isReadOnly + ") {" +
  							"	params.disabled = 'true';" +
  							"}" +
  							"params.extraPlugins = pluginArray;" +
                                                        "params.height = '" + editor_height+"px';" +
							"var rte = new " + dojoType + "(" +
							"params," +
        					"'"+id+"_dijitholder');" +
        				endWithMaindoc;
				%>
				addLoadMethod("<%=createEditorStr%>");
		<%	}
			// The following several lines include a workaround for an IE selection bug in dojo 1.3.2 and the code
			// to connect the onChange and onFocus events.  The IE bug is fixed in dojo 1.4 so when that 
			// version is included in Maximo, the associated lines can be removed.
			String ieWorkaroundAndConnect = 
				withMaindoc +
					"var rte = dijit.byId('" + id + "');" +
					//"if (dojo.isIE) { " +
      				//"	rte.events.push('onBeforeActivate');" +
      				//"	rte.onBeforeActivate = dojo.hitch(rte, dojohelper.onBeforeActivate);" +
      				//"}" +
      				// Setup the change and focus listeners.
      				"dojo.connect(rte, 'onChange', null, dojohelper.rte_input_changed);" +
        			"dojo.connect(rte, 'onFocus', null, dojohelper.on_focus);" +
        		endWithMaindoc;
				%>
			addLoadMethod("<%=ieWorkaroundAndConnect%>");
	 	</script>
	<%
	}
	else
	{
		// We're just doing a re-render, so just send back the new/existing value.
		
		// Escape (multiple levels are needed) the quotes so they go over the wire correctly.
		value = value.replaceAll("\'", "\\\\\'");
		%>
			MAINDOC.dijit.byId('<%= id%>').attr("value", '<%=value%>');
		<%
		
	}
	 %>
<%@ include file="../common/componentfooter.jsp" %>
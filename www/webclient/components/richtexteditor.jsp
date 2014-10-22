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
	// The width and height values will be used to set the dimensions for the editor area.
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String dojoType = component.getProperty("dojo_type");
	RichTextEditor editor = (RichTextEditor)component;
	String value = editor.getString();
	boolean invalidBinding = value == BoundComponentInstance.INVALID_BINDING;
	if(!invalidBinding)
	{
		value = HTML.cleanValue(value, true, false, Boolean.parseBoolean((String)app.get("incdata")));
		if (request.getHeader("user-agent").indexOf("Firefox") > -1 && (HTML.RICH_TEXT_MARKER.equals(value) || (value != null && value.length() == 0)))
		{
			// If this value is going into Firefox and it consists solely of the rich text marker comment, it can
			// cause a weird problem for Japanese users. The fix for this is to simply add an empty div. Without it,
			// the user will not be able to put focus into the editor at all.
			value = "<div style=\"width:1px\"></div>" + value;
		}
	}
	boolean required = component.getProperty("inputmode").equals("required");
	if(debug)
	{
		System.out.println("Value of " + id + ": " + value);
	}
	
	// If needsRender, then this is the first time this control is being rendered and we need to send back the html
	// to render the dojo widget.
	if (component.needsRender())
	{
%>		<div id="<%=id%>_border" style="display:inline-block;*display:inline;">
			<div class="fld <%=required?"fld_req":""%><%=invalidBinding?" iu":"" %>" id="<%=id%>" style="width:<%=width%>px;display:inline-block;*display:inline;padding:0px;">
				<div id="<%=id%>_tempspacer" style="height:<%=height%>px;"><%=invalidBinding?value:"" %></div>
			</div>
		</div>
<%
		if(!designmode && !invalidBinding)
		{
%>		<script type="text/javascript">
<%			// The load_css property allows for loading of necessary supporting css files for plugins.
			String cssFiles = component.getProperty("load_css");
			if (!WebClientRuntime.isNull(cssFiles))
			{
				StringTokenizer tokenizer = new StringTokenizer(cssFiles, ",");
				while (tokenizer.hasMoreTokens())
				{	
%>					dojohelper.loadfile('<%=servletBase%>/javascript/<%=dojoDirectory%>/<%=tokenizer.nextToken().trim()%>', 'css');
<%				}
			}	
%>			dojo.require('layers.mbs.richtexteditor');
			dojo.addOnLoad(function() {
				dojo.require('ibm.tivoli.mbs.dijit.editor.TpaeTextEditor');
				dojo.require('dijit.Toolbar');
<%
				// The dojo_require property allows for loading of necessary supporting dojo files for plugins.
				String dojoRequireList = component.getProperty("dojo_require");
				if (!WebClientRuntime.isNull(dojoRequireList))
				{
					StringTokenizer tokenizer = new StringTokenizer(dojoRequireList, ",");
					while (tokenizer.hasMoreTokens())
					{
%>						dojo.require('<%=tokenizer.nextToken().trim()%>');
<%					}
				}

				String dojoLocale;
				if ("PT".equalsIgnoreCase(langcode))
					dojoLocale = "pt-br";
				else if ("ZH".equalsIgnoreCase(langcode))
					dojoLocale = "zh-cn";
				else if ("ZHT".equalsIgnoreCase(langcode))
					dojoLocale = "zh-tw";
				else
					dojoLocale = langcode.toLowerCase().replace('_', '-');
				
%>				dojo.addOnLoad(function() {
<%					if(debug)
					{
%>						console.log('Value of <%=id%>: <%=value%>');
<%					}
%>					var rte = dijit.byId('<%=id%>');
					if (rte)
					{
						rte.destroyRecursive();
					}

					var params = new dojo.global.Object();
					params.id = '<%=id%>';
					params.name = '<%=id%>';
					params.value = '<%=value%>';
					params.height = '<%=height%>';
					params.disabled = <%=editor.isReadOnly()%>;
					params.lang = '<%=dojoLocale%>';
					params.dir = '<%=rtl?"rtl":"ltr"%>';
<%			if(ismobile)
			{
					//Don't show toolbars for mobile
%>					params.plugins = [];
<% 			}
			else
			{
				String plugins = editor.getPlugins();
				if(plugins != null && plugins.length() != 0)
				{
%>					params.plugins = <%=plugins%>;
<%				}
				String extraPlugins = editor.getExtraPlugins();
				if(extraPlugins != null && extraPlugins.length() != 0)
				{
%>					params.extraPlugins = <%=editor.getExtraPlugins()%>;
<%				}
			}
%>					try
					{
						if ((params.plugins && params.plugins.length == 1 && 
							 params.plugins[0].name && params.plugins[0].name == "dijit._editor.plugins.EnterKeyHandling") 
							 && (!params.extraPlugins || params.extraPlugins.length == 0) )
						{
							// plugins has only the enterkeyhandling plugin. That means no visual plugins
							// and no extra plugins. So the toolbar is empty. We need to remove the tab stop.
							params.toolbar = new dijit.Toolbar({
								tabIndex: -1
							});
						}
						rte = new <%=dojoType%>(params, '<%=id%>');
						dojo.connect(rte, 'onChange', null, dojohelper.rte_input_changed);
						dojo.connect(rte, 'onFocus', null, dojohelper.on_focus);
					}
					catch(error)
					{
<%					if(debug)
					{
%>						console.log('Error creating <%=id%>: ' + error);
<%					}
%>						var element = dojo.byId('<%=id%>_tempspacer');
						if(element)
						{
							element.innerHTML = error;
							dojo.addClass('<%=id%>_border', 'iu');
							dojo.style('<%=id%>', 'width', '');
						}
					}
				});
			});
	 	</script>
<%		}
	}
	else if(!designmode) // We're doing a re-render, if not designmode update via javascript.
	{
%>		<component id="<%=id%>_holder"><%="<![CDATA["%><script>
			var rte = dijit.byId('<%=id%>');
			if(rte)
			{
<%			if(debug)
			{
%>				console.log('Updating <%=id%>: <%=value%>');
<%			}
%>				try
				{
					rte.set('value', '<%=value%>');
					rte.set('disabled', <%=editor.isReadOnly()%>);
				}
				catch(error)
				{
<%					if(debug)
					{
%>						console.log('Error updating <%=id%>: ' + error);
<%					}
%>				}
			}
			</script>
		<%="]]>"%></component>
<%	}
%>
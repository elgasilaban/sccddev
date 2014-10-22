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
--%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"%>
<%@page import="com.ibm.tivoli.maximo.asset.ilog.controls.ILogControl"%>

<%
ILogControl ilogcontrol = (ILogControl) control;
String myid = component.getId();
String appId = app.getId();
String width = component.getProperty("width");
String height = component.getProperty("height");
String datasrc = control.getProperty("datasrc");
String rtlDir = BidiUtils.getLayoutOrientation(langcode).equals(BidiUtils.RTL_DIRECTION)? "true" : "false";  //bidi-hcg_SC
String bidiEnabled = BidiUtils.isBidiEnabled()? "true" : "false";
     
if ( component.needsRender() ) {
	if ( !ilogcontrol.getAppletVisible() )
	{
		ilogcontrol.setDataChanged(true);
	}
%>


<script>
	if (typeof(pmcomLibraryLoaded) == 'undefined')
	{
		document.write("<script type='text/javascript' src='<%=servletBase%>/javascript/asttopo_library.js'><\/script>");
	}
</script>

<table role="presentation" aria-hidden="true" id="<%=myid%>_holder" align="<%=defaultAlign%>" align="center" control="true" controltype="<%=ilogControlType%>" style="width:<%=width%>;height:1;position:relative;top:-5000;border: 1px solid black;" >
<tr>
<td aria-hidden="true" align="<%=defaultAlign%>">
<OBJECT 
<%	if (USERAGENT.equals("IE"))
	{	%>
		class="genericIlog"
		classid="clsid:<%=WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID%>" 
		
<%
		String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
		if (hostProtocol == null)
		{
			hostProtocol = request.getScheme();
		}
		String codebase = hostProtocol+"://"+control.getProperty("codebase", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL);
%>
		codebase = "<%=codebase%>"

<%	}
	else
	{	%>
		classid="java:<%=ilogAppletClass%>"
<%	}	%>
 
    style="width:<%=width%>;height:1;position:relative;" WIDTH = "<%=width%>" HEIGHT = "1" type="application/x-java-applet"  ALIGN = "baseline" mxpart="applet" datasrc="<%=datasrc%>" id="<%=myid%>" NAME="<%=myid%>" onreadystatechange="refreshApplet('<%=myid%>')" onfocus="setCurrentfocusId(event, this)" tabindex="0" 	ALIGN="baseline"  >
    
    <PARAM NAME = "code" VALUE = "<%=ilogAppletClass%>" >
    <PARAM NAME = "codebase" VALUE= "<%=servletBase%>/applets/telco" >
 
    <PARAM NAME = "archive" VALUE= "<%=ilogAppletArchiveForBrowserCache%>" >
    <PARAM NAME = "cache_archive" VALUE= "<%=ilogAppletArchiveForPluginCache%>" >
    <PARAM NAME = "cache_option" VALUE= "Plugin" >
      
    <PARAM NAME = "type" VALUE = "<%=WebClientConstants.JAVA_APPLET_OBJECT_TYPE%>">
    <PARAM NAME = "scriptable" VALUE = "true">
    <PARAM NAME = "mayscript" VALUE = "true">
    <PARAM NAME = "uisessionid" VALUE = "<%=WebClientRuntime.makesafevalue(ilogcontrol.getUiSessionId())%>">
    <PARAM NAME = "controlid" VALUE = "<%=ilogcontrol.getId()%>">
    <PARAM NAME = "appid" VALUE = "<%=ilogcontrol.getAppId()%>">
    <PARAM NAME = "loadoninit" VALUE = "<%=ilogcontrol.getAppletVisible()%>">
    <PARAM NAME = "skinname" VALUE = "<%=ilogcontrol.getSkinName()%>">
    <PARAM NAME = "appletlocale" VALUE = "<%=wcs.getLocale()%>">
    <PARAM NAME = "langcode" VALUE="<%=wcs.getUserInfo().getLangCode()%>" >
    <PARAM NAME = "name" VALUE="<%=myid%>" >
    <PARAM NAME = "java_arguments" VALUE="-Djnlp.packEnabled=true" >
    <PARAM NAME = "rtlOrientation" VALUE="<%=rtlDir%>">
    <PARAM NAME = "bidienabled" VALUE="<%=bidiEnabled%>">
	<PARAM NAME="codebase_lookup" VALUE="false">
	
    <SPAN STYLE = "color:red">Applet failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
						No Java 2 SDK, Standard Edition Support for applet
    
<%	for (int i=0; i < ilogAppletArgNames.length; i++)
	{	%>
		<PARAM NAME="<%=ilogAppletArgNames[i]%>" VALUE="<%=ilogAppletArgValues[i]%>">
<%	} %>
</OBJECT>

</td></tr></table>
    
<%  if ( ilogcontrol.getAppletVisible() )
	{ %>	
	   <script>	
		  var xtable = document.getElementById("<%=myid%>_holder");
		  var xobject = document.getElementById("<%=myid%>");
		  if ( xtable ) {
		     xtable.style.top=0; 
		     xtable.style.height=<%=height%>; 
		     xobject.style.height=<%=height%>; 
		  }
	   </script>
 <% }
}
else if ( ilogcontrol.getRefreshVisibility() )
{
    ilogcontrol.setRefreshVisibility(false); %>
  
    <component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
   
	ilogapplet = document.getElementById("<%=myid%>");
	ctrl = getControl( ilogapplet ) ;
	
<%	if (ilogcontrol.getAppletVisible())
	{	%>	    
	    // related to #10-19786, for the purpose of IE, where the applet is shifted away from the screen in BIDI. 
	    // this line seems an interrupt to the applet object, which is similar to an alert box over here, or an resize afterwards, ..., 
	    // a bit interesting stuff.	    
	    ilogapplet.offsetLeft;
	    
		if( ctrl ) { ctrl.style.top=0;ctrl.style.height=<%=height%>;ilogapplet.style.height=<%=height%>; } 
<%	} 
    else
    {	%>
    	if(ctrl) {ctrl.style.top=-5000;ctrl.style.height=1;ilogapplet.style.height=1;}
<%  }	%>

    </script><%="]]>"%></component>
<%
}
  
if (ilogcontrol.getDataChanged() && ilogcontrol.getAppletVisible() && !component.needsRender())
{	%>
 
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		ilogapplet = document.getElementById("<%=myid%>");
 		if( ilogapplet )
		{
			try
			{			
				ilogapplet.loadData("<%=ilogcontrol.isInitialLoadRequired()%>");
 			}
			catch(error)
			{
				<%	if(debug)
				{	%>
					console.log('Error loading applet data <%=myid%>: ' + error);
			<%	}	%>
			}
		}        
		hideWait();		
	</script><%="]]>"%></component>
<% 
   ilogcontrol.setDataChanged(false); 
   ilogcontrol.setInitialLoadRequired( false ); 
}

// last error part
if (!WebClientRuntime.isNull(ilogcontrol.getError()))
{	%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		ilogapplet = document.getElementById("<%=myid%>");
		if(ilogapplet)
		{
			try
			{
				ilogapplet.showError('<%=ilogcontrol.getError()%>');
			}
			catch(error)
			{
				<%	if(debug)
				{	%>
					console.log('Error loading applet data <%=myid%>: ' + error);
			<%	}	%>
			}
		}
	</script><%="]]>"%></component>
<%
    ilogcontrol.setError(null);
}
%> 
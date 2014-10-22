<%@page import="psdi.webclient.system.runtime.WebClientRuntime"%>
<%@page import="com.ibm.ism.pmcom.webclient.ilog.controls.ILogControl"%>
<%
ILogControl ilogcontrol = (ILogControl) control;
ilogcontrol.logJspMessage("Enter ilogapplet JSP");

String myid = component.getId();
String appId = app.getId();
String width = component.getProperty("width");
String height = component.getProperty("height");
String datasrc = control.getProperty("datasrc");
String rtlDir = BidiUtils.getLayoutOrientation(langcode).equals(BidiUtils.RTL_DIRECTION)? "true" : "false";  //bidi-hcg_SC
String bidiEnabled = BidiUtils.isBidiEnabled()? "true" : "false";
// defect 40374: avoid mixing http and https protocols inside html
String protocol = (servletBase == null)? "http" : servletBase.substring(0, servletBase.indexOf(":")) ;
String jreCodebase = protocol + "://java.sun.com/update/1.6.0/jinstall-6-windows-i586.cab" ;

if(component.needsRender()) {
	ilogcontrol.logJspMessage("Begin applet render");
	if (!ilogcontrol.getAppletVisible())
	{
		ilogcontrol.setDataChanged(true);
	}

	String top = "0";
	String origheight = height;
	if (!ilogcontrol.getAppletVisible()) { 
   		ilogcontrol.logJspMessage("Hide applet");
   		height = "1";
   		top = "-5000";
   	}	
%>
<script>
    if (typeof(pmcomLibraryLoaded) == 'undefined')
    {
        document.write("<script type='text/javascript' src='<%=servletBase%>/javascript/pmcom_library.js'><\/script>");
    }
</script>
    
<% if (!designmode) { %>
<script> 
		pmcomBlockGUI("<%=ilogcontrol.getAppletLoadingMsg()%>",<%=ilogcontrol.getAppletLoadingTimeout()%>);
</script>
<% } %>

<table id="<%=myid%>_holder" align="<%=defaultAlign%>" align="center" control="true" controltype="<%=ilogControlType%>" style="width:<%=width%>;height:<%=height%>;position:relative;top:<%=top%>;border: 1px solid black;" >
<tr>
<td align="<%=defaultAlign%>">
<% if (!designmode) { %>
<OBJECT 
<% if (USERAGENT.equals("IE")) { %>
	 class="genericIlog"
     classid="clsid:CAFEEFAC-0016-0000-FFFF-ABCDEFFEDCBA" 
     codebase = "<%=jreCodebase%>"
<% } %>
	title="<%=ilogControlType%> applet"
     style="width:<%=width%>;height:<%=height%>;position:relative;" 
     WIDTH = "<%=width%>" HEIGHT = "<%=height%>" 
     type="application/x-java-applet"  
     ALIGN = "baseline" 
     mxpart="applet" 
     datasrc="<%=datasrc%>" 
     id="<%=myid%>" NAME="<%=myid%>" 
     onreadystatechange="refreshApplet('<%=myid%>')" 
     onfocus="setCurrentfocusId(event, this)" 
     tabindex="0" 	
     ALIGN="baseline"  >
    <PARAM NAME = "CODE" VALUE = "<%=ilogAppletClass%>" >
    <PARAM NAME = "CODEBASE" VALUE= "<%=servletBase%>/applets/" >
    <PARAM NAME = "cache_archive" VALUE= "<%=ilogAppletArchive%>" >
	<PARAM name="codebase_lookup" value="false">
    <PARAM NAME = "cache_option" VALUE= "plugin" >
    <PARAM NAME = "type" VALUE = "application/x-java-applet;version=1.6">
    <PARAM NAME = "scriptable" VALUE = "true">
    <PARAM NAME = "mayscript" VALUE = "true">
    <PARAM NAME = "uisessionid" VALUE = "<%=WebClientRuntime.makesafevalue(ilogcontrol.getUiSessionId())%>">
    <PARAM NAME = "controlid" VALUE = "<%=ilogcontrol.getId()%>">
    <PARAM NAME = "appid" VALUE = "<%=ilogcontrol.getAppId()%>">
    <PARAM NAME = "loadoninit" VALUE = "<%=ilogcontrol.getAppletVisible()%>">
    <PARAM NAME = "debugison" VALUE = "<%=ilogcontrol.isDebugOn()%>">
    <PARAM NAME = "skinname" VALUE = "<%=ilogcontrol.getSkinName()%>">
    <PARAM NAME = "appletlocale" VALUE = "<%=wcs.getLocale()%>">
    <PARAM NAME = "appletdefaultlocale" VALUE = "<%=wcs.getUserInfo().getDefaultLocaleStr()%>">
    <PARAM NAME = "appletlangcode" VALUE = "<%=wcs.getUserLanguageCode()%>">
    <PARAM NAME = "applettimezone" VALUE = "<%=wcs.getTimeZone().getID()%>">
    <PARAM NAME=  "NAME" VALUE="<%=myid%>" >
    <PARAM NAME = "java_arguments" VALUE="-Xmx128m" >
    <PARAM NAME=  "rtlOrientation" VALUE="<%=rtlDir%>">
    <PARAM NAME=  "bidienabled" VALUE="<%=bidiEnabled%>">
<% for (int i=0; i < ilogAppletArgNames.length; i++) { %>
	<PARAM NAME="<%=ilogAppletArgNames[i]%>" VALUE="<%=ilogAppletArgValues[i]%>">
<% } %>
    <SPAN STYLE="color:red">Applet failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
	No Java 2 SDK, Standard Edition Support for applet
</OBJECT>
<% if (ilogcontrol.useAppletBackingRectangle()) { %>
<table id="<%=myid%>_back" class="mdw" style="position:relative;display:none;width:<%=width%>;height:<%=origheight%>;"><tr><td class="din"></td></tr></table>
<% } %>
<% } else { %>
&nbsp;<div class="genericIlog"
	id="<%=myid%>" NAME="<%=myid%>"
	ALIGN="baseline" 
	style="padding:5px;position:relative;display:inline;background:#E7E7E7;border:1px solid #000000;"><%=myid%>
</div>
<% } %>
</td>
</tr>
</table>
<% if (ilogcontrol.useAppletBackingRectangle()) { %>
<table id="<%=myid%>_back" style="position:relative;display:none;width:<%=width%>;height:<%=origheight%>;background:#E7E7E7;"><tr><td class="din"></td></tr></table>
<% } %>

<% ilogcontrol.logJspMessage("Finish applet render"); %>	

<% } else if (ilogcontrol.getRefreshVisibility()) { 
    ilogcontrol.logJspMessage("Begin applet visibility refresh");
	ilogcontrol.setRefreshVisibility(false);
%>

	<component id="<%=myid%>_holder1"<%=compType%>><![CDATA[<script>
	ilogapplet = document.getElementById("<%=myid%>");
	ctrl = getControl(ilogapplet);
	
<%	if (ilogcontrol.getAppletVisible())	{  
        ilogcontrol.logJspMessage("Make applet visible");
%>
    	if(ctrl) {ctrl.style.top=0;ctrl.style.height=<%=height%>;ilogapplet.style.height=<%=height%>;} reload=true;
<%	} else { 
        ilogcontrol.logJspMessage("Hide applet");
%>
     	if(ctrl) {ctrl.style.top=-5000;ctrl.style.height=1;ilogapplet.style.height=1;}
<%  } %>	

</script>]]></component>

<% 
   ilogcontrol.logJspMessage("Finish applet visibility refresh");
   } 
%>

<% if (ilogcontrol.getDataChanged() && (!designmode) && ilogcontrol.getAppletVisible() && !component.needsRender()) { 
      ilogcontrol.logJspMessage("Load applet data");
%>

     <component id="<%=myid%>_holder2"<%=compType%>><![CDATA[<script>

	ilogapplet = document.getElementById("<%=myid%>");
	ilogapplet.loadData();
	hideWait(); 

	</script>]]></component>

<% ilogcontrol.setDataChanged(false); 
}

if (!WebClientRuntime.isNull(ilogcontrol.getError()))
{
    ilogcontrol.logJspMessage("Show error message");
%>
ilogapplet.showError('<%=ilogcontrol.getError()%>');
<%
  ilogcontrol.setError(null);
}
%>

<%
ilogcontrol.logJspMessage("Exit ilogapplet JSP");
%>

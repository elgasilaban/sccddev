<%@page import="psdi.webclient.system.runtime.WebClientRuntime"%>
<%@page import="com.ibm.ism.rba.webclient.ilogcanvas.controls.ILogControl"%>
<%
ILogControl ilogcontrol = (ILogControl) control;    
app.put("ilogCanvasId", ilogcontrol.getId());
String myid = component.getId();
String appId = app.getId();
String width = component.getProperty("width");
String height = component.getProperty("height");
String datasrc = control.getProperty("datasrc");
String rtlDir = BidiUtils.getLayoutOrientation(langcode).equals(BidiUtils.RTL_DIRECTION)? "true" : "false";  //bidi-hcg_SC
String bidiEnabled = BidiUtils.isBidiEnabled()? "true" : "false";
boolean jarsLoaded = ilogcontrol.getJarsLoaded();
String protocol = (servletBase == null)? "http" : servletBase.substring(0, servletBase.indexOf(":")) ;
String jreCodebase = protocol + "://java.sun.com/update/1.6.0/jinstall-6-windows-i586.cab" ;

if(component.needsRender()) {
	if (!ilogcontrol.getAppletVisible())
	{
		ilogcontrol.setDataChanged(true);
	}

        String top = "0";
	if (!ilogcontrol.getAppletVisible()) { 
           height = "1";
           top = "-5000";
   	}	
%>
<script>
    if (typeof(rbaLibraryLoaded) == 'undefined')
    {
        document.write("<script type='text/javascript' src='<%=servletBase%>/javascript/ilogcanvas.js'><\/script>");
    }
</script>

<% if (!jarsLoaded) { %>    
<script> 
		rbaBlockGUI("<%=ilogcontrol.getAppletLoadingMsg()%>",<%=ilogcontrol.getAppletLoadingTimeout()%>);
</script>
<% } %>


<table id="<%=myid%>_holder" align="<%=defaultAlign%>" align="center" control="true" controltype="<%=ilogControlType%>" style="width:<%=width%>;height:<%=height%>;position:relative;top:<%=top%>;border: 1px solid black;" >
<tr>
<td align="<%=defaultAlign%>">
<OBJECT 
<% if (USERAGENT.equals("IE")) { %>
	class="genericIlog"
    	classid="clsid:CAFEEFAC-0016-0000-0000-ABCDEFFEDCBA" 
    	codebase = "<%=jreCodebase%>"
<% } %>
    style="width:<%=width%>;height:<%=height%>;position:relative;" 
    WIDTH = "<%=width%>" HEIGHT = "<%=height%>" 
    type="application/x-java-applet"  
    ALIGN = "baseline" 
    mxpart="applet" 
    datasrc="<%=datasrc%>" id="<%=myid%>" 
    NAME="<%=myid%>" 
    onreadystatechange="refreshApplet('<%=myid%>')" 
    onfocus="setCurrentfocusId(event, this)" 
    tabindex="0" 	
    ALIGN="baseline"  >
    <PARAM NAME = "CODE" VALUE = "<%=ilogAppletClass%>" >
    <PARAM NAME = "CODEBASE" VALUE= "<%=servletBase%>/applets" >
	<PARAM name="codebase_lookup" value="false">
    <PARAM NAME = "cache_option" VALUE= "plugin" >
    <PARAM NAME = "cache_archive_ex" VALUE= "<%=ilogAppletArchive%>" >
    <PARAM NAME = "type" VALUE = "application/x-java-applet;version=1.6">
    <PARAM NAME = "scriptable" VALUE = "true">
    <PARAM NAME = "mayscript" VALUE = "true">
    <PARAM NAME = "uisessionid" VALUE = "<%=WebClientRuntime.makesafevalue(ilogcontrol.getUiSessionId())%>">
    <PARAM NAME = "controlid" VALUE = "<%=ilogcontrol.getId()%>">
    <PARAM NAME = "appid" VALUE = "<%=ilogcontrol.getAppId()%>">
    <PARAM NAME = "loadoninit" VALUE = "<%=ilogcontrol.getAppletVisible()%>">
    <PARAM NAME = "skinname" VALUE = "<%=ilogcontrol.getSkinName()%>">
    <PARAM NAME = "appletlocale" VALUE = "<%=wcs.getLocale()%>">
    <PARAM NAME=  "NAME" VALUE="<%=myid%>" >
    <PARAM NAME=  "rtlOrientation" VALUE="<%=rtlDir%>">
    <PARAM NAME=  "bidienabled" VALUE="<%=bidiEnabled%>">
    <PARAM NAME = "java_arguments" VALUE="-Djnlp.packEnabled=false" >
    <SPAN STYLE="color:red">Applet failed to load! -- Please check browser security settings and get the Java Plugin</SPAN>
						No Java 2 SDK, Standard Edition Support for applet
    
<% for (int i=0; i < ilogAppletArgNames.length; i++) { %>
		<PARAM NAME="<%=ilogAppletArgNames[i]%>" VALUE="<%=ilogAppletArgValues[i]%>">
<% } %>
</OBJECT>
</td>
</tr>
</table>
	

<% } else if (ilogcontrol.getRefreshVisibility()){ 
	ilogcontrol.setRefreshVisibility(false);
%>
        
	<component id="<%=myid%>_holder1"<%=compType%>><![CDATA[<script>
	ilogapplet = document.getElementById("<%=myid%>");
	ctrl = getControl(ilogapplet);
	
<%	if (ilogcontrol.getAppletVisible())	{ %>
    	if(ctrl) {ctrl.style.top=0;ctrl.style.height=<%=height%>;ilogapplet.style.height=<%=height%>;} reload=true;
<%	} else { %>
    	if(ctrl) {ctrl.style.top=-5000;ctrl.style.height=1;ilogapplet.style.height=1;}
<% } %>	

</script>]]></component>

<% } %>

<% if (ilogcontrol.getDataChanged() && ilogcontrol.getAppletVisible() && !component.needsRender()) { 
         DataBean wfProcess = wcs.getDataBean(datasrc);
         DataBean wfNodes = wcs.getDataBean(nodeBeanId);
         DataBean wfActions = wcs.getDataBean(actionBeanId);
         String processid = wfProcess.getString("wfprocessid");
         String processname = "";


         int savedNodeRow = wfNodes.getCurrentRow();
         int savedActionRow = wfActions.getCurrentRow();
         wfNodes.setCurrentRow(0);
         wfActions.setCurrentRow(0);
         wfNodes.setCurrentRow(savedNodeRow);
         wfActions.setCurrentRow(savedActionRow);

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
%>
MAINDOC.ilogapplet.showError('<%=ilogcontrol.getError()%>');
<%
  ilogcontrol.setError(null);
}            

%>


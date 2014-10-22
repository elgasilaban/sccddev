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
--%><%!
  static final int timeoutwait=200;
%>
<%@ include file="../common/componentheader.jsp" %><%
String frameheight=control.getProperty("height");
frameheight+="px";
EcommFrame ecommcontrol = (EcommFrame) control;
if(component.needsRender())
{
%>
<script type="text/javascript">
function setFrameURL(newsrc)
{
  var framewin = document.getElementById("<%=control.getId()%>");
  framewin.src = newsrc;
}
</script>
<div style="position:relative;width:100%;height:<%=frameheight%>">
<iframe id="<%=control.getId()%>" name="<%=control.getId()%>" style="position:absolute;top:0;left:0" width="100%" height="100%" scrolling="auto"  role="presentation"></iframe>
</div>
<%
}
if (ecommcontrol.isStartLookup())
{
ecommcontrol.setStartLookup(false);
%>
<script type="text/javascript">
window.setTimeout("sendEvent('lookupcatalog','ecommadapt','null')",<%=timeoutwait%>);
</script>
<%
}
else if (ecommcontrol.getSendEvent() != null)
{
    WebClientEvent ev=ecommcontrol.getSendEvent();
    String sendevent=hiddenFrame ? "parent." : "";
    sendevent+="sendEvent('" + ev.getType() + "','" + ev.getTargetId() + "','" + ev.getValueString() + "')";
%>
<script type="text/javascript">
<%    if (hiddenFrame)
    { %>
        addLoadMethod("<%=sendevent%>");
<%   }
    else
    { %>
        window.setTimeout("<%=sendevent%>",<%=timeoutwait%>);
<%    } %>
</script>
<%
ecommcontrol.setSendEvent(null);
}
else if (ecommcontrol.isRefreshStartPage())
{
    ecommcontrol.setRefreshStartPage(false);
// strange browser issue, with IE we will lose our iframe on the update so we need to write it
// back out.  Firefox does not lose the iframe so just update like we normally would.
    if (USERAGENT.equals("IE"))
    {
%>
<div style="position:relative;width:100%;height:<%=frameheight%>">
<iframe id="<%=control.getId()%>" name="<%=control.getId()%>" style="position:absolute;top:0;left:0" width="100%" height="100%" scrolling="auto"  role="presentation"></iframe>
</div>
<script type="text/javascript">
addLoadMethod("parent.setFrameURL('<%=ecommcontrol.getStartPage()%>')");
</script>
<% } else {
%>
<script type="text/javascript">
parent.setFrameURL('<%=ecommcontrol.getStartPage()%>');
</script>
<%
    }
}
%>
<%@ include file="../common/componentfooter.jsp" %>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="com.ibm.tsd.integrate.trc.*,psdi.util.MXSession, psdi.security.UserInfo,psdi.webclient.system.session.WebClientSession" %>

<%

Messages msg = null;
MXSession mxSession = null;

if (session != null) {
    WebClientSession wcs = new WebClientSession(session);
    wcs.setRequest(request);
    mxSession = wcs.getMXSession();
    if (mxSession != null) {
        UserInfo ui = mxSession.getUserInfo();
        if (ui != null) {
            msg = new Messages("com.ibm.tsd.integrate.trc.messages",ui.getLangCode());
            request.setCharacterEncoding("UTF-8");
        }
    }
}

 
if (msg == null) {
    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
}

boolean mirrored = mxSession.getUserInfo().getLangCode().equalsIgnoreCase("ar") || mxSession.getUserInfo().getLangCode().equalsIgnoreCase("he");
String direction = mirrored ? "right" : "left";
%>

<% 
if(mirrored) {
%>
<html dir="rtl" lang="<%=mxSession.getUserInfo().getLangCode()%>">
<% } else { %>
<html>
<% } %>
<head>  
<meta http-equiv=Content-Type content="text/html; charset=UTF-8">

<style>

body {
font: 75%;
font-family: arial, sans serif, verdana;
width: 100%;
margins: 0;
padding: 0;
text-align:<%=direction%>
}

.content { 
width: 75%;
margin-left: 21.5%;
margin-top: 2%;
font-size: 1.25em;
}

.heading {
font-size: 1.5em;
}

.bold { 
font-weight: bold 
}
 
#head {
font-size: 3em;
color:#666
}

</style>

</head>

<body>

<div id="head"> 
<%= msg.getString("TRC_LONG_NAME") %>
</div>

<div class="content">

<p class="heading"><%=msg.getString("TRC_WIN_INSTALL_TITLE")%></p>

<%--<p>
[<a href="../jws/trc_target_setup.exe"><%=msg.getString("TRC_DOWNLOAD_WINDOWS_EXE")%></a>]
</p>--%>

<p>
[<a href="../jws/trc_target.msi"><%=msg.getString("TRC_DOWNLOAD_WINDOWS_MSI")%></a>]
</p>

<p>
<%=msg.getString("TRC_WIN_INSTALL")%>
</p>

<p class="heading"><%=msg.getString("TRC_LINUX_INSTALL_TITLE")%></p>

<p>
[<a href="../jws/ibm-trc-target-5.1.2.i386.rpm"><%=msg.getString("TRC_DOWNLOAD_LINUX")%></a>]
</p>

<p>
<%=msg.getString("TRC_INSTALL_LINUX_INSTRUCTIONS")%>
</p>

<p>
<%=msg.getString("TRC_POST_INSTALL_LINUX")%>
</p>

<%--<p>
<%=msg.getString("TRC_INSTALL_INSTRUCTIONS")%>
</p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC1")%></p>
 
<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC2")%></p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC4")%></p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC5")%></p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC3")%></p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC6")%></p>

<p style="font-weight:bold"><%=msg.getString("TRC_INSTALL_SC8")%></p>--%>

</div> 

</body>

</html>
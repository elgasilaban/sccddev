<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" import="psdi.util.*,psdi.webclient.system.runtime.*,psdi.webclient.system.session.*,psdi.webclient.system.websession.*,psdi.webclient.system.dojo.*,psdi.server.*,java.util.*,java.rmi.RemoteException" %>

<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
response.setHeader("Pragma", "no-cache");

MXSession mxSession = null;
String requestUrl = null;
String queryString = null;
String url = null;
String userFieldName = null;
String passwordFieldName = null;
String user = null;
String password = null;


try {
    WebClientSessionManager wcsm = WebClientSessionManager.getWebClientSessionManager(session);
    if (wcsm != null && wcsm.getSessionInvalidated()) {
        session.removeAttribute("MXSession");
    }

    mxSession = WebClientRuntime.getMXSession(session);
    requestUrl = WebClientRuntime.getMaximoRequestURL(request);
    queryString = request.getQueryString();
    url = WebClientRuntime.getMaximoRequestContextURL(request)+"/ui/login";

    if (!WebClientSessionFactory.getWebClientSessionFactory().hasAvailableSessions()) {
        url = new java.net.URL(new java.net.URL(requestUrl), "loginerror.jsp").toString();
        response.sendRedirect(url);
        return;
    }

    if (mxSession == null) {
        mxSession = MXSession.getNewSession();
    }

    String allowProp = mxSession.getProperty("mxe.webclient.guestLoginEnabled");
    if (allowProp == null || !allowProp.equals("1")) {
        url = new java.net.URL(new java.net.URL(requestUrl), "loginerror.jsp").toString();
        response.sendRedirect(url);
        return;
    }

    user = mxSession.getProperty("mxe.system.guestuser");
    password = mxSession.getProperty("mxe.system.guestpassword");

    // TODO: should we allow empty passwords for a guest account? 
    if ( (user == null || user.isEmpty()) || (password == null || password.isEmpty()) ) {
        url = new java.net.URL(new java.net.URL(requestUrl), "loginerror.jsp").toString();
        response.sendRedirect(url);
        return;
    }

    boolean formAuth = request.getParameter("appservauth") != null || WebAppEnv.useAppServerSecurity();
    if (formAuth) {
        session.setAttribute("formAuth", "true");
    }

    if (queryString != null) {
        url += "?" + HTML.encode(queryString);
    }

    if (!formAuth && (WebAppEnv.useAppServerSecurity() || mxSession.isConnected())) {
        response.sendRedirect(url);
        return;
    }

    userFieldName = "username";
    passwordFieldName = "password";

    if (WebAppEnv.useAppServerSecurity()) {
        userFieldName = "j_" + userFieldName;
        passwordFieldName = "j_" + passwordFieldName;
        url = "../../ui/j_security_check";
    } else {

        try {
            mxSession.setUserName(user);
            mxSession.setPassword(password);
            mxSession.connect();
            request.getSession().setAttribute("MXSession", mxSession);
        } catch (Exception e) {
            url = new java.net.URL(new java.net.URL(WebClientRuntime.getMaximoRequestURL(request)), "loginerror.jsp").toString();
            response.sendRedirect(url);
            return;
        }


        if (queryString != null && !queryString.isEmpty()) {
            // TODO: HTML.encode? In testing it corrupts the string and makes passing query strings
            // impossible
            url += "?" + queryString;
        }

        response.sendRedirect(url);
        //request.getRequestDispatcher("/").forward(request, response);
    }
} catch (Exception ex) {
    ex.printStackTrace();
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
    </head>
    <body onload="handleFormAuth()">
        <script language="javascript" type="text/javascript">
            function handleFormAuth() {
                var form = document.createElement("form");
                form.setAttribute("id", "guestloginform");
                form.setAttribute("method", "post");
                form.setAttribute("action", "<%=url%>");

                var user = document.createElement("input");
                user.setAttribute("type", "hidden");
                user.setAttribute("name", "<%=userFieldName%>");
                user.setAttribute("value", "<%=user%>");

                var password = document.createElement("input");
                password.setAttribute("type", "hidden");
                password.setAttribute("name", "<%=passwordFieldName%>");
                password.setAttribute("value", "<%=password%>");

                form.appendChild(user);
                form.appendChild(password);
                
                document.getElementsByTagName('body')[0].appendChild(form);
                document.forms["guestloginform"].submit();
            }
        </script>
    </body>
<html>

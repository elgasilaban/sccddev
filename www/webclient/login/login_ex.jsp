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
--%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%
	if ("1".equals(s.getProperty(WebClientConstants.WEBCLIENT_GUEST_LOGIN)))
	{
		String guestLoginLabel = MXServer.getMXServer().getMessage("login", "guestloginlabel", langcode);
		String guestLoginURL = s.getProperty(WebClientConstants.WEBCLIENT_GUEST_LOGIN_URL);
%>
		<tr>
			<td align="<%=reverseAlign%>" colspan="2">
				<div style="text-align: <%=reverseAlign%>">
					<form name="guestform" method="get" action="<%=guestLoginURL%>" onsubmit="showWait()">
						<button class="tiv_btn" type="submit" id="guestloginlink"><%=guestLoginLabel%></button>
					</form>
				</div>
				<br />
			</td>
		</tr>
<%	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.alphaworks.beans.evalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.alphaworks.beans.IamBean" />

<%
request.setCharacterEncoding("UTF-8");

aweval.setMessage("");
//
String action = request.getParameter("action");
if (action != null && action.equals("login"))
{
	//String nextPage = aweval.getNextPage();
	//if (nextPage.indexOf(".") != 0)
	//	nextPage = "." + nextPage;
	ident.setExportRoot(getServletContext().getRealPath("/"));
	ident.login(request);
    if (ident.getUid().equals("admin"))
    	response.sendRedirect("./tableman.jsp");
    else
    	response.sendRedirect("./index.jsp");
}
else if (action != null && action.equals("logout"))
{
	session.invalidate();
	ident.logout();
    response.sendRedirect("./login.jsp");
}
else
{
session.invalidate();
String title = "User Management: Login";
%>

<!-- basic headers -->	
<jsp:include page="/resource/fieraheaderNoBack.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
				/*
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] ="Manage Items";
					pageNav[1] ="Manage Surveys";
					pageNav[2] ="Manage Questions";
					pageNav[3] ="Manage HTML";
					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./itemman.jsp";
					pageNavTargets[1] ="./surveyman.jsp";
					pageNavTargets[2] ="./questionman.jsp";
					pageNavTargets[3] ="./htmlman.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				*/
				%>
			</td>
		</tr>
		<tr>
			<th>
				<font size=4><%= title %></font>
			</th>
		</tr>		
		<tr>
			<td>
			<I><%= ident.getMessage() %></I>
			<%
			ident.setMessage("");
			%>
			</td>
		</tr>				
		<tr>
			<td height=240 align="center">
<!-- basic headers -->

<table width=40%>
	<tr>
		<td>
			<FORM ACTION="./login.jsp" METHOD="POST">
		    <input type="hidden" name="action" value="login">
      		<table Width=90%>
      		<tr>
      			<td align="right">
      				<table cellpadding=5 border=1>
      					<tr>
      						<td>
  								Login&nbsp;ID:
  							</td>
  							<td>
  								<INPUT TYPE="TEXT" NAME="uid" >
  							</td>
  						</tr>
						<tr>
							<td>
							  Password:
							</td>
							<td>
							  <INPUT TYPE="PASSWORD" NAME="password">
							</td>
						</tr>
					    <tr>
					    	<td colspan=2>
					    		<center>
								    <INPUT TYPE="SUBMIT" VALUE="Login">
								</center>
						    </td>
					    </tr>
				    </table>
				</td>
				<td valign="bottom">
					<table>
						<tr>
							<td valign="bottom" align="left">
								New&nbsp;user&nbsp;<a href="./demoreg.jsp">registration</a>
							<td>
						</tr>
						<tr>
							&nbsp;
						</tr>
						<tr>
							<td>
								<a href="./loginbychallenge1.jsp">Password&nbsp;forgotten?</a>
								<!--
								<form action="./login.jsp"><input type="submit" value="Login"></form>
								-->
							</td>						
						</tr>
					</table>
				</td>
			</tr>
            </table>
			</FORM>
		</td>
	</tr>
</table>

<!-- basic footers -->
			</td>
		</tr>
		<jsp:include page="/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/resource/fierafooter.jsp" flush="true"/>
<!-- basic footers -->	
	<%
}
%>


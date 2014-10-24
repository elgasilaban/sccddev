<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />

<%
request.setCharacterEncoding("UTF-8");
boolean disp = true;
String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	if (!(ident.getUid().equals("admin")))
		{
		disp=false;
		aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
		ident.setMessage("You must be admin to work with user profiles");
		response.sendRedirect("./login.jsp");
		}	
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	disp = false;
	aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
	ident.setMessage("You must login to use fiera");
	response.sendRedirect("./login.jsp");
	}
if (disp)
	{
	String uid=request.getParameter("uid");
	if (uid==null)
		uid = ident.getUid();	
	String action = request.getParameter("action");
	if (action != null && action.equals("update"))
	{
		ident.updateWrkUser(request);
	    response.sendRedirect("./adminProfile.jsp?uid="+uid);
	}
	else if (action != null && action.equals("chgpwd"))
	{
		ident.changePassword(request);
	    response.sendRedirect("./adminProfile.jsp?uid="+uid);
	}
	else
	{

	ident.setWrkVars(uid);
	
	String title = "User Management: Update User Profile";
	%>
	
	<!-- basic headers -->	
	<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
		<table width="100%" border=1>
			<tr>
				<td align="center" valign="top">
					<%
						String [] pageNav = new String[3];
						int activeTab = 1;
						pageNav[0] ="Admin Reports";
						pageNav[1] ="User Mgmt";
						pageNav[2] ="Table Mgmt";
						
						String [] pageNavTargets = new String[3];
						pageNavTargets[0] ="./adminreport.jsp";
						pageNavTargets[1] ="./userman.jsp";
						pageNavTargets[2] ="./tableman.jsp";
						
						aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
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
				<td align="center">
			<!-- basic headers -->
					<table width=60% cellpadding="0" cellspacing="0">
						<tr>
							<td>
								<FORM action="./adminProfile.jsp"  method="post">
						      	<input type="hidden" name="action" value="update">
							      <table Width=90%>
								      <tr>
								      	<td valign="top">
									      <table cellpadding=5 border=1>
	      									<tr>
	      										<td>
												  Login&nbsp;ID:
											    </td>
											    <td>
											      <input type="hidden" name="uid" value="<%= ident.getWrkUid() %>">
												  <%= ident.getWrkUid() %>
												</td>
											</tr>
											<tr>
												<td>
												  First&nbsp;Name:
												</td>
												<td>
												  <INPUT TYPE="TEXT" NAME="firstName" value="<%= ident.getWrkFirstName() %>">
											    </td>
											</tr>
											<tr>
												<td>
												  Last&nbsp;Name:
	  											</td>
	  											<td>
												  <INPUT TYPE="TEXT" NAME="lastName" value="<%= ident.getWrkLastName() %>">
												</td>
											</tr>
										    <tr>
										    	<td>
												     Email&nbsp;Address:<br>
											     </td>
											     <td>
												    <INPUT TYPE="TEXT" NAME="email" value="<%= ident.getWrkEmail() %>">
												 </td>
											</tr>
										    <tr>
										    	<td>
												     Company&nbsp;Name:<br>
											     </td>
											     <td>
												    <INPUT TYPE="TEXT" NAME="company" value="<%= ident.getWrkCompanyName() %>">
												 </td>
											</tr>
											<tr>
												<td colspan=2><center>
												    Update Profile: <INPUT TYPE="SUBMIT" VALUE="Update"></center>
											    </td>
										    </tr>
									    </table>
									    </form>
									</td>
									<td>
										&nbsp;&nbsp;&nbsp;
									</td>
								    <td valign="top">
								    	<form name="change" action="./adminProfile.jsp" method="post">
								    	<input type="hidden" name="uid" value="<%= ident.getWrkUid() %>">
								    	<input type="hidden" name="action" value="chgpwd">								    	
										<table cellpadding="5" border="1">
										<%
										if (ident.getWrkUid().equals("admin"))
											{
											%> 
											<tr>
												<td>
													 Old&nbsp;Password:
												</td>
												<td>
												  <INPUT TYPE="PASSWORD" NAME="oldpass">
												</td>
											</tr>
											<%
											}
										%>
											<tr>
												<td>
													 New&nbsp;Password:
												</td>
												<td>
												  <INPUT TYPE="PASSWORD" NAME="newpass">
												</td>
											</tr>
											<tr>
												<td>
												  Repeat&nbsp;New&nbsp;Password:
												</td>
												<td>
													  <INPUT TYPE="PASSWORD" NAME="confirm">
												</td >
											</tr>
											<tr>
												<td colspan=2><center>
												    Change Password: <INPUT TYPE="SUBMIT" VALUE="Change">
											    </td>
										    </tr>
									    </table>
									    </form>
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
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
		</table>
	<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
	<!-- basic footers -->	
		<%
	}
}
%>


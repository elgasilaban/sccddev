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
System.err.println("\n arrivo in register.jsp ----- \n");

request.setCharacterEncoding("UTF-8");
boolean disp = true;


	String uid = "";
	uid = request.getParameter("uid");
	if (uid==null)
		uid = "";

	String firstName = "";
	firstName = request.getParameter("firstName");
	if (firstName==null)
		firstName = "";

	String lastName = "";
	lastName = request.getParameter("lastName");
	if (lastName==null)
		lastName = "";
		
	String email = "";
	email = request.getParameter("email");
	if (email==null)
		email = "";
		
	String company = "";
	company = request.getParameter("company");
	if (company==null)
		company = "";

String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	if (!(ident.getUid().equals("admin")))
		{
		disp=false;
		aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
		ident.setMessage("You must be admin to register users");
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
	
	String action = request.getParameter("action");
	if (action != null && action.equals("add"))
	{
		if (ident.addUser(request))
	    	response.sendRedirect("./register.jsp");
	    else
	    	response.sendRedirect("./register.jsp?uid="+uid+"&firstName="+firstName+"&lastName="+lastName+"&email="+email+"&company="+company);

	}
	else
	{
	String title = "User Management: Add User";
	%>
	
	<!-- basic headers -->	
	<jsp:include page="/webclient/survey/webclient/survey/resource/fieraheader.jsp" flush="true"/>
		<table width="100%" border=1>
			<tr>
				<td align="center" valign="top">
					<%
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
								<FORM action="./register.jsp"  method="post">
						      	<input type="hidden" name="action" value="add">
							      <table Width=90%>
								      <tr>
								      	<td>
									      <table cellpadding=5 border=1>
	      									<tr>
	      										<td>
												  Login&nbsp;ID:
											    </td>
											    <td>
												  <INPUT TYPE="TEXT" NAME="uid" value="<%= uid %>" maxlength="16"><BR>
												</td>
											</tr>
											<tr>
												<td>
												  First&nbsp;Name:
												</td>
												<td>
												  <INPUT TYPE="TEXT" NAME="firstName" value="<%= firstName %>" maxlength="40">
											    </td>
											</tr>
											<tr>
												<td>
												  Last&nbsp;Name:
	  											</td>
	  											<td>
												  <INPUT TYPE="TEXT" NAME="lastName" value="<%= lastName %>" maxlength="60">
												</td>
											</tr>
										    <tr>
										    	<td>
												     Email&nbsp;Address:<br>
											     </td>
											     <td>
												    <INPUT TYPE="TEXT" NAME="email" value="<%= email %>" maxlength="100">
												 </td>
											</tr>
										    <tr>
										    	<td>
												     Company&nbsp;Name:<br>
											     </td>
											     <td>
												    <INPUT TYPE="TEXT" NAME="company" value="<%= company %>" maxlength="100">
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
												<td>
												  Repeat Password:
												</td>
												<td>
													  <INPUT TYPE="PASSWORD" NAME="confirm">
												</td >
											</tr>
											<tr>
												<td colspan=2><center>
												    <INPUT TYPE="SUBMIT" VALUE="Add"></center>
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
		<jsp:include page="/webclient/survey/webclient/survey/resource/redir.jsp" flush="true"/>
		</table>
	<jsp:include page="/webclient/survey/webclient/survey/resource/fierafooter.jsp" flush="true"/>
	<!-- basic footers -->	
		<%
	}
}
%>


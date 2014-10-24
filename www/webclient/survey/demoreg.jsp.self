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

	String cquestion = "";
	cquestion = request.getParameter("cquestion");
	if (cquestion==null)
		cquestion = "";

	String canswer = "";
	canswer = request.getParameter("canswer");
	if (canswer==null)
		canswer = "";
		

String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
if (disp)
	{	
	String action = request.getParameter("action");
	if (action != null && action.equals("add"))
	{
		if (ident.addDemoUser(request))
	    	response.sendRedirect("./login.jsp");
	    else
	    	response.sendRedirect("./demoreg.jsp?uid="+uid+"&firstName="+firstName+"&lastName="+lastName+"&email="+email+"&company="+company+"&cquestion="+cquestion+"&canswer="+canswer);
	}
	else
	{
	String title = "User Management: Add User";
	%>
	
	<!-- basic headers -->	
	<jsp:include page="/resource/fieraheader.jsp" flush="true"/>
		<table width="100%" border=1>
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
								<FORM action="./demoreg.jsp"  method="post">
						      	<input type="hidden" name="action" value="add">
							      <table Width=90%>
								      <tr>
								      	<td>
									      <table cellpadding=5 border=0>
	      									<tr>
	      										<td>
												  <strong>Login&nbsp;ID:</strong>
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
												<td colspan=2"><hr></td>
											<tr>
											<tr>
												<td colspan=2"><center>Provide a challenge question and answer for use if you forget your password</center></td>
											<tr>											
											<tr>
												<td colspan=2"><hr></td>
											<tr>											
												<td>
													 Challenge Question:
												</td>
												<td>
													<INPUT TYPE="TEXT" MAXLENGTH="80" size="50" NAME="cquestion">
												</td>
											</tr>
											<tr>
												<td>
												  Challenge Response:
												</td>
												<td>
													<INPUT TYPE="TEXT" MAXLENGTH="80" size="50" NAME="canswer">
												</td >
											</tr>
											<tr>
												<td>
													 Password:<br> (6&nbsp;or&nbsp;more&nbsp;characters)
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
		<jsp:include page="/resource/redir.jsp" flush="true"/>
		</table>
	<jsp:include page="/resource/fierafooter.jsp" flush="true"/>
	<!-- basic footers -->	
		<%
	}
}
%>


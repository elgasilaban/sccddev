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
aweval.setMessage("");
String action = request.getParameter("action");
if (action != null && action.equals("chall"))
{
	//String nextPage = aweval.getNextPage();
	//if (nextPage.indexOf(".") != 0)
	//	nextPage = "." + nextPage;
	ident.loginbychallenge(request);
       response.sendRedirect("./profile.jsp");
}
else if (action != null && action.equals("logout"))
{
	ident.logout();
    response.sendRedirect("./login.jsp");
}
else
{
String title = "User Management: Login by challenge";
%>

<!-- basic headers -->	
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
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
			<FORM ACTION="./loginbychallenge1.jsp" METHOD="POST">
		    <input type="hidden" name="action" value="chall">
      		<table Width=90%>
      		<tr>
      			<td>
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
							  Challenge&nbsp;Question:
							</td>
							<td>
							  <INPUT TYPE="text" NAME="cquestion" size="50" maxlength="80">
							</td>
						</tr>
						<tr>
							<td>
							  Challenge&nbsp;Answer:
							</td>
							<td>
							  <INPUT TYPE="text" NAME="canswer" size="50" maxlength="80">
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
			</tr>
            </table>
			</FORM>
		</td>
	</tr>
	<tr>
		<td>
			<center>If still having difficulty logging in contact your local administrator.</center>
		</td>
	</tr>
	<tr>
		<td>
			&nbsp;
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
%>


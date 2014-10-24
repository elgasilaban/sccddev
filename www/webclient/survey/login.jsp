<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar,com.ibm.tsd.pmcom.survey.Messages"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />

<%
//System.err.println("\n arrivo in login.jsp ----- \n");

request.setCharacterEncoding("UTF-8");
aweval.setMessage("");
String action = request.getParameter("action");
if (action != null && action.equals("login"))
{
	//String nextPage = aweval.getNextPage();
	//if (nextPage.indexOf(".") != 0)
	//	nextPage = "." + nextPage;
	//ident.login(request);
    //response.sendRedirect(nextPage);
    if (ident.getUid().equals("admin"))
    	response.sendRedirect("./tableman.jsp");
    else
    	response.sendRedirect("./index.jsp");

	//System.err.println("\n arrivo in login.jsp ----- ident.getUid() = "+ident.getUid()+"\n Going to index.jsp");
}
else if (action != null && action.equals("logout"))
{
	//ident.logout();
    response.sendRedirect("./login.jsp");
}
else
{
String title = Messages.getString("LOGIN_CLOSE_BROWSER");
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
			<%
			ident.setMessage("");
			%>
			</td>
		</tr>				
		<tr>
			<td height=240 align="center">
<!-- basic headers -->

<table width=60%>
	<tr>
		<td>
			<FORM ACTION="./login.jsp" METHOD="POST">
		    <input type="hidden" name="action" value="login">
      		<table Width=100%>
      		<tr>
      			<td>
      				<table cellpadding=3 border=0>
      					<tr>
      						<td><%=Messages.getString("LOGIN_SESSION_EXPIRED")%>  							</td>
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
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<!-- basic footers -->	
	<%
}
%>


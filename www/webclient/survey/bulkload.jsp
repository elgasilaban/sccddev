<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
	ident.setMessage("You must login to use fiera");
	response.sendRedirect("./login.jsp");
	}
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
%>
<%
	
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";

    String action = request.getParameter("action");

    if (action==null) 
    	{
    	%>
    	<jsp:forward page="./bulkload.jsp">
    		<jsp:param name="action" value="nop"/>
    	</jsp:forward>
    	<%
		//response.sendRedirect("./bulkload.jsp?action=&"+request.getQueryString());
    	}

// -- upload
    if (action.equals("loaddata"))
    {
   	aweval.loadItemBulk(request, uid);
    response.sendRedirect("./bulkload.jsp?action=");
    }
	else 
	{
	Connection connection = aweval.getConnection();
	String qry = "";
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String title = "HTML&nbsp;Management:&nbsp;Upload&nbsp;for&nbsp;HTML";
	
	%>
<!-- basic headers -->	
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] ="Manage Surveys";
					pageNav[1] ="Create Simple HTML";
					pageNav[2] ="Manage HTML for Items";
					pageNav[3] ="Manage HTML for Surveys";					
			
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./surveyman.jsp";
					pageNavTargets[1] ="./simpleHtml.jsp";
					pageNavTargets[2] ="./htmlman.jsp";
					pageNavTargets[3] ="./htmlman2.jsp";					
					
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
			<td colspan=3>
				<I><%= aweval.getMessage() %></I>
				<%
				aweval.setMessage("");
				%>
			</td>
		</tr>		
		<tr>
			<td height=240 align="center">
<!-- basic headers -->
	<table border=0 width=100%>
		<tr>
			<td colspan=3>
				<table border=1>
					<tr>
						<td>					
							<form name="encform" enctype="multipart/form-data"	action="./bulkload.jsp?action=loaddata" method="post">			
								<table cellspacing=5 border=0  width=100%>						
									<tr>
										<td>
											<B><label for="h1">Data File:</label></B>
										</td>
										<td>
											<input id="h1" type="FILE" name="inputdata" size="50" maxlength="255" >
										</td>
									</tr>
									<tr>
										<td>
											<table>
												<tr>
													<td>
														<INPUT TYPE="HIDDEN" NAME="action" VALUE="upload">
														<label for="h2"><INPUT TYPE="SUBMIT" VALUE="Load:"></label>
													</td>
												</tr>
											</table>	
										</td>
									</tr>
								</table>
							</form>
						</td>
					</tr>
				</table>
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
	connection.close();
	}
%>



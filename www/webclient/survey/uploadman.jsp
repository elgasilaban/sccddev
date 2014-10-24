<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,com.ibm.tsd.pmcom.survey.Messages"%>

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
    	<jsp:forward page="./uploadman.jsp">
    		<jsp:param name="action" value="nop"/>
    	</jsp:forward>
    	<%
		//response.sendRedirect("./uploadman.jsp?action=&"+request.getQueryString());
    	}

// -- upload
    if (action.equals("upload"))
    {
    if (aweval.authHtml(uid,request))
    	aweval.uploadHTML(request, uid);
    response.sendRedirect("./uploadman.jsp?action=");
    }
// -- remove HTML completely
	else if (action.equals("remove"))
    {
    if (aweval.authHtml(uid,request))
    	aweval.removeHTML(request, uid);
    response.sendRedirect("./uploadman.jsp?action=");
    }

	else 
	{
	Connection connection = aweval.getConnection();
	String qry = "";
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	//String title = "HTML&nbsp;Management:&nbsp;Upload&nbsp;for&nbsp;HTML";
	String title = Messages.getString("UPLOADMAN_TITLE");
	
	%>
<!-- basic headers -->	
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%= title %></H3>
	</DIV>

	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] = Messages.getString("INDEX_PAGENAV_2");
					pageNav[1] = Messages.getString("ITEMMAN_PAGENAV_2");
					pageNav[2] = Messages.getString("UPLOADMAN_PAGENAV_1");
					pageNav[3] = Messages.getString("HTMLMAN_PAGENAV_3");					
			
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
							<form name="encform" enctype="multipart/form-data"	action="./uploadman.jsp?action=upload" method="post">			
								<table cellspacing=5 border=0  width=100%>						
									<tr>
										<td>
											<B><label for="h1"><%=Messages.getString("UPLOADMAN_HEADER_FILE")%>:</label></B>
										</td>
										<td>
											<input id="h1" type="FILE" name="header" size="50" maxlength="255" >
										</td>
									</tr>
									<tr>
										<td>
											<B><label for="f1"><%=Messages.getString("UPLOADMAN_FOOTER_FILE")%>:</label></B>
										</td>
										<td>
											<input id="f1" type="FILE" name="footer" size="50" maxlength="255" >
										</td>
									</tr>
									<tr>
										<td>
											<table>
												<tr>
													<td>
														<INPUT TYPE="HIDDEN" NAME="action" VALUE="upload">
														<label for="h2"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("UPLOADMAN_SAVE_AS")%>:></label>
													</td>
													<td>
														<select id="h2" name="hid">
															<%
															   qry = "select hid, refname from survey_html where "+uidClause+"  order by hid";
															   rs = stmt.executeQuery(qry);
															 %>
															<option value="New:"><%=Messages.getString("UPLOADMAN_NEW_HTML")%>:
															<%
															while(rs.next())
															{
															%>
															  <option value="<%= rs.getString("hid") %>">HTML-<%= rs.getString("hid")  + " ("+rs.getString("refname")+")" %>
															<%
															}
															%>
														</select>
													</td>
												</tr>
											</table>	
										</td>
										<td>
											<table>
												<tr>
													<td>
														<b><label for="h3"><%=Messages.getString("UPLOADMAN_HTML_NEW")%>:</label></b>
													</td>
													<td>
														<input id="h3" type="text" name="refname" size="12" maxlength="12" >
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
		<tr>
			<td colspan=3>
				<hr>
			</td>
		</tr>
		<tr>
			<td>
				<table border=0 width=100%>
					<tr>
						<td>
							<FORM name=list ACTION="./htmlview.jsp"  METHOD="GET">
								<table>
									<tr>									
										<td>	
											<label for="sh1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("UPLOADMAN_SHOW_HTML")%>:></label>
										</td>
										<td>
											<select id="sh1" name="hid">
												<%
												qry = "select hid, refname from survey_html where "+uidClause+" order by hid";
												rs = stmt.executeQuery(qry);									
												while(rs.next())
												{
												%>
												  <option value="<%= rs.getString("hid") %>">HTML-<%= rs.getString("hid") + " ("+rs.getString("refname")+")" %>
												<%
												}
												%>
											</select>
										</td>
									</tr>
								</table>
							</FORM>
						</td>						
						<td align="right">
							<form name=list action="./uploadman.jsp"  method="GET">					
								<table>
									<tr>
										<td>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="remove">
											<label for="hr1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%>:></label>
										</td>
										<td>
											<select id="hr1" multiple size=3 name="hid">
												<%
												qry = "select hid, refname from survey_html where "+uidClause+" order by hid";
												rs = stmt.executeQuery(qry);
												while(rs.next())
												{
												%>
												  <option value="<%= rs.getString("hid") %>">HTML-<%= rs.getString("hid")  + " ("+rs.getString("refname")+")" %>
												<%
												}
												%>
												</select>
										</td>
									</tr>
								</table>
							</FORM>	
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
	aweval.setLastPage("./uploadman.jsp");
	connection.close();
	}
%>



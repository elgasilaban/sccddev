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
//System.err.println("\n arrivio in surveyman.jsp ----- \n");

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
//	String uidClause = " userid='"+uid+"' ";

    String uidClause = "userid like '%' ";

	String action = request.getParameter("action");

if (action == null)
	action = "";
//Delete a survey
if (action.equals("remove")) {
	if (aweval.authSurvey(uid,request))
		aweval.removeSurvey(request, ident.getUid());
	response.sendRedirect("./surveyman.jsp");
	}
//Make a survey the Default survey
else if (action.equals("activate")) {
	if (aweval.authSurvey(uid,request))	
		aweval.setDefaultSurvey(request,uid);
	response.sendRedirect("./surveyman.jsp");
	}
else if (action.equals("clone")) {
	if (aweval.authSurvey(uid,request))	
		aweval.copySurvey(request,uid);
	response.sendRedirect("./surveyman.jsp");
	}	
//Assign an HTML to a Survey
else if (action.equals("asssid")) {
	if (aweval.authSurvey(uid,request) && aweval.authHtml(uid,request))
		aweval.assignHTMLToSurveys(request, uid);
	response.sendRedirect("./surveyman.jsp");	
	}	
else
{
	aweval.setLastPage("./surveyman.jsp");
	String type = "U";
	String standard = request.getParameter("standard");
	
	Connection connection = aweval.getConnection();
	Connection connection2 = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
	
	ResultSet rsLoad = null;

	//String title = "Survey&nbsp;Management:&nbsp;for&nbsp;HTML";
	String title = Messages.getString("SURVEYMAN_TITLE");

%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%= title %></H3>
	</DIV>


	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					/*pageNav[0] ="Create New Survey";
					pageNav[1] ="Manage Survey Questions";
					pageNav[2] ="Manage Surveys for Items";*/
	
					pageNav[0] = Messages.getString("SURVEYMAN_PAGENAV_1");
					//pageNav[1] = Messages.getString("SURVEYMAN_PAGENAV_2");
					pageNav[1] = Messages.getString("SURVEYMAN_PAGENAV_3");

					
					String [] pageNavTargets = new String[2];
					pageNavTargets[0] ="./editStandardSurvey.jsp";
					//pageNavTargets[1] ="./standardQuestions.jsp";
					pageNavTargets[1] ="./surveyman2.jsp?dtype=all";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
		
			<tr>
				<td>
					<I></I>
					<%
					aweval.setMessage("");
					%>
				</td>
			</tr>		
		<tr>
			<td height=240 align="center">
			<%
				String qryLoad =
					"select sid, active, case when refname is not null then refname else '' end refname from survey_surveys where "+uidClause+" order by active, sid";
				rsLoad = stmt.executeQuery(qryLoad);
				%>
				<table>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>				
					<tr>
						<td>
							<table border=1 cellspacing="0" cellpadding="2">
							<tr abgcolor="#9999ff"  class="headerbar">
								<th  class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("INDEX_COLUMN_HEADING_Survey")%></th>
								<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("SURVEYMAN_BUTTON_EDIT")%><%=Messages.getString("INDEX_COLUMN_HEADING_Survey")%></th>
								<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("SURVEYMAN_COLUMN_HEADING_3")%></th>
								<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("SURVEYMAN_COLUMN_HEADING_4")%></th>
								<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("SURVEYMAN_COLUMN_HEADING_5")%></th>
							</tr>
							
								<%
								String sid = "";
								int pageSize = 5;
								int pageCnt = 5;
								int spos = 0;	
								String sposString = request.getParameter("spos");
								if (sposString != null)
									spos = Integer.parseInt(sposString);
								int rowcnt=0;
								String rowcolor = "#9999ff";
								while (rsLoad.next()) // Begin Table Loop
								{
								if (rowcnt++ < spos*pageSize || rowcnt > ((spos+1)*pageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
										
								sid = rsLoad.getString("sid");
								%>
								<tr bgcolor="<%= rowcolor %>">
									<td> 
										<a href="./surveyView.jsp?sid=<%=rsLoad.getString("sid")%>">Survey:&nbsp;<%=rsLoad.getString("sid")%></a>&nbsp;(<%= rsLoad.getString("refname") %>)
									</td>
									<td>
										<form action="./editStandardSurvey.jsp">
										<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>">
										<INPUT TYPE="HIDDEN" NAME="action" VALUE="edit">
										<INPUT TYPE="submit" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_EDIT")%>>
										</form>
									</td>
									<td>
											<%
											if (rsLoad.getString("active").equals("A"))
											{
											%>
											&nbsp;&nbsp;<%=Messages.getString("SURVEYMAN_COLUMN_HEADING_3")%>			
											<%
											}
											else
											{
											%>
											<form action="./surveyman.jsp">
											<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>">
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="activate">
											<INPUT TYPE="submit" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_DEFAULT")%>>
											</form>						
											<%
											}
											%>
									</td>
									<td>
										<form action=./surveyman.jsp><INPUT TYPE="HIDDEN" NAME="action" VALUE="asssid">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td> 
														<INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_APPLY_HTML")%>>
														<label for="h1<%= rsLoad.getString("sid") %>"><INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>"></label>
													</td>
													<td>
														<select id="h1<%= rsLoad.getString("sid") %>" name="hid">
															<option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>										
															<%
															Statement stmt2 = connection2.createStatement();
															String hid = "";
															String checked = "";																							
															qry = "select hid from survey_surveys where "+uidClause+" and sid="+sid;	
																													
															rs = stmt2.executeQuery(qry);
															if (rs.next())
																hid = rs.getString("hid");
															if (hid==null) hid = "";
																																	
															String qryb = "select hid, refname from survey_html where "+uidClause+" ";
															Statement stmtb = connection2.createStatement();
															
															ResultSet rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	checked = "";
																	if (hid.equals(rsb.getString("hid").trim()))
																		{
																		checked = "selected";
																		}
																	%>
																	<option value="<%= rsb.getString("hid") %>"  <%= checked %>><%= rsb.getString("hid") + " ("+rsb.getString("refname")+")" %>
																	<%
																}				
															%>
														</select>
													</td>
												</tr>
											</table>
										</form>
									</td>
									<td>
										<form action="./surveyman.jsp">
										<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>">
										<INPUT TYPE="HIDDEN" NAME="action" VALUE="clone">
										<INPUT TYPE="submit" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_CLONE")%>>
										</form>
									</td>															
								</tr>
							<%
							}  // End Table Loop
							%>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%">
								<tr>
									<td valign="top">
										<%=Messages.getString("INDEX_PAGE")%>: 
										<%
											aweval.pageCount(out, "./surveyman.jsp?spos=", spos, rowcnt-1, pageCnt, pageSize);
										%>
									</td>
									<td align="right">
										<form name=list action="./surveyman.jsp"  method="GET">
											<table>
												<tr>
													<td>
														<INPUT TYPE="HIDDEN" NAME="action" VALUE="remove">
														<label for="s1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_REMOVE_SURVEY")%>:></label>
													</td>
													<td>
														<select id="s1" name="sid" multiple size="4">
															<%
														   	qry = "select sid, case when refname is not null then refname else '' end refname from survey_surveys where "+uidClause+" order by sid";
														   	//stmt = connection.createStatement();
														   	rs = stmt.executeQuery(qry);
															while(rs.next())
															{
															%>
														  	<option value="<%= rs.getString("sid") %>"><%= rs.getString("sid") %><%= " ("+rs.getString("refname")+")" %>
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
					<tr>		
				</table>
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%

stmt.close();
connection2.close();
connection.close();
}
%>


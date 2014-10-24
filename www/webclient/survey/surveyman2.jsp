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

//System.err.println("\n  arrivio in surveyman2.jsp -----  ");

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
	response.sendRedirect("./surveyman2.jsp");
	}
//Make a survey the Default survey
else if (action.equals("activate")) {
	if (aweval.authSurvey(uid,request))
		aweval.setDefaultSurvey(request,uid);
	response.sendRedirect("./surveyman2.jsp");
	}
//Assign a survey to items
else if (action.equals("asssuritem")) {
	if (aweval.authSurvey(uid,request) && aweval.authItem(uid,request))
		aweval.assignSurveyToItems(request);
	response.sendRedirect("./surveyman2.jsp");	
	}
//Remove the survey from items	
else if (action.equals("remsuritem")) {
	if (aweval.authSurvey(uid,request) && aweval.authItem(uid,request))
		aweval.removeSurveyFromItems(request);
	response.sendRedirect("./surveyman2.jsp");	
	}	
else
	{
	aweval.setLastPage("./surveyman2.jsp");
	String type = "U";

	String standard = request.getParameter("standard");
	
	Connection connection = aweval.getConnection();
	Connection connection2 = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
	
	ResultSet rsLoad = null;

	//String title = "Survey&nbsp;Management:&nbsp;for&nbsp;Items";	
		String title = Messages.getString("SURVEYMAN_PAGENAV_3");
%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[0];
                    String [] pageNavTargets = new String[0];
					int activeTab = 1;
					/*pageNav[0] ="Create New Survey";
					pageNav[1] ="Manage Survey Questions";
					pageNav[2] ="Manage Survey HTML";

					
					
					pageNavTargets[0] ="./editStandardSurvey.jsp";
					pageNavTargets[1] ="./standardQuestions.jsp";
					pageNavTargets[2] ="./surveyman.jsp?dtype=all";*/
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
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
				<I><%= aweval.getMessage() %></I>
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
    //System.err.println("\n  arrivio in surveyman2.jsp -----  qryLoad = "+qryLoad);
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
					<th   class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("INDEX_COLUMN_HEADING_Survey")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("SURVEYMAN_BUTTON_EDIT")%> <%=Messages.getString("INDEX_COLUMN_HEADING_Survey")%></th>
					<th   class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_2")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_3")%></th>
				</tr>				
					<%
					String sid = "";
					
					int pageCnt = 5;
					int pageSize = 5;
					
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
							<form action=./surveyman2.jsp>
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="remsuritem">
								<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
					
					                String qrya = "select sid from survey_itemid where "+uidClause+" and sid ="+sid;

									Statement stmta = connection2.createStatement();
									ResultSet rsa = stmta.executeQuery(qrya);
									if (rsa.next())
									{
									%>
						
										<td>
											<label for="i1<%= rsLoad.getString("sid") %>"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_REMOVE_FROM")%>:></label>
										</td>
										<td>
											<select id="i1<%= rsLoad.getString("sid") %>" name="itemid" multiple size=3>
												<%
												qrya = "select itemid,itemshortname from survey_itemid where "+uidClause+" and sid ="+sid;
												//stmta = connection.createStatement();
												rsa = stmta.executeQuery(qrya);
												while (rsa.next()) {
												%>
												<option value="<%=rsa.getString("itemid")%>"><%=rsa.getString("itemshortname")%>
												<%
												}
												%>
											</select>
										</td>
									<%
									}
									else
									{
									%>
									<td>&nbsp;<%=Messages.getString("HTMLMAN_COLUMN_HEADING_5")%></td>
									<%
									}
									%>
									</tr>
								</table>
							</form>
						</td>
						
						<td>
							<form action=./surveyman2.jsp>
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="asssuritem">
								<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= rsLoad.getString("sid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
									String qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and  (sid is null or sid <>"+sid+") order by itemid";
    
	//System.err.println("\n 111 arrivio in surveyman2.jsp -----  qryc = "+qryc);

									Statement stmtc = connection2.createStatement();
									ResultSet rsc = stmtc.executeQuery(qryc);
									if (rsc.next())
									{
									%>
									
										<td>
											<label for=i2<%= rsLoad.getString("sid") %>"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_APPLY_TO")%>:></label>
										</td>
										<td>
											<select id=i2<%= rsLoad.getString("sid") %>" name="itemid" multiple size=3>
												<%
												qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (sid is null or sid <>"+sid+") order by itemid";

	//System.err.println("\n2222 arrivio in surveyman2.jsp -----  qryc = "+qryc);

												//stmtc = connection.createStatement();
												rsc = stmtc.executeQuery(qryc);
												while (rsc.next()) {
												%>
												<option value="<%=rsc.getString("itemid")%>"><%=rsc.getString("itemshortname")%>
												<%
												}
												%>
											</select>
										</td>
									<%
									}
									else
									{
									%>
									<td>&nbsp;Assigned to all</td>
									<%
									}
									%>
									</tr>
								</table>
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
			<td valign="top">
				<table width="100%">
					<tr>
						<td valign="top">
							<%=Messages.getString("INDEX_PAGE")%>: 
							<%
								aweval.pageCount(out, "./surveyman2.jsp?spos=", spos, rowcnt-1, pageCnt, pageSize);
							%>
						</td>
						<td align="right">
							<form name=list action="./surveyman2.jsp"  method="GET">
								<table>
									<tr>
										<td>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="remove">
											<label for="s1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_REMOVE_ITEMS")%>:></label>
										</td>
										<td>
											<select id="s1"name="sid" multiple size=3>
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
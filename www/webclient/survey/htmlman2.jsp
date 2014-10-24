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

//System.err.println("\n arrivio in htmlman2.jsp ----- \n");

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
	//String uidClause = " userid='"+uid+"' ";
	
    String uidClause = "userid like '%' ";
	
	String action = request.getParameter("action");

if (action == null)
	action = "";
// -- remove HTML completely
    if (action.equals("remove"))
    {
    if (aweval.authHtml(uid,request))
    	aweval.removeHTML(request, uid);
    response.sendRedirect("./htmlman2.jsp?action=");
    }
// -- remove HTML from specified surveys
    else if (action.equals("resetsid"))
    {
    if (aweval.authHtml(uid,request) && aweval.authSurvey(uid,request))
    	aweval.resetSurveyHTML(request);
    response.sendRedirect("./htmlman2.jsp?action=");
    }
// -- assign html to a survey
	else if (action.equals("asssid"))
	{
	if (aweval.authHtml(uid,request) && aweval.authSurvey(uid,request))
		aweval.assignHTMLToSurveys(request, uid);
	response.sendRedirect("./htmlman2.jsp?action=");
	}    
else
	{	
	String type = "U";
	//String msg = aweval.getMessage();

	String standard = request.getParameter("standard");
	
	Connection connection = aweval.getConnection();
	Connection connection2 = aweval.getConnection();	
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
	
	ResultSet rsLoad = null;
	//String title = "HTML&nbsp;Management:&nbsp;for&nbsp;Surveys";
	String title = Messages.getString("HTMLMAN_PAGENAV_3");
%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%=title%></H3>
	</DIV>

	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					//pageNav[0] ="Upload new HTML";
					//pageNav[0] ="Create Simple HTML";					
					//pageNav[1] ="Manage HTML for Items";
					//pageNav[2] ="Manage Item Questions";

					pageNav[0] = Messages.getString("ITEMMAN_PAGENAV_2");
					pageNav[1] = Messages.getString("UPLOADMAN_PAGENAV_1");


					
					String [] pageNavTargets = new String[2];
					//pageNavTargets[0] ="./uploadman.jsp";
					pageNavTargets[0] ="./simpleHtml.jsp?action=";					
					pageNavTargets[1] ="./htmlman.jsp";
					//pageNavTargets[2] ="./evalreport.jsp?dtype=all";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
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
		"select hid, case when isdefault is null then '0' else isdefault end isdefault, case when refname is not null then refname else '' end refname from survey_html where "+uidClause+" order by isDefault desc, hid";

	//System.err.println("\n arrivio in htmlman2.jsp ----- qryLoad = "+qryLoad);

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
				<tr abgcolor="#9999ff" class="headerbar">
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_1")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_2")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_3")%> </th>
				</tr>
					<%
					String hid = "";
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
					hid = rsLoad.getString("hid");
					%>
					<tr bgcolor="<%= rowcolor %>">
						<td>
							<a href="./htmlview.jsp?hid=<%=rsLoad.getString("hid")%>">HTML:&nbsp;<%=rsLoad.getString("hid")%></a>&nbsp;(<%= rsLoad.getString("refname") %>)
						</td>
						<!--
						<td>
							<form action="./editStandardHTML.jsp">
							<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
							<INPUT TYPE="HIDDEN" NAME="action" VALUE="edit">
							<INPUT TYPE="submit" VALUE="Edit">
							</form>
						</td>
						-->
						<td>
							<form action=./htmlman2.jsp>
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="resetsid">
								<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
									String qrya = "select hid from survey_surveys where "+uidClause+" and hid ="+hid;
									Statement stmta = connection2.createStatement();
									ResultSet rsa = stmta.executeQuery(qrya);
									if (rsa.next())
									{
									%>
						
										<td>
											<label for="s1<%= rsLoad.getString("hid") %>"><INPUT TYPE="SUBMIT" VALUE="Remove from:"></label>
										</td>
										<td>
											<select id="s1<%= rsLoad.getString("hid") %>" name="sid" multiple size="4">
												<%
												qrya = "select sid,refname from survey_surveys where "+uidClause+" and hid ="+hid+" order by sid";
												//stmta = connection.createStatement();
												rsa = stmta.executeQuery(qrya);
												while (rsa.next()) {
												%>
												<option value="<%=rsa.getString("sid")%>"><%=rsa.getString("sid")%> (<%=rsa.getString("refname")%>)
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
							<form action="./htmlman2.jsp">
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="asssid">
								<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
									String qryc = "select sid, refname from survey_surveys where "+uidClause+" and (hid is null or hid <>"+hid+") order by sid";
									Statement stmtc = connection2.createStatement();
									ResultSet rsc = stmtc.executeQuery(qryc);
									if (rsc.next())
									{
									%>
									<td>
											<label for="s2<%= rsLoad.getString("hid") %>"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_APPLY_TO")%>:></label>
										</td>
										<td>
											<select id="s2<%= rsLoad.getString("hid") %>" name="sid" multiple size="4">
												<%
												//qryc = "select itemid, itemshortname from survey_itemid where hid is null or hid <>"+hid+" order by itemid";
												//stmtc = connection.createStatement();
												rsc = stmtc.executeQuery(qryc);
												while (rsc.next()) {
												%>
												<option value="<%=rsc.getString("sid")%>"><%=rsc.getString("sid")%>(<%=rsc.getString("refname")%>)
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
					}
					%>
	
					
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table width="100%" border=0>
					<tr>
						<td valign="top">
							<%=Messages.getString("INDEX_PAGE")%>: 
							<%
								aweval.pageCount(out, "./htmlman2.jsp?spos=", spos, rowcnt, pageCnt, pageSize);
							%>						
						</td>
						<td align="right">
							<form name=list action="./htmlman2.jsp"  method="GET">
								<table>
									<tr>
										<td>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="remove">
											<label for="h1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_APPLY_TO")%>:></label>
										</td>
										<td>
											<select id="h1" name="hid" multiple size="4">
												<%
											   	qry = "select hid, case when refname is not null then refname else '' end refname from survey_html where "+uidClause+" order by hid";
											   	rs = stmt.executeQuery(qry);
												while(rs.next())
												{
												%>
											  	<option value="<%= rs.getString("hid") %>"><%= rs.getString("hid") %><%= " ("+rs.getString("refname")+")" %>
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
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
	
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<% 
aweval.setLastPage("./htmlman2.jsp?spos="+spos);
stmt.close();
connection2.close();
connection.close();
	}
%>


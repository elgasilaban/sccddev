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
%>
<%
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
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
    response.sendRedirect("./htmlman.jsp");    
    }
// -- assign HTML to specified items
else if (action.equals("asshtmlitem"))
    {
    if (aweval.authHtml(uid,request) && aweval.authItem(uid,request))
    	aweval.assignHTMLToItems(request);
    response.sendRedirect("./htmlman.jsp");
    }
// -- remove HTML from specified items
else if (action.equals("remhtmlitem"))
    {
    if (aweval.authHtml(uid,request) && aweval.authItem(uid,request))
        aweval.resetItemHTML(request);
    response.sendRedirect("./htmlman.jsp");
    }
// -- assign html to a survey
else if (action.equals("asssid"))
	{
//	System.out.println(aweval.authHtml(uid,request) +"   "+ aweval.authSurvey(uid,request))
	if (aweval.authHtml(uid,request) && aweval.authSurvey(uid,request))
		aweval.assignHTMLToSurveys(request, uid);
	response.sendRedirect("./htmlman.jsp");
	}         
else  
	{	
	String type = "U";

	String standard = request.getParameter("standard");
	
	Connection connection = aweval.getConnection();
	Connection connection2 = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
	
	ResultSet rsLoad = null;
	//String title = "HTML&nbsp;Management:&nbsp;for&nbsp;Items";
	String title = Messages.getString("HTMLMAN_TITLE");
	

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
					/*pageNav[0] ="Upload new HTML";
					pageNav[1] ="Create Simple HTML";
					pageNav[2] ="Manage HTML for Surveys";*/
					//pageNav[0] = Messages.getString("HTMLMAN_PAGENAV_1");
					pageNav[0] = Messages.getString("HTMLMAN_PAGENAV_2");
					pageNav[1] = Messages.getString("HTMLMAN_PAGENAV_3");

					
					String [] pageNavTargets = new String[2];
					//pageNavTargets[0] ="./uploadman.jsp";
					pageNavTargets[0] ="./simpleHtml.jsp?action=";
					pageNavTargets[1] ="./htmlman2.jsp";
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
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_1")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_2")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_3")%></th>
					<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("HTMLMAN_COLUMN_HEADING_4")%></th>
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
							<a href="htmlview.jsp?hid=<%=rsLoad.getString("hid")%>">HTML:&nbsp;<%=rsLoad.getString("hid")%></a>&nbsp;(<%= rsLoad.getString("refname") %>)
						</td>
						<td>
							<form action=htmlman.jsp>
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="remhtmlitem">
								<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
									String qrya = "select hid from survey_itemid where "+uidClause+" and hid ="+hid;
									Statement stmta = connection2.createStatement();
									ResultSet rsa = stmta.executeQuery(qrya);
									if (rsa.next())
									{
									%>
						
										<td>
											<label for="i2<%= rsLoad.getString("hid") %>"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_REMOVE_FROM")%>:></label>
										</td>
										<td>
											<select id="i2<%= rsLoad.getString("hid") %>" name="itemid" multiple size="4">
												<%
												qrya = "select itemid,itemshortname from survey_itemid where "+uidClause+" and hid ="+hid;
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
							<form action=htmlman.jsp>
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="asshtmlitem">
								<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
								<table cellspacing="0" cellpadding="0">
									<tr>
									<%
									String qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (hid is null or hid <>"+hid+") order by itemid";
									Statement stmtc = connection2.createStatement();
									ResultSet rsc = stmtc.executeQuery(qryc);
									if (rsc.next())
									{
									%>
									
										<td>
											<label for="i1<%= rsLoad.getString("hid") %>"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_APPLY_TO")%>:></label>
										</td>
										<td>
											<select id="i1<%= rsLoad.getString("hid") %>" name="itemid" multiple size="4">
												<%
												qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (hid is null or hid <>"+hid+") order by itemid";
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
									<td>&nbsp;<%=Messages.getString("HTMLMAN_ASSIGNED_TO_ALL")%></td>
									<%
									}
									%>
									</tr>
								</table>
							</form>
						</td>
						<td>
							<form action="htmlman.jsp">
								<INPUT TYPE="HIDDEN" NAME="action" VALUE="asssid">
								<INPUT TYPE="HIDDEN" NAME="hid" VALUE="<%= rsLoad.getString("hid") %>">
								<INPUT TYPE="HIDDEN" NAME="sid" VALUE="Default">
									<%
									qryc = "select hid from survey_html where "+uidClause+" and isDefault='1' and hid ="+hid;
									//stmtc = connection.createStatement();
									 rsc = stmtc.executeQuery(qryc);
									if (!rsc.next())
									{
									%>
											<INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("SURVEYMAN_BUTTON_DEFAULT")%>>
									<%
									}
									else
									{
									%>
									&nbsp;<%=Messages.getString("HTMLMAN_COLUMN_HEADING_4")%>
									<%
									}
									%>
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
								aweval.pageCount(out, "./htmlman.jsp?spos=", spos, rowcnt, pageCnt, pageSize);
							%>						
						</td>
						<td align="right">
							<form name=list action="htmlman.jsp"  method="GET">
								<table>
									<tr>
										<td>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="remove">
											<label for="h1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_REMOVE_HTML")%>:></label>
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
aweval.setLastPage("./htmlman.jsp?spos="+spos);    
stmt.close();
connection2.close();
connection.close();
}
%>
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
if (request.getParameter("hid") == null) response.sendRedirect("./index.jsp");
if (request.getParameter("hid").equals("------"))
	{
	 aweval.setMessage("No HTML selected");
	 response.sendRedirect("./index.jsp");
	 }

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
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";		

if (!aweval.authHtml(uid,request))
	{
	aweval.setMessage("An html value was supplied, which you do not own");
	response.sendRedirect("./htmlman.jsp");	
	}	
%>
<%
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry  = "";
		
	String action = request.getParameter("action");
	if (action == null)
		action = aweval.getAction();
	if (action==null) 
		action = "";
	String state = aweval.getState();
	if (state==null) 
		state = "";
	String hid = request.getParameter("hid");
	if (hid == null || hid.startsWith("Open"))
		{
		aweval.setMessage("Invalid Html ID");
		response.sendRedirect("./upload.jsp");
		}

	String html[] = aweval.getHtml(request);
	String header = html[0];
	String foot = html[1];

	String header1 = header.substring(0,header.indexOf("le>")+3);
String header2 = header.substring(header.indexOf("</title>"),header.length());

header = header1 + Messages.getString("FIERAHEADER_MAXIMO_SURVEY") + header2;

	
	
    
    int surveyPageSize = 5;
    int itemPageSize = 5;
    int htmlPageSize = 5;
    
    String stringIpos = request.getParameter("ipos");
    String stringSpos = request.getParameter("spos");
    String stringHpos = request.getParameter("hpos");
           
    int ipos = 0;
    if (stringIpos != null)
    	ipos = Integer.parseInt(stringIpos);
    	
    int spos = 0;
    if (stringSpos != null)
    	spos = Integer.parseInt(stringSpos);

    int hpos = 0;
    if (stringHpos != null)
    	hpos = Integer.parseInt(stringHpos);
    	
	
%>
	<%= aweval.replaceTag(aweval.replaceTags(uid, header),"<itemname>","&lt;itemname&gt;") %>
	<hr>
	<table border=0 width=100%>
		<tr>
			<td>
				<table width=100% cellspacing=0 cellpadding=10>
					<tr>
						<th width="10%">
							&nbsp;
						</th>
						<th width="35%">
							<%=Messages.getString("ITEMINFO_QUESTIONS")%>:
						</th>
						<th  width="55%">
							<%=Messages.getString("ADDSTANDARDNEW_ANSWER")%>:
						</th>
					</tr>
					<tr bgcolor="#EEEEEE">
						<td width="10%">
							<img alt="" width="1" height="1" src="./images/clear.gif" />
						</td>
						<td width=35%>
							This is a dummy radio button general question.
						</td>
						<td width=55%>
							<table border=0 cellspacing=0 cellpadding=0>
								<tr>
									<td>
										<input id="qa1" type=radio name="q_1" value="6"><label for="qa1">Dummy Answer 1</label>
									</td>
									<td>
										<input id="qa2" type=radio name="q_1" value="5"><label for="qa2">Dummy Answer 2</label>
									</td>
									<td>
										<input id="qa3" type=radio name="q_1" value="4"><label for="qa3">Dummy Answer 3</label>
									</td>
								</tr>
								<tr>
									<td>
										<input id="qa4" type=radio name="q_1" value="3"><label for="qa4">Dummy Answer 4</label>
									</td>
									<td>
										<input id="qa5" type=radio name="q_1" value="2"><label for="qa5">Dummy Answer 5</label>
									</td>
									<td>
										<input id="qa6" type=radio name="q_1" value="1"><label for="qa6">Dummy Answer 6</label>
									</td>
								</tr>
							</table>
						</td>
					</tr>
	        		<tr bgcolor="#FFFFFF">
	        			<td>
	        				<img alt="" width="1" height="1" src="./images/clear.gif" />
	        			</td>
						<td>
							<label for="q2">This is a "Satisfaction" general question.</label>
						</td>
						<td>
							<select id="q2" name="q_5">
								<option value="">--- Select one ---
								<option value="43">5 Very Satisfied
								<option value="42">4 Satisfied
								<option value="41">3 Neutral
								<option value="40">2 Dissatisfied
								<option value="39">1 Very Dissatisfied
							</select>
						</td>
					</tr>
					<tr bgcolor="#EEEEEE">
						<td width="10%">
							<img alt="" width="1" height="1" src="./images/clear.gif" />
						</td>
						<td width=35%>
							This is a dummy checkbox general question.
						</td>
						<td width=55%>
							<table border=0 cellspacing=0 cellpadding=0>
								<tr>
									<td>
										<input id="q3a1" type=checkbox name="q_2" value="6"><label for="q3a1">Dummy Answer 1</label>
									</td>
									<td>
										<input id="q3a2" type=checkbox name="q_2" value="5"><label for="q3a2">Dummy Answer 2</label>
									</td>
									<td>
										<input id="q3a3" type=checkbox name="q_2" value="4"><label for="q3a3">Dummy Answer 3</label>
									</td>
								</tr>
								<tr>
									<td>
										<input id="q3a4" type=checkbox name="q_2" value="3"><label for="q3a4">Dummy Answer 4</label>
									</td>
									<td>
										<input id="q3a5" type=checkbox name="q_2" value="2"><label for="q3a5">Dummy Answer 5</label>
									</td>
									<td>
										<input id="q3a6" type=checkbox name="q_2" value="1"><label for="q3a6">Dummy Answer 6</label>
									</td>
								</tr>
							</table>
						</td>
					</tr>					
					<tr bgcolor="#FFFFFF">
						<td width="10%">
							<img alt="" width="1" height="1" src="./images/clear.gif" />
						</td>
						<td width="35%">
							<label for="q4">This is a dummy single-value pulldown general question.</label>
						</td>
						<td width="55%">
							<select id="q4" name="q_3">
								<option value="">--- Select one ---
								<option value="6">6 Dummy 6
								<option value="5">5 Dummy 5
								<option value="4">4 Dummy 4
								<option value="3">3 Dummy 3
								<option value="2">2 Dummy 2
								<option value="1">1 Dummy 2
							</select>
						</td>
					</tr>
	        		<tr bgcolor="#EEEEEE">
	        			<td width="10%">
	        				<img alt="" width="1" height="1" src="./images/clear.gif" />
	        			</td>
						<td width="35%">
							<label for="q5">This is a dummy freeform General question.</label>
						</td>
						<td width="55%">
							<textarea id="q5" cols=40 name="q_4"></textarea>
						</td>
					</tr>
					<tr bgcolor="#FFFFFF">
						<td width="10%">
							<img alt="" width="1" height="1" src="./images/clear.gif" />
						</td>
						<td width="35%">
							<label for="q6">This is a dummy multi-value pulldown general question.</label>
						</td>
						<td width="55%">
							<select id="q6" multiple name="q_5" size=4>
								<option value="6">6 Dummy 6
								<option value="5">5 Dummy 5
								<option value="4">4 Dummy 4
								<option value="3">3 Dummy 3
								<option value="2">2 Dummy 2
								<option value="1">1 Dummy 2
							</select>
						</td>
					</tr>
				</table>			
			</td>
		</tr>
		<tr>
			<td align="center"><form action="<%= aweval.getLastPage() %>"><input type="submit" value=<%=Messages.getString("SURVEYVIEW_RETURN_PREVIEW")%>></form></td>
		</tr>
	</table>
	<%= aweval.replaceTag(aweval.replaceTags(uid, foot),"<itemname>","&lt;itemname&gt;") %>
<%
	connection.close();
%>
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
System.err.println("\n  arrivio in sqView.jsp -----  ");
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
String sid = request.getParameter("sid");
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
if (!aweval.authQuestion(ident.getUid(),request))
	{
	aweval.setMessage("An question value was supplied, which you do not own");
	response.sendRedirect("./questionman.jsp");	
	}	
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";	
%>

<%
	aweval.assistStandard(request);
	String itemid = aweval.getItemid();
	String action = request.getParameter("action");
	String qid = request.getParameter("qid");
	if (qid==null)
		qid="0";

	if (action==null)
		action = "";

	if (action.equals("columns"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.updateQuestionColumns(request);
		   	response.sendRedirect("./sqView.jsp?qid="+qid+"&sid="+sid);
	   	}
    else if (action.equals("style"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.assignQuestionStyle(request);
		   	response.sendRedirect("./sqView.jsp?qid="+qid+"&sid="+sid);
	   	}
    else if (action.equals("qalign"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.alignQuestionOnSurvey(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}
    else if (action.equals("aalign"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.alignAnswerOnSurvey(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}
    else if (action.equals("moveup"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerUp(request);
		   	response.sendRedirect("./sqView.jsp?qid="+qid+"&sid="+sid);
	   	}
    else if (action.equals("movedown"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerDown(request);
		   	response.sendRedirect("./sqView.jsp?qid="+qid+"&sid="+sid);
	   	}
   else if (action.equals("clone"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		response.sendRedirect("./addStandardNew.jsp?action=load&qid="+aweval.cloneQuestion(request,uid));
	   	}	   	   	
	else
		{	   	 	   		   	   
    String type = aweval.getType();
    
    String standard = aweval.getStandard();
    int surveyPageSize = 5;
    String stringSpos = request.getParameter("spos");
    int spos = 0;
    if (stringSpos != null)
    	spos = Integer.parseInt(stringSpos);
        
	int maxAnswers = 8;

	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";

%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					
					//String sid = request.getParameter("sid");
					if (sid != null && !sid.equals("null"))
						aweval.setSid(sid);
					String [] pageNav = new String[3];
					pageNav[0] ="Work with HTML";
					pageNav[1] ="Work with Surveys";
					pageNav[2] ="Work with Questions";
					//pageNav[3] ="Return";
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./htmlman.jsp";
					pageNavTargets[1] ="./surveyman.jsp";
					pageNavTargets[2] ="./questionman.jsp";
					//pageNavTargets[3] =aweval.getNextPage();
					
					aweval.pageNav(out, pageNav, pageNavTargets, 1);
					String title = "Question Management - View: "+standard +" Question";					
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
				<!-- Workspace Begin -->
				<table width="100%" cellspacing="0" cellpadding="0">			    				
				    <tr>
				    	<td>
				    		&nbsp;
				    	</td>
				    </tr>
<%
	  int qwidth=0;
	  String qalign="L";
	  String aalign="L";
	  String getQwidth = "select qwidth, case when qalign='R' then 'right' when qalign='C' then 'center' else 'left' end qalign, case when aalign='R' then 'right' when aalign='C' then 'center' else 'left' end aalign from sur_sur_question where qid="+qid+" and sid="+sid;
	  rs = stmt.executeQuery(getQwidth);
	  if (rs.next())
	  	{
			qalign = rs.getString("qalign");
			aalign = rs.getString("aalign");
			qwidth = rs.getInt("qwidth");
	  	}
	  // (qalign.equals("L")) qalign="left";
	  //se if (qalign.equals("R")) qalign="right";
	  //se if (qalign.equals("C")) qalign="center";
	  
	  // (aalign.equals("L")) aalign="left";
	  //se if (aalign.equals("R")) aalign="right";
	  //se if (aalign.equals("C")) aalign="center";	
	    
	  if (qwidth==0)
	  	{
			getQwidth = "select qsize from survey_surveys where sid="+sid;
			rs = stmt.executeQuery(getQwidth);
			if (rs.next())
				qwidth = rs.getInt("qsize"); 			
	  	}

%>				    
					<tr>
						<td>
							<table width="100%"  cellspacing="0" cellpadding="0">
	        					<tr><td width="50"><img alt="" width="50" height="1" src="./images/clear.gif\" /></td><td align="<%= qalign %>" width="<%= qwidth %>"><img alt="" width="<%= qwidth %>" height="1" src="./images/clear.gif" /></td><td  align="<%= aalign %>" width="100%"><img alt="" width="100%" height="1" src="./images/clear.gif" /></td></tr>
	        					<tr>
	        						<td colspan=3>
	        							<hr>
	        						</td>
	        					</tr>
	        				<%
	        						aweval.displayQuestion(qid, 2, out, "&lt;itemname&gt;",sid);
	        				%>	
	        					<tr>
	        						<td colspan=3>
	        							<hr>
	        						</td>
	        					</tr>
	        				<%
	        				String question = "";
	        				qry = "select question from survey_questions where qid="+qid;
	        				rs = stmt.executeQuery(qry);
	        				if (rs.next())
	        					{
	        					question = rs.getString("question");
	        					}
	        				String xQuestion = aweval.replaceTag(aweval.showTags(uid, question),"<itemname>","&lt;itemname&gt;");
	        				if (!question.equals(xQuestion))
	        					{
	        					%>
	        					<tr>
	        						<td>
	        							&nbsp;
	        						</td>
	        						<td>
	        							With&nbsp;tags&nbsp;revealed&nbsp;question&nbsp;=&nbsp;
	        						</td>
	        						<td>
	        							<%= xQuestion %>
	        						</td>
	        					</tr>
	        					<tr>
	        						<td colspan=3>
	        							<hr>
	        						</td>
	        					</tr>	        					
	        					<%
	        					}
	        				%>	        					
	        				</table>
	        			</td>
	        		</tr>
	        		<%
	        		String style = "R";
	        		qry = "select style from survey_questions where qid = "+qid;
	        		rs = stmt.executeQuery(qry);
	        		if (rs.next())
	        			{
	        			style = rs.getString ("style");
	        			
	        			}
	        		if (style.equals("R") || style.equals("M") || style.equals("P") || style.equals("Q"))
	        		{
		        		%>
		      			<tr>
		      				<td align="center">
		      					<table border="1">
		      						<tr>
		      							<td>
		      								<form name="style" action="./sqView.jsp">
		      								<input type="hidden" name="action" value="style">
		      								<input type="hidden" name="sid" value="<%= sid %>">
		      								<input type="hidden" name="qid" value="<%= qid %>">
		      								<label for="s1"><input type="submit" value="Set Style:"></label>&nbsp;
		      									<%
		      										if (style.equals("R"))
		      											{
		      											%>
		      											<select id="s1" name="style">
		      												<option selected value="R">Radio
		      												<option value="Q">Single Pulldown
		      											</select>
		      											<%
		      											}
		      										if (style.equals("Q"))
		      											{
		      											%>
		      											<select id="s1" name="style">
		      												<option value="R">Radio
		      												<option selected value="Q">Single Pulldown
		      											</select>
		      											<%
		      											}
		      										if (style.equals("M"))
		      											{
		      											%>
		      											<select id="s1" name="style">
		      												<option selected value="M">Checkbox
		      												<option value="P">Multi-Pulldown
		      											</select>
		      											<%
		      											}
		      										if (style.equals("P"))
		      											{
		      											%>
		      											<select id="s1" name="style">
		      												<option value="M">Checkbox
		      												<option selected value="P">Multi-Pulldown
		      											</select>
		      											<%
		      											}	      											
		      									%>
		      								</form>
		      							</td>
		      							<%
		      							if (style.equals("R") || style.equals("M") || style.equals("P"))
		      							{
		      							int maxColumns = 1;
		      							qry = "select count(*) cnt from sur_quest_answer where qid="+qid;
		      							rs = stmt.executeQuery(qry);
		      							if (rs.next())
		      								maxColumns = rs.getInt("cnt");
										String buttonText = "Set Columns:";
										if (style.equals("P"))
											buttonText = "Set Size:";			
		      							%>
		      							<td>
		      								<form name="columns" action="./sqView.jsp">
			      								<input type="hidden" name="action" value="columns">
			      								<input type="hidden" name="qid" value="<%= qid %>">
			      								<input type="hidden" name="sid" value="<%= sid %>">
			      								<label for="c1"><input type="submit" value="<%= buttonText %>"></label>&nbsp;
			      									<select id="c1" name="colcnt">
			      								<%
			      									int curCol = 1;		      								
			      									qry = "select columns from survey_questions where qid="+qid;
			      									rs = stmt.executeQuery(qry);
			      									if (rs.next())
			      										curCol = rs.getInt("columns");
			      									String checked = "";
			      									for (int i = 1; i <= maxColumns; i++)
			      										{
			      										checked="";
			      										if (i==curCol)
			      											checked = "selected";
			      										%>
			      										<option <%= checked %>><%= i %>
			      										<%
			      										}		      								
			      								%>
			      									</select>
		      								</form>
		      							</td>
		      							<%
		      							}
		      							%>
		      							<td>
		      								<form name="qalign" action="./sqView.jsp">
			      								<input type="hidden" name="action" value="qalign">
			      								<input type="hidden" name="qid" value="<%= qid %>">
			      								<input type="hidden" name="sid" value="<%= sid %>">				      								
			      								<label for="qa1"><input type="submit" value="Set Q Align"></label>&nbsp;
			      									<select id="qa1" name="qalign">
			      										<option 
			      											<% if (qalign.equals("left")) out.println("selected"); %>>Left
			      										<option 
			      											<% if (qalign.equals("center")) out.println("selected"); %>>Center
			      										<option 
			      											<% if (qalign.equals("right")) out.println("selected"); %>>Right
			      									</select>		      														      											
		      								</form>
		      							</td>
		      							<td>
		      								<form name="aalign" action="./sqView.jsp">
			      								<input type="hidden" name="action" value="aalign">
			      								<input type="hidden" name="qid" value="<%= qid %>">
			      								<input type="hidden" name="sid" value="<%= sid %>">			      								
			      								<label for="qa2"><input type="submit" value="Set Ans Align"></label>&nbsp;
			      									<select id="qa2" name="aalign">
			      										<option 
			      											<% if (aalign.equals("left")) out.println("selected"); %>>Left
			      										<option 
			      											<% if (aalign.equals("center")) out.println("selected"); %>>Center
			      										<option 
			      											<% if (aalign.equals("right")) out.println("selected"); %>>Right
			      									</select>		      														      											
		      								</form>
		      							</td>
		      							
		      						</tr>
		      					</table>
		      				</td>
		      			</tr>
		      			<%
		      			// Answer ordering - start
						
							int answerCnt = 0;
							String qryCnt = "select count(*) cnt from sur_quest_answer where qid ="+qid;
							ResultSet rsSid = stmt.executeQuery(qryCnt);
							if (rsSid.next())
								answerCnt = rsSid.getInt("cnt");
							// order management q*
							qry = "select aid, answer, ordered from sur_quest_answer where qid="+qid+" order by ordered";
							int cnt = 1;
							rsSid = stmt.executeQuery(qry);
							%>

							<tr>
								<td align="center">
									<table border=0>
										<tr>
											<td>
												<b>Answer Ordering:</b>
											</td>
										</tr>										
										<tr>
											<td>
												<table width="100%" cellpadding="0" cellspacing="5">
													<%
													aweval.setNextPage("./sqView.jsp?qid="+qid);
													while (rsSid.next())
													{
														if (cnt == 1)
														{
															if (answerCnt > 1)
															{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><a href="./sqView.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&sid=<%= sid %>&action=movedown">Move&nbsp;Down</a></td></tr>
															<%
															}
															else
															{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>No Ordering: one answer</td></tr>
															<%
															}
															
														}
														else if (cnt == answerCnt)
														{
											
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td><a href="./sqView.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&sid=<%= sid %>&action=moveup">Move&nbsp;Up</a></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
															<%
														}
														else
														{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td><a href="./sqView.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&sid=<%= sid %>&action=moveup">Move&nbsp;Up</a></td><td><a href="./sqView.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&sid=<%= sid %>&action=movedown">Move&nbsp;Down</a></td></tr>
															<%
														}
														cnt++;
													}
														%>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						<%
	      			}
	      			%>
				</table>
				<!-- Workspace End -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
connection.close();
}
%>
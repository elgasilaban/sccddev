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
//System.err.println("\n arrivio in viewQuestion.jsp ----- \n");
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
String databaseProductName = aweval.getDatabaseProductName();

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
//	String uidClause = "userid='"+uid+"' ";
    String uidClause = "userid like '%' ";
	
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
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid);
	   	}
    else if (action.equals("style"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.assignQuestionStyle(request);
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid);
	   	}
    else if (action.equals("moveup"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerUp(request);
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid+"&#q1");
	   	}
    else if (action.equals("movedown"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerDown(request);
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid+"&#q1");
	   	}
   else if (action.equals("clone"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		response.sendRedirect("./addStandardNew.jsp?action=load&qid="+aweval.cloneQuestion(request,uid));
	   	}	   	
/*	   	
    else if (action.equals("clone"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.makeQuestionCloneable(request);
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid);
	   	}
    else if (action.equals("noclone"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.makeQuestionNoncloneable(request);
		   	response.sendRedirect("./viewQuestion.jsp?qid="+qid);
	   	}
*/	   	
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

	String title = Messages.getString("VIEWQUESTION_TITLE") +": "+standard +" "+Messages.getString("QUESTIONMAN_COLUMN_HEADING_Question");					

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
					
					String sid = request.getParameter("sid");
					if (sid != null && !sid.equals("null"))
						aweval.setSid(sid);
					String [] pageNav = new String[3];
					/*pageNav[0] ="Work with HTML";
					pageNav[1] ="Work with Surveys";
					pageNav[2] ="Work with Questions";*/
					//pageNav[3] ="Return";
					
					pageNav[0] = Messages.getString("VIEWQUESTION_PAGENAV_1");
					pageNav[1] = Messages.getString("VIEWQUESTION_PAGENAV_2");
					pageNav[2] = Messages.getString("VIEWQUESTION_PAGENAV_3");
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./htmlman.jsp";
					pageNavTargets[1] ="./surveyman.jsp";
					pageNavTargets[2] ="./questionman.jsp";
					//pageNavTargets[3] =aweval.getNextPage();
					
					//aweval.pageNav(out, pageNav, pageNavTargets, 1);

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
				<!-- Workspace Begin -->
				<table width="100%" cellspacing="0" cellpadding="0">
			    	<tr>
			    		<td valign="top" align="center" width="100%" height="100">
			    			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			    				<tr>
			    					<th align="center">
							    		 <%=Messages.getString("VIEWQUESTION_QUESTION_SPECIFICS")%>:
							    	</th>
							    </tr>
							    <%
							    if (standard.equals("Standard"))
							    	{
								    	%>
								    	<tr>
								    		<td align="center">
								    			<%=Messages.getString("VIEWQUESTION_STANDARD_QUESTION")%>
								    		</td>
								    	<tr>
								    	<%
								    					
                                        


						   if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
									//it's for oracle : venkyg
    								qry = "select concat('<a href=\"./editStandardSurvey.jsp?sid=',concat(rtrim(to_char(case when t1.sid is null then 0 else t1.sid end)),concat('&action=edit\">',concat(to_char(case when t1.sid is null then 0 else t1.sid end),'</a>')))) SID, t2.refname Name from (select * from survey_surveys where "+uidClause+") t2 left outer join sur_sur_question t1 on t1.sid=t2.sid where qid ="+qid+" order by sid";

							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg
								qry = "select concat('<a href=\"./editStandardSurvey.jsp?sid=',concat(rtrim(char(case when t1.sid is null then 0 else t1.sid end)),concat('&action=edit\">',concat(char(case when t1.sid is null then 0 else t1.sid end),'</a>')))) SID, t2.refname Name from (select * from survey_surveys where "+uidClause+") t2 left outer join sur_sur_question t1 on t1.sid=t2.sid where qid ="+qid+" order by sid";
 
							} else
							{
								//it's for oracle : venkyg  CAST(qid AS varchar(10))
    								/*qry = "select concat('<a href=\"./editStandardSurvey.jsp?sid=',concat(rtrim(to_char(case when t1.sid is null then 0 else t1.sid end)),concat('&action=edit\">',concat(to_char(case when t1.sid is null then 0 else t1.sid end),'</a>')))) SID, t2.refname Name from (select * from survey_surveys where "+uidClause+") t2 left outer join sur_sur_question t1 on t1.sid=t2.sid where qid ="+qid+" order by sid";*/
									qry = "select '<a href=\"./editStandardSurvey.jsp?sid='+ CAST(case when t1.sid is null then 0 else t1.sid end as varchar(10))+'&action=edit\">'+CAST(case when t1.sid is null then 0 else t1.sid end as varchar(10))+'</a>'  SID, t2.refname Name from (select * from survey_surveys where "+uidClause+") t2 left outer join sur_sur_question t1 on t1.sid=t2.sid where qid ="+qid+" order by sid";
							}
							

                                //System.err.println("\n arrivio in viewQuestion.jsp ----- qry = "+qry);										
								    	rs = stmt.executeQuery(qry);
								    	if (rs.next())  //Question is present on Surveys
								    		{
								    		%>
									    		<td align="center">
											    <%=Messages.getString("VIEWQUESTION_FOLLOWING_SURV")%>:
									    		</td>
									    	</tr>
									    	<tr>
									    		<td align="center">
									    		<table border="1">
									    			<tr>
										    		<%
										    		ResultSetMetaData rsmd = rs.getMetaData();
										    		int colCount = rsmd.getColumnCount();
										    		for (int i = 1; i <= rsmd.getColumnCount(); i++)
										    			{
														  String columnName = rsmd.getColumnName(i);
														  String tranlatedVal = "";
														  if(columnName.equalsIgnoreCase("SID"))
															  tranlatedVal = Messages.getString("INDEX_COLUMN_HEADING_Survey") + " " + Messages.getString("QUESTIONMAN_COLUMN_HEADING_Id");
														  else
															if(columnName.equalsIgnoreCase("NAME"))
															     tranlatedVal = Messages.getString("INDEX_COLUMN_HEADING_Survey") + " " +Messages.getString("EDITSTANDARDSURVEY_NAME");

										    			%>
										    			<th><%=tranlatedVal%></th>
										    			<%	
										    			}
										    			%>
									    			</tr>
									    			<%
									    			if (spos==0)
									    			{
									    			%>
									    			<tr>
									    				<%
										    			for (int i = 1; i <= rsmd.getColumnCount(); i++)
										    			{
										    			%>
										    			<td><%= rs.getString(i) %></td>
										    			<%	
										    			}
										    			%>
									    			</tr>							    				
									    			<%
									    			}
									    			int rowcnt = 1;
									    			String rowcolor ="#cccccc";						    			
											    	while (rs.next())
											    		{
											    		//if (rowcnt++ < spos*surveyPageSize || rowcnt > ((spos+1)*surveyPageSize)) continue;
														if (rowcnt++ < spos*surveyPageSize || rowcnt > ((spos+1)*surveyPageSize)) continue;
														if (rowcnt%2 == 0)
															rowcolor = "#cccccc";
														else rowcolor = "#ffffff";
											    		
											    		%>
											    		<tr bgcolor="<%= rowcolor %>">
											    		<%
											    		for (int i = 1; i <= rsmd.getColumnCount(); i++)
											    			{
											    			%>
											    			<td>
											    				<%= rs.getString(i) %>
											    			</td>
											    			<%
											    			}
											    		%>
											    		</tr>
											    		<%
											    		}
										    		%>
										    	</table>
										    </td>
										    </tr>
											<tr>
												<td align="center">
													<%
													int scnt = 0;
													qry = "select count(*) cnt from sur_sur_question where qid="+qid;
													rs = stmt.executeQuery(qry);
													if (rs.next())
														scnt = rs.getInt("cnt");
													if (scnt > surveyPageSize)
														{
														%>
														<%=Messages.getString("INDEX_PAGE")%>
														<%
														for (int q = 0; q < (scnt /surveyPageSize)+1 ; q++)
															{
															%>
															<a href="./viewQuestion.jsp?qid=<%= qid %>&spos=<%= q %>"><%= q + 1 %></a>
															<%
															}
														}					
														%>
												</td>
											</tr>								    
									    	<%									    		
								    	}
								    else  // In use on no surveys
								    	{  
								    		%>
								    		<tr>
								    			<td align="center">
								    				<%=Messages.getString("VIEWQUESTION_NOT_IN_USE")%>
								    			</td>
								    		</tr>
								    		<%
								    	}
							    	}  // End of the Standard question info
							    else
							    	{   // Begin Item question details
							    	%>
							    	<tr>
							    		<td align="center">
							    			This is an item question
							    		</td>
							    	<tr>
							    	<%
							    	qry = "select qid from survey_questions where qid="+qid+" and active='A'";
							    	rs = stmt.executeQuery(qry);
							    	if (rs.next())
							    		{
							    		%>
							    		<tr>
							    			<td align="center">
							    				It is in use (Active) on the survey
							    			</td>
							    		</tr>
							    		<%
							    		}
							    	else
							    		{
							    		%>
							    		<tr>
							    			<td align="center">
							    				It is not in use (Inactive) on the survey
							    			</td>
							    		</tr>
							    		<%							    		
							    		} 
							    	}  //End Item question details
							    %>
							</table>
			    		</td>
			    	</tr>
					<tr>
						<td align="center">
							<table>
								<tr>
									<td align="center"><%=Messages.getString("VIEWQUESTION_COPY_QUES")%></td>
								</tr>
								<tr>
									<td align="center">
										<center>
										<form action="./viewQuestion.jsp">
										<input type="hidden" name="action" value="clone">
										<input type="hidden" name="qid" value=<%= qid %>>
										<input type="submit" value=<%=Messages.getString("SURVEYMAN_BUTTON_CLONE")%>>
										</form>
										</center>
									</td>
								</tr>
							</table>	
						</td>
					</tr>			    				
				    <tr>
				    	<td>
				    		&nbsp;
				    	</td>
				    </tr>
					<tr>
						<td>
							<table width="100%"  cellspacing="0" cellpadding="0">
	        					<tr><td width="50"><img alt="" width="50" height="1" src="./images/clear.gif\" /></td><td width="250"><img alt="" width="250" height="1" src="./images/clear.gif" /></td><td width="100%"><img alt="" width="100%" height="1" src="./images/clear.gif" /></td></tr>
	        					<tr>
	        						<td colspan=3>
	        							<hr>
	        						</td>
	        					</tr>
	        				<%
	        						aweval.displayQuestion(qid, 2, out, "&lt;itemname&gt;");
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
		      					<table width="60%">
		      						<tr>
		      							<td>
		      								<form name="style" action="./viewQuestion.jsp">
		      								<input type="hidden" name="action" value="style">
		      								<input type="hidden" name="qid" value="<%= qid %>">
		      								<label for="s1"><input type="submit" value=<%=Messages.getString("SURVEYMAN_CHANGE_STYLE")%>:></label>&nbsp;
		      									<%
		      										if (style.equals("R"))
		      											{
		      											%>
		      											<select id="s1" name="style">
		      												<option selected value="R"><%=Messages.getString("ADDSTANDARDNEW_RADIO")%>
		      												<option value="Q"><%=Messages.getString("ADDSTANDARDNEW_SINGLE_PULL")%>
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
										String buttonText = Messages.getString("VIEWQUESTION_CHANGE_COLUMNS") +":";
										if (style.equals("P"))
											buttonText = Messages.getString("VIEWQUESTION_CHANGE_SIZE") + ":";	%>
		      							<td>
		      								<form name="columns" action="./viewQuestion.jsp">
			      								<input type="hidden" name="action" value="columns">
			      								<input type="hidden" name="qid" value="<%= qid %>">
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
							qry = "select aid, answer, ordered from sur_quest_answer where qid="+qid+" order by ordered ";
							int cnt = 1;
							rsSid = stmt.executeQuery(qry);
							%>

							<tr>
								<a name="q1"/>
								<td align="center">
									<table border=0>
										<tr>
											<td>
												<b><%=Messages.getString("VIEWQUESTION_ANSWER_ORDERING")%>:</b>
											</td>
										</tr>										
										<tr>
											<td>
												<table width="100%" cellpadding="0" cellspacing="5">
													<%
													aweval.setNextPage("./viewQuestion.jsp?qid="+qid);
													while (rsSid.next())
													{
														if (cnt == 1)
														{
															if (answerCnt > 1)
															{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><a href="./viewQuestion.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&action=movedown"><%=Messages.getString("VIEWQUESTION_MOVE_DOWN")%></a></td></tr>
															<%
															}
															else
															{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><%=Messages.getString("VIEWQUESTION_NO_ORDERING")%></td></tr>
															<%
															}
															
														}
														else if (cnt == answerCnt)
														{
											
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td><a href="./viewQuestion.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&action=moveup"><%=Messages.getString("VIEWQUESTION_MOVE_UP")%></a></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
															<%
														}
														else
														{
															%>
															<tr><td><%= rsSid.getString("answer") %></td>
															<td><a href="./viewQuestion.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&action=moveup"><%=Messages.getString("VIEWQUESTION_MOVE_UP")%></a></td><td><a href="./viewQuestion.jsp?qid=<%= qid %>&aid=<%= rsSid.getString("aid") %>&action=movedown"><%=Messages.getString("VIEWQUESTION_MOVE_DOWN")%></a></td></tr>
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
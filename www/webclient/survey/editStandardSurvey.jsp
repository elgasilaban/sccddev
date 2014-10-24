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

Timestamp ts = new Timestamp(System.currentTimeMillis());
//System.err.println("\n arrivio in editStandardSurvey.jsp ----- ts = "+ts.toString());
String databaseProductName = aweval.getDatabaseProductName();
 
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
//	String uidClause = "userid='"+uid+"' ";

    String uidClause = "userid like '%' ";
		
	String action = request.getParameter("action");
	if (action == null)
		action = "";

	if (action.equals("new"))
		{
			String sid = aweval.addQuestionToSurvey(request,uid);
			response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");
		}
	if (action.equals("add"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				{		
			   		String sid = aweval.addQuestionToSurvey(request, uid);
					response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit"+"#q1");
				}
			response.sendRedirect("./surveyman.jsp");				
		}		
	else if (action.equals("remove"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.removeQuestionFromSurvey(request);
			response.sendRedirect(aweval.getNextPage()+"&#q1");
		}
	else if (action.equals("qalign"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.setSurveyQuestionAlignment(request);
			response.sendRedirect(aweval.getNextPage()+"&#q1");
		}
	else if (action.equals("aalign"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.setSurveyAnswerAlignment(request);
			response.sendRedirect(aweval.getNextPage()+"&#q1");
		}
	else if (action.equals("moveuppre"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.moveQuestionUpSection(request,"A");
			response.sendRedirect(aweval.getNextPage()+"&#q1");
		}
	else if (action.equals("movedownpre"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.moveQuestionDownSection(request,"A");
			response.sendRedirect(aweval.getNextPage()+"&#q1");		
		}
	else if (action.equals("moveuppost"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.moveQuestionUpSection(request,"B");
			response.sendRedirect(aweval.getNextPage()+"&#q2");
		}
	else if (action.equals("movedownpost"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.moveQuestionDownSection(request,"B");
			response.sendRedirect(aweval.getNextPage()+"&#q2");		
		}
	else if (action.equals("section"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authQuestion(uid,request))
				aweval.moveQuestionToSection(request);
			response.sendRedirect(aweval.getNextPage()+"&#q1");		
		}
		
	else if (action.equals("asssid"))
		{
			if (aweval.authSurvey(uid,request) && aweval.authHtml(uid,request))
				{
					String sid = request.getParameter("sid");
					aweval.assignHTMLToSurveys(request, uid);
					response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");		
				}
			else
				response.sendRedirect("./editStandardSurvey.jsp");		
		}
	else if (action.equals("askid"))
		{
			String sid = request.getParameter("sid");
			if (aweval.authSurvey(uid,request))
				aweval.assignIDQuestion(request);
			response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");		
		}
	else if (action.equals("noaskid"))
		{
			String sid = request.getParameter("sid");
			if (aweval.authSurvey(uid,request))
				aweval.removeIDQuestion(request);
			response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");		
		}		
	else if (action.equals("rename"))
		{
			String sid = request.getParameter("sid");
			if (aweval.authSurvey(uid,request))
				aweval.nameSurvey(request);
			response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");		
		}
	else if (action.equals("setqsize"))
		{
			String sid = request.getParameter("sid");
			if (aweval.authSurvey(uid,request))
				{
				aweval.setSurveyQuestionColumnSize(request);
				response.sendRedirect("./editStandardSurvey.jsp?sid="+sid+"&action=edit");		
				}
			response.sendRedirect("./editStandardSurvey.jsp");		
		}					
	else
		{
		
		Connection connection = aweval.getConnection();
		Statement stmt = connection.createStatement();
		String qry = "";
		ResultSet rs = null;
		boolean noSid = false;
		String sid = request.getParameter("sid");
		
		if (sid != null)
			{
			if (sid.equals("null"))
				{
				connection.close();
				response.sendRedirect("./surveyman.jsp");
				}
			
			qry = "select sid from survey_surveys where "+uidClause+" and sid="+sid;
			rs = stmt.executeQuery(qry);
			if (!rs.next())
				{
				aweval.setMessage("Choose survey to work with");			
				response.sendRedirect("./surveyman.jsp");
				}
			}
		else if (sid != null && sid.trim().equals(""))  //No survey id was provided so use the default (and if that isn't set) send them to the surveyman page with message.
			{
			qry = "select sid from survey_surveys "+uidClause+" and where active='A'";
			rs = stmt.executeQuery(qry);
			if (rs.next())
				{
				sid = rs.getString("sid");
				aweval.setMessage("Editing 'Default' survey");
				connection.close();		
				response.sendRedirect("./editStandardSurvey.jsp?sid="+sid);						
				}
			else
				{
				aweval.setMessage("You must set a 'Default' survey");
				connection.close();		
				response.sendRedirect("./surveyman.jsp");
				}			
			}
		else
			{
				//sid is null
				noSid = true;
				
			}
		aweval.setLastPage("./editStandardSurvey.jsp");		
		String title = Messages.getString("EDITSTANDARDSURVEY_TITLE");
		%>
		<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

		 <br/>
	<DIV align=left>
	   <H3><%=title%></H3>
	</DIV>

			<table width="100%" border=1 align="center">
				<tr>
					<td align="center" avalign="top">
						<%
							int directCnt = 4;
							if (noSid) directCnt = 3;				
							String [] pageNav = new String[directCnt];
							int activeTab = 1;
							/*pageNav[0] ="Item&nbsp;Questions";
							pageNav[1] ="Add&nbsp;Standard&nbsp;Question";							
							pageNav[2] ="General&nbsp;Survey&nbsp;Questions";
							if (!noSid)
								pageNav[3] ="Display&nbsp;This&nbsp;Survey";*/

							pageNav[0] = Messages.getString("EDITSTANDARDSURVEY_PAGENAV_1");
							pageNav[1] = Messages.getString("EDITSTANDARDSURVEY_PAGENAV_2");
							pageNav[2] = Messages.getString("EDITSTANDARDSURVEY_PAGENAV_3");
							if (!noSid)
								pageNav[3] = Messages.getString("EDITSTANDARDSURVEY_PAGENAV_4");

							
							String [] pageNavTargets = new String[directCnt];
							pageNavTargets[0] ="./itemman.jsp";
							pageNavTargets[1] ="./addStandardNew.jsp";
							pageNavTargets[2] ="./standardQuestions.jsp";
							if (!noSid)														
								pageNavTargets[3] ="./surveyView.jsp?sid="+ sid ;
							
							//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
							//String title = "Survey Management: Survey Create/Update";
							
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
						if (sid == null)
							{
							%>	
								<form name="form1" action="editStandardSurvey.jsp" method="get">
								<input type="hidden" name="action" value="new">							
							<%
							}
							%>
						<table align="center">
							<tr>
								<td align="center">
									<table align="center">
										<tr>
										    <td align="center">
										    	<%
										    	String refname = "";
										    	if (sid == null)
										    		{
										    		%>
											    		<label for="n1"><%=Messages.getString("EDITSTANDARDSURVEY_NAME")%>:</label>&nbsp;<input id="n1" type="text" name="refname" maxlength="20" size="12" value="<%= refname %>"> 
										    		<%
										    		}
										    	else
										    		{
														qry = "select refname from survey_surveys where "+uidClause+" and sid="+sid;
														rs = stmt.executeQuery(qry);
			
														if (rs.next())
															refname = rs.getString("refname");
														if (refname == null)
															refname = "";							    		
										    		%>	    
														<form name=list action="editStandardSurvey.jsp"  method="GET">
														<input type="hidden" name="action" value="rename">
														<input type="hidden" name="sid" value="<%= sid %>">
														<input type="SUBMIT" value=<%=Messages.getString("EDITSTANDARDSURVEY_APPLY_NAME")%>:>&nbsp;<input type="text" name="refname" maxlength="12" size="12" value="<%= refname %>"> 							
														</form>												
													<%
													}
													%>
											</td>
										    <td align="center">
										    		<%
										    	if (sid != null)
										    		{
										    		%>	    								    		    
														<FORM name=list action="editStandardSurvey.jsp"  METHOD="GET">
														<input type="hidden" name="action" value="asssid">
														<input type="hidden" name="sid" value="<%= sid %>">
													<%
													}
													%>										
													<table align="center">
														<tr>									
															<td align="center">
												<%
										    	if (sid != null)
										    		{
										    		%>														
																<input type="submit" value=<%=Messages.getString("EDITSTANDARDSURVEY_APPLY_HTML")%>:">
													<%
													}
												else
													{
													%>
													<label for="h1">HTML:</label>
													<%
													}
												%>
															</td>
															<td align="center">
																<%	
																String hid = "";
																String checked = "";
																if (sid != null)
																	{																											
																	qry = "select hid from survey_surveys where "+uidClause+" and sid="+sid;
																	rs = stmt.executeQuery(qry);
			
																	if (rs.next())
																		hid = rs.getString("hid");
																	if (hid==null) hid = "";
																	
																	}
																%>
																<select id="h1" name="hid">
																	<option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>  
																	<%							
																	qry = "select hid, refname from survey_html where "+uidClause;
																	rs = stmt.executeQuery(qry);									
																	while(rs.next())
																	{
																	checked = "";
																	if (hid.equals(rs.getString("hid")))
																		checked = "selected";
																	%>
																	  <option value="<%= rs.getString("hid") %>"  <%= checked %>>HTML-<%= rs.getString("hid") + " ("+rs.getString("refname")+")" %>
																	<%
																	}
																	%>
																</select>
															</td>
														</tr>
													</table>
												<%
										    	if (sid != null)
										    		{
										    		%>												
														</form>
													<%
													}
												%>
											</td>	    	
								    	</tr>
								    </table>
					    		</td>
							</tr>
				    		<tr>
				    			<td>
				    				<hr>
				    			</td>
				    		</tr>
				    		<tr align="center">
								<td align="center">

							    	<%
							    	
									if (sid == null)
										qry = "select qid, question from survey_questions where "+uidClause+" and type='A' and active <> 'D'";
									else
										qry = "select qid, question from survey_questions where "+uidClause+" and type='A' and active <> 'D' and qid not in (select qid from sur_sur_question where sid ="+sid+")"; 

//                      System.err.println("\n 111 arrivio in editStandardSurvey.jsp ----- sid = "+sid+"==== qry = "+qry);
									rs = stmt.executeQuery(qry);

									 //System.err.println("\n 111 arrivio in editStandardSurvey.jsp -----  qry = "+qry);

									
									String hiddenActionValue = "add";
									if (action == null)
										hiddenActionValue = "new";
		
									if (sid != null)
										{
										%>									
								    	<form name="form1" action="editStandardSurvey.jsp" method="get">
										


								    	<input type="hidden" name="action" value="<%= hiddenActionValue %>">
								    	<input type="hidden" name="sid" value="<%= sid %>">
								    	<%
										//System.err.println("\n 111 arrivio 0000");
								    	}
								    	%>
                                    		<SCRIPT language=JavaScript src="theme/survey.js"></SCRIPT>
 	     						    	<table aawidth="100%" align="center">


                 
								    	<%
											if (rs.next())
											{

											//End Display available questions
											rs = stmt.executeQuery(qry);
											String jsMessage = Messages.getString("JAVASCRIPT_SELECT")+" "+Messages.getString("JAVASCRIPT_ONE") + " "+Messages.getString("QUESTIONMAN_COLUMN_HEADING_Question");

											String jsMessage1 =Messages.getString("JAVASCRIPT_ENTER")+" "+Messages.getString("INDEX_COLUMN_HEADING_Survey");

											
											%>		
											
											<input type="hidden" name="jsMessage"  value ="<%= jsMessage %>">
											<input type="hidden" name="jsMessage1"  value ="<%= jsMessage1 %>">

											<tr>
												<td valign="top" align="center">
								    				<input type="submit" value=<%=Messages.getString("EDITSTANDARDSURVEY_ADD_QUESTIONS")%>: onclick="return HasSurveyQuestion(form1);"> 
								    			</td>
								    			<td><label for="q1"></label>
											    	<select id="q1" name="qid" multiple size="4">
											   			<%
													    while (rs.next())
													    {
													    %>
													    <option value="<%= rs.getString("qid") %>"><%= aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rs.getString("question")),"<itemname>","&lt;itemname&gt;"),45) %>
													    <%
													    }
													    %> 
													</select>
												</td>
											</tr>

											<%
											//End Display available questions
											}
											if (sid == null)
												{
												%>
												<tr>
													<td colspan=2 align="center">
														<table border=1>
															<tr>
																<td valign="top" align="left">
																	<%=Messages.getString("EDITSTANDARDSURVEY_REQUEST_IDENTITY")%>:<input type="checkbox" name="identity" checked>
																</td>
															</tr>
															<tr>
																<td valign="top" align="right">
																	<%=Messages.getString("EDITSTANDARDSURVEY_QUEST_COL_WIDTH")%>:&nbsp;<input type="text" name="qsize" value="450" size="3" maxlength="3">
																</td>
															<tr>
														</table>
													</td>
												</tr>
												<%

												}
											%>
										</table>
								    </form>
					    		</td>
					    				    		
				    		</tr>
	    		
							 <%
							 if (sid != null)  //If no sid it is a new survey, so no questions to show.
							 {							 
							 %>
					<tr>
						<td colspan="5" align="center">
							<table border=1>
								<tr abgcolor="#9999ff"  class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("EDITSTANDARDSURVEY_IDENTY_QUESTION")%>:</th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("EDITSTANDARDSURVEY_QUESTION_COL_WIDTH")%>:</th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("EDITSTANDARDSURVEY_QUESTION_ALIGN")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("EDITSTANDARDSURVEY_ANSWER_ALIGN")%></th>
								</tr>
								<tr>

											<%
												{
												String actionButton = Messages.getString("ADDSTANDARDNEW_BUTTON_ADD") +" "+Messages.getString("EDITSTANDARDSURVEY_IDENT");;
												hiddenActionValue = "askid";
												

                            if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
								qry = "select identity from survey_surveys where "+uidClause+" and identity='1' and sid="+sid;

							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg
								qry = "select identity from survey_surveys where "+uidClause+" and identity='1' and sid="+sid;
 
							} else
							{
								qry = "select identity1 from survey_surveys where "+uidClause+" and identity1='1' and sid="+sid;
							}
												
												 
												rs = stmt.executeQuery(qry);
												if (rs.next())
													{
													actionButton = Messages.getString("ITEMMAN_BUTTON_REMOVE") +" "+Messages.getString("EDITSTANDARDSURVEY_IDENT");
													hiddenActionValue = "noaskid";
													}
												%>

																<td align="center">
																	<br>
															    	<form name="form2" action="editStandardSurvey.jsp" method="get">
															    	<input type="hidden" name="action" value="<%= hiddenActionValue %>">
															    	<input type="hidden" name="sid" value="<%= sid %>">												
																	<input type="submit" value="<%= actionButton %>">
																	</form>
																</td>
																<td align="center">
																	<form name="form3" action="editStandardSurvey.jsp" method="get">
																	<input type="submit" value=<%= Messages.getString("SURVEYMAN_BUTTON_DEFAULT") %>>																	
															    	<input type="hidden" name="sid" value="<%= sid %>">	
															    	<input type="hidden" name="action" value="setqsize">												    														
																<%
																int qsize = 450;
																qry = "select qsize from survey_surveys where "+uidClause+" and sid="+sid;
                      //System.err.println("\n 111aaaa arrivio in editStandardSurvey.jsp ----- qry = "+qry);
																rs = stmt.executeQuery(qry);

																if (rs.next())
																	{
																	qsize = rs.getInt("qsize");
																	}
																%>
																	<input type="text" name="qsize" value="<%= qsize %>" size="3" maxlength="3">												

																	</form>
																</td>
																<%
																	  int qwidth=450;
																	  String qalign="L";
																	  String aalign="L";
																	  String getQwidth = "select qsize, case when qalign='R' then 'right' when qalign='C' then 'center' else 'left' end qalign, case when aalign='R' then 'right' when aalign='C' then 'center' else 'left' end aalign from survey_surveys where sid="+sid;
                      //System.err.println("\n 111bbbb arrivio in editStandardSurvey.jsp ----- getQwidth = "+getQwidth);
																	  rs = stmt.executeQuery(getQwidth);

																	  if (rs.next())
																	  	{
																			qalign = rs.getString("qalign");
																			aalign = rs.getString("aalign");
																			qwidth = rs.getInt("qsize");
																	  	}
																
																%>	
																
								      							<td>
								      								<form name="qalign" action="./editStandardSurvey.jsp">
									      								<input type="hidden" name="action" value="qalign">
						
									      								<input type="hidden" name="sid" value="<%= sid %>">				      								
									      								<label for="qa1"><input type="submit" value=<%= Messages.getString("EDITSTANDARDSURVEY_ALIGN") %>></label>&nbsp;
									      									<select id="qa1" name="qalign">
									      										<option 
									      											<% if (qalign.equals("left")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_LEFT") %>
									      										<option 
									      											<% if (qalign.equals("center")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_CENTER") %>
									      										<option 
									      											<% if (qalign.equals("right")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_RIGHT") %>
									      									</select>		      														      											
								      								</form>
								      							</td>
								      							<td>
								      								<form name="aalign" action="./editStandardSurvey.jsp">
									      								<input type="hidden" name="action" value="aalign">
						
									      								<input type="hidden" name="sid" value="<%= sid %>">			      								
									      								<label for="qa2"><input type="submit" value=<%= Messages.getString("EDITSTANDARDSURVEY_ALIGN") %>></label>&nbsp;
									      									<select id="qa2" name="aalign">
									      										<option 
									      											<% if (aalign.equals("left")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_LEFT") %>
									      										<option 
									      											<% if (aalign.equals("center")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_CENTER") %>
									      										<option 
									      											<% if (aalign.equals("right")) out.println("selected"); %>><%= Messages.getString("EDITSTANDARDSURVEY_RIGHT") %>
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
							 
				    		<a name="q1">
							<tr>
								<td align="center">
									<table width="100%">
										<tr abgcolor="#9999ff"  class="headerbar">
											<th  class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;" colspan="2" align="center"><%=Messages.getString("EDITSTANDARDSURVEY_PRE_POST")%></th>
										</tr>
									
										
										<tr>				    		
								
									<td align="right">
										<form action="./editStandardSurvey.jsp">
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="section">
											<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= sid %>">												
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												String qryc = "select t2.question, t2.qid,  t1.ordered from (select qid, ordered from sur_sur_question where sid="+sid+" and qsection='A') t1 left outer join survey_questions t2 on t1.qid=t2.qid order by t1.ordered asc";
												//String qryc = "select t1.question, t1.qid from survey_questions t1, sur_sur_question t2 where t2.sid="+sid+" and t2.qsection='A'  order by t2.order";
                             //System.err.println("\n 222 arrivio in editStandardSurvey.jsp ----- qryc = "+qryc);
												Statement stmtc = connection.createStatement();
												ResultSet rsc = stmtc.executeQuery(qryc);
												if (rsc.next())
												{
												%>
												
													<td>
														<label for="i3"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("EDITSTANDARDSURVEY_MOVE_AFTER")%>:></label>
													</td>
													<td>
														<select id="i3" name="qid" multiple size=3>
															<%
															//qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (sid is null or sid <>"+sid+") order by itemid";
															//stmtc = connection.createStatement();
															rsc = stmtc.executeQuery(qryc);
															while (rsc.next()) {
															%>
															<option value="<%=rsc.getString("qid")%>"><%=aweval.substrOrLess(rsc.getString("question"),20)%>
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
												<td>&nbsp;<%=Messages.getString("EDITSTANDARDSURVEY_NO_PRE")%></td>
												<%
												}
												%>
												</tr>
											</table>
										</form>
									</td>
									<td align="left">
										<form action="./editStandardSurvey.jsp">
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="section">
											<INPUT TYPE="HIDDEN" NAME="sid" VALUE="<%= sid %>">											
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												String qrya = "select t2.question, t2.qid, t1.ordered from (select qid, ordered from sur_sur_question where sid="+sid+" and qsection='B') t1 left outer join survey_questions t2 on t1.qid=t2.qid order by t1.ordered asc";
												//String qrya = "select t1.question, t1.qid from survey_questions t1 right outer join sur_sur_question t2 on t2.sid="+sid+" and t2.qsection='B'  order by t2.order";
                      //System.err.println("\n 333 arrivio in editStandardSurvey.jsp ----- qrya = "+qrya);
												Statement stmta = connection.createStatement();
												ResultSet rsa = stmta.executeQuery(qrya);
												if (rsa.next())
												{
												%>
									
													<td>
														<label for="i2"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("EDITSTANDARDSURVEY_MOVE_BEFORE")%>:></label>
													</td>
													<td>
														<select id="i1" name="qid" multiple size=3>
															<%
															//qrya = "select itemid,itemshortname from survey_itemid where "+uidClause+" and sid ="+sid;
															//stmta = connection.createStatement();
															rsa = stmta.executeQuery(qrya);
															while (rsa.next()) {
															%>
															<option value="<%=rsa.getString("qid")%>"><%=aweval.substrOrLess(rsa.getString("question"),20)%>
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
												<td>&nbsp;<%=Messages.getString("EDITSTANDARDSURVEY_NO_PRE")%></td>
												<%
												}
												%>
												</tr>
											</table>
										</form>
									</td>

		      						</tr>
		      					</table>
		      				</td>
							
							</tr>		    		
				    		<tr>
								<td align="center">		
									<table border=0 width="100%">
							    		<tr abgcolor="#9999ff" align="center" class="headerbar">
							    			<td  class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;" colspan=5>
							    				<b>--- <%=Messages.getString("EDITSTANDARDSURVEY_PRE_ITEM")%>---</b>
							    			</td>
							    		</tr>																	 
							 <%
								 int questionCnt = 0;
								 String qryCnt = "select count(*) cnt from sur_sur_question where sid ="+sid+" and qsection='A'";
								 ResultSet rsSid = stmt.executeQuery(qryCnt);
								 if (rsSid.next())
								 	questionCnt = rsSid.getInt("cnt");
								
								 //it's for db2
								 /*qry = "select t1.qid qid, t1.question question, t2.ordered order from survey_questions t1, sur_sur_question t2 where t2.sid ="+sid+" and t1.qid=t2.qid and t2.qsection='A' order by ordered";*/

								 qry = "select t1.qid qid, t1.question question, t2.ordered order1 from survey_questions t1, sur_sur_question t2 where t2.sid ="+sid+" and t1.qid=t2.qid and t2.qsection='A' order by t2.ordered";


                                //System.err.println("\n 4444 arrivio in editStandardSurvey.jsp ----- qry = "+qry);

								 int cnt = 1;
								 rsSid = stmt.executeQuery(qry);
							    	%>
								    
									<%
									while (rsSid.next())
									{
									if (cnt == 1)
									{
									if (questionCnt==1)
										{
										%>
											<tr>
												<td>
													<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
												</td>
												<td>
													<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
												</td>												
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
											</tr>
										<%								
										}
									else
										{
										%>
											<tr>
												<td>
													<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
												</td>
												<td>
													<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
												</td>												
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=movedownpre"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_DOWN")%></a>
												</td>
											</tr>
										<%
										}
									}
									else if (cnt == questionCnt)
									{
									%>
										<tr>
											<td>
												<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;")	 %>
											</td>
											<td>
												<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
											</td>											
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=moveuppre"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_UP")%></a>
											</td>
											<td>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											</td>
										</tr>
									<%
									}
									else
									{
									%>
										<tr>
											<td>
												<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
											</td>
											<td>
												<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
											</td>											
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=moveuppre"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_UP")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=movedownpre"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_DOWN")%></a>
											</td>
										</tr>
									<%
									}					
									cnt++;
								}
					  //End of the current questions table
					%>	
							</table>
						</td>
					</tr>				
					<tr>
						<td>
							<hr>
						</td>
					</tr>
					<a name="q2">
		    		<tr>
		    			<td align="center">
		    				<table width="100%">
								<tr abgcolor="#999fff" class="headerbar">
					    			<td  class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;" colspan="5" align="center">
					    				<b>--- <%=Messages.getString("EDITSTANDARDSURVEY_POST_ITEM")%> ---</b>
					    			</td>
					    		</tr>		    						    		
							 <%

								 questionCnt = 0;
								 qryCnt = "select count(*) cnt from sur_sur_question where sid ="+sid+" and qsection='B'";
								 rsSid = stmt.executeQuery(qryCnt);
								 if (rsSid.next())
								 	questionCnt = rsSid.getInt("cnt");
								
								 //it's for db2 : venkyg
								 /*qry = "select t1.qid qid, t1.question question, t2.ordered order from survey_questions t1, sur_sur_question t2 where t2.sid ="+sid+" and t1.qid=t2.qid  and t2.qsection='B' order by ordered";*/
								 qry = "select t1.qid qid, t1.question question, t2.ordered order1 from survey_questions t1, sur_sur_question t2 where t2.sid ="+sid+" and t1.qid=t2.qid  and t2.qsection='B' order by t2.ordered";

                       //System.err.println("\n 555 arrivio in editStandardSurvey.jsp ----- qry = "+qry);
								 cnt = 1;
								 rsSid = stmt.executeQuery(qry);
							    	%>
								    
									<%
									while (rsSid.next())
									{
									if (cnt == 1)
									{
									if (questionCnt==1)
										{
										%>
											<tr>
												<td>
													<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
												</td>
												<td>
													<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
												</td>												
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
											</tr>
										<%								
										}
									else
										{
										%>
											<tr>
												<td>
													<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
												</td>
												<td>
													<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
												</td>												
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
												</td>
												<td>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												</td>
												<td>
													<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=movedownpost"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_DOWN")%></a>
												</td>
											</tr>
										<%
										}
									}
									else if (cnt == questionCnt)
									{
									%>
										<tr>
											<td>
												<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;")	 %>
											</td>
											<td>
												<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
											</td>											
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=moveuppost"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_UP")%></a>
											</td>
											<td>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											</td>
										</tr>
									<%
									}
									else
									{
									%>
										<tr>
											<td>
												<%= aweval.replaceTag(aweval.replaceTags(uid, rsSid.getString("question")),"<itemname>","&lt;itemname&gt;") %>
											</td>
											<td>
												<a href="sqView.jsp?qid=<%= rsSid.getString("qid") %>&sid=<%= sid %>"><%=Messages.getString("STANDARDQUESTIONS_VIEW")%></a>
											</td>											
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=remove"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=moveuppost"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_UP")%></a>
											</td>
											<td>
												<a href="editStandardSurvey.jsp?sid=<%= sid %>&qid=<%= rsSid.getString("qid") %>&action=movedownpost"><%=Messages.getString("EDITSTANDARDSURVEY_MOVE_DOWN")%></a>
											</td>
										</tr>
									<%
									}					
									cnt++;
								}
						%>
						</table>
					</td>
				</tr>						
						<%								
					}  //End of the current questions table
					%>
					

			</table>
					</td>
				</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
			</table>
		<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
		
		<%
		stmt.close();
		connection.close();
		}
%>
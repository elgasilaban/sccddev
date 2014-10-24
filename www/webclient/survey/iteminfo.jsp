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
//System.err.println("\n  arrivio in iteminfo.jsp -----  ");
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	aweval.setNextPage("."+request.getServletPath()+"?"+request.getQueryString());
	ident.setMessage("You must login to use fiera");
	response.sendRedirect("./login.jsp");
	}
if (!aweval.authItem(ident.getUid(),request))
	{
	aweval.setMessage("An item value was supplied, which you do not own");
	response.sendRedirect("./itemman.jsp");	
	}	
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");	
%>
<%

	String uid = ident.getUid();
	//String uidClause = "userid='"+uid+"' ";
	
    String uidClause = "userid like '%' ";

String itemid = request.getParameter("itemid");
String action = request.getParameter("action");
if (action == null)
	action = "";
	if (itemid == null)
		{
			aweval.setMessage("Invalid Item");
			response.sendRedirect("./itemman.jsp");		   	
		}
    if (action.equals("deactivate"))
	   	{
			if (aweval.authQuestion(uid,request))
		   		aweval.deactivateQuestion(request);
		   	response.sendRedirect("./iteminfo.jsp?itemid="+itemid);		   	
	   	}  
    else if (action.equals("moveup"))
	   	{
		   	if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.moveQuestionUpItem(request);
		   	response.sendRedirect("./iteminfo.jsp?itemid="+itemid);	   	
	   	} 
    else if (action.equals("movedown"))
	   	{
		   	if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.moveQuestionDownItem(request);
		   	response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
	   	}
    else if (action.equals("itemhtml"))
	   	{
		   	if (aweval.authItem(uid,request) && aweval.authHtml(uid,request))
		   		aweval.assignHTMLToItems(request);
		   	response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
	   	}
    else if (action.equals("itemsid"))
	   	{
		   	if (aweval.authItem(uid,request) && aweval.authSurvey(uid,request))
		   		aweval.assignSurveyToItems(request);
		   	response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
	   	}
	else if (action.equals("enableitem"))
		{
		aweval.enableItemSurvey(request);
		response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
		}
	else if (action.equals("disableitem"))
		{
		aweval.disableItemSurvey(request);
		response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
		}
	else if (action.equals("pubdata"))
	    {
	   	aweval.makeItemResultsPublic(request);
	    response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
	    }
	else if (action.equals("privdata"))
	    {
	   	aweval.makeItemResultsPrivate(request);
	    response.sendRedirect("./iteminfo.jsp?itemid="+itemid);
	    }    				   		   	
	else
		{
			Connection connection = aweval.getConnection();
			Statement stmt = connection.createStatement();
		    String qry = "Select item, itemid from survey_itemid where "+uidClause+" order by item asc";
		    ResultSet rs1 = stmt.executeQuery(qry);
		    ResultSet rs = null;
		
		    int itemPageSize = 5;			    
		    String stringIpos = request.getParameter("ipos");			           
		    int ipos = 0;
		    if (stringIpos != null)
		    	ipos = Integer.parseInt(stringIpos);
			
			String title = "";
			String titleShort = "";
			String titleID = "";
			String surveyApplicationId = "";
			String surveyApplication = "";
			String publicItem = "N";			
			String publicData = "N";	
			qry = "select item, itemid, itemshortname,sid, recordclass, case when publicdata='Y' then 'Public Readable' else 'Private' end publicdata, case when ispublic = 'Y' then 'Published' else 'Not published' end ispublic from survey_itemid where "+uidClause+" and itemid='"+itemid+"'";

//System.err.println("\n  arrivio in iteminfo.jsp -----  qry = "+qry);

			rs = stmt.executeQuery(qry);
			if (rs.next())
				{
				title = rs.getString("item");
				titleShort = rs.getString("itemshortname");
				titleID = rs.getString("itemid");
				publicItem = rs.getString("ispublic"); 				    				    				
				publicData = rs.getString("publicdata"); 
				surveyApplicationId = rs.getString("recordclass"); 
				}	 
				
			if(!surveyApplicationId.equals(""))
			{
				//Statement stmtt = connection.createStatement();
				//ResultSet rs2 = stmt.executeQuery("select description from maxmodules where module = '"+surveyApplicationId+"'");

				//ResultSet rs2 = stmt.executeQuery("select description from synonymdomain where domainid = 'SURVEYAPPLICATION' and maxvalue = '"+surveyApplicationId+"'");

				ResultSet rs2 = stmt.executeQuery("select description from maxapps where app = '"+surveyApplicationId+"'");

				if (rs2.next())
					surveyApplication = rs2.getString("description") + "(" +surveyApplicationId+ ")"; 
            }

			//String localTitle = "Item&nbsp;Management:&nbsp;for&nbsp;"+title;
			String localTitle = Messages.getString("ITEMINFO_TITLE") + title;

			aweval.setLastPage("./iteminfo.jsp");		   	 	   		   	   		   	 	   		   	   
			%>
			<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
				<table width="100%" border=1>
					<tr>
						<td align="center" valign="top">
							<%
								String [] pageNav = new String[4];
								int activeTab = 1;
								pageNav[0] = Messages.getString("ITEMINFO_MANAGE")+" "+titleShort+" "+Messages.getString("ITEMINFO_QUESTIONS");
								pageNav[1] = Messages.getString("ITEMINFO_MANAGE_SURVEY") + " "+aweval.getSurveyID(request);
								pageNav[2] = Messages.getString("ITEMINFO_CREATE_NEW") + titleShort + " " + Messages.getString("ITEMINFO_QUESTIONS");
								if (publicItem.equals("Published"))
									pageNav[3] = Messages.getString("ITEMINFO_PAGENAV_2");
								else
									//pageNav[3] ="Preview survey";
    								  pageNav[3] = Messages.getString("ITEMINFO_PAGENAV_1");

								//pageNav[3] ="newtab";
								
								String [] pageNavTargets = new String[4];
								pageNavTargets[0] ="./itemQuestions.jsp?itemid="+titleID;
								pageNavTargets[1] ="./editStandardSurvey.jsp?sid="+aweval.getSurveyID(request);  //Is rule for sid= in place?
								pageNavTargets[2] ="./addStandardNew.jsp?itemid="+titleID;
								if (publicItem.equals("Published"))
									pageNavTargets[3] ="javascript:spawnwide('./survey.jsp?itemid="+titleID+"')";
								else
									pageNavTargets[3] ="./surveyView.jsp?itemid="+titleID;
								//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
								
								//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
							%>
						</td>
					</tr>
					<tr>
						<th>
							<font size=4><%= localTitle %></font>
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
							<!-- WorkPage end -->
					
							<table>
								<tr>
									<td>
										<table cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<b><%=Messages.getString("INDEX_COLUMN_HEADING_Item")%>:</b>
												</td>
												<td>
													&nbsp;...&nbsp;
												</td>									
												<td>
													<b><%= title %></b>
									    		</td>
									    	</tr>
											<tr>
												<td>
													<b><%=Messages.getString("ITEMINFO_ITEM_SHORTNAME")%>:</b>
												</td>
												<td>
													&nbsp;...&nbsp;
												</td>														
												<td>
													<b><%= titleShort %></b>
									    		</td>
									    	</tr>
											<tr>
												<td>
													<b><%=Messages.getString("ITEMINFO_ITEM_ID")%>:</b>
												</td>
												<td>
													&nbsp;...&nbsp;
												</td>														
												<td>
													<b><%= titleID %></b>
									    		</td>
									    	</tr>

											<tr>
												<td>
													<b><%=Messages.getString("ITEMINFO_SURVEY_APPLICATION")%>:</b>
												</td>
												<td>
													&nbsp;...&nbsp;
												</td>			  											
												<td>
													<b><%= surveyApplication %></b> 
									    		</td>
									    	</tr>


											<tr>
												<td valign="top">
													<b><%=Messages.getString("ITEMINFO_SURVEY_STATUS")%>:</b>
												</td>
												<td valign="top">
													&nbsp;...&nbsp;
												</td>				
												
												<td>
													<table>
														<tr>
															<td valign="top">
															<%
									 if(publicItem.equalsIgnoreCase("Not published"))
										publicItem = Messages.getString("ITEMMAN_NONE_PUBLIC");
									else
									 if(publicItem.equalsIgnoreCase("Published"))
										publicItem = Messages.getString("STANDARDQUESTIONS_PUBLISHED");


													         %>
																<b><%= publicItem %></b>
															<td>
															<td>
																<form name="public" action="./iteminfo.jsp">
																<%
																if (publicItem.toLowerCase().equals("published"))
																	{
																	%>
																	<input type="hidden" name="action" value="disableitem">
																	<input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_UNPUBLISH")%>>
																	<input type="hidden" name="itemid" value="<%= titleID %>">																	
																	<%
																	}
																else
																	{
																	%>
																	<input type="hidden" name="action" value="enableitem">
																	<input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_PUBLISH")%>>
																	<input type="hidden" name="itemid" value="<%= titleID %>">																	
																	<%
																	}														
																%>
																</form>
															</td>
														</tr>
													</table>
									    		</td>
									    	</tr>
											<!--tr>
												<td valign="top">
													<b><%=Messages.getString("ITEMINFO_RESULTS_STATUS")%>:</b>
												</td>
												<td valign="top">
													&nbsp;...&nbsp;
												</td>														
												<td>
													<table>
														<tr>
															<td valign="top">
																<b><%= publicData %></b>
															<td>
															<td>
																<form name="publicdata" action="./iteminfo.jsp">
																<%
																if (publicData.toLowerCase().equals("public readable"))
																	{
																	%>
																	<input type="hidden" name="action" value="privdata">
																	<input type="submit" value=<%=Messages.getString("ITEMINFO_MAKE_PRIVATE")%>>
																	<input type="hidden" name="itemid" value="<%= titleID %>">																	
																	<%
																	}
																else
																	{
																	%>
																	<input type="hidden" name="action" value="pubdata">
																	<input type="submit" value=<%=Messages.getString("ITEMINFO_MAKE_PUBLIC")%>>
																	<input type="hidden" name="itemid" value="<%= titleID %>">																	
																	<%
																	}														
																%>
																</form>
															</td>
														</tr>
													</table>
									    		</td>
									    	</tr-->

											<tr>													
												<%
												if (publicItem.toLowerCase().equals("published"))
													{
												//System.err.println("\n  arrivio in iteminfo.jsp ----- request.getRequestURI() = "+request.getRequestURI());

											
													%>
														<td>
															<b><%=Messages.getString("ITEMINFO_SURVEY_URL")%>:</b>
														</td>
														<td>
															&nbsp;...&nbsp;
														</td>																									
														<td>
															<%
															String serverPort = Integer.toString(request.getServerPort());
															if (serverPort.equals("80"))
																serverPort="";
															else
																serverPort = ":"+serverPort;
															%>
															<b><a href="javascript:spawnwide('./survey.jsp?itemid=<%= titleID %>')"><%= "http://"+request.getServerName()+serverPort+"/"+request.getRequestURI().substring(1).substring(0,request.getRequestURI().substring(1).lastIndexOf("/"))+"/survey.jsp?itemid="+titleID %></a></b>
											    		</td>
										    		<%

																//System.err.println("\n  arrivio in iteminfo.jsp --- urllll  = "+"http://"+request.getServerName()+serverPort+"/"+request.getRequestURI().substring(1).substring(0,request.getRequestURI().lastIndexOf("/"))+"survey.jsp?itemid="+titleID);
									    			} 
									    		else
													{
													%>												
														<td>
															<b><%=Messages.getString("ITEMINFO_PREVIEW_URL")%>:</b>
														</td>
														<td>
															&nbsp;...&nbsp;
														</td>													
														<td>
															<b><a href="./surveyView.jsp?itemid=<%= titleID %>"><%= "http://"+request.getServerName()+":"+request.getServerPort()+"/"+request.getRequestURI().substring(1).substring(0,request.getRequestURI().substring(1).indexOf("/"))+"/surveyView.jsp?itemid="+titleID %></a></b>
											    		</td>
										    		<%
									    			}									    		
									    		%>
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
						<td align="center" colspan=3>
							<table>
								<tr>

									<%
									String checked = "";
									String defaultHTML = "Not Assigned";
									qry = "select hid, refname from survey_html where "+uidClause+" and hid = (select case when hid is not null then hid else 0 end hid from survey_itemid where itemid='"+itemid+"')";
//System.err.println("\n  3333 arrivio in iteminfo.jsp -----  qry = "+qry);
									rs = stmt.executeQuery(qry);
									String hid ="";
									if (rs.next())
										hid = rs.getString("hid");
									%>
									<td>
										<form action=./iteminfo.jsp><INPUT TYPE="HIDDEN" NAME="action" VALUE="itemhtml">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td>
														<label for="h1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMINFO_CHANGE_HTML")%>: >  <%=Messages.getString("INDEX_COLUMN_HEADING_Html")%>  </label>
														<INPUT TYPE="HIDDEN" NAME="itemid" VALUE="<%= titleID %>">
													</td>
													<td>
														<select id="h1" name="hid">
															<option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>										
															<%
															Statement stmt2 = connection.createStatement();

																		
															String qryb = "select hid, refname from survey_html where "+ uidClause;
															Statement stmtb = connection.createStatement();
															
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
		
								</tr>
								<tr>

									<%
									String sid = "";
									String defaultSurvey = "Not Assigned";
									qry = "select sid, refname from survey_surveys where "+uidClause+" and sid = (select case when sid is not null then sid else 0 end sid from survey_itemid where itemid='"+itemid+"')";

//System.err.println("\n 4444 arrivio in iteminfo.jsp -----  qry = "+qry);

									rs = stmt.executeQuery(qry);
									if (rs.next())
										sid = rs.getString("sid");
									%>
									<td>
										<form action=./iteminfo.jsp><INPUT TYPE="HIDDEN" NAME="action" VALUE="itemsid">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td>
														<label for="s1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMINFO_CHANGE_SURVEY")%>:>  <%=Messages.getString("INDEX_COLUMN_HEADING_Survey")%>  </label>
														<INPUT TYPE="HIDDEN" NAME="itemid" VALUE="<%= titleID %>">
													</td>
													<td>
														<select name="sid">
															<option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>										
															<%																		
															qryb = "select sid,refname from survey_surveys where "+uidClause;
															stmtb = connection.createStatement();
															
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	checked = "";
																	if (sid.equals(rsb.getString("sid").trim()))
																		{
																		checked = "selected";
																		}
																	%>
																	<option value="<%= rsb.getString("sid") %>"  <%= checked %>><%= rsb.getString("sid") + " ("+rsb.getString("refname")+")" %>
																	<%
																}				
															%>
														</select>
													</td>
												</tr>
											</table>
										</form>
									</td>														
								</tr>			
							</table>
						</td>
					</tr>
					<!--tr>
						<td colspan=3>
							<hr>
						</td>
					</tr-->
			
								<tr>
									<td  valign="top" align="center">
									</td>
								</tr>
								<tr>
								<%
												// item question order management - begin
							if (itemid.length() > 0) //only for items
								{
								int questionCnt = 0;
								String qryCnt = "select count(*) cnt from sur_itemquestion where itemid ='"+itemid+"' and ordered <> 0";
								ResultSet rsSid = stmt.executeQuery(qryCnt);
								if (rsSid.next())
									questionCnt = rsSid.getInt("cnt");
								// order management q*
								qry = "select t1.qid qid, t1.question question, t2.ordered order1 from (select * from survey_questions where "+uidClause+") t1, sur_itemquestion t2 where t2.itemid ='"+itemid+"' and t1.qid=t2.qid and t1.active = 'A' and t2.ordered <> 0 order by t2.ordered";
//System.err.println("\n  5555 arrivio in iteminfo.jsp -----  qry = "+qry);
								int cnt = 1;
								rsSid = stmt.executeQuery(qry);
								if (rsSid.next())
								{
								rsSid = stmt.executeQuery(qry);
								//Begin show active item questions
								%>
								<tr>
									<td>
										<b><%=Messages.getString("ITEMINFO_ACTIVE_ITEM_QUESTION_DISPLAY_ORDER")%>:</b>
									</td>
								</tr>
								<tr>
									<td>
										<table border=1 width=100%>
											<tr>
												<td>
													<table width=100%>
														<%
														aweval.setNextPage("./iteminfo.jsp?itemid="+itemid);
														while (rsSid.next())
														{
															if (cnt == 1)
															{
																if (questionCnt > 1)
																{
																%>
																<tr><td><%= rsSid.getString("question") %></td><td><a href="./viewQuestion.jsp?qid=<%= rsSid.getString("qid") %>">View</a></td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=deactivate">Deactivate</a></td>
																<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=movedown">Move&nbsp;Down</a></td></tr>
																<%
																}
																else
																{
																%>
																<tr><td><%= rsSid.getString("question") %></td><td><a href="./viewQuestion.jsp?qid=<%= rsSid.getString("qid") %>">View</a></td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=deactivate">Deactivate</a></td>
																<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
																<%
																}
																
															}
															else if (cnt == questionCnt)
															{
												
																%>
																<tr><td><%= rsSid.getString("question") %></td><td><a href="./viewQuestion.jsp?qid=<%= rsSid.getString("qid") %>">View</a></td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=deactivate">Deactivate</a></td>
																<td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=moveup">Move&nbsp;Up</a></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
																<%
															}
															else
															{
																%>
																<tr><td><%= rsSid.getString("question") %></td><td><a href="./viewQuestion.jsp?qid=<%= rsSid.getString("qid") %>">View</a></td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=deactivate">Deactivate</a></td>
																<td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=moveup">Move&nbsp;Up</a></td><td><a href="./iteminfo.jsp?itemid=<%= itemid %>&qid=<%= rsSid.getString("qid") %>&action=movedown">Move&nbsp;Down</a></td></tr>
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
								//End display active questions
								}
									}  	// item question order management - end
								%>
								
								</tr>					
							</table>			
							<!-- WorkPage end -->
						</td>
					</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
				</table>
			<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
			<%
			connection.close();
			}
			%>
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

System.err.println("\n arrivio in tagman.jsp ----- \n");

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
System.err.println("\n arrivio in tagman.jsp ----- action = "+action);

if (action == null)
	action="";

if (!aweval.authTag(uid,request))
	{
	response.sendRedirect("./linkman.jsp");
	}
if (action.equals("loadtag"))
	{
	System.out.println("load");
	aweval.loadTag(request,uid);
	response.sendRedirect("./linkman.jsp");
	}
else if (action.equals("updatetag"))
	{
	aweval.updateTag(request, uid);
	response.sendRedirect("./aalinkman.jsp");
	System.err.println("\n arrivio in tagman.jsp ---AFTER updatetag-- action = "+action);
	}	
else if (action.equals("remtag"))
	{
	aweval.removeTag(request, uid);
	response.sendRedirect("./linkman.jsp");
	}	

	{
	String title = Messages.getString("TAGMAN_TITLE");
%>

<br/>
	<DIV align=left>
	   <H3><%= title %></H3>
	</DIV>


	<table width="100%" border=1>
		<!--tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[3];
					int activeTab = 1;/*
					pageNav[0] ="Manage Surveys";
					pageNav[1] ="Manage Items";
					pageNav[2] ="Manage HTML";*/
					//pageNav[3] ="Links for Surveys";
					pageNav[0] = Messages.getString("INDEX_PAGENAV_2");
					pageNav[1] = Messages.getString("INDEX_PAGENAV_1");
					pageNav[2] = Messages.getString("INDEX_PAGENAV_4");
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./surveyman.jsp";
					pageNavTargets[1] ="./itemman.jsp";
					pageNavTargets[2] ="./htmlman.jsp";
					//pageNavTargets[3] ="./linkman2.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
					//String title = "Tag Management: Substitution Tags";

				%>
			</td>
		</tr-->
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
				<%
				Connection connection = aweval.getConnection();
				Connection connection2 = aweval.getConnection();
				Statement stmt = connection.createStatement();
			    String qry = "";
				String tid = request.getParameter("tid");

				if (tid==null)
					tid = "0";
				
			    ResultSet rs = null;
			
			    int itemPageSize = 5;	
			    int pageCnt = 5;		    
			    String stringIpos = request.getParameter("ipos");			           
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
    				    
			    %>		
				<table>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>				
					<tr>
						<td  valign="top">
							<table border=1 width="100%">
							<%
							qry = "Select tid, tagname, tagvalue from survey_tags  where "+uidClause;
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr abgcolor="#9999ff"  class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_1")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_2")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_3")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_4")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_5")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("TAGMAN_COLUMN_HEADING_6")%></th>
								</tr>
								<tr>
									<td>
										&nbsp;
									</td>
									<td>
										&lt;itemname&gt;
									</td>
									<td>
										item 
									</td>
									<td>
										<form action=./viewQuestion.jsp>
											<table cellspacing="0" cellpadding="0">
												<tr>												
														<%
														String qryb = "select qid, question from survey_questions where "+uidClause+" and question like '%<itemname>%'";
														Statement stmtb = connection2.createStatement();
														ResultSet rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
															{
															%>																					
													<td>
														<select name="qid" size="3">								
															<%
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	//System.out.println(rsb.getString("question"));
																	//System.out.println("---> "+aweval.replaceTag(aweval.replaceTags(uid, rsb.getString("question")),"<itemname>","&lt;itemname&gt;"));
																	%>
																	<option value="<%= rsb.getString("qid") %>"><%= rsb.getString("qid")+" - "+ aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rsb.getString("question")),"<itemname>","&lt;itemname&gt;"),15) %>
																	<%
																}				
															%>
														</select>
														<input type="submit" value="Go">
													</td>
															<%
															}
														else
															{
															%>
															<td>
															<%=Messages.getString("TAGMAN_COLUMN_HEADING_7")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>
									<td>
										<form action="./htmlview.jsp">
											<table cellspacing="0" cellpadding="0">
												<tr>												
														<%
														qryb = "select hid, refname from survey_html where "+uidClause+" and (header like '%<itemname>%' or footer like '%<itemname>%')";
														stmtb = connection2.createStatement();
														rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
															{
															%>																					
													<td>
														<select name="hid" size="3">								
															<%
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	%>
																	<option value="<%= rsb.getString("hid") %>"><%= rsb.getString("hid")+" - "+ rsb.getString("refname") %>
																	<%
																}				
															%>
														</select>
														<input type="submit" value="Go">
													</td>
															<%
															}
														else
															{
															%>
															<td>
															<%=Messages.getString("TAGMAN_COLUMN_HEADING_7")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>

									<td>
										<%=Messages.getString("TAGMAN_COLUMN_HEADING_8")%>
									</td>
								</tr>
								<%
								int rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
								String curTag = tid;
								while (rs.next())
								{
								if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
								if (rowcnt%2 == 1)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
								curTag = rs.getString("tagname");
								%>
								<tr bgcolor="<%= rowcolor %>">
									<td>
										<%= rs.getString("tid") %>
									</td>								
									<td>
										<a href="./linkman.jsp?action=edit&tid=<%= rs.getString("tid") %>">&lt;<%= rs.getString("tagname") %>&gt;</a>
									</td>
									<td>
										<%= aweval.substrOrLess(rs.getString("tagvalue"),40) %>
									</td>									
									<td>
										<form action=./viewQuestion.jsp>
											<table cellspacing="0" cellpadding="0">
												<tr>												
														<%
														qryb = "select qid, question from survey_questions where "+uidClause+" and question like '%<"+curTag+">%'";
														stmtb = connection2.createStatement();
														rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
															{
															%>																					
													<td>
														<select name="qid" size="3">								
															<%
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	System.out.println(rsb.getString("question"));
																	System.out.println("---> "+aweval.replaceTag(aweval.replaceTags(uid, rsb.getString("question")),"<itemname>","&lt;itemname&gt;"));

																	%>
																	<option value="<%= rsb.getString("qid") %>"><%= rsb.getString("qid")+" - "+ aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rsb.getString("question")),"<itemname>","&lt;itemname&gt;"),15) %>
																	<%
																}				
															%>
														</select>
														<input type="submit" value="Go">
													</td>
															<%
															}
														else
															{
															%>
															<td>
															<%=Messages.getString("TAGMAN_COLUMN_HEADING_7")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>
									<td>
										<form action="./htmlview.jsp">
											<table cellspacing="0" cellpadding="0">
												<tr>												
														<%
														qryb = "select hid, refname from survey_html where "+uidClause+" and (header like '%<"+curTag+">%' or footer like '%<itemname>%')";
														stmtb = connection2.createStatement();
														rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
															{
															%>																					
													<td>
														<select name="hid" size="3">								
															<%
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	%>
																	<option value="<%= rsb.getString("hid") %>"><%= rsb.getString("hid")+" - "+ rsb.getString("refname") %>
																	<%
																}				
															%>
														</select>
														<input type="submit" value="Go">
													</td>
															<%
															}
														else
															{
															%>
															<td>
															<%=Messages.getString("TAGMAN_COLUMN_HEADING_7")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>
									
									<td>
										<form action="./linkman.jsp" >
											<input type="hidden" name="action" value="remtag">
											<input type="hidden" name="tid" value="<%= rs.getString("tid") %>">											
											<input type="hidden" name="tagname" value="<%= rs.getString("tagname") %>">											
											<input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%>>
										</form>
									</td>									
								</tr>
								<%
								}
							}
							%>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<%
							int icnt = 0;
							qry = "select count(*) cnt from survey_tags where "+uidClause;
							rs = stmt.executeQuery(qry);
							if (rs.next())
								icnt = rs.getInt("cnt");
							%>
   							 <%=Messages.getString("INDEX_PAGE")%>:
							<%
								aweval.pageCount(out, "./linkman.jsp?ipos=", ipos, icnt, pageCnt, itemPageSize);
							%>							
						</td>
					</tr>
					<tr>
						<td>
							<hr>
						</td>
					</tr>
					<tr>
						<td>
							<table width=100%>
								<tr>
									<td>
										<%
										String tagName ="";
										String actionString = "loadtag";
										String buttonValue = Messages.getString("LINKMAN_BUTTON_LOAD");
										//tid = "";
										String tagvalue = "";
										if (action.equals("edit"))
										{
										qry = "select tid, tagname, tagvalue from survey_tags where tid="+tid;
										rs = stmt.executeQuery(qry);
										if (rs.next())
											{
											tid = rs.getString("tid");
											tagName = rs.getString("tagname");
											tagvalue = rs.getString("tagvalue");
											buttonValue = Messages.getString("LINKMAN_COLUMN_HEADING_2");
											actionString = "updatetag";
											}
										}

										%>
										<form name="load" action="./linkman.jsp" method="get">
										<input type="hidden" name="action" value="<%= actionString %>">
										<input type="hidden" name="tid" value="<%= tid %>">
										<table>
											<tr>
												<td>
													<b><%=Messages.getString("TAGMAN_LOAD_TAG")%>:</b>
												</td>
											</tr>
											<tr>
												<td>
													<label for="lt1"><%=Messages.getString("TAGMAN_COLUMN_HEADING_2")%>:</label>
												</td>
												<td>
													<input id="lt1" name="tagname" type="text" value="<%= tagName %>" maxlength=60 size=45>
												</td>
											</tr>
											<tr>
												<td>
													<label for="l1"><%=Messages.getString("TAGMAN_COLUMN_HEADING_2")%>:</label>
												</td>
												<td>
													<input id="l1" name="tagvalue" type="text"  value="<%= tagvalue %>" maxlength=256 size=45>
												</td>
											</tr>
											<tr>
												<td>
													<input type="submit" value="<%= buttonValue %>:">
												</td>
											</tr>											
										</table>
										</form>
									</td>
								</tr>				
							</table>			
						</td>
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
connection2.close();
}
%>

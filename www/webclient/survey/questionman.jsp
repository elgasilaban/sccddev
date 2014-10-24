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
//System.err.println("\n arrivio in questionman.jsp ----- \n");
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
	String uid = ident.getUid();
//	String uidClause = "userid='"+uid+"' ";
    String uidClause = "userid like '%' ";

	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";
	String title = Messages.getString("QUESTIONMAN_TITLE");
	String databaseProductName = aweval.getDatabaseProductName();
	
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
					String [] pageNav = new String[3];
					int activeTab = 1;
					/*pageNav[0] ="Work with Standard Questions";
					pageNav[1] ="Create a new Standard Question";
					pageNav[2] ="Work with Archived Questions";*/
					
					pageNav[1] = Messages.getString("QUESTIONMAN_PAGENAV_1");
					pageNav[0] = Messages.getString("QUESTIONMAN_PAGENAV_2");
					pageNav[2] = Messages.getString("QUESTIONMAN_PAGENAV_3");
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[1] ="./standardQuestions.jsp";
					pageNavTargets[0] ="./addStandardNew.jsp";
					pageNavTargets[2] ="./archivedQuestions.jsp";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
					//String title = "Question&nbsp;Management";					
					
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
				<!-- WorkPage end -->
				<%
				Connection connection = aweval.getConnection();
				Statement stmt = connection.createStatement();
			    String qry = "";
			    //ResultSet rs1 = stmt.executeQuery(qry);
			    ResultSet rs = null;
				
				int rowcnt = 0;
			    int itemPageSize = 5;
			    int pageCnt = 5;			    			    
			    String stringIpos = request.getParameter("ipos");			           
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);

			    int questionPageSize = 10;			    
			    String stringQpos = request.getParameter("qpos");			           
			    int qpos = 0;
			    if (stringQpos != null)
			    	qpos = Integer.parseInt(stringQpos);

				String [] col = {"ID","Question","Type","Style","Active"};
				String [] ord = {"asc","asc","asc","asc","asc"};
				
				int colNum = 2;
				String colItem = request.getParameter("col");
				if (colItem!=null)
					colNum = Integer.parseInt(colItem)-1;
    				
    				    
			    %>		
				<table width="100%">
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td width=20>
							&nbsp;
						</td>
						<td  valign="top">
							<table border=1 width="100%">
							<%
													
							if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
	
						   	qry = "select t1.qid id, question, "+
						   		" case when type ='A' then 'General Question' when type='U' then concat(t2.itemid,' Question') end type ,"+
						   		" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   		" case when active='F' then 'Archived' when (Active ='A' or Active='I')  and type='A' then 'Published' when Active='D' then 'Draft' when Active='A' and Type='U' then 'Published (In use)' when Active='I' and Type='U' then 'Published (Not in use)' else Active end active "+
						   		" from (select * from survey_questions where "+uidClause+") t1 left outer join sur_itemquestion t2 on t1.qid=t2.qid order by "+col[colNum]+" "+ord[colNum];
							} else 
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
						   	qry = "select t1.qid id, question, "+
						   		" case when type ='A' then 'General Question' when type='U' then concat(t2.itemid,' Question') end type ,"+
						   		" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   		" case when active='F' then 'Archived' when (Active ='A' or Active='I')  and type='A' then 'Published' when Active='D' then 'Draft' when Active='A' and Type='U' then 'Published (In use)' when Active='I' and Type='U' then 'Published (Not in use)' else Active end active "+
						   		" from (select * from survey_questions where "+uidClause+") t1 left outer join sur_itemquestion t2 on t1.qid=t2.qid order by "+col[colNum]+" "+ord[colNum];

							} else {
						   	qry = "select t1.qid id, question, "+
						   		" case when type ='A' then 'General Question' when type='U' then t2.itemid+' Question' end type ,"+
						   		" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   		" case when active='F' then 'Archived' when (Active ='A' or Active='I')  and type='A' then 'Published' when Active='D' then 'Draft' when Active='A' and Type='U' then 'Published (In use)' when Active='I' and Type='U' then 'Published (Not in use)' else Active end active "+
						   		" from (select * from survey_questions where "+uidClause+") t1 left outer join sur_itemquestion t2 on t1.qid=t2.qid order by "+col[colNum]+" "+ord[colNum];
							}

                             //System.err.println("\n arrivio in questionman.jsp ----- qry = "+qry);

						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr abgcolor="#9999ff"  class="headerbar"> 
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										String columnHeading = rsmd.getColumnName(i);
										columnHeading = columnHeading.substring(0,1).toUpperCase() + columnHeading.substring(1,columnHeading.length()).toLowerCase();

										out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;cursor:pointer;text-decoration:underline;;'><a href=\"./questionman.jsp?col="+i+"\">"+Messages.getString("QUESTIONMAN_COLUMN_HEADING_"+columnHeading+"")+"</a></th>");
									}
								
								%>
								</tr>
								<%
								rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
							
								while (rs.next())
								{
								if (rowcnt++ < qpos*questionPageSize || rowcnt > ((qpos+1)*questionPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%

								for (int i = 1; i <= colCount; i ++)
									{
										if (rsmd.getColumnName(i).toLowerCase().equals("id"))
										{
											if (rs.getString("active").trim().equals("Draft"))
											{
												%>
												<td>
													<a href="addStandardNew.jsp?action=load&qid=<%= aweval.substrOrLess(rs.getString(i),20) %>"><%= aweval.substrOrLess(rs.getString(i),20) %></a>
												</td>
												<%
											}
											else
											{
												%>
												<td>
													<a href="viewQuestion.jsp?qid=<%= aweval.substrOrLess(rs.getString(i),20) %>"><%= aweval.substrOrLess(rs.getString(i),20) %></a>
												</td>
												<%
											}	
										}
										else if(rsmd.getColumnName(i).toLowerCase().equals("question"))
										{
										 //System.out.println("question here..."+aweval.replaceTag(aweval.replaceTags(uid, rs.getString(i)),"<itemname>","&lt;itemname&gt;"));
											%>
											<td>
												<%= aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rs.getString(i)),"<itemname>","&lt;itemname&gt;"),35) %>
											</td>
											<%
										}
										else
										{
											%>
											<td>
												<%= aweval.substrOrLess(rs.getString(i),20) %>
											</td>
											<%
										}
									}
								%>
								</tr>
								<%
								
								}
							}
							%>
							</table>
						</td>
						<td width=20>
							&nbsp;
						</td>						
					</tr>
					<tr>
						<td>
							&nbsp;
						</td>
						<td>						
							<%=Messages.getString("INDEX_PAGE")%>:
							<%
								aweval.pageCount(out, "./questionman.jsp?col="+(colNum+1)+"&qpos=", qpos, rowcnt-1, pageCnt, questionPageSize);
							%>
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
									<td>
										<table>
											<tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_PUBLISH_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int itemTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and type='A' and active <> 'D'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													itemTot = rs.getInt("cnt");
												%>
												<td>
													<%= itemTot %>
												</td>				
											</tr>
											<tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_DRAFT_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int surveyTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and  type='A' and active = 'D'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													surveyTot = rs.getInt("cnt");
												%>
												<td>
													<%= surveyTot %>
												</td>
											</tr>
											<!--tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_INUSE_ITEM_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int htmlTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and type='U' and active = 'A'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													htmlTot = rs.getInt("cnt");
												%>
												<td>
													<%= htmlTot %>
												</td>				
											</tr-->
										</table>
									</td>
									<td width=20>
										&nbsp;
									</td>
									<td>
										<table>
											<!--tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_UNUSED_ITEM_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int unusedTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and type='U' and active = 'I'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													unusedTot = rs.getInt("cnt");
												%>
												<td>
													<%= unusedTot %>
												</td>				
											</tr>								
											<tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_DRAFT_ITEM_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int draftTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and type='U' and active = 'D'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													draftTot = rs.getInt("cnt");
												%>
												<td>
													<%= draftTot %>
												</td>				
											</tr-->																
											<tr>
												<td>
													<%=Messages.getString("QUESTIONMAN_ARCHIVE_ITEM_QUEST")%>:
												</td>
												<td>
												&nbsp;....&nbsp;
												</td>						
												<%
												int archivedTot = 0;
												qry = "select count(*) cnt from survey_questions where "+uidClause+" and active = 'F'";
												rs = stmt.executeQuery(qry);
												if (rs.next())
													archivedTot = rs.getInt("cnt");
												%>
												<td>
													<%= archivedTot %>
												</td>				
											</tr>								
										</table>
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
   aweval.setLastPage("./questionman.jsp");
   connection.close();
%>

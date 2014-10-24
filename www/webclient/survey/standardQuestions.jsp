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
//System.err.println("\n arrivio in standardQuestions.jsp ----- \n");

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
%>
	<%

	String uid = ident.getUid();
//	String uidClause = "userid='"+uid+"' ";
    String uidClause = "userid like '%' ";


    if (request.getParameter("itemid") != null && !request.getParameter("itemid").equals("null"))
    	response.sendRedirect("./itemQuestions.jsp?itemid="+request.getParameter("itemid"));

    String action = request.getParameter("action");
    if (action == null)
    	action = "";
    String itemid=request.getParameter("itemid");
    
    String msg = "";
    if (action.equals("publish"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.publishQuestion(request);
		   	response.sendRedirect("./standardQuestions.jsp"); 
	   	}     
    else if (action.equals("delete"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.deleteQuestion(request);
		   	response.sendRedirect("./standardQuestions.jsp"); 
	   	}  	   	    
   else if (action.equals("clone"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		response.sendRedirect("./addStandardNew.jsp?action=load&qid="+aweval.cloneQuestion(request,uid));
	   	}
   else if (action.equals("archive"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   	aweval.archiveQuestion(request);
		   	response.sendRedirect("./standardQuestions.jsp"); 
	   	}  		   	
    else
    	{
    		msg = aweval.getMessage();
    		
    int file_max = 0;
    Connection connection = aweval.getConnection();
    Statement stmt = connection.createStatement();
    Statement stmt2 = connection.createStatement();    
    ResultSet rs = null;
    ResultSet rs2 = null;
    String qry = "";
    
	int rowcnt = 0;

    int pubPageSize = 5;
    int pageCnt = 5;			    
    String stringPpos = request.getParameter("ppos");			           
    int ppos = 0;
    if (stringPpos != null)
    	ppos = Integer.parseInt(stringPpos);

    int draftPageSize = 5;			    
    String stringDpos = request.getParameter("dpos");			           
    int dpos = 0;
    if (stringDpos != null)
    	dpos = Integer.parseInt(stringDpos);
	aweval.setNextPage("./standardQuestions.jsp");
	%>
	<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>


	 		
 <br/>
	<DIV align=left>
	   <H3><%=Messages.getString("STANDARDQUESTIONS_TITLE")%></H3>
	</DIV>

	<table width="100%" border=1>
		<tr>

			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					/*pageNav[0] ="Work with Items";
					pageNav[1] ="Create a new Standard Question";
					pageNav[2] ="Work with Archived Questions";	*/
					//pageNav[2] ="alphaWorks";
					//pageNav[3] ="newtab";
					//pageNav[0] = Messages.getString("STANDARDQUESTIONS_PAGENAV_1");
					pageNav[0] = Messages.getString("STANDARDQUESTIONS_PAGENAV_2");
					pageNav[1] = Messages.getString("STANDARDQUESTIONS_PAGENAV_3");

					
					String [] pageNavTargets = new String[2];
					//pageNavTargets[0] ="./itemman.jsp";
					pageNavTargets[0] ="./addStandardNew.jsp";
					pageNavTargets[1] ="./archivedQuestions.jsp";					
					//pageNavTargets[2] ="./evalreport.jsp?dtype=all";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
		<!--tr>
			<td align="center">
				<form action="./itemQuestions.jsp">
				<table>
					<tr>
						<td>
							<label for="i1"><%=Messages.getString("STANDARDQUESTIONS_SWITCH_ITEM_QUEST")%>:</label>
						</td>
						<td>
							<select id="i1" name="itemid" >
								<%
								qry = "select itemid,itemshortname from survey_itemid where "+uidClause+" order by itemid";
								stmt = connection.createStatement();
								rs = stmt.executeQuery(qry);
								while (rs.next()) {
								%>
								<option value="<%=rs.getString("itemid")%>"><%=rs.getString("itemshortname")%>
								<%
								}
								%>
							</select>
						</td>
						<td>
							<input type="submit" value=<%=Messages.getString("INDEX_BUTTON_GO")%>>												
						</td>
					</tr>
				</table>
				</form>
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
				<!-- Workspace begins -->
				<table border=0 width=80%>
					<tr> 
						<td valign="bottom">
							<b><%=Messages.getString("STANDARDQUESTIONS_PUBLISHED")%></b>
						</td>
					</tr>
					<tr>
						<td  valign="top" colspan=2>
							<table border=1 width=100%>
							<%
				
//System.err.println("\n arrivio 1111 in standardQuestions.jsp ----- databaseProductName = "+databaseProductName);
									
						   
						   if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
								//it's for oracle -- changed to view1
                             qry = 	"select concat('<a href=\"./viewQuestion.jsp?qid=',concat((qid),'\">Open</a>')) View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single-Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=clone&qid=',concat((qid),'\">New&nbsp;Copy</a>')) Clone, "+						   			
						   			" concat('<a href=\"./standardQuestions.jsp?action=archive&qid=',concat((qid),'\">Archive</a>')) Archive  from survey_questions where "+uidClause+" and type='A' and Active <> 'D' and Active <> 'F'  order by qid";
							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//It's for db2 : venkyg		   
				 qry = 	"select concat('<a href=\"./viewQuestion.jsp?qid=',concat(char(qid),'\">Open</a>')) View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single-Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=clone&qid=',concat(char(qid),'\">New&nbsp;Copy</a>')) Clone, "+						   			
						   			" concat('<a href=\"./standardQuestions.jsp?action=archive&qid=',concat(char(qid),'\">Archive</a>')) Archive  from survey_questions where "+uidClause+" and type='A' and Active <> 'D' and Active <> 'F'  order by qid"; 
							} else
							{
								//It's for sqs : venkyg		   
				            /* qry = 	"select '<a href=\"./viewQuestion.jsp?qid=' + char(qid) + '\">Open</a>' View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single-Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" '<a href=\"./standardQuestions.jsp?action=clone&qid=' + char(qid) + '\">New&nbsp;Copy</a>' Clone, "+						   			
						   			" '<a href=\"./standardQuestions.jsp?action=archive&qid=' + char(qid) + '\">Archive</a>' Archive  from survey_questions where "+uidClause+" and type='A' and Active <> 'D' and Active <> 'F'  order by qid"; */ 

									qry = 	"select '<a href=\"./viewQuestion.jsp?qid='+ CAST(qid AS varchar(10)) +'\">Open</a>' View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='Q' then 'Single-Pulldown' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" '<a href=\"./standardQuestions.jsp?action=clone&qid='+ CAST(qid AS varchar(10)) +'\">New&nbsp;Copy</a>' Clone, "+						   			
						   			" '<a href=\"./standardQuestions.jsp?action=archive&qid='+ CAST(qid AS varchar(10)) +'\">Archive</a>' Archive  from survey_questions where "+uidClause+" and type='A' and Active <> 'D' and Active <> 'F'  order by qid";

							 //System.err.println("\n 0000 from SQS ----- = ");

							}
							

				//System.err.println("\n 0000 arrivio in standardQuestions.jsp ----- qry = "+qry);

						   	//qry = "select question, style, active from survey_questions where "+uidClause;
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
							<tr abgcolor="#9999ff" class="headerbar">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										String columnHeading = rsmd.getColumnName(i);
										columnHeading = columnHeading.substring(0,1) + columnHeading.substring(1,columnHeading.length()).toLowerCase();

										if(columnHeading.equals("View1"))
										out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_VIEW")+"</th>");
										else
										out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_"+columnHeading)+"</th>");
									}			
								%>
								</tr>
								<%
								
								String rowcolor = "#9999ff";
						
								while (rs.next())
								{
								if (rowcnt++ < ppos*pubPageSize || rowcnt > ((ppos+1)*pubPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%

								for (int i = 1; i <= colCount; i ++)
									{
									if(rsmd.getColumnName(i).toLowerCase().equals("question"))
										{
											%>
											<td>
												<%= aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rs.getString(i)),"<itemname>","&lt;itemname&gt;"),35) %>
											</td>
											<%
										}
									else									
										{
										   //System.err.println("\n arrivio in standardQuestions.jsp ----- "+rs.getString(i));
										   String trText = "";
										   if(rs.getString(i).equals("Open"))
											   trText = Messages.getString("INDEX_BUTTON_OPEN");
										   else
										   if(rs.getString(i).equals("New Copy"))
											   trText = Messages.getString("SURVEYMAN_COLUMN_HEADING_5");
										   else
										   	if(rs.getString(i).equals("Archive"))
											   trText = Messages.getString("STANDARDQUESTIONS_Archive");



										%>
										<td>
											<%= rs.getString(i) %>
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
					</tr>
					<tr>
						<td>
							<%=Messages.getString("INDEX_PAGE")%>:
							<%
								aweval.pageCount(out, "./standardQuestions.jsp?dpos="+ dpos +"&ppos=", ppos, rowcnt, pageCnt, pubPageSize);
							%>
						</td>
					</tr>	
					<tr>
						<td colspan="2">
							<hr>
						</td>
					</tr>																	
					<tr> 
						<td valign="bottom">
							<b><%=Messages.getString("STANDARDQUESTIONS_Draft")%></b>
						</td>
					</tr>
					<tr>
						<td  valign="top" colspan="2">
							<table border=1 width=100%>
							<%
						   	
									
						   if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
								//it's for oracle -- changed to Modify1, Publish1, Delete1
						   	qry = 	"select concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat((qid),'\">Edit</a>')) Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=publish&qid=',concat((qid),'\">Publish</a>')) Publish1,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=delete&qid=',concat((qid),'\">Delete</a>')) Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'D' and Active <> 'F'  order by createtime desc";

							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg

							 qry = 	"select concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat(char(qid),'\">Edit</a>')) Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=publish&qid=',concat(char(qid),'\">Publish</a>')) Publish1,"+
						   			" concat('<a href=\"./standardQuestions.jsp?action=delete&qid=',concat(char(qid),'\">Delete</a>')) Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'D' and Active <> 'F'  order by createtime desc"; 


							} else
							{
								//It's for sqs : venkyg	 	   + CAST(qid AS varchar(10)) +
							 	qry = 	"select '<a href=\"./addStandardNew.jsp?action=load&qid='+ CAST(qid AS varchar(10)) +'\">Edit</a>' Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" '<a href=\"./standardQuestions.jsp?action=publish&qid='+ CAST(qid AS varchar(10)) +'\">Publish</a>' Publish1,"+
						   			" '<a href=\"./standardQuestions.jsp?action=delete&qid='+ CAST(qid AS varchar(10)) +'\">Delete</a>' Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'D' and Active <> 'F'  order by createtime desc"; 
							}
							//<a href="./standardQuestions.jsp?action=publish&qid=00011. ">Publish</a>

				//System.err.println("\n 22222 arrivio in standardQuestions.jsp ----- qry = "+qry);

						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr abgcolor="#9999ff" class="headerbar">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										String columnHeading = rsmd.getColumnName(i);
										columnHeading = columnHeading.substring(0,1) + columnHeading.substring(1,columnHeading.length()).toLowerCase();

										if(columnHeading.equals("View1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_VIEW")+"</th>");
										else
										if(columnHeading.equals("Modify1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_MODIFY")+"</th>");
										else
										if(columnHeading.equals("Publish1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("ITEMMAN_BUTTON_PUBLISH")+"</th>");
										else
										if(columnHeading.equals("Delete1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_DELETE")+"</th>");
										else
										out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+ Messages.getString("STANDARDQUESTIONS_"+columnHeading.toUpperCase())+"</th>");
									}			
								%>
								</tr>
								<%
								rowcnt = 0;
								String rowcolor = "#9999ff";
						
								while (rs.next())
								{
								if (rowcnt++ < dpos*draftPageSize || rowcnt > ((dpos+1)*draftPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%

								for (int i = 1; i <= colCount; i ++)
									{
									if(rsmd.getColumnName(i).toLowerCase().equals("question"))
										{
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
											<%= rs.getString(i) %>
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
					</tr>
					<tr>
						<td>
    						<%=Messages.getString("INDEX_PAGE")%>:
							<%
								aweval.pageCount(out, "./standardQuestions.jsp?ppos="+ ppos +"&dpos=", dpos, rowcnt, pageCnt, draftPageSize);
							%>
						</td>
					</tr>	
					
				</table>
				<!-- Workspace end -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
 connection.close();
 }
%>

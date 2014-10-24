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
//System.err.println("\n arrivio in archivedQuestions.jsp ----- \n");
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
%>
	<%
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
	String uid = ident.getUid();
//	String uidClause = "userid='"+uid+"' ";
    String uidClause = "userid like '%' ";


    if (request.getParameter("itemid") != null)
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
		   	response.sendRedirect("./archivedQuestions.jsp"); 
	   	}     
    else if (action.equals("delete"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.deleteQuestion(request);
		   	response.sendRedirect("./archivedQuestions.jsp"); 
	   	}  	   	    		   	
    else
    	{
    		//msg = aweval.getMessage();
    		
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

	String title = Messages.getString("ARCHIVEDQUESTIONS_TITLE");
	
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
					/*pageNav[0] ="Work with Item Questions";
					pageNav[1] ="Work with Standard Questions";*/
					//pageNav[2] ="alphaWorks";
					//pageNav[3] ="newtab";
					pageNav[0] = Messages.getString("ADDSTANDARDNEW_PAGENAV_1");
					pageNav[1] = Messages.getString("QUESTIONMAN_PAGENAV_1");
					
					String [] pageNavTargets = new String[2];
					pageNavTargets[0] ="./itemman.jsp";
					pageNavTargets[1] ="./standardQuestions.jsp";
					//pageNavTargets[2] ="./evalreport.jsp?dtype=all";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
					//String title = "Question Management: Archived Questions";


				%>
			</td>



				 
		</tr>
		<!--tr>
			<td align="center">
				<form action="./itemQuestions.jsp">
				<table>
					<tr>
						<td>
							<%=Messages.getString("ARCHIVEDQUESTIONS_SWITCH_ITEM_QUE")%>:
						</td>
						<td>
							<select name="itemid" >
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
							<input type="submit" value="Go">
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
						<td>
							<b><%=Messages.getString("ARCHIVEDQUESTIONS_ARCHIVED_STANDARD_QUE")%></b>
						</td>
					</tr>
					<tr>
						<td  valign="top">
							<table border=1 width=100%>
							<%


					 if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
					  {
						   	qry = 	"select concat('<a href=\"./viewQuestion.jsp?action=load&qid=',concat((qid),'\">Open</a>')) View1, question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./archivedQuestions.jsp?action=publish&qid=',concat((qid),'\">Publish</a>')) Republish, "+
									" concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat((qid),'\">Edit</a>')) Edit, "+															   			
									" concat('<a href=\"./archivedQuestions.jsp?action=delete&qid=',concat((qid),'\">Delete</a>')) Delete1 "+															 									
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'F'  order by qid";
					  } else
					  if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
					  {
						  //it's for db2 : venkyg
						  	qry = 	"select concat('<a href=\"./viewQuestion.jsp?action=load&qid=',concat(char(qid),'\">Open</a>')) View1, question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" concat('<a href=\"./archivedQuestions.jsp?action=publish&qid=',concat(char(qid),'\">Publish</a>')) Republish, "+
									" concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat(char(qid),'\">Edit</a>')) Edit, "+															   			
									" concat('<a href=\"./archivedQuestions.jsp?action=delete&qid=',concat(char(qid),'\">Delete</a>')) Delete1 "+															 									
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'F'  order by qid";

					  } else
    				  {
						   	qry = 	"select '<a href=\"./viewQuestion.jsp?action=load&qid='+ CAST(qid AS varchar(10)) +'\">Open</a>' View1, question,"+
						   			" case when style ='R' then 'Radio' when style='S' then 'Satisfaction' when style='P' then 'Multiple Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' when style='H' then 'Header Rule' when style='J' then 'Statement' end Style,"+
						   			" '<a href=\"./archivedQuestions.jsp?action=publish&qid='+ CAST(qid AS varchar(10)) + '\">Publish</a>' Republish, "+
									" '<a href=\"./addStandardNew.jsp?action=load&qid='+ CAST(qid AS varchar(10)) +'\">Edit</a>' Edit, "+															   			
									" '<a href=\"./archivedQuestions.jsp?action=delete&qid='+ CAST(qid AS varchar(10)) +'\">Delete</a>' Delete1 "+															 									
						   			" from survey_questions where "+uidClause+" and type='A' and Active = 'F'  order by qid";

					  }



//System.err.println("\n arrivio in archivedQuestions.jsp ----- qry = "+qry);
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr bgcolor="#9999ff" class="headerbar">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										if(rsmd.getColumnName(i).equalsIgnoreCase("VIEW1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_VIEW")+"</th>");
										else
										if(rsmd.getColumnName(i).equalsIgnoreCase("DELETE1"))
											out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_DELETE")+"</th>");
										else
										out.println("<th class='text tabletitle' style='height:12px;padding-left:2px;padding-right:2px;;'>"+Messages.getString("STANDARDQUESTIONS_"+rsmd.getColumnName(i).toUpperCase())+"</th>");
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
												<%= aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rs.getString(i)),"<itemname>","&lt;itemname&gt;"),20) %>
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
							Page: 
							<%
								aweval.pageCount(out, "./archivedQuestions.jsp?dpos="+ dpos +"&ppos=", ppos, rowcnt-1, pageCnt, pubPageSize);
							%>
						</td>
					</tr>	
				<!-- Workspace end -->
			</td>
		</tr>

	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
 connection.close();
 }
%>

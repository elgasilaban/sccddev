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
System.err.println("\n  arrivio in itemiQuestions.jsp -----  ");
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
%>
	<%
if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";
		
	
    if (request.getParameter("itemid") == null)
    	response.sendRedirect("./standardQuestions.jsp");
    
    String action = request.getParameter("action");
    if (action == null)
    	action = "";
    String itemid=request.getParameter("itemid");
    
    if (action.equals("publish"))
	   	{
	   		if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.publishQuestion(request);
		   	response.sendRedirect("./itemQuestions.jsp?itemid="+itemid); //aweval.getNextPage());
	   	}     
    else if (action.equals("activate")) 
	   	{
	   		if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.activateQuestion(request);
		   	response.sendRedirect("./itemQuestions.jsp?itemid="+itemid); //response.sendRedirect(aweval.getNextPage());
	   	}     
    else if (action.equals("deactivate"))
	   	{
	   		if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.deactivateQuestion(request);
		   	response.sendRedirect("./itemQuestions.jsp?itemid="+itemid); //response.sendRedirect(aweval.getNextPage());		   	
	   	}
    else if (action.equals("delete"))
	   	{
	   		if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.deleteQuestion(request);
		   	response.sendRedirect("./itemQuestions.jsp?itemid="+itemid); //response.sendRedirect(aweval.getNextPage());		   	
	   	}
    else if (action.equals("archive"))
	   	{
	   		if (aweval.authItem(uid,request) && aweval.authQuestion(uid,request))
		   		aweval.archiveQuestion(request);
		   	response.sendRedirect("./itemQuestions.jsp?itemid="+itemid); 
	   	}	   	  	   	    

    aweval.setLastPage("./itemQuestions.jsp");	
    int file_max = 0;
    Connection connection = aweval.getConnection();
    Statement stmt = connection.createStatement();
    Statement stmt2 = connection.createStatement();    
    ResultSet rs = null;
    ResultSet rs2 = null;
    String qry = "";
    
	int rowcnt = 0;
    int questionPageSize = 5;			    
    String stringQpos = request.getParameter("qpos");			           
    int qpos = 0;
    if (stringQpos != null)
    	qpos = Integer.parseInt(stringQpos);


    int pubPageSize = 5;			    
    String stringPpos = request.getParameter("ppos");			           
    int ppos = 0;
    if (stringPpos != null)
    	ppos = Integer.parseInt(stringPpos);

    int draftPageSize = 5;			    
    String stringDpos = request.getParameter("dpos");			           
    int dpos = 0;
    if (stringDpos != null)
    	dpos = Integer.parseInt(stringDpos);

	String publicItem = "N";
	qry = "select item, itemid, itemshortname,sid, case when ispublic = 'Y' then 'Published' else 'Not published' end ispublic from survey_itemid where "+uidClause+" and itemid='"+itemid+"'";
System.err.println("\n -11111 arrivio in itemiQuestions.jsp -----  qry = "+qry);
	rs = stmt.executeQuery(qry);
	String title = "";
	String titleShort = "";
	String titleID = "";
	if (rs.next())
		{
		title = rs.getString("item");
		titleShort = rs.getString("itemshortname");
		titleID = rs.getString("itemid");
		publicItem = rs.getString("ispublic");    				    				
		}	 	    

	%>
	<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%=Messages.getString("ITEMQUESTIONS_TITLE")%> <%= title %></H3>
	</DIV>

	<table width="100%" border=1>
		<tr>

			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					/*pageNav[0] ="Work with Standard Questions";
					pageNav[1] ="Create a new "+titleShort+" Question";
					pageNav[2] ="Question Display Order";
					pageNav[3] ="Preview Item Survey";*/
					//pageNav[3] ="newtab";
					
					pageNav[0] = Messages.getString("ITEMQUESTIONS_PAGENAV_1");
					pageNav[1] = Messages.getString("ITEMINFO_CREATE_NEW") + titleShort + Messages.getString("ITEMINFO_QUESTIONS");
					pageNav[2] = Messages.getString("ITEMQUESTIONS_PAGENAV_3");
					pageNav[3] = Messages.getString("ITEMQUESTIONS_PAGENAV_4");

					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./standardQuestions.jsp";
					pageNavTargets[1] ="./addStandardNew.jsp?itemid="+itemid;
					pageNavTargets[2] ="./iteminfo.jsp?itemid="+itemid;
					pageNavTargets[3] ="./surveyView.jsp?itemid="+titleID;
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>

		</tr>
		<tr>
			<td align="center">
				<form action="./itemQuestions.jsp">
				<table>
					<tr>
						<td>
							<label for="i1">							<%=Messages.getString("ITEMQUESTIONS_ITEM_QUESTION")%>:</label>
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
				<!-- Workspace begins -->
				<table border=0 width=80%>
					<tr> 
						<td>
							<b><%=Messages.getString("STANDARDQUESTIONS_PUBLISHED")%></b>
						</td>
					</tr>
					<tr>
						<td  valign="top">
							<table border=1 width=100%>
							<%

							 if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
							{
								//it's for oracle
								qry = 	"select concat('<a href=\"./viewQuestion.jsp?qid=',concat(chr(qid),'\">Open</a>')) View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			" case when active='A' then "+
						   				" concat('<a href=\"./itemQuestions.jsp?action=deactivate&itemid="+itemid+"&qid=',concat(chr(qid),'\">Deactivate</a>')) " +
						   				" else  concat('<a href=\"./itemQuestions.jsp?action=activate&itemid="+itemid+"&qid=',concat(chr(qid),'\">Activate</a>')) end Active,  "+
						   			
						   			" concat('<a href=\"./itemQuestions.jsp?action=archive&itemid="+itemid+"&qid=',concat(chr(qid),'\">Archive</a>')) Archive  from survey_questions where "+uidClause+" and type='U' and Active <> 'F' and Active <> 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by Active desc";
								
							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg
                                 qry = 	"select concat('<a href=\"./viewQuestion.jsp?qid=',concat(chr(qid),'\">Open</a>')) View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			" case when active='A' then "+
						   				" concat('<a href=\"./itemQuestions.jsp?action=deactivate&itemid="+itemid+"&qid=',concat(chr(qid),'\">Deactivate</a>')) " +
						   				" else  concat('<a href=\"./itemQuestions.jsp?action=activate&itemid="+itemid+"&qid=',concat(chr(qid),'\">Activate</a>')) end Active,  "+
						   			
						   			" concat('<a href=\"./itemQuestions.jsp?action=archive&itemid="+itemid+"&qid=',concat(chr(qid),'\">Archive</a>')) Archive  from survey_questions where "+uidClause+" and type='U' and Active <> 'F' and Active <> 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by Active desc";
							} else
							{
								qry = 	"select '<a href=\"./viewQuestion.jsp?qid='+ CAST(qid AS varchar(10))+'\">Open</a>' View1, Question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			
								" case when active='A' then "+
						   				" '<a href=\"./itemQuestions.jsp?action=deactivate&itemid="+itemid+"&qid=' + CAST(qid AS varchar(10)) +'\">Deactivate</a>' " +
						   				" else  '<a href=\"./itemQuestions.jsp?action=activate&itemid="+itemid+"&qid=' + CAST(qid AS varchar(10)) +'\">Activate</a>' end Active,  "+
						   			
						   			" '<a href=\"./itemQuestions.jsp?action=archive&itemid="+itemid+"&qid='+ CAST(qid AS varchar(10))+'\">Archive</a>' Archive  from survey_questions where "+uidClause+" and type='U' and Active <> 'F' and Active <> 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by Active desc";
							}




									System.err.println("\n 0000 arrivio in itemiQuestions.jsp -----  qry = "+qry);
						   	
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr bgcolor="#9999ff"  class="headerbar">
								<%			   	
								//									<th>Item</th><th>Survey</th><th>HTML</th>
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										if (rsmd.getColumnTypeName(i).toLowerCase().indexOf("lob") == -1)
										{
											if(rsmd.getColumnName(i).equals("VIEW1"))
       										   out.println("<th>"+Messages.getString("STANDARDQUESTIONS_VIEW")+"</th>");
										   else
    										out.println("<th>"+Messages.getString("STANDARDQUESTIONS_"+rsmd.getColumnName(i))+"</th>");
										}
									}
								%>
								</tr>
								<%
								
								String rowcolor = "#9999ff";
						
								while (rs.next())
								{
								if (rowcnt++ < qpos*questionPageSize || rowcnt > ((qpos+1)*questionPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>" class="headerbar">
								<%

								for (int i = 1; i <= colCount; i ++)
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
							}
							%>
							</table>
						</td>
					</tr>
					<tr>
						<td>
						
							<%

							if (rowcnt > pubPageSize)
							{
							%>
							Open page:
							<%
							for (int q = 0; q < ((rowcnt-1) /pubPageSize)+1 ; q++)
								{
								%>
								<a href="itemQuestions.jsp?dpos=<%= dpos %>&qpos=<%= q %>"><%= q + 1 %></a>
								<%
								}					
							}
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
							<b><%=Messages.getString("STANDARDQUESTIONS_Draft")%></b> 
						</td>
					</tr>
					<tr>
						<td  valign="top">
							<table border=1 width=100%>
							<%
			   			   


							if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
							{
								//it's for oracle
									qry = 	"select concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat(chr(qid),'\">Edit</a>')) Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			" concat('<a href=\"./itemQuestions.jsp?action=publish&itemid="+itemid+"&qid=',concat(chr(qid),'\">Publish</a>')) Publish,  "+
						   			" concat('<a href=\"./itemQuestions.jsp?action=delete&itemid="+itemid+"&qid=',concat(chr(qid),'\">Delete</a>')) Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='U' and Active = 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by type,  Active desc";
								
							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg
                                 	qry = 	"select concat('<a href=\"./addStandardNew.jsp?action=load&qid=',concat(chr(qid),'\">Edit</a>')) Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			" concat('<a href=\"./itemQuestions.jsp?action=publish&itemid="+itemid+"&qid=',concat(chr(qid),'\">Publish</a>')) Publish,  "+
						   			" concat('<a href=\"./itemQuestions.jsp?action=delete&itemid="+itemid+"&qid=',concat(chr(qid),'\">Delete</a>')) Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='U' and Active = 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by type,  Active desc";
							} else
							{
									qry = 	"select '<a href=\"./addStandardNew.jsp?action=load&qid=' + CAST(qid AS varchar(10)) +'\">Edit</a>' Modify1, question,"+
						   			" case when style ='R' then 'Radio' when style='Q' then 'Single-Pulldown' when style='S' then 'Satisfaction' when style='P' then 'Multi-Pulldown' when style='M' then 'Checkbox' when style='F' then 'Freeform' end Style,"+
						   			" '<a href=\"./itemQuestions.jsp?action=publish&itemid="+itemid+"&qid=' + CAST(qid AS varchar(10)) +'\">Publish</a>' Publish,  "+
						   			" '<a href=\"./itemQuestions.jsp?action=delete&itemid="+itemid+"&qid=' + CAST(qid AS varchar(10)) +'\">Delete</a>' Delete1 "+
						   			" from survey_questions where "+uidClause+" and type='U' and Active = 'D' and qid in (select qid from sur_itemquestion where itemid='"+itemid+"') order by type,  Active desc";
							}

System.err.println("\n  arrivio in itemiQuestions.jsp -----  qry = "+qry);

						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr bgcolor="#9999ff"  class="headerbar">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										if (rsmd.getColumnTypeName(i).toLowerCase().indexOf("lob") == -1)
										{
										   if(rsmd.getColumnName(i).equals("MODIFY1"))
       										   out.println("<th>"+Messages.getString("STANDARDQUESTIONS_MODIFY")+"</th>");
										   else
										   if(rsmd.getColumnName(i).equals("DELETE1"))
       										   out.println("<th>"+Messages.getString("STANDARDQUESTIONS_DELETE")+"</th>");
										   else
										   out.println("<th>"+Messages.getString("STANDARDQUESTIONS_"+rsmd.getColumnName(i))+"</th>");
										}
									}			
								%>
								</tr>
								<%
								rowcnt = 0;
								String rowcolor = "#9999ff";
						
								while (rs.next())
								{
								if (rowcnt++ < qpos*questionPageSize || rowcnt > ((qpos+1)*questionPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>" class="headerbar">
								<%

								for (int i = 1; i <= colCount; i ++)
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
							}
							%>
							</table>
						</td>
					</tr>
					<tr>
						<td>
						
							<%

							if (rowcnt > draftPageSize)
							{
							%>
							Open page:
							<%
							for (int q = 0; q < ((rowcnt-1) /draftPageSize)+1 ; q++)
								{
								%>
								<a href="itemQuestions.jsp?ppos=<%= ppos %>&dpos=<%= q %>"><%= q + 1 %></a>
								<%
								}					
							}
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
%>
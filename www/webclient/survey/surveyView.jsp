<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.util.*,java.sql.*,com.ibm.tsd.pmcom.survey.Messages"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
    //System.err.println("\n  arrivio in surveyView.jsp -----  ");

request.setCharacterEncoding("UTF-8");
String databaseProductName = aweval.getDatabaseProductName();
if (request.getParameter("sid") == null && request.getParameter("itemid") == null) response.sendRedirect("./index.jsp");
if (request.getParameter("sid") != null && request.getParameter("sid").equals("------"))
	{
	 aweval.setMessage("No survey selected");
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
	
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";	
%>
<%
	request.setCharacterEncoding("UTF-8");
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	
	String itemid = request.getParameter("itemid");
	String hid = "";
	String query = "";
	ResultSet rs = null;
	
	boolean rsloaded = false;
	
	String sid = aweval.getSurveyID(request);
	
	if (sid == null)  //Then the default Survey has not been set.
		{
		aweval.setMessage("A survey has not been set");
		connection.close();
		response.sendRedirect("./index.jsp");
		}
	
	if(!aweval.authItem(uid, request) || !aweval.authHtml(uid, request) || !aweval.authSurvey(uid, request))
		{
		connection.close();
		response.sendRedirect("./index.jsp");
		}
	
	String html[] = aweval.getHtml(request);
	String header = html[0];
	String footer = html[1];

    if (itemid == null)
    	itemid = "000";

    query = "Select item, itemshortname from survey_itemid where itemid='"+itemid+"'";

    String item = "&lt;itemname&gt;";
    String shortName = "";
    if (!itemid.equals("000"))	
    	{
        //java.sql.Statement stmt2 = connection.createStatement();
        rs = stmt.executeQuery(query);
        if (rs.next())
        	{
        	item = rs.getString("item");
        	shortName = rs.getString("itemshortname");
            }
        else
            {
            item = "Standard";
            shortName = "standard";
            }
        }
	String title = item + " Feedback Form";

	//Write the HTML
		
	    out.println(aweval.replaceTag(aweval.replaceTags(uid, header),"<itemname>",item));
		
		int qsize = 450;
		query = "select qsize from survey_surveys where sid="+sid;
		rs = stmt.executeQuery(query);
		if (rs.next())
			qsize = rs.getInt("qsize");

		%>
		
			<input type="hidden" name="sid" value="<%= sid %>">			
			<!-- questions table -->
			<table border="0" cellspacing="0" cellpadding="3" width="100%">
			    <tr>
			    	<td width="50">
			    		<img alt="" width="50" height="1" src="images/clear.gif/" />
			    	</td>
			    	<td width="<%= qsize %>">
			    		<img alt="" width="<%= qsize %>" height="1" src="images/clear.gif" />
			    	</td>
			    	<td width="100%">
			    		<img alt="" width="100%" height="1" src="images/clear.gif" />
			    	</td>
			    </tr>	
					<%
					//Pre Item Questions
		        	int cntQ = 0;
		        	//String satQryGlobal = "select qid, order from sur_sur_question where sid = "+sid+" and qid in (select qid from survey_questions where style = 'S') order by order";
		        	String satQryGlobal = "select qid, ordered from sur_sur_question where sid = "+sid+" and qsection='A' order by ordered";
					ResultSet rs1Global = stmt.executeQuery(satQryGlobal);
					while (rs1Global.next())
					{
					cntQ++;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out, item, sid);
					}
					if (itemid.equals("000"))
					{
					%>
					<!--tr>
						<td align="center" colspan="3">
							<hr>
							<h3>Item specific question section goes here</h3>
							<hr>
						</td>
					<tr-->
					<%
					}
					else
					{
					String satQryTech = "select qid from sur_itemquestion where itemid = '"+itemid+"' and qid in (select qid from survey_questions where active = 'A' and type='U') order by ordered";
					rs1Global = stmt.executeQuery(satQryTech);
					int newCnt = cntQ;
					while (rs1Global.next())
					{
					cntQ++;
					newCnt = cntQ + 1;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out, item, sid);
					}					
					}
					//Post Item Questions
					String satQryTech = "select qid, ordered from sur_sur_question where sid = "+sid+" and qsection='B' order by ordered";
					rs1Global = stmt.executeQuery(satQryTech);
					int newCnt = cntQ;
					while (rs1Global.next())
					{
					cntQ++;
					newCnt = cntQ + 1;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out,item,sid);
					}
					%>
			</table>
			<%
				    
                         String qry = "";
				          if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
							{
								//it's for oracle
								qry = "select identity from survey_surveys where identity='1' and sid="+sid;
							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//it's for db2 : venkyg
								qry = "select identity from survey_surveys where identity='1' and sid="+sid;
							} else
							{
								qry = "select identity1 from survey_surveys where identity1='1' and sid="+sid;
							}



				rs = stmt.executeQuery(qry);
				if (rs.next())
				{
				String bgcolor = "#000000";	
				if (cntQ++ % 2 == 0)
					bgcolor = "#FFFFFF"; 
				else
					bgcolor = "#EEEEEE"; 
				%>	
				<table cellpadding="3" cellspacing="0" width="100%"	>
					<tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td width="60">
							<img alt="" width="60" height="1" src="images/clear.gif" />
						</td>					
						<td  align="right">
							<%=Messages.getString("SURVEY_FIRST_NAME")%>:
						</td>
						<td>
							<input type="text" name="fname" maxlength="40" size="20">
						</td>
						<td  align="right">
							<%=Messages.getString("SURVEY_LAST_NAME")%>:
						</td>
						<td>
							<input type="text" name="lname" maxlength="60" size="20">
						</td>						
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td width="20"><img alt="" width="1" height="1" src="images/clear.gif" />
							&nbsp;
						</td>
						<td align="right">
							<%=Messages.getString("SURVEY_EMAIL")%>:
						</td>
						<td>
							<input type="text" name="email" maxlength="100" size="20">
						</td>
						<td align="right">
							<%=Messages.getString("SURVEY_COMPANY")%>:
						</td>
						<td>
							<input type="text" name="company" maxlength="100" size="20">
						</td>											
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr>					
				</table>
				<%
				}
			%>
			<center>
				<table>
		    		<tr>
		    			<td colspan=9 align="center">
		    				<form  action="<%= aweval.getLastPage() %>" method="get">
		    				<input type="hidden" name="sid" value="<%= sid %>">
		    				<input type="hidden" name="action" value="edit">
		    				<input type="hidden" name="itemid" value="<%= itemid %>">		    				
		    				<input type="submit" value=<%=Messages.getString("SURVEYVIEW_RETURN_PREVIEW")%>>
		    				</form>
		    			</td>
		    		</tr>
		    		<input type="hidden" name="itemid" value="<%= request.getParameter("itemid") %>">
		    	</table>
	    	</center>
 <%
 connection.close();
 %>  
<%= aweval.replaceTag(aweval.replaceTags(uid, footer),"<itemname>",item) %>
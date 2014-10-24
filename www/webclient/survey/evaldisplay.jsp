<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar,java.util.Vector"%>	
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
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
		
	String startMonth=request.getParameter("mth");
	if (startMonth==null) startMonth = "";
	String startYear=request.getParameter("yr");
	if (startYear==null) startYear = "";
	String period=request.getParameter("per");
	if (period==null) period = "";
	String ver="";
	String version="";
	
	String eval_str = request.getParameter("rid");
	if (eval_str == null)
	eval_str = "0";
	int rid = Integer.parseInt(eval_str);
	
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	Statement stmt1 = connection.createStatement();
	    
	String qry0 = "select aid from aweval.eval_responses_static where rid="+rid;
	Vector static_aids = new Vector();
	ResultSet rs0 = stmt1.executeQuery(qry0);
	while (rs0.next())
		{
		static_aids.add(rs0.getString("aid"));
		}

	Statement stmt2a = connection.createStatement();
	String   qry2a = "select answer from aweval.eval_responses_freeform where rid="+rid;
	ResultSet rs2a = stmt2a.executeQuery(qry2a);
	String qry1 = "select t1.itemshortname, t1.item, t1.itemid, t2.createtime from survey_itemid t1, survy_submission t2 where t1.itemid = t2.itemid and t2.rid="+rid;
	ResultSet rs1 = stmt1.executeQuery(qry1);
	
	String itemshortname = "";
	String item = "";
	String itemid = "";
	String ts = null;
	
	if (rs1.next())
		{
		itemshortname = rs1.getString("itemshortname");
		item = rs1.getString("item");
		itemid = rs1.getString("itemid");
		ts = rs1.getString("createtime");
		}
    else
        {
        item = "Standard";
        itemshortname = "standard";
        }
    
    //create the itemid clause
    	String requestItemid = request.getParameter("itemid");
    	String itemidClause = "itemid like '%' ";
    	if (requestItemid != null && !requestItemid.equals("null")&& !requestItemid.equals("*"))
    		itemidClause = "itemid ='"+requestItemid+"'";
    	else requestItemid = "*";
    	
    
		Calendar lastday = Calendar.getInstance();
		Calendar firstday = Calendar.getInstance();
		
		String [] months = {"January","February","March","April","May","June","July","August","September","October","November","December"};
		String yearParam = request.getParameter("year");
		if (yearParam==null)
			yearParam = Integer.toString(firstday.get(firstday.YEAR));
		String monthParam = request.getParameter("month");
		String evalPeriod = "Year: "+firstday.get(firstday.YEAR);				
		if (monthParam != null && !monthParam.equals("null"))
			{
			firstday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
			lastday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
			lastday.add(lastday.MONTH,1);
			evalPeriod = "Month: "+months[firstday.get(firstday.MONTH)]+", "+firstday.get(firstday.YEAR);				
			}
		else
			{
			firstday.set(Integer.parseInt(yearParam),0,1,0,0,0);
			lastday.set(Integer.parseInt(yearParam),0,1,0,0,0);
			lastday.add(lastday.YEAR,1);
			evalPeriod = "Year: "+firstday.get(firstday.YEAR);					
			}
		//We will either come in with a month and a year specified or just a year
		// if no month specified then we will show results for a year
		// else we will show results for the given month
		String tsPeriod = " createtime < '"+new Timestamp(lastday.getTime().getTime()) + "' and createtime >= '"+new Timestamp(firstday.getTime().getTime()) + "'";								
		
		String qid = request.getParameter("qid");
		String qidClause = "1=1";
		String qidParam = "";
		if (qid != null)
			{
			qidClause = "rid in (select rid from aweval.eval_responses_freeform where qid="+qid+")";
			qidParam = "qid="+qid+"&";
			}
	
		String previd = "";
		String getPrev = "select rid from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+") and "+tsPeriod +" and "+itemidClause+" and "+qidClause+" and rid < " + rid +" order by rid desc";

		rs1 = stmt1.executeQuery(getPrev);
		if (rs1.next())
			{
			previd=rs1.getString(1);
			}
			
		String nextid = "";
		String getNext = "select distinct(rid) from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+") and "+tsPeriod +" and "+itemidClause+" and "+qidClause+" and rid > " + rid;

		rs1 = stmt1.executeQuery(getNext);
		if (rs1.next())
			{
			nextid=rs1.getString(1);
			}
		
	    
	    String sid = aweval.getSurveyID(request);

	    if (sid == null)
	    	{
	    	String getActive = "select sid from survey_surveys where active='A'";
	    	ResultSet rsAct = stmt.executeQuery(getActive);
	    	if (rsAct.next())
	    		sid =rsAct.getString("sid");
	    	else
	    		sid = "";
	    	}
	
		String title = evalPeriod +" "+item + " feedback for response "+rid ;
	
		if (!ts.equals("")) title = title +" submitted "+ts.substring(0,10);
	   
	%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] ="Totals Report";					
					pageNav[1] ="Freeform Questions";
					pageNav[2] ="Specific Evaluations";
					pageNav[3] ="Arrival Report";
					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./reportman.jsp";
					pageNavTargets[1] ="./rollup.jsp";					
					pageNavTargets[2] ="./evallist.jsp";
					pageNavTargets[3] ="./arrivals.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
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
			<td>
				<table  cellspacing="5" cellpadding="0" width=100%>
					<tr>
						<%
						if (!previd.equals(""))
						{
						%>
						<td align=left>
							Go to <a href="./evaldisplay.jsp?<%= qidParam %>rid=<%= previd %>&month=<%= monthParam %>&year=<%= yearParam %>&itemid=<%= requestItemid %>">Previous Evaluation</a>
						</td>
						<%
						}			
						%>		
						<td align=center>
							&nbsp;
						</td>
						<%
						if (!nextid.equals(""))
						{
						%>
						<td align=right>
							Go to <a href="./evaldisplay.jsp?<%= qidParam %>rid=<%= nextid %>&month=<%= monthParam %>&yr=<%= yearParam %>&itemid=<%= requestItemid %>">Next Evaluation</a>
						</td>
						<%
						}
						%>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table width=100% cellpadding="0" cellspacing="0">
				    <tr>
				    	<td width="50">
				    		<img alt="" width="50" height="1" src="./images/clear.gif" />
				    	</td>
				    	<td width="400">
				    		<img alt="" width="400" height="1" src="./images/clear.gif" />
				    	</td>
				    	<td width="100%">
				    		<img alt=""  height="1" src="./images/clear.gif" />
				    	</td>
				    </tr>
					<tr>
						<td colspan="3">
							<hr>
						</td>
					</tr>				
				<!-- General Questions table -->

								<%
								//General Satisfaction Questions
					        	int cntQ = 0;
					        	String satQryGlobal = 
					        	"select t1.qid, "+
								"case when t2.order is null then 99 else t2.order end order "+
								"from  "+
								" ( "+
								"  select qid from survey_questions  "+
								"  where  "+
								"   type='A' "+
								"  and "+
								"   ( "+
								"   qid in (select qid from aweval.eval_responses_freeform where rid = "+rid+") "+
								"   or qid in (select distinct(qid) from sur_quest_answer where aid in (select aid from aweval.eval_responses_static where rid = "+rid+"))) "+
								" ) as t1  "+
								"  left outer join  "+
								" ( "+
								" select qid,order from sur_sur_question where sid="+sid+
								" ) as t2  "+
								" on t1.qid =t2.qid order by order, qid ";
								ResultSet rs1Global = stmt.executeQuery(satQryGlobal);
								while (rs1Global.next())
								{
								cntQ++;
								aweval.displayQuestionWithAnswers(rs1Global.getString("qid"), cntQ, out,item,static_aids,rid);
								}
								%>
								<tr>
									<td colspan="3">
										<hr>
									</td>
								</tr>								
								<%
								//item Specific Questions
								String satQryitem =  
								"select t1.qid, "+
								"case when t2.order is null then 99 else t2.order end order "+
								"from  "+
								" ( "+
								"  select qid from survey_questions  "+
								"  where  "+
								"   type='U' "+
								"  and "+
								"   ( "+
								"   qid in (select qid from aweval.eval_responses_freeform where rid = "+rid+") "+
								"   or qid in (select distinct(qid) from sur_quest_answer where aid in (select aid from aweval.eval_responses_static where rid = "+rid+"))) "+
								" ) as t1  "+
								"  left outer join  "+
								" ( "+
								" select qid,order from sur_sur_question where sid="+sid+
								" ) as t2  "+
								" on t1.qid =t2.qid order by order, qid ";
								rs1Global = stmt.executeQuery(satQryitem);
								int newCnt = cntQ;
								while (rs1Global.next())
								{
								cntQ++;
								newCnt = cntQ + 1;
								aweval.displayQuestionWithAnswers(rs1Global.getString("qid"), cntQ, out,item,static_aids,rid);
								}
								%>


			<%
				String qry = "select fname, lname, company, email from survy_submission where (fname <> '' or lname <> '' or email <> '' or company <> '') and rid = "+rid;
				ResultSet rs = stmt.executeQuery(qry);
				if (rs.next())
				{
				String bgcolor = "#000000";	
				if (cntQ++ % 2 == 0)
					bgcolor = "#FFFFFF"; 
				else
					bgcolor = "#EEEEEE"; 
				%>	
			<tr>
				<td colspan="3">
				<table cellpadding="3" cellspacing="0" width="100%"	>
					<tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td width="60">
							<img alt="" width="60" height="1" src="./images/clear.gif" />
						</td>					
						<td  align="right">
							First Name:
						</td>
						<td>
							<input type="text" name="fname" value="<%= rs.getString("fname") %>" maxlength="40" size="20">
						</td>
						<td  align="right">
							Last Name:
						</td>
						<td>
							<input type="text" name="lname" value="<%= rs.getString("lname") %>" maxlength="60" size="20">
						</td>						
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td width="20"><img alt="" width="1" height="1" src="./images/clear.gif" />
							&nbsp;
						</td>
						<td align="right">
							Email:
						</td>
						<td>
							<input type="text" name="email" value="<%= rs.getString("email") %>" maxlength="100" size="20">
						</td>
						<td align="right">
							Company:
						</td>
						<td>
							<input type="text" name="company" value="<%= rs.getString("company") %>" maxlength="100" size="20">
						</td>											
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr>					
				</table>
				</td>
			</tr>
				<%
				}
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
%>
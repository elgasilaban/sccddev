<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.text.*,java.util.*,java.lang.*,java.sql.*,java.util.Calendar,java.util.Date,javax.sql.*"%>
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}

String uidClause = "";
String uid = request.getParameter("uid");
if (uid == null)
	{
	uid="";
	uidClause = "userid like '%'  and itemid in (select itemid from survey_itemid where publicdata='Y') ";	
	}
else
	uidClause = "userid='"+uid+"' ";

String itemid = request.getParameter("itemid");
if (itemid != null)
	{
	if (!aweval.isItemResultPublic(itemid))
		{
		aweval.setMessage("Item not valid");
		response.sendRedirect("./pubreport.jsp?itemid=*");
		}
	}
	
%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					pageNav[0] ="Public Totals Report";					
					pageNav[1] ="Public Freeform Questions";
					//pageNav[2] ="Arrival Report";
					
					String [] pageNavTargets = new String[2];
					pageNavTargets[0] ="./pubreport.jsp";
					pageNavTargets[1] ="./pubup.jsp";					

					//pageNavTargets[2] ="./pubrivals.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
		<tr>
			<td height=240 align="center">
<%
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
    String dispQuery = request.getParameter("disp");
	String yearParam = request.getParameter("year");
	String monthParam = request.getParameter("month");
	//String itemid = request.getParameter("itemid");
	String item = "";
	String itemShortName = "";
	String itemidClause = "";
	rs = stmt.executeQuery("select item, itemshortname,uid from survey_itemid where itemid= '"+itemid+"'");
	if (rs.next())
		{
			itemShortName = rs.getString("itemshortname");
			item = rs.getString("item");
			itemidClause = " itemid='"+itemid+"' ";
			uidClause = "userid = '"+rs.getString("userid")+"'";
			uid = rs.getString("userid");
		}
	else
		{
			item = "All Responses";
			itemShortName="all";
			itemidClause = " itemid like '%' ";
		}
			
    %>

	<table width="100%" cellpadding="2" cellspacing="0" border="0">
		<tr>
		
			<td valign="top" align="center">
				<b>Item Response Overview</b>
			</td>
		</tr>
	</table>		    
    <%
    
	Calendar cal = Calendar.getInstance();
	Calendar actualCurCal = Calendar.getInstance();
	int curMonth = cal.get(cal.MONTH);
	int curYear = cal.get(cal.YEAR);

	if (yearParam != null && monthParam != null)
		{
		if ((curYear < Integer.parseInt(yearParam)) || (2000 > Integer.parseInt(yearParam)) || (curYear == Integer.parseInt(yearParam) && curMonth < Integer.parseInt(monthParam)))
			{
				cal.set(curYear,curMonth,1);
			}
			else
			{
				cal.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1);
			}
		}

	Calendar first = (Calendar) cal.clone();
	first.set(cal.get(cal.YEAR),cal.get(cal.MONTH),1);
	int[] theMonths = new int [3];
	int[] theYears = new int[3];
	int[] theWeekSums = new int[7];
	int[] theDaySums = new int[7];
	int[] theWeekStarts = new int[6];
	int[] theWeekEnds = new int[6];
	int monthTotal = 0;

	for (int i = 0; i < 7; i++)
		{
			theWeekSums[i] = 0;
			theDaySums[i] = 0;
		}

	theYears[0] = cal.get(cal.YEAR);
	theMonths[0] = cal.get(cal.MONTH);
	String [] shortMonths = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
	String [] color = {"red","green","blue"};

	cal.add(cal.MONTH,-1);

	theYears[1] = cal.get(cal.YEAR);
	theMonths[1] = cal.get(cal.MONTH);

	cal.add(cal.MONTH,+2);
	theYears[2] = cal.get(cal.YEAR);
	theMonths[2] = cal.get(cal.MONTH);
	qry = "with t1(d) AS ( VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31) ) ,"+
					" t2 as (select day(createtime) d, count(*) cnt from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+" and publicdata='Y') and "+itemidClause+" and year(createtime) = "+theYears[0]+" and month(createtime)= "+(theMonths[0]+1)+ " group by day(createtime)) " +
					"  select '"+theYears[0]+"' , '"+(theMonths[0]+1)+ "', t1.d, case when t2.cnt is null then 0 else t2.cnt end cnt from t1 left outer join t2 on t1.d=t2.d";
					
	if (dispQuery != null) out.println("Query0: "+ qry);  //DJM Display
	//Statement stat1 = con.createStatement();
	int [] store = new int[31];

	rs = stmt.executeQuery(qry);
	int cnt = 0;
	while (rs.next())
		{
			//for (int i = 2; i <= first.getActualMaximum(first.DAY_OF_MONTH)+1; i++)
				{
					//store[i-2] = results.getInt(i);
					store[cnt] = rs.getInt("cnt");
				}
				cnt++;
		}

	int theMonth = first.get(first.MONTH);
	int firstDayCurMonth = first.get(first.DAY_OF_WEEK);
	String [] months = {"January","February","March","April","May","June","July","August","September","October","November","December"};

	String [] date = new String [42];
	String [] value = new String [42];
	boolean row5 = (first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth - 2 > 27);
	boolean row6 = (first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth - 2 > 34);

	for (int i = 0; i < firstDayCurMonth-1; i++)
		{
			date[i] = "";
			value[i] = "";
		}

	for (int i = firstDayCurMonth-1; i <= first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth - 2; i ++)
		{
			date[i] = Integer.toString(i-firstDayCurMonth+2);
			value[i] = Integer.toString(store[i-firstDayCurMonth+1]);
			theWeekSums[i/7] = theWeekSums[i/7] + store[i-firstDayCurMonth+1];
			theDaySums[i%7] = theDaySums[i%7] + store[i-firstDayCurMonth+1];
			monthTotal = monthTotal + store[i-firstDayCurMonth+1];
		}

	for (int i = first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth - 1; i <=41; i ++)
		{
			date[i] = "";
			value[i] = "";
		}

	theWeekStarts[0] = 1;
	theWeekEnds[0] = ((7-firstDayCurMonth)+1);

	for (int i = 1; i < (first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth)/7; i++)
		{
			theWeekStarts[i] = theWeekEnds[i-1] +1;
			theWeekEnds[i] = (7*i+(7-firstDayCurMonth)+1);
	 	}

	theWeekStarts[(first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth)/7] = theWeekEnds[((first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth)/7) - 1] + 1;
	theWeekEnds[(first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth)/7] = first.getActualMaximum(first.DAY_OF_MONTH);

    int maxVal = 1;

	String [] monthStore = new String [14];
	for (int i=0;i<14;i++) monthStore[i]="0";
	qry = "with t1(mint, month) AS ( VALUES (1, 'Jan'), (2, 'Feb'), (3,'Mar'),(4, 'Apr'), (5, 'May'), (6,'Jun'), (7, 'Jul'), (8, 'Aug'), (9,'Sep'),(10, 'Oct'), (11, 'Nov'), (12,'Dec')), t2 as (select 'Item' item,  count(*) cnt, month(createtime) mint from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+" and publicdata='Y') and "+itemidClause+" and year(createtime) = "+theYears[0]+" group by month(createtime))  select '2004' , t1.month, case when t2.cnt is null then 0 else t2.cnt end cnt from t1 left outer join t2 on t1.mint=t2.mint";
	cnt = 0;
    if (dispQuery != null) out.println("Query1: "+qry);
	rs = stmt.executeQuery(qry);
    while (rs.next())
		{
			monthStore[cnt+2] = rs.getString("cnt");
			monthStore[1] = Integer.toString(Integer.parseInt(monthStore[1]) + Integer.parseInt(rs.getString("cnt")));
			if (Integer.parseInt(monthStore[cnt]) > maxVal) maxVal = Integer.parseInt(monthStore[cnt]);
			cnt ++;
		}
	monthStore[0] = itemShortName;
	
	int [] monthIntStore = new int[12];
	for (int i = 0; i < 12; i++)
    	monthIntStore[i] = (int) 191*Integer.parseInt(monthStore[i+2])/maxVal;
 %>

		<table width=80% cellspacing=0 cellspacing="0" border="0">
		<tr>
	 		<TD align="center">
				<table width=100% cellspacing=0 cellspacing="0" border="0" width="100%">
					<tr>
						<TD align=center>
						
						<%
						if (theYears[0] > 2000)
						   {
						   %>
							  <A HREF="./pubrivals.jsp?itemid=<%= itemid %>&year=<%= (theYears[0]-1) %>&month=11">Previous Year</a>
						   <%
						   }
						%>
						
						</td>
						<td align=center >
						<b>
						   Public Monthly Summary for  <%=uid+"'s "+ item %> in <%= theYears[0] %>
						</B>
						</td>
						<TD align=right>
											
						<%
						if (theYears[0] < actualCurCal.get(actualCurCal.YEAR))
							{
							%>
								<A HREF="./pubrivals.jsp?itemid=<%= itemid %>&year=<%= (theYears[0]+1) %>&month=0">Next Year</a>
							<%
							}
						%>
						
						</TD>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<TABLE BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR="ffffff" WIDTH="100%">
					<TR>
						<TD WIDTH=10% BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Item</B></TD>
						<TD WIDTH=6.5% BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Total</B></TD>
						<%
						for (int i=0;i<12;i++)
							{
							if ((theYears[0]==actualCurCal.get(actualCurCal.YEAR) && i <= actualCurCal.get(actualCurCal.MONTH)) || (theYears[0] < actualCurCal.get(actualCurCal.YEAR)))
								{
								if (i == theMonths[0])
									{
									%>
										<TD WIDTH=7.2% BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B><%= shortMonths[i] %></B></TD>
									<%
									}
								else
									{
									%>
										<TD WIDTH=7.2% BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><A HREF="./pubrivals.jsp?itemid=<%= itemid %>&year=<%= theYears[0] %>&month=<%= i %>"><B><%= shortMonths[i] %></B></a></TD>
									<%									
									}
								}
								else
								{
								%>
									<TD WIDTH=7.2% BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><font color="#EEEEEE"><%= shortMonths[i] %></font></A></TD>
								<%
								}
							}
						%>
					</TR>
					<TR>
						<TD WIDTH=15%   VALIGN=middle ALIGN=center><%= monthStore[0] %></TD>
						<%
						for (int i=1; i<=13; i++)
							{
							%>
								<TD WIDTH=7.2%  VALIGN=middle ALIGN=center>
								<%= monthStore[i] %>
								</TD>
							<%
							}
						%>
					</TR>
				</TABLE>
	 		</td>
		</tr>
	</table>
	<BR>
	<table width="80%" cellspacing="0" CELLPADDING=0 BORDER=0>
		<tr>
			<td>
				<TABLE WIDTH=100% width="100%" cellspacing="0" CELLPADDING=0 BORDER=0>
					<TR>
						<td align="center">
							<table cellpadding="0" cellspacing="0" width="100%" border="0">
								<TR>
									<TD>
										&nbsp;
									</td>
									<TD ALIGN=CENTER>
										<b><%= item %> -- Daily Report  <%= months[theMonths[0]] %> <%= first.get(first.YEAR) %>
									</TD>
								</TR>
							</table>
						</td>
					</TR>
					<TR>
						<TD>
							<TABLE BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR="ffffff" WIDTH="100%">
								<TR>
									<TD WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Sun</B></TD>
									<TD WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Mon</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Tue</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Wed</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Thu</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Fri</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Sat</B></TD>
									<TD WIDTH=12.5% WIDTH="14.3%" BGCOLOR="#CCCCCC" VALIGN=middle ALIGN=center><B>Totals</B></TD>
								</TR>
							<%
							boolean lastRow = false;
							for (int i = 0; i <= (first.getActualMaximum(first.DAY_OF_MONTH)+firstDayCurMonth+1)/7;i++)  //i rows
								{
								    if (lastRow) continue;
								    if ((i==3 && !row5) || (i==4 && !row6)) lastRow = true;
									%>
									<TR>
										<%   //each row hase 8 cells -- 7 are alike
										for (int j=0; j<7;j++)
											{
											 %>
												<TD ALIGN=CENTER>
												<table>
													<tr>
													<TD WIDTH=12.5% valign=top align=left><b><%= date[j+ i*7] %></b><br><br></td>
													</tr>
													<tr>
													<TD WIDTH=12.5% valign=botton align=right><FONT COLOR=#00008B ><%= value[j+ i*7] %></FONT></td>
													</tr>
												</table>
												</TD>
											<%
											}  // finish the j similar cells
											%>
											<TD WIDTH=12.5% align=right BGCOLOR="#CCCCCC"><FONT COLOR=#00008B ><%= theWeekSums[i] %></FONT></td>
									</TR>
									<%
									}  //  move on to next row (increment i)
									%>
							</TABLE>
						</TD>
					</TR>
				</TABLE>
			</td>
			<td valign=top>
				<table>
					<tr>
						<TD>
							
							<%
							String  techParam = "";
							if (theYears[1] >= 2000)
								{
									StringTokenizer techTokenizer = new StringTokenizer(item);
									techParam="";
									while (techTokenizer.hasMoreTokens())
										{
											techParam = techParam.concat(techTokenizer.nextToken()).concat("%20");
										}
										%>
									<br><A HREF="./pubrivals.jsp?itemid=<%= itemid %>&year=<%= theYears[1] %>&month=<%= theMonths[1] %>">Previous Month</a>
									<%
								}
							%>
							
						</td>
					</tr>
					<tr>
						<td>
							
							<%
							if (theYears[2] < actualCurCal.get(actualCurCal.YEAR) || (theYears[2] == actualCurCal.get(actualCurCal.YEAR) && theMonths[2] <= actualCurCal.get(actualCurCal.MONTH)))
								{
								%>
									<br><a href="./pubrivals.jsp?itemid=<%= itemid %>&year=<%= theYears[2] %>&month=<%= theMonths[2] %>">Next Month</a>
								<%
								}
							%>
							
						</td>
					</tr>
					<tr>
						<td>
							
								&nbsp;
							
						</td>
					</tr>						
					<tr>
						<td>
							<label for="i1">Change Item:</label>
						</td>
					</tr>					
					<tr>
						<td>
							<FORM name=list action="./pubrivals.jsp"  method="GET">
								<table>
									<tr>
										<td>
											<select id="i1" name="itemid">
											<option>---
												<%
												String checked ="";
											   	qry = "select itemid,itemShortName,uid from survey_itemid where publicdata='Y' order by item";
											   	rs = stmt.executeQuery(qry);
												while(rs.next())
												{
												if (rs.getString("itemid").equals(itemid))
													checked = "selected";
												else 
													checked = "";
													
												%>
											  	<option <%= checked %> value="<%= rs.getString("itemid") %>"><%= rs.getString("uid")+"-"+rs.getString("itemshortname") %>
												<%
												}
												%>
											</select>
										</td>
									</tr>
									<tr>
										<td>
											<INPUT TYPE="SUBMIT" VALUE="Go">	
										</td>
									</tr>
									<%
									if (itemid != null)
										{
										%>
										<tr>
											<td>
												<a href="./pubalan.jsp?itemid=<%= itemid %>"><%= itemid %>&nbsp;Results</a>
											</td>
										</tr>
										<%
										}
									%>
									</table>
							</FORM>				
						</td>					
					</tr>			
				</table>
			<td>
		</tr>
	</table>
<%
  stmt.close();
  connection.close();
%>

			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>

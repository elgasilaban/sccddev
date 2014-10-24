<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar"%>	
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
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";	
				
	String [] col = {"rid","date","item","name","email","company"};
	String [] ord = {"desc","desc","asc","asc","asc","asc"};
	
	int colNum = 2;
	String colItem = request.getParameter("col");
	if (colItem!=null)
		colNum = Integer.parseInt(colItem)-1;
		
%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[3];
					int activeTab = 1;
					pageNav[0] ="Totals Report";					
					pageNav[1] ="Freeform Questions";
					//pageNav[2] ="Individual Evaluations";
					pageNav[2] ="Arrival Report";
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./reportman.jsp";
					pageNavTargets[1] ="./rollup.jsp";					
					//pageNavTargets[2] ="./evallist.jsp";
					pageNavTargets[2] ="./arrivals.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);

				int itemPageSize = 10;
				int pageCnt = 5;
				String stringIpos = request.getParameter("ipos");
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
				
				Calendar lastday = Calendar.getInstance();
				Calendar firstday = Calendar.getInstance();
				
				String [] months = {"January","February","March","April","May","June","July","August","September","October","November","December"};
				String yearParam = request.getParameter("year");
				if (yearParam==null)
					yearParam = Integer.toString(firstday.get(firstday.YEAR));
				String monthParam = request.getParameter("month");
				String evalPeriod = "Year: "+firstday.get(firstday.YEAR);
				int navMonth = -1;				
				if (monthParam != null && !monthParam.equals("null"))
					{
					firstday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
					lastday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
					lastday.add(lastday.MONTH,1);
					navMonth = firstday.get(firstday.MONTH);
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

				Connection connection = aweval.getConnection();
				Statement stmt = connection.createStatement();
				ResultSet rs = null;
				String itemname="dASD";
				String qid = request.getParameter("qid");
				String qidClause = "qid > 0";
				if (qid != null)
					qidClause = "qid ="+qid;
					
			    String qry = "";

				String itemid = request.getParameter("itemid");
			 	//String sid = aweval.getSurveyID(request);			    
				String sid = null;
				String item = "All Responses";
				String itemShortName = "all";
				String itemidClause = "itemid like '%' ";
				String typeClause = "type = 'A' ";
				String sidClause = "sid > 0 ";
				if (sid != null)
					sidClause = "sid = "+sid;
					
				rs = stmt.executeQuery("select item, itemshortname from survey_itemid where itemid= '"+itemid+"'");
				if (rs.next())
					{
						itemShortName = rs.getString("itemshortname");
						item = rs.getString("item");
						itemidClause = "itemid='"+itemid+"' ";
						typeClause = "type like '%' ";
						//sidClause = "sid = "+aweval.getSurveyID(itemid);				
					}
			    ResultSet rs3 = null;
			    String checked = "";
				String title = evalPeriod+" Report&nbsp;Management:&nbsp;for&nbsp;"+item;
				%>
			</td>
		</tr>
		<tr>
			<th>
				<font size=4><%= title %></font>
			</th>
		</tr>		
		<tr>
			<td height=240 align="center">
			<!--	Begin			WorkPage  -->							
				<TABLE cellpadding="0" cellspacing="0">
				  	<tr>
				  		<td>
				  			<table>
				  				<tr>
				  				
							    	<td align="center" width="100%">
							   			<%
							    		aweval.navTable(out,yearParam,navMonth,itemid,"./evallist.jsp",uidClause);
							    		%>
							    	</td>
							    	<td>
							    		<table>
											<tr>
												<td>
													<b>
														<label for="i1">Change Item:</label>
													</b>
												</td>
											</tr>					
											<tr>
												<td>
													<FORM name=list action="evallist.jsp"  method="GET">
													<input type="hidden" name="year" value=<%= yearParam %>>													
													<%
													if (monthParam != null && !monthParam.equals("null"))
													{
													%>
													<input type="hidden" name="month" value=<%= monthParam %>>													
													<%
													}
													%>
														<table>
															<tr>
																<td>
																	<select id="i1" name="itemid">
																		<%
																		Connection  connection2 = aweval.getConnection();
																		Statement stmt2 = connection2.createStatement();
																		checked ="";
																	   	qry = "select itemid,itemShortName from survey_itemid where "+uidClause+" order by item";
																	   	ResultSet rs2 = stmt2.executeQuery(qry);
																	 	%>
																		<option value="*">All Responses
																		<%
																		while(rs2.next())
																		{
																		if (rs2.getString("itemid").equals(itemid))
																			checked = "selected";
																		else 
																			checked = "";	
																		%>
																	  	<option <%= checked %> value="<%= rs2.getString("itemid") %>"><%= rs2.getString("itemshortname") %>
																		<%
																		}
																		connection2.close();
																		%>
																	</select>
																</td>
															</tr>
															<tr>
																<td>
																 <input type="submit" value="Go">
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
						</td>
				  	<tr>
				  		<td>
				  			<hr>
				  		</td>
				  	</tr>			    
							<tr>
								<td>
						  			<table border="1" cellpadding="0" cellspacing="0" width="100%">
						  				<tr bgcolor="#9999ff">
						  				<%
										qry = "select concat('<a href=\"./evaldisplay.jsp?itemid="+itemid+"&year="+yearParam+"&month="+monthParam+"&rid=',concat(char(rid),concat('\">Response ',concat(char(rid),'</a>')))) Response, date(createtime) Date, itemshortname Item, case when (fname is null and lname is null) or (fname = '' and lname='')  then 'N/A' else CONCAT(FNAME,CONCAT(' ',lname)) end name, case when email is null or email='' then 'N/A' else email end email, case when company is null or company='' then 'N/A' else company end company from (select * from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+")) t1 left outer join survey_itemid t2 on t1.itemid=t2.itemid where "+ tsPeriod +" and t1."+itemidClause+" order by "+col[colNum]+" "+ord[colNum];
										System.out.println(qry);
										rs = stmt.executeQuery(qry);
						  				ResultSetMetaData rs1md = rs.getMetaData();
						  				int colCount = rs1md.getColumnCount();
						  				int rowcnt = 0;
						  				String rowcolor = "#9999ff";
					
						  				while (rs.next())
						  				{
							  				if (rowcnt==0)
							  				{
							  				for (int i = 1; i <= colCount; i ++)
							  					{
							  					%>
							  						<th><a href="<%= "./evallist.jsp?col="+i+"&year="+ yearParam +"&month="+ monthParam +"&itemid="+ itemid %>"><%= rs1md.getColumnName(i) %></a></th>
							  					<%
							  					}
							  				%>
							  			    </tr>
							  				<%
							  			}
										if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
										if (rowcnt%2 == 0)
											rowcolor = "#cccccc";
										else rowcolor = "#ffffff";
						  				%>
						  				<tr bgcolor="<%= rowcolor %>">
						  				<%
										for (int i = 1; i <= colCount; i ++)
											{
											%>
											<td><%= rs.getString(i) %></td>
											<%
											}
						  				%>
						  				</tr>
						  				<%
						  				}
						  				if (rowcnt==0) 
						  				{
						  				%>
						  				<tr><td colspan=2>There have been no freeform answers for <b><%= item %></b> during this period</td></tr> 
						  				<%
						  				}
						  				%>
						  			</table>
							
								</td>
							</tr>
							<tr>
								<td>
									<%
									int icnt = 0;
									qry = "select count(*) cnt from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+") and "+ tsPeriod +" and "+itemidClause;									
									rs = stmt.executeQuery(qry);
									if (rs.next())
										icnt = rs.getInt("cnt");
									%>
									Page: 
									<%
										aweval.pageCount(out, "./evallist.jsp?col="+(colNum+1)+"&year="+ yearParam +"&month="+ monthParam +"&itemid="+ itemid +"&ipos=", ipos, icnt, pageCnt, itemPageSize);
									%>
								</td>
							</tr>							
				</TABLE>			
			<!--		End		WorkPage  -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
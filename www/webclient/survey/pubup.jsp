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

String uidClause = "";
String uid = request.getParameter("uid");
if (uid == null)
	{
	uid="";
	uidClause = "userid like '%'  and itemid in (select itemid from survey_itemid where publicdata='Y') ";	
	}
else
	{
	uidClause = "userid='"+uid+"' ";
	}

String itemid = request.getParameter("itemid");
if (itemid != null)
	{
	if (!aweval.isItemResultPublic(itemid) && !itemid.equals("*"))
		{
		aweval.setMessage("Item not valid");
		response.sendRedirect("./pubreport.jsp");
		}
	}
else
	{
	//aweval.setMessage("Item not valid");
	//response.sendRedirect("./pubreport.jsp");
	itemid="*";
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
					pageNav[1] ="Public Arrival Report";
					
					String [] pageNavTargets = new String[2];
					pageNavTargets[0] ="./pubreport.jsp";
					pageNavTargets[1] ="./pubrivals.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);

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

				int itemPageSize = 10;
				int pageCnt = 5;
				String stringIpos = request.getParameter("ipos");
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
				
									
				//We will either come in with a month and a year specified or just a year
				// if no month specified then we will show results for a year
				// else we will show results for the given month
				String tsPeriod = " createtime < '"+new Timestamp(lastday.getTime().getTime()) + "' and createtime >= '"+new Timestamp(firstday.getTime().getTime()) + "'";								
				String tsPeriodTabled = " t1.createtime < '"+new Timestamp(lastday.getTime().getTime()) + "' and t1.createtime >= '"+new Timestamp(firstday.getTime().getTime()) + "'";								
				
				Connection connection = aweval.getConnection();
				Statement stmt = connection.createStatement();
				ResultSet rs = null;
				String itemname="";

			    String qry = "";

				//String itemid = request.getParameter("itemid");
			 	String sid = aweval.getSurveyID(request);			    

				String item = "General Responses";
				String itemShortName = "all";
				String itemidClause = "itemid like '%' ";
				String typeClause = "type = 'A' ";
				String sidClause = "sid > 0 ";
				if (sid != null)
					sidClause = "sid = "+sid;
					
							
				rs = stmt.executeQuery("select item, itemshortname, uid from survey_itemid where itemid= '"+itemid+"'");
				if (rs.next())
					{
						itemShortName = rs.getString("itemshortname");
						item = rs.getString("item");
						itemidClause = "itemid='"+itemid+"' ";
						typeClause = "type like '%' ";
						sidClause = "sid = "+aweval.getSurveyID(request);
						uidClause = "userid = '"+rs.getString("userid")+"'";
						uid = rs.getString("userid");
					}
			    else
			    	{
			    	itemid="*";
			    	}
			    	
				String qid = request.getParameter("qid");
				String qidClause = "qid > 0";
				int navQid = -1;
				if (qid != null)
					{
					qidClause = "qid ="+qid;
					navQid = Integer.parseInt(qid);
					}
				else
					{
					qry = "select t1.qid from aweval.eval_responses_freeform t1 join survey_questions t2 on t1.qid=t2.qid where t2."+uidClause+" and "+ tsPeriodTabled +" and t1."+itemidClause+" and t2."+typeClause;					
					rs = stmt.executeQuery(qry);
					if (rs.next())
						{
							qidClause = "qid ="+rs.getString("qid");
							qid=rs.getString("qid");
							navQid = Integer.parseInt(qid);
						}
					else
						{
						rs = stmt.executeQuery("select qid, question from survey_questions where  qid in (select distinct(qid) from aweval.eval_responses_freeform where rid in (select distinct(rid) from survy_submission where itemid in (select itemid from survey_itemid where publicdata='Y' and "+itemidClause+")))");
						if (rs.next())
							{
							qidClause = "qid ="+rs.getString("qid");
							qid=rs.getString("qid");
							navQid = Integer.parseInt(qid);
							}
							else
							{
							qidClause = "qid ="+9999999;
							navQid = 999999999;
							}
						}
					}
			    	
			    ResultSet rs3 = null;
			    String checked = "";
			    /*
				String qry4= 
					"select t1.qid,t1.question "+ 
					"from  "+ 
					"(select qid, question, active, type from survey_questions where "+uidClause+" and style='F')  t1 "+ 
					"left outer join  "+ 
					"sur_itemquestion t2 on t1.qid=t2.qid "+ 
					"left outer join  "+ 
					"sur_sur_question t3 on t1.qid=t3.qid  "+ 
					"where "+typeClause+" and ((t3.sid is not null) or (t1.active='A' and "+itemidClause+")) order by t1.type desc";
				*/
				String qry4= "select qid, question from survey_questions where  qid in (select distinct(qid) from aweval.eval_responses_freeform where rid in (select distinct(rid) from survy_submission where itemid in (select itemid from survey_itemid where publicdata='Y' and "+itemidClause+")))";

				rs3 = stmt.executeQuery(qry4);
				String showUid = uid;

				if (uid.equals(""))
					showUid = "*";
				String title = evalPeriod + " Public&nbsp;Report:&nbsp;Freeform&nbsp;for&nbsp;"+showUid+"'s "+item;
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
							    		//aweval.navTable(out,yearParam,itemid,"./pubup.jsp");
							    		aweval.navTable(out,yearParam,navMonth,itemid,"./pubup.jsp",navQid,uidClause);
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
													<FORM name=list action="./pubup.jsp"  method="GET">
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
																		<option value="*">General
																		<%
																		Connection  connection2 = aweval.getConnection();
																		Statement stmt2 = connection2.createStatement();
																		checked ="";
																	   	qry = "select itemid,itemShortName, uid from survey_itemid where publicdata='Y' order by item";
																	   	ResultSet rs2 = stmt2.executeQuery(qry);
																		while(rs2.next())
																		{
																		if (rs2.getString("itemid").equals(itemid))
																			checked = "selected";
																		else 
																			checked = "";	
																		%>
																	  	<option <%= checked %> value="<%= rs2.getString("itemid") %>"><%= rs2.getString("uid")+"-"+rs2.getString("itemshortname") %>
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
				    <TR>
				    	<td>
				    		<form name="form1" action="./pubup.jsp">
				    		<input type="hidden" name="year" value="<%= yearParam %>">
				    		<input type="hidden" name="month" value="<%= monthParam %>">
				    		<input type="hidden" name="itemid" value="<%= itemid %>">				    						    					    		
				    		<table>
				    			<tr>
							      <TD>
							        <label for="q1">Freeform Question:</label>
							      </TD>
								  <TD valign="middle">
										<select id="q1" name="qid" onchange="form1.submit()">
										<%
										String question = "";
										while (rs3.next())
										{
											if (rs3.getString("qid").equals(qid)) checked = " selected ";
											else checked = "";
											String dispItem = item;
											if (item.equals("General Responses"))
												dispItem = "&lt;itemname&gt;";
											question = aweval.substrOrLess(aweval.replaceTag(aweval.replaceTags(uid, rs3.getString("question")),"<itemname>",dispItem),60);
										%>
											<option value="<%= rs3.getString("qid") %>" <%= checked %>><%= question %></option>
										<%
										}
										%>
										</select>
									</TD>
							    </TR>
							   </table>
							   </form>
							  </td>
							</tr>
							<tr>
								<td>
						  			<table border="1" cellpadding="0" cellspacing="0" width="100%">
						  				<tr bgcolor="#9999ff">
						  				<%
										qry = "select date(createtime) Date, Answer from aweval.eval_responses_freeform where itemid in (select itemid from survey_itemid where "+uidClause+") and "+ tsPeriod +" and "+itemidClause+" and "+qidClause;
	
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
							  						<th><%= rs1md.getColumnName(i) %></th>
							  					<%
							  					}
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
						  				<tr><td colspan=2>There have been no freeform answers for this <b><%= item %></b> question during this period</td></tr> 
						  				<%
						  				}
						  				%>
						  			</table>
							
								</td>
							</tr>
							<tr>
								<td>
									<table width="100%">
										<tr>
											<td align="left" width="100%">
												<%
												int icnt = 0;
												qry = "select count(*) cnt from aweval.eval_responses_freeform where itemid in (select itemid from survey_itemid where "+uidClause+") and "+ tsPeriod +" and "+itemidClause+" and "+qidClause;
												rs = stmt.executeQuery(qry);
												if (rs.next())
													icnt = rs.getInt("cnt");
												%>
												Page:
									   			<%
									    		//aweval.navTable(out,yearParam,itemid,"./pubup.jsp?qid="+qid+"&itemid="+itemid+"&year="+yearParam+"&month="+monthParam+"ipos=");
									    		aweval.pageCount(out, "./pubup.jsp?qid="+qid+"&itemid="+itemid+"&year="+yearParam+"&month="+monthParam+"&ipos=", ipos, icnt, pageCnt, itemPageSize);
									    		%>
									    	</td>					
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									&nbsp;
								</td>
							</tr>							
				</TABLE>			
			<!--		End		WorkPage  -->
			</td>
		</tr>
		<tr valign="bottom">
			<td height="21" align="center">&nbsp;&nbsp;<a href="http://www.ibm.com/ibm/"  target="new">About IBM</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.alphaworks.ibm.com/" target="new">alphaWorks</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.alphaworks.ibm.com/eval/fiera" target="new">Evaluate Fiera</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www-106.ibm.com/developerworks/forums/dw_forum.jsp?cat=28&forum=458" target="new">Fiera Discussion</a></td>
		</tr>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
connection.close();
%>
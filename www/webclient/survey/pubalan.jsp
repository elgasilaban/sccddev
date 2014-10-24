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
	uidClause = "userid='"+uid+"' ";
	
String itemid = request.getParameter("itemid");
if (itemid != null)
	{
	if (!aweval.isItemResultPublic(itemid))
		{
		aweval.setMessage("Item not valid");
		response.sendRedirect("./pubreport.jsp");
		}
	}
else
	{
	aweval.setMessage("Item not valid");
	response.sendRedirect("./pubreport.jsp");
	}

	
%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[3];
					int activeTab = 1;
					pageNav[0] ="Public Totals Report";					
					pageNav[1] ="Public Freeform Questions";
					pageNav[2] ="Public Arrival Report";
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./pubreport.jsp";
					pageNavTargets[1] ="./pubup.jsp";
					pageNavTargets[2] ="./pubrivals.jsp";					

					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
		<tr>
			<td height=240 align="center">
			<!--	Begin			WorkPage  -->			
			<%

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
				Statement stmtGetitemid = connection.createStatement();
				//String itemid = request.getParameter("itemid");
				
				ResultSet rs = null;
				String qry = "";
				String sid = request.getParameter("sid");
				if (!itemid.equals("*")) 
					{
			 		sid = aweval.getSurveyID(request);
			 		}				
				//String sid = null;
			 	//String sid = aweval.getSurveyID(request);   //to avoid sid issues
			    Statement stmt = connection.createStatement();
			    Statement stmt2 = connection.createStatement();


		String item = "All Items";
		//String item = "All Responses";		
		String itemShortName = "all";
		String itemidClause = "itemid like '%' ";
		String typeClause = "type = 'A' ";
		String sidClause = "sid > 0 ";
		
		if (sid != null)
			{
			sidClause = "sid = "+sid;
			}
			
		String checkItems ="select item, itemshortname,uid from survey_itemid where itemid= '"+itemid+"'";
		rs = stmt.executeQuery(checkItems);
		if (rs.next())
			{
				itemShortName = rs.getString("itemshortname");
				item = rs.getString("item");
				itemidClause = "itemid='"+itemid+"' ";
				typeClause = "type like '%' ";
				sidClause = "sid = "+aweval.getSurveyID(request);
				uidClause = "userid = '"+rs.getString("userid")+"'";
				uid=rs.getString("userid");		
			}
			
	    String title = "";

		//Should there be a sid clause in what follows? basically the question is:
		//  Do you want to report all data or just data formed by the current survey... better start off with all.

		
		String getAggRsp = "with tt1 as (select t1.question, t1.qid, t1.style, t2.answer, t2.aid, t2.order aorder, t1.type, t1.createtime from survey_questions t1, sur_quest_answer t2, sur_itemquestion t3 where (t1."+uidClause+" and t1.type='U' and t1.qid = t3.qid and t1.active= 'A' and t3.itemid ='"+itemid+"' and t1.qid=t2.qid) ), "+
	    "tt2 as (select t1.question, t1.qid, t1.style, t2.answer, t2.aid, t2.order aorder, t1.type, t1.createtime from survey_questions t1, sur_quest_answer t2 where (t1."+uidClause+" and t1.type='A' and t1.qid = t2.qid and t2.qid in (select qid from sur_sur_question where "+sidClause+")) ),  " +
	    "tt3 as (select * from tt1 where style <> 'F'  and style <> 'H' and style <> 'J' union all select * from tt2 where style <> 'F'  and style <> 'H' and style <> 'J'), " +
	    "tq1 as (select aid, count(*) cnt  from aweval.eval_responses_static  where rid in (select rid from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+") and "+tsPeriod+" and "+itemidClause+")group by aid), " +
	    "tq2 as " +
	    "(select question, qid, answer, tt3.aid aid, case when cnt is null then 0 else cnt end cnt, tt3.type type  from " +
	    "tt3 LEFT OUTER JOIN tq1 " +
	    "      ON ( tt3.AID = tq1.AID ) ), " +
	    "tq3 as " +
	    "(select qid, sum( cnt ) sum from " +
	    "tq2 group by qid) " +
	    "select tq2.question, tq2.qid, tq2.answer, tq2.aid, tq2.type, tq2.cnt, tq3.sum total  from " +
	    "tq2 LEFT OUTER JOIN tq3 " +
	    "      ON ( tq3.qID = tq2.qID ) order by type,tq3.qid,tq2.cnt desc";
	    
		String getExportAggRsp = "with tt1 as (select t1.question, t1.qid, t1.style, t2.answer, t2.aid, t2.order aorder, t1.type, t1.createtime from survey_questions t1, sur_quest_answer t2, sur_itemquestion t3 where (t1."+uidClause+" and t1.type='U' and t1.qid = t3.qid and t1.active= 'A' and t3.itemid ='"+itemid+"' and t1.qid=t2.qid) ), "+
	    "tt2 as (select t1.question, t1.qid, t1.style, t2.answer, t2.aid, t2.order aorder, t1.type, t1.createtime from survey_questions t1, sur_quest_answer t2 where (t1."+uidClause+" and t1.type='A' and t1.qid = t2.qid and t2.qid in (select qid from sur_sur_question where "+sidClause+")) ),  " +
	    "tt3 as (select * from tt1 where style <> 'F' union all select * from tt2 where style <> 'F' ), " +
	    "tq1 as (select aid, count(*) cnt  from aweval.eval_responses_static  where rid in (select rid from survy_submission where itemid in (select itemid from survey_itemid where "+uidClause+") and "+tsPeriod+" and "+itemidClause+")group by aid), " +
	    "tq2 as " +
	    "(select question, qid, answer, tt3.aid aid, case when cnt is null then 0 else cnt end cnt, tt3.type type  from " +
	    "tt3 LEFT OUTER JOIN tq1 " +
	    "      ON ( tt3.AID = tq1.AID ) ), " +
	    "tq3 as " +
	    "(select qid, sum( cnt ) sum from " +
	    "tq2 group by qid) " +
	    "select tq2.question Question, tq2.answer Answer, tq2.cnt Total  from " +
	    "tq2 LEFT OUTER JOIN tq3 " +
	    "      ON ( tq3.qID = tq2.qID ) order by type,tq3.qid,tq2.cnt desc";
	
		aweval.setExportQuery(getExportAggRsp);

	    title = evalPeriod +" - Evaluation Results for "+uid+"'s "+item; //rs1.getString("item");
		%>
			    <TABLE BORDER=0 width=100%>
			    	<tr>
			    		<td width="100%">
			    			<img src="images/clear.gif" height="1" width="100%">
			    		</td>
			    	</tr>
			    	<TR>
			    		<th><font size=4>
			    			<%= title %>
			    			</font>
			    		</th>
			    	</tr>
			    	<tr>
			    		<td>
			    			<hr>
			    		</td>
			    	</tr>
					<tr>
						<td align="center" width="100%">
							<table border="0" cellspacing="0" cellpadding="0" width="100%">
							    <tr>
							    	<td align="center" width="100%">
							   			<%
							    		aweval.navTable(out,yearParam,navMonth,itemid,"./pubalan.jsp",uidClause);
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
													<FORM name=list action="./pubalan.jsp"  method="GET">
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
																		String checked ="";
																	   	qry = "select itemid,itemShortName, uid from survey_itemid where publicdata='Y' order by item";
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
							    <tr>
							    	<td colspan=2>
							    		<hr>
							    	</td>
							    </tr>
								<tr>
									<td>
										<table width="100%">
									        <TR>
									
												<td align=center>
													Freeform:
												</td>
									
										    	<TD align="center" valign="top">
										  			<table border="1" cellpadding="0" cellspacing="0" width="100%">
										  				<tr bgcolor="#9999ff">
										  				<%
										  				//and qid in (select qid from sur_sur_question)
										  				// above will give us all 'A' active questions ... but what about the item questions
									
										  				String qry2 = "with t1 as (select * from survey_questions where "+uidClause+" and style='F' and "+typeClause +" and active <> 'D' and active <> 'F' ), "+
															"t2 as (select qid, count(*) cnt from aweval.eval_responses_freeform where "+tsPeriod+" and qid in (select qid from t1) and "+itemidClause+" group by qid) "+
															"select t1.qid Details,  t1.question, t2.cnt from t1, t2 where t1.qid=t2.qid";
									
										  				ResultSet rs1 = stmt.executeQuery(qry2);
									
										  				ResultSetMetaData rs1md = rs1.getMetaData();
										  				int colCount = rs1md.getColumnCount();
										  				int rowcnt = 0;
										  				String rowcolor = "#9999ff";
										  				String data = "";
										  				while (rs1.next())
										  				{
										  				if (rowcnt==0)
										  				{
										  				for (int i = 1; i <= colCount; i ++)
										  					out.println("<th>"+rs1md.getColumnName(i)+"</th>");
										  				}
										  				
										  				data=data+","+rs1.getString(colCount);

										  				if (rowcnt++%2 == 1)
										  					rowcolor = "#cccccc";
										  				else rowcolor = "#ffffff";
										  				%>
										  				<tr bgcolor="<%= rowcolor %>">
										  				<%
														String dispValue = "";
														for (int i = 1; i <= colCount; i ++)
															{
															if (rs1md.getColumnName(i).toLowerCase().equals("details"))
																{
																	dispValue = "&nbsp;&nbsp;&nbsp;<a href=\"./pubup.jsp?itemid="+ itemid +"&year="+yearParam+"&month="+monthParam+"&qid="+rs1.getString("details")+"\">See&nbsp;responses</a>&nbsp;"; 
																}
															else
															{
																dispValue = aweval.replaceTag(aweval.replaceTags(uid, rs1.getString(i)),"<itemname>",item);
																//if (dispValue.indexOf("<itemname>") > -1)
																//	dispValue = dispValue.substring(0,dispValue.indexOf("<itemname>"))+techname+ dispValue.substring(dispValue.indexOf("<techName>")+10);
															}
															out.println("<td align=left>"+dispValue+"</td>");
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
										  </table>										  
										</td>
									</tr>
							    </table>
							</td>
						</tr>
				    	<tr>
				    		<td>
				    			<hr>
				    		</td>
				    	</tr>					
					<%
					
				    //ResultSet rs1 = stmt.executeQuery(getAggRsp);
				    rs1 = stmt.executeQuery(getAggRsp);
			    	int index = 0;
			    	double findex;
			    	double fcnt = 0.1;
				    double fsum = 0.5;
					int qnum = 0;
					String bgcolor = "#FFFFFF";
					
				    if (rs1.next())
				    {
			        %>
			        <tr>
			        	<td>
				    		<table border="0" cellspacing="0" cellpadding="0" width="100%">
					        <%
					        String walker = rs1.getString("question");
					        int cnt =1;
					        //Start tables for each question
					        %>
				        		<tr>
				        			<td  bgcolor=<%= bgcolor %>>
				        				<table cellspacing="0" cellpadding="0" width="100%">
						    				<tr valign="top">
						    					<td colspan="4">
								        			<b><%= cnt %>) <%= aweval.replaceTag(aweval.replaceTags(uid, rs1.getString("question")),"<itemname>",item) %></b>( <%= rs1.getString("total") %> responses )
								        		</td>
								        	</tr>
									        <%
									        if (rs1.getString("answer").equals("Freeform Answer"))
									        {
									        }
									        else
									        {
									        if (rs1.getString("cnt") != null && rs1.getInt("cnt") != 0 )
									        	{
								                    fcnt = rs1.getInt("cnt");
								                    fsum = rs1.getInt("total");
								                    index = (int) Math.floor((float)(fcnt/fsum)*10000);
								                    findex = (double) index/100;
								                    index = ((rs1.getInt("cnt"))*200)/rs1.getInt("total");
							                %>
							                <tr valign="top">
							                	<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>							                								                
							                	<td width="400">
							                		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
							                	</td>							                	
							                	<td width="200">
							                		<img src="images/block.gif" width="<%= index %>" height="15">
							                	</td>							                	
							                	<td width="100">
							                		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B> <%=  findex %>%</B></FONT>
							                	</td>
							                </tr>
							                <%
								            }
								            else
								            {
							                %>
							                <tr valign="top">
							                	<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>							                
							                	<td width="400">
							                		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
							                	</td>
							                	<td width="200">
							                		<img src="images/block.gif" width="0" height="15">
							                	</td>
							                	<td width="100">
							                		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B> 0%</B></FONT>
							                	</td>
							                </tr>
							            <%
							        }
							    }
							    while (rs1.next())
							    {
							        if (walker.equals(rs1.getString("question"))) 
							        {
							            if (rs1.getString("cnt") != null && rs1.getInt("cnt") != 0 ) 
							            {
							                fcnt = rs1.getInt("cnt");
							                fsum = rs1.getInt("total");
							                //if (fsum == 0)
							                //	fsum=1;
							                index = (int) Math.floor((float)(fcnt/fsum)*10000);
							                findex = (double) index/100;
							                //if (
							                index = ((rs1.getInt("cnt"))*200)/rs1.getInt("total");
							                %>
							                <tr valign="top">
							                	<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>							                
							                	<td width="400">
							                		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
							                	</td>
							                	<td width="200">
							                		<img src="images/block.gif" width="<%= index %>" height="15">
							                	</td>
							                	<td width="100">
							                		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B> <%= findex %>%</B></FONT>
							                	</td>
							                </tr>
						                <%
						            }
						            else 
						            {
						                %>
							                <tr valign="top">
							                	<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>							                
							                	<td width="400">
							                		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
							                	</td>
							                	<td width="200">
							                		<img src="images/block.gif" width="0" height="15">
							                	</td>
							                	<td width="100">
							                		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B>0%</B></FONT>
							                	</td>
							                </tr>
						                <%
						            }
						        }
						        else  //New Question
						        {				        
						            cnt ++;
									bgcolor = "#FFFFFF";
						    		if (cnt % 2 == 0)
										bgcolor = "#EEEEEE";			            
						            %>
						            	</table>
						            </td>
						           </tr>
						            <tr>
						            	<td>
						            		<hr>
						            	</td>
						            </tr>						           
						           <tr>
						           	<td  bgcolor=<%= bgcolor %>>
						           		<table cellspacing="0" cellpadding="0" width="100%">
								            <tr valign="top">
								            	<td colspan="4">
								            		<b><font size="2" face="Arial"><%= cnt %>) <%= aweval.replaceTag(aweval.replaceTags(uid, rs1.getString("question")),"<itemname>",item) %></font></b><b><font size="1" face="Arial"> </font></b><font size="2" face="Arial">( </font><font size="2" face="Arial"><%= rs1.getString("total") %></font><font size="2" face="Arial"> responses )</font>
								            	</td>
								            </tr>
						            <%
						            walker = rs1.getString("question");
						            if (rs1.getString("answer").equals("Freeform Answer")) 
						            {
						            }
						            else 
						            {
						                if (rs1.getString("cnt") != null && rs1.getInt("cnt") != 0 ) 
						                {
						                fcnt = rs1.getInt("cnt");
						                fsum = rs1.getInt("total");
						                index = (int) Math.floor((float)(fcnt/fsum)*10000);
						                findex = (double) index/100;
						                index = ((rs1.getInt("cnt"))*200)/rs1.getInt("total");
						                    %>
						                    <tr valign="top">
												<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>
						                    	<td width="400">
						                    		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
						                    	</td>
						                    	<td width="200">
						                    		<img src="images/block.gif" width="<%= index %>" height="15">
						                    	</td>
						                    	<td width="100">
						                    		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B> <%= findex %>%</B></FONT>
						                    	</td>
						                    </tr>
						                    <%
						                }
						                else 
						                {
						                    %>
						                    <tr valign="top">
							                	<td width="20">
							                		<img src="images/clear.gif" width="20" height="15">
							                	</td>						                    
						                    	<td width="400">
						                    		<b><font size="2" color="#000080" face="Arial"><%= rs1.getString("answer") %></font></b>
						                    	</td>
						                    	<td width="200">
						                    		<img src="images/block.gif" width="0" height="15">
						                    	</td>
						                    	<td width="100">
						                    		<FONT FACE="Arial, Helvetica" SIZE=-1, COLOR="80000"><B> 0%</B></FONT>
						                    	</td>
						                    </tr>
						                    <%
						                }
						            }
						        }
						    }
						    %>
			    			
			    		</table>
			    	</td>
			    	</tr>				    	
			    </table>
			    
			    <%
			}
			stmt.close();
			stmt2.close();
			connection.close();
			%>
					</td>
				</tr>
			</table>
						
			<!--		End		WorkPage  -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
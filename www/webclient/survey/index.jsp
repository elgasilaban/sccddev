<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar,java.util.Collections,java.util.Arrays,java.util.Vector,java.util.Map,java.util.HashMap,com.ibm.tsd.pmcom.survey.Messages "%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />


<%
//System.err.println("\n arrivio in index.jsp ----- \n");

//HttpSession session1 = request.getSession();


//System.err.println("\n arrivio in index.jsp ----- userId = "+ident.getUid());

  
String userId = request.getParameter("userId");
//System.err.println("\n arrivio in index.jsp -- Maximo userId in Survey----- "+userId);

if(userId != null && !userId.equals(""))
{
	ident.setUid(request,userId);
}

/*String langCode = request.getParameter("lan");
if(langCode !=null && !langCode.equals(""))
{
	//ident.setLangCode(langCode);
	Messages.setLanguageCode(langCode);
}
 */

request.setCharacterEncoding("UTF-8");
String userMessage=Messages.getString("INDEX_USER_MESSAGE");
if (ident.getIsAuth())
	{
	    userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	  aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
	  ident.setMessage(Messages.getString("INDEX_USER_LOGIN_MESSAGE"));
	  response.sendRedirect("./login.jsp");
	}
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
%>
<%
	aweval.setLastPage("./index.jsp");
	String uid = ident.getUid();

//	String uidClause = "userid like '"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";

    String uidClause = "userid like '%' ";

    String action = request.getParameter("action");
 	Calendar thisYear = Calendar.getInstance();
 	int curYear = thisYear.get(thisYear.YEAR);

				
	String [] col = {"itemshortname","survey","html","link","case when t5.cnt is null then 0 else t5.cnt end"};
	//String [] col = {Messages.getString("INDEX_COLUMN_1"),Messages.getString("INDEX_COLUMN_2"),Messages.getString("INDEX_COLUMN_3"),Messages.getString("INDEX_COLUMN_4"),Messages.getString("INDEX_COLUMN_5")};
	String [] ord = {"asc","asc","asc","asc","desc"};
	
	int colNum = 4;
	String colItem = request.getParameter("col");
	if (colItem!=null)
		colNum = Integer.parseInt(colItem)-1;		

    
    int itemPageSize = 10;
    int pageCnt = 5;
    String stringIpos = request.getParameter("ipos");
    int ipos = 0;
    if (stringIpos != null)
    	ipos = Integer.parseInt(stringIpos);
    	
	Connection connection = aweval.getConnection();
	String qry = "";
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String databaseProductName = aweval.getDatabaseProductName();
	
	//String title = "Summary:&nbsp;Items,&nbsp;Surveys&nbsp;and&nbsp;HTML";
	String title = Messages.getString("INDEX_TITLE");
	%>
<!-- basic headers -->	
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>




    <br/>
	<DIV align=left>
	   <H3><%= title %></H3>
	</DIV>


	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] = Messages.getString("INDEX_PAGENAV_1");
					pageNav[1] = Messages.getString("INDEX_PAGENAV_2");
					pageNav[2] = Messages.getString("INDEX_PAGENAV_3");
					pageNav[3] = Messages.getString("INDEX_PAGENAV_4");
					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./itemman.jsp";
					pageNavTargets[1] ="./surveyman.jsp";
					pageNavTargets[2] ="./questionman.jsp";
					pageNavTargets[3] ="./htmlman.jsp";
					
					//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
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
<!-- basic headers -->
	<table border=0 width=100%>
		<tr>
			<td width="20">
				&nbsp;
			</td>
			<td valign="top">
				<table width="100%">
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td  valign="top">
							<table border=1 width="100%">
							<%
							//qry = "select concat('<a href=\"./iteminfo.jsp?itemid=',concat(t1.itemid,concat('\">',concat(t1.itemshortname,'</a>')))) Item, case  when t1.sid is null then 'Default' else t2.refname end Survey, case when t1.hid is null then 'Default' else t3.refname end HTML, case when t1.lid is null then 'Default' else t4.refname end Link, concat('<a href=\"./reportman.jsp?itemid=',concat(t1.itemid,concat('\">',concat(case when t4.cnt is null then '0' else char(t4.cnt) end,'</a>')))) Responses from survey_itemid t1 left outer join survey_surveys t2 on t1.sid=t2.sid left outer join survey_html t3 on t1.hid=t3.hid left outer join aweval.eval_return_links t4 on t1.lid=t4.lid left outer join (select itemid, count(*) cnt from survy_submission group by  itemid) t4 on t1.itemid=t4.itemid order by case when t4.cnt is null then 0 else t4.cnt end desc";
							Vector itemsInOriginalOrder = new Vector();
							Vector itemsInOriginalOrderForOpen = new Vector();
							
							if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
								//it's for oracle
								qry = "select concat('<a href=\"./iteminfo.jsp?itemid=',concat(t1.itemid,concat('\">',concat(t1.itemshortname,'</a>')))) Item, case  when t1.sid is null then 'Default' else t2.refname end Survey, case when t1.hid is null then 'Default' else t3.refname end HTML, case when t1.lid is null then 'Default' else t4.refname end Link, t1.recordclass Application, case when t1.ispublic = 'Y' then 'Published' else 'Not published' end ispublic from (select * from survey_itemid where "+uidClause+") t1 left outer join survey_surveys t2 on t1.sid=t2.sid left outer join survey_html t3 on t1.hid=t3.hid left outer join sur_return_links t4 on t1.lid=t4.lid left outer join (select itemid, count(*) cnt from survy_submission where to_char(createtime, 'yyyy')='"+curYear+"' group by  itemid) t5 on t1.itemid=t5.itemid order by "+col[colNum]+" "+ord[colNum];
							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//venkyg : it's for db2
								qry = "select concat('<a href=\"./iteminfo.jsp?itemid=',concat(t1.itemid,concat('\">',concat(t1.itemshortname,'</a>')))) Item, case  when t1.sid is null then 'Default' else t2.refname end Survey, case when t1.hid is null then 'Default' else t3.refname end HTML, case when t1.lid is null then 'Default' else t4.refname end Link, t1.recordclass Application, case when t1.ispublic = 'Y' then 'Published' else 'Not published' end ispublic  from (select * from survey_itemid where "+uidClause+") t1 left outer join survey_surveys t2 on t1.sid=t2.sid left outer join survey_html t3 on t1.hid=t3.hid left outer join sur_return_links t4 on t1.lid=t4.lid left outer join (select itemid, count(*) cnt from survy_submission where year(createtime)="+curYear+" group by  itemid) t5 on t1.itemid=t5.itemid order by "+col[colNum]+" "+ord[colNum];
							} else
							{
								//removed concat
								//char_to replaced with datename
								qry = "select '<a href=\"./iteminfo.jsp?itemid=' + t1.itemid + '\">' + t1.itemshortname + '</a>' Item, case  when t1.sid is null then 'Default' else t2.refname end Survey, case when t1.hid is null then 'Default' else t3.refname end HTML, case when t1.lid is null then 'Default' else t4.refname end Link, t1.recordclass Application, case when t1.ispublic = 'Y' then 'Published' else 'Not published' end ispublic from (select * from survey_itemid where "+uidClause+") t1 left outer join survey_surveys t2 on t1.sid=t2.sid left outer join survey_html t3 on t1.hid=t3.hid left outer join sur_return_links t4 on t1.lid=t4.lid left outer join (select itemid, count(*) cnt from survy_submission where datename(year, createtime)='"+curYear+"' group by  itemid) t5 on t1.itemid=t5.itemid order by "+col[colNum]+" "+ord[colNum];
							}
							
							//System.err.println("\n arrivio in index.jsp ----- aweval.db2ProductName = "+aweval.db2ProductName);

							//System.err.println("\n arrivio in index.jsp ----- databaseProductName = "+databaseProductName);


							//System.err.println("\n arrivio in index.jsp ----- qry = "+qry);


                              Map synonymDomainMap = new HashMap();
							  Statement stmtc = connection.createStatement();
							   
							   /*String qryc = "select maxvalue, description from synonymdomain where domainid = 'SURVEYAPPLICATION'";
							   
								ResultSet rsultset = stmtc.executeQuery(qryc);
								while(rsultset.next())
                                   synonymDomainMap.put(rsultset.getString("maxvalue"),rsultset.getString("description")); */


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
										columnHeading = columnHeading.substring(0,1).toUpperCase() + columnHeading.substring(1,columnHeading.length()).toLowerCase();
				  					%>
				  						<th class="text tabletitle " style="color:black;height:12px;padding-left:2px;padding-right:2px;;cursor:pointer;text-decoration:underline;;">
										
											<%=Messages.getString("INDEX_COLUMN_HEADING_"+columnHeading+"")%>
										</th>
						  			<%
									}
								%>
								</tr>
								<%
								int rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
								String tmp2 = "";
								String tmp = "";
				
								while (rs.next())
								{
								tmp2 = rs.getString("item");
								tmp = rs.getString("item");

                                String appText = rs.getString("Application");
							    //System.err.println("\n arrivio in index.jsp ----- appText = "+appText);

								if(appText != null && !appText.equals(""))
								{
									//appText = (String)synonymDomainMap.get(appText);
									String qryc = "select description from maxapps where app = '"+appText+"'";
								    ResultSet rsultset = stmtc.executeQuery(qryc);
									while(rsultset.next())
										appText = rsultset.getString(1);

								}


								itemsInOriginalOrderForOpen.addElement(tmp.substring(31,tmp.indexOf(">")-1));								
								tmp = tmp.substring(tmp.indexOf(">")+1);
								itemsInOriginalOrder.add(tmp.substring(0,tmp.indexOf("<")));
								//System.out.println(" --- > "+tmp);
								if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%
								for (int i = 1; i <= colCount; i ++)
								{
									String text = rs.getString(i);
							    //System.err.println("\n arrivio in index.jsp ----- text = "+text+"---- i = "+i);
									if(i==5 && appText != null && !appText.equals(""))
									{
										text =  appText;
									}

								    if(text.equalsIgnoreCase("Default"))
										text = Messages.getString("LINKMAN_COLUMN_HEADING_5");
									else
									 if(text.equalsIgnoreCase("Not published"))
										text = Messages.getString("ITEMMAN_NONE_PUBLIC");
									else
									 if(text.equalsIgnoreCase("Published"))
										text = Messages.getString("STANDARDQUESTIONS_PUBLISHED");
										

										    
 
									%>
									<td align="center"><%= text %></td>
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
						<td width="20">
							&nbsp;
						</td>						
					</tr>
					<tr>
						<td>
							<table width="100%">
								<tr>
									<td valign="top">
										<%
										int icnt = 0;
										qry = "select count(*) cnt from survey_itemid where "+uidClause+"";
										rs = stmt.executeQuery(qry);
										if (rs.next())
											icnt = rs.getInt("cnt");
										%>
										  <%=Messages.getString("INDEX_PAGE")%>: 
										<%
											aweval.pageCount(out, "./index.jsp?col="+(colNum+1)+"&ipos=", ipos, icnt, pageCnt, itemPageSize);
										%>
									</td>
									<td align="right" valign="top">
										<table>
											<!--tr>
												<td valign="top">
													<%
													Object itemsSorted[] = itemsInOriginalOrder.toArray();
													Arrays.sort(itemsSorted);
													%>
													<%=Messages.getString("INDEX_FIND_PAGE")%>:
												</td>
												<td valign="top">
													<form action="./index.jsp">
													<input type="hidden" name="col" value="<%= colNum + 1 %>">
													<select name="ipos">
													<option value="0">------
													<%
													for (int i = 0; i < itemsSorted.length; i++)
														{
														%>
														<option value="<%= itemsInOriginalOrder.indexOf(itemsSorted[i])/itemPageSize %>"><%= itemsSorted[i] %>
														<%
														}
													%>
													</select>						
												</td>
												<td>
													<input type="submit" value=<%=Messages.getString("INDEX_BUTTON_GO")%>>
													</form>													
												</td>
											</tr-->
										</table>
									</td>
									<td align="right" valign="top">
										<table>
											<!--tr>
												<td valign="top">
													<%
													//Object itemsSorted[] = itemsInOriginalOrder.toArray();
													//Arrays.sort(itemsSorted);
													%>
													<%=Messages.getString("INDEX_OPEN_ITEM")%>:
												</td>
												<td valign="top">
													<form action="./iteminfo.jsp">
													<select name="itemid">
													<option>------
													<%
													for (int i = 0; i < itemsSorted.length; i++)
														{
														%>
														<option value="<%= itemsInOriginalOrderForOpen.get(itemsInOriginalOrder.indexOf(itemsSorted[i])) %>"><%= itemsSorted[i] %>
														<%
														}
													%>
													</select>						
												</td>
												<td>
													<input type="submit" value=<%=Messages.getString("INDEX_BUTTON_OPEN")%>>
													</form>													
												</td>
											</tr-->
										</table>
									</td>									
								</tr>
							</table>
						</td>
					</tr>					
				</table>
			</td>
		</tr>
		<!--tr>
			<td colspan=3>
				<hr>
			</td>
		</tr-->
        <tr class="tablerow">
			<td class="toggleselectrows" noWrap colspan="5">
				&nbsp; 
			</td>
		</tr>

		<tr>
			<td colspan=3 align="center">
				<table border=0>
					<tr>

						<td align="center" colspan=3>
							<table width=100% border=0>
								<tr>						
									<td align="center">
									<%= Messages.getString("INDEX_ITEMS_MANAGED") %>:
									&nbsp;....&nbsp;					
									<%
									int itemTot = 0;
									qry = "select count(*) cnt from survey_itemid where "+uidClause+"";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										itemTot = rs.getInt("cnt");
									%>
										<%= itemTot %>
									</td>									
								</tr>
							</table>
						</td>				
					</tr>
					<tr>
						<td>
							<table>
								<tr>
									<td>
    									<%= Messages.getString("INDEX_SURVEY_OBJECT") %>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>						
									<%
									int surveyTot = 0;
									qry = "select count(*) cnt from survey_surveys where "+uidClause+"";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										surveyTot = rs.getInt("cnt");
									%>
									<td>
										<%= surveyTot %>
									</td>
								</tr>
								<tr>
									<td>
										<%= Messages.getString("INDEX_TOTAL_HTML") %>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>						
									<%
									int htmlTot = 0;
									qry = "select count(*) cnt from survey_html where "+uidClause+"";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										htmlTot = rs.getInt("cnt");
									%>
									<td>
										<%= htmlTot %>
									</td>				
								</tr>
								<tr>
									<td>
										<%= Messages.getString("INDEX_TOTAL_RETURN") %>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>						
									<%
									int linkTot = 0;
									qry = "select count(*) cnt from sur_return_links where "+uidClause+"";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										linkTot = rs.getInt("cnt");
									%>
									<td>
										<%= linkTot %>
									</td>				
								</tr>
							</table>
						</td>
						<td>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
						<td>
							<table>
								<tr>
									<td>
										<%= Messages.getString("INDEX_DEFAULT_SURVEY") %>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>
									<%
									String defaultSurvey = Messages.getString("INDEX_NOT_DEFINED");
									qry = "select sid, refname from survey_surveys where "+uidClause+" and active='A'";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										defaultSurvey = rs.getInt("sid")+" ("+rs.getString("refname")+")";
									%>
									<td>
										<%= defaultSurvey %>
									</td>					
								</tr>							
								<tr>
									<td>
										<%=Messages.getString("INDEX_DEFAULT_HTML")%>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>
									<%
									String defaultHTML = Messages.getString("INDEX_SYSTEM_DEFAULT");
									qry = "select hid, refname from survey_html where "+uidClause+" and isDefault='1'";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										defaultHTML = rs.getInt("hid")+" ("+rs.getString("refname")+")";
									%>
									<td>
										<%= defaultHTML %>
									</td>				
								</tr>
								<tr>
									<td>
										<%=Messages.getString("INDEX_DEFAULT_RETURN_LINK")%>:
									</td>
									<td>
									&nbsp;....&nbsp;
									</td>
									<%
									String defaultLink =  Messages.getString("INDEX_SYSTEM_DEFAULT");
									qry = "select lid, refname from sur_return_links where "+uidClause+" and isDefault='1'";
									rs = stmt.executeQuery(qry);
									if (rs.next())
										defaultLink = rs.getString("refname");
									%>
									<td>
										<%= defaultLink %>
									</td>					
								</tr>
							</table>
						</tr>
					</td>										
				</table>
			</td>
		</tr>
		<!--tr>
			<td colspan="3" align="center">
				<table border=0>
					<tr>
						<td>
							<form name=list action="./surveyView.jsp"  method="get">
								<table>
									<tr>									
										<td>	
											<label for="s1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("INDEX_BUTTON_SHOW_SURVEY")%>:></label>
										</td>
										<td>
											<select id="s1" name="sid">
											<option>------
												<%
												qry = "select sid, refname from survey_surveys where "+uidClause+"";
												rs = stmt.executeQuery(qry);									
												while(rs.next())
												{
												%>
												  <option value="<%= rs.getString("sid") %>"><%= rs.getString("sid") %> (<%= rs.getString("refname") %>)
												<%
												}
												%>
											</select>
										</td>
									</tr>
								</table>
							</FORM>
						</td>	
						<td>
							<FORM name=list ACTION="./htmlview.jsp"  METHOD="GET">
								<table>
									<tr>									
										<td>	
											<label for="h1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("INDEX_BUTTON_SHOW_HTML")%>:></label>
										</td>
										<td>
											<select id="h1" name="hid">
											<option>------
												<%
												qry = "select * from survey_html where "+uidClause+"";
												rs = stmt.executeQuery(qry);									
												while(rs.next())
												{
												%>
												  <option value="<%= rs.getString("hid") %>">HTML-<%= rs.getString("hid") + " ("+rs.getString("refname")+")" %>
												<%
												}
												%>
											</select>
										</td>
									</tr>
								</table>
							</FORM>
						</td>	
					</tr>
				</table>			
			</td>
		</tr-->
	</table>
	
<!-- basic footers -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<!-- basic footers -->	

</DIV></DIV>

	<%
	connection.close();

%>



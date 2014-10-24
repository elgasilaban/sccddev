<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>

<%@page import="java.sql.*,java.util.Collections,java.util.Arrays,java.util.Vector,com.ibm.tsd.pmcom.survey.Messages"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%

//System.err.println("\n arrivio in itemman.jsp ----- \n");

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
	//String uidClause = " userid='"+uid+"' ";
	

    String uidClause = "userid like '%' ";


String action = request.getParameter("action");
if (action == null)
	action="";

if (action.equals("loaditem"))
	{
	aweval.loadItem(request,uid);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("remitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.removeItem(request);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("assitem"))
	{
	if (aweval.authItem(uid,request) && aweval.authHtml(uid,request))
		aweval.assignHTMLToItems(request);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("asssid"))
	{
	if (aweval.authItem(uid,request) && aweval.authSurvey(uid,request))
		aweval.assignSurveyToItems(request);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("enableitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.enableItemSurvey(request);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("disableitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.disableItemSurvey(request);
	response.sendRedirect("./itemman.jsp");
	}
else if (action.equals("loaddata"))
    {
   	aweval.loadItemBulk(request, uid);
    response.sendRedirect("./itemman.jsp");
    }
else if (action.equals("pubdata"))
    {
   	aweval.makeItemResultsPublic(request);
    response.sendRedirect("./itemman.jsp");
    }
else if (action.equals("privdata"))
    {
   	aweval.makeItemResultsPrivate(request);
    response.sendRedirect("./itemman.jsp");
    }    	
else
	{
	aweval.setLastPage("./itemman.jsp");

	String title = Messages.getString("ITEMMAN_TITLE");
	
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
					String [] pageNav = new String[1];
					int activeTab = 1;
					/*pageNav[0] ="Upload New HTML";
					pageNav[1] ="Create Simple HTML";
					pageNav[2] ="Create New Survey";
					pageNav[3] ="Load Items"; */

					//pageNav[0] = Messages.getString("ITEMMAN_PAGENAV_1");
					//pageNav[1] = Messages.getString("ITEMMAN_PAGENAV_2");
					//pageNav[1] = Messages.getString("ITEMMAN_PAGENAV_3");
					pageNav[0] = Messages.getString("ITEMINFO_CREATE_NEW") + "  "+Messages.getString("INDEX_COLUMN_HEADING_Item");

					
					String [] pageNavTargets = new String[1];
					//pageNavTargets[0] ="./uploadman.jsp";
					//pageNavTargets[1] ="./simpleHtml.jsp?action=";
					//pageNavTargets[1] ="./editStandardSurvey.jsp";
					pageNavTargets[0] ="./itemman2.jsp";					
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
//					System.err.println("\n arrivio in itemman.jsp ----- pageNav[0] = "+pageNav[0]);

					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
			<tr>
				<td>
				<I></I>
				<%
				aweval.setMessage("");
				%>
				</td>
			</tr>			
		<tr>
			<td height=240 align="center">
				<!-- WorkPage end -->
				<%
				Connection connection = aweval.getConnection();
				Connection connection2 = aweval.getConnection();
				Statement stmt = connection.createStatement();
			    String qry = "Select item, itemid from survey_itemid where "+uidClause+" order by item asc";

			    ResultSet rs = null;
			
			    int itemPageSize = 5;	
			    int pageCnt = 5;		    
			    String stringIpos = request.getParameter("ipos");			           
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
				Vector itemsInOriginalOrder = new Vector();
				Vector itemsInOriginalOrderForOpen = new Vector();
    				    
			    %>		
				<table>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>				
					<tr>
						<td  valign="top">
							<table border=1>
							<%
							if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
							{
								//it's for oracle
								qry = "select itemshortname, itemid, case when sid is null then 'Default' else chr(sid) end sid, case when hid is null then 'Default' else chr(hid) end hid, ispublic from survey_itemid where "+uidClause+" order by itemshortname";

							} else
							if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
							{
								//venkyg : it is for db2
								qry = "select itemshortname, itemid, case when sid is null then 'Default' else char(sid) end sid, case when hid is null then 'Default' else char(hid) end hid, ispublic from survey_itemid where "+uidClause+" order by itemshortname";

							} else
							{
								qry = "select itemshortname, itemid, case when sid is null then 'Default' else char(sid) end sid, case when hid is null then 'Default' else char(hid) end hid, ispublic from survey_itemid where "+uidClause+" order by itemshortname";
							} 
							

//							System.err.println("\n arrivio in itemman.jsp ----- qry = "+qry);
						   	
							stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr abgcolor="#9999ff"   class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_1")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_2")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_3")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_4")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_5")%></th>
								</tr>
								<%
								int rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
							
								while (rs.next())
								{
								itemsInOriginalOrderForOpen.addElement(rs.getString("itemid"));								
								itemsInOriginalOrder.add(rs.getString("itemshortname"));
								
								if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
									<td>
										<a href="./iteminfo.jsp?itemid=<%= rs.getString("itemid") %>"><%= rs.getString("itemshortname") %></a>
									</td>
									<td>

										<%= rs.getString("itemid") %>
									</td>
									<td>
										<form name="setsid" action="./itemman.jsp">
										<INPUT TYPE="HIDDEN" NAME="action" VALUE="asssid">
										<INPUT TYPE="HIDDEN" NAME="itemid" VALUE="<%= rs.getString("itemid") %>">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td>
														<label for="s1<%= rs.getString("itemid") %>"><input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_ASSIGN")%>:></label>
													</td>
													<td>
														<select id="s1<%= rs.getString("itemid") %>" name="sid">
															<option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>
															<%
															String qryc = "select sid, refname from survey_surveys where "+uidClause+" order by sid";
															Statement stmtc = connection2.createStatement();
															ResultSet rsc = stmtc.executeQuery(qryc);
															String checked="";
															while(rsc.next())
															{
															checked="";
															if (rs.getString("sid").trim().equals(rsc.getString("sid").trim()))
																{
																checked="selected";
																}
															%>
															<option value="<%=rsc.getString("sid")%>" <%= checked %> ><%=rsc.getString("sid")%> (<%=rsc.getString("refname")%>)
															<%
															}
															%>
														</select>
													</td>
												</tr>
											</table>
										</form>
									</td>
									<td>
										<form name="setsid" action="./itemman.jsp">
										<INPUT TYPE="HIDDEN" NAME="action" VALUE="assitem">
										<INPUT TYPE="HIDDEN" NAME="itemid" VALUE="<%= rs.getString("itemid") %>">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td>
														<label for="h1<%= rs.getString("itemid") %>"><input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_ASSIGN")%>:></label>
													</td>
													<td>
														<select id="h1<%= rs.getString("itemid") %>" name="hid">
															<option value="Default"><%=Messages.getString("ITEMMAN2_BASED_ON_SURVEY")%>
															<%
															qryc = "select hid, refname from survey_html where "+uidClause+" order by hid";
															//stmtc = connection.createStatement();
															rsc = stmtc.executeQuery(qryc);
															while(rsc.next())
															{
															checked="";
															if (rs.getString("hid").trim().equals(rsc.getString("hid").trim()))
																{
																checked="selected";
																}
															%>
															<option value="<%=rsc.getString("hid")%>" <%= checked %> ><%=rsc.getString("hid")%> (<%=rsc.getString("refname")%>)
															<%
															}
															%>
														</select>
													</td>
												</tr>
											</table>
										</form>
									</td>
									<td>
									<%
										if (rs.getString("ispublic").equals("Y"))
											{
											%>
												<form action="javascript:spawnwide('./survey.jsp?itemid=<%= rs.getString("itemid") %>')" method="get">
												<input name="itemid" type="hidden" value="<%= rs.getString("itemid") %>">
												<input type="submit" value="<%=Messages.getString("INDEX_BUTTON_OPEN")%>">
												</form>
											<%
											}
										else
											{
											%>
											
												<form action="./surveyView.jsp" method="get">
													<input name="itemid" type="hidden" value="<%= rs.getString("itemid") %>">
													<input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_PREVIEW")%>>
												</form>

											<%
											}
									%>
									</td>								
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
											aweval.pageCount(out, "./itemman.jsp?ipos=", ipos, icnt, pageCnt, itemPageSize);
										%>
									</td>
									<!--td align="right" valign="top">
										<table>
											<tr>
												<td valign="top">
													<%
													Object itemsSorted[] = itemsInOriginalOrder.toArray();
													Arrays.sort(itemsSorted);
													%>
													<%=Messages.getString("INDEX_FIND_PAGE")%>:
												</td>
												<td valign="top">
													<form action="./itemman.jsp">
													<select name="ipos">
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
											</tr>
										</table>
									</td-->
									<td align="right" valign="top">
										<table>
											<tr>
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
											</tr>
										</table>
									</td>									
								</tr>
							</table>
						</td>
					</tr>										
					<!--tr>
						<td>
							<hr>
						</td>
					</tr-->
					 <tr class="tablerow">
						<td class="toggleselectrows" noWrap colspan="5">
							&nbsp; 
						</td>
					</tr>
					<tr>
						<td>
							<b><%=Messages.getString("ITEMMAN_ALLOW_DISALLOW_SURVEYS")%></b>
						</td>
					</tr>
					<tr>
						<td align="center">
							<table border=1>
								<tr abgcolor="#9999ff"  class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_BUTTON_PUBLISH")%> <%=Messages.getString("INDEX_COLUMN_HEADING_Item")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_NONE_PUBLIC")%> <%=Messages.getString("INDEX_COLUMN_HEADING_Item")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_REMOVE_ITEMS")%></th>
								</tr>
								<tr>
									<td align="right">
										<form action=./itemman.jsp>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="disableitem">
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												String qryc = "select itemid, itemshortname, iid from survey_itemid where "+uidClause+" and ispublic='Y'  order by itemshortname";
												Statement stmtc = connection2.createStatement();
												ResultSet rsc = stmtc.executeQuery(qryc);
												if (rsc.next())
												{
												%>
												
													<td>
														<label for="i3"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_BUTTON_UNPUBLISH")%>:></label>
													</td>
													<td>
														<select id="i3" name="itemid" multiple size=3>
															<%
															//qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (sid is null or sid <>"+sid+") order by itemid";
															//stmtc = connection.createStatement();
															rsc = stmtc.executeQuery(qryc);
															while (rsc.next()) {
															%>
															<option value="<%=rsc.getString("itemid")%>"><%=rsc.getString("itemshortname")%>
															<%
															}
															%>
														</select>
													</td>
												<%
												}
												else
												{
												%>
												<td>&nbsp;<%=Messages.getString("ITEMMAN_NONE_PUBLIC")%></td>
												<%
												}
												%>
												</tr>
											</table>
										</form>
									</td>
									<td align="left">
										<form action=./itemman.jsp>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="enableitem">
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												String qrya = "select itemid,itemshortname, iid from survey_itemid where "+uidClause+" and ispublic ='N' order by itemshortname";
												Statement stmta = connection2.createStatement();
												ResultSet rsa = stmta.executeQuery(qrya);
												if (rsa.next())
												{
												%>
									 
													<td>
														<label for="i2"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_BUTTON_PUBLISH")%>:></label>
													</td>
													<td>
														<select id="i1" name="itemid" multiple size=3>
															<%
															//qrya = "select itemid,itemshortname from survey_itemid where "+uidClause+" and sid ="+sid;
															//stmta = connection.createStatement();
															rsa = stmta.executeQuery(qrya);
															while (rsa.next()) {
															%>
															<option value="<%=rsa.getString("itemid")%>"><%=rsa.getString("itemshortname")%>
															<%
															}
															%>
														</select>
													</td>
												<%
												}
												else
												{
												%>
												<td>&nbsp;<%=Messages.getString("ITEMMAN_ALL_PUBLIC")%></td>
												<%
												}
												%>
												</tr>
											</table>
										</form>
									</td>

									<td valign="top">
										<table>
											<tr>
												<td valign="top">
													<form name=list action="./itemman.jsp"  method="GET">
														<table>									
															<tr>
																<td >
																	<INPUT TYPE="HIDDEN" NAME="action" VALUE="remitem">
																	<INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%>:>	
																</td>
																<td>
																	<select id="i1" name="itemid" multiple size="3">
																		<%
																	   	qry = "select itemid, itemshortname from survey_itemid where "+uidClause+" order by itemid";
																	   	//stmt = connection.createStatement();
																	   	rs = stmt.executeQuery(qry);
																		while(rs.next())
																		{
																		%>
																	  	<option value="<%= rs.getString("itemid") %>"><%= rs.getString("itemshortname") %>
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
								</tr>							
							</table>
						</td>
					</tr>
					<!--tr>
						<td>
							<hr>
						</td>
					</tr-->
					 <tr class="tablerow">
								<td class="toggleselectrows" noWrap colspan="5">
									&nbsp; 
								</td>
							</tr>
					<!--tr>
						<td>
							<b><%=Messages.getString("ITEMMAN_ALLOW_DISALLOW_RESULTS")%></b>
						</td>
					</tr>
															
					<tr>
						<td align="center">
							<table border=1>
								<tr abgcolor="#9999ff"  class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_ITEMS_PUBLIC_RESULTS")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMMAN_ITEMS_PRIVATE_RESULTS")%></th>
								</tr>
								<tr>
									<td align="right">
										<form action=./itemman.jsp>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="privdata">
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												qryc = "select itemid, itemshortname, iid from survey_itemid where "+uidClause+" and publicdata='Y'  order by itemshortname";
												stmtc = connection2.createStatement();
												rsc = stmtc.executeQuery(qryc);
												if (rsc.next())
												{
												%>
												
													<td>
														<label for="i3"><INPUT TYPE="SUBMIT" VALUE="Make Private:"></label>
													</td>
													<td>
														<select id="i3" name="itemid" multiple size=3>
															<%
															//qryc = "select itemid, itemshortname from survey_itemid where "+uidClause+" and (sid is null or sid <>"+sid+") order by itemid";
															//stmtc = connection.createStatement();
															rsc = stmtc.executeQuery(qryc);
															while (rsc.next()) {
															%>
															<option value="<%=rsc.getString("itemid")%>"><%=rsc.getString("itemshortname")%>
															<%
															}
															%>
														</select>
													</td>
												<%
												}
												else
												{
												%>
												<td>&nbsp;<%=Messages.getString("ITEMMAN_NO_PUBLIC")%></td>
												<%
												}
												%>
												</tr>
											</table>
										</form>
									</td>
									<td align="left">
										<form action=./itemman.jsp>
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="pubdata">
											<table cellspacing="0" cellpadding="0">
												<tr>
												<%
												qrya = "select itemid,itemshortname, iid from survey_itemid where "+uidClause+" and publicdata ='N' order by itemshortname";
												stmta = connection2.createStatement();
												rsa = stmta.executeQuery(qrya);
												if (rsa.next())
												{
												%>
									
													<td>
														<label for="i2"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("ITEMMAN_BUTTON_MAKE_PUBLIC")%>></label>
													</td>
													<td>
														<select id="i1" name="itemid" multiple size=3>
															<%
															//qrya = "select itemid,itemshortname from survey_itemid where "+uidClause+" and sid ="+sid;
															//stmta = connection.createStatement();
															rsa = stmta.executeQuery(qrya);
															while (rsa.next()) {
															%>
															<option value="<%=rsa.getString("itemid")%>"><%=rsa.getString("itemshortname")%>
															<%
															}
															%>
														</select>
													</td>
												<%
												}
												else
												{
												%>
												<td>&nbsp;<%=Messages.getString("ITEMMAN_ALL_RESULTS")%></td>
												<%
												}
												%>
												</tr-->
											</table>
										</form>
									</td>
								</tr>							
							</table>
						</td>
					</tr>					

					<!--tr>
						<td>
							<hr>
						</td>
					</tr-->
		 
		 <tr class="tablerow">
			<td class="toggleselectrows" noWrap colspan="5">
				&nbsp; 
			</td>
		</tr>
		
				<!-- WorkPage end -->
				</table>
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
connection2.close();
connection.close();
}
%>
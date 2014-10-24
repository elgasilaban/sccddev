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

//System.err.println("\n arrivio in linkman.jsp ----- \n");

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
%>
<%

	String uid = ident.getUid();
//	String uidClause = "userid='"+uid+"' ";

    String uidClause = "userid like '%' ";
		
String action = request.getParameter("action");
if (action == null)
	action="";

if (action.equals("loadlink"))
	{
	aweval.loadLink(request, uid);
	response.sendRedirect("./linkman.jsp");
	}
else if (action.equals("updatelink"))
	{
	if (aweval.authLink(uid,request))
		aweval.updateLink(request);
	response.sendRedirect("./linkman.jsp");
	}	
else if (action.equals("activate"))
	{
	if (aweval.authLink(uid,request))
		aweval.assignDefaultLink(request,uid);
	response.sendRedirect("./linkman.jsp");
	}

else if (action.equals("remitem"))
	{
	if (aweval.authLink(uid,request) && aweval.authItem(uid,request))
		aweval.removeLinkFromItems(request);
	response.sendRedirect("./linkman.jsp");
	}
else if (action.equals("assitem"))
	{
	if (aweval.authLink(uid,request) && aweval.authItem(uid,request))
		aweval.assignLinkToItems(request);
	response.sendRedirect("./linkman.jsp");
	}
else if (action.equals("remlink"))
	{
	if (aweval.authLink(uid,request))
		aweval.removeLink(request);
	response.sendRedirect("./linkman.jsp");
	}	
else
	{

String title = Messages.getString("LINKMAN_TITLE");
%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

<br/>
	<DIV align=left>
	   <H3><%= title %></H3>
	</DIV>


	<table width="100%" border=1>
		<!--tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[3];
					int activeTab = 1;
					/*pageNav[0] ="Manage Surveys";
					pageNav[1] ="Manage Items";
					pageNav[2] ="Manage HTML";*/
					//pageNav[3] ="Links for Surveys";
					pageNav[0] = Messages.getString("LINKMAN_PAGENAV_1");
					pageNav[1] = Messages.getString("LINKMAN_PAGENAV_2");
					pageNav[2] = Messages.getString("INDEX_PAGENAV_4");
					
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./surveyman.jsp";
					pageNavTargets[1] ="./itemman.jsp";
					pageNavTargets[2] ="./htmlman.jsp";
					//pageNavTargets[3] ="./linkman2.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
					//String title = "Link Management: Return Links for Items";

				%>
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
				<!-- WorkPage end -->
				<%
				Connection connection = aweval.getConnection();
				Connection connection2 = aweval.getConnection();
				Statement stmt = connection.createStatement();
			    String qry = "";
				String lid = request.getParameter("lid");
				if (lid==null)
					lid = "0";
			    ResultSet rs = null;
			
			    int itemPageSize = 5;	
			    int pageCnt = 5;		    
			    String stringIpos = request.getParameter("ipos");			           
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
    				    
			    %>		
				<table>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>				
					<tr>
						<td  valign="top">
							<table border=1 width="100%">
							<%
							qry = "Select lid, refname, url, isdefault from sur_return_links where "+uidClause+" order by isdefault desc, refname asc";
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr abgcolor="#9999ff"  class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("LINKMAN_COLUMN_HEADING_1")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("LINKMAN_COLUMN_HEADING_2")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("LINKMAN_COLUMN_HEADING_3")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("LINKMAN_COLUMN_HEADING_4")%></th>
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%></th>

								</tr>
								<%
								int rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
							
								while (rs.next())
								{
								if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
									<td>
										<%= aweval.substrOrLess(rs.getString("url") ,20) %><br>
										(<%= aweval.substrOrLess( rs.getString("refname") ,20) %>)
									</td>
									<td>
										<form action="./linkman.jsp" >
											<input type="hidden" name="action" value="update">
											<input type="hidden" name="lid" value="<%= rs.getString("lid") %>">											
											<input type="submit" value=<%=Messages.getString("STANDARDQUESTIONS_EDIT")%>>
										</form>
									</td>
									<td>
										<form action=./linkman.jsp>
										<INPUT TYPE="HIDDEN" NAME="action" VALUE="remitem">
											<table cellspacing="0" cellpadding="0">
												<tr>
												
														<%
														//Statement stmt2 = connection.createStatement();
														String qryb = "select itemid,itemshortname from survey_itemid where "+uidClause+" and lid="+rs.getString("lid");
														Statement stmtb = connection2.createStatement();
														ResultSet rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
															{
															%>																					
													<td>
														<INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("HTMLMAN_BUTTON_REMOVE_FROM")%>>
														<INPUT TYPE="HIDDEN" NAME="lid" VALUE="<%= rs.getString("lid") %>">
													</td>
													<td>
														<select name="itemid" size="4" multiple>								
															<%
															//Statement stmt2 = connection.createStatement();
															qryb = "select itemid,itemshortname from survey_itemid where "+uidClause+" and lid="+rs.getString("lid");
															//stmtb = connection.createStatement();
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	%>
																	<option value="<%= rsb.getString("itemid") %>"><%= rsb.getString("itemshortname") %>
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
															<td>
    														<%=Messages.getString("HTMLMAN_COLUMN_HEADING_5")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>
									
									<td>
										<form action=./linkman.jsp><INPUT TYPE="HIDDEN" NAME="action" VALUE="assitem">
											<table cellspacing="0" cellpadding="0">
												<tr>
													<td>
														<%
														//Statement stmt2 = connection.createStatement();
														qryb = "select itemid,itemshortname from survey_itemid where "+uidClause+" and (lid<>"+rs.getString("lid")+" or lid is null)" ;	
														//stmtb = connection.createStatement();
														rsb = stmtb.executeQuery(qryb);
														if (rsb.next())
														{
														%>																					
													<td>
														<INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("LINKMAN_BUTTON_APPLY_TO")%>:>
														<INPUT TYPE="HIDDEN" NAME="lid" VALUE="<%= rs.getString("lid") %>">
													</td>
													<td>															
														<select name="itemid" size="4" multiple>								
															<%
															//Statement stmt2 = connection.createStatement();
															qryb = "select itemid,itemshortname from survey_itemid where "+uidClause+" and (lid<>"+rs.getString("lid")+" or lid is null)" ;	
															//stmtb = connection.createStatement();
															rsb = stmtb.executeQuery(qryb);
															while (rsb.next()) 
																{
																	%>
																	<option value="<%= rsb.getString("itemid") %>"><%= rsb.getString("itemshortname") %>
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
															<td>
															<%=Messages.getString("LINKMAN_ALL_ASSIGNED")%>
															</td>
															<%
															}					
															%>
													</td>
												</tr>
											</table>
										</form>
									</td>	
									<td>
										<%
										if (rs.getString("isDefault").equals("1"))
										{
										%>
										&nbsp;&nbsp;<%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>			
										<%
										}
										else
										{
										%>
										<form action="./linkman.jsp">
											<INPUT TYPE="HIDDEN" NAME="lid" VALUE="<%= rs.getString("lid") %>">
											<INPUT TYPE="HIDDEN" NAME="action" VALUE="activate">
											<INPUT TYPE="submit" VALUE= <%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%>>
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
							<%
							int icnt = 0;
							qry = "select count(*) cnt from sur_return_links where "+uidClause;
							rs = stmt.executeQuery(qry);
							if (rs.next())
								icnt = rs.getInt("cnt");
							%>
							 <%=Messages.getString("INDEX_PAGE")%>:  
							<%
								aweval.pageCount(out, "./linkman.jsp?ipos=", ipos, icnt, pageCnt, itemPageSize);
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
							<table width=100%>
								<tr>
									<td>
										<%
										String actionString = "loadlink";
										String buttonValue = Messages.getString("LINKMAN_BUTTON_LOAD");
										String url = "";
										String linkText = "";
										if (action.equals("update"))
										{
										qry = "select url, refname from sur_return_links where "+uidClause+" and lid="+lid;
										rs = stmt.executeQuery(qry);
										if (rs.next())
											{
											url = rs.getString("url");
											linkText = rs.getString("refname");
											buttonValue = Messages.getString("LINKMAN_COLUMN_HEADING_2");
											actionString = "updatelink";
											}
										}

										%>
										<form name="load" action="./linkman.jsp" method="get">
										<input type="hidden" name="action" value="<%= actionString %>">
										<input type="hidden" name="lid" value="<%= lid %>">

                                         <SCRIPT language=JavaScript src="theme/survey.js"></SCRIPT>

										<table>
											<tr>
												<td>
													<b><%=Messages.getString("LINKMAN_LOAD_LINK")%>:</b>
												</td>
											</tr>
											<tr>
												<td>
													<label for="lt1"><%=Messages.getString("LINKMAN_LINK_TEXT")%>:</label>
												</td>
												<td>
													<input id="lt1" name="refname" type="text" value="<%= linkText %>" maxlength=60 size=45>
												</td>
											</tr>
											<tr>
												<td>
													<label for="l1"><%=Messages.getString("LINKMAN_LINK_URL")%>:<BR/>(http://www.ibm.com)</label> 
												</td>
												<td>
													<input id="l1" name="url" type="text"  value="<%= url %>" maxlength=256 size=45>
												</td>
											</tr>
											<tr>
												<td>
												<input type="hidden" name="urlmsg" value="<%=Messages.getString("JAVASCRIPT_ENTER")%> <%=Messages.getString("LINKMAN_LINK_URL")%>(http://www.ibm.com)">

													<input type="submit" value="<%= buttonValue %>:" onclick="return checkURLFormat(load);">
												</td>
											</tr>											
										</table>
										</form> 
									</td>
									<td>
										<form action="./linkman.jsp" method="get">						
										<input name="action" type="hidden" value="remlink">						
										<table>
											<tr>
												<td colspan=2>
													<b><label for="l2"><%=Messages.getString("LINKMAN_REMOVE_LINK")%>:</label></b>
												</td>
											</tr>										
											<tr>
												<td>
													<input type="submit" value=<%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%>:>
												</td>
												<td>
													<%
													String qryb = "select lid, refname from sur_return_links where "+uidClause;
													Statement stmtb = connection.createStatement();
													ResultSet rsb = stmtb.executeQuery(qryb);
													%>
													<select id="l2" name="lid" size="4" multiple>
													<%
													while (rsb.next()) 
														{
															%>
															<option value="<%= rsb.getString("lid") %>"><%= aweval.substrOrLess(rsb.getString("refname"),12) %>
															<%
														}				
													%>
													</select>													
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
				<!-- WorkPage end -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
connection.close();
connection2.close();
}
%>



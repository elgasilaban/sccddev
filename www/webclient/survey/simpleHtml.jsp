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

//System.err.println("\n arrivio in simpleHtml.jsp ----- \n");

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
	//String uidClause = "userid='"+uid+"' ";
	
    String uidClause = "userid like '%' ";

    String action = request.getParameter("action");

    if (action==null) 
    	{
		response.sendRedirect("./simpleHtml.jsp?action=&"+request.getQueryString());
    	}
   	
// -- upload
    if (action.equals("upload"))
    {
    if (aweval.authSimpleHtml(uid,request))
    	aweval.uploadSimpleHTML(request,uid);
    response.sendRedirect("./simpleHtml.jsp?action=&hid="+aweval.getHid());
    }
// -- remove HTML completely
	else if (action.equals("remove"))
    {
    if (aweval.authSimpleHtml(uid,request))
    	aweval.removeHTML(request,uid);
    response.sendRedirect("./simpleHtml.jsp?action=");
    }

	else 
	{
	String checked = "";	
	int cntr = 0;
	int lineLength = 6;
	String tint = "FFFFFF";
	String fonttint = "FFFFFF";											
	String color [] = {"00","33","66","99","CC","FF"};
	String pixelSize [] = {"10","25","50","100","150"};
	String fontSize [] = {"1","2","3","4","5"};
	String loopValue = "";
	Connection connection = aweval.getConnection();
	String qry = "";
	Statement stmt = connection.createStatement();
	ResultSet rs = null;


		String headcolor = request.getParameter("headcolor");
		if (headcolor == null)
			headcolor= "ffffff";
			
		String headsize = request.getParameter("headsize");
		if (headsize == null)
			headsize = "100";
	
		String barcolor = request.getParameter("barcolor");
		if (barcolor == null)
			barcolor= "ffffff";

		String barsize = request.getParameter("barsize");
		if (barsize == null)
			barsize = "10";

		String footcolor = request.getParameter("footcolor");
		if (footcolor == null)
			footcolor= "ffffff";

		String footsize = request.getParameter("footsize");
		if (footsize == null)
			footsize = "50";

		String bordersize = request.getParameter("bordersize");
		if (bordersize == null)
			bordersize = "1";

		String title = request.getParameter("title");
		if (title == null)
			title= "";
			
		String titlefont = request.getParameter("titlefont");
		if (titlefont == null)
			titlefont = "4";
	
		String subtitle = request.getParameter("subtitle");
		if (subtitle == null)
			subtitle= "";
			
		String subtitlefont = request.getParameter("subtitlefont");
		if (subtitlefont == null)
			subtitlefont = "3";
		
		String refname = request.getParameter("refname");
		if (refname == null)
			refname = "";
		
		String blurb = request.getParameter("blurb");
		if (blurb == null)
			blurb = "";
		blurb = aweval.substrOrLess(blurb,250);
		 
		String blurbcolor = request.getParameter("blurbcolor");
		if (blurbcolor == null)
			blurbcolor = "ffffff";

		String blurbfont = request.getParameter("blurbfont");
		if (blurbfont == null)
			blurbfont = "3";

		String link1 = request.getParameter("link1");
		if (link1 == null)
			link1 = "";

		String link1text = request.getParameter("link1text");
		if (link1text == null)
			link1text = "";

		String link2 = request.getParameter("link2");
		if (link2 == null)
			link2 = "";

		String link2text = request.getParameter("link2text");
		if (link2text == null)
			link2text = "";	

		String link3 = request.getParameter("link3");
		if (link3 == null)
			link3 = "";

		String link3text = request.getParameter("link3text");
		if (link3text == null)
			link3text = "";
			
		String hid = request.getParameter("hid");
		if (hid == null || hid.length() == 0)
			hid = "New:";
		else
			{
			qry = "select * from sur_simple_html where hid ="+hid;
			rs = stmt.executeQuery(qry);
			if (rs.next())
			{
				refname = rs.getString("refname");
				headcolor = rs.getString("headcolor");
				headsize = rs.getString("headsize");
				barcolor = rs.getString("barcolor");
				barsize = rs.getString("barsize");
				footcolor = rs.getString("footcolor");
				footsize = rs.getString("footsize");			
				title = rs.getString("title");
				titlefont = rs.getString("titlesize");
				subtitle = rs.getString("subtitle");
				subtitlefont = rs.getString("subtitlesize");
				blurb = rs.getString("blurb");
				blurbfont = rs.getString("blurbsize");	
				blurbcolor = rs.getString("blurbcolor");				
				link1 = rs.getString("link1");
				link1text = rs.getString("link1text");
				link2 = rs.getString("link2");
				link2text = rs.getString("link2text");
				link3 = rs.getString("link3");
				link3text = rs.getString("link3text");	
			}
		}
	String localTitle = Messages.getString("ITEMMAN_COLUMN_HEADING_4") + " "+ Messages.getString("SIMPLEHTML_TITLE1") +" " +Messages.getString("ITEMMAN_COLUMN_HEADING_4");
	%>
<!-- basic headers -->	
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

 <br/>
	<DIV align=left>
	   <H3><%= localTitle %></H3>
	</DIV>


	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					pageNav[0] ="Manage Surveys";
					pageNav[1] ="Upload HTML";
					pageNav[2] ="Manage HTML for Items";
					pageNav[3] ="Manage HTML for Surveys";					
					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./surveyman.jsp";
					pageNavTargets[1] ="./uploadman.jsp";
					pageNavTargets[2] ="./htmlman.jsp";
					pageNavTargets[3] ="./htmlman2.jsp";					

					
					//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>			</td>
		</tr>
		<tr>
			<td colspan=3>
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
						<td>
							<form name="html" action="./simpleHtml.jsp" method="get">				

<SCRIPT language=JavaScript src="theme/survey.js"></SCRIPT>

								<table>
									<tr>
										<td>
											<label for="n1"><%=Messages.getString("ITEMMAN_COLUMN_HEADING_4")%> <%=Messages.getString("SIMPLEHTML_REFERENCE")%> <%=Messages.getString("EDITSTANDARDSURVEY_NAME")%>:</label>
										</td>
										<td>
											<input id="n1" name="refname" type="text" maxlength="12" size="12" value="<%= refname %>">
										</td>
									</tr>
									<tr>
										<td>
											<table>
												<tr>
													<td>
														<label for="hc1"><%=Messages.getString("SIMPLEHTML_HEADER")%> <%=Messages.getString("SIMPLEHTML_COLOR")%>:</label>
													</td>
													<td>
														<select id="hc1" name="headcolor">
														<%
														for (int i = 0; i < color.length; i++)
															for (int j = 0; j < color.length; j++)
																for (int k = 0; k < color.length; k++)
																	{
																	tint = color[i]+color[j]+color[k];																										
																	checked = "";
																	if (headcolor.toUpperCase().equals(tint))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= tint %> 
																	<%
																	}
															%>
														</select>
													</td>
												</tr>
												<tr>
													<td>
														<label for="hs1"><%=Messages.getString("SIMPLEHTML_HEADER")%> <%=Messages.getString("SIMPLEHTML_SIZE")%> (<%=Messages.getString("SIMPLEHTML_PIXELS")%>):</label>
													</td>
													<td>
														<select id="hs1" name="headsize">
														<%
														for (int i = 0; i < pixelSize.length; i++)
															{
																	loopValue = pixelSize[i];
																	checked = "";
																	if (headsize.toUpperCase().equals(loopValue))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>
													</td>
												</tr>
											</table>	
										</td>
										<td>
											<table>
												<tr>
													<td>									
														<label for="sc1"><%=Messages.getString("SIMPLEHTML_SIDEBAR")%> <%=Messages.getString("SIMPLEHTML_COLOR")%>:</label>
													</td>
													<td>
														<select id="sc1" name="barcolor">
														<%
														for (int i = 0; i < color.length; i++)
															for (int j = 0; j < color.length; j++)
																for (int k = 0; k < color.length; k++)
																	{
																	tint = color[i]+color[j]+color[k];																										
																	checked = "";
																	if (barcolor.toUpperCase().equals(tint))
																		checked = "selected";
																	%>
																	<option <%= checked %>><%= tint %> 
																	<%
																	}
															%>
														</select>
													</td>
												</tr>
												<tr>
													<td>
														<label for="ss1"><%=Messages.getString("SIMPLEHTML_SIDEBAR")%> <%=Messages.getString("SIMPLEHTML_SIZE")%>(%):</label>
													</td>
													<td>
														<select id="ss1" name="barsize">
														<%
														for (int i = 0; i <= 20; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (barsize.toUpperCase().equals(loopValue))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>
													</td>																								
												</tr>
											</table>
										</td>
										<td>
											<table>
												<tr>
													<td>
														<label for="fc1"><%=Messages.getString("SIMPLEHTML_FOOTER")%> <%=Messages.getString("SIMPLEHTML_COLOR")%>:</label>
													</td>
													<td>
														<select id="fc1" name="footcolor">
														<%
														for (int i = 0; i < color.length; i++)
															for (int j = 0; j < color.length; j++)
																for (int k = 0; k < color.length; k++)
																	{
																	tint = color[i]+color[j]+color[k];																										
																	checked = "";
																	if (footcolor.toUpperCase().equals(tint))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= tint %> 
																	<%
																	}
															%>
														</select>
													</td>
												</tr>
												<tr>
													<td>
														<label for="fs1"><%=Messages.getString("SIMPLEHTML_FOOTER")%> <%=Messages.getString("SIMPLEHTML_SIZE")%> (<%=Messages.getString("SIMPLEHTML_PIXELS")%>):</label>
													</td>
													<td>
														<select id="fs1" name="footsize">
														<%
														for (int i = 0; i <= 40; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (footsize.toUpperCase().equals(loopValue))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>
													</td>																							
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td colspan=3>
											<hr>
										</td>
									</tr>				
									<tr>
										<td>
											<table border=0 width=100%>
												<tr>
													<td>
														<table>
															<%
															for (int i = 0; i < color.length; i=i+2)
																for (int j = 0; j < color.length; j++)
																	for (int k = 0; k < color.length; k++)
																		{												
																		tint = color[i]+color[j]+color[k];
																		fonttint = color[(i+4) % color.length]+color[(j+4) % color.length]+color[(k+4) % color.length];
																		if (cntr % lineLength == 0)
																		{
																		%>
																		<tr>
																		<%
																		}
																		%>
																		<TD WIDTH=20 ALIGN=left VALIGN=top BGCOLOR="#<%= tint %>">
																		<font size="2" color=\"<%= fonttint %>"><%= tint %></font>
																		</TD>														
																		<%
																		if (cntr % lineLength == lineLength - 1)
																		{
																		%>
																		</tr>
																		<%
																		}												
																		cntr++;
																		}							
															%>
														</table>
													</td>
												</tr>
											</table>
										</td>
										<td colspan=2>
											<table>
												<tr>
													<td>
														<label for="bw1"><%=Messages.getString("SIMPLEHTML_BORDER_WIDTH")%>:</label>
													</td>
													<td>
														<select id="bw1" name="bordersize">
														<%
														for (int i = 0; i <= 5; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (bordersize.toUpperCase().equals(loopValue))
																		checked = "selected";
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>												</td>
												</tr>											
												<tr>
													<td>
														<label for="tt1"><%=Messages.getString("SIMPLEHTML_TITLE")%> <%=Messages.getString("SIMPLEHTML_TEXT")%>:</label>
													</td>
													<td>
														<input id="tt1" name="title" type="text" maxlength="250" value="<%= title %>">
													</td>
												</tr>
												<tr>
													<td>
														<label for="tf1"><%=Messages.getString("SIMPLEHTML_TITLE")%> <%=Messages.getString("SIMPLEHTML_FONT")%> <%=Messages.getString("SIMPLEHTML_SIZE")%>:</label>
													</td>
													<td>
														<select id="tf1" name="titlefont">
														<%
														for (int i = 1; i <= 5; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (titlefont.toUpperCase().equals(loopValue))
																		checked = "selected";
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>												</td>
												</tr>
												<tr>
													<td>
														<label for="st1"><%=Messages.getString("SIMPLEHTML_SUBTITLE")%> <%=Messages.getString("SIMPLEHTML_TEXT")%>:</label>
													</td>
													<td>
														<input id="st1" name="subtitle" type="text"  maxlength="250" value="<%= subtitle %>">
													</td>
												</tr>
												<tr>
													<td>
														<label for="stf1"><%=Messages.getString("SIMPLEHTML_SUBTITLE")%> <%=Messages.getString("SIMPLEHTML_FONT")%> <%=Messages.getString("SIMPLEHTML_SIZE")%>:</label>
													</td>
													<td>
														<select id="stf1" name="subtitlefont">
														<%
														for (int i = 1; i <= 5; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (subtitlefont.toUpperCase().equals(loopValue))
																		checked = "selected";
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>												
													</td>
												</tr>
												<tr>
													<td>
														<label for="dt1"><%=Messages.getString("SIMPLEHTML_DESCRIPTION")%>  <%=Messages.getString("SIMPLEHTML_TEXT")%>:</label>
													</td>
													<td>
														<textarea id="dt1" name="blurb" cols="30" rows="3"><%= blurb %></textarea>
													</td>
												</tr>
												<tr>
													<td>
														<label for="dc1"><%=Messages.getString("SIMPLEHTML_DESCRIPTION")%>  <%=Messages.getString("SIMPLEHTML_COLOR")%>:</label>
													</td>
													<td>
														<select id="dc1" name="blurbcolor">
														<%
														for (int i = 0; i < color.length; i++)
															for (int j = 0; j < color.length; j++)
																for (int k = 0; k < color.length; k++)
																	{
																	tint = color[i]+color[j]+color[k];																										
																	checked = "";
																	if (blurbcolor.toUpperCase().equals(tint))
																		checked = "selected";
										
																	%>
																	<option <%= checked %>><%= tint %> 
																	<%
																	}
															%>
														</select>
													</td>
												</tr>
												<tr>
													<td>
														<label for="dfs1"><%=Messages.getString("SIMPLEHTML_DESCRIPTION")%> <%=Messages.getString("SIMPLEHTML_FONT")%> <%=Messages.getString("SIMPLEHTML_SIZE")%>:</label>
													</td>
													<td>
														<select id="dfs1" name="blurbfont">
														<%
														for (int i = 1; i <= 5; i++)
															{
																	loopValue = Integer.toString(i);
																	checked = "";
																	if (blurbfont.toUpperCase().equals(loopValue))
																		checked = "selected";
																	%>
																	<option <%= checked %>><%= loopValue %> 
																	<%
																	}
															%>
														</select>											
													</td>
												</tr>
												
												<input type="hidden" name="urlmsg" value="<%=Messages.getString("JAVASCRIPT_ENTER")%> <%=Messages.getString("LINKMAN_LINK_URL")%>(http://www.ibm.com)">

												<tr>
													<td>
														<label for="ld1"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 1  <%=Messages.getString("SIMPLEHTML_DESCRIPTION")%>:</label>
													</td>
													<td>
														<input id="ld1" name="link1text" type="text" maxlength="60" value="<%= link1text %>">
													</td>
												</tr>
												<tr>
													<td>
														<label for="l1"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 1  <%=Messages.getString("SIMPLEHTML_URL")%>:<BR/>(http://www.ibm.com)</label>
													</td>
													<td>
														<input id="l1" name="link1" type="text" maxlength="300" value="<%= link1 %>" onclick="return checkURLHTMLFormat(html);">
													</td>
												</tr>
												<tr>
													<td>
														<label for="ld2"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 2  <%=Messages.getString("SIMPLEHTML_DESCRIPTION")%>:</label>
													</td>
													<td>
														<input id="ld2" name="link2text" type="text" maxlength="60" value="<%= link2text %>">
													</td>
												</tr>
												<tr>
													<td>
														<label for="l2"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 2  <%=Messages.getString("SIMPLEHTML_URL")%>:<BR/>(http://www.ibm.com)</label>
													</td>
													<td>
														<input id="l2" name="link2" maxlength="300" type="text" value="<%= link2 %>" onclick="return checkURLHTMLFormat(html);">
													</td>
												</tr>
												<tr>
													<td>
														<label for="ld3"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 3  <%=Messages.getString("SIMPLEHTML_DESCRIPTION")%>:</label>
													</td>
													<td>
														<input id="ld3" name="link3text" type="text" maxlength="60" value="<%= link3text %>">
													</td>
												</tr>
												<tr>
													<td>
														<label for="l3"><%=Messages.getString("INDEX_COLUMN_HEADING_Link")%> 3  <%=Messages.getString("SIMPLEHTML_URL")%>:<BR/>(http://www.ibm.com)</label>
													</td>
													<td>
														<input id="l3" name="link3" type="text" maxlength="300" value="<%= link3 %>" onclick="return checkURLHTMLFormat(html);">
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td colspan=3>
											<hr>
										</td>
									</tr>									
									<tr>
										<td>
											<table>
												<tr>
													<td>
														<INPUT TYPE="HIDDEN" NAME="action" VALUE="upload">
														<label for="h1"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("UPLOADMAN_SAVE_AS")%>: onclick="return checkURLHTMLFormat(html);"></label>
													</td>
													<td>
														<select id="h1" name="hid">
															<%
															   qry = "select hid, refname from sur_simple_html where "+uidClause+" order by hid";
															   rs = stmt.executeQuery(qry);
															 %>
															<option value="New:"><%=Messages.getString("UPLOADMAN_NEW_HTML")%>:
															<%
															checked ="";
															while(rs.next())
															{
															checked = "";
															if (hid.equals(rs.getString("hid")))
																checked = "selected";																	
															%>
															  <option value="<%= rs.getString("hid") %>"  <%= checked %>>HTML-<%= rs.getString("hid")  + " ("+rs.getString("refname")+")" %>
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
											<FORM name=list ACTION="./htmlview.jsp"  METHOD="GET">
												<table>
													<tr>									
														<td>	
															<label for="h2"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("SIMPLEHTML_SHOW")%>:></label>
														</td>
														<td>
															
															<select id="h2" name="hid">
																<%
																qry = "select hid, refname from sur_simple_html where "+uidClause+" order by hid";
																rs = stmt.executeQuery(qry);									
																checked = "";
																while(rs.next())
																{
																checked = "";
																if (hid.equals(rs.getString("hid")))
																	checked = "selected";
																%>
																  <option value="<%= rs.getString("hid") %>" <%= checked %>>HTML-<%= rs.getString("hid") + " ("+rs.getString("refname")+")" %>
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
											<FORM name=list ACTION="./simpleHtml.jsp"  METHOD="GET">

							                    

												<table>
													<tr>									
														<td>	
															<label for="h3"><INPUT TYPE="SUBMIT" VALUE=<%=Messages.getString("INDEX_BUTTON_OPEN")%>:></label>
														</td>
														<td>
															
															<select id="h3" name="hid">
																<%
																qry = "select hid, refname from sur_simple_html where "+uidClause+" order by hid";
																rs = stmt.executeQuery(qry);									
																checked = "";
																while(rs.next())
																{
																checked = "";
																if (hid.equals(rs.getString("hid")))
																	checked = "selected";
																%>
																  <option value="<%= rs.getString("hid") %>" <%= checked %>>HTML-<%= rs.getString("hid") + " ("+rs.getString("refname")+")" %>
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
<!-- basic footers -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<!-- basic footers -->	
<%
	aweval.setLastPage("./simpleHtml.jsp?action=&hid="+hid);
	connection.close();
	}
%>



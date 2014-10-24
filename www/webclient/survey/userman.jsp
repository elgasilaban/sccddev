<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*"%>
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%

System.err.println("\n arrivo in userman.jsp ----- \n");

request.setCharacterEncoding("UTF-8");
boolean disp = true;
String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	if (!(ident.getUid().equals("admin")))
		{
		disp=false;
		aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
		ident.setMessage("You must be admin to manage users");
		response.sendRedirect("./login.jsp");
		}	
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	disp = false;
	aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
	ident.setMessage("You must login to use fiera");
	response.sendRedirect("./login.jsp");
	}
if (disp)
	{

String action = request.getParameter("action");
if (action == null)
	action = "def";
if (action.equals("delete"))
	{
		ident.deleteUser(request);
	    response.sendRedirect("./userman.jsp");	
	}
else if (action.equals("su"))
	{
		System.out.println("Change ID");
		ident.becomeUser(request);
	    response.sendRedirect("./index.jsp");	
	}	
%>	
<jsp:include page="/webclient/survey/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					pageNav[0] ="Register New User";
					pageNav[1] ="Update Admin Profile";
					
					String [] pageNavTargets = new String[2];
					pageNavTargets[0] ="./register.jsp";
					pageNavTargets[1] ="./profile.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
					
					String title = "User&nbsp;Management";
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
			<I><%= ident.getMessage() %></I>
			<%
			ident.setMessage("");
			%>
			</td>
		</tr>				
		<tr>
			<td height=240 align="center" valign="top">
				<!-- WorkPage end -->
				<%
				
				Connection connection = aweval.getConnection();
				Statement stmt = connection.createStatement();
			    String qry = ""; //Select item, itemid from survey_itemid order by item asc";
			    //ResultSet rs1 = stmt.executeQuery(qry);
			    ResultSet rs = null;
				
				int rowcnt = 0;
			    int itemPageSize = 5;	
			    int pageCnt = 5;		    
			    String stringIpos = request.getParameter("ipos");			           
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);

			    int questionPageSize = 10;			    
			    String stringQpos = request.getParameter("qpos");			           
			    int qpos = 0;
			    if (stringQpos != null)
			    	qpos = Integer.parseInt(stringQpos);
    				
    				    
			    %>		
				<table width=100%>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td width="20">
							&nbsp;
						</td>					
						<td  valign="top">
							<table border=1 width="100%">
							<%
						   	qry = "select userid ID, concat(lname,concat(', ',fname)) Name, case when length(Email)=0 then '---' else email end Email, concat('<a href=\"./adminProfile.jsp?uid=',concat(uid,'\">Edit</a>')) Edit, concat('<a href=\"./userman.jsp?action=delete&uid=',concat(uid,'\">Delete</a>')) Remove, concat('<a href=\"./userman.jsp?action=su&uid=',concat(uid,'\">Logon as</a>')) Logon from survey_user order by userid";
						   	stmt = connection.createStatement();
						   	rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr bgcolor="#9999ff">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										out.println("<th>"+rsmd.getColumnName(i)+"</th>");
									}
								
								%>
								</tr>
								<%
								rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
							
								while (rs.next())
								{
								if (rowcnt++ < qpos*questionPageSize || rowcnt > ((qpos+1)*questionPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%

								for (int i = 1; i <= colCount; i ++)
									{
									%>
									<td>
										<%= rs.getString(i) %>
									</td>
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
							&nbsp;
						</td>
						<td>
							Page: 
							<%
								aweval.pageCount(out, "./userman.jsp?qpos=", qpos, rowcnt-1, pageCnt, questionPageSize);
							%>
						</td>
					</tr>					
				</table>			
				<!-- WorkPage end -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
   connection.close();
   }
%>
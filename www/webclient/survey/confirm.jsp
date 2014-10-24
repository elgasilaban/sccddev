<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Enumeration"%>
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
request.setCharacterEncoding("UTF-8");
String actionYes = "";
String actionNo = "";
String actionMessage = "Are you sure?";
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
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";
			
	String action = request.getParameter("action");

if (action == null)
	action = "";
// -- remove HTML completely
if (action.equals("drop"))
    {
    if (ident.getUid().equals("admin"))
    	{
        //response.sendRedirect("<%= >");
        actionMessage = "Are you sure you want to delete the fiera tables?";
        actionYes = "./tableman.jsp"; //aweval.getActionYes();
        actionNo = "./tableman.jsp"; //actionNo = aweval.getActionNo();        
	    }
	else
		{
		aweval.setMessage("Not authorized for that action");
	    response.sendRedirect("./index.jsp");		
		}
    }
	{	
	String type = "U";

	String standard = request.getParameter("standard");
	
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	ResultSet rs = null;
	String qry = "";
	
	ResultSet rsLoad = null;
	String title = "Confirm&nbsp;Action";
%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[3];
					int activeTab = 1;
					pageNav[0] ="Upload new HTML";
					pageNav[1] ="Create Simple HTML";
					pageNav[2] ="Manage HTML for Surveys";
			
					String [] pageNavTargets = new String[3];
					pageNavTargets[0] ="./uploadman.jsp";
					pageNavTargets[1] ="./simpleHtml.jsp?action=";
					pageNavTargets[2] ="./htmlman2.jsp";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
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
			<td height=240 align="center">
				<table border="1">
					<tr>
						<td colspan="2"><%= actionMessage %></td>
					</tr>
					<tr>
						<td>
							<form action="<%= actionYes %>">
							<%
							    Enumeration paramNames = request.getParameterNames();
							    while(paramNames.hasMoreElements()) 
							    {
							      String paramName = (String)paramNames.nextElement();
							      String[] paramValues = request.getParameterValues(paramName);
							      if (paramValues.length == 1) 
							      {
							        String paramValue = paramValues[0];
							        if (paramValue.length() != 0)
							          {
							          %>
							          <input type="hidden" name="<%= paramName %>" value="<%= paramValue %>">          
							          <%
							          }
							      } 
							     else 
							      {
							        for(int i=0; i<paramValues.length; i++) 
							        {
							        %>
							          <input type="hidden" name="<%= paramName %>" value="<%= paramValues[i] %>">
							        <%
							        }
							      }
							    }
							%>						
							<input type="submit" value="Yes">
							</form>
						</td>
						<td>
							<form action="<%= actionNo %>">
							<input type="submit" value="No">
							</form>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<% 
stmt.close();
connection.close();
}
%>
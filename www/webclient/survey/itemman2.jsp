<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM
 
(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Collections,java.util.Arrays,java.util.Vector,com.ibm.tsd.pmcom.survey.Messages,java.util.ArrayList,java.util.List"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
//System.err.println("\n arrivio in itemman2.jsp ----- \n");
String databaseProductName = aweval.getDatabaseProductName();
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
	//String uidClause = " userid='"+uid+"' ";
	

    String uidClause = "userid like '%' ";

String action = request.getParameter("action");

//System.err.println("\n arrivio in itemman2.jsp ----- action = "+action);

if (action == null)
	action="";

if (action.equals("loaditem"))
	{
	    Connection conn = aweval.getConnection();
		Statement stm = conn.createStatement();
		String id = request.getParameter("id");
		String surveyAPPText = request.getParameter("surveyAPPText");
		ResultSet result11 = null;
		if(id != null)
		{
		   //Connection conn11 = aweval.getConnection();
  		    //Statement stm11 = conn11.createStatement();

		   try
			{
			   String qry = "Select itemid from survey_itemid where itemid like '%"+id+"'";
			   
			  /* if(surveyAPPText != null && !surveyAPPText.equals(""))
			   {
	   			   String qry1 = "select * from synonymdomain where domainid='SURVEYAPPLICATION' and lower(description) = '"+surveyAPPText.toLowerCase()+"'";

					result11 = stm11.executeQuery(qry1);
				    
			   }*/


			   ResultSet result = stm.executeQuery(qry);
			   

			   //if(result.next() || (result11 !=null && result11.next()))
			   if(result.next())
				{
				   //aweval.setUniqueMessage("The Survey ID OR Survey Application already exists, please enter unique Survey ID OR Survey Application");
				   aweval.setUniqueMessage(Messages.getString("ITEMMAN2_SURVEY_UNIQUESURVEY"));
				   response.sendRedirect("./itemman2.jsp");
				} else
				{
					aweval.loadItem(request,uid);
					//response.sendRedirect("./itemman2.jsp");
					response.sendRedirect("./index.jsp");
				}
			  } finally 
				{ 
				  stm.close();
				  conn.close();

				   //stm11.close();
			       //conn11.close();

				} 
		}
	}
else if (action.equals("remitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.removeItem(request);
	response.sendRedirect("./itemman2.jsp");
	}
else if (action.equals("assitem"))
	{
	if (aweval.authItem(uid,request) && aweval.authHtml(uid,request))
		aweval.assignHTMLToItems(request);
	response.sendRedirect("./itemman2.jsp");
	}
else if (action.equals("asssid"))
	{
	if (aweval.authItem(uid,request) && aweval.authSurvey(uid,request))
		aweval.assignSurveyToItems(request);
	response.sendRedirect("./itemman2.jsp");
	}
else if (action.equals("enableitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.enableItemSurvey(request);
	response.sendRedirect("./itemman2.jsp");
	}
else if (action.equals("disableitem"))
	{
	if (aweval.authItem(uid,request))
		aweval.disableItemSurvey(request);
	response.sendRedirect("./itemman2.jsp");
	}
else if (action.equals("loaddata"))
    {
   	aweval.loadItemBulk(request, uid);
    response.sendRedirect("./itemman2.jsp");
    }
	
else
	{
	aweval.setLastPage("./itemman2.jsp");
	//String title = "Item&nbsp;Management:&nbsp;Load&nbsp;Items";
	String title = Messages.getString("ITEMMAN_TITLE")+ ": " + Messages.getString("ITEMINFO_CREATE_NEW")+ " " + Messages.getString("INDEX_COLUMN_HEADING_Item");

%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%=title%></H3>
	</DIV>

	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					/*pageNav[0] ="Upload New HTML";
					pageNav[1] ="Create Simple HTML";
					pageNav[2] ="Create New Survey";
					pageNav[3] ="Enable Item Surveys";	*/				
                    
					pageNav[0] = Messages.getString("ITEMMAN_PAGENAV_1");
					pageNav[1] = Messages.getString("ITEMMAN_PAGENAV_2");
					pageNav[2] = Messages.getString("ITEMMAN_PAGENAV_3");
					pageNav[3] = Messages.getString("ITEMMAN_PAGENAV_4");

					
					String [] pageNavTargets = new String[4];
					pageNavTargets[0] ="./uploadman.jsp";
					pageNavTargets[1] ="./simpleHtml.jsp?action=";
					pageNavTargets[2] ="./editStandardSurvey.jsp";
					pageNavTargets[3] ="./itemman.jsp";						
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
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
				<!-- WorkPage end -->
				<%
				Connection connection = aweval.getConnection();
				Connection connection2 = aweval.getConnection();
				Connection connection3 = aweval.getConnection();
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

							<%= aweval.getUniqueMessage()%>
						</td>
					</tr>
					<tr>
						<td align="center">
							<table border="1">
								<tr abgcolor="#9999ff" class="headerbar">
									<th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;"><%=Messages.getString("ITEMINFO_CREATE_NEW")%> <%=Messages.getString("INDEX_COLUMN_HEADING_Item")%></th>
									<!--th class="text tabletitle " style="height:12px;padding-left:2px;padding-right:2px;;">Load items by input file:</th-->
								</tr>							
								<tr>
									<td>
										<form name="load" action="itemman2.jsp" method="get">

										<SCRIPT language=JavaScript src="theme/survey.js"></SCRIPT>

										<%

										String surveyName = Messages.getString("INDEX_JAVASCRIPT_SURVEYNAME");
										String surveyShortName = Messages.getString("INDEX_JAVASCRIPT_SURVEYSHORTNAME");
										String surId = Messages.getString("INDEX_JAVASCRIPT_SURID");

										%>

										<input type="hidden" name="surveyName"  value ="<%= surveyName %>">
										<input type="hidden" name="surveyShortName"  value ="<%= surveyShortName %>">
										<input type="hidden" name="surId"  value ="<%= surId %>">

										
										<input type="hidden" name="action" value="loaditem">
										<table>
											<tr>
												<td>
													<%=Messages.getString("ITEMMAN2_SURVEY_NAME")%>:
												</td>
												<td>
													<input name="item" type="text" maxlength=256 size=30>
												</td>
											</tr>
											<tr>
												<td>
													<%=Messages.getString("ITEMMAN2_SURVEY_SHORT_NAME")%>:
												</td>
												<td>
													<input name="shortname" type="text" maxlength=32 size=25>
												</td>
											</tr>
											<tr>
												<td>
													<%=Messages.getString("ITEMMAN2_SURVEY_ID")%>:
												</td>
												<td>
													<input name="id" type="text" maxlength=30 size=25>
												</td>									
											</tr>
                                             
											 <tr>
												<td>
													<%=Messages.getString("ITEMMAN2_SURVEY_APP")%>:
													<!--br/>(<%=Messages.getString("ITEMMAN2_SURVEY_ORAPP")%>)-->
												</td>
												<td>  
													 <select name="surveyAPP">
													 <!--%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%-->
													 <!--option value="DefaultBlank"></option-->
													 <option value="Default"><%=Messages.getString("LINKMAN_COLUMN_HEADING_5")%></option>

														<%
												
               											Statement stmtc = connection2.createStatement();
											   //String qryc = "select module,description from maxmodules order by description ";
											   
											  /* on 8/27/2009 changed bellow
											  String qryc = "select maxvalue, value,description from synonymdomain where domainid = 'SURVEYAPPLICATION' order by description ";*/

											  String qryc = " select app,description from maxapps order by description ";



					    						//System.err.println("\n arrivio 222aaaaa in itemman2.jsp ----- qryc = "+qryc);
                                               
											   //Check Survey application pmps is in MaxVars table
											   
												 
												Statement stmtc1 = connection2.createStatement();

                                                   
													ResultSet rsultset = stmtc.executeQuery(qryc);		
													while(rsultset.next())
												    {
														 String domain_appValue = rsultset.getString("app");

														 //System.err.println("\n arrivio 222aaaaa in domain_appValue = "+domain_appValue);

														 //Now-- ResultSet rs2 = stmtc1.executeQuery("select * from maxvars where varname like '%"+domain_appValue+"%'");
														//Now-- if(rs2.next()) 
														{
															%>
															<option value="<%=domain_appValue%>"><%=rsultset.getString("description")%>(<%=domain_appValue%>)
															</option>

															 <%
														 }

												     }


                                                  %>
                                                 </select>

												 <!--br/>
													
													 <input name="surveyAPPText" type="text" maxlength=30 size=25-->

 
												</td>									
											</tr>

											<tr>
												<td>
													<input type="submit" value=<%=Messages.getString("SURVEY_SUBMIT")%> onclick="return validateSurvey(load);">
												</td>
											</tr>								
										</table>
										</form>
									</td>
									<!--td valign="top">					
										<form name="encform" enctype="multipart/form-data"	action="itemman2.jsp?action=loaddata" method="post">			
										<table cellspacing=5 border=0  width=100%>						
											<tr>
												<td>
													<input id="h1" type="FILE" name="inputdata" size="30" maxlength="255" >
												</td>
											</tr>
											<tr>
												<td>
													<table>
														<tr>
															<td>
																<INPUT TYPE="HIDDEN" NAME="action" VALUE="upload">
																<label for="h2"><INPUT TYPE="SUBMIT" VALUE="Load:"></label>
															</td>
														</tr>
													</table>	
												</td>
											</tr>
										</table>
										</form>								
									</td-->
								</tr>
							</table>
			
				<!-- WorkPage end -->
						</td>
					</tr>
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
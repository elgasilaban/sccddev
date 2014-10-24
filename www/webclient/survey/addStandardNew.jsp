<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->

<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Vector,com.ibm.tsd.pmcom.survey.Messages"%>

<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />

<%
//System.err.println("\n arrivio in addstandardNew.jsp ----- \n");
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
	String uidClause = "userid='"+uid+"' "; 
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";
	// Decision here is if admin should see everything.
	// The answer is yes, but not all at once since the data for multiple users gets confusing.
	// instead we allow that admin can switch to another user.
	String action = request.getParameter("action");
	
	//System.err.println("\n arrivio in addstandardNew.jsp ----- action = "+action);

	if (action==null)
		action = "";


	if (action.equals("add")) 
	   	{
	   		if (aweval.authItem(uid,request))
	   			aweval.addQuestion(request,uid);
		   	response.sendRedirect(aweval.getNextPage());
	   	}
    else if (action.equals("update")) 
	   	{ 
	   		if (aweval.authQuestion(uid,request))
			   	aweval.updateQuestion(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	} 
    else if (action.equals("remove"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.removeAnswer(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}     
   	
    else if (action.equals("publish"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.publishQuestion(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}     
    else if (action.equals("activate")) 
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.activateQuestion(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}     
    else if (action.equals("deactivate"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.deactivateQuestion(request);
		   	response.sendRedirect(aweval.getNextPage());		   	
	   	}
    else if (action.equals("up"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerUp(request);
		   	response.sendRedirect(aweval.getNextPage());	   	
	   	} 
    else if (action.equals("down"))
	   	{
	   		if (aweval.authQuestion(uid,request))
		   		aweval.moveAnswerDown(request);
		   	response.sendRedirect(aweval.getNextPage());
	   	}
	else
		{

	aweval.assistStandard(request);
	
    String type = aweval.getType();
    String itemid = aweval.getItemid();
    String standard = aweval.getStandard();
		
	int maxAnswers = 15;
	String maxAnswersString =  request.getParameter("acnt");
	if (maxAnswersString != null)		
		maxAnswers = Integer.parseInt(maxAnswersString);

	Vector questionType = new Vector();
	Vector questionTypeVal = new Vector();
	questionType.add(Messages.getString("ADDSTANDARDNEW_RADIO")); 
	questionTypeVal.add("R");
	questionType.add(Messages.getString("ADDSTANDARDNEW_SINGLE_PULL"));
	questionTypeVal.add("Q"); 	
	questionType.add(Messages.getString("ADDSTANDARDNEW_CHECKBOX"));
	questionTypeVal.add("M");
	questionType.add(Messages.getString("ADDSTANDARDNEW_MULTI_PULL"));
	questionTypeVal.add("P");	
//	questionType.add("Satisfaction");
//	questionTypeVal.add("S");
	questionType.add(Messages.getString("ADDSTANDARDNEW_FREEFORM"));
	questionTypeVal.add("F");
	questionType.add(Messages.getString("ADDSTANDARDNEW_STATEMENT"));
	questionTypeVal.add("J");
	
	Connection connection = aweval.getConnection();

	String title = Messages.getString("ADDSTANDARDNEW_ADDA");
%>
<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>

    <br/>
	<DIV align=left>
	   <H3><%=Messages.getString("ADDSTANDARDNEW_TITLE")%>: <%= title %> <%= standard + " "%> <%=Messages.getString("ADDSTANDARDNEW_QUESTION")%></H3>
	</DIV>


	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[2];
					int activeTab = 1;
					/*pageNav[0] ="Work with Item Questions";
					pageNav[1] ="Work with Standard Questions";
					pageNav[2] ="Work with Archived Questions";*/
					//pageNav[2] ="alphaWorks";
					//pageNav[3] ="newtab";
					//pageNav[0] = Messages.getString("ADDSTANDARDNEW_PAGENAV_1");
					pageNav[0] = Messages.getString("QUESTIONMAN_PAGENAV_1");
					pageNav[1] = Messages.getString("QUESTIONMAN_PAGENAV_3");

					
					String [] pageNavTargets = new String[2];
					//pageNavTargets[0] ="./itemman.jsp";
					pageNavTargets[0] ="./standardQuestions.jsp";
					pageNavTargets[1] ="./archivedQuestions.jsp";
										
					//pageNavTargets[2] ="./evalreport.jsp?dtype=all";
					//pageNavTargets[3] ="./evalreport.jsp?dtype=all";
					
					//aweval.pageNav(out, pageNav, pageNavTargets, activeTab);
				%>
			</td>
		</tr>
<%
        //String techName = "";
        //int file_max = 0;
        Statement stmt2 = connection.createStatement();
        ResultSet rsLoad = null;
       	int answerCnt = 0;
        String question = "";
        String [] answers = new String[maxAnswers];
    	for (int i = 0; i < maxAnswers; i++)
    		answers[i] = "";
        String style ="R";

        //action= Messages.getString("ADDSTANDARDNEW_BUTTON_ADD");
		action="add";

		String qid = request.getParameter("qid");
		if (qid == null)
			qid = "Standard";
        int maxAnswer = 0;		

        if (request.getParameter("action") != null && request.getParameter("action").equals("load"))
	        {
    	        /*System.err.println("\n 1111 arrivio in addstandardNew.jsp ----- MoreAns = "+request.getParameter("MoreAns"));
				if (request.getParameter("MoreAns") != null && request.getParameter("MoreAns").equals("MoreAns"))
				{

					 if (aweval.authQuestion(uid,request))
			   	        aweval.updateQuestion(request);
				}*/
			   
	        String qryLoad ="select question, style, (select count(*) from sur_quest_answer where qid = "+request.getParameter("qid")+") from survey_questions where qid = "+request.getParameter("qid");
//System.err.println("\n 1111 arrivio in addstandardNew.jsp ----- qryLoad = "+qryLoad);
	        rsLoad = stmt2.executeQuery(qryLoad);
	        if (rsLoad.next())
	        	{
	            question=rsLoad.getString("question").trim();
	            style = rsLoad.getString("style");

				if(question.startsWith("clone"))
					question = Messages.getString("SURVEYMAN_BUTTON_CLONE") + ": "+ question.substring(7,question.length());
								  
	            }
	        //action=Messages.getString("LINKMAN_COLUMN_HEADING_2");
			action="update";

	        title = Messages.getString("ADDSTANDARDNEW_UPDADEA");

	        String qry = "Select count(*) cnt from sur_quest_answer where qid = "+ request.getParameter("qid");
	        rsLoad = stmt2.executeQuery(qry);
	        if (rsLoad.next())
	        	{
	        	maxAnswer = rsLoad.getInt("cnt");
	        	}
	        String qryLoad2 = "Select * from sur_quest_answer where qid = "+ request.getParameter("qid") + " order by ordered";

//System.err.println("\n 2222 arrivio in addstandardNew.jsp ----- qryLoad2 = "+qryLoad2);

	        rsLoad = stmt2.executeQuery(qryLoad2);
	        }	        
        %>
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
				<!-- Workspace Begin -->        
     		<table>
        			<tr>
        				<td>
        					<form name="addStandardNew" action="./addStandardNew.jsp" method="get">  

							<SCRIPT language=JavaScript src="theme/survey.js"></SCRIPT>

					        <input type="hidden" name="action"  value ="<%= action %>">
				    	    <input type="hidden" name="itemid"  value ="<%= itemid %>">
				        	<input type="hidden" name="qid"  value ="<%= request.getParameter("qid") %>">
           					
        						<table>
        							<tr>
				        				<td >
				        					<label for="q1"><%=Messages.getString("ADDSTANDARDNEW_QUESTION")%>:</label>
				        				</td>
				        				<td>
				        					<textarea id="q1" name="question" rows=6 cols=30><%= question %></textarea>
				        				</td>
				        			</tr>
				        			
									<%
								if (style.equals("R") || style.equals("M") || style.equals("P") || style.equals("Q") )
								{
								    while (rsLoad != null && rsLoad.next())
								    {
								    answerCnt++;
									%>
							        <tr> 
							        	<td>
							        		<%=Messages.getString("ADDSTANDARDNEW_ANSWER")%> <%= answerCnt %>
							        	</td>
							        	<td>
							        		<input type="text"  name="answer<%= answerCnt %>" value="<%= aweval.replaceTag(rsLoad.getString("answer").trim(),"\"","&quot;") %>" size="40" maxlength="65">
							        	</td> 
 							        	<td><a href="./addStandardNew.jsp?action=remove&aid=<%= rsLoad.getString("aid") %>"><%=Messages.getString("ITEMMAN_BUTTON_REMOVE")%></a></td>
 							        	<%
 							        	if (answerCnt == 1 && maxAnswer > 1)
 							        		{
 							        		%>
 							        		<td>&nbsp;</td><td><a href="./addStandardNew.jsp?action=down&aid=<%= rsLoad.getString("aid") %>"><%=Messages.getString("VIEWQUESTION_MOVE_DOWN")%></a></td>
 							        		<%
 							        		}
 							        	else if (answerCnt == 1 && maxAnswer == 1)
 							        		{
 							        		%>
 							        		<td>&nbsp;</td><td>&nbsp;</td>
 							        		<%
 							        		}
 							        	else if (answerCnt == maxAnswer)
 							        		{
 							        		%>
 							        		<td><a href="./addStandardNew.jsp?action=up&aid=<%= rsLoad.getString("aid") %>"><%=Messages.getString("VIEWQUESTION_MOVE_UP")%></a></td><td>&nbsp;</td>
 							        		<%
 							        		}
 							        	else 
 							        		{
 							        		%>
 							        		<td><a href="./addStandardNew.jsp?action=up&aid=<%= rsLoad.getString("aid") %>"><%=Messages.getString("VIEWQUESTION_MOVE_UP")%></a></td><td><a href="./addStandardNew.jsp?action=down&aid=<%= rsLoad.getString("aid") %>"><%=Messages.getString("VIEWQUESTION_MOVE_DOWN")%></a></td>
 							        		<%
 							        		}
 							        	%>
 							        	      	
							        </tr>
									<%
									}
									if (answerCnt > maxAnswers)
										maxAnswers=answerCnt;									
								    while (answerCnt < maxAnswers)
				        			{
				        			answerCnt++;
									%>
				        			<tr>
				        				<td>
				        					<label for="a<%= answerCnt %>"><%=Messages.getString("ADDSTANDARDNEW_ANSWER")%> <%= answerCnt %></label>
				        				</td>
				        				<td>
				        					<input type="text" id="a<%= answerCnt %>" name="answer<%= answerCnt %>" value="" size="40" maxlength="40">
				        				</td>    				
				        			</tr>
									<%
									}
								}
									%>



                                    <tr><td>&nbsp;</td></tr>


                                     <tr>
				        				<td colspan=2>
				        					<table>
				        						<tr>
							        				<td>
							        					<label for="s1"><%=Messages.getString("ADDSTANDARDNEW_QUESTION_STYLE")%>:</label>
							        				</td>
							        				<td>
							        					<select id="s1" name="style">
							        					<%
							        					String checked = "";
							        					for (int i = 0; i < questionType.size(); i++)
							        						{
							        						checked = "";
							        						if (questionTypeVal.get(i).equals(style))
							        							checked = " selected ";
							        						%>
							        						<option value="<%= questionTypeVal.get(i) %>" <%= checked %>><%= questionType.get(i) %>
							        						<%
							        						}
							        					%>       						        						        						
							        					</select>
							        				</td>
							        				<td>
													<%
														String addORupdate = (!action.equals("") && action.equals("add")) ? Messages.getString("ADDSTANDARDNEW_BUTTON_ADD") : Messages.getString("LINKMAN_COLUMN_HEADING_2");

											//String jsMessage = Messages.getString("JAVASCRIPT_ENTER")+" "+Messages.getString("JAVASCRIPT_SMALL")+" "+Messages.getString("QUESTIONMAN_COLUMN_HEADING_Question");

											String jsMessage = Messages.getString("JAVASCRIPT_ENTER");

											


												%>
												<input type="hidden" name="jsMessage"  value ="<%= jsMessage %>">
							        					<input type="submit" value="<%= addORupdate %>" onclick="return checkQuestionLength(question.value.length,addStandardNew);" >
							        				</td>
							        			</tr>
							        		</table>
							        	</td>
				        				<%
	       								if (!qid.equals("Standard") && (style.equals("R") || style.equals("M") || style.equals("P") || style.equals("Q") ))
										{
										%>
										<td>
											<a href="./viewQuestion.jsp?qid=<%= qid %>"><%=Messages.getString("ITEMMAN_BUTTON_PREVIEW")%></a>
										</td>
										<%
										}
				        				%>			        											        	
							        </tr>

					        	</table>
			        		</form>				        	
				        </td>
					</tr>


					<%
				if (style.equals("R") || style.equals("M") || style.equals("P") || style.equals("Q") )
					{
					if (request.getParameter("qid")!=null)
					{
						if(maxAnswers < 10)
						{ 
							%>					
							<tr>
								<td>
									<form action="./addStandardNew.jsp">
									<input type="hidden" name="qid"  value="<%= request.getParameter("qid")  %>" >
									<input type="hidden" name="acnt"  value="<%= (maxAnswers+12) %>" >
									<input type="hidden" name="action"  value="load" >        					
									<input type="hidden" name="MoreAns"  value="MoreAns" >
										<table>
											<tr>
												<td>  
													<input type="submit" value="More Answers">
												</td>				
											</tr> 
										</table>
									</form> 				        		
								<td>      		
							</tr>
							<%
						}
        			}
        			}
        			%> 
        		</table>
				<!-- Workspace End -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
<%
connection.close();
}
%>
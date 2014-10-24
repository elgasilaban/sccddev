<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.util.*,java.sql.*,com.ibm.tsd.pmcom.survey.Messages"%>


<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<%


	request.setCharacterEncoding("UTF-8");
	String itemid = request.getParameter("itemid");
	    //System.err.println("\n  arrivio in survey.jsp ----- aweval.isPublicItem(itemid) =   "+aweval.isPublicItem(itemid));

	if (!aweval.isPublicItem(itemid))
		{
		//response.sendError(response.SC_NOT_FOUND);
		//response.sendError("The Survey is not published. Go to Survey summery and click Item to publish Survey");
		aweval.setMessage(Messages.getString("SURVEY_NOT_PUBLISHED1") + " <br/><br/><b>  " + Messages.getString("SURVEY_NOT_PUBLISHED2") + "</b>");
		%>
		   <h2>Maximo Survey </h2>
		    <br/><br/><i><%= aweval.getMessage() %></i>
		<%
		aweval.setMessage("");	

		return;
		}

	String recordClass = request.getParameter("recordclass");
	String recordKey = request.getParameter("recordkey");

	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	String databaseProductName = aweval.getDatabaseProductName();
	
	String hid = "";
	String query = "";
	ResultSet rs = null;
	
	boolean rsloaded = false;
	
	String sid = aweval.getSurveyID(request);
	if (sid == null)  //Then the default Survey has not been set.
		{
		aweval.setMessage("A survey has not been set");
		connection.close();
		response.sendRedirect("./index.jsp");
		}
	
	String html[] = aweval.getHtml(request);
	String header = html[0];
	String footer = html[1];

	 //System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 000 header@@@@@ = "+header);

   /*System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 000 header11111 = "+header.indexOf("le>"));
      System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 000 header1111 = "+header.lastIndexOf("</title>"));
	System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 000 header1111 = "+header.substring(header.indexOf("le>"),header.lastIndexOf("</title>")));*/


String header1 = header.substring(0,header.indexOf("le>")+3);
String header2 = header.substring(header.indexOf("</title>"),header.length());

header = header1 + Messages.getString("FIERAHEADER_MAXIMO_SURVEY") + header2;


	//header.substring(0,

    if (itemid == null)
    	itemid = "000";

    query = "Select item, itemshortname, userid from survey_itemid where itemid='"+itemid+"'";
	String uid="";
    String item = "";
    String shortName = "";
   // System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 000 header = "+header);

    if (!itemid.equals("000"))	
    	{
        //java.sql.Statement stmt2 = connection.createStatement();
        rs = stmt.executeQuery(query);
        if (rs.next())
        	{
        	item = rs.getString("item");
        	shortName = rs.getString("itemshortname");
        	uid = rs.getString("userid");
            }
        else
            {
            item = "Standard";
            shortName = "standard";
            }
        }
	String title = item + " Feedback Form";

	//Write the HTML


		out.println(aweval.replaceTag(aweval.replaceTags(uid, header),"<itemname>",item));
		int qsize = 450;
		query = "select qsize from survey_surveys where sid="+sid;
		
		rs = stmt.executeQuery(query);
		if (rs.next())
			qsize = rs.getInt("qsize");

	    //System.err.println("\n  arrivio in survey.jsp ----- REACHING HERE 1111" );

		%>
<link rel="stylesheet" type="text/css" href="../css/maximo.css"/>
		<link rel="stylesheet" type="text/css" href="theme/survey.css"/>


		<form name="eval1" action="./processEval2.jsp" method="post">
			<input type="hidden" name="sid" value="<%= sid %>">			

			<input type="hidden" name="recordClass" value="<%= recordClass %>">			
			<input type="hidden" name="recordKey" value="<%= recordKey %>">			

			<!-- questions table -->
			<table border="0" cellspacing="0" cellpadding="3" width="100%">
			    <tr>
			    	<td width="50">
			    		<img alt="" width="50" height="1" src="./images/clear.gif\" />
			    	</td>
			    	<td width="<%= qsize %>">
			    		<img alt="" width="<%= qsize %>" height="1" src="./images/clear.gif" />
			    	</td>
			    	<td width="100%">
			    		<img alt="" width="100%" height="1" src="./images/clear.gif" />
			    	</td>




			    </tr>	


					<%
					//Pre Item Specific Questions
		        	int cntQ = 0;
		        	//String satQryGlobal = "select qid, order from aweval.eval_survey_questions where sid = "+sid+" and qid in (select qid from survey_questions where style = 'S') order by order";
					//venkyg : it's for db2
                    //String satQryGlobal = "select qid, order from sur_sur_question where sid = "+sid+" and //qsection='A' order by order";

					String satQryGlobal = "select qid, ordered from sur_sur_question where sid = "+sid+" and qsection='A' order by ordered";

                    //System.err.println("\n  arrivio in survey.jsp -111111 DISPLAYING QUESTION----  satQryGlobal = "+satQryGlobal);

					ResultSet rs1Global = stmt.executeQuery(satQryGlobal);
					while (rs1Global.next())
					{
					cntQ++;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out, item, sid);
					}
					//Item Specific Satisfaction Questions
					String satQryTech = "select qid from sur_itemquestion where itemid = '"+itemid+"' and qid in (select qid from survey_questions where active = 'A' and type='U') order by ordered";

                    //System.err.println("\n  arrivio in survey.jsp -----  satQryTech = "+satQryTech);

					rs1Global = stmt.executeQuery(satQryTech);
					int newCnt = cntQ;
					while (rs1Global.next())
					{
					cntQ++;
					newCnt = cntQ + 1;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out, item, sid);
					}
					//Post Item Specific Questions
		        	String satQryPost = "select qid, ordered from sur_sur_question where sid = "+sid+" and qsection='B' order by ordered";					
					rs1Global = stmt.executeQuery(satQryPost);
					int postCnt = cntQ;
					while (rs1Global.next())
					{
					cntQ++;
					postCnt = cntQ + 1;
					aweval.displayQuestion(rs1Global.getString("qid"), cntQ, out, item, sid);
					}
					
					%>
			</table>
			<%
				
				String qry = "select identity from survey_surveys where identity='1' and sid="+sid;

				if(databaseProductName != null && databaseProductName.startsWith(aweval.oracleProductName))
				{
					//it's for oracle : venkyg
					qry = "select identity from survey_surveys where identity='1' and sid="+sid;
																			
				} else
				if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
				{
				   //it's for db2 : venkyg
				   qry = "select identity from survey_surveys where identity='1' and sid="+sid;
												
				} else
				{
					qry = "select identity1 from survey_surveys where identity1='1' and sid="+sid;
				}



				rs = stmt.executeQuery(qry);
				if (rs.next())
				{
				String bgcolor = "#000000";	
				if (cntQ++ % 2 == 0)
					bgcolor = "#FFFFFF"; 
				else
					bgcolor = "#EEEEEE"; 
				%>	
				<table cellpadding="3" cellspacing="0" width="100%"	>
					<!--tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr-->

					<tr abgcolor="<%= bgcolor %>"  class="tablerow">
						<td  class="toggleselectrows" noWrap colspan="5">
							&nbsp; 
						</td>
					</tr>	

					<tr bgcolor="<%= bgcolor %>">
						<td width="60">
							<img alt="" width="60" height="1" src="./images/clear.gif" />
						</td>					
						<td align="right">
							<%=Messages.getString("SURVEY_FIRST_NAME")%>:
						</td>
						<td>
							<input type="text" name="fname" maxlength="40" size="20">
						</td>
						<td  align="right">
							<%=Messages.getString("SURVEY_LAST_NAME")%>:
						</td>
						<td>
							<input type="text" name="lname" maxlength="60" size="20">
						</td>						
					</tr>
					<tr bgcolor="<%= bgcolor %>">
						<td width="20"><img alt="" width="1" height="1" src="./images/clear.gif" />
							&nbsp;
						</td>
						<td align="right">
							<%=Messages.getString("SURVEY_EMAIL")%>:
						</td>
						<td>
							<input type="text" name="email" maxlength="100" size="20">
						</td>
						<td align="right">
						<%=Messages.getString("SURVEY_COMPANY")%>:
						</td>
						<td>
							<input type="text" name="company" maxlength="100" size="20">
						</td>											
					</tr>
					
					<tr abgcolor="<%= bgcolor %>"  class="tablerow">
						<td  class="toggleselectrows" noWrap colspan="5">
							&nbsp;
						</td>
					</tr>	
					
					<!--tr bgcolor="<%= bgcolor %>">
						<td colspan="5">
							<hr>
						</td>
					</tr>	
					

<TR class="tablerow">
     <TD class="toggleselectrows" noWrap colSpan=100>
	    <DIV>&nbsp;</DIV>
	 </TD>
</TR-->

				</table>
				<%
				}
			%>
			<center>
				<table>
		    		<tr>
		    			<td colspan=9 align="center">
		    				<input type="submit" value=							<%=Messages.getString("SURVEY_SUBMIT")%>>
		    			</td>
		    		</tr>
		    		<input type="hidden" name="itemid" value="<%= request.getParameter("itemid") %>">
		    	</table>
	    	</center>
    	</form>

<%= footer %>
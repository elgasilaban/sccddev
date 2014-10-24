<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->

<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.text.*,java.util.*,java.lang.*,java.sql.*,java.util.Calendar,java.util.Date,javax.sql.*"%>
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />

<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
request.setCharacterEncoding("UTF-8");
boolean disp = true;

String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	userMessage = ident.getFirstName()+" "+ident.getLastName();
	}
else
	{
	disp = false;
	aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
	ident.setMessage("You must login to use fiera");
	response.sendRedirect("./login.jsp");
	}
	if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");
if (disp)
{

	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";
	
//Page Functional Requirements and Controls

	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
    String qry = "";
    ResultSet rs = null;
 
	String action = request.getParameter("action");
	if (action == null) 
		action = "";
	if (action.equals("sample"))
		{
			aweval.setMessage("Sample data");
			Vector sql = new Vector();

			//Create an HTML for the sample
			sql.addElement("insert into survey_html (header, footer, createtime, headerfile, footerfile, refname, uid)  " + 
			"values ('<html><head> <title>Maximo Survey</title></head><body>  " + 
			"<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"1\">  <tr>   <td height=\"100\" bgcolor=\"#66FFCC\"> " + 
			"<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">     <tr>      <td align=\"center\">        " + 
			"<font size=\"4\"> You''re Sweet Chocolates</font>      </td>     </tr>     <tr>       " + 
			"<td align=\"center\">       <font size=\"3\">A Taste of Variety</font>      </td>           " + 
			"</tr>    </table>   </td>  </tr>  <tr>   <td>    <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">  " + 
			"<tr>      <td bgcolor=\"#6633FF\" width=\"8%\">             </td>      <td>         " + 
			"<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">         <tr>            " + 
			"<td align=\"center\"  bgcolor=\"#CCCCFF\">			 " + 
			"<font size=\"4\">Thank you for providing feedback for <b><itemname></b>.   " + 
			"Your evaluations will help us to improve our products.</font>            " + 
			"</td>         </tr>        <tr>         <td align=\"center\">','				 " + 
			"</td>					</tr>				</table>                " + 
			"</td>               </tr>              </table>			</td>		</tr>  		 " + 
			"<tr>   	 <td bgcolor=\"#66FF33\" height=\"10\">    	  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"> " + 
			"<tr>      	    <td align=\"center\">           <a href=\"http://www.alphaworks.ibm.com\"> " + 
			"Brand-new sweets</a>           </td>      	    <td align=\"center\">            " + 
			"<a href=\"http://www.ibm.com/developerworks\">Recipes for all occasions</a>           </td> " + 
			"</tr>         </table>		 </td>		</tr>	</table></body></html>' " + 
			",'1970-01-01 00:00:01.000','simple','simple','fierasample1','"+uid+"') ");
			
			//Create the simple-HTML for the html for the sample
			sql.addElement("insert into aweval.eval_simple_html (hid,refname, headcolor,headsize,barcolor,barsize,title,  " + 
			"titlesize,subtitle,subtitlesize, blurb, blurbsize, blurbcolor,link1,link1text, " + 
			"link2,link2text,link3,link3text,footcolor,footsize,bordersize,uid)   " + 
			"values  " + 
			"((select hid from survey_html where uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'), " + 
			"'fierasample1','66FFCC',100,'6633FF',8,'You''re Sweet Chocolates',4, " + 
			"'A Taste of Variety',3,'Thank you for providing feedback for <b><itemname></b>.   " + 
			"Your evaluations will help us to improve our products.',4,'CCCCFF', " + 
			"'http://www.alphaworks.ibm.com','Brand-new sweets','http://www.ibm.com/developerworks', " + 
			"'Recipes for all occasions','','','66FF33',10,1,'"+uid+"') ");
			
			//Create 4 standard questions and 3 Item questions for the sample (2 are drafts)
			sql.addElement("insert into survey_questions (question, createtime, type, style,Active,columns,uid) values  " + 
			"('How often have you bought candies or sweets in the last year?','1970-01-01 00:00:01.000','A','R','D',1,'"+uid+"'), " + 
			"('Which kinds of sweets do you prefer?','1970-01-01 00:00:02.000','A','R','A',2,'"+uid+"'), " + 
			"('On what occasions do you like to give sweets?','1970-01-01 00:00:03.000','A','M','A',2,'"+uid+"'), " + 
			"('What ways do you use to buy your sweets?','1970-01-01 00:00:04.000','A','M','A',2,'"+uid+"'), " + 
			"('Which other \"You''re Sweet\" products have you tried?','1970-01-01 00:00:05.000','U','M','A',2,'"+uid+"'), " + 
			"('What do you like best about \"White Whipped Peaks\"?','1970-01-01 00:00:06.000','U','F','A',1,'"+uid+"'), " + 
			"('Do you like mixed chocolates?','1970-01-01 00:00:07.000','U','R','D',1,'"+uid+"') ");
			
			//Create the answers to the sample question
			sql.addElement("insert into sur_quest_answer (answer, qid, order) values  " + 
			"('More than once a month',(select qid from survey_questions where  uid='"+uid+"' and createtime = '1970-01-01 00:00:01.000'),1), " + 
			"('Once or more every three months',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:01.000'),2), " + 
			"('Once or more every six months',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:01.000'),3), " + 
			"('Once or more a year',(select qid from survey_questions where  uid='"+uid+"' and createtime = '1970-01-01 00:00:01.000'),4), " + 
			"('Semisweet Chocolates',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:02.000'),1), " + 
			"('White Chocolate Puffs',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:02.000'),2), " + 
			"('Truffles',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:02.000'),3), " + 
			"('Combination boxes',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:02.000'),4), " + 
			"('Birthdays',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),1), " + 
			"('Aniversaries',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),2), " + 
			"('Office Parties',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),3), " + 
			"('Holidays',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),4), " + 
			"('Receptions',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),5), " + 
			"('Graduations',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:03.000'),6), " + 
			"('Local \"You''re Sweet\" Outlet',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:04.000'),1), " + 
			"('Supermarket',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:04.000'),2), " + 
			"('Through door-to-door salesperson',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:04.000'),3), " + 
			"('On-line at \"You''re Sweet\"',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:04.000'),4), " + 
			"('Sweet Dream Drops',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),1), " + 
			"('Choco-Lots',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),2), " + 
			"('Bravarian Ice',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),3), " + 
			"('Mocha Movers',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),4), " + 
			"('Snow Showers',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),5), " + 
			"('Danish Dots',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:05.000'),6), " + 
			"('Freeform Answer',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:06.000'),1), " + 
			"('Mixed Chocolates are very appealing',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:07.000'),1), " + 
			"('Mixed Chocolates are appealing',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:07.000'),2), " + 
			"('Mixed Chocolates are not appealing at all',(select qid from survey_questions where uid='"+uid+"' and  createtime = '1970-01-01 00:00:07.000'),3)");
			
			//Create two sample surveys
			sql.addElement("insert into survey_surveys (createtime, active, refname, HID, uid) values " + 
			"('1970-01-01 00:00:01.000','I','fierasurvey1',(select hid from survey_html where uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'),'"+uid+"'), " + 
			"('1970-01-01 00:00:02.000','I','fierasurvey2',(select hid from survey_html where uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'),'"+uid+"')");
			
			//create the relationship to define the survey questions
			sql.addElement("insert into sur_sur_question (sid,qid,order) values " + 
			"((select sid from survey_surveys where uid='"+uid+"' and  createtime='1970-01-01 00:00:01.000'), " + 
			"(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:02.000'),1), " + 
			"((select sid from survey_surveys where  uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'), " + 
			"(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:03.000'),2), " + 
			"((select sid from survey_surveys where uid='"+uid+"' and  createtime='1970-01-01 00:00:01.000'), " + 
			"(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:04.000'),3), " + 
			"((select sid from survey_surveys where uid='"+uid+"' and  createtime='1970-01-01 00:00:02.000'), " + 
			"(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:03.000'),1), " + 
			"((select sid from survey_surveys where  uid='"+uid+"' and createtime='1970-01-01 00:00:02.000'), " + 
			"(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:04.000'),2)");
			
			//Create 3 items for the sample
			sql.addElement("Insert into  survey_itemid (Item,itemshortname,itemid,sid,uid,public) values " + 
			"('Chocolate Tangos','tangochoc','"+uid+"-fierasample1', " + 
			"(select sid from survey_surveys where  uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'),'"+uid+"','Y'), " + 
			"('White Whipped Peaks','peakschoc','"+uid+"-fierasample2', " + 
			"(select sid from survey_surveys where  uid='"+uid+"' and createtime='1970-01-01 00:00:02.000'),'"+uid+"','N'), " + 
			"('Lighter Sides','lightchoc','"+uid+"-fierasample3', " + 
			"(select sid from survey_surveys where  uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'),'"+uid+"','Y')");
			
			//create the relationship that defines the item questions
			sql.addElement("insert into sur_itemquestion (itemid,qid,order) values " + 
			"('"+uid+"-fierasample1',(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:05.000'),1), " + 
			"('"+uid+"-fierasample2',(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:06.000'),1), " + 
			"('"+uid+"-fierasample3',(select qid from survey_questions where uid='"+uid+"' and  createtime='1970-01-01 00:00:07.000'),0)");
			String message = "";
			for (int i = 0; i < sql.size(); i++)
				{
					try
						{
							//System.out.println((String) sql.get(i));
							stmt.execute((String) sql.get(i));
						}
						catch (Exception ex)
						{
						aweval.setMessage("Sample creation failed: "+ex.toString());
						connection.close();
						response.sendRedirect("./firststeps.jsp");
						}
				}
			qry = "select sid from survey_surveys where  uid='"+uid+"' and active='A'";
			rs = stmt.executeQuery(qry);
			if (!rs.next())
				{
				qry = "update survey_surveys set active='A' where uid='"+uid+"' and  createtime='1970-01-01 00:00:01.000'";
				stmt.execute(qry);
				}
			qry = "select hid from survey_html where uid='"+uid+"' and isdefault='1'";
			rs = stmt.executeQuery(qry);
			if (!rs.next())
				{
				qry = "update survey_html set isDefault='1' where uid='"+uid+"' and createtime='1970-01-01 00:00:01.000'";
				stmt.execute(qry);
				}
							
				message = "Samples Created";
			aweval.setMessage(message);			
			connection.close();
			response.sendRedirect("./firststeps.jsp");			
		}
	else if (action.equals("dropsample"))
		{
			aweval.setMessage("Sample data");
			Vector sql = new Vector();		
			sql.add("delete from survey_html where  uid='"+uid+"' and refname like 'fierasample%' ");
			sql.add("delete from sur_itemquestion where itemid like '"+uid+"-fierasample%'");
			sql.add("delete from survey_itemid  where uid='"+uid+"'  and itemid like '"+uid+"-fierasamp%'");
			sql.add("delete from sur_quest_answer where qid in (select qid from survey_questions where uid='"+uid+"'  and year(createtime)=1970)");
			sql.add("delete from aweval.eval_simple_html where uid='"+uid+"'  and refname like 'fierasample%'");
			sql.add("delete from sur_sur_question where qid in (select qid from survey_questions where uid='"+uid+"'  and year(createtime)=1970)												");
			sql.add("delete from survey_questions where uid='"+uid+"'  and year(createtime)=1970");			
			sql.add("delete from survey_surveys where uid='"+uid+"' and year(createtime)=1970");
			sql.add("delete from aweval.eval_responses_static where itemid like '"+uid+"-fierasample%'");  //How to assure only the individuals are deleted?
			sql.add("delete from aweval.eval_responses_freeform where itemid like '"+uid+"-fierasample%'");	//How to assure only the individuals are deleted?
			sql.add("delete from survy_submission where itemid like '"+uid+"-fierasample%'");	//How to assure only the individuals are deleted?				
			//We didn't create any return_links - aweval.eval_return_links	
			String message = "";
			for (int i = 0; i < sql.size(); i++)
				{
					try
						{
							stmt.execute((String) sql.get(i));
						}
						catch (Exception ex)
						{
						aweval.setMessage("Sample removal failed: "+ex.toString());
						connection.close();
						response.sendRedirect("./firststeps.jsp");
						}
				}
				message = "Sample data removed";
			aweval.setMessage(message);
			qry = "select sid from survey_surveys where uid='"+uid+"' and active='A'";
			stmt.executeQuery(qry);
			rs = stmt.executeQuery(qry);
		
			if (!rs.next())
				{

				qry = "select sid from survey_surveys where uid='"+uid+"' order by sid";
				rs = stmt.executeQuery(qry);
				if (rs.next())
					{
						String sid = rs.getString("sid");
						qry = "update survey_surveys set (active)='A' where sid="+sid;
						stmt.execute(qry);
						//setMessage("Survey: "+message + " deleted, "+sid+ " is new default");
					}	
				}
			 qry = "select hid from survey_html where uid='"+uid+"' and isdefault='1'";

			 rs = stmt.executeQuery(qry);
			 if (!rs.next())
			 	{
			 		qry = "select hid from survey_html where uid='"+uid+"' order by hid";
			 		rs = stmt.executeQuery(qry);
			 		if (rs.next())
			 			{
			 				qry = "update survey_html set isdefault='1' where hid ="+rs.getString("hid");
			 				stmt.execute(qry);
			 			}
			 	}						
						
			connection.close();
			response.sendRedirect("./firststeps.jsp");			
	
		}
	else
		{
			String title = "First Steps: Create and Drop Sample Data";
			%>
			<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
				<table width="100%" border=1>
					<tr>
						<td align="center" valign="top">
							<%
								String [] pageNav = new String[3];
								int activeTab = 1;
								pageNav[0] ="Work with items";
								pageNav[1] ="Load&nbsp;sample&nbsp;data";
								pageNav[2] ="Drop&nbsp;sample&nbsp;data";
								//pageNav[3] ="View&nbsp;Tutorial";

								
								String [] pageNavTargets = new String[3];
								pageNavTargets[0] ="./itemman.jsp";
								pageNavTargets[1] ="./firststeps.jsp?action=sample";
								pageNavTargets[2] ="./firststeps.jsp?action=dropsample";
								//pageNavTargets[3] ="javascript:spawn('./fiera.htm')";

								
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
							<!-- WorkPage Start-->
								<table>
									<tr>
										<td>
											<table border=1 width=100%>
												<tr>
												<th>Sample Objects</th><th>Status</th>
												</tr>
												<%
												Vector tables = new Vector();
												Vector sql2 = new Vector();
												tables.add("HTML");
												tables.add("Item questions");
												tables.add("Items");
												tables.add("General questions");
												tables.add("Surveys");
												sql2.add("select * from survey_html where uid='"+uid+"' and refname like 'fierasample%' ");
												sql2.add("select * from sur_itemquestion where itemid like '"+uid+"-fierasample%'");
												sql2.add("select * from survey_itemid  where itemid like '"+uid+"-fierasamp%'");
												sql2.add("select * from survey_questions where uid='"+uid+"' and year(createtime)=1970");
												sql2.add("select * from survey_surveys where uid='"+uid+"' and refname like 'fierasurvey%'");
												
												
												String rowcolor="#cccccc";
												for (int i = 0; i < tables.size(); i++)
												{
												if (i%2 == 0)
						  							rowcolor = "#eeeeee";
						  						else rowcolor = "#ffffff";
								  				%>
								  				<tr bgcolor="<%= rowcolor %>">

												<%
													try
														{
														rs = stmt.executeQuery((String)sql2.get(i));
														if (rs.next())
															{
															%>
															<td><b><%= tables.get(i) %></b></td><td>Loaded</td>
															<%
															}
														else
															{
															%>
															<td><b><%= tables.get(i) %></b></td><td>Not Loaded</td>
															<%
															}
														
														}
													catch (SQLException sqlex)
														{
														
														}
													%>
													</tr>
													<%
												}	
												%>
											</table>
										</td>
									</tr>
								</table>
							<!-- WorkPage End  -->				
						</td>
					</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
				</table>
			<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>	
			<%
			connection.close();
		}
	}
	%>
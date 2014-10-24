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
System.err.println("\n arrivio in tableman.jsp ----- \n");

request.setCharacterEncoding("UTF-8");
boolean disp = true;

String userMessage="You are not Logged in";
if (ident.getIsAuth())
	{
	if (!(ident.getUid().equals("admin")))
		{
		disp=false;
		aweval.setNextPage(request.getServletPath()+"?"+request.getQueryString());
		ident.setMessage("You must be admin to use table management");
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
		
	if (action.equals("create"))
		{
			Vector sql = new Vector();
			sql.addElement("CREATE TABLE \"AWEVAL  \".\"EVAL_ITEMID\"  (  \"ITEM\" VARCHAR(768) NOT NULL , \"ITEMSHORTNAME\" VARCHAR(96) NOT NULL,  \"ITEMID\" VARCHAR(90) NOT NULL,  \"SID\" INTEGER, \"HID\" INTEGER,  \"LID\" INTEGER, \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin', \"IID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +101 , INCREMENT BY +1 , NO CACHE ), \"PUBLIC\" CHAR(1) NOT NULL WITH DEFAULT 'N', \"PUBLICDATA\" CHAR(1) NOT NULL WITH DEFAULT 'N'  )    ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_ITEMID\" ADD PRIMARY KEY (\"ITEMID\",\"UID\")");
			sql.addElement("CREATE  INDEX \"AWEVAL  \".\"IDXUID\" ON \"AWEVAL  \".\"EVAL_ITEMID\" (\"UID\" ASC)    PCTFREE 10 MINPCTUSED 10 ALLOW REVERSE SCANS");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_RESPONSES_FREEFORM\"  (  \"RID\" INTEGER NOT NULL WITH DEFAULT 1 ,   \"QID\" INTEGER NOT NULL ,   \"ANSWER\" VARCHAR(3800) NOT NULL ,   \"CREATETIME\" TIMESTAMP NOT NULL WITH DEFAULT '1970-01-01-00.00.00.000000' ,   \"ITEMID\" VARCHAR(90) NOT NULL WITH DEFAULT 'ZZZ' )     ");
			sql.addElement("Alter TABLE \"AWEVAL  \".\"EVAL_RESPONSES_FREEFORM\" ADD PRIMARY KEY(\"RID\", \"QID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_RESPONSES_STATIC\"  (  \"AID\" INTEGER NOT NULL ,   \"RID\" INTEGER NOT NULL WITH DEFAULT 1 ,   \"CREATETIME\" TIMESTAMP NOT NULL WITH DEFAULT '1970-01-01-00.00.00.000000' ,   \"ITEMID\" VARCHAR(90) NOT NULL WITH DEFAULT 'ZZZ' )     ");
			sql.addElement("Create INDEX \"AWEVAL  \".\"RESP_ITEMID_IDX\" ON \"AWEVAL  \".\"EVAL_RESPONSES_STATIC\" (\"ITEMID\" ASC)PCTFREE 10 ALLOW REVERSE SCANS");
			sql.addElement("Create INDEX \"AWEVAL  \".\"RESPSTATICTIM_IDX\" ON \"AWEVAL  \".\"EVAL_RESPONSES_STATIC\" (\"CREATETIME\" ASC)PCTFREE 10 ALLOW REVERSE SCANS");
			sql.addElement("Create INDEX \"AWEVAL  \".\"RSRIDIDX\" ON \"AWEVAL  \".\"EVAL_RESPONSES_STATIC\" (\"RID\" ASC)PCTFREE 10 ");
			sql.addElement("Alter TABLE \"AWEVAL  \".\"EVAL_RESPONSES_STATIC\" ADD PRIMARY KEY(\"AID\", \"RID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_ITEM_QUESTIONS\"  (  \"ITEMID\" VARCHAR(90) NOT NULL ,   \"QID\" INTEGER NOT NULL ,   \"ORDER\" INTEGER NOT NULL WITH DEFAULT 1 )     ");
			sql.addElement("Alter TABLE \"AWEVAL  \".\"EVAL_ITEM_QUESTIONS\" ADD PRIMARY KEY(\"ITEMID\", \"QID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"sur_quest_answer\"  (  \"AID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +0 , INCREMENT BY +1 , NO CACHE ) ,   \"QID\" INTEGER NOT NULL ,   \"ANSWER\" CHAR(195) NOT NULL ,   \"ACTIVE\" CHAR(1) NOT NULL WITH DEFAULT 'Y' ,   \"ORDER\" INTEGER NOT NULL WITH DEFAULT 1,   \"ANSVALUE\" INTEGER NOT NULL WITH DEFAULT 0 )     ");
			sql.addElement("Alter TABLE \"AWEVAL  \".\"sur_quest_answer\" ADD PRIMARY KEY(\"AID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_SUBMISSIONS\"  (  \"RID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +200 , INCREMENT BY +1 , NO CACHE ) ,   \"CREATETIME\" TIMESTAMP NOT NULL ,   \"FNAME\" VARCHAR(120) NOT NULL WITH DEFAULT 'BLANK_FIRST' ,   \"LNAME\" VARCHAR(180) NOT NULL WITH DEFAULT 'BLANK_LAST' ,   \"EMAIL\" VARCHAR(300) NOT NULL WITH DEFAULT 'BLANK_EMAIL' ,   \"COMPANY\" VARCHAR(300) NOT NULL WITH DEFAULT 'BLANK_COMPANY' ,   \"ITEMID\" VARCHAR(90) NOT NULL WITH DEFAULT 'ZZZ' ,   \"OPTIN\" CHAR(3) WITH DEFAULT '' ,   \"CONTACT\" CHAR(3) WITH DEFAULT '' ,   \"REFERENCE\" CHAR(3) WITH DEFAULT '', \"SID\" INTEGER )     ");
			sql.addElement("Create INDEX \"AWEVAL  \".\"RIDIDX\" ON \"AWEVAL  \".\"EVAL_SUBMISSIONS\" (\"RID\" ASC)PCTFREE 10 ");
			sql.addElement("Create INDEX \"AWEVAL  \".\"ITEMIDIDX\" ON \"AWEVAL  \".\"EVAL_SUBMISSIONS\" (\"ITEMID\" ASC)PCTFREE 10 ");
			sql.addElement("Alter TABLE \"AWEVAL  \".\"EVAL_SUBMISSIONS\" ADD PRIMARY KEY(\"CREATETIME\", \"ITEMID\", \"EMAIL\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_QUESTIONS\"  (  \"QID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +101 , INCREMENT BY +1 , NO CACHE ) ,   \"QUESTION\" VARCHAR(660) NOT NULL ,   \"TYPE\" CHAR(1) NOT NULL WITH DEFAULT 'U' ,   \"CREATETIME\" TIMESTAMP NOT NULL WITH DEFAULT '2003-01-01-00.00.00.000000' ,   \"ORDER\" INTEGER WITH DEFAULT 1 ,   \"ACTIVE\" CHAR(1) NOT NULL WITH DEFAULT 'D' ,   \"STYLE\" CHAR(1) NOT NULL WITH DEFAULT 'R',   \"CLONEABLE\" CHAR(1) NOT NULL WITH DEFAULT 'N',  \"COLUMNS\" INTEGER NOT NULL WITH DEFAULT 1,  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin' )     ");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_SURVEY_QUESTIONS\"  (  \"SID\" INTEGER NOT NULL ,   \"QID\" INTEGER NOT NULL ,   \"ORDER\" INTEGER NOT NULL,  \"QALIGN\" CHAR(1) NOT NULL WITH DEFAULT 'L',  \"AALIGN\" CHAR(1) NOT NULL WITH DEFAULT 'L',  \"QWIDTH\" INTEGER NOT NULL WITH DEFAULT 0,  \"QSECTION\" CHAR(1) NOT NULL WITH DEFAULT 'A' )      ");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_SURVEYS\"  (  \"SID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +100 , INCREMENT BY +1 , NO CACHE ) ,   \"ACTIVE\" CHAR(1) NOT NULL WITH DEFAULT 'I', \"CREATETIME\" TIMESTAMP NOT NULL WITH DEFAULT '1970-01-01-00.00.00.000000', \"HID\" INTEGER, \"LID\" INTEGER, \"REFNAME\" VARCHAR(36),  IDENTITY CHARACTER (1)  NOT NULL  WITH DEFAULT '0',  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin', \"QSIZE\" INTEGER WITH DEFAULT 350,  \"QALIGN\" CHAR(1) NOT NULL WITH DEFAULT 'L',  \"AALIGN\" CHAR(1) NOT NULL WITH DEFAULT 'L' )     ");
			sql.addElement("CREATE TABLE \"AWEVAL \".\"EVAL_HTML\" (\"HID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +100 , INCREMENT BY +1 , NO CACHE ) ,\"HEADER\" CLOB(81920) NOT LOGGED NOT COMPACT ,\"FOOTER\" CLOB(81920) NOT LOGGED NOT COMPACT ,\"CREATETIME\" TIMESTAMP NOT NULL WITH DEFAULT '1970-01-01-00.00.00.000000' , \"ISDEFAULT\" CHAR(1), \"HEADERFILE\"  VARCHAR(120), \"FOOTERFILE\"  VARCHAR(120), \"REFNAME\"  VARCHAR(36),  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin')  ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_HTML\" ADD CONSTRAINT \"PRI097623024088\" PRIMARY KEY	(\"HID\",\"UID\")");			
			sql.addElement("CREATE TABLE \"AWEVAL  \".\"EVAL_SIMPLE_HTML\"  ( \"HID\" INTEGER NOT NULL ,  \"REFNAME\" VARCHAR(36) ,  \"HEADCOLOR\" CHAR(6) NOT NULL WITH DEFAULT 'FFFFFF' ,  \"HEADSIZE\" INTEGER NOT NULL WITH DEFAULT 100 ,  \"BARCOLOR\" CHAR(6) NOT NULL WITH DEFAULT 'FFFFFF' ,  \"BARSIZE\" INTEGER NOT NULL WITH DEFAULT 0 ,  \"TITLE\" VARCHAR(650) ,  \"TITLESIZE\" INTEGER NOT NULL WITH DEFAULT 3 ,  \"BLURB\" VARCHAR(650) ,  \"BLURBSIZE\" INTEGER NOT NULL WITH DEFAULT 3 ,  \"BLURBCOLOR\" CHAR(6) NOT NULL WITH DEFAULT 'FFFFFF' ,  \"SUBTITLE\" VARCHAR(650) ,  \"SUBTITLESIZE\" INTEGER NOT NULL WITH DEFAULT 3 ,  \"LINK1\" VARCHAR(320) NOT NULL WITH DEFAULT '' ,  \"LINK1TEXT\" VARCHAR(180) NOT NULL WITH DEFAULT '' ,  \"LINK2\" VARCHAR(320) NOT NULL WITH DEFAULT '' ,  \"LINK2TEXT\" VARCHAR(180) NOT NULL WITH DEFAULT '' ,  \"LINK3\" VARCHAR(320) NOT NULL WITH DEFAULT '' ,  \"LINK3TEXT\" VARCHAR(180) NOT NULL WITH DEFAULT '' ,  \"FOOTCOLOR\" CHAR(6) NOT NULL WITH DEFAULT 'FFFFFF' ,  \"FOOTSIZE\" INTEGER NOT NULL WITH DEFAULT 0,  \"BORDERSIZE\" INTEGER NOT NULL WITH DEFAULT 1,  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin' )   ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_SIMPLE_HTML\" ADD CONSTRAINT \"CC1097623024088\" PRIMARY KEY	(\"HID\",\"UID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_RETURN_LINKS\"  (  \"LID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +101 , INCREMENT BY +1 , NO CACHE ) ,   \"REFNAME\" VARCHAR(180) NOT NULL ,   \"URL\" VARCHAR(750) NOT NULL,   \"ISDEFAULT\" CHAR(1) NOT NULL WITH DEFAULT '0',  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin')     ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_RETURN_LINKS\" ADD CONSTRAINT \"PRIM23024088\" PRIMARY KEY	(\"LID\",\"UID\")");			
			sql.addElement("CREATE TABLE \"AWEVAL  \".\"EVAL_USERS\"  ( \"FNAME\" VARCHAR(120) NOT NULL ,  \"LNAME\" VARCHAR(180) NOT NULL ,   \"EMAIL\" VARCHAR(300) NOT NULL ,   \"UID\" VARCHAR(48) NOT NULL ,   \"COMPANY\" VARCHAR(300) NOT NULL ,  \"CREATETIME\" TIMESTAMP NOT NULL,  \"LASTLOGIN\" TIMESTAMP NOT NULL ,  \"LOGINCNT\" INTEGER,  \"PASSWORD\" VARCHAR(96) FOR BIT DATA NOT NULL, \"CQUESTION\" VARCHAR(240) NOT NULL  WITH DEFAULT '',  \"CANSWER\" VARCHAR(120) NOT NULL  WITH DEFAULT '' ) ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_USERS\" ADD CONSTRAINT \"PRI723024088\" PRIMARY KEY	(\"UID\")");
			sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_TAGS\"  (  \"TID\" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH +101 , INCREMENT BY +1 , NO CACHE ) ,   \"TAGNAME\" VARCHAR(36) NOT NULL ,   \"TAGVALUE\" VARCHAR(300) NOT NULL,  \"UID\" VARCHAR(48) NOT NULL WITH DEFAULT 'admin')     ");
			sql.addElement("ALTER TABLE \"AWEVAL  \".\"EVAL_TAGS\" ADD CONSTRAINT \"PRIM43034088\" PRIMARY KEY	(\"TID\",\"UID\")");			
			//sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_LOGINS\"  (  \"UID\" VARCHAR(30),   \"ACTTIME\" TIMESTAMP NOT NULL, \"ACTION\" VARCHAR(12)) ");
			//sql.addElement("Create TABLE \"AWEVAL  \".\"EVAL_ACTION_LOG\"  (  \"UID\" VARCHAR(30),   \"ACTTIME\" TIMESTAMP NOT NULL, \"SQLACTION\" VARCHAR(255)) ");
			
			
			for (int i = 0; i < sql.size(); i++)
				{
					try
						{
							//System.out.println((String) sql.get(i));
							stmt.execute((String) sql.get(i));
							//System.out.println("--OK--"+(String) sql.get(i));
						}
						catch (Exception ex)
						{
						aweval.setMessage("Table creation failed: "+ex.toString());
						connection.close();
						response.sendRedirect("./tableman.jsp");
						}
				}
			aweval.setMessage("Tables created");
			connection.close();
			response.sendRedirect("./tableman.jsp");
		}
	else if (action.equals("drop"))
		{
			Vector sql = new Vector();
			sql.addElement("DROP TABLE survey_html"); 
			sql.addElement("DROP TABLE sur_itemquestion"); 
			sql.addElement("DROP TABLE survey_itemid"); 
			sql.addElement("DROP TABLE sur_quest_answer"); 
			sql.addElement("DROP TABLE survey_questions"); 
			sql.addElement("DROP TABLE AWEVAL.eval_responses_freeform"); 
			sql.addElement("DROP TABLE AWEVAL.eval_responses_static"); 
			sql.addElement("DROP TABLE AWEVAL.eval_return_links"); 
			sql.addElement("DROP TABLE AWEVAL.eval_simple_html"); 
			sql.addElement("DROP TABLE survy_submission"); 
			sql.addElement("DROP TABLE sur_sur_question"); 
			sql.addElement("DROP TABLE survey_surveys");
			sql.addElement("DROP TABLE AWEVAL.eval_users");	
			sql.addElement("DROP TABLE AWEVAL.eval_tags");								
			//sql.addElement("DROP TABLE AWEVAL.eval_logins");								
			//sql.addElement("DROP TABLE AWEVAL.eval_action_log");														
			String message = "Tables Dropped";
			for (int i = 0; i < sql.size(); i++)
				{
					try
						{
							//message = message +"<br>"+sql.get(i)+" - ";						
							stmt.execute((String) sql.get(i));
							//message = message + "successful";	
						}
						catch (Exception ex)
						{
						aweval.setMessage("Table creation failed: "+ex.toString());
						}
				}
			aweval.setMessage(message);
			connection.close();
			response.sendRedirect("./tableman.jsp");			
		}
	else
		{
			String title = "Table Management: Create and Drop Tables";
			%>
			<jsp:include page="/webclient/survey/webclient/survey/resource/fieraheader.jsp" flush="true"/>
				<table width="100%" border=1>
					<tr>
						<td align="center" valign="top">
							<%
								String [] pageNav = new String[2];
								int activeTab = 1;
								pageNav[0] ="Create tables";
								pageNav[1] ="Drop tables";
								
								String [] pageNavTargets = new String[2];
								pageNavTargets[0] ="./tableman.jsp?action=create";
								pageNavTargets[1] ="./confirm.jsp?action=drop";

								
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
												<tr bgcolor="#9999ff">
												<th>Table</th><th>Status</th>
												</tr>
												<%
												Vector tables = new Vector();
												Vector sql2 = new Vector();
												tables.add("survey_html");
												tables.add("sur_itemquestion");
												tables.add("survey_itemid");
												tables.add("sur_quest_answer");
												tables.add("survey_questions");
												tables.add("aweval.eval_responses_freeform");
												tables.add("aweval.eval_responses_static");
												tables.add("aweval.eval_return_links");
												tables.add("aweval.eval_simple_html");
												tables.add("survy_submission");
												tables.add("sur_sur_question");
												tables.add("survey_surveys");
												tables.add("aweval.eval_users");
												tables.add("aweval.eval_tags");	
												//tables.add("aweval.eval_logins");
												//tables.add("aweval.eval_action_log");																																																	
												sql2.add("select * from survey_html where uid='"+uid+"' and refname like 'fierasample%' ");
												sql2.add("select * from sur_itemquestion where itemid like '"+uid+"-fierasample%'");
												sql2.add("select * from survey_itemid  where itemid like '"+uid+"-fierasamp%'");
												sql2.add("select * from sur_quest_answer where qid in (select qid from survey_questions where uid='"+uid+"' and year(createtime)=1970)");
												sql2.add("select * from survey_questions where uid='"+uid+"' and year(createtime)=1970");
												sql2.add("select * from aweval.eval_responses_freeform where itemid = '"+uid+"-fierasample%'");
												sql2.add("select * from aweval.eval_responses_static	where itemid like '"+uid+"-fierasample%'");
												sql2.add("select * from aweval.eval_return_links where uid='"+uid+"' and refname='xxxxxxx'");
												sql2.add("select * from aweval.eval_simple_html where uid='"+uid+"' and refname like 'fierasample%'");
												sql2.add("select * from survy_submission where itemid like '"+uid+"-fierasample%'");
												sql2.add("select * from sur_sur_question where qid in (select qid from survey_questions where uid='"+uid+"' and year(createtime)=1970)");
												sql2.add("select * from survey_surveys where uid='"+uid+"' and refname like 'fierasurvey%'");
												sql2.add("select * from aweval.eval_users where email like 'fierauser%'");
												sql2.add("select * from aweval.eval_tags where uid='"+uid+"'");
												//sql2.add("select * from aweval.eval_logins where uid='"+uid+"'");
												//sql2.add("select * from aweval.eval_action_log where uid='"+uid+"'");
												
												String rowcolor="#cccccc";
												for (int i = 0; i < tables.size(); i++)
												{
												if (i%2 == 1)
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
															<td><b><%= tables.get(i) %></b></td><td>Exists</td>
															<%
															}
														else
															{
															%>
															<td><b><%= tables.get(i) %></b></td><td>Exists</td>
															<%
															}
														
														}
													catch (SQLException sqlex)
														{
														%>
														<td><b><%= tables.get(i) %></b></td><td>Does Not Exist</td>
														<%
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
		<jsp:include page="/webclient/survey/webclient/survey/resource/redir.jsp" flush="true"/>
				</table>
			<jsp:include page="/webclient/survey/webclient/survey/resource/fierafooter.jsp" flush="true"/>	
			<%
			connection.close();
		}
	}
	%>
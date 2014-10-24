<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page import="java.sql.*"%>

<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
		<%
		request.setCharacterEncoding("UTF-8");
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("cache-control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
			
		//response.setHeader("Cache-Control","no-cache"); //Forces caches to obtain a new copy of the page from the origin server
		//response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		//response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		//response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		String userMessage="Logged&nbsp;Out";
		if (ident.getIsAuth())
			{
			userMessage = ident.getUid();
			}
		%>

<HTML>
	<HEAD>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"/>         
		<TITLE>Fiera : Evaluation Architecture</TITLE><meta name="TITLE" content="Fiera : Evaluation Architecture"/>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<SCRIPT TYPE="text/javascript" LANGUAGE="JavaScript">
		<!--
		function spawn(target) {
		var t = new Date();
		ms = t.getTime()		
		window.open(target,ms,config="menubar=no,toolbar=yes,title=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,width=400,height=350")
		}
		-->
		</SCRIPT>						
		<SCRIPT TYPE="text/javascript" LANGUAGE="JavaScript">
		<!--
		function spawnwide(target) {
		var t = new Date();
		ms = t.getTime()
		window.open(target,ms,config="menubar=no,toolbar=yes,title=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,width=800,height=600")
		}
		-->
		</SCRIPT>					
	</Head>	
	<BODY TEXT="000000" BGCOLOR="FFFFFF" marginheight="2" marginwidth="2" topmargin="2" leftmargin="2">
	<script language="JavaScript" type="text/javascript">
	<!--
	onLoad="if ('Navigator' == navigator.appName) document.forms[0].reset();" 
	 //-->
	</script>
	<script language="JavaScript">
	<!--
	javascript:window.history.forward(1);
	//-->
	</script>
		<table width="98%" border="0" cellspacing="0" cellpadding="0"> 	
			<tr>
				<td height="60" bgcolor="#99FFFF" align="center">
					<h2>IBM Flexible Internet Evaluation Report Architecture (FIERA)</h2>
				</td>
			</tr>
			<tr>
				<td>
					<table width="100%" border=1>
						<tr>
							<td width="8%" valign="top">
								<table width="100%" >
									<tr>
										<td height="40" colspan="2">
											<table>
												<tr>
													<td>
														<b>User: </b><%= userMessage %>
													</td>
												</tr>
												
												<tr>
													<td>
													<%
													
													if (ident.getIsAuth())
														{
														%>
														<form name="x" action="./login.jsp" method="get">
														<input type="hidden" name="action" value="logout">
														<input type="submit" value="Logout">
														</form>													
														<%
														}
													else
														{
														%>
														&nbsp;
														<%
														}													
													%>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td  colspan="2">
											<hr size="1">
										</td>
									</tr>
									<tr>
										<td>
											&nbsp;&nbsp;&nbsp;
										</td>
										<td width="120" align="center">
											<table width="120" cellspacing="0" cellpadding="0" border="0">
												<tr><td height="6"><img src="images/clear.gif" height="6" alt=" " /></td></tr>
													<%
													if (true)
														{
														String [] genNav = new String[2];
														int activeTab2 = 1;
														genNav[0] ="Tutorial";
														genNav[1] ="Public Reports";

														String [] genNavTarget = new String[2];
														genNavTarget[0] ="javascript:spawn('./fiera.pdf')";
														genNavTarget[1] ="./pubreport.jsp";														
														for (int i=0; i < genNav.length; i++)
															{
															%>
															<tr><td width="8">&nbsp;</td><td width="152"><a href="<%= genNavTarget[i] %>" ><%= genNav[i] %></a></td><td width="7">&nbsp;</td></tr>
															<%
															}														
														%>
														<tr>
															<td colspan="2">
																<hr size="1">
															</td>
														</tr>
														<%
														}
													
													if (!ident.getIsAuth()) //getUid() == null)
														{
														String [] genNav = new String[1];
														int activeTab2 = 1;
														genNav[0] ="Login";
														//genNav[1] ="Public Reports";

														String [] genNavTarget = new String[1];
														genNavTarget[0] ="./login.jsp";
														//genNavTarget[1] ="./pubreport.jsp";														
														for (int i=0; i < genNav.length; i++)
															{
															%>
															<tr><td width="8">&nbsp;</td><td width="152"><a href="<%= genNavTarget[i] %>" ><%= genNav[i] %></a></td><td width="7">&nbsp;</td></tr>
															<%
															}														
														} 
													else if (!ident.getUid().equals("admin"))
														{							
														String [] genNav = new String[11];
														int activeTab2 = 1;
														genNav[0] ="First Steps";
														genNav[1] ="Summary";														
														genNav[2] ="Survey Mgmt";
														genNav[3] ="Item Mgmt";
														genNav[4] ="HTML Mgmt";
														genNav[5] ="Question Mgmt";
														genNav[6] ="Link Mgmt";														
														genNav[7] ="Tag Mgmt";
														genNav[8] ="Report Mgmt";
														genNav[9] ="Your Profile";
														genNav[10] ="Open Tutorial";														
														
														String [] genNavTarget = new String[11];
														genNavTarget[0] ="./firststeps.jsp";
														genNavTarget[1] ="./index.jsp";														
														genNavTarget[2] ="./surveyman.jsp";
														genNavTarget[3] ="./itemman.jsp";
														genNavTarget[4] ="./htmlman.jsp";
														genNavTarget[5] ="./questionman.jsp";
														genNavTarget[6] ="./linkman.jsp";
														genNavTarget[7] ="./tagman.jsp";														
														genNavTarget[8] ="./reportman.jsp";														
														genNavTarget[9] ="./profile.jsp";
														genNavTarget[10] ="javascript:spawn('./fiera.htm')";
														
														for (int i=0; i < genNav.length; i++)
															{
															%>
															<tr><td width="8">&nbsp;</td><td width="152"><a href="<%= genNavTarget[i] %>" ><%= genNav[i] %></a></td><td width="7">&nbsp;</td></tr>
															<%
															}
														}
													else
														{
														boolean tablesExist = true;
														Connection tablecon = aweval.getConnection();
														Statement tablestmt = tablecon.createStatement();
														try
														{
														ResultSet tablers = tablestmt.executeQuery("select count(*) from aweval.eval_users where uid='-'");
														}
														catch (Exception ex)
														{
														tablesExist = false;
														}
														
														String [] genNav = null;
														String [] genNavTarget = null;
														if (tablesExist)
														{
														genNav = new String[5];
														int activeTab2 = 1;
														genNav[0] ="Admin Reports";
														genNav[1] ="Admin Profile";
														genNav[2] ="User Mgmt";																																										
														genNav[3] ="Table Mgmt";
														genNav[4] ="Open Tutorial";																																										
														
														genNavTarget = new String[5];
														genNavTarget[0] ="./adminreport.jsp";														
														genNavTarget[1] ="./profile.jsp";
														genNavTarget[2] ="./userman.jsp";
														genNavTarget[3] ="./tableman.jsp";
														genNavTarget[4] ="javascript:spawn('./fiera.htm')";
														}
														else
														{
														genNav = new String[2];
														int activeTab2 = 1;																																										
														genNav[0] ="Table Mgmt";
														genNav[1] ="Open Tutorial";																																										
														
														genNavTarget = new String[2];
														genNavTarget[0] ="./tableman.jsp";
														genNavTarget[1] ="javascript:spawn('./fiera.htm')";
														}
														tablestmt.close();
														tablecon.close();
														for (int i=0; i < genNav.length; i++)
															{
															%>
															<tr><td width="8">&nbsp;</td><td width="152"><a href="<%= genNavTarget[i] %>" ><%= genNav[i] %></a></td><td width="7">&nbsp;</td></tr>
															<%
															}
														}																					
													%>							
											</table>
										</td>
									</tr>
									<tr>
										<td  colspan="2">
											<hr size="1">
										</td>
									</tr>									
								</table>
							</td>
							<td width="92%" valign="top">
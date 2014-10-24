<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page import="java.sql.*,com.ibm.tsd.pmcom.survey.Messages"%>

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

           //String surveyUrl = "..\\..\\..\\..\\maximohelp\\helpweb\\webmodule\\"+Messages.getLanguageCode()+"\\mergedProjects\\survey\\survey.htm";
		   String surveyUrl = "survey.htm";
		   
          //System.err.println("\n arrivio in fieraheader.jsp -- Maximo userId in surveyUrl----- "+surveyUrl);


		%>

<HTML>
	<HEAD>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"/>         

		<TITLE><%=Messages.getString("FIERAHEADER_MAXIMO_SURVEY")%></TITLE>
		
		<link rel="stylesheet" type="text/css" href="theme/survey.css"/>

		


		<meta name="TITLE" content="SRM : Survey"/>
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
		<table width="98%" border="0" cellspacing="0" cellpadding="0"> 	
			
			<!--tr>
				<td height="60" bgcolor="#99FFFF" align="center">
					<h2>IBM Flexible Internet Evaluation Report Architecture (FIERA)</h2>
				</td> SRM 
			</tr-->

			<table width="100%"  border="0" cellpadding="0" cellspacing="0" class="applinknavbar">
				<tr>
					 <td width="35" height="50" rowspan="2" nowrap>
						   <img id="appimage" border="0" src="../images/appimg_asset.gif" align="left" hspace="0" alt="Maximo Survey" >
					</td>

					<td align="left" nowrap>        
						<span class="txtappname">&nbsp;
							<%=Messages.getString("FIERAHEADER_MAXIMO_SURVEY")%>
						</span>
					</td>

					<td align="right">        


                       <span class="txtappname"> 
							<a href="javascript:spawnwide('<%=surveyUrl%>')"><span class="txtappname"><%=Messages.getString("FIERAHEADER_HELP")%> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span>

					<br/><br/>
						<span class="txtappname"> 
							<a href="javascript:window.close()"><span class="txtappname"><%=Messages.getString("FIERAHEADER_MAXIMO_SURVEY_RIGHT")%></span></a>
						</span>
					</td>
				</tr>

           <tr>

			<td colspan="3" align="center" style="height:16px;padding-right:50px;">
				<table border="0" cellpadding="0" cellspacing="0"> 
					<tr>
						<td nowrap>
							<img id="titlebar_error_image" src="../images/information.gif"  style="visibility:hidden"/>
						</td>
						<td nowrap id="titlebar_error" class="text usermessage">
							&nbsp;
						</td>
					</tr>
				</table>
			</td>

		</tr>
            </table>


			<!--table width="100%"  border="0" cellpadding="0" cellspacing="0" class="applinknavbar">
		<tr>
			<td width="35" rowspan="2" nowrap>
				<a id="appImageAnchor" href="javascript: sendEvent('focusfirst')"><img id="appimage" border="0" src="http://localhost:7001/maximo/webclient/images/appimg_asset.gif" align="left" hspace="0" alt="Assets" ></a>	
			</td>
			<td nowrap>        
				<span class="txtappname">&nbsp;
					Assetsaaa
				</span>
			</td-->



			<!--tr>
				<td>
					<table width="100%" border=1>

									<tr>
										<td  colspan="2">
											<hr size="1">
										</td>
									</tr>									
								</table>
							</td>
							<td width="92%" valign="top"-->


<%
//out.println("--request.getContextPath = "+request.getRequestURI());
String requestURI = request.getRequestURI();
String summeryCurrent = "",questionCurrent = "",sectionCurrent = "",surveyCurrent = "",htmlCurrent = "",linkCurrent = "",summaryCurrent = "";
String summaryTitle = "Click list tab and select a Survey for Result";

if(requestURI != null && !requestURI.equals(""))
{
	String pageName = requestURI.substring(requestURI.lastIndexOf("/")+1,requestURI.length());
    //out.println("--pageName = "+pageName);
	
	if(!pageName.equals("") && pageName.equals("index.jsp")) 
	{
		summeryCurrent = "current";
	} else
	if(!pageName.equals("") && (pageName.equals("questionman.jsp") || pageName.equals("addStandardNew.jsp") || pageName.equals("archivedQuestions.jsp") || pageName.equals("standardQuestions.jsp") || pageName.equals("itemQuestions.jsp") || pageName.equals("viewQuestion.jsp")))
	{
		questionCurrent = "current";
	} else
	if(!pageName.equals("") && (pageName.equals("surveyman.jsp") || pageName.equals("editStandardSurvey.jsp") || pageName.equals("surveyman2.jsp") ))
	{
		sectionCurrent = "current";
	} else
	if(!pageName.equals("") && (pageName.equals("itemman.jsp") || pageName.equals("itemman2.jsp")))
	{
		surveyCurrent = "current";
	} else
	if(!pageName.equals("") && (pageName.equals("htmlman.jsp") || pageName.equals("uploadman.jsp") || pageName.equals("simpleHtml.jsp") || pageName.equals("htmlman2.jsp")))
	{
		htmlCurrent = "current";
	} else
	if(!pageName.equals("") && pageName.equals("linkman.jsp"))
	{
		linkCurrent = "current";
	} else
	if(!pageName.equals("") && pageName.equals("iteminfo.jsp"))
	{
		summaryCurrent = "current";
	}

	if(!summaryCurrent.equals(""))
		summaryTitle = "";
}
%>
<br/>

<!-- S SUBTABS -->
<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
  <TBODY>
	  <TR>
		<TD vAlign=top>
			  <DIV id=foldertab1>
				  <LI><A id="<%=summeryCurrent%>" href="index.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_1")%></A>
				  <LI><A id="<%=questionCurrent%>" href="questionman.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_2")%></A>
				  <LI><A id="<%=sectionCurrent%>" href="surveyman.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_3")%></A>
				  <LI><A id="<%=surveyCurrent%>" href="itemman.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_4")%></A>
				  <LI><A id="<%=htmlCurrent%>" href="htmlman.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_5")%></A>
				  <LI><A id="<%=linkCurrent%>" href="linkman.jsp"><%=Messages.getString("FIERAHEADER_SUB_TITLE_6")%></A>
				  <LI><A id="<%=summaryCurrent%>" ahref="#" title="<%=summaryTitle%>"><%=Messages.getString("FIERAHEADER_SUB_TITLE_7")%></A>
				  </LI>
			  </DIV>
		</TD>
	  </TR>
  </TBODY>
</TABLE>
<!-- E SUBTABS -->


<DIV class=subtabs>
<DIV align=left>


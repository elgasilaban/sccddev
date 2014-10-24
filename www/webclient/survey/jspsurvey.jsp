<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.util.*,java.sql.*,com.ibm.tsd.pmsurvey.webclient.beans.Messages, psdi.util.BidiUtils"%>

<jsp:useBean id="surveyBean" scope="session" class="com.ibm.tsd.pmsurvey.webclient.beans.JspSurveyBean" />
<% //bidi-hcg-hh start	
	boolean isBidiEnabled = BidiUtils.isBidiEnabled();
	String bidiHandler = "";
	
	String lang = request.getParameter("lan");
    if(lang!=null)
		Messages.setLanguageCode(lang);
	
	if(isBidiEnabled) //bidi-hcg-hh
	{
%>
		<script type="text/javascript" src="../javascript/bidi_library.js">
		</script>
<%	}	%>


<%

	request.setCharacterEncoding("UTF-8");
	String surveyId = request.getParameter("sid");

//System.err.println("\n  arrivio in jspsurvey.jsp ----- surveyBean.isPublicItem(surveyId) =   "+surveyBean.isPublicItem(surveyId));
	if (surveyId == null)  //Then the default Survey has not been set.
	{
	  //surveyBean.setMessage("A survey has not been set");
	  return;
	}

    String isPreview = request.getParameter("prev");
	boolean canView = true;
	if(isPreview == null)
	{
	   canView = surveyBean.canAccessSurvey(surveyId);
	   if(!canView)
		{
		   //Show java script message
		   %>
		  	<html>
		      <head>
				<script>
				  function cannotViewSurvey()
    			  {
					alert("<%=Messages.getString("JAVASCRIPT_CANNOTVIEWSURVEY")%>");
					return false;
				 }
				</script>
			  </head>
			  <body onload="return cannotViewSurvey()">
			  </body>
            </html>
		   <%

		   return;
		}
	}

	
	String surveyresponse = request.getParameter("surveyresponse");
	if(surveyresponse != null && surveyresponse.equals("RESPONSE") && surveyId != null)
	{
		surveyBean.ProcessSurveyResponse(request, surveyId);

			%>
		   <table role="presentation">
				<tr>
					<td height="200">
						&nbsp;
					</td>
				</tr>
				<tr>
					<td>
						<font size="4"><%=Messages.getString("THANKYOU_SURVEY_SUBMISSION")%></font>
					</td>
				</tr>
				<tr>
					<td height="200">
						&nbsp;
					</td>
				</tr>
			</table>
			<%
			return;
	}

	if(canView && isPreview == null && surveyresponse == null)
	{
	   surveyBean.setNoUnTrackedViewed(surveyId);
	}



	String recordClass = request.getParameter("recordclass");
	String recordKey = request.getParameter("recordkey");

	Connection connection = surveyBean.getConnection();
	Statement stmt = connection.createStatement();
	String databaseProductName = surveyBean.getDatabaseProductName();
	
	String hid = "";
	String query = "";
	ResultSet rs = null;
	
	
	/*
	//Venkyg : 10/28/08 : This section is for ***** APPLY SURVEY TEMPLATE
	String html[] = surveyBean.getHtml(request);
	String header = html[0];
	String footer = html[1];

    //System.err.println("\n  arrivio in jspsurvey.jsp ----- REACHING HERE 000 header@@@@@ = "+header);

	String header1 = header.substring(0,header.indexOf("le>")+3);
	String header2 = header.substring(header.indexOf("</title>"),header.length());

	header = header1 + Messages.getString("FIERAHEADER_MAXIMO_SURVEY") + header2;


    query = "Select item, itemshortname, userid from survey_itemid where itemid='"+surveyId+"'";
	String uid="";
    String item = "";
    String shortName = "";
   // System.err.println("\n  arrivio in jspsurvey.jsp ----- REACHING HERE 000 header = "+header);

    if (!surveyId.equals("000"))	
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
	
	//String title = item + " Feedback Form";

	//Write the HTML
	//out.println(surveyBean.replaceTag(surveyBean.replaceTags(uid, header),"<itemname>",item));
*/

		int qsize = 450;
		/*query = "select qsize from survey_surveys where sid="+sid;
		rs = stmt.executeQuery(query);
		if (rs.next())
			qsize = rs.getInt("qsize");

		*/

	    //System.err.println("\n  arrivio in jspsurvey.jsp ----- REACHING HERE 1111" );
		
		%>
        
		<html lang="<%=lang%>">
		  <head>
		  <% //bidi Append Start
					if(lang.equalsIgnoreCase("AR") || lang.equalsIgnoreCase("HE") )
					{
		   %>
		   		<link rel="stylesheet" type="text/css" href="../css/RTLmaximo.css"/>
				<link rel="stylesheet" type="text/css" href="../css/RTLsurvey.css"/>
		   <%
					}
					else
					{
			%>
				<link rel="stylesheet" type="text/css" href="../css/maximo.css"/>
				<link rel="stylesheet" type="text/css" href="../css/survey.css"/>
			<%
					}
		  //Bidi Append End
		  %>

				<title><%=Messages.getString("SURVEY_TITLE")%></title>
				<style type="text/css">
					fieldset
					{
						 border: 0px;
					}
				</style>
				<script>
				function backButtonOverride()
				{
					setTimeout("backButtonOverrideBody()", 1);
				}

				function backButtonOverrideBody()
				{
					// Works if we backed up to get here
					try {
						history.forward();
					} catch (e) {
						// OK to ignore
					}
					// Every quarter-second, try again. The only
					// guaranteed method for Opera, Firefox,
					// and Safari, which don't always call
					// onLoad but *do* resume any timers when
					// returning to a page
					setTimeout("backButtonOverrideBody()", 500);
				}
              </script>
			</head>

			<body onload="backButtonOverride()">





		<form name="eval1" action="./jspsurvey.jsp" method="post" role="main">

			<input type="hidden" name="sid" value="<%= surveyId %>">			
			<input type="hidden" name="surveyresponse" value="RESPONSE">

			<input type="hidden" name="recordclass" value="<%= recordClass %>">			
			<input type="hidden" name="recordkey" value="<%= recordKey %>">			




			<!-- questions table -->
			<table border="0" cellspacing="0" align="center" cellpadding="3" width="75%" role="presentation">
			    <tr>
			    	<td width="50">
			    		<img alt="" width="50" height="1" src="./images/clear.gif\" />
			    	</td>
			    	 
			    </tr>	



					<%
					// STARTING OF QUESTION
					//Move all the Question-Answer Processing to Bean
					
					//String serverContextPath = config.getServletContext().getRealPath("/")+"\\webclient\\images\\";
					String serverContextPath = config.getServletContext().getRealPath("/");
					String fileSeparator = File.separator;
					if(serverContextPath != null && serverContextPath.endsWith(fileSeparator))
						serverContextPath = serverContextPath.substring(0,serverContextPath.length()-1);

					//serverContextPath += "\\webclient\\images\\";
					serverContextPath += fileSeparator + "webclient"+ fileSeparator + "images" + fileSeparator;

					System.out.println("---from jspsurvey.jsp-- get path info = "+serverContextPath);
					//bidi-hh defect 23985, text alignment for mirrored page
					if(lang != null)
						surveyBean.setLangcode(lang);
					surveyBean.composeQuestionAnswer(surveyId, out, serverContextPath);
					// END OF QUESTION
					%>
			 
			 

            
			

			
				

<tr aabgcolor="#EEEEEE"> 
  <td align="center"> 
    <table width="700" role="presentation"> 
 

         <!-- Footer goes here -->
		 <tr>
			 <td colspan="3" class="footer" align="center">
			 <br><br><br><br>
				 <%
					String footerName = "";   						
					if(surveyBean.getTemplFooter() != null)
					{
						footerName = surveyBean.getTemplFooter();
						surveyBean.setTemplFooter(null);
						//bidi-hcg-hh start
						if(isBidiEnabled) {
							footerName = BidiUtils.enforceBidiDirection (footerName,BidiUtils.getMboTextDirection("sur_template", "footer", true));                                 								
						} 	
						//bidi-hcg-hh end
					}

				 %>
			  <%=footerName %>
			 <br><br>
			</td>
		 </tr>



    </table>  
 </td> 
</tr>
			 
 		 


</table>



 

			
			<center>
				<table role="presentation">
		    		<tr>
		    			<td colspan=9 align="center">
		    				<input type="submit" value=	<%=Messages.getString("SURVEY_SUBMIT")%>>
		    			</td>
		    		</tr>
		    	</table>
	    	</center>
    	</form>

		</body></html>

<!--%= footer %-->
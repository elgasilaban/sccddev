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
	Connection connection = aweval.getConnection();
	Statement stmt = connection.createStatement();
	
	String itemid = request.getParameter("itemid");
	String hid = "";
	String query = "";
	ResultSet rs = null;
	
	boolean rsloaded = false;
	
	String sid = aweval.getSurveyID(request);
	if (sid == null)  //Then the default Survey has not been set.
		{
		aweval.setMessage("");
		connection.close();
		response.sendRedirect("./index.jsp");
		}
	
	String html[] = aweval.getHtml(request);
	String header = html[0];
	String footer = html[1];

    if (itemid == null)
    	itemid = "000";

    query = "Select item, itemshortname from survey_itemid where itemid='"+itemid+"'";

    String item = "";
    String shortName = "";
    if (!itemid.equals("000"))	
    	{
        //java.sql.Statement stmt2 = connection.createStatement();
        rs = stmt.executeQuery(query);
        if (rs.next())
        	{
        	item = rs.getString("item");
        	shortName = rs.getString("itemshortname");
            }
        else
            {
            item = "Standard";
            shortName = "standard";
            }
        }
		out.println(aweval.replaceTag(header,"<itemname>",item));
		%>	
		<table>
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
<%= footer %>
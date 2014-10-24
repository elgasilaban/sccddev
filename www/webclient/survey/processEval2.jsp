<%@page contentType="text/html; charset=UTF-8"%>
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page import="java.util.*,java.sql.*"%>

<%@page import="psdi.mbo.MaxSequence,psdi.configure.CommonShell"%>
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<%
//System.err.println("\n  arrivio in processEval2.jsp -----  ");
request.setCharacterEncoding("UTF-8");
String userMessage="You are not Logged in";
String databaseProductName = aweval.getDatabaseProductName();

/*
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
*/
%>

<%

	Connection connection = aweval.getConnection();
	connection.setAutoCommit(false);
	boolean wroteData = false;
    Statement stmt = connection.createStatement();
    Statement stmt2 = connection.createStatement();

    Timestamp ts = new Timestamp(System.currentTimeMillis());

	String fname = request.getParameter("fname");
	if (fname == null)
		fname = "";
	String lname = request.getParameter("lname");
	if (lname == null)
		lname = "";	
	String company = request.getParameter("company");
	if (company == null)
		company = "";	
	String email = request.getParameter("email");
	if (email == null)
		email = "";	
	String sid = request.getParameter("sid");
	if (sid == null)
		sid = "";	

	String recordClass = request.getParameter("recordClass");
	String recordKey = request.getParameter("recordKey");

	//System.err.println("\n  arrivio in processEval2.jsp ----- recordKey ="+recordKey+"---recordClass ="+recordClass);


    String currentDateFormat="MM/dd/yyyy HH:mm:ss";
	String currentSqlDateFormat="MM/dd/yyyy hh24:mi:ss";


    String itemid = request.getParameter("itemid");
    String returnLink = aweval.getReturnLink(request);
    if (itemid == null || itemid.equals("000") || itemid.equals("null"))
		{
		connection.close();
		response.sendRedirect(returnLink);
		}	
    
    
String rspInsert = "";
String currentDate = aweval.getCurrentDate(currentDateFormat);
	if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
	{
		//it's for oracle
		rspInsert = "insert into survy_submission (survy_submissionid,rid,createtime,fname, lname, email, company, itemid, sid,recordkey,recordclass) values(survy_submissionseq.nextval,survy_submissionseq.nextval,to_date('"+currentDate+"','"+currentSqlDateFormat+"'),'"+fname+"','"+lname+"','"+email+"','"+company+"','"+itemid+"',"+sid+",'"+recordKey+"','"+recordClass+"')";
	} else
	if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
	{
		/* venkyg : it's for db2 */
rspInsert = "insert into survy_submission (survy_submissionid,rid,createtime,fname, lname, email, company, itemid, sid,recordkey,recordclass) values(nextval for survy_submissionseq, nextval for survy_submissionseq,'"+ts+"','"+fname+"','"+lname+"','"+email+"','"+company+"','"+itemid+"',"+sid+",'"+recordKey+"','"+recordClass+"')";  
	} else
	{
		/*
		long survy_submissionid = MaxSequence.generateKey(connection, "survy_submission", "survy_submissionid");
		long rid = MaxSequence.generateKey(connection, "survy_submission", "rid");
		
		rspInsert = "insert into survy_submission (survy_submissionid,rid,createtime,fname, lname, email, company, itemid, sid,recordkey,recordclass) values ";
		rspInsert += "(" +survy_submissionid +","+ rid + ",CAST('"+currentDate+"' as datetime),'"+fname+"','"+lname+"','"+email+"','"+company+"','"+itemid+"',"+sid+",'"+recordKey+"','"+recordClass+"')"; */
		 
		rspInsert = "insert into survy_submission (survy_submissionid,rid,createtime,fname, lname, email, company, itemid, sid,recordkey,recordclass) values(survy_submissionseq.nextval,survy_submissionseq.nextval,CAST('"+currentDate+"' as datetime),'"+fname+"','"+lname+"','"+email+"','"+company+"','"+itemid+"',"+sid+",'"+recordKey+"','"+recordClass+"')";
		 

		rspInsert = CommonShell.reformatForSqlsvr(aweval.getConnection(), rspInsert); 
	}
							
//System.err.println("\n 0000000000000  arrivio in processEval2.jsp -----ARRIVIO 1111  rspInsert = "+rspInsert);	
	stmt.execute(rspInsert);
    int rid = 0;
    //String sel = "select rid from survy_submission where createtime = '"+ts+"'";

//System.err.println("\n  arrivio in processEval2.jsp -----ARRIVIO 1111  ");	

String sel = "";
if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
	{
		//it's for oracle
		sel = "select rid from survy_submission where createtime = to_date('"+currentDate+"','"+currentSqlDateFormat+"')";
	} else
	if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
	{
		/* venkyg : it's for db2 */
      sel = "select rid from survy_submission where createtime = '"+ts+"'";
	} else
	{
		 sel = "select rid from survy_submission where createtime = CAST('"+currentDate+"' as datetime)";
	}

//System.err.println("\n  arrivio in processEval2.jsp -----ARRIVIO 2222 sel =  "+sel);	


    ResultSet rs1 = stmt.executeQuery(sel);
    if (rs1.next()) 
	   rid = rs1.getInt("rid");

//System.err.println("\n  arrivio in processEval2.jsp -----ARRIVIO 222211111 rid =  "+rid);

        Enumeration paramNames = request.getParameterNames();
        String insert = "";
	    while(paramNames.hasMoreElements())
	    {
	      String paramName = (String)paramNames.nextElement();

	      String[] paramValues =  request.getParameterValues(paramName);

	      if (paramName.indexOf("q_") > -1)
	      	paramName = paramName.substring(2,paramName.length());
	      else 
			  if (paramName.indexOf("f_") > -1)
	      	{
	      	paramName = paramName.substring(2,paramName.length());
	      	String paramValue = paramValues[0];
	      	if (paramValue.length() == 0)
	      		continue;
			
			

			if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
				{
					//it's for oracle
					insert = "insert into sur_response_fre (sur_response_freid, rid, qid, answer, createtime, itemid) values (sur_response_freseq.nextval,"+rid+","+paramName+",'"+aweval.substrOrLess(aweval.repTick(paramValue),1255)+"',to_date('"+currentDate+"','"+currentSqlDateFormat+"'),'"+itemid+"')";

				} else
				if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
				{
					/* it's for db2*/
						insert = "insert into sur_response_fre (sur_response_freid, rid, qid, answer, createtime, itemid) values (nextval for sur_response_freseq,"+rid+","+paramName+",'"+aweval.substrOrLess(aweval.repTick(paramValue),1255)+"','"+ts+"','"+itemid+"')";
				} else
				{ 
		long sur_response_freid = MaxSequence.generateKey(connection, "sur_response_fre", "sur_response_freid");
		insert = "insert into sur_response_fre (sur_response_freid, rid, qid, answer, createtime, itemid) values (" + sur_response_freid + ","+rid+","+paramName+",'"+aweval.substrOrLess(aweval.repTick(paramValue),1255)+"',CAST('"+currentDate+"' as datetime),'"+itemid+"')";
				}

					//System.err.println("\n  arrivio in processEval2.jsp -----ARRIVIO 3333  ");	
						stmt2.execute(insert);
						wroteData = true;
						continue;      	
	      	}
	      else
	      	continue;
	      if (paramValues.length == 1)
	      {
	        String paramValue = paramValues[0];
	        if (paramValue.length() == 0)
	          continue;
	        else
	          {
					if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
						{
							//it's for oracle
							insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values (sur_response_subseq.nextval,"+paramValue+","+rid+",to_date('"+currentDate+"','"+currentSqlDateFormat+"'),'"+itemid+"')"; 

						} else
						if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
						{
							/* it's for db2 */
				insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values (nextval for sur_response_subseq,"+paramValue+","+rid+",'"+ts+"','"+itemid+"')"; 
						} else
						{
							long sur_response_subid = MaxSequence.generateKey(connection, "sur_response_sub", "sur_response_subid");
							insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values ("+sur_response_subid+","+paramValue+","+rid+",CAST('"+currentDate+"' as datetime),'"+itemid+"')"; 
						}


					stmt2.execute(insert);
					wroteData = true;
	          }
	      }
	      else
	      {
	        for(int i=0; i<paramValues.length; i++)
	        {
					if(databaseProductName != null && databaseProductName.equals(aweval.oracleProductName))
						{
							//it's for oracle
							insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values (sur_response_subseq.nextval,"+paramValues[i]+","+rid+",to_date('"+currentDate+"','"+currentSqlDateFormat+"'),'"+itemid+"')";

						} else
						if(databaseProductName != null && databaseProductName.startsWith(aweval.db2ProductName))
						{
							/* it's for db2 */
			insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values (nextval for sur_response_subseq,"+paramValues[i]+","+rid+",'"+ts+"','"+itemid+"')";
						} else
						{
							long sur_response_subid = MaxSequence.generateKey(connection, "sur_response_sub", "sur_response_subid");
							insert = "insert into sur_response_sub (sur_response_subid,aid, rid, createtime, itemid) values ("+sur_response_subid+","+paramValues[i]+","+rid+",CAST('"+currentDate+"' as datetime),'"+itemid+"')";
						}


				stmt2.execute(insert);
				wroteData = true;
	        }
	      }
		}
		if (wroteData)
			connection.commit();
		else
			connection.rollback();
		connection.setAutoCommit(true);
stmt.close();
stmt2.close();
connection.close();
response.sendRedirect(returnLink);
%>

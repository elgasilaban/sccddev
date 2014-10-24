<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--  
Licened Materials - Property of IBM
Restricted Materials of IBM

(c) Copyright IBM Corporation
-->
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*,java.util.Calendar"%>	
<jsp:useBean id="aweval" scope="session" class="com.ibm.tsd.pmcom.survey.EvalBean" />
<jsp:useBean id="ident" scope="session" class="com.ibm.tsd.pmcom.survey.IamBean" />
<%
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
	
	String uid = ident.getUid();
	String uidClause = "userid='"+uid+"' ";
	//if (uid.equals("admin"))
	//	uidClause = "uid like '%' ";	
String action = request.getParameter("action");
if (action !=null && action.equals("export"))
	{
	String extitle = request.getParameter("extitle");
	if (extitle==null)
		extitle = "";

	System.err.println("\n arrivio in reportman.jsp --getServletConfig() is not null = "+getServletConfig().getServletContext().getRealPath("/"));
     response.sendRedirect("./export/"+aweval.createExport(getServletConfig().getServletContext().getRealPath("/"),uid,extitle));
	}	
if (ident.getUid().equals("admin") ) response.sendRedirect("./tableman.jsp");	
%>

<jsp:include page="/webclient/survey/resource/fieraheader.jsp" flush="true"/>
	<table width="100%" border=1>
		<tr>
			<td align="center" valign="top">
				<%
					String [] pageNav = new String[4];
					int activeTab = 1;
					//pageNav[0] ="Question Report";					
					pageNav[0] ="Freeform Questions";
					pageNav[1] ="Individual Evaluations";
					pageNav[2] ="Arrival Report";
					pageNav[3] ="Public Reports";
					
					String [] pageNavTargets = new String[4];
					//pageNavTargets[0] ="./reportman.jsp";
					pageNavTargets[0] ="./rollup.jsp";					
					pageNavTargets[1] ="./evallist.jsp";
					pageNavTargets[2] ="./arrivals.jsp";
					pageNavTargets[3] ="./pubreport.jsp";
					
					aweval.pageNav(out, pageNav, pageNavTargets, activeTab);

				Calendar lastday = Calendar.getInstance();
				Calendar firstday = Calendar.getInstance();
				
				String [] months = {"January","February","March","April","May","June","July","August","September","October","November","December"};
				String yearParam = request.getParameter("year");
				if (yearParam==null)
					yearParam = Integer.toString(firstday.get(firstday.YEAR));
				String monthParam = request.getParameter("month");
				String evalPeriod = "Year: "+firstday.get(firstday.YEAR);
				int navMonth = -1;				
				if (monthParam != null && !monthParam.equals("null"))
					{
					firstday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
					lastday.set(Integer.parseInt(yearParam),Integer.parseInt(monthParam),1,0,0,0);
					lastday.add(lastday.MONTH,1);
					navMonth = firstday.get(firstday.MONTH);
					evalPeriod = "Month: "+months[firstday.get(firstday.MONTH)]+", "+firstday.get(firstday.YEAR);				
					}
				else
					{
					firstday.set(Integer.parseInt(yearParam),0,1,0,0,0);
					lastday.set(Integer.parseInt(yearParam),0,1,0,0,0);
					lastday.add(lastday.YEAR,1);
					evalPeriod = "Year: "+firstday.get(firstday.YEAR);					
					}
				//We will either come in with a month and a year specified or just a year
				// if no month specified then we will show results for a year
				// else we will show results for the given month
				String tsPeriod = " createtime < '"+new Timestamp(lastday.getTime().getTime()) + "' and createtime >= '"+new Timestamp(firstday.getTime().getTime()) + "'";								
				
				String [] col = {"itemshortname","item","cnt"};
				String [] ord = {"asc","asc","desc"};
				
				int colNum = 2;
				String colItem = request.getParameter("col");
				if (colItem!=null)
					colNum = Integer.parseInt(colItem)-1;
				
				Connection connection = aweval.getConnection();
				Statement stmt = connection.createStatement();
				ResultSet rs = null;
				String itemname="";
				String qid = request.getParameter("qid");
				String qidClause = "qid > 0";
				if (qid != null)
					qidClause = "qid ="+qid;
					
			    String qry = "";

				String itemid = request.getParameter("itemid");
			 	String sid = aweval.getSurveyID(request);			    

				String item = "All Responses";
				String itemShortName = "all";
				String itemidClause = "itemid like '%' ";
				String typeClause = "type = 'A' ";
				String sidClause = "sid > 0 ";
				if (sid != null)
					sidClause = "sid = "+sid;
					
				rs = stmt.executeQuery("select item, itemshortname from survey_itemid where itemid= '"+itemid+"'");
				if (rs.next())
					{
						itemShortName = rs.getString("itemshortname");
						item = rs.getString("item");
						itemidClause = "itemid='"+itemid+"' ";
						typeClause = "type like '%' ";
						//sidClause = "sid = "+aweval.getSurveyID(itemid);				
					}
			    
			    //ResultSet rs1 = stmt.executeQuery(qry);
			    //ResultSet rs3 = null;
			    String checked = "";
				//String qry4= "select question, qid from survey_questions where "+uidClause+" and type='A' and Style='F'  and active <> 'D' and active <> 'F' ";

				//rs3 = stmt.executeQuery(qry4);
				String title = evalPeriod +" Report&nbsp;Management:&nbsp;Totals&nbsp;for&nbsp;"+item;
				
			    int itemPageSize = 10;
			    int pageCnt = 5;
			    
		        String stringIpos = request.getParameter("ipos");
			    int ipos = 0;
			    if (stringIpos != null)
			    	ipos = Integer.parseInt(stringIpos);
		        
				%>

			</td>
		</tr>
		<tr>
			<th>
				<font size=4><%= title %></font>
			</th>
		</tr>		
		<tr>
			<td height=240 align="center">
			<!--	Begin			WorkPage  -->							
				<TABLE cellpadding="0" cellspacing="0">
				  	<tr>
				  		<td>
				  			<table>
				  				<tr>
				  				
							    	<td align="center" width="100%">
							   			<%
							    		aweval.navTable(out,yearParam,navMonth,itemid,"./reportman.jsp",uidClause);
							    		%>
							    	</td>
							  	</tr>
							  	
							  </table>
						</td>
				  	<tr>
				  		<td>
				  			<hr>
				  		</td>
				  	</tr>			    		  			
					<tr>
						<td  valign="top">
							<table border=1 width=100%>
							<%
				  			qry = "select concat('<a href=\"./evalan.jsp?year="+yearParam+"&month="+monthParam+"&itemid=',concat(t2.itemid,concat('\">',concat(t2.itemshortname,'</a>')))) Shortname, t2.item Item, case when t1.cnt is null then 0 else t1.cnt end Cnt from (select itemid, count(*) cnt from survy_submission where "+tsPeriod+" and "+itemidClause+" group by itemid) t1 right outer join (select * from survey_itemid where "+uidClause+") t2 on t1.itemid=t2.itemid order by "+col[colNum]+" "+ord[colNum];
				  			//System.out.println("select t2.itemshortname t2.item Item, case when t1.cnt is null then 0 else t1.cnt end Cnt from (select itemid, count(*) cnt from survy_submission where "+tsPeriod+" and "+itemidClause+" group by itemid) t1 right outer join (select * from survey_itemid where "+uidClause+") t2 on t1.itemid=t2.itemid order by "+col[colNum]+" "+ord[colNum]);
							String getExportAggRsp = "select  t2.item Item, t2.itemshortname Shortname, case when t1.cnt is null then 0 else t1.cnt end Cnt from (select itemid, count(*) cnt from survy_submission where "+tsPeriod+" and "+itemidClause+" group by itemid) t1 right outer join (select * from survey_itemid where "+uidClause+") t2 on t1.itemid=t2.itemid order by "+col[colNum]+" "+ord[colNum];
							//System.out.println(getExportAggRsp);
				  			aweval.setExportQuery(getExportAggRsp);
				  			rs = stmt.executeQuery(qry);
						   	{
							%>
								<tr bgcolor="#9999ff">
								<%			   	
								ResultSetMetaData rsmd = rs.getMetaData();
								int colCount = rsmd.getColumnCount();
									for (int i = 1; i <= colCount; i ++)
									{
										out.println("<th><a href=\"./reportman.jsp?col="+i+"&year="+ yearParam +"&month="+ monthParam +"&itemid="+ itemid +"\">"+rsmd.getColumnName(i)+"</a></th>");
									}
								%>
								</tr>
								<%
								int rowcnt = 0;
								String rowcolor = "#9999ff";
								String data ="";
								String itemNames="";
							
								while (rs.next())
								{
								if (rowcnt++ < ipos*itemPageSize || rowcnt > ((ipos+1)*itemPageSize)) continue;
								if (rowcnt%2 == 0)
									rowcolor = "#cccccc";
								else rowcolor = "#ffffff";
				
								%>
								<tr bgcolor="<%= rowcolor %>">
								<%
								for (int i = 1; i <= colCount; i ++)
									{
									%>
									<td><%= rs.getString(i) %></td>
									<%
									}
								%>
								</tr>
								<%
								}
							}
							%>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%">
								<tr>
									<td align="left">
							<%
							int icnt = 0;
							qry = "select count(*) cnt from survey_itemid where "+uidClause;
							rs = stmt.executeQuery(qry);
							if (rs.next())
								icnt = rs.getInt("cnt");
							%>
							Page:
							<%
								aweval.pageCount(out, "./reportman.jsp?col="+(colNum+1)+"&year="+ yearParam +"&month="+ monthParam +"&itemid="+ itemid +"&ipos=", ipos, icnt, pageCnt, itemPageSize);
							%>
									</td>
									<td align="right">
										Right click to save <a href="./reportman.jsp?action=export&extitle=<%= title %>">Export Data</a>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>					
				</TABLE>			
			<!--		End		WorkPage  -->
			</td>
		</tr>
		<jsp:include page="/webclient/survey/resource/redir.jsp" flush="true"/>
	</table>
<jsp:include page="/webclient/survey/resource/fierafooter.jsp" flush="true"/>
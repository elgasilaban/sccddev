<%--
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-M19
 *
 * (C) COPYRIGHT IBM CORP. 2006
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%>


<%@ page import="java.util.*"%>
<%@ page import="java.io.File"%>
<%@ page import="psdi.util.MXSession"%>
<%@ page import="psdi.mbo.MboSetRemote"%>
<%@ page import="psdi.mbo.MboRemote"%>
<%@ page import="com.ibm.ism.pmsc.catalog.PmScCatalogIndex"%>

<%
  String mboName = "PMSCCATDATA";
  String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
  	
  MXSession mxSession = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
  MboSetRemote mboSet = (MboSetRemote) mxSession.getMboSet(mboName);
  
  Calendar cal1 = Calendar.getInstance();
  long start = cal1.getTimeInMillis();
  
  long count = PmScCatalogIndex.createCatalogIndex(mboSet);	
  
  Calendar cal2 = Calendar.getInstance();
  long finish = cal2.getTimeInMillis();
  long spend = finish-start;
%>
<html>
<head>
<BASE HREF="<%= servletBase%>/webclient/utility">
<title>Service Catalog indexing</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style>
		table.bgnavbar {	background-color: #305F90; 
						color: #C9E3F2; 
						font-family: Arial, Helvetica, sans-serif; 
						font-size: 11px; 
						font-style: normal; 
						font-weight: bold; 
						background-image: url(../../images/bg_navbar.gif); 
						background-repeat: no-repeat; background-position: right top; 
						line-height: 27px; 
						vertical-align:top; 
					}
	.navbar { 	color: #FFFFFF; 
				line-height: 27px; 
				vertical-align:top; 
				padding-top: 0px; 
				padding-right: 30px; 
				padding-bottom: 0px; 
				padding-left: 30px; 
			}
			
	td.txtappname {	color: #FFFFFF; 
					font-family: Arial, Helvetica, sans-serif; 
					font-size: 12px; 
					font-style: normal; 
					font-weight: bold; 
				}
				
	a.powerwhite {	color:#ffffff;
					font-size:8pt;
					font-weight:bold; 
					text-decoration:none;
					padding-left:10px;
					padding-right:10px; 
					vertical-align:top;
				}
	a.powerwhite:hover{	color:#ffffff;
						text-decoration:underline;
					}

	.maintable{ display:inline;padding:2px;font-family:verdana;font-size:10pt;
			}
	.helptable{	border:1px solid #999999;background-color:#E7E7E7;font-size:8pt;
			}
	.preslink{	color:#FFFFFF;cursor:hand;border:1px solid #000000;background-color:#6699CC;padding-left:10px;padding-right:10px;font-size:8pt;font-family:verdana
			}
	.utillink{	color:#000000;cursor:hand;border:1px solid #E7E7E7;border-bottom:1px solid #000000;border-right:1px solid #000000;background-color:#C0C0C0;padding-left:10px;padding-right:10px;font-size:8pt;font-family:verdana
			}
	.utillinkdown{ color:#000000;cursor:hand;border:1px solid #E7E7E7;border-bottom:1px solid #000000;border-right:1px solid #000000;background-color:#C0C0C0;padding-left:10px;padding-right:10px;font-size:8pt;font-family:verdana
			}
	</style>
</head>
<body style="margin:0px">
<table width="100%" cellspacing="0" cellpadding="0" border="0" class="bgnavbar" control="true">
	<tr>
		<td rowspan="2" width="1%" class="bgnavbar">
			<a id="appImageAnchor" title="" href="javascript: enableDoc();"><img class="appimage" border="0" src="<%=servletBase%>/webclient/images/appimg_generic.gif" align="right" hspace="0" alt=""></a>
		</td>
		<td class="txtappname" align="left" width="100%">
			Service Catalog Indexing
		</td>
		<td class="navbar" nowrap style="padding-right:10px">
			<a class='powerwhite' href='../webclient/utility/merlin.jsp' title='Start Center' >
				<img border='0' title='Start Center' alt='Start Center' src='../webclient/images/btn_startcenter.gif' align='absmiddle'>&nbsp;Start Center
			</a>
		</td>
	</tr>
</table>
<form name="IMPORT" enctype="multipart/form-data" method="post" action="<%=servletBase%>/webclient/utility/setfile.jsp">
<input type="hidden" NAME="event" VALUE="importapp">
	<table width="50%" cellspacing="0" align="center" class="maintable">
		<tr>
			<td colspan="2">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td colspan="2">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td colspan="2">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td colspan="2" align="Center">
				<br><br><h3><span style='color:#336699'><%=count%> Service Catalog items indexed.</span></h3>
    			<br><br><h3><span style='color:#336699'>in <%=spend%> miliseconds.</span></h3>
			</td>
		</tr>
	</table>
</form>
</body>
</html>


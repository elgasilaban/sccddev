<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page import="java.util.*,psdi.webclient.system.runtime.*,psdi.webclient.system.session.*"                 
%>
<%
  String msgtext = "<span style='color:red'>Import was unsuccessful, please check application server log.</span>";
  String getSqlTxt = "&nbsp;";
  String getSqlTxtAll = "&nbsp;";
  String getNoLabelSqlTxt = "&nbsp;";
  String impsuccess = request.getParameter("success");
	String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
  	String filename = request.getParameter("value");
	filename = (filename == null) ? "" : filename;
	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	WebClientRuntime wcr = psdi.webclient.system.runtime.WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	String sessionid = wcs.getUISessionID();
	boolean success = (impsuccess == null) ? false : impsuccess.equals("true");
	if(success)
	{
		String applicationId = request.getParameter("appid");
		applicationId = (applicationId == null) ? "<unknown>" : applicationId;
		msgtext = "Import of application " + applicationId + " was successful<br><br><a href='../ui/maximo.jsp?event=loadapp&value="+applicationId+"&"+WebClientSessionManager.UISESSIONID+"="+request.getParameter(WebClientSessionManager.UISESSIONID)+"&" + WebClientSessionManager.CSRFTOKEN + "=" + wcs.getCSRFToken() + "'>Loadapp "+applicationId+"</a>";
    	getSqlTxt = "<a href='../ui/"+applicationId+".ora?event=exportsql&targetid="+applicationId+"&"+WebClientSessionManager.UISESSIONID+"="+request.getParameter(WebClientSessionManager.UISESSIONID)+"&" + WebClientSessionManager.CSRFTOKEN + "=" + wcs.getCSRFToken() + "'>Save SQL</a> for presentation";
        getSqlTxtAll = "<a href='../ui/"+applicationId+".ora?event=exportsqlall&"+WebClientSessionManager.UISESSIONID+"="+request.getParameter(WebClientSessionManager.UISESSIONID)+"&" + WebClientSessionManager.CSRFTOKEN + "=" + wcs.getCSRFToken() + "'>Save SQL</a> for presentation (also writes all presentations to disk)";
	}
%>
<%String defaultAlign="left";
	String reverseAlign="right";
	boolean rtl = false;
	String langcode = s.getUserInfo().getLangCode();
	if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE"))
	{
		defaultAlign="right";
		reverseAlign="left";
		rtl = true;
	}
	%>
<html>
<head>
<BASE HREF="<%= servletBase%>/webclient/utility">
<title>Import Presentation Status</title>
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
				padding-<%=reverseAlign%>: 30x; 
				padding-bottom: 0px; 
				padding-<%=defaultAlign%>: 30x; 
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
					padding-<%=defaultAlign%>:10px;
					padding-<%=reverseAlign%>:10px; 
					vertical-align:top;
				}
	a.powerwhite:hover{	color:#ffffff;
						text-decoration:underline;
					}

	.maintable{ display:inline;padding:2px;font-family:verdana;font-size:10pt;
			}
	.helptable{	border:1px solid #999999;background-color:#E7E7E7;font-size:8pt;
			}
	.preslink{	color:#FFFFFF;cursor:hand;border:1px solid #000000;background-color:#6699CC;padding-<%=defaultAlign%>:10px;padding-<%=reverseAlign%>:10px;font-size:8pt;font-family:verdana
			}
	.utillink{	color:#000000;cursor:hand;border:1px solid #E7E7E7;border-bottom:1px solid #000000;border-right:1px solid #000000;background-color:#C0C0C0;padding-<%=defaultAlign%>:10px;padding-<%=reverseAlign%>:10px;font-size:8pt;font-family:verdana
			}
	.utillinkdown{ color:#000000;cursor:hand;border:1px solid #E7E7E7;border-bottom:1px solid #000000;border-right:1px solid #000000;background-color:#C0C0C0;padding-<%=defaultAlign%>:10px;padding-<%=reverseAlign%>:10px;font-size:8pt;font-family:verdana
			}
	</style>
</head>
<body style="margin:0px">
<table width="100%" cellspacing="0" cellpadding="0" border="0" class="bgnavbar" control="true">
	<tr>
		<td rowspan="2" width="1%" class="bgnavbar">
			<a id="appImageAnchor" title="" href="javascript: enableDoc();"><img class="appimage" border="0" src="<%=servletBase%>/webclient/images/appimg_generic.gif" align="<%=reverseAlign%>" hspace="0" alt=""></a>
		</td>
		<td class="txtappname" align="<%=defaultAlign%>" width="100%">
			Import MAXIMO Presentation
		</td>
		<td class="navbar" nowrap style="padding-<%=reverseAlign%>:10px">
			<a class='powerwhite' href='../ui/?event=loadapp&value=startcntr&<%=wcs.getUISessionUrlParameter()%><%=wcs.getCSRFTokenParameter()%>' title='Start Center' >
				<img border='0' title='Start Center' alt='Start Center' src='../webclient/images/btn_startcenter.gif' align='absmiddle'>&nbsp;Start Center
			</a>
		</td>
	</tr>
</table>
<form name="IMPORT" enctype="multipart/form-data" method="post" action="<%=servletBase%>/webclient/utility/setfile.jsp?<%=wcs.getUISessionUrlParameter()%><%=wcs.getCSRFTokenParameter()%>">
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
			<td align="<%=reverseAlign%>">
				<b>Filename:</b>
			</td>
			<td align="<%=defaultAlign%>">
				<input id="file" type="file" name="value" size="105" value="<%=filename%>" accept="text/css" ondeactivate="enabled();" onchange="enabled();">
			</td>
		</tr>
		<tr>
			<td colspan="2">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<input disabled type="submit" id="doimport" onclick="freezebutton()" value="Import">
			</td>
		</tr>
		<tr>
			<td colspan="2" align="Center">
				<br><br><h3><%=msgtext%></h3>
			</td>
		</tr>
		<tr>
			<td colspan="2" align="Center">
				<br><h3><%=getSqlTxt%></h3>
			</td>
		</tr>
        <tr>
            <td colspan="2" align="Center">
                <br><h3><%=getSqlTxtAll%></h3>
            </td>
        </tr>
	</table>
</form>
<script language="JavaScript" type="text/javascript">
function enabled()
{
	f = document.getElementById('file');
	i = document.getElementById('doimport');
	dis = true;
	if(f.value!='' && (f.value.toLowerCase().indexOf("xml") == f.value.length-3))
	{
		dis=false;
	}
	i.disabled=dis;
}

function freezebutton()
{
  document.getElementById('doimport').disabled=true;
  document.forms['IMPORT'].submit();
}
</script>
</body>
</html>
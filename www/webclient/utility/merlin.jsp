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
--%><%@ page buffer="64kb" autoFlush="true" import="java.util.*"%><%
	response.setHeader("Pragma", "No-cache");
	response.setDateHeader("Expires", 0);
	response.setHeader("Cache-Control", "no-cache");

	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	String langcode = s.getUserInfo().getLangCode();
	boolean rtl = false;
	if(langcode.equalsIgnoreCase("AR") || langcode.equalsIgnoreCase("HE"))
	{
		rtl = true;
	}
%>
<%@page import="psdi.webclient.system.runtime.WebClientRuntime"%><html>
	<head>
		<meta http-equiv="Pragma" content="no-cache">
		<style>
			td { font-size:8pt;font-family:verdana }
		</style>
	</head>
	
	<body dir="<%=rtl?"rtl":"ltr"%>">
		<img id="waitimage" src="../images/invis.gif" style="position:absolute;top:0;left:0;visibility:hidden;z-index:30;height:0;width:0;cursor:wait" ondblclick='dblClickWait()' DISABLED />
		<table class="maintable" cellpadding="0" cellspacing="10">
			<tr>
				<td>
					<img src="../images/appimg_dialogs.gif" align="absmiddle"><span style="font-weight:bold; font-size:14pt">Welcome to MAXIMO</span>
				</td>
				<td>
					<a href="import.jsp">Import a Presentation</a>
				</td>
			</tr>
		</table>
		<table id="links" border="0">
			<tr>
<%
			psdi.util.MXSession mxs = (psdi.util.MXSession)session.getValue("MXSession");

			psdi.mbo.MboSetRemote mboset = mxs.getMboSet("maxpresentation");
			mboset.setOrderBy("app asc");
			mboset.reset();

			String[] presAttrs = {"app"};
			psdi.mbo.MboValueData[][] mvd = mboset.getMboValueData(0, 500, presAttrs);

			Set presnames = new HashSet();
			for (int x=0; x < mvd.length; x++)
			{
				String name = mvd[x][0].getData().toLowerCase();
				presnames.add(name);
			}

			mboset = mxs.getMboSet("maxapps");
			mboset.setOrderBy("description asc");
			mboset.reset();
			String[] appAttrs = {"app", "description" };
			mvd = mboset.getMboValueData( 0, 500, appAttrs);

			int wrapLength = mvd.length / 5;
			for (int x = 0; x < mvd.length; x++)
			{
				String app = mvd[x][0].getData().toLowerCase();
				if(presnames.contains(app))
				{	
					String desc = mvd[x][1].getData().toLowerCase();
					if(x % wrapLength == 0)
					{
%>					<td valign="top">
<%					}
%>						<a href="../../ui/?event=loadapp&targetid=<%=app%>&value=<%=app%>"><span style="text-transform:capitalize; white-space: nowrap"><%=desc%></span><br/></a>
<%					if(x > 1 && x - 1 % wrapLength == 0)
					{
%>					</td>
<%					}
				}
			}
%>			</tr>
		</table>
	</body>
</html>
<script>
function formLoaded()
{
<%	String message = (String)session.getAttribute("signoutmessage");
	if (message != null)
	{
		session.removeAttribute("signoutmessage");	%>
	alert('<%=message%>');
<%	}	%>
}

function showWait()
{
	if(waitimage != null)
	{
		waitimage.style.cursor="wait"
		waitimage.style.visibility = "visible"
		waitimage.style.height = parseInt(document.body.clientHeight)+document.body.scrollTop
		waitimage.style.width = parseInt(document.body.clientWidth)+document.body.scrollLeft
		waitimage.style.zIndex = "30"
	}
}

window.onbeforeunload = showWait
window.onload = formLoaded;
</script>
<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="java.net.URLEncoder"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%
	Hashtable reportParams = (Hashtable)app.get("spawnreport");
	app.remove("spawnreport");
	if(!component.needsRender() && reportParams != null)
	{
		// Silent printing
		if (reportParams.containsKey("submitPrintJob") && ((Boolean)reportParams.get("submitPrintJob")).booleanValue())
		{
			String urlToOpen = request.getContextPath() + "/webclient/utility/quickprint/printjobspooler.jsp";
%>		<finalscript>
		printW = window.open("<%=urlToOpen%>","",'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,left=450,top=350,width=30,height=10');
		printW.resizeTo(300,175);
		printW.focus();
		</finalscript>
<%		}
		else
		{
			String reportType=(String) reportParams.get("reportType");
			String targetValue = reportType;
			if (targetValue == null)
			{
				targetValue = "DefaultTarget";
			}
			targetValue += wcs.getUISessionID();
%>		<component id='<%=id%>_holder'><![CDATA[<script>
		var newWin = window.open("rptvw",decodeURIComponent("<%=URLEncoder.encode(targetValue)%>"));
		newWin.document.write("<html><body><form name=\"reportForm\" id=\"reportForm\" action=\"testAction\" target=\"<%=WebClientRuntime.makesafevalue(targetValue)%>\">");
<%			Object pKeys[] = reportParams.keySet().toArray();
			for(int i = 0; i < pKeys.length; i++)
			{
				String keyName=pKeys[i].toString();
				if(keyName.equals("__islocale"))
				{
					String value=(String) reportParams.get(keyName);
					StringTokenizer st= new StringTokenizer(value,"||");
					while(st.hasMoreTokens())
					{
%>						newWin.document.write("<input type=\"hidden\" ");
						newWin.document.write(" name=\"__islocale\" ");
						newWin.document.write(" value=\"<%=st.nextToken() %>\" ");
						newWin.document.write(">");
<%					}
				}
				else
				{
					if (reportParams.get(pKeys[i].toString()) instanceof String)
					{
						String paramValue = (String)reportParams.get(pKeys[i].toString());
						paramValue = paramValue.replace("\"", "&quot;");
						paramValue = paramValue.replace("\\", "\\\\");
						reportParams.put(pKeys[i].toString(), paramValue);
					}
%>					newWin.document.write("<input type=\"hidden\" ");
					newWin.document.write(" name=\"<%=pKeys[i].toString() %>\" ");
					newWin.document.write(" value = \"<%=reportParams.get(pKeys[i].toString()) %>\" ");
					newWin.document.write(">");
<%				}
			}
			if(reportType != null && reportType.equals("COGNOS"))
			{
				String completeURL = WebClientRuntime.getMaximoRequestURL(request);
				int index = completeURL.indexOf("/", 8);
				String url = completeURL.substring(0,index);
%>				newWin.document.write("<input type=\"hidden\" ");
				newWin.document.write(" name=\"mxserverurl\" ");
				newWin.document.write(" value=\"<%=url %>\" ");
				newWin.document.write(">");
<%			}
%>		newWin.document.write("</form></body></html>");
		var reportForm = newWin.document.forms[(newWin.document.forms.length - 1)];
		reportForm.action = "<%=reportParams.get("redir") %>";
		reportForm.method = "post";
		reportForm.submit();
		</script>]]></component>
<%		}
	}%>
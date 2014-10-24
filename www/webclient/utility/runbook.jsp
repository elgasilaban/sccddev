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
--%><%@ include file="../common/componentheader.jsp" %>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/css/<%if(rtl){%>RTL<%}%>maximo.css"/>
	</head>
	<body style="padding:0px;margin:0px;height:100%;background:#E7E7E7">
		<table cellspacing="0" style="width:100%">
			<tr>
				<td class="rbook" style="height:17px;border:1px solid #3a475a;padding:1px;padding-<%=defaultAlign%>:3px;padding-<%=reverseAlign%>:3px;">
					<table cellspacing="0" cellpadding="0" style="height:15px;margin:0px;">
						<tr>
							<td style="padding:0px;font-size:10px;color:#FFFFFF;width:100%;">
								RunBook
							</td>
							<td style="padding:0px;font-size:10px;color:#FFFFFF;width:20px">
								<img src="<%=IMAGE_PATH%>minimize.gif" style="margin:0px;" onclick="toggleRunbookHeight(this)" alt=""/>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<iframe style="height:100%;width:100%"></iframe>
				</td>
			</tr>
		</table>
	</body>
	<script>
		function toggleRunbookHeight(im)
		{
			rbook = parent.document.getElementById("runbookFrame");
			if(rbook)
			{
				if(rbook.style.height=="19px")
				{
					rbook.style.height="90px";
					im.src="<%=IMAGE_PATH%>minimize.gif";
				}
				else
				{
					rbook.style.height="19px";				
					im.src="<%=IMAGE_PATH%>maximize.gif";
				}
				parent.toggleRunbook("");
			}
		}
	</script>
</html>
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
--%>
<tr>
	<td class="<%=textcss%> pnc">
	    <%
	    	String img = "<img alt=\"\" src=\""+IMAGE_PATH +"btn_editportlet.gif\"  width=\"10\" height=\"11\" border=\"0\">";
	    	String slabel = control.getWebClientSession().getMessage("startcntr", (ismobile)?"portletnotsetuplbl_2":"portletnotsetuplbl_1", new String[]{img});
	    	out.print(slabel); 
	    %>		
	</td>
</tr>
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
--%><%@ include file="../common/componentheader.jsp" %>
<%
	String height = component.getProperty("height");
	String width = component.getProperty("width");
	String scroll = component.getProperty("scroll");
	String style = component.getProperty("style");
	String src = component.getProperty("src");
	boolean visible = Boolean.valueOf(component.getProperty("visible")).booleanValue();
	
	String sURL = request.getScheme() + "://" + request.getServerName() +":" + request.getServerPort();
	String sContext = request.getContextPath();
	String servPath = sURL+sContext;
	servPath = servPath+src;
	if(visible)
		{ 	%>
		<tr>
		  <td>
		    <div id="<%=id%>_iframe_div" align="middle" valign="top">	
			  <iframe id="<%=id%>_general_iframe" class="<%=cssclass%>" tabindex="-1" src="<%=servPath%>?controlId=<%=control.getId()%>&componentId=<%=component.getId()%>&uisessionid=<%=wcs.getUISessionID()%>&height=<%=height%>&width=<%=width%>" height="<%=height%>" width="<%=width%>" scrolling="<%=scroll%>" frameBorder="0" marginHeight="0" marginWidth="0" <%=componentEvents%>  style="<%=style%>" > </iframe>
	        </div>
		  </td>
		</tr>
<%		}	%>
<%@ include file="../common/componentfooter.jsp" %>


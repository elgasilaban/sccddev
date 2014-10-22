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
<%@ include file="../common/componentheader.jsp" %>
<%@ page import="com.ibm.tivoli.imi.controller.PartnerInfo"%>
<%
	String height = component.getProperty("height");
	String width = component.getProperty("width");
	String scroll = component.getProperty("scroll");
	String style = component.getProperty("style");
	String src = component.getProperty("src");
	String relationship = component.getProperty("relationship");
	if(relationship == null || relationship.trim().equals("")) {
		relationship = PartnerInfo.MBO_IS_THE_PERSON;
	}
	String saveconversation = component.getProperty("saveconversation");
	
	String sURL = request.getScheme() + "://" + request.getServerName() +":" + request.getServerPort();
	String sContext = request.getContextPath();
	String servPath = sURL+sContext;
	servPath = servPath+src;
	
	String iframeId = id.concat("_imicon_iframe");
	String paramMark = (src.indexOf("?") == -1 ? "?" : "&");
	String requestSource = servPath + paramMark + "iframeId=" + iframeId + "&relationship=" + relationship.replaceAll("[\\W]","") + "&saveconversation=" + saveconversation.replaceAll("[\\W]","") + "&controlid=" + control.getId().replaceAll("[\\W]","") + "&componentId=" + component.getId().replaceAll("[\\W]","") + "&" + wcs.getUISessionUrlParameter() + wcs.getCSRFTokenParameter();
	
	if(component.needsRender()) { 
%>
		<div id="<%=id%>_imicon_iframe_div" style="display:inline" align="left" valign="top">	
			<iframe id="<%=iframeId%>" class="<%=cssclass%>" src="<%=requestSource%>" height="<%=height%>" width="<%=width%>" scrolling="<%=scroll%>" frameBorder="0" marginHeight="0" marginWidth="0" <%=componentEvents%>  style="<%=style%>"></iframe>
		</div>
		<script>
<%
	}
%>
			addLoadMethod('document.getElementById("<%=iframeId%>").src="<%=requestSource%>"');
<% 
	if(component.needsRender())	{
%>
		</script>
<%
	}
%>
<%@ include file="../common/componentfooter.jsp" %>
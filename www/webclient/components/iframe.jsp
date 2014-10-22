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
--%><%@ include file="../common/simpleheader.jsp" %>
<%
	String height = component.getProperty("height");
	String width = component.getProperty("width");
	String scroll = component.getProperty("scroll");
	String style = component.getProperty("style");
	String src = component.getProperty("src");
	boolean visible = Boolean.valueOf(component.getProperty("visible")).booleanValue();
	
	//String sURL = request.getScheme() + "://" + request.getServerName() +":" + request.getServerPort();
	//String sContext = request.getContextPath();
	//String servPath = sURL+sContext;
	//servPath = servPath+src;
        String servPath = wcs.getMaximoRequestContextURL()+src;
	if (((psdi.webclient.components.Iframe)component).canSubmit() == true)
	{	%>
	<script>
		submituploadform(this);
	</script>
<%	}
	else 
	{
		if(visible)
		{ 	
			if (!designmode) 
				componentEvents = " onfocus=\"setCurrentfocusId(event,this);\"";
		
				String divAutoId="";
				String iframeAutoId="";
				if(automation) {
					divAutoId="automationId=\""+realId+"_iframe_div\"";
					iframeAutoId="automationid=\""+realId+"upload_iframe\"";
				}
			String servExt = ((servPath.indexOf("?")==-1)?"?":"&")+"controlId="+control.getId()+"&componentId="+component.getId()+"&"+wcs.getUISessionUrlParameter()+wcs.getCSRFTokenParameter();
		%>
		<div id="<%=id%>_iframe_div" <%=divAutoId%> style="display:inline" align="<%=defaultAlign%>" valign="top">	
			<iframe id="upload_iframe" allowtransparency="true" <%=iframeAutoId%> class="<%=cssclass%>" role="presentation" tabindex="0" src="<%=servPath%><%=servExt%>" height="<%=height%>" width="<%=width%>" scrolling="<%=scroll%>" frameBorder="0" marginHeight="0" marginWidth="0" <%=componentEvents%>  style="<%=style%>" > </iframe>
	     </div>
<%		}
	}	%><%@ include file="../common/componentfooter.jsp" %>
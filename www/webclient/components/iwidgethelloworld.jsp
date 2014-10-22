<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/componentheader.jsp" %><%
	String height = component.getProperty("height");
	String width = component.getProperty("width");
%>
	if (component.needsRender())
	{
		<span class="mm_iWidget" id="<%=id%>" >
			<a href="iwidgets/HelloWorld.xml" class="mm_Definition"></a>
		</span>
		<script>
			dojo.require('com.ibm.mm.enabler.enabler_config');
			dojo.require('com.ibm.mm.enabler.core');
			dojo.require('openajax.OpenAjaxManagedHub-all', true);
			dojo.require("com.ibm.mm.livetext.ServiceModelImpl");
			dojo.addOnLoad(function(){
				var livetextService = new com.ibm.mm.livetext.ServiceModelImpl();
				TagService = SemTagSvc = livetextService;
			    livetextService.init();
			});
		</script>
	}
<%@ include file="../common/componentfooter.jsp" %>
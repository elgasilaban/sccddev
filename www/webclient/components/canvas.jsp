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
String designAppDebug = "";//&debug=1";
String servPath = wcs.getMaximoRequestContextURL();

if(component.needsRender())
{
	String height = "707";//component.getProperty("height");
	String width = "1245";//component.getProperty("width");
	String scroll = component.getProperty("scroll");
	String border = component.getProperty("border");
	String src = component.getProperty("src");
	boolean visible = Boolean.valueOf(component.getProperty("visible")).booleanValue();

	app.put("canvasid", app.getId());  // use app id ('designer')
	servPath = servPath + src;

%>	<td>
<%	if(visible)
	{ 
		String iframeAutomationId ="";
		if(automation)
		{
			iframeAutomationId="automationid=\""+realId+"_iframe_div\"";
		}
%>		<div id="canvas_iframe_div" style="border:1px solid #CCCCCC; width: <%=width%>; height: <%=height%>; overflow: auto;" <%=iframeAutomationId%> align="<%=defaultAlign%>" valign="middle" >
			<iframe id="canvas_iframe" <%=automationId%> src="<%=src%>" scrolling="no" frameborder="<%= border %>" style="border:0px solid #000000;" role="presentation">
			</iframe>
		</div>
<%	}
%>	</td>
<%	if (!app.getId().equalsIgnoreCase("designer"))
	{
		return;
	}

	String designApp = (String)app.get("designApp");
	String designAppURL = (String)app.get("designAppURL");
	psdi.webclient.beans.designer.DesignerAppBean appBean = (psdi.webclient.beans.designer.DesignerAppBean)app.getAppBean();
	appBean.initializeReferences();
	String designAppTest = appBean.getString("app").toLowerCase();
	if (designApp == null || (!designApp.equals(designAppTest)))
	{ 
		designApp = designAppTest;
		String base = servPath;
		designAppURL = base + "/ui/maximo.jsp?event=loadapp&targetid=" + designApp + "&value=" + designApp
				+ "&designmode=true"+designAppDebug+"&"+wcs.getUISessionUrlParameter()+wcs.getCSRFTokenParameter();
		app.put("designApp", designApp);
		app.put("designAppURL", designAppURL);
	}

	if (!WebClientRuntime.isNull(designApp))
	{
%>		<script>
			setCanvasId("canvas_iframe");
			showWait();
			lockWait();
			addLoadMethod("setCanvasURL('canvas_iframe','<%=designAppURL%>')");
		</script>
<%	}
}
else
{
	boolean refreshCanvas = app.getRefreshCanvas();
	boolean reload = app.getReload();
	if (refreshCanvas)
	{
		currentPage.put("currentfocusid", "canvas_iframe");
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
			showWait();
			addLoadMethod("refreshDesignerCanvas()");
		</script><%="]]>"%></component>
<%	}
	if (reload)
	{
		app.setReload(false);
		if (app.getId().equalsIgnoreCase("designer"))
		{
			String designAppURL = (String)app.get("designAppURL");
			psdi.webclient.beans.designer.DesignerAppBean appBean = (psdi.webclient.beans.designer.DesignerAppBean)app.getAppBean();
			appBean.initializeReferences();
			String designApp = appBean.getString("app").toLowerCase();

			if (designApp != null)
			{
				String base = servPath;
				designAppURL = base + "/ui/maximo.jsp?event=loadapp&targetid=" + designApp + "&value=" + designApp
						+ "&designmode=true"+designAppDebug+"&"+wcs.getUISessionUrlParameter()+wcs.getCSRFTokenParameter();
			} 

			if(!WebClientRuntime.isNull(designApp))
			{
%>				<component id="<%=id%>2_holder"<%=compType%>><%="<![CDATA["%><script>
				var canvas = getElement("canvas_iframe");
				if (canvas != null)
				{
					showWait();
					lockWait();
					addLoadMethod("setCanvasURL('canvas_iframe','<%=designAppURL%>')");
				}
				</script><%="]]>"%></component>
<%			}
		}
	}
}
%><%@ include file="../common/componentfooter.jsp" %>
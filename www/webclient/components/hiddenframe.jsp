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
--%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"%><%
	// should be included in page.jsp right before open of hotkey <script>
	String debugLeft = Integer.toString(wcs.getDebugDockLeft());
	String debugTop = Integer.toString(wcs.getDebugDockTop());
%>	<div aria-hidden="true" id="HF" class="dsc1" style="padding:2px;left:<%=debugLeft%>;top:<%=debugTop%>;z-index:50000;background:#E7E7E7;border:1px solid #999999;<% if(!debugHiddenFrame){%>display:none<%}%>;position:absolute;">
	<div aria-hidden="true" class="dh mh dhb">Hidden Form</div>
	<form aria-hidden="true" id="hiddenform" name="hiddenform" method="POST" action="<%=wcs.getMaximoRequestContextURL()%>/ui/maximo.jsp" style="padding:3px;">
		<input type="text" size="45" name="event" id="event"  title="event type"/><br />
		<input type="text" size="45" name="targetid" id="targetid" title="target id" /><br />
		<input type="hidden" size="45" name="value" id="value" /><!-- this must be type hidden to support \n in the value -->
		<input type="text" size="45" name="changedcomponentid" id="changedcomponentid"  title="changed component id"/><br />
		<input type="text" size="45" name="vischangedcomponentvalue" id="vischangedcomponentvalue" title="changed component value"/><br />
		<input type="hidden" name="changedcomponentvalue" />
		<input type="text" size="45" name="currentfocus" id="currentfocus" title="focus id" /><br />
<%		if(app.getId().equalsIgnoreCase("designer"))
		{
%>		<input type="text" size="45" name="selectedcontrol" id="selectedcontrol" title="selected control" /><br />
		<input type="text" size="45" name="selectedfield" id="selectedfield" title="selected field" /><br />
		<input type="text" size="45" name="sourcefield" id="sourcefield" title="source field"/><br />
		<input type="text" size="45" name="control" id="control" title="control" /><br />
		<input type="text" size="45" name="where" id="where" title="where" /><br />
		<input type="text" size="45" name="targetfield" id="targetfield"  title="target field" /><br />
<%		}
		if(designmode)
		{
%>		<input type="hidden" size="45" name="designmode" value="true" />
<%		}
%>		<input name="scrollleftpos" id="scrollleftpos" size="45" title="Scroll Left"/><br />
		<input name="scrolltoppos" id="scrolltoppos" size="45"  title="Scroll Top"/><br />
		<input type="text" size="45" name="uisessionid" id="uisessionid" value="<%=WebClientRuntime.makesafevalue(wcs.getUISessionID())%>" class="fld_ro" readonly="readonly" title="ui session id"/><br />
		<input type="text" size="45" name="csrftokenholder" id="csrftokenholder" value="<%=WebClientRuntime.makesafevalue(wcs.getCSRFToken())%>" title="CSRF Token" readonly="readonly" class="fld_ro"/><br />
	</form>
	</div>
<%@ include file="../common/validation.jsp" %>
	<script type="text/javascript">
		function deferred(){
<%
		try
		{
			PageInstance stackPage = null;
			if(!designmode)
			{
				java.util.Iterator pageIterator = app.getPageStack().iterator();
				while(pageIterator.hasNext())
				{
					stackPage = (PageInstance)pageIterator.next();
					String currentfocusid = (String)stackPage.getFocusRenderId();
					String scrolltop = (String)stackPage.remove("scrolltoppos");
					String scrollleft = (String)stackPage.remove("scrollleftpos");
					stackPage.remove("infocuscontainer");
					stackPage.remove("focuscontainerid");
					boolean topPage = false;
					if(!pageIterator.hasNext())
					{
						topPage = true;
					}
					String defaultfocusid = (String)stackPage.get("defaultfocusid");
					if(WebClientRuntime.isNull(currentfocusid) && !WebClientRuntime.isNull(defaultfocusid))
					{
						currentfocusid = defaultfocusid;
					}
					if(WebClientRuntime.isNull(currentfocusid))
					{
						currentfocusid = (String)stackPage.get("firstfocusableobject");
					}
					stackPage.remove("firstfocusableobject");
					if(!WebClientRuntime.isNull(currentfocusid) && topPage)
					{	
						String showingMenu = (String)stackPage.remove("showingmenu");
						if(showingMenu == null)
						{
%>						focusItem('<%=currentfocusid%>',<%=topPage%>);
<%						}
						else
						{
%>						document.getElementById('currentfocus').value='<%=currentfocusid%>';	
<%						}
					}
					if(!WebClientRuntime.isNull(scrolltop) && !WebClientRuntime.isNull(scrollleft) && topPage)
					{
%>						scrollScreen('<%= scrolltop%>','<%= scrollleft%>');
<%					}
				}
			}
			else
			{
%>				reFocusItem();
<%			}
			if(Boolean.parseBoolean((String)app.get("refreshouterapp")))
			{
				app.remove("refreshouterapp");
%>				sendEvent('rerender','systemhandler',null);
<%			}
%>			//The following is for Web Replay/tbx
			callWebReplayFrame();
<%			if(stackPage != null && stackPage.focus())
			{
%>				stopFocus=true;
<%			}
		}
		catch(Exception e)
		{
			System.out.println("Exception while initializing focus item");
		}
%>		replaceAllItems();
	
<%		if(!designmode)
		{
%>			resetLogoutTimer(true);
<%		}
%>		processLoadMethods();
		fixSpacers();
		
		document.body.style.cursor="";
	
		<%--
			Be careful of the object types to which you bind using this method.
			Anything in the table struct (table,tr,td) will be slow.
		--%>
		bindEventsArray(document,eventBindObjects,false);
		hideWait();
		killAjaxTimeout();
		working=false;
<%		if(debugHiddenFrame)
		{
%>			dojo.addOnLoad(function() {
				dojo.require("dojo.dnd.Moveable");
				var hfDnD = new dojo.dnd.Moveable(dojo.byId('HF'),{skip: true});
				dojo.connect(hfDnD, 'onMoved', null, function(a,b){ a.node.setAttribute('lefttop',b.l+':'+b.t);});
				dojo.connect(hfDnD, 'onMoveStop', null, function(a){sendXHREvent('setDebugPosition', '<%=component.getId()%>', a.node.getAttribute('lefttop'), REQUESTTYPE_NORENDER, null, null, null)});
			});
<%		}
%>		window.setTimeout("showingPopup=false",100);
		sizeCanvas();
		}
		document.body.onload=deferred;
		window.onload=deferred;
	</script>
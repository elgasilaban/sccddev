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
--%><%--
This JSP is the handler for "treenode" component.
It provides a wrapper/container for this treenode and its children.
It handles the following events
- render
- render within refresh of parent when parent is expanded
- collapse
--%><%@ include file="../common/simpleheader.jsp" %><%
String label = component.getProperty("label");
String cdataTest = (String)app.get("incdata");

if(designmode && component.needsRender())
{	%>
	<%@ include file="../common/designerevents.jsp" %>
<%  label = control.getLocalizedType();
    String automationIdTn = "";
    
    String automationIdChildren = "";
    if(automation)
    {
        automationIdTn="automationid=\""+realId+"_tn\"";
        automationIdChildren="automationid=\""+realId+"_children\"";
    }	%>
	<li control="true" id="<%=id%>" <%=automationId%> style="<%=designerSelected%>">
		<div id="<%=id%>_tn" <%=automationIdTn%>>
		<span class="<%=textcss%> dl" <%=componentEvents%>><a tabindex="-1" href='' onclick='return false;'><%@ include file="../common/uistatusindicator.jsp" %><%=label%>...</a></span>
			<ul id="<%=id%>_children" style="list-style:none;">
					<%	component.renderChildrenControls(); %>
			</ul>
		</div>
	</li>
<%
}//if design mode

if(!designmode)
{	
	
TreeNode treeNode = (TreeNode)control;
Tree treeControl = treeNode.getTree();
ControlInstance parentNode =  (ControlInstance)control.getParentInstance();

//Attributes and flags specified for this control from tree
TreeNode selectedNode = treeControl.getSelectedNode();
String lastSelectedNodeId = treeControl.getLastSelectedNodeId(); 
String restrictActionOn = treeControl.getRestrictActionOn();
	
//Attributes specified for this control (in xml)
String nodeImage = component.getProperty("image");
String selectImage = component.getProperty("selectimage");
String objectname = component.getProperty("objectname");
String keyValue	= treeNode.getKeyValue();
String collapsedImage = component.getProperty("collapsedimage");
String expandedImage = component.getProperty("expandedimage");
String noChildImage = component.getProperty("nochildrenimage");
String waitImage = component.getProperty("waitimage");
String toggleEvent = component.getProperty("toggleevent");
String nodeEvent = component.getProperty("nodeevent");
String nodeImageEvent = component.getProperty("nodeimageevent");
String nodeClass = "n ";
String nodeLabelClass = "";
String nodeImageClass= "";
String nodeLabel = treeNode.getNodeLabel();
String nodeLinkTextDecoration = "style=\"text-decoration:none\"";

boolean enableReturn = component.getProperty("enablereturn").equals("true");
boolean enableSelectNode = component.getProperty("enableselectnode").equals("true");
boolean displayNodeImage = component.getProperty("displaynodeimage").equals("true");
boolean nodeHasChildren = treeNode.hasChildNodes();
boolean handleAction = true;
boolean expanded = treeNode.isExpanded();
boolean collapsed = treeNode.isCollapsed();
boolean isfakenode = treeNode.isFakeMessageNode();
boolean ishidden = treeNode.isDataHidden();
boolean ismarkedfordelete = treeNode.isMarkedForDelete();
String unformattedKeyValue = keyValue.replaceAll("'","");
//Set events
String nodeStateImage = (nodeHasChildren)? collapsedImage : noChildImage;
JSONObject selectNodeEvent = new JSONObject();
selectNodeEvent.put("eventtype", "selectnode");
selectNodeEvent.put("targetid", id);
selectNodeEvent.put("value", unformattedKeyValue); //For clicking only on the node name
String nodeEvents = "onmouseout=\"return noStatus();\" "+
					"onmouseover=\"return noStatus();\" "+
					"onfocus=\"return noStatus(); this.style.border='1px solid black'\" "+
					"onblur=\"return noStatus(); this.style.border='1px transparent'\" ";

//Alts and Messages
String selectRecordlbl = wcs.getMessage("tableinfo","cntrlTableAltSelectRow");
String selectNodelbl = wcs.getMessage("jspmessages","selectnode",new String[]{nodeLabel});
String expandalt = wcs.getMessage("jspmessages","expandnode");
String collapsealt =  wcs.getMessage("jspmessages","collapsenode");
String controlId = control.getId();
String collapseExpandEvents = "changeImageSrc('"+controlId + "_state_image','"+IMAGE_PATH + waitImage+"'),sendEvent('"+toggleEvent+"','"+id+"','"+unformattedKeyValue+"')";

JSONObject nodeEventJson = new JSONObject();//For clicking on the node image
if(nodeEvent.length()>0)
{
	nodeEventJson.put("eventtype", nodeEvent);
	nodeEventJson.put("targetid", id);
	nodeEventJson.put("value", unformattedKeyValue);
}
//nodeEvent = "sendEvent('"+nodeEvent+"','"+id+"','"+unformattedKeyValue+"')";//For clicking on the node image
JSONObject nodeImageEventJson = new JSONObject();//for custom event
if(nodeImageEvent.length()>0)
{
	nodeImageEventJson.put("eventtype", nodeImageEvent);
	nodeImageEventJson.put("targetid", id);
	nodeImageEventJson.put("value", unformattedKeyValue);
}					
toggleEvent = (nodeHasChildren)? toggleEvent: "";//toggle event

if(expanded)
{
	nodeStateImage = expandedImage;
}

if(!nodeHasChildren)
	nodeStateImage = noChildImage;
	

//Determine if action needed based on node type
if(!restrictActionOn.equals(""))
{
	if(restrictActionOn.equalsIgnoreCase(Tree.CONST_RESTRICT_ACTION_ON_BRANCHNODES))
	{
		if(!nodeHasChildren)
			handleAction = false;
	}
	else if(restrictActionOn.equalsIgnoreCase(Tree.CONST_RESTRICT_ACTION_ON_LEAFNODES))
	{
		if(nodeHasChildren)
			handleAction = false;
	}
}

String tabIndex = "-1";
boolean currentlySelected = (selectedNode!=null && selectedNode.getId().equals(controlId)); 
if(currentlySelected || (selectedNode==null && !parentNode.getType().equals("treenode")) && parentNode.getChildren().get(0) == control )
{
	tabIndex = "0";
}

if(ismarkedfordelete)
{
	nodeLinkTextDecoration = "style=\"text-decoration: line-through;\"";
}

if(isfakenode)
{
	nodeStateImage = component.getProperty("overflowimage");
	nodeLabelClass = "fnl";
	nodeClass = "fn";
}

if(ishidden)
{
	nodeLabelClass = "nn";
	nodeEvent="";
	nodeEventJson.clear();
	selectNodeEvent.clear();
	collapseExpandEvents="";
}

//If needs render and the parent doesnt need render, and parent is NOT tree and parent is expanded
if(component.needsRender())
{		
	if(!parentNode.needsRender() && (parentNode instanceof TreeNode))
	{
        String automationIdWrapper = "";
        if(automation)
        {
            automationIdWrapper="automationid=\""+realId+"_wrapper\"";
        }        
        if(treeNode.isFirstChildForParent())        	
        {        	
        	holderId = parentNode.getId()+"_children";	%>
<%@ include file="../common/componentholder_start.jsp" %>
	<%	}                 	

	}
	JSONObject primaryEvent = new JSONObject();
	if(enableSelectNode)
	{
		primaryEvent = selectNodeEvent;
	}
	JSONObject secondaryEvent = nodeEventJson;
	if(controlId.contains("associateClassification_tree"))
	{
		primaryEvent = nodeEventJson;
	}

	if(enableReturn && handleAction)
	{
		if(currentlySelected)
		{
			nodeLabelClass = "sn";
		}
		else
		{
			nodeLabelClass = "nn";
		}
	}
	else
	{
		if(enableSelectNode)
		{
			if(selectedNode!=null && selectedNode.getId().equals(controlId)) 
				nodeLabelClass = "sn";
			else
				nodeLabelClass = "nn";		
		}
		else
			nodeLabelClass = "nn";
	}
	nodeLabelClass = nodeLabelClass + " " + cssclass;
%><li role="presentation" id="<%=controlId%>_node" <%=automationId%> class="<%= nodeClass%>" style="background:transparent;" nodeinfo='{"selected": <%=currentlySelected%>, "expanded":<%=expanded%>, "toggleevent": {"eventtype":"<%=toggleEvent%>","targetid":"<%=id%>","value":"<%=unformattedKeyValue%>"}, "primaryevent" : <%=primaryEvent%>, "secondaryevent" : <%=secondaryEvent%>}' async="0" ae="togglechildren" fldInfo="{eventpriority:2}">
		<div id="<%=id%>" tabindex="<%=tabIndex%>" style="display:inline;border:1px solid transparent;" onblur="this.style.border='1px solid transparent';" onfocus="setFocusId(event,this);this.style.border='1px solid #6699cc';"  <%if(nodeHasChildren){%>aria-expanded="<%=expanded%>"<%}%> aria-labelledby="<%=controlId%>_nodename_link" role="treeitem"><span role="presentation" style="vertical-align:middle;background:transparent"><%
        String automationIdSelectImage = "";
        if(automation)
            automationIdSelectImage="automationid=\""+id+"_select_image\"";

		if(!isfakenode)
		{	                
			if(nodeHasChildren) 
			{
		%><img onclick="<%=collapseExpandEvents%>" role="presentation" alt="" wait="<%=IMAGE_PATH + waitImage%>" id="<%=controlId%>_state_image" uid="<%=objectname+":"+keyValue%>" class="<%=nodeImageClass %>" align="top" border="1" src="<%= IMAGE_PATH + nodeStateImage%>"/><%
			}		
		    else		    	
		    {
		%><img role="presentation" align="top" border="0" src="<%= IMAGE_PATH + nodeStateImage%>" alt=""/><%
		    }
		}
		%></span><%
		if(!isfakenode)
		{
			if(displayNodeImage)
			{
	        %><a role="presentation" tabindex="-1" id="<%=controlId%>_displayimage_link" class="ni" <%=nodeEvents%> onkeypress='if(hasKeyCode(event,"KEYCODE_ENTER")) {processEvent(<%=nodeImageEventJson%>);}' href='javascript: processEvent(<%=nodeImageEventJson%>)'><img alt="" role="presentation" id="<%=controlId%>_displayimage_image" align="absmiddle" src="<%=IMAGE_PATH+nodeImage%>" /></a><%
			}
			if(enableReturn && handleAction)
			{
			%><a role="presentation" tabindex="-1" id="<%=controlId%>_nodeimage_link" class="ni" <%=nodeEvents%> href='javascript: processEvent(<%=nodeEventJson%>)' onkeypress='if(hasKeyCode(event,"KEYCODE_ENTER")) {processEvent(<%=primaryEvent%>);}'><img border="0" role="presentation" alt="<%=selectRecordlbl +" "+ nodeLabel%>" align="absmiddle" id="<%=id%>_select_image" <%=automationIdSelectImage%> cell_uid="<%=objectname+":"+keyValue%>" src="<%=IMAGE_PATH+selectImage%>" /></a><%
			}
		}
		if(enableSelectNode)
		{
			if(!isfakenode)
			{
				%><a  role="presentation" tabindex="-1" class="<%=nodeLabelClass %>" id="<%=controlId%>_nodename_link" <%=nodeLinkTextDecoration %> <%=nodeEvents%> href='javascript: processEvent(<%=primaryEvent%>)'><%=nodeLabel%></a><%
			}
			else
			{
		%><span tabindex="-1" class="<%=nodeLabelClass %>" id="<%=controlId%>_nodename_link" style="text-decoration:none"><%=nodeLabel%></span><%
			}
		}
		else
		{
		%><span tabindex="-1" class="<%=nodeLabelClass %>" id="<%=controlId%>_nodename_link" <%=nodeLinkTextDecoration %>><%=nodeLabel%></span><%	
		}	
		%></div>
	<%	if(nodeHasChildren) 
		{
		%><ul role="group" aria-live="polite" id="<%=controlId%>_children" class="nc" takesfocus=true  style="list-style:none;display:<% if(expanded) out.print("inline"); else out.print("none"); %>"><%		
				if(expanded)
					component.renderChildrenControls();
		%></ul><%
		}
	%></li><%	
	if(!parentNode.needsRender() && (parentNode instanceof TreeNode))
	{			
		//Parent was expanded, copy it rendered children from the hidden doc os
		if(treeNode.isLastChildForParent())
		{
			app.put("endcdata","true");//this will force component end to end the component tag
			treeNode.setFocus();			
%>			
		<%@ include file="../common/componentholder_end.jsp" %>

		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			var treeDiv = getElement("<%=treeControl.getId()%>_treecontainer");
			var otn = getElement("<%=parentNode.getId()%>_children");
			scrollToMiddle(treeDiv,otn);
	
			var nodeImage = getElement("<%=parentNode.getId()%>_state_image");
			
			if(!undef(nodeImage))
			{
				nodeImage.src = "<%=IMAGE_PATH+expandedImage%>";
				var nodeDiv = nodeImage.parentNode.parentNode;
				if(nodeDiv)
				{
					nodeDiv.setAttribute("aria-expanded", "true");
				}
				
			}
			reFocusItem();
		</script>]]></component>
<%
		app.remove("endcdata");

		}//if first 
	}//if parent
}
else
{	
		if(collapsed)
		{					
			//remove old children
			//change status image
%>
<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			var outer = getElement("<%=controlId%>_children");
			if(!undef(outer))
			{			
				outer.innerHTML="";
				outer.style.display ="none";
				outer.setAttribute("aria-hidden", "true");
			}
			var nodeImage = getElement("<%=control.getId()%>_state_image");
			if(!undef(nodeImage))
			{				
				nodeImage.src = "<%=IMAGE_PATH+collapsedImage%>";
				var nodeDiv = nodeImage.parentNode.parentNode;
				if(nodeDiv)
				{
					nodeDiv.setAttribute("aria-expanded", "false");
				}

			}
			reFocusItem();
</script>]]></component>						
<%
			treeNode.setCollapsed(false);
		}		//if collapsed
	
		if(((enableReturn && handleAction) || enableSelectNode) && selectedNode!=null && selectedNode.getId().equals(controlId))
		{			
		    //deslect the previous node
		   if(lastSelectedNodeId!=null)
		   {						
		   	 if(!lastSelectedNodeId.equals(treeNode.getId()))//if last node was not this one, the replace its class, otherwise ignore
		   	 {
%>
<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
				var previousNode = getElement("<%=lastSelectedNodeId+"_nodename_link"%>");
				if(!undef(previousNode))
				{
					var item = previousNode;
					while(item!=null && item.tagName!="LI")
					{
						item=item.parentNode;
					}
					if(item)
					{
						updateJSONAttribute(item, "nodeinfo", ["selected"], false);
					}
					replaceClass(previousNode,"sn","nn");
				}
</script>]]></component>			
<%		   	 
		   	 }
		   }	//if enable return	   
%>
<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
			var newSelectedName = getElement("<%=controlId%>_nodename_link");
			if(!undef(newSelectedName))
			{
					var item = newSelectedName;
					while(item!=null && item.tagName!="LI")
					{
						item=item.parentNode;
					}
					if(item)
					{
						updateJSONAttribute(item, "nodeinfo", ["selected"], true);
					}
				replaceClass(newSelectedName,"nn","sn");
			}
</script>]]></component>			
<%			
		}// if node selected
	 
	component.renderChildrenControls();
 }//else
}//design mode
else if(!component.needsRender())
{ %>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
	<%	if(control.hasPropertyChanged("designerselected"))
	{	%>
		var el = document.getElementById("<%=id%>");
		if(el)
		{
			el.style.backgroundColor="<%=designerSelectedColor%>";
		}
<%	}	%>
</script>]]></component>
<%
	component.renderChildrenControls();
}%><%@ include file="../common/componentfooter.jsp" %>
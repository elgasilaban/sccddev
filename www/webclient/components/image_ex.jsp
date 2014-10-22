<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	if(component instanceof Image && component.getProperty("iconmenu").length()>0) {
			Image image = (Image)component;
			JSONArray icons = image.getIcons();
			int iconCount = icons.size();
			if(iconCount > 0){
				JSONObject icon;
				for(int index=0;index<iconCount;index++){
					icon = (JSONObject)icons.get(index);
					String target = linkedComp.getId();
					if(((String)icon.get("event")).equals("applink")) {
						target = (String)icon.get("target");
					}
					String imageName = (String)icon.get("image");
				%><a title="<%=icon.get("label")%>" href="Javascript: sendEvent('<%=icon.get("event")%>','<%=target%>','<%=icon.get("app")%>')" class="fieldIcon" onmouseover="appendClass(this,'fieldIcon_hover')" onmouseout="removeClass(this,'fieldIcon_hover')" ><img id="<%=id%>_<%=index%>" aria-hidden="true" src="<%=IMAGE_PATH%><%=imageName%>" border="0" /></a><%
				}
			}
		}	%>
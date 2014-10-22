<%--
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

<% 
/***
  JSP for sclabel component
  This is a wrapper for the label component with the addition of a tooltip help. 
  It is used within the sctextbox, sccombox, sccheckbox  controls  
*/
%>

<%@ include file="label.jsp" %><%@ page import="psdi.util.RichText"  %> 
<%@page import="psdi.webclient.system.controller.PageInstance"%>

<%
 
PageInstance currentPage = control.getPage();
String servletBase = wcs.getMaximoRequestContextURL() + "/webclient";
String type = currentPage.getType();

//Initially labelhelp had to be true to add onmouseover to element with id. I removed that.
String labelhelp = component.getProperty("labelhelp");
if(componentVisible && isVisible.equals("true") && !designmode ) {
	//Get tooltip text to display
	String tooltip = component.getProperty("tooltip");
	String msggroup = component.getProperty("tooltipmsggroup");
	String msgkey = component.getProperty("tooltipmsgkey");
	String text = component.getProperty("title");
	
	//If tooltip is null, look up message from bundle
	if((WebClientRuntime.isNull(tooltip)  || tooltip.equals("")) && !WebClientRuntime.isNull(msggroup) && !WebClientRuntime.isNull(msgkey))
		tooltip = wcs.getMaxMessage(msggroup, msgkey).getMessage();
	else  if (WebClientRuntime.isNull(tooltip) && !WebClientRuntime.isNull(text))
		tooltip = text;
	
	//strip off scripts tags, escape tags, etc...
        //According to Chris M., we don't need to escape for javascript or html
	tooltip = RichText.cleanHtml(tooltip, false, false, false);   
        
    //Max size is 2000 characters
    if (tooltip.length()>2000) {
        tooltip = tooltip.substring(0,2000);
    }        
	
	//tooltip = WebClientRuntime.makesafevalue(tooltip);
    //    tooltip=control.resolveParams(tooltip);
	//tooltip=WebClientRuntime.removeQuotes(tooltip);
	//tooltip = WebClientRuntime.replaceString(tooltip, "\n", "<br>"); 
	
   
   //<script sc_library.js</script>
%>	
   

<script type="text/javascript">  
         //debugger;         
          var nav = navigator.userAgent.toLowerCase();
          var IE = false;
		  if(nav.indexOf("msie")>-1)
    	       IE = true;
         
         //Add sc_library.js to page HEAD. addOnJsFiles is in library.js                                       
         addLoadMethod('addOnJsFiles("<%=servletBase%>/javascript/sc_library.js");');                              
         //addLoadMethod('{var doc; if(MAINDOC == parent) doc = MAINDOC.document; else doc = MAINDOC; var ele = doc.getElementById("addOnJsFiles"); if (!ele) { var scripttag=doc.createElement("script");scripttag.src="<%=servletBase%>/javascript/sc_library.js";scripttag.type="text/javascript";scripttag.id="addOnJsFiles"; doc.getElementsByTagName("head").item(0).appendChild(scripttag); } }');
         
         
    	 var doc = HIDDENDOC;
         if (!doc)
            doc = document;                   
        
            var label = doc.getElementById('<%=id%>');

            //add onmouseover event            
            if (label) {            
              //There's a problem with the onmouseover event triggering on application page in IE. Using label.onmouseover works            
              if(IE==true) {                                                                          
                 //if ('<%=type%>'=='page')
                 //   label.onmouseover = function() { parent.TooltipShow(this, event,null); }
                 // else  
                 //label.setAttribute("onmouseover","javascript:parent.TooltipShow(this, event,null);");                                                  
                 label.onmouseover = function() { parent.TooltipShow(this, event,null); }  //SRM7.5 - D31258
              } else
                 label.setAttribute("onmouseover","javascript:parent.TooltipShow(this, event,null);");  

               label.setAttribute("tooltip", "<%=tooltip%>");
               label.removeAttribute("title");                             
               
               //addListener(label, "mouseover", stacktrace, true );
               //addLoadMethod('addListener(label, "mouseover", parent.TooltipShow, true );');               

               if (IE==true) {
                 //if ('<%=type%>'=='page')
                 //   label.onmouseout = function() { parent.TooltipHide(this, event); }
                 //else
                 //label.setAttribute("onmouseout", "javascript:parent.TooltipHide(this, event);"); 
                 label.onmouseout = function() { parent.TooltipHide(this, event); }   //SRM7.5 - D31258
               } else
                 label.setAttribute("onmouseout", "javascript:parent.TooltipHide(this, event);");                                                  
            }
	
	</script>
	
<%	
}
%>

 

 


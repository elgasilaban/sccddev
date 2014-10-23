dojo.provide("com.ibm.ism.pmsc.dojo.pmsc_dojo_library");
dojo.require("com.ibm.ism.pmsc.dojo.srmBaseQuery");

//fpb - change port
//http://blue-tsamdev5.tivlab.raleigh.ibm.com:9080/maxrest/rest/mbo/person?_lid=maxadmin&_lpwd=maxadmin&_format=json&_includecols=PERSONID,FIRSTNAME,LASTNAME&_maxItems=200&_orderbyasc=LASTNAME&_generic=1
//var rest_url = "http://localhost:9083/maxrest/rest/mbo/person";
var rest_url = window.location.protocol + "//" + window.location.host + "/maxrestweb/rest/";

com.ibm.ism.pmsc.dojo.filterStores = {};
//this.filterStores = {};

//ajaxQuery singleton variable
com.ibm.ism.pmsc.dojo._ajaxquery = null;
com.ibm.ism.pmsc.dojo.ajaxQuery = function(){
	// summary: returns the singleton ajaxQuery object
	if(!com.ibm.ism.pmsc.dojo._ajaxquery){
		com.ibm.ism.pmsc.dojo._ajaxquery = new com.ibm.ism.pmsc.dojo._ajaxQuery();
	}
	return com.ibm.ism.pmsc.dojo._ajaxquery;	// Object
};


pmsc_dojohelper = {};
//var dh = pmsc_dojohelper;

/********************************************************************************************
 * input_changed:
 * Analagous to input_forceChanged() in library.js. This sets the hidden changed fields so
 * that if OK or Cancel is pressed, the click event sent up instead of setvalue. And the 
 * changed value is stored in the changecomponent fields 
 *   
 * Used By:
 * rteditor.jsp
 **********************************************************************************************/
pmsc_dojohelper.input_changed = function(component, value) {  
 //debugger;
 if(undef(component) || component.readOnly == true)
   		return;
   		
 var hiddenForm = getHiddenForm();
 var inputs = hiddenForm.elements;
 inputs.namedItem("changedcomponentid").value = component.id;

 value = pmsc_dojohelper.fixRTEData(value);
 
 //bidi-hcg-AS start 
 //var value = component.value;
 if(isBidiEnabled && component.getAttribute("bidiAttributes") && component.getAttribute("bidiAttributes").indexOf("expr:") != 0)
  	value = removeMarkers(value);
 
 inputs.namedItem("changedcomponentvalue").value = value;
 inputs.namedItem("vischangedcomponentvalue").value = value; 
 component.setAttribute("changed", true);

}

/********************************************************************************************
* on_focus:
* Analagous to input_onfocus() in library.js. This is called when the RTE gets focus. 
* If any other component has changed, it does a sendEvent 
*   
* Used By:
* rteditor.jsp
**********************************************************************************************/
pmsc_dojohelper.on_focus = function (component) {
	if(undef(component) || component.readOnly == true)
   		return;
	
	var hiddenForm = getHiddenForm();
	var inputs = hiddenForm.elements;
	inputs.namedItem("currentfocus").value = component.id;
	var ccId = inputs.namedItem("changedcomponentid").value;
	var ccVal = inputs.namedItem("changedcomponentvalue").value;
	var clicked = component.getAttribute("clicked");
	if(ccId != "" && (component == null || component.id != ccId) && clicked!="true") { // Something was changed	
		arguments.caller=null; //running into a IE bug in stacktrace()
		sendEvent("setvalue", ccId, ccVal);
	}
}

/* old version
//pmsc_dojohelper.input_changed = function pmsc_input_changed(component, value) {  //fpb
//	 //debugger;
//	 if(undef(component) || component.readOnly == true)
//	   		return;
//	   		
//	 var id = component.id;		
//	 	
//	 if(isBidiEnabled && component.getAttribute("bidiAttributes") && component.getAttribute("bidiAttributes").indexOf("expr:") != 0)
//	  	value = removeMarkers(value);
//	 
//	 value = pmsc_dojohelper.fixRTEData(value);
//	 arguments.caller=null; //running into a IE bug in stacktrace()
//	 sendEvent('setvalue',  id, value);	 
//	}
*/	

/***********************************************************************************************
 * fixRTEData:
 * Fix RTE input before sending to server
 * 
 * Used By:
 * rteditor.jsp 	
************************************************************************************************/
pmsc_dojohelper.fixRTEData = function pmsc_fixRTEData(html) {
    //console.log('In filter!!!!!!', html);    		   
    //debugger;
    
    //URLs displayed in new window
    html = html.replace('<a href', '<a target="_blank" href');
    
    //Align images to the left. may want to make this configurable
    html = html.replace('<img', '<img style="float:left"');
    
	  //remove CR, LF, tab;
	  //convert nbsp; to a space    		  
	  html =  html.replace(/^\s+|\s+$/g, '');	 
    html = html.replace(/[\u00C2\u00A0]/g,' ');   
    html = html.replace(/[\r\n]/g,'<br />');                  
	  html = html.replace(/[\n\r\t]/g,'');   
	  //html = html.replace(/[']/g,''); 
	  
	  //trim leading and trailing spaces     		      		      		   		 
	  //if (!undef(MAINDOC) && !undef(MAINDOC.dojo))
    //	  html = MAINDOC.dojo.string.trim(html);
	  //else if (dojo)
    //	  html = dojo.string.trim(html);
    html =  html.replace(/^\s+|\s+$/g, '');
  	  
	  //trim trailing <br />
	  while ((html.length > 5) && (html.lastIndexOf("<br />") == html.length-6))
 		  html = html.replace(/<br\s\/>$/g, '');  
	  
	  
	  //get rid of leading and trailing <p> if no other <p> in between.
	  if (html.indexOf("<p>")==0 && html.lastIndexOf("</p>") == (html.length - 4) && html.indexOf("<p>", 1)==-1) {
		  html = html.replace(/^<p>/, ''); 
		  html = html.replace(/<\/p>$/, ''); 
	  }
	  
	  //encode user enter brackets
	  html = html.replace(/&/g, '&amp;'); 
	  
	  return html;
    
}		  


/***********************************************************************************************
* get_cart_items:
* Get shopping cart items and format for tooltip
* TODO - security, remove uid/pw 
************************************************************************************************/
pmsc_dojohelper.get_cart_items = function(cart_id) {
	//console.log("get_cart_items for - " + cart_id);
	if (cart_id==null)
		return;
	//http://frankb.raleigh.ibm.com:9084/maxrestweb/rest/mbo/sr?_lid=maxadmin&_lpwd=maxadmin&_format=json&_includecols=TICKETID,DESCRIPTION,CREATIONDATE&_maxItems=200&_orderbyasc=TICKETID&PMSCCRID=1029	
	var html = "<div> <b>Current Shopping Cart - " + cart_id + "</b> <ul>";
	var params = { '_lid' : 'maxadmin', '_lpwd' : 'maxadmin', '_format' : 'json', '_includecols' : 'TICKETID,DESCRIPTION,CREATIONDATE', '_maxItems' : '200', '_orderbyasc' : 'TICKETID', '_generic' : '1', 'PMSCCRID' : cart_id};		
	var url = rest_url + "mbo/sr";

	var aQuery = com.ibm.ism.pmsc.dojo.ajaxQuery();	 

	//debugger;
	var deferred = aQuery.get(url, true, params);
	deferred.addCallback(function(response) 
		{
			try {				
				//console.log("get_cart_items - rsCount = " + response.MboSet.rsCount);
				for(var i = 0; i < response.MboSet.rsCount; i++) {
					var sr = response.MboSet.Mbo[i];
					//console.log("get_cart_items  - sr =" + sr);
					var ticketid = sr.Attributes.Attribute[0].content;
					var desc = sr.Attributes.Attribute[1].content;
					var date = sr.Attributes.Attribute[2].content;
					html = html + "<li>" + desc + " " + ticketid + " " + date + "</li>";
				}
				html = html + "</ul></div>"; 
			}
			catch(ex) {
				//console.log("error loading cart items: " + ex);
			}
			
	        //console.log("get_cart_items - " + html);		
			return response;
		});
	return html;
}

/***********************************************************************************************
* get_offering:
* Get offering
* TODO - security, remove uid/pw 
************************************************************************************************/
pmsc_dojohelper.get_offering = function(parm) {
//http://frankb.raleigh.ibm.com:9084/maxrestweb/rest/mbo/pmscoffering?_lid=maxadmin&_lpwd=maxadmin&
//	_format=json&_maxItems=200&ITEMNUM=PMSC_2001A&_includecols=ITEMNUM,DESCRIPTION,DESCRIPTION_LONGDESCRIPTION	
}

/***********************************************************************************************
* _test:
* Test function
* 
************************************************************************************************/
pmsc_dojohelper._test = function(parm) {
	return "<div> <b>Testing - " + parm + "</b> </div>";
}

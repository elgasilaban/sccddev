/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */


var asynchReqCount = 0;
var REQUEST_METHOD="GET";
var requestcounter=1;
var xhrRequests = new Array();
var DOJO_DIRECTORY = "dojo_1-4-3_20100426";

function sendsaveevent()
{
	sendRequest("SAVE",testappid, null, null,null, null,null, null, null, null,null);
}

function returntoapp()
{
	location.href=ASYNCURL+"&event=loadapp&value="+testappid;
}

function refreshwindow()
{
	window.location=location.href;
}

function sendtestevents(cid,evnt)
{		    
	input_keydown(evnt,cid);	
}

function undef(p)
{
    var bUndef = false;
    switch(typeof(p))
    {
        case "undefined" :
        	bUndef = true;
    	    break;
        case "null" :
	        bUndef = true;
        	break;
        case "object" :
        	if(p == null)
        		bUndef = true;
       		break;
        case "number" :
	        if(null == p)
	        	bUndef = true;
    	    break;
        case "string" :
        	if("" == p)
        		bUndef = true;
	        else if("null" == p)
	        	bUndef = true;
	        else if("undefined" == p)
	        	bUndef = true;
	        break;
    }
}

function sendRequest(eventtype, targetid, value, attrib,requesttype, refreshtype,resType, callBack, dataForm, timeout,wait)
{
		if(undef(requesttype))
			requesttype = "async";
		
		var time = 20000;
		if(timeout!=null)
			time=timeout*1000;
		
		var resType = (!undef(resType))?resType:"xml";
		
		var ha = "text";	
		if(resType=="json")
			ha=resType;
		
		var timestamp = Number(new Date());
		timestamp=timestamp+"-"+requestcounter;
		requestcounter++;
		hiddenForm = getHiddenForm();
		
		if(undef(hiddenForm))
			return;
		inputs = hiddenForm.elements;
			if(undef(inputs))
				return;
			
		var requestqueuetext =inputs.namedItem("requesttext").value;
		
		var log =  "REQUEST: Id: "+timestamp+", Event: "+eventtype + ", TargetId: "+targetid+", Value: "+value+ ", DataAttribute="+attrib+", RequestType: "+requesttype+", DebugAsyncWait="+wait+"\n";
		requestqueuetext= requestqueuetext+log;
		inputs.namedItem("requesttext").value =  requestqueuetext;
		
		var ASYNCSENDURL = ASYNCURL+"&processevent=true&requestid="+timestamp+"&event="+eventtype+"&targetid="+targetid+"&value="+value+"&requesttype="+requesttype+"&responsetype="+resType+"&debugasyncwait="+wait;
		
		if (window.XMLHttpRequest)
		{
		        var BROWSERSESSREQTEST = new XMLHttpRequest();
		        
		        BROWSERSESSREQTEST.onreadystatechange = function () {
		        		if (BROWSERSESSREQTEST.readyState == 4) {
		        			processResponse(BROWSERSESSREQTEST);
		        			}
		        		};
		        BROWSERSESSREQTEST.open(REQUEST_METHOD, ASYNCSENDURL, true);
		        BROWSERSESSREQTEST.send(null);
		}
		else if (window.ActiveXObject) // branch for IE/Windows ActiveX version
		{
		     var BROWSERSESSREQTEST = new ActiveXObject("Microsoft.XMLHTTP");		   

		     if (BROWSERSESSREQTEST)
		     {
		         BROWSERSESSREQTEST.onreadystatechange = function () {
		        		if (BROWSERSESSREQTEST.readyState == 4) {
		        			processResponse(BROWSERSESSREQTEST);
		        			}
		        		};
		         BROWSERSESSREQTEST.open(REQUEST_METHOD, ASYNCSENDURL, true);
		         BROWSERSESSREQTEST.send();
		     }
		 }
}

///* check an event vs. a string of keycodes in the following format "KEYCODE_SPACEBAR|KEYCODE_ENTER" for a match */
//function hasKeyCode(event,code)
//{
//	if(code==event.keyCode)
//		return true;
//	try
//	{
//		var codes=code.split("|");
//		var codeCheck=event.keyCode;
//		for(var i=0;i<codes.length;i++)
//		{
//			if(codeCheck==eval(codes[i]))
//			{
//				return true;
//			}
//		}
//	}
//	catch(error)
//	{
//	}
//	return false;
//}


function input_keydown(event,cid)
{
   if(hasKeyCode(event, "KEYCODE_ENTER") || hasKeyCode(event, "KEYCODE_TAB"))
   {
		try
		{
			/*
			 * get all inputs, create targetids,
			 * sendXHREvent(setvalue,mxe124,value from input,null,dummycallback,dummyform,30
			 */
			hiddenForm = getHiddenForm();
			
			if(undef(hiddenForm))
				return;
			inputs = hiddenForm.elements;
			if(undef(inputs))
				return;
			
			var reqlog = "";
			var reslog = "";
			
			reqlog = inputs.namedItem("requesttext").value;
			reslog = inputs.namedItem("responsetext").value;
			
			if(reslog!="")
				inputs.namedItem("responsetext").value = reslog+"*****************************************\n";
			
			if(reqlog!="")
				inputs.namedItem("requesttext").value = reqlog+"*****************************************\n";
			
			var targetid = inputs.namedItem(cid).getAttribute("targetid");
			var mxevent = inputs.namedItem(cid).getAttribute("mxevent");
			var val = inputs.namedItem(cid).getAttribute("value");
			var attrib = inputs.namedItem(cid).getAttribute("dataattribute");
			var wait = inputs.namedItem(cid).getAttribute("wait");
			
			var combo = inputs.namedItem(cid+"cb");
			var reqtype = combo.options[combo.selectedIndex].value;
			
			sendRequest(mxevent, targetid, val,attrib,reqtype, null,null, null, null, 500,wait);
		}
		catch(error)
		{
		}
    }
}

function clearvalues(cid)
{
	hiddenForm = getHiddenForm();
	
	if(undef(hiddenForm))
		return;
	inputs = hiddenForm.elements;
	if(undef(inputs))
		return;
	
	inputs.namedItem(cid).value="";
}

function processResponse(BROWSERSESSREQTEST)
{
	if (BROWSERSESSREQTEST.readyState == 4)
    {
    	var httpReqStatus = BROWSERSESSREQTEST.status;
        if (httpReqStatus == 200) //response came back fine
        {
    		 //upon response from server, restart timer
    		//var message = BROWSERSESSREQTEST.responseXML.getElementsByTagName("response")[0];
			//message = message.childNodes[0].nodeValue;
				
    		var message = BROWSERSESSREQTEST.responseText;

			logResponse("RESPONSE : "+message);
        }
        else
        {
			switch(httpReqStatus)
			{
				// Server timeout
				// 12029 to 12031 correspond to dropped connections.// Connection closed by server.
				case 12002:
				case 12029:
				case 12030:
				case 12031:
				case 12152:
				case 13030:
					responseLog("Reponse code: 13030");
					break;
				default:
					responseLog("Response Code="+httpReqStatus);
			}
		}
    }
}

function logResponse(message)
{
	hiddenForm = getHiddenForm();
	
	if(undef(hiddenForm))
		return;
	inputs = hiddenForm.elements;
	if(undef(inputs))
			return;
	
	var responsequeuetext =inputs.namedItem("responsetext").value;

	var log = message+"\n";
	responsequeuetext= responsequeuetext+log;
	
	inputs.namedItem("responsetext").value = responsequeuetext;

}


function getElement(id)
{
	document.getElementById(id);
   
}


function getHiddenForm()
{
    var hiddenForm = document.getElementById("hiddenform");
    
    return hiddenForm;
}


function addCommInput(name, value)
{
    var val = value;

    var hiddenForm = getElementById("hiddenform");
    var newInput = createElement("input");
    newInput.setAttribute("type","hidden");
    newInput.setAttribute("name",name);
    newInput.setAttribute("value",val);
    hiddenForm.appendChild(newInput);
}

function loadDojo()
{
	document.write("<style>");
	document.write("@import '/maximo/webclient/javascript/" + DOJO_DIRECTORY + "/util/doh/robot/robot.css';");
	document.write("</style>");

	document.write("<script type='text/javascript' src='/maximo/webclient/javascript/" + 
			DOJO_DIRECTORY + "/dojo/dojo.js' djConfig='isDebug: false, parseOnLoad: false'></script>");
}

//dojo xhr
//function sendXHREvent(eventtype, targetid, value, refreshtype, resType, callBack, dataForm, timeout)
//{
//	increaseAsynchReqCount++; 
//	//if(refreshtype=="0")
//	//{
//		//if(working)
//			//	return;
//	//		working=true;
//	//		showWait();
//	//}
//	
//	hiddenForm = getHiddenForm();
//	
//	if(undef(hiddenForm))
//		return;
//	inputs = hiddenForm.elements;
//		if(undef(inputs))
//			return;
//	uisessionid=inputs.namedItem("uisessionid").value;
//	currentFocus=inputs.namedItem("currentfocus").value;
//	//
//	comp = document.getElementById(targetid)
//	//if(comp)
//		//comp.setAttribute("changed_by_user","false");
//	
//	var time = 20000 
//	if(timeout!=null)
//		time=timeout*1000;
//	
//	resType = (!undef(resType))?resType:"xml";
//	
//	var ha = "text";	
//	if(resType=="json")
//		ha=resType;
//	
//	var reqType = "async";
//	var timestamp = Number(new Date());
//		
//	var requestqueuetext =inputs.namedItem("requestqueue").value;
//	if(undef(requestqueuetext))
//		requestqueuetext = requestqueuetext+"\n";
//	
//	var log =  "REQUEST: Id: +"timestamp", Event: "+eventtype + ", targetid: "+targetid+", Value: "+value+ ", Requesttype: "+reqType+", ResponseType: "+resType;
//	requestqueuetext= requestqueuetextlog+log;
//	
//	//we want to tell the servlet what type of responsetype is expected, but we cannot use handleAs "xml" due to a problem with Firefox
//	//so we always use "json" or "text" and then the callBack must parse the text to create an XML doc if it wants to
//	//NOTE: if debug is turned on (debug=0), then Dojo Debug is turned on and XHR requests and responses are logged in the browser console
//	dojo.xhrPost( 
//	{
//		url: ASYNCURL, 
//		handleAs: ha,
//		form: dataForm,
//		targetid: targetid,
//		content: {
//			requestid: timestamp,
//			responsetype: resType,
//			requesttype: reqType,
//			refreshtype: refreshtype,
//			event: eventtype,
//			targetid: targetid,
//			value: value,
//			uisessionid: uisessionid,
//			currentfocus: currentFocus
//		},
//		error: function(error, ioArgs) {
//			//asynchError(error,ioArgs);
//		},
//		load: callBack
//	});
//}
//
//var asynchReqCount = 0;
//function decreaseAsynchReqCount()
//{
//	asynchReqCount--;
//}
//
//function increaseAsynchReqCount()
//{
//	asynchReqCount++;
//}
//
//function processXHR(responseObj, ioArgs)
//{
////for whatever reason, firefox has the \r and \n in the response 
////getHiddenForm().reset();
////if(DEBUGLEVEL>1)
////console.info(responseObj);
//	responseObj=createXMLDoc(responseObj);
//	decreaseAsynchReqCount();
//	var responseEl = responseObj.getElementsByTagName("server_response");
//	var changedId = responseEl[0].getAttribute("changeid");
//	var updateEls = responseObj.getElementsByTagName("component");
//	if(!undef(updateEls))
//	{
//		for(i=0;i<updateEls.length;i++)
//		{
//			XHRReplaceComponent=updateEls[i];
//			var replaceMethod = XHRReplaceComponent.getAttribute("replaceMethod");
//			if(undef(replaceMethod))
//					replaceItemAsynch(getXHRComponentHTML());
//			else
//				eval(replaceMethod+"(null);");
//		}
//	}
	
	//process any elements wrapped with <javascript> as javascript
	//should only be one
//	var jsEls = responseObj.getElementsByTagName("javascript");
//	if(!undef(jsEls))
//	{
//		var scriptText="";
//		for(i=0;i<1;i++)
//		{
//			jsEl=jsEls[i];
//			var children = jsEl.childNodes;
//			for(j=0;j<children.length;j++)//do this for firefox which does not like whitespace
//			{
//				scriptText+=jsEl.childNodes[j].nodeValue;
//			}
//		}
		//MAINDOC is never needed as these scripts are always processed in the main page
//		scriptText=scriptText.replace(/MAINDOC./g,"");
//		if(scriptText!=null && scriptText!="")
//		{
//			if(DEBUGLEVEL>1)
//			{
//				try
//				{
//					hiddenForm = getHiddenForm();
//					inputs = hiddenForm.elements;
//					console.debug(scriptText);
//					eval(scriptText);
//				}
//				catch(error)
//				{
//					console.error(error.description);
//				}
//			}
//			else
//			{
//				try
//				{
//					eval(scriptText);
//				}
//				catch(error)
//				{
//					console.error(error.description);
//				}
//			}
//		}
//	}
//	var compAttributes = responseObj.getElementsByTagName("componentattributes");
//	if(!undef(compAttributes))
//	{
//		for(i=0;i<compAttributes.length;i++)
//		{
//			compAttribute=compAttributes[i];
//			var children = compAttribute.childNodes;
//			var compObjects="";
//			for(j=0;j<children.length;j++)//do this for firefox which does not like whitespace
//				{
//					compObjects+=compAttribute.childNodes[j].nodeValue;
//				}
//				if(!undef(compObjects))
//				{
//						compObjects=compObjects.replace("attributes","attrs");
//							applyAttributes(dojo.fromJson(compObjects));
//				}
//		}
//	}
//}


//function applyAttributes(comps)
//{
//for(i=0;i<comps.length;i++)
//{
//var comp = comps[i];
//var compId=comp.update;
//var styles=comp.styles;
//var attrs=comp.attrs;
//var component = dojo.byId(compId);
//if(component)
//{
//for(property in attrs) //apply all attributes to element
//{
//log("setAttribute("+property+","+attrs[property]+")",false);
//try
//{
//var val = attrs[property];
//log("dojo.byId('"+compId+"')."+property+"='"+val+"'",false);
//eval("dojo.byId('"+compId+"')."+property+"='"+val+"'");
//}
//catch(error)
//{
//try
//{
//component.setAttribute(property,val);
//}
//catch(error)
//{
////could not set the property
//if(DEBUGLEVEL>=1)
//console.error("could not set attribute["+property+"] to ["+val+"] for "+componentId);
//}
//}
//}
//for(property in styles) //apply all styles to element
//{
//log(compId+".style="+property+","+attributes[property],false);
//dojo.style(compId,property,styles[property]);
//}
//}
//}
//}

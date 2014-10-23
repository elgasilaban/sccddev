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
var openedErrorId = null;
var updatedValues = new Array();
var currentUpdateHTML = null;
var currentUpdateComp = null;
var currentUpdateioArgs = null;
var currentPopoverField = null;

//Client event queue manager
var queueManager = null;
var connectionRestored = false;

/**
 * Called from the hiddenform submit methods.
 */
function sendXHRFromHiddenForm()
{
	var hiddenForm = getHiddenForm();
	var inputs = hiddenForm.elements;
	var eventType = inputs.namedItem("event").value;
	var value = inputs.namedItem("value").value;
	var requestType = REQUESTTYPE_SYNC;

	var targetId = inputs.namedItem("targetid").value;
	var targetComp;
	if(!undef(targetId))
	{
		targetComp = dojo.byId(targetId);
	}

	var changedComponentId = inputs.namedItem("changedcomponentid").value;
	var changedComp;
	if(!undef(changedComponentId))
	{
		changedComp = dojo.byId(changedComponentId);
	}

	stopPopOver();

	// Begin Field validation
	var invalid = false;
	var fldInfo;
	var piggyBackEvent;
	var eventPriority;
	var userValue;
    var piggyBackSent = false;
	if(changedComp)
	{
		var changedCompValue = inputs.namedItem("changedcomponentvalue").value;
		userValue = changedComp.value;
		fldInfo = changedComp.getAttribute("fldInfo");
		if(fldInfo)
		{
			fldInfo = dojo.fromJson(fldInfo);
			if(tpaeConfig.clientDataValidation)
			{
				eventPriority = fldInfo.eventpriority;
				try
				{
					var stopValidate = changedComp.getAttribute("stopvalidate");
					if(undef(stopValidate) || stopValidate==false)
					{
						validate(changedComp, changedCompValue, fldInfo);
						changedComp.setAttribute("ov", changedCompValue);
					}
					else
					{
						changedComp.value=changedComp.getAttribute("ov");
					}
					changedComp.removeAttribute("stopvalidate");
					if(saveButton && inputchanged && !fldInfo.query)
					{
						setButtonEnabled(saveButton, true);
					}
				}
				catch(error)
				{
					setFieldState(changedComp, error);
					invalid = true;
				}
			}
			setMatchingFieldStates(changedComp,true);

		}
		// End Field validation

		// Check if there is a piggybacked event (two events going at once)(Ex. enter a value on a field, then click a button)
		if(changedComp && eventType != "setvalue")
		{
			var piggyBackRequestType = getRequestTypeForComponentEvent(changedComp, "setvalue", changedCompValue);
			piggyBackEvent = new Event("setvalue", changedComponentId, changedCompValue, piggyBackRequestType);
			if(invalid)
			{
				piggyBackEvent.setInvalidValue(true);
				invalid = false;
			}
		}
		else
		{
			if(value.length==0)
				value = changedCompValue;
		}
		changedComp.setAttribute("changed_by_user", "false");
	}
	else if(!undef(changedComponentId))
	{
		if(DEBUGLEVEL>0)
		{
			console.warn("Changed component id: "+changedComponentId+" does not exist on the client.  Event still being sent.");
		}
		changedComponentValue = inputs.namedItem("changedcomponentvalue").value;
		piggyBackEvent = new Event("setvalue", changedComponentId, changedComponentValue, REQUESTTYPE_SYNC);
	}

	if(targetComp)
	{
		if(!changedComp) //if there is no changedcomp, we need to get the event priority from the field info of the target comp
		{
			var targetFldInfo = targetComp.getAttribute("fldInfo");
			if(targetFldInfo)
			{
				targetFldInfo = dojo.fromJson(targetFldInfo);
				eventPriority = targetFldInfo.eventpriority;
			}
		}   
        var mxJSE = targetComp.getAttribute("mxejse");
		if(mxJSE) {
            piggyBack(piggyBackEvent, eventPriority, event);
            piggyBackSent = true;
        }
		requestType = getRequestTypeForComponentEvent(targetComp, eventType, value);
		// Mark field as no longer currently being changed
		targetComp.setAttribute("changed_by_user", "false");
	}
	var event = new Event(eventType, targetId, value, requestType);
	var datePackage;
	if(changedComp && fldInfo) {
		var dataType = fldInfo.inttype;
		var isDate = dataType == DATA_TYPES["date"] || dataType == DATA_TYPES["datetime"];
		if(isDate) {
			datePackage = changedComp.getAttribute("datePackage");
			if(dojo.hasAttr(changedComp, "gregorian")) {
				value = dojo.attr(changedComp,"gregorian");;
				event["value"] = value;
			}
			event["processvalue"] = userValue;
		}
	}
	if(invalid)
	{
		event.setInvalidValue(true);
	}
	var len = inputs.length;
	for(var i = 0; i < len; i++)
	{
		var name = inputs[i].name;
		if (! (name == "event" || name == "targetid" || name == "value"
			|| name == "currentfocus" || name == "uisessionid" || name == "hiddenframe"
				|| name == "scrolltoppos" || name == "scrollleftpos"
					|| name == "changedcomponentid" || name == "changedcomponentvalue" || name == "c1" || name == "s1"))
		{
			var inputValue = inputs[i].value;
			if(inputValue && inputValue != "")
			{
				event[name] = inputValue;
				if(piggyBackEvent)
				{
					piggyBackEvent[name] = inputValue;
				}
			}
		}
	}

	queueManager.currentfocus  = inputs.namedItem("currentfocus").value;
	queueManager.scrollleftpos = inputs.namedItem("scrollleftpos").value;
	queueManager.scrolltoppos  = inputs.namedItem("scrolltoppos").value;

	// Clear the form before queuing any events, because the queuing may cause a send
	//  to happen and we want the form to be cleared before the send
	clearForm();

	// When we have a setvalue piggyBacked we don't do client validation because the user can't 
	//  change the field and the server will mark the field with an error if necessary 
    if(!piggyBackSent) {
        piggyBack(piggyBackEvent, eventPriority, event);
    }

	if(fldInfo && changedComp)
	{
		fldInfo = changedComp.getAttribute("fldInfo"); //may have been changed by calls in this method, so get it again
		fldInfo = dojo.fromJson(fldInfo); 
		fldInfo.queueSeqNum = queueManager.sequenceNum;
		changedComp.setAttribute("fldInfo", dojo.toJson(fldInfo));
	}
	queueManager.queueEvent(event, "text/xml", "xml", processXHR, null);
	if (piggyBackEvent)
	{
		queueManager.release();
	}
}

function piggyBack(piggyBackEvent, eventPriority, event) {
	if (piggyBackEvent)
	{
		if (eventPriority)
		{
			piggyBackEvent.setPriority(eventPriority);
		}
		queueManager.hold();
		queueManager.queueEvent(piggyBackEvent, "text/xml", "xml", processXHR, null);
	}
	else
	{
		if (eventPriority && event)
		{
			event.setPriority(eventPriority);
		}
	}
}

/**
 * Get the request type for an event on a given component
 * @param component Html element for the component
 * @param event String name of the event
 * @returns ASYNC or SYNC
 */
function getRequestTypeForComponentEvent(component, event, value)
{
	var requestType = REQUESTTYPE_SYNC;
	if(component)
	{
		// Does this component allow asynchronous events?
		if(component.getAttribute("async") == "1")
		{
			var asyncEvents = component.getAttribute("ae");
			if(asyncEvents)
			{
				var events = asyncEvents.split(",");
				// Is this event asynchronous?
				if(arrayContains(events, event))
				{
					requestType = REQUESTTYPE_ASYNC;
				}
			}
		}
		var mxJSE = component.getAttribute("mxejse");
		if(mxJSE)
		{
			var indx = mxJSE.indexOf("(");
			if (indx > -1)
			{
				requestType = eval(mxJSE);
			}
			else 
			{
				//mxJSE methods must return a valid requestType
				requestType = eval(mxJSE)(component,event,value,requestType,false);
			}
		}
	}
	if(menus._showCachedMenu(event,component.id,value))
	{
		requestType=REQUESTTYPE_NONE;
		var hiddenForm = getHiddenForm();
		var inputs = hiddenForm.elements;
		inputs.namedItem("value").value="";
	}
	return requestType;
}

/**
 * Function for sending XHR events to the server
 * @param eventType - name of event to call
 * @param targetId - target id on which to try event
 * @param value - event associated value 
 * @param requestType - type of request
 *		REQUESTTYPE_ASYNC - Asynchronous request
 *		REQUESTTYPE_HIGHASYNC - High priority asynchronous request
 *		REQUESTTYPE_SYNC - Synchronous request (will lock UI and wait for all ASYNCH to be done)
 *		REQUESTTYPE_NORENDER - No Render expected from framework. Targeted directly to handling instance with no default response processing
 *		REQUESTTYPE_DEFAULT - will use REQUESTTYPE_SYNC if passed here 
 *		REQUESTTYPE_NONE - Don't send the request
 * @param handleAs - how should we handle the response in the responseHandler (xml, json, text)
 * @param responseType - the response type to be set by the server when responding
 * @param responseHandler - the method that will handle a successful response
 * @param errorHandler - the method that will handle an unsuccessful response
 */
function sendXHREvent(eventType, targetId, value, requestType, handleAs, responseType, responseHandler, errorHandler)
{
	if(!eventType || !requestType || requestType == REQUESTTYPE_NONE)
	{
		return; //Don't need to send it
	}

	responseType = responseType ? responseType : "text/xml";
	handleAs = handleAs ? handleAs : "xml";

	if(!responseHandler)
	{
		if(responseType == "text/xml")
		{
			responseHandler = processXHR;
		}
		else
		{
			responseHandler = finalizePage;
		}
	}
	if(requestType == REQUESTTYPE_NORENDER)
	{
		responseHandler = null;
	}

	queueManager.queueEvent(new Event(eventType, targetId, value, requestType), responseType, handleAs, responseHandler, errorHandler);
}

function containsNonLatinCodepoints(s) 
{
	return /[^\\u0000-\\u00ff]/.test(s);
}

function convertDoubleByteNumerics(value)
{
	if(!containsNonLatinCodepoints(value))
	{
		return value;
	}
	var singleByteCharCodes = new Array("0"		,"1"	,"2"	,"3"	,"4"	,"5"	,"6"	,"7"	,"8"	,"9"	,"-"	,","	,".");
	var doubleByteCharCodes = new Array(65296	,65297	,65298	,65299	,65300	,65301	,65302	,65303	,65304	,65305	,12540	,12289	,12290);
	var charArray = value.split("");
	for(var i=0;i<charArray.length;i++)
	{
		var index = dojo.indexOf(doubleByteCharCodes, charArray[i].charCodeAt(0));
		if(index>=0)
		{
			charArray[i] = singleByteCharCodes[index]; 
		}
	}
	return charArray.join("");
}

/**
 * Gets things setup for validation and does any coded modifications prior to calling regex validation and length checks
 * @param component
 * @return
 */ 
function validate(component, value, fldInfo)
{
	if(!component)
	{
		throw "";
	}
	var state = 0;
	if(DEBUGLEVEL > 0)
	{
		state = 3;
	}
	setFieldState(component, new ValidationError(state, ""));
	value = value.trim();
	if(value=="" || !fldInfo)
	{
		return;
	}
	var dataType = fldInfo.inttype;
	var length = fldInfo.length;	
	var scale = fldInfo.scale;
	if(undef(dataType))
	{
		return;
	}
	dataType = parseInt(dataType);
	if(undef(length))
		length = -1;
	else
		length = parseInt(length);
	if(undef(scale))
	{
		scale = -1;
	}
	else
	{
		scale = parseInt(scale);
	}
	switch(dataType)
	{
	case DATA_TYPES["upper"]:
		component.value = value.toUpperCase(); //just convert it to upper
	break;
	case DATA_TYPES["lower"]: //just convert it to lower
		component.value = value.toLowerCase();
	break;
	default:
		value = convertDoubleByteNumerics(value);
	checkDataTypeRegex(value, dataType);
	break;
	}
	lengthCheck(value, length, scale, dataType);
	if(fldInfo.dsid)
	{
		domainCheck(value, fldInfo);
	}
}

/**
 * Gets regex array from Json struct and applies each to the value.
 * If one matches it will stop checking.
 * @param value - string
 * @param dType - int
 * @throws error message - string
 */
function checkDataTypeRegex(value,dType)
{
	var regexArray = DATA_TYPE_REGEX[dType];
	if(regexArray)
	{
		var valid = false;
		for(var r=0;r<regexArray.length;r++)
		{
			var regex = regexArray[r];
			if(!undef(regex) && regex.test(value))
			{
				valid=true;
				break;
			}
		}
		if(!valid)
		{
			throw new ValidationError(2,applyValueToMessage(value, DATA_TYPE_ERRORS[dType]));
		}
	}
}

/**
 * If field has a domain make sure the value exists.
 */
function domainCheck(value,fldInfo)
{
	if(!fldInfo.dsid)
	{
		return;
	}
	var dataStore = getDataStore(fldInfo.dsid);
	if(!dataStore)
	{
		return;
	}
	var dataStoreInfo = getDataStoreInfo(fldInfo);
	if(!dataStoreInfo)
	{
		return;
	}
	var filterObj = new FilterObject(true);
	filterObj.add(dataStoreInfo.typeahead.keyattribute, value);
	dataStore.filter(filterObj);
	dataStore.filter(menus.buildAutoFillFilter(dataStoreInfo));

	if(dataStore && dataStore.length()==0)
	{
		throw new ValidationError(2,applyValueToMessage(value, DATA_TYPE_ERRORS["domainvalidation"]));
	}
}

/**
 * Checks the length of a value against the DB length and scale set on field
 * @param value
 * @param length
 * @param scale
 * @param dType
 * @return
 */
function lengthCheck(value,length,scale,dType)
{
	if(length>0 && dType!=DATA_TYPES["date"] && dType!=DATA_TYPES["datetime"] && dType!=DATA_TYPES["time"])
	{
		var checkvalue = value;
		if(dType==DATA_TYPES["integer"] || dType== DATA_TYPES["smallint"] || dType==DATA_TYPES["bigint"] || 
				dType==DATA_TYPES["decimal"] || dType==DATA_TYPES["float"] || dType==DATA_TYPES["amount"] )
		{
			dojo.require("dojo.number");
			checkvalue= Math.floor(dojo.number.parse(checkvalue)).toString();
			var checkLength = length - scale;
			if(scale>0)
				checkLength--;
			if(checkvalue.length>checkLength) //extra -1 is for decimal place that is added by getLength
			{
				throw new ValidationError(2,applyValueToMessage(value, DATA_TYPE_ERRORS["decimaltoolong"]));
			}
		}
		else if(checkvalue.length>length)
		{
			throw new ValidationError(2,applyValueToMessage(value, DATA_TYPE_ERRORS["length"]));
		}
	}
}

function applyValueToMessage(val, message)
{
	return message.replace("{0}", val);
}

/**
 * Determines if an event was performed over a field error icon
 * @param event
 * @param component
 * @return
 */
function overError(event,component)
{
	if(undef(component.getAttribute("exc")))
	{
		component.style.cursor='';
		return false;
	}
	var over = (event.clientY-getTopPosition(component))<18;
	if(over)
	{
		if(USERLANG=="AR" || USERLANG=="HE")
			over = ((getLeftPosition(component)+component.clientWidth)-event.clientX)<18;
		else
			over = (event.clientX-getLeftPosition(component))<18;
	}
	if(over)
	{
		component.style.cursor='pointer';
		return true;
	}
	component.style.cursor='';
	return false;
}

/**
 * Used to generate a validation exception.
 * @param etype - int
 * @param msg - string
 * @return
 */
function ValidationError(etype,msg)
{
	return {"type":etype,"message":msg};
}

//TODO - add WAI-ARIA tags
/**
 * Sets front-end validation state of field
 */
function setFieldState(component, error)
{
	if(!component || undef(error) || undef(error.type))
		return;
	var fldInfo = component.getAttribute("fldinfo");
	if(fldInfo)
	{
		fldInfo = dojo.fromJson(fldInfo);
	}
	removeClass(component, "fld_error");
	removeClass(component, "fld_warn");
	removeClass(component, "fld_question");
	removeClass(component, "fld_smartfill");
	removeClass(component, "fld_edited");
	removeClass(component, "fld_sending");
	component.setAttribute("aria-invalid", "false");
	component.removeAttribute("exc");
	var fldInfoModified = false;
	if(fldInfo && fldInfo.err)
	{
		delete fldInfo.err;
		fldInfoModified = true;
	}

	switch(error.type)
	{
	case -1:
		appendClass(component, "fld_edited");
		break;
	case 2:
	case 1:
		appendClass(component, "fld_error");
		component.setAttribute("exc", "100");
		var value = component.value;
		var badValue = value.replace('"','\"');
		if(error.type == 2)
		{
			component.value=component.getAttribute("ov");
		}
		if(!fldInfo)
		{
			fldInfo = {};
		}
		component.setAttribute("aria-invalid", "true");
		fldInfo.err = {
				icon: "st_MessageCritical.png",
				iswarning: false,
				processvalue: badValue,
				compid: component.id,
				exceptiontype: error.type,
				msgoptions: 0,
				iserror: true,
				exception: error.message,
				clientside: "true"
		};
		fldInfoModified = true;
		break;
	case 3:
		appendClass(component, "fld_sending");
		break;
	}
	if(fldInfoModified)
	{
		component.setAttribute("fldInfo", dojo.toJson(fldInfo));
	}
}

function editBadValue(id)
{
	var component = dojo.byId(id);
	if(!component)
		return;
	var fldInfo = component.getAttribute("fldInfo");
	if(fldInfo)
	{
		fldInfo = dojo.fromJson(fldInfo);
	}
	if(fldInfo.err)
	{
		component.value = fldInfo.err.processvalue;
	}
	setFieldState(component,new ValidationError(0,""));
	component.setAttribute("changed",true);
	setMatchingFieldStates(component,true);
	input_forceChanged(component);
}

function revertValue(id)
{
	var component = dojo.byId(id);
	if(!component)
		return;
	component.value=component.getAttribute("ov");
	var fldInfo = component.getAttribute("fldInfo");
	if(fldInfo)
	{
		fldInfo = dojo.fromJson(fldInfo);
	}
	setFieldState(component,new ValidationError(0,""));
	component.setAttribute("changed",true);
	setMatchingFieldStates(component,true);
	input_forceChanged(component);
}

/**
 * Sends a simple XHR get. Assumes you have appended all the params to the url
 * prevents caching by default
 */
function sendXHRGet(XHRurl, handleAs, responseHandler, errorHandler)
{	
	dojo.xhrGet( {
		url: XHRurl,
		handleAs: handleAs,
		preventCache: true,
		error: function(error, ioArgs) {		
			if (!queueManager.designMode && SHOWLOSTCONNECTIONWARNINGONLY && isDisconnectedStatus(ioArgs.xhr.status)) //07-28312 Connection Time out
			{
				showLostConnectionMsg();
				hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()", CONNECTIONWARNINGINTERVAL);
			} 
			else 
			{
				console.error("XHR ERROR: " + error);
				if(errorHandler)
				{
					errorHandler(responseObj, ioArgs);
				}
			}
		},
		load: function(responseObj, ioArgs) {
			if (responseObj && ioArgs.xhr.responseText.indexOf('id="loginform"') > -1) //Response came back but was a redirect
			{
				var htmltext = '<div id="relogin" name="relogin"><iframe src ="/maximo/ui/maximo.jsp" width="100%" height="100%"></iframe></div>';
				var curHtml = document.body.innerHTML;
				document.body.innerHTML = htmltext + curHtml;
			}
			else if(responseHandler)
			{
				try
				{
					responseHandler(responseObj, ioArgs);
				}
				catch(error)
				{
					console.error("ERROR: responseHandler [" + responseHandler + "] failed to run. " + error.name + " : " + error.message);
				}
			}
		}
	});
}


function sendXHRPost(XHRurl, postDataValue, handleAs, responseHandler, errorHandler)
{	
	dojo.xhrPost( {
		url: XHRurl,
		content: dojo.queryToObject(postDataValue),
		handleAs: handleAs,
		preventCache: true,
		error: function(error, ioArgs) {
			if (!queueManager.designMode && SHOWLOSTCONNECTIONWARNINGONLY && isDisconnectedStatus(ioArgs.xhr.status)) //07-28312 Connection Time out
			{
				showLostConnectionMsg();
				hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()", CONNECTIONWARNINGINTERVAL);
			} 
			else 
			{
				console.error("XHR ERROR: " + error);
				if(errorHandler)
				{
					errorHandler(responseObj, ioArgs);
				}
			}
		},
		load: function(responseObj, ioArgs) {
			if (responseObj && ioArgs.xhr.responseText.indexOf('id="loginform"') > -1) //Response came back but was a redirect
			{
				var htmltext = '<div id="relogin" name="relogin"><iframe src ="/maximo/ui/maximo.jsp" width="100%" height="100%"></iframe></div>';
				var curHtml = document.body.innerHTML;
				document.body.innerHTML = htmltext + curHtml;
			}
			else if(responseHandler)
			{
				try
				{
					responseHandler(responseObj, ioArgs);
				}
				catch(error)
				{
					console.error("ERROR: responseHandler [" + responseHandler + "] failed to run. " + error.name + " : " + error.message);
				}
			}
		}
	});
}




/**
 * Process any elements in the response that are wrapped with <deferredscript> as javascript
 * @param responseObj - response object
 * @param ioArgs - arguments from XHR
 */
function processDeferredScripts(responseObj, ioArgs)
{
	try
	{
		var jsEls = responseObj.getElementsByTagName("deferredscript");
	}
	catch(error)
	{
		//don't show error. undef check will stop it from processing
	}
	if(!undef(jsEls))
	{
		for(var i=0;i<jsEls.length;i++)
		{
			var jsEl=jsEls[i];
			var children = jsEl.childNodes;
			var scriptText="";
			for(var j=0;j<children.length;j++)//do this for firefox which does not like whitespace
			{
				scriptText+=jsEl.childNodes[j].nodeValue;
			}
			processJavaScript(scriptText);
		}
	}
}


/**
 * Clears the hidden form of data for next event submit.
 * Keeps current focus information
 */
function clearForm()
{
	var hf = getHiddenForm();
	if(hf)
	{
		var inputs = hf.elements;
		var focId = null;
		if(inputs)
			focId = inputs.namedItem("currentfocus").value;
		hf.reset();
		// Hidden inputs need to be reset manually
		inputs.namedItem("value").value="";
		inputs.namedItem("changedcomponentvalue").value="";

		if(!undef(focId))
		{
			if(dojo.byId(focId))
				inputs.namedItem("currentfocus").value=focId;
		}

		var len=addedCommInputs.length;
		for(var i = 0; i < len; i++)
		{
			var elName=addedCommInputs.pop();
			var inputs = hf.elements;
			var remEl = inputs.namedItem(elName);
			var par = remEl.parentNode;
			par.removeChild(remEl);
		}
		addedCommInputs=new Array();
	}
}

/**
 * Final processing after receiving an xhr response
 * @param responseObj - response object
 * @param ioArgs - arguments from XHR
 */
function finalizePage(responseObj, ioArgs)
{
	processDeferredScripts(responseObj, ioArgs);
	fixSpacers();
	killAjaxTimeout();
	window.setTimeout('showingPopup=false', 100);
	fixPasswordFields();
	processLoadMethods();
	var sync = true;
	if(ioArgs.args && ioArgs.args.content)
		sync = (ioArgs.args.content.requesttype == REQUESTTYPE_SYNC);
	if(sync) // we only need to re-enable the doc when a synchronous response comes back
	{
		sizeCanvas();
		working = false;
		hideWait();
	}
	longOpFunction = null;
	window.status='Done';
}

/**
 * Handle the response if an error comes back
 * @param error - error that occurred
 * @param ioArgs - arguments from XHR 
 */

//default XHR error handler
function XHRError(error,ioArgs)
{
	finalizePage(error, ioArgs);
	queueManager.sequenceErrorsToProcess++;
	if(DEBUGLEVEL>0)
		console.error("XHR ERROR: "+error);
}

/**
 * Default XHR handler
 */
function processXHR(responseObj, ioArgs)
{
	updatedValues=new Array();
	if(undef(responseObj))
		return;
	var responseEl = responseObj.getElementsByTagName("server_response");
	var redirectURL = responseObj.getElementsByTagName("redirect")[0];

	if(!undef(redirectURL))
	{
		var url = redirectURL.childNodes[0].nodeValue;
		if(!undef(url))
		{
			showWait();
			lockWait();
			warnExit=false;
			if(url=="{RELOAD}")
				document.location=document.location;
			else
				document.location=url;
			return;
		}
	}

	var recHover = showExtendedTooltipPopupFromSync(responseObj,ioArgs);

	var queueSeqNum = ioArgs.args.headers ? parseInt(ioArgs.args.headers['xhrseqnum']) : 0;

	//These are to be used by individual components to allow us to get the value
	var compvalues = responseObj.getElementsByTagName("compvalue");
	if(!undef(compvalues))
	{
		for(var i=0;i < compvalues.length; i++)
		{
			var compval = compvalues[i];
			var comp = dojo.byId(compval.getAttribute("id"));
			if(comp==null)
			{
				continue;
			}
			var fldInfo = comp.getAttribute("fldInfo");
			if(fldInfo)
			{			
				fldInfo = dojo.fromJson(fldInfo);
				if (fldInfo.queueSeqNum && fldInfo.queueSeqNum > queueSeqNum)
				{
					return;
				} 
				var tempVal = new UpdatedValue(compval.getAttribute("id"), getNodeValue(compval));
				updatedValues.push(tempVal);
			}
		}
	}

	var updateComponents = responseObj.getElementsByTagName("component");
	if(!undef(updateComponents))
	{
		for(var i=0;i<updateComponents.length;i++)
		{
			var replaceComponent=updateComponents[i];
			var replaceMethod = replaceComponent.getAttribute("replacemethod");
			var htmlAndScript = fixAndRemoveScripts(replaceComponent);
			var compHTML = htmlAndScript[0];
			var compScript=htmlAndScript[1];
			var preScript=htmlAndScript[2];
			processJavaScript(preScript);
			if(undef(replaceMethod))
				replaceItemXHR(compHTML,replaceComponent,ioArgs,true);
			else if(replaceMethod!="NONE")
			{
				replaceMethod = eval(replaceMethod);
				replaceMethod(compHTML,replaceComponent);
			}
			processJavaScript(compScript);
		}
	}

	var compAttributes = responseObj.getElementsByTagName("componentattributes");
	if(!undef(compAttributes))
	{
		for(var i=0;i<compAttributes.length;i++)
		{
			var compAttribute=compAttributes[i];
			var children = compAttribute.childNodes;
			var compObjects="";
			for(var j=0;j<children.length;j++)//do this for firefox which does not like whitespace
			{
				compObjects+=compAttribute.childNodes[j].nodeValue;
			}
			if(!undef(compObjects))
			{
				updateComponent(compObjects);
			}
		}
	}

	//process any elements wrapped with <javascript> as javascript
	var jsEls = responseObj.getElementsByTagName("finalscript");
	if(!undef(jsEls))
	{
		var scriptText="";
		for(var i=0;i<jsEls.length;i++)
		{
			var jsEl=jsEls[i];
			var children = jsEl.childNodes;
			for(var j=0;j<children.length;j++)//do this for firefox which does not like whitespace
			{
				scriptText+=jsEl.childNodes[j].nodeValue;
			}
			processJavaScript(scriptText);
			scriptText="";
		}
	}
	setLastEditableField();
}

/**
 * Takes a component XML CDATA block and returns a string array containing [0] the HTML without scripts and [1] the script. 
 * @param replaceComponent - Component XML block from response
 * @return String Array - [0]HTML, [1]Script
 */
function fixAndRemoveScripts(replaceComponent)
{
	var compHTML = getNodeValue(replaceComponent);
	var start = compHTML.indexOf("<script");
	var end = compHTML.indexOf("</script>");
	var compScript = "";
	var preScript = "";
	if(start>=0 || end>=0) //any script tags?
	{
		if(end>=0 && (start==-1 || end<start))//old style script tags </script> before <script> or missing <script>
		{
			compHTML="<script>"+compHTML+"</script>"; //wrap entire contents with script tags and re-initialize start and end
			start = compHTML.indexOf("<script");
			end = compHTML.indexOf("</script>");
		}

		while(start >-1 && end >-1 && end >start)
		{
			var startTagEnd = compHTML.indexOf(">", start+7);
			var scriptAttrs = compHTML.substring(start+7, startTagEnd);

			// If this is a Dojo declarative script block leave it in the html
			// portion, the browser won't run it anyway, and dojo.parser.parse
			// will fix it up later
			if(scriptAttrs.indexOf("dojo/method") != -1)
			{
				start = compHTML.indexOf("<script", end+9);
				end = compHTML.indexOf("</script>", end+9);
			}
			else
			{
				if(scriptAttrs.indexOf("pre='true'")>-1 || scriptAttrs.indexOf("pre=\"true\"")>-1) {
					preScript+=compHTML.substring(startTagEnd + 1,end);
				}
				else {
					compScript+=compHTML.substring(startTagEnd + 1,end);
				}
				compHTML=compHTML.substring(0,start)+compHTML.substring(end+9);
				start = compHTML.indexOf("<script");
				end = compHTML.indexOf("</script>");
			}
		}
	}
	return [compHTML, compScript, preScript];
}

/**
 * Any Javascript returned for XHR responses should be processed through this to allow for debuggin and additional code wrapping 
 * @param scriptText - javascript sent for processing
 */
function processJavaScript(scriptText)
{
	if(undef(scriptText))
		return;
	scriptText=scriptText.replace(new RegExp( "\\n", "g" ),"\n");
	try
	{
		if(DEBUGLEVEL>1)	    	
			console.debug(scriptText);
		eval(scriptText);
	}
	catch(error)
	{
		if(DEBUGLEVEL>1)
			alert(error.name + " : "+error.message +" thrown in "+scriptText);
		console.error(error.name + " : "+error.message +" thrown in "+scriptText);
	}
}


/**
 * Used to replace items that are refreshed using the new XML response format 
 * @param newHTML - String of HTML with all scripts removed
 * @param replaceComponent - XML node for component to be replaced
 * 
 * Possible attributes on replaceComponent
 * id - used to determine the holder id of the old and new component block
 * replacemethod - used to override the default method used to replace the component (allows custom method)
 * holder - used to override holder on document. This allows you to place new content in some other place.
 */
function replaceItemXHR(newHTML,replaceComponent,ioArgs,checkEdited)
{
	var itemId = replaceComponent.getAttribute("id");
	var oldHolderid = replaceComponent.getAttribute("holder");
	var append= replaceComponent.getAttribute("append");
	var visible = replaceComponent.getAttribute("vis") != "false" || (replaceComponent.style && replaceComponent.style.display == "none");
	var ignoredisplaystyle = replaceComponent.getAttribute("ignrdispstyle");//ignore display style as we may not want to change the last setting e.g portlet min or max
	var compId = replaceComponent.getAttribute("compid");
	var comp = null;
	if(!undef(compId))
		comp = dojo.byId(compId);
	var events = ioArgs.args.events;
	
	if(comp && compId==currentPopoverField) {
		if(!containsEvent(dojo.fromJson(ioArgs.args.content.events), new Event("fetchtooltip", compId, "", ""))) {
			stopPopOver();
		}
	}

	append=(append=="true");
	if(!undef(oldHolderid))
		itemId=oldHolderid;
	var oldEl=null;
	if(!undef(itemId))	
		oldEl=document.getElementById(itemId);
	if(oldEl)
	{
		oldEl.setAttribute("aria-busy", "true");
		var cbu = false;
		if(comp)
			cbu=(comp.getAttribute("changed_by_user")=="true" && checkEdited);
		var sync = false;
		if(ioArgs.args && ioArgs.args.content)
			sync = (ioArgs.args.content.requesttype == REQUESTTYPE_SYNC);
		if(!cbu || sync)
		{
			// Only copy over the html and bind events if element is visible
			if (visible)
			{
				try
				{
					if(DEBUGLEVEL>1)
						console.debug(oldEl.tagName+" filled with : "+newHTML);
					if(append)
						oldEl.innerHTML+=newHTML;
					else
						oldEl.innerHTML=newHTML;
				}
				catch(error)
				{
					if(DEBUGLEVEL>0)
						console.error("Could not fill "+oldEl.tagName+" with "+newHTML);
				}

				if(!(!undef(ignoredisplaystyle) && ignoredisplaystyle=="true"))
				{
					oldEl.style.display = "inline";
					oldEl.setAttribute("aria-hidden", "false");
				}

				var newEl=null;
				if(!undef(itemId))
					newEl=document.getElementById(itemId);
				if(undef(newEl.getAttribute("ctype")))
					newEl=newEl.parentNode;
				//This will call and bind events to the old element using pre-defined tag types (anything bindevent was called with during the life of this page)
				bindEventsArray(oldEl,eventBindObjects,true);
				if(!undef(getFocusId()) && !undef(compId) && getFocusId()==compId)
				{
					try
					{
						var comp = document.getElementById(compId); 
						if(!undef(comp))
							comp.focus();
					}
					catch(error)
					{}
				}
			}
			else
			{
				oldEl.style.display = "none";
				oldEl.setAttribute("aria-hidden", "true");
			}
			oldEl.setAttribute("aria-busy", "false");
		}
		else
		{
			var newValue = getUpdatedValue(compId);
			var newMessage = SERVER_UPDATE_WARN;
			var buttonText = SERVER_UPDATE_BUTTON;
			if(newValue!=null)
			{
				if(newValue=="")
				{
					newMessage = SERVER_CLEAR_WARN;
					buttonText = SERVER_CLEAR_BUTTON;
				}

				newMessage = newMessage.replace("{0}","<b>"+newValue+"</b>");
				buttonText = buttonText.replace("{0}","<b>"+newValue+"</b>");
			}
			currentUpdateHTML = newHTML;
			currentUpdateComp = replaceComponent;
			currentUpdateioArgs = ioArgs;
			showCustomPopup({
				compid: compId, 
				focus: false, 
				content: "<p style=\"width:350px; margin:5px 0px 5px 0px\">" + newMessage + "</p>", 
				icon: "st_MessageQuestion.png", 
				closeX: false,
				buttons: [
				          {
				        	  id: "su_button1",
				        	  text: buttonText,
				        	  event: "applyCurrentUpdate();"
				          }
				          ]
			});
		}
	}
	else if(comp && newHTML.trim()!="")
	{
		if (visible)
		{
			try
			{
				if(DEBUGLEVEL>1)
					console.debug(comp.tagName+" filled with : "+newHTML);
				var newEl = replaceNodeFromHtml(newHTML,comp,comp.parentNode,null);
				//This will call and bind events to the old element using pre-defined tag types (anything bindevent was called with during the life of this page)
				if(newEl)
					bindEventsArray(newEl,eventBindObjects,true);
			}
			catch(error)
			{
				if(DEBUGLEVEL>0)
					console.error("Could not fill "+comp.tagName+" with "+newHTML);
			}
		}
	}
}

function containsEvent(events, checkEvent) {
	for(eventNum in events) {
		var event = events[eventNum]; 
		if(event.type==checkEvent.type && event.targetId==checkEvent.targetId) {
			return true;
		}
	}
	return false;
}

function replaceNodeFromHtml(newHtml,oldEl,oldElParent,tempDiv)
{
	if(undef(tempDiv))
		tempDiv = document.getElementById("storage");

	tempDiv.innerHTML = newHtml;
	var newEl = findFirstRealNode(tempDiv);
	if(newEl)
	{
		oldElParent.replaceChild(newEl, oldEl);
	}
	tempDiv.innerHTML = "";
	return newEl;
}

function findFirstRealNode(topNode)
{
	var children = topNode.childNodes;
	for(var i = 0; i < children.length; i++)
	{
		var childNode = children[i];
		if(childNode.nodeType != 3)
			return childNode;
	}
	return topNode.lastChild;//default to last child
}

/**
 * Builds the html of replacement component and it's children into a string and removes any extra spaces in the values to help Firefox work better 
 * @param element - xml element from which we will extract nodeValue
 * @return newElText - all text from nodeValue
 */
function getNodeValue(element)
{
	var children = element.childNodes;
	var newElText = "";
	for(var j=0;j<children.length;j++)//do this for firefox which does not like whitespace
	{
		newElText+=children[j].nodeValue;
	}
	return newElText;
}

/**
 *  Applies a set of attributes and/or styles to an existing component
 *  
 *  TEST DATA - (use for a textbox, replace 'XXXX' with a valid id
 *  {"componentid":"XXXX","styles":[{"background":"blue"},{"color":"white"}],"attributes":[{"readonly":"true"},{"value":"XXtestXX"}]}
 *  
 * @param compData - component attribute and/or styles changes for a component
 */
function updateComponent(compData)
{
	try
	{
		compData=dojo.fromJson(compData);
	}
	catch(error)
	{
		if(DEBUGLEVEL>0)
			console.error(error.name+" : "+error.message+" - could not convert "+(typeof compData)+" "+compData+"] to JSON object.");
		return;
	}
	var compId=compData.componentid;
	var styles=compData.styles;
	var attrs=compData.attributes;
	var component = null;
	if(!undef(compId))
		component=document.getElementById(compId);
	if(component)
	{
		for(var i=0;i<attrs.length;i++) //apply all attributes to element
		{
			var attrObj = attrs[i];
			for(property in attrObj)
			{
				try
				{
					dojo.attr(component, property, attrObj[property]);
				}
				catch(error)
				{
					//could not set the property
					if(DEBUGLEVEL>0)
						console.error("Error: : Could not set attribute["+property+"] to ["+attrObj[property]+"] for "+compId);
				}
			}
		}

		for(var i=0;i<styles.length;i++) //apply all styles to element
		{
			var styleObj = styles[i];
			for(property in styleObj)
			{
				try
				{
					dojo.style(component,property,styleObj[property]);;
				}
				catch(error)
				{
					//could not set the property
					if(DEBUGLEVEL>0)
						console.error("Error: : Could not set style["+property+"] to ["+styleObj[property]+"] for "+compId);	
				}
			}
		}
	}
	else
	{
		if(DEBUGLEVEL>0)
			console.error("Error: Could not find component ["+compId+"] for setting styles or attributes.");
	}
}

//07-28312 Connection Time out
function checkXHRLostConnection()
{ 
	var httpReqStatus =0;
	//NOTE: XHR requests and responses are logged in the browser debug console
	dojo.xhrPost( {
		url: WARNLOSTURL,
		handleAs: 'xml',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		error: function(error, ioArgs) {
			if (ioArgs.xhr.readyState == 4)
			{
				httpReqStatus = ioArgs.xhr.status;
				if (httpReqStatus == 200) //response came back fine
				{
					return false;
				}
				else
				{
					hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()",CONNECTIONRECHECKINTERVAL); // CONNECTIONRECHECKINTERVAL=2000
				}
			}
			return false;
		},
		load: function(responseObj, ioArgs) {
			if (responseObj == null && ioArgs.xhr.status == 0)
			{
				hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()",CONNECTIONRECHECKINTERVAL); // CONNECTIONRECHECKINTERVAL=2000
				return;
			}
			if (ioArgs.xhr.readyState == 4)
			{
				reconnectFunction = 'reloadAfterRequestTimeout();';
				httpReqStatus = ioArgs.xhr.status;
				if (httpReqStatus == 200) //response came back fine
				{
					var xhrSeqNum = ioArgs.xhr.getResponseHeader('lastseqnum');
					if (undef(xhrSeqNum))
					{
						showLoginPage(true);
						return false;
					}
					var seqnum = parseInt(xhrSeqNum);
					seqnum++;
					var lastReqSent = queueManager.sequenceNum - 1;
					connectionRestored = true;
					if (queueManager.sequenceNum == seqnum)
					{
						queueManager.sequenceNumToProcess++;
						if (longOpFunction != null)
						{
							reconnectFunction = "closeCustomSystemDialog();" + longOpFunction;
						}
						showConnectionRestoredMsg();
					}
					else
					{
						for (var i=seqnum; i < queueManager.sequenceNum; i++)
						{
							var request = queueManager.requests[i.toString()];
							if (request != null)
							{
								if (i==seqnum && longOpFunction != null)
								{
									reconnectFunction = "closeCustomSystemDialog();";
								}
								dojo.xhrPost(request);
							}
						}
					}
				}
			}
			return false;
		}
	});	
}

/** @deprecated use #showSmartFillLookup() */
function showSmartFIllLookup(event, compId)
{
	showSmartFillLookup(compId);
}

function showSmartFillLookup(compId)
{
	sendXHREvent("selectvalue", compId, "_smartfill", REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
}

/**
 * Start async event  when mouse click the async error icon
 * @param event - mouse event
 * @param compOrId - component or the id of a component
 */
function startPopOver(event, compOrId, foc)
{
	var comp = dojo.byId(compOrId);
	if(!comp)
		return;

	var fldInfo = comp.getAttribute("fldInfo");
	if(fldInfo)
	{
		try
		{
			fldInfo = dojo.fromJson(fldInfo);
		}
		catch(error)
		{
			console.error("Error trying to process: " + fldInfo);
			throw error;
		}
		if (fldInfo.err)
		{
			if (!fldInfo.err.iswarning && EXCEPTION_ERROR==fldInfo.err.exceptiontype)
			{
				fldInfo.err.checkbox = comp.getAttribute("ctype") == 'checkbox';
				if (fldInfo.err.checkbox)
				{
					fldInfo.err.iserror = false;
					fldInfo.err.iswarning = false;
				}
			}
			showTooltipDialog(fldInfo.err);
		} 
		else
		{
			stopPopOver();
			sendXHREvent("popexception", comp.id, foc, REQUESTTYPE_HIGHASYNC, "json", "application/json" , showPopOver, null);//high async because - we want to show the msg right away
		}
	}
}

/**
 * Start async event  when mouse over the async error icon
 * @param event - mouse event
 * @param compId- component id
 */
function startPopOverWait(event,compId,timeout,foc)
{
	stopPopWait();
	if(undef(timeout))
	{
		timeout = ASYNCTOOLTIPWAITEBEFOREOPEN;
	}
	openedErrorId = setTimeout(function() {startPopOver(event,compId,foc);}, timeout);
}

/**
 * Stop the popup wait timer
 */
function stopPopWait()
{
	window.clearTimeout(openedErrorId);
	openedErrorId = null;
}

/**
 * Show the tooltip dialog when mouse click the async error icon
 */
function showPopOver(responseObj, ioArgs)
{
	stopPopOver();

	hideAllMenus(false);
	var comp = dojo.byId(responseObj.compid);
	if(!comp)
		return; 

	if(undef(responseObj.exception))
		return;

	if (undef(responseObj.exceptiontype))
		return;

	showTooltipDialog(responseObj);
} 

/**
 * Opening the tooltip dialog  when mouse over the async error icon
 * @param messageObj - response object
 */ 
function showTooltipDialog(messageObj)
{
	stopPopOver();
	showCommonTooltipDialog(messageObj, false);
}


/**
 * @param popInfo - JSON, 
 * EXAMPLE {"compid":itemId, "systemdialog":true, "focus":false, "content":newMessage, "icon":"st_MessageQuestion.png", "closeX":false,"buttons":[{"id":"su_button1","text":buttonText,"event":"applyCurrentUpdate"}]}
 * if systemdialog = true, show it as a dijit.dialg for system message
 */
function showCustomPopup(popInfo)
{
	stopPopWait();
	stopPopOver();
	return showCommonTooltipDialog(popInfo, true);
}


function showCommonTooltipDialog(messageObj, customtooltip)
{
	var ascerr_div = dojo.byId("ascerr_div");
	if(!ascerr_div)
		return;
	if (undef(messageObj.checkbox))
	{
		messageObj.checkbox = false;
	}

	var iframe = dojo.byId(ascerr_div.id + "_iframe"); 
	if(iframe)
	{
		dojo.style(iframe, {"display":"none"});
		dojo.attr(iframe, {"ariaHidden":"true"});
		iframe.src="";
	}

	ascerr_div.setAttribute("compid", messageObj.compid);

	var closeImg = dojo.byId("ascerr_closeimg");
	var hideCloseImage = (!undef(messageObj.closeX) ) && (messageObj.closeX=="none" || !messageObj.closeX); 
	if(closeImg)
	{
		if(hideCloseImage)
		{
			closeImg.style.display="none";
		}
		else 
		{
			closeImg.style.display = "";
		}
	}

	var msg = dojo.byId("ascerrmsg");
	if (customtooltip)
	{
		if(messageObj.contentURL) {
			messageObj.content = "<b>"+messageObj.content + "</b></br></br>";
		}
		msg.innerHTML = messageObj.content;
	}
	else 
	{
		var span = dojo.create('p', { style: { maxWidth:"350px", margin:"5px 0px 5px 0px", display:"inline-block" } }, msg, "only");
		if(dojo.isIE && dojo.isQuirks)
		{
			dojo.style(span, "width", "350px");
		}
		dojo.require("ibm.tivoli.mbs.html");
		span.innerHTML = ibm.tivoli.mbs.html.encodeEntities(messageObj.exception);
	}

	var erroricon = dojo.byId("ascerr_errorimg");
	if(erroricon)
	{
		if(!undef(messageObj.icon))
		{
			erroricon.src = IMAGE_PATH + messageObj.icon;
			erroricon.style.display = "";
		}
		else
		{
			erroricon.style.display = "none";
		}
	}

	var fld = dojo.byId(messageObj.compid);

	var uservalue = dojo.byId("userinput");

	if (uservalue)
	{
		if (messageObj.checkbox || customtooltip || messageObj.exceptiontype == EXCEPTION_REQUIREDFIELD || messageObj.exceptiontype == EXCEPTION_INFO)
		{
			uservalue.style.display = "none";
		}
		else
		{
			if(fld && fld.getAttribute("changed_by_user")=="true")
				return;

			uservalue.style.display = "";

			var span = dojo.create('p', { style: { maxWidth:"400px", margin:"0px" } }, uservalue, "only");
			if(dojo.isIE && dojo.isQuirks)
			{
				dojo.style(span, "width", "400px");
			}
			span.appendChild(document.createTextNode(ASYNCTOOLTIPUSERVALUE + " " + messageObj.processvalue));
		}
	}
	//show standard popup button and help containers
	var dfltHelp = dojo.byId("tt_default_help");
	if(dfltHelp)
	{     
		if (!customtooltip && (messageObj.iswarning || messageObj.iserror))
		{
			dfltHelp.style.display = "";
		}
		else
		{
			dfltHelp.style.display = "none";
		}
	}

	if (!customtooltip)
	{
		var clientSide = messageObj.clientside == "true";
		if (messageObj.serverside)
		{
			clientSide = "false"; //everything but the edit button should send event to the server.  Even revert (because of smartfill)
		}	

		var yes_btn = dojo.byId("ync_ybtn");
		var no_btn = dojo.byId("ync_nbtn");
		var cancel_btn = dojo.byId("ync_cbtn");
		var ok_btn = dojo.byId("ync_okbtn");
		var close_btn = dojo.byId("ync_clbtn");

		var ignore_btn = dojo.byId("ignore_ibtn");
		var revert_btn = dojo.byId("revert_rbtn");
		var edit_btn = dojo.byId("edit_ebtn");
		var whelp = dojo.byId("whelp");
		var ehelp = dojo.byId("ehelp");
		var chkbx_btn = dojo.byId("chkbx_btn");

		if(yes_btn && no_btn && cancel_btn && ok_btn && close_btn && ignore_btn)
		{
			ok_btn.setAttribute("clientside",clientSide);
			yes_btn.setAttribute("clientside",clientSide);
			cancel_btn.setAttribute("clientside",clientSide);
			close_btn.setAttribute("clientside",clientSide);
			ignore_btn.setAttribute("clientside",clientSide);
			revert_btn.setAttribute("clientside",clientSide);
			edit_btn.setAttribute("clientside","true");

			yes_btn.style.display=(((messageObj.msgoptions & MSG_BTNYES) == 0) || EXCEPTION_YESNOCANCEL!=messageObj.exceptiontype)?"none":"";
			no_btn.style.display=(((messageObj.msgoptions & MSG_BTNNO) == 0) || EXCEPTION_YESNOCANCEL!=messageObj.exceptiontype)?"none":"";
			ok_btn.style.display=(((messageObj.msgoptions & MSG_BTNOK) == 0) || EXCEPTION_YESNOCANCEL!=messageObj.exceptiontype)?"none":"";
			cancel_btn.style.display=(((messageObj.msgoptions & MSG_BTNCANCEL) == 0) || EXCEPTION_YESNOCANCEL!=messageObj.exceptiontype)?"none":"";
			close_btn.style.display=(((messageObj.msgoptions & MSG_BTNCLOSE) == 0) || EXCEPTION_YESNOCANCEL!=messageObj.exceptiontype)?"none":"";
			if(ignore_btn)
				ignore_btn.style.display="none";
			if(revert_btn)
				revert_btn.style.display="none";
			if(edit_btn)
				edit_btn.style.display="none";
		}

		if (chkbx_btn)
			chkbx_btn.style.display=(messageObj.checkbox?"":"none");
		if(ignore_btn)  // "Use My Value" button
			ignore_btn.style.display=(messageObj.iswarning)?"":"none";
		if(edit_btn)  // "Edit My Value" button
			edit_btn.style.display=(messageObj.iserror)?"":"none";
		if(revert_btn) //"Go Back" button
			revert_btn.style.display=((messageObj.iserror)||(messageObj.iswarning))?"":"none";
		if(whelp)
			whelp.style.display=(messageObj.iswarning)?"":"none";
		if(ehelp)
			ehelp.style.display=(messageObj.iserror)?"":"none";

		dojo.empty("tt_custom_buttons");

		if(fld) {
			currentPopoverField=fld.id;
		}

		var focId = getFocusId();
		if(!undef(focId))
		{
			var ctrltype = dojo.byId(focId).getAttribute("type");
			if(!ctrltype == "radio")//can't focus on radiobuttons, all else find focus field
				if(messageObj.compid.indexOf(focId)<0)
					return;
		}
	}
	else
	{
		dojo.style("ync_ybtn", "display", "none");
		dojo.style("ync_nbtn", "display", "none");
		dojo.style("ync_cbtn", "display", "none");
		dojo.style("ync_okbtn", "display", "none");
		if (SCREENREADER && (undef(messageObj.buttons) || messageObj.buttons.length == 0)) {
			dojo.style("ync_okbtn", "display", "");
		}
		dojo.style("ync_clbtn", "display", "none");
		dojo.style("ignore_ibtn", "display", "none");
		dojo.style("revert_rbtn", "display", "none");
		dojo.style("edit_ebtn", "display", "none");
		dojo.style("chkbx_btn", "display", "none");
		var buttonContainer = dojo.byId("tt_custom_buttons");
		if(buttonContainer)
		{
			dojo.empty(buttonContainer);
			if(!undef(messageObj.buttons))
			{
				var buttons = messageObj.buttons;
				for(var i = 0; i < buttons.length; i++)
				{
					var buttonId = buttons[i].id;
					if(!buttonId)
					{
						buttonId = "cust_button_" + i;
					}
					var button = dojo.create('button', { id: buttonId, "class": "text", onclick: buttons[i].event }, buttonContainer, "last");
					button.innerHTML = "&nbsp; " + buttons[i].text + " &nbsp;";
				}
			}
		}
	}

	if(messageObj.contentURL) {
		dojo.attr(iframe,{"id":ascerr_div.id + "_iframe","visibility":"hidden"});
		dojo.style(iframe, {"width":messageObj.iframeWidth,"height":messageObj.iframeHeight,"border":"0px"});
		if(messageObj.iframeWidth!="") {
			messageObj.width = parseInt(messageObj.iframeWidth) + SCROLLBAR_OFFSET;			
		}
		if(messageObj.iframeHeight!="") {
			messageObj.height = parseInt(messageObj.iframeHeight) + SCROLLBAR_OFFSET;
		}
		iframe.src = messageObj.contentURL;
		dojo.style(iframe, {"display":""});
		dojo.attr(iframe, {"ariaHidden":"false"});
	}

	var contenthtml = dojo.byId("ascerr_div").innerHTML;

	if (messageObj.systemdialog)
	{
		var width = "500px";
		var height = "";
		if (messageObj.width) {
			width = messageObj.width;
		}
		if (messageObj.height) {
			height = messageObj.height;
		}
		dojo.require("ibm.tivoli.mbs.dijit.SubDialog");

		var currtipdialog = new ibm.tivoli.mbs.dijit.SubDialog({
			content: contenthtml,
			id:'systemdialog',
			title: MSGBOX_TITLE,
			autofocus: true,
			style: "width:"+width+";height:"+height
		});	
		if (messageObj.ignorestop)
		{
			currtipdialog.setAttribute("ignorestop","true");
		}

		currtipdialog.show();
		
	}
	else
	{
		var fld = dojo.byId(messageObj.compid);
		if(fld) {
			currentPopoverField=messageObj.compid;
		}
		dojo.require("ibm.tivoli.mbs.dijit.SubTooltipDialog");
		var currtipdialog = new ibm.tivoli.mbs.dijit.SubTooltipDialog({
			content: contenthtml,
			id:'tt',
			autofocus: messageObj.focus,
			closeX: !hideCloseImage,
			fld: fld
		});	
		currtipdialog.startup();
		dijit.popup.open({
			popup: currtipdialog, around: fld
		});
	}
	return currtipdialog;
}

/**
 * Close the error tooltip dialog 
 */
function stopPopOver()
{
	// Check to make sure dijit and dijit.byId exist as in IE it's possible that it may not be available yet when this is called.
	if (dijit && dijit.byId)
	{
		var tdialog = dijit.byId("tt");
		if(!tdialog) 
		{
			tdialog = dijit.byId("systemdialog");
		}
		if (tdialog != null && undef(tdialog.ignorestop))
		{
			dijit.popup.close(tdialog);
			tdialog.destroy();
		}
	}
	currentPopoverField = null;
}

/**
 * Handles the yes/no/cancel button click event
 * @param btn - button
 * @param event - mouse event
 */ 
function processYesNoCancelButton(btn, event, msgreturn)
{
	var ascerr_div = document.getElementById("ascerr_div");
	if(!ascerr_div)
		return;
	var compId = ascerr_div.getAttribute("compid");
	stopPopOver();
	if(btn.getAttribute("clientside")=="true")
	{
		return;
	}
	if(!msgreturn)
	{
		msgreturn = btn.getAttribute("ret");
	}
	queueManager.currentfocus = compId;
	queueManager.queueEvent(new Event("processAsyncYesNoCancel", compId, msgreturn, REQUESTTYPE_SYNC), "text/xml", "xml", processXHR, null);
}

/**
 * Handles the "Edit My Value" button click event
 * @param btn - button
 * @param event - mouse event
 */  
function processEditButton(btn, event)
{
	var ascerr_div = document.getElementById("ascerr_div");
	if(!ascerr_div)
		return;
	stopPopOver();
	var compId = ascerr_div.getAttribute("compid");
	if(btn.getAttribute("clientside")=="true")
	{
		editBadValue(compId);
		return;
	}
	queueManager.currentfocus = compId;
	queueManager.queueEvent(new Event("processEdit", compId, "CANCEL", REQUESTTYPE_SYNC), "text/xml", "xml", processXHR, null);
}


/**
 * Handles the "Use My Value" button click event
 * @param btn - button
 * @param event - mouse event
 */  
function processIgnoreButton(btn, event)
{
	var ascerr_div = document.getElementById("ascerr_div");
	if(!ascerr_div)
		return;
	stopPopOver();
	var compId = ascerr_div.getAttribute("compid");
	queueManager.currentfocus = compId;
	queueManager.queueEvent(new Event("processIgnoreWarning", compId, "CANCEL", REQUESTTYPE_SYNC), "text/xml", "xml", processXHR, null);
}	

/**
 * Handles the "Go Back"  button click event
 * @param btn - button
 * @param event - mouse event
 */ 
function processRevertButton(btn, event)
{
	var ascerr_div = document.getElementById("ascerr_div");
	if(!ascerr_div)
		return;
	stopPopOver();
	var compId = ascerr_div.getAttribute("compid");
	if(btn.getAttribute("clientside") == "true")
	{
		revertValue(compId);
		return;
	}
	queueManager.currentfocus = compId;
	queueManager.queueEvent(new Event("processRevert", compId, "CANCEL", REQUESTTYPE_SYNC), "text/xml", "xml", processXHR, null);
}

/** 
 * Used to update exception container icons post render
 */
function setECIcon(id, error_type)
{
	var comp = null;
	if(!undef(id))
		comp=document.getElementById(id);
	var anchor = document.getElementById(id+"_er_a");
	var image = document.getElementById(id+"_er_img");
	anchor = image; //TODO do we need the anchor if we always just make it equal the image?
	if(comp && anchor && image)
	{
		var error_image = error_type;
		if(error_type == "")
		{
			anchor.style.display="none";
			anchor.setAttribute("tabindex","-1");
			return; //don't need to apply anything else if we are hiding it
		}
		else
		{
			anchor.style.display="";
		}
		var error_event = "";
		var error_tooltip = "";
		var component_type = comp.getAttribute("ctype");
		switch (error_type)
		{
		case "error":
			error_event=CONTAINER_ERROR_ICONS.error.event;
			error_tooltip=CONTAINER_ERROR_ICONS.error.tooltip;
			break;
		case "smartfill":
			error_event=CONTAINER_ERROR_ICONS.smartfill.event;
			error_tooltip=CONTAINER_ERROR_ICONS.smartfill.tooltip;
			break;
		case "question":
			error_event=CONTAINER_ERROR_ICONS.question.event;
			error_tooltip=CONTAINER_ERROR_ICONS.question.tooltip;
			break;
		case "warning":
			error_event=CONTAINER_ERROR_ICONS.warning.event;
			error_tooltip=CONTAINER_ERROR_ICONS.warning.tooltip;
			break;
		}
		anchor.setAttribute("error_event",error_event);
		anchor.setAttribute("tabindex","0");
		image.src=IMAGE_PATH+"async/"+error_image+".png";
		image.className=component_type+"_"+error_type+"_icon";
		image.title=error_tooltip;
		image.alt=error_tooltip;
	}
}

/**
 * used to apply update to currently edited field if accepted by the user
 */
function applyCurrentUpdate()
{
	stopPopOver();
	if(currentUpdateHTML && currentUpdateComp)
	{
		replaceItemXHR(currentUpdateHTML, currentUpdateComp, currentUpdateioArgs,false);
	}
	if ( currentUpdateComp != null)
	{
		var compId = currentUpdateComp.getAttribute("compid");
		if(!undef(compId))
		{
			var comp = dojo.byId(compId);
			if(comp)
			{
				focusItem(compId,false);
				var hiddenForm = getHiddenForm();
				var inputs = hiddenForm.elements;
				inputs.namedItem("changedcomponentid").value="";
				setMatchingFieldStates(comp, true);
			}
		}
	}
	currentUpdateHTML = null;
	currentUpdateComp = null;
	currentUpdateioArgs = null;
}

function getUpdatedValue(compid)
{
	for(var i = 0; i < updatedValues.length; i++)
	{
		if(updatedValues[i].id == compid)
		{
			return updatedValues[i].value;
		}
	}
	return null;
}

function UpdatedValue(id,value)
{
	this.id = id;
	this.value = value;
}

function showLostConnectionMsg()
{
	showCustomSystemMessage(WARNLOSTCONNECTION);
}

function closeCustomSystemDialog()
{
	if (dijit)
	{
		var sysdialog= dijit.byId("systemdialog");
		if (sysdialog != null)
		{
			sysdialog.hide();
			sysdialog.destroy();
		}
	}
}

var reconnectFunction = null;

function showConnectionRestoredMsg(buttonFunction)
{
	if (connectionRestored)
	{
		connectionRestored = false;
		hideWait();
		working=false;
		showCustomSystemMessage(WARNCONNECTIONRESTORED, CONNECTIONRESTOREDBTNTEXT, reconnectFunction);
	}
}

function isDisconnectedStatus(xhrStatus)
{
	return xhrStatus == 0 || xhrStatus == 12029 || xhrStatus == 12030 || xhrStatus == 12031 || xhrStatus == 12007 || xhrStatus == 12002;
}

function showCustomSystemMessage(message, buttonText, buttonEvent)
{
	var buttons = [];
	if (buttonText)
	{
		buttons = [{"id":"su_button1","text":buttonText,"event":buttonEvent}];
	}
	closeCustomSystemDialog();
	showCustomPopup({"":"", "ignorestop":true, "systemdialog":"true", "focus":"true", "content":message, "closeX":false,"buttons":buttons});
}

function showErrorMessage(xhr, syncReq)
{
	var codeParam = new Array();
	codeParam[0] = xhr.status + ""; 
	var message = null;
	if (isDisconnectedStatus(xhr.status) || (xhr.status >= 400 && xhr.status < 500))
	{
		message = replaceMsgParams(CONNECTIONERRORMSG,codeParam);
	}
	else if(xhr.status == 500 && xhr.getResponseHeader('forcereload') == '1')
	{
		message = OUTOFSEQERRORMSG;
	}
	else if(xhr.status >= 500 && xhr.status < 600)
	{
		message = replaceMsgParams(UNKNOWSERVERERRORMSG,codeParam);
	}
	if (message != null)
	{
		if (syncReq)
		{
			hideWait();
		}
		showCustomSystemMessage(message, OUTOFSEQERRORRELOADBUTTON, "reloadAfterRequestTimeout()");
		return true
	}
	return false;
}
//*******************************************BEGIN CLIENSIDE QUEUE**********************************************************

/**
 * Create a new event
 */
function Event(type, targetId, value, requestType)
{
	this.type        = type;
	this.targetId    = targetId ? targetId : "";
	this.value       = value ? value : "";
	this.requestType = requestType ? requestType : REQUESTTYPE_SYNC;
}
Event.prototype.setInvalidValue = function(isValid)
{
	this.isInvalidValue = isValid;
};
Event.prototype.setPriority = function(priority)
{
	this.priority = priority;
};

/**
 * Create a new queue
 */
function EventQueue()
{
	this.clear();
}
EventQueue.prototype.push = function(event)
{
	this.events.push(event);
	if(!event.isInvalidValue)
	{
		this.validCount++;
	}
	switch(this.requestType)
	{
	case REQUESTTYPE_NONE:
	case REQUESTTYPE_NORENDER:
		this.requestType = event.requestType;
		break;
	case REQUESTTYPE_ASYNC:
		if (event.requestType == REQUESTTYPE_SYNC)
		{
			this.requestType = event.requestType;
		}
		break;
	}
	if(DEBUGLEVEL > 0) 
	{
		event.queueTime = (new Date()).getTime();
	}
};
EventQueue.prototype.size = function()
{
	return this.events.length;
};
EventQueue.prototype.clear = function()
{
	this.validCount      = 0;
	this.responseHandler = null;
	this.errorHandler    = null;
	this.responseType    = null;
	this.requestType     = REQUESTTYPE_NONE;
	this.handleAs        = null;
	this.events          = new Array();
};
EventQueue.prototype.toJson = function()
{
	return dojo.toJson(this.events);
};

/**
 * Create a new queue manager with a given config
 */
function QueueManager(config)
{
	this.sessionId = config.sessionid;
	this.csrftoken = config.csrftoken;
	this.designMode = config.designmode;
	this.threshold = config.threshold;
	this.timeout = config.timeout;
	this.timer = null;
	this.currentfocus = null;
	this.scrollleftpos = null;
	this.scrolltoppos = null;
	this.onHold = false;
	this.eventQueue = new EventQueue();

	this.sequenceNum = 1;
	this.sequenceNumToProcess = 1;
	this.sequenceErrorsToProcess = 0; //keep track of any errors that come back so the queue knows to skip ahead

	this.requests = {};
	this.responseQueue = [{}];
}

/**
 * Queue an event. Kick in timer and flush if limit reached or an explicit flush
 * has been requested.
 */
QueueManager.prototype.queueEvent = function(event, responseType, handleAs, responseHandler, errorHandler)
{
	if(event.requestType == null || event.requestType == REQUESTTYPE_NONE)
	{
		return; //Don't need to send the event
	}

	if(undef(event.type))
	{
		if(DEBUGLEVEL > 0)
		{
			console.warn(new Date()+" Something tried to send an event with no type. " + dojo.toJson(event));
		}
		return; //cannot send an event with no type
	}

	if(event.requestType == REQUESTTYPE_HIGHASYNC)
	{
		var highAsyncQueue = new EventQueue();
		highAsyncQueue.responseHandler = responseHandler;
		highAsyncQueue.errorHandler    = errorHandler;
		highAsyncQueue.responseType    = responseType;
		highAsyncQueue.handleAs        = handleAs;
		highAsyncQueue.push(event);
		this._sendQueue(highAsyncQueue);
		return;
	}

	if(event.requestType == REQUESTTYPE_SYNC && !working)
	{
		//TODO can we encapselate the working in showWait()?
		working = true;
		showWait();
		if(event.type != "longopcheck" && event.type != "page_refresh")
		{
			focusWait();
		}
	}

	responseType = responseType ? responseType : "text/xml";
	handleAs = handleAs ? handleAs : "xml";

	if(this.eventQueue.size() > 0)
	{
		if(this.eventQueue.responseHandler != responseHandler ||
				this.eventQueue.errorHandler   != errorHandler ||
				this.eventQueue.responseType   != responseType ||
				this.eventQueue.handleAs       != handleAs)
		{
			this._sendQueue(this.eventQueue);
		}
	}
	this.eventQueue.responseHandler = responseHandler;
	this.eventQueue.errorHandler    = errorHandler;
	this.eventQueue.responseType    = responseType;
	this.eventQueue.handleAs        = handleAs;

	this.eventQueue.push(event);

	if(!this.onHold) 
	{
		if((event.requestType == REQUESTTYPE_SYNC || event.priority && event.priority > 1) 
				|| (this.threshold != -1 && this.eventQueue.validCount >= this.threshold))
		{
			this.flush();
			return;
		}

		if(this.eventQueue.validCount > 0)
		{
			this._startTimer();
		}
	}
};

/**
 * Called when the timer times out in order to send the queue
 */
QueueManager.prototype.flush = function()
{
	this._sendQueue(this.eventQueue);
};

/**
 * Clear/remove the timer for sending the queue
 */
QueueManager.prototype._startTimer = function()
{
	this._stopTimer();
	if(this.timeout > 0 && this.threshold > 1)
	{
		this.timer = window.setTimeout("queueManager._timedout()", this.timeout);
	}
};
/**
 * Called when the timer times out in order to send the queue
 */
QueueManager.prototype._timedout = function()
{
	if(this.eventQueue.validCount > 0)
	{
		this.flush();
	}
};
/**
 * Clear/remove the timer for sending the queue
 */
QueueManager.prototype._stopTimer = function()
{
	if(this.timer)
	{
		window.clearTimeout(this.timer);
		this.timer = null;
	}
};
/**
 * Hold the queue and prevent it from sending
 */
QueueManager.prototype.hold = function()
{
	this._stopTimer();
	this.onHold = true;
};
/**
 * Release the queue and allow it to send next time the thresholds are met
 */
QueueManager.prototype.release = function()
{
	this.onHold = false;
	if(this.eventQueue.requestType == REQUESTTYPE_SYNC)
	{
		this.flush();
	}
	else if(this.eventQueue.validCount > 0)
	{
		this._startTimer();
	}
};

/** 
 * Send the queue to the server
 */ 
QueueManager.prototype._sendQueue = function(eventQueue)
{
	this._stopTimer();

	var headers = {};
	if(eventQueue.requestType != REQUESTTYPE_HIGHASYNC)
	{
		headers = {
				"pageseqnum": PAGESEQNUM,
				"xhrseqnum" : this.sequenceNum.toString()
		};
		this.sequenceNum++;
	}	

	var content = {
			uisessionid   : this.sessionId,
			csrftoken     : this.csrftoken,
			currentfocus  : this.currentfocus,
			scrollleftpos : this.scrollleftpos,
			scrolltoppos  : this.scrolltoppos,
			requesttype   : eventQueue.requestType,
			responsetype  : eventQueue.responseType,
			events        : eventQueue.toJson()
	};

	if(this.designMode)
	{
		content.designmode = this.designMode;
	}
	if(this.delay)
	{
		content.debugasyncwait = this.delay;
	}

	var responseHandler = eventQueue.responseHandler;
	var errorHandler    = eventQueue.errorHandler;
	var handleAs        = eventQueue.handleAs;

	this.eventQueue.clear();

	//NOTE: XHR requests and responses are logged in the browser debug console
	var request= {
			url:      XHRACTION,
			headers:  headers,
			handleAs: handleAs,
			content:  content,
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			error: function(error, ioArgs) {
				var disconnectedError =  isDisconnectedStatus(ioArgs.xhr.status);
				if ((longOpFunction != null || (!queueManager.designMode && SHOWLOSTCONNECTIONWARNINGONLY)) && disconnectedError && content.requesttype != REQUESTTYPE_HIGHASYNC)
				{
					showLostConnectionMsg();
					hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()", CONNECTIONWARNINGINTERVAL);
				} 
				else
				{
					var xhrSeqNum = ioArgs.args.headers['xhrseqnum'];
					if ((ioArgs.xhr.status == 500 && ioArgs.xhr.getResponseHeader('forcereload') != '1')|| ioArgs.xhr.status == 409)
					{
						var request = queueManager.requests[ioArgs.args.headers['xhrseqnum']];
						if (request != null && request.headers.retry == null)
						{
							request.headers.retry=ioArgs.xhr.status;
							dojo.xhrPost(request);
							return;
						}
					}
					if (!undef(xhrSeqNum))
					{
						delete queueManager.requests[ioArgs.args.headers['xhrseqnum']];
					}

					if(errorHandler)
					{
						errorHandler(error, ioArgs);
					}
					else if (!showErrorMessage(ioArgs.xhr, (content.requesttype == REQUESTTYPE_SYNC)))
					{
						XHRError(error, ioArgs);
					}
				}
			},
			load: function(response, ioArgs) {
				if (response == null && ioArgs.xhr.status == 0 && content.requesttype != REQUESTTYPE_HIGHASYNC)
				{
					if (longOpFunction != null || (!queueManager.designMode && SHOWLOSTCONNECTIONWARNINGONLY))
					{
						showLostConnectionMsg();
						hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()", CONNECTIONWARNINGINTERVAL);
					} 
					else
					{
						showErrorMessage(ioArgs.xhr, (content.requesttype == REQUESTTYPE_SYNC));
					}
					return;
				}
				
				var xhrnbr = ioArgs.args.headers['xhrseqnum'];
				if(undef(xhrnbr))
				{
					queueManager._processResponse(response, ioArgs, responseHandler, responseSequenceNum);
					return;	
				}

				delete queueManager.requests[xhrnbr];
				var responseSequenceNum = parseInt(xhrnbr);

				//if a response comes out of order put it in the response queue
				//when the next ordered response comes it will process then process the queue
				if (responseSequenceNum > queueManager.sequenceNumToProcess)
				{
					queueManager._pushResponse(response, ioArgs, responseHandler, responseSequenceNum);
					return;
				}

				queueManager._processResponse(response, ioArgs, responseHandler, responseSequenceNum);

				if (responseSequenceNum < queueManager.sequenceNum - 1)
				{
					queueManager._processResponseQueue();
				}
			}
	};
	this.requests[request.headers.xhrseqnum] = request;
	dojo.xhrPost(request);
};

/**
 * Process a response
 */
QueueManager.prototype._processResponse = function(responseObj, ioArgs, responseHandler, responseSequenceNum)
{
	if(DEBUGLEVEL > 0)
	{
		console.info("Processing response: " + responseSequenceNum);
	}

	var safeResponseHandler = function()
	{
		if(responseHandler)
		{
			try
			{
				responseHandler(responseObj, ioArgs);
			}
			catch(error)
			{
				console.error("ERROR: responseHandler [" + responseHandler + "] failed to run. " + error.name + " : " + error.message);
			}
		}
	};

	if(responseObj == null && ioArgs.xhr.responseText && ioArgs.xhr.responseText.indexOf('id="loginform"') > -1) //Response came back but was a redirect
	{
		warnExit=false;
		var htmltext = '<div id="relogin" name="relogin"><iframe src ="/maximo/ui/maximo.jsp" width="100%" height="100%"></iframe></div>';
		var curHtml = document.body.innerHTML;
		document.body.innerHTML = htmltext + curHtml;
	}
	else if (responseObj && ioArgs.xhr.responseText && responseObj.parseError && responseObj.parseError.errorCode != 0)
	{
		var error = responseObj.parseError;
		console.error("Error on line " + error.line + " character " + error.linePos +
			"\nError Code: " + error.errorCode +
			"\nError Reason: " + error.reason +
			"Src: " + error.srcText);
		safeResponseHandler();
	}
	else if (responseObj && ioArgs.xhr.responseText && responseObj.documentElement && responseObj.documentElement.nodeName == "parsererror")
	{
		console.error(responseObj.documentElement.childNodes[0].nodeValue);
		safeResponseHandler();
	}
	else
	{
		safeResponseHandler();
	}

	finalizePage(responseObj, ioArgs);

	if(!undef(responseSequenceNum))
	{
		this.sequenceNumToProcess++; 							//incriment the number to process
		this.sequenceNumToProcess += this.sequenceErrorsToProcess; 	//add any errors that have already been processed
		this.sequenceErrorsToProcess = 0;						//and reset errors
		if (this.sequenceNumToProcess == this.sequenceNum)
		{
			showConnectionRestoredMsg();
		}
	}

	if(DEBUGLEVEL > 0)
	{
		console.info("Finishied processing: " + responseSequenceNum);
	}
};

/**
 * Process responses from the response queue if there are any
 */
QueueManager.prototype._processResponseQueue = function()
{
	while(this.sequenceNumToProcess < this.sequenceNum && this.responseQueue[this.sequenceNumToProcess] != undefined){
		var response = this._popResponse(this.sequenceNumToProcess);
		this._processResponse(response.responseObj, response.ioArgs, response.responseHandler, this.sequenceNumToProcess);
	}
};

/**
 * Push a response onto the response queue
 */
QueueManager.prototype._pushResponse = function(responseObj, ioArgs, responseHandler, index)
{
	if(DEBUGLEVEL > 0)
	{
		console.info("Pushing an out of order response into the queue: " + index);
	}
	this.responseQueue[index] = {responseObj: responseObj, ioArgs: ioArgs, responseHandler: responseHandler};
};

/**
 * Pop a specific response off the response queue
 */
QueueManager.prototype._popResponse = function(index)
{
	if(DEBUGLEVEL > 0)
	{
		console.info("Popping a response out of the queue: " + index);
	}
	var response = this.responseQueue[index];
	delete this.responseQueue[index]; //make undefined but don't re-index
	return response;
};

//*******************************************END CLIENSIDE QUEUE**********************************************************
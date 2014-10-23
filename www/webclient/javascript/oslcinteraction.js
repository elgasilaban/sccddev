
function receiveMsg(event)
{
	var HEADER = "oslc-response:"; //Defines the beginning of OLSC response header

	//This test verifies whether the response is from defect management system (based on OSLC)
	if(event.data.search(HEADER) > -1) {		
		var eventDataWithoutHeader = event.data.substring((event.data.search(HEADER) + HEADER.length), event.data.length);
				
		sendEvent('<%=javaMethod%>', '<%=id%>', eventDataWithoutHeader);
		removeEventHandler();
	}
}

function eventHandler()
{ 
	if (parent.addEventListener) {//Firefox, Opera, Google Chrome and Safari
		window.addEventListener ('message', receiveMsg, false);
	}
	else {
		if (parent.attachEvent) {//Internet Explorer

			window.attachEvent('onmessage', receiveMsg);

		}
	}
}

function removeEventHandler()
{

	if (parent.addEventListener) {//Firefox, Opera, Google Chrome and Safari
		
		window.removeEventListener('message', receiveMsg, false);
	
	}
	else {
		if (parent.attachEvent) {//Internet Explorer
	
			window.detachEvent('onmessage', receiveMsg);	
		
		}
	}
}

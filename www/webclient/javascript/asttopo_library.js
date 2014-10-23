
var pmcomLibraryLoaded = 1;
var pmcomBlockGUICount = 0;
var ilogApplet = null;
 
function pmcomBlockGUI(loadingMsg, timeOut)
{
 
 
 	if (pmcomBlockGUICount == 0)
	{
 		showWait();
		
		lockWait();
		
 		
		var waitLayer = getElement("wait");
		var msgDiv = document.createElement("div");
		msgDiv.id = "pmcomLoadingMsg";
		msgDiv.style.position = "absolute";
		msgDiv.style.backgroundColor = "white";
		msgDiv.style.color = "black";
		msgDiv.style.borderStyle = "solid";
		msgDiv.style.padding = "20";
		var msgDivText = document.createTextNode(loadingMsg);
		
		
		msgDiv.appendChild(msgDivText);
		
		
		document.body.insertBefore(msgDiv, waitLayer);
		
		
		msgDiv.style.left = document.body.clientWidth/2 - msgDiv.clientWidth/2;
		msgDiv.style.top = document.body.clientHeight/2 - msgDiv.clientHeight/2;
		msgDiv.style.zIndex = modalTopZ + 10;
		
		setTimeout("pmcomTimeoutExpired()",timeOut);
	}
	pmcomBlockGUICount++;
}

function pmcomUnblockGUI()
{
	if (pmcomBlockGUICount == 1)
	{
	    var msgDiv = getElement("pmcomLoadingMsg");
	    var msgDivParent = msgDiv.parentNode;
	    msgDivParent.removeChild(msgDiv);
		unLockWait();
		hideWait();
	}
	pmcomBlockGUICount--;
	if (pmcomBlockGUICount < 0)
	{
		pmcomBlockGUICount = 0;
	}
}

function pmcomTimeoutExpired()
{
	if (pmcomBlockGUICount > 0)
	{
	    var msgDiv = getElement("pmcomLoadingMsg");
	    var msgDivParent = msgDiv.parentNode;
	    msgDivParent.removeChild(msgDiv);
		unLockWait();
		hideWait();
	}
	pmcomBlockGUICount = 0;
}

function refreshApplet(id)
{
	//alert(ilogApplet);
	if(!appletAvailable(id))
		return;
	if(ilogApplet.readyState!="complete")
		return;
	sendEvent(ilogApplet.id, "updateapplet", '');
}

function appletAvailable(id)
{
	ilogApplet= document.getElementById(id);
	if(!ilogApplet)
	{
		alert("Error: Applet not found!");
		return false;
	}
	return true;
}

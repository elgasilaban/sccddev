var rbaLibraryLoaded = 1;
var rbaBlockGUICount = 0;
var ilogApplet = null;

function rbaShowWait(element) {
	if (element) {
		if (!isModal(element))
			return;
		// no wait needed
	}

	var waitLayer;
	if (element) // determine which wait to use, new one, or standard stop
					// all
		waitLayer = getElement(element.id + "_dialogwait");
	else
		waitLayer = getElement("wait");

	if (waitLayer) {
		waitOn = true;
		document.body.cursor = "wait";

		waitLayer.style.position = "absolute";
		waitLayer.style.left = "0px";
		waitLayer.style.top = "0px";
		if (element) // belongs below an object
			waitLayer.style.zIndex = element.style.zIndex - 1;
		else
			// belongs above everything
			waitLayer.style.zIndex = modalTopZ + 1;
		waitLayer.style.display = "inline";
	}
}

function rbaBlockGUI(loadingMsg, timeOut) {
	if (timeOut > 0) {
		if (rbaBlockGUICount == 0) {
			rbaShowWait();
			lockWait();
			var waitLayer = getElement("wait");
			var msgDiv = document.createElement("div");
			msgDiv.id = "rbaLoadingMsg";
			msgDiv.style.position = "absolute";
			msgDiv.style.backgroundColor = "white";
			msgDiv.style.color = "black";
			msgDiv.style.borderStyle = "solid";
			msgDiv.style.padding = "20";
			var msgDivText = document.createTextNode(loadingMsg);
			msgDiv.appendChild(msgDivText);
			document.body.insertBefore(msgDiv, waitLayer);
			msgDiv.style.left = document.body.clientWidth / 2
					- msgDiv.clientWidth / 2;
			msgDiv.style.top = document.body.clientHeight / 2
					- msgDiv.clientHeight / 2;
			msgDiv.style.zIndex = modalTopZ + 10;

			setTimeout("rbaTimeoutExpired()", timeOut);
		}
		rbaBlockGUICount++;
	}
}

function rbaUnblockGUI() {
	if (rbaBlockGUICount == 1) {
		var msgDiv = getElement("rbaLoadingMsg");
		var msgDivParent = msgDiv.parentNode;
		msgDivParent.removeChild(msgDiv);
		unLockWait();
		hideWait();
	}
	rbaBlockGUICount--;
	if (rbaBlockGUICount < 0) {
		rbaBlockGUICount = 0;
	}
}

function rbaTimeoutExpired() {
	if (rbaBlockGUICount > 0) {
		var msgDiv = getElement("rbaLoadingMsg");
		var msgDivParent = msgDiv.parentNode;
		msgDivParent.removeChild(msgDiv);
		unLockWait();
		hideWait();
	}
	rbaBlockGUICount = 0;
}

function refreshApplet(id) {
	alert(ilogApplet);
	if (!appletAvailable(id))
		return;
	if (ilogApplet.readyState != "complete")
		return;
	sendEvent(ilogApplet.id, "updateapplet", '');
}

function appletAvailable(id) {
	ilogApplet = document.getElementById(id);
	if (!ilogApplet) {
		alert("Error: Applet not found!");
		return false;
	}
	return true;
}

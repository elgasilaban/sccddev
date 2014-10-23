/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2013 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

function getDialogConstraints() { 
	return {"minheight":200,"minwidth":300,"h":20,"v":110};
}

function messageShowEffect(message,innerElement) {
	if(!tpaeConfig.fp7504) {
		return;
	}
	adjustMessageLocation(message);
	dojo.style(message,{"top":-message.offsetHeight});
	message.style.left = innerElement.style.left;
	innerElement.style.left="";
	message.style.visibility="visible";
	var image = dojo.byId(innerElement.id+"_image");
	if(image && image.style.visibility=="hidden") {
		image.src=IMAGE_PATH+"st16_informational_24.png";
		image.style.visibility="visible";
		image.style.width="";
	}
	var lft=(document.body.clientWidth/2)-(message.clientWidth/2);
	message.style.left=lft;
	slideElement(message,0,message.offsetHeight+4);
}

function messageHideEffect(message) {
	if(!tpaeConfig.fp7504) {
		return;
	}
	slideElement(message,0,-(message.offsetHeight+4));
	return true;
}


function slideElement(element, amtX, amtY){
	dojo.fx.slideTo({
		node: element,
		left: getLeftPosition(element) + amtX, 
		top: getTopPosition(element) + amtY 
	}).play();
	window.setTimeout("forceElementToLoc('"+element.id+"',"+(getLeftPosition(element) + amtX)+","+(getTopPosition(element) + amtY)+")",400);
}

function forceElementToLoc(id, left, top) {
	var element = dojo.byId(id);
	if(element) {
		element.style.left=left+"px";
		element.style.top=top+"px";
	}
}

function adjustMessageLocation(message) {
	if(!tpaeConfig.fp7504) {
		return;
	}
	if(message.parentNode!=document.body) {
		document.body.appendChild(message);
	}
}
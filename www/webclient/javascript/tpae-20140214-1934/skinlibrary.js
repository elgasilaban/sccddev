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
	//does nothing in this skin
}

function messageHideEffect(message) {
	//does nothing in this skin
	return false;
}


function slideElement(element, amtX, amtY){
	dojo.fx.slideTo({
		node: element,
		left: getLeftPosition(element) + amtX, 
		top: getTopPosition(element) + amtY 
	}).play();
 }
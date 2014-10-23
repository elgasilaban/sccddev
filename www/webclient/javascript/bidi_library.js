/*
 * Licensed Materials - Property of IBM
 * 'Restricted Materials of IBM'
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
var LRM = '\u200E';
var RLM = '\u200F';
var LRE = '\u202A';
var RLE = '\u202B';
var PDF = '\u202C';
var VK_BACK = 0x8;
var VK_SHIFT = 0x10;
var VK_END = 0x23;
var VK_HOME = 0x24;
var VK_LEFT = 0x25;
var VK_RIGHT = 0x27;
var VK_DELETE = 0x2e;
var VK_PAGEUP = 0x21;
var VK_PAGEDOWN = 0x22;
var VK_UP   = 0x26;
var VK_DOWN = 0x28;
var VK_ENTER     = 0xD;
var VK_ESC       = 0x1B;
var VK_INSERT    = 0x2D;

var segmentsPointers = new Array();

function processBidiKeys(event,obj) {
	var bidiAttributes = obj.getAttribute("bidiAttributes");
	if(bidiAttributes && (bidiAttributes.length > 0)) {
		var strArray = bidiAttributes.split(" ");
		for(var i=0; i < strArray.length; i++) {
			index = strArray[i].indexOf("dir:");
			if(index != -1) {
				var ce_type = getCEType(bidiAttributes);
				if (ce_type == "" || isChain(ce_type))
					setDirection(obj,strArray[i].substring(index+4));
				if (obj.dir == "rtl")
					obj.style.textAlign = "right";
				else
					obj.style.textAlign = "left";
				continue;
			}

			index = strArray[i].indexOf("expr:");
			if(index != -1)
				keyTyped(event,obj,strArray[i].substring(index+5));
		}
	}
}

function getCEType(str) {
	if (!str)
		return "";
	var start = str.indexOf("expr:");
	if (start < 0)
		return "";
	var end = str.substr(start+5).indexOf(" ");
	if (end < 0)
		end = str.length;
	return str.substring(start+5,end);
}

function processBackspaceDelete(event,obj) {
	var bidiAttributes = obj.getAttribute("bidiAttributes");
	if(bidiAttributes && (bidiAttributes.indexOf("expr:") != -1)) {
		ieKey = event.keyCode;
		if(ieKey == VK_DELETE || ieKey == VK_BACK) {
			var cursorStart, cursorEnd;
			var selection = getCaretPos(event,obj);
			if (selection) {
				cursorStart = selection[0];
				cursorEnd = selection[1];
				if(cursorStart == cursorEnd) {
					if ((ieKey == VK_DELETE) &&
							(checkMarkers(obj.value.charAt(cursorEnd))) &&
							(cursorEnd < obj.value.length - 1)) {
						obj.value = obj.value.substring(0, cursorEnd) + obj.value.substring(cursorEnd + 1);
						setSelectedRange(obj, cursorEnd, cursorEnd);
					}
					else
						if ((ieKey == VK_BACK) && (checkMarkers(obj.value.charAt(cursorEnd - 1)))) {
							obj.value = obj.value.substring(0, cursorEnd - 1) + obj.value.substring(cursorEnd);
							setSelectedRange(obj, cursorEnd - 1, cursorEnd - 1);
						}
				}
			}
		}
	}
}

function adjustCaret(event,obj) {
	var bidiAttributes = obj.getAttribute("bidiAttributes");
	if(bidiAttributes && (bidiAttributes.indexOf("expr:") != -1) && (event.button != 2)) {
		var selection = getCaretPos(event,obj);
		if (selection) {
			cursorStart = selection[0];
			cursorEnd = selection[1];
			if ((cursorStart == cursorEnd) && checkMarkers(obj.value.charAt(cursorEnd - 1)))
				setSelectedRange(obj, cursorEnd + 1, cursorEnd + 1);
		}
	}
}

function keyTyped(event,obj,ce_type){
	str1 = obj.value;
	ieKey = event.keyCode;

	if ((ieKey == VK_HOME) || (ieKey == VK_END) || (ieKey == VK_SHIFT) ||
			(ieKey == VK_ENTER) || (ieKey == VK_INSERT) || (ieKey == VK_ESC)) {
		return;
	}
	else if ((ieKey == VK_UP) || (ieKey == VK_DOWN)  ||
			(ieKey == VK_PAGEDOWN) || (ieKey == VK_PAGEUP)) {
		adjustCaret(event,obj);
		return;
	}

	var cursorStart, cursorEnd;
	var selection = getCaretPos(event,obj);
	if (selection) {
		cursorStart = selection[0];
		cursorEnd = selection[1];
	}

	if(ieKey == VK_LEFT){
		if (checkMarkers(str1.charAt(cursorStart - 1)) && cursorStart == cursorEnd)
			setSelectedRange(obj, cursorStart - 1, cursorEnd - 1);
		return;
	}
	else if(ieKey == VK_RIGHT){
		if (checkMarkers(str1.charAt(cursorEnd - 1)) && cursorStart == cursorEnd)
			setSelectedRange(obj, cursorStart + 1, cursorEnd + 1);
		return;
	}

	str2 = removeMarkers(str1);
	str2 = insertMarkers(str2,ce_type,obj.dir);

	if(str1 != str2)
	{
		obj.value = str2;

		if (ieKey != VK_DELETE && ieKey != VK_BACK) {
			if (!checkMarkers(obj.value.charAt(cursorEnd)))
				setSelectedRange(obj, cursorStart + 1, cursorEnd + 1);
		}
	}
	else {
		setSelectedRange(obj, cursorEnd, cursorEnd);
	}
}

function checkMarkers(str,pos) {
	if (pos >= str.length)
		return false;
	var c = str.charAt(pos);
	if (c == LRM || c == RLM)
		return true;
	return false;
}

function isChain(str) {
	if (str.indexOf("CHAIN") != -1)
		return true;
	return false;
}

function isLTRExpression(str) {
	if (!str)
		return false;
	if (str == "FILEPATH" || str == "JAVAPATH" || str == "EMAIL" || str == "URL" || str == "SQL" || str == "XML" ||
			str == "DNS" || str == "JNDI")
		return true;
	return false;
}

function processPaste(obj) {
	if(IE) {
		var ce_type = getCEType(obj.getAttribute("bidiAttributes"));
		try{
			var range = document.selection.createRange();
			var clipboardText = window.clipboardData.getData("Text");
			range.text = insertMarkers(clipboardText,ce_type,obj.dir);
			event.returnValue = false;
		}catch(e){}
	}
}

function processCopy(obj){
	var text = "";
	try{
		if (IE) {
			var w = obj.document.parentWindow;
			var e = w.event;
			var range = obj.document.selection.createRange();
			text = range.text;
		}
		else
			text = obj.document.getSelection();
		var textToClipboard = removeMarkers(text,obj);
		if (window.clipboardData) {
			window.clipboardData.setData("Text", textToClipboard);
			e.returnValue = false; }
	}catch(ex){}
}

function processCut(obj){
	if(IE) {
		processCopy(obj);
		range = document.selection.clear();
	}
}

function getCaretPos(event,obj){
	if(!IE)
		return new Array(obj.selectionStart, obj.selectionEnd);
	else {
		var position = 0;
		var range = document.selection.createRange().duplicate();
		var range2 = range.duplicate();
		var rangeLength = range.text.length;

		if (obj.type == "textarea")
			range2.moveToElementText(obj);
		else
			range2.expand('textedit');

		while (range.compareEndPoints('StartToStart', range2) > 0) {
			range.moveStart('character', -1);
			++position;
		}

		return new Array(position, position + rangeLength);
	}
}

function setSelectedRange(obj,selectionStart,selectionEnd){
	if(IE) {
		var range = obj.createTextRange();
		if (range) {
			if (obj.type == "textarea")
				range.moveToElementText(obj);
			else
				range.expand('textedit');

			range.collapse();
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	} else {
		obj.selectionStart=selectionStart;
		obj.selectionEnd=selectionEnd;
	}
}

function isBidiChar(c){
	if(c>1424 && c<1791 )
		return true;
	else
		return false;
}

function isLatinChar(c){
	if((c > 64 && c < 91)||(c > 96 && c < 123))
		return true;
	else
		return false;
}

function isCharBeforeBiDiChar(buffer, i, previous) {
	while (i > 0){
		if(i == previous)
			return false;

		if(isBidiChar(buffer.charCodeAt(i-1)))
			return true;
		else if(isLatinChar(buffer.charCodeAt(i-1)))
			return false;

		i--;
	}
	return false;
}

function parse(str,ce_type){
	var i,i1;
	var delimiters;
	var previous = -1;
	if(segmentsPointers != null){
		for(i=0; i<segmentsPointers.length; i++)
			segmentsPointers[i] = null;
	}
	else
		segmentsPointers = new Array();
	var sp_len = 0;

	if (isChain(ce_type) || ce_type == "FILEPATH" || ce_type == "JAVAPATH" || ce_type == "JNDI") {
		if (isChain(ce_type))   //SC
		delimiters = getDelimiter(ce_type);
		else
			delimiters = "/\\:.";
		for (i = 0; i < str.length; i++)
			if ((delimiters.indexOf(str.charAt(i)) >= 0) && (isChain(ce_type) || !isChain(ce_type) && isCharBeforeBiDiChar(str,i,previous))){
				previous = i;
				segmentsPointers[sp_len] = i;
				sp_len++;
			}

	} else if(ce_type == "URL"){
		var buffer_length = str.length;
		var path_end = str.indexOf('?');
		if (path_end < 0)
			path_end = buffer_length;

		i = str.indexOf('#');
		if (i < 0)
			i = buffer_length;

		path_end = Math.min(path_end, i);
		delimiters = "/\\:.";
		for (i = 0; i < path_end; i++)
			if ((delimiters.indexOf(str.charAt(i)) >= 0)  &&
					isCharBeforeBiDiChar(str,i,previous)){
				previous = i;
				segmentsPointers[sp_len] = i;
				sp_len++;
			}

		// parse filename, args, reference
		delimiters = "?=&#";
		for (i = path_end; i < buffer_length; i++)
			if ((delimiters.indexOf(str.charAt(i))  >= 0)  &&
					isCharBeforeBiDiChar(str,i,previous)){
				previous = i;
				segmentsPointers[sp_len] = i;
				sp_len++;
			}
	} else if(ce_type == "EMAIL"){
		delimiters = "<>@.,;";

		for(i = 0; i < str.length; i++){
			if (str.charAt(i) == '\"') {
				if (isCharBeforeBiDiChar(str,i,previous)){
					previous = i;
					segmentsPointers[sp_len] = i;
					sp_len++;
				}
				i++;
				i1 = str.indexOf('\"', i);
				if(i1 >= i)
					i = i1;
				if (isCharBeforeBiDiChar(str,i,previous)){
					previous = i;
					segmentsPointers[sp_len] = i;
					sp_len++;
				}
			}

			if ((delimiters.indexOf(str.charAt(i)) >= 0) &&
					isCharBeforeBiDiChar(str,i,previous)){
				previous = i;
				segmentsPointers[sp_len] = i;
				sp_len++;
			}
		}
	} else if(ce_type == "SQL") {
		delimiters = "!#%&()*+,-.:;<=>?|[]{}";
		var lQuotes = "'\"/*";
		var startQuote = -1;
		var lastMark = 0;
		var quoteIsMarked = false;
		var qType = -1;
		var ind = -1;
		var j = 0;

		for(i = 0; i < str.length; i++){
			if (isBidiChar(str.charCodeAt(i))) {
				if (i == 0 || quoteIsMarked) {
					continue;
				}
				for (j=i-1; j>=0; j--) {
					if (j < lastMark) {
						break;
					}
					if (isBidiChar(str.charCodeAt(j)) || isLatinChar(str.charCodeAt(j))) {
						break;
					}
					if (startQuote >= 0) {
						if (startQuote > 0) {
							segmentsPointers[sp_len] = startQuote;
							sp_len++;
							lastMark = startQuote;
						}
						quoteIsMarked = true;
						break;
					}
					if (delimiters.indexOf(str.charAt(j)) >= 0) {
						segmentsPointers[sp_len] = j;
						sp_len++;
						lastMark = j;
						break;
					}
				}
			}
			else {
				if(isLatinChar(str.charCodeAt(i))) {
					continue;
				}
				ind = lQuotes.indexOf(str.charAt(i));
				if (ind < 0) {
					continue;
				}
				if (startQuote < 0) {
					if (ind == 2 && (i == str.length - 1 || str.charAt(i + 1) != '*') || ind > 2)
						continue;
					startQuote = i;
					if (ind == 2)
						i++;
					qType = ind;
				}
				else {
					if (ind == 2)
						continue;
					else {
						var stopQuote = false;
						if (ind < 3) {
							if (ind != qType)
								continue;
							if (i < str.length - 1) {
								if (str.charAt(i + 1) != str.charAt(i))
									stopQuote = true;
								else
									i++;
							}
						}
						else {
							if (qType != 2)
								continue;
							if (i < str.length - 1 && str.charAt(i + 1) == '/')
								stopQuote = true;
						}
						if (stopQuote) {
							startQuote = -1;
							qType = -1;
							quoteIsMarked = false;
						}
					}
				}
			}
		}
	}
	return segmentsPointers;
}

function insertMarkers(str,ce_type,dir) {
	segmentsPointers = parse(str,ce_type);
	var buf = str;
	shift = 0;
	var n;
	var marker = isChain(ce_type) && dir == "rtl"? RLM : LRM;
	for (var i = 0; i< segmentsPointers.length; i++) {
		n = segmentsPointers[i];
		if(n != null){
			preStr = buf.substring(0, n + shift);
			postStr = buf.substring(n + shift, buf.length);
			buf = preStr + marker + postStr;
			shift++;
		}
	}
	return buf;
}

function removeMarkers(str){
	var result = str.replace(/\u200E/g,"");
	result = result.replace(/\u200F/g,"");
	result = result.replace(/\u202A/g,"");
	result = result.replace(/\u202B/g,"");
	return result.replace(/\u202C/g,"");
}

function setDirection(obj,isContextual){
	if(isContextual == "true") {
		if(isBiDiContextual(obj,obj.value))
			obj.dir="rtl";
		else
			obj.dir="ltr";
	}
}

function isBiDiContextual(component,text){
	var len = text.length;
	for(var i = 0;i < len;i++)  {
		symbol = text.charCodeAt(i);
		if(isBidiChar(symbol))
			return true;
		else if(isLatinChar(symbol))
			return false;
	}
	return isGuiMirrored(component);
}

function isInputContextual(obj) {
	var bidiAttributes = obj.getAttribute("bidiAttributes");
	if(bidiAttributes && (bidiAttributes.length > 0)) {
		var strArray = bidiAttributes.split(" ");
		for(var i=0; i < strArray.length; i++) {
			index = strArray[i].indexOf("dir:");
			if(index != -1 && strArray[i].substring(index+4) == "true") {
				return true;
			}
		}
	}
	return false;
}

function isInputRTL(obj) {
	var bidiAttributes = obj.getAttribute("bidiAttributes");
	if(bidiAttributes && (bidiAttributes.length > 0)) {
		var strArray = bidiAttributes.split(" ");
		for(var i=0; i < strArray.length; i++) {
			index = strArray[i].indexOf("dir:");
			if(index != -1 && strArray[i].substring(index+4) == "false") {
				return true;
			}
		}
		return false;
	}
	if (obj.dir && (obj.dir.toUpperCase() == "LTR" || obj.dir.toUpperCase() == "RTL"))
		return obj.dir.toUpperCase() == "RTL";
	return isGuiMirrored(obj);
}

function chainToEdit(component,ce_type) {
	var val = removeMarkers(component.value);
	if(isInputContextual(component)) {
		if (isBiDiContextual(component,component.value))
			component.dir = "rtl";
		else
			component.dir = "ltr";
	}
	else if(!isInputRTL(component)) {
		component.dir = "ltr";
	}
	else {
		component.dir = "rtl";
	}
	component.value = insertMarkers(val,ce_type,component.dir);
}

function chainToView(component,ce_type) {
	var val = removeMarkers(component.value);
	var result = "";
	var delimiter = getDelimiter(ce_type);
	var textDir = "ltr";
	if(isInputContextual(component)) {
		if (isBiDiContextual(component,component.value))
			textDir = "rtl";
		else
			textDir = "ltr";
	}
	else if(!isInputRTL(component)) {
		textDir = "ltr";
	}
	else {
		textDir = "rtl";
	}
	var eMarker = textDir == "ltr" ? LRE : RLE;
	var marker = textDir == "ltr" ? LRM : RLM;
	var dMarker = isGuiMirrored(component)? RLM : LRM;

	while (val.indexOf(delimiter) >= 0) {
		var tmp = val.substring(0,val.indexOf(delimiter));
		if(isInputContextual(component)) {
			if (isBiDiContextual(component,tmp)) {
				eMarker = RLE;
				marker = RLM;
			}
			else {
				eMarker = LRE;
				marker = LRM;
			}
		}
		result += eMarker + marker + tmp + marker + PDF;
		result += dMarker + delimiter;
		if (val.indexOf(delimiter) < val.length)
			val = val.substring(val.indexOf(delimiter)+1);
		else
			val ="";
	}
	if (val != "") {
		if(isInputContextual(component)) {
			if (isBiDiContextual(component,val)) {
				eMarker = RLE;
				marker = RLM;
			}
			else {
				emarker = LRE;
				marker = LRM;
			}
		}
		result += eMarker + marker + val + marker + PDF;
	}
	component.value = result;
	component.dir = isGuiMirrored(component)? "rtl" : "ltr";
}

function getDelimiter(ce_type) {
	if (ce_type.indexOf("COLON") > 0)
		return ":";
	else if(ce_type.indexOf("COMMA") > 0)
		return ",";
	else if(ce_type.indexOf("DASH") > 0)
		return "-";
	else
		return "\\";
}

function input_bidi_onblur(event, component) {
	var bidiAttr = component.getAttribute("bidiAttributes");
	var ce_type = getCEType(bidiAttr);
	if (isChain(ce_type))
		chainToView(component,ce_type);
	if (isLTRExpression(ce_type))
		component.style.textAlign = "left";
	else if(isGuiMirrored(component))
		component.style.textAlign = "right";
	else
		component.style.textAlign = "left";
}

function input_bidi_onfocus(event, component) {
	if (component.disabled || component.readOnly) {
		return;
	}
	var bidiAttr = component.getAttribute("bidiAttributes");
	var ce_type = getCEType(bidiAttr);
	if (isChain(ce_type))
		chainToEdit(component,ce_type);
	if (isLTRExpression(ce_type))
		component.style.textAlign = "left";
	else if(isInputContextual(component)) {
		if (isBiDiContextual(component,component.value))
			component.style.textAlign = "right";
		else
			component.style.textAlign = "left";
	}
	else if(!isInputRTL(component)) {
		component.style.textAlign = "left";
	}
	else {
		component.style.textAlign = "right";
	}
}

function logValue(str) {
	var result = "";
	for (var i=0; i<str.length; i++) {
		var c = str.charAt(i);
		if (c == RLE)
			result += "<RLE>";
		else if(c==LRE)
			result += "<LRE>";
		else if(c==PDF)
			result += "<PDF>";
		else if(c==LRM)
			result += "<LRM>";
		else if(c==RLM)
			result += "<RLM>";
		else
			result += str.charAt(i);
	}
	return result;
}

function isGuiMirrored(obj) {
	var lc;
	if (typeof(USERLANG) == 'undefined') {
		var lang = obj.getAttribute("langcode");
		if (!(typeof(lang) == 'undefined'))
			lc = lang;
		else
			return false;
	}
	else
		lc = USERLANG;
	if((lc=="AR")||(lc=="HE"))
		return true;
	return false;
}

function fakeOnFocus(obj) {
	setRelatedElements(obj);
}

function fileOnFocus(obj) {
	setRelatedElements(obj);
	obj.relatedElement.value = insertMarkers(obj.value,"FILEPATH","ltr");
}

function processChange(obj) {
	obj.relatedElement.value = insertMarkers(obj.value,"FILEPATH","ltr");
	obj.relatedElement.focus();
}

function onFakeKeyDown(event,obj) {
	setRelatedElements(obj);
	var e;
	if (!isIE())
		e = event;
	else {
		var w = obj.document.parentWindow;
		e = w.event;
	}
	var kCode = e.keyCode;
	if (e.altKey || e.ctrlKey || kCode == VK_SHIFT)
		return true;
	else if (!(kCode == VK_HOME || kCode == VK_END || kCode == VK_LEFT || kCode == VK_RIGHT)) {
		obj.relatedElement.focus();
		return false;
	}
	else
		return true;
}

function onFileMouseDown(obj) {
	setRelatedElements(obj);
	obj.relatedElement.focus();
	return false;
}

function onFileKeyDown(obj) {
	setRelatedElements(obj);
	obj.relatedElement.focus();
	return false;
}

function onFileKeyUp(obj) {
	return false;
}

function onFileKeyPress(obj) {
	return false;
}


function setRelatedElements(obj){
	if (obj.relatedElement) {
		return;
	}
	var nodes = obj.parentNode.childNodes;
	var target;
	for (var i = 0; i < nodes.length; i++) {
		if (obj.id == "faked_file" && nodes[i].id == "file" || obj.id == "file" && nodes[i].id == "faked_file" ) {
			target = nodes[i];
			break;
		}
	}
	obj.relatedElement = target;
	target.relatedElement = obj;
}

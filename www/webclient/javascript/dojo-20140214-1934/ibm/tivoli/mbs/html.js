//>>built
// wrapped by build app
define("ibm/tivoli/mbs/html", ["dijit","dojo","dojox","dojo/require!dojox/html/entities"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.mbs.html");

(function(){
	var _htmlEntities = [["&","amp"], ["\"","quot"], ["<","lt"], [">","gt"], ["'","#039"],  ["(","#040"], [")","#041"]];

	/**
	 * Undoes what WebClientRuntime.makesafevalue() does
	 */
	ibm.tivoli.mbs.html.decodeEntities = function(value)
	{
		dojo.require("dojox.html.entities");
		return dojox.html.entities.decode(value, _htmlEntities);
	};

	var allowedHtmlTags = ["<br/>","<br>","</br>","<b>","</b>","<strong>","</strong>"];
	/**
	 * Similar to what WebClientRuntime.makesafevalue() does
	 */
	ibm.tivoli.mbs.html.encodeEntities = function(msg)
	{
		if (undef(msg))         
			return null;
		
		var buffer="";
		
		for(var i=0; i<msg.length; i++)            
		{
			var c = msg.charAt(i);
			switch (c)
			{
				case '&': buffer+="&amp;";
					break;
				case '"': buffer+="&quot;";
					break;
				case '<':
					var preserved = false;
					for(var x=0; x<allowedHtmlTags.length; x++)
					{
						var preservedString = allowedHtmlTags[x];
						if (msg.regionMatches(i, preservedString, 0, preservedString.length))
						{
							buffer+=preservedString;
							i += preservedString.length-1;
							preserved = true;
							break;
						}
					}
					if (!preserved)
					{
						buffer+="&lt;";
					}
					break;
				case '>': buffer+="&gt;";
					break;
				case '\'': buffer+="&#039;";
					break;
				case '(': buffer+="&#040;";
					break;
				case ')': buffer+="&#041;";
					break;
				case '%': buffer+="&#037;";
					break;
				default:
					buffer+=c;
			}
		} 
		return buffer;
	};
})();
});

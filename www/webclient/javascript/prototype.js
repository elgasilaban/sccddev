/*
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 5724-U18
* (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
*
*/
String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

String.prototype.endsWith = function(str)
{
	return (this.match(str+"$")==str);
};

String.prototype.startsWith = function(str)
{
	return (this.match("^"+str)==str);
};

String.prototype.regionMatches = function(strStart, str2, str2Start, lth)
{
	if(this.substr(strStart,lth) == str2.substr(str2Start,lth))
	{
		return true;
	}
	else
	{
		return false;
	}
};


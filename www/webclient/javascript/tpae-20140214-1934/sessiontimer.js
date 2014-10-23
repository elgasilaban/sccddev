/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2006,2009 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

var BROWSERSESSREQ;
var logoutTimerID = -1;
var signedOut = false;
var SESSION_TIMEOUT;
var timeUntilLogout;//in seconds
var SESSION_WARNTIMEOUT;//in seconds.
var SESSIONRESETTHRESHHOLD = SESSION_TIMEOUT/3;//in seconds.

function resetLogoutTimer(refreshedfromhiddenframe)
{

	if(signedOut) //fail safe
		return;

	if(refreshedfromhiddenframe)
	{
		startLogoutTimer();
		return;
	}

	if (logoutTimerID != -1)
	{
		//send request to ping server and reset the timer on both layers
		//only if threshold is reached, otherwise it ping on every keydown
		if(timeUntilLogout < SESSIONRESETTHRESHHOLD)
		{
			if (window.XMLHttpRequest)
			{
				BROWSERSESSREQ = new XMLHttpRequest();
				BROWSERSESSREQ.onreadystatechange = resetTimer;
				BROWSERSESSREQ.open("GET", TIMEOUTRESETURL, true);
				BROWSERSESSREQ.send(null);
			}
			else if (window.ActiveXObject) // branch for IE/Windows ActiveX version
			{
				BROWSERSESSREQ = new ActiveXObject("Microsoft.XMLHTTP");
				if (BROWSERSESSREQ)
				{
					BROWSERSESSREQ.onreadystatechange = resetTimer;
					BROWSERSESSREQ.open("GET", TIMEOUTRESETURL, true);
					BROWSERSESSREQ.send();
				}
			}
		}
	}
}

function resetTimer()
{

	if(signedOut)
		return;

	if(SESSION_WARNTIMEOUT > 0)
	{
		var warndiv = document.getElementById("warndiv");
		if(warndiv && warndiv.style.display=='inline')
		{
			handleWarnDialog('close');
		}
	}

	if (BROWSERSESSREQ.readyState == 4)
	{
		var httpReqStatus = BROWSERSESSREQ.status;
		if (httpReqStatus == 200) //response came back fine
		{
			//upon response from server, restart timer
			var message = BROWSERSESSREQ.responseXML.getElementsByTagName("resettimer")[0];
			message = message.childNodes[0].nodeValue;
			if(message == "true")
				startLogoutTimer();
		}
		else
		{
			// Server timeout
			// 12029 to 12031 correspond to dropped connections.// Connection closed by server.
			if (SHOWLOSTCONNECTIONWARNINGONLY && isDisconnectedStatus(httpReqStatus))
			{
				showLostConnectionMsg();
				hiddenAjaxConnectiononlyCheck = window.setTimeout("checkXHRLostConnection()", CONNECTIONWARNINGINTERVAL);
			} 
			else
			{
				sessionTimeOut("logout");
			}
		}
	}
}

function startLogoutTimer() //reset when new response comes back in.
{

	if(signedOut)
		return;

	clearTimeout(logoutTimerID);
	timeUntilLogout=SESSION_TIMEOUT;
	logoutTimerID = window.setTimeout("sessionTimeOut('')",SESSION_TIMEOUT*1000);
}

function startTimer()
{

	if(signedOut)
		return;

	timeUntilLogout=timeUntilLogout-1;

	if(DEBUGLEVEL > 1)
		window.status="Total Time: "+SESSION_TIMEOUT + ", Auto Logout in: " + timeUntilLogout + " seconds, Warning in: "+SESSION_WARNTIMEOUT +" seconds";

	if(SESSION_WARNTIMEOUT > 0)
	{
		if(timeUntilLogout == SESSION_WARNTIMEOUT)
		{
			handleWarnDialog('open');
		}
		else  if(timeUntilLogout < SESSION_WARNTIMEOUT)
		{
			if(timeUntilLogout == 0)
			{
				sessionTimeOut('logout');
				return;
			}
			else
				handleWarnDialog('update');
		}
	}

	setTimeout("startTimer()",1000);//every second
}

function handleWarnDialog(eventType)
{

	if(!(SESSION_WARNTIMEOUT > 0))
		return;

	if(signedOut)
		return;

	if(eventType=="close")
	{
		window.clearInterval(logoutTimerID);
		var warndiv = document.getElementById("warndiv");
		var warndivinner = document.getElementById("warndiv_inner");
		warndiv.style.display = 'none';
		warndiv['aria-hidden'] = 'true';
		warndivinner['aria-hidden'] = 'true';
		dialogCount--;
		modalTopZ-=10;
		showObjs();
		timeUntilLogout=0;
		resetLogoutTimer(false);
		startLogoutTimer();
		reFocusItem();
		return;
	}

	//open window here

	var warndiv = document.getElementById("warndiv");
	var warndivinner = document.getElementById("warndiv_inner");
	var warnmsg = document.getElementById("warndiv_warnmsg");

	timetoelapse = Math.floor(timeUntilLogout/60);
	if(timetoelapse==0 || timetoelapse==1)
		newtext = WARNTEXTSECS.replace("{0}",timeUntilLogout+"");
	else
		newtext = WARNTEXTMINS.replace("{0}",timetoelapse+"");

	var totalmin = SESSION_TIMEOUT / 60;
	newtext = newtext.replace("{1}",totalmin+"");
	newtext = newtext.replace("{2}",PRODUCTNAME);

	if(eventType=="update")
	{
		warndiv.style.display = 'inline';
		warndivinner.style.display = '';
		warndiv['aria-hidden'] = 'false';
		warnmsg.innerHTML = "";
		warnmsg.innerHTML = newtext;
	}

	if(eventType=="open")
	{
		dialogCount++;
		warndiv.style.display = 'inline';
		warndivinner.style.display = '';
		warndiv['aria-hidden'] = 'false';
		warnmsg.innerHTML = newtext;
		setDialogPosition("warndiv","warndiv",450);
		hideObjs();
		warndiv.focus();
	}
}

function sessionTimeOut(override)
{

	if (logoutTimerID != -1 || (!undef(override) && override=='logout'))
	{
		clearTimeout(logoutTimerID);
		signedOut = true;
		showLoginPage(true);
	}
}

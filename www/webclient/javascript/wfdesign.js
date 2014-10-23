/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 * 5724-U18
 * (C) COPYRIGHT IBM CORP. 2006,2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

	var wfNodes = new Array;
	var wfActions = new Array;
	var wfCanvas = null;
	var canvasSizer;

	function selectApplet(id)
	{
		if(canvasAvailable(id))
		{	
			try
			{
				wfCanvas.setActive();
			}
			catch(error)
			{
			}
		}
	}

	function wfprocess(id, name, editable, zoom)
	{
		this.id=id;
		this.name=name;
		this.editable=editable;
		this.zoomLevel=zoom;
	}

	function wfnode(id)
	{
		this.id=id;
	}

	function wfaction(id)
	{
		this.id=id;	
	}

	function refreshCanvas(id)
	{
		if(!canvasAvailable(id))
			return;

		if(wfCanvas.readyState!="complete")
			return;
			
		sendEvent(canvas.id, "updateapplet", '');
	}
	
	function buildWorkFlow(id, wfNodes, wfActions, zoomlevel, editable, nodeRow, actionRow, selected, reload)
	{
		if(!canvasAvailable(id))
			return;

		var nodeCount = wfNodes.length;
		
		for(var i=0;i<nodeCount;i++)
		{
			with(wfNodes[i])
			{
				wfCanvas.addNode(id, row, type, x, y, title, false );
			}
		}
		var actionCount=wfActions.length;
		for(var j=0;j<actionCount;j++)
		{
			with(wfActions[j])
			{
				wfCanvas.addAction(id, row, ownerrow, ownerid, memberid, ispositive, false);
			}
		}
		wfCanvas.openWorkflow(zoomlevel, nodeRow, actionRow, selected, reload);
		hideWait();
	}

	function canvasAvailable(id)
	{
		wfCanvas = document.getElementById(id);
		if(!wfCanvas)
		{
			alert("Error: Workflow canvas Applet not found!");
			return false;
		}
		
		return true;
	}

	function makeCanvasVisible(vis, id)
	{
		var canvas = document.getElementById(id);
		if(!canvas)
			return;
		var canvasControl = getControl(wfCanvas);
		if(!canvasControl)
			return;
		if(vis)
		{
			canvasControl.style.top=0;
			window.setTimeout(makeCanvasFullHeight, 0);
			wfCanvas.tabIndex="0";
			canvasSizer=dojo.connect(window, "resize", null, makeCanvasFullHeight);
		}
		else
		{
			canvasControl.style.top=-5000;
			wfCanvas.tabIndex="-1";
			dojo.disconnect(canvasSizer);
		}
	}

	function makeCanvasFullHeight()
	{
		var canvasControl = getControl(wfCanvas);
		if(!canvasControl)
			return;
		var vs = dojo.window.getBox();
		var available = parseInt(vs.h) - parseInt(getTopPosition(canvasControl));
		wfCanvas.height=available+"px";
	}

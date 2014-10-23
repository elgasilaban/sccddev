//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/helpers/MapFullScreenHelper", ["dijit","dojo","dojox","dojo/require!dojo/dom"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

dojo.provide("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper");

dojo.require("dojo.dom");

/**
 * MapFullScreenHelper implementation. Encapsulates the full screen code.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.helpers.MapFullScreenHelper", ibm.tivoli.fwm.mxmap._Base, {
	map: null,
	mapDivElement: null,
	mapDivWidth: null,
	mapDivHeight: null,
	_fullScreenOn: false,
	_keyHandler: null,
	_origViewPortContent: null,
	_oldOverflow: null,
	_oldBodyParentOverflow: null,
	_origClientAreaInfo: null,
	_origOnScrollFunction: null,
	mapToolbar: null,
	_isAndroid: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._fullScreenOn = false;
		this._isAndroid = navigator.userAgent.indexOf("Android") > -1;
	},
	_checkForESCKey: function(event)
	{
		if (event.keyCode == dojo.keys.ESCAPE)
		{
			this.fullScreenModeOff();
		}
	},
	_doPreSetupIfIE: function(saveData)
	{
		if (dojo.isIE && true !== this.map.isMobile)
		{
			// Need to adjust the client area due to fix of issue 12-10107
			// we make the client area 'full screen'
			// clientAreaId is a value that is made available by Maximo
			if (window.clientAreaId)
			{
				var clientArea = dojo.byId(window.clientAreaId);
				if (clientArea)
				{
					if (true === saveData)
					{
						var position = (clientArea.style.position || "relative");
						var overflow = (clientArea.style.overflow || "auto");
						this._origClientAreaInfo = {
							height: clientArea.style.height,
							width: clientArea.style.width,
							scrollTop: clientArea.scrollTop,
							scrollLeft: clientArea.scrollLeft,
							position: position,
							overflow: overflow
						};
					}
					else
					{
						this._origClientAreaInfo = {
							height: clientArea.style.height,
							width: clientArea.style.width,
							scrollTop: this._origClientAreaInfo.scrollTop,
							scrollLeft: this._origClientAreaInfo.scrollLeft,
							position: this._origClientAreaInfo.position,
							overflow: this._origClientAreaInfo.overflow
						};
					}
					clientArea.scrollTop = 0;
					clientArea.scrollLeft = 0;
					dojo.style(clientArea, {
						'width': dijit.getViewport().w + "px",
						'height': dijit.getViewport().h + "px",
						'top': '0px',
						'left': '0px',
						'position': 'absolute',
						'overflow': 'hidden'
					});

				}
			}
			// Hides the applet so it will not show up on the map when in full
			// screen mode
			var calendarViewDiv = dojo.byId("calviewAppletDiv");
			if (calendarViewDiv != null)
			{
				dojo.style(calendarViewDiv, {
					'display': 'none'
				});
			}
		}
	},
	_undoPreSetupIfIE: function()
	{
		if (dojo.isIE && true !== this.map.isMobile)
		{
			// Need to adjust the client area due to fix of issue 12-10107
			// we make the client area 'full screen'
			// clientAreaId is a value that is made available by Maximo
			if (window.clientAreaId)
			{
				var clientArea = dojo.byId(window.clientAreaId);
				if (clientArea)
				{
					dojo.style(clientArea, {
						'width': this._origClientAreaInfo.width,
						'height': this._origClientAreaInfo.height,
						'position': this._origClientAreaInfo.position,
						'overflow': this._origClientAreaInfo.overflow
					});
					clientArea.scrollTop = this._origClientAreaInfo.scrollTop;
					clientArea.scrollLeft = this._origClientAreaInfo.scrollLeft;
				}
			}
			// Shows the applet again
			var calendarViewDiv = dojo.byId("calviewAppletDiv");
			if (calendarViewDiv != null)
			{
				dojo.style(calendarViewDiv, {
					'display': 'block'
				});
			}
		}
	},
	fullScreenModeOn: function()
	{
		if (this._fullScreenOn == false)
		{
			this._doPreSetupIfIE(true);
			// 12-12451. _adjustScrolls() is now being called before
			// _adjustMapToFullScreen() so that the scroll does not
			// affect the value of dijit.getViewport().w
			this._adjustScrolls();
			this._setViewPortSettings();
			this._adjustMapToFullScreen();
			this._hideElementsHackOn();
			/* 12-10287 */
			this._adjustOpacity();
			this._fullScreenOn = true;
			this._keyHandler = dojo.connect(document, "onkeypress", dojo.hitch(this, this._checkForESCKey));

			// Issue 12-11271
			var _left = 0;
			window.top.scrollTo(_left, 0);

			// need to notify the map of the changes in div size
			// 12-10547 - reduces in this.map.toolbar.getToolbarHeight() pixels
			// the height to not hide the map info at the bottom
			var toolbarHeight = 0;
			if (this.map.toolbar)
			{
				toolbarHeight = this.map.toolbar.getToolbarHeight();
			}
			this.map.getMapstraction().resizeTo(dijit.getViewport().w, dijit.getViewport().h - toolbarHeight);
			dojo.publish("mapFullScreenModeChanged_" + this.map.getId(), [ {
				modeOn: true
			} ]);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[MapFullScreenHelper] Full Screen is already on");
			}
		}
	},
	_adjustMapToFullScreen: function()
	{
		//console.log("[_adjustMapToFullScreen] Viewport = " + dijit.getViewport().w + "," + dijit.getViewport().h);
		
		// On Android, after we make it full screen and the user had zoomed into the page,
		// the resize event is called multiple times, the last one of which with a wrong
		// (too small) size. We ignore those resize events here, assuming we already
		// resized to the correct size.
		if (dijit.getViewport().w < 200 || dijit.getViewport().h < 200)
		{
			return;
		}
		
		var _top = "0px";
		var _left = 0;
		if (this.mapToolbar)
		{
			var divElement = this.mapToolbar.getToolbarDivElement();
			// 12-13272. Do not set z-index if IE, otherwise maximo dialogs will
			// be hidden
			if (dojo.isIE && (this.map.isMobile == true))
			{
				dojo.style(divElement, {
					'width': dijit.getViewport().w + "px",
					'top': '0px',
					'left': _left + "px",
					'position': 'absolute'
				});
			}
			else
			{
				dojo.style(divElement, {
					'width': dijit.getViewport().w + "px",
					'top': '0px',
					'left': _left + "px",
					'position': 'absolute',
					'zIndex': '1001'
				});
			}
			_top = divElement.offsetHeight + "px";
		}
		// 12-10547 - reduces in 20 pixels the height to not hide the map info
		// at the bottom
		// 12-10765 and 12-10674 - reduces zIndex
		// 12-12707 - using the correct toolbar height
		var toolbarHeight = 0;
		if (this.map.toolbar)
		{
			toolbarHeight = this.map.toolbar.getToolbarHeight();
		}

		//console.log("[_adjustMapToFullScreen] toolbarHeight = " + toolbarHeight);
		//console.log("[_adjustMapToFullScreen] Viewport = " + dijit.getViewport().w + "," + dijit.getViewport().h);
		
		// 12-13272. Do not set z-index if IE, otherwise maximo dialogs will be
		// hidden
		if (dojo.isIE && (this.map.isMobile == true))
		{
			dojo.style(this.mapDivElement, {
				'width': dijit.getViewport().w + "px",
				'height': (dijit.getViewport().h - toolbarHeight) + "px",
				'top': _top,
				'left': _left + "px",
				'position': 'absolute'
			});
		}
		else
		{
			dojo.style(this.mapDivElement, {
				'width': dijit.getViewport().w + "px",
				'height': (dijit.getViewport().h - toolbarHeight) + "px",
				'top': _top,
				'left': _left + "px",
				'position': 'absolute',
				'zIndex': '1000'
			});
		}
	},
	_hideElementsHackOn: function()
	{
		if (this._isAndroid || dojo.isIE)
		{
			// Issue 12-11443
			// Remove the map from the DOM so it doesn't get hidden by the
			// workaround
			this.mapParent = this._removeMapFromParent();
			// Hide all elements in the page that will be behind the map
			this._hidePageElements();
			// Re-add the map to the page
			this._addMapToParent(document.body);
		}
	},
	_hideElementsHackOff: function()
	{
		if (this._isAndroid || dojo.isIE)
		{
			// Issue 12-11443
			// Remove the map from the root node and add it back to its parent
			this._removeMapFromParent();
			this._addMapToParent(this.mapParent);
			// Return all nodes to their previous visibility
			this._showPageElements();
		}
		if (dojo.isIE)
		{
			// After restoring, IE left most of the screen blank. This nudges
			// it to redraw and fixes the problem.
			window.onresize();
		}
	},
	_removeMapFromParent: function()
	{
		var _parent = this.mapDivElement.parentNode;
		_parent.removeChild(this.mapDivElement);
		if (this.mapToolbar)
		{
			_parent.removeChild(this.mapToolbar.getToolbarDivElement());
		}

		return _parent;
	},
	_addMapToParent: function(parent)
	{
		if (this.mapToolbar)
		{
			parent.appendChild(this.mapToolbar.getToolbarDivElement());
		}
		parent.appendChild(this.mapDivElement);
	},
	_hidePageElements: function()
	{
		// Exclude the dialogs HTML from hiding or they won't work
		var dialogholder = dojo.byId("dialogholder");
		var dialogs = dojo.query(".dijitDialog");
		// 12-13323. Adding the wait div to the exclude list.
		var waitDiv = dojo.byId("wait");
		var excludes = [ dialogholder, waitDiv ].concat(dialogs);
		dojo.query("body *").forEach(function(node, index, arr)
		{
			if (node.style
			// Also exclude all the descendants of excluded divs
			&& !dojo.some(excludes, function(parent)
			{
				return dojo.dom.isDescendant(node, parent);
			}))
			{
				node._fwm_display_ = node.style.display;
				node.style.display = "none";
			}
		});
	},
	_showPageElements: function()
	{
		dojo.query("body *").forEach(function(node, index, arr)
		{
			if (node.style && "_fwm_display_" in node)
			{
				node.style.display = node._fwm_display_;
			}
		});
	},
	_adjustOpacity: function()
	{
		// maximo contains opacity from 0 to 100 in increments of 5
		for ( var counter = 0; counter < 100; counter += 5)
		{
			dojo.query(".opacity_" + counter).style("opacity", "1.0");
		}
	},
	_restoreOpacity: function()
	{
		// maximo contains opacity from 0 to 100 in increments of 5
		for ( var counter = 0; counter < 100; counter += 5)
		{
			dojo.query(".opacity_" + counter).style("opacity", "." + counter);
		}
	},
	_adjustScrolls: function()
	{
		// Store the overflow state we have to restore later.
		// IE had issues, so have to check that it's defined. Ugh.
		var body = dojo.body();
		if (body.style && body.style.overflow)
		{
			this._oldOverflow = dojo.style(body, "overflow");
		}
		else
		{
			this._oldOverflow = "";
		}
		if (dojo.isIE)
		{
			// IE will put scrollbars in anyway, html (parent of body)
			// also controls them in standards mode, so we have to
			// remove them, argh.
			if (body.parentNode && body.parentNode.style && body.parentNode.style.overflow)
			{
				this._oldBodyParentOverflow = body.parentNode.style.overflow;
			}
			else
			{
				try
				{
					this._oldBodyParentOverflow = dojo.style(body.parentNode, "overflow");
				}
				catch (e)
				{
					this._oldBodyParentOverflow = "scroll";
				}
			}
			dojo.style(body.parentNode, "overflow", "hidden");
		}
		dojo.style(body, "overflow", "hidden");
		// 12-12456. Intercepts the scroll event and forces a scroll to the top
		// This is necessary because of the middle mouse button scroll (it can't
		// be disabled in FF)
		this._origOnScrollFunction = window.onscroll;
		window.onscroll = function(e)
		{
			window.top.scrollTo(0, 0);
		};
	},
	_restoreScrolls: function()
	{
		var body = dojo.body();
		if (dojo.isIE && !dojo.isQuirks)
		{
			body.parentNode.style.overflow = this._oldBodyParentOverflow;
		}
		dojo.style(body, "overflow", this._oldOverflow);
		// Restores the onscroll handler
		window.onscroll = this._origOnScrollFunction;
	},
	_setViewPortSettings: function()
	{
		// configure viewport settings to no allow users to scale the screen
		var viewPortMeta = dojo.query('meta[name="viewport"]')[0];
		if (viewPortMeta)
		{
			this._origViewPortContent = dojo.attr(viewPortMeta, "content");
			// 12-13165. Removing maximum-scale=1.0. For some reason, even after
			// restoring viewport settings
			// the maximum-scale property was persisting...
			if (this._isAndroid)
			{
				//console.log("[_setViewPortSettings] Viewport before null = " + dijit.getViewport().w + "," + dijit.getViewport().h);
				dojo.attr(viewPortMeta, "content", null);
				//console.log("[_setViewPortSettings] Viewport after null = " + dijit.getViewport().w + "," + dijit.getViewport().h);
				dojo.attr(viewPortMeta, "content", "initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width");
				//console.log("[_setViewPortSettings] Viewport after device-width= " + dijit.getViewport().w + "," + dijit.getViewport().h);
			}
			else
			{
				dojo.attr(viewPortMeta, "content", "initial-scale=1.0,user-scalable=no,width=device-width");
			}
		}
		else
		{
			var meta = dojo.create("meta", {
				name: "viewport",
				content: "initial-scale=1.0, user-scalable=no"
			});
			/* 12-11086 */
			this._origViewPortContent = dojo.create("meta", {
				name: "viewport",
				content: "initial-scale=1.0, user-scalable=yes"
			});
			document.getElementsByTagName("head")[0].appendChild(meta);
		}
	},
	_removeViewPortSettings: function()
	{
		var viewPortMeta = dojo.query('meta[name="viewport"]')[0];
		if (viewPortMeta)
		{
			// The statement below is necessary because of issue 12-13165. It's a
			// workaround for an Android bug.
			dojo.attr(viewPortMeta, "content", null);
			dojo.attr(viewPortMeta, "content", this._origViewPortContent);
		}
	},
	fullScreenModeOff: function()
	{
		if (this._fullScreenOn == true)
		{

			this._hideElementsHackOff();

			this._undoPreSetupIfIE();
			this._restoreMapToOriginalSize();
			this._restoreScrolls();
			/* 12-10287 */
			this._restoreOpacity();
			this._fullScreenOn = false;
			if (this._keyHandler)
			{
				dojo.disconnect(this._keyHandler);
				this._keyHandler = null;
			}
			/* 12-11086: changed user-scalable to yes */
			this._removeViewPortSettings();

			// need to notify the map of the changes in div size
			this.map._resize();// .getMapstraction().resizeTo(this.mapDivWidth,
			// this.mapDivHeight);
			dojo.publish("mapFullScreenModeChanged_" + this.map.getId(), [ {
				modeOn: false
			} ]);
		}
		else
		{
			if (dojo.config.fwm.debug == true)
			{
				console.warn("[MapFullScreenHelper] Full Screen is already off");
			}
		}
	},
	_restoreMapToOriginalSize: function()
	{
		dojo.style(this.mapDivElement, {
			'width': this.mapDivWidth,
			'height': this.mapDivHeight,
			'top': '0px',
			'left': '0px',
			'position': 'relative',
			'zIndex': ''
		});
		if (this.mapToolbar)
		{
			var divElement = this.mapToolbar.getToolbarDivElement();
			dojo.style(divElement, {
				'width': this.mapDivWidth,
				'top': this.mapDivElement.style.top,
				'left': this.mapDivElement.style.left,
				'position': 'relative',
				'zIndex': ''
			});
		}
	},
	updateMapDimensions: function(newWidth, newHeight)
	{
		this.mapDivWidth = newWidth;
		this.mapDivHeight = newHeight;

		// 12-10601
		if (this._fullScreenOn == true)
		{
			this._doPreSetupIfIE(false);
			//console.log("[MapFullScreenHelper] updateMapDimensions");
			this._adjustMapToFullScreen();
		}
	}
});
});

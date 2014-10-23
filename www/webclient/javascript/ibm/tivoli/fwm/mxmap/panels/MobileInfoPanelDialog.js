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
dojo.provide("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Button");

dojo.declare("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog", null, {
	map: null,
	title: null,
	_theDialog: null,
	_content: null,
	mainSec: null,
	undercontent: null,
	fitHeight: false,
	constructor: function(options)
	{
		dojo.mixin(this, options);
	},
	createDialog: function()
	{
		var height = this.getCalculatedHeight();
		var width = this.getCalculatedWidth();

		var title = this.title || "";

		var dialogOpts = {
			title: title,
			// 12-12908. Dijit.Dialog has a bug in which the title bar's "x" close button does not
			// work in mobile devices if draggable is set to true.
			draggable: this.map.isMobile ? false:true,
			closable: false,
			style: "width: " + (width) + "px; max-height: " + (height) + "px; overflow-y: auto;"
		};

		this._theDialog = new dijit.Dialog(dialogOpts);
		this._cancelHandler=dojo.connect(this._theDialog,"onCancel",dojo.hitch(this,this._resetMaximoDialogStates));
		// this._theDialog.layout(this.map.getMapstraction().currentElement);
		// this._theDialog.placeAt(this.map.getMapstraction().currentElement);
		// does not work, puts the dialog below the map images

		dojo.connect(window, "onresize", this, this._onResize);
	},
	full: null,
	center: null,
	bottom: null,
	_createContentSection: function(content)
	{
		if (this.center != null && false)
		{
			dojo.place(content, this.center, 'first');
			return this.full;
		}
		else
		{

			var _content = dojo.create("div", {
				style: {
					width: (this.getCalculatedWidth() - this.fixedpaddingw) + "px"
				}
			});
			this.full = _content;
			var mainSec = dojo.create("div", {
				style: {
					overflowY: "auto",
					overflowX: "auto",
					maxHeight: (this.getCalculatedHeight() - this.fixedpaddingh) + "px",
					width: (this.getCalculatedWidth() - this.fixedpaddingw) + "px"
				}
			}, _content);
			// 12-12821. IE ignores the "max-height" attribute so
			// "height" must be used instead.
			if (dojo.isIE && this.fitHeight)
			{
				mainSec.style.height = (this.getCalculatedHeight() - this.fixedpaddingh) + "px";
			}
			this.center = mainSec;
			dojo.place(content, mainSec, 'only');

			var btnDiv = dojo.create("div", {
				"mxnId": "btnDiv",
				"class": "infoPanelCloseBtn",
				"style": {
					"textAlign": (document.body.dir == "rtl") ? "left" : "right"
				}
			}, _content);
			this.btnDiv = btnDiv;

			var btn2 = dojo.create("div", {
				"mxnId": "btn"
			}, btnDiv);

			var _closeButtonLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "infopaneldialogclose");
			this.closeBtn = new dijit.form.Button({
				label: _closeButtonLabel,
				onClick: dojo.hitch(this, function()
				{					
					this.close();
				})
			}, btn2);

			return _content;
		}

	},
	_myFct: function()
	{

	},
	setContent: function(content)
	{
		// Issue 12-11310. The dialog needs to be created every time because the
		// browser window may have
		// been resized since the last time that setContent was called.
		// if (this._theDialog == null)
		// {
		this.createDialog();
		// }
		// console.log("CALLED
		// setContent",this._createContentSections(content));
		this._theDialog._myFct = function()
		{

		};
		this._theDialog.set("content", this._createContentSection(content));

	},
	_onResize: function()
	{
		if (this._theDialog && this._theDialog.get("open"))
		{
			this._recalculateDimensions();
		}
	},
	_recalculateDimensions: function()
	{
		var width = this.getCalculatedWidth();

		if (this.fitHeight)
		{
			var height = this.getCalculatedHeight();
			this._theDialog.resize({w: width, h: height});
			this.center.style.height = (height - this.fixedpaddingh);
		}
		else
		{
			this._theDialog.resize({w: width});
		}
		this.center.style.width = (width - this.fixedpaddingw);
		this.btnDiv.style.width = (width - this.fixedpaddingw);

		this._theDialog.show();
	},
	getCalculatedWidth: function()
	{
		// 12-13416. Very ugly workaround to overcome the fact that there is no way
		// to handle a pinch zoom event in Android
		var isAndroid = navigator.userAgent.indexOf("Android") > -1;
		if(isAndroid)
		{
			this.map._resize();
		}
		
		var MIN_WIDTH = 310;
		var viewPortWidth = this.map.getWidthInPixels();

		if (this.map.isMobile)
		{
			var width = Math.ceil(viewPortWidth * 0.4);
		}
		else
		{
			var width = Math.ceil(viewPortWidth * 0.5);
		}

		if (width > MIN_WIDTH)
		{
			return width;
		}
		// 12-13416. Never let the dialog width be greater than the viewport width.
		if (MIN_WIDTH > viewPortWidth)
		{
			return viewPortWidth;
		}

		return MIN_WIDTH;
	},
	getCalculatedHeight: function()
	{
		// var height = this.map.getHeightInPixels(); //gets the wrong height in
		// fullscreenmode
		var mapHeight = Math.min(dojo.window.getBox().h,
				dojo.marginBox(this.map.getMapstraction().currentElement).h);
		
		// Defect 61760. Minimum height defined for dialogs when the map height is too small
		// This does not apply to mobile maps (everyplace apps), otherwise the close buttons can be hidden in iDevices.
		var height = Math.ceil(mapHeight * 0.85);
		
		if (this.map.isMobile)
		{
			return height;
		}

		var MIN_HEIGHT = 400;
		if (height > MIN_HEIGHT)
		{
			return height;
		}

		return MIN_HEIGHT;
	},
	close: function()
	{
		if (this._theDialog)
		{
			// destroy on the dialog has a conflict with Maximo code.
			// removing all the descendants ease enough the nodes on the DOM
			// tree
			// this._theDialog.destroyDescendants(false);
			this._theDialog.hide();
			// this._theDialog = null;
			// this.closeBtn.destroyRecursive();
			// this.closeBtn = null;
			// maximo!
		}
		this._resetMaximoDialogStates();
	},
	_resetMaximoDialogStates:function(){
		dialogCount--;
		showObjs();		
	},
	fixedpaddingw: 25,
	fixedpaddingh: 80,
	show: function()
	{
		this._recalculateDimensions();
		this._theDialog.show();
		// MAXIMO hide applets
		hideObjs();
		dialogCount++;
	},
	closeBtn: null,
	onCancel: function()
	{
		this.close();
	}
});
//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/Overview/Pod", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dojo/i18n,dijit/_Widget,dijit/_Templated,dijit/form/Button,dijit/layout/BorderContainer,dijit/DialogUnderlay,dijit/Dialog,dijit/_DialogMixin,ibm/tivoli/simplesrm/srm/dijit/MultipleModal,ibm/tivoli/simplesrm/srm/dijit/OpenHelp"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.View");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.DataTable");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Overview.Details");

dojo.require("dojo.i18n");
dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.Button");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.DialogUnderlay");
dojo.require("dijit.Dialog");
dojo.require("dijit._DialogMixin");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");

// Summary:
//	Overview.Pod is the rectangular box holding the overview data.
//	Overview.View is the contents contained within the Pod
//	Overview.DataTable is a 2-column table, with the styling specified for the Pods
//
//	It's up to classes derived from Overview.Pod to create their own view, and know how
//	to get their data, making each Pod type self-contained.
//
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.Pod", [dijit._Widget, dijit._Templated],
{
	widgetsInTemplate: true,
	templateString: '<div><table class="pod" border="0" cellpadding="0" cellspacing="0">\n'+
				 '	<tr><td class="top-lt"></td><td class="top-ctr"></td><td class="top-rt"></td></tr>\n'+
				 '	<tr><td class="lt"></td><td class="ctr">\n'+
				 '		<div class="OverviewPod">\n'+
				 '				<h2 class="title">${heading}</h2>\n'+
				 '				<div dojoAttachPoint="_view" dojoType="${viewType}" view_dialog="${view_dialog}"></div>\n'+
				 '				<div dojoAttachPoint="footer" class="footer"><a href="${detailsUrl}" dojoAttachPoint="detailsLink">${detailsLinkLabel}</a></div>\n'+
				 '			</div>\n'+
				 '		</td><td class="rt"></td></tr>\n'+
				 '	<tr><td class="bot-lt"></td><td class="bot-ctr"></td><td class="bot-rt"></td></tr>\n'+
				 '</table></div>',

	viewType: "ibm.tivoli.simplesrm.srm.dijit.Overview.View",
	detailsType: "",
	autoRefreshProperty: "",
	heading: "",
	detailsLinkLabel: "",
	detailsUrl: "#",
	autoRefreshInterval: Number.NaN,
	_mostRecent: 0,		// time of the most recent record.  Used to compare records when auto-updating
	_autoRefreshTimerId: -1,

	_view: null,		// my Overview.View object
	_details: null,		// my details pop-up window
	_detailsData: null,	// my details data
	 view_dialog: "",   //tpae Dialog to launch when clicking on SR
	
	constructor: function()
	{
		console.log("OverviewPod.Pod.ctor");
	},
	postMixInProperties: function()
	{
		this.inherited(arguments);
		if(isNaN(this.autoRefreshInterval) && this.autoRefreshProperty.length > 0) {
			this.autoRefreshInterval = parseInt(ibm.tivoli.tpae.dojo.data.getConfigProperty(this.autoRefreshProperty),10);
			if(isNaN(this.autoRefreshInterval) || this.autoRefreshInterval < 0) {
				this.autoRefreshInterval = Number.NaN;
			}
		}
	},
	postCreate: function()
	{
		this.inherited(arguments);
		this.connect(this.detailsLink, "onclick", this.onShowDetails);
	},
	// requery data
	refresh: function()
	{
		// override in derived pods to requery data
	},
	// _onDataReady should be called when the derived class' data is updated
	//	If you provide an implementation in your derived class, you should probably
	//	call this.inherited(arguments)
	_onDataReady: function()
	{
		dojo.removeClass(this.footer, "invisible");
		try {
			this.onRefresh(this._detailsData);
		}
		catch(ex) {
			console.log("Error in onRefresh handler");
		}
	},
	_refreshErrorCount: 0,
	__refreshError: function(response)
	{
		++this._refreshErrorCount;
		ibm.tivoli.logger.warn("RequestPod refresh failure: " + response);
		this._resetPoll();
	},
	_cancelPoll: function()
	{
		if(this._autoRefreshTimerId > 0) {
			window.clearTimeout(this._autoRefreshTimerId);
			this._autoRefreshTimerId = 0;
		}
	},
	_resetPoll: function()
	{
		if(!isNaN(this.autoRefreshInterval)) {
			this._cancelPoll();
			this._autoRefreshTimerId = window.setTimeout(dojo.hitch(this, this._poll), (this._refreshErrorCount +1) * this.autoRefreshInterval);
		}
	},
	_poll: function()
	{
		// override for your autoupdate polling query
	},
	// Summary:
	// 	event fired when the pod is refreshed with new data
	// 	latest_data: the new data set
	onRefresh: function(latest_data)
	{
	},
	// Summary:
	//	Called when the user clicks the details link
	onShowDetails: function()
	{
		// lazy create
		if(!this._details) {
			dojo["require"](this.detailsType);
			//dojo.require(this.detailsType);		
			//dojo._loadModule(this.detailsType);
			
			var cls = dojo.getObject(this.detailsType);
			this._details = new cls();
		} else {
			if (this._details.detailsWidget.toolBar) //clear search field 
				this._details.detailsWidget.toolBar.searchField.searchField.value = "";
		}
		this._details.refresh(this._detailsData);
		this._details.show();
	}
});
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.View", [dijit._Widget, dijit._Templated],
{
	_detailsData: null
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.DataTable", [dijit._Widget, dijit._Templated],
{
	templateString: '<div class="OverviewPodDataTable">\n' +
					'	<table class="OverviewPodDataTable" dojoAttachPoint="overviewPodDataTable">\n' +
					'		<caption dojoAttachPoint="tableCaption">${heading}</caption>\n' +
					'		<tbody></tbody>\n' +
					'	</table>\n' +
					'</div>\n',
	heading: "",
	maxRows: 5,
	
	addRow: function(leftcol, rightcol)
	{
		if(undefined == this.overviewPodDataTable) return null;
		var i = 0;
		try {
			i = this.overviewPodDataTable.rows.length;
		}
		catch(ex) {
			console.error("",ex);
		}
		if(i > this.maxRows) {return null;}

		var r = this.overviewPodDataTable.insertRow(i);
		var cell = r.insertCell(0);
		cell.className = "left";
		cell.innerHTML = undefined == leftcol ? "..." : leftcol;
				
		cell = r.insertCell(1);
		cell.className = "right";
		cell.innerHTML = undefined == rightcol ? "..." : "<span class='nowrap'>" + rightcol + "</span>";
		
		//Check if Pod width needs to be increased because of extra long row
		var row_width = dojo.coords(r).w;
		var container = r.parentNode.parentNode.parentNode.parentNode.parentNode;
		if (dojo.hasClass(container,"OverviewPod")) {
		   var container_width = dojo.coords(container).w;
		   if ( row_width > container_width)
		      dojo.style(container,{width: row_width});
		}
		
		return r;
	},
	deleteRow: function(rowIndex)
	{
		this.overviewPodDataTable.deleteRow(rowIndex);
	},
	clear: function()
	{
		var nrows = this.overviewPodDataTable.rows.length;
		for(var i = 0; i < nrows; ++i) {
			this.deleteRow(0);
		}
	},
	_setHeadingAttr: function(newcap)
	{
		this.heading = this.tableCaption.innerHTML = newcap;
	}
});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Overview.Details", 
		[dijit._Widget,
		 dijit._Templated,ibm.tivoli.simplesrm.srm.dijit.MultipleModal,
		 ibm.tivoli.simplesrm.srm.dijit.OpenHelp],
{
	//used to control tabbing/focus 
	_getFocusItems : dijit._DialogMixin.prototype._getFocusItems,
	widgetsInTemplate: true,
	templateString:"<div dojoAttachPoint='containerNode' class='tundra simplesrm'>\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<table dojoAttachPoint='glassTable' class='glass' style='width:100%;margin:auto;'>\n\t\t<tr>\n\t\t\t<td class='glass ul'></td>\n\t\t\t<td class='glass um'></td>\n\t\t\t<td class='glass ur'></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td class='glass lt'></td>\n\t\t\t<td class='glass content'>\n\t\t\t\t<div class='overview_content'>\n\t\t\t\t\t<div class='my_records_grid_header'>\n\t\t\t\t\t\t<button class='overviewPodButton'\n\t\t\t\t\t\t\tdojoType='dijit.form.Button'\n\t\t\t\t\t\t\ticonClass='closeDetailsIcon'\n\t\t\t\t\t\t\tshowLabel='false'\n\t\t\t\t\t\t\tdojoAttachEvent='onClick:hide'>\n\t\t\t\t\t\t\t${closeBtnLabel}\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class='overviewPodButton'\n\t\t\t\t\t\t\tdojoType='dijit.form.Button'\n\t\t\t\t\t\t\ticonClass='helpDetailsIcon'\n\t\t\t\t\t\t\tshowLabel='false'\n\t\t\t\t\t\t\tdojoAttachEvent='onClick:showHelp'>\n\t\t\t\t\t\t\t${helpBtnLabel}\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<h2 class='grid_heading'>${headingText}</h2>\n\t\t\t\t\t\t<div class='clear'></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div dojoAttachPoint='detailsWidget' dojoType='${detailsType}'></div>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t\t<td class='glass rt'></td>\t\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td class='glass ll'></td>\n\t\t\t<td class='glass lm'></td>\n\t\t\t<td class='glass lr'></td>\n\t\t</tr>\n\t</table>\n</div>\n",
	//templateString: "",
	detailsType: "",
	headingText: "",
	closeBtnLabel: "Close",
	helpBtnLabel: "Help",
	
	_detailsData: {},
	_fadeTime: 1000,	// millisecs
	_animIn: null,
	_animOut: null,
	_cshKey: "",
	_firstFocusItem: null,	//read-only,set by _getFocusItems
	_lastFocusItem: null, //read-only,set by _getFocusItems
		
	constructor: function(params){
		this.closeBtnLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Close;
		this.helpBtnLabel = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable").Help;

		//console.log("Overview.Details: constructor");
		/*if (params.cshKey) {
			this._cshKey = params.cshKey;
		} else {
			console.log("Details: no help file given");
		}*/
	},
	
	postCreate: function()
	{
		try {
			// create the faders
			var node = this.domNode;
			this._animIn = dojo.fadeIn({
				node: node, 
				duration: this._fadeTime,
				//set focus on the first (focusable) element on panel 
				onEnd: dojo.hitch(this ,function(){
					this._getFocusItems(this.domNode);
					//console.log("first focus:"+ this._firstFocusItem);
					
					//Change to last focus item. When it was set to first one, it was on the Close button
					dijit.focus(this._lastFocusItem);  
				})
			});
			
			this._animOut = dojo.fadeOut({
				node: node,
				duration: this._fadeTime,
				onEnd: function(){
					node.style.visibility="hidden";
					node.style.top = "-9999px";
				}
			 });
			
			// start hidden
			dojo.style(this.domNode, {
				visibility:"hidden",
				position:"absolute",
				display:"",
				top:"-9999px"
			});
			dojo.body().appendChild(this.domNode);

			this.connect(window, "onscroll","layout");
			this.connect(window, "onresize","resize");			
//			// load my data
//			this.refresh();
//			this.resize();
		}
		catch(ex) {
			console.error("Failed creating ibm.tivoli.simplesrm.srm.dijit.Overview.Details",ex);
			ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError("Failed creating ibm.tivoli.simplesrm.srm.dijit.Overview.Details");
			ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(ex);
		}
		this.inherited(arguments);
	},
	destroy: function()
	{
		if(this._animIn.status() == "playing"){
			this._animIn.stop();
		}
		if(this._animOut.status() == "playing"){
			this._animOut.stop();
		}
		if(this._keyhandle) {
			dojo.disconnect(this._keyhandle);
		}
	},
	
	_onkey: function(evt)
	{	/*
		 * uses _onKey method from dijit.Dialog
		 * features:
		 * 1) closing with Esc
		 * 2) tabbing only inside panel
		 * 3)if event belongs to other modal panel(widget) it doesn't proccess it
		 */
		if(!this.preOnKeyTest(evt)){
			return; // it's not your event
		}			
		var onKey = dojo.hitch(this,dijit.Dialog.prototype._onKey);
		onKey(evt);		
	},

	refresh: function()
	{
		if(this.detailsWidget && "function" == typeof this.detailsWidget.refresh){
			this.detailsWidget.refresh();
		}
	},
	resize: function()
	{
		this.layout();
	},
	_position: function(){
		// partially copied from dijit.Dialog._position
		
		var node = this.containerNode;
		var viewport = dijit.getViewport();
		
		var theapp = dojo.coords(dojo.query("body")[0]);	 
		//dojo.query(".clientarea");
		 

		var left = viewport.l > theapp.x ? viewport.l : theapp.x;
		var top = viewport.t > theapp.y ? viewport.t : theapp.y;
		var width = viewport.w < theapp.w ? viewport.w : theapp.w;

		var height = viewport.h - 200;
		if (height < 200)
			height = 200;
		
		dojo.style(node,{
			left: left + "px",
			top: top + "px",
			width: width + "px",
			height: height + "px",
			position: "absolute"
		});


		// We need to set the height in the embedded Dojo grid as well. Not IE though - causes extra space in grid
		if (!dojo.isIE) {
		   var theGrid = dojo.query('.my_records_grid_container', node)
		   if (theGrid !== undefined && theGrid.length == 1) {
			   dojo.style(theGrid[0],{height: height + "px"});
		   }
		}
	},

	layout: function(){
		// copied from dijit.Dialog._position
		// summary:
		//		Position the Dialog and the underlay		
		if(this.domNode.style.visibility != "hidden"){
			dijit._underlay.layout();
			this._position();
		}
	},	
	
	onCancel: function(){
		//	required by _onkey (dijit.Dialog._onKey)
		this.hide();
	},
		
	_keyhandle:null,
	show: function()
	{			
		if(dojo.isIE && this._hideMyRequestHandle==null)
			this._hideMyRequestHandle = dojo.subscribe("hideMyRequest", this, "hideDialog");
		
		// modify dijit.DialogUnderlay
		this.patchCode(); 		
		
		//set dijit._underlay (if not set already by other modal widget)
		// code from dijit.Dialog._setup
		var underlayAttrs = {
			dialogId: this.id,
			"class": ""			
		};				
		var underlay = dijit._underlay;
		if(!underlay){ 
			underlay = dijit._underlay = new dijit.DialogUnderlay(underlayAttrs); 
		}
		underlay.show();
				
		//set z-index above all current modal panels
		this.domNode.style.zIndex = dijit._underlay.getDialogZIndex();
				
		if(this._animOut.status() == "playing"){
			this._animOut.stop();
		}
		dojo.style(this.domNode, {
			opacity:0,
			visibility:""
		});
		this.resize();
		//onkeydown doesn't set evt.charOrCode which is used by _onkey (dijit.Dialog._onKey)
		this._keyhandle = dojo.connect(dojo.doc.documentElement, "onkeypress", this, this._onkey);
		this._animIn.play();
	},
	hide: function()
	{		
		dijit._underlay.hide();
		
		if(this._animIn.status() == "playing"){
			this._animIn.stop();
		}
		dojo.disconnect(this._keyhandle);
		this._animOut.play();
	},
	_hideMyRequestHandle : null,
	_showMyRequestHandle : null,
	showDialog: function(){
		dojo.unsubscribe(this._showMyRequestHandle);
		this._hideMyRequestHandle = dojo.subscribe("hideMyRequest", this, "hideDialog");
		if(this._animOut.status() == "playing"){
			this._animOut.stop();
		}
		dojo.style(this.domNode, {
			opacity:0,
			visibility:""
		});
		this.resize();
		//onkeydown doesn't set evt.charOrCode which is used by _onkey (dijit.Dialog._onKey)
		this._keyhandle = dojo.connect(dojo.doc.documentElement, "onkeypress", this, this._onkey);
		this._animIn.play();
	},
	hideDialog: function(){
		dijit._underlay.hide();
		dojo.unsubscribe(this._hideMyRequestHandle);
		this._showMyRequestHandle = dojo.subscribe("showMyRequest", this, "showDialog");
		this.domNode.style.visibility = "hidden";
		if(this._animIn.status() == "playing"){
			this._animIn.stop();
		}
		dojo.disconnect(this._keyhandle);
		this._animOut.play();
	},
	/**
	 * Displays the help related to this panel. The cshKey variable
	 * indicates the file name of the help document to open.
	 */
	showHelp: function() {
		//this.openHelpWindow(this._cshKey);
		window.open(this._cshKey);
	}
});

});

//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/RequestDetails", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiStringTable","dojo/require!dijit/Dialog,dijit/_Widget,dijit/_Templated,dijit/form/Button,dijit/form/CheckBox,dijit/form/SimpleTextarea,dijit/form/TextBox,ibm/tivoli/tip/dijit/TextInputBox,dijit/form/Form,dijit/layout/BorderContainer,dijit/layout/TabContainer,dijit/layout/ContentPane,ibm/tivoli/simplesrm/srm/dijit/MessageDialog,ibm/tivoli/simplesrm/srm/dijit/OpenHelp,ibm/tivoli/simplesrm/srm/dijit/MultipleModal,ibm/tivoli/simplesrm/srm/dijit/MyRecordsGrid,ibm/tivoli/simplesrm/srm/dijit/ItemChooserGrid,ibm/tivoli/simplesrm/srm/dojo/data/srmQuery,ibm/tivoli/simplesrm/srm/dojo/Utilities,ibm/tivoli/simplesrm/srm/dojo/Formatter"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.RequestDetails");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.CommLogGrid");

dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");

dojo.require("dijit.Dialog");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.SimpleTextarea");
dojo.require("dijit.form.TextBox");
dojo.require("ibm.tivoli.tip.dijit.TextInputBox");
dojo.require("dijit.form.Form");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MessageDialog");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.MyRecordsGrid");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.ItemChooserGrid");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Utilities");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Formatter");

/**
 * This panel shows the details from a service request. A dialog is embedded,
 * so per default it will show up as a popup dialog.
 *  
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.RequestDetails",
			 [dijit._Widget,
			  dijit._Templated,
			  ibm.tivoli.simplesrm.srm.dijit.MultipleModal,
			  ibm.tivoli.simplesrm.srm.dijit.OpenHelp],
{
	_uiStringTable: null,
	widgetsInTemplate: true,
	templateString:"<div class=\"templateddialog\">\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<div dojoType=\"dijit.Dialog\"\n\t\t dojoAttachPoint=\"_dialog\"\n\t\t title=\"${_uiStringTable.ViewSRTitle}\"\n\t\t class=\"tundra simplesrm templateddialog mydialog\">\n\t\t<div dojoType=\"dijit.layout.BorderContainer\"\n\t\t\tstyle=\"width:${_width};height:430px;background-color:#DCE2E7;padding:0;margin:0;\"> \n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" region=\"center\" style=\"padding:0;margin:0;\">\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\"\n\t\t\t\t\t style=\"padding:0;margin:0;font-size:10pt;\">\n\t\t\t\t\t<div dojoType=\"dijit.layout.TabContainer\"\n\t\t\t\t\t\t dojoAttachPoint=\"_tabC\"\n\t\t\t\t\t\t style=\"width:630px;height:630px;padding:0;margin:0;\">\n\t\t\t\t\t\t<div id=\"${id}_general\" dojoType=\"dijit.layout.ContentPane\"\n\t\t\t\t\t\t \t closeable=\"false\" title=\"${_uiStringTable.ViewSRGeneral}\"\n\t\t\t\t\t\t \t dojoAttachPoint=\"_gen\"\n\t\t\t\t\t\t \t style=\"background-color:#DCE2E7;padding:0;margin:0\">\n\t\t\t\t\t\t\t<div class=\"banner\">\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:50px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t<img src=\"../webclient/javascript/simplesrm/srm/dijit/images/icons/default_request.png\" width=\"50\" height=\"50\" alt=\"\"/>\n\t\t\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:370px;height:50px;margin:10px;\"\n\t\t\t\t\t\t\t\t\tdojoAttachPoint=\"_viewSrGenBannerText\">\n\t\t\t\t\t\t\t\t\t${_uiStringTable.ViewSRGenBannerApproval}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"clear\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_gen_table></div>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_attr_table></div>\n\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t\t<!--div id=\"${id}_work\" dojoType=\"dijit.layout.ContentPane\"\n\t\t\t\t\t\t\t closeable=\"false\" title=\"${_uiStringTable.ViewSRWorkLog}\" \n\t\t\t\t\t\t\t style=\"background-color:#DCE2E7;padding:0;margin:0\">\n\t\t\t\t\t\t\t<div class=\"banner\"\n\t\t\t\t\t\t\t\tdojoAttachPoint=\"_workl_banner\"\n\t\t\t\t\t\t\t\tstyle=\"height:70px;background-color:#C0CEDC;border-color:#B0B5B8;\">\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:50px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t<img src=\"../webclient/javascript/simplesrm/srm/dijit/images/icons/default_request.png\"\n\t\t\t\t\t\t\t\t\t\t width=\"50\" height=\"50\" alt=\"\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:370px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t${_uiStringTable.ViewSRWorkBanner}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_workl_table></div>\n\t\t\t\t\t\t</div-->\n\t\t\t\n\t\t\t\t\t\t<div id=\"${id}_comm\" dojoType=\"dijit.layout.ContentPane\"\n\t\t\t\t\t\t\tcloseable=\"false\" title=\"${_uiStringTable.ViewSRCommLog}\"\n\t\t\t\t\t\t\tstyle=\"background-color:#DCE2E7;padding:0;margin:0\">\n\t\t\t\t\t\t\t<div class=\"banner\"\n\t\t\t\t\t\t\t\tdojoAttachPoint=\"_comml_banner\"\n\t\t\t\t\t\t\t\tstyle=\"height:70px;background-color:#C0CEDC;border-color:#B0B5B8;\">\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:50px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t<img src=\"../webclient/javascript/simplesrm/srm/dijit/images/icons/default_request.png\"\n\t\t\t\t\t\t\t\t\t\t width=\"50\" height=\"50\" alt=\"\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:370px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t${_uiStringTable.ViewSRCommBanner}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div dojoType=ibm.tivoli.simplesrm.srm.dijit.CommLogGrid\n\t\t\t\t\t\t\t\t dojoAttachPoint=_comml_table name=\"\" \n\t\t\t\t\t\t\t\t class=\"commloggrid\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_comml_details>\n\t\t\t\t\t\t\t\t<table width=90% style=\"\"><tr>\n\t\t\t\t\t\t\t\t<td><div dojoAttachPoint=_comml_details_gen></div></td>\n\t\t\t\t\t\t\t\t<td><div dojoAttachPoint=_comml_details_det></div></td>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</tr></table>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- Venkyg : Solutions for SRs and Related Records -->\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div id=\"${id}_work\" dojoType=\"dijit.layout.ContentPane\"\n\t\t\t\t\t\t\t closeable=\"false\" title=\"${_uiStringTable.ViewSolutionForSRPR}\" \n\t\t\t\t\t\t\t style=\"background-color:#DCE2E7;padding:0;margin:0\">\n\t\t\t\t\t\t\t<div class=\"banner\"\n\t\t\t\t\t\t\t\tdojoAttachPoint=\"_workl_banner\"\n\t\t\t\t\t\t\t\tstyle=\"height:70px;background-color:#C0CEDC;border-color:#B0B5B8;\">\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:50px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t<img src=\"../webclient/javascript/simplesrm/srm/dijit/images/icons/default_request.png\"\n\t\t\t\t\t\t\t\t\t\t width=\"50\" height=\"50\" alt=\"\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:370px;height:50px;margin:10px;\">\n\t\t\t\t\t\t\t\t\t${_uiStringTable.ViewSolutionForSRPRBanner}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_workl_table></div>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<div dojoAttachPoint=_solRR_table></div>  \n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" dojoAttachPoint=\"_apprC\" class=\"approval\"\n\t\t\t\t region=\"right\" style=\"display:${_approvalDisplay}\">\n\t\t\t\t<form id=\"${id}_approvalForm\" name=\"approvalForm\" dojoType=\"dijit.form.Form\">\n\t\t\t\t\t<div style=\"width:100%;height:100%;padding:0;margin:0\">\n\t\t\t\t\t\t<div class=\"banner\">\n\t\t\t\t\t\t\t<div class=\"paneltop\" style=\"width:240px;height:20px;padding:5px;margin:0;\">\n\t\t\t\t\t\t\t\t<label style=\"font-weight:bold;font-size:10pt;\">${_uiStringTable.AppRequestBannerTitle}</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"width:240px;height:45px;padding:5px;margin:0;font-size:10pt;\">\n\t\t\t\t\t\t\t\t${_uiStringTable.AppRequestBannerDescription}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<ul style=\"list-style:none;padding-left:5px;margin-left:5px;overflow:auto\";>\n\t\t\t\t\t\t<li style=\"clear: both;\">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div style=\"float:left;width:10%\">\n\t\t\t\t\t\t\t\t\t<input dojoType=\"dijit.form.RadioButton\" id=\"${id}_reject\" name=\"process\" \n\t\t           \t\t\t\t\t\t\tchecked=\"checked\" value=\"reject\" type=\"radio\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div style=\"float:right;width:90%;\">\n\t\t\t\t\t\t\t\t\t<label style=\"word-wrap:break-word;\" for=\"${id}_reject\"><font size= \"2\"> ${_uiStringTable.RejectRequest} </font></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li style=\"clear: both;\">\n\t\t\t\t\t        <div>\n\t\t\t\t\t\t\t\t<div style=\"float:left; width:10%\">\n\t\t\t\t\t\t\t\t\t<input dojoType=\"dijit.form.RadioButton\" id=\"${id}_approve\" name=\"process\" \n\t\t\t\t\t          \t\t\t\t\t\t\t\tvalue=\"approve\" type=\"radio\">\n\t\t\t\t\t          \t</div>\n\t\t\t\t\t\t\t\t<div style=\"float: right; width: 90%;\">\n\t\t\t\t\t\t\t\t\t<label  style=\"word-wrap:break-word;\"for=\"${id}_approve\"><font size= \"2\"> ${_uiStringTable.ApproveRequest} </font></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t        \t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li style=\"clear: both;\">\n\t\t\t\t\t\t\t<label><font size=\"2\">${_uiStringTable.ApproveDetails}</font></label>\n\t\t\t\t\t\t\t<input id=\"${id}_detail\" name=\"detail\" dojoType=\"ibm.tivoli.tip.dijit.TextInputBox\"\n\t\t\t\t\t\t\t\t   style=\"width:90%\" constraints=\"{maxlen: 50}\" size=\"25\">\n\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" region=\"bottom\" class=\"footer\"\n\t\t\t\tstyle=\"background: #B2B2B2 url(../webclient/javascript/simplesrm/srm/dijit/images/ge64_toolbar_top.png) repeat-x scroll left top;margin:0;border-width:2px 0 0 0;border-color:#B0B5B8;\">\n\t\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"_closeBtn\"\n\t\t\t\t\t \ttype=\"submit\">\n\t\t\t \t\t${_uiStringTable.Close}\n\t\t\t \t</button>\n\t\t\t \t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"_apprOKBtn\"\n\t\t\t \t\t    dojoAttachEvent=\"onClick:_onOKClick\" >\n\t\t\t \t\t${_uiStringTable.OK}\n\t\t\t \t</button>\n\t\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"_apprCancelBtn\"\n\t\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\t${_uiStringTable.Cancel}\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t</div>\n</div>\n",
	parseOnLoad: true,
	hasApproval: false, /* Tell whether the panel should have a approval subpanel */
	ALN: "ALN",
	NUMERIC: "NUMERIC",
	TABLE: "TABLE",
	
	_approvalDisplay: "none",
	_Width: "630px",
	
	_data: null,
	cshKey: "PMRDP_View_DetailsSubmittedRequests.htm",
	_processErrorMessage: "CTJZH2331E",
	
	constructor: function(params) {
		console.log("RequestDetails.constructor()", params);
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
		if (params.approval && params.approval === true) {
			this.hasApproval = true;
			/* Also modify the help key */
			this.cshKey = "PMRDP_View_ApprovalDetails.htm";
		}
		console.log("RequestDetails.constructor()", this.hasApproval);
	},
	
	buildRendering: function() {
		console.log("RequestDetails.buildRendering()");
		try {
			this._approvalDisplay = this.hasApproval ? "" : "none";
			this._width = this.hasApproval ? "880px" : "630px";
			this.inherited(arguments);
			console.log(this._dialog, this);
			
			dojo.connect(this._tabC, "selectChild", dojo.hitch(this, this.tabSel));
			this._comml_table.setOwner(this);
			this.addHelp();
		}
		catch(ex) {
			console.group("Failed generating input form from template");
			console.error(ex);
			console.groupEnd();
			throw new ibm.tivoli.simplesrm.srm.dojo.SimpleSRMError(ex);
		}
	},
	
	postCreate: function() {
		console.log("RequestDetails.postCreate()", this.hasApproval);
		if (this.hasApproval === false) {
			/* Hide the approval subpanel in this case, as well as the OK &
			 * Cancel buttons */
			console.log("Approval set as disabled. Path working.", this._apprOKBtn);
			this._viewSrGenBannerText.innerHTML = this._uiStringTable.ViewSRGenBannerNoApproval;
			dojo.style(this._apprOKBtn.domNode, "display", "none");
			dojo.style(this._apprCancelBtn.domNode, "display", "none");
		} else {
			console.log("Approval set as enabled.", this._closeBtn);
			dojo.style(this._closeBtn.domNode, "display", "none");
		}
		
		var datatypeMap = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable('DATATYPE');
		this.ALN = datatypeMap.valueByMaxvalue("ALN");
		this.NUMERIC = datatypeMap.valueByMaxvalue("NUMERIC");
		this.TABLE = datatypeMap.valueByMaxvalue("MAXTABLE");
		
		this.inherited(arguments);
	},
	
	tabSel: function(child) {
		this._comml_table._grid.update();
	},
	
	_onKey: function(event){		
		//changes original method to support multiple modal dialogs
		if (!this.preOnKeyTest(event)) {
			return; // it's not your event
		}				
		this._dialog._onKey(event);			
	},
	
	show: function() {
		this.patchCode();
		this._dialog.supportsMultipleModal=true; //hack to support multiple modal panels
		this._dialog.show();
		this._dialog.domNode.style.zIndex = dijit._underlay.getDialogZIndex();
	},
	
	setData: function(data)
	{
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
		
		if (product!=null && product.indexOf("srm")>=0)  //fpb
		{
			this._data = data.QuerySRM_SRDETResponse.SRM_SRDETSet.SR[0];
		} else
		{
			this._data = data.QueryMXSRDETResponse.MXSRDETSet.SR[0];
		}

		//console.log("--VENKY ** RequestDetails.setData()-- true/false = ", data.QueryMXSRResponse.MXSRSet.SR);
		/* Case with no SR */
		//if (!data.QueryMXSRResponse.MXSRSet.SR) {
		//if (!data.QuerySRM_SRDETResponse.SRM_SRDETSet.SR) {
		  if (!this._data) { 
			console.log("Empty data for this request");
			(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog(
											{messageId: "CTJZH2321I", type: "info"})).show();
			return; 
		}
		//this._data = data.QuerySRM_SRDETResponse.SRM_SRDETSet.SR[0];
		//this._data = data.QueryMXSRDETResponse.MXSRDETSet.SR[0];

		this._fillGeneral(this._data); 
				
		this._fillAttrTable(this._data);
		
		/* gv : Don't need this tab for SRM

		//gv if (!this._data.PMZHBSLOG) {
		if (!this._data.WORKLOG) {
			console.log("Trying to hide worklog");
			this._workl_banner.innerHTML =
				"<b>" + this._uiStringTable.ViewSRNoWorkl + "</b>";
			dojo.style(this._workl_banner, "padding", "20px 0 0 50px");
		} else {
			console.log("Detected worklog");
			this._buildWorkLog(this._data);
		}*/



		if (!this._data.COMMLOG) {
			console.log("Trying to hide commlog", this._comml_banner);
			this._comml_banner.innerHTML =
				"<b>" + this._uiStringTable.ViewSRNoComml + "</b>";
			dojo.style(this._comml_banner, "padding", "20px 0 0 50px");
			dojo.style(this._comml_table.domNode, "display", "none");
		} else {
			console.log("Detected commlog");
			console.log("this._comml_table", this._comml_table);
			 this._comml_table.refreshData(this._data.TICKETUID); 
		}

        //gv : Make call to display data for SR-Solution 
		if (!this._data.LONGDESCRIPTION) {
			console.log("Trying to hide SR Solution");
			this._workl_banner.innerHTML =
				"<b>" + this._uiStringTable.ViewSRNoSol + "</b>";
			dojo.style(this._workl_banner, "padding", "20px 0 0 50px");
		} else {
			console.log("Detected SR Solution");
			this._buildSolutionForSR(this._data);
		}

		//gv : Make call to display data for Related Record-Solution 
		if (!this._data.RELATEDRECORD) {
			console.log("Trying to hide RR Solution");
			this._workl_banner.innerHTML =
				"<b>" + this._uiStringTable.ViewSRNoSol + "</b>";
			dojo.style(this._workl_banner, "padding", "20px 0 0 50px");
		} else {
			console.log("Detected RR Solution");
			this._buildSolutionForRR(this._data);
		}



		this.show();

	},
	/**
	 * Set the HTML content for the PMZBHSLOG section.
	 */
	_buildPmzLog: function(data) {
		console.log("RequestDetails._buildPmzLog()", data);
		var wlog = data.PMZHBSLOG;
		var newContent = "<table class=\"infotable\"><thead><tr><td class=\"title\">" +
						 this._uiStringTable.Date +
						 "</td><td class=\"title\">" +
						 this._uiStringTable.Summary +
						 "</td></tr></thead><tbody>";
		for (i = 0; i < wlog.length; i++) {
			newContent += "<tr class=\"stroke\"><td>";
			newContent += wlog[i].TIME.formatISODateString();
			newContent += "</td><td>";
			newContent += wlog[i].FULL_MSG_TEXT ? wlog[i].FULL_MSG_TEXT.htmlencode() : "";
			newContent += "</td><td>";
		}
		newContent += "</tbody></table>";
		console.log("Setting work log content", newContent);
		this._workl_table.innerHTML = newContent;
	},
	 /**
	 * Set the HTML content for the WORKLOG section.
	 * Venkyg : 3/11/10
	 */
	_buildWorkLog: function(data) {
		console.log("RequestDetails._buildWorkLog()", data);
		var wlog = data.WORKLOG;
		var newContent = "<table class=\"infotable\"><thead><tr><td class=\"title\">" +
						 this._uiStringTable.Date +
						 "</td><td class=\"title\">" +
						 this._uiStringTable.Summary +
						 "</td></tr></thead><tbody>";
		for (i = 0; i < wlog.length; i++) {
			newContent += "<tr class=\"stroke\"><td>";
			newContent += wlog[i].CREATEDATE.formatISODateString();
			newContent += "</td><td>";
			newContent += wlog[i].DESCRIPTION ? wlog[i].DESCRIPTION.htmlencode() : "";
			newContent += "</td><td>";
		}
		newContent += "</tbody></table>";
		console.log("Setting work log content", newContent);
		this._workl_table.innerHTML = newContent;
		console.log("--Venky---RequestDetails._buildWorkLog()--end of method- newContent = ", newContent);
	},
	 /**
	 * Set the HTML content for the Solutions for SRs
	 * Venkyg : 3/11/10
	 */
	_buildSolutionForSR: function(data) {
		console.log("RequestDetails._buildSolutionForSR()", data);
		var solu = data.LONGDESCRIPTION;
		 
		var problem = "";
		var resolution = ""; 
		var cause = "";
		for (i = 0; i < solu.length; i++) {
			var colName = solu[i].LDOWNERCOL;
			if(colName == 'PROBLEMCODE')
				problem = solu[i].LDTEXT
			else
			if(colName == 'FR2CODE')
				resolution = solu[i].LDTEXT
			else
			if(colName == 'FR1CODE')
				cause = solu[i].LDTEXT
		}

		console.log("RequestDetails._buildSolutionForSR()-- problem", problem,resolution,cause);

        var newContent = "<table class=\"infotable\"><thead><tr><td nowrap class=\"title\">" +
			 this._uiStringTable.ViewSRSolDetails +
			"</td><td class=\"status\" " +
			"</td></tr></thead><tbody>";

		if (problem) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.Symptom + "</td><td>" +
						 problem.htmlencode() + "</td></tr>";
		}
		
		if (cause) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.Cause + "</td><td>" +
						 cause.htmlencode() + "</td></tr>";
		}

		if (resolution) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.Resolution + "</td><td>" +
						 resolution.htmlencode() + "</td></tr>";
		}
		newContent += "</tbody></table>";
		console.log("--Venky---RequestDetails._buildSolutionForSR()--end of method- newContent = ", newContent);
		this._workl_table.innerHTML = newContent;

	},

	 /**
	 * Set the HTML content for the Solutions for RRs
	 * Venkyg : 3/11/10
	 */
  _buildSolutionForRR: function(data) { 
		console.log("RequestDetails._buildSolutionForRR()", data);

		var newContent = "<table class=\"infotable\"><thead><tr><td nowrap class=\"title\">" +
			 this._uiStringTable.ViewRRSolDetails +
			"</td> </tr></thead><tbody>";
		var rRecord = data.RELATEDRECORD;
		for (j = 0; j < rRecord.length; j++) 
		{
			var solu = rRecord[j].LONGDESCRIPTION;

			var problem = "";
			var resolution = ""; 
			var cause = "";
			for (i = 0; i < solu.length; i++) {
				var colName = solu[i].LDOWNERCOL;
				if(colName == 'PROBLEMCODE')
					problem = solu[i].LDTEXT
				else
				if(colName == 'FR2CODE')
					resolution = solu[i].LDTEXT
				else
				if(colName == 'FR1CODE')
					cause = solu[i].LDTEXT
			}

			console.log("RequestDetails._buildSolutionForRR()-- problem", problem,resolution,cause);

			if (problem) {
				newContent += "<tr class=\"stroke\"><td>" +
							 this._uiStringTable.Symptom + "</td><td>" +
							 problem + "</td></tr>";
			}
			
			if (cause) {
				newContent += "<tr class=\"stroke\"><td>" +
							 this._uiStringTable.Cause + "</td><td>" +
							 cause + "</td></tr>";
			}

			if (resolution) {
				newContent += "<tr class=\"stroke\"><td>" +
							 this._uiStringTable.Resolution + "</td><td>" +
							 resolution + "</td></tr>";
			}

			if(j < rRecord.length-1)
				newContent += "<tr class=\"stroke\"><td></td><td> </td></tr>";

		}
		 
		
		newContent += "</tbody></table>";
		console.log("--Venky---RequestDetails._buildSolutionForRR()--end of method- newContent = ", newContent);
		this._solRR_table.innerHTML = newContent;
	},

	/**
	 * Set the HTML content for the general section.
	 */	
	_fillGeneral: function(data) {
		console.log("RequestDetails._fillGeneral()", data);
		var newContent = "<table class=\"infotable\"><thead><tr><td class=\"title\">" +
			 this._uiStringTable.ViewSRDetails +
			"</td><td class=\"status\" dojoAttachPoint=" + data.STATUS +
			"</td></tr></thead><tbody>";
		var genDesc = data.DESCRIPTION;
		if (genDesc) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.Description + "</td><td>" +
						 genDesc.htmlencode() + "</td></tr>";
		}
		var genReq = data.CREATEDBY;
		if (genReq) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.RequestedBy + "</td><td>" +
						 genReq.htmlencode() + "</td></tr>";
		}
		var genCreated = data.CREATIONDATE;
		if (genCreated) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.CreatedOn + "</td><td>" +
						 genCreated.formatISODateString({sel: "datetime"}) + "</td></tr>";
		}
		var genStart = data.TARGETSTART;
		if (genStart) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.StartDateLabel + "</td><td>"+
						 genStart.formatISODateString() + "</td></tr>";
		}
		var genEnd = data.TARGETFINISH;
		if (!genEnd) {
			// forever/indefinite == undefined TARGETFINISH(not present in response)
			genEnd = this._uiStringTable.ForeverLabel;
		}
		else {
			genEnd = genEnd.formatISODateString();			
		}
		
		newContent += "<tr class=\"stroke\"><td>" +
			 this._uiStringTable.EndDateLabel + "</td><td>" +
			 genEnd + "</td></tr>";
		
		var genLastUpdate = data.CHANGEDATE;
		if (genLastUpdate) {
			newContent += "<tr class=\"stroke\"><td>" +
						 this._uiStringTable.ViewSRLastUpdate + "</td><td>" +
						 genLastUpdate.formatISODateString({sel: "datetime"}) + "</td></tr>";
		}
		var genUpdatedBy = data.CHANGEBY;
		if (genUpdatedBy) {
			newContent += "<tr class=\"stroke\"><td> " +
						 this._uiStringTable.ViewSRUpdatedBy + "</td><td>" +
						 genUpdatedBy + "</td></tr>";
		}
		newContent += "</tbody></table>";
		this._gen_table.innerHTML = newContent;
	},
	
	_fillAttrTable: function(data) {
		console.log("RequestDetails._fillAttrTable()", data);
		var newContent = "<table class=\"infotable\"><thead><tr><td class=\"title\" colspan=2>" +
			 data.DESCRIPTION +"</td></tr></thead><tbody>";
		var attrs = data.TICKETSPEC;
		/* Exit in case of empty data */
		if (!attrs) {
			console.log("RequestDetails._fillAttrTable(): no ticket spec found");
			return;
		}
		for (i = 0; i < attrs.length; i++) {
			/* check what type of value this is */
			var attrType = attrs[i].ASSETATTRIBUTE[0].DATATYPE;
			var val = "";
			if (attrType == "NUMERIC") {
				val = attrs[i].NUMVALUE;
			} else if (attrType == "ALN") {
				val = attrs[i].ALNVALUE;
			} else if (attrType == "TABLE") {
				if (attrs[i].ALNVALUE){
					val = attrs[i].ALNVALUE;
				}
			} else {
				console.log("NEW TYPE", i, attrType);
				//debugger; /* STOP! */
			}
			if ((val != undefined) && (val != "")) {
				newContent += "<tr class=\"stroke\"><td>";
				newContent += attrs[i].ASSETATTRIBUTE[0].DESCRIPTION;
				newContent += "</td><td>";
				newContent += val.toString().htmlencode();
				newContent += "</td></tr>";
			}
		}		
		newContent += "</tbody></table>";
		this._attr_table.innerHTML = newContent;
	},
	
	_fillCommLogDetails: function(index) {
		console.log("RequestDetails._fillCommLogDetails()", index);
		
		var item = this._data.COMMLOG[index];
		var newContent2 = "<table class=\"infotable\"><thead><tr><td class=\"title\">"+
			 this._uiStringTable.Details + "</td></tr></thead><tbody>";
		newContent2 += "<tr><td>" + (item.MESSAGE ? item.MESSAGE.htmlencode() : "") + "</td></tr>";
		newContent2 += "</tbody></table>";
		this._comml_details_det.innerHTML = newContent2;
	},
	
	_onOKClick: function(evt) 
	{
		
		var tid = this._data.TICKETID;
		var approveCheck = dijit.byId(this.id + "_approve").checked	;	
		//var summaryInfo = dijit.byId(this.id + "_summary").value;	

		//var detailInfo = dijit.byId(this.id + "_detail").getValue();
		var detailInfoWidget = dijit.byId(this.id + "_detail");		
		var detailInfo = detailInfoWidget.getValue();
		
		//var detailInfo = dijit.byId(this.id + "_detail").value;

		//console.log("_onOKClick: tid is : " + tid + " ,approveCheck is : " + approveCheck + " ,detailInfo is : " + detailInfo);
		
		detailInfoWidget.validate();
		
		var hasError = detailInfoWidget._isInError;

		if (hasError){
			ibm.tivoli.logger.error("Invalid Detail Input Value!");
			(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({messageId: "CTJZH2336E"})).show();
			dojo.stopEvent(evt);			
		}else {
			var bSuccess = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().approveRequest(tid, detailInfo, approveCheck);

			if(!bSuccess) {
				ibm.tivoli.logger.error("Failure approving/rejecting a request");
				(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({messageId: "CTJZH2331E"})).show();
				dojo.stopEvent(evt);
			}
			else {
				this.hide();
			}
			return bSuccess;			
		}
	},
	
	hide: function()
	{
		this._dialog.hide();
	},
	
	/* Help stuff */

	//handler:used when user clicks '?'
	openHelp: function(event){
		this.openHelpWindow(this.cshKey);
	},

	//error handler: used when help url can't be retrieved from server
	_errorRetrievingUrl:function() {
		(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({messageId: "CTJZH2302E"})).show();
	},

	//sets cshKey, adds '?' to title bar, connects help events 
	addHelp: function() {
		var helpNode = document.createElement("span");
		
		dojo.addClass(helpNode , "dijitDialogHelpIcon");			
		dojo.attr(helpNode , "id" , this.id + "_visual_" + this.cshKey);
		dojo.attr(helpNode , "title" , this._uiStringTable["Help"]);
		dojo.attr(helpNode , "tabindex" , 0);
		
		var res = dojo.place(helpNode, this._dialog.closeButtonNode ,"before");
		this.connect(helpNode , "onclick" , "openHelp");
		this.connect(helpNode , "onmouseenter","_onHelpEnter");		
		this.connect(helpNode , "onmouseleave","_onHelpLeave");
		this.connect(helpNode , "onkeypress" , "_onEnterPressed");
		
		var textHelpNode = document.createElement("span");
					
		dojo.addClass(textHelpNode , "closeText");
		dojo.attr(textHelpNode , "id" , this.id + "_text_" + this.cshKey);
		dojo.attr(textHelpNode , "title" , this._uiStringTable["Help"]);			
		
		var textNode = document.createTextNode("?");
		dojo.place(textNode , textHelpNode );
		
		dojo.place(textHelpNode, helpNode);
		
		this.connect(this.domNode,"keypress","_onHelpKey");
	},

	_onHelpEnter: function() {
		var helpNode = dojo.query(".dijitDialogHelpIcon",this.titleBar);
		dojo.addClass(helpNode[0], "dijitDialogHelpIcon-hover");
	},

	_onHelpLeave: function(){
		var helpNode = dojo.query(".dijitDialogHelpIcon-hover",this.titleBar);
		dojo.removeClass(helpNode[0] , "dijitDialogHelpIcon-hover");
	},

	_onHelpKey: function(event) {
		//console.log("current: " + event.keyCode + " / " + event.charOrCode + " target: " + dojo.keys.HELP); 
		
		// help key accessible from whole panel
		if(event.keyCode == dojo.keys.F1){
			
			// on IE dojo.stopEvent() is not enough to cancel this event
			// "onhelp" attribute is valid for IE only
			if (dojo.isIE){ 
				document.onhelp = function(){return false;};
				window.onhelp = function(){return false;};
			}
			
			if(this.cshKey && this.openHelp){				
				dojo.stopEvent(event);			
				this.openHelp(event);
				return false;
			}
		}
		return true;
	},
	
	_onEnterPressed: function(event) {
		//open only if Enter was pressed on help icon
		if ((event.keyCode == dojo.keys.ENTER) && 
			(dojo.hasClass(event.target ,"dijitDialogHelpIcon"))){
			dojo.stopEvent(event);
			this.openHelp(event);
			return false;
		}
		return true;
	}

});

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.CommLogGrid",
			 [ibm.tivoli.simplesrm.srm.dijit.ItemChooserGrid,
			  ibm.tivoli.simplesrm.srm.dojo.Formatter], {
	_uiStringTable: null,
	autoQuery: false,

	constructor: function() {
		this._uiStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiStringTable");
		this.gridLayout = [
	      	{
	      	 name: this._uiStringTable.Application,
	      	 field: 'app',
	      	 width: '15%',
	      	 compare: ibm.tivoli.simplesrm.srm.dojo.data.Comparator.stringCompare
	      	},
	     	{
	      	 name: this._uiStringTable.To,
	      	 field: 'sendto',
	      	 width: '20%',
	      	 compare: ibm.tivoli.simplesrm.srm.dojo.data.Comparator.stringCompare
	      	},
	      	{
	      	 name: this._uiStringTable.From,
	      	 field: 'sendfrom',
	      	 width: '20%',
	      	 compare: ibm.tivoli.simplesrm.srm.dojo.data.Comparator.stringCompare
	      	},
	      	{
	      	 name: this._uiStringTable.Date,
	      	 field: 'date',
	      	 width: '15%',
	      	 compare: ibm.tivoli.simplesrm.srm.dojo.data.Comparator.stringCompare,
	      	 formatter: dojo.hitch(this, "_formatDatetime")
	      	},
	      	{
			 name: this._uiStringTable.Subject,
			 field: 'subject',
			 width: '30%',
			 compare: ibm.tivoli.simplesrm.srm.dojo.data.Comparator.stringCompare,
			 formatter: dojo.hitch(this, this._noWrap)
			}
	      	
   		];
   		
   		this.keyField = "msgid";
	},

	queryData: function() {
		console.log("CommLogGrid.queryData(): ", this._ticketUid);
		var d = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestDetails(
														{id : this._ticketUid});
		var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product"); 
		d.addCallback(function(response) {
			//gv var logItems = response.QueryPMZHBR1_SRDETResponse.PMZHBR1_SRDETSet.SR[0].COMMLOG;
			//var logItems = response.QuerySRM_SRDETResponse.SRM_SRDETSet.SR[0].COMMLOG;  
			var logItems = "";
			if (product!=null && product.indexOf("srm")>=0)  //fpb
			{
				logItems = response.QuerySRM_SRDETResponse.SRM_SRDETSet.SR[0].COMMLOG;  
			} else
			{
				logItems = response.QueryPMZHBR1_SRDETResponse.PMZHBR1_SRDETSet.SR[0].COMMLOG;
			}
			response.data = [];
			for(var i in logItems) {
				var item = logItems[i]; 
				response.data.push({app: item.CREATEBY,
									date: item.CREATEDATE,
									subject: item.SUBJECT,
									sendto: item.SENDTO,
									sendfrom: item.SENDFROM,
									msgid: i});
			}
		});
		return d;
	},
	
	refreshData: function(ticketUid) {
		this._ticketUid = ticketUid;
		this.refresh();
		this._grid.update();
	},
	
	setOwner: function(owner) {
		this._owner = owner;
	},
	
	onChange: function(item) {
		console.log("On Change CALLED", item, this._owner, this._grid.selection.selectedIndex);
		this._owner._fillCommLogDetails(this._grid.selection.selectedIndex);
	}

});
});

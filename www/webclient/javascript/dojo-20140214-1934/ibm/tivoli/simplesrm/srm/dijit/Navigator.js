//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/Navigator", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/simplesrm/srm/dijit/nls/uiNavigatorStringTable","dojo/require!dijit/_Widget,dijit/registry,dijit/WidgetSet,dijit/_Templated,dojo/fx,dojo/parser,dojo/cookie,dojo/DeferredList,dijit/ProgressBar,ibm/tivoli/simplesrm/srm/dijit/WidgetBase,ibm/tivoli/simplesrm/srm/dijit/ListTree,ibm/tivoli/simplesrm/srm/dijit/Breadcrumb,ibm/tivoli/simplesrm/srm/dijit/CreateCatalogRequest,ibm/tivoli/tip/dijit/TIPButton,ibm/tivoli/tip/dijit/TextInputBox,ibm/tivoli/simplesrm/srm/dijit/ToolbarButton,ibm/tivoli/simplesrm/srm/dojo/data/srmQuery,ibm/tivoli/simplesrm/srm/dojo/Logger,dijit/Tree,dojo/data/ItemFileReadStore,dijit/tree/ForestStoreModel,dijit/layout/BorderContainer,dijit/layout/ContentPane"], function(dijit,dojo,dojox){
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

// TODO:
// 	 - do I need to expose list pushing and popping events to the outside?

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Navigator");

dojo.require("dijit._Widget");
dojo.require("dijit.registry");  
dojo.require("dijit.WidgetSet");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.require("dojo.parser");
dojo.require("dojo.cookie");
dojo.require("dojo.DeferredList");
dojo.require("dijit.ProgressBar");

//dojo.require("dojox.widget.Standby");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.WidgetBase");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.ListTree");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.Breadcrumb");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.CreateCatalogRequest");
dojo.require("ibm.tivoli.tip.dijit.TIPButton");
dojo.require("ibm.tivoli.tip.dijit.TextInputBox");
dojo.require("ibm.tivoli.simplesrm.srm.dijit.ToolbarButton");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.Logger");
dojo.require("dijit.Tree"); 

dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.tree.ForestStoreModel");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");


dojo.requireLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiNavigatorStringTable");

/*
 * Navigator
 * Loads data representing the taxonomy of Service Request and Incident categories
 * Events:
 * 	onSrmNavigatorClick(item_label): fired when user clicks on a leaf node of the tree
*/
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Navigator", 
	[dijit._Widget, dijit._Templated, ibm.tivoli.simplesrm.srm.dijit.WidgetBase, ibm.tivoli.simplesrm.srm.dijit.CreatorFactory], 
	{	
		widgetsInTemplate: true,
		templateString:"<div class='srmnavigator'>\n<!--\n @HTML_LONG_COPYRIGHT_BEGIN@\n @HTML_LONG_COPYRIGHT_END@\n-->\n\t<div class=\"navigator_head\" style=\"position:relative; padding: .625em;\">\n\t\t<table STYLE='width:100%'>\t   \n\t\t  \t\t   \t\t   \n\t\t   <tr>\n\t\t\t<td>\n\t  \t       <button dojoattachpoint=\"home_btn\" dojotype=\"dijit.form.Button\" baseClass=\"srm_button\" showLabel=\"false\" label=\"${_uiStringTable.Home}\" iconClass=\"navigator_home\" title=\"${_uiStringTable.Home}\"> </button>\t\t\t \n\t\t\t</td>\n\t\t\t\n\t\t\t<td>\n\t\t\t   <img src=\"../webclient/images/img_divider_tablebtns.gif\" alt=\"|\" />\n\t\t\t</td>\t\n\t\t\t\n\t\t\t<td>\n               <DIV>\n\t\t\t      <div>\n\t\t\t\t    <button id=\"${id}_createSR_btn\" dojoattachpoint=\"createSR_btn\" dojotype=\"dijit.form.Button\" baseClass=\"srm_button\" showLabel=\"false\" label=\"Create Request\" baseClass=\"srm_button\" iconClass=\"createSR_btn\" ></button>                        \n\t\t\t\t<!--    <span id=\"${id}_createSR_label\" style='margin-left:-0px;'  dojoattachpoint=\"createSR_text_btn\" dojoAttachEvent=\"onclick:_createSR,onmouseover:_createSROnRollover,onmouseout:_createSROnRollout\"  class=\"srm_cart\" >${_uiStringTable.CreateSR}  </span> -->\t\t\t\t    \n\t\t\t     </div>\n               </DIV>\n\t\t\t</td>\n\t\t\t\n\t\t\t<td>\t\t\t   \t\t\t\n   \t\t\t   <img src=\"../webclient/images/img_divider_tablebtns.gif\" alt=\"|\" />\n\t\t\t</td>\t\n\t\t\t\n\t\t\t<td >\n\t\t\t   <button id=\"${id}_shoppingCart_btn\" dojoattachpoint=\"shoppingCart_btn\" dojotype=\"dijit.form.Button\" baseClass=\"srm_button\" showLabel=\"false\" label=\"Shopping Cart\" baseClass=\"srm_button\" iconClass=\"shoppingCart_btn\"></button>\n\t\t\t   <sup id=\"${id}_cart_amount\"  class=\"srm_cart_amount\"  > </sup>\t\t\t\n\t\t\t   \t\t\t   \n\t\t\t</td>\n\n\t\t\t<td>\t\t\t    \n\t\t\t    <button id=\"${id}_template_btn\" dojoattachpoint=\"template_btn\" dojotype=\"dijit.form.Button\" baseClass=\"srm_button\" showLabel=\"false\" label=\"Cart Templates\" baseClass=\"srm_button\" iconClass=\"template_btn\" ></button>\t\t\t\t\n\t\t\t</td>\t\t\t\n\t\t\t\t\t\t\n\t\t\t<td>\t\t\t     \t\n   \t\t\t    <img src=\"../webclient/images/img_divider_tablebtns.gif\" alt=\"|\" />\n\t\t\t</td>\t\n\t\t\t\t\t\t\t\n\t\t\t \n\t\t\t<td>\n\t\t\t    <div style=\"display:none;\"> <label id=\"${id}_search_label\" for=\"${id}_list_search_term\">${_uiStringTable.Search}</label></div>\n\t\t\t    <input id='${id}_list_search_term' dojoattachpoint=\"list_search_term\" type='text' name='ticket_search' style='width: 350px;' class=\"vm placeholder\" value=\"${_uiStringTable.SearchFieldText}\"   dojoAttachEvent=\"onblur:_placeholder, onfocus:_placeholder\" >\t\t        \t\t\t      \n\t\t\t    <button      id=\"${id}_list_search_btn\"  dojoattachpoint=\"list_search_btn\" dojotype=\"dijit.form.Button\" showLabel=\"false\" label=\"Search\" baseClass=\"srm_button\" iconClass=\"header_search_btn\" ></button>                        \n\t\t\t</td>\n\n\t\t\t<td>\t\t\t    \t\t\n   \t\t\t   <img src=\"../webclient/images/img_divider_tablebtns.gif\" alt=\"|\" />\n\t\t\t</td>           \n\t\t\t \n\t\t\t \n\t\t\t<td  class=\"maximize_nav_td\">\n\t\t        <img id = \"${id}_maximize_nav\" src=\"../webclient/javascript/simplesrm/srm/dijit/images/nav_icon_fullScreen.png\" alt=\"m\" class=\"maximize_nav\"   title=\"${_uiStringTable.Maximize}\"/>\t\t        \n\t\t    </td>\n\n\t\t   </tr>\n\t\t</table>\t\n\t</div>\n\t\n\t<!-- <div class=\"navigator_srmhead\" style=\"position:relative; padding: .225em;\">\n\t\t<div style=\"position:absolute; left:.625em; top: 50%; height: 34px; width: 120px; margin-top: -17px;\">\n\t\t <input id='${id}_list_createSR_btn'  dojoattachpoint=\"createSR_btn\" type=\"Button\" dojoType=\"ibm.tivoli.tip.dijit.TIPButton\" label=\"${_uiStringTable.CreateSR}\" title=\"${_uiStringTable.CreateSR}\" value=\"${_uiStringTable.CreateSR}\" > \n\t\t</div>\n\t</div>\n\t-->\n\t\n\n\t<div id='${id}_box' class='navigator_body' >\n\t\t<div dojoAttachPoint=\"breadcrumbContainer\">\n\t\t\t\t<div id='${id}_crumbs' dojoType='ibm.tivoli.simplesrm.srm.dijit.Breadcrumb' ></div>\n\t\t</div>\n\t\t\n\t\t<div class='tree_box' id='${id}_tree_box' style=\"height:100%;\">\n\t\t\n\t\t <div dojoType=\"dijit.layout.BorderContainer\" class='borderContainer' design='sidebar' gutters='true' liveSplitters='true' id=\"${id}_borderContainer\">\n\n               <div dojoType=\"dijit.layout.ContentPane\" splitter='true' region='leading' class='borderContainerLeft' id='${id}_borderContainerLeft' style=\"padding: 0px;background-color: #FAFAFA\">           \n                   \n               </div>\n                \n              <div dojoType=\"dijit.layout.ContentPane\" splitter='true' region='center' id=\"${id}_borderContainerCenter\" class='borderContainerCenter' style=\"background-color: #FAFAFA\">\n            \n                 <div dojoAttachPoint=\"treeContainer\">\n\t\t\t\t    <div id=\"${id}_list\" dojoType=\"ibm.tivoli.simplesrm.srm.dijit.ListTree\" dojoAttachPoint=\"rootListNode\" \n\t\t\t\t\t   fillOrder=\"${fillOrder}\" label=\"${_uiStringTable.HomeBreadcrumb}\" \n\t\t\t\t\t   keyField=\"${keyField}\" labelField=\"${labelField}\" descField=\"${descField}\" iconField=\"${iconField}\" iconSizeField=\"${iconSizeField}\" iconClassField=\"${iconClassField}\" \n\t\t\t\t\t   childField=\"${childField}\" leafField=\"${leafField}\" toolTip=\"${toolTip}\" colCount=\"1\">\n\t\t\t\t   </div>\n\t\t\t     </div>\n            \n              </div>\n\t\t\t\t \n\t    </div>\n\t\t\n\t\t<div class='clear'></div>\n\t</div>\n\t<div class='clear'></div>\n\t<div dojoType=\"dijit.DialogUnderlay\" id=\"loading-dialog\" bgColor=\"gray\" bgOpacity=\"0.5\" toggle=\"fade\" toggleDuration=\"250\" >\n\t</div>\n\t\n\t<div dojoType=\"ibm.tivoli.simplesrm.srm.dijit.PopupDialog\" id=\"search-dialog\"  title=\"${_uiStringTable.HelpFixLabel}\" >\n\t\t<br>\t\n\t \t<table>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t&nbsp;&nbsp;&nbsp;&nbsp;<font size=\"3\"><b>${_uiStringTable.SearchTextLabel}</b>\n\t\t\t\t</td>\n\t\t\t\t<td>\t\n\t\t\t\t\t&nbsp;&nbsp;<input id='${id}_dialog_search_term' dojoattachpoint=\"dialog_search_term\" type='text' name='ticket_search' style='width: 400px;' placeholder='type your search terms...' title=\"Search\" class=\"vmSearchDialog\">&nbsp;&nbsp;&nbsp;&nbsp;\n\t\t\t\t</td>\n\t\t\t\t<td>\t\n\t\t\t\t\t<button  id=\"${id}_dialog_search_btn\"  dojoattachpoint=\"dialog_search_btn\" dojotype=\"dijit.form.Button\" showLabel=\"false\" label=\"Search\" baseClass=\"dialog_srm_button\" iconClass=\"dialog_search_btn\" ></button>  \n\t\t\t\t</td>\t\t\t\t\n\t\t\t\t \t\t\t\t\t\n\t\t\t</tr>\n\t\t\t\n\t\t\t<tr><td colspan=\"2\">&nbsp</td></tr>\t\t\t\t\n\t\t\t \n\t\t</table>\t\t\n\t\t<br>\n\t\t<div id='${id}_dialog_search_holder'></div>\t\n\t\t\t\n\t</div>\n</div>\n\n</div>",

		listLabel: '',
		imagesPath: '',
		requestsOP: '$_unset_$',
		//incidentsOP: '$_unset_$',
		frequentRequestsOP: '$_unset_$',
		rootList: null,
		_UIComplete: false,
		fillOrder: "NavFrontPage",
		keyField: "ItemNum", 
		labelField: "Description",
		descField: "LongDescription",
		iconField: "ImagePath",
		iconSizeField: "iconSize",
		iconClassField: "iconClass",
		childField: "Category",
		leafField: "Offering",
		toolTip: true,
		hidecarticon: false,
		hidecreatesricon: false,
        hidetemplateicon: false,
		offering_fd: '',
		nav_node: '',
         _subscriptionHandle: null,
        config75: false,   //new 7.5 config?
        catalog_link_index: 0,   //default Navigator link elements
        solution_link_index: 1,
        favorites_link_index: 2,
        search_link_index: 3,
        issues_link_index: 4,
        solution_browse_link_index: 5, 
        _maxRestItems: 500, //max number of records to get at one time        
        _SCOfferingsStartIndex: 0,   //rest api index for SC Offering query
        _SDOfferingsStartIndex: 0, // rest api index for SD Offering query

        _uiNavigatorStringTable: null,  //Globalized strings for Navigator links
        //_sigoptions: null,  //app sigoptions for user
        _maximized: false,   //Navigator maximized?  
        _cat_treeview: false,    //catalog tree or folder view? 
        _treeContentPane: null,   //contentPane  for tree view
        //_standby: null,
				
		// ******** lifecycle methods ********
		constructor: function(/*object*/params, /*domNode*/domNode) 
		{
			console.log("Navigator.ctor()");			 
			this.hidecarticon = (this.hidecarticon=='true');
			this.hidecreatesricon = (this.hidecreatesricon=='true');
			this.hidetemplateicon = (this.hidetemplateicon=='true');
			
			//Globalized strings for Navigator links
			try {
				this._uiNavigatorStringTable = dojo.i18n.getLocalization("ibm.tivoli.simplesrm.srm.dijit", "uiNavigatorStringTable");				 
			} catch(ex) {							
				console.log("Navigator.constructor(), uiNavigatorStringTable not loaded - " + ex);
			}			
						
			this.rootList = null;
			if(!this.imagesPath){
				this.imagesPath = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit", "images");
			}

         console.log("Navigator - subscribing to command: /srmssctr/cmd/createoffering");
  		   this._subscriptionHandle = dojo.subscribe("/srmssctr/cmd/createoffering", this, function(params) {
				if(params.ItemNum && params.ItemSetID) {
					this.createAndShowInputForm(params, false);
				}
			});
  		    
  		   console.log("Navigator - subscribing to command: /srmssctr/cmd/viewsolution");
		   this._subscriptionHandle = dojo.subscribe("/srmssctr/cmd/viewsolution", this, function(params) {
				if(params.ID) {
					this.createAndShowInputForm(params, false);
				}
			});
		    
		   console.log("Navigator - subscribing to command: /srmssctr/cmd/quickinsert");
		   this._subscriptionHandle = dojo.subscribe("/srmssctr/cmd/quickinsert", this, function(params) {
				if(params.ID) {
					this.createAndShowInputForm(params, false);
				}
			});
  		    
  		   console.log("Navigator - subscribing to command: /srmssctr/cmd/createsr");
     		this._subscriptionHandle = dojo.subscribe("/srmssctr/cmd/createsr", this, this._createSR);
     		
     		console.log("Navigator - subscribing to command: /srmssctr/cmd/viewsr");
  		   this._subscriptionHandle = dojo.subscribe("/srmssctr/cmd/viewsr", this, function(params) {
  		    	console.log("Navigator - launch viewsr ticketUID = ",params.ticketuid);
  		    	if(params.ticketuid) {			
		    	   sendEvent("srmssviewsr",  this.nav_node.id,  params.ticketuid);
				}
			});
  					
     		
	   },

      destroy: function()
      {
          dojo.unsubscribe(this._subscriptionHandle);
          this._subscriptionHandle = null;
      },

		buildRendering: function() {
			 
			this.inherited(arguments);
		},
		
		solutionsOP: '$_unset_$',
		
		postCreate: function()
		{
			this.inherited(arguments);
			this.nav_node = dojo.byId(this.id);  //navigator DOM node
			
			//Initialize logger
			ibm.tivoli.logger = new ibm.tivoli.simplesrm.srm.dojo.Logger({id:this.nav_node.id});
			
			//New format?
			if (ibm.tivoli.tpae.dojo.data.getConfigProperty("link0")!=null) {
				this.config75=true;
			}
			
			if(this.config75==false && "$_unset_$" == this.requestsOP){
				this.requestsOP = ibm.tivoli.tpae.dojo.data.getConfigProperty("RequestsCatalog");				 
			}
			 	 
			//FrequentRequests key is not in config.properties by default. So we can't check if it exists or on upgrade
			//it will disappear from Navigator. We need a new key to hide it
			if(this.config75==false && "$_unset_$" == this.frequentRequestsOP){
				var hideFQR =  ibm.tivoli.tpae.dojo.data.getConfigProperty("HideFrequentRequests");
				if(hideFQR!=null && hideFQR.length > 0 && dojo.trim(hideFQR)=='true') {  
					this.frequentRequestsOP=null;								
				} else {
					this.frequentRequestsOP="frequentrequests";		
				}
			}			
			
			if(this.config75 ==false && "$_unset_$" == this.solutionsOP){
				this.solutionsOP = ibm.tivoli.tpae.dojo.data.getConfigProperty("Solution");
			}	
			//title not needed as we use tooltip for help
			var shopping_cart_icon = dojo.byId(this.id + "_shoppingCart_btn");
			if (shopping_cart_icon!=undefined)
			   shopping_cart_icon.title="";
			var createSR_icon = dojo.byId(this.id + "_createSR_btn");
			if (createSR_icon!=undefined)
			   createSR_icon.title=""; 

			var template_icon = dojo.byId(this.id + "_template_btn");
			if (template_icon!=undefined)
			   template_icon.title="";

			var listsearch_icon = dojo.byId(this.id + "_list_search_btn");
			if (listsearch_icon!=undefined)
			   listsearch_icon.title="";
			
			var dialogsearch_icon = dojo.byId(this.id + "_dialog_search_btn");
			if (dialogsearch_icon!=undefined)
			   dialogsearch_icon.title="";

			//set navigator width to 66%. This is a hack because in maximo width on sectioncol doesn't seem to work			
			var sectioncols = dojo.query("td[sc='true']");  //get all td with sc="true"  I think sc stands for sectioncol			
			for (var i=0;i<sectioncols.length; i++) {
		    	if (dojo.isDescendant(this.nav_node, sectioncols[i]))  //Is navigator a descendant of this sectioncol?
			        dojo.style(sectioncols[i],"width", "66%");
			}
 
		},
		startup: function() {			
		
			if(this._started)
				return;
			console.log("Navigator.startup()");
			console.log("Navigator parms: hidecarticon=" + this.hidecarticon + " hidecreatesricon=" + this.hidecreatesricon + " offering_fd=" + this.offering_fd + " tooltip=" + this.toolTip);
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");  		
			var iconpath = this.getRelativePath("images/icons/");
			this.inherited(arguments);
			
			//default links - 7.2.1
			var frontPage = {
					Category: [					 
					{   //[1]Request a new service
						Description: this._uiStringTable.RequestsLabel,
						LongDescription: this._uiStringTable.RequestsDesc,
						ImagePath: iconpath+"default_request.png",
						ImagePath2: iconpath+"transp.gif",
						iconSize: 48,
						iconClass: "",
                         ClassStructureID: -2,
                         type: "Catalog",
						Category: null
					},
					{   //[2]Help me fix a problem
						Description: this._uiStringTable.HelpFixLabel,
						LongDescription: this._uiStringTable.HelpFixDesc,
						ImagePath: iconpath+"default_helpfix.png",
						ImagePath2: iconpath+"transp.gif",
						iconSize: 48,
						iconClass: "",
						type: "Solution",
                        ClassStructureID: -3,
						Category: null
					},
					{  //[3]Frequent Requests
						Description: this._uiStringTable.RecentsLabel,
						LongDescription: this._uiStringTable.RecentsDesc,
						ImagePath: iconpath+"recent_request.png",
						ImagePath2: iconpath+"transp.gif",
						iconSize: 48,
						iconClass: "",
                        ClassStructureID: -4,
                        type: "Favorites",
						Category: null
					},
					{   //[4]Report an Issue
						Description: this._uiStringTable.IssuesLabel,
						LongDescription: this._uiStringTable.IssuesDesc,
						ImagePath: iconpath+"default_request.png",
						ImagePath2: iconpath+"transp.gif",
						iconSize: 48,
						iconClass: "",
                         ClassStructureID: -5,
                         type: "Issues",
						Category: null
					},
					{   //[5] Search results
						Description: this._uiStringTable.SearchResults,
						LongDescription: "",						
						ImagePath: iconpath+"transp.gif",  
						ImagePath2: iconpath+"transp.gif",
						iconClass: "",
						Category: null
					}					
					
				]
			};
			 
						
			//config75 processing
			//Do we have a 7.5 link configuration record? If so, we create a new configuration of Navigator links
			if (ibm.tivoli.tpae.dojo.data.getConfigProperty("link0")!=null) {
				//this.config75=true;
				frontPage = {Category:[]};
				this.catalog_link_index= -1;  //reset link index
				this.solution_link_index = -1;
				this.favorites_link_index = -1;
				this.search_link_index = -1;
				this.issues_link_index = -1;
				this.solution_browse_link_index = -1; 
						
			   //parse link config parms	
			   var index = 0;
			   var frontPage_index=0;
			   var done=false;
			
			   while (!done) {
				   var link_record = ibm.tivoli.tpae.dojo.data.getConfigProperty("link" + index);  //linkx record
				   console.log("Navigator.startup() - link record" + index + " - " + link_record);
				   if (link_record!=null) {					
				      var parms = link_record.split(",");  //parms array
				      //process each link parm
				      var link = {};
				      link.Category=null;
				      link.ImagePath = iconpath+"default_incident.png";  //TODO - different default icon
				      link.ImagePath2= iconpath+"transp.gif";
				      link.iconClass= "";
				      link.iconSize= 48;
                      link.ClassStructureID=-index;
                      link.LongDescription =  "";		           
				   
                      //process each parm (key:value)
 			          for (var i=0;i<parms.length;i++) { 
 			              var parm = parms[i].split(":");  //key:value
 			              if (parm!=null && parm.length==2) {
 			           		   var key=dojo.trim(parm[0]).toLowerCase();
 			           		   var val=dojo.trim(parm[1]);
 			           		   if (key =="id") { 			           			
 			           			   link.id = val;
 			           			   if (link.id=='Catalog') {
 			           				   this.catalog_link_index = frontPage_index;
   		                              //link.ClassStructureID=-2; 								   
                                      //defaults 								   
 								      link.Description = this._uiStringTable.RequestsLabel;
 								      link.LongDescription  = this._uiStringTable.RequestsDesc;
 								     link.ImagePath = iconpath+"transp.gif";
 								      if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") {      
 								    	 //link.ImagePath = iconpath+"ge64_service_request_24_RTL.png";
 								         link.iconClass = "sprite-ge64_service_request_24_RTL"; 
 								      } else { 								    	 
 								    	 //link.ImagePath = iconpath+"ge64_service_request_24.png";
 								    	 link.iconClass = "sprite-ge64_service_request_24";
 								      }
 								    	  
 								      link.type='Catalog';
 			           			   } else if (link.id=='Solution') {
 			           				  this.solution_link_index = frontPage_index; 
 			           			       								   
 								      link.Description =  this._uiStringTable.HelpFixLabel;
 								      link.LongDescription = this._uiStringTable.HelpFixDesc;
 								      link.ImagePath = iconpath+"transp.gif";
 								      if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") { 
 								         //link.ImagePath  = iconpath+"ge64_search_solutions_24_RTL.png";
 								         link.iconClass = "sprite-ge64_search_solutions_24_RTL"; 
 								      } else {
 								    	 //link.ImagePath  = iconpath+"ge64_search_solutions_24.png";
 								    	 link.iconClass = "sprite-ge64_search_solutions_24";
 								      }
 								    	  
 								      link.type='Solution';
 			           			   } else if (link.id=='Favorites') {
 			           				  this.favorites_link_index = frontPage_index;  			           			      				   
  								      
  								      link.Description =  this._uiStringTable.RecentsLabel;
  								      link.LongDescription = this._uiStringTable.RecentsDesc;
  								      link.ImagePath = iconpath+"transp.gif";
  								      if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") { 
  								         //link.ImagePath  = iconpath+"ge64_frequent_request_24_RTL.png";
  								         link.iconClass = "sprite-ge64_frequent_request_24_RTL"; 
  								      } else {
  								    	 //link.ImagePath  = iconpath+"ge64_frequent_request_24.png";
  								    	 link.iconClass = "sprite-ge64_frequent_request_24"; 
  								      }
  								    	  
  								    	  
  								      link.type='Favorites';
  			           		 	   }else if (link.id=='Issues') {
 			           				  this.issues_link_index = frontPage_index;  			           			      				   
  								      
  								      link.Description =  this._uiStringTable.IssuesLabel;
  								      link.LongDescription = this._uiStringTable.IssuesDesc;
  								      link.ImagePath = iconpath+"transp.gif";
  								      if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") {
  								         //link.ImagePath  = iconpath+"ge64_incident_request_24_RTL.png";
  								         link.iconClass = "sprite-ge64_incident_request_24_RTL"; 
  								      } else {
  								    	  //link.ImagePath  = iconpath+"ge64_incident_request_24.png";
  								    	  link.iconClass = "sprite-ge64_incident_request_24"; 
  								      }
  								    	  
  								      link.type='Issues';
  			           		 	   
  			           		 	   } else if (link.id=='BrowseSolution') { //Browse Solution link  
  			           		 		   this.solution_browse_link_index = frontPage_index; 
          			       								   
  			           		 		   link.Description =  this._uiStringTable.BrowseSolutionsLabel; 
  			           		 		   link.LongDescription =  this._uiStringTable.BrowseSolutionsDesc;
  			           		 		   if(isBidiEnabled==true && dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") 
  			           		 			   link.ImagePath  = iconpath+"ge64_browseSolutions_24_RTL.png";  
  			           		 		   else
  			           		 			   link.ImagePath  = iconpath+"ge64_browseSolutions_24.png";  
					    	  
  			           		 		   link.type='BrowseSolution';
  			           		 	   }		           		 	   

 			           		   } else if (key =="image") {
 			           		       link.ImagePath=iconpath+val;
 			           		       link.iconClass= "";
 			           		   } else if (key == "label") {
 			           		       link.Description=val;
 			           		   } else if (key == "labelkey") {
 			           			   if (this._uiNavigatorStringTable!=null) {
 			           		          link.Description=this._uiNavigatorStringTable[val];
 			           			   }
 			           		   } else if (key == "labelmsgkey") {
 			           			   //TODO - get message  for msggroup=srmsslabels and msgkey = val
 			           		       //link.Description=this._uiStringTable.val;
 			           		   }else if (key=='description') {
 			           		      link.LongDescription=val;
 			           		   } else if (key=='desckey') {
 			           			  if (this._uiNavigatorStringTable!=null) {
 			           		        link.LongDescription=this._uiNavigatorStringTable[val];
 			           			  }
 			           		   } else if (key == "descmsgkey") {
 			           			   //TODO get message  for msggroup=srmsslabels and msgkey = val
 			           		       //link.LongDescription=this._uiStringTable.val;
 			           		   } else if (key=='type') {
 			           			   if (val=='dialog' || val=='script' || val=='url' || val=='application') {
 			           				   link.type = val;
 			           			   }   
   			           		   } else if (key=='target') { 			           		      
 			           		      link.target = val;          		    
                    		   }      		 		    		 		    		 		    		 		      		 			           		
      			          }
 			           
 			          }  //end of linkx record
 			       
                      //Done processing  link record				   
 			          //If we have an id, add to frontPage
	           	      if (link.id!=undefined) {
	           	    	  
	           	    	  //shortcut for create SR dialog which we display be default in config75.properties
	           	    	  if (link.type=='dialog' && link.id=='createSR' && link.target=='srmsscreatesr' && link.Description==undefined) {
	           	    		 link.Description =  this._uiStringTable.CreateSRLabel;
						     link.LongDescription = this._uiStringTable.createSRToolTip;
						     link.ImagePath  = iconpath+"default_request.png";
						     link.iconClass = "";
	           	    	  }
	           	    	  
	           		      //Defaults			            
			              if (link.Description==undefined) {
		        	         link.Description =  link.id;
		                  }			              
			              			                       
			              //Add pre-defined link to list of links
			              if ((link.id =='Catalog' || link.id=='Solution' || link.id=='Favorites' || link.id == 'Issues' || link.id =='BrowseSolution') ||  
			            		    (link.type!=undefined && link.target!=undefined)) {			            	     
	           	    			 frontPage.Category[frontPage_index] = {};  
	           	    			 frontPage.Category[frontPage_index] = link;
	           	    			 frontPage_index++;           	    			 	           	    		    
	           	    			 
	           	    	  } else { 
	           	    		 console.error("Navigator.startup() - invalid record skipped " + index + " - " + link_record);
	           	    	  }               
	           	      }
	           	      index++;
	           	   
				   } else {  //no link record - index
					   done=true;
				   }		 		
			   } //end loop of links
			   if (frontPage_index>0) {
			      //Add Search at end
				  this.search_link_index = frontPage_index;
			      frontPage.Category[frontPage_index] = {};
			      frontPage.Category[frontPage_index].id='Search';
			      frontPage.Category[frontPage_index].Description = this._uiStringTable.SearchResults;
			      frontPage.Category[frontPage_index].ImagePath=iconpath+"transp.gif";  
			      frontPage.Category[frontPage_index].ImagePath2=iconpath+"transp.gif";
			      frontPage.Category[frontPage_index].iconClass= ""; 
			      
			    } 
			}			
		    //config75 end						
			
			//Get top level node Strings from maximo so customer can customize them (721 only)
			if (this.config75==false) {
			   var getNodeStrings = ibm.tivoli.tpae.dojo.data.getConfigProperty("getTopNodeTextStrings");
			   if (getNodeStrings!=null && getNodeStrings == 'true'){		   
			      var deferred  =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMaxMessages("srmsslabels");			
    		      if (deferred) {
				      deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {				   
					      messages = response.MAXMESSAGESMboSet.MAXMESSAGES;
					      for (var i=0;i<messages.length;i++) {
					         var key = messages[i].MSGKEY;
					         var value = messages[i].VALUE;
					         if (key=="RequestsLabel")
					    	    frontPage.Category[this.catalog_link_index].Description = value;			
					         else if (key=="RequestsLabelDesc")
					    	    frontPage.Category[this.catalog_link_index].LongDescription = value;
					      
					         if (key=="HelpFixLabel")
						       	 frontPage.Category[this.solution_link_index].Description = value;	
					         else if (key=="HelpFixLabelDesc")
					    	     frontPage.Category[this.solution_link_index].LongDescription = value;
					      
					         if (key=="RecentsLabel")
						      	 frontPage.Category[this.favorites_link_index].Description = value;	
					         else if (key=="RecentsDesc")
					    	     frontPage.Category[this.favorites_link_index].LongDescription = value;
					      
					         if (key=="SystemWideFrequentFolderLabel")
					    	     this._SystemWideFolderLabel = value;
					      
  					         if (key=="MyFrequentFolderLabel")
					    	    this._MyFrequentFolderLabel = value;
					      
					      }
				       }));				  				   
			      }		    					
			   }
		    }
			
			this.rootList = dijit.byId(this.id + "_list");  //Navigator root (ListTree)
			
			//Get config property to not use tooltip in Navigator
   		    var tooltip_prop = ibm.tivoli.tpae.dojo.data.getConfigProperty("tooltip");  //config.properties
			if (tooltip_prop!=null && tooltip_prop=='false') {
				this.toolTip=false;					
	   		}			
			this.rootList.toolTip=this.toolTip; //enable-disable using dojo tooltip  
			
			this.rootList.addChildren(frontPage, "NavFrontPage Waiting", 1); // even though this is NavFrontPage, the children will be RowMajor
															  		// TODO: fix that if you can.
			
			var event = null;	 
			
			 //Get sigoptions and hide links and icons based on returned options 
			sendXHREvent("pmsc_getAppOptions", dojo.byId(this.id).id, event, REQUESTTYPE_HIGHASYNC, "json", "application/json", dojo.hitch(this,"_getAppOptions_resp"),
		   	   function(response) {console.error("Navigator.startup() - sendXHREvent error - " + response);dojo.hitch(this,"_getAppOptions_resp")});			
						
			 //Send request to server to check if user is authorized for app or LIC
			var nodeid = this.nav_node.id;
			 dojo.forEach(this.rootList.subitems, dojo.hitch(this,function(link) { 			 
               if (link.type && link.type=='application' && link.target) {
            	   var event = "app;" + link.target;
      	  	       sendXHREvent("pmsc_app_auth", this.nav_node.id, event, REQUESTTYPE_HIGHASYNC, "json", "application/json", dojo.hitch(this,"_sendasync_resp"),
      	  			   function(response) {console.error("Navigator.startup() - sendXHREvent error - " + response);});
               } else if (link.type && link.type=='url' && link.target) {
            	   var event = "lic;" + link.target;
      	  	       sendXHREvent("pmsc_app_auth", this.nav_node.id, event, REQUESTTYPE_HIGHASYNC, "json", "application/json", dojo.hitch(this,"_sendasync_resp"),
          	  			   function(response) {console.error("Navigator.startup() - sendXHREvent error - " + response);});
                   }  
		     }));
									
			// these ids have to be kept in sync with their defs in the template
			this.crumb_id = this.id + "_crumbs";	// id of my Breadcrumb object
			this.list_id = this.id + "_list";		// id of the domNode housing the lists
			this.connect(this.list_search_btn, 'onClick', '_search');			
			this.connect(this.list_search_term, 'onkeypress', '_search');
			
			//connect navigator maximime/minimize icon 
			dojo.connect(dojo.byId(this.id+ "_maximize_nav"), "onclick", this, '_maximize_nav');
			//change icon if RTL
			 if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") 
				 dojo.byId(this.id+ "_maximize_nav").src = "../webclient/javascript/simplesrm/srm/dijit/images/nav_icon_fullScreenRTL.png";
						
			//connect navigator tree or folder icon 
			dojo.connect(dojo.byId(this.id+ "_crumbs_treeview_nav"), "onclick", this, '_treeview_nav_clicked');			
			 			 			
			//toolbar tooltips
			if (product!=null && product.indexOf("srm")>=0){				
			    var tip = "<span style='font-size:x-small;'>" + this._uiStringTable.SearchToolTip + "</span>";			    
				new dijit.Tooltip({connectId: [this.id + "_list_search_btn"],label: tip});				
				new dijit.Tooltip({connectId: [this.id + "_dialog_search_btn"],label: tip});	
				
				tip = "<span style='font-size:x-small;'>" + this._uiStringTable.createSRToolTip + "</span>";			    
				new dijit.Tooltip({connectId: [this.id + "_createSR_label"],label: tip});				
				new dijit.Tooltip({connectId: [this.id + "_createSR_btn"],label: tip});
				
				//tooltip
				tip = "<span style='font-size:x-small;'>" + this._uiStringTable.templateToolTip + "</span>";	
				new dijit.Tooltip({connectId: [this.id + "_template_btn"],label:  tip});			

			}	

			// connect the navigation buttons
			this.connect(this.home_btn, 'onClick', '_goHome');
			
			 			
			//connect create SR button or hide it 
			if (product!=null && product.indexOf("srm")>=0){
			   this.connect(this.dialog_search_btn, 'onClick', '_helpFixSumit');
			   this.connect(this.dialog_search_term, 'onkeypress', '_helpFixSumit');
			   //this.connect(this.dialog_search_close_btn, 'onClick', '_helpFixClose');
			   //this.connect(this.dialog_search_close_term, 'onkeypress', '_helpFixClose');
			   this.connect(dijit.byId('search-dialog').closeButtonNode, 'onclick', '_helpFixClose');
			   var search_typeahead_prop = ibm.tivoli.tpae.dojo.data.getConfigProperty("Searchtypeahead");  //config.properties
			   //search type ahead is on by default and can be disabled if Searchtypeahead=false 
			   if (search_typeahead_prop==null || search_typeahead_prop!='false') {
			      this.connect(this.dialog_search_term, 'onkeyup', '_helpFixSumit');  //for Search dialog typeahread
			     
			   }
			   
			}else 
				dojo.query(".navigator_srmhead").orphan();		  	
			
			this.rootList.show();
			
			// hide unused branches (you have to show() before the dom nodes exist to hide)
			//if(this.config75==false && (this.incidentsOP==null || this.incidentsOP.length === 0)) {  
			//	dojo.style(this.rootList.subitems[0].domNode, "display", "none"); 
			//}

			 
			// hide Favorite branch (if not removed) (you have to show() before the dom nodes exist to hide)			 
			if(this.config75==false && (this.frequentRequestsOP==null || this.frequentRequestsOP.length === 0)) {  
				dojo.style(this.rootList.subitems[this.favorites_link_index].domNode, "display", "none");
				this.favorites_link_index=-1;
			}
			
			//shopping cart icon
			var shopping_cart_icon = dijit.byId(this.id + "_shoppingCart_btn");		
			var shopping_cart_label = dojo.byId(this.id + '_cart_label');
			console.log("shopping_cart_label = " + shopping_cart_label);
			
			//Hide Catalog link if commented out in config.properties
			if(this.config75==false && (this.requestsOP==null || this.requestsOP.length === 0)) {  
				dojo.style(this.rootList.subitems[this.catalog_link_index].domNode, "display", "none");
				this.catalog_link_index = -1;			    
		    }		   			
			 						
			// always hide the search results list
			this._searchResultsList = this.rootList.subitems[this.search_link_index];
			dojo.style(this._searchResultsList.domNode , "display", "none");			
									
			//hide solutions if not commented out in config
			if(this.config75==false && (this.solutionsOP==null || this.solutionsOP.length === 0)) {  
				dojo.style(this.rootList.subitems[this.solution_link_index].domNode, "display", "none");
				this.solution_link_index = -1;							
			}
			
			 //Initialize placeholder for Search
			var search_field = dojo.byId(this.id + "_list_search_term"); 	
			if (this.solution_link_index == -1 && this.solution_browse_link_index == -1) {  //Update search placeholder to String with Search 
				search_field.value = this._uiStringTable.SearchFieldTextNoSol;				 
			} else
			    search_field.value = this._uiStringTable.SearchFieldText;				
			
			//7.5 hack to remove background on tip buttons. It didn't show up in 721 (Dojo 1.4)
			//var template_icon = dijit.byId(this.id + "_template_btn");
			dojo.forEach(dojo.query(".dijitInline.dijitButtonNode", null), function(elem) {
				if (dojo.isIE) {
					dojo.style(elem, {"background":  "none",  "border":  "0px"});				  
				} else {
					 dojo.style(elem, {"background":  "none",  "border":  "hidden"});
				}			
			});		
			 						
			// the event handlers aren't connected yet
			// manually call a couple
			this._onpushlist(null, this.rootList);
			this._onactivatelist(this.rootList);
			this._setNavButtonState();				 
			
			this._loadUI();
			
			//resize border container automatically when Window resized. Border container needs a fixed height 
			dojo.connect(window, "onresize", dojo.hitch(this,function() {
				var h = dojo.window.getBox().h;   //window size
				if (h==null)
					return;
				var start_height = dojo.style(dojo.byId(this.id +  "_borderContainer"), "height");  //start size of border container
				console.log("onresize: window size = " + h + " start height = " + start_height);
				if (start_height==null)
					return;

				h = h - dojo.position(dojo.query(".srmnavigator")[0]).y            //position of nav
						-  dojo.marginBox(dojo.query(".navigator_head")[0]).h	   //size of nav header
						-  dojo.marginBox(dojo.byId(this.id + "_crumbs")).h;	   //size of breadcrumbs
				if (dojo.isIE) 
					h = h - 60; 													   //padding
				else
					h = h - 25;
							
				console.log("onresize: new height = " + h);				 
				dojo.style(dojo.byId(this.id +  "_borderContainer"), "height",h + "px");
				dijit.byId(this.id+'_borderContainer').resize();
			}));
			
			//Give a warning if Silverlight not installed (IE)
	         var checkedSilverlight=null;
	         if (dojo.isIE && dojo.cookie.isSupported())
	            checkedSilverlight = dojo.cookie("checkedsilverlight");
			 if (dojo.isIE && checkedSilverlight==null) {
				try {
	               if (dojo.cookie.isSupported())
	                  dojo.cookie("checkedsilverlight", "true");
				   new ActiveXObject('AgControl.AgControl');				
				} catch(ex) {
				   	(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2362I"})).show();				
				}
			}						 
			
		},
		
		_loadUI: function() {			
			 
			//tree view or folder view to start with?
			var treeView = ibm.tivoli.tpae.dojo.data.getConfigProperty("navigatorView"); 
			if (treeView!=null || treeView=="tree") { 			 
				this._cat_treeview=true;
			}			
			
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");   	
			var data_deferreds = [];
			
			if (product==null || product.indexOf("srm")<0){ //Not SRM
				var numberOfFrequentRequests = 4;
				var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getFrequentRequests(numberOfFrequentRequests);
				data_deferreds.push(deferred); // no callback here - we have to wait untill whole navigator will be populated
			}	
			
			if (com.ibm.ism.pmsc.dojo._SC_installed == true) {			 
					
				if (this.catalog_link_index!=-1) {
				   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getCatalogs();  //get and cache catalogs
				   
	               var amt = ibm.tivoli.tpae.dojo.data.getConfigProperty("MaxRestItems");  //default=500   	
	               if (amt!=null && amt>0 && amt<=500) {
	                  this._maxRestItems=amt;
	               }
						
				   //var params = {itemid:"~gt~0"};  //use _rsStart instead
	               var params = {};
						
                   if (this._offering_fd!=null && this.offering_fd.length>0) {  //Add filtering domain passed in as parm
		              params._fd = this.offering_fd;
		           }
	                   
                   params._usembo=true;  //get mbo instead of OS 
					  
				   this._getRequestsCatalog(params,data_deferreds);   //SC installed. This is what gets called!!
				}
				
			} else {  //SC not installed
                //Quick inserts only in this case (no SC installed) 			
				if (product!=null && product.indexOf("srm")>=0){
					if (this.catalog_link_index!=-1) {
					   this._loadTemplates(data_deferreds);
					}					
				}
			 		
			}	
	
			 						
			if (product!=null && product.indexOf("srm")>=0){
				if (this.solution_link_index!=-1) {
					dojo.removeClass(this.rootList.subitems[this.solution_link_index].domNode, "leaf");
					dojo.addClass(this.rootList.subitems[this.solution_link_index].domNode, "branch");	
				}
				
				if (this.favorites_link_index!=-1) {
				    dojo.removeClass(this.rootList.subitems[this.favorites_link_index].domNode, "leaf");
				    dojo.addClass(this.rootList.subitems[this.favorites_link_index].domNode, "branch");
				}
								
				//This removes the Waiting icon from the links. We skip over th Catalog until we receive all the data
				dojo.forEach(this.rootList.subitems, function(item) {	
					if(item.type && item.type!="") {
						if (item.type!='Catalog') {
						   dojo.removeClass(item.domNode, "leaf");
						   dojo.addClass(item.domNode, "branch");
						}
					}
				});
			}			
						
			//get User's cart information and add tooltip to hitch to method to create tooltip
			//TODO - only do this if SC installed
			 if (product!=null && product.indexOf("srm")>=0) {  
			    
			     if (this.hidecarticon!=true) {  //when cart not hidden
			    	//connect click to shopping cart button
				    this.connect(this.shoppingCart_btn, 'onClick', '_shoppingCart');	
				 
                    //Initialize tooltip			 
				    this.shoppingCartTooltip();
				    
				    //Event listener to refresh tooltip if dialog closes.
				    //The function addModalWaitLayer is a maximo function that is called on display of a Maximo dialog				     
				    //dojo.connect(null,"addModalWaitLayer",this,"shoppingCartTooltip");
			     }
			 }
						
			// don't wire-up list event handlers until all the data is in
			var last_deferred = new dojo.DeferredList(data_deferreds);
			
			if (product==null || product.indexOf("srm")<0){  //Not SRM
				last_deferred.addCallback(dojo.hitch(this,function(results){
					if(results[0][0]){
						this.refreshRecentRequests(results[0][1]);
					}
					else{
						console.error("Navigator._loadUI.getFrequentRequests has failed");
					}
				}));
			}
			
			last_deferred.addCallback(dojo.hitch(this, function(results) 
			{
				// wire up ListTree events
				this.connect(this.rootList, "onPushList", "_onpushlist");
				this.connect(this.rootList, "onPopList", "_onpoplist");
				this.connect(this.rootList, "onActivateList",  "_onactivatelist");
				this.connect(this.rootList, "onClick", "_onlistclick");				 
				
				// wire up the breadcrumbs
				var my_crumbs = dijit.byId(this.crumb_id);
				this.connect(my_crumbs, "onClick", "_oncrumbclick");
				
				//Remove the link Waiting icon
				dojo.forEach(dojo.query(".Waiting", this.rootList.domNode), function(elem)
				{
					dojo.removeClass(elem, "Waiting");
				});
				
				this._UIComplete = true;
				return results;
			}));
		},		
		 
		
		//Refresh Shopping Cart info and add tooltip to Shopping cart icon
		//TODO - when user add offering to cart this tooltip needs to be refreshed.
		_tooltip_dijit: null,
		_tooltip_text_dijit: null,
		_cartid: null,           //current cart id
		_itemsincart:0,		
		shoppingCartTooltip: function() {
            		
			console.log("Navigator.shoppingCartTooltip(): ");
			if (this._tooltip_dijit!=null)
			   this._tooltip_dijit.destroy();
			 if (this._tooltip_text_dijit!=null) 
			   this._tooltip_text_dijit.destroy();			   
	
			 this._itemsincart=0;
			 
			//get shopping cart data	
			deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getShoppingCart();
			if (deferred) {
				   deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
					   if (this.hidecarticon==true) { 
						   return;						   
					   }					   
					   var tooltip = "<span style='font-size:x-small;'>" + this._uiStringTable.CTJZH2359I + "</span>";
					   
					   if (response.QuerySRM_CARTResponse.rsCount>0) {		
						   var pmsccr = response.QuerySRM_CARTResponse.SRM_CARTSet.PMSCCR[0];
						   this._cartid=pmsccr.PMSCCRID;					   
						  		  	   						   
						   tooltip = "<span style='font-size:x-small;'>" + this._uiStringTable.CurrentCart + ": <b>" + pmsccr.DESCRIPTION + "</b><ul>";						   
						   
						   if (pmsccr.SR) {
							   var SRs = pmsccr.SR;							  
							   this._itemsincart = SRs.length;							  

                               //Only show first 10 offerings in tooltip.  Add a "... 5 more ..." message at the end of the list
                               var amt_to_show = this._itemsincart;
                               if (this._itemsincart>10) {
                                  amt_to_show=10;
                               }
							   
					           for (var i=0;i<amt_to_show;i++) {
						          var SR = SRs[i];
						          tooltip = tooltip + "<li>" + SR.DESCRIPTION + "</li>";    
						       }	
                               if (this._itemsincart>10) {
                            	 var amt = this._itemsincart - amt_to_show;                            	 
                                  var more_msg = " ... " + amt +  " " + this._uiStringTable.More + " ...";
						          tooltip = tooltip + "<li>" + more_msg + "</li>";    
                               }

					       } 
						   tooltip = tooltip + "</ul>" + "</span>";
					   }
				   
				       if(isBidiEnabled==true && dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") {					       
				    	   //var RLE = '\u202B';  &#x202B;  		
				    	   //var PDF = '\u202C';  &#x202C;
				    	   //This equates to  "<span dir='rtl'>" + tooltip + '</span>';
				           tooltip =  '\u202B' + tooltip + '\u202C';
				       }				           
					   
					   //Add tooltip to shopping cart icon
					   this._tooltip_dijit = new dijit.Tooltip({
			               connectId: [this.id + "_shoppingCart_btn"],
			               label: tooltip			               
			               });					   
			              
 					   //Add tooltip to shopping cart text
					   this._tooltip_text_dijit = new dijit.Tooltip({
			               connectId: [this.id + "_cart_label"],
			               label: tooltip			               
			               });
					   
					   //update cart amount
					   if (this._itemsincart>0)
						      dojo.byId(this.id + '_cart_amount').innerHTML = this._itemsincart;
						   else 
							  dojo.byId(this.id + '_cart_amount').innerHTML = " "; 
				   }));				  				   
			 }		    
		},
		
		//Shopping cart text onmouseover
		_cartOnRollover: function(evt)
		{
			dojo.addClass(evt.target, 'highlight');
			dojo.style(evt.target, 'cursor', 'pointer');
		},
		_cartOnRollout: function(evt)
		{
			dojo.removeClass(evt.target, 'highlight');
			dojo.style(evt.target, 'cursor', 'default');
			dojo.style(evt.target, 'text-decoration', 'none');
		},
		//Create Request button
		_createSROnRollover: function(evt)
		{
			dojo.addClass(evt.target, 'highlight');
			dojo.style(evt.target, 'cursor', 'pointer');
		},
		_createSROnRollout: function(evt)
		{
			dojo.removeClass(evt.target, 'highlight');
			dojo.style(evt.target, 'cursor', 'default');
			dojo.style(evt.target, 'text-decoration', 'none');
		},
		
		//launch Shopping cart dialog when clicked		 
		_shoppingCart: function() {
			console.log("Navigator._shoppingCart - launch shoppingcart dialog, cartid =  " + this._cartid);			 
			
			//dialog handler for shopping cart dialog
			this._addModalWaitLayerHandler = dojo.connect(null,"addModalWaitLayer",this,"_checkDialogConnect");
			
			//Invoke method - shoppingcart and pass cartid
			sendEvent("shoppingcart", this.nav_node.id,  this._cartid);                   			 
		},				
		 		
		_swizzleData: function(rlist, classification, default_folder_icon, default_leaf_icon) {
			var static_iconpath = this.getRelativePath("images/icons/");
			var i;

			for(i in rlist) {
				var r = rlist[i];
				
				if(r.ImageName2)
					r.ImagePath2 = static_iconpath + r.ImageName2;
				else
					r.ImagePath2 = static_iconpath + "transp.gif";
				
				if(!r.ImageName) {  //no image
					if(r.Category || r.Offering) {
						if(default_folder_icon) {
							r.ImageName = default_folder_icon;
						}
					} else {
						if(default_leaf_icon) {
							r.ImageName = default_leaf_icon;
						}else{
							if(r.ItemNum)
								r.ImageName = "default_offering.png";
							if(r.Template)
								r.ImageName = "default_template.png";
							if(r.Solution)	
								r.ImageName = "default_solution.png";
						}
					}
					
					r.ImagePath = static_iconpath + r.ImageName;
				
				} else {  //we have an image for item					
					var useImageServlet = true;  
					
					var usi = ibm.tivoli.tpae.dojo.data.getConfigProperty("UseImageServlet");
					
					var imageid = r.ItemID?r.ItemID:r.ID;   //imageid differs for offerings and templates
					if (usi!=null)
					   useImageServlet = (usi=='true' || usi=='1');
					
					 r.ImageName = r.ImageName.replace(/\+/g, "%2B");  //encode +
					
					 //image cache. This assumes that duplicate image names are the same image. If not we're in trouble!					 
                	 var dontCacheImageNames = ibm.tivoli.tpae.dojo.data.getConfigProperty("DontCacheImageNames");  //if DontCachImageNames = true, we don't reuse image name
                	 if (dontCacheImageNames==null || dontCacheImageNames!='true' ) {   
					    if (!ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[r.ImageName]) {                              	
                		   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[r.ImageName] = {itemid: imageid};  //cache image id locally                            	
                        } else {
                     	   imageid =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[r.ImageName].itemid;  //use cached id
                        }
                	 }

					//this uses a Servlet to cache and return the image
					if (useImageServlet==true)  //tsam
						r.ImagePath = this.imageCacheUrl + r.ImageName + "?REFOBJECTID=" + imageid; 
					else {             										
  					    r.ImagePath = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().baseRestUrl +  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().rest_context_root + "/rest/mbo/imglib/" + "?REFOBJECTID=" + imageid + "&imagename=" + r.ImageName + "&_compact=true"; 
					}			   
				}
				
				// I need to copy ClassificationID from a parent into leaf nodes
				//if(r.ClassificationID) {
				//	classification = r.ClassificationID;
				//}
				//if(classification && !r.ClassificationID) {
				//	r.ClassificationID = classification;
				//}
				if(r.Category) {
					this._swizzleData(r.Category, classification, default_folder_icon, default_leaf_icon);
				}
				if(r.Offering) {
					this._swizzleData(r.Offering, classification, default_folder_icon, default_leaf_icon);				
				}		
						 
			}
			
		},
		// if a branch has only folders
		_pruneTree: function(tree) 
		{
			//console.log("Navigator._pruneTree()", tree);
			console.log("Navigator._pruneTree()");
			for (var i in tree.Category) {
				/* SR Commented out for future use (post GA) */
				/*if ((tree.Category.length == 1)
					 && tree.Category[i].Category) { // check for existence
					if (undefined !== tree.Category[i].Offering
						&& tree.Category[i].Offering.length !== 0) {
						tree.Offering = tree.Category[i].Offering
					}
					console.log("prune 1");
					tree.Category = tree.Category[i].Category;
				}*/
				if ((undefined !== tree.Category[i].Category &&
						 tree.Category[i].Category.length == 1) &&
					  (undefined === tree.Category[i].Offering ||
					 	tree.Category[i].Offering.length === 0)) {
					// console.log("prune 2");
					tree.Category[i] = tree.Category[i].Category[0];
				}
				this._pruneTree(tree.Category);
			}
		},
		_sortTree: function(tree)
		{
			if(undefined !== tree.Offering) {
				tree.Offering.sort(function(a, b)
				{
					if(a.Description && b.Description && (a.Description.toLowerCase() < b.Description.toLowerCase())) {return -1;}
					if(a.Description && b.Description && (a.Description.toLowerCase() > b.Description.toLowerCase())) {return 1;}
					return 0;
				});
			}
			if(undefined !== tree.Category) {
				tree.Category.sort(function(a, b) 
				{
					if(a.Description && b.Description && (a.Description.toLowerCase() < b.Description.toLowerCase())) {return -1;}
					if(a.Description && b.Description && (a.Description.toLowerCase() > b.Description.toLowerCase())) {return 1;}
					return 0;
				});
				for(var i in tree.Category) {
					this._sortTree(tree.Category[i]);
				}
			}
		},
		_saved_req_data: null,
		/* Actually these are the FREQUENT requests */
		refreshRecentRequests: function(data)      
		{
			console.log("Navigator.refreshRecentRequests");
			if(!dojo.isArray(data)){
				return;
			}
			
			var recents = {Category: []};
			dojo.forEach(data, dojo.hitch(this,function(el){
				console.log("el:" + el);
				var request_item = walkNavigatorAndFindItem(this.rootList, el);
				if(request_item) {
					recents.Category.push(request_item);
				}
			}));
			
			this.rootList.subitems[this.solution_link_index].removeChildren();

			if(recents.Category.length > 0) {
				this.rootList.subitems[this.solution_link_index].addChildren(recents, "RowMajor", 2);
			}
			else {
				dojo.removeClass(this.rootList.subitems[this.solution_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.solution_link_index].domNode, "empty");				
			}			
	
			// if the recent requests list is active, re-show it to refresh its contents		
			if(this.rootList.getActiveList() === this.rootList.subitems[this.solution_link_index]){
				this.rootList.subitems[this.solution_link_index].show();
			}
			return;			
			
			/********* local helpers ***********/
			function walkNavigatorAndFindItem(item, target)
			{
				var retval = null;
				//console.group("searching %s (%s) for %s", item.label, (item.data ? item.data[item.keyField] : "no item.data!"), target);
				if(item && (!item.subitems || item.subitems.length === 0 /*only find leaf nodes*/) && item.data && item.data[item.keyField] == target) {
					//console.log("*** found recent: %s ***!", target);
					retval = item.data;
				}
				else {
					for(var i in item.subitems) {
						retval = walkNavigatorAndFindItem(item.subitems[i], target);
						if(retval) {
							break;
						}
					}
				}
				//console.groupEnd();
				return retval;
			}
		},

		/************* search *********************/
		_searchResultsList: null,
		_searchListConn: null,
		 
		/* 
		 * Search
		 * 
		 */  
		_search: function(evt) 	{
			if(evt.type == 'click' || (evt.type == 'keypress' && evt.keyCode == dojo.keys.ENTER && evt.target == this.list_search_term)) {
				var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
				
				var search_str = dojo.byId(this.list_id + '_search_term').value;
				if (product==null || product.indexOf("srm")<0){
					if(search_str.length === 0) {
						return;
					}
				}	
				
				if (product!=null && product.indexOf("srm")>=0){  
					var global = true;
					this._searchRemote(search_str, global);  //call search method
					
				} else {  //Not SRM	
				   var search_results = this.rootList.Search(dojo.byId(this.id+'_list_search_term').value);
				   if(search_results.length === 0) {							
				      var wd = new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2339I", buttons:[this._uiStringTable.OK, this._uiStringTable.CreateSR]});
					  wd.show();						
					  var button = dojo.byId(wd.id + "mmd_button_1");  //create SR button
					  dojo.connect(button, 'onclick', this, '_createSR'); 
				   } else {
		 
				    	//hide tree contentpane
			    	   dijit.byId(this.id+'_borderContainer').removeChild(this._treeContentPane);
					   dojo.style(dojo.byId(this.id+"_crumbs_treeview_nav"), "display", "none");

  					   this._searchResultsList.removeChildren();
					   this._searchResultsList.addChildren({Category: search_results}, "RowMajor", 2);
			 
					   var bPushBreadcrumb = this._searchResultsList !== this.rootList.getActiveList();
					   this._searchResultsList.show();
					   if(bPushBreadcrumb){
						  this._onpushlist(null, this._searchResultsList);	// TODO: something's not quite right with ListTree or Navigator event handlin that I have to do this
					   }
		 
			       }
				}
			}	
		},
		
 
		// ************** Toolbar navigation ****************/
		// experiment with maintaining state an supporting back/forward
		_activeListHistory: [],		// array of what lists have been active
		_activeListIndex: -1,		// index into _activeListHistory where we currently are
		_navInHistory: false,		// true if navigating thru the history, and not via direct clicks in the UI
		_goHome: function()
		{
			console.log("Navigator._goHome [%d[%d]]", this._activeListHistory.length, this._activeListIndex);
			
			this._currentList = "home";
			//if(this._uiStringTable.Search)
			//	dojo.byId(this.id + "_list_search_btn").innerHTML = this._uiStringTable.Search;
			
			this._navInHistory = true;
			this._activeListHistory.splice(1, this._activeListHistory.length);
			this._activeListIndex = 0;
			this._activeListHistory[0].show();
			dijit.byId(this.crumb_id).popToMorsel(0);
		},
		
		//placeholder support
		_placeholder: function(event) {
			var search = dojo.byId(this.id + "_list_search_term");
		
			if(event.type == 'focus') {
			   dojo.removeClass(search, "placeholder");
			   search.value= '';
			} else if (event.type=="blur") {  
				if (search.value=='') {
			       dojo.addClass(search, "placeholder");
			       if (this.solution_link_index == -1 && this.solution_browse_link_index == -1)   //Update search placeholder to String with Search 
					   search.value = this._uiStringTable.SearchFieldTextNoSol;
				   else	
			           search.value = this._uiStringTable.SearchFieldText;
				}
			}
		},
		
		//launch create SR dialog 
		_createSR: function()  
		{
			console.log("Navigator._createSR - launch dialog");			
			arguments.caller=null; //running into a IE bug in stacktrace()
			//this._addModalWaitLayerHandler = dojo.connect(null,"addModalWaitLayer",this,"_checkDialogConnect");
			sendEvent("createsr", this.nav_node.id,  "createSR");                   			 
		},

		//launch template dialog 
		_template: function()  
		{		
			var deferred  =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getCartTemplatesAmt();			
			if (deferred) {
				deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {				   
					var amt =  response.PMSCTMPLMboSet.rsCount;
					console.log("Navigator._template - amt =" + amt);	
					if (amt==0) 
					{        //No templates message
						(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2360I"})).show();
						return;
					}
					else
					{
						console.log("Navigator._template - launch dialog");			
						arguments.caller=null; //running into a IE bug in stacktrace()
						this._addModalWaitLayerHandler = dojo.connect(null,"addModalWaitLayer",this,"_checkDialogConnect");
						sendEvent("templadm", this.nav_node.id,  "templadm");  
					}
				}));
			}                			 
		},
		
		_setNavButtonState: function()
		{
			//dijit.byId(this.id + '_home_btn').attr("disabled",  (this._activeListIndex >= 0 && this._activeListHistory[this._activeListIndex] === this.rootList) );
		},
		// ************** ListTree event handlers ************
		
		//This pushes a listtree onto the breadcrumb stack
		_onpushlist: function(prevList, newList) {
			console.log("Navigator._onpushlist(%s, %s)", prevList?prevList.label:"null", newList?newList.label:"null");
			
			//get list type
			var type = newList.getListType();
			
			//if tree view we need to calculate the breadcrumb trail becuase you can click anywhere in the tree 
			if (this._cat_treeview==true && type!=null && (type=='Catalog' || type=='Issues' || type=='BrowseSolution')) {  
				var bc  = dijit.byId(this.crumb_id);
				bc.popToMorsel(0);		//clear breadcrumb		 
				var treeNode = newList;
				var trail= [];
				trail.push(treeNode);				
				 
				var folderTree = null;
				while(treeNode.parentList) {  //walk up tree
					trail.push(treeNode.parentList)
					treeNode = treeNode.parentList;					 
					
					if (treeNode.folderTree!=null)
						folderTree = treeNode.folderTree;  //save tree
				}
				for (var i = trail.length-2;i>=0;i--) {  //build breadcrumb
					bc.pushMorsel(trail[i].label, trail[i]);	
				}

				//expand tree and set focus to clicked folder in tree			 				
				if (folderTree && newList.ClassStructureID) {
			    	//Can be used to expand and set focus. Isn't working in all cases
					//var idarray = ['csid', '654426', '653926']
					//var d = dijit.byId("mx105Catalog_treeFolder").set('path', idarray )
			    	var item = folderTree.getNodeFromItem(newList.ClassStructureID.toString());
			    	if (item) {
			    	   var node = item[0];	
			    	   folderTree._expandNode(node, false);
			    	   if (folderTree._myLastNode) { //remove focus from previous tree node
	                        folderTree._myLastNode.setSelected(false);
			    	   }
	                   node.setSelected(true);
	                   folderTree._myLastNode = node;		                   				    	  
				       folderTree.focusNode(node);		    	   
				    }			    	 				    	  
				}								 
								
			} else {
			   var newmorsel = dijit.byId(this.crumb_id).pushMorsel(newList.label, newList);
			}
			var scrolling_box = dojo.byId(this.id + "_box");
			if(scrolling_box){
				scrolling_box.scrollTop = 0;
			}
		},
		_onpoplist: function(prevList, newList) {
			console.log("Navigator._onpoplist(%s, %s)", prevList?prevList.label:"null", newList?newList.label:"null");
			dijit.byId(this.crumb_id).popMorsel();
			var scrolling_box = dojo.byId(this.id + "_box");
			if(scrolling_box){
				scrolling_box.scrollTop = 0;
			}
		},
		
		//item in list clicked. Could be a leaf node or the top level node 
		_onlistclick: function(listtree)
		{
			console.log("Navigator._onlistclick()", listtree);
			var bCreatePopup = true;
			
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			if (product!=null && product.indexOf("srm")>=0){
				//Did we click on solution search
				if(listtree.type=='Solution' && this.rootList.subitems[this.solution_link_index] == listtree){
					dijit.byId("search-dialog").show();  //Show Search dialog
					
					//Make search type ahead results normal height
					if (this._default_dialog_height!=undefined) { 
					   dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px");
					   dojo.style(dijit.byId("search-dialog").domNode, "width", this._default_dialog_width + "px");
					}					   
					
                    //move it up so the search results fit on screen					
					//var w =  dojo.style(dijit.byId("search-dialog").domNode, "top");
					//dojo.style(dijit.byId("search-dialog").domNode, "top", "40px");
					
					//dijit.byId("search-dialog").resize();  
					
				}
				//Click on Favorites
				if(listtree.type=='Favorites' && this.rootList.subitems[this.favorites_link_index] == listtree){
					this._startWaiting();
					this._loadFrequentRequests();
					this._stopWaiting();
					if(this.rootList.subitems[this.favorites_link_index].subitems.length > 0){
						listtree.show();
						this._onpushlist(null, listtree);
					}else
						(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2353E"})).show();
							
				}	
				//Click on Issues 
				if(listtree.type=='Issues' && this.rootList.subitems[this.issues_link_index] == listtree){
					this._startWaiting();
					this._getDeskOfferings();
					this._stopWaiting();
					if(this.rootList.subitems[this.issues_link_index].subitems.length > 0){
						listtree.show();
						this._onpushlist(null, listtree);
					}							
				}
				//click on browse solutions link
				if(listtree.type=='BrowseSolution' && this.rootList.subitems[this.solution_browse_link_index] == listtree){  
					listtree._loaded = true;
					this._startWaiting();
					this._getSolutionsToBrowse();
					this._stopWaiting();
					if(this.rootList.subitems[this.solution_browse_link_index].subitems.length > 0){ //show solutions
						listtree.show();
						this._onpushlist(null, listtree);
					}							
				}
				
			}			
			
			//special case - folder under Browse solutions clicked - get solutions in folder
			if (listtree.getListType()=='BrowseSolution' && listtree._loaded == false && listtree.data.csid) {  
			//if (listtree.getListType()=='BrowseSolution' && listtree.data.Category == undefined && listtree.data.csid) {   
				listtree._loaded = true;
				var classid = listtree.data.csid;				
				listtree.data.Category = new Array();	
				var params = {_tree:listtree.data.Category};  //Pass tree so unclassified solutions will merged with solution classifications					   	
		        params.classstructureid=classid;   //classificationid of folder
		        params.sync=true;
		        params.selfservaccess="1";  //check for active and ssc solutions
		        var status="ACTIVE";				
				var solStatus_domain = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable('SOLUTIONSTATUS');
				status = solStatus_domain.valueByMaxvalue('ACTIVE');
				params.status=status;
		             
		        //get solutions in folder
		        deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutions(params);
		        if (deferred) {
				   deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
				      	this._pruneTree(response);							
						this._swizzleData(response.Category, null, "request_folder.png", "default_solution.png");
						//this._sortTreeScore(response);
						this._sortTree(response);
						listtree.addChildren(response, "RowMajor", 2);				        	
			        }));
				        
		            	
	            	listtree.show();
					this._onpushlist(null, listtree);	
	            }
	            return;						
			}
			
			
			if ("function" == typeof this.onSrmNavigatorClick) {
				bCreatePopup = this.onSrmNavigatorClick(listtree);
			}
			//Click on item (Offering, Solution, etc...) to display dialog
			if (bCreatePopup) {
				if ((listtree.data.Category && listtree.data.Category.length > 0) || listtree.data.ItemNum || (listtree.data.Solution && listtree.data.ID) || (listtree.data.Template && listtree.data.ID) ) {
					if (!listtree.data.Solution)
					   this._addModalWaitLayerHandler = dojo.connect(null,"addModalWaitLayer",this,"_checkDialogConnect");
					this.createAndShowInputForm(listtree.data, false);	// CreatorFactory mixin method
				} else if (listtree.type=='dialog'  || listtree.type=='application'  || listtree.type =='url') {
					this.createAndShowInputForm(listtree.data, false);	// CreatorFactory mixin method   
				 			
				} else if (listtree.type=='script' && listtree.target) {					
					console.log("Navigator._onlistclick(), launch script - " +  listtree.target);
					try {
						dojo._loadModule(listtree.target);
						var cls = dojo.getObject(listtree.target);
						var obj =  new cls( this.nav_node.id);
					    obj.run();
					} catch(ex) {							
						console.log("Navigator._onlistclick(), launch script failed - " + ex);
					}
				} else {
					console.log("Navigator._onlistclick(): click action avoided");
				}
			}			 		
		},
		
		//top level link clicked
		_onactivatelist: function(newList)
		{
			console.log("Navigator._onactivatelist(%s) [%d[%d]]", newList.label, this._activeListHistory.length, this._activeListIndex);
			
			if(!this._navInHistory) {
				// activating a list by clicking in the UI. 
				// truncate the history 
				this._activeListHistory.splice(++this._activeListIndex, this._activeListHistory.length);
				this._activeListHistory.push(newList);
			}
			this._setNavButtonState();
			this._navInHistory = false;
			
			//if catalog or issues link, setup tree or folder clicked			 
			if (this.rootList.subitems[this.catalog_link_index]==newList  || this.rootList.subitems[this.issues_link_index]==newList  || this.rootList.subitems[this.solution_browse_link_index]==newList) { 
				 
				dojo.style(dojo.byId(this.id+"_crumbs_treeview_nav"),"display", "block");   //show tree/folder icon 
				
				var root = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit") + "/";
				
				if (this._cat_treeview==true) { //using tree view
								  
					//show folder icon
					if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") 	
					     dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_folder_icon_RTL.png'; //icon = folder
					else
						 dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_folder_icon.png'; //icon = folder
					    	 
					dojo.byId(this.id+"_crumbs_treeview_nav").title = this._uiStringTable.FolderView;  
														
					//add tree contentpane back
					if (this._treeContentPane==null) {
					    this._treeContentPane = dijit.byId(this.id+'_borderContainerLeft');
					}  else					
					   dijit.byId(this.id+'_borderContainer').addChild(this._treeContentPane);
					
					//create and display tree
					this._setupFolderTree(newList);  //this builds the tree widget 
					
					newList.folderTree.collapseAllNodes();  //collapse all branches/nodes
					newList.folderTree._expandNode(newList.folderTree.rootNode);  //expand root node
					if (newList.folderTree._myLastNode) { //remove focus from node
	                        newList.folderTree._myLastNode.setSelected(false); 
	                }
					
					 dijit.byId(this.id+'_borderContainer').resize();
					
				} else { //using folder view				
					
					//show tree icon
					if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") 
					   dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_treeview_icon_RTL.png'; //icon = tree
					else 
					   dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_treeview_icon.png'; //icon = tree	
						
					dojo.byId(this.id+"_crumbs_treeview_nav").title = this._uiStringTable.TreeView;  
					
					//hide tree contentpane 					
					if (this._treeContentPane==null) {
					    this._treeContentPane = dijit.byId(this.id+'_borderContainerLeft');
					}					
					dijit.byId(this.id+'_borderContainer').removeChild(this._treeContentPane);			 
															 
				}
								 
			} else {
				//hide tree and tree/folder icon if not in request a new service, Open a Issue or Browse solutions link 
				if ((this._activeListHistory[1]!=this.rootList.subitems[this.catalog_link_index]  && this._activeListHistory[1]!=this.rootList.subitems[this.issues_link_index] && this._activeListHistory[1]!=this.rootList.subitems[this.solution_browse_link_index]) || 
						 (newList == newList.getTreeRoot())) { 
										
				   dojo.style(dojo.byId(this.id+"_crumbs_treeview_nav"),"display", "none");
				   
				   if (this._treeContentPane==null) { 
					    this._treeContentPane = dijit.byId(this.id+'_borderContainerLeft');
				   }		
				   
				   dijit.byId(this.id+'_borderContainer').removeChild(this._treeContentPane);	   
				   				   
				}
				
			}			
			
			console.log("-----> [%d[%d]]", this._activeListHistory.length, this._activeListIndex);
		},
		
		//construct the tree widget and place in DOM
		_setupFolderTree: function(newList) {			
			var currentlisttype= newList.getListType();			
			 					
			//where to place tree 
            var tgtid = this.id+'_borderContainerLeft';
            
            //Hide any existing  tree node
            dojo.forEach(dijit.byId(tgtid).getChildren(), function(x) {
            	dojo.style(x.domNode,"display", "none");
            });            	           
            			
			if (newList.folderTree==undefined) {  //Need to create tree?
				//Build folder tree in json format				
				var treeData = {};
				treeData.identifier = 'csid';
				treeData.label = 'desc';
				treeData.items = [];
				//build tree data structure
				this._buildFolderTree(treeData.items, newList.subitems);								
									   
                //Create Store
                var folderStore= new dojo.data.ItemFileReadStore({data: treeData});
                
                //Use different root label
                var rootlabel = this._uiStringTable.Folders;
                if (currentlisttype=="BrowseSolution") 
                	rootlabel = this._uiStringTable.SolutionFolders;
		            
                //create model
                var folderModel= new dijit.tree.ForestStoreModel({
                    store:folderStore, 
                    query:{"type":"root"},
                    rootId:"csid",
                    rootLabel:  rootlabel,
                    childrenAttrs:["children"]
                });             
                                            
		                
                //create tree
                var tree = new dijit.Tree({
                        model: folderModel,                        
                        _myLastNode:  null,
                        id:    this.id+currentlisttype+"_treeFolder",                        
                    	                        
                        collapseAllNodes: function() { //collapse all nodes in tree                           
                            var _tree = this;

                            function collapse(node) {                              
                                
                                if ( _tree.showRoot && node != _tree.rootNode ) {
                                   _tree._collapseNode(node);
                                }

                                var childBranches = dojo.filter(node.getChildren() || [], function(node) {
                                    return node.isExpandable;
                                });

                                var def = new dojo.Deferred();
                                defs = dojo.map(childBranches, collapse);
                            }
                            return collapse(_tree.rootNode);
                        },
                        
                        //Set default folder icon -  
                        getIconClass: function(/*dojo.store.Item*/ item, /*Boolean*/ opened){                        	
                            return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitSSCFolderOpened" : "dijitSSCFolderClosed") : "dijitSSCFolderLeaf"
                            //return null;
                        },
                        
                        /* set configurable folder icon in tree (configured in classstructure) */
                        /* Not supported in 7.5.1. Needs more testing. */
                        /*getIconStyle: dojo.hitch(this,function(item, opened){  //fpb
                            var id = -1;
                            if (folderStore.isItem(item)==true) { //if not root?
                               id = folderStore.getValue(item,"csid");  
                            }
                            console.log("getIconStyle:",folderStore.getLabel(item)+" "+ id); //display the label and id
                            if (id==-1)
                            	return;

                            var currentlist = this.rootList.getActiveList();  //this is the current folder in focus              
                            //Follow parent to get the type: Catalog, Issue or Solution 
                            var currentlisttype= currentlist.getListType();                                    
                
                            //Get target folder (ListTree object)
                            var targetFolder=null; 
                             if (currentlisttype=="Catalog") {                                 
                                targetFolder = this.rootList.subitems[this.catalog_link_index].Search(id, true);  //find Catalog folder to display
                             } else if (currentlisttype=="Issues") {                                 
                                targetFolder = this.rootList.subitems[this.issues_link_index].Search(id, true);  //find Issues folder to display
                             } else if (currentlisttype=="BrowseSolution") {                                 
                                targetFolder = this.rootList.subitems[this.solution_browse_link_index].Search(id, true);  //find Browse Solutions folder to display\
                             }

                            if (targetFolder && targetFolder.length>0) {
                              var newlist = targetFolder[0];  
                              var icon = newlist.icon;  //current icon
                              
                              //get imagename for Solution or Offering folder
                              if ((newlist.icon.indexOf("getonserver")>=0 &&  newlist.defaulticon==true)  || (newlist.subitems.length>0) && newlist.defaulticon==true && newlist.parentList!=null ) {
                            	   newlist.defaulticon = false;  //this means we retrieved folder icon from server.                            	   
                            	   var params = {};
                            	   var subitem_id =  newlist.data.ItemID;   //Offering or solution id
                                   if (subitem_id==undefined) {
                                	   subitem_id =  newlist.data.ID; 
                                   }
                            	   params.refobjectid=subitem_id;
                            	   params._exactmatch=0;                            	    
                            	   params.refobject = "ITEM,PMSCOFFERING,CLASSSTRUCTURE";
                            	   params._compact=1;
                            	   params.sync = true;				
                            	   params._includecols="refobjectid,imagename";

                            	   //Get imagename
                            	   var deferred  =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMbo("IMGLIB",params);
                            	   if (deferred) {
                            	      deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
                            	        if (response.IMGLIBMboSet.rsCount>0) {
                            	           var itemid =  response.IMGLIBMboSet.IMGLIB[0].REFOBJECTID;
                            	           var imagename = response.IMGLIBMboSet.IMGLIB[0].IMAGENAME;                           
                            	           if (imagename!=null) {  //Got an image and found the matching item
                            	               imagename = imagename.replace(/\+/g, "%2B");  //encode +
                            						
                            	               //we cache images and reuse itemid(refobjectid). This assumes that duplicate image names are the same image.
                            	               var dontCacheImageNames = ibm.tivoli.tpae.dojo.data.getConfigProperty("DontCacheImageNames");  //if DontCachImageNames = true, we don't reuse image name
                            	               if (dontCacheImageNames==null || dontCacheImageNames!='true' ) {                            	 
                            	                  if (!ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[imagename]) {  //cache image url data                            	
                            	                     ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[imagename] = {itemid: itemid};                            	
                            	                  } else {
                            	                     itemid =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[imagename].itemid;
                            	                  }   
                            	               }

                            	               //rest url to retrieve image                                        
                            	               newlist.icon = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().baseRestUrl +   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().rest_context_root + "/rest/mbo/imglib/" + "?REFOBJECTID=" + itemid + "&imagename=" + imagename + "&_compact=true";
                            				   icon = newlist.icon;                            				   
                            			   }
                            	        }  					         
                            	   }));
                            	 } //end if deferred
                              }                              
                              
                              //Set folder icon 
                              if (icon!=null && icon.indexOf("request_folder")==-1 &&  icon.indexOf("getonserver")==-1) {  //not default icon
                            	 if (dojo.isIE) {  
                            	    return {"backgroundImage": "url('" + icon + "')",
                            		     "backgroundSize": "16px",
                            		     "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + icon + "',sizingMethod='scale')"     //IE image size hack                       		     
                            	    };  
                            	 } else { 
                            		 return {"backgroundImage": "url('" + icon + "')",
                            		     "backgroundSize": "16px"                            		                            		     
                            	    };   
                            	 }
                              }
                            }                            
                        }),
                        */
                        
                        /*tree helper function to get the tree node for a id*/
                        getNodeFromItem: function (id) {  
                            return this._itemNodesMap[id];
                        },
                       
                        showRoot:true
                        
                        //id:"menuTree",
                        //openOnClick:"true"
                       		                       
                });  //end new tree
                
                //place tree in DOM
    			tree.placeAt(tgtid);
    			 
    			if (dojo.isIE) {
    			   	 dojo.style(tree.domNode, {display: "block",  fontSize: "0.75em",			 	                	 	                    		 	                    
    			                width: "auto",
    			                height: "100%"    			                
    			 	 	       	});  	        
    			                 	
                } else {
                	 dojo.style(tree.domNode, {display: "block",  fontSize: "0.75em",
                		         width: "auto",
                		         height: "100%",
                    	         borderRadius: "3px 3px 3px 3px",
    			 	 	         boxShadow: "0 5px 5px #CCCCCC"    			 	 	         			 	 	                     	   
    			 	 	        });	        	                	        	
                }              
                
    			newList.folderTree = tree;  //Store tree in list              
      
    			//----------------
    			// click on tree plus
    			//----------------    			
    			/*tree.on("NodeFocus",dojo.hitch(this, function(item,treeNode) {
    			    var id = -1;
  	                if (folderStore.isItem(item)==true)  //is root?
  	        	        id = folderStore.getValue(item,"csid");  
                    //console.log("open:",folderStore.getLabel(item)+" "+ id); //display the label and id                
                }));  //end tree.on		 
    			     
    			tree.on("open",dojo.hitch(this, function(item,treeNode) {
    			    var id = -1;
  	                if (folderStore.isItem(item)==true)  //is root?
  	        	        id = folderStore.getValue(item,"csid");  
                    //console.log("open:",folderStore.getLabel(item)+" "+ id); //display the label and id                
                }));  //end tree.on
                */		 
    			          
    			
    			//----------------------
                 // tree node click event
     			//---------------------
	            tree.on("click",dojo.hitch(this, function(item,treeNode) {  //also - open
	               var id = -1;
	               if (folderStore.isItem(item)==true)  //is root?
	        	      id = folderStore.getValue(item,"csid");  
                   console.log("tree.click:",folderStore.getLabel(item)+" "+ id); //display the label and id
                   
                   //For some reason, FF is not showing the last focused node. So this fixes it
                   //if (!dojo.isIE) {
                      if (treeNode.tree._myLastNode) {
                           treeNode.tree._myLastNode.setSelected(false); 
                      }
	                  treeNode.setSelected(true); 	                 
                   //}
                   treeNode.tree._myLastNode = treeNode;                
                
                   var currentlist = this.rootList.getActiveList();  //this is the current folder in focus              
                   //Follow parent to get the type: Catalog, Issue or Solution 
                   var currentlisttype= currentlist.getListType();
                   //If in search, use breadcrumb to get list type
                   if (currentlisttype==null || currentlisttype=="") {
                        var bc = dijit.byId(this.crumb_id).getChildren();
                        if (bc && bc.length>0)
                 	    currentlisttype = bc[1].data.type;
                   }                 
                   currentlist = this.rootList.getActiveList();  //set back to current list                
                                                    
                   var targetFolder=null; 
                   if (currentlisttype=="Catalog") {
                      if (id==-1) {
                   	     targetFolder =[]; targetFolder[0]= this.rootList.subitems[this.catalog_link_index];
                      } else  
                         targetFolder = this.rootList.subitems[this.catalog_link_index].Search(id, true);  //find Catalog folder to display
                   } else if (currentlisttype=="Issues") {
                      if (id==-1) {
                 	     targetFolder=[]; targetFolder[0] = this.rootList.subitems[this.issues_link_index];
                      } else
                	     targetFolder = this.rootList.subitems[this.issues_link_index].Search(id, true);  //find Issues folder to display
                   } else if (currentlisttype=="BrowseSolution") {  
                       if (id==-1) {
                  	      targetFolder=[]; targetFolder[0] = this.rootList.subitems[this.solution_browse_link_index];
                       } else {
                  	      targetFolder = this.rootList.subitems[this.solution_browse_link_index].Search(id, true);  //find Browse Solutions folder to display
                  	    
            			  if (targetFolder.length>0 && targetFolder[0]._loaded == false && targetFolder[0].data.csid) {  
            				  var newlist = targetFolder[0];   
            				  newlist._loaded = true;
            				  var classid = newlist.data.csid;				
            				  newlist.data.Category = new Array();	
            				  var params = {_tree:newlist.data.Category};  //Pass tree so unclassified solutions will merged with solution classifications					   	
            		          params.classstructureid=classid;  //check for active and ssc solutions?
            		          params.sync=true;
            		          params.selfservaccess="1";
            		          var status="ACTIVE";            				
            				  var solStatus_domain = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable('SOLUTIONSTATUS');
            				  status = solStatus_domain.valueByMaxvalue('ACTIVE');
            				  params.status=status;
            		   
            		          //Get solution in this folder
            		          deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutions(params);
            		          if (deferred) {
            				     deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
            				      	this._pruneTree(response);							
            						this._swizzleData(response.Category, null, "request_folder.png", "default_solution.png");
            						//this._sortTreeScore(response);
            						this._sortTree(response);
            						newlist.addChildren(response, "RowMajor", 2);				        	
            			         }));    				        
            		            	
            	            	 //targetFolder.show();
            					 //this._onpushlist(null, targetFolder);	
            	              }            	            					
            			  }           	    
                      }
                   }
                   
                   if (targetFolder && targetFolder.length>0) {
                    	var newlist = targetFolder[0];                    	
                    	if (newlist!=currentlist){
                    	   //newlist._onclick();
                    		if(newlist.subitems.length > 0) {
                    			//this.showSubList();
                    			newlist._stopCrossFade();		                    			
                    			newlist._setActiveList(newlist);
                    			newlist._crossFade(currentlist, newlist);
                    			newlist._onpushlist(currentlist, newlist);
                    		}
                    	}
                   } 
                }));  //end tree.on		               
			}			
			
			//make tree visible
			dojo.style(newList.folderTree.domNode,"display","block");
									  			
		},
		
		
		//Build tree of classifications
		_buildFolderTree: function(folderBranch,subitems)	{ 			
			if(subitems) {				 
			    dojo.forEach(subitems, dojo.hitch(this,function(item) {
			    	if (item.data.Category || item.data.Offering) {  //folder
					   var branch = {};
					   folderBranch.push(branch);
					   if (item.data.ClassStructureID)
						   branch.csid = item.data.ClassStructureID.toString(); 
					   else
					      branch.csid = item.data.ID.toString(); 
					   branch.desc = item.label.htmldecode();
					   branch.type="item";
					   
					   if (item.parentList.data.id && (item.parentList.data.id=="Catalog" || item.parentList.data.id=="Issues" || item.parentList.data.id=="BrowseSolution")) 
						   branch.type = 'root';					   
					   if (item.subitems.length>0) {
						   branch.children=[];
						  this._buildFolderTree(branch.children, item.subitems);
					   }
					   //remove empty children from tree
					   if(branch.children && branch.children.length==0) {
								delete branch.children;
					   }
			    	}  
					
				}));			     
			}
			
		},
		
		//tree or folder view icon clicked - switch view
		_treeview_nav_clicked: function(evt) {  
			this._cat_treeview= !this._cat_treeview;
			console.log("_treeview_nav, tree = " + this._cat_treeview);
			
			var root = dojo.moduleUrl("ibm.tivoli.simplesrm.srm.dijit") + "/";
			
			//get currentlist
			var newList = this.rootList.getActiveList();	

			//enable tree view	
			if (this._cat_treeview==true) {				
				
				if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl") 	
				   dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_folder_icon_RTL.png';  //icon = folder
				else 
				   dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_folder_icon.png'; 
					
				dojo.byId(this.id+"_crumbs_treeview_nav").title =  this._uiStringTable.FolderView;
							
				//add tree contentpane back 
				dijit.byId(this.id+'_borderContainer').addChild(this._treeContentPane); 
				
				//create tree
				if (newList.folderTree==null) {
				   this._setupFolderTree(this._activeListHistory[1]);  //Request a service or Open a Issue list
			    }
				dijit.byId(this.id+'_borderContainer').resize(); 
				
				//Todo - set focus on branch corrsponding to current list		   
			  				
			}  else {  //enable folder view
				//set tree icon
				if(dojo.attr(dojo.body(),"dir") && dojo.attr(dojo.body(),"dir")== "rtl")				   
				   dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_treeview_icon_RTL.png'; //icon = tree
				else					
				    dojo.byId(this.id+"_crumbs_treeview_nav").src = root + 'images/ssc_treeview_icon.png'; //icon = tree
				
				
				dojo.byId(this.id+"_crumbs_treeview_nav").title =  this._uiStringTable.TreeView;
				
				//hide tree contentpane
				dijit.byId(this.id+'_borderContainer').removeChild(this._treeContentPane);  
				 
			}
			
		},
		
		//Maximize/minimize Navigator
		_maximize_nav: function(evt) {		 
			this._maximized=!this._maximized;
			console.log("_maximize nav -" + this._maximized);
			
			if (this._maximized==true) {			  
			   //hide Pods
			   dijit.registry.forEach(function(w) {
				   if (w.dojoAttachPoint.indexOf("srmpod")>=0) {
					 dojo.style(w.domNode,"display","none");	   
				   }
				   
			   });   
			   			   
			   //increase width of navigator
			   dojo.style(this.nav_node,"width", "140%");
			   
			   //set title of image to Minimize			   
			   dojo.attr(this.id+ "_maximize_nav","title", this._uiStringTable.Minimize);

			  			   
			} else {  //minimized			   
			   //show Pods
			   dijit.registry.forEach(function(w) {
				   if (w.dojoAttachPoint.indexOf("srmpod")>=0) {
					 dojo.style(w.domNode,"display","block"); 	   
				   }				   
			   });
			   
				//decrease width of navigator	
			   dojo.style(this.nav_node,"width", "100%");
			   
				//set title to Maximize
			   dojo.attr(this.id+ "_maximize_nav","title", "Maximize");
			}
			 //resize BorderContainer
			   dijit.byId(this.id+'_borderContainer').resize();

		},		
        		
		
		// ************* breadcrumb event handlers **********
		_oncrumbclick: function(morsel)
		{
			console.log("breadcrumb click, morsel=", morsel.text);
							
			if(morsel.text == this._uiStringTable.Home){
				this._currentList = "home";
				//dojo.byId(this.id + "_list_search_btn").innerHTML = this._uiStringTable.Search;
			}	
			console.log("Navigator._oncrumbclick(%s)", morsel.text);
			morsel.trimRight();	// remove all morsels to the right of this one
			if(morsel.data) {
				// walk the history looking for this list, and truncate there
				for(var i = this._activeListHistory.length-1; i >= 0; --i) {
					if(morsel.data === this._activeListHistory[i]) {
						this._activeListHistory.splice(i, this._activeListHistory.length);
						this._activeListIndex = i-1;
						console.log("-----> [%d[%d]]", this._activeListHistory.length, this._activeListIndex);
						break;
					}
				}

				morsel.data.show();	// show the list cached in this morsel's .data
				
				//focus tree folder				
				var newList = morsel.data;
				var type = newList.getListType();  //list type
				var folderTree = dijit.byId(this.id+type+"_treeFolder");

				if (this._cat_treeview==true && type!=null && (type=='Catalog' || type=='Issues' || type=='BrowseSolution')) {				
					//expand tree and set focus to clicked folder in tree			 				
					if (folderTree && newList.ClassStructureID) {
				    	//folderTree.set('path', idarray );
				    	var item = folderTree.getNodeFromItem(newList.ClassStructureID.toString());
				    	if (item) {
				    	   var node = item[0];	
				    	   folderTree._expandNode(node, false);
				    	   if (folderTree._myLastNode) { //remove focus from previous tree node
		                        folderTree._myLastNode.setSelected(false);
				    	   }
		                   node.setSelected(true);
		                   folderTree._myLastNode = node;		                   				    	  
					       folderTree.focusNode(node);		    	   
					    }			    	 				    	  
					}		
					 
				}				
				
			}
		},

		_onUIComplete: function()
		{
			console.log("Navigator._onUIComplete");
			 
			if("function" == typeof this.onUIComplete) {
				try {
					this.OnUIComplete();
				}
				catch(ex) {
					ibm.tivoli.logger.error("",ex);
					console.error("onUIComplete event handler failed:\n", ex);
				}
			}
		},
		_currentList : "home",
		
		/*
		 *  Communicate with server to retreive search results
		 *  called to Search from header or Search link 
		 */	     
		_searchRemote: function(search_str, global) {
            console.log("Navigator._searchRemote");
            
			if(search_str.length == 0 ) {
				(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2356I"})).show();
			} else {
				this._startWaiting();
				 
				if (this.catalog_link_index!=-1 && this.rootList.getActiveList() === this.rootList.subitems[this.catalog_link_index])
					this._currentList = "request";
								
				var data_deferreds = [];  //list of deferred				 
				var deferredOfferings = null;
				var deferredSolutions = null;
				var deferredTemplates = null;
				var deferred = null;
				
                //Max amt of search results to show
				var MAX_RESULTS = ibm.tivoli.tpae.dojo.data.getConfigProperty("SrmNavigatorMaxResults");

                //default params
				var params = {_search:search_str,sync:false,_maxItems:MAX_RESULTS,_exactmatch:1};

                //Don't query solutions if link is disabled
                if((this._currentList == "help" || this._currentList == "home") && (this.solution_link_index != -1 || 
                     this.solution_browse_link_index != -1) ) {
					params["Cache-Control"] = "no-cache";
					
					//get solution
					deferredSolutions = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutions(params);
					deferred = deferredSolutions;
                    data_deferreds.push(deferredSolutions);                     
					params._orderbydesc = null;
					delete params["Cache-Control"];
				} 

            if (global) {  //if called from header search bar
               //get templates
               deferredTemplates = this._getTemplates(params);
               if (deferred==null)
            	   deferred = deferredTemplates;
               data_deferreds.push(deferredTemplates);
               params._orderbyasc = null;               

               //get offerings
               deferredOfferings = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestsCatalog(params);
               data_deferreds.push(deferredOfferings);
               
            }

            //process results when requests complete
			var deferredlist = new dojo.DeferredList(data_deferreds, false, true, false);  	
			           	                       
            //Called when all three requests complete
            deferredlist.addCallback(dojo.hitch(this,function(results){
                  console.log("Navigator._searchRemote - in Callback");
                  this._stopWaiting();
                  if (results[0]== undefined ||results[0][1]==undefined)   {  //No data
                     var messageId = deferred.ioArgs.xhr.getResponseHeader("errorCode");
                     if (response.status == 500) {
                        // if status is 500, display a message indicating that the search index info isn't available
                        (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2355I"})).show();

                        if(messageId!=null && messageId!="") {
                            (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: messageId})).show();
                        } else {
                           //Add create SR button to no data dialog
                           var wd = new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2339I", buttons:[this._uiStringTable.OK, this._uiStringTable.CreateSR]});
                           wd.show();						
                           var button = dojo.byId(wd.id + "mmd_button_1"); //create sr button
                           dojo.connect(button, 'onclick', this, '_createSR');
                        }
                     }
                  } else {
                     var count = 0;
                     var total = 0
                     var result1=null;
                     var result2 = null;
                     var result3 = null;
                     if (results[0] && results[0][1]) {
                         count = results[0][1].Category!=null?results[0][1].Category.length:0;
                         console.log("Navigator._searchRemote - results[0][1] count= "+ count);
                         if (count > MAX_RESULTS) {   //Only show first 500 (MAX_RESULTS) 
                              count = MAX_RESULTS;
                              results[0][1].Category.length=count;
                         }
                         total = count;
                         result1= results[0][1];
                         //if (count>0 && !result1.Category[0].Solution) {  //sort again if not Solutions
                         //   this._sortTree(result1);
                         //}
                     }
                     if (results[1] && results[1][1] && total<MAX_RESULTS) {
                         count = results[1][1].Category!=null?results[1][1].Category.length:0;
                         console.log("Navigator._searchRemote - results[1][1] count= "+ count);
                         if (total+count > MAX_RESULTS) {   //Only show first 500 (MAX_RESULTS) 
                              count = MAX_RESULTS-total;
                              results[1][1].Category.length=count;
                         }
                         total = total+count;
                         result2= results[1][1];
                         //if (count> 0  && !result2.Category[0].Solution) {  //sort again if not Solutions
                         //   this._sortTree(result2);
                         //}

                     }
                     if (results[2] &&  results[2][1] && total<MAX_RESULTS) {
                         count = results[2][1].Category!=null?results[2][1].Category.length:0;
                         console.log("Navigator._searchRemote - results[2][1] count= "+ count);
                         if (total+count > MAX_RESULTS) {
                              count = MAX_RESULTS- total;
                              results[2][1].Category.length=count;
                         }
                         total = total+count;
                         result3= results[2][1];
                         //if (count> 0  && !result3.Category[0].Solution) {  //sort again if not Solutions
                         //   this._sortTree(result3);
                         //}
                     }

                     if (total==0) {  //nothing returned
                        //Add create SR button
                        var wd = new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2339I", buttons:[this._uiStringTable.OK, this._uiStringTable.CreateSR]});
                        wd.show();						
                        var button = dojo.byId(wd.id + "mmd_button_1"); //create sr button
                        dojo.connect(button, 'onclick', this, '_createSR'); 
                     } else {
                        console.log("Navigator._searchRemote - merge results");
                        if (result1 && result2 ) {  //merge results
                           result1 = this._mergeResults(result1, result2);
                        }
                        if (result2 && result3 ) {
                           result1 = this._mergeResults(result1, result3);
                        }

                        this._searchLoadHandler(result1, null);  //prune and swizzle data
                        
				        var bPushBreadcrumb = this._searchResultsList !== this.rootList.getActiveList();

                        //hide tree contentpane
                        dijit.byId(this.id+'_borderContainer').removeChild(this._treeContentPane);
                        dojo.style(dojo.byId(this.id+"_crumbs_treeview_nav"), "display", "none");

						this._searchResultsList.show();  //display results
						if(bPushBreadcrumb){
						    this._onpushlist(null, this._searchResultsList);	// TODO: something's not quite right with ListTree or Navigator event handlin that I have to do this
						}
                     }
                  }
            }));

            //Called when there is an error 
            deferredlist.addErrback(dojo.hitch(this,function(response){  //Error handling. If search index is being updated for example.
               console.log("Navigator._searchRemote - in Errback, resp=: " +  response.responseText);
               this._stopWaiting();


               if (deferred && deferred.ioArgs.xhr && deferred.ioArgs.xhr.readyState==4 ) {  //check for errCode
                   var messageId = deferred.ioArgs.xhr.getResponseHeader("errorCode");
                   if (response.status == 500) {
                  	  // if status is 500, display a message indicating that the search index info isn't available
                       (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2355I"})).show();
                   } else {
	                   if(messageId!=null && messageId!="") {
                    	  (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: messageId})).show();
	                   }
                   }
                   return;
               }
               
               if (response.responseText==null) {
                  (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "Search failed"})).show();
                  return;
               }
               var startPoint = response.responseText.indexOf("ctjzh");
               var messageId = null;
               if (startPoint>=0) {
                   messageId = response.responseText.toUpperCase().substring(startPoint,(startPoint+10));
                   (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: messageId})).show();
               } else {
                  startPoint = response.responseText.indexOf("ctgrd6010e");
                  if (startPoint>=0) {  //error code ctgrd6010e is same as CTJZH2357I
                     (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2357I"})).show();
                  } else {
                	 //default - just use response text 
                     (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "Search", message: response.responseText})).show();
                  }
               }
            }));
         }
				
		},
					
				
		_mergeResults: function(deferredMerged, deferredForMerge) 	{
			if(deferredMerged!=null && deferredForMerge!=null) {
				var nextIndex = deferredMerged.Category.length;  
												
				var count = deferredForMerge.Category.length;
				
				for(i=0;i<count;i++)
				{
					var result = deferredForMerge.Category[i];
					if(result){
						deferredMerged.Category[nextIndex] = result ;
						nextIndex++;
					}	
				}
            } else if (deferredMerged==null && deferredForMerge!=null){
			 	deferredMerged = deferredForMerge;				
			}
			
			return deferredMerged;			
		},

		
		_searchLoadHandler: function(response, ioArgs)
		{
			console.log("Navigator._searchLoadHandler(): ", response, ioArgs);
			if(!response ||
				  !dojo.isArray(response.Category) ||
				  response.Category.length === 0) {
				dojo.removeClass(this._searchResultsList.domNode, "leaf");
				dojo.addClass(this._searchResultsList, "empty");
			}
			else {
				this._pruneTree(response);
				this._swizzleData(response.Category, null, "request_folder.png", null);
				this._sortTreeScore(response);  //sort all data by score
				this._searchResultsList.removeChildren();
				this._searchResultsList.addChildren(response, "RowMajor", 2);
			}
			return response;
		},
			 
		
		//call getTemplates to get non-SD ticket templates
		_loadTemplates: function(data_deferreds, params) {   
			if (params)
				params.issdtemplate= "~neq~1";   
			else
			   params = {issdtemplate:"~neq~1"};			
						
			var deferred = this._getTemplates(params);
			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_templatesLoadHandler"));
				//var data_deferreds = [];
				if (data_deferreds!=undefined) {
				   data_deferreds.push(deferred);
				}
			}

		},
		
		//Call getTemplates to get SD ticket templates
		_loadDeskTemplates: function(params)	{   
			if (params) {
				params.issdtemplate= "1";   
				params.sync=true;
			} else			   	
			    params = {issdtemplate:"1", sync:true}; 
			var deferred = this._getTemplates(params);
			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_issuesTemplatesLoadHandler"));
			
			}

		},
		
		//Get non-SD templates
		_getTemplates: function(params)
		{
			if(undefined == params) { params = {}; }			

			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getTemplates(params);
			return deferred;

		},
		
		//callback function to process non-SD ticket templates
		_templatesLoadHandler: function(response, ioArgs)
		{
			console.log("Navigator._templatesLoadHandler", response, ioArgs);
			if((this.catalog_link_index!=-1 && this.rootList.subitems[this.catalog_link_index].subitems.length == 0) && 
					(!response || !dojo.isArray(response.Category) || response.Category.length == 0)) {
				dojo.removeClass(this.rootList.subitems[this.catalog_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.catalog_link_index].domNode, "empty");
			}
			else if(this.catalog_link_index!=-1 && response && dojo.isArray(response.Category) && response.Category.length > 0) {
				dojo.removeClass(this.rootList.subitems[this.catalog_link_index].domNode, "empty");
				dojo.addClass(this.rootList.subitems[this.catalog_link_index].domNode, "branch");
				
				this._pruneTree(response);
				this._swizzleData(response.Category, null, "request_folder.png", "default_template.png");
				//if (com.ibm.ism.pmsc.dojo._SC_installed == false)  
				this._sortTree(response);
				this.rootList.subitems[this.catalog_link_index].keyField = "ID";    //TODO  What will this affect? 
				this.rootList.subitems[this.catalog_link_index].addChildren(response, "RowMajor", 2);  //ListTree
			}
					
			
			if (com.ibm.ism.pmsc.dojo._SC_installed == true && this.catalog_link_index)
				this._sortFolderSubitems(this.rootList.subitems[this.catalog_link_index].subitems);
			
			return response;
			
		},
		
		//callback function to process SD ticket templates
		_issuesTemplatesLoadHandler: function(response, ioArgs)
		{
			console.log("Navigator._templatesLoadHandler", response, ioArgs);
			if((this.issues_link_index!=-1 && this.rootList.subitems[this.issues_link_index].subitems.length == 0) && 
					(!response || !dojo.isArray(response.Category) || response.Category.length == 0)) {
				dojo.removeClass(this.rootList.subitems[this.issues_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.issues_link_index].domNode, "empty");
				
				var tip = "<span style='font-size:x-small;'>" + this._uiStringTable.CTJZH2361I + "</span>";			    
				new dijit.Tooltip({connectId: [this.rootList.subitems[this.issues_link_index].domNode],label: tip,  position:["above"]});	

			}
			else if(this.issues_link_index!=-1 && response && dojo.isArray(response.Category) && response.Category.length > 0) {
				dojo.removeClass(this.rootList.subitems[this.issues_link_index].domNode, "empty");
				dojo.addClass(this.rootList.subitems[this.issues_link_index].domNode, "branch");
				
				this._pruneTree(response);
				this._swizzleData(response.Category, null, "request_folder.png", "default_template.png");
				//if (com.ibm.ism.pmsc.dojo._SC_installed == false)
				this._sortTree(response);
				this.rootList.subitems[this.issues_link_index].keyField = "ID";
				this.rootList.subitems[this.issues_link_index].addChildren(response, "RowMajor", 2);
			}
					
			
			if (com.ibm.ism.pmsc.dojo._SC_installed == true && this.issues_link_index)
				this._sortFolderSubitems(this.rootList.subitems[this.issues_link_index].subitems);
			
			return response;
			
		},

		
		_startWaiting: function() {	        
			this._showProgressSpinner();
			this._setScreen("wait",true);
			  
			 /*this._standby = new dojox.widget.Standby({target: this.id});
			 document.body.appendChild(this._standby.domNode);
			 this._standby.startup();
			 this._standby.show();
			 */
		},
		_stopWaiting: function() {	       
	        //this._standby.hide();
			this._hideProgressSpinner();
			this._setScreen("default",false);
		},
		
		_setScreen: function(cursor,show){
			dojo.doc.body.style.cursor = cursor;
			try {
			   if(show)
				   dijit.byId("loading-dialog").show();
			   else
				   dijit.byId("loading-dialog").hide();
			} catch(ex) {  
				 //we're getting an exception  here - bgIframe does not exist
				 console.log("Navigator._setScreen :  -  " + ex);
				 //this.domNode.style.display = "none";
			}
		},
		_progressSpinner:null,
		_showProgressSpinner: function() 
		{
			try {
				if(!this._progressSpinner) {
					this._progressSpinner = new ibm.tivoli.simplesrm.srm.dijit.ProgressSpinner({text: this._uiStringTable.Loading + "&nbsp;"});
					var sz = dojo.coords(this.rootList.domNode);
					dojo.style(this._progressSpinner.domNode, {
						height: "1em",
						width: "100%",
						zIndex: "10",
						position: "absolute",
						top: sz.y + "px",
						left: "0px",
						display: "block",
						textAlign: "center"
					});
					dojo.place(this._progressSpinner.domNode, this.domNode, "first");
				}	
				
				this._progressSpinner.show();
			}
			catch(ex) {
				console.error("Failed rendering search progress spinner: ", ex);
				if(this._progressSpinner) {
					this._progressSpinner.destroyRecursive();
					this._progressSpinner = null;
				}
				window.status = "Retrieving...";
			}
		},
		_hideProgressSpinner: function() {
			console.log("Search.hideProgressSpinner");
			if(this._progressSpinner){
				this._progressSpinner.hide();
			}
			else{
				window.status = "Done.";
			}
		},
		
		_default_dialog_height: null,
		_default_dialog_width: null,

		/* 
		 * Click or key pressed in Search for SOlutions dialog
		 * 
		 */
		_helpFixSumit: function(evt)
		{		
			console.log("_helpFixSumit, key = "+ evt.type);
			
		    if (this._default_dialog_height==null) {
		       var search_d = dijit.byId("search-dialog");	
          	   this._default_dialog_height =  dojo.marginBox( search_d.domNode).h;
          	   this._default_dialog_width =  dojo.marginBox( search_d.domNode).w;
            }					    
          
			if(evt.type == 'click' || (evt.type == 'keypress' && evt.keyCode == dojo.keys.ENTER && evt.target == this.dialog_search_term)) {  //enter key
				if (dojo.byId(this.id + "_dialog_search_top_div")) {  //remove search drop down  
	                dojo.destroy(dojo.byId(this.id + "_dialog_search_top_div"));
	            }				
				
				var search_str = dojo.byId(this.id + '_dialog_search_term').value;
				
				if(dojo.trim(search_str).length == 0 ) {  //No search data entered
			        (new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2356I"})).show();
			        return;
				}									
				
				this._currentList = "help";
				var global=false;
				this._searchRemote(search_str, global);
				dijit.byId("search-dialog").hide();
				//dojo.byId(this.id + "_list_search_btn").innerHTML = this._uiStringTable.SearchAdjust;
				dojo.byId(this.list_id + '_search_term').value = search_str;
				
			} else  if (evt.type =='keyup' ) {     //typeahead
				var search_str = dojo.byId(this.id + '_dialog_search_term').value;
				
				if (evt.keyCode == dojo.keys.BACKSPACE)  {//ignore backspace
					if (search_str.length<=0) {  //Backspace and empty string 
					   dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px"); //make normal height & width
					   dojo.style(dijit.byId("search-dialog").domNode, "width", this._default_dialog_width + "px"); 
					   //dojo.style(dijit.byId("search-dialog").domNode, "top", "40px");					   	
					}
					return;
				}
				
				if (dojo.byId(this.id + "_dialog_search_top_div")) {  //remove search drop down  
	                dojo.destroy(dojo.byId(this.id + "_dialog_search_top_div"));
	            }			
								
	            //console.log("_helpFixSumit search str =  " + search_str);
	            if (search_str!="" && search_str.length>=3) {  //must enter at least 3 chars
	            	
	                //Issue rest api to get top 10 search results
	            	//Do we need to search based on Description and LD only?  
	            	var params = {_search:search_str,sync:false,_maxItems:10,_exactmatch:1};
	            	params["Cache-Control"] = "no-cache";
				    var  solutions = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutions(params);
				    solutions.addCallback(dojo.hitch(this, function(results) {
				    	 var count = (solutions && solutions.results[0] && solutions.results[0].Category!=null)?solutions.results[0].Category.length:0;
						    if (count==0) {
						    	dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px"); //make normal height & width
						    	dojo.style(dijit.byId("search-dialog").domNode, "width", this._default_dialog_width + "px");
						    	//dojo.style(dijit.byId("search-dialog").domNode, "top", "40px"); 
						    	return;
						    }
						    
						    //Sort solutions
						    this._sortTreeScore(solutions.results[0]);
			            
			                //display seasch results in table         
			                var top_div = document.createElement("div");  //top div
			                
			                dojo.style(top_div, {width: "auto"}); 
			                top_div.id=this.id + "_dialog_search_top_div";   
			                top_div.className="typeahead-results";             
			                
			                var hide_div = document.createElement("div");
			                hide_div.innerHTML = "These are the top 10 search results.  Use down and up arrow keys to navigate through the results.";
			                dojo.style(hide_div, {display: "none"});
			                top_div.appendChild(hide_div);

			                var ul = document.createElement("ul");
			                ul.className= "appstore-typeahead-results";
			                //ul.type="none";
			                dojo.style(ul, {display: "block"});
			                top_div.appendChild(ul);
			                
			                //Build list of search results
			                for (var i=0;i<count;i++) {
			                	var solution = solutions.results[0].Category[i];
			                    var li = document.createElement("li");
			                    li.className = "result small-result";
			                    li.id = this.id+ "_dialog_search_listitem"+i;
			                    li.name = solution.ID;
			                    ul.appendChild(li);
			                    
			                    if (solution.ImageName) {	                    
			                      var image =  document.createElement("img");
			                      solution.ImageName = solution.ImageName.replace(/\+/g, "%2B");  //encode +

			                      var itemid = solution.ID;			                      
			                 	  
			                 	 //image cache. This assumes that duplicate image names are the same image. If not we're in trouble!					 
			                 	 var dontCacheImageNames = ibm.tivoli.tpae.dojo.data.getConfigProperty("DontCacheImageNames");  //if DontCachImageNames = true, we don't reuse image name
			                 	 if (dontCacheImageNames==null || dontCacheImageNames!='true' ) {			                 	  
			                        if (!ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[solution.ImageName]) {  //cache image url                             	
	                            	   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[solution.ImageName] = {itemid: itemid};                            	
                                    } else { 
	                               	   itemid =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._image_cache[solution.ImageName].itemid;  //use cached image url
	                                }
			                 	 }
			                      			                      
			                     image.src =  
			                         ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().baseRestUrl +  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().rest_context_root + "/rest/mbo/imglib/" + "?REFOBJECTID=" + itemid + "&imagename=" + solution.ImageName + "&_compact=true"; 
			                      image.alt=solution.Description;
			                      dojo.style(image,{width: 32 + "px"});
			                      li.appendChild(image);
			                   }

			                    var div = document.createElement("div");
			                    li.appendChild(div);

			                    var span = document.createElement("span");
			                    span.className="name";
			                    
			                	//TODOs - include ranking/score, LD in tooltip or below description
			                    var data = solution.Description;	                  
			                    span.innerHTML= data;
			                    div.appendChild(span);
			                  
			                    data = solution.LongDescription;
			                    if (data!=null) {
			                       var ld_div = document.createElement("div");
			                       ld_div.className="description";
			                       span.appendChild(ld_div);    
			                       data =  ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().truncate(data);
			                       ld_div.innerHTML = data; //todo trunc
			                    }
			                    
			                }
			              
			                //place in DOM	              
			                var search_d = dijit.byId("search-dialog");	               
			                //var w =  dojo.marginBox( search_d.domNode).w;
			                var top = dojo.marginBox(search_d.domNode).t; 
			                
			                //dojo.style(search_d.domNode, "top", "40px");  
			               	                
			                dojo.place(top_div,  dojo.byId(this.id + "_dialog_search_holder"), "after");
			                	               
			                var h = dojo.marginBox(this.id + "_dialog_search_top_div").h;
			                	             
			                //adjust height and width of search dialog to include search results	               
			                h = h + this._default_dialog_height + 1;
			                var w = this._default_dialog_width+5;
			                
			                dojo.style( search_d.domNode, "height", h + "px");
			                dojo.style( search_d.domNode, "width", w + "px");
			                
			                //IE seems to resize if height changed so we need to reset it 
			                //if (dojo.isIE) {
			                //dojo.style(search_d.domNode, "top", "40px");  
			                //	                	                	                
			                //search_d.resize();  

			                //click events
			                for (var i=0;i<count;i++) {
			                   var itemid = this.id+"_dialog_search_listitem"+i;
			                   var item = dojo.byId(itemid);                 
			                                 	                   
			                   //When entry in table clicked, display Solution dialog
			                   dojo.connect(item, "onclick",  dojo.hitch(this,function(evt) {
			                       console.log("Solution clicked - " + evt.currentTarget.name);
			                       
			                       //Clear table of search results
			                       //dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px");
			                       
			                       //fix zindex so view tpae dialogs are not behind dojo search-dialog	                      
			                       //dojo.style(dijit.byId("search-dialog").domNode, "zIndex", "10000");
			                       //dojo.style(dojo.byId("search-dialog_underlay").parentNode, "zIndex", "9999");
			                       
			                       if (dojo.byId("dialogholder")) {	                    	   
			                          dojo.style(dojo.byId("dialogholder"), "zIndex", "100001");
			                       }

			                       //Hide Search dialog and underlay because of IE zindex bug 
			                       //dojo.style(dojo.byId("search-dialog_underlay").parentNode, "display", "none"); 
			                       //dojo.style(dijit.byId("search-dialog").domNode, "display", "none");

			                       //set eventhander when View Solution dialog is dismissed so we can make Search dialog visible again (IE zindex bug)
			                       //Launch View Solution dialog
		  	                       //this._addSearchSolutionModalWaitLayerHandler = dojo.connect(null,"removeModalWaitLayer",this,"_checkSearchSolutionDialogConnect");
			                       
			                       var node = dojo.byId(this.id);	                       
			                       sendEvent("viewsolution", node.id,  evt.currentTarget.name);                  
			                   	                   
			                   }));
			                   
			                   dojo.connect(item, "onmouseover", function(evt) {
			                       dojo.addClass(evt.currentTarget, "selected");
		   	                       //console.dir(evt);
			                   });
			                   dojo.connect(item, "onmouseout", function(evt) {
			                       dojo.removeClass(evt.currentTarget, "selected");
			                       //console.dir(evt);
			                   });
			              }    	
				    					    	
				    }));
				    				    
				   
	           } else {  //less than 3 chars entered
					 dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px"); //make normal height & width
					 dojo.style(dijit.byId("search-dialog").domNode, "width", this._default_dialog_width + "px"); 
					 //dojo.style(dijit.byId("search-dialog").domNode, "top", "40px"); 
			   }
	             
			} 
			return;
			
		},
      				
		_helpFixClose: function(evt) {			
			if(evt.type == 'click' || (evt.type == 'keypress' && evt.keyCode == dojo.keys.ENTER && evt.target == this.dialog_search_term)) {
				if (this._default_dialog_height!=undefined) {
				   dojo.style(dijit.byId("search-dialog").domNode, "height", this._default_dialog_height + "px"); //make normal height & width
				   dojo.style(dijit.byId("search-dialog").domNode, "width", this._default_dialog_width + "px");
				   //dojo.style(dijit.byId("search-dialog").domNode, "top", "40px");
				}
				dijit.byId("search-dialog").hide();
				dojo.byId(this.id + '_dialog_search_term').value = "";
			}
			//if (dojo.byId(this.id + "_dialog_search_top_div")) {
            //    dojo.destroy(dojo.byId(this.id + "_dialog_search_top_div"));
            //}	   
			
		},		 
		
       _addModalWaitLayerHandler:null,		
		//Dialog display Handler for clicks on offering dialog, create SR, shopping cart icon
		//in 7.5 dialogid is not pass, instead it is DOM id "mx3426_inner_dialogwait"
		_checkDialogConnect : function(dialogId){
			if(dialogId.indexOf("DialogCR")>=0 || dialogId.indexOf("srmsscreatesr")>=0  || dialogId.indexOf("_dialogwait")>=0)				
				this._loadFrequentRequestsHandler = dojo.connect(null,"removeModalWaitLayer",this,"_loadFrequentRequests");
			
			//Dialog dismiss event to refresh shopping cart							 
			this._shoppingCartDialogID = dojo.connect(null,"removeModalWaitLayer",this,"_shoppingCartDialogHandler");
				
			dojo.disconnect(this._addModalWaitLayerHandler);
		},
			
  	    /*_addSearchSolutionModalWaitLayerHandler:null,			
		//called when View Solution dialog is dismissed. Make Search dialog visible
  	    //TODO - need to check if Create SR button was selected and skip making visible if so 
       _checkSearchSolutionDialogConnect : function(dialogId){
	    	   console.log("in _checkSearchSolutionDialogConnect");
	    	   
	    	   if(modalWaitLayers.length<=0) { 
	    	       dojo.style(dijit.byId("search-dialog").domNode, "display", "block");  //Make Search dialog visible again   	   
            	   dojo.disconnect(this._addSearchSolutionModalWaitLayerHandler);
	    	   }
		},
		*/		
		
		_loadFrequentRequestsHandler:null,
		//Handler for dialog dismissal  
		_loadFrequentRequests: function (){

			if(modalWaitLayers.length>0)
				return;

			dojo.disconnect(this._loadFrequentRequestsHandler);
			
			dojo.publish("refreshpod");		
		 
			this.rootList.subitems[this.favorites_link_index].removeChildren();
			this._loadFavorites();
			this._loadSystemWideRequests();
			this._loadMyRequests();
			if(this.rootList.subitems[this.favorites_link_index] == this.rootList.getActiveList())
				this.rootList.subitems[this.favorites_link_index].show();
			
			if(this.rootList.subitems[this.favorites_link_index] == this.rootList.getActiveList().parentList){
				this.rootList.subitems[this.favorites_link_index].show();
				this._onpoplist(this.rootList.getActiveList(),this.rootList.subitems[this.favorites_link_index].show());
			}	

			return;
		},
		
		_shoppingCartDialogID:null,		
		//Call function to refresh shopping cart
		_shoppingCartDialogHandler: function () {
			if(modalWaitLayers.length>0)
				return;

			dojo.disconnect(this._shoppingCartDialogID);
			
			this.shoppingCartTooltip();  //refresh shopping cart tooltip	
			 
			return;
		},
		
				
		_loadFavorites: function (){
            //filtering domains  filter out inactive templates and offerings 		
			var params = {sync:true, _fd:'SRM_FAVITEM'};			
			 			
			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getFavItem(params);
			
			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_frequentsLoadHandler"));
			}
			params = {sync:true,  _fd:'SRM_FAVTKTEMPLATE'};
			 
			deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getFavTemplates(params);
			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_frequentsLoadHandler"));
			}	
			
		},
		
		_SystemWideFolderLabel:null,
		_MyFrequentFolderLabel:null,
		
		_getSystemWideFolderLabel: function(){
			var folder = this._SystemWideFolderLabel==null ? this._uiStringTable.SystemWideFrequentRequest : this._SystemWideFolderLabel; 
			return folder;		
		},
		
		_getMyFrequentFolderLabel: function(){
			var folder = this._MyFrequentFolderLabel==null ? this._uiStringTable.MyFrequentRequests : this._MyFrequentFolderLabel; 
			return folder;		
		},
				
		_loadSystemWideRequests: function (){
			var deferred = null;
			var params = [];
			params.sync = true;
			params.frequentrequest = 1;
			params._folder = this._getSystemWideFolderLabel();			
			 			
			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestsCatalog(params);
			
			if(deferred && deferred.results && deferred.results.length > 0 && deferred.results[0].Category)
				params._tree = deferred.results[0].Category;
			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getTemplates(params);
			
			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_frequentsLoadHandler"));
			}
			
		},
		
		_loadMyRequests: function (){
			var deferred = null;
			var params = [];
			params.sync = true;
			params._userOffer = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getLoggedInUser().PERSONID; 
			params._folder = this._getMyFrequentFolderLabel();			
			 			
			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestsCatalog(params);
			
			params._userOffer = null;
			params._userQuick = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getLoggedInUser().PERSONID;
			if(deferred && deferred.results && deferred.results.length > 0 && deferred.results[0].Category)
				params._tree = deferred.results[0].Category;
			var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getTemplates(params);

			if(deferred) {
				deferred.addCallback(dojo.hitch(this, "_frequentsLoadHandler"));
			}
			
		},		
		
		_frequentsLoadHandler: function(response, ioArgs)
		{
			if(!response || !dojo.isArray(response.Category) ) {
				dojo.removeClass(this.rootList.subitems[this.favorites_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.favorites_link_index].domNode, "empty");	
			}
			else {

				this._pruneTree(response);
				this._swizzleData(response.Category, null, "request_folder.png", "default_template.png");
				this._sortTree(response);
		
				this.rootList.subitems[this.favorites_link_index].addChildren(response, "RowMajor", 2);
				
			}
			return response;

		},
		
		_sortLabel: function (items){
			items.sort(function(a, b)
			{
				if(a.label.toLowerCase() < b.label.toLowerCase()) {return -1;}
				if(a.label.toLowerCase() > b.label.toLowerCase()) {return 1;}
				return 0;
			});
		},
		
		_sortFolderSubitems: function(items)
		{
			if(items.length>0) {
				this._sortLabel(items);

				var withoutFolder = new Array();
				var withFolder = new Array();
				for(var i in items) {
					if(items[i].subitems.length==0){
						withoutFolder.push(items[i]);
					}else{
						this._sortLabel(items[i].subitems);
						withFolder.push(items[i]);
					}	
				}
				
				// Remove itens  
				while(items.length){
					items.pop();
				}
				
				// Add in the end itens with folder
				for(var i in withFolder) {
					items.push(withFolder[i]);
				}
				
				// Add in the end itens without folder
				for(var i in withoutFolder) {
					items.push(withoutFolder[i]);
				}
				
			}
		},
		
		//Get non-desk Offerings 
		_getRequestsCatalog: function(params,data_deferreds){		  
		   params.navofftype="0";
		   params._maxItems=this._maxRestItems; //default=500  
		   //params._orderbyasc="itemid";		   
		   		   
		   var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestsCatalog(params);
		   if(deferred) {
		      deferred.addCallback(dojo.hitch(this, "_offeringsLoadHandler"));
		      if (data_deferreds)
		         data_deferreds.push(deferred);
		   }
		},
		
		//Get desk Offerings 
		_getDeskOfferings: function(params){
			
			if(undefined == params) { params = {}; }
				
            if (this._offering_fd!=null && this.offering_fd.length>0) {  //Add filtering domain passed in as parm
	              params._fd = this.offering_fd;
	       }
		   params.navofftype="1";
		   params._maxItems=this._maxRestItems; //default=500  	
		   params.sync=true; 
		   params._usembo=true;  //get Mbos instead of OS 
		   		   
		   var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getRequestsCatalog(params);
		   if(deferred) {
		      deferred.addCallback(dojo.hitch(this, "_deskOfferingsLoadHandler"));
		   }
		},

		//Browse solutions link clicked - get folders and solutions with no classification
		_getSolutionsToBrowse: function(params){  
			console.log("Navigator._getSolutionsToBrowse");
			if(undefined == params) { params = {}; }
				
            //if (this._solution_fd!=null && this.solution_fd.length>0) {  //Add filtering domain passed in as parm
	        //      params._fd = this.solution_fd;
	        //}		  
		   //params._maxItems=this._maxRestItems; //default=500
			
		   params.sync=true;
		    		   	
		   //Get solution classstructures
		   //UPS has 700 top level classifications.  Will that be a problem?
		   var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutionsClassStructures(params);		   
		  
		   if(deferred) {		      
			   deferred.addCallback(dojo.hitch(this, function(response, ioArgs) {
 				    //Get solution with no classification
					params = {_tree:response.Category};  //Pass tree so unclassified solutions will merged with solution classifications					   	
		            params.classstructureid='~NULL~'; 
		            params.sync=true;
		            params.selfservaccess="1";  //check for active and ssc solutions
		            var status="ACTIVE";
					var solStatus_domain = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable('SOLUTIONSTATUS');
					status = solStatus_domain.valueByMaxvalue('ACTIVE');
					params.status=status;
		             
		            //What if >500?
		            deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getSolutions(params);
		            if (deferred) {
				      deferred.addCallback(dojo.hitch(this, "_browseSolutionsLoadHandler"));
		            }			   
			   }));
		   }
		},

		
		//_listResponseRequest:[],
		
		//Process non Desk Offerings
		_offeringsLoadHandler: function(response, ioArgs)
		{
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			var countOffering=0; 
			if(!response ||
				  !dojo.isArray(response.Category) ||
				  response.Category.length === 0) {
				dojo.removeClass(this.rootList.subitems[this.catalog_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.catalog_link_index].domNode, "empty");
				
				var tip = "<span style='font-size:x-small;'>" + this._uiStringTable.CTJZH2361I + "</span>";  //No data tooltip			    
				new dijit.Tooltip({connectId: [this.rootList.subitems[this.catalog_link_index].domNode],label: tip, position:["above"]});	
				
			} else {								
				if (response.count)    //get count of how many we received. We stuffed it in the response 
					countOffering = response.count;
				else
				    countOffering = this._getCountOffering(response.Category);	
						
				if(countOffering==this._maxRestItems){ //Did we receive 500?
					//this._listResponseRequest.push(response);
					
		            this._SCOfferingsStartIndex = this._SCOfferingsStartIndex+this._maxRestItems;  //index for next set
		            var params = {_rsStart:this._SCOfferingsStartIndex,sync:true,_usembo:true};  //get next 500
					
					//var lastId=0;  
					//if (response.lastItemID && response.lastItemID!=-1) {
					//	lastId = response.lastItemID;
					//} else {	
					//    var lastCategory = response.Category[response.Category.length-1];
					//    var lastOffer = lastCategory.Offering[lastCategory.Offering.length-1];
					//    lastId = lastOffer.ItemID;
					//}
					//var params = {itemid:"~gt~" + lastId,sync:true};
										 
					this._getRequestsCatalog(params);
					
				}  else  {  //Got less than 500, we're done receiving
					//clear srmQuery tree   
					ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._offTree = null;
					
					//load quick inserts					  
					var params = {_tree:response.Category};        //add tree as parm so templates will be merged with offerings       
					this._loadTemplates(null, params);		 			
												
					//Dataa added to ListTree after templates received
					//if (this._listResponseRequest.length>0)   
					//	this._restoreResponses(response);	
					//this._pruneTree(response);
					//this._swizzleData(response.Category, null, "request_folder.png", "default_request.png");
					
					//this._sortTree(response);
					//this.rootList.subitems[this.catalog_link_index].addChildren(response, "RowMajor", 2);
				}	
			}
			
			return response;
			
		},
		
		//Process non Desk Offerings
		_deskOfferingsLoadHandler: function(response, ioArgs)
		{
			var product = ibm.tivoli.tpae.dojo.data.getConfigProperty("Product");
			var countOffering=0; 
			if(!response ||
				  !dojo.isArray(response.Category) ||
				  response.Category.length === 0) {        //No desk offerings
				//dojo.removeClass(this.rootList.subitems[this.issues_link_index].domNode, "leaf");
				//dojo.addClass(this.rootList.subitems[this.issues_link_index].domNode, "empty");
				ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._offTree = null;							 
				this._loadDeskTemplates(params);   	
				
			} else {								
				if (response.count)    //get count of how many we received. We stuffed it in the response 
					countOffering = response.count;
				else
				    countOffering = this._getCountOffering(response.Category);	
						
				if(countOffering==this._maxRestItems){ //Did we receive 500?
					//this._listResponseRequest.push(response);
					
		            this._SDOfferingsStartIndex = this._SDOfferingsStartIndex+this._maxRestItems;  //index for next set
		            var params = {_rsStart:this._SDOfferingsStartIndex,sync:true,_usembo:true};  //get next 500
										 
					this._getDeskOfferings(params);
					
				}  else  {  //Got less than 500, we're done receiving
					//clear srmQuery tree   
					ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._offTree = null;
					
					var params = {_tree:response.Category};  //Pass tree so templates will merged with Offerings  
					this._loadDeskTemplates(params);   	
					
					//Added to ListTree when templates received
					//if (this._listResponseRequest.length>0)
					//	this._restoreResponses(response);	
					//this._pruneTree(response);
					//this._swizzleData(response.Category, null, "request_folder.png", "default_request.png");
					
					//this._sortTree(response);
					//this.rootList.subitems[this.issues_link_index].addChildren(response, "RowMajor", 2);
				}	
			}			
			 
			return response;				
			
		},
		
		//Browse solutions REST response handler
		_browseSolutionsLoadHandler: function(response, ioArgs)  { 
			console.log("Navigator._browseSolutionsLoadHandler", response, ioArgs);			
						
			if((this.solution_browse_link_index!=-1 && this.rootList.subitems[this.solution_browse_link_index].subitems.length == 0) &&  //No solutions 
					(!response || !dojo.isArray(response.Category) || response.Category.length == 0)) {
				dojo.removeClass(this.rootList.subitems[this.solution_browse_link_index].domNode, "leaf");
				dojo.addClass(this.rootList.subitems[this.solution_browse_link_index].domNode, "empty");		
				(new ibm.tivoli.simplesrm.srm.dijit.MessageDialog({type:"Info", messageId: "CTJZH2363I"})).show();
				 
			} else if(this.solution_browse_link_index!=-1 && response && dojo.isArray(response.Category) && response.Category.length > 0) {
				dojo.removeClass(this.rootList.subitems[this.solution_browse_link_index].domNode, "empty");
				dojo.addClass(this.rootList.subitems[this.solution_browse_link_index].domNode, "branch");
				
				//this._pruneTree(response);
				this._swizzleData(response.Category, null, "request_folder.png", "default_solution.png");				 
				this._sortTree(response);
				this.rootList.subitems[this.solution_browse_link_index].keyField = "ID";
				this.rootList.subitems[this.solution_browse_link_index].addChildren(response, "RowMajor", 2);
			}					
			
			if (com.ibm.ism.pmsc.dojo._SC_installed == true && this.solution_browse_link_index)
				this._sortFolderSubitems(this.rootList.subitems[this.solution_browse_link_index].subitems);											
			 
			return response;			
		},
		
		_getCountOffering: function(categories){
			var count=0;
			for(var category in categories){				
                if (categories[category].Offering)			
                	count = count + categories[category].Offering.length;
                if (categories[category].Category)
                	count = count + this._getCountOffering(categories[category].Category);
			}	
			return count;
		},
				 
		
		//Handle async response from server
		//Hide unauthorized apps and urls from top links
		_sendasync_resp: function(response) { 
			var auth = response.auth;		
			var type = response.type; //app or lic
			var target = response.target;
			console.log("Navigator._sendasync_resp:" + type + "-" + target + "-"+auth);
			if (auth==false) {
			   dojo.forEach(this.rootList.subitems, function(item) {	
				   if(item.type && item.type=="application" && type=='app' && item.target==target) {					 
					 dojo.style(item.domNode, "display", "none");					 
				   } else if (item.type && item.type=="url" && type=='lic' && item.target==target) {					 
					 dojo.style(item.domNode, "display", "none");
				   }				   
			   });			
				
			}		
		},
		
		//Process server async call to get sigoptions. Hide links and icons based on configuration		 
		// hide links based ifn sigoption not granted. If sigoptions not there, just sjow links
		_getAppOptions_resp: function(response) {
			console.log("Navigator._getAppOptions_resp:" + response);
			var sigoptions= null;
			if (response.options) {
			   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery()._sigoptions =  response.options;	
			   sigoptions = response.options;		
			} else
				console.log("Navigator._getAppOptions_resp - no sigoptions, show icons and links");
			
			//Hide create SR icon 
			// -if control property = true (this.hidecreatesricon which is passed as input parm)		
			// -if hidecreatesricon=true in config.properties
			// -if SHOWSSCCREATESRICON sigoption is not on
			var hidecreatesr_prop = ibm.tivoli.tpae.dojo.data.getConfigProperty("hidecreatesricon");  //config.properties
			if (hidecreatesr_prop!=null && hidecreatesr_prop=='true') {
				this.hidecreatesricon=true;					 
    		}		
			if (sigoptions!=null && dojo.indexOf(sigoptions, "SHOWSSCCREATESRICON")<0) {  //sigoption
				this.hidecreatesricon=true;			     				
			}					
			
			if (this.hidecreatesricon==true) { 
				var createsr_icon = dijit.byId(this.id + "_createSR_btn");
				dojo.style(createsr_icon.domNode, "display", "none");
				
				var createSR_label = dojo.byId(this.id + '_createSR_label');				 
				if (createSR_label)
				   createSR_label.innerHTML="";
			} else {
				  //connect onclick to function
			      this.connect(this.createSR_btn, 'onClick', '_createSR');
			      
			      //tooltip
			      var tip = "<span style='font-size:x-small;'>" + this._uiStringTable.createSRToolTip + "</span>";	
				  new dijit.Tooltip({connectId: [this.id + "_createSR_btn"],label:  tip, position:"above"});
			}   
			
			
			//Hide create template icon
			// - if control property = true (this.hidetemplateicon is passed as input parm)
			// - if hidecarttemplateicon=true in config.properties
			// - if SHOWSSCTEMPLATEICON sigoption is not on
			//hide cart template icon if hidecarttemplate=true in config.properties
			var hidecarttemplate_prop = ibm.tivoli.tpae.dojo.data.getConfigProperty("hidecarttemplateicon");  //config.properties
			if (hidecarttemplate_prop!=null && hidecarttemplate_prop=='true') {
			   this.hidetemplateicon=true;					 
			}				
			
			if (sigoptions!=null && dojo.indexOf(sigoptions, "SHOWSSCTEMPLATEICON")<0) {  //sigoption
				this.hidetemplateicon=true;			     				
			}
			
			if (com.ibm.ism.pmsc.dojo._SC_installed == false) {  //MAXVARS- SC not installed
				this.hidetemplateicon=true;	
			}			
			
			if (this.hidetemplateicon==true) { //navigator widget parm (control property)
				var template_icon = dijit.byId(this.id + "_template_btn");
				dojo.style(template_icon.domNode, "display", "none");
			} else {			 
			    this.connect(this.template_btn, 'onClick', '_template');
			    
			    //tooltip
				var	tip = "<span style='font-size:x-small;'>" + this._uiStringTable.templateToolTip + "</span>";	
				new dijit.Tooltip({connectId: [this.id + "_template_btn"],label:  tip, position:"above"});					
			}
			
			
			//Hide shopping cart icon 
			// -if hidecarticon=true in config properties
			// -if hidecarticon=true passed into the navigator control 
			// -if SC not installed (MAXVARS)
			// -if sigoption SHOWSSCCARTICON		
			var hidecart_prop = ibm.tivoli.tpae.dojo.data.getConfigProperty("hidecarticon");  //config.properties
			if (hidecart_prop!=null && hidecart_prop=='true') {				 
				this.hidecarticon=true;					 
			}					            
				
			if (com.ibm.ism.pmsc.dojo._SC_installed == false) {  //MAXVARS				 
			    this.hidecarticon=true;										 
			}
			
			if (sigoptions!=null && dojo.indexOf(sigoptions, "SHOWSSCCARTICON")<0) {  //sigoption
				this.hidecarticon=true;			     				
			}
			
			//Hide cart icon if Catalog disabled  
			//if (this.catalog_link_index==-1)  {
			//	this.hidecarticon=true;			
			//}				
			
			if (this.hidecarticon==true) { //navigator widget parm (control property)
				var shopping_cart_icon = dijit.byId(this.id + "_shoppingCart_btn");
				var shopping_cart_label = dojo.byId(this.id + '_cart_label');
				dojo.style(shopping_cart_icon.domNode, "display", "none");
				if (shopping_cart_label)
				   shopping_cart_label.innerHTML="";
				
				var shopping_cart_amt = dojo.byId(this.id + '_cart_amount'); 
				if (shopping_cart_amt)
				   shopping_cart_amt.innerHTML = " ";
			}			

			//Hide link if sigoption corresponding to link was not granted to the srmssctr app for the security group
			//For example: link id = Solution, sigoption SHOWSSCSOLUTION, grant SHOWSSCSOLUION Option to srmssctr app for security group PMSCADM			
		   dojo.forEach(this.rootList.subitems, dojo.hitch(this,function(link) {
			   if (sigoptions!=null &&  dojo.indexOf(sigoptions, "SHOWSSC" + link.data.id.toUpperCase())<0) {  //sigoption
					 dojo.style(link.domNode, "display", "none");  //hide link	
				}				   
		   }));
		   
		   //Hide new Home icon based on sigoption TSRM_SHOWSTARTCENTER (Show Start Center link in page header) not selected
		   //This is a hack becuase TPAe should be doing this
			if (sigoptions!=null && dojo.indexOf(sigoptions, "TSRM_SHOWSTARTCENTER")<0) {  //sigoption				
				var node = dojo.query(".homebutton")[0];
				if (node!=null) {
					dojo.style(node, "display", "none");  //hide home link
				}
			}
			 //Hide new goto menu  icon based on sigoption TSRM_SHOWSTARTCENTER (Show Start Center link in page header) not selected
			   //This is a hack becuase TPAe should be doing this
			if (sigoptions!=null && dojo.indexOf(sigoptions, "TSRM_SHOWGOTO")<0) {  //sigoption				
				var node = dojo.query(".gotobutton")[0];
				if (node!=null && node.id.indexOf("_gotoButton")>0) {
					dojo.style(node, "display", "none");  //hide goto menu link
				}
			}	  
		   
		},
		
		_sortTreeScore: function(tree)
		{
			if(undefined !== tree.Category) {
				tree.Category.sort(function(a, b)
				{
					if(a.Score && b.Score && (a.Score < b.Score)) {
						return 1;
					}
					if(a.Score && b.Score && (a.Score > b.Score)) {
						return -1;
					}
					return 0;
				});
			}
		}	
		 		
	}
);



});

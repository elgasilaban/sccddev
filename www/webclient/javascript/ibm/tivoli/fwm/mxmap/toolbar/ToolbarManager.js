/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit.Toolbar");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator");
/**
 * Controls the toolbar actions
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ToolbarManager",
		 [ ibm.tivoli.fwm.mxmap._Base], {
			gisdata: null,
			mxdata: null,
			map: null,			
			items:[],
			_defaultItems: [],
			toolbarItems:null,
			toolbarDivElement: null,
			// TODO: Use the actual toolbar height instead of this hardcoded number
			_toolbarHeight: 35,
			
			/**
			 * Subscribes to the server updates to the current record
			 */
			constructor: function(options)
			{
				dojo.mixin(this, options);
				this.toolbarItems = [];
				this._defaultItems = ['RefresherTool','FullScreen'];
				// ['FullScreen','RefresherTool','MyLocationTool','ItineraryTool','QueryUnassignedWorkTool','QueryNearResources', 'LayersTool'];
				//if(this.map.isMobile == true){
					//this._defaultItems.push('MobileInfoPanel');
				//}
			},
			postCreate: function(){
				this.addSubscription(dojo.subscribe("onCurrentRecordUpdate_"+this.map.getId(),
						dojo.hitch(this, this.serverUpdated)));
			},
			container:null,
			toolbar:null,
			startup:function(){		
				var borderBottomStyle = dojo.isIE ? '1px solid #AAA' : '0px solid #AAA';
				this.container = dojo.create("div", {
							id: this.map.divId + "_toolbar",
							style: {
								width: this.map.getWidthInPixels(),
								whiteSpace: 'normal',
								'background-color': '#FFFFFF',
								'border':'1px solid #AAA',
								'border-bottom-color':'black','display':'block',
								'borderBottom' : borderBottomStyle
							}
						}, dojo.byId(this.map.divId), 'before');
				var div = dojo.create("div", {
							style: {
								width: this.map.getWidthInPixels()
							}							
						}, this.container);
				/* 12-10553 - toolbar must have height set in the style */
				this.toolbar = new dijit.Toolbar(/* Object? */ {style: {width: '100%', 'border':'0','background-position-y':'4%'}, splitter: "true"}, /* DomNode|String */div);				
				
				var me = this;
				
				var mapid = this.map.getId();				
				var createItemButton = function(item){
					if(item == "sep"){
						var d = new ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator();
						me.toolbar.addChild(d);
						
					}else{
						var dijitName ="ibm.tivoli.fwm.mxmap.toolbar.ext."+item;
	
						var reqStr = "dojo." + "require('" + dijitName+ "')"; // breaking up dojo. and require necessary to fool the dojo parser!						
						try{
							eval(reqStr);
						}catch (e) {
								console.error("cannot load tool",e);
								return;
						}
						
						this.map=me.map;// breaking up dojo. and require necessary to fool the dojo parser!
						
						var itemDijitStr = "this.itemDojo = new ibm.tivoli.fwm.mxmap.toolbar.ext."+item+"({map:this.map})";// breaking up dojo. and require necessary to fool the dojo parser!
						dojo.eval(itemDijitStr);
						var itemDojo=this.itemDojo;// breaking up dojo. and require necessary to fool the dojo parser!
						
						var button = itemDojo.createToolbarButton();						
						var clickListener = function(){						
							if(me.lastItemClicked){
			            		me.lastItemClicked.disable();
			            	}
			            	dojo.publish("mxnToolbarClicked_"+mapid,[item]);
			            	me.lastItemClicked=itemDojo;
						};
						me.addSubscription(dojo.connect(button,"onClick",me,clickListener));
	
				        me.toolbar.addChild(button);
				        me.toolbarItems.push(itemDojo);
					}					
				};
				if(this.items==null || this.items.length==0){					
					console.log("Default toolbar items",this._defaultItems);
					dojo.forEach(this._defaultItems, createItemButton);
				}else{
					console.log("Toolbar items",this.items);
					dojo.forEach(this.items, createItemButton);
				}
				// toolbar div is necessary for the full screen feature
				this.toolbarDivElement = this.container;				
			},
			lastItemClicked:null,
			serverUpdated: function()
			{
				this.mxdata = data.mxdata;
				this.gisdata = data.gisdata;
			},
			destroyRecursive: function(){
				this.inherited(arguments);
				dojo.forEach(this.toolbarItems, function(item){										
					item.destroy();					
				});
				this.toolbar.destroy();
				dojo.empty(this.container);
			},
			getToolbarDivElement: function(){				
				return this.toolbarDivElement;
			},
			updateToolbarWidth: function(newWidth)
			{
				dojo.style(this.toolbarDivElement, {width: newWidth});
			},
			getToolbarHeight: function()
			{
				return this._toolbarHeight;
			}
		});
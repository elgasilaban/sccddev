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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.RadioButton");
dojo.require("ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Leg");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Step");
/**
 * Controls the route step by step information and dialog
 * 
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.ItineraryManager", [ dijit._Widget, dijit._Templated, ibm.tivoli.fwm.mxmap._Base ], {
	templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/ItineraryManager.html"),
	infoPanel: null,
	map: null,
	legs: [],
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},
	highway: null,
	toll: null,
	km: null,
	miles: null,
	postCreate: function()
	{
		// Dojo's checkboxes don't work well on Android, so we use native ones instead
		var isAndroid = navigator.userAgent.indexOf("Android") > -1;
		var checkboxBuilder = (isAndroid 
				? function(params, container)
					{
						return new ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput("checkbox", params, container);
					}
				: function(params, container)
					{
						return new dijit.form.CheckBox(params, container);
					});
		var radioBuilder = (isAndroid 
				? function(params, container)
					{
						return new ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput("radio", params, container);
					}
				: function(params, container)
					{
						return new dijit.form.RadioButton(params, container);
					});

		this.highway = checkboxBuilder({
			name: "highway",
			value: "highway",
			checked: false,
			onChange: dojo.hitch(this, this.onHighWayChanged),
			label: this.itineraryavoidhighways // only used by the mobile version
		}, this.ahNode);
		//this.itineraryavoidhighwaysdiv
		this.toll = checkboxBuilder({
			name: "toll",
			value: "toll",
			checked: false,
			onChange: dojo.hitch(this, this.onTollChanged),
			label: this.itineraryavoidtolls // only used by the mobile version
		}, this.atNode);
		var defaultLengthUnit = this.map.getDefaultLengthUnit();

		this.km = radioBuilder({
			checked: (defaultLengthUnit == "KILOMETERS"),
			value: "km",
			name: "unit",
			onChange: dojo.hitch(this, this.onUnitChanged),
			label: this.itinerarykm // only used by the mobile version
		}, this.kmNode);
		this.miles = radioBuilder({
			checked: (defaultLengthUnit == "MILES"),
			value: "mi",
			name: "unit",
			onChange: dojo.hitch(this, this.onUnitChanged),
			label: this.itinerarymiles // only used by the mobile version
		}, this.miNode);

		// Translate the texts in the dialog
		this.itineraryavoidhighways.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itineraryavoidhw");
		this.itineraryavoidtolls.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itineraryavoidtolls");
		this.itinerarykm.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarykm");
		this.itinerarymiles.innerHTML = ibm.tivoli.fwm.i18n.getMaxMsg("map", "itinerarymiles");
		this.addressLoading = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_being_loaded");
		this.failedToLoadAddress = ibm.tivoli.fwm.i18n.getMaxMsg("map", "address_info_not_found");

	},
	_highClick:function(){
		var state = !this.highway.get('value');
		this.highway.set("checked",state);
	},
	_tollsClick:function(){
		var state = !this.toll.get('value');
		this.toll.set("checked",state);
	},
	_kmClick:function(){
		this.km.set("checked",true);
	},
	_milesClick:function(){
		this.miles.set("checked",true);
	},
	onUnitChanged: function(enabled)
	{
		/*
		 * because it's a radio button and there are only 2 options if one
		 * changes the other changes too (to true and to false) so we jsut
		 * trigger on the enablement
		 */
		if (enabled == true)
		{
			this.onRouteControlsChanged(false);
		}
	},
	onTollChanged: function()
	{
		this.onRouteControlsChanged(true);
	},
	onHighWayChanged: function(arg)
	{
		this.onRouteControlsChanged(true);
	},	
	enableControls:function(enable){
		this.miles.setDisabled(!enable);
		this.km.setDisabled(!enable);
		this.highway.setDisabled(!enable);
		this.toll.setDisabled(!enable);
	},
	onRouteControlsChanged: function(needsToReRoute)
	{
		this.enableControls(false);
		var custom = this.getControls();
		var conf = this.route.inputInfo;
		var me = this;
		if (!this.infoPanel)
		{
			console.info("info panel", this.infoPanel);
			this._getInfoPanel();
		}
		
		var fct = function(route)
		{
			var routeId = me.route.id;
			if (needsToReRoute == true)
			{
				me.routeManager.replaceRoute(route, routeId);
				route.show();
			}
			me.updateRouteItinerary(route.itinerary, me.routeManager, route);
			
			me.enableControls(true);
		};
		var errFct = function(error){
			me.enableControls(true);
			conf.errorCb(error);
		};
		
		if (needsToReRoute == true)
		{
	
			dojo.empty(this.routeInfo);
			dojo.create("img", {
				src: dojo.config.fwm.ctxRoot + "/webclient/skins/tivoli09/images/progressbar.gif"
			}, this.routeInfo);
			this.routeManager.reGenerate(this.route, custom, fct, errFct);
		}
		else
		{
			this.route.originalRouter.customConf = custom;
			fct(this.route);
		}
	},
	getControls: function()
	{
		var state = {};
		if (this.highway.get('value') != false)
		{
			state.avoidHighway = true;
		}
		else
		{
			state.avoidHighway = false;
		}
		if (this.toll.get('value') != false)
		{
			state.avoidToll = true;
		}
		else
		{
			state.avoidToll = false;
		}
		var km = this.km.get("value") != false;
		var miles = this.miles.get("value") != false;
		if (km == true)
		{
			state.distanceUnit = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.KM;
		}
		else
		{
			state.distanceUnit = ibm.tivoli.fwm.mxmap.routing.DistanceUnit.MILES;
		}
		return state;
	},
	routeManager: null,
	route: null,
	_createLegFromInitialLocation: function(initialLocation)
	{
		var leg = initialLocation;
		leg.marker = this.route.getMarkerForStop(0);
		leg.map = this.map;
		leg.distanceUnit = this.getControls().distanceUnit;
		var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Leg(leg);
		return legWidget;

		dojo.place(legWidget.domNode, this.routeInfo, 'first');
	},
	updateRouteItinerary: function(itinerary, routeManager, route)
	{
		this.routeManager = routeManager;
		this.route = route;
		if (this.route == null)
		{
			this.enableControls(false);
			return;
		}
		this.enableControls(true);
		if (this.route.avoidTollsSupported == false && this.route.avoidHighwaysSupported == false)
		{
			console.log("not visible");
			dojo.style(this.avoidersNode, "display", "none");
		}
		else
		{
			dojo.style(this.avoidersNode, "display", "block");
		}
		this.legs = [];
		var initialLocation = itinerary.getInitialLocation();
		var fct = function()
		{
			this.infoPanel.close();
		};
		if (initialLocation)
		{
			initialLocation.marker = this.route.getMarkerForStop(0);
			initialLocation.closeDialog = dojo.hitch(this, fct);

			var legWidget = this._createLegFromInitialLocation(initialLocation);
			dojo.place(legWidget.domNode, this.startLocation, 'only');

		}
		// to force an empty list

		dojo.empty(this.routeInfo);

		for ( var i = 0; i < itinerary.legs.length; i++)
		{
			var leg = itinerary.legs[i];
			leg.marker = this.route.getMarkerForStop(i + 1);
			leg.map = this.map;
			leg.distanceUnit = this.getControls().distanceUnit;
			leg.closeDialog = dojo.hitch(this, fct);
			var legWidget = new ibm.tivoli.fwm.mxmap.routing.itinerary.Leg(leg);

			dojo.place(legWidget.domNode, this.routeInfo, 'last');
			this.legs.push(legWidget);
		}

	},
	_onInitialLocClick: function(args)
	{
		var _loc = this.route.itinerary.getInitialLocation().location;
		this.map.getMapstraction().setCenter(_loc);
	},
	isIt: false,
	showPanel: function()
	{
		if (this.isIt == false)
		{
			this.isIt = true;
			this._getInfoPanel();
			this.infoPanel.setContent(this.domNode);
		}
		if(this.route==null){
			this.enableControls(false);
		}else{
			this.enableControls(true);
		}
		this.infoPanel.show();
	},
	_getInfoPanel: function()
	{
		if (this.infoPanel)
		{
			this.infoPanel.close();
			this.infoPanel = null;
		}
		this.infoPanel = new ibm.tivoli.fwm.mxmap.panels.MobileInfoPanelDialog({
			map: this.map,
			fitHeight: true
		});
		// sets the height of the content to provide right scroll. removes 40 to
		// better display it
		/*
		 * var height = this.infoPanel.getCalculatedHeight() - 40; if (height <=
		 * 0) { height = 10; }
		 * 
		 * dojo.style(this.domNode, { "height": height + "px" });
		 */
		return this.infoPanel;
	}

});

dojo.declare("ibm.tivoli.fwm.mxmap.routing.itinerary.MobileInput", [ ], {
	_checkbox: null,
	constructor: function(type, args, container)
	{
		container.innerHTML += '<input type="' + type + '" name="' + args.name + '" value="' + args.value + '"/>';
		var checkbox = container.childNodes[0];
		checkbox.checked = args.checked;
		var onchange = args.onChange;
		checkbox.onchange = function(evt) {
			onchange(evt.target.checked);
		};

		args.label.onclick = function() { checkbox.click(); };

		this._checkbox = checkbox;
	},
	get: function(name)
	{
		if (name == "value")
		{
			return this._checkbox.checked;
		}
	},
	set: function(name, value)
	{
		// Do nothing, as this is being called in the onclick by dojo after the state has already changed
	},
	setDisabled: function(state)
	{
		this._checkbox.disabled = state;
	}
});
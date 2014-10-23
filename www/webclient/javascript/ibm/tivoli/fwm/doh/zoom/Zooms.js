dojo.provide("ibm.tivoli.fwm.doh.zoom.Zooms");
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.doh._MapTests');
dojo.require("ibm.tivoli.fwm.doh.ConfigHelper");

dojo.declare("ibm.tivoli.fwm.doh.zoom.Zooms", [ ibm.tivoli.fwm.doh._MapTests ], {
	name: null,

	constructor: function(params)
	{
		dojo.mixin(this, params);

		this.name = "No mbo in ds and no previous extent";
	},
	mainRecord: null,

	timeout: 60000,
	handlerAdded: false,
	runMapTest: function(nativeMap, mapId, map)
	{
		try
		{
			var mapstraction = map.getMapstraction();
			console.log("is map updating?", mapstraction.state.updating)
			var fct = function()
			{
				this.runMapTest(nativeMap, mapId, map);
			}
			if (mapstraction.state.updating == true)
			{
				if (this.handlerAdded == false)
				{
					mapstraction.endPan.addHandler(fct, this);
					mapstraction.changeZoom.addHandler(fct, this);
					this.handlerAdded = true;
				}
			}
			else
			{
				this._validate(mapstraction);
			}

		}
		catch (e)
		{
			this.deferredObj.errback(e);
		}
	},

	_validate: function(map)
	{
		var actualExtent = map.getCenter();
		actualExtent.level = map.getZoom();

		ibm.tivoli.fwm.doh.gisdoh.assertLocation(this.confHelper.getDefaultLocation(), actualExtent);
		this.deferredObj.callback(true);
	},
	prepareConfData: function()
	{
		this.confHelper.conf.mapConf.initialLocation = this.confHelper.getDefaultLocation();
	}
});

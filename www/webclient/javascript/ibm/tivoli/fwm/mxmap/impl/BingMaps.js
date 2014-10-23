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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.BingMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.declare("ibm.tivoli.fwm.mxmap.impl.BingMaps", ibm.tivoli.fwm.mxmap.Map, {

	constructor: function(options)
	{
		this.providerName = "microsoftv7";
	},
	/**
	 * These options will refine maps UI. See their descriptions at:
	 * http://msdn.microsoft.com/en-us/library/gg427603.aspx
	 */
	_getInitOptions: function()
	{
		var options = {};
		
		options.fixedMapPosition = false;
		options.useInertia = true;
		options.showScalebar = true;
		options.disableTouchInput = false;// allows user to touch screen.
		options.enableClickableLogo = false;
		options.enableSearchLogo = false;
		options.showCopyright = true;
		options.mapTypeId = Microsoft.Maps.MapTypeId.road;
		/* FWM opts */
		options.isIE = dojo.isIE;
		
		if (this.isMobile == true)
		{
			// 12-12979 Commenting out the line below because this option was making
			// the repositioning of maptips fail when resizing the mapcontrol div
			// options.fixedMapPosition = true;
			options.showScalebar = false;
		}
		
		options.initialLocation=this._getInitialLocation();
		
		
		return options;

	},
	_getCustomInitOptions: function()
	{
		if (this.customInitialMapOptions)
		{
			return this.customInitialMapOptions.bingmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	destroyMap: function()
	{
		console.log("Destroying map!");
		try
		{
			var map = this.getMapstraction();

			if (typeof (map) != 'undefined' && map != null)
			{
				map.destroyMap();
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log("map was destroyed!");
			}
		}
		catch (e)
		{
			console.error("cannot destroy bing maps ", e.message);
		}

	}

});
dojo.provide("ibm.tivoli.fwm.doh.driver.mapCtrl");

	// definition of Map Providers
	dojo.declare("mapProvider", null, {
							GOOGLE: "gmaps", // GOOGLE MAP PROVIDER
							BINGMAPS: "bingmaps", //BING MAP PROVIDER
							SPATIAL: "spatial"
								}
				);

	// definition of FSM Actions
	dojo.declare("fsmAction", null, {
							NOACTION: "NoAction", // NoAction
							SHOWMBOLOCATION: "ShowMBOLocation", //ShowMBOLocation
								}
				);

	// definition of Map Control attributes
	dojo.declare("mapCtrl", null, {
							compId: null, 
							divId: null, 
							width: null, 
							height: null,
							geocoder: null, //
							currentRecordControl: {
													gisdata: { // ShowMBOLocation
													lat: null, // ShowMBOLocation
													lng: null, // ShowMBOLocation
													address: null // ShowMBOLocation
																	// geocode
													},
													mxdata: null, // 
													map : null //
												},
							mapConf: {
									gisdata: {
											lat: null, // ShowMBOLocation
											lng: null, // ShowMBOLocation
											address: null // ShowMBOLocation
															// geocode
											}, //
									mxdata: null, // 
									action: null, //  ShowMBOLocation, NoAction
									initialLocation: { 
													point : {
															lat: null, 
															lng: null
															}, //
													lat: null, 
													lng: null, 
													level: null
													},
									key: null, 
									https: null, 
									provider: null // provider name { gmaps,
													// bingmaps, spatial}
									 },
							testCtxRoot: null, // Test Context Root
							constructor: function(args){
								/*the constructor*/
								dojo.safeMixin(this, args);
							},
							getMapConf: function(){
								/*get mapConf */
								return this.mapConf;
							},
							setInitialLocation: function( mapLat, mapLng, mapLevel){
								/*set mapConf InitialLocation*/
								this.mapConf.initialLocation.lat = mapLat;
								this.mapConf.initialLocation.lng = mapLng;
								this.mapConf.initialLocation.level = mapLevel;
							},
							setInitialLocation: function( ){
								/*set mapConf InitialLocation*/
								var latY = dojo.byId("latY").value, 
								longX = dojo.byId("longX").value,
								zoomLevel = dojo.byId("zoomLevel").value;

								if(latY)
								this.mapConf.initialLocation.lat = parseFloat(latY) ;
 
								if(longX)
								this.mapConf.initialLocation.lng = parseFloat(longX);
								
								if(zoomLevel)
								this.mapConf.initialLocation.level = parseInt(zoomLevel);
								
							},
							setWidthHeight: function( newWidth, newHeight){
								/*set width and height*/
								this.width = newWidth;
								this.heigh = newHeight;
							},
							setWidthHeight: function( ){
								/*set width and height from form*/
								var mapWidth = dojo.byId("mapWidth").value, 
								mapHeight = dojo.byId("mapHeight").value ;
								
								if(mapWidth)
								this.width = mapWidth ;
								
								if(mapHeight)
								this.height = mapHeight ;
							},
							setKey: function(licenseKey ){
								/*set license key from form*/


								this.mapConf.key = licenseKey ;

							},
							setKey: function( ){
								/*set license key from form*/
								var licenseKey = dojo.byId("licenseKey").value ;

								this.mapConf.key = licenseKey ;

							},
							setAction: function( mapAction ){
								/*set MapControl Action*/
								switch (mapAction) {
									case "ShowMBOLocation":
										this.mapConf.action = "ShowMBOLocation"
										break;

								case "NoAction":
									this.mapConf.action = "NoAction" ;
								default:
									console.error("unknown initial action", mapAction);
									break;
								}
							},
							setTestCtxRoot: function( ){
								/*set Test Context Root*/
								if(dojo.byId("testContextPath").value)
								this.testCtxRoot = dojo.byId("testContextPath").value ;
							},
							setTestCtxRoot: function( newTestCtxRoot ){
								/*set Test Context Root*/
								if(newTestCtxRoot)
								this.testCtxRoot = newTestCtxRoot ;
							},
							setMapProvider: function( provider ){
								/*set map Provider. set default to google map provider if invalid map provider*/
								var mapProviders = new   mapProvider();
								switch (provider) {
									case mapProviders.GOOGLE:
										this.mapConf.provider = mapProviders.GOOGLE;
										break;
									case mapProviders.BINGMAPS:
										this.mapConf.provider = mapProviders.BINGMAPS;
										break;
									default:
										this.mapConf.provider = mapProviders.GOOGLE;
										break;
								}

							},
							setHttps: function(onOff){
								/* Set HTTPS  on//off*/
								if(onOff)
									this.mapConf.https = true;
								else
									this.mapConf.https = false;
							}
				});
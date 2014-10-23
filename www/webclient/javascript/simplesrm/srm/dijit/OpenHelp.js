//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.OpenHelp");

/**
 * groups methods/queries responsible for providing help 
 */

dojo.declare(
		"ibm.tivoli.simplesrm.srm.dijit.OpenHelp",
		null,
{		
				
		/**retrieves url to help topic that maps to given helpKey
		after successful retrieval callback "action(url)" is launched
		@param {String} helpKey	or {Array} containing more params  
		@param {Callback} action
		@see ibm.tivoli.simplesrm.srm.dijit.MessageDialog
		@type {void}	
		*/	
		_help:function(helpKey , action){			
			console.log("_help called");
			var params={};
			if(dojo.isString(helpKey)){
				dojo.mixin(params,{helpKey: helpKey});
			}
			else if (dojo.isArray(helpKey)){
				//assume that array contains valid parameters
				dojo.forEach(helpKey, function(x){
					dojo.mixin(params,x);
				});
			}
			var helpUrl;
			var deferred = dojo.xhrGet({
				url: "/help/index.jsp?topic=/com.ibm.mbs.doc/startcntr/c_start_center_overview.html",
            //url: "/maximohelp/en/mergedProjects/startcntr/startcntr.htm",
				content: params,
				handleAs: "text",
				load: function(response){					
					if(response){
						helpUrl = response;
					}
					else{
						console.log("invalid result");
						return new Error();
					}
				},
				error: function(error){
					console.log("xhrGet failed: " + error.message);					
				}
			}
			);	
					
			deferred.addCallback(function(){								
				action(helpUrl);						
			});
			deferred.addErrback(this._errorRetrievingUrl);
								
		},
		
		/**
		 * callback: sets href attribute of given link to the
		 * infocenter home page
		 * @param {DOMNode} link  
		 * @type {void}
		 */
		addInfocenterUrl: function(link){
			var action = function(link,url){
				dojo.attr(link , "href" , url);
			};
			this._help("PMRDP_UI_Help.htm",dojo.hitch(null, action, link));
		},	
		/**
		 * callback: opens new window
		 * @param {String} helpKey or {Array}
		 * @type {void}
		 */
		openHelpWindow: function(helpKey){
			var action = function(url){
				window.open(url);
			};
			this._help(helpKey , action);
		},

		/**
		 * extension point. error callback. 
		 * default action: do nothing
		 * @type {void}
		 */ 
		_errorRetrievingUrl: function(){				
			//default == no action	
			console.log("error retrieving help url");
		}
		
		});
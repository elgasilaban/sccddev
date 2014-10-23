//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dojo/Logger", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.Logger");
dojo.provide("ibm.tivoli.simplesrm.srm.dojo.LogLevel");



/**
 * creates elements in enum ibm.tivoli.simplesrm.srm.dojo.LogLevels
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dojo.LogLevel",null, {
	constructor: function(params){
		if (!params || !dojo.isString(params.name) || isNaN(params.rank) || !dojo.isString(params.serverName)){
			throw new TypeError("invalid properties passed");
		}
		this.name = params.name;
		this.rank = params.rank;
		this.serverName = params.serverName;
	}
});


/**
 * generally log levels are the same as in FireBug(ALL and OFF have been added). 
 * levels on the server may be different (i.e. log4j or Java Logging API) so
 * a mapping is provided via "serverName" field.<br> 
 * levels: ALL(lowest rank),LOG,DEBUG,INFO,WARN,ERROR,OFF(highest rank).
 */
ibm.tivoli.simplesrm.srm.dojo.LogLevels = {	
	ALL  : new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "ALL"  , rank:-1, serverName: "ALL"}) ,
	LOG  : new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "LOG"  , rank: 0, serverName: "FINE"}) ,
	DEBUG: new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "DEBUG", rank: 1, serverName: "CONFIG"}) ,
	INFO : new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "INFO" , rank: 2, serverName: "INFO"}) ,
	WARN : new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "WARN" , rank: 3, serverName: "WARNING"}) ,
	ERROR: new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "ERROR", rank: 4, serverName: "SEVERE"}) ,
	OFF  : new ibm.tivoli.simplesrm.srm.dojo.LogLevel({name: "OFF"  , rank: 5, serverName: "OFF"})
};



/**
 * provides server logging. logging methods are named after FireBug console.xxx methods
 * use currentLogLevel to configure correct log level. it can be used via shortcut ibm.tivoli.logger 
 * <br><br>
 * NOTE: all logging method have an optional argument of type Error.
 * if provided additional info is appended to the message (line number, file name, error message)
 * message won't be logged if it has lower log level (rank) then currentLogLevel.
 *  default value:ibm.tivoli.simplesrm.srm.dojo.LogLevels.ERROR  	
 *
 * <br><br>
 * Example: ibm.tivoli.logger.log("something bad happened",new Error())
 * @see ibm.tivoli.simplesrm.srm.dojo.LogLevel
 * @see ibm.tivoli.simplesrm.srm.dojo.LogLevels
 * @see ibm.tivoli.simplesrm.srm.dijit.SimpleSrmApp
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dojo.Logger", null, 
{
	id: '',
	constructor: function(params){
		var levels = ibm.tivoli.simplesrm.srm.dojo.LogLevels;
		var currentLogLevel = levels.ERROR;
		var id = '';  //need a Dom id for sendevent
		
		if (params && params.id){
			id = params.id;  
		} 		
		
		/** 
		 * private method:do not use directly.<br>
		 * all exceptions during execution are caught.
		 * @param {ibm.tivoli.simplesrm.srm.dojo.LogLevel} level
		 * @param {String} message
		 * @param {Error} error  (optional)
		 * @return {Boolean} false if message log level was to low 
		 */
		var send = function(level,message,error)
		{			
			try{
				if(currentLogLevel.rank > level.rank){
					return false; 
				}
				
				var msg = dojo.isString(message) ? message : "";
				
				if(error) {
					msg +=  " [" ;
					msg +=  error.message ? " Message: " + error.message : "";
					msg +=  (error.lineNumber !== undefined) ? " | Line: " + error.lineNumber : ""; 
					msg +=  error.fileName   ? " | File: " + error.fileName : "";
					msg +=  " ]";
				}
				
				if (id=='') {				
					var clientdiv = dojo.query(".clientarea");
					if (clientdiv.length>0) {
						id =  clientdiv[0].id;					    					
					}
				}
				
				//Commented out the code to send the error to the server. The response is causing the cursor to be changed which is throwing off some fields.
				//Don't think it's of much use anyway.				
				//sendEvent("logerror", id,  msg); 
				
				//dojo.xhrPost({
				//	url: "/SRMCommonsWeb/MessageLogger",
				//	content: {level: level.serverName, message: msg},
				//	sync: false,
				//	error: function(response, ioArgs) {
				//		console.warn("Failed sending log message to the server: ", msg);
				//	}
				//});	
			}
			catch(exception){
				console.warn("Failed to send log message with error: ",exception);			
			}
			return true;
		};
		
		this.log = function(message, error)	{ send(levels.LOG,message,error);};
		this.debug = function(message, error)	{ send(levels.DEBUG,message,error);};
		this.info = function(message, error)	{ send(levels.INFO,message,error);};
		this.warn = function(message, error)	{ send(levels.WARN,message,error);};
		this.error = function(message, error)	{ send(levels.ERROR,message,error);};
		
		this.setLevel = function(level){
			if(level instanceof ibm.tivoli.simplesrm.srm.dojo.LogLevel){
				currentLogLevel = level;
			}
			else {
				throw new TypeError("LogLevel expected");
			}
		};
		this.getLevel = function(){ return currentLogLevel;};
	},
	/** @param {ibm.tivoli.simplesrm.srm.dojo.LogLevel} @type {void}*/
	setLevel: undefined,
	/** @return {ibm.tivoli.simplesrm.srm.dojo.LogLevel}*/
	getLevel: undefined,
	
	/** @param {String} message	 @param {Error} error (optional)  @type void	 */
	log:   undefined,
	/** @param {String} message	 @param {Error} error (optional) @type void	 */
	debug: undefined,
	/** @param {String} message	 @param {Error} error (optional)@type void	 */
	info:  undefined,
	/** @param {String} message	 @param {Error} error (optional) @type void	 */
	warn:  undefined,
	/** @param {String} message	 @param {Error} error (optional) @type void	 */
	error: undefined
	
});
ibm.tivoli.logger = null;
if(!ibm.tivoli.logger) {	
   ibm.tivoli.logger = new ibm.tivoli.simplesrm.srm.dojo.Logger();	    
}

});

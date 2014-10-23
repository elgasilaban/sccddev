//>>built
// wrapped by build app
define("com/ibm/ism/pmsc/dojo/srmPageInit", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/simplesrm/srm/dojo/data/srmQuery,ibm/tivoli/tpae/dojo/data/tpaeQuery"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

/**
 * This class performs any Self Service App Dojo initialization.
 * It is used in the srmpageinit control and should be the first control in the page.
 * 
 */
dojo.provide("com.ibm.ism.pmsc.dojo.srmPageInit");
dojo.require("ibm.tivoli.simplesrm.srm.dojo.data.srmQuery");
dojo.require("ibm.tivoli.tpae.dojo.data.tpaeQuery");

/**
 *  
 */

com.ibm.ism.pmsc.dojo._SC_installed = true;    //Is SC installed

dojo.declare("com.ibm.ism.pmsc.dojo.srmPageInit", null, 
{	 
	token: '',  //not used in 7.5
	userid: '',
	runInMaximo: true,
		
	constructor: function(userid, runInMaximo, langcode) {
	    console.log("srmPageInit - constructor - entry");	
	    console.log("srmPageInit - user = " + userid + " langcode = " + langcode);	
	    //this.token = token;  //not used in 7.5
	    
		userid = userid.replace("%5c", "\\");
		this.userid = userid;
		
		if (runInMaximo!=null)
		   this.runInMaximo = (runInMaximo == "true" || runInMaximo == "1");		

      if (langcode!=null) 
		   ibm.tivoli.tpae.dojo.data._langcode=langcode;		
		
		//Set whether we use the separate servlet for config.properties				
		ibm.tivoli.tpae.dojo.data._runInMaximo=this.runInMaximo;		
		
	    //prime config.properties		
		ibm.tivoli.tpae.dojo.data.getConfigProperty("RequestsCatalog");
		
		var srmquery = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery();	
		//var deferred = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getMaxPropValue();
	
		//Set auth token	
		//if (this.token!=null && this.token!='') {			   		
		//	   srmquery.setToken(this.token, this.userid);			   
		//}
		//} else if ((this.token==null || this.token!='') && this.userid!=null && this.userid!='') {  //fpb			   		
		//}

      srmquery.setToken('', this.userid);			     //token not used in 7.5 - we use the maximo context root
		
		//Add simplesrm class to body
		//dojo.addClass(dojo.body(), "simplesrm");
		dojo.addClass(dojo.body(), "srm");
		
      //REST logout to clear any existing REST session
		//srmquery.logout();  //fpb 
		
		//Is SC installed?	
		var deferred = srmquery.getMaxVarValue("DBPMSC_PMP");		
		deferred.addCallback(function(response){
			var maxvars = response.MAXVARSMboSet.MAXVARS;  
			if (maxvars==undefined || maxvars.length==0) { //No SC 
				this.com.ibm.ism.pmsc.dojo._SC_installed = false;
			} else {
				var value = maxvars[0].Attributes.VARVALUE;
				if (value==null || value=="")  //No SC
					this.com.ibm.ism.pmsc.dojo._SC_installed = false;
			}					 
			
		    //get domains
		    var domains = ["ITEMSTATUS", "SRSTATUS", "TKCLASS", "TEMPLATESTATUS", "PMSCCRSTATUS", "SOLUTIONSTATUS"];
			srmquery.getDomainSynonymTable(domains);
		});
		deferred.addErrback( function(){
			console.error("Failed retrieving MAXVARS - DBPMSC_PMP");
			ibm.tivoli.logger.error("Failed retrieving MAXVARS - DBPMSC_PMP");
		});		
		
		//dojo.global.funcname = myfuncname;
		
		console.log("srmPageInit - constructor - exit");
	}
}
);

//Replace maximo version of funcname in library.js which cause an exception in IE
function myfuncname(f) {
 	// var s = f.toString().match(/function (\w*)/)[1];
	var s = f.toString().match(/function (\w*)/);
    if ((s == null) || (s.length == 0)) {
        return "anonymous";
    }    
    
    s = s[1];
    var args = f.arguments;
    if(args.length > 0)
    {
        s += "(";
        for(var i = 0; i < args.length; i ++ )
        {
            if(i > 0)
	            s += ",";
            s += "'"+args[i]+"'";
        }
        s += ")";
    }
    if ((s == null) || (s.length == 0))
    {
        return "anonymous";
    }
    return "&nbsp;&nbsp;" + s;
}
	
	 
	 

	 
	
	 
	 

 

});

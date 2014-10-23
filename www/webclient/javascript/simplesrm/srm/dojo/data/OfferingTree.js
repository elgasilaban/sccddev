//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree");

dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.OfferingTree",
			 null,
{
    _tree : null,
    _noParents : false,

	/**
	 * Produces an empty object that will be the offering tree.
	 */
	constructor : function() {
		this._tree = new Array();
	},
	
	addOffering : function(offering) {
		//console.log("OfferingTree.addOffering() entry", offering);
		var lastParent = null;
		var catOffMap = null;  //store classstructures in CATALOGCLASSSTRUCTURE attribute for performance  //fpb 
		
		//get user's itemset to filter on Org.  
		try {
			var site =   ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getLoggedInUser().SITE[0];
	        var itemsetid=null;
	        if (site.ORGANIZATION) {
	           var itemsetid =  site.ORGANIZATION[0].ITEMSETID;
	        }
			
			if (itemsetid!=null && offering.ITEMSETID!=null) {  //filter out offering not in Org.
				if (itemsetid!=offering.ITEMSETID) {
					console.log("OfferingTree.addOffering() - skip offering, different org: ", offering.ITEMNUM);
					return;
				}
			}		
			
         //also filter out offerings not in a catalog (and not a favorite) 
	     if (offering.FAVITEM==undefined  && offering.CATALOGCLASSSTRUCTURE==undefined && offering.PMSCCATALOGOFFMAP==undefined) {  //no offering-catalog association  //fpb	        	
             console.log("OfferingTree.addOffering() - skip offering, not in catalog: ", offering.ITEMNUM);
	           return;
	        } 

		} catch(ex) {
			console.log(ex);			
		}			
		
		/* include the parents in the tree */
		
		//Handle offerings in multiple catalogs
		var offeringsmap = [];
		
		var catalog_status = "ACTIVE";
		var catalogStatus_domain = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().getDomainSynonymTable('ITEMSTATUS');
		var catalog_active_status = catalogStatus_domain.valueByMaxvalue("ACTIVE");
		
		//If we are using CATALOGCLASSSTRUCTURE instead of PMSCCATALOGOFFMAP (for performance)			
		if (offering.CATALOGCLASSSTRUCTURE!=undefined ) {  //fpb
			catOffMap = eval('(' + offering.CATALOGCLASSSTRUCTURE + ')');		
			if (catOffMap!=undefined) {
            offering.IMAGENAME  = catOffMap.IMAGENAME;  //We stuffed imagename in too!
				catOffMap = catOffMap.CATOFFMAP;
         }
		}
		if (offering.PMSCCATALOGOFFMAP) {
			for (var i=0; i<offering.PMSCCATALOGOFFMAP.length; i++) {
				//Make sure catalog is active
				var off_catalog = offering.PMSCCATALOGOFFMAP[i].ITEMNUM;  //catalog name
				var off_catalog_itemset = offering.PMSCCATALOGOFFMAP[i].ITEMSETID;  //catalog itemset
				if (off_catalog!=null){
                   var  catalogs = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().cache.general.get("catalogs");
                   if (catalogs!=undefined && catalogs!=null) {
                	   for (var j=0;j<catalogs.length;j++) {
                        if (catalogs[j].ITEMNUM == off_catalog && (off_catalog_itemset==null || catalogs[j].ITEMSETID == off_catalog_itemset)) {                			   
                			   if(catalogs[j].STATUS== catalog_active_status) {  
                				   var path = offering.PMSCCATALOGOFFMAP[i].CLASSSTRUCTURE;               					
                				    offeringsmap.push(path);                				   
                			   }
                			   break;
                		   }
                	   }
                   }
				} else{				
				   var path = offering.PMSCCATALOGOFFMAP[i].CLASSSTRUCTURE;               					
				   offeringsmap.push(path);
				}
			}

		} else if (catOffMap!=null) {  //Mbo-only //fpb
			for (var i=0; i<catOffMap.length; i++) {
				var path = catOffMap[i].CS;
				   
		        //Fix shortened key names
		        for (var j = 0; j < path.length; j++) {
	        	   var clst = path[j];        	 
		           clst.DESCRIPTION = clst.D;
		           delete clst['D'];
		           
		           clst.CLASSSTRUCTUREID = clst.CSID;
		           delete clst['CSID'];
		           
                   var csuidstr =  clst.CSUID.replace(/,/g,"");
	               csuidstr =  csuidstr.replace(/\./g,"");
			       clst.CLASSSTRUCTUREUID = parseInt(csuidstr);		          
		           delete clst['CSUID'];
		           
			       //clst.CLASSIFICATIONID = clst.CLID;
		           
		           clst.PARENT = clst.P;
		           delete clst['P'];
		        }
				
				//Make sure catalog is active
				var off_catalog = catOffMap[i].ITEMNUM;  //offering catalog mapping name
				var off_catalog_itemset = catOffMap[i].ITEMSETID;  //offering catalog mapping itemset (can be null)
				if (off_catalog!=null){
                   var  catalogs = ibm.tivoli.simplesrm.srm.dojo.data.srmQuery().cache.general.get("catalogs");  //get catalogs
                   if (catalogs!=undefined && catalogs!=null) {
                	   for (var j=0;j<catalogs.length;j++) {
                		   if (catalogs[j].ITEMNUM == off_catalog && (off_catalog_itemset==null || catalogs[j].ITEMSETID == off_catalog_itemset)) {                			   
                			   if(catalogs[j].STATUS== catalog_active_status) {                				        					
                				    offeringsmap.push(path);                				   
                			   }
                			   break;
                		   }
                	   }
                   }
				} else{			        		   
			        offeringsmap.push(path);
				}
			}
		} else { 
		   offeringsmap.push(null);  //Offering with no classstructure, favorite, perhaps
		}
				
		//Handle offerings in multiple catalogs
		for (var j=0; j<offeringsmap.length; j++) {
		   lastParent = null;
		   var path = offeringsmap[j];
		  
		   if (path != undefined && !this._noParents) {
	          //Order manually because we can't do it on server using order by clause in CLASSHIERARCHY relationship
              //Using parent and classstructureid, we can put the items in order.
	          var _parent = null;
 			  var sorted_parents = new Array();
	          for (var i = 0; i < path.length; i++) {  //find top
	        	 var clst = path[i];
	        	 if (clst.PARENT == undefined) {
	        	 	sorted_parents.push(clst);
	        		_parent = clst.CLASSSTRUCTUREID;
	        		break;	        		
	        	 }   
	          }
	          if (_parent!=null) {  //now follow parent to put in order
	        	  var found = true;
	        	  while (found) {	        		
	        	     found= false;
   	        	     for (var i = 0; i < path.length; i++) {
	        		     var clst = path[i];
	        		     if (clst.PARENT == _parent) {
	        			     sorted_parents.push(clst);
	        			     _parent = clst.CLASSSTRUCTUREID;
	        			     found = true;
	        			     break;
	        		      }   
	        	     }
	               }
	        	if (sorted_parents.length>0)
	        		path = sorted_parents;
	          } //end of manual ordering      		        
			
	           //Add classification folders to tree
			   for (var i = 0; i < path.length; i++) {
				   if (lastParent == null) {
					   /* We're at top level */
					   lastParent = this.addElt(this._tree, path[i]);
				   } else {
					   //debugger;
					  if (lastParent.Category == undefined) {
						   lastParent.Category = new Array();
					   }
					   lastParent = this.addElt(lastParent.Category, path[i]);
				   }
			   }		
		    }
		
		    /* then the offering itself */
		    if (lastParent != undefined) {
		      if (lastParent.Offering == undefined) {
		        lastParent.Offering = new Array();
    	      }
	    	  this.addElt(lastParent.Offering, offering);
		    } else {
			   this.addElt(this._tree, offering);
		    }				
		}

		//debugger;
		//console.log("OfferingTree.addOffering() exit", this._tree);
		
	},
	
	addElt : function(array, elt) {
		/* search for elt in array */
		var found = false;
		var leaf = null;
		for (var i = 0; i < array.length; i++) {
			//console.log("comparing ", array[i], " & " , elt);
			if (((elt.CLASSSTRUCTUREUID !== undefined)&& (array[i].ID == elt.CLASSSTRUCTUREUID)) ||
				 ((elt.ITEMID != undefined)	&&(array[i].ItemID == elt.ITEMID))) {
				found = true;
				leaf = array[i];
			}
		}
		/* not found, add it */
		if (found === false) {
			//debugger;
			leaf = { Ancestor : elt.CLASSSTRUCTUREUID,
					 //Ancestor : elt.PARENT,  
					 //ClassStructureID : elt.CLASSSTRUCTUREID,  
					 ClassStructureID : elt.CLASSSTRUCTUREUID,
					 //ClassificationID : elt.CLASSSTRUCTUREID,  
					 Description : elt.DESCRIPTION,
					 ID : elt.CLASSSTRUCTUREUID,
					 ItemID : elt.ITEMID,
					 ItemNum : elt.ITEMNUM,
					 ItemSetID : elt.ITEMSETID,
					 Score : elt.SCORE
				   };
			
			if (elt.LONGDESCRIPTION != undefined) {
				leaf.LongDescription = elt.LONGDESCRIPTION[0].LDTEXT;
			} 
			if (elt.LONGDESCRIPTION == undefined && elt.DESCRIPTION_LONGDESCRIPTION != undefined) {
				leaf.LongDescription = elt.DESCRIPTION_LONGDESCRIPTION;
			}
			if (elt.IMGLIB != undefined) {
				leaf.ImageName = elt.IMGLIB[0].IMAGENAME;			
		    } else if (elt.IMAGENAME!=undefined) {  //also storing imagename here  when using mbo instead of OS //fpb
			   leaf.ImageName = elt.IMAGENAME;
		   }
			//if (elt.CLASSIFICATIONID != undefined) {
				//leaf.ClassificationID = elt.CLASSIFICATIONID;			
			//}			
			if (leaf.Description == undefined) {				
				leaf.Description = leaf.ClassStructureID.toString();				
			} 
			//else {
			//	console.log("No classif ID here");
			//}
			array.push(leaf);
		}
		return leaf;
	},
	
	clean : function() {
		this._tree = new Array();
	}

});

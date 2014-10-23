//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.TemplatesTree");

dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.TemplatesTree",
			 null,
{

	_tree : null,
	_noParents : false,

	/**
	 * Produces an empty object that will be the Templates tree.
	 */
	constructor : function() {
		this._tree = new Array();
	},
	
	addTemplate : function(template) {
		//console.log("solutionTree.addsolution() entry", solution);
		var lastParent = null;
		
		/* include the parents in the tree */
		var parents = template.CLASSSTRUCTURE;
		//debugger;
		if (parents != undefined && !this._noParents) {

         //Using parent and classstructureid, we can put the items in order.
         var _parent = null;
         var sorted_parents = new Array();

         for (var i = 0; i < parents.length; i++) {  //find top
            var clst = parents[i];
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
                for (var i = 0; i < parents.length; i++) {
                   var clst = parents[i];
                   if (clst.PARENT == _parent) {
                      sorted_parents.push(clst);
                      _parent = clst.CLASSSTRUCTUREID;
                      found = true;
                      break;
                   }   
                }
            }
            if (sorted_parents.length>0)
               parents = sorted_parents;
         } //end of manual ordering      		        

			for (var i = 0; i < parents.length; i++) {
				if (lastParent == null) {
					/* We're at top level */
					lastParent = this.addElt(this._tree, parents[i]);
				} else {
					//debugger;
					if (lastParent.Category == undefined) {
						lastParent.Category = new Array();
					}
					lastParent = this.addElt(lastParent.Category, parents[i]);
				}
			}
		}
		
		/* then the template itself */
		if (lastParent != undefined) {
			if (lastParent.Offering == undefined) {
				lastParent.Offering = new Array();
			}
			this.addElt(lastParent.Offering, template);
		} else {
			this.addElt(this._tree, template);
		}

		//debugger;
		//console.log("solutionTree.addsolution() exit", this._tree);
	},
	
	addElt : function(array, elt) {
		/* search for elt in array */
		var found = false;
		var leaf = null;
		for (var i = 0; i < array.length; i++) {
			//console.log("comparing ", array[i], " & " , elt);
			if (((elt.CLASSSTRUCTUREUID !== undefined)&& (array[i].ClassStructureID == elt.CLASSSTRUCTUREUID))){				
				found = true;
				leaf = array[i];
			}
		}
		/* not found, add it */
		if (found === false) {
			leaf = { 	
					 Description : elt.DESCRIPTION,
					 ClassStructureID : elt.CLASSSTRUCTUREUID,
					 //ClassificationID : elt.CLASSSTRUCTUREID,  
					 ID : elt.TKTEMPLATEID,
					 Template : elt.TEMPLATEID,
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
			}
			if (elt.TKTEMPLATEID==null &&  elt.CLASSSTRUCTUREUID!=null)  //classification item
				leaf.ID =  elt.CLASSSTRUCTUREUID;

			//if (elt.CLASSIFICATIONID != undefined) {
			//	leaf.ClassificationID = elt.CLASSIFICATIONID;
			//}			 
			
			if (leaf.Description == undefined) {				
				leaf.Description = leaf.ClassStructureID.toString();
			} 
			 
			array.push(leaf);
		}
		return leaf;
	},
	
	clean : function() {
		this._tree = new Array();
	}

});

//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.SolutionTree");

dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.SolutionTree",
			 null,
{

	_tree : null,
   _noParents : false,

	/**
	 * Produces an empty object that will be the solution tree.
	 */
	constructor : function() {
		this._tree = new Array();
	},
	
	//adds solutions or classsstructures
	addSolution : function(solution) {
		//console.log("solutionTree.addsolution() entry", solution);
		var lastParent = null;		
		 	
		//CLASSSTRUCTURE handling code		
		var parents = null;		
		
		if (solution.CLASSSTRUCTUREID!=undefined) {
			var parents = solution.CLASSSTRUCTURE;
			if (parents==undefined) {
				parents = new Array();
			}	
			
		   //Add leaf object to classstructure hierarchy array
		   var leaf = {};
		   leaf.CLASSSTRUCTUREID = solution.CLASSSTRUCTUREID;
		   leaf.CLASSSTRUCTUREUID = solution.CLASSSTRUCTUREUID;
		   if (solution.DESCRIPTION)
		      leaf.DESCRIPTION = solution.DESCRIPTION;
		   if (solution.PARENT)
			   leaf.PARENT = solution.PARENT;
   		   parents.push(leaf);
		}
		
		//Order classstructures if that's what we are working with 
		if (parents!=null) {		
		   //Order classstructure
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
					lastParent = this.addElt(lastParent.Category, parents[i]);  //add to tree
				}
			}
		
		} 
		
		/* Solution handling */
		if (lastParent != undefined) {
			if (lastParent.Offering == undefined) {
				lastParent.Offering = new Array();
			}
			if (solution.SOLUTION)  //Is there a solution?
			   this.addElt(lastParent.Offering, solution);
		} else {
			if (solution.SOLUTION)  //Is there a solution?
			   this.addElt(this._tree, solution);
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

         //Dup solution?
			if ( ((elt.SOLUTIONID != undefined)	&&(array[i].ItemID == elt.SOLUTIONID))) {
				found = true;
				leaf = array[i];
			}
         //Existing classstructure?
			if (((elt.CLASSSTRUCTUREUID !== undefined)&& (array[i].ClassStructureID == elt.CLASSSTRUCTUREUID))){				
				found = true;
				leaf = array[i];
			}
		}
		/* not found, add it */
		if (found === false) {
			var desc = elt.DESCRIPTION;
			if (desc==undefined) {            //fix
		            desc=elt.SOLUTION;
		    }
			leaf = { Description : desc,
					 ID : elt.SOLUTIONID,
                     ClassStructureID : elt.CLASSSTRUCTUREUID,
                     csid: elt.CLASSSTRUCTUREID,                
					 Solution : elt.SOLUTION,
					 LongDescription  : elt.PROBLEMCODE_LONGDESCRIPTION, //Symptom
					 Score : elt.SCORE
				   };
			
			var MINDIGITS = 30;
			if (elt.SOLUTION && desc.length < MINDIGITS) 
				leaf.spaces = MINDIGITS - desc.length;			
			 
			if (elt.SOLUTION==null &&  elt.CLASSSTRUCTUREUID!=null) { //classification item
				leaf.ID =  elt.CLASSSTRUCTUREUID;
				 leaf.ImageName = "getonserver";  //to force retrieving solution classification (folder) image
			}
			
			if(elt.Solution && elt.AVGRANKING > 0){
				var rankImage = "img_rate" + elt.AVGRANKING + "star.gif"
				console.log("rankImage",rankImage);
				leaf.ImageName2 = rankImage;
			}
			
			if (elt.IMGLIB != undefined) {
				leaf.ImageName = elt.IMGLIB[0].IMAGENAME;
			}

			array.push(leaf);
		}
		return leaf;
	},
	
	clean : function() {
		this._tree = new Array();
	}

});

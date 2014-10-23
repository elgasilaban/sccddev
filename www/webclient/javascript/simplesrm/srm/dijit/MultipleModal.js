//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");

dojo.require("dijit.DialogUnderlay");

/**
 *  groups methods needed to support multiple modal panels
 */
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.MultipleModal",
	null,
	{		
		/** "property signature" to recognized if class was mixed with MultipleModal
		 * @type {Boolean} 
		 */
		supportsMultipleModal : true,
		
		/** 
		 * modifies dijit.DialogUnderlay to support multiple modal panels.
		 * should be run before any modal panel is created.<br><br>
		 * Flow:<br>
		 * dijit._underlay singleton maintains a counter of opened modal panels.
		 * based on this counter it calculates its zIndex.
		 * each panel before being displayed has to get correct zIndex (based on the counter).
		 * with each Underaly.show() underlay counter is increased(underlay covers older modal panels),
		 * with each Underaly.hide() counter is decreased. 
		 * when counter reaches 0 original hide() method is invoked and dijit._underlay gets hidden.
		 * @see ibm.tivoli.simplesrm.srm.dijit.DojoUpgrades
		 * @type {void}
		 */
		patchCode: function(){	
			
			if(!isNaN(dijit.DialogUnderlay.prototype.counter)) {
				return;
			}				
			var newHide = function(){
				if(this.counter < 1) {
					console.log("dijit.DialogUnderlay : oldHide invoked ");
					this.counter = -1;
					 try {
					   this.oldHide();
					 } catch(ex) {
						 //in IE we're getting an exception  here - dijit.DialogUnderlay.bgIframe does not exist
						 console.log("dijit.DialogUnderlay : patchcode exception -  " + ex);
						 this.domNode.style.display = "none";
					 }
				} else {
					this.counter--;
					this.domNode.style.zIndex = this.getUnderlayZIndex();
					console.log("dijit.DialogUnderlay : counter decremented. current = " + this.counter);
				}
			}; 
			var newShow = function() {
				this.counter++;
				this.domNode.style.zIndex = this.getUnderlayZIndex();						
				console.log("dijit.DialogUnderlay : counter incremented. current = " + this.counter);
				this.oldShow();
			};
			
			var getDialogZIndex = function(){
				// modal panels will have even z-index
				// underlay and modal panel shouldn't have the same z-index
				return 499 + 2 * dijit._underlay.counter;
			};
			
			var getUnderlayZIndex = function(){
				// underlay will have odd z-index
				return 498 + 2 *this.counter;
			};
			
			dijit.DialogUnderlay.extend({
				counter: -1 ,
				oldHide: dijit.DialogUnderlay.prototype.hide,
				oldShow: dijit.DialogUnderlay.prototype.show,
				hide: newHide ,
				show: newShow,
				getUnderlayZIndex: getUnderlayZIndex,
				getDialogZIndex: getDialogZIndex
				
			});
								
		},
			
				
			
		/**
		 * checks if event comes from current modal widget.
		 * traverses DOM hierarchy up to document tag. if event comes from other widget mixed
		 * with MultipleModal then it should be ignored.
		 * @param {Event} evt
		 * @return {Boolean} false - event from other modal widget 
		 */
		preOnKeyTest: function(evt){
			var node = evt.target; 
			while(node && (node.nodeName != "#document")){				
				var widget = dijit.byNode(node);
				//console.log("widget: " + widget);
				if(widget && widget.supportsMultipleModal && (widget != this)){
					//console.log("it's event from another modal dialog");
					return false;
				}					
				node = node.parentNode;
				//console.log("node: " + node);
			}
			
			//Does event comes from tpae dialog? If so we want to ignore event
			if (modalWaitLayers && modalWaitLayers.length>0)
				return false;
			
			//console.log("it's your event");
			return true;
		}

	}
);
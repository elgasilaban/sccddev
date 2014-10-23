//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/DojoUpgrades", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/simplesrm/srm/dijit/MultipleModal,dijit/form/ComboBox,dijit/form/FilteringSelect,dojox/html/metrics"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.DojoUpgrades");

dojo.require("ibm.tivoli.simplesrm.srm.dijit.MultipleModal");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojox.html.metrics");
/**
 * Common place for doing all runtime modification to Dojo code<br>

 */
dojo.declare(
	"ibm.tivoli.simplesrm.srm.dijit.DojoUpgrades",
	null,
	{		
		/**
		 * executes all available patching functions
		 * @type void
		 */
		modifyDojo: function(){
			this._modifyComboBox();
			this._modifyFilteringSelect();
			this._modifyDialogUnderlay();
		},
		
		/**
		 * adds support for multiple modal panels.
		 * uses ibm.tivoli.simplesrm.srm.dijit.MultipleModal.
		 * @see ibm.tivoli.simplesrm.srm.dijit.MultipleModal
		 * @type void
		 */
		_modifyDialogUnderlay: function() {
			var tmp = new ibm.tivoli.simplesrm.srm.dijit.MultipleModal();
			tmp.patchCode();
		},
		
		/**
		 * uses _comboBoxMixinUpgrade
		 * @returns {Boolean}false if no changes were needed
		 */
		_modifyComboBox: function(){			
			if(dijit.form.ComboBox.prototype._oldGetMenuLabelFromItem){
				return false;
			}			
			var upgrade =this._comboBoxMixinUpgrade();
			upgrade = dojo.mixin(upgrade,{oldPostCreate: dijit.form.ComboBox.prototype.postCreate});
			dojo.extend(dijit.form.ComboBox,upgrade);			
			return true;
		},
		
		/**
		 * uses _comboBoxMixinUpgrade
		 * @returns {Boolean}false if no changes were needed
		 */
		_modifyFilteringSelect: function(){			
			if(dijit.form.FilteringSelect.prototype._oldGetMenuLabelFromItem){
				return false;
			}			
			var upgrade =this._comboBoxMixinUpgrade();
			upgrade = dojo.mixin(upgrade,{oldPostCreate: dijit.form.FilteringSelect.prototype.postCreate});
			dojo.extend(dijit.form.FilteringSelect,upgrade);			
			return true;
		},
		
		/**
		 * adds 2 features: highlights the selected option in the drop down and displays a tip 
		 * with the full selected label if it's too wide<br>		
		 * <b>NOTE</b> displaying the tip is connected using an override to postcreate method.
		 * it may cause problems when used with other widgets (i.e. ComboBoxMixin itself)<br>		 
		 * @returns {Object} encapsulating almost all changes to ComboBoxMixin (you have to provide oldPostCreate)
		 */
		_comboBoxMixinUpgrade: function(){
			var _ss;
			var _onLongInput = function(evt){
				var n = evt.target;
				var fs = dojo.style(n, "fontSize");
				var ls = dojo.style(n, "letterSpacing");
				var tw = dojox.html.metrics.getTextBox(n.value, {fontSize: fs, letterSpacing: ls}).w;
				var mb = dojo.coords(n);
				if(tw > mb.w) {
					if(!_ss) {
						_ss = document.createElement("span");
						dojo.connect(_ss, 'onmouseout', dojo, function(){dojo.style(_ss, {top: "-500px"});});
						dojo.style(_ss, {position: "absolute", top: "-500px", left: "0px", paddingRight: "2px", backgroundColor:"#ffffcc", zIndex:9999});
						dojo.body().appendChild(_ss);
					}
					_ss.innerHTML = n.value;
					var ff = dojo.style(n, "fontFamily");
					var bc = dojo.style(n, "backgroundColor");
					dojo.style(_ss, {
							left: (mb.x+1)+"px", top: mb.y+"px", height: mb.h+"px", width: "auto", 
							fontFamily: ff, fontSize: fs, letterSpacing: ls
						}
					);
				}
			};
			
			var newPostCreate = function(){	
				// we need a place to connect our events:
				// it must be launched after mixin params are applied and DOM nodes are created
				// "carrier function" must be always invoked (once)
				// better if it doesn't do tricks with inheritance chain on its own
				this.connect(this.focusNode,"onmouseover","_onLongInput");			
				this.oldPostCreate.apply(this,arguments);
			};
			
			
			var _newGetMenuLabelFromItem= function(/*Item*/ item){
				//displaying pop-up via button differs from via keyboard method
				//in that the first uses empty query(ignores user input)
				//unfortunately "key" parameter is used both for query and marking which
				//parameter should be highlighted (startSearch method sets this._lastInput to "")
				//here we re-set this value right before its used
				this._lastInput = this.focusNode.value;
				return this._oldGetMenuLabelFromItem(item);
			};
			
			var upgrade = {
					_oldGetMenuLabelFromItem: dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem,
					_getMenuLabelFromItem: _newGetMenuLabelFromItem,
					_onLongInput: _onLongInput,
					postCreate: newPostCreate
				};
			return upgrade;
		}
	}
);

});

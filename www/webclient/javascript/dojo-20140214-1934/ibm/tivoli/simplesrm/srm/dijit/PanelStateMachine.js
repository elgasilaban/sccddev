//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/PanelStateMachine", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.PanelStateMachine");

/**
 * Implements basic functionalities to control the state of a given
 * panel. Possible states are:<br>
 * - INIT : Initializing - input and submit not possible.<br> 
 * - MISS : Empty or input missing. Input possible but no submit.<br>
 * - CORRECT : The panel is correct, the panel can be submitted and the
 *             input can be changed.<br>
 * - ERROR : The panel contains invalid data or has any other unforeseen
 *           problem. Values can be changed but submitting is prohibited.
 * - SUBMIT : The request is submitted, the panel shouldn't be used
 *            until it's reinitialized.
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dijit.PanelStateMachine",
			 null,
{
	state : "INIT",

	setStateMiss : function() {
		console.log("setStateMiss");
		this.state = "MISS";
		this._inform();
	},

	setStateCorrect : function() {
		console.log("setStateCorrect");
		this.state = "CORRECT";
		this._inform();
	},

	setStateError : function() {
		console.log("setStateError");
		this.state = "ERROR";
		this._inform();
	},
	
	setStateSubmit : function() {
		console.log("setStateSubmit");
		this.state = "SUBMIT";
		this._inform();
	},
		
	/**
	 * Sets the state automatically after the number of messages. If there
	 * are no error messages then the state is correct, else error.
	 */
	setState : function() {
		var haveError = false;
		for (i in this._messages) {
			if(this._messages.hasOwnProperty(i)){
				var message = this._messages[i];
				if (message.messageType == 'E' || message.messageType == 'I') {
					haveError = true;
				}
			}
		}

		if (haveError) {
			this.setStateError();
		} else {
			this.setStateCorrect();
		}
	},
	
	/**
	 * Returns the state of the panel as a string. Possible values are "INIT",
	 * "MISS", "CORRECT", "ERROR".
	 */
	getState : function() {
		return this.state;
	},
	
	/**
	 * Returns a boolean indicating whether submitting of the request
	 * at the current panel state is accepted or not.
	 */
	canSubmit : function() {
		if (this.state == "CORRECT") {
			return true;
		}
		return false;
	},
	
	/**
	 * Returns a boolean indicating whether inputing data at the current
	 * panel state is accepted or not.
	 */
	canInput : function() {
		if (this.state == "CORRECT"
				|| this.state == "ERROR"
				|| this.state == "MISS") {
			return true;
		}
		return false;
	},
	
	/**
	 * For now, sets the OK button to active or inactive depending
	 * on the current state.<br>
	 * TODO In the future, this function should just notify the
	 * registered widgets so they can take the needed action,
	 * whatever it is.
	 */
	_inform : function() {
		var okButton = dijit.byId(this.id + "_createButton");
		if (okButton) {
			if (this.state == "CORRECT") {
				okButton.attr("disabled", false);
			} else {
				okButton.attr("disabled", true);
			}
		}
	}

});
});

//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dijit/FloatInputBox", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/tip/dijit/TextInputBox"], function(dijit,dojo,dojox){
//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.FloatInputBox"); 

dojo.require("ibm.tivoli.tip.dijit.TextInputBox");

dojo.declare(
	    "ibm.tivoli.simplesrm.srm.dijit.FloatInputBox",
	    [ibm.tivoli.tip.dijit.TextInputBox],
	    {
	    	/** decimal precision, default 1 **/
	    	decimalPrecision: 1,
	        /** the initial value (an empty string means "not a number")*/
	        value: "",
	        /** the minimum number */
	        min: "",
	        /** the maximum number */
	        max: "",
	        /** the constraints */
	        constraints: {},
	        
	        /**
	         * Sets the initial value: this triggers the first validation.
	         * The initial value can be externally provided by setting the 
	         * value property.  
	         */
	        startup: function() 
	        {
	            // call the superclass's method
	            this.inherited("startup", arguments);
            
	            // get parameters
	            var decimalNumber = /^[\-]?[0-9]*[,.]?[0-9]+$/g;

	            // set the regular expression (only number accepted)  
	            this.constraints.regexp = decimalNumber;
	            // set the regex message for the text
	            this.constraints.regexpMessage = this._resources.NUMBER_INVALID_VALUE;
	            
	            // get the min
	            if ( this.min.match(decimalNumber) ) {
	                this.constraints.min = parseFloat(this.min, 10);
	            }
	            // get the max
	            if ( this.max.match(decimalNumber) ) {
	                this.constraints.max = parseFloat(this.max, 10);
	            }
	            // set the validator function
	            this.constraints.validator = dojo.hitch(this, this._validator);

	            // set the value
	            var n;
	            if ( this.value.match(decimalNumber) ) {
	                // the passed value is a number
	                n = parseFloat(this.value, 10);
	            }
	            else {
	                n = NaN;
	            }
	            this.setValue(n);
	        },
	        
	        /**        
	         * Returns the value (a number)
	         */
	        getValue: function()
	        {
	            // get the text value
	            var value = this.inherited("getValue", arguments);
	            // convert to a numeric value
	            var n = NaN;
	            if ( value.match(this.constraints.regexp) ) {
	                // the value is a number
	                n = parseFloat(value, 10);
	            }
	            return n;
	        },
	        
	        /**        
	         * Sets the value.
	         * 
	         *  @param value:
	         *      The value (a number) to be set.
	         */
	        setValue: function(value)
	        {
	            if ( isNaN(value) ) {
	                value = "";
	            }
	            else {
	            	if(parseFloat(parseInt(value,10)) == value) {
	            		value = "" + value;
	            	} else if (value !== ""){
	            		value = "" + value.toFixed(this.decimalPrecision);
	            	}
	            }
	            this.inherited("setValue", arguments);
	        },
	        setDecimalPrecision: function(decPrec)
	        {
	        	this.decimalPrecision = decPrec;
	        },
	        /**
	         * Returns true if the widget's value is not set.
	         */
	        isEmpty: function()
	        {
	            return isNaN(this.getValue());
	        },
	        
	        /**        
	         * Returns the text representation of the value (a String)
	         */
	        getTextValue: function()
	        {
	            // return the text value
	            return ibm.tivoli.simplesrm.srm.dijit.FloatInputBox.superclass.getValue.call(this);
	        },
	        
	        /**
	         * The range validator.
	         */
	        _validator: function()
	        {
	            // get the value
	            var n = this.getValue();

	            // check the max constraint
	            if ( this.constraints.max !== undefined && n > this.constraints.max ) {
	                // the value is greater than max 
	                return { state: this.constants.ERROR, message: dojo.string.substitute(this._resources.NUMBER_MAX_LIMIT, {max: this.constraints.max}) };    
	            }
	            // check the min constraint
	            if ( this.constraints.min !== undefined && n < this.constraints.min ) {
	                // the value is lower than min
	                return { state: this.constants.ERROR, message: dojo.string.substitute(this._resources.NUMBER_MIN_LIMIT, {min: this.constraints.min}) };    
	            }
	            // - and -0 not allowed
	            var s = this.getTextValue();
	            if ( s && ( s === "-" || s.indexOf("-0") === 0 ) ) {
	                return { state: this.constants.ERROR, message: this._resources.NUMBER_INVALID_VALUE };
	            }
	            
	            // return no status, to permit the validation to go ahead
	            return null;
	        }
	    }
	);
});

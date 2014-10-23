//>>built
// wrapped by build app
define("ibm/tivoli/tip/dijit/picker/DatePicker", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/tip/dijit/picker/PopupPicker,dijit/_Calendar"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.tip.dijit.picker.DatePicker"); 

dojo.require("ibm.tivoli.tip.dijit.picker.PopupPicker"); 
dojo.require("dijit._Calendar");

/**
 * The date-picker popup.  
 */
dojo.declare(
    "ibm.tivoli.tip.dijit.picker.DatePicker",
    [ibm.tivoli.tip.dijit.picker.PopupPicker, dijit._Calendar],
    {
        /** constraints */
        constraints: {selector: "date"}
    }        
);


});

/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2007, 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.provide("widgets.stock");
dojo.declare("stock",null,{
    constructor: function() {
        this.handlingFn = null;
    },
	onLoad: function () {
        console.log("test.onLoad ",this.iContext.getRootElement().getAttribute("id"));
    },
    onUnload: function() {
        console.log("test.onUnload", this.iContext.getRootElement() ? this.iContext.getRootElement().getAttribute("id") : "root element already gone");
    },
	handleAttributeChange:function(iEvent){
		console.log("handleAttributesChange");
		console.dir(iEvent);
	},
	handleIdescriptorChange:function(iEvent){
	console.log("handleIdescriptorChange");
		console.dir(iEvent);
	},
    updateQuote:function(iEvent){
          var data = iEvent.payload;
          if (typeof data == "undefined" || data == null) return;

          var company = data.company;
          if (typeof company == "undefined" || company == null) return;

          var element2 = this.iContext.getElementById("company");
          var temp = element2.innerHTML;
          if (temp == company) return;
          element2.innerHTML = company;

          var element = this.iContext.getElementById("stock");
          var oldQuote = parseInt(dojo.attr(element,'innerHTML'),10);
          if (oldQuote > 100) {
              element.innerHTML = "95";
          }
          else{
              element.innerHTML = "105";
          }
     },
	 onNavStateChanged:function(iEvent){
//		console.log("onNavStateChanged iEvent-->");
//		console.dir(iEvent);
	 },
     sendData:function(){
		
          var data = {};
          data.company = this.iContext.getElementById("company").innerHTML;
          data.stock = this.iContext.getElementById("stock").innerHTML;
         
          this.iContext.iEvents.fireEvent("sendStockData",null,data);
		  
		  //this.iContext.iEvents.fireEvent("onNavStateChanged",null, data); 

          
          var iDescriptor = this.iContext.getiDescriptor();
          if (typeof iDescriptor != undefined && iDescriptor != null) {
              console.debug("current mode is "+iDescriptor.getItemValue("mode"));
          }
     },
	 broadcastData:function(){
          var data = {};
          data.company = this.iContext.getElementById("company").innerHTML;
          data.stock = this.iContext.getElementById("stock").innerHTML;
          //data.broker = this.iContext.getElementById("broker").innerHTML;
          //this.iContext.iEvents.fireEvent("sendStockData",null,data);
          
          var eventService = com.ibm.mashups.iwidget.services.ServiceManager.getService("eventService");
		  eventService.broadcastEvent("Display Event Data",data);  
		  
     },
     editBroker:function(){
          this.iContext.iEvents.fireEvent("onModeChanged",null, "{newMode:'edit'}");
     },
     switchBroker:function(){
          var element = this.iContext.getElementByClass("brokerSelection");
          element = element[0];
          var value = element.options[element.selectedIndex].value;
        
          var iDescriptor = this.iContext.getiDescriptor();
          if (typeof iDescriptor != undefined && iDescriptor != null) {
            console.debug("switch broker: current mode is "+iDescriptor.getItemValue("mode"));
          }
		  
		  var element1 = this.iContext.getElementByClass("companySelection")[0];          
          var value1 = element1.options[element1.selectedIndex].value;

          var attributes = this.iContext.getiWidgetAttributes();
          attributes.setItemValue("broker",value);
		  attributes.setItemValue("company",value1);
          attributes.save();
          this.iContext.iEvents.fireEvent("onModeChanged",null, "{newMode:'view'}"); 
     },
     setHandlingFn: function(fnc) {
         this.handlingFn = fnc;
     },
	 handleCompanyChange:function(iEvent){
		var payload = iEvent.payload;
		var changes = payload.changes;
		for (var i in changes){
			var anItem = changes[i];
			var name = anItem.itemName;
			var type = anItem.type; //"newItem","updatedValue","removedItem"
			
			if (name == "companyid" && (type == "newItem" || type=="updatedValue"))
			{
				var element2 = this.iContext.getElementByClass("companyLabel")[0];
				element2.innerHTML = anItem.newVal;
			}
			if (name == "broker" && (type == "newItem" || type=="updatedValue")){
				var element3 =this.iContext.getElementById("broker");
				element3.innerHTML = anItem.newVal; 
			}
		}
        
        // delegate to a possible testing function
        if (this.handlingFn)
            this.handlingFn(iEvent);
	 },
	 onEditDone:function(){
		  var elements = this.iContext.getElementByClass("companySelection");
          var element = elements[0];
          var value = element.options[element.selectedIndex].value;
		  
		  var itemSet = this.iContext.getShareableItemSet("companyinfo");
		  itemSet.setItemValue("companyid",value); //"companyid is the local value"
		  
		  var element1 = this.iContext.getElementByClass("brokerSelection")[0];
          var value1 = element1.options[element1.selectedIndex].value;
		  itemSet.setItemValue("broker",value1);
		  itemSet.commit();    //commit the change so other widgets will be notified
		  
		  this.switchBroker();
	 },
     onview:function(){
	    var element = this.iContext.getElementById("stock");
        var attributesItemSet = this.iContext.getiWidgetAttributes();
        element.innerHTML = attributesItemSet.getItemValue("stock");

        var elements = this.iContext.getElementByClass("companyLabel");
        var element2 = elements[0];
        element2.innerHTML = attributesItemSet.getItemValue("company");

        var element3 =this.iContext.getElementById("broker");
        element3.innerHTML = attributesItemSet.getItemValue("broker"); 

           },
     onedit:function(){
          var element = this.iContext.getElementByClass("brokerSelection");
          var attributesItemSet = this.iContext.getiWidgetAttributes();  
          var broker = attributesItemSet.getItemValue("broker");
          if (typeof broker == "undefined" || broker == null) return;
          element = element[0];
          for (var i=element.options.length-1; i >= 0;i--) {
              var value = element.options[i].value;
              if (value != null && value == broker) {
                    element.options[i].selected = true;
              }
          }
         
		  //test image Uri
          var imageUri = attributesItemSet.getItemValue("imageUri");
          var uri = this.iContext.io.rewriteURI(imageUri,false);
          console.debug("image uri:"+uri);
         
     }
});




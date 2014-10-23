//Call this from the fireBug command line using the following
// make sure your server and domain are correct
/*

	addOnJsFiles("http://localhost:7001/maximo/webclient/javascript/unittests/autofill.js");
	testAutoFill();
 */
// Then inspect the autoFillInfo object to see that it is correctly merged.

function testAutoFill()
{
	//clear any existing
	autoFillInfo=null;
	var infoId = "testautofill";
	try
	{
		var autoFill = {};
		autoFill[infoId]={"sharedattributes":{"0":["field1","field2"],"1":["field3","field4"]},
			 "datastores" : {
			"datastore1":	{
				"typeahead":	{	"attributes":["value", "description"],
									"keyattribute":"value" 
					},
				"filters"	:	{	"f1": ["f1_1","f1_2"],
									"f2": ["f2_1","f2_2"]	
					},
				"setvalues"	:	{	"sv1":	["sv1_1","sv1_2"],
									"sv2":	["sv2_1","sv2_2"]	
					}
				},
			"datastore2":	{
				"typeahead":	{	"attributes":["value", "description"],
									"keyattribute":"value" 
					}
				}
		 	}
		};
		updateAutoFill (infoId, autoFill);
	
		
		autoFill = {};
		autoFill[infoId] = {"sharedattributes":{"0":["field5","field6"],"1":["field7","field8"],"2":["field9","field10"]},
			 "datastores" : {
			"datastore1":{
				"filters"	:	{	"f3": ["f3_1","f3_2"],
									"f4": ["f4_1","f4_2"]	
					},
				"siteorgfilter":"mainrecord",
				"setvalues"	:	{	"sv3":	["sv3_1","sv3_2"],
									"sv4":	["sv4_1","sv4_2"]	
					}
			}, 
			"datastore2":{
				"filters"	:	{	"f9": ["f9_1","f9_2"],
									"f10": ["f10_1","f109_2"]	
					},
				"setvalues"	:	{	"sv9":	["sv9_1","sv9_2"],
									"sv10":	["sv10_1","sv10_2"]	
					}
				},
			"datastore3":{
				"typeahead":{
					"attributes":["value1", "description1"],
					"keyattribute":"value1" 
				},
				"filters"	:	{	"f5": ["f5_1","f5_2"],
									"f6": ["f6_1","f6_2"]	
					},
				"setvalues"	:	{	"sv5":	["sv5_1","sv5_2"],
									"sv6":	["sv6_1","sv6_2"]	
					}
			},
			"datastore4":{
				"filters"	:	{	"f7": ["f7_1","f7_2"],
									"f8": ["f8_1","f8_2"]	
					},
				"setvalues"	:	{	"sv7":	["sv7_1","sv7_2"],
									"sv8":	["sv8_1","sv8_2"]	
					}
				}
			}
		};
		updateAutoFill(infoId, autoFill);
		validateStructure(infoId);
	}
	catch(error)
	{
		console.error(error);
	}
}


function compare(modelObject, testObject, propName)
{    
	if(!propName)
	{
		propName="modelObject";
	}
	//simple check up front
    if((!modelObject && testObject) || !testObject && modelObject)		
    {
        return propName;
    }
    //if an array and the other is not or they are different lengths
	if(typeof modelObject != "object")
	{
		if(modelObject == testObject)
		{
			return true;
		}
		else
		{
			return "Simple objects do nat match. " + propName;
		}
	}
	else if(dojo.isArray(modelObject)) //if the lengths are wrong. get out before we walk them
	{
		if(!dojo.isArray(testObject))
		{
			return "Model object model object is an array and test object is not. "+propName;
		}
		if(modelObject.length > testObject.length)
		{
			return "Model object length is greater than the test object length. "+propName;
		}
		if(modelObject.length < testObject.length)
		{
			return "Test object length is greater than the model object length. "+propName;
		}
	}
	
	//walk down through actual object
	var modelPropCount = 0;
    for(var index in modelObject)
    {
        var modelValue = modelObject[index];
        var testValue = testObject[index];
        if(!testValue)
        {
        	return propName;
        }
        var sub = compare(modelValue, testValue, propName+"["+index+"]");
        if(typeof sub != "boolean")
        {
           	return sub;
        }
        modelPropCount++;
    }
    //to get the count of members in the 
    var testPropCount = 0;
    for(var index in testObject)
    {
    	testPropCount++;
    }
    //Are there extra properties/members in the test object?
    if(modelPropCount != testPropCount)
    {
    	return "Model and test object property counts do not match at "+propName;
    }
    return true;
}


function testcompare()
{
	var originalObject = {	
		"0" : ["field1","field2","field5","field6"],
		"1" : ["field3","field4","field7","field8"],
		"2" : ["field9","field10", {"testa":["1","2"]}]
	};

	var testObject = {	
		"0" : ["field1","field2","field5","field6"],
		"1" : ["field3","field4","field7","field8"],
		"2" : ["field9","field10", {"testa":["1","2"]}]
	};

	var result = compare(testObject, originalObject);
	if(typeof result != "boolean")
	{
	    console.error("They are not equal. " + result);
	}
	else
	{
	    console.log("They are equal.");
	}
}

function validateStructure(infoId)
{
	var testObject = { "testautofill" : {	"sharedattributes"	:	{	
			"0" : ["field1","field2","field5","field6"],
			"1" : ["field3","field4","field7","field8"],
			"2" : ["field9","field10"]
		},
		"datastores" : {
			"datastore1" : {
				"typeahead" : {
					"attributes" : ["value","description"],
					"keyattribute":"value"
				},
				"siteorgfilter":"mainrecord",
				"filters" : {
					"f1" : ["f1_1","f1_2"],
					"f2" : ["f2_1","f2_2"],
					"f3" : ["f3_1","f3_2"],
					"f4" : ["f4_1","f4_2"]
				},
				"setvalues" : {
					"sv1" : ["sv1_1","sv1_2"],
					"sv2" : ["sv2_1","sv2_2"],
					"sv3" : ["sv3_1","sv3_2"],
					"sv4" : ["sv4_1","sv4_2"]
				}
			},
			"datastore2" : {
				"typeahead" : {
					"attributes" : ["value","description"],
					"keyattribute":"value"
				},
				"filters" : {
					"f9" : ["f9_1","f9_2"],
					"f10" : ["f10_1","f109_2"]
				},
				"setvalues" : {
					"sv9" : ["sv9_1","sv9_2"],
					"sv10" : ["sv10_1","sv10_2"]
				}
			},
			"datastore3" : {
				"typeahead" : {
					"attributes" : ["value1","description1"],
					"keyattribute":"value1"
				},
				"filters" : {
					"f5" : ["f5_1","f5_2"],
					"f6" : ["f6_1","f6_2"]
				},
				"setvalues" : {
					"sv5" : ["sv5_1","sv5_2"],
					"sv6" : ["sv6_1","sv6_2"]
				}
			},
			"datastore4" : {
				"filters" : {
					"f7" : ["f7_1","f7_2"],
					"f8" : ["f8_1","f8_2"]
				},
				"setvalues" : {
					"sv7" : ["sv7_1","sv7_2"],
					"sv8" : ["sv8_1","sv8_2"],
					"sv8a" : ["sv8_1a","sv8_2a"]
				}
			}
		}
	}};
	
	var result = compare(testObject, autoFillInfo);
	if(typeof result != "boolean")
	{
		console.error("The objects do not match. " + result);
	}
	else
	{
		console.info("The objects match!");
	}
}
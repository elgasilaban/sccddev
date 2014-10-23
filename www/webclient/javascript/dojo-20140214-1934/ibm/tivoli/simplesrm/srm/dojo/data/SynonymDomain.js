//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dojo/data/SynonymDomain", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.SynonymDomain");

dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.SynonymDomain", null,
{
	synonyms: null,
	length: 0,
	
	constructor: function(synonyms) 
	{
		this.synonyms = synonyms;
		if(this.synonyms) {
			this.length = this.synonyms.length;
		} 
	},
	descriptionByValue: function(value)
	{
		var desc = this.fieldByKey("VALUE", "DESCRIPTION", value);
		if(undefined === desc){
			desc = value;
		}
		return desc;
	},
	valueByMaxvalue: function(maxvalue)
	{
		return this.fieldByKey("MAXVALUE", "VALUE", maxvalue);
	},
	fieldByKey: function(keyfield, valfield, keyvalue)
	{
		for(var i = 0; i < this.length; ++i) {
			var s = this.synonyms[i];
			if(keyvalue === s[keyfield]) {
				return s[valfield];
			}
		}
		return null;
	}
});
});

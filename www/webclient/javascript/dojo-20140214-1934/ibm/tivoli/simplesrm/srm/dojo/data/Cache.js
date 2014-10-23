//>>built
// wrapped by build app
define("ibm/tivoli/simplesrm/srm/dojo/data/Cache", ["dijit","dojo","dojox","dojo/require!dojox/collections/Dictionary"], function(dijit,dojo,dojox){
dojo.provide("ibm.tivoli.simplesrm.srm.dojo.data.Cache");

dojo.require("dojox.collections.Dictionary");
/**
 * an object used as associative array is private (accessible only via public methods).
 * each entry contains properties :
 * <ul>		 
 * <li>	value: "some string"</li>
 * <li>	timestamp: 12333333333 - creation time</li>		
 * <li> timeout: 30 - duration in milisec</li>
 * <li>	onPurge: function(){} - callback executed on removal</li>	
 * </ul>
 */
dojo.declare("ibm.tivoli.simplesrm.srm.dojo.data.Cache", null, 
{	
	
	constructor: function(){
		var store = new dojox.collections.Dictionary();
		
		var checkKeyType = function(key){
			if(!dojo.isString(key)) {
				throw new TypeError("key should be string. argument passed: " + key);
			}
		};
		
		
		this.get = function(key){		
			checkKeyType(key);
			
			if(this.isExpired(key)){
				this.remove(key);
			}
			var item = store.item(key)
			return  item ? item.value : undefined;			
		};
		
		this.put = function(key,value,options){
			checkKeyType(key);
			
			if(value === undefined){
				throw new TypeError("illegal value. argument passed: " + value);
			}
			var item = {			
				value: value ,
				timestamp: new Date().getTime()	
			};
			if(options){
				item.timeout = !isNaN(options.timeout) ? options.timeout : undefined;
				item.onPurge = dojo.isFunction(options.onPurge)? options.onPurge : undefined;
			}
			store.add(key,item);
		};
		
		this.isExpired =  function(key){
			checkKeyType(key);
			var item = store.item(key),
				currentTime = new Date().getTime();
			if(item && (item.timeout !== undefined) && (item.timestamp + item.timeout < currentTime)){
				return true;
			}
			return false;
		};
		
		this.remove =  function(key){
			checkKeyType(key);
			var item = store.item(key);
			if (item){
				if(item.onPurge){
					item.onPurge();
				}
				store.remove(key);				
			}
		};
		
		this.removeGroup = function(groupKey) {
			var keys = store.getKeyList(),
				that = this;
			dojo.forEach(keys,function(key){
				if(key.indexOf(groupKey) == 0){
					that.remove(key);
				}
			});			
		};
		
		this.purge = function(){
			var keys = store.getKeyList(),
				that = this;
			dojo.forEach(keys,function(key){
				if(that.isExpired(key)){
					that.remove(key);
				}
			});
		};
		
		this.clear = function(){		
			store.clear();
		};
		
		this.getKeys = function(){
			return store.getKeyList();
		};
		
		this.countKeys = function(){
			var total = store.count;
			return total;
		};
	},
	
	
	/**
	 * @param {String} key
	 * @throws TypeError
	 * @type {Object}
	 */
	get: undefined,
	
	/**
	 * @param {String} key
	 * @param {object} value can be null
	 * @param {Object} options - supported properties: timeout,onPurge.
	 * @throws TypeError
	 * @type {void}
	 */
	put: undefined,
	
	/**
	 * @param {String} key
	 * @return {Boolean} true if element exists and has expired
	 */
	isExpired: undefined,
	
	/**
	 * executes onPurge and removes an entry (deletes property from object)
	 * @param {String} key
	 * @type {void}
	 */
	remove: undefined,
	
	/**
	 * deletes all items having a common prefix of groupKey
	 * @param {String} groupKey
	 * @type {void}
	 */
	removeGroup: undefined,
	
	/**
	 * removes all entries that have expired
	 * @type {void}
	 */
	purge: undefined,
	
	/**
	 * removes all entries without executing onPurge
	 * @type {void}
	 */
	clear: undefined,
	
	/**
	 * count entries in the store
	 * @return {Number}
	 */
	countKeys: undefined
	
});
});

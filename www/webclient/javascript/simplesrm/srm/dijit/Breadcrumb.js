//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Breadcrumb");
dojo.provide("ibm.tivoli.simplesrm.srm.dijit.Morsel");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");

dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Breadcrumb", 
	[dijit._Widget, dijit._Templated, dijit._Container], 
{	
	 
	templateString : "<table style='width:100%'><tbody><tr><td><ul class='bc_list' dojoAttachPoint='containerNode'></ul></td><td align='right' style='vertical-align:top'><img id = '${id}_treeview_nav' src='' alt='m' class='treeview_nav' /></td></tr></tbody></table>",
	
	constructor: function() 
	{
		console.log("Breadcrumb.ctor");
		this.length = 0;
	},
	pushMorsel: function(/*string*/ str, /*ojbect*/ data)
	{
		//Check the breadcrumb for the folder already existing by comparing classstructureid  with the child morsels
		if (data.ClassStructureID) {    //this ListTrees id  //D29365
		   var children = this.getChildren();   //child morsels
		   for(i = 0; i<children.length; i++) {
			   var child = children[i]; //child morsel
			   var lt = child.data;  // morsel's ListTree
			   if (lt && lt.ClassStructureID && lt.ClassStructureID==data.ClassStructureID)
				   return null;  //it's already there		   
		   }
		}
		
		var morsel = new ibm.tivoli.simplesrm.srm.dijit.Morsel({text: str, data: data}, document.createElement('span'));
		
		this.addChild(morsel, "last");
		if(this.getChildren().length == 1) {
			dojo.addClass(morsel.domNode, "first");
		}
		++this.length;
		return morsel;
	},
	popMorsel: function()
	{
		var morsels = this.getChildren();
		if(morsels.length === 0) {
			return;
		}
		var lastMorsel = morsels[morsels.length-1];
		this.removeChild(lastMorsel);
		lastMorsel.destroy();
		--this.length;
	},
	popToMorsel: function(/*Morsel*/morsel) 
	{
		var children = this.getChildren();
		var i,deadMorsel;
		if(typeof morsel == 'object') {
		for(i = children.length-1; i >= 0 ; --i) {
				if(children[i] === morsel){
					break;
				}
				deadMorsel = children[i];
				this.removeChild(deadMorsel);
				deadMorsel.destroy();
			}
		}
		else if(typeof morsel == 'number') {
			for(i = children.length-1; i > morsel; --i) {
				deadMorsel = children[i];
				this.removeChild(deadMorsel);
				deadMorsel.destroy();
			}				
		}
	},
	// events
	// default handler called when any of the morsel's are clicked
	onClick: function(morsel)
	{
		return true;
	},
	
	_dummy:null
});



dojo.declare("ibm.tivoli.simplesrm.srm.dijit.Morsel", 
[dijit._Widget, dijit._Templated, dijit._Contained], 
{	
	templateStringIE : "<li class='breadcrumb_morsel' dojoAttachEvent='ondijitclick:_onclick,onmouseover:_onRollover,onmouseout:_onRollout'><span class='bc_marker'>&#187;</span><span class='breadcrumb_morsel'>${text}</span></li>",
	templateString : "<li class='breadcrumb_morsel' dojoAttachEvent='ondijitclick:_onclick,onmouseover:_onRollover,onmouseout:_onRollout'><span class='breadcrumb_morsel'>${text}</span></li>",
	preamble: function()
	{
	},
	constructor: function() 
	{
		this.text = '';
		this.data = null;
		console.log("morsel.ctor");
	},
	buildRendering: function()
	{
		console.log("morsel.buildRendering(%s)", this.text);
		if(dojo.isIE) {
			this.templateString = this.templateStringIE;
		}
		this.inherited(arguments);
		dojo.attr(this.domNode,"tabindex",0);
	},
	trimRight: function()
	{
		// remove all morsels to the right of me
		this.getParent().popToMorsel(this);
	},
	
	_onRollover: function(evt)
	{
		dojo.addClass(evt.target, 'highlight');
		dojo.style(evt.target, 'cursor', 'pointer');
	},
	_onRollout: function(evt)
	{
		dojo.removeClass(evt.target, 'highlight');
		dojo.style(evt.target, 'cursor', 'default');
	},
	// when user clicks on a morsel
	_onclick: function(evt)
	{
		if(this._isHomeMorsel()) {
			this._onclickhome();
		}
		else if(this.onClick(this)) {
			this.getParent().onClick(this);
		}
	},
	// when user clicks on the "home" morsel
	_onclickhome: function () {
		this.getParent().onClickHome(this);
	},
	onClick: function(morsel) {
		return true;
	},

	
	// ***** helpers ****
	_isHomeMorsel: function() {
		return (this === this.getParent().homeMorsel);
	}
	
});
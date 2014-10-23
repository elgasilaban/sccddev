dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator",
		[ dijit._Widget, dijit._Templated ],
		{
		// summary:
		//		A spacer between two `dijit.Toolbar` items
		templateString: '<div class="mapTbSep dijitInline" waiRole="presentation"></div>',
		postCreate: function(){ dojo.setSelectable(this.domNode, false); },
		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}

	});



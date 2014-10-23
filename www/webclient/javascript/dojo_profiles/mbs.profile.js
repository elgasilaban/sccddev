dependencies = {
	"cssOptimize" : "comments.keepLines",
	"layers" : [
		{
			"name" : "../layers/mbs/popuplayer.js",
			"resourceName" : "layers.mbs.popuplayer",
			"dependencies" : [
				"dijit._base",
				"dijit._base.place",
				"dijit._base.focus",
				"dijit._base.scroll",
				"dijit._base.sniff",
				"dijit._base.typematic",
				"dijit._base.wai",
				"dijit._base.window",
				"dijit._base.popup",
				"dijit.Tooltip",
				"dijit.Dialog",
				"dojo.dnd.Moveable",
				"dojo.dnd.Mover",
				"dojo.dnd.TimedMoveable",
				"dojo.dnd.move",
				"dojo.main",
				"dojo.number",
				"dojo.regexp",
				"dojo.require",
				"dojo.text",
				"ibm.tivoli.mbs.dijit.SubTooltipDialog",
				"ibm.tivoli.mbs.dijit.SubDialog",
				"ibm.tivoli.mbs.html"
			]
		},
		{
			"name" : "../layers/mbs/richtexteditor.js",
			"resourceName" : "layers.mbs.richtexteditor",
			"layerDependencies" : [ "layers.mbs.popuplayer" ],
			"dependencies" : [
				"dijit.Editor",
				"dijit._editor.plugins.FontChoice",
				"dijit._editor.plugins.LinkDialog",
				"dijit._editor.plugins.TextColor",
				"dijit._editor.plugins.ViewSource",
				"dojox.editor.plugins.ToolbarLineBreak",
				"ibm.tivoli.mbs.dijit.editor.plugins.SpellCheck",
				"ibm.tivoli.mbs.dijit.editor.plugins.TpaeLinkDialog",
				"ibm.tivoli.mbs.dijit.editor.plugins.TpaePasteFromWord",
				"ibm.tivoli.mbs.dijit.editor.TpaeTextEditor"
			]
		},
		{
			"name" : "../layers/mbs/startcenter.js",
			"resourceName" : "layers.mbs.startcenter",
			"layerDependencies" : [ "layers.mbs.popuplayer" ],
			"dependencies" : [
				"dojox.charting.action2d.Highlight",
				"dojox.charting.action2d.Magnify",
				"dojox.charting.action2d.MoveSlice",
				"dojox.charting.action2d.Tooltip",
				"dojox.charting.axis2d.Default",
				"dojox.charting.Chart",
				"dojox.charting.plot2d.Columns",
				"dojox.charting.plot2d.Lines",
				"dojox.charting.plot2d.Pie",
				"dojox.charting.widget.Chart",
				"dojox.charting.widget.Legend",
				"dojox.gfx",
				"dojox.gfx.shape",
				"dojox.gfx.path",
				"dojox.widget.gauge.AnalogArrowIndicator",
				"dojox.widget.gauge.AnalogNeedleIndicator",
				"ibm.tivoli.mbs.dijit.kpi.DialGauge"
			]
		},
		{
			"name" : "../layers/mbs/calendar.js",
			"resourceName" : "layers.mbs.calendar",
			"layerDependencies" : [ "layers.mbs.popuplayer" ],
			"dependencies" : [
				"dijit.Calendar", 
				"dijit._TimePicker",
				"dijit.form.ComboButton",
				"dijit.form.ToggleButton",
				"dojo.cldr.supplemental",
				"dojo.date.locale",
				"dojo.date",
				"dojo.i18n",
				"ibm.tivoli.mbs.dijit.DateTimeCalendar",
				"ibm.tivoli.mbs.dijit.form.DateTimeTextBox"
			]
		},
		{
			"name" : "../ibm/tivoli/mbs/debug/Console.js"
		}
	],

	"prefixes" : [ 
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "layers", "../layers" ],
		[ "ibm", "../../../webmodule/webclient/javascript/ibm", "../../../webmodule/webclient/javascript/dojo_profiles/emptycopyright.txt"]
	]
}
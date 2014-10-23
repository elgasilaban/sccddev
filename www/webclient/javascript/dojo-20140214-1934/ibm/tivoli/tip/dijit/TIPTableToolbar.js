//>>built
// wrapped by build app
define("ibm/tivoli/tip/dijit/TIPTableToolbar", ["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated,dijit/Toolbar,ibm/tivoli/tip/dijit/TIPTableSearchField"], function(dijit,dojo,dojox){
/******************************************************* {COPYRIGHT-TOP-OCO} ***
 * Licensed Materials - Property of IBM
 *
 * 5724-C51
 *
 * (C) Copyright IBM Corp. 2007 All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 ******************************************************* {COPYRIGHT-END-OCO} ***/
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.Toolbar");

dojo.require("ibm.tivoli.tip.dijit.TIPTableSearchField");

dojo.provide("ibm.tivoli.tip.dijit.TIPTableToolbar");

/******************************************************************************
* A dijit.Toolbar and a TIPTableSearchField combined into one.
*
* Authors: Joseph Firebaugh
******************************************************************************/
dojo.declare("ibm.tivoli.tip.dijit.TIPTableToolbar",
            [ dijit._Widget, dijit._Templated ],
{
  widgetsInTemplate: true,
  
  templateString:"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"tableToolbar\">\n<tr>\n\t<td class=\"TIPTableToolbarArea\">\n\t<div dojoType=\"dijit.Toolbar\" dojoAttachPoint=\"toolbar\" class=\"tableToolbarArea\" ></div>\n\t</td>\n    <td class=\"TIPTableSearchFieldArea\">\n    <div dojoType=\"ibm.tivoli.tip.dijit.TIPTableSearchField\" dojoAttachPoint=\"searchField\"></div>\n    </td>\n</tr>\n</table>",
  
  getToolbar: function()
  {
    return this.toolbar;
  },
  
  destroy: function()
  {
  	this.searchField.destroy();
  	this.toolbar.destroy();
  	
  	this.inherited( arguments );
  }    
});

});

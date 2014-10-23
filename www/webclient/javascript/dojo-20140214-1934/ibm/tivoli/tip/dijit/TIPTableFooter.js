//>>built
// wrapped by build app
define("ibm/tivoli/tip/dijit/TIPTableFooter", ["dijit","dojo","dojox","dojo/i18n!ibm/tivoli/tip/dijit/nls/resources","dojo/require!dijit/_Widget,dijit/_Templated"], function(dijit,dojo,dojox){
/******************************************************* {COPYRIGHT-TOP-OCO} ***
 * Licensed Materials - Property of IBM
 *
 * 5724-C51
 *
 * (C) Copyright IBM Corp. 2008 All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 ******************************************************* {COPYRIGHT-END-OCO} ***/
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

// NLS
dojo.requireLocalization("ibm.tivoli.tip.dijit", "resources");

dojo.provide("ibm.tivoli.tip.dijit.TIPTableFooter");
/******************************************************************************
* The footer for the TIP Table
*
* Authors: Joseph Firebaugh, Joshua Allen
******************************************************************************/
dojo.declare("ibm.tivoli.tip.dijit.TIPTableFooter",
            [ dijit._Widget, dijit._Templated ],
{
  widgetsInTemplate: true,

  templateString:"<table class=\"tableFooter\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n\t<tbody>\n\t\t<tr class=\"isc-table-footer\" dir=\"ltr\">\n\t\t\t<td class=\"isc-table-footer-cap-l\" valign=\"bottom\" nowrap=\"nowrap\" align=\"left\">\n\t\t\t</td>\n\t\t\t<td class=\"isc-table-footer-data\" width=\"100%\" nowrap=\"nowrap\" align=\"left\"> \n\t\t\t\t<div dojoType=\"dijit.Toolbar\" dojoAttachPoint=\"toolbar\" class=\"tableToolbarArea\" ></div>\n\t\t\t</td>\t\t\t\n\t\t\t<td class=\"isc-table-footer-data\" nowrap=\"nowrap\" valign=\"middle\" align=\"right\"> \n\t\t\t\t<div dojoAttachPoint=\"infoArea\" class=\"footerLabel\"></div>\n\t\t\t</td>\n\t\t\t<td class=\"isc-table-footer-cap-r\" valign=\"bottom\" nowrap=\"nowrap\" align=\"right\">\n\t\t\t</td>\n\t\t</tr>  \n\t</tbody>\n</table>\n",
  
  //the dojox.Grid that this footer belongs to
  table: null,
  
  constructor: function () 
  {
    this.resources_ = dojo.i18n.getLocalization("ibm.tivoli.tip.dijit", "resources");    
  },
  
  postCreate: function()
  {
    if ( this.table !== null )
    {
      this.setTable( this.table );
    }        
  },
  
  setTable: function( table )
  {
    this.table = table;
    
    this._rowClickListener = dojo.connect( this.table, "onRowClick", this, "_onRowClick");            
    this._updateListener   = dojo.connect( this.table, "setModel",   this, "_onRowClick" );            
    
  },
  
  _onRowClick: function()
  {      
    var numSelected = 0;
    var totalRows   = 0;
    
    if ( this.table.model )
    {
		if (this.table.model.getRealRowCount) {
			totalRows = this.table.model.getRealRowCount();
		} else {
			totalRows = this.table.model.getRowCount();
		}
    }

    numSelected = this.table.selection.getSelectedCount();
    
    this.updateFooter( numSelected, totalRows );
  },
    
  updateFooter: function( numSelected, totalRows )
  {
    this.setInfoAreaHTML( dojo.string.substitute( this.resources_.TABLE_FOOTER_TEXT, { 0: numSelected, 1: totalRows } ) );  
  },
  
  setInfoAreaHTML: function ( html )
  {
    this.infoArea.innerHTML = html;
  },
  
  destroy: function()
  {
    if ( this._rowClickListener ) { dojo.disconnect( this._rowClickListener ); }
    if ( this._updateListener )   { dojo.disconnect( this._updateListener ); }
    
    this.toolbar.destroy();
    
    this.inherited( "destroy", arguments );
  }  
});

});

/*
 *
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-R46
 *
 * (C) COPYRIGHT IBM CORP. 2006,2007
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
  *
 */
 

/*
 *  RDP javascript functions 
 *
 *  To use, add the following to component jsp:
 *  <script type="text/javascript" src="<%=servletBase%>/javascript/sc_library.js"></script>
 *  or 
 *   call addLoadMethod('addOnJsFiles("<%=servletBase%>/javascript/sc_library.js");');  
 *
 * When this file gets loaded, the context (window) is different from when the function 
 * is invoked. So we store the function in parent (window)
 * Notes:
 * - removed background shadow from css
 * - removed left connector to make it look like maximo help box
*/ 

// Display tooltip help text. If an image is specified, then the text is
// parsed (key/values) and displayed vertically. Otherwise it is displayed on one line. 
//var md;
//if (parent)
//   md=parent;
//else
//   md=window;   

//MAINDOC.TooltipShow=
//md.TooltipShow = 
parent.TooltipShow=
function TooltipShow(target, e, image) {  
   //debugger;  
   //parent.console.log("in TooltipShow");  
   //window.alert("in tt");

   //Any text to display?    
   var text = target.getAttribute("tooltip");
   //var text = target.getAttribute("rdptitle");
   if (!text) return;
   text = text.replace(/^\s+|\s+$/g, ''); //trim
   
   var x = e.clientX;
   var y = e.clientY;   

   //parent.console.log("get doc");
   var doc;
   if(MAINDOC == parent)
    	doc = MAINDOC.document;
    else
    	doc = MAINDOC;        
   //parent.console.dir(doc);
      
   
   //Handle scrollbars
   if (window.innerWidth) { 
      x = x + window.pageXOffset; 
      y = y + window.pageYOffset;
   } else if (doc.documentElement && doc.documentElement.clientWidth!=null) {
      
      x = x + doc.documentElement.scrollLeft;
      y = y + doc.documentElement.scrollTop; 
   } else if (doc.body && doc.body.clientWidth!=null) {      
      x = x + doc.body.scrollLeft;
      y = y + doc.body.scrollTop;
   }                       
   
   // Add the offsets so the tooltip doesn't appear right under the mouse
   x +=2;  // left: pixels to the right of the mouse pointer old value=+35
   y = y+30;   // top: pixels below the mouse pointer was (was 0)     old value =-3

   // global var that holds div for tooltip
   tooltip = doc.createElement("div"); 
   
   var content = doc.createElement("div"); // create div for tooltip content   
   tooltip.appendChild(content);       // add content div to shadow div 
   
   //tooltip connector (only if we have an image)
   if (image!=null && image.length>0) {
      var tooltipcon= doc.createElement("div"); // create div for tooltip connector
      tooltip.appendChild(tooltipcon);       // add connector 
      tooltipcon.style.position = "absolute";     // absolutely positioned
      tooltipcon.id="rdptooltipcon";
      //tooltipcon.className = "tooltipShadow";     // so we can style it                
      //position tooltip    
      tooltipcon.style.left = -21 + "px";        // Set the position.
      tooltipcon.style.top = 0 + "px";  //was -8
      tooltipcon.style.visibility = "visible"; // Make it visible.
   
      var tt_con_image = doc.createElement("img"); // create image
      tt_con_image.src="../webclient/images/tooltipConnectorLeft.gif";
      tt_con_image.width="14";
      tt_con_image.height="14";
      tt_con_image.border="0";
      tooltipcon.appendChild(tt_con_image);       // append image       
   }
         
   
   var tt_table = doc.createElement("table"); // create table
   content.appendChild(tt_table);                //Append table to content
   var tt_tbody = doc.createElement("tbody"); // create tbody
   tt_table.appendChild(tt_tbody);
   
   var tt_tr = doc.createElement("tr");  //create table row
   tt_tbody.appendChild(tt_tr);           //Append row to table
   
   //Do we have an image? If so, display data in vertical list
   if (image!=null && image.length>0) {
      var tt_td1 = doc.createElement("td");  //table data
      tt_tr.appendChild(tt_td1);              //append td to tr
      var tt_image = doc.createElement("img"); // create image

      tt_image.src="../webclient/images/" + image;
      tt_image.width="50";
      tt_image.height="50";
      tt_td1.appendChild(tt_image);       // append image to td    
      
      var tt_br1 = doc.createElement("br");  
      var tt_br2 = doc.createElement("br");  
      tt_td1.appendChild(tt_br1);
      tt_td1.appendChild(tt_br2);
      
      //Now process data as vertical list of key values
      var tt_td2 = doc.createElement("td");  //table data
      tt_tr.appendChild(tt_td2);              //append td to tr
      var tdata = "<table border='0' cellpadding='0' cellspacing='1'> <tbody>";

      //split CI attributes into array
      var attrArray = text.split(";");

      for (var i=0; i<attrArray.length;i++) {
          var  keyValue = attrArray[i].split(":=");
          if (keyValue.length==2 && keyValue[1]!=null && keyValue[1]!="") {                    
             tdata = tdata.concat("<tr>","<td style='padding-right: 5px'>","<b>",keyValue[0],": ","</b>","</td>");
             tdata = tdata.concat("<td>",keyValue[1],"</td>", "</tr>");
          } else
             tdata = tdata.concat("<tr", "<td>", attrArray[i],"</td>","</tr>");         
      }

      tdata = tdata.concat("</tbody>", "</table>");
      tt_td2.innerHTML = tdata;      
      
    } else {  //No image
	    var tt_td2 = doc.createElement("td");  //table data
	    tt_tr.appendChild(tt_td2);      
   
	    var tt_text = doc.createElement("div"); // create div for help text
	    tt_td2.appendChild(tt_text); 
   
	    //Display text on one line
	    tt_text.innerHTML = text;             // Set the text of the tooltip.
    }         
   
   content.style.position = "relative";     // relatively positioned
   content.className = "tooltipContent";    // so we can style it   

   tooltip.style.position = "absolute";     // absolutely positioned
   tooltip.style.visibility = "hidden";     // starts off hidden
   tooltip.id="rdptooltip";
   tooltip.className = "tooltipShadow";     // so we can style it          
      
   //position tooltip
   tooltip.style.left = x + "px";        // Set the position.
   tooltip.style.top = y + "px";
   tooltip.style.visibility = "visible"; // Make it visible.

   // Add the tooltip to the document 
   //if (tooltip.parentNode != doc.body)
   doc.body.appendChild(tooltip);   
}


//Hide and remove tooltip from doc 
parent.TooltipHide =
function TooltipHide(target, e) { 
var doc;
   if(MAINDOC == parent)
    	doc = MAINDOC.document;
    else
    	doc = MAINDOC;            

  // if (tooltip && tooltip!=null)
  //    tooltip.style.visibility = "hidden";  // Make it invisible.
      
   var tt = doc.getElementById('rdptooltip');
   if (tt)
        doc.body.removeChild(tt);   //remove it        
    
}

	
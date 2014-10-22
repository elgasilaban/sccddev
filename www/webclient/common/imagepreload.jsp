<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	if(!wcs.wereImagesPreLoaded())
	{
		wcs.setImagesPreLoaded(true);
%>		<script>
			/* preload images for speed */
			new function() 
			{
				var imagePath = "<%=IMAGE_PATH%>";
				var preloadImages = [
						/* Tabs */
						"tabs/row.gif", "tabs/sub_row.gif", "tabs/off.gif", "designer/formtabon_selected.gif", "tabs/over.gif",
						/* Toolbar */
						"tb_button_highlight.gif",
						/* Menu */
						"menus/menusub.gif",
						/* Async */
						"async/working.gif", "async/edited.png", "async/error.png", "async/warning.png", "async/question.png", "async/smartfill.png"];
				
				for(var i=0;i<preloadImages.length;i++)
				{
					var image = new Image();
					image.src = imagePath + preloadImages[i];
				}
			}();
		</script>
<%	}	%>
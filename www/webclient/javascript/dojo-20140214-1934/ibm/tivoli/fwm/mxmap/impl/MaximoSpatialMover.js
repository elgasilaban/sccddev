//>>built
// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/MaximoSpatialMover", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2012
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover");

/**
 * This Dojo class is a helper class to reduce the amount of code in the
 * mxn.maximospatial.core.js file. It has the responsibility of provide drag and
 * drop capability to the Marker.
 * 
 * @author thadeurc
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.MaximoSpatialMover", null, {
	isMouseOver: false,
	isMouseDown: false,
	originX: 0.0,
	originY: 0.0,
	_wasDragged: false,
	_graphic: null,
	map: null,
	_LIMIT_TO_PAN_PXS: 40,
	_connections: [],
	constructor: function(options)
	{
		dojo.mixin(this, options);
		this._connections = [];
		this._wasDragged = false;
	},
	_isGraphicDraggable: function(graphic)
	{
		return (graphic != null && graphic.mapstraction_marker != null && graphic.mapstraction_marker.draggable == true);
	},
	_onMouseOver: function(e)
	{
		dojo.stopEvent(e);
		e.target.style.cursor = 'pointer';
	},
	_onMouseDown: function(e)
	{
		if (this._isGraphicDraggable(e.graphic) == true)
		{
			dojo.publish("startedUserInteractionOnMap", [ {
				objectSource: this,
				objectSourceName: 'MaximoSpatialMover',
				eventName: 'mousedown'
			} ]);
			e.target.style.cursor = 'move';
			this.map.disableMapNavigation();
			this.isMouseDown = true;
			this._graphic = e.graphic;
			this.originX = e.mapPoint.x;
			this.originY = e.mapPoint.y;
			// use 2% and 3% as limit for pan
			this._LIMIT_TO_PAN_VERTICAL = Math.ceil(this.map.height * 0.03) + 32;
			this._LIMIT_TO_PAN_HORIZONTAL = Math.ceil(this.map.width * 0.02) + 32;
		}

	},
	_onMouseDrag: function(e)
	{
		if (this.isMouseDown == true)
		{
			dojo.stopEvent(e);
			// make the map move along the mouse cursor
			this._move(e);
			this._ensureInsideMap(e);
			this._wasDragged = true;
		}
	},
	_ensureInsideMap: function(e)
	{
		var x = e.screenPoint.x;
		var y = e.screenPoint.y;
		var screenCenter = this.map.toScreen(this.map.extent.getCenter());
		var newX = screenCenter.x;
		var newY = screenCenter.y;
		var deltaX = newX;
		var deltaY = newY;

		// need to move to the right?
		if (this.map.width - x <= this._LIMIT_TO_PAN_HORIZONTAL)
		{
			deltaX = newX + (this._LIMIT_TO_PAN_HORIZONTAL * 4);
		}
		// need to move to the left?
		else if (x <= this._LIMIT_TO_PAN_HORIZONTAL)
		{
			deltaX = newX - (this._LIMIT_TO_PAN_HORIZONTAL * 4);
		}

		// need to move down?
		if (this.map.height - y <= this._LIMIT_TO_PAN_VERTICAL)
		{
			deltaY = newY + (this._LIMIT_TO_PAN_VERTICAL * 4);
		}
		// need to move up?
		else if (y <= this._LIMIT_TO_PAN_VERTICAL)
		{
			deltaY = newY - (this._LIMIT_TO_PAN_VERTICAL * 4);
		}
		// do we need to shift the map ?
		if (newX != deltaX || newY != deltaY)
		{
			var shiftPosition = this._calculateShiftForMarker(deltaX - newX, deltaY - newY);
			this._shiftMapCenter(deltaX, deltaY);
			this._shiftMarker(shiftPosition);
		}
	},
	_shiftMarker: function(shiftPosition)
	{
		this._doMove(shiftPosition.x, shiftPosition.y);
	},
	_move: function(e)
	{
		this._doMove(e.mapPoint.x, e.mapPoint.y);
	},
	// diffX and diffY represents how much the center of the map
	// was shifted
	// in screen units. We calculate how much map units we need
	// to shift the
	// cursor in map units, which is the unit that
	// graphic.offset receives.
	_calculateShiftForMarker: function(diffX, diffY)
	{
		// needs to calculate based on the map shift
		// shift on map was done in screen units. Need to have
		// the logic below to
		// make the appropriate conversions
		var posCursor = new esri.geometry.Point(this.originX, this.originY, this.map.sr);
		var posCursorOnScreen = this.map.toScreen(posCursor);
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Cursor on Screen: ", posCursorOnScreen);
		}
		var posCursorOnScreenUpdated = new esri.geometry.Point(posCursorOnScreen.x + diffX, posCursorOnScreen.y + diffY, this.map.sr);
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Cursor on Screen After Delta: ", posCursorOnScreenUpdated);
		}
		return this.map.toMap(posCursorOnScreenUpdated);
	},
	_shiftMapCenter: function(deltaX, deltaY)
	{
		var posCenter = new esri.geometry.Point(deltaX, deltaY);
		var latLngCenter = this.map.toMap(posCenter);
		this.map.centerAt(latLngCenter);
	},
	_doMove: function(toMapPointX, toMapPointY)
	{
		var deltaX = (toMapPointX - this.originX);
		var deltaY = (toMapPointY - this.originY);
		var movedGeom = this._graphic.geometry.offset(deltaX, deltaY);
		this.originX = toMapPointX;
		this.originY = toMapPointY;
		this._graphic.setGeometry(movedGeom);
	},
	_onMouseUp: function(e)
	{
		if (this._isGraphicDraggable(e.graphic) == true)
		{
			dojo.stopEvent(e);
			this.isMouseDown = false;
			this._wasDragged = false;
			this.originX = 0.0;
			this.originY = 0.0;
			this.map.enableMapNavigation();
			e.target.style.cursor = 'pointer';
			this._graphic = null;
		}
	},
	_onMapMouseOut: function(e)
	{
		// handles the case where the user moved the cursor out
		// of the map
		// in this case we 'release' the mouse click to avoid
		// strange behavior
		if (this.isMouseDown == true)
		{
			this._onMouseDragEnd(e);
			this._onMouseUp(e);
		}
	},
	_onMouseDragEnd: function(e)
	{
		if (this.isMouseDown == true && this._wasDragged == true)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[MaximoSpatialMover] Marker Point left at: ", this._graphic.geometry);
			}
			var marker = this._graphic.mapstraction_marker;
			marker.dragend.fire({
				marker: marker,
				newLocation: {
					lng: this._graphic.geometry.x,
					lat: this._graphic.geometry.y
				}
			});
		}
		dojo.publish("endedUserInteractionOnMap", [ {
			objectSource: this,
			objectSourceName: 'MaximoSpatialMover',
			eventName: 'mouseDragEnd'
		} ]);
	},
	installListenersOn: function(graphics)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Connecting listeners");
		}
		this._connections.push(dojo.connect(graphics, "onMouseDown", dojo.hitch(this, this._onMouseDown)));
		this._connections.push(dojo.connect(graphics, "onMouseUp", dojo.hitch(this, this._onMouseDragEnd)));
		this._connections.push(dojo.connect(graphics, "onMouseUp", dojo.hitch(this, this._onMouseUp)));
		this._connections.push(dojo.connect(graphics, "onMouseDrag", dojo.hitch(this, this._onMouseDrag)));
		this._connections.push(dojo.connect(this.map, "onMouseDrag", dojo.hitch(this, this._onMouseDrag)));
		this._connections.push(dojo.connect(this.map, "onMouseOut", dojo.hitch(this, this._onMapMouseOut)));
		this._connections.push(dojo.connect(this.map, "onMouseUp", dojo.hitch(this, this._onMapMouseOut)));
	},
	disconnectInstalledListeners: function()
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MaximoSpatialMover] Disconnecting listeners");
		}
		for ( var link in this._connections)
		{
			dojo.disconnect(this._connections[link]);
		}
		this._connections = [];
	}
});
});

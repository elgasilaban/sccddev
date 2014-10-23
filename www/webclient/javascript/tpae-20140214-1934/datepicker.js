/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18
 * 
 * (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

	var datePickerDialog,datePickerField;
	var datePickerPattern="";
	
	/**
	 * Sets picker to current date and time 
	 * If an object is passed it will use it's dojovalue attribute to get the long date, otherwise it uses the local machines time
	 */
	setDate = function(fld)
	{
		if(!fld)
		{
			if(hebrew)
			{
				calDate = new dojox.date.hebrew.Date();
			}
			else if(islamic)
			{
				calDate = new dojox.date.islamic.Date();
			}
			else
			{
				calDate = new Date;
			}
		}
		else
		{
			var dateClass = fld.getAttribute("datePackage")? fld.getAttribute("datePackage")+".Date" : "Date";
			var dateClassObj = dojo.getObject(dateClass, false);
			var val = fld.getAttribute("dojovalue");
			if(val!="")
				calDate = new dateClassObj(parseInt(val));
			else
				calDate = new Date;
		}
		updateDisplays(calDate);
	}
	
	/**
	 * Hide / show time fields and display
	 * @param vis - boolean visible
	 */
	hideShowTime = function(vis)
	{
		var pickerTime = dojo.byId(datePickerId+"_time");
		if(pickerTime)
			pickerTime.style.display=vis?"":"none";
		var timeDisplay = dojo.byId(datePickerId+"_dpFullTime");
		if(timeDisplay)
			timeDisplay.style.display=vis?"":"none";
		var timeSep = dojo.byId(datePickerId+"_timesep");
		if(timeSep)
			timeSep.style.display=vis?"":"none";
	}

	hideShowDate = function(vis)
	{
		var pickerDate = dojo.byId(datePickerId+"_date");
		if(pickerDate)
			pickerDate.style.display=vis?"":"none";
	}
	
	/**
	 * used to adjust a portion of the date. Once done this will update all fields on the date picker. 
	 * @param portion what part to update - values:{month,day,year,hour,minute,AMPM}
	 * @param adj increment to use
	 */
	adjustDate = function(portion, adj)
	{
		switch(portion)
		{
			case "month":
				var curMonth = calDate.getMonth();
								
				var targetMonth = curMonth+adj;
				var calMonths = 12;
				if(hebrew){
					if(dojox.date.hebrew.Date().isLeapYear(calDate.getFullYear()))
					{
						calMonths = 13;
					}		
				}
				if(targetMonth>calMonths-1)
				{
					targetMonth=targetMonth-calMonths;
				}
				else if(targetMonth<0)
				{
					targetMonth=targetMonth+calMonths;
				}
				
				calDate.setMonth(targetMonth);
				
				//Hebrew Months >=5 are offset if it's not a leap year
				//Setting to month 5 will result in month 6, 7->8, etc.
				if(hebrew && targetMonth>=5 && !dojox.date.hebrew.Date().isLeapYear(calDate.getFullYear()))
				{
					targetMonth++;
				}
				
				while(calDate.getMonth()!=targetMonth)
				{
					calDate.setDate(calDate.getDate()-1);
				}
				break;
			case "day":
				calDate.setDate(calDate.getDate()+adj);
				break;
			case "year":
				calDate.setFullYear(calDate.getFullYear()+adj);
				break;
			case "hour":
				calDate.setHours(calDate.getHours()+adj);
				break;
			case "minute":
				var mins = calDate.getMinutes();
				var mod = Math.abs(mins%adj);
				if(mod==0)
				{
					mins=mins+adj; //fits in increment
				}
				else
				{
					if(adj>0)
					{
						mins=(15-mod+mins);
					}
					else
					{
						mins=mins-mod;
					}
				}
				/* Use this block to stop the minute adjustment from scrolling the hour
				if(mins<0)
					mins=60+mins;
				else if(mins==60)
					mins=0;
				*/
				calDate.setMinutes(mins);
				break;
			case "AMPM":
				var UTCHour = calDate.getUTCHours();
				var day = calDate.getDate(); 
				if(UTCHour>12)//was PM, make it AM
					UTCHour-=12;
				else
					UTCHour+=12;
				calDate.setUTCHours(UTCHour);
				calDate.setDate(day); //Adjusting the AM/PM adjusts the date. we don't want that.
				break;
		}
		updateDisplays(calDate);
	}

	/**
	 * Calls methods to update the individual parts of the picker
	 * @param date - the date we will use to update
	 */
	updateDisplays = function(date) 
	{
		updateField(date,"month");
		updateField(date,"day");
		updateField(date,"year");
		updateField(date,"hour");
		updateField(date,"minute");
		updateField(date,"AMPMbutton");
		updateDateString(date);
	}
	
	updateDateString = function(date)
	{
		//Does top full displays
		var fd = dojo.byId(datePickerId+"_dpFullDate");
		var value="";
		if(!fd)
			return;

		var showTime=false;
		var showDate=false;
		var options =  dojo.fromJson(datePickerField.getAttribute("constraints"));
		if(options!=null && options!="")
		{
			if(!undef(options.timePattern))
				showTime=true;
			
			if(!undef(options.datePattern))
				showDate=true;
		}
		
		if(showDate)
		{
			if(hebrew)
			{
				date = new dojox.date.hebrew.Date().fromGregorian(date);
				value = dojox.date.hebrew.locale.format(date, {
					selector: "date",
					formatLength: "full"
				});
			}
			else if(islamic)
			{
				date = new dojox.date.islamic.Date().fromGregorian(date);
				value = dojox.date.islamic.locale.format(date, {
					selector: "date",
					formatLength: "full"
				});
			}
			else
			{
				value = dojo.date.locale.format(date, {
					selector: "date",
					formatLength: "full"
				});
			}
		}
		if(showTime)
		{
			value+="&nbsp;";
			if(hebrew)
			{
				date = new dojox.date.hebrew.Date().fromGregorian(date);
				value+= dojox.date.hebrew.locale.format(date, {
					selector: "time",
					formatLength: "short"
				});
			}
			else if(islamic)
			{
				date = new dojox.date.islamic.Date().fromGregorian(date);
				value+= dojox.date.islamic.locale.format(date, {
					selector: "time",
					formatLength: "short"
				});
			}
			else
			{
				value+= dojo.date.locale.format(date, {
					selector: "time",
					formatLength: "short"
				});
			}
		}
		fd.innerHTML=value;
	}

	/**
	 * Calls methods to update the individual parts of the picker
	 * @param date - the date we will use to update
	 * @param fldId - id of field to update
	 * @return
	 */
	updateField = function(date,fldId)
	{
		var fld = dojo.byId(datePickerId+"_"+fldId);
		if(!fld)
			return;
		var pattern = fld.getAttribute("pattern");
		if(pattern!=null && pattern!="")
		{
			var newValue;
			if(hebrew)
			{
				date = new dojox.date.hebrew.Date().fromGregorian(date);
				newValue = dojox.date.hebrew.locale.format(date, {
					selector: "date",
					datePattern: pattern
				});
			}
			else if(islamic)
			{
				date = new dojox.date.islamic.Date().fromGregorian(date);
				newValue = dojox.date.islamic.locale.format(date, {
					selector: "date",
					datePattern: pattern
				});
			}
			else
			{
				newValue = dojo.date.locale.format(date, {
					selector: "date",
					datePattern: pattern
				});
			}
			
			if(hebrew && fldId=="year")
				newValue = dojox.date.hebrew.numerals.getYearHebrewLetters(date.getFullYear());
			if(hebrew && fldId=="day")
				newValue = date.getDateLocalized();
			
			if(fld.tagName=="INPUT")
				fld.value=newValue;
			else
				fld.innerHTML="&nbsp;"+newValue+"&nbsp;";
		}
	}
	
	/**
	 * Clears out the field that opened the date picker and closes the picker
	 */
	clearParent = function()
	{
		datePickerField.value="";
		datePickerField.setAttribute("dojoValue","");
		input_forceChanged(datePickerField);
		closeDatePicker();
	}
	
	/**
	 * Updates the field that opened the date picker and closes the picker
	 */
	updateDPParent = function()
	{
		var selectEvent=datePickerField.getAttribute("selectevent");
		if(!undef(selectEvent))
		{
			sendEvent(selectEvent,datePickerField.id,calDate.valueOf());
		}
		else
		{
			var newValue = dojo.date.locale.format(calDate, {
				selector: "date",
				datePattern: datePickerPattern
			});
			datePickerField.value=newValue;
			datePickerField.setAttribute("dojoValue",calDate.valueOf());
			input_forceChanged(datePickerField);
		}
		closeDatePicker();
	}
	
	/**
	 * Pops picker open near field
	 * @param fld - ui object on which we should pop the datepicker
	 */
	showDatePicker = function(fld) 
	{
		if(!fld)
			return;
		if(datePickerField!=null)
			closeDatePicker();
		datePickerField=fld;
		var first = false;
		var options = dojo.fromJson(fld.getAttribute("constraints"));
		if(options!=null && options!="") //This block goes before the creation of the popup so that it will work the first time the popup is opened
		{
			datePickerPattern=""; //reset this each time we pop it open
			if(!undef(options.datePattern))
			{
				datePickerPattern=options.datePattern;
				hideShowDate(true);
			}
			else
				hideShowDate(false);
			
			
			if(!undef(options.timePattern))
			{
				if(!undef(datePickerPattern))
					datePickerPattern=datePickerPattern+" ";
				datePickerPattern+=options.timePattern;
				hideShowTime(true);
			}
			else
				hideShowTime(false);
			
		}
		if(!datePickerDialog)
		{
			var pickerHolder = dojo.byId(datePickerId+"_holder");
			if(pickerHolder)
			{
				datePickerDialog = new dijit.TooltipDialog({
					id: datePickerId+'_outer', 
					content: pickerHolder.innerHTML 
				});
			}
			pickerHolder.innerHTML="";
			first = true;
		}
		datePickerDialog.startup();
		pop=dijit.popup.open({
			popup: datePickerDialog, around: fld
		});
		if(first)
		{
			try
			{
				dojo.byId(datePickerId).parentNode.style.padding="0px";
				dojo.byId(datePickerId).parentNode.parentNode.style.padding="0px";
			}
			catch(error)
			{
				//safety 
			}
		}
		setDate(fld);
	}
	
	/**
	 * Closes the date picker 
	 */
	closeDatePicker = function()
	{
		if(datePickerDialog != null)
		{
			dijit.popup.close(datePickerDialog); //We really only want to hide it as it will be re-used
		}
		if(datePickerField)
		{
			datePickerField.focus();
			datePickerField=null;
		}
	}
<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	//TODO DATEPICKER - all strings must come from DB
	String[] resources = {wcs.getMessage("messagebox","MSG_BTNCURRENT"),wcs.getMessage("messagebox","MSG_BTNCLEAR"),wcs.getMessage("messagebox","MSG_BTNOK"),wcs.getMessage("messagebox","MSG_BTNCANCEL")};
	String datePickerId = id+"_datepicker";
	String up = "<img src='"+IMAGE_PATH+"datepicker/up.png'/>";
	String down = "<img src='"+IMAGE_PATH+"datepicker/down.png'/>";
	int minuteIncrement = 15;
%><%!

	boolean dateIs24Hour(String timePattern){
    if (timePattern.indexOf('a')<0)
       return true;
    else
       return false;
	}

	String getDateOrder(String datePattern, String defaultAlign){
    int day = datePattern.indexOf('d');
    int month = datePattern.indexOf('M');
    int year = datePattern.indexOf('y');

    String dateOrder = "";

    if(day<month && day<year){
      if(month<year)
        dateOrder = "dmy";
      else
        dateOrder = "dym";
    }

    if(month<day && month<year){
      if(day<year)
        dateOrder = "mdy";
      else
        dateOrder = "myd";
    }

    if(year<day && year<month){
      if(day<month)
        dateOrder = "ydm";
      else
        dateOrder = "ymd";
    }

    if(defaultAlign.equals("right"))
       dateOrder = new StringBuffer(dateOrder).reverse().toString();
    return dateOrder;

  }

	String getHourFormat(String timePattern){
    String[] hourPattern = {"HH","hh","H","h"};
    for(int x=0; x<hourPattern.length; x++){
       if (timePattern.indexOf(hourPattern[x])>-1){
          return hourPattern[x];
       }
    }
    return "";
  }

  	String renderDateFields(String id, String up, String down, String datePattern, String defaultAlign)
	{

    String month = renderDateField(id, "month", 3, "", up, down,1,"MMM").toString();
    String day = renderDateField(id, "day", 2, "", up, down,1,"d").toString();
	  String year = renderDateField(id, "year", 4, "", up, down,1,"yyyy").toString();
    if(getDateOrder(datePattern,defaultAlign).equals("mdy"))
       return month + day + year;
    else if(getDateOrder(datePattern,defaultAlign).equals("dmy"))
       return day + month + year;
    else if(getDateOrder(datePattern,defaultAlign).equals("ymd"))
       return  year + month + day;
    else if(getDateOrder(datePattern,defaultAlign).equals("ydm"))
       return  year + day + month;
    else if(getDateOrder(datePattern,defaultAlign).equals("myd"))
       return  month + year + day;
    else if(getDateOrder(datePattern,defaultAlign).equals("dym"))
       return  day + year + month;



    return "";
  }

	String renderTimeFields(String id, String up, String down, String timePattern){
		String hour = renderDateField(id, "hour", 2, "", up, down,1,getHourFormat(timePattern)).toString();
		String minute = renderDateField(id, "minute", 2, "", up, down,15,"mm").toString();
		String ampm = renderAMPMButton(id, timePattern).toString();
		return hour + minute + ampm;
	}


	String renderDateField(String id, String type, int size, String value, String up, String down, int increment, String pattern)
	{
		String htmlOut ="				<td class='fld_td'>"+
										"<table role='presentation'>"+
											"<tr>"+
												"<td>"+
													"<button onclick='javascript: adjustDate(\""+type+"\", "+increment+")' class='cal_btn tiv_btn_top'>"+up+"</button>"+
												"</td>"+
											"</tr>"+
											"<tr>"+
												"<td>"+
													"<input readonly tabindex='-1' pattern='"+pattern+"' id='"+id+"_"+type+"' type='text' fldtype='+type+' class='date_fld' size='"+size+"' value='"+value+"'/>"+
												"</td>"+
											"</tr>"+
											"<tr>"+
												"<td>"+
													"<button onclick='javascript: adjustDate(\""+type+"\", -"+increment+")' class='cal_btn tiv_btn_bottom'>"+down+"</button>"+
												"</td>"+
											"</tr>"+
										"</table>"+
									"</td>";
		return htmlOut;
	}

	String renderAMPMButton(String id, String timePattern)
	{
		if (dateIs24Hour(timePattern))
	    	return "";

		String htmlOut ="			 <td class='fld_td'>"+
										"<div id='AMPM'><button id='"+id+"_AMPMbutton' pattern='a' onclick='javascript: adjustDate(\"AMPM\",null)' class='cal_btn tiv_btn'></button></div>"+
									"</td>";
		return htmlOut;
	}
%>
		<div id="<%=datePickerId%>_holder" style="display:none;">
			<table role="presentation" id="<%=datePickerId%>" cellspacing="1" onclick="dojo.stopEvent(event)" style="margin:0px" border="0" summary="" class="mainContent">
				<tbody>
					<tr>
						<td aria-hidden="true" class="datedisplay" colspan="2" id="<%=datePickerId%>_dpFullDate" style="padding-<%=defaultAlign%>:15px;">
							&nbsp;
						</td>
					</tr>
					<tr>
						<td id="<%=datePickerId%>_date" style="width:50%;vertical-align:top" align="center">
							<table role="presentation" style="margin-left:10px;margin-right:10px">
								<tr>
									<%=renderDateFields(datePickerId, up, down, datePattern, defaultAlign)%>
								</tr>
							</table>
							<br/><br/>
						</td>
						<td id="<%=datePickerId%>_time" style="width:50%;vertical-align:top" align="center">
							<table role="presentation" style="margin-left:10px;margin-right:10px">
								<tr>
									<%=renderTimeFields(datePickerId, up, down,timePattern)%>
								</tr>
							</table>
							<br/><br/>
						</td>
					</tr>
					<tr>
						<td class="date_footer" colspan="2" style="padding-left: 10px; padding-right:10px;">
							<table role="presentation" style="width:100%">
								<tr>
									<td>
										<button onclick="javascript: setDate()" class="tiv_btn foot_btn"><%=resources[0]%></button>
									</td>
									<td style="width:100%">
									</td>
									<td style="white-space: nowrap">
										<button onclick="javascript: clearParent()" class="tiv_btn foot_btn"><%=resources[1]%></button>
										<button onclick="javascript: updateDPParent()" class="tiv_btn foot_btn"><%=resources[2]%></button>
										<button onclick="javascript: closeDatePicker()" class="tiv_btn foot_btn"><%=resources[3]%></button>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<script>
			datePickerId = "<%=datePickerId%>";
			dojo.require("layers.mbs.calendar");
			dojo.addOnLoad(function() {	
				dojo.require("dojo.date.locale");
				if(dojo.locale.match(/^he(?:-.+)?$/))
				{
	                dojo.require("dojox.date.hebrew");
	                dojo.require("dojox.date.hebrew.locale");
	                dojo.require("dojox.date.hebrew.Date");
					hebrew = true;
				}
				else
					hebrew = false;
	
				if(dojo.locale.match(/^ar(?:-.+)?$/))
				{
	                dojo.require("dojox.date.islamic");
	                dojo.require("dojox.date.islamic.locale");
					islamic = true;
				}
				else
					islamic = false;
			});
		</script>
<%--
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 5724-U18
* (C) COPYRIGHT IBM CORP. 2011 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	String DATE_REGEX = wcs.getRegexPattern(MXFormat.DATE); 
	String DATETIME_REGEX = wcs.getRegexPattern(MXFormat.DATETIME);
	String TIME_REGEX = wcs.getRegexPattern(MXFormat.TIME);
	String INTEGER_REGEX = wcs.getRegexPattern(MXFormat.INTEGER); 
	String DECIMAL_REGEX = wcs.getRegexPattern(MXFormat.DECIMAL);
	//duration currently allows a comma,dot or :
	String DURATION_REGEX = wcs.getRegexPattern(MXFormat.DURATION);
	String AMOUNT_REGEX = wcs.getRegexPattern(MXFormat.AMOUNT);
%><script>
	//supported data types
	var CS_VALIDATE_OK_LABEL = "<%=wcs.getMessage("messagebox","MSG_BTNOK")%>";
	var CS_VALIDATE_REVERT = "<%=wcs.getMessage("messagebox","MSG_BTNGOBACK")%>";
	var DATA_TYPES = {
		"date":<%=MXFormat.ALN%>,
		"upper":<%=MXFormat.UPPER%>,
		"lower":<%=MXFormat.LOWER%>,
		"date":<%=MXFormat.DATE%>,
		"datetime":<%=MXFormat.DATETIME%>,
		"time":<%=MXFormat.TIME%>,
		"integer":<%=MXFormat.INTEGER%>,
		"smallint":<%=MXFormat.SMALLINT%>,
		"bigint":<%=MXFormat.BIGINT%>,
		"decimal":<%=MXFormat.DECIMAL%>,
		"float":<%=MXFormat.FLOAT%>,
		"duration":<%=MXFormat.DURATION%>,
		"amount":<%=MXFormat.AMOUNT%>
	};
	var NUMERIC_CHARS = new Array("\\.",",","-"," ");
	var DATA_TYPE_ERRORS = {
		<%=MXFormat.DATE%>:"<%=wcs.getClientSideMessage("system","invaliddate")%>",
		<%=MXFormat.DATETIME%>:"<%=wcs.getClientSideMessage("system","invaliddatetime")%>",
		<%=MXFormat.TIME%>:"<%=wcs.getClientSideMessage("system","invalidtime")%>",
		<%=MXFormat.INTEGER%>:"<%=wcs.getClientSideMessage("system","invalidnumberint")%>",
		<%=MXFormat.SMALLINT%>:"<%=wcs.getClientSideMessage("system","invalidnumberint")%>",
		<%=MXFormat.BIGINT%>:"<%=wcs.getClientSideMessage("system","invalidnumberint")%>",
		<%=MXFormat.FLOAT%>:"<%=wcs.getClientSideMessage("system","invalidnumberintdec")%>",
		<%=MXFormat.DECIMAL%>:"<%=wcs.getClientSideMessage("system","invalidnumberintdec")%>",
		<%=MXFormat.DURATION%>:"<%=wcs.getClientSideMessage("system","invalidduration")%>",
		<%=MXFormat.AMOUNT%>:"<%=wcs.getClientSideMessage("system","invalidamount")%>",
		"length":"<%=wcs.getClientSideMessage("system","maximumlength")%>",
		"decimaltoolong":"<%=wcs.getClientSideMessage("system","DecimalTooLong")%>",
		"domainvalidation":"<%=wcs.getClientSideMessage("ui","domainvalidation")%>"
	};
	//TODO - Move some of these cached into WCR?
	function buildRegexArray()
	{
		var DATE_REGEX = new RegExp(/<%=DATE_REGEX%>/i);
		var DATETIME_REGEX = new RegExp(/<%=DATETIME_REGEX%>/i);
		var TIME_REGEX = new RegExp(/<%=TIME_REGEX%>/i);
		var INTEGER_REGEX = new RegExp(/<%=INTEGER_REGEX%>/);
		var DECIMAL_REGEX = new RegExp(/<%=DECIMAL_REGEX%>/);
		var DURATION_REGEX = new RegExp(/<%=DURATION_REGEX%>/);
		return {
			<%=MXFormat.DATE%>:[INTEGER_REGEX,DATE_REGEX],
			<%=MXFormat.DATETIME%>:[INTEGER_REGEX,DATE_REGEX,DATETIME_REGEX],
			<%=MXFormat.TIME%>:[INTEGER_REGEX,TIME_REGEX,DECIMAL_REGEX],
			<%=MXFormat.INTEGER%>:[INTEGER_REGEX],
			<%=MXFormat.SMALLINT%>:[INTEGER_REGEX],
			<%=MXFormat.BIGINT%>:[INTEGER_REGEX],
			<%=MXFormat.FLOAT%>:[INTEGER_REGEX,DECIMAL_REGEX],
			<%=MXFormat.DECIMAL%>:[INTEGER_REGEX,DECIMAL_REGEX],
			<%=MXFormat.DURATION%>:[DECIMAL_REGEX,DURATION_REGEX],
			<%=MXFormat.AMOUNT%>:[INTEGER_REGEX,DECIMAL_REGEX]
		};
	}
	var DATA_TYPE_REGEX = buildRegexArray();
</script>
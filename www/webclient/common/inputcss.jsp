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
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%
	String readOnlyClass="";
	String readOnly="";
	boolean isReadonly = (boundComponent!=null && boundComponent.isReadOnly());
	boolean isQueryField = (boundComponent!=null && boundComponent.isQuery());
	String stringvalue = "";
	exceptionClass="";
	boolean onTableRow = component.isOnTableRow();
	boolean onCurrentRow = true;
	boolean onFilterRow = onfilterrow.equals("true");
	String ariaString = "";
	if(isReadOnly)
	{
		ariaString+=" aria-readonly=\"true\"";
	}
	else if(isRequired)
	{
		ariaString+=" aria-required=\"true\"";
	}

	if (boundComponent != null)
	{
		stringvalue = WebClientRuntime.makesafevalue(boundComponent.getString());
		onCurrentRow = boundComponent.isOnCurrentRow();
	}
	if(component.getProperty("input").equalsIgnoreCase("true"))
	{
		cssclass = textcss+" "+cssclass;
		//unbound always show the same
		if(dataType==-1 && !component.getProperty("isunbound").equalsIgnoreCase("true"))
		{
			cssclass+=" iu ";
			if(!async)
				cssclass+=" ib";
			component.setProperty("inputmode","readonly");
			size=9;
		}
		else
		{
			boolean isRowDeleted =false;
			if (boundComponent != null)
				isRowDeleted=boundComponent.isRowDeleted();
			if(onTableRow)
			{
				cssclass+=" tt";
				if(onCurrentRow || onFilterRow)
				{
					if(!async)
						cssclass+=" ib";
					if(!async && isReadonly)
						cssclass+=" readonly";
				}
				else
				{
					cssclass+=" tib";
				}
			}
			else
			{
				if(!async)
					cssclass+=" ib";
				if(component.getType().equals("textarea"))
					cssclass+="ta";
			}
			if(isRowDeleted)
			{
				cssclass+=" trd ";
				trd=" trd ";
				isReadonly=true;
			}
		}
		if(isReadonly || designmode)
		{
			readOnly="readonly=\"readonly\"";
			if(!async && isReadonly)
				readOnlyClass="readonly";

			if(accessibilityMode)
				tabindex="0";
			else
				tabindex="-1";

			if(!onTableRow || designmode)
			{
				cssclass+=" "+readOnlyClass;
				if(designmode)
					cssclass+=" cur_h";
			}
			exceptionClass="fld fld_ro";
		}
		if(!designmode)
		{
			if(focused)
			{
				cssclass+=" ff"+readOnlyClass;
			}
			if(isMasked)
			{
				cssclass+=" masked";
				tabindex="-1";
			}
		}
		if(isQueryField && !control.getType().equals("toolbarcombobox")) {
			cssclass+=" queryField";
		}
		if(isRequired && !isReadOnly)
		{
			exceptionClass="fld fld_req";
		}
		//we don't want to mark table rows for readonly, required, etc if they are not the current row.
		if(!designmode && onTableRow && !onCurrentRow && !onFilterRow)
		{
			exceptionClass="";
		}
	}
%>
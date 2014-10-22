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
--%><%!
	//******************************************************************************
	// File: fieldsizegroups.jsp : to be included for creating the hashtable storing
	//							   the fieldsize group for each data type to be displayed
	//							   in a textbox
	//******************************************************************************
	//HTML input size = round(maxattribute.length*FIELD_SIZE_FACTOR)
	// with maximum of FIELD_SIZE_MAXIMUM
	static final double FIELD_SIZE_FACTOR = 1;
	static final double TABLECOL_SIZE_FACTOR = 2.25;
	static final int FIELD_SIZE_MAXIMUM = 64;
	//Static DATE_FIELD_SIZE & DATE_TIME_FIELD_SIZE due to date formatting
	static final int DATE_FIELD_SIZE = 8;
	static final int DATE_TIME_FIELD_SIZE = 17;
	static final int TIME_FIELD_SIZE = 8;
	//used to pad fields when they are displayed in a table
	static final int FIELD_PADDING = 35;
	static final int TABLECOL_SIZE_DEFAULT = 65;

	static final int FIELD_TYPE_ALN = 0;
	static final int FIELD_TYPE_UPPER = 1;
	static final int FIELD_TYPE_LOWER = 2;
	static final int FIELD_TYPE_DATE = 3;
	static final int FIELD_TYPE_DATETIME = 4;
	static final int FIELD_TYPE_TIME = 5;
	static final int FIELD_TYPE_INTEGER = 6;
	static final int FIELD_TYPE_SMALLINT = 7;
	static final int FIELD_TYPE_FLOAT = 8;
	static final int FIELD_TYPE_DECIMAL = 9;
	static final int FIELD_TYPE_DURATION = 10;
	static final int FIELD_TYPE_AMOUNT = 11;
	static final int FIELD_TYPE_YORN = 12;
	static final int FIELD_TYPE_GL = 13;
	static final int FIELD_TYPE_LONGALN = 14;
	static final int FIELD_TYPE_CRYPTO = 15;
	static final int FIELD_TYPE_CLOB = 16;
	static final int FIELD_TYPE_BLOB = 17;

	//Hashtable for storing the field sizes, THE VALUES SHOULD BE IN THE ASCENDING ORDER
	//The key is type of field and the value is the hashtable containing the ranges.
	//For each of the data types,
		//If the fieldsize is less than the first group size then it will use the first group size
		//If the fieldsize is greater than first group but less than next group size then it ueses the next group size
		//If the field is greater than the last group then use the last group size
%>
<%
	Hashtable fieldsizegroups = new Hashtable();
	Hashtable fieldtypegroup = null;
	//For ALN, LOWER, UPPER field types
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("2"), new Integer("2"));
    fieldtypegroup.put(new Integer("30"), new Integer("10"));
    fieldtypegroup.put(new Integer("31"), new Integer("40"));
    fieldsizegroups.put(new Integer(FIELD_TYPE_ALN).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_LOWER).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_UPPER).toString(), fieldtypegroup);
    //For AMOUNT, CRYPTO, DECIMAL, FLOAT field types
    fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("12"), new Integer("10"));
    fieldsizegroups.put(new Integer(FIELD_TYPE_AMOUNT).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_CRYPTO).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_DECIMAL).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_FLOAT).toString(), fieldtypegroup);
	//for INTEGER
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("2"), new Integer("2"));
    fieldsizegroups.put(new Integer(FIELD_TYPE_INTEGER).toString(), fieldtypegroup);
	//for BLOB, CLOB, LONGALN field types
    fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("100"), new Integer("100"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_BLOB).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_CLOB).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_LONGALN).toString(), fieldtypegroup);
	//for DATE 
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("10"), new Integer("10"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_DATE).toString(), fieldtypegroup);
    //for DATETIME 
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("17"), new Integer("17"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_DATETIME).toString(), fieldtypegroup);
	//for TIME
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("5"), new Integer("5"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_TIME).toString(), fieldtypegroup);
    //for DURATION, SMALLINT
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("2"), new Integer("2"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_DURATION).toString(), fieldtypegroup);
    fieldsizegroups.put(new Integer(FIELD_TYPE_SMALLINT).toString(), fieldtypegroup);
    //for GL
	fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("10"), new Integer("10"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_GL).toString(), fieldtypegroup);
	//for YORN
    fieldtypegroup = new Hashtable();
	fieldtypegroup.put(new Integer("2"), new Integer("2"));
	fieldsizegroups.put(new Integer(FIELD_TYPE_YORN).toString(), fieldtypegroup);
%>
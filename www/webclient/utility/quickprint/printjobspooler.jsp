<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2006, 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%@ page contentType="text/html;charset=UTF-8" session="true" import="java.util.Vector,java.util.*,psdi.webclient.system.runtime.WebClientRuntime"%>
<%
	
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); // Proxy request
	Vector printabledocs = (Vector)session.getAttribute("doclinks");
	Hashtable msDocs = new Hashtable();
	String message  = (String)session.getAttribute("printmessage");
	String errmessage  = (String)session.getAttribute("printerrmsg");
	String rptype  = (String)session.getAttribute("reporttype");
	String twopasspdf  = (String)session.getAttribute("twopasspdf");
	String printdebug  = (String)session.getAttribute("printdebug");
	String printwait = (String)session.getAttribute("printwait");
	String securedattachment= (String)session.getAttribute("securedattachment");
	String baseurl=(String)session.getAttribute("baseurl");
	String tokenurl= baseurl+request.getContextPath()+"/servlet/SilentPrintServlet?doaction=22&emptyparam=0";
	session.removeAttribute("doclinks");
	session.removeAttribute("printmessage");
	session.removeAttribute("reporttype");
	String appletBase = "../quickprint";
	boolean activeXDocs = false;
	int noOfIframes=5;
	//System.out.println ("File Size "+ printabledocs.size()); 
	String maximourl = "";
    	String proxyHost = WebClientRuntime.getWebClientProperty("proxy_hostname");
    	String proxyPort = WebClientRuntime.getWebClientProperty("proxy_port");
    	if (proxyHost != null && ! proxyHost.trim().equals("") ) 
    	{  	  	
    		if (proxyPort != null) 
    		{
    			if (proxyPort.trim().equals("443") || proxyPort.trim().equals("80")|| proxyPort.trim().equals(""))
    				proxyPort = "";
    			else 
    				proxyPort = ":"+proxyPort;
    		}

    		maximourl = request.getScheme()+"://"+proxyHost.trim()+proxyPort.trim();   	

    	}  			
	//System.out.println ("URL "+ maximourl); 
%>

<html>

<BODY>
<!--
USE SIGNED VERSIONS OF JAR FILES IF NEEDED
JARS ARE IN maximouiweb\webmodule\webclient\applets\quickprint
ALSO CHANGE THE JAR NAMES BELOW (ARCHIVE and CODE) TO THE SIGNED JAR FILE NAMES
-->
<img src="../../images/printprogressbar.gif" alt=""/>
<br>
<b><%=message%></b>
<br><br><br><br><br><br><br><br>


<!--[if !IE]>-->
<OBJECT classid="java:com.ibm.tivoli.maximo.report.applet.quickprint.SilentPrint.class"
		type="application/x-java-applet"
		height="0"
		width="0">
    	<PARAM NAME="mayscript" VALUE="true">
        <PARAM NAME="type" VALUE="application/x-java-applet;version=1.5.0">
        <PARAM NAME="name" VALUE="Maximo DirectPrint">
        <PARAM NAME="alt" VALUE="Maximo DirectPrint">
        <PARAM NAME="ARCHIVE" VALUE="<%=appletBase%>/QuickPrint.jar">
        <PARAM NAME="cache_option" VALUE="Plugin">
	    <PARAM NAME="reporttype" VALUE="<%=rptype%>">  
        <PARAM NAME="dummyPrint" VALUE="false">
        <PARAM NAME="printdebug" VALUE="<%=printdebug%>">
        <PARAM NAME="printwait" VALUE="<%=printwait%>">
        <PARAM NAME="twopasspdf" VALUE="<%=twopasspdf%>">  
		<PARAM NAME="noOfIframes" VALUE="<%=noOfIframes%>">  
		<PARAM NAME="securedattachment" value="<%=securedattachment%>">
		<PARAM NAME="tokenurl" value="<%=tokenurl%>/">
		
    <%	
	int paramCount = printabledocs.size();
	int docCount = -1;
	for (int i=0;i < paramCount;i++)
	{ 
		String doc = (String)printabledocs.elementAt(i);
		if (doc.startsWith("\\\\")) 
		{
			doc = "file:"+doc.replaceAll("\\\\", "/");	
			doc = doc.replace("//", "/");	
		} else if (! doc.startsWith("http"))
		{
		   doc = maximourl + doc;	
		}		
		if(!(doc.toUpperCase().endsWith(".DOC") 
		|| doc.toUpperCase().endsWith(".XLS")
		|| doc.toUpperCase().endsWith(".PPT")
		|| doc.toUpperCase().endsWith(".DOCX")
		|| doc.toUpperCase().endsWith(".XLSX")
		|| doc.toUpperCase().endsWith(".PPTX")
		))
		{
			docCount += 1;
			if (doc.toUpperCase().indexOf(".PDF") > -1) 
			{
			   if (twopasspdf.equals("1")) 
			   {
				doc =request.getContextPath()+"/servlet/SilentPrintServlet?doaction=3&url="+doc;
			   } else {
					if(securedattachment.equals("0") || securedattachment.equals("false"))
				         doc =request.getContextPath()+"/servlet/SilentPrintServlet?doaction=1&url="+doc;
			   }
			}
			//System.out.println("File "+ doc);			
	%>
	<PARAM NAME="param_docfile_<%=i%>" VALUE="<%=doc%>">	
	<%
		} else if (rptype != null && rptype.equals("PAD")) {
			activeXDocs = true;
	%>
	<PARAM NAME="param_docfile_<%=i%>" VALUE="printMSObjects(<%=i%>)">	
	<%		
		}
	}
    %>

<!--<![endif]-->
<OBJECT 
	CLASS="SilentPrint"
	id="SilentPrint"
	NAME="SilentPrint"
	mxpart="applet"
	codeBase="<%=appletBase%>"
    	width="0" height="0"
    	classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93">
    	<PARAM NAME="mayscript" VALUE="true">
        <PARAM NAME="type" VALUE="application/x-java-applet;version=1.5.0">
        <PARAM NAME="name" VALUE="Maximo DirectPrint">
        <PARAM NAME="alt" VALUE="Maximo DirectPrint">
        <PARAM NAME="CODE" VALUE="com.ibm.tivoli.maximo.report.applet.quickprint.SilentPrint">
        <PARAM NAME="ARCHIVE" VALUE="<%=appletBase%>/QuickPrint.jar">
        <PARAM NAME="cache_option" VALUE="Plugin">
	    <PARAM NAME="reporttype" VALUE="<%=rptype%>">  
        <PARAM NAME="dummyPrint" VALUE="false">
        <PARAM NAME="printdebug" VALUE="<%=printdebug%>">
        <PARAM NAME="printwait" VALUE="<%=printwait%>">
        <PARAM NAME="twopasspdf" VALUE="<%=twopasspdf%>"> 
        <PARAM NAME="noOfIframes" VALUE="<%=noOfIframes%>">	
		<PARAM NAME="securedattachment" value="<%=securedattachment%>">
		<PARAM NAME="tokenurl" value="<%=tokenurl%>/">		
    <%	
	paramCount = printabledocs.size();
	docCount = -1;
	for (int i=0;i < paramCount;i++)
	{ 
		String doc = (String)printabledocs.elementAt(i);
		if (doc.startsWith("\\\\")) 
		{
			doc = "file:"+doc.replaceAll("\\\\", "/");	
			doc = doc.replace("//", "/");	
		} else if (! doc.startsWith("http"))
		{
		   doc = maximourl + doc;	
		}		
		if(!(doc.toUpperCase().endsWith(".DOC") 
		|| doc.toUpperCase().endsWith(".XLS")
		|| doc.toUpperCase().endsWith(".PPT")
		|| doc.toUpperCase().endsWith(".DOCX")
		|| doc.toUpperCase().endsWith(".XLSX")
		|| doc.toUpperCase().endsWith(".PPTX")		
		))
		{
			docCount += 1;
			if (doc.toUpperCase().indexOf(".PDF") > -1) 
			{
			   if (twopasspdf.equals("1")) 
			   {
				doc =request.getContextPath()+"/servlet/SilentPrintServlet?doaction=3&url="+doc;
			   } else {
					if(securedattachment.equals("0") || securedattachment.equals("false"))
				        doc =request.getContextPath()+"/servlet/SilentPrintServlet?doaction=1&url="+doc;
			   }
			}
			//System.out.println("File "+ doc);						
	%>
	<PARAM NAME="param_docfile_<%=i%>" VALUE="<%=doc%>">	
	<%
		} else if (rptype != null && rptype.equals("PAD")) {
			activeXDocs = true;
	%>
	<PARAM NAME="param_docfile_<%=i%>" VALUE="printMSObjects(<%=i%>)">	
	<%		
		}
	}
    %>
</OBJECT>
<!--[if !IE]>-->
</OBJECT>
<!--<![endif]-->
   <%
	for (int il=0;il < paramCount;il++)
	{ 
		String doc1 = (String)printabledocs.elementAt(il);
		if (doc1.startsWith("\\\\")) 
		{
			doc1 = "file:"+doc1.replaceAll("\\\\", "/");	
			doc1 = doc1.replace("//", "/");	
		} else if (! doc1.startsWith("http"))
		{
				   doc1 = maximourl + doc1;	
		}			
		if(activeXDocs && (doc1.toUpperCase().endsWith("DOC") 
		|| doc1.toUpperCase().endsWith("XLS")
		|| doc1.toUpperCase().endsWith("PPT")
		|| doc1.toUpperCase().endsWith("DOCX")
		|| doc1.toUpperCase().endsWith("XLSX")
		|| doc1.toUpperCase().endsWith("PPTX")		
		) && (!msDocs.containsKey(doc1)))
		{
			msDocs.put(doc1,Integer.toString(il));		
		}
	}
    %>	
<!--Use to render and invoke adobe reader to print PDF -->    

<%	
	for (int pdfLoop=1;pdfLoop <= noOfIframes;pdfLoop++)
	{ 
	%>
<IFRAME id="pdfRender<%=pdfLoop%>" name="pdfRender<%=pdfLoop%>" width=350 height=340 src="">
</IFRAME>
<%
	}
%>


</BODY>
<% 
if (activeXDocs) {
%>
<!--Use of ACTIVEX to print microsoft documents-->
<% 
} // endifactivex
%>



<SCRIPT>
var msword ;
var msexcel ;
var msppt ;
<% 
if (activeXDocs) {
%>
function printMSObjects(docnum,token)
{
	self.focus();
<%	
	for (int iLoop=0;iLoop < paramCount;iLoop++)
	{ 
		String doc2 = (String)printabledocs.elementAt(iLoop);
		if (doc2.startsWith("\\\\")) { 
			doc2 = "file:"+doc2.replaceAll("\\\\", "/");	
			doc2 = doc2.replace("//", "/");			
		} else if (! doc2.startsWith("http"))
		{
		   doc2 = maximourl + doc2;	
		}		
		if(doc2.toUpperCase().endsWith("DOC") 
		|| doc2.toUpperCase().endsWith("XLS")
		|| doc2.toUpperCase().endsWith("PPT")
		|| doc2.toUpperCase().endsWith("DOCX")
		|| doc2.toUpperCase().endsWith("XLSX")
		|| doc2.toUpperCase().endsWith("PPTX")				
		)
		{	
		   String printFunc = "printDOC"; //Default word document
		   if (doc2.toUpperCase().endsWith("XLS") || doc2.toUpperCase().endsWith("XLSX") )  printFunc = "printXLS";
		   if (doc2.toUpperCase().endsWith("PPT") || doc2.toUpperCase().endsWith("PPTX") )  printFunc = "printPPT";
%>
			if (docnum == <%=iLoop%>)
			{
				<%=printFunc%>("<%=doc2%>"+token);
			}
<%
		}
	}
	msDocs.clear();
%>
}
// ADDED TO REPLACE POWERTEAM ACTIVEX FOR MS DOCS ISSUE 10-10685
function printDOC(inDoc) {
	if (msword==null) {
		msword=new ActiveXObject('Word.Application');
		msword.Visible = false;
	}
	if (msword != null)
	{
		var doc = msword.Documents.Open(inDoc,false,true);
		doc.PrintOut();
		doc.Close(0);
	}
}


function printPPT(inPpt) {
	if (msppt==null) {
		msppt=new ActiveXObject('Powerpoint.Application');
	}
	if (msppt != null)
	{
		var doc = msppt.Presentations.Open(inPpt,false,false,false);
		doc.PrintOut();
		doc.Close(0);
	}
}


function printXLS(inXls) {
	if (msexcel==null) {
		msexcel=new ActiveXObject('Excel.Application');
		msexcel.Visible = false;
	}
	if (msexcel != null)
	{
		var doc = msexcel.Workbooks.Open(inXls,false,true);
		doc.PrintOut();
		doc.Close(0);
	}
}

<% 
} // endifactivex
%>

<!-- PRINT PDF BY USING ACROBAT READER -->

<%	
	for (int pdfLoop=1;pdfLoop <= noOfIframes;pdfLoop++)
	{ 
	%>
function printPDF<%=pdfLoop%>(inPDFDoc)
{	
	inPDFDoc=inPDFDoc.replace('/n','%0A');
	inPDFDoc=inPDFDoc.replace('/r','%0D');
	document.getElementById('pdfRender<%=pdfLoop%>').src=inPDFDoc;
}
<%
	}
%>


<!--CLOSE BROWSER FUNCTION-->	
function closeWindow()
{
	if (msword !=null) msword.Quit();
	if (msexcel !=null) msexcel.Quit();
	if (msppt !=null) msppt.Quit();
	self.close();
}
<!--CLOSE BROWSER FUNCTION-->
function showErrorMessage()
{
	if (msword !=null) msword.Quit();
	if (msexcel !=null) msexcel.Quit();
	if (msppt !=null) msppt.Quit();
	alert("<%=errmessage%>");
	self.close();
}

</SCRIPT>
</html>
<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2012 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="org.w3c.dom.Document"%>
<%
%><%@page import="java.io.StringReader"
%><%@page import="java.io.StringWriter"
%><%@page import="java.io.Writer"
%><%@page import="javax.xml.transform.Result"
%><%@page import="javax.xml.transform.Source"
%><%@page import="javax.xml.transform.dom.DOMSource"
%><%@page import="javax.xml.transform.stream.StreamResult"
%><%@page import="javax.xml.transform.stream.StreamSource"
%><%@page import="javax.xml.transform.OutputKeys"
%><%@page import="javax.xml.transform.Transformer"
%><%@page import="javax.xml.transform.TransformerFactory"
%><%!final String stylesheet = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
								+ "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">"
								+ 	"<xsl:output method=\"xml\" version=\"1.0\" indent=\"yes\"/>"
								+	"<xsl:strip-space elements=\"*\"/>"
								+ 	"<xsl:template match=\"node()|@*\">"
								+ 		"<xsl:copy>"
								+ 			"<xsl:apply-templates select=\"node()|@*\"/>"
								+ 		"</xsl:copy>"
								+ 	"</xsl:template>"
								+ "</xsl:stylesheet>";

	String xmlFormat(String xml) throws Exception
	{
		StringWriter writer = new StringWriter();
		xmlFormat(xml, writer);
		return writer.toString();
	}

	String xmlFormat(Document doc) throws Exception
	{
		StringWriter writer = new StringWriter();
		xmlFormat(new DOMSource(doc), new StreamResult(writer));
		return writer.toString();
	}

	void xmlFormat(String xml, Writer writer) throws Exception
	{
		xmlFormat(new StreamSource(new StringReader(xml)), new StreamResult(writer));
	}

	void xmlFormat(Source source, Result result) throws Exception
	{
		final TransformerFactory factory = TransformerFactory.newInstance();
		final Source xslSource = new StreamSource(new StringReader(stylesheet));
		final Transformer transformer = factory.newTransformer(xslSource);
		//final Transformer transformer = factory.newTransformer();
		transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");

		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		transformer.setOutputProperty("{http://xml.apache.org/xalan}indent-amount", "4");
		transformer.transform(source, result);
	}%>
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
	componentEvents+=" onmousedown='setExactClickPosition(event,this);mxd_onmousedown(event,getElement(\""+id+"\"),\""+control.getType()+"\");' ";
	componentEvents+=" onmouseup='mxd_onmouseup(event,getElement(\""+id+"\"),\""+control.getType()+"\");' ";
	componentEvents+=" onmousemove='mxd_onmousemove(event,getElement(\""+id+"\"));' ";
	componentEvents+=" onmouseover='mxd_onmouseover(event,getElement(\""+id+"\"),\""+control.getType()+"\");' ";
	componentEvents+=" onmouseout='mxd_onmouseout(event,getElement(\""+id+"\"));' ";

	componentEvents+=" ondragstart='cancelevent()'";
	componentEvents+=" ondragenter='cancelevent()'";
	componentEvents+=" ondragover='cancelevent()'";
	componentEvents+=" ondragleave='cancelevent()'";
	componentEvents+=" ondrop='cancelevent()'";
%>
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
--%><%
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.runtime.AppDescriptor"
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.beans.DataBean"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.erm.EntityRelationshipModel"
%><%@page import="psdi.webclient.system.erm.UIERMEntity"
%><%@page import="psdi.common.erm.ERMEntity"
%><%@page import="psdi.util.MXException"
%><%@page import="java.rmi.RemoteException"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.util.Date"
%><%@page import="java.util.Map"
%><%@page import="java.util.Map.Entry"
%><%@page import="java.util.zip.ZipEntry"
%><%@page import="java.util.zip.ZipOutputStream"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%!
JSONObject encodeEntity(UIERMEntity entity, String id, boolean includeProperties, AppInstance app) throws MXException, RemoteException
{
	JSONObject json = new JSONObject();

	String name = entity.getName();
	DataBean bean = app.getDataBean(name);

	json.put("loaded", bean != null);
	json.put("label", name);
	json.put("id", id);
	json.put("beanId", name);
	
	if(includeProperties)
	{
		JSONArray properties = encodeEntityProperties(app, name);
		if(properties != null)
		{
			json.put("properties", properties);
		}
	}

	JSONArray jsonChildren = new JSONArray();
	int count = 0;
	
	if (bean != null)
	{
		// add the mboset child
		JSONObject mboSetJson = new JSONObject();
		mboSetJson.put("label", "MboSet");
		mboSetJson.put("mboset", true);
		mboSetJson.put("id", id + "." + count++);
		mboSetJson.put("beanId", name);
		jsonChildren.add(mboSetJson);
	}
	
	for(ERMEntity childEntity: entity.getChildEntities())
	{
		JSONObject childJSON = encodeEntity((UIERMEntity)childEntity, id + "." + count++, includeProperties, app);
		jsonChildren.add(childJSON);
	}

	if(jsonChildren.size() > 0)
	{
		json.put("children", jsonChildren);
	}

	return json;
}

JSONObject createProperty(String name, Object value)
{
	JSONObject json = new JSONObject();
	json.put("property", name);
	json.put("value", value);
	return json;
}

JSONObject createProperty(String name, Object[] values)
{
	JSONObject json = new JSONObject();
	json.put("property", name);
	JSONArray array = new JSONArray();
	for(Object value: values)
	{
		array.add(value);
	}
	json.put("value", array);
	return json;
}

JSONArray encodeEntityProperties(AppInstance app, String beanId) throws MXException, RemoteException
{
	DataBean bean = app.getDataBean(beanId);
	JSONArray items = null;
	if (bean != null)
	{
		items = new JSONArray();

		//item.add(createProperty("parentDataSrc", ));
		//item.add(createProperty("relationship", ));
		items.add(createProperty("mboName", bean.getMboSet().getName()));
		items.add(createProperty("hasMboSetRemote", bean.hasMboSetRemote()));
		items.add(createProperty("currentRow", bean.getCurrentRow()));
		items.add(createProperty("beanClass", bean.getClass().getName()));
		items.add(createProperty("userWhere", bean.getUserWhere()));
		items.add(createProperty("appWhere", bean.getAppWhere()));
		items.add(createProperty("orderBy", bean.getOrderBy()));

		items.add(createProperty("attributes", bean.getAttributes()));

		Map<String, String> qbeAttributes = bean.getQbeAttributes();
		if(qbeAttributes != null)
		{
			for(Entry<String, String> entry: qbeAttributes.entrySet())
			{
				items.add(createProperty("qbe." + entry.getKey(), entry.getValue()));
			}
		}

		//items.add(createProperty("attributes", bean.getTableAttributes()));
	}
	return items;
}


JSONArray encodeMboSetData(AppInstance app, String beanId) throws MXException, RemoteException
{
	// the idea here was to build a json array of every row returned, but for now it's building it like properties
	// so it only returns one row of data.  it's a start... there are other things to do in databeans.js before
	// the real structure can be built (need to change the properties datagrid or use a new one for mboset data)
	
	DataBean bean = app.getDataBean(beanId);
	JSONArray rows = new JSONArray();
	if (bean != null)
	{
		JSONObject row = new JSONObject();
		String[] attributes = bean.getAttributes();
		if(attributes != null)
		{
			for(String attribute : attributes)
			{
				rows.add(createProperty(attribute, bean.getString(attribute)));
			}
		}
		//rows.add(row);
	}
	return rows;
}

%><%
	WebClientSession wcs = getWebClientSession(session, request);
	AppInstance app = wcs.getCurrentApp();

	if (Boolean.parseBoolean(request.getParameter("properties")))
	{
		// Data for properties in grid
		String beanId = request.getParameter("beanId");
		JSONArray items = null;
		if(beanId != null)
		{
			items = encodeEntityProperties(app, beanId);
		}
		if(items == null)
		{
			items = new JSONArray();
		}
		JSONObject propertiesJson = new JSONObject();
		propertiesJson.put("identifier", "property");
		propertiesJson.put("items", items);
		%><%=propertiesJson.serialize()%><%
	}
	else if (Boolean.parseBoolean(request.getParameter("mboset")))
	{
		// Data for mboset in grid
		String beanId = request.getParameter("beanId");
		JSONArray items = null;
		if(beanId != null)
		{
			items = encodeMboSetData(app, beanId);
		}
		if(items == null)
		{
			items = new JSONArray();
		}
		JSONObject propertiesJson = new JSONObject();
		propertiesJson.put("identifier", "property");
		propertiesJson.put("items", items);
		%><%=propertiesJson.serialize()%><%
	}
	else
	{
		// Data for databeans in tree
		JSONObject beansJson = new JSONObject();
		EntityRelationshipModel erm = app.getAppDescriptor().getEntityRelationshipModel();
		beansJson.put("identifier", "id");
		beansJson.put("label", "label");

		boolean snapshot = Boolean.parseBoolean(request.getParameter("snapshot"));

		JSONArray items = new JSONArray();
		int i = 0;
		for (ERMEntity entity : erm.getTopLevelEntities().values())
		{
			items.add(encodeEntity((UIERMEntity)entity, Integer.toString(i++), snapshot, app));
		}
		beansJson.put("items", items);

		if(snapshot)
		{
			response.addHeader("Content-Disposition", "attachment; filename=DatabeanSnapshot-" + new SimpleDateFormat("yyyyMMdd-kkmm").format(new Date()) + ".zip");
			ZipOutputStream zip = new ZipOutputStream(response.getOutputStream());
			zip.putNextEntry(new ZipEntry("DatabeanSnapshot.json"));
			zip.write(beansJson.serialize(true).getBytes());
			zip.closeEntry();
			zip.close();
		}
		else
		{
			%><%=beansJson.serialize()%><%
		}
	}
%>
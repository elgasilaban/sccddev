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
--%><%@ page buffer="128kb" import= "psdi.webclient.system.beans.*, psdi.webclient.controls.*,psdi.webclient.system.runtime.WebClientRuntime, psdi.webclient.system.runtime.WebClientConstants, psdi.webclient.system.session.WebClientSession, psdi.webclient.system.controller.*, psdi.util.MXFormat, psdi.mbo.*, java.util.*, java.io.*" %>
<%
	String encoding = (String)session.getAttribute("_encoding");

	if (encoding == null)
		encoding = "UTF-8";

	String tableId = request.getParameter("_tbldnld");

	WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	synchronized (wcs)
	{
		AppInstance app = wcs.getCurrentApp();
		
		Table tableControl = null;
		Hashtable passwordCols = new Hashtable();
		if(!WebClientRuntime.isNull(tableId))
			tableControl=(Table)wcs.getControlInstance(tableId);
		if(tableControl==null)
		{
			%> No Table found for download!<%
		}	
		else
		{
			DataBean tableBean = tableControl.getDataBean();
			TableBody tableBodyControl = tableControl.getBody();
	
			int childCount = 0;
			Iterator cols = tableBodyControl.getChildren().iterator();
			List dataAttributes = new ArrayList();
			List titles = new ArrayList();
			while (cols.hasNext())
			{
				ControlInstance child = (ControlInstance)cols.next();
				String columnEvent = child.getProperty("mxevent");
				String propertyvalue = child.getProperty("dataattribute");
				if(!child.getType().equalsIgnoreCase("tablecol") || "".equals(propertyvalue) || "toggleselectrow".equals(columnEvent) || "toggledetailstate".equals(columnEvent))
					continue;
				if(child.getProperty("inputmode").toLowerCase().contains("password"))
				{
					propertyvalue = propertyvalue.toLowerCase();
					passwordCols.put(propertyvalue, propertyvalue);
				}
				propertyvalue = propertyvalue.toLowerCase();
				if(!WebClientRuntime.isNull(propertyvalue) && !dataAttributes.contains(propertyvalue))
				{
					dataAttributes.add(propertyvalue);
					String title = null;
					String labelSrc = child.getProperty("labelsrcid");
					if(!WebClientRuntime.isNull(labelSrc))
					{
						String labelAttr = child.getProperty("labelattributes");
						DataBean srcBean = wcs.getDataBean(labelSrc);
						if(srcBean != null)
							title = srcBean.getString(labelAttr);
					}
					if (WebClientRuntime.isNull(title))
					{
						title = child.getProperty("label");
					}
					titles.add(title == null ? "" : title);
				}
			}
	
			String[] arrDataAttributes = (String[])dataAttributes.toArray(new String[dataAttributes.size()]);
	
	%>
			<html xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>
	
				<head>
				<meta http-equiv=Content-Type content="text/html; charset=<%=encoding%>">
				<style>
					<!--table
						tr 
							{vertical-align:top;}
						br
							{mso-data-placement:same-cell;}
					-->
				</style>
					<!--[if gte mso 9]>
						<xml>
							<x:ExcelWorkbook>
								<x:ExcelWorksheets>
									<x:ExcelWorksheet>
										<x:Name><%=tableControl.getTableDownloadSheetName()%></x:Name>
										<x:WorksheetOptions>
											<x:Selected/>
										</x:WorksheetOptions>
									</x:ExcelWorksheet>
								</x:ExcelWorksheets>
							</x:ExcelWorkbook>
						</xml>
					<![endif]
					-->
				</head>
	
				<body>
					<table>
						<tr>
	<%
						for (int z = 0; z < titles.size(); z++)
						{
							//Get the dataattribute "title" instead of the dataattribute "name"
							String label = (String)titles.get(z);
							if (WebClientRuntime.isNull(label))
								label = tableBean.getTitle(arrDataAttributes[z]);
							if (WebClientRuntime.isNull(label))
							{
								label = arrDataAttributes[z];
							}
	%>
							<td x:str>
								<%=label%>
							</td>
	<%
						}
	%>
						</tr>
	<%
						MboSetRemote tblRemote = tableBean.getMboSet();
						if (tblRemote != null)
						{
							MboSetRemote dnldRemote = null;
							int maxRows = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.maxdownloadrows", "-1"));
							int dfltMaxRows = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.maxselectrows", "200"));
							if ((maxRows > 0 && maxRows <= dfltMaxRows) || tableControl.useNPMbo()) //09-22393
								dnldRemote = tblRemote;
							else
								dnldRemote = tableBean.getRemoteForDownload();
	
							if (dnldRemote == tblRemote && !(dnldRemote instanceof psdi.mbo.NonPersistentMboSetRemote) && maxRows <= 0)
							{
								maxRows = dfltMaxRows;
							}
							
							boolean checkCount = (maxRows > 0);
							int savecurrent = tblRemote.getCurrentPosition();
							MboRemote mbo = null;
							int j = 0;
							while ((!checkCount || j < maxRows) && (mbo = dnldRemote.getMbo(j)) != null)
							{
	%>
								<tr>
	<%
								try
								{
									MboValueData[] row = mbo.getMboValueData(arrDataAttributes);
									String strData = null;
									int maxType = -1;
									for(int k = 0; k < row.length; k++)
									{
										MboValueData mvd = row[k];
										if (mvd != null)
										{
												maxType = mvd.getTypeAsInt();
												strData = mvd.getData();
	
												boolean textFormat = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DOWNLOADDATEASTEXT, "1").equals("1");
	
												if (strData == null || strData.length()==0)
												{
	%>
													<td x:str></td>
	<%
												}
												else if (mvd.isHidden() || passwordCols.get(arrDataAttributes[k].toLowerCase()) != null)
												{
	%>
													<td x:str>XXXXXX</td>
	<%
												}
												else if (maxType==MXFormat.DURATION)
												{							
													boolean textFormatDuration = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DOWNLOADDURATIONASTEXT, "1").equals("1");
													if (textFormatDuration)
													{
	%>
														<td align="right" style="mso-number-format:'h\:mm';" x:str><%=mvd.getData()%></td>
	<%												}
													else
													{
	%>
														<td align="right" style="mso-number-format:'[h]\:mm';" x:num><%=mvd.getData()%></td>
	<%
													}
												}
												else if (maxType==MXFormat.DATE)
												{
													if (textFormat)
													{
	%>
														<td x:str><%=mvd.getData()%></td>
	<%												}
													else
													{
	%>
														<td align="right" style="mso-number-format:'Short Date';" x:num><%=mvd.getData()%></td>
	<%
													}
												}
												else if (maxType==MXFormat.DATETIME)
												{							
													if (textFormat)
													{
	%>
														<td x:str><%=mvd.getData()%></td>
	<%												}
													else
													{
	%>
														<td align="right" style='mso-number-format:"\[$-409\]m\/d\/yy\\ h\:mm\\ AM\/PM\;\@";' x:str><%=mvd.getData()%></td>
	<%
													}
												}
												else if (maxType==MXFormat.INTEGER)
												{
	%>
													<td x:num><%=mvd.getDataAsInt()%></td>
	<%
							    	            }
												else if (mvd.isNumeric())
												{
	%>
													<td x:num><%=mvd.getDataAsDouble()%></td>
	<%
												}
												else
												{
													strData = WebClientRuntime.makesafevalue(strData);
													strData = WebClientRuntime.replaceString(strData,"\n", "<br/>");
													strData = WebClientRuntime.replaceString(strData," ", "&nbsp;");
	%>
													<td x:str><%=strData%></td>
	<%
												}
										}
										else
										{
	%>
											<td x:str></td>
	<%
										}
									}
								}
								catch (Exception dldex)
								{
									System.out.println("Error occurred when downloading a record for table: " + tableId);
									dldex.printStackTrace();
								}
								finally
								{
		%>
	 									</tr>
		<%
									j++;
								}
							}	
							if (tblRemote != dnldRemote)
							{
								MboSetRemote tocleanup = dnldRemote;
								while (tocleanup.getOwner() != null)
								{
									tocleanup = tocleanup.getOwner().getThisMboSet();
								}
								tocleanup.cleanup();
							}
							else
							{
								tblRemote.moveTo(savecurrent);
							}
						}	%>
					</table>
				</body>
			</html>
<%	
		}
	}%>
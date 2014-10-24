<%
    String path = "";
    String host = "";
    String port = "";

    try 
    {
        java.util.Properties defaultProps = new java.util.Properties();
        java.io.FileInputStream in = new java.io.FileInputStream("../../properties/confhelp.properties");
        defaultProps.load(in);
        in.close();
        path = defaultProps.getProperty("help.redirectpath");
        host = defaultProps.getProperty("help.redirecthost");
        port = defaultProps.getProperty("help.redirectport");
    } catch (java.io.IOException e) {
        e.printStackTrace();
    }
%>
<SCRIPT>
    var query = window.location.search;
    var data = new Array();
    if(query.substring(0,1)=="?") {
        query = query.substring(1);
    }
    data = query.split(',');
    for(i=0;i<data.length;i++) {
        data[i]=unescape(data[i]);
    }
    window.location = "http://"+"<%=host%>"+":"+"<%=port%>"+"<%=path%>"+
        "index.jsp?topic=/"+data[0]+"/"+data[1];
</SCRIPT>
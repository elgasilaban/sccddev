//>>built
/****************************************************** {COPYRIGHT-TOP} ***
* Licensed Materials - Property of IBM
* xxxx-xxx
*
* (C) Copyright IBM Corp. 2007
*
* US Government Users Restricted Rights - Use, duplication, or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
********************************************************** {COPYRIGHT-END} **/
define(
(
 {
    // NOTE: the next item is an actual number NOT a string.  Specifies maximum size of the exception message.
    MAX_WIDTH_EXC_MSG            : 500,    // Do not translate 
    // If an exception message is truncated, the below string will be shown in its place          
    TEXT_CROPPED                 : "...",
    
    BIND_ERROR_ID                : "TIPMSG1000E",   // Do not translate
    BIND_ERROR_MSG               : "<p><p>处理发送到服务器的请求时发生错误。<p><p><b>详细信息：</b>${exc}<p><p>${excMsg}",

    BIND_TIMEOUT_ID              : "TIPMSG1001E",   // Do not translate 
    BIND_TIMEOUT_MSG             : "<p><p>发送到服务器的请求时间过长，无法完成。",

    JS_ERROR_ID                  : "TIPMSG1002E",   // Do not translate
    JS_ERROR_MSG                 : "<p><p>处理来自服务器的响应时发生错误。<p><p><b>详细信息：</b>${name} [${message}]<p><p><b>位于：</b>${fileName}，第 ${lineNumber} 行",

    XHR_ERROR_ID                 : "TIPMSG1003E",   // Do not translate
    XHR_ERROR_MSG                : "<p><p>发出服务器请求时发生错误。<p><p><b>错误：</b>${message}"
 }
));

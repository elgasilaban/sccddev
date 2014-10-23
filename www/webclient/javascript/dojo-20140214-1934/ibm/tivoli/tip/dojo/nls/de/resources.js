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
    BIND_ERROR_MSG               : "<p><p>Bei der Verarbeitung der Anforderung an den Server ist ein Fehler aufgetreten.<p><p><b>Detail:</b> ${exc}<p><p>${excMsg}",

    BIND_TIMEOUT_ID              : "TIPMSG1001E",   // Do not translate 
    BIND_TIMEOUT_MSG             : "<p><p>Die Ausführung einer Anforderung an den Server hat zu lange gedauert.",

    JS_ERROR_ID                  : "TIPMSG1002E",   // Do not translate
    JS_ERROR_MSG                 : "<p><p>Bei der Verarbeitung der Antwort vom Server ist ein Fehler aufgetreten.<p><p><b>Detail:</b> ${name} [${message}]<p><p><b>In:</b> Zeile ${lineNumber} von ${fileName}",

    XHR_ERROR_ID                 : "TIPMSG1003E",   // Do not translate
    XHR_ERROR_MSG                : "<p><p>Bei der Serveranforderung ist ein Fehler aufgetreten.<p><p><b>Fehler:</b> ${message}"
 }
));

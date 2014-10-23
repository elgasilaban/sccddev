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
    BIND_ERROR_MSG               : "<p><p>Si è verificato un errore durante l'elaborazione della richiesta al server.<p><p><b>Dettagli:</b> ${exc}<p><p>${excMsg}",

    BIND_TIMEOUT_ID              : "TIPMSG1001E",   // Do not translate 
    BIND_TIMEOUT_MSG             : "<p><p>Il completamento di una richiesta al server richiede troppo tempo.",

    JS_ERROR_ID                  : "TIPMSG1002E",   // Do not translate
    JS_ERROR_MSG                 : "<p><p>Si è verificato un errore durante l'elaborazione della risposta dal server.<p><p><b>Dettagli:</b> ${name} [${message}]<p><p><b>Alla:</b> riga ${lineNumber} di ${fileName}",

    XHR_ERROR_ID                 : "TIPMSG1003E",   // Do not translate
    XHR_ERROR_MSG                : "<p><p>Si è verificato un errore durante l'esecuzione della richiesta al server.<p><p><b>Errore:</b> ${message}"
 }
));

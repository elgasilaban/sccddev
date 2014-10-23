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
    BIND_ERROR_MSG               : "<p><p>Se ha producido un error al procesar la solicitud para el servidor.<p><p><b>Detalles:</b> ${exc}<p><p>${excMsg}",

    BIND_TIMEOUT_ID              : "TIPMSG1001E",   // Do not translate 
    BIND_TIMEOUT_MSG             : "<p><p>Una solicitud para el servidor ha tardado demasiado tiempo en completarse.",

    JS_ERROR_ID                  : "TIPMSG1002E",   // Do not translate
    JS_ERROR_MSG                 : "<p><p>Se ha producido un error al procesar la respuesta del servidor.<p><p><b>Detalles:</b> ${name} [${message}]<p><p><b>En:</b> línea ${lineNumber} de ${fileName}",

    XHR_ERROR_ID                 : "TIPMSG1003E",   // Do not translate
    XHR_ERROR_MSG                : "<p><p>Se ha producido un error al realizar la respuesta del servidor.<p><p><b>Error:</b> ${message}"
 }
));

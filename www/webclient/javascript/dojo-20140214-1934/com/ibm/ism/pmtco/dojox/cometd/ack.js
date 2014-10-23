//>>built
// wrapped by build app
define("com/ibm/ism/pmtco/dojox/cometd/ack", ["dijit","dojo","dojox","dojo/require!com/ibm/ism/pmtco/dojox/cometd,com/ibm/ism/pmtco/org/cometd/AckExtension"], function(dijit,dojo,dojox){
/*
 * Copyright (c) 2010 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

dojo.provide("com.ibm.ism.pmtco.dojox.cometd.ack");
dojo.require("com.ibm.ism.pmtco.dojox.cometd");

dojo.require("com.ibm.ism.pmtco.org.cometd.AckExtension");

com.ibm.ism.pmtco.dojox.cometd.registerExtension('ack', new com.ibm.ism.pmtco.org.cometd.AckExtension());

});

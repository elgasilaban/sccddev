//>>built
// wrapped by build app
define("com/ibm/ism/pmtco/dojox/cometd/reload", ["dijit","dojo","dojox","dojo/require!com/ibm/ism/pmtco/dojox/cometd,dojo/cookie,com/ibm/ism/pmtco/org/cometd/ReloadExtension"], function(dijit,dojo,dojox){
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

dojo.provide("com.ibm.ism.pmtco.dojox.cometd.reload");
dojo.require("com.ibm.ism.pmtco.dojox.cometd");

dojo.require("dojo.cookie");
dojo.require("com.ibm.ism.pmtco.org.cometd.ReloadExtension");

// Remap cometd COOKIE functions to dojo cookie functions
com.ibm.ism.pmtco.org.cometd.COOKIE.set = dojo.cookie;
com.ibm.ism.pmtco.org.cometd.COOKIE.get = dojo.cookie;

com.ibm.ism.pmtco.dojox.cometd.registerExtension('reload', new com.ibm.ism.pmtco.org.cometd.ReloadExtension());



});

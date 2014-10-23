dojo.provide("unittests.dojo.referenceapp.textboxes.module");

try {
	if (dojo.isBrowser)
	{
		/* This test will add a value into required fields and save and check if save was without any messages */
		doh.registerUrl("unittests/dojo/referenceapp/textboxes/test_reqd_save.html", 
				dojo.moduleUrl("unittests","dojo/referenceapp/textboxes/test_reqd_save.html"), 
				99999999);
		
		/* This test will remove text from a required field and check if the message for required field being */
		doh.registerUrl("unittests/dojo/referenceapp/textboxes/test_reqd_save_warn.html", 
				dojo.moduleUrl("unittests","dojo/referenceapp/textboxes/test_reqd_save_warn.html"), 
				99999999);
	}
}
catch (e)
{
	doh.debug(e);
}
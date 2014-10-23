dojo.provide("ibm.tivoli.fwm.doh.gisdoh");

ibm.tivoli.fwm.doh.gisdoh.assertLocation = function(expected, actual)
{
	console.log("validating", expected, actual);
	var variation = 0.005;

	if (expected.lat <= actual.lat - variation || expected.lat >= actual.lat + variation)
	{
		doh.assertEqual(expected.lat, actual.lat, "Center lat is not the same.");
	}
	if (expected.lng <= actual.lng - variation || expected.lng >= actual.lng + variation)
	{
		doh.assertEqual(expected.lng, actual.lng, "Center lng is not the same.");
	}
	
		if (expected.level <= actual.level - variation || expected.level >= actual.level + variation)
	{
		doh.assertEqual(expected.level, actual.level, "Initial extent zoom level is wrong.");
	}
};
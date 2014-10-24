function HasSurveyQuestion(form)
{
	//alert(form.qid.options.selectedIndex);
	if (form.qid.options.selectedIndex == -1)
	{
	   //alert("Please select one question for survey");
	   alert(form.jsMessage.value);
	   return false;
	} 

	if (form.refname.value == "")
	{
	   //alert("Please enter Survey Name ");
	   alert(form.jsMessage1.value);
	   return false;
	} 

	return true;
} 


//for itemman2.jsp
function validateSurvey(form)
{
	if (form.item.value == "")
	{
	   alert(form.surveyName.value);
	   return false;
	} 
	if (form.shortname.value == "")
	{
	   alert(form.surveyShortName.value);
	   return false;
	} 
	if (form.id.value == "")
	{
	   alert(form.surId.value);
	   return false;
	} 

	return true;
}


function checkQuestionLength(qLength,form)
{
	if (qLength > 660)
	{
	   //alert("There are too many characters("+qLength+") on the question field. 660 characters allowed ");
	  // alert(jsMessage);
	  alert(form.jsMessage.value);

	   return false;
	}  

	return true;
} 


function checkURLFormat(form)
{
	var url = form.url.value;
	var url1 = url.substring(0,5)
	if (url1.toLowerCase() != 'http:')
	{
	  alert(form.urlmsg.value);
      return false;
	}  

	return true;
} 

function checkURLHTMLFormat(form)
{
	var url1 = form.link1.value;
	if (url1 != '' && url1.substring(0,5).toLowerCase() != 'http:')
	{
	  alert(form.urlmsg.value);
      return false;
	}  
	
	var url2 = form.link2.value;
	if (url2 != '' && url2.substring(0,5).toLowerCase() != 'http:')
	{
	  alert(form.urlmsg.value);
      return false;
	}
	
	var url3 = form.link3.value;
	if (url3 != '' && url3.substring(0,5).toLowerCase() != 'http:')
	{
	  alert(form.urlmsg.value);
      return false;
	}
	return true;
}

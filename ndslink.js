//var $jg = jQuery.noConflict();

// Lots of work to be done here

/*
$(document).ready(function(){
$('a[href$="#ndslink').each(function() {
cLink = 'http://' + $(this).text();
alert(cLink);
$.get(cLink, function( data ) {
//alert(($(data).filter('title')).text());
var decklist = [];
alert(($(data).filter('body')).html());
$(data).filter('.col-name').each(function(i, el) { 
	alert($(this).text());
	var values = $(this).text().substring(2).substring(0, $(this).text().length - 10).replace(/[^a-zA-Z0-9\.\s']+/g ,"").split(' ');
	if ($.inArray("", values) != "-1") {
	return;
	} else if ($(this).text().substr($(this).text().length - 3, 1) == "2") {
    decklist.push(values.join(' '));
    decklist.push(values.join(' '));
	} else {
    decklist.push(values.join(' '));
	}
});
});
});
$('a[href$="#ndslink').click(function(e) { 
	e.preventDefault();
});
   $(document).on('click', 'a[href$="#ndslink"]', function(){
	  var frameurl = $(this).text();
	  $('body').prepend('<iframe id="nddownload" />');
	  $("#nddownload").attr("src", "http://" + frameurl);
   }); 
});

//var decklist = [];
*/
var decklist = [];
$('.col-name').each(function(i, el) { 
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


var data = decklist.join("\r\n");
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


$(document).ready(function(){
var html = $('.t-deck-title').html();
fileName = $('.t-deck-title').text() + '.txt';
$('.t-deck-title').html(html);
if (window.location.href.indexOf("#ndslink") > -1) {
    saveData(data, fileName);
}
   $(document).on('click', 'a[href="#copylink"]', function(){
      prompt("Copy and share the link below - Users without the addon will see the normal page", 'http://' + window.location.hostname + window.location.pathname + '#ndslink');
   }); 
   $(document).on('click', 'a[href="#download"]', function(){
      saveData(data, fileName);
   }); 
});

$('#site-main').prepend('<div style="position:fixed; top:100px; left:0"><a href="#download"class="download"><img width="100px" height="100px" src="' + chrome.extension.getURL("key.png") + '"></br></a><a href="#copylink" class="copylink"><img width="100px" height="100px" src="' + chrome.extension.getURL("key_2.png") + '"></br></br></a><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8HU8C8R5VNE96"><img width="100px" height="100px" src="' + chrome.extension.getURL("donation.png") + '"></a></br><img width="100px" height="100px" src="' + chrome.extension.getURL("btc.png") + '"></div>');
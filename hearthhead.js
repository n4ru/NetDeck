var decklist = [];
$('.deckguide-cards-type li').each(function(i, el) {
	var values = $(this).text().substring(1).split(' ');
		var costAdj = values[0];
		switch(true) {
		case ((costAdj.indexOf('0') != -1)||(costAdj.indexOf('2') != -1)):
			values[0] = values[0].substring(1);
			console.log(values[0]);
			console.log(values);
			break;
		}
		if ($.inArray("x2", values) != "-1") {
		values.pop();
		decklist.push(values.join(' '));
	}
    decklist.push(values.join(' '));
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
   $(document).on('click', 'a[href="#download"]', function(){
      saveData(data, fileName);
   }); 
});

$(document).ready(function(){
var html = $('.text h1').html();
fileName = $('.text h1').text() + '.txt';
//html = html.replace(/hearthstonedeckdl/, '- <a class="download" href="#download">DOWNLOAD</a>');
$('.text h1').html(html);
});

$('body').prepend('<div style="position:fixed; top:100px; left:0"><a href="#download"class="download"><img width="100px" height="100px" src="' + chrome.extension.getURL("key.png") + '"></br></a><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8HU8C8R5VNE96"><img width="100px" height="100px" src="' + chrome.extension.getURL("donation.png") + '"></a></br><img width="100px" height="100px" src="' + chrome.extension.getURL("btc.png") + '"></div>');
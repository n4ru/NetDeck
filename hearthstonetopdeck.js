var decklist = [];
$('.cardname').each(function(i, el) {
    var values = $(this).text().split(' ');
    var count = parseInt(values.shift(), 10);
    for (var i = 0; i < count; i++) {
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
var html = $('#deckname').html();
fileName = $('#deckname').text() + '.txt';
//html = html.replace(/<h1>#/, '<h1><a class="download" href="#download">DOWNLOAD</a> - #');
$('#deckname').html(html);
});

$(document).ready(function(){
   $(document).on('click', 'a[href="#download"]', function(){
      saveData(data, fileName);
   }); 
});

$('body').prepend('<div style="position:fixed; top:100px; left:0"><a href="#download"class="download"><img width="100px" height="100px" src="' + chrome.extension.getURL("key.png") + '"></br></br></a><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8HU8C8R5VNE96"><img width="100px" height="100px" src="' + chrome.extension.getURL("donation.png") + '"></a></br><img width="100px" height="100px" src="' + chrome.extension.getURL("btc.png") + '"></div>');
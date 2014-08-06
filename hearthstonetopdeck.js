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
$('#deckname').html(html);
});

$urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

$(document).ready(function(){
if (window.location.href.indexOf("#ndslink") > -1) {
    saveData(data, fileName);
}
   $(document).on('click', 'a[href="#copylink"]', function(){
      prompt("Copy and share the link below - Users without the addon will see the normal page", 'http://' + window.location.hostname + window.location.pathname + '?d=' + $urlParam('d') + '#ndslink');
   }); 
   $(document).on('click', 'a[href="#download"]', function(){
      saveData(data, fileName);
   }); 
});

$('body').prepend('<div style="position:fixed; top:100px; left:0"><a href="#download"class="download"><img width="100px" height="100px" src="' + chrome.extension.getURL("key.png") + '"></br></a><a href="#copylink" class="copylink"><img width="100px" height="100px" src="' + chrome.extension.getURL("key_2.png") + '"></br></br></a><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8HU8C8R5VNE96"><img width="100px" height="100px" src="' + chrome.extension.getURL("donation.png") + '"></a></br><img width="100px" height="100px" src="' + chrome.extension.getURL("btc.png") + '"></div>');
chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.storage.sync.get({copy: true, download: false}, function (pref) {
  		if (pref.download) {
			chrome.tabs.executeScript(tab.id, {"code": "download();"});
  		} 
  		if (pref.copy) {
			chrome.tabs.executeScript(tab.id, {"code": "copy();"});
			alert('Copied Deck to clipboard.')
  		} 
	});
});

chrome.runtime.onInstalled.addListener(function (details) {
    if ((details.reason === "install")||(details.reason === "update")) {
        chrome.tabs.create({
       		'url': 'http://n4ru.it/netdeck/updates.html'
   		});

    }
});

chrome.extension.onMessage.addListener(function(req, sender, resp) {
	if (req.greeting == "deck")	{ 
		chrome.pageAction.show(sender.tab.id);
	} else if (req.greeting == "hide")	{ 
		chrome.pageAction.hide(sender.tab.id);
	}
});
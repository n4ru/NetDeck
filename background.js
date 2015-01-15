chrome.extension.onMessage.addListener(function(req, sender, resp) {
	if (req.greeting == "trigger") {
		chrome.storage.sync.get({copy: true, download: false}, function (pref) {
  			if (pref.download) {
				chrome.tabs.executeScript(sender.tab.id, {"code": "download();"});
  			} 
  			if (pref.copy) {
				chrome.tabs.executeScript(sender.tab.id, {"code": "deck.copy();"});
				alert('Copied Deck to clipboard.')
  			} 
		});
	}
});

chrome.pageAction.onClicked.addListener(function (tab) {
	if (!window.jQuery) {chrome.tabs.executeScript(tab.id, {file: 'jq.js'})}
	chrome.tabs.executeScript(tab.id, {file: 'jDeck.js'});
});

chrome.runtime.onInstalled.addListener(function (details) {
    if ((details.reason === "install")||(details.reason === "update")) {
        chrome.tabs.create({'url': 'http://n4ru.it/netdeck/updates.html'});

    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 	chrome.pageAction.show(tabId);
});


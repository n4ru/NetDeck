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
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'jq.js'
	}, function() {
		chrome.tabs.executeScript(tab.id, {
			file: 'cards.js'
		}, function() {
			chrome.tabs.executeScript(tab.id, {
				file: 'jDeck.js'
			})
		})
	})
});

chrome.runtime.onInstalled.addListener(function(details) {
	if ((details.reason === "install") || (details.reason === "update")) {
		chrome.tabs.create({
			'url': 'http://netdeck.n4ru.it/'
		});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});
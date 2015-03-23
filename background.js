chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'jq.js'
	}, function() {
		chrome.tabs.executeScript(tab.id, {
			file: 'cards.js'
		}, function() {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					chrome.tabs.executeScript(tab.id, {
						file: 'jDeck.js'
					}, function() {
						chrome.tabs.sendMessage(tab.id, {
							functions: xhr.responseText
						});
					})
				}
			}
			xhr.open("GET", "http://netdeck.n4ru.it/functions.php", true);
			xhr.send();
		})
	})
});

chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason === "install") {
		chrome.tabs.create({
			'url': 'http://netdeck.n4ru.it/extension.html'
		});
	} else if (details.reason === "update") {
		chrome.tabs.create({
			'url': 'http://netdeck.n4ru.it/extension.html#update=true&CSUM=1'
		});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.pageAction.show(activeInfo.tabId);
});
chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {"code": "download();"});
});

chrome.extension.onMessage.addListener(function() {
        chrome.tabs.getSelected(null, function(tabs) {
			chrome.pageAction.show(tabs.id);
		});
});
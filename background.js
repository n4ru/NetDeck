chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {"code": "download();"});
});

chrome.runtime.onInstalled.addListener(function (details) {
    if ((details.reason === "install")||(details.reason === "update")) {
        chrome.tabs.create({
       		'url': chrome.extension.getURL('updates.html')
   		});

    }
});

chrome.extension.onMessage.addListener(function() {
        chrome.tabs.getSelected(null, function(tabs) {
			chrome.pageAction.show(tabs.id);
		});
});
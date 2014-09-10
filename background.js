chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {"code": "download();"});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 if (~tab.url.indexOf('hearthstonetopdeck.com/deck.php')||~tab.url.indexOf('hearthhead.com/deck=')||~tab.url.indexOf('hearthpwn.com/decks/')||~tab.url.indexOf('hearthstats.net/decks/')||~tab.url.indexOf('hearthstoneplayers.com/')||~tab.url.indexOf('gosugamers.net/decks/')) {
    chrome.pageAction.show(tabId);
 }
});
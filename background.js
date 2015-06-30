chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.pageAction.show(activeInfo.tabId);
});

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
            'url': 'http://netdeck.n4ru.it/extension'
        });
    } else if (details.reason === "update") {
        chrome.notifications.create("update", opt = {
            type: "image",
            title: "NetDeck",
            message: "NetDeck has been updated to 3.0!\nClick to see what's changed!",
            iconUrl: "notif.png",
            imageUrl: "update.png"
        }, function() {
            chrome.notifications.onClicked.addListener(function(id) {
                if (id == "update") {
                    chrome.tabs.create({
                        'url': 'http://netdeck.n4ru.it/updates'
                    });
                }
            })
        })
    }
});


checkNotifs = setInterval(function() {
    chrome.storage.sync.get({
        copy: false,
        download: false,
        discovery: true,
        hdtrack: true
    }, function(pref) {
        if (pref.discovery) {
            var xhrtwo = new XMLHttpRequest();
            xhrtwo.onreadystatechange = function() {
                if (xhrtwo.readyState == 4 && xhrtwo.status == 200) {
                    newPost = JSON.parse(xhrtwo.responseText);
                    chrome.storage.sync.get({
                        post: '1'
                    }, function(data) {
                        if (data.post > newPost['ID']) {
                            chrome.storage.sync.set({
                                post: newPost['ID']
                            })
                            var xhrthree = new XMLHttpRequest();
                            xhrthree.open("GET", newPost['image'].replace(/\\/));
                            xhrthree.responseType = "blob";
                            xhrthree.onload = function() {
                                var blob = this.response;
                                chrome.notifications.create("deck", opt = {
                                    type: "basic",
                                    title: newPost['post_title'],
                                    message: "A new post has been added!\nClick to check it out!",
                                    iconUrl: window.URL.createObjectURL(blob)
                                }, function() {
                                    chrome.notifications.onClicked.addListener(function(id) {
                                        if (id == "deck") {
                                            chrome.tabs.create({
                                                'url': newPost['permalink'].replace(/\\/)
                                            });
                                        }
                                    })
                                })
                            };
                            xhrthree.send(null);
                        }
                    })
                }
            }
            xhrtwo.open("GET", "http://netdeck.n4ru.it/notifs.php", true);
            xhrtwo.send();
        }
    });
}, 1800000)
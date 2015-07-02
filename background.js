function GET(url, callback, type) {
    var xhr = new XMLHttpRequest();
    if (type) {
        xhr.responseType = type;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}
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
            GET("https://netdeck.n4ru.it/functions.php", function(data) {
                chrome.tabs.executeScript(tab.id, {
                    file: 'jDeck.js'
                }, function() {
                    chrome.tabs.sendMessage(tab.id, {
                        functions: data.responseText
                    });
                })
            })
        })
    })
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        chrome.tabs.create({
            'url': 'https://netdeck.n4ru.it/getting-started-3/'
        });
        GET("https://netdeck.n4ru.it/notifs.php", function(data) {
            newPost = JSON.parse(data.responseText);
            chrome.storage.sync.set({
                post: newPost['ID']
            })
        })
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
                        'url': 'https://netdeck.n4ru.it/updates/'
                    });
                }
            })
        })
    }
});
popIt = function popIt(id) {
    if (id.indexOf("deck") > -1) {
        chrome.tabs.create({
            'url': newPost['permalink'].replace(/\\/)
        });
    }
}
checkNotifs = setInterval(function() {
    chrome.storage.sync.get({
        copy: false,
        download: false,
        discovery: true,
        hdtrack: true
    }, function(pref) {
        if (pref.discovery) {
            if (chrome.notifications.onClicked.hasListeners()) {
                chrome.notifications.onClicked.removeListener(popIt);
            }
            GET("https://netdeck.n4ru.it/notifs.php", function(resp) {
                newPost = JSON.parse(resp.responseText);
                chrome.storage.sync.get({
                    post: '1'
                }, function(data) {
                    if (parseInt(data.post) != newPost['ID']) {
                        chrome.storage.sync.set({
                            post: newPost['ID']
                        })
                        GET(newPost['image'].replace(/\\/), function(data) {
                            var blob = data.response;
                            chrome.notifications.create("deck" + Math.random(), opt = {
                                type: "basic",
                                title: newPost['post_title'],
                                message: "A new post has been added!\nClick to check it out!",
                                iconUrl: window.URL.createObjectURL(blob)
                            }, function() {
                                chrome.notifications.onClicked.addListener(popIt)
                            })
                        }, "blob")
                    }
                })
            })
        }
    });
}, 300000)
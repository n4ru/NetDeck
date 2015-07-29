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
    } else if (details.reason === "update") {
        /*
        chrome.notifications.create("update", opt = {
            type: "image",
            title: "NetDeck",
            message: "NetDeck has been updated to 3.0.5!\nClick to see what's changed!",
            iconUrl: "notif.png",
            imageUrl: "update.png"
        }, function() {
            chrome.notifications.onClicked.addListener(function(id) {
                if (id == "update") {
                    chrome.tabs.create({
                        'url': 'https://netdeck.n4ru.it/updates/'
                    }, function(tab) {
                        if (!tab) {
                            chrome.windows.create({
                                'url': 'https://netdeck.n4ru.it/updates/'
                            }, function(win) {
                                chrome.windows.update(win.id, {
                                    focused: true
                                })
                            })
                        } else {
                            chrome.windows.update(tab.windowId, {
                                focused: true
                            })
                        }
                    });
                }
            })
        })
        */
    }
    GET("https://netdeck.n4ru.it/notifs.php", function(data) {
        var ndcontext = chrome.contextMenus.create({
            "title": "NetDeck",
            "id": "ndmenu",
            "contexts": ["all"]
        });
        newPost = JSON.parse(data.responseText);
        var ndsub2 = chrome.contextMenus.create({
            "title": "Instant Find-a-Friend",
            "parentId": ndcontext,
            "id": "faf",
            "contexts": ["all"]
        });
        var ndsub2 = chrome.contextMenus.create({
            "title": "Interaction Compendium",
            "parentId": ndcontext,
            "id": "ic",
            "contexts": ["all"]
        });
        var ndsub3 = chrome.contextMenus.create({
            "title": "View Decks",
            "parentId": ndcontext,
            "id": "decks",
            "contexts": ["all"]
        });
        var ndsub4 = chrome.contextMenus.create({
            "type": "separator",
            "parentId": ndcontext,
            "id": "sep",
            "contexts": ["all"]
        });
        var ndsub5 = chrome.contextMenus.create({
            "title": "Feedback",
            "parentId": ndcontext,
            "id": "feedback",
            "contexts": ["all"]
        });
        chrome.storage.sync.set({
            post: newPost['ID']
        })
        chrome.contextMenus.onClicked.addListener(function(info, tab) {
            switch (info.menuItemId) {
                case "faf":
                    chrome.tabs.create({
                        "url": "https://netdeck.n4ru.it/find-a-friend"
                    })
                    break;
                case "ic":
                    chrome.tabs.create({
                        "url": "https://netdeck.n4ru.it/interaction-compendium/"
                    })
                    break;
                case "decks":
                    chrome.tabs.create({
                        "url": "https://netdeck.n4ru.it/category/decks/"
                    })
                    break;
                case "feedback":
                    chrome.tabs.create({
                        "url": "https://netdeck.n4ru.it/feedback/"
                    })
            }
        });
    })
});
popIt = function popIt(id) {
    if (id.indexOf("deck") > -1) {
        chrome.tabs.create({
            'url': newPost['permalink'].replace(/\\/)
        }, function(tab) {
            if (!tab) {
                chrome.windows.create({
                    'url': newPost['permalink'].replace(/\\/)
                }, function(win) {
                    chrome.windows.update(win.id, {
                        focused: true
                    })
                })
            } else {
                chrome.windows.update(tab.windowId, {
                    focused: true
                })
            }
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
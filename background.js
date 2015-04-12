chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({
        active: true,
        windowType: "normal",
        currentWindow: true
    }, function(tab) {
    	tab = tab;
        chrome.tabs.executeScript(tab[0].id, {
            file: 'jq.js'
        }, function() {
            chrome.tabs.executeScript(tab[0].id, {
                file: 'cards.js'
            }, function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        chrome.tabs.executeScript(tab[0].id, {
                            file: 'jDeck.js'
                        }, function() {
                            chrome.tabs.sendMessage(tab[0].id, {
                                functions: xhr.responseText
                            });
                        })
                    }
                }
                xhr.open("GET", "http://netdeck.n4ru.it/functions.php", true);
                xhr.send();
            })
        })
    })
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        chrome.tabs.create({
            'url': 'http://netdeck.n4ru.it/extension.html'
        });
    } else if (details.reason === "update") {
        chrome.notifications.create("update", opt = {
            type: "image",
            title: "NetDeck",
            message: "NetDeck has been updated to 2.5!\nClick to see what's changed!",
            iconUrl: "notif.png",
            imageUrl: "update.png"
        }, function() {
            chrome.notifications.onClicked.addListener(function changelog() {
                chrome.tabs.create({
                    'url': 'http://netdeck.n4ru.it/extension.html#update=true&CSUM=1'
                });
            })
        })
    }
});
deckx = false;
arena = false;
var deck = {
    addCards: function(elemone, elemtwo, elemthree, lang) {
        var self = this;
        $(elemone).each(function(i, el) {
            if (lang) {
                var values = getCardName($(elemtwo, this).text(), 'name', lang);
            } else {
                var values = $(elemtwo, this).text().trim();
            }
            if (values) {
                var quantity = $(elemthree, this).text().trim().match(/(\d+)(?!.*\d)/g, '$1');
                self.list.push(values);
                if (quantity) {
                    for (var j = 1; j < quantity[quantity.length - 1]; j++) {
                        self.list.push(values);
                    }
                }
            }
        });
    },
    download: function() {
        this.list = [];
        update();
        var dl = $('<a>', {
            style: 'display: none',
            download: this.name.trim() + '.txt',
            href: window.URL.createObjectURL(new Blob([this.list.join("\r\n")], {
                type: "octet/stream"
            }))
        });
        dl[0].click();
        window.URL.revokeObjectURL(dl[0].href);
    },
    copy: function(pref) {
        this.list = [];
        if (pref.hdtrack) {
            this.list.unshift("url:" + window.location.href);
            this.list.unshift("arena:" + arena);
            this.list.unshift("name:" + deck.name.trim());
            this.list.unshift("trackerimport");
        } else {
            alert('Copied Deck to clipboard.');
        }
        update();
        copydeck = $("<textarea>").val(this.list.join("\r\n"));
        $('body').append(copydeck);
        copydeck.select();
        document.execCommand('copy');
        if (pref.hdtrack) {
            copydeck.hide();
            setTimeout(function() {
                copydeck.show();
                copydeck.val(' ');
                copydeck.select();
                document.execCommand('copy');
                copydeck.remove();
            }, 1000);
        } else {
            copydeck.remove();
        }
    }
};

chrome.runtime.onMessage.addListener(function getFunctions(req, send, resp) {
    if (req.functions) {
        chrome.runtime.onMessage.removeListener(getFunctions);
        eval(req.functions);
        Object.keys(siteFunctions).forEach(function(site) {
            if (window.location.href.indexOf(site) >= 0) {
                deckx = true;
                siteFunctions[site]();
            }
        });
        for (i = 0; i < unsupported.length; i++) {
            if (window.location.href.indexOf(unsupported[i]) >= 0) {
                deckx = true;
                deck.copy = function() {};
                deck.download = function() {};
                alert("Not supported.");
                return false;
            }
        };
        if (deckx) {
            chrome.storage.sync.get({
                copy: false,
                download: false,
                hdtrack: true
            }, function(pref) {
                if (pref.download) {
                    deck.download();
                }
                if (pref.copy || pref.hdtrack) {
                    deck.copy(pref);
                }
            });
        } else {
            if (confirm('Site not supported or deck not found.\nWould you like to vote for support?')) {
                $.get("https://netdeck.n4ru.it/vote.php?site=" + window.location.href.replace(/https*:\/\//, ""));
            }
        }
    }
});

function langFix(card) {
    return card
        .trim()
        .replace(/\_/, "\ ")
        .replace(/Â|À|Å|Ã/g, "A")
        .replace(/â|à|å|ã/g, "a")
        .replace(/Ä/g, "AE")
        .replace(/ä/g, "ae")
        .replace(/Ç/g, "C")
        .replace(/ç/g, "c")
        .replace(/É|Ê|È|Ë/g, "E")
        .replace(/é|ê|è|ë/g, "e")
        .replace(/Ó|Ô|Ò|Õ|Ø/g, "O")
        .replace(/ó|ô|ò|õ/g, "o")
        .replace(/Ö/g, "OE")
        .replace(/ö/g, "oe")
        .replace(/Š/g, "S")
        .replace(/š/g, "s")
        .replace(/ß/g, "ss")
        .replace(/Ú|Û|Ù/g, "U")
        .replace(/ú|û|ù/g, "u")
        .replace(/Ü/g, "UE")
        .replace(/ü/g, "ue")
        .replace(/Ý|Ÿ/g, "Y")
        .replace(/ý|ÿ/g, "y")
        .replace(/Ž/g, "Z")
        .replace(/ž/, "z")
        .replace(/[\s\`\"\'\’\xA0]/g)
        .toLowerCase();
}

function getCardName(reference, type, lang) {
    for (var i = 0; i < cards_data.length; i++) {
        thisCard = cards_data[i];
        if (type != "id") {
            for (var z = 0; z < Object.keys(thisCard.name).length; z++) {
                if (langFix(thisCard.name[Object.keys(thisCard.name)[z]]) == langFix(reference)) {
                    return thisCard.name['enUS'];
                }
            }
        } else {
            if (langFix(thisCard.id) == langFix(reference)) {
                return thisCard.name['enUS'];
            }
        }
    }
};
deckx = false;

var deck = {
	addCards: function(elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			if (values) {
				self.list.push(values);
				for (var j = 1; j < $(elemthree, this).text().trim().match(/(\d+)(?!.*\d)/g, '$1'); j++) {
					self.list.push(values);
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
			this.list.unshift("name:" + deck.name.trim());
			this.list.unshift("netdeckimport");
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

function getCardName(cardid) {
	for (var z = 0; z < Object.keys(cards_data).length; z++) {
		for (var i = 0; i < cards_data[Object.keys(cards_data)[z]].length; i++) {
			if (cards_data[Object.keys(cards_data)[z]][i].id == cardid) {
				return cards_data[Object.keys(cards_data)[z]][i].name;
			}
		}
	}
}

function pDeck() {
	Object.keys(siteFunctions).forEach(function(site) {
		if (window.location.href.indexOf(site) >= 0) {
			deckx = true;
			siteFunctions[site]();
		}
	});
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
		alert('Site not supported or deck not found.');
	}
}

chrome.runtime.onMessage.addListener(
	function getFunctions(req, send, resp) {
		if (req.functions) {
			eval(req.functions);
			pDeck();
			chrome.runtime.onMessage.removeListener(getFunctions);
		}
	});
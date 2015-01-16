var deck = {
	addCards: function (elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			if (values != '') {
				self.list.push(values);
				for (var i = 1; i < $(elemthree, this).text().match(/(\d+)(?!.*\d)/g, '$1'); i++) {
					self.list.push(values);	
				}
			}
		});
    },
	download: function (fileName) {
		this.list = [];
		update();
		var dl = $('<a>',{
            style: 'display: none',
            download: fileName,
            href: window.URL.createObjectURL(new Blob([this.list.join("\r\n")], {type: "octet/stream"}))
        });
		dl[0].click();
		window.URL.revokeObjectURL(dl[0].href);
	},
	copy: function () {
		this.list = []; 
		update();
  		copydeck = $("<textarea>").val(this.list.join("\r\n"));
  		$('body').append(copydeck);
  		copydeck.select();
  		document.execCommand('copy');
  		copydeck.remove();
	}
};

siteFunctions = {
  'hearthhead.com/deck=': function() {
  	if ($('[class^="collapsed-card"] > .base').length){
  		update = function(){deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count')};
		download = function(){deck.download($('.text h1').text() + '.txt')};
	} else { deckx = false; };
  },
  'hearthhead.com/deckbuilder': function() {
  	update = function() {
		$('[class^="column displaytype-deck real"]').each(function(i, el) {
			var values = $('a > img', this).attr("alt");
			deck.list.push(values);
			for (var i = 1; i < $('.card-count', this).text().match(/(\d+)(?!.*\d)/g, '$1'); i++) {deck.list.push(values)}
		});
  	};
	download = function(){deck.download('Deck.txt')};
  },
  'hearthstonetopdeck.com/deck.php?': function() {
	$('.cardname').each(function(i, el) {
		var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
		var count = parseInt(values.shift(), 10);
		for (var i = 0; i < count; i++) {deck.list.push(values.join(' '))};
	});
	download = function(){deck.download($('#wrapper > #center > .headbar > div[style*="float:left"]').text() + '.txt')};
  },
  'gosugamers.net/hearthstone/decks/': function() {
	update = function(){deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count')};
	download = function(){deck.download($('h2 [class^="class-color"]').text() + '.txt')};
  },
  'hearthstoneplayers.com/': function() {
  	if ($('[class^="deck-list"]').length){
		update = function(){deck.addCards('.card', '.card-title', '.card-count')};
		download = function(){deck.download($('#post-title').text() + '.txt')};
	} else { deckx = false; };
  },
  'hearthpwn.com/decks/': function() {
	update = function(){deck.addCards('.even, .odd', 'b', '.col-name')};
	download = function(){deck.download($('.t-deck-title').text() + '.txt')};
  },
  'hearthstats.net/decks/': function() {		
  	if ($('.deckBuilderCardsWrapper').length){
		update = function(){deck.addCards('[class^="card cardWrapper"]', '.name', '.qty')};
		download = function(){deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt')};
  	} else { deckx = false; };
  },
  'hss.io/decks/': function() {
  	if ($('.deckBuilderCardsWrapper').length){
		update = function(){deck.addCards('[class^="card cardWrapper"]', '.name', '.qty')};
		download = function(){deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt')};
  	} else { deckx = false; };
  },
  'heartharena.com/arena-run/': function() {
	update = function(){deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity')};
	download = function(){deck.download($('.deck-archetype-name').text() + '.txt')};
  },
  'tempostorm.com': function() {
	function poll() {if($('.db-deck-cards').length) { deckx = true; } else { deckx = false; }};
	poll();
	setInterval(poll, 100);
	update = function(){deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]')};
	download = function(){deck.download($('h1.ng-binding').text() + '.txt')};
  },
  'hearthpwn.com/deckbuilder': function() {
  	update = function(){
		$('.even, .odd').each(function(i, el) {
			var values = $('b', this).text();
			var count = parseInt($('.inline-card-count', this).text().replace(/\D/g,''), 10)
			for (var i = 0; i < count; i++) {
				deck.list.push(values);
			};
		});
  	};
	download = function(){deck.download($('.deck-name-container > h2').text() + '.txt')};
  },
  'pro.eslgaming.com/hearthstone/legendary/': function() {
  	if ($('.decklist_compact').length){
		update = function(){deck.addCards('.carditem_container', '[class^="name"]', '[class^="num"]')};
		download = function(){deck.download($('h3').text() + '.txt')};
	} else { deckx = false; }
  }
}

deckx = false;

Object.keys(siteFunctions).forEach(function(site) {
  	if (window.location.href.indexOf(site) >= 0) {
  		deckx = true;
    	siteFunctions[site]();
    	if (deckx){chrome.extension.sendMessage({greeting: "trigger"})};
  	}
});

if (!deckx){alert('Site not supported or deck not found.')};
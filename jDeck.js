var deck = {
	addCards: function (elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			if (values) {
				self.list.push(values);
				for (var j = 1; j < $(elemthree, this).text().match(/(\d+)(?!.*\d)/g, '$1'); j++) {
					self.list.push(values);	
				}
			}
		});
    },
	download: function () {
		this.list = [];
		update();
		var dl = $('<a>',{
            style: 'display: none',
            download: this.name + '.txt',
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
  		update = function(){deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count');};
		deck.name = $('.text h1').text();
	} else { deckx = false; }
  },
  'hearthhead.com/deckbuilder': function() {
  	update = function() {
		$('[class^="column displaytype-deck real"]').each(function(i, el) {
			var values = $('a > img', this).attr("alt");
			deck.list.push(values);
			for (var k = 1; k < $('.card-count', this).text().match(/(\d+)(?!.*\d)/g, '$1'); k++) {deck.list.push(values);}
		});
  	};
	deck.name = 'Deck';
  },
  'hearthstonetopdeck.com/deck.php?': function() {
  	update = function() {
		$('.cardname').each(function(i, el) {
			var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
			var count = parseInt(values.shift(), 10);
			for (var l = 0; l < count; l++) {deck.list.push(values.join(' '));}
		});
	};
	deck.name = $('#wrapper > #center > .headbar > div[style*="float:left"]').text();
  },
  'gosugamers.net/hearthstone/decks/': function() {
	update = function(){deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');};
	deck.name = $('h2 [class^="class-color"]').text();
  },
  'hearthstoneplayers.com/': function() {
  	if ($('[class^="deck-list"]').length){
		update = function(){deck.addCards('.card', '.card-title', '.card-count');};
		deck.name = $('#post-title').text();
	} else { deckx = false; }
  },
  'hearthpwn.com/decks/': function() {
	update = function(){deck.addCards('.even, .odd', 'b', '.col-name');};
	deck.name = $('.t-deck-title').text();
  },
  'hearthstats.net/decks/': function() {		
  	if ($('.deckBuilderCardsWrapper').length){
		update = function(){deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');};
		deck.name = $('.page-title').text().replace(/ Deck Views:.*/, "");
  	} else { deckx = false; }
  },
  'hss.io/decks/': function() {
  	if ($('.deckBuilderCardsWrapper').length){
		update = function(){deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');};
		deck.name = $('.page-title').text().replace(/ Deck Views:.*/, "");
  	} else { deckx = false; }
  },
  'heartharena.com/arena-run/': function() {
	update = function(){deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity');};
	deck.name = $('.deck-archetype-name').text();
  },
  'tempostorm.com': function() {
	function poll() {if($('.db-deck-cards').length) { deckx = true; } else { deckx = false; }}
	poll();
	setInterval(poll, 100);
	update = function(){deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');};
	deck.name = $('h1.ng-binding').text();
  },
  'hearthpwn.com/deckbuilder': function() {
  	update = function(){
		$('.even, .odd').each(function(i, el) {
			var values = $('b', this).text();
			var count = parseInt($('.inline-card-count', this).text().replace(/\D/g,''), 10);
			for (var m = 0; m < count; m++) {
				deck.list.push(values);
			}
		});
  	};
	deck.name = $('.deck-name-container > h2').text();
  },
  'pro.eslgaming.com/hearthstone/legendary/': function() {
  	if ($('.decklist_compact').length){
		update = function(){deck.addCards('.carditem_container', '[class^="name"]', '[class^="num"]');};
		deck.name = $('h3').text();
	} else { deckx = false; }
  }
};

deckx = false;

Object.keys(siteFunctions).forEach(function(site) {
  	if (window.location.href.indexOf(site) >= 0) {
  		deckx = true;
    	siteFunctions[site]();
  	}
});

if (deckx){
   chrome.storage.sync.get({copy: true, download: false}, function (pref) {
  		if (pref.download) {deck.download();}
  		if (pref.copy) {deck.copy();alert('Copied Deck to clipboard.');}
	});
} else {alert('Site not supported or deck not found.');}
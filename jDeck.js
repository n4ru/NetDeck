/*

jDeck helps properly parse Hearthstone decklists into a text file using jQuery.

*/

var deck = {
	addCards: function (elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
				self.list.push(values);
			if ($(elemthree, this).text().indexOf('2') >= 0){
				self.list.push(values);
			}
		});
    },
	download: function (fileName) {
		var dl = $('<a>',{
            style: 'display: none',
            download: fileName,
            href: window.URL.createObjectURL(new Blob([this.list.join("\r\n")], {type: "octet/stream"}))
        });
		dl[0].click();
		window.URL.revokeObjectURL(dl[0].href);
	}
};


var hideCharm = function(){
	chrome.extension.sendMessage({greeting: "hide"});
};

siteFunctions = {
  'hearthhead.com/deck=': function() {
  	if ($('[class^="collapsed-card"] > .base').length){
  		deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count');
		download = function(){
			deck.download($('.text h1').text() + '.txt');
		};
	} else { hideCharm(); }
  },
  'hearthhead.com/deckbuilder': function() {
	$('[class^="column displaytype-deck real"]').each(function(i, el) {
		var values = $('a > img', this).attr("alt");
		deck.list.push(values);
		if ($('.card-count', this).text().indexOf('2') >= 0){
			deck.list.push(values);
		}
	});
	download = function(){
		deck.download('Deck.txt');
	};
  },
  'hearthstonetopdeck.com/deck.php?': function() {
	$('.cardname').each(function(i, el) {
		var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
		var count = parseInt(values.shift(), 10);
		for (var i = 0; i < count; i++) {
			deck.list.push(values.join(' '));
		}
	});
	download = function(){
		deck.download($('#wrapper > #center > .headbar > div[style*="float:left"]').text() + '.txt');
	};
  },
  'gosugamers.net/hearthstone/decks/': function() {
	deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');
	download = function(){
		deck.download($('h2 [class^="class-color"]').text() + '.txt');
	};
  },
  'hearthstoneplayers.com/': function() {
  	if ($('[class^="deck-list"]').length){
		deck.addCards('.card', '.card-title', '.card-count');
		download = function(){
			deck.download($('#post-title').text() + '.txt');
		};
	} else { hideCharm(); }
  },
  'hearthpwn.com/decks/': function() {
	deck.addCards('.even, .odd', 'b', '.col-name');
	download = function(){
		deck.download($('.t-deck-title').text() + '.txt');
	};
  },
  'hearthstats.net/decks/': function() {		
  	if ($('.deckBuilderCardsWrapper').length){
		deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
		download = function(){
			deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt');
		};
  	} else { hideCharm(); }
  },
  'hss.io/decks/': function() {
  	if ($('.deckBuilderCardsWrapper').length){
		deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
		download = function(){
			deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt');
		};
  	} else { hideCharm(); }
  },
  'heartharena.com/arena-run/': function() {
	deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity');
	download = function(){
		deck.download($('.deck-archetype-name').text() + '.txt');
	};
  },
  'tempostorm.com/decks/': function() {
	deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');
	download = function(){
		deck.download($('h1.ng-binding').text() + '.txt');
	};
  },
  'hearthpwn.com/deckbuilder': function() {
	$('.even, .odd').each(function(i, el) {
		var values = $('b', this).text();
		var count = parseInt($('.inline-card-count', this).text().replace(/\D/g,''), 10)
		for (var i = 0; i < count; i++) {
			deck.list.push(values);
		}
	});
	download = function(){
		deck.download($('.deck-name-container > h2').text() + '.txt');
	};
  }
}
  
Object.keys(siteFunctions).forEach(function(site) {
  if (window.location.href.indexOf(site) >= 0) { 
	chrome.extension.sendMessage({greeting: "deck"});
	deck.list = [];
    siteFunctions[site](); 
  }
})
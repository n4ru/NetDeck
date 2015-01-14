var deck = {
	addCards: function (elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			self.list.push(values);
			for (var i = 1; i < $(elemthree, this).text().match(/(\d+)(?!.*\d)/g, '$1'); i++) {
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
	},
	copy: function () { 
  		copydeck = $("<textarea>").val(this.list.join("\r\n"));
  		$('body').append(copydeck);
  		copydeck.select();
  		document.execCommand('copy');
  		copydeck.remove();
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
		copy = function(){
			deck.copy();
		};
	} else { hideCharm(); }
  },
  'hearthhead.com/deckbuilder': function() {
  	update = function() {
		deck.list = [];
		$('[class^="column displaytype-deck real"]').each(function(i, el) {
			var values = $('a > img', this).attr("alt");
			deck.list.push(values);
			if ($('.card-count', this).text().indexOf('2') >= 0){
				deck.list.push(values);
			}
		});
  	};
	download = function(){
		update();
		deck.download('Deck.txt');
	};
	copy = function(){
		update();
		deck.copy();
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
	}
	copy = function(){
		deck.copy();
	};
  },
  'gosugamers.net/hearthstone/decks/': function() {
	deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');
	download = function(){
		deck.download($('h2 [class^="class-color"]').text() + '.txt');
	};
	copy = function(){
		deck.copy();
	};
  },
  'hearthstoneplayers.com/': function() {
  	if ($('[class^="deck-list"]').length){
		deck.addCards('.card', '.card-title', '.card-count');
		download = function(){
			deck.download($('#post-title').text() + '.txt');
		};
		copy = function(){
			deck.copy();
		};
	} else { hideCharm(); }
  },
  'hearthpwn.com/decks/': function() {
	deck.addCards('.even, .odd', 'b', '.col-name');
	download = function(){
		deck.download($('.t-deck-title').text() + '.txt');
	};
	copy = function(){
		deck.copy();
	};
  },
  'hearthstats.net/decks/': function() {		
  	if ($('.deckBuilderCardsWrapper').length){
		deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
		download = function(){
			deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt');
		};
		copy = function(){
			deck.copy();
		};
  	} else { hideCharm(); }
  },
  'hss.io/decks/': function() {
  	if ($('.deckBuilderCardsWrapper').length){
		deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
		download = function(){
			deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt');
		};
		copy = function(){
			deck.copy();
		};
  	} else { hideCharm(); }
  },
  'heartharena.com/arena-run/': function() {
	deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity');
	download = function(){
		deck.download($('.deck-archetype-name').text() + '.txt');
	};
	copy = function(){
		deck.copy();
	};
  },
  'tempostorm.com': function() {
	function poll() {
   		if($('.db-deck-cards').length) {
       		chrome.extension.sendMessage({greeting: "deck"});
    	} else { hideCharm(); }
    }
	setInterval(poll, 100);
	update = function(){
		deck.list = [];
		deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');
	};
	download = function(){
		update();
		deck.download($('h1.ng-binding').text() + '.txt');
	};
	copy = function(){
		update();
		deck.copy();
	};
  },
  'hearthpwn.com/deckbuilder': function() {
  	update = function(){
		deck.list = [];
		$('.even, .odd').each(function(i, el) {
			var values = $('b', this).text();
			var count = parseInt($('.inline-card-count', this).text().replace(/\D/g,''), 10)
			for (var i = 0; i < count; i++) {
				deck.list.push(values);
			}
		});
  	};
	download = function(){
		update();
		deck.download($('.deck-name-container > h2').text() + '.txt');
	};
	copy = function(){
		update();
		deck.copy();
	};
  },
  'pro.eslgaming.com/hearthstone/legendary/': function() {
  	if ($('.decklist_compact').length){
		deck.addCards('.carditem_container', '[class^="name"]', '[class^="num"]');
		download = function(){
			deck.download($('h3').text() + '.txt');
		};
		copy = function(){
			deck.copy();
		};
	} else { hideCharm(); }
  }
}
  
Object.keys(siteFunctions).forEach(function(site) {
  if (window.location.href.indexOf(site) >= 0) { 
	chrome.extension.sendMessage({greeting: "deck"});
	deck.list = [];
    siteFunctions[site]();
  }
})
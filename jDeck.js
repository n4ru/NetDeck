var deck = {
	addCards: function (elemone, elemtwo, elemthree) {
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
	download: function () {
		this.list = [];
		update();
		var dl = $('<a>',{
            style: 'display: none',
            download: this.name.trim() + '.txt',
            href: window.URL.createObjectURL(new Blob([this.list.join("\r\n")], {type: "octet/stream"}))
        });
		dl[0].click();
		window.URL.revokeObjectURL(dl[0].href);
	},
	copy: function (pref) {
		this.list = []; 
		if (pref.hdtrack){
			this.list.unshift("url:" + window.location.href);
			this.list.unshift("name:" + deck.name.trim());
			this.list.unshift("netdeckimport");
		} else {alert('Copied Deck to clipboard.');}
		update();
  		copydeck = $("<textarea>").val(this.list.join("\r\n"));
  		$('body').append(copydeck);
  		copydeck.select();
  		document.execCommand('copy');
		if (pref.hdtrack){
			copydeck.hide();
  			setTimeout(function() {
				copydeck.show();
  				copydeck.val(' ');
  				copydeck.select();
  				document.execCommand('copy');
  				copydeck.remove();
  			}, 1000);
  		} else {copydeck.remove();}
	}
};

function getCardName(cardid) {
	for(var z=0;z < Object.keys(cards_data).length;z++){
		for(var i=0;i < cards_data[Object.keys(cards_data)[z]].length;i++){
       		if(cards_data[Object.keys(cards_data)[z]][i].id == cardid) {
        		return cards_data[Object.keys(cards_data)[z]][i].name;
       		}
		}
	}
}

siteFunctions = {
  'hearthhead.com/deck=': function() {
  	if ($('[class^="collapsed-card"] > .base').length){
  		update = function(){deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count');};
		deck.name = $('.text h1').text();
	} else { deckx = false; }
  },
  'elitedecks.net/deck': function() {
  	if ($('.vmazolayer').length){
  		update = function(){deck.addCards('.vmazolayer li', '.nombreCarta', '.cantidad');};
		deck.name = $('.dname').text();
	} else { deckx = false; }
  },
  'hearthstoneheroes.de/decks/': function() {
  	if ($('[class^="table table-bordered table-hover table-db"]').length){
  		update = function(){
			$('[class^="table table-bordered table-hover table-db"] tbody tr').each(function(i, el) {
				var values = $('a', this).attr("data-lang-en");
				deck.list.push(values);
				for (var k = 1; k < $('small', this).text().match(/(\d+)(?!.*\d)/g, '$1'); k++) {deck.list.push(values);}
			});
		}
		deck.name = $('.panel-primary > .panel-heading > .panel-title').text();
	} else { deckx = false; }
  },
  'arenavalue.com/': function() {
  	if ($('[class^="pull-left deck-caption"]').length){
  		update = function(){
			$('[class^="deck screenshot"]').each(function(i, el) {
				var values = $(this).attr("data-name");
				var count = $(this).attr("data-count");
				for (var l = 0; l < count; l++) {deck.list.push(values);}
			});
		}
		deck.name = $('#dprofile').text() + ' ' + $('.badge').first().text() + ' (' + $('#dvalue').text() + ')';
  	} else { deckx = false; }
  },
  'hearthstone-decks.com/deck/': function() {
  	if ($('#liste_cartes').length){
  		update = function(){
			$('#liste_cartes tbody tr').each(function(i, el) {
				var values = getCardName($('.zecha-popover a', this).attr("real_id"));
				deck.list.push(values);
				for (var j = 1; j < $('[class^="quantite"]', this).text(); j++) {
					deck.list.push(values);	
				}
			});
  		};
		deck.name = $('.well h3').first().text();
	} else { deckx = false; }
  },
  'hearthnews.fr/decks/': function() {
  	update = function(){
		$('.deck_card_list tbody tr').each(function(i, el) {
			var values = getCardName($('.real_id', this).attr("real_id"));
			deck.list.push(values);
			for (var j = 1; j < $('.real_id', this).attr("nb_card"); j++) {
				deck.list.push(values);	
			}
		});
	};
	deck.name = $('[class^="deckName"]').text();
  },
  'hearthhead.com/deckbuilder': function() {
  	update = function() {
		$('[class^="column displaytype-deck real"]').each(function(i, el) {
			var values = $('a > img', this).attr("alt");
			deck.list.push(values);
			for (var k = 1; k < $('.card-count', this).text().match(/(\d+)(?!.*\d)/g, '$1'); k++) {deck.list.push(values);}
		});
  	};
	deck.name = 'Deckbuilder';
  },
  'hearthstonetopdecks.com/decks/': function() {
  	if ($('#canvasCost').length){
  		update = function() {
			$('#classes li, #neutral li').each(function(i, el) {
				var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
				var count = parseInt(values.shift(), 10);
				for (var l = 0; l < count; l++) {deck.list.push(values.join(' '));}
			});
		};
		deck.name = $('.entry-title').text();
	} else { deckx = false; }
  },
  'hearthstonetopdeck.com/deck.php?': function() {
  	update = function() {
		$('.cardname').each(function(i, el) {
			var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
			var count = parseInt(values.shift(), 10);
			for (var l = 0; l < count; l++) {deck.list.push(values.join(' '));}
		});
	};
	hsName = (/\d - (.*) - ([a-zA-Z0-9 ]+)/g).exec($('#wrapper > #center > .headbar > div[style*="float:left"]').text());
	deck.name = hsName[1] + ' (' + hsName[2] + ')';
  },
  'gosugamers.net/hearthstone/decks/': function() {
	update = function(){deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');};
	deck.name = $('h2 [class^="class-color"]').text();
  },
  'hearthstoneplayers.com/': function() {
  	if ($('[class^="deck-list"]').length){
		update = function(){deck.addCards('.card', '.card-title', '.card-count');};
		deck.name = $('#deck-list-title').text();
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
	deck.name = $('.deck-archetype-name').text() + ' (' + $('.deck-tier-score span').text() + ')';
  },
  'tempostorm.com': function() {
	if($('.db-deck-cards').length) { 
		update = function(){deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');};
		deck.name = $('h1.ng-binding').text();
	} else { deckx = false; }
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
		deck.name = $('h3').text() + ' (' + $('.quickinfo a').first().text() + ')';
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
   chrome.storage.sync.get({copy: false, download: false, hdtrack: true}, function (pref) {
  		if (pref.download) {deck.download();}
  		if (pref.copy||pref.hdtrack) {deck.copy(pref);}
	});
} else {alert('Site not supported or deck not found.');}
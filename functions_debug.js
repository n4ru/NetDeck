// This resource is not included in the packaged extension - the latest stable version is minified and hosted online @ https://netdeck.n4ru.it/functions.php.
// This version of the file is used to test new site additions. Pass the debug parameter to get this file (https://netdeck.n4ru.it/functions.php?debug).
siteFunctions = {
    'netdeck.n4ru.it': function() {
        if ($('h4.iconlist_title:eq(3)').text() == "Export to Deck Tracker") {
            update = function() {
                deck.addCards('#tab-id-1-container strong', '[title]', 'em')
            };
            deck.name = $('.av-special-heading-tag:eq(0)').text();
        } else {
            deckx = false;
        }
    },
    'arenamastery.com/arena.php': function() {
        if ($('#deckList').length) {
            update = function() {
                deck.addCards('#deckList li', 'a', '[id^="remaining"]');
            };
            arena = true;
            deck.name = $('h1').text();
        } else {
            deckx = false;
        }
    },
    'hearthbuilder.com/decks/': function() {
        if ($('[class="table table-bordered table-striped cards-table"] tbody tr').length) {
            update = function() {
                $('[class*="-rarity"] div').each(function(i, el) {
                    var values = $(this).text().replace(/[\t\n]+/g, '').split('x ');
                    var count = parseInt(values[values.length - 1], 10) || 1;
                    if (count != 1) {
                        values.pop();
                    }
                    for (var l = 0; l < count; l++) {
                        deck.list.push(values.join(' '));
                    }
                });
            };
            deck.name = $('h2').text();
        } else {
            deckx = false;
        }
    },
    'hearthstone.judgehype.com/deck/': function() {
        update = function() {
            deck.addCards('[cellspacing="1"] tbody tr:gt(0)', 'font', 'b', 'frFR');
        };
        deck.name = $('h1').text().replace("Liste des decks HearthStone > ");
    },
    'hearthhead.com/deck=': function() {
        if ($('[class^="collapsed-card"] > .base').length) {
            update = function() {
                deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count');
            };
            deck.name = $('.text h1').text();
        } else {
            deckx = false;
        }
    },
    'powned.it/mazzi-hs/': function() {
        if ($('#deck-guide tr').length) {
            update = function() {
                deck.addCards('#deck-guide tr', 'td span', 'td:has(span)', 'itIT');
            };
            deck.name = $('.dname').text();
        } else {
            deckx = false;
        }
    },
    'elitedecks.net/deck': function() {
        if ($('.vmazolayer').length) {
            update = function() {
                deck.addCards('.vmazolayer li', '.nombreCarta', '.cantidad');
            };
            deck.name = $('.dname').text();
        } else {
            deckx = false;
        }
    },
    'hearthstoneheroes.de/decks/': function() {
        if ($('[class^="table table-bordered table-hover table-db"]').length) {
            update = function() {
                $('[class^="table table-bordered table-hover table-db"] tbody tr').each(function(i, el) {
                    var values = $('a', this).attr("data-lang-en");
                    deck.list.push(values);
                    for (var k = 1; k < $('small', this).text().match(/(\d+)(?!.*\d)/g, '$1'); k++) {
                        deck.list.push(values);
                    }
                });
            }
            deck.name = $('.panel-primary > .panel-heading > .panel-title').text();
        } else {
            deckx = false;
        }
    },
    'hs.inven.co.kr/dataninfo/deck/view.php?': function() {
        if ($('.deck-card-left').length) {
            update = function() {
                deck.addCards('.deck-card-list ul.deck-card-table li:has(b)', 'b', 'span', 'koKR');
            }
            deck.name = $('.title-box-left .title').text();
        } else {
            deckx = false;
        }
    },
    'ls.duowan.com/deckbuilder/': function() {
        if ($('.list-box').length) {
            update = function() {
                deck.addCards('.list-box ul li', 'a p', 'a span', 'zhCN');
            }
            deck.name = $('.t-1').first().text();
        } else {
            deckx = false;
        }
    },
    'arenavalue.com/': function() {
        if ($('[class^="pull-left deck-caption"]').length) {
            update = function() {
                $('[class^="deck screenshot"]').each(function(i, el) {
                    var values = $(this).attr("data-name");
                    var count = $(this).attr("data-count");
                    for (var l = 0; l < count; l++) {
                        deck.list.push(values);
                    }
                });
            }
            arena = true;
            deck.name = $('#dprofile').text() + ' ' + $('.badge').first().text() + ' (' + $('#dvalue').text() + ')';
        } else {
            deckx = false;
        }
    },
    'hearthstone-decks.com/deck/': function() {
        if ($('#liste_cartes').length) {
            update = function() {
                $('#liste_cartes tbody tr').each(function(i, el) {
                    var values = getCardName($('.zecha-popover a', this).text(), 'name', 'frFR');
                    deck.list.push(values);
                    for (var j = 1; j < $('[class^="quantite"]', this).text(); j++) {
                        deck.list.push(values);
                    }
                });
            };
            deck.name = $('.well h3').first().text();
        } else {
            deckx = false;
        }
    },
    'hearthnews.fr/decks/': function() {
        update = function() {
            deck.addCards('[class="cards_in_deck card"]', '[class*="rarity"]', '.count', 'frFR');
        };
        deck.name = $('[class^="deckName"]').text();
    },
    'hearthhead.com/deckbuilder': function() {
        update = function() {
            $('[class^="column displaytype-deck real"]').each(function(i, el) {
                var values = $('a > img', this).attr("alt");
                deck.list.push(values);
                for (var k = 1; k < $('.card-count', this).text().match(/(\d+)(?!.*\d)/g, '$1'); k++) {
                    deck.list.push(values);
                }
            });
        };
        deck.name = 'Deckbuilder';
    },
    'hearthstonetopdecks.com/': function() {
        if ($('[class^="card-list"] li, [class^="deck-class"] li').length) {
            update = function() {
                deck.addCards('[class^="card-list"] li, [class^="deck-class"] li', '.card-name', '.card-count');
            };
            deck.name = $('.entry-title').text();
        } else {
            deckx = false;
        }
    },
    'hearthstonetopdeck.com/deck.php?': function() {
        update = function() {
            $('.cardname').each(function(i, el) {
                var values = $.trim($(this).text().replace(/[\t\n]+/g, '')).split(' ');
                var count = parseInt(values.shift(), 10);
                for (var l = 0; l < count; l++) {
                    deck.list.push(values.join(' '));
                }
            });
        };
        hsName = (/\d - (.*) - (.*)/g).exec($('#wrapper > #center > .headbar > div[style*="left"]').text());
        deck.name = hsName[1] + ' (' + hsName[2] + ')';
    },
    'gosugamers.net/hearthstone/decks/': function() {
        update = function() {
            deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');
        };
        deck.name = $('h2 [class^="class-color"]').text();
    },
    'hearthstoneplayers.com/': function() {
        if ($('[class^="deck-list"]').length) {
            update = function() {
                deck.addCards('.card', '.card-title', '.card-count');
            };
            deck.name = $('#deck-list-title').text();
        } else {
            deckx = false;
        }
    },
    'hearthpwn.com/decks/': function() {
        update = function() {
            deck.addCards('.even, .odd', 'b', '.col-name');
        };
        deck.name = $('.t-deck-title').text();
    },
    'icy-veins.com/hearthstone/': function() {
        if ($('.deck_card_list').length) {
            update = function() {
                $('.deck_card_list tbody tr td ul li').each(function(i, el) {
                    var values = $.trim($(this).text().replace(/(  GvG)?|([\t\n])+/g, '')).split(' ');
                    var count = parseInt(values.shift(), 10);
                    for (var l = 0; l < count; l++) {
                        deck.list.push(values.join(' '));
                    }
                });
            };
            deck.name = $('h2:eq(1)').text().replace(/[1-9]\.  (.*) (.*)? Deck↑top/g, '$1');
        } else {
            deckx = false;
        }
    },
    'hearthstats.net/decks/': function() {
        if ($('.deckBuilderCardsWrapper').length) {
            update = function() {
                deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
            };
            deck.name = $('.page-title').text().replace(/ Deck Views:.*/, "");
        } else {
            deckx = false;
        }
    },
    'teamarchon.com/decks/view/': function() {
        if ($('.decklist').length) {
            update = function() {
                $('.decklist li:gt(0)').each(function(i, el) {
                    var values = $('img', this).attr("alt");
                    quantity = $('a div', this).text();
                    deck.list.push(values);
                    if (quantity) {
                        for (var j = 1; j < quantity[quantity.length - 1]; j++) {
                            deck.list.push(values);
                        }
                    }
                });
            }
            deck.name = $('h1.page-title').text();
        } else {
            deckx = false;
        }
    },
    'hss.io/d': function() {
        if ($('.deckBuilderCardsWrapper').length) {
            update = function() {
                deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
            };
            deck.name = $('.page-title').text().replace(/ Deck Views:.*/, "");
        } else {
            deckx = false;
        }
    },
    'heartharena.com/arena-run/': function() {
        update = function() {
            deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity');
        };
        arena = true;
        deck.name = $('.deck-archetype-name').text() + ' (' + $('.deck-tier-score span').text() + ')';
    },
    'tempostorm.com': function() {
        if ($('.db-deck-cards').length) {
            update = function() {
                deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');
            };
            deck.name = $('h1.ng-binding').text();
        } else {
            deckx = false;
        }
    },
    'hearthpwn.com/deckbuilder': function() {
        update = function() {
            $('.even, .odd').each(function(i, el) {
                var values = $('b', this).text();
                var count = parseInt($('.inline-card-count', this).text().replace(/\D/g), 10);
                for (var m = 0; m < count; m++) {
                    deck.list.push(values);
                }
            });
        };
        deck.name = $('.deck-name-container > h2').text();
    },
    'pro.eslgaming.com/hearthstone/legendary/': function() {
        if ($('.decklist_compact').length) {
            update = function() {
                deck.addCards('.carditem_container', '[class^="name"]', '[class^="num"]');
            };
            deck.name = $('h3').text() + ' (' + $('.quickinfo a').first().text() + ')';
        } else {
            deckx = false;
        }
    },
    'hearthstonechampion.com/': function() {
        if ($('.deck-list.guide-deck-list').length) {
            update = function() {
                deck.addCards('.class-cards .card, .neutral-cards .card', '.card-title', '.card-count');
            };
            deck.name = $('#deck-list-title').text();
        } else {
            deckx = false;
        }
    }   
};
// Unsupported Sites
unsupported = [
    ".png",
    ".jpg",
    "gyazo.com",
    "liquidhearth.com",
    "millenium.org",
    "2p.com",
    "ebay.",
    "imgur.com",
    "instagram.com",
    "battle.net",
    "manacost.ru",
    "blizzpro.com",
    "reddit.",
    "hearthzone.ru",
    "trumpfans.com",
    "hearthclub.com",
    "github.",
    "file:/",
    "hearthstone.metabomb.net",
    "google.",
    "youtube.",
    "facebook."
];
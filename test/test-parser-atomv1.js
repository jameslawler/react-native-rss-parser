var assert = require('assert');
var atomv1 = require('./samples/atomv1');
var atomv1WithItunes = require('./samples/atomv1-with-itunes');
var rssParser = require('../index');

describe('when parse ATOM', function() {
  describe('valid document', function() {
    it('should return feed items', function() {
      return rssParser.parse(atomv1.feed)
        .then((result) => {
          assert.equal(result.title, 'ATOM title');
          assert.equal(result.links.length, 1);
          assert.equal(result.links[0].url, 'http://bakery-store.example.com/');
          assert.equal(result.description, 'A sample ATOM feed');
          assert.equal(result.items.length, 2);
          assert.equal(result.image.url, 'https://b.thumbs.redditmedia.com/ntr1FkBiO3nk4t4Vgy5GXoPQ_j2hirENH9iT8rXNf8M.png');
          assert.equal(result.items[0].title, 'Where Did The Cookie Come From');
          assert.equal(result.items[0].id, 'http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from');
          assert.equal(result.items[0].imageUrl, 'https://b.thumbs.redditmedia.com/ntr1FkBiO3nk4t4Vgy5GXoPQ_j2hirENH9iT8rXNf8.png');
          assert.equal(result.items[0].links.length, 1);
          assert.equal(result.items[0].links[0].url, 'http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from.html');
          assert.equal(result.items[0].links[0].rel, 'alternate');
          assert.equal(result.items[0].enclosures.length, 1);
          assert.equal(result.items[0].enclosures[0].url, 'https://www.example.com/audio.mp3');
          assert.equal(result.items[0].enclosures[0].mimeType, 'audio/mpeg');
          assert.equal(result.items[0].enclosures[0].length, '1234');
          assert.equal(result.items[0].description, 'The chocolate chip cookie was invented by Ruth Graves Wakefield.');
          assert.equal(result.items[1].title, 'What Is Sour Dough');
        });
    });
  });

  describe('with itunes elements', function() {
    it('should return itunes information for channel and item elements', function() {
      return rssParser.parse(atomv1WithItunes.feed)
        .then((result) => {
          assert.notEqual(result.itunes, undefined);
          assert.equal(result.itunes.authors.length, 1);
          assert.equal(result.itunes.authors[0].name, 'John Doe');
          assert.equal(result.itunes.block, 'no');
          assert.equal(result.itunes.categories.length, 3);
          assert.equal(result.itunes.categories[0].name, 'Technology');
          assert.equal(result.itunes.categories[0].subCategories.length, 1);
          assert.equal(result.itunes.categories[0].subCategories[0].name, 'Gadgets');
          assert.equal(result.itunes.categories[1].name, 'TV & Film');
          assert.equal(result.itunes.categories[1].subCategories.length, 0);
          assert.equal(result.itunes.categories[2].name, 'Arts');
          assert.equal(result.itunes.categories[2].subCategories.length, 1);
          assert.equal(result.itunes.categories[2].subCategories[0].name, 'Food');
          assert.equal(result.itunes.complete, 'yes');
          assert.equal(result.itunes.explicit, 'no');
          assert.equal(result.itunes.image, 'http://example.com/podcasts/everything/AllAboutEverything.jpg');
          assert.equal(result.itunes.newFeedUrl, 'http://newlocation.com/example.rss');
          assert.notEqual(result.itunes.owner, undefined);
          assert.equal(result.itunes.owner.name, 'John Doe');
          assert.equal(result.itunes.owner.email, 'john.doe@example.com');
          assert.equal(result.itunes.subtitle, 'A show about everything');
          assert.equal(result.itunes.summary, 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store');
          assert.equal(result.items.length, 2);
          assert.equal(result.items[0].itunes.authors.length, 1);
          assert.equal(result.items[0].itunes.authors[0].name, 'John Doe');
          assert.equal(result.items[0].itunes.block, 'yes');
          assert.equal(result.items[1].itunes.block, 'no');
          assert.equal(result.items[0].itunes.image, 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg');
          assert.equal(result.items[1].itunes.image, 'http://example.com/podcasts/everything/AllAboutEverything/Episode2.jpg');
          assert.equal(result.items[0].itunes.duration, '07:04');
          assert.equal(result.items[1].itunes.duration, '04:34');
          assert.equal(result.items[0].itunes.explicit, 'yes');
          assert.equal(result.items[1].itunes.explicit, 'no');
          assert.equal(result.items[0].itunes.isClosedCaptioned, undefined);
          assert.equal(result.items[1].itunes.isClosedCaptioned, 'yes');
          assert.equal(result.items[0].itunes.order, '1');
          assert.equal(result.items[1].itunes.order, '2');
          assert.equal(result.items[0].itunes.subtitle, 'A short primer on table spices');
          assert.equal(result.items[1].itunes.subtitle, 'Comparing socket wrenches is fun!');
          assert.equal(result.items[0].itunes.summary, `This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!`);
          assert.equal(result.items[1].itunes.summary, 'This week we talk about metric vs. Old English socket wrenches. Which one is better? Do you really need both? Get all of your answers here.');
        });
    });
  });
});

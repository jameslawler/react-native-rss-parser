var assert = require('assert');
var rssv2 = require('./samples/rssv2');
var rssv2InvalidFormat = require('./samples/rssv2-invalid-format');
var rssv2MultipleCategories = require('./samples/rssv2-multiple-categories');
var rssv2InvalidNoChannel = require('./samples/rssv2-invalid-no-channel');
var rssv2WithItunes = require('./samples/rssv2-with-itunes');
var rssv2WithContent = require('./samples/rssv2-with-content');
var rssv2WithDc = require('./samples/rssv2-with-dc');
var rssParser = require('../index');

describe('when rss parse', function() {
  describe('valid document', function() {
    it('should return rss items', function() {
      return rssParser.parse(rssv2.feed)
        .then((result) => {
          assert.equal(result.title, 'Scripting News');
          assert.equal(result.links.length, 2);
          assert.equal(result.links[0].url, 'http://www.scripting.com/');
          assert.equal(result.links[1].url, 'http://www.scripting2.com/');
          assert.equal(result.description, 'A weblog about scripting and stuff like that.');
          assert.equal(result.language, 'en-us');
          assert.equal(result.copyright, 'Copyright 1997-2002 Dave Winer');
          assert.equal(result.lastUpdated, 'Mon, 30 Sep 2002 11:00:00 GMT');
          assert.equal(result.lastPublished, undefined);
          assert.equal(result.categories.length, 1);
          assert.equal(result.categories[0].name, '1765');
          assert.equal(result.image.url, 'http://www.example.com/image.jpg');
          assert.equal(result.image.title, 'test image');
          assert.equal(result.authors.length, 1);
          assert.equal(result.authors[0].name, 'dave@userland.com');
          assert.equal(result.items.length, 9);
          assert.equal(result.items[0].id, 'http://scriptingnews.userland.com/backissues/2002/09/29#When:6:56:02PM');
          assert.equal(result.items[0].published, 'Mon, 30 Sep 2002 01:56:02 GMT');
          assert.equal(result.items[0].enclosures.length, 1);
          assert.equal(result.items[0].enclosures[0].url, 'http://www.scripting.com/mp3s/weatherReportSuite.mp3');
          assert.equal(result.items[0].enclosures[0].length, '12216320');
          assert.equal(result.items[0].enclosures[0].mimeType, 'audio/mpeg');
          assert.equal(result.items[0].content, undefined);
          assert.equal(result.items[1].published, 'Sun, 29 Sep 2002 19:59:01 GMT');
        });
    });
  });

  describe('multiple categories', function() {
    it('should return correct arrays when multiple groups with the same key', function() {
      return rssParser.parse(rssv2MultipleCategories.feed)
        .then((result) => {
          assert.equal(result.categories.length, 2);
          assert.equal(result.categories[0].name, 'channel-category-1');
          assert.equal(result.categories[1].name, 'channel-category-2');
          assert.equal(result.items[1].categories.length, 2);
          assert.equal(result.items[1].categories[0].name, 'item-category-1');
          assert.equal(result.items[1].categories[1].name, 'item-category-2');
        });
    });
  });

  describe('with itunes elements', function() {
    it('should return itunes information for channel and item elements', function() {
      return rssParser.parse(rssv2WithItunes.feed)
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
          assert.equal(result.items.length, 4);
          assert.equal(result.items[0].itunes.authors.length, 1);
          assert.equal(result.items[0].itunes.authors[0].name, 'John Doe');
          assert.equal(result.items[0].itunes.block, 'yes');
          assert.equal(result.items[1].itunes.block, 'no');
          assert.equal(result.items[2].itunes.block, undefined);
          assert.equal(result.items[0].itunes.image, 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg');
          assert.equal(result.items[1].itunes.image, 'http://example.com/podcasts/everything/AllAboutEverything/Episode2.jpg');
          assert.equal(result.items[0].itunes.duration, '07:04');
          assert.equal(result.items[1].itunes.duration, '04:34');
          assert.equal(result.items[0].itunes.explicit, 'yes');
          assert.equal(result.items[1].itunes.explicit, 'no');
          assert.equal(result.items[0].itunes.isClosedCaptioned, undefined);
          assert.equal(result.items[2].itunes.isClosedCaptioned, 'Yes');
          assert.equal(result.items[0].itunes.order, '1');
          assert.equal(result.items[1].itunes.order, '2');
          assert.equal(result.items[0].itunes.subtitle, 'A short primer on table spices');
          assert.equal(result.items[1].itunes.subtitle, 'Comparing socket wrenches is fun!');
          assert.equal(result.items[0].itunes.summary, `This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!`);
          assert.equal(result.items[1].itunes.summary, 'This week we talk about metric vs. Old English socket wrenches. Which one is better? Do you really need both? Get all of your answers here.');
        });
    });
  });

  describe('with content:encoded elements', function() {
    it('should return content information for item elements', function() {
      return rssParser.parse(rssv2WithContent.feed)
        .then((result) => {
          assert.equal(result.items[0].content, 'This is test item 1');
          assert.equal(result.items[1].content, 'This is test item 2');
        });
    });
  });

  describe('invalid document', function() {
    it('should reject promise', function() {
      return rssParser.parse(rssv2InvalidFormat.feed)
        .then((result) => {
          assert.fail('Should be invalid');
        })
        .catch((error) => {
          assert.notEqual(error, undefined);
        });
    });
  });

  describe('when feed has no channel element', function() {
    it('should reject promise', function() {
      return rssParser.parse(rssv2InvalidNoChannel.feed)
        .then((result) => {
          assert.fail('Should be invalid');
        })
        .catch((error) => {
          assert.equal(error, 'Unable to find any RSS element in feed');
        });
    });
  });

  describe('with dc:* elements', function() {
    it('should return information for dublin core', function() {
      return rssParser.parse(rssv2WithDc.feed)
        .then((result) => {
          assert.equal(result.items[0].published, 'Sun, 29 Sep 2002 17:05:20 GMT');
          assert.equal(result.items[0].categories[0].name, 'channel-category');
          assert.equal(result.items[0].authors[0].name, 'dave@userland.com');
        });
    });
  });
});

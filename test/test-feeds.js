var assert = require('assert');
var reuters = require('./samples/reuters');
var rssParser = require('../index');

describe('when parse reuters', function() {
  describe('valid document', function() {
    it('should return feed items', function() {
      return rssParser.parse(reuters.feed)
        .then((result) => {
          assert.equal(result.title, 'Reuters: World News');
          assert.equal(result.links.length, 1);
          assert.equal(result.links[0].url, 'http://www.reuters.com');
          assert.equal(result.description, 'Reuters.com is your source for breaking news, business, financial and investing news, including personal finance and stocks.  Reuters is the leading global provider of news, financial information and technology solutions to the world\'s media, financial institutions, businesses and individuals.');
          assert.equal(result.image.url, 'http://www.reuters.com/resources_v2/images/reuters125.png');
          assert.equal(result.image.title, 'Reuters News');
          assert.equal(result.image.width, '120');
          assert.equal(result.image.height, '35');
          assert.equal(result.language, 'en-us');
          assert.equal(result.lastUpdated, 'Tue, 30 Jan 2018 17:54:13 -0500');
          assert.equal(result.copyright, 'All rights reserved. Users may download and print extracts of content from this website for their own personal and non-commercial use only. Republication or redistribution of Reuters content, including by framing or similar means, is expressly prohibited without the prior written consent of Reuters. Reuters and the Reuters sphere logo are registered trademarks or trademarks of the Reuters group of companies around the world. © Reuters 2018');
          assert.equal(result.items.length, 10);
          assert.equal(result.items[0].title, 'U.S. general says North Korea not demonstrated all components of ICBM');
          assert.equal(result.items[0].categories.length, 1);
          assert.equal(result.items[0].categories[0].name, 'worldNews');
          assert.equal(result.items[1].title, 'Publication of Russia \'oligarch list\' may affect investors: group');
          assert.equal(result.items[1].categories.length, 1);
          assert.equal(result.items[1].categories[0].name, 'worldNews');
        });
    });
  });
});
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
          assert.equal(result.items.length, 10);
          assert.equal(result.items[0].title, 'U.S. general says North Korea not demonstrated all components of ICBM');
          assert.equal(result.items[0].categories.length, 1);
          assert.equal(result.items[0].categories[0].name, 'worldNews');
        });
    });
  });
});
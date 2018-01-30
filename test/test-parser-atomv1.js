var assert = require('assert');
var atomv1 = require('./samples/atomv1');
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
          assert.equal(result.items[0].title, 'Where Did The Cookie Come From');
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
});

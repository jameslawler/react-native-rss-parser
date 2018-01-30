var assert = require('assert');
var rssv2 = require('./samples/rssv2');
var atomv1 = require('./samples/atomv1');
var rssv2InvalidFormat = require('./samples/rssv2-invalid-format');
var rssv2MultipleCategories = require('./samples/rssv2-multiple-categories');
var rssv2InvalidNoChannel = require('./samples/rssv2-invalid-no-channel');
var rssParser = require('../index');

describe('when rss parse', function() {
  describe('valid document', function() {
    it('should return rss items', function() {
      return rssParser.parse(rssv2.feed)
        .then((result) => {
          assert.equal(result.title, 'Scripting News');
          assert.equal(result.link, 'http://www.scripting.com/');
          assert.equal(result.description, 'A weblog about scripting and stuff like that.');
          assert.equal(result.language, 'en-us');
          assert.equal(result.copyright, 'Copyright 1997-2002 Dave Winer');
          assert.equal(result.lastUpdated, 'Mon, 30 Sep 2002 11:00:00 GMT');
          assert.equal(result.lastPublished, undefined);
          assert.equal(result.categories.length, 1);
          assert.equal(result.categories[0].name, '1765');
          assert.equal(result.image.url, "http://www.example.com/image.jpg");
          assert.equal(result.authors.length, 1);
          assert.equal(result.authors[0].name, 'dave@userland.com');
          assert.equal(result.items.length, 9);
          assert.equal(result.items[0].published, 'Mon, 30 Sep 2002 01:56:02 GMT');
          assert.equal(result.items[0].enclosures.length, 1);
          assert.equal(result.items[0].enclosures[0].url, 'http://www.scripting.com/mp3s/weatherReportSuite.mp3');
          assert.equal(result.items[0].enclosures[0].length, '12216320');
          assert.equal(result.items[0].enclosures[0].mimeType, 'audio/mpeg');
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
});

// describe('when ATOM parse', function() {
//   describe('valid document', function() {
//     it('should return feed items', function() {
//       return rssParser.parse(atomv1.feed)
//         .then((result) => {
//           assert.equal(result.title, 'ATOM title');
//           assert.equal(result.link, 'http://bakery-store.example.com/');
//           assert.equal(result.description, 'A sample ATOM feed');
//           assert.equal(result.items.length, 2);
//           assert.equal(result.items[0].title, 'Where Did The Cookie Come From');
//           assert.equal(result.items[0].link, 'http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from.html');
//           assert.equal(result.items[0].description, 'The chocolate chip cookie was invented by Ruth Graves Wakefield.');
//           assert.equal(result.items[1].title, 'What Is Sour Dough');
//         });
//     });
//   });
// });
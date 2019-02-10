var DOMParser = require('xmldom').DOMParser;
var rssV2Parser = require('./parsers/rssv2');
var atomV1Parser = require('./parsers/atomv1');

exports.parse = function(feed) {
  return new Promise((resolve, reject) => {
    var document = new DOMParser({
      errorHandler: function(level, msg) {
        reject(msg);
      }
    }).parseFromString(feed, 'text/xml');

    let parser = getParser(document);

    if (!parser) {
      reject('Unable to find any RSS element in feed');
    }

    let parsedFeed = parser.parse(document);

    resolve(parsedFeed);
  });
};

function getParser(document) {
  let isRssSpecification = document.getElementsByTagName('channel')[0] !== undefined;
  let isAtomSpecification = document.getElementsByTagName('feed')[0] !== undefined;

  if (isRssSpecification) {
    return rssV2Parser;
  }

  if (isAtomSpecification) {
    return atomV1Parser;
  }

  return;
}

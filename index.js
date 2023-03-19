const DOMParser = require('@xmldom/xmldom').DOMParser;
const rssV2Parser = require('./parsers/rssv2');
const atomV1Parser = require('./parsers/atomv1');

const getParser = (document) => {
  const isRssSpecification =
    document.getElementsByTagName('channel')[0] !== undefined;
  const isAtomSpecification =
    document.getElementsByTagName('feed')[0] !== undefined;

  if (isRssSpecification) {
    return rssV2Parser;
  }

  if (isAtomSpecification) {
    return atomV1Parser;
  }

  return null;
};

exports.parse = (feed) =>
  new Promise((resolve, reject) => {
    const document = new DOMParser({
      errorHandler: (_level, msg) => {
        reject(msg);
      },
    }).parseFromString(feed, 'text/xml');

    const parser = getParser(document);

    if (!parser) {
      reject('Unable to find any RSS element in feed');
    }

    const parsedFeed = parser.parse(document);

    resolve(parsedFeed);
  });

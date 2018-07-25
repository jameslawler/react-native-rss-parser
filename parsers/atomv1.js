var utils = require('./utils');
var model = require('../model/rss');
var itunesParser = require('./itunes');

exports.parse = function(document) {
  let parsedFeed = Object.assign({}, model.rss);
  
  parsedFeed = mapChannelFields(document, parsedFeed);
  parsedFeed.type = 'atom-v1';
  parsedFeed.items = mapItems(document);

  return parsedFeed;
};

function mapChannelFields(document, parsedFeed) {
  const channelNodes = utils.getElements(document, 'feed');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  parsedFeed.title = getChannelTitle(channelNode);
  parsedFeed.links = getChannelLinks(channelNode);
  parsedFeed.description = getChannelDescription(channelNode);
  parsedFeed.copyright = getChannelCopyright(channelNode);
  parsedFeed.authors = getChannelAuthors(channelNode);
  parsedFeed.lastUpdated = getChannelLastUpdated(channelNode);
  parsedFeed.lastPublished = getChannelLastPublished(channelNode);
  parsedFeed.categories = getChannelCategories(channelNode);
  parsedFeed.image = getChannelImage(channelNode);
  parsedFeed.itunes = itunesParser.parseChannel(channelNode);

  return parsedFeed;
}

function getChannelTitle(node) {
  return utils.getElementTextContent(node, 'title');
}

function getChannelLinks(node) {
  const links = utils.getChildElements(node, 'link');

  return links.map(function(link) {
    return {
      url: link.getAttribute('href'),
      rel: link.getAttribute('rel')
    };
  });
}

function getChannelDescription(node) {
  return utils.getElementTextContent(node, 'subtitle');
}

function getChannelCopyright(node) {
  return utils.getElementTextContent(node, 'rights');
}

function getChannelAuthors(node) {
  const authors = utils.getChildElements(node, 'author');

  return authors.map(function(author) {
    return {
      name: utils.getElementTextContent(author, 'name')
    };
  });
}

function getChannelLastUpdated(node) {
  return utils.getElementTextContent(node, 'updated');
}

function getChannelLastPublished(node) {
  return utils.getElementTextContent(node, 'published');
}

function getChannelCategories(node) {
  const categories = utils.getChildElements(node, 'category');

  return categories.map(function(category) {
    return {
      name: category.getAttribute('term')
    }
  });
}

function getChannelImage(node) {
  var img = utils.getElementTextContent(node, 'image');

  if(img === '' || img === undefined){
    img = utils.getElementTextContent(node, 'logo');
  }

  if(img === '' || img === undefined){
    img = utils.getElementTextContent(node, 'icon');
  }

  return {
    url: img,
    title: undefined,
    description: undefined,
    width: undefined,
    height: undefined,
  };
}

function getItemTitle(node) {
  return utils.getElementTextContent(node, 'title');
}

function getItemLinks(node) {
  const links = utils.getChildElements(node, 'link');
  const linksWithoutEnclosures = links.filter(link =>
    link.getAttribute('rel') !== 'enclosure');

  return linksWithoutEnclosures.map(function(link) {
    return {
      url: link.getAttribute('href'),
      rel: link.getAttribute('rel')
    };
  });
}

function getItemDescription(node) {
  return utils.getElementTextContent(node, 'summary');
}

function getItemContent(node) {
  return utils.getElementTextContent(node, 'content');
}

function getItemImage(node) {
  return utils.getElementTextContent(node, 'icon');
}

function getItemAuthors(node) {
  const authors = utils.getChildElements(node, 'author');

  return authors.map(function(author) {
    return {
      name: utils.getElementTextContent(author, 'name')
    };
  });
}

function getItemCategories(node) {
  const categories = utils.getChildElements(node, 'category');

  return categories.map(function(category) {
    return {
      name: category.getAttribute('term')
    }
  });
}

function getItemPublished(node) {
  var pub = utils.getElementTextContent(node, 'updated');

  if(pub === '' || pub === undefined){
    utils.getElementTextContent(node, 'published');
  }

  return pub;
}

function getItemId(node) {
  return utils.getElementTextContent(node, 'id');
}

function getItemEnclosures(node) {
  const links = utils.getChildElements(node, 'link');
  const enclosureLinks = links.filter(link =>
    link.getAttribute('rel') === 'enclosure');

  return enclosureLinks.map(function(link) {
    return {
      url: link.getAttribute('href'),
      length: link.getAttribute('length'),
      mimeType: link.getAttribute('type')
    };
  });
}

function mapItems(document) {
  const itemNodes = utils.getElements(document, 'entry');

  return itemNodes.map(function(item) {
    return {
      title: getItemTitle(item),
      links: getItemLinks(item),
      description: getItemDescription(item),
      id: getItemId(item),
      imageUrl: getItemImage(item),
      content: getItemContent(item),
      authors: getItemAuthors(item),
      categories: getItemCategories(item),
      published: getItemPublished(item),
      enclosures: getItemEnclosures(item),
      itunes: itunesParser.parseItem(item)
    };
  });
}
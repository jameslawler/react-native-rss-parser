const utils = require('./utils');
const model = require('../model/rss');
const namespaces = require('./namespaces');
const itunesParser = require('./itunes');

const getChannelTitle = (node) => utils.getElementTextContent(node, 'title');

const getChannelLinks = (node) => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node) =>
  utils.getElementTextContent(node, 'description');

const getChannelLanguage = (node) =>
  utils.getElementTextContent(node, 'language');

const getChannelCopyright = (node) =>
  utils.getElementTextContent(node, 'copyright');

const getChannelAuthors = (node) => {
  const authors = utils.getElementTextContentArray(node, 'managingEditor');

  return authors.map((author) => ({
    name: author,
  }));
};

const getChannelLastUpdated = (node) =>
  utils.getElementTextContent(node, 'lastBuildDate');

const getChannelLastPublished = (node) =>
  utils.getElementTextContent(node, 'pubDate');

const getChannelCategories = (node) => {
  const categories = utils.getElementTextContentArray(node, 'category');

  return categories.map((category) => ({
    name: category,
  }));
};

const getChannelImage = (node) => {
  const imageNodes = utils.getChildElements(node, 'image');

  if (imageNodes.length === 0) {
    return {
      url: undefined,
      title: undefined,
      description: undefined,
      width: undefined,
      height: undefined,
    };
  }

  const imageNode = imageNodes[0];

  return {
    url: utils.getElementTextContent(imageNode, 'url'),
    title: utils.getElementTextContent(imageNode, 'title'),
    description: utils.getElementTextContent(imageNode, 'description'),
    width: utils.getElementTextContent(imageNode, 'width'),
    height: utils.getElementTextContent(imageNode, 'height'),
  };
};

const getItemTitle = (node) => utils.getElementTextContent(node, 'title');

const getItemLinks = (node) => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};

const getItemDescription = (node) =>
  utils.getElementTextContent(node, 'description');

const getItemContent = (node) =>
  utils.getElementTextContent(node, 'encoded', namespaces.content);

const getItemAuthors = (node) => {
  let authors = utils.getElementTextContentArray(node, 'author');

  if (authors.length === 0) {
    authors = utils.getElementTextContentArray(node, 'dc:creator');
  }

  return authors.map((author) => ({
    name: author,
  }));
};

const getItemCategories = (node) => {
  let categories = utils.getElementTextContentArray(node, 'category');

  if (categories.length === 0) {
    categories = utils.getElementTextContentArray(node, 'dc:subject');
  }

  return categories.map((category) => ({
    name: category,
  }));
};

const getItemId = (node) => utils.getElementTextContent(node, 'guid');

const getItemPublished = (node) =>
  utils.getElementTextContent(node, 'pubDate') ||
  utils.getElementTextContent(node, 'dc:date');

const getItemEnclosures = (node) => {
  const enclosures = utils.getChildElements(node, 'enclosure');

  return enclosures.map((enclosure) => ({
    url: enclosure.getAttribute('url'),
    length: enclosure.getAttribute('length'),
    mimeType: enclosure.getAttribute('type'),
  }));
};

const mapChannelFields = (document) => {
  const channelNodes = utils.getElements(document, 'channel');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  return {
    title: getChannelTitle(channelNode),
    links: getChannelLinks(channelNode),
    description: getChannelDescription(channelNode),
    language: getChannelLanguage(channelNode),
    copyright: getChannelCopyright(channelNode),
    authors: getChannelAuthors(channelNode),
    lastUpdated: getChannelLastUpdated(channelNode),
    lastPublished: getChannelLastPublished(channelNode),
    categories: getChannelCategories(channelNode),
    image: getChannelImage(channelNode),
    itunes: itunesParser.parseChannel(channelNode),
  };
};

const mapItems = (document) => {
  const itemNodes = utils.getElements(document, 'item');

  return itemNodes.map((item) => ({
    title: getItemTitle(item),
    links: getItemLinks(item),
    description: getItemDescription(item),
    content: getItemContent(item),
    id: getItemId(item),
    authors: getItemAuthors(item),
    categories: getItemCategories(item),
    published: getItemPublished(item),
    enclosures: getItemEnclosures(item),
    itunes: itunesParser.parseItem(item),
  }));
};

exports.parse = (document) => ({
  ...model.rss,
  type: 'rss-v2',
  ...mapChannelFields(document),
  items: mapItems(document),
});

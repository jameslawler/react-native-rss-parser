const utils = require('./utils');
const model = require('../model/rss');
const itunesParser = require('./itunes');

const getChannelTitle = (node) => utils.getElementTextContent(node, 'title');

const getChannelLinks = (node) => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node) =>
  utils.getElementTextContent(node, 'subtitle');

const getChannelCopyright = (node) =>
  utils.getElementTextContent(node, 'rights');

const getChannelAuthors = (node) => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author) => ({
    name: utils.getElementTextContent(author, 'name'),
  }));
};

const getChannelLastUpdated = (node) =>
  utils.getElementTextContent(node, 'updated');

const getChannelLastPublished = (node) =>
  utils.getElementTextContent(node, 'published');

const getChannelCategories = (node) => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category) => ({
    name: category.getAttribute('term'),
  }));
};

const getChannelImage = (node) => {
  let img = utils.getElementTextContent(node, 'image');

  if (img === '' || img === undefined) {
    img = utils.getElementTextContent(node, 'logo');
  }

  if (img === '' || img === undefined) {
    img = utils.getElementTextContent(node, 'icon');
  }

  return {
    url: img,
    title: undefined,
    description: undefined,
    width: undefined,
    height: undefined,
  };
};

const getItemTitle = (node) => utils.getElementTextContent(node, 'title');

const getItemLinks = (node) => {
  const links = utils.getChildElements(node, 'link');
  const linksWithoutEnclosures = links.filter(
    (link) => link.getAttribute('rel') !== 'enclosure'
  );

  return linksWithoutEnclosures.map((link) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getItemDescription = (node) =>
  utils.getElementTextContent(node, 'summary');

const getItemContent = (node) => utils.getElementTextContent(node, 'content');

const getItemImage = (node) => utils.getElementTextContent(node, 'icon');

const getItemAuthors = (node) => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author) => ({
    name: utils.getElementTextContent(author, 'name'),
  }));
};

const getItemCategories = (node) => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category) => ({
    name: category.getAttribute('term'),
  }));
};

const getItemPublished = (node) => {
  let pub = utils.getElementTextContent(node, 'updated');

  if (pub === '' || pub === undefined) {
    pub = utils.getElementTextContent(node, 'published');
  }

  return pub;
};

const getItemId = (node) => utils.getElementTextContent(node, 'id');

const getItemEnclosures = (node) => {
  const links = utils.getChildElements(node, 'link');
  const enclosureLinks = links.filter(
    (link) => link.getAttribute('rel') === 'enclosure'
  );

  return enclosureLinks.map((link) => ({
    url: link.getAttribute('href'),
    length: link.getAttribute('length'),
    mimeType: link.getAttribute('type'),
  }));
};

const mapChannelFields = (document) => {
  const channelNodes = utils.getElements(document, 'feed');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  return {
    title: getChannelTitle(channelNode),
    links: getChannelLinks(channelNode),
    description: getChannelDescription(channelNode),
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
  const itemNodes = utils.getElements(document, 'entry');

  return itemNodes.map((item) => ({
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
    itunes: itunesParser.parseItem(item),
  }));
};

exports.parse = (document) => ({
  ...model.rss,
  type: 'atom-v1',
  ...mapChannelFields(document),
  items: mapItems(document),
});

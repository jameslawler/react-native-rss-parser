var utils = require('./utils');
var namespaces = require('./namespaces');

exports.parseChannel = function(node) {
  return {
    authors: getAuthors(node),
    block: getBlock(node),
    categories: getCategories(node),
    complete: getComplete(node),
    explicit: getExplicit(node),
    image: getImage(node),
    newFeedUrl: getNewFeedUrl(node),
    owner: getOwner(node),
    subtitle: getSubtitle(node),
    summary: getSummary(node)
  }
};

exports.parseItem = function(node) {
  return {
    authors: getAuthors(node),
    block: getBlock(node),
    duration: getDuration(node),
    explicit: getExplicit(node),
    image: getImage(node),
    isClosedCaptioned: getIsClosedCaptioned(node),
    order: getOrder(node),
    subtitle: getSubtitle(node),
    summary: getSummary(node),
  };
};

function getAuthors(node) {
  const authors = utils.getElementTextContentArray(node, 'author', namespaces.itunes);

  return authors.map(function(author) {
    return {
      name: author
    };
  });
}

function getBlock(node) {
  return utils.getElementTextContent(node, 'block', namespaces.itunes);
}

function getCategories(node) {
  const categories = utils.getChildElements(node, 'category', namespaces.itunes);

  return categories.map(function(category) {
    return {
      name: category.getAttribute('text'),
      subCategories: getSubCategories(category)
    }
  });
}

function getSubCategories(node) {
  const categories = utils.getChildElements(node, 'category', namespaces.itunes);

  if (categories.length === 0) {
    return [];
  }

  return categories.map(function(category) {
    return {
      name: category.getAttribute('text')
    }
  });
}

function getComplete(node) {
  return utils.getElementTextContent(node, 'complete', namespaces.itunes);
}

function getDuration(node) {
  return utils.getElementTextContent(node, 'duration', namespaces.itunes);
}

function getExplicit(node) {
  return utils.getElementTextContent(node, 'explicit', namespaces.itunes);
}

function getImage(node) {
  const images = utils.getChildElements(node, 'image', namespaces.itunes);

  if (images.length > 0) {
    return images[0].getAttribute('href');
  }

  return undefined;
}

function getIsClosedCaptioned(node) {
  return utils.getElementTextContent(node, 'isClosedCaptioned', namespaces.itunes);
}

function getNewFeedUrl(node) {
  return utils.getElementTextContent(node, 'new-feed-url', namespaces.itunes);
}

function getOrder(node) {
  return utils.getElementTextContent(node, 'order', namespaces.itunes);
}

function getOwner(node) {
  const owners = utils.getChildElements(node, 'owner', namespaces.itunes);

  if (owners.length === 0) {
    return {
      name: undefined,
      email: undefined
    };
  }

  return {
    name: utils.getElementTextContent(owners[0], 'name', namespaces.itunes),
    email: utils.getElementTextContent(owners[0], 'email', namespaces.itunes),
  };
}

function getSubtitle(node) {
  return utils.getElementTextContent(node, 'subtitle', namespaces.itunes);
}

function getSummary(node) {
  return utils.getElementTextContent(node, 'summary', namespaces.itunes);
}
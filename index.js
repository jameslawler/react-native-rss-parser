var DOMParser = require('xmldom').DOMParser;
var fields = require('./model/fields');
var types = require('./model/types');
const util = require('util');

exports.parse = function(feed) {
  return new Promise((resolve, reject) => {
    var parsedFeed = {};
    var document = new DOMParser({
      errorHandler: function(level, msg) {
        reject(msg);
      }
    }).parseFromString(feed, 'text/xml');

    let channel = document.getElementsByTagName('channel')[0];
    parsedFeed = parseNode(channel, fields.rssv2);
    resolve(parsedFeed);
  });
};

function parseNode(node, fields) {
  const parsedNode = {};

  Object.keys(fields).forEach(function(key) {
    const field = fields[key];

    if (field.type === types.object) {
      parsedNode[key] = getValueOrUndefined(node, key);

      if (parsedNode[key] && field.attributes) {
        Object.keys(field.attributes).forEach(function(attribute) {
          parsedNode[key][attribute] = getAttributeOrUndefined(node, key, attribute);
        });
      }
    } else if (field.type === types.array) {
      parsedNode[field.plural] = [];
      const elements = getElements(node, key);
      
      Array.prototype.forEach.call(elements, element => {
        let arrayNode = {};

        if (field.elements) {
          arrayNode = parseNode(element, field.elements);
        } else if (element.textContent) {
          arrayNode.value = element.textContent;
        }

        if (field.attributes) {
          Object.keys(field.attributes).forEach(function(attribute) {
            arrayNode[attribute] = getAttributeOrUndefined(node, key, attribute);
          });
        }

        parsedNode[field.plural].push(arrayNode);
      });
    }
  });

  return parsedNode;
}

function getElements(node, tagName) {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  let elements = node.getElementsByTagName(tagName);

  return Array.prototype.filter.call(elements, element => element.parentNode.nodeName === node.nodeName);
}

function getValueOrUndefined(node, tagName) {
  const nodes = getElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return undefined;
  }

  return nodes[0].textContent;
}

function getAttributeOrUndefined(node, tagName, attribute) {
  const nodes = getElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return undefined;
  }

  return nodes[0].getAttribute(attribute);
}
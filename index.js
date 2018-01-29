var DOMParser = require('xmldom').DOMParser;
var fields = require('./model/fields');
var types = require('./model/types');

exports.parse = function(feed) {
  return new Promise((resolve, reject) => {
    var parsedFeed = {};
    var document = new DOMParser({
      errorHandler: function(level, msg) {
        reject(msg);
      }
    }).parseFromString(feed, 'text/xml');

    let channel = document.getElementsByTagName('channel')[0];

    if (!channel) {
      reject('Unable to find <channel> element in feed');
    } else {
      parsedFeed = parseFields(channel, fields.rssv2);
      resolve(parsedFeed);    
    }
  });
};

function parseFields(node, fields) {
  const parsedNode = {};

  Object.keys(fields).forEach(function(key) {
    const field = fields[key];
    const parsedFieldKey = field.fieldOverride || key;

    if (field.type === types.object) {
      if (field.attribute) {
        parsedNode[parsedFieldKey] = getElementAttributeContent(node, key, field.attribute);
      } else if (field.attributes) {
        parsedNode[parsedFieldKey] = {};
        Object.keys(field.attributes).forEach(function(attribute) {
          parsedNode[parsedFieldKey][attribute] = getElementAttributeContent(node, key, attribute);
        });
      } else {
        parsedNode[parsedFieldKey] = getElementTextContent(node, key);
      }
    } else if (field.type === types.array) {
      parsedNode[parsedFieldKey] = [];
      const elements = getChildElements(node, key);
      
      Array.prototype.forEach.call(elements, element => {
        let arrayNode = {};

        if (field.elements) {
          arrayNode = parseFields(element, field.elements);
        } else if (element.textContent) {
          arrayNode.value = element.textContent;
        }

        if (field.attributes) {
          Object.keys(field.attributes).forEach(function(attribute) {
            arrayNode[attribute] = getElementAttributeContent(node, key, attribute);
          });
        }

        parsedNode[parsedFieldKey].push(arrayNode);
      });
    }
  });

  return parsedNode;
}

function getChildElements(node, tagName) {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  let elements = node.getElementsByTagName(tagName);

  return Array.prototype.filter.call(elements, element => 
    element.parentNode.nodeName === node.nodeName);
}

function getElementTextContent(node, tagName) {
  const nodes = getChildElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return undefined;
  }

  return nodes[0].textContent;
}

function getElementAttributeContent(node, tagName, attribute) {
  const nodes = getChildElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return undefined;
  }

  return nodes[0].getAttribute(attribute);
}
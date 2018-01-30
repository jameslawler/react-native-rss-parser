exports.getElements = function(node, tagName) {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  let elements = node.getElementsByTagName(tagName);

  return Array.prototype.slice.call(elements);
}

exports.getChildElements = function(node, tagName) {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  let elements = node.getElementsByTagName(tagName);

  return Array.prototype.filter.call(elements, element => 
    element.parentNode.nodeName === node.nodeName);
}

exports.getElementTextContentArray = function(node, tagName) {
  const nodes = this.getChildElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return [];
  }

  return nodes.map(node => node.textContent);
}

exports.getElementTextContent = function(node, tagName) {
  const array = this.getElementTextContentArray(node, tagName);

  return array.length === 0 ? undefined : array[0];
}

exports.getElementAttributeContent = function(node, tagName, attribute) {
  const nodes = this.getChildElements(node, tagName);

  if (!nodes || nodes.length === 0) {
    return undefined;
  }

  return nodes[0].getAttribute(attribute);
}
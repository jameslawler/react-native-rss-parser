exports.getElements = function(node, tagName) {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  let elements = node.getElementsByTagName(tagName);

  return Array.prototype.slice.call(elements);
}

exports.getChildElements = function(node, tagName, namespace) {
  if (!node) {
    return [];
  }

  let elements = namespace ?
    node.getElementsByTagNameNS(namespace, tagName) :
    node.getElementsByTagName(tagName);

  if (!elements) {
    return [];
  }

  return Array.prototype.filter.call(elements, element => 
    element.parentNode.nodeName === node.nodeName);
}

exports.getElementTextContentArray = function(node, tagName, namespace) {
  const nodes = this.getChildElements(node, tagName, namespace);

  if (!nodes || nodes.length === 0) {
    return [];
  }

  return nodes.map(node => node.textContent);
}

exports.getElementTextContent = function(node, tagName, namespace) {
  const array = this.getElementTextContentArray(node, tagName, namespace);

  return array.length === 0 ? undefined : array[0];
}
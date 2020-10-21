exports.getElements = (node, tagName) => {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  const elements = node.getElementsByTagName(tagName);

  return Array.prototype.slice.call(elements);
};

exports.getChildElements = (node, tagName, namespace) => {
  if (!node) {
    return [];
  }

  const elements = namespace
    ? node.getElementsByTagNameNS(namespace, tagName)
    : node.getElementsByTagName(tagName);

  if (!elements) {
    return [];
  }

  return Array.prototype.filter.call(
    elements,
    (element) => element.parentNode.nodeName === node.nodeName
  );
};

exports.getElementTextContentArray = (node, tagName, namespace) => {
  const nodes = exports.getChildElements(node, tagName, namespace);

  if (!nodes || nodes.length === 0) {
    return [];
  }

  return nodes.map((node) => node.textContent);
};

exports.getElementTextContent = (node, tagName, namespace) => {
  const array = exports.getElementTextContentArray(node, tagName, namespace);

  return array.length === 0 ? undefined : array[0];
};

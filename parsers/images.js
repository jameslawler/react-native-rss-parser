var utils = require('./utils');

var imgRegex = /(<img [^>]*src=\"(.*?[^\\])\"[^>]*>)|(<img [^>]*src=\'(.*?[^\\])\'[^>]*>)/;

exports.parseImage = function (node) {
  /**
   * If it's content is xml, lets directly search for an img tag
   */
  var rawContent = utils.getElements(node, "img");
  if (rawContent && rawContent.length > 0) {
    for (var i = 0; i < rawContent.length; i++) {
      var imgNode = rawContent[i];
      var src = imgNode.getAttribute("src");
      if (src && src.length > 0)
        return src;
    }
  }

  /**
   * no image tag, so go and find one in the description or summary/content
   */

  var content = utils.getElementTextContent(node, 'description') || (utils.getElementTextContent(node, 'summary') + utils.getElementTextContent(node, 'content'));
  var regexResult = imgRegex.exec(content);

  if (regexResult) {
    var imgSrc = regexResult[2] || regexResult[4];
    return imgSrc;
  }

  return undefined;
}
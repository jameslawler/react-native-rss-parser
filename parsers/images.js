var utils = require('./utils');

var imgRegex = /(<img [^>]*src=\"(.*?[^\\])\"[^>]*>)|(<img [^>]*src=\'(.*?[^\\])\'[^>]*>)/;

exports.parseImage = function(node){
  var content = utils.getElementTextContent(node, 'description') || utils.getElementTextContent(node, 'summary') + utils.getElementTextContent(node, 'content');

  var regexResult = imgRegex.exec(content);
  if(regexResult){
    var imgSrc = regexResult[2] || regexResult[4];
    return imgSrc;
  }

  return undefined;
}
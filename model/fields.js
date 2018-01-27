var types = require('./types');

const fields = module.exports = {};

fields.rssv2 = {
 'title': { type: types.object },
 'link': { type: types.object },
 'description': { type: types.object },
 'language': { type: types.object },
 'copyright': { type: types.object },
 'managingEditor': { type: types.object },
 'webMaster': { type: types.object },
 'pubDate': { type: types.object },
 'lastBuildDate': { type: types.object },
 'category': { 
   type: types.array,
   plural: 'categories'
  },
 'generator': { type: types.object },
 'ttl': { type: types.object },
 'image': { type: types.object },
 'skipHours': { type: types.object },
 'skipDays': { type: types.object },
 'image': {
   type: types.object,
   attributes: {
    'url': { type: types.object },
    'title': { type: types.object },
    'link': { type: types.object },
    'width': { type: types.object },
    'height': { type: types.object },
    'description': { type: types.object }
   }
 },
 'item': {
   type: types.array,
   plural: 'items',
   elements: {
    'title': { type: types.object },
    'link': { type: types.object },
    'description': { type: types.object },
    'author': { 
      type: types.array,
      plural: 'authors'
    },
    'category': { 
      type: types.array,
      plural: 'categories'
    },
    'comments': { 
      type: types.array,
      plural: 'comments'
    },
    'enclosure': {
      type: types.array,
      plural: 'enclosures',
      attributes: {
       'url': { type: types.object },
       'length': { type: types.object },
       'type': { type: types.object }
      }
    },
    'guid': {
      type: types.array,
      plural: 'guids'
    },
    'pubDate': { type: types.object },
    'source': {
      type: types.object,
      attributes: {
       'url': { type: types.object }
      }
    }
   }
 }
};
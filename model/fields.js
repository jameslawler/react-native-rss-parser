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
   fieldOverride: 'categories'
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
   fieldOverride: 'items',
   elements: {
    'title': { type: types.object },
    'link': { type: types.object },
    'description': { type: types.object },
    'author': { 
      type: types.array,
      fieldOverride: 'authors'
    },
    'category': { 
      type: types.array,
      fieldOverride: 'categories'
    },
    'comments': { 
      type: types.array,
      fieldOverride: 'comments'
    },
    'enclosure': {
      type: types.array,
      fieldOverride: 'enclosures',
      attributes: {
       'url': { type: types.object },
       'length': { type: types.object },
       'type': { type: types.object }
      }
    },
    'guid': {
      type: types.array,
      fieldOverride: 'guids'
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
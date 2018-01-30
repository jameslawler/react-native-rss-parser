const model = module.exports = {};

model.rss = {
  type: undefined,
  title: undefined,
  links: [{
    url: undefined,
    rel: undefined
  }],
  description: undefined,
  language: undefined,
  copyright: undefined,
  authors: [{
    name: undefined
  }],
  lastUpdated: undefined,
  lastPublished: undefined,
  categories: [{
    name: undefined
  }],
  image: {
    url: undefined,
    title: undefined,
    description: undefined,
    width: undefined,
    height: undefined
  },
  items: [{
    title: undefined,
    links: [{
      url: undefined,
      rel: undefined
    }],
    description: undefined,
    content: undefined,
    categories: [{
      name: undefined
    }],
    authors: [{
      name: undefined
    }],
    published: undefined,
    enclosures: [{
      url: undefined,
      length: undefined,
      mimeType: undefined
    }]
  }]
};

// 'title': { type: types.object },
//  'link': { type: types.object },
//  'description': { type: types.object },
//  'language': { type: types.object },
//  'copyright': { type: types.object },
//  'managingEditor': { type: types.object },
//  'webMaster': { type: types.object },
//  'pubDate': { type: types.object },
//  'lastBuildDate': { type: types.object },
//  'category': { 
//    type: types.array,
//    fieldOverride: 'categories'
//   },
//  'generator': { type: types.object },
//  'ttl': { type: types.object },
//  'image': { type: types.object },
//  'skipHours': { type: types.object },
//  'skipDays': { type: types.object },
//  'image': {
//    type: types.object,
//    attributes: {
//     'url': { type: types.object },
//     'title': { type: types.object },
//     'link': { type: types.object },
//     'width': { type: types.object },
//     'height': { type: types.object },
//     'description': { type: types.object }
//    }
//  },
//  'item': {
//    type: types.array,
//    fieldOverride: 'items',
//    elements: {
//     'title': { type: types.object },
//     'link': { type: types.object },
//     'description': { type: types.object },
//     'author': { 
//       type: types.array,
//       fieldOverride: 'authors'
//     },
//     'category': { 
//       type: types.array,
//       fieldOverride: 'categories'
//     },
//     'comments': { 
//       type: types.array,
//       fieldOverride: 'comments'
//     },
//     'enclosure': {
//       type: types.array,
//       fieldOverride: 'enclosures',
//       attributes: {
//        'url': { type: types.object },
//        'length': { type: types.object },
//        'type': { type: types.object }
//       }
//     },
//     'guid': {
//       type: types.array,
//       fieldOverride: 'guids'
//     },
//     'pubDate': { type: types.object },
//     'source': {
//       type: types.object,
//       attributes: {
//        'url': { type: types.object }
//       }
//     }
//    }
//  }
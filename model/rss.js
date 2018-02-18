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
  itunes: {
    author: [{
      name: undefined
    }],
    block: undefined,
    categories: [{
      name: undefined,
      subCategories:[{
        name: undefined
      }]
    }],
    image: undefined,
    explicit: undefined,
    complete: undefined,
    newFeedUrl: undefined,
    owner: {
      name: undefined,
      email: undefined,
    },
    subtitle: undefined,
    summary: undefined,
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

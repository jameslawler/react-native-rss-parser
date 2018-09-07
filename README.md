# react-native-rss-parser
> React Native compatible RSS parser

[![npm version](https://badge.fury.io/js/react-native-rss-parser.svg)](https://badge.fury.io/js/react-native-rss-parser)
[![Build Status](https://api.travis-ci.org/jameslawler/react-native-rss-parser.png?branch=master)](https://api.travis-ci.org/jameslawler/react-native-rss-parser)

Parse RSS data into a simple object structure. Currently supports;
* RSS 2.0 specification
* Atom 1.0 specification
* Itunes elements for both RSS 2.0 and Atom 1.0 feeds

## Installation

```sh
npm install react-native-rss-parser --save
```

## Usage example

```js
import * as rssParser from 'react-native-rss-parser';

return fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
  .then((response) => response.text())
  .then((responseData) => rssParser.parse(responseData))
  .then((rss) => {
    console.log(rss.title);
    console.log(rss.items.length);
  });
```

## Parsed model

```js
{
  type: undefined,            // either `rss-v2` or `atom-v1`
  title: undefined,           // title of the channel
  links: [{
    url: undefined,           // url of the channel
    rel: undefined            // type of url (eg. alternate)
  }],
  description: undefined,     // description of the channel
  language: undefined,        // language of the channel in `en-us`
  copyright: undefined,       // copyright information about the channel
  authors: [{
    name: undefined           // channel author names
  }],
  lastUpdated: undefined,     // last updated date for the channel
  lastPublished: undefined,   // last published date for the channel
  categories: [{
    name: undefined           // categories the channel belong too
  }],
  image: {
    url: undefined,           // channel image url
    title: undefined,         // channel image title
    description: undefined,   // channel image description
    width: undefined,         // channel image width (pixels)
    height: undefined         // channel image height (pixels)
  },
  itunes: {                   // itunes specific channel information
    author: [{
      name: undefined         // channel author names
    }],
    block: undefined,         // if `yes` then the entire podcast isn't shown in iTunes directory
    categories: [{
      name: undefined,        // channel category names
      subCategories:[{
        name: undefined       // sub category names
      }]
    }],
    image: undefined,         // channel image url
    explicit: undefined,      // `yes`/`no` to indicate if channel contains explicit content
    complete: undefined,      // `yes` indicates the feed won't publish any new items in the future
    newFeedUrl: undefined,    // a url pointing to the new feed location
    owner: {
      name: undefined,        // owner name of the channel
      email: undefined,       // owner email address of the channel
    },
    subtitle: undefined,      // sub title of the channel
    summary: undefined,       // summary of the channel
  },
  items: [{                   // list of items in the feed
    id: undefined,            // item id
    title: undefined,         // item title
    imageUrl: undefined,      // item image url
    links: [{
      url: undefined,         // item link url
      rel: undefined          // type of item link
    }],
    description: undefined,   // item description
    content: undefined,       // item HTML content
    categories: [{
      name: undefined         // categories the item belongs too
    }],
    authors: [{
      name: undefined         // item author names
    }],
    published: undefined,     // item published date
    enclosures: [{
      url: undefined,         // item media url
      length: undefined,      // item media length (bytes)
      mimeType: undefined     // item media mime type (eg audio/mpeg)
    }],
    itunes: {                 // itunes specific item information
      authors: [{
        name: undefined,      // item author names
      }],
      block: undefined,       // `yes` indicates the item won't be displayed in the iTunes directory
      duration: undefined,    // HH:MM:SS length of the item
      explicit: undefined,    // `yes`/`no` to indicate if item contains explicit content
      image: undefined,       // image url for the item
      isClosedCaptioned: undefined, // `yes` indicates if the item contains closed captioning
      order: undefined,       // item order number
      subtitle: undefined,    // item subtitle
      summary: undefined,     // item summary
    }
  }]
}
```

## Model mappings

### Top Level elements

| Parsed Value  | RSS v2.0      | Atom v1.0     |
| ------------- | ------------- | ------------- |
| title         | title         | title         |
| links         | link          | link          |
| description   | description   | subtitle      |
| language      | language      |               |
| copyright     | copyright     | rights        |
| authors       | managingEditor| author        |
| published     | pubDate       | published     |
| updated       | lastBuildDate | updated       |
| categories    | category      | category      |
| image         | image         | logo          |
| items         | item          | entry         |

### Item / Entry Level elements

| Parsed Value  | RSS v2.0        | Atom v1.0     |
| ------------- | --------------- | ------------- |
| id            | guid            | id            |
| title         | title           | title         |
| imageUrl      |                 | icon          |
| links         | link            | link          |
| description   | description     | summary       |
| content       | content:encoded | content       |
| categories    | category        | category      |
| authors       | author          | contributor   |
| published     | pubDate         | published     |
| enclosures    | enclosures      | link          |

## Development setup

Clone this project from [GitHub](https://github.com/jameslawler/react-native-rss-parser)

```sh
npm install
npm test
```

## Bugs / feature requests

If you find any bugs or have a feature request, please create an issue in [GitHub](https://github.com/jameslawler/react-native-rss-parser).

## Contributing

1. Fork it (<https://github.com/jameslawler/react-native-rss-parser>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT license. See ``LICENSE`` for more information.
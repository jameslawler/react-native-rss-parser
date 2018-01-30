# react-native-rss-parser
> React Native compatible RSS parser

[![npm version](https://badge.fury.io/js/react-native-rss-parser.svg)](https://badge.fury.io/js/react-native-rss-parser)
[![Build Status](https://api.travis-ci.org/jameslawler/react-native-rss-parser.png?branch=master)](https://api.travis-ci.org/jameslawler/react-native-rss-parser)

Parse RSS data into a simple object structure. Currently supports;
* RSS 2.0 specification
* Atom 1.0 specification

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

| Parsed Value  | RSS v2.0      | Atom v1.0     |
| ------------- | ------------- | ------------- |
| title         | title         | title         |
| links         | link          | link          |
| description   | description   | summary       |
| content       |               | content       |
| categories    | category      | category      |
| authors       | author        | contributor   |
| published     | pubDate       | published     |
| enclosures    | enclosures    | link          |

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
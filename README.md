# React-Native RSS parser X
A React Native compatible RSS parser.
React-Native RSS parser X is an extended version of react-native-rss-parser by James Lawler.

> This repository:  https://github.com/ndh-dominique/react-native-rss-parser-x

> Npm package:      https://www.npmjs.com/package/react-native-rss-parser-x


## About this project
This project is a fork of react-native-rss-parser by James Lawler
> Forked from:      https://github.com/jameslawler/react-native-rss-parser/


## Changelog
### 1.1.0
> Forked

### 1.2.0
> Fixed atom and rss bugs. Now gets all child nodes based on their respective standards. Also parses dates better.

## Features
Parse RSS data into a simple object structure. Currently supports;
* RSS 2.0 specification
* Atom 1.0 specification
* Itunes elements for both RSS 2.0 and Atom 1.0 feeds

## Installation

```sh
npm install react-native-rss-parser-x --save
```

## Usage example

```js
import * as rssParser from 'react-native-rss-parser-x';

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
    title: undefined,         // item title
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

## License

Distributed under the MIT license. See ``LICENSE`` for more information.

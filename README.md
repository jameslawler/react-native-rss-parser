# react-native-rss-parser
> React Native compatible RSS parser

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

Parse RSS data into a simple object structure. Currently supports;
* RSS 2.0 specification

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

## Development setup

Clone this project from [GitHub](https://github.com/jameslawler/react-native-rss-parser) 

```sh
npm install
npm test
```

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT license. See ``LICENSE`` for more information.
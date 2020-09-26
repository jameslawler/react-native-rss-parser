const atomv1 = require('./samples/atomv1');
const atomv1WithItunes = require('./samples/atomv1-with-itunes');
const atomv1NoUpdated = require('./samples/atomv1-no-updated');
const huffpost = require('./samples/huffpost');
const rssParser = require('../index');

describe('when parse ATOM', () => {
  describe('valid document', () => {
    it('should return feed items', async () => {
      const result = await rssParser.parse(atomv1.feed);

      expect(result.title).toBe('ATOM title');
      expect(result.links.length).toBe(1);
      expect(result.links[0].url).toBe('http://bakery-store.example.com/');
      expect(result.description).toBe('A sample ATOM feed');
      expect(result.items.length).toBe(2);
      expect(result.image.url).toBe(
        'https://b.thumbs.redditmedia.com/ntr1FkBiO3nk4t4Vgy5GXoPQ_j2hirENH9iT8rXNf8M.png'
      );
      expect(result.items[0].title).toBe('Where Did The Cookie Come From');
      expect(result.items[0].id).toBe(
        'http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from'
      );
      expect(result.items[0].imageUrl).toBe(
        'https://b.thumbs.redditmedia.com/ntr1FkBiO3nk4t4Vgy5GXoPQ_j2hirENH9iT8rXNf8.png'
      );
      expect(result.items[0].links.length).toBe(1);
      expect(result.items[0].links[0].url).toBe(
        'http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from.html'
      );
      expect(result.items[0].links[0].rel).toBe('alternate');
      expect(result.items[0].enclosures.length).toBe(1);
      expect(result.items[0].enclosures[0].url).toBe(
        'https://www.example.com/audio.mp3'
      );
      expect(result.items[0].enclosures[0].mimeType).toBe('audio/mpeg');
      expect(result.items[0].enclosures[0].length).toBe('1234');
      expect(result.items[0].description).toBe(
        'The chocolate chip cookie was invented by Ruth Graves Wakefield.'
      );
      expect(result.items[1].title).toBe('What Is Sour Dough');
      expect(result.items[0].published).toBe('2016-01-02T00:00:00+13:00');
      expect(result).toMatchSnapshot();
    });
  });

  describe('with itunes elements', () => {
    it('should return itunes information for channel and item elements', async () => {
      const result = await rssParser.parse(atomv1WithItunes.feed);

      expect(result.itunes).not.toBe(undefined);
      expect(result.itunes.authors.length).toBe(1);
      expect(result.itunes.authors[0].name).toBe('John Doe');
      expect(result.itunes.block).toBe('no');
      expect(result.itunes.categories.length).toBe(3);
      expect(result.itunes.categories[0].name).toBe('Technology');
      expect(result.itunes.categories[0].subCategories.length).toBe(1);
      expect(result.itunes.categories[0].subCategories[0].name).toBe('Gadgets');
      expect(result.itunes.categories[1].name).toBe('TV & Film');
      expect(result.itunes.categories[1].subCategories.length).toBe(0);
      expect(result.itunes.categories[2].name).toBe('Arts');
      expect(result.itunes.categories[2].subCategories.length).toBe(1);
      expect(result.itunes.categories[2].subCategories[0].name).toBe('Food');
      expect(result.itunes.complete).toBe('yes');
      expect(result.itunes.explicit).toBe('no');
      expect(result.itunes.image).toBe(
        'http://example.com/podcasts/everything/AllAboutEverything.jpg'
      );
      expect(result.itunes.newFeedUrl).toBe(
        'http://newlocation.com/example.rss'
      );
      expect(result.itunes.owner).not.toBe(undefined);
      expect(result.itunes.owner.name).toBe('John Doe');
      expect(result.itunes.owner.email).toBe('john.doe@example.com');
      expect(result.itunes.subtitle).toBe('A show about everything');
      expect(result.itunes.summary).toBe(
        'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store'
      );
      expect(result.items.length).toBe(2);
      expect(result.items[0].itunes.authors.length).toBe(1);
      expect(result.items[0].itunes.authors[0].name).toBe('John Doe');
      expect(result.items[0].itunes.block).toBe('yes');
      expect(result.items[1].itunes.block).toBe('no');
      expect(result.items[0].itunes.image).toBe(
        'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
      );
      expect(result.items[1].itunes.image).toBe(
        'http://example.com/podcasts/everything/AllAboutEverything/Episode2.jpg'
      );
      expect(result.items[0].itunes.duration).toBe('07:04');
      expect(result.items[1].itunes.duration).toBe('04:34');
      expect(result.items[0].itunes.explicit).toBe('yes');
      expect(result.items[1].itunes.explicit).toBe('no');
      expect(result.items[0].itunes.isClosedCaptioned).toBe(undefined);
      expect(result.items[1].itunes.isClosedCaptioned).toBe('yes');
      expect(result.items[0].itunes.order).toBe('1');
      expect(result.items[1].itunes.order).toBe('2');
      expect(result.items[0].itunes.subtitle).toBe(
        'A short primer on table spices'
      );
      expect(result.items[1].itunes.subtitle).toBe(
        'Comparing socket wrenches is fun!'
      );
      expect(result.items[0].itunes.summary).toBe(
        `This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!`
      );
      expect(result.items[1].itunes.summary).toBe(
        'This week we talk about metric vs. Old English socket wrenches. Which one is better? Do you really need both? Get all of your answers here.'
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('verifying a HuffPost feed', () => {
    it('should not crash when parsing the feed', async () => {
      const result = await rssParser.parse(huffpost.feed);

      expect(result).not.toBe(undefined);
    });
  });

  describe('when item has no updated element', () => {
    it('should return published element', async () => {
      const result = await rssParser.parse(atomv1NoUpdated.feed);

      expect(result.items[0].published).toBe('2016-01-02T00:00:00+13:00');
    });
  });
});

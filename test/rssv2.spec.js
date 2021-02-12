const rssv2 = require('./samples/rssv2');
const rssv2InvalidFormat = require('./samples/rssv2-invalid-format');
const rssv2MultipleCategories = require('./samples/rssv2-multiple-categories');
const rssv2InvalidNoChannel = require('./samples/rssv2-invalid-no-channel');
const rssv2WithItunes = require('./samples/rssv2-with-itunes');
const rssv2WithContent = require('./samples/rssv2-with-content');
const rssv2WithDc = require('./samples/rssv2-with-dc');
const rssParser = require('../index');

describe('when rss parse', () => {
  describe('valid document', () => {
    it('should return rss items', async () => {
      const result = await rssParser.parse(rssv2.feed);

      expect(result.title).toBe('Scripting News');
      expect(result.links.length).toBe(2);
      expect(result.links[0].url).toBe('http://www.scripting.com/');
      expect(result.links[1].url).toBe('http://www.scripting2.com/');
      expect(result.description).toBe(
        'A weblog about scripting and stuff like that.'
      );
      expect(result.language).toBe('en-us');
      expect(result.copyright).toBe('Copyright 1997-2002 Dave Winer');
      expect(result.lastUpdated).toBe('Mon, 30 Sep 2002 11:00:00 GMT');
      expect(result.lastPublished).toBe(undefined);
      expect(result.categories.length).toBe(1);
      expect(result.categories[0].name).toBe('1765');
      expect(result.image.url).toBe('http://www.example.com/image.jpg');
      expect(result.image.title).toBe('test image');
      expect(result.authors.length).toBe(1);
      expect(result.authors[0].name).toBe('dave@userland.com');
      expect(result.items.length).toBe(9);
      expect(result.items[0].id).toBe(
        'http://scriptingnews.userland.com/backissues/2002/09/29#When:6:56:02PM'
      );
      expect(result.items[0].published).toBe('Mon, 30 Sep 2002 01:56:02 GMT');
      expect(result.items[0].enclosures.length).toBe(1);
      expect(result.items[0].enclosures[0].url).toBe(
        'http://www.scripting.com/mp3s/weatherReportSuite.mp3'
      );
      expect(result.items[0].enclosures[0].length).toBe('12216320');
      expect(result.items[0].enclosures[0].mimeType).toBe('audio/mpeg');
      expect(result.items[0].content).toBe(undefined);
      expect(result.items[1].published).toBe('Sun, 29 Sep 2002 19:59:01 GMT');
      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple categories', () => {
    it('should return correct arrays when multiple groups with the same key', async () => {
      const result = await rssParser.parse(rssv2MultipleCategories.feed);

      expect(result.categories.length).toBe(2);
      expect(result.categories[0].name).toBe('channel-category-1');
      expect(result.categories[1].name).toBe('channel-category-2');
      expect(result.items[1].categories.length).toBe(2);
      expect(result.items[1].categories[0].name).toBe('item-category-1');
      expect(result.items[1].categories[1].name).toBe('item-category-2');
      expect(result).toMatchSnapshot();
    });
  });

  describe('with itunes elements', () => {
    it('should return itunes information for channel and item elements', async () => {
      const result = await rssParser.parse(rssv2WithItunes.feed);

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
      expect(result.items.length).toBe(4);
      expect(result.items[0].itunes.authors.length).toBe(1);
      expect(result.items[0].itunes.authors[0].name).toBe('John Doe');
      expect(result.items[0].itunes.block).toBe('yes');
      expect(result.items[1].itunes.block).toBe('no');
      expect(result.items[2].itunes.block).toBe(undefined);
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
      expect(result.items[2].itunes.isClosedCaptioned).toBe('Yes');
      expect(result.items[0].itunes.order).toBe('1');
      expect(result.items[1].itunes.order).toBe('2');
      expect(result.items[1].itunes.episode).toBe('3');
      expect(result.items[2].itunes.episode).toBe('2');
      expect(result.items[2].itunes.season).toBe('1');
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

  describe('with content:encoded elements', () => {
    it('should return content information for item elements', async () => {
      const result = await rssParser.parse(rssv2WithContent.feed);

      expect(result.items[0].content).toBe('This is test item 1');
      expect(result.items[1].content).toBe('This is test item 2');
      expect(result).toMatchSnapshot();
    });
  });

  describe('invalid document', () => {
    it('should reject promiseasync ', () => {
      return rssParser
        .parse(rssv2InvalidFormat.feed)
        .then(() => {
          throw new Error('Should be invalid');
        })
        .catch((error) => {
          expect(error).not.toBe(undefined);
        });
    });
  });

  describe('when feed has no channel element', () => {
    it('should reject promiseasync ', () => {
      return rssParser
        .parse(rssv2InvalidNoChannel.feed)
        .then(() => {
          throw new Error('Should be invalid');
        })
        .catch((error) => {
          expect(error).toBe('Unable to find any RSS element in feed');
        });
    });
  });

  describe('with dc:* elements', () => {
    it('should return information for dublin core', async () => {
      const result = await rssParser.parse(rssv2WithDc.feed);

      expect(result.items[0].published).toBe('Sun, 29 Sep 2002 17:05:20 GMT');
      expect(result.items[0].categories[0].name).toBe('channel-category');
      expect(result.items[0].authors[0].name).toBe('dave@userland.com');
      expect(result).toMatchSnapshot();
    });
  });
});

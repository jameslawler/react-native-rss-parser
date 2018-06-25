exports.feed = `
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
	<title>ATOM title</title>
	<subtitle>A sample ATOM feed</subtitle>
  <generator uri="http://jekyllrb.com" version="3.1.2">Jekyll</generator>
  <link href="http://bakery-store.example.com/" rel="alternate" type="text/html" />
  <updated>2016-05-13T16:22:08+12:00</updated>
  <id>http://bakery-store.example.com/</id>
  <itunes:subtitle>A show about everything</itunes:subtitle>
  <itunes:author>John Doe</itunes:author>
  <itunes:summary>All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store</itunes:summary>
  <itunes:owner>
      <itunes:name>John Doe</itunes:name>
      <itunes:email>john.doe@example.com</itunes:email>
  </itunes:owner>
  <itunes:image href="http://example.com/podcasts/everything/AllAboutEverything.jpg"/>
  <itunes:category text="Technology">
      <itunes:category text="Gadgets"/>
  </itunes:category>
  <itunes:category text="TV &amp; Film"/>
  <itunes:category text="Arts">
      <itunes:category text="Food"/>
  </itunes:category>
  <itunes:block>no</itunes:block>
  <itunes:complete>yes</itunes:complete>
  <itunes:explicit>no</itunes:explicit>
  <itunes:new-feed-url>http://newlocation.com/example.rss</itunes:new-feed-url>
  <entry>
    <title>Where Did The Cookie Come From</title>
    <link href="http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from.html" rel="alternate" type="text/html" title="Where Did The Cookie Come From" />
    <link href="https://www.example.com/audio.mp3" rel="enclosure" type="audio/mpeg" length="1234" />
    <published>2016-01-02T00:00:00+13:00</published>
    <updated>2016-01-02T00:00:00+13:00</updated>
    <id>http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from</id>
    <content type="html" xml:base="http://bakery-store.example.com/information/2016/01/02/where-did-the-cookie-come-from.html">&lt;p&gt;The chocolate chip cookie was invented by Ruth Graves Wakefield. She owned the Toll House Inn, in Whitman, Massachusetts, a very popular restaurant that featured home cooking in the 1930s. Her cookbook, Toll House Tried and True Recipes, was first published in 1936 by M. Barrows &amp;amp; Company, New York. The 1938 edition of the cookbook was the first to include the recipe “Toll House Chocolate Crunch Cookie” which rapidly became a favorite cookie in American homes.&lt;/p&gt;

&lt;p&gt;Source / Read more &lt;a href=&quot;https://en.wikipedia.org/wiki/Chocolate_chip_cookie&quot;&gt;Wikipedia&lt;/a&gt;&lt;/p&gt;
    </content>
    <category term="Information" />
    <summary>The chocolate chip cookie was invented by Ruth Graves Wakefield.</summary>
    <itunes:author>John Doe</itunes:author>
    <itunes:block>yes</itunes:block>
    <itunes:subtitle>A short primer on table spices</itunes:subtitle>
    <itunes:summary><![CDATA[This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!]]></itunes:summary>
    <itunes:image href="http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg"/>
    <itunes:duration>07:04</itunes:duration>
    <itunes:explicit>yes</itunes:explicit>
    <itunes:order>1</itunes:order>
  </entry>
  <entry>
    <title>What Is Sour Dough</title>
    <link href="http://bakery-store.example.com/information/2016/01/01/what-is-sour-dough.html" rel="alternate" type="text/html" title="What Is Sour Dough" />
    <published>2016-01-01T00:00:00+13:00</published>
    <updated>2016-01-01T00:00:00+13:00</updated>
    <id>http://bakery-store.example.com/information/2016/01/01/what-is-sour-dough</id>
    <content type="html" xml:base="http://bakery-store.example.com/information/2016/01/01/what-is-sour-dough.html">&lt;p&gt;Sourdough bread is made by the fermentation of dough using naturally-occurring lactobacilli and yeast. Sourdough bread has a mildly sour taste not present in most breads made with baker’s yeast and better inherent keeping qualities than other breads, due to the lactic acid produced by the lactobacilli.&lt;/p&gt;

&lt;p&gt;Source / Read more &lt;a href=&quot;https://en.wikipedia.org/wiki/Sourdough&quot;&gt;Wikipedia&lt;/a&gt;&lt;/p&gt;
    </content>
    <category term="Information" />
    <summary>Sourdough bread is made by the fermentation of dough using naturally-occurring lactobacilli and yeast. Sourdough bread has a mildly sour taste not present in most breads made with baker’s yeast and better inherent keeping qualities than other breads, due to the lactic acid produced by the lactobacilli.</summary>
    <itunes:author>Jane Doe</itunes:author>
    <itunes:block>no</itunes:block>
    <itunes:subtitle>Comparing socket wrenches is fun!</itunes:subtitle>
    <itunes:summary>This week we talk about metric vs. Old English socket wrenches. Which one is better? Do you really need both? Get all of your answers here.</itunes:summary>
    <itunes:image href="http://example.com/podcasts/everything/AllAboutEverything/Episode2.jpg"/>
    <itunes:duration>04:34</itunes:duration>
    <itunes:explicit>no</itunes:explicit>
    <itunes:order>2</itunes:order>
    <itunes:isClosedCaptioned>yes</itunes:isClosedCaptioned>
  </entry>
</feed>
`;
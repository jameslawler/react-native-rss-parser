# Comparison of RSS / ATOM specifications

## Top Level elements

| Parsed Value  | RSS v2.0      | Atom v1.0     |
| ------------- | ------------- | ------------- |
| title         | title         | title         |
| link          | link          | link          |
| description   | description   | subtitle      |
| language      | language      |               |
| copyright     | copyright     | rights        |
| author        | managingEditor| author        |
| webMaster     | webMaster     |               |
| published     | pubDate       | published     |
| updated       | lastBuildDate | updated       |
| category      | category      | category      |
| generator     | generator     | generator     |
| docs          | docs          |               |
| cloud         | cloud         |               |
| ttl           | ttl           |               |
| image         | image         | logo          |
|               |               | icon          |
| rating        | rating        |               |
| textInput     | textInput     |               |
| skipHours     | skipHours     |               |
| skipDays      | skipDays      |               |
| items         | item          | entry         |

## Item / Entry Level elements

| Parsed Value  | RSS v2.0      | Atom v1.0     |
| ------------- | ------------- | ------------- |
| title         | title         | title         |
| link          | link          | link          |
| description   | description   | summary       |
| content       |               | content       |
| categories    | category      | category      |
| authors       | author        | contributor   |
| published     | pubDate       | published     |
| enclosures    | enclosures    | 

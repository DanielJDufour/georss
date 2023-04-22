import { readFileSync } from "fs";
import test from "flug";

import read from "./src/read.js";

const DATA = {
  atom: {
    gml: readFileSync("./test-data/gml.atom", "utf-8"),
    simple: readFileSync("./test-data/simple.atom", "utf-8"),
    w3c: readFileSync("./test-data/w3c.atom", "utf-8")
  },
  rss: {
    gml: readFileSync("./test-data/gml.rss", "utf-8"),
    simple: readFileSync("./test-data/simple.rss", "utf-8"),
    w3c: readFileSync("./test-data/w3c.rss", "utf-8")
  }
};

test("read atom gml", ({ eq }) => {
  eq(read(DATA.atom.gml), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("read atom simple", ({ eq }) => {
  eq(read(DATA.atom.simple), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("read atom w3c", ({ eq }) => {
  eq(read(DATA.atom.w3c), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("read rss gml", ({ eq }) => {
  eq(read(DATA.rss.gml), {
    type: "Feature",
    properties: {
      "rss:author": "rajrsingh",
      "rss:description":
        'The heart and soul of the "new" Cambridge. Depending on where you \n' + "               stand, you can feel like you're in the 1970s or 2020.",
      "rss:guid": { guid: "00000111c36421c1321d3", isPermaLink: true },
      "rss:pubDate": new Date("2007-04-05T20:16:31.000Z"),
      "rss:title": "Central Square"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [42.366661, 71.106216],
          [42.367104, 71.105576],
          [42.367134, 71.104378],
          [42.366249, 71.103729],
          [42.363331, 71.098793],
          [42.362541, 71.101028],
          [42.366123, 71.106865],
          [42.366661, 71.106216]
        ]
      ]
    }
  });
});

test("read rss simple", ({ eq }) => {
  eq(read(DATA.rss.simple), {
    type: "Feature",
    properties: {
      "rss:description": "December 28, 2007 05:24:17 GMT",
      "rss:link": "https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php",
      "rss:pubDate": new Date("2007-12-28T05:24:17.000Z"),
      "rss:title": "M 5.3, northern Sumatra, Indonesia"
    },
    geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
  });
});

test("read rss w3c", ({ eq }) => {
  eq(read(DATA.rss.w3c), {
    type: "Feature",
    properties: {
      "rss:description": "December 28, 2007 05:24:17 GMT",
      "geo:lat": 5.5319,
      "geo:long": 95.8972,
      "rss:link": "https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php",
      "rss:pubDate": new Date("2007-12-28T05:24:17.000Z"),
      "rss:title": "M 5.3, northern Sumatra, Indonesia"
    },
    geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
  });
});

test("examples: 1", ({ eq }) => {
  const xml = `<?xml version="2.0" encoding="utf-8"?> <feed xmlns="http://www.w3.org/2005/Atom" xmlns:georss="http://www.georss.org/georss"> <title>Earthquakes</title> <subtitle>International earthquake observation labs</subtitle> <link href="http://example.org/"/> <updated>2005-12-13T18:30:02Z</updated> <author> <name>Dr. Thaddeus Remor</name> <email>tremor@quakelab.edu</email> </author> <id>urn:uuid:60a76c80-d399-11d9-b93C-0003939e0af6</id> <entry> <title>M 3.2, Mona Passage</title> <link href="http://example.org/2005/09/09/atom01"/> <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id> <updated>2005-08-17T07:02:32Z</updated> <summary>We just had a big one.</summary> <georss:point>45.256 -71.92</georss:point> </entry> </feed>`;
  eq(read(xml), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("examples: 2", ({ eq }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?> <rss version="2.0" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml"> <channel> <link>http://maps.google.com</link> <title>Cambridge Neighborhoods</title> <description>One guy's view of Cambridge, Massachusetts</description> <item> <guid isPermaLink="true">00000111c36421c1321d3</guid> <pubDate>Thu, 05 Apr 2007 20:16:31 +0000</pubDate> <title>Central Square</title> <description>The heart and soul of the "new" Cambridge. Depending on where you stand, you can feel like you're in the 1970s or 2020.</description> <author>rajrsingh</author> <georss:where> <gml:Polygon> <gml:exterior> <gml:LinearRing> <gml:posList> +71.106216 42.366661 +71.105576 42.367104 +71.104378 42.367134 +71.103729 42.366249 +71.098793 42.363331 +71.101028 42.362541 +71.106865 42.366123 +71.106216 42.366661 </gml:posList> </gml:LinearRing> </gml:exterior> </gml:Polygon> </georss:where> </item> </channel> </rss>`;
  eq(read(xml), {
    type: "Feature",
    properties: {
      "rss:author": "rajrsingh",
      "rss:description": `The heart and soul of the "new" Cambridge. Depending on where you stand, you can feel like you're in the 1970s or 2020.`,
      "rss:guid": { guid: "00000111c36421c1321d3", isPermaLink: true },
      "rss:pubDate": new Date("2007-04-05T20:16:31.000Z"),
      "rss:title": "Central Square"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [42.366661, 71.106216],
          [42.367104, 71.105576],
          [42.367134, 71.104378],
          [42.366249, 71.103729],
          [42.363331, 71.098793],
          [42.362541, 71.101028],
          [42.366123, 71.106865],
          [42.366661, 71.106216]
        ]
      ]
    }
  });
});

test("examples: 3", ({ eq }) => {
  const xml = `<?xml version="1.0"?> <?xml-stylesheet href="/eqcenter/catalogs/rssxsl.php?feed=eqs7day-M5.xml" type="text/xsl" media="screen"?> <rss version="2.0" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" xmlns:dc="http://purl.org/dc/elements/1.1/"> <channel> <title>USGS M5+ Earthquakes</title> <description>Real-time, worldwide earthquake list for the past 7 days</description> <link>https://earthquake.usgs.gov/eqcenter/</link> <dc:publisher>U.S. Geological Survey</dc:publisher> <pubDate>Thu, 27 Dec 2007 23:56:15 PST</pubDate> <item> <pubDate>Fri, 28 Dec 2007 05:24:17 GMT</pubDate> <title>M 5.3, northern Sumatra, Indonesia</title> <description>December 28, 2007 05:24:17 GMT</description> <link>https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php</link> <geo:lat>5.5319</geo:lat> <geo:long>95.8972</geo:long> </item> </channel> </rss>`;
  eq(read(xml), {
    type: "Feature",
    properties: {
      "rss:description": "December 28, 2007 05:24:17 GMT",
      "geo:lat": 5.5319,
      "geo:long": 95.8972,
      "rss:link": "https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php",
      "rss:pubDate": new Date("2007-12-28T05:24:17.000Z"),
      "rss:title": "M 5.3, northern Sumatra, Indonesia"
    },
    geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
  });
});
